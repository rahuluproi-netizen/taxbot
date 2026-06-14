## 2025-05-15 - [Batching RAG Ingestion]
**Learning:** High-throughput document indexing in RAG workflows is severely bottlenecked by sequential network roundtrips to embedding APIs (Gemini) and vector stores (Pinecone). Gemini's `batchEmbedContents` and Pinecone's bulk `upsert` can reduce network overhead by up to 100x.
**Action:** Always prefer batched API calls for bulk data processing; implement internal chunking (e.g., 100 items per batch) to respect provider limits and ensure stability.
