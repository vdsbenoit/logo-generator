/** @type {import('tailwindcss').Config} */

import forms from "@tailwindcss/forms"

export default {
  plugins: [forms],
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
