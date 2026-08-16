## 2025-05-18 - RAG Document Ingestion Batching
**Learning:** During RAG indexing, sequential processing of text chunks leads to O(N) network roundtrips for embedding generation and vector store upserts. Using Gemini's `batchEmbedContents` and Pinecone's batch upserts in 100-item partitions reduces roundtrips to O(N/100) and dramatically improves upload throughput.
**Action:** Always batch embedding requests and vector store upserts in chunks of ~100 when processing multi-chunk document pipelines.
