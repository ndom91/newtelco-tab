/**
 * @type {import('next').NextConfig}
 */

const withPWA = require('next-pwa')

const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
  swcMinify: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/options/
        },
      ],
    })

    return config
  },
}

module.exports = withPWA(nextConfig)
