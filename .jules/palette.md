# Palette's Journal - Critical UX/A11y Learnings

## 2025-07-17 - Focus Management in Dialog Components
**Learning:** In floating dialog/chat widget components, keyboard focus must be managed dynamically to avoid breaking the screen reader and keyboard user experience. When the widget is opened, focus should immediately jump to the primary input element so the user can begin typing right away. When the widget is closed, focus must be returned cleanly to the triggering element (the toggle button) so the keyboard navigation state isn't lost. To prevent the focus transition from triggering during the initial mount/render of the component, use a `useRef(true)` guard (e.g., `isFirstRender`).
**Action:** Always implement a `useRef` based guard to check if it's the first render when managing focus dynamically on state transitions, auto-focusing elements when a modal/dialog opens, and restoring focus to the trigger element when it closes.
