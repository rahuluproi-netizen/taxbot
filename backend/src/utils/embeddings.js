const { GoogleGenerativeAI } = require("@google/generative-ai");

// OPTIMIZATION: Initialize genAI and model at the module level to avoid redundant object
// instantiation on each request, saving memory and improving response times.
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
    console.error("Error generating embedding:", error);
    throw error;
  }
}

/**
 * Generates embeddings for an array of texts using Gemini batch API.
 * OPTIMIZATION: Leverages batchEmbedContents to reduce O(N) network roundtrips to O(N/100).
 * Handles Gemini's 100-item limit by internally partitioning the input array into smaller
 * batches and using Promise.all for concurrent processing.
 * @param {string[]} texts - The input texts to embed.
 * @returns {Promise<number[][]>} - Array of vector embeddings.
 */
async function generateBatchEmbeddings(texts) {
  if (!texts || texts.length === 0) return [];

  try {
    const batchSize = 100;
    const batches = [];

    for (let i = 0; i < texts.length; i += batchSize) {
      batches.push(texts.slice(i, i + batchSize));
    }

    // Process all batches concurrently using Promise.all
    const results = await Promise.all(
      batches.map(async (batch) => {
        // Prepare request structure as per Gemini SDK requirements:
        // requests is an array of objects where each object has content parts containing the text.
        const requests = batch.map((text) => ({
          content: { parts: [{ text }] },
        }));

        const response = await model.batchEmbedContents({ requests });
        return response.embeddings.map((emb) => emb.values);
      }),
    );

    // Flatten the array of results
    return results.flat();
  } catch (error) {
    console.error("Error generating batch embeddings:", error);
    throw error;
  }
}

module.exports = {
  generateEmbedding,
  generateBatchEmbeddings,
};
