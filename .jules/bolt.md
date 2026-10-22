## 2025-02-23 - Batch Gemini Embeddings and Pinecone Upserts
**Learning:** Gemini's `batchEmbedContents` requires a specific request payload structure (`{ requests: [{ content: { parts: [{ text }] } }] }`) and max batch size of 100. Combining batch embedding generation with batch Pinecone upsert reduces API latency from $2N$ roundtrips to 2 roundtrips during document knowledge ingestion.
**Action:** Always batch multi-item Gemini embedding requests using `batchEmbedContents` with 100-item chunks when indexing documents or bulk texts.
