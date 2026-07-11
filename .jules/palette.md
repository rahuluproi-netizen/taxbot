## 2025-05-14 - Accessible Toggleable UI Components
**Learning:** For toggleable UI components like chat widgets, placing `aria-expanded` and `aria-controls` on the triggering button (rather than the dialog container) is the standard-compliant way to announce state changes to screen readers.
**Action:** Always ensure the triggering element of any toggleable UI has the correct ARIA relationship attributes and manage focus by automatically focusing the primary input when opened.
