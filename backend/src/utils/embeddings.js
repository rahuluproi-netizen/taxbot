const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
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
 * Generates embeddings for a batch of texts using Gemini's batchEmbedContents.
 * It handles Gemini's 100-item batch limit by partitioning and concurrent processing.
 * @param {string[]} texts - Array of input text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];
  try {
    const batchSize = 100;
    const promises = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunk = texts.slice(i, i + batchSize);
      const requests = chunk.map(text => ({
        content: { parts: [{ text }] }
      }));
      promises.push(model.batchEmbedContents({ requests }));
    }

    const results = await Promise.all(promises);
    const allEmbeddings = [];
    for (const result of results) {
      if (result && result.embeddings) {
        allEmbeddings.push(...result.embeddings.map(e => e.values));
      }
    }
    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

exports.generateEmbedding = generateEmbedding;
exports.generateBatchEmbeddings = generateBatchEmbeddings;
