const webpack = require("webpack")
const webpackMerge = require("webpack-merge")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const { config, cssLoaders } = require("./base")

const extractCSS = new ExtractTextPlugin({
  filename: "stylesheets/[name]-[contenthash].css",
  allChunks: true,
  ignoreOrder: true,
})

module.exports = webpackMerge(config, {
  entry: ".",

  output: {
    publicPath: "/",
    filename: "javascripts/[name]-[chunkhash].js",
    chunkFilename: "javascripts/chunk-[name]-[chunkhash].js",
  },

  module: {
    loaders: [
      {
        test: [/\.css$/],
        use: extractCSS.extract({ use: cssLoaders }),
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      compress: { warnings: false },
      output: { comments: false },
    }),
    extractCSS,
  ],
})
