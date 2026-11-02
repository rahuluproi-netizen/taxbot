const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Performance: Reuse embedding model instance across requests
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

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
 * Generates embeddings in batches to minimize network roundtrips.
 * Gemini batchEmbedContents supports up to 100 requests per call.
 * @param {string[]} texts - Array of input texts.
 * @param {number} batchSize - Maximum items per batch (default 100).
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts, batchSize = 100) {
  if (!texts || texts.length === 0) return [];
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += batchSize) {
    const batch = texts.slice(i, i + batchSize);
    const requests = batch.map((text) => ({
      content: { parts: [{ text }] },
    }));

    const result = await embeddingModel.batchEmbedContents({ requests });
    allEmbeddings.push(...result.embeddings.map((e) => e.values));
  }

  return allEmbeddings;
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
