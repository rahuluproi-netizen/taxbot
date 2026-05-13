## 2026-05-13 - Focus Management in Floating Widgets
**Learning:** For floating UI components like chat widgets, automatic focus management (focusing the input on open and restoring focus to the trigger on close) is critical for keyboard accessibility. Using a `isFirstMount` ref prevents the restoration logic from firing on the initial render.
**Action:** Apply this pattern to all modal-like or floating components to ensure a seamless experience for screen reader and keyboard-only users.
