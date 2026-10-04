## 2025-05-18 - Gemini and Pinecone Batch API Optimization
**Learning:** Document ingestion was bottlenecked by sequential 1-by-1 API network calls for Gemini embedding generation and Pinecone vector upserting ($2 \times N$ API roundtrips).
**Action:** Use `generateBatchEmbeddings` (using Gemini `batchEmbedContents`) and `upsertVectors` (using Pinecone `index.upsert({ records })`) in batches of up to 100 items to reduce network roundtrips from $2 \times N$ to $2 \times \lceil N / 100 \rceil$.
