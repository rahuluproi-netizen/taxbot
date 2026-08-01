# Palette's Journal - Critical Learnings Only

## 2025-03-03 - Focus Management & ARIA in Floating Widgets
**Learning:** Floating/toggleable chat widgets need proper keyboard and screen reader accessibility, specifically managing focus upon open/close events to prevent keyboard focus from getting lost in the DOM. Using a `useRef` guard avoids executing toggle/focus shifts during the initial mount.
**Action:** When toggling floaters, save the triggering element ref and return focus to it on close, auto-focus the input on open, and use descriptive `aria-label`/`aria-modal="false"` attributes.
