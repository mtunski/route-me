const path = require("path")
const webpack = require("webpack")
const ManifestPlugin = require("assets-webpack-plugin")
const CleanupPlugin = require("webpack-cleanup-plugin")

const postcssConfig = require("../postcss/config")
const cssModuleIdentifier = "[local]--[hash:base64:5]"

const rootPath = path.resolve(__dirname, "../..")

module.exports = {
  cssModuleIdentifier,

  cssLoaders: [
    {
      loader: "css-loader",
      query: {
        importLoaders: 1,
        modules: true,
        localIdentName: cssModuleIdentifier,
        sourceMap: true,
      },
    },
    {
      loader: "postcss-loader",
      options: { ...postcssConfig },
    },
  ],

  config: {
    context: path.resolve(rootPath, "app/frontend"),

    output: {
      path: path.resolve(rootPath, "public"),
    },

    module: {
      loaders: [
        {
          test: [/\.js$/],
          loader: "babel-loader",
          exclude: /node_modules/,
        },
      ],
    },

    resolve: {
      extensions: [".js"],
      modules: [
        "node_modules",
        path.resolve(rootPath, "app/frontend"),
        path.resolve(rootPath, "app/frontend/lib"),
      ],
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: module =>
        module.context && module.context.indexOf("node_modules") !== -1,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "webpack-runtime",
      }),
      new ManifestPlugin({
        path: path.resolve(rootPath, "public"),
        filename: "webpack-manifest.json",
        prettyPrint: true,
      }),
      new CleanupPlugin({
        exclude: ["webpack-manifest.json"],
      }),
    ],
  }
}
