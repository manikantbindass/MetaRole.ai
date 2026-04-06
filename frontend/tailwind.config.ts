import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          surface: '#0f0f0f',
          border: '#1a1a1a',
          green: '#33ff00',
          amber: '#ffb000',
          dim: '#1a2a1a',
          muted: '#4a4a4a',
          text: '#cccccc',
          faint: '#555555',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 0.3s ease forwards',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
        'progress-bar': 'progressBar 2s ease-in-out forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typewriter: {
          from: { width: '0' },
          to: { width: '100%' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 1px)' },
          '40%': { transform: 'translate(3px, -1px)' },
          '60%': { transform: 'translate(-2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 5px #33ff0033' },
          '50%': { boxShadow: '0 0 20px #33ff0066, 0 0 40px #33ff0033' },
        },
        progressBar: {
          from: { width: '0%' },
          to: { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
