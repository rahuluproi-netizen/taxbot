## 2025-05-15 - Batch Document Indexing
**Learning:** Sequential API calls for embedding generation and vector upsertion create a significant bottleneck during document ingestion. Gemini's `batchEmbedContents` allows up to 100 items per call, and Pinecone natively supports batch upserts, which can reduce network roundtrips by orders of magnitude.
**Action:** Always check for batching capabilities in AI and Vector DB SDKs when processing document chunks or lists of items. Implement batching at the utility level to make it reusable across the application.
