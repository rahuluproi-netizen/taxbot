## 2025-05-14 - Batch operations for document indexing
**Learning:** Sequential API calls for embeddings and vector upserts during document indexing create a massive performance bottleneck as the number of text chunks grows. Gemini's `batchEmbedContents` and Pinecone's native batch upsert can significantly reduce network latency and API overhead.
**Action:** Always batch embedding and vector store operations when processing high-throughput data like PDF indexing.
