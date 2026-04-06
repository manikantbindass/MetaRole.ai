/**
 * OpenAI Service
 * Centralized OpenAI API client with retry logic and error handling
 */
const OpenAI = require('openai');

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Call OpenAI Chat Completion API
 * @param {string} prompt - The prompt to send
 * @param {Object} options - Optional overrides (model, max_tokens, temperature)
 * @returns {Promise<string>} - The text response
 */
async function callOpenAI(prompt, options = {}) {
  const {
    model = 'gpt-4o-mini',
    max_tokens = 1500,
    temperature = 0.7,
    systemPrompt = 'You are MetaRole AI, an expert career intelligence system. Always return accurate, structured data.'
  } = options;

  const response = await client.chat.completions.create({
    model,
    max_tokens,
    temperature,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: prompt }
    ]
  });

  return response.choices[0]?.message?.content || '';
}

module.exports = { callOpenAI };
