## 2025-05-18 - Batch Gemini Embeddings and Pinecone Upserts
**Learning:** Sequential processing of text chunks during document upload creates a huge network bottleneck (2N roundtrips). Gemini's `model.batchEmbedContents` and Pinecone's `index.upsert` support batching up to 100 items per call, reducing network roundtrips from 2N to 2 per document batch.
**Action:** Always batch vector embeddings and vector database upserts in groups of up to 100 items when indexing documents instead of using per-item loops.
