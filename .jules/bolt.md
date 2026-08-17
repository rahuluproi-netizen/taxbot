## 2025-08-17 - RAG Knowledge Document Indexing Batching
**Learning:** Sequential per-chunk embedding generation (`embedContent`) and vector upserts (`upsertVector`) for document indexing create an O(N) network roundtrip bottleneck. Utilizing `@google/generative-ai`'s `batchEmbedContents` and Pinecone's batched `upsert` with batch sizes up to 100 reduces total network roundtrips from 2N down to O(N/100).
**Action:** Always batch embedding and vector store upsert calls during document ingestion or bulk text indexing workflows.
