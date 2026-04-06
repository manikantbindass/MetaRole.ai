'use client';

import { useState } from 'react';
import Link from 'next/link';

const MOCK_SKILLS = [
  { name: 'JavaScript', level: 92, category: 'Frontend' },
  { name: 'React/Next.js', level: 88, category: 'Frontend' },
  { name: 'Node.js', level: 78, category: 'Backend' },
  { name: 'Solidity', level: 72, category: 'Blockchain' },
  { name: 'Python', level: 65, category: 'Backend' },
  { name: 'PostgreSQL', level: 60, category: 'Database' },
  { name: 'Docker', level: 45, category: 'DevOps' },
  { name: 'Kubernetes', level: 20, category: 'DevOps' },
  { name: 'GraphQL', level: 35, category: 'API' },
  { name: 'System Design', level: 40, category: 'Architecture' },
];

const CAREER_PATHS = [
  { role: 'Full-Stack Engineer', probability: 91, timeline: '0-6 months', match: 'HIGH' },
  { role: 'Blockchain Developer', probability: 84, timeline: '0-3 months', match: 'HIGH' },
  { role: 'Backend Architect', probability: 67, timeline: '6-12 months', match: 'MED' },
  { role: 'DevOps Engineer', probability: 45, timeline: '12-18 months', match: 'LOW' },
  { role: 'AI/ML Engineer', probability: 38, timeline: '18-24 months', match: 'LOW' },
];

const GAPS = [
  { skill: 'Kubernetes', priority: 'HIGH', demand: '94%' },
  { skill: 'GraphQL', priority: 'HIGH', demand: '87%' },
  { skill: 'System Design', priority: 'HIGH', demand: '96%' },
  { skill: 'AWS/GCP', priority: 'MED', demand: '82%' },
  { skill: 'Redis', priority: 'MED', demand: '71%' },
];

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: '#33ff00',
  Backend: '#ffb000',
  Blockchain: '#00ffff',
  Database: '#ff44ff',
  DevOps: '#ff4444',
  API: '#44ff88',
  Architecture: '#ffff00',
};

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState<'skills' | 'careers' | 'gaps'>('skills');

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

      <nav className="border-b border-[#33ff00]/20 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">← METAROLE_AI</Link>
        <span className="text-[#33ff00]/40 text-xs tracking-widest">ANALYSIS_OUTPUT</span>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// ANALYSIS.RESULT</div>
            <h1 className="text-2xl font-bold tracking-widest">SKILL_ANALYSIS_REPORT</h1>
          </div>
          <div className="border border-[#33ff00]/20 px-4 py-2 text-xs text-[#33ff00]/60">
            SCAN_ID: <span className="text-[#ffb000]">MR-2025-{Math.random().toString(36).slice(2,8).toUpperCase()}</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#33ff00]/20 mb-8">
          {(['skills', 'careers', 'gaps'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-xs tracking-widest uppercase transition-all border-b-2 ${
                activeTab === tab
                  ? 'border-[#33ff00] text-[#33ff00]'
                  : 'border-transparent text-[#33ff00]/40 hover:text-[#33ff00]/70'
              }`}
            >
              [{tab.toUpperCase()}]
            </button>
          ))}
        </div>

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-6 tracking-widest">// SKILL_GRAPH.RENDER — {MOCK_SKILLS.length} SKILLS DETECTED</div>
            <div className="space-y-4">
              {MOCK_SKILLS.map((skill, i) => (
                <div key={i} className="border border-[#33ff00]/10 p-4 hover:border-[#33ff00]/30 transition-colors">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-3">
                      <span className="text-xs px-2 py-0.5 border" style={{ borderColor: `${CATEGORY_COLORS[skill.category]}40`, color: CATEGORY_COLORS[skill.category] }}>
                        {skill.category}
                      </span>
                      <span className="text-sm font-bold text-[#33ff00]">{skill.name}</span>
                    </div>
                    <span className="text-[#ffb000] font-bold">{skill.level}%</span>
                  </div>
                  <div className="h-1 bg-[#33ff00]/10">
                    <div
                      className="h-full transition-all duration-1000"
                      style={{ width: `${skill.level}%`, backgroundColor: CATEGORY_COLORS[skill.category] }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CAREERS TAB */}
        {activeTab === 'careers' && (
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-6 tracking-widest">// CAREER_PATHS.PREDICTED — TOP 5 ROLES</div>
            <div className="space-y-4">
              {CAREER_PATHS.map((path, i) => (
                <div key={i} className="border border-[#33ff00]/10 p-5 hover:border-[#33ff00]/30 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-3">
                    <div>
                      <span className="text-xs text-[#33ff00]/40 tracking-widest">RANK_{String(i+1).padStart(2,'0')}</span>
                      <h3 className="text-base font-bold text-[#33ff00] mt-1">{path.role}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 border ${
                        path.match === 'HIGH' ? 'border-[#33ff00]/40 text-[#33ff00]' :
                        path.match === 'MED' ? 'border-[#ffb000]/40 text-[#ffb000]' :
                        'border-[#ff4444]/40 text-[#ff4444]'
                      }`}>{path.match}_MATCH</span>
                      <span className="text-[#ffb000] font-bold text-lg">{path.probability}%</span>
                    </div>
                  </div>
                  <div className="h-1 bg-[#33ff00]/10 mb-2">
                    <div className="h-full bg-[#33ff00] transition-all" style={{ width: `${path.probability}%` }} />
                  </div>
                  <div className="text-xs text-[#33ff00]/40">
                    TIMELINE: <span className="text-[#33ff00]/70">{path.timeline}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GAPS TAB */}
        {activeTab === 'gaps' && (
          <div>
            <div className="text-xs text-[#33ff00]/40 mb-6 tracking-widest">// SKILL_GAPS.IDENTIFIED — ACTION_REQUIRED</div>
            <div className="space-y-4">
              {GAPS.map((gap, i) => (
                <div key={i} className="border border-[#ff4444]/20 p-5 hover:border-[#ff4444]/40 transition-colors">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                    <div>
                      <div className="text-xs text-[#33ff00]/40 mb-1 tracking-widest">GAP_{String(i+1).padStart(2,'0')}</div>
                      <h3 className="text-base font-bold text-[#ff4444]">{gap.skill}</h3>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-2 py-1 border ${
                        gap.priority === 'HIGH' ? 'border-[#ff4444]/40 text-[#ff4444]' : 'border-[#ffb000]/40 text-[#ffb000]'
                      }`}>PRIORITY_{gap.priority}</span>
                      <div className="text-right">
                        <div className="text-[#ffb000] font-bold">{gap.demand}</div>
                        <div className="text-[#33ff00]/30 text-xs">MARKET_DEMAND</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 border border-[#33ff00]/20 p-4">
              <div className="text-xs text-[#33ff00]/40 mb-4 tracking-widest">RECOMMENDED_ACTIONS:</div>
              <ul className="space-y-2 text-xs text-[#33ff00]/60">
                <li>{'>'} Complete Kubernetes certification (CKA) — 3 weeks</li>
                <li>{'>'} Build a GraphQL API project on GitHub</li>
                <li>{'>'} Study system design patterns (Grokking book)</li>
                <li>{'>'} Get AWS Solutions Architect certification</li>
              </ul>
            </div>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex flex-wrap gap-4 mt-10">
          <Link href="/output" className="border border-[#33ff00] bg-[#33ff00]/10 px-8 py-3 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all">
            [ GENERATE_RESUME ]
          </Link>
          <Link href="/dashboard" className="border border-[#33ff00]/30 px-8 py-3 text-sm tracking-widest text-[#33ff00]/60 hover:border-[#33ff00]/60 hover:text-[#33ff00] transition-all">
            [ DASHBOARD ]
          </Link>
        </div>
      </div>
    </main>
  );
}
