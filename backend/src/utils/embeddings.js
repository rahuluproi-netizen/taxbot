const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Initialize model once at the module level to avoid redundant instantiation
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
 * Generates embeddings for multiple texts using Gemini's batch API.
 * Limits each batch request to 100 items as enforced by Gemini.
 * @param {string[]} texts - The array of input texts.
 * @returns {Promise<number[][]>} - Array of embedding vectors.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const batchSize = 100;
    const batches = [];

    // Partition into batches of 100 to respect Gemini API limits
    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    // Process all batches concurrently for maximum performance
    const batchPromises = batches.map(async (textBatch) => {
      const response = await model.batchEmbedContents({
        requests: textBatch.map(text => ({
          content: { parts: [{ text }] }
        }))
      });
      return response.embeddings.map(e => e.values);
    });

    const results = await Promise.all(batchPromises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

exports.generateEmbedding = generateEmbedding;
exports.generateBatchEmbeddings = generateBatchEmbeddings;
