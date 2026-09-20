## 2025-05-18 - Batch Processing for Gemini Embeddings & Pinecone Upserts

**Learning:** Processing document chunks sequentially creates an $O(N)$ network latency bottleneck when indexing PDFs. Gemini's SDK provides `batchEmbedContents` and Pinecone supports batch array upserts, allowing batching of up to 100 items per API call. Additionally, re-instantiating AI models on every request adds unnecessary overhead; keeping model instances at module level eliminates redundant object creation.

**Action:** Always batch vector embeddings and database vector upserts in RAG document upload pipelines, and reuse Gemini model instances at module scope.
