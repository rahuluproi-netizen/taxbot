# Palette's Journal - Critical UX/Accessibility Learnings

## 2025-07-29 - ChatWidget accessibility & focus management
**Learning:** To make ChatWidget fully accessible, icon-only buttons need `aria-label` attributes (such as 'Open chat' or 'Close chat'). Additionally, focus should be automatically shifted to the primary text input when the chat widget opens, and keyboard navigation should be smooth and semantic (e.g. using `onKeyDown` instead of the deprecated `onKeyPress` to capture Enter keys).
**Action:** Always include appropriate `aria-label`s on icon-only buttons, use `onKeyDown` instead of `onKeyPress`, and add automated focus management (focus input on open, and handle key down correctly).
