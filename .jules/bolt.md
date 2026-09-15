## 2025-05-18 - Batch Gemini Embeddings and Pinecone Upserts
**Learning:** Sequential processing of RAG document chunks in `aiController` creates an N-fold multiplier on API latency (2 roundtrips per chunk).
**Action:** Always batch chunk embeddings via `batchEmbedContents` and vector storage via `upsertVectors` in chunks of up to 100 to reduce sequential API network overhead.
