## 2025-05-14 - [Aria Label Redundancy]
**Learning:** Adding `aria-label` to emojis or icons nested within buttons that already have a descriptive `aria-label` creates redundant and verbose announcements for screen reader users (e.g., "Open chat button, chat icon image").
**Action:** Use `aria-hidden="true"` on nested icons/emojis when the parent interactive element already provides a clear `aria-label`.

## 2025-05-14 - [Focus Management in Floating UI]
**Learning:** Floating widgets like `ChatWidget` should manage focus explicitly: auto-focusing the primary input on open and restoring focus to the trigger element on close. This ensures a seamless experience for keyboard and screen reader users.
**Action:** Implement `triggerRef` and `inputRef` with `useEffect` to manage focus transitions, using an `isFirstMount` check to avoid stealing focus on initial load.
