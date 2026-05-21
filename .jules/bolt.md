## 2025-05-14 - Batching AI Document Indexing
**Learning:** Processing document chunks sequentially for embedding generation and vector upsert is a major performance bottleneck, resulting in $O(N)$ sequential network requests. This leads to high latency and inefficient use of API throughput.
**Action:** Always implement batching logic for AI operations. Use Gemini's `batchEmbedContents` and Pinecone's batch `upsert` with an optimal batch size (e.g., 100) to reduce network roundtrips to $O(N/BatchSize)$.
