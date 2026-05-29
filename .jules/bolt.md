## 2025-05-15 - Batching AI Document Indexing
**Learning:** Sequential processing of text chunks for embeddings and vector storage creates an O(N) network bottleneck. Batching Gemini embeddings (up to 100) and Pinecone upserts (single call) reduces latency from O(N) to O(N/100).
**Action:** Always check if AI SDKs support batching for high-throughput operations like document indexing to avoid redundant network overhead.
