'use client';
import { useState } from 'react';
import NavBar from '@/components/layout/NavBar';
import TerminalWindow from '@/components/ui/TerminalWindow';
import SkillGraph from '@/components/dashboard/SkillGraph';

const MOCK_SKILLS = [
  { name: 'JavaScript', level: 88, category: 'language' },
  { name: 'TypeScript', level: 75, category: 'language' },
  { name: 'Python', level: 70, category: 'language' },
  { name: 'React', level: 85, category: 'framework' },
  { name: 'Node.js', level: 78, category: 'runtime' },
  { name: 'Solidity', level: 72, category: 'language' },
  { name: 'PostgreSQL', level: 65, category: 'database' },
  { name: 'Docker', level: 55, category: 'devops' },
];

const MOCK_GAPS = [
  { skill: 'Kubernetes', priority: 'HIGH', reason: 'Required by 73% of target roles' },
  { skill: 'GraphQL', priority: 'MEDIUM', reason: 'Listed in 45% of senior jobs' },
  { skill: 'AWS/Cloud', priority: 'HIGH', reason: 'Critical for remote positions' },
  { skill: 'System Design', priority: 'HIGH', reason: 'Senior-level requirement' },
];

const MOCK_CAREERS = [
  { role: 'Full Stack Engineer', match: 91, salary: '$85k–$130k' },
  { role: 'Blockchain Developer', match: 87, salary: '$90k–$145k' },
  { role: 'Backend Engineer', match: 83, salary: '$80k–$125k' },
  { role: 'DevOps Engineer', match: 61, salary: '$95k–$150k' },
];

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'gaps' | 'careers'>('skills');

  return (
    <>
      <NavBar />
      <main className="min-h-screen grid-bg pt-24 px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <p className="text-muted text-sm mb-1">// STEP 02</p>
            <h1 className="text-xl font-bold text-green glow-green mb-2">SKILL_ANALYSIS.exe</h1>
            <p className="text-white text-sm">AI-powered breakdown of your competencies vs market demand.</p>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 mb-6 border border-green-dim">
            {(['skills', 'gaps', 'careers'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
                  activeTab === tab
                    ? 'bg-green text-black'
                    : 'bg-transparent text-muted hover:text-green hover:bg-surface-2'
                }`}
              >
                [{tab.toUpperCase()}]
              </button>
            ))}
          </div>

          {activeTab === 'skills' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SkillGraph skills={MOCK_SKILLS} />
              <TerminalWindow title="skill-index">
                {MOCK_SKILLS.map(s => (
                  <div key={s.name} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-white">{s.name}</span>
                      <span className={s.level >= 80 ? 'text-green' : s.level >= 60 ? 'text-amber' : 'text-red'}>
                        {s.level}%
                      </span>
                    </div>
                    <div className="skill-bar">
                      <div className="skill-bar-fill" style={{ width: `${s.level}%` }} />
                    </div>
                  </div>
                ))}
              </TerminalWindow>
            </div>
          )}

          {activeTab === 'gaps' && (
            <TerminalWindow title="gap-analyzer">
              <p className="text-xs text-muted mb-4">[AI] Comparing profile against 50,000+ job postings...</p>
              {MOCK_GAPS.map((g, i) => (
                <div key={i} className="border border-green-dim p-3 mb-3">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-green font-bold text-sm">{g.skill}</span>
                    <span className={`text-xs font-bold ${
                      g.priority === 'HIGH' ? 'text-red' : 'text-amber'
                    }`}>[{g.priority}]</span>
                  </div>
                  <p className="text-muted text-xs">{g.reason}</p>
                </div>
              ))}
            </TerminalWindow>
          )}

          {activeTab === 'careers' && (
            <TerminalWindow title="career-predictor">
              <p className="text-xs text-muted mb-4">[AI] Running career path probability matrix...</p>
              {MOCK_CAREERS.map((c, i) => (
                <div key={i} className="border border-green-dim p-3 mb-3 flex justify-between items-center">
                  <div>
                    <p className="text-green font-bold text-sm">{c.role}</p>
                    <p className="text-muted text-xs">{c.salary}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${
                      c.match >= 85 ? 'text-green glow-green' : c.match >= 70 ? 'text-amber' : 'text-red'
                    }`}>{c.match}%</p>
                    <p className="text-muted text-xs">MATCH</p>
                  </div>
                </div>
              ))}
            </TerminalWindow>
          )}

          <div className="mt-6 flex gap-4">
            <a href="/dashboard" className="btn-terminal text-sm">[ OPEN DASHBOARD ]</a>
          </div>
        </div>
      </main>
    </>
  );
}
