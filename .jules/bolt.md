## 2026-06-11 - Document Indexing Batching
**Learning:** Sequential calls to embedding and vector store APIs during document indexing create a significant performance bottleneck due to network latency (O(N) roundtrips). Gemini's `batchEmbedContents` allows up to 100 requests per call, and Pinecone's `upsert` naturally handles arrays.
**Action:** Use batch processing for high-throughput data indexing to reduce network overhead from O(N) to O(N/100).
