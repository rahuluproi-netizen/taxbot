## 2026-07-13 - [ChatWidget Focus Management]
**Learning:** Automatically focusing the first interactive element when a dialog opens and returning focus to the trigger when it closes is a critical UX pattern for keyboard accessibility.
**Action:** Use `useRef` and `useEffect` with a first-render guard to manage focus transitions in toggleable UI components.
