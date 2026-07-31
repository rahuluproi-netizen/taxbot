## 2026-07-31 - Floating Chat Widget Accessibility and Focus-Trapping
**Learning:** Floating/toggled UI components (like a persistent chat widget) must behave predictably for keyboard and screen reader users. Simply rendering or hiding the panel is not enough:
1. **Focus Management:** Focus should be shifted to the primary input element when the dialog opens so users can immediately interact.
2. **Focus Retention:** Focus must return to the triggering element (the toggle button) upon closure to preserve logical keyboard tab flow.
3. **Guard Mounts:** Shifting focus on toggle state change must be guarded (e.g. via an `isFirstRender` ref) to prevent focus theft during initial application mount.
4. **Interactive Roles:** Adding `role="dialog"`, descriptive labels (`aria-label`), and setting `aria-modal="false"` allows external layout elements to remain accessible while satisfying screen-reader expectations.

**Action:** When creating any toggleable or floating drawer/modal UI component, always implement matching refs on both the trigger and content containers, and utilize a first-render guarded `useEffect` to safely handle bidirectional focus transition.
