## 2026-05-19 - Focus Management and ARIA Overhaul for Floating Chat Widget
**Learning:** Floating UI components (like chat widgets) require explicit focus management and ARIA roles to be usable by keyboard and screen reader users. Simply toggling visibility is insufficient; focus must be trapped or directed to the newly opened content and restored upon closing.
**Action:** Always implement `useEffect` hooks to handle focus transition and keyboard listeners (like Escape) when creating or modifying modal-like floating components.
