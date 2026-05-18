## 2025-05-15 - Batch Processing for Document Indexing
**Learning:** Document indexing was a significant bottleneck due to sequential network calls for embeddings and vector upserts ($O(N)$ roundtrips). Gemini's `batchEmbedContents` and Pinecone's `upsert` support batching, which reduces roundtrips to $O(N/100)$.
**Action:** Always prefer batch APIs for bulk operations. Hoist timestamps and constants outside loops to ensure consistency and minor efficiency gains. Use `fs.promises` for non-blocking I/O in the backend to avoid blocking the event loop during heavy file processing.
