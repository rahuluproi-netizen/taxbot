## 2025-05-18 - Batch Gemini Embeddings & Pinecone Upserts for RAG
**Learning:** Document indexing in RAG pipelines using sequential single-item API calls scales poorly (O(N) network roundtrips). Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` support up to 100 items per request, reducing $2N$ HTTP roundtrips down to $2 \cdot \lceil N/100 \rceil$.
**Action:** Always process text chunks and vector embeddings using batch APIs with strict 100-item array boundaries.
