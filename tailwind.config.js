const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  theme: {
    extend: {
      ring: ['hover'],
      ringColor: ['hover'],
      ringWidth: ['hover'],
      gridAutoColumns: {
        '2fr': 'minmax(0, 2fr)',
      },
      colors: {
        neutral: colors.neutral,
        newtelco: {
          DEFAULT: '#67B246',
          50: '#ECF6E8',
          100: '#DDEFD5',
          200: '#BFE0B1',
          300: '#A1D28C',
          400: '#84C368',
          500: '#67B246',
          600: '#528D38',
          700: '#3D6929',
          800: '#27441B',
          900: '#12200C',
        },
      },
    },
  },
  plugins: [],
}
