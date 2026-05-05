
## 2025-05-15 - Batched Document Indexing
**Learning:** Sequential processing of text chunks for embeddings and vector upserts creates a significant bottleneck due to network latency. Gemini's `batchEmbedContents` and Pinecone's bulk upsert reduce roundtrips by (N)$ where $ is the number of chunks. Switching to `fs.promises` ensures the event loop isn't blocked during PDF processing.
**Action:** Always prefer batched API calls for bulk data operations and use asynchronous file I/O in Node.js controllers.
