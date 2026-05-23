## 2025-05-22 - ChatWidget Accessibility & Focus Management
**Learning:** For floating UI components like ChatWidget, implementing focus management (focusing input on open, restoring focus on close) and an 'Escape' key listener significantly improves keyboard navigation and meets user expectations for interactive widgets.
**Action:** Always implement `inputRef.focus()` on open and restore focus to the trigger element on close using a `wasOpen` ref pattern in similar floating components.
