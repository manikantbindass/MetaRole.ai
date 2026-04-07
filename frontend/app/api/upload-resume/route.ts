import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { sessions } from '../_lib/session';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') ?? '';
    let resumeText = '';

    if (contentType.includes('multipart/form-data')) {
      // File upload — extract text server-side
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const pastedText = formData.get('content') as string | null;

      if (pastedText) {
        resumeText = pastedText;
      } else if (file) {
        // Read the file as text (works for .txt; PDFs need pdfjs)
        const buffer = await file.arrayBuffer();
        const bytes = new Uint8Array(buffer);

        if (file.name.toLowerCase().endsWith('.pdf')) {
          // For PDF: return an error asking the user to paste text instead
          // (pdfjs-dist is not available in Edge/Node without native deps)
          return NextResponse.json(
            {
              error:
                'PDF binary detected. Please paste your resume as plain text for best results.',
            },
            { status: 422 }
          );
        }

        // For plain text / docx-as-text files
        resumeText = new TextDecoder('utf-8').decode(bytes);
      }
    } else {
      // JSON body
      const body = await req.json();
      resumeText = body?.content ?? '';
    }

    if (!resumeText || resumeText.trim().length < 20) {
      return NextResponse.json(
        { error: 'Resume content is too short or empty.' },
        { status: 400 }
      );
    }

    const analysisId = randomUUID();
    sessions.set(analysisId, { raw: resumeText.trim(), skills: [], predictions: [] });

    return NextResponse.json({ analysisId });
  } catch (err: any) {
    console.error('[upload-resume]', err);
    return NextResponse.json({ error: err.message ?? 'Internal error' }, { status: 500 });
  }
}
