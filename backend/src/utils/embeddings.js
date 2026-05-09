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
 * Generates embeddings for multiple texts using Gemini's batch API.
 * Handles the 100-request limit by sub-batching.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateEmbeddings(texts) {
  if (!texts.length) return [];

  const BATCH_LIMIT = 100;
  const allEmbeddings = [];
  const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

  for (let i = 0; i < texts.length; i += BATCH_LIMIT) {
    const batch = texts.slice(i, i + BATCH_LIMIT);
    try {
      const result = await model.batchEmbedContents({
        requests: batch.map(text => ({
          content: { parts: [{ text }] }
        })),
      });
      allEmbeddings.push(...result.embeddings.map(e => e.values));
    } catch (error) {
      console.error('Error generating batch embeddings:', error);
      throw error;
    }
  }
  return allEmbeddings;
}

module.exports = { generateEmbedding, generateEmbeddings };
