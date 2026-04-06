'use client'
import { useEffect, useRef, useState } from 'react'

const FEATURES = [
  {
    id: '01',
    icon: '\u2b21',
    title: 'RESUME_PARSER',
    desc: 'AI extracts skills, projects, experience from any resume format. Structured skill graph generated instantly.',
    color: 'terminal-green',
  },
  {
    id: '02',
    icon: '\u25a0',
    title: 'SKILL_GAP_ANALYSIS',
    desc: 'Compare your skill set against target job datasets. Identifies exact gaps with actionable learning paths.',
    color: 'terminal-amber',
  },
  {
    id: '03',
    icon: '\u25b6',
    title: 'CAREER_PREDICTOR',
    desc: 'ML-powered career trajectory engine. Predicts roles + salary bands with probability scores.',
    color: 'terminal-blue',
  },
  {
    id: '04',
    icon: '\u2665',
    title: 'AI_RESUME_GEN',
    desc: 'Generates tailored resumes per job posting. ATS-optimized. Keyword rich. Zero generic fluff.',
    color: 'terminal-green',
  },
  {
    id: '05',
    icon: '\u25c6',
    title: 'PORTFOLIO_GEN',
    desc: 'Auto-generates a developer portfolio site from your GitHub + resume data. Deploy in one click.',
    color: 'terminal-amber',
  },
  {
    id: '06',
    icon: '\u25cf',
    title: 'JOB_MATCHING',
    desc: 'Vector similarity search across 1M+ jobs. Intelligent match scoring + auto-apply capabilities.',
    color: 'terminal-blue',
  },
]

export default function FeaturesSection() {
  const [visible, setVisible] = useState<boolean[]>(new Array(FEATURES.length).fill(false))
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible((v) => { const n = [...v]; n[i] = true; return n }), i * 80)
            obs.disconnect()
          }
        },
        { threshold: 0.1 }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [])

  return (
    <section id="features" className="py-24 px-4 border-t border-terminal-green-dim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="text-terminal-amber text-xs tracking-[0.4em] uppercase mb-3">
            // CORE_MODULES
          </div>
          <h2 className="text-terminal-green text-2xl md:text-3xl font-bold tracking-widest">
            SYSTEM_FEATURES.exe
          </h2>
          <div className="terminal-progress mt-4 w-24">
            <div className="terminal-progress-fill" style={{ width: '100%' }} />
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-terminal-green-dim">
          {FEATURES.map((f, i) => (
            <div
              key={f.id}
              ref={(el) => { refs.current[i] = el }}
              className={`bg-terminal-bg p-6 group hover:bg-terminal-surface transition-all duration-200 cursor-default
                ${visible[i] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                transition-all duration-500
              `}
            >
              <div className="flex items-start gap-4">
                <span className="text-terminal-amber text-xs font-bold tracking-widest opacity-50">{f.id}</span>
                <div>
                  <div className="text-terminal-muted text-xs mb-1">&gt;_ {f.title}</div>
                  <div className="text-terminal-green text-xs leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {f.desc}
                  </div>
                  <div className="text-terminal-text text-xs leading-relaxed group-hover:hidden">
                    {f.desc.slice(0, 50)}...
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
