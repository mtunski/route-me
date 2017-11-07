const nestedPlugin = require("postcss-nested")
const autoprefixerPlugin = require("autoprefixer")
const cssnanoPlugin = require("cssnano")

module.exports = {
  plugins: [
    nestedPlugin(),
    autoprefixerPlugin(),
    cssnanoPlugin({
      zindex: false,
      discardUnused: { fontFace: false },
      discardComments: { removeAll: true },
    }),
  ],
}
