---
name: cd-design-skill
description: >-
  Use when building, restyling, or reviewing anything that renders in a browser (pages, reports, dashboards, documents, components, HTML slides) and the result must look deliberate: the content's main point leads, every horizontal and vertical edge lines up, proportions hold, interaction feels alive, and the direction is not a template. Also use when a page looks crooked, flat, generic, or "off" and the cause is unclear, or when the user asks for 对齐, 比例, 重点突出, 灵动, 高级感, or 不要歪歪扭扭. Ships a structure-only CSS kernel and a layout audit that measures the rendered page instead of guessing.
---

# CD design skill

A model that writes a page cannot see it. It knows the principles of alignment and hierarchy and still ships a title 3px off the column line, because nothing told it so. This skill closes that loop with three parts that do different jobs:

| Part | Job |
|---|---|
| This file | The order of work and the rules that decide between options. |
| `assets/kernel.css` | Geometry only: a page grid, column lines, shared row lines, one spacing scale. It carries no colour, type, or character, so it cannot make two pages look alike. |
| `scripts/layout-audit.js`, `scripts/layout-audit.mjs` | Measurement: reads the rendered page and reports each crooked edge with its size in pixels, its location, and the fix. |

There are no templates and no component library on purpose. A shipped look gets copied; a shipped measurement gets obeyed.

## The order of work

Do these in order. Each step produces something small that the next step uses.

### 1. Brief: four lines before any markup

```
Point:   the one sentence a reader should leave with
Reader:  who they are, and what they do after reading
Rank:    the lead, then at most two supports; everything else is reference
Mood:    three words taken from the subject, not from design fashion
```

Derive these from the material you were given. Ask the user one question only when the material cannot settle the point (two candidate leads that would produce different pages). A page with no stated point gets decorated instead of designed, and no later step can repair that.

### 2. System: decide once, then reuse

Fix a palette of four to six named values, two type roles, a type scale of five to seven sizes, the spacing scale, the grid, and one bold move (rule 4). Inside an existing product, extract its tokens and reuse them. If the `design-intelligence` skill is installed, use it to choose the style; this skill then governs how that style is executed and checked.

### 3. Build on the kernel

Copy `assets/kernel.css` into the page, or map each of its mechanisms onto the layout system the project already has. Put `data-lead` on the element that carries the point. Read `references/proportion-and-alignment.md` before laying out anything with more than one column.

### 4. Measure

Run the audit at desktop, tablet, and phone widths (see below). Fix every error. Read every warning and either fix it or say why it stands.

### 5. Look

Take one screenshot at 1440 and one at 375 with real content and judge what a measurement cannot: does the eye land on the lead first, does the page have the mood from the brief, would a reader remember one thing about it. Then operate it: every control with pointer and keyboard, every state.

### 6. Report

State the point, the bold move, the audit totals per width, each exempted finding with its reason, and what was not checked.

## Rules that decide

1. **Content leads.** Visual weight follows the rank in the brief. The lead is the largest or most contrasting thing on the first screen. Anything that does not help the reader reach the point (ornament, a second accent, a border around everything) is removed.
2. **A deviation is zero or unmistakable.** Two edges either share a line or differ by a full step of the grid or spacing scale. The same holds for sizes, gaps, and heights. A 3px offset is a defect; a deliberate one-column offset is a decision. This one rule covers alignment and boldness together: asymmetry is welcome, near-misses are not.
3. **One scale for each quantity.** Space, type size, radius, and border width each come from a short scale, and nothing sits between two steps.
4. **Spend boldness once, on the lead.** Choose one move a template would not make (see `references/life-and-boldness.md`) and keep everything else quiet. A page with no such move is unfinished; a page with three is noise.
5. **Motion and interaction answer the reader.** Every interactive element responds within 100ms, shows where it came from and what changed, and can be interrupted. Motion that explains nothing is removed.
6. **One structure for every reader.** Landmarks, headings in order, real text, and labelled controls serve a screen reader, a keyboard user, and an agent reading the page equally. Content stays readable with scripts off.

## Running the audit

With a shell and a Chromium-based browser installed (Node 22 or newer, no packages to install):

```bash
node scripts/layout-audit.mjs /absolute/path/page.html
node scripts/layout-audit.mjs http://localhost:3000/pricing --widths 1440,768,375
```

It starts its own headless browser with a throwaway profile and does not touch a browser the user has open. Exit code 0 means no errors, 1 means errors (`--strict` counts warnings too), 2 means it could not run. Add `--json` for the full result.

With any other browser tool, read `scripts/layout-audit.js` and evaluate its contents in the page at each width. It is a single expression that returns the result and also leaves it on `window.__layoutAudit`. Measure at 100 percent browser zoom: at other zoom levels a 1px border is no longer one CSS pixel and the reported sizes drift by a fraction.

Reading the result:

- An **error** is a near-miss, an overflow, or a clipped text. Fix it. If it is intended, wrap the element in `data-audit-ignore` and report the reason; the summary counts ignored subtrees so they cannot hide.
- A **warning** needs judgment: ragged rows, a flat hierarchy, sizes too close together, a small target, a lead that is below the first screen or outranked.
- The **inventory** lists the column lines, font sizes, and gaps in use. Many left edges used once means there is no grid. More than seven font sizes means there is no scale.

The audit measures geometry. It cannot tell whether the page is beautiful, whether the point is the right one, or whether an image is well cropped, and on a large page with deliberate optical corrections it over-reports. Zero errors means nothing is crooked, not that the design is good; step 5 covers the rest.

## When the page cannot be rendered

Say so in the report instead of claiming the check passed. Then do what is still possible from source: confirm that every horizontal position comes from the grid, every gap from the scale, bordered and unbordered siblings have equal outer size, and no fixed width exceeds the smallest target viewport.

## References

| File | Read when |
|---|---|
| `references/proportion-and-alignment.md` | Before any layout with more than one column, and when the audit reports something you do not know how to fix. |
| `references/life-and-boldness.md` | When choosing the bold move, adding motion or interaction, or when the result looks correct and dull. |
