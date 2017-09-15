import vizplex from '../src/index'
import fit from 'canvas-fit'

const eqs = [
  'sin(1/n(x/256,y/256,t*0.05))',
  'r',
  '1',
  '0.5'
]
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)
vizplex(canvas, eqs)

window.addEventListener('resize', fit(canvas), false)
