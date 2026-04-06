'use client';
import { useState } from 'react';
import Link from 'next/link';

const SKILLS = [
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'React / Next.js', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 78, category: 'Backend' },
  { name: 'Solidity', level: 72, category: 'Blockchain' },
  { name: 'Python', level: 70, category: 'AI/ML' },
  { name: 'PostgreSQL', level: 65, category: 'Database' },
  { name: 'Docker / K8s', level: 60, category: 'DevOps' },
  { name: 'LangChain', level: 45, category: 'AI/ML' },
];

const GAPS = [
  { skill: 'Rust', priority: 'HIGH', est: '3 months' },
  { skill: 'GraphQL', priority: 'MED', est: '6 weeks' },
  { skill: 'Redis', priority: 'MED', est: '4 weeks' },
  { skill: 'Kubernetes Advanced', priority: 'LOW', est: '2 months' },
];

const JOBS = [
  { title: 'Senior Full-Stack Engineer', company: 'Vercel', match: 94, location: 'Remote', tags: ['Next.js', 'TypeScript', 'Edge'] },
  { title: 'Blockchain Developer', company: 'Coinbase', match: 88, location: 'San Francisco', tags: ['Solidity', 'Web3', 'DeFi'] },
  { title: 'AI Platform Engineer', company: 'Hugging Face', match: 81, location: 'Remote', tags: ['Python', 'LLMs', 'FastAPI'] },
  { title: 'DevOps Engineer', company: 'HashiCorp', match: 76, location: 'Remote', tags: ['K8s', 'Terraform', 'CI/CD'] },
];

const PATHS = [
  { role: 'Senior Full-Stack Developer', probability: 94, timeline: '6-12 months', icon: '◈' },
  { role: 'Blockchain / Web3 Developer', probability: 88, timeline: '3-6 months', icon: '⟁' },
  { role: 'AI/ML Engineer', probability: 72, timeline: '12-18 months', icon: '▲' },
  { role: 'DevOps / Platform Engineer', probability: 68, timeline: '6-12 months', icon: '◐' },
];

type Tab = 'skills' | 'gaps' | 'jobs' | 'paths';

export default function Dashboard() {
  const [tab, setTab] = useState<Tab>('skills');

  return (
    <main className="bg-terminal-bg text-terminal-green font-mono min-h-screen">
      <div className="scanline-overlay pointer-events-none" />

      {/* NAV */}
      <nav className="border-b border-terminal-green/30 px-6 py-3 flex items-center justify-between sticky top-0 bg-terminal-bg/95 z-50">
        <Link href="/" className="text-terminal-green font-bold tracking-widest">
          <span className="text-terminal-amber">{'>'}</span> METAROLE<span className="text-terminal-amber">.AI</span>
        </Link>
        <div className="flex items-center gap-4 text-xs">
          <Link href="/upload" className="text-terminal-green/60 hover:text-terminal-green">[UPLOAD]</Link>
          <Link href="/output" className="text-terminal-amber hover:text-terminal-amber/80">[GENERATE_RESUME]</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="text-terminal-amber text-xs tracking-widest mb-1">// CAREER_INTELLIGENCE_DASHBOARD //</div>
          <h1 className="text-2xl font-bold">CAREER OS — <span className="text-terminal-amber">ACTIVE SESSION</span></h1>
          <div className="flex items-center gap-6 mt-3 text-xs text-terminal-green/50">
            <span>● PROFILE: manikantbindass</span>
            <span>● SKILLS ANALYZED: 34</span>
            <span>● JOB MATCHES: 142</span>
            <span>● LAST_SYNC: just now</span>
          </div>
        </div>

        {/* KPI Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'SKILL_SCORE', value: '847', unit: '/1000', color: 'text-terminal-green' },
            { label: 'JOB_MATCHES', value: '142', unit: 'active', color: 'text-terminal-amber' },
            { label: 'SKILL_GAPS', value: '7', unit: 'detected', color: 'text-red-400' },
            { label: 'CAREER_PATHS', value: '4', unit: 'predicted', color: 'text-blue-400' },
          ].map(k => (
            <div key={k.label} className="border border-terminal-green/20 p-4 hover:border-terminal-green/50 transition-colors">
              <div className="text-terminal-green/40 text-xs mb-1">{k.label}</div>
              <div className={`text-2xl font-bold ${k.color}`}>{k.value}</div>
              <div className="text-terminal-green/40 text-xs">{k.unit}</div>
            </div>
          ))}
        </div>

        {/* Split Terminal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: Skill Graph */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="flex border-b border-terminal-green/30 mb-0">
              {(['skills', 'gaps', 'jobs', 'paths'] as Tab[]).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 text-xs font-bold tracking-wider transition-colors ${
                    tab === t
                      ? 'text-terminal-green border-b-2 border-terminal-green bg-terminal-green/5'
                      : 'text-terminal-green/40 hover:text-terminal-green/70'
                  }`}
                >
                  [{t.toUpperCase()}]
                </button>
              ))}
            </div>

            <div className="border border-terminal-green/30 border-t-0 p-4 min-h-[400px]">
              {/* SKILLS TAB */}
              {tab === 'skills' && (
                <div>
                  <div className="text-terminal-amber text-xs mb-4">// SKILL_COMPETENCY_MATRIX //</div>
                  <div className="space-y-3">
                    {SKILLS.map(s => (
                      <div key={s.name}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-terminal-green">{s.name}</span>
                          <span className="text-terminal-green/50">{s.category} — {s.level}%</span>
                        </div>
                        <div className="h-1.5 bg-terminal-green/10 relative">
                          <div
                            className="h-full bg-terminal-green transition-all duration-700"
                            style={{ width: `${s.level}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* GAPS TAB */}
              {tab === 'gaps' && (
                <div>
                  <div className="text-terminal-amber text-xs mb-4">// SKILL_GAP_ANALYSIS //</div>
                  <div className="space-y-3">
                    {GAPS.map(g => (
                      <div key={g.skill} className="flex items-center justify-between border border-terminal-green/20 p-3 hover:border-terminal-green/50 transition-colors">
                        <div>
                          <span className="text-terminal-green font-bold">{g.skill}</span>
                          <span className="text-terminal-green/40 text-xs ml-3">est. {g.est} to learn</span>
                        </div>
                        <span className={`text-xs px-2 py-0.5 border ${
                          g.priority === 'HIGH' ? 'border-red-400/50 text-red-400' :
                          g.priority === 'MED' ? 'border-terminal-amber/50 text-terminal-amber' :
                          'border-terminal-green/30 text-terminal-green/60'
                        }`}>{g.priority}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* JOBS TAB */}
              {tab === 'jobs' && (
                <div>
                  <div className="text-terminal-amber text-xs mb-4">// JOB_MATCH_RESULTS — 142 found //</div>
                  <div className="space-y-3">
                    {JOBS.map(j => (
                      <div key={j.title} className="border border-terminal-green/20 p-3 hover:border-terminal-green/50 transition-all hover:bg-terminal-green/5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-terminal-green font-bold text-sm">{j.title}</p>
                            <p className="text-terminal-green/50 text-xs">{j.company} — {j.location}</p>
                          </div>
                          <div className={`text-lg font-bold ${
                            j.match >= 90 ? 'text-terminal-green' : j.match >= 80 ? 'text-terminal-amber' : 'text-terminal-green/60'
                          }`}>{j.match}%</div>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {j.tags.map(tag => (
                            <span key={tag} className="text-xs border border-terminal-green/20 px-2 py-0.5 text-terminal-green/60">{tag}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PATHS TAB */}
              {tab === 'paths' && (
                <div>
                  <div className="text-terminal-amber text-xs mb-4">// CAREER_PATH_PREDICTIONS //</div>
                  <div className="space-y-4">
                    {PATHS.map(p => (
                      <div key={p.role} className="border border-terminal-green/20 p-4 hover:border-terminal-green/50 transition-all">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-terminal-amber text-xl">{p.icon}</span>
                          <p className="text-terminal-green font-bold">{p.role}</p>
                          <span className="ml-auto text-terminal-green font-bold">{p.probability}%</span>
                        </div>
                        <div className="h-1 bg-terminal-green/10 mb-2">
                          <div className="h-full bg-terminal-green" style={{ width: `${p.probability}%` }} />
                        </div>
                        <p className="text-terminal-green/50 text-xs">Timeline: {p.timeline}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Progress Tracker */}
          <div className="space-y-4">
            {/* Progress */}
            <div className="border border-terminal-green/30 p-4">
              <div className="text-terminal-amber text-xs mb-3">// PROGRESS_TRACKER //</div>
              <div className="space-y-3 text-xs">
                {[
                  { label: 'Resume Uploaded', done: true },
                  { label: 'Skills Extracted', done: true },
                  { label: 'Gap Analysis Done', done: true },
                  { label: 'Career Paths Predicted', done: true },
                  { label: 'Resume Generated', done: false },
                  { label: 'Portfolio Built', done: false },
                  { label: 'Jobs Applied', done: false },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-2">
                    <span className={item.done ? 'text-terminal-green' : 'text-terminal-green/30'}>
                      {item.done ? '✓' : '○'}
                    </span>
                    <span className={item.done ? 'text-terminal-green' : 'text-terminal-green/30'}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="border border-terminal-green/30 p-4">
              <div className="text-terminal-amber text-xs mb-3">// QUICK_ACTIONS //</div>
              <div className="space-y-2">
                {[
                  { label: 'Generate Resume', href: '/output' },
                  { label: 'Build Portfolio', href: '/output?type=portfolio' },
                  { label: 'Apply to Top Jobs', href: '/output?type=apply' },
                  { label: 'Upload New Resume', href: '/upload' },
                ].map(a => (
                  <Link
                    key={a.label}
                    href={a.href}
                    className="block border border-terminal-green/20 px-3 py-2 text-xs text-terminal-green/70 hover:border-terminal-green hover:text-terminal-green hover:bg-terminal-green/5 transition-all"
                  >
                    {'>'} {a.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* System Status */}
            <div className="border border-terminal-green/30 p-4">
              <div className="text-terminal-amber text-xs mb-3">// SYSTEM_STATUS //</div>
              <div className="space-y-2 text-xs">
                {[
                  { label: 'AI_ENGINE', status: 'ONLINE', ok: true },
                  { label: 'JOB_DATABASE', status: '142k jobs', ok: true },
                  { label: 'VECTOR_DB', status: 'PINECONE', ok: true },
                  { label: 'GPT-4_API', status: 'ACTIVE', ok: true },
                ].map(s => (
                  <div key={s.label} className="flex justify-between">
                    <span className="text-terminal-green/50">{s.label}</span>
                    <span className={s.ok ? 'text-terminal-green' : 'text-red-400'}>{s.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
