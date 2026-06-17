const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 * Generates an embedding for a given text using Gemini.
 * @param {string} text - The input text.
 * @param {string} taskType - The task type for the embedding (e.g., 'RETRIEVAL_QUERY', 'RETRIEVAL_DOCUMENT').
 * @returns {Promise<number[]>} - The vector embedding.
 */
async function generateEmbedding(text, taskType = 'RETRIEVAL_QUERY') {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const result = await model.embedContent({
      content: { role: 'user', parts: [{ text }] },
      taskType
    });
    return result.embedding.values;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw error;
  }
}

/**
 * Generates embeddings for multiple texts in batches.
 * Gemini supports up to 100 requests per batch call.
 * @param {string[]} texts - Array of input texts.
 * @param {string} taskType - The task type for the embedding.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts, taskType = 'RETRIEVAL_DOCUMENT') {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100;
    let allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const requests = batch.map(text => ({
        content: { role: 'user', parts: [{ text }] },
        taskType
      }));

      const result = await model.batchEmbedContents({ requests });
      const batchEmbeddings = result.embeddings.map(e => e.values);
      allEmbeddings = allEmbeddings.concat(batchEmbeddings);
    }

    return allEmbeddings;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
