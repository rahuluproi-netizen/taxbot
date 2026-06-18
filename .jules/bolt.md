## 2026-06-18 - [Batch Document Indexing]
**Learning:** High-throughput document indexing in this architecture was bottlenecked by sequential O(N) network roundtrips to Gemini and Pinecone.
**Action:** Use `batchEmbedContents` (Gemini) and native Pinecone batching (`index.upsert` with an array) to reduce network calls to O(N/batchSize). Always check API limits (e.g., 100 for Gemini) when defining batch sizes.
