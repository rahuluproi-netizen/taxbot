## 2025-05-18 - Gemini and Pinecone Batch Optimization
**Learning:** Sequential embedding generation and vector upserts during document ingestion cause O(N) network round-trips. Gemini's `batchEmbedContents` and Pinecone's `index.upsert({ records })` enable single-roundtrip batching up to 100 items per call. Note that in `@pinecone-database/pinecone` v7, `index.upsert` requires `{ records: [...] }` rather than a direct array.
**Action:** Use `generateBatchEmbeddings` and `upsertVectors` for batch document ingestion to optimize throughput and reduce latency.
