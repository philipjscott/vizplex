import vizplex from '../src/index'
import fit from 'canvas-fit'

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)
vizplex(canvas, [
  'n(x/32.0, y/32.0, t)',
  'r',
  'r'
])

window.addEventListener('click', fit(canvas), false)
