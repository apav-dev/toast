module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html", //optional if you want to add tailwind to your index.html page
    "node_modules/@yext/answers-react-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Sora"],
      },
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        primary: "#2563eb",
        "primary-light": "#dbeafe",
        "primary-dark": "#dbeafe",
        neutral: "#4b5563",
        "neutral-light": "#9ca3af",
        "neutral-dark": "#1f2937",
        "toast-light-orange": "#FFEEDB",
        "toast-orange": "#FFB563",
        "toast-dark-orange": "#F85E00",
        "toast-red": "#A41632",
        "toast-blue": "#17AABE",
        "toast-gray": "#c4c4c442",
      },
      borderRadius: {
        cta: "1rem",
      },
      transitionProperty: {
        "max-h": "max-height",
      },
      animation: {
        shaker: "shaker 0.4s infinite",
      },
      keyframes: {
        shaker: {
          "50%": {
            transform: "rotate(20deg)",
          },
          "100%": {
            transform: "rotate(-20deg)",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/line-clamp"),
  ],
};
