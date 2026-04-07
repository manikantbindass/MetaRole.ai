import { NextRequest, NextResponse } from 'next/server';
import { sessions, callOpenAI, stripCodeFences } from '../_lib/session';

export async function GET(req: NextRequest) {
  const analysisId = req.nextUrl.searchParams.get('analysisId') ?? '';
  const sess = sessions.get(analysisId);
  if (!sess) {
    return NextResponse.json({ error: 'Session not found. Please re-upload your resume.' }, { status: 404 });
  }

  const prompt = `Find 3 relevant job openings for a candidate with these skills: ${JSON.stringify(sess.skills.length ? sess.skills : ['programming', 'software development'])}

Return ONLY valid JSON with this shape:
{
  "jobs": [
    {"id": "j1", "title": "Job Title", "company": "Company Name", "score": 95, "location": "Remote / City"},
    ...
  ]
}`;

  const raw = await callOpenAI(prompt);
  try {
    return NextResponse.json(JSON.parse(stripCodeFences(raw)));
  } catch {
    return NextResponse.json({ jobs: [] });
  }
}
