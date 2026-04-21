## 2025-05-15 - Batching AI and Vector Store Operations
**Learning:** Sequential processing of document chunks for embedding and vector storage is a major bottleneck due to network latency overhead for each chunk. Batched API calls (e.g., Gemini `batchEmbedContents` and Pinecone's bulk upsert) can reduce document indexing time by an order of magnitude.
**Action:** Always check if external AI or database APIs support batch operations when processing arrays of data. Use a reasonable batch size (e.g., 100) to balance performance and API payload limits.
