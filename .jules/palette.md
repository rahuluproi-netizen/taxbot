## 2025-07-27 - Focus Management in Toggled Widgets
**Learning:** When managing focus changes triggered by a state change (e.g., toggling a floating chat widget), it is critical to prevent focus shifts on initial component mount to avoid degrading page load accessibility. A `useRef(true)` first-render guard successfully isolates these state changes to true user interactions.
**Action:** Always wrap toggle-driven focus effects in a first-render guard ref.
