# CD HTML design system

## Contents

- Design intent
- Shared foundations
- Light-document mode
- Editorial-handbook mode
- Component grammar
- Composition rules
- Mode integrity

## Design intent

Build information-dense pages that feel calm, deliberate, and operational. Let hierarchy, spacing, type roles, thin rules, and semantic tinting carry the design. Decorative effects stay subordinate to reading and orientation.

The two modes share restraint but serve different reading tasks:

- **Light document:** quiet operational clarity for guides, specifications, process maps, and compact manuals.
- **Editorial handbook:** branded editorial authority for chaptered, long-form material.

## Shared foundations

### Information hierarchy

1. Establish page purpose in one concise hero or cover.
2. Expose orientation immediately through section navigation.
3. Use numbered sections or chapters as stable anchors.
4. Keep ordinary prose flat on the page.
5. Introduce a bordered or tinted component only when it changes the information type: summary, warning, comparison, process, data, or example.
6. Place the densest structures inside the widest safe region; keep prose on a narrower measure.

### Surface behavior

- Use one-pixel borders as the primary separator.
- Keep shadows nearly invisible: `0 1px 2px rgba(20, 24, 29, .03)` at most in light mode.
- Use tinted surfaces for semantic state and white surfaces for grouping.
- Pair every state color with a label, icon, marker, or border pattern.
- Avoid nested cards and decorative glass effects.

### Spacing rhythm

Use compact internal spacing and generous separation between major sections:

| Relationship | Typical spacing |
| --- | --- |
| Inline icon to label | 6–10px |
| Compact controls or chips | 6–8px gap |
| Card grid | 12–14px gap |
| Card padding | 14–20px |
| Heading to lead | 4–8px |
| Lead to first component | 14–20px |
| Major section top | 30–40px light; 74px handbook |

## Light-document mode

### Core tokens

Use these values unless the user supplies a nearer brand system:

```css
:root {
  --cd-bg: #f7f8fa;
  --cd-card: #ffffff;
  --cd-ink: #15181d;
  --cd-sub: #5b626e;
  --cd-muted: #8b8f97;
  --cd-line: #e6e8ec;

  --cd-teal: #0f6e56;
  --cd-teal-bg: #e1f5ee;
  --cd-teal-text: #085041;

  --cd-purple: #534ab7;
  --cd-purple-bg: #eeedfe;
  --cd-purple-text: #3c3489;

  --cd-blue: #185fa5;
  --cd-blue-bg: #e6f1fb;
  --cd-blue-text: #0c447c;

  --cd-amber: #854f0b;
  --cd-amber-bg: #faeeda;
  --cd-amber-text: #633806;

  --cd-coral: #993c1d;
  --cd-coral-bg: #faece7;
  --cd-coral-text: #712b13;

  --cd-green: #3b6d11;
  --cd-green-bg: #eaf3de;
  --cd-green-text: #27500a;

  --cd-red: #a32d2d;
  --cd-red-bg: #fcebeb;
  --cd-red-text: #791f1f;

  --cd-warm-gray-bg: #f1efe8;
  --cd-warm-gray-text: #444441;
}
```

### Typography

Use the native interface stack to preserve the compact documentation character and reliable CJK rendering:

```css
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC",
  "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
```

| Role | Size | Weight | Line height |
| --- | --- | --- | --- |
| Body | 15px | 400 | 1.7–1.75 |
| Hero title | 26–28px | 500–600 | 1.2 |
| Section title | 20–22px | 500–600 | 1.3 |
| Subsection title | 15.5–17px | 500 | 1.35 |
| Lead | 14–15px | 400 | 1.65 |
| Table body | 13.5px | 400 | 1.55 |
| Labels and pills | 11.5–13px | 500 | 1.3 |

Do not enlarge the hero into a marketing billboard. Its purpose is orientation, not persuasion.

### Layout

```css
.cd-wrap {
  width: min(100% - 44px, 1040px);
  margin-inline: auto;
}
```

- Use a 1000–1080px maximum content width.
- Use 22–24px side gutters.
- Give the white hero about 34–38px top padding and 22–28px bottom padding.
- Give sections 34–40px top padding and 8–12px bottom padding.
- Separate sections with `1px solid var(--cd-line)`.
- Keep descriptive leads to about 760–780px even when components use the full width.

### Navigation

Use a compact sticky horizontal navigation:

```css
.cd-nav {
  position: sticky;
  inset-block-start: 0;
  z-index: 20;
  border-bottom: 1px solid var(--cd-line);
  background: rgb(247 248 250 / 93%);
  backdrop-filter: blur(8px);
}
```

Links use 12.5–13px type, 5px vertical padding, 9–11px horizontal padding, and 7–8px radii. Hover changes surface and text color without moving the link.

### Geometry

| Element | Radius |
| --- | --- |
| Primary cards and panels | 12px |
| Chat or large grouped example | 14px |
| Avatars and icon tiles | 9–10px |
| Buttons and nav links | 8px |
| Pills and tags | 6–7px |
| Circular sequence marker | 50% |

## Editorial-handbook mode

### Core tokens

```css
:root {
  --cd-bg: #f5f6fa;
  --cd-paper-2: #e4e8f4;
  --cd-card: #ffffff;
  --cd-ink: #11141c;
  --cd-ink-2: #2a2e3b;
  --cd-ink-3: #5a5d72;
  --cd-ink-4: #a4a7b5;
  --cd-line: #c7ccdb;
  --cd-mist: #eceff7;
  --cd-soft: #eaecf7;
  --cd-navy: #100d35;
  --cd-violet: #5b54ef;
  --cd-blue: #1e79c2;
  --cd-teal: #0defc8;
  --cd-periwinkle: #b5b5ff;
  --cd-sky: #a3e4ff;
  --cd-error: #c0392b;
  --cd-gradient: linear-gradient(90deg, #0defc8 0%, #1e79c2 70%, #5b54ef 100%);
  --cd-radius: 2px;
  --cd-sidebar: 280px;
}
```

### Typography

Use three distinct roles with resilient CJK and system fallbacks:

```css
--cd-display: "Sora", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
--cd-body: "Hanken Grotesk", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
--cd-mono: "JetBrains Mono", ui-monospace, Menlo, Consolas, monospace;
```

| Role | Size | Notes |
| --- | --- | --- |
| Body | 16.5px / 1.7 | Hanken Grotesk role |
| Cover wordmark | 46–64px | Display, 800, tight tracking |
| Cover title | 32–46px | Display, 800 |
| Chapter title | 34px | Display, 700 |
| Subsection title | 22px | Display, 700 |
| Lead | 18.5px / 1.6 | Body |
| Labels | 10–12px | Mono, uppercase, `.10em–.18em` tracking |

Use mono type for metadata and orientation labels, not as a substitute for all technical content.

### Desktop shell

- Use a `280px` sticky sidebar with `height: 100vh` and independent vertical scrolling.
- Use an `880px` content measure with 40px side padding.
- Keep the main column `min-width: 0` so wide components can scroll safely.
- Use thin borders and square 2px geometry throughout.

### Cover

Use a near-full-height deep-navy cover:

```css
.cd-cover {
  min-height: 88vh;
  padding: 96px 40px 80px;
  color: #fff;
  background: var(--cd-navy);
  border-bottom: 4px solid;
  border-image: var(--cd-gradient) 1;
}

.cd-cover::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: .10;
  pointer-events: none;
  background-image:
    linear-gradient(#fff 1px, transparent 1px),
    linear-gradient(90deg, #fff 1px, transparent 1px);
  background-size: 48px 48px;
}
```

Add at most one restrained radial light field in the upper-right. Keep it behind the text and below 50% opacity. Do not use gradient text.

### Chapters

- Give each chapter about `74px 0 30px` padding.
- Use a thin top rule between chapters.
- Pair a compact blue chapter number with a mono kicker and a 34px title.
- Keep ordinary paragraphs unboxed.
- Use callouts, comparison blocks, and tables as evidence structures rather than decorative cards.

### Sidebar navigation

- Use grouped mono labels at 10px with uppercase tracking.
- Use 14px links with `8px 26px 8px 23px` padding.
- Indicate the active link with a 3px blue left rule, violet text, and the soft surface.
- Keep the brand block separate with a bottom rule.

## Component grammar

### Summary statistics

Use compact, low-contrast cells near the hero. Keep numbers at 22–24px, labels at 12.5–13px, and do not treat them as marketing proof unless the target content supports that role.

### Cards and panels

Use a card when several related details need a shared boundary. Keep padding between 16px and 20px. Avoid placing a complete card inside another card.

### Semantic callouts

Map meaning consistently:

| Meaning | Light mode | Handbook mode |
| --- | --- | --- |
| Information / active | Blue tint | Soft surface + blue edge |
| Success / verified | Green tint | Soft surface + violet edge if non-status |
| Warning / pending | Amber tint | Soft surface + blue edge or explicit warning tint |
| Stop / error | Red tint | Pale red + error edge |

Use a concise label, not color alone. Reserve red for true stop conditions.

### Tables

- Use 13.5–14.5px body type and 11–12.5px headers.
- Keep headers compact and muted; handbook headers may use mono uppercase labels.
- Use 1px rules, 9–14px cell padding, and top alignment.
- Use subtle row hover in light mode and subtle zebra rows in handbook mode.
- Place every potentially wide table inside an overflow wrapper.

### Pills and tags

Use pills for state or compact metadata, never as primary controls. Keep them between 11.5px and 12.5px, with 1–7px vertical/horizontal padding depending on density.

### Process rail

In light mode, use fixed-width steps around 116–118px, 46–48px markers, dotted connectors, compact labels, and horizontal scrolling. Emphasize only the user/current step with a filled primary marker.

In handbook mode, use a compact grid of sharp cards with a 3px top accent, sequence label, title, description, and optional dashed metadata divider.

### Comparison

- Light mode: two complementary rounded panels with a 12–14px gap.
- Handbook mode: two columns sharing one outer border, square geometry, and a single internal divider.

### Chat or conversational example

Use only when the target material genuinely explains a conversational interaction. Keep the container around 660–680px, alternate alignment, limit bubbles to about 80% width, and use asymmetric 4px tail corners. Do not preserve example dialogue from any reference.

### Diagrams and dense data

Use a white bordered container with internal padding and horizontal overflow. Make the diagram's colors use the same semantic roles as the page. Do not add a deep-navy panel to a light document solely for drama.

## Composition rules

- Use one dominant navigation model per page.
- Use one radius family per mode.
- Let neutral surfaces occupy most of the viewport.
- Use color to encode category or state, not to decorate every component.
- Vary component width by information need; do not create an endless equal-card grid.
- Keep a visible hierarchy between headings, leads, body, metadata, and labels.
- Preserve reading order when columns collapse.

## Mode integrity

The most common failure is unprincipled blending. Reject these combinations unless the user explicitly requests a hybrid:

- Dark near-full-height cover + compact light top navigation.
- Sharp handbook table + rounded light card grid with unrelated geometry.
- Handbook chapter rail on a short quick-start guide.
- Light mode's many pastel semantic cards inside a branded editorial chapter.
- Active chapter observer, reveal motion, or progress UI added to a simple light page without an orientation problem.

When a hybrid is explicit, nominate one owner for each system:

| System | Must belong to one mode |
| --- | --- |
| Navigation | Light top bar or handbook sidebar |
| Typography | Native documentation stack or display/body/mono triad |
| Geometry | Soft rounded or sharp square |
| Motion | Minimal light behavior or handbook chapter behavior |
