## 2025-05-15 - Batching Gemini and Pinecone Operations
**Learning:** Optimizing AI document indexing by batching Gemini embeddings (`batchEmbedContents`) and Pinecone upserts reduces network latency and API overhead from $O(N)$ sequential calls to $O(N/BatchSize)$, where $N$ is the number of text chunks.
**Action:** Use batching for any bulk operations involving external AI and vector store APIs.
