## 2025-05-15 - Accessible Chat Widget Patterns
**Learning:** For floating chat widgets, providing a `role="dialog"` with `aria-modal="false"` allows users to interact with the main page while the chat is open, while still providing necessary semantic context. Auto-focusing the input field upon opening is a critical micro-UX that reduces friction for the user.
**Action:** Always implement `role="dialog"`, appropriate `aria-label`s for icon-only buttons, and focus management when creating or updating toggleable UI components.
