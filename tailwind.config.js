/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./lib/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        cream: "#F7F5F0",
        smoke: "#888888",
        brand: {
          orange: "#FF5A00",
          yellow: "#FFC800",
        },
        wa: "#25D366",
      },
      borderWidth: {
        3: "3px",
        5: "5px",
      },
      divideWidth: {
        3: "3px",
      },
      boxShadow: {
        "brut-xs": "2px 2px 0 0 #111111",
        "brut-sm": "3px 3px 0 0 #111111",
        brut: "4px 4px 0 0 #111111",
        "brut-md": "6px 6px 0 0 #111111",
        "brut-lg": "8px 8px 0 0 #111111",
        "brut-xl": "12px 12px 0 0 #111111",
      },
      fontFamily: {
        display: ["var(--font-display)", "Impact", "Haettenschweiler", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        marquee: "marquee 26s linear infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        wiggle: "wiggle 0.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
