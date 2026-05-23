## 2025-05-15 - Batch AI Indexing
**Learning:** Sequential processing of document chunks for embeddings and vector storage is a massive bottleneck ((N)$ network roundtrips). Gemini's `batchEmbedContents` and Pinecone's batch `upsert` allow reducing this to (N/100)$.
**Action:** Always batch AI-related operations (embeddings, database writes) during ingestion pipelines to minimize latency and API overhead.
