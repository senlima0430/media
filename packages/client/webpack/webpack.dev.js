const { join } = require('path')
const merge = require('webpack-merge')
const { HotModuleReplacementPlugin } = require('webpack')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  watch: true,
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: join(__dirname, '..', 'dist'),
    historyApiFallback: true,
    publicPath: '/',
    host: '127.0.0.1',
    port: 8888,
    hot: true,
    open: true,
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  plugins: [new HotModuleReplacementPlugin()],
  devtool: 'cheap-eval-source-map',
  watchOptions: {
    ignored: /dist/,
  },
})
