# Style Playbooks — the Style Encyclopedia (2025–2026)

31 named styles. Each entry: vibe → signature moves → palette → type → motion → fits/clashes → exemplars → failure modes. Pick ONE style per surface, commit hard, and read its failure modes before shipping.

Research basis: Figma trends, NN/g, Awwwards 2025, Apple WWDC25, Malewicz, Setproduct, LogRocket, DESIGN.md 461-style library, Webflow/Tubik/Envato 2026 forecasts.

## How to read the macro-context (2026)

1. **Anti-AI-slop is the meta-trend.** Audiences pattern-match "Inter + purple→blue gradient + 16px-radius cards + centered hero" in under a second and assign LESS credibility. Visual personality is now a trust signal. Typography is the fastest exit from generic.
2. **Two opposite escapes from flat-minimal are both booming:** soft/tactile/warm (clay, soft-UI, quiet luxury, earth tones) vs hard/exposed/technical (mono, visible grids, blueprint). The mushy middle is dying.
3. **Ship-reality gap:** organic blobs/broken grids almost never ship on conversion-critical flows. *Design the skin boldly, keep the chassis Swiss.*
4. **One "wow" moment per viewport.** Aurora, 3D, kinetic type, glass all lose power when repeated.

---

## FAMILY 1 — DEPTH & MATERIAL

### 1.1 Liquid Glass (Apple 2025)
- **Vibe:** light itself as material — chrome that bends/refracts content beneath.
- **Moves:** refraction not just blur (edge acts as a lens); specular highlight tracks pointer; **concentricity** (control radius = parent radius − padding); elastic/gel physics — controls stretch, merge, snap back; floating chrome shrinks on scroll; two tiers: Regular (chrome) / Clear (media + dimming scrim).
- **Palette:** a material, not colors — tint sampled from content. Scaffolding `#000` `#1C1C1E` `#F2F2F7` `#FFF`; fills `rgba(255,255,255,.06–.18)`; rims `rgba(255,255,255,.25)`.
- **Type:** SF Pro; free: Inter (optical sizing), Instrument Sans, Geist. Weight 500–600; never thin over glass.
- **Motion:** springs/gel, elastic overshoot on press, morph transitions. Ease-in-out reads fake.
- **Fits:** consumer apps, media players, visionOS-adjacent marketing. **Clashes:** dense tables, forms, long reading, enterprise dashboards, low-end devices.
- **Ready tokens:** `style-tokens/liquid-glass/tokens.css`.
- **Failures:** legibility collapse over busy backdrops; `backdrop-filter` scroll jank on low-end Android; ignoring `prefers-reduced-transparency`; glass on content instead of chrome; faking with flat blur (= 2020 glassmorphism). Note: "Anti-Liquid-Glass" is a named 2026 counter-movement — if it only looks good on a flagship phone at full brightness, reconsider.

### 1.2 Glassmorphism (tempered, 2026 form)
- **Vibe:** frosted panes over color — depth without weight.
- **Moves:** `backdrop-filter: blur(12–16px) saturate(140%)`; fill `rgba(255,255,255,.10–.35)`; **1px top inner highlight border `rgba(255,255,255,.35)` (this sells the glass)**; radius 16–24px; saturated backdrop mandatory; ≤3 z-planes. **Dominant 2026 production pattern = hybrid: flat UI + glass on only 1–2 hero elements.**
- **Palette:** bed `#0F0C29→#302B63→#24243E` or color blobs `#FF6B9D` `#4ECDC4` `#FFD93D`; panels `rgba(255,255,255,.12)`.
- **Type:** Poppins / Manrope / Plus Jakarta Sans; two weights; no serifs over blur.
- **Motion:** bg blobs drift 12–20s; glass itself static; hover = lift + border brighten.
- **Fits:** fintech/crypto dashboards, music, AI landers, auth cards. **Clashes:** editorial reading, gov/health, e-comm grids.
- **Ready tokens:** `style-tokens/glassmorphism/tokens.css`.
- **Failures:** text directly on 10%-opacity panel (add a ~30% film behind text; target 7:1); >3 layers = mud; no `@supports (backdrop-filter: blur(1px))` fallback.

### 1.3 Claymorphism
- **Vibe:** inflatable squeezable 3D — UI as friendly plasticine toys.
- **Moves:** oversized radii 24–40px; **the double shadow** — big soft outer drop + TWO inner shadows (light top-left, dark bottom-right) creating thickness; floats above bg; chunky 3D icons; **no borders ever**.
- **Palette:** vivid pastels on tinted (never white) ground: bg `#F2F0FF`, cards `#FFF`, accents `#7C5CFF` `#FF8FAB` `#7BE0C2` `#FFD166` `#5BC0EB`.
- **Type:** Poppins SemiBold / Nunito / Baloo 2 / Outfit / Quicksand. Never script.
- **Motion:** squash-and-stretch; press = `scale(.96)` + deepened inner shadow; hover floats 4px; bouncy springs only.
- **Fits:** EdTech, kids, wellness, habit trackers, fintech-for-normies, onboarding. **Clashes:** enterprise B2B, luxury, editorial.
- **Ready tokens:** `style-tokens/claymorphism/tokens.css`.
- **Failures:** same radius+shadow everywhere = zero hierarchy; pastel-on-pastel fails WCAG; infantilizing on serious products; screams "2021 Dribbble" if not executed freshly.

### 1.4 Neumorphism / Soft UI 2.0
- **Vibe:** everything carved from one continuous sheet.
- **Moves:** element bg = page bg; light shadow top-left `-6px -6px 12px #FFF` + dark bottom-right `6px 6px 12px #BEC8D1`; `inset` when pressed.
- **Palette:** mid-gray-blues only: `#E0E5EC` / light `#FFF` / dark `#A3B1C6`; dark theme `#2E3239` `#3A3F47`; accent must be real color `#4D7CFE`.
- **Type:** Nunito Sans / Rubik / Montserrat; color carries emphasis.
- **Motion:** the ONE good interaction: outer-shadow → inset on press, ~120ms.
- **Fits:** audio/hardware controllers, smart home, calculators, car HMI. **Clashes: essentially all information-dense web UI.**
- **Failures: fails accessibility by construction** (affordance at ~1.1:1 contrast). Never build a whole product in it. What ships in 2026 is "Soft UI 2.0" = soft shadows + REAL contrast.

### 1.5 Skeuomorphism Revival ("material, not metaphor")
- **Vibe:** tangible surfaces return — without the leather stitching.
- **Moves:** realistic material surfaces (brushed metal, ceramic, paper, rubber) without literal objects; physically-plausible shadows; specular highlights + bevels; high-fidelity 3D icons; **one implied light source, top-center, always**; engraved text `text-shadow: 0 1px 0 rgba(255,255,255,.5)`.
- **Palette:** material-driven: chrome `#C0C4C8→#8A9098`, warm ceramic `#F5F0E8`, deep felt `#2A3B2F`, brass `#B08D57`.
- **Motion:** physical — depress, hinge, slide with weight; pairs naturally with micro-sound UX.
- **Fits:** spatial/Vision Pro, audio/DAW, gaming, hardware companions. **Clashes:** high-density productivity, themeable systems.
- **Failures:** 2010 Apple pastiche (linen/felt) = instantly dated; materials disobeying the single light source; heavy assets.

---

## FAMILY 2 — STRUCTURE & GRID

### 2.1 Bento Grid
- **Vibe:** Japanese lunchbox of content — modular unequal tiles, dense but never cluttered. THE layout of 2024–2026 (now default, not differentiator — the wow must come from inside the tiles).
- **Moves:** asymmetric spans (2×2 hero beside 1×1 stats); **uniform gap (16–24px) and uniform radius (12–24px) across ALL tiles — uniformity makes asymmetry read as intentional**; one media tile as "the star"; one idea per tile; tile bg vs canvas: `#FFF` on `#F7F7F8` or `#141414` on `#0A0A0A`.
- **Type:** Inter/Geist/Satoshi + one strong display weight; headline size CONSTANT across tiles.
- **Motion:** per-tile hover lift + border brighten; staggered entrance 30–50ms/tile; never all at once.
- **Fits:** feature walls, SaaS landers, dashboards, portfolios — almost everything. **Clashes:** long-form narrative, single-message campaigns.
- **Failures:** bento as hierarchy-avoidance (9 equal tiles = nothing matters); mismatched padding/radii/gaps; paragraph crammed in 1×1.

### 2.2 Swiss / International Typographic Style
- **Vibe:** objectivity as aesthetic; everything justified by the grid.
- **Moves:** strict 12-col grid on 8pt baseline; single Helvetica-class sans, 2–3 weights; flush-left/ragged-right only; whitespace as structure; hierarchy from size+weight ONLY (no color/boxes); asymmetric but mathematically balanced; occasional huge type as sole graphic.
- **Palette:** `#000` `#FFF` `#F2F2F2` + ONE signal color (`#E30613` red or `#0000FF` Klein blue). Two colors max.
- **Type:** Helvetica/Neue Haas/Univers; free: Inter, Archivo, Work Sans, Public Sans, Host Grotesk, Space Grotesk.
- **Motion:** almost none — instant states, hard cuts, linear slides. Mechanical.
- **Fits:** agencies, architecture, museums, editorial, enterprise B2B, docs. **Clashes:** consumer playfulness, kids, impulse e-comm.
- **Failures:** boring ≠ rigorous — Swiss without asymmetric tension is a gray Helvetica wall; it's the closest legitimate style to AI slop (the difference is spacing discipline + one perfect type ratio).

### 2.3 Blueprint / Technical Grid ("the Vercel aesthetic")
- **Vibe:** engineering paper — drafted, not designed.
- **Moves:** faint bg grid `background-size: 24px 24px` (or 16px dot matrix) at **5–10% opacity**, line color `#E5E7EB` — *if you notice it, it's too strong*; hairline 1px borders everywhere, dividers not shadows; **corner "+" crosshairs at section intersections**; ALL-CAPS wide-tracked mono kickers; CAD-style numbered sections; wireframe logic in shipped UI.
- **Palette:** light `#FFF`/`#E5E7EB`/`#000`/`#666` + one accent; dark `#000`/`#1A1A1A` grid/`#EDEDED`/`#888`. Radically low chroma.
- **Type:** **Geist Sans + Geist Mono** (canonical); Inter + JetBrains Mono; IBM Plex pair. Mono used structurally.
- **Motion:** crisp, 120–180ms, no bounce; borders brighten; 1px translate fades.
- **Fits:** dev tools, infra/AI platforms, API docs, security, technical portfolios. **Clashes:** consumer lifestyle, food, emotional brands.
- **Failures:** grid opacity >20% = graph paper; grid without the type/spacing/color discipline; **"Vercel-clone" is itself becoming 2026's slop signature** — needs a second idea.

### 2.4 Data-Dense Dashboard (the Linear look, product surfaces)
- **Vibe:** professional density — keyboard-first, zero chrome, everything one keystroke away.
- **Moves:** compact rows 28–36px; ⌘K palette as primary nav; inline `<kbd>` hints; 1px borders not shadows; muted-until-hover controls; ONE saturated accent used only for state; tabular numerals; strict 4px spacing scale.
- **Palette:** dark-first: `#08090A` base, `#101012` elevated, `#1C1C1F` border, `#F7F8F8` text, `#8A8F98` secondary; accent `#5E6AD2` (Linear indigo) or `#FF6363` (Raycast); semantics `#4CB782` `#F2C94C` `#EB5757`.
- **Type:** Inter with `letter-spacing:-0.01em` (Linear's actual choice); Geist; mono for IDs.
- **Motion:** sub-100ms, near-instant, optimistic UI. "No latency" is a motion decision.
- **Fits:** pro tools, issue trackers, analytics, agent consoles. **Clashes:** first-time consumer, low-frequency products (density punishes infrequent users), older users.
- **Failures:** cargo-cult skin (dark sidebar + ⌘K) without keyboard-driven substance; density without spacing system = noise; accent used decoratively; most-cloned SaaS look — reads competent, not distinctive.

### 2.5 Broken Grid / Organic Layout
- **Vibe:** deliberate asymmetry/overlap — composed by a human.
- **Moves:** elements overlap and bleed across columns; intentional text-image collision; 2–5° rotations; blob SVG cutouts; scroll layer separation; strict OPTICAL balance despite no visible grid logic.
- **Palette:** warm organic: `#F5F1EA` bone, `#2C2A25` ink, `#D97757` terracotta, `#7A8B6F` sage, `#E8C39E` sand.
- **Type:** high-contrast display serif + neutral grotesk: Fraunces, Instrument Serif, Bricolage Grotesque, Syne.
- **Motion:** scroll parallax between layers; elements settle into place; smooth-scroll (Lenis).
- **Fits:** portfolios, agencies, fashion, editorial features, campaign microsites. **Clashes: almost never ships on B2B SaaS/e-comm/conversion flows — treat as marketing/portfolio-only.**
- **Failures:** breaks at 1024–1280px (brutally expensive responsive); text over image without scrim; random rotation ≠ composition; DOM order diverging from visual order (screen readers); CLS failures.

---

## FAMILY 3 — RAW & LOUD

### 3.1 Neubrutalism
- **Vibe:** anti-design productized — loud, blocky, repeatable as a system.
- **Moves:** **hard drop shadow `4px 4px 0` / `6px 6px 0`, ZERO blur**, often colored; thick black borders 2–4px; radius 0 (hard) or 8–12px (soft brutalism); exposed structure; oversized quirky grotesques; rotated sticker badges; **press = element moves INTO its shadow (`translate(4px,4px)` + shadow→0) — the money detail.**
- **Palette:** 2–3 bold colors on white/black: `#000` + `#FFF` + one of `#FFDE00` `#FF4911` `#00E599` `#7B61FF` `#FF90E8` (Gumroad pink). NN/g: limit to 2–3.
- **Type:** free: Archivo Black, Space Grotesk, Bricolage Grotesque, Anton, Bebas Neue; body Inter/Public Sans. Paid: Neue Machina, Monument Extended.
- **Motion:** snappy physical — instant or 100ms linear; hover = shadow grows; active = slam into shadow; playful `rotate(-2deg)`.
- **Fits:** creator tools, indie SaaS, dev tools with attitude, Gen-Z fintech, events. **Clashes:** luxury, healthcare, traditional finance, gov, enterprise procurement.
- **Ready tokens:** `style-tokens/neubrutalism/tokens.css`.
- **Failures:** bold-looking but WCAG-failing contrast (yellow-on-cyan); no hierarchy when everything has border+shadow; whitespace starvation (NN/g antidote: 24–32px margins); costume on a conservative brand; hard-shadow button is now a Tailwind snippet — needs a second idea.

### 3.2 True Brutalism / Raw Web
- **Vibe:** honesty of materials — this is HTML, not pretending to be an app.
- **Moves:** default browser styling; blue underlined links; visible `<hr>`; no radius/shadow/framework; single column, max-width in `ch`.
- **Palette:** `#FFF` `#000` `#0000EE` link `#551A8B` visited. That's it.
- **Type:** system defaults, Times, Courier; free: EB Garamond, Space Mono.
- **Motion:** none — motion betrays the premise.
- **Fits:** personal sites, manifestos, technical writing, hacker culture; genuinely the fastest/greenest web. **Clashes:** every conversion funnel.
- **Exemplars:** Berkshire Hathaway, Hacker News, Paul Graham's site, The Monospace Web.
- **Failures:** confusing raw with broken/hostile; **genuine brutalism has ferocious information hierarchy** — expressed through size and whitespace instead of decoration.

### 3.3 Dopamine / Maximalism
- **Vibe:** joy as a design goal — the backlash against beige.
- **Moves:** saturated CLASHING pairs used deliberately; collage layers; patterned bg (checkerboard, halftone); oversized display type in multiple faces; sticker badges; density is the point; unexpected section transitions.
- **Palette:** cobalt `#0047FF`, emerald `#00A651`, tangerine `#FF6B00`, sunflower `#FFD800`, hot pink `#FF2E93`, purple `#7B2FF7` — together. Neutral banned.
- **Type:** mix a fat display + condensed + mono: Anton, Unbounded, Rubik Mono One, Big Shoulders, Syne.
- **Motion:** energetic — marquee strips, hover color-flips, confetti, sound, easter eggs.
- **Fits:** music, food, streetwear, festivals, Gen-Z consumer, creator economy. **Clashes:** B2B, finance, health, quiet luxury.
- **Failures:** maximalism without a strict underlying grid = chaos; color-only meaning fails a11y; kills conversion where a decision must be made; fatiguing daily. (Framing: maximalism is an aesthetic; "dopamine design" is a purpose — joy — executable at any intensity.)

### 3.4 Y2K / Cyber-Y2K / Retro-Futurism
- **Vibe:** 1999's optimism-anxiety, revived because AI-era energy matches it.
- **Moves:** chrome/liquid-metal 3D type; iridescent holo gradients; lens flares; translucent plastic; pixel/glitch artifacts; decorative OS chrome (windows, dialogs); low-poly 3D.
- **Palette:** electric blue `#00B7FF`, cyber lime `#B4FF00`, hot pink `#FF00A0`, chrome ramp `#C8CDD4→#F2F5F7→#8E969E`, deep space `#0B0E1A`.
- **Type:** Orbitron, Michroma, Chakra Petch, VT323, Nabla (chrome color font).
- **Motion:** glitch/scanline transitions, chromatic aberration on hover, cursor trails — deliberately "too much."
- **Fits:** music/nightlife, gaming, crypto, streetwear, festival microsites, AI-with-edge. **Clashes:** trust-critical products — the aesthetic connotes instability.
- **Failures:** nostalgia without craft = just a bad 2001 site; chrome type is display-only (illegible small); short half-life.

### 3.5 Vaporwave / Synthwave
- **Vibe:** melancholy neon nostalgia — sunset over an infinite grid.
- **Moves:** perspective grid to horizon; sliced sun circle; magenta→cyan gradients; VHS scanlines; neon glow via layered shadows.
- **Palette:** `#FF2E97` magenta, `#00F0FF` cyan, `#7B2FF7` violet, `#FFB700` amber on `#0D0221`.
- **Type:** Orbitron, Monoton, Audiowide, Press Start 2P.
- **Motion:** slow hypnotic 10–20s loops — sun-rise, grid scroll, CRT flicker.
- **Fits:** music, gaming, retro-tech, event promo. **Clashes:** everything professional — *there is no good answer for what a data table looks like in vaporwave.*
- **Failures:** costume, not system; glow tanks contrast; katakana+bust+palm tree is now parody.

### 3.6 Pixel / 8-bit
- **Vibe:** deliberate low-res as craft — anti-photorealism, pro-human-hand.
- **Moves:** fixed pixel unit (everything a multiple of 4/8px); `image-rendering: pixelated`; stair-stepped borders via `box-shadow` (never `border-radius`); **dithered gradients, never smooth**; sprite animation 8–12fps via `steps()`.
- **Palette:** pick a REAL historical palette and commit. Game Boy: `#0F380F` `#306230` `#8BAC0F` `#9BBC0F`. NES: `#000` `#FCFCFC` `#F83800` `#0058F8` `#00A800` `#FCE0A8`.
- **Type:** Press Start 2P, Silkscreen, Pixelify Sans, VT323, Departure Mono. **Body text should NOT be pixel** — pair with clean sans.
- **Motion:** stepped not smooth (`steps(4)`); blinking cursors; screen-shake; chiptune SFX.
- **Fits:** indie games, gaming brands, dev tools with humor, degen culture. **Clashes:** perceived professionalism, long reading.
- **Failures:** *"Pixel art is a full design system, or it's nothing"* — half-pixel looks like a mistake; non-integer scaling = blurry sprites; nowhere to hide.

---

## FAMILY 4 — LIGHT & ATMOSPHERE

### 4.1 Aurora / Mesh Gradient
- **Vibe:** northern lights behind glass — glowing depth on near-black.
- **Moves:** **dark base mandatory** (`#05010f`; aurora fails on light bg); 4 overlapping radial-gradient blooms; blurred conic layer on `::before` with `filter: blur(80px) saturate(1.4)` (blur melts, saturate keeps color from graying); opaque panel `rgba(10,8,20,.55)` behind ALL text; **3–4 hues max** (more = brown mud); one aurora moment per viewport.
- **Palette:** base `#05010f`; indigo `#6366f1`, teal `#2dd4bf`, pink `#ec4899`, violet `#8b5cf6`.
- **Type:** heavy clean sans that survives glow: Inter, Geist, Satoshi, General Sans. No thin weights/serifs over gradient.
- **Motion:** slow — 8–15s breathing loops (*under 6s feels anxious*); static CSS unless it must move.
- **Fits:** AI products, SaaS heroes, fintech, music. **Clashes:** content surfaces — never behind tables/forms/long reading.
- **Failures:** text on raw gradient (contrast drifts <4.5:1); >4 hues; no reduced-motion; **and the big one: this is the #1 visual marker of AI slop** — if used, earn it with an unusual hue pair, real texture, or atypical type.

### 4.2 Dark-Mode Luxury (the Linear marketing look)
- **Vibe:** cinematic, premium, engineered — dark as identity, not theme.
- **Moves:** near-black `#08090A` (never `#000` surfaces); 4–5 elevation steps 2–4% lightness apart; **light-streak beams** sweeping sections; ONE saturated glowing accent; hairline `rgba(255,255,255,.06)` borders; **noise/grain overlay against gradient banding**; tight high-contrast type.
- **Palette:** `#08090A`; elevations `#0F1011` `#18191B` `#232427`; border `#2A2B2F`; text `#F7F8F8`/`#8A8F98`; accent `#5E6AD2` `#7C5CFF` `#00E599`.
- **Type:** Inter with negative tracking (Linear's answer); Geist; Satoshi; mono kickers.
- **Motion:** micro-motion + restraint: scroll-linked gradient sweeps, cursor-reactive glow, 150ms crossfades. **Nothing bounces.**
- **Fits:** dev tools, AI infra, crypto, security, premium B2B. **Clashes:** healthcare, education, e-comm (dark kills product photography), non-technical users.
- **Failures:** **it's the new "safe"** — signals competence, not distinction; pure `#000` OLED smearing/halation; gray-on-gray text (`#666` on `#111`); keyboard-first visuals without keyboard-first behavior.

### 4.3 Terminal / Monospace
- **Vibe:** the command line as a brand.
- **Moves:** mono everywhere including headlines; dark always; **hierarchy from color/brightness, not size**; blinking block cursor `▋` (~530ms); **prompt string before headings (`user@site:~$`) — highest-impact single detail**; ASCII/box-drawing dividers `┌─┐│└┘`; widths in `ch`.
- **Palette:** phosphor green `#00FF41` on `#0A0A0A`; amber `#FFB000` for warm 80s; modern-restrained GitHub-dark: `#0D1117` bg `#C9D1D9` text `#58A6FF` links `#3FB950` ok `#F85149` err.
- **Type:** JetBrains Mono, IBM Plex Mono, Space Mono, Departure Mono, Geist Mono, Fira Code; cult-paid: Berkeley Mono.
- **Motion:** typewriter reveals, boot-sequence loads, glitch on hover — **all motion = output being printed, not UI animating.**
- **Fits:** dev tools, security, CLI products, technical portfolios; spreading into editorial/indie fashion as an analog counter-signal. **Clashes:** consumer, e-comm, long prose (mono body reads slower).
- **Failures:** mono body at 16px over paragraphs; low-opacity green contrast fails; **CRT-scanline overlay = costume**; mono alone no longer differentiates — needs a second, weirder idea.

---

## FAMILY 5 — HUMAN & EDITORIAL

### 5.1 Editorial / Magazine
- **Vibe:** every page is a spread — the web as a well-art-directed publication.
- **Moves:** extreme scale contrast (96–160px display serif vs 16px body); drop caps; pull quotes breaking the column; asymmetric unequal whitespace; full-bleed or precisely-offset images; captions in small-caps/mono; hairline rules; baseline rhythm.
- **Palette:** paper+ink+one accent: `#FDFCF8` paper, `#1A1A18` ink, `#8A8578` muted + `#C1272D` editorial red or `#1B3A6B` ink blue.
- **Type:** **the 2026 story is loud display serifs.** Free: Instrument Serif, Fraunces (WONK axis), Playfair, DM Serif Display, Newsreader, Bodoni Moda, Zodiak; body: Source Serif 4, Spectral, Literata, or quiet sans. Paid: Tiempos, Canela, Reckless, PP Editorial New.
- **Motion:** almost none, slow when present (400–600ms fades, mask-wipe reveals). *Turning a page, not operating an app.*
- **Fits:** publishing, journalism, culture, fashion, luxury, long-form marketing, personal essays. **Clashes:** dashboards, transactional flows.
- **Failures:** line length >75ch (the most common sin); display serif at body size; 160px headline that doesn't reflow at 768px; **thin copy — editorial exposes weak content mercilessly.**

### 5.2 Warm Minimalism / Quiet Luxury
- **Vibe:** expensive restraint — nothing shouts, everything considered.
- **Moves:** low-contrast tonal harmony (whole page in a narrow value range); 2–3× normal negative space; **no pure white or black**; subtle paper/linen grain; hairline rules; wide-tracked small labels; ONE restrained accent used once per screen; headlines set LIGHT and large.
- **Palette:** beige `#E8E2D9`, greige `#D6D0C7`, sand `#DCCFBB`, mocha `#B8A48E`, taupe `#A69889`, ivory `#F7F3EC`; ink `#2E2A26`; accent brass `#B08D57` or olive `#5A5D45`.
- **Type:** free: Inter Tight, Manrope, Jost, Cormorant Garamond, EB Garamond, Tenor Sans, Switzer. Paid: Suisse Int'l, GT America, Canela.
- **Motion:** extremely slow, extremely subtle — 600–800ms fades, 2% image pans. Nothing pops.
- **Fits:** luxury, fashion, hospitality, architecture, wellness, premium AI-calm (the Claude warm-parchment register is a cousin). **Clashes:** gaming, dev tools, urgency, discount.
- **Failures:** beige-on-beige body text fails WCAG AA (the aesthetic IS the landmine); restraint without craft = unfinished Squarespace; easiest to do adequately, hardest to do memorably.

### 5.3 Risograph / Print Texture
- **Vibe:** analog imperfection as proof of human authorship — explicitly an anti-AI signal.
- **Moves:** **deliberate misregistration** — color layers offset 2–3px (THE signature); halftone grain (`feTurbulence` or noise PNG at 8–15%); 2–4 spot inks that **multiply-blend** into a third color at overlaps; roller streaks; crop marks/registration targets as decoration.
- **Palette:** real Riso inks: Fluor Pink `#FF48B0`, Blue `#0078BF`, Yellow `#FFE800`, Green `#00A95C`, Orange `#FF6C2F` on Newsprint `#F2EDE4`.
- **Type:** Archivo, Anton, Bebas Neue, Space Grotesk, Instrument Serif, Redaction (built-in degradation variants — perfect fit). Ink-spread: `text-shadow: 0 0 .5px currentColor`.
- **Motion:** layers snap into registration on load; hover shifts one channel 2px. *A press running, not a UI easing.*
- **Fits:** zines, events, music, indie food & drink, craft brands, non-profits. **Clashes:** enterprise, fintech, precision.
- **Failures:** **grain over body text kills legibility — exempt body copy**; full-page noise hurts scroll perf (fixed overlay or bake into images); perfectly-even "imperfection" reads as a filter; fluor pink can't carry body text.

### 5.4 Collage / Scrapbook
- **Vibe:** handmade paste-up — torn paper, tape, photos pinned to a board.
- **Moves:** cut-out photos with visibly rough edges; tape strips/staples; torn-paper edges; ±3° rotations; real stacking shadows; handwritten annotations; sticker badges.
- **Palette:** photo-driven on warm paper `#F4EFE6`; tape `#E3D8B8`; ink `#1F1D1B`; loud stickers `#FF3D2E` `#2D6BFF`.
- **Type:** deliberately mismatched: serif headline + handwritten annotation (Caveat, Shantell Sans, Gaegu) + mono caption.
- **Motion:** elements drop in with slight rotation and settle; tape peels on hover; drag-to-rearrange.
- **Fits:** fashion, music, culture, creator portfolios, campaigns. **Clashes:** precision-signalling anything.
- **Failures:** rotated absolute elements = responsive nightmare; **clean AI-masked cutout edges destroy the premise**; layers occluding interactive elements; screen-reader order chaos.

### 5.5 Organic / Hand-Drawn
- **Vibe:** a person made this with a pen — warm, imperfect, unintimidating.
- **Moves:** wobbly SVG strokes (rough.js look — every line drawn twice with jitter); scribbled circles/underlines around key words; arrow annotations; imperfect containers; graph-paper bg; genuinely irregular blobs.
- **Palette:** `#FFFDF7` paper, `#2B2B2B` graphite, `#F0EDE4` graph lines + highlighter `#FFE066` `#A8E6CF` `#FF9AA2`.
- **Type:** Shantell Sans (variable informality axis — the best modern hand font), Caveat, Patrick Hand + clean body sans.
- **Motion:** **SVG `stroke-dashoffset` draw-on as you scroll — the signature interaction, genuinely delightful.**
- **Fits:** EdTech, whiteboarding tools (Excalidraw/Tldraw = the definitive implementations), onboarding, non-profits, coaching. **Clashes:** enterprise, luxury, security.
- **Failures:** hand-drawn assets on a geometric UI = clip-art (**the wobble must reach the buttons and borders**); hand fonts at body size unreadable; caps perceived seriousness.

### 5.6 Lo-Fi / Indie Web
- **Vibe:** the web before it was optimized — small, weird, hand-coded, non-commercial.
- **Moves:** fixed-width centered column; webrings, 88×31 buttons, guestbooks; tiled backgrounds; visited-link purple; sincere `<marquee>`; **the absence of growth machinery IS the aesthetic.**
- **Type:** Verdana, Georgia, Comic Sans (sincere), Silkscreen, VT323.
- **Fits:** personal sites, digital gardens, artist pages, small communities. **Clashes:** ANY business — **a brand adopting it reads as appropriation and gets mocked.** It's a values position, not a style to borrow.

### 5.7 Annotated Developer Editorial / Warm Dev Notebook
- **Vibe:** a careful engineer explaining the product directly in a well-made notebook — technical but not cold, human but not childish, minimal but not empty.
- **One big idea:** **the product's native artifact is the hero.** Use a real Markdown spec, diff, terminal result, schema, or repository state as the main visual; a sparse handwritten layer points out why it matters.
- **Chassis:** warm near-white paper; charcoal text; generous editorial whitespace; mono structure; 1px rules; real content kept flat; artifact windows get 8–10px radii and the only meaningful elevation. Page max `1180px`, prose max `65ch`, spacing on a 4px base.
- **Evidence:** show truthful file names, commands, states, and semantic tokens. Prefer one large inspectable artifact over a grid of benefit cards. Use browser-window dots only when the object is genuinely a file/terminal window.
- **Accent:** 1–3 handwritten annotations per viewport; Shantell Sans at 13–16px; 1.5px curved arrows; translucent marker bands; rotations between `-4deg` and `2deg`. Annotations explain a stable ID, state, relationship, or important phrase — never sprinkle them as confetti.
- **Palette:** paper `oklch(.977 .001 30)`, paper-alt `oklch(.992 .001 30)`, panel `oklch(.953 .002 30)`, ink `oklch(.285 .007 30)`, muted `oklch(.62 .005 30)`, line `oklch(.915 .003 30)`; semantic sync `#2F8F5B`, drift `#C2701C`; optional annotation blue `#3B72C4`, red `#C45A38`, purple `#8657C8`. These saturated hues may color strokes/marks; use the darker `*-ink` tokens for small text. Saturated color stays below 10% of the viewport.
- **Type:** system sans for prose/UI; Geist Mono for wordmark, headings, filenames, commands, IDs, and tabular data; Shantell Sans **only** for marginalia. This is a three-role system but only two downloaded families; never set paragraphs in mono or hand type.
- **Depth:** flat reading surface + one elevated artifact. Use a 1px low-alpha ring and stacked ambient shadow (`0 1px 2px`, `0 2px 4px`, then optional larger falloff); no glass, gradient glow, or wall-to-wall cards.
- **Motion:** artifact controls `100–150ms`; annotation highlight/arrow/label may draw once in `1.2–1.6s`; caret blink `1.1s steps(1)` only when it represents active text. No bounce or fake typing. Under `prefers-reduced-motion`, show the complete static state immediately.
- **Fits:** OSS and CLI launches, technical docs, spec/dev tools, agent platforms, developer portfolios, text-native indie SaaS, changelogs, and onboarding that teaches syntax. On daily-use product surfaces, keep the chassis and evidence but reserve annotations for first-use guidance, empty states, or rare explanations.
- **Nearby-style split:** choose Blueprint when system precision and visible infrastructure are the message; Terminal when command execution is the whole identity; Organic/Hand-Drawn when friendliness should reach every control and border; Warm Minimal when aspiration and calm matter more than technical proof. Choose this style when **a real developer artifact plus a human explanation** is the message.
- **Clashes:** lifestyle/e-commerce imagery, luxury aspiration, dense real-time dashboards, conservative enterprise procurement, or any product without a meaningful text/code/document artifact.
- **Ready tokens:** `style-tokens/annotated-developer-editorial/tokens.css`.
- **Fast implementation:** load upstream `neat-annotations.css`, then `style-tokens/annotated-developer-editorial/neat-annotations-adapter.css`. Use the component directly for prototypes; pin an exact commit or vendor the MIT stylesheet before production. Rebuild only when semantic DOM, collision handling, responsive auto-placement, or custom motion exceeds the component API. See `component-adoption.md`.
- **Exemplars:** [mdtask](https://mdtask.dev/) for the complete product language; [neat-annotations](https://neat-annotations.syabro.com/) for the marginalia layer.
- **Failures:** generic SaaS copy pasted into a terminal costume; annotations carrying essential instructions; hand font used for body text; every section becoming a code window; beige-on-beige contrast; semantic green/amber used decoratively; too many rotations; copying an exemplar's wording instead of using the target product's real objects.

---

## FAMILY 6 — MOTION & DIMENSION

### 6.1 3D / WebGL Hero
- **Vibe:** a real object in real space — highest cost, highest ceiling.
- **Moves:** hero object responding to cursor (damped `lerp` ~0.08 — NEVER 1:1) and scroll (rotate/explode/assemble); HDRI environment; **PBR materials (roughness/metalness) — material realism separates good from Dribbble**; contact shadows; scroll-scrubbed camera.
- **Palette:** the scene's lighting IS the palette: warm key + cool rim; bg `#0A0A0C` or studio white `#F5F5F7`.
- **Type:** quiet so the object wins: Inter/Geist/Söhne, heavy weight + scrim when over 3D.
- **Fits:** hardware launches, automotive, gaming, agency, campaign microsites. **Clashes:** content-heavy, mobile-first markets, low bandwidth.
- **Tooling:** Three.js / React Three Fiber; Spline for no-code (typical hero $3–8k, 2–4 weeks).
- **Failures:** 15MB `.glb` blocking LCP (draco-compress, lazy-init, static poster fallback); looks incredible on the designer's M3 and terrible on mid-range Android; meaningless floating blob = cost with zero communication; no reduced-motion path. WebGPU is coming — track, don't build on it yet.

### 6.2 Scrollytelling
- **Vibe:** the scrollbar as narrative timeline — the page is a film you scrub.
- **Moves:** pinned/sticky stage with text panels advancing through it; **scroll-LINKED (not just triggered)** — position maps continuously to progress; chapter markers; step-based data-viz reveals; use native CSS `animation-timeline: view()` where possible, NEVER scroll-hijack.
- **Type:** one idea per scroll step; large sparse panels, 24–40px.
- **Fits:** data journalism, annual reports, product explainers, brand manifestos, onboarding. **Clashes:** reference content (skimming), fast conversion goals.
- **Exemplars:** NYT Snow Fall lineage, The Pudding, Bloomberg Graphics, Apple product pages.
- **Failures:** *often a performance disaster on mobile*; **scroll-jacking is the most-hated pattern in the corpus**; no static fallback = invisible to screen readers and Google; budget 3–5× a normal page.

### 6.3 Kinetic Typography
- **Vibe:** text that behaves — words as the moving image.
- **Moves:** **variable-font axis animation** (weight/width/optical on scroll or hover — the performant modern version); text stretched to container; marquee strips; per-character stagger reveals; masked text revealing video/gradient.
- **Type:** must be variable. Free: Roboto Flex (most axes), Fraunces (SOFT/WONK), Recursive (5 axes), Bricolage Grotesque, Anybody (width), Inter.
- **Motion:** **2026 shift is restraint — animate ONE axis, not five**; tie to scroll/hover, not timers.
- **Fits:** agencies, fashion, music, campaign heroes, conferences. **Clashes:** anything the user needs to read while it moves.
- **Failures:** animating text being read = real a11y harm (vestibular; WCAG pause/stop/hide); layout thrash without `font-variation-settings` + `will-change`; a hero that takes 3s to become legible is a bounce machine.

---

## FAMILY 7 — REGIONAL

### 7.1 Guochao / Neo-Chinese (国潮/新中式, now "3.0")
- **Vibe:** cultural confidence — heritage rendered with contemporary craft, not nostalgia.
- **Moves:** bright traditional pairings (**red × turquoise** specifically); ink-wash (水墨) gradients/brush textures; cloud/wave/lattice motif borders as framing; vertical type; **seal/chop-mark red stamps**; gold-foil details; Peking-opera color language.
- **Palette:** Chinese red `#C8102E` / vermillion `#E4392B`, turquoise `#00A6A6`, imperial gold `#C9A227`, ink `#1C1C1C`, rice-paper `#F5F0E6`, jade `#3E7C6A`.
- **Type:** Source Han Serif / Noto Serif SC (heritage) vs Source Han Sans (modern); Latin pairing: Playfair/Cormorant or clean grotesk.
- **Motion:** ink-diffusion reveals, scroll-unrolled 卷轴 (scroll paintings), gold shimmer sweeps.
- **Fits:** Chinese consumer brands, tea/beverage, beauty, cultural tourism, gaming (Genshin Liyue). Exemplars: CHAGEE 霸王茶姬, Li-Ning, Florasis.
- **Failures:** motif-collage without cultural literacy (= tourist shop); foreign-brand surface appropriation is punished; calligraphic faces illegible at UI sizes.

### 7.2 CJK Information-Density
- **Vibe:** a different UX value system, not a style — density = perceived value in CN mobile.
- **Moves:** far more above the fold; **color/contrast/boxed cards carry hierarchy instead of typography/whitespace** (CJK has no lowercase — weight+size only, so color does more work); superscript badges; multifunctional home; heavy skeleton loading.
- **Palette:** high-saturation accents on white: Xiaohongshu red `#FF2442`, Douyin `#FE2C55`/`#25F4EE`, WeChat green `#07C160`.
- **Type:** PingFang SC / Source Han Sans / HarmonyOS Sans.
- **Fits:** super-apps, marketplaces, CN/SEA content platforms. **Failures both ways:** Western teams "cleaning up" a CJK product destroy its perceived value; exporting CJK density to Western users reads spammy.

---

## 2026 EMERGING (place bets)

- **Anti-Liquid-Glass** — pro-function counter-movement to Apple's material.
- **Raw aesthetics** — wireframe logic in shipped UI; the language of thinking, not polish.
- **Crafted authenticity** — visibly-authored work as credibility (riso, hand-drawn, pixel, expressive serifs all appreciate).
- **Display-serif explosion** + "bouba grotesks" (soft rounded friendly neo-grotesques).
- **Dark-first workflows** — design dark, derive light (~80% of mobile users run dark).
- **Purposeful visible latency** — showing "Processing…" honestly; perceived reliability now beats perceived speed in AI products.
- **Fluid type via `clamp()`** replacing breakpoint scales; `text-wrap: balance/pretty`.
- **AI in the margins** — assistants as sidebars/overlays, not takeovers.
- **Low-carbon web as aesthetic value** — headwind for WebGL/heavy glass.
- **Nature-distilled palettes** (skin/wood/soil) running SIMULTANEOUSLY with dopamine neon — 2026 is bipolar on color; pick by audience.
- **Micro-sound UX**; **experimental navigation**; **gamification as visual system**.

## DYING / DATED (do not ship in 2026)

- Carousels/sliders ("not coming back"); heavy parallax; autoplay video; generic stock photos.
- Over-minimalism ("beige box" flat pages — now framed as the problem).
- Pure neumorphism as a product system (a11y-killed).
- **The AI-slop stack: Inter + purple→blue gradient + 16px-radius cards + "Build the future" hero — actively negative signal. The #1 avoidance rule.**
- Overloaded heroes (multi-CTA + bg video + animated text + chat popup).
- Saturation warnings (still work, no longer surprise): bento, Linear-dark-SaaS, Vercel blueprint+mono, basic glass, aurora mesh.

## UNIVERSAL RULES (priority order)

1. **Never place text on a translucent/gradient surface without an opaque scrim.** Every depth style fails here first.
2. `prefers-reduced-motion` / `prefers-reduced-transparency` / `prefers-contrast` are part of the style's definition, not optional.
3. Bold palettes: 2–3 colors. Gradient meshes: 3–4 hues.
4. One "wow" moment per viewport.
5. Typography is the fastest exit from generic.
6. **Lock tokens (palette, fonts, radius, texture, motion) in one source of truth BEFORE generating screens** — otherwise output drifts to the statistical average, which is slop.
