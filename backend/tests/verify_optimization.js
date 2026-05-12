/**
 * Manual verification script for uploadKnowledge optimization.
 * This script mocks external dependencies to verify the batching logic.
 */

const fs = require('fs');
const path = require('path');

// 1. Mocking dependencies before requiring the controller
const mockFs = {
  promises: {
    readFile: async () => Buffer.from('mock pdf content'),
    unlink: async () => { console.log('   [Mock] fs.promises.unlink called'); }
  }
};

const mockPdf = async () => ({ text: 'This is a test document with enough text to create multiple chunks for testing purposes. '.repeat(1000) });

const mockEmbeddings = {
  generateBatchEmbeddings: async (batch) => {
    console.log(`   [Mock] generateBatchEmbeddings called for ${batch.length} chunks`);
    return batch.map(() => new Array(1536).fill(0));
  }
};

const mockVectorStore = {
  upsertVectors: async (vectors) => {
    console.log(`   [Mock] upsertVectors called with ${vectors.length} vectors`);
  }
};

// Replace requires in aiController manually for the test
const aiControllerPath = path.resolve(__dirname, '../src/controllers/aiController.js');
let aiControllerContent = fs.readFileSync(aiControllerPath, 'utf8');

// Simple injection for testing
const mockContext = {
    '../config/supabase': {},
    '@google/generative-ai': { GoogleGenerativeAI: class { constructor() {} } },
    'pdf-parse': mockPdf,
    'fs': mockFs,
    '../utils/embeddings': mockEmbeddings,
    '../utils/vectorStore': mockVectorStore
};

// We'll use a hacky way to run the controller with mocks
const Module = require('module');
const originalRequire = Module.prototype.require;
Module.prototype.require = function(path) {
  if (mockContext[path]) return mockContext[path];
  return originalRequire.apply(this, arguments);
};

const { uploadKnowledge } = require('../src/controllers/aiController');

async function runTest() {
  console.log('⚡ Starting Bolt Optimization Verification (Large Document)...');

  const req = {
    file: { path: 'test.pdf', originalname: 'test.pdf' },
    user: { id: 'user_bolt_123' }
  };

  const res = {
    status: function(code) {
      this.statusCode = code;
      console.log(`   [Res] Status: ${code}`);
      return this;
    },
    json: function(data) {
      this.body = data;
      console.log(`   [Res] JSON:`, data);
      return this;
    }
  };

  try {
    await uploadKnowledge(req, res);
    console.log('✅ Verification complete.');
  } catch (error) {
    console.error('❌ Verification failed:', error);
    process.exit(1);
  }
}

runTest();
