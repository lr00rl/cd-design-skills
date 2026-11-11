# Proportion and alignment

A page looks crooked for a small number of mechanical reasons. This file gives the mechanism for each, so the layout is straight by construction and the audit has nothing to find.

## Horizontal alignment: few lines, used many times

Every left and right edge on the page should fall on a line that something else also uses. Count the lines, not the elements.

- **Two content lines for the whole page.** `.page` in the kernel defines `content-start` and `content-end` once. Headers, sections, and footers all sit on them. A full-width background uses `.band`, whose content returns to the same two lines through subgrid. Do not give each section its own `max-width` and padding: that is how a header ends up 8px wider than the body.
- **Column lines inside the content.** `.cols` gives twelve. Choose spans that say something about the content: 7 and 5 for text beside a note, 8 and 4 for a main column with a rail, 3 and 9 for a label column beside its entries. Equal halves and equal thirds are the default answer, so use them only when the items really are peers.
- **Text aligns on text.** In a list where some rows have an icon and some do not, the text column still starts on one line: reserve the icon's width in every row.
- **Borders must not move text.** A bordered box next to an unbordered one puts its text one border-width further in. `.boxed` subtracts the border from the padding. For two buttons, give both the same border width and make one transparent.
- **Numbers align on the right** with `font-variant-numeric: tabular-nums`, and the column header aligns with them. Text columns align left. Do not centre a column of values.
- **Centre whole compositions, not parts.** A centred heading over left-aligned body text creates two axes. Centre a short, self-contained block (a cover, an empty state), and keep everything in it centred.

## Vertical alignment: rows share lines too

- **Siblings in a row share inner row lines.** Three cards with titles of different lengths must still put their body text and their actions on common lines. `.lineup` does this with `grid-template-rows: subgrid`; set `--rows` to the number of parts. Without subgrid support, fix the title to a line count with `min-height` in `lh` units.
- **Choose the line a row aligns on.** Mixed type sizes in a row align on the baseline (`align-items: baseline`). An icon beside text aligns on the centre. Boxes of equal role align on top and stretch to equal height. Never correct a row with `margin-top` or `position: relative; top: 2px` on one item.
- **Rhythm comes from the parent.** `.stack` spaces its children with one `row-gap` and zeroes their margins. Margins on children collapse, double up at boundaries, and produce the 22px gap beside the 24px gap.
- **Group by distance.** Space inside a group is at most half the space between groups. A heading sits closer to the text it introduces than to the text before it. The usual steps: 8 or 12 inside a component, 24 between components, 64 or 96 between sections.
- **Fixed heights are for controls.** Give buttons, inputs, and tabs in one row a shared height. Let text containers grow.

## Proportion

- **The lead dominates.** On the first screen the lead is at least 2.5 times the body size on desktop and 1.75 times on a phone, or it dominates by weight, colour, or isolation instead. If you squint and nothing stands out, the hierarchy is flat.
- **Type scale.** Five to seven sizes with a ratio of at least 1.2 between neighbours. For a 16px body: 14, 16, 20, 28, 40, 56. Sizes like 15 and 15.5 beside 16 read as mistakes. Use `clamp()` on the top two steps only.
- **Measure.** Running text is 45 to 75 characters wide (`max-width: 65ch`); CJK text is 25 to 40 characters. A wide container holds a narrow text column plus something else, never a 140-character line.
- **Line height falls as size rises.** About 1.5 for body, 1.3 for subheads, 1.1 for display. CJK body needs 1.7 to 1.8 and no negative letter-spacing.
- **Aspect ratios from a short list.** 1:1, 4:3, 3:2, 16:9, and one tall ratio. Set `aspect-ratio` on media so a row of images has equal heights before they load.
- **Nested radii.** Inner radius equals outer radius minus the padding between them, and never below zero. Equal radii on nested boxes look pinched.
- **Whitespace is unequal on purpose.** More space above a section than below its heading; more margin around the lead than around anything else. Even spacing everywhere reads as a form.

## Optical corrections

Geometry gets a layout to within a pixel; the eye judges ink, not boxes. These are the deliberate deviations, and they are the only ones:

- Large display type has side bearing, so its ink starts right of its box. Pull it left by about 0.04em to sit on the column line. The audit reports this as a warning between text of very different sizes; confirm by eye.
- An icon in a square button, a play triangle, or an arrow is centred by its visual mass, not its bounding box. Shift it 1 to 2px.
- Text in a button looks low when padding is equal, because of descender space. Trim it with `text-box: trim-both cap alphabetic` where supported, or take 1px from the top padding.
- Mixed CJK and Latin text on one line shares a baseline but not a visual centre; align on the baseline and let line height absorb the difference.

Record each optical correction in the report. If it trips an audit error, mark the element `data-audit-ignore` and name the reason.

## Responsive: the lines change, the rules do not

- Reduce columns by changing spans (`.cols` children go from 3 to 6 to 12), not by adding a second layout.
- Page padding scales with `clamp()`, so the content lines move smoothly and stay symmetric.
- Every grid and flex child that holds text or a table gets `min-width: 0`, or one long word pushes the page sideways. The kernel sets it on its own children.
- Wide tables, code, and diagrams scroll inside `.scroll`. The page itself never scrolls horizontally.
- Test content at its worst: the longest title, the largest number, a translated label 40 percent longer, an empty list.

## What the audit reports and how to fix it

| Check | Meaning | Fix |
|---|---|---|
| `edge-near-miss` | Two left or right edges 1 to 4px apart | One column line: remove the stray margin, equalise padding, subtract the border |
| `row-near-miss` | Items in a row share no top, centre, bottom, or baseline, and miss by up to 4px | One `align-items` value on the row, no per-item nudges |
| `near-equal-heights` | Side-by-side boxes 1 to 4px different in height | Same height and same border width on both |
| `gap-near-miss` | Gaps in one stack or row that differ by 1 to 3px | One `gap` on the parent |
| `horizontal-overflow` | The page scrolls sideways | `.scroll` wrapper, `min-width: 0`, wrapping |
| `clipped-text` | Text cut off without an ellipsis | Wrap, widen, or truncate on purpose |
| `ragged-row-heights` | Like siblings in a row with different heights | Let the row stretch its items |
| `ragged-inner-rows` | Like siblings whose inner parts start on different lines | `.lineup` or subgrid |
| `small-target` | A control under 24 by 24px | Padding or `min-height`; 44px for touch |
| `type-sizes-too-close`, `type-scale-sprawl` | Sizes under 1.1 apart, or more than seven sizes | Merge into the scale |
| `flat-hierarchy` | Largest first-screen text under 1.5 times body | Give the lead real dominance |
| `lead-below-fold`, `lead-outranked`, `lead-missing` | The marked lead is off the first screen, smaller than other text, or hidden | Move it up, enlarge it, or mark the true lead |
