/**
 * Typewriter animation utility
 * Animates text character by character into a target element or callback.
 */

export interface TypewriterOptions {
  speed?: number; // ms per character
  delay?: number; // initial delay
  loop?: boolean;
  onChar?: (char: string, index: number, total: number) => void;
  onComplete?: () => void;
}

export function typewriter(
  text: string,
  setter: (val: string) => void,
  options: TypewriterOptions = {}
): () => void {
  const { speed = 60, delay = 0, loop = false, onChar, onComplete } = options;
  let i = 0;
  let active = true;

  const run = () => {
    const timer = setInterval(() => {
      if (!active) { clearInterval(timer); return; }
      if (i < text.length) {
        setter(text.slice(0, i + 1));
        onChar?.(text[i], i, text.length);
        i++;
      } else {
        clearInterval(timer);
        onComplete?.();
        if (loop) {
          setTimeout(() => {
            i = 0;
            setter('');
            run();
          }, 2000);
        }
      }
    }, speed);
    return () => clearInterval(timer);
  };

  const cancel = setTimeout(run, delay);
  return () => {
    active = false;
    clearTimeout(cancel);
  };
}

/**
 * Multi-line typewriter — types each line sequentially.
 */
export function multiLineTypewriter(
  lines: string[],
  setter: (lines: string[]) => void,
  options: TypewriterOptions = {}
): () => void {
  const { speed = 40, delay = 0 } = options;
  let lineIdx = 0;
  let charIdx = 0;
  let current: string[] = [];
  let active = true;

  const cancel = setTimeout(() => {
    const timer = setInterval(() => {
      if (!active || lineIdx >= lines.length) {
        clearInterval(timer);
        options.onComplete?.();
        return;
      }

      const line = lines[lineIdx];
      if (charIdx <= line.length) {
        current = [
          ...current.slice(0, lineIdx),
          line.slice(0, charIdx),
        ];
        setter([...current]);
        charIdx++;
      } else {
        lineIdx++;
        charIdx = 0;
      }
    }, speed);
    return () => clearInterval(timer);
  }, delay);

  return () => {
    active = false;
    clearTimeout(cancel);
  };
}
