# Palette's Journal - Critical Learnings Only

## 2026-08-11 - Chat Widget Focus and ARIA Enhancements
**Learning:** For dynamic sliding or floating components like ChatWidget, immediate keyboard accessibility (focus redirection with a mount-guard to prevent premature focus prior to interaction) and aria-labels/role=img details make the interface extremely smooth and screen-reader compliant.
**Action:** Always implement `useRef(true)` as a mount-guard when autofocusing dynamically opened fields, and always wrap decorative emoji glyphs/icons in descriptive `<span>` with roles & aria-labels.
