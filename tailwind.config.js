/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: '#f96a0a', dark: '#e05a00', light: '#ff8a3d' },
        ink: {
          DEFAULT: '#070b0f',
          900: '#0b1517',
          800: '#12201f',
          700: '#1c2d30',
        },
        paper: '#f4f8f7',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-oswald)', 'Impact', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      boxShadow: {
        card: '0 2px 14px rgba(7, 11, 15, 0.08)',
        cardHover: '0 16px 36px rgba(7, 11, 15, 0.18)',
        glow: '0 8px 24px rgba(249, 106, 10, 0.35)',
      },
      keyframes: {
        heroIn: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        heroImg: {
          '0%': { opacity: '0', transform: 'translateX(60px) scale(1.04)' },
          '100%': { opacity: '1', transform: 'none' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.06)' },
        },
        toastIn: {
          '0%': { opacity: '0', transform: 'translate(-50%, 20px)' },
          '100%': { opacity: '1', transform: 'translate(-50%, 0)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)' },
          '60%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'hero-in': 'heroIn 0.9s cubic-bezier(0.22, 1, 0.36, 1) both',
        'hero-img': 'heroImg 1.3s cubic-bezier(0.22, 1, 0.36, 1) both',
        'ken-burns': 'kenBurns 18s ease-in-out infinite alternate',
        'toast-in': 'toastIn 0.35s cubic-bezier(0.22, 1, 0.36, 1) both',
        pop: 'pop 0.35s ease-out',
        'fade-in': 'fadeIn 0.25s ease-out both',
      },
    },
  },
  plugins: [],
};
