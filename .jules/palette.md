## 2026-06-18 - Accessibility and Interaction Polish in ChatWidget
**Learning:** Interactive widgets that unmount and remount (like a chat toggle/window) require explicit focus management using refs and useEffect to ensure keyboard navigation continuity. Additionally, providing ARIA labels and aria-live regions significantly improves the experience for screen reader users without altering the visual design.
**Action:** Always implement focus restoration when a component's primary trigger element is unmounted and then remounted. Use aria-live for async status indicators.
