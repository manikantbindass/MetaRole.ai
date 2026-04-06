'use client'
import { useEffect, useState, useRef } from 'react'

const DEMO_LINES = [
  { type: 'cmd', text: '$ metarole init --user demo@example.com' },
  { type: 'info', text: '  Initializing MetaRole AI session...' },
  { type: 'ok', text: '  [✓] Session established: sess_x7f3kp' },
  { type: 'cmd', text: '$ metarole analyze --resume ./john_doe_resume.pdf' },
  { type: 'info', text: '  Parsing document... 100%' },
  { type: 'data', text: '  SKILLS_EXTRACTED: [React, Node.js, Python, SQL, Docker] (+12 more)' },
  { type: 'data', text: '  EXPERIENCE_YRS: 3.5  |  PROJECTS: 8  |  CERTS: 2' },
  { type: 'ok', text: '  [✓] Analysis complete in 1.24s' },
  { type: 'cmd', text: '$ metarole predict --career --top 3' },
  { type: 'info', text: '  Running career prediction model...' },
  { type: 'data', text: '  #1  Senior Full-Stack Engineer   [94.2%]  ████████████████████' },
  { type: 'data', text: '  #2  Lead Backend Engineer         [78.9%]  ████████████████░░░░' },
  { type: 'data', text: '  #3  DevRel Engineer               [65.1%]  █████████████░░░░░░░' },
  { type: 'ok', text: '  [✓] Prediction complete' },
  { type: 'cmd', text: '$ metarole generate --resume --job-id JD_4921' },
  { type: 'ok', text: '  [✓] ATS-optimized resume generated → output/resume_v3.pdf' },
  { type: 'cmd', text: '$ metarole match --jobs --top 5' },
  { type: 'data', text: '  Stripe — Senior Engineer       [$160k-200k]  FIT: 97%' },
  { type: 'data', text: '  Vercel — Full-Stack Dev         [$140k-175k]  FIT: 91%' },
  { type: 'data', text: '  Linear — Product Engineer       [$130k-165k]  FIT: 88%' },
  { type: 'ok', text: '  [✓] Matches ranked and ready' },
]

const COLOR_MAP: Record<string, string> = {
  cmd: 'text-terminal-green',
  info: 'text-terminal-green/50',
  ok: 'text-terminal-amber',
  data: 'text-cyan-400',
}

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (visibleLines >= DEMO_LINES.length) return
    const delay = DEMO_LINES[visibleLines].type === 'cmd' ? 500 : 120
    const t = setTimeout(() => setVisibleLines((v) => v + 1), delay)
    return () => clearTimeout(t)
  }, [started, visibleLines])

  return (
    <section className="py-24 px-4" ref={ref}>
      <div className="max-w-4xl mx-auto">
        <div className="font-mono mb-8">
          <div className="text-terminal-green/40 text-xs mb-2">// LIVE DEMO</div>
          <h2 className="text-terminal-green text-2xl font-bold tracking-wider">
            TERMINAL_PREVIEW<span className="text-terminal-amber">()</span>
          </h2>
          <div className="h-px bg-gradient-to-r from-terminal-green/50 to-transparent mt-4 max-w-xs" />
        </div>

        {/* Terminal window */}
        <div className="border border-terminal-green/30 bg-black/60">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-green/20 bg-terminal-green/5">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 border border-terminal-green/40 bg-terminal-green/10" />
              <div className="w-3 h-3 border border-terminal-amber/40 bg-terminal-amber/10" />
              <div className="w-3 h-3 border border-red-500/40 bg-red-500/10" />
            </div>
            <span className="text-terminal-green/40 font-mono text-xs ml-2">metarole-terminal — bash — 80x24</span>
          </div>

          {/* Terminal body */}
          <div className="p-4 font-mono text-xs space-y-1 min-h-[320px] overflow-y-auto">
            {DEMO_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} className={`${COLOR_MAP[line.type]} leading-relaxed`}>
                {line.text}
              </div>
            ))}
            {visibleLines < DEMO_LINES.length && (
              <span className="text-terminal-green animate-blink">█</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
