## 2026-05-25 - Chat Widget Accessibility and Focus Management
**Learning:** Floating interactive widgets (like a chat assistant) require explicit focus management (auto-focus on open, restore on close) and keyboard escape listeners to be truly accessible to keyboard and screen reader users.
**Action:** Always implement focus preservation and Escape key support for any component that toggles visibility or overlays content.
