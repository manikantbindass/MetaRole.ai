import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Cascadia Code', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1a1a1a',
          green: '#33ff00',
          'green-dim': '#1a7a00',
          amber: '#ffb000',
          'amber-dim': '#7a5500',
          red: '#ff3333',
          cyan: '#00ffff',
          white: '#e0e0e0',
          muted: '#666666',
          faint: '#333333',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 0.3s linear',
        'type-in': 'type-in 2s steps(40, end)',
        'pulse-green': 'pulse-green 2s ease-in-out infinite',
        'loading-bar': 'loading-bar 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(2px, -2px)' },
          '60%': { transform: 'translate(-1px, 1px)' },
          '80%': { transform: 'translate(1px, -1px)' },
        },
        'type-in': {
          from: { width: '0' },
          to: { width: '100%' },
        },
        'pulse-green': {
          '0%, 100%': { boxShadow: '0 0 5px #33ff00, 0 0 10px #33ff00' },
          '50%': { boxShadow: '0 0 20px #33ff00, 0 0 40px #33ff00' },
        },
        'loading-bar': {
          '0%': { width: '0%' },
          '50%': { width: '70%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 10px #33ff00, 0 0 20px #33ff0033',
        'glow-amber': '0 0 10px #ffb000, 0 0 20px #ffb00033',
        'terminal': '0 0 0 1px #1a1a1a, 0 8px 32px rgba(0,0,0,0.8)',
      },
    },
  },
  plugins: [],
}
export default config
