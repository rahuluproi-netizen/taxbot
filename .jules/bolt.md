## 2025-05-18 - Gemini batchEmbedContents & Pinecone Vector Batching

**Learning:** When indexing multi-page document chunks (PDFs), calling `embedContent` and `upsert` in a sequential loop creates severe network bottlenecking ($O(N)$ HTTP roundtrips). Utilizing Gemini's `batchEmbedContents` and Pinecone's array-level `upsert` reduces network calls to $O(N/100)$.
**Action:** Always batch external API embedding requests and vector DB upserts in chunks of 100 when processing batch document pipelines.
