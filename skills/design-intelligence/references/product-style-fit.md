# Product-Style Fit: How to Choose the Right Aesthetic

The core question is never "what looks good" but "what does THIS product, for THIS person, need them to feel, and how often will they see it." Style is derived, not picked.

## 1. The selection procedure (run in order)

1. **Name the specific person.** Karri Saarinen (Linear): "You can only create a great product if you design for someone in particular. It's nearly impossible to design a product for everyone."
2. **Rank Don Norman's three levels for that person's actual usage:**
   - **Visceral**: appearance, pre-conscious first impression → wins signups. Dominant for consumer, marketing, portfolios.
   - **Behavioral**: usability, speed, effectiveness in use → dominant for tools used hours per day. Where B2B lives or dies.
   - **Reflective**: meaning, self-image, what using it says about you → dominant for identity products, dev tools with community, luxury.
3. **Pick 1-2 Aaker brand-personality dimensions** as the target: Sincerity / Excitement / Competence / Sophistication / Ruggedness. Then DERIVE type, color, density, motion from it, and justify each element's inclusion ("credible → serif, cool tones").
4. **Apply the frequency law to every delight decision** (Family's Delight-Impact Curve = Emil's animation-frequency law, independently converged): impact budget is INVERSE to feature frequency. Wallet creation (once ever) gets celebration; sending (daily) gets a subtle comma animation.
5. **Check cohesion:** motion personality must match component personality: playful components may bounce; professional dashboards are crisp and fast.
6. **Friction-log weekly** (Stripe's practice): use your own product, write every friction point. "Fight the gravitational pull to mediocrity."

**The master heuristic:** the more hours/day a user spends in the product, the less visceral decoration it should carry and the more behavioral precision it needs. The **aesthetic-usability effect** (NN/g: beauty buys tolerance for minor flaws and masks problems in testing) **decays with usage frequency**: beauty's dividend is spent on first contact and does not renew.

## 2. Composition model: Chassis → Evidence → Accent

Do not choose a style by collecting attractive traits. Build it in three layers, in this order:

1. **Chassis (70-85%): usability under repetition.** Choose the base register from task frequency, density, trust, and content length: Swiss/Editorial for reading, Data-Dense for daily operation, Bento for scan-and-compare, and so on. The chassis owns grid, type scale, spacing, forms, tables, responsiveness, and accessibility.
2. **Evidence (10-25%): the product's native object.** Show what the product actually manipulates: a real Markdown file, diff, terminal result, map, chart, photo, timeline, or document. Use truthful sample content and real states. Evidence is not a decorative mockup; it is the visual proof of the product's job.
3. **Accent (≤10%): one authored brand signal.** Add one differentiator such as handwritten marginalia, a riso texture, a light beam, or one kinetic-type moment. The accent may explain, emphasize, or humanize; it must not carry core meaning or compete with the chassis.

**Composition tests:**

- Remove the accent: the page must remain clear, useful, and recognizable as the product category.
- Replace the evidence with a generic gradient or stock illustration: if the story barely changes, the design is not product-specific enough.
- Count accents per viewport: one system repeated sparingly beats several unrelated flourishes.
- For daily-use surfaces, reduce the accent before reducing information structure. For launch/docs/onboarding surfaces, give the evidence and accent more room.

**Named hybrids are allowed; ad-hoc mixtures are not.** A named hybrid in `style-playbooks.md` has one coherent palette, geometry, type hierarchy, motion model, and failure list. Treat it as one style. Annotated Developer Editorial is the reference example: Editorial/Swiss chassis + real developer artifacts as evidence + handwritten marginalia as the sole accent.

## 3. Decision tree by product category

| Product | Dominant level | Style register (see style-playbooks.md) | Never reach for |
|---|---|---|---|
| Dev tool / infra / AI platform | Behavioral + Reflective | Blueprint Grid, Terminal Mono, Dark-Mode Luxury, Bento; Annotated Developer Editorial for public/docs surfaces; density + keyboard-first; craft IS the reflective signal | Claymorphism, Y2K, Quiet Luxury, decorative fake terminals |
| Technical docs / OSS / CLI / text-native dev tool | Behavioral + Reflective | Annotated Developer Editorial: warm paper + mono structure + real artifacts + sparse marginalia | Hand font for body copy, annotation confetti, code windows with fake content |
| Data-dense B2B / internal tools | Behavioral | Data-Dense (Linear register), Swiss, Blueprint; compact rows, grayscale + semantic color only, near-zero animation, density control | Aurora, Clay, Organic |
| Consumer social / lifestyle | Visceral → Reflective | Bento, Claymorphism, Soft UI 2.0, expressive color; Liquid Glass only as justified functional chrome, never Apple shorthand; delight on rare/first-time moments | Brutalism, Terminal |
| E-commerce | Behavioral w/ visceral gate | Photography carries the visceral load; interface gets out of the way; ONE primary action per screen; friction-logged checkout | Busy decorative styles in the funnel |
| Luxury / fashion / hospitality | Visceral + Reflective | Warm Minimal, Editorial, Broken Grid, 3D hero | Neubrutalism, Dopamine, Pixel |
| Publishing / journalism / docs | Behavioral | Editorial, Swiss, Scrollytelling (features only); Annotated Developer Editorial for technical docs; typographic discipline, near-zero motion | Glass, Clay, Aurora |
| Creator tool / indie SaaS | Visceral + Reflective | Neubrutalism, Dopamine, Bento (anti-corporate) | Neumorphism, Quiet Luxury |
| Finance / consequential actions | Behavioral, delight rationed | Progressive disclosure; motion architectural (A→B legibility) not decorative; celebration only at rare milestones | Y2K, Vaporwave, anything connoting instability |
| Campaign microsite / launch | Visceral | 3D/WebGL, Kinetic Type, Scrollytelling, Y2K; the high-risk register is legitimate here | Swiss, Data-Dense |
| Health / gov / finance-for-all | Behavioral + trust | Swiss, Soft UI 2.0, Editorial; maximum a11y | Neumorphism, Brutalism, Aurora, Glass |
| Gaming / music / nightlife | Visceral | Pixel, Vaporwave, Y2K, Maximalism | Warm Minimal, Swiss |
| China market | (differs) | Guochao for brand surfaces; CJK-density for product; bento | Sparse Western minimalism (reads empty/low-value) |
| Creative portfolio / agency | Visceral | Anything experimental; the site IS the proof of capability | Safe templates |

**B2B density note:** "Density isn't the problem; density without structure is. A well-organized table with 20 rows is easier to read than a poorly organized table with 5 rows." Use progressive disclosure, not blanket whitespace; power users build muscle memory, so don't disrupt it; offer a density setting.

## 4. How famous teams actually chose (case studies to reason from)

- **Linear: opinionated, for a specific person.** "The best design is opinionated." Spec = baseline MVP, not the goal ("a door that opens technically functions; it's harder to do the craft"). "The simplest way to increase quality is to reduce scope." "Data can be a crutch; trust your intuition." Small teams: more people = diluted execution. Quality WAS the go-to-market: "We started with quality. People noticed, because it's a rare approach."
- **Stripe: craft as consequence of stakes.** Katie Dill: "You can have craft without quality, but rarely quality without craft." Three pillars simultaneously: beauty, usefulness, well-executed detail. Justification is consequential, not aesthetic: "our users are moving money around the planet." Evidence: Optimized Checkout's craft focus ↔ **+11.9% revenue on average.** "The quality and details become the differentiation."
- **Family (crypto wallet): three principles, each with a mechanism.** Simplicity → dynamic tray (progressive disclosure, height = progress). Fluidity → motion is functional ("each animation aids understanding the path A→B"): morphing button labels, persistent wallet cards, directional tabs. Delight → the Delight-Impact Curve (impact ∝ 1/frequency).
- **Arc: deliberately playful, borrowed from OUTSIDE tech.** Chose bold frenetic color knowing it might feel out of place in professional settings; references film and video games rather than other tech UX (onboarding paced like game skill levels). Lesson: mine non-tech references for differentiation.
- **Airbnb 2025: style change downstream of strategy change.** Moved AWAY from flat minimalism to 3D/skeuomorphic Pixar-like icons with a full new system (custom animated-icon format "Lava") because three new business pillars needed visual weight to distinguish them. Lesson: rebrand when the business model changes, not for freshness.
- **Vercel: design engineering as the delivery mechanism.** Principles: obsess over usefulness; own the whole experience (every state, edge case, word); find the real constraint; "make complexity available, not required"; scope small enough to do it well; turn repeated feedback into better defaults.

## 5. Design engineering (the discipline this skill assumes)

Bridging visual design and engineering so quality never crosses a handoff (Saarinen: "do away with handoff"). Core practice: **prototype in code, not Figma, for anything temporal or input-driven**: momentum, interruption, easing, latency can't be represented in static tools. A developer's implementation skill is an advantage for taste-building, not a handicap.

Reading order: Vercel "Design Engineering at Vercel" → Vercel Design Engineer Principles → rauno.me/craft/interaction-design → emilkowalski/skills (emil-design-eng) → maggieappleton.com/design-engineers → animations.dev.

## 6. Quick veto checklist before committing to a style

- Does the style survive this product's WORST content (longest string, densest table, ugliest user photo)?
- Will a daily user still tolerate it in month 3? (visceral decays; behavioral compounds)
- Can it express ALL semantic states (error/success/warning/disabled) without breaking character?
- Does it have an answer for forms and tables? (vaporwave doesn't)
- Does the brand actually have permission for it? (neubrutalism on a conservative brand = costume)
- Is it this year's slop? (aurora hero, Linear-clone dark, Vercel-clone grid; see style-playbooks §DYING)
- Is the product's native object visible as evidence, or could the same hero advertise any SaaS?
- Can the accent be removed without losing instructions, state, validation, or accessibility?
