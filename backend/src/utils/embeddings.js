const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini SDK and model at the module level to avoid redundant object instantiation
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
 * Generates embeddings for a batch of text chunks using Gemini's batch API.
 * Handles the 100-item batch limit by chunking the inputs and querying concurrently.
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const batchSize = 100;
    const batches = [];

    // Chunk texts into batches of 100 items to respect Gemini API limits
    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    // Process all batches concurrently with Promise.all
    const results = await Promise.all(
      batches.map(async (batch) => {
        const requests = batch.map((text) => ({
          content: {
            parts: [{ text }]
          }
        }));
        const response = await embeddingModel.batchEmbedContents({ requests });
        return response.embeddings.map((emb) => emb.values);
      })
    );

    // Flatten results array to return a 2D array of embeddings
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
