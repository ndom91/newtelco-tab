/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  swcMinify: true,
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

module.exports = nextConfig
