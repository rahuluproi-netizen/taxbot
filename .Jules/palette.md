# Palette Journal - UX & Accessibility Learnings

## 2025-05-18 - Mount-guard Ref for Floating Toggleable Focus Management
**Learning:** In toggleable UI components like `ChatWidget`, executing `focus()` directly inside a `useEffect([isOpen])` without guarding against initial mount forces unwanted focus displacement when the page initially loads. Using a mount-guard ref (`isFirstRender = useRef(true)`) ensures focus is only shifted when the user explicitly triggers component toggling.
**Action:** Always wrap `useEffect` focus management in toggleable floating widgets with `if (isFirstRender.current) { isFirstRender.current = false; return; }` to prevent initial mount focus shifts.
