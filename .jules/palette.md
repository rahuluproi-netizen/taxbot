# Palette's Journal

## 2026-06-29 - Initial ChatWidget Accessibility and UX Improvements
**Learning:** The ChatWidget was missing basic ARIA attributes (roles, labels) and had deprecated event handlers. Focus restoration is critical for unmounting components to maintain keyboard navigation flow.
**Action:** Implement ARIA labels, role="dialog", aria-live for status updates, and focus restoration using the prevOpen ref pattern.
