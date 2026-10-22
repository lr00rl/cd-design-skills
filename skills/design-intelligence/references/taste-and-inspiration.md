# Taste and inspiration

A design-taste training manual for developers. Read this file when the user asks how to develop taste, where to find good inspiration, or what to study. You can also recommend it to the user to read on their own.

## 1. Core thesis (five people, one conclusion)

**Taste is an intuition you can train, not an innate preference.** The training formula: heavy exposure to top-level work × forcing yourself to say *why* it is good × high output + honest critique.

- **Paul Graham**, "Taste for Makers": "Saying that taste is just personal preference is a good way to prevent disputes. The trouble is, it's not true." His formula for great work: exacting taste plus the ability to satisfy it.
- **Emil Kowalski** (design engineer at Linear, author of Sonner) describes taste as a trained intuition, the ability to see past the obvious, built by immersing yourself in good work, thinking hard about why it feels right, and practicing without letting up.
- **Julie Zhuo** (former VP of Design at Facebook): good taste, like everything else, is a skill.
- **Rauno Freiberg** (Vercel): being able to analyze details beyond "it feels nice" is exactly how taste gets fed.
- **Ira Glass's "taste gap"**: when you start, your taste is ahead of your ability, so work that falls short of your own eye is **normal**. The remedy is **to set yourself hard deadlines and close the gap through volume**. Graham adds that the gap itself is the engine: cultivate dissatisfaction.

Steve Jobs (quoted by Emil): "It comes down to trying to expose yourself to the best things that humans have done and then try to bring those things in to what you're doing."

## 2. Daily training system (ordered by return on effort)

### 1. Copywork: highest return, strongest practitioner consensus
Recreate interfaces you admire, pixel for pixel. Why it works: **you are forced to remake every decision the original designer made**.
- Process: screenshot → place it in Figma as an underlay and rebuild it element by element. Developer variant (a better fit for you): **recreate it directly in HTML/CSS**, which trains implementation at the same time.
- Key rule: **copy work that is above your current level**. Copywork trains the eye, and you start to notice details you could not see before.

### 2. Julie Zhuo's six steps
(1) Believe that good taste exists → (2) find people widely recognized for good taste (then follow the trail and study whom **they** admire: the lineage of taste) → (3) dig into their work (use their products, go through their portfolios) → (4) practice a critical eye: what do you like, and why? Analyze specific decisions, and never stop at "cool" or "bad" → (5) **share your analysis publicly and discuss it** (this forces you to be specific) → (6) make things, and get real, honest critique.

### 3. Teardown ritual (Rauno's method)
Each week, pick one interaction you use every day and explain its invisible details. Vocabulary: preserved gesture momentum; intent-distance thresholds (light actions trigger partway through, destructive actions must complete); the spatial origin of an animation; Fitts's law and "magic corners"; fidgetability; boundary damping.

### 4. Swipe file
When you save something, **you must write a one-line note saying which specific decision you saved it for**. An annotated swipe file is a taste asset; an unannotated Pinterest board is not.

### 5. Friction log (a Stripe practice)
Use your own product every week and write down every awkward spot. Pair it with "walking the store". Katie Dill frames this as pushing back against the pull toward mediocrity. Emil's version: **look again the next day with fresh eyes**, and replay animations slowed down or frame by frame, so timing problems that are invisible at full speed show up.

### 6. Volume and deadlines
Ira Glass: produce one piece on a fixed schedule every week. Volume closes the taste gap; there is no shortcut.

## 3. Inspiration sources (verified, grouped by use)

### Real product UX (highest return)
- **mobbin.com**: real interfaces and **complete flows** (onboarding, checkout, settings) from shipped products, not concept work. The subscription most worth paying for when you build apps or SaaS.
- **refero.design / pageflows**: real product UX flows.

### Visual ambition
- **godly.website**: very strict curation (3-5 sites a week, against Awwwards' daily picks), so the signal-to-noise ratio is high; animation, scrolling, visual storytelling.
- **awwwards.com**: the experimental edge; inspiring, but often does not transfer to product UI.
- **dark.design**: a curated set of dark themes.

### Landing pages and components
- **land-book.com**: SaaS and startup landing pages, filterable by style, color, and **specific sections** (pricing, comparison tables). Most useful when you are stuck on one component.
- **onepagelove.com**: one-page landing pages.
- **footer.design**: footers only, filterable by type.
- **curated.design**: curated web design (the source is a recommendation list on X).

### Hierarchy and whitespace
- **minimal.gallery**: hand-picked by Piet Terheyden since 2013; the best reference for **visual hierarchy, whitespace, and content-first layout**.
- **seesaw.website**: updated daily and organized by **industry** (AI, marketing, crypto, portfolio): what a credible company in a given field looks like.

### Interaction and motion craft
- **interfaces.dev**: a paid design engineering magazine by Jakub Krehel (former design engineer at OpenSea), $7.99/month with 3 issues free to read: animation, typography, OKLCH, optical alignment. Its core claim: in the AI era, shipping fast is no longer an advantage, and the difference lies in building with extreme care. Each issue comes with a companion agent skill.
- **github.com/jakubkrehel/skills**: the open-source skill distilled from that magazine (MIT), covering better-ui / better-typography / better-colors and installable with `npx skills add jakubkrehel/skills`. Its exact values are already absorbed into this skill's `craft-details.md`. Companion tool: **oklch.fyi** (an OKLCH palette generator).
- **interfacecraft.dev, *Means & Methods***: by joshpuckett (former design lead at Dropbox); 11 chapters covering 100+ interface design refinement topics, with interactive examples and code.
- **uilabs.dev**: playful experimental components by Mariana Castilho.
- **60fps.design**: app motion only.
- **appmotion.design**: animation inspiration.

### Design system resources
- thedesignsystem.guide (guide) · designsystemchecklist.com (checklist) · designsystems.surf (database) · designsystemsrepo.com (resources) · component.gallery (component comparison) · rebrand.gallery (rebrand case studies).

### People worth following (design engineers)
- **Rauno Freiberg** (rauno.me, Vercel; *Invisible Details of Interaction Design*, *Devouring Details*)
- **Emil Kowalski** (emilkowal.ski, Linear; Sonner has 13M+ weekly downloads; the animations.dev course; the emil-design-eng SKILL.md in GitHub emilkowalski/skills is the single free resource with the highest density of codified UI taste)
- **Mariana Castilho** (@mrncst, uilabs, formerly at Vercel)
- **Karri Saarinen** (founder of Linear), **Katie Dill** (Stripe, formerly at Airbnb and Lyft)
- The public list **maggieappleton.com/design-engineers**, maintained by **Maggie Appleton**: a ready-made list of people to follow
- Practitioners on X: joshpuckett, marina_uiux (budarina.studio), asobodesign (cute Japanese-style micro-interactions), UiSavior, Jhey Tompkins (inventive CSS), Josh Comeau (joshwcomeau.com)

### Books and courses (real practitioner recommendations)
1. ***Refactoring UI*** (Adam Wathan and Steve Schoger): the first book for developers. Core moves: start with too much whitespace and take it away; visual hierarchy is "the most effective tool you have for making something feel 'designed'"; carry hierarchy with weight and color, not only size; **de-emphasizing competing elements** works better than emphasizing the target; each page has only one true primary action; **design in grayscale first** so spacing, contrast, and size have to do the work.
2. ***Grid Systems in Graphic Design*** (Müller-Brockmann) plus Kimberly Elam's *Grid Systems*: the source of grid thinking.
3. ***Thinking with Type*** (Ellen Lupton): a typography primer, and the vocabulary to put taste into words.
4. **animations.dev** (Emil's course): every lesson focuses on taste and quality; the first paid course to pick for developers practicing web motion.
5. **Don Norman, *The Design of Everyday Things* and *Emotional Design***: the origin of the visceral, behavioral, and reflective levels.

## 4. Three shortcuts for developers in the AI era

1. **Writing code is an advantage, not a weakness.** The places where taste is densest (momentum, interruption, easing, delay) cannot be expressed in Figma and can only be iterated on in code, so practice directly at the implementation layer.
2. **Design-first vibe coding.** AI can turn dull data into a striking interactive canvas, but the sense of direction has to come from you. Lock the style spec first (tokens first), then let AI generate; otherwise the output slides toward the statistical average, which is slop.
3. **Every output is training.** Each time AI produces an interface for you, use this skill's Output Contract to make yourself restate which style you chose, why it fits, and which signature details you added. That turns Julie Zhuo's steps 4 and 5 into a daily habit.
