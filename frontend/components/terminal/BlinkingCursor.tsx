interface BlinkingCursorProps {
  className?: string;
  char?: string;
}

export default function BlinkingCursor({
  className = '',
  char = '_',
}: BlinkingCursorProps) {
  return (
    <span
      className={`animate-blink text-terminal-green font-mono ${className}`}
      aria-hidden="true"
    >
      {char}
    </span>
  );
}
