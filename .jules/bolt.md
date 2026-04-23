## 2025-04-23 - Batched AI Operations for RAG
**Learning:** Sequential network calls for embedding generation and vector database upserts create a massive bottleneck during document ingestion. Gemini's `batchEmbedContents` and Pinecone's batch `upsert` can reduce the number of requests by orders of magnitude.
**Action:** Always prefer batching for indexing workflows. Use a batch size of 100 as it aligns well with both Gemini and Pinecone's recommended limits and stays within reasonable memory bounds for small containers.
