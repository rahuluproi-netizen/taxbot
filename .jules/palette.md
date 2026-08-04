# Palette's Journal - Critical Learnings Only

## 2025-10-24 - ChatWidget Focus and ARIA Enhancements
**Learning:** For floating components like the global chat assistant, proper focus-visible keyboard navigation and ARIA labels are essential for accessibility, and wrapping the state check in a mount-guard ref avoids focus stealing during initial render of the page.
**Action:** Always use descriptive `aria-label`s on icon-only buttons, replace deprecated key press events, and leverage standard Focus Rings alongside ref-guard checks.
