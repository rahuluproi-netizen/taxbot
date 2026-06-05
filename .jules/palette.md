## 2026-06-05 - Focus Restoration for Toggleable UI
**Learning:** For floating UI components that toggle visibility (like a ChatWidget), restoring focus to the trigger element when the window is closed is essential for keyboard navigation and screen reader continuity.
**Action:** Use a `wasOpen` ref and a `useEffect` to detect the transition from open to closed and focus the trigger `ref`.
