/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'brand-dark':         '#010816',
        'brand-green':        '#aaff00',
        'brand-accent':       '#6366f1',
        'brand-purple':       '#f3e8ff',
        'brand-cyan':         '#ecfeff',
        'brand-pink':         '#ffe4e6',
        'brand-blue':         '#f0f9ff',
        'brand-green-light':  '#f0fdf4',
        'brand-rose':         '#fff1f2',
        'brand-purple-light': '#f5f3ff',
        'brand-emerald':      '#f0fdf4',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      },
      animation: {
        'float':         'float 6s ease-in-out infinite',
        'float-delayed': 'float-delayed 8s ease-in-out infinite',
        'pulse-ring':    'pulse-ring 2s ease-out infinite',
        'shimmer':       'shimmer 2s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-18px)' },
        },
        'float-delayed': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-14px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-ring': {
          '0%':   { boxShadow: '0 0 0 0 rgba(170,255,0,0.4)' },
          '70%':  { boxShadow: '0 0 0 12px rgba(170,255,0,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(170,255,0,0)' },
        },
      },
      boxShadow: {
        'glow-green': '0 0 30px rgba(170,255,0,0.15)',
        'glow-violet': '0 0 30px rgba(99,102,241,0.15)',
      },
    },
  },
  plugins: [],
}