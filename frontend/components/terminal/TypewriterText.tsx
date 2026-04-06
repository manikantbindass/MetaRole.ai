'use client';
import { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function TypewriterText({
  text,
  speed = 40,
  onComplete,
  className = '',
  showCursor = true,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [cursorOn, setCursorOn] = useState(true);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed('');
    setDone(false);
    let i = 0;
    const t = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(t);
        setDone(true);
        onComplete?.();
      }
    }, speed);
    return () => clearInterval(t);
  }, [text, speed]);

  useEffect(() => {
    const t = setInterval(() => setCursorOn(v => !v), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <span className={className}>
      {displayed}
      {showCursor && <span className={`cursor ${cursorOn ? 'visible' : 'hidden'}`}>▋</span>}
    </span>
  );
}
