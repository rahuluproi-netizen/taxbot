const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize embedding model once at module level to avoid redundant object instantiation
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
 * Generates embeddings in batches for an array of texts using Gemini batchEmbedContents.
 * Batching reduces network roundtrips from N sequential calls to Math.ceil(N / 100) calls.
 * Gemini API supports up to 100 items per batch.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to each text.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const BATCH_SIZE = 100;
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const slice = texts.slice(i, i + BATCH_SIZE);
      const requests = slice.map(text => ({
        content: {
          role: 'user',
          parts: [{ text }]
        }
      }));

      const result = await embeddingModel.batchEmbedContents({ requests });
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
