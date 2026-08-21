## 2025-05-18 - Document Upload Batching in Gemini & Pinecone

**Learning:** Sequential processing of document text chunks caused $2N$ sequential HTTP requests during PDF knowledge indexing. Utilizing Gemini's `batchEmbedContents` and Pinecone's batched `upsert` in chunks of 100 reduced network roundtrips from $O(N)$ to $O(N/100)$ (a 98.8% reduction for 250 chunks).

**Action:** Always batch embedding generation and vector database upserts during document ingestion rather than iterating sequentially over chunks.
