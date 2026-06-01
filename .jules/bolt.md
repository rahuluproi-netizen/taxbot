## 2024-06-01 - Batch AI Indexing
**Learning:** Sequential network calls for AI embeddings and vector store upserts are a major performance bottleneck ($O(N)$). Batching these operations significantly reduces round-trip latency ($O(N/BatchSize)$).
**Action:** Always use Gemini's `batchEmbedContents` and Pinecone's chunked `upsert` for high-throughput document indexing. Ensure Pinecone upserts are further chunked (e.g., in groups of 100) to respect payload size limits.
