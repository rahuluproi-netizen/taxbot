# Bolt's Journal - Critical Learnings

## 2025-05-18 - Batching Embedding and Vector Store Operations
**Learning:** Sequential per-chunk embedding generation and vector upserts during document upload cause severe O(N) network latency bottlenecks. Batching up to 100 items per API call via `batchEmbedContents` and Pinecone batch upsert reduces network roundtrips by up to 98%.
**Action:** Always batch embedding generation and vector database upserts when processing document chunks in RAG pipelines.
