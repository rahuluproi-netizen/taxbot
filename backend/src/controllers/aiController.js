const supabase = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { generateEmbedding, generateEmbeddings } = require('../utils/embeddings');
const { upsertVectors, queryVectors } = require('../utils/vectorStore');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const chatModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Helper to chunk text
function chunkText(text, size = 1000, overlap = 200) {
  const chunks = [];
  for (let i = 0; i < text.length; i += size - overlap) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

// @desc    Upload document and index vectors in Pinecone
// @route   POST /api/ai/upload
// @access  Private (CA/Admin)
exports.uploadKnowledge = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    // 1. Parse PDF using non-blocking read
    const dataBuffer = await fsPromises.readFile(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    // 2. Chunk text
    const chunks = chunkText(text);
    console.log(`Processing ${chunks.length} chunks...`);

    // 3. Generate Embeddings & Upsert to Pinecone in batches
    const BATCH_SIZE = 100;
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
        const batchChunks = chunks.slice(i, i + BATCH_SIZE);
        
        // Generate embeddings for the batch in parallel
        const embeddings = await generateEmbeddings(batchChunks);

        const vectors = batchChunks.map((chunk, index) => ({
            id: `${req.user.id}_${Date.now()}_${i + index}`,
            values: embeddings[index],
            metadata: {
                text: chunk,
                caId: req.user.id,
                filename: req.file.originalname,
                chunkIndex: i + index
            }
        }));

        // Upsert the batch to Pinecone
        await upsertVectors(vectors);
    }

    // Cleanup temp file
    await fsPromises.unlink(req.file.path);

    res.json({ message: 'Document indexed successfully!', chunks: chunks.length });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Ask a query using indexed knowledge (RAG)
// @route   POST /api/ai/query
// @access  Public/Private
exports.askQuery = async (req, res) => {
  try {
    const { query, clientId } = req.body;

    // 1. Generate query embedding
    const queryEmbedding = await generateEmbedding(query);

    // 2. Search Pinecone
    // Note: We filter by CA ID if we want private context
    const matches = await queryVectors(queryEmbedding, {}, 5); 
    
    const context = matches
        .map(match => match.metadata.text)
        .join('\n---\n');

    // 3. Generate Answer with Gemini
    const prompt = `You are an expert Tax Consultant AI. Answer the question based on the provided context from tax documents. If the answer is not in the context, say you don't know and suggest escalating to a CA.
    \nCONTEXT:\n${context || 'No specific document context found.'}\n\nQUESTION: ${query}`;
    
    const result = await chatModel.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ answer, escalated: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
