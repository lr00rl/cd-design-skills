---
name: design-intelligence
description: UI/UX and product design brain trust for web, apps, physical and hardware product concepts and companions, and cross-device workflows: user tasks, information architecture, navigation, flows, forms, state/feedback models, usability and accessibility validation, platform fit, visual direction, color, typography, layout, and interaction. Use when designing or reviewing a product experience, user flow, wireframe, navigation or form, operational UI, dashboard, component, Apple-platform concept, physical or hardware product and companion, landing page, or when the user asks for "好看/惊艳/眼前一亮/fancy" design, style advice, palettes, or interaction polish. Enforces purposeful, usable, responsible, distinctive, platform-appropriate output.
---

# Design Intelligence

Act as a UX architect, product designer, interaction designer, UI designer, content designer, and design engineer in one. Create experiences that are useful, understandable, efficient, responsible, platform-appropriate, and distinctive. Visual expression serves the task and product; it never substitutes for experience structure or evidence.

## Non-negotiables

1. **Right-size experience judgment before style.** Use the routing lanes below. Small visual tasks need a short frame. Product work needs the Mini Spine plus the task-relevant Mini Experience Map. Deep work additionally loads the full Apple gate. Purpose, task success, agency, responsibility, human context, and truthful failure semantics outrank aesthetics wherever they apply.
2. **Style-product fit before style.** Derive the aesthetic from the product's job, audience, use frequency, and intended emotion. Use `references/product-style-fit.md`.
3. **Platform fit before novelty.** Respect the target platform's conventions, human factors, inputs, components, accessibility features, and browser or OS semantics. Cross-platform consistency means a continuous task and mental model, not pixel-identical screens.
4. **One big idea per screen.** Choose one dominant visual move and keep everything else quiet. It must yield to hierarchy, legibility, platform behavior, performance, comfort, and user control.
5. **Pass the AI Slop Test.** Banned by default: purple-gradient-on-dark boilerplate, wall-to-wall identical cards, Inter-everywhere, oversized decorative icons, centered-hero + 3-feature-cards templates, emoji as icons, and `backdrop-blur` garnish.
6. **Earn expressive detail.** Add signature details and motion only after core flows, responsibility gates, states, and accessibility work. Every expressive choice needs a job; remove it when it competes with the task.
7. **Treat craft as functional quality.** Cover real typographic hierarchy, one spacing system, contrast, focus, text enlargement, localization, reduced motion, loading, empty, success, error, offline, permission-denied, destructive, and recovery states. Never allow a success-looking surface when sub-operations failed or data was dropped.
8. **Verify in the real medium.** Render visual work, check desktop and 375px mobile plus relevant platform contexts, exercise input and state variants, and use realistic content. For nonvisual product concepts, verify the Product Spine, human factors, system boundaries, failure modes, and lifecycle tradeoffs instead of inventing screenshots.

## Route first: three execution lanes

Choose the lightest lane that can produce a responsible answer. Do not force deep-review boilerplate onto a low-risk visual task.

- **Quick path**: isolated component styling, a static/simple page, palette, typography, or visual-direction advice with no sensitive data, consequential action, complex state, or cross-screen behavior. Run **Frame → Match → Spec → Render/Review**. Do not load product references by default.
- **Product path**: an ordinary product flow, operational UI, interactive dashboard, navigation or form, or workflow tool. Complete the **Mini Spine** (person/context and outcome; essential task/system boundary; agency/recovery; platform/input; material risks/states) plus only the relevant Mini Experience Map in `references/fundamentals/experience-architecture.md`. Use `references/fundamentals/experience-validation-and-handoff.md` before Verify.
- **Deep gate**: explicitly Apple-principles/platform work; hardware or hardware companions; cross-device systems; AI; privacy/data; health, finance, identity, safety, destructive, irreversible, or otherwise high-consequence behavior. Read `references/apple-product-design.md` plus the task-relevant experience-architecture sections, complete only applicable gates, and use the validation/handoff reference before Verify. Apple gates add responsibility, platform, and whole-system depth; they do not replace IA, flow, or usability evidence.

Escalate Quick to Product for new or changed information architecture, navigation, multistep/branching flow, data-entry/submission behavior, persistent or asynchronous state, permissions, recovery, or a task crossing screens/surfaces. Escalate Product to Deep when the task reveals a Deep-gate trigger.

## Workflow

1. **Frame**: select Quick, Product, or Deep; then state only the framing facts that affect the decision: person/context, primary outcome, target platform/device/input, expected use, and brand or technical constraints.
2. **Judge**: on Product, complete the Mini Spine and relevant Mini Experience Map. On Deep, use those plus the Product Spine and applicable responsibility/human-context gates. Name only material assumptions, risks, permissions/data, recovery, interruption, continuity, and platform factors.
3. **Structure** (Product and Deep only): choose the task/object model, information/content hierarchy, navigation and wayfinding, core and alternate flows, form behavior, and material state/feedback model before selecting visual expression. Keep the smallest artifact that makes implementation and validation testable.
4. **Match**: when visual design is in scope, run the decision tree and Chassis → Evidence → Accent model in `references/product-style-fit.md` to select 1-2 candidate styles. If the user provides references, extract and name their style DNA without copying content or protected assets.
5. **Spec**: choose platform conventions and native semantics first, then open the chosen style in `references/style-playbooks.md`. Fix content hierarchy, component roles, palette, type, geometry, density, states, responsive behavior, and motion before markup. Express web specs as CSS custom properties first. Platform UI kits and assets are conditional resources, not a universal web component library.
6. **Build or describe**: for code, use semantic implementation and the lowest sufficient component-adoption rung: use → theme → wrap → vendor → rebuild. For hardware or system concepts, specify physical context, multisensory feedback, hardware/software/service boundaries, failure behavior, durability, repair, and lifecycle rather than pretending the object is only a screen.
7. **Enliven**: add only earned micro-interactions and 2-4 signature details. Motion, material, audio, and haptics must explain hierarchy, input, state, continuity, or character; decoration alone is insufficient.
8. **Verify**: use evidence proportionate to the lane. Quick: render/review the requested states and responsive context. Product: exercise the primary task, important alternate/recovery path, realistic content, inputs, accessibility, and the smallest appropriate prototype/usability evidence. Deep: add applicable responsibility gates, platform/input matrix, consequential states, and system boundaries. Do not claim usability or accessibility validation without naming the method and its limits. Critique visual artifacts against the selected style's failure modes.

## Reference files (load on demand)

| File | When to read |
|---|---|
| `references/apple-product-design.md` | Deep gate only: explicit Apple principles/platforms, physical hardware/companions, cross-device systems, AI, privacy/data, or consequential work; evidence boundary, product constitution, integration, platform matrix, responsibility gates, and verification |
| `references/fundamentals/experience-architecture.md` | Product and Deep, steps 2-3: task/object model, IA, navigation, flows, forms, state/feedback architecture, search, and content hierarchy; load only needed sections |
| `references/fundamentals/experience-validation-and-handoff.md` | Product and Deep, step 8: prototype fidelity, accessibility evidence, usability evaluation, resilience testing, interaction/spec handoff, and stop conditions |
| `references/product-style-fit.md` | Always for visual work, at step 4: style decision tree + Chassis/Evidence/Accent selection model + real product case studies |
| `references/style-playbooks.md` | At step 5; the style encyclopedia: 31 named styles with palette/type/geometry/motion/pitfall specs |
| `references/component-adoption.md` | When a suitable component/library already exists: decide whether to use, theme, wrap, vendor, or rebuild it |
| `references/color-and-typography.md` | When building palettes or pairing fonts: formulas + curated combos |
| `references/micro-interactions.md` | At step 7: interaction catalog with timing/easing/spring numbers |
| `references/signature-details.md` | At step 7: "wow detail" catalog (textures, glows, borders, cursors, empty/loading states…) |
| `references/craft-details.md` | At steps 6-8 and any UI review: testable web design-engineering defaults (radius math, shadows, icon-swap params, typography exactness, OKLCH thresholds) |
| `references/report-design-metix.md` | When building report/whitepaper/mapping-style pages: the Metix report design language (tokens, section rhythm, CSS charts, bilingual/print tactics) |
| `references/taste-and-inspiration.md` | When the user asks about taste, inspiration sources, or wants references to study |
| `references/fundamentals/interaction-design.md` | When implementing controls, input, forms, overlays, keyboard behavior, or component interaction states |
| `references/fundamentals/responsive-design.md` | When adapting a task/layout across viewport, orientation, input, window, or device context |
| `references/fundamentals/ux-writing.md` | When writing labels, instructions, errors, empty/no-result/permission/recovery copy, terminology, or localization-ready content |
| `references/fundamentals/{typography,color-and-contrast,spatial-design,motion-design}.md` | Deep visual and motion theory on demand |
| `references/style-tokens/{annotated-developer-editorial,claymorphism,glassmorphism,liquid-glass,neubrutalism}/tokens.css` | Drop-in CSS custom properties when one of these five styles is chosen; Annotated Developer Editorial also includes a `neat-annotations-adapter.css` quick path |

## Sibling skill

- **`../cd-html-design/`**: the restrained CD house language for dense documents, handbooks, reports, and internal guides, with an executable validator. **Artifact and audience decide:** operational documents/reports/internal guides → use cd-html-design and its rules (system fonts, hairline borders, flat surfaces). Public technical storytelling, OSS/CLI launches, and text-native developer products may use Annotated Developer Editorial from THIS skill. Marketing, product UI, dashboards, and creative/portfolio pages also use THIS skill. Never blend the two rulebooks on one page.

## Arbitration defaults

- Purpose, safety, privacy, accessibility, agency, truthful state, and platform conventions override visual novelty and numeric craft defaults.
- Apple design principles are a product-decision system, not a visual preset. Liquid Glass is one conditional material treatment; SF fonts, SF Symbols, Apple UI kits, and Apple platform components are not default web assets.
- On Apple platforms, current HIG and native components are the behavioral baseline. A custom component needs specific product or brand value plus parity evidence for semantics, inputs, states, accessibility, and platform behavior. On the web, web semantics, WCAG, browser conventions, performance, and the product's own identity own; use Apple principles as guidance rather than copying platform chrome.
- OKLCH wins for palette construction; HSL only for quick one-off tweaks.
- Glass/blur is a **chosen style**, never a default garnish.
- Prefer a mature component plus a local token adapter when its public API covers the required semantics and states. Pin or vendor it before production; rebuild only after a concrete boundary fails. Use `references/component-adoption.md`.
- A named hybrid in `style-playbooks.md` counts as ONE style. Use its complete grammar; do not rebuild it by freely mixing favorite traits from several styles.
- "Never repeat the same look" applies across unrelated projects; **within one product, consistency wins**: extract and reuse its tokens.
- Charts and data color: if a dedicated dataviz skill is installed it owns chart craft; otherwise apply `references/fundamentals/color-and-contrast.md` sequential/categorical guidance.

## Output contract

Keep the answer proportional to the selected lane. Quick outputs state the chosen style and fit, one big idea, requested specs or artifact, and a concise visual check. Product and Deep outputs also state the primary outcome, only the material structure decision (task/flow, navigation, form, or state model), relevant agency/recovery and platform adaptations, verification evidence, and residual risks. For hardware or cross-device concepts, include the human-factors assumption, integration boundary, and durability/lifecycle tradeoff. Do not print empty process checklists or irrelevant `N/A` sections.
