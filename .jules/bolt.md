## 2025-05-14 - Batched AI Indexing
**Learning:** Sequential network calls for document indexing (embeddings + vector upserts) scale O(N) and create massive bottlenecks. Gemini and Pinecone both support batching with a ~100-item limit.
**Action:** Use `batchEmbedContents` (Gemini) and chunked `upsert` (Pinecone) with concurrent batch processing to reduce roundtrips by >98%.
