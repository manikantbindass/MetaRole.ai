'use client';
import { ReactNode } from 'react';

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({ title = 'terminal', children, className = '' }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">metarole — {title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  );
}
