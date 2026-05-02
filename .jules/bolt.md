## 2025-05-22 - Batch Document Processing

**Learning:** Sequential embedding generation and vector upserts create a significant bottleneck ($O(N)$ network requests) during document indexing. Gemini's `batchEmbedContents` and Pinecone's batch `upsert` allow for $O(N/100)$ requests, drastically reducing latency. Additionally, hoisting model instantiation outside request handlers prevents redundant initialization overhead.

**Action:** Always look for batching opportunities when interacting with AI and vector database APIs. Ensure `fs.promises` is used for non-blocking I/O in Node.js controllers to keep the event loop responsive during heavy file processing.
