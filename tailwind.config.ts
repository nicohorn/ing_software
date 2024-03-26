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
        primary: "#EE4266",
        accent: "#FFD23F",
        neutral: "#337357",
        background: "#5E1675"
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}