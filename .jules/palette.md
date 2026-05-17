## 2026-05-17 - Accessible Focus Management for Floating Widgets
**Learning:** Floating UI components (like the ChatWidget) often trap keyboard users or lose context when toggled. Explicitly managing focus—focusing the primary input on open and restoring focus to the trigger on close—is essential for a seamless keyboard experience.
**Action:** Use `useRef` for both the toggle button and the first focusable element in a dialog. Manage focus transitions and global keyboard listeners (like 'Escape') within `useEffect` hooks.
