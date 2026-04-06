'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
                          AI CAREER CO-PILOT v2.0.26
`;

const TYPING_LINES = [
  '> Initializing MetaRole AI...',
  '> Loading career prediction engine...',
  '> Connecting to job market database...',
  '> Skill graph module ready.',
  '> Resume parser online.',
  '> Portfolio generator armed.',
  '> System ready. Awaiting user input_',
];

const FEATURES = [
  { cmd: 'analyze --resume', desc: 'AI-powered resume parsing & skill extraction', icon: '📄' },
  { cmd: 'map --skills', desc: 'Dynamic skill graph with gap analysis', icon: '🧠' },
  { cmd: 'predict --career', desc: 'ML career path prediction with probability scores', icon: '🎯' },
  { cmd: 'generate --resume', desc: 'Tailored resume per job description', icon: '📝' },
  { cmd: 'build --portfolio', desc: 'Auto-generated portfolio website', icon: '🌐' },
  { cmd: 'match --jobs', desc: 'Intelligent job matching & auto-apply', icon: '💼' },
];

export default function HomePage() {
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [bootComplete, setBootComplete] = useState(false);
  const termRef = useRef<HTMLDivElement>(null);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setShowCursor(p => !p), 530);
    return () => clearInterval(interval);
  }, []);

  // Typewriter boot sequence
  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) {
      setTimeout(() => setBootComplete(true), 600);
      return;
    }
    const line = TYPING_LINES[currentLine];
    if (currentChar < line.length) {
      const timeout = setTimeout(() => {
        setCurrentChar(p => p + 1);
      }, 28);
      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setTerminalLines(p => [...p, line]);
        setCurrentLine(p => p + 1);
        setCurrentChar(0);
      }, 180);
      return () => clearTimeout(timeout);
    }
  }, [currentLine, currentChar]);

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight;
  }, [terminalLines, currentChar]);

  return (
    <main className="min-h-screen bg-terminal-bg text-terminal-green font-mono">
      {/* CRT scanline overlay */}
      <div className="scanlines" aria-hidden="true" />

      {/* NAV */}
      <nav className="fixed top-0 w-full z-50 border-b border-terminal-green/20 bg-terminal-bg/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 h-12 flex items-center justify-between">
          <span className="text-terminal-green text-sm tracking-widest">[ METAROLE::AI ]</span>
          <div className="flex items-center gap-6 text-xs">
            <Link href="#features" className="text-terminal-green/60 hover:text-terminal-green transition-colors">--features</Link>
            <Link href="#how-it-works" className="text-terminal-green/60 hover:text-terminal-green transition-colors">--how-it-works</Link>
            <Link href="/upload" className="border border-terminal-green px-3 py-1 text-terminal-green hover:bg-terminal-green hover:text-black transition-all">[ LAUNCH ]</Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* ASCII Logo */}
          <pre className="text-terminal-green text-[7px] sm:text-[9px] md:text-xs leading-tight overflow-x-auto mb-8 opacity-90">
            {ASCII_LOGO}
          </pre>

          {/* Terminal boot */}
          <div className="border border-terminal-green/40 bg-black/60 p-4 mb-8 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 border-b border-terminal-green/20 pb-2">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
              <span className="w-3 h-3 rounded-full bg-terminal-green"></span>
              <span className="text-xs text-terminal-green/40 ml-2">metarole-ai ~ boot</span>
            </div>
            <div ref={termRef} className="min-h-[140px] text-sm leading-relaxed overflow-hidden">
              {terminalLines.map((line, i) => (
                <div key={i} className="text-terminal-green/80">{line}</div>
              ))}
              {currentLine < TYPING_LINES.length && (
                <div className="text-terminal-green">
                  {TYPING_LINES[currentLine].slice(0, currentChar)}
                  <span className={`inline-block w-2 h-4 bg-terminal-green ml-0.5 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
                </div>
              )}
            </div>
          </div>

          {/* CTA */}
          {bootComplete && (
            <div className="flex flex-col sm:flex-row gap-4 items-start animate-fade-in">
              <Link
                href="/upload"
                className="border-2 border-terminal-green px-8 py-3 text-terminal-green font-bold tracking-widest hover:bg-terminal-green hover:text-black transition-all duration-200 text-sm glitch-hover"
              >
                [ INITIATE SYSTEM ]
              </Link>
              <Link
                href="/dashboard"
                className="border border-terminal-amber px-8 py-3 text-terminal-amber tracking-widest hover:bg-terminal-amber hover:text-black transition-all duration-200 text-sm"
              >
                [ VIEW DEMO ]
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-16 px-4 border-t border-terminal-green/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-terminal-green/40 text-xs mb-1">// module list --all</p>
            <h2 className="text-2xl font-bold text-terminal-green tracking-widest">CORE MODULES</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="border border-terminal-green/30 p-5 hover:border-terminal-green hover:bg-terminal-green/5 transition-all duration-200 group"
              >
                <div className="text-terminal-green/40 text-xs mb-2 font-mono">$ {f.cmd}</div>
                <div className="text-2xl mb-2">{f.icon}</div>
                <p className="text-terminal-green/80 text-sm leading-relaxed">{f.desc}</p>
                <div className="mt-3 text-terminal-green/20 text-xs group-hover:text-terminal-green/60 transition-colors">--status: READY</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-16 px-4 border-t border-terminal-green/20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <p className="text-terminal-green/40 text-xs mb-1">// pipeline --show</p>
            <h2 className="text-2xl font-bold text-terminal-green tracking-widest">EXECUTION PIPELINE</h2>
          </div>
          <div className="flex flex-col md:flex-row gap-0">
            {[
              { step: '01', cmd: 'upload --resume', desc: 'Upload PDF/DOCX resume or connect GitHub' },
              { step: '02', cmd: 'parse --extract', desc: 'AI extracts skills, exp, projects' },
              { step: '03', cmd: 'analyze --gaps', desc: 'Compare against 10,000+ job descriptions' },
              { step: '04', cmd: 'predict --paths', desc: 'ML engine predicts top career paths' },
              { step: '05', cmd: 'generate --all', desc: 'Auto-generate resume + portfolio' },
            ].map((s, i) => (
              <div key={i} className="flex-1 border-l border-terminal-green/20 pl-4 pb-8 md:pb-0 md:border-l-0 md:border-t md:pt-4 md:pl-0">
                <div className="text-terminal-amber text-xs mb-1">STEP::{s.step}</div>
                <div className="text-terminal-green text-sm font-bold mb-1">$ {s.cmd}</div>
                <div className="text-terminal-green/60 text-xs">{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO TERMINAL */}
      <section className="py-16 px-4 border-t border-terminal-green/20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-terminal-green/40 text-xs mb-1">// demo --interactive</p>
            <h2 className="text-2xl font-bold text-terminal-green tracking-widest">LIVE DEMO PREVIEW</h2>
          </div>
          <div className="border border-terminal-green/40 bg-black/80">
            <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-green/20">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
              <span className="w-2 h-2 rounded-full bg-terminal-green"></span>
              <span className="text-xs text-terminal-green/40 ml-2">metarole-ai ~ career-analysis</span>
            </div>
            <div className="p-6 text-sm space-y-2 font-mono">
              <p className="text-terminal-green/40">$ metarole analyze --resume ./john_doe.pdf</p>
              <p className="text-terminal-green">&gt; Parsing resume... <span className="text-terminal-amber">DONE</span></p>
              <p className="text-terminal-green">&gt; Skills detected: JavaScript, React, Node.js, Python, AWS</p>
              <p className="text-terminal-green">&gt; Experience: 3 years | Projects: 12 | GitHub: 847 commits</p>
              <p className="text-terminal-green/40">$ metarole predict --career</p>
              <p className="text-terminal-green">&gt; Top paths:</p>
              <p className="text-terminal-green ml-4">[1] Full-Stack Engineer <span className="text-terminal-amber">92%</span> match</p>
              <p className="text-terminal-green ml-4">[2] Frontend Architect <span className="text-terminal-amber">87%</span> match</p>
              <p className="text-terminal-green ml-4">[3] DevOps Engineer <span className="text-terminal-amber">71%</span> match</p>
              <p className="text-terminal-green/40">$ metarole gaps --analyze --target "Senior Full-Stack"</p>
              <p className="text-terminal-green">&gt; Missing: GraphQL, Docker, System Design</p>
              <p className="text-terminal-green">&gt; Roadmap generated. <span className="text-terminal-amber">3 modules</span> to master.</p>
              <p className="text-terminal-green">&gt; Portfolio generated: <span className="text-terminal-amber underline">https://johndoe.metarole.ai</span></p>
              <p className="text-terminal-green">&gt; Resume tailored for 14 jobs. <span className="text-terminal-amber">Auto-apply ready.</span></p>
              <p className="flex items-center gap-1">
                <span className="text-terminal-green/40">$</span>
                <span className={`inline-block w-2 h-4 bg-terminal-green ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-4 border-t border-terminal-green/20">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-terminal-green/40 text-xs">[ METAROLE::AI ] — Your AI Career Co-Pilot</p>
          <p className="text-terminal-green/20 text-xs">BUILD: 2026.04.06 | STATUS: OPERATIONAL | MIT LICENSE</p>
        </div>
      </footer>
    </main>
  );
}
