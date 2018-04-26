const path = require('path'),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  WebpackNotifierPlugin = require('webpack-notifier');
var base={
  "index":"./index.js"
  // "css":"./index.css"
}  
module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery"
    }),
    new WebpackNotifierPlugin({
      title: "Webpack 编译成功",
      contentImage: path.resolve(process.cwd(), './images/avatar.jpeg'),
      alwaysNotify: true
    }),
    new ExtractTextPlugin({
      filename: "[name].css",
      disable: false,
      allChunks: true
  })
  ],
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        })
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|ttf|eot|svg|swf)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      },
      {
        test: /\.html/,
        use: {
          loader: "html-loader",
          options: {
            minimize: false,
            attrs: false
          }
        }
      }
    ]
  }
};