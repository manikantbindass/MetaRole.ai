'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import TypewriterText from '@/components/terminal/TypewriterText';
import BlinkingCursor from '@/components/terminal/BlinkingCursor';

const ASCII_LOGO = `
 ███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
 ████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
 ██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
 ██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
 ██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
 ╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
                              [ A I   v 1 . 0 ]                         
`;

const bootSequence = [
  '> SYSTEM BOOT...',
  '> LOADING AI CORE... [████████████████████] 100%',
  '> CAREER CO-PILOT INITIALIZED.',
  '> SCANNING YOUR POTENTIAL...',
  '> READY. INITIATE YOUR FUTURE.',
];

export default function Hero() {
  const [bootLines, setBootLines] = useState<string[]>([]);
  const [bootDone, setBootDone] = useState(false);

  useEffect(() => {
    bootSequence.forEach((line, i) => {
      setTimeout(() => {
        setBootLines((prev) => [...prev, line]);
        if (i === bootSequence.length - 1) {
          setTimeout(() => setBootDone(true), 600);
        }
      }, i * 500);
    });
  }, []);

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 relative overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" aria-hidden="true" />

      {/* Boot sequence */}
      <div className="w-full max-w-4xl mb-8">
        <div className="border border-terminal-border bg-terminal-surface p-4">
          <div className="text-xs space-y-1">
            {bootLines.map((line, i) => (
              <div key={i} className="text-terminal-green font-mono">
                {line}
              </div>
            ))}
            {!bootDone && <BlinkingCursor />}
          </div>
        </div>
      </div>

      {/* ASCII Logo */}
      <pre
        className="text-terminal-green text-[0.4rem] sm:text-[0.5rem] md:text-xs leading-tight mb-6 overflow-x-auto"
        aria-label="MetaRole ASCII Logo"
      >
        {ASCII_LOGO}
      </pre>

      {/* Tagline */}
      <div className="text-center mb-10">
        <p className="text-terminal-amber font-mono text-sm md:text-base mb-2">
          &gt; YOUR AI CAREER CO-PILOT
        </p>
        <p className="text-terminal-dim font-mono text-xs">
          &quot;The system knows your potential before you do.&quot;
        </p>
      </div>

      {/* CTA */}
      {bootDone && (
        <Link
          href="/upload"
          className="border border-terminal-green text-terminal-green font-mono text-sm px-8 py-4 hover:bg-terminal-green hover:text-terminal-bg transition-colors duration-200 glitch-on-hover"
        >
          [ INITIATE SYSTEM ]
        </Link>
      )}

      {/* Scroll indicator */}
      <div className="absolute bottom-8 text-terminal-dim text-xs font-mono animate-bounce">
        SCROLL DOWN ↓
      </div>
    </section>
  );
}
