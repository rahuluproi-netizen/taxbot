## 2026-04-15 - Batch Embeddings and Vector Store Upserts for RAG Ingestion
**Learning:** Sequential processing of text chunks during PDF RAG ingestion creates an O(N) network bottleneck with 2N HTTP roundtrips to Gemini and Pinecone APIs. Gemini supports batch embeddings (`batchEmbedContents`) and Pinecone accepts array upserts (`index.upsert([...])`) for up to 100 items per call.
**Action:** When working on embedding or vector store features, always batch texts and vector records in groups of up to 100 to reduce network roundtrips from 2N to 2 per batch.
