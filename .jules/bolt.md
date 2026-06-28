## 2025-05-14 - Batching AI and Vector Store Operations
**Learning:** Sequential network calls for embedding generation and vector upserts create a massive bottleneck (O(n) latency). Using Gemini's `batchEmbedContents` (up to 100 items) and Pinecone's batch upsert reduces network roundtrips from hundreds to just a few, resulting in ~125x fewer requests for a typical document.
**Action:** Always batch embedding and vector store operations when processing multiple chunks to minimize network overhead and improve indexing speed.
