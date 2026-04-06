const sessions = new Map();
// sessions.set(analysisId, { skills: [...], resumeText: '...' });

export function uploadResume(req, res) {
  const { content } = req.body || {};
  if (!content) {
    return res.status(400).json({ error: 'content is required' });
  }
  const id = `sess_${Date.now().toString(36)}`;
  sessions.set(id, { raw: content });
  return res.json({ analysisId: id });
}

export { sessions };
