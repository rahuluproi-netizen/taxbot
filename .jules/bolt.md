## 2026-11-05 - Batched AI Document Indexing
**Learning:** Sequential processing of text chunks during document upload results in O(N) network roundtrips for both Gemini embeddings and Pinecone vector store upserts, creating a massive bottleneck for multi-page documents. Batching requests with a limit of 100 items per call reduces roundtrips to O(N/100).
**Action:** Always batch embedding generation via Gemini's `batchEmbedContents` and vector upserts into Pinecone in chunks of up to 100 items.
