'use client';
import { useState, useCallback } from 'react';
import NavBar from '@/components/layout/NavBar';
import TerminalWindow from '@/components/ui/TerminalWindow';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['[SYSTEM] Resume upload terminal initialized.', '[SYSTEM] Awaiting input...']);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleFile = useCallback(async (f: File) => {
    setFile(f);
    setUploadState('uploading');
    addLog(`[UPLOAD] Received: ${f.name} (${(f.size / 1024).toFixed(1)} KB)`);
    addLog('[PARSE]  Initiating AI resume parser...');

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(r => setTimeout(r, 150));
      setProgress(i);
      if (i === 30) addLog('[PARSE]  Extracting work experience...');
      if (i === 60) addLog('[PARSE]  Identifying skill entities...');
      if (i === 90) addLog('[PARSE]  Running NLP analysis...');
    }

    addLog('[OK]     Parse complete. Redirecting to analysis...');
    setUploadState('success');
  }, []);

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  return (
    <>
      <NavBar />
      <main className="min-h-screen grid-bg pt-24 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <p className="text-muted text-sm mb-1">// STEP 01</p>
            <h1 className="text-xl font-bold text-green glow-green mb-2">
              RESUME_UPLOAD.exe
            </h1>
            <p className="text-white text-sm">Drop your resume and let the AI parse every skill, project, and experience.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Drop Zone */}
            <div
              onDrop={onDrop}
              onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              className={`terminal-window p-8 flex flex-col items-center justify-center min-h-64 cursor-pointer transition-all ${
                isDragging ? 'border-green border-glow' : ''
              }`}
              onClick={() => document.getElementById('file-input')?.click()}
              role="button"
              aria-label="Upload resume file"
              tabIndex={0}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.doc,.docx,.txt"
                className="sr-only"
                onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="text-center">
                <p className="text-4xl mb-4" aria-hidden="true">⬆</p>
                <p className="text-green font-bold mb-2">[ DROP RESUME HERE ]</p>
                <p className="text-muted text-xs">PDF, DOCX, TXT supported</p>
                {file && (
                  <p className="text-amber text-xs mt-3">{file.name}</p>
                )}
              </div>
            </div>

            {/* Terminal Log */}
            <TerminalWindow title="upload-monitor" className="min-h-64">
              <div className="space-y-1">
                {logs.map((log, i) => (
                  <p key={i} className={`text-xs ${
                    log.startsWith('[OK]') ? 'text-green' :
                    log.startsWith('[PARSE]') ? 'text-amber' :
                    log.startsWith('[ERROR]') ? 'text-red' : 'text-muted'
                  }`}>{log}</p>
                ))}
                {uploadState === 'uploading' && (
                  <div className="mt-3">
                    <p className="text-xs text-muted mb-1">Progress: {progress}%</p>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                )}
                {uploadState === 'success' && (
                  <p className="text-xs text-green cursor-blink mt-2">Ready</p>
                )}
              </div>
            </TerminalWindow>
          </div>

          {uploadState === 'success' && (
            <div className="mt-6 flex gap-4">
              <a href="/analyze" className="btn-terminal text-sm">
                [ ANALYZE SKILLS ]
              </a>
              <a href="/dashboard" className="btn-terminal btn-terminal-amber text-sm">
                [ VIEW DASHBOARD ]
              </a>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
