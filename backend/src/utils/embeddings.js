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
 * Generates embeddings for a batch of texts using Gemini's batchEmbedContents.
 * @param {string[]} texts - Array of input texts.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Gemini supports up to 100 requests per batch.
    // If texts.length > 100, we should sub-batch it.
    const batchSize = 100;
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const subBatch = texts.slice(i, i + batchSize);
      const requests = subBatch.map(text => ({
        content: { parts: [{ text }] }
      }));

      const result = await model.batchEmbedContents({ requests });
      const embeddings = result.embeddings.map(e => e.values);
      allEmbeddings.push(...embeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateEmbeddings };
