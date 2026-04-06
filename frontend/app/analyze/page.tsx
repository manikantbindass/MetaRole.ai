'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import SkillGraph from '@/components/graphs/SkillGraph';
import TypewriterText from '@/components/terminal/TypewriterText';
import { apiClient } from '@/lib/api';

type AnalysisResult = {
  skills: string[];
  gaps: string[];
  careerPaths: { role: string; probability: number }[];
  recommendations: string[];
};

export default function AnalyzePage() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching analysis result
    const fetchAnalysis = async () => {
      try {
        const data = await apiClient.getAnalysis();
        setResult(data);
      } catch {
        // Fallback mock data for demo
        setResult({
          skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Python', 'SQL', 'Git'],
          gaps: ['Kubernetes', 'System Design', 'GraphQL', 'Redis'],
          careerPaths: [
            { role: 'Senior Frontend Engineer', probability: 87 },
            { role: 'Full Stack Engineer', probability: 74 },
            { role: 'Software Architect', probability: 52 },
            { role: 'DevOps Engineer', probability: 34 },
          ],
          recommendations: [
            'Complete System Design course',
            'Build a GraphQL API project',
            'Contribute to OSS Kubernetes project',
          ],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, []);

  return (
    <div className="min-h-screen bg-terminal-bg">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <TypewriterText
          text="> ANALYSIS COMPLETE. DISPLAYING RESULTS..."
          className="text-terminal-green text-sm mb-8 block"
        />

        {loading ? (
          <TerminalWindow title="LOADING...">
            <div className="text-terminal-dim text-sm animate-pulse">
              PROCESSING AI OUTPUT...
            </div>
          </TerminalWindow>
        ) : result ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Skill Graph */}
            <TerminalWindow title="SKILL_GRAPH.exe">
              <SkillGraph skills={result.skills} />
            </TerminalWindow>

            {/* Career Paths */}
            <TerminalWindow title="CAREER_PREDICTOR.exe">
              <div className="space-y-3">
                <div className="text-terminal-amber text-xs mb-4">> PREDICTED CAREER TRAJECTORIES:</div>
                {result.careerPaths.map((path, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-terminal-green">{path.role}</span>
                      <span className="text-terminal-amber">{path.probability}%</span>
                    </div>
                    <div className="h-1 bg-terminal-border">
                      <div
                        className="h-full bg-terminal-green transition-all duration-1000"
                        style={{ width: `${path.probability}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* Skill Gaps */}
            <TerminalWindow title="SKILL_GAP_ANALYSIS.exe">
              <div className="space-y-2">
                <div className="text-terminal-amber text-xs">> DETECTED GAPS IN YOUR STACK:</div>
                {result.gaps.map((gap, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs">
                    <span className="text-red-400">✗</span>
                    <span className="text-terminal-dim">{gap}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>

            {/* Recommendations */}
            <TerminalWindow title="ACTION_PLAN.exe">
              <div className="space-y-2">
                <div className="text-terminal-amber text-xs">> RECOMMENDED ACTIONS:</div>
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs">
                    <span className="text-terminal-green mt-0.5">→</span>
                    <span className="text-terminal-green">{rec}</span>
                  </div>
                ))}
              </div>
            </TerminalWindow>
          </div>
        ) : null}
      </main>
    </div>
  );
}
