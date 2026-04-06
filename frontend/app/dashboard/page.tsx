'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import SkillGraph, { Skill } from '@/components/graphs/SkillGraph';
import TerminalWindow from '@/components/terminal/TerminalWindow';

// Demo data — replace with real API calls
const DEMO_SKILLS: Skill[] = [
  { name: 'JavaScript', level: 88, category: 'Frontend' },
  { name: 'React', level: 82, category: 'Frontend' },
  { name: 'Next.js', level: 75, category: 'Frontend' },
  { name: 'TypeScript', level: 60, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'Express.js', level: 78, category: 'Backend' },
  { name: 'Python', level: 70, category: 'Backend' },
  { name: 'PostgreSQL', level: 65, category: 'Database' },
  { name: 'Solidity', level: 72, category: 'Blockchain' },
  { name: 'Docker', level: 50, category: 'DevOps' },
];

const DEMO_CAREER_PATHS = [
  { role: 'Senior Full-Stack Engineer', probability: 92.4, timeframe: '12-18 months' },
  { role: 'Lead Backend Engineer', probability: 88.1, timeframe: '18-24 months' },
  { role: 'Software Architect', probability: 79.6, timeframe: '24-36 months' },
  { role: 'Blockchain Developer', probability: 76.3, timeframe: '6-12 months' },
  { role: 'DevOps Engineer', probability: 58.2, timeframe: '18-24 months' },
];

const DEMO_JOBS = [
  { title: 'Senior SWE', company: 'Google', match: 96.2, location: 'Remote' },
  { title: 'Full-Stack Engineer', company: 'Stripe', match: 94.8, location: 'Remote' },
  { title: 'Platform Engineer', company: 'Vercel', match: 93.1, location: 'Remote' },
  { title: 'Software Engineer', company: 'Coinbase', match: 91.4, location: 'San Francisco' },
  { title: 'Backend Engineer', company: 'OpenAI', match: 89.7, location: 'Remote' },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'careers' | 'jobs' | 'progress'>('skills');

  return (
    <DashboardLayout>
      <div className="dashboard-page">
        {/* Header */}
        <div className="dashboard-header">
          <div className="dashboard-title">
            <span className="prompt">&gt;</span> COMMAND CENTER
          </div>
          <div className="dashboard-meta">
            <span className="meta-item">
              <span className="status-dot" /> ANALYZING
            </span>
            <span className="meta-item">USER: john_doe</span>
            <span className="meta-item">SESSION: #4821</span>
          </div>
        </div>

        {/* KPI Row */}
        <div className="kpi-row">
          {[
            { label: 'SKILLS MAPPED', value: '23', delta: '+3 this week' },
            { label: 'SKILL GAPS', value: '7', delta: '-2 closed' },
            { label: 'JOB MATCHES', value: '47', delta: '+12 new' },
            { label: 'CAREER SCORE', value: '87.4', delta: '+5.2 pts' },
          ].map(kpi => (
            <div key={kpi.label} className="kpi-card">
              <div className="kpi-label">{kpi.label}</div>
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-delta">{kpi.delta}</div>
            </div>
          ))}
        </div>

        {/* Tab bar */}
        <div className="dashboard-tabs" role="tablist">
          {(['skills', 'careers', 'jobs', 'progress'] as const).map(tab => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              className={`dash-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab panels */}
        <div className="dashboard-content" role="tabpanel">
          {activeTab === 'skills' && (
            <TerminalWindow title="skill-graph">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole skill-graph --visualize
              </div>
              <SkillGraph skills={DEMO_SKILLS} />
            </TerminalWindow>
          )}

          {activeTab === 'careers' && (
            <TerminalWindow title="career-prediction">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole predict --top=5
              </div>
              <div className="career-list">
                {DEMO_CAREER_PATHS.map((c, i) => (
                  <div key={c.role} className="career-item">
                    <span className="career-rank">[{String(i+1).padStart(2,'0')}]</span>
                    <span className="career-role">{c.role}</span>
                    <div className="career-bar-track">
                      <div className="career-bar-fill" style={{ width: `${c.probability}%` }} />
                    </div>
                    <span className="career-prob neon-green">{c.probability}%</span>
                    <span className="career-time">{c.timeframe}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          )}

          {activeTab === 'jobs' && (
            <TerminalWindow title="job-matches">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole match-jobs --sorted=match
              </div>
              <div className="jobs-list">
                {DEMO_JOBS.map((j, i) => (
                  <div key={i} className="job-item">
                    <span className="job-match">{j.match}%</span>
                    <div className="job-info">
                      <span className="job-title">{j.title}</span>
                      <span className="job-company">{j.company}</span>
                    </div>
                    <span className="job-location">{j.location}</span>
                    <button className="job-apply-btn">[ APPLY ]</button>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          )}

          {activeTab === 'progress' && (
            <TerminalWindow title="progress-tracker">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole status --full
              </div>
              <div className="progress-list">
                {[
                  { task: 'Resume uploaded', done: true },
                  { task: 'Skills extracted', done: true },
                  { task: 'Skill gap analyzed', done: true },
                  { task: 'Career paths predicted', done: true },
                  { task: 'Tailored resume generated', done: false },
                  { task: 'Portfolio built', done: false },
                  { task: 'Jobs matched', done: true },
                  { task: 'Applications submitted', done: false },
                ].map((item, i) => (
                  <div key={i} className={`progress-item ${item.done ? 'done' : 'pending'}`}>
                    <span className="progress-icon">{item.done ? '✓' : '□'}</span>
                    <span className="progress-label">{item.task}</span>
                    <span className="progress-status">{item.done ? 'COMPLETE' : 'PENDING'}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
