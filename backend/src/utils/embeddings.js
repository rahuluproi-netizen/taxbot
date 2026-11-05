const { GoogleGenerativeAI } = require('@google/generative-ai');

// Module-level model initialization to avoid redundant client recreation on every call
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
 * ⚡ Performance Optimization: Batch embedding generation
 * Generates embeddings for an array of texts in batches using Gemini's batchEmbedContents API.
 * Reduces network roundtrips from O(N) to O(N / 100) while respecting Gemini's 100-item batch limit.
 *
 * @param {string[]} texts - Array of input texts to embed.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const BATCH_SIZE = 100;
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunk = texts.slice(i, i + BATCH_SIZE);
      const requests = chunk.map(text => ({
        content: { parts: [{ text }] }
      }));

      const res = await embeddingModel.batchEmbedContents({ requests });
      const batchValues = res.embeddings.map(e => e.values);
      allEmbeddings.push(...batchValues);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
