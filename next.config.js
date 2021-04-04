module.exports = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // future: { webpack5: true },
  webpack(config, { isServer, dev: isDevelopmentMode }) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          // https://react-svgr.com/docs/options/
        },
      ],
    })

    // Fixes npm packages that depend on `fs` module
    if (!isServer) {
      config.node = {
        fs: 'empty',
        child_process: 'empty',
        module: 'empty',
      }
    }

    return config
  },
  // future: {
  // 	webpack5: true,
  // }
}
