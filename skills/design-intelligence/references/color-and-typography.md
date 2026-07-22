# Color & Typography — Formulas and Curated Combos

Deep theory lives in `fundamentals/color-and-contrast.md` and `fundamentals/typography.md`. This file is the practical layer: construction formulas and combinations that are known to work.

## COLOR

### Palette construction formula

1. **Start in OKLCH** (perceptually uniform; equal lightness steps LOOK equal). `oklch(L C H)` — build ramps by stepping L while holding C/H; adjust C down at extremes to stay in gamut.
2. **Pick ONE brand hue** (H). Derive:
   - Neutral ramp: same H, C ≈ 0.005–0.02 (tinted grays feel intentional; pure gray feels default).
   - Accent: brand H at high C, mid L.
   - Semantic: green ~145, amber ~85, red ~25 (hue), tuned to match brand L/C so they feel like one family.
3. **60-30-10** — 60% neutral surface, 30% secondary/structure, 10% accent. The accent appears ONCE per viewport as the primary action.
4. **Dark mode is derived, not inverted:** surfaces `L 0.13–0.22` (never pure black — OLED smear/halation), 4–5 elevation steps 2–4% L apart; DESATURATE accents slightly (high-C colors vibrate on dark); text `L ≈ 0.93` not pure white; borders = white at 6–10% alpha.
5. **Contrast floor:** body 4.5:1 (AA), large text 3:1, aim 7:1 over glass/gradient. Check the WORST point of a gradient, not the average.

### Known-good palette recipes (by register)

| Register | Recipe |
|---|---|
| Dark tech/luxury | `#08090A` base · elevations `#0F1011→#232427` · text `#F7F8F8`/`#8A8F98` · one accent `#5E6AD2` or `#00E599` + grain |
| Light engineered | `#FFF` canvas · `#F7F7F8` wells · ink `#111` · muted `#666` · grid `#E5E7EB` · one accent |
| Warm paper/editorial | `#FDFCF8` paper · `#1A1A18` ink · `#8A8578` muted · accent `#C1272D` or `#1B3A6B` |
| Annotated developer editorial | `oklch(.977 .001 30)` paper · `oklch(.285 .007 30)` ink · `oklch(.62 .005 30)` muted · sync `#2F8F5B`/text `#085041` · drift `#C2701C`/text `#633806`; other annotation colors are optional and sparse |
| Quiet luxury | `#F7F3EC` ivory · `#E8E2D9` beige · `#A69889` taupe · ink `#2E2A26` · brass `#B08D57` (watch AA!) |
| Playful bold | white/black + 2 of: `#FFDE00` `#FF4911` `#00E599` `#FF90E8` `#7B61FF` |
| Aurora (earned) | base `#05010f` + 3 of: `#6366f1` `#2dd4bf` `#ec4899` `#8b5cf6` — swap hues away from purple/blue to dodge slop |
| Guochao | `#C8102E` red × `#00A6A6` turquoise · `#C9A227` gold · `#F5F0E6` rice paper · `#1C1C1C` ink |
| Terminal | `#0A0A0A` + `#00FF41` phosphor (or `#FFB000` amber); restrained: `#0D1117`/`#C9D1D9`/`#58A6FF` |

### Color anti-rules

- Alpha for TEXT colors is a design smell (blend real colors; alpha text breaks over images).
- Never encode meaning in color alone (a11y).
- Saturated large fills fatigue; saturate small areas, desaturate large ones.
- More than one accent = no accent.

## TYPOGRAPHY

### Pairing formulas (pick one)

1. **Display serif + quiet grotesk** — the 2026 editorial default. Headline: Instrument Serif / Fraunces / Playfair / DM Serif Display. Body: Inter / Work Sans / Source Sans.
2. **Grotesk + mono** — the engineered default. UI: Geist / Inter (tracking `-0.01em`) / Satoshi. Structure/kickers/data: Geist Mono / JetBrains Mono / IBM Plex Mono.
3. **One variable superfamily** — Recursive (casual↔linear + mono axes), Fraunces (SOFT/WONK), Roboto Flex. One file, huge range, kinetic-ready.
4. **Rounded friendly + clean body** — clay/consumer: Nunito / Baloo 2 / Quicksand headlines + Inter/Nunito Sans body.
5. **Statement mono only** — terminal register: ONE mono family everywhere, hierarchy via color/brightness/weight, widths in `ch`.
6. **CJK pairing** — 思源黑体 Source Han Sans / PingFang SC (UI); 思源宋体 Source Han Serif (heritage/editorial). Latin pair: match skeleton weight — Inter with Han Sans, serif with Han Serif. CJK has no case/italics: hierarchy = size + weight + color only; body 15–16px min, `line-height 1.7+`, never `letter-spacing` on CJK body.
7. **System sans + mono + marginalia hand** — annotated developer editorial: system sans for prose/UI, Geist Mono for product identity and native artifacts, Shantell Sans only for annotations. Keep hand type under 16px and out of paragraphs; this gives three roles with only two downloaded families.

### Scale & craft rules

- Modular scale: pick a ratio (1.2 compact UI / 1.25 default / 1.333+ editorial) and stick to 5–7 steps. Fluid: `clamp(2rem, 1.2rem + 2.5vw, 3.5rem)` replaces breakpoint jumps.
- Hierarchy = weight + color + spacing BEFORE size. Two weights minimum apart (400→600, not 400→500).
- Body: 15–16px UI, 17–19px long-form; line-height 1.5 UI / 1.6–1.7 prose; measure 45–75ch (the #1 editorial sin is exceeding it).
- Display type: tighten tracking as size grows (`-0.02em` at 48px+); optical sizing on (Inter v4, Fraunces).
- Labels/kickers: caps + `letter-spacing .08–.18em` + smaller size + muted color.
- Load ≤2 webfont families, subset, `font-display: swap`, preload the display face — FOUT on the hero is a first-impression bug. A native system stack may serve a third prose role without another download.
- **Banned-by-default:** Inter-everywhere-with-nothing-else (slop marker), thin weights over glass/gradient, display serif at body size, pixel/hand fonts for body text.

### Free font shortlist (verified good, by role)

- **UI sans:** Inter (v4), Geist, Satoshi (Fontshare), Manrope, Plus Jakarta Sans, Instrument Sans, Public Sans
- **Display serif:** Instrument Serif, Fraunces, Playfair Display, DM Serif Display, Newsreader, Bodoni Moda, Zodiak (Fontshare)
- **Body serif:** Source Serif 4, Spectral, Literata, Lora, Crimson Pro
- **Mono:** Geist Mono, JetBrains Mono, IBM Plex Mono, Space Mono, DM Mono, Fira Code, Departure Mono (pixel-flavored)
- **Grotesk with character:** Space Grotesk, Archivo (+Black), Bricolage Grotesque, Syne, Familjen Grotesk, Host Grotesk, Work Sans
- **Loud display:** Anton, Bebas Neue, Unbounded, Rubik Mono One, Big Shoulders
- **Rounded/friendly:** Nunito, Baloo 2, Quicksand, Outfit
- **Hand/organic:** Shantell Sans (variable informality axis), Caveat, Patrick Hand, Gaegu
- **Techno/retro:** Orbitron, Michroma, Chakra Petch, VT323, Press Start 2P, Silkscreen, Monoton, Nabla
- **Variable powerhouses:** Roboto Flex (most axes), Recursive (5 axes), Fraunces, Anybody (width)
- **CJK:** Source Han Sans/Serif (思源黑体/宋体), Noto Sans/Serif SC, LXGW WenKai 霞鹜文楷 (warm hand-leaning CJK — rare and distinctive)
