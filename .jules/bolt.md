## 2025-05-18 - Batch Gemini Embeddings & Pinecone Vector Upserts

**Learning:** Processing PDF document knowledge chunks individually using sequential API calls created an O(2N) latency bottleneck on the backend during document upload. Using Gemini's `batchEmbedContents` and Pinecone's batch array `upsert` reduces total network roundtrips to O(1) batch requests (chunked up to 100 items per API call).

**Action:** Always batch external API embedding and vector store operations when processing collections or chunks instead of looping sequential network calls.
