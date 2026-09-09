const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
 * Generates embeddings for an array of texts in batches using Gemini batchEmbedContents API.
 * Reduces network roundtrips from N to ceil(N / 100).
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const BATCH_SIZE = 100; // Gemini API limit per batch request
    const batches = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunkBatch = texts.slice(i, i + BATCH_SIZE);
      const requests = chunkBatch.map(text => ({
        content: { parts: [{ text }] }
      }));
      batches.push(embeddingModel.batchEmbedContents({ requests }));
    }

    const batchResults = await Promise.all(batches);
    const embeddings = [];
    for (const result of batchResults) {
      for (const item of result.embeddings) {
        embeddings.push(item.values);
      }
    }
    return embeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
