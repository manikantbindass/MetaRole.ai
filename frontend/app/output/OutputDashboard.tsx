// frontend/app/output/OutputDashboard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
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

export default function OutputDashboard() {
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
      setError('Missing analysisId. Go to the Upload page first to analyze your resume.');
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
<<<<<<< HEAD
        setSkills(Array.isArray(skillRes.skills) ? skillRes.skills : []);
=======
        setSkills(skillRes.skills || []);
>>>>>>> vercel-fix
        setPredictions(Array.isArray(predRes.predictions) ? predRes.predictions : []);
        setJobs(Array.isArray(jobRes.jobs) ? jobRes.jobs : []);
        setResume(resumeRes.resume || '');
      } catch (e: any) {
        setError(e.message || 'Unknown error. Make sure the backend is running and OPENAI_API_KEY is set.');
      } finally {
        setLoading(false);
      }
    };
<<<<<<< HEAD
=======

>>>>>>> vercel-fix
    run();
  }, [analysisId]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono pt-20 px-6 pb-10">
      {/* CRT */}
<<<<<<< HEAD
      <div className="fixed inset-0 pointer-events-none z-50 crt-overlay" />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black border-b border-[#33ff00]/30 px-6 py-3 flex gap-6 text-xs">
        <Link href="/upload" className="hover:text-white transition-colors">&larr; UPLOAD</Link>
        <span className="text-[#33ff00]">&gt; OUTPUT.DASHBOARD</span>
        <Link href="/dashboard" className="hover:text-white transition-colors">DASHBOARD</Link>
      </nav>

      <h1 className="text-2xl mb-2 tracking-widest">// OUTPUT.DASHBOARD</h1>
      <p className="text-xs text-[#33ff00]/60 mb-6">ANALYSIS_RESULTS</p>
      <p className="text-xs mb-8">SESSION_ID :: {analysisId || 'N/A'}</p>

      {loading && (
        <TerminalLoader
          lines={[
            '&gt; fetching skill graph...',
            '&gt; computing career predictions...',
            '&gt; generating resume...',
            '&gt; resolving job matches...',
          ]}
          doneLabel="&gt; pipeline complete"
        />
      )}

      {error && !loading && (
        <div className="border border-red-500 p-4 rounded">
          <p className="text-red-400 mb-4">&gt; ERROR: {error}</p>
          <Link href="/upload" className="text-xs border border-[#33ff00] px-3 py-1 hover:bg-[#33ff00] hover:text-black transition-colors">
            [ GO_BACK_TO_UPLOAD ]
          </Link>
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Skills + Career + Resume */}
          <div className="lg:col-span-2 space-y-8">
            <SkillGraph skills={skills} />

            <section>
              <h2 className="text-sm tracking-widest mb-4 text-[#33ff00]/70">// CAREER_PREDICTIONS</h2>
              {predictions.length === 0 ? (
                <p className="text-xs text-[#33ff00]/50">&gt; No predictions returned.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {predictions.map((p) => (
                    <CareerCard key={p.role} role={p.role} probability={p.probability} />
                  ))}
                </div>
              )}
            </section>

            <section>
              <h2 className="text-sm tracking-widest mb-4 text-[#33ff00]/70">// AI_RESUME</h2>
              {resume ? (
                <pre className="text-xs whitespace-pre-wrap border border-[#33ff00]/20 p-4 rounded bg-[#0d0d0d]">
                  {resume}
                </pre>
              ) : (
                <p className="text-xs text-[#33ff00]/50">&gt; No resume generated.</p>
              )}
            </section>
          </div>

          {/* Right: Job matches */}
          <div className="space-y-4">
            <h2 className="text-sm tracking-widest mb-4 text-[#33ff00]/70">// JOB_MATCHES</h2>
            {jobs.map((j) => (
              <JobCard key={j.id} title={j.title} company={j.company} score={j.score} location={j.location} link={j.link} />
            ))}
            {!jobs.length && (
              <p className="text-xs text-[#33ff00]/50">&gt; No matching jobs returned.</p>
            )}
          </div>
        </div>
      )}
=======
      <div className="pointer-events-none fixed inset-0 z-50" style={{ background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.03) 2px,rgba(0,0,0,0.03) 4px)' }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-[#33ff00]/20 bg-[#0a0a0a]/90 backdrop-blur-sm px-6 py-3 flex items-center justify-between">
        <Link href="/upload" className="text-sm tracking-widest hover:text-[#ffb000] transition-colors">← UPLOAD</Link>
        <span className="text-[#33ff00]/40 text-xs tracking-widest">OUTPUT.DASHBOARD</span>
        <Link href="/dashboard" className="text-xs tracking-widest border border-[#33ff00]/30 px-3 py-1 hover:bg-[#33ff00]/10 transition-colors">DASHBOARD</Link>
      </nav>

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
          <div className="border border-red-500/40 p-6 text-xs text-red-400 space-y-3">
            <div>{'>'} ERROR: {error}</div>
            <Link
              href="/upload"
              className="inline-block border border-red-400/40 px-4 py-2 hover:bg-red-400/10 transition-colors"
            >
              [ GO_BACK_TO_UPLOAD ]
            </Link>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            {/* Left: Skills + Career + Resume */}
            <div className="space-y-4 lg:col-span-2">
              <SkillGraph skills={skills} />

              <div className="border border-[#33ff00]/30 p-4">
                <div className="mb-3 text-[#33ff00]/60 tracking-[0.25em] text-[10px]">
                  // CAREER_PREDICTIONS
                </div>
                {!predictions || predictions.length === 0 ? (
                  <div className="text-xs text-[#33ff00]/40">{'>'} No predictions returned.</div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {predictions.map((p) => (
                      <CareerCard key={p.role} role={p.role} probability={p.probability} />
                    ))}
                  </div>
                )}
              </div>

              <div className="border border-[#33ff00]/30 p-4">
                <div className="mb-3 text-[#33ff00]/60 tracking-[0.25em] text-[10px]">
                  // AI_RESUME
                </div>
                {resume ? (
                  <pre className="whitespace-pre-wrap text-xs text-[#33ff00]/70 max-h-80 overflow-y-auto leading-relaxed">
                    {resume}
                  </pre>
                ) : (
                  <div className="text-xs text-[#33ff00]/40">{'>'} No resume generated.</div>
                )}
              </div>
            </div>

            {/* Right: Job matches */}
            <aside className="space-y-3 border border-[#33ff00]/30 p-4">
              <div className="text-[#33ff00]/60 tracking-[0.25em] text-[10px] mb-2">
                // JOB_MATCHES
              </div>
              <div className="space-y-3 max-h-[32rem] overflow-y-auto pr-1">
                {jobs && jobs.map((j) => (
                  <JobCard key={j.id} job={j} />
                ))}
                {(!jobs || !jobs.length) && (
                  <div className="text-xs text-[#33ff00]/50">
                    {'>'} No matching jobs returned.
                  </div>
                )}
              </div>
            </aside>
          </div>
        )}
      </div>
>>>>>>> vercel-fix
    </main>
  );
}
