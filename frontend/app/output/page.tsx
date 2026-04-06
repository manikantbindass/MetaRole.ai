'use client'
import Link from 'next/link'

export default function OutputPage() {
  const OUTPUT_ITEMS = [
    { label: 'Resume v3 (ATS-Optimized)', file: 'resume_v3.pdf', type: 'PDF' },
    { label: 'Portfolio Site (HTML)', file: 'portfolio.html', type: 'HTML' },
    { label: 'Skill Gap Report', file: 'gap_report.md', type: 'MD' },
  ]

  return (
    <div className="min-h-screen bg-terminal-bg font-mono px-4 py-16">
      <div className="max-w-3xl mx-auto">
        <Link href="/dashboard" className="text-terminal-green/40 text-xs hover:text-terminal-green transition-colors">
          ← BACK_TO_DASHBOARD
        </Link>
        <h1 className="text-terminal-green text-2xl font-bold tracking-wider mt-4 mb-8">
          AI_OUTPUTS<span className="text-terminal-amber">()</span>
        </h1>

        <div className="space-y-0">
          {OUTPUT_ITEMS.map((item, i) => (
            <div
              key={i}
              className="border border-terminal-green/20 p-4 flex items-center justify-between group hover:border-terminal-green/50 transition-colors"
            >
              <div>
                <div className="text-terminal-green text-sm">{item.label}</div>
                <div className="text-terminal-green/40 text-xs mt-0.5">{item.file}</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-terminal-amber text-xs border border-terminal-amber/30 px-2 py-0.5">{item.type}</span>
                <button className="text-terminal-green/50 hover:text-terminal-green text-xs tracking-widest transition-colors">
                  [ DOWNLOAD ]
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
