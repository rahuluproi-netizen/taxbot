## 2025-05-18 - Batch document embeddings and vector upserts

**Learning:** Gemini API `batchEmbedContents` requires structuring requests as `{ content: { parts: [{ text }] } }` and can handle up to 100 texts per request. Similarly, Pinecone supports batch upserts up to 100 vectors per call. Sequential embedding and vector upsert in document upload loops cause significant network latency (2N requests).
**Action:** Always batch embedding requests and vector upserts in chunks of 100 during document indexing workflows.
