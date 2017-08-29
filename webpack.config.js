var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
}
