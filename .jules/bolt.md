## 2025-05-18 - Batched Embeddings and Vector Upserts for RAG Knowledge Indexing
**Learning:** Sequential processing of text chunks during PDF document indexing introduced $O(N)$ network latency overhead, making upload operations slow for multi-page documents. Gemini SDK supports `batchEmbedContents` (up to 100 items per request) and Pinecone supports array-based batch upserts.
**Action:** When working with embedding vector stores and RAG document ingestion, always batch embedding generation and vector upserts in chunks of 100 to reduce network roundtrips from $O(N)$ to $O(N/100)$.
