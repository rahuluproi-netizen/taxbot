## 2025-05-15 - Batch Embedding and Vector Upserts
**Learning:** Document ingestion performance is heavily bottlenecked by sequential network roundtrips to AI and Vector DB APIs. Gemini supports batching up to 100 texts, and Pinecone is significantly more efficient with batch upserts (~100 vectors per call is a good baseline). Moving model initialization to the module level also shaves off unnecessary object creation time per request.
**Action:** Always prefer batch APIs for bulk data processing (like document indexing) and initialize static resources outside of request handlers.
