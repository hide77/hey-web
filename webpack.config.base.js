const HtmlWebpackPlugin = require("html-webpack-plugin");
var ManifestPlugin = require("webpack-manifest-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "dist"),
    filename: "bundle.js"
  },
  resolve: {
    modules: [path.resolve(__dirname, "./src"), "node_modules"],
    extensions: [".js", ".jsx", ".json"],
    alias: {
      "hey-config": path.resolve(__dirname, "./src/Config"),
      "hey-components": path.resolve(__dirname, "./src/Components"),
      "hey-mocks": path.resolve(__dirname, "./src/Mocks"),
      "hey-pages": path.resolve(__dirname, "./src/Pages"),
      "hey-services": path.resolve(__dirname, "./src/Services"),
      "hey-snd": path.resolve(__dirname, "./src/Assets/snd"),
      "hey-assets": path.resolve(__dirname, "./src/Assets"),
      "hey-icons": path.resolve(__dirname, "./src/Assets/icons"),
      "hey-actions": path.resolve(__dirname, "./src/Redux/actions"),
      "hey-reducers": path.resolve(__dirname, "./src/Redux/reducers"),
      "hey-types": path.resolve(__dirname, "./src/Redux/types"),
      "hey-layout": path.resolve(__dirname, "./src/Layout")
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: ["babel-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/images/[hash].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|otf|ttf)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/fonts/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.(mp3)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "assets/snd/[name].[ext]"
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html"
    }),
    new FaviconsWebpackPlugin({ logo: "./public/favicon.png", title: "Hey" }),
    new ManifestPlugin({
      fileName: "asset-manifest.json",
      publicPath: "/",
      basePath: "public/",
      writeToFileEmit: true,
      generate: (seed, files) => {
        const manifestFiles = files.reduce(function(manifest, file) {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);

        return {
          files: manifestFiles
        };
      }
    })
  ]
};
