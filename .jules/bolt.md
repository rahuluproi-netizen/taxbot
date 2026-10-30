## 2025-05-18 - RAG Document Ingestion Batching
**Learning:** Document ingestion in RAG pipelines previously executed sequential per-chunk API calls to Gemini (for embeddings) and Pinecone (for upserts). Batching requests in 100-item chunks reduces network round-trips from 2N to 2 for N chunks.
**Action:** Always check AI and vector store SDKs for batch processing interfaces (`batchEmbedContents`, batch `upsert`) when handling bulk text chunks or array items.
