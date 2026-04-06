'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const ASCII_LOGO = `
███╗   ███╗███████╗████████╗ █████╗ ██████╗  ██████╗ ██╗     ███████╗
████╗ ████║██╔════╝╚══██╔══╝██╔══██╗██╔══██╗██╔═══██╗██║     ██╔════╝
██╔████╔██║█████╗     ██║   ███████║██████╔╝██║   ██║██║     █████╗  
██║╚██╔╝██║██╔══╝     ██║   ██╔══██║██╔══██╗██║   ██║██║     ██╔══╝  
██║ ╚═╝ ██║███████╗   ██║   ██║  ██║██║  ██║╚██████╔╝███████╗███████╗
╚═╝     ╚═╝╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝
                        ██╗    ██████╗     ██╗
                        ██║   ██╔══██╗    ██╔╝
                        ██║   ███████║   ██╔╝ 
                        ██║   ██╔══██║  ██╔╝  
                        ██║   ██║  ██║ ██╔╝   
                        ╚═╝   ╚═╝  ╚═╝╚═╝    
`

const PHRASES = [
  'ANALYZING_RESUME...',
  'MAPPING_SKILL_GRAPH...',
  'PREDICTING_CAREER_PATH...',
  'GENERATING_PORTFOLIO...',
  'OPTIMIZING_RESUME...',
  'MATCHING_JOBS...',
]

export default function HeroSection() {
  const [displayText, setDisplayText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [booted, setBooted] = useState(false)
  const [bootLines, setBootLines] = useState<string[]>([])

  const BOOT_SEQUENCE = [
    '> METAROLE.AI SYSTEM BOOT v1.0.0',
    '> Initializing neural pathways...  [OK]',
    '> Loading career prediction engine... [OK]',
    '> Connecting to skill database...    [OK]',
    '> AI co-pilot online.                [READY]',
  ]

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < BOOT_SEQUENCE.length) {
        setBootLines((prev) => [...prev, BOOT_SEQUENCE[i]])
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setBooted(true), 600)
      }
    }, 350)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!booted) return
    const phrase = PHRASES[phraseIdx]
    const speed = deleting ? 40 : 80
    const timeout = setTimeout(() => {
      if (!deleting && charIdx < phrase.length) {
        setDisplayText(phrase.slice(0, charIdx + 1))
        setCharIdx((c) => c + 1)
      } else if (deleting && charIdx > 0) {
        setDisplayText(phrase.slice(0, charIdx - 1))
        setCharIdx((c) => c - 1)
      } else if (!deleting) {
        setTimeout(() => setDeleting(true), 1200)
      } else {
        setDeleting(false)
        setPhraseIdx((p) => (p + 1) % PHRASES.length)
        setCharIdx(0)
      }
    }, speed)
    return () => clearTimeout(timeout)
  }, [booted, charIdx, deleting, phraseIdx])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-14 px-4 overflow-hidden">
      {/* CRT scanlines */}
      <div className="pointer-events-none fixed inset-0 z-0 crt-overlay" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#33ff00 1px, transparent 1px), linear-gradient(90deg, #33ff00 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-6xl mx-auto text-center">
        {/* Boot sequence */}
        {!booted && (
          <div className="font-mono text-xs text-terminal-green/70 text-left max-w-xl mx-auto mb-8 space-y-1">
            {bootLines.map((line, i) => (
              <div key={i} className="flex gap-2">
                <span className="text-terminal-amber">{line.startsWith('>') ? '' : ''}</span>
                <span>{line}</span>
              </div>
            ))}
            {bootLines.length < BOOT_SEQUENCE.length && (
              <span className="text-terminal-green animate-pulse">█</span>
            )}
          </div>
        )}

        {booted && (
          <>
            {/* ASCII Logo */}
            <pre className="text-terminal-green text-[6px] sm:text-[7px] md:text-[9px] leading-tight mb-8 opacity-90 overflow-x-auto scrollbar-hide">
              {ASCII_LOGO}
            </pre>

            {/* Tagline */}
            <div className="font-mono text-terminal-amber/80 text-xs tracking-[0.4em] uppercase mb-6">
              YOUR AI CAREER CO-PILOT
            </div>

            {/* Typewriter */}
            <div className="font-mono text-terminal-green text-sm sm:text-base mb-2 h-6">
              <span className="text-terminal-green/50">$ </span>
              <span>{displayText}</span>
              <span className="text-terminal-green animate-blink">█</span>
            </div>

            {/* Subtitle */}
            <p className="font-mono text-terminal-green/50 text-xs sm:text-sm max-w-2xl mx-auto mt-4 mb-10 leading-relaxed">
              // Analyze skills → Predict career paths → Generate portfolio → Land the job
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/upload"
                className="border border-terminal-green text-terminal-green font-mono text-sm px-8 py-3 tracking-widest uppercase hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200 group relative overflow-hidden"
              >
                <span className="relative z-10">[ INITIATE SYSTEM ]</span>
                <div className="absolute inset-0 bg-terminal-green/10 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-200" />
              </Link>
              <Link
                href="/dashboard"
                className="border border-terminal-amber/50 text-terminal-amber/70 font-mono text-sm px-8 py-3 tracking-widest uppercase hover:border-terminal-amber hover:text-terminal-amber transition-all duration-200"
              >
                [ VIEW DEMO ]
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl mx-auto font-mono text-xs">
              {[
                { label: 'SKILLS_MAPPED', value: '2,400+' },
                { label: 'CAREERS_PREDICTED', value: '850+' },
                { label: 'ACCURACY_RATE', value: '94.7%' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-terminal-amber text-xl font-bold mb-1">{stat.value}</div>
                  <div className="text-terminal-green/40 text-[10px] tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
