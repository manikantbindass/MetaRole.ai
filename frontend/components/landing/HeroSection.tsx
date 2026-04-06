'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// ASCII art logo for MetaRole
const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
`;

const TYPING_LINES = [
  'Analyzing career trajectory...',
  'Loading skill graph engine...',
  'Connecting to job intelligence network...',
  'Initializing AI co-pilot...',
  'System ready. Awaiting your resume.',
];

export default function HeroSection() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [logoVisible, setLogoVisible] = useState(false);

  // Blinking cursor
  useEffect(() => {
    const interval = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(interval);
  }, []);

  // Logo fade in
  useEffect(() => {
    const t = setTimeout(() => setLogoVisible(true), 300);
    return () => clearTimeout(t);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) return;
    const line = TYPING_LINES[currentLine];
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar(c => c + 1), 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayedLines(prev => [...prev, line]);
        setCurrentLine(l => l + 1);
        setCurrentChar(0);
      }, 400);
      return () => clearTimeout(t);
    }
  }, [currentLine, currentChar]);

  const activePartial = currentLine < TYPING_LINES.length
    ? TYPING_LINES[currentLine].slice(0, currentChar)
    : '';

  return (
    <section className="hero-section" aria-label="Hero">
      {/* CRT scanline overlay */}
      <div className="crt-overlay" aria-hidden="true" />

      {/* ASCII Logo */}
      <motion.pre
        className="ascii-logo"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: logoVisible ? 1 : 0, y: logoVisible ? 0 : -20 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        aria-label="MetaRole ASCII Logo"
      >
        {ASCII_LOGO}
      </motion.pre>

      {/* Tagline */}
      <motion.p
        className="hero-tagline"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <span className="prompt">&gt;&gt;&gt;</span> Your AI Career Co-Pilot
      </motion.p>

      {/* Terminal boot sequence */}
      <div className="terminal-boot" role="log" aria-live="polite">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">metarole-ai ~ boot</span>
        </div>
        <div className="terminal-body">
          {displayedLines.map((line, i) => (
            <div key={i} className="terminal-line done">
              <span className="prompt">$</span> {line} <span className="check">✓</span>
            </div>
          ))}
          {currentLine < TYPING_LINES.length && (
            <div className="terminal-line active">
              <span className="prompt">$</span> {activePartial}
              <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}>▋</span>
            </div>
          )}
          {currentLine >= TYPING_LINES.length && (
            <div className="terminal-line ready">
              <span className="prompt">$</span>{' '}
              <span className="neon-green">SYSTEM ONLINE</span> — Upload resume to begin.
              <span className={`cursor ${cursorVisible ? 'visible' : 'hidden'}`}>▋</span>
            </div>
          )}
        </div>
      </div>

      {/* CTA Button */}
      <motion.div
        className="hero-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        <a href="/upload" className="btn-initiate" aria-label="Initiate System">
          <span className="btn-bracket">[</span>
          <span className="btn-text"> INITIATE SYSTEM </span>
          <span className="btn-bracket">]</span>
        </a>
        <a href="/dashboard" className="btn-secondary-cta" aria-label="View Dashboard">
          <span className="btn-bracket">[</span>
          <span className="btn-text"> VIEW DASHBOARD </span>
          <span className="btn-bracket">]</span>
        </a>
      </motion.div>

      {/* Stats row */}
      <motion.div
        className="hero-stats"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        {[
          { label: 'RESUMES PARSED', value: '12,847' },
          { label: 'CAREERS PREDICTED', value: '9,203' },
          { label: 'JOBS MATCHED', value: '48,110' },
          { label: 'ACCURACY RATE', value: '94.7%' },
        ].map(stat => (
          <div key={stat.label} className="stat-item">
            <span className="stat-value">{stat.value}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
