## 2025-05-22 - Accessibility and Focus Management for Floating Widgets
**Learning:** Floating UI components like chat widgets require explicit focus management and ARIA roles to be accessible. Users expect the input to be focused when opening a chat, and screen readers need to know the container's purpose (e.g., `role="dialog"`).
**Action:** Always implement `useEffect` for focus management when a widget opens and provide descriptive `aria-label` attributes for icon-only buttons.
