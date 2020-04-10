module.exports = (api) => {
  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: 3,
          targets: {
            browsers: 'Last 2 Chrome versions, Firefox ESR',
            node: 'current',
          },
        },
      ],
      [
        '@babel/preset-react',
        {
          development: process.env.BABEL_ENV !== 'build',
        },
      ],
      '@babel/preset-typescript',
    ],
    env: {
      build: {
        ignore: [
          '**/*.test.tsx',
          '**/*.test.ts',
          '**/*.story.tsx',
          '__snapshots__',
          '__tests__',
          '__stories__',
        ],
      },
    },
    ignore: ['node_modules'],
    plugins: [
      ['@babel/plugin-proposal-class-properties'],
      ["@babel/plugin-transform-modules-commonjs", {
        allowTopLevelThis: true
      }],
      [
        'css-modules-transform',
        {
          extractCss: {
            dir: "./lib/",
            relativeRoot: "./src/export/",
            filename: "[path]/[name].css"
          },
          generateScopedName: 'react-nice-calendar-[hash:base64:5]',
          prepend: [require('postcss-cssnext')]
        }
      ]
    ]
  }
}