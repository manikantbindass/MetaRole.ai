// frontend/components/TerminalLoader.tsx
'use client';

import { useEffect, useState } from 'react';

interface TerminalLoaderProps {
  title?: string;
  lines: string[];
  doneLabel?: string;
}

export function TerminalLoader({
  title = 'metarole-ai loader',
  lines,
  doneLabel,
}: TerminalLoaderProps) {
  const [index, setIndex] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    if (index >= lines.length) {
      setComplete(true);
      return;
    }
    const t = setTimeout(() => setIndex((i) => i + 1), 380);
    return () => clearTimeout(t);
  }, [index, lines.length]);

  const visible = lines.slice(0, index);

  return (
    <div className="terminal-pane">
      <div className="terminal-header px-4 py-2 flex items-center gap-2">
        <div className="w-2 h-2 bg-[#ff4444]" />
        <div className="w-2 h-2 bg-[#ffb000]" />
        <div className="w-2 h-2 bg-[#33ff00]" />
        <span className="ml-2 text-xs text-[#33ff00]/40 tracking-widest">
          {title}
        </span>
      </div>
      <div className="p-4 text-xs space-y-1 max-h-64 overflow-y-auto">
        {visible.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        {!complete && (
          <div>
            {'>'} executing
            <span className="terminal-cursor" />
          </div>
        )}
        {complete && doneLabel && (
          <div className="text-[#ffb000] mt-2">{doneLabel}</div>
        )}
      </div>
    </div>
  );
}
