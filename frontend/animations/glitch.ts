// frontend/animations/glitch.ts
export function glitchText(text: string): string[] {
  if (!text) return [''];
  const variants: string[] = [];
  const chars = ['#', '@', '%', '░', '▓', '▚', '▞'];
  for (let i = 0; i < 4; i++) {
    const index = Math.floor(Math.random() * text.length);
    const mutated =
      text.slice(0, index) +
      chars[Math.floor(Math.random() * chars.length)] +
      text.slice(index + 1);
    variants.push(mutated);
  }
  variants.push(text);
  return variants;
}
