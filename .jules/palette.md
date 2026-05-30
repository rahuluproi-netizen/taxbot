## 2025-05-22 - Chat Widget & Form Accessibility
**Learning:** Floating widgets like chat bots often lack proper focus management and keyboard accessibility (Escape key to close, focus restoration). Associating labels with inputs in login/signup forms is a high-impact, low-effort win for screen reader users and touch targets.
**Action:** Always implement focus traps or restoration for modal-like components and ensure all form inputs have associated labels via htmlFor/id.
