import tailwindcssAnimate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  content: [ "./src/**/*.{ts,tsx}" ],
  theme: { extend: {} },
  plugins: [tailwindcssAnimate],
}