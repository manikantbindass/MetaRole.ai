'use client';
import { useEffect, useRef, useState } from 'react';
import { ASCII_LOGO, TERMINAL_COMMANDS } from '../animations/terminal';
import Link from 'next/link';

const HERO_LINES = [
  'INITIALIZING METAROLE AI SYSTEM...',
  'LOADING CAREER INTELLIGENCE ENGINE...',
  'ANALYZING 10,000+ CAREER PATHS...',
  'SYSTEM READY. DEPLOY YOUR FUTURE.',
];

const FEATURES = [
  { icon: '[ ▶ ]', title: 'RESUME PARSER', desc: 'AI extracts skills, experience, projects from any resume format with 98% accuracy.' },
  { icon: '[ ★ ]', title: 'SKILL GRAPH', desc: 'Visual graph maps your technical & soft skills, revealing hidden strengths and gaps.' },
  { icon: '[ ◆ ]', title: 'CAREER PREDICTION', desc: 'ML models predict your top 5 career paths with probability scores.' },
  { icon: '[ ■ ]', title: 'GAP ANALYSIS', desc: 'Compares your profile against 500+ job roles, identifies exact missing skills.' },
  { icon: '[ ♥ ]', title: 'AI RESUME GEN', desc: 'Auto-generates tailored resumes per job application using GPT-4.' },
  { icon: '[ ♠ ]', title: 'JOB MATCHING', desc: 'Intelligent job matching from 50+ platforms with auto-apply capability.' },
];

const HOW_IT_WORKS = [
  { step: '01', cmd: '$ upload --resume', desc: 'Upload your PDF/DOCX resume or connect GitHub profile.' },
  { step: '02', cmd: '$ analyze --skills', desc: 'AI parses and maps your complete skill matrix.' },
  { step: '03', cmd: '$ predict --career', desc: 'Receive ranked career path predictions with confidence scores.' },
  { step: '04', cmd: '$ generate --portfolio', desc: 'Auto-generate resume, portfolio website, and apply to jobs.' },
];

export default function LandingPage() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [heroLine, setHeroLine] = useState('');
  const [heroLineIdx, setHeroLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [booted, setBooted] = useState(false);

  // Boot sequence
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < TERMINAL_COMMANDS.length) {
        setBootLines(prev => [...prev, `> ${TERMINAL_COMMANDS[i].cmd}`]);
        i++;
      } else {
        clearInterval(timer);
        setBooted(true);
      }
    }, 600);
    return () => clearInterval(timer);
  }, []);

  // Hero typing animation
  useEffect(() => {
    if (!booted) return;
    const target = HERO_LINES[heroLineIdx];
    if (charIdx < target.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 40);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        if (heroLineIdx < HERO_LINES.length - 1) {
          setHeroLineIdx(l => l + 1);
          setCharIdx(0);
          setHeroLine('');
        }
      }, 1800);
      return () => clearTimeout(t);
    }
  }, [booted, charIdx, heroLineIdx]);

  useEffect(() => {
    setHeroLine(HERO_LINES[heroLineIdx].slice(0, charIdx));
  }, [charIdx, heroLineIdx]);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#33ff00] font-mono">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#0a0a0a]/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-[#33ff00] text-sm tracking-widest font-bold">[METAROLE.AI]</span>
          <div className="flex items-center gap-6 text-xs tracking-wider">
            <a href="#features" className="text-[#555] hover:text-[#33ff00] transition-colors">&gt; FEATURES</a>
            <a href="#how" className="text-[#555] hover:text-[#33ff00] transition-colors">&gt; HOW IT WORKS</a>
            <Link href="/dashboard" className="text-[#555] hover:text-[#33ff00] transition-colors">&gt; DASHBOARD</Link>
            <Link
              href="/upload"
              className="border border-[#33ff00] px-4 py-1.5 text-[#33ff00] hover:bg-[#33ff00] hover:text-[#0a0a0a] transition-all text-xs tracking-widest"
            >
              [ INITIATE ]
            </Link>
          </div>
        </div>
      </nav>

      {/* BOOT TERMINAL */}
      {!booted && (
        <div className="fixed inset-0 z-40 bg-[#0a0a0a] flex items-center justify-center">
          <div className="max-w-2xl w-full px-8">
            <pre className="text-[#33ff00] text-[10px] leading-tight mb-8 opacity-80">{ASCII_LOGO}</pre>
            <div className="space-y-2">
              {bootLines.map((line, i) => (
                <div key={i} className="text-sm tracking-wider">
                  <span className="text-[#1a8000] mr-2">$</span>
                  <span>{line}</span>
                </div>
              ))}
              <div className="inline-block w-2 h-4 bg-[#33ff00] animate-pulse" />
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-14">
        <div className="max-w-4xl w-full">
          <pre className="text-[#33ff00] text-[9px] md:text-[11px] leading-tight mb-12 opacity-60 overflow-x-auto">{ASCII_LOGO}</pre>

          <div className="border border-[#1a8000] bg-[#111] p-6 mb-8">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#ff3333]" />
              <div className="w-3 h-3 rounded-full bg-[#ffb000]" />
              <div className="w-3 h-3 rounded-full bg-[#33ff00]" />
              <span className="ml-4 text-xs text-[#555] tracking-widest">metarole-ai ~ career-terminal</span>
            </div>
            <div className="space-y-1 text-sm">
              <div className="text-[#555]"># MetaRole AI v1.0.0 — Career Intelligence System</div>
              <div className="text-[#555]"># Your AI Career Co-Pilot</div>
              <div className="mt-4 text-lg md:text-2xl font-bold tracking-wider text-[#33ff00]">
                &gt; {heroLine}<span className="animate-pulse">_</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/upload"
              className="btn-terminal text-center text-sm tracking-widest py-3 px-8 uppercase hover:glitch"
            >
              [ INITIATE SYSTEM ]
            </Link>
            <Link
              href="/dashboard"
              className="btn-terminal-amber btn-terminal text-center text-sm tracking-widest py-3 px-8 uppercase"
            >
              [ VIEW DASHBOARD ]
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[['10K+', 'CAREER PATHS'], ['500+', 'JOB ROLES'], ['98%', 'PARSE ACCURACY'], ['50+', 'JOB PLATFORMS']].map(([val, label]) => (
              <div key={label} className="border border-[#1a1a1a] p-4 text-center">
                <div className="text-2xl font-bold text-[#33ff00]">{val}</div>
                <div className="text-[10px] text-[#555] tracking-widest mt-1">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs text-[#555] tracking-widest mb-2">&gt; ls ./features/</div>
          <h2 className="text-xl md:text-2xl font-bold text-[#33ff00] mb-12 tracking-wider">
            CORE MODULES <span className="text-[#555] text-sm">[6 loaded]</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="border border-[#1a1a1a] bg-[#111] p-6 hover:border-[#1a8000] transition-all group cursor-default"
              >
                <div className="text-[#ffb000] text-lg mb-3 group-hover:text-[#33ff00] transition-colors font-bold">{f.icon}</div>
                <div className="text-sm font-bold tracking-widest mb-3 text-[#33ff00]">{f.title}</div>
                <div className="text-xs text-[#555] leading-relaxed">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-[#555] tracking-widest mb-2">&gt; cat ./how-it-works.sh</div>
          <h2 className="text-xl md:text-2xl font-bold text-[#33ff00] mb-12 tracking-wider">EXECUTION FLOW</h2>
          <div className="space-y-6">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex gap-6 border border-[#1a1a1a] p-6 hover:border-[#1a8000] transition-all">
                <div className="text-3xl font-bold text-[#1a8000] shrink-0">{step.step}</div>
                <div>
                  <div className="text-sm font-bold text-[#ffb000] mb-2 tracking-wider">{step.cmd}</div>
                  <div className="text-xs text-[#555] leading-relaxed">{step.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO TERMINAL */}
      <section className="py-24 px-6 border-t border-[#1a1a1a]">
        <div className="max-w-4xl mx-auto">
          <div className="text-xs text-[#555] tracking-widest mb-2">&gt; demo --interactive</div>
          <h2 className="text-xl font-bold text-[#33ff00] mb-8 tracking-wider">LIVE TERMINAL PREVIEW</h2>
          <div className="border border-[#1a8000] bg-[#111]">
            <div className="border-b border-[#1a1a1a] px-4 py-2 flex items-center gap-2">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#ff3333]" />
                <div className="w-3 h-3 rounded-full bg-[#ffb000]" />
                <div className="w-3 h-3 rounded-full bg-[#33ff00]" />
              </div>
              <span className="text-[#555] text-xs ml-2 tracking-wider">metarole-ai@career-engine:~$</span>
            </div>
            <div className="p-6 space-y-2 text-sm">
              {[
                { prompt: '$', text: 'metarole analyze --resume=john_doe.pdf', color: '#33ff00' },
                { prompt: '', text: 'Parsing resume...', color: '#555' },
                { prompt: '', text: '✔ Skills detected: React, Node.js, Python, AWS, Docker [48 total]', color: '#1a8000' },
                { prompt: '', text: '✔ Experience: 3.5 years | Projects: 12 | GitHub: 89 stars', color: '#1a8000' },
                { prompt: '', text: 'Running career prediction model...', color: '#555' },
                { prompt: '', text: '  [====================] 100% complete', color: '#ffb000' },
                { prompt: '', text: 'Top career matches:', color: '#33ff00' },
                { prompt: '', text: '  1. Senior Full-Stack Engineer  ██████████  94%', color: '#33ff00' },
                { prompt: '', text: '  2. DevOps / Cloud Architect    ████████▀▀  87%', color: '#1a8000' },
                { prompt: '', text: '  3. AI/ML Engineer              ███████▀▀▀  78%', color: '#1a8000' },
                { prompt: '', text: 'Skill gaps identified: Kubernetes, GraphQL, TensorFlow', color: '#ffb000' },
                { prompt: '$', text: '█', color: '#33ff00' },
              ].map((line, i) => (
                <div key={i} className={`flex gap-2`} style={{ color: line.color }}>
                  {line.prompt && <span className="text-[#1a8000]">{line.prompt}</span>}
                  <span className={line.prompt ? '' : 'pl-4'}>{line.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-[#1a1a1a] text-center">
        <div className="max-w-2xl mx-auto">
          <div className="text-xs text-[#555] tracking-widest mb-4">&gt; sudo deploy --career</div>
          <h2 className="text-2xl md:text-3xl font-bold text-[#33ff00] mb-4 tracking-wider">READY TO INITIATE?</h2>
          <p className="text-[#555] text-sm mb-8 leading-relaxed">
            Join thousands of engineers using MetaRole AI to accelerate their careers.
          </p>
          <Link
            href="/upload"
            className="btn-terminal inline-flex text-sm tracking-widest py-4 px-12 uppercase"
          >
            [ INITIATE SYSTEM → ]
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="text-xs text-[#555] tracking-widest">[METAROLE.AI] v1.0.0 — AI CAREER CO-PILOT</span>
          <span className="text-xs text-[#333] tracking-wider">BUILT WITH ♥ BY MANIKANT BINDASS</span>
        </div>
      </footer>
    </div>
  );
}
