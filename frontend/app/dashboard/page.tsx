'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SKILLS = [
  { name: 'JavaScript', level: 92, color: 'bg-yellow-400' },
  { name: 'React', level: 88, color: 'bg-blue-400' },
  { name: 'Node.js', level: 82, color: 'bg-green-400' },
  { name: 'Python', level: 76, color: 'bg-yellow-300' },
  { name: 'SQL', level: 70, color: 'bg-purple-400' },
  { name: 'Docker', level: 55, color: 'bg-blue-300' },
  { name: 'Kubernetes', level: 28, color: 'bg-red-400' },
  { name: 'GraphQL', level: 40, color: 'bg-pink-400' },
];

const CAREER_PATHS = [
  { role: 'Senior Full-Stack Engineer', score: 92, color: 'text-green-400' },
  { role: 'Lead Backend Engineer', score: 87, color: 'text-green-400' },
  { role: 'Engineering Manager', score: 74, color: 'text-yellow-400' },
  { role: 'DevOps Engineer', score: 61, color: 'text-yellow-400' },
  { role: 'ML Engineer', score: 38, color: 'text-red-400' },
];

const JOBS = [
  { title: 'Senior Software Engineer', company: 'Stripe', match: 94, location: 'Remote', type: 'Full-time' },
  { title: 'Full Stack Developer', company: 'Vercel', match: 91, location: 'Remote', type: 'Full-time' },
  { title: 'Backend Engineer', company: 'Cloudflare', match: 87, location: 'Remote', type: 'Full-time' },
  { title: 'Software Engineer III', company: 'Google', match: 82, location: 'Bangalore', type: 'Full-time' },
  { title: 'Frontend Engineer', company: 'Linear', match: 79, location: 'Remote', type: 'Contract' },
];

const GAPS = [
  { skill: 'Kubernetes', priority: 'HIGH', resource: 'CKA Certification' },
  { skill: 'GraphQL', priority: 'HIGH', resource: 'Apollo Docs + Projects' },
  { skill: 'System Design', priority: 'HIGH', resource: 'Grokking System Design' },
  { skill: 'AWS/GCP', priority: 'MEDIUM', resource: 'Cloud Practitioner Cert' },
  { skill: 'Go Lang', priority: 'LOW', resource: 'Tour of Go' },
];

function ProgressBar({ value, color = 'bg-green-400' }: { value: number; color?: string }) {
  const [width, setWidth] = useState(0);
  useEffect(() => { const t = setTimeout(() => setWidth(value), 300); return () => clearTimeout(t); }, [value]);
  return (
    <div className="h-1 bg-green-950 w-full">
      <div className={`h-1 ${color} transition-all duration-1000`} style={{ width: `${width}%` }} />
    </div>
  );
}

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<'skills' | 'career' | 'jobs' | 'gaps'>('skills');

  const PANES = ['skills', 'career', 'jobs', 'gaps'] as const;

  return (
    <main className="min-h-screen bg-black text-green-400 font-mono scanlines">
      {/* Header */}
      <div className="border-b border-green-900 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-green-600 text-xs hover:text-green-400">&lt; BACK_TO_HOME</Link>
        <span className="text-green-400 font-bold text-sm tracking-widest">[ CAREER_DASHBOARD ]</span>
        <Link href="/upload" className="border border-green-400 px-4 py-1 text-xs hover:bg-green-400 hover:text-black transition-all">&gt; UPLOAD_RESUME</Link>
      </div>

      {/* Status Bar */}
      <div className="border-b border-green-900 px-6 py-2 flex gap-6 text-xs text-green-600 overflow-x-auto">
        <span>&gt; OPERATOR: john_doe</span>
        <span>&gt; SKILLS: 24</span>
        <span>&gt; CAREER_SCORE: 87%</span>
        <span>&gt; JOBS_MATCHED: 47</span>
        <span>&gt; GAPS: 5</span>
        <span className="text-green-400 animate-pulse">&gt; STATUS: ACTIVE</span>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-b border-green-900">
        {[
          { label: 'TOTAL_SKILLS', value: '24', sub: '+3 this week' },
          { label: 'CAREER_MATCH', value: '92%', sub: 'Senior SWE' },
          { label: 'JOBS_FOUND', value: '47', sub: '12 new today' },
          { label: 'SKILL_GAPS', value: '5', sub: '2 critical' },
        ].map((kpi, i) => (
          <div key={i} className="border-r border-green-900 last:border-r-0 p-5">
            <p className="text-green-800 text-xs mb-1">{kpi.label}</p>
            <p className="text-green-400 text-3xl font-bold">{kpi.value}</p>
            <p className="text-green-700 text-xs mt-1">{kpi.sub}</p>
          </div>
        ))}
      </div>

      {/* Pane Selector */}
      <div className="border-b border-green-900 flex">
        {PANES.map(p => (
          <button
            key={p}
            onClick={() => setActivePane(p)}
            className={`px-6 py-3 text-xs border-r border-green-900 transition-all ${
              activePane === p ? 'bg-green-400 text-black font-bold' : 'text-green-600 hover:text-green-400'
            }`}
          >
            &gt; {p.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="p-6">
        {/* SKILLS PANE */}
        {activePane === 'skills' && (
          <div>
            <p className="text-green-600 text-xs mb-6">&gt; SKILL_GRAPH.RENDER — 24 nodes detected</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SKILLS.map(s => (
                <div key={s.name} className="border border-green-900 p-4 hover:border-green-600 transition-all">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">{s.name}</span>
                    <span className="text-yellow-400 text-xs">{s.level}%</span>
                  </div>
                  <ProgressBar value={s.level} color={s.color} />
                  <div className="mt-1 flex justify-between text-xs text-green-800">
                    <span>{s.level >= 80 ? 'EXPERT' : s.level >= 60 ? 'PROFICIENT' : s.level >= 40 ? 'INTERMEDIATE' : 'BEGINNER'}</span>
                    <span>{s.level >= 70 ? '✓ STRONG' : s.level >= 40 ? '~ GROWING' : '⚠ WEAK'}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREER PANE */}
        {activePane === 'career' && (
          <div>
            <p className="text-green-600 text-xs mb-6">&gt; CAREER_PREDICTOR.RUN — 5 paths analyzed</p>
            <div className="space-y-3">
              {CAREER_PATHS.map((path, i) => (
                <div key={path.role} className="border border-green-900 p-4 hover:border-green-600 transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-green-800 text-xs">#{String(i + 1).padStart(2, '0')}</span>
                      <span className="text-sm">{path.role}</span>
                    </div>
                    <span className={`font-bold ${path.color}`}>{path.score}%</span>
                  </div>
                  <ProgressBar value={path.score} color={path.score >= 80 ? 'bg-green-400' : path.score >= 60 ? 'bg-yellow-400' : 'bg-red-400'} />
                </div>
              ))}
            </div>
            <div className="mt-6 border border-green-900 p-4">
              <p className="text-green-600 text-xs mb-2">&gt; AI_RECOMMENDATION</p>
              <p className="text-green-400 text-sm">✔ Highest fit: Senior Full-Stack Engineer (92%)</p>
              <p className="text-green-700 text-xs mt-1">Bridge skill gaps in Kubernetes + GraphQL to reach 97% match.</p>
            </div>
          </div>
        )}

        {/* JOBS PANE */}
        {activePane === 'jobs' && (
          <div>
            <p className="text-green-600 text-xs mb-6">&gt; JOB_MATCHER.QUERY — 47 positions found</p>
            <div className="space-y-3">
              {JOBS.map(job => (
                <div key={job.title + job.company} className="border border-green-900 p-4 hover:border-green-400 transition-all group">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-green-400 font-bold text-sm group-hover:text-yellow-400 transition-colors">{job.title}</p>
                      <p className="text-green-600 text-xs">{job.company} • {job.location} • {job.type}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-green-400 font-bold">{job.match}%</span>
                      <p className="text-green-800 text-xs">MATCH</p>
                    </div>
                  </div>
                  <ProgressBar value={job.match} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAPS PANE */}
        {activePane === 'gaps' && (
          <div>
            <p className="text-green-600 text-xs mb-6">&gt; GAP_ANALYZER.RUN — 5 gaps detected</p>
            <div className="space-y-3">
              {GAPS.map(gap => (
                <div key={gap.skill} className="border border-green-900 p-4 hover:border-green-600 transition-all">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm">{gap.skill}</span>
                    <span className={`text-xs font-bold ${
                      gap.priority === 'HIGH' ? 'text-red-400' : gap.priority === 'MEDIUM' ? 'text-yellow-400' : 'text-green-600'
                    }`}>[{gap.priority}]</span>
                  </div>
                  <p className="text-green-700 text-xs">&gt; Recommended: {gap.resource}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 border border-red-900 p-4">
              <p className="text-red-400 text-xs mb-1">&gt; CRITICAL_GAPS</p>
              <p className="text-green-700 text-xs">Resolve HIGH priority gaps to unlock 97% career match. Start with Kubernetes → GraphQL → System Design.</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
