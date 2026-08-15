## 2025-05-18 - Batch Processing for Document Indexing RAG
**Learning:** Document indexing was performing 2N sequential network roundtrips (1 Gemini embedding call + 1 Pinecone upsert call per chunk). Gemini supports `batchEmbedContents` (up to 100 texts) and Pinecone supports array upserting (up to 100 vectors).
**Action:** Always batch embedding generation and vector database upserts when processing chunked documents to reduce network overhead from O(N) to O(N/100).
