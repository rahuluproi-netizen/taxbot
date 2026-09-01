## 2026-09-01 - Gemini & Pinecone Batch Processing
**Learning:** Gemini's `batchEmbedContents` accepts up to 100 requests formatted as `{ content: { parts: [{ text }] } }`, and Pinecone `upsert` handles vector arrays up to 100 items efficiently. Batching reduces API network roundtrips from O(N) to O(N/100) during document indexing.
**Action:** Always wrap document chunk processing into chunked batch arrays of size 100 and execute via `Promise.all` for multi-batch payloads.
