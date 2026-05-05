## 2026-05-05 - Chat Accessibility & Focus Management
**Learning:** For floating UI components like chat widgets, automatic focus management is crucial. Ensuring the input focuses on open and the trigger refocuses on close maintains a seamless keyboard navigation loop.
**Action:** Use a combination of `useRef`, `useEffect`, and a `isFirstMount` guard to manage focus transitions without triggering side effects on initial mount.
