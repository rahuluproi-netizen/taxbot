## 2025-06-10 - Batching AI Document Indexing
**Learning:** Sequential processing of text chunks during document indexing (1 API call for embedding + 1 for upsert per chunk) creates a massive performance bottleneck as the number of chunks grows ((N)$ roundtrips).
**Action:** Use `batchEmbedContents` (Gemini) and batched `upsert` (Pinecone) to reduce roundtrips to (N/BatchSize)$, significantly improving ingestion speed and reliability.
