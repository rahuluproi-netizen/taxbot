## 2025-05-20 - Gemini and Pinecone Batch Ingestion Bottleneck
**Learning:** Sequential processing of text chunks during PDF RAG indexing creates an $O(N)$ network bottleneck. Batching Gemini `batchEmbedContents` and Pinecone `upsert` in chunks of 100 items reduces network roundtrips by ~99% ($O(N/100)$).
**Action:** Always batch embedding generation and vector store indexing when processing bulk text chunks or documents.
