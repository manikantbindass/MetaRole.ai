/**
 * Vector Database Service
 * Handles semantic search via Pinecone (or FAISS as fallback)
 */
const { Pinecone } = require('@pinecone-database/pinecone');
const OpenAI = require('openai');

let pinecone = null;
let index = null;

async function initPinecone() {
  if (!process.env.PINECONE_API_KEY) {
    console.warn('[vectorService] PINECONE_API_KEY not set, vector search disabled');
    return;
  }
  try {
    pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
    index = pinecone.index(process.env.PINECONE_INDEX || 'metarole-jobs');
    console.log('[vectorService] Pinecone initialized');
  } catch (err) {
    console.warn('[vectorService] Pinecone init failed:', err.message);
  }
}

/**
 * Generate OpenAI embedding for text
 */
async function embedText(text) {
  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text
  });
  return response.data[0].embedding;
}

/**
 * Perform vector similarity search
 * @param {string} queryText - Text to search for
 * @param {number} topK - Number of results to return
 */
async function vectorSearch(queryText, topK = 10) {
  if (!index) return [];
  try {
    const embedding = await embedText(queryText);
    const results = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true
    });
    return results.matches || [];
  } catch (err) {
    console.error('[vectorService] Search failed:', err.message);
    return [];
  }
}

initPinecone();

module.exports = { vectorSearch, embedText };
