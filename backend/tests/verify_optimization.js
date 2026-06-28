const assert = require('assert');

// Set dummy API key to avoid fallback to mock object in vectorStore.js
process.env.PINECONE_API_KEY = 'dummy';

// Mock external dependencies
let geminiBatchCalls = 0;
let pineconeUpsertCalls = 0;

const mockGemini = {
    getGenerativeModel: () => ({
        batchEmbedContents: async (req) => {
            geminiBatchCalls++;
            return {
                embeddings: req.requests.map(() => ({ values: Array(1536).fill(0.1) }))
            };
        },
        embedContent: async () => {
            return { embedding: { values: Array(1536).fill(0.1) } };
        }
    })
};

const mockPinecone = {
    index: () => ({
        upsert: async () => {
            pineconeUpsertCalls++;
            return {};
        }
    })
};

// Override require cache to inject mocks BEFORE requiring the modules
require.cache[require.resolve('@google/generative-ai')] = {
    id: require.resolve('@google/generative-ai'),
    exports: { GoogleGenerativeAI: function() { return mockGemini; } },
    filename: require.resolve('@google/generative-ai'),
    loaded: true
};

require.cache[require.resolve('@pinecone-database/pinecone')] = {
    id: require.resolve('@pinecone-database/pinecone'),
    exports: { Pinecone: function() { return mockPinecone; } },
    filename: require.resolve('@pinecone-database/pinecone'),
    loaded: true
};

// Load the optimized modules
const { generateBatchEmbeddings } = require('../src/utils/embeddings');
const { upsertVectors } = require('../src/utils/vectorStore');

async function testOptimization() {
    console.log('Running optimization verification...');

    const numChunks = 250;
    const chunks = Array(numChunks).fill('Some text content for testing batching optimization.');

    // 1. Test Batch Embeddings
    console.log(`- Testing batch embeddings for ${numChunks} chunks...`);
    const embeddings = await generateBatchEmbeddings(chunks);
    assert.strictEqual(embeddings.length, numChunks);

    // 250 chunks / 100 batch size = 3 calls
    console.log(`  Gemini batch calls: ${geminiBatchCalls}`);
    assert.strictEqual(geminiBatchCalls, 3, 'Should have made 3 batch calls to Gemini');

    // 2. Test Batch Upsert
    console.log(`- Testing batch upsert for ${numChunks} vectors...`);
    const vectors = chunks.map((c, i) => ({ id: `id_${i}`, values: embeddings[i], metadata: {} }));
    await upsertVectors(vectors);

    console.log(`  Pinecone upsert calls: ${pineconeUpsertCalls}`);
    assert.strictEqual(pineconeUpsertCalls, 1, 'Should have made 1 upsert call to Pinecone');

    console.log('\n✅ Optimization verified successfully!');
    console.log(`Total network roundtrips reduced from ${numChunks * 2} to ${geminiBatchCalls + pineconeUpsertCalls}`);
    console.log(`Reduction: ${((numChunks * 2) / (geminiBatchCalls + pineconeUpsertCalls)).toFixed(1)}x fewer requests.`);
}

testOptimization().catch(err => {
    console.error('❌ Verification failed:', err);
    process.exit(1);
});
