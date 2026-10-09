## 2025-05-18 - Batch Gemini Embeddings and Pinecone Vector Upserts
**Learning:** Document knowledge indexing was previously making 2N sequential HTTP API requests (N for Gemini single embedding calls and N for Pinecone single vector upserts).
**Action:** Use `batchEmbedContents` from `@google/generative-ai` and batch vector upsert `{ records: [...] }` in `@pinecone-database/pinecone` (chunking requests in batches of up to 100) to reduce network roundtrips from 2N to 2 * ceil(N / 100).
