const path = require("path")
const importPlugin = require("postcss-import")
const variablesPlugin = require("postcss-css-variables")
const applyPlugin = require("postcss-apply")
const nestedPlugin = require("postcss-nested")
const colorPlugin = require("postcss-color-function")
const autoprefixerPlugin = require("autoprefixer")
const cssnanoPlugin = require("cssnano")

const rootPath = path.resolve(__dirname, "../..")
const stylesPath = path.resolve(rootPath, "app/frontend/assets/styles/")

module.exports = {
  plugins: [
    importPlugin({ path: [stylesPath] }),
    variablesPlugin(),
    applyPlugin(),
    nestedPlugin(),
    colorPlugin(),
    autoprefixerPlugin(),
    cssnanoPlugin({
      discardUnused: { fontFace: false },
      discardComments: { removeAll: true },
    }),
  ],
}
