## 2025-05-15 - Batch processing for RAG pipeline
**Learning:** Sequential processing of text chunks for embeddings and vector upserts is a major bottleneck in RAG-based systems due to network latency from multiple small requests.
**Action:** Always implement batch processing (e.g., using Gemini's `batchEmbedContents` and Pinecone's batch upsert) when processing document chunks to minimize total request time.
