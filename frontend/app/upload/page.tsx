'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import Link from 'next/link';

type UploadState = 'idle' | 'uploading' | 'parsing' | 'done' | 'error';

const PARSE_STEPS = [
  'Extracting text from document...',
  'Running GPT-4 skill extraction...',
  'Building skill taxonomy...',
  'Generating skill graph...',
  'Analyzing career alignment...',
  'Saving to database...',
  'Analysis complete!',
];

export default function UploadPage() {
  const [state, setState] = useState<UploadState>('idle');
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const simulateProcessing = () => {
    setState('parsing');
    let i = 0;
    const timer = setInterval(() => {
      if (i < PARSE_STEPS.length) {
        addLog(PARSE_STEPS[i]);
        setStep(i + 1);
        i++;
      } else {
        clearInterval(timer);
        setState('done');
        addLog('>>> READY. Redirecting to dashboard...');
      }
    }, 700);
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const f = acceptedFiles[0];
      setFile(f);
      setState('uploading');
      setLogs([`[UPLOAD] File received: ${f.name} (${(f.size / 1024).toFixed(1)} KB)`]);
      setTimeout(() => {
        addLog('[UPLOAD] File transferred successfully.');
        addLog('[PARSER] Initiating AI extraction pipeline...');
        simulateProcessing();
      }, 1200);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled: state !== 'idle',
  });

  return (
    <div className="min-h-screen bg-terminal-bg p-4">
      {/* Header */}
      <div className="border-b border-terminal-border pb-3 mb-6 flex justify-between items-center">
        <div>
          <Link href="/" className="text-terminal-muted text-xs hover:text-terminal-green">&lt; BACK_TO_HOME</Link>
          <h1 className="text-terminal-green text-xl font-bold glow-green mt-1">RESUME_UPLOAD</h1>
          <div className="text-terminal-muted text-xs">&gt; Upload your resume to begin AI analysis</div>
        </div>
        <Link href="/dashboard">
          <button className="btn-terminal-amber btn-terminal text-xs py-1 px-3">[ SKIP → DASHBOARD ]</button>
        </Link>
      </div>

      <div className="max-w-2xl mx-auto">
        {/* Dropzone */}
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              {...getRootProps()}
              className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-terminal-green bg-green-950/20 box-glow-green'
                  : 'border-terminal-border hover:border-terminal-green hover:bg-terminal-surface'
              }`}
            >
              <input {...getInputProps()} />
              <div className="font-mono">
                <div className="text-6xl mb-4">{isDragActive ? '📎' : '📁'}</div>
                <div className="text-terminal-green text-lg font-bold mb-2">
                  {isDragActive ? '[ DROP_FILE_HERE ]' : '[ DRAG & DROP RESUME ]'}
                </div>
                <div className="text-terminal-muted text-sm">
                  Supported: PDF, DOCX, TXT
                </div>
                <div className="text-terminal-muted text-xs mt-2">or click to browse files</div>
                <div className="mt-6 text-xs text-terminal-dim">
                  <span className="text-terminal-amber">$</span> metarole upload --file ./your-resume.pdf
                </div>
              </div>
            </motion.div>
          )}

          {(state === 'uploading' || state === 'parsing') && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="terminal-window"
            >
              <div className="terminal-titlebar">
                <div className="terminal-dot" style={{ background: '#ff5f57' }} />
                <div className="terminal-dot" style={{ background: '#febc2e' }} />
                <div className="terminal-dot" style={{ background: '#28c840' }} />
                <span className="ml-2">resume_parser.py — processing</span>
              </div>
              <div className="terminal-body min-h-64">
                <div className="text-terminal-amber text-xs mb-4">
                  &gt; PROCESSING: {file?.name}
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-terminal-muted">PARSE_PROGRESS</span>
                    <span className="text-terminal-green">{Math.round((step / PARSE_STEPS.length) * 100)}%</span>
                  </div>
                  <div className="h-2 bg-terminal-border">
                    <motion.div
                      className="h-full bg-terminal-green"
                      animate={{ width: `${(step / PARSE_STEPS.length) * 100}%` }}
                      style={{ boxShadow: '0 0 8px var(--terminal-green)' }}
                    />
                  </div>
                </div>

                {/* Logs */}
                <div className="space-y-1">
                  {logs.map((log, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`text-xs ${log.includes('>>>') ? 'text-terminal-green font-bold' : log.includes('ERROR') ? 'text-red' : 'text-terminal-text'}`}
                    >
                      {log.includes('>>>') ? '' : <span className="text-terminal-amber">[{new Date().toLocaleTimeString()}] </span>}
                      {log}
                    </motion.div>
                  ))}
                  {state === 'parsing' && <span className="cursor" />}
                </div>
              </div>
            </motion.div>
          )}

          {state === 'done' && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="terminal-window"
            >
              <div className="terminal-titlebar">
                <span>analysis_complete.sh</span>
              </div>
              <div className="terminal-body">
                <div className="text-terminal-green font-bold text-lg glow-green mb-4">
                  [✓] ANALYSIS COMPLETE
                </div>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Skills Extracted', val: '47' },
                    { label: 'Experience Years', val: '4.5' },
                    { label: 'Projects Found', val: '12' },
                    { label: 'Profile Score', val: '76%' },
                  ].map((item) => (
                    <div key={item.label} className="border border-terminal-border p-3">
                      <div className="text-xs text-terminal-muted">{item.label}</div>
                      <div className="text-terminal-green text-xl font-bold">{item.val}</div>
                    </div>
                  ))}
                </div>
                <Link href="/dashboard">
                  <button className="btn-terminal w-full py-3 font-bold">[ VIEW DASHBOARD → ]</button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* GitHub option */}
        {state === 'idle' && (
          <div className="mt-6 border-t border-terminal-border pt-6">
            <div className="text-center text-terminal-muted text-xs mb-3">OR CONNECT GITHUB PROFILE</div>
            <div className="flex gap-2">
              <input
                type="text"
                className="input-terminal flex-1"
                placeholder="github.com/your-username"
              />
              <button className="btn-terminal btn-terminal-amber px-6">[SCAN]</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
