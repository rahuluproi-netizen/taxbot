## 2025-06-23 - Batch Document Indexing Optimization
**Learning:** Document indexing was performing sequential O(N) network requests for embeddings and vector storage. Transitioning to Gemini's `batchEmbedContents` (O(N/100)) and Pinecone's native batch upsert significantly reduces latency and network overhead.
**Action:** Always check for batching capabilities in AI and database SDKs when processing multiple items.

## 2025-06-23 - Node.js Module Mocking with require.cache
**Learning:** Manually mocking modules via `require.cache` in the sandbox environment's Node.js version requires explicit `id`, `filename`, and `loaded: true` properties to avoid "Assertion failed: args[0]->IsString()" errors in the module loader.
**Action:** When mocking internal or external modules for testing, ensure the cache entry object is fully populated.
