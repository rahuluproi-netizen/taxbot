## 2025-05-18 - RAG Indexing Batching Optimization
**Learning:** Sequential calls for text embedding and vector upserting during document upload create severe latency bottlenecks ($2N$ network roundtrips). Gemini supports up to 100 texts per `batchEmbedContents` call and Pinecone v7 accepts array batching via `{ records: [...] }`.
**Action:** Always batch embedding generation and vector upsert calls when indexing documents in RAG workflows to reduce network overhead from $O(N)$ to $O(\lceil N/100 \rceil)$.
