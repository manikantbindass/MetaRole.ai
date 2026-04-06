import { ReactNode } from 'react';
import BlinkingCursor from './BlinkingCursor';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
  showControls?: boolean;
}

export default function TerminalWindow({
  title,
  children,
  className = '',
  showControls = true,
}: TerminalWindowProps) {
  return (
    <div
      className={`border border-terminal-border bg-terminal-surface flex flex-col ${
        className
      }`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 border-b border-terminal-border bg-terminal-surface-2">
        {showControls && (
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-amber/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-green/60" />
          </div>
        )}
        <span className="text-xs text-terminal-dim font-mono">{title}</span>
        <BlinkingCursor className="ml-auto" />
      </div>

      {/* Content */}
      <div className="flex-1 p-4 font-mono text-sm overflow-auto">{children}</div>
    </div>
  );
}
