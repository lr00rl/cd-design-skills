# Signature Details — the "眼前一亮" Catalog

Small, concrete moves that make a page feel authored. Pick **2–4 per surface**, matched to the chosen style — never all of them. Every detail must have a job; the collection below is a menu, not a checklist.

## 1. Texture & surface (static wow)

- **Noise/grain overlay** — kills gradient banding, adds materiality. SVG `feTurbulence` or tiled noise PNG at 5–15% opacity. Rules: exempt body text; use a fixed overlay or bake into images (full-page animated noise hurts scroll perf). Signature of dark-luxury AND risograph styles.
- **Blueprint grid + corner crosshairs** — faint `24px` line grid or `16px` dot matrix at 5–10% opacity (`#E5E7EB` on light) + `+` marks at section intersections. If you notice it, it's too strong.
- **Riso misregistration** — offset one color channel of a headline/illustration by 2–3px. Instantly "printed by hand."
- **Paper edge / torn edge / tape** — collage register; shadows must imply real stacking.
- **Scrim discipline** — the universal rule behind every texture/gradient/glass style: **text never sits on a translucent or shifting surface without an opaque panel** (`rgba(10,8,20,.55)`+ blur behind text, or solid card).
- **Engraved/embossed text** — `text-shadow: 0 1px 0 rgba(255,255,255,.5)` on mid-tone surfaces (skeuomorphic register).
- **Hairline everything** — 1px borders `rgba(255,255,255,.06)` (dark) / `#E6E8EC` (light) instead of shadows; the cheapest "engineered" signal.

## 2. Borders, glows & light

- **Border beam** — a light tracing the card perimeter: element on `offset-path: rect(0 auto auto 0)` or rotating conic-gradient behind a masked border, `linear` 6–14s. **One per screen** — it marks THE card that matters (featured plan, upgrade CTA). Two beams = casino.
- **Gradient border** — conic/linear gradient on `::before` with `padding: 1px; mask: linear-gradient(#000,#000) content-box exclude` — premium chip/card edge without fill.
- **Spotlight tracking** — radial glow following the pointer across cards (see micro-interactions §3). The interactive sibling of the border beam.
- **Light streaks / beams** — thin diagonal gradient streamers sweeping a dark hero section on scroll (Linear marketing register).
- **Glow accent** — the ONE saturated accent gets `box-shadow: 0 0 24px color-mix(in oklch, var(--accent) 40%, transparent)`. State, not decoration.
- **Top inner highlight** — `inset 0 1px 0 rgba(255,255,255,.35)` on glass/elevated cards — the 1px that sells the material.

## 3. Typography as detail

- **Prompt-string kickers** — `user@site:~$` before headings (terminal register: the single highest-impact mono detail).
- **ALL-CAPS mono kickers** — 11–12px, `letter-spacing: .12–.18em`, muted color, above headlines. Instant editorial/technical structure.
- **Drop caps & pull quotes** that break the column (editorial register).
- **Kinetic variable-axis moment** — ONE headline animating ONE axis (weight on hover, width on scroll). Recursive/Fraunces/Roboto Flex.
- **Scribbled emphasis** — hand-drawn SVG circle/underline around one key phrase, drawn on scroll via `stroke-dashoffset` (organic register).
- **Blinking block cursor `▋`** — ~530ms `step-end` after a headline or streaming text.
- **Tabular numerals** — `font-variant-numeric: tabular-nums` on ALL data/prices/timers. Absence = jittering amateur tell.

## 4. Moments of personality (behavioral wow)

- **The shy/reactive mascot** — element with a face that responds to cursor proximity (e.g. a card that leans away and trembles when the pointer approaches: trigger `dist<170px`, tilt `-dx*f*.45`, container `overflow:hidden`). Password fields with an avatar covering its eyes. One per product, on a low-stakes surface.
- **Fidget affordances** (Rauno/Family) — non-functional springy toys: a QR code that ripples on tap, a logo that can be flicked and springs back (`dragElastic: .2` + low-damping spring). Discoverable-but-skippable is the whole design.
- **Confetti with the FEAT gate** — Frequency (daily? then NO) / Emotion / Anticipation / Timing. Family fires it on wallet backup — once-ever, high-anxiety-relief. `canvas-confetti`, <100 particles, origin at the causing element, never screen center. Skip under reduced motion.
- **UI sound** — <200ms samples, played SYNCHRONOUSLY with a physical-looking motion (delete-tumble + thunk). Muted by default with a persistent toggle; never the only channel for a state change.
- **Empty states with personality** — formula: witty headline + straightforward subtext + exactly ONE primary CTA + optional small illustration. Two parts instruction, one part delight. **The first empty screen is onboarding — treat it that way.**
- **Easter eggs** — konami codes, logo long-press, 404 games. Belong in personal/creator/dev products; cost nothing when undiscovered.
- **Dark-mode circle reveal** — see micro-interactions §6; a one-time theatrical moment that users show their friends.

## 5. Structure as detail

- **Marquee/ticker strip** — logos or keywords, `translateX(-50%)` with the track duplicated exactly once (invisible loop point); pause on hover/focus; duplicate set `aria-hidden`; STOP entirely under reduced motion. `linear` is correct here.
- **Sticky section headers with scroll effects** — date/section labels that stack and hand off (iOS Contacts pattern).
- **Scroll progress rail** — chapters/dots for long-form; zero-JS via `animation-timeline: scroll()`.
- **⌘K hint chips** — inline `<kbd>` on actions; the palette is how users learn shortcuts.
- **Comparison sliders, before/after wipes** — one interactive proof beats three paragraphs.
- **One oversized number** — a single 96px+ stat with a 12px label; contrast in scale IS the design (bento hero tile pattern).

## 6. AI-product signatures (2025–2026)

- **Shimmer-on-text as thinking state** — implies content arriving; beats spinners for LLM latency.
- **Honest streaming** — typewriter on real tokens; never fake it on static content.
- **Visible reasoning states** — "Searching… / Reading 3 files… / Writing" step markers: perceived reliability now beats perceived speed.
- **AI in the margins** — assistant as sidebar/overlay, not full-screen takeover.

## 7. Anti-slop counterweights (use when a safe style needs an edge)

Each pairs a mainstream base with ONE differentiating move:
- Dark SaaS base → swap Inter for a mono or display serif headline face.
- Aurora hero → unusual hue pair (amber/teal instead of purple/blue) + noise + editorial type.
- Bento base → one tile breaks the grid (rotated, oversized, or animated).
- Minimal base → one hand-drawn annotation layer, or a single riso-textured image.
- Blueprint base → one warm human element (photo, handwriting, illustration).

## Budget rule

**A plain layout with three perfect details beats a busy layout with none.** Details compound (Emil: "unseen details compound — this aggregate of invisible correctness creates interfaces people love"), but only when they share one personality. Before shipping, list your details and ask: same character? same physics? each earning its frequency?
