## 2026-10-19 - Mount-guard auto-focus on toggleable floating components
**Learning:** Programmatic auto-focus on input elements inside toggleable UI components (such as floating chat widgets) should use a mount-guard ref (`isFirstRender`) in `useEffect` so focus is only shifted when explicitly opened by user interaction, avoiding initial page load focus hijack.
**Action:** Always wrap `isOpen`-triggered auto-focus in `useEffect` with a mount-guard ref check.
