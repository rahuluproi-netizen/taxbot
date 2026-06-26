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
 * Generates embeddings for a batch of text chunks using Gemini's batchEmbedContents.
 * Gemini supports up to 100 requests per batch call.
 * @param {string[]} texts - Array of text chunks.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Split into batches of 100 as per Gemini limits
    const batchSize = 100;
    let allEmbeddings = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const batch = texts.slice(i, i + batchSize);
      const requests = batch.map(text => ({
        content: { role: 'user', parts: [{ text }] },
        taskType: 'RETRIEVAL_DOCUMENT'
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
