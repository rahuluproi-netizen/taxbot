## 2025-05-14 - [Accessibility] Focus Management in Toggleable UI
**Learning:** When implementing floating or toggled UI components like chat widgets, it's critical to manage focus in both directions: automatically focusing the primary input/action when the component opens, and returning focus to the triggering element when it closes. This ensures a seamless experience for keyboard and screen reader users.
**Action:** Use `useRef` to track both the trigger and the internal focus target, and `useEffect` (with a guard for initial render) to manage the focus shifts during state transitions.
