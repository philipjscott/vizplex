const webpack = require('webpack')
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
const path = require('path')
const env = require('yargs').argv.env

const libraryName = 'vizplex'

let plugins = []
let outputFile

if (env === 'build') {
  plugins.push(new UglifyJsPlugin({ minimize: true }))
  outputFile = libraryName + '.min.js'
} else {
  outputFile = libraryName + '.js'
}

module.exports = {
  entry: './src/index.js',
  output: {
    filename: outputFile,
    path: path.join(__dirname, './dist'),
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  devtool: 'inline-source-map',
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
  },
  plugins: plugins
}
