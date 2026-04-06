// frontend/app/output/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { SkillGraph } from '../../components/SkillGraph';
import { CareerCard } from '../../components/CareerCard';
import { JobCard } from '../../components/JobCard';
import { TerminalLoader } from '../../components/TerminalLoader';

type Prediction = { role: string; probability: number };
type Job = {
  id: string;
  title: string;
  company: string;
  score: number;
  location: string;
  link?: string;
};

export default function OutputPage() {
  const params = useSearchParams();
  const analysisId = params.get('analysisId') || '';
  const [skills, setSkills] = useState<string[]>([]);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [resume, setResume] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!analysisId) {
      setError('Missing analysisId. Please re-run the pipeline.');
      setLoading(false);
      return;
    }

    const run = async () => {
      try {
        const [skillRes, predRes, jobRes, resumeRes] = await Promise.all([
          api.analyzeSkills(analysisId),
          api.predictCareer(analysisId),
          api.jobMatch(analysisId),
          api.generateResume(analysisId),
        ]);
        setSkills(skillRes.skills);
        setPredictions(predRes.predictions);
        setJobs(jobRes.jobs as Job[]);
        setResume(resumeRes.resume);
      } catch (e: any) {
        setError(e.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    run();
  }, [analysisId]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono pt-20 px-6 pb-10">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">
            // OUTPUT.DASHBOARD
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-widest">
            ANALYSIS_RESULTS
          </h1>
          <div className="text-xs text-[#33ff00]/40 mt-2">
            SESSION_ID :: {analysisId || 'N/A'}
          </div>
        </header>

        {loading && (
          <TerminalLoader
            title="metarole-ai pipeline"
            lines={[
              '> fetching skill graph...',
              '> computing career predictions...',
              '> generating resume...',
              '> resolving job matches...',
            ]}
            doneLabel="> pipeline complete"
          />
        )}

        {error && !loading && (
          <div className="border border-red-500/40 p-4 text-xs text-red-400">
            {'>'} ERROR: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left: Skills + Career */}
            <div className="space-y-4 lg:col-span-2">
              <SkillGraph skills={skills} />

              <div className="border border-[#33ff00]/30 p-4">
                <div className="mb-3 text-[#33ff00]/60 tracking-[0.25em] text-[10px]">
                  // CAREER_PREDICTIONS
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {predictions.map((p) => (
                    <CareerCard
                      key={p.role}
                      role={p.role}
                      probability={p.probability}
                    />
                  ))}
                </div>
              </div>

              <div className="border border-[#33ff00]/30 p-4">
                <div className="mb-3 text-[#33ff00]/60 tracking-[0.25em] text-[10px]">
                  // AI_RESUME
                </div>
                <pre className="whitespace-pre-wrap text-xs text-[#33ff00]/70 max-h-80 overflow-y-auto">
                  {resume}
                </pre>
              </div>
            </div>

            {/* Right: Job matches */}
            <aside className="space-y-3 border border-[#33ff00]/30 p-4">
              <div className="text-[#33ff00]/60 tracking-[0.25em] text-[10px] mb-2">
                // JOB_MATCHES
              </div>
              <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
                {jobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
                {!jobs.length && (
                  <div className="text-xs text-[#33ff00]/50">
                    {'>'} No matching jobs returned.
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
