'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const PIPELINE = [
  { id: 1, step: 'TEXT_EXTRACTION', desc: 'Extracting raw text from document', duration: 800 },
  { id: 2, step: 'NLP_PROCESSING', desc: 'Running NLP tokenization & entity recognition', duration: 1200 },
  { id: 3, step: 'SKILL_DETECTION', desc: 'Matching skills against 50k+ tech taxonomy', duration: 900 },
  { id: 4, step: 'EXP_PARSER', desc: 'Parsing work experience timeline', duration: 700 },
  { id: 5, step: 'PROJECT_ANALYSIS', desc: 'Analyzing project complexity & impact', duration: 1000 },
  { id: 6, step: 'GITHUB_SCAN', desc: 'Scanning GitHub commit patterns', duration: 1100 },
  { id: 7, step: 'VECTOR_EMBEDDING', desc: 'Generating 1536-dim skill embeddings', duration: 800 },
  { id: 8, step: 'CAREER_PREDICTION', desc: 'Running career path ML model', duration: 1300 },
  { id: 9, step: 'GAP_ANALYSIS', desc: 'Computing skill gap against target roles', duration: 600 },
  { id: 10, step: 'REPORT_GENERATION', desc: 'Compiling analysis report', duration: 500 },
];

export default function AnalyzePage() {
  const [step, setStep] = useState(0);
  const [logs, setLogs] = useState<{ text: string; type: string }[]>([]);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);

  const runPipeline = async () => {
    setRunning(true);
    setLogs([]);
    setStep(0);
    setDone(false);
    for (let i = 0; i < PIPELINE.length; i++) {
      setStep(i + 1);
      const p = PIPELINE[i];
      setLogs(prev => [...prev, { text: `[${p.step}] ${p.desc}...`, type: 'running' }]);
      await new Promise(r => setTimeout(r, p.duration));
      setLogs(prev => [
        ...prev.slice(0, -1),
        { text: `[${p.step}] ✓ DONE (${p.duration}ms)`, type: 'done' },
      ]);
    }
    setDone(true);
    setRunning(false);
  };

  useEffect(() => {
    runPipeline();
  }, []);

  const progress = (step / PIPELINE.length) * 100;

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-green font-mono">
      <div className="scanlines" aria-hidden="true" />

      <nav className="fixed top-0 w-full z-50 border-b border-terminal-green/20 bg-terminal-bg/95">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <Link href="/" className="text-terminal-green text-sm tracking-widest">[ METAROLE::AI ]</Link>
          <span className="text-xs text-terminal-green/40">analyze --pipeline</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        <div className="mb-6">
          <p className="text-xs text-terminal-green/40 mb-1">// analysis-engine --run</p>
          <h1 className="text-xl font-bold tracking-widest">AI ANALYSIS PIPELINE</h1>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-terminal-green/60">PIPELINE PROGRESS</span>
            <span className="text-terminal-amber">{step}/{PIPELINE.length} steps ({progress.toFixed(0)}%)</span>
          </div>
          <div className="border border-terminal-green/30 h-6 relative overflow-hidden">
            <div className="h-full bg-terminal-green/20 transition-all duration-500" style={{ width: `${progress}%` }} />
            <div className="h-full bg-terminal-green transition-all duration-500 absolute top-0 left-0" style={{ width: `${progress * 0.4}%`, opacity: 0.6 }} />
            <div className="absolute inset-0 flex items-center justify-center text-xs text-terminal-green font-bold">
              {done ? '[ COMPLETE ]' : running ? '[ PROCESSING... ]' : '[ IDLE ]'}
            </div>
          </div>
        </div>

        {/* Pipeline visual */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {PIPELINE.map((p, i) => (
            <div
              key={p.id}
              className={`border p-3 transition-all duration-300 ${
                i + 1 < step ? 'border-terminal-green/40 bg-terminal-green/5' :
                i + 1 === step ? 'border-terminal-green bg-terminal-green/10 animate-pulse' :
                'border-terminal-green/10'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">{p.step}</span>
                <span className={`text-xs ${
                  i + 1 < step ? 'text-terminal-green' :
                  i + 1 === step ? 'text-terminal-amber' :
                  'text-terminal-green/20'
                }`}>
                  {i + 1 < step ? '✓' : i + 1 === step ? '⟳' : '○'}
                </span>
              </div>
              <p className="text-xs text-terminal-green/50 mt-1">{p.desc}</p>
            </div>
          ))}
        </div>

        {/* Log output */}
        <div className="border border-terminal-green/40 bg-black/60">
          <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-green/20">
            <span className="w-2 h-2 rounded-full bg-terminal-green" />
            <span className="text-xs text-terminal-green/40">analysis-log</span>
          </div>
          <div className="p-4 h-48 overflow-y-auto space-y-1 text-xs">
            {logs.map((l, i) => (
              <p key={i} className={l.type === 'done' ? 'text-terminal-green' : 'text-terminal-amber'}>{l.text}</p>
            ))}
          </div>
        </div>

        {done && (
          <div className="mt-6 flex gap-4">
            <Link href="/dashboard" className="flex-1 border-2 border-terminal-green py-3 text-terminal-green font-bold tracking-widest hover:bg-terminal-green hover:text-black transition-all text-sm text-center">
              [ VIEW DASHBOARD ]
            </Link>
            <Link href="/output" className="flex-1 border-2 border-terminal-amber py-3 text-terminal-amber font-bold tracking-widest hover:bg-terminal-amber hover:text-black transition-all text-sm text-center">
              [ GENERATE RESUME ]
            </Link>
          </div>
        )}

        {done && (
          <button onClick={runPipeline} className="mt-3 w-full border border-terminal-green/30 py-2 text-terminal-green/60 text-xs hover:border-terminal-green hover:text-terminal-green transition-all">
            [ RE-RUN ANALYSIS ]
          </button>
        )}
      </div>
    </main>
  );
}
