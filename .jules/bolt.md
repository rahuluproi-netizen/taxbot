## 2025-06-29 - Batch Embedding and Vector Upserts
**Learning:** Sequential network requests for large document uploads (embedding generation + vector storage) create a massive performance bottleneck. Using Gemini's `batchEmbedContents` (max 100) and Pinecone's batch upserts drastically reduces round-trip overhead.
**Action:** Always check if SDKs support batching for operations that are likely to be called in a loop, especially for AI and database operations.
