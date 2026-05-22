## 2025-05-15 - Batched Document Indexing
**Learning:** Sequential O(N) network calls during document indexing (one per chunk for embedding, one per chunk for upsert) creates a massive bottleneck that scales linearly with document size. Batching both operations significantly reduces network overhead and improves indexing speed by orders of magnitude.
**Action:** Always check if external APIs (LLMs, Vector DBs) support batching and implement it for high-throughput operations. Use `fs.promises` to keep the event loop unblocked during large file processing.
