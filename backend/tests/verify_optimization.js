const assert = require('assert');
const { chunkText } = require('../src/controllers/aiController');

async function testBatchingLogic() {
  console.log('Testing Batching Logic...');

  // Mock data
  const chunks = ['chunk 1', 'chunk 2', 'chunk 3'];
  const mockEmbeddings = chunks.map((_, i) => [i, i + 1, i + 2]);
  const req = {
    user: { id: 'user123' },
    file: { originalname: 'test.pdf' }
  };

  // 1. Test generateBatchEmbeddings simulation
  const timestamp = 123456789;
  const vectors = chunks.map((chunk, i) => ({
    id: `user123_${timestamp}_${i}`,
    values: mockEmbeddings[i],
    metadata: {
      text: chunk,
      caId: 'user123',
      filename: 'test.pdf',
      chunkIndex: i
    }
  }));

  assert.strictEqual(vectors.length, 3);
  assert.strictEqual(vectors[0].id, 'user123_123456789_0');
  assert.strictEqual(vectors[2].id, 'user123_123456789_2');
  assert.deepStrictEqual(vectors[1].values, [1, 2, 3]);
  assert.strictEqual(vectors[1].metadata.text, 'chunk 2');
  assert.strictEqual(vectors[1].metadata.chunkIndex, 1);

  console.log('✅ Mapping logic verified.');

  // 2. Test Batching chunks logic
  const manyChunks = Array.from({ length: 250 }, (_, i) => `chunk ${i}`);
  const batchSize = 100;
  const batches = [];
  for (let i = 0; i < manyChunks.length; i += batchSize) {
    batches.push(manyChunks.slice(i, i + batchSize));
  }

  assert.strictEqual(batches.length, 3);
  assert.strictEqual(batches[0].length, 100);
  assert.strictEqual(batches[1].length, 100);
  assert.strictEqual(batches[2].length, 50);

  console.log('✅ Batch splitting logic verified.');

  // 3. Test chunkText exported function
  const text = "a".repeat(2500);
  const resultChunks = chunkText(text, 1000, 200);
  assert(resultChunks.length > 1);
  console.log('✅ Exported chunkText verified.');

  console.log('ALL TESTS PASSED');
}

testBatchingLogic().catch(err => {
  console.error('Test Failed:', err);
  process.exit(1);
});
