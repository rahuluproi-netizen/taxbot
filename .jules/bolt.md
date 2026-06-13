## 2026-06-13 - Batching RAG document indexing
**Learning:** Sequential processing of document chunks for embeddings and vector storage creates a massive bottleneck due to network latency ($O(N)$ roundtrips).
**Action:** Use Gemini's `batchEmbedContents` (up to 100 chunks) and Pinecone's native batch upsert to reduce network roundtrips to $O(N/100)$, significantly improving indexing speed.
