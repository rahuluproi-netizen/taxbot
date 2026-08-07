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
 * Generates embeddings for multiple texts in batch using Gemini's batchEmbedContents.
 * To satisfy Gemini's 100-item rate limit / max payload, we partition the inputs into chunks of up to 100,
 * and call batchEmbedContents.
 * @param {string[]} texts - Array of input texts.
 * @param {string} taskType - The task type for the embedding.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts, taskType = 'RETRIEVAL_DOCUMENT') {
  try {
    if (!texts || texts.length === 0) return [];

    const batchSize = 100;
    const batches = [];
    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    const results = await Promise.all(
      batches.map(async (batch) => {
        const batchResponse = await model.batchEmbedContents({
          requests: batch.map(text => ({
            content: { parts: [{ text }] },
            taskType
          }))
        });
        return batchResponse.embeddings.map(emb => emb.values);
      })
    );

    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
