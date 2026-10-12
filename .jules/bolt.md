## 2025-05-18 - Batch Gemini Embeddings and Pinecone Vector Upserts
**Learning:** Document indexing in `uploadKnowledge` executed sequential API calls (`N` embedding calls + `N` vector upserts) for `N` text chunks. Using Gemini's `batchEmbedContents` and Pinecone's bulk `upsert` reduces total network roundtrips from `2N` to `2` (or `2 * ceil(N/100)` for large documents).
**Action:** Always batch AI embeddings and vector store upserts when processing document chunks instead of awaiting individual API calls inside sequential loops.
