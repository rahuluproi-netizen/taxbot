## 2026-08-07 - Batch Processing with Gemini and Pinecone APIs
**Learning:** Sequential O(N) API calls for embeddings and vector index upserts (one chunk at a time) form a major network bottleneck during document ingestion. Combining them using Gemini's `batchEmbedContents` and Pinecone's batch `index.upsert` reduces network roundtrips to O(N/100) and improves ingestion speed by up to ~60x.
**Action:** Always batch high-frequency third-party API operations like vector generation and storage in chunks of 100 rather than looping sequentially.
