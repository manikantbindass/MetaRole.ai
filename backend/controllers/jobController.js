import { sessions } from './resumeController.js';
import { chat } from '../services/openaiService.js';

export async function jobMatch(req, res) {
  const { analysisId } = req.query;
  const sess = sessions.get(analysisId);
  if (!sess) return res.status(404).json({ error: 'session not found' });

  const prompt = `Given skills: ${JSON.stringify(
    sess.skills || [],
  )}, return JSON array of up to 10 job matches in the format { "id": string, "title": string, "company": string, "score": number, "location": string, "link": string }. Use fictional but realistic data.`;

  try {
    const out = await chat(prompt, 'Return ONLY strict JSON array of jobs.');
    let jobs = [];
    try {
      const parsed = JSON.parse(out);
      jobs = Array.isArray(parsed) ? parsed : (parsed.jobs || []);
    } catch {
      jobs = [];
    }
    sess.jobs = jobs;
    sessions.set(analysisId, sess);
    return res.json({ jobs });
  } catch (e) {
    return res.status(500).json({ error: 'job match failed' });
  }
}
