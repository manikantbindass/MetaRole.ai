/**
 * Glitch text effect utility
 * Randomly replaces characters with ASCII art symbols for a glitch aesthetic.
 */

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

export interface GlitchOptions {
  duration?: number; // total duration in ms
  iterations?: number; // scramble iterations before resolving
  onUpdate?: (text: string) => void;
  onComplete?: (finalText: string) => void;
}

export function glitchText(
  originalText: string,
  setter: (val: string) => void,
  options: GlitchOptions = {}
): () => void {
  const { duration = 800, iterations = 8, onUpdate, onComplete } = options;
  let frame = 0;
  const totalFrames = iterations;
  const frameDelay = duration / totalFrames;
  let active = true;

  const timer = setInterval(() => {
    if (!active) { clearInterval(timer); return; }

    if (frame < totalFrames) {
      // Scramble
      const scrambled = originalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' ';
          // Gradually reveal from left to right
          if (i < (frame / totalFrames) * originalText.length) return char;
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join('');
      setter(scrambled);
      onUpdate?.(scrambled);
      frame++;
    } else {
      clearInterval(timer);
      setter(originalText);
      onComplete?.(originalText);
    }
  }, frameDelay);

  return () => {
    active = false;
    clearInterval(timer);
  };
}

/**
 * CSS glitch effect — adds/removes a glitch class on an element.
 */
export function triggerCSSGlitch(element: HTMLElement, duration = 400): void {
  element.classList.add('glitch-active');
  setTimeout(() => element.classList.remove('glitch-active'), duration);
}
