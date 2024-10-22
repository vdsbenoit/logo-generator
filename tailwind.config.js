/** @type {import('tailwindcss').Config} */
import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"

export default {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
  },
  plugins: [forms],
}
