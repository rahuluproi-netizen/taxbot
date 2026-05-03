## 2026-05-03 - Chat Widget Focus Management
**Learning:** For floating UI widgets that are not full-page modals, implementing automatic focus on open and focus restoration on close significantly improves the keyboard and screen reader experience without needing a complex focus trap.

**Action:** Always implement focus restoration to the triggering element when a transient UI component (like a chat widget or dropdown) is closed.
