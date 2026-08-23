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
  try {
    await index.upsert([{ id, values, metadata }]);
  } catch (error) {
    console.error('Error upserting to Pinecone:', error);
    throw error;
  }
}

/**
 * Batch upserts multiple vector records into Pinecone in chunked batches.
 * Batching vector upserts significantly reduces network roundtrips and API overhead.
 * @param {Array<{id: string, values: number[], metadata: object}>} records - Array of vector objects to upsert.
 * @param {number} batchSize - Maximum records per Pinecone upsert call (default: 100).
 */
async function upsertVectors(records, batchSize = 100) {
  if (!records || records.length === 0) return;
  try {
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
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
