## 2025-05-15 - Batch processing for Document Uploads

**Learning:** Sequential O(N) network requests for embeddings and vector upserts significantly bottleneck document indexing in RAG pipelines. Batching these requests reduces latency from O(N) to O(N/batch_size) and minimizes redundant instantiation overhead.

**Action:** Always use `batchEmbedContents` for multiple embeddings and `index.upsert` with an array for vector stores like Pinecone. Instantiate AI models outside of request handlers to avoid unnecessary setup costs.
