precision mediump float;

uniform float iGlobalTime;
uniform vec3  iResolution;

#pragma glslify: noise = require("glsl-noise/simplex/3d")

void main() {
  float r = noise(vec3(gl_FragCoord.x * 0.005, 10.0 * noise(vec3(gl_FragCoord.xy * 0.005, iGlobalTime * 0.2)), 1.0));
  float g = sin(1.0 / noise(vec3(gl_FragCoord.xy * 0.005, iGlobalTime * 0.2)));
  gl_FragColor.rgb = vec3(g, 1.0, 0.0);
  gl_FragColor.a = 1.0;
}
