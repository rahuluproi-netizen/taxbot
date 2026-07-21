# Bolt ⚡ Performance Journal

## 2026-07-21 - Batching Document Embeddings and Upserts
**Learning:** Document upload and processing is highly sequential and makes O(N) network calls for embeddings and Pinecone upserts, where N is the number of text chunks. By using `batchEmbedContents` from Gemini to batch generate embeddings (up to 100 chunks at once) and batch upserting to Pinecone (up to 100 vectors at once), we can reduce network roundtrips from O(N) to O(N/100). This drastically speeds up document upload.
**Action:** Implement `generateBatchEmbeddings` and use batch Pinecone upsert, keeping batch size within the recommended ~100 limit.
