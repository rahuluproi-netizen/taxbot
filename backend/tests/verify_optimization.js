const assert = require('assert');
const path = require('path');

// Mock dependencies
let batchEmbedCalls = 0;
let upsertCalls = 0;

const mockEmbeddingModel = {
  batchEmbedContents: async (req) => {
    batchEmbedCalls++;
    return {
      embeddings: req.requests.map(() => ({ values: [0.1, 0.2] }))
    };
  }
};

const mockIndex = {
  upsert: async (vectors) => {
    upsertCalls++;
    assert(Array.isArray(vectors), 'Upsert should receive an array');
    return {};
  }
};

// Override require cache for mocks
require.cache[require.resolve('../src/utils/embeddings')] = {
  id: require.resolve('../src/utils/embeddings'),
  filename: require.resolve('../src/utils/embeddings'),
  loaded: true,
  exports: {
    generateEmbedding: async () => [0.1, 0.2],
    generateBatchEmbeddings: async (texts) => {
      const result = await mockEmbeddingModel.batchEmbedContents({
        requests: texts.map(text => ({ content: { parts: [{ text }] } }))
      });
      return result.embeddings.map(e => e.values);
    }
  }
};

require.cache[require.resolve('../src/utils/vectorStore')] = {
  id: require.resolve('../src/utils/vectorStore'),
  filename: require.resolve('../src/utils/vectorStore'),
  loaded: true,
  exports: {
    upsertVectors: async (vectors) => {
      await mockIndex.upsert(vectors);
    }
  }
};

// Mock other dependencies for aiController
require.cache[require.resolve('pdf-parse')] = {
  id: require.resolve('pdf-parse'),
  filename: require.resolve('pdf-parse'),
  loaded: true,
  exports: async () => ({ text: 'a'.repeat(3000) }) // Will create multiple chunks
};
require.cache[require.resolve('fs')] = {
  id: require.resolve('fs'),
  filename: require.resolve('fs'),
  loaded: true,
  exports: {
    readFileSync: () => Buffer.from('mock data'),
    unlinkSync: () => {}
  }
};

const aiController = require('../src/controllers/aiController');

async function testUploadKnowledge() {
  console.log('Running testUploadKnowledge...');
  const req = {
    file: { path: 'mock/path', originalname: 'test.pdf' },
    user: { id: 'user123' }
  };
  const res = {
    json: (data) => {
      console.log('Response:', data);
      assert(data.chunks > 1, 'Should have more than 1 chunk');
      assert.strictEqual(batchEmbedCalls, 1, 'Should call batchEmbedContents once for all chunks');
      assert.strictEqual(upsertCalls, 1, 'Should call upsert once for all chunks');
      console.log('✅ testUploadKnowledge passed!');
    },
    status: (code) => ({ json: (data) => console.error('Error Response:', code, data) })
  };

  await aiController.uploadKnowledge(req, res);
}

testUploadKnowledge().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
