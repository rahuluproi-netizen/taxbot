## 2025-05-14 - Mobile-only Component Verification in Playwright
**Learning:** Mobile-only components (using classes like `mobile-only`) might not be visible or interactable in default Playwright headless browser viewports because they are hidden via CSS media queries.
**Action:** Always set a mobile viewport size (e.g., `page.set_viewport_size({"width": 375, "height": 667})`) when testing mobile-specific UI elements.

## 2025-05-14 - ARIA Relationships for Toggles
**Learning:** Using `aria-expanded` and `aria-controls` on a toggle button provides clear semantic feedback to screen readers about the state and target of the interaction, making the interface more accessible.
**Action:** Always include `aria-expanded` and `aria-controls` (linking to the content `id`) when implementing toggleable UI elements.
