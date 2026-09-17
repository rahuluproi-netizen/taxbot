## 2025-05-18 - Automatic Focus on Toggleable Floating Widgets

**Learning:** When expanding interactive floating widgets (e.g. AI ChatWidget), shifting keyboard focus automatically to the text input using a mount-guarded `useEffect` dramatically improves accessibility and navigation efficiency.
**Action:** Always wrap initial mount checks in floating toggle components to prevent unwanted auto-focus on initial page render while ensuring focus shifts on active state toggles.
