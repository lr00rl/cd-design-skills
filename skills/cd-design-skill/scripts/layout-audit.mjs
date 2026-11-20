#!/usr/bin/env node
// Runs layout-audit.js against a page in headless Chrome at several widths.
// No dependencies: Node 22+ (for the built-in WebSocket) and any Chromium-based
// browser. The browser runs with its own throwaway profile, so a browser the
// user has open is not touched.
//
//   node layout-audit.mjs <file-or-url> [--widths 1440,768,375] [--height 900]
//                         [--json] [--strict]
//   node layout-audit.mjs <file-or-url> --probe     print the page's visual language (style-probe.js) as JSON
//
// Exit code: 0 clean, 1 findings (errors, or warnings too with --strict),
// 2 could not run.

import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const TIMEOUT_MS = 30_000;

const BROWSERS = {
  darwin: [
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
    '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  ],
  linux: [
    '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium',
    '/usr/bin/chromium-browser', '/snap/bin/chromium', '/usr/bin/microsoft-edge',
  ],
  win32: [
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  ],
};

function fail(message) {
  console.error(`layout-audit: ${message}`);
  process.exit(2);
}

function parseArgs(argv) {
  const opts = { widths: [1440, 768, 375], height: 900, json: false, strict: false, probe: false, target: null };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--widths') opts.widths = String(argv[++i]).split(',').map(Number);
    else if (arg === '--height') opts.height = Number(argv[++i]);
    else if (arg === '--json') opts.json = true;
    else if (arg === '--strict') opts.strict = true;
    else if (arg === '--probe') opts.probe = true;
    else if (arg.startsWith('--')) fail(`unknown option ${arg}`);
    else if (opts.target) fail('give one file or URL');
    else opts.target = arg;
  }
  if (!opts.target) fail('usage: node layout-audit.mjs <file-or-url> [--widths 1440,768,375] [--height 900] [--json] [--strict]');
  if (!opts.widths.length || opts.widths.some((w) => !Number.isInteger(w) || w < 200)) fail('--widths takes integers of 200 or more, comma separated');
  if (!Number.isInteger(opts.height) || opts.height < 200) fail('--height takes an integer of 200 or more');
  return opts;
}

function targetUrl(target) {
  if (/^(https?|file):\/\//.test(target)) return target;
  const path = resolve(target);
  if (!existsSync(path)) fail(`no such file: ${path}`);
  return pathToFileURL(path).href;
}

function findBrowser() {
  const fromEnv = process.env.CHROME_PATH;
  if (fromEnv) return existsSync(fromEnv) ? fromEnv : fail(`CHROME_PATH does not exist: ${fromEnv}`);
  const found = (BROWSERS[process.platform] || []).find(existsSync);
  return found || fail('no Chromium-based browser found. Set CHROME_PATH, or evaluate scripts/layout-audit.js in the page with your own browser tool.');
}

function withTimeout(promise, what) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error(`timed out after ${TIMEOUT_MS / 1000}s waiting for ${what}`)), TIMEOUT_MS);
    timer.unref();
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}

async function launch(browserPath, profileDir) {
  const child = spawn(browserPath, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profileDir}`,
    '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--hide-scrollbars', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const port = await withTimeout(new Promise((resolvePort, reject) => {
    let stderr = '';
    child.stderr.on('data', (chunk) => {
      stderr += chunk;
      const match = stderr.match(/DevTools listening on ws:\/\/[^:]+:(\d+)\//);
      if (match) resolvePort(Number(match[1]));
    });
    child.on('error', reject);
    child.on('exit', (code) => reject(new Error(`browser exited with code ${code} before it was ready`)));
  }), 'the browser to start');

  return { child, port };
}

async function connect(port) {
  const pages = await withTimeout(fetch(`http://127.0.0.1:${port}/json/list`).then((r) => r.json()), 'the page list');
  const page = pages.find((p) => p.type === 'page');
  if (!page) throw new Error('the browser exposed no page target');

  const socket = new WebSocket(page.webSocketDebuggerUrl);
  await withTimeout(new Promise((ok, reject) => {
    socket.addEventListener('open', ok, { once: true });
    socket.addEventListener('error', () => reject(new Error('could not open the DevTools socket')), { once: true });
  }), 'the DevTools socket');

  let nextId = 0;
  const pending = new Map();
  const waiters = new Map();
  socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data);
    if (message.id !== undefined) {
      const entry = pending.get(message.id);
      pending.delete(message.id);
      if (!entry) return;
      if (message.error) entry.reject(new Error(`${entry.method}: ${message.error.message}`));
      else entry.resolve(message.result);
    } else if (waiters.has(message.method)) {
      waiters.get(message.method)(message.params);
      waiters.delete(message.method);
    }
  });

  return {
    send(method, params = {}) {
      nextId += 1;
      const id = nextId;
      socket.send(JSON.stringify({ id, method, params }));
      return withTimeout(new Promise((ok, reject) => pending.set(id, { resolve: ok, reject, method })), method);
    },
    once(method) {
      return withTimeout(new Promise((ok) => waiters.set(method, ok)), method);
    },
    close() { socket.close(); },
  };
}

async function auditWidth(cdp, url, width, height, source) {
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false });
  // A page that keeps loading (a slow third-party script, a stream) is still
  // measured, with a note, once the wait runs out.
  const loaded = cdp.once('Page.loadEventFired').catch(() => {
    console.error(`layout-audit: ${width}px: the load event did not fire in ${TIMEOUT_MS / 1000}s; measuring the page as it stands`);
  });
  const nav = await cdp.send('Page.navigate', { url });
  if (nav.errorText) throw new Error(`could not load ${url}: ${nav.errorText}`);
  await loaded;
  await cdp.send('Runtime.evaluate', {
    expression: 'document.fonts.ready.then(() => new Promise((done) => setTimeout(done, 200)))',
    awaitPromise: true,
  });
  const evaluated = await cdp.send('Runtime.evaluate', { expression: source, returnByValue: true });
  if (evaluated.exceptionDetails) {
    const detail = evaluated.exceptionDetails.exception?.description || evaluated.exceptionDetails.text;
    throw new Error(`the audit script threw in the page: ${detail}`);
  }
  return evaluated.result.value;
}

function printReport(result) {
  const { viewport, summary, findings, inventory } = result;
  console.log(`\n== ${viewport.width}px: ${summary.errors} errors, ${summary.warnings} warnings (${summary.elements} elements${summary.ignoredSubtrees ? `, ${summary.ignoredSubtrees} ignored subtrees` : ''}${summary.dataMarks ? `, ${summary.dataMarks} data marks` : ''})`);
  for (const f of findings) {
    console.log(`  ${f.severity === 'error' ? 'ERROR' : 'warn '} ${f.check}: ${f.message}`);
    for (const w of f.where || []) console.log(`        at ${w}`);
    console.log(`        fix: ${f.fix}`);
  }
  for (const more of summary.notShown) console.log(`  ... ${more.more} more ${more.check} findings not shown`);
  if (summary.truncated) console.log('  note: the page has more elements than the audit reads; the rest were not measured');
  console.log(`  lead: ${inventory.lead || 'not marked (add data-lead to the element the reader must see first)'}`);
  if (inventory.firstScreenLargestText) console.log(`  largest text on the first screen: ${inventory.firstScreenLargestText.px}px at ${inventory.firstScreenLargestText.where}`);
  const edges = inventory.leftEdges.map((e) => `${e.x}px x${e.count}`).join(', ');
  console.log(`  left edges (${inventory.distinctLeftEdges} distinct, ${inventory.singleUseLeftEdges} used once): ${edges}`);
  console.log(`  font sizes: ${inventory.fontSizes.map((s) => `${s.px}px`).join(', ')}`);
  console.log(`  vertical gaps: ${inventory.verticalGaps.map((g) => `${g.px}px x${g.count}`).join(', ')}`);
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (typeof WebSocket === 'undefined') fail('needs Node 22 or newer. Otherwise evaluate scripts/layout-audit.js in the page with your own browser tool.');
  const url = targetUrl(opts.target);
  const browserPath = findBrowser();
  const source = await readFile(join(HERE, opts.probe ? 'style-probe.js' : 'layout-audit.js'), 'utf8');
  if (opts.probe) opts.widths = opts.widths.slice(0, 1);
  const profileDir = await mkdtemp(join(tmpdir(), 'layout-audit-'));

  let browser;
  const results = [];
  try {
    browser = await launch(browserPath, profileDir);
    const cdp = await connect(browser.port);
    await cdp.send('Page.enable');
    // Measure the page at rest. A page that still moves here ignores the
    // reader's reduced-motion setting, which is its own defect.
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
    for (const width of opts.widths) results.push(await auditWidth(cdp, url, width, opts.height, source));
    cdp.close();
  } catch (error) {
    console.error(`layout-audit: ${error.message}`);
    process.exitCode = 2;
  } finally {
    if (browser) {
      const exited = new Promise((done) => browser.child.once('exit', done));
      browser.child.kill();
      await exited;
    }
    await rm(profileDir, { recursive: true, force: true, maxRetries: 3 });
  }
  if (process.exitCode === 2) return;

  if (opts.probe) { console.log(JSON.stringify(results[0], null, 2)); return; }
  if (opts.json) console.log(JSON.stringify(results, null, 2));
  else {
    console.log(`layout audit: ${url}`);
    results.forEach(printReport);
  }

  const errors = results.reduce((n, r) => n + r.summary.errors, 0);
  const warnings = results.reduce((n, r) => n + r.summary.warnings, 0);
  if (!opts.json) console.log(`\ntotal: ${errors} errors, ${warnings} warnings across ${results.length} widths`);
  process.exitCode = errors > 0 || (opts.strict && warnings > 0) ? 1 : 0;
}

main();
