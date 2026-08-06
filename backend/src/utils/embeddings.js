const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize the embedding model at the module level to prevent redundant object instantiation on each request.
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
 * Generates embeddings for an array of texts using Gemini batch embedding.
 * Handles Gemini's 100-item limit internally and uses Promise.all for concurrent processing.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const maxBatchSize = 100;
    const batches = [];
    for (let i = 0; i < texts.length; i += maxBatchSize) {
      batches.push(texts.slice(i, i + maxBatchSize));
    }

    const results = await Promise.all(
      batches.map(async (batch) => {
        const requests = batch.map(text => ({
          content: {
            parts: [{ text }]
          }
        }));
        const response = await embeddingModel.batchEmbedContents({ requests });
        return response.embeddings.map(emb => emb.values);
      })
    );

    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
