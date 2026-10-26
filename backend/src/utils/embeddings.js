const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates an embedding for a single text string using Gemini.
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
 * Generates embeddings in batch for an array of text strings using Gemini batchEmbedContents.
 * Handles partitioning to ensure requests do not exceed batch size limits (max 100 per request).
 * @param {string[]} texts - Array of input text strings.
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to input texts.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const BATCH_SIZE = 100; // Gemini limit per batch request
    const embeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunk = texts.slice(i, i + BATCH_SIZE);
      const requests = chunk.map(text => ({
        content: { parts: [{ text }] }
      }));

      const response = await model.batchEmbedContents({ requests });
      const chunkEmbeddings = response.embeddings.map(e => e.values);
      embeddings.push(...chunkEmbeddings);
    }

    return embeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
