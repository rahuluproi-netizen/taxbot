## 2025-05-18 - Batch processing for Gemini embeddings and Pinecone vector store
**Learning:** Gemini's `batchEmbedContents` requires a specific request structure (`{ requests: [{ content: { parts: [{ text }] } }] }`) and has a max batch limit of 100 items per request, matching Pinecone's recommended upsert batch limit of 100 items. Batching chunk processing reduces RAG indexing network roundtrips by ~98%.
**Action:** Always batch embedding generation and vector store upserts when indexing multi-chunk documents to prevent high latency and network overhead.
