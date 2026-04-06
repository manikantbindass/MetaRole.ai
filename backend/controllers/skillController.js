import { sessions } from './resumeController.js';
import { chat } from '../services/openaiService.js';

export async function analyzeSkills(req, res) {
  const { analysisId } = req.query;
  const sess = sessions.get(analysisId);
  if (!sess) {
    return res.status(404).json({ error: 'session not found' });
  }
  try {
    const prompt = `Extract a flat JSON array of skills from this resume text (no explanation): ${sess.raw}`;
    const out = await chat(prompt, 'Return ONLY valid JSON array of strings.');
    let skills = [];
    try {
      skills = JSON.parse(out);
    } catch {
      skills = [];
    }
    sess.skills = skills;
    sessions.set(analysisId, sess);
    return res.json({
      skills,
      graph: { nodes: [], edges: [] },
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'skill analysis failed' });
  }
}
