var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  }
}
