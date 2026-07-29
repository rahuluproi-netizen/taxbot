# Bolt Performance Journal

This journal tracks critical performance learnings, bottlenecks, surprising failures, or patterns discovered in this codebase.

## 2025-03-09 - Redundant Model Instantiation and Gemini Batch Embeddings API Limits
**Learning:** Instantiating the GoogleGenerativeAI and Pinecone clients or specific model objects inside request-scoped handlers causes high CPU and memory churn on every HTTP request. Furthermore, indexing documents sequentially results in O(N) network roundtrips. Gemini supports batch embeddings via `batchEmbedContents` with a hard limit of 100 items per call.
**Action:** Always initialize SDK/API client objects and AI model instances at the module level rather than inside controller/helper functions. When performing text embedding generation on large arrays, chunk the inputs into batches of up to 100 items and execute them concurrently with `Promise.all` to scale indexing throughput and avoid API limit crashes.
