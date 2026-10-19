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
 * Generates embeddings in batch for an array of text strings using Gemini.
 * Reduces network roundtrips from N individual requests to 1 (or N/100) request(s).
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100; // Gemini limit per batch request
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunkBatch = texts.slice(i, i + batchSize);
      const requests = chunkBatch.map(text => ({
        content: { parts: [{ text }] }
      }));
      const result = await model.batchEmbedContents({ requests });
      const batchEmbeddings = result.embeddings.map(e => e.values);
      allEmbeddings.push(...batchEmbeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
