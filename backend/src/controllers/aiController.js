const supabase = require('../config/supabase');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const pdf = require('pdf-parse');
const fs = require('fs').promises;
const { generateEmbedding, generateEmbeddings } = require('../utils/embeddings');
const { upsertVector, upsertVectors, queryVectors } = require('../utils/vectorStore');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const BATCH_SIZE = 100;

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

    // 1. Parse PDF
    const dataBuffer = await fs.readFile(req.file.path);
    const pdfData = await pdf(dataBuffer);
    const text = pdfData.text;

    // 2. Chunk text
    const chunks = chunkText(text);
    console.log(`Processing ${chunks.length} chunks...`);

    // 3. Generate Embeddings & Upsert to Pinecone in Batches
    const timestamp = Date.now();
    for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
      const batchChunks = chunks.slice(i, i + BATCH_SIZE);
      const embeddings = await generateEmbeddings(batchChunks);

      const vectors = batchChunks.map((chunk, index) => ({
        id: `${req.user.id}_${timestamp}_${i + index}`,
        values: embeddings[index],
        metadata: {
          text: chunk,
          caId: req.user.id,
          filename: req.file.originalname,
          chunkIndex: i + index
        }
      }));

      await upsertVectors(vectors);
    }

    // 4. (Optional) Store in Supabase Storage
    // const { error } = await supabase.storage.from('tax-documents').upload(`${req.user.id}/${req.file.originalname}`, dataBuffer);

    // Cleanup temp file
    await fs.unlink(req.file.path);

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
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `You are an expert Tax Consultant AI. Answer the question based on the provided context from tax documents. If the answer is not in the context, say you don't know and suggest escalating to a CA.
    \nCONTEXT:\n${context || 'No specific document context found.'}\n\nQUESTION: ${query}`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    res.json({ answer, escalated: false });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
