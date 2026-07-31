const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini at the module level to avoid redundant instantiation on each request
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

/**
 * Generates an embedding for a given text using Gemini.
 * @param {string} text - The input text.
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text) {
  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings for an array of texts using Gemini's batch endpoint.
 * Handles the 100-item batch limit by internally partitioning the input.
 * Reduces sequential network roundtrips to O(N/100) concurrent batches.
 * @param {string[]} texts - The array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const BATCH_LIMIT = 100;
    const partitions = [];

    for (let i = 0; i < texts.length; i += BATCH_LIMIT) {
      partitions.push(texts.slice(i, i + BATCH_LIMIT));
    }

    const partitionPromises = partitions.map(async (partition) => {
      const requests = partition.map(text => ({
        content: { parts: [{ text }] }
      }));

      const response = await model.batchEmbedContents({ requests });
      return response.embeddings.map(e => e.values);
    });

    const results = await Promise.all(partitionPromises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
  generateBatchEmbeddings
};
