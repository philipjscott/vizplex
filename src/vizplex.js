// CommonJS hack to make webpack just export the function instead of an object
// https://github.com/webpack/webpack/issues/3929

module.exports = require('./index').default
