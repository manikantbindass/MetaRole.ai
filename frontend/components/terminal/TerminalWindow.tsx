'use client';

import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'green' | 'amber';
}

export function TerminalWindow({ title = 'terminal', children, className = '', variant = 'default' }: TerminalWindowProps) {
  const borderColor = variant === 'green' ? 'var(--terminal-green)' : variant === 'amber' ? 'var(--terminal-amber)' : 'var(--terminal-border)';

  return (
    <div
      className={`terminal-window ${className}`}
      style={{ border: `1px solid ${borderColor}` }}
    >
      <div className="terminal-titlebar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-2 text-xs">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
