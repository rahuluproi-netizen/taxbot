## 2025-05-14 - Batched Document Ingestion
**Learning:** Sequential O(N) network requests for embeddings and vector upserts during document ingestion create a significant bottleneck and increase the risk of request timeouts. Combining batched API calls with asynchronous `fs.promises` significantly improves throughput and keeps the event loop responsive.
**Action:** Always check for batching support in external AI and Vector DB SDKs when processing collections of data.
