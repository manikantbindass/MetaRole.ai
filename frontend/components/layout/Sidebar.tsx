'use client';

import { motion } from 'framer-motion';

interface SidebarProps {
  activePane: string;
  onPaneChange: (pane: string) => void;
}

const panes = [
  { id: 'overview', label: 'OVERVIEW', icon: '⬡' },
  { id: 'skills', label: 'SKILLS', icon: '🕸' },
  { id: 'career', label: 'CAREER', icon: '🎯' },
  { id: 'jobs', label: 'JOBS', icon: '💼' },
  { id: 'resume', label: 'RESUME', icon: '📄' },
  { id: 'portfolio', label: 'PORTFOLIO', icon: '🌐' },
];

export function Sidebar({ activePane, onPaneChange }: SidebarProps) {
  return (
    <aside className="w-48 border-r border-terminal-green/30 bg-terminal-bg flex-shrink-0 hidden lg:flex flex-col">
      {/* Header */}
      <div className="px-3 py-3 border-b border-terminal-green/20">
        <div className="text-terminal-green/40 text-xs font-mono">&gt; NAVIGATION</div>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-2">
        {panes.map((pane, i) => (
          <motion.button
            key={pane.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            onClick={() => onPaneChange(pane.id)}
            className={`w-full text-left px-3 py-2.5 text-xs font-mono tracking-wider transition-all flex items-center gap-2 ${
              activePane === pane.id
                ? 'bg-terminal-green/10 text-terminal-green border-r-2 border-terminal-green'
                : 'text-terminal-green/50 hover:text-terminal-green/80 hover:bg-terminal-green/5'
            }`}
          >
            <span className="text-sm">{pane.icon}</span>
            <span>{pane.label}</span>
            {activePane === pane.id && (
              <span className="ml-auto text-terminal-amber">←</span>
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-terminal-green/20">
        <div className="text-terminal-green/30 text-xs font-mono">
          <div>v2.4.1-stable</div>
          <div className="mt-0.5">© 2024 MetaRole.AI</div>
        </div>
      </div>
    </aside>
  );
}
