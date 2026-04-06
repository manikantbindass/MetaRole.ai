/**
 * Scanline and CRT effects for MetaRole AI terminal UI
 */

/**
 * Creates a moving scanline element over the target
 */
export function createScanlineEffect(target: HTMLElement): () => void {
  const scanline = document.createElement('div');
  scanline.style.cssText = `
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(
      to bottom,
      transparent,
      rgba(51, 255, 0, 0.1),
      transparent
    );
    pointer-events: none;
    z-index: 10;
    animation: scanline-move 3s linear infinite;
  `;

  // Inject keyframe if not present
  if (!document.getElementById('scanline-style')) {
    const style = document.createElement('style');
    style.id = 'scanline-style';
    style.textContent = `
      @keyframes scanline-move {
        0% { top: 0; }
        100% { top: 100%; }
      }
    `;
    document.head.appendChild(style);
  }

  const prevPosition = target.style.position;
  target.style.position = 'relative';
  target.appendChild(scanline);

  return () => {
    scanline.remove();
    target.style.position = prevPosition;
  };
}

/**
 * Loading bar animation with terminal style
 */
export function terminalLoadingBar(
  container: HTMLElement,
  options: {
    duration?: number;
    label?: string;
    color?: string;
    onComplete?: () => void;
  } = {}
): () => void {
  const { duration = 2000, label = 'LOADING', color = '#33ff00', onComplete } = options;

  container.innerHTML = `
    <div style="font-family: 'JetBrains Mono', monospace; font-size: 12px; color: ${color};">
      <div style="margin-bottom: 8px; letter-spacing: 0.1em;">${label}...</div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <div style="flex: 1; height: 4px; background: #1e1e1e; overflow: hidden;">
          <div id="lb-fill" style="height: 100%; background: ${color}; width: 0%; transition: width ${duration}ms ease; box-shadow: 0 0 8px ${color}40;"></div>
        </div>
        <span id="lb-pct" style="min-width: 3ch;">0%</span>
      </div>
    </div>
  `;

  const fill = container.querySelector('#lb-fill') as HTMLElement;
  const pct = container.querySelector('#lb-pct') as HTMLElement;

  let startTime: number;
  let animFrame: number;

  const animate = (ts: number) => {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const progress = Math.min((elapsed / duration) * 100, 100);

    fill.style.width = `${progress}%`;
    pct.textContent = `${Math.floor(progress)}%`;

    if (progress < 100) {
      animFrame = requestAnimationFrame(animate);
    } else {
      onComplete?.();
    }
  };

  // Trigger CSS transition
  requestAnimationFrame(() => {
    fill.style.width = '100%';
    animFrame = requestAnimationFrame(animate);
  });

  return () => {
    cancelAnimationFrame(animFrame);
    container.innerHTML = '';
  };
}

/**
 * Boot sequence animation
 */
export async function bootSequence(
  container: HTMLElement,
  lines: string[],
  delayBetween = 150
): Promise<void> {
  container.innerHTML = '';

  for (const line of lines) {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        const el = document.createElement('div');
        el.style.cssText = 'font-family: monospace; font-size: 12px; color: #33ff00; margin: 2px 0;';
        el.textContent = line;
        container.appendChild(el);
        container.scrollTop = container.scrollHeight;
        resolve();
      }, delayBetween);
    });
  }
}
