## 2026-07-19 - Batched Gemini Embeddings and Pinecone Upserts
**Learning:** Sequential processing of text chunks for embeddings and upserts results in O(N) network roundtrips, causing severe performance degradation during document uploads. Batching Gemini's `batchEmbedContents` and Pinecone's upsert API with a partition limit of 100 concurrently reduces network roundtrips to O(N/100).
**Action:** Always batch embedding and vector store upsert operations in chunks of 100, and execute them concurrently via `Promise.all` to minimize processing latency.
