/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      aspectRatio: {
        "3/1": "3 / 1",
      },
    },
  },
  plugins: [],
};
