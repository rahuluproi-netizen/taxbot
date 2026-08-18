## 2026-08-18 - Gemini & Pinecone Batch Ingestion

**Learning:** Document ingestion was bottlenecked by sequential 1-by-1 API requests ($2N$ roundtrips). Both Google Generative AI (`batchEmbedContents`) and Pinecone (`index.upsert([...])`) support batch processing of up to 100 items per call, reducing network overhead by ~99% ($2 \cdot \lceil N/100 \rceil$).

**Action:** Always batch embedding generation and vector database upserts in chunks of 100 when processing document text chunks in RAG pipelines.
