# Micro-Interactions Catalog: Timing, Physics & Patterns

Research basis: emilkowal.ski (animations.dev), rauno.me/craft, benji.org/family-values (Family), joshwcomeau.com, motion.dev, Chrome for Developers, MDN, Material 3, Apple HIG, Sonner internals, Build UI, Magic UI.

## 1. THE NUMBERS

### Durations
| Class | Duration | Examples |
|---|---|---|
| Micro-interaction | **100-150ms** | button press, checkbox, icon toggle, hover color |
| Standard UI | **150-250ms** | tooltip, dropdown, popover, select |
| Modal / drawer / large surface | **200-300ms** | dialog, sheet, sidebar |
| Marketing / hero / rare moment | **400-1200ms+** | landing choreography |

Rules that recur in every expert source:
- **Product UI animations stay under 300ms.**
- **Exit ≈ 20% faster than entrance**: the user already decided.
- Duration scales with distance and size (a chip ≠ a full-screen sheet).
- **Paired elements share duration AND easing exactly** (modal transform 200ms ease-out ⇒ overlay opacity 200ms ease-out). Mismatched pairs = "feels cheap."
- Material 3 tokens if matching Android: short1 50ms → long2 500ms.

### Easing decision tree
1. Entering/exiting the screen → `ease-out`
2. Moving/morphing while on screen → `ease-in-out`
3. Hover/color → `ease`
4. Marquee/ticker/progress → `linear`
5. **Never `ease-in` for UI** (delays feedback exactly when users watch).
6. Seen 100+ times/day → **don't animate at all.**

Built-in curves lack punch. The workhorse set:
```css
--ease-out-quad:  cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-out-cubic: cubic-bezier(0.215, 0.61, 0.355, 1);
--ease-out-quart: cubic-bezier(0.165, 0.84, 0.44, 1);
--ease-out-quint: cubic-bezier(0.23, 1, 0.32, 1);      /* Emil's default */
--ease-out-expo:  cubic-bezier(0.19, 1, 0.22, 1);
--ease-in-out-cubic: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-in-out-quart: cubic-bezier(0.77, 0, 0.175, 1);   /* Emil's in-out */
--ease-drawer:    cubic-bezier(0.32, 0.72, 0, 1);       /* Vaul's drawer curve */
--spring-approx:  cubic-bezier(0.34, 1.56, 0.64, 1);    /* bezier overshoot fallback */
```

### Springs
- Prefer perceptual params (Motion): `{ type: "spring", visualDuration: 0.5, bounce: 0.2 }`. **Keep bounce 0.1-0.3 for UI**; higher only for drag-dismiss and deliberately playful surfaces.
- Physical params: `{ mass: 1, stiffness: 100, damping: 10 }` (Motion defaults). Josh Comeau's demo default: `{ mass: 1.75, tension: 200, friction: 12 }`.
- SwiftUI reference feels: default `.spring(response: 0.55, damping: 0.825)`; gesture-tracking `.interactiveSpring(response: 0.15, damping: 0.86)`.
- **The real reason for springs: interruptible with velocity preserved.** Keyframes restart from zero; springs retarget mid-flight. Use for anything grabable/flingable/re-triggerable.
- Pure-CSS springs via `linear()` (all majors since Dec 2023); values >1 overshoot. Generate from kvin.me/css-springs; ship `--spring-approx` bezier fallback via `@supports`.

### Engine choice
| Use | When |
|---|---|
| CSS transitions | **Default.** Interruptible, retargets. Sonner uses transitions, not keyframes, deliberately. |
| CSS `@keyframes` | Fire-and-forget entrances, loops, shimmer. Never for re-triggerable states. |
| WAAPI `element.animate` | JS-computed values (rects) + compositor smoothness; View-Transition clip-path reveals. |
| Motion/Framer | Gestures, drag, `layoutId` shared elements, springs with velocity handoff, exit animations. |
| rAF/GSAP | Last resort; prefer CSS scroll-driven animations. |

**Perf non-negotiables:** animate only `transform` + `opacity`; never height/width/margin (layout); `blur()` >20px is expensive (Safari worst); `will-change` sparingly. Motion gotcha: `animate={{ x: 100 }}` is NOT hardware-accelerated; `animate={{ transform: "translateX(100px)" }}` is.

---

## 2. PRESS & TOUCH

- **Active-scale press** (highest delight-per-line in this file): `button:active { scale: .97 }` + `transition: scale 120ms ease-out`. Range .95-.98. Snap down fast, ease up slower. Guard hover styles with `@media (hover: hover) and (pointer: fine)`.
- **Never animate from `scale(0)`**: enter from `scale(.95)` + `opacity: 0` ("nothing in reality appears from nothing").
- **Enlarged hit areas**: 44px min via `::after { position:absolute; inset:-8px }`.
- **Extended drag tracking**: `setPointerCapture()`; keep tracking pointermove outside bounds; clamp the value, not the tracking. Its absence is a top rage source.
- **Haptics**: `navigator.vibrate(10)` within 80-120ms of state change (Android only; iOS 18+ hack: programmatic `label.click()` on `<input switch>`). Toggles/submit/drag-snap only; never on hover/scroll.

## 3. HOVER & POINTER

- **Magnetic button**: within ~120px, `translate(dx*.25, dy*.25)`; release with 400ms `--ease-out-quint`. Hero CTAs only, rAF-throttled, meaningless on touch.
- **Safe triangle (Amazon cone)**: suppress submenu close while cursor moves within the triangle from pointer to submenu's far corners; cheap fallback = 100-150ms close delay. Tear down the invisible triangle on close or it blocks clicks.
- **Tooltip delay groups**: first tooltip ~500ms delay + 125ms fade; while group is "warm" (~300ms grace) subsequent tooltips appear INSTANTLY with no animation. Radix: `delayDuration` + `skipDelayDuration`. Animating every tooltip = syrup.
- **Origin-aware popovers**: grow from the trigger with `transform-origin: var(--radix-dropdown-menu-content-transform-origin)`; `scale(.95)→1` + opacity, 150-200ms ease-out. The good-vs-great dividing line.
- **Spotlight card**: pointer → CSS vars `--mx/--my`; overlay `radial-gradient(400px circle at var(--mx) var(--my), rgba(255,255,255,.08), transparent 40%)`; border variant via masked `::before` (`padding:1px; mask: linear-gradient(#000,#000) content-box exclude`). One listener on the container for N cards.
- **3D tilt card**: container `perspective: 1000px`; cursor offset → `rotateX/Y(±8-15deg)`; children `translateZ()` with `preserve-3d`; gloss gradient follows tilt. Reduced-motion gated; compositing-heavy in grids.
- **Custom cursor follower**: lerp `x += (t-x)*0.15`, `mix-blend-mode: difference`. Agency/portfolio only. HIGH RISK: hides real cursor, hurts a11y and perceived latency. Kill on coarse pointers + reduced motion.
- **Hover-reveal row actions**: reveal on PARENT hover; keep in DOM at `opacity:0` (focus-reachable) + `:focus-within`; 100-150ms. Must also be exposed for touch/keyboard.

## 4. NUMBERS & TEXT

- **Odometer / number ticker**: each digit a 0-9 strip, `translateY(calc(var(--d) * -1lh))`; per-digit stagger + spring. Libraries: NumberFlow (best-tuned). `font-variant-numeric: tabular-nums` or the row jitters. Real value in `aria-live="polite"`, animated digits `aria-hidden`.
- **Text morph on shared letters** (Family's signature): diff strings, key each grapheme, FLIP survivors (Motion `layout`), fade+shift the diff. Short strings only (button labels, amounts).
- **Text scramble/decrypt**: per-char random glyph cycling resolving left→right; <800ms; never on copy the user needs NOW; `aria-hidden` + static twin.
- **Typewriter**: honest for AI token streaming (render as they arrive + `▋` blink ~530ms / 1s step-end); fake typing on static copy is pure delay; make it skippable.
- **Gradient shimmer on text**: `linear-gradient(90deg,#888,#fff 40%,#888 60%)` + `background-size:200%` + `background-clip:text` + pan. The de-facto "AI thinking" signal: implies content arriving, beats a spinner.

## 5. LOADING & ASYNC

**The loading ladder:** <100ms acknowledge input, no indicator · <300ms show NOTHING (delay spinner 100-200ms; skip if work finishes) · <2s spinner OK · 2-10s skeleton/progress (skeletons test 30-50% faster perceived) · >5s add Cancel.

- **Optimistic UI**: apply locally instantly, fire request, roll back on failure + toast with Undo/Retry. React `useOptimistic` / TanStack `onMutate`. **The rollback is the whole design problem.** Never for payments/irreversible deletes.
- **Skeleton → content morph**: skeleton geometry must match the real box EXACTLY (a lying skeleton is worse than a spinner); crossfade 150-200ms; shimmer `linear` 1.5-2s; View Transitions can morph skeleton→card via shared `view-transition-name`.
- **Toast choreography (Sonner's measured numbers)**: when stacked, toast *i* gets `translateY(-14px*i) scale(1 - .05*i)`; enter 400ms `ease`; auto-dismiss 4s; transitions not keyframes; swipe dismiss is **velocity-based**: dismiss if `|drag|/elapsedMs > 0.11`; friction when dragging against dismiss direction; fill stack gaps with pseudo-elements. **Use Sonner rather than rebuilding.**
- **Entertaining loaders**: only for genuinely long waits; rotate copy every 2-3s reporting REAL progress ("Indexing 240 rows…"); playful line third, not first; fake progress stalling at 90% is a trust bug.

## 6. SURFACE TRANSITIONS

- **View Transitions API (shared element)**: `document.startViewTransition(updateDOM)`; `view-transition-name: match-element` auto-names; `view-transition-class` styles groups; MPA: `@view-transition { navigation: auto }`. React `<ViewTransition>` / Next `experimental.viewTransition`. Same-doc: Chrome/Edge/Safari 18+; degrades to instant swap. One element per name at a time or it throws. Heavy DOM = snapshot hitch.
- **Dark-mode circle reveal**: the most-shared wow of 2024-25:
```js
const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
await document.startViewTransition(() => flushSync(() => toggle())).ready;
document.documentElement.animate(
  { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
  { duration: 500, easing: 'ease-in-out', pseudoElement: '::view-transition-new(root)' });
```
Also zero out the default crossfade on `::view-transition-old/new(root)`. Feature-detect; skip under reduced motion.
- **Launch-point awareness** (Rauno): modals/lightboxes expand FROM the trigger's rect (`transform-origin` or FLIP). Its absence is why web modals feel like teleports. Directional nav: slides encode direction.
- **Dynamic tray** (Family): one container whose HEIGHT change signals step progression; content crossfades inside; never re-mount the container between steps. Height is layout: `scaleY` + counter-scale, or accept cost on a small subtree.

## 7. LISTS & LAYOUT

- **Staggered entrance**: 50-100ms/item; **stagger delay = 30-70% of item duration** (overlapping wave, not sequential ticks); clamp total after ~8 items. `animation-delay: calc(var(--i) * 60ms)`. **Stagger first paint; NEVER stagger a re-render.**
- **Sliding tab indicator**: `motion.div layoutId="indicator"` inside the active tab; `<LayoutGroup>` scopes it. Label color inversion: animate a `clip-path` over a duplicated label layer instead of transitioning `color` separately.
- **Accordion, natively**: `:root { interpolate-size: allow-keywords }` + `details::details-content { height: 0; transition: height 300ms ease-out, content-visibility 300ms allow-discrete } details[open]::details-content { height: auto }` (Chrome/Edge 129+). Fallback: `grid-template-rows: 0fr→1fr`.
- **Popover/dialog enter+exit, no JS**: the `allow-discrete` + `@starting-style` + `overlay` triad; miss one and exit silently doesn't animate (Chrome 121+, Safari 17.5+, Firefox 129+).
- **Dock magnification**: one `mouseX` motion value; per-icon distance → size via Gaussian falloff `scale = (mag-1) * exp(-d²/(2*dist²)) + 1`; spring `{ mass: .1, stiffness: 200, damping: 15 }`; reset to `Infinity` on leave.

## 8. SCROLL

- **Progress bar, zero JS**: `animation: grow linear; animation-timeline: scroll()` is compositor-driven and cannot jank. `@supports (animation-timeline: scroll())` progressive enhancement.
- **Reveal on scroll**: `animation-timeline: view(); animation-range: entry 0% cover 40%;` + `animation-fill-mode: backwards` (else it pops before range). Off main thread, so strictly better than IntersectionObserver. Reduced-motion gate mandatory (top vestibular trigger).
- **Sticky header shrink**: `animation-range: 0px 200px`; prefer transform/opacity/shadow over padding/font-size.
- **Rubber-banding**: iOS's actual formula: `f(x,d,c) = (x*d*c)/(d + c*x)` with `c = 0.55`, which gives asymptotic resistance; release with high-damping spring (bounce ≈ .1). `overscroll-behavior: contain` stops scroll-chaining. Linear "drag×0.3" feels fake by comparison.

## 9. FORMS & COMMAND

- **Floating labels**: use cautiously; above-field labels beat them past 3-4 fields. If used: animate `translateY + scale` only, 120-150ms.
- **Format-as-you-type**: live separators for phone/card/currency; restore caret after reformat; never block paste. Family detail: thousands separator SLIDES into place.
- **OTP**: single hidden input + N styled slots (`input-otp` approach); `autocomplete="one-time-code"`; paste fills all; backspace jumps back; editable after failed auto-submit.
- **Instant response rule** (Rauno): apply the user's delta immediately and continuously; animate only PAST thresholds. Waiting for a threshold to respond at all = dead control.
- **Command palette (⌘K)**: `cmdk`; subsequence match (`tgldk` → "Toggle dark mode"); Recents first; ARIA combobox with `aria-activedescendant` (never move DOM focus into the list); shortcut hints inline. **Counterintuitive rule: do NOT animate it open**; it is invoked hundreds of times/day (fade out subtly, open at 0ms).

## 10. CROSS-CUTTING LAWS

**The frequency law** (Emil + Family converged independently; the single most portable heuristic):
| Frequency | Treatment |
|---|---|
| 100+×/day | No animation. Instant. |
| Occasional | Standard 150-250ms ease-out |
| Rare / first-time / milestone | Elaborate is earned |

Marketing pages and product UI have different physics: 900ms hero choreography is right on a lander, a bug in a dashboard.

**Accessibility:** reduced-motion = remove ALL motion including big fades (some vestibular users react to opacity); guard hover with `(hover: hover) and (pointer: fine)`; anything animating text needs a static `aria-live` twin; blunt fallback:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
}
```

**Debug:** play at 10-25% speed: mismatched easings on paired elements and off-center origins become obvious. When it "feels off" inexplicably: `filter: blur(2px)` at the transition midpoint bridges states (keep <20px).

**The amateur/professional tell: interruptibility.** Can the user grab it mid-flight? Transitions retarget; keyframes restart; springs retarget AND preserve velocity.
