## 2025-05-14 - Batch Processing for AI and Vector Stores
**Learning:** Sequential processing of document chunks for embedding and vector database indexing creates a massive network bottleneck. Batching these requests can reduce network roundtrips by up to 100x.
**Action:** Always check if AI and Database SDKs support batch operations when processing arrays of data. Implement batching with a reasonable limit (e.g., 100 for Gemini) to optimize throughput.
