## 2025-03-01 - Floating Widget Focus Management & A11y

**Learning:** When implementing toggled interactive widgets like floating chats, keyboard-only users suffer unless focus is actively routed into the newly revealed view (e.g. focusing the query input on open) and restored gracefully back to the toggle element on close. Additionally, replacing deprecated properties like `onKeyPress` with `onKeyDown` and ensuring icon-only triggers have robust `aria-label` attributes ensures high compliance with screen reader and modern standard accessibility rules.

**Action:** Always wrap toggle states with a `useRef` to target the inputs and triggers for active programmatical focus shifting, and use standard CSS `.focus-visible` or clear outlines for custom keyboard focus rings.
