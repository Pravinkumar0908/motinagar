import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1d2925',
        leaf: '#245b45',
        sunrise: '#f4b942',
        cream: '#f7f5ed',
        terracotta: '#d96845',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'sans-serif'],
        hindi: ['var(--font-noto-devanagari)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
