const path = require('path')

/** @type {import("webpack").Configuration}  */
module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, './src/react/index.js'),
      'react-dom': path.resolve(__dirname, './src/react-dom/index.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
    ],
  },
}
