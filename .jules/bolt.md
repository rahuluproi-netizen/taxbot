## 2025-05-14 - Sequential RAG processing bottleneck
**Learning:** Document upload in `aiController.js` processes chunks sequentially, making individual API calls for each embedding and Pinecone upsert. This leads to linear time complexity O(n) where n is the number of chunks, heavily impacted by network roundtrips.
**Action:** Implement batching for both Gemini embeddings and Pinecone upserts to reduce network overhead and improve processing speed.
