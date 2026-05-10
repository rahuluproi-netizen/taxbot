## 2026-05-10 - ChatWidget Accessibility & Focus Management
**Learning:** Floating UI components like chat widgets require explicit focus management (auto-focus on open, restore on close) and keyboard listeners (Escape key) to meet accessibility standards and provide a smooth user experience for keyboard users.
**Action:** Always implement `useRef` for focus targets and a `keydown` listener for the 'Escape' key when creating or improving dialog-like floating widgets.
