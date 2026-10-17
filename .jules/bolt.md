## 2025-05-15 - Batch Document Vector Ingestion

**Learning:** Processing PDF chunks sequentially in `uploadKnowledge` created an $O(N)$ HTTP network bottleneck (calling Gemini's `embedContent` and Pinecone's `upsert` per chunk).
**Action:** Use `generateBatchEmbeddings` with Gemini's `batchEmbedContents` and `upsertVectors` in Pinecone with batch chunks of 100 to reduce total network roundtrips by ~98%.
