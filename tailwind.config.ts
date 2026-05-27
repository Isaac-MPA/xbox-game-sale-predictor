import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        xbox: {
          green: '#107C10',
          darkgreen: '#0A4D00',
          lightgreen: '#2FD856',
          dark: '#1a1a1a',
          darker: '#0d0d0d',
          accent: '#00B4EF',
        },
      },
    },
  },
  plugins: [],
};

export default config;