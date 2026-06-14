## 2025-05-14 - Focus Management for Floating Widgets
**Learning:** For floating UI components (like chat widgets) that unmount or hide, managing focus is critical for accessibility. It is important to focus the primary interaction element (like an input) when the widget opens, and restore focus to the trigger button when it closes to maintain a logical tab order.
**Action:** Use a `prevOpen` ref in a `useEffect` hook to detect the transition from open to closed and restore focus to the trigger element.
