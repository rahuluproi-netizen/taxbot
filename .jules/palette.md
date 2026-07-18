## 2025-07-18 - Ref-Based Focus Management and ARIA State Sync for Toggled Chat Widgets

**Learning:** When toggling persistent overlays like a chat widget, users using screen readers or keyboard navigation expect automatic focus shifting. Specifically, focus must transition seamlessly into the input of the chat widget on open, and revert precisely to the triggering button on close. This is accomplished reliably in React using a useRef flag to bypass initial mount execution and ref-based focus transitions.

**Action:** Always implement a `useFirstRender` or ref-based render guard when executing state-triggered focus shifts to avoid focusing elements on component mount, and use references on target inputs and the trigger button to gracefully direct the focus.
