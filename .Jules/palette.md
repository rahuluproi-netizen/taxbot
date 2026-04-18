## 2025-05-15 - ChatWidget Accessibility and Focus Management
**Learning:** For floating UI elements like chat widgets, auto-focusing the input upon opening significantly improves the UX for both mouse and keyboard users. Additionally, replacing static text with animated indicators (like the typing bounce) provides better feedback for async operations.
**Action:** Always implement `useEffect` with `ref.current?.focus()` for modal-like components and use ARIA roles like `dialog` for floating containers.
