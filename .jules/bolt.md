## 2025-05-15 - Batch Processing for Document Indexing
**Learning:** Sequential embedding generation and vector upserts in RAG workflows create significant $O(N)$ latency bottlenecks due to network round-trips. Batching these operations (e.g., using Gemini's `batchEmbedContents` and Pinecone's array upsert) reduces network overhead by orders of magnitude.
**Action:** Always prefer parallelized or batched API calls for bulk data processing, using a reasonable batch size (e.g., 100) to balance performance and API limits.
