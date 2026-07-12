import assert from "node:assert/strict";
import test from "node:test";

const validatorModule = new URL("../scripts/validate-html.mjs", import.meta.url);

const validDocument = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Example guide</title>
  <style>
    :root { --cd-bg: #f7f8fa; --cd-ink: #15181d; --cd-line: #e6e8ec; }
    html { scroll-behavior: smooth; }
    :focus-visible { outline: 3px solid #185fa5; outline-offset: 3px; }
    @media (max-width: 760px) { .grid { grid-template-columns: 1fr; } }
    @media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }
  </style>
</head>
<body data-cd-mode="light-document">
  <nav aria-label="Section navigation"><a href="#start">Start</a></nav>
  <main><h1>Example guide</h1><section id="start"><h2>Start</h2></section></main>
</body>
</html>`;

test("accepts a structurally complete standalone document", async () => {
  const { validateHtml } = await import(validatorModule);
  const result = validateHtml(validDocument, { mode: "light-document" });
  assert.deepEqual(result.errors, []);
});

test("reports missing viewport, focus treatment, and responsive CSS", async () => {
  const { validateHtml } = await import(validatorModule);
  const result = validateHtml(`<!doctype html><html lang="en"><head><title>X</title></head><body><main><h1>X</h1><section id="a"><h2>A</h2></section></main></body></html>`);
  assert.ok(result.errors.some((message) => message.includes("viewport")));
  assert.ok(result.errors.some((message) => message.includes(":focus-visible")));
  assert.ok(result.errors.some((message) => message.includes("responsive")));
});

test("reports broken fragment navigation and duplicate ids", async () => {
  const { validateHtml } = await import(validatorModule);
  const html = validDocument
    .replace('<a href="#start">Start</a>', '<a href="#missing">Missing</a>')
    .replace("</main>", '<section id="start"><h2>Again</h2></section></main>');
  const result = validateHtml(html);
  assert.ok(result.errors.some((message) => message.includes("#missing")));
  assert.ok(result.errors.some((message) => message.includes('Duplicate id "start"')));
});

test("requires reduced-motion handling when motion is present", async () => {
  const { validateHtml } = await import(validatorModule);
  const html = validDocument.replace(/@media \(prefers-reduced-motion: reduce\)[\s\S]*?\}\s*\}/, "");
  const result = validateHtml(html);
  assert.ok(result.errors.some((message) => message.includes("prefers-reduced-motion")));
});
