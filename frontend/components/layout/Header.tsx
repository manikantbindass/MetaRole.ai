import Link from 'next/link';
import BlinkingCursor from '@/components/terminal/BlinkingCursor';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-terminal-border bg-terminal-bg/95 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-6" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 text-terminal-green font-mono text-sm hover:text-terminal-amber transition-colors">
          <span>▶ METAROLE</span>
          <BlinkingCursor />
        </Link>

        <div className="flex-1 hidden md:flex items-center gap-6">
          {[
            { href: '/#features', label: '[FEATURES]' },
            { href: '/#how-it-works', label: '[HOW_IT_WORKS]' },
            { href: '/#demo', label: '[DEMO]' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-terminal-dim font-mono text-xs hover:text-terminal-green transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/dashboard"
            className="text-terminal-dim font-mono text-xs hover:text-terminal-green transition-colors"
          >
            [DASHBOARD]
          </Link>
          <Link
            href="/upload"
            className="border border-terminal-green text-terminal-green font-mono text-xs px-4 py-2 hover:bg-terminal-green hover:text-terminal-bg transition-colors"
          >
            [ INITIATE ]
          </Link>
        </div>
      </nav>
    </header>
  );
}
