## 2026-05-10 - Gemini Batch Embedding Constraints
**Learning:** Gemini's `batchEmbedContents` API has a hard limit of 100 requests per call and requires a nested request structure (`{ content: { parts: [{ text }] } }`).
**Action:** Always implement sub-batching logic when processing more than 100 items and ensure the request object strictly follows the required schema to avoid API errors.
