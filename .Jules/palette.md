## 2025-05-15 - [Aria-expanded on Dialogs]
**Learning:** `aria-expanded` is not a supported attribute for `role="dialog"`. While it seems intuitive to indicate the open state of a dialog container, it triggers accessibility linting warnings (jsx-a11y/role-supports-aria-props). The `aria-expanded` attribute should instead be placed on the triggering element (the button that opens the dialog).

## 2025-05-15 - [Focus Management in Floating Widgets]
**Learning:** For floating UI components like chat widgets that can be toggled, managing focus is critical for keyboard and screen reader users. Simply opening the widget isn't enough; focus should be programmatically moved to the primary interaction element (the input field) and returned to the trigger button upon closing to maintain the user's place in the document flow.
**Action:** Always implement focus traps or focus shifts using `useRef` and `useEffect` with a mount guard (like `isFirstRender`) for toggleable UI.
