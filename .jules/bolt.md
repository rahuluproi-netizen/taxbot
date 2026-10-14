## 2025-05-18 - Batch RAG Embeddings and Vector Upserts
**Learning:** Document indexing was performing $2N$ sequential HTTP requests (one Gemini embedding call and one Pinecone upsert call per chunk). Switching to Gemini's `batchEmbedContents` and Pinecone's `{ records: [...] }` batch upsert reduces API roundtrips by >98%.
**Action:** Always batch RAG document chunking operations using native batch SDK methods instead of sequential single-item processing loops.
