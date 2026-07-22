/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B2C5F',
        saffron: '#F8B817',
        amber: '#FF7A00',
        porcelain: '#F7F5EF',
        mist: '#E8ECF1',
        midnight: '#07172F',
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['DM Serif Display', 'serif'],
      },
      boxShadow: {
        lift: '0 24px 65px -28px rgba(7, 23, 47, .34)',
      },
    },
  },
  plugins: [],
}
