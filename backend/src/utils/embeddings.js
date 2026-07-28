const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini at the module level to avoid redundant instantiation on each request
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
 * Generates embeddings for an array of texts in batches using Gemini.
 * Handles the Gemini API's 100-item batch limit internally with concurrent processing.
 * @param {string[]} chunks - The array of text chunks.
 * @returns {Promise<number[][]>} - Array of embedding vectors.
 */
async function generateBatchEmbeddings(chunks) {
  try {
    if (!chunks || chunks.length === 0) return [];

    const batchSize = 100;
    const batches = [];
    for (let i = 0; i < chunks.length; i += batchSize) {
      batches.push(chunks.slice(i, i + batchSize));
    }

    // Process all batches concurrently
    const promises = batches.map(async (chunkBatch) => {
      const requests = chunkBatch.map(chunk => ({
        content: {
          parts: [{ text: chunk }]
        }
      }));

      const result = await embeddingModel.batchEmbedContents({ requests });
      return result.embeddings.map(e => e.values);
    });

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
  generateBatchEmbeddings
};
