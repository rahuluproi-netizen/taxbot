## 2025-02-12 - Initial Palette Learnings
**Learning:** Initial check on components and a11y.
**Action:** Let's focus on ChatWidget:
1. Replace deprecated `onKeyPress` with `onKeyDown`.
2. Add explicit type annotations or interfaces where necessary.
3. Manage focus on open/close.
4. Add ARIA attributes to icon-only buttons (`aria-label="Open chat"`, `aria-label="Close chat"`, `aria-label="Send message"`, `aria-modal="false"`).
5. Ensure keyboard navigation works well.
