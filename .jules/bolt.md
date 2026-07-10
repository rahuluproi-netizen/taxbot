## 2026-07-10 - [Batching and Singleton Optimizations]
**Learning:** Initializing AI models (Gemini) and database clients (Supabase) within request/render cycles adds unnecessary overhead. Batching embeddings and vector upserts can reduce network roundtrips from O(N) to O(N/100), significantly speeding up document ingestion.
**Action:** Always move client/model initialization to the module level and prioritize batching for AI/Vector operations.
