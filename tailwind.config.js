import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme'

export const mode = 'jit'
export const enabled = process.env.NODE_ENV === 'production'
export const safeList = []
export const content = [
  './index.html',
  './src/**/*.{vue,js,ts}',
  // etc.
]
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter var', ..._fontFamily.sans],
    },
  },
}