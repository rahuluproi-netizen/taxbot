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
 * Upserts a single chunk of text with its embedding into Pinecone.
 * @param {string} id - Unique ID for the chunk.
 * @param {number[]} values - The embedding vector.
 * @param {object} metadata - Metadata (clientId, caId, text, etc).
 */
async function upsertVector(id, values, metadata) {
  return upsertVectors([{ id, values, metadata }]);
}

/**
 * Upserts a batch of vector objects into Pinecone in chunks of up to 100 to optimize API throughput.
 * @param {Array<{id: string, values: number[], metadata?: object}>} vectors - Array of vector objects.
 */
async function upsertVectors(vectors) {
  if (!vectors || vectors.length === 0) return;

  // Pinecone recommends batching upserts (~100 vectors per call) to avoid payload limits & maximize throughput
  const BATCH_SIZE = 100;
  try {
    for (let i = 0; i < vectors.length; i += BATCH_SIZE) {
      const batch = vectors.slice(i, i + BATCH_SIZE);
      await index.upsert(batch);
    }
  } catch (error) {
    console.error('Error batch upserting to Pinecone:', error);
    throw error;
  }
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
