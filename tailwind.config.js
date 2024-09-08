/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        spotifyGreen: '#3ae176',
        bgDark: "#121212",
        textDark: "#b3b3b3",
        bgLight: "#f1f5f9",
        textLight: "#030712",
      },
    },
  },
  plugins: [],
};
