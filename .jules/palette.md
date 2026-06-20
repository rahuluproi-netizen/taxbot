## 2024-06-20 - Focus Restoration for Unmounting Components
**Learning:** In Next.js/React, when a component unmounts (like a chat toggle being replaced by a window), restoring focus upon remount requires tracking the previous state with a ref to trigger focus in a useEffect hook.
**Action:** Use a `prevOpen` ref and `toggleRef` to ensure focus is returned to the trigger element for a seamless keyboard navigation experience.
