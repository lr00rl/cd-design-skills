// Runs the audit against two fixtures in headless Chrome: a page built on the
// geometry kernel must come back clean, and a page with one planted defect per
// section must have each defect found where it was planted.
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { test } from 'node:test';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const cli = join(here, '..', 'scripts', 'layout-audit.mjs');

function audit(fixture, widths) {
  const run = spawnSync(process.execPath, [cli, join(here, 'fixtures', fixture), '--json', '--widths', widths], { encoding: 'utf8' });
  if (run.status === 2) return { skip: run.stderr.trim() };
  return { status: run.status, results: JSON.parse(run.stdout) };
}

test('a page built on the geometry kernel is clean at every width', (t) => {
  const out = audit('aligned.html', '1440,768,375');
  if (out.skip) return t.skip(out.skip);
  assert.equal(out.status, 0);
  for (const result of out.results) {
    assert.deepEqual(result.findings, [], `findings at ${result.viewport.width}px`);
  }
  assert.match(out.results[0].inventory.lead, /h1/);
  // two bars that end 2px apart are data, not a crooked edge
  assert.equal(out.results[0].summary.dataMarks, 2);
});

const planted = [
  ['edge-near-miss', 'p.nudged'],
  ['edge-near-miss', 'panel.overhang'],
  ['near-equal-heights', 'section#buttons'],
  ['row-near-miss', 'section#row'],
  ['gap-near-miss', 'section#gaps'],
  ['horizontal-overflow', 'section#overflow'],
  ['clipped-text', 'section#clip'],
  ['ragged-row-heights', 'article.card'],
  ['ragged-inner-rows', 'article.card'],
  ['small-target', 'section#target'],
  ['lead-below-fold', 'section#clip'],
  ['type-sizes-too-close', null],
  ['flat-hierarchy', 'h1'],
];

for (const width of ['1440', '375']) {
  test(`every planted defect is found at ${width}px`, (t) => {
    const out = audit('crooked.html', width);
    if (out.skip) return t.skip(out.skip);
    assert.equal(out.status, 1);
    const { findings } = out.results[0];
    for (const [check, place] of planted) {
      const hit = findings.some((f) => f.check === check && (!place || f.where.some((w) => w.includes(place))));
      assert.ok(hit, `${check}${place ? ` at ${place}` : ''} was not reported`);
    }
  });
}

test('the style probe reads a page\'s palette and type scale', (t) => {
  const run = spawnSync(process.execPath, [cli, join(here, 'fixtures', 'aligned.html'), '--probe'], { encoding: 'utf8' });
  if (run.status === 2) return t.skip(run.stderr.trim());
  const probe = JSON.parse(run.stdout);
  assert.equal(probe.page.ground, 'rgb(255, 255, 255)');
  assert.equal(probe.textColours[0].value, 'rgb(20, 33, 61)');
  assert.equal(probe.tokens['--accent'], '#b3261e');
  assert.ok(probe.sizes.some((s) => s.value.startsWith('56px')));
});
