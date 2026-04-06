'use client';
import { useState } from 'react';
import Link from 'next/link';

const SKILLS = [
  { name: 'JavaScript', level: 92, category: 'Frontend' },
  { name: 'React', level: 88, category: 'Frontend' },
  { name: 'Node.js', level: 78, category: 'Backend' },
  { name: 'Python', level: 71, category: 'AI/ML' },
  { name: 'TypeScript', level: 83, category: 'Frontend' },
  { name: 'PostgreSQL', level: 65, category: 'Database' },
  { name: 'Docker', level: 45, category: 'DevOps' },
  { name: 'GraphQL', level: 32, category: 'Backend' },
];

const GAPS = [
  { skill: 'GraphQL', priority: 'HIGH', eta: '3 weeks' },
  { skill: 'System Design', priority: 'HIGH', eta: '4 weeks' },
  { skill: 'Docker/K8s', priority: 'MED', eta: '2 weeks' },
  { skill: 'Redis', priority: 'MED', eta: '1 week' },
  { skill: 'AWS Lambda', priority: 'LOW', eta: '3 weeks' },
];

const JOBS = [
  { title: 'Senior Full-Stack Engineer', company: 'Vercel', match: 94, loc: 'Remote', salary: '$140k–$180k' },
  { title: 'Frontend Architect', company: 'Linear', match: 89, loc: 'Remote', salary: '$130k–$160k' },
  { title: 'Software Engineer II', company: 'Stripe', match: 85, loc: 'SF / Remote', salary: '$160k–$200k' },
  { title: 'Full-Stack Developer', company: 'Notion', match: 82, loc: 'Remote', salary: '$120k–$150k' },
  { title: 'React Engineer', company: 'Figma', match: 79, loc: 'SF', salary: '$135k–$170k' },
];

const CAREER_PATHS = [
  { role: 'Full-Stack Engineer', prob: 92, color: '#33ff00' },
  { role: 'Frontend Architect', prob: 87, color: '#ffb000' },
  { role: 'DevOps Engineer', prob: 71, color: '#33ff00' },
  { role: 'AI/ML Engineer', prob: 55, color: '#ffb000' },
  { role: 'Solutions Architect', prob: 48, color: '#33ff00' },
];

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<'skills' | 'career' | 'jobs' | 'progress'>('skills');

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-green font-mono">
      <div className="scanlines" aria-hidden="true" />

      {/* TOP BAR */}
      <header className="fixed top-0 w-full z-50 border-b border-terminal-green/20 bg-terminal-bg/95">
        <div className="flex items-center justify-between px-4 h-12">
          <Link href="/" className="text-terminal-green text-sm tracking-widest">[ METAROLE::AI ]</Link>
          <div className="flex gap-1">
            {(['skills', 'career', 'jobs', 'progress'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActivePane(tab)}
                className={`px-3 py-1 text-xs tracking-wider border transition-all ${
                  activePane === tab
                    ? 'border-terminal-green bg-terminal-green text-black font-bold'
                    : 'border-terminal-green/30 text-terminal-green/60 hover:border-terminal-green/60'
                }`}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>
          <Link href="/upload" className="text-xs text-terminal-amber border border-terminal-amber px-3 py-1 hover:bg-terminal-amber hover:text-black transition-all">
            NEW SCAN
          </Link>
        </div>
      </header>

      <div className="pt-14 flex h-screen">
        {/* SIDEBAR */}
        <aside className="w-52 border-r border-terminal-green/20 p-4 flex-shrink-0 overflow-y-auto">
          <p className="text-xs text-terminal-green/40 mb-4">// user@metarole</p>
          <div className="space-y-1 text-xs">
            {[
              { label: 'IDENTITY', val: 'john_doe' },
              { label: 'LEVEL', val: 'Mid-Senior' },
              { label: 'SCORE', val: '847 / 1000' },
              { label: 'SKILLS', val: '23 detected' },
              { label: 'GAPS', val: '5 critical' },
              { label: 'JOBS', val: '14 matched' },
            ].map(item => (
              <div key={item.label} className="flex justify-between border-b border-terminal-green/10 py-1">
                <span className="text-terminal-green/40">{item.label}</span>
                <span className="text-terminal-green">{item.val}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 space-y-2">
            <Link href="/output" className="block text-xs text-terminal-amber border border-terminal-amber/40 px-2 py-1.5 hover:bg-terminal-amber hover:text-black transition-all text-center">
              GEN RESUME
            </Link>
            <button className="w-full text-xs text-terminal-green border border-terminal-green/40 px-2 py-1.5 hover:bg-terminal-green hover:text-black transition-all">
              PORTFOLIO
            </button>
          </div>
        </aside>

        {/* MAIN PANE */}
        <div className="flex-1 overflow-y-auto p-6">
          {activePane === 'skills' && (
            <section>
              <p className="text-xs text-terminal-green/40 mb-1">// skill-graph --visualize</p>
              <h2 className="text-lg font-bold tracking-widest mb-6">SKILL GRAPH</h2>
              <div className="space-y-3">
                {SKILLS.map(s => (
                  <div key={s.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-terminal-green">{s.name}</span>
                      <span className="flex gap-4">
                        <span className="text-terminal-green/40">[{s.category}]</span>
                        <span className="text-terminal-amber">{s.level}%</span>
                      </span>
                    </div>
                    <div className="border border-terminal-green/20 h-4 relative overflow-hidden">
                      <div
                        className="h-full bg-terminal-green/30 transition-all duration-700"
                        style={{ width: `${s.level}%` }}
                      />
                      <div
                        className="absolute top-0 left-0 h-full bg-terminal-green/80 transition-all duration-700"
                        style={{ width: `${s.level * 0.7}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <p className="text-xs text-terminal-green/40 mb-1">// gaps --critical</p>
                <h3 className="text-sm font-bold tracking-widest mb-4">SKILL GAPS</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {GAPS.map(g => (
                    <div key={g.skill} className="border border-terminal-green/20 p-3 flex justify-between items-center">
                      <span className="text-terminal-green text-sm">{g.skill}</span>
                      <div className="text-right">
                        <span className={`text-xs block ${g.priority === 'HIGH' ? 'text-red-400' : g.priority === 'MED' ? 'text-terminal-amber' : 'text-terminal-green/60'}`}>
                          {g.priority}
                        </span>
                        <span className="text-xs text-terminal-green/40">{g.eta}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {activePane === 'career' && (
            <section>
              <p className="text-xs text-terminal-green/40 mb-1">// predict --career-paths</p>
              <h2 className="text-lg font-bold tracking-widest mb-6">CAREER PREDICTION</h2>
              <div className="space-y-4">
                {CAREER_PATHS.map((c, i) => (
                  <div key={c.role} className="border border-terminal-green/20 p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-terminal-green font-bold text-sm">[{String(i + 1).padStart(2, '0')}] {c.role}</span>
                      <span className="text-terminal-amber font-bold">{c.prob}% MATCH</span>
                    </div>
                    <div className="border border-terminal-green/20 h-3">
                      <div className="h-full bg-terminal-green transition-all" style={{ width: `${c.prob}%` }} />
                    </div>
                    <div className="mt-2 text-xs text-terminal-green/40">
                      Confidence: {c.prob > 85 ? 'HIGH' : c.prob > 65 ? 'MEDIUM' : 'LOW'} | Salary: ${(80 + c.prob).toFixed(0)}k–${(120 + c.prob).toFixed(0)}k
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activePane === 'jobs' && (
            <section>
              <p className="text-xs text-terminal-green/40 mb-1">// jobs --matched --sort-by-score</p>
              <h2 className="text-lg font-bold tracking-widest mb-6">JOB MATCHES</h2>
              <div className="space-y-3">
                {JOBS.map(j => (
                  <div key={j.title} className="border border-terminal-green/20 p-4 hover:border-terminal-green/60 transition-all">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-terminal-green font-bold text-sm">{j.title}</p>
                        <p className="text-terminal-amber text-xs mt-0.5">{j.company}</p>
                      </div>
                      <span className="text-terminal-green font-bold text-sm border border-terminal-green px-2 py-0.5">
                        {j.match}%
                      </span>
                    </div>
                    <div className="flex gap-4 mt-2 text-xs text-terminal-green/40">
                      <span>📍 {j.loc}</span>
                      <span>💰 {j.salary}</span>
                    </div>
                    <button className="mt-3 text-xs border border-terminal-green/30 px-3 py-1 hover:bg-terminal-green hover:text-black transition-all">
                      [ APPLY NOW ]
                    </button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {activePane === 'progress' && (
            <section>
              <p className="text-xs text-terminal-green/40 mb-1">// tracker --progress</p>
              <h2 className="text-lg font-bold tracking-widest mb-6">PROGRESS TRACKER</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[
                  { label: 'PROFILE COMPLETE', val: '78%', color: 'text-terminal-green' },
                  { label: 'SKILLS TRACKED', val: '23', color: 'text-terminal-amber' },
                  { label: 'JOBS APPLIED', val: '7', color: 'text-terminal-green' },
                  { label: 'INTERVIEWS', val: '3', color: 'text-terminal-amber' },
                ].map(stat => (
                  <div key={stat.label} className="border border-terminal-green/20 p-4 text-center">
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.val}</p>
                    <p className="text-xs text-terminal-green/40 mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="border border-terminal-green/20 p-4">
                <p className="text-xs text-terminal-green/40 mb-3">// activity --last-30-days</p>
                <div className="grid grid-cols-10 gap-1">
                  {Array.from({ length: 30 }, (_, i) => (
                    <div
                      key={i}
                      className="h-6 border border-terminal-green/20"
                      style={{ backgroundColor: `rgba(51,255,0,${Math.random() * 0.6})` }}
                      title={`Day ${i + 1}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-terminal-green/40 mt-2">Activity heatmap — last 30 days</p>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
