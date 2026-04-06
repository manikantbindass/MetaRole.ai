/**
 * Glitch effect animation for hover states
 * Applies a CSS class that triggers glitch keyframes
 */
export function attachGlitch(element: HTMLElement, intensity: 'low' | 'medium' | 'high' = 'medium') {
  const classMap = {
    low: 'glitch-low',
    medium: 'glitch',
    high: 'glitch-high',
  }
  const cls = classMap[intensity]

  element.addEventListener('mouseenter', () => element.classList.add(cls))
  element.addEventListener('mouseleave', () => element.classList.remove(cls))

  return () => {
    element.removeEventListener('mouseenter', () => element.classList.add(cls))
    element.removeEventListener('mouseleave', () => element.classList.remove(cls))
  }
}

/**
 * Random character scramble effect
 */
export function scrambleText(element: HTMLElement, finalText: string, duration = 800) {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  const steps = 12
  const stepDuration = duration / steps
  let step = 0

  const interval = setInterval(() => {
    const progress = step / steps
    const revealedLen = Math.floor(progress * finalText.length)

    let scrambled = finalText.slice(0, revealedLen)
    for (let i = revealedLen; i < finalText.length; i++) {
      scrambled += chars[Math.floor(Math.random() * chars.length)]
    }

    element.textContent = scrambled
    step++

    if (step > steps) {
      element.textContent = finalText
      clearInterval(interval)
    }
  }, stepDuration)

  return () => clearInterval(interval)
}
