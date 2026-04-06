/**
 * MetaRole AI - Typewriter Animation Utilities
 * Terminal-style text animation functions
 */

export type TypewriterCallback = (text: string, done: boolean) => void;

export interface TypewriterOptions {
  speed?: number;       // ms per character
  delay?: number;       // initial delay in ms
  scramble?: boolean;   // matrix-style scramble effect
  onComplete?: () => void;
}

/**
 * Core typewriter function - types text character by character
 */
export function typewriter(
  text: string,
  callback: TypewriterCallback,
  options: TypewriterOptions = {}
): () => void {
  const { speed = 50, delay = 0, scramble = false, onComplete } = options;
  let index = 0;
  let timeoutId: ReturnType<typeof setTimeout>;

  const chars = '!<>-_\/[]{}—=+*^?#';
  const getScrambled = (target: string, progress: number) => {
    return target
      .split('')
      .map((char, i) => {
        if (i < progress) return char;
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
  };

  const type = () => {
    if (index <= text.length) {
      const displayed = scramble
        ? getScrambled(text, index)
        : text.slice(0, index);
      callback(displayed, index === text.length);
      index++;
      if (index <= text.length) {
        timeoutId = setTimeout(type, speed);
      } else {
        onComplete?.();
      }
    }
  };

  timeoutId = setTimeout(type, delay);
  return () => clearTimeout(timeoutId);
}

/**
 * Sequence multiple typewriter animations
 */
export async function typeSequence(
  lines: string[],
  callback: (lineIndex: number, text: string, done: boolean) => void,
  options: TypewriterOptions & { lineDelay?: number } = {}
): Promise<void> {
  const { lineDelay = 300, ...typeOpts } = options;
  
  for (let i = 0; i < lines.length; i++) {
    await new Promise<void>(resolve => {
      typewriter(lines[i], (text, done) => {
        callback(i, text, done);
        if (done) setTimeout(resolve, lineDelay);
      }, typeOpts);
    });
  }
}

/**
 * Creates a loading bar animation
 */
export function loadingBar(
  callback: (bar: string, percent: number) => void,
  options: { duration?: number; width?: number } = {}
): () => void {
  const { duration = 2000, width = 20 } = options;
  const interval = duration / width;
  let filled = 0;
  
  const timer = setInterval(() => {
    filled++;
    const bar = '█'.repeat(filled) + '░'.repeat(width - filled);
    callback(`[${bar}] ${Math.round((filled / width) * 100)}%`, (filled / width) * 100);
    if (filled >= width) clearInterval(timer);
  }, interval);

  return () => clearInterval(timer);
}
