/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ropa: ['Ropa Sans', 'sans-serif'], // Add Ropa Sans to the font family
      },
    },
  },
  plugins: [],
}
