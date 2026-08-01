# Bolt's Journal - Critical Learnings Only

## 2025-02-18 - Batching PDF Indexing Embeddings and Upserts
**Learning:** Sequential processing of text chunks during PDF uploading creates a significant $O(N)$ network latency bottleneck when interacting with Gemini and Pinecone APIs. Implementing parallel batch processing using Promise.all and standard batch APIs reduces network roundtrips to $O(N/100)$.
**Action:** Always prefer batch APIs (like `batchEmbedContents` and batch `upsert`) with internal concurrent chunking when processing multiple independent payloads.
