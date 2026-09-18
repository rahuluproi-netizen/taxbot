## 2025-05-18 - Batch Gemini Embeddings and Pinecone Vector Upserts

**Learning:** Sequential $O(N)$ API network roundtrips when indexing PDF text chunks in `uploadKnowledge` created severe network latency bottlenecks during document upload processing.
**Action:** Always batch embedding requests with Gemini's `batchEmbedContents` and vector upserts with Pinecone in chunks up to 100 items to reduce network roundtrips from $N$ to $\lceil N/100 \rceil$.
