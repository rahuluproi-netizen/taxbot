## 2025-05-14 - Improve ChatWidget accessibility and keyboard support
**Learning:** Floating interactive widgets must implement an 'Escape' key listener and focus restoration logic to be fully accessible. Focus should return to the trigger element when the widget is closed. Additionally, decorative icons should be hidden from screen readers using `aria-hidden="true"`.
**Action:** Always implement `useEffect` hooks for global 'Escape' key listeners and use a `wasOpen` ref pattern for focus restoration in similar UI components.
