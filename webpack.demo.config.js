var path = require('path')

module.exports = {
  entry: './docs/demo.js',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, './docs'),
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'buble-loader',
        include: path.join(__dirname, 'src'),
        query: {
          objectAssign: 'Object.assign'
        }
      }
    ]
  }
}
