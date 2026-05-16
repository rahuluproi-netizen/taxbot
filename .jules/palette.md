## 2024-05-16 - ChatWidget Accessibility & Focus Management
**Learning:** Floating UI widgets (like ChatWidget) need specific keyboard support: an Escape key listener to close, focus management to move focus to the input when opened, and restoration of focus to the trigger button when closed.
**Action:** Always implement `useEffect` hooks for Escape key listeners and focus management in interactive floating components. Use a `isFirstMount` ref to avoid unwanted focus events on initial mount.
