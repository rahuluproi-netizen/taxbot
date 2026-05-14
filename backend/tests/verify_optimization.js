
const CHUNKS_COUNT = 50;
const SIMULATED_LATENCY_EMBEDDING = 100; // ms
const SIMULATED_LATENCY_UPSERT = 50; // ms
const SIMULATED_LATENCY_BATCH_EMBEDDING = 150; // ms
const SIMULATED_LATENCY_BATCH_UPSERT = 70; // ms

async function sequentialProcess() {
    const start = Date.now();
    for (let i = 0; i < CHUNKS_COUNT; i++) {
        // Simulate generateEmbedding
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_EMBEDDING));
        // Simulate upsertVector
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_UPSERT));
    }
    const end = Date.now();
    return end - start;
}

async function batchedProcess() {
    const start = Date.now();
    const batchSize = 100;
    for (let i = 0; i < CHUNKS_COUNT; i += batchSize) {
        // Simulate generateBatchEmbeddings
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_BATCH_EMBEDDING));
        // Simulate upsertVectors
        await new Promise(resolve => setTimeout(resolve, SIMULATED_LATENCY_BATCH_UPSERT));
    }
    const end = Date.now();
    return end - start;
}

async function runBenchmark() {
    console.log(`--- Benchmarking ${CHUNKS_COUNT} chunks ---`);

    const seqTime = await sequentialProcess();
    console.log(`Sequential processing time: ${seqTime}ms`);

    const batchTime = await batchedProcess();
    console.log(`Batched processing time: ${batchTime}ms`);

    const speedup = (seqTime / batchTime).toFixed(2);
    console.log(`Estimated Speedup: ${speedup}x`);

    if (batchTime < seqTime) {
        console.log('✅ Batching is significantly faster!');
    } else {
        console.log('❌ Batching is not faster in this simulation.');
    }
}

runBenchmark().catch(console.error);
