## 2026-05-09 - Floating Chat Widget Accessibility
**Learning:** Floating UI widgets (like chat) require three pillars of accessibility:
1. Semantic landmarks: use `role="dialog"` and `aria-label` for the container, and `<h2>` for the title.
2. Focus management: always return focus to the trigger element when closing the widget to maintain the user's navigational context. Use a `isFirstMount` ref to avoid focusing on initial load.
3. Redundancy reduction: avoid `aria-label` on icons inside buttons that already have an `aria-label`, as it causes repetitive screen reader announcements. Use `aria-hidden="true"` on the icon instead.
**Action:** Apply these three pillars to all future interactive floating components (modals, popovers, drawers).
