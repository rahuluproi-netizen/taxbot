## 2025-05-18 - Pinecone Vector Upsert Batching
**Learning:** Sequential calls to `index.upsert` within a chunk loop caused O(N) HTTP network roundtrips during document knowledge indexing. Batching vectors in payload arrays of up to 100 items reduces network requests from N to N/100, providing an estimated 50x speedup in indexing throughput.
**Action:** Always batch vector store upserts when processing document chunks or multiple embeddings.
