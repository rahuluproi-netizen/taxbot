## 2025-05-14 - Chat Widget Focus Management
**Learning:** Floating interactive widgets (like chat windows) require robust focus management for accessibility. Specifically, the input field should be focused immediately upon opening, and the toggle button should regain focus upon closing to maintain the user's context in the tab order.
**Action:** Always implement a `wasOpen` ref pattern or similar to detect transitions and apply `element.focus()` appropriately when toggling visibility of overlay components.
