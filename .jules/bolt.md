## 2025-05-14 - Batched AI Indexing
**Learning:** Sequential O(N) network calls for embeddings and vector upserts create a massive bottleneck for document ingestion, especially for large PDFs. Batching reduces this to O(N/100).
**Action:** Always check for loop-based API calls in ingestion pipelines and replace with native batching (e.g., `batchEmbedContents` for Gemini, array-based `upsert` for Pinecone).
