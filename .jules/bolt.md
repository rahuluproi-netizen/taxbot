## 2025-05-18 - Pinecone Vector Upserts Batching
**Learning:** Sequential Pinecone vector upserts during document indexing incur significant network overhead (1 HTTP request per chunk). Pinecone supports batch upserts of up to 100 vectors per API request.
**Action:** Always batch vector records in chunks of 100 when calling Pinecone `index.upsert()` in indexer flows.
