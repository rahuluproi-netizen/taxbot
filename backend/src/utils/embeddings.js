const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock-key');

/**
 * Generates an embedding for a given text using Gemini.
 * @param {string} text - The input text.
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings in batches for an array of texts using Gemini's batchEmbedContents.
 * Reduces network roundtrips from O(N) to O(N/batchSize).
 * @param {string[]} texts - Array of input texts.
 * @param {number} batchSize - Maximum items per batch call (Gemini limit is 100).
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to texts.
 */
async function generateBatchEmbeddings(texts, batchSize = 100) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunk = texts.slice(i, i + batchSize);
      const requests = chunk.map(text => ({
        content: { parts: [{ text }] }
      }));

      const response = await model.batchEmbedContents({ requests });
      const embeddings = response.embeddings.map(e => e.values);
      allEmbeddings.push(...embeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
