## 2026-06-15 - Focus Management for Unmounting Components
**Learning:** In Next.js/React 19, when a component or part of it unmounts (like the ChatWidget window), focus must be manually restored to the trigger element. Using a `prevOpen` ref in a `useEffect` allows tracking the transition from open to closed to safely apply focus to the remounted trigger.
**Action:** Use the `prevOpen` ref pattern for any conditional UI (modals, dropdowns, widgets) to ensure seamless keyboard navigation.
