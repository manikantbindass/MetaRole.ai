'use client'
import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import Link from 'next/link'

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [log, setLog] = useState<string[]>([])

  const addLog = (msg: string) => setLog((l) => [...l, msg])

  const onDrop = useCallback((accepted: File[]) => {
    if (accepted[0]) {
      setFile(accepted[0])
      setLog([`> File selected: ${accepted[0].name} (${(accepted[0].size / 1024).toFixed(1)}KB)`])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'application/msword': ['.doc'], 'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'], 'text/plain': ['.txt'] },
    maxFiles: 1,
  })

  const handleAnalyze = async () => {
    if (!file) return
    setUploading(true)
    setProgress(0)
    setLog([])
    addLog(`> Uploading ${file.name}...`)

    // Simulate progress
    const steps = [
      [20, '> Parsing document structure...'],
      [40, '> Extracting skills and experience...'],
      [60, '> Building skill graph...'],
      [80, '> Running career prediction engine...'],
      [100, '> Analysis complete! Redirecting to dashboard...'],
    ]

    for (const [p, msg] of steps) {
      await new Promise((r) => setTimeout(r, 600))
      setProgress(p as number)
      addLog(msg as string)
    }

    setDone(true)
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-terminal-bg font-mono flex flex-col items-center justify-center px-4 py-16">
      {/* CRT overlay */}
      <div className="pointer-events-none fixed inset-0 crt-overlay" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-terminal-green/40 text-xs hover:text-terminal-green transition-colors">
            ← BACK_TO_HOME
          </Link>
          <h1 className="text-terminal-green text-2xl font-bold tracking-wider mt-4">
            RESUME_UPLOAD<span className="text-terminal-amber">()</span>
          </h1>
          <p className="text-terminal-green/50 text-xs mt-2">
            // Supports PDF, DOCX, DOC, TXT formats
          </p>
        </div>

        {/* Drop Zone */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-12 text-center cursor-pointer transition-all ${
            isDragActive
              ? 'border-terminal-green bg-terminal-green/10'
              : 'border-terminal-green/30 hover:border-terminal-green/60 hover:bg-terminal-green/5'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-terminal-green/30 text-4xl mb-4">[ ▼ ]</div>
          {file ? (
            <div>
              <div className="text-terminal-amber text-sm">{file.name}</div>
              <div className="text-terminal-green/40 text-xs mt-1">{(file.size / 1024).toFixed(1)} KB</div>
            </div>
          ) : (
            <div>
              <div className="text-terminal-green/60 text-sm mb-1">
                {isDragActive ? 'DROP_FILE_HERE...' : 'DRAG_&_DROP_RESUME'}
              </div>
              <div className="text-terminal-green/30 text-xs">or click to browse</div>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {uploading && (
          <div className="mt-4">
            <div className="flex justify-between text-xs text-terminal-green/60 mb-1">
              <span>ANALYZING</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-1 bg-terminal-green/10 border border-terminal-green/20">
              <div
                className="h-full bg-terminal-green transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Log */}
        {log.length > 0 && (
          <div className="mt-4 bg-black/40 border border-terminal-green/10 p-4 text-xs text-terminal-green/70 space-y-1 max-h-40 overflow-y-auto">
            {log.map((l, i) => <div key={i}>{l}</div>)}
            {uploading && <span className="text-terminal-green animate-blink">█</span>}
          </div>
        )}

        {/* Analyze Button */}
        {!done && (
          <button
            onClick={handleAnalyze}
            disabled={!file || uploading}
            className="mt-6 w-full border border-terminal-green text-terminal-green py-3 text-sm tracking-widest uppercase hover:bg-terminal-green hover:text-terminal-bg transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {uploading ? '[ ANALYZING... ]' : '[ ANALYZE RESUME ]'}
          </button>
        )}

        {/* Done */}
        {done && (
          <Link
            href="/dashboard"
            className="mt-6 w-full border border-terminal-amber text-terminal-amber py-3 text-sm tracking-widest uppercase hover:bg-terminal-amber hover:text-terminal-bg transition-all block text-center"
          >
            [ GO_TO_DASHBOARD → ]
          </Link>
        )}
      </div>
    </div>
  )
}
