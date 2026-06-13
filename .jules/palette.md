## 2025-05-14 - Focus Restoration and Keyboard Accessibility in ChatWidgets
**Learning:** Floating interactive widgets that unmount their toggle button (or hide it) must implement explicit focus restoration and "Escape" key listeners to maintain keyboard accessibility. Simple conditional rendering without focus management creates a "keyboard trap" where the user loses their place after closing the widget.
**Action:** Always use a `prevOpen` ref with `useEffect` to detect the transition from open to closed, and apply `.focus()` to the remounted trigger element.
