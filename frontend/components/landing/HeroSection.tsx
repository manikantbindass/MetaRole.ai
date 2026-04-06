'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

// ASCII art logo for MetaRole
const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
                              AI  v1.0.0-alpha
`

const TYPING_LINES = [
  '> Initializing MetaRole AI...',
  '> Loading career prediction engine...',
  '> Scanning skill database...',
  '> AI co-pilot ready.',
  '> YOUR CAREER TRAJECTORY BEGINS HERE.',
]

export default function HeroSection() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [showCTA, setShowCTA] = useState(false)

  useEffect(() => {
    if (currentLine >= TYPING_LINES.length) {
      setShowCTA(true)
      return
    }
    const line = TYPING_LINES[currentLine]
    if (currentChar < line.length) {
      const t = setTimeout(() => setCurrentChar((c) => c + 1), 35)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setDisplayedLines((prev) => [...prev, line])
        setCurrentLine((l) => l + 1)
        setCurrentChar(0)
      }, 300)
      return () => clearTimeout(t)
    }
  }, [currentLine, currentChar])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 grid-bg overflow-hidden">
      {/* Scan line animation */}
      <div
        className="pointer-events-none absolute inset-x-0 h-px bg-terminal-green opacity-10"
        style={{ animation: 'scan 8s linear infinite' }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
        {/* ASCII Logo */}
        <pre
          className="text-terminal-green text-glow hidden md:block text-[7px] lg:text-[9px] leading-tight font-mono mb-8 overflow-x-auto"
          aria-label="MetaRole AI ASCII logo"
        >
          {ASCII_LOGO}
        </pre>
        {/* Mobile fallback */}
        <div className="md:hidden text-terminal-green text-2xl font-bold tracking-widest mb-6 text-glow">
          [METAROLE_AI]
        </div>

        {/* Tagline */}
        <div className="text-terminal-amber text-xs md:text-sm tracking-[0.3em] uppercase mb-10">
          // Your AI Career Co-Pilot
        </div>

        {/* Terminal typing animation */}
        <div className="terminal-panel max-w-2xl mx-auto mb-10 text-left">
          <div className="terminal-panel-header">
            <span className="terminal-dot terminal-dot-red" />
            <span className="terminal-dot terminal-dot-yellow" />
            <span className="terminal-dot terminal-dot-green" />
            <span className="terminal-panel-title">metarole-ai ~ boot.sh</span>
          </div>
          <div className="p-4 min-h-[160px]">
            {displayedLines.map((line, i) => (
              <div key={i} className="text-xs text-terminal-green leading-6">
                {line}
              </div>
            ))}
            {currentLine < TYPING_LINES.length && (
              <div className="text-xs text-terminal-green leading-6">
                {TYPING_LINES[currentLine].slice(0, currentChar)}
                <span className="cursor" />
              </div>
            )}
          </div>
        </div>

        {/* CTA Buttons */}
        {showCTA && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link href="/upload" className="terminal-btn text-sm">
              <span>[ INITIATE_SYSTEM ]</span>
            </Link>
            <Link href="/dashboard" className="terminal-btn terminal-btn-amber text-sm">
              <span>[ VIEW_DASHBOARD ]</span>
            </Link>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mt-16 max-w-lg mx-auto">
          {[
            { val: '98%', label: 'ACCURACY' },
            { val: '50K+', label: 'CAREERS_MAPPED' },
            { val: '200+', label: 'SKILL_NODES' },
          ].map((s) => (
            <div key={s.label} className="border border-terminal-green-dim p-3 text-center">
              <div className="text-terminal-amber text-lg font-bold">{s.val}</div>
              <div className="text-terminal-muted text-xs tracking-widest mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
