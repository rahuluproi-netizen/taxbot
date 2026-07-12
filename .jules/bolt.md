## 2025-07-12 - Batched AI Operations
**Learning:** Sequential network calls for embeddings and vector upserts scale poorly with document size (O(N)). Gemini's `batchEmbedContents` and Pinecone's batch `upsert` allow for O(N/100) performance, significantly reducing indexing time.
**Action:** Always prefer batch APIs for bulk data processing in RAG pipelines.
