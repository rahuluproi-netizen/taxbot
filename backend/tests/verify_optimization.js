const assert = require('assert');
const path = require('path');
const fs = require('fs');

// Mock dependencies before requiring the controller
const mockEmbeddings = {
  generateEmbedding: async () => [0.1, 0.2],
  generateBatchEmbeddings: async (texts) => {
    mockEmbeddings.batchCalls++;
    return texts.map(() => [0.1, 0.2]);
  },
  batchCalls: 0
};

const mockVectorStore = {
  upsertVector: async () => {
    mockVectorStore.singleUpsertCalls++;
  },
  upsertVectors: async (vectors) => {
    mockVectorStore.batchUpsertCalls++;
  },
  queryVectors: async () => [],
  singleUpsertCalls: 0,
  batchUpsertCalls: 0
};

const mockPdf = async () => ({ text: 'mock text content' });
const mockFs = {
  readFileSync: () => Buffer.from('mock pdf'),
  unlinkSync: () => {}
};

// Setup require cache for mocking
require.cache[require.resolve('../src/utils/embeddings')] = {
  id: require.resolve('../src/utils/embeddings'),
  filename: require.resolve('../src/utils/embeddings'),
  loaded: true,
  exports: mockEmbeddings
};
require.cache[require.resolve('../src/utils/vectorStore')] = {
  id: require.resolve('../src/utils/vectorStore'),
  filename: require.resolve('../src/utils/vectorStore'),
  loaded: true,
  exports: mockVectorStore
};
require.cache[require.resolve('pdf-parse')] = {
  id: require.resolve('pdf-parse'),
  filename: require.resolve('pdf-parse'),
  loaded: true,
  exports: mockPdf
};
require.cache[require.resolve('fs')] = {
    id: 'fs',
    filename: 'fs',
    loaded: true,
    exports: { ...fs, ...mockFs }
};

const aiController = require('../src/controllers/aiController');

async function testBatching() {
  console.log('Testing batch optimization in uploadKnowledge...');

  const req = {
    file: { path: 'test.pdf', originalname: 'test.pdf' },
    user: { id: 'user123' }
  };
  const res = {
    status: function() { return this; },
    json: function(data) { this.data = data; }
  };

  await aiController.uploadKnowledge(req, res);

  console.log(`- Batch embedding calls: ${mockEmbeddings.batchCalls}`);
  console.log(`- Single upsert calls: ${mockVectorStore.singleUpsertCalls}`);
  console.log(`- Batch upsert calls: ${mockVectorStore.batchUpsertCalls}`);

  assert.strictEqual(mockEmbeddings.batchCalls, 1, 'Should have made 1 batch embedding call');
  assert.strictEqual(mockVectorStore.singleUpsertCalls, 0, 'Should have made 0 single upsert calls');
  assert.strictEqual(mockVectorStore.batchUpsertCalls, 1, 'Should have made 1 batch upsert call');

  console.log('✅ Batch optimization verified successfully!');
}

testBatching().catch(err => {
  console.error('❌ Verification failed:', err);
  process.exit(1);
});
