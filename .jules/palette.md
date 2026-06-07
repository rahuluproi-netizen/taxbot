## 2025-06-07 - Focus Restoration and Keyboard Navigation
**Learning:** For floating interactive components like a chat widget, simply closing the window is insufficient for a good UX. Accessibility requires restoring focus to the trigger element when the window is closed via keyboard (e.g., Escape key) to prevent the focus from getting lost at the top of the document.
**Action:** Always implement a `wasOpen` ref and a `useEffect` hook to track state transitions and restore focus to the originating button when a modal or dialog is dismissed.
