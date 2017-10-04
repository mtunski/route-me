const webpack = require('webpack')
const { environment } = require('@rails/webpacker')

environment.plugins.set(
  'GlobalVariables',
  new webpack.DefinePlugin({
    API_HOST: JSON.stringify(process.env.API_HOST),
  })
)

module.exports = environment
