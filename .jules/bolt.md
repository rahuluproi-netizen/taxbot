## 2025-05-18 - Gemini & Pinecone Batch Vector Uploads

**Learning:** When generating embeddings and storing vectors during RAG knowledge indexing, executing `generateEmbedding` and `upsertVector` sequentially for every document text chunk creates a massive $2N$ network roundtrip bottleneck. Utilizing Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` reduces API roundtrips by up to 98% (down to $2 \cdot \lceil N / 100 \rceil$).

**Action:** Always batch vector operations in chunks of up to 100 items when processing bulk text documents or embeddings.
