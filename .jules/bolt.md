## 2025-05-18 - Batch Gemini Embeddings & Pinecone Upserts
**Learning:** Sequential processing of text chunks during PDF RAG uploads introduces $2N$ HTTP roundtrips (1 embedding + 1 vector upsert per chunk). Using Gemini's `batchEmbedContents` and Pinecone's vector batch `upsert` reduces total requests to $2 \times \lceil N / 100 \rceil$, resulting in a ~98% reduction in network roundtrips.
**Action:** Always batch AI embeddings and vector store upserts when indexing multi-chunk documents instead of executing individual calls inside sequential `for` loops.
