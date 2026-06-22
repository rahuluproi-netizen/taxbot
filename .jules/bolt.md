## 2026-06-22 - Batching AI Embeddings & Vector Upserts
**Learning:** Sequential O(N) API calls for document embeddings and vector database upserts create a significant performance bottleneck due to cumulative network latency. Gemini's `batchEmbedContents` (limit 100) and Pinecone's native batch upsert can be combined to reduce roundtrips by ~99% for large documents.
**Action:** Always look for batching opportunities when interacting with AI and Vector DB providers. Use a consistent timestamp per document batch to ensure ID alignment and minimize system calls.
