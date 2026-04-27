## 2025-05-14 - Batching Document Indexing Pipeline
**Learning:** Sequential processing of document chunks for embeddings and vector storage creates a massive bottleneck due to network roundtrips. Gemini's `batchEmbedContents` and Pinecone's batched `upsert` can reduce latency by ~85% for large documents.
**Action:** Always check if external AI or DB APIs support batching for (N)$ operations.
