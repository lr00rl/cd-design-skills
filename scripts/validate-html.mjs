#!/usr/bin/env node

import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

const has = (html, pattern) => pattern.test(html);

export function validateHtml(html, options = {}) {
  const errors = [];
  const warnings = [];
  const mode = options.mode ?? null;

  if (!has(html, /^\s*<!doctype html>/i)) errors.push("Missing <!doctype html>.");
  if (!has(html, /<html\b[^>]*\blang\s*=\s*["'][^"']+["']/i)) errors.push("Missing a non-empty html lang attribute.");
  if (!has(html, /<meta\b[^>]*\bname\s*=\s*["']viewport["'][^>]*>/i)) errors.push("Missing viewport metadata.");
  if (!has(html, /<title>\s*[^<]+\s*<\/title>/i)) errors.push("Missing a non-empty title.");
  if (!has(html, /<main\b/i)) errors.push("Missing semantic <main> content.");
  if (!has(html, /<h1\b/i)) errors.push("Missing a page-level <h1>.");
  if (!has(html, /<section\b/i)) errors.push("Missing at least one semantic <section>.");
  if (!has(html, /:focus-visible\b/i)) errors.push("Missing visible keyboard focus treatment with :focus-visible.");
  if (!has(html, /@media\s*\([^)]*(?:max-width|min-width|width\s*[<>])/i)) errors.push("Missing responsive @media CSS.");

  const motionPresent = has(html, /scroll-behavior\s*:\s*smooth|\b(?:animation|transition)\s*:/i);
  if (motionPresent && !has(html, /prefers-reduced-motion\s*:\s*reduce/i)) {
    errors.push("Motion is present without a prefers-reduced-motion: reduce fallback.");
  }

  const ids = [...html.matchAll(/\bid\s*=\s*["']([^"']+)["']/gi)].map((match) => match[1]);
  const seenIds = new Set();
  for (const id of ids) {
    if (seenIds.has(id)) errors.push(`Duplicate id "${id}".`);
    seenIds.add(id);
  }

  const fragments = [...html.matchAll(/\bhref\s*=\s*["']#([^"']+)["']/gi)].map((match) => match[1]);
  for (const fragment of new Set(fragments)) {
    if (!seenIds.has(fragment)) errors.push(`Fragment link #${fragment} has no matching id.`);
  }

  if (fragments.length && !has(html, /<nav\b[^>]*(?:aria-label|aria-labelledby)\s*=/i)) {
    warnings.push("Fragment navigation should have an accessible label.");
  }
  if (has(html, /<table\b/i) && !has(html, /overflow-x\s*:\s*auto|overflow\s*:\s*auto/i)) {
    warnings.push("Tables are present without an explicit horizontal-overflow strategy.");
  }
  if (has(html, /<(?:script|link)\b[^>]*(?:src|href)\s*=\s*["']https?:\/\//i)) {
    warnings.push("External assets are present; provide resilient local or system fallbacks.");
  }

  if (mode) {
    if (!has(html, new RegExp(`data-cd-mode\\s*=\\s*["']${mode}["']`, "i"))) {
      errors.push(`Expected data-cd-mode="${mode}".`);
    }
    for (const variable of ["--cd-bg", "--cd-ink", "--cd-line"]) {
      if (!html.includes(variable)) errors.push(`Missing core design token ${variable}.`);
    }
  }

  return { ok: errors.length === 0, errors, warnings };
}

function parseArgs(argv) {
  const args = [...argv];
  let mode = null;
  const modeIndex = args.indexOf("--mode");
  if (modeIndex !== -1) {
    mode = args[modeIndex + 1] ?? null;
    args.splice(modeIndex, 2);
  }
  return { file: args[0] ?? null, mode };
}

async function main() {
  const { file, mode } = parseArgs(process.argv.slice(2));
  if (!file) {
    console.error("Usage: node scripts/validate-html.mjs <file.html> [--mode light-document|editorial-handbook]");
    process.exitCode = 2;
    return;
  }
  const html = await readFile(file, "utf8");
  const result = validateHtml(html, { mode });
  console.log(JSON.stringify({ file, mode, ...result }, null, 2));
  if (!result.ok) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
