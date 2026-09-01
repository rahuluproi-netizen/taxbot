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
 * Generates embeddings for an array of texts in batches of up to 100 items.
 * Bolt Optimization: Replaces N single API calls with ceil(N/100) batch calls.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings matching input order.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100; // Gemini limit per batch request
    const batches = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    const results = await Promise.all(
      batches.map(async (batch) => {
        const requests = batch.map((text) => ({
          content: { parts: [{ text }] }
        }));
        const response = await model.batchEmbedContents({ requests });
        return response.embeddings.map((e) => e.values);
      })
    );

    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
