## 2024-05-20 - [Parallel Document Indexing]
**Learning:** Sequential processing of independent I/O tasks (like API calls for embeddings and vector storage) is a major bottleneck in RAG pipelines.
**Action:** Always check for opportunities to use `Promise.all` when processing independent data chunks to achieve near $O(1)$ time complexity relative to the number of chunks, assuming API limits are not exceeded.
