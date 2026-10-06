## 2025-05-18 - Batch Gemini Embeddings and Pinecone Vector Upserts
**Learning:** Document indexing was performing sequential await calls for every text chunk, causing O(N) network roundtrips to Gemini (`embedContent`) and Pinecone (`upsert`). By leveraging Gemini's `batchEmbedContents` and Pinecone's array-based `upsert`, API call count drops from N to N/100, providing up to a ~90-95% latency reduction during document processing.
**Action:** Always batch external API embedding/upsert requests when processing chunked documents.
