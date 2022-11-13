/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ["Lato", "sans-serif"],
        robotoSlab: ["Roboto Slab", "serif"],
      },
      borderRadius: {
        negative: "-8px",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit,minmax(250px,1fr))",
      },
      screens: {
        medium: "1000px",
      },
      colors: {
        primary: "#110835",
        primaryGradientOne: "#9f8ad0",
        primaryGradientTwo: "#fbc2eb",
        cardColor: "#f4c4f3",
      },
    },
  },
  plugins: [],
};
