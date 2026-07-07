## 2025-07-07 - Batching for RAG
**Learning:** Sequential processing of text chunks for embeddings and vector upserts is a major bottleneck. Gemini's batchEmbedContents and Pinecone's batch upsert significantly reduce network overhead.
**Action:** Always prefer batch operations when indexing multiple documents or chunks.
