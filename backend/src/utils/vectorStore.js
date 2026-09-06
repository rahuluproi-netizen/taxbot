const { Pinecone } = require('@pinecone-database/pinecone');

let index;

if (process.env.PINECONE_API_KEY) {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY
  });
  index = pc.index(process.env.PINECONE_INDEX || 'taxbot');
} else {
  console.warn('\n⚠️  PINECONE API KEY MISSING');
  index = {
    upsert: () => Promise.resolve(),
    query: () => Promise.resolve({ matches: [] })
  };
}

/**
 * Upserts an array of vector objects into Pinecone in batches.
 * Batching reduces network roundtrips from O(N) to O(N / batchSize),
 * significantly reducing document indexing latency.
 * @param {Array<{id: string, values: number[], metadata: object}>} vectors - Array of vector objects.
 * @param {number} batchSize - Max vectors per API payload (default: 100).
 */
async function upsertVectors(vectors, batchSize = 100) {
  if (!vectors || vectors.length === 0) return;
  try {
    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      await index.upsert(batch);
    }
  } catch (error) {
    console.error('Error batch upserting to Pinecone:', error);
    throw error;
  }
}

/**
 * Upserts a single chunk of text with its embedding into Pinecone.
 * Delegates to upsertVectors for consistent batch-friendly execution.
 * @param {string} id - Unique ID for the chunk.
 * @param {number[]} values - The embedding vector.
 * @param {object} metadata - Metadata (clientId, caId, text, etc).
 */
async function upsertVector(id, values, metadata) {
  return upsertVectors([{ id, values, metadata }]);
}

/**
 * Queries Pinecone for relevant chunks.
 * @param {number[]} vector - The query embedding.
 * @param {object} filter - Metadata filters (e.g., { caId: '...' }).
 * @param {number} topK - Number of results.
 */
async function queryVectors(vector, filter = {}, topK = 5) {
  try {
    const response = await index.query({
      vector,
      topK,
      includeMetadata: true,
      filter
    });
    return response.matches;
  } catch (error) {
    console.error('Error querying Pinecone:', error);
    throw error;
  }
}

module.exports = { upsertVector, upsertVectors, queryVectors };
