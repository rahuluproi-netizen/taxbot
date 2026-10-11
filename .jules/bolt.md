## 2025-05-18 - Batch Embedding and Vector Upserts for RAG Knowledge Upload

**Learning:** Processing uploaded document chunks sequentially in a loop results in $N$ Gemini API network calls + $N$ Pinecone API network calls, taking 10-20+ seconds for moderate documents. Batching requests via `batchEmbedContents` and single Pinecone `upsert` calls reduces total network roundtrips from $2N$ to $O(1)$ (e.g. 2 calls for up to 100 chunks), cutting response times by over 90%.
**Action:** Always batch vector embeddings and database/vector store upserts when bulk-processing chunked documents or tabular items.
