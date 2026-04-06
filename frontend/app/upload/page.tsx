'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Header from '@/components/layout/Header';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import TypewriterText from '@/components/terminal/TypewriterText';
import BlinkingCursor from '@/components/terminal/BlinkingCursor';
import { apiClient } from '@/lib/api';

export default function UploadPage() {
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [fileName, setFileName] = useState('');

  const addLog = (msg: string) => setLogs((prev) => [...prev, msg]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      setFileName(file.name);
      setStatus('uploading');
      addLog(`> INITIATING UPLOAD: ${file.name}`);
      addLog('> CONNECTING TO AI CORE...');

      try {
        const formData = new FormData();
        formData.append('resume', file);

        addLog('> PARSING DOCUMENT STRUCTURE...');
        const result = await apiClient.uploadResume(formData);

        addLog('> EXTRACTING SKILLS WITH GPT-4...');
        addLog('> BUILDING SKILL VECTOR GRAPH...');
        addLog(`> DETECTED ${result.skills?.length ?? 0} SKILLS`);
        addLog('> ANALYSIS COMPLETE. REDIRECTING...');
        setStatus('success');

        setTimeout(() => {
          window.location.href = '/analyze';
        }, 1500);
      } catch (err) {
        addLog('[ERROR] UPLOAD FAILED. CHECK NETWORK.');
        setStatus('error');
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'] },
    maxFiles: 1,
  });

  return (
    <div className="min-h-screen bg-terminal-bg">
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-16">
        <div className="mb-8">
          <TypewriterText
            text="> INITIALIZING RESUME UPLOAD MODULE..."
            className="text-terminal-green text-sm mb-2"
          />
          <TypewriterText
            text="> SUPPORTED FORMATS: PDF, DOCX"
            className="text-terminal-dim text-xs"
            delay={800}
          />
        </div>

        <TerminalWindow title="RESUME_UPLOAD.exe">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed p-16 text-center cursor-pointer transition-all duration-200 ${
              isDragActive
                ? 'border-terminal-green bg-terminal-green/5'
                : 'border-terminal-border hover:border-terminal-green/50'
            }`}
          >
            <input {...getInputProps()} />
            <div className="text-terminal-green text-4xl mb-4 font-mono">[ DROP ZONE ]</div>
            <div className="text-terminal-dim text-sm">
              {isDragActive ? (
                <span className="text-terminal-green">DROP FILE HERE...</span>
              ) : (
                <>
                  DRAG & DROP RESUME HERE
                  <br />
                  <span className="text-xs">OR CLICK TO SELECT FILE</span>
                </>
              )}
            </div>
          </div>
        </TerminalWindow>

        {/* Upload logs */}
        {logs.length > 0 && (
          <TerminalWindow title="UPLOAD_LOG.exe" className="mt-6">
            <div className="text-xs space-y-1">
              {logs.map((log, i) => (
                <div
                  key={i}
                  className={`${
                    log.startsWith('[ERROR]') ? 'text-red-400' : 'text-terminal-green'
                  }`}
                >
                  {log}
                </div>
              ))}
              {status === 'uploading' && <BlinkingCursor />}
            </div>
          </TerminalWindow>
        )}

        {status === 'success' && (
          <div className="mt-4 text-terminal-green text-sm text-center animate-pulse">
            ✓ ANALYSIS COMPLETE — REDIRECTING TO RESULTS...
          </div>
        )}
      </main>
    </div>
  );
}
