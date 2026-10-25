## 2025-05-18 - Batch Gemini Embeddings and Pinecone Vector Upserts
**Learning:** Sequential processing of text chunks during PDF knowledge upload made $2N$ sequential network roundtrips ($N$ for Gemini embeddings and $N$ for Pinecone upserts). Gemini supports `batchEmbedContents` (up to 100 items/batch) and Pinecone supports batch array upserts `index.upsert(records)`.
**Action:** When handling chunked document processing or vector index ingestion, batch embedding requests and vector store upserts into single array payloads.
