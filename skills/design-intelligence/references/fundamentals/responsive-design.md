# Responsive Design

## Start From the Most Constrained Core Task

Use a simple base layout and add complexity as content and available space justify it. Mobile-first CSS is often convenient, but the UX decision is task-first: reprioritize navigation, density, input, and disclosure instead of merely shrinking a desktop composition.

## Breakpoints: Content-Driven

Don't chase device model sizes. Let content and task behavior reveal where adaptation is needed. Start across a range, identify where hierarchy, legibility, interaction, or data relationships fail, and add the minimum useful breakpoints. Use `clamp()` for fluid values when bounded interpolation is appropriate.

## Detect Input Capabilities, Not the Current Input Event

**Screen size doesn't determine input, and `pointer` describes the primary pointer capability rather than the input someone is using at this moment.** Keep a touch-safe semantic hit area by default; use pointer/hover queries only for capability-specific enhancements.

```css
.button {
  min-inline-size: 44px;
  min-block-size: 44px;
}

/* Enhance presentation when the primary pointer is fine and supports hover. */
@media (hover: hover) and (pointer: fine) {
  .card:hover { transform: translateY(-2px); }
}
```

Use `any-pointer`/`any-hover` only when the presence of an additional capability matters. A stylus may be fine or coarse. Never shrink the semantic hit target because a device reports a fine primary pointer, and never rely on hover for functionality.

## Safe Areas: Handle the Notch

Modern phones have notches, rounded corners, and home indicators. Use `env()`:

```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* With fallback */
.footer {
  padding-bottom: max(1rem, env(safe-area-inset-bottom));
}
```

**Enable viewport-fit** in your meta tag:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
```

## Responsive Images: Get It Right

### srcset with Width Descriptors

```html
<img
  src="hero-800.jpg"
  srcset="
    hero-400.jpg 400w,
    hero-800.jpg 800w,
    hero-1200.jpg 1200w
  "
  sizes="(max-width: 768px) 100vw, 50vw"
  alt="Hero image"
>
```

**How it works**:
- `srcset` lists available images with their actual widths (`w` descriptors)
- `sizes` tells the browser how wide the image will display
- Browser picks the best file based on viewport width AND device pixel ratio

### Picture Element for Art Direction

When you need different crops/compositions (not just resolutions):

```html
<picture>
  <source media="(min-width: 768px)" srcset="wide.jpg">
  <source media="(max-width: 767px)" srcset="tall.jpg">
  <img src="fallback.jpg" alt="...">
</picture>
```

## Layout Adaptation Patterns

**Navigation:** choose the compact pattern from top tasks, destination count, current-location visibility, search/command needs, reachability, and platform conventions. Mobile does not automatically mean a hamburger drawer. Preserve the current task and return path.

**Tables/data:** preserve the relationships that make the information tabular. Depending on the task, prioritize columns, use horizontal scrolling with sticky identifiers, offer comparison/detail modes, or design a distinct small-screen task view. Cards are valid only when row-level reading matters more than cross-row/column comparison.

**Progressive disclosure:** use native `<details>/<summary>` when its disclosure semantics match the content; don't hide primary tasks or critical status merely to reduce height.

## Testing: Don't Trust DevTools Alone

DevTools device emulation is useful for layout but misses:

- Actual touch interactions
- Real CPU/memory constraints
- Network latency patterns
- Font rendering differences
- Browser chrome/keyboard appearances

Test on representative real devices and input contexts for the supported audience, including at least one constrained device when performance or memory matters. Emulation is evidence for layout, not a substitute for real touch, keyboard, browser chrome, assistive technology, or device performance.

---

**Avoid**: shrinking desktop without task reprioritization; device detection instead of feature detection; separate experiences that drift semantically; ignoring intermediate widths, landscape, virtual keyboards, mixed inputs, resize, or constrained hardware.
