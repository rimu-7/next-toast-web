import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // These keys match the CSS variables defined in your Layout
        merriweather: ["var(--font-merriweather)", "serif"],
        lustria: ["var(--font-lustria)", "serif"],
        rubik: ["var(--font-rubik-iso)", "system-ui"],
      },
    },
  },
  plugins: [],
};

export default config;