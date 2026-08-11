# Experience Validation and Handoff — Evidence Before Completion

Use this reference before Product and Deep verification. Quick work loads it only when the deliverable is an interactive component/prototype or when a validation claim is requested.

The matrices and stop conditions are **skill synthesis**. Apple-platform and Web standards are linked where they directly govern validation.

## Contents

1. [Choose fidelity from the uncertainty](#1-choose-fidelity-from-the-uncertainty)
2. [Prototype contract](#2-prototype-contract)
3. [Usability evaluation](#3-usability-evaluation)
4. [Accessibility and inclusive-input evidence](#4-accessibility-and-inclusive-input-evidence)
5. [Responsive, state, and resilience validation](#5-responsive-state-and-resilience-validation)
6. [Engineering handoff as an experience contract](#6-engineering-handoff-as-an-experience-contract)
7. [Delivery evidence and stop condition](#7-delivery-evidence-and-stop-condition)
8. [Official validation sources](#8-official-validation-sources)

## 1. Choose fidelity from the uncertainty

Use the smallest fidelity that can answer the riskiest question.

| Question | Minimum useful artifact | Cannot prove |
|---|---|---|
| Is content prioritized and understandable? | Content outline, sketch, wireframe | Real navigation, timing, focus, latency |
| Does the object/IA/navigation model make sense? | Flow map plus linked wireframe | Production semantics and service behavior |
| Can people complete and recover from the task? | Clickable prototype with realistic branches | Keyboard/focus fidelity, responsive reflow, true persistence |
| Does input, timing, motion, focus, async state, or resizing work? | Coded prototype | Production backend reliability unless integrated |
| Does the shipped experience meet its contract? | Production-like build on real devices/contexts | Unrun assistive technologies or unsupported environments |

Fidelity follows the unknown. Do not use polished screens to conceal an untested task model, and do not build production code to answer a question a sketch can settle.

## 2. Prototype contract

Before prototyping, record:

```md
Decision or uncertainty under test:
Representative person/context:
Task and starting state:
Included happy, alternate, failure, and recovery branches:
Realistic content/data:
Fidelity and why it is sufficient:
What the prototype intentionally cannot prove:
Observation or measurement method:
Pass/fail/revise threshold:
```

Prototype the riskiest transition or state, not just the most attractive screen. For temporal or input-driven behavior, prefer a coded prototype because static tools cannot establish focus order, pointer/keyboard parity, latency, interruption, persistence, or responsive reflow.

Do not leave misleading fake controls in a prototype. Either implement the branch, mark it clearly out of scope, or remove it.

## 3. Usability evaluation

### Evaluation hierarchy

1. **Inspection:** design review, consistency review, accessibility inspection.
2. **Cognitive walkthrough:** evaluator attempts a representative task and records discoverability, interpretation, feedback, and recovery risks.
3. **Representative usability test:** relevant people attempt tasks in realistic contexts.
4. **Production evidence:** observed behavior, support signals, funnels, error/recovery telemetry, qualitative feedback.

Label the method honestly. A heuristic or cognitive walkthrough is not participant usability validation. Analytics can show what happened; they rarely explain why.

### Task-based test plan

```md
Research question:
Participant/context assumptions:
Starting state and realistic task prompt:
Successful outcome:
Critical error or unacceptable harm:
Expected recovery path:
Observation points — hesitation, wrong turn, interpretation, workaround:
Measures — completion, critical errors, recovery, confidence, time if relevant:
Follow-up questions:
Known sampling or prototype limitations:
```

Test the primary task and the most likely or consequential failure/recovery path. Include first-time and proficient contexts when their needs conflict.

Prioritize findings by:

```text
severity of outcome × frequency/likelihood × reach × recovery difficulty × confidence
```

Fix critical task failure, harm, data loss, inaccessible paths, and false success before visual polish. Retest the changed risk; a revised mockup alone is not evidence that the issue is resolved.

### Comprehension checks

Ask people to explain in their own words:

- where they are and what they can do;
- what the primary action will change;
- which data or scope is affected;
- whether an operation is pending or complete;
- how to cancel, undo, recover, or resume;
- what an error means and what they would do next.

## 4. Accessibility and inclusive-input evidence

Start from tasks, not a component checklist. Enumerate the meaningful actions and state changes on each screen, then exercise them with the applicable inputs, settings, and assistive technologies.

### Cross-platform evidence matrix

| Area | Evidence to collect |
|---|---|
| Semantics | Programmatic name, role, value/state, grouping, headings/landmarks, status announcements |
| Keyboard/focus | Complete path, logical order, visible and unobscured focus, escape, no traps, expected composite-widget keys |
| Perception | Text/background and nontext contrast, non-color alternatives, captions/transcripts, meaningful alt text |
| Adaptation | Text resizing to 200%; reflow at 320 CSS px equivalent where WCAG 1.4.10 applies; orientation, localization, RTL, virtual keyboard |
| Motion/material | Reduced motion, reduced transparency, increased contrast, flashing avoidance, no motion-only meaning |
| Target/input | Platform-appropriate target size/spacing, pointer/touch/voice/switch/remote/stylus alternatives as relevant |
| Forms/errors | Persistent labels, instructions, error identification in text, programmatic association, preserved data, accessible authentication |

State the standard, version, tool, device/browser/platform, and manual paths exercised before claiming conformance.

**Apple direct:** Apple recommends listing tasks per screen, testing them on each supported device, exercising relevant display/media preferences and assistive technologies, using Accessibility Inspector and automated audits, and manually testing technologies such as VoiceOver because a clean automated audit cannot guarantee accessibility.

For Apple platforms, consider VoiceOver, Voice Control, Switch Control, Full Keyboard Access, Pointer Control, text enlargement, Increased Contrast, Reduced Transparency, Reduce Motion, Differentiate Without Color, captions/audio alternatives, and relevant hardware inputs.

For Web, use current WCAG and native HTML first. Use ARIA only where native semantics are insufficient, and follow the relevant APG interaction pattern. Automated tools are coverage aids, not user-experience proof.

## 5. Responsive, state, and resilience validation

### Context matrix

Exercise only applicable combinations, but name the coverage:

```md
Viewport/window/orientation:
Input and assistive technology:
Appearance/text/motion/contrast settings:
Network — normal / slow / offline / reconnect:
Data — realistic / dense / long / empty / stale / partial / conflicting:
Permission/role:
Interruption — background / resize / refresh / sign-in / device switch:
```

Do not validate responsive work from screenshots alone. Exercise navigation, focus, selection, virtual keyboard, scroll containment, overlays, sticky elements, truncation recovery, and state preservation.

### Operation matrix

For each material operation, verify:

- trigger and immediate acknowledgement;
- disabled/unavailable explanation;
- pending and duplicate-action protection;
- accurate determinate or honest indeterminate progress;
- success confirmation from the source of truth;
- partial result with completed/failed scope;
- offline, timeout, permission, conflict, and server/device failure;
- cancel, retry, undo/rollback, restore, interruption, and resume;
- status announcement and focus destination.

Test degraded paths end-to-end. A surface that looks successful while a sub-operation failed is a failed UX test even when the default-path screenshot is correct.

## 6. Engineering handoff as an experience contract

Handoff is a shared, testable source of truth—not a folder of default-state screenshots.

### Per flow

```md
Outcome and entry/exit conditions:
Flow diagram with alternate/failure/recovery branches:
Object/data ownership and source-of-truth assumptions:
Commitment points and failure semantics:
Analytics/telemetry needed to verify the experience, if applicable:
Unresolved decisions and owner:
```

### Per screen/component

```md
Purpose and semantic/native pattern:
Content hierarchy and realistic variants:
Layout/responsive/input adaptations:
Interaction and state table:
Loading/offline/partial/error/recovery behavior:
Accessibility name/role/value, focus, keyboard, announcements:
UX copy and localization variables:
Motion/material behavior and preferences:
Tokens, assets, component adoption decision, dependencies:
Acceptance tests and intentionally deferred scope:
```

Specify user-visible behavior and evidence without inventing backend APIs. Name backend/service assumptions that affect truthfulness, persistence, latency, ordering, permissions, or recovery and resolve them with engineering.

Keep terminology, tokens, components, copy, states, and acceptance criteria in a maintained source of truth. Distinguish deliberate deferral from missing design.

## 7. Delivery evidence and stop condition

Deliver the smallest applicable evidence package:

1. Mini Experience Map or Deep Product Spine with assumptions.
2. Task/object/IA decision and material flow branches.
3. Screen and state contracts with realistic content.
4. Prototype appropriate to the uncertainty.
5. Accessibility and input evidence with method and limits.
6. Usability evidence or explicitly labeled cognitive walkthrough.
7. Rendered views and exercised flow in relevant contexts.
8. Engineering acceptance contract.
9. Residual risks, unsupported contexts, and maintenance/version assumptions.

### Apple delivery addendum

For Apple-platform distribution, also verify on current supported devices/software; remove placeholders and broken links; ensure metadata and privacy claims match behavior; provide working review access, demo credentials, and backend notes where required; and recheck current App Review Guidelines.

### Stop condition

Stop when the primary and critical recovery tasks can be completed in the real medium; state and failure semantics are truthful; applicable input, accessibility, resize, interruption, and degraded paths have evidence; handoff is testable; and residual risks are explicit.

Do not claim:

- “usable” from a visual review alone;
- “accessible” from color contrast or an automated scan alone;
- “validated” when only the happy path was clicked;
- “complete” when important states are still implicit;
- “responsive” from two static viewport screenshots alone.

## 8. Official validation sources

### Apple

- [Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility)
- [Performing accessibility testing for your app](https://developer.apple.com/documentation/accessibility/performing-accessibility-testing-for-your-app)
- [Accessibility Inspector](https://developer.apple.com/documentation/accessibility/accessibility-inspector)
- [Performing accessibility audits for your app](https://developer.apple.com/documentation/accessibility/performing-accessibility-audits-for-your-app)
- [VoiceOver](https://developer.apple.com/design/human-interface-guidelines/voiceover)
- [Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards)
- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking)
- [App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/)
- [Preparing for App Review](https://developer.apple.com/app-store/review/)

### Web standards

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding WCAG 2.2](https://www.w3.org/WAI/WCAG22/Understanding/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
