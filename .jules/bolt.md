## 2025-03-05 - Batching Gemini Embeddings and Pinecone Upserts
**Learning:** Sequential processing of document chunks for embeddings and database upserts introduces significant network overhead (O(N) latency). Utilizing Gemini's `batchEmbedContents` and Pinecone's bulk upsert capability with parallel batching reduces network roundtrips to O(N/100), dramatically speeding up document ingestion.
**Action:** Always batch API-driven operations like embeddings generation and vector database upserts when processing multiple items.
