'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';

type UploadStatus = 'idle' | 'uploading' | 'parsing' | 'done' | 'error';

export default function UploadPage() {
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [fileName, setFileName] = useState('');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  function addLog(msg: string) {
    setLogs(prev => [...prev, msg]);
  }

  async function handleFile(file: File) {
    setFileName(file.name);
    setStatus('uploading');
    setLogs([]);
    addLog(`> file detected: ${file.name}`);
    addLog(`> size: ${(file.size / 1024).toFixed(1)} KB | type: ${file.type}`);

    // Simulate upload & parse
    for (let p = 0; p <= 100; p += 10) {
      await new Promise(r => setTimeout(r, 120));
      setProgress(p);
    }
    addLog('> upload complete. starting AI parse...');
    setStatus('parsing');

    const parseSteps = [
      'extracting text layers...',
      'detecting skill entities...',
      'mapping experience timeline...',
      'analyzing project stack...',
      'generating skill matrix...',
      'running career prediction model...',
      'identifying skill gaps...',
      'report ready.',
    ];
    for (const step of parseSteps) {
      await new Promise(r => setTimeout(r, 400));
      addLog(`> ${step}`);
    }
    setStatus('done');
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      <header className="border-b border-[#1a1a1a] sticky top-0 bg-[#0a0a0a] z-50">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm tracking-widest font-bold hover:opacity-80">[METAROLE.AI]</Link>
          <Link href="/dashboard" className="text-xs text-[#555] tracking-wider hover:text-[#33ff00] transition-colors">&gt; dashboard</Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="text-xs text-[#555] tracking-widest mb-1">&gt; metarole upload --resume</div>
        <h1 className="text-lg font-bold tracking-wider mb-8">RESUME UPLOAD &amp; AI ANALYSIS</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* DROP ZONE */}
          <div
            onDrop={onDrop}
            onDragOver={e => e.preventDefault()}
            className="border border-dashed border-[#1a8000] bg-[#111] p-12 flex flex-col items-center justify-center gap-4 cursor-pointer hover:border-[#33ff00] transition-all"
            onClick={() => fileRef.current?.click()}
          >
            <input ref={fileRef} type="file" accept=".pdf,.docx,.doc" className="hidden" onChange={onFileChange} />
            <div className="text-4xl text-[#1a8000]">[↑]</div>
            <div className="text-center">
              <div className="text-sm font-bold tracking-wider mb-2">DROP RESUME HERE</div>
              <div className="text-xs text-[#555]">Accepts PDF, DOCX, DOC</div>
              <div className="text-xs text-[#555] mt-1">or click to browse files</div>
            </div>
            {fileName && (
              <div className="border border-[#1a8000] px-4 py-2 text-xs text-[#33ff00] mt-2">
                ✔ {fileName}
              </div>
            )}
          </div>

          {/* TERMINAL LOG */}
          <div className="border border-[#1a1a1a] bg-[#111]">
            <div className="border-b border-[#1a1a1a] px-4 py-2 flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff3333]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#ffb000]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#33ff00]" />
              <span className="text-[#555] text-[10px] ml-2">metarole-parser</span>
            </div>
            <div className="p-4 h-64 overflow-y-auto space-y-1">
              {logs.length === 0 && (
                <div className="text-[#333] text-xs">// waiting for file input...</div>
              )}
              {logs.map((log, i) => (
                <div key={i} className="text-xs text-[#33ff00]">{log}</div>
              ))}
              {status !== 'idle' && status !== 'done' && status !== 'error' && (
                <div className="text-xs text-[#ffb000] animate-pulse">&gt; processing...▋</div>
              )}
            </div>

            {/* PROGRESS */}
            {status === 'uploading' && (
              <div className="px-4 pb-4">
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="text-[#555]">UPLOADING</span>
                  <span className="text-[#33ff00]">{progress}%</span>
                </div>
                <div className="h-1 bg-[#1a1a1a]">
                  <div className="h-full bg-[#33ff00] transition-all" style={{ width: `${progress}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* DONE STATE */}
        {status === 'done' && (
          <div className="mt-8 border border-[#1a8000] bg-[#111] p-6">
            <div className="text-xs text-[#555] mb-4">&gt; analysis complete</div>
            <div className="text-sm font-bold text-[#33ff00] mb-6">✔ RESUME PARSED SUCCESSFULLY</div>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                { label: 'SKILLS DETECTED', value: '48' },
                { label: 'EXPERIENCE', value: '3.5 YRS' },
                { label: 'PROJECTS', value: '12' },
              ].map(stat => (
                <div key={stat.label} className="border border-[#1a1a1a] p-4 text-center">
                  <div className="text-2xl font-bold text-[#33ff00]">{stat.value}</div>
                  <div className="text-[10px] text-[#555] tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-4">
              <Link href="/dashboard" className="btn-terminal text-xs tracking-widest py-2.5 px-6">[ VIEW DASHBOARD ]</Link>
              <Link href="/dashboard" className="btn-terminal-amber btn-terminal text-xs tracking-widest py-2.5 px-6">[ PREDICT CAREER ]</Link>
            </div>
          </div>
        )}

        {/* GITHUB OPTION */}
        <div className="mt-8 border border-[#1a1a1a] bg-[#111] p-6">
          <div className="text-xs text-[#555] tracking-widest mb-4">&gt; alternative: connect github</div>
          <div className="text-sm font-bold mb-4">CONNECT GITHUB PROFILE</div>
          <div className="flex gap-3">
            <input
              type="text"
              placeholder="github.com/username"
              className="flex-1 bg-[#0a0a0a] border border-[#1a1a1a] px-4 py-2 text-xs text-[#33ff00] placeholder:text-[#333] focus:border-[#1a8000] outline-none font-mono"
            />
            <button className="btn-terminal text-xs tracking-widest px-6">[ ANALYZE ]</button>
          </div>
        </div>
      </main>
    </div>
  );
}
