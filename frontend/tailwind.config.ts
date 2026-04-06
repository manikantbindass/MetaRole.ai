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
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          surface: '#111111',
          'surface-2': '#161616',
          green: '#33ff00',
          'green-dim': '#1a8c00',
          'green-glow': 'rgba(51,255,0,0.15)',
          amber: '#ffb000',
          'amber-dim': '#996800',
          red: '#ff3333',
          blue: '#00d4ff',
          muted: '#555555',
          text: '#cccccc',
          border: '#33ff00',
        },
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
      },
      boxShadow: {
        'terminal-glow': '0 0 20px rgba(51,255,0,0.15)',
        'terminal-amber': '0 0 20px rgba(255,176,0,0.2)',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typewriter: 'typewriter 2s steps(40) forwards',
        glitch: 'glitch 2s infinite',
        loading: 'loading 2s ease-out forwards',
        'fade-in': 'fadeInUp 0.6s ease forwards',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
