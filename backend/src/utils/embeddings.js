const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize model at module level to avoid redundant object instantiation
const model = genAI.getGenerativeModel({ model: 'text-embedding-004' });

/**
 * Generates an embedding for a given text using Gemini.
 * @param {string} text - The input text.
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text) {
  try {
    const result = await model.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings in batch for a list of texts using Gemini.
 * Handles Gemini's 100-item limit by partitioning and using Promise.all.
 * Reduces network roundtrips from O(N) to O(N/100).
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  const batchSize = 100;
  const chunksOfTexts = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    chunksOfTexts.push(texts.slice(i, i + batchSize));
  }

  try {
    // Generate embeddings in concurrent batches of up to 100
    const promises = chunksOfTexts.map(async (textBatch) => {
      const requests = textBatch.map(text => ({
        content: { parts: [{ text }] }
      }));
      const response = await model.batchEmbedContents({ requests });
      return response.embeddings.map(e => e.values);
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
