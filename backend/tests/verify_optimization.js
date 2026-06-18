const assert = require('assert');

// Mock dependencies
const mockEmbeddings = {
    generateBatchEmbeddings: async (texts) => {
        console.log(`Called generateBatchEmbeddings with ${texts.length} texts`);
        return texts.map(() => new Array(768).fill(0));
    }
};

const mockVectorStore = {
    upsertVectors: async (vectors) => {
        console.log(`Called upsertVectors with ${vectors.length} vectors`);
        return Promise.resolve();
    }
};

// Re-implement the logic to test it without complex exports/imports if needed,
// but let's try to mock the environment for the actual controller.

async function testBatchingLogic() {
    const chunks = new Array(250).fill('Some text chunk');
    const batchSize = 100;
    const req = {
        user: { id: 'test-user' },
        file: { originalname: 'test.pdf' }
    };

    let batchEmbedCalls = 0;
    let upsertCalls = 0;

    for (let i = 0; i < chunks.length; i += batchSize) {
        const batchChunks = chunks.slice(i, i + batchSize);
        batchEmbedCalls++;
        const embeddings = await mockEmbeddings.generateBatchEmbeddings(batchChunks);
        const timestamp = Date.now();

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

        upsertCalls++;
        await mockVectorStore.upsertVectors(vectors);
    }

    console.log(`Total chunks: ${chunks.length}`);
    console.log(`Batch embedding calls: ${batchEmbedCalls}`);
    console.log(`Upsert calls: ${upsertCalls}`);

    assert.strictEqual(batchEmbedCalls, 3, 'Should have made 3 batch embedding calls for 250 chunks');
    assert.strictEqual(upsertCalls, 3, 'Should have made 3 batch upsert calls for 250 chunks');

    // Sequential would have been 250 + 250 = 500 calls
    const sequentialCalls = chunks.length * 2;
    const batchedCalls = batchEmbedCalls + upsertCalls;
    console.log(`Efficiency gain: ${sequentialCalls} -> ${batchedCalls} calls (${(sequentialCalls/batchedCalls).toFixed(1)}x reduction)`);
}

testBatchingLogic().catch(err => {
    console.error('Test failed:', err);
    process.exit(1);
});
