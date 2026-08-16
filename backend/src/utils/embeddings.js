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
 * Generates embeddings in batch for an array of texts using Gemini batchEmbedContents.
 * Handles internal partitioning in batches of 100 requests per API call for optimal throughput.
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const BATCH_SIZE = 100;
    const batchPromises = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunkBatch = texts.slice(i, i + BATCH_SIZE);
      const requests = chunkBatch.map(text => ({
        content: { parts: [{ text }] }
      }));

      batchPromises.push(
        model.batchEmbedContents({ requests }).then(res => res.embeddings.map(e => e.values))
      );
    }

    const results = await Promise.all(batchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
