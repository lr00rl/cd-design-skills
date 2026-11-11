# Life and boldness

A page can be perfectly aligned and still dull. This file covers the other half: choosing one move that a template would not make, and making the page respond like something alive. Both stay inside the rule from SKILL.md that a deviation is zero or unmistakable, so nothing here conflicts with exact alignment.

## Test for a default

Describe the layout in one line. If the line is "header, centred hero, three cards, footer", or "sidebar, and a grid of equal cards", or it would fit any other subject unchanged, the page is a default and the bold move is missing. Go back to the brief: the move comes from the point, the content's shape, or the mood words.

## Where a bold move can come from

Pick one. Each is anchored to the grid, so it reads as intent.

- **Scale.** Set the lead far outside the normal range: a single figure at 20 percent of the viewport width, a headline that fills the column edge to edge, with everything else two steps quieter. Works when the point is one number or one sentence.
- **Asymmetry.** Split 4 and 8 or 3 and 9 and let the narrow column carry labels, dates, or section numbers while the wide one carries content. Leave part of the grid empty on purpose. Works for documents and long reports.
- **A broken line.** Let exactly one element cross a boundary by a full column or a full section: an image that bleeds to the viewport edge through `.band`, a pull quote that starts one column left of the text. One element only, and by a whole step.
- **The content as the graphic.** Make the data, the timeline, the map, or the comparison the dominant visual, instead of illustrating it with stock imagery. A report whose first screen is its own key chart needs no hero image.
- **Type as image.** A characterful display face at large size, tight leading, and one colour, with a plain body face. Use variable-font axes (weight, width) for emphasis instead of adding a second family.
- **Colour as structure.** One saturated field behind the lead section, with the rest neutral, or a colour that changes meaning along the page (cool for what was measured, warm for what to do). Never an accent sprinkled on every heading.
- **A structural device from the subject.** Ledger rules for finance, a route line for logistics, margin annotations for research, a terminal frame for a developer tool. The device should be something the subject already uses.

Choose against the conservative option by default. The plain version stays as the fallback when the bold one fails the look test in step 5, not as the starting point.

## Interaction: the page answers

Every interactive element needs its full state set before it ships: rest, hover, focus-visible, active, disabled, loading, and where relevant selected, error, and empty.

- **Respond at once.** A press shows within 100ms, even when the result takes longer: change the pressed state first, then load.
- **Let the reader touch the content.** Where the content has dimensions, give a control over them: a toggle between two views of the same data, a range input that scrubs a timeline, a filter that reduces a long table, a hover or focus that links a figure in the text to its mark in the chart. This is where a report becomes more useful than a PDF.
- **Keep position.** Sticky section navigation with the current section marked, anchor links that leave room for the sticky header (`scroll-margin-top`), and state kept in the URL so a view can be shared.
- **Reveal instead of crowding.** Use native `<details>`, `<dialog>`, and the `popover` attribute for secondary material. They bring keyboard and focus handling with them.
- **Reachable and reversible.** Every action works from the keyboard in a sensible order, shows a visible focus ring, and can be undone or cancelled. Destructive actions ask first.
- **Do not gate content.** Text that only appears after a script runs or an animation finishes is hidden from some readers. Content is visible by default and enhanced after.

## Motion: only where it explains

Motion earns its place by showing a cause, a relationship, or a change of state. Anything else is removed.

| Use | Duration | Easing |
|---|---|---|
| Press, toggle, hover | 100 to 150ms | ease-out |
| Menu, popover, tooltip | 150 to 250ms | ease-out in, faster ease-in out |
| Panel, sheet, page-level change | 250 to 400ms | ease-in-out or a spring |

- Animate `transform` and `opacity`. Animating size or position properties moves the layout and makes the audit, and the reader, measure a moving target.
- An element enters from where it came from and leaves toward where it goes. A menu grows from its button; a deleted row collapses in place.
- Motion can be interrupted: a second click reverses a transition midway instead of queueing.
- Stagger a group by 30 to 50ms per item, and cap the total at about 300ms.
- One orchestrated moment per page, usually the lead arriving. Scroll-triggered fades on every paragraph are noise.
- Honour `prefers-reduced-motion`: replace movement with a short opacity change or nothing. The audit measures with reduced motion on, so a page that still moves there is measured in mid-flight and its findings change from run to run.

Platform features worth using as progressive enhancement, with a plain fallback: same-document view transitions for state changes, `@starting-style` for entry transitions from `display: none`, scroll-driven animations (`animation-timeline`) for reading progress, container queries for components that adapt to their slot, `text-wrap: balance` on headings and `pretty` on body text. Check support for the browsers the page must serve before relying on any of them.

## Checks before calling it done

- In a screenshot at arm's length, the lead is the first thing seen and the bold move is visible.
- Remove the bold move mentally: if the page looks the same, it was decoration, not a move.
- Every control was operated with pointer and keyboard, in every state it has.
- With scripts disabled and with reduced motion on, all content is still there.
- The audit still passes after the motion and interaction were added.
