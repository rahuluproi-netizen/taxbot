# Bolt Performance Journal

## 2025-05-20 - Gemini Batch Embeddings and Pinecone Vector Batching
**Learning:** Sequential processing of text chunks during document upload causes O(N) network roundtrips to embedding and vector store APIs. Batching API calls reduces roundtrips to O(N/100).
**Action:** Always batch embedding requests and vector upserts in document processing pipelines.
