const fs = require('fs');
const path = require('path');

// Must mock pdf-parse BEFORE requiring aiController
const mockPdfParse = async () => ({ text: 'A'.repeat(200000) });
require.cache[require.resolve('pdf-parse')] = {
    exports: mockPdfParse
};

// Mock embeddings and vectorStore utilities BEFORE requiring aiController
const mockEmbeddings = {
    generateEmbedding: async () => new Array(768).fill(0),
    generateBatchEmbeddings: async (texts) => {
        batchEmbeddingsCalls++;
        return texts.map(() => new Array(768).fill(0));
    }
};
require.cache[require.resolve('../src/utils/embeddings')] = {
    exports: mockEmbeddings
};

const mockVectorStore = {
    upsertVector: async () => Promise.resolve(),
    upsertVectors: async (vectors) => {
        upsertVectorsCalls++;
        return Promise.resolve();
    },
    queryVectors: async () => []
};
require.cache[require.resolve('../src/utils/vectorStore')] = {
    exports: mockVectorStore
};

const { uploadKnowledge } = require('../src/controllers/aiController');

let batchEmbeddingsCalls = 0;
let upsertVectorsCalls = 0;

async function testUploadKnowledgeBatching() {
    console.log('Starting batching optimization test...');

    const req = {
        file: {
            path: 'test.pdf',
            originalname: 'test.pdf'
        },
        user: { id: 'user123' }
    };

    const res = {
        json: (data) => {
            console.log('Response:', data);

            const expectedBatches = Math.ceil(data.chunks / 100);

            console.log(`Chunks: ${data.chunks}`);
            console.log(`Expected batches: ${expectedBatches}`);
            console.log(`Actual generateBatchEmbeddings calls: ${batchEmbeddingsCalls}`);
            console.log(`Actual upsertVectors calls: ${upsertVectorsCalls}`);

            if (batchEmbeddingsCalls === expectedBatches && upsertVectorsCalls === expectedBatches && batchEmbeddingsCalls > 1) {
                console.log('✅ TEST PASSED: Batching logic is working correctly.');
                process.exit(0);
            } else {
                console.error('❌ TEST FAILED: Batching logic incorrect or insufficient chunks for batching.');
                process.exit(1);
            }
        },
        status: (code) => ({
            json: (data) => {
                console.error(`Error ${code}:`, data);
                process.exit(1);
            }
        })
    };

    const originalReadFileSync = fs.readFileSync;
    const originalUnlinkSync = fs.unlinkSync;

    fs.readFileSync = () => Buffer.from('mock pdf');
    fs.unlinkSync = () => {};

    try {
        await uploadKnowledge(req, res);
    } catch (err) {
        console.error('Unexpected error:', err);
        process.exit(1);
    } finally {
        fs.readFileSync = originalReadFileSync;
        fs.unlinkSync = originalUnlinkSync;
    }
}

testUploadKnowledgeBatching();
