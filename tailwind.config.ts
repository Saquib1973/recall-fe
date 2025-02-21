import type { Config } from "tailwindcss";

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        quicksand: ['var(--font-quicksand)'],
        mali: ['var(--font-mali)'],
      },
      colors: {
        cyan0: '#E3FDFD',
        cyan1: '#CBF1F5',
        cyan2: '#A6E3E9',
        cyan3: '#71C9CE',
        offwhite: '#EEEEEE',
        white: '#FFFFFF',
        offblack: '#b9b9b9',
        black: '#222831',
        'white-1': '#f8f9fa',
        'white-1.5': '#EDF0F2',
        'white-2': '#E4E6E9',
        'white-3': '#B0BAC5',
        'red-1': '#DE3163',
        'red-2': '#E50046',
        'red-3': '#A31D1D',
        'black-1': '#1b1818',
        'black-2': '#2a2929',
        'black-3': '#4a4e57',
      },
    },
  },
  plugins: [],
} satisfies Config
