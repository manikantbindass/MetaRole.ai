'use client';

interface BlinkingCursorProps {
  color?: 'green' | 'amber' | 'white';
  size?: 'sm' | 'md' | 'lg';
}

export function BlinkingCursor({ color = 'green', size = 'md' }: BlinkingCursorProps) {
  const colorMap = {
    green: 'var(--terminal-green)',
    amber: 'var(--terminal-amber)',
    white: '#ffffff',
  };

  const sizeMap = {
    sm: { width: '7px', height: '1em' },
    md: { width: '10px', height: '1.2em' },
    lg: { width: '14px', height: '1.4em' },
  };

  return (
    <span
      className="inline-block animate-blink align-text-bottom ml-0.5"
      style={{
        background: colorMap[color],
        ...sizeMap[size],
      }}
      aria-hidden="true"
    />
  );
}
