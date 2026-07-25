## 2026-07-25 - Gemini & Pinecone API Concurrent Batch Indexing
**Learning:** Sequential text embedding API calls to Gemini and individual vector upserts to Pinecone create an O(N) sequential network bottleneck (e.g., 150 chunks requiring 300 sequential HTTP requests, taking over 30s). Applying batch processing reduces the complexity to O(N/100).
**Action:** Use concurrent batching with `Promise.all` and chunk vectors in maximum sizes of 100 to align perfectly with Gemini's `batchEmbedContents` and Pinecone's recommended payload constraints, reducing roundtrips by >98%.
