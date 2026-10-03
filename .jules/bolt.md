## 2025-05-18 - Batch Vector Store & Embedding Operations

**Learning:** Processing PDF uploads chunk-by-chunk resulted in N sequential API calls to Gemini `embedContent` and N sequential calls to Pinecone `index.upsert`. Using Gemini's `batchEmbedContents` and Pinecone's batch upsert format `{ records: batch }` reduced network roundtrips by up to ~28x for medium/large documents. In Pinecone JS SDK v7, passing a raw array to `index.upsert` throws `PineconeArgumentError` and requires `{ records: [...] }`.
**Action:** Always check SDK specifications for batch endpoint formats and batch vector operations on bulk upload workflows.
