## 2025-05-15 - Improving Focus Management for Floating Widgets
**Learning:** For floating UI components like chat widgets that toggle visibility, it's critical to manage focus for keyboard and screen reader users. Specifically:
1. Auto-focusing the primary interactive element (like an input field) when the widget opens helps streamline the experience.
2. Restoring focus to the trigger element (toggle button) when the widget is closed prevents the focus from being "lost" or resetting to the top of the document.
3. Providing an 'Escape' key listener offers an intuitive and standard way for keyboard users to dismiss the modal-like interface.

**Action:** Always implement a `wasOpen` ref pattern or similar focus restoration logic when building toggleable overlays, and ensure they are marked with appropriate roles like `role="dialog"`.
