// Typing animation utility
export class TypingAnimation {
  private element: HTMLElement;
  private text: string;
  private speed: number;
  private onComplete?: () => void;

  constructor(
    element: HTMLElement,
    text: string,
    speed = 50,
    onComplete?: () => void
  ) {
    this.element = element;
    this.text = text;
    this.speed = speed;
    this.onComplete = onComplete;
  }

  async start(): Promise<void> {
    this.element.textContent = '';
    for (let i = 0; i < this.text.length; i++) {
      this.element.textContent += this.text[i];
      await this.delay(this.speed);
    }
    this.onComplete?.();
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// React hook for typing animation
export function useTypingEffect(
  texts: string[],
  speed = 60,
  deleteSpeed = 30,
  pause = 2000
) {
  return { texts, speed, deleteSpeed, pause };
}
