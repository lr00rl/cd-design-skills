# Case study: Metix report design language (document-shaped data products)

The design system behind the mapping reports Metix publishes at reports.metix.ai: a complete, token-driven, **framework-free** design language for bilingual, data-heavy report pages. Use this when building report/whitepaper/mapping-style deliverables. It is the reference case for that artifact type (and a strong general template for "document-shaped products", complementing cd-html-design's two modes).

Stack: single self-contained HTML file (~300KB), inline `<style>` (~17KB), zero frameworks, zero chart libraries, zero web fonts → instant paint, prints correctly, emailable as an artifact.

## Tokens (verbatim)

```css
:root{
  --violet:#6F4AF2; --violet-600:#5E3ED8;
  --teal:#17B894; --teal-700:#008E70; --teal-800:#075F4A;
  --ink:#211E32; --ink-60:rgba(33,30,50,.62); --ink-40:rgba(33,30,50,.42);
  --lilac:#F7F3FF; --mint:#E7F7F3; --line:#E9E4F6; --card:#FFFFFF; --bg:#FAF9FE;
  --grad:linear-gradient(120deg,#6F4AF2,#17B894);
  --grad-text:linear-gradient(120deg,#6F4AF2,#008E70);
  --dark:radial-gradient(420px 240px at 10% 120%, rgba(23,184,148,.18), transparent 60%),
         linear-gradient(120deg,#242039 0%,#2D2856 58%,#1E514A 132%);
}
```

**Palette logic:** violet→teal duotone. Violet = brand/structure; teal = positive/secondary data series; amber (`#F59E0B`/`#B45309`/`#FFF7ED`) = warning-ONLY third channel; slate = neutral chips. Ink is warm-purple near-black `#211E32`, never pure black; **text opacities are baked into tokens** (`--ink-60`, `--ink-40`), not applied as opacity utilities.

**Signature move:** `--grad-text` clipped to text (`background-clip:text; color:transparent`) on the nav brand, every KPI number, company-card highlight metrics, modal kicker. One gradient reused as the single "this number matters" signal: the eye learns it in one section, then scans the rest for free.

**`--dark`** (radial teal glow under violet→dark-teal linear) appears on exactly THREE surfaces: hero, CTA block, floating badge. Dark bookends an otherwise light document.

## Typography

```css
body{ font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB",
      "Microsoft YaHei","Noto Sans SC",sans-serif;
      font-size:15px; line-height:1.75; }
```
Zero web fonts: system stack with CJK chain → no FOUT, correct Chinese rendering. 15px/1.75 body tuned for long CJK reading. Scale: h1 40/800 · h2 27/800 · h3 18/700 · KPI 30/800 · chip 11.5. **Hierarchy carried by weight (heavy 800 on numerals/headings), not size.** Uppercase kickers tracked .12-.14em.

## Section rhythm (what makes 8 sections read as one document)

Every section: **English kicker (12px/700 uppercase teal) → violet section number + Chinese h2 → lead paragraph (`--ink-60`, max-width 880px) → evidence (chart/table/cards) → optional callout → 1px divider.**

Page skeleton: sticky nav (blur 10px, 52px) → dark hero (tag pill / gradient-em h1 / meta row) → KPI card grid (`auto-fit minmax(160px,1fr)`; gradient value / label / sublabel) → numbered sections 01-08 → dark CTA → appendix in fineprint → footer. Fixed "made by" badge bottom-right with a glowing dot (`box-shadow:0 0 12px rgba(23,184,148,.85)`); full-bleed SVG watermark tile at `opacity:.025`.

## Component vocabulary

- Cards: 16px radius, 1px `--line`, `box-shadow:0 1px 2px rgba(33,30,50,.04)`.
- Callouts ×3: lilac+violet (note) / mint+teal (positive) / amber (warn).
- **CSS bar chart** (the 80% case, no library): `grid-template-columns:190px 1fr 86px` → right-aligned ellipsized label / track `#F1EDFB` 22px r7 / fill `--grad` (or teal/soft variants) / value 700 with `<small>` in ink-40. Stacked bars = flex divs in a 26px rounded strip + swatch legend.
- Company card: name 16.5/800 + baseline-aligned meta; number row (19/800, highlight gets gradient text); dashed `border-top` before description.
- Candidate row: `border-left:3px solid var(--violet); border-radius:0 14px 14px 0`: accent bar as left rail.
- Chips: 999px pills in violet/green/orange/slate.
- Tables: th on `--lilac` with `border-bottom:2px solid #E3D8FF`; row hover `#FBFAFF`; numeric cells right-aligned `tabular-nums`.
- **SVG only for complex figures** (flow/scatter/matrix): hand-written inline `<svg role="img">`, negative x-origin viewBox (e.g. `-190 0 1250 388`) to hang long CJK axis labels outside the plot; explicit font-family + 10.5-12.5px sizes on every `<text>`.

## Responsive & print tactics

1. Bar-chart reflow ≤640px: label spans its own full-width row (`grid-column:1/-1`), track+value below.
2. Wide SVG → `overflow-x:auto` box with `min-width:600px` + a literal "← swipe to see the full chart →" affordance (in the page language) printed above on small screens.
3. Tables → GitHub mode: `display:block; width:max-content; overflow-x:auto; white-space:nowrap`.
4. Real `@media print`: hide nav/CTA/badge/modal, **unblur gated names**, `break-inside:avoid-page`, drop shadows, 12px body.

## Product mechanics in the design

- **Bilingual dual-DOM:** every string twice as `<span class="zh">/<span class="en">`; toggled purely in CSS via `[data-lang]`; inline head script resolves `?lang` → localStorage → navigator.language BEFORE paint (no flash); nav pill switch.
- **Blur-gate lead capture:** candidate names `filter:blur(5px)` + dashed underline (signals clickability); hover eases to blur(3.5px), **a tease, not a reveal**; click opens modal with `ojpop .26s cubic-bezier(.2,.9,.3,1.15)`, **the only bouncy easing on the page, reserved for the one thing that converts.**

## Transferable lessons

1. One duotone + one neutral + one warning-only channel = chart colors pre-decided forever.
2. One gradient-text primitive as the universal "hero number" marker.
3. Rigid section rhythm beats per-section creativity in long documents.
4. HTML/CSS bars for the 80% case; SVG only where it earns its keep.
5. Zero web fonts is the right typography decision for CJK document products.
6. Reserve your single playful easing for the conversion moment.
7. Bake text-opacity into ink tokens; keep `align-items:baseline` on mixed-size rows; `tabular-nums` everywhere numbers live.
