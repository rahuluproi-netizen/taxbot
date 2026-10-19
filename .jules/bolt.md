## 2025-05-18 - Batch Gemini Embeddings and Pinecone Upserts
**Learning:** Sequential per-item network requests in document indexing pipelines create severe network latency bottlenecks (2N roundtrips for N chunks). Gemini `batchEmbedContents` and Pinecone `index.upsert([batch])` accept batches of up to 100 items per call.
**Action:** Always prefer batching embedding generation and vector store upserts into chunks of 100 when processing multi-chunk documents to minimize network overhead.
