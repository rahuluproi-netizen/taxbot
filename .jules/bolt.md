## 2026-07-13 - [Batching Embeddings and Upserts]
**Learning:** Gemini's `batchEmbedContents` has a hard limit of 100 items per call. Pinecone's `upsert` is much more efficient when batching multiple vectors, especially when reducing network roundtrips from O(N) to O(N/100).
**Action:** Always implement batching when processing multiple documents or large chunks to minimize overhead. Initialize AI models at the module level to avoid redundant object instantiation.
