'use client'
import { useState } from 'react'

const DEMO_OUTPUT = {
  analyze: `[ANALYSIS] Parsing resume... done
[SKILLS]   JavaScript: ████████░░ 82%
           Python:     ███████░░░ 70%
           React:      █████████░ 90%
           Node.js:    ████████░░ 80%
           SQL:        ██████░░░░ 60%
[STATUS]   Analysis complete. 23 skills extracted.`,
  predict: `[PREDICTION] Running career model...
[ROLE_01]  Full Stack Engineer      → 94% match  [$110K-$140K]
[ROLE_02]  Frontend Architect       → 88% match  [$130K-$160K]
[ROLE_03]  Tech Lead                → 72% match  [$150K-$180K]
[ROLE_04]  Solutions Architect      → 65% match  [$160K-$200K]
[STATUS]   Top career path: Full Stack Engineer`,
  gaps: `[GAP_ANALYSIS] Comparing with target role...
[MISSING]  System Design           priority: HIGH
           AWS / Cloud             priority: HIGH
           Docker / Kubernetes     priority: MEDIUM
           TypeScript (advanced)   priority: MEDIUM
           GraphQL                 priority: LOW
[ETA]      Estimated skill-up: 3-4 months`,
}

type DemoKey = keyof typeof DEMO_OUTPUT

export default function TerminalDemo() {
  const [active, setActive] = useState<DemoKey>('analyze')
  const [input, setInput] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (cmd === 'analyze' || cmd === 'predict' || cmd === 'gaps') setActive(cmd)
    setInput('')
  }

  return (
    <section id="demo" className="py-24 px-4 border-t border-terminal-green-dim">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <div className="text-terminal-amber text-xs tracking-[0.4em] uppercase mb-3">// LIVE_DEMO</div>
          <h2 className="text-terminal-green text-2xl md:text-3xl font-bold tracking-widest">TERMINAL_PREVIEW.exe</h2>
        </div>

        <div className="terminal-panel">
          <div className="terminal-panel-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-panel-title">metarole@ai ~ demo</span>
          </div>

          {/* Command tabs */}
          <div className="flex border-b border-terminal-green-dim">
            {(['analyze', 'predict', 'gaps'] as DemoKey[]).map((cmd) => (
              <button
                key={cmd}
                onClick={() => setActive(cmd)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-colors
                  ${active === cmd
                    ? 'bg-terminal-surface-2 text-terminal-green border-r border-terminal-green-dim'
                    : 'text-terminal-muted hover:text-terminal-green border-r border-terminal-green-dim'
                  }`}
              >
                &gt;_ {cmd}
              </button>
            ))}
          </div>

          {/* Output */}
          <div className="p-6 min-h-[200px]">
            <pre className="text-terminal-green text-xs leading-relaxed whitespace-pre-wrap">
              {DEMO_OUTPUT[active]}
            </pre>
          </div>

          {/* Input */}
          <div className="border-t border-terminal-green-dim p-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-terminal-amber text-xs">&gt;_</span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="type: analyze | predict | gaps"
                className="terminal-input flex-1 bg-transparent border-none text-xs p-0 outline-none"
              />
              <span className="cursor" />
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
