## 2026-08-22 - Chat Widget Accessibility & Interactive Feedback

**Learning:** Interactive floating components (like chat widgets) using emoji/symbol icons need explicit `aria-label`s on buttons, disabled states during empty/pending states, and `onKeyDown` listeners instead of deprecated `onKeyPress`.
**Action:** Always wrap floating widget icons in ARIA labels and ensure send/submit buttons reflect disabled state visually (`opacity`, `cursor: not-allowed`) and functionally.
