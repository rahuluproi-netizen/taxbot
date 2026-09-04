## 2026-09-04 - Batch Processing Gemini Embeddings & Pinecone Upserts
**Learning:** Sequential processing of text chunks during PDF document indexing creates severe $O(N)$ network latency bottlenecks ($2N$ HTTP roundtrips). Gemini's `batchEmbedContents` and Pinecone's batch `upsert` support up to 100 items per request, allowing vector indexing overhead to be cut by ~96%.
**Action:** Always batch external API network requests when processing collection data like embeddings or vector store operations in backend controllers.
