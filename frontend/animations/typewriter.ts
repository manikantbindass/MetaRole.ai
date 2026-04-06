/**
 * Typewriter animation utility for MetaRole AI terminal UI
 */

export interface TypewriterOptions {
  /** Characters per second */
  speed?: number;
  /** Delay before starting (ms) */
  delay?: number;
  /** Callback when complete */
  onComplete?: () => void;
  /** Whether to show cursor during typing */
  cursor?: boolean;
}

/**
 * Animates text character by character into a DOM element
 */
export function typewriter(
  element: HTMLElement,
  text: string,
  options: TypewriterOptions = {}
): () => void {
  const { speed = 40, delay = 0, onComplete, cursor = true } = options;
  const interval = 1000 / speed;
  let index = 0;
  let timer: ReturnType<typeof setTimeout>;
  let intervalId: ReturnType<typeof setInterval>;

  // Initial delay
  timer = setTimeout(() => {
    if (cursor) {
      element.innerHTML = '<span class="cursor"></span>';
    }

    intervalId = setInterval(() => {
      if (index < text.length) {
        const char = text[index];
        if (cursor) {
          element.innerHTML =
            text.slice(0, index + 1).replace(/</g, '&lt;').replace(/>/g, '&gt;') +
            '<span class="cursor"></span>';
        } else {
          element.textContent = text.slice(0, index + 1);
        }
        index++;
      } else {
        clearInterval(intervalId);
        if (!cursor) {
          element.textContent = text;
        } else {
          element.innerHTML =
            text.replace(/</g, '&lt;').replace(/>/g, '&gt;') +
            '<span class="cursor"></span>';
        }
        onComplete?.();
      }
    }, interval);
  }, delay);

  // Return cleanup function
  return () => {
    clearTimeout(timer);
    clearInterval(intervalId);
  };
}

/**
 * Multi-line typewriter — types lines sequentially
 */
export async function typewriterSequence(
  container: HTMLElement,
  lines: Array<{ text: string; className?: string; delay?: number }>,
  defaultSpeed = 40
): Promise<void> {
  for (const line of lines) {
    const el = document.createElement('div');
    if (line.className) el.className = line.className;
    container.appendChild(el);

    await new Promise<void>((resolve) => {
      typewriter(el, line.text, {
        speed: defaultSpeed,
        delay: line.delay ?? 0,
        onComplete: resolve,
        cursor: false,
      });
    });
  }
}

/**
 * React hook for typewriter animation
 */
export function useTypewriter(
  texts: string[],
  options: {
    speed?: number;
    deleteSpeed?: number;
    pauseTime?: number;
    loop?: boolean;
  } = {}
) {
  // This is a utility — use in React components with useState/useEffect
  return {
    texts,
    speed: options.speed ?? 60,
    deleteSpeed: options.deleteSpeed ?? 30,
    pauseTime: options.pauseTime ?? 2000,
    loop: options.loop ?? true,
  };
}
