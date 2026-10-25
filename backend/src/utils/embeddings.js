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
 * Generates embeddings for an array of texts in batches using Gemini's batchEmbedContents API.
 * Reduces network roundtrips from N calls to ceil(N / 100) calls.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to texts.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const BATCH_SIZE = 100; // Gemini limit per batch
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batchTexts = texts.slice(i, i + BATCH_SIZE);
      const requests = batchTexts.map(text => ({
        content: { parts: [{ text }] }
      }));
      const result = await model.batchEmbedContents({ requests });
      const embeddings = result.embeddings.map(e => e.values);
      allEmbeddings.push(...embeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
