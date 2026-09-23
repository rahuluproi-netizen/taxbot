## 2025-05-18 - Batching Vector Upserts in Pinecone

**Learning:** When ingesting documents into Pinecone vector storage during RAG indexing, making individual `upsert` network calls for each text chunk creates a significant $O(N)$ network latency bottleneck. Pinecone natively accepts arrays of vectors and supports up to 100 vectors per payload.

**Action:** Always accumulate generated vector records into an array and perform a single batched `upsertVectors` call (with internal batching of 100 vectors per API payload) to reduce network roundtrips from $N$ to $1$.
