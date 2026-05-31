## 2025-05-14 - Focus Management in Floating UI
**Learning:** For floating interactive widgets (like a chat toggle), simply toggling visibility isn't enough for screen reader and keyboard users. Focus must be explicitly moved to the new content (input field) and restored to the trigger element upon closing to maintain a logical tab flow.
**Action:** Always use a 'wasOpen' ref pattern with useEffect to detect the transition from open to closed for reliable focus restoration.
