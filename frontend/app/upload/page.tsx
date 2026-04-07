'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? '';

export default function UploadPage() {
  const router = useRouter();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPdf, setIsPdf] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFileSelect(dropped);
  };

  const handleFileSelect = (f: File) => {
    setFile(f);
    setError(null);

    const isPdfFile = f.name.toLowerCase().endsWith('.pdf');
    setIsPdf(isPdfFile);

    if (isPdfFile) {
      // Don't read PDFs as text — binary content will show as gibberish
      // We'll send the file as FormData to the API for server-side text extraction
      setResumeText('');
    } else {
      // For .txt / .docx files we can read as text
      const reader = new FileReader();
      reader.onload = (evt) => {
        setResumeText((evt.target?.result as string) || '');
      };
      reader.readAsText(f);
    }
  };

  const handleAnalyze = async () => {
    const hasContent = resumeText.trim().length > 0 || (file && isPdf);
    if (!hasContent) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    const stages: [number, string][] = [
      [15, '> Uploading resume...'],
      [30, '> Parsing document structure...'],
      [50, '> Sending to AI pipeline...'],
      [70, '> Analysis in progress...'],
      [90, '> Finalizing session...'],
    ];

    try {
      for (const [pct, msg] of stages) {
        setProgress(pct);
        setStage(msg);
        await new Promise((r) => setTimeout(r, 400));
      }

      let res: Response;

      if (isPdf && file) {
        // Send PDF as FormData — server will attempt text extraction
        const formData = new FormData();
        formData.append('file', file);
        res = await fetch(`${API_BASE}/api/upload-resume`, {
          method: 'POST',
          body: formData,
        });
      } else {
        // Send plain text as JSON
        res = await fetch(`${API_BASE}/api/upload-resume`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: resumeText.trim() }),
        });
      }

      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        if (res.status === 422 && errBody.error?.includes('PDF binary')) {
          // PDF couldn't be parsed server-side — ask user to paste text
          setError(
            'PDF parsing is not supported in the browser. Please paste your resume text in the box on the right instead.'
          );
          setUploading(false);
          setProgress(0);
          return;
        }
        throw new Error(errBody.error || `Upload failed with status ${res.status}`);
      }

      const { analysisId } = await res.json();
      setProgress(100);
      setStage('> Upload complete. Session created.');
      await new Promise((r) => setTimeout(r, 600));
      router.push(`/output?analysisId=${encodeURIComponent(analysisId)}`);
    } catch (e: any) {
      setError(e.message || 'Upload failed. Please try again.');
      setUploading(false);
      setProgress(0);
    }
  };

  const canAnalyze = (!uploading && resumeText.trim().length > 0) || (!uploading && file !== null && isPdf);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      {/* CRT overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{
          background:
            'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)',
        }}
      />

      {/* NAV */}
      <nav className="border-b border-[#33ff00]/20 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">
          ← METAROLE_AI
        </Link>
        <span className="text-[#33ff00]/40 text-xs tracking-widest">UPLOAD_MODULE</span>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// RESUME.UPLOAD</div>
          <h1 className="text-2xl font-bold tracking-widest">UPLOAD_RESUME</h1>
          <div className="w-16 h-px bg-[#33ff00]/40 mt-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload zone */}
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">METHOD_01: FILE_UPLOAD</div>
            <div
              className={`border-2 border-dashed p-10 text-center cursor-pointer transition-all ${
                dragActive ? 'border-[#33ff00] bg-[#33ff00]/10' : 'border-[#33ff00]/30 hover:border-[#33ff00]/60'
              }`}
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input
                ref={fileRef}
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
              />
              {file ? (
                <div>
                  <div className="text-[#ffb000] text-2xl mb-2">◼</div>
                  <p className="text-[#33ff00] text-sm font-bold">{file.name}</p>
                  <p className="text-[#33ff00]/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                  {isPdf && (
                    <p className="text-[#ffb000]/70 text-xs mt-2">
                      ⚠ PDF selected — paste text on the right for best results
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <div className="text-[#33ff00]/30 text-4xl mb-3">▲</div>
                  <p className="text-[#33ff00]/60 text-sm">DROP_FILE_HERE</p>
                  <p className="text-[#33ff00]/30 text-xs mt-2">PDF / DOC / DOCX / TXT</p>
                </div>
              )}
            </div>
          </div>

          {/* Paste text */}
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">METHOD_02: PASTE_TEXT</div>
            <div className="border border-[#33ff00]/30 p-4 h-full">
              <label className="text-xs tracking-widest text-[#33ff00]/60 block mb-2">RESUME_TEXT:</label>
              <textarea
                value={resumeText}
                onChange={(e) => {
                  setResumeText(e.target.value);
                  setIsPdf(false);
                  if (e.target.value.trim()) setFile(null);
                }}
                placeholder="> Paste your resume as plain text here for best AI results..."
                rows={8}
                className="w-full bg-[#0d0d0d] border border-[#33ff00]/20 text-[#33ff00] text-xs p-3 outline-none resize-none placeholder:text-[#33ff00]/20 focus:border-[#33ff00]/50"
              />
              <p className="text-[#33ff00]/30 text-xs mt-2">
                {'>'} Copy & paste from your PDF/Word doc for best AI parsing.
              </p>
            </div>
          </div>
        </div>

        {/* Analysis options */}
        <div className="border border-[#33ff00]/20 p-4 mt-6">
          <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">ANALYSIS_OPTIONS:</div>
          <div className="grid grid-cols-2 gap-2">
            {['Deep skill extraction', 'Career path prediction', 'Resume auto-generation', 'Job matching'].map(
              (opt, i) => (
                <label key={i} className="flex items-center gap-3 py-1 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="accent-[#33ff00]" />
                  <span className="text-xs text-[#33ff00]/60 group-hover:text-[#33ff00] transition-colors">{opt}</span>
                </label>
              )
            )}
          </div>
        </div>

        {/* Progress & Analyze */}
        <div className="mt-8">
          {uploading && (
            <div className="border border-[#33ff00]/20 p-4 mb-6">
              <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">ANALYSIS_PROGRESS:</div>
              <div className="h-1 bg-[#33ff00]/10 mb-3">
                <div className="h-full bg-[#33ff00] transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <p className="text-[#33ff00] text-xs">{stage}</p>
              <p className="text-[#33ff00]/40 text-xs mt-1">{progress}% COMPLETE</p>
            </div>
          )}

          {error && (
            <div className="border border-red-500/40 p-4 mb-6 text-xs text-red-400">
              <p className="font-bold mb-1">{'>'} ERROR</p>
              <p>{error}</p>
            </div>
          )}

          <button
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="w-full border border-[#33ff00] bg-[#33ff00]/10 py-4 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {uploading ? '[ ANALYZING... ]' : '[ INITIATE_ANALYSIS ]'}
          </button>

          <p className="text-[#33ff00]/30 text-xs mt-3 text-center">
            {'>'} Upload a file OR paste text above, then click INITIATE_ANALYSIS
          </p>
        </div>
      </div>
    </main>
  );
}
