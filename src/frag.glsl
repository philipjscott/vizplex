precision mediump float;

uniform float t;

#pragma glslify: n = require("glsl-noise/simplex/3d")

void main() {
  float r = %R_FN%;
  float g = %G_FN%;
  float b = %B_FN%;
  gl_FragColor = vec4(r, g, b, 1.0);
}
