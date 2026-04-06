'use client';

import { motion } from 'framer-motion';

interface BlinkingCursorProps {
  className?: string;
  char?: string;
}

export function BlinkingCursor({ className = '', char = '█' }: BlinkingCursorProps) {
  return (
    <motion.span
      className={`inline-block text-terminal-green ml-0.5 ${className}`}
      animate={{ opacity: [1, 0, 1] }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: 'steps(1)',
      }}
      aria-hidden="true"
    >
      {char}
    </motion.span>
  );
}
