## 2025-05-15 - Improving ChatWidget and BottomNav Accessibility

**Learning:** Interactive elements that unmount (like the ChatWidget toggle) require careful focus management using refs and effect hooks to ensure focus is restored correctly when they remount. Emojis and icons within buttons or links should be marked with aria-hidden="true" if the parent element already has a descriptive label or text to avoid redundant screen reader announcements.

**Action:** Always use a prevOpen ref to track state transitions for unmounting components to handle focus restoration, and audit interactive components for redundant emoji announcements.
