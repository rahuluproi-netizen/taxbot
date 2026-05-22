## 2026-05-22 - Improved ChatWidget Accessibility and Focus Management
**Learning:** Floating interactive components like ChatWidgets must implement proper keyboard navigation (Escape key to close) and focus management (focus input on open, restore focus to trigger on close) to be accessible to keyboard and screen reader users.
**Action:** Always implement `role="dialog"`, ARIA labels for icon buttons, and focus management hooks when building or refactoring floating UI components.
