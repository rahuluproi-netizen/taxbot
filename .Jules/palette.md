## 2026-05-15 - ChatWidget Accessibility
**Learning:** Icon-only buttons and emoji-based UI components require explicit ARIA labels and semantic role wrapping to be accessible to screen readers. Focus management (using refs and useEffect) is crucial for modal-like components to maintain a predictable user flow.
**Action:** Use `aria-label` for all icon-only buttons, wrap emojis in `<span role="img" aria-label="...">`, and implement focus restoration when closing dialogs.
