/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      rotate: {
        '145': '145deg',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
