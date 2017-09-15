import vizplex from '../src/index'
import fit from 'canvas-fit'

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)
vizplex(canvas, [
  'n(x/128, n(x/128,y/128,t)*10, t)',
  'r',
  'r'
], 0.00005)

window.addEventListener('click', fit(canvas), false)
