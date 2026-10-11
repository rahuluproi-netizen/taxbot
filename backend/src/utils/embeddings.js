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
 * Performance Optimization: Generates embeddings for an array of texts in batch requests.
 * Reduces N API network roundtrips to O(1) batched roundtrips (max 100 items per Gemini batch API call).
 * @param {string[]} texts - Array of input texts to embed.
 * @returns {Promise<number[][]>} - Array of vector embeddings corresponding to input texts.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const BATCH_SIZE = 100; // Gemini batchEmbedContents supports up to 100 requests per call
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      const chunk = texts.slice(i, i + BATCH_SIZE);
      const batchRequest = {
        requests: chunk.map((text) => ({
          content: { parts: [{ text }] },
        })),
      };

      const result = await model.batchEmbedContents(batchRequest);
      if (result && result.embeddings) {
        const chunkEmbeddings = result.embeddings.map((e) => e.values);
        allEmbeddings.push(...chunkEmbeddings);
      }
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
