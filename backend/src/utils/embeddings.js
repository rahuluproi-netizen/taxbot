const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Performance optimization: Instantiate embedding model once at module level rather than on each request
const embeddingModel = genAI.getGenerativeModel({ model: 'text-embedding-004' });

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
 * Generates embeddings in batches of up to 100 texts (Gemini batch limit)
 * to avoid sequential per-chunk HTTP roundtrips.
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) {
    return [];
  }

  const BATCH_SIZE = 100;
  const embeddings = [];

  try {
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const batch = texts.slice(i, i + BATCH_SIZE);
      const requests = batch.map(text => ({
        content: { parts: [{ text }] }
      }));
      const result = await embeddingModel.batchEmbedContents({ requests });
      const batchEmbeddings = result.embeddings.map(e => e.values);
      embeddings.push(...batchEmbeddings);
    }
    return embeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
