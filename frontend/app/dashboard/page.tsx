'use client';
import { useState } from 'react';
import Link from 'next/link';

const SKILLS = [
  { name: 'React', level: 90, cat: 'FRONTEND' },
  { name: 'Node.js', level: 82, cat: 'BACKEND' },
  { name: 'Python', level: 75, cat: 'AI/ML' },
  { name: 'TypeScript', level: 88, cat: 'FRONTEND' },
  { name: 'AWS', level: 65, cat: 'CLOUD' },
  { name: 'Docker', level: 70, cat: 'DEVOPS' },
  { name: 'PostgreSQL', level: 78, cat: 'DATABASE' },
  { name: 'GraphQL', level: 45, cat: 'API' },
];

const JOB_MATCHES = [
  { title: 'Senior Full-Stack Engineer', company: 'TechCorp Inc.', match: 94, status: 'OPEN', salary: '$120K—$160K' },
  { title: 'DevOps Cloud Architect', company: 'CloudBase', match: 87, status: 'OPEN', salary: '$130K—$170K' },
  { title: 'AI/ML Engineer', company: 'DataLabs', match: 78, status: 'OPEN', salary: '$140K—$180K' },
  { title: 'Backend Engineer', company: 'StartupXYZ', match: 85, status: 'APPLIED', salary: '$100K—$140K' },
];

const CAREER_PATHS = [
  { role: 'Senior Full-Stack Engineer', probability: 94, trend: '▲' },
  { role: 'DevOps / Cloud Architect', probability: 87, trend: '▲' },
  { role: 'AI/ML Engineer', probability: 78, trend: '▲' },
  { role: 'Tech Lead / Engineering Mgr', probability: 62, trend: '▲' },
  { role: 'CTO / VP Engineering', probability: 41, trend: '►' },
];

function ProgressBar({ value, color = '#33ff00' }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 bg-[#1a1a1a] flex-1">
      <div
        className="h-full transition-all duration-700"
        style={{ width: `${value}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'career' | 'jobs' | 'progress'>('skills');

  const tabs = [
    { id: 'skills', label: '[ SKILL GRAPH ]' },
    { id: 'career', label: '[ CAREER PATHS ]' },
    { id: 'jobs', label: '[ JOB MATCHES ]' },
    { id: 'progress', label: '[ PROGRESS ]' },
  ] as const;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      {/* HEADER */}
      <header className="border-b border-[#1a1a1a] bg-[#0a0a0a] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="text-sm tracking-widest font-bold hover:opacity-80">[METAROLE.AI]</Link>
          <div className="flex items-center gap-2 text-xs text-[#555]">
            <span className="w-2 h-2 rounded-full bg-[#33ff00] animate-pulse inline-block" />
            <span>SYSTEM ONLINE</span>
            <span className="ml-4">USER: john_doe</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* TOP BAR */}
        <div className="mb-6">
          <div className="text-xs text-[#555] tracking-widest mb-1">&gt; metarole dashboard --user=john_doe</div>
          <h1 className="text-lg font-bold tracking-wider">CAREER INTELLIGENCE DASHBOARD</h1>
        </div>

        {/* KPI ROW */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'SKILLS MAPPED', value: '48', sub: '+12 this week', color: '#33ff00' },
            { label: 'SKILL GAPS', value: '7', sub: '3 critical', color: '#ff3333' },
            { label: 'JOB MATCHES', value: '24', sub: '4 applied', color: '#ffb000' },
            { label: 'CAREER SCORE', value: '87', sub: '/100 pts', color: '#33ff00' },
          ].map(kpi => (
            <div key={kpi.label} className="border border-[#1a1a1a] bg-[#111] p-4">
              <div className="text-[10px] text-[#555] tracking-widest mb-2">{kpi.label}</div>
              <div className="text-3xl font-bold" style={{ color: kpi.color }}>{kpi.value}</div>
              <div className="text-[10px] text-[#555] mt-1">{kpi.sub}</div>
            </div>
          ))}
        </div>

        {/* TABS */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs tracking-widest px-4 py-2 border transition-all ${
                activeTab === tab.id
                  ? 'border-[#33ff00] text-[#33ff00] bg-[#111]'
                  : 'border-[#1a1a1a] text-[#555] hover:border-[#1a8000] hover:text-[#1a8000]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* SKILL GRAPH TAB */}
        {activeTab === 'skills' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-[#1a1a1a] bg-[#111] p-6">
              <div className="text-xs text-[#555] tracking-widest mb-4">&gt; skill-matrix --visual</div>
              <div className="space-y-4">
                {SKILLS.map(skill => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-[#33ff00]">{skill.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-[#555] text-[10px]">[{skill.cat}]</span>
                        <span className="text-[#ffb000]">{skill.level}%</span>
                      </div>
                    </div>
                    <ProgressBar value={skill.level} color={skill.level > 80 ? '#33ff00' : skill.level > 60 ? '#ffb000' : '#ff3333'} />
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#1a1a1a] bg-[#111] p-6">
              <div className="text-xs text-[#555] tracking-widest mb-4">&gt; skill-gaps --critical</div>
              <div className="space-y-3">
                {[{ skill: 'Kubernetes', priority: 'CRITICAL', reason: 'Required by 89% of DevOps roles' },
                  { skill: 'GraphQL', priority: 'HIGH', reason: 'Required by 72% of Full-Stack roles' },
                  { skill: 'TensorFlow', priority: 'MEDIUM', reason: 'Required by 55% of ML roles' },
                  { skill: 'Redis', priority: 'LOW', reason: 'Preferred by 41% of backend roles' }].map(g => (
                  <div key={g.skill} className="flex gap-4 border border-[#1a1a1a] p-3">
                    <div className={`text-[10px] tracking-wider w-16 shrink-0 ${
                      g.priority === 'CRITICAL' ? 'text-[#ff3333]' :
                      g.priority === 'HIGH' ? 'text-[#ffb000]' :
                      g.priority === 'MEDIUM' ? 'text-[#33ff00]' : 'text-[#555]'
                    }`}>{g.priority}</div>
                    <div>
                      <div className="text-xs font-bold text-[#33ff00]">{g.skill}</div>
                      <div className="text-[10px] text-[#555] mt-0.5">{g.reason}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CAREER PATHS TAB */}
        {activeTab === 'career' && (
          <div className="border border-[#1a1a1a] bg-[#111] p-6">
            <div className="text-xs text-[#555] tracking-widest mb-6">&gt; predict --career-paths</div>
            <div className="space-y-4">
              {CAREER_PATHS.map((path, i) => (
                <div key={path.role} className="flex items-center gap-4">
                  <span className="text-[#555] text-sm w-6">{i + 1}.</span>
                  <div className="flex-1">
                    <div className="flex justify-between mb-1.5">
                      <span className="text-xs text-[#33ff00] font-bold">{path.role}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[#ffb000] text-[10px]">{path.trend}</span>
                        <span className="text-[#33ff00] text-xs font-bold">{path.probability}%</span>
                      </div>
                    </div>
                    <ProgressBar value={path.probability} color={path.probability > 80 ? '#33ff00' : '#ffb000'} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* JOB MATCHES TAB */}
        {activeTab === 'jobs' && (
          <div className="border border-[#1a1a1a] bg-[#111] p-6">
            <div className="text-xs text-[#555] tracking-widest mb-6">&gt; job-match --apply</div>
            <div className="space-y-3">
              {JOB_MATCHES.map(job => (
                <div key={job.title} className="border border-[#1a1a1a] p-4 flex flex-wrap gap-4 justify-between items-start hover:border-[#1a8000] transition-all">
                  <div>
                    <div className="text-sm font-bold text-[#33ff00]">{job.title}</div>
                    <div className="text-xs text-[#555] mt-1">{job.company}</div>
                    <div className="text-xs text-[#ffb000] mt-1">{job.salary}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-center">
                      <div className="text-xl font-bold text-[#33ff00]">{job.match}%</div>
                      <div className="text-[10px] text-[#555]">MATCH</div>
                    </div>
                    <button className={`text-[10px] tracking-widest border px-3 py-1.5 transition-all ${
                      job.status === 'APPLIED'
                        ? 'border-[#555] text-[#555] cursor-default'
                        : 'border-[#33ff00] text-[#33ff00] hover:bg-[#33ff00] hover:text-[#0a0a0a]'
                    }`}>
                      {job.status === 'APPLIED' ? '[ APPLIED ]' : '[ APPLY NOW ]'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PROGRESS TAB */}
        {activeTab === 'progress' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border border-[#1a1a1a] bg-[#111] p-6">
              <div className="text-xs text-[#555] tracking-widest mb-4">&gt; progress --tracker</div>
              <div className="space-y-4">
                {[
                  { label: 'PROFILE COMPLETION', value: 72 },
                  { label: 'SKILLS VERIFIED', value: 60 },
                  { label: 'RESUME OPTIMIZED', value: 85 },
                  { label: 'PORTFOLIO BUILT', value: 40 },
                  { label: 'JOBS APPLIED', value: 25 },
                ].map(p => (
                  <div key={p.label}>
                    <div className="flex justify-between text-[10px] mb-1.5">
                      <span className="text-[#555] tracking-wider">{p.label}</span>
                      <span className="text-[#33ff00]">{p.value}%</span>
                    </div>
                    <ProgressBar value={p.value} />
                  </div>
                ))}
              </div>
            </div>
            <div className="border border-[#1a1a1a] bg-[#111] p-6">
              <div className="text-xs text-[#555] tracking-widest mb-4">&gt; activity --log</div>
              <div className="space-y-3 text-xs">
                {[
                  { time: '2h ago', action: 'Resume uploaded and parsed', type: 'SUCCESS' },
                  { time: '1d ago', action: '3 job applications submitted', type: 'INFO' },
                  { time: '2d ago', action: 'Skill gap report generated', type: 'WARN' },
                  { time: '3d ago', action: 'Career prediction updated', type: 'SUCCESS' },
                  { time: '1w ago', action: 'Portfolio website generated', type: 'SUCCESS' },
                ].map((log, i) => (
                  <div key={i} className="flex gap-3">
                    <span className="text-[#333] w-12 shrink-0">{log.time}</span>
                    <span className={`w-14 shrink-0 ${
                      log.type === 'SUCCESS' ? 'text-[#33ff00]' :
                      log.type === 'WARN' ? 'text-[#ffb000]' : 'text-[#555]'
                    }`}>[{log.type}]</span>
                    <span className="text-[#555]">{log.action}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
