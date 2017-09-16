var path = require('path')

module.exports = {
  entry: {
    bundle: './docs/demo.js',
    vizplex: './src/vizplex.js',
    test: './test/test.js'
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, './docs')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './docs'
  },
  module: {
    rules: [
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'raw-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(glsl|frag|vert)$/,
        loader: 'glslify-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'buble-loader',
        include: path.join(__dirname, 'src'),
        query: {
          objectAssign: 'Object.assign'
        }
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/
      }
    ]
  }
}
