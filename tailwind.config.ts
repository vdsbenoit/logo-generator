import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import forms from "@tailwindcss/forms"

export default <Partial<Config>>{
  plugins: [forms],
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
    },
  },
}
