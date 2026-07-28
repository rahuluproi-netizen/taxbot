# Palette's Journal - Critical Learnings Only

## 2025-07-28 - Focus Management and First-Render Guards in Toggleable UI Component
**Learning:** In floating/toggled UI components (like a global chat widget), standard focus shifts (`useEffect` triggered by `isOpen`) will incorrectly fire on the initial mount, taking focus away from the main document load. To prevent this, a mutable reference (`isFirstRender = useRef(true)`) must be used as a guard inside the effect. Once toggled, we must manage focus symmetrically by focusing the primary input when open, and returning focus to the trigger button when closed.
**Action:** Always implement a `isFirstRender` ref guard for toggle-driven focus effects, define screen-reader friendly `role="dialog"` with `aria-modal="false"` to allow background interactivity, and return focus to the triggering element on component close.
