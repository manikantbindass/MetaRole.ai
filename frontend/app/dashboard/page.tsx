'use client';
import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import TerminalWindow from '@/components/ui/TerminalWindow';
import CareerProgressTracker from '@/components/dashboard/CareerProgressTracker';
import JobMatches from '@/components/dashboard/JobMatches';

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<'overview' | 'jobs' | 'progress'>('overview');

  const kpis = [
    { label: 'Skills Indexed', value: '24', delta: '+3', color: 'text-green' },
    { label: 'Career Match', value: '91%', delta: '+6%', color: 'text-green glow-green' },
    { label: 'Skill Gaps', value: '4', delta: '-2', color: 'text-amber' },
    { label: 'Job Matches', value: '18', delta: '+5', color: 'text-cyan' },
  ];

  return (
    <>
      <NavBar />
      <main className="min-h-screen grid-bg pt-24 px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-muted text-xs">USER@METAROLE ~ $ dashboard --mode=live</p>
              <h1 className="text-xl font-bold text-green glow-green">CAREER_DASHBOARD.exe</h1>
            </div>
            <div className="status-online text-xs text-green">SYSTEM ONLINE</div>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            {kpis.map((k) => (
              <div key={k.label} className="terminal-window p-4">
                <p className="text-muted text-xs mb-1 uppercase tracking-widest">{k.label}</p>
                <p className={`text-2xl font-bold tabular-nums ${k.color}`}>{k.value}</p>
                <p className="text-xs text-muted">{k.delta} this week</p>
              </div>
            ))}
          </div>

          {/* Pane Navigation */}
          <div className="flex gap-0 mb-4 border border-green-dim">
            {(['overview', 'jobs', 'progress'] as const).map(pane => (
              <button
                key={pane}
                onClick={() => setActivePane(pane)}
                className={`flex-1 py-2 text-xs font-bold uppercase tracking-widest transition-all ${
                  activePane === pane ? 'bg-green text-black' : 'text-muted hover:text-green'
                }`}
              >
                [{pane.toUpperCase()}]
              </button>
            ))}
          </div>

          {/* Panes */}
          {activePane === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <TerminalWindow title="skill-summary">
                <p className="text-xs text-muted mb-3">[SNAPSHOT] Current competency profile</p>
                {[
                  { skill: 'JavaScript', level: 88 },
                  { skill: 'React/Next.js', level: 85 },
                  { skill: 'Node.js', level: 78 },
                  { skill: 'Solidity', level: 72 },
                  { skill: 'PostgreSQL', level: 65 },
                ].map(s => (
                  <div key={s.skill} className="mb-2">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white">{s.skill}</span>
                      <span className="text-green">{s.level}%</span>
                    </div>
                    <div className="skill-bar"><div className="skill-bar-fill" style={{ width: `${s.level}%` }} /></div>
                  </div>
                ))}
              </TerminalWindow>
              <TerminalWindow title="ai-recommendations">
                <p className="text-xs text-muted mb-3">[AI] Next best actions for career growth</p>
                {[
                  { action: 'Learn Kubernetes fundamentals', priority: 'HIGH', time: '~40hrs' },
                  { action: 'Build a GraphQL API project', priority: 'MEDIUM', time: '~20hrs' },
                  { action: 'Get AWS Certified Developer', priority: 'HIGH', time: '~60hrs' },
                  { action: 'Contribute to open source', priority: 'LOW', time: 'Ongoing' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-start mb-2 pb-2 border-b border-green-dim last:border-0">
                    <p className="text-white text-xs max-w-48">{item.action}</p>
                    <div className="text-right shrink-0 ml-2">
                      <p className={`text-xs font-bold ${
                        item.priority === 'HIGH' ? 'text-red' : item.priority === 'MEDIUM' ? 'text-amber' : 'text-muted'
                      }`}>{item.priority}</p>
                      <p className="text-muted text-xs">{item.time}</p>
                    </div>
                  </div>
                ))}
              </TerminalWindow>
            </div>
          )}

          {activePane === 'jobs' && <JobMatches />}
          {activePane === 'progress' && <CareerProgressTracker />}
        </div>
      </main>
    </>
  );
}
