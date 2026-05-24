## 2026-05-24 - Focus Management for Floating Widgets
**Learning:** For floating UI components that toggle visibility (like a chat widget), restoring focus to the trigger element on close and auto-focusing the primary input on open significantly improves keyboard accessibility.
**Action:** Use a combination of refs (e.g., `inputRef`, `toggleRef`) and a `wasOpen` state tracking ref in a `useEffect` hook to manage focus transitions when the widget's open/closed state changes.
