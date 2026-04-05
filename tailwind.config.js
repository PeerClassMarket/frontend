/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#010816',
        'brand-green': '#aaff00',
        'brand-purple': '#f3e8ff',
        'brand-cyan': '#ecfeff',
        'brand-pink': '#ffe4e6',
        'brand-blue': '#f0f9ff',
        'brand-green-light': '#f0fdf4',
        'brand-rose': '#fff1f2',
        'brand-purple-light': '#f5f3ff',
        'brand-emerald': '#f0fdf4',
        'brand-accent': '#6366f1',
      },
      borderRadius: {
        '3xl': '2rem',
        '4xl': '2.5rem',
      }
    },
  },
  plugins: [],
}