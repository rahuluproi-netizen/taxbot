## 2025-05-18 - RAG Document Chunk Embedding & Vector Upsert Batching
**Learning:** Gemini's `text-embedding-004` model supports `batchEmbedContents` (up to 100 items/batch) and Pinecone v7 `index.upsert` expects `{ records: [...] }`. Sequential chunk-by-chunk processing created an O(N) network bottleneck during document uploads.
**Action:** Use `generateBatchEmbeddings` and `upsertVectors` for all multi-chunk RAG operations to batch requests into 100-item chunks, reducing API roundtrips by >98%.
