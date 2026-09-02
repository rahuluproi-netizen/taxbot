## 2026-09-02 - Batched Embeddings and Upserts for Document Indexing
**Learning:** Document indexing in `uploadKnowledge` previously generated embeddings and upserted vectors sequentially one by one, resulting in 2N sequential network calls. Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` both support up to 100 items per API call.
**Action:** When working with embedding generation or vector store indexing, always use batched helper functions (`generateBatchEmbeddings` and `upsertVectors`) with 100-item chunking to reduce network overhead from O(N) to O(N/100).
