## 2025-02-18 - Programmatic Focus Management Guard
**Learning:** Adding programmatic focus management to dynamic toggleable components (such as a floating chat widget) can trigger unintended focus execution on initial render unless a mount guard ref (e.g., `isFirstRender = useRef(true)`) is utilized.
**Action:** Always use a mount-guard ref when introducing `useEffect` focus management on toggleable UI components.
