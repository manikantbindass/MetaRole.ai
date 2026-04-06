'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
`;

const FEATURES = [
  { id: '01', icon: '📄', title: 'RESUME_PARSER', desc: 'AI-powered extraction of skills, experience, and projects via GPT-4. Supports PDF/DOCX.' },
  { id: '02', icon: '🕸️', title: 'SKILL_GRAPH', desc: 'D3.js force-directed visualization of your entire skill network and competency levels.' },
  { id: '03', icon: '🔍', title: 'GAP_ANALYZER', desc: 'Compares your current stack vs. target role requirements to surface hidden deficiencies.' },
  { id: '04', icon: '🎯', title: 'CAREER_PREDICTOR', desc: 'ML-powered role suggestions with confidence scores and transition roadmaps.' },
  { id: '05', icon: '✍️', title: 'RESUME_GENERATOR', desc: 'Tailored, ATS-optimized resume generated per job description.' },
  { id: '06', icon: '🌐', title: 'PORTFOLIO_GEN', desc: 'Auto-generated portfolio website from your data. One click deploy.' },
  { id: '07', icon: '💼', title: 'JOB_MATCHER', desc: 'Semantic job search and intelligent match scoring across 100k+ listings.' },
  { id: '08', icon: '📊', title: 'CAREER_DASHBOARD', desc: 'Real-time analytics, progress tracking, and AI-driven goal setting.' },
];

const STEPS = [
  { step: '01', cmd: '> upload --resume ./your-resume.pdf', desc: 'Upload your PDF or DOCX resume' },
  { step: '02', cmd: '> analyze --skills --gaps --predict', desc: 'AI parses skills and finds gaps' },
  { step: '03', cmd: '> generate --resume --portfolio --jobs', desc: 'Generate tailored assets instantly' },
  { step: '04', cmd: '> apply --intelligent --auto-match', desc: 'Match to jobs and apply with context' },
];

function TypewriterText({ texts, speed = 60 }: { texts: string[]; speed?: number }) {
  const [displayText, setDisplayText] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => setShowCursor(s => !s), 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const current = texts[textIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => {
        setDisplayText(current.slice(0, charIdx + 1));
        setCharIdx(c => c + 1);
      }, speed);
      return () => clearTimeout(t);
    } else if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (deleting && charIdx > 0) {
      const t = setTimeout(() => {
        setDisplayText(current.slice(0, charIdx - 1));
        setCharIdx(c => c - 1);
      }, speed / 2);
      return () => clearTimeout(t);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, textIdx, texts, speed]);

  return (
    <span className="text-green-400">
      {displayText}
      <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} text-green-400`}>█</span>
    </span>
  );
}

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const bootLines = [
    '> INITIALIZING METAROLE AI SYSTEM v2.0...',
    '> LOADING AI CORE MODULES..............OK',
    '> CONNECTING TO CAREER DATABASE........OK',
    '> LOADING SKILL GRAPH ENGINE...........OK',
    '> INITIALIZING GPT-4 PARSER............OK',
    '> JOB MATCHING SYSTEM ONLINE...........OK',
    '> PORTFOLIO GENERATOR READY............OK',
    '> ================================',
    '> SYSTEM READY. CAREER CO-PILOT ONLINE.',
    '> WELCOME, OPERATOR.',
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < bootLines.length) {
        setLines(prev => [...prev, bootLines[i]]);
        i++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 600);
      }
    }, 140);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center scanlines">
      <div className="max-w-2xl w-full px-8">
        <pre className="text-green-400 text-xs font-mono mb-6 leading-tight hidden md:block">{ASCII_LOGO}</pre>
        <div className="space-y-1">
          {lines.map((line, i) => (
            <p key={i} className="text-green-400 font-mono text-sm animate-fadeIn">
              {line}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [booted, setBooted] = useState(false);
  const [showBoot, setShowBoot] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem('boot_seen');
    if (seen) {
      setShowBoot(false);
      setBooted(true);
    }
  }, []);

  const handleBoot = () => {
    sessionStorage.setItem('boot_seen', '1');
    setBooted(true);
    setTimeout(() => setShowBoot(false), 400);
  };

  return (
    <>
      {showBoot && !booted && <BootSequence onComplete={handleBoot} />}
      <main className="min-h-screen bg-black text-green-400 font-mono scanlines overflow-x-hidden">
        {/* NAV */}
        <nav className="border-b border-green-900 px-6 py-3 flex items-center justify-between sticky top-0 bg-black z-40">
          <span className="text-green-400 font-bold tracking-widest text-sm">[ METAROLE_AI ]</span>
          <div className="flex gap-6 text-xs text-green-600">
            <Link href="#features" className="hover:text-green-400 transition-colors">&gt; FEATURES</Link>
            <Link href="#how-it-works" className="hover:text-green-400 transition-colors">&gt; HOW_IT_WORKS</Link>
            <Link href="/dashboard" className="hover:text-green-400 transition-colors">&gt; DASHBOARD</Link>
            <Link href="/upload" className="border border-green-400 px-3 py-1 hover:bg-green-400 hover:text-black transition-all">&gt; INITIATE</Link>
          </div>
        </nav>

        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center relative">
          <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
          <pre className="text-green-400 text-[6px] md:text-xs leading-tight mb-8 hidden sm:block select-none">{ASCII_LOGO}</pre>
          <div className="space-y-4 max-w-3xl">
            <p className="text-green-600 text-xs tracking-widest uppercase">&gt; SYSTEM ONLINE — BUILD v2.0.1</p>
            <h1 className="text-3xl md:text-5xl font-bold text-green-400 leading-tight">
              YOUR AI{' '}
              <TypewriterText texts={['CAREER CO-PILOT', 'SKILL ANALYZER', 'RESUME GENERATOR', 'JOB MATCHER']} />
            </h1>
            <p className="text-green-600 text-sm md:text-base max-w-xl mx-auto">
              Parse your resume. Map your skills. Predict your future. Generate your portfolio. Land the right job — without guesswork.
            </p>
            <div className="terminal-window max-w-md mx-auto mt-8 text-left">
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-500" />
                <span className="terminal-dot bg-green-500" />
                <span className="ml-2 text-xs text-green-600">metarole@career:~$</span>
              </div>
              <div className="p-4 space-y-1 text-sm">
                <p><span className="text-green-600">$</span> metarole init --analyze</p>
                <p className="text-green-600">&gt; Parsing resume data......</p>
                <p className="text-green-600">&gt; Building skill graph......</p>
                <p className="text-green-600">&gt; Predicting career paths...</p>
                <p>&gt; <span className="text-yellow-400">3 CAREER PATHS IDENTIFIED</span></p>
                <p>&gt; <span className="text-yellow-400">12 SKILL GAPS FOUND</span></p>
                <p>&gt; <span className="text-green-400">RESUME GENERATED ✓</span></p>
              </div>
            </div>
            <div className="flex gap-4 justify-center mt-8 flex-wrap">
              <Link href="/upload"
                className="border border-green-400 px-8 py-3 text-green-400 hover:bg-green-400 hover:text-black transition-all font-bold tracking-widest text-sm glitch-hover">
                [ INITIATE SYSTEM ]
              </Link>
              <Link href="/dashboard"
                className="border border-green-900 px-8 py-3 text-green-600 hover:border-green-400 hover:text-green-400 transition-all text-sm tracking-widest">
                [ VIEW DASHBOARD ]
              </Link>
            </div>
          </div>
          <div className="absolute bottom-8 text-green-800 text-xs animate-bounce">&gt; SCROLL TO EXPLORE</div>
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24 px-6 border-t border-green-900">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12">
              <p className="text-green-600 text-xs mb-2">// SYSTEM_MODULES</p>
              <h2 className="text-2xl font-bold text-green-400">&gt; CORE_FEATURES.LIST</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {FEATURES.map(f => (
                <div key={f.id} className="border border-green-900 p-5 hover:border-green-400 transition-all group">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-green-800 text-xs">[{f.id}]</span>
                    <span className="text-lg">{f.icon}</span>
                  </div>
                  <h3 className="text-green-400 font-bold text-sm mb-2 group-hover:text-yellow-400 transition-colors">{f.title}</h3>
                  <p className="text-green-700 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="py-24 px-6 border-t border-green-900 bg-[#050505]">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-green-600 text-xs mb-2">// EXECUTION_FLOW</p>
              <h2 className="text-2xl font-bold text-green-400">&gt; HOW_IT_WORKS.SH</h2>
            </div>
            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <div key={s.step} className="flex gap-4 items-start">
                  <div className="text-green-800 text-xs font-bold pt-1 w-8 shrink-0">{s.step}</div>
                  <div className="flex-1 border border-green-900 p-4 hover:border-green-600 transition-all">
                    <p className="text-green-400 text-sm font-mono mb-1">{s.cmd}</p>
                    <p className="text-green-700 text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DEMO TERMINAL */}
        <section className="py-24 px-6 border-t border-green-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <p className="text-green-600 text-xs mb-2">// DEMO_PREVIEW</p>
              <h2 className="text-2xl font-bold text-green-400">&gt; SYSTEM_DEMO.RUN</h2>
            </div>
            <div className="terminal-window">
              <div className="terminal-header">
                <span className="terminal-dot bg-red-500" />
                <span className="terminal-dot bg-yellow-500" />
                <span className="terminal-dot bg-green-500" />
                <span className="ml-2 text-xs text-green-600">metarole@system — career-analysis</span>
              </div>
              <div className="p-6 space-y-2 text-sm">
                <p><span className="text-green-600">operator@metarole:~$</span> upload-resume ./john_doe_resume.pdf</p>
                <p className="text-green-600">[ INFO ] Reading file: john_doe_resume.pdf (142KB)</p>
                <p className="text-green-600">[ INFO ] Sending to AI Parser...</p>
                <p className="text-yellow-400">[ PARSE ] Extracted 24 skills, 3 jobs, 7 projects</p>
                <p className="text-green-600">[ INFO ] Building skill graph...</p>
                <p className="text-green-400">[ OK   ] Skill graph built: 24 nodes, 41 edges</p>
                <p className="text-green-600">[ INFO ] Analyzing career paths...</p>
                <p className="text-yellow-400">[ PRED ] Top match: Senior Full-Stack Engineer (92%)</p>
                <p className="text-yellow-400">[ PRED ] Alt match: Lead Backend Engineer (87%)</p>
                <p className="text-yellow-400">[ PRED ] Alt match: Engineering Manager (74%)</p>
                <p className="text-green-600">[ INFO ] Identifying skill gaps for Target Role...</p>
                <p className="text-red-400">[ GAP  ] Missing: Kubernetes, GraphQL, System Design</p>
                <p className="text-green-600">[ INFO ] Generating tailored resume...</p>
                <p className="text-green-400">[ OK   ] resume_tailored.pdf created ✓</p>
                <p className="text-green-600">[ INFO ] Finding job matches...</p>
                <p className="text-green-400">[ OK   ] 47 matching positions found ✓</p>
                <p className="text-green-400 animate-pulse">█ SYSTEM READY — ALL TASKS COMPLETE</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t border-green-900 text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <p className="text-green-600 text-xs">&gt; READY_TO_EXECUTE?</p>
            <h2 className="text-3xl font-bold text-green-400">BEGIN YOUR CAREER MISSION</h2>
            <p className="text-green-700 text-sm">Upload your resume and let AI map your entire career trajectory in minutes.</p>
            <Link href="/upload"
              className="inline-block border border-green-400 px-12 py-4 text-green-400 hover:bg-green-400 hover:text-black transition-all font-bold tracking-widest">
              [ INITIATE SYSTEM ]
            </Link>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-green-900 px-6 py-8 text-center">
          <p className="text-green-800 text-xs">MetaRole AI — Your Career Co-Pilot | Built by manikantbindass</p>
          <p className="text-green-900 text-xs mt-1">&gt; SESSION_END. CAREER PATH OPTIMIZED. GOOD LUCK, OPERATOR.</p>
        </footer>
      </main>
    </>
  );
}
