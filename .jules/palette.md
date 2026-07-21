# Palette's Journal - Critical Learnings

This journal tracks critical UX and accessibility learnings for the TaxBot application.

## 2025-07-21 - Accessible Focus Trapping and Semantics for Floating Chat Widgets
**Learning:** Floating components like chat widgets are often completely disconnected from standard keyboard tab flows and screen reader accessibility landmarks unless manually managed. Adding focus restoration to the trigger button on close and automatic focusing of the primary text input on open is a highly pleasant UX/a11y pattern that ensures keyboard-only users do not lose their current location in the DOM.
**Action:** Always use a `useRef(true)` guard (e.g. `isFirstRender`) in focus shifting `useEffect` triggers to avoid autofocusing elements on initial component render, and add `aria-modal="false"` to allow continued background interaction on floating panels.
