## 2025-05-18 - Icon-Only Dialog Controls in Floating Widgets
**Learning:** Icon-only interactive elements in floating widgets (like chat drawers or modal dialogs) lack accessible context for screen readers and visual disabled feedback for empty states.
**Action:** Always wrap child glyphs/emojis with `aria-hidden="true"`, provide explicit `aria-label` attributes on container buttons, mark the widget container with `role="dialog"`, and set `aria-live="polite"` on dynamic state indicators.
