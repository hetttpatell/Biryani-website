/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000000",
        accent: "#facc15",
        text: "#ffffff",
        gold: {
          light: '#E8C36A',
          DEFAULT: '#D4A547',
          dark: '#B8862D',
        },
      },
      fontFamily: {
        header: ['"Cinzel Decorative"', 'serif'],
        body: ['"Cormorant Garamond"', 'serif'],
      }
    },
  },
  plugins: [],
}
