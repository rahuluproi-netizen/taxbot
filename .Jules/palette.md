## 2025-05-18 - Screen Reader & Disabled Feedback in Floating Floating Widgets
**Learning:** In floating icon-only interactive components (like ChatWidget), providing `aria-label` on buttons while hiding child icon glyphs with `aria-hidden="true"` prevents duplicate screen reader announcements, and disabling empty send states improves form interaction feedback.
**Action:** Always wrap emoji/symbol glyphs in `<span aria-hidden="true">` inside labeled icon-only buttons and set explicit disabled visual styles (`opacity: 0.6`, `cursor: not-allowed`) when inputs are invalid or pending.
