## 2025-05-18 - Batched RAG Document Indexing

**Learning:** Sequential processing of document chunks during AI embedding generation and vector upserts creates an O(N) network request bottleneck (2 * N network calls for N chunks). Batching both embedding requests and vector store upserts into sub-batches of 100 reduces roundtrips to O(N/100) calls without exceeding SDK/API limits.
**Action:** Always batch embedding requests (`batchEmbedContents`) and vector store upserts (`upsertVectors`) when indexing chunked document data.
