'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SKILL_DATA = [
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'TypeScript', level: 82, category: 'Frontend' },
  { name: 'React', level: 85, category: 'Frontend' },
  { name: 'Node.js', level: 78, category: 'Backend' },
  { name: 'Python', level: 72, category: 'Backend' },
  { name: 'PostgreSQL', level: 65, category: 'Database' },
  { name: 'Docker', level: 58, category: 'DevOps' },
  { name: 'Kubernetes', level: 20, category: 'DevOps' },
  { name: 'GraphQL', level: 35, category: 'API' },
  { name: 'System Design', level: 45, category: 'Architecture' },
];

const CAREER_PATHS = [
  { role: 'Senior Full-Stack Engineer', match: 82, trend: '+5%', hot: true },
  { role: 'DevOps Engineer', match: 79, trend: '+12%', hot: true },
  { role: 'ML Engineer', match: 64, trend: '+28%', hot: true },
  { role: 'Backend Engineer', match: 77, trend: '+3%', hot: false },
  { role: 'Solutions Architect', match: 55, trend: '+8%', hot: false },
];

const JOB_MATCHES = [
  { title: 'Senior React Developer', company: 'TechCorp Inc.', match: 91, salary: '$120k-160k', location: 'Remote' },
  { title: 'Full-Stack Engineer', company: 'StartupXYZ', match: 87, salary: '$100k-140k', location: 'SF, CA' },
  { title: 'Frontend Lead', company: 'DevHouse', match: 84, salary: '$130k-170k', location: 'Remote' },
  { title: 'Node.js Backend Dev', company: 'CloudBase', match: 79, salary: '$110k-150k', location: 'NYC, NY' },
];

function ProgressBar({ value, color = 'green' }: { value: number; color?: string }) {
  return (
    <div className="h-2 bg-terminal-border w-full">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="h-full"
        style={{
          background: color === 'amber' ? 'var(--terminal-amber)' : 'var(--terminal-green)',
          boxShadow: color === 'amber' ? '0 0 6px var(--terminal-amber)' : '0 0 6px var(--terminal-green)'
        }}
      />
    </div>
  );
}

function SkillsPanel() {
  return (
    <div className="terminal-window h-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-2">skill_graph.sh</span>
      </div>
      <div className="terminal-body">
        <div className="text-terminal-amber text-xs mb-4">&gt; SKILL_ANALYSIS OUTPUT</div>
        <div className="space-y-3">
          {SKILL_DATA.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between text-xs mb-1">
                <span className={skill.level < 40 ? 'text-red' : skill.level < 70 ? 'text-amber' : 'text-green'}>
                  {skill.name}
                </span>
                <span className="text-terminal-muted">[{skill.category}] {skill.level}%</span>
              </div>
              <ProgressBar value={skill.level} color={skill.level < 50 ? 'amber' : 'green'} />
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4 border-t border-terminal-border text-xs text-terminal-muted">
          <div>&gt; GAP_DETECTED: Kubernetes (80%), GraphQL (65%), System Design (55%)</div>
        </div>
      </div>
    </div>
  );
}

function CareerPanel() {
  return (
    <div className="terminal-window h-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-2">career_predictor.py</span>
      </div>
      <div className="terminal-body">
        <div className="text-terminal-amber text-xs mb-4">&gt; CAREER_PATH PREDICTIONS</div>
        <div className="space-y-3">
          {CAREER_PATHS.map((path, i) => (
            <motion.div
              key={path.role}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border-l-2 border-terminal-border pl-3"
            >
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="text-terminal-text">{path.role}</span>
                {path.hot && <span className="text-terminal-amber text-xs">[HOT]</span>}
              </div>
              <div className="flex items-center gap-2">
                <ProgressBar value={path.match} />
                <span className="text-terminal-green text-xs whitespace-nowrap">{path.match}%</span>
                <span className="text-terminal-amber text-xs">{path.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function JobsPanel() {
  return (
    <div className="terminal-window h-full">
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-2">job_matcher.sh --top4</span>
      </div>
      <div className="terminal-body">
        <div className="text-terminal-amber text-xs mb-4">&gt; TOP JOB MATCHES</div>
        <div className="space-y-3">
          {JOB_MATCHES.map((job, i) => (
            <motion.div
              key={job.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.15 }}
              className="terminal-card p-3 cursor-pointer"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-terminal-green text-xs font-bold">{job.title}</div>
                  <div className="text-terminal-muted text-xs">{job.company} • {job.location}</div>
                </div>
                <div className="text-right">
                  <div className="text-terminal-green text-xs font-bold">{job.match}%</div>
                  <div className="text-terminal-muted text-xs">{job.salary}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-4">
          <button className="btn-terminal w-full text-xs py-2">[ LOAD MORE MATCHES ]</button>
        </div>
      </div>
    </div>
  );
}

function ProgressPanel() {
  const milestones = [
    { label: 'Resume Uploaded', done: true },
    { label: 'Skills Analyzed', done: true },
    { label: 'Career Paths Predicted', done: true },
    { label: 'Resume Generated', done: false },
    { label: 'Portfolio Created', done: false },
    { label: 'Jobs Applied', done: false },
  ];

  return (
    <div className="terminal-window">
      <div className="terminal-titlebar">
        <span>progress_tracker.sh</span>
      </div>
      <div className="terminal-body">
        <div className="text-terminal-amber text-xs mb-4">&gt; CAREER_MISSION PROGRESS [3/6]</div>
        <div className="space-y-2">
          {milestones.map((m, i) => (
            <div key={m.label} className="flex items-center gap-3 text-xs">
              <span className={m.done ? 'text-terminal-green' : 'text-terminal-muted'}>
                {m.done ? '[✓]' : '[ ]'}
              </span>
              <span className={m.done ? 'text-terminal-text' : 'text-terminal-muted'}>
                {String(i + 1).padStart(2, '0')}. {m.label}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-terminal-border">
          <ProgressBar value={50} />
          <div className="text-xs text-terminal-muted mt-1">OVERALL_PROGRESS: 50% — 3 tasks remaining</div>
        </div>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg">
      {/* Top bar */}
      <div className="border-b border-terminal-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="text-terminal-green font-bold text-sm glow-green">METAROLE_AI</span>
          <span className="text-terminal-muted text-xs">/ DASHBOARD</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-terminal-muted font-mono">
          <span>SESSION: ACTIVE</span>
          <span className="text-terminal-green">{time.toLocaleTimeString()}</span>
          <Link href="/upload"><button className="btn-terminal text-xs py-1 px-3">[ UPLOAD_RESUME ]</button></Link>
        </div>
      </div>

      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-terminal-border border-b border-terminal-border">
        {[
          { label: 'SKILLS_IDENTIFIED', val: '47', color: 'green' },
          { label: 'CAREER_MATCHES', val: '5', color: 'amber' },
          { label: 'JOB_MATCHES', val: '23', color: 'green' },
          { label: 'PROFILE_SCORE', val: '76%', color: 'amber' },
        ].map((kpi) => (
          <div key={kpi.label} className="bg-terminal-bg px-4 py-3">
            <div className="text-xs text-terminal-muted">{kpi.label}</div>
            <div className={`text-2xl font-bold ${kpi.color === 'green' ? 'text-green glow-green' : 'text-amber glow-amber'}`}>
              {kpi.val}
            </div>
          </div>
        ))}
      </div>

      {/* Main grid */}
      <div className="p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="min-h-96"><SkillsPanel /></div>
        <div className="min-h-96"><CareerPanel /></div>
        <div className="min-h-72"><JobsPanel /></div>
        <div className="min-h-72"><ProgressPanel /></div>
      </div>
    </div>
  );
}
