## 2025-05-15 - Gemini and Pinecone Batch API Optimization for RAG Ingestion
**Learning:** Document indexing in RAG pipelines previously performed sequential 1-by-1 network requests for embedding generation (`embedContent`) and vector upserts (`index.upsert`). Gemini supports `batchEmbedContents` and Pinecone supports batch `index.upsert(vectors)`. Batching requests in chunks of 100 reduces total network roundtrips for document indexing by ~98.6%.
**Action:** Always batch vector store upserts and embedding generation when ingesting multi-chunk documents or datasets.
