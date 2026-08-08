# Palette's UX Journal

## 2025-08-08 - Programmatic Focus Management in Floating Widgets
**Learning:** When implementing programmatic focus management on dynamic toggleable UI components (such as floating chat widgets), utilizing a mount-guard ref (e.g., `isFirstRender = useRef(true)`) prevents executing focus changes during initial mount prior to user interaction, which could otherwise disrupt the user's reading flow or screen reader context.
**Action:** Always use a mount-guard ref or condition before shifting focus to toggled components, ensuring focus remains stable unless explicitly triggered by a user action.
