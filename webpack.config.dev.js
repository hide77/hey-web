const baseConfig = require("./webpack.config.base");
const merge = require("webpack-merge");
const path = require("path");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

//Compressing the bundle before serving
module.exports = merge(baseConfig, {
  mode: "development",
  output: {
    path: path.join(__dirname, "dist.dev"),
    filename: "bundle.js"
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    compress: true,
    host: "127.0.0.1",
    open: true,
    port: process.env.PORT,
    publicPath: "/",
    historyApiFallback: true
  },
  devtool: "source-map",
  plugins: [
    new FaviconsWebpackPlugin({
      logo: "./public/favicon-dev.png",
      title: "Hey"
    })
  ]
});
