# Palette's Journal - Critical Learnings Only

## 2025-07-23 - ChatWidget Dialog UX and Accessibility
**Learning:** Adding a programmatically floating chat widget requires explicit control over keyboard focus. If we don't manage focus, opening the chat does not let screen reader users or keyboard-only users interact with the text input smoothly without tabbing through the whole page. Using `aria-modal="false"` allows the main page content to remain interactive, and managing focus on toggle events (while ignoring the first component mount with a render guard) provides a seamless accessibility experience.
**Action:** Use refs for focus control paired with an active toggle state, guarding the initial mount with `isFirstRender` to avoid focus-stealing on initial page load. Always accompany these with standard WAI-ARIA `aria-label`, `role="dialog"`, and `onKeyDown` elements.
