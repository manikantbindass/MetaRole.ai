'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function TerminalWindow({ title, children, className = '' }: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`border border-terminal-green/40 bg-terminal-bg overflow-hidden ${className}`}
    >
      {/* Terminal Title Bar */}
      <div className="border-b border-terminal-green/30 bg-terminal-green/5 px-4 py-2 flex items-center gap-3">
        {/* Window controls - terminal style */}
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 border border-red-500/60 bg-red-500/20" />
          <div className="w-2.5 h-2.5 border border-terminal-amber/60 bg-terminal-amber/20" />
          <div className="w-2.5 h-2.5 border border-terminal-green/60 bg-terminal-green/20" />
        </div>
        <div className="text-terminal-green/70 text-xs font-mono tracking-wider flex-1">
          <span className="text-terminal-green/40">metarole@ai:</span>~/<span className="text-terminal-amber">{title}</span>
        </div>
        {/* Scanline effect indicator */}
        <div className="text-terminal-green/30 text-xs">[ACTIVE]</div>
      </div>
      
      {/* Content */}
      <div className="p-4 font-mono text-sm relative">
        {/* Subtle scanline overlay */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.03] z-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(51, 255, 0, 0.5) 2px, rgba(51, 255, 0, 0.5) 4px)',
            backgroundSize: '100% 4px'
          }}
        />
        <div className="relative z-0">
          {children}
        </div>
      </div>
    </motion.div>
  );
}
