const { resolve } = require('path')
const merge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({ parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [new CaseSensitivePathsPlugin()],
  devtool: 'source-map',
})
