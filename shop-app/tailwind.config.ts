import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-dm-sans)'],
      },
      colors: {
        cs: {
          white: '#ffffff',
          black: '#000000',
          lightgray: '#f6f6f6',
          darkgrey: '#7f7f7f',
          green:'#0ACF83',
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
