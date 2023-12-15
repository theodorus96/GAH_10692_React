// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // ...
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'banner-bg': 'url("../public/assets/BannerBg.jpg")',
        'login-bg': 'url("../public/assets/bgl.jpg")'
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()]
}