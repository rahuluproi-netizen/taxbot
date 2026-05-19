## 2026-05-19 - Batched AI Indexing
**Learning:** Sequential embedding generation and vector upserts for document chunks created a major bottleneck ((N)$ network round-trips), especially for large PDFs. Blocking synchronous `fs` calls further degraded performance.
**Action:** Use Gemini's `batchEmbedContents` and Pinecone's batch upsert to reduce overhead to (N/100)$. Always prefer `fs.promises` for file operations in the backend to keep the event loop free.
