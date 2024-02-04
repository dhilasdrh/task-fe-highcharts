/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        secondary: {
          DEFAULT: '#1479FF',
          200: '#14A5FF'
        },
        primary: {
          DEFAULT: '#193B68'
        },
        accent: {
          DEFAULT: '#1479FF1A'
        }

      },
    },
  },
  plugins: [],
}