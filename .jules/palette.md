# Palette's Journal - Critical UX/Accessibility Learnings

This journal tracks critical learnings discovered while improving the UX and accessibility of this application.

## 2025-05-14 - Focus Restoration Pattern
**Learning:** For floating UI components (like ChatWidgets) that toggle visibility, restoring focus to the trigger element when closing is crucial for keyboard/screen reader users. Using a `wasOpen` ref in a `useEffect` correctly identifies the transition from open to closed.
**Action:** Apply this pattern to all toggleable modal-like components to ensure focus isn't lost when the component unmounts or hides.
