## 2025-05-14 - Batching RAG Indexing
**Learning:** Sequential network requests for embedding generation and vector store upserts within a loop create a significant bottleneck (O(N) round-trips).
**Action:** Use `Promise.all` to parallelize embedding requests and use vector store batching APIs (e.g., Pinecone's `upsert` with an array) to reduce network overhead to O(1) concurrent batches.
