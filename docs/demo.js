import vizplex from '../src/index'
import fit from 'canvas-fit'

const eqs = [
  'n(x/256, n(x/256,y/256,t)*20, t)',
  'sin(1/n(x/256,y/256,t))',
  'r'
]
const canvas = document.createElement('canvas')
canvas.height = 1024
canvas.width = 1024

document.body.appendChild(canvas)
/*vizplex(canvas, eqs, {
  ccapConfig: {
    framerate: 30,
    format: 'webm',
    verbose: true,
    timeLimit: 20
  }
})*/
vizplex(canvas, eqs)
window.addEventListener('resize', fit(canvas), false)
