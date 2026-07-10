## 2025-05-14 - [Aria modal and focus management]
**Learning:** For floating or toggled UI components like chat widgets, using `aria-modal="false"` allows users to continue interacting with the background page while still providing a semantic container. Managing focus by automatically focusing the primary input on open and returning focus to the trigger on close is essential for keyboard accessibility.
**Action:** Always implement focus traps or focus management for modal-like components, and use appropriate `aria-modal` values based on desired interaction patterns.
