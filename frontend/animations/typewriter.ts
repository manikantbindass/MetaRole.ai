// frontend/animations/typewriter.ts
export function typewriterFrames(text: string, step = 1): string[] {
  const frames: string[] = [];
  for (let i = 0; i <= text.length; i += step) {
    frames.push(text.slice(0, i));
  }
  return frames;
}
