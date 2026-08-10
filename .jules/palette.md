# Palette's Journal - Critical Learnings Only

## 2026-08-10 - Programmatic Focus and Semantic Elements
**Learning:** Programmatic focus management on toggling micro-UX elements (like floating chat widgets) should always be accompanied by a mount-guard (`isFirstRender`) to prevent running focus transitions during the initial page load prior to user interaction. Wrapping emojis in `<span role="img" aria-label="...">` rather than raw text significantly improves assistive screen reader navigation without visual compromises.
**Action:** Always utilize a `isFirstRender` ref to prevent automatic initial mount focus actions on dialog/drawer components, and wrap emojis with correct semantic tags and aria-labels.
