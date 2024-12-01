/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],     // Adding the custom font
      },
      colors: {
        'light-gray': '#F2F4F7',
      },
    },
  },
  plugins: [],
}