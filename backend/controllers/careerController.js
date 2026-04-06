import { sessions } from './resumeController.js';
import { chat } from '../services/openaiService.js';

export async function predictCareer(req, res) {
  const { analysisId } = req.query;
  const sess = sessions.get(analysisId);
  if (!sess) return res.status(404).json({ error: 'session not found' });

  const prompt = `Given these skills: ${JSON.stringify(
    sess.skills || [],
  )}, return JSON array of { "role": string, "probability": number } describing likely career paths.`;

  try {
    const out = await chat(prompt, 'Return ONLY strict JSON array.');
    let predictions = [];
    try {
      predictions = JSON.parse(out);
    } catch {
      predictions = [];
    }
    sess.predictions = predictions;
    sessions.set(analysisId, sess);
    return res.json({ predictions });
  } catch (e) {
    return res.status(500).json({ error: 'prediction failed' });
  }
}

export async function generateResume(req, res) {
  const { analysisId, jobTitle } = req.body || {};
  const sess = sessions.get(analysisId);
  if (!sess) return res.status(404).json({ error: 'session not found' });

  const prompt = `Using this resume text: ${
    sess.raw
  } and skill set: ${JSON.stringify(
    sess.skills || [],
  )}, generate a concise ATS-friendly resume in plain text${
    jobTitle ? ` tailored for ${jobTitle}` : ''
  }.`;

  try {
    const resume = await chat(prompt);
    sess.generatedResume = resume;
    sessions.set(analysisId, sess);
    return res.json({ resume });
  } catch (e) {
    return res.status(500).json({ error: 'resume generation failed' });
  }
}

export async function generatePortfolio(req, res) {
  const { analysisId } = req.body || {};
  const sess = sessions.get(analysisId);
  if (!sess) return res.status(404).json({ error: 'session not found' });

  const prompt = `Generate a minimal single-page HTML portfolio in a hacker terminal style for this candidate based on resume text: ${sess.raw}`;
  try {
    const html = await chat(prompt);
    sess.portfolioHtml = html;
    sessions.set(analysisId, sess);
    return res.json({ html });
  } catch (e) {
    return res.status(500).json({ error: 'portfolio generation failed' });
  }
}
