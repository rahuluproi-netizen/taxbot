## 2026-03-01 - Batching Document Indexing to Pinecone & Gemini

**Learning:**
Parsing and indexing large documents (such as PDFs) in RAG workflows creates a severe N+1 network request bottleneck if embeddings and vector upserts are called sequentially in a loop. Moving from sequential calls to batched API requests (`batchEmbedContents` on Gemini and batched `upsert` on Pinecone) resolves the bottleneck, reducing network roundtrips from O(N) to O(N/100).
Furthermore, when writing Mocking/Verification scripts in Node.js:
1. Globally overriding `fs.readFileSync` breaks Node's module loader (which uses it to load package configs/files). Wrapping `fs.readFileSync` to fall back to the original function for non-mocked files is required.
2. When overriding `Module.prototype.require` in Node.js, using `originalRequire.apply(this, arguments)` can fail with native loader crashes (`Assertion failed: args[0]->IsString()`). Delegate with `originalRequire.call(this, id)` instead.
3. Defining required environment variables (like `PINECONE_API_KEY`) is necessary in mock tests so that the actual SDK class instantiation code path is executed rather than running fallback mock setups.

**Action:**
Always batch vector store upserts and embedding generation in chunks of 100 (which is the recommended optimal payload and API rate limit threshold for both Pinecone and Gemini). In mock scripts, delegate requires using `.call(this, id)` and wrap `fs.readFileSync` carefully with standard fallback mechanics.
