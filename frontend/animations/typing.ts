/**
 * Typing animation utilities for MetaRole AI terminal aesthetic
 */

export interface TypingOptions {
  speed?: number;       // ms per character
  deleteSpeed?: number; // ms per character when deleting
  pauseAfter?: number;  // ms to pause after finishing
  loop?: boolean;
  onUpdate?: (text: string) => void;
  onComplete?: () => void;
}

/**
 * Animates typing a string character by character.
 * Returns a cleanup function.
 */
export function animateTyping(
  lines: string[],
  options: TypingOptions = {}
): () => void {
  const {
    speed = 50,
    deleteSpeed = 30,
    pauseAfter = 1500,
    loop = true,
    onUpdate,
    onComplete,
  } = options;

  let lineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let timeout: ReturnType<typeof setTimeout>;
  let running = true;

  function tick() {
    if (!running) return;

    const currentLine = lines[lineIndex];

    if (!isDeleting) {
      charIndex++;
      const current = currentLine.slice(0, charIndex);
      onUpdate?.(current);

      if (charIndex === currentLine.length) {
        onComplete?.();
        if (loop) {
          timeout = setTimeout(() => { isDeleting = true; tick(); }, pauseAfter);
        }
        return;
      }
    } else {
      charIndex--;
      onUpdate?.(currentLine.slice(0, charIndex));
      if (charIndex === 0) {
        isDeleting = false;
        lineIndex = (lineIndex + 1) % lines.length;
      }
    }

    timeout = setTimeout(tick, isDeleting ? deleteSpeed : speed);
  }

  timeout = setTimeout(tick, speed);

  return () => {
    running = false;
    clearTimeout(timeout);
  };
}

/**
 * Simulates terminal command output line by line
 */
export async function terminalStream(
  lines: string[],
  onLine: (line: string, index: number) => void,
  delay = 120
): Promise<void> {
  for (let i = 0; i < lines.length; i++) {
    await new Promise<void>(resolve => setTimeout(() => {
      onLine(lines[i], i);
      resolve();
    }, delay * (i + 1)));
  }
}
