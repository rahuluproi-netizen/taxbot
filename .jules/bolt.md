## 2025-05-15 - Batch Processing for AI and Vector Stores
**Learning:** Sequential API calls for embeddings and vector upserts are a major bottleneck. Gemini's `batchEmbedContents` has a 100-item limit and requires a specific object structure for inputs. Pinecone also benefits significantly from batching (recommended size 100).
**Action:** Always check for batching capabilities in AI and DB SDKs. Initialize model instances outside of request handlers to avoid redundant object creation.

## 2025-05-15 - Robust CommonJS Mocking
**Learning:** When using `require.cache` to mock modules in Node.js, ensuring the cache entry includes `id`, `filename`, and `loaded: true` is critical for some loaders to accept the mock.
**Action:** Use a consistent template for manual module mocking in verification scripts.
