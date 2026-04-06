/**
 * Glitch effect animations for MetaRole AI
 */

export interface GlitchOptions {
  /** Duration of one glitch cycle (ms) */
  duration?: number;
  /** Number of glitch iterations */
  iterations?: number;
  /** Colors to use for glitch layers */
  colors?: [string, string];
}

/**
 * Applies CSS glitch animation to element
 */
export function applyGlitch(
  element: HTMLElement,
  options: GlitchOptions = {}
): () => void {
  const {
    duration = 300,
    iterations = Infinity,
    colors = ['#00ffff', '#ff3b3b'],
  } = options;

  element.setAttribute('data-text', element.textContent || '');
  element.classList.add('glitch');

  // Apply custom colors via CSS variables
  element.style.setProperty('--glitch-color-1', colors[0]);
  element.style.setProperty('--glitch-color-2', colors[1]);

  if (iterations !== Infinity) {
    const totalTime = duration * iterations;
    const timeout = setTimeout(() => {
      element.classList.remove('glitch');
    }, totalTime);

    return () => {
      clearTimeout(timeout);
      element.classList.remove('glitch');
    };
  }

  return () => {
    element.classList.remove('glitch');
  };
}

/**
 * Trigger a one-shot glitch on hover
 */
export function glitchOnHover(element: HTMLElement): () => void {
  let cleanup: (() => void) | null = null;

  const handleMouseEnter = () => {
    element.setAttribute('data-text', element.textContent || '');
    cleanup = applyGlitch(element, { duration: 300, iterations: 3 });
  };

  const handleMouseLeave = () => {
    cleanup?.();
    cleanup = null;
  };

  element.addEventListener('mouseenter', handleMouseEnter);
  element.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    element.removeEventListener('mouseenter', handleMouseEnter);
    element.removeEventListener('mouseleave', handleMouseLeave);
    cleanup?.();
  };
}

/**
 * Text scramble effect — randomly replaces characters before revealing
 */
export function scrambleText(
  element: HTMLElement,
  finalText: string,
  duration = 800
): Promise<void> {
  const chars = '!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const steps = 20;
  const stepTime = duration / steps;
  let frame = 0;

  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const progress = frame / steps;
      let output = '';

      for (let i = 0; i < finalText.length; i++) {
        if (finalText[i] === ' ') {
          output += ' ';
        } else if (i < Math.floor(progress * finalText.length)) {
          output += finalText[i];
        } else {
          output += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      element.textContent = output;
      frame++;

      if (frame > steps) {
        clearInterval(interval);
        element.textContent = finalText;
        resolve();
      }
    }, stepTime);
  });
}
