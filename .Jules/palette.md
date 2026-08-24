# Palette UX Journal

## 2025-05-15 - ChatWidget Accessibility and Focus Management
**Learning:** Icon-only buttons and toggleable chat components in React require explicit ARIA labels, semantic role tags for emoji glyphs, and auto-focus management when toggled open for screen reader users and keyboard navigation.
**Action:** Always add descriptive `aria-label` attributes to icon-only action buttons, wrap emojis in `<span role="img" aria-label="...">`, auto-focus input upon opening dynamic panels, and use `onKeyDown` over deprecated `onKeyPress`.
