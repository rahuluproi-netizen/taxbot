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
 * Upserts a chunk of text with its embedding into Pinecone.
 * @param {string} id - Unique ID for the chunk.
 * @param {number[]} values - The embedding vector.
 * @param {object} metadata - Metadata (clientId, caId, text, etc).
 */
async function upsertVector(id, values, metadata) {
  try {
    await index.upsert([{ id, values, metadata }]);
  } catch (error) {
    console.error('Error upserting to Pinecone:', error);
    throw error;
  }
}

/**
 * Upserts multiple vectors into Pinecone with internal batching (up to 100 vectors per call).
 * @param {Array<{ id: string, values: number[], metadata: object }>} vectors - Array of vector objects to upsert.
 */
async function upsertVectors(vectors) {
  if (!vectors || vectors.length === 0) return;
  try {
    const batchSize = 100;
    const promises = [];

    for (let i = 0; i < vectors.length; i += batchSize) {
      const batch = vectors.slice(i, i + batchSize);
      promises.push(index.upsert(batch));
    }

    await Promise.all(promises);
  } catch (error) {
    console.error('Error upserting vectors to Pinecone:', error);
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

exports.upsertVector = upsertVector;
exports.upsertVectors = upsertVectors;
exports.queryVectors = queryVectors;
