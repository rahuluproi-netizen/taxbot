## 2025-05-15 - Batch Document Indexing
**Learning:** Sequential network calls for document chunking ($O(N)$ embeddings and $O(N)$ upserts) create massive latency and hit rate limits quickly. Gemini's `batchEmbedContents` and Pinecone's native batching can reduce network roundtrips by >90% for typical document sizes.
**Action:** Always check if the AI SDK or Vector DB supports batch operations when processing multi-chunk documents. Use `batchEmbedContents` for Gemini and pass arrays to Pinecone's `index.upsert()`.
