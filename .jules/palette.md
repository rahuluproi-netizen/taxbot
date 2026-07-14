## 2025-05-14 - Focus management in chat widgets
**Learning:** Automatically focusing the input when a chat widget opens and returning focus to the toggle when it closes significantly improves keyboard accessibility and UX. Using a 'isFirstRender' ref prevents focus logic from firing on the initial component mount.
**Action:** Always implement bidirectional focus management for toggleable UI components like chat widgets or modals.
