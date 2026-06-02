## 2026-06-02 - Focus Management in Toggled Widgets
**Learning:** For floating interactive widgets that toggle visibility (like a ChatWidget), managing focus is critical for keyboard and screen reader accessibility. Automatically focusing the input when opened and restoring focus to the trigger when closed ensures a logical and predictable user flow.
**Action:** Always implement a `wasOpen` ref and a `useEffect` hook to handle focus restoration and entry for components that toggle their display state.
