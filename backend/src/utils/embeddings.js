const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize model at module level to avoid redundant object instantiation
const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

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
 * Generates embeddings for multiple texts in batches to reduce network roundtrips.
 * Gemini API has a 100-item limit per batch call.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const BATCH_SIZE = 100;
    const chunkArray = (arr, size) =>
      Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
        arr.slice(i * size, i * size + size)
      );

    const textBatches = chunkArray(texts, BATCH_SIZE);

    // Process batches concurrently to further improve performance
    const embeddingPromises = textBatches.map(async (batch) => {
      const requests = batch.map(t => ({ content: { parts: [{ text: t }] } }));
      const result = await model.batchEmbedContents({ requests });
      return result.embeddings.map(e => e.values);
    });

    const results = await Promise.all(embeddingPromises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
