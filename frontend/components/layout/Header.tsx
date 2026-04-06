'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BlinkingCursor } from '@/components/terminal/BlinkingCursor';
import { motion } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'HOME' },
  { href: '/upload', label: 'UPLOAD' },
  { href: '/analyze', label: 'ANALYZE' },
  { href: '/dashboard', label: 'DASHBOARD' },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-terminal-green/30 bg-terminal-bg/95 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="text-terminal-green font-mono font-bold text-sm tracking-widest">
            <span className="text-terminal-amber">&gt;</span> METAROLE
            <span className="text-terminal-amber">.AI</span>
          </div>
          <BlinkingCursor className="text-xs" />
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 text-xs font-mono tracking-widest transition-all border ${
                pathname === link.href
                  ? 'border-terminal-green bg-terminal-green/10 text-terminal-green'
                  : 'border-transparent text-terminal-green/60 hover:border-terminal-green/40 hover:text-terminal-green'
              }`}
            >
              [{link.label}]
            </Link>
          ))}
        </nav>

        {/* Status */}
        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-terminal-green/40">[SYS:</span>
          <motion.span
            className="text-terminal-green"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ONLINE
          </motion.span>
          <span className="text-terminal-green/40">]</span>
        </div>
      </div>
    </header>
  );
}
