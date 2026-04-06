'use client'
import Link from 'next/link'

export default function AnalyzePage() {
  return (
    <div className="min-h-screen bg-terminal-bg font-mono flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-terminal-amber text-xs mb-4">// AI OUTPUT</div>
        <h1 className="text-terminal-green text-2xl font-bold tracking-wider mb-4">
          ANALYZE_RESULTS<span className="text-terminal-amber">()</span>
        </h1>
        <p className="text-terminal-green/50 text-xs mb-8">Upload a resume to see your AI-generated analysis here.</p>
        <Link
          href="/upload"
          className="border border-terminal-green text-terminal-green px-6 py-2 text-xs tracking-widest uppercase hover:bg-terminal-green hover:text-terminal-bg transition-all"
        >
          [ UPLOAD RESUME ]
        </Link>
      </div>
    </div>
  )
}
