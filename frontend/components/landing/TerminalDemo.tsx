'use client';
import { useState, useEffect, useRef } from 'react';

const DEMO_SEQUENCE = [
  { delay: 0,    text: '$ metarole init --user="john_doe"', type: 'cmd' },
  { delay: 800,  text: 'Connecting to MetaRole AI engine...', type: 'info' },
  { delay: 1400, text: '✓ Authentication successful', type: 'success' },
  { delay: 1900, text: '$ metarole parse --resume="resume.pdf"', type: 'cmd' },
  { delay: 2600, text: 'Parsing resume with GPT-4...', type: 'info' },
  { delay: 3200, text: '✓ Extracted 23 skills, 4 projects, 2 jobs', type: 'success' },
  { delay: 3700, text: '$ metarole analyze --gap-report', type: 'cmd' },
  { delay: 4400, text: 'Analyzing skill gaps against 50,482 job listings...', type: 'info' },
  { delay: 5200, text: '✓ Gap report: 7 high-priority skills identified', type: 'success' },
  { delay: 5700, text: '  → TypeScript   [CRITICAL] 89% of target roles require', type: 'gap' },
  { delay: 6000, text: '  → System Design [HIGH]    74% of senior roles require', type: 'gap' },
  { delay: 6300, text: '  → AWS/Cloud     [MEDIUM]  61% of target roles require', type: 'gap' },
  { delay: 6800, text: '$ metarole predict --top=3', type: 'cmd' },
  { delay: 7500, text: 'Running career prediction model...', type: 'info' },
  { delay: 8400, text: '✓ Predicted career paths:', type: 'success' },
  { delay: 8700, text: '  [1] Senior Full-Stack Engineer    92.4% match', type: 'result' },
  { delay: 9000, text: '  [2] Lead Backend Engineer         88.1% match', type: 'result' },
  { delay: 9300, text: '  [3] Software Architect            79.6% match', type: 'result' },
  { delay: 9800, text: '$ metarole generate --resume --for="Senior Full-Stack"', type: 'cmd' },
  { delay: 10600, text: 'Generating tailored resume...', type: 'info' },
  { delay: 11400, text: '✓ Resume generated: resume_tailored_swe.pdf', type: 'success' },
  { delay: 11900, text: '$ metarole match-jobs --role="Senior Full-Stack" --limit=10', type: 'cmd' },
  { delay: 12700, text: '✓ Found 47 matching roles. Top matches:', type: 'success' },
  { delay: 13000, text: '  → Google — Senior SWE (Mountain View)     96.2%', type: 'job' },
  { delay: 13300, text: '  → Stripe — Full-Stack Engineer (Remote)    94.8%', type: 'job' },
  { delay: 13600, text: '  → Vercel — Platform Engineer (Remote)      93.1%', type: 'job' },
  { delay: 14100, text: 'System ready. Dashboard updated.', type: 'info' },
];

const TYPE_COLORS: Record<string, string> = {
  cmd: 'text-neon-green',
  info: 'text-muted',
  success: 'text-success',
  gap: 'text-warning',
  result: 'text-secondary',
  job: 'text-primary',
};

export default function TerminalDemo() {
  const [visibleLines, setVisibleLines] = useState<typeof DEMO_SEQUENCE>([]);
  const [started, setStarted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!started) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    DEMO_SEQUENCE.forEach((line, i) => {
      const t = setTimeout(() => {
        setVisibleLines(prev => [...prev, line]);
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      }, line.delay);
      timers.push(t);
    });
    return () => timers.forEach(clearTimeout);
  }, [started]);

  return (
    <section id="demo" className="demo-section">
      <div className="section-header">
        <div className="section-label">
          <span className="prompt">//</span> DEMO
        </div>
        <h2 className="section-title">LIVE TERMINAL DEMO<span className="title-line" /></h2>
        <p className="section-sub">Watch MetaRole AI analyze a sample profile in real-time.</p>
      </div>

      <div className="demo-terminal">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">metarole-ai ~ live-demo</span>
          {!started && (
            <button className="demo-run-btn" onClick={() => setStarted(true)}>
              ▶ RUN DEMO
            </button>
          )}
          {started && visibleLines.length >= DEMO_SEQUENCE.length && (
            <button className="demo-run-btn" onClick={() => { setVisibleLines([]); setTimeout(() => setStarted(true), 100); }}>
              ↺ REPLAY
            </button>
          )}
        </div>
        <div className="terminal-body demo-body" ref={containerRef}>
          {!started && (
            <div className="demo-placeholder">
              <span className="prompt neon-green">$</span> Click <strong>▶ RUN DEMO</strong> to execute live simulation...
            </div>
          )}
          {visibleLines.map((line, i) => (
            <div key={i} className={`demo-line ${TYPE_COLORS[line.type] || ''}`}>
              {line.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
