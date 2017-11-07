const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const CleanupPlugin = require("webpack-cleanup-plugin")

const { config, cssLoaders } = require("./base")

module.exports = webpackMerge(config, {
  entry: ["react-hot-loader/patch", "."],

  output: {
    publicPath: "http://localhost:3001/",
    filename: "javascripts/[name].js",
    chunkFilename: "javascripts/chunk-[name].js",
  },

  module: {
    loaders: [
      {
        test: [/\.css$/],
        use: ["style-loader", ...cssLoaders],
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      API_HOST: JSON.stringify("http://localhost:3000"),
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devtool: "eval-source-map",

  devServer: {
    host: "localhost",
    port: 3001,
    hot: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
})
