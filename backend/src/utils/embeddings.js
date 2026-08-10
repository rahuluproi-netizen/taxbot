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
 * Generates embeddings for an array of texts using Gemini in batches of up to 100.
 * @param {string[]} texts - The input texts.
 * @returns {Promise<number[][]>} - The vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  try {
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });
    const batchSize = 100;
    const promises = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      const chunk = texts.slice(i, i + batchSize);

      const request = {
        requests: chunk.map(text => ({
          content: {
            parts: [{ text }]
          }
        }))
      };

      promises.push(
        model.batchEmbedContents(request).then(result => {
          if (!result || !result.embeddings) {
            throw new Error('Invalid response from batchEmbedContents');
          }
          return result.embeddings.map(e => e.values);
        })
      );
    }

    const results = await Promise.all(promises);
    return results.flat();
  } catch (error) {
    console.error('Error generating batch embeddings:', error);
    throw error;
  }
}

module.exports = { generateEmbedding, generateBatchEmbeddings };
