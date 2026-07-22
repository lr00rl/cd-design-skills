# Component Adoption — Use Before Rebuilding

Treat component choice as a product constraint, not an authorship contest. Start at the lowest rung that meets the real requirement; climb only when observed evidence proves the current boundary insufficient.

## The adoption ladder

| Rung | Choose when | Deliverable | Escalate when |
|---|---|---|---|
| **1. Use** | The component covers ≥80% of required behavior and the task is a spike, prototype, or low-risk surface | Direct dependency with its documented API | Brand mismatch or repeated local overrides appear |
| **2. Theme** | Structure/behavior fit; palette, type, geometry, or motion needs alignment | Component + local token adapter loaded after it | Public variables cannot express the design system |
| **3. Wrap** | The component needs semantic HTML, responsive constraints, analytics, or one stable behavior shim | Thin local wrapper; upstream internals remain untouched | The wrapper starts reimplementing layout/state logic |
| **4. Pin or vendor** | The surface is shipping, upstream is unversioned, or deterministic builds matter | Exact tag/commit pin, or reviewed local copy with license/provenance | Security, maintenance, or architectural ownership becomes unacceptable |
| **5. Rebuild** | Core semantics, accessibility, collision/layout, performance, interaction, or platform support cannot be fixed at the boundary | Product-owned implementation driven by local tokens | Stop after required states pass; do not copy unused upstream surface area |

**Default:** Use → Theme for rapid iteration. Production usually lands on Theme + exact pin, or Theme + vendor. Rebuild is an evidence-backed exception.

**Authorization gate:** selecting or recommending a component does not authorize adding a dependency during a design/review-only task. Link, install, or vendor it only inside an implementation request that already permits the change, or when the user explicitly asks to adopt that component. Preserve the workspace rule of no new dependencies without authority.

## Decision gates

Use an existing component when all are true:

- Its public API represents the required states without DOM hacks.
- Style differences fit behind variables, adapter selectors, or a thin wrapper.
- It has acceptable license, bundle/runtime cost, browser support, and maintenance posture.
- Essential meaning remains in real HTML; decoration is not the only accessibility channel.
- Long content, narrow screens, focus, themes, and reduced motion can be verified.

Rebuild when any core requirement needs repeated `!important`, deep internal selectors, DOM duplication, layout polling, inaccessible generated content, or a fork that would diverge immediately. Three one-off adjustments are evidence for a token; three patches against internals are evidence the boundary is wrong.

## Production safeguards

1. Pin a release or exact commit; do not ship a floating branch URL.
2. Record upstream URL, license, pinned revision, and intentional local overrides beside the adapter or vendored file.
3. Load local tokens first, upstream component CSS second, and the adapter last.
4. Keep the adapter small and public-API-only. Never paste the whole dependency into a style token file.
5. Re-run visual, accessibility, mobile, dark-theme, and reduced-motion checks before upgrading.
6. If consuming a fork, record its parent and intentional delta. Prefer canonical upstream when the fork is identical; a mirror without local policy adds no stability.

## `neat-annotations` quick path

Use [neat-annotations](https://github.com/syabro/neat-annotations) directly for Annotated Developer Editorial marginalia. It is one MIT-licensed CSS file with no JavaScript or build step. Its public contract is `ann` + a direction class + optional color class + `data-note`, with CSS variables for color, mark, font, gaps, label width, offsets, and rotation.

For a disposable prototype, the floating upstream URL `https://cdn.jsdelivr.net/gh/syabro/neat-annotations/neat-annotations.css` is the fastest path. At last verification upstream published no tags, so for reproducible work replace `<commit-sha>` with a reviewed revision:

```html
<link rel="stylesheet" href="/styles/annotated-developer-editorial/tokens.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/syabro/neat-annotations@<commit-sha>/neat-annotations.css">
<link rel="stylesheet" href="/styles/annotated-developer-editorial/neat-annotations-adapter.css">

<body class="ade-annotations">
  The spec stays <span class="ann ann-n ann-green" data-note="same commit">in sync</span>.
</body>
```

Load or self-host Shantell Sans when its handwritten character matters; otherwise accept the component's cursive fallback deliberately.

The adapter scopes changes under `.ade-annotations`, maps component variables to `--ade-*`, uses separate AA-safe ink colors for small labels, and disables rainbow cycling because it conflicts with this style's restrained motion grammar.

For a custom hue, set both channels: `--ann-color` for the arrow/mark and `--ann-text-color` for an independently contrast-checked label.

Keep `data-note` decorative. Repeat essential instructions/status in visible HTML or connect a real description with `aria-describedby`. Annotations sit outside the target and reserve no layout space; test long labels, viewport edges, 375px layouts, zoom, and translated copy.

Move to Wrap or Rebuild when annotations need automatic collision avoidance, semantic note content in the DOM, dynamic edge selection, dense repeated placement, or product-specific drawing/motion beyond the public variables. Preserve `tokens.css` as the source of truth so the visual language survives either implementation.
