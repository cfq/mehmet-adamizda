const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'none',
  entry: { main: './src/js/index.js' },
  output: {
    path: path.resolve(__dirname, 'static/js'),
    filename: 'main.js'
  },
  devServer: {
    static: path.join(__dirname, '/'),
    compress: true,
    port: 8080,
    devMiddleware: {
      writeToDisk: true
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /(.scss|.css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                outputStyle: 'compressed'
              }
            },
          },
        ],
	  }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '../css/styles.css'
    }),
  ]
};
