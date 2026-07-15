## 2026-07-15 - [Initial Profile]
**Learning:** Found O(N) bottleneck in `uploadKnowledge` where N embeddings and N upserts are performed sequentially. Gemini and Pinecone both support batching.
**Action:** Implement `generateBatchEmbeddings` and `upsertVectors` to reduce network roundtrips to O(1) or O(N/batchSize).
