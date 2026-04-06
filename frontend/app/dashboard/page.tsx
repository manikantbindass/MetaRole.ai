'use client';

import { useState } from 'react';
import Link from 'next/link';

const METRICS = [
  { label: 'SKILLS_MAPPED', value: '42', delta: '+8', color: '#33ff00' },
  { label: 'CAREER_MATCH', value: '91%', delta: '+4%', color: '#ffb000' },
  { label: 'GAPS_IDENTIFIED', value: '5', delta: '-2', color: '#ff4444' },
  { label: 'JOBS_MATCHED', value: '128', delta: '+23', color: '#00ffff' },
];

const JOB_MATCHES = [
  { title: 'Senior Full-Stack Engineer', company: 'Vercel', match: 96, salary: '$150k-200k', location: 'Remote' },
  { title: 'Blockchain Developer', company: 'Chainlink Labs', match: 91, salary: '$130k-180k', location: 'Remote' },
  { title: 'Node.js Backend Engineer', company: 'Stripe', match: 84, salary: '$140k-190k', location: 'SF/Remote' },
  { title: 'React Frontend Lead', company: 'Figma', match: 79, salary: '$130k-170k', location: 'SF/Remote' },
];

const RECENT_ACTIVITY = [
  { time: '2m ago', event: 'Resume analyzed', status: 'OK' },
  { time: '5m ago', event: 'Skill graph updated', status: 'OK' },
  { time: '12m ago', event: 'Career paths predicted', status: 'OK' },
  { time: '1h ago', event: 'Job matches refreshed', status: 'OK' },
  { time: '2h ago', event: 'Portfolio generated', status: 'WARN' },
];

export default function DashboardPage() {
  const [applyingJob, setApplyingJob] = useState<number | null>(null);

  const handleApply = async (idx: number) => {
    setApplyingJob(idx);
    await new Promise(r => setTimeout(r, 1500));
    setApplyingJob(null);
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

      {/* Header */}
      <header className="border-b border-[#33ff00]/20 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">← METAROLE_AI</Link>
        <div className="flex items-center gap-4">
          <span className="text-xs text-[#33ff00]/40 tracking-widest hidden sm:block">DASHBOARD_v1.0</span>
          <Link href="/upload" className="border border-[#33ff00]/30 px-3 py-1 text-xs tracking-widest hover:border-[#33ff00] transition-all">+ UPLOAD</Link>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Page title */}
        <div className="mb-8">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// CAREER.DASHBOARD</div>
          <h1 className="text-xl font-bold tracking-widest">OPERATOR_DASHBOARD</h1>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {METRICS.map((m, i) => (
            <div key={i} className="border border-[#33ff00]/20 p-4 hover:border-[#33ff00]/40 transition-colors">
              <div className="text-xs text-[#33ff00]/40 tracking-widest mb-2">{m.label}</div>
              <div className="text-2xl font-bold" style={{ color: m.color }}>{m.value}</div>
              <div className="text-xs mt-1" style={{ color: m.color + '80' }}>{m.delta} SINCE_LAST</div>
            </div>
          ))}
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Job matches */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-xs text-[#33ff00]/40 tracking-widest">// JOB_MATCHES.LIVE — SORTED_BY_COMPATIBILITY</div>
            {JOB_MATCHES.map((job, i) => (
              <div key={i} className="border border-[#33ff00]/10 p-4 hover:border-[#33ff00]/30 transition-colors">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-3">
                  <div>
                    <h3 className="font-bold text-[#33ff00] text-sm">{job.title}</h3>
                    <p className="text-[#33ff00]/50 text-xs mt-1">{job.company} · {job.location}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[#ffb000] font-bold">{job.match}%</span>
                    <button
                      onClick={() => handleApply(i)}
                      className="border border-[#33ff00]/30 px-4 py-1 text-xs tracking-widest hover:border-[#33ff00] hover:bg-[#33ff00]/10 transition-all"
                    >
                      {applyingJob === i ? '[ APPLYING... ]' : '[ APPLY ]'}
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex-1 h-0.5 bg-[#33ff00]/10 mr-4">
                    <div className="h-full bg-[#33ff00]" style={{ width: `${job.match}%` }} />
                  </div>
                  <span className="text-[#33ff00]/40 text-xs">{job.salary}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Activity + Progress */}
          <div className="space-y-6">
            {/* Activity log */}
            <div className="border border-[#33ff00]/20 p-4">
              <div className="text-xs text-[#33ff00]/40 tracking-widest mb-4">// ACTIVITY.LOG</div>
              <div className="space-y-2">
                {RECENT_ACTIVITY.map((act, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <span className="text-[#33ff00]/40">{act.time}</span>
                    <span className="text-[#33ff00]/70">{act.event}</span>
                    <span className={act.status === 'OK' ? 'text-[#33ff00]' : 'text-[#ffb000]'}>[{act.status}]</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Career progress */}
            <div className="border border-[#33ff00]/20 p-4">
              <div className="text-xs text-[#33ff00]/40 tracking-widest mb-4">// CAREER_PROGRESS</div>
              <div className="space-y-3">
                {[
                  ['Resume Upload', 100],
                  ['Skill Analysis', 100],
                  ['Gap Identification', 100],
                  ['Resume Generated', 80],
                  ['Jobs Applied', 45],
                ].map(([label, pct]) => (
                  <div key={label as string}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-[#33ff00]/60">{label as string}</span>
                      <span className="text-[#ffb000]">{pct}%</span>
                    </div>
                    <div className="h-1 bg-[#33ff00]/10">
                      <div className="h-full bg-[#33ff00]" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions */}
            <div className="border border-[#33ff00]/20 p-4">
              <div className="text-xs text-[#33ff00]/40 tracking-widest mb-4">// QUICK_ACTIONS</div>
              <div className="space-y-2">
                <Link href="/analyze" className="block border border-[#33ff00]/20 px-4 py-2 text-xs tracking-widest hover:border-[#33ff00]/60 transition-all text-center">
                  [ RE-ANALYZE ]
                </Link>
                <Link href="/output" className="block border border-[#33ff00]/20 px-4 py-2 text-xs tracking-widest hover:border-[#33ff00]/60 transition-all text-center">
                  [ GENERATE_RESUME ]
                </Link>
                <Link href="/upload" className="block border border-[#33ff00]/20 px-4 py-2 text-xs tracking-widest hover:border-[#33ff00]/60 transition-all text-center">
                  [ NEW_UPLOAD ]
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
