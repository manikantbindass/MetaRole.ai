'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [time, setTime] = useState('')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour12: false }))
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 font-mono ${
        scrolled ? 'bg-terminal-bg/95 border-b border-terminal-green/30 backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-terminal-green text-xs opacity-60">[SYS]</span>
            <span className="text-terminal-green font-bold text-sm tracking-widest uppercase group-hover:text-terminal-amber transition-colors">
              MetaRole<span className="text-terminal-amber">.AI</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-xs">
            {['Features', 'How It Works', 'Dashboard'].map((item) => (
              <Link
                key={item}
                href={item === 'Dashboard' ? '/dashboard' : `#${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-terminal-green/60 hover:text-terminal-green transition-colors tracking-wider uppercase before:content-['./'] before:opacity-40"
              >
                {item}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:block text-terminal-green/40 font-mono">
              SYS_TIME: <span className="text-terminal-amber">{time}</span>
            </span>
            <Link
              href="/upload"
              className="border border-terminal-green text-terminal-green px-4 py-1.5 text-xs tracking-widest uppercase hover:bg-terminal-green hover:text-terminal-bg transition-all duration-200"
            >
              [ INITIATE ]
            </Link>
          </div>
        </div>
      </div>
      {/* CRT scanline stripe */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-terminal-green/20 to-transparent" />
    </nav>
  )
}
