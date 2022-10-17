/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '500px',
      ...defaultTheme.screens,
    },
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        'auto-fill': 'repeat(auto-fill, minmax(150px, 1fr))',
        'auto-fill-sm': 'repeat(auto-fill, minmax(185px, 1fr))',
      },},
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
