## 2026-05-14 - Batched AI Indexing Optimization
**Learning:** Sequential (N)$ network requests for AI embeddings and vector database upserts create a massive performance bottleneck during document indexing. Gemini's `batchEmbedContents` and Pinecone's batched `upsert` can reduce latency by orders of magnitude (e.g., ~34x in simulation).
**Action:** Always prefer batched operations for bulk data processing involving external AI/Vector APIs. Hoist `BATCH_SIZE` constants for maintainability and use `fs.promises` for non-blocking I/O in the indexing loop.
