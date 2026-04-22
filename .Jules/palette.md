# Palette's Journal - UX/Accessibility Learnings

## 2025-05-14 - Initial Journal Creation
**Learning:** Establishing a journal to track critical UX and accessibility insights in the TaxBot AI project.
**Action:** Use this to document patterns and constraints discovered during development.

## 2025-05-14 - Accessible Floating Chat Widget Patterns
**Learning:** Floating UI widgets (like ChatWidget) need more than just button labels. They require `role="dialog"`, descriptive labels on all interactive elements (including the input itself), and proactive focus management (focusing input on open, returning focus on close) to be truly accessible to screen reader and keyboard users.
**Action:** Implement `role="dialog"`, focus traps or managed focus, and comprehensive ARIA labeling for all future floating or modal-like components.
