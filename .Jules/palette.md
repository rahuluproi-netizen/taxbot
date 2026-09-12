## 2025-05-18 - Nested ARIA Labels in Icon Buttons
**Learning:** When a button element has an explicit `aria-label`, child icon spans inside the button should use `aria-hidden="true"` rather than having their own `role="img"` or `aria-label` to avoid duplicate or conflicting screen reader announcements.
**Action:** Always mark internal decorative glyphs or icons as `aria-hidden="true"` when the outer interactive element is labeled with `aria-label`.
