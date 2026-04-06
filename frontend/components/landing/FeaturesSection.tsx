'use client'
import { useState } from 'react'

const FEATURES = [
  {
    id: '01',
    title: 'RESUME_PARSER',
    desc: 'AI extracts skills, experience, and projects from any resume format. Supports PDF, DOCX, and plain text.',
    cmd: '$ parse --input resume.pdf --extract skills,exp,projects',
  },
  {
    id: '02',
    title: 'SKILL_GRAPH',
    desc: 'Visualize your skills as an interactive graph. Identify clusters, strengths, and hidden connections.',
    cmd: '$ graph --mode interactive --depth full',
  },
  {
    id: '03',
    title: 'GAP_ANALYZER',
    desc: 'Compare your skills against target roles. Get a precise gap report with priority learning paths.',
    cmd: '$ analyze --gap --target "Senior Engineer" --output report',
  },
  {
    id: '04',
    title: 'CAREER_PREDICTOR',
    desc: 'AI predicts your most likely career trajectories with probability scores based on market data.',
    cmd: '$ predict --career --horizon 3y --confidence-threshold 0.8',
  },
  {
    id: '05',
    title: 'RESUME_GENERATOR',
    desc: 'Generate ATS-optimized resumes tailored per job description using GPT. Zero guesswork.',
    cmd: '$ generate --resume --job-id JD_8821 --ats-optimize',
  },
  {
    id: '06',
    title: 'JOB_MATCHER',
    desc: 'Semantic job matching using vector embeddings. Ranked by fit score, salary, and growth potential.',
    cmd: '$ match --jobs --semantic --rank-by fit,salary,growth',
  },
]

export default function FeaturesSection() {
  const [activeFeature, setActiveFeature] = useState(0)

  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="font-mono mb-12">
          <div className="text-terminal-green/40 text-xs mb-2">// MODULE LIST</div>
          <h2 className="text-terminal-green text-2xl sm:text-3xl font-bold tracking-wider">
            CORE_MODULES<span className="text-terminal-amber">[]</span>
          </h2>
          <div className="h-px bg-gradient-to-r from-terminal-green/50 to-transparent mt-4 max-w-xs" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-terminal-green/20">
          {/* Feature List */}
          <div className="border-r border-terminal-green/20">
            {FEATURES.map((f, i) => (
              <button
                key={f.id}
                onClick={() => setActiveFeature(i)}
                className={`w-full text-left p-4 border-b border-terminal-green/10 font-mono transition-colors group ${
                  activeFeature === i
                    ? 'bg-terminal-green/10 border-l-2 border-l-terminal-green'
                    : 'hover:bg-terminal-green/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-terminal-amber/60 text-xs">[{f.id}]</span>
                  <span
                    className={`text-sm tracking-wider ${
                      activeFeature === i ? 'text-terminal-green' : 'text-terminal-green/50'
                    }`}
                  >
                    {f.title}
                  </span>
                  {activeFeature === i && (
                    <span className="ml-auto text-terminal-green text-xs">▶</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feature Detail */}
          <div className="p-6 font-mono">
            <div className="text-terminal-amber text-xs mb-3">
              MODULE [{FEATURES[activeFeature].id}] :: {FEATURES[activeFeature].title}
            </div>
            <div className="border border-terminal-green/20 p-4 mb-4 bg-terminal-bg/60">
              <p className="text-terminal-green/70 text-sm leading-relaxed">
                {FEATURES[activeFeature].desc}
              </p>
            </div>
            <div className="bg-black/40 border border-terminal-green/10 p-3">
              <span className="text-terminal-green/40 text-xs">USAGE:</span>
              <div className="text-terminal-green text-xs mt-1 font-mono">
                {FEATURES[activeFeature].cmd}
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse" />
              <span className="text-terminal-green/40 text-xs">MODULE ACTIVE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
