# Bolt's Performance Journal

## 2025-05-14 - Initializing Bolt Journal
**Learning:** Found sequential API calls in document upload process (Gemini embeddings + Pinecone upserts).
**Action:** Implement batching for both embedding generation and vector store upserts to reduce network latency from O(N) to O(N/BatchSize).
