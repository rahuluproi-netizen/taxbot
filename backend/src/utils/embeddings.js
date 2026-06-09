const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates an embedding for a given text using Gemini.
 * Optimized for individual queries.
 * @param {string} text - The input text.
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    // Use RETRIEVAL_QUERY for individual query embeddings as per Gemini best practices
    const result = await model.embedContent({
      content: { parts: [{ text }] },
      taskType: 'RETRIEVAL_QUERY'
    });
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings for multiple text chunks in batches.
 * Significantly faster than sequential calls for document indexing.
 * @param {string[]} texts - Array of text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100; // Gemini's batch limit
    const allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const result = await model.batchEmbedContents({
        requests: batch.map(text => ({
          content: { parts: [{ text }] },
          taskType: 'RETRIEVAL_DOCUMENT'
        }))
      });
      allEmbeddings.push(...result.embeddings.map(e => e.values));
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
