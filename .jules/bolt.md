## 2026-04-15 - Gemini Batch Embeddings and Vector Store Batch Upsert
**Learning:** Sequential processing of text chunks during PDF document upload creates an O(N) network roundtrip bottleneck across external APIs (Gemini and Pinecone). Batching embeddings via batchEmbedContents and upserting records together drastically reduces latency.
**Action:** Always inspect document ingestion and vector pipelines for sequential per-item API calls and replace them with chunked batch operations.
