## 2025-05-12 - Chat Widget Accessibility and Focus Management
**Learning:** Floating UI components like chat widgets require explicit focus management (focusing the input on open, restoring focus to the trigger on close) and keyboard listeners (Escape key) to meet accessibility standards and provide a smooth UX. Using `role="dialog"` and `aria-label` is also essential for screen reader context.
**Action:** Always implement `useEffect` hooks for focus management and keyboard events when creating or modifying floating UI elements.
