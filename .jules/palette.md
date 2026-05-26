## 2025-05-15 - Improving Floating Widget Accessibility
**Learning:** Floating interactive widgets like chat bots need explicit ARIA roles (`role="dialog"`), descriptive labels for icon-only buttons, and strict focus management (trapping or restoring focus) to be accessible to keyboard and screen reader users.
**Action:** Always implement `aria-label` on toggle buttons, autofocus the primary input on open, restore focus to the trigger on close, and add an 'Escape' key listener for easy dismissal.
