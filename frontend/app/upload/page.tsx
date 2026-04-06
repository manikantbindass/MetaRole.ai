'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TypewriterText } from '@/components/terminal/TypewriterText';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { motion, AnimatePresence } from 'framer-motion';
import { analyzeSkills } from '@/lib/api';

export default function UploadPage() {
  const router = useRouter();
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [stage, setStage] = useState<'idle' | 'uploading' | 'parsing' | 'done' | 'error'>('idle');

  const addLog = (msg: string) => setLogs(prev => [...prev, msg]);

  const handleFile = useCallback((f: File) => {
    if (!f.name.match(/\.(pdf|docx|doc)$/i)) {
      addLog('[ERROR] Invalid file type. Accepted: .pdf, .docx, .doc');
      return;
    }
    setFile(f);
    addLog(`[INFO] File detected: ${f.name}`);
    addLog(`[INFO] Size: ${(f.size / 1024).toFixed(1)}KB`);
    addLog(`[INFO] Type: ${f.type || 'application/octet-stream'}`);
    addLog('[READY] Run ./analyze to begin parsing...');
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleUpload = async () => {
    if (!file) return;
    setStage('uploading');
    setLogs([]);
    addLog('[SYS] Initializing upload sequence...');
    addLog('[SYS] Establishing secure connection...');
    await new Promise(r => setTimeout(r, 600));
    addLog(`[SYS] Uploading: ${file.name}`);
    addLog('[SYS] Transfer: ████████████████████ 100%');
    await new Promise(r => setTimeout(r, 400));
    setStage('parsing');
    addLog('[AI] Invoking resume_parser.py...');
    await new Promise(r => setTimeout(r, 500));
    addLog('[AI] Extracting skills via GPT-4...');
    await new Promise(r => setTimeout(r, 600));
    addLog('[AI] Detected 12 technical skills');
    addLog('[AI] Detected 3 years experience');
    addLog('[AI] Detected 5 notable projects');
    await new Promise(r => setTimeout(r, 400));
    addLog('[AI] Running skill_gap.py...');
    await new Promise(r => setTimeout(r, 500));
    addLog('[AI] Running career_predictor.py...');
    await new Promise(r => setTimeout(r, 400));
    addLog('[DONE] Analysis complete. Redirecting to dashboard...');
    setStage('done');
    setTimeout(() => router.push('/dashboard'), 1500);
  };

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6 max-w-4xl">
        <div className="mb-6">
          <TypewriterText 
            text="> RESUME_UPLOAD_SYSTEM v2.4.1"
            speed={40}
            className="text-xl font-bold text-terminal-green"
          />
          <div className="text-terminal-green/50 text-sm mt-1">
            [SUPPORTED FORMATS: PDF, DOCX, DOC] [MAX SIZE: 10MB]
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drop Zone */}
          <TerminalWindow title="upload_zone.sh">
            <motion.div
              className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
                isDragging ? 'border-terminal-green bg-terminal-green/5' : 'border-terminal-green/30 hover:border-terminal-green/60'
              } ${file ? 'border-terminal-green bg-terminal-green/5' : ''}`}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-input')?.click()}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input
                id="file-input"
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              <div className="text-4xl mb-4">
                {file ? '✅' : isDragging ? '📂' : '📄'}
              </div>
              {file ? (
                <>
                  <div className="text-terminal-green font-bold">{file.name}</div>
                  <div className="text-terminal-green/60 text-sm mt-1">{(file.size / 1024).toFixed(1)} KB</div>
                </>
              ) : (
                <>
                  <div className="text-terminal-green/70">
                    {isDragging ? '[ DROP FILE HERE ]' : '[ DRAG & DROP RESUME ]'}
                  </div>
                  <div className="text-terminal-green/40 text-sm mt-2">or click to browse</div>
                </>
              )}
            </motion.div>

            {file && stage === 'idle' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={handleUpload}
                className="w-full mt-4 border border-terminal-green bg-terminal-green/10 hover:bg-terminal-green/20 text-terminal-green font-bold py-3 px-6 transition-all text-sm tracking-widest"
              >
                &gt; ./analyze --resume {file.name}
              </motion.button>
            )}

            {stage === 'done' && (
              <div className="mt-4 text-center text-terminal-green animate-pulse">
                [SUCCESS] Redirecting to dashboard...
              </div>
            )}
          </TerminalWindow>

          {/* Log Terminal */}
          <TerminalWindow title="parse.log" className="h-full">
            <div className="min-h-48 space-y-1 text-xs font-mono">
              {logs.length === 0 ? (
                <div className="text-terminal-green/40">
                  &gt; Waiting for input...
                  <BlinkingCursor />
                </div>
              ) : (
                logs.map((log, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`${
                      log.includes('[ERROR]') ? 'text-red-400' :
                      log.includes('[AI]') ? 'text-terminal-amber' :
                      log.includes('[DONE]') ? 'text-terminal-green font-bold' :
                      'text-terminal-green/80'
                    }`}
                  >
                    {log}
                  </motion.div>
                ))
              )}
              {(stage === 'uploading' || stage === 'parsing') && (
                <div className="text-terminal-green/60">
                  &gt; <BlinkingCursor />
                </div>
              )}
            </div>
          </TerminalWindow>
        </div>

        {/* Info Panel */}
        <TerminalWindow title="system_info.txt" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {[
              { icon: '🔍', label: 'AI PARSER', desc: 'GPT-4 extracts skills, experience, education and projects with 95%+ accuracy' },
              { icon: '🕸️', label: 'SKILL GRAPH', desc: 'D3.js force-directed visualization maps your skill relationships and strengths' },
              { icon: '🎯', label: 'CAREER PATHS', desc: 'ML predictor suggests optimal roles with probability scores and timelines' },
            ].map((item) => (
              <div key={item.label} className="border border-terminal-green/20 p-3">
                <div className="text-2xl mb-2">{item.icon}</div>
                <div className="text-terminal-amber font-bold mb-1">[{item.label}]</div>
                <div className="text-terminal-green/60">{item.desc}</div>
              </div>
            ))}
          </div>
        </TerminalWindow>
      </main>
    </div>
  );
}
