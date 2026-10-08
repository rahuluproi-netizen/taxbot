## 2025-05-18 - Batch Gemini embeddings and Pinecone upserts
**Learning:** Document indexing was performing sequential single-item API calls to Gemini and Pinecone ($2N$ HTTP roundtrips). Using `@google/generative-ai`'s `batchEmbedContents` with request structure `{ content: { parts: [{ text }] } }` and Pinecone's batch array upsert reduces roundtrips to $\lceil N/100 \rceil$.
**Action:** When working with embedding models or vector database uploads, batch requests up to 100 items per API call to minimize network latency.
