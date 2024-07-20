/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        customYellow: '#fae193',
      },
    },
  },
  plugins: [],
}
