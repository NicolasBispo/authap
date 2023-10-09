/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage : {
        'lock-bg' : "url('./src/assets/images/lock-bg.jpg')",
        'index-bg' : "url('./src/assets/images/index-bg.svg')"
      },
      boxShadow: {
        'inner-eq': 'inset 0px 0px 30px 0px rgba(0,0,0,0.75)',
      }
    },
  },
  plugins: [],
}