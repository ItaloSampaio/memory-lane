import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Open Sans"', defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        paper:
          '0px 4px 6px rgba(0, 0, 0, 0.1), 0px 1px 3px rgba(0, 0, 0, 0.06)',
        'right-md': '5px 0px 6px -1px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
}
