# Craft Details — Pixel-Level Rules with Exact Values

Distilled from Jakub Krehel's interfaces.dev agent skills (github.com/jakubkrehel/skills, MIT) plus corroborating sources. The meta-rule of this file: **turn chosen behavior into testable values instead of adjectives**. These are web/design-engineering defaults, not platform invariants. Product purpose, safety, accessibility, target-platform conventions, native component behavior, the host design system, and measured evidence take precedence. Never introduce a second styling system merely to apply a fix.

## Geometry & alignment

- **Concentric border radius:** `outerRadius = innerRadius + padding`. The most common thing that makes interfaces feel "off." If padding > 24px, treat layers as separate surfaces and pick radii independently instead of forcing the math.
- **Optical over geometric alignment:** icon-side padding = text-side padding − 2px; play-triangle icons get `margin-left: 2px`; for asymmetric icons, fix the SVG viewBox/path itself rather than adding component margins.
- **Hit areas (web defaults):** ≥44×44 CSS px for coarse/touch input and ≥40×40 CSS px for fine-pointer desktop; extend with `::after` when semantics and neighboring targets remain correct. **Two hit areas must never overlap.** Native Apple-platform work follows current HIG and system-component behavior rather than translating points to CSS pixels.

## Shadows & outlines

- **Shadows over borders** (for depth — keep real borders for dividers, table cells, and form inputs):
```css
--shadow-border:
  0 0 0 1px oklch(0 0 0 / .06),      /* border ring */
  0 1px 2px -1px oklch(0 0 0 / .06), /* lift */
  0 2px 4px 0 oklch(0 0 0 / .04);    /* ambient */
/* hover: .08 / .08 / .06 · dark mode: single ring 0 0 0 1px oklch(1 0 0 / .08), hover .13 */
```
- **Image outlines:** `outline: 1px solid oklch(0 0 0 / .1)` (dark mode `oklch(1 0 0 / .1)`), `outline-offset: -1px`. **Never a tinted near-black/near-white** (slate-900, zinc-900, `#0a0a0a`, `#111827`) — a tinted outline picks up the surface underneath and reads as dirt on the image edge. `outline` not `border` (no layout impact).

## Animation exactness

- **Icon swap (e.g. copy→check):** scale `0.25 → 1` (never 0.5), opacity `0 → 1`, `blur(4px) → blur(0)`, spring `{ duration: 0.3, bounce: 0 }` — **bounce always 0**. No motion library? Keep both icons in DOM (one absolute) and cross-fade with `cubic-bezier(0.2, 0, 0, 1)`.
- **Enter choreography:** split the container into semantic chunks (title/description/buttons), stagger ~100ms (title words ~80ms); combine `opacity + translateY(12px) + blur(4px)`.
- **Exit:** small fixed `translateY(-12px)` (never full container height); exit 150ms vs enter 300ms; never remove the exit entirely.
- **Press:** always `scale(0.96)`; never below 0.95. Offer a `static` prop to disable where motion distracts.
- **Skip animation on page load:** `initial={false}` on AnimatePresence so default-state elements don't animate on first render (verify intentional hero entrances still work on refresh).
- **Never `transition: all`** — name properties (`transition-property: scale, opacity`). Tailwind's bare `transition` maps to all.
- **`will-change` sparingly:** only transform/opacity/filter/clip-path; only after observing first-frame stutter (Safari benefits most).

## Typography exactness

- Fonts: `.woff2` only; **`font-synthesis: none`** (no faked bold/italic — missing files should fail visibly); rarely >3 families; pair for contrast, not similarity.
- **Properties over raw tags:** `font-weight: 650` not `font-variation-settings: "wght" 650`; `font-optical-sizing: auto`; `font-variant-numeric: tabular-nums`. Properties survive non-variable fallbacks; reserve raw tags for custom axes.
- Line-height by role, unitless: headings ~1.1, body 1.5–1.6. Letter-spacing: slightly negative on large headings, slightly positive on small caps labels, neither on body.
- Measure: cap at 60–75ch (`max-width: 65ch`).
- `text-wrap: balance` on headings, `pretty` on descriptions, **neither in long-form**. `overflow-wrap: break-word` where IDs/links could escape; `white-space: nowrap` on labels/badges.
- `tabular-nums` on ANY value that changes (timers, counters, prices).
- Truncation must keep the full value reachable (tooltip/expand).
- Store copy in natural case, present with `text-transform`. Smart punctuation: curly quotes in prose, en dash for ranges, `&nbsp;` to bind "16 px".
- Underlines: `text-underline-position: from-font; text-decoration-thickness: from-font` + `text-underline-offset` + `text-decoration-skip-ink`. Dotted underline = "this word carries extra info." If animating more than color, build the underline as a separate element.
- **Mobile inputs at 16px** (`text-base sm:text-sm`) or iOS Safari zooms. Never `maximum-scale=1` (blocks zoom in non-Safari browsers, fails WCAG).
- Readability starting points, not accessibility conformance rules: body ~16px; compact UI ~14px; captions ~13px; rarely below 12px. Judge the actual context through zoom/text scaling, line length, contrast, font metrics, density, platform settings, and representative testing.
- `-webkit-font-smoothing: antialiased` once on the root. Logical properties (`margin-inline-start`, `text-align: start`) + `lang`/`dir` for RTL.

## OKLCH thresholds (companion to color-and-typography.md)

| Rule | Value |
|---|---|
| Light/dark boundary | bg L > 0.6 → dark text |
| Lightness gap, light bg | fg L < 0.45 when bg L > 0.85 |
| Lightness gap, dark bg | fg L > 0.75 when bg L < 0.25 |
| Hue drift across a ramp | >10° spread = visible drift |
| APCA exploratory heuristic | Use measured Lc as design feedback; do not claim WCAG conformance from it |
| WCAG 2.x normal text contrast | 4.5:1 AA, 7:1 AAA; large-text and nontext/UI criteria differ |
| Contrast fixing | Adjust lightness first, then remeasure and retune chroma/hue if needed |

- Multi-hue palettes: use the **same % of each hue's max chroma**, not the same absolute C — that's what reads as evenly vivid.
- Derive dark mode by reversing the light palette's L mapping, then tune.
- P3 colors always with an `@media (color-gamut: p3)` fallback.
- Formatting: L/C to 3 decimals, drop trailing zeros. Tool: oklch.fyi.

## Review output convention (when critiquing a UI)

Report findings as **Before/After tables grouped by principle** (one heading per principle, one row per diff, omit empty groups) — never as loose prose paragraphs. End with a checkbox checklist of the principles applied. This format converts review ramble into a scannable diff.
