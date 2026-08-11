# Interaction Design

## Component Interaction States

Define every state that applies to the control and input context. Component states do not replace the screen/service states in `experience-architecture.md`.

| State | When | Visual Treatment |
|-------|------|------------------|
| **Default** | At rest | Base styling |
| **Hover** | Pointer over (not touch) | Subtle lift, color shift |
| **Focus** | Keyboard/programmatic focus | Visible ring (see below) |
| **Active** | Being pressed | Pressed in, darker |
| **Disabled / unavailable** | Action can't currently run | Perceivable reason and route to eligibility; not opacity alone |
| **Pending** | Input accepted; outcome unconfirmed | Honest progress/status; prevent accidental duplicate action |
| **Error** | Validation or operation failed | Text explanation, scope, and recovery; not color alone |
| **Success** | Source of truth confirms completion | Proportionate confirmation and next step |

**The common miss**: Designing hover without focus, or vice versa. They're different. Keyboard users never see hover states.

## Focus Rings: Do Them Right

Preserve the browser focus indicator unless an authored replacement is already verified. Use `:focus-visible` to enhance keyboard focus without removing fallback focus behavior:

```css
button:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

**Focus ring design**:
- High contrast (3:1 minimum against adjacent colors)
- 2-3px thick
- Offset from element (not inside it)
- Consistent across all interactive elements

## Form Design: The Non-Obvious

**Placeholders aren't labels**—they disappear on input. Use persistent visible labels and associate instructions/errors programmatically. Avoid errors before interaction; validate on blur and submit, give immediate feedback only when it helps correction or availability, and revalidate promptly after correction. Distinguish local-format, server/business-rule, conflict, and submission/system errors; preserve entered data across all of them.

## Loading States

**Optimistic updates:** use only for low-consequence, reversible changes. Show the local result as pending/reconciling and promote it to success only after confirmation; provide rollback or retry on failure. Never use optimism for payments, destructive actions, or operations whose partial completion matters.

Use a skeleton when the arriving content structure is predictable and the preview aids orientation. Use contextual status or progress when duration, stage, cancellation, or object identity matters. Never animate fake progress.

## Modals: Prefer Native Dialog Semantics

Prefer the native `<dialog>` element for Web modal semantics and focus containment. Calling `showModal()` places it in the top layer and makes the rest of the document inert until dismissal:

```javascript
const dialog = document.querySelector('dialog');
dialog.showModal();
```

Choose the initial focus deliberately, provide a visible close/cancel action, restore focus to the invoking context, and protect unsaved work. The nonmodal `open` attribute alone does not provide modal focus containment.

## The Popover API

For tooltips, dropdowns, and non-modal overlays, use native popovers:

```html
<button popovertarget="menu">Open menu</button>
<div id="menu" popover>
  <button>Option 1</button>
  <button>Option 2</button>
</div>
```

**Benefits**: light-dismiss behavior and top-layer stacking without z-index wars. The Popover API does not choose the control's role, name, focus order, or keyboard interaction for you; use the semantic element and applicable ARIA/APG pattern.

## Dropdown & Overlay Positioning

Dropdowns rendered with `position: absolute` inside a container that has `overflow: hidden` or `overflow: auto` can be clipped. Use the top layer or a deliberate positioning/portal strategy instead of escalating arbitrary z-index values.

### CSS Anchor Positioning

The modern solution uses the CSS Anchor Positioning API to tether an overlay to its trigger without JavaScript:

```css
.trigger {
  anchor-name: --menu-trigger;
}

.dropdown {
  position: fixed;
  position-anchor: --menu-trigger;
  position-area: block-end span-inline-end;
  position-try-fallbacks: --flip-above;
  margin-top: 4px;
}

/* Flip above if no room below */
@position-try --flip-above {
  position-area: block-start span-inline-end;
  margin-top: 0;
  margin-bottom: 4px;
}
```

The `@position-try` block supplies an alternate placement near viewport edges. Individual Anchor Positioning features still have uneven browser support, and fixed-position elements can acquire unexpected containing blocks under transformed or contained ancestors. Feature-detect the exact syntax and keep a tested fallback.

### Popover + Anchor Combo

Combining the Popover API with anchor positioning gives you top-layer stacking, light-dismiss, and anchored placement in one pattern; semantics and keyboard behavior remain separate responsibilities:

```html
<button popovertarget="menu" class="trigger">Open</button>
<div id="menu" popover class="dropdown">
  <button>Option 1</button>
  <button>Option 2</button>
</div>
```

The `popover` attribute places the element in the **top layer**, which sits above all other content regardless of z-index or overflow. No portal needed.

### Portal / Teleport Pattern

In component frameworks, render the dropdown at the document root and position it with JavaScript:

- **React**: `createPortal(dropdown, document.body)`
- **Vue**: `<Teleport to="body">`
- **Svelte**: Use a portal library or mount to `document.body`

Calculate position from the trigger's `getBoundingClientRect()`, then apply `position: fixed` with `top` and `left` values. Recalculate on scroll and resize.

### Fixed Positioning Fallback

For browsers without anchor positioning support, `position: fixed` with manual coordinates avoids overflow clipping:

```css
.dropdown {
  position: fixed;
  /* top/left set via JS from trigger's getBoundingClientRect() */
}
```

Check viewport boundaries before rendering. If the dropdown would overflow the bottom edge, flip it above the trigger. If it would overflow the right edge, align it to the trigger's right side instead.

### Anti-Patterns

- **`position: absolute` inside `overflow: hidden`** - The dropdown will be clipped. Use `position: fixed` or the top layer instead.
- **Arbitrary z-index values** like `z-index: 9999` - Use a semantic z-index scale: `dropdown (100) -> sticky (200) -> modal-backdrop (300) -> modal (400) -> toast (500) -> tooltip (600)`.
- **Rendering dropdown markup inline** without an escape hatch from the parent's stacking context. Either use `popover` (top layer), a portal, or `position: fixed`.

## Destructive Actions: Earn Undo or Confirm

Prefer undo for low-consequence operations only when the system genuinely preserves a recoverable state and can confirm undo across offline, failure, and synchronization paths. A transient toast is an entry point to recovery, not the recovery mechanism itself. Use persistent trash/soft-delete, version history, or another durable restore path before permanent deletion. Use an appropriate confirmation for truly irreversible, high-cost, identity/account, or consequential batch actions, and state the scope and consequence explicitly.

## Keyboard Navigation Patterns

### Roving Tabindex

For component groups (tabs, menu items, radio groups), one item is tabbable; arrow keys move within:

```html
<div role="tablist">
  <button role="tab" tabindex="0">Tab 1</button>
  <button role="tab" tabindex="-1">Tab 2</button>
  <button role="tab" tabindex="-1">Tab 3</button>
</div>
```

Arrow keys move `tabindex="0"` between items. Tab moves to the next component entirely.

### Skip Links

Provide skip links (`<a href="#main-content">Skip to main content</a>`) for keyboard users to jump past navigation. Hide off-screen, show on focus.

## Gesture Discoverability

Swipe-to-delete and similar gestures are invisible. Hint at their existence:

- **Partially reveal**: Show delete button peeking from edge
- **Onboarding**: Coach marks on first use
- **Alternative**: Always provide a visible fallback (menu with "Delete")

Don't rely on gestures as the only way to perform actions.

---

**Avoid**: Removing focus indicators without alternatives. Using placeholder text as labels. Touch targets <44x44px. Generic error messages. Custom controls without ARIA/keyboard support.
