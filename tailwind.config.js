/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        // In tailwind.config.js
        ".scrollbar-hide": {
          /* Firefox */
          "scrollbar-width": "none !important",
          /* Safari and Chrome */
          "&::-webkit-scrollbar": {
            display: "none !important",
          },
          /* IE and Edge */
          "-ms-overflow-style": "none !important",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
