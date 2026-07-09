## 2025-05-15 - Improving Accessibility and Focus Management in Floating Chat Widgets
**Learning:** For floating components like chat widgets, adding ARIA roles (`dialog`), labels, and modal state (`aria-modal="false"`) is essential for screen reader users. Additionally, managing focus by automatically focusing the primary input when opened and returning focus to the trigger button when closed significantly improves the keyboard navigation experience.
**Action:** Always implement focus management and proper ARIA attributes for toggleable UI components.
