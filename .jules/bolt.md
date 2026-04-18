
## 2026-04-18 - Parallelizing AI I/O Operations
**Learning:** Sequential await calls in loops for external APIs (Gemini, Pinecone) create a significant performance bottleneck, proportional to the number of document chunks. Parallelizing with `Promise.all` or using native batch APIs drastically reduces document processing time.
**Action:** Always check for batching capabilities in SDKs (like Pinecone's `upsert`) and use `Promise.all` for independent I/O tasks to minimize total round-trip time.
