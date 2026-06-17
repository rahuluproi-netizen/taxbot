## 2025-05-14 - Focus Restoration in Chat Widgets
**Learning:** When an interactive element (like a chat toggle) unmounts to reveal a new UI (the chat window), and that UI is subsequently closed, accessibility best practices require restoring focus to the original trigger element. This ensures keyboard users aren't left in a "focus trap" or reset to the top of the page.
**Action:** Use a combination of `useRef` to track the trigger element and the previous open state, and a `useEffect` to programmatically restore focus when the UI closes.
