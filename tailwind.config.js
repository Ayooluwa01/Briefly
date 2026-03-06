// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Backgrounds
        "main-bg": "rgb(var(--color-background) / <alpha-value>)",
        "main-bg-secondary":
          "rgb(var(--color-background-secondary) / <alpha-value>)",
        "main-bg-tertiary":
          "rgb(var(--color-background-tertiary) / <alpha-value>)",

        // Text colors
        "main-text": "rgb(var(--color-text) / <alpha-value>)",
        "main-text-secondary":
          "rgb(var(--color-text-secondary) / <alpha-value>)",
        "main-text-tertiary": "rgb(var(--color-text-tertiary) / <alpha-value>)",

        // Tint/Primary
        "primary-tint": "rgb(var(--color-tint) / <alpha-value>)",
        "primary-tint-hover": "rgb(var(--color-tint-hover) / <alpha-value>)",

        // Icons
        "secondary-icon": "rgb(var(--color-icon) / <alpha-value>)",
        "secondary-icon-active":
          "rgb(var(--color-icon-active) / <alpha-value>)",

        // Borders
        "main-border": "rgb(var(--color-border) / <alpha-value>)",
        "main-border-focus": "rgb(var(--color-border-focus) / <alpha-value>)",

        // Cards
        "card-bg": "rgb(var(--color-card) / <alpha-value>)",
        "card-border": "rgb(var(--color-card-border) / <alpha-value>)",

        // Status colors
        success: "rgb(var(--color-success) / <alpha-value>)",
        warning: "rgb(var(--color-warning) / <alpha-value>)",
        error: "rgb(var(--color-error) / <alpha-value>)",
        info: "rgb(var(--color-info) / <alpha-value>)",
      },
      fontFamily: {
        inter: ["Inter_400Regular"],
        "inter-medium": ["Inter_500Medium"],
        "inter-semibold": ["Inter_600SemiBold"],
        "inter-bold": ["Inter_700Bold"],
        "inter-black": ["Inter_900Black"],
      },
    },
  },
  plugins: [],
};
