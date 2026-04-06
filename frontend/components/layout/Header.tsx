'use client';

import Link from 'next/link';
import { useState } from 'react';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b border-terminal-border bg-terminal-bg sticky top-0 z-40">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-terminal-green font-bold text-sm glow-green tracking-widest">
            [METAROLE_AI]
          </span>
          <span className="text-terminal-muted text-xs hidden sm:block">v2.0.0</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono">
          <Link href="/" className="text-terminal-muted hover:text-terminal-green transition-colors">&gt; HOME</Link>
          <Link href="/dashboard" className="text-terminal-muted hover:text-terminal-green transition-colors">&gt; DASHBOARD</Link>
          <Link href="/upload" className="text-terminal-muted hover:text-terminal-green transition-colors">&gt; UPLOAD</Link>
          <Link href="/analyze" className="text-terminal-muted hover:text-terminal-green transition-colors">&gt; ANALYZE</Link>
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-2">
          <Link href="/upload">
            <button className="btn-terminal text-xs py-1.5 px-4">[ START ]</button>
          </Link>
          <button
            className="md:hidden text-terminal-muted text-xs px-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[X]' : '[☰]'}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-terminal-border px-4 py-3 flex flex-col gap-3 text-xs font-mono md:hidden">
          <Link href="/" className="text-terminal-muted hover:text-terminal-green">&gt; HOME</Link>
          <Link href="/dashboard" className="text-terminal-muted hover:text-terminal-green">&gt; DASHBOARD</Link>
          <Link href="/upload" className="text-terminal-muted hover:text-terminal-green">&gt; UPLOAD</Link>
          <Link href="/analyze" className="text-terminal-muted hover:text-terminal-green">&gt; ANALYZE</Link>
        </nav>
      )}
    </header>
  );
}
