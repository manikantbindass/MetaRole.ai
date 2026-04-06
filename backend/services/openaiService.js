import OpenAI from 'openai';

let _client = null;

function getClient() {
  if (!_client) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not set. Add it to backend/.env');
    }
    _client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return _client;
}

export async function chat(prompt, system = 'You are MetaRole AI.') {
  if (process.env.MOCK_AI === 'true') {
    return getMockResponse(prompt);
  }

  try {
    const client = getClient();
    const res = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: prompt },
      ],
    });
    return res.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('[OpenAI Error]', error.message);
    if (error.message.includes('quota') || error.message.includes('key')) {
      console.warn('Falling back to mock response due to API quota/key issue.');
      return getMockResponse(prompt);
    }
    throw error;
  }
}

function getMockResponse(prompt) {
  // Simple heuristic mock response based on prompt context
  if (prompt.toLowerCase().includes('job match') || prompt.toLowerCase().includes('jobmatch')) {
    return JSON.stringify([
      { id: 'm001', title: 'Senior AI Engineer', company: 'FutureTech', score: 95, location: 'Remote', link: '#' },
      { id: 'm002', title: 'Full Stack Developer', company: 'GlobalSoft', score: 88, location: 'New York, NY', link: '#' },
      { id: 'm003', title: 'Product Manager', company: 'Visionary AI', score: 82, location: 'Remote', link: '#' }
    ]);
  }
  if (prompt.toLowerCase().includes('skill') && prompt.toLowerCase().includes('gap')) {
    return JSON.stringify({
      presentSkills: [{ skill: 'JavaScript', relevance: 'high' }, { skill: 'React', relevance: 'high' }],
      missingSkills: [{ skill: 'TypeScript', priority: 'critical', timeToLearn: '2 weeks', resources: ['Official Docs'] }],
      skillMatchScore: 75,
      readinessLevel: 'almost-ready',
      recommendations: ['Learn TypeScript', 'Build a personal portfolio'],
      learningPath: [{ week: 1, focus: 'TS Basics', skills: ['TS'] }]
    });
  }
  if (prompt.toLowerCase().includes('career') || prompt.toLowerCase().includes('predict')) {
    return JSON.stringify([
      { role: 'CTO', probability: 0.65 },
      { role: 'Lead Architect', probability: 0.85 },
      { role: 'AI Researcher', probability: 0.45 }
    ]);
  }
  return "This is a mock response from MetaRole AI. Your API key might be out of credits, but the system is still functional for demonstration purposes.";
}
