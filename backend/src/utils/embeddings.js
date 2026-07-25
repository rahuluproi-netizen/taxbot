const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini at module level to prevent redundant object instantiation
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || 'mock_key');
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
 * Generates embeddings for an array of texts in batches using Gemini's batchEmbedContents API.
 * Uses concurrent batching with a limit of 100 items per request to avoid API constraints.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const batchSize = 100;
    const batches = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    const batchPromises = batches.map(async (batch) => {
      const requests = batch.map(text => ({
        content: {
          parts: [{ text }]
        }
      }));
      const response = await embeddingModel.batchEmbedContents({ requests });
      return response.embeddings.map(e => e.values);
    });

    const results = await Promise.all(batchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

// Ensure all function exports use exports.name syntax in backend Node.js environment
exports.generateEmbedding = generateEmbedding;
exports.generateBatchEmbeddings = generateBatchEmbeddings;
