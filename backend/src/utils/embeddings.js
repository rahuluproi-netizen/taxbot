const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

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
 * Generates embeddings for an array of texts in batches using Gemini batchEmbedContents API.
 * Gemini batchEmbedContents accepts up to 100 requests per batch call.
 * Performance impact: Reduces N individual network roundtrips to ceil(N / 100) batched network requests.
 * @param {string[]} texts - Array of input texts.
 * @param {number} batchSize - Maximum batch size (default 100).
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts, batchSize = 100) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const results = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunk = texts.slice(i, i + batchSize);
      const requests = chunk.map(text => ({
        content: { parts: [{ text }] }
      }));
      const batchResult = await model.batchEmbedContents({ requests });
      const chunkEmbeddings = batchResult.embeddings.map(e => e.values);
      results.push(...chunkEmbeddings);
    }

    return results;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
