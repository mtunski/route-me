const webpack = require('webpack')
const { environment } = require('@rails/webpacker')

environment.plugins.set(
  'GlobalVariables',
  new webpack.DefinePlugin({
    API_HOST: JSON.stringify(process.env.API_HOST),
    GOOGLE_API_KEY: JSON.stringify(process.env.GOOGLE_API_KEY),
  })
)

module.exports = environment
