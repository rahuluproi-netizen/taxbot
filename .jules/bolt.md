## 2025-05-15 - Batching AI Indexing Pipeline
**Learning:** Sequential processing of text chunks during document indexing creates a massive bottleneck due to network latency ($O(N)$ roundtrips). Gemini's `batchEmbedContents` and Pinecone's bulk `upsert` allow reducing this to $O(N/100)$.
**Action:** Always check for batching opportunities when dealing with multiple AI model calls or vector database operations. Use a batch size of 100 for both Gemini and Pinecone for optimal balance of speed and stability.
