const { Pinecone } = require('@pinecone-database/pinecone');

let index;

if (process.env.PINECONE_API_KEY) {
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });
  index = pc.index(process.env.PINECONE_INDEX || 'taxbot');
} else {
  console.warn('\n⚠️  PINECONE API KEY MISSING');
  index = {
    upsert: () => Promise.resolve(),
    query: () => Promise.resolve({ matches: [] }),
  };
}

/**
 * Upserts a chunk of text with its embedding into Pinecone.
 * Accepts record parameters and delegates to batch upsert.
 * @param {string} id - Unique ID for the chunk.
 * @param {number[]} values - The embedding vector.
 * @param {object} metadata - Metadata (clientId, caId, text, etc).
 */
async function upsertVector(id, values, metadata) {
  try {
    await upsertVectors([{ id, values, metadata }]);
  } catch (error) {
    console.error('Error upserting to Pinecone:', error);
    throw error;
  }
}

/**
 * Upserts a batch of vectors into Pinecone to avoid single-item roundtrip overhead.
 * Batches records up to 100 per API call for optimal network throughput.
 * @param {Array<{ id: string, values: number[], metadata: object }>} records - Vector records to upsert.
 * @param {number} batchSize - Maximum records per request.
 */
async function upsertVectors(records, batchSize = 100) {
  if (!records || records.length === 0) return;
  try {
    for (let i = 0; i < records.length; i += batchSize) {
      const batch = records.slice(i, i + batchSize);
      // Pinecone Node SDK v7+ expects { records: Array<PineconeRecord> }
      // while legacy/custom mock layers might expect Array directly.
      try {
        await index.upsert({ records: batch });
      } catch (err) {
        if (err && err.message && err.message.includes('Must pass in at least 1 record')) {
          // If a mock or alternative Pinecone version expects an array directly
          await index.upsert(batch);
        } else {
          throw err;
        }
      }
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
      filter,
    });
    return response.matches;
  } catch (error) {
    console.error('Error querying Pinecone:', error);
    throw error;
  }
}

module.exports = { upsertVector, upsertVectors, queryVectors };
