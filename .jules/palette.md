# Palette 🎨 Critical UX/Accessibility Learnings

This journal tracks critical UX and accessibility insights discovered during development.

## 2025-02-18 - Chat Widget Accessibility and Keyboard Navigation
**Learning:** Interactive floating elements like chat widgets can be difficult to access for keyboard and screen reader users if they lack proper semantic structure, `aria-label`s, focus indicator styles, and use deprecated event listeners like `onKeyPress`.
**Action:** Always provide explicit descriptive `aria-label`s on icon-only/character buttons, use `onKeyDown` instead of the deprecated `onKeyPress` for capturing keyboard actions, and ensure clear visual states (hover, focus-visible) are defined using existing classes or inline styles.
