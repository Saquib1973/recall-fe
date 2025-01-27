import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan0: '#E3FDFD',
        cyan1: '#CBF1F5',
        cyan2: '#A6E3E9',
        cyan3: '#71C9CE',
        offwhite: '#EEEEEE',
        white: '#FFFFFF',
        offblack: '#b9b9b9',
        black: '#222831',
      },
    },
  },
  plugins: [],
} satisfies Config
