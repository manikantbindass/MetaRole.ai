// Glitch effect utility
export function applyGlitchEffect(
  element: HTMLElement,
  duration = 400
): void {
  element.style.animation = `glitch ${duration}ms ease-in-out`;
  setTimeout(() => {
    element.style.animation = '';
  }, duration);
}

// Random glitch on an interval
export function randomGlitch(
  element: HTMLElement,
  interval = 5000,
  duration = 300
): () => void {
  const timer = setInterval(() => {
    if (Math.random() > 0.7) {
      applyGlitchEffect(element, duration);
    }
  }, interval);
  return () => clearInterval(timer);
}
