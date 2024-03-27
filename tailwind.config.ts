/** @type {import('tailwindcss').Config} */
import { nextui } from "@nextui-org/react";
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      //Here I'm modifying the base black and white for UX purposes (pure black and pure white cause eye strain).
      //You can use the color palette that you want. Change the colors of the app here without having to go through every element or component :)
      colors: {
        black: "#111111",
        white: "#EFEFEF",
        primary: "#58A399",
        accent: "#A8CD9F",
        neutral: "#E2F4C5",
        background: "#496989"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}