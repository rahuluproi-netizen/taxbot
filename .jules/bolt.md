## 2026-08-20 - Pinecone Batch Vector Upsert Optimization
**Learning:** Document indexing in `uploadKnowledge` created single-vector Pinecone `upsert` calls per text chunk ($O(N)$ sequential HTTP calls). `Pinecone.prototype.index().upsert` handles vector arrays natively, allowing batch upserts (recommended max ~100 per call).
**Action:** When working with Pinecone vector indexing, always batch vectors into array chunks of up to 100 before calling `upsert` to reduce network roundtrips from $O(N)$ to $O(\lceil N/100 \rceil)$.
