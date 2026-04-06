'use client';
import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<'idle' | 'uploading' | 'parsing' | 'done' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [githubUrl, setGithubUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => setLogs(p => [...p, `> ${msg}`]);

  const handleFile = (f: File) => {
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'].includes(f.type)) {
      addLog('ERROR: Unsupported format. Use PDF, DOCX, or TXT.');
      return;
    }
    setFile(f);
    addLog(`File loaded: ${f.name} (${(f.size / 1024).toFixed(1)} KB)`);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleAnalyze = async () => {
    if (!file && !githubUrl) {
      addLog('ERROR: No input provided. Upload a resume or enter GitHub URL.');
      return;
    }
    setStep('uploading');
    setUploading(true);
    addLog('Initiating upload sequence...');

    // Simulate progress
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(r => setTimeout(r, 60));
      setProgress(i);
    }
    addLog('Upload complete. Sending to AI parser...');
    setStep('parsing');

    const parseSteps = [
      'Extracting text content...',
      'Identifying skills & technologies...',
      'Parsing work experience...',
      'Analyzing projects...',
      'Building skill vector...',
      'Running career prediction model...',
      'Analysis complete.',
    ];
    for (const s of parseSteps) {
      await new Promise(r => setTimeout(r, 400));
      addLog(s);
    }

    setStep('done');
    setUploading(false);
  };

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-green font-mono pt-16">
      <div className="scanlines" aria-hidden="true" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-terminal-green/20 bg-terminal-bg/95">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="text-terminal-green text-sm tracking-widest hover:text-terminal-amber transition-colors">[ METAROLE::AI ]</Link>
          <span className="text-xs text-terminal-green/40">upload --resume</span>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL */}
        <div className="space-y-4">
          <div className="border-b border-terminal-green/20 pb-3">
            <p className="text-xs text-terminal-green/40 mb-1">// input --source</p>
            <h1 className="text-xl font-bold tracking-widest">UPLOAD RESUME</h1>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed p-10 text-center cursor-pointer transition-all duration-200 ${
              dragging ? 'border-terminal-green bg-terminal-green/10' : 'border-terminal-green/30 hover:border-terminal-green/60'
            }`}
          >
            <input ref={fileRef} type="file" accept=".pdf,.docx,.txt" className="hidden" onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            <div className="text-4xl mb-3">{file ? '✅' : '📂'}</div>
            {file ? (
              <>
                <p className="text-terminal-green text-sm font-bold">{file.name}</p>
                <p className="text-terminal-green/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB — Ready to parse</p>
              </>
            ) : (
              <>
                <p className="text-terminal-green/60 text-sm">DROP FILE HERE or click to browse</p>
                <p className="text-terminal-green/30 text-xs mt-2">Supported: PDF, DOCX, TXT</p>
              </>
            )}
          </div>

          {/* GitHub URL */}
          <div className="border border-terminal-green/30 p-4">
            <p className="text-xs text-terminal-green/40 mb-2">// optional: connect github</p>
            <div className="flex gap-2">
              <span className="text-terminal-green/60 text-sm">$</span>
              <input
                type="url"
                value={githubUrl}
                onChange={e => setGithubUrl(e.target.value)}
                placeholder="https://github.com/username"
                className="flex-1 bg-transparent border-b border-terminal-green/30 text-terminal-green text-sm outline-none focus:border-terminal-green placeholder:text-terminal-green/20 pb-1"
              />
            </div>
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-terminal-green/60">UPLOAD PROGRESS</span>
                <span className="text-terminal-amber">{progress}%</span>
              </div>
              <div className="border border-terminal-green/30 h-3 relative">
                <div
                  className="h-full bg-terminal-green transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center text-[8px] text-black font-bold mix-blend-difference">
                  {'█'.repeat(Math.floor(progress / 5)).padEnd(20, '░')}
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={uploading}
            className="w-full border-2 border-terminal-green py-3 text-terminal-green font-bold tracking-widest hover:bg-terminal-green hover:text-black transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
          >
            {uploading ? '[ ANALYZING... ]' : '[ ANALYZE RESUME ]'}
          </button>

          {step === 'done' && (
            <Link
              href="/dashboard"
              className="block w-full border-2 border-terminal-amber py-3 text-terminal-amber font-bold tracking-widest hover:bg-terminal-amber hover:text-black transition-all text-sm text-center"
            >
              [ VIEW RESULTS → ]
            </Link>
          )}
        </div>

        {/* RIGHT PANEL - Terminal Log */}
        <div className="border border-terminal-green/40 bg-black/60">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-green/20">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="w-2 h-2 rounded-full bg-yellow-500" />
            <span className="w-2 h-2 rounded-full bg-terminal-green" />
            <span className="text-xs text-terminal-green/40 ml-2">metarole ~ parse-log</span>
          </div>
          <div className="p-4 h-80 overflow-y-auto space-y-1 text-sm">
            {logs.length === 0 && (
              <p className="text-terminal-green/20">// waiting for input...</p>
            )}
            {logs.map((l, i) => (
              <p key={i} className={l.includes('ERROR') ? 'text-red-400' : l.includes('complete') || l.includes('DONE') ? 'text-terminal-amber' : 'text-terminal-green/70'}>{l}</p>
            ))}
            {step === 'done' && (
              <p className="text-terminal-green font-bold mt-2">✓ Analysis complete. Navigate to dashboard.</p>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
