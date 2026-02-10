import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        forge: {
          "primary": "#F97316",
          "primary-content": "#1C1917",
          "secondary": "#A8A29E",
          "secondary-content": "#1C1917",
          "accent": "#FBBF24",
          "accent-content": "#1C1917",
          "neutral": "#1C1917",
          "neutral-content": "#D6D3D1",
          "base-100": "#1C1917",
          "base-200": "#292524",
          "base-300": "#44403C",
          "base-content": "#F5F5F4",
          "info": "#38BDF8",
          "success": "#34D399",
          "warning": "#FBBF24",
          "error": "#F87171",
        },
      },
    ],
  },
};

export default config;
