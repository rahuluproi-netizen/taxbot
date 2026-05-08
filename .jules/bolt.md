## 2025-05-14 - Batch embedding limits and FS refactoring
**Learning:** Google Gemini's `batchEmbedContents` API has a hard limit of 100 requests per call. Also, refactoring `const fs = require('fs')` to `require('fs').promises` at the file top level can break code that expects the synchronous `fs` object or other non-promise methods.
**Action:** Always implement sub-batching for API calls with known limits (e.g., chunks of 100). Use `const fs = require('fs')` and access `fs.promises` explicitly to maintain compatibility with legacy synchronous code in the same file.
