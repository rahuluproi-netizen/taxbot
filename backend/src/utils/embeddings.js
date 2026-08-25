const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini client once at module level to reuse connection
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "text-embedding-004" });

/**
 * Generates an embedding for a single text using Gemini.
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
 * Generates embeddings for an array of texts in batch using Gemini's batchEmbedContents API.
 * Batches requests in chunks of 100 to reduce network roundtrips from O(N) to O(N/100).
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  const BATCH_SIZE = 100;
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    try {
      const requests = batch.map(text => ({
        content: { role: 'user', parts: [{ text }] }
      }));
      const res = await embeddingModel.batchEmbedContents({ requests });
      const embeddings = res.embeddings.map(e => e.values);
      allEmbeddings.push(...embeddings);
    } catch (error) {
      console.error(`Error generating batch embeddings for batch starting at index ${i}:`, error);
      throw error;
    }
  }

  return allEmbeddings;
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
