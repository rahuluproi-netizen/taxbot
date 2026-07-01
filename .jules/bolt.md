## 2025-05-14 - Node.js Module Mocking for Performance Verification
**Learning:** Manually mocking modules in Node.js via `require.cache` (e.g., for libraries like `pdf-parse` or internal utilities) requires the cache entry to explicitly include `id`, `filename`, and `loaded: true` properties to satisfy the CommonJS module loader's internal validation when the mocked module is later required.
**Action:** Always include `id`, `filename`, and `loaded: true` when manually prepopulating `require.cache` for testing purposes in this environment.
