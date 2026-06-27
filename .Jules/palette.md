## 2025-05-14 - Focus Restoration for Unmounting Elements
**Learning:** When a UI component unmounts its trigger element (like a chat toggle button) while active, standard focus management fails. Using a `prevOpen` ref in combination with a `useEffect` hook allows for reliably detecting the transition back to the closed state, ensuring focus is restored to the remounted trigger element.
**Action:** Use the `prevOpen` ref pattern for all toggleable components that swap visibility of the trigger and content.
