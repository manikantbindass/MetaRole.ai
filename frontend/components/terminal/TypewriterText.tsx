'use client';

import { useEffect, useState } from 'react';
import { BlinkingCursor } from './BlinkingCursor';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  showCursor?: boolean;
  onComplete?: () => void;
  delay?: number;
}

export function TypewriterText({
  text,
  speed = 50,
  className = '',
  showCursor = true,
  onComplete,
  delay = 0,
}: TypewriterTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (delay > 0) {
      const delayTimer = setTimeout(() => setStarted(true), delay);
      return () => clearTimeout(delayTimer);
    }
    setStarted(true);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    
    let index = 0;
    setDisplayedText('');
    setIsComplete(false);

    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, started, onComplete]);

  return (
    <span className={`inline-flex items-center ${className}`}>
      <span>{displayedText}</span>
      {showCursor && !isComplete && <BlinkingCursor />}
    </span>
  );
}
