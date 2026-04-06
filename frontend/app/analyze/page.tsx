'use client';
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import LoadingBar from '@/components/terminal/LoadingBar';

const SKILL_GAPS = [
  { skill: 'TypeScript', priority: 'CRITICAL', coverage: 89, resources: ['typescriptlang.org', 'Total TypeScript course'] },
  { skill: 'System Design', priority: 'HIGH', coverage: 74, resources: ['system-design-primer', 'Grokking System Design'] },
  { skill: 'AWS/Cloud', priority: 'HIGH', coverage: 68, resources: ['AWS Free Tier', 'Cloud Practitioner cert'] },
  { skill: 'Kubernetes', priority: 'MEDIUM', coverage: 55, resources: ['kubernetes.io/docs', 'CKA certification'] },
  { skill: 'GraphQL', priority: 'MEDIUM', coverage: 48, resources: ['graphql.org', 'The Guild tutorials'] },
  { skill: 'Redis', priority: 'LOW', coverage: 39, resources: ['redis.io/docs', 'Redis University'] },
  { skill: 'Terraform', priority: 'LOW', coverage: 32, resources: ['terraform.io', 'HashiCorp learn'] },
];

const PRIORITY_COLORS: Record<string, string> = {
  CRITICAL: 'priority-critical',
  HIGH: 'priority-high',
  MEDIUM: 'priority-medium',
  LOW: 'priority-low',
};

export default function AnalyzePage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [done, setDone] = useState(false);

  return (
    <DashboardLayout>
      <div className="analyze-page">
        <div className="page-header">
          <span className="prompt">&gt;</span> SKILL GAP ANALYSIS
        </div>

        {!done ? (
          <div className="analyze-init">
            <TerminalWindow title="gap-analyzer">
              <div className="terminal-line">
                <span className="prompt">$</span> metarole analyze --gap-report --vs=job-market
              </div>
              {!analyzing && (
                <>
                  <div className="terminal-line muted">Resume detected: resume.pdf (23 skills extracted)</div>
                  <div className="terminal-line muted">Target market: Software Engineering (50,482 postings)</div>
                  <div className="terminal-line">
                    <button
                      className="btn-initiate mt-4"
                      onClick={() => setAnalyzing(true)}
                    >
                      [ RUN ANALYSIS ]
                    </button>
                  </div>
                </>
              )}
              {analyzing && (
                <>
                  <LoadingBar label="Fetching job market data" duration={1200} />
                  <LoadingBar label="Comparing skill vectors" duration={1800} />
                  <LoadingBar label="Ranking gaps by impact" duration={2400} onComplete={() => setDone(true)} />
                </>
              )}
            </TerminalWindow>
          </div>
        ) : (
          <div className="gap-results">
            <TerminalWindow title="gap-report">
              <div className="terminal-line success">
                <span className="prompt">$</span> Analysis complete — {SKILL_GAPS.length} gaps identified
              </div>
              <table className="gap-table">
                <thead>
                  <tr>
                    <th>SKILL</th>
                    <th>PRIORITY</th>
                    <th>JOB COVERAGE</th>
                    <th>RESOURCES</th>
                  </tr>
                </thead>
                <tbody>
                  {SKILL_GAPS.map(gap => (
                    <tr key={gap.skill}>
                      <td className="skill-name">{gap.skill}</td>
                      <td>
                        <span className={`priority-badge ${PRIORITY_COLORS[gap.priority]}`}>
                          {gap.priority}
                        </span>
                      </td>
                      <td>
                        <div className="coverage-bar">
                          <div className="coverage-fill" style={{ width: `${gap.coverage}%` }} />
                          <span className="coverage-text">{gap.coverage}%</span>
                        </div>
                      </td>
                      <td className="resources-cell">
                        {gap.resources.map((r, i) => (
                          <span key={i} className="resource-tag">{r}</span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </TerminalWindow>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
