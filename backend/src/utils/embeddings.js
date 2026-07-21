const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini at module-level to avoid redundant object instantiation
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
 * Generates embeddings in batches for a given list of texts using Gemini's batchEmbedContents.
 * It chunks requests to handle the API's limit (usually 100 items per call).
 * @param {string[]} texts - The list of input texts.
 * @returns {Promise<number[][]>} - The array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const results = [];
    const BATCH_LIMIT = 100;

    for (let i = 0; i < texts.length; i += BATCH_LIMIT) {
      const chunk = texts.slice(i, i + BATCH_LIMIT);

      // Map texts into the format required by batchEmbedContents
      const requests = chunk.map(text => ({
        content: {
          parts: [{ text }]
        }
      }));

      const batchResult = await model.batchEmbedContents({ requests });

      if (batchResult && batchResult.embeddings) {
        const values = batchResult.embeddings.map(emb => emb.values);
        results.push(...values);
      } else {
        throw new Error('Invalid response structure from batchEmbedContents API');
      }
    }

    return results;
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
