'use client';
import { useState, useRef, DragEvent } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import LoadingBar from '@/components/terminal/LoadingBar';
import TypewriterText from '@/components/terminal/TypewriterText';

type UploadState = 'idle' | 'dragging' | 'uploading' | 'parsing' | 'done' | 'error';

export default function UploadPage() {
  const [state, setState] = useState<UploadState>('idle');
  const [filename, setFilename] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleFile = async (file: File) => {
    if (!file) return;
    if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)) {
      setState('error');
      addLog('ERROR: Unsupported file type. Use PDF or DOCX.');
      return;
    }
    setFilename(file.name);
    setState('uploading');
    addLog(`Received: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    addLog('Validating file integrity...');

    // Simulate upload + parsing
    setTimeout(() => {
      addLog('Upload complete. Initializing AI parser...');
      setState('parsing');
    }, 1500);

    setTimeout(() => {
      addLog('Parsing resume with GPT-4...');
      addLog('✓ Extracted: 23 skills, 4 projects, 2 work experiences');
      addLog('✓ Building skill graph...');
      addLog('✓ Generating gap report...');
      addLog('DONE. Redirecting to dashboard...');
      setState('done');
    }, 4000);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setState('idle');
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <DashboardLayout>
      <div className="upload-page">
        <div className="page-header">
          <span className="prompt">&gt;</span> RESUME UPLOAD
        </div>

        <div className="upload-grid">
          {/* Drop zone */}
          <div
            className={`drop-zone ${state === 'dragging' ? 'dragging' : ''} ${state === 'done' ? 'done' : ''} ${state === 'error' ? 'error' : ''}`}
            onDragOver={e => { e.preventDefault(); setState('dragging'); }}
            onDragLeave={() => setState('idle')}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Drop resume file here or click to browse"
            onKeyDown={e => e.key === 'Enter' && fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              className="sr-only"
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              aria-label="Resume file input"
            />
            <div className="drop-icon">
              {state === 'done' ? '✓' : state === 'error' ? '✗' : '↑'}
            </div>
            <div className="drop-title">
              {state === 'idle' && 'DROP RESUME HERE'}
              {state === 'dragging' && 'RELEASE TO UPLOAD'}
              {state === 'uploading' && 'UPLOADING...'}
              {state === 'parsing' && 'PARSING...'}
              {state === 'done' && 'ANALYSIS COMPLETE'}
              {state === 'error' && 'UPLOAD ERROR'}
            </div>
            <div className="drop-sub">
              {state === 'idle' && 'Accepts PDF or DOCX — Max 10MB'}
              {state === 'done' && filename}
            </div>

            {(state === 'uploading' || state === 'parsing') && (
              <LoadingBar
                label={state === 'uploading' ? 'Uploading' : 'Parsing with AI'}
                duration={state === 'uploading' ? 1500 : 2500}
              />
            )}
          </div>

          {/* Terminal log */}
          <div className="upload-terminal">
            <div className="terminal-header">
              <span className="terminal-dot red" />
              <span className="terminal-dot yellow" />
              <span className="terminal-dot green" />
              <span className="terminal-title">upload-parser ~ log</span>
            </div>
            <div className="terminal-body upload-log" role="log" aria-live="polite">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole upload --watch
              </div>
              {logs.length === 0 && (
                <div className="terminal-line muted">Waiting for file input...</div>
              )}
              {logs.map((log, i) => (
                <div key={i} className={`terminal-line ${log.startsWith('✓') ? 'success' : log.startsWith('ERROR') ? 'error' : ''}`}>
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>

        {state === 'done' && (
          <div className="upload-actions">
            <a href="/dashboard" className="btn-initiate">
              [ VIEW DASHBOARD ]
            </a>
            <a href="/analyze" className="btn-secondary-cta">
              [ RUN ANALYSIS ]
            </a>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
