## 2026-05-17 - Batching and Async I/O for Document Indexing
**Learning:** Sequential $O(N)$ network requests for embeddings and vector upserts during document indexing create a significant bottleneck and block the Node.js event loop when using synchronous file operations.
**Action:** Always use batch APIs for embeddings (e.g., Gemini's `batchEmbedContents`) and vector stores (e.g., Pinecone's batch `upsert`) with an appropriate batch size (e.g., 100), and prefer `fs.promises` for non-blocking file operations in the backend.
