import { NextRequest, NextResponse } from 'next/server';
import { sessions, callOpenAI } from '../_lib/session';

export async function POST(req: NextRequest) {
  const { analysisId } = await req.json();
  const sess = sessions.get(analysisId ?? '');
  if (!sess) {
    return NextResponse.json({ error: 'Session not found. Please re-upload your resume.' }, { status: 404 });
  }

  const prompt = `Generate a minimal terminal/hacker-style single-page HTML portfolio website for this person based on their resume:

${sess.raw}

Requirements:
- Only standard HTML + CSS (no external libraries)
- Dark background (#0a0a0a), green terminal text (#33ff00)
- Monospace font
- Include sections: About, Skills, Experience, Projects
- Make it look cool and cyberpunk

Return ONLY the full HTML file, no explanations.`;

  const html = await callOpenAI(prompt);
  return NextResponse.json({ html });
}
