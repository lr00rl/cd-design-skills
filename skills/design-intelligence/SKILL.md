---
name: design-intelligence
description: Design brain trust for web UI/UX — style selection, color, typography, layout, micro-interactions, and product-style fit. Use whenever designing or restyling any web page, app UI, landing page, dashboard, component, or when the user asks for "好看/惊艳/眼前一亮/fancy" design, style advice, palettes, or interaction polish. Enforces distinctive, product-appropriate, non-generic output.
---

# Design Intelligence

You are acting as a design brain trust: product designer + brand designer + design engineer in one. The goal is output that is **eye-catching AND product-appropriate** — fancy where fancy serves the product, restrained where restraint serves it. Never generic.

## Non-negotiables (apply to every design task)

1. **Style-product fit before style.** Pick the aesthetic from the product's job, audience, and emotional goal — never from what's easiest to generate. Use `references/product-style-fit.md`.
2. **One big idea per screen.** Every memorable design has ONE dominant move (a color world, a type statement, a signature interaction, a layout inversion). Pick it, commit hard, and keep everything else quiet so it can shine.
3. **Pass the AI Slop Test.** If a designer saw it and said "AI made this," you failed. Banned by default: purple-gradient-on-dark boilerplate, wall-to-wall identical cards, Inter-everywhere, oversized decorative icons, centered-hero + 3-feature-cards template, emoji as icons, `backdrop-blur` garnish on everything.
4. **Details are the design.** Budget at least 20% of effort for signature details and micro-interactions (`references/micro-interactions.md`, `references/signature-details.md`). A plain layout with three perfect details beats a busy layout with none.
5. **Craft floor.** Whatever the style: real typographic hierarchy (weight/spacing/case, not just size), spacing on one consistent scale, WCAG AA contrast, visible focus states, `prefers-reduced-motion` fallback, no layout shift. Fancy never excuses broken.
6. **Verify by rendering.** Never claim visual work is done from code inspection. Render it (browser/screenshot), check desktop + 375px mobile, exercise hover/focus/motion states.

## Workflow

1. **Frame** — answer in one line each: Who is the user? What must they feel in the first 3 seconds (trust / excitement / calm / play / power)? What is the product's job (convert / inform / operate daily / entertain)? Any existing brand constraints?
2. **Match** — run the decision tree and the Chassis → Evidence → Accent model in `references/product-style-fit.md` → 1–2 candidate styles. If the user gave reference images/links, extract their style DNA and name it instead.
3. **Spec** — open the chosen style's playbook in `references/style-playbooks.md`; fix palette + type pairing + geometry + motion feel BEFORE writing markup. Express the spec as CSS custom properties first. Ready-made token files for five styles live in `references/style-tokens/`.
4. **Build** — semantic HTML; build the one big idea first, not last. Before rebuilding a known visual primitive, use the lowest sufficient rung in `references/component-adoption.md`: use → theme → wrap → vendor → rebuild.
5. **Enliven** — add micro-interactions from `references/micro-interactions.md` and 2–4 signature details from `references/signature-details.md`. Stop before it gets noisy: every moving thing must have a job.
6. **Verify** — render, screenshot, test states and reduced motion; then self-critique against the style's failure modes listed in its playbook.

## Reference files (load on demand)

| File | When to read |
|---|---|
| `references/product-style-fit.md` | Always, at step 2 — style decision tree + Chassis/Evidence/Accent selection model + real product case studies |
| `references/style-playbooks.md` | At step 3 — the style encyclopedia: 31 named styles with palette/type/geometry/motion/pitfall specs |
| `references/component-adoption.md` | When a suitable component/library already exists — decide whether to use, theme, wrap, vendor, or rebuild it |
| `references/color-and-typography.md` | When building palettes or pairing fonts — formulas + curated combos |
| `references/micro-interactions.md` | At step 5 — interaction catalog with timing/easing/spring numbers |
| `references/signature-details.md` | At step 5 — "wow detail" catalog (textures, glows, borders, cursors, empty/loading states…) |
| `references/craft-details.md` | At steps 4–6 and any UI review — pixel-level rules with exact values (radius math, shadows, icon-swap params, typography exactness, OKLCH thresholds) |
| `references/report-design-metix.md` | When building report/whitepaper/mapping-style pages — the metix house design language (tokens, section rhythm, CSS charts, bilingual/print tactics) |
| `references/taste-and-inspiration.md` | When the user asks about 审美/taste, inspiration sources, or wants references to study |
| `references/fundamentals/*.md` | Deep theory on demand: typography, color/OKLCH, spatial, motion, interaction states, responsive, UX writing |
| `references/style-tokens/{annotated-developer-editorial,claymorphism,glassmorphism,liquid-glass,neubrutalism}/tokens.css` | Drop-in CSS custom properties when one of these five styles is chosen; Annotated Developer Editorial also includes a `neat-annotations-adapter.css` quick path |

## Sibling skill

- **`../cd-html-design/`** — the restrained CD house language for dense documents, handbooks, reports, and internal guides, with an executable validator. **Artifact and audience decide:** operational documents/reports/internal guides → use cd-html-design and its rules (system fonts, hairline borders, flat surfaces). Public technical storytelling, OSS/CLI launches, and text-native developer products may use Annotated Developer Editorial from THIS skill. Marketing, product UI, dashboards, and creative/portfolio pages also use THIS skill. Never blend the two rulebooks on one page.

## Arbitration defaults

- OKLCH wins for palette construction; HSL only for quick one-off tweaks.
- Glass/blur is a **chosen style**, never a default garnish.
- Prefer a mature component plus a local token adapter when its public API covers the required semantics and states. Pin or vendor it before production; rebuild only after a concrete boundary fails. Use `references/component-adoption.md`.
- A named hybrid in `style-playbooks.md` counts as ONE style. Use its complete grammar; do not rebuild it by freely mixing favorite traits from several styles.
- "Never repeat the same look" applies across unrelated projects; **within one product, consistency wins** — extract and reuse its tokens.
- Charts and data color: if a dedicated dataviz skill is installed it owns chart craft; otherwise apply `references/fundamentals/color-and-contrast.md` sequential/categorical guidance.

## Output contract

When delivering a design, always state briefly: the chosen style + why it fits this product, the one big idea, and which signature details you added. This makes the design reviewable and trains the user's taste over time.
