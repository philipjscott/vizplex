// for now use glsl toy

import vert from './vert.glsl'
import frag from './frag.glsl'

var canvas = document.createElement('canvas')
document.body.appendChild(canvas)

var clear = require('gl-clear')({ color: [0, 1, 1, 1] })
var gl = require('gl-context')(canvas, render)
var glShader = require('gl-shader')
var fit = require('canvas-fit')
var now = require('right-now')
var draw = require('a-big-triangle')

console.log(vert, frag)

var shader = glShader(gl, vert, frag)

var time = now()

function animate () {
  time = now()
}
function render () {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  animate()
  clear(gl)
  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.iGlobalTime = time / 1000
  shader.attributes.position.pointer()
  draw(gl)
}

window.addEventListener('resize', fit(canvas), false)
