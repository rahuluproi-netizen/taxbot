## 2025-05-18 - Batch Processing for Vector Embeddings and Indexing
**Learning:** Sequential processing of text chunk embeddings and vector upserts creates an O(N) network bottleneck during document uploads. Gemini's `batchEmbedContents` and Pinecone's `upsert` accept up to 100 items per request, reducing API calls from 2N to 2 ceil(N/100).
**Action:** Always batch array-based API calls to external AI and vector database services when indexing or chunking documents.
