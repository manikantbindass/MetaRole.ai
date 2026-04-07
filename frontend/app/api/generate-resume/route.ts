import { NextRequest, NextResponse } from 'next/server';
import { sessions, callOpenAI } from '../_lib/session';

export async function POST(req: NextRequest) {
  const { analysisId, jobTitle } = await req.json();
  const sess = sessions.get(analysisId ?? '');
  if (!sess) {
    return NextResponse.json({ error: 'Session not found. Please re-upload your resume.' }, { status: 404 });
  }

  const role = jobTitle ?? 'Software Engineer';
  const prompt = `Using this resume:
${sess.raw}

Skills: ${JSON.stringify(sess.skills)}

Write a concise, ATS-optimised resume tailored for the role: "${role}".
Format it with clear sections: Summary, Skills, Experience, Education.
Use plain text, no markdown symbols other than line breaks.`;

  const resume = await callOpenAI(prompt);
  return NextResponse.json({ resume });
}
