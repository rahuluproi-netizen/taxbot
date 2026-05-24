## 2025-05-14 - Batching Document Indexing
**Learning:** Sequential API calls for embeddings and vector upserts during document indexing create $O(N)$ network latency, where $N$ is the number of chunks. This significantly slows down the process for larger documents.
**Action:** Implement batching for Gemini embeddings (`batchEmbedContents`) and Pinecone upserts to reduce overhead to $O(N/BatchSize)$ roundtrips.
