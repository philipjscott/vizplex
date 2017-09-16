import vizplex from '../src/index'
import fit from 'canvas-fit'

const defFns = [
  [
    '1',
    'sin(1/n(x/256,y/256,t))',
    'sin(1/n(x/256,y/256,t-100))',
    '1'
  ],
  [
    'sin(sin(x/y*t)*n(x/256,y/256,t))',
    'abs(n(x/512,y/512,t))',
    '1',
    '0.5'
  ],
  [
    '1',
    'n(x/256,y/256,n(x/256,y/256,t*0.1)*20)',
    'g',
    '0.2'
  ],
  [
    '1',
    '0.5',
    'sin(n(x/128+t,y/128,t)*t)',
    'abs(sin(x/128-t+y/128))'
  ],
]
const config = {
  timeFactor: 0.5
}
const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

vizplex(canvas, defFns[0], config)
for (let i = 0; i < defFns.length; i++) {
  $(`#noise${i}`).addEventListener('click', function () {
    vizplex(canvas, defFns[i], config)
  })
}
$('#gen-button').addEventListener('click', function () {
  var fns = [$('#r').value, $('#g').value, $('#b').value, $('#a').value]
  console.log(fns)
  vizplex(canvas, fns, config)
})


window.addEventListener('resize', fit(canvas), false)


function $ (selector) {
  return document.querySelector(selector)
}
