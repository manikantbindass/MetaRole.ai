'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Typewriter hook
function useTypewriter(texts: string[], speed = 80, pause = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [idx, setIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx % texts.length];
    if (!deleting && charIdx <= current.length) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx > current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx >= 0) {
      const t = setTimeout(() => {
        setDisplayed(current.slice(0, charIdx));
        setCharIdx(c => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx < 0) {
      setDeleting(false);
      setIdx(i => i + 1);
      setCharIdx(0);
    }
  }, [charIdx, deleting, idx, texts, speed, pause]);

  return displayed;
}

const TAGLINES = [
  'Analyze Your Skills',
  'Predict Your Career',
  'Close Skill Gaps',
  'Generate Your Portfolio',
  'Land Your Dream Role',
];

const FEATURES = [
  { icon: '▲', cmd: 'resume.parse()', label: 'AI Resume Parser', desc: 'Extract skills, experience & projects from any PDF/DOCX resume with GPT-4 precision.' },
  { icon: '◈', cmd: 'skills.graph()', label: 'Skill Graph', desc: 'Visualize your technical competency as an interactive force-directed node graph.' },
  { icon: '◉', cmd: 'gaps.analyze()', label: 'Gap Analyzer', desc: 'Compare your profile against thousands of job listings to surface missing skills.' },
  { icon: '⟁', cmd: 'career.predict()', label: 'Career Predictor', desc: 'ML model suggests optimal career paths with probability scores and timelines.' },
  { icon: '≡', cmd: 'resume.generate()', label: 'Resume Generator', desc: 'Auto-tailors your resume for each job application using AI rewrite engine.' },
  { icon: '◐', cmd: 'portfolio.build()', label: 'Portfolio Builder', desc: 'Generates a deployable portfolio website from your project history in seconds.' },
];

const STEPS = [
  { step: '01', title: 'Upload Resume / GitHub', desc: 'Drag & drop your resume or connect GitHub. AI parses everything instantly.' },
  { step: '02', title: 'Skill Graph Generated', desc: 'Watch your skills mapped into an interactive knowledge graph in real-time.' },
  { step: '03', title: 'Get Career Roadmap', desc: 'AI predicts best-fit roles and outputs a step-by-step learning roadmap.' },
  { step: '04', title: 'Apply Intelligently', desc: 'Tailored resume + cover letter generated per job. One-click smart apply.' },
];

export default function Home() {
  const typed = useTypewriter(TAGLINES);
  const [scanline] = useState(true);
  const [cmdInput, setCmdInput] = useState('');
  const [cmdOutput, setCmdOutput] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleCmd = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    const cmd = cmdInput.trim().toLowerCase();
    let out = '';
    if (cmd === 'help') out = '[CMDS] initiate | features | status | clear';
    else if (cmd === 'initiate') out = '[BOOT] Redirecting to MetaRole system init...';
    else if (cmd === 'features') out = '[LIST] resume.parse | skills.graph | career.predict | resume.generate | portfolio.build | job.match';
    else if (cmd === 'status') out = '[SYS] AI-ENGINE: ONLINE | DB: CONNECTED | API: v2.4.1';
    else if (cmd === 'clear') { setCmdOutput([]); setCmdInput(''); return; }
    else out = `[ERR] Unknown command: "${cmd}" — type "help" for available commands`;
    setCmdOutput(prev => [...prev.slice(-4), `> ${cmdInput}`, out]);
    setCmdInput('');
    if (cmd === 'initiate') setTimeout(() => window.location.href = '/upload', 800);
  };

  return (
    <main className="bg-terminal-bg text-terminal-green font-mono min-h-screen relative overflow-x-hidden">
      {scanline && <div className="scanline-overlay pointer-events-none" />}

      {/* NAV */}
      <nav className="border-b border-terminal-green/30 px-6 py-3 flex items-center justify-between sticky top-0 z-50 bg-terminal-bg/95 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="text-terminal-green font-bold text-lg tracking-widest">
            <span className="text-terminal-amber">{'>'}</span> METAROLE<span className="text-terminal-amber">.AI</span>
          </div>
          <span className="text-terminal-green/40 text-xs hidden sm:block">v2.4.1-stable</span>
        </div>
        <div className="flex items-center gap-6 text-xs">
          <a href="#features" className="text-terminal-green/60 hover:text-terminal-green transition-colors">[FEATURES]</a>
          <a href="#how-it-works" className="text-terminal-green/60 hover:text-terminal-green transition-colors">[HOW_IT_WORKS]</a>
          <Link href="/dashboard" className="text-terminal-amber hover:text-terminal-amber/80 transition-colors">[DASHBOARD]</Link>
          <Link href="/upload" className="border border-terminal-green px-3 py-1 hover:bg-terminal-green hover:text-terminal-bg transition-all text-terminal-green">
            [INITIATE]
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="min-h-[90vh] flex flex-col items-center justify-center px-6 py-20 text-center relative">
        {/* ASCII LOGO */}
        <pre className="text-terminal-green/80 text-[8px] sm:text-xs leading-tight mb-8 select-none hidden sm:block">
{`
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
`}
        </pre>
        <div className="text-terminal-amber text-sm mb-4 tracking-[0.3em] uppercase">// YOUR AI CAREER CO-PILOT //</div>
        <h1 className="text-3xl sm:text-5xl font-bold mb-4 text-terminal-green">
          <span>{typed}</span>
          <span className="blink-cursor">█</span>
        </h1>
        <p className="text-terminal-green/60 max-w-xl text-sm sm:text-base leading-relaxed mb-10">
          {'>'} AI-powered platform that analyzes your resume, maps your skills, predicts career paths, and automatically generates your portfolio + tailored resumes.
        </p>
        <div className="flex flex-wrap gap-4 justify-center mb-16">
          <Link href="/upload" className="border border-terminal-green px-8 py-3 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all font-bold tracking-widest text-sm">
            [ INITIATE_SYSTEM ]
          </Link>
          <Link href="/dashboard" className="border border-terminal-amber/50 px-8 py-3 text-terminal-amber/80 hover:border-terminal-amber hover:text-terminal-amber transition-all text-sm">
            [ VIEW_DASHBOARD ]
          </Link>
        </div>

        {/* LIVE TERMINAL DEMO */}
        <div className="w-full max-w-2xl border border-terminal-green/40 text-left">
          <div className="flex items-center gap-2 px-4 py-2 bg-terminal-green/10 border-b border-terminal-green/30">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="text-terminal-green/50 text-xs ml-2">metarole-ai ~ terminal v2.4</span>
          </div>
          <div className="p-4 text-xs space-y-1 min-h-[120px]">
            <p><span className="text-terminal-amber">system@metarole</span>:<span className="text-blue-400">~</span>$ <span className="text-terminal-green">boot --mode=ai-career</span></p>
            <p className="text-terminal-green/70">[✓] AI Engine loaded | [✓] Resume parser active | [✓] Job DB synced (142k jobs)</p>
            {cmdOutput.map((line, i) => (
              <p key={i} className={line.startsWith('>') ? 'text-terminal-amber' : 'text-terminal-green/70'}>{line}</p>
            ))}
            <div className="flex items-center gap-1">
              <span className="text-terminal-amber">system@metarole</span>:
              <span className="text-blue-400">~</span>$&nbsp;
              <input
                ref={inputRef}
                value={cmdInput}
                onChange={e => setCmdInput(e.target.value)}
                onKeyDown={handleCmd}
                className="bg-transparent outline-none border-none flex-1 text-terminal-green caret-terminal-green"
                placeholder="type 'help' ..."
                spellCheck={false}
              />
              <span className="blink-cursor text-terminal-green">█</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="px-6 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-terminal-amber text-xs tracking-widest mb-2">// SYSTEM_MODULES //</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-terminal-green">CORE FEATURES</h2>
          <div className="w-32 h-px bg-terminal-green/40 mx-auto mt-4" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div key={f.cmd} className="border border-terminal-green/30 p-5 hover:border-terminal-green hover:bg-terminal-green/5 transition-all group">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-terminal-amber text-xl">{f.icon}</span>
                <span className="text-terminal-green/50 text-xs">{f.cmd}</span>
              </div>
              <h3 className="text-terminal-green font-bold mb-2 tracking-wider">{f.label}</h3>
              <p className="text-terminal-green/60 text-xs leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="px-6 py-20 bg-terminal-green/5 border-y border-terminal-green/20">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-terminal-amber text-xs tracking-widest mb-2">// EXECUTION_PIPELINE //</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-terminal-green">HOW IT WORKS</h2>
            <div className="w-32 h-px bg-terminal-green/40 mx-auto mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s) => (
              <div key={s.step} className="border-l-2 border-terminal-green/40 pl-4 py-2">
                <div className="text-terminal-amber text-3xl font-bold mb-2">{s.step}</div>
                <h3 className="text-terminal-green font-bold text-sm mb-2 tracking-wider">{s.title}</h3>
                <p className="text-terminal-green/60 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24 text-center">
        <div className="text-terminal-amber text-xs tracking-widest mb-4">// READY_TO_LAUNCH //</div>
        <h2 className="text-3xl sm:text-4xl font-bold text-terminal-green mb-6">
          INITIATE YOUR CAREER OS
        </h2>
        <p className="text-terminal-green/60 mb-10 max-w-md mx-auto text-sm">
          Upload your resume and let MetaRole AI build your complete career intelligence system in under 60 seconds.
        </p>
        <Link href="/upload" className="border-2 border-terminal-green px-12 py-4 text-terminal-green hover:bg-terminal-green hover:text-terminal-bg transition-all font-bold tracking-widest text-base inline-block">
          [ UPLOAD_RESUME ]
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-terminal-green/20 px-6 py-6 text-center text-terminal-green/30 text-xs">
        <p>MetaRole.AI © 2025 — Built with Next.js + FastAPI + OpenAI | <span className="text-terminal-amber">v2.4.1</span></p>
      </footer>
    </main>
  );
}
