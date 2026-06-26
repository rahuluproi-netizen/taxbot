# Bolt's Performance Journal

This journal tracks critical performance-related learnings for the TaxBot AI project.

## 2025-05-15 - Batch Processing for Document Indexing
**Learning:** Document indexing was performing O(N) sequential network calls for embeddings and vector upserts. Gemini and Pinecone both support batch operations which can reduce network roundtrips to O(N/batchSize).
**Action:** Implement `batchEmbedContents` for Gemini and batch `upsert` for Pinecone to optimize the indexing pipeline.
