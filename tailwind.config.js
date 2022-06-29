const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "*/**/constants/*.{js,ts,jsx,tsx}",
    "*/**/hoc/**/*.{js,ts,jsx,tsx}",
    "*/**/components/**/*.{js,ts,jsx,tsx}",
    "*/**/pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      serif: ["PT Serif", "sans-serif"],
      mono: ["Inconsolata", "monospace"],
    },
    screens: {
      ...defaultTheme.screens,
      sm: "540px",
    },
    extend: {
      width: {
        128: "28rem",
        96: "26rem",
      },
    },
  },
  plugins: [],
};
