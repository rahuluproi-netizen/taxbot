## 2025-05-15 - Batch indexing in RAG pipelines

**Learning:** Sequential processing of document chunks for embedding generation and vector store upserts leads to $O(2N)$ network round-trips. In a typical RAG pipeline, this is the primary bottleneck for document ingestion latency. Most modern AI SDKs (like Gemini) and vector databases (like Pinecone) support batching, but often have internal limits (e.g., 100 items per batch).

**Action:** Always prefer `batchEmbedContents` (or equivalent) and batch upserts when processing multiple chunks. Implement simple batching logic (e.g., in chunks of 100) to respect API limits while maintaining high efficiency. Moving model instantiation outside of request handlers or utility functions prevents redundant configuration overhead.
