## 2025-03-09 - Chat Widget Focus Management & A11y
**Learning:** Icon-only buttons (like toggle/close/send in floating widgets) require explicit, descriptive `aria-label` attributes for screen readers. Furthermore, interactive popups/widgets must manage focus gracefully by targeting the primary input when opened and returning focus to the triggering element when closed to keep keyboard navigation seamless.
**Action:** Implemented `aria-label`, automatic focus shift on open/close using refs, and replaced deprecated key press handlers with `onKeyDown` in `ChatWidget.tsx`.
