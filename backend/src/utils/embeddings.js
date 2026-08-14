const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Initialize embedding model at the module level to avoid redundant object instantiation and improve performance
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
 * Generates embeddings for an array of texts using Gemini's batchEmbedContents in batches of 100.
 * Handles Gemini's 100-item limit per batch and runs concurrently using Promise.all.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    // Partition texts into batches of 100 (Gemini's batchEmbedContents limit is 100)
    const BATCH_SIZE = 100;
    const textBatches = [];
    for (let i = 0; i < texts.length; i += BATCH_SIZE) {
      textBatches.push(texts.slice(i, i + BATCH_SIZE));
    }

    // Process all batches concurrently with Promise.all
    const batchPromises = textBatches.map(async (batch) => {
      const requests = batch.map((t) => ({
        content: {
          parts: [{ text: t }]
        }
      }));

      const result = await embeddingModel.batchEmbedContents({ requests });
      return result.embeddings.map((e) => e.values || []);
    });

    const results = await Promise.all(batchPromises);
    // Flatten the results array to return a single array of embeddings
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
