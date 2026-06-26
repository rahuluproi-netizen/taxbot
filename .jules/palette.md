## 2025-05-14 - ChatWidget Accessibility and Focus Management
**Learning:** Focus management is crucial for modal-like components that unmount. Restoring focus to the trigger element when a dialog closes ensures a seamless keyboard navigation experience. Additionally, providing ARIA roles and labels to interactive elements and status indicators makes the component perceivable and operable for screen reader users.
**Action:** Use `role="dialog"`, `aria-label`, and proper focus management (focusing input on open, restoring focus on close) for all floating or modal-like UI elements.
