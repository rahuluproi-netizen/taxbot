## 2025-05-14 - ChatWidget Accessibility and Interaction

**Learning:** Implementing focus restoration in React for components that unmount (like a modal or a chat window) requires careful tracking of the `isOpen` state transition. Using a `prevOpen` ref in a `useEffect` ensures that when the component is unmounted or hidden, the focus can be reliably returned to the triggering element once it remounts or becomes visible.

**Action:** Always use a `prevOpen` ref pattern to handle focus restoration when a UI overlay (dialog, drawer, etc.) is closed, especially if the trigger element itself might be unmounted while the overlay is active.
