import { NextRequest, NextResponse } from 'next/server';
import { sessions, callOpenAI, stripCodeFences } from '../_lib/session';

export async function GET(req: NextRequest) {
  const analysisId = req.nextUrl.searchParams.get('analysisId') ?? '';
  const sess = sessions.get(analysisId);
  if (!sess) {
    return NextResponse.json({ error: 'Session not found. Please re-upload your resume.' }, { status: 404 });
  }

  const prompt = `Based on these skills: ${JSON.stringify(sess.skills.length ? sess.skills : ['general engineering'])}
and this resume: ${sess.raw.slice(0, 1000)}

Predict the top 3 career paths with probability scores (0 to 1).
Return ONLY valid JSON array:
[{"role": "Job Title", "probability": 0.92}, ...]`;

  const raw = await callOpenAI(prompt);
  try {
    const predictions = JSON.parse(stripCodeFences(raw));
    sess.predictions = Array.isArray(predictions) ? predictions : [];
    return NextResponse.json({ predictions: sess.predictions });
  } catch {
    return NextResponse.json({
      predictions: [{ role: 'Software Engineer', probability: 0.9 }],
    });
  }
}
