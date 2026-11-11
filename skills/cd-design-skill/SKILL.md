---
name: cd-design-skill
description: >-
  Use when building, restyling, or reviewing anything that renders in a browser (pages, reports, dashboards, documents, components, HTML slides) and the result must look deliberate: the content's main point leads, edges line up horizontally and vertically, proportions hold, interaction feels alive, and the look fits the audience. Also use when a page looks crooked, flat, generic, or "off" and the cause is unclear, when the user points at a page whose style they like, or when the user asks for 对齐, 比例, 重点突出, 灵动, 高级感, or 不要歪歪扭扭. Ships a structure-only CSS kernel, a layout audit that measures the rendered page, and a probe that reads the visual language of a reference page.
---

# CD design skill

This skill gives direction and instruments. It does not prescribe a look. Palette, typeface, scale, radius, density, and how bold to be are decided for each piece of work, from its content, its reader, and what the user has shown they like. Where this skill or its references give a number, it is a starting point to adjust, not a rule.

Two things a model cannot do by reasoning alone are why the instruments exist. It cannot see its own render, so a heading lands 3px off the column line and nothing tells it. And it cannot know the user's taste, so a mood chosen by guesswork gets rejected after the work is done.

| Part | Job |
|---|---|
| This file | Direction and the order of work. |
| `assets/kernel.css` | Geometry only: page lines, columns, shared row lines, one spacing scale. No colour, type, or character. Adopt it, adapt it, or map its ideas onto the project's own layout system. |
| `scripts/layout-audit.js` and `.mjs` | Measures the rendered page and reports what is crooked, with size, location, and a fix. |
| `scripts/style-probe.js` | Reads the visual language of any rendered page: colours by weight, faces, sizes, radii, shadows, design tokens. |

## What to aim for

1. **Content leads.** Decide the one thing the reader should take away and let visual weight follow it. Design serves the content; anything that does not help the reader reach the point is a candidate for removal.
2. **A deviation is zero or unmistakable.** Edges share a line or differ by a clear step. The same holds for sizes, gaps, and heights. Near-misses are what make a page look careless; deliberate asymmetry is welcome.
3. **A few values, reused.** Space, type size, radius, and colour each come from a short set chosen for this page. How short is a judgment.
4. **The look fits the reader.** Lively or restrained, bold or quiet: choose it for this audience and this subject, and prefer evidence of the user's taste over your own default. Being inventive is good when it helps the content land and the reader still trusts the page.
5. **Interaction answers the reader.** Controls respond at once, show their state, work from the keyboard, and can be undone. Motion explains a change or it is left out.
6. **One structure for every reader.** Real text, headings in order, labelled controls, content present without scripts: this serves people, assistive technology, and agents reading the page alike.

## Order of work

1. **Understand.** Write down the point, the reader, what ranks first, and the mood, in a few lines. Derive them from the material. Ask only what the material cannot answer.
2. **Find the direction before designing.** Look for evidence of taste first: a page the user likes, the product's existing screens, a brand. Run the probe on it and follow its roles (ground, ink, accent, type, card treatment) with values suited to the new page. With no evidence, show two or three cheap directions and let the user pick before polishing any of them. Do not invent a mood and build the whole page on it.
3. **Build structure apart from look.** Put the look in a small set of custom properties so it can change without touching layout or behaviour. Use the kernel for geometry. Mark the lead with `data-lead` and chart marks with `data-mark`.
4. **Measure.** Run the audit at the widths that matter. Fix what is crooked. Add checks of your own for what this page can get wrong (content without scripts, totals that must agree, states hidden by default).
5. **Look, with eyes.** Measurement cannot tell whether a page is good. Take screenshots and judge them, operate the page, and compare with the reference. If you cannot view images, hand the screenshots to a reviewer that can, and say so. The user's reaction outranks every check.
6. **Report.** What the point is, what direction was followed and why, what was measured, what was looked at and by whom, and what was not checked.

## Instruments

```bash
node scripts/layout-audit.mjs <file-or-url> [--widths 1440,768,375] [--json] [--strict]
node scripts/layout-audit.mjs <file-or-url> --probe
```

Both need Node 22 or newer and a Chromium-based browser, and start their own headless browser with a throwaway profile. With any other browser tool, evaluate the contents of `layout-audit.js` or `style-probe.js` in the page; each is one expression that returns its result.

Reading the audit:

- **Errors** are near-misses, overflow, and clipped text. Fix them, or mark a deliberate exception with `data-audit-ignore` and say why. Ignored subtrees and data marks are counted in the summary.
- **Warnings** are prompts for judgment, not defects: ragged rows, a flat hierarchy, many type sizes, small targets, a lead that does not lead.
- **The inventory** lists the column lines, sizes, and gaps in use, which shows whether a system exists.

Keep its limits in mind. It measures geometry only. A clean audit does not make a page good, and a page people like can still report findings: a published report the user held up as a model returned 26 errors and 22 type sizes. Use the audit to remove carelessness, never as the measure of quality.

## References

| File | Read when |
|---|---|
| `references/proportion-and-alignment.md` | Laying out more than one column, building charts, or fixing something the audit reported. |
| `references/life-and-boldness.md` | Choosing how bold to be, adding motion or interaction, or when the result is correct and dull. |
