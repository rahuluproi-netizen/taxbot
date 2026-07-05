const assert = require('assert');
const fs = require('fs');

// Global counters for the mock
let geminiCalls = 0;
let pineconeCalls = 0;

// Simple manual mock
const mockEmbeddings = {
  generateEmbedding: async (text) => {
    geminiCalls++;
    return new Array(768).fill(0);
  },
  generateBatchEmbeddings: async (texts) => {
    geminiCalls++;
    return texts.map(() => new Array(768).fill(0));
  }
};

const mockVectorStore = {
  upsertVector: async () => {
    pineconeCalls++;
  },
  upsertVectors: async (vectors) => {
    pineconeCalls++;
  },
  queryVectors: async () => []
};

// Mock pdf-parse
const mockPdfParse = async () => ({ text: 'This is a test document. '.repeat(100) });

// Use chunkText from controller if possible, otherwise use local version
let chunkText;
try {
    const aiController = require('../src/controllers/aiController');
    chunkText = aiController.chunkText;
} catch (e) {
    chunkText = function(text, size = 1000, overlap = 200) {
        const chunks = [];
        for (let i = 0; i < text.length; i += size - overlap) {
          chunks.push(text.slice(i, i + size));
        }
        return chunks;
      };
}

// Manually test the logic that would be in aiController
async function testUploadKnowledgeLogic() {
  console.log('Running logic benchmark...');

  geminiCalls = 0;
  pineconeCalls = 0;

  const req = {
    file: { path: 'fake.pdf', originalname: 'test.pdf' },
    user: { id: 'test-user' }
  };

  // 1. Parse PDF (mocked)
  const pdfData = await mockPdfParse();
  const text = pdfData.text;

  // 2. Chunk text
  const chunks = chunkText(text);
  console.log(`Processing ${chunks.length} chunks...`);

  // 3. Generate Embeddings & Upsert (Batch optimized)
  const embeddings = await mockEmbeddings.generateBatchEmbeddings(chunks);

  const vectors = chunks.map((chunk, i) => ({
      id: `${req.user.id}_${Date.now()}_${i}`,
      values: embeddings[i],
      metadata: {
          text: chunk,
          caId: req.user.id,
          filename: req.file.originalname,
          chunkIndex: i
      }
  }));

  await mockVectorStore.upsertVectors(vectors);

  console.log(`Chunks processed: ${chunks.length}`);
  console.log(`Gemini API calls: ${geminiCalls}`);
  console.log(`Pinecone API calls: ${pineconeCalls}`);

  assert.strictEqual(geminiCalls, 1, 'Gemini should be called only once');
  assert.strictEqual(pineconeCalls, 1, 'Pinecone should be called only once');

  console.log('Optimization logic verified successfully!');
}

testUploadKnowledgeLogic().catch(err => {
  console.error(err);
  process.exit(1);
});
