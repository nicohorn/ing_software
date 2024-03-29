/** @type {import('tailwindcss').Config} */
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
        primary: "#424242",
        accent: "#FFA500",
        neutral: "#9E9E9E",
        background: "#212121",
        error: "#FF5252",
        success: "#81C784",
        info: "#64B5F6",
      }
    },
  },
  plugins: [],
}