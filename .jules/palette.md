## 2025-05-22 - Focus Restoration Pattern for Floating UI
**Learning:** Floating interactive widgets (like ChatWidgets) must restore focus to the triggering element (toggle button) when closed to maintain a logical tab order for keyboard users.
**Action:** Use a `wasOpen` ref and update it at the end of a `useEffect` hook to identify the transition from open to closed, then call `.focus()` on the trigger element.
