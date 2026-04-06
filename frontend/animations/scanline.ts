/**
 * CRT scanline and visual effect utilities.
 * These are applied via CSS classes; this module provides JS helpers
 * for dynamic control (enable/disable, intensity).
 */

export function enableScanlines(intensity: 'light' | 'medium' | 'heavy' = 'medium'): void {
  const root = document.documentElement;
  const opacityMap = { light: '0.04', medium: '0.08', heavy: '0.15' };
  root.style.setProperty('--scanline-opacity', opacityMap[intensity]);
  document.body.classList.add('scanlines-enabled');
}

export function disableScanlines(): void {
  document.body.classList.remove('scanlines-enabled');
}

/**
 * Creates a matrix rain effect on a canvas element.
 */
export function initMatrixRain(canvas: HTMLCanvasElement): () => void {
  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const cols = Math.floor(canvas.width / 16);
  const drops: number[] = Array(cols).fill(1);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+-=[]{}|;:,.<>?';

  let animFrame: number;

  function draw() {
    ctx!.fillStyle = 'rgba(10, 10, 10, 0.05)';
    ctx!.fillRect(0, 0, canvas.width, canvas.height);

    ctx!.fillStyle = '#33ff00';
    ctx!.font = '14px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const char = chars[Math.floor(Math.random() * chars.length)];
      ctx!.fillText(char, i * 16, drops[i] * 16);

      if (drops[i] * 16 > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }

    animFrame = requestAnimationFrame(draw);
  }

  draw();
  return () => cancelAnimationFrame(animFrame);
}
