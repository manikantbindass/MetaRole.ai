'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'done' | 'error';

export default function UploadPage() {
  const router = useRouter();
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const [dragging, setDragging] = useState(false);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const simulateUpload = async () => {
    setStatus('uploading');
    setLogs([]);
    addLog('[INIT] MetaRole AI Engine v2.4.1 — Starting upload sequence...');
    for (let i = 0; i <= 40; i += 5) {
      await new Promise(r => setTimeout(r, 120));
      setProgress(i);
    }
    addLog('[OK] File received — validating format...');
    await new Promise(r => setTimeout(r, 400));
    addLog('[OK] Format validated: PDF/DOCX — Initiating AI parser...');
    setStatus('parsing');
    for (let i = 40; i <= 85; i += 5) {
      await new Promise(r => setTimeout(r, 180));
      setProgress(i);
    }
    addLog('[AI] Extracting skills, experience, education, projects...');
    await new Promise(r => setTimeout(r, 600));
    addLog('[AI] NLP skill extraction complete — 34 skills identified');
    addLog('[AI] Work history parsed — 3 positions found');
    addLog('[AI] Education profile built — B.Tech CS detected');
    addLog('[AI] GitHub repositories linked — 12 projects analyzed');
    for (let i = 85; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 100));
      setProgress(i);
    }
    addLog('[DONE] Analysis complete — Redirecting to dashboard...');
    setStatus('done');
    setTimeout(() => router.push('/dashboard'), 1200);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) setFile(f);
  }, []);

  return (
    <main className="bg-terminal-bg text-terminal-green font-mono min-h-screen relative">
      <div className="scanline-overlay pointer-events-none" />

      {/* NAV */}
      <nav className="border-b border-terminal-green/30 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-terminal-green font-bold tracking-widest">
          <span className="text-terminal-amber">{'>'}</span> METAROLE<span className="text-terminal-amber">.AI</span>
        </Link>
        <span className="text-terminal-green/40 text-xs">UPLOAD_MODULE v2.4</span>
      </nav>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-10">
          <div className="text-terminal-amber text-xs tracking-widest mb-2">// STEP_01: UPLOAD_RESUME //</div>
          <h1 className="text-3xl font-bold text-terminal-green mb-3">UPLOAD YOUR RESUME</h1>
          <p className="text-terminal-green/60 text-sm">{'>'} Supports PDF, DOCX, TXT — or paste your GitHub URL to auto-pull projects</p>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={onDrop}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          className={`border-2 border-dashed p-12 text-center transition-all cursor-pointer mb-6 ${
            dragging ? 'border-terminal-green bg-terminal-green/10' : 'border-terminal-green/30 hover:border-terminal-green/60'
          }`}
          onClick={() => document.getElementById('file-input')?.click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={e => setFile(e.target.files?.[0] || null)}
          />
          <div className="text-4xl mb-4 text-terminal-green/40">{file ? '◈' : '▲'}</div>
          {file ? (
            <div>
              <p className="text-terminal-green font-bold">{file.name}</p>
              <p className="text-terminal-green/50 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB — Ready to parse</p>
            </div>
          ) : (
            <div>
              <p className="text-terminal-green/70 mb-1">DROP_FILE_HERE or CLICK_TO_BROWSE</p>
              <p className="text-terminal-green/40 text-xs">PDF · DOCX · TXT — max 10MB</p>
            </div>
          )}
        </div>

        {/* GitHub URL */}
        <div className="mb-6">
          <label className="text-terminal-amber text-xs tracking-wider block mb-2">{'>'} GITHUB_PROFILE_URL (optional)</label>
          <input
            type="url"
            value={githubUrl}
            onChange={e => setGithubUrl(e.target.value)}
            placeholder="https://github.com/username"
            className="w-full border border-terminal-green/30 bg-transparent text-terminal-green px-4 py-2 text-sm focus:border-terminal-green outline-none"
          />
        </div>

        {/* Progress / Logs */}
        {status !== 'idle' && (
          <div className="border border-terminal-green/30 mb-6">
            <div className="px-4 py-2 bg-terminal-green/10 border-b border-terminal-green/30 flex items-center justify-between">
              <span className="text-xs text-terminal-green/70">SYSTEM_LOG</span>
              <span className="text-terminal-amber text-xs">{progress}%</span>
            </div>
            <div className="h-1 bg-terminal-green/10">
              <div className="h-full bg-terminal-green transition-all duration-200" style={{ width: `${progress}%` }} />
            </div>
            <div className="p-4 font-mono text-xs space-y-1 max-h-48 overflow-y-auto">
              {logs.map((log, i) => (
                <p key={i} className={log.startsWith('[AI]') ? 'text-terminal-amber' : log.startsWith('[DONE]') ? 'text-terminal-green font-bold' : 'text-terminal-green/70'}>
                  {log}
                </p>
              ))}
              {status !== 'done' && <span className="blink-cursor text-terminal-green">█</span>}
            </div>
          </div>
        )}

        {/* Action */}
        {status === 'idle' && (
          <button
            onClick={simulateUpload}
            disabled={!file && !githubUrl}
            className="w-full border-2 border-terminal-green py-4 text-terminal-green font-bold tracking-widest hover:bg-terminal-green hover:text-terminal-bg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            [ ANALYZE_RESUME ]
          </button>
        )}

        {status === 'done' && (
          <div className="text-terminal-green text-center py-4 font-bold">
            ✓ ANALYSIS COMPLETE — Loading Dashboard...
          </div>
        )}
      </div>
    </main>
  );
}
