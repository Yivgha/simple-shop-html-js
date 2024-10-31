const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    main: './js/app.js',
    products: './js/product.js',
    cart: './js/cart.js',
    checkout: './js/order.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({
      template: './pages/index.html',
      filename: 'index.html',
      chunks: ['app', 'constants', 'utils'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/product.html',
      filename: 'product.html',
      chunks: ['product', 'constants', 'utils'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/cart.html',
      filename: 'cart.html',
      chunks: ['cart', 'constants', 'utils'],
    }),
    new HtmlWebpackPlugin({
      template: './pages/checkout.html',
      filename: 'checkout.html',
      chunks: ['order', 'constants', 'utils'],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
      },
    ],
  },
};

