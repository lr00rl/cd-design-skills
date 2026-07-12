# Interaction and responsive behavior

## Contents

- Progressive-enhancement contract
- Anchor navigation
- Active chapter tracking
- Reveal motion
- Focus and state feedback
- Responsive behavior by mode
- Wide structures
- Interaction failure modes

## Progressive-enhancement contract

Build the full reading experience in HTML and CSS first. JavaScript may improve orientation, feedback, or motion, but must never gate headings, prose, data, or navigation destinations.

Use this sequence:

1. Render all content visibly.
2. Make every anchor destination work without script.
3. Add focus and hover states in CSS.
4. Add smooth scrolling only when it improves a long-page transition.
5. Add active-section tracking only when the navigation model needs persistent orientation.
6. Add reveal motion only for supporting handbook blocks.

Do not add reading progress, resume position, accordions, tabs, filters, or app controls unless the user's target task explicitly requires them.

## Anchor navigation

### Light-document behavior

Use native fragments as the baseline. Add smooth scrolling as a small enhancement:

```js
document.querySelectorAll('.cd-nav a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});
```

Give targets a scroll offset so sticky navigation never covers headings:

```css
[id] { scroll-margin-top: 72px; }
```

Do not add active-section tracking to a small light guide unless the user needs persistent location feedback.

### Handbook behavior

Use CSS smooth scrolling as the default enhancement:

```css
html { scroll-behavior: smooth; }
.cd-anchor { scroll-margin-top: 20px; }
```

The sidebar stays visible on desktop, so active chapter state materially improves orientation.

## Active chapter tracking

Use one `IntersectionObserver` and a map from section ID to navigation link. Keep the active zone near the top of the reading viewport:

```js
const links = [...document.querySelectorAll('.cd-toc a[href^="#"]')];
const linkById = new Map(
  links.map((link) => [link.getAttribute("href").slice(1), link])
);

const sections = [...linkById.keys()]
  .map((id) => document.getElementById(id))
  .filter(Boolean);

const sectionObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    links.forEach((link) => {
      const current = link === linkById.get(entry.target.id);
      link.classList.toggle("is-active", current);
      if (current) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
}, {
  rootMargin: "-10% 0px -80% 0px",
  threshold: 0
});

sections.forEach((section) => sectionObserver.observe(section));
```

Avoid flicker at very short chapters. If multiple sections repeatedly intersect, prefer the one nearest the top edge or merge undersized sections into a larger navigation destination. Do not stack multiple observers that compete for active state.

## Reveal motion

Use reveal motion only in `editorial-handbook` mode and only for supporting blocks such as callouts, comparisons, or process components. Keep chapter headings and core prose visible.

Default CSS must show the content. Apply the hidden starting state only after JavaScript confirms enhancement is available:

```css
.js .cd-reveal {
  opacity: 0;
  transform: translateY(10px);
  transition: opacity .5s ease, transform .5s ease;
}

.js .cd-reveal.is-visible {
  opacity: 1;
  transform: none;
}
```

```js
document.documentElement.classList.add("js");

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("is-visible");
    observer.unobserve(entry.target);
  });
}, {
  rootMargin: "0px 0px -8% 0px",
  threshold: 0.05
});

document.querySelectorAll(".cd-reveal").forEach((element) => {
  revealObserver.observe(element);
});
```

### Reduced motion

Always include:

```css
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }

  .js .cd-reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Do not override the media query in JavaScript.

## Focus and state feedback

The source visual language is quiet; accessibility feedback should remain clear rather than decorative.

```css
:focus-visible {
  outline: 3px solid var(--cd-blue, #185fa5);
  outline-offset: 3px;
}
```

- Use real links for navigation and real buttons for actions.
- Do not make a decorative pill appear clickable.
- Pair `.is-active` with `aria-current="location"` for navigation.
- Pair selected controls with `aria-pressed` or the native checked state when controls are actually interactive.
- Keep hover and focus visually related, but never remove the focus outline.
- Keep click targets at least 40px high when they perform an action; compact navigation links may be smaller if their total row height and spacing remain usable.

## Responsive behavior by mode

### Light document

Use source-family breakpoints as intent bands, not arbitrary device names:

| Band | Behavior |
| --- | --- |
| `<= 820px` | Reduce five-column maps to two columns; stack paired dense panels if needed. |
| `<= 760px` | Stack responsibility panels, status grids, FAQs, and three-up starter cards to one column. |
| Narrow widths | Keep step rails and wide tables horizontally scrollable. |

Use about 22px side gutters on narrow screens. A four-cell statistic grid may become two columns before it becomes one.

Prevent a wrapped sticky navigation from occupying several rows:

```css
@media (max-width: 760px) {
  .cd-nav__inner {
    flex-wrap: nowrap;
    overflow-x: auto;
    scrollbar-width: thin;
  }

  .cd-nav a { white-space: nowrap; }
}
```

### Editorial handbook

At `920px` and below:

- change the shell from flex to block;
- change the sidebar from sticky 100vh to normal document flow;
- remove the right border and add a bottom border;
- reduce content side padding from 40px to 22px;
- reduce cover padding from roughly `96px 40px 80px` to `64px 22px 54px`;
- reduce the cover wordmark to about 46px and title to about 32px;
- reduce four-column process grids to two columns;
- stack decision grids, engine comparisons, and two-column keep/avoid comparisons;
- keep every chapter destination available.

If the sidebar table of contents is long, use a compact native disclosure or a horizontally scrollable grouped index. Do not dump dozens of links above the content without a way to collapse or scroll them.

## Wide structures

Use an explicit wrapper:

```css
.cd-scroll-x {
  max-width: 100%;
  overflow-x: auto;
  overscroll-behavior-inline: contain;
}

.cd-scroll-x > table {
  min-width: 720px;
}
```

For step rails, give each step a fixed basis. Do not squeeze labels until they wrap into single-character columns.

Use a short visual cue or accessible label to communicate that horizontal content can scroll. Do not hide scrollbars without another affordance.

## Interaction failure modes

| Failure | Prevention |
| --- | --- |
| Heading disappears under sticky nav | Apply `scroll-margin-top` to every anchor target. |
| Content stays invisible when script fails | Make visible the default; add hidden state only under `.js`. |
| Active link flickers | Use one observer and a narrow top reading zone. |
| Mobile nav consumes the viewport | Use nowrap + horizontal scroll or a compact disclosure. |
| Keyboard users cannot see location | Add `:focus-visible` and `aria-current`. |
| Motion ignores preferences | Disable smooth scroll, transforms, and transitions under reduced motion. |
| Wide table breaks layout | Use a dedicated overflow wrapper and readable minimum width. |
| Decorative controls imply functionality | Use non-interactive markup or implement the full state behavior. |
| Script creates the only navigation path | Keep native fragment links working before enhancement. |
