## 2025-05-14 - Accessible Focus Management for Unmounting Elements

**Learning:** When a UI element (like a chat toggle) unmounts to reveal a new interface (like a chat window) and then remounts, standard `useEffect` cleanups or direct state-based focusing might fail if the element isn't yet in the DOM. Using a `prevOpen` ref inside a `useEffect` allows for reliable detection of state transitions (e.g., `isOpen` from `true` to `false`), ensuring focus restoration happens only after the component has re-rendered and the target element is available.

**Action:** Use the `prevOpen` ref pattern for all components that toggle between different interactive states to ensure seamless keyboard navigation and focus restoration.
