const HtmlWebPackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  watch: true,
  mode: 'development',
  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'main.js',
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    proxy: {
      '/v1': {
        target: 'http://localhost:8080',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      theme: path.resolve(__dirname, 'src/themes/default.json')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/images/LOGO.png',
    }),
  ],
};
