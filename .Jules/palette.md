# Palette's Journal - UX & Accessibility Learnings

## 2025-05-14 - ARIA Expanded Persistence
**Learning:** `aria-expanded` should be placed on elements that persist in the DOM. If a toggle button is removed when open, screen readers may lose the context of the state change.
**Action:** Use `display: none` instead of conditional rendering for toggle buttons that need to maintain ARIA state, or ensure the expanded state is announced via the new container.

## 2025-05-14 - Redundant ARIA Labels
**Learning:** Adding `aria-label` to decorative icons inside buttons that already have an `aria-label` creates redundant announcements for screen reader users.
**Action:** Use `aria-hidden="true"` on decorative or representational emojis/icons inside labeled buttons to avoid verbosity.
