import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'Courier New', 'monospace'],
        sans: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        terminal: {
          bg: '#0a0a0a',
          surface: '#111111',
          border: '#1a1a1a',
          green: '#33ff00',
          amber: '#ffb000',
          red: '#ff3333',
          blue: '#00aaff',
          muted: '#555555',
          text: '#cccccc',
        },
      },
      borderRadius: {
        none: '0px',
        sm: '0px',
        DEFAULT: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        full: '9999px',
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        typewriter: 'typewriter 3s steps(40) forwards',
        scanline: 'scanline 8s linear infinite',
        glitch: 'glitch 0.3s ease-in-out',
        'matrix-rain': 'matrixRain 20s linear infinite',
        'pulse-green': 'pulseGreen 2s ease-in-out infinite',
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
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(-3px, -3px)' },
          '60%': { transform: 'translate(3px, 3px)' },
          '80%': { transform: 'translate(3px, -3px)' },
          '100%': { transform: 'translate(0)' },
        },
        pulseGreen: {
          '0%, 100%': { boxShadow: '0 0 5px #33ff00, 0 0 10px #33ff00' },
          '50%': { boxShadow: '0 0 20px #33ff00, 0 0 40px #33ff00, 0 0 80px #33ff00' },
        },
      },
      backgroundImage: {
        'crt-grid': 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
        'terminal-gradient': 'linear-gradient(180deg, #0a0a0a 0%, #0d1a0d 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
