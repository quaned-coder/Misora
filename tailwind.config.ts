import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        text: {
          normal: '#000000',
          prominent: '#f1f1f1',
        },
        mint: '#d5f8f3',
        purple: '#cb6ce6',
      },
    },
  },
  plugins: [],
}
export default config
