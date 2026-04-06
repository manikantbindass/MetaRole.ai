/**
 * Typing animation utility
 * Returns a cleanup function
 */
export function typewriter(
  target: HTMLElement,
  text: string,
  speed = 60,
  onComplete?: () => void
): () => void {
  let i = 0
  let cancelled = false

  function tick() {
    if (cancelled) return
    if (i <= text.length) {
      target.textContent = text.slice(0, i)
      i++
      setTimeout(tick, speed)
    } else {
      onComplete?.()
    }
  }

  tick()
  return () => { cancelled = true }
}

/**
 * Multi-phrase typewriter loop (React hook friendly)
 */
export function createTypingLoop(phrases: string[]) {
  let phraseIdx = 0
  let charIdx = 0
  let deleting = false
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  function start(setter: (val: string) => void) {
    function tick() {
      const phrase = phrases[phraseIdx]
      const speed = deleting ? 40 : 80

      if (!deleting && charIdx < phrase.length) {
        setter(phrase.slice(0, charIdx + 1))
        charIdx++
      } else if (deleting && charIdx > 0) {
        setter(phrase.slice(0, charIdx - 1))
        charIdx--
      } else if (!deleting) {
        timeoutId = setTimeout(() => {
          deleting = true
          tick()
        }, 1500)
        return
      } else {
        deleting = false
        phraseIdx = (phraseIdx + 1) % phrases.length
        charIdx = 0
      }

      timeoutId = setTimeout(tick, speed)
    }

    tick()
  }

  function stop() {
    if (timeoutId) clearTimeout(timeoutId)
  }

  return { start, stop }
}
