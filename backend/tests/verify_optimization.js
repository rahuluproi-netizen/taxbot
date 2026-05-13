
const LATENCY_MS = 200;

async function mockGenerateEmbedding(text) {
    return new Promise(resolve => setTimeout(() => resolve(new Array(768).fill(0.1)), LATENCY_MS));
}

async function mockGenerateBatchEmbeddings(texts) {
    // Gemini batch embedding is one call
    return new Promise(resolve => setTimeout(() => resolve(texts.map(() => new Array(768).fill(0.1))), LATENCY_MS));
}

async function mockUpsertVector(id, values, metadata) {
    return new Promise(resolve => setTimeout(() => resolve(), LATENCY_MS));
}

async function mockUpsertVectors(vectors) {
    // Pinecone batch upsert is one call
    return new Promise(resolve => setTimeout(() => resolve(), LATENCY_MS));
}

async function runSequential(chunks) {
    console.log(`Running sequential for ${chunks.length} chunks...`);
    const start = Date.now();
    for (let i = 0; i < chunks.length; i++) {
        const embedding = await mockGenerateEmbedding(chunks[i]);
        await mockUpsertVector(`id_${i}`, embedding, { text: chunks[i] });
    }
    const end = Date.now();
    return end - start;
}

async function runBatched(chunks, batchSize = 100) {
    console.log(`Running batched (size ${batchSize}) for ${chunks.length} chunks...`);
    const start = Date.now();

    for (let i = 0; i < chunks.length; i += batchSize) {
        const batch = chunks.slice(i, i + batchSize);
        const embeddings = await mockGenerateBatchEmbeddings(batch);
        const vectors = batch.map((text, j) => ({
            id: `id_${i + j}`,
            values: embeddings[j],
            metadata: { text }
        }));
        await mockUpsertVectors(vectors);
    }

    const end = Date.now();
    return end - start;
}

async function main() {
    const numChunks = 50;
    const chunks = new Array(numChunks).fill("This is a sample chunk of text for testing batching performance.");

    const seqTime = await runSequential(chunks);
    console.log(`Sequential Time: ${seqTime}ms`);

    const batchTime = await runBatched(chunks);
    console.log(`Batched Time: ${batchTime}ms`);

    const improvement = ((seqTime - batchTime) / seqTime * 100).toFixed(2);
    console.log(`Improvement: ${improvement}%`);

    if (batchTime < seqTime) {
        console.log("✅ Batching is significantly faster!");
    } else {
        console.log("❌ Batching did not show improvement in this mock.");
    }
}

main().catch(console.error);
