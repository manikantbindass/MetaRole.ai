'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
                    ·  A I  ·  C A R E E R  ·  C O P I L O T  ·
`;

const TYPING_LINES = [
  '> Initializing MetaRole AI engine...',
  '> Loading career prediction models...',
  '> Connecting to job market intelligence...',
  '> Skill gap analyzer: ONLINE',
  '> Resume AI generator: READY',
  '> System operational. Welcome, Operator.',
];

const FEATURES = [
  { icon: '⬡', title: 'RESUME PARSER', desc: 'AI-powered extraction of skills, experience, and achievements from any resume format.' },
  { icon: '◈', title: 'SKILL GRAPH', desc: 'Visual network of your competencies mapped against industry demand curves.' },
  { icon: '◉', title: 'GAP ANALYZER', desc: 'Identify missing skills between your profile and target roles in real-time.' },
  { icon: '▣', title: 'CAREER PREDICTOR', desc: 'ML-driven career path prediction with probability scores and timelines.' },
  { icon: '◫', title: 'RESUME GENERATOR', desc: 'Auto-generate tailored resumes optimized per job description using GPT-4.' },
  { icon: '◬', title: 'JOB MATCHER', desc: 'Intelligent job matching engine with compatibility scoring and auto-apply.' },
];

const HOW_IT_WORKS = [
  { step: '01', cmd: 'UPLOAD', desc: 'Upload resume or connect GitHub profile' },
  { step: '02', cmd: 'ANALYZE', desc: 'AI parses and maps your skill graph' },
  { step: '03', cmd: 'PREDICT', desc: 'Career paths predicted with confidence scores' },
  { step: '04', cmd: 'GENERATE', desc: 'Tailored resume + portfolio auto-generated' },
  { step: '05', cmd: 'MATCH', desc: 'Jobs matched and applied intelligently' },
];

export default function LandingPage() {
  const [typedLines, setTypedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [heroText, setHeroText] = useState('');
  const [bootComplete, setBootComplete] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const HERO_TEXT = 'YOUR AI CAREER CO-PILOT';

  // Cursor blink
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Terminal typing boot sequence
  useEffect(() => {
    if (lineIndex >= TYPING_LINES.length) {
      setBootComplete(true);
      return;
    }
    if (charIndex < TYPING_LINES[lineIndex].length) {
      const t = setTimeout(() => {
        setCurrentLine(TYPING_LINES[lineIndex].slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
      }, 28);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setTypedLines(prev => [...prev, TYPING_LINES[lineIndex]]);
        setCurrentLine('');
        setCharIndex(0);
        setLineIndex(l => l + 1);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [lineIndex, charIndex]);

  // Hero text typing
  useEffect(() => {
    if (!bootComplete) return;
    if (heroText.length < HERO_TEXT.length) {
      const t = setTimeout(() => setHeroText(HERO_TEXT.slice(0, heroText.length + 1)), 60);
      return () => clearTimeout(t);
    }
  }, [bootComplete, heroText]);

  useEffect(() => {
    if (terminalRef.current) terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
  }, [typedLines, currentLine]);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono overflow-x-hidden">
      {/* CRT overlay */}
      <div className="pointer-events-none fixed inset-0 z-50" style={{
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)',
      }} />
      <div className="pointer-events-none fixed inset-0 z-40" style={{
        background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.4) 100%)',
      }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-30 border-b border-[#33ff00]/20 bg-[#0a0a0a]/90 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="text-[#33ff00] text-sm tracking-widest font-bold">METAROLE_AI://v1.0.0</span>
          <div className="flex gap-6 text-xs tracking-widest text-[#33ff00]/60">
            <a href="#features" className="hover:text-[#33ff00] transition-colors">[FEATURES]</a>
            <a href="#how" className="hover:text-[#33ff00] transition-colors">[HOW_IT_WORKS]</a>
            <Link href="/upload" className="hover:text-[#33ff00] transition-colors">[UPLOAD]</Link>
            <Link href="/dashboard" className="border border-[#33ff00]/40 px-3 py-1 hover:bg-[#33ff00]/10 transition-colors">[DASHBOARD]</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        {/* ASCII Logo */}
        <pre className="text-[#33ff00]/80 text-[6px] sm:text-[8px] leading-tight mb-8 overflow-x-auto select-none">
          {ASCII_LOGO}
        </pre>

        {/* Boot terminal */}
        <div className="border border-[#33ff00]/30 bg-[#0d0d0d] mb-10 max-w-3xl">
          <div className="border-b border-[#33ff00]/20 px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff4444] rounded-full" />
            <div className="w-2 h-2 bg-[#ffb000] rounded-full" />
            <div className="w-2 h-2 bg-[#33ff00] rounded-full" />
            <span className="ml-2 text-xs text-[#33ff00]/40 tracking-widest">METAROLE_BOOT.exe</span>
          </div>
          <div ref={terminalRef} className="p-4 h-44 overflow-y-auto text-sm space-y-1">
            {typedLines.map((line, i) => (
              <div key={i} className="text-[#33ff00]/70">{line}</div>
            ))}
            {lineIndex < TYPING_LINES.length && (
              <div className="text-[#33ff00]">
                {currentLine}<span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
              </div>
            )}
            {bootComplete && (
              <div className="text-[#33ff00] mt-2">
                {'>'} SYSTEM_STATUS: <span className="text-[#ffb000]">[ALL_SYSTEMS_NOMINAL]</span>
              </div>
            )}
          </div>
        </div>

        {/* Hero headline */}
        <div className="mb-8">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-3">// TAGLINE.INIT</div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-[#33ff00] leading-tight">
            {heroText}<span className={showCursor ? 'opacity-100' : 'opacity-0'}>_</span>
          </h1>
          <p className="mt-4 text-[#33ff00]/50 text-sm sm:text-base max-w-2xl leading-relaxed">
            {'>'} Analyze your skills. Predict your career. Close the gap. MetaRole AI is your
            intelligent career operating system — powered by GPT-4 and real-world job market data.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap gap-4 mb-16">
          <Link href="/upload" className="inline-flex items-center gap-2 border border-[#33ff00] bg-[#33ff00]/10 px-8 py-3 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all active:scale-95">
            <span className="text-[#33ff00]">[ INITIATE_SYSTEM ]</span>
          </Link>
          <Link href="/dashboard" className="inline-flex items-center gap-2 border border-[#33ff00]/30 px-8 py-3 text-sm tracking-widest text-[#33ff00]/60 hover:border-[#33ff00]/60 hover:text-[#33ff00] transition-all">
            <span>[ VIEW_DASHBOARD ]</span>
          </Link>
        </div>

        {/* Stats bar */}
        <div className="border border-[#33ff00]/20 grid grid-cols-2 sm:grid-cols-4 divide-x divide-[#33ff00]/20">
          {[['10K+', 'CAREERS_ANALYZED'], ['94%', 'MATCH_ACCURACY'], ['2.3x', 'FASTER_HIRING'], ['500+', 'SKILLS_MAPPED']].map(([val, label]) => (
            <div key={label} className="p-4 text-center">
              <div className="text-[#ffb000] text-xl font-bold">{val}</div>
              <div className="text-[#33ff00]/40 text-xs tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// MODULE_LIST</div>
          <h2 className="text-2xl font-bold tracking-widest text-[#33ff00]">CORE_MODULES</h2>
          <div className="w-24 h-px bg-[#33ff00]/40 mt-3" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#33ff00]/10">
          {FEATURES.map((f, i) => (
            <div key={i} className="bg-[#0a0a0a] border border-[#33ff00]/10 p-6 hover:border-[#33ff00]/40 hover:bg-[#33ff00]/5 transition-all group">
              <div className="text-3xl text-[#ffb000] mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
              <h3 className="text-sm font-bold tracking-widest text-[#33ff00] mb-2">{f.title}</h3>
              <p className="text-[#33ff00]/50 text-xs leading-relaxed">{f.desc}</p>
              <div className="mt-4 text-xs text-[#33ff00]/30 tracking-widest">STATUS: <span className="text-[#33ff00]">ACTIVE</span></div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// PROTOCOL.SEQ</div>
          <h2 className="text-2xl font-bold tracking-widest text-[#33ff00]">EXECUTION_SEQUENCE</h2>
          <div className="w-24 h-px bg-[#33ff00]/40 mt-3" />
        </div>
        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-[#33ff00]/20" />
          <div className="space-y-6">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={i} className="flex gap-8 items-start pl-0">
                <div className="relative z-10 w-16 h-16 border border-[#33ff00]/40 flex items-center justify-center bg-[#0a0a0a] flex-shrink-0">
                  <span className="text-[#ffb000] font-bold tracking-widest text-sm">{step.step}</span>
                </div>
                <div className="border border-[#33ff00]/10 p-4 flex-1 hover:border-[#33ff00]/30 transition-colors">
                  <div className="text-[#33ff00] font-bold tracking-widest text-sm mb-1">
                    {'>'} {step.cmd}<span className={showCursor && i === HOW_IT_WORKS.length - 1 ? 'opacity-100' : 'opacity-0'}>_</span>
                  </div>
                  <div className="text-[#33ff00]/50 text-xs">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO TERMINAL */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <div className="mb-10">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-2">// DEMO.PREVIEW</div>
          <h2 className="text-2xl font-bold tracking-widest text-[#33ff00]">TERMINAL_DEMO</h2>
          <div className="w-24 h-px bg-[#33ff00]/40 mt-3" />
        </div>
        <div className="border border-[#33ff00]/30 bg-[#0d0d0d]">
          <div className="border-b border-[#33ff00]/20 px-4 py-2 flex items-center gap-2">
            <div className="w-2 h-2 bg-[#ff4444] rounded-full" />
            <div className="w-2 h-2 bg-[#ffb000] rounded-full" />
            <div className="w-2 h-2 bg-[#33ff00] rounded-full" />
            <span className="ml-2 text-xs text-[#33ff00]/40 tracking-widest">metarole-ai ~$</span>
          </div>
          <div className="p-6 text-sm space-y-2 font-mono">
            <p className="text-[#33ff00]/60"><span className="text-[#ffb000]">$</span> metarole analyze --resume resume.pdf --github manikantbindass</p>
            <p className="text-[#33ff00]/40">  ⟶ Parsing resume... <span className="text-[#33ff00]">Done (2.1s)</span></p>
            <p className="text-[#33ff00]/40">  ⟶ Extracting skills... <span className="text-[#33ff00]">42 skills found</span></p>
            <p className="text-[#33ff00]/40">  ⟶ Mapping career paths... <span className="text-[#33ff00]">6 paths identified</span></p>
            <p className="text-[#33ff00]/60"><span className="text-[#ffb000]">$</span> metarole predict --role "Senior Engineer" --confidence 0.91</p>
            <p className="text-[#33ff00]/40">  PREDICTION: <span className="text-[#ffb000]">Full-Stack Architect [91%]</span></p>
            <p className="text-[#33ff00]/40">  GAPS: <span className="text-[#ff4444]">System Design, Kubernetes, GraphQL</span></p>
            <p className="text-[#33ff00]/60"><span className="text-[#ffb000]">$</span> metarole generate --resume --portfolio --apply</p>
            <p className="text-[#33ff00]/40">  ✓ Resume tailored for 3 target roles</p>
            <p className="text-[#33ff00]/40">  ✓ Portfolio site generated</p>
            <p className="text-[#33ff00]/40">  ✓ Applied to 12 matching jobs</p>
            <p className="text-[#33ff00] mt-2 flex items-center gap-1">
              <span className={showCursor ? 'opacity-100' : 'opacity-0'}>█</span>
            </p>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-16 px-6 max-w-7xl mx-auto border-t border-[#33ff00]/20">
        <div className="text-center">
          <div className="text-[#33ff00]/40 text-xs tracking-[0.3em] mb-4">// SYSTEM.READY</div>
          <h2 className="text-3xl font-bold tracking-widest text-[#33ff00] mb-4">READY_TO_LAUNCH?</h2>
          <p className="text-[#33ff00]/50 text-sm mb-8">{'>'} Your AI career co-pilot is standing by. Upload your resume to begin.</p>
          <Link href="/upload" className="inline-flex items-center gap-2 border border-[#33ff00] bg-[#33ff00]/10 px-12 py-4 text-sm tracking-widest hover:bg-[#33ff00]/20 transition-all text-[#33ff00] font-bold">
            [ INITIATE_SYSTEM ]
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#33ff00]/20 py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="text-[#33ff00]/40 text-xs tracking-widest">METAROLE_AI © 2025 // ALL_RIGHTS_RESERVED</span>
          <span className="text-[#33ff00]/40 text-xs tracking-widest">BUILD_v1.0.0 // POWERED_BY_GPT-4</span>
        </div>
      </footer>
    </main>
  );
}
