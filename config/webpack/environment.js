const webpack = require('webpack')
const { environment } = require('@rails/webpacker')

environment.plugins.set(
  'GlobalVariables',
  new webpack.DefinePlugin({
    GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
  })
)

module.exports = environment
