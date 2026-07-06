## 2025-05-22 - Focus Management for Toggleable Widgets
**Learning:** For floating components like `ChatWidget` that toggle visibility, it's critical for accessibility to manage focus: focus the primary interactive element (like an input) when opened, and return focus to the triggering button when closed. Also, `aria-expanded` is technically redundant if the triggering button unmounts when the component is active.
**Action:** Always implement `useRef` based focus restoration for toggleable UI elements and ensure `aria-modal="false"` for non-blocking dialogs to permit background interaction.
