# Experience Architecture: From User Task to Interface Structure

Use this reference for Product and Deep work before visual style selection. Read only the sections relevant to the task. Quick visual work does not load it unless the request changes navigation, flow, form behavior, persistent/asynchronous state, or information architecture.

This file is an **operational skill synthesis**. Blocks labeled **Apple direct** summarize linked Apple guidance; the artifacts, matrices, gates, and ordering are this skill's method, not Apple policy.

## Contents

1. [Traceability chain and Mini Experience Map](#1-traceability-chain-and-mini-experience-map)
2. [Task and object model](#2-task-and-object-model)
3. [Information architecture and content hierarchy](#3-information-architecture-and-content-hierarchy)
4. [Navigation and wayfinding](#4-navigation-and-wayfinding)
5. [Flow design](#5-flow-design)
6. [Screen contract and UI hierarchy](#6-screen-contract-and-ui-hierarchy)
7. [Forms and data entry](#7-forms-and-data-entry)
8. [State architecture and feedback](#8-state-architecture-and-feedback)
9. [Search, filter, sort, and selection](#9-search-filter-sort-and-selection)
10. [Content as interface material](#10-content-as-interface-material)
11. [Adaptation and alternate input](#11-adaptation-and-alternate-input)
12. [Blocking gates and official sources](#12-blocking-gates-and-official-sources)

## 1. Traceability chain and Mini Experience Map

Every material UI decision must trace back through this chain:

```text
outcome → scenario → user/domain objects → task → information architecture
→ navigation/flow → screen and state model → copy/feedback → visual expression
→ prototype evidence → acceptance test
```

If a visual or interaction choice cannot trace back to a task, state, comprehension need, platform convention, or intentional brand role, treat it as decoration and justify or remove it.

### Mini Experience Map

Complete the task-relevant fields for Product work. Deep work uses this alongside the Product Spine in `../apple-product-design.md`.

```md
Person, context, and trigger:
Primary job and successful outcome:
Primary object(s), lifecycle, and user vocabulary:
Primary task (entry → decisions → commitment → completion):
Alternate/failure route (cancel, recover, resume):
Success signal and evidence:
Assumptions that still need validation:
```

Do not invent research. Mark assumptions as assumptions and choose evidence that can challenge them.

## 2. Task and object model

### Separate four levels

- **Goal:** the change the person wants in their world.
- **Task:** the meaningful unit of work they recognize.
- **Action:** a step they take to advance the task.
- **Control:** the UI mechanism that invokes an action.

Do not begin with screens or controls. "Add a button" is not a task definition.

### Prioritize tasks

For each relevant task, label:

- frequency: rare / periodic / daily / continuous;
- consequence: low / reversible / costly / irreversible;
- urgency: deferrable / time-sensitive / emergency;
- expertise: first-time / occasional / proficient / expert;
- context: focused / interrupted / mobile / shared / constrained;
- success evidence: what observable state proves completion.

The primary path optimizes the most important task, not the most visible feature. Preserve expert efficiency with shortcuts, batch actions, saved views, defaults, or progressive disclosure rather than forcing first-time guidance forever.

### Define the object model

Inventory the user-facing nouns, not database tables:

| Object question | Design consequence |
|---|---|
| What does the person call it? | Labels, routes, search terms, help, analytics vocabulary |
| What states can it be in? | Status, available actions, filters, permissions, recovery |
| What contains or relates to it? | Hierarchy, navigation, breadcrumbs, split views, detail views |
| Who owns, shares, or can act on it? | Identity, permissions, collaboration, audit/history |
| How is it created, changed, archived, restored, or deleted? | Lifecycle flows and truthful state |

Keep one term for one concept. Do not mirror internal service boundaries in the interface unless people need to understand them.

## 3. Information architecture and content hierarchy

Information architecture is the organization of destinations, objects, actions, status, and supporting content. A sitemap, sidebar, card grid, or route list is only an output of IA, not IA itself.

### Build the inventory

For each destination or screen, record:

```md
Purpose:
Primary object/content:
Primary task:
Secondary tasks:
Status/context that must remain visible:
Entry points:
Exit/return paths:
Permission/role variants:
Realistic long, dense, empty, missing, and stale content:
```

Group by the person's mental model and object/task relationships. Do not group primarily by organizational team, backend service, or feature-launch chronology.

### Establish hierarchy

1. Put the current object, task, or decision first.
2. Keep current location and state legible.
3. Keep frequent and consequential actions findable.
4. Move advanced, rare, or supporting material behind predictable disclosure.
5. Preserve necessary comparison and context; "less on screen" is not automatically simpler.

Use realistic content before declaring the hierarchy stable. Test the longest label, dense data, missing media, localized expansion, user-generated content, permission-limited content, and empty/no-result cases.

## 4. Navigation and wayfinding

Choose navigation from destination relationships, task frequency, context, and platform, not from aesthetic preference.

### Navigation choice matrix

| Need | Likely pattern | Must prove |
|---|---|---|
| Few peer top-level areas | Tab bar / persistent top-level navigation | Tabs are destinations, not actions; current location is clear; each area preserves context |
| Broad flat set of peer areas | Sidebar | Space supports it; labels stay scannable; hierarchy remains shallow |
| Deep hierarchy or list-detail work | Split/list-detail structure | Selection, hierarchy, return path, and compact adaptation remain clear |
| Commands affecting current content | Toolbar or contextual menu | Commands stay near context and do not masquerade as destinations |
| Linear bounded task | Sequential flow / stepper when progress matters | Back, exit, saved work, and commitment point are explicit |
| Large or irregular collection | Search plus browse/filter | Scope, active filters, result ordering, and no-results recovery are visible |
| Expert frequent commands | Keyboard/command surface in addition to visible UI | Discoverability and alternate input remain available |
| Distinct task suspending parent context | Sheet/modal/window as platform-appropriate | Scope is narrow; dismiss/cancel/commit behavior is unambiguous |

**Apple direct:** Apple defines tab bars as top-level navigation rather than actions, sidebars as broad access to peer areas, split views as adjacent hierarchy/content panes, toolbars as current-view commands/navigation/search, and modality as a dedicated mode requiring dismissal. Verify the current platform component guidance before implementation.

### Wayfinding contract

For every multi-destination experience, specify:

- current location and selected object;
- parent/peer relationships;
- return, back, close, and cancel semantics;
- whether navigation preserves unsaved work and scroll/selection state;
- deep-link, refresh, sign-in, and re-entry destination;
- what happens when a destination becomes unavailable;
- compact/resized alternative without losing the top task.

Back returns through navigation history. Close exits a presented task. Cancel abandons a proposed change. Do not use the labels interchangeably.

## 5. Flow design

The happy path is not the whole flow. Model every material flow as:

```text
trigger → entry → intent/decision → action → acknowledgement
→ honest progress → explicit outcome → next step
                            ↘ failure/partial → recovery
```

### Flow record

```md
Trigger and entry context:
Preconditions and permissions:
Shortest useful path:
Decision points and defaults:
Commitment/irreversible point:
Immediate acknowledgement:
Waiting/progress behavior:
Success and partial-success behavior:
Validation/system/offline/conflict failures:
Cancel, undo, retry, rollback, or restore:
Interruption and resume:
Alternate input or expert path:
```

Reduce unnecessary decisions, repeated entry, context switches, and mode changes. Do not reduce steps by hiding cost, scope, permissions, or consequences.

Prefer learn-by-doing and contextual guidance. Add onboarding only when the interface cannot responsibly reveal the necessary model at the moment of use.

## 6. Screen contract and UI hierarchy

Before styling a material screen, write its contract:

```md
Screen purpose and current object:
Primary information/question:
Primary action and eligibility:
Secondary/contextual actions:
Current status, freshness, and selection:
Navigation and escape:
Loading/empty/no-result/error/offline/partial variants:
Accessibility and input behavior:
```

### Compose the UI in this order

1. Current content, object, or decision.
2. Status and context needed to act safely.
3. Primary action or next step.
4. Secondary and contextual actions.
5. Navigation and supporting explanation.
6. Brand expression and earned delight.

One visual focal point does not mean one action exists. It means hierarchy makes the next meaningful action or content unmistakable without suppressing necessary alternatives.

For dense operational UI, preserve scanning, comparison, keyboard efficiency, stable alignment, and selection visibility. Cards are not a substitute for data relationships.

## 7. Forms and data entry

Design a form as task completion, not a stack of fields.

### Form contract

```md
Form outcome:
Known/system-provided data:
Required and optional inputs:
Reason for sensitive or surprising inputs:
Control/input type, autofill, paste, and locale behavior:
Dependencies and conditional fields:
Validation timing and source (client / server / business rule):
Submit acknowledgement, pending state, and duplicate prevention:
Success, partial, conflict, and system-failure result:
Back, save/exit, data preservation, and resume:
```

**Apple direct:** minimize manual entry, retrieve known information when appropriate, offer choices when easier than typing, use secure entry for sensitive data, never prepopulate passwords, use persistent context when placeholders disappear, keep field focus logical, validate at a useful moment, localize numeric formatting, and reduce text entry on watchOS/tvOS.

### Execution rules

- Use a persistent label. A placeholder may show an example but cannot be the only label, instruction, or format requirement.
- State requiredness before submission. Avoid marking every field when only a few are optional; choose one consistent convention.
- Choose the narrowest semantic control that matches the value and platform.
- Support autofill, password managers, paste, drag/drop, scanner/camera, saved data, and appropriate keyboards where relevant.
- Avoid errors before interaction. Validate on blur/step transition and submit; provide immediate feedback only when it helps correction, availability, or format understanding. Revalidate promptly after correction.
- Distinguish local format errors, server rejection, permission failures, conflicts, and submission/system failure. Preserve entered data.
- Do not leave a disabled primary action unexplained. Make eligibility and the path to completion perceivable.
- For multistep forms, define progress, review, back behavior, save/exit, resume, final commitment, and duplicate-submission protection.

## 8. State architecture and feedback

Component states and product/service states are different.

- **Component states:** default, hover where available, focus, pressed, selected, disabled/unavailable, validation, pending.
- **Screen/service states:** first use, loading, empty, no results, unauthorized, forbidden, offline, stale, syncing, delayed/stalled, partial result, conflict, failed, canceled, undoable, restored/resumed.

### Truthful-state contract

For every material operation, define:

| Question | Evidence |
|---|---|
| What is the source of truth? | Local, device, server, hardware, or human confirmation |
| Is an optimistic change allowed? | Low-consequence rationale plus pending/reconciling treatment |
| What acknowledgement is immediate? | Input received, not completion falsely claimed |
| Can duration or stage be known? | Accurate determinate progress; otherwise honest indeterminate status |
| What counts as partial success? | Completed and failed sub-operations both remain visible |
| What can the person do? | Cancel, pause, retry, edit, undo, rollback, restore, or contact support |
| What persists after interruption? | Draft, selection, progress, result, or explicit loss warning |

**Apple direct:** match feedback intensity to significance, prefer in-context status for ordinary information, reserve alerts for critical actionable interruption, keep progress accurate, explain stalls, and use undo/redo where it lets people predictably reverse work.

Never promote pending/reconciling state to confirmed success before the source of truth confirms it. Optimistic UI can reduce perceived latency; it cannot rewrite completion semantics.

Use skeletons only when the content structure is predictable and the skeleton helps orientation. Use contextual progress or status when duration, stage, object, cancellation, or failure matters. Never animate fake progress.

## 9. Search, filter, sort, and selection

Treat retrieval as a contract, not a search icon.

```md
Global or local scope:
Collection and fields searched:
Entry location and discoverability:
Lookup vs exploration intent:
While-typing behavior, latency, and cancellation:
Suggestions, recents, corrections, and history privacy:
Active filters/scopes/tokens and clear-all behavior:
Default sort, alternate sort, and ranking explanation if needed:
Selection model (single/multiple/range; focus vs selection):
Loading, no-result, offline, stale, and error behavior:
```

**Apple direct:** give important search a primary and consistent location; clearly communicate scope; start while typing when feasible; rank relevant results first; use suggestions or recents when helpful; use scope bars/tokens to refine; provide a history-clear path when history is shown.

Keep query text, scope, filters, sort, and result count visible enough to explain the result set. A zero-result state must distinguish "nothing matches," "nothing exists," "not loaded," "offline," and "not permitted."

For batch selection, keep selected count, scope, available actions, destructive consequence, and exit from selection mode clear. Focus, selection, activation, and navigation must not collapse into an ambiguous highlight.

## 10. Content as interface material

Write the words that make the flow operable before polishing layout:

- object and action terminology;
- navigation and destination labels;
- field labels, hints, requiredness, and examples;
- primary, secondary, destructive, cancel, and recovery actions;
- loading, empty, no-results, permission, stale, partial, conflict, and error messages;
- confirmation consequence and undo result;
- accessibility names, descriptions, and status announcements;
- localization notes and variables.

Prefer verb + object labels and outcome language. State what happened, its impact, and the next useful action. Do not use friendliness to blur severity or business intent.

## 11. Adaptation and alternate input

Responsive UX preserves the task and mental model while adapting presentation.

For each relevant platform, window, orientation, input, and assistive context, specify:

```md
Invariant (task, terminology, object, state, consequence, recovery):
Adaptation (navigation, columns, density, toolbar, disclosure, placement):
Input (touch, pointer, keyboard, voice, stylus, remote/focus, eyes/hands):
Text/content (enlargement, reflow, localization, RTL, virtual keyboard):
Interruption (resize, background, device/window switch, permission change):
```

Do not infer input from screen size. Do not turn desktop navigation into a drawer or tables into cards by default. Preserve current location, top-task access, comparison relationships, stable identifiers, focus order, selection, and recovery.

**Apple direct:** assume interruption and multitasking where supported, save and restore context, adapt continuously across resizable windows, remove tertiary content before disrupting the primary task when appropriate, and support the input methods people actually use on the platform.

## 12. Blocking gates and official sources

Do not select final visual expression or call the UX structured when any applicable condition is true:

- The person, trigger, primary task, or success condition is undefined.
- Screens or routes mirror feature teams rather than the user-facing object/task model.
- Current location, return path, or close/cancel semantics are ambiguous.
- Only the happy path exists.
- A form loses work, hides validation cause, or cannot explain why progression is blocked.
- Pending, partial, stale, offline, denied, conflict, and failed states can look like success.
- Search scope, active filters, selection, or result provenance is unclear.
- Compact adaptation removes the top task, wayfinding, or essential data relationships.
- Copy, accessibility behavior, or realistic content is deferred until after layout approval.

### Apple official sources

- [Tab bars](https://developer.apple.com/design/human-interface-guidelines/tab-bars)
- [Sidebars](https://developer.apple.com/design/human-interface-guidelines/sidebars)
- [Split views](https://developer.apple.com/design/human-interface-guidelines/split-views)
- [Toolbars](https://developer.apple.com/design/human-interface-guidelines/toolbars)
- [Menus](https://developer.apple.com/design/human-interface-guidelines/menus)
- [Lists and tables](https://developer.apple.com/design/human-interface-guidelines/lists-and-tables)
- [Focus and selection](https://developer.apple.com/design/human-interface-guidelines/focus-and-selection)
- [Modality](https://developer.apple.com/design/human-interface-guidelines/modality)
- [Entering data](https://developer.apple.com/design/human-interface-guidelines/entering-data)
- [Text fields](https://developer.apple.com/design/human-interface-guidelines/text-fields)
- [Pickers](https://developer.apple.com/design/human-interface-guidelines/pickers)
- [Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback)
- [Progress indicators](https://developer.apple.com/design/human-interface-guidelines/progress-indicators)
- [Undo and redo](https://developer.apple.com/design/human-interface-guidelines/undo-and-redo)
- [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts)
- [Searching](https://developer.apple.com/design/human-interface-guidelines/searching)
- [Search fields](https://developer.apple.com/design/human-interface-guidelines/search-fields)
- [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding)
- [Privacy](https://developer.apple.com/design/human-interface-guidelines/privacy)
- [Multitasking](https://developer.apple.com/design/human-interface-guidelines/multitasking)
- [Layout](https://developer.apple.com/design/human-interface-guidelines/layout)
- [Windows](https://developer.apple.com/design/human-interface-guidelines/windows)

For Web implementation and accessibility, Apple guidance does not replace semantic HTML, browser conventions, [WCAG 2.2](https://www.w3.org/TR/WCAG22/), or the [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/).
