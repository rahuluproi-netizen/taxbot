## 2025-05-15 - Batched AI Embedding and Vector Store Upserts
**Learning:** Sequential processing of document chunks causes a huge network performance bottleneck, scaling linearly O(N) with document size. Wrapping individual API calls into batch API invocations for both embedding generation (via Gemini's `batchEmbedContents`) and vector storage (via Pinecone's multi-item upsert) reduces network roundtrips to O(N/100).
**Action:** Always batch high-frequency API invocations like embeddings or database upserts.
