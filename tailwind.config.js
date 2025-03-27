
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  enabled: process.env.NODE_ENV === 'production',
  safeList: [],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts}',
    // etc.
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
}