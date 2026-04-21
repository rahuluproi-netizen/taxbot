## 2024-04-21 - [ChatWidget Accessibility & Auto-focus]
**Learning:** Floating UI widgets like chat assistants significantly benefit from auto-focusing the primary input field upon opening. This reduces the interaction cost for all users and provides a clear entry point for keyboard/screen reader users.
**Action:** Always implement auto-focus (via `useRef` and `useEffect`) and appropriate ARIA roles (`role="dialog"`, `aria-label`) when building interactive floating components.
