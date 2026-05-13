## 2025-05-13 - Batch document indexing for RAG
**Learning:** Sequential API calls for embeddings (Gemini) and vector upserts (Pinecone) create massive latency bottlenecks in RAG pipelines. Gemini supports `batchEmbedContents` (up to 100 items) and Pinecone supports batch upserts.
**Action:** Always prefer batched operations for document ingestion. Use `fs.promises` instead of synchronous `fs` methods to avoid blocking the event loop during large file processing.
