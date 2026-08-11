# Apple Product Design — Evidence-backed Synthesis and Review Gates

Use this reference to reason about products, hardware-software systems, interactions, Apple-platform work, and consequential UI. It is not an Apple visual imitation guide, a confidential Apple process, or an exhaustive industrial-design specification.

Research baseline: Apple official sources reviewed 2026-08-11. Apple documentation is living guidance; recheck current HIG and platform resources before shipping Apple-platform work.

## Contents

1. [Scope and evidence boundary](#1-scope-and-evidence-boundary)
2. [Product Spine](#2-product-spine)
3. [Eight product principles](#3-eight-product-principles)
4. [Decision priority and tradeoffs](#4-decision-priority-and-tradeoffs)
5. [Responsibility gate](#5-responsibility-gate)
6. [Hardware, software, and services as one product](#6-hardware-software-and-services-as-one-product)
7. [Software and interaction laws](#7-software-and-interaction-laws)
8. [Platform and human-context matrix](#8-platform-and-human-context-matrix)
9. [Visual language and Liquid Glass boundary](#9-visual-language-and-liquid-glass-boundary)
10. [Verification and delivery evidence](#10-verification-and-delivery-evidence)
11. [Apple Design Awards as an excellence lens](#11-apple-design-awards-as-an-excellence-lens)
12. [Common misreadings](#12-common-misreadings)
13. [Official source map and version notes](#13-official-source-map-and-version-notes)

## 1. Scope and evidence boundary

Keep three evidence labels distinct:

- **Apple direct:** a named Apple principle, platform summary, public claim, or linked official source.
- **Apple-derived synthesis:** this skill's operational question, ordering, matrix, gate, veto, or web/hardware translation. It is a review method, not an Apple requirement.
- **External validation required:** legal, regulatory, security, medical, financial, environmental, ergonomic, manufacturing, or accessibility obligations that must be checked with the appropriate current authority and representative testing.

Except where a passage explicitly summarizes Apple and links its source, the workflows and checklists in this file are **Apple-derived synthesis**. Apply two layers deliberately:

- **Portable product principles:** purpose, agency, responsibility, familiarity, flexibility, simplicity, craft, delight, accessibility, context preservation, feedback, and recovery. These can improve products on any platform.
- **Conditional Apple-platform rules:** platform components, navigation patterns, safe areas, SF Symbols, Dynamic Type behavior, input devices, system materials, and Apple Design Resources. Apply these only when the target is an Apple platform and verify against current HIG.

For web products, treat Apple HIG as a product-quality reference, not a browser specification or WCAG substitute. Preserve native HTML semantics, browser conventions, the product's identity, performance, and applicable accessibility standards.

Do not present a web translation, a scoring model, a prioritization, or a hardware analogy as an Apple platform requirement.

## 2. Product Spine

**Apple-derived synthesis.** Complete only the applicable fields before selecting a visual style. Keep each answer concrete and testable.

```md
Primary outcome:
Specific person and real context:
Essential task and shortest useful path:
System boundary — hardware / software / service / human:
Agency — choices, escape, edit, undo, recovery:
Responsibility — safety, privacy, data, abuse, irreversible impact:
Platform and inputs — device, distance, posture, touch/pointer/keyboard/voice/etc.:
Continuity — interruption, resize, window/device switch, resume:
Longevity — maintenance, compatibility, durability, repair, end of life:
Intended emotion — appropriate to the task, not a decorative mood board:
Success evidence:
```

If any answer is unknown, record the assumption and design a way to test it. Do not hide missing product judgment beneath a polished surface.

## 3. Eight product principles

Apple's current Design Principles page organizes its top-level guidance around eight tools for making tradeoffs. Consider all eight; the table follows the page sequence, not a hierarchy or mandatory order. The principle names and core interpretations summarize Apple; the decision questions, evidence, and vetoes are **Apple-derived synthesis**.

| Principle | Decision question | Required evidence | Veto condition |
|---|---|---|---|
| **Purpose** | What meaningful outcome is this for, and which task matters most? | A named person, context, primary outcome, and smallest useful path | The screen advertises features but cannot state the person's job |
| **Agency** | Can people act in their own way, understand state, change their mind, and recover? | Escape, back, skip, edit, cancel, undo, retry, or restore where feasible | A guided flow traps people or an error destroys time/work |
| **Responsibility** | Does the product act in people's best interests and explain consequences? | Data/permission map, risk cases, safe defaults, transparent behavior | Hidden collection, deceptive consent, silent harm, or unbounded automation |
| **Familiarity** | Which physical, web, platform, or domain conventions already match the task? | A pattern inventory and consistent semantics across the product | Novelty redefines basic actions like back, close, link, selection, or delete |
| **Flexibility** | Does the task survive different people, devices, inputs, configurations, and perspectives? | Platform/input matrix, text enlargement, localization, accessibility, context preservation | A core task depends on one body movement, input, viewport, or sensory channel |
| **Simplicity** | What is necessary, and what can move away without hiding control or consequences? | Clear hierarchy, concise labels, progressive disclosure | Minimal appearance removes status, cost, context, or expert capability |
| **Craft** | Has every relevant state been designed, built, tested, and maintained with care? | Real data, real devices/modes, state coverage, performance and durability evidence | Only the ideal static state exists |
| **Delight** | What emotion fits this experience, and is expression earned by the whole? | A contextual reason for personality, motion, sound, haptics, or material | Decoration competes with purpose, comfort, comprehension, or frequency |

### Deep interpretation

- **Simplicity is not minimalism.** It is a reduction of unnecessary decisions and an increase in legibility. A powerful tool can remain simple by making complexity available rather than mandatory.
- **Agency requires legible system state.** Choice without feedback is not control. Recovery without a predictable result is not safety.
- **Responsibility is product logic.** It governs data models, permission timing, irreversible operations, AI behavior, notification pressure, business incentives, abuse cases, and failure reporting—not merely privacy copy.
- **Familiarity is a learning accelerator, not an anti-innovation rule.** Innovate in the value or interaction that matters; keep basic controls predictable.
- **Flexibility means continuity with adaptation.** Preserve the task and mental model while changing density, navigation, input affordances, or presentation for the context.
- **Craft continues after launch.** Maintenance, platform updates, reliability, performance, compatibility, and support are part of the designed experience.
- **Delight is cumulative.** Trust, freedom, comfort, familiarity, responsiveness, and precise details produce durable delight. Confetti alone does not.

## 4. Decision priority and tradeoffs

**Synthesis:** Apple presents the principles as tools rather than a strict ranking. Use this safety-oriented order when principles conflict:

1. Protect safety, privacy, security, legal rights, and data integrity.
2. Preserve accessibility, inclusion, human agency, truthful state, and recovery.
3. Protect the primary outcome, context, reliability, performance, and comfort.
4. Respect platform familiarity, semantic consistency, and product identity.
5. Optimize efficiency, visual expression, novelty, and delight.

Examples:

- Add friction to a genuinely irreversible or high-impact action even when it reduces conversion.
- Remove a delightful animation when it harms motion comfort, latency, or task frequency.
- Prefer an explicit failure state over a success-looking state that dropped records or failed sub-operations.
- Preserve a familiar platform control when a custom version adds style but weakens semantics, accessibility, or maintenance.
- Choose reliability over theoretical repairability when evidence shows the product is less likely to fail overall; choose serviceable modules where failure or wear is expected.

Record a short tradeoff note whenever a lower-priority goal yields to a higher-priority one.

## 5. Responsibility gate

**Apple-derived synthesis.** Run the applicable parts before growth optimization, visual polish, or automation. This gate operationalizes Apple's responsibility, privacy, accessibility, inclusion, and AI guidance; it does not replace current legal, security, medical, financial, or regulatory validation.

### Transparency and data

- Name what the product does, what it collects, why it needs it now, where it goes, how long it persists, and how someone can refuse or withdraw.
- Request only the permission the current feature needs, when the need is clear. Prefer the feature moment; if a protected resource is genuinely required before the product can function, explain and integrate the request into prerequisite onboarding or launch. Do not batch-request speculative permissions.
- Collect the minimum data needed for the active task. A possible future use is not a current need.
- Offer a reasonable nonpermission path when the core value can still work without the protected resource.
- Make privacy, consent withdrawal, export, and deletion controls findable and understandable.
- Never use visual weight, shame, false urgency, disguised controls, or asymmetrical effort to coerce consent.

### Safety, security, and consequential actions

- Identify foreseeable misuse, accidental harm, high-impact mistakes, and affected nonusers.
- Use safe defaults. Expose risk before the action, not only in a policy after it.
- Prefer reversible operations, soft deletion, version history, and scoped permissions.
- For truly irreversible, financial, public, destructive, medical, identity, or safety-critical actions, name the object, scope, consequence, and final action explicitly.
- Never silently downgrade security or omit failed sub-operations to preserve a clean success state.
- Keep authentication and recovery understandable; security that people cannot operate safely is incomplete.

### Accessibility and inclusion

- Treat accessibility as a design input from the first wireframe and prototype, not a late compliance pass.
- Do not rely on color, sound, motion, hover, drag, a complex gesture, or one body position as the only channel for essential meaning or action.
- Support text enlargement, visible focus, sensible reading/focus order, descriptive labels, adequate contrast, reduced motion, localization, and RTL when relevant.
- Consider permanent, temporary, and situational disabilities plus differences in language, culture, age, cognition, mobility, vision, hearing, and speech.
- Test with more than the designer's body, device, lighting, network, and expertise.

### Generative AI

Apple's HIG introduced explicit Generative AI guidance in 2025 and updated it in June 2026. Apply these checks to AI features:

- Use AI only when it creates specific value such as time saved, communication improved, or creativity enabled. Do not add it because it is fashionable.
- Disclose where AI is used and set expectations about capabilities, limitations, latency, and possible errors.
- Keep people in control of decisions. Provide dismiss, edit, adjust, retry, compare, revert, and feedback paths near generated output.
- Avoid automating destructive or hard-to-reverse actions. Confirm significant actions performed on someone's behalf.
- Offer a non-AI path when AI is complementary rather than essential.
- Minimize sensitive data, obtain meaningful permission, explain storage/training/third-party use, and provide opt-out where applicable.
- Test bias, stereotypes, harmful prompts, out-of-scope requests, hallucinations, copyright risk, degraded availability, and adversarial misuse.
- Report real progress and failures in plain language. Do not fabricate certainty, progress, provenance, or successful completion.

## 6. Hardware, software, and services as one product

Apple's official materials describe close collaboration across industrial design, human interface, hardware, software, services, graphics, fonts, haptics, sound, packaging, and retail. The operational rules below are **Apple-derived synthesis** for a whole-product review.

Apple does not publish a complete public industrial-design rulebook comparable to HIG. This section combines Apple's public descriptions of its design organization, environmental and longevity reports, and product-development statements with explicitly operationalized synthesis. Do not present it as confidential process or exhaustive hardware specification.

### Integration

- Start from the human outcome, then allocate responsibilities across hardware, software, service, and person. Do not let organizational boundaries become user-visible seams.
- Make physical controls, onscreen controls, haptics, sound, sensors, connectivity, cloud state, support, and repair tell one coherent story.
- Define latency, unavailable states, offline behavior, pairing, authentication, ownership transfer, reset, and recovery across boundaries.
- Let hardware capability remove effort only with permission and clear value. A sensor is not permission to collect everything it can observe.

### Human factors

Specify and test:

- Fit, comfort, grip, reach, handedness, posture, force, precision, visibility, glare, viewing distance, thermal comfort, and fatigue.
- One-handed and two-handed use, seated and moving use, short glances and long sessions, constrained environments, assistive inputs, and accidental activation.
- Whether feedback is perceivable through more than one appropriate channel and proportional to the action.
- Whether the physical form communicates where to hold, press, look, connect, charge, open, or avoid.

Do not infer ergonomics from a rendering. Prototype at physical scale and test with representative people and environments.

### Materials, manufacturing, and finish

- Treat materials, color, finish, tolerances, assembly, service access, energy, thermals, durability, and manufacturing processes as design inputs from the beginning.
- Use visual and tactile refinement to reveal function and quality, not to conceal fragility or service constraints.
- Include accessories, cables, packaging, setup, support, and end-of-life handling in the experience boundary.

### Reliability, repair, and longevity

Apple's published hardware position treats longevity as a balance among durability, repairability, software support, safety, security, privacy, environmental impact, repair access, and repair transparency.

- Design reliability testing alongside product development, not as an end-stage certification task.
- Test real-world stressors, expected wear, misuse, environmental exposure, transport, interruption, and recovery.
- Use evidence about failure frequency to decide which modules need durability, serviceability, replacement, or redundancy.
- Plan software and security support, backwards compatibility, diagnostics, parts/service history, data-safe repair, resale/reset, and decommissioning.
- State lifecycle tradeoffs honestly. "Repairable," "durable," "sustainable," and "secure" are claims that require evidence.

### Environment and lifecycle

Review the complete path: source → make → package and ship → use → maintain/repair → recover/reuse.

**Synthesis for digital products:** map this lifecycle discipline to performance budgets, energy/network cost, backwards compatibility, graceful degradation, data portability, maintenance, and clean decommissioning. This is a web/product translation, not a direct Apple web requirement.

## 7. Software and interaction laws

**Apple-derived synthesis.** These rules operationalize the eight principles and the linked HIG topics; they are not a verbatim Apple checklist.

### Content, controls, and hierarchy

- Make content and the current task primary. Navigation and controls support them; transient feedback sits above them only as long as needed.
- Use progressive disclosure to keep common actions close while making advanced capability discoverable.
- Distinguish content, control, selection, status, and decoration. One element must not change roles unpredictably.
- Keep labels concise and outcome-based. Explain errors with what happened, impact, and next action.

### Familiar patterns and components

- Start with platform, browser, and domain conventions. Prefer system or mature semantic components when they cover the required behavior.
- Preserve standard meanings for links, buttons, back, close, search, selection, drag, scroll, undo, menus, and keyboard shortcuts.
- Supporting a custom gesture never removes the need for the standard gesture or an accessible visible alternative.
- Keep appearance, label, behavior, state, and feedback consistent for the same concept.

### Feedback and recovery

Design every important action as:

```text
trigger → immediate acknowledgement → honest progress → explicit outcome → recovery/next step
```

- Match feedback intensity to information importance. Passive status belongs in context; interruptions are for urgent, actionable information.
- Show availability, selection, changes, saved/unsaved state, background work, completion, failure, and partial failure.
- Prefer undo for frequent, recoverable actions. Use confirmation for unusual, costly, or irreversible actions where an extra decision protects intent.
- Preserve work and context across errors, interruptions, navigation, window changes, refresh, sign-in, and device handoff where the product promises continuity.

### Multiple inputs and comfort

- Support the inputs people actually use: touch, pointer, keyboard, voice, stylus, remote/focus, game control, eyes/hands, assistive technologies, or physical controls as applicable.
- Avoid hover-only, drag-only, gesture-only, sound-only, color-only, or motion-only core functionality.
- Prioritize comfortable reach, target size, precision, repetition, posture, viewing distance, and fatigue for the specific device and session.
- Let system accessibility preferences and alternate inputs work with native or semantic controls before building custom behavior.

### Motion, sound, and haptics

- Give every expressive behavior a job: acknowledge input, preserve context, explain direction or causality, communicate state, or add appropriate character.
- Make motion interruptible when the interaction is interruptible. Keep feedback immediate.
- Provide reduced-motion behavior and never make motion the only information channel.
- Match feedback to input and platform. Do not force web vibration, audio, or custom physics where the environment does not support or expect it.

### Onboarding and interruption

- Prefer an interface people can learn by using. When onboarding is necessary, make it short, contextual, interactive, optional, and escapable.
- Prefer the feature moment for permission requests. Use prerequisite onboarding/launch only when the protected resource is genuinely required before the product can function, and explain the reason before the system prompt.
- Interrupt only for timely, high-value, actionable information. Do not turn routine completion or marketing into an alert.

## 8. Platform and human-context matrix

**Apple summaries + skill synthesis.** Apple-platform rows summarize the linked platform pages; Web, hardware-companion, wearable/audio, shared-home, and packaging rows are skill synthesis. Use the matrix to choose what stays consistent and what adapts, and verify current platform HIG before implementation.

| Context | Human situation and primary inputs | Design emphasis | Avoid |
|---|---|---|---|
| **iOS** | Handheld, one/two hands, touch/keyboard/voice, often mobile and interruptible | Primary content, reachable actions, short and long sessions, orientation/Dark Mode/text-size adaptation, permission-based capability | Desktop density shrunk to a phone; top-heavy reach; constant modal flows |
| **iPadOS** | Held, propped, or desktop-like; touch + keyboard + pointer + Pencil + voice; multitasking | Large canvas without needless full-screen modality, mixed inputs, drag/drop, windows, orientation, variable viewing distance | A stretched iPhone layout; touch-only controls; assuming one window or posture |
| **macOS** | Stationary, large/multiple displays, precise pointer, keyboard, long focused sessions, multiple apps | Resizable windows, higher useful density, menus, shortcuts, precision, customization, clear active/inactive state | Mobile-first full-screen funnels; hidden commands; oversized touch spacing everywhere |
| **watchOS** | Worn, moving or stationary, very small display, glance, touch/Crown/voice | Essential timely information, shallow hierarchy, one or two gestures, relevant complications/notifications, independent core value | Miniature phone UI; deep navigation; long reading/data entry; vague loading |
| **tvOS** | Shared room, long viewing distance, remote/focus/voice/controller | Strong focus state, large legible content, cinematic media, simple navigation, multiuser awareness | Pointer assumptions; subtle focus; small text; dense controls; frequent sign-in |
| **visionOS** | Spatial, eyes + hands + voice/physical input, surroundings and body comfort matter | Minimum necessary immersion, comfortable depth/placement, indirect and direct input, safety, privacy, motion comfort | Forcing full immersion; repetitive arm motion; tiny/dense targets; head-locked content; unsafe placement |
| **Web** | Unknown hardware; keyboard, pointer, touch, assistive tech; variable browser, window, zoom, power, network | Semantic HTML, web conventions, responsive tasks, feature detection, WCAG, 200% zoom, performance and graceful degradation | Copying iOS chrome; Apple-only gestures/assets; assuming Safari/iPhone; disabling zoom |
| **Hardware companion** | Physical object plus screen/service, intermittent connectivity and device state | Pairing, ownership, latency, offline state, physical/digital control parity, firmware/update, reset, repair and handoff | UI that claims a physical action succeeded before confirmation; hidden desynchronization |
| **Wearable/audio hardware — Synthesis** | Body fit or listening context; physical controls, sensors, voice, audio/haptic feedback; limited or no screen | Comfort, secure fit, discoverable controls, pairing/battery/connection state, accessible redundant feedback, privacy in public | Audio-only critical state; ambiguous tap/press mappings; hidden disconnection; assuming one body or ear fit |
| **Shared home/ambient hardware — Synthesis** | Household, guests, shared rooms, voice/touch/automation, intermittent attention | Ownership and profiles, guest access, privacy, clear listening/recording state, quiet-hours and interruption policy, offline/manual control | Treating a shared device as single-user; exposing personal data; automation with no override or visible state |
| **Accessories/setup/packaging — Synthesis** | First contact, installation, orientation, compatibility, transport and storage | Obvious physical affordances, minimal setup, compatibility truth, accessible instructions, material efficiency, reuse/recovery | Packaging beauty that obscures opening/setup; hidden compatibility limits; disposable complexity |

Across platforms, preserve the person's task, object, terminology, state, and sense of location. Adapt information density, navigation, controls, input affordances, motion, and presentation to the environment.

## 9. Visual language and Liquid Glass boundary

Current HIG directly highlights three visual-system aims:

- **Hierarchy:** controls and navigation remain distinct from the content they serve.
- **Harmony:** form, material, behavior, hardware geometry, and system experience feel intentionally related.
- **Consistency:** platform conventions and product semantics remain predictable while layout adapts.

The operational material, geometry, and web-boundary rules that follow are **Apple-derived synthesis**. Apply them without reducing Apple design to surface traits.

### Materials

- Use material to communicate functional layers, depth, or context—not as garnish.
- Keep content legible across real backgrounds, appearance modes, increased contrast, and reduced transparency.
- Avoid multiplying translucent layers, decorative glass cards, or effects that blur the boundary between content and control.
- On Apple platforms, let current native components adopt current system materials where possible.

### Liquid Glass

Liquid Glass is a conditional Apple platform material, not the definition of Apple design.

- Use it for the functional control/navigation layer where current HIG and native frameworks support it.
- Do not spread it through the content layer or recreate it merely to signal premium aesthetics.
- On the web, a glass treatment is a visual interpretation with browser, contrast, transparency-preference, battery, and performance costs. It is not native fidelity.
- Never make a Web or Android product impersonate Apple system UI. Preserve the product's own identity and platform semantics.

### Geometry, type, symbols, and assets

- Derive geometry from hierarchy, containment, interaction, and the target system; concentricity is one harmony technique, not a universal radius formula.
- Use system type and symbols when the target platform and license support them. Do not assume Apple fonts, SF Symbols, UI kits, or product bezels are general web assets.
- Consult current [Apple Design Resources](https://developer.apple.com/design/resources/) and its license for Apple-platform implementation and mockups.

## 10. Verification and delivery evidence

**Skill synthesis.** These gates are a proportional review tool, not an Apple certification checklist. Use only the items applicable to the selected product lane and risk.

### Blocking gates

Do not call the design complete when any applicable condition is true:

- The primary outcome, person, context, or essential task is undefined.
- The core task is obscured by visual treatment or feature inventory.
- A guided flow has no escape, or a mistake destroys work without justified recovery limits.
- Permission, data use, AI involvement, cost, sharing, automation, or irreversible consequences are hidden or misleading.
- The interface presents full success when records, operations, sync, or generated results failed or degraded.
- A core task depends on a single viewport, input, body movement, sensory channel, hover, drag, or gesture.
- Focus, semantics, contrast, text enlargement, localization, reduced motion, or error guidance is unverified.
- Cross-platform screens are copied without adapting to human context and platform conventions.
- Only the ideal state exists; loading, empty, error, offline, denied, partial, destructive, and restore states are missing where applicable.
- An Apple-platform implementation replaces a native component without clear user or product value or evidence that native behavior is insufficient, and without parity evidence for semantics, inputs, states, accessibility, and platform behavior.
- A hardware concept lacks physical-scale human factors, reliability, repair, support, and lifecycle reasoning.

### Evidence package

Deliver the smallest applicable set:

1. Completed Product Spine and stated assumptions.
2. Platform/input matrix with adaptations and invariants.
3. Core flow plus state matrix: default, focus/selection, loading, empty, success, error, offline, denied, partial, destructive, undo/recovery, interruption/resume.
4. Data/permission/AI map with refusal, withdrawal, deletion, and failure behavior.
5. Component or system-boundary decision: native/use/theme/wrap/vendor/rebuild, or hardware/software/service allocation.
6. Visual spec: hierarchy, tokens, typography, density, geometry, motion, appearance modes, localization.
7. Human-factors and lifecycle evidence for physical products.
8. Rendered and interaction evidence with realistic content and relevant devices/modes.
9. Residual risks, unsupported contexts, and maintenance/version assumptions.

### Stop condition

Stop when the primary outcome is clear, responsibility and agency gates pass, platform/context adaptations are intentional, critical states and failures are truthful, the artifact has been exercised in its real medium, and remaining risks are explicit. More decoration is not completion.

## 11. Apple Design Awards as an excellence lens

**Apple criteria + skill synthesis.** Apple Design Awards are recognition criteria, not HIG requirements. Use their current dimensions as a final aspiration check after blocking gates pass:

- **Delight and Fun:** memorable and satisfying in a way that fits the task.
- **Inclusivity:** excellent across abilities, backgrounds, and languages.
- **Innovation:** technology or interaction creates distinct user value rather than novelty alone.
- **Interaction:** controls feel effortless and tailored to the platform.
- **Social Impact:** the product improves lives or addresses meaningful issues without avoidable harm.
- **Visuals and Graphics:** imagery, interface, typography, and animation form a distinctive, cohesive whole.

**Synthesis:** score each dimension only after recording evidence. A visually striking but unsafe, inaccessible, or unreliable product does not pass because its average score is high.

## 12. Common misreadings

**Skill interpretation.** These correct recurring reductions of Apple's public guidance; they are not quotations from Apple.

- **"Apple design means minimal."** No. Current HIG explicitly separates simplicity from minimalism. Necessary capability and consequences must remain available.
- **"Apple design means Liquid Glass."** No. Material is conditional; purpose, agency, responsibility, platform fit, and craft are the system.
- **"Consistency means identical screens."** No. Preserve the task and mental model while adapting to device, input, posture, attention, and platform conventions.
- **"Invisible effort means invisible state."** No. Internal complexity can disappear; progress, consequences, failures, and recovery must remain legible.
- **"Delight means more animation."** No. Delight emerges from the whole and must not obstruct purpose or comfort.
- **"Accessibility is a checklist after design."** No. It changes input, hierarchy, content, layout, motion, testing, and product reach from the start.
- **"Privacy is a permission dialog."** No. It begins with data minimization, product architecture, safe defaults, transparency, refusal, and withdrawal.
- **"Hardware design is enclosure styling."** No. Human factors, engineering, materials, manufacturing, software, service, repair, support, and end of life are part of the designed result.
- **"HIG is a universal Web spec."** No. Use portable principles on the web; use web standards for implementation and accessibility.
- **"An Apple UI kit can be copied anywhere."** No. Apple Design Resources have platform and license constraints; inspect the current license.

## 13. Official source map and version notes

### Current core

- [Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines) — current hierarchy, harmony, consistency, and topic structure.
- [Design principles](https://developer.apple.com/design/human-interface-guidelines/design-principles) — Purpose, Agency, Responsibility, Familiarity, Flexibility, Simplicity, Craft, Delight.
- [Foundations](https://developer.apple.com/design/human-interface-guidelines/foundations) — accessibility, color, layout, materials, motion, privacy, typography, writing, and related foundations.
- [Apple Design Resources](https://developer.apple.com/design/resources/) — current platform templates, UI kits, symbols, fonts, icon tools, and product resources.
- [Apple Design Resources License](https://developer.apple.com/support/downloads/terms/apple-design-resources/Apple-Design-Resources-License-20230621-English.pdf) — permitted use of Apple design assets.
- [Apple Fonts](https://developer.apple.com/fonts/) — current platform font downloads, usage notes, and license links; verify the applicable terms before bundling any Apple font.

### Responsibility, inclusion, and interaction

- [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Inclusion](https://developer.apple.com/design/human-interface-guidelines/inclusion)
- [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [Generative AI](https://developer.apple.com/design/human-interface-guidelines/generative-ai)
- [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)
- [Undo and redo](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo)
- [Gestures](https://developer.apple.com/design/human-interface-guidelines/gestures)
- [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)
- [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) — current distribution rules for safety, performance, business, design, legal, and privacy.

### Foundations and expression

- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Typography](https://developer.apple.com/design/human-interface-guidelines/typography)
- [Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Motion](https://developer.apple.com/design/human-interface-guidelines/motion)
- [Writing](https://developer.apple.com/design/human-interface-guidelines/writing)

### Platform context

- [Designing for iOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ios/)
- [Designing for iPadOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-ipados/)
- [Designing for macOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-macos/)
- [Designing for tvOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-tvos)
- [Designing for watchOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-watchos)
- [Designing for visionOS](https://developer.apple.com/design/human-interface-guidelines/designing-for-visionos)
- [Implementing Handoff in Your App](https://developer.apple.com/documentation/Foundation/implementing-handoff-in-your-app)

### Whole-product and hardware evidence

- [Apple Design careers](https://www.apple.com/careers/us/work-at-apple/teams/design.html) — industrial design, human factors, human interface, multisensory design, communications, materials, manufacturing, packaging, and retail as connected disciplines.
- [Hardware, software, and services collaboration](https://www.apple.com/newsroom/2012/10/29Apple-Announces-Changes-to-Increase-Collaboration-Across-Hardware-Software-Services/) — Apple's stated integrated-product model.
- [Designed by Apple in California](https://www.apple.com/newsroom/2016/11/designed-by-apple-in-california-chronicles-20-years-of-apple-design/) — official account of collaboration, materials, techniques, coherence, simplicity, and product intent.
- [Apple Environment](https://www.apple.com/environment/) — lifecycle, materials, durability, energy, repair, recovery, and environmental responsibility.
- [Longevity, by Design](https://www.apple.com/environment/pdf/Longevity_by_Design-June_2024-Apple.pdf) — durability, repairability, software support, reliability testing, safety, security, privacy, and repair transparency.

### Excellence lens

- [Apple Design Awards](https://developer.apple.com/design/awards/)
- [2025 Apple Design Award winners and finalists](https://developer.apple.com/design/awards/2025/) — archived examples, not the current criteria page.

### Version notes

- The Design Principles page records the current eight-principle set as reintroduced on 2026-06-08. Use it instead of treating the older Clarity / Deference / Depth trio as the current top-level HIG constitution.
- HIG pages have independent change logs and platform resources do not always advance in lockstep. Recheck the exact platform version, component, input, and material guidance before implementation.
- App Review Guidelines describe themselves as a living document. Reverify them before Apple-platform distribution, especially for privacy, AI, payments, health, children, safety, and hardware compatibility.
- Apple platform assets and exact component specifications are intentionally not copied into this reference. Link to the current official source to avoid stale rules and license problems.
