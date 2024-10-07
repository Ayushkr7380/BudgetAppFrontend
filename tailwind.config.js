/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  class:"dark",
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
}

