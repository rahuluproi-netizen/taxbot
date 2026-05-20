## 2026-05-20 - Focus Restoration and Keyboard Accessibility in Chat Widgets
**Learning:** Implementing focus management (restoring focus to the trigger element when a dialog closes) and providing an 'Escape' key shortcut are critical accessibility patterns for interactive floating UI components like ChatWidgets.
**Action:** Always use a 'wasOpen' ref to track state transitions and ensure focus is returned to the appropriate trigger element when a modal or dialog is closed.
