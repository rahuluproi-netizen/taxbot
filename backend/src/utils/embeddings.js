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
 * Generates embeddings for multiple text chunks in batches using Gemini.
 * Optimizes performance by reducing network roundtrips.
 * @param {string[]} chunks - Array of text chunks.
 * @returns {Promise<number[][]>} - Array of embedding vectors.
 */
async function generateBatchEmbeddings(chunks) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100;
    let allEmbeddings = [];

    for (let i = 0; i < chunks.length; i += batchSize) {
      const batch = chunks.slice(i, i + batchSize);
      const requests = batch.map(text => ({
        content: { role: 'user', parts: [{ text }] },
        taskType: 'RETRIEVAL_DOCUMENT'
      }));

      const result = await model.batchEmbedContents({ requests });
      const embeddings = result.embeddings.map(e => e.values);
      allEmbeddings = allEmbeddings.concat(embeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
