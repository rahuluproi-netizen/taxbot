## 2025-05-14 - Chat Widget Accessibility and Focus Management
**Learning:** Floating UI widgets (like ChatWidget) should implement `role="dialog"`, include descriptive `aria-label` attributes for icon-only buttons and inputs, and manage focus automatically (e.g., via `useEffect` and `ref.focus()`) when opened.
**Action:** Always ensure floating dialogs have appropriate ARIA roles and that the primary interaction element (like an input field) is focused upon opening to improve keyboard navigation efficiency.
