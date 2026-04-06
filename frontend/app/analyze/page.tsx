'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const SKILL_CATEGORIES = [
  {
    category: 'Frontend',
    skills: [
      { name: 'JavaScript', level: 88, gap: 0 },
      { name: 'TypeScript', level: 82, gap: 8 },
      { name: 'React', level: 85, gap: 5 },
      { name: 'Next.js', level: 70, gap: 20 },
      { name: 'CSS/Tailwind', level: 80, gap: 10 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 78, gap: 12 },
      { name: 'Python', level: 72, gap: 18 },
      { name: 'FastAPI', level: 55, gap: 35 },
      { name: 'REST APIs', level: 80, gap: 10 },
      { name: 'GraphQL', level: 35, gap: 55 },
    ],
  },
  {
    category: 'DevOps',
    skills: [
      { name: 'Docker', level: 58, gap: 32 },
      { name: 'Kubernetes', level: 20, gap: 70 },
      { name: 'CI/CD', level: 60, gap: 30 },
      { name: 'AWS/GCP', level: 45, gap: 45 },
    ],
  },
];

const RECOMMENDATIONS = [
  { priority: 'HIGH', skill: 'Kubernetes', reason: 'Required in 78% of Senior DevOps roles', time: '3-4 weeks', resource: 'CKA Certification' },
  { priority: 'HIGH', skill: 'GraphQL', reason: 'Demanded in 65% of Full-Stack positions', time: '2 weeks', resource: 'GraphQL Docs + Apollo' },
  { priority: 'MED', skill: 'System Design', reason: 'Critical for senior-level interviews', time: '4-6 weeks', resource: 'Designing Data-Intensive Apps' },
  { priority: 'MED', skill: 'AWS/GCP', reason: 'Cloud fluency expected at senior level', time: '3-5 weeks', resource: 'AWS Solutions Architect' },
  { priority: 'LOW', skill: 'FastAPI', reason: 'Trending Python backend framework', time: '1 week', resource: 'FastAPI Official Docs' },
];

export default function AnalyzePage() {
  const [activeTab, setActiveTab] = useState<'gaps' | 'skills' | 'recommendations'>('gaps');

  return (
    <div className="min-h-screen bg-terminal-bg p-4">
      <div className="border-b border-terminal-border pb-3 mb-6 flex justify-between items-center">
        <div>
          <Link href="/upload" className="text-terminal-muted text-xs hover:text-terminal-green">&lt; BACK_TO_UPLOAD</Link>
          <h1 className="text-terminal-green text-xl font-bold glow-green mt-1">AI_ANALYSIS_RESULTS</h1>
        </div>
        <Link href="/dashboard">
          <button className="btn-terminal text-xs py-1 px-3">[ DASHBOARD ]</button>
        </Link>
      </div>

      {/* Tab bar */}
      <div className="flex gap-0 mb-6 border-b border-terminal-border">
        {(['gaps', 'skills', 'recommendations'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-mono text-xs px-6 py-2 uppercase transition-all ${
              activeTab === tab
                ? 'border-b-2 border-terminal-green text-terminal-green'
                : 'text-terminal-muted hover:text-terminal-text'
            }`}
          >
            {tab.replace('_', ' ')}
          </button>
        ))}
      </div>

      {activeTab === 'gaps' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {SKILL_CATEGORIES.map((cat) => (
            <div key={cat.category} className="terminal-window">
              <div className="terminal-titlebar">
                <span>{cat.category.toLowerCase()}_skills.json</span>
              </div>
              <div className="terminal-body">
                <div className="space-y-3">
                  {cat.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className={skill.gap > 40 ? 'text-red' : skill.gap > 20 ? 'text-amber' : 'text-green'}>
                          {skill.name} {skill.gap > 40 ? '[CRITICAL_GAP]' : skill.gap > 20 ? '[NEEDS_WORK]' : '[PROFICIENT]'}
                        </span>
                        <span className="text-terminal-muted">You: {skill.level}% | Target: {Math.min(skill.level + skill.gap, 100)}%</span>
                      </div>
                      <div className="flex gap-1 h-2">
                        <div className="bg-terminal-green" style={{ width: `${skill.level}%`, boxShadow: '0 0 4px var(--terminal-green)' }} />
                        <div className="bg-terminal-amber opacity-40" style={{ width: `${skill.gap}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'recommendations' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          <div className="text-terminal-amber text-xs mb-4">&gt; LEARNING_ROADMAP generated based on target role: Senior Full-Stack Engineer</div>
          {RECOMMENDATIONS.map((rec, i) => (
            <motion.div
              key={rec.skill}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="terminal-card p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className={`text-xs font-bold px-2 py-0.5 border ${
                      rec.priority === 'HIGH' ? 'border-red text-red' : rec.priority === 'MED' ? 'border-terminal-amber text-amber' : 'border-terminal-green text-green'
                    }`}>[{rec.priority}]</span>
                    <span className="text-terminal-green font-bold text-sm">{rec.skill}</span>
                  </div>
                  <p className="text-terminal-muted text-xs">{rec.reason}</p>
                  <div className="text-terminal-muted text-xs mt-1">
                    ⏱ {rec.time} • 📖 {rec.resource}
                  </div>
                </div>
                <button className="btn-terminal text-xs py-1 px-3 ml-4">START</button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {activeTab === 'skills' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="terminal-window">
            <div className="terminal-titlebar"><span>extracted_skills.json</span></div>
            <div className="terminal-body">
              <pre className="text-xs text-terminal-green">{JSON.stringify({
                total_skills: 47,
                top_skills: ['JavaScript', 'React', 'TypeScript', 'Node.js', 'Python'],
                experience_years: 4.5,
                education: 'B.Sc Computer Science',
                projects: 12,
                github_repos: 23,
              }, null, 2)}</pre>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
