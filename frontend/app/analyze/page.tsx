'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ANALYSIS_STEPS = [
  { id: 1, label: 'Initializing AI Engine', duration: 800 },
  { id: 2, label: 'Parsing resume structure', duration: 1000 },
  { id: 3, label: 'Extracting skills via NLP', duration: 1200 },
  { id: 4, label: 'Scanning GitHub repositories', duration: 1400 },
  { id: 5, label: 'Building skill competency graph', duration: 1000 },
  { id: 6, label: 'Running gap analysis against 142k jobs', duration: 1500 },
  { id: 7, label: 'Training career prediction model', duration: 1200 },
  { id: 8, label: 'Generating personalized roadmap', duration: 1000 },
  { id: 9, label: 'Finalizing career intelligence report', duration: 800 },
];

export default function AnalyzePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let total = 0;
    ANALYSIS_STEPS.forEach((step, i) => {
      total += step.duration;
      setTimeout(() => {
        setCurrentStep(i + 1);
        setCompletedSteps(prev => [...prev, step.id]);
        if (i === ANALYSIS_STEPS.length - 1) {
          setDone(true);
          setTimeout(() => router.push('/dashboard'), 1500);
        }
      }, total);
    });
  }, [router]);

  const progress = Math.round((completedSteps.length / ANALYSIS_STEPS.length) * 100);

  return (
    <main className="bg-terminal-bg text-terminal-green font-mono min-h-screen flex flex-col">
      <div className="scanline-overlay pointer-events-none" />

      <nav className="border-b border-terminal-green/30 px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold tracking-widest">
          <span className="text-terminal-amber">{'>'}</span> METAROLE<span className="text-terminal-amber">.AI</span>
        </Link>
        <span className="text-terminal-green/40 text-xs">AI_ANALYSIS_ENGINE</span>
      </nav>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl">
          <div className="text-terminal-amber text-xs tracking-widest mb-6">// RUNNING_ANALYSIS_PIPELINE //</div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span className="text-terminal-green/60">ANALYSIS PROGRESS</span>
              <span className="text-terminal-amber">{progress}%</span>
            </div>
            <div className="h-1.5 bg-terminal-green/10">
              <div
                className="h-full bg-terminal-green transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="border border-terminal-green/30">
            <div className="px-4 py-2 bg-terminal-green/10 border-b border-terminal-green/30 text-xs text-terminal-green/60">
              PIPELINE_LOG
            </div>
            <div className="p-4 space-y-2">
              {ANALYSIS_STEPS.map((step, i) => {
                const isComplete = completedSteps.includes(step.id);
                const isActive = currentStep === i;
                return (
                  <div key={step.id} className="flex items-center gap-3 text-xs">
                    <span className={`w-4 ${
                      isComplete ? 'text-terminal-green' :
                      isActive ? 'text-terminal-amber' :
                      'text-terminal-green/20'
                    }`}>
                      {isComplete ? '✓' : isActive ? '▶' : '○'}
                    </span>
                    <span className={`${
                      isComplete ? 'text-terminal-green' :
                      isActive ? 'text-terminal-amber' :
                      'text-terminal-green/30'
                    }`}>
                      {step.label}
                      {isActive && <span className="blink-cursor ml-1">█</span>}
                    </span>
                    {isComplete && <span className="ml-auto text-terminal-green/30">done</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {done && (
            <div className="mt-6 text-center">
              <p className="text-terminal-green font-bold text-lg">✓ ANALYSIS COMPLETE</p>
              <p className="text-terminal-green/50 text-xs mt-1">Loading Career Intelligence Dashboard...</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
