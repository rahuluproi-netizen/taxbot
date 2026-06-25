const { chunkText } = require('../src/controllers/aiController');
const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Mock dependencies
const mockEmbeddingsCalled = { count: 0 };
const mockVectorStoreCalled = { count: 0 };

const embeddingsPath = require.resolve('../src/utils/embeddings.js');
const vectorStorePath = require.resolve('../src/utils/vectorStore.js');
const pdfParsePath = require.resolve('pdf-parse');

// Mocking require.cache to intercept utility calls
require.cache[embeddingsPath] = {
  id: embeddingsPath,
  filename: embeddingsPath,
  loaded: true,
  exports: {
    generateEmbedding: async () => [0.1],
    generateBatchEmbeddings: async (texts) => {
      mockEmbeddingsCalled.count++;
      return texts.map(() => [0.1]);
    }
  }
};

require.cache[vectorStorePath] = {
  id: vectorStorePath,
  filename: vectorStorePath,
  loaded: true,
  exports: {
    upsertVector: async () => {},
    upsertVectors: async (vectors) => {
      mockVectorStoreCalled.count++;
    },
    queryVectors: async () => []
  }
};

// pdf-parse mock as a function that returns a promise resolving to an object with 'text'
const pdfMock = async (buffer) => ({ text: 'a'.repeat(250000) });
require.cache[pdfParsePath] = {
    id: pdfParsePath,
    filename: pdfParsePath,
    loaded: true,
    exports: pdfMock
};

if (!fs.existsSync('mock.pdf')) fs.writeFileSync('mock.pdf', 'dummy content');

// Clear cache for aiController to ensure it picks up the mocks
delete require.cache[require.resolve('../src/controllers/aiController')];
const aiController = require('../src/controllers/aiController');

async function testOptimization() {
    console.log('🚀 Starting Performance Optimization Verification...');

    const req = {
        file: { path: 'mock.pdf', originalname: 'mock.pdf' },
        user: { id: 'user123' }
    };
    const res = {
        json: (data) => {
            console.log('✅ Controller responded with:', data);

            // Expected: 250 chunks / 100 batch size = 3 batches
            console.log(`📊 Batch Embeddings API calls: ${mockEmbeddingsCalled.count}`);
            console.log(`📊 Batch VectorStore API calls: ${mockVectorStoreCalled.count}`);

            const totalChunks = data.chunks;
            const reductionFactor = totalChunks / mockEmbeddingsCalled.count;

            console.log(`⚡ Efficiency gain: ${reductionFactor.toFixed(1)}x fewer network calls`);

            assert(mockEmbeddingsCalled.count < 10, 'Too many embedding calls! Batching failed.');
            assert(mockVectorStoreCalled.count < 10, 'Too many vector store calls! Batching failed.');
            console.log('✨ Verification PASSED!');

            // Cleanup
            if (fs.existsSync('mock.pdf')) fs.unlinkSync('mock.pdf');
        },
        status: function(code) {
            return {
                json: (err) => {
                    console.error('❌ Controller failed with status', code, ':', err);
                    if (fs.existsSync('mock.pdf')) fs.unlinkSync('mock.pdf');
                    process.exit(1);
                }
            };
        }
    };

    await aiController.uploadKnowledge(req, res);
}

testOptimization().catch(err => {
    console.error('❌ Test failed:', err);
    if (fs.existsSync('mock.pdf')) fs.unlinkSync('mock.pdf');
    process.exit(1);
});
