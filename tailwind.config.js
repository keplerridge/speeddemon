/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Add Vue-related file extensions
  ],
  theme: {
    extend: {
      colors: {
        speedDemon: {
          black: "#181818",
          darkBlue: "#1E293B",
          lightBlue: "#00A896",
          orange: "#F0A202",
          red: "#A31621",
        },
      },
    },
  },
  plugins: [],
};
