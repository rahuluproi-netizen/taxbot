## 2026-05-28 - Floating Widget Accessibility
**Learning:** Floating interactive widgets (like ChatWidget) in this application lack keyboard navigation (Escape to close) and ARIA landmarks by default, making them difficult for screen reader and keyboard-only users.
**Action:** Always implement `role="dialog"`, descriptive `aria-label` for all icon-only triggers, and a global 'Escape' key listener for any floating UI component.
