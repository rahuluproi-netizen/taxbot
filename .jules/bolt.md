## 2025-05-20 - Batch AI Embeddings and Vector Store Upserts
**Learning:** Sequential processing in document ingestion (`generateEmbedding` + `upsertVector` per text chunk) introduces $2N$ HTTP roundtrips, causing significant upload latency. Using Gemini's `batchEmbedContents` and Pinecone's batch array `index.upsert` reduces request count by up to 98% (from $2N$ calls to 2 calls per 100 chunks).
**Action:** Always prefer batching vector embedding generation and vector upserts when processing collections of text chunks.
