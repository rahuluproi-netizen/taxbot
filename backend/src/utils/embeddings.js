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
 * Generates batch embeddings for multiple text chunks using Gemini.
 * Optimizes performance by reducing API roundtrips.
 * @param {string[]} texts - Array of text chunks (max 100).
 * @returns {Promise<number[][]>} - Array of embedding vectors.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Gemini supports up to 100 items per batch request
    const requests = texts.map(text => ({
      content: { parts: [{ text }] },
      taskType: 'RETRIEVAL_DOCUMENT'
    }));

    const result = await model.batchEmbedContents({ requests });
    return result.embeddings.map(e => e.values);
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
