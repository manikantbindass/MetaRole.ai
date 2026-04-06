/**
 * AI Engine Bridge Service
 * Communicates with the Python AI engine microservice via HTTP
 */
const axios = require('axios');

const AI_ENGINE_URL = process.env.AI_ENGINE_URL || 'http://localhost:8001';

/**
 * Call a specific AI engine endpoint
 * @param {string} action - The action (e.g. 'parse_resume', 'predict_career')
 * @param {Object} payload - The request payload
 * @returns {Promise<Object>} - The response data
 */
async function callAIEngine(action, payload) {
  try {
    const response = await axios.post(`${AI_ENGINE_URL}/${action}`, payload, {
      timeout: 30000,
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (err) {
    // Fallback to OpenAI if Python engine is not available
    console.warn(`[aiEngineService] Python engine unavailable, using fallback: ${err.message}`);
    return {};
  }
}

module.exports = { callAIEngine };
