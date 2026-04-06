'use client';
import { useEffect, useState } from 'react';

interface LoadingBarProps {
  label?: string;
  duration?: number; // ms
  onComplete?: () => void;
}

export default function LoadingBar({ label = 'Processing', duration = 2000, onComplete }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const steps = 50;
    const interval = duration / steps;
    let step = 0;
    const t = setInterval(() => {
      step++;
      // Non-linear: fast start, slow middle, fast end
      const p = step / steps;
      const eased = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
      setProgress(Math.round(eased * 100));
      if (step >= steps) {
        clearInterval(t);
        onComplete?.();
      }
    }, interval);
    return () => clearInterval(t);
  }, [duration]);

  const filled = Math.round((progress / 100) * 30);
  const empty = 30 - filled;

  return (
    <div className="loading-bar-wrapper">
      <span className="loading-label">{label}</span>
      <span className="loading-track">
        [<span className="loading-fill">{'='.repeat(filled)}</span>
        <span className="loading-empty">{'.'.repeat(empty)}</span>]
      </span>
      <span className="loading-pct">{progress}%</span>
    </div>
  );
}
