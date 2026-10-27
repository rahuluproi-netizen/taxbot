## 2025-05-18 - RAG Vector Indexing Batching Pattern
**Learning:** Sequential calls during document embedding and Pinecone vector upserting created a 2*N HTTP request bottleneck. Gemini's `batchEmbedContents` expects `{ requests: [{ content: { parts: [{ text }] } }] }` with a limit of 100, while Pinecone v7 `index.upsert` expects `{ records: [...] }`.
**Action:** Always batch embedding and vector store upserts in chunks of 100 to reduce network API roundtrips by up to 99%.
