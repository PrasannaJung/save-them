/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        negative: "-8px",
      },
      gridTemplateColumns: {
        responsive: "repeat(auto-fit,minmax(250px,1fr))",
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
