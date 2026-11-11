# Proportion and alignment

A page looks crooked for a small number of mechanical reasons. This file names each mechanism so a layout is straight by construction. The values mentioned are common starting points; choose the ones that suit the page.

## Horizontal: few lines, used many times

Every left and right edge should fall on a line that something else also uses. Count the lines, not the elements.

- **One pair of content lines for the whole page.** Headers, sections, and footers share them. A full-width background is a band whose content returns to the same lines. Giving each section its own width and padding is how a header ends up a few pixels wider than the body.
- **Column lines inside the content.** Choose spans that say something about the content (text beside a note, a label column beside its entries). Equal halves and thirds are the default answer, so use them when the items really are peers.
- **Text aligns on text.** Where some rows have an icon and some do not, reserve the icon's width in every row.
- **Borders and padding must not move text.** A bordered or padded box next to a plain one starts its text further in. Either subtract the border from the padding, or let the box's padding live in its edge columns so its content still lands on the shared lines.
- **Numbers that are compared align on the right** with tabular figures. Text columns align left.
- **Centre whole compositions, not parts.** A centred heading over left-aligned body text creates two axes.

## Vertical: rows share lines too

- **Siblings in a row share inner row lines.** Cards with titles of different lengths should still put their text and actions on common lines. Subgrid rows do this.
- **Choose the line a row aligns on**: baseline for mixed type sizes, centre for an icon beside text, top and equal height for boxes of equal role. Do not correct one item with a nudge.
- **Rhythm comes from the parent.** Space children with one gap on the container instead of margins on each child.
- **Group by distance.** Things that belong together sit closer than things that do not. A heading sits nearer the text it introduces than the text before it.
- **A grid's implicit column grows to its widest child.** Give it `minmax(0, 1fr)` and give text-bearing grid and flex children `min-width: 0`, or one long word pushes the layout out of its box.

## Proportion

- **The lead dominates** by size, weight, colour, or isolation. If nothing stands out when you squint, the hierarchy is flat. A lead can be a group, such as a headline with the figures that prove it.
- **Type sizes come from one scale** with visible steps between them. Sizes a pixel apart read as mistakes.
- **Measure.** Running text is comfortable at about 45 to 75 Latin characters or 25 to 40 CJK characters per line.
- **Line height falls as size rises.** CJK body text wants more than Latin, and no negative letter-spacing.
- **Keep a number with its unit.** In headings, do not let a line break fall between a figure and the word or punctuation that follows it.
- **Whitespace is unequal on purpose.** More around the lead than around anything else. A tinted band already separates itself and needs less space around it than two plain sections do.

## Charts: one origin and one scale

A chart misleads when equal values draw at different lengths, and that usually has a layout cause.

- **All rows of a chart sit in one grid.** A row that is its own grid sizes its label column to its own label, so its bar starts somewhere else and is on a different scale from the row above.
- **Two sides of a comparison share one scale.** Scaling each side to its own maximum makes 16 look as long as 291.
- **Mark the marks.** Bars and segments carry `data-mark`: their far edge is a value, so the audit does not compare it with layout lines. Tracks and axes stay unmarked, which is how rows on different scales are still caught.
- **One meaning per colour.** An accent that means "the finding points here" should not also be a category. A direction (in or out, joined or left) can be carried by solid against hollow.
- **The title states the finding**, with the unit beneath it.
- **What a chart says and what its drill-down lists must be the same number.** Check it in the build.

## Optical corrections

Geometry gets a layout to within a pixel; the eye judges ink. Large display type, icons in buttons, and text in padded controls sometimes need a pixel or two of deliberate correction. Make them on purpose, note them, and mark the element `data-audit-ignore` if the audit objects.

## Responsive

- Change spans at breakpoints instead of writing a second layout. Pick the breakpoint where the content stops fitting, not a conventional width.
- Wide tables, code, and diagrams scroll inside their own box. The page itself does not scroll sideways.
- Test content at its worst: the longest title, the largest number, a longer translation, an empty list, and states hidden by default such as a closed disclosure.

## What the audit reports

| Check | Meaning | Usual fix |
|---|---|---|
| `edge-near-miss` | Two left or right edges 1 to 4px apart | One column line: remove the stray margin, equalise padding, subtract the border |
| `row-near-miss` | Items in a row share no top, centre, bottom, or baseline | One `align-items` value on the row |
| `near-equal-heights` | Side-by-side boxes 1 to 4px different in height | Same height and border width on both |
| `gap-near-miss` | Gaps in one stack or row that differ by 1 to 3px | One gap on the parent |
| `horizontal-overflow`, `clipped-text` | The page scrolls sideways, or text is cut off | A scroll wrapper, `min-width: 0`, wrapping, or deliberate truncation |
| `ragged-row-heights`, `ragged-inner-rows` | Like siblings whose heights or inner parts do not line up | Stretch the row; subgrid rows |
| `small-target` | A control under 24 by 24px | Padding or a minimum height |
| `type-sizes-too-close`, `type-scale-sprawl`, `flat-hierarchy` | Prompts about the type scale and the lead | Judgment |
| `lead-below-fold`, `lead-outranked`, `lead-missing` | The marked lead is off the first screen, outranked, or hidden | Move it, enlarge it, or mark the true lead |
