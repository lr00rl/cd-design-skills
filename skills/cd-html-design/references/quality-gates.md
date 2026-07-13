# CD HTML quality gates

Use every gate before declaring a page complete. A page passes only when all blocking checks succeed and the visual score is at least 90/100.

## 1. Content isolation: blocking

- Confirm the page outline comes from target material, not from the style reference.
- Confirm every proper noun, date, metric, claim, example, workflow label, and domain term comes from target material.
- Replace every sentence and label shipped in the neutral starter asset.
- Replace example-specific icons and status names with ones derived from the target task.
- Confirm no source path, filename, title, or document metadata appears in the output.
- If target and source domains overlap, trace each suspicious phrase back to the target input.

Build a small list of source-specific terms during analysis, then search the output:

```bash
rg -n -i 'source-term-a|source-term-b|source-term-c' /absolute/path/to/output.html
```

Zero unexplained matches are allowed.

## 2. Mode integrity: blocking

- Confirm `<body>` declares one `data-cd-mode`.
- Confirm navigation belongs to that mode.
- Confirm typography belongs to that mode.
- Confirm geometry belongs to that mode.
- Confirm motion belongs to that mode.
- Remove any dark cover, sidebar, rounded-card family, or reveal behavior imported from the other mode without an explicit hybrid requirement.

## 3. Structure and accessibility: blocking

- Include doctype, language, charset, viewport, and non-empty title.
- Include one page-level `<h1>` and a valid heading order.
- Use `header`, `nav`, `main`, `section`, `aside`, and `footer` according to meaning.
- Give navigation an accessible label.
- Give every fragment link a matching unique ID.
- Use real links and buttons instead of clickable generic containers.
- Provide visible `:focus-visible` treatment.
- Pair state color with text, symbol, pattern, or ARIA state.
- Keep essential content available without JavaScript.
- Provide reduced-motion behavior whenever motion exists.

Run:

```bash
node scripts/validate-html.mjs /absolute/path/to/output.html --mode <selected-mode>
```

## 4. Visual score: 100 points

| Category | Points | Pass evidence |
| --- | ---: | --- |
| Visual language | 25 | Correct palette, type roles, rules, surface treatment, and radius family. |
| Layout and hierarchy | 20 | Correct reading measure, section rhythm, component selection, and information density. |
| Mode integrity | 15 | One coherent navigation, typography, geometry, and motion system. |
| Interaction and states | 15 | Navigation, focus, active, hover, overflow, and reduced-motion behavior work. |
| Responsive behavior | 15 | Desktop and mobile preserve hierarchy and all destinations. |
| Content isolation | 10 | No unexplained source-content transfer. |

Pass threshold: **90/100**, with no blocking gate failure.

Score fidelity to the selected mode, not visual loudness. A restrained light document can score 100 without a dramatic cover or animation.

## 5. Browser matrix: blocking

Inspect at minimum:

| View | Size | Verify |
| --- | --- | --- |
| Desktop | 1280×720 or wider | Navigation placement, reading measure, hero/cover, component rhythm. |
| Mobile | 375×812 | Navigation height, column collapse, overflow, readable type, complete destinations. |
| Long-page midpoint | Either width | Sticky/active navigation, scroll offset, reveal state, table behavior. |

For each view:

1. Capture a screenshot.
2. Check the browser console for errors.
3. Activate every navigation link.
4. Tab through all interactive elements.
5. Exercise horizontal overflow with keyboard or touch-equivalent scrolling.
6. Enable reduced motion when the browser supports it and verify motion is removed.

## 6. Visual rejection conditions

Revise immediately if any is true:

- A light guide looks like a marketing landing page.
- A handbook reads like a dashboard grid.
- Every section is inside an identical card.
- Semantic colors appear decoratively without meaning.
- A sticky navigation hides headings or dominates the mobile viewport.
- A table or process rail clips instead of scrolling.
- Supporting metadata competes with titles.
- Motion reveals ordinary prose or prevents content from appearing.
- A decorative element implies an unimplemented control.
- Any source business content appears without target provenance.

## 7. Final evidence summary

Report:

- selected mode and why;
- files created or modified;
- validator command and result;
- every validator warning verbatim, plus its fix or explicit acceptance rationale;
- desktop and mobile browser checks;
- interaction paths exercised;
- content-isolation search and result;
- remaining external-dependency or rendering risk.
