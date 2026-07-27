const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize the embedding model at the module level to avoid redundant object instantiation and improve response times
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
 * Generates embeddings for an array of texts in batch using Gemini's batchEmbedContents.
 * Handles the 100-item batch limit by chunking the inputs and executing requests.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const batchSize = 100;
    const textBatches = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      textBatches.push(texts.slice(i, i + batchSize));
    }

    // Process batches concurrently to optimize throughput
    const promises = textBatches.map(async (batch) => {
      const requests = batch.map(text => ({
        content: { role: 'user', parts: [{ text }] }
      }));
      const result = await embeddingModel.batchEmbedContents({ requests });
      return result.embeddings.map(e => e.values);
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
