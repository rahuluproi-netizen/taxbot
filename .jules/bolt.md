## 2025-05-06 - Batched RAG Indexing
**Learning:** Document indexing via Gemini and Pinecone is bottlenecked by network round-trips when processed sequentially. Using `batchEmbedContents` and `index.upsert` with multiple vectors reduces indexing time by ~90-99% for multi-chunk documents.
**Action:** Always look for batching opportunities in network-bound AI/Vector operations and use `fs.promises` for non-blocking file I/O in the backend.
