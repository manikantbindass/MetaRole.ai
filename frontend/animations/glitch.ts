/**
 * MetaRole AI - Glitch Effect Utilities
 * CSS-in-JS glitch animations for cyberpunk UI
 */

/**
 * Applies a glitch effect to a DOM element
 */
export function applyGlitch(element: HTMLElement, options: GlitchOptions = {}): () => void {
  const {
    intensity = 3,
    duration = 200,
    interval = 3000,
    colors = ['#33ff00', '#ffb000', '#00ffff'],
  } = options;

  let animationId: ReturnType<typeof setTimeout>;

  const glitch = () => {
    const originalTransform = element.style.transform;
    const frames = 6;
    let frame = 0;

    const animate = () => {
      if (frame >= frames) {
        element.style.transform = originalTransform;
        element.style.textShadow = '';
        element.style.clipPath = '';
        element.style.color = '';
        scheduleNext();
        return;
      }

      const x = (Math.random() - 0.5) * intensity;
      const y = (Math.random() - 0.5) * intensity * 0.5;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const clipY = Math.random() * 100;

      element.style.transform = `translate(${x}px, ${y}px)`;
      element.style.textShadow = `
        ${x * 2}px 0 ${color},
        ${-x * 2}px 0 #ff00ff
      `;
      element.style.clipPath = `inset(${clipY}% 0 ${Math.random() * 20}% 0)`;

      frame++;
      animationId = setTimeout(animate, duration / frames);
    };

    animate();
  };

  const scheduleNext = () => {
    animationId = setTimeout(glitch, interval + Math.random() * 2000);
  };

  scheduleNext();

  return () => clearTimeout(animationId);
}

/**
 * Generates CSS keyframes string for glitch animation
 */
export function glitchKeyframes(intensity = 4): string {
  return `
    @keyframes glitch {
      0%, 100% { 
        clip-path: inset(0 0 100% 0);
        transform: translate(0);
      }
      20% { 
        clip-path: inset(10% 0 60% 0);
        transform: translate(${-intensity}px, 0);
        text-shadow: ${intensity * 2}px 0 #33ff00, ${-intensity}px 0 #ff00ff;
      }
      40% { 
        clip-path: inset(50% 0 30% 0);
        transform: translate(${intensity}px, 0);
        text-shadow: ${-intensity * 2}px 0 #ffb000, ${intensity}px 0 #00ffff;
      }
      60% { 
        clip-path: inset(80% 0 5% 0);
        transform: translate(${-intensity / 2}px, 0);
      }
      80% { 
        clip-path: inset(30% 0 50% 0);
        transform: translate(${intensity / 2}px, 1px);
      }
    }
  `;
}

export interface GlitchOptions {
  intensity?: number;
  duration?: number;
  interval?: number;
  colors?: string[];
}
