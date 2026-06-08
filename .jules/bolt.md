## 2025-05-15 - Batching AI Indexing Operations
**Learning:** Sequential API calls for Gemini embeddings and Pinecone upserts during document indexing create a massive performance bottleneck ($2N$ network round trips). Batching these operations reduces overhead to $2 \times \lceil N/100 \rceil$.
**Action:** Use `generateBatchEmbeddings` and `upsertVectors` for all high-throughput document processing to minimize latency.
