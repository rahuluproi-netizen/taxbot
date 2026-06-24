## 2026-06-24 - Document Indexing Batching
**Learning:** High-throughput document indexing in this codebase was bottlenecked by sequential network roundtrips to Gemini and Pinecone (N$ calls). Implementing batching reduces this to (N/100)$.
**Action:** Always check for sequential API calls in loops during document or data processing and apply batching using native provider capabilities (Gemini `batchEmbedContents` and Pinecone `upsert` array).
