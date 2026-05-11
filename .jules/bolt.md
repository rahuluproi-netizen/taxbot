## 2025-05-15 - Batched AI Ingestion
**Learning:** Sequential (N)$ network calls for embeddings and vector upserts during document ingestion create a significant bottleneck. Gemini supports `batchEmbedContents` and Pinecone supports batched `upsert`.
**Action:** Always batch AI-related network requests (embeddings, upserts) when processing multiple items. Use `fs.promises` for non-blocking I/O to avoid event loop starvation during large file processing.
