## 2025-02-28 - Batch processing for AI RAG indexing

**Learning:** When indexing multi-chunk documents into vector databases with LLM embeddings, sequential loop iterations (`for (...) { await embed(); await upsert(); }`) create $O(N)$ HTTP roundtrips. Batching embeddings with Gemini `batchEmbedContents` and vectors with Pinecone `upsert` reduces API calls to $O(N / 100)$, speeding up document ingestion by >90%.

**Action:** Always check if SDKs support batch endpoints (`batchEmbedContents`, array upserts) before processing collections sequentially.
