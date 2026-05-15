const { uploadKnowledge } = require('../src/controllers/aiController');
const fs = require('fs');

// Mocking dependencies
jest.mock('fs', () => ({
  promises: {
    readFile: jest.fn().mockResolvedValue(Buffer.from('test')),
    unlink: jest.fn().mockResolvedValue(undefined),
  }
}));

jest.mock('pdf-parse', () => jest.fn().mockResolvedValue({ text: 'test content ' }));

jest.mock('../src/utils/embeddings', () => ({
  generateBatchEmbeddings: jest.fn().mockImplementation((texts) => Promise.resolve(texts.map(() => new Array(768).fill(0)))),
  generateEmbedding: jest.fn().mockResolvedValue(new Array(768).fill(0))
}));

jest.mock('../src/utils/vectorStore', () => ({
  upsertVectors: jest.fn().mockResolvedValue(undefined),
  queryVectors: jest.fn().mockResolvedValue([])
}));

describe('uploadKnowledge optimization', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle single batch correctly', async () => {
    const pdf = require('pdf-parse');
    pdf.mockResolvedValueOnce({ text: 'test content '.repeat(200) });

    const req = {
      file: { path: 'test.pdf', originalname: 'test.pdf' },
      user: { id: 'user123' }
    };
    const res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    await uploadKnowledge(req, res);

    const { generateBatchEmbeddings } = require('../src/utils/embeddings');
    const { upsertVectors } = require('../src/utils/vectorStore');

    expect(generateBatchEmbeddings).toHaveBeenCalledTimes(1);
    expect(upsertVectors).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Document indexed successfully!' }));
  });

  it('should handle multiple batches if chunks > BATCH_SIZE', async () => {
      const pdf = require('pdf-parse');
      pdf.mockResolvedValueOnce({ text: 'a'.repeat(120000) }); // ~150 chunks

      const req = {
        file: { path: 'test.pdf', originalname: 'test.pdf' },
        user: { id: 'user123' }
      };
      const res = {
        json: jest.fn(),
        status: jest.fn().mockReturnThis()
      };

      await uploadKnowledge(req, res);

      const { generateBatchEmbeddings } = require('../src/utils/embeddings');
      const { upsertVectors } = require('../src/utils/vectorStore');

      // 120,000 chars / 800 (size-overlap) = 150 chunks.
      // Batch size 100 means 2 batches (100 + 50).
      expect(generateBatchEmbeddings).toHaveBeenCalledTimes(2);
      expect(upsertVectors).toHaveBeenCalledTimes(2);
  });
});
