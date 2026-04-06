'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-terminal-bg border-b border-terminal-green-dim">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
        {/* ASCII Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-terminal-green text-sm font-bold tracking-widest group-hover:text-glow transition-all">
            [METAROLE_AI]
          </span>
          <span className="cursor"></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {[
            { label: 'FEATURES', href: '/#features' },
            { label: 'HOW_IT_WORKS', href: '/#how' },
            { label: 'DEMO', href: '/#demo' },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-terminal-muted hover:text-terminal-green transition-colors tracking-widest uppercase"
            >
              &gt;_{item.label}
            </Link>
          ))}
          <Link
            href="/upload"
            className="terminal-btn text-xs"
          >
            <span>[ UPLOAD_RESUME ]</span>
          </Link>
          <Link
            href="/dashboard"
            className="terminal-btn terminal-btn-amber text-xs"
          >
            <span>[ DASHBOARD ]</span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-terminal-green text-xs"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? '[ CLOSE ]' : '[ MENU ]'}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-terminal-surface border-t border-terminal-green-dim px-4 py-4 flex flex-col gap-4">
          <Link href="/#features" className="text-xs text-terminal-green tracking-widest">&gt;_ FEATURES</Link>
          <Link href="/#how" className="text-xs text-terminal-green tracking-widest">&gt;_ HOW_IT_WORKS</Link>
          <Link href="/upload" className="terminal-btn text-xs"><span>[ UPLOAD_RESUME ]</span></Link>
          <Link href="/dashboard" className="terminal-btn terminal-btn-amber text-xs"><span>[ DASHBOARD ]</span></Link>
        </div>
      )}
    </nav>
  )
}
