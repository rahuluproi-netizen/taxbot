## 2025-02-20 - Gemini batchEmbedContents structure requirement
**Learning:** Gemini's `batchEmbedContents` requires requests structured as `{ content: { parts: [{ text }] } }`. Processing text chunks sequentially creates high latency (2N HTTP roundtrips); batching into 100-item chunks reduces network roundtrips by up to 99%.
**Action:** Always batch embedding requests and Pinecone vector upserts when processing document chunks or bulk datasets.
