const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: [],
  theme: {
    extend: {
      minHeight: {
        0: "0",
        16: "4rem",
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
      },
      width: {
        one: "1px",
        two: "2px",
        360: "360px",
        500: "500px",
      },
      minWidth: {
        16: "4rem",
        600: "600px",
      },
      maxWidth: {
        16: "4rem",
        32: "32px",
        44: "44px",
        64: "64px",
        80: "80px",
        96: "96px",
      },
      borderRadius: {
        4: "4px",
        8: "8px",
        16: "16px",
        DEFAULT: "4px",
      },
      zIndex: {
        1000: 1000,
      },
    },
  },
  // TODO перенести скроллы и кастомные стили сюда
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        },
      });
    }),
  ],
};
