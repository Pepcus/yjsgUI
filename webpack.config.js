const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path');
const webpack = require('webpack');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

module.exports = {
  watch: true,
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
        target: 'http://localhost:8081',
      },
    },
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.css', '.scss'],
    alias: {
      actions: path.resolve(__dirname, 'src/actions'),
      apis: path.resolve(__dirname, 'src/apis'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      config: path.resolve(__dirname, 'src/config'),
      constants: path.resolve(__dirname, 'src/constants'),
      sagas: path.resolve(__dirname, 'src/sagas'),
      store: path.resolve(__dirname, 'src/store'),
      reducers: path.resolve(__dirname, 'src/reducers'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.json$/,
        exclude: /(node_modules)/,
        include: [resolveApp('./src')],
        use: [{
          loader: 'json-loader',
        }],
      },
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
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name(file) {
            if (process.env.NODE_ENV === 'development') {
              return '[path][name].[ext]';
            }

            return '[contenthash].[ext]';
          },
        },
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/images/LOGO.png',
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/assets',
        to: 'assets',
      },
    ]),
  ],
};
