'use client';

import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypewriterText({
  text,
  speed = 40,
  delay = 0,
  className = '',
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.slice(0, i + 1));
        i++;
      } else {
        clearInterval(interval);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed, onComplete]);

  return (
    <span className={`font-mono ${className}`} aria-label={text}>
      {displayed}
      {displayed.length < text.length && (
        <span className="animate-blink text-terminal-green">_</span>
      )}
    </span>
  );
}
