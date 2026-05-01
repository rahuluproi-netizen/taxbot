## 2026-05-01 - Parallelizing and Batching AI Operations
**Learning:** Sequential O(N) operations for AI embeddings and vector upserts create significant latency. Gemini and Pinecone both support batch operations which can reduce indexing time by up to 90% for large documents.
**Action:** Always look for batching opportunities in AI-related workflows. Use `batchEmbedContents` for Gemini and array-based `upsert` for Pinecone.
