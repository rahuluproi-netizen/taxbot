## 2025-05-15 - ChatWidget Accessibility & Focus Management
**Learning:** For floating interactive components like chat widgets, automatic focus on open and restoration on close is crucial for keyboard navigation. ARIA roles (role="dialog") and labels are necessary for screen reader context.
**Action:** Always implement focus traps or focus management in modals/popups and ensure all icon-only buttons have explicit ARIA labels.
