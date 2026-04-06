'use client';

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TypewriterText } from '@/components/terminal/TypewriterText';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { SkillGraph } from '@/components/graphs/SkillGraph';
import { motion } from 'framer-motion';

const mockSkills = [
  { name: 'JavaScript', level: 85, category: 'Frontend' },
  { name: 'React', level: 80, category: 'Frontend' },
  { name: 'Node.js', level: 70, category: 'Backend' },
  { name: 'Python', level: 65, category: 'Backend' },
  { name: 'SQL', level: 60, category: 'Database' },
  { name: 'TypeScript', level: 75, category: 'Frontend' },
  { name: 'Docker', level: 45, category: 'DevOps' },
  { name: 'AWS', level: 40, category: 'DevOps' },
];

const mockCareerPredictions = [
  { role: 'Senior Full-Stack Engineer', probability: 87, timeframe: '12 months' },
  { role: 'Tech Lead', probability: 72, timeframe: '24 months' },
  { role: 'Solutions Architect', probability: 58, timeframe: '36 months' },
];

const mockJobMatches = [
  { title: 'Senior React Developer', company: 'TechCorp Inc.', match: 94, salary: '$120k-150k' },
  { title: 'Full-Stack Engineer', company: 'StartupXYZ', match: 89, salary: '$100k-130k' },
  { title: 'Frontend Architect', company: 'MegaCorp', match: 82, salary: '$130k-160k' },
];

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<string>('overview');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => (prev < 73 ? prev + 1 : 73));
    }, 30);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono flex flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activePane={activePane} onPaneChange={setActivePane} />
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            
            {/* System Status Panel */}
            <TerminalWindow title="SYSTEM_STATUS.log" className="col-span-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="border border-terminal-green/30 p-3">
                  <div className="text-terminal-amber text-xs mb-1">&gt; PROFILE_SCORE</div>
                  <div className="text-2xl font-bold text-terminal-green">{progress}%</div>
                  <div className="w-full bg-terminal-bg border border-terminal-green/20 h-1 mt-2">
                    <div 
                      className="h-full bg-terminal-green transition-all duration-100"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
                <div className="border border-terminal-green/30 p-3">
                  <div className="text-terminal-amber text-xs mb-1">&gt; SKILLS_MAPPED</div>
                  <div className="text-2xl font-bold">{mockSkills.length}</div>
                  <div className="text-xs text-terminal-green/60 mt-1">NODES_ACTIVE</div>
                </div>
                <div className="border border-terminal-green/30 p-3">
                  <div className="text-terminal-amber text-xs mb-1">&gt; JOB_MATCHES</div>
                  <div className="text-2xl font-bold">{mockJobMatches.length}</div>
                  <div className="text-xs text-terminal-green/60 mt-1">HIGH_RELEVANCE</div>
                </div>
                <div className="border border-terminal-green/30 p-3">
                  <div className="text-terminal-amber text-xs mb-1">&gt; GAPS_DETECTED</div>
                  <div className="text-2xl font-bold text-terminal-amber">4</div>
                  <div className="text-xs text-terminal-amber/60 mt-1">ACTION_REQUIRED</div>
                </div>
              </div>
            </TerminalWindow>

            {/* Skill Graph */}
            <TerminalWindow title="skill_graph.d3" className="lg:col-span-2">
              <SkillGraph skills={mockSkills} />
            </TerminalWindow>

            {/* Career Prediction */}
            <TerminalWindow title="career_predict.py">
              <div className="space-y-3">
                <TypewriterText 
                  text="> RUNNING CAREER_PREDICTOR..."
                  speed={50}
                  className="text-xs text-terminal-amber mb-3"
                />
                {mockCareerPredictions.map((pred, i) => (
                  <motion.div
                    key={pred.role}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 + 0.5 }}
                    className="border border-terminal-green/20 p-3"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-xs text-terminal-green font-bold">{pred.role}</div>
                      <div className="text-terminal-amber text-xs">{pred.probability}%</div>
                    </div>
                    <div className="w-full bg-terminal-bg border border-terminal-green/20 h-1 mb-1">
                      <motion.div 
                        className="h-full bg-terminal-green"
                        initial={{ width: 0 }}
                        animate={{ width: `${pred.probability}%` }}
                        transition={{ delay: i * 0.2 + 0.8, duration: 0.8 }}
                      />
                    </div>
                    <div className="text-xs text-terminal-green/50">[ETA: {pred.timeframe}]</div>
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>

            {/* Job Matches */}
            <TerminalWindow title="job_matches.json" className="lg:col-span-2">
              <div className="space-y-2">
                <div className="text-xs text-terminal-amber mb-3">&gt; SEMANTIC_SEARCH: {mockJobMatches.length} matches found</div>
                {mockJobMatches.map((job, i) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.15 }}
                    className="border border-terminal-green/20 p-3 hover:border-terminal-green/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-sm font-bold text-terminal-green group-hover:text-white transition-colors">{job.title}</div>
                        <div className="text-xs text-terminal-green/60">{job.company}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-terminal-amber font-bold">{job.match}%</div>
                        <div className="text-xs text-terminal-green/60">{job.salary}</div>
                      </div>
                    </div>
                    <div className="w-full bg-terminal-bg border border-terminal-green/20 h-0.5 mt-2">
                      <div className="h-full bg-terminal-amber" style={{ width: `${job.match}%` }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </TerminalWindow>

            {/* Progress Tracker */}
            <TerminalWindow title="progress_tracker.sh">
              <div className="space-y-3 text-xs">
                <div className="text-terminal-amber">&gt; LEARNING_PATH initialized</div>
                {[
                  { task: 'Complete AWS certification', done: false, priority: 'HIGH' },
                  { task: 'Build 2 open-source projects', done: false, priority: 'MEDIUM' },
                  { task: 'Learn Docker + Kubernetes', done: false, priority: 'HIGH' },
                  { task: 'Update LinkedIn profile', done: true, priority: 'LOW' },
                  { task: 'Practice system design', done: true, priority: 'HIGH' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className={item.done ? 'text-terminal-green' : 'text-terminal-green/30'}>
                      {item.done ? '[✓]' : '[ ]'}
                    </span>
                    <span className={item.done ? 'line-through text-terminal-green/40' : 'text-terminal-green'}>
                      {item.task}
                    </span>
                    <span className={`ml-auto text-xs ${
                      item.priority === 'HIGH' ? 'text-red-400' : 
                      item.priority === 'MEDIUM' ? 'text-terminal-amber' : 'text-terminal-green/50'
                    }`}>[{item.priority}]</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>

          </div>
        </main>
      </div>
    </div>
  );
}
