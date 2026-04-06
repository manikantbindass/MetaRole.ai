'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import SkillGraph from '@/components/graphs/SkillGraph';
import CareerPrediction from '@/components/dashboard/CareerPrediction';
import JobMatches from '@/components/dashboard/JobMatches';
import ProgressTracker from '@/components/dashboard/ProgressTracker';
import TerminalWindow from '@/components/terminal/TerminalWindow';

export default function DashboardPage() {
  const [activePane, setActivePane] = useState<'skills' | 'career' | 'jobs' | 'progress'>('skills');

  return (
    <div className="flex h-screen bg-terminal-bg overflow-hidden">
      <Sidebar activePane={activePane} setActivePane={setActivePane} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div className="border-b border-terminal-border px-6 py-3 flex items-center gap-4">
          <span className="text-terminal-green text-xs">METAROLE_OS v1.0.0</span>
          <span className="text-terminal-dim text-xs">|</span>
          <span className="text-terminal-amber text-xs">OPERATOR: ACTIVE</span>
          <span className="text-terminal-dim text-xs">|</span>
          <span className="text-terminal-dim text-xs">SYS_TIME: {new Date().toISOString()}</span>
        </div>

        {/* Split terminal layout */}
        <div className="flex-1 grid grid-cols-2 gap-0 overflow-hidden">
          {/* Left pane */}
          <div className="border-r border-terminal-border overflow-auto p-4">
            {activePane === 'skills' && (
              <TerminalWindow title="SKILL_GRAPH.exe" className="h-full">
                <SkillGraph />
              </TerminalWindow>
            )}
            {activePane === 'career' && (
              <TerminalWindow title="CAREER_PREDICTOR.exe" className="h-full">
                <CareerPrediction />
              </TerminalWindow>
            )}
            {activePane === 'jobs' && (
              <TerminalWindow title="JOB_MATCHER.exe" className="h-full">
                <JobMatches />
              </TerminalWindow>
            )}
            {activePane === 'progress' && (
              <TerminalWindow title="PROGRESS_TRACKER.exe" className="h-full">
                <ProgressTracker />
              </TerminalWindow>
            )}
          </div>

          {/* Right pane — system log */}
          <div className="overflow-auto p-4">
            <TerminalWindow title="SYSTEM_LOG.exe" className="h-full">
              <div className="text-xs space-y-1">
                {[
                  '[INFO] AI core initialized successfully',
                  '[INFO] Loading skill graph... done',
                  '[INFO] Career predictor model: GPT-4 turbo',
                  '[INFO] Vector DB (FAISS) connected',
                  '[INFO] Job matcher ready — 1,240 roles indexed',
                  '[WARN] Resume not uploaded — limited analysis',
                  '[INFO] Dashboard ready. Waiting for input...',
                  '> _',
                ].map((line, i) => (
                  <div key={i} className="terminal-line">
                    <span
                      className={`${
                        line.startsWith('[INFO]')
                          ? 'text-terminal-green'
                          : line.startsWith('[WARN]')
                          ? 'text-terminal-amber'
                          : line.startsWith('[ERROR]')
                          ? 'text-red-400'
                          : 'text-terminal-green'
                      }`}
                    >
                      {line}
                    </span>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>
        </div>
      </main>
    </div>
  );
}
