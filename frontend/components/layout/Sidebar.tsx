'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'DASHBOARD', icon: '📊' },
  { path: '/upload', label: 'UPLOAD_RESUME', icon: '📁' },
  { path: '/analyze', label: 'ANALYZE', icon: '🔍' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-48 border-r border-terminal-border bg-terminal-bg min-h-screen hidden lg:flex flex-col">
      <div className="p-3 border-b border-terminal-border">
        <div className="text-terminal-green text-xs font-bold glow-green">[SYSTEM_MENU]</div>
      </div>
      <nav className="flex-1 p-2">
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={`flex items-center gap-2 px-3 py-2 text-xs font-mono transition-colors block ${
              pathname === item.path
                ? 'text-terminal-green border-l-2 border-terminal-green bg-terminal-surface'
                : 'text-terminal-muted hover:text-terminal-green'
            }`}
          >
            <span>{item.icon}</span>
            <span>&gt; {item.label}</span>
          </Link>
        ))}
      </nav>
      <div className="p-3 border-t border-terminal-border">
        <div className="text-xs text-terminal-muted">
          <div><span className="text-terminal-green">●</span> ONLINE</div>
          <div className="mt-1 opacity-50">Session: Active</div>
        </div>
      </div>
    </aside>
  );
}
