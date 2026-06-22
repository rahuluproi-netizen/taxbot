## 2025-05-15 - Focus Management in Floating Widgets

**Learning:** When implementing floating widgets (like a ChatWidget) that toggle visibility, it's critical to manage focus for accessibility. Auto-focusing the primary input upon opening improves speed-to-action, while restoring focus to the trigger element upon closing prevents the focus from being "lost" at the top of the document.

**Action:** Use a `prevOpen` ref in a `useEffect` to detect visibility transitions and apply focus to the appropriate element (input or toggle).
