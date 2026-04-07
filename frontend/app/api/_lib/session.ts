/**
 * Shared in-memory session store.
 * Note: Vercel Functions are stateless between cold starts.
 * For production scale, replace with Vercel KV / Redis.
 */
export type Session = {
  raw: string;
  skills: string[];
  predictions: { role: string; probability: number }[];
};

// Module-level map — persists across warm invocations of the same function instance
export const sessions = new Map<string, Session>();

/** Call OpenAI chat completion and return the text response. */
export async function callOpenAI(prompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  // Mock mode — useful for local dev without a real key
  if (!apiKey || process.env.MOCK_AI === 'true') {
    return getMockResponse(prompt);
  }

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are MetaRole AI, a cyberpunk career co-pilot. Always respond with valid JSON when asked.',
        },
        { role: 'user', content: prompt },
      ],
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('[OpenAI Error]', res.status, err);
    return getMockResponse(prompt);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? getMockResponse(prompt);
}

/** Strip markdown code fences so JSON.parse works. */
export function stripCodeFences(text: string): string {
  return text
    .replace(/```json\s*/gi, '')
    .replace(/```\s*/g, '')
    .trim();
}

function getMockResponse(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('predict') || p.includes('career')) {
    return JSON.stringify([
      { role: 'Senior AI Architect', probability: 0.92 },
      { role: 'Web3 Lead Developer', probability: 0.85 },
      { role: 'Cybersecurity Consultant', probability: 0.76 },
    ]);
  }
  if (p.includes('skill') && p.includes('graph')) {
    return JSON.stringify({
      skills: ['Python', 'JavaScript', 'FastAPI', 'Next.js', 'Docker', 'React'],
      graph: {
        nodes: [
          { id: 'Python', group: 1 },
          { id: 'FastAPI', group: 1 },
          { id: 'JavaScript', group: 2 },
          { id: 'React', group: 2 },
        ],
        edges: [
          { source: 'Python', target: 'FastAPI' },
          { source: 'JavaScript', target: 'React' },
        ],
      },
    });
  }
  if (p.includes('job') && p.includes('match')) {
    return JSON.stringify({
      jobs: [
        { id: 'j1', title: 'AI Engineer', company: 'Neuralink', score: 98, location: 'Remote' },
        { id: 'j2', title: 'Senior Dev', company: 'SpaceX', score: 85, location: 'Remote' },
        { id: 'j3', title: 'Full Stack Dev', company: 'Vercel', score: 80, location: 'Remote' },
      ],
    });
  }
  return 'MOCK: MetaRole AI is processing your request.';
}
