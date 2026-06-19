## 2025-05-14 - Batch Processing for RAG Ingestion
**Learning:** Sequential network calls for embedding generation and vector upserts create a massive $O(N)$ bottleneck in document ingestion. Using Gemini's `batchEmbedContents` (max 100) and Pinecone's native batch upsert reduces network roundtrips by ~98% for large documents.
**Action:** Always prefer batch APIs for bulk operations like document indexing or multi-vector updates.
