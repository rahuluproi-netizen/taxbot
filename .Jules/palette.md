## 2026-10-03 - Accessible Floating Action & Chat Buttons
**Learning:** Floating widget toggle buttons and icon-only send actions require explicit `aria-label` attributes and decorative icon wrappers with `aria-hidden="true"` to prevent screen readers from reading out raw unicode symbols.
**Action:** Always pair icon-only controls in dynamic widgets with visual disabled state feedback and screen reader live regions (`aria-live="polite"`).
