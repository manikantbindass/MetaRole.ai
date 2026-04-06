'use client';

import { useState } from 'react';
import TerminalWindow from '@/components/terminal/TerminalWindow';
import TypewriterText from '@/components/terminal/TypewriterText';

const demoCommands = [
  { cmd: '$ metarole analyze --resume john_doe.pdf', output: '> PARSING... DONE\n> SKILLS DETECTED: 12\n> GAPS FOUND: 3\n> CAREER PATHS: 4 predicted' },
  { cmd: '$ metarole predict --role senior-engineer', output: '> PROBABILITY: 87%\n> TIMELINE: 8-12 months\n> KEY SKILLS NEEDED: k8s, system-design, graphql' },
  { cmd: '$ metarole generate resume --job JD-4521', output: '> TAILORING RESUME...\n> ATS SCORE: 94/100\n> EXPORT: resume_optimized.pdf ✓' },
];

export default function TerminalDemo() {
  const [activeCmd, setActiveCmd] = useState(0);

  return (
    <section className="py-20 px-6 border-t border-terminal-border" id="demo">
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-terminal-green font-mono text-xs mb-2">&gt; LOADING LIVE_DEMO.exe</p>
          <h2 className="text-terminal-green font-mono text-2xl">TERMINAL DEMO</h2>
          <div className="h-px bg-terminal-green/30 mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          {demoCommands.map((d, i) => (
            <button
              key={i}
              onClick={() => setActiveCmd(i)}
              className={`text-left border p-3 text-xs font-mono transition-colors ${
                activeCmd === i
                  ? 'border-terminal-green text-terminal-green bg-terminal-green/5'
                  : 'border-terminal-border text-terminal-dim hover:border-terminal-green/50'
              }`}
            >
              CMD {String(i + 1).padStart(2, '0')}
            </button>
          ))}
        </div>

        <TerminalWindow title="METAROLE_CLI.exe">
          <div className="space-y-2">
            <TypewriterText
              key={activeCmd}
              text={demoCommands[activeCmd].cmd}
              className="text-terminal-amber text-xs"
              speed={30}
            />
            <pre className="text-terminal-green text-xs whitespace-pre-line pt-2">
              {demoCommands[activeCmd].output}
            </pre>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );
}
