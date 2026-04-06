'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TypewriterText } from '@/components/terminal/TypewriterText';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { SkillGraph } from '@/components/graphs/SkillGraph';
import { motion } from 'framer-motion';
import Link from 'next/link';

const mockAnalysisData = {
  skills: [
    { name: 'JavaScript', level: 85, category: 'Frontend' },
    { name: 'React', level: 80, category: 'Frontend' },
    { name: 'TypeScript', level: 75, category: 'Frontend' },
    { name: 'Node.js', level: 70, category: 'Backend' },
    { name: 'Python', level: 65, category: 'Backend' },
    { name: 'PostgreSQL', level: 60, category: 'Database' },
    { name: 'Docker', level: 45, category: 'DevOps' },
    { name: 'AWS', level: 40, category: 'DevOps' },
  ],
  gaps: [
    { skill: 'Kubernetes', importance: 'HIGH', timeToLearn: '3 months' },
    { skill: 'System Design', importance: 'HIGH', timeToLearn: '2 months' },
    { skill: 'GraphQL', importance: 'MEDIUM', timeToLearn: '1 month' },
    { skill: 'Redis', importance: 'MEDIUM', timeToLearn: '2 weeks' },
  ],
  careerPaths: [
    { role: 'Senior Full-Stack Engineer', match: 87, salary: '$120k-150k', companies: ['Meta', 'Google', 'Stripe'] },
    { role: 'Backend Engineer', match: 79, salary: '$110k-140k', companies: ['AWS', 'Netflix', 'Uber'] },
    { role: 'DevOps Engineer', match: 63, salary: '$115k-145k', companies: ['HashiCorp', 'Datadog', 'PagerDuty'] },
  ],
};

export default function AnalyzePage() {
  const [activeSection, setActiveSection] = useState<'skills' | 'gaps' | 'paths'>('skills');
  const [isLoading, setIsLoading] = useState(true);
  const [loadStep, setLoadStep] = useState(0);

  const loadSteps = [
    'Connecting to AI engine...',
    'Loading resume data...',
    'Running skill_gap.py...',
    'Running career_predictor.py...',
    'Generating visualizations...',
    'Analysis complete.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadStep(prev => {
        if (prev >= loadSteps.length - 1) {
          clearInterval(interval);
          setTimeout(() => setIsLoading(false), 500);
          return prev;
        }
        return prev + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono flex items-center justify-center">
        <TerminalWindow title="analyze.py --running" className="w-full max-w-lg">
          <div className="space-y-2 text-sm">
            {loadSteps.slice(0, loadStep + 1).map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className={i === loadStep ? 'text-terminal-amber' : 'text-terminal-green/60'}
              >
                {i < loadStep ? '[✓]' : '[→]'} {step}
              </motion.div>
            ))}
            {loadStep < loadSteps.length - 1 && (
              <div className="text-terminal-green/40">&gt; <BlinkingCursor /></div>
            )}
          </div>
        </TerminalWindow>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto p-6 max-w-6xl">
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <TypewriterText text="> ANALYSIS_RESULTS.json" speed={40} className="text-xl font-bold" />
            <div className="text-terminal-green/50 text-xs mt-1">[TIMESTAMP: {new Date().toISOString()}]</div>
          </div>
          <div className="flex gap-2">
            {(['skills', 'gaps', 'paths'] as const).map(section => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 text-xs border transition-all ${
                  activeSection === section 
                    ? 'border-terminal-green bg-terminal-green text-terminal-bg' 
                    : 'border-terminal-green/30 hover:border-terminal-green/60'
                }`}
              >
                [{section.toUpperCase()}]
              </button>
            ))}
          </div>
        </div>

        {activeSection === 'skills' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TerminalWindow title="skill_map.d3">
              <SkillGraph skills={mockAnalysisData.skills} />
            </TerminalWindow>
            <TerminalWindow title="skills_breakdown.json">
              <div className="space-y-2">
                {mockAnalysisData.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-3"
                  >
                    <span className="text-xs text-terminal-green/60 w-24 truncate">{skill.name}</span>
                    <div className="flex-1 bg-terminal-bg border border-terminal-green/20 h-1">
                      <motion.div
                        className="h-full bg-terminal-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ delay: i * 0.08 + 0.3, duration: 0.6 }}
                      />
                    </div>
                    <span className="text-xs text-terminal-amber w-8 text-right">{skill.level}%</span>
                    <span className="text-xs text-terminal-green/40 w-16 text-right">[{skill.category}]</span>
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>
          </div>
        )}

        {activeSection === 'gaps' && (
          <TerminalWindow title="skill_gaps.json">
            <div className="mb-3 text-terminal-amber text-sm">&gt; GAPS_DETECTED: {mockAnalysisData.gaps.length} critical skill gaps found</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockAnalysisData.gaps.map((gap, i) => (
                <motion.div
                  key={gap.skill}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="border border-terminal-amber/30 p-4"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="font-bold text-terminal-amber">{gap.skill}</div>
                    <div className={`text-xs px-2 py-0.5 border ${
                      gap.importance === 'HIGH' ? 'border-red-400 text-red-400' : 'border-terminal-amber text-terminal-amber'
                    }`}>{gap.importance}</div>
                  </div>
                  <div className="text-xs text-terminal-green/60">&gt; ETA to learn: {gap.timeToLearn}</div>
                  <div className="text-xs text-terminal-green/40 mt-1">&gt; Recommended: Online courses, practice projects</div>
                </motion.div>
              ))}
            </div>
          </TerminalWindow>
        )}

        {activeSection === 'paths' && (
          <TerminalWindow title="career_paths.py">
            <div className="mb-3 text-terminal-amber text-sm">&gt; CAREER_PREDICTOR: Optimal paths computed</div>
            <div className="space-y-4">
              {mockAnalysisData.careerPaths.map((path, i) => (
                <motion.div
                  key={path.role}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.15 }}
                  className="border border-terminal-green/30 p-4 hover:border-terminal-green/60 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                    <div>
                      <div className="font-bold text-terminal-green">{path.role}</div>
                      <div className="text-xs text-terminal-amber mt-0.5">{path.salary}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-terminal-green">{path.match}%</div>
                      <div className="text-xs text-terminal-green/50">MATCH_SCORE</div>
                    </div>
                  </div>
                  <div className="w-full bg-terminal-bg border border-terminal-green/20 h-1 mb-3">
                    <motion.div
                      className="h-full bg-terminal-green"
                      initial={{ width: 0 }}
                      animate={{ width: `${path.match}%` }}
                      transition={{ delay: i * 0.15 + 0.4, duration: 0.8 }}
                    />
                  </div>
                  <div className="text-xs text-terminal-green/60">
                    &gt; Top companies: {path.companies.join(' | ')}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 flex gap-3">
              <Link href="/dashboard" className="border border-terminal-green/30 hover:border-terminal-green px-4 py-2 text-xs transition-all">
                [VIEW_DASHBOARD]
              </Link>
              <button className="border border-terminal-amber/30 hover:border-terminal-amber px-4 py-2 text-xs text-terminal-amber transition-all">
                [GENERATE_RESUME]
              </button>
            </div>
          </TerminalWindow>
        )}
      </main>
    </div>
  );
}
