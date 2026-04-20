## 2025-05-14 - Chat Widget Accessibility and Immediacy
**Learning:** Floating chat widgets are often not semantic and lack focus management, which hinders screen reader users and keyboard efficiency. Using `role="dialog"` and auto-focusing the input upon opening creates a much more "app-like" and accessible experience.
**Action:** Always ensure floating UI components have appropriate ARIA roles and manage focus transition when state changes (open/close).
