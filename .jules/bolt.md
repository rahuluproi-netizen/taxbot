## 2025-05-18 - Batch Embedding & Pinecone Vector Upserts
**Learning:** In backend RAG pipelines, chunked document indexing can bottleneck on sequential network API calls to embedding models (Gemini) and vector databases (Pinecone). Combining Gemini `batchEmbedContents` (up to 100 texts/req) and Pinecone bulk `upsert` (100 vectors/req) reduces network roundtrips from O(N) to O(N/100).
**Action:** When working with embedding generation or vector database operations on collections of items, always batch inputs up to API chunk limits instead of looping over single item operations.
