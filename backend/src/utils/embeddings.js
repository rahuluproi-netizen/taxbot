const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize embedding model once at module level to avoid redundant instantiation on every request
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

/**
 * Generates an embedding for a given text using Gemini.
 * @param {string} text - The input text.
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text) {
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings in batches for an array of texts using Gemini batchEmbedContents.
 * Partitions texts into chunks of 100 to adhere to Gemini API batch limits.
 * Performance impact: reduces network roundtrips from O(N) to O(N/100).
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const BATCH_SIZE = 100;
    const batches = [];
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      batches.push(texts.slice(i, i + BATCH_SIZE));
    }

    const results = await Promise.all(
      batches.map(async (batch) => {
        const requests = batch.map((text) => ({
          content: { parts: [{ text }] }
        }));
        const res = await embeddingModel.batchEmbedContents({ requests });
        return res.embeddings.map((e) => e.values);
      })
    );

    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
