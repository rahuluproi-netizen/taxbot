## 2025-05-18 - Batch Embedding & Pinecone Vector Upserts
**Learning:** In Gemini API, `batchEmbedContents` expects a structured object containing a `requests` array with `{ content: { parts: [{ text }] } }`, with a maximum limit of 100 items per batch API call. Similarly, Pinecone vector upserts perform optimally when batched up to 100 records.
**Action:** Always batch multi-chunk document processing using `generateBatchEmbeddings` and `upsertVectors` partitioned in chunks of 100 to reduce $2N$ sequential API roundtrips down to $2 \times \lceil N/100 \rceil$.
