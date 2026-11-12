/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Design tokens resolved from CSS variables (RGB triplets) set at runtime by
        // SettingsContext, so admin appearance changes propagate live. The
        // `rgb(var(--x-rgb) / <alpha-value>)` form enables Tailwind opacity
        // modifiers (e.g. bg-primary/10, border-line/50) to work correctly.
        bg: 'rgb(var(--bg-rgb) / <alpha-value>)',
        'bg-2': 'rgb(var(--bg-2-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        primary: 'rgb(var(--primary-rgb) / <alpha-value>)',
        secondary: 'rgb(var(--secondary-rgb) / <alpha-value>)',
        highlight: 'rgb(var(--highlight-rgb) / <alpha-value>)',
        text: 'rgb(var(--text-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        line: 'var(--border)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Poppins', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: 'var(--radius)',
      },
      boxShadow: {
        glow: '0 0 40px -12px var(--primary)',
        soft: '0 18px 40px -24px rgba(2, 6, 23, 0.7)',
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(to right, rgba(148,163,184,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(148,163,184,0.06) 1px, transparent 1px)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(16px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
