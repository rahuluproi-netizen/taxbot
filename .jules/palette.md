## 2025-06-12 - Focus restoration for unmounted triggers
**Learning:** When a UI trigger (like a toggle button) is unmounted while its controlled component (like a dialog) is open, simple focus calls in a close handler will fail because the trigger is not yet back in the DOM.
**Action:** Use a `useEffect` hook with a `prevOpen` ref to detect when the component has transitioned from open to closed, ensuring the focus is applied only after the trigger element has been remounted.
