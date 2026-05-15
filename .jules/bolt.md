## 2025-05-14 - Batched Document Indexing
**Learning:** Sequential API calls for embedding generation and vector upserts create a significant bottleneck ($O(N)$ network latency) during document uploads. Gemini's `batchEmbedContents` and Pinecone's batch `upsert` allow for $O(N/batch\_size)$ complexity.
**Action:** Always prefer batched operations for bulk data processing. Hoist `Date.now()` outside of loops when generating IDs for a batch to ensure consistency and avoid redundant system calls. Use `fs.promises` for non-blocking file I/O in the backend to keep the event loop responsive.
