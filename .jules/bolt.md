## 2026-07-04 - Batching Embeddings and Vector Upserts
**Learning:** Sequential API calls for generating embeddings and upserting vectors to Pinecone create a significant performance bottleneck ((N)$ network roundtrips). Gemini's `batchEmbedContents` (with a 100-item limit) and Pinecone's batch `upsert` can reduce this to (N/100)$ and (1)$ respectively.
**Action:** Always use batch operations for document indexing and other bulk data processing tasks.
