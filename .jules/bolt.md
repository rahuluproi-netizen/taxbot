## 2025-05-18 - Batch Ingestion in RAG Pipelines
**Learning:** Sequential embedding generation and vector upserts during document ingestion create $2 \times N$ sequential HTTP roundtrips. Batching using Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` reduces total requests from $2 \times N$ to $2 \times \lceil N / 100 \rceil$, speeding up document indexing significantly.
**Action:** Always check vector ingestion and embedding loops for batching capabilities in RAG workflows.
