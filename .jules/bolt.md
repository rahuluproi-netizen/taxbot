## 2025-05-18 - Batch Embedding & Vector Store Upsert for RAG Pipelines
**Learning:** Sequential per-chunk embedding generation and vector database upsert calls create a massive bottleneck ($2 \times N$ network roundtrips) during document ingestion. Utilizing Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` reduces HTTP network requests by ~99% for large PDFs.
**Action:** Always check document ingestion and vector pipelines for sequential single-item API calls and replace them with chunked batch processing functions.
