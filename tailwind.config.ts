import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        richblack: '#001B18',
        darkgreen: '#022221',
        bangladeshgreen: '#02624C',
        mountainmeadow: '#2CC5A9',
        caribbeangreen: '#00DFB1',
        antiflashwhite: '#F1F7F5',
        pine: '#063B28',
        basil: '#084F3A',
        forest: '#095544',
        frog: '#178D79',
        mint: '#2FA68C',
        stone: '#707D7D',
        pistachio: '#ACD6C4',
      },
    },
  },
  plugins: [],
};
export default config;
