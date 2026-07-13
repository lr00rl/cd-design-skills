---
name: cd-design-skill
description: Use when creating or restyling standalone HTML documents, handbooks, product guides, process maps, or dense information pages in the CD visual language, especially when UI/UX and interaction patterns must transfer without copying reference content.
---

# CD HTML Design

## Contract

Transfer hierarchy, spacing, geometry, semantic color, responsiveness, and interaction patterns while rebuilding the page from target material.

Never reuse source wording, names, dates, metrics, claims, examples, workflows, or domain labels. Trace overlapping terms to target input and remove anything explained only by the reference.

## Workflow

Build the target-only outline, select one mode, read its references, implement semantic HTML, add only evidence-backed interactions, then validate, render, interact, and scan for leakage.

### Select one mode

| Mode | Use for | Navigation | Geometry |
| --- | --- | --- | --- |
| `light-document` | Guides, specifications, process maps, reports | Sticky horizontal section nav | Soft 7–14px radii |
| `editorial-handbook` | Chaptered manuals, training books, editorial references | Sticky 280px chapter rail; stack below 920px | Sharp 2px radii |

Default to `light-document`. Do not graft the handbook cover/sidebar onto a light guide or round handbook components like light cards. Create a hybrid only when explicitly requested; name which mode owns navigation, typography, geometry, and motion.

### Read resources

- Always read [references/design-system.md](references/design-system.md).
- Read [references/interaction-and-responsive.md](references/interaction-and-responsive.md) for navigation, motion, wide structures, or responsive work.
- Read [references/quality-gates.md](references/quality-gates.md) before completion.
- For plain HTML, copy [assets/light-document.html](assets/light-document.html) or [assets/editorial-handbook.html](assets/editorial-handbook.html), then replace all demonstration copy and example-specific labels.

### Implement

Set the selected `data-cd-mode` on `<body>` and define `--cd-bg`, `--cd-ink`, and `--cd-line`.

Prefer semantic landmarks, calm reading measures, flat surfaces, hairline borders, text-backed color, and overflow for wide structures. Keep core content available without JavaScript. Avoid marketing-scale light heroes, nested or repetitive cards, unsupported controls, and decorative dependencies. Add only orientation, state feedback, visible focus, and reduced-motion-safe behavior.

## Validate

```bash
node scripts/validate-html.mjs /absolute/path/page.html --mode light-document
node scripts/validate-html.mjs /absolute/path/page.html --mode editorial-handbook
```

Fix every error. Report every warning verbatim with its disposition and residual risk. For validator changes, run `node --test tests/validate-html.test.mjs`.

Render desktop and narrow layouts. Exercise navigation and states; inspect focus, overflow, headings, reduced motion, and console errors. Search for source-specific terms and numbers; every match must originate in target content.

Browser order:

1. Respect the user's explicit browser choice.
2. Otherwise use Codex Browser, then its official troubleshooting and the native Chrome extension binding.
3. Use Computer Use only after native bindings are unavailable; never take over a Chrome window the user is operating.

Do not launch external Chrome binaries, standalone Playwright, gstack browser servers, or unrelated automation before exhausting platform Browser and Chrome-plugin paths.

## Stop and correct

- Mixed navigation, type, radius, or motion: reselect one mode.
- Unrequested interaction: remove it.
- Decorative color: return to neutral surfaces.
- Script-gated content: make visibility the default.
- Clipped wide content: add overflow.
- Code-only completion claim: render and interact first.
