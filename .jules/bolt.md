## 2025-07-05 - Batching API Calls for AI Workflows
**Learning:** Significant performance gains in document indexing can be achieved by moving from sequential API calls (embeddings and vector upserts) to batched operations. Gemini supports batch embedding up to 100 items, and Pinecone similarly benefits from batch upserts, reducing network roundtrip overhead from O(n) to O(1) batches.
**Action:** Always check if external AI or Database SDKs support batch operations before implementing loops for multiple data items.
