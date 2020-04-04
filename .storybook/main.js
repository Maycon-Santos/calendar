const path = require('path')

module.exports = {
  stories: ['../packages/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links'],
  webpackFinal: async config => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader')
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        }
      ],
    })

    config.module.rules = config.module.rules.filter(f => f.test.toString() !== '/\\.css$/')

    config.module.rules.push({
      test: /\.css$/,
      use: [
        {
          loader: require.resolve('style-loader')
        },
        {
          loader: require.resolve('css-loader'),
          options: {
            modules: true,
            modules: {
              localIdentName: "[name]__[local]___[hash:base64:5]",
            },	
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            plugins: [require('postcss-cssnext')]
          }
        },
      ]
    })

    config.resolve.extensions.push('.ts', '.tsx')
    return config
  },
}
