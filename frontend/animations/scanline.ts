/**
 * MetaRole AI - CRT Scanline Effect
 * Creates a retro CRT monitor effect on canvas or DOM elements
 */

export interface ScanlineOptions {
  opacity?: number;
  lineHeight?: number;
  speed?: number;
  color?: string;
}

/**
 * Renders animated CRT scanline overlay on a canvas
 */
export function createScanlineOverlay(
  canvas: HTMLCanvasElement,
  options: ScanlineOptions = {}
): () => void {
  const {
    opacity = 0.04,
    lineHeight = 4,
    speed = 60,
    color = '51, 255, 0',
  } = options;

  const ctx = canvas.getContext('2d');
  if (!ctx) return () => {};

  let animFrameId: number;
  let offset = 0;

  const draw = () => {
    const { width, height } = canvas;
    ctx.clearRect(0, 0, width, height);

    // Moving scan line
    const gradient = ctx.createLinearGradient(0, offset, 0, offset + lineHeight * 3);
    gradient.addColorStop(0, `rgba(${color}, 0)`);
    gradient.addColorStop(0.5, `rgba(${color}, ${opacity * 8})`);
    gradient.addColorStop(1, `rgba(${color}, 0)`);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, offset, width, lineHeight * 3);

    // Static scanlines
    for (let y = 0; y < height; y += lineHeight) {
      ctx.fillStyle = `rgba(${color}, ${opacity})`;
      ctx.fillRect(0, y, width, 1);
    }

    // Vignette
    const vignette = ctx.createRadialGradient(
      width / 2, height / 2, height * 0.3,
      width / 2, height / 2, height * 0.8
    );
    vignette.addColorStop(0, 'transparent');
    vignette.addColorStop(1, `rgba(0, 0, 0, ${opacity * 3})`);
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, width, height);

    offset = (offset + speed / 60) % height;
    animFrameId = requestAnimationFrame(draw);
  };

  draw();
  return () => cancelAnimationFrame(animFrameId);
}

/**
 * CSS string for scanline effect (use as inline style or inject into <style>)
 */
export function scanlineCSS(options: ScanlineOptions = {}): string {
  const { opacity = 0.04, lineHeight = 4 } = options;
  return `
    position: relative;
    &::before {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 100;
      background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent ${lineHeight - 1}px,
        rgba(51, 255, 0, ${opacity}) ${lineHeight - 1}px,
        rgba(51, 255, 0, ${opacity}) ${lineHeight}px
      );
    }
  `;
}
