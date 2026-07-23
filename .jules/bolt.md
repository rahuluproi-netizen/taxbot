# Bolt's Journal - Critical Learnings

## 2026-07-23 - Batching Gemini and Pinecone Calls for RAG Ingestion
**Learning:** Sequential network calls per chunk during text ingestion create a huge bottleneck. Batching Gemini embeddings and Pinecone upserts can reduce API calls from $2N$ to $O(N/100)$.
**Action:** Implement `generateBatchEmbeddings` using Gemini's `batchEmbedContents` and `upsertVectors` in Pinecone helper, ensuring safety limits of 100 items per request are handled.
