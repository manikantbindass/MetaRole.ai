'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [githubUrl, setGithubUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('');
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) setFile(dropped);
  };

  const handleAnalyze = async () => {
    if (!file && !githubUrl) return;
    setUploading(true);
    setProgress(0);

    const stages = [
      [10, '> Uploading resume...'],
      [25, '> Parsing document structure...'],
      [45, '> Extracting skills & experience...'],
      [65, '> Running AI analysis pipeline...'],
      [80, '> Mapping career trajectories...'],
      [95, '> Generating skill graph...'],
      [100, '> Analysis complete.'],
    ];

    for (const [pct, msg] of stages) {
      await new Promise(r => setTimeout(r, 600));
      setProgress(pct as number);
      setStage(msg as string);
    }

    setDone(true);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      {/* CRT */}
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

      {/* NAV */}
      <nav className="border-b border-[#33ff00]/20 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">← METAROLE_AI</Link>
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
              onDragOver={e => { e.preventDefault(); setDragActive(true); }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              onClick={() => fileRef.current?.click()}
            >
              <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={e => e.target.files?.[0] && setFile(e.target.files[0])} />
              {file ? (
                <div>
                  <div className="text-[#ffb000] text-2xl mb-2">◼</div>
                  <p className="text-[#33ff00] text-sm font-bold">{file.name}</p>
                  <p className="text-[#33ff00]/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</p>
                </div>
              ) : (
                <div>
                  <div className="text-[#33ff00]/30 text-4xl mb-3">▲</div>
                  <p className="text-[#33ff00]/60 text-sm">DROP_FILE_HERE</p>
                  <p className="text-[#33ff00]/30 text-xs mt-2">PDF / DOC / DOCX</p>
                </div>
              )}
            </div>
          </div>

          {/* GitHub input */}
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-3 tracking-widest">METHOD_02: GITHUB_PROFILE</div>
            <div className="border border-[#33ff00]/30 p-6">
              <label className="text-xs tracking-widest text-[#33ff00]/60 block mb-3">GITHUB_URL:</label>
              <div className="flex items-center border border-[#33ff00]/30 bg-[#0d0d0d]">
                <span className="px-3 text-[#33ff00]/40 text-sm">{'>'}</span>
                <input
                  type="text"
                  value={githubUrl}
                  onChange={e => setGithubUrl(e.target.value)}
                  placeholder="github.com/username"
                  className="flex-1 bg-transparent py-3 pr-3 text-sm text-[#33ff00] placeholder:text-[#33ff00]/20 outline-none"
                />
              </div>
              <p className="text-[#33ff00]/30 text-xs mt-3">MetaRole will analyze your public repos, commit history, and pinned projects.</p>
            </div>

            <div className="border border-[#33ff00]/30 p-4 mt-4">
              <div className="text-xs text-[#33ff00]/40 mb-2 tracking-widest">ANALYSIS_OPTIONS:</div>
              {['Deep skill extraction', 'Career path prediction', 'Resume auto-generation', 'Portfolio creation'].map((opt, i) => (
                <label key={i} className="flex items-center gap-3 py-1 cursor-pointer group">
                  <input type="checkbox" defaultChecked className="accent-[#33ff00]" />
                  <span className="text-xs text-[#33ff00]/60 group-hover:text-[#33ff00] transition-colors">{opt}</span>
                </label>
              ))}
            </div>
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

          {done ? (
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/analyze" className="flex-1 border border-[#33ff00] bg-[#33ff00]/10 py-3 text-center text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all">
                [ VIEW_ANALYSIS ]
              </Link>
              <Link href="/dashboard" className="flex-1 border border-[#33ff00]/30 py-3 text-center text-sm tracking-widest text-[#33ff00]/60 hover:border-[#33ff00]/60 hover:text-[#33ff00] transition-all">
                [ GO_TO_DASHBOARD ]
              </Link>
            </div>
          ) : (
            <button
              onClick={handleAnalyze}
              disabled={!file && !githubUrl}
              className="w-full border border-[#33ff00] bg-[#33ff00]/10 py-4 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {uploading ? '[ ANALYZING... ]' : '[ INITIATE_ANALYSIS ]'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
