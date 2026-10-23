## 2025-05-18 - Batch RAG Embeddings & Vector Store Operations

**Learning:** Sequential processing of text chunks during PDF/document indexing created a significant N+1 network call bottleneck (2N API roundtrips for N chunks). Gemini's `@google/generative-ai` supports `batchEmbedContents({ requests })` and Pinecone's index `upsert` accepts an array of records `[{ id, values, metadata }]`, both bounded by 100 items per request.

**Action:** When working on embedding or vector storage pipelines, always batch text chunk operations up to API limits (e.g., 100 items per batch) to reduce external network roundtrips from O(N) to O(N/100).
