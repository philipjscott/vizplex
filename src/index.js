import vert from './vert.glsl'
import rawFrag from './frag.glsl'

import XRegExp from 'xregexp'
import glClear from 'gl-clear'
import glContext from 'gl-context'
import glShader from 'gl-shader'
import now from 'right-now'
import draw from 'a-big-triangle'

const clear = glClear({ color: [0, 1, 0, 1] })
const fragLookup = {
  "%R_FN%": 0,
  "%G_FN%": 1,
  "%B_FN%": 2
}
let gl
let shader
let tFactor
let time = now()

function animate () {
  time = now()
}
function render () {
  const width = gl.drawingBufferWidth
  const height = gl.drawingBufferHeight

  animate()
  clear(gl)
  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.t = tFactor * time
  shader.attributes.position.pointer()
  draw(gl)
}

export default function vizplex (target, rgb, factor) {
  const canvas = typeof target === "string"
    ? document.querySelector(target)
    : target
  let frag

  gl = glContext(canvas, render)
  tFactor = factor || 0.001

  // map the user input to glsl syntax and variables
  rgb = rgb.map(fn => fn.replace(/(x|y)/g, 'gl_FragCoord.$1')
                        .replace('n', '%NOISE%'))
  console.log(rawFrag)

  // do a funky regex that maps n() to snoise_1_3()
  frag = rawFrag.replace(/(%R_FN%|%G_FN%|%B_FN%)/g, substr => rgb[fragLookup[substr]])
                .replace(/%NOISE%/g, 'snoise_1_3')
  console.log(frag)

  shader = glShader(gl, vert, frag)
}
