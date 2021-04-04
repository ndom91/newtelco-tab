const purgeEnabled = process.env.NODE_ENV === 'production'

if (purgeEnabled) {
  console.log('\n')
  console.log(`   TailwindCSS \n`)
  console.log(`   ----------- \n`)
  console.log(`   ✅ purgeEnabled=${purgeEnabled}\n`)
}

module.exports = {
  purge: {
    enabled: purgeEnabled,
    content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.jsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      ring: ['hover'],
      ringColor: ['hover'],
      ringWidth: ['hover'],
      colors: {
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
  variants: {
    extend: {},
  },
  plugins: [],
}
