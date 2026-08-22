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
 * Generates embeddings for an array of texts in batches using Gemini's batchEmbedContents.
 * Batching reduces network roundtrips from O(N) to O(N / batchSize).
 * @param {string[]} texts - Array of input texts.
 * @param {number} batchSize - Maximum items per batch call (Gemini supports up to 100).
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts, batchSize = 100) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const embeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batchTexts = texts.slice(i, i + batchSize);
      const requests = batchTexts.map(text => ({
        content: { parts: [{ text }] }
      }));

      const result = await model.batchEmbedContents({ requests });
      const batchValues = result.embeddings.map(e => e.values);
      embeddings.push(...batchValues);
    }

    return embeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
