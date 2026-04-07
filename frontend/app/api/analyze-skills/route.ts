import { NextRequest, NextResponse } from 'next/server';
import { sessions, callOpenAI, stripCodeFences } from '../_lib/session';

export async function GET(req: NextRequest) {
  const analysisId = req.nextUrl.searchParams.get('analysisId') ?? '';

  let sess = sessions.get(analysisId);
  if (!sess) {
    return NextResponse.json({ error: 'Session not found. Please re-upload your resume.' }, { status: 404 });
  }

  const prompt = `Extract all technical and soft skills from this resume and return a D3.js-compatible skill graph.
Resume:
${sess.raw}

Return ONLY valid JSON with this exact shape:
{
  "skills": ["skill1", "skill2", ...],
  "graph": {
    "nodes": [{"id": "skill", "group": 1}, ...],
    "edges": [{"source": "skill1", "target": "skill2"}, ...]
  }
}`;

  const raw = await callOpenAI(prompt);
  try {
    const data = JSON.parse(stripCodeFences(raw));
    sess.skills = Array.isArray(data.skills) ? data.skills : [];
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ skills: [], graph: { nodes: [], edges: [] } });
  }
}
