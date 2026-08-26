const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize model at module scope to avoid re-instantiation overhead per request
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
 * Partitions input into sub-batches of up to 100 items to respect API limits.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to inputs.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const BATCH_SIZE = 100;
    const batches = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunkTexts = texts.slice(i, i + BATCH_SIZE);
      const requests = chunkTexts.map(text => ({
        content: { parts: [{ text }] }
      }));
      batches.push(embeddingModel.batchEmbedContents({ requests }));
    }

    const results = await Promise.all(batches);
    return results.flatMap(res => res.embeddings.map(e => e.values));
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
