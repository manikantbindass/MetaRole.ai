'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// ASCII Logo for MetaRole AI
const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗    █████╗ ██╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝   ██╔══██╗██║
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗     ███████║██║
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝     ██╔══██║██║
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗   ██║  ██║██║
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝   ╚═╝  ╚═╝╚═╝
`;

const BOOT_SEQUENCE = [
  '> METAROLE AI v2.0.0 INITIALIZING...',
  '> LOADING NEURAL NETWORK MODULES...',
  '> CONNECTING TO CAREER DATABASE...',
  '> AI CORE ONLINE.',
  '> SKILL GRAPH ENGINE READY.',
  '> RESUME PARSER LOADED.',
  '> CAREER PREDICTOR ACTIVE.',
  '> JOB MATCHER ONLINE.',
  '',
  '> SYSTEM READY. WELCOME, OPERATOR.',
];

const FEATURES = [
  {
    id: '01',
    icon: '📄',
    title: 'RESUME_PARSER',
    desc: 'AI-powered extraction of skills, experience, and projects via GPT-4. Supports PDF, DOCX, TXT.',
    color: 'green',
  },
  {
    id: '02',
    icon: '🕸️',
    title: 'SKILL_GRAPH',
    desc: 'D3.js force-directed visualization of your entire skill network. See gaps at a glance.',
    color: 'amber',
  },
  {
    id: '03',
    icon: '🔍',
    title: 'GAP_ANALYZER',
    desc: 'Compare your stack vs. target role requirements. Get prioritized learning recommendations.',
    color: 'green',
  },
  {
    id: '04',
    icon: '🎯',
    title: 'CAREER_PREDICTOR',
    desc: 'ML-powered role suggestions with confidence scores. Know your next best career move.',
    color: 'amber',
  },
  {
    id: '05',
    icon: '✍️',
    title: 'RESUME_GENERATOR',
    desc: 'Tailored, ATS-optimized resume per job description. One-click export to PDF.',
    color: 'green',
  },
  {
    id: '06',
    icon: '🌐',
    title: 'PORTFOLIO_GEN',
    desc: 'Auto-generated portfolio website from your data. Deploy to Vercel in seconds.',
    color: 'amber',
  },
  {
    id: '07',
    icon: '💼',
    title: 'JOB_MATCHER',
    desc: 'Semantic job search & intelligent match scoring. Apply directly from the dashboard.',
    color: 'green',
  },
  {
    id: '08',
    icon: '📊',
    title: 'CAREER_DASHBOARD',
    desc: 'Real-time analytics, progress tracking, and goal setting. Your career in one view.',
    color: 'amber',
  },
];

function BootScreen({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setLines((prev) => [...prev, BOOT_SEQUENCE[i]]);
        i++;
      } else {
        clearInterval(timer);
        setTimeout(() => {
          setDone(true);
          setTimeout(onComplete, 600);
        }, 800);
      }
    }, 150);
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 bg-terminal-bg flex flex-col justify-center items-center z-50 p-8"
      animate={done ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <pre className="ascii-art text-center mb-8" style={{ fontSize: '8px', lineHeight: '1.2' }}>
        {ASCII_LOGO}
      </pre>
      <div className="font-mono text-sm space-y-1 w-full max-w-2xl">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.1 }}
            className={line.includes('READY') || line.includes('WELCOME') ? 'text-green glow-green' : 'text-terminal-text'}
          >
            {line}
          </motion.div>
        ))}
        {!done && <span className="cursor" />}
      </div>
    </motion.div>
  );
}

function HeroSection() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'YOUR AI CAREER CO-PILOT';

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden px-4 py-20">
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'linear-gradient(#33ff00 1px, transparent 1px), linear-gradient(90deg, #33ff00 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-4xl mx-auto relative z-10"
      >
        {/* ASCII Logo */}
        <div className="mb-8 overflow-hidden">
          <pre className="ascii-art inline-block text-left" style={{ fontSize: window.innerWidth < 768 ? '5px' : '8px' }}>
            {ASCII_LOGO}
          </pre>
        </div>

        {/* Tagline */}
        <div className="mb-4">
          <span className="text-terminal-muted font-mono text-sm">[ SYSTEM ] </span>
          <span className="text-terminal-green font-mono text-xl md:text-3xl font-bold glow-green">
            {typedText}
          </span>
          <span className="cursor" />
        </div>

        <p className="text-terminal-text font-mono text-sm md:text-base mb-2 opacity-70">
          &quot;The system knows your potential before you do.&quot;
        </p>

        {/* Status indicators */}
        <div className="flex flex-wrap justify-center gap-4 my-8 text-xs font-mono">
          {['AI_CORE: ONLINE', 'SKILL_ENGINE: READY', 'JOB_MATCHER: ACTIVE', 'RESUME_GEN: LOADED'].map((status) => (
            <span key={status} className="text-terminal-green border border-terminal-green px-3 py-1 glow-green">
              <span className="animate-pulse mr-1">●</span> {status}
            </span>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
          <Link href="/upload">
            <button className="btn-terminal text-base px-8 py-4 font-bold">
              [ INITIATE SYSTEM ]
            </button>
          </Link>
          <Link href="/dashboard">
            <button className="btn-terminal btn-terminal-amber text-base px-8 py-4">
              [ VIEW DASHBOARD ]
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 border-t border-terminal-border pt-8">
          {[
            { val: '10K+', label: 'CAREERS_ANALYZED' },
            { val: '94%', label: 'PREDICTION_ACCURACY' },
            { val: '3.2x', label: 'FASTER_JOB_SEARCH' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl md:text-4xl font-bold text-terminal-green glow-green">{stat.val}</div>
              <div className="text-xs text-terminal-muted mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-20 px-4 border-t border-terminal-border">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mb-12"
        >
          <div className="font-mono text-terminal-muted text-sm mb-2">&gt; ls -la ./features/</div>
          <h2 className="text-2xl font-bold text-terminal-green glow-green">CORE_MODULES</h2>
          <div className="w-16 h-px bg-terminal-green mt-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="terminal-card p-4 cursor-default"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-terminal-muted text-xs">[{feat.id}]</span>
                <span className={`text-sm font-bold ${feat.color === 'green' ? 'text-green glow-green' : 'text-amber glow-amber'}`}>
                  {feat.title}
                </span>
              </div>
              <p className="text-terminal-muted text-xs leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    { num: '01', cmd: 'upload --resume ./my-resume.pdf', desc: 'Upload your resume (PDF/DOCX) or connect GitHub profile' },
    { num: '02', cmd: 'analyze --extract-skills --build-graph', desc: 'AI parses your data and builds an interactive skill graph' },
    { num: '03', cmd: 'predict --career-paths --confidence-score', desc: 'Career engine predicts optimal roles with probability scores' },
    { num: '04', cmd: 'generate --resume --portfolio --apply', desc: 'Generate tailored resume, portfolio, and apply to matched jobs' },
  ];

  return (
    <section className="py-20 px-4 border-t border-terminal-border bg-terminal-surface">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-12">
          <div className="font-mono text-terminal-muted text-sm mb-2">&gt; cat HOW_IT_WORKS.md</div>
          <h2 className="text-2xl font-bold text-terminal-green glow-green">EXECUTION_FLOW</h2>
          <div className="w-16 h-px bg-terminal-green mt-2" />
        </motion.div>

        <div className="space-y-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="terminal-card p-4"
            >
              <div className="flex gap-4">
                <div className="text-terminal-green font-bold text-lg w-8 shrink-0">{step.num}</div>
                <div>
                  <div className="font-mono text-sm">
                    <span className="text-terminal-amber">$ </span>
                    <span className="text-terminal-green">{step.cmd}</span>
                  </div>
                  <p className="text-terminal-muted text-xs mt-1">{step.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DemoTerminalSection() {
  const demoLines = [
    { type: 'cmd', text: 'metarole analyze --resume ./john_doe_cv.pdf' },
    { type: 'info', text: '[INFO] Parsing resume...' },
    { type: 'success', text: '[✓] Extracted 47 skills across 6 domains' },
    { type: 'info', text: '[INFO] Building skill graph...' },
    { type: 'success', text: '[✓] Skill graph generated: 47 nodes, 89 edges' },
    { type: 'info', text: '[INFO] Analyzing career paths...' },
    { type: 'data', text: '[RESULT] Top career matches:' },
    { type: 'data', text: '  → Senior Full-Stack Engineer    ████████░░  82%' },
    { type: 'data', text: '  → ML Engineer                    ██████░░░░  64%' },
    { type: 'data', text: '  → DevOps Engineer                ████████░░  79%' },
    { type: 'info', text: '[INFO] Identifying skill gaps...' },
    { type: 'warn', text: '[GAP] Missing: Kubernetes, GraphQL, System Design' },
    { type: 'success', text: '[✓] Generating tailored resume for Senior Full-Stack...' },
    { type: 'success', text: '[✓] Resume saved: ./output/resume_senior_fse.pdf' },
    { type: 'success', text: '[✓] Portfolio generated: https://metarole.app/u/john_doe' },
  ];

  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev < demoLines.length) return prev + 1;
        clearInterval(timer);
        return prev;
      });
    }, 300);
    return () => clearInterval(timer);
  }, []);

  const getColor = (type: string) => {
    switch (type) {
      case 'cmd': return 'text-terminal-green';
      case 'success': return 'text-terminal-green';
      case 'warn': return 'text-terminal-amber';
      case 'data': return 'text-terminal-text';
      default: return 'text-terminal-muted';
    }
  };

  return (
    <section className="py-20 px-4 border-t border-terminal-border">
      <div className="max-w-4xl mx-auto">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="mb-8">
          <div className="font-mono text-terminal-muted text-sm mb-2">&gt; demo --live-preview</div>
          <h2 className="text-2xl font-bold text-terminal-green glow-green">LIVE_DEMO</h2>
          <div className="w-16 h-px bg-terminal-green mt-2" />
        </motion.div>

        <div className="terminal-window">
          <div className="terminal-titlebar">
            <div className="terminal-dot bg-red-500" />
            <div className="terminal-dot bg-yellow-500" />
            <div className="terminal-dot bg-green-500" />
            <span className="ml-2">metarole-ai — terminal — 120×40</span>
          </div>
          <div className="terminal-body font-mono text-xs space-y-1" style={{ minHeight: '320px' }}>
            {demoLines.slice(0, visibleLines).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={getColor(line.type)}
              >
                {line.type === 'cmd' && <span className="text-terminal-amber">$ </span>}
                {line.text}
              </motion.div>
            ))}
            {visibleLines < demoLines.length && <span className="cursor" />}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-terminal-border py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="font-mono text-terminal-muted text-xs">
          <span className="text-terminal-green">METAROLE_AI</span> v2.0.0 — Built with ⚡ by manikantbindass
        </div>
        <div className="font-mono text-terminal-muted text-xs">
          &gt; SESSION_ACTIVE | UPTIME: 99.9% | LATENCY: &lt;50ms
        </div>
        <div className="flex gap-4 text-xs text-terminal-muted font-mono">
          <a href="https://github.com/manikantbindass/MetaRole.ai" target="_blank" rel="noopener noreferrer" className="hover:text-terminal-green transition-colors">[GITHUB]</a>
          <a href="/docs" className="hover:text-terminal-green transition-colors">[DOCS]</a>
          <a href="/api" className="hover:text-terminal-green transition-colors">[API]</a>
        </div>
      </div>
    </footer>
  );
}

export default function HomePage() {
  const [booted, setBooted] = useState(false);
  const [skipBoot] = useState(false);

  if (!booted && !skipBoot) {
    return <BootScreen onComplete={() => setBooted(true)} />;
  }

  return (
    <AnimatePresence>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <DemoTerminalSection />
        <Footer />
      </motion.main>
    </AnimatePresence>
  );
}
