## 2025-05-18 - Document Indexing Batching Optimization
**Learning:** Document processing in RAG was issuing individual API requests per text chunk for Gemini embeddings and Pinecone vector upserts, creating a sequential N network roundtrip bottleneck (e.g., 25 chunks = 50 external HTTP requests).
**Action:** Use `batchEmbedContents` from `@google/generative-ai` and batch array upserts for `Pinecone` to execute document indexing in 1 batched API request for embeddings and 1 batched API request for vector store upsert.
