## 2025-05-18 - Batch Embedding & Vector Upserting Pattern
**Learning:** Sequential processing in document upload chunk loops creates significant network latency bottlenecks (2*N roundtrips for N chunks). Gemini SDK supports `batchEmbedContents` (up to 100 items/batch) and Pinecone v7 SDK supports `index.upsert({ records: batch })` (up to 100 records/batch).
**Action:** When implementing RAG or vector indexing features, batch chunk embeddings and vector upserts into groups of 100 to reduce network roundtrips to 2*ceil(N/100).
