var vizplex = require('../../dist/vizplex.min')

var canvas = document.createElement('canvas')
canvas.height = 512
canvas.width = 512
document.body.appendChild(canvas)

vizplex(canvas, ['n(x/64,y/64,t)', 'r', 'r', '1'])
