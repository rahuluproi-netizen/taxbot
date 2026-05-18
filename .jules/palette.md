## 2026-05-18 - [Focus Restoration in React 19]
**Learning:** When a trigger element (like a toggle button) is removed from the DOM when a widget opens, simply calling `.focus()` on a ref during the `isOpen` toggle is not enough. The element must be back in the DOM.
**Action:** Use a `wasOpen` ref and a `useEffect` hook to detect the transition from open to closed, ensuring the trigger button has re-mounted before attempting to restore focus.
