## 2025-05-18 - Batch Ingestion for Gemini & Pinecone RAG
**Learning:** RAG document indexing performed 2N sequential HTTP network roundtrips per uploaded document (1 Gemini embedding call + 1 Pinecone upsert per text chunk).
**Action:** Always batch embedding requests (`batchEmbedContents`) and vector upserts in chunks of 100 when processing multi-chunk documents to reduce network overhead from O(N) sequential calls to O(N/100).
