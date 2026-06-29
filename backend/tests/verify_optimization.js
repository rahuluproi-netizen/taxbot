const assert = require('assert');

// Mock dependencies
let batchEmbedCalls = 0;
let upsertVectorsCalls = 0;

const mockEmbeddings = {
    generateBatchEmbeddings: async (texts) => {
        batchEmbedCalls++;
        return texts.map(() => new Array(768).fill(0));
    }
};

const mockVectorStore = {
    upsertVectors: async (vectors) => {
        upsertVectorsCalls++;
        return Promise.resolve();
    }
};

// Mock modules in require cache
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
    exports: async () => ({ text: 'chunk '.repeat(30000) })
};
require.cache[require.resolve('fs')] = {
    id: require.resolve('fs'),
    filename: require.resolve('fs'),
    loaded: true,
    exports: {
        readFileSync: () => Buffer.from('mock pdf'),
        unlinkSync: () => {}
    }
};

const aiController = require('../src/controllers/aiController');

async function testOptimization() {
    console.log('Running final optimization verification...');

    const req = {
        file: { path: 'mock.pdf', originalname: 'mock.pdf' },
        user: { id: 'user123' }
    };
    const res = {
        status: function(code) { this.statusCode = code; return this; },
        json: function(data) { this.data = data; }
    };

    await aiController.uploadKnowledge(req, res);

    console.log(`Total chunks processed: ${res.data.chunks}`);
    console.log(`Batch embedding calls: ${batchEmbedCalls}`);
    console.log(`Batch upsert calls: ${upsertVectorsCalls}`);

    const expectedCalls = Math.ceil(res.data.chunks / 100);

    assert.strictEqual(batchEmbedCalls, expectedCalls, `Expected ${expectedCalls} batch embed calls, but got ${batchEmbedCalls}`);
    assert.strictEqual(upsertVectorsCalls, expectedCalls, `Expected ${expectedCalls} batch upsert calls, but got ${upsertVectorsCalls}`);

    console.log('✅ Optimization verified!');
}

testOptimization().catch(err => {
    console.error('❌ Verification failed:', err);
    process.exit(1);
});
