## 2025-05-22 - [Optimized AI Document Indexing with Batching]
**Learning:** Sequential processing of document chunks for embeddings and vector upserts is a major bottleneck ($2N$ network calls). Gemini's `batchEmbedContents` and Pinecone's batch `upsert` allow reducing this to $2N/BatchSize$ calls. Additionally, synchronous I/O in the event loop should be avoided for performance and scalability.
**Action:** Always look for batching opportunities in AI/Vector DB pipelines. Use `fs.promises` for file operations to keep the event loop responsive.

## 2025-05-22 - [Avoid Accidental Lockfile Commits]
**Learning:** Running `pnpm install` or `npm install` in the sandbox can generate lockfiles that might contain environment-specific or hallucinated versions if not carefully managed. These should not be committed unless explicitly required.
**Action:** Ensure `pnpm-lock.yaml` and `package-lock.json` are removed before submission if they were generated during the task.
