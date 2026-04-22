## 2025-05-22 - [Batch AI Operations]
**Learning:** Sequential API calls for embeddings and vector upserts create a significant bottleneck in document indexing. Gemini supports `batchEmbedContents` and Pinecone supports batch `upsert`, which reduces network overhead from $O(N)$ to $O(N/BatchSize)$.
**Action:** Always look for batching opportunities when working with AI SDKs and vector databases. Instantiate AI models once outside of request handlers to avoid redundant configuration overhead.
