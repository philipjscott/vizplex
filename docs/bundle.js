window["vizplex"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 62);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

function GLError (rawError, shortMessage, longMessage) {
    this.shortMessage = shortMessage || ''
    this.longMessage = longMessage || ''
    this.rawError = rawError || ''
    this.message =
      'gl-shader: ' + (shortMessage || rawError || '') +
      (longMessage ? '\n'+longMessage : '')
    this.stack = (new Error()).stack
}
GLError.prototype = new Error
GLError.prototype.name = 'GLError'
GLError.prototype.constructor = GLError
module.exports = GLError


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = makeReflectTypes

//Construct type info for reflection.
//
// This iterates over the flattened list of uniform type values and smashes them into a JSON object.
//
// The leaves of the resulting object are either indices or type strings representing primitive glslify types
function makeReflectTypes(uniforms, useIndex) {
  var obj = {}
  for(var i=0; i<uniforms.length; ++i) {
    var n = uniforms[i].name
    var parts = n.split(".")
    var o = obj
    for(var j=0; j<parts.length; ++j) {
      var x = parts[j].split("[")
      if(x.length > 1) {
        if(!(x[0] in o)) {
          o[x[0]] = []
        }
        o = o[x[0]]
        for(var k=1; k<x.length; ++k) {
          var y = parseInt(x[k])
          if(k<x.length-1 || j<parts.length-1) {
            if(!(y in o)) {
              if(k < x.length-1) {
                o[y] = []
              } else {
                o[y] = {}
              }
            }
            o = o[y]
          } else {
            if(useIndex) {
              o[y] = i
            } else {
              o[y] = uniforms[i].type
            }
          }
        }
      } else if(j < parts.length-1) {
        if(!(x[0] in o)) {
          o[x[0]] = {}
        }
        o = o[x[0]]
      } else {
        if(useIndex) {
          o[x[0]] = i
        } else {
          o[x[0]] = uniforms[i].type
        }
      }
    }
  }
  return obj
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = [
  // current
    'precision'
  , 'highp'
  , 'mediump'
  , 'lowp'
  , 'attribute'
  , 'const'
  , 'uniform'
  , 'varying'
  , 'break'
  , 'continue'
  , 'do'
  , 'for'
  , 'while'
  , 'if'
  , 'else'
  , 'in'
  , 'out'
  , 'inout'
  , 'float'
  , 'int'
  , 'void'
  , 'bool'
  , 'true'
  , 'false'
  , 'discard'
  , 'return'
  , 'mat2'
  , 'mat3'
  , 'mat4'
  , 'vec2'
  , 'vec3'
  , 'vec4'
  , 'ivec2'
  , 'ivec3'
  , 'ivec4'
  , 'bvec2'
  , 'bvec3'
  , 'bvec4'
  , 'sampler1D'
  , 'sampler2D'
  , 'sampler3D'
  , 'samplerCube'
  , 'sampler1DShadow'
  , 'sampler2DShadow'
  , 'struct'

  // future
  , 'asm'
  , 'class'
  , 'union'
  , 'enum'
  , 'typedef'
  , 'template'
  , 'this'
  , 'packed'
  , 'goto'
  , 'switch'
  , 'default'
  , 'inline'
  , 'noinline'
  , 'volatile'
  , 'public'
  , 'static'
  , 'extern'
  , 'external'
  , 'interface'
  , 'long'
  , 'short'
  , 'double'
  , 'half'
  , 'fixed'
  , 'unsigned'
  , 'input'
  , 'output'
  , 'hvec2'
  , 'hvec3'
  , 'hvec4'
  , 'dvec2'
  , 'dvec3'
  , 'dvec4'
  , 'fvec2'
  , 'fvec3'
  , 'fvec4'
  , 'sampler2DRect'
  , 'sampler3DRect'
  , 'sampler2DRectShadow'
  , 'sizeof'
  , 'cast'
  , 'namespace'
  , 'using'
]


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = [
  // Keep this list sorted
  'abs'
  , 'acos'
  , 'all'
  , 'any'
  , 'asin'
  , 'atan'
  , 'ceil'
  , 'clamp'
  , 'cos'
  , 'cross'
  , 'dFdx'
  , 'dFdy'
  , 'degrees'
  , 'distance'
  , 'dot'
  , 'equal'
  , 'exp'
  , 'exp2'
  , 'faceforward'
  , 'floor'
  , 'fract'
  , 'gl_BackColor'
  , 'gl_BackLightModelProduct'
  , 'gl_BackLightProduct'
  , 'gl_BackMaterial'
  , 'gl_BackSecondaryColor'
  , 'gl_ClipPlane'
  , 'gl_ClipVertex'
  , 'gl_Color'
  , 'gl_DepthRange'
  , 'gl_DepthRangeParameters'
  , 'gl_EyePlaneQ'
  , 'gl_EyePlaneR'
  , 'gl_EyePlaneS'
  , 'gl_EyePlaneT'
  , 'gl_Fog'
  , 'gl_FogCoord'
  , 'gl_FogFragCoord'
  , 'gl_FogParameters'
  , 'gl_FragColor'
  , 'gl_FragCoord'
  , 'gl_FragData'
  , 'gl_FragDepth'
  , 'gl_FragDepthEXT'
  , 'gl_FrontColor'
  , 'gl_FrontFacing'
  , 'gl_FrontLightModelProduct'
  , 'gl_FrontLightProduct'
  , 'gl_FrontMaterial'
  , 'gl_FrontSecondaryColor'
  , 'gl_LightModel'
  , 'gl_LightModelParameters'
  , 'gl_LightModelProducts'
  , 'gl_LightProducts'
  , 'gl_LightSource'
  , 'gl_LightSourceParameters'
  , 'gl_MaterialParameters'
  , 'gl_MaxClipPlanes'
  , 'gl_MaxCombinedTextureImageUnits'
  , 'gl_MaxDrawBuffers'
  , 'gl_MaxFragmentUniformComponents'
  , 'gl_MaxLights'
  , 'gl_MaxTextureCoords'
  , 'gl_MaxTextureImageUnits'
  , 'gl_MaxTextureUnits'
  , 'gl_MaxVaryingFloats'
  , 'gl_MaxVertexAttribs'
  , 'gl_MaxVertexTextureImageUnits'
  , 'gl_MaxVertexUniformComponents'
  , 'gl_ModelViewMatrix'
  , 'gl_ModelViewMatrixInverse'
  , 'gl_ModelViewMatrixInverseTranspose'
  , 'gl_ModelViewMatrixTranspose'
  , 'gl_ModelViewProjectionMatrix'
  , 'gl_ModelViewProjectionMatrixInverse'
  , 'gl_ModelViewProjectionMatrixInverseTranspose'
  , 'gl_ModelViewProjectionMatrixTranspose'
  , 'gl_MultiTexCoord0'
  , 'gl_MultiTexCoord1'
  , 'gl_MultiTexCoord2'
  , 'gl_MultiTexCoord3'
  , 'gl_MultiTexCoord4'
  , 'gl_MultiTexCoord5'
  , 'gl_MultiTexCoord6'
  , 'gl_MultiTexCoord7'
  , 'gl_Normal'
  , 'gl_NormalMatrix'
  , 'gl_NormalScale'
  , 'gl_ObjectPlaneQ'
  , 'gl_ObjectPlaneR'
  , 'gl_ObjectPlaneS'
  , 'gl_ObjectPlaneT'
  , 'gl_Point'
  , 'gl_PointCoord'
  , 'gl_PointParameters'
  , 'gl_PointSize'
  , 'gl_Position'
  , 'gl_ProjectionMatrix'
  , 'gl_ProjectionMatrixInverse'
  , 'gl_ProjectionMatrixInverseTranspose'
  , 'gl_ProjectionMatrixTranspose'
  , 'gl_SecondaryColor'
  , 'gl_TexCoord'
  , 'gl_TextureEnvColor'
  , 'gl_TextureMatrix'
  , 'gl_TextureMatrixInverse'
  , 'gl_TextureMatrixInverseTranspose'
  , 'gl_TextureMatrixTranspose'
  , 'gl_Vertex'
  , 'greaterThan'
  , 'greaterThanEqual'
  , 'inversesqrt'
  , 'length'
  , 'lessThan'
  , 'lessThanEqual'
  , 'log'
  , 'log2'
  , 'matrixCompMult'
  , 'max'
  , 'min'
  , 'mix'
  , 'mod'
  , 'normalize'
  , 'not'
  , 'notEqual'
  , 'pow'
  , 'radians'
  , 'reflect'
  , 'refract'
  , 'sign'
  , 'sin'
  , 'smoothstep'
  , 'sqrt'
  , 'step'
  , 'tan'
  , 'texture2D'
  , 'texture2DLod'
  , 'texture2DProj'
  , 'texture2DProjLod'
  , 'textureCube'
  , 'textureCubeLod'
  , 'texture2DLodEXT'
  , 'texture2DProjLodEXT'
  , 'textureCubeLodEXT'
  , 'texture2DGradEXT'
  , 'texture2DProjGradEXT'
  , 'textureCubeGradEXT'
]


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function doBind(gl, elements, attributes) {
  if(elements) {
    elements.bind()
  } else {
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }
  var nattribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)|0
  if(attributes) {
    if(attributes.length > nattribs) {
      throw new Error("gl-vao: Too many vertex attributes")
    }
    for(var i=0; i<attributes.length; ++i) {
      var attrib = attributes[i]
      if(attrib.buffer) {
        var buffer = attrib.buffer
        var size = attrib.size || 4
        var type = attrib.type || gl.FLOAT
        var normalized = !!attrib.normalized
        var stride = attrib.stride || 0
        var offset = attrib.offset || 0
        buffer.bind()
        gl.enableVertexAttribArray(i)
        gl.vertexAttribPointer(i, size, type, normalized, stride, offset)
      } else {
        if(typeof attrib === "number") {
          gl.vertexAttrib1f(i, attrib)
        } else if(attrib.length === 1) {
          gl.vertexAttrib1f(i, attrib[0])
        } else if(attrib.length === 2) {
          gl.vertexAttrib2f(i, attrib[0], attrib[1])
        } else if(attrib.length === 3) {
          gl.vertexAttrib3f(i, attrib[0], attrib[1], attrib[2])
        } else if(attrib.length === 4) {
          gl.vertexAttrib4f(i, attrib[0], attrib[1], attrib[2], attrib[3])
        } else {
          throw new Error("gl-vao: Invalid vertex attribute")
        }
        gl.disableVertexAttribArray(i)
      }
    }
    for(; i<nattribs; ++i) {
      gl.disableVertexAttribArray(i)
    }
  } else {
    gl.bindBuffer(gl.ARRAY_BUFFER, null)
    for(var i=0; i<nattribs; ++i) {
      gl.disableVertexAttribArray(i)
    }
  }
}

module.exports = doBind

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = vizplex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vert_glsl__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vert_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vert_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frag_glsl__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frag_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__frag_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eqParser__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_clear__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_clear___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_gl_clear__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_context__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_context___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_gl_context__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_shader__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_shader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_gl_shader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_reset__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_reset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_gl_reset__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_right_now__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_right_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_right_now__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_a_big_triangle__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_a_big_triangle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_a_big_triangle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ccapture_js__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ccapture_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_ccapture_js__);












var clear = __WEBPACK_IMPORTED_MODULE_3_gl_clear___default()({ color: [0, 1, 0, 1] })
var fragLookup = {
  "%R_FN%": 0,
  "%G_FN%": 1,
  "%B_FN%": 2,
  "%A_FN%": 3
}
var gl
var shader
var tFactor
var canvas
var capturer
var reset
var time = __WEBPACK_IMPORTED_MODULE_7_right_now___default()() / 1000

function animate () {
  time = __WEBPACK_IMPORTED_MODULE_7_right_now___default()() / 1000
}
function render () {
  var width = gl.drawingBufferWidth
  var height = gl.drawingBufferHeight

  animate()
  clear(gl)
  gl.viewport(0, 0, width, height)

  shader.bind()
  shader.uniforms.t = tFactor * time
  shader.attributes.position.pointer()
  __WEBPACK_IMPORTED_MODULE_8_a_big_triangle___default()(gl)
  
  if (capturer) {
    capturer.capture(canvas)
  }
}

function vizplex (target, rgba, options) {
  options = options || {}
  capturer = options.ccapConfig ? new __WEBPACK_IMPORTED_MODULE_9_ccapture_js___default.a(options.ccapConfig) : null
  tFactor = options.timeFactor || 1
  canvas = typeof target === "string"
    ? document.querySelector(target)
    : target
  var frag

  if (capturer) {
    capturer.start()
  }
  if (gl) {
    reset()
  }

  gl = __WEBPACK_IMPORTED_MODULE_4_gl_context___default()(canvas, render)
  reset = __WEBPACK_IMPORTED_MODULE_6_gl_reset___default()(gl)
  rgba = rgba.map(function (fnStr) { return Object(__WEBPACK_IMPORTED_MODULE_2__eqParser__["a" /* default */])(fnStr); })
  frag = __WEBPACK_IMPORTED_MODULE_1__frag_glsl___default.a.replace(/(%R_FN%|%G_FN%|%B_FN%|%A_FN%)/g, function (substr) { return rgba[fragLookup[substr]]; })
                .replace(/%NOISE%/g, 'snoise_1_3')
  shader = __WEBPACK_IMPORTED_MODULE_5_gl_shader___default()(gl, __WEBPACK_IMPORTED_MODULE_0__vert_glsl___default.a, frag)
}


/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = "#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n}\n"

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform float t;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nvoid main() {\n  float r = %R_FN%;\n  float g = %G_FN%;\n  float b = %B_FN%;\n  float a = %A_FN%;\n  gl_FragColor = vec4(r, g, b, a);\n}\n"

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = eqParser;
function eqParser (eq) {
  var noiseRegex = /([^i]|^)n/g
  var argsRegex = /(x|y)/g
  var floatRegex = /([^c]|^)([-]?\d+(\.\d+)?)/g
  var matches = []
  var match

  while ((match = noiseRegex.exec(eq)) !== null) {
    matches.push(match.index)
  }
  matches.forEach(function (elem) {
    var p = -1
    // index is position prior to n, so we need to skip 3 to get to content
    for (var i = elem + 3; i < eq.length; i++) {
      if (eq[i] === ')') {
        p++
        if (p === 0) {
          eq = eq.slice(0, i) + ')' + eq.slice(i)
        }
      }
      else if (eq[i] === '(') {
        p--
      }
    }
  })
  return eq.replace(noiseRegex, '$1%NOISE%(vec3')
           .replace(argsRegex, 'gl_FragCoord.$1')
           .replace(floatRegex, function (match, pre, num) {
             num = Number(num)
             return (num % 1 === 0) ? ("" + pre + num + ".0") : ("" + pre + num)
           })
}


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var defaults = __webpack_require__(11)

module.exports = clear

function clear(opts) {
  opts = opts || {}

  var color = defaults.color(opts.color)
  Object.defineProperty(clear, 'color', {
    get: function() { return color },
    set: function(value) {
      return color = defaults.color(value)
    }
  })

  var depth = defaults.depth(opts.depth)
  Object.defineProperty(clear, 'depth', {
    get: function() { return depth },
    set: function(value) {
      return depth = defaults.depth(value)
    }
  })

  var stencil = defaults.stencil(opts.stencil)
  Object.defineProperty(clear, 'stencil', {
    get: function() { return stencil },
    set: function(value) {
      return stencil = defaults.stencil(value)
    }
  })

  return clear

  function clear(gl) {
    var flags = 0

    if (color !== false) {
      gl.clearColor(color[0], color[1], color[2], color[3])
      flags |= gl.COLOR_BUFFER_BIT
    }
    if (depth !== false) {
      gl.clearDepth(depth)
      flags |= gl.DEPTH_BUFFER_BIT
    }
    if (stencil !== false) {
      gl.clearStencil(stencil)
      flags |= gl.STENCIL_BUFFER_BIT
    }

    gl.clear(flags)

    return gl
  }
}


/***/ }),
/* 11 */
/***/ (function(module, exports) {

exports.color = function(color) {
  return array(color, [0, 0, 0, 1])
}

exports.depth = function(depth) {
  return number(depth, 1)
}

exports.stencil = function(stencil) {
  return number(stencil, false)
}

function number(n, def) {
  if (n === false) return false
  if (typeof n === 'undefined') return def
  return n + 0
}

function array(a, def) {
  if (a === false) return false
  if (Array.isArray(a)) return a || def
  return def
}


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var raf = __webpack_require__(13)

module.exports = createContext

function createContext(canvas, opts, render) {
  if (typeof opts === 'function') {
    render = opts
    opts = {}
  } else {
    opts = opts || {}
  }

  var gl = (
    canvas.getContext('webgl', opts) ||
    canvas.getContext('webgl-experimental', opts) ||
    canvas.getContext('experimental-webgl', opts)
  )

  if (!gl) {
    throw new Error('Unable to initialize WebGL')
  }

  if (render) raf(tick)

  return gl

  function tick() {
    render(gl)
    raf(tick)
  }
}


/***/ }),
/* 13 */
/***/ (function(module, exports) {

/**
 * Expose `requestAnimationFrame()`.
 */

exports = module.exports = window.requestAnimationFrame
  || window.webkitRequestAnimationFrame
  || window.mozRequestAnimationFrame
  || window.oRequestAnimationFrame
  || window.msRequestAnimationFrame
  || fallback;

/**
 * Fallback implementation.
 */

var prev = new Date().getTime();
function fallback(fn) {
  var curr = new Date().getTime();
  var ms = Math.max(0, 16 - (curr - prev));
  var req = setTimeout(fn, ms);
  prev = curr;
  return req;
}

/**
 * Cancel.
 */

var cancel = window.cancelAnimationFrame
  || window.webkitCancelAnimationFrame
  || window.mozCancelAnimationFrame
  || window.oCancelAnimationFrame
  || window.msCancelAnimationFrame
  || window.clearTimeout;

exports.cancel = function(id){
  cancel.call(window, id);
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createUniformWrapper   = __webpack_require__(15)
var createAttributeWrapper = __webpack_require__(16)
var makeReflect            = __webpack_require__(2)
var shaderCache            = __webpack_require__(17)
var runtime                = __webpack_require__(35)
var GLError                = __webpack_require__(0)

//Shader object
function Shader(gl) {
  this.gl         = gl
  this.gl.lastAttribCount = 0  // fixme where else should we store info, safe but not nice on the gl object

  //Default initialize these to null
  this._vref      =
  this._fref      =
  this._relink    =
  this.vertShader =
  this.fragShader =
  this.program    =
  this.attributes =
  this.uniforms   =
  this.types      = null
}

var proto = Shader.prototype

proto.bind = function() {
  if(!this.program) {
    this._relink()
  }

  // ensuring that we have the right number of enabled vertex attributes
  var i
  var newAttribCount = this.gl.getProgramParameter(this.program, this.gl.ACTIVE_ATTRIBUTES) // more robust approach
  //var newAttribCount = Object.keys(this.attributes).length // avoids the probably immaterial introspection slowdown
  var oldAttribCount = this.gl.lastAttribCount
  if(newAttribCount > oldAttribCount) {
    for(i = oldAttribCount; i < newAttribCount; i++) {
      this.gl.enableVertexAttribArray(i)
    }
  } else if(oldAttribCount > newAttribCount) {
    for(i = newAttribCount; i < oldAttribCount; i++) {
      this.gl.disableVertexAttribArray(i)
    }
  }

  this.gl.lastAttribCount = newAttribCount

  this.gl.useProgram(this.program)
}

proto.dispose = function() {

  // disabling vertex attributes so new shader starts with zero
  // and it's also useful if all shaders are disposed but the
  // gl context is reused for subsequent replotting
  var oldAttribCount = this.gl.lastAttribCount
  for (var i = 0; i < oldAttribCount; i++) {
    this.gl.disableVertexAttribArray(i)
  }
  this.gl.lastAttribCount = 0

  if(this._fref) {
    this._fref.dispose()
  }
  if(this._vref) {
    this._vref.dispose()
  }
  this.attributes =
  this.types      =
  this.vertShader =
  this.fragShader =
  this.program    =
  this._relink    =
  this._fref      =
  this._vref      = null
}

function compareAttributes(a, b) {
  if(a.name < b.name) {
    return -1
  }
  return 1
}

//Update export hook for glslify-live
proto.update = function(
    vertSource
  , fragSource
  , uniforms
  , attributes) {

  //If only one object passed, assume glslify style output
  if(!fragSource || arguments.length === 1) {
    var obj = vertSource
    vertSource = obj.vertex
    fragSource = obj.fragment
    uniforms   = obj.uniforms
    attributes = obj.attributes
  }

  var wrapper = this
  var gl      = wrapper.gl

  //Compile vertex and fragment shaders
  var pvref = wrapper._vref
  wrapper._vref = shaderCache.shader(gl, gl.VERTEX_SHADER, vertSource)
  if(pvref) {
    pvref.dispose()
  }
  wrapper.vertShader = wrapper._vref.shader
  var pfref = this._fref
  wrapper._fref = shaderCache.shader(gl, gl.FRAGMENT_SHADER, fragSource)
  if(pfref) {
    pfref.dispose()
  }
  wrapper.fragShader = wrapper._fref.shader

  //If uniforms/attributes is not specified, use RT reflection
  if(!uniforms || !attributes) {

    //Create initial test program
    var testProgram = gl.createProgram()
    gl.attachShader(testProgram, wrapper.fragShader)
    gl.attachShader(testProgram, wrapper.vertShader)
    gl.linkProgram(testProgram)
    if(!gl.getProgramParameter(testProgram, gl.LINK_STATUS)) {
      var errLog = gl.getProgramInfoLog(testProgram)
      throw new GLError(errLog, 'Error linking program:' + errLog)
    }

    //Load data from runtime
    uniforms   = uniforms   || runtime.uniforms(gl, testProgram)
    attributes = attributes || runtime.attributes(gl, testProgram)

    //Release test program
    gl.deleteProgram(testProgram)
  }

  //Sort attributes lexicographically
  // overrides undefined WebGL behavior for attribute locations
  attributes = attributes.slice()
  attributes.sort(compareAttributes)

  //Convert attribute types, read out locations
  var attributeUnpacked  = []
  var attributeNames     = []
  var attributeLocations = []
  var i
  for(i=0; i<attributes.length; ++i) {
    var attr = attributes[i]
    if(attr.type.indexOf('mat') >= 0) {
      var size = attr.type.charAt(attr.type.length-1)|0
      var locVector = new Array(size)
      for(var j=0; j<size; ++j) {
        locVector[j] = attributeLocations.length
        attributeNames.push(attr.name + '[' + j + ']')
        if(typeof attr.location === 'number') {
          attributeLocations.push(attr.location + j)
        } else if(Array.isArray(attr.location) &&
                  attr.location.length === size &&
                  typeof attr.location[j] === 'number') {
          attributeLocations.push(attr.location[j]|0)
        } else {
          attributeLocations.push(-1)
        }
      }
      attributeUnpacked.push({
        name: attr.name,
        type: attr.type,
        locations: locVector
      })
    } else {
      attributeUnpacked.push({
        name: attr.name,
        type: attr.type,
        locations: [ attributeLocations.length ]
      })
      attributeNames.push(attr.name)
      if(typeof attr.location === 'number') {
        attributeLocations.push(attr.location|0)
      } else {
        attributeLocations.push(-1)
      }
    }
  }

  //For all unspecified attributes, assign them lexicographically min attribute
  var curLocation = 0
  for(i=0; i<attributeLocations.length; ++i) {
    if(attributeLocations[i] < 0) {
      while(attributeLocations.indexOf(curLocation) >= 0) {
        curLocation += 1
      }
      attributeLocations[i] = curLocation
    }
  }

  //Rebuild program and recompute all uniform locations
  var uniformLocations = new Array(uniforms.length)
  function relink() {
    wrapper.program = shaderCache.program(
        gl
      , wrapper._vref
      , wrapper._fref
      , attributeNames
      , attributeLocations)

    for(var i=0; i<uniforms.length; ++i) {
      uniformLocations[i] = gl.getUniformLocation(
          wrapper.program
        , uniforms[i].name)
    }
  }

  //Perform initial linking, reuse program used for reflection
  relink()

  //Save relinking procedure, defer until runtime
  wrapper._relink = relink

  //Generate type info
  wrapper.types = {
    uniforms:   makeReflect(uniforms),
    attributes: makeReflect(attributes)
  }

  //Generate attribute wrappers
  wrapper.attributes = createAttributeWrapper(
      gl
    , wrapper
    , attributeUnpacked
    , attributeLocations)

  //Generate uniform wrappers
  Object.defineProperty(wrapper, 'uniforms', createUniformWrapper(
      gl
    , wrapper
    , uniforms
    , uniformLocations))
}

//Compiles and links a shader program with the given attribute and vertex list
function createShader(
    gl
  , vertSource
  , fragSource
  , uniforms
  , attributes) {

  var shader = new Shader(gl)

  shader.update(
      vertSource
    , fragSource
    , uniforms
    , attributes)

  return shader
}

module.exports = createShader


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var coallesceUniforms = __webpack_require__(2)
var GLError = __webpack_require__(0)

module.exports = createUniformWrapper

//Binds a function and returns a value
function identity(x) {
  var c = new Function('y', 'return function(){return y}')
  return c(x)
}

function makeVector(length, fill) {
  var result = new Array(length)
  for(var i=0; i<length; ++i) {
    result[i] = fill
  }
  return result
}

//Create shims for uniforms
function createUniformWrapper(gl, wrapper, uniforms, locations) {

  function makeGetter(index) {
    var proc = new Function(
        'gl'
      , 'wrapper'
      , 'locations'
      , 'return function(){return gl.getUniform(wrapper.program,locations[' + index + '])}')
    return proc(gl, wrapper, locations)
  }

  function makePropSetter(path, index, type) {
    switch(type) {
      case 'bool':
      case 'int':
      case 'sampler2D':
      case 'samplerCube':
        return 'gl.uniform1i(locations[' + index + '],obj' + path + ')'
      case 'float':
        return 'gl.uniform1f(locations[' + index + '],obj' + path + ')'
      default:
        var vidx = type.indexOf('vec')
        if(0 <= vidx && vidx <= 1 && type.length === 4 + vidx) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid data type')
          }
          switch(type.charAt(0)) {
            case 'b':
            case 'i':
              return 'gl.uniform' + d + 'iv(locations[' + index + '],obj' + path + ')'
            case 'v':
              return 'gl.uniform' + d + 'fv(locations[' + index + '],obj' + path + ')'
            default:
              throw new GLError('', 'Unrecognized data type for vector ' + name + ': ' + type)
          }
        } else if(type.indexOf('mat') === 0 && type.length === 4) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid uniform dimension type for matrix ' + name + ': ' + type)
          }
          return 'gl.uniformMatrix' + d + 'fv(locations[' + index + '],false,obj' + path + ')'
        } else {
          throw new GLError('', 'Unknown uniform data type for ' + name + ': ' + type)
        }
      break
    }
  }

  function enumerateIndices(prefix, type) {
    if(typeof type !== 'object') {
      return [ [prefix, type] ]
    }
    var indices = []
    for(var id in type) {
      var prop = type[id]
      var tprefix = prefix
      if(parseInt(id) + '' === id) {
        tprefix += '[' + id + ']'
      } else {
        tprefix += '.' + id
      }
      if(typeof prop === 'object') {
        indices.push.apply(indices, enumerateIndices(tprefix, prop))
      } else {
        indices.push([tprefix, prop])
      }
    }
    return indices
  }

  function makeSetter(type) {
    var code = [ 'return function updateProperty(obj){' ]
    var indices = enumerateIndices('', type)
    for(var i=0; i<indices.length; ++i) {
      var item = indices[i]
      var path = item[0]
      var idx  = item[1]
      if(locations[idx]) {
        code.push(makePropSetter(path, idx, uniforms[idx].type))
      }
    }
    code.push('return obj}')
    var proc = new Function('gl', 'locations', code.join('\n'))
    return proc(gl, locations)
  }

  function defaultValue(type) {
    switch(type) {
      case 'bool':
        return false
      case 'int':
      case 'sampler2D':
      case 'samplerCube':
        return 0
      case 'float':
        return 0.0
      default:
        var vidx = type.indexOf('vec')
        if(0 <= vidx && vidx <= 1 && type.length === 4 + vidx) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid data type')
          }
          if(type.charAt(0) === 'b') {
            return makeVector(d, false)
          }
          return makeVector(d, 0)
        } else if(type.indexOf('mat') === 0 && type.length === 4) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid uniform dimension type for matrix ' + name + ': ' + type)
          }
          return makeVector(d*d, 0)
        } else {
          throw new GLError('', 'Unknown uniform data type for ' + name + ': ' + type)
        }
      break
    }
  }

  function storeProperty(obj, prop, type) {
    if(typeof type === 'object') {
      var child = processObject(type)
      Object.defineProperty(obj, prop, {
        get: identity(child),
        set: makeSetter(type),
        enumerable: true,
        configurable: false
      })
    } else {
      if(locations[type]) {
        Object.defineProperty(obj, prop, {
          get: makeGetter(type),
          set: makeSetter(type),
          enumerable: true,
          configurable: false
        })
      } else {
        obj[prop] = defaultValue(uniforms[type].type)
      }
    }
  }

  function processObject(obj) {
    var result
    if(Array.isArray(obj)) {
      result = new Array(obj.length)
      for(var i=0; i<obj.length; ++i) {
        storeProperty(result, i, obj[i])
      }
    } else {
      result = {}
      for(var id in obj) {
        storeProperty(result, id, obj[id])
      }
    }
    return result
  }

  //Return data
  var coallesced = coallesceUniforms(uniforms, true)
  return {
    get: identity(processObject(coallesced)),
    set: makeSetter(coallesced),
    enumerable: true,
    configurable: true
  }
}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = createAttributeWrapper

var GLError = __webpack_require__(0)

function ShaderAttribute(
    gl
  , wrapper
  , index
  , locations
  , dimension
  , constFunc) {
  this._gl        = gl
  this._wrapper   = wrapper
  this._index     = index
  this._locations = locations
  this._dimension = dimension
  this._constFunc = constFunc
}

var proto = ShaderAttribute.prototype

proto.pointer = function setAttribPointer(
    type
  , normalized
  , stride
  , offset) {

  var self      = this
  var gl        = self._gl
  var location  = self._locations[self._index]

  gl.vertexAttribPointer(
      location
    , self._dimension
    , type || gl.FLOAT
    , !!normalized
    , stride || 0
    , offset || 0)
  gl.enableVertexAttribArray(location)
}

proto.set = function(x0, x1, x2, x3) {
  return this._constFunc(this._locations[this._index], x0, x1, x2, x3)
}

Object.defineProperty(proto, 'location', {
  get: function() {
    return this._locations[this._index]
  }
  , set: function(v) {
    if(v !== this._locations[this._index]) {
      this._locations[this._index] = v|0
      this._wrapper.program = null
    }
    return v|0
  }
})

//Adds a vector attribute to obj
function addVectorAttribute(
    gl
  , wrapper
  , index
  , locations
  , dimension
  , obj
  , name) {

  //Construct constant function
  var constFuncArgs = [ 'gl', 'v' ]
  var varNames = []
  for(var i=0; i<dimension; ++i) {
    constFuncArgs.push('x'+i)
    varNames.push('x'+i)
  }
  constFuncArgs.push(
    'if(x0.length===void 0){return gl.vertexAttrib' +
    dimension + 'f(v,' +
    varNames.join() +
    ')}else{return gl.vertexAttrib' +
    dimension +
    'fv(v,x0)}')
  var constFunc = Function.apply(null, constFuncArgs)

  //Create attribute wrapper
  var attr = new ShaderAttribute(
      gl
    , wrapper
    , index
    , locations
    , dimension
    , constFunc)

  //Create accessor
  Object.defineProperty(obj, name, {
    set: function(x) {
      gl.disableVertexAttribArray(locations[index])
      constFunc(gl, locations[index], x)
      return x
    }
    , get: function() {
      return attr
    }
    , enumerable: true
  })
}

function addMatrixAttribute(
    gl
  , wrapper
  , index
  , locations
  , dimension
  , obj
  , name) {

  var parts = new Array(dimension)
  var attrs = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    addVectorAttribute(
        gl
      , wrapper
      , index[i]
      , locations
      , dimension
      , parts
      , i)
    attrs[i] = parts[i]
  }

  Object.defineProperty(parts, 'location', {
    set: function(v) {
      if(Array.isArray(v)) {
        for(var i=0; i<dimension; ++i) {
          attrs[i].location = v[i]
        }
      } else {
        for(var i=0; i<dimension; ++i) {
          attrs[i].location = v + i
        }
      }
      return v
    }
    , get: function() {
      var result = new Array(dimension)
      for(var i=0; i<dimension; ++i) {
        result[i] = locations[index[i]]
      }
      return result
    }
    , enumerable: true
  })

  parts.pointer = function(type, normalized, stride, offset) {
    type       = type || gl.FLOAT
    normalized = !!normalized
    stride     = stride || (dimension * dimension)
    offset     = offset || 0
    for(var i=0; i<dimension; ++i) {
      var location = locations[index[i]]
      gl.vertexAttribPointer(
            location
          , dimension
          , type
          , normalized
          , stride
          , offset + i * dimension)
      gl.enableVertexAttribArray(location)
    }
  }

  var scratch = new Array(dimension)
  var vertexAttrib = gl['vertexAttrib' + dimension + 'fv']

  Object.defineProperty(obj, name, {
    set: function(x) {
      for(var i=0; i<dimension; ++i) {
        var loc = locations[index[i]]
        gl.disableVertexAttribArray(loc)
        if(Array.isArray(x[0])) {
          vertexAttrib.call(gl, loc, x[i])
        } else {
          for(var j=0; j<dimension; ++j) {
            scratch[j] = x[dimension*i + j]
          }
          vertexAttrib.call(gl, loc, scratch)
        }
      }
      return x
    }
    , get: function() {
      return parts
    }
    , enumerable: true
  })
}

//Create shims for attributes
function createAttributeWrapper(
    gl
  , wrapper
  , attributes
  , locations) {

  var obj = {}
  for(var i=0, n=attributes.length; i<n; ++i) {

    var a = attributes[i]
    var name = a.name
    var type = a.type
    var locs = a.locations

    switch(type) {
      case 'bool':
      case 'int':
      case 'float':
        addVectorAttribute(
            gl
          , wrapper
          , locs[0]
          , locations
          , 1
          , obj
          , name)
      break

      default:
        if(type.indexOf('vec') >= 0) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid data type for attribute ' + name + ': ' + type)
          }
          addVectorAttribute(
              gl
            , wrapper
            , locs[0]
            , locations
            , d
            , obj
            , name)
        } else if(type.indexOf('mat') >= 0) {
          var d = type.charCodeAt(type.length-1) - 48
          if(d < 2 || d > 4) {
            throw new GLError('', 'Invalid data type for attribute ' + name + ': ' + type)
          }
          addMatrixAttribute(
              gl
            , wrapper
            , locs
            , locations
            , d
            , obj
            , name)
        } else {
          throw new GLError('', 'Unknown data type for attribute ' + name + ': ' + type)
        }
      break
    }
  }
  return obj
}


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.shader   = getShaderReference
exports.program  = createProgram

var GLError = __webpack_require__(0)
var formatCompilerError = __webpack_require__(18);

var weakMap = typeof WeakMap === 'undefined' ? __webpack_require__(32) : WeakMap
var CACHE = new weakMap()

var SHADER_COUNTER = 0

function ShaderReference(id, src, type, shader, programs, count, cache) {
  this.id       = id
  this.src      = src
  this.type     = type
  this.shader   = shader
  this.count    = count
  this.programs = []
  this.cache    = cache
}

ShaderReference.prototype.dispose = function() {
  if(--this.count === 0) {
    var cache    = this.cache
    var gl       = cache.gl

    //Remove program references
    var programs = this.programs
    for(var i=0, n=programs.length; i<n; ++i) {
      var p = cache.programs[programs[i]]
      if(p) {
        delete cache.programs[i]
        gl.deleteProgram(p)
      }
    }

    //Remove shader reference
    gl.deleteShader(this.shader)
    delete cache.shaders[(this.type === gl.FRAGMENT_SHADER)|0][this.src]
  }
}

function ContextCache(gl) {
  this.gl       = gl
  this.shaders  = [{}, {}]
  this.programs = {}
}

var proto = ContextCache.prototype

function compileShader(gl, type, src) {
  var shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    var errLog = gl.getShaderInfoLog(shader)
    try {
        var fmt = formatCompilerError(errLog, src, type);
    } catch (e){
        console.warn('Failed to format compiler error: ' + e);
        throw new GLError(errLog, 'Error compiling shader:\n' + errLog)
    }
    throw new GLError(errLog, fmt.short, fmt.long)
  }
  return shader
}

proto.getShaderReference = function(type, src) {
  var gl      = this.gl
  var shaders = this.shaders[(type === gl.FRAGMENT_SHADER)|0]
  var shader  = shaders[src]
  if(!shader || !gl.isShader(shader.shader)) {
    var shaderObj = compileShader(gl, type, src)
    shader = shaders[src] = new ShaderReference(
      SHADER_COUNTER++,
      src,
      type,
      shaderObj,
      [],
      1,
      this)
  } else {
    shader.count += 1
  }
  return shader
}

function linkProgram(gl, vshader, fshader, attribs, locations) {
  var program = gl.createProgram()
  gl.attachShader(program, vshader)
  gl.attachShader(program, fshader)
  for(var i=0; i<attribs.length; ++i) {
    gl.bindAttribLocation(program, locations[i], attribs[i])
  }
  gl.linkProgram(program)
  if(!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var errLog = gl.getProgramInfoLog(program)
    throw new GLError(errLog, 'Error linking program: ' + errLog)
  }
  return program
}

proto.getProgram = function(vref, fref, attribs, locations) {
  var token = [vref.id, fref.id, attribs.join(':'), locations.join(':')].join('@')
  var prog  = this.programs[token]
  if(!prog || !this.gl.isProgram(prog)) {
    this.programs[token] = prog = linkProgram(
      this.gl,
      vref.shader,
      fref.shader,
      attribs,
      locations)
    vref.programs.push(token)
    fref.programs.push(token)
  }
  return prog
}

function getCache(gl) {
  var ctxCache = CACHE.get(gl)
  if(!ctxCache) {
    ctxCache = new ContextCache(gl)
    CACHE.set(gl, ctxCache)
  }
  return ctxCache
}

function getShaderReference(gl, type, src) {
  return getCache(gl).getShaderReference(type, src)
}

function createProgram(gl, vref, fref, attribs, locations) {
  return getCache(gl).getProgram(vref, fref, attribs, locations)
}


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


var sprintf = __webpack_require__(19).sprintf;
var glConstants = __webpack_require__(20);
var shaderName = __webpack_require__(22);
var addLineNumbers = __webpack_require__(29);

module.exports = formatCompilerError;

function formatCompilerError(errLog, src, type) {
    "use strict";

    var name = shaderName(src) || 'of unknown name (see npm glsl-shader-name)';

    var typeName = 'unknown type';
    if (type !== undefined) {
        typeName = type === glConstants.FRAGMENT_SHADER ? 'fragment' : 'vertex'
    }

    var longForm = sprintf('Error compiling %s shader %s:\n', typeName, name);
    var shortForm = sprintf("%s%s", longForm, errLog);

    var errorStrings = errLog.split('\n');
    var errors = {};

    for (var i = 0; i < errorStrings.length; i++) {
        var errorString = errorStrings[i];
        if (errorString === '' || errorString === "\0") continue;
        var lineNo = parseInt(errorString.split(':')[2]);
        if (isNaN(lineNo)) {
            throw new Error(sprintf('Could not parse error: %s', errorString));
        }
        errors[lineNo] = errorString;
    }

    var lines = addLineNumbers(src).split('\n');

    for (var i = 0; i < lines.length; i++) {
        if (!errors[i+3] && !errors[i+2] && !errors[i+1]) continue;
        var line = lines[i];
        longForm += line + '\n';
        if (errors[i+1]) {
            var e = errors[i+1];
            e = e.substr(e.split(':', 3).join(':').length + 1).trim();
            longForm += sprintf('^^^ %s\n\n', e);
        }
    }

    return {
        long: longForm.trim(),
        short: shortForm.trim()
    };
}



/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (Array.isArray(parse_tree[i])) {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                        break
                    case 'e':
                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case 'g':
                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(match[8])) {
                    output += arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }
                parse_tree.push(match)
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}()


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var gl10 = __webpack_require__(21)

module.exports = function lookupConstant (number) {
  return gl10[number]
}


/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {
  0: 'NONE',
  1: 'ONE',
  2: 'LINE_LOOP',
  3: 'LINE_STRIP',
  4: 'TRIANGLES',
  5: 'TRIANGLE_STRIP',
  6: 'TRIANGLE_FAN',
  256: 'DEPTH_BUFFER_BIT',
  512: 'NEVER',
  513: 'LESS',
  514: 'EQUAL',
  515: 'LEQUAL',
  516: 'GREATER',
  517: 'NOTEQUAL',
  518: 'GEQUAL',
  519: 'ALWAYS',
  768: 'SRC_COLOR',
  769: 'ONE_MINUS_SRC_COLOR',
  770: 'SRC_ALPHA',
  771: 'ONE_MINUS_SRC_ALPHA',
  772: 'DST_ALPHA',
  773: 'ONE_MINUS_DST_ALPHA',
  774: 'DST_COLOR',
  775: 'ONE_MINUS_DST_COLOR',
  776: 'SRC_ALPHA_SATURATE',
  1024: 'STENCIL_BUFFER_BIT',
  1028: 'FRONT',
  1029: 'BACK',
  1032: 'FRONT_AND_BACK',
  1280: 'INVALID_ENUM',
  1281: 'INVALID_VALUE',
  1282: 'INVALID_OPERATION',
  1285: 'OUT_OF_MEMORY',
  1286: 'INVALID_FRAMEBUFFER_OPERATION',
  2304: 'CW',
  2305: 'CCW',
  2849: 'LINE_WIDTH',
  2884: 'CULL_FACE',
  2885: 'CULL_FACE_MODE',
  2886: 'FRONT_FACE',
  2928: 'DEPTH_RANGE',
  2929: 'DEPTH_TEST',
  2930: 'DEPTH_WRITEMASK',
  2931: 'DEPTH_CLEAR_VALUE',
  2932: 'DEPTH_FUNC',
  2960: 'STENCIL_TEST',
  2961: 'STENCIL_CLEAR_VALUE',
  2962: 'STENCIL_FUNC',
  2963: 'STENCIL_VALUE_MASK',
  2964: 'STENCIL_FAIL',
  2965: 'STENCIL_PASS_DEPTH_FAIL',
  2966: 'STENCIL_PASS_DEPTH_PASS',
  2967: 'STENCIL_REF',
  2968: 'STENCIL_WRITEMASK',
  2978: 'VIEWPORT',
  3024: 'DITHER',
  3042: 'BLEND',
  3088: 'SCISSOR_BOX',
  3089: 'SCISSOR_TEST',
  3106: 'COLOR_CLEAR_VALUE',
  3107: 'COLOR_WRITEMASK',
  3317: 'UNPACK_ALIGNMENT',
  3333: 'PACK_ALIGNMENT',
  3379: 'MAX_TEXTURE_SIZE',
  3386: 'MAX_VIEWPORT_DIMS',
  3408: 'SUBPIXEL_BITS',
  3410: 'RED_BITS',
  3411: 'GREEN_BITS',
  3412: 'BLUE_BITS',
  3413: 'ALPHA_BITS',
  3414: 'DEPTH_BITS',
  3415: 'STENCIL_BITS',
  3553: 'TEXTURE_2D',
  4352: 'DONT_CARE',
  4353: 'FASTEST',
  4354: 'NICEST',
  5120: 'BYTE',
  5121: 'UNSIGNED_BYTE',
  5122: 'SHORT',
  5123: 'UNSIGNED_SHORT',
  5124: 'INT',
  5125: 'UNSIGNED_INT',
  5126: 'FLOAT',
  5386: 'INVERT',
  5890: 'TEXTURE',
  6401: 'STENCIL_INDEX',
  6402: 'DEPTH_COMPONENT',
  6406: 'ALPHA',
  6407: 'RGB',
  6408: 'RGBA',
  6409: 'LUMINANCE',
  6410: 'LUMINANCE_ALPHA',
  7680: 'KEEP',
  7681: 'REPLACE',
  7682: 'INCR',
  7683: 'DECR',
  7936: 'VENDOR',
  7937: 'RENDERER',
  7938: 'VERSION',
  9728: 'NEAREST',
  9729: 'LINEAR',
  9984: 'NEAREST_MIPMAP_NEAREST',
  9985: 'LINEAR_MIPMAP_NEAREST',
  9986: 'NEAREST_MIPMAP_LINEAR',
  9987: 'LINEAR_MIPMAP_LINEAR',
  10240: 'TEXTURE_MAG_FILTER',
  10241: 'TEXTURE_MIN_FILTER',
  10242: 'TEXTURE_WRAP_S',
  10243: 'TEXTURE_WRAP_T',
  10497: 'REPEAT',
  10752: 'POLYGON_OFFSET_UNITS',
  16384: 'COLOR_BUFFER_BIT',
  32769: 'CONSTANT_COLOR',
  32770: 'ONE_MINUS_CONSTANT_COLOR',
  32771: 'CONSTANT_ALPHA',
  32772: 'ONE_MINUS_CONSTANT_ALPHA',
  32773: 'BLEND_COLOR',
  32774: 'FUNC_ADD',
  32777: 'BLEND_EQUATION_RGB',
  32778: 'FUNC_SUBTRACT',
  32779: 'FUNC_REVERSE_SUBTRACT',
  32819: 'UNSIGNED_SHORT_4_4_4_4',
  32820: 'UNSIGNED_SHORT_5_5_5_1',
  32823: 'POLYGON_OFFSET_FILL',
  32824: 'POLYGON_OFFSET_FACTOR',
  32854: 'RGBA4',
  32855: 'RGB5_A1',
  32873: 'TEXTURE_BINDING_2D',
  32926: 'SAMPLE_ALPHA_TO_COVERAGE',
  32928: 'SAMPLE_COVERAGE',
  32936: 'SAMPLE_BUFFERS',
  32937: 'SAMPLES',
  32938: 'SAMPLE_COVERAGE_VALUE',
  32939: 'SAMPLE_COVERAGE_INVERT',
  32968: 'BLEND_DST_RGB',
  32969: 'BLEND_SRC_RGB',
  32970: 'BLEND_DST_ALPHA',
  32971: 'BLEND_SRC_ALPHA',
  33071: 'CLAMP_TO_EDGE',
  33170: 'GENERATE_MIPMAP_HINT',
  33189: 'DEPTH_COMPONENT16',
  33306: 'DEPTH_STENCIL_ATTACHMENT',
  33635: 'UNSIGNED_SHORT_5_6_5',
  33648: 'MIRRORED_REPEAT',
  33901: 'ALIASED_POINT_SIZE_RANGE',
  33902: 'ALIASED_LINE_WIDTH_RANGE',
  33984: 'TEXTURE0',
  33985: 'TEXTURE1',
  33986: 'TEXTURE2',
  33987: 'TEXTURE3',
  33988: 'TEXTURE4',
  33989: 'TEXTURE5',
  33990: 'TEXTURE6',
  33991: 'TEXTURE7',
  33992: 'TEXTURE8',
  33993: 'TEXTURE9',
  33994: 'TEXTURE10',
  33995: 'TEXTURE11',
  33996: 'TEXTURE12',
  33997: 'TEXTURE13',
  33998: 'TEXTURE14',
  33999: 'TEXTURE15',
  34000: 'TEXTURE16',
  34001: 'TEXTURE17',
  34002: 'TEXTURE18',
  34003: 'TEXTURE19',
  34004: 'TEXTURE20',
  34005: 'TEXTURE21',
  34006: 'TEXTURE22',
  34007: 'TEXTURE23',
  34008: 'TEXTURE24',
  34009: 'TEXTURE25',
  34010: 'TEXTURE26',
  34011: 'TEXTURE27',
  34012: 'TEXTURE28',
  34013: 'TEXTURE29',
  34014: 'TEXTURE30',
  34015: 'TEXTURE31',
  34016: 'ACTIVE_TEXTURE',
  34024: 'MAX_RENDERBUFFER_SIZE',
  34041: 'DEPTH_STENCIL',
  34055: 'INCR_WRAP',
  34056: 'DECR_WRAP',
  34067: 'TEXTURE_CUBE_MAP',
  34068: 'TEXTURE_BINDING_CUBE_MAP',
  34069: 'TEXTURE_CUBE_MAP_POSITIVE_X',
  34070: 'TEXTURE_CUBE_MAP_NEGATIVE_X',
  34071: 'TEXTURE_CUBE_MAP_POSITIVE_Y',
  34072: 'TEXTURE_CUBE_MAP_NEGATIVE_Y',
  34073: 'TEXTURE_CUBE_MAP_POSITIVE_Z',
  34074: 'TEXTURE_CUBE_MAP_NEGATIVE_Z',
  34076: 'MAX_CUBE_MAP_TEXTURE_SIZE',
  34338: 'VERTEX_ATTRIB_ARRAY_ENABLED',
  34339: 'VERTEX_ATTRIB_ARRAY_SIZE',
  34340: 'VERTEX_ATTRIB_ARRAY_STRIDE',
  34341: 'VERTEX_ATTRIB_ARRAY_TYPE',
  34342: 'CURRENT_VERTEX_ATTRIB',
  34373: 'VERTEX_ATTRIB_ARRAY_POINTER',
  34466: 'NUM_COMPRESSED_TEXTURE_FORMATS',
  34467: 'COMPRESSED_TEXTURE_FORMATS',
  34660: 'BUFFER_SIZE',
  34661: 'BUFFER_USAGE',
  34816: 'STENCIL_BACK_FUNC',
  34817: 'STENCIL_BACK_FAIL',
  34818: 'STENCIL_BACK_PASS_DEPTH_FAIL',
  34819: 'STENCIL_BACK_PASS_DEPTH_PASS',
  34877: 'BLEND_EQUATION_ALPHA',
  34921: 'MAX_VERTEX_ATTRIBS',
  34922: 'VERTEX_ATTRIB_ARRAY_NORMALIZED',
  34930: 'MAX_TEXTURE_IMAGE_UNITS',
  34962: 'ARRAY_BUFFER',
  34963: 'ELEMENT_ARRAY_BUFFER',
  34964: 'ARRAY_BUFFER_BINDING',
  34965: 'ELEMENT_ARRAY_BUFFER_BINDING',
  34975: 'VERTEX_ATTRIB_ARRAY_BUFFER_BINDING',
  35040: 'STREAM_DRAW',
  35044: 'STATIC_DRAW',
  35048: 'DYNAMIC_DRAW',
  35632: 'FRAGMENT_SHADER',
  35633: 'VERTEX_SHADER',
  35660: 'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
  35661: 'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
  35663: 'SHADER_TYPE',
  35664: 'FLOAT_VEC2',
  35665: 'FLOAT_VEC3',
  35666: 'FLOAT_VEC4',
  35667: 'INT_VEC2',
  35668: 'INT_VEC3',
  35669: 'INT_VEC4',
  35670: 'BOOL',
  35671: 'BOOL_VEC2',
  35672: 'BOOL_VEC3',
  35673: 'BOOL_VEC4',
  35674: 'FLOAT_MAT2',
  35675: 'FLOAT_MAT3',
  35676: 'FLOAT_MAT4',
  35678: 'SAMPLER_2D',
  35680: 'SAMPLER_CUBE',
  35712: 'DELETE_STATUS',
  35713: 'COMPILE_STATUS',
  35714: 'LINK_STATUS',
  35715: 'VALIDATE_STATUS',
  35716: 'INFO_LOG_LENGTH',
  35717: 'ATTACHED_SHADERS',
  35718: 'ACTIVE_UNIFORMS',
  35719: 'ACTIVE_UNIFORM_MAX_LENGTH',
  35720: 'SHADER_SOURCE_LENGTH',
  35721: 'ACTIVE_ATTRIBUTES',
  35722: 'ACTIVE_ATTRIBUTE_MAX_LENGTH',
  35724: 'SHADING_LANGUAGE_VERSION',
  35725: 'CURRENT_PROGRAM',
  36003: 'STENCIL_BACK_REF',
  36004: 'STENCIL_BACK_VALUE_MASK',
  36005: 'STENCIL_BACK_WRITEMASK',
  36006: 'FRAMEBUFFER_BINDING',
  36007: 'RENDERBUFFER_BINDING',
  36048: 'FRAMEBUFFER_ATTACHMENT_OBJECT_TYPE',
  36049: 'FRAMEBUFFER_ATTACHMENT_OBJECT_NAME',
  36050: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_LEVEL',
  36051: 'FRAMEBUFFER_ATTACHMENT_TEXTURE_CUBE_MAP_FACE',
  36053: 'FRAMEBUFFER_COMPLETE',
  36054: 'FRAMEBUFFER_INCOMPLETE_ATTACHMENT',
  36055: 'FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT',
  36057: 'FRAMEBUFFER_INCOMPLETE_DIMENSIONS',
  36061: 'FRAMEBUFFER_UNSUPPORTED',
  36064: 'COLOR_ATTACHMENT0',
  36096: 'DEPTH_ATTACHMENT',
  36128: 'STENCIL_ATTACHMENT',
  36160: 'FRAMEBUFFER',
  36161: 'RENDERBUFFER',
  36162: 'RENDERBUFFER_WIDTH',
  36163: 'RENDERBUFFER_HEIGHT',
  36164: 'RENDERBUFFER_INTERNAL_FORMAT',
  36168: 'STENCIL_INDEX8',
  36176: 'RENDERBUFFER_RED_SIZE',
  36177: 'RENDERBUFFER_GREEN_SIZE',
  36178: 'RENDERBUFFER_BLUE_SIZE',
  36179: 'RENDERBUFFER_ALPHA_SIZE',
  36180: 'RENDERBUFFER_DEPTH_SIZE',
  36181: 'RENDERBUFFER_STENCIL_SIZE',
  36194: 'RGB565',
  36336: 'LOW_FLOAT',
  36337: 'MEDIUM_FLOAT',
  36338: 'HIGH_FLOAT',
  36339: 'LOW_INT',
  36340: 'MEDIUM_INT',
  36341: 'HIGH_INT',
  36346: 'SHADER_COMPILER',
  36347: 'MAX_VERTEX_UNIFORM_VECTORS',
  36348: 'MAX_VARYING_VECTORS',
  36349: 'MAX_FRAGMENT_UNIFORM_VECTORS',
  37440: 'UNPACK_FLIP_Y_WEBGL',
  37441: 'UNPACK_PREMULTIPLY_ALPHA_WEBGL',
  37442: 'CONTEXT_LOST_WEBGL',
  37443: 'UNPACK_COLORSPACE_CONVERSION_WEBGL',
  37444: 'BROWSER_DEFAULT_WEBGL'
}


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(23)
var atob     = __webpack_require__(28)

module.exports = getName

function getName(src) {
  var tokens = Array.isArray(src)
    ? src
    : tokenize(src)

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]
    if (token.type !== 'preprocessor') continue
    var match = token.data.match(/\#define\s+SHADER_NAME(_B64)?\s+(.+)$/)
    if (!match) continue
    if (!match[2]) continue

    var b64  = match[1]
    var name = match[2]

    return (b64 ? atob(name) : name).trim()
  }
}


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(24)

module.exports = tokenizeString

function tokenizeString(str, opt) {
  var generator = tokenize(opt)
  var tokens = []

  tokens = tokens.concat(generator(str))
  tokens = tokens.concat(generator(null))

  return tokens
}


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = tokenize

var literals100 = __webpack_require__(3)
  , operators = __webpack_require__(25)
  , builtins100 = __webpack_require__(4)
  , literals300es = __webpack_require__(26)
  , builtins300es = __webpack_require__(27)

var NORMAL = 999          // <-- never emitted
  , TOKEN = 9999          // <-- never emitted
  , BLOCK_COMMENT = 0
  , LINE_COMMENT = 1
  , PREPROCESSOR = 2
  , OPERATOR = 3
  , INTEGER = 4
  , FLOAT = 5
  , IDENT = 6
  , BUILTIN = 7
  , KEYWORD = 8
  , WHITESPACE = 9
  , EOF = 10
  , HEX = 11

var map = [
    'block-comment'
  , 'line-comment'
  , 'preprocessor'
  , 'operator'
  , 'integer'
  , 'float'
  , 'ident'
  , 'builtin'
  , 'keyword'
  , 'whitespace'
  , 'eof'
  , 'integer'
]

function tokenize(opt) {
  var i = 0
    , total = 0
    , mode = NORMAL
    , c
    , last
    , content = []
    , tokens = []
    , token_idx = 0
    , token_offs = 0
    , line = 1
    , col = 0
    , start = 0
    , isnum = false
    , isoperator = false
    , input = ''
    , len

  opt = opt || {}
  var allBuiltins = builtins100
  var allLiterals = literals100
  if (opt.version === '300 es') {
    allBuiltins = builtins300es
    allLiterals = literals300es
  }

  return function(data) {
    tokens = []
    if (data !== null) return write(data.replace ? data.replace(/\r\n/g, '\n') : data)
    return end()
  }

  function token(data) {
    if (data.length) {
      tokens.push({
        type: map[mode]
      , data: data
      , position: start
      , line: line
      , column: col
      })
    }
  }

  function write(chunk) {
    i = 0
    input += chunk
    len = input.length

    var last

    while(c = input[i], i < len) {
      last = i

      switch(mode) {
        case BLOCK_COMMENT: i = block_comment(); break
        case LINE_COMMENT: i = line_comment(); break
        case PREPROCESSOR: i = preprocessor(); break
        case OPERATOR: i = operator(); break
        case INTEGER: i = integer(); break
        case HEX: i = hex(); break
        case FLOAT: i = decimal(); break
        case TOKEN: i = readtoken(); break
        case WHITESPACE: i = whitespace(); break
        case NORMAL: i = normal(); break
      }

      if(last !== i) {
        switch(input[last]) {
          case '\n': col = 0; ++line; break
          default: ++col; break
        }
      }
    }

    total += i
    input = input.slice(i)
    return tokens
  }

  function end(chunk) {
    if(content.length) {
      token(content.join(''))
    }

    mode = EOF
    token('(eof)')
    return tokens
  }

  function normal() {
    content = content.length ? [] : content

    if(last === '/' && c === '*') {
      start = total + i - 1
      mode = BLOCK_COMMENT
      last = c
      return i + 1
    }

    if(last === '/' && c === '/') {
      start = total + i - 1
      mode = LINE_COMMENT
      last = c
      return i + 1
    }

    if(c === '#') {
      mode = PREPROCESSOR
      start = total + i
      return i
    }

    if(/\s/.test(c)) {
      mode = WHITESPACE
      start = total + i
      return i
    }

    isnum = /\d/.test(c)
    isoperator = /[^\w_]/.test(c)

    start = total + i
    mode = isnum ? INTEGER : isoperator ? OPERATOR : TOKEN
    return i
  }

  function whitespace() {
    if(/[^\s]/g.test(c)) {
      token(content.join(''))
      mode = NORMAL
      return i
    }
    content.push(c)
    last = c
    return i + 1
  }

  function preprocessor() {
    if((c === '\r' || c === '\n') && last !== '\\') {
      token(content.join(''))
      mode = NORMAL
      return i
    }
    content.push(c)
    last = c
    return i + 1
  }

  function line_comment() {
    return preprocessor()
  }

  function block_comment() {
    if(c === '/' && last === '*') {
      content.push(c)
      token(content.join(''))
      mode = NORMAL
      return i + 1
    }

    content.push(c)
    last = c
    return i + 1
  }

  function operator() {
    if(last === '.' && /\d/.test(c)) {
      mode = FLOAT
      return i
    }

    if(last === '/' && c === '*') {
      mode = BLOCK_COMMENT
      return i
    }

    if(last === '/' && c === '/') {
      mode = LINE_COMMENT
      return i
    }

    if(c === '.' && content.length) {
      while(determine_operator(content));

      mode = FLOAT
      return i
    }

    if(c === ';' || c === ')' || c === '(') {
      if(content.length) while(determine_operator(content));
      token(c)
      mode = NORMAL
      return i + 1
    }

    var is_composite_operator = content.length === 2 && c !== '='
    if(/[\w_\d\s]/.test(c) || is_composite_operator) {
      while(determine_operator(content));
      mode = NORMAL
      return i
    }

    content.push(c)
    last = c
    return i + 1
  }

  function determine_operator(buf) {
    var j = 0
      , idx
      , res

    do {
      idx = operators.indexOf(buf.slice(0, buf.length + j).join(''))
      res = operators[idx]

      if(idx === -1) {
        if(j-- + buf.length > 0) continue
        res = buf.slice(0, 1).join('')
      }

      token(res)

      start += res.length
      content = content.slice(res.length)
      return content.length
    } while(1)
  }

  function hex() {
    if(/[^a-fA-F0-9]/.test(c)) {
      token(content.join(''))
      mode = NORMAL
      return i
    }

    content.push(c)
    last = c
    return i + 1
  }

  function integer() {
    if(c === '.') {
      content.push(c)
      mode = FLOAT
      last = c
      return i + 1
    }

    if(/[eE]/.test(c)) {
      content.push(c)
      mode = FLOAT
      last = c
      return i + 1
    }

    if(c === 'x' && content.length === 1 && content[0] === '0') {
      mode = HEX
      content.push(c)
      last = c
      return i + 1
    }

    if(/[^\d]/.test(c)) {
      token(content.join(''))
      mode = NORMAL
      return i
    }

    content.push(c)
    last = c
    return i + 1
  }

  function decimal() {
    if(c === 'f') {
      content.push(c)
      last = c
      i += 1
    }

    if(/[eE]/.test(c)) {
      content.push(c)
      last = c
      return i + 1
    }

    if (c === '-' && /[eE]/.test(last)) {
      content.push(c)
      last = c
      return i + 1
    }

    if(/[^\d]/.test(c)) {
      token(content.join(''))
      mode = NORMAL
      return i
    }

    content.push(c)
    last = c
    return i + 1
  }

  function readtoken() {
    if(/[^\d\w_]/.test(c)) {
      var contentstr = content.join('')
      if(allLiterals.indexOf(contentstr) > -1) {
        mode = KEYWORD
      } else if(allBuiltins.indexOf(contentstr) > -1) {
        mode = BUILTIN
      } else {
        mode = IDENT
      }
      token(content.join(''))
      mode = NORMAL
      return i
    }
    content.push(c)
    last = c
    return i + 1
  }
}


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = [
    '<<='
  , '>>='
  , '++'
  , '--'
  , '<<'
  , '>>'
  , '<='
  , '>='
  , '=='
  , '!='
  , '&&'
  , '||'
  , '+='
  , '-='
  , '*='
  , '/='
  , '%='
  , '&='
  , '^^'
  , '^='
  , '|='
  , '('
  , ')'
  , '['
  , ']'
  , '.'
  , '!'
  , '~'
  , '*'
  , '/'
  , '%'
  , '+'
  , '-'
  , '<'
  , '>'
  , '&'
  , '^'
  , '|'
  , '?'
  , ':'
  , '='
  , ','
  , ';'
  , '{'
  , '}'
]


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

var v100 = __webpack_require__(3)

module.exports = v100.slice().concat([
   'layout'
  , 'centroid'
  , 'smooth'
  , 'case'
  , 'mat2x2'
  , 'mat2x3'
  , 'mat2x4'
  , 'mat3x2'
  , 'mat3x3'
  , 'mat3x4'
  , 'mat4x2'
  , 'mat4x3'
  , 'mat4x4'
  , 'uint'
  , 'uvec2'
  , 'uvec3'
  , 'uvec4'
  , 'samplerCubeShadow'
  , 'sampler2DArray'
  , 'sampler2DArrayShadow'
  , 'isampler2D'
  , 'isampler3D'
  , 'isamplerCube'
  , 'isampler2DArray'
  , 'usampler2D'
  , 'usampler3D'
  , 'usamplerCube'
  , 'usampler2DArray'
  , 'coherent'
  , 'restrict'
  , 'readonly'
  , 'writeonly'
  , 'resource'
  , 'atomic_uint'
  , 'noperspective'
  , 'patch'
  , 'sample'
  , 'subroutine'
  , 'common'
  , 'partition'
  , 'active'
  , 'filter'
  , 'image1D'
  , 'image2D'
  , 'image3D'
  , 'imageCube'
  , 'iimage1D'
  , 'iimage2D'
  , 'iimage3D'
  , 'iimageCube'
  , 'uimage1D'
  , 'uimage2D'
  , 'uimage3D'
  , 'uimageCube'
  , 'image1DArray'
  , 'image2DArray'
  , 'iimage1DArray'
  , 'iimage2DArray'
  , 'uimage1DArray'
  , 'uimage2DArray'
  , 'image1DShadow'
  , 'image2DShadow'
  , 'image1DArrayShadow'
  , 'image2DArrayShadow'
  , 'imageBuffer'
  , 'iimageBuffer'
  , 'uimageBuffer'
  , 'sampler1DArray'
  , 'sampler1DArrayShadow'
  , 'isampler1D'
  , 'isampler1DArray'
  , 'usampler1D'
  , 'usampler1DArray'
  , 'isampler2DRect'
  , 'usampler2DRect'
  , 'samplerBuffer'
  , 'isamplerBuffer'
  , 'usamplerBuffer'
  , 'sampler2DMS'
  , 'isampler2DMS'
  , 'usampler2DMS'
  , 'sampler2DMSArray'
  , 'isampler2DMSArray'
  , 'usampler2DMSArray'
])


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

// 300es builtins/reserved words that were previously valid in v100
var v100 = __webpack_require__(4)

// The texture2D|Cube functions have been removed
// And the gl_ features are updated
v100 = v100.slice().filter(function (b) {
  return !/^(gl\_|texture)/.test(b)
})

module.exports = v100.concat([
  // the updated gl_ constants
    'gl_VertexID'
  , 'gl_InstanceID'
  , 'gl_Position'
  , 'gl_PointSize'
  , 'gl_FragCoord'
  , 'gl_FrontFacing'
  , 'gl_FragDepth'
  , 'gl_PointCoord'
  , 'gl_MaxVertexAttribs'
  , 'gl_MaxVertexUniformVectors'
  , 'gl_MaxVertexOutputVectors'
  , 'gl_MaxFragmentInputVectors'
  , 'gl_MaxVertexTextureImageUnits'
  , 'gl_MaxCombinedTextureImageUnits'
  , 'gl_MaxTextureImageUnits'
  , 'gl_MaxFragmentUniformVectors'
  , 'gl_MaxDrawBuffers'
  , 'gl_MinProgramTexelOffset'
  , 'gl_MaxProgramTexelOffset'
  , 'gl_DepthRangeParameters'
  , 'gl_DepthRange'

  // other builtins
  , 'trunc'
  , 'round'
  , 'roundEven'
  , 'isnan'
  , 'isinf'
  , 'floatBitsToInt'
  , 'floatBitsToUint'
  , 'intBitsToFloat'
  , 'uintBitsToFloat'
  , 'packSnorm2x16'
  , 'unpackSnorm2x16'
  , 'packUnorm2x16'
  , 'unpackUnorm2x16'
  , 'packHalf2x16'
  , 'unpackHalf2x16'
  , 'outerProduct'
  , 'transpose'
  , 'determinant'
  , 'inverse'
  , 'texture'
  , 'textureSize'
  , 'textureProj'
  , 'textureLod'
  , 'textureOffset'
  , 'texelFetch'
  , 'texelFetchOffset'
  , 'textureProjOffset'
  , 'textureLodOffset'
  , 'textureProjLod'
  , 'textureProjLodOffset'
  , 'textureGrad'
  , 'textureGradOffset'
  , 'textureProjGrad'
  , 'textureProjGradOffset'
])


/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = function _atob(str) {
  return atob(str)
}


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var padLeft = __webpack_require__(30)

module.exports = addLineNumbers
function addLineNumbers (string, start, delim) {
  start = typeof start === 'number' ? start : 1
  delim = delim || ': '

  var lines = string.split(/\r?\n/)
  var totalDigits = String(lines.length + start - 1).length
  return lines.map(function (line, i) {
    var c = i + start
    var digits = String(c).length
    var prefix = padLeft(c, totalDigits - digits)
    return prefix + delim + line
  }).join('\n')
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * pad-left <https://github.com/jonschlinkert/pad-left>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */



var repeat = __webpack_require__(31);

module.exports = function padLeft(str, num, ch) {
  ch = typeof ch !== 'undefined' ? (ch + '') : ' ';
  return repeat(ch, num) + str;
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * repeat-string <https://github.com/jonschlinkert/repeat-string>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



/**
 * Results cache
 */

var res = '';
var cache;

/**
 * Expose `repeat`
 */

module.exports = repeat;

/**
 * Repeat the given `string` the specified `number`
 * of times.
 *
 * **Example:**
 *
 * ```js
 * var repeat = require('repeat-string');
 * repeat('A', 5);
 * //=> AAAAA
 * ```
 *
 * @param {String} `string` The string to repeat
 * @param {Number} `number` The number of times to repeat the string
 * @return {String} Repeated string
 * @api public
 */

function repeat(str, num) {
  if (typeof str !== 'string') {
    throw new TypeError('expected a string');
  }

  // cover common, quick use cases
  if (num === 1) return str;
  if (num === 2) return str + str;

  var max = str.length * num;
  if (cache !== str || typeof cache === 'undefined') {
    cache = str;
    res = '';
  } else if (res.length >= max) {
    return res.substr(0, max);
  }

  while (max > res.length && num > 1) {
    if (num & 1) {
      res += str;
    }

    num >>= 1;
    str += str;
  }

  res += str;
  res = res.substr(0, max);
  return res;
}


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

// Original - @Gozola.
// https://gist.github.com/Gozala/1269991
// This is a reimplemented version (with a few bug fixes).

var createStore = __webpack_require__(33);

module.exports = weakMap;

function weakMap() {
    var privates = createStore();

    return {
        'get': function (key, fallback) {
            var store = privates(key)
            return store.hasOwnProperty('value') ?
                store.value : fallback
        },
        'set': function (key, value) {
            privates(key).value = value;
            return this;
        },
        'has': function(key) {
            return 'value' in privates(key);
        },
        'delete': function (key) {
            return delete privates(key).value;
        }
    }
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenStore = __webpack_require__(34);

module.exports = createStore;

function createStore() {
    var key = {};

    return function (obj) {
        if ((typeof obj !== 'object' || obj === null) &&
            typeof obj !== 'function'
        ) {
            throw new Error('Weakmap-shim: Key must be object')
        }

        var store = obj.valueOf(key);
        return store && store.identity === key ?
            store : hiddenStore(obj, key);
    };
}


/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = hiddenStore;

function hiddenStore(obj, key) {
    var store = { identity: key };
    var valueOf = obj.valueOf;

    Object.defineProperty(obj, "valueOf", {
        value: function (value) {
            return value !== key ?
                valueOf.apply(this, arguments) : store;
        },
        writable: true
    });

    return store;
}


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.uniforms    = runtimeUniforms
exports.attributes  = runtimeAttributes

var GL_TO_GLSL_TYPES = {
  'FLOAT':       'float',
  'FLOAT_VEC2':  'vec2',
  'FLOAT_VEC3':  'vec3',
  'FLOAT_VEC4':  'vec4',
  'INT':         'int',
  'INT_VEC2':    'ivec2',
  'INT_VEC3':    'ivec3',
  'INT_VEC4':    'ivec4',
  'BOOL':        'bool',
  'BOOL_VEC2':   'bvec2',
  'BOOL_VEC3':   'bvec3',
  'BOOL_VEC4':   'bvec4',
  'FLOAT_MAT2':  'mat2',
  'FLOAT_MAT3':  'mat3',
  'FLOAT_MAT4':  'mat4',
  'SAMPLER_2D':  'sampler2D',
  'SAMPLER_CUBE':'samplerCube'
}

var GL_TABLE = null

function getType(gl, type) {
  if(!GL_TABLE) {
    var typeNames = Object.keys(GL_TO_GLSL_TYPES)
    GL_TABLE = {}
    for(var i=0; i<typeNames.length; ++i) {
      var tn = typeNames[i]
      GL_TABLE[gl[tn]] = GL_TO_GLSL_TYPES[tn]
    }
  }
  return GL_TABLE[type]
}

function runtimeUniforms(gl, program) {
  var numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
  var result = []
  for(var i=0; i<numUniforms; ++i) {
    var info = gl.getActiveUniform(program, i)
    if(info) {
      var type = getType(gl, info.type)
      if(info.size > 1) {
        for(var j=0; j<info.size; ++j) {
          result.push({
            name: info.name.replace('[0]', '[' + j + ']'),
            type: type
          })
        }
      } else {
        result.push({
          name: info.name,
          type: type
        })
      }
    }
  }
  return result
}

function runtimeAttributes(gl, program) {
  var numAttributes = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES)
  var result = []
  for(var i=0; i<numAttributes; ++i) {
    var info = gl.getActiveAttrib(program, i)
    if(info) {
      result.push({
        name: info.name,
        type: getType(gl, info.type)
      })
    }
  }
  return result
}


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

var stateReset = __webpack_require__(37)

module.exports = Reset
module.exports.state = stateReset

function Reset(gl) {
  var cleanup = [
    'Buffer'
  , 'Framebuffer'
  , 'Renderbuffer'
  , 'Program'
  , 'Shader'
  , 'Texture'
  ].map(function(suffix) {
    var remove   = 'delete' + suffix
    var create   = 'create' + suffix
    var original = gl[create]
    var handles  = []

    gl[create] = function() {
      var handle = original.apply(this, arguments)
      handles.push(handle)
      return handle
    }

    return {
        remove: remove
      , handles: handles
    }
  })

  return function reset() {
    cleanup.forEach(function(kind) {
      for (var i = 0; i < kind.handles.length; i++) {
        gl[kind.remove].call(gl, kind.handles[i])
      }
    })

    stateReset(gl)

    return gl
  }
}


/***/ }),
/* 37 */
/***/ (function(module, exports) {

//
// The code that follows was originally sourced from:
// https://www.khronos.org/registry/webgl/sdk/debug/webgl-debug.js
//

module.exports = stateReset

/*
** Copyright (c) 2012 The Khronos Group Inc.
**
** Permission is hereby granted, free of charge, to any person obtaining a
** copy of this software and/or associated documentation files (the
** "Materials"), to deal in the Materials without restriction, including
** without limitation the rights to use, copy, modify, merge, publish,
** distribute, sublicense, and/or sell copies of the Materials, and to
** permit persons to whom the Materials are furnished to do so, subject to
** the following conditions:
**
** The above copyright notice and this permission notice shall be included
** in all copies or substantial portions of the Materials.
**
** THE MATERIALS ARE PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
** EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
** MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
** IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
** CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
** TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
** MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
*/
function stateReset(gl) {
  var numAttribs = gl.getParameter(gl.MAX_VERTEX_ATTRIBS)
  var tmp = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, tmp)
  for (var ii = 0; ii < numAttribs; ++ii) {
    gl.disableVertexAttribArray(ii)
    gl.vertexAttribPointer(ii, 4, gl.FLOAT, false, 0, 0)
    gl.vertexAttrib1f(ii, 0)
  }
  gl.deleteBuffer(tmp)

  var numTextureUnits = gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS)
  for (var ii = 0; ii < numTextureUnits; ++ii) {
    gl.activeTexture(gl.TEXTURE0 + ii)
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, null)
    gl.bindTexture(gl.TEXTURE_2D, null)
  }

  gl.activeTexture(gl.TEXTURE0)
  gl.useProgram(null)
  gl.bindBuffer(gl.ARRAY_BUFFER, null)
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  gl.bindFramebuffer(gl.FRAMEBUFFER, null)
  gl.bindRenderbuffer(gl.RENDERBUFFER, null)
  gl.disable(gl.BLEND)
  gl.disable(gl.CULL_FACE)
  gl.disable(gl.DEPTH_TEST)
  gl.disable(gl.DITHER)
  gl.disable(gl.SCISSOR_TEST)
  gl.blendColor(0, 0, 0, 0)
  gl.blendEquation(gl.FUNC_ADD)
  gl.blendFunc(gl.ONE, gl.ZERO)
  gl.clearColor(0, 0, 0, 0)
  gl.clearDepth(1)
  gl.clearStencil(-1)
  gl.colorMask(true, true, true, true)
  gl.cullFace(gl.BACK)
  gl.depthFunc(gl.LESS)
  gl.depthMask(true)
  gl.depthRange(0, 1)
  gl.frontFace(gl.CCW)
  gl.hint(gl.GENERATE_MIPMAP_HINT, gl.DONT_CARE)
  gl.lineWidth(1)
  gl.pixelStorei(gl.PACK_ALIGNMENT, 4)
  gl.pixelStorei(gl.UNPACK_ALIGNMENT, 4)
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)
  gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false)
  gl.polygonOffset(0, 0)
  gl.sampleCoverage(1, false)
  gl.scissor(0, 0, gl.canvas.width, gl.canvas.height)
  gl.stencilFunc(gl.ALWAYS, 0, 0xFFFFFFFF)
  gl.stencilMask(0xFFFFFFFF)
  gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP)
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT)

  return gl
}


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {module.exports =
  global.performance &&
  global.performance.now ? function now() {
    return performance.now()
  } : Date.now || function now() {
    return +new Date
  }

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weakMap      = typeof WeakMap === 'undefined' ? __webpack_require__(40) : WeakMap
var createBuffer = __webpack_require__(41)
var createVAO    = __webpack_require__(57)

var TriangleCache = new weakMap()

function createABigTriangle(gl) {

  var triangleVAO = TriangleCache.get(gl)
  var handle = triangleVAO && (triangleVAO._triangleBuffer.handle || triangleVAO._triangleBuffer.buffer)
  if(!handle || !gl.isBuffer(handle)) {
    var buf = createBuffer(gl, new Float32Array([-1, -1, -1, 4, 4, -1]))
    triangleVAO = createVAO(gl, [
      { buffer: buf,
        type: gl.FLOAT,
        size: 2
      }
    ])
    triangleVAO._triangleBuffer = buf
    TriangleCache.set(gl, triangleVAO)
  }
  triangleVAO.bind()
  gl.drawArrays(gl.TRIANGLES, 0, 3)
  triangleVAO.unbind()
}

module.exports = createABigTriangle


/***/ }),
/* 40 */
/***/ (function(module, exports) {

// Copyright (C) 2011 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Install a leaky WeakMap emulation on platforms that
 * don't provide a built-in one.
 *
 * <p>Assumes that an ES5 platform where, if {@code WeakMap} is
 * already present, then it conforms to the anticipated ES6
 * specification. To run this file on an ES5 or almost ES5
 * implementation where the {@code WeakMap} specification does not
 * quite conform, run <code>repairES5.js</code> first.
 *
 * <p>Even though WeakMapModule is not global, the linter thinks it
 * is, which is why it is in the overrides list below.
 *
 * <p>NOTE: Before using this WeakMap emulation in a non-SES
 * environment, see the note below about hiddenRecord.
 *
 * @author Mark S. Miller
 * @requires crypto, ArrayBuffer, Uint8Array, navigator, console
 * @overrides WeakMap, ses, Proxy
 * @overrides WeakMapModule
 */

/**
 * This {@code WeakMap} emulation is observably equivalent to the
 * ES-Harmony WeakMap, but with leakier garbage collection properties.
 *
 * <p>As with true WeakMaps, in this emulation, a key does not
 * retain maps indexed by that key and (crucially) a map does not
 * retain the keys it indexes. A map by itself also does not retain
 * the values associated with that map.
 *
 * <p>However, the values associated with a key in some map are
 * retained so long as that key is retained and those associations are
 * not overridden. For example, when used to support membranes, all
 * values exported from a given membrane will live for the lifetime
 * they would have had in the absence of an interposed membrane. Even
 * when the membrane is revoked, all objects that would have been
 * reachable in the absence of revocation will still be reachable, as
 * far as the GC can tell, even though they will no longer be relevant
 * to ongoing computation.
 *
 * <p>The API implemented here is approximately the API as implemented
 * in FF6.0a1 and agreed to by MarkM, Andreas Gal, and Dave Herman,
 * rather than the offially approved proposal page. TODO(erights):
 * upgrade the ecmascript WeakMap proposal page to explain this API
 * change and present to EcmaScript committee for their approval.
 *
 * <p>The first difference between the emulation here and that in
 * FF6.0a1 is the presence of non enumerable {@code get___, has___,
 * set___, and delete___} methods on WeakMap instances to represent
 * what would be the hidden internal properties of a primitive
 * implementation. Whereas the FF6.0a1 WeakMap.prototype methods
 * require their {@code this} to be a genuine WeakMap instance (i.e.,
 * an object of {@code [[Class]]} "WeakMap}), since there is nothing
 * unforgeable about the pseudo-internal method names used here,
 * nothing prevents these emulated prototype methods from being
 * applied to non-WeakMaps with pseudo-internal methods of the same
 * names.
 *
 * <p>Another difference is that our emulated {@code
 * WeakMap.prototype} is not itself a WeakMap. A problem with the
 * current FF6.0a1 API is that WeakMap.prototype is itself a WeakMap
 * providing ambient mutability and an ambient communications
 * channel. Thus, if a WeakMap is already present and has this
 * problem, repairES5.js wraps it in a safe wrappper in order to
 * prevent access to this channel. (See
 * PATCH_MUTABLE_FROZEN_WEAKMAP_PROTO in repairES5.js).
 */

/**
 * If this is a full <a href=
 * "http://code.google.com/p/es-lab/wiki/SecureableES5"
 * >secureable ES5</a> platform and the ES-Harmony {@code WeakMap} is
 * absent, install an approximate emulation.
 *
 * <p>If WeakMap is present but cannot store some objects, use our approximate
 * emulation as a wrapper.
 *
 * <p>If this is almost a secureable ES5 platform, then WeakMap.js
 * should be run after repairES5.js.
 *
 * <p>See {@code WeakMap} for documentation of the garbage collection
 * properties of this WeakMap emulation.
 */
(function WeakMapModule() {
  "use strict";

  if (typeof ses !== 'undefined' && ses.ok && !ses.ok()) {
    // already too broken, so give up
    return;
  }

  /**
   * In some cases (current Firefox), we must make a choice betweeen a
   * WeakMap which is capable of using all varieties of host objects as
   * keys and one which is capable of safely using proxies as keys. See
   * comments below about HostWeakMap and DoubleWeakMap for details.
   *
   * This function (which is a global, not exposed to guests) marks a
   * WeakMap as permitted to do what is necessary to index all host
   * objects, at the cost of making it unsafe for proxies.
   *
   * Do not apply this function to anything which is not a genuine
   * fresh WeakMap.
   */
  function weakMapPermitHostObjects(map) {
    // identity of function used as a secret -- good enough and cheap
    if (map.permitHostObjects___) {
      map.permitHostObjects___(weakMapPermitHostObjects);
    }
  }
  if (typeof ses !== 'undefined') {
    ses.weakMapPermitHostObjects = weakMapPermitHostObjects;
  }

  // IE 11 has no Proxy but has a broken WeakMap such that we need to patch
  // it using DoubleWeakMap; this flag tells DoubleWeakMap so.
  var doubleWeakMapCheckSilentFailure = false;

  // Check if there is already a good-enough WeakMap implementation, and if so
  // exit without replacing it.
  if (typeof WeakMap === 'function') {
    var HostWeakMap = WeakMap;
    // There is a WeakMap -- is it good enough?
    if (typeof navigator !== 'undefined' &&
        /Firefox/.test(navigator.userAgent)) {
      // We're now *assuming not*, because as of this writing (2013-05-06)
      // Firefox's WeakMaps have a miscellany of objects they won't accept, and
      // we don't want to make an exhaustive list, and testing for just one
      // will be a problem if that one is fixed alone (as they did for Event).

      // If there is a platform that we *can* reliably test on, here's how to
      // do it:
      //  var problematic = ... ;
      //  var testHostMap = new HostWeakMap();
      //  try {
      //    testHostMap.set(problematic, 1);  // Firefox 20 will throw here
      //    if (testHostMap.get(problematic) === 1) {
      //      return;
      //    }
      //  } catch (e) {}

    } else {
      // IE 11 bug: WeakMaps silently fail to store frozen objects.
      var testMap = new HostWeakMap();
      var testObject = Object.freeze({});
      testMap.set(testObject, 1);
      if (testMap.get(testObject) !== 1) {
        doubleWeakMapCheckSilentFailure = true;
        // Fall through to installing our WeakMap.
      } else {
        module.exports = WeakMap;
        return;
      }
    }
  }

  var hop = Object.prototype.hasOwnProperty;
  var gopn = Object.getOwnPropertyNames;
  var defProp = Object.defineProperty;
  var isExtensible = Object.isExtensible;

  /**
   * Security depends on HIDDEN_NAME being both <i>unguessable</i> and
   * <i>undiscoverable</i> by untrusted code.
   *
   * <p>Given the known weaknesses of Math.random() on existing
   * browsers, it does not generate unguessability we can be confident
   * of.
   *
   * <p>It is the monkey patching logic in this file that is intended
   * to ensure undiscoverability. The basic idea is that there are
   * three fundamental means of discovering properties of an object:
   * The for/in loop, Object.keys(), and Object.getOwnPropertyNames(),
   * as well as some proposed ES6 extensions that appear on our
   * whitelist. The first two only discover enumerable properties, and
   * we only use HIDDEN_NAME to name a non-enumerable property, so the
   * only remaining threat should be getOwnPropertyNames and some
   * proposed ES6 extensions that appear on our whitelist. We monkey
   * patch them to remove HIDDEN_NAME from the list of properties they
   * returns.
   *
   * <p>TODO(erights): On a platform with built-in Proxies, proxies
   * could be used to trap and thereby discover the HIDDEN_NAME, so we
   * need to monkey patch Proxy.create, Proxy.createFunction, etc, in
   * order to wrap the provided handler with the real handler which
   * filters out all traps using HIDDEN_NAME.
   *
   * <p>TODO(erights): Revisit Mike Stay's suggestion that we use an
   * encapsulated function at a not-necessarily-secret name, which
   * uses the Stiegler shared-state rights amplification pattern to
   * reveal the associated value only to the WeakMap in which this key
   * is associated with that value. Since only the key retains the
   * function, the function can also remember the key without causing
   * leakage of the key, so this doesn't violate our general gc
   * goals. In addition, because the name need not be a guarded
   * secret, we could efficiently handle cross-frame frozen keys.
   */
  var HIDDEN_NAME_PREFIX = 'weakmap:';
  var HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'ident:' + Math.random() + '___';

  if (typeof crypto !== 'undefined' &&
      typeof crypto.getRandomValues === 'function' &&
      typeof ArrayBuffer === 'function' &&
      typeof Uint8Array === 'function') {
    var ab = new ArrayBuffer(25);
    var u8s = new Uint8Array(ab);
    crypto.getRandomValues(u8s);
    HIDDEN_NAME = HIDDEN_NAME_PREFIX + 'rand:' +
      Array.prototype.map.call(u8s, function(u8) {
        return (u8 % 36).toString(36);
      }).join('') + '___';
  }

  function isNotHiddenName(name) {
    return !(
        name.substr(0, HIDDEN_NAME_PREFIX.length) == HIDDEN_NAME_PREFIX &&
        name.substr(name.length - 3) === '___');
  }

  /**
   * Monkey patch getOwnPropertyNames to avoid revealing the
   * HIDDEN_NAME.
   *
   * <p>The ES5.1 spec requires each name to appear only once, but as
   * of this writing, this requirement is controversial for ES6, so we
   * made this code robust against this case. If the resulting extra
   * search turns out to be expensive, we can probably relax this once
   * ES6 is adequately supported on all major browsers, iff no browser
   * versions we support at that time have relaxed this constraint
   * without providing built-in ES6 WeakMaps.
   */
  defProp(Object, 'getOwnPropertyNames', {
    value: function fakeGetOwnPropertyNames(obj) {
      return gopn(obj).filter(isNotHiddenName);
    }
  });

  /**
   * getPropertyNames is not in ES5 but it is proposed for ES6 and
   * does appear in our whitelist, so we need to clean it too.
   */
  if ('getPropertyNames' in Object) {
    var originalGetPropertyNames = Object.getPropertyNames;
    defProp(Object, 'getPropertyNames', {
      value: function fakeGetPropertyNames(obj) {
        return originalGetPropertyNames(obj).filter(isNotHiddenName);
      }
    });
  }

  /**
   * <p>To treat objects as identity-keys with reasonable efficiency
   * on ES5 by itself (i.e., without any object-keyed collections), we
   * need to add a hidden property to such key objects when we
   * can. This raises several issues:
   * <ul>
   * <li>Arranging to add this property to objects before we lose the
   *     chance, and
   * <li>Hiding the existence of this new property from most
   *     JavaScript code.
   * <li>Preventing <i>certification theft</i>, where one object is
   *     created falsely claiming to be the key of an association
   *     actually keyed by another object.
   * <li>Preventing <i>value theft</i>, where untrusted code with
   *     access to a key object but not a weak map nevertheless
   *     obtains access to the value associated with that key in that
   *     weak map.
   * </ul>
   * We do so by
   * <ul>
   * <li>Making the name of the hidden property unguessable, so "[]"
   *     indexing, which we cannot intercept, cannot be used to access
   *     a property without knowing the name.
   * <li>Making the hidden property non-enumerable, so we need not
   *     worry about for-in loops or {@code Object.keys},
   * <li>monkey patching those reflective methods that would
   *     prevent extensions, to add this hidden property first,
   * <li>monkey patching those methods that would reveal this
   *     hidden property.
   * </ul>
   * Unfortunately, because of same-origin iframes, we cannot reliably
   * add this hidden property before an object becomes
   * non-extensible. Instead, if we encounter a non-extensible object
   * without a hidden record that we can detect (whether or not it has
   * a hidden record stored under a name secret to us), then we just
   * use the key object itself to represent its identity in a brute
   * force leaky map stored in the weak map, losing all the advantages
   * of weakness for these.
   */
  function getHiddenRecord(key) {
    if (key !== Object(key)) {
      throw new TypeError('Not an object: ' + key);
    }
    var hiddenRecord = key[HIDDEN_NAME];
    if (hiddenRecord && hiddenRecord.key === key) { return hiddenRecord; }
    if (!isExtensible(key)) {
      // Weak map must brute force, as explained in doc-comment above.
      return void 0;
    }

    // The hiddenRecord and the key point directly at each other, via
    // the "key" and HIDDEN_NAME properties respectively. The key
    // field is for quickly verifying that this hidden record is an
    // own property, not a hidden record from up the prototype chain.
    //
    // NOTE: Because this WeakMap emulation is meant only for systems like
    // SES where Object.prototype is frozen without any numeric
    // properties, it is ok to use an object literal for the hiddenRecord.
    // This has two advantages:
    // * It is much faster in a performance critical place
    // * It avoids relying on Object.create(null), which had been
    //   problematic on Chrome 28.0.1480.0. See
    //   https://code.google.com/p/google-caja/issues/detail?id=1687
    hiddenRecord = { key: key };

    // When using this WeakMap emulation on platforms where
    // Object.prototype might not be frozen and Object.create(null) is
    // reliable, use the following two commented out lines instead.
    // hiddenRecord = Object.create(null);
    // hiddenRecord.key = key;

    // Please contact us if you need this to work on platforms where
    // Object.prototype might not be frozen and
    // Object.create(null) might not be reliable.

    try {
      defProp(key, HIDDEN_NAME, {
        value: hiddenRecord,
        writable: false,
        enumerable: false,
        configurable: false
      });
      return hiddenRecord;
    } catch (error) {
      // Under some circumstances, isExtensible seems to misreport whether
      // the HIDDEN_NAME can be defined.
      // The circumstances have not been isolated, but at least affect
      // Node.js v0.10.26 on TravisCI / Linux, but not the same version of
      // Node.js on OS X.
      return void 0;
    }
  }

  /**
   * Monkey patch operations that would make their argument
   * non-extensible.
   *
   * <p>The monkey patched versions throw a TypeError if their
   * argument is not an object, so it should only be done to functions
   * that should throw a TypeError anyway if their argument is not an
   * object.
   */
  (function(){
    var oldFreeze = Object.freeze;
    defProp(Object, 'freeze', {
      value: function identifyingFreeze(obj) {
        getHiddenRecord(obj);
        return oldFreeze(obj);
      }
    });
    var oldSeal = Object.seal;
    defProp(Object, 'seal', {
      value: function identifyingSeal(obj) {
        getHiddenRecord(obj);
        return oldSeal(obj);
      }
    });
    var oldPreventExtensions = Object.preventExtensions;
    defProp(Object, 'preventExtensions', {
      value: function identifyingPreventExtensions(obj) {
        getHiddenRecord(obj);
        return oldPreventExtensions(obj);
      }
    });
  })();

  function constFunc(func) {
    func.prototype = null;
    return Object.freeze(func);
  }

  var calledAsFunctionWarningDone = false;
  function calledAsFunctionWarning() {
    // Future ES6 WeakMap is currently (2013-09-10) expected to reject WeakMap()
    // but we used to permit it and do it ourselves, so warn only.
    if (!calledAsFunctionWarningDone && typeof console !== 'undefined') {
      calledAsFunctionWarningDone = true;
      console.warn('WeakMap should be invoked as new WeakMap(), not ' +
          'WeakMap(). This will be an error in the future.');
    }
  }

  var nextId = 0;

  var OurWeakMap = function() {
    if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
      calledAsFunctionWarning();
    }

    // We are currently (12/25/2012) never encountering any prematurely
    // non-extensible keys.
    var keys = []; // brute force for prematurely non-extensible keys.
    var values = []; // brute force for corresponding values.
    var id = nextId++;

    function get___(key, opt_default) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord ? hiddenRecord[id] : opt_default;
      } else {
        index = keys.indexOf(key);
        return index >= 0 ? values[index] : opt_default;
      }
    }

    function has___(key) {
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        return id in hiddenRecord;
      } else {
        return keys.indexOf(key) >= 0;
      }
    }

    function set___(key, value) {
      var index;
      var hiddenRecord = getHiddenRecord(key);
      if (hiddenRecord) {
        hiddenRecord[id] = value;
      } else {
        index = keys.indexOf(key);
        if (index >= 0) {
          values[index] = value;
        } else {
          // Since some browsers preemptively terminate slow turns but
          // then continue computing with presumably corrupted heap
          // state, we here defensively get keys.length first and then
          // use it to update both the values and keys arrays, keeping
          // them in sync.
          index = keys.length;
          values[index] = value;
          // If we crash here, values will be one longer than keys.
          keys[index] = key;
        }
      }
      return this;
    }

    function delete___(key) {
      var hiddenRecord = getHiddenRecord(key);
      var index, lastIndex;
      if (hiddenRecord) {
        return id in hiddenRecord && delete hiddenRecord[id];
      } else {
        index = keys.indexOf(key);
        if (index < 0) {
          return false;
        }
        // Since some browsers preemptively terminate slow turns but
        // then continue computing with potentially corrupted heap
        // state, we here defensively get keys.length first and then use
        // it to update both the keys and the values array, keeping
        // them in sync. We update the two with an order of assignments,
        // such that any prefix of these assignments will preserve the
        // key/value correspondence, either before or after the delete.
        // Note that this needs to work correctly when index === lastIndex.
        lastIndex = keys.length - 1;
        keys[index] = void 0;
        // If we crash here, there's a void 0 in the keys array, but
        // no operation will cause a "keys.indexOf(void 0)", since
        // getHiddenRecord(void 0) will always throw an error first.
        values[index] = values[lastIndex];
        // If we crash here, values[index] cannot be found here,
        // because keys[index] is void 0.
        keys[index] = keys[lastIndex];
        // If index === lastIndex and we crash here, then keys[index]
        // is still void 0, since the aliasing killed the previous key.
        keys.length = lastIndex;
        // If we crash here, keys will be one shorter than values.
        values.length = lastIndex;
        return true;
      }
    }

    return Object.create(OurWeakMap.prototype, {
      get___:    { value: constFunc(get___) },
      has___:    { value: constFunc(has___) },
      set___:    { value: constFunc(set___) },
      delete___: { value: constFunc(delete___) }
    });
  };

  OurWeakMap.prototype = Object.create(Object.prototype, {
    get: {
      /**
       * Return the value most recently associated with key, or
       * opt_default if none.
       */
      value: function get(key, opt_default) {
        return this.get___(key, opt_default);
      },
      writable: true,
      configurable: true
    },

    has: {
      /**
       * Is there a value associated with key in this WeakMap?
       */
      value: function has(key) {
        return this.has___(key);
      },
      writable: true,
      configurable: true
    },

    set: {
      /**
       * Associate value with key in this WeakMap, overwriting any
       * previous association if present.
       */
      value: function set(key, value) {
        return this.set___(key, value);
      },
      writable: true,
      configurable: true
    },

    'delete': {
      /**
       * Remove any association for key in this WeakMap, returning
       * whether there was one.
       *
       * <p>Note that the boolean return here does not work like the
       * {@code delete} operator. The {@code delete} operator returns
       * whether the deletion succeeds at bringing about a state in
       * which the deleted property is absent. The {@code delete}
       * operator therefore returns true if the property was already
       * absent, whereas this {@code delete} method returns false if
       * the association was already absent.
       */
      value: function remove(key) {
        return this.delete___(key);
      },
      writable: true,
      configurable: true
    }
  });

  if (typeof HostWeakMap === 'function') {
    (function() {
      // If we got here, then the platform has a WeakMap but we are concerned
      // that it may refuse to store some key types. Therefore, make a map
      // implementation which makes use of both as possible.

      // In this mode we are always using double maps, so we are not proxy-safe.
      // This combination does not occur in any known browser, but we had best
      // be safe.
      if (doubleWeakMapCheckSilentFailure && typeof Proxy !== 'undefined') {
        Proxy = undefined;
      }

      function DoubleWeakMap() {
        if (!(this instanceof OurWeakMap)) {  // approximate test for new ...()
          calledAsFunctionWarning();
        }

        // Preferable, truly weak map.
        var hmap = new HostWeakMap();

        // Our hidden-property-based pseudo-weak-map. Lazily initialized in the
        // 'set' implementation; thus we can avoid performing extra lookups if
        // we know all entries actually stored are entered in 'hmap'.
        var omap = undefined;

        // Hidden-property maps are not compatible with proxies because proxies
        // can observe the hidden name and either accidentally expose it or fail
        // to allow the hidden property to be set. Therefore, we do not allow
        // arbitrary WeakMaps to switch to using hidden properties, but only
        // those which need the ability, and unprivileged code is not allowed
        // to set the flag.
        //
        // (Except in doubleWeakMapCheckSilentFailure mode in which case we
        // disable proxies.)
        var enableSwitching = false;

        function dget(key, opt_default) {
          if (omap) {
            return hmap.has(key) ? hmap.get(key)
                : omap.get___(key, opt_default);
          } else {
            return hmap.get(key, opt_default);
          }
        }

        function dhas(key) {
          return hmap.has(key) || (omap ? omap.has___(key) : false);
        }

        var dset;
        if (doubleWeakMapCheckSilentFailure) {
          dset = function(key, value) {
            hmap.set(key, value);
            if (!hmap.has(key)) {
              if (!omap) { omap = new OurWeakMap(); }
              omap.set(key, value);
            }
            return this;
          };
        } else {
          dset = function(key, value) {
            if (enableSwitching) {
              try {
                hmap.set(key, value);
              } catch (e) {
                if (!omap) { omap = new OurWeakMap(); }
                omap.set___(key, value);
              }
            } else {
              hmap.set(key, value);
            }
            return this;
          };
        }

        function ddelete(key) {
          var result = !!hmap['delete'](key);
          if (omap) { return omap.delete___(key) || result; }
          return result;
        }

        return Object.create(OurWeakMap.prototype, {
          get___:    { value: constFunc(dget) },
          has___:    { value: constFunc(dhas) },
          set___:    { value: constFunc(dset) },
          delete___: { value: constFunc(ddelete) },
          permitHostObjects___: { value: constFunc(function(token) {
            if (token === weakMapPermitHostObjects) {
              enableSwitching = true;
            } else {
              throw new Error('bogus call to permitHostObjects___');
            }
          })}
        });
      }
      DoubleWeakMap.prototype = OurWeakMap.prototype;
      module.exports = DoubleWeakMap;

      // define .constructor to hide OurWeakMap ctor
      Object.defineProperty(WeakMap.prototype, 'constructor', {
        value: WeakMap,
        enumerable: false,  // as default .constructor is
        configurable: true,
        writable: true
      });
    })();
  } else {
    // There is no host WeakMap, so we must use the emulation.

    // Emulated WeakMaps are incompatible with native proxies (because proxies
    // can observe the hidden name), so we must disable Proxy usage (in
    // ArrayLike and Domado, currently).
    if (typeof Proxy !== 'undefined') {
      Proxy = undefined;
    }

    module.exports = OurWeakMap;
  }
})();


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pool = __webpack_require__(42)
var ops = __webpack_require__(49)
var ndarray = __webpack_require__(54)

var SUPPORTED_TYPES = [
  "uint8",
  "uint8_clamped",
  "uint16",
  "uint32",
  "int8",
  "int16",
  "int32",
  "float32" ]

function GLBuffer(gl, type, handle, length, usage) {
  this.gl = gl
  this.type = type
  this.handle = handle
  this.length = length
  this.usage = usage
}

var proto = GLBuffer.prototype

proto.bind = function() {
  this.gl.bindBuffer(this.type, this.handle)
}

proto.unbind = function() {
  this.gl.bindBuffer(this.type, null)
}

proto.dispose = function() {
  this.gl.deleteBuffer(this.handle)
}

function updateTypeArray(gl, type, len, usage, data, offset) {
  var dataLen = data.length * data.BYTES_PER_ELEMENT
  if(offset < 0) {
    gl.bufferData(type, data, usage)
    return dataLen
  }
  if(dataLen + offset > len) {
    throw new Error("gl-buffer: If resizing buffer, must not specify offset")
  }
  gl.bufferSubData(type, offset, data)
  return len
}

function makeScratchTypeArray(array, dtype) {
  var res = pool.malloc(array.length, dtype)
  var n = array.length
  for(var i=0; i<n; ++i) {
    res[i] = array[i]
  }
  return res
}

function isPacked(shape, stride) {
  var n = 1
  for(var i=stride.length-1; i>=0; --i) {
    if(stride[i] !== n) {
      return false
    }
    n *= shape[i]
  }
  return true
}

proto.update = function(array, offset) {
  if(typeof offset !== "number") {
    offset = -1
  }
  this.bind()
  if(typeof array === "object" && typeof array.shape !== "undefined") { //ndarray
    var dtype = array.dtype
    if(SUPPORTED_TYPES.indexOf(dtype) < 0) {
      dtype = "float32"
    }
    if(this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
      var ext = gl.getExtension('OES_element_index_uint')
      if(ext && dtype !== "uint16") {
        dtype = "uint32"
      } else {
        dtype = "uint16"
      }
    }
    if(dtype === array.dtype && isPacked(array.shape, array.stride)) {
      if(array.offset === 0 && array.data.length === array.shape[0]) {
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data, offset)
      } else {
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array.data.subarray(array.offset, array.shape[0]), offset)
      }
    } else {
      var tmp = pool.malloc(array.size, dtype)
      var ndt = ndarray(tmp, array.shape)
      ops.assign(ndt, array)
      if(offset < 0) {
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, tmp, offset)
      } else {
        this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, tmp.subarray(0, array.size), offset)
      }
      pool.free(tmp)
    }
  } else if(Array.isArray(array)) { //Vanilla array
    var t
    if(this.type === this.gl.ELEMENT_ARRAY_BUFFER) {
      t = makeScratchTypeArray(array, "uint16")
    } else {
      t = makeScratchTypeArray(array, "float32")
    }
    if(offset < 0) {
      this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t, offset)
    } else {
      this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, t.subarray(0, array.length), offset)
    }
    pool.free(t)
  } else if(typeof array === "object" && typeof array.length === "number") { //Typed array
    this.length = updateTypeArray(this.gl, this.type, this.length, this.usage, array, offset)
  } else if(typeof array === "number" || array === undefined) { //Number/default
    if(offset >= 0) {
      throw new Error("gl-buffer: Cannot specify offset when resizing buffer")
    }
    array = array | 0
    if(array <= 0) {
      array = 1
    }
    this.gl.bufferData(this.type, array|0, this.usage)
    this.length = array
  } else { //Error, case should not happen
    throw new Error("gl-buffer: Invalid data type")
  }
}

function createBuffer(gl, data, type, usage) {
  type = type || gl.ARRAY_BUFFER
  usage = usage || gl.DYNAMIC_DRAW
  if(type !== gl.ARRAY_BUFFER && type !== gl.ELEMENT_ARRAY_BUFFER) {
    throw new Error("gl-buffer: Invalid type for webgl buffer, must be either gl.ARRAY_BUFFER or gl.ELEMENT_ARRAY_BUFFER")
  }
  if(usage !== gl.DYNAMIC_DRAW && usage !== gl.STATIC_DRAW && usage !== gl.STREAM_DRAW) {
    throw new Error("gl-buffer: Invalid usage for buffer, must be either gl.DYNAMIC_DRAW, gl.STATIC_DRAW or gl.STREAM_DRAW")
  }
  var handle = gl.createBuffer()
  var result = new GLBuffer(gl, type, handle, 0, usage)
  result.update(data)
  return result
}

module.exports = createBuffer


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {

var bits = __webpack_require__(47)
var dup = __webpack_require__(48)

//Legacy pool support
if(!global.__TYPEDARRAY_POOL) {
  global.__TYPEDARRAY_POOL = {
      UINT8   : dup([32, 0])
    , UINT16  : dup([32, 0])
    , UINT32  : dup([32, 0])
    , INT8    : dup([32, 0])
    , INT16   : dup([32, 0])
    , INT32   : dup([32, 0])
    , FLOAT   : dup([32, 0])
    , DOUBLE  : dup([32, 0])
    , DATA    : dup([32, 0])
    , UINT8C  : dup([32, 0])
    , BUFFER  : dup([32, 0])
  }
}

var hasUint8C = (typeof Uint8ClampedArray) !== 'undefined'
var POOL = global.__TYPEDARRAY_POOL

//Upgrade pool
if(!POOL.UINT8C) {
  POOL.UINT8C = dup([32, 0])
}
if(!POOL.BUFFER) {
  POOL.BUFFER = dup([32, 0])
}

//New technique: Only allocate from ArrayBufferView and Buffer
var DATA    = POOL.DATA
  , BUFFER  = POOL.BUFFER

exports.free = function free(array) {
  if(Buffer.isBuffer(array)) {
    BUFFER[bits.log2(array.length)].push(array)
  } else {
    if(Object.prototype.toString.call(array) !== '[object ArrayBuffer]') {
      array = array.buffer
    }
    if(!array) {
      return
    }
    var n = array.length || array.byteLength
    var log_n = bits.log2(n)|0
    DATA[log_n].push(array)
  }
}

function freeArrayBuffer(buffer) {
  if(!buffer) {
    return
  }
  var n = buffer.length || buffer.byteLength
  var log_n = bits.log2(n)
  DATA[log_n].push(buffer)
}

function freeTypedArray(array) {
  freeArrayBuffer(array.buffer)
}

exports.freeUint8 =
exports.freeUint16 =
exports.freeUint32 =
exports.freeInt8 =
exports.freeInt16 =
exports.freeInt32 =
exports.freeFloat32 = 
exports.freeFloat =
exports.freeFloat64 = 
exports.freeDouble = 
exports.freeUint8Clamped = 
exports.freeDataView = freeTypedArray

exports.freeArrayBuffer = freeArrayBuffer

exports.freeBuffer = function freeBuffer(array) {
  BUFFER[bits.log2(array.length)].push(array)
}

exports.malloc = function malloc(n, dtype) {
  if(dtype === undefined || dtype === 'arraybuffer') {
    return mallocArrayBuffer(n)
  } else {
    switch(dtype) {
      case 'uint8':
        return mallocUint8(n)
      case 'uint16':
        return mallocUint16(n)
      case 'uint32':
        return mallocUint32(n)
      case 'int8':
        return mallocInt8(n)
      case 'int16':
        return mallocInt16(n)
      case 'int32':
        return mallocInt32(n)
      case 'float':
      case 'float32':
        return mallocFloat(n)
      case 'double':
      case 'float64':
        return mallocDouble(n)
      case 'uint8_clamped':
        return mallocUint8Clamped(n)
      case 'buffer':
        return mallocBuffer(n)
      case 'data':
      case 'dataview':
        return mallocDataView(n)

      default:
        return null
    }
  }
  return null
}

function mallocArrayBuffer(n) {
  var n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var d = DATA[log_n]
  if(d.length > 0) {
    return d.pop()
  }
  return new ArrayBuffer(n)
}
exports.mallocArrayBuffer = mallocArrayBuffer

function mallocUint8(n) {
  return new Uint8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocUint8 = mallocUint8

function mallocUint16(n) {
  return new Uint16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocUint16 = mallocUint16

function mallocUint32(n) {
  return new Uint32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocUint32 = mallocUint32

function mallocInt8(n) {
  return new Int8Array(mallocArrayBuffer(n), 0, n)
}
exports.mallocInt8 = mallocInt8

function mallocInt16(n) {
  return new Int16Array(mallocArrayBuffer(2*n), 0, n)
}
exports.mallocInt16 = mallocInt16

function mallocInt32(n) {
  return new Int32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocInt32 = mallocInt32

function mallocFloat(n) {
  return new Float32Array(mallocArrayBuffer(4*n), 0, n)
}
exports.mallocFloat32 = exports.mallocFloat = mallocFloat

function mallocDouble(n) {
  return new Float64Array(mallocArrayBuffer(8*n), 0, n)
}
exports.mallocFloat64 = exports.mallocDouble = mallocDouble

function mallocUint8Clamped(n) {
  if(hasUint8C) {
    return new Uint8ClampedArray(mallocArrayBuffer(n), 0, n)
  } else {
    return mallocUint8(n)
  }
}
exports.mallocUint8Clamped = mallocUint8Clamped

function mallocDataView(n) {
  return new DataView(mallocArrayBuffer(n), 0, n)
}
exports.mallocDataView = mallocDataView

function mallocBuffer(n) {
  n = bits.nextPow2(n)
  var log_n = bits.log2(n)
  var cache = BUFFER[log_n]
  if(cache.length > 0) {
    return cache.pop()
  }
  return new Buffer(n)
}
exports.mallocBuffer = mallocBuffer

exports.clearCache = function clearCache() {
  for(var i=0; i<32; ++i) {
    POOL.UINT8[i].length = 0
    POOL.UINT16[i].length = 0
    POOL.UINT32[i].length = 0
    POOL.INT8[i].length = 0
    POOL.INT16[i].length = 0
    POOL.INT32[i].length = 0
    POOL.FLOAT[i].length = 0
    POOL.DOUBLE[i].length = 0
    POOL.UINT8C[i].length = 0
    DATA[i].length = 0
    BUFFER[i].length = 0
  }
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(43).Buffer))

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(44)
var ieee754 = __webpack_require__(45)
var isArray = __webpack_require__(46)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 45 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 46 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Bit twiddling hacks for JavaScript.
 *
 * Author: Mikola Lysenko
 *
 * Ported from Stanford bit twiddling hack library:
 *    http://graphics.stanford.edu/~seander/bithacks.html
 */

 "use restrict";

//Number of bits in an integer
var INT_BITS = 32;

//Constants
exports.INT_BITS  = INT_BITS;
exports.INT_MAX   =  0x7fffffff;
exports.INT_MIN   = -1<<(INT_BITS-1);

//Returns -1, 0, +1 depending on sign of x
exports.sign = function(v) {
  return (v > 0) - (v < 0);
}

//Computes absolute value of integer
exports.abs = function(v) {
  var mask = v >> (INT_BITS-1);
  return (v ^ mask) - mask;
}

//Computes minimum of integers x and y
exports.min = function(x, y) {
  return y ^ ((x ^ y) & -(x < y));
}

//Computes maximum of integers x and y
exports.max = function(x, y) {
  return x ^ ((x ^ y) & -(x < y));
}

//Checks if a number is a power of two
exports.isPow2 = function(v) {
  return !(v & (v-1)) && (!!v);
}

//Computes log base 2 of v
exports.log2 = function(v) {
  var r, shift;
  r =     (v > 0xFFFF) << 4; v >>>= r;
  shift = (v > 0xFF  ) << 3; v >>>= shift; r |= shift;
  shift = (v > 0xF   ) << 2; v >>>= shift; r |= shift;
  shift = (v > 0x3   ) << 1; v >>>= shift; r |= shift;
  return r | (v >> 1);
}

//Computes log base 10 of v
exports.log10 = function(v) {
  return  (v >= 1000000000) ? 9 : (v >= 100000000) ? 8 : (v >= 10000000) ? 7 :
          (v >= 1000000) ? 6 : (v >= 100000) ? 5 : (v >= 10000) ? 4 :
          (v >= 1000) ? 3 : (v >= 100) ? 2 : (v >= 10) ? 1 : 0;
}

//Counts number of bits
exports.popCount = function(v) {
  v = v - ((v >>> 1) & 0x55555555);
  v = (v & 0x33333333) + ((v >>> 2) & 0x33333333);
  return ((v + (v >>> 4) & 0xF0F0F0F) * 0x1010101) >>> 24;
}

//Counts number of trailing zeros
function countTrailingZeros(v) {
  var c = 32;
  v &= -v;
  if (v) c--;
  if (v & 0x0000FFFF) c -= 16;
  if (v & 0x00FF00FF) c -= 8;
  if (v & 0x0F0F0F0F) c -= 4;
  if (v & 0x33333333) c -= 2;
  if (v & 0x55555555) c -= 1;
  return c;
}
exports.countTrailingZeros = countTrailingZeros;

//Rounds to next power of 2
exports.nextPow2 = function(v) {
  v += v === 0;
  --v;
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v + 1;
}

//Rounds down to previous power of 2
exports.prevPow2 = function(v) {
  v |= v >>> 1;
  v |= v >>> 2;
  v |= v >>> 4;
  v |= v >>> 8;
  v |= v >>> 16;
  return v - (v>>>1);
}

//Computes parity of word
exports.parity = function(v) {
  v ^= v >>> 16;
  v ^= v >>> 8;
  v ^= v >>> 4;
  v &= 0xf;
  return (0x6996 >>> v) & 1;
}

var REVERSE_TABLE = new Array(256);

(function(tab) {
  for(var i=0; i<256; ++i) {
    var v = i, r = i, s = 7;
    for (v >>>= 1; v; v >>>= 1) {
      r <<= 1;
      r |= v & 1;
      --s;
    }
    tab[i] = (r << s) & 0xff;
  }
})(REVERSE_TABLE);

//Reverse bits in a 32 bit word
exports.reverse = function(v) {
  return  (REVERSE_TABLE[ v         & 0xff] << 24) |
          (REVERSE_TABLE[(v >>> 8)  & 0xff] << 16) |
          (REVERSE_TABLE[(v >>> 16) & 0xff] << 8)  |
           REVERSE_TABLE[(v >>> 24) & 0xff];
}

//Interleave bits of 2 coordinates with 16 bits.  Useful for fast quadtree codes
exports.interleave2 = function(x, y) {
  x &= 0xFFFF;
  x = (x | (x << 8)) & 0x00FF00FF;
  x = (x | (x << 4)) & 0x0F0F0F0F;
  x = (x | (x << 2)) & 0x33333333;
  x = (x | (x << 1)) & 0x55555555;

  y &= 0xFFFF;
  y = (y | (y << 8)) & 0x00FF00FF;
  y = (y | (y << 4)) & 0x0F0F0F0F;
  y = (y | (y << 2)) & 0x33333333;
  y = (y | (y << 1)) & 0x55555555;

  return x | (y << 1);
}

//Extracts the nth interleaved component
exports.deinterleave2 = function(v, n) {
  v = (v >>> n) & 0x55555555;
  v = (v | (v >>> 1))  & 0x33333333;
  v = (v | (v >>> 2))  & 0x0F0F0F0F;
  v = (v | (v >>> 4))  & 0x00FF00FF;
  v = (v | (v >>> 16)) & 0x000FFFF;
  return (v << 16) >> 16;
}


//Interleave bits of 3 coordinates, each with 10 bits.  Useful for fast octree codes
exports.interleave3 = function(x, y, z) {
  x &= 0x3FF;
  x  = (x | (x<<16)) & 4278190335;
  x  = (x | (x<<8))  & 251719695;
  x  = (x | (x<<4))  & 3272356035;
  x  = (x | (x<<2))  & 1227133513;

  y &= 0x3FF;
  y  = (y | (y<<16)) & 4278190335;
  y  = (y | (y<<8))  & 251719695;
  y  = (y | (y<<4))  & 3272356035;
  y  = (y | (y<<2))  & 1227133513;
  x |= (y << 1);
  
  z &= 0x3FF;
  z  = (z | (z<<16)) & 4278190335;
  z  = (z | (z<<8))  & 251719695;
  z  = (z | (z<<4))  & 3272356035;
  z  = (z | (z<<2))  & 1227133513;
  
  return x | (z << 2);
}

//Extracts nth interleaved component of a 3-tuple
exports.deinterleave3 = function(v, n) {
  v = (v >>> n)       & 1227133513;
  v = (v | (v>>>2))   & 3272356035;
  v = (v | (v>>>4))   & 251719695;
  v = (v | (v>>>8))   & 4278190335;
  v = (v | (v>>>16))  & 0x3FF;
  return (v<<22)>>22;
}

//Computes next combination in colexicographic order (this is mistakenly called nextPermutation on the bit twiddling hacks page)
exports.nextCombination = function(v) {
  var t = v | (v - 1);
  return (t + 1) | (((~t & -~t) - 1) >>> (countTrailingZeros(v) + 1));
}



/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function dupe_array(count, value, i) {
  var c = count[i]|0
  if(c <= 0) {
    return []
  }
  var result = new Array(c), j
  if(i === count.length-1) {
    for(j=0; j<c; ++j) {
      result[j] = value
    }
  } else {
    for(j=0; j<c; ++j) {
      result[j] = dupe_array(count, value, i+1)
    }
  }
  return result
}

function dupe_number(count, value) {
  var result, i
  result = new Array(count)
  for(i=0; i<count; ++i) {
    result[i] = value
  }
  return result
}

function dupe(count, value) {
  if(typeof value === "undefined") {
    value = 0
  }
  switch(typeof count) {
    case "number":
      if(count > 0) {
        return dupe_number(count|0, value)
      }
    break
    case "object":
      if(typeof (count.length) === "number") {
        return dupe_array(count, value, 0)
      }
    break
  }
  return []
}

module.exports = dupe

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compile = __webpack_require__(50)

var EmptyProc = {
  body: "",
  args: [],
  thisVars: [],
  localVars: []
}

function fixup(x) {
  if(!x) {
    return EmptyProc
  }
  for(var i=0; i<x.args.length; ++i) {
    var a = x.args[i]
    if(i === 0) {
      x.args[i] = {name: a, lvalue:true, rvalue: !!x.rvalue, count:x.count||1 }
    } else {
      x.args[i] = {name: a, lvalue:false, rvalue:true, count: 1}
    }
  }
  if(!x.thisVars) {
    x.thisVars = []
  }
  if(!x.localVars) {
    x.localVars = []
  }
  return x
}

function pcompile(user_args) {
  return compile({
    args:     user_args.args,
    pre:      fixup(user_args.pre),
    body:     fixup(user_args.body),
    post:     fixup(user_args.proc),
    funcName: user_args.funcName
  })
}

function makeOp(user_args) {
  var args = []
  for(var i=0; i<user_args.args.length; ++i) {
    args.push("a"+i)
  }
  var wrapper = new Function("P", [
    "return function ", user_args.funcName, "_ndarrayops(", args.join(","), ") {P(", args.join(","), ");return a0}"
  ].join(""))
  return wrapper(pcompile(user_args))
}

var assign_ops = {
  add:  "+",
  sub:  "-",
  mul:  "*",
  div:  "/",
  mod:  "%",
  band: "&",
  bor:  "|",
  bxor: "^",
  lshift: "<<",
  rshift: ">>",
  rrshift: ">>>"
}
;(function(){
  for(var id in assign_ops) {
    var op = assign_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a","b","c"],
             body: "a=b"+op+"c"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array","array"],
      body: {args:["a","b"],
             body:"a"+op+"=b"},
      rvalue: true,
      funcName: id+"eq"
    })
    exports[id+"s"] = makeOp({
      args: ["array", "array", "scalar"],
      body: {args:["a","b","s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"seq"] = makeOp({
      args: ["array","scalar"],
      body: {args:["a","s"],
             body:"a"+op+"=s"},
      rvalue: true,
      funcName: id+"seq"
    })
  }
})();

var unary_ops = {
  not: "!",
  bnot: "~",
  neg: "-",
  recip: "1.0/"
}
;(function(){
  for(var id in unary_ops) {
    var op = unary_ops[id]
    exports[id] = makeOp({
      args: ["array", "array"],
      body: {args:["a","b"],
             body:"a="+op+"b"},
      funcName: id
    })
    exports[id+"eq"] = makeOp({
      args: ["array"],
      body: {args:["a"],
             body:"a="+op+"a"},
      rvalue: true,
      count: 2,
      funcName: id+"eq"
    })
  }
})();

var binary_ops = {
  and: "&&",
  or: "||",
  eq: "===",
  neq: "!==",
  lt: "<",
  gt: ">",
  leq: "<=",
  geq: ">="
}
;(function() {
  for(var id in binary_ops) {
    var op = binary_ops[id]
    exports[id] = makeOp({
      args: ["array","array","array"],
      body: {args:["a", "b", "c"],
             body:"a=b"+op+"c"},
      funcName: id
    })
    exports[id+"s"] = makeOp({
      args: ["array","array","scalar"],
      body: {args:["a", "b", "s"],
             body:"a=b"+op+"s"},
      funcName: id+"s"
    })
    exports[id+"eq"] = makeOp({
      args: ["array", "array"],
      body: {args:["a", "b"],
             body:"a=a"+op+"b"},
      rvalue:true,
      count:2,
      funcName: id+"eq"
    })
    exports[id+"seq"] = makeOp({
      args: ["array", "scalar"],
      body: {args:["a","s"],
             body:"a=a"+op+"s"},
      rvalue:true,
      count:2,
      funcName: id+"seq"
    })
  }
})();

var math_unary = [
  "abs",
  "acos",
  "asin",
  "atan",
  "ceil",
  "cos",
  "exp",
  "floor",
  "log",
  "round",
  "sin",
  "sqrt",
  "tan"
]
;(function() {
  for(var i=0; i<math_unary.length; ++i) {
    var f = math_unary[i]
    exports[f] = makeOp({
                    args: ["array", "array"],
                    pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                    body: {args:["a","b"], body:"a=this_f(b)", thisVars:["this_f"]},
                    funcName: f
                  })
    exports[f+"eq"] = makeOp({
                      args: ["array"],
                      pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                      body: {args: ["a"], body:"a=this_f(a)", thisVars:["this_f"]},
                      rvalue: true,
                      count: 2,
                      funcName: f+"eq"
                    })
  }
})();

var math_comm = [
  "max",
  "min",
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_comm.length; ++i) {
    var f= math_comm[i]
    exports[f] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f
                })
    exports[f+"s"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(b,c)", thisVars:["this_f"]},
                  funcName: f+"s"
                  })
    exports[f+"eq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"eq"
                  })
    exports[f+"seq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(a,b)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"seq"
                  })
  }
})();

var math_noncomm = [
  "atan2",
  "pow"
]
;(function(){
  for(var i=0; i<math_noncomm.length; ++i) {
    var f= math_noncomm[i]
    exports[f+"op"] = makeOp({
                  args:["array", "array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"op"
                })
    exports[f+"ops"] = makeOp({
                  args:["array", "array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b","c"], body:"a=this_f(c,b)", thisVars:["this_f"]},
                  funcName: f+"ops"
                  })
    exports[f+"opeq"] = makeOp({ args:["array", "array"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue: true,
                  count: 2,
                  funcName: f+"opeq"
                  })
    exports[f+"opseq"] = makeOp({ args:["array", "scalar"],
                  pre: {args:[], body:"this_f=Math."+f, thisVars:["this_f"]},
                  body: {args:["a","b"], body:"a=this_f(b,a)", thisVars:["this_f"]},
                  rvalue:true,
                  count:2,
                  funcName: f+"opseq"
                  })
  }
})();

exports.any = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "if(a){return true}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return false"},
  funcName: "any"
})

exports.all = compile({
  args:["array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1}], body: "if(!x){return false}", localVars: [], thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "all"
})

exports.sum = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s+=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "sum"
})

exports.prod = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=1"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:1}], body: "this_s*=a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "prod"
})

exports.norm2squared = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm2squared"
})
  
exports.norm2 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:2}], body: "this_s+=a*a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return Math.sqrt(this_s)"},
  funcName: "norm2"
})
  

exports.norminf = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:4}], body:"if(-a>this_s){this_s=-a}else if(a>this_s){this_s=a}", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norminf"
})

exports.norm1 = compile({
  args:["array"],
  pre: {args:[], localVars:[], thisVars:["this_s"], body:"this_s=0"},
  body: {args:[{name:"a", lvalue:false, rvalue:true, count:3}], body: "this_s+=a<0?-a:a", localVars: [], thisVars: ["this_s"]},
  post: {args:[], localVars:[], thisVars:["this_s"], body:"return this_s"},
  funcName: "norm1"
})

exports.sup = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=-Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_>this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.inf = compile({
  args: [ "array" ],
  pre:
   { body: "this_h=Infinity",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] },
  body:
   { body: "if(_inline_1_arg0_<this_h)this_h=_inline_1_arg0_",
     args: [{"name":"_inline_1_arg0_","lvalue":false,"rvalue":true,"count":2} ],
     thisVars: [ "this_h" ],
     localVars: [] },
  post:
   { body: "return this_h",
     args: [],
     thisVars: [ "this_h" ],
     localVars: [] }
 })

exports.argmin = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_<this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})

exports.argmax = compile({
  args:["index","array","shape"],
  pre:{
    body:"{this_v=-Infinity;this_i=_inline_0_arg2_.slice(0)}",
    args:[
      {name:"_inline_0_arg0_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg1_",lvalue:false,rvalue:false,count:0},
      {name:"_inline_0_arg2_",lvalue:false,rvalue:true,count:1}
      ],
    thisVars:["this_i","this_v"],
    localVars:[]},
  body:{
    body:"{if(_inline_1_arg1_>this_v){this_v=_inline_1_arg1_;for(var _inline_1_k=0;_inline_1_k<_inline_1_arg0_.length;++_inline_1_k){this_i[_inline_1_k]=_inline_1_arg0_[_inline_1_k]}}}",
    args:[
      {name:"_inline_1_arg0_",lvalue:false,rvalue:true,count:2},
      {name:"_inline_1_arg1_",lvalue:false,rvalue:true,count:2}],
    thisVars:["this_i","this_v"],
    localVars:["_inline_1_k"]},
  post:{
    body:"{return this_i}",
    args:[],
    thisVars:["this_i"],
    localVars:[]}
})  

exports.random = makeOp({
  args: ["array"],
  pre: {args:[], body:"this_f=Math.random", thisVars:["this_f"]},
  body: {args: ["a"], body:"a=this_f()", thisVars:["this_f"]},
  funcName: "random"
})

exports.assign = makeOp({
  args:["array", "array"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assign" })

exports.assigns = makeOp({
  args:["array", "scalar"],
  body: {args:["a", "b"], body:"a=b"},
  funcName: "assigns" })


exports.equals = compile({
  args:["array", "array"],
  pre: EmptyProc,
  body: {args:[{name:"x", lvalue:false, rvalue:true, count:1},
               {name:"y", lvalue:false, rvalue:true, count:1}], 
        body: "if(x!==y){return false}", 
        localVars: [], 
        thisVars: []},
  post: {args:[], localVars:[], thisVars:[], body:"return true"},
  funcName: "equals"
})




/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createThunk = __webpack_require__(51)

function Procedure() {
  this.argTypes = []
  this.shimArgs = []
  this.arrayArgs = []
  this.arrayBlockIndices = []
  this.scalarArgs = []
  this.offsetArgs = []
  this.offsetArgIndex = []
  this.indexArgs = []
  this.shapeArgs = []
  this.funcName = ""
  this.pre = null
  this.body = null
  this.post = null
  this.debug = false
}

function compileCwise(user_args) {
  //Create procedure
  var proc = new Procedure()
  
  //Parse blocks
  proc.pre    = user_args.pre
  proc.body   = user_args.body
  proc.post   = user_args.post

  //Parse arguments
  var proc_args = user_args.args.slice(0)
  proc.argTypes = proc_args
  for(var i=0; i<proc_args.length; ++i) {
    var arg_type = proc_args[i]
    if(arg_type === "array" || (typeof arg_type === "object" && arg_type.blockIndices)) {
      proc.argTypes[i] = "array"
      proc.arrayArgs.push(i)
      proc.arrayBlockIndices.push(arg_type.blockIndices ? arg_type.blockIndices : 0)
      proc.shimArgs.push("array" + i)
      if(i < proc.pre.args.length && proc.pre.args[i].count>0) {
        throw new Error("cwise: pre() block may not reference array args")
      }
      if(i < proc.post.args.length && proc.post.args[i].count>0) {
        throw new Error("cwise: post() block may not reference array args")
      }
    } else if(arg_type === "scalar") {
      proc.scalarArgs.push(i)
      proc.shimArgs.push("scalar" + i)
    } else if(arg_type === "index") {
      proc.indexArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].count > 0) {
        throw new Error("cwise: pre() block may not reference array index")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array index")
      }
      if(i < proc.post.args.length && proc.post.args[i].count > 0) {
        throw new Error("cwise: post() block may not reference array index")
      }
    } else if(arg_type === "shape") {
      proc.shapeArgs.push(i)
      if(i < proc.pre.args.length && proc.pre.args[i].lvalue) {
        throw new Error("cwise: pre() block may not write to array shape")
      }
      if(i < proc.body.args.length && proc.body.args[i].lvalue) {
        throw new Error("cwise: body() block may not write to array shape")
      }
      if(i < proc.post.args.length && proc.post.args[i].lvalue) {
        throw new Error("cwise: post() block may not write to array shape")
      }
    } else if(typeof arg_type === "object" && arg_type.offset) {
      proc.argTypes[i] = "offset"
      proc.offsetArgs.push({ array: arg_type.array, offset:arg_type.offset })
      proc.offsetArgIndex.push(i)
    } else {
      throw new Error("cwise: Unknown argument type " + proc_args[i])
    }
  }
  
  //Make sure at least one array argument was specified
  if(proc.arrayArgs.length <= 0) {
    throw new Error("cwise: No array arguments specified")
  }
  
  //Make sure arguments are correct
  if(proc.pre.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in pre() block")
  }
  if(proc.body.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in body() block")
  }
  if(proc.post.args.length > proc_args.length) {
    throw new Error("cwise: Too many arguments in post() block")
  }

  //Check debug flag
  proc.debug = !!user_args.printCode || !!user_args.debug
  
  //Retrieve name
  proc.funcName = user_args.funcName || "cwise"
  
  //Read in block size
  proc.blockSize = user_args.blockSize || 64

  return createThunk(proc)
}

module.exports = compileCwise


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// The function below is called when constructing a cwise function object, and does the following:
// A function object is constructed which accepts as argument a compilation function and returns another function.
// It is this other function that is eventually returned by createThunk, and this function is the one that actually
// checks whether a certain pattern of arguments has already been used before and compiles new loops as needed.
// The compilation passed to the first function object is used for compiling new functions.
// Once this function object is created, it is called with compile as argument, where the first argument of compile
// is bound to "proc" (essentially containing a preprocessed version of the user arguments to cwise).
// So createThunk roughly works like this:
// function createThunk(proc) {
//   var thunk = function(compileBound) {
//     var CACHED = {}
//     return function(arrays and scalars) {
//       if (dtype and order of arrays in CACHED) {
//         var func = CACHED[dtype and order of arrays]
//       } else {
//         var func = CACHED[dtype and order of arrays] = compileBound(dtype and order of arrays)
//       }
//       return func(arrays and scalars)
//     }
//   }
//   return thunk(compile.bind1(proc))
// }

var compile = __webpack_require__(52)

function createThunk(proc) {
  var code = ["'use strict'", "var CACHED={}"]
  var vars = []
  var thunkName = proc.funcName + "_cwise_thunk"
  
  //Build thunk
  code.push(["return function ", thunkName, "(", proc.shimArgs.join(","), "){"].join(""))
  var typesig = []
  var string_typesig = []
  var proc_args = [["array",proc.arrayArgs[0],".shape.slice(", // Slice shape so that we only retain the shape over which we iterate (which gets passed to the cwise operator as SS).
                    Math.max(0,proc.arrayBlockIndices[0]),proc.arrayBlockIndices[0]<0?(","+proc.arrayBlockIndices[0]+")"):")"].join("")]
  var shapeLengthConditions = [], shapeConditions = []
  // Process array arguments
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    var j = proc.arrayArgs[i]
    vars.push(["t", j, "=array", j, ".dtype,",
               "r", j, "=array", j, ".order"].join(""))
    typesig.push("t" + j)
    typesig.push("r" + j)
    string_typesig.push("t"+j)
    string_typesig.push("r"+j+".join()")
    proc_args.push("array" + j + ".data")
    proc_args.push("array" + j + ".stride")
    proc_args.push("array" + j + ".offset|0")
    if (i>0) { // Gather conditions to check for shape equality (ignoring block indices)
      shapeLengthConditions.push("array" + proc.arrayArgs[0] + ".shape.length===array" + j + ".shape.length+" + (Math.abs(proc.arrayBlockIndices[0])-Math.abs(proc.arrayBlockIndices[i])))
      shapeConditions.push("array" + proc.arrayArgs[0] + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[0]) + "]===array" + j + ".shape[shapeIndex+" + Math.max(0,proc.arrayBlockIndices[i]) + "]")
    }
  }
  // Check for shape equality
  if (proc.arrayArgs.length > 1) {
    code.push("if (!(" + shapeLengthConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same dimensionality!')")
    code.push("for(var shapeIndex=array" + proc.arrayArgs[0] + ".shape.length-" + Math.abs(proc.arrayBlockIndices[0]) + "; shapeIndex-->0;) {")
    code.push("if (!(" + shapeConditions.join(" && ") + ")) throw new Error('cwise: Arrays do not all have the same shape!')")
    code.push("}")
  }
  // Process scalar arguments
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    proc_args.push("scalar" + proc.scalarArgs[i])
  }
  // Check for cached function (and if not present, generate it)
  vars.push(["type=[", string_typesig.join(","), "].join()"].join(""))
  vars.push("proc=CACHED[type]")
  code.push("var " + vars.join(","))
  
  code.push(["if(!proc){",
             "CACHED[type]=proc=compile([", typesig.join(","), "])}",
             "return proc(", proc_args.join(","), ")}"].join(""))

  if(proc.debug) {
    console.log("-----Generated thunk:\n" + code.join("\n") + "\n----------")
  }
  
  //Compile thunk
  var thunk = new Function("compile", code.join("\n"))
  return thunk(compile.bind(undefined, proc))
}

module.exports = createThunk


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uniq = __webpack_require__(53)

// This function generates very simple loops analogous to how you typically traverse arrays (the outermost loop corresponds to the slowest changing index, the innermost loop to the fastest changing index)
// TODO: If two arrays have the same strides (and offsets) there is potential for decreasing the number of "pointers" and related variables. The drawback is that the type signature would become more specific and that there would thus be less potential for caching, but it might still be worth it, especially when dealing with large numbers of arguments.
function innerFill(order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , has_index = proc.indexArgs.length>0
    , code = []
    , vars = []
    , idx=0, pidx=0, i, j
  for(i=0; i<dimension; ++i) { // Iteration variables
    vars.push(["i",i,"=0"].join(""))
  }
  //Compute scan deltas
  for(j=0; j<nargs; ++j) {
    for(i=0; i<dimension; ++i) {
      pidx = idx
      idx = order[i]
      if(i === 0) { // The innermost/fastest dimension's delta is simply its stride
        vars.push(["d",j,"s",i,"=t",j,"p",idx].join(""))
      } else { // For other dimensions the delta is basically the stride minus something which essentially "rewinds" the previous (more inner) dimension
        vars.push(["d",j,"s",i,"=(t",j,"p",idx,"-s",pidx,"*t",j,"p",pidx,")"].join(""))
      }
    }
  }
  if (vars.length > 0) {
    code.push("var " + vars.join(","))
  }  
  //Scan loop
  for(i=dimension-1; i>=0; --i) { // Start at largest stride and work your way inwards
    idx = order[i]
    code.push(["for(i",i,"=0;i",i,"<s",idx,";++i",i,"){"].join(""))
  }
  //Push body of inner loop
  code.push(body)
  //Advance scan pointers
  for(i=0; i<dimension; ++i) {
    pidx = idx
    idx = order[i]
    for(j=0; j<nargs; ++j) {
      code.push(["p",j,"+=d",j,"s",i].join(""))
    }
    if(has_index) {
      if(i > 0) {
        code.push(["index[",pidx,"]-=s",pidx].join(""))
      }
      code.push(["++index[",idx,"]"].join(""))
    }
    code.push("}")
  }
  return code.join("\n")
}

// Generate "outer" loops that loop over blocks of data, applying "inner" loops to the blocks by manipulating the local variables in such a way that the inner loop only "sees" the current block.
// TODO: If this is used, then the previous declaration (done by generateCwiseOp) of s* is essentially unnecessary.
//       I believe the s* are not used elsewhere (in particular, I don't think they're used in the pre/post parts and "shape" is defined independently), so it would be possible to make defining the s* dependent on what loop method is being used.
function outerFill(matched, order, proc, body) {
  var dimension = order.length
    , nargs = proc.arrayArgs.length
    , blockSize = proc.blockSize
    , has_index = proc.indexArgs.length > 0
    , code = []
  for(var i=0; i<nargs; ++i) {
    code.push(["var offset",i,"=p",i].join(""))
  }
  //Generate loops for unmatched dimensions
  // The order in which these dimensions are traversed is fairly arbitrary (from small stride to large stride, for the first argument)
  // TODO: It would be nice if the order in which these loops are placed would also be somehow "optimal" (at the very least we should check that it really doesn't hurt us if they're not).
  for(var i=matched; i<dimension; ++i) {
    code.push(["for(var j"+i+"=SS[", order[i], "]|0;j", i, ">0;){"].join("")) // Iterate back to front
    code.push(["if(j",i,"<",blockSize,"){"].join("")) // Either decrease j by blockSize (s = blockSize), or set it to zero (after setting s = j).
    code.push(["s",order[i],"=j",i].join(""))
    code.push(["j",i,"=0"].join(""))
    code.push(["}else{s",order[i],"=",blockSize].join(""))
    code.push(["j",i,"-=",blockSize,"}"].join(""))
    if(has_index) {
      code.push(["index[",order[i],"]=j",i].join(""))
    }
  }
  for(var i=0; i<nargs; ++i) {
    var indexStr = ["offset"+i]
    for(var j=matched; j<dimension; ++j) {
      indexStr.push(["j",j,"*t",i,"p",order[j]].join(""))
    }
    code.push(["p",i,"=(",indexStr.join("+"),")"].join(""))
  }
  code.push(innerFill(order, proc, body))
  for(var i=matched; i<dimension; ++i) {
    code.push("}")
  }
  return code.join("\n")
}

//Count the number of compatible inner orders
// This is the length of the longest common prefix of the arrays in orders.
// Each array in orders lists the dimensions of the correspond ndarray in order of increasing stride.
// This is thus the maximum number of dimensions that can be efficiently traversed by simple nested loops for all arrays.
function countMatches(orders) {
  var matched = 0, dimension = orders[0].length
  while(matched < dimension) {
    for(var j=1; j<orders.length; ++j) {
      if(orders[j][matched] !== orders[0][matched]) {
        return matched
      }
    }
    ++matched
  }
  return matched
}

//Processes a block according to the given data types
// Replaces variable names by different ones, either "local" ones (that are then ferried in and out of the given array) or ones matching the arguments that the function performing the ultimate loop will accept.
function processBlock(block, proc, dtypes) {
  var code = block.body
  var pre = []
  var post = []
  for(var i=0; i<block.args.length; ++i) {
    var carg = block.args[i]
    if(carg.count <= 0) {
      continue
    }
    var re = new RegExp(carg.name, "g")
    var ptrStr = ""
    var arrNum = proc.arrayArgs.indexOf(i)
    switch(proc.argTypes[i]) {
      case "offset":
        var offArgIndex = proc.offsetArgIndex.indexOf(i)
        var offArg = proc.offsetArgs[offArgIndex]
        arrNum = offArg.array
        ptrStr = "+q" + offArgIndex // Adds offset to the "pointer" in the array
      case "array":
        ptrStr = "p" + arrNum + ptrStr
        var localStr = "l" + i
        var arrStr = "a" + arrNum
        if (proc.arrayBlockIndices[arrNum] === 0) { // Argument to body is just a single value from this array
          if(carg.count === 1) { // Argument/array used only once(?)
            if(dtypes[arrNum] === "generic") {
              if(carg.lvalue) {
                pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
                code = code.replace(re, localStr)
                post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
              } else {
                code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
              }
            } else {
              code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
            }
          } else if(dtypes[arrNum] === "generic") {
            pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            }
          } else {
            pre.push(["var ", localStr, "=", arrStr, "[", ptrStr, "]"].join("")) // TODO: Could we optimize by checking for carg.rvalue?
            code = code.replace(re, localStr)
            if(carg.lvalue) {
              post.push([arrStr, "[", ptrStr, "]=", localStr].join(""))
            }
          }
        } else { // Argument to body is a "block"
          var reStrArr = [carg.name], ptrStrArr = [ptrStr]
          for(var j=0; j<Math.abs(proc.arrayBlockIndices[arrNum]); j++) {
            reStrArr.push("\\s*\\[([^\\]]+)\\]")
            ptrStrArr.push("$" + (j+1) + "*t" + arrNum + "b" + j) // Matched index times stride
          }
          re = new RegExp(reStrArr.join(""), "g")
          ptrStr = ptrStrArr.join("+")
          if(dtypes[arrNum] === "generic") {
            /*if(carg.lvalue) {
              pre.push(["var ", localStr, "=", arrStr, ".get(", ptrStr, ")"].join("")) // Is this necessary if the argument is ONLY used as an lvalue? (keep in mind that we can have a += something, so we would actually need to check carg.rvalue)
              code = code.replace(re, localStr)
              post.push([arrStr, ".set(", ptrStr, ",", localStr,")"].join(""))
            } else {
              code = code.replace(re, [arrStr, ".get(", ptrStr, ")"].join(""))
            }*/
            throw new Error("cwise: Generic arrays not supported in combination with blocks!")
          } else {
            // This does not produce any local variables, even if variables are used multiple times. It would be possible to do so, but it would complicate things quite a bit.
            code = code.replace(re, [arrStr, "[", ptrStr, "]"].join(""))
          }
        }
      break
      case "scalar":
        code = code.replace(re, "Y" + proc.scalarArgs.indexOf(i))
      break
      case "index":
        code = code.replace(re, "index")
      break
      case "shape":
        code = code.replace(re, "shape")
      break
    }
  }
  return [pre.join("\n"), code, post.join("\n")].join("\n").trim()
}

function typeSummary(dtypes) {
  var summary = new Array(dtypes.length)
  var allEqual = true
  for(var i=0; i<dtypes.length; ++i) {
    var t = dtypes[i]
    var digits = t.match(/\d+/)
    if(!digits) {
      digits = ""
    } else {
      digits = digits[0]
    }
    if(t.charAt(0) === 0) {
      summary[i] = "u" + t.charAt(1) + digits
    } else {
      summary[i] = t.charAt(0) + digits
    }
    if(i > 0) {
      allEqual = allEqual && summary[i] === summary[i-1]
    }
  }
  if(allEqual) {
    return summary[0]
  }
  return summary.join("")
}

//Generates a cwise operator
function generateCWiseOp(proc, typesig) {

  //Compute dimension
  // Arrays get put first in typesig, and there are two entries per array (dtype and order), so this gets the number of dimensions in the first array arg.
  var dimension = (typesig[1].length - Math.abs(proc.arrayBlockIndices[0]))|0
  var orders = new Array(proc.arrayArgs.length)
  var dtypes = new Array(proc.arrayArgs.length)
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    dtypes[i] = typesig[2*i]
    orders[i] = typesig[2*i+1]
  }
  
  //Determine where block and loop indices start and end
  var blockBegin = [], blockEnd = [] // These indices are exposed as blocks
  var loopBegin = [], loopEnd = [] // These indices are iterated over
  var loopOrders = [] // orders restricted to the loop indices
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    if (proc.arrayBlockIndices[i]<0) {
      loopBegin.push(0)
      loopEnd.push(dimension)
      blockBegin.push(dimension)
      blockEnd.push(dimension+proc.arrayBlockIndices[i])
    } else {
      loopBegin.push(proc.arrayBlockIndices[i]) // Non-negative
      loopEnd.push(proc.arrayBlockIndices[i]+dimension)
      blockBegin.push(0)
      blockEnd.push(proc.arrayBlockIndices[i])
    }
    var newOrder = []
    for(var j=0; j<orders[i].length; j++) {
      if (loopBegin[i]<=orders[i][j] && orders[i][j]<loopEnd[i]) {
        newOrder.push(orders[i][j]-loopBegin[i]) // If this is a loop index, put it in newOrder, subtracting loopBegin, to make sure that all loopOrders are using a common set of indices.
      }
    }
    loopOrders.push(newOrder)
  }

  //First create arguments for procedure
  var arglist = ["SS"] // SS is the overall shape over which we iterate
  var code = ["'use strict'"]
  var vars = []
  
  for(var j=0; j<dimension; ++j) {
    vars.push(["s", j, "=SS[", j, "]"].join("")) // The limits for each dimension.
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    arglist.push("a"+i) // Actual data array
    arglist.push("t"+i) // Strides
    arglist.push("p"+i) // Offset in the array at which the data starts (also used for iterating over the data)
    
    for(var j=0; j<dimension; ++j) { // Unpack the strides into vars for looping
      vars.push(["t",i,"p",j,"=t",i,"[",loopBegin[i]+j,"]"].join(""))
    }
    
    for(var j=0; j<Math.abs(proc.arrayBlockIndices[i]); ++j) { // Unpack the strides into vars for block iteration
      vars.push(["t",i,"b",j,"=t",i,"[",blockBegin[i]+j,"]"].join(""))
    }
  }
  for(var i=0; i<proc.scalarArgs.length; ++i) {
    arglist.push("Y" + i)
  }
  if(proc.shapeArgs.length > 0) {
    vars.push("shape=SS.slice(0)") // Makes the shape over which we iterate available to the user defined functions (so you can use width/height for example)
  }
  if(proc.indexArgs.length > 0) {
    // Prepare an array to keep track of the (logical) indices, initialized to dimension zeroes.
    var zeros = new Array(dimension)
    for(var i=0; i<dimension; ++i) {
      zeros[i] = "0"
    }
    vars.push(["index=[", zeros.join(","), "]"].join(""))
  }
  for(var i=0; i<proc.offsetArgs.length; ++i) { // Offset arguments used for stencil operations
    var off_arg = proc.offsetArgs[i]
    var init_string = []
    for(var j=0; j<off_arg.offset.length; ++j) {
      if(off_arg.offset[j] === 0) {
        continue
      } else if(off_arg.offset[j] === 1) {
        init_string.push(["t", off_arg.array, "p", j].join(""))      
      } else {
        init_string.push([off_arg.offset[j], "*t", off_arg.array, "p", j].join(""))
      }
    }
    if(init_string.length === 0) {
      vars.push("q" + i + "=0")
    } else {
      vars.push(["q", i, "=", init_string.join("+")].join(""))
    }
  }

  //Prepare this variables
  var thisVars = uniq([].concat(proc.pre.thisVars)
                      .concat(proc.body.thisVars)
                      .concat(proc.post.thisVars))
  vars = vars.concat(thisVars)
  if (vars.length > 0) {
    code.push("var " + vars.join(","))
  }
  for(var i=0; i<proc.arrayArgs.length; ++i) {
    code.push("p"+i+"|=0")
  }
  
  //Inline prelude
  if(proc.pre.body.length > 3) {
    code.push(processBlock(proc.pre, proc, dtypes))
  }

  //Process body
  var body = processBlock(proc.body, proc, dtypes)
  var matched = countMatches(loopOrders)
  if(matched < dimension) {
    code.push(outerFill(matched, loopOrders[0], proc, body)) // TODO: Rather than passing loopOrders[0], it might be interesting to look at passing an order that represents the majority of the arguments for example.
  } else {
    code.push(innerFill(loopOrders[0], proc, body))
  }

  //Inline epilog
  if(proc.post.body.length > 3) {
    code.push(processBlock(proc.post, proc, dtypes))
  }
  
  if(proc.debug) {
    console.log("-----Generated cwise routine for ", typesig, ":\n" + code.join("\n") + "\n----------")
  }
  
  var loopName = [(proc.funcName||"unnamed"), "_cwise_loop_", orders[0].join("s"),"m",matched,typeSummary(dtypes)].join("")
  var f = new Function(["function ",loopName,"(", arglist.join(","),"){", code.join("\n"),"} return ", loopName].join(""))
  return f()
}
module.exports = generateCWiseOp


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function unique_pred(list, compare) {
  var ptr = 1
    , len = list.length
    , a=list[0], b=list[0]
  for(var i=1; i<len; ++i) {
    b = a
    a = list[i]
    if(compare(a, b)) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique_eq(list) {
  var ptr = 1
    , len = list.length
    , a=list[0], b = list[0]
  for(var i=1; i<len; ++i, b=a) {
    b = a
    a = list[i]
    if(a !== b) {
      if(i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }
  list.length = ptr
  return list
}

function unique(list, compare, sorted) {
  if(list.length === 0) {
    return list
  }
  if(compare) {
    if(!sorted) {
      list.sort(compare)
    }
    return unique_pred(list, compare)
  }
  if(!sorted) {
    list.sort()
  }
  return unique_eq(list)
}

module.exports = unique


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var iota = __webpack_require__(55)
var isBuffer = __webpack_require__(56)

var hasTypedArrays  = ((typeof Float64Array) !== "undefined")

function compare1st(a, b) {
  return a[0] - b[0]
}

function order() {
  var stride = this.stride
  var terms = new Array(stride.length)
  var i
  for(i=0; i<terms.length; ++i) {
    terms[i] = [Math.abs(stride[i]), i]
  }
  terms.sort(compare1st)
  var result = new Array(terms.length)
  for(i=0; i<result.length; ++i) {
    result[i] = terms[i][1]
  }
  return result
}

function compileConstructor(dtype, dimension) {
  var className = ["View", dimension, "d", dtype].join("")
  if(dimension < 0) {
    className = "View_Nil" + dtype
  }
  var useGetters = (dtype === "generic")

  if(dimension === -1) {
    //Special case for trivial arrays
    var code =
      "function "+className+"(a){this.data=a;};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return -1};\
proto.size=0;\
proto.dimension=-1;\
proto.shape=proto.stride=proto.order=[];\
proto.lo=proto.hi=proto.transpose=proto.step=\
function(){return new "+className+"(this.data);};\
proto.get=proto.set=function(){};\
proto.pick=function(){return null};\
return function construct_"+className+"(a){return new "+className+"(a);}"
    var procedure = new Function(code)
    return procedure()
  } else if(dimension === 0) {
    //Special case for 0d arrays
    var code =
      "function "+className+"(a,d) {\
this.data = a;\
this.offset = d\
};\
var proto="+className+".prototype;\
proto.dtype='"+dtype+"';\
proto.index=function(){return this.offset};\
proto.dimension=0;\
proto.size=1;\
proto.shape=\
proto.stride=\
proto.order=[];\
proto.lo=\
proto.hi=\
proto.transpose=\
proto.step=function "+className+"_copy() {\
return new "+className+"(this.data,this.offset)\
};\
proto.pick=function "+className+"_pick(){\
return TrivialArray(this.data);\
};\
proto.valueOf=proto.get=function "+className+"_get(){\
return "+(useGetters ? "this.data.get(this.offset)" : "this.data[this.offset]")+
"};\
proto.set=function "+className+"_set(v){\
return "+(useGetters ? "this.data.set(this.offset,v)" : "this.data[this.offset]=v")+"\
};\
return function construct_"+className+"(a,b,c,d){return new "+className+"(a,d)}"
    var procedure = new Function("TrivialArray", code)
    return procedure(CACHED_CONSTRUCTORS[dtype][0])
  }

  var code = ["'use strict'"]

  //Create constructor for view
  var indices = iota(dimension)
  var args = indices.map(function(i) { return "i"+i })
  var index_str = "this.offset+" + indices.map(function(i) {
        return "this.stride[" + i + "]*i" + i
      }).join("+")
  var shapeArg = indices.map(function(i) {
      return "b"+i
    }).join(",")
  var strideArg = indices.map(function(i) {
      return "c"+i
    }).join(",")
  code.push(
    "function "+className+"(a," + shapeArg + "," + strideArg + ",d){this.data=a",
      "this.shape=[" + shapeArg + "]",
      "this.stride=[" + strideArg + "]",
      "this.offset=d|0}",
    "var proto="+className+".prototype",
    "proto.dtype='"+dtype+"'",
    "proto.dimension="+dimension)

  //view.size:
  code.push("Object.defineProperty(proto,'size',{get:function "+className+"_size(){\
return "+indices.map(function(i) { return "this.shape["+i+"]" }).join("*"),
"}})")

  //view.order:
  if(dimension === 1) {
    code.push("proto.order=[0]")
  } else {
    code.push("Object.defineProperty(proto,'order',{get:")
    if(dimension < 4) {
      code.push("function "+className+"_order(){")
      if(dimension === 2) {
        code.push("return (Math.abs(this.stride[0])>Math.abs(this.stride[1]))?[1,0]:[0,1]}})")
      } else if(dimension === 3) {
        code.push(
"var s0=Math.abs(this.stride[0]),s1=Math.abs(this.stride[1]),s2=Math.abs(this.stride[2]);\
if(s0>s1){\
if(s1>s2){\
return [2,1,0];\
}else if(s0>s2){\
return [1,2,0];\
}else{\
return [1,0,2];\
}\
}else if(s0>s2){\
return [2,0,1];\
}else if(s2>s1){\
return [0,1,2];\
}else{\
return [0,2,1];\
}}})")
      }
    } else {
      code.push("ORDER})")
    }
  }

  //view.set(i0, ..., v):
  code.push(
"proto.set=function "+className+"_set("+args.join(",")+",v){")
  if(useGetters) {
    code.push("return this.data.set("+index_str+",v)}")
  } else {
    code.push("return this.data["+index_str+"]=v}")
  }

  //view.get(i0, ...):
  code.push("proto.get=function "+className+"_get("+args.join(",")+"){")
  if(useGetters) {
    code.push("return this.data.get("+index_str+")}")
  } else {
    code.push("return this.data["+index_str+"]}")
  }

  //view.index:
  code.push(
    "proto.index=function "+className+"_index(", args.join(), "){return "+index_str+"}")

  //view.hi():
  code.push("proto.hi=function "+className+"_hi("+args.join(",")+"){return new "+className+"(this.data,"+
    indices.map(function(i) {
      return ["(typeof i",i,"!=='number'||i",i,"<0)?this.shape[", i, "]:i", i,"|0"].join("")
    }).join(",")+","+
    indices.map(function(i) {
      return "this.stride["+i + "]"
    }).join(",")+",this.offset)}")

  //view.lo():
  var a_vars = indices.map(function(i) { return "a"+i+"=this.shape["+i+"]" })
  var c_vars = indices.map(function(i) { return "c"+i+"=this.stride["+i+"]" })
  code.push("proto.lo=function "+className+"_lo("+args.join(",")+"){var b=this.offset,d=0,"+a_vars.join(",")+","+c_vars.join(","))
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'&&i"+i+">=0){\
d=i"+i+"|0;\
b+=c"+i+"*d;\
a"+i+"-=d}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a"+i
    }).join(",")+","+
    indices.map(function(i) {
      return "c"+i
    }).join(",")+",b)}")

  //view.step():
  code.push("proto.step=function "+className+"_step("+args.join(",")+"){var "+
    indices.map(function(i) {
      return "a"+i+"=this.shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "b"+i+"=this.stride["+i+"]"
    }).join(",")+",c=this.offset,d=0,ceil=Math.ceil")
  for(var i=0; i<dimension; ++i) {
    code.push(
"if(typeof i"+i+"==='number'){\
d=i"+i+"|0;\
if(d<0){\
c+=b"+i+"*(a"+i+"-1);\
a"+i+"=ceil(-a"+i+"/d)\
}else{\
a"+i+"=ceil(a"+i+"/d)\
}\
b"+i+"*=d\
}")
  }
  code.push("return new "+className+"(this.data,"+
    indices.map(function(i) {
      return "a" + i
    }).join(",")+","+
    indices.map(function(i) {
      return "b" + i
    }).join(",")+",c)}")

  //view.transpose():
  var tShape = new Array(dimension)
  var tStride = new Array(dimension)
  for(var i=0; i<dimension; ++i) {
    tShape[i] = "a[i"+i+"]"
    tStride[i] = "b[i"+i+"]"
  }
  code.push("proto.transpose=function "+className+"_transpose("+args+"){"+
    args.map(function(n,idx) { return n + "=(" + n + "===undefined?" + idx + ":" + n + "|0)"}).join(";"),
    "var a=this.shape,b=this.stride;return new "+className+"(this.data,"+tShape.join(",")+","+tStride.join(",")+",this.offset)}")

  //view.pick():
  code.push("proto.pick=function "+className+"_pick("+args+"){var a=[],b=[],c=this.offset")
  for(var i=0; i<dimension; ++i) {
    code.push("if(typeof i"+i+"==='number'&&i"+i+">=0){c=(c+this.stride["+i+"]*i"+i+")|0}else{a.push(this.shape["+i+"]);b.push(this.stride["+i+"])}")
  }
  code.push("var ctor=CTOR_LIST[a.length+1];return ctor(this.data,a,b,c)}")

  //Add return statement
  code.push("return function construct_"+className+"(data,shape,stride,offset){return new "+className+"(data,"+
    indices.map(function(i) {
      return "shape["+i+"]"
    }).join(",")+","+
    indices.map(function(i) {
      return "stride["+i+"]"
    }).join(",")+",offset)}")

  //Compile procedure
  var procedure = new Function("CTOR_LIST", "ORDER", code.join("\n"))
  return procedure(CACHED_CONSTRUCTORS[dtype], order)
}

function arrayDType(data) {
  if(isBuffer(data)) {
    return "buffer"
  }
  if(hasTypedArrays) {
    switch(Object.prototype.toString.call(data)) {
      case "[object Float64Array]":
        return "float64"
      case "[object Float32Array]":
        return "float32"
      case "[object Int8Array]":
        return "int8"
      case "[object Int16Array]":
        return "int16"
      case "[object Int32Array]":
        return "int32"
      case "[object Uint8Array]":
        return "uint8"
      case "[object Uint16Array]":
        return "uint16"
      case "[object Uint32Array]":
        return "uint32"
      case "[object Uint8ClampedArray]":
        return "uint8_clamped"
    }
  }
  if(Array.isArray(data)) {
    return "array"
  }
  return "generic"
}

var CACHED_CONSTRUCTORS = {
  "float32":[],
  "float64":[],
  "int8":[],
  "int16":[],
  "int32":[],
  "uint8":[],
  "uint16":[],
  "uint32":[],
  "array":[],
  "uint8_clamped":[],
  "buffer":[],
  "generic":[]
}

;(function() {
  for(var id in CACHED_CONSTRUCTORS) {
    CACHED_CONSTRUCTORS[id].push(compileConstructor(id, -1))
  }
});

function wrappedNDArrayCtor(data, shape, stride, offset) {
  if(data === undefined) {
    var ctor = CACHED_CONSTRUCTORS.array[0]
    return ctor([])
  } else if(typeof data === "number") {
    data = [data]
  }
  if(shape === undefined) {
    shape = [ data.length ]
  }
  var d = shape.length
  if(stride === undefined) {
    stride = new Array(d)
    for(var i=d-1, sz=1; i>=0; --i) {
      stride[i] = sz
      sz *= shape[i]
    }
  }
  if(offset === undefined) {
    offset = 0
    for(var i=0; i<d; ++i) {
      if(stride[i] < 0) {
        offset -= (shape[i]-1)*stride[i]
      }
    }
  }
  var dtype = arrayDType(data)
  var ctor_list = CACHED_CONSTRUCTORS[dtype]
  while(ctor_list.length <= d+1) {
    ctor_list.push(compileConstructor(dtype, ctor_list.length-1))
  }
  var ctor = ctor_list[d+1]
  return ctor(data, shape, stride, offset)
}

module.exports = wrappedNDArrayCtor


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function iota(n) {
  var result = new Array(n)
  for(var i=0; i<n; ++i) {
    result[i] = i
  }
  return result
}

module.exports = iota

/***/ }),
/* 56 */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createVAONative = __webpack_require__(58)
var createVAOEmulated = __webpack_require__(59)

function ExtensionShim (gl) {
  this.bindVertexArrayOES = gl.bindVertexArray.bind(gl)
  this.createVertexArrayOES = gl.createVertexArray.bind(gl)
  this.deleteVertexArrayOES = gl.deleteVertexArray.bind(gl)
}

function createVAO(gl, attributes, elements, elementsType) {
  var ext = gl.createVertexArray
    ? new ExtensionShim(gl)
    : gl.getExtension('OES_vertex_array_object')
  var vao

  if(ext) {
    vao = createVAONative(gl, ext)
  } else {
    vao = createVAOEmulated(gl)
  }
  vao.update(attributes, elements, elementsType)
  return vao
}

module.exports = createVAO


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bindAttribs = __webpack_require__(5)

function VertexAttribute(location, dimension, a, b, c, d) {
  this.location = location
  this.dimension = dimension
  this.a = a
  this.b = b
  this.c = c
  this.d = d
}

VertexAttribute.prototype.bind = function(gl) {
  switch(this.dimension) {
    case 1:
      gl.vertexAttrib1f(this.location, this.a)
    break
    case 2:
      gl.vertexAttrib2f(this.location, this.a, this.b)
    break
    case 3:
      gl.vertexAttrib3f(this.location, this.a, this.b, this.c)
    break
    case 4:
      gl.vertexAttrib4f(this.location, this.a, this.b, this.c, this.d)
    break
  }
}

function VAONative(gl, ext, handle) {
  this.gl = gl
  this._ext = ext
  this.handle = handle
  this._attribs = []
  this._useElements = false
  this._elementsType = gl.UNSIGNED_SHORT
}

VAONative.prototype.bind = function() {
  this._ext.bindVertexArrayOES(this.handle)
  for(var i=0; i<this._attribs.length; ++i) {
    this._attribs[i].bind(this.gl)
  }
}

VAONative.prototype.unbind = function() {
  this._ext.bindVertexArrayOES(null)
}

VAONative.prototype.dispose = function() {
  this._ext.deleteVertexArrayOES(this.handle)
}

VAONative.prototype.update = function(attributes, elements, elementsType) {
  this.bind()
  bindAttribs(this.gl, elements, attributes)
  this.unbind()
  this._attribs.length = 0
  if(attributes)
  for(var i=0; i<attributes.length; ++i) {
    var a = attributes[i]
    if(typeof a === "number") {
      this._attribs.push(new VertexAttribute(i, 1, a))
    } else if(Array.isArray(a)) {
      this._attribs.push(new VertexAttribute(i, a.length, a[0], a[1], a[2], a[3]))
    }
  }
  this._useElements = !!elements
  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
}

VAONative.prototype.draw = function(mode, count, offset) {
  offset = offset || 0
  var gl = this.gl
  if(this._useElements) {
    gl.drawElements(mode, count, this._elementsType, offset)
  } else {
    gl.drawArrays(mode, offset, count)
  }
}

function createVAONative(gl, ext) {
  return new VAONative(gl, ext, ext.createVertexArrayOES())
}

module.exports = createVAONative

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bindAttribs = __webpack_require__(5)

function VAOEmulated(gl) {
  this.gl = gl
  this._elements = null
  this._attributes = null
  this._elementsType = gl.UNSIGNED_SHORT
}

VAOEmulated.prototype.bind = function() {
  bindAttribs(this.gl, this._elements, this._attributes)
}

VAOEmulated.prototype.update = function(attributes, elements, elementsType) {
  this._elements = elements
  this._attributes = attributes
  this._elementsType = elementsType || this.gl.UNSIGNED_SHORT
}

VAOEmulated.prototype.dispose = function() { }
VAOEmulated.prototype.unbind = function() { }

VAOEmulated.prototype.draw = function(mode, count, offset) {
  offset = offset || 0
  var gl = this.gl
  if(this._elements) {
    gl.drawElements(mode, count, this._elementsType, offset)
  } else {
    gl.drawArrays(mode, offset, count)
  }
}

function createVAOEmulated(gl) {
  return new VAOEmulated(gl)
}

module.exports = createVAOEmulated

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;function download(t,e,n){function i(t){var e=t.split(/[:;,]/),n=e[1],i="base64"==e[2]?atob:decodeURIComponent,r=i(e.pop()),o=r.length,a=0,s=new Uint8Array(o);for(a;a<o;++a)s[a]=r.charCodeAt(a);return new m([s],{type:n})}function r(t,e){if("download"in l)return l.href=t,l.setAttribute("download",w),l.innerHTML="downloading...",l.style.display="none",f.body.appendChild(l),setTimeout(function(){l.click(),f.body.removeChild(l),e===!0&&setTimeout(function(){h.URL.revokeObjectURL(l.href)},250)},66),!0;var n=f.createElement("iframe");f.body.appendChild(n),e||(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,d)),n.src=t,setTimeout(function(){f.body.removeChild(n)},333)}var o,a,s,h=window,d="application/octet-stream",u=n||d,c=t,f=document,l=f.createElement("a"),p=function(t){return String(t)},m=h.Blob||h.MozBlob||h.WebKitBlob||p,g=h.MSBlobBuilder||h.WebKitBlobBuilder||h.BlobBuilder,w=e||"download";if("true"===String(this)&&(c=[c,u],u=c[0],c=c[1]),String(c).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/))return navigator.msSaveBlob?navigator.msSaveBlob(i(c),w):r(c);try{o=c instanceof m?c:new m([c],{type:u})}catch(t){g&&(a=new g,a.append([c]),o=a.getBlob(u))}if(navigator.msSaveBlob)return navigator.msSaveBlob(o,w);if(h.URL)r(h.URL.createObjectURL(o),!0);else{if("string"==typeof o||o.constructor===p)try{return r("data:"+u+";base64,"+h.btoa(o))}catch(t){return r("data:"+u+","+encodeURIComponent(o))}s=new FileReader,s.onload=function(t){r(this.result)},s.readAsDataURL(o)}return!0}window.Whammy=function(){function t(t,n){for(var i=e(t),r=3e4,o=[{id:440786851,data:[{data:1,id:17030},{data:1,id:17143},{data:4,id:17138},{data:8,id:17139},{data:"webm",id:17026},{data:2,id:17031},{data:2,id:17029}]},{id:408125543,data:[{id:357149030,data:[{data:1e6,id:2807729},{data:"whammy",id:19840},{data:"whammy",id:22337},{data:c(i.duration),id:17545}]},{id:374648427,data:[{id:174,data:[{data:1,id:215},{data:1,id:29637},{data:0,id:156},{data:"und",id:2274716},{data:"V_VP8",id:134},{data:"VP8",id:2459272},{data:1,id:131},{id:224,data:[{data:i.width,id:176},{data:i.height,id:186}]}]}]},{id:475249515,data:[]}]}],s=o[1],d=s.data[2],u=0,f=0;u<t.length;){var l={id:187,data:[{data:Math.round(f),id:179},{id:183,data:[{data:1,id:247},{data:0,size:8,id:241}]}]};d.data.push(l);var p=[],m=0;do p.push(t[u]),m+=t[u].duration,u++;while(u<t.length&&m<r);var g=0,w={id:524531317,data:[{data:Math.round(f),id:231}].concat(p.map(function(t){var e=h({discardable:0,frame:t.data.slice(4),invisible:0,keyframe:1,lacing:0,trackNum:1,timecode:Math.round(g)});return g+=t.duration,{data:e,id:163}}))};s.data.push(w),f+=m}for(var v=0,y=0;y<s.data.length;y++){y>=3&&(d.data[y-3].data[1].data[1].data=v);var b=a([s.data[y]],n);v+=b.size||b.byteLength||b.length,2!=y&&(s.data[y]=b)}return a(o,n)}function e(t){for(var e=t[0].width,n=t[0].height,i=t[0].duration,r=1;r<t.length;r++){if(t[r].width!=e)throw"Frame "+(r+1)+" has a different width";if(t[r].height!=n)throw"Frame "+(r+1)+" has a different height";if(t[r].duration<0||t[r].duration>32767)throw"Frame "+(r+1)+" has a weird duration (must be between 0 and 32767)";i+=t[r].duration}return{duration:i,width:e,height:n}}function n(t){for(var e=[];t>0;)e.push(255&t),t>>=8;return new Uint8Array(e.reverse())}function i(t,e){for(var n=new Uint8Array(e),i=e-1;i>=0;i--)n[i]=255&t,t>>=8;return n}function r(t){for(var e=new Uint8Array(t.length),n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function o(t){var e=[],n=t.length%8?new Array(9-t.length%8).join("0"):"";t=n+t;for(var i=0;i<t.length;i+=8)e.push(parseInt(t.substr(i,8),2));return new Uint8Array(e)}function a(t,e){for(var h=[],d=0;d<t.length;d++)if("id"in t[d]){var u=t[d].data;if("object"==typeof u&&(u=a(u,e)),"number"==typeof u&&(u="size"in t[d]?i(u,t[d].size):o(u.toString(2))),"string"==typeof u&&(u=r(u)),u.length);for(var c=u.size||u.byteLength||u.length,f=0,l=56;l>0;l-=7)if(c>Math.pow(2,l)-2){f=l/7;break}var p=c.toString(2),m=new Array(8*(f+1)+1).join("0"),g=new Array(f+1).join("0")+1,w=m.substr(0,m.length-p.length-g.length)+p,v=g+w;h.push(n(t[d].id)),h.push(o(v)),h.push(u)}else h.push(t[d]);if(e){var y=s(h);return new Uint8Array(y)}return new Blob(h,{type:"video/webm"})}function s(t,e){null==e&&(e=[]);for(var n=0;n<t.length;n++)"object"==typeof t[n]?s(t[n],e):e.push(t[n]);return e}function h(t){var e=0;if(t.keyframe&&(e|=128),t.invisible&&(e|=8),t.lacing&&(e|=t.lacing<<1),t.discardable&&(e|=1),t.trackNum>127)throw"TrackNumber > 127 not supported";var n=[128|t.trackNum,t.timecode>>8,255&t.timecode,e].map(function(t){return String.fromCharCode(t)}).join("")+t.frame;return n}function d(t){for(var e=t.RIFF[0].WEBP[0],n=e.indexOf("*"),i=0,r=[];i<4;i++)r[i]=e.charCodeAt(n+3+i);var o,a,s,h,d;return d=r[1]<<8|r[0],o=16383&d,a=d>>14,d=r[3]<<8|r[2],s=16383&d,h=d>>14,{width:o,height:s,data:e,riff:t}}function u(t){for(var e=0,n={};e<t.length;){var i=t.substr(e,4);if(n[i]=n[i]||[],"RIFF"==i||"LIST"==i){var r=parseInt(t.substr(e+4,4).split("").map(function(t){var e=t.charCodeAt(0).toString(2);return new Array(8-e.length+1).join("0")+e}).join(""),2),o=t.substr(e+4+4,r);e+=8+r,n[i].push(u(o))}else"WEBP"==i?(n[i].push(t.substr(e+8)),e=t.length):(n[i].push(t.substr(e+4)),e=t.length)}return n}function c(t){return[].slice.call(new Uint8Array(new Float64Array([t]).buffer),0).map(function(t){return String.fromCharCode(t)}).reverse().join("")}function f(t,e){this.frames=[],this.duration=1e3/t,this.quality=e||.8}return f.prototype.add=function(t,e){if("undefined"!=typeof e&&this.duration)throw"you can't pass a duration if the fps is set";if("undefined"==typeof e&&!this.duration)throw"if you don't have the fps set, you need to have durations here.";if(t.canvas&&(t=t.canvas),t.toDataURL)t=t.getContext("2d").getImageData(0,0,t.width,t.height);else if("string"!=typeof t)throw"frame must be a a HTMLCanvasElement, a CanvasRenderingContext2D or a DataURI formatted string";if("string"==typeof t&&!/^data:image\/webp;base64,/gi.test(t))throw"Input must be formatted properly as a base64 encoded DataURI of type image/webp";this.frames.push({image:t,duration:e||this.duration})},f.prototype.encodeFrames=function(t){if(this.frames[0].image instanceof ImageData){var e=this.frames,n=document.createElement("canvas"),i=n.getContext("2d");n.width=this.frames[0].image.width,n.height=this.frames[0].image.height;var r=function(o){var a=e[o];i.putImageData(a.image,0,0),a.image=n.toDataURL("image/webp",this.quality),o<e.length-1?setTimeout(function(){r(o+1)},1):t()}.bind(this);r(0)}else t()},f.prototype.compile=function(e,n){this.encodeFrames(function(){var i=new t(this.frames.map(function(t){var e=d(u(atob(t.image.slice(23))));return e.duration=t.duration,e}),e);n(i)}.bind(this))},{Video:f,fromImageArray:function(e,n,i){return t(e.map(function(t){var e=d(u(atob(t.slice(23))));return e.duration=1e3/n,e}),i)},toWebM:t}}(),function(){"use strict";function t(t){var e,n=new Uint8Array(t);for(e=0;e<t;e+=1)n[e]=0;return n}function e(e,n,i,r){var o=n+i,a=t((parseInt(o/r)+1)*r);return a.set(e),a}function n(t,e,n){return t=t.toString(n||8),"000000000000".substr(t.length+12-e)+t}function i(e,n,i){var r,o;for(n=n||t(e.length),i=i||0,r=0,o=e.length;r<o;r+=1)n[i]=e.charCodeAt(r),i+=1;return n}function r(t){function e(t){return o[t>>18&63]+o[t>>12&63]+o[t>>6&63]+o[63&t]}var n,i,r,a=t.length%3,s="";for(n=0,r=t.length-a;n<r;n+=3)i=(t[n]<<16)+(t[n+1]<<8)+t[n+2],s+=e(i);switch(s.length%4){case 1:s+="=";break;case 2:s+="=="}return s}var o=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];window.utils={},window.utils.clean=t,window.utils.pad=n,window.utils.extend=e,window.utils.stringToUint8=i,window.utils.uint8ToBase64=r}(),function(){"use strict";function t(t,i){var r=n.clean(512),o=0;return e.forEach(function(e){var n,i,a=t[e.field]||"";for(n=0,i=a.length;n<i;n+=1)r[o]=a.charCodeAt(n),o+=1;o+=e.length-n}),"function"==typeof i?i(r,o):r}var e,n=window.utils;e=[{field:"fileName",length:100},{field:"fileMode",length:8},{field:"uid",length:8},{field:"gid",length:8},{field:"fileSize",length:12},{field:"mtime",length:12},{field:"checksum",length:8},{field:"type",length:1},{field:"linkName",length:100},{field:"ustar",length:8},{field:"owner",length:32},{field:"group",length:32},{field:"majorNumber",length:8},{field:"minorNumber",length:8},{field:"filenamePrefix",length:155},{field:"padding",length:12}],window.header={},window.header.structure=e,window.header.format=t}(),function(){"use strict";function t(t){this.written=0,e=(t||20)*r,this.out=i.clean(e),this.blocks=[],this.length=0}var e,n=window.header,i=window.utils,r=512;t.prototype.append=function(t,e,o,a){var s,h,d,u,c,f,l;if("string"==typeof e)e=i.stringToUint8(e);else if(e.constructor!==Uint8Array.prototype.constructor)throw"Invalid input type. You gave me: "+e.constructor.toString().match(/function\s*([$A-Za-z_][0-9A-Za-z_]*)\s*\(/)[1];"function"==typeof o&&(a=o,o={}),o=o||{},d=o.mode||4095&parseInt("777",8),u=o.mtime||Math.floor(+new Date/1e3),c=o.uid||0,f=o.gid||0,s={fileName:t,fileMode:i.pad(d,7),uid:i.pad(c,7),gid:i.pad(f,7),fileSize:i.pad(e.length,11),mtime:i.pad(u,11),checksum:"        ",type:"0",ustar:"ustar  ",owner:o.owner||"",group:o.group||""},h=0,Object.keys(s).forEach(function(t){var e,n,i=s[t];for(e=0,n=i.length;e<n;e+=1)h+=i.charCodeAt(e)}),s.checksum=i.pad(h,6)+"\0 ",l=n.format(s);var p=Math.ceil(l.length/r)*r,m=Math.ceil(e.length/r)*r;this.blocks.push({header:l,input:e,headerLength:p,inputLength:m})},t.prototype.save=function(){var t=[],e=[],n=0,i=Math.pow(2,20),o=[];return this.blocks.forEach(function(t){n+t.headerLength+t.inputLength>i&&(e.push({blocks:o,length:n}),o=[],n=0),o.push(t),n+=t.headerLength+t.inputLength}),e.push({blocks:o,length:n}),e.forEach(function(e){var n=new Uint8Array(e.length),i=0;e.blocks.forEach(function(t){n.set(t.header,i),i+=t.headerLength,n.set(t.input,i),i+=t.inputLength}),t.push(n)}),t.push(new Uint8Array(2*r)),new Blob(t,{type:"octet/stream"})},t.prototype.clear=function(){this.written=0,this.out=i.clean(e)},window.Tar=t}(),function(t){function e(t,n){if({}.hasOwnProperty.call(e.cache,t))return e.cache[t];var i=e.resolve(t);if(!i)throw new Error("Failed to resolve module "+t);var r={id:t,require:e,filename:t,exports:{},loaded:!1,parent:n,children:[]};n&&n.children.push(r);var o=t.slice(0,t.lastIndexOf("/")+1);return e.cache[t]=r.exports,i.call(r.exports,r,r.exports,o,t),r.loaded=!0,e.cache[t]=r.exports}e.modules={},e.cache={},e.resolve=function(t){return{}.hasOwnProperty.call(e.modules,t)?e.modules[t]:void 0},e.define=function(t,n){e.modules[t]=n};var n=function(e){return e="/",{title:"browser",version:"v0.10.26",browser:!0,env:{},argv:[],nextTick:t.setImmediate||function(t){setTimeout(t,0)},cwd:function(){return e},chdir:function(t){e=t}}}();e.define("/gif.coffee",function(t,n,i,r){function o(t,e){return{}.hasOwnProperty.call(t,e)}function a(t,e){for(var n=0,i=e.length;n<i;++n)if(n in e&&e[n]===t)return!0;return!1}function s(t,e){function n(){this.constructor=t}for(var i in e)o(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t}var h,d,u,c,f;u=e("events",t).EventEmitter,h=e("/browser.coffee",t),f=function(t){function e(t){var e,n;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(t);for(e in d)n=d[e],null!=this.options[e]?this.options[e]:this.options[e]=n}return s(e,t),d={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null},c={delay:500,copy:!1},e.prototype.setOption=function(t,e){return this.options[t]=e,null==this._canvas||"width"!==t&&"height"!==t?void 0:this._canvas[t]=e},e.prototype.setOptions=function(t){var e,n;return function(i){for(e in t)o(t,e)&&(n=t[e],i.push(this.setOption(e,n)));return i}.call(this,[])},e.prototype.addFrame=function(t,e){var n,i;null==e&&(e={}),n={},n.transparent=this.options.transparent;for(i in c)n[i]=e[i]||c[i];if(null!=this.options.width||this.setOption("width",t.width),null!=this.options.height||this.setOption("height",t.height),"undefined"!=typeof ImageData&&null!=ImageData&&t instanceof ImageData)n.data=t.data;else if("undefined"!=typeof CanvasRenderingContext2D&&null!=CanvasRenderingContext2D&&t instanceof CanvasRenderingContext2D||"undefined"!=typeof WebGLRenderingContext&&null!=WebGLRenderingContext&&t instanceof WebGLRenderingContext)e.copy?n.data=this.getContextData(t):n.context=t;else{if(null==t.childNodes)throw new Error("Invalid image");e.copy?n.data=this.getImageData(t):n.image=t}return this.frames.push(n)},e.prototype.render=function(){var t,e;if(this.running)throw new Error("Already running");if(null==this.options.width||null==this.options.height)throw new Error("Width and height must be set prior to rendering");this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(e){for(var n=function(){var t;t=[];for(var e=0;0<=this.frames.length?e<this.frames.length:e>this.frames.length;0<=this.frames.length?++e:--e)t.push(e);return t}.apply(this,arguments),i=0,r=n.length;i<r;++i)t=n[i],e.push(null);return e}.call(this,[]),e=this.spawnWorkers();for(var n=function(){var t;t=[];for(var n=0;0<=e?n<e:n>e;0<=e?++n:--n)t.push(n);return t}.apply(this,arguments),i=0,r=n.length;i<r;++i)t=n[i],this.renderNextFrame();return this.emit("start"),this.emit("progress",0)},e.prototype.abort=function(){for(var t;;){if(t=this.activeWorkers.shift(),!(null!=t))break;console.log("killing active worker"),t.terminate()}return this.running=!1,this.emit("abort")},e.prototype.spawnWorkers=function(){var t;return t=Math.min(this.options.workers,this.frames.length),function(){var e;e=[];for(var n=this.freeWorkers.length;this.freeWorkers.length<=t?n<t:n>t;this.freeWorkers.length<=t?++n:--n)e.push(n);return e}.apply(this,arguments).forEach(function(t){return function(e){var n;return console.log("spawning worker "+e),n=new Worker(t.options.workerScript),n.onmessage=function(t){return function(e){return t.activeWorkers.splice(t.activeWorkers.indexOf(n),1),t.freeWorkers.push(n),t.frameFinished(e.data)}}(t),t.freeWorkers.push(n)}}(this)),t},e.prototype.frameFinished=function(t){return console.log("frame "+t.index+" finished - "+this.activeWorkers.length+" active"),this.finishedFrames++,this.emit("progress",this.finishedFrames/this.frames.length),this.imageParts[t.index]=t,a(null,this.imageParts)?this.renderNextFrame():this.finishRendering()},e.prototype.finishRendering=function(){var t,e,n,i,r,o,a;r=0;for(var s=0,h=this.imageParts.length;s<h;++s)e=this.imageParts[s],r+=(e.data.length-1)*e.pageSize+e.cursor;r+=e.pageSize-e.cursor,console.log("rendering finished - filesize "+Math.round(r/1e3)+"kb"),t=new Uint8Array(r),o=0;for(var d=0,u=this.imageParts.length;d<u;++d){e=this.imageParts[d];for(var c=0,f=e.data.length;c<f;++c)a=e.data[c],n=c,t.set(a,o),o+=n===e.data.length-1?e.cursor:e.pageSize}return i=new Blob([t],{type:"image/gif"}),this.emit("finished",i,t)},e.prototype.renderNextFrame=function(){var t,e,n;if(0===this.freeWorkers.length)throw new Error("No free workers");return this.nextFrame>=this.frames.length?void 0:(t=this.frames[this.nextFrame++],n=this.freeWorkers.shift(),e=this.getTask(t),console.log("starting frame "+(e.index+1)+" of "+this.frames.length),this.activeWorkers.push(n),n.postMessage(e))},e.prototype.getContextData=function(t){return t.getImageData(0,0,this.options.width,this.options.height).data},e.prototype.getImageData=function(t){var e;return null!=this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),e=this._canvas.getContext("2d"),e.setFill=this.options.background,e.fillRect(0,0,this.options.width,this.options.height),e.drawImage(t,0,0),this.getContextData(e)},e.prototype.getTask=function(t){var e,n;if(e=this.frames.indexOf(t),n={index:e,last:e===this.frames.length-1,delay:t.delay,transparent:t.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,repeat:this.options.repeat,canTransfer:"chrome"===h.name},null!=t.data)n.data=t.data;else if(null!=t.context)n.data=this.getContextData(t.context);else{if(null==t.image)throw new Error("Invalid frame");n.data=this.getImageData(t.image)}return n},e}(u),t.exports=f}),e.define("/browser.coffee",function(t,e,n,i){var r,o,a,s,h;s=navigator.userAgent.toLowerCase(),a=navigator.platform.toLowerCase(),h=s.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],o="ie"===h[1]&&document.documentMode,r={name:"version"===h[1]?h[3]:h[1],version:o||parseFloat("opera"===h[1]&&h[4]?h[4]:h[2]),platform:{name:s.match(/ip(?:ad|od|hone)/)?"ios":(s.match(/(?:webos|android)/)||a.match(/mac|win|linux/)||["other"])[0]}},r[r.name]=!0,r[r.name+parseInt(r.version,10)]=!0,r.platform[r.platform.name]=!0,t.exports=r}),e.define("events",function(t,e,i,r){n.EventEmitter||(n.EventEmitter=function(){});var o=e.EventEmitter=n.EventEmitter,a="function"==typeof Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=10;o.prototype.setMaxListeners=function(t){this._events||(this._events={}),this._events.maxListeners=t},o.prototype.emit=function(t){if("error"===t&&(!this._events||!this._events.error||a(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var e=this._events[t];if(!e)return!1;if("function"!=typeof e){if(a(e)){for(var n=Array.prototype.slice.call(arguments,1),i=e.slice(),r=0,o=i.length;r<o;r++)i[r].apply(this,n);return!0}return!1}switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);e.apply(this,n)}return!0},o.prototype.addListener=function(t,e){if("function"!=typeof e)throw new Error("addListener only takes instances of Function");if(this._events||(this._events={}),this.emit("newListener",t,e),this._events[t])if(a(this._events[t])){if(!this._events[t].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:s,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),console.trace())}this._events[t].push(e)}else this._events[t]=[this._events[t],e];else this._events[t]=e;return this},o.prototype.on=o.prototype.addListener,o.prototype.once=function(t,e){var n=this;return n.on(t,function i(){n.removeListener(t,i),e.apply(this,arguments)}),this},o.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new Error("removeListener only takes instances of Function");if(!this._events||!this._events[t])return this;var n=this._events[t];if(a(n)){var i=n.indexOf(e);if(i<0)return this;n.splice(i,1),0==n.length&&delete this._events[t]}else this._events[t]===e&&delete this._events[t];return this},o.prototype.removeAllListeners=function(t){return t&&this._events&&this._events[t]&&(this._events[t]=null),this},o.prototype.listeners=function(t){return this._events||(this._events={}),this._events[t]||(this._events[t]=[]),a(this._events[t])||(this._events[t]=[this._events[t]]),this._events[t]}}),t.GIF=e("/gif.coffee")}.call(this,this),function(){"use strict";function t(t){return t&&t.Object===Object?t:null}function e(t){return String("0000000"+t).slice(-7)}function n(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function i(t){var e={};this.settings=t,this.on=function(t,n){e[t]=n},this.emit=function(t){var n=e[t];n&&n.apply(null,Array.prototype.slice.call(arguments,1))},this.filename=t.name||n(),this.extension="",this.mimeType=""}function r(t){i.call(this,t),this.extension=".tar",this.mimeType="application/x-tar",this.fileExtension="",this.tape=null,this.count=0}function o(t){r.call(this,t),this.type="image/png",this.fileExtension=".png"}function a(t){r.call(this,t),this.type="image/jpeg",this.fileExtension=".jpg",this.quality=t.quality/100||.8}function s(t){var e=document.createElement("canvas");"image/webp"!==e.toDataURL("image/webp").substr(5,10)&&console.log("WebP not supported - try another export format"),i.call(this,t),this.quality=t.quality/100||.8,this.extension=".webm",this.mimeType="video/webm",this.baseFilename=this.filename,this.frames=[],this.part=1}function h(t){i.call(this,t),t.quality=t.quality/100||.8,this.encoder=new FFMpegServer.Video(t),this.encoder.on("process",function(){this.emit("process")}.bind(this)),this.encoder.on("finished",function(t,e){var n=this.callback;n&&(this.callback=void 0,n(t,e))}.bind(this)),this.encoder.on("progress",function(t){this.settings.onProgress&&this.settings.onProgress(t)}.bind(this)),this.encoder.on("error",function(t){alert(JSON.stringify(t,null,2))}.bind(this))}function d(t){i.call(this,t),this.framerate=this.settings.framerate,this.type="video/webm",this.extension=".webm",this.stream=null,this.mediaRecorder=null,this.chunks=[]}function u(t){i.call(this,t),t.quality=31-(30*t.quality/100||10),t.workers=t.workers||4,this.extension=".gif",this.mimeType="image/gif",this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.sizeSet=!1,this.encoder=new GIF({workers:t.workers,quality:t.quality,workerScript:t.workersPath+"gif.worker.js"}),this.encoder.on("progress",function(t){this.settings.onProgress&&this.settings.onProgress(t)}.bind(this)),this.encoder.on("finished",function(t){var e=this.callback;e&&(this.callback=void 0,e(t))}.bind(this))}function c(t){function e(){function t(){return this._hooked||(this._hooked=!0,this._hookedTime=this.currentTime||0,this.pause(),nt.push(this)),this._hookedTime+S.startTime}b("Capturer start"),A=window.Date.now(),L=A+S.startTime,I=window.performance.now(),E=I+S.startTime,window.Date.prototype.getTime=function(){return L},window.Date.now=function(){return L},window.setTimeout=function(t,e){var n={callback:t,time:e,triggerTime:L+e};return B.push(n),b("Timeout set to "+n.time),n},window.clearTimeout=function(t){for(var e=0;e<B.length;e++)B[e]!=t||(B.splice(e,1),b("Timeout cleared"))},window.setInterval=function(t,e){var n={callback:t,time:e,triggerTime:L+e};return j.push(n),b("Interval set to "+n.time),n},window.clearInterval=function(t){return b("clear Interval"),null},window.requestAnimationFrame=function(t){U.push(t)},window.performance.now=function(){return E};try{Object.defineProperty(HTMLVideoElement.prototype,"currentTime",{get:t}),Object.defineProperty(HTMLAudioElement.prototype,"currentTime",{get:t})}catch(t){b(t)}}function n(){e(),D.start(),M=!0}function i(){M=!1,D.stop(),f()}function r(t,e){Z(t,0,e)}function c(){r(v)}function f(){b("Capturer stop"),window.setTimeout=Z,window.setInterval=J,window.clearInterval=Y,window.clearTimeout=$,window.requestAnimationFrame=Q,window.Date.prototype.getTime=et,window.Date.now=X,window.performance.now=tt}function l(){var t=R/S.framerate;(S.frameLimit&&R>=S.frameLimit||S.timeLimit&&t>=S.timeLimit)&&(i(),y());var e=new Date(null);e.setSeconds(t),S.motionBlurFrames>2?P.textContent="CCapture "+S.format+" | "+R+" frames ("+O+" inter) | "+e.toISOString().substr(11,8):P.textContent="CCapture "+S.format+" | "+R+" frames | "+e.toISOString().substr(11,8)}function p(t){N.width===t.width&&N.height===t.height||(N.width=t.width,N.height=t.height,q=new Uint16Array(N.height*N.width*4),V.fillStyle="#0",V.fillRect(0,0,N.width,N.height))}function m(t){V.drawImage(t,0,0),z=V.getImageData(0,0,N.width,N.height);for(var e=0;e<q.length;e+=4)q[e]+=z.data[e],q[e+1]+=z.data[e+1],q[e+2]+=z.data[e+2];O++}function g(){for(var t=z.data,e=0;e<q.length;e+=4)t[e]=2*q[e]/S.motionBlurFrames,t[e+1]=2*q[e+1]/S.motionBlurFrames,t[e+2]=2*q[e+2]/S.motionBlurFrames;V.putImageData(z,0,0),D.add(N),R++,O=0,b("Full MB Frame! "+R+" "+L);for(var e=0;e<q.length;e+=4)q[e]=0,q[e+1]=0,q[e+2]=0;gc()}function w(t){M&&(S.motionBlurFrames>2?(p(t),m(t),O>=.5*S.motionBlurFrames?g():c()):(D.add(t),R++,b("Full Frame! "+R)))}function v(){var t=1e3/S.framerate,e=(R+O/S.motionBlurFrames)*t;L=A+e,E=I+e,nt.forEach(function(t){t._hookedTime=e/1e3}),l(),b("Frame: "+R+" "+O);for(var n=0;n<B.length;n++)L>=B[n].triggerTime&&(r(B[n].callback),B.splice(n,1));for(var n=0;n<j.length;n++)L>=j[n].triggerTime&&(r(j[n].callback),j[n].triggerTime+=j[n].time);U.forEach(function(t){r(t,L-k)}),U=[]}function y(t){t||(t=function(t){return download(t,D.filename+D.extension,D.mimeType),!1}),D.save(t)}function b(t){_&&console.log(t)}function x(t,e){W[t]=e}function T(t){var e=W[t];e&&e.apply(null,Array.prototype.slice.call(arguments,1))}function C(t){T("progress",t)}var _,F,L,A,E,I,c,D,S=t||{},B=(new Date,[]),j=[],R=0,O=0,U=[],M=!1,W={};S.framerate=S.framerate||60,S.motionBlurFrames=2*(S.motionBlurFrames||1),_=S.verbose||!1,F=S.display||!1,S.step=1e3/S.framerate,S.timeLimit=S.timeLimit||0,S.frameLimit=S.frameLimit||0,S.startTime=S.startTime||0;var P=document.createElement("div");P.style.position="absolute",P.style.left=P.style.top=0,P.style.backgroundColor="black",P.style.fontFamily="monospace",P.style.fontSize="11px",P.style.padding="5px",P.style.color="red",P.style.zIndex=1e5,S.display&&document.body.appendChild(P);var q,z,N=document.createElement("canvas"),V=N.getContext("2d");b("Step is set to "+S.step+"ms");var H={gif:u,webm:s,ffmpegserver:h,png:o,jpg:a,"webm-mediarecorder":d},G=H[S.format];if(!G)throw"Error: Incorrect or missing format: Valid formats are "+Object.keys(H).join(", ");if(D=new G(S),D.step=c,D.on("process",v),D.on("progress",C),"performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var K=Date.now();performance.timing&&performance.timing.navigationStart&&(K=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-K}}var Z=window.setTimeout,J=window.setInterval,Y=window.clearInterval,$=window.clearTimeout,Q=window.requestAnimationFrame,X=window.Date.now,tt=window.performance.now,et=window.Date.prototype.getTime,nt=[];return{start:n,capture:w,stop:i,save:y,on:x}}var f={function:!0,object:!0},l=(parseFloat,parseInt,f[typeof exports]&&exports&&!exports.nodeType?exports:void 0),p=f[typeof module]&&module&&!module.nodeType?module:void 0,m=p&&p.exports===l?l:void 0,g=t(l&&p&&"object"==typeof global&&global),w=t(f[typeof self]&&self),v=t(f[typeof window]&&window),y=t(f[typeof this]&&this),b=g||v!==(y&&y.window)&&v||w||y||Function("return this")();"gc"in window||(window.gc=function(){}),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(t,e,n){for(var i=atob(this.toDataURL(e,n).split(",")[1]),r=i.length,o=new Uint8Array(r),a=0;a<r;a++)o[a]=i.charCodeAt(a);t(new Blob([o],{type:e||"image/png"}))}}),function(){if("performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var t=Date.now();performance.timing&&performance.timing.navigationStart&&(t=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-t}}}();var k=window.Date.now();i.prototype.start=function(){},i.prototype.stop=function(){},i.prototype.add=function(){},i.prototype.save=function(){},i.prototype.dispose=function(){},i.prototype.safeToProceed=function(){return!0},i.prototype.step=function(){console.log("Step not set!")},r.prototype=Object.create(i.prototype),r.prototype.start=function(){this.dispose()},r.prototype.add=function(t){var n=new FileReader;n.onload=function(){this.tape.append(e(this.count)+this.fileExtension,new Uint8Array(n.result)),this.count++,this.step()}.bind(this),n.readAsArrayBuffer(t)},r.prototype.save=function(t){t(this.tape.save())},r.prototype.dispose=function(){this.tape=new Tar,this.count=0},o.prototype=Object.create(r.prototype),o.prototype.add=function(t){t.toBlob(function(t){r.prototype.add.call(this,t)}.bind(this),this.type)},a.prototype=Object.create(r.prototype),a.prototype.add=function(t){t.toBlob(function(t){r.prototype.add.call(this,t)}.bind(this),this.type,this.quality)},s.prototype=Object.create(i.prototype),s.prototype.start=function(t){this.dispose()},s.prototype.add=function(t){this.frames.push(t.toDataURL("image/webp",this.quality)),this.settings.autoSaveTime>0&&this.frames.length/this.settings.framerate>=this.settings.autoSaveTime?this.save(function(t){this.filename=this.baseFilename+"-part-"+e(this.part),download(t,this.filename+this.extension,this.mimeType),this.dispose(),this.part++,this.filename=this.baseFilename+"-part-"+e(this.part),this.step()}.bind(this)):this.step()},s.prototype.save=function(t){if(this.frames.length){var e=Whammy.fromImageArray(this.frames,this.settings.framerate),n=new Blob([e],{type:"octet/stream"});t(n)}},s.prototype.dispose=function(t){this.frames=[]},h.prototype=Object.create(i.prototype),h.prototype.start=function(){this.encoder.start(this.settings)},h.prototype.add=function(t){this.encoder.add(t)},h.prototype.save=function(t){this.callback=t,this.encoder.end()},h.prototype.safeToProceed=function(){return this.encoder.safeToProceed()},d.prototype=Object.create(i.prototype),d.prototype.add=function(t){this.stream||(this.stream=t.captureStream(this.framerate),this.mediaRecorder=new MediaRecorder(this.stream),this.mediaRecorder.start(),this.mediaRecorder.ondataavailable=function(t){this.chunks.push(t.data)}.bind(this)),this.step()},d.prototype.save=function(t){this.mediaRecorder.onstop=function(e){var n=new Blob(this.chunks,{type:"video/webm"});this.chunks=[],t(n)}.bind(this),this.mediaRecorder.stop()},u.prototype=Object.create(i.prototype),u.prototype.add=function(t){this.sizeSet||(this.encoder.setOption("width",t.width),this.encoder.setOption("height",t.height),this.sizeSet=!0),this.canvas.width=t.width,this.canvas.height=t.height,this.ctx.drawImage(t,0,0),this.encoder.addFrame(this.ctx,{copy:!0,delay:this.settings.step}),this.step()},u.prototype.save=function(t){this.callback=t,this.encoder.render()},(v||w||{}).CCapture=c, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return c}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):l&&p?(m&&((p.exports=c).CCapture=c),l.CCapture=c):b.CCapture=c}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module), __webpack_require__(1)))

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_canvas_fit__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_canvas_fit___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_canvas_fit__);



const defFns = [
  [
    '1',
    'sin(1/n(x/256,y/256,t))',
    'sin(1/n(x/256,y/256,t-100))',
    '1'
  ],
  [
    'sin(sin(x/y*t)*n(x/256,y/256,t*5))',
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

Object(__WEBPACK_IMPORTED_MODULE_0__src_index__["default"])(canvas, defFns[0], config)
for (let i = 0; i < defFns.length; i++) {
  $(`#noise${i}`).addEventListener('click', function () {
    Object(__WEBPACK_IMPORTED_MODULE_0__src_index__["default"])(canvas, defFns[i], config)
  })
}
$('#gen-button').addEventListener('click', function () {
  var fns = [$('#r').value, $('#g').value, $('#b').value, $('#a').value]
  console.log(fns)
  Object(__WEBPACK_IMPORTED_MODULE_0__src_index__["default"])(canvas, fns, config)
})
window.addEventListener('resize', __WEBPACK_IMPORTED_MODULE_1_canvas_fit___default()(canvas), false)


const toggleElem = $('#menu-toggle')
const menuElem = $('#menu')
let menuDisplayed = true
toggleElem.addEventListener('click', function () {
  menuElem.style.transform = menuDisplayed ? 'translate(0px, -367px)' : 'translate(0px, 0px)'
  toggleElem.style.transform = menuDisplayed ? 'rotate(0deg)' : 'rotate(180deg)'
  menuDisplayed = !menuDisplayed
})

function $ (selector) {
  return document.querySelector(selector)
}


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var size = __webpack_require__(64)

module.exports = fit

var scratch = new Float32Array(2)

function fit(canvas, parent, scale) {
  var isSVG = canvas.nodeName.toUpperCase() === 'SVG'

  canvas.style.position = canvas.style.position || 'absolute'
  canvas.style.top = 0
  canvas.style.left = 0

  resize.scale  = parseFloat(scale || 1)
  resize.parent = parent

  return resize()

  function resize() {
    var p = resize.parent || canvas.parentNode
    if (typeof p === 'function') {
      var dims   = p(scratch) || scratch
      var width  = dims[0]
      var height = dims[1]
    } else
    if (p && p !== document.body) {
      var psize  = size(p)
      var width  = psize[0]|0
      var height = psize[1]|0
    } else {
      var width  = window.innerWidth
      var height = window.innerHeight
    }

    if (isSVG) {
      canvas.setAttribute('width', width * resize.scale + 'px')
      canvas.setAttribute('height', height * resize.scale + 'px')
    } else {
      canvas.width = width * resize.scale
      canvas.height = height * resize.scale
    }

    canvas.style.width = width + 'px'
    canvas.style.height = height + 'px'

    return resize
  }
}


/***/ }),
/* 64 */
/***/ (function(module, exports) {

module.exports = getSize

function getSize(element) {
  // Handle cases where the element is not already
  // attached to the DOM by briefly appending it
  // to document.body, and removing it again later.
  if (element === window || element === document.body) {
    return [window.innerWidth, window.innerHeight]
  }

  if (!element.parentNode) {
    var temporary = true
    document.body.appendChild(element)
  }

  var bounds = element.getBoundingClientRect()
  var styles = getComputedStyle(element)
  var height = (bounds.height|0)
    + parse(styles.getPropertyValue('margin-top'))
    + parse(styles.getPropertyValue('margin-bottom'))
  var width  = (bounds.width|0)
    + parse(styles.getPropertyValue('margin-left'))
    + parse(styles.getPropertyValue('margin-right'))

  if (temporary) {
    document.body.removeChild(element)
  }

  return [width, height]
}

function parse(prop) {
  return parseFloat(prop) || 0
}


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZmQzZDExYTk5ODE5ODEyOThlMjciLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvR0xFcnJvci5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3JlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9saXRlcmFscy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL2RvLWJpbmQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy92ZXJ0Lmdsc2wiLCJ3ZWJwYWNrOi8vLy4vc3JjL2ZyYWcuZ2xzbCIsIndlYnBhY2s6Ly8vLi9zcmMvZXFQYXJzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jbGVhci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29udGV4dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFmLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS11bmlmb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9jcmVhdGUtYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9zaGFkZXItY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWZvcm1hdC1jb21waWxlci1lcnJvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ByaW50Zi1qcy9zcmMvc3ByaW50Zi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzLzEuMC9udW1iZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXNoYWRlci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvb3BlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMtMzAwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy0zMDBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXRvYi1saXRlL2F0b2ItYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRkLWxpbmUtbnVtYmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2NyZWF0ZS1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2hpZGRlbi1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9ydW50aW1lLXJlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1yZXNldC9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlnaHQtbm93L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWFrLW1hcC93ZWFrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtYnVmZmVyL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHlwZWRhcnJheS1wb29sL3Bvb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdC10d2lkZGxlL3R3aWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2R1cC9kdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25kYXJyYXktb3BzL25kYXJyYXktb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL3RodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pcS91bmlxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZGFycmF5L25kYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lvdGEtYXJyYXkvaW90YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vdmFvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL3Zhby1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jY2FwdHVyZS5qcy9idWlsZC9DQ2FwdHVyZS5hbGwubWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYW52YXMtZml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGVtZW50LXNpemUvaW5kZXguanMiXSwibmFtZXMiOlsiY29uc3QiLCJsZXQiXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNaQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsNENBQTRDOztBQUU1Qzs7Ozs7Ozs7QUNwQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLG1CQUFtQjtBQUNqQztBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsZ0JBQWdCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixZQUFZO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQzVGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QixrQkFBa0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixjQUFjO0FBQ2hDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzlMQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0EsT0FBTyxLQUFLO0FBQ1o7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsYUFBYTtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsYUFBYTtBQUNqQztBQUNBO0FBQ0EsT0FBTztBQUNQLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixhQUFhO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Qsc0JBQXNCLGFBQWE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQ0FBbUMsS0FBSzs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdFFBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUNBQW1DLEtBQUs7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixJQUFJO0FBQ3pCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxrQkFBa0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdElBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG1CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsa0JBQWtCO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25EQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLEVBQUU7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLGlCQUFpQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0JBQStCO0FBQy9CO0FBQ0EsK0JBQStCLHFCQUFxQjtBQUNwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0M7QUFDcEM7QUFDQTtBQUNBLHNCQUFzQjtBQUN0QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFBQTtBQUNiO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7QUN6TkQ7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6U0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsbUJBQW1CO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN0QkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ1pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGdEQUFnRDtBQUNoRCw4Q0FBOEM7QUFDOUMsOENBQThDO0FBQzlDLHNDQUFzQztBQUN0QyxvQ0FBb0M7QUFDcEMsNEJBQTRCO0FBQzVCLGtDQUFrQztBQUNsQyxvQ0FBb0M7QUFDcEMsMENBQTBDO0FBQzFDLGtDQUFrQztBQUNsQzs7QUFFQTtBQUNBO0FBQ0EsNkJBQTZCLFFBQVE7QUFDckMseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDeldBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOLE1BQU07QUFDTixNQUFNO0FBQ047Ozs7Ozs7QUM5Q0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3ZGQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3BFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNyRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLGtCQUFrQjtBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxxQkFBcUI7QUFDeEU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7O0FBRXBCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsTUFBTTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDOzs7Ozs7OztBQ3JOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixtREFBbUQ7QUFDeEU7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUEsdUNBQXVDLFNBQVM7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhLGlCQUFpQjtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0QsRUFBRTtBQUNsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsZUFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSx3QkFBd0IsUUFBUTtBQUNoQztBQUNBLHFCQUFxQixlQUFlO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixZQUFZO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsbUJBQW1CLGNBQWM7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCLDRCQUE0QixjQUFjO0FBQzFDLDRCQUE0QixjQUFjO0FBQzFDLDRCQUE0QixjQUFjO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0Esa0JBQWtCLEdBQUc7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUMxTUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLEtBQUs7QUFDakI7QUFDQTtBQUNBLEdBQUc7QUFDSCxZQUFZLEtBQUs7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QStFO0FBQy9FO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUssc0JBQXNCOztBQUUzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsTUFBTTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsS0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUN0VkE7O0FBRUE7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQjs7Ozs7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3BCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7O0FDMUJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyx3QkFBd0I7QUFDdEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsZ0M7Ozs7Ozs7QUN0RkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRDQUE0QztBQUM1QywyQ0FBMkM7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQzs7Ozs7O3NEQ3RDQSwyREFBeUIsY0FBYyxrQkFBa0IscUdBQXFHLE1BQU0sSUFBSSx5QkFBeUIsa0JBQWtCLE9BQU8sRUFBRSxnQkFBZ0IsK0pBQStKLDhEQUE4RCw4QkFBOEIsTUFBTSxRQUFRLGdDQUFnQyxzR0FBc0csc0JBQXNCLE1BQU0sMkdBQTJHLGlCQUFpQiw0R0FBNEcsK0ZBQStGLGtFQUFrRSxJQUFJLDhCQUE4QixPQUFPLEVBQUUsU0FBUywwQ0FBMEMseURBQXlELHdDQUF3QyxLQUFLLDZDQUE2QyxxQkFBcUIsb0JBQW9CLFNBQVMsOENBQThDLHNDQUFzQyxlQUFlLG9CQUFvQixTQUFTLHlCQUF5QixnQkFBZ0IseUJBQXlCLG9CQUFvQixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxxQkFBcUIsRUFBRSxnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLG9CQUFvQixvQkFBb0Isb0JBQW9CLEVBQUUsdUJBQXVCLEVBQUUsdUJBQXVCLEVBQUUsNEJBQTRCLEVBQUUsRUFBRSxvQkFBb0IsY0FBYyxjQUFjLEVBQUUsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixFQUFFLG9CQUFvQixFQUFFLHNCQUFzQixFQUFFLGNBQWMsRUFBRSxjQUFjLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLEVBQUUsRUFBRSxFQUFFLHFCQUFxQixFQUFFLDZCQUE2QixXQUFXLEVBQUUsT0FBTyxjQUFjLDBCQUEwQixFQUFFLGNBQWMsY0FBYyxFQUFFLHFCQUFxQixFQUFFLEdBQUcsZUFBZSxhQUFhLHFDQUFxQyx1QkFBdUIsV0FBVyxvQkFBb0IsMEJBQTBCLDJCQUEyQixTQUFTLHNHQUFzRyxFQUFFLHNCQUFzQixlQUFlLElBQUksb0JBQW9CLGdCQUFnQixnQkFBZ0IsS0FBSywyQ0FBMkMsdUJBQXVCLHNEQUFzRCxjQUFjLGNBQWMsdURBQXVELFdBQVcsS0FBSyw4REFBOEQsZ0VBQWdFLGtIQUFrSCxpQkFBaUIsT0FBTyw2QkFBNkIsY0FBYyxhQUFhLElBQUkscUJBQXFCLG1DQUFtQyxnQkFBZ0Isa0NBQWtDLEtBQUsscUJBQXFCLFNBQVMsY0FBYyx1Q0FBdUMsV0FBVyx5QkFBeUIsU0FBUyxjQUFjLDJEQUEyRCxNQUFNLFlBQVksV0FBVyx1Q0FBdUMseUJBQXlCLGdCQUFnQixpQkFBaUIsV0FBVyxvQkFBb0IsZ0JBQWdCLCtJQUErSSxrREFBa0QsSUFBSSwyQkFBMkIsTUFBTSxNQUFNLG1JQUFtSSwwQ0FBMEMsa0JBQWtCLE1BQU0sV0FBVyx5QkFBeUIsbUJBQW1CLGtCQUFrQixFQUFFLGdCQUFnQixnQkFBZ0IsWUFBWSxXQUFXLGlEQUFpRCxTQUFTLGNBQWMsUUFBUSxtSkFBbUosc0VBQXNFLDhCQUE4QixtQkFBbUIsU0FBUyxjQUFjLHdEQUF3RCxJQUFJLDZCQUE2QixjQUFjLDBFQUEwRSxnQ0FBZ0MsY0FBYyxpQkFBaUIsV0FBVyxFQUFFLG9CQUFvQix1Q0FBdUMseURBQXlELGtDQUFrQywyQ0FBMkMsa0NBQWtDLHVCQUF1QiwwRkFBMEYsU0FBUyxjQUFjLG9GQUFvRiw4QkFBOEIscUJBQXFCLGdCQUFnQixzREFBc0QscUNBQXFDLDJGQUEyRixnSEFBZ0gsOEZBQThGLGdJQUFnSSwyQ0FBMkMsMEdBQTBHLGtCQUFrQixrQ0FBa0MsRUFBRSxzQ0FBc0MsOENBQThDLDBFQUEwRSx3RUFBd0Usa0JBQWtCLFdBQVcsOEdBQThHLE9BQU8sUUFBUSxZQUFZLEtBQUssU0FBUyxtQ0FBbUMsNkJBQTZCLHdDQUF3QyxvQ0FBb0MsK0JBQStCLEtBQUssS0FBSyxhQUFhLEVBQUUsdUNBQXVDLDJCQUEyQiw4QkFBOEIsMEJBQTBCLEtBQUssV0FBVyxjQUFjLGFBQWEsY0FBYywwQkFBMEIsUUFBUSxJQUFJLFlBQVksU0FBUyxvQkFBb0IsbUNBQW1DLGtCQUFrQixrQkFBa0IsaUVBQWlFLGtCQUFrQixRQUFRLDJDQUEyQyxJQUFJLCtCQUErQixTQUFTLGNBQWMsY0FBYyxrREFBa0QsNEJBQTRCLHFCQUFxQixJQUFJLDZDQUE2QyxtQkFBbUIsY0FBYyxNQUFNLGVBQWUsU0FBUyx3UUFBd1EsZUFBZSx5SEFBeUgsY0FBYyxhQUFhLGdCQUFnQix1QkFBdUIsNkJBQTZCLHlCQUF5QixtQkFBbUIsSUFBSSwrQkFBK0IsY0FBYyxnQ0FBZ0MscUJBQXFCLElBQUksNEJBQTRCLEVBQUUsMEJBQTBCLEVBQUUscUJBQXFCLEVBQUUscUJBQXFCLEVBQUUsMkJBQTJCLEVBQUUsd0JBQXdCLEVBQUUsMEJBQTBCLEVBQUUsc0JBQXNCLEVBQUUsNEJBQTRCLEVBQUUsdUJBQXVCLEVBQUUsd0JBQXdCLEVBQUUsd0JBQXdCLEVBQUUsNkJBQTZCLEVBQUUsNkJBQTZCLEVBQUUsa0NBQWtDLEVBQUUsMEJBQTBCLGtCQUFrQixrREFBa0QsY0FBYyxhQUFhLGNBQWMsNEVBQTRFLDJDQUEyQyxxQ0FBcUMsa0JBQWtCLDJDQUEyQyxpTEFBaUwsK0JBQStCLFNBQVMsZ0dBQWdHLDRMQUE0TCx3Q0FBd0MsZUFBZSxtQkFBbUIsSUFBSSx3QkFBd0IsNENBQTRDLHdEQUF3RCxrQkFBa0IsOENBQThDLEVBQUUsNkJBQTZCLHdDQUF3Qyx1Q0FBdUMsMkNBQTJDLGtCQUFrQixzREFBc0QsVUFBVSxrQkFBa0Isd0JBQXdCLG1DQUFtQyw2QkFBNkIsc0VBQXNFLFlBQVksMENBQTBDLG9CQUFvQixFQUFFLDhCQUE4QixtQ0FBbUMsY0FBYyxlQUFlLGdCQUFnQixLQUFLLGtEQUFrRCxtQkFBbUIscURBQXFELE9BQU8sb0NBQW9DLGlDQUFpQyxzQkFBc0Isc0NBQXNDLCtGQUErRixZQUFZLFdBQVcsdUJBQXVCLFFBQVEsc0RBQXNELHdCQUF3QixnQkFBZ0Isa0JBQWtCLGNBQWMsb0RBQW9ELDhDQUE4QyxnQkFBZ0IsZ0JBQWdCLFNBQVMsbUJBQW1CLE1BQU0sR0FBRyx5Q0FBeUMsZ0JBQWdCLFFBQVEsMEJBQTBCLGdCQUFnQix1QkFBdUIsSUFBSSxpQ0FBaUMsU0FBUyxnQkFBZ0IsYUFBYSxtQkFBbUIsbUNBQW1DLDJFQUEyRSxjQUFjLG9FQUFvRSxjQUFjLFFBQVEsK0JBQStCLDZFQUE2RSwwRUFBMEUsaUJBQWlCLHFIQUFxSCxJQUFJLGtCQUFrQixxQ0FBcUMsZ0dBQWdHLG9DQUFvQyxRQUFRLG1CQUFtQix3REFBd0QsU0FBUyxlQUFlLG9DQUFvQyxRQUFRLGNBQWMsTUFBTSx3Q0FBd0MsMkJBQTJCLCtNQUErTSx5UkFBeVIsS0FBSyx1REFBdUQsNkNBQTZDLDJCQUEyQiwrQkFBK0IsUUFBUSxtREFBbUQsMEhBQTBILG1GQUFtRixxQkFBcUIsTUFBTSxLQUFLLFlBQVksZ0VBQWdFLHdDQUF3QyxTQUFTLHNDQUFzQyxJQUFJLHdCQUF3QixTQUFTLHFDQUFxQyxxQkFBcUIsTUFBTSxLQUFLLFlBQVksYUFBYSx1QkFBdUIsU0FBUyxzQ0FBc0MsSUFBSSxrQ0FBa0Msa0RBQWtELDhCQUE4QixXQUFXLEVBQUUsaURBQWlELG1EQUFtRCwwQ0FBMEMscUNBQXFDLE1BQU0sc0VBQXNFLE1BQU0sS0FBSyxrQ0FBa0MsbUNBQW1DLDZDQUE2QyxTQUFTLDJDQUEyQyxtQkFBbUIsTUFBTSxzR0FBc0csbUJBQW1CLDJHQUEyRywyQkFBMkIsVUFBVSx1Q0FBdUMsNFFBQTRRLHdDQUF3QyxrQkFBa0IsSUFBSSxxQ0FBcUMsSUFBSSxrRUFBa0Usb0hBQW9ILHFDQUFxQyxJQUFJLEtBQUsscUJBQXFCLDRCQUE0QixJQUFJLDBFQUEwRSx1QkFBdUIsaUJBQWlCLDRCQUE0Qix3Q0FBd0MsVUFBVSxrRUFBa0UsaVBBQWlQLHdDQUF3Qyx1RUFBdUUsc0NBQXNDLE1BQU0sNFRBQTRULGlDQUFpQyxRQUFRLCtCQUErQix3TkFBd04sNEJBQTRCLDhEQUE4RCxLQUFLLGtEQUFrRCxrQ0FBa0MsU0FBUyxHQUFHLGdCQUFnQiwrQ0FBK0MsY0FBYyw0T0FBNE8sZ0dBQWdHLCtHQUErRyw2RkFBNkYsc0NBQXNDLDRDQUE0QyxFQUFFLGlHQUFpRywyREFBMkQsTUFBTSx3Q0FBd0MsOEJBQThCLDhCQUE4Qiw4QkFBOEIsME1BQTBNLDBCQUEwQixzQkFBc0IsZUFBZSx5QkFBeUIsU0FBUyw2RUFBNkUsSUFBSSx1QkFBdUIsU0FBUyxTQUFTLHlCQUF5QixvQkFBb0IsTUFBTSxpQ0FBaUMsTUFBTSw4Q0FBOEMsTUFBTSxzREFBc0QsZ0JBQWdCLFNBQVMsdUNBQXVDLHdGQUF3RixpQ0FBaUMsc0VBQXNFLDRCQUE0QixNQUFNLHdUQUF3VCx3QkFBd0IseUNBQXlDLHVCQUF1QixZQUFZLHVFQUF1RSxXQUFXLDJCQUEyQiw4Q0FBOEMsT0FBTywwQ0FBMEMsMkZBQTJGLCtDQUErQyxzQkFBc0IsU0FBUyxtQkFBbUIsbUJBQW1CLGtEQUFrRCxpREFBaUQsWUFBWSw0Q0FBNEMscUVBQXFFLG1DQUFtQyxxQ0FBcUMsaUhBQWlILHlCQUF5Qiw0QkFBNEIsYUFBYSxjQUFjLG1DQUFtQyxjQUFjLHFDQUFxQyxhQUFhLGFBQWEscUVBQXFFLHVEQUF1RCxjQUFjLFNBQVMsc0NBQXNDLE9BQU8sdUJBQXVCLFdBQVcseURBQXlELDhEQUE4RCxjQUFjLHlIQUF5SCxjQUFjLCtEQUErRCxjQUFjLCtGQUErRixjQUFjLHVDQUF1QyxnUkFBZ1IsY0FBYyx1SEFBdUgscUJBQXFCLHNEQUFzRCxvQkFBb0IsaUNBQWlDLG9EQUFvRCxzREFBc0QsaURBQWlELGdDQUFnQyxhQUFhLGNBQWMsNEpBQTRKLGNBQWMsbVBBQW1QLCtFQUErRSx5Q0FBeUMsc0RBQXNELG9EQUFvRCxvQkFBb0IsK0JBQStCLGFBQWEsY0FBYyxhQUFhLGFBQWEsb0lBQW9JLDRJQUE0SSxTQUFTLDRCQUE0QixTQUFTLGlDQUFpQyxPQUFPLG1DQUFtQywrQ0FBK0MsaUNBQWlDLFlBQVksV0FBVyxrREFBa0Qsa0NBQWtDLE9BQU8sbUNBQW1DLGdEQUFnRCxrQ0FBa0MsZ0NBQWdDLDBDQUEwQyxVQUFVLG1DQUFtQyxVQUFVLElBQUksZ0VBQWdFLE1BQU0sa0VBQWtFLE1BQU0sRUFBRSxTQUFTLE1BQU0sYUFBYSxtQkFBbUIsYUFBYSxrQkFBa0IsZ0JBQWdCLFNBQVMsYUFBYSxLQUFLLGFBQWEscU5BQXFOLGFBQWEsb0JBQW9CLHdFQUF3RSxxQkFBcUIsNk5BQTZOLGNBQWMsb0tBQW9LLGNBQWMsMERBQTBELFlBQVksV0FBVyw2REFBNkQsSUFBSSxhQUFhLHFCQUFxQixXQUFXLDBHQUEwRyxvRUFBb0UsWUFBWSxXQUFXLDhCQUE4QixLQUFLLGNBQWMsMEdBQTBHLGFBQWEsbURBQW1ELG1DQUFtQyxvQkFBb0IsMkJBQTJCLFlBQVksV0FBVywwREFBMEQsWUFBWSxXQUFXLHdFQUF3RSxzQkFBc0IsU0FBUyxPQUFPLGNBQWMsa0JBQWtCLHdEQUF3RCxZQUFZLGNBQWMsa0JBQWtCLGdCQUFnQixPQUFPLGNBQWMsV0FBVyx5REFBeUQsY0FBYyxnQkFBZ0IsMkJBQTJCLDZDQUE2QyxtTkFBbU4sb0NBQW9DLG1QQUFtUCxnRUFBZ0UsaUNBQWlDLE9BQU8sK0RBQStELGVBQWUsOEZBQThGLDZHQUE2RyxnQ0FBZ0MsMkJBQTJCLGdDQUFnQyxpQkFBaUIsaUlBQWlJLHFCQUFxQiw0TUFBNE0sT0FBTyxzQ0FBc0MsT0FBTyxzQkFBc0IscVdBQXFXLHNDQUFzQyxrR0FBa0csc0JBQXNCLHFGQUFxRixJQUFJLHlCQUF5QixnQkFBZ0Isb0JBQW9CLElBQUksYUFBYSxvREFBb0QsZ0NBQWdDLDJCQUEyQixnQ0FBZ0MsaUJBQWlCLGlJQUFpSSxzQkFBc0IsR0FBRyx3QkFBd0IsOEJBQThCLDhCQUE4Qiw2QkFBNkIsOEJBQThCLGlDQUFpQyxzQ0FBc0MsU0FBUyw2QkFBNkIsNkJBQTZCLHFFQUFxRSxlQUFlLDZCQUE2QixxQkFBcUIsb0JBQW9CLHFHQUFxRyxtQ0FBbUMsOEJBQThCLG9CQUFvQixnQ0FBZ0MsK0JBQStCLG9FQUFvRSxxQkFBcUIsNkJBQTZCLHVCQUF1QixvRUFBb0UscUJBQXFCLDZCQUE2QixvQ0FBb0Msc0VBQXNFLGVBQWUsNkJBQTZCLG9MQUFvTCwwTUFBME0seUJBQXlCLDhCQUE4Qix1QkFBdUIsaUZBQWlGLG9CQUFvQixFQUFFLE1BQU0saUNBQWlDLGVBQWUscUVBQXFFLGtDQUFrQyw2QkFBNkIsb0JBQW9CLDhCQUE4QixtQ0FBbUMsc0NBQXNDLG9DQUFvQyxvRUFBb0Usc0xBQXNMLHlCQUF5Qix5QkFBeUIsOEJBQThCLHNDQUFzQyw0QkFBNEIsa0JBQWtCLEVBQUUsb0JBQW9CLHNDQUFzQyxvRUFBb0Usa09BQWtPLGlDQUFpQyxjQUFjLDhCQUE4QixzQ0FBc0MsVUFBVSxnRUFBa0csU0FBUztBQUFBLG9LQUFpRSxHOzs7Ozs7O0FDQXZ5N0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNyQkE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDLGFBQWEsRUFBRTtBQUNmO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7Ozs7Ozs7QUM1REE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjIpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGZkM2QxMWE5OTgxOTgxMjk4ZTI3IiwiZnVuY3Rpb24gR0xFcnJvciAocmF3RXJyb3IsIHNob3J0TWVzc2FnZSwgbG9uZ01lc3NhZ2UpIHtcbiAgICB0aGlzLnNob3J0TWVzc2FnZSA9IHNob3J0TWVzc2FnZSB8fCAnJ1xuICAgIHRoaXMubG9uZ01lc3NhZ2UgPSBsb25nTWVzc2FnZSB8fCAnJ1xuICAgIHRoaXMucmF3RXJyb3IgPSByYXdFcnJvciB8fCAnJ1xuICAgIHRoaXMubWVzc2FnZSA9XG4gICAgICAnZ2wtc2hhZGVyOiAnICsgKHNob3J0TWVzc2FnZSB8fCByYXdFcnJvciB8fCAnJykgK1xuICAgICAgKGxvbmdNZXNzYWdlID8gJ1xcbicrbG9uZ01lc3NhZ2UgOiAnJylcbiAgICB0aGlzLnN0YWNrID0gKG5ldyBFcnJvcigpKS5zdGFja1xufVxuR0xFcnJvci5wcm90b3R5cGUgPSBuZXcgRXJyb3JcbkdMRXJyb3IucHJvdG90eXBlLm5hbWUgPSAnR0xFcnJvcidcbkdMRXJyb3IucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR0xFcnJvclxubW9kdWxlLmV4cG9ydHMgPSBHTEVycm9yXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL0dMRXJyb3IuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlUmVmbGVjdFR5cGVzXG5cbi8vQ29uc3RydWN0IHR5cGUgaW5mbyBmb3IgcmVmbGVjdGlvbi5cbi8vXG4vLyBUaGlzIGl0ZXJhdGVzIG92ZXIgdGhlIGZsYXR0ZW5lZCBsaXN0IG9mIHVuaWZvcm0gdHlwZSB2YWx1ZXMgYW5kIHNtYXNoZXMgdGhlbSBpbnRvIGEgSlNPTiBvYmplY3QuXG4vL1xuLy8gVGhlIGxlYXZlcyBvZiB0aGUgcmVzdWx0aW5nIG9iamVjdCBhcmUgZWl0aGVyIGluZGljZXMgb3IgdHlwZSBzdHJpbmdzIHJlcHJlc2VudGluZyBwcmltaXRpdmUgZ2xzbGlmeSB0eXBlc1xuZnVuY3Rpb24gbWFrZVJlZmxlY3RUeXBlcyh1bmlmb3JtcywgdXNlSW5kZXgpIHtcbiAgdmFyIG9iaiA9IHt9XG4gIGZvcih2YXIgaT0wOyBpPHVuaWZvcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIG4gPSB1bmlmb3Jtc1tpXS5uYW1lXG4gICAgdmFyIHBhcnRzID0gbi5zcGxpdChcIi5cIilcbiAgICB2YXIgbyA9IG9ialxuICAgIGZvcih2YXIgaj0wOyBqPHBhcnRzLmxlbmd0aDsgKytqKSB7XG4gICAgICB2YXIgeCA9IHBhcnRzW2pdLnNwbGl0KFwiW1wiKVxuICAgICAgaWYoeC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGlmKCEoeFswXSBpbiBvKSkge1xuICAgICAgICAgIG9beFswXV0gPSBbXVxuICAgICAgICB9XG4gICAgICAgIG8gPSBvW3hbMF1dXG4gICAgICAgIGZvcih2YXIgaz0xOyBrPHgubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHhba10pXG4gICAgICAgICAgaWYoazx4Lmxlbmd0aC0xIHx8IGo8cGFydHMubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGlmKCEoeSBpbiBvKSkge1xuICAgICAgICAgICAgICBpZihrIDwgeC5sZW5ndGgtMSkge1xuICAgICAgICAgICAgICAgIG9beV0gPSBbXVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9beV0gPSB7fVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvID0gb1t5XVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih1c2VJbmRleCkge1xuICAgICAgICAgICAgICBvW3ldID0gaVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb1t5XSA9IHVuaWZvcm1zW2ldLnR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZihqIDwgcGFydHMubGVuZ3RoLTEpIHtcbiAgICAgICAgaWYoISh4WzBdIGluIG8pKSB7XG4gICAgICAgICAgb1t4WzBdXSA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgbyA9IG9beFswXV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHVzZUluZGV4KSB7XG4gICAgICAgICAgb1t4WzBdXSA9IGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvW3hbMF1dID0gdW5pZm9ybXNbaV0udHlwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmpcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3JlZmxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gY3VycmVudFxuICAgICdwcmVjaXNpb24nXG4gICwgJ2hpZ2hwJ1xuICAsICdtZWRpdW1wJ1xuICAsICdsb3dwJ1xuICAsICdhdHRyaWJ1dGUnXG4gICwgJ2NvbnN0J1xuICAsICd1bmlmb3JtJ1xuICAsICd2YXJ5aW5nJ1xuICAsICdicmVhaydcbiAgLCAnY29udGludWUnXG4gICwgJ2RvJ1xuICAsICdmb3InXG4gICwgJ3doaWxlJ1xuICAsICdpZidcbiAgLCAnZWxzZSdcbiAgLCAnaW4nXG4gICwgJ291dCdcbiAgLCAnaW5vdXQnXG4gICwgJ2Zsb2F0J1xuICAsICdpbnQnXG4gICwgJ3ZvaWQnXG4gICwgJ2Jvb2wnXG4gICwgJ3RydWUnXG4gICwgJ2ZhbHNlJ1xuICAsICdkaXNjYXJkJ1xuICAsICdyZXR1cm4nXG4gICwgJ21hdDInXG4gICwgJ21hdDMnXG4gICwgJ21hdDQnXG4gICwgJ3ZlYzInXG4gICwgJ3ZlYzMnXG4gICwgJ3ZlYzQnXG4gICwgJ2l2ZWMyJ1xuICAsICdpdmVjMydcbiAgLCAnaXZlYzQnXG4gICwgJ2J2ZWMyJ1xuICAsICdidmVjMydcbiAgLCAnYnZlYzQnXG4gICwgJ3NhbXBsZXIxRCdcbiAgLCAnc2FtcGxlcjJEJ1xuICAsICdzYW1wbGVyM0QnXG4gICwgJ3NhbXBsZXJDdWJlJ1xuICAsICdzYW1wbGVyMURTaGFkb3cnXG4gICwgJ3NhbXBsZXIyRFNoYWRvdydcbiAgLCAnc3RydWN0J1xuXG4gIC8vIGZ1dHVyZVxuICAsICdhc20nXG4gICwgJ2NsYXNzJ1xuICAsICd1bmlvbidcbiAgLCAnZW51bSdcbiAgLCAndHlwZWRlZidcbiAgLCAndGVtcGxhdGUnXG4gICwgJ3RoaXMnXG4gICwgJ3BhY2tlZCdcbiAgLCAnZ290bydcbiAgLCAnc3dpdGNoJ1xuICAsICdkZWZhdWx0J1xuICAsICdpbmxpbmUnXG4gICwgJ25vaW5saW5lJ1xuICAsICd2b2xhdGlsZSdcbiAgLCAncHVibGljJ1xuICAsICdzdGF0aWMnXG4gICwgJ2V4dGVybidcbiAgLCAnZXh0ZXJuYWwnXG4gICwgJ2ludGVyZmFjZSdcbiAgLCAnbG9uZydcbiAgLCAnc2hvcnQnXG4gICwgJ2RvdWJsZSdcbiAgLCAnaGFsZidcbiAgLCAnZml4ZWQnXG4gICwgJ3Vuc2lnbmVkJ1xuICAsICdpbnB1dCdcbiAgLCAnb3V0cHV0J1xuICAsICdodmVjMidcbiAgLCAnaHZlYzMnXG4gICwgJ2h2ZWM0J1xuICAsICdkdmVjMidcbiAgLCAnZHZlYzMnXG4gICwgJ2R2ZWM0J1xuICAsICdmdmVjMidcbiAgLCAnZnZlYzMnXG4gICwgJ2Z2ZWM0J1xuICAsICdzYW1wbGVyMkRSZWN0J1xuICAsICdzYW1wbGVyM0RSZWN0J1xuICAsICdzYW1wbGVyMkRSZWN0U2hhZG93J1xuICAsICdzaXplb2YnXG4gICwgJ2Nhc3QnXG4gICwgJ25hbWVzcGFjZSdcbiAgLCAndXNpbmcnXG5dXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gS2VlcCB0aGlzIGxpc3Qgc29ydGVkXG4gICdhYnMnXG4gICwgJ2Fjb3MnXG4gICwgJ2FsbCdcbiAgLCAnYW55J1xuICAsICdhc2luJ1xuICAsICdhdGFuJ1xuICAsICdjZWlsJ1xuICAsICdjbGFtcCdcbiAgLCAnY29zJ1xuICAsICdjcm9zcydcbiAgLCAnZEZkeCdcbiAgLCAnZEZkeSdcbiAgLCAnZGVncmVlcydcbiAgLCAnZGlzdGFuY2UnXG4gICwgJ2RvdCdcbiAgLCAnZXF1YWwnXG4gICwgJ2V4cCdcbiAgLCAnZXhwMidcbiAgLCAnZmFjZWZvcndhcmQnXG4gICwgJ2Zsb29yJ1xuICAsICdmcmFjdCdcbiAgLCAnZ2xfQmFja0NvbG9yJ1xuICAsICdnbF9CYWNrTGlnaHRNb2RlbFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tMaWdodFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tNYXRlcmlhbCdcbiAgLCAnZ2xfQmFja1NlY29uZGFyeUNvbG9yJ1xuICAsICdnbF9DbGlwUGxhbmUnXG4gICwgJ2dsX0NsaXBWZXJ0ZXgnXG4gICwgJ2dsX0NvbG9yJ1xuICAsICdnbF9EZXB0aFJhbmdlJ1xuICAsICdnbF9EZXB0aFJhbmdlUGFyYW1ldGVycydcbiAgLCAnZ2xfRXllUGxhbmVRJ1xuICAsICdnbF9FeWVQbGFuZVInXG4gICwgJ2dsX0V5ZVBsYW5lUydcbiAgLCAnZ2xfRXllUGxhbmVUJ1xuICAsICdnbF9Gb2cnXG4gICwgJ2dsX0ZvZ0Nvb3JkJ1xuICAsICdnbF9Gb2dGcmFnQ29vcmQnXG4gICwgJ2dsX0ZvZ1BhcmFtZXRlcnMnXG4gICwgJ2dsX0ZyYWdDb2xvcidcbiAgLCAnZ2xfRnJhZ0Nvb3JkJ1xuICAsICdnbF9GcmFnRGF0YSdcbiAgLCAnZ2xfRnJhZ0RlcHRoJ1xuICAsICdnbF9GcmFnRGVwdGhFWFQnXG4gICwgJ2dsX0Zyb250Q29sb3InXG4gICwgJ2dsX0Zyb250RmFjaW5nJ1xuICAsICdnbF9Gcm9udExpZ2h0TW9kZWxQcm9kdWN0J1xuICAsICdnbF9Gcm9udExpZ2h0UHJvZHVjdCdcbiAgLCAnZ2xfRnJvbnRNYXRlcmlhbCdcbiAgLCAnZ2xfRnJvbnRTZWNvbmRhcnlDb2xvcidcbiAgLCAnZ2xfTGlnaHRNb2RlbCdcbiAgLCAnZ2xfTGlnaHRNb2RlbFBhcmFtZXRlcnMnXG4gICwgJ2dsX0xpZ2h0TW9kZWxQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRTb3VyY2UnXG4gICwgJ2dsX0xpZ2h0U291cmNlUGFyYW1ldGVycydcbiAgLCAnZ2xfTWF0ZXJpYWxQYXJhbWV0ZXJzJ1xuICAsICdnbF9NYXhDbGlwUGxhbmVzJ1xuICAsICdnbF9NYXhDb21iaW5lZFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhEcmF3QnVmZmVycydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRVbmlmb3JtQ29tcG9uZW50cydcbiAgLCAnZ2xfTWF4TGlnaHRzJ1xuICAsICdnbF9NYXhUZXh0dXJlQ29vcmRzJ1xuICAsICdnbF9NYXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VGV4dHVyZVVuaXRzJ1xuICAsICdnbF9NYXhWYXJ5aW5nRmxvYXRzJ1xuICAsICdnbF9NYXhWZXJ0ZXhBdHRyaWJzJ1xuICAsICdnbF9NYXhWZXJ0ZXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VmVydGV4VW5pZm9ybUNvbXBvbmVudHMnXG4gICwgJ2dsX01vZGVsVmlld01hdHJpeCdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4VHJhbnNwb3NlJ1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4J1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3UHJvamVjdGlvbk1hdHJpeEludmVyc2VUcmFuc3Bvc2UnXG4gICwgJ2dsX01vZGVsVmlld1Byb2plY3Rpb25NYXRyaXhUcmFuc3Bvc2UnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQwJ1xuICAsICdnbF9NdWx0aVRleENvb3JkMSdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDInXG4gICwgJ2dsX011bHRpVGV4Q29vcmQzJ1xuICAsICdnbF9NdWx0aVRleENvb3JkNCdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDUnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQ2J1xuICAsICdnbF9NdWx0aVRleENvb3JkNydcbiAgLCAnZ2xfTm9ybWFsJ1xuICAsICdnbF9Ob3JtYWxNYXRyaXgnXG4gICwgJ2dsX05vcm1hbFNjYWxlJ1xuICAsICdnbF9PYmplY3RQbGFuZVEnXG4gICwgJ2dsX09iamVjdFBsYW5lUidcbiAgLCAnZ2xfT2JqZWN0UGxhbmVTJ1xuICAsICdnbF9PYmplY3RQbGFuZVQnXG4gICwgJ2dsX1BvaW50J1xuICAsICdnbF9Qb2ludENvb3JkJ1xuICAsICdnbF9Qb2ludFBhcmFtZXRlcnMnXG4gICwgJ2dsX1BvaW50U2l6ZSdcbiAgLCAnZ2xfUG9zaXRpb24nXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXgnXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9Qcm9qZWN0aW9uTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfUHJvamVjdGlvbk1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfU2Vjb25kYXJ5Q29sb3InXG4gICwgJ2dsX1RleENvb3JkJ1xuICAsICdnbF9UZXh0dXJlRW52Q29sb3InXG4gICwgJ2dsX1RleHR1cmVNYXRyaXgnXG4gICwgJ2dsX1RleHR1cmVNYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9UZXh0dXJlTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfVGV4dHVyZU1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfVmVydGV4J1xuICAsICdncmVhdGVyVGhhbidcbiAgLCAnZ3JlYXRlclRoYW5FcXVhbCdcbiAgLCAnaW52ZXJzZXNxcnQnXG4gICwgJ2xlbmd0aCdcbiAgLCAnbGVzc1RoYW4nXG4gICwgJ2xlc3NUaGFuRXF1YWwnXG4gICwgJ2xvZydcbiAgLCAnbG9nMidcbiAgLCAnbWF0cml4Q29tcE11bHQnXG4gICwgJ21heCdcbiAgLCAnbWluJ1xuICAsICdtaXgnXG4gICwgJ21vZCdcbiAgLCAnbm9ybWFsaXplJ1xuICAsICdub3QnXG4gICwgJ25vdEVxdWFsJ1xuICAsICdwb3cnXG4gICwgJ3JhZGlhbnMnXG4gICwgJ3JlZmxlY3QnXG4gICwgJ3JlZnJhY3QnXG4gICwgJ3NpZ24nXG4gICwgJ3NpbidcbiAgLCAnc21vb3Roc3RlcCdcbiAgLCAnc3FydCdcbiAgLCAnc3RlcCdcbiAgLCAndGFuJ1xuICAsICd0ZXh0dXJlMkQnXG4gICwgJ3RleHR1cmUyRExvZCdcbiAgLCAndGV4dHVyZTJEUHJvaidcbiAgLCAndGV4dHVyZTJEUHJvakxvZCdcbiAgLCAndGV4dHVyZUN1YmUnXG4gICwgJ3RleHR1cmVDdWJlTG9kJ1xuICAsICd0ZXh0dXJlMkRMb2RFWFQnXG4gICwgJ3RleHR1cmUyRFByb2pMb2RFWFQnXG4gICwgJ3RleHR1cmVDdWJlTG9kRVhUJ1xuICAsICd0ZXh0dXJlMkRHcmFkRVhUJ1xuICAsICd0ZXh0dXJlMkRQcm9qR3JhZEVYVCdcbiAgLCAndGV4dHVyZUN1YmVHcmFkRVhUJ1xuXVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gZG9CaW5kKGdsLCBlbGVtZW50cywgYXR0cmlidXRlcykge1xuICBpZihlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmJpbmQoKVxuICB9IGVsc2Uge1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpXG4gIH1cbiAgdmFyIG5hdHRyaWJzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfQVRUUklCUyl8MFxuICBpZihhdHRyaWJ1dGVzKSB7XG4gICAgaWYoYXR0cmlidXRlcy5sZW5ndGggPiBuYXR0cmlicykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtdmFvOiBUb28gbWFueSB2ZXJ0ZXggYXR0cmlidXRlc1wiKVxuICAgIH1cbiAgICBmb3IodmFyIGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYXR0cmliID0gYXR0cmlidXRlc1tpXVxuICAgICAgaWYoYXR0cmliLmJ1ZmZlcikge1xuICAgICAgICB2YXIgYnVmZmVyID0gYXR0cmliLmJ1ZmZlclxuICAgICAgICB2YXIgc2l6ZSA9IGF0dHJpYi5zaXplIHx8IDRcbiAgICAgICAgdmFyIHR5cGUgPSBhdHRyaWIudHlwZSB8fCBnbC5GTE9BVFxuICAgICAgICB2YXIgbm9ybWFsaXplZCA9ICEhYXR0cmliLm5vcm1hbGl6ZWRcbiAgICAgICAgdmFyIHN0cmlkZSA9IGF0dHJpYi5zdHJpZGUgfHwgMFxuICAgICAgICB2YXIgb2Zmc2V0ID0gYXR0cmliLm9mZnNldCB8fCAwXG4gICAgICAgIGJ1ZmZlci5iaW5kKClcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihpLCBzaXplLCB0eXBlLCBub3JtYWxpemVkLCBzdHJpZGUsIG9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHR5cGVvZiBhdHRyaWIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpLCBhdHRyaWIpXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliMWYoaSwgYXR0cmliWzBdKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjJmKGksIGF0dHJpYlswXSwgYXR0cmliWzFdKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjNmKGksIGF0dHJpYlswXSwgYXR0cmliWzFdLCBhdHRyaWJbMl0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliNGYoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0sIGF0dHJpYlsyXSwgYXR0cmliWzNdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdsLXZhbzogSW52YWxpZCB2ZXJ0ZXggYXR0cmlidXRlXCIpXG4gICAgICAgIH1cbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvcig7IGk8bmF0dHJpYnM7ICsraSkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxuICAgIGZvcih2YXIgaT0wOyBpPG5hdHRyaWJzOyArK2kpIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvQmluZFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvZG8tYmluZC5qc1xuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5nbHNsJ1xyXG5pbXBvcnQgcmF3RnJhZyBmcm9tICcuL2ZyYWcuZ2xzbCdcclxuaW1wb3J0IGVxUGFyc2VyIGZyb20gJy4vZXFQYXJzZXInXHJcblxyXG5pbXBvcnQgZ2xDbGVhciBmcm9tICdnbC1jbGVhcidcclxuaW1wb3J0IGdsQ29udGV4dCBmcm9tICdnbC1jb250ZXh0J1xyXG5pbXBvcnQgZ2xTaGFkZXIgZnJvbSAnZ2wtc2hhZGVyJ1xyXG5pbXBvcnQgZ2xSZXNldCBmcm9tICdnbC1yZXNldCdcclxuaW1wb3J0IG5vdyBmcm9tICdyaWdodC1ub3cnXHJcbmltcG9ydCBkcmF3IGZyb20gJ2EtYmlnLXRyaWFuZ2xlJ1xyXG5pbXBvcnQgQ0NhcHR1cmUgZnJvbSAnY2NhcHR1cmUuanMnXHJcblxyXG5jb25zdCBjbGVhciA9IGdsQ2xlYXIoeyBjb2xvcjogWzAsIDEsIDAsIDFdIH0pXHJcbmNvbnN0IGZyYWdMb29rdXAgPSB7XHJcbiAgXCIlUl9GTiVcIjogMCxcclxuICBcIiVHX0ZOJVwiOiAxLFxyXG4gIFwiJUJfRk4lXCI6IDIsXHJcbiAgXCIlQV9GTiVcIjogM1xyXG59XHJcbmxldCBnbFxyXG5sZXQgc2hhZGVyXHJcbmxldCB0RmFjdG9yXHJcbmxldCBjYW52YXNcclxubGV0IGNhcHR1cmVyXHJcbmxldCByZXNldFxyXG5sZXQgdGltZSA9IG5vdygpIC8gMTAwMFxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZSAoKSB7XHJcbiAgdGltZSA9IG5vdygpIC8gMTAwMFxyXG59XHJcbmZ1bmN0aW9uIHJlbmRlciAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSBnbC5kcmF3aW5nQnVmZmVyV2lkdGhcclxuICBjb25zdCBoZWlnaHQgPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XHJcblxyXG4gIGFuaW1hdGUoKVxyXG4gIGNsZWFyKGdsKVxyXG4gIGdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXHJcblxyXG4gIHNoYWRlci5iaW5kKClcclxuICBzaGFkZXIudW5pZm9ybXMudCA9IHRGYWN0b3IgKiB0aW1lXHJcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ucG9pbnRlcigpXHJcbiAgZHJhdyhnbClcclxuICBcclxuICBpZiAoY2FwdHVyZXIpIHtcclxuICAgIGNhcHR1cmVyLmNhcHR1cmUoY2FudmFzKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdml6cGxleCAodGFyZ2V0LCByZ2JhLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICBjYXB0dXJlciA9IG9wdGlvbnMuY2NhcENvbmZpZyA/IG5ldyBDQ2FwdHVyZShvcHRpb25zLmNjYXBDb25maWcpIDogbnVsbFxyXG4gIHRGYWN0b3IgPSBvcHRpb25zLnRpbWVGYWN0b3IgfHwgMVxyXG4gIGNhbnZhcyA9IHR5cGVvZiB0YXJnZXQgPT09IFwic3RyaW5nXCJcclxuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcbiAgICA6IHRhcmdldFxyXG4gIGxldCBmcmFnXHJcblxyXG4gIGlmIChjYXB0dXJlcikge1xyXG4gICAgY2FwdHVyZXIuc3RhcnQoKVxyXG4gIH1cclxuICBpZiAoZ2wpIHtcclxuICAgIHJlc2V0KClcclxuICB9XHJcblxyXG4gIGdsID0gZ2xDb250ZXh0KGNhbnZhcywgcmVuZGVyKVxyXG4gIHJlc2V0ID0gZ2xSZXNldChnbClcclxuICByZ2JhID0gcmdiYS5tYXAoZm5TdHIgPT4gZXFQYXJzZXIoZm5TdHIpKVxyXG4gIGZyYWcgPSByYXdGcmFnLnJlcGxhY2UoLyglUl9GTiV8JUdfRk4lfCVCX0ZOJXwlQV9GTiUpL2csIHN1YnN0ciA9PiByZ2JhW2ZyYWdMb29rdXBbc3Vic3RyXV0pXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJU5PSVNFJS9nLCAnc25vaXNlXzFfMycpXHJcbiAgc2hhZGVyID0gZ2xTaGFkZXIoZ2wsIHZlcnQsIGZyYWcpXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuYXR0cmlidXRlIHZlYzMgcG9zaXRpb247XFxuXFxudm9pZCBtYWluKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZlcnQuZ2xzbFxuLy8gbW9kdWxlIGlkID0gN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbnVuaWZvcm0gZmxvYXQgdDtcXG5cXG4vL1xcbi8vIERlc2NyaXB0aW9uIDogQXJyYXkgYW5kIHRleHR1cmVsZXNzIEdMU0wgMkQvM0QvNEQgc2ltcGxleFxcbi8vICAgICAgICAgICAgICAgbm9pc2UgZnVuY3Rpb25zLlxcbi8vICAgICAgQXV0aG9yIDogSWFuIE1jRXdhbiwgQXNoaW1hIEFydHMuXFxuLy8gIE1haW50YWluZXIgOiBpam1cXG4vLyAgICAgTGFzdG1vZCA6IDIwMTEwODIyIChpam0pXFxuLy8gICAgIExpY2Vuc2UgOiBDb3B5cmlnaHQgKEMpIDIwMTEgQXNoaW1hIEFydHMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuLy8gICAgICAgICAgICAgICBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUuXFxuLy8gICAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vYXNoaW1hL3dlYmdsLW5vaXNlXFxuLy9cXG5cXG52ZWMzIG1vZDI4OV8xXzAodmVjMyB4KSB7XFxuICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xcbn1cXG5cXG52ZWM0IG1vZDI4OV8xXzAodmVjNCB4KSB7XFxuICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xcbn1cXG5cXG52ZWM0IHBlcm11dGVfMV8xKHZlYzQgeCkge1xcbiAgICAgcmV0dXJuIG1vZDI4OV8xXzAoKCh4KjM0LjApKzEuMCkqeCk7XFxufVxcblxcbnZlYzQgdGF5bG9ySW52U3FydF8xXzIodmVjNCByKVxcbntcXG4gIHJldHVybiAxLjc5Mjg0MjkxNDAwMTU5IC0gMC44NTM3MzQ3MjA5NTMxNCAqIHI7XFxufVxcblxcbmZsb2F0IHNub2lzZV8xXzModmVjMyB2KVxcbiAge1xcbiAgY29uc3QgdmVjMiAgQyA9IHZlYzIoMS4wLzYuMCwgMS4wLzMuMCkgO1xcbiAgY29uc3QgdmVjNCAgRF8xXzQgPSB2ZWM0KDAuMCwgMC41LCAxLjAsIDIuMCk7XFxuXFxuLy8gRmlyc3QgY29ybmVyXFxuICB2ZWMzIGkgID0gZmxvb3IodiArIGRvdCh2LCBDLnl5eSkgKTtcXG4gIHZlYzMgeDAgPSAgIHYgLSBpICsgZG90KGksIEMueHh4KSA7XFxuXFxuLy8gT3RoZXIgY29ybmVyc1xcbiAgdmVjMyBnXzFfNSA9IHN0ZXAoeDAueXp4LCB4MC54eXopO1xcbiAgdmVjMyBsID0gMS4wIC0gZ18xXzU7XFxuICB2ZWMzIGkxID0gbWluKCBnXzFfNS54eXosIGwuenh5ICk7XFxuICB2ZWMzIGkyID0gbWF4KCBnXzFfNS54eXosIGwuenh5ICk7XFxuXFxuICAvLyAgIHgwID0geDAgLSAwLjAgKyAwLjAgKiBDLnh4eDtcXG4gIC8vICAgeDEgPSB4MCAtIGkxICArIDEuMCAqIEMueHh4O1xcbiAgLy8gICB4MiA9IHgwIC0gaTIgICsgMi4wICogQy54eHg7XFxuICAvLyAgIHgzID0geDAgLSAxLjAgKyAzLjAgKiBDLnh4eDtcXG4gIHZlYzMgeDEgPSB4MCAtIGkxICsgQy54eHg7XFxuICB2ZWMzIHgyID0geDAgLSBpMiArIEMueXl5OyAvLyAyLjAqQy54ID0gMS8zID0gQy55XFxuICB2ZWMzIHgzID0geDAgLSBEXzFfNC55eXk7ICAgICAgLy8gLTEuMCszLjAqQy54ID0gLTAuNSA9IC1ELnlcXG5cXG4vLyBQZXJtdXRhdGlvbnNcXG4gIGkgPSBtb2QyODlfMV8wKGkpO1xcbiAgdmVjNCBwID0gcGVybXV0ZV8xXzEoIHBlcm11dGVfMV8xKCBwZXJtdXRlXzFfMShcXG4gICAgICAgICAgICAgaS56ICsgdmVjNCgwLjAsIGkxLnosIGkyLnosIDEuMCApKVxcbiAgICAgICAgICAgKyBpLnkgKyB2ZWM0KDAuMCwgaTEueSwgaTIueSwgMS4wICkpXFxuICAgICAgICAgICArIGkueCArIHZlYzQoMC4wLCBpMS54LCBpMi54LCAxLjAgKSk7XFxuXFxuLy8gR3JhZGllbnRzOiA3eDcgcG9pbnRzIG92ZXIgYSBzcXVhcmUsIG1hcHBlZCBvbnRvIGFuIG9jdGFoZWRyb24uXFxuLy8gVGhlIHJpbmcgc2l6ZSAxNyoxNyA9IDI4OSBpcyBjbG9zZSB0byBhIG11bHRpcGxlIG9mIDQ5ICg0OSo2ID0gMjk0KVxcbiAgZmxvYXQgbl8gPSAwLjE0Mjg1NzE0Mjg1NzsgLy8gMS4wLzcuMFxcbiAgdmVjMyAgbnMgPSBuXyAqIERfMV80Lnd5eiAtIERfMV80Lnh6eDtcXG5cXG4gIHZlYzQgaiA9IHAgLSA0OS4wICogZmxvb3IocCAqIG5zLnogKiBucy56KTsgIC8vICBtb2QocCw3KjcpXFxuXFxuICB2ZWM0IHhfID0gZmxvb3IoaiAqIG5zLnopO1xcbiAgdmVjNCB5XyA9IGZsb29yKGogLSA3LjAgKiB4XyApOyAgICAvLyBtb2QoaixOKVxcblxcbiAgdmVjNCB4ID0geF8gKm5zLnggKyBucy55eXl5O1xcbiAgdmVjNCB5ID0geV8gKm5zLnggKyBucy55eXl5O1xcbiAgdmVjNCBoID0gMS4wIC0gYWJzKHgpIC0gYWJzKHkpO1xcblxcbiAgdmVjNCBiMCA9IHZlYzQoIHgueHksIHkueHkgKTtcXG4gIHZlYzQgYjEgPSB2ZWM0KCB4Lnp3LCB5Lnp3ICk7XFxuXFxuICAvL3ZlYzQgczAgPSB2ZWM0KGxlc3NUaGFuKGIwLDAuMCkpKjIuMCAtIDEuMDtcXG4gIC8vdmVjNCBzMSA9IHZlYzQobGVzc1RoYW4oYjEsMC4wKSkqMi4wIC0gMS4wO1xcbiAgdmVjNCBzMCA9IGZsb29yKGIwKSoyLjAgKyAxLjA7XFxuICB2ZWM0IHMxID0gZmxvb3IoYjEpKjIuMCArIDEuMDtcXG4gIHZlYzQgc2ggPSAtc3RlcChoLCB2ZWM0KDAuMCkpO1xcblxcbiAgdmVjNCBhMCA9IGIwLnh6eXcgKyBzMC54enl3KnNoLnh4eXkgO1xcbiAgdmVjNCBhMV8xXzYgPSBiMS54enl3ICsgczEueHp5dypzaC56end3IDtcXG5cXG4gIHZlYzMgcDBfMV83ID0gdmVjMyhhMC54eSxoLngpO1xcbiAgdmVjMyBwMSA9IHZlYzMoYTAuencsaC55KTtcXG4gIHZlYzMgcDIgPSB2ZWMzKGExXzFfNi54eSxoLnopO1xcbiAgdmVjMyBwMyA9IHZlYzMoYTFfMV82Lnp3LGgudyk7XFxuXFxuLy9Ob3JtYWxpc2UgZ3JhZGllbnRzXFxuICB2ZWM0IG5vcm0gPSB0YXlsb3JJbnZTcXJ0XzFfMih2ZWM0KGRvdChwMF8xXzcscDBfMV83KSwgZG90KHAxLHAxKSwgZG90KHAyLCBwMiksIGRvdChwMyxwMykpKTtcXG4gIHAwXzFfNyAqPSBub3JtLng7XFxuICBwMSAqPSBub3JtLnk7XFxuICBwMiAqPSBub3JtLno7XFxuICBwMyAqPSBub3JtLnc7XFxuXFxuLy8gTWl4IGZpbmFsIG5vaXNlIHZhbHVlXFxuICB2ZWM0IG0gPSBtYXgoMC42IC0gdmVjNChkb3QoeDAseDApLCBkb3QoeDEseDEpLCBkb3QoeDIseDIpLCBkb3QoeDMseDMpKSwgMC4wKTtcXG4gIG0gPSBtICogbTtcXG4gIHJldHVybiA0Mi4wICogZG90KCBtKm0sIHZlYzQoIGRvdChwMF8xXzcseDApLCBkb3QocDEseDEpLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90KHAyLHgyKSwgZG90KHAzLHgzKSApICk7XFxuICB9XFxuXFxuXFxuXFxuXFxudm9pZCBtYWluKCkge1xcbiAgZmxvYXQgciA9ICVSX0ZOJTtcXG4gIGZsb2F0IGcgPSAlR19GTiU7XFxuICBmbG9hdCBiID0gJUJfRk4lO1xcbiAgZmxvYXQgYSA9ICVBX0ZOJTtcXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQociwgZywgYiwgYSk7XFxufVxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZnJhZy5nbHNsXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXFQYXJzZXIgKGVxKSB7XHJcbiAgdmFyIG5vaXNlUmVnZXggPSAvKFteaV18XiluL2dcclxuICB2YXIgYXJnc1JlZ2V4ID0gLyh4fHkpL2dcclxuICB2YXIgZmxvYXRSZWdleCA9IC8oW15jXXxeKShbLV0/XFxkKyhcXC5cXGQrKT8pL2dcclxuICB2YXIgbWF0Y2hlcyA9IFtdXHJcbiAgdmFyIG1hdGNoXHJcblxyXG4gIHdoaWxlICgobWF0Y2ggPSBub2lzZVJlZ2V4LmV4ZWMoZXEpKSAhPT0gbnVsbCkge1xyXG4gICAgbWF0Y2hlcy5wdXNoKG1hdGNoLmluZGV4KVxyXG4gIH1cclxuICBtYXRjaGVzLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgIHZhciBwID0gLTFcclxuICAgIC8vIGluZGV4IGlzIHBvc2l0aW9uIHByaW9yIHRvIG4sIHNvIHdlIG5lZWQgdG8gc2tpcCAzIHRvIGdldCB0byBjb250ZW50XHJcbiAgICBmb3IgKHZhciBpID0gZWxlbSArIDM7IGkgPCBlcS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoZXFbaV0gPT09ICcpJykge1xyXG4gICAgICAgIHArK1xyXG4gICAgICAgIGlmIChwID09PSAwKSB7XHJcbiAgICAgICAgICBlcSA9IGVxLnNsaWNlKDAsIGkpICsgJyknICsgZXEuc2xpY2UoaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoZXFbaV0gPT09ICcoJykge1xyXG4gICAgICAgIHAtLVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gZXEucmVwbGFjZShub2lzZVJlZ2V4LCAnJDElTk9JU0UlKHZlYzMnKVxyXG4gICAgICAgICAgIC5yZXBsYWNlKGFyZ3NSZWdleCwgJ2dsX0ZyYWdDb29yZC4kMScpXHJcbiAgICAgICAgICAgLnJlcGxhY2UoZmxvYXRSZWdleCwgZnVuY3Rpb24gKG1hdGNoLCBwcmUsIG51bSkge1xyXG4gICAgICAgICAgICAgbnVtID0gTnVtYmVyKG51bSlcclxuICAgICAgICAgICAgIHJldHVybiAobnVtICUgMSA9PT0gMCkgPyBgJHtwcmV9JHtudW19LjBgIDogYCR7cHJlfSR7bnVtfWBcclxuICAgICAgICAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lcVBhcnNlci5qcyIsInZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFyXG5cbmZ1bmN0aW9uIGNsZWFyKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge31cblxuICB2YXIgY29sb3IgPSBkZWZhdWx0cy5jb2xvcihvcHRzLmNvbG9yKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xlYXIsICdjb2xvcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29sb3IgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gY29sb3IgPSBkZWZhdWx0cy5jb2xvcih2YWx1ZSlcbiAgICB9XG4gIH0pXG5cbiAgdmFyIGRlcHRoID0gZGVmYXVsdHMuZGVwdGgob3B0cy5kZXB0aClcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsZWFyLCAnZGVwdGgnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGRlcHRoIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGRlcHRoID0gZGVmYXVsdHMuZGVwdGgodmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHZhciBzdGVuY2lsID0gZGVmYXVsdHMuc3RlbmNpbChvcHRzLnN0ZW5jaWwpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGVhciwgJ3N0ZW5jaWwnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHN0ZW5jaWwgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gc3RlbmNpbCA9IGRlZmF1bHRzLnN0ZW5jaWwodmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBjbGVhclxuXG4gIGZ1bmN0aW9uIGNsZWFyKGdsKSB7XG4gICAgdmFyIGZsYWdzID0gMFxuXG4gICAgaWYgKGNvbG9yICE9PSBmYWxzZSkge1xuICAgICAgZ2wuY2xlYXJDb2xvcihjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCBjb2xvclszXSlcbiAgICAgIGZsYWdzIHw9IGdsLkNPTE9SX0JVRkZFUl9CSVRcbiAgICB9XG4gICAgaWYgKGRlcHRoICE9PSBmYWxzZSkge1xuICAgICAgZ2wuY2xlYXJEZXB0aChkZXB0aClcbiAgICAgIGZsYWdzIHw9IGdsLkRFUFRIX0JVRkZFUl9CSVRcbiAgICB9XG4gICAgaWYgKHN0ZW5jaWwgIT09IGZhbHNlKSB7XG4gICAgICBnbC5jbGVhclN0ZW5jaWwoc3RlbmNpbClcbiAgICAgIGZsYWdzIHw9IGdsLlNURU5DSUxfQlVGRkVSX0JJVFxuICAgIH1cblxuICAgIGdsLmNsZWFyKGZsYWdzKVxuXG4gICAgcmV0dXJuIGdsXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMuY29sb3IgPSBmdW5jdGlvbihjb2xvcikge1xuICByZXR1cm4gYXJyYXkoY29sb3IsIFswLCAwLCAwLCAxXSlcbn1cblxuZXhwb3J0cy5kZXB0aCA9IGZ1bmN0aW9uKGRlcHRoKSB7XG4gIHJldHVybiBudW1iZXIoZGVwdGgsIDEpXG59XG5cbmV4cG9ydHMuc3RlbmNpbCA9IGZ1bmN0aW9uKHN0ZW5jaWwpIHtcbiAgcmV0dXJuIG51bWJlcihzdGVuY2lsLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gbnVtYmVyKG4sIGRlZikge1xuICBpZiAobiA9PT0gZmFsc2UpIHJldHVybiBmYWxzZVxuICBpZiAodHlwZW9mIG4gPT09ICd1bmRlZmluZWQnKSByZXR1cm4gZGVmXG4gIHJldHVybiBuICsgMFxufVxuXG5mdW5jdGlvbiBhcnJheShhLCBkZWYpIHtcbiAgaWYgKGEgPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcbiAgaWYgKEFycmF5LmlzQXJyYXkoYSkpIHJldHVybiBhIHx8IGRlZlxuICByZXR1cm4gZGVmXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jbGVhci9kZWZhdWx0cy5qc1xuLy8gbW9kdWxlIGlkID0gMTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgcmFmID0gcmVxdWlyZSgncmFmLWNvbXBvbmVudCcpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQ29udGV4dFxuXG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KGNhbnZhcywgb3B0cywgcmVuZGVyKSB7XG4gIGlmICh0eXBlb2Ygb3B0cyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJlbmRlciA9IG9wdHNcbiAgICBvcHRzID0ge31cbiAgfSBlbHNlIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fVxuICB9XG5cbiAgdmFyIGdsID0gKFxuICAgIGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbCcsIG9wdHMpIHx8XG4gICAgY2FudmFzLmdldENvbnRleHQoJ3dlYmdsLWV4cGVyaW1lbnRhbCcsIG9wdHMpIHx8XG4gICAgY2FudmFzLmdldENvbnRleHQoJ2V4cGVyaW1lbnRhbC13ZWJnbCcsIG9wdHMpXG4gIClcblxuICBpZiAoIWdsKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdVbmFibGUgdG8gaW5pdGlhbGl6ZSBXZWJHTCcpXG4gIH1cblxuICBpZiAocmVuZGVyKSByYWYodGljaylcblxuICByZXR1cm4gZ2xcblxuICBmdW5jdGlvbiB0aWNrKCkge1xuICAgIHJlbmRlcihnbClcbiAgICByYWYodGljaylcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY29udGV4dC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIEV4cG9zZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClgLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCBmYWxsYmFjaztcblxuLyoqXG4gKiBGYWxsYmFjayBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuXG52YXIgcHJldiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuZnVuY3Rpb24gZmFsbGJhY2soZm4pIHtcbiAgdmFyIGN1cnIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgdmFyIG1zID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyciAtIHByZXYpKTtcbiAgdmFyIHJlcSA9IHNldFRpbWVvdXQoZm4sIG1zKTtcbiAgcHJldiA9IGN1cnI7XG4gIHJldHVybiByZXE7XG59XG5cbi8qKlxuICogQ2FuY2VsLlxuICovXG5cbnZhciBjYW5jZWwgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5cbmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oaWQpe1xuICBjYW5jZWwuY2FsbCh3aW5kb3csIGlkKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYWYtY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgY3JlYXRlVW5pZm9ybVdyYXBwZXIgICA9IHJlcXVpcmUoJy4vbGliL2NyZWF0ZS11bmlmb3JtcycpXG52YXIgY3JlYXRlQXR0cmlidXRlV3JhcHBlciA9IHJlcXVpcmUoJy4vbGliL2NyZWF0ZS1hdHRyaWJ1dGVzJylcbnZhciBtYWtlUmVmbGVjdCAgICAgICAgICAgID0gcmVxdWlyZSgnLi9saWIvcmVmbGVjdCcpXG52YXIgc2hhZGVyQ2FjaGUgICAgICAgICAgICA9IHJlcXVpcmUoJy4vbGliL3NoYWRlci1jYWNoZScpXG52YXIgcnVudGltZSAgICAgICAgICAgICAgICA9IHJlcXVpcmUoJy4vbGliL3J1bnRpbWUtcmVmbGVjdCcpXG52YXIgR0xFcnJvciAgICAgICAgICAgICAgICA9IHJlcXVpcmUoXCIuL2xpYi9HTEVycm9yXCIpXG5cbi8vU2hhZGVyIG9iamVjdFxuZnVuY3Rpb24gU2hhZGVyKGdsKSB7XG4gIHRoaXMuZ2wgICAgICAgICA9IGdsXG4gIHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50ID0gMCAgLy8gZml4bWUgd2hlcmUgZWxzZSBzaG91bGQgd2Ugc3RvcmUgaW5mbywgc2FmZSBidXQgbm90IG5pY2Ugb24gdGhlIGdsIG9iamVjdFxuXG4gIC8vRGVmYXVsdCBpbml0aWFsaXplIHRoZXNlIHRvIG51bGxcbiAgdGhpcy5fdnJlZiAgICAgID1cbiAgdGhpcy5fZnJlZiAgICAgID1cbiAgdGhpcy5fcmVsaW5rICAgID1cbiAgdGhpcy52ZXJ0U2hhZGVyID1cbiAgdGhpcy5mcmFnU2hhZGVyID1cbiAgdGhpcy5wcm9ncmFtICAgID1cbiAgdGhpcy5hdHRyaWJ1dGVzID1cbiAgdGhpcy51bmlmb3JtcyAgID1cbiAgdGhpcy50eXBlcyAgICAgID0gbnVsbFxufVxuXG52YXIgcHJvdG8gPSBTaGFkZXIucHJvdG90eXBlXG5cbnByb3RvLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgaWYoIXRoaXMucHJvZ3JhbSkge1xuICAgIHRoaXMuX3JlbGluaygpXG4gIH1cblxuICAvLyBlbnN1cmluZyB0aGF0IHdlIGhhdmUgdGhlIHJpZ2h0IG51bWJlciBvZiBlbmFibGVkIHZlcnRleCBhdHRyaWJ1dGVzXG4gIHZhciBpXG4gIHZhciBuZXdBdHRyaWJDb3VudCA9IHRoaXMuZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0aGlzLnByb2dyYW0sIHRoaXMuZ2wuQUNUSVZFX0FUVFJJQlVURVMpIC8vIG1vcmUgcm9idXN0IGFwcHJvYWNoXG4gIC8vdmFyIG5ld0F0dHJpYkNvdW50ID0gT2JqZWN0LmtleXModGhpcy5hdHRyaWJ1dGVzKS5sZW5ndGggLy8gYXZvaWRzIHRoZSBwcm9iYWJseSBpbW1hdGVyaWFsIGludHJvc3BlY3Rpb24gc2xvd2Rvd25cbiAgdmFyIG9sZEF0dHJpYkNvdW50ID0gdGhpcy5nbC5sYXN0QXR0cmliQ291bnRcbiAgaWYobmV3QXR0cmliQ291bnQgPiBvbGRBdHRyaWJDb3VudCkge1xuICAgIGZvcihpID0gb2xkQXR0cmliQ291bnQ7IGkgPCBuZXdBdHRyaWJDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9IGVsc2UgaWYob2xkQXR0cmliQ291bnQgPiBuZXdBdHRyaWJDb3VudCkge1xuICAgIGZvcihpID0gbmV3QXR0cmliQ291bnQ7IGkgPCBvbGRBdHRyaWJDb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50ID0gbmV3QXR0cmliQ291bnRcblxuICB0aGlzLmdsLnVzZVByb2dyYW0odGhpcy5wcm9ncmFtKVxufVxuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gZGlzYWJsaW5nIHZlcnRleCBhdHRyaWJ1dGVzIHNvIG5ldyBzaGFkZXIgc3RhcnRzIHdpdGggemVyb1xuICAvLyBhbmQgaXQncyBhbHNvIHVzZWZ1bCBpZiBhbGwgc2hhZGVycyBhcmUgZGlzcG9zZWQgYnV0IHRoZVxuICAvLyBnbCBjb250ZXh0IGlzIHJldXNlZCBmb3Igc3Vic2VxdWVudCByZXBsb3R0aW5nXG4gIHZhciBvbGRBdHRyaWJDb3VudCA9IHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgb2xkQXR0cmliQ291bnQ7IGkrKykge1xuICAgIHRoaXMuZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gIH1cbiAgdGhpcy5nbC5sYXN0QXR0cmliQ291bnQgPSAwXG5cbiAgaWYodGhpcy5fZnJlZikge1xuICAgIHRoaXMuX2ZyZWYuZGlzcG9zZSgpXG4gIH1cbiAgaWYodGhpcy5fdnJlZikge1xuICAgIHRoaXMuX3ZyZWYuZGlzcG9zZSgpXG4gIH1cbiAgdGhpcy5hdHRyaWJ1dGVzID1cbiAgdGhpcy50eXBlcyAgICAgID1cbiAgdGhpcy52ZXJ0U2hhZGVyID1cbiAgdGhpcy5mcmFnU2hhZGVyID1cbiAgdGhpcy5wcm9ncmFtICAgID1cbiAgdGhpcy5fcmVsaW5rICAgID1cbiAgdGhpcy5fZnJlZiAgICAgID1cbiAgdGhpcy5fdnJlZiAgICAgID0gbnVsbFxufVxuXG5mdW5jdGlvbiBjb21wYXJlQXR0cmlidXRlcyhhLCBiKSB7XG4gIGlmKGEubmFtZSA8IGIubmFtZSkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIHJldHVybiAxXG59XG5cbi8vVXBkYXRlIGV4cG9ydCBob29rIGZvciBnbHNsaWZ5LWxpdmVcbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKFxuICAgIHZlcnRTb3VyY2VcbiAgLCBmcmFnU291cmNlXG4gICwgdW5pZm9ybXNcbiAgLCBhdHRyaWJ1dGVzKSB7XG5cbiAgLy9JZiBvbmx5IG9uZSBvYmplY3QgcGFzc2VkLCBhc3N1bWUgZ2xzbGlmeSBzdHlsZSBvdXRwdXRcbiAgaWYoIWZyYWdTb3VyY2UgfHwgYXJndW1lbnRzLmxlbmd0aCA9PT0gMSkge1xuICAgIHZhciBvYmogPSB2ZXJ0U291cmNlXG4gICAgdmVydFNvdXJjZSA9IG9iai52ZXJ0ZXhcbiAgICBmcmFnU291cmNlID0gb2JqLmZyYWdtZW50XG4gICAgdW5pZm9ybXMgICA9IG9iai51bmlmb3Jtc1xuICAgIGF0dHJpYnV0ZXMgPSBvYmouYXR0cmlidXRlc1xuICB9XG5cbiAgdmFyIHdyYXBwZXIgPSB0aGlzXG4gIHZhciBnbCAgICAgID0gd3JhcHBlci5nbFxuXG4gIC8vQ29tcGlsZSB2ZXJ0ZXggYW5kIGZyYWdtZW50IHNoYWRlcnNcbiAgdmFyIHB2cmVmID0gd3JhcHBlci5fdnJlZlxuICB3cmFwcGVyLl92cmVmID0gc2hhZGVyQ2FjaGUuc2hhZGVyKGdsLCBnbC5WRVJURVhfU0hBREVSLCB2ZXJ0U291cmNlKVxuICBpZihwdnJlZikge1xuICAgIHB2cmVmLmRpc3Bvc2UoKVxuICB9XG4gIHdyYXBwZXIudmVydFNoYWRlciA9IHdyYXBwZXIuX3ZyZWYuc2hhZGVyXG4gIHZhciBwZnJlZiA9IHRoaXMuX2ZyZWZcbiAgd3JhcHBlci5fZnJlZiA9IHNoYWRlckNhY2hlLnNoYWRlcihnbCwgZ2wuRlJBR01FTlRfU0hBREVSLCBmcmFnU291cmNlKVxuICBpZihwZnJlZikge1xuICAgIHBmcmVmLmRpc3Bvc2UoKVxuICB9XG4gIHdyYXBwZXIuZnJhZ1NoYWRlciA9IHdyYXBwZXIuX2ZyZWYuc2hhZGVyXG5cbiAgLy9JZiB1bmlmb3Jtcy9hdHRyaWJ1dGVzIGlzIG5vdCBzcGVjaWZpZWQsIHVzZSBSVCByZWZsZWN0aW9uXG4gIGlmKCF1bmlmb3JtcyB8fCAhYXR0cmlidXRlcykge1xuXG4gICAgLy9DcmVhdGUgaW5pdGlhbCB0ZXN0IHByb2dyYW1cbiAgICB2YXIgdGVzdFByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKClcbiAgICBnbC5hdHRhY2hTaGFkZXIodGVzdFByb2dyYW0sIHdyYXBwZXIuZnJhZ1NoYWRlcilcbiAgICBnbC5hdHRhY2hTaGFkZXIodGVzdFByb2dyYW0sIHdyYXBwZXIudmVydFNoYWRlcilcbiAgICBnbC5saW5rUHJvZ3JhbSh0ZXN0UHJvZ3JhbSlcbiAgICBpZighZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcih0ZXN0UHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgICB2YXIgZXJyTG9nID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2codGVzdFByb2dyYW0pXG4gICAgICB0aHJvdyBuZXcgR0xFcnJvcihlcnJMb2csICdFcnJvciBsaW5raW5nIHByb2dyYW06JyArIGVyckxvZylcbiAgICB9XG5cbiAgICAvL0xvYWQgZGF0YSBmcm9tIHJ1bnRpbWVcbiAgICB1bmlmb3JtcyAgID0gdW5pZm9ybXMgICB8fCBydW50aW1lLnVuaWZvcm1zKGdsLCB0ZXN0UHJvZ3JhbSlcbiAgICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcyB8fCBydW50aW1lLmF0dHJpYnV0ZXMoZ2wsIHRlc3RQcm9ncmFtKVxuXG4gICAgLy9SZWxlYXNlIHRlc3QgcHJvZ3JhbVxuICAgIGdsLmRlbGV0ZVByb2dyYW0odGVzdFByb2dyYW0pXG4gIH1cblxuICAvL1NvcnQgYXR0cmlidXRlcyBsZXhpY29ncmFwaGljYWxseVxuICAvLyBvdmVycmlkZXMgdW5kZWZpbmVkIFdlYkdMIGJlaGF2aW9yIGZvciBhdHRyaWJ1dGUgbG9jYXRpb25zXG4gIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzLnNsaWNlKClcbiAgYXR0cmlidXRlcy5zb3J0KGNvbXBhcmVBdHRyaWJ1dGVzKVxuXG4gIC8vQ29udmVydCBhdHRyaWJ1dGUgdHlwZXMsIHJlYWQgb3V0IGxvY2F0aW9uc1xuICB2YXIgYXR0cmlidXRlVW5wYWNrZWQgID0gW11cbiAgdmFyIGF0dHJpYnV0ZU5hbWVzICAgICA9IFtdXG4gIHZhciBhdHRyaWJ1dGVMb2NhdGlvbnMgPSBbXVxuICB2YXIgaVxuICBmb3IoaT0wOyBpPGF0dHJpYnV0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYXR0ciA9IGF0dHJpYnV0ZXNbaV1cbiAgICBpZihhdHRyLnR5cGUuaW5kZXhPZignbWF0JykgPj0gMCkge1xuICAgICAgdmFyIHNpemUgPSBhdHRyLnR5cGUuY2hhckF0KGF0dHIudHlwZS5sZW5ndGgtMSl8MFxuICAgICAgdmFyIGxvY1ZlY3RvciA9IG5ldyBBcnJheShzaXplKVxuICAgICAgZm9yKHZhciBqPTA7IGo8c2l6ZTsgKytqKSB7XG4gICAgICAgIGxvY1ZlY3RvcltqXSA9IGF0dHJpYnV0ZUxvY2F0aW9ucy5sZW5ndGhcbiAgICAgICAgYXR0cmlidXRlTmFtZXMucHVzaChhdHRyLm5hbWUgKyAnWycgKyBqICsgJ10nKVxuICAgICAgICBpZih0eXBlb2YgYXR0ci5sb2NhdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaChhdHRyLmxvY2F0aW9uICsgailcbiAgICAgICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoYXR0ci5sb2NhdGlvbikgJiZcbiAgICAgICAgICAgICAgICAgIGF0dHIubG9jYXRpb24ubGVuZ3RoID09PSBzaXplICYmXG4gICAgICAgICAgICAgICAgICB0eXBlb2YgYXR0ci5sb2NhdGlvbltqXSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaChhdHRyLmxvY2F0aW9uW2pdfDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goLTEpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGF0dHJpYnV0ZVVucGFja2VkLnB1c2goe1xuICAgICAgICBuYW1lOiBhdHRyLm5hbWUsXG4gICAgICAgIHR5cGU6IGF0dHIudHlwZSxcbiAgICAgICAgbG9jYXRpb25zOiBsb2NWZWN0b3JcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGF0dHJpYnV0ZVVucGFja2VkLnB1c2goe1xuICAgICAgICBuYW1lOiBhdHRyLm5hbWUsXG4gICAgICAgIHR5cGU6IGF0dHIudHlwZSxcbiAgICAgICAgbG9jYXRpb25zOiBbIGF0dHJpYnV0ZUxvY2F0aW9ucy5sZW5ndGggXVxuICAgICAgfSlcbiAgICAgIGF0dHJpYnV0ZU5hbWVzLnB1c2goYXR0ci5uYW1lKVxuICAgICAgaWYodHlwZW9mIGF0dHIubG9jYXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKGF0dHIubG9jYXRpb258MClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKC0xKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vRm9yIGFsbCB1bnNwZWNpZmllZCBhdHRyaWJ1dGVzLCBhc3NpZ24gdGhlbSBsZXhpY29ncmFwaGljYWxseSBtaW4gYXR0cmlidXRlXG4gIHZhciBjdXJMb2NhdGlvbiA9IDBcbiAgZm9yKGk9MDsgaTxhdHRyaWJ1dGVMb2NhdGlvbnMubGVuZ3RoOyArK2kpIHtcbiAgICBpZihhdHRyaWJ1dGVMb2NhdGlvbnNbaV0gPCAwKSB7XG4gICAgICB3aGlsZShhdHRyaWJ1dGVMb2NhdGlvbnMuaW5kZXhPZihjdXJMb2NhdGlvbikgPj0gMCkge1xuICAgICAgICBjdXJMb2NhdGlvbiArPSAxXG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVMb2NhdGlvbnNbaV0gPSBjdXJMb2NhdGlvblxuICAgIH1cbiAgfVxuXG4gIC8vUmVidWlsZCBwcm9ncmFtIGFuZCByZWNvbXB1dGUgYWxsIHVuaWZvcm0gbG9jYXRpb25zXG4gIHZhciB1bmlmb3JtTG9jYXRpb25zID0gbmV3IEFycmF5KHVuaWZvcm1zLmxlbmd0aClcbiAgZnVuY3Rpb24gcmVsaW5rKCkge1xuICAgIHdyYXBwZXIucHJvZ3JhbSA9IHNoYWRlckNhY2hlLnByb2dyYW0oXG4gICAgICAgIGdsXG4gICAgICAsIHdyYXBwZXIuX3ZyZWZcbiAgICAgICwgd3JhcHBlci5fZnJlZlxuICAgICAgLCBhdHRyaWJ1dGVOYW1lc1xuICAgICAgLCBhdHRyaWJ1dGVMb2NhdGlvbnMpXG5cbiAgICBmb3IodmFyIGk9MDsgaTx1bmlmb3Jtcy5sZW5ndGg7ICsraSkge1xuICAgICAgdW5pZm9ybUxvY2F0aW9uc1tpXSA9IGdsLmdldFVuaWZvcm1Mb2NhdGlvbihcbiAgICAgICAgICB3cmFwcGVyLnByb2dyYW1cbiAgICAgICAgLCB1bmlmb3Jtc1tpXS5uYW1lKVxuICAgIH1cbiAgfVxuXG4gIC8vUGVyZm9ybSBpbml0aWFsIGxpbmtpbmcsIHJldXNlIHByb2dyYW0gdXNlZCBmb3IgcmVmbGVjdGlvblxuICByZWxpbmsoKVxuXG4gIC8vU2F2ZSByZWxpbmtpbmcgcHJvY2VkdXJlLCBkZWZlciB1bnRpbCBydW50aW1lXG4gIHdyYXBwZXIuX3JlbGluayA9IHJlbGlua1xuXG4gIC8vR2VuZXJhdGUgdHlwZSBpbmZvXG4gIHdyYXBwZXIudHlwZXMgPSB7XG4gICAgdW5pZm9ybXM6ICAgbWFrZVJlZmxlY3QodW5pZm9ybXMpLFxuICAgIGF0dHJpYnV0ZXM6IG1ha2VSZWZsZWN0KGF0dHJpYnV0ZXMpXG4gIH1cblxuICAvL0dlbmVyYXRlIGF0dHJpYnV0ZSB3cmFwcGVyc1xuICB3cmFwcGVyLmF0dHJpYnV0ZXMgPSBjcmVhdGVBdHRyaWJ1dGVXcmFwcGVyKFxuICAgICAgZ2xcbiAgICAsIHdyYXBwZXJcbiAgICAsIGF0dHJpYnV0ZVVucGFja2VkXG4gICAgLCBhdHRyaWJ1dGVMb2NhdGlvbnMpXG5cbiAgLy9HZW5lcmF0ZSB1bmlmb3JtIHdyYXBwZXJzXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh3cmFwcGVyLCAndW5pZm9ybXMnLCBjcmVhdGVVbmlmb3JtV3JhcHBlcihcbiAgICAgIGdsXG4gICAgLCB3cmFwcGVyXG4gICAgLCB1bmlmb3Jtc1xuICAgICwgdW5pZm9ybUxvY2F0aW9ucykpXG59XG5cbi8vQ29tcGlsZXMgYW5kIGxpbmtzIGEgc2hhZGVyIHByb2dyYW0gd2l0aCB0aGUgZ2l2ZW4gYXR0cmlidXRlIGFuZCB2ZXJ0ZXggbGlzdFxuZnVuY3Rpb24gY3JlYXRlU2hhZGVyKFxuICAgIGdsXG4gICwgdmVydFNvdXJjZVxuICAsIGZyYWdTb3VyY2VcbiAgLCB1bmlmb3Jtc1xuICAsIGF0dHJpYnV0ZXMpIHtcblxuICB2YXIgc2hhZGVyID0gbmV3IFNoYWRlcihnbClcblxuICBzaGFkZXIudXBkYXRlKFxuICAgICAgdmVydFNvdXJjZVxuICAgICwgZnJhZ1NvdXJjZVxuICAgICwgdW5pZm9ybXNcbiAgICAsIGF0dHJpYnV0ZXMpXG5cbiAgcmV0dXJuIHNoYWRlclxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVNoYWRlclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgY29hbGxlc2NlVW5pZm9ybXMgPSByZXF1aXJlKCcuL3JlZmxlY3QnKVxudmFyIEdMRXJyb3IgPSByZXF1aXJlKFwiLi9HTEVycm9yXCIpXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVW5pZm9ybVdyYXBwZXJcblxuLy9CaW5kcyBhIGZ1bmN0aW9uIGFuZCByZXR1cm5zIGEgdmFsdWVcbmZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgdmFyIGMgPSBuZXcgRnVuY3Rpb24oJ3knLCAncmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIHl9JylcbiAgcmV0dXJuIGMoeClcbn1cblxuZnVuY3Rpb24gbWFrZVZlY3RvcihsZW5ndGgsIGZpbGwpIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShsZW5ndGgpXG4gIGZvcih2YXIgaT0wOyBpPGxlbmd0aDsgKytpKSB7XG4gICAgcmVzdWx0W2ldID0gZmlsbFxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuLy9DcmVhdGUgc2hpbXMgZm9yIHVuaWZvcm1zXG5mdW5jdGlvbiBjcmVhdGVVbmlmb3JtV3JhcHBlcihnbCwgd3JhcHBlciwgdW5pZm9ybXMsIGxvY2F0aW9ucykge1xuXG4gIGZ1bmN0aW9uIG1ha2VHZXR0ZXIoaW5kZXgpIHtcbiAgICB2YXIgcHJvYyA9IG5ldyBGdW5jdGlvbihcbiAgICAgICAgJ2dsJ1xuICAgICAgLCAnd3JhcHBlcidcbiAgICAgICwgJ2xvY2F0aW9ucydcbiAgICAgICwgJ3JldHVybiBmdW5jdGlvbigpe3JldHVybiBnbC5nZXRVbmlmb3JtKHdyYXBwZXIucHJvZ3JhbSxsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10pfScpXG4gICAgcmV0dXJuIHByb2MoZ2wsIHdyYXBwZXIsIGxvY2F0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VQcm9wU2V0dGVyKHBhdGgsIGluZGV4LCB0eXBlKSB7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgY2FzZSAnaW50JzpcbiAgICAgIGNhc2UgJ3NhbXBsZXIyRCc6XG4gICAgICBjYXNlICdzYW1wbGVyQ3ViZSc6XG4gICAgICAgIHJldHVybiAnZ2wudW5pZm9ybTFpKGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0xZihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciB2aWR4ID0gdHlwZS5pbmRleE9mKCd2ZWMnKVxuICAgICAgICBpZigwIDw9IHZpZHggJiYgdmlkeCA8PSAxICYmIHR5cGUubGVuZ3RoID09PSA0ICsgdmlkeCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIGRhdGEgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIHN3aXRjaCh0eXBlLmNoYXJBdCgwKSkge1xuICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICBjYXNlICdpJzpcbiAgICAgICAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtJyArIGQgKyAnaXYobG9jYXRpb25zWycgKyBpbmRleCArICddLG9iaicgKyBwYXRoICsgJyknXG4gICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtJyArIGQgKyAnZnYobG9jYXRpb25zWycgKyBpbmRleCArICddLG9iaicgKyBwYXRoICsgJyknXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ1VucmVjb2duaXplZCBkYXRhIHR5cGUgZm9yIHZlY3RvciAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHR5cGUuaW5kZXhPZignbWF0JykgPT09IDAgJiYgdHlwZS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCB1bmlmb3JtIGRpbWVuc2lvbiB0eXBlIGZvciBtYXRyaXggJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtTWF0cml4JyArIGQgKyAnZnYobG9jYXRpb25zWycgKyBpbmRleCArICddLGZhbHNlLG9iaicgKyBwYXRoICsgJyknXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdVbmtub3duIHVuaWZvcm0gZGF0YSB0eXBlIGZvciAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGVudW1lcmF0ZUluZGljZXMocHJlZml4LCB0eXBlKSB7XG4gICAgaWYodHlwZW9mIHR5cGUgIT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gWyBbcHJlZml4LCB0eXBlXSBdXG4gICAgfVxuICAgIHZhciBpbmRpY2VzID0gW11cbiAgICBmb3IodmFyIGlkIGluIHR5cGUpIHtcbiAgICAgIHZhciBwcm9wID0gdHlwZVtpZF1cbiAgICAgIHZhciB0cHJlZml4ID0gcHJlZml4XG4gICAgICBpZihwYXJzZUludChpZCkgKyAnJyA9PT0gaWQpIHtcbiAgICAgICAgdHByZWZpeCArPSAnWycgKyBpZCArICddJ1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHByZWZpeCArPSAnLicgKyBpZFxuICAgICAgfVxuICAgICAgaWYodHlwZW9mIHByb3AgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGluZGljZXMucHVzaC5hcHBseShpbmRpY2VzLCBlbnVtZXJhdGVJbmRpY2VzKHRwcmVmaXgsIHByb3ApKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kaWNlcy5wdXNoKFt0cHJlZml4LCBwcm9wXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGluZGljZXNcbiAgfVxuXG4gIGZ1bmN0aW9uIG1ha2VTZXR0ZXIodHlwZSkge1xuICAgIHZhciBjb2RlID0gWyAncmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVByb3BlcnR5KG9iail7JyBdXG4gICAgdmFyIGluZGljZXMgPSBlbnVtZXJhdGVJbmRpY2VzKCcnLCB0eXBlKVxuICAgIGZvcih2YXIgaT0wOyBpPGluZGljZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBpdGVtID0gaW5kaWNlc1tpXVxuICAgICAgdmFyIHBhdGggPSBpdGVtWzBdXG4gICAgICB2YXIgaWR4ICA9IGl0ZW1bMV1cbiAgICAgIGlmKGxvY2F0aW9uc1tpZHhdKSB7XG4gICAgICAgIGNvZGUucHVzaChtYWtlUHJvcFNldHRlcihwYXRoLCBpZHgsIHVuaWZvcm1zW2lkeF0udHlwZSkpXG4gICAgICB9XG4gICAgfVxuICAgIGNvZGUucHVzaCgncmV0dXJuIG9ian0nKVxuICAgIHZhciBwcm9jID0gbmV3IEZ1bmN0aW9uKCdnbCcsICdsb2NhdGlvbnMnLCBjb2RlLmpvaW4oJ1xcbicpKVxuICAgIHJldHVybiBwcm9jKGdsLCBsb2NhdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBkZWZhdWx0VmFsdWUodHlwZSkge1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdib29sJzpcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgICBjYXNlICdpbnQnOlxuICAgICAgY2FzZSAnc2FtcGxlcjJEJzpcbiAgICAgIGNhc2UgJ3NhbXBsZXJDdWJlJzpcbiAgICAgICAgcmV0dXJuIDBcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuIDAuMFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHZpZHggPSB0eXBlLmluZGV4T2YoJ3ZlYycpXG4gICAgICAgIGlmKDAgPD0gdmlkeCAmJiB2aWR4IDw9IDEgJiYgdHlwZS5sZW5ndGggPT09IDQgKyB2aWR4KSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYodHlwZS5jaGFyQXQoMCkgPT09ICdiJykge1xuICAgICAgICAgICAgcmV0dXJuIG1ha2VWZWN0b3IoZCwgZmFsc2UpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYWtlVmVjdG9yKGQsIDApXG4gICAgICAgIH0gZWxzZSBpZih0eXBlLmluZGV4T2YoJ21hdCcpID09PSAwICYmIHR5cGUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgdW5pZm9ybSBkaW1lbnNpb24gdHlwZSBmb3IgbWF0cml4ICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBtYWtlVmVjdG9yKGQqZCwgMClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ1Vua25vd24gdW5pZm9ybSBkYXRhIHR5cGUgZm9yICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcmVQcm9wZXJ0eShvYmosIHByb3AsIHR5cGUpIHtcbiAgICBpZih0eXBlb2YgdHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHZhciBjaGlsZCA9IHByb2Nlc3NPYmplY3QodHlwZSlcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHtcbiAgICAgICAgZ2V0OiBpZGVudGl0eShjaGlsZCksXG4gICAgICAgIHNldDogbWFrZVNldHRlcih0eXBlKSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgaWYobG9jYXRpb25zW3R5cGVdKSB7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHtcbiAgICAgICAgICBnZXQ6IG1ha2VHZXR0ZXIodHlwZSksXG4gICAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHR5cGUpLFxuICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb2JqW3Byb3BdID0gZGVmYXVsdFZhbHVlKHVuaWZvcm1zW3R5cGVdLnR5cGUpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcHJvY2Vzc09iamVjdChvYmopIHtcbiAgICB2YXIgcmVzdWx0XG4gICAgaWYoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgICByZXN1bHQgPSBuZXcgQXJyYXkob2JqLmxlbmd0aClcbiAgICAgIGZvcih2YXIgaT0wOyBpPG9iai5sZW5ndGg7ICsraSkge1xuICAgICAgICBzdG9yZVByb3BlcnR5KHJlc3VsdCwgaSwgb2JqW2ldKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQgPSB7fVxuICAgICAgZm9yKHZhciBpZCBpbiBvYmopIHtcbiAgICAgICAgc3RvcmVQcm9wZXJ0eShyZXN1bHQsIGlkLCBvYmpbaWRdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0XG4gIH1cblxuICAvL1JldHVybiBkYXRhXG4gIHZhciBjb2FsbGVzY2VkID0gY29hbGxlc2NlVW5pZm9ybXModW5pZm9ybXMsIHRydWUpXG4gIHJldHVybiB7XG4gICAgZ2V0OiBpZGVudGl0eShwcm9jZXNzT2JqZWN0KGNvYWxsZXNjZWQpKSxcbiAgICBzZXQ6IG1ha2VTZXR0ZXIoY29hbGxlc2NlZCksXG4gICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICBjb25maWd1cmFibGU6IHRydWVcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9jcmVhdGUtdW5pZm9ybXMuanNcbi8vIG1vZHVsZSBpZCA9IDE1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXR0cmlidXRlV3JhcHBlclxuXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcblxuZnVuY3Rpb24gU2hhZGVyQXR0cmlidXRlKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGluZGV4XG4gICwgbG9jYXRpb25zXG4gICwgZGltZW5zaW9uXG4gICwgY29uc3RGdW5jKSB7XG4gIHRoaXMuX2dsICAgICAgICA9IGdsXG4gIHRoaXMuX3dyYXBwZXIgICA9IHdyYXBwZXJcbiAgdGhpcy5faW5kZXggICAgID0gaW5kZXhcbiAgdGhpcy5fbG9jYXRpb25zID0gbG9jYXRpb25zXG4gIHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvblxuICB0aGlzLl9jb25zdEZ1bmMgPSBjb25zdEZ1bmNcbn1cblxudmFyIHByb3RvID0gU2hhZGVyQXR0cmlidXRlLnByb3RvdHlwZVxuXG5wcm90by5wb2ludGVyID0gZnVuY3Rpb24gc2V0QXR0cmliUG9pbnRlcihcbiAgICB0eXBlXG4gICwgbm9ybWFsaXplZFxuICAsIHN0cmlkZVxuICAsIG9mZnNldCkge1xuXG4gIHZhciBzZWxmICAgICAgPSB0aGlzXG4gIHZhciBnbCAgICAgICAgPSBzZWxmLl9nbFxuICB2YXIgbG9jYXRpb24gID0gc2VsZi5fbG9jYXRpb25zW3NlbGYuX2luZGV4XVxuXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICBsb2NhdGlvblxuICAgICwgc2VsZi5fZGltZW5zaW9uXG4gICAgLCB0eXBlIHx8IGdsLkZMT0FUXG4gICAgLCAhIW5vcm1hbGl6ZWRcbiAgICAsIHN0cmlkZSB8fCAwXG4gICAgLCBvZmZzZXQgfHwgMClcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pXG59XG5cbnByb3RvLnNldCA9IGZ1bmN0aW9uKHgwLCB4MSwgeDIsIHgzKSB7XG4gIHJldHVybiB0aGlzLl9jb25zdEZ1bmModGhpcy5fbG9jYXRpb25zW3RoaXMuX2luZGV4XSwgeDAsIHgxLCB4MiwgeDMpXG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xvY2F0aW9uJywge1xuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdXG4gIH1cbiAgLCBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICBpZih2ICE9PSB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdKSB7XG4gICAgICB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdID0gdnwwXG4gICAgICB0aGlzLl93cmFwcGVyLnByb2dyYW0gPSBudWxsXG4gICAgfVxuICAgIHJldHVybiB2fDBcbiAgfVxufSlcblxuLy9BZGRzIGEgdmVjdG9yIGF0dHJpYnV0ZSB0byBvYmpcbmZ1bmN0aW9uIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBpbmRleFxuICAsIGxvY2F0aW9uc1xuICAsIGRpbWVuc2lvblxuICAsIG9ialxuICAsIG5hbWUpIHtcblxuICAvL0NvbnN0cnVjdCBjb25zdGFudCBmdW5jdGlvblxuICB2YXIgY29uc3RGdW5jQXJncyA9IFsgJ2dsJywgJ3YnIF1cbiAgdmFyIHZhck5hbWVzID0gW11cbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb25zdEZ1bmNBcmdzLnB1c2goJ3gnK2kpXG4gICAgdmFyTmFtZXMucHVzaCgneCcraSlcbiAgfVxuICBjb25zdEZ1bmNBcmdzLnB1c2goXG4gICAgJ2lmKHgwLmxlbmd0aD09PXZvaWQgMCl7cmV0dXJuIGdsLnZlcnRleEF0dHJpYicgK1xuICAgIGRpbWVuc2lvbiArICdmKHYsJyArXG4gICAgdmFyTmFtZXMuam9pbigpICtcbiAgICAnKX1lbHNle3JldHVybiBnbC52ZXJ0ZXhBdHRyaWInICtcbiAgICBkaW1lbnNpb24gK1xuICAgICdmdih2LHgwKX0nKVxuICB2YXIgY29uc3RGdW5jID0gRnVuY3Rpb24uYXBwbHkobnVsbCwgY29uc3RGdW5jQXJncylcblxuICAvL0NyZWF0ZSBhdHRyaWJ1dGUgd3JhcHBlclxuICB2YXIgYXR0ciA9IG5ldyBTaGFkZXJBdHRyaWJ1dGUoXG4gICAgICBnbFxuICAgICwgd3JhcHBlclxuICAgICwgaW5kZXhcbiAgICAsIGxvY2F0aW9uc1xuICAgICwgZGltZW5zaW9uXG4gICAgLCBjb25zdEZ1bmMpXG5cbiAgLy9DcmVhdGUgYWNjZXNzb3JcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIHNldDogZnVuY3Rpb24oeCkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uc1tpbmRleF0pXG4gICAgICBjb25zdEZ1bmMoZ2wsIGxvY2F0aW9uc1tpbmRleF0sIHgpXG4gICAgICByZXR1cm4geFxuICAgIH1cbiAgICAsIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYXR0clxuICAgIH1cbiAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgfSlcbn1cblxuZnVuY3Rpb24gYWRkTWF0cml4QXR0cmlidXRlKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGluZGV4XG4gICwgbG9jYXRpb25zXG4gICwgZGltZW5zaW9uXG4gICwgb2JqXG4gICwgbmFtZSkge1xuXG4gIHZhciBwYXJ0cyA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciBhdHRycyA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgYWRkVmVjdG9yQXR0cmlidXRlKFxuICAgICAgICBnbFxuICAgICAgLCB3cmFwcGVyXG4gICAgICAsIGluZGV4W2ldXG4gICAgICAsIGxvY2F0aW9uc1xuICAgICAgLCBkaW1lbnNpb25cbiAgICAgICwgcGFydHNcbiAgICAgICwgaSlcbiAgICBhdHRyc1tpXSA9IHBhcnRzW2ldXG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFydHMsICdsb2NhdGlvbicsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgICBhdHRyc1tpXS5sb2NhdGlvbiA9IHZbaV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgICBhdHRyc1tpXS5sb2NhdGlvbiA9IHYgKyBpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2XG4gICAgfVxuICAgICwgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gbG9jYXRpb25zW2luZGV4W2ldXVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgfSlcblxuICBwYXJ0cy5wb2ludGVyID0gZnVuY3Rpb24odHlwZSwgbm9ybWFsaXplZCwgc3RyaWRlLCBvZmZzZXQpIHtcbiAgICB0eXBlICAgICAgID0gdHlwZSB8fCBnbC5GTE9BVFxuICAgIG5vcm1hbGl6ZWQgPSAhIW5vcm1hbGl6ZWRcbiAgICBzdHJpZGUgICAgID0gc3RyaWRlIHx8IChkaW1lbnNpb24gKiBkaW1lbnNpb24pXG4gICAgb2Zmc2V0ICAgICA9IG9mZnNldCB8fCAwXG4gICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGxvY2F0aW9uc1tpbmRleFtpXV1cbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgICAgICBsb2NhdGlvblxuICAgICAgICAgICwgZGltZW5zaW9uXG4gICAgICAgICAgLCB0eXBlXG4gICAgICAgICAgLCBub3JtYWxpemVkXG4gICAgICAgICAgLCBzdHJpZGVcbiAgICAgICAgICAsIG9mZnNldCArIGkgKiBkaW1lbnNpb24pXG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbilcbiAgICB9XG4gIH1cblxuICB2YXIgc2NyYXRjaCA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciB2ZXJ0ZXhBdHRyaWIgPSBnbFsndmVydGV4QXR0cmliJyArIGRpbWVuc2lvbiArICdmdiddXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIHNldDogZnVuY3Rpb24oeCkge1xuICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgdmFyIGxvYyA9IGxvY2F0aW9uc1tpbmRleFtpXV1cbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvYylcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh4WzBdKSkge1xuICAgICAgICAgIHZlcnRleEF0dHJpYi5jYWxsKGdsLCBsb2MsIHhbaV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8ZGltZW5zaW9uOyArK2opIHtcbiAgICAgICAgICAgIHNjcmF0Y2hbal0gPSB4W2RpbWVuc2lvbippICsgal1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmVydGV4QXR0cmliLmNhbGwoZ2wsIGxvYywgc2NyYXRjaClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLCBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBhcnRzXG4gICAgfVxuICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vL0NyZWF0ZSBzaGltcyBmb3IgYXR0cmlidXRlc1xuZnVuY3Rpb24gY3JlYXRlQXR0cmlidXRlV3JhcHBlcihcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBhdHRyaWJ1dGVzXG4gICwgbG9jYXRpb25zKSB7XG5cbiAgdmFyIG9iaiA9IHt9XG4gIGZvcih2YXIgaT0wLCBuPWF0dHJpYnV0ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuXG4gICAgdmFyIGEgPSBhdHRyaWJ1dGVzW2ldXG4gICAgdmFyIG5hbWUgPSBhLm5hbWVcbiAgICB2YXIgdHlwZSA9IGEudHlwZVxuICAgIHZhciBsb2NzID0gYS5sb2NhdGlvbnNcblxuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdib29sJzpcbiAgICAgIGNhc2UgJ2ludCc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICAgICAgICAgIGdsXG4gICAgICAgICAgLCB3cmFwcGVyXG4gICAgICAgICAgLCBsb2NzWzBdXG4gICAgICAgICAgLCBsb2NhdGlvbnNcbiAgICAgICAgICAsIDFcbiAgICAgICAgICAsIG9ialxuICAgICAgICAgICwgbmFtZSlcbiAgICAgIGJyZWFrXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmKHR5cGUuaW5kZXhPZigndmVjJykgPj0gMCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIGRhdGEgdHlwZSBmb3IgYXR0cmlidXRlICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgZ2xcbiAgICAgICAgICAgICwgd3JhcHBlclxuICAgICAgICAgICAgLCBsb2NzWzBdXG4gICAgICAgICAgICAsIGxvY2F0aW9uc1xuICAgICAgICAgICAgLCBkXG4gICAgICAgICAgICAsIG9ialxuICAgICAgICAgICAgLCBuYW1lKVxuICAgICAgICB9IGVsc2UgaWYodHlwZS5pbmRleE9mKCdtYXQnKSA+PSAwKSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlIGZvciBhdHRyaWJ1dGUgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkTWF0cml4QXR0cmlidXRlKFxuICAgICAgICAgICAgICBnbFxuICAgICAgICAgICAgLCB3cmFwcGVyXG4gICAgICAgICAgICAsIGxvY3NcbiAgICAgICAgICAgICwgbG9jYXRpb25zXG4gICAgICAgICAgICAsIGRcbiAgICAgICAgICAgICwgb2JqXG4gICAgICAgICAgICAsIG5hbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdVbmtub3duIGRhdGEgdHlwZSBmb3IgYXR0cmlidXRlICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiBvYmpcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvY3JlYXRlLWF0dHJpYnV0ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuc2hhZGVyICAgPSBnZXRTaGFkZXJSZWZlcmVuY2VcbmV4cG9ydHMucHJvZ3JhbSAgPSBjcmVhdGVQcm9ncmFtXG5cbnZhciBHTEVycm9yID0gcmVxdWlyZShcIi4vR0xFcnJvclwiKVxudmFyIGZvcm1hdENvbXBpbGVyRXJyb3IgPSByZXF1aXJlKCdnbC1mb3JtYXQtY29tcGlsZXItZXJyb3InKTtcblxudmFyIHdlYWtNYXAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCd3ZWFrbWFwLXNoaW0nKSA6IFdlYWtNYXBcbnZhciBDQUNIRSA9IG5ldyB3ZWFrTWFwKClcblxudmFyIFNIQURFUl9DT1VOVEVSID0gMFxuXG5mdW5jdGlvbiBTaGFkZXJSZWZlcmVuY2UoaWQsIHNyYywgdHlwZSwgc2hhZGVyLCBwcm9ncmFtcywgY291bnQsIGNhY2hlKSB7XG4gIHRoaXMuaWQgICAgICAgPSBpZFxuICB0aGlzLnNyYyAgICAgID0gc3JjXG4gIHRoaXMudHlwZSAgICAgPSB0eXBlXG4gIHRoaXMuc2hhZGVyICAgPSBzaGFkZXJcbiAgdGhpcy5jb3VudCAgICA9IGNvdW50XG4gIHRoaXMucHJvZ3JhbXMgPSBbXVxuICB0aGlzLmNhY2hlICAgID0gY2FjaGVcbn1cblxuU2hhZGVyUmVmZXJlbmNlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIGlmKC0tdGhpcy5jb3VudCA9PT0gMCkge1xuICAgIHZhciBjYWNoZSAgICA9IHRoaXMuY2FjaGVcbiAgICB2YXIgZ2wgICAgICAgPSBjYWNoZS5nbFxuXG4gICAgLy9SZW1vdmUgcHJvZ3JhbSByZWZlcmVuY2VzXG4gICAgdmFyIHByb2dyYW1zID0gdGhpcy5wcm9ncmFtc1xuICAgIGZvcih2YXIgaT0wLCBuPXByb2dyYW1zLmxlbmd0aDsgaTxuOyArK2kpIHtcbiAgICAgIHZhciBwID0gY2FjaGUucHJvZ3JhbXNbcHJvZ3JhbXNbaV1dXG4gICAgICBpZihwKSB7XG4gICAgICAgIGRlbGV0ZSBjYWNoZS5wcm9ncmFtc1tpXVxuICAgICAgICBnbC5kZWxldGVQcm9ncmFtKHApXG4gICAgICB9XG4gICAgfVxuXG4gICAgLy9SZW1vdmUgc2hhZGVyIHJlZmVyZW5jZVxuICAgIGdsLmRlbGV0ZVNoYWRlcih0aGlzLnNoYWRlcilcbiAgICBkZWxldGUgY2FjaGUuc2hhZGVyc1sodGhpcy50eXBlID09PSBnbC5GUkFHTUVOVF9TSEFERVIpfDBdW3RoaXMuc3JjXVxuICB9XG59XG5cbmZ1bmN0aW9uIENvbnRleHRDYWNoZShnbCkge1xuICB0aGlzLmdsICAgICAgID0gZ2xcbiAgdGhpcy5zaGFkZXJzICA9IFt7fSwge31dXG4gIHRoaXMucHJvZ3JhbXMgPSB7fVxufVxuXG52YXIgcHJvdG8gPSBDb250ZXh0Q2FjaGUucHJvdG90eXBlXG5cbmZ1bmN0aW9uIGNvbXBpbGVTaGFkZXIoZ2wsIHR5cGUsIHNyYykge1xuICB2YXIgc2hhZGVyID0gZ2wuY3JlYXRlU2hhZGVyKHR5cGUpXG4gIGdsLnNoYWRlclNvdXJjZShzaGFkZXIsIHNyYylcbiAgZ2wuY29tcGlsZVNoYWRlcihzaGFkZXIpXG4gIGlmKCFnbC5nZXRTaGFkZXJQYXJhbWV0ZXIoc2hhZGVyLCBnbC5DT01QSUxFX1NUQVRVUykpIHtcbiAgICB2YXIgZXJyTG9nID0gZ2wuZ2V0U2hhZGVySW5mb0xvZyhzaGFkZXIpXG4gICAgdHJ5IHtcbiAgICAgICAgdmFyIGZtdCA9IGZvcm1hdENvbXBpbGVyRXJyb3IoZXJyTG9nLCBzcmMsIHR5cGUpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICBjb25zb2xlLndhcm4oJ0ZhaWxlZCB0byBmb3JtYXQgY29tcGlsZXIgZXJyb3I6ICcgKyBlKTtcbiAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCAnRXJyb3IgY29tcGlsaW5nIHNoYWRlcjpcXG4nICsgZXJyTG9nKVxuICAgIH1cbiAgICB0aHJvdyBuZXcgR0xFcnJvcihlcnJMb2csIGZtdC5zaG9ydCwgZm10LmxvbmcpXG4gIH1cbiAgcmV0dXJuIHNoYWRlclxufVxuXG5wcm90by5nZXRTaGFkZXJSZWZlcmVuY2UgPSBmdW5jdGlvbih0eXBlLCBzcmMpIHtcbiAgdmFyIGdsICAgICAgPSB0aGlzLmdsXG4gIHZhciBzaGFkZXJzID0gdGhpcy5zaGFkZXJzWyh0eXBlID09PSBnbC5GUkFHTUVOVF9TSEFERVIpfDBdXG4gIHZhciBzaGFkZXIgID0gc2hhZGVyc1tzcmNdXG4gIGlmKCFzaGFkZXIgfHwgIWdsLmlzU2hhZGVyKHNoYWRlci5zaGFkZXIpKSB7XG4gICAgdmFyIHNoYWRlck9iaiA9IGNvbXBpbGVTaGFkZXIoZ2wsIHR5cGUsIHNyYylcbiAgICBzaGFkZXIgPSBzaGFkZXJzW3NyY10gPSBuZXcgU2hhZGVyUmVmZXJlbmNlKFxuICAgICAgU0hBREVSX0NPVU5URVIrKyxcbiAgICAgIHNyYyxcbiAgICAgIHR5cGUsXG4gICAgICBzaGFkZXJPYmosXG4gICAgICBbXSxcbiAgICAgIDEsXG4gICAgICB0aGlzKVxuICB9IGVsc2Uge1xuICAgIHNoYWRlci5jb3VudCArPSAxXG4gIH1cbiAgcmV0dXJuIHNoYWRlclxufVxuXG5mdW5jdGlvbiBsaW5rUHJvZ3JhbShnbCwgdnNoYWRlciwgZnNoYWRlciwgYXR0cmlicywgbG9jYXRpb25zKSB7XG4gIHZhciBwcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCB2c2hhZGVyKVxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgZnNoYWRlcilcbiAgZm9yKHZhciBpPTA7IGk8YXR0cmlicy5sZW5ndGg7ICsraSkge1xuICAgIGdsLmJpbmRBdHRyaWJMb2NhdGlvbihwcm9ncmFtLCBsb2NhdGlvbnNbaV0sIGF0dHJpYnNbaV0pXG4gIH1cbiAgZ2wubGlua1Byb2dyYW0ocHJvZ3JhbSlcbiAgaWYoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuTElOS19TVEFUVVMpKSB7XG4gICAgdmFyIGVyckxvZyA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHByb2dyYW0pXG4gICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCAnRXJyb3IgbGlua2luZyBwcm9ncmFtOiAnICsgZXJyTG9nKVxuICB9XG4gIHJldHVybiBwcm9ncmFtXG59XG5cbnByb3RvLmdldFByb2dyYW0gPSBmdW5jdGlvbih2cmVmLCBmcmVmLCBhdHRyaWJzLCBsb2NhdGlvbnMpIHtcbiAgdmFyIHRva2VuID0gW3ZyZWYuaWQsIGZyZWYuaWQsIGF0dHJpYnMuam9pbignOicpLCBsb2NhdGlvbnMuam9pbignOicpXS5qb2luKCdAJylcbiAgdmFyIHByb2cgID0gdGhpcy5wcm9ncmFtc1t0b2tlbl1cbiAgaWYoIXByb2cgfHwgIXRoaXMuZ2wuaXNQcm9ncmFtKHByb2cpKSB7XG4gICAgdGhpcy5wcm9ncmFtc1t0b2tlbl0gPSBwcm9nID0gbGlua1Byb2dyYW0oXG4gICAgICB0aGlzLmdsLFxuICAgICAgdnJlZi5zaGFkZXIsXG4gICAgICBmcmVmLnNoYWRlcixcbiAgICAgIGF0dHJpYnMsXG4gICAgICBsb2NhdGlvbnMpXG4gICAgdnJlZi5wcm9ncmFtcy5wdXNoKHRva2VuKVxuICAgIGZyZWYucHJvZ3JhbXMucHVzaCh0b2tlbilcbiAgfVxuICByZXR1cm4gcHJvZ1xufVxuXG5mdW5jdGlvbiBnZXRDYWNoZShnbCkge1xuICB2YXIgY3R4Q2FjaGUgPSBDQUNIRS5nZXQoZ2wpXG4gIGlmKCFjdHhDYWNoZSkge1xuICAgIGN0eENhY2hlID0gbmV3IENvbnRleHRDYWNoZShnbClcbiAgICBDQUNIRS5zZXQoZ2wsIGN0eENhY2hlKVxuICB9XG4gIHJldHVybiBjdHhDYWNoZVxufVxuXG5mdW5jdGlvbiBnZXRTaGFkZXJSZWZlcmVuY2UoZ2wsIHR5cGUsIHNyYykge1xuICByZXR1cm4gZ2V0Q2FjaGUoZ2wpLmdldFNoYWRlclJlZmVyZW5jZSh0eXBlLCBzcmMpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVByb2dyYW0oZ2wsIHZyZWYsIGZyZWYsIGF0dHJpYnMsIGxvY2F0aW9ucykge1xuICByZXR1cm4gZ2V0Q2FjaGUoZ2wpLmdldFByb2dyYW0odnJlZiwgZnJlZiwgYXR0cmlicywgbG9jYXRpb25zKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9zaGFkZXItY2FjaGUuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXG52YXIgc3ByaW50ZiA9IHJlcXVpcmUoJ3NwcmludGYtanMnKS5zcHJpbnRmO1xudmFyIGdsQ29uc3RhbnRzID0gcmVxdWlyZSgnZ2wtY29uc3RhbnRzL2xvb2t1cCcpO1xudmFyIHNoYWRlck5hbWUgPSByZXF1aXJlKCdnbHNsLXNoYWRlci1uYW1lJyk7XG52YXIgYWRkTGluZU51bWJlcnMgPSByZXF1aXJlKCdhZGQtbGluZS1udW1iZXJzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZm9ybWF0Q29tcGlsZXJFcnJvcjtcblxuZnVuY3Rpb24gZm9ybWF0Q29tcGlsZXJFcnJvcihlcnJMb2csIHNyYywgdHlwZSkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIG5hbWUgPSBzaGFkZXJOYW1lKHNyYykgfHwgJ29mIHVua25vd24gbmFtZSAoc2VlIG5wbSBnbHNsLXNoYWRlci1uYW1lKSc7XG5cbiAgICB2YXIgdHlwZU5hbWUgPSAndW5rbm93biB0eXBlJztcbiAgICBpZiAodHlwZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHR5cGVOYW1lID0gdHlwZSA9PT0gZ2xDb25zdGFudHMuRlJBR01FTlRfU0hBREVSID8gJ2ZyYWdtZW50JyA6ICd2ZXJ0ZXgnXG4gICAgfVxuXG4gICAgdmFyIGxvbmdGb3JtID0gc3ByaW50ZignRXJyb3IgY29tcGlsaW5nICVzIHNoYWRlciAlczpcXG4nLCB0eXBlTmFtZSwgbmFtZSk7XG4gICAgdmFyIHNob3J0Rm9ybSA9IHNwcmludGYoXCIlcyVzXCIsIGxvbmdGb3JtLCBlcnJMb2cpO1xuXG4gICAgdmFyIGVycm9yU3RyaW5ncyA9IGVyckxvZy5zcGxpdCgnXFxuJyk7XG4gICAgdmFyIGVycm9ycyA9IHt9O1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlcnJvclN0cmluZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGVycm9yU3RyaW5nID0gZXJyb3JTdHJpbmdzW2ldO1xuICAgICAgICBpZiAoZXJyb3JTdHJpbmcgPT09ICcnIHx8IGVycm9yU3RyaW5nID09PSBcIlxcMFwiKSBjb250aW51ZTtcbiAgICAgICAgdmFyIGxpbmVObyA9IHBhcnNlSW50KGVycm9yU3RyaW5nLnNwbGl0KCc6JylbMl0pO1xuICAgICAgICBpZiAoaXNOYU4obGluZU5vKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNwcmludGYoJ0NvdWxkIG5vdCBwYXJzZSBlcnJvcjogJXMnLCBlcnJvclN0cmluZykpO1xuICAgICAgICB9XG4gICAgICAgIGVycm9yc1tsaW5lTm9dID0gZXJyb3JTdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIGxpbmVzID0gYWRkTGluZU51bWJlcnMoc3JjKS5zcGxpdCgnXFxuJyk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmICghZXJyb3JzW2krM10gJiYgIWVycm9yc1tpKzJdICYmICFlcnJvcnNbaSsxXSkgY29udGludWU7XG4gICAgICAgIHZhciBsaW5lID0gbGluZXNbaV07XG4gICAgICAgIGxvbmdGb3JtICs9IGxpbmUgKyAnXFxuJztcbiAgICAgICAgaWYgKGVycm9yc1tpKzFdKSB7XG4gICAgICAgICAgICB2YXIgZSA9IGVycm9yc1tpKzFdO1xuICAgICAgICAgICAgZSA9IGUuc3Vic3RyKGUuc3BsaXQoJzonLCAzKS5qb2luKCc6JykubGVuZ3RoICsgMSkudHJpbSgpO1xuICAgICAgICAgICAgbG9uZ0Zvcm0gKz0gc3ByaW50ZignXl5eICVzXFxuXFxuJywgZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBsb25nOiBsb25nRm9ybS50cmltKCksXG4gICAgICAgIHNob3J0OiBzaG9ydEZvcm0udHJpbSgpXG4gICAgfTtcbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtZm9ybWF0LWNvbXBpbGVyLWVycm9yL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIGdsb2JhbCB3aW5kb3csIGV4cG9ydHMsIGRlZmluZSAqL1xuXG4hZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgcmUgPSB7XG4gICAgICAgIG5vdF9zdHJpbmc6IC9bXnNdLyxcbiAgICAgICAgbm90X2Jvb2w6IC9bXnRdLyxcbiAgICAgICAgbm90X3R5cGU6IC9bXlRdLyxcbiAgICAgICAgbm90X3ByaW1pdGl2ZTogL1tedl0vLFxuICAgICAgICBudW1iZXI6IC9bZGllZmddLyxcbiAgICAgICAgbnVtZXJpY19hcmc6IC9bYmNkaWVmZ3V4WF0vLFxuICAgICAgICBqc29uOiAvW2pdLyxcbiAgICAgICAgbm90X2pzb246IC9bXmpdLyxcbiAgICAgICAgdGV4dDogL15bXlxceDI1XSsvLFxuICAgICAgICBtb2R1bG86IC9eXFx4MjV7Mn0vLFxuICAgICAgICBwbGFjZWhvbGRlcjogL15cXHgyNSg/OihbMS05XVxcZCopXFwkfFxcKChbXlxcKV0rKVxcKSk/KFxcKyk/KDB8J1teJF0pPygtKT8oXFxkKyk/KD86XFwuKFxcZCspKT8oW2ItZ2lqb3N0VHV2eFhdKS8sXG4gICAgICAgIGtleTogL14oW2Etel9dW2Etel9cXGRdKikvaSxcbiAgICAgICAga2V5X2FjY2VzczogL15cXC4oW2Etel9dW2Etel9cXGRdKikvaSxcbiAgICAgICAgaW5kZXhfYWNjZXNzOiAvXlxcWyhcXGQrKVxcXS8sXG4gICAgICAgIHNpZ246IC9eW1xcK1xcLV0vXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3ByaW50ZihrZXkpIHtcbiAgICAgICAgLy8gYGFyZ3VtZW50c2AgaXMgbm90IGFuIGFycmF5LCBidXQgc2hvdWxkIGJlIGZpbmUgZm9yIHRoaXMgY2FsbFxuICAgICAgICByZXR1cm4gc3ByaW50Zl9mb3JtYXQoc3ByaW50Zl9wYXJzZShrZXkpLCBhcmd1bWVudHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdnNwcmludGYoZm10LCBhcmd2KSB7XG4gICAgICAgIHJldHVybiBzcHJpbnRmLmFwcGx5KG51bGwsIFtmbXRdLmNvbmNhdChhcmd2IHx8IFtdKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmX2Zvcm1hdChwYXJzZV90cmVlLCBhcmd2KSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSAxLCB0cmVlX2xlbmd0aCA9IHBhcnNlX3RyZWUubGVuZ3RoLCBhcmcsIG91dHB1dCA9ICcnLCBpLCBrLCBtYXRjaCwgcGFkLCBwYWRfY2hhcmFjdGVyLCBwYWRfbGVuZ3RoLCBpc19wb3NpdGl2ZSwgc2lnblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHJlZV9sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZV90cmVlW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBwYXJzZV90cmVlW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhcnNlX3RyZWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBwYXJzZV90cmVlW2ldIC8vIGNvbnZlbmllbmNlIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHsgLy8ga2V5d29yZCBhcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd2W2N1cnNvcl1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IG1hdGNoWzJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShtYXRjaFsyXVtrXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignW3NwcmludGZdIHByb3BlcnR5IFwiJXNcIiBkb2VzIG5vdCBleGlzdCcsIG1hdGNoWzJdW2tdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ1ttYXRjaFsyXVtrXV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRjaFsxXSkgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChleHBsaWNpdClcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndlttYXRjaFsxXV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IC8vIHBvc2l0aW9uYWwgYXJndW1lbnQgKGltcGxpY2l0KVxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd2W2N1cnNvcisrXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5ub3RfdHlwZS50ZXN0KG1hdGNoWzhdKSAmJiByZS5ub3RfcHJpbWl0aXZlLnRlc3QobWF0Y2hbOF0pICYmIGFyZyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlLm51bWVyaWNfYXJnLnRlc3QobWF0Y2hbOF0pICYmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyAmJiBpc05hTihhcmcpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHNwcmludGYoJ1tzcHJpbnRmXSBleHBlY3RpbmcgbnVtYmVyIGJ1dCBmb3VuZCAlVCcsIGFyZykpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlLm51bWJlci50ZXN0KG1hdGNoWzhdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc19wb3NpdGl2ZSA9IGFyZyA+PSAwXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtYXRjaFs4XSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApLnRvU3RyaW5nKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoYXJnLCAxMCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBKU09OLnN0cmluZ2lmeShhcmcsIG51bGwsIG1hdGNoWzZdID8gcGFyc2VJbnQobWF0Y2hbNl0pIDogMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gbWF0Y2hbN10gPyBwYXJzZUZsb2F0KGFyZykudG9FeHBvbmVudGlhbChtYXRjaFs3XSkgOiBwYXJzZUZsb2F0KGFyZykudG9FeHBvbmVudGlhbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gcGFyc2VGbG9hdChhcmcpLnRvRml4ZWQobWF0Y2hbN10pIDogcGFyc2VGbG9hdChhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gU3RyaW5nKE51bWJlcihhcmcudG9QcmVjaXNpb24obWF0Y2hbN10pKSkgOiBwYXJzZUZsb2F0KGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZyg4KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZyghIWFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd1JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApID4+PiAwXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy52YWx1ZU9mKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmUuanNvbi50ZXN0KG1hdGNoWzhdKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYXJnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmUubnVtYmVyLnRlc3QobWF0Y2hbOF0pICYmICghaXNfcG9zaXRpdmUgfHwgbWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gaXNfcG9zaXRpdmUgPyAnKycgOiAnLSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy50b1N0cmluZygpLnJlcGxhY2UocmUuc2lnbiwgJycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYWRfY2hhcmFjdGVyID0gbWF0Y2hbNF0gPyBtYXRjaFs0XSA9PT0gJzAnID8gJzAnIDogbWF0Y2hbNF0uY2hhckF0KDEpIDogJyAnXG4gICAgICAgICAgICAgICAgICAgIHBhZF9sZW5ndGggPSBtYXRjaFs2XSAtIChzaWduICsgYXJnKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgcGFkID0gbWF0Y2hbNl0gPyAocGFkX2xlbmd0aCA+IDAgPyBwYWRfY2hhcmFjdGVyLnJlcGVhdChwYWRfbGVuZ3RoKSA6ICcnKSA6ICcnXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBtYXRjaFs1XSA/IHNpZ24gKyBhcmcgKyBwYWQgOiAocGFkX2NoYXJhY3RlciA9PT0gJzAnID8gc2lnbiArIHBhZCArIGFyZyA6IHBhZCArIHNpZ24gKyBhcmcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICB9XG5cbiAgICB2YXIgc3ByaW50Zl9jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAgIGZ1bmN0aW9uIHNwcmludGZfcGFyc2UoZm10KSB7XG4gICAgICAgIGlmIChzcHJpbnRmX2NhY2hlW2ZtdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBzcHJpbnRmX2NhY2hlW2ZtdF1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfZm10ID0gZm10LCBtYXRjaCwgcGFyc2VfdHJlZSA9IFtdLCBhcmdfbmFtZXMgPSAwXG4gICAgICAgIHdoaWxlIChfZm10KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoID0gcmUudGV4dC5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChtYXRjaFswXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChtYXRjaCA9IHJlLm1vZHVsby5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaCgnJScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobWF0Y2ggPSByZS5wbGFjZWhvbGRlci5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdfbmFtZXMgfD0gMVxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRfbGlzdCA9IFtdLCByZXBsYWNlbWVudF9maWVsZCA9IG1hdGNoWzJdLCBmaWVsZF9tYXRjaCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRfbWF0Y2ggPSByZS5rZXkuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9saXN0LnB1c2goZmllbGRfbWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHJlcGxhY2VtZW50X2ZpZWxkID0gcmVwbGFjZW1lbnRfZmllbGQuc3Vic3RyaW5nKGZpZWxkX21hdGNoWzBdLmxlbmd0aCkpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRfbWF0Y2ggPSByZS5rZXlfYWNjZXNzLmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9saXN0LnB1c2goZmllbGRfbWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChmaWVsZF9tYXRjaCA9IHJlLmluZGV4X2FjY2Vzcy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdbc3ByaW50Zl0gZmFpbGVkIHRvIHBhcnNlIG5hbWVkIGFyZ3VtZW50IGtleScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdbc3ByaW50Zl0gZmFpbGVkIHRvIHBhcnNlIG5hbWVkIGFyZ3VtZW50IGtleScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMl0gPSBmaWVsZF9saXN0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmdfbmFtZXMgfD0gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJnX25hbWVzID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW3NwcmludGZdIG1peGluZyBwb3NpdGlvbmFsIGFuZCBuYW1lZCBwbGFjZWhvbGRlcnMgaXMgbm90ICh5ZXQpIHN1cHBvcnRlZCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChtYXRjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIHVuZXhwZWN0ZWQgcGxhY2Vob2xkZXInKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZtdCA9IF9mbXQuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ByaW50Zl9jYWNoZVtmbXRdID0gcGFyc2VfdHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4cG9ydCB0byBlaXRoZXIgYnJvd3NlciBvciBub2RlLmpzXG4gICAgICovXG4gICAgLyogZXNsaW50LWRpc2FibGUgcXVvdGUtcHJvcHMgKi9cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGV4cG9ydHNbJ3NwcmludGYnXSA9IHNwcmludGZcbiAgICAgICAgZXhwb3J0c1sndnNwcmludGYnXSA9IHZzcHJpbnRmXG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3dbJ3NwcmludGYnXSA9IHNwcmludGZcbiAgICAgICAgd2luZG93Wyd2c3ByaW50ZiddID0gdnNwcmludGZcblxuICAgICAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgJ3NwcmludGYnOiBzcHJpbnRmLFxuICAgICAgICAgICAgICAgICAgICAndnNwcmludGYnOiB2c3ByaW50ZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBxdW90ZS1wcm9wcyAqL1xufSgpXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zcHJpbnRmLWpzL3NyYy9zcHJpbnRmLmpzXG4vLyBtb2R1bGUgaWQgPSAxOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBnbDEwID0gcmVxdWlyZSgnLi8xLjAvbnVtYmVycycpXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbG9va3VwQ29uc3RhbnQgKG51bWJlcikge1xuICByZXR1cm4gZ2wxMFtudW1iZXJdXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jb25zdGFudHMvbG9va3VwLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAwOiAnTk9ORScsXG4gIDE6ICdPTkUnLFxuICAyOiAnTElORV9MT09QJyxcbiAgMzogJ0xJTkVfU1RSSVAnLFxuICA0OiAnVFJJQU5HTEVTJyxcbiAgNTogJ1RSSUFOR0xFX1NUUklQJyxcbiAgNjogJ1RSSUFOR0xFX0ZBTicsXG4gIDI1NjogJ0RFUFRIX0JVRkZFUl9CSVQnLFxuICA1MTI6ICdORVZFUicsXG4gIDUxMzogJ0xFU1MnLFxuICA1MTQ6ICdFUVVBTCcsXG4gIDUxNTogJ0xFUVVBTCcsXG4gIDUxNjogJ0dSRUFURVInLFxuICA1MTc6ICdOT1RFUVVBTCcsXG4gIDUxODogJ0dFUVVBTCcsXG4gIDUxOTogJ0FMV0FZUycsXG4gIDc2ODogJ1NSQ19DT0xPUicsXG4gIDc2OTogJ09ORV9NSU5VU19TUkNfQ09MT1InLFxuICA3NzA6ICdTUkNfQUxQSEEnLFxuICA3NzE6ICdPTkVfTUlOVVNfU1JDX0FMUEhBJyxcbiAgNzcyOiAnRFNUX0FMUEhBJyxcbiAgNzczOiAnT05FX01JTlVTX0RTVF9BTFBIQScsXG4gIDc3NDogJ0RTVF9DT0xPUicsXG4gIDc3NTogJ09ORV9NSU5VU19EU1RfQ09MT1InLFxuICA3NzY6ICdTUkNfQUxQSEFfU0FUVVJBVEUnLFxuICAxMDI0OiAnU1RFTkNJTF9CVUZGRVJfQklUJyxcbiAgMTAyODogJ0ZST05UJyxcbiAgMTAyOTogJ0JBQ0snLFxuICAxMDMyOiAnRlJPTlRfQU5EX0JBQ0snLFxuICAxMjgwOiAnSU5WQUxJRF9FTlVNJyxcbiAgMTI4MTogJ0lOVkFMSURfVkFMVUUnLFxuICAxMjgyOiAnSU5WQUxJRF9PUEVSQVRJT04nLFxuICAxMjg1OiAnT1VUX09GX01FTU9SWScsXG4gIDEyODY6ICdJTlZBTElEX0ZSQU1FQlVGRkVSX09QRVJBVElPTicsXG4gIDIzMDQ6ICdDVycsXG4gIDIzMDU6ICdDQ1cnLFxuICAyODQ5OiAnTElORV9XSURUSCcsXG4gIDI4ODQ6ICdDVUxMX0ZBQ0UnLFxuICAyODg1OiAnQ1VMTF9GQUNFX01PREUnLFxuICAyODg2OiAnRlJPTlRfRkFDRScsXG4gIDI5Mjg6ICdERVBUSF9SQU5HRScsXG4gIDI5Mjk6ICdERVBUSF9URVNUJyxcbiAgMjkzMDogJ0RFUFRIX1dSSVRFTUFTSycsXG4gIDI5MzE6ICdERVBUSF9DTEVBUl9WQUxVRScsXG4gIDI5MzI6ICdERVBUSF9GVU5DJyxcbiAgMjk2MDogJ1NURU5DSUxfVEVTVCcsXG4gIDI5NjE6ICdTVEVOQ0lMX0NMRUFSX1ZBTFVFJyxcbiAgMjk2MjogJ1NURU5DSUxfRlVOQycsXG4gIDI5NjM6ICdTVEVOQ0lMX1ZBTFVFX01BU0snLFxuICAyOTY0OiAnU1RFTkNJTF9GQUlMJyxcbiAgMjk2NTogJ1NURU5DSUxfUEFTU19ERVBUSF9GQUlMJyxcbiAgMjk2NjogJ1NURU5DSUxfUEFTU19ERVBUSF9QQVNTJyxcbiAgMjk2NzogJ1NURU5DSUxfUkVGJyxcbiAgMjk2ODogJ1NURU5DSUxfV1JJVEVNQVNLJyxcbiAgMjk3ODogJ1ZJRVdQT1JUJyxcbiAgMzAyNDogJ0RJVEhFUicsXG4gIDMwNDI6ICdCTEVORCcsXG4gIDMwODg6ICdTQ0lTU09SX0JPWCcsXG4gIDMwODk6ICdTQ0lTU09SX1RFU1QnLFxuICAzMTA2OiAnQ09MT1JfQ0xFQVJfVkFMVUUnLFxuICAzMTA3OiAnQ09MT1JfV1JJVEVNQVNLJyxcbiAgMzMxNzogJ1VOUEFDS19BTElHTk1FTlQnLFxuICAzMzMzOiAnUEFDS19BTElHTk1FTlQnLFxuICAzMzc5OiAnTUFYX1RFWFRVUkVfU0laRScsXG4gIDMzODY6ICdNQVhfVklFV1BPUlRfRElNUycsXG4gIDM0MDg6ICdTVUJQSVhFTF9CSVRTJyxcbiAgMzQxMDogJ1JFRF9CSVRTJyxcbiAgMzQxMTogJ0dSRUVOX0JJVFMnLFxuICAzNDEyOiAnQkxVRV9CSVRTJyxcbiAgMzQxMzogJ0FMUEhBX0JJVFMnLFxuICAzNDE0OiAnREVQVEhfQklUUycsXG4gIDM0MTU6ICdTVEVOQ0lMX0JJVFMnLFxuICAzNTUzOiAnVEVYVFVSRV8yRCcsXG4gIDQzNTI6ICdET05UX0NBUkUnLFxuICA0MzUzOiAnRkFTVEVTVCcsXG4gIDQzNTQ6ICdOSUNFU1QnLFxuICA1MTIwOiAnQllURScsXG4gIDUxMjE6ICdVTlNJR05FRF9CWVRFJyxcbiAgNTEyMjogJ1NIT1JUJyxcbiAgNTEyMzogJ1VOU0lHTkVEX1NIT1JUJyxcbiAgNTEyNDogJ0lOVCcsXG4gIDUxMjU6ICdVTlNJR05FRF9JTlQnLFxuICA1MTI2OiAnRkxPQVQnLFxuICA1Mzg2OiAnSU5WRVJUJyxcbiAgNTg5MDogJ1RFWFRVUkUnLFxuICA2NDAxOiAnU1RFTkNJTF9JTkRFWCcsXG4gIDY0MDI6ICdERVBUSF9DT01QT05FTlQnLFxuICA2NDA2OiAnQUxQSEEnLFxuICA2NDA3OiAnUkdCJyxcbiAgNjQwODogJ1JHQkEnLFxuICA2NDA5OiAnTFVNSU5BTkNFJyxcbiAgNjQxMDogJ0xVTUlOQU5DRV9BTFBIQScsXG4gIDc2ODA6ICdLRUVQJyxcbiAgNzY4MTogJ1JFUExBQ0UnLFxuICA3NjgyOiAnSU5DUicsXG4gIDc2ODM6ICdERUNSJyxcbiAgNzkzNjogJ1ZFTkRPUicsXG4gIDc5Mzc6ICdSRU5ERVJFUicsXG4gIDc5Mzg6ICdWRVJTSU9OJyxcbiAgOTcyODogJ05FQVJFU1QnLFxuICA5NzI5OiAnTElORUFSJyxcbiAgOTk4NDogJ05FQVJFU1RfTUlQTUFQX05FQVJFU1QnLFxuICA5OTg1OiAnTElORUFSX01JUE1BUF9ORUFSRVNUJyxcbiAgOTk4NjogJ05FQVJFU1RfTUlQTUFQX0xJTkVBUicsXG4gIDk5ODc6ICdMSU5FQVJfTUlQTUFQX0xJTkVBUicsXG4gIDEwMjQwOiAnVEVYVFVSRV9NQUdfRklMVEVSJyxcbiAgMTAyNDE6ICdURVhUVVJFX01JTl9GSUxURVInLFxuICAxMDI0MjogJ1RFWFRVUkVfV1JBUF9TJyxcbiAgMTAyNDM6ICdURVhUVVJFX1dSQVBfVCcsXG4gIDEwNDk3OiAnUkVQRUFUJyxcbiAgMTA3NTI6ICdQT0xZR09OX09GRlNFVF9VTklUUycsXG4gIDE2Mzg0OiAnQ09MT1JfQlVGRkVSX0JJVCcsXG4gIDMyNzY5OiAnQ09OU1RBTlRfQ09MT1InLFxuICAzMjc3MDogJ09ORV9NSU5VU19DT05TVEFOVF9DT0xPUicsXG4gIDMyNzcxOiAnQ09OU1RBTlRfQUxQSEEnLFxuICAzMjc3MjogJ09ORV9NSU5VU19DT05TVEFOVF9BTFBIQScsXG4gIDMyNzczOiAnQkxFTkRfQ09MT1InLFxuICAzMjc3NDogJ0ZVTkNfQUREJyxcbiAgMzI3Nzc6ICdCTEVORF9FUVVBVElPTl9SR0InLFxuICAzMjc3ODogJ0ZVTkNfU1VCVFJBQ1QnLFxuICAzMjc3OTogJ0ZVTkNfUkVWRVJTRV9TVUJUUkFDVCcsXG4gIDMyODE5OiAnVU5TSUdORURfU0hPUlRfNF80XzRfNCcsXG4gIDMyODIwOiAnVU5TSUdORURfU0hPUlRfNV81XzVfMScsXG4gIDMyODIzOiAnUE9MWUdPTl9PRkZTRVRfRklMTCcsXG4gIDMyODI0OiAnUE9MWUdPTl9PRkZTRVRfRkFDVE9SJyxcbiAgMzI4NTQ6ICdSR0JBNCcsXG4gIDMyODU1OiAnUkdCNV9BMScsXG4gIDMyODczOiAnVEVYVFVSRV9CSU5ESU5HXzJEJyxcbiAgMzI5MjY6ICdTQU1QTEVfQUxQSEFfVE9fQ09WRVJBR0UnLFxuICAzMjkyODogJ1NBTVBMRV9DT1ZFUkFHRScsXG4gIDMyOTM2OiAnU0FNUExFX0JVRkZFUlMnLFxuICAzMjkzNzogJ1NBTVBMRVMnLFxuICAzMjkzODogJ1NBTVBMRV9DT1ZFUkFHRV9WQUxVRScsXG4gIDMyOTM5OiAnU0FNUExFX0NPVkVSQUdFX0lOVkVSVCcsXG4gIDMyOTY4OiAnQkxFTkRfRFNUX1JHQicsXG4gIDMyOTY5OiAnQkxFTkRfU1JDX1JHQicsXG4gIDMyOTcwOiAnQkxFTkRfRFNUX0FMUEhBJyxcbiAgMzI5NzE6ICdCTEVORF9TUkNfQUxQSEEnLFxuICAzMzA3MTogJ0NMQU1QX1RPX0VER0UnLFxuICAzMzE3MDogJ0dFTkVSQVRFX01JUE1BUF9ISU5UJyxcbiAgMzMxODk6ICdERVBUSF9DT01QT05FTlQxNicsXG4gIDMzMzA2OiAnREVQVEhfU1RFTkNJTF9BVFRBQ0hNRU5UJyxcbiAgMzM2MzU6ICdVTlNJR05FRF9TSE9SVF81XzZfNScsXG4gIDMzNjQ4OiAnTUlSUk9SRURfUkVQRUFUJyxcbiAgMzM5MDE6ICdBTElBU0VEX1BPSU5UX1NJWkVfUkFOR0UnLFxuICAzMzkwMjogJ0FMSUFTRURfTElORV9XSURUSF9SQU5HRScsXG4gIDMzOTg0OiAnVEVYVFVSRTAnLFxuICAzMzk4NTogJ1RFWFRVUkUxJyxcbiAgMzM5ODY6ICdURVhUVVJFMicsXG4gIDMzOTg3OiAnVEVYVFVSRTMnLFxuICAzMzk4ODogJ1RFWFRVUkU0JyxcbiAgMzM5ODk6ICdURVhUVVJFNScsXG4gIDMzOTkwOiAnVEVYVFVSRTYnLFxuICAzMzk5MTogJ1RFWFRVUkU3JyxcbiAgMzM5OTI6ICdURVhUVVJFOCcsXG4gIDMzOTkzOiAnVEVYVFVSRTknLFxuICAzMzk5NDogJ1RFWFRVUkUxMCcsXG4gIDMzOTk1OiAnVEVYVFVSRTExJyxcbiAgMzM5OTY6ICdURVhUVVJFMTInLFxuICAzMzk5NzogJ1RFWFRVUkUxMycsXG4gIDMzOTk4OiAnVEVYVFVSRTE0JyxcbiAgMzM5OTk6ICdURVhUVVJFMTUnLFxuICAzNDAwMDogJ1RFWFRVUkUxNicsXG4gIDM0MDAxOiAnVEVYVFVSRTE3JyxcbiAgMzQwMDI6ICdURVhUVVJFMTgnLFxuICAzNDAwMzogJ1RFWFRVUkUxOScsXG4gIDM0MDA0OiAnVEVYVFVSRTIwJyxcbiAgMzQwMDU6ICdURVhUVVJFMjEnLFxuICAzNDAwNjogJ1RFWFRVUkUyMicsXG4gIDM0MDA3OiAnVEVYVFVSRTIzJyxcbiAgMzQwMDg6ICdURVhUVVJFMjQnLFxuICAzNDAwOTogJ1RFWFRVUkUyNScsXG4gIDM0MDEwOiAnVEVYVFVSRTI2JyxcbiAgMzQwMTE6ICdURVhUVVJFMjcnLFxuICAzNDAxMjogJ1RFWFRVUkUyOCcsXG4gIDM0MDEzOiAnVEVYVFVSRTI5JyxcbiAgMzQwMTQ6ICdURVhUVVJFMzAnLFxuICAzNDAxNTogJ1RFWFRVUkUzMScsXG4gIDM0MDE2OiAnQUNUSVZFX1RFWFRVUkUnLFxuICAzNDAyNDogJ01BWF9SRU5ERVJCVUZGRVJfU0laRScsXG4gIDM0MDQxOiAnREVQVEhfU1RFTkNJTCcsXG4gIDM0MDU1OiAnSU5DUl9XUkFQJyxcbiAgMzQwNTY6ICdERUNSX1dSQVAnLFxuICAzNDA2NzogJ1RFWFRVUkVfQ1VCRV9NQVAnLFxuICAzNDA2ODogJ1RFWFRVUkVfQklORElOR19DVUJFX01BUCcsXG4gIDM0MDY5OiAnVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9YJyxcbiAgMzQwNzA6ICdURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1gnLFxuICAzNDA3MTogJ1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWScsXG4gIDM0MDcyOiAnVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9ZJyxcbiAgMzQwNzM6ICdURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1onLFxuICAzNDA3NDogJ1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWicsXG4gIDM0MDc2OiAnTUFYX0NVQkVfTUFQX1RFWFRVUkVfU0laRScsXG4gIDM0MzM4OiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9FTkFCTEVEJyxcbiAgMzQzMzk6ICdWRVJURVhfQVRUUklCX0FSUkFZX1NJWkUnLFxuICAzNDM0MDogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfU1RSSURFJyxcbiAgMzQzNDE6ICdWRVJURVhfQVRUUklCX0FSUkFZX1RZUEUnLFxuICAzNDM0MjogJ0NVUlJFTlRfVkVSVEVYX0FUVFJJQicsXG4gIDM0MzczOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9QT0lOVEVSJyxcbiAgMzQ0NjY6ICdOVU1fQ09NUFJFU1NFRF9URVhUVVJFX0ZPUk1BVFMnLFxuICAzNDQ2NzogJ0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTJyxcbiAgMzQ2NjA6ICdCVUZGRVJfU0laRScsXG4gIDM0NjYxOiAnQlVGRkVSX1VTQUdFJyxcbiAgMzQ4MTY6ICdTVEVOQ0lMX0JBQ0tfRlVOQycsXG4gIDM0ODE3OiAnU1RFTkNJTF9CQUNLX0ZBSUwnLFxuICAzNDgxODogJ1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX0ZBSUwnLFxuICAzNDgxOTogJ1NURU5DSUxfQkFDS19QQVNTX0RFUFRIX1BBU1MnLFxuICAzNDg3NzogJ0JMRU5EX0VRVUFUSU9OX0FMUEhBJyxcbiAgMzQ5MjE6ICdNQVhfVkVSVEVYX0FUVFJJQlMnLFxuICAzNDkyMjogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfTk9STUFMSVpFRCcsXG4gIDM0OTMwOiAnTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMnLFxuICAzNDk2MjogJ0FSUkFZX0JVRkZFUicsXG4gIDM0OTYzOiAnRUxFTUVOVF9BUlJBWV9CVUZGRVInLFxuICAzNDk2NDogJ0FSUkFZX0JVRkZFUl9CSU5ESU5HJyxcbiAgMzQ5NjU6ICdFTEVNRU5UX0FSUkFZX0JVRkZFUl9CSU5ESU5HJyxcbiAgMzQ5NzU6ICdWRVJURVhfQVRUUklCX0FSUkFZX0JVRkZFUl9CSU5ESU5HJyxcbiAgMzUwNDA6ICdTVFJFQU1fRFJBVycsXG4gIDM1MDQ0OiAnU1RBVElDX0RSQVcnLFxuICAzNTA0ODogJ0RZTkFNSUNfRFJBVycsXG4gIDM1NjMyOiAnRlJBR01FTlRfU0hBREVSJyxcbiAgMzU2MzM6ICdWRVJURVhfU0hBREVSJyxcbiAgMzU2NjA6ICdNQVhfVkVSVEVYX1RFWFRVUkVfSU1BR0VfVU5JVFMnLFxuICAzNTY2MTogJ01BWF9DT01CSU5FRF9URVhUVVJFX0lNQUdFX1VOSVRTJyxcbiAgMzU2NjM6ICdTSEFERVJfVFlQRScsXG4gIDM1NjY0OiAnRkxPQVRfVkVDMicsXG4gIDM1NjY1OiAnRkxPQVRfVkVDMycsXG4gIDM1NjY2OiAnRkxPQVRfVkVDNCcsXG4gIDM1NjY3OiAnSU5UX1ZFQzInLFxuICAzNTY2ODogJ0lOVF9WRUMzJyxcbiAgMzU2Njk6ICdJTlRfVkVDNCcsXG4gIDM1NjcwOiAnQk9PTCcsXG4gIDM1NjcxOiAnQk9PTF9WRUMyJyxcbiAgMzU2NzI6ICdCT09MX1ZFQzMnLFxuICAzNTY3MzogJ0JPT0xfVkVDNCcsXG4gIDM1Njc0OiAnRkxPQVRfTUFUMicsXG4gIDM1Njc1OiAnRkxPQVRfTUFUMycsXG4gIDM1Njc2OiAnRkxPQVRfTUFUNCcsXG4gIDM1Njc4OiAnU0FNUExFUl8yRCcsXG4gIDM1NjgwOiAnU0FNUExFUl9DVUJFJyxcbiAgMzU3MTI6ICdERUxFVEVfU1RBVFVTJyxcbiAgMzU3MTM6ICdDT01QSUxFX1NUQVRVUycsXG4gIDM1NzE0OiAnTElOS19TVEFUVVMnLFxuICAzNTcxNTogJ1ZBTElEQVRFX1NUQVRVUycsXG4gIDM1NzE2OiAnSU5GT19MT0dfTEVOR1RIJyxcbiAgMzU3MTc6ICdBVFRBQ0hFRF9TSEFERVJTJyxcbiAgMzU3MTg6ICdBQ1RJVkVfVU5JRk9STVMnLFxuICAzNTcxOTogJ0FDVElWRV9VTklGT1JNX01BWF9MRU5HVEgnLFxuICAzNTcyMDogJ1NIQURFUl9TT1VSQ0VfTEVOR1RIJyxcbiAgMzU3MjE6ICdBQ1RJVkVfQVRUUklCVVRFUycsXG4gIDM1NzIyOiAnQUNUSVZFX0FUVFJJQlVURV9NQVhfTEVOR1RIJyxcbiAgMzU3MjQ6ICdTSEFESU5HX0xBTkdVQUdFX1ZFUlNJT04nLFxuICAzNTcyNTogJ0NVUlJFTlRfUFJPR1JBTScsXG4gIDM2MDAzOiAnU1RFTkNJTF9CQUNLX1JFRicsXG4gIDM2MDA0OiAnU1RFTkNJTF9CQUNLX1ZBTFVFX01BU0snLFxuICAzNjAwNTogJ1NURU5DSUxfQkFDS19XUklURU1BU0snLFxuICAzNjAwNjogJ0ZSQU1FQlVGRkVSX0JJTkRJTkcnLFxuICAzNjAwNzogJ1JFTkRFUkJVRkZFUl9CSU5ESU5HJyxcbiAgMzYwNDg6ICdGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9UWVBFJyxcbiAgMzYwNDk6ICdGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX09CSkVDVF9OQU1FJyxcbiAgMzYwNTA6ICdGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfTEVWRUwnLFxuICAzNjA1MTogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9DVUJFX01BUF9GQUNFJyxcbiAgMzYwNTM6ICdGUkFNRUJVRkZFUl9DT01QTEVURScsXG4gIDM2MDU0OiAnRlJBTUVCVUZGRVJfSU5DT01QTEVURV9BVFRBQ0hNRU5UJyxcbiAgMzYwNTU6ICdGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX01JU1NJTkdfQVRUQUNITUVOVCcsXG4gIDM2MDU3OiAnRlJBTUVCVUZGRVJfSU5DT01QTEVURV9ESU1FTlNJT05TJyxcbiAgMzYwNjE6ICdGUkFNRUJVRkZFUl9VTlNVUFBPUlRFRCcsXG4gIDM2MDY0OiAnQ09MT1JfQVRUQUNITUVOVDAnLFxuICAzNjA5NjogJ0RFUFRIX0FUVEFDSE1FTlQnLFxuICAzNjEyODogJ1NURU5DSUxfQVRUQUNITUVOVCcsXG4gIDM2MTYwOiAnRlJBTUVCVUZGRVInLFxuICAzNjE2MTogJ1JFTkRFUkJVRkZFUicsXG4gIDM2MTYyOiAnUkVOREVSQlVGRkVSX1dJRFRIJyxcbiAgMzYxNjM6ICdSRU5ERVJCVUZGRVJfSEVJR0hUJyxcbiAgMzYxNjQ6ICdSRU5ERVJCVUZGRVJfSU5URVJOQUxfRk9STUFUJyxcbiAgMzYxNjg6ICdTVEVOQ0lMX0lOREVYOCcsXG4gIDM2MTc2OiAnUkVOREVSQlVGRkVSX1JFRF9TSVpFJyxcbiAgMzYxNzc6ICdSRU5ERVJCVUZGRVJfR1JFRU5fU0laRScsXG4gIDM2MTc4OiAnUkVOREVSQlVGRkVSX0JMVUVfU0laRScsXG4gIDM2MTc5OiAnUkVOREVSQlVGRkVSX0FMUEhBX1NJWkUnLFxuICAzNjE4MDogJ1JFTkRFUkJVRkZFUl9ERVBUSF9TSVpFJyxcbiAgMzYxODE6ICdSRU5ERVJCVUZGRVJfU1RFTkNJTF9TSVpFJyxcbiAgMzYxOTQ6ICdSR0I1NjUnLFxuICAzNjMzNjogJ0xPV19GTE9BVCcsXG4gIDM2MzM3OiAnTUVESVVNX0ZMT0FUJyxcbiAgMzYzMzg6ICdISUdIX0ZMT0FUJyxcbiAgMzYzMzk6ICdMT1dfSU5UJyxcbiAgMzYzNDA6ICdNRURJVU1fSU5UJyxcbiAgMzYzNDE6ICdISUdIX0lOVCcsXG4gIDM2MzQ2OiAnU0hBREVSX0NPTVBJTEVSJyxcbiAgMzYzNDc6ICdNQVhfVkVSVEVYX1VOSUZPUk1fVkVDVE9SUycsXG4gIDM2MzQ4OiAnTUFYX1ZBUllJTkdfVkVDVE9SUycsXG4gIDM2MzQ5OiAnTUFYX0ZSQUdNRU5UX1VOSUZPUk1fVkVDVE9SUycsXG4gIDM3NDQwOiAnVU5QQUNLX0ZMSVBfWV9XRUJHTCcsXG4gIDM3NDQxOiAnVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMJyxcbiAgMzc0NDI6ICdDT05URVhUX0xPU1RfV0VCR0wnLFxuICAzNzQ0MzogJ1VOUEFDS19DT0xPUlNQQUNFX0NPTlZFUlNJT05fV0VCR0wnLFxuICAzNzQ0NDogJ0JST1dTRVJfREVGQVVMVF9XRUJHTCdcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNvbnN0YW50cy8xLjAvbnVtYmVycy5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9rZW5pemUgPSByZXF1aXJlKCdnbHNsLXRva2VuaXplcicpXG52YXIgYXRvYiAgICAgPSByZXF1aXJlKCdhdG9iLWxpdGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hbWVcblxuZnVuY3Rpb24gZ2V0TmFtZShzcmMpIHtcbiAgdmFyIHRva2VucyA9IEFycmF5LmlzQXJyYXkoc3JjKVxuICAgID8gc3JjXG4gICAgOiB0b2tlbml6ZShzcmMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICBpZiAodG9rZW4udHlwZSAhPT0gJ3ByZXByb2Nlc3NvcicpIGNvbnRpbnVlXG4gICAgdmFyIG1hdGNoID0gdG9rZW4uZGF0YS5tYXRjaCgvXFwjZGVmaW5lXFxzK1NIQURFUl9OQU1FKF9CNjQpP1xccysoLispJC8pXG4gICAgaWYgKCFtYXRjaCkgY29udGludWVcbiAgICBpZiAoIW1hdGNoWzJdKSBjb250aW51ZVxuXG4gICAgdmFyIGI2NCAgPSBtYXRjaFsxXVxuICAgIHZhciBuYW1lID0gbWF0Y2hbMl1cblxuICAgIHJldHVybiAoYjY0ID8gYXRvYihuYW1lKSA6IG5hbWUpLnRyaW0oKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXNoYWRlci1uYW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b2tlbml6ZSA9IHJlcXVpcmUoJy4vaW5kZXgnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHRva2VuaXplU3RyaW5nXG5cbmZ1bmN0aW9uIHRva2VuaXplU3RyaW5nKHN0ciwgb3B0KSB7XG4gIHZhciBnZW5lcmF0b3IgPSB0b2tlbml6ZShvcHQpXG4gIHZhciB0b2tlbnMgPSBbXVxuXG4gIHRva2VucyA9IHRva2Vucy5jb25jYXQoZ2VuZXJhdG9yKHN0cikpXG4gIHRva2VucyA9IHRva2Vucy5jb25jYXQoZ2VuZXJhdG9yKG51bGwpKVxuXG4gIHJldHVybiB0b2tlbnNcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL3N0cmluZy5qc1xuLy8gbW9kdWxlIGlkID0gMjNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHRva2VuaXplXG5cbnZhciBsaXRlcmFsczEwMCA9IHJlcXVpcmUoJy4vbGliL2xpdGVyYWxzJylcbiAgLCBvcGVyYXRvcnMgPSByZXF1aXJlKCcuL2xpYi9vcGVyYXRvcnMnKVxuICAsIGJ1aWx0aW5zMTAwID0gcmVxdWlyZSgnLi9saWIvYnVpbHRpbnMnKVxuICAsIGxpdGVyYWxzMzAwZXMgPSByZXF1aXJlKCcuL2xpYi9saXRlcmFscy0zMDBlcycpXG4gICwgYnVpbHRpbnMzMDBlcyA9IHJlcXVpcmUoJy4vbGliL2J1aWx0aW5zLTMwMGVzJylcblxudmFyIE5PUk1BTCA9IDk5OSAgICAgICAgICAvLyA8LS0gbmV2ZXIgZW1pdHRlZFxuICAsIFRPS0VOID0gOTk5OSAgICAgICAgICAvLyA8LS0gbmV2ZXIgZW1pdHRlZFxuICAsIEJMT0NLX0NPTU1FTlQgPSAwXG4gICwgTElORV9DT01NRU5UID0gMVxuICAsIFBSRVBST0NFU1NPUiA9IDJcbiAgLCBPUEVSQVRPUiA9IDNcbiAgLCBJTlRFR0VSID0gNFxuICAsIEZMT0FUID0gNVxuICAsIElERU5UID0gNlxuICAsIEJVSUxUSU4gPSA3XG4gICwgS0VZV09SRCA9IDhcbiAgLCBXSElURVNQQUNFID0gOVxuICAsIEVPRiA9IDEwXG4gICwgSEVYID0gMTFcblxudmFyIG1hcCA9IFtcbiAgICAnYmxvY2stY29tbWVudCdcbiAgLCAnbGluZS1jb21tZW50J1xuICAsICdwcmVwcm9jZXNzb3InXG4gICwgJ29wZXJhdG9yJ1xuICAsICdpbnRlZ2VyJ1xuICAsICdmbG9hdCdcbiAgLCAnaWRlbnQnXG4gICwgJ2J1aWx0aW4nXG4gICwgJ2tleXdvcmQnXG4gICwgJ3doaXRlc3BhY2UnXG4gICwgJ2VvZidcbiAgLCAnaW50ZWdlcidcbl1cblxuZnVuY3Rpb24gdG9rZW5pemUob3B0KSB7XG4gIHZhciBpID0gMFxuICAgICwgdG90YWwgPSAwXG4gICAgLCBtb2RlID0gTk9STUFMXG4gICAgLCBjXG4gICAgLCBsYXN0XG4gICAgLCBjb250ZW50ID0gW11cbiAgICAsIHRva2VucyA9IFtdXG4gICAgLCB0b2tlbl9pZHggPSAwXG4gICAgLCB0b2tlbl9vZmZzID0gMFxuICAgICwgbGluZSA9IDFcbiAgICAsIGNvbCA9IDBcbiAgICAsIHN0YXJ0ID0gMFxuICAgICwgaXNudW0gPSBmYWxzZVxuICAgICwgaXNvcGVyYXRvciA9IGZhbHNlXG4gICAgLCBpbnB1dCA9ICcnXG4gICAgLCBsZW5cblxuICBvcHQgPSBvcHQgfHwge31cbiAgdmFyIGFsbEJ1aWx0aW5zID0gYnVpbHRpbnMxMDBcbiAgdmFyIGFsbExpdGVyYWxzID0gbGl0ZXJhbHMxMDBcbiAgaWYgKG9wdC52ZXJzaW9uID09PSAnMzAwIGVzJykge1xuICAgIGFsbEJ1aWx0aW5zID0gYnVpbHRpbnMzMDBlc1xuICAgIGFsbExpdGVyYWxzID0gbGl0ZXJhbHMzMDBlc1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB0b2tlbnMgPSBbXVxuICAgIGlmIChkYXRhICE9PSBudWxsKSByZXR1cm4gd3JpdGUoZGF0YS5yZXBsYWNlID8gZGF0YS5yZXBsYWNlKC9cXHJcXG4vZywgJ1xcbicpIDogZGF0YSlcbiAgICByZXR1cm4gZW5kKClcbiAgfVxuXG4gIGZ1bmN0aW9uIHRva2VuKGRhdGEpIHtcbiAgICBpZiAoZGF0YS5sZW5ndGgpIHtcbiAgICAgIHRva2Vucy5wdXNoKHtcbiAgICAgICAgdHlwZTogbWFwW21vZGVdXG4gICAgICAsIGRhdGE6IGRhdGFcbiAgICAgICwgcG9zaXRpb246IHN0YXJ0XG4gICAgICAsIGxpbmU6IGxpbmVcbiAgICAgICwgY29sdW1uOiBjb2xcbiAgICAgIH0pXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGUoY2h1bmspIHtcbiAgICBpID0gMFxuICAgIGlucHV0ICs9IGNodW5rXG4gICAgbGVuID0gaW5wdXQubGVuZ3RoXG5cbiAgICB2YXIgbGFzdFxuXG4gICAgd2hpbGUoYyA9IGlucHV0W2ldLCBpIDwgbGVuKSB7XG4gICAgICBsYXN0ID0gaVxuXG4gICAgICBzd2l0Y2gobW9kZSkge1xuICAgICAgICBjYXNlIEJMT0NLX0NPTU1FTlQ6IGkgPSBibG9ja19jb21tZW50KCk7IGJyZWFrXG4gICAgICAgIGNhc2UgTElORV9DT01NRU5UOiBpID0gbGluZV9jb21tZW50KCk7IGJyZWFrXG4gICAgICAgIGNhc2UgUFJFUFJPQ0VTU09SOiBpID0gcHJlcHJvY2Vzc29yKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgT1BFUkFUT1I6IGkgPSBvcGVyYXRvcigpOyBicmVha1xuICAgICAgICBjYXNlIElOVEVHRVI6IGkgPSBpbnRlZ2VyKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgSEVYOiBpID0gaGV4KCk7IGJyZWFrXG4gICAgICAgIGNhc2UgRkxPQVQ6IGkgPSBkZWNpbWFsKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgVE9LRU46IGkgPSByZWFkdG9rZW4oKTsgYnJlYWtcbiAgICAgICAgY2FzZSBXSElURVNQQUNFOiBpID0gd2hpdGVzcGFjZSgpOyBicmVha1xuICAgICAgICBjYXNlIE5PUk1BTDogaSA9IG5vcm1hbCgpOyBicmVha1xuICAgICAgfVxuXG4gICAgICBpZihsYXN0ICE9PSBpKSB7XG4gICAgICAgIHN3aXRjaChpbnB1dFtsYXN0XSkge1xuICAgICAgICAgIGNhc2UgJ1xcbic6IGNvbCA9IDA7ICsrbGluZTsgYnJlYWtcbiAgICAgICAgICBkZWZhdWx0OiArK2NvbDsgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHRvdGFsICs9IGlcbiAgICBpbnB1dCA9IGlucHV0LnNsaWNlKGkpXG4gICAgcmV0dXJuIHRva2Vuc1xuICB9XG5cbiAgZnVuY3Rpb24gZW5kKGNodW5rKSB7XG4gICAgaWYoY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgfVxuXG4gICAgbW9kZSA9IEVPRlxuICAgIHRva2VuKCcoZW9mKScpXG4gICAgcmV0dXJuIHRva2Vuc1xuICB9XG5cbiAgZnVuY3Rpb24gbm9ybWFsKCkge1xuICAgIGNvbnRlbnQgPSBjb250ZW50Lmxlbmd0aCA/IFtdIDogY29udGVudFxuXG4gICAgaWYobGFzdCA9PT0gJy8nICYmIGMgPT09ICcqJykge1xuICAgICAgc3RhcnQgPSB0b3RhbCArIGkgLSAxXG4gICAgICBtb2RlID0gQkxPQ0tfQ09NTUVOVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnLycpIHtcbiAgICAgIHN0YXJ0ID0gdG90YWwgKyBpIC0gMVxuICAgICAgbW9kZSA9IExJTkVfQ09NTUVOVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKGMgPT09ICcjJykge1xuICAgICAgbW9kZSA9IFBSRVBST0NFU1NPUlxuICAgICAgc3RhcnQgPSB0b3RhbCArIGlcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYoL1xccy8udGVzdChjKSkge1xuICAgICAgbW9kZSA9IFdISVRFU1BBQ0VcbiAgICAgIHN0YXJ0ID0gdG90YWwgKyBpXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlzbnVtID0gL1xcZC8udGVzdChjKVxuICAgIGlzb3BlcmF0b3IgPSAvW15cXHdfXS8udGVzdChjKVxuXG4gICAgc3RhcnQgPSB0b3RhbCArIGlcbiAgICBtb2RlID0gaXNudW0gPyBJTlRFR0VSIDogaXNvcGVyYXRvciA/IE9QRVJBVE9SIDogVE9LRU5cbiAgICByZXR1cm4gaVxuICB9XG5cbiAgZnVuY3Rpb24gd2hpdGVzcGFjZSgpIHtcbiAgICBpZigvW15cXHNdL2cudGVzdChjKSkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBwcmVwcm9jZXNzb3IoKSB7XG4gICAgaWYoKGMgPT09ICdcXHInIHx8IGMgPT09ICdcXG4nKSAmJiBsYXN0ICE9PSAnXFxcXCcpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gbGluZV9jb21tZW50KCkge1xuICAgIHJldHVybiBwcmVwcm9jZXNzb3IoKVxuICB9XG5cbiAgZnVuY3Rpb24gYmxvY2tfY29tbWVudCgpIHtcbiAgICBpZihjID09PSAnLycgJiYgbGFzdCA9PT0gJyonKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gb3BlcmF0b3IoKSB7XG4gICAgaWYobGFzdCA9PT0gJy4nICYmIC9cXGQvLnRlc3QoYykpIHtcbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZihsYXN0ID09PSAnLycgJiYgYyA9PT0gJyonKSB7XG4gICAgICBtb2RlID0gQkxPQ0tfQ09NTUVOVFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZihsYXN0ID09PSAnLycgJiYgYyA9PT0gJy8nKSB7XG4gICAgICBtb2RlID0gTElORV9DT01NRU5UXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGMgPT09ICcuJyAmJiBjb250ZW50Lmxlbmd0aCkge1xuICAgICAgd2hpbGUoZGV0ZXJtaW5lX29wZXJhdG9yKGNvbnRlbnQpKTtcblxuICAgICAgbW9kZSA9IEZMT0FUXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGMgPT09ICc7JyB8fCBjID09PSAnKScgfHwgYyA9PT0gJygnKSB7XG4gICAgICBpZihjb250ZW50Lmxlbmd0aCkgd2hpbGUoZGV0ZXJtaW5lX29wZXJhdG9yKGNvbnRlbnQpKTtcbiAgICAgIHRva2VuKGMpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICB2YXIgaXNfY29tcG9zaXRlX29wZXJhdG9yID0gY29udGVudC5sZW5ndGggPT09IDIgJiYgYyAhPT0gJz0nXG4gICAgaWYoL1tcXHdfXFxkXFxzXS8udGVzdChjKSB8fCBpc19jb21wb3NpdGVfb3BlcmF0b3IpIHtcbiAgICAgIHdoaWxlKGRldGVybWluZV9vcGVyYXRvcihjb250ZW50KSk7XG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBkZXRlcm1pbmVfb3BlcmF0b3IoYnVmKSB7XG4gICAgdmFyIGogPSAwXG4gICAgICAsIGlkeFxuICAgICAgLCByZXNcblxuICAgIGRvIHtcbiAgICAgIGlkeCA9IG9wZXJhdG9ycy5pbmRleE9mKGJ1Zi5zbGljZSgwLCBidWYubGVuZ3RoICsgaikuam9pbignJykpXG4gICAgICByZXMgPSBvcGVyYXRvcnNbaWR4XVxuXG4gICAgICBpZihpZHggPT09IC0xKSB7XG4gICAgICAgIGlmKGotLSArIGJ1Zi5sZW5ndGggPiAwKSBjb250aW51ZVxuICAgICAgICByZXMgPSBidWYuc2xpY2UoMCwgMSkuam9pbignJylcbiAgICAgIH1cblxuICAgICAgdG9rZW4ocmVzKVxuXG4gICAgICBzdGFydCArPSByZXMubGVuZ3RoXG4gICAgICBjb250ZW50ID0gY29udGVudC5zbGljZShyZXMubGVuZ3RoKVxuICAgICAgcmV0dXJuIGNvbnRlbnQubGVuZ3RoXG4gICAgfSB3aGlsZSgxKVxuICB9XG5cbiAgZnVuY3Rpb24gaGV4KCkge1xuICAgIGlmKC9bXmEtZkEtRjAtOV0vLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBpbnRlZ2VyKCkge1xuICAgIGlmKGMgPT09ICcuJykge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBtb2RlID0gRkxPQVRcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZigvW2VFXS8udGVzdChjKSkge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBtb2RlID0gRkxPQVRcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZihjID09PSAneCcgJiYgY29udGVudC5sZW5ndGggPT09IDEgJiYgY29udGVudFswXSA9PT0gJzAnKSB7XG4gICAgICBtb2RlID0gSEVYXG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZigvW15cXGRdLy50ZXN0KGMpKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gZGVjaW1hbCgpIHtcbiAgICBpZihjID09PSAnZicpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIGkgKz0gMVxuICAgIH1cblxuICAgIGlmKC9bZUVdLy50ZXN0KGMpKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZiAoYyA9PT0gJy0nICYmIC9bZUVdLy50ZXN0KGxhc3QpKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZigvW15cXGRdLy50ZXN0KGMpKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZHRva2VuKCkge1xuICAgIGlmKC9bXlxcZFxcd19dLy50ZXN0KGMpKSB7XG4gICAgICB2YXIgY29udGVudHN0ciA9IGNvbnRlbnQuam9pbignJylcbiAgICAgIGlmKGFsbExpdGVyYWxzLmluZGV4T2YoY29udGVudHN0cikgPiAtMSkge1xuICAgICAgICBtb2RlID0gS0VZV09SRFxuICAgICAgfSBlbHNlIGlmKGFsbEJ1aWx0aW5zLmluZGV4T2YoY29udGVudHN0cikgPiAtMSkge1xuICAgICAgICBtb2RlID0gQlVJTFRJTlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kZSA9IElERU5UXG4gICAgICB9XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgJzw8PSdcbiAgLCAnPj49J1xuICAsICcrKydcbiAgLCAnLS0nXG4gICwgJzw8J1xuICAsICc+PidcbiAgLCAnPD0nXG4gICwgJz49J1xuICAsICc9PSdcbiAgLCAnIT0nXG4gICwgJyYmJ1xuICAsICd8fCdcbiAgLCAnKz0nXG4gICwgJy09J1xuICAsICcqPSdcbiAgLCAnLz0nXG4gICwgJyU9J1xuICAsICcmPSdcbiAgLCAnXl4nXG4gICwgJ149J1xuICAsICd8PSdcbiAgLCAnKCdcbiAgLCAnKSdcbiAgLCAnWydcbiAgLCAnXSdcbiAgLCAnLidcbiAgLCAnISdcbiAgLCAnfidcbiAgLCAnKidcbiAgLCAnLydcbiAgLCAnJSdcbiAgLCAnKydcbiAgLCAnLSdcbiAgLCAnPCdcbiAgLCAnPidcbiAgLCAnJidcbiAgLCAnXidcbiAgLCAnfCdcbiAgLCAnPydcbiAgLCAnOidcbiAgLCAnPSdcbiAgLCAnLCdcbiAgLCAnOydcbiAgLCAneydcbiAgLCAnfSdcbl1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9vcGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDI1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHYxMDAgPSByZXF1aXJlKCcuL2xpdGVyYWxzJylcblxubW9kdWxlLmV4cG9ydHMgPSB2MTAwLnNsaWNlKCkuY29uY2F0KFtcbiAgICdsYXlvdXQnXG4gICwgJ2NlbnRyb2lkJ1xuICAsICdzbW9vdGgnXG4gICwgJ2Nhc2UnXG4gICwgJ21hdDJ4MidcbiAgLCAnbWF0MngzJ1xuICAsICdtYXQyeDQnXG4gICwgJ21hdDN4MidcbiAgLCAnbWF0M3gzJ1xuICAsICdtYXQzeDQnXG4gICwgJ21hdDR4MidcbiAgLCAnbWF0NHgzJ1xuICAsICdtYXQ0eDQnXG4gICwgJ3VpbnQnXG4gICwgJ3V2ZWMyJ1xuICAsICd1dmVjMydcbiAgLCAndXZlYzQnXG4gICwgJ3NhbXBsZXJDdWJlU2hhZG93J1xuICAsICdzYW1wbGVyMkRBcnJheSdcbiAgLCAnc2FtcGxlcjJEQXJyYXlTaGFkb3cnXG4gICwgJ2lzYW1wbGVyMkQnXG4gICwgJ2lzYW1wbGVyM0QnXG4gICwgJ2lzYW1wbGVyQ3ViZSdcbiAgLCAnaXNhbXBsZXIyREFycmF5J1xuICAsICd1c2FtcGxlcjJEJ1xuICAsICd1c2FtcGxlcjNEJ1xuICAsICd1c2FtcGxlckN1YmUnXG4gICwgJ3VzYW1wbGVyMkRBcnJheSdcbiAgLCAnY29oZXJlbnQnXG4gICwgJ3Jlc3RyaWN0J1xuICAsICdyZWFkb25seSdcbiAgLCAnd3JpdGVvbmx5J1xuICAsICdyZXNvdXJjZSdcbiAgLCAnYXRvbWljX3VpbnQnXG4gICwgJ25vcGVyc3BlY3RpdmUnXG4gICwgJ3BhdGNoJ1xuICAsICdzYW1wbGUnXG4gICwgJ3N1YnJvdXRpbmUnXG4gICwgJ2NvbW1vbidcbiAgLCAncGFydGl0aW9uJ1xuICAsICdhY3RpdmUnXG4gICwgJ2ZpbHRlcidcbiAgLCAnaW1hZ2UxRCdcbiAgLCAnaW1hZ2UyRCdcbiAgLCAnaW1hZ2UzRCdcbiAgLCAnaW1hZ2VDdWJlJ1xuICAsICdpaW1hZ2UxRCdcbiAgLCAnaWltYWdlMkQnXG4gICwgJ2lpbWFnZTNEJ1xuICAsICdpaW1hZ2VDdWJlJ1xuICAsICd1aW1hZ2UxRCdcbiAgLCAndWltYWdlMkQnXG4gICwgJ3VpbWFnZTNEJ1xuICAsICd1aW1hZ2VDdWJlJ1xuICAsICdpbWFnZTFEQXJyYXknXG4gICwgJ2ltYWdlMkRBcnJheSdcbiAgLCAnaWltYWdlMURBcnJheSdcbiAgLCAnaWltYWdlMkRBcnJheSdcbiAgLCAndWltYWdlMURBcnJheSdcbiAgLCAndWltYWdlMkRBcnJheSdcbiAgLCAnaW1hZ2UxRFNoYWRvdydcbiAgLCAnaW1hZ2UyRFNoYWRvdydcbiAgLCAnaW1hZ2UxREFycmF5U2hhZG93J1xuICAsICdpbWFnZTJEQXJyYXlTaGFkb3cnXG4gICwgJ2ltYWdlQnVmZmVyJ1xuICAsICdpaW1hZ2VCdWZmZXInXG4gICwgJ3VpbWFnZUJ1ZmZlcidcbiAgLCAnc2FtcGxlcjFEQXJyYXknXG4gICwgJ3NhbXBsZXIxREFycmF5U2hhZG93J1xuICAsICdpc2FtcGxlcjFEJ1xuICAsICdpc2FtcGxlcjFEQXJyYXknXG4gICwgJ3VzYW1wbGVyMUQnXG4gICwgJ3VzYW1wbGVyMURBcnJheSdcbiAgLCAnaXNhbXBsZXIyRFJlY3QnXG4gICwgJ3VzYW1wbGVyMkRSZWN0J1xuICAsICdzYW1wbGVyQnVmZmVyJ1xuICAsICdpc2FtcGxlckJ1ZmZlcidcbiAgLCAndXNhbXBsZXJCdWZmZXInXG4gICwgJ3NhbXBsZXIyRE1TJ1xuICAsICdpc2FtcGxlcjJETVMnXG4gICwgJ3VzYW1wbGVyMkRNUydcbiAgLCAnc2FtcGxlcjJETVNBcnJheSdcbiAgLCAnaXNhbXBsZXIyRE1TQXJyYXknXG4gICwgJ3VzYW1wbGVyMkRNU0FycmF5J1xuXSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9saXRlcmFscy0zMDBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyAzMDBlcyBidWlsdGlucy9yZXNlcnZlZCB3b3JkcyB0aGF0IHdlcmUgcHJldmlvdXNseSB2YWxpZCBpbiB2MTAwXG52YXIgdjEwMCA9IHJlcXVpcmUoJy4vYnVpbHRpbnMnKVxuXG4vLyBUaGUgdGV4dHVyZTJEfEN1YmUgZnVuY3Rpb25zIGhhdmUgYmVlbiByZW1vdmVkXG4vLyBBbmQgdGhlIGdsXyBmZWF0dXJlcyBhcmUgdXBkYXRlZFxudjEwMCA9IHYxMDAuc2xpY2UoKS5maWx0ZXIoZnVuY3Rpb24gKGIpIHtcbiAgcmV0dXJuICEvXihnbFxcX3x0ZXh0dXJlKS8udGVzdChiKVxufSlcblxubW9kdWxlLmV4cG9ydHMgPSB2MTAwLmNvbmNhdChbXG4gIC8vIHRoZSB1cGRhdGVkIGdsXyBjb25zdGFudHNcbiAgICAnZ2xfVmVydGV4SUQnXG4gICwgJ2dsX0luc3RhbmNlSUQnXG4gICwgJ2dsX1Bvc2l0aW9uJ1xuICAsICdnbF9Qb2ludFNpemUnXG4gICwgJ2dsX0ZyYWdDb29yZCdcbiAgLCAnZ2xfRnJvbnRGYWNpbmcnXG4gICwgJ2dsX0ZyYWdEZXB0aCdcbiAgLCAnZ2xfUG9pbnRDb29yZCdcbiAgLCAnZ2xfTWF4VmVydGV4QXR0cmlicydcbiAgLCAnZ2xfTWF4VmVydGV4VW5pZm9ybVZlY3RvcnMnXG4gICwgJ2dsX01heFZlcnRleE91dHB1dFZlY3RvcnMnXG4gICwgJ2dsX01heEZyYWdtZW50SW5wdXRWZWN0b3JzJ1xuICAsICdnbF9NYXhWZXJ0ZXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4Q29tYmluZWRUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VGV4dHVyZUltYWdlVW5pdHMnXG4gICwgJ2dsX01heEZyYWdtZW50VW5pZm9ybVZlY3RvcnMnXG4gICwgJ2dsX01heERyYXdCdWZmZXJzJ1xuICAsICdnbF9NaW5Qcm9ncmFtVGV4ZWxPZmZzZXQnXG4gICwgJ2dsX01heFByb2dyYW1UZXhlbE9mZnNldCdcbiAgLCAnZ2xfRGVwdGhSYW5nZVBhcmFtZXRlcnMnXG4gICwgJ2dsX0RlcHRoUmFuZ2UnXG5cbiAgLy8gb3RoZXIgYnVpbHRpbnNcbiAgLCAndHJ1bmMnXG4gICwgJ3JvdW5kJ1xuICAsICdyb3VuZEV2ZW4nXG4gICwgJ2lzbmFuJ1xuICAsICdpc2luZidcbiAgLCAnZmxvYXRCaXRzVG9JbnQnXG4gICwgJ2Zsb2F0Qml0c1RvVWludCdcbiAgLCAnaW50Qml0c1RvRmxvYXQnXG4gICwgJ3VpbnRCaXRzVG9GbG9hdCdcbiAgLCAncGFja1Nub3JtMngxNidcbiAgLCAndW5wYWNrU25vcm0yeDE2J1xuICAsICdwYWNrVW5vcm0yeDE2J1xuICAsICd1bnBhY2tVbm9ybTJ4MTYnXG4gICwgJ3BhY2tIYWxmMngxNidcbiAgLCAndW5wYWNrSGFsZjJ4MTYnXG4gICwgJ291dGVyUHJvZHVjdCdcbiAgLCAndHJhbnNwb3NlJ1xuICAsICdkZXRlcm1pbmFudCdcbiAgLCAnaW52ZXJzZSdcbiAgLCAndGV4dHVyZSdcbiAgLCAndGV4dHVyZVNpemUnXG4gICwgJ3RleHR1cmVQcm9qJ1xuICAsICd0ZXh0dXJlTG9kJ1xuICAsICd0ZXh0dXJlT2Zmc2V0J1xuICAsICd0ZXhlbEZldGNoJ1xuICAsICd0ZXhlbEZldGNoT2Zmc2V0J1xuICAsICd0ZXh0dXJlUHJvak9mZnNldCdcbiAgLCAndGV4dHVyZUxvZE9mZnNldCdcbiAgLCAndGV4dHVyZVByb2pMb2QnXG4gICwgJ3RleHR1cmVQcm9qTG9kT2Zmc2V0J1xuICAsICd0ZXh0dXJlR3JhZCdcbiAgLCAndGV4dHVyZUdyYWRPZmZzZXQnXG4gICwgJ3RleHR1cmVQcm9qR3JhZCdcbiAgLCAndGV4dHVyZVByb2pHcmFkT2Zmc2V0J1xuXSlcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy0zMDBlcy5qc1xuLy8gbW9kdWxlIGlkID0gMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9hdG9iKHN0cikge1xuICByZXR1cm4gYXRvYihzdHIpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hdG9iLWxpdGUvYXRvYi1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBwYWRMZWZ0ID0gcmVxdWlyZSgncGFkLWxlZnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGFkZExpbmVOdW1iZXJzXG5mdW5jdGlvbiBhZGRMaW5lTnVtYmVycyAoc3RyaW5nLCBzdGFydCwgZGVsaW0pIHtcbiAgc3RhcnQgPSB0eXBlb2Ygc3RhcnQgPT09ICdudW1iZXInID8gc3RhcnQgOiAxXG4gIGRlbGltID0gZGVsaW0gfHwgJzogJ1xuXG4gIHZhciBsaW5lcyA9IHN0cmluZy5zcGxpdCgvXFxyP1xcbi8pXG4gIHZhciB0b3RhbERpZ2l0cyA9IFN0cmluZyhsaW5lcy5sZW5ndGggKyBzdGFydCAtIDEpLmxlbmd0aFxuICByZXR1cm4gbGluZXMubWFwKGZ1bmN0aW9uIChsaW5lLCBpKSB7XG4gICAgdmFyIGMgPSBpICsgc3RhcnRcbiAgICB2YXIgZGlnaXRzID0gU3RyaW5nKGMpLmxlbmd0aFxuICAgIHZhciBwcmVmaXggPSBwYWRMZWZ0KGMsIHRvdGFsRGlnaXRzIC0gZGlnaXRzKVxuICAgIHJldHVybiBwcmVmaXggKyBkZWxpbSArIGxpbmVcbiAgfSkuam9pbignXFxuJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2FkZC1saW5lLW51bWJlcnMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDI5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBwYWQtbGVmdCA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcGFkLWxlZnQ+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYWRMZWZ0KHN0ciwgbnVtLCBjaCkge1xuICBjaCA9IHR5cGVvZiBjaCAhPT0gJ3VuZGVmaW5lZCcgPyAoY2ggKyAnJykgOiAnICc7XG4gIHJldHVybiByZXBlYXQoY2gsIG51bSkgKyBzdHI7XG59O1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3BhZC1sZWZ0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogcmVwZWF0LXN0cmluZyA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcmVwZWF0LXN0cmluZz5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc3VsdHMgY2FjaGVcbiAqL1xuXG52YXIgcmVzID0gJyc7XG52YXIgY2FjaGU7XG5cbi8qKlxuICogRXhwb3NlIGByZXBlYXRgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG5cbi8qKlxuICogUmVwZWF0IHRoZSBnaXZlbiBgc3RyaW5nYCB0aGUgc3BlY2lmaWVkIGBudW1iZXJgXG4gKiBvZiB0aW1lcy5cbiAqXG4gKiAqKkV4YW1wbGU6KipcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcbiAqIHJlcGVhdCgnQScsIDUpO1xuICogLy89PiBBQUFBQVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJpbmdgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG4gKiBAcGFyYW0ge051bWJlcn0gYG51bWJlcmAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBSZXBlYXRlZCBzdHJpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgbnVtKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICAvLyBjb3ZlciBjb21tb24sIHF1aWNrIHVzZSBjYXNlc1xuICBpZiAobnVtID09PSAxKSByZXR1cm4gc3RyO1xuICBpZiAobnVtID09PSAyKSByZXR1cm4gc3RyICsgc3RyO1xuXG4gIHZhciBtYXggPSBzdHIubGVuZ3RoICogbnVtO1xuICBpZiAoY2FjaGUgIT09IHN0ciB8fCB0eXBlb2YgY2FjaGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2FjaGUgPSBzdHI7XG4gICAgcmVzID0gJyc7XG4gIH0gZWxzZSBpZiAocmVzLmxlbmd0aCA+PSBtYXgpIHtcbiAgICByZXR1cm4gcmVzLnN1YnN0cigwLCBtYXgpO1xuICB9XG5cbiAgd2hpbGUgKG1heCA+IHJlcy5sZW5ndGggJiYgbnVtID4gMSkge1xuICAgIGlmIChudW0gJiAxKSB7XG4gICAgICByZXMgKz0gc3RyO1xuICAgIH1cblxuICAgIG51bSA+Pj0gMTtcbiAgICBzdHIgKz0gc3RyO1xuICB9XG5cbiAgcmVzICs9IHN0cjtcbiAgcmVzID0gcmVzLnN1YnN0cigwLCBtYXgpO1xuICByZXR1cm4gcmVzO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVwZWF0LXN0cmluZy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBPcmlnaW5hbCAtIEBHb3pvbGEuXG4vLyBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9Hb3phbGEvMTI2OTk5MVxuLy8gVGhpcyBpcyBhIHJlaW1wbGVtZW50ZWQgdmVyc2lvbiAod2l0aCBhIGZldyBidWcgZml4ZXMpLlxuXG52YXIgY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZS1zdG9yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHdlYWtNYXA7XG5cbmZ1bmN0aW9uIHdlYWtNYXAoKSB7XG4gICAgdmFyIHByaXZhdGVzID0gY3JlYXRlU3RvcmUoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgICdnZXQnOiBmdW5jdGlvbiAoa2V5LCBmYWxsYmFjaykge1xuICAgICAgICAgICAgdmFyIHN0b3JlID0gcHJpdmF0ZXMoa2V5KVxuICAgICAgICAgICAgcmV0dXJuIHN0b3JlLmhhc093blByb3BlcnR5KCd2YWx1ZScpID9cbiAgICAgICAgICAgICAgICBzdG9yZS52YWx1ZSA6IGZhbGxiYWNrXG4gICAgICAgIH0sXG4gICAgICAgICdzZXQnOiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgcHJpdmF0ZXMoa2V5KS52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgICdoYXMnOiBmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiAndmFsdWUnIGluIHByaXZhdGVzKGtleSk7XG4gICAgICAgIH0sXG4gICAgICAgICdkZWxldGUnOiBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gZGVsZXRlIHByaXZhdGVzKGtleSkudmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGhpZGRlblN0b3JlID0gcmVxdWlyZSgnLi9oaWRkZW4tc3RvcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTdG9yZTtcblxuZnVuY3Rpb24gY3JlYXRlU3RvcmUoKSB7XG4gICAgdmFyIGtleSA9IHt9O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpICYmXG4gICAgICAgICAgICB0eXBlb2Ygb2JqICE9PSAnZnVuY3Rpb24nXG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdXZWFrbWFwLXNoaW06IEtleSBtdXN0IGJlIG9iamVjdCcpXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc3RvcmUgPSBvYmoudmFsdWVPZihrZXkpO1xuICAgICAgICByZXR1cm4gc3RvcmUgJiYgc3RvcmUuaWRlbnRpdHkgPT09IGtleSA/XG4gICAgICAgICAgICBzdG9yZSA6IGhpZGRlblN0b3JlKG9iaiwga2V5KTtcbiAgICB9O1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2NyZWF0ZS1zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMzNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGhpZGRlblN0b3JlO1xuXG5mdW5jdGlvbiBoaWRkZW5TdG9yZShvYmosIGtleSkge1xuICAgIHZhciBzdG9yZSA9IHsgaWRlbnRpdHk6IGtleSB9O1xuICAgIHZhciB2YWx1ZU9mID0gb2JqLnZhbHVlT2Y7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBcInZhbHVlT2ZcIiwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IGtleSA/XG4gICAgICAgICAgICAgICAgdmFsdWVPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogc3RvcmU7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vaGlkZGVuLXN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLnVuaWZvcm1zICAgID0gcnVudGltZVVuaWZvcm1zXG5leHBvcnRzLmF0dHJpYnV0ZXMgID0gcnVudGltZUF0dHJpYnV0ZXNcblxudmFyIEdMX1RPX0dMU0xfVFlQRVMgPSB7XG4gICdGTE9BVCc6ICAgICAgICdmbG9hdCcsXG4gICdGTE9BVF9WRUMyJzogICd2ZWMyJyxcbiAgJ0ZMT0FUX1ZFQzMnOiAgJ3ZlYzMnLFxuICAnRkxPQVRfVkVDNCc6ICAndmVjNCcsXG4gICdJTlQnOiAgICAgICAgICdpbnQnLFxuICAnSU5UX1ZFQzInOiAgICAnaXZlYzInLFxuICAnSU5UX1ZFQzMnOiAgICAnaXZlYzMnLFxuICAnSU5UX1ZFQzQnOiAgICAnaXZlYzQnLFxuICAnQk9PTCc6ICAgICAgICAnYm9vbCcsXG4gICdCT09MX1ZFQzInOiAgICdidmVjMicsXG4gICdCT09MX1ZFQzMnOiAgICdidmVjMycsXG4gICdCT09MX1ZFQzQnOiAgICdidmVjNCcsXG4gICdGTE9BVF9NQVQyJzogICdtYXQyJyxcbiAgJ0ZMT0FUX01BVDMnOiAgJ21hdDMnLFxuICAnRkxPQVRfTUFUNCc6ICAnbWF0NCcsXG4gICdTQU1QTEVSXzJEJzogICdzYW1wbGVyMkQnLFxuICAnU0FNUExFUl9DVUJFJzonc2FtcGxlckN1YmUnXG59XG5cbnZhciBHTF9UQUJMRSA9IG51bGxcblxuZnVuY3Rpb24gZ2V0VHlwZShnbCwgdHlwZSkge1xuICBpZighR0xfVEFCTEUpIHtcbiAgICB2YXIgdHlwZU5hbWVzID0gT2JqZWN0LmtleXMoR0xfVE9fR0xTTF9UWVBFUylcbiAgICBHTF9UQUJMRSA9IHt9XG4gICAgZm9yKHZhciBpPTA7IGk8dHlwZU5hbWVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgdG4gPSB0eXBlTmFtZXNbaV1cbiAgICAgIEdMX1RBQkxFW2dsW3RuXV0gPSBHTF9UT19HTFNMX1RZUEVTW3RuXVxuICAgIH1cbiAgfVxuICByZXR1cm4gR0xfVEFCTEVbdHlwZV1cbn1cblxuZnVuY3Rpb24gcnVudGltZVVuaWZvcm1zKGdsLCBwcm9ncmFtKSB7XG4gIHZhciBudW1Vbmlmb3JtcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX1VOSUZPUk1TKVxuICB2YXIgcmVzdWx0ID0gW11cbiAgZm9yKHZhciBpPTA7IGk8bnVtVW5pZm9ybXM7ICsraSkge1xuICAgIHZhciBpbmZvID0gZ2wuZ2V0QWN0aXZlVW5pZm9ybShwcm9ncmFtLCBpKVxuICAgIGlmKGluZm8pIHtcbiAgICAgIHZhciB0eXBlID0gZ2V0VHlwZShnbCwgaW5mby50eXBlKVxuICAgICAgaWYoaW5mby5zaXplID4gMSkge1xuICAgICAgICBmb3IodmFyIGo9MDsgajxpbmZvLnNpemU7ICsraikge1xuICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgIG5hbWU6IGluZm8ubmFtZS5yZXBsYWNlKCdbMF0nLCAnWycgKyBqICsgJ10nKSxcbiAgICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgbmFtZTogaW5mby5uYW1lLFxuICAgICAgICAgIHR5cGU6IHR5cGVcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBydW50aW1lQXR0cmlidXRlcyhnbCwgcHJvZ3JhbSkge1xuICB2YXIgbnVtQXR0cmlidXRlcyA9IGdsLmdldFByb2dyYW1QYXJhbWV0ZXIocHJvZ3JhbSwgZ2wuQUNUSVZFX0FUVFJJQlVURVMpXG4gIHZhciByZXN1bHQgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxudW1BdHRyaWJ1dGVzOyArK2kpIHtcbiAgICB2YXIgaW5mbyA9IGdsLmdldEFjdGl2ZUF0dHJpYihwcm9ncmFtLCBpKVxuICAgIGlmKGluZm8pIHtcbiAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgbmFtZTogaW5mby5uYW1lLFxuICAgICAgICB0eXBlOiBnZXRUeXBlKGdsLCBpbmZvLnR5cGUpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3J1bnRpbWUtcmVmbGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gMzVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgc3RhdGVSZXNldCA9IHJlcXVpcmUoJy4vc3RhdGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlc2V0XG5tb2R1bGUuZXhwb3J0cy5zdGF0ZSA9IHN0YXRlUmVzZXRcblxuZnVuY3Rpb24gUmVzZXQoZ2wpIHtcbiAgdmFyIGNsZWFudXAgPSBbXG4gICAgJ0J1ZmZlcidcbiAgLCAnRnJhbWVidWZmZXInXG4gICwgJ1JlbmRlcmJ1ZmZlcidcbiAgLCAnUHJvZ3JhbSdcbiAgLCAnU2hhZGVyJ1xuICAsICdUZXh0dXJlJ1xuICBdLm1hcChmdW5jdGlvbihzdWZmaXgpIHtcbiAgICB2YXIgcmVtb3ZlICAgPSAnZGVsZXRlJyArIHN1ZmZpeFxuICAgIHZhciBjcmVhdGUgICA9ICdjcmVhdGUnICsgc3VmZml4XG4gICAgdmFyIG9yaWdpbmFsID0gZ2xbY3JlYXRlXVxuICAgIHZhciBoYW5kbGVzICA9IFtdXG5cbiAgICBnbFtjcmVhdGVdID0gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaGFuZGxlID0gb3JpZ2luYWwuYXBwbHkodGhpcywgYXJndW1lbnRzKVxuICAgICAgaGFuZGxlcy5wdXNoKGhhbmRsZSlcbiAgICAgIHJldHVybiBoYW5kbGVcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICByZW1vdmU6IHJlbW92ZVxuICAgICAgLCBoYW5kbGVzOiBoYW5kbGVzXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBmdW5jdGlvbiByZXNldCgpIHtcbiAgICBjbGVhbnVwLmZvckVhY2goZnVuY3Rpb24oa2luZCkge1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBraW5kLmhhbmRsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ2xba2luZC5yZW1vdmVdLmNhbGwoZ2wsIGtpbmQuaGFuZGxlc1tpXSlcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgc3RhdGVSZXNldChnbClcblxuICAgIHJldHVybiBnbFxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1yZXNldC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvL1xuLy8gVGhlIGNvZGUgdGhhdCBmb2xsb3dzIHdhcyBvcmlnaW5hbGx5IHNvdXJjZWQgZnJvbTpcbi8vIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3Nkay9kZWJ1Zy93ZWJnbC1kZWJ1Zy5qc1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZVJlc2V0XG5cbi8qXG4qKiBDb3B5cmlnaHQgKGMpIDIwMTIgVGhlIEtocm9ub3MgR3JvdXAgSW5jLlxuKipcbioqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4qKiBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kL29yIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4qKiBcIk1hdGVyaWFsc1wiKSwgdG8gZGVhbCBpbiB0aGUgTWF0ZXJpYWxzIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuKiogd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuKiogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBNYXRlcmlhbHMsIGFuZCB0b1xuKiogcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgTWF0ZXJpYWxzIGFyZSBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbioqIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbioqXG4qKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuKiogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgTWF0ZXJpYWxzLlxuKipcbioqIFRIRSBNQVRFUklBTFMgQVJFIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbioqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuKiogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuKiogSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbioqIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG4qKiBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuKiogTUFURVJJQUxTIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIE1BVEVSSUFMUy5cbiovXG5mdW5jdGlvbiBzdGF0ZVJlc2V0KGdsKSB7XG4gIHZhciBudW1BdHRyaWJzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfQVRUUklCUylcbiAgdmFyIHRtcCA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0bXApXG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBudW1BdHRyaWJzOyArK2lpKSB7XG4gICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGlpKVxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoaWksIDQsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpaSwgMClcbiAgfVxuICBnbC5kZWxldGVCdWZmZXIodG1wKVxuXG4gIHZhciBudW1UZXh0dXJlVW5pdHMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMpXG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBudW1UZXh0dXJlVW5pdHM7ICsraWkpIHtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgaWkpXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgbnVsbClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKVxuICB9XG5cbiAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgZ2wudXNlUHJvZ3JhbShudWxsKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbClcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgbnVsbClcbiAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpXG4gIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVClcbiAgZ2wuZGlzYWJsZShnbC5ESVRIRVIpXG4gIGdsLmRpc2FibGUoZ2wuU0NJU1NPUl9URVNUKVxuICBnbC5ibGVuZENvbG9yKDAsIDAsIDAsIDApXG4gIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpXG4gIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLlpFUk8pXG4gIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMClcbiAgZ2wuY2xlYXJEZXB0aCgxKVxuICBnbC5jbGVhclN0ZW5jaWwoLTEpXG4gIGdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICBnbC5jdWxsRmFjZShnbC5CQUNLKVxuICBnbC5kZXB0aEZ1bmMoZ2wuTEVTUylcbiAgZ2wuZGVwdGhNYXNrKHRydWUpXG4gIGdsLmRlcHRoUmFuZ2UoMCwgMSlcbiAgZ2wuZnJvbnRGYWNlKGdsLkNDVylcbiAgZ2wuaGludChnbC5HRU5FUkFURV9NSVBNQVBfSElOVCwgZ2wuRE9OVF9DQVJFKVxuICBnbC5saW5lV2lkdGgoMSlcbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuUEFDS19BTElHTk1FTlQsIDQpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19BTElHTk1FTlQsIDQpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIGZhbHNlKVxuICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wsIGZhbHNlKVxuICBnbC5wb2x5Z29uT2Zmc2V0KDAsIDApXG4gIGdsLnNhbXBsZUNvdmVyYWdlKDEsIGZhbHNlKVxuICBnbC5zY2lzc29yKDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodClcbiAgZ2wuc3RlbmNpbEZ1bmMoZ2wuQUxXQVlTLCAwLCAweEZGRkZGRkZGKVxuICBnbC5zdGVuY2lsTWFzaygweEZGRkZGRkZGKVxuICBnbC5zdGVuY2lsT3AoZ2wuS0VFUCwgZ2wuS0VFUCwgZ2wuS0VFUClcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLlNURU5DSUxfQlVGRkVSX0JJVClcblxuICByZXR1cm4gZ2xcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L3N0YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID1cbiAgZ2xvYmFsLnBlcmZvcm1hbmNlICYmXG4gIGdsb2JhbC5wZXJmb3JtYW5jZS5ub3cgPyBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuIHBlcmZvcm1hbmNlLm5vdygpXG4gIH0gOiBEYXRlLm5vdyB8fCBmdW5jdGlvbiBub3coKSB7XG4gICAgcmV0dXJuICtuZXcgRGF0ZVxuICB9XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yaWdodC1ub3cvYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMzhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxudmFyIHdlYWtNYXAgICAgICA9IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ3dlYWstbWFwJykgOiBXZWFrTWFwXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVWQU8gICAgPSByZXF1aXJlKCdnbC12YW8nKVxuXG52YXIgVHJpYW5nbGVDYWNoZSA9IG5ldyB3ZWFrTWFwKClcblxuZnVuY3Rpb24gY3JlYXRlQUJpZ1RyaWFuZ2xlKGdsKSB7XG5cbiAgdmFyIHRyaWFuZ2xlVkFPID0gVHJpYW5nbGVDYWNoZS5nZXQoZ2wpXG4gIHZhciBoYW5kbGUgPSB0cmlhbmdsZVZBTyAmJiAodHJpYW5nbGVWQU8uX3RyaWFuZ2xlQnVmZmVyLmhhbmRsZSB8fCB0cmlhbmdsZVZBTy5fdHJpYW5nbGVCdWZmZXIuYnVmZmVyKVxuICBpZighaGFuZGxlIHx8ICFnbC5pc0J1ZmZlcihoYW5kbGUpKSB7XG4gICAgdmFyIGJ1ZiA9IGNyZWF0ZUJ1ZmZlcihnbCwgbmV3IEZsb2F0MzJBcnJheShbLTEsIC0xLCAtMSwgNCwgNCwgLTFdKSlcbiAgICB0cmlhbmdsZVZBTyA9IGNyZWF0ZVZBTyhnbCwgW1xuICAgICAgeyBidWZmZXI6IGJ1ZixcbiAgICAgICAgdHlwZTogZ2wuRkxPQVQsXG4gICAgICAgIHNpemU6IDJcbiAgICAgIH1cbiAgICBdKVxuICAgIHRyaWFuZ2xlVkFPLl90cmlhbmdsZUJ1ZmZlciA9IGJ1ZlxuICAgIFRyaWFuZ2xlQ2FjaGUuc2V0KGdsLCB0cmlhbmdsZVZBTylcbiAgfVxuICB0cmlhbmdsZVZBTy5iaW5kKClcbiAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIDAsIDMpXG4gIHRyaWFuZ2xlVkFPLnVuYmluZCgpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQUJpZ1RyaWFuZ2xlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hLWJpZy10cmlhbmdsZS90cmlhbmdsZS5qc1xuLy8gbW9kdWxlIGlkID0gMzlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvLyBDb3B5cmlnaHQgKEMpIDIwMTEgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEluc3RhbGwgYSBsZWFreSBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgdGhhdFxuICogZG9uJ3QgcHJvdmlkZSBhIGJ1aWx0LWluIG9uZS5cbiAqXG4gKiA8cD5Bc3N1bWVzIHRoYXQgYW4gRVM1IHBsYXRmb3JtIHdoZXJlLCBpZiB7QGNvZGUgV2Vha01hcH0gaXNcbiAqIGFscmVhZHkgcHJlc2VudCwgdGhlbiBpdCBjb25mb3JtcyB0byB0aGUgYW50aWNpcGF0ZWQgRVM2XG4gKiBzcGVjaWZpY2F0aW9uLiBUbyBydW4gdGhpcyBmaWxlIG9uIGFuIEVTNSBvciBhbG1vc3QgRVM1XG4gKiBpbXBsZW1lbnRhdGlvbiB3aGVyZSB0aGUge0Bjb2RlIFdlYWtNYXB9IHNwZWNpZmljYXRpb24gZG9lcyBub3RcbiAqIHF1aXRlIGNvbmZvcm0sIHJ1biA8Y29kZT5yZXBhaXJFUzUuanM8L2NvZGU+IGZpcnN0LlxuICpcbiAqIDxwPkV2ZW4gdGhvdWdoIFdlYWtNYXBNb2R1bGUgaXMgbm90IGdsb2JhbCwgdGhlIGxpbnRlciB0aGlua3MgaXRcbiAqIGlzLCB3aGljaCBpcyB3aHkgaXQgaXMgaW4gdGhlIG92ZXJyaWRlcyBsaXN0IGJlbG93LlxuICpcbiAqIDxwPk5PVEU6IEJlZm9yZSB1c2luZyB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGluIGEgbm9uLVNFU1xuICogZW52aXJvbm1lbnQsIHNlZSB0aGUgbm90ZSBiZWxvdyBhYm91dCBoaWRkZW5SZWNvcmQuXG4gKlxuICogQGF1dGhvciBNYXJrIFMuIE1pbGxlclxuICogQHJlcXVpcmVzIGNyeXB0bywgQXJyYXlCdWZmZXIsIFVpbnQ4QXJyYXksIG5hdmlnYXRvciwgY29uc29sZVxuICogQG92ZXJyaWRlcyBXZWFrTWFwLCBzZXMsIFByb3h5XG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXBNb2R1bGVcbiAqL1xuXG4vKipcbiAqIFRoaXMge0Bjb2RlIFdlYWtNYXB9IGVtdWxhdGlvbiBpcyBvYnNlcnZhYmx5IGVxdWl2YWxlbnQgdG8gdGhlXG4gKiBFUy1IYXJtb255IFdlYWtNYXAsIGJ1dCB3aXRoIGxlYWtpZXIgZ2FyYmFnZSBjb2xsZWN0aW9uIHByb3BlcnRpZXMuXG4gKlxuICogPHA+QXMgd2l0aCB0cnVlIFdlYWtNYXBzLCBpbiB0aGlzIGVtdWxhdGlvbiwgYSBrZXkgZG9lcyBub3RcbiAqIHJldGFpbiBtYXBzIGluZGV4ZWQgYnkgdGhhdCBrZXkgYW5kIChjcnVjaWFsbHkpIGEgbWFwIGRvZXMgbm90XG4gKiByZXRhaW4gdGhlIGtleXMgaXQgaW5kZXhlcy4gQSBtYXAgYnkgaXRzZWxmIGFsc28gZG9lcyBub3QgcmV0YWluXG4gKiB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IG1hcC5cbiAqXG4gKiA8cD5Ib3dldmVyLCB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIGtleSBpbiBzb21lIG1hcCBhcmVcbiAqIHJldGFpbmVkIHNvIGxvbmcgYXMgdGhhdCBrZXkgaXMgcmV0YWluZWQgYW5kIHRob3NlIGFzc29jaWF0aW9ucyBhcmVcbiAqIG5vdCBvdmVycmlkZGVuLiBGb3IgZXhhbXBsZSwgd2hlbiB1c2VkIHRvIHN1cHBvcnQgbWVtYnJhbmVzLCBhbGxcbiAqIHZhbHVlcyBleHBvcnRlZCBmcm9tIGEgZ2l2ZW4gbWVtYnJhbmUgd2lsbCBsaXZlIGZvciB0aGUgbGlmZXRpbWVcbiAqIHRoZXkgd291bGQgaGF2ZSBoYWQgaW4gdGhlIGFic2VuY2Ugb2YgYW4gaW50ZXJwb3NlZCBtZW1icmFuZS4gRXZlblxuICogd2hlbiB0aGUgbWVtYnJhbmUgaXMgcmV2b2tlZCwgYWxsIG9iamVjdHMgdGhhdCB3b3VsZCBoYXZlIGJlZW5cbiAqIHJlYWNoYWJsZSBpbiB0aGUgYWJzZW5jZSBvZiByZXZvY2F0aW9uIHdpbGwgc3RpbGwgYmUgcmVhY2hhYmxlLCBhc1xuICogZmFyIGFzIHRoZSBHQyBjYW4gdGVsbCwgZXZlbiB0aG91Z2ggdGhleSB3aWxsIG5vIGxvbmdlciBiZSByZWxldmFudFxuICogdG8gb25nb2luZyBjb21wdXRhdGlvbi5cbiAqXG4gKiA8cD5UaGUgQVBJIGltcGxlbWVudGVkIGhlcmUgaXMgYXBwcm94aW1hdGVseSB0aGUgQVBJIGFzIGltcGxlbWVudGVkXG4gKiBpbiBGRjYuMGExIGFuZCBhZ3JlZWQgdG8gYnkgTWFya00sIEFuZHJlYXMgR2FsLCBhbmQgRGF2ZSBIZXJtYW4sXG4gKiByYXRoZXIgdGhhbiB0aGUgb2ZmaWFsbHkgYXBwcm92ZWQgcHJvcG9zYWwgcGFnZS4gVE9ETyhlcmlnaHRzKTpcbiAqIHVwZ3JhZGUgdGhlIGVjbWFzY3JpcHQgV2Vha01hcCBwcm9wb3NhbCBwYWdlIHRvIGV4cGxhaW4gdGhpcyBBUElcbiAqIGNoYW5nZSBhbmQgcHJlc2VudCB0byBFY21hU2NyaXB0IGNvbW1pdHRlZSBmb3IgdGhlaXIgYXBwcm92YWwuXG4gKlxuICogPHA+VGhlIGZpcnN0IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZW11bGF0aW9uIGhlcmUgYW5kIHRoYXQgaW5cbiAqIEZGNi4wYTEgaXMgdGhlIHByZXNlbmNlIG9mIG5vbiBlbnVtZXJhYmxlIHtAY29kZSBnZXRfX18sIGhhc19fXyxcbiAqIHNldF9fXywgYW5kIGRlbGV0ZV9fX30gbWV0aG9kcyBvbiBXZWFrTWFwIGluc3RhbmNlcyB0byByZXByZXNlbnRcbiAqIHdoYXQgd291bGQgYmUgdGhlIGhpZGRlbiBpbnRlcm5hbCBwcm9wZXJ0aWVzIG9mIGEgcHJpbWl0aXZlXG4gKiBpbXBsZW1lbnRhdGlvbi4gV2hlcmVhcyB0aGUgRkY2LjBhMSBXZWFrTWFwLnByb3RvdHlwZSBtZXRob2RzXG4gKiByZXF1aXJlIHRoZWlyIHtAY29kZSB0aGlzfSB0byBiZSBhIGdlbnVpbmUgV2Vha01hcCBpbnN0YW5jZSAoaS5lLixcbiAqIGFuIG9iamVjdCBvZiB7QGNvZGUgW1tDbGFzc11dfSBcIldlYWtNYXB9KSwgc2luY2UgdGhlcmUgaXMgbm90aGluZ1xuICogdW5mb3JnZWFibGUgYWJvdXQgdGhlIHBzZXVkby1pbnRlcm5hbCBtZXRob2QgbmFtZXMgdXNlZCBoZXJlLFxuICogbm90aGluZyBwcmV2ZW50cyB0aGVzZSBlbXVsYXRlZCBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIGJlaW5nXG4gKiBhcHBsaWVkIHRvIG5vbi1XZWFrTWFwcyB3aXRoIHBzZXVkby1pbnRlcm5hbCBtZXRob2RzIG9mIHRoZSBzYW1lXG4gKiBuYW1lcy5cbiAqXG4gKiA8cD5Bbm90aGVyIGRpZmZlcmVuY2UgaXMgdGhhdCBvdXIgZW11bGF0ZWQge0Bjb2RlXG4gKiBXZWFrTWFwLnByb3RvdHlwZX0gaXMgbm90IGl0c2VsZiBhIFdlYWtNYXAuIEEgcHJvYmxlbSB3aXRoIHRoZVxuICogY3VycmVudCBGRjYuMGExIEFQSSBpcyB0aGF0IFdlYWtNYXAucHJvdG90eXBlIGlzIGl0c2VsZiBhIFdlYWtNYXBcbiAqIHByb3ZpZGluZyBhbWJpZW50IG11dGFiaWxpdHkgYW5kIGFuIGFtYmllbnQgY29tbXVuaWNhdGlvbnNcbiAqIGNoYW5uZWwuIFRodXMsIGlmIGEgV2Vha01hcCBpcyBhbHJlYWR5IHByZXNlbnQgYW5kIGhhcyB0aGlzXG4gKiBwcm9ibGVtLCByZXBhaXJFUzUuanMgd3JhcHMgaXQgaW4gYSBzYWZlIHdyYXBwcGVyIGluIG9yZGVyIHRvXG4gKiBwcmV2ZW50IGFjY2VzcyB0byB0aGlzIGNoYW5uZWwuIChTZWVcbiAqIFBBVENIX01VVEFCTEVfRlJPWkVOX1dFQUtNQVBfUFJPVE8gaW4gcmVwYWlyRVM1LmpzKS5cbiAqL1xuXG4vKipcbiAqIElmIHRoaXMgaXMgYSBmdWxsIDxhIGhyZWY9XG4gKiBcImh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9lcy1sYWIvd2lraS9TZWN1cmVhYmxlRVM1XCJcbiAqID5zZWN1cmVhYmxlIEVTNTwvYT4gcGxhdGZvcm0gYW5kIHRoZSBFUy1IYXJtb255IHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWJzZW50LCBpbnN0YWxsIGFuIGFwcHJveGltYXRlIGVtdWxhdGlvbi5cbiAqXG4gKiA8cD5JZiBXZWFrTWFwIGlzIHByZXNlbnQgYnV0IGNhbm5vdCBzdG9yZSBzb21lIG9iamVjdHMsIHVzZSBvdXIgYXBwcm94aW1hdGVcbiAqIGVtdWxhdGlvbiBhcyBhIHdyYXBwZXIuXG4gKlxuICogPHA+SWYgdGhpcyBpcyBhbG1vc3QgYSBzZWN1cmVhYmxlIEVTNSBwbGF0Zm9ybSwgdGhlbiBXZWFrTWFwLmpzXG4gKiBzaG91bGQgYmUgcnVuIGFmdGVyIHJlcGFpckVTNS5qcy5cbiAqXG4gKiA8cD5TZWUge0Bjb2RlIFdlYWtNYXB9IGZvciBkb2N1bWVudGF0aW9uIG9mIHRoZSBnYXJiYWdlIGNvbGxlY3Rpb25cbiAqIHByb3BlcnRpZXMgb2YgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbi5cbiAqL1xuKGZ1bmN0aW9uIFdlYWtNYXBNb2R1bGUoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJyAmJiBzZXMub2sgJiYgIXNlcy5vaygpKSB7XG4gICAgLy8gYWxyZWFkeSB0b28gYnJva2VuLCBzbyBnaXZlIHVwXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHNvbWUgY2FzZXMgKGN1cnJlbnQgRmlyZWZveCksIHdlIG11c3QgbWFrZSBhIGNob2ljZSBiZXR3ZWVlbiBhXG4gICAqIFdlYWtNYXAgd2hpY2ggaXMgY2FwYWJsZSBvZiB1c2luZyBhbGwgdmFyaWV0aWVzIG9mIGhvc3Qgb2JqZWN0cyBhc1xuICAgKiBrZXlzIGFuZCBvbmUgd2hpY2ggaXMgY2FwYWJsZSBvZiBzYWZlbHkgdXNpbmcgcHJveGllcyBhcyBrZXlzLiBTZWVcbiAgICogY29tbWVudHMgYmVsb3cgYWJvdXQgSG9zdFdlYWtNYXAgYW5kIERvdWJsZVdlYWtNYXAgZm9yIGRldGFpbHMuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gKHdoaWNoIGlzIGEgZ2xvYmFsLCBub3QgZXhwb3NlZCB0byBndWVzdHMpIG1hcmtzIGFcbiAgICogV2Vha01hcCBhcyBwZXJtaXR0ZWQgdG8gZG8gd2hhdCBpcyBuZWNlc3NhcnkgdG8gaW5kZXggYWxsIGhvc3RcbiAgICogb2JqZWN0cywgYXQgdGhlIGNvc3Qgb2YgbWFraW5nIGl0IHVuc2FmZSBmb3IgcHJveGllcy5cbiAgICpcbiAgICogRG8gbm90IGFwcGx5IHRoaXMgZnVuY3Rpb24gdG8gYW55dGhpbmcgd2hpY2ggaXMgbm90IGEgZ2VudWluZVxuICAgKiBmcmVzaCBXZWFrTWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gd2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKG1hcCkge1xuICAgIC8vIGlkZW50aXR5IG9mIGZ1bmN0aW9uIHVzZWQgYXMgYSBzZWNyZXQgLS0gZ29vZCBlbm91Z2ggYW5kIGNoZWFwXG4gICAgaWYgKG1hcC5wZXJtaXRIb3N0T2JqZWN0c19fXykge1xuICAgICAgbWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNlcy53ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMgPSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHM7XG4gIH1cblxuICAvLyBJRSAxMSBoYXMgbm8gUHJveHkgYnV0IGhhcyBhIGJyb2tlbiBXZWFrTWFwIHN1Y2ggdGhhdCB3ZSBuZWVkIHRvIHBhdGNoXG4gIC8vIGl0IHVzaW5nIERvdWJsZVdlYWtNYXA7IHRoaXMgZmxhZyB0ZWxscyBEb3VibGVXZWFrTWFwIHNvLlxuICB2YXIgZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSA9IGZhbHNlO1xuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBnb29kLWVub3VnaCBXZWFrTWFwIGltcGxlbWVudGF0aW9uLCBhbmQgaWYgc29cbiAgLy8gZXhpdCB3aXRob3V0IHJlcGxhY2luZyBpdC5cbiAgaWYgKHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIEhvc3RXZWFrTWFwID0gV2Vha01hcDtcbiAgICAvLyBUaGVyZSBpcyBhIFdlYWtNYXAgLS0gaXMgaXQgZ29vZCBlbm91Z2g/XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIC9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAvLyBXZSdyZSBub3cgKmFzc3VtaW5nIG5vdCosIGJlY2F1c2UgYXMgb2YgdGhpcyB3cml0aW5nICgyMDEzLTA1LTA2KVxuICAgICAgLy8gRmlyZWZveCdzIFdlYWtNYXBzIGhhdmUgYSBtaXNjZWxsYW55IG9mIG9iamVjdHMgdGhleSB3b24ndCBhY2NlcHQsIGFuZFxuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBtYWtlIGFuIGV4aGF1c3RpdmUgbGlzdCwgYW5kIHRlc3RpbmcgZm9yIGp1c3Qgb25lXG4gICAgICAvLyB3aWxsIGJlIGEgcHJvYmxlbSBpZiB0aGF0IG9uZSBpcyBmaXhlZCBhbG9uZSAoYXMgdGhleSBkaWQgZm9yIEV2ZW50KS5cblxuICAgICAgLy8gSWYgdGhlcmUgaXMgYSBwbGF0Zm9ybSB0aGF0IHdlICpjYW4qIHJlbGlhYmx5IHRlc3Qgb24sIGhlcmUncyBob3cgdG9cbiAgICAgIC8vIGRvIGl0OlxuICAgICAgLy8gIHZhciBwcm9ibGVtYXRpYyA9IC4uLiA7XG4gICAgICAvLyAgdmFyIHRlc3RIb3N0TWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG4gICAgICAvLyAgdHJ5IHtcbiAgICAgIC8vICAgIHRlc3RIb3N0TWFwLnNldChwcm9ibGVtYXRpYywgMSk7ICAvLyBGaXJlZm94IDIwIHdpbGwgdGhyb3cgaGVyZVxuICAgICAgLy8gICAgaWYgKHRlc3RIb3N0TWFwLmdldChwcm9ibGVtYXRpYykgPT09IDEpIHtcbiAgICAgIC8vICAgICAgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgMTEgYnVnOiBXZWFrTWFwcyBzaWxlbnRseSBmYWlsIHRvIHN0b3JlIGZyb3plbiBvYmplY3RzLlxuICAgICAgdmFyIHRlc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIHZhciB0ZXN0T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAgICB0ZXN0TWFwLnNldCh0ZXN0T2JqZWN0LCAxKTtcbiAgICAgIGlmICh0ZXN0TWFwLmdldCh0ZXN0T2JqZWN0KSAhPT0gMSkge1xuICAgICAgICBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gdHJ1ZTtcbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGluc3RhbGxpbmcgb3VyIFdlYWtNYXAuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaG9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGdvcG4gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyIGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gIHZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4gIC8qKlxuICAgKiBTZWN1cml0eSBkZXBlbmRzIG9uIEhJRERFTl9OQU1FIGJlaW5nIGJvdGggPGk+dW5ndWVzc2FibGU8L2k+IGFuZFxuICAgKiA8aT51bmRpc2NvdmVyYWJsZTwvaT4gYnkgdW50cnVzdGVkIGNvZGUuXG4gICAqXG4gICAqIDxwPkdpdmVuIHRoZSBrbm93biB3ZWFrbmVzc2VzIG9mIE1hdGgucmFuZG9tKCkgb24gZXhpc3RpbmdcbiAgICogYnJvd3NlcnMsIGl0IGRvZXMgbm90IGdlbmVyYXRlIHVuZ3Vlc3NhYmlsaXR5IHdlIGNhbiBiZSBjb25maWRlbnRcbiAgICogb2YuXG4gICAqXG4gICAqIDxwPkl0IGlzIHRoZSBtb25rZXkgcGF0Y2hpbmcgbG9naWMgaW4gdGhpcyBmaWxlIHRoYXQgaXMgaW50ZW5kZWRcbiAgICogdG8gZW5zdXJlIHVuZGlzY292ZXJhYmlsaXR5LiBUaGUgYmFzaWMgaWRlYSBpcyB0aGF0IHRoZXJlIGFyZVxuICAgKiB0aHJlZSBmdW5kYW1lbnRhbCBtZWFucyBvZiBkaXNjb3ZlcmluZyBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdDpcbiAgICogVGhlIGZvci9pbiBsb29wLCBPYmplY3Qua2V5cygpLCBhbmQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoKSxcbiAgICogYXMgd2VsbCBhcyBzb21lIHByb3Bvc2VkIEVTNiBleHRlbnNpb25zIHRoYXQgYXBwZWFyIG9uIG91clxuICAgKiB3aGl0ZWxpc3QuIFRoZSBmaXJzdCB0d28gb25seSBkaXNjb3ZlciBlbnVtZXJhYmxlIHByb3BlcnRpZXMsIGFuZFxuICAgKiB3ZSBvbmx5IHVzZSBISURERU5fTkFNRSB0byBuYW1lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHksIHNvIHRoZVxuICAgKiBvbmx5IHJlbWFpbmluZyB0aHJlYXQgc2hvdWxkIGJlIGdldE93blByb3BlcnR5TmFtZXMgYW5kIHNvbWVcbiAgICogcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyIHdoaXRlbGlzdC4gV2UgbW9ua2V5XG4gICAqIHBhdGNoIHRoZW0gdG8gcmVtb3ZlIEhJRERFTl9OQU1FIGZyb20gdGhlIGxpc3Qgb2YgcHJvcGVydGllcyB0aGV5XG4gICAqIHJldHVybnMuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IE9uIGEgcGxhdGZvcm0gd2l0aCBidWlsdC1pbiBQcm94aWVzLCBwcm94aWVzXG4gICAqIGNvdWxkIGJlIHVzZWQgdG8gdHJhcCBhbmQgdGhlcmVieSBkaXNjb3ZlciB0aGUgSElEREVOX05BTUUsIHNvIHdlXG4gICAqIG5lZWQgdG8gbW9ua2V5IHBhdGNoIFByb3h5LmNyZWF0ZSwgUHJveHkuY3JlYXRlRnVuY3Rpb24sIGV0YywgaW5cbiAgICogb3JkZXIgdG8gd3JhcCB0aGUgcHJvdmlkZWQgaGFuZGxlciB3aXRoIHRoZSByZWFsIGhhbmRsZXIgd2hpY2hcbiAgICogZmlsdGVycyBvdXQgYWxsIHRyYXBzIHVzaW5nIEhJRERFTl9OQU1FLlxuICAgKlxuICAgKiA8cD5UT0RPKGVyaWdodHMpOiBSZXZpc2l0IE1pa2UgU3RheSdzIHN1Z2dlc3Rpb24gdGhhdCB3ZSB1c2UgYW5cbiAgICogZW5jYXBzdWxhdGVkIGZ1bmN0aW9uIGF0IGEgbm90LW5lY2Vzc2FyaWx5LXNlY3JldCBuYW1lLCB3aGljaFxuICAgKiB1c2VzIHRoZSBTdGllZ2xlciBzaGFyZWQtc3RhdGUgcmlnaHRzIGFtcGxpZmljYXRpb24gcGF0dGVybiB0b1xuICAgKiByZXZlYWwgdGhlIGFzc29jaWF0ZWQgdmFsdWUgb25seSB0byB0aGUgV2Vha01hcCBpbiB3aGljaCB0aGlzIGtleVxuICAgKiBpcyBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZS4gU2luY2Ugb25seSB0aGUga2V5IHJldGFpbnMgdGhlXG4gICAqIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gY2FuIGFsc28gcmVtZW1iZXIgdGhlIGtleSB3aXRob3V0IGNhdXNpbmdcbiAgICogbGVha2FnZSBvZiB0aGUga2V5LCBzbyB0aGlzIGRvZXNuJ3QgdmlvbGF0ZSBvdXIgZ2VuZXJhbCBnY1xuICAgKiBnb2Fscy4gSW4gYWRkaXRpb24sIGJlY2F1c2UgdGhlIG5hbWUgbmVlZCBub3QgYmUgYSBndWFyZGVkXG4gICAqIHNlY3JldCwgd2UgY291bGQgZWZmaWNpZW50bHkgaGFuZGxlIGNyb3NzLWZyYW1lIGZyb3plbiBrZXlzLlxuICAgKi9cbiAgdmFyIEhJRERFTl9OQU1FX1BSRUZJWCA9ICd3ZWFrbWFwOic7XG4gIHZhciBISURERU5fTkFNRSA9IEhJRERFTl9OQU1FX1BSRUZJWCArICdpZGVudDonICsgTWF0aC5yYW5kb20oKSArICdfX18nO1xuXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoMjUpO1xuICAgIHZhciB1OHMgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh1OHMpO1xuICAgIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ3JhbmQ6JyArXG4gICAgICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodThzLCBmdW5jdGlvbih1OCkge1xuICAgICAgICByZXR1cm4gKHU4ICUgMzYpLnRvU3RyaW5nKDM2KTtcbiAgICAgIH0pLmpvaW4oJycpICsgJ19fXyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vdEhpZGRlbk5hbWUobmFtZSkge1xuICAgIHJldHVybiAhKFxuICAgICAgICBuYW1lLnN1YnN0cigwLCBISURERU5fTkFNRV9QUkVGSVgubGVuZ3RoKSA9PSBISURERU5fTkFNRV9QUkVGSVggJiZcbiAgICAgICAgbmFtZS5zdWJzdHIobmFtZS5sZW5ndGggLSAzKSA9PT0gJ19fXycpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBnZXRPd25Qcm9wZXJ0eU5hbWVzIHRvIGF2b2lkIHJldmVhbGluZyB0aGVcbiAgICogSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRoZSBFUzUuMSBzcGVjIHJlcXVpcmVzIGVhY2ggbmFtZSB0byBhcHBlYXIgb25seSBvbmNlLCBidXQgYXNcbiAgICogb2YgdGhpcyB3cml0aW5nLCB0aGlzIHJlcXVpcmVtZW50IGlzIGNvbnRyb3ZlcnNpYWwgZm9yIEVTNiwgc28gd2VcbiAgICogbWFkZSB0aGlzIGNvZGUgcm9idXN0IGFnYWluc3QgdGhpcyBjYXNlLiBJZiB0aGUgcmVzdWx0aW5nIGV4dHJhXG4gICAqIHNlYXJjaCB0dXJucyBvdXQgdG8gYmUgZXhwZW5zaXZlLCB3ZSBjYW4gcHJvYmFibHkgcmVsYXggdGhpcyBvbmNlXG4gICAqIEVTNiBpcyBhZGVxdWF0ZWx5IHN1cHBvcnRlZCBvbiBhbGwgbWFqb3IgYnJvd3NlcnMsIGlmZiBubyBicm93c2VyXG4gICAqIHZlcnNpb25zIHdlIHN1cHBvcnQgYXQgdGhhdCB0aW1lIGhhdmUgcmVsYXhlZCB0aGlzIGNvbnN0cmFpbnRcbiAgICogd2l0aG91dCBwcm92aWRpbmcgYnVpbHQtaW4gRVM2IFdlYWtNYXBzLlxuICAgKi9cbiAgZGVmUHJvcChPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0T3duUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgIHJldHVybiBnb3BuKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogZ2V0UHJvcGVydHlOYW1lcyBpcyBub3QgaW4gRVM1IGJ1dCBpdCBpcyBwcm9wb3NlZCBmb3IgRVM2IGFuZFxuICAgKiBkb2VzIGFwcGVhciBpbiBvdXIgd2hpdGVsaXN0LCBzbyB3ZSBuZWVkIHRvIGNsZWFuIGl0IHRvby5cbiAgICovXG4gIGlmICgnZ2V0UHJvcGVydHlOYW1lcycgaW4gT2JqZWN0KSB7XG4gICAgdmFyIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnZ2V0UHJvcGVydHlOYW1lcycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0UHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihpc05vdEhpZGRlbk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIDxwPlRvIHRyZWF0IG9iamVjdHMgYXMgaWRlbnRpdHkta2V5cyB3aXRoIHJlYXNvbmFibGUgZWZmaWNpZW5jeVxuICAgKiBvbiBFUzUgYnkgaXRzZWxmIChpLmUuLCB3aXRob3V0IGFueSBvYmplY3Qta2V5ZWQgY29sbGVjdGlvbnMpLCB3ZVxuICAgKiBuZWVkIHRvIGFkZCBhIGhpZGRlbiBwcm9wZXJ0eSB0byBzdWNoIGtleSBvYmplY3RzIHdoZW4gd2VcbiAgICogY2FuLiBUaGlzIHJhaXNlcyBzZXZlcmFsIGlzc3VlczpcbiAgICogPHVsPlxuICAgKiA8bGk+QXJyYW5naW5nIHRvIGFkZCB0aGlzIHByb3BlcnR5IHRvIG9iamVjdHMgYmVmb3JlIHdlIGxvc2UgdGhlXG4gICAqICAgICBjaGFuY2UsIGFuZFxuICAgKiA8bGk+SGlkaW5nIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBuZXcgcHJvcGVydHkgZnJvbSBtb3N0XG4gICAqICAgICBKYXZhU2NyaXB0IGNvZGUuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPmNlcnRpZmljYXRpb24gdGhlZnQ8L2k+LCB3aGVyZSBvbmUgb2JqZWN0IGlzXG4gICAqICAgICBjcmVhdGVkIGZhbHNlbHkgY2xhaW1pbmcgdG8gYmUgdGhlIGtleSBvZiBhbiBhc3NvY2lhdGlvblxuICAgKiAgICAgYWN0dWFsbHkga2V5ZWQgYnkgYW5vdGhlciBvYmplY3QuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPnZhbHVlIHRoZWZ0PC9pPiwgd2hlcmUgdW50cnVzdGVkIGNvZGUgd2l0aFxuICAgKiAgICAgYWNjZXNzIHRvIGEga2V5IG9iamVjdCBidXQgbm90IGEgd2VhayBtYXAgbmV2ZXJ0aGVsZXNzXG4gICAqICAgICBvYnRhaW5zIGFjY2VzcyB0byB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoYXQga2V5IGluIHRoYXRcbiAgICogICAgIHdlYWsgbWFwLlxuICAgKiA8L3VsPlxuICAgKiBXZSBkbyBzbyBieVxuICAgKiA8dWw+XG4gICAqIDxsaT5NYWtpbmcgdGhlIG5hbWUgb2YgdGhlIGhpZGRlbiBwcm9wZXJ0eSB1bmd1ZXNzYWJsZSwgc28gXCJbXVwiXG4gICAqICAgICBpbmRleGluZywgd2hpY2ggd2UgY2Fubm90IGludGVyY2VwdCwgY2Fubm90IGJlIHVzZWQgdG8gYWNjZXNzXG4gICAqICAgICBhIHByb3BlcnR5IHdpdGhvdXQga25vd2luZyB0aGUgbmFtZS5cbiAgICogPGxpPk1ha2luZyB0aGUgaGlkZGVuIHByb3BlcnR5IG5vbi1lbnVtZXJhYmxlLCBzbyB3ZSBuZWVkIG5vdFxuICAgKiAgICAgd29ycnkgYWJvdXQgZm9yLWluIGxvb3BzIG9yIHtAY29kZSBPYmplY3Qua2V5c30sXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgcmVmbGVjdGl2ZSBtZXRob2RzIHRoYXQgd291bGRcbiAgICogICAgIHByZXZlbnQgZXh0ZW5zaW9ucywgdG8gYWRkIHRoaXMgaGlkZGVuIHByb3BlcnR5IGZpcnN0LFxuICAgKiA8bGk+bW9ua2V5IHBhdGNoaW5nIHRob3NlIG1ldGhvZHMgdGhhdCB3b3VsZCByZXZlYWwgdGhpc1xuICAgKiAgICAgaGlkZGVuIHByb3BlcnR5LlxuICAgKiA8L3VsPlxuICAgKiBVbmZvcnR1bmF0ZWx5LCBiZWNhdXNlIG9mIHNhbWUtb3JpZ2luIGlmcmFtZXMsIHdlIGNhbm5vdCByZWxpYWJseVxuICAgKiBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgYmVmb3JlIGFuIG9iamVjdCBiZWNvbWVzXG4gICAqIG5vbi1leHRlbnNpYmxlLiBJbnN0ZWFkLCBpZiB3ZSBlbmNvdW50ZXIgYSBub24tZXh0ZW5zaWJsZSBvYmplY3RcbiAgICogd2l0aG91dCBhIGhpZGRlbiByZWNvcmQgdGhhdCB3ZSBjYW4gZGV0ZWN0ICh3aGV0aGVyIG9yIG5vdCBpdCBoYXNcbiAgICogYSBoaWRkZW4gcmVjb3JkIHN0b3JlZCB1bmRlciBhIG5hbWUgc2VjcmV0IHRvIHVzKSwgdGhlbiB3ZSBqdXN0XG4gICAqIHVzZSB0aGUga2V5IG9iamVjdCBpdHNlbGYgdG8gcmVwcmVzZW50IGl0cyBpZGVudGl0eSBpbiBhIGJydXRlXG4gICAqIGZvcmNlIGxlYWt5IG1hcCBzdG9yZWQgaW4gdGhlIHdlYWsgbWFwLCBsb3NpbmcgYWxsIHRoZSBhZHZhbnRhZ2VzXG4gICAqIG9mIHdlYWtuZXNzIGZvciB0aGVzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldEhpZGRlblJlY29yZChrZXkpIHtcbiAgICBpZiAoa2V5ICE9PSBPYmplY3Qoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm90IGFuIG9iamVjdDogJyArIGtleSk7XG4gICAgfVxuICAgIHZhciBoaWRkZW5SZWNvcmQgPSBrZXlbSElEREVOX05BTUVdO1xuICAgIGlmIChoaWRkZW5SZWNvcmQgJiYgaGlkZGVuUmVjb3JkLmtleSA9PT0ga2V5KSB7IHJldHVybiBoaWRkZW5SZWNvcmQ7IH1cbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICAvLyBXZWFrIG1hcCBtdXN0IGJydXRlIGZvcmNlLCBhcyBleHBsYWluZWQgaW4gZG9jLWNvbW1lbnQgYWJvdmUuXG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZSBoaWRkZW5SZWNvcmQgYW5kIHRoZSBrZXkgcG9pbnQgZGlyZWN0bHkgYXQgZWFjaCBvdGhlciwgdmlhXG4gICAgLy8gdGhlIFwia2V5XCIgYW5kIEhJRERFTl9OQU1FIHByb3BlcnRpZXMgcmVzcGVjdGl2ZWx5LiBUaGUga2V5XG4gICAgLy8gZmllbGQgaXMgZm9yIHF1aWNrbHkgdmVyaWZ5aW5nIHRoYXQgdGhpcyBoaWRkZW4gcmVjb3JkIGlzIGFuXG4gICAgLy8gb3duIHByb3BlcnR5LCBub3QgYSBoaWRkZW4gcmVjb3JkIGZyb20gdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvL1xuICAgIC8vIE5PVEU6IEJlY2F1c2UgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBpcyBtZWFudCBvbmx5IGZvciBzeXN0ZW1zIGxpa2VcbiAgICAvLyBTRVMgd2hlcmUgT2JqZWN0LnByb3RvdHlwZSBpcyBmcm96ZW4gd2l0aG91dCBhbnkgbnVtZXJpY1xuICAgIC8vIHByb3BlcnRpZXMsIGl0IGlzIG9rIHRvIHVzZSBhbiBvYmplY3QgbGl0ZXJhbCBmb3IgdGhlIGhpZGRlblJlY29yZC5cbiAgICAvLyBUaGlzIGhhcyB0d28gYWR2YW50YWdlczpcbiAgICAvLyAqIEl0IGlzIG11Y2ggZmFzdGVyIGluIGEgcGVyZm9ybWFuY2UgY3JpdGljYWwgcGxhY2VcbiAgICAvLyAqIEl0IGF2b2lkcyByZWx5aW5nIG9uIE9iamVjdC5jcmVhdGUobnVsbCksIHdoaWNoIGhhZCBiZWVuXG4gICAgLy8gICBwcm9ibGVtYXRpYyBvbiBDaHJvbWUgMjguMC4xNDgwLjAuIFNlZVxuICAgIC8vICAgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtY2FqYS9pc3N1ZXMvZGV0YWlsP2lkPTE2ODdcbiAgICBoaWRkZW5SZWNvcmQgPSB7IGtleToga2V5IH07XG5cbiAgICAvLyBXaGVuIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZCBPYmplY3QuY3JlYXRlKG51bGwpIGlzXG4gICAgLy8gcmVsaWFibGUsIHVzZSB0aGUgZm9sbG93aW5nIHR3byBjb21tZW50ZWQgb3V0IGxpbmVzIGluc3RlYWQuXG4gICAgLy8gaGlkZGVuUmVjb3JkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBoaWRkZW5SZWNvcmQua2V5ID0ga2V5O1xuXG4gICAgLy8gUGxlYXNlIGNvbnRhY3QgdXMgaWYgeW91IG5lZWQgdGhpcyB0byB3b3JrIG9uIHBsYXRmb3JtcyB3aGVyZVxuICAgIC8vIE9iamVjdC5wcm90b3R5cGUgbWlnaHQgbm90IGJlIGZyb3plbiBhbmRcbiAgICAvLyBPYmplY3QuY3JlYXRlKG51bGwpIG1pZ2h0IG5vdCBiZSByZWxpYWJsZS5cblxuICAgIHRyeSB7XG4gICAgICBkZWZQcm9wKGtleSwgSElEREVOX05BTUUsIHtcbiAgICAgICAgdmFsdWU6IGhpZGRlblJlY29yZCxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGlkZGVuUmVjb3JkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBVbmRlciBzb21lIGNpcmN1bXN0YW5jZXMsIGlzRXh0ZW5zaWJsZSBzZWVtcyB0byBtaXNyZXBvcnQgd2hldGhlclxuICAgICAgLy8gdGhlIEhJRERFTl9OQU1FIGNhbiBiZSBkZWZpbmVkLlxuICAgICAgLy8gVGhlIGNpcmN1bXN0YW5jZXMgaGF2ZSBub3QgYmVlbiBpc29sYXRlZCwgYnV0IGF0IGxlYXN0IGFmZmVjdFxuICAgICAgLy8gTm9kZS5qcyB2MC4xMC4yNiBvbiBUcmF2aXNDSSAvIExpbnV4LCBidXQgbm90IHRoZSBzYW1lIHZlcnNpb24gb2ZcbiAgICAgIC8vIE5vZGUuanMgb24gT1MgWC5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBvcGVyYXRpb25zIHRoYXQgd291bGQgbWFrZSB0aGVpciBhcmd1bWVudFxuICAgKiBub24tZXh0ZW5zaWJsZS5cbiAgICpcbiAgICogPHA+VGhlIG1vbmtleSBwYXRjaGVkIHZlcnNpb25zIHRocm93IGEgVHlwZUVycm9yIGlmIHRoZWlyXG4gICAqIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QsIHNvIGl0IHNob3VsZCBvbmx5IGJlIGRvbmUgdG8gZnVuY3Rpb25zXG4gICAqIHRoYXQgc2hvdWxkIHRocm93IGEgVHlwZUVycm9yIGFueXdheSBpZiB0aGVpciBhcmd1bWVudCBpcyBub3QgYW5cbiAgICogb2JqZWN0LlxuICAgKi9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIG9sZEZyZWV6ZSA9IE9iamVjdC5mcmVlemU7XG4gICAgZGVmUHJvcChPYmplY3QsICdmcmVlemUnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdGcmVlemUob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkRnJlZXplKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG9sZFNlYWwgPSBPYmplY3Quc2VhbDtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3NlYWwnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdTZWFsKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFNlYWwob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkUHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gICAgZGVmUHJvcChPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1ByZXZlbnRFeHRlbnNpb25zKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFByZXZlbnRFeHRlbnNpb25zKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gY29uc3RGdW5jKGZ1bmMpIHtcbiAgICBmdW5jLnByb3RvdHlwZSA9IG51bGw7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoZnVuYyk7XG4gIH1cblxuICB2YXIgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCkge1xuICAgIC8vIEZ1dHVyZSBFUzYgV2Vha01hcCBpcyBjdXJyZW50bHkgKDIwMTMtMDktMTApIGV4cGVjdGVkIHRvIHJlamVjdCBXZWFrTWFwKClcbiAgICAvLyBidXQgd2UgdXNlZCB0byBwZXJtaXQgaXQgYW5kIGRvIGl0IG91cnNlbHZlcywgc28gd2FybiBvbmx5LlxuICAgIGlmICghY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUud2FybignV2Vha01hcCBzaG91bGQgYmUgaW52b2tlZCBhcyBuZXcgV2Vha01hcCgpLCBub3QgJyArXG4gICAgICAgICAgJ1dlYWtNYXAoKS4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIHRoZSBmdXR1cmUuJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5leHRJZCA9IDA7XG5cbiAgdmFyIE91cldlYWtNYXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgY3VycmVudGx5ICgxMi8yNS8yMDEyKSBuZXZlciBlbmNvdW50ZXJpbmcgYW55IHByZW1hdHVyZWx5XG4gICAgLy8gbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIga2V5cyA9IFtdOyAvLyBicnV0ZSBmb3JjZSBmb3IgcHJlbWF0dXJlbHkgbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIgdmFsdWVzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICB2YXIgaWQgPSBuZXh0SWQrKztcblxuICAgIGZ1bmN0aW9uIGdldF9fXyhrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgPyBoaWRkZW5SZWNvcmRbaWRdIDogb3B0X2RlZmF1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHZhbHVlc1tpbmRleF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNfX18oa2V5KSB7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga2V5cy5pbmRleE9mKGtleSkgPj0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRfX18oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICBoaWRkZW5SZWNvcmRbaWRdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHByZXN1bWFibHkgY29ycnVwdGVkIGhlYXBcbiAgICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW5cbiAgICAgICAgICAvLyB1c2UgaXQgdG8gdXBkYXRlIGJvdGggdGhlIHZhbHVlcyBhbmQga2V5cyBhcnJheXMsIGtlZXBpbmdcbiAgICAgICAgICAvLyB0aGVtIGluIHN5bmMuXG4gICAgICAgICAgaW5kZXggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdmFsdWVzIHdpbGwgYmUgb25lIGxvbmdlciB0aGFuIGtleXMuXG4gICAgICAgICAga2V5c1tpbmRleF0gPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZV9fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIHZhciBpbmRleCwgbGFzdEluZGV4O1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICByZXR1cm4gaWQgaW4gaGlkZGVuUmVjb3JkICYmIGRlbGV0ZSBoaWRkZW5SZWNvcmRbaWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgLy8gdGhlbiBjb250aW51ZSBjb21wdXRpbmcgd2l0aCBwb3RlbnRpYWxseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW4gdXNlXG4gICAgICAgIC8vIGl0IHRvIHVwZGF0ZSBib3RoIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGFycmF5LCBrZWVwaW5nXG4gICAgICAgIC8vIHRoZW0gaW4gc3luYy4gV2UgdXBkYXRlIHRoZSB0d28gd2l0aCBhbiBvcmRlciBvZiBhc3NpZ25tZW50cyxcbiAgICAgICAgLy8gc3VjaCB0aGF0IGFueSBwcmVmaXggb2YgdGhlc2UgYXNzaWdubWVudHMgd2lsbCBwcmVzZXJ2ZSB0aGVcbiAgICAgICAgLy8ga2V5L3ZhbHVlIGNvcnJlc3BvbmRlbmNlLCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSBkZWxldGUuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIG5lZWRzIHRvIHdvcmsgY29ycmVjdGx5IHdoZW4gaW5kZXggPT09IGxhc3RJbmRleC5cbiAgICAgICAgbGFzdEluZGV4ID0ga2V5cy5sZW5ndGggLSAxO1xuICAgICAgICBrZXlzW2luZGV4XSA9IHZvaWQgMDtcbiAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdGhlcmUncyBhIHZvaWQgMCBpbiB0aGUga2V5cyBhcnJheSwgYnV0XG4gICAgICAgIC8vIG5vIG9wZXJhdGlvbiB3aWxsIGNhdXNlIGEgXCJrZXlzLmluZGV4T2Yodm9pZCAwKVwiLCBzaW5jZVxuICAgICAgICAvLyBnZXRIaWRkZW5SZWNvcmQodm9pZCAwKSB3aWxsIGFsd2F5cyB0aHJvdyBhbiBlcnJvciBmaXJzdC5cbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlc1tsYXN0SW5kZXhdO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXNbaW5kZXhdIGNhbm5vdCBiZSBmb3VuZCBoZXJlLFxuICAgICAgICAvLyBiZWNhdXNlIGtleXNbaW5kZXhdIGlzIHZvaWQgMC5cbiAgICAgICAga2V5c1tpbmRleF0gPSBrZXlzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIGluZGV4ID09PSBsYXN0SW5kZXggYW5kIHdlIGNyYXNoIGhlcmUsIHRoZW4ga2V5c1tpbmRleF1cbiAgICAgICAgLy8gaXMgc3RpbGwgdm9pZCAwLCBzaW5jZSB0aGUgYWxpYXNpbmcga2lsbGVkIHRoZSBwcmV2aW91cyBrZXkuXG4gICAgICAgIGtleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCBrZXlzIHdpbGwgYmUgb25lIHNob3J0ZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHZhbHVlcy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICBnZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhnZXRfX18pIH0sXG4gICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhoYXNfX18pIH0sXG4gICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhzZXRfX18pIH0sXG4gICAgICBkZWxldGVfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhkZWxldGVfX18pIH1cbiAgICB9KTtcbiAgfTtcblxuICBPdXJXZWFrTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICAgIGdldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm4gdGhlIHZhbHVlIG1vc3QgcmVjZW50bHkgYXNzb2NpYXRlZCB3aXRoIGtleSwgb3JcbiAgICAgICAqIG9wdF9kZWZhdWx0IGlmIG5vbmUuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoa2V5LCBvcHRfZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgaGFzOiB7XG4gICAgICAvKipcbiAgICAgICAqIElzIHRoZXJlIGEgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXA/XG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc19fXyhrZXkpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIHNldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBBc3NvY2lhdGUgdmFsdWUgd2l0aCBrZXkgaW4gdGhpcyBXZWFrTWFwLCBvdmVyd3JpdGluZyBhbnlcbiAgICAgICAqIHByZXZpb3VzIGFzc29jaWF0aW9uIGlmIHByZXNlbnQuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRfX18oa2V5LCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgJ2RlbGV0ZSc6IHtcbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlIGFueSBhc3NvY2lhdGlvbiBmb3Iga2V5IGluIHRoaXMgV2Vha01hcCwgcmV0dXJuaW5nXG4gICAgICAgKiB3aGV0aGVyIHRoZXJlIHdhcyBvbmUuXG4gICAgICAgKlxuICAgICAgICogPHA+Tm90ZSB0aGF0IHRoZSBib29sZWFuIHJldHVybiBoZXJlIGRvZXMgbm90IHdvcmsgbGlrZSB0aGVcbiAgICAgICAqIHtAY29kZSBkZWxldGV9IG9wZXJhdG9yLiBUaGUge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IgcmV0dXJuc1xuICAgICAgICogd2hldGhlciB0aGUgZGVsZXRpb24gc3VjY2VlZHMgYXQgYnJpbmdpbmcgYWJvdXQgYSBzdGF0ZSBpblxuICAgICAgICogd2hpY2ggdGhlIGRlbGV0ZWQgcHJvcGVydHkgaXMgYWJzZW50LiBUaGUge0Bjb2RlIGRlbGV0ZX1cbiAgICAgICAqIG9wZXJhdG9yIHRoZXJlZm9yZSByZXR1cm5zIHRydWUgaWYgdGhlIHByb3BlcnR5IHdhcyBhbHJlYWR5XG4gICAgICAgKiBhYnNlbnQsIHdoZXJlYXMgdGhpcyB7QGNvZGUgZGVsZXRlfSBtZXRob2QgcmV0dXJucyBmYWxzZSBpZlxuICAgICAgICogdGhlIGFzc29jaWF0aW9uIHdhcyBhbHJlYWR5IGFic2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0eXBlb2YgSG9zdFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgdGhlbiB0aGUgcGxhdGZvcm0gaGFzIGEgV2Vha01hcCBidXQgd2UgYXJlIGNvbmNlcm5lZFxuICAgICAgLy8gdGhhdCBpdCBtYXkgcmVmdXNlIHRvIHN0b3JlIHNvbWUga2V5IHR5cGVzLiBUaGVyZWZvcmUsIG1ha2UgYSBtYXBcbiAgICAgIC8vIGltcGxlbWVudGF0aW9uIHdoaWNoIG1ha2VzIHVzZSBvZiBib3RoIGFzIHBvc3NpYmxlLlxuXG4gICAgICAvLyBJbiB0aGlzIG1vZGUgd2UgYXJlIGFsd2F5cyB1c2luZyBkb3VibGUgbWFwcywgc28gd2UgYXJlIG5vdCBwcm94eS1zYWZlLlxuICAgICAgLy8gVGhpcyBjb21iaW5hdGlvbiBkb2VzIG5vdCBvY2N1ciBpbiBhbnkga25vd24gYnJvd3NlciwgYnV0IHdlIGhhZCBiZXN0XG4gICAgICAvLyBiZSBzYWZlLlxuICAgICAgaWYgKGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgJiYgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gRG91YmxlV2Vha01hcCgpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE91cldlYWtNYXApKSB7ICAvLyBhcHByb3hpbWF0ZSB0ZXN0IGZvciBuZXcgLi4uKClcbiAgICAgICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJlZmVyYWJsZSwgdHJ1bHkgd2VhayBtYXAuXG4gICAgICAgIHZhciBobWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG5cbiAgICAgICAgLy8gT3VyIGhpZGRlbi1wcm9wZXJ0eS1iYXNlZCBwc2V1ZG8td2Vhay1tYXAuIExhemlseSBpbml0aWFsaXplZCBpbiB0aGVcbiAgICAgICAgLy8gJ3NldCcgaW1wbGVtZW50YXRpb247IHRodXMgd2UgY2FuIGF2b2lkIHBlcmZvcm1pbmcgZXh0cmEgbG9va3VwcyBpZlxuICAgICAgICAvLyB3ZSBrbm93IGFsbCBlbnRyaWVzIGFjdHVhbGx5IHN0b3JlZCBhcmUgZW50ZXJlZCBpbiAnaG1hcCcuXG4gICAgICAgIHZhciBvbWFwID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEhpZGRlbi1wcm9wZXJ0eSBtYXBzIGFyZSBub3QgY29tcGF0aWJsZSB3aXRoIHByb3hpZXMgYmVjYXVzZSBwcm94aWVzXG4gICAgICAgIC8vIGNhbiBvYnNlcnZlIHRoZSBoaWRkZW4gbmFtZSBhbmQgZWl0aGVyIGFjY2lkZW50YWxseSBleHBvc2UgaXQgb3IgZmFpbFxuICAgICAgICAvLyB0byBhbGxvdyB0aGUgaGlkZGVuIHByb3BlcnR5IHRvIGJlIHNldC4gVGhlcmVmb3JlLCB3ZSBkbyBub3QgYWxsb3dcbiAgICAgICAgLy8gYXJiaXRyYXJ5IFdlYWtNYXBzIHRvIHN3aXRjaCB0byB1c2luZyBoaWRkZW4gcHJvcGVydGllcywgYnV0IG9ubHlcbiAgICAgICAgLy8gdGhvc2Ugd2hpY2ggbmVlZCB0aGUgYWJpbGl0eSwgYW5kIHVucHJpdmlsZWdlZCBjb2RlIGlzIG5vdCBhbGxvd2VkXG4gICAgICAgIC8vIHRvIHNldCB0aGUgZmxhZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gKEV4Y2VwdCBpbiBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlIG1vZGUgaW4gd2hpY2ggY2FzZSB3ZVxuICAgICAgICAvLyBkaXNhYmxlIHByb3hpZXMuKVxuICAgICAgICB2YXIgZW5hYmxlU3dpdGNoaW5nID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gZGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKG9tYXApIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpID8gaG1hcC5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIDogb21hcC5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmdldChrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaGFzKGtleSkge1xuICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpIHx8IChvbWFwID8gb21hcC5oYXNfX18oa2V5KSA6IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkc2V0O1xuICAgICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSkge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaG1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgb21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlU3dpdGNoaW5nKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgICBvbWFwLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGRlbGV0ZShrZXkpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gISFobWFwWydkZWxldGUnXShrZXkpO1xuICAgICAgICAgIGlmIChvbWFwKSB7IHJldHVybiBvbWFwLmRlbGV0ZV9fXyhrZXkpIHx8IHJlc3VsdDsgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShPdXJXZWFrTWFwLnByb3RvdHlwZSwge1xuICAgICAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRnZXQpIH0sXG4gICAgICAgICAgaGFzX19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGhhcykgfSxcbiAgICAgICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkc2V0KSB9LFxuICAgICAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRkZWxldGUpIH0sXG4gICAgICAgICAgcGVybWl0SG9zdE9iamVjdHNfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuID09PSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMpIHtcbiAgICAgICAgICAgICAgZW5hYmxlU3dpdGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYm9ndXMgY2FsbCB0byBwZXJtaXRIb3N0T2JqZWN0c19fXycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIERvdWJsZVdlYWtNYXAucHJvdG90eXBlID0gT3VyV2Vha01hcC5wcm90b3R5cGU7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IERvdWJsZVdlYWtNYXA7XG5cbiAgICAgIC8vIGRlZmluZSAuY29uc3RydWN0b3IgdG8gaGlkZSBPdXJXZWFrTWFwIGN0b3JcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgICB2YWx1ZTogV2Vha01hcCxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsICAvLyBhcyBkZWZhdWx0IC5jb25zdHJ1Y3RvciBpc1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIG5vIGhvc3QgV2Vha01hcCwgc28gd2UgbXVzdCB1c2UgdGhlIGVtdWxhdGlvbi5cblxuICAgIC8vIEVtdWxhdGVkIFdlYWtNYXBzIGFyZSBpbmNvbXBhdGlibGUgd2l0aCBuYXRpdmUgcHJveGllcyAoYmVjYXVzZSBwcm94aWVzXG4gICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lKSwgc28gd2UgbXVzdCBkaXNhYmxlIFByb3h5IHVzYWdlIChpblxuICAgIC8vIEFycmF5TGlrZSBhbmQgRG9tYWRvLCBjdXJyZW50bHkpLlxuICAgIGlmICh0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE91cldlYWtNYXA7XG4gIH1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrLW1hcC93ZWFrLW1hcC5qc1xuLy8gbW9kdWxlIGlkID0gNDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgcG9vbCA9IHJlcXVpcmUoXCJ0eXBlZGFycmF5LXBvb2xcIilcbnZhciBvcHMgPSByZXF1aXJlKFwibmRhcnJheS1vcHNcIilcbnZhciBuZGFycmF5ID0gcmVxdWlyZShcIm5kYXJyYXlcIilcblxudmFyIFNVUFBPUlRFRF9UWVBFUyA9IFtcbiAgXCJ1aW50OFwiLFxuICBcInVpbnQ4X2NsYW1wZWRcIixcbiAgXCJ1aW50MTZcIixcbiAgXCJ1aW50MzJcIixcbiAgXCJpbnQ4XCIsXG4gIFwiaW50MTZcIixcbiAgXCJpbnQzMlwiLFxuICBcImZsb2F0MzJcIiBdXG5cbmZ1bmN0aW9uIEdMQnVmZmVyKGdsLCB0eXBlLCBoYW5kbGUsIGxlbmd0aCwgdXNhZ2UpIHtcbiAgdGhpcy5nbCA9IGdsXG4gIHRoaXMudHlwZSA9IHR5cGVcbiAgdGhpcy5oYW5kbGUgPSBoYW5kbGVcbiAgdGhpcy5sZW5ndGggPSBsZW5ndGhcbiAgdGhpcy51c2FnZSA9IHVzYWdlXG59XG5cbnZhciBwcm90byA9IEdMQnVmZmVyLnByb3RvdHlwZVxuXG5wcm90by5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIHRoaXMuaGFuZGxlKVxufVxuXG5wcm90by51bmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMudHlwZSwgbnVsbClcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdsLmRlbGV0ZUJ1ZmZlcih0aGlzLmhhbmRsZSlcbn1cblxuZnVuY3Rpb24gdXBkYXRlVHlwZUFycmF5KGdsLCB0eXBlLCBsZW4sIHVzYWdlLCBkYXRhLCBvZmZzZXQpIHtcbiAgdmFyIGRhdGFMZW4gPSBkYXRhLmxlbmd0aCAqIGRhdGEuQllURVNfUEVSX0VMRU1FTlRcbiAgaWYob2Zmc2V0IDwgMCkge1xuICAgIGdsLmJ1ZmZlckRhdGEodHlwZSwgZGF0YSwgdXNhZ2UpXG4gICAgcmV0dXJuIGRhdGFMZW5cbiAgfVxuICBpZihkYXRhTGVuICsgb2Zmc2V0ID4gbGVuKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJZiByZXNpemluZyBidWZmZXIsIG11c3Qgbm90IHNwZWNpZnkgb2Zmc2V0XCIpXG4gIH1cbiAgZ2wuYnVmZmVyU3ViRGF0YSh0eXBlLCBvZmZzZXQsIGRhdGEpXG4gIHJldHVybiBsZW5cbn1cblxuZnVuY3Rpb24gbWFrZVNjcmF0Y2hUeXBlQXJyYXkoYXJyYXksIGR0eXBlKSB7XG4gIHZhciByZXMgPSBwb29sLm1hbGxvYyhhcnJheS5sZW5ndGgsIGR0eXBlKVxuICB2YXIgbiA9IGFycmF5Lmxlbmd0aFxuICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICByZXNbaV0gPSBhcnJheVtpXVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gaXNQYWNrZWQoc2hhcGUsIHN0cmlkZSkge1xuICB2YXIgbiA9IDFcbiAgZm9yKHZhciBpPXN0cmlkZS5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4gICAgaWYoc3RyaWRlW2ldICE9PSBuKSB7XG4gICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG4gICAgbiAqPSBzaGFwZVtpXVxuICB9XG4gIHJldHVybiB0cnVlXG59XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGFycmF5LCBvZmZzZXQpIHtcbiAgaWYodHlwZW9mIG9mZnNldCAhPT0gXCJudW1iZXJcIikge1xuICAgIG9mZnNldCA9IC0xXG4gIH1cbiAgdGhpcy5iaW5kKClcbiAgaWYodHlwZW9mIGFycmF5ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBhcnJheS5zaGFwZSAhPT0gXCJ1bmRlZmluZWRcIikgeyAvL25kYXJyYXlcbiAgICB2YXIgZHR5cGUgPSBhcnJheS5kdHlwZVxuICAgIGlmKFNVUFBPUlRFRF9UWVBFUy5pbmRleE9mKGR0eXBlKSA8IDApIHtcbiAgICAgIGR0eXBlID0gXCJmbG9hdDMyXCJcbiAgICB9XG4gICAgaWYodGhpcy50eXBlID09PSB0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSKSB7XG4gICAgICB2YXIgZXh0ID0gZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfZWxlbWVudF9pbmRleF91aW50JylcbiAgICAgIGlmKGV4dCAmJiBkdHlwZSAhPT0gXCJ1aW50MTZcIikge1xuICAgICAgICBkdHlwZSA9IFwidWludDMyXCJcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGR0eXBlID0gXCJ1aW50MTZcIlxuICAgICAgfVxuICAgIH1cbiAgICBpZihkdHlwZSA9PT0gYXJyYXkuZHR5cGUgJiYgaXNQYWNrZWQoYXJyYXkuc2hhcGUsIGFycmF5LnN0cmlkZSkpIHtcbiAgICAgIGlmKGFycmF5Lm9mZnNldCA9PT0gMCAmJiBhcnJheS5kYXRhLmxlbmd0aCA9PT0gYXJyYXkuc2hhcGVbMF0pIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgYXJyYXkuZGF0YSwgb2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgYXJyYXkuZGF0YS5zdWJhcnJheShhcnJheS5vZmZzZXQsIGFycmF5LnNoYXBlWzBdKSwgb2Zmc2V0KVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdG1wID0gcG9vbC5tYWxsb2MoYXJyYXkuc2l6ZSwgZHR5cGUpXG4gICAgICB2YXIgbmR0ID0gbmRhcnJheSh0bXAsIGFycmF5LnNoYXBlKVxuICAgICAgb3BzLmFzc2lnbihuZHQsIGFycmF5KVxuICAgICAgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0bXAsIG9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIHRtcC5zdWJhcnJheSgwLCBhcnJheS5zaXplKSwgb2Zmc2V0KVxuICAgICAgfVxuICAgICAgcG9vbC5mcmVlKHRtcClcbiAgICB9XG4gIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KGFycmF5KSkgeyAvL1ZhbmlsbGEgYXJyYXlcbiAgICB2YXIgdFxuICAgIGlmKHRoaXMudHlwZSA9PT0gdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUikge1xuICAgICAgdCA9IG1ha2VTY3JhdGNoVHlwZUFycmF5KGFycmF5LCBcInVpbnQxNlwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB0ID0gbWFrZVNjcmF0Y2hUeXBlQXJyYXkoYXJyYXksIFwiZmxvYXQzMlwiKVxuICAgIH1cbiAgICBpZihvZmZzZXQgPCAwKSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0LCBvZmZzZXQpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIHQuc3ViYXJyYXkoMCwgYXJyYXkubGVuZ3RoKSwgb2Zmc2V0KVxuICAgIH1cbiAgICBwb29sLmZyZWUodClcbiAgfSBlbHNlIGlmKHR5cGVvZiBhcnJheSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYXJyYXkubGVuZ3RoID09PSBcIm51bWJlclwiKSB7IC8vVHlwZWQgYXJyYXlcbiAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCBhcnJheSwgb2Zmc2V0KVxuICB9IGVsc2UgaWYodHlwZW9mIGFycmF5ID09PSBcIm51bWJlclwiIHx8IGFycmF5ID09PSB1bmRlZmluZWQpIHsgLy9OdW1iZXIvZGVmYXVsdFxuICAgIGlmKG9mZnNldCA+PSAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IENhbm5vdCBzcGVjaWZ5IG9mZnNldCB3aGVuIHJlc2l6aW5nIGJ1ZmZlclwiKVxuICAgIH1cbiAgICBhcnJheSA9IGFycmF5IHwgMFxuICAgIGlmKGFycmF5IDw9IDApIHtcbiAgICAgIGFycmF5ID0gMVxuICAgIH1cbiAgICB0aGlzLmdsLmJ1ZmZlckRhdGEodGhpcy50eXBlLCBhcnJheXwwLCB0aGlzLnVzYWdlKVxuICAgIHRoaXMubGVuZ3RoID0gYXJyYXlcbiAgfSBlbHNlIHsgLy9FcnJvciwgY2FzZSBzaG91bGQgbm90IGhhcHBlblxuICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogSW52YWxpZCBkYXRhIHR5cGVcIilcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIoZ2wsIGRhdGEsIHR5cGUsIHVzYWdlKSB7XG4gIHR5cGUgPSB0eXBlIHx8IGdsLkFSUkFZX0JVRkZFUlxuICB1c2FnZSA9IHVzYWdlIHx8IGdsLkRZTkFNSUNfRFJBV1xuICBpZih0eXBlICE9PSBnbC5BUlJBWV9CVUZGRVIgJiYgdHlwZSAhPT0gZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IEludmFsaWQgdHlwZSBmb3Igd2ViZ2wgYnVmZmVyLCBtdXN0IGJlIGVpdGhlciBnbC5BUlJBWV9CVUZGRVIgb3IgZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVJcIilcbiAgfVxuICBpZih1c2FnZSAhPT0gZ2wuRFlOQU1JQ19EUkFXICYmIHVzYWdlICE9PSBnbC5TVEFUSUNfRFJBVyAmJiB1c2FnZSAhPT0gZ2wuU1RSRUFNX0RSQVcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IEludmFsaWQgdXNhZ2UgZm9yIGJ1ZmZlciwgbXVzdCBiZSBlaXRoZXIgZ2wuRFlOQU1JQ19EUkFXLCBnbC5TVEFUSUNfRFJBVyBvciBnbC5TVFJFQU1fRFJBV1wiKVxuICB9XG4gIHZhciBoYW5kbGUgPSBnbC5jcmVhdGVCdWZmZXIoKVxuICB2YXIgcmVzdWx0ID0gbmV3IEdMQnVmZmVyKGdsLCB0eXBlLCBoYW5kbGUsIDAsIHVzYWdlKVxuICByZXN1bHQudXBkYXRlKGRhdGEpXG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVCdWZmZXJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWJ1ZmZlci9idWZmZXIuanNcbi8vIG1vZHVsZSBpZCA9IDQxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBiaXRzID0gcmVxdWlyZSgnYml0LXR3aWRkbGUnKVxudmFyIGR1cCA9IHJlcXVpcmUoJ2R1cCcpXG5cbi8vTGVnYWN5IHBvb2wgc3VwcG9ydFxuaWYoIWdsb2JhbC5fX1RZUEVEQVJSQVlfUE9PTCkge1xuICBnbG9iYWwuX19UWVBFREFSUkFZX1BPT0wgPSB7XG4gICAgICBVSU5UOCAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBVSU5UMTYgIDogZHVwKFszMiwgMF0pXG4gICAgLCBVSU5UMzIgIDogZHVwKFszMiwgMF0pXG4gICAgLCBJTlQ4ICAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBJTlQxNiAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBJTlQzMiAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBGTE9BVCAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBET1VCTEUgIDogZHVwKFszMiwgMF0pXG4gICAgLCBEQVRBICAgIDogZHVwKFszMiwgMF0pXG4gICAgLCBVSU5UOEMgIDogZHVwKFszMiwgMF0pXG4gICAgLCBCVUZGRVIgIDogZHVwKFszMiwgMF0pXG4gIH1cbn1cblxudmFyIGhhc1VpbnQ4QyA9ICh0eXBlb2YgVWludDhDbGFtcGVkQXJyYXkpICE9PSAndW5kZWZpbmVkJ1xudmFyIFBPT0wgPSBnbG9iYWwuX19UWVBFREFSUkFZX1BPT0xcblxuLy9VcGdyYWRlIHBvb2xcbmlmKCFQT09MLlVJTlQ4Qykge1xuICBQT09MLlVJTlQ4QyA9IGR1cChbMzIsIDBdKVxufVxuaWYoIVBPT0wuQlVGRkVSKSB7XG4gIFBPT0wuQlVGRkVSID0gZHVwKFszMiwgMF0pXG59XG5cbi8vTmV3IHRlY2huaXF1ZTogT25seSBhbGxvY2F0ZSBmcm9tIEFycmF5QnVmZmVyVmlldyBhbmQgQnVmZmVyXG52YXIgREFUQSAgICA9IFBPT0wuREFUQVxuICAsIEJVRkZFUiAgPSBQT09MLkJVRkZFUlxuXG5leHBvcnRzLmZyZWUgPSBmdW5jdGlvbiBmcmVlKGFycmF5KSB7XG4gIGlmKEJ1ZmZlci5pc0J1ZmZlcihhcnJheSkpIHtcbiAgICBCVUZGRVJbYml0cy5sb2cyKGFycmF5Lmxlbmd0aCldLnB1c2goYXJyYXkpXG4gIH0gZWxzZSB7XG4gICAgaWYoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFycmF5KSAhPT0gJ1tvYmplY3QgQXJyYXlCdWZmZXJdJykge1xuICAgICAgYXJyYXkgPSBhcnJheS5idWZmZXJcbiAgICB9XG4gICAgaWYoIWFycmF5KSB7XG4gICAgICByZXR1cm5cbiAgICB9XG4gICAgdmFyIG4gPSBhcnJheS5sZW5ndGggfHwgYXJyYXkuYnl0ZUxlbmd0aFxuICAgIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKXwwXG4gICAgREFUQVtsb2dfbl0ucHVzaChhcnJheSlcbiAgfVxufVxuXG5mdW5jdGlvbiBmcmVlQXJyYXlCdWZmZXIoYnVmZmVyKSB7XG4gIGlmKCFidWZmZXIpIHtcbiAgICByZXR1cm5cbiAgfVxuICB2YXIgbiA9IGJ1ZmZlci5sZW5ndGggfHwgYnVmZmVyLmJ5dGVMZW5ndGhcbiAgdmFyIGxvZ19uID0gYml0cy5sb2cyKG4pXG4gIERBVEFbbG9nX25dLnB1c2goYnVmZmVyKVxufVxuXG5mdW5jdGlvbiBmcmVlVHlwZWRBcnJheShhcnJheSkge1xuICBmcmVlQXJyYXlCdWZmZXIoYXJyYXkuYnVmZmVyKVxufVxuXG5leHBvcnRzLmZyZWVVaW50OCA9XG5leHBvcnRzLmZyZWVVaW50MTYgPVxuZXhwb3J0cy5mcmVlVWludDMyID1cbmV4cG9ydHMuZnJlZUludDggPVxuZXhwb3J0cy5mcmVlSW50MTYgPVxuZXhwb3J0cy5mcmVlSW50MzIgPVxuZXhwb3J0cy5mcmVlRmxvYXQzMiA9IFxuZXhwb3J0cy5mcmVlRmxvYXQgPVxuZXhwb3J0cy5mcmVlRmxvYXQ2NCA9IFxuZXhwb3J0cy5mcmVlRG91YmxlID0gXG5leHBvcnRzLmZyZWVVaW50OENsYW1wZWQgPSBcbmV4cG9ydHMuZnJlZURhdGFWaWV3ID0gZnJlZVR5cGVkQXJyYXlcblxuZXhwb3J0cy5mcmVlQXJyYXlCdWZmZXIgPSBmcmVlQXJyYXlCdWZmZXJcblxuZXhwb3J0cy5mcmVlQnVmZmVyID0gZnVuY3Rpb24gZnJlZUJ1ZmZlcihhcnJheSkge1xuICBCVUZGRVJbYml0cy5sb2cyKGFycmF5Lmxlbmd0aCldLnB1c2goYXJyYXkpXG59XG5cbmV4cG9ydHMubWFsbG9jID0gZnVuY3Rpb24gbWFsbG9jKG4sIGR0eXBlKSB7XG4gIGlmKGR0eXBlID09PSB1bmRlZmluZWQgfHwgZHR5cGUgPT09ICdhcnJheWJ1ZmZlcicpIHtcbiAgICByZXR1cm4gbWFsbG9jQXJyYXlCdWZmZXIobilcbiAgfSBlbHNlIHtcbiAgICBzd2l0Y2goZHR5cGUpIHtcbiAgICAgIGNhc2UgJ3VpbnQ4JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY1VpbnQ4KG4pXG4gICAgICBjYXNlICd1aW50MTYnOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDE2KG4pXG4gICAgICBjYXNlICd1aW50MzInOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDMyKG4pXG4gICAgICBjYXNlICdpbnQ4JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0ludDgobilcbiAgICAgIGNhc2UgJ2ludDE2JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0ludDE2KG4pXG4gICAgICBjYXNlICdpbnQzMic6XG4gICAgICAgIHJldHVybiBtYWxsb2NJbnQzMihuKVxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgY2FzZSAnZmxvYXQzMic6XG4gICAgICAgIHJldHVybiBtYWxsb2NGbG9hdChuKVxuICAgICAgY2FzZSAnZG91YmxlJzpcbiAgICAgIGNhc2UgJ2Zsb2F0NjQnOlxuICAgICAgICByZXR1cm4gbWFsbG9jRG91YmxlKG4pXG4gICAgICBjYXNlICd1aW50OF9jbGFtcGVkJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY1VpbnQ4Q2xhbXBlZChuKVxuICAgICAgY2FzZSAnYnVmZmVyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0J1ZmZlcihuKVxuICAgICAgY2FzZSAnZGF0YSc6XG4gICAgICBjYXNlICdkYXRhdmlldyc6XG4gICAgICAgIHJldHVybiBtYWxsb2NEYXRhVmlldyhuKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gbnVsbFxuICAgIH1cbiAgfVxuICByZXR1cm4gbnVsbFxufVxuXG5mdW5jdGlvbiBtYWxsb2NBcnJheUJ1ZmZlcihuKSB7XG4gIHZhciBuID0gYml0cy5uZXh0UG93MihuKVxuICB2YXIgbG9nX24gPSBiaXRzLmxvZzIobilcbiAgdmFyIGQgPSBEQVRBW2xvZ19uXVxuICBpZihkLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gZC5wb3AoKVxuICB9XG4gIHJldHVybiBuZXcgQXJyYXlCdWZmZXIobilcbn1cbmV4cG9ydHMubWFsbG9jQXJyYXlCdWZmZXIgPSBtYWxsb2NBcnJheUJ1ZmZlclxuXG5mdW5jdGlvbiBtYWxsb2NVaW50OChuKSB7XG4gIHJldHVybiBuZXcgVWludDhBcnJheShtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jVWludDggPSBtYWxsb2NVaW50OFxuXG5mdW5jdGlvbiBtYWxsb2NVaW50MTYobikge1xuICByZXR1cm4gbmV3IFVpbnQxNkFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDIqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY1VpbnQxNiA9IG1hbGxvY1VpbnQxNlxuXG5mdW5jdGlvbiBtYWxsb2NVaW50MzIobikge1xuICByZXR1cm4gbmV3IFVpbnQzMkFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDQqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY1VpbnQzMiA9IG1hbGxvY1VpbnQzMlxuXG5mdW5jdGlvbiBtYWxsb2NJbnQ4KG4pIHtcbiAgcmV0dXJuIG5ldyBJbnQ4QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIobiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0ludDggPSBtYWxsb2NJbnQ4XG5cbmZ1bmN0aW9uIG1hbGxvY0ludDE2KG4pIHtcbiAgcmV0dXJuIG5ldyBJbnQxNkFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDIqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0ludDE2ID0gbWFsbG9jSW50MTZcblxuZnVuY3Rpb24gbWFsbG9jSW50MzIobikge1xuICByZXR1cm4gbmV3IEludDMyQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoNCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jSW50MzIgPSBtYWxsb2NJbnQzMlxuXG5mdW5jdGlvbiBtYWxsb2NGbG9hdChuKSB7XG4gIHJldHVybiBuZXcgRmxvYXQzMkFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDQqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0Zsb2F0MzIgPSBleHBvcnRzLm1hbGxvY0Zsb2F0ID0gbWFsbG9jRmxvYXRcblxuZnVuY3Rpb24gbWFsbG9jRG91YmxlKG4pIHtcbiAgcmV0dXJuIG5ldyBGbG9hdDY0QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoOCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jRmxvYXQ2NCA9IGV4cG9ydHMubWFsbG9jRG91YmxlID0gbWFsbG9jRG91YmxlXG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQ4Q2xhbXBlZChuKSB7XG4gIGlmKGhhc1VpbnQ4Qykge1xuICAgIHJldHVybiBuZXcgVWludDhDbGFtcGVkQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIobiksIDAsIG4pXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG1hbGxvY1VpbnQ4KG4pXG4gIH1cbn1cbmV4cG9ydHMubWFsbG9jVWludDhDbGFtcGVkID0gbWFsbG9jVWludDhDbGFtcGVkXG5cbmZ1bmN0aW9uIG1hbGxvY0RhdGFWaWV3KG4pIHtcbiAgcmV0dXJuIG5ldyBEYXRhVmlldyhtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jRGF0YVZpZXcgPSBtYWxsb2NEYXRhVmlld1xuXG5mdW5jdGlvbiBtYWxsb2NCdWZmZXIobikge1xuICBuID0gYml0cy5uZXh0UG93MihuKVxuICB2YXIgbG9nX24gPSBiaXRzLmxvZzIobilcbiAgdmFyIGNhY2hlID0gQlVGRkVSW2xvZ19uXVxuICBpZihjYWNoZS5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGNhY2hlLnBvcCgpXG4gIH1cbiAgcmV0dXJuIG5ldyBCdWZmZXIobilcbn1cbmV4cG9ydHMubWFsbG9jQnVmZmVyID0gbWFsbG9jQnVmZmVyXG5cbmV4cG9ydHMuY2xlYXJDYWNoZSA9IGZ1bmN0aW9uIGNsZWFyQ2FjaGUoKSB7XG4gIGZvcih2YXIgaT0wOyBpPDMyOyArK2kpIHtcbiAgICBQT09MLlVJTlQ4W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLlVJTlQxNltpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5VSU5UMzJbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuSU5UOFtpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5JTlQxNltpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5JTlQzMltpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5GTE9BVFtpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5ET1VCTEVbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuVUlOVDhDW2ldLmxlbmd0aCA9IDBcbiAgICBEQVRBW2ldLmxlbmd0aCA9IDBcbiAgICBCVUZGRVJbaV0ubGVuZ3RoID0gMFxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdHlwZWRhcnJheS1wb29sL3Bvb2wuanNcbi8vIG1vZHVsZSBpZCA9IDQyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5leHBvcnRzLnRvQnl0ZUFycmF5ID0gdG9CeXRlQXJyYXlcbmV4cG9ydHMuZnJvbUJ5dGVBcnJheSA9IGZyb21CeXRlQXJyYXlcblxudmFyIGxvb2t1cCA9IFtdXG52YXIgcmV2TG9va3VwID0gW11cbnZhciBBcnIgPSB0eXBlb2YgVWludDhBcnJheSAhPT0gJ3VuZGVmaW5lZCcgPyBVaW50OEFycmF5IDogQXJyYXlcblxudmFyIGNvZGUgPSAnQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVphYmNkZWZnaGlqa2xtbm9wcXJzdHV2d3h5ejAxMjM0NTY3ODkrLydcbmZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2RlLmxlbmd0aDsgaSA8IGxlbjsgKytpKSB7XG4gIGxvb2t1cFtpXSA9IGNvZGVbaV1cbiAgcmV2TG9va3VwW2NvZGUuY2hhckNvZGVBdChpKV0gPSBpXG59XG5cbnJldkxvb2t1cFsnLScuY2hhckNvZGVBdCgwKV0gPSA2MlxucmV2TG9va3VwWydfJy5jaGFyQ29kZUF0KDApXSA9IDYzXG5cbmZ1bmN0aW9uIHBsYWNlSG9sZGVyc0NvdW50IChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgPiAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHN0cmluZy4gTGVuZ3RoIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA0JylcbiAgfVxuXG4gIC8vIHRoZSBudW1iZXIgb2YgZXF1YWwgc2lnbnMgKHBsYWNlIGhvbGRlcnMpXG4gIC8vIGlmIHRoZXJlIGFyZSB0d28gcGxhY2Vob2xkZXJzLCB0aGFuIHRoZSB0d28gY2hhcmFjdGVycyBiZWZvcmUgaXRcbiAgLy8gcmVwcmVzZW50IG9uZSBieXRlXG4gIC8vIGlmIHRoZXJlIGlzIG9ubHkgb25lLCB0aGVuIHRoZSB0aHJlZSBjaGFyYWN0ZXJzIGJlZm9yZSBpdCByZXByZXNlbnQgMiBieXRlc1xuICAvLyB0aGlzIGlzIGp1c3QgYSBjaGVhcCBoYWNrIHRvIG5vdCBkbyBpbmRleE9mIHR3aWNlXG4gIHJldHVybiBiNjRbbGVuIC0gMl0gPT09ICc9JyA/IDIgOiBiNjRbbGVuIC0gMV0gPT09ICc9JyA/IDEgOiAwXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKGI2NCkge1xuICAvLyBiYXNlNjQgaXMgNC8zICsgdXAgdG8gdHdvIGNoYXJhY3RlcnMgb2YgdGhlIG9yaWdpbmFsIGRhdGFcbiAgcmV0dXJuIChiNjQubGVuZ3RoICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxufVxuXG5mdW5jdGlvbiB0b0J5dGVBcnJheSAoYjY0KSB7XG4gIHZhciBpLCBsLCB0bXAsIHBsYWNlSG9sZGVycywgYXJyXG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIHBsYWNlSG9sZGVycyA9IHBsYWNlSG9sZGVyc0NvdW50KGI2NClcblxuICBhcnIgPSBuZXcgQXJyKChsZW4gKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnMpXG5cbiAgLy8gaWYgdGhlcmUgYXJlIHBsYWNlaG9sZGVycywgb25seSBnZXQgdXAgdG8gdGhlIGxhc3QgY29tcGxldGUgNCBjaGFyc1xuICBsID0gcGxhY2VIb2xkZXJzID4gMCA/IGxlbiAtIDQgOiBsZW5cblxuICB2YXIgTCA9IDBcblxuICBmb3IgKGkgPSAwOyBpIDwgbDsgaSArPSA0KSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTgpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDEyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8IHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMyldXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDE2KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICBpZiAocGxhY2VIb2xkZXJzID09PSAyKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfSBlbHNlIGlmIChwbGFjZUhvbGRlcnMgPT09IDEpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxMCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgNCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDEyICYgMHgzRl0gKyBsb29rdXBbbnVtID4+IDYgJiAweDNGXSArIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPSAodWludDhbaV0gPDwgMTYpICsgKHVpbnQ4W2kgKyAxXSA8PCA4KSArICh1aW50OFtpICsgMl0pXG4gICAgb3V0cHV0LnB1c2godHJpcGxldFRvQmFzZTY0KHRtcCkpXG4gIH1cbiAgcmV0dXJuIG91dHB1dC5qb2luKCcnKVxufVxuXG5mdW5jdGlvbiBmcm9tQnl0ZUFycmF5ICh1aW50OCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW4gPSB1aW50OC5sZW5ndGhcbiAgdmFyIGV4dHJhQnl0ZXMgPSBsZW4gJSAzIC8vIGlmIHdlIGhhdmUgMSBieXRlIGxlZnQsIHBhZCAyIGJ5dGVzXG4gIHZhciBvdXRwdXQgPSAnJ1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKHVpbnQ4LCBpLCAoaSArIG1heENodW5rTGVuZ3RoKSA+IGxlbjIgPyBsZW4yIDogKGkgKyBtYXhDaHVua0xlbmd0aCkpKVxuICB9XG5cbiAgLy8gcGFkIHRoZSBlbmQgd2l0aCB6ZXJvcywgYnV0IG1ha2Ugc3VyZSB0byBub3QgZm9yZ2V0IHRoZSBleHRyYSBieXRlc1xuICBpZiAoZXh0cmFCeXRlcyA9PT0gMSkge1xuICAgIHRtcCA9IHVpbnQ4W2xlbiAtIDFdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPT0nXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArICh1aW50OFtsZW4gLSAxXSlcbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAxMF1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPj4gNCkgJiAweDNGXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCAyKSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9J1xuICB9XG5cbiAgcGFydHMucHVzaChvdXRwdXQpXG5cbiAgcmV0dXJuIHBhcnRzLmpvaW4oJycpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0cy5yZWFkID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG1cbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBuQml0cyA9IC03XG4gIHZhciBpID0gaXNMRSA/IChuQnl0ZXMgLSAxKSA6IDBcbiAgdmFyIGQgPSBpc0xFID8gLTEgOiAxXG4gIHZhciBzID0gYnVmZmVyW29mZnNldCArIGldXG5cbiAgaSArPSBkXG5cbiAgZSA9IHMgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgcyA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gZUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBlID0gZSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IG0gKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBpZiAoZSA9PT0gMCkge1xuICAgIGUgPSAxIC0gZUJpYXNcbiAgfSBlbHNlIGlmIChlID09PSBlTWF4KSB7XG4gICAgcmV0dXJuIG0gPyBOYU4gOiAoKHMgPyAtMSA6IDEpICogSW5maW5pdHkpXG4gIH0gZWxzZSB7XG4gICAgbSA9IG0gKyBNYXRoLnBvdygyLCBtTGVuKVxuICAgIGUgPSBlIC0gZUJpYXNcbiAgfVxuICByZXR1cm4gKHMgPyAtMSA6IDEpICogbSAqIE1hdGgucG93KDIsIGUgLSBtTGVuKVxufVxuXG5leHBvcnRzLndyaXRlID0gZnVuY3Rpb24gKGJ1ZmZlciwgdmFsdWUsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtLCBjXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgcnQgPSAobUxlbiA9PT0gMjMgPyBNYXRoLnBvdygyLCAtMjQpIC0gTWF0aC5wb3coMiwgLTc3KSA6IDApXG4gIHZhciBpID0gaXNMRSA/IDAgOiAobkJ5dGVzIC0gMSlcbiAgdmFyIGQgPSBpc0xFID8gMSA6IC0xXG4gIHZhciBzID0gdmFsdWUgPCAwIHx8ICh2YWx1ZSA9PT0gMCAmJiAxIC8gdmFsdWUgPCAwKSA/IDEgOiAwXG5cbiAgdmFsdWUgPSBNYXRoLmFicyh2YWx1ZSlcblxuICBpZiAoaXNOYU4odmFsdWUpIHx8IHZhbHVlID09PSBJbmZpbml0eSkge1xuICAgIG0gPSBpc05hTih2YWx1ZSkgPyAxIDogMFxuICAgIGUgPSBlTWF4XG4gIH0gZWxzZSB7XG4gICAgZSA9IE1hdGguZmxvb3IoTWF0aC5sb2codmFsdWUpIC8gTWF0aC5MTjIpXG4gICAgaWYgKHZhbHVlICogKGMgPSBNYXRoLnBvdygyLCAtZSkpIDwgMSkge1xuICAgICAgZS0tXG4gICAgICBjICo9IDJcbiAgICB9XG4gICAgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICB2YWx1ZSArPSBydCAvIGNcbiAgICB9IGVsc2Uge1xuICAgICAgdmFsdWUgKz0gcnQgKiBNYXRoLnBvdygyLCAxIC0gZUJpYXMpXG4gICAgfVxuICAgIGlmICh2YWx1ZSAqIGMgPj0gMikge1xuICAgICAgZSsrXG4gICAgICBjIC89IDJcbiAgICB9XG5cbiAgICBpZiAoZSArIGVCaWFzID49IGVNYXgpIHtcbiAgICAgIG0gPSAwXG4gICAgICBlID0gZU1heFxuICAgIH0gZWxzZSBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIG0gPSAodmFsdWUgKiBjIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogQml0IHR3aWRkbGluZyBoYWNrcyBmb3IgSmF2YVNjcmlwdC5cbiAqXG4gKiBBdXRob3I6IE1pa29sYSBMeXNlbmtvXG4gKlxuICogUG9ydGVkIGZyb20gU3RhbmZvcmQgYml0IHR3aWRkbGluZyBoYWNrIGxpYnJhcnk6XG4gKiAgICBodHRwOi8vZ3JhcGhpY3Muc3RhbmZvcmQuZWR1L35zZWFuZGVyL2JpdGhhY2tzLmh0bWxcbiAqL1xuXG5cInVzZSBzdHJpY3RcIjsgXCJ1c2UgcmVzdHJpY3RcIjtcblxuLy9OdW1iZXIgb2YgYml0cyBpbiBhbiBpbnRlZ2VyXG52YXIgSU5UX0JJVFMgPSAzMjtcblxuLy9Db25zdGFudHNcbmV4cG9ydHMuSU5UX0JJVFMgID0gSU5UX0JJVFM7XG5leHBvcnRzLklOVF9NQVggICA9ICAweDdmZmZmZmZmO1xuZXhwb3J0cy5JTlRfTUlOICAgPSAtMTw8KElOVF9CSVRTLTEpO1xuXG4vL1JldHVybnMgLTEsIDAsICsxIGRlcGVuZGluZyBvbiBzaWduIG9mIHhcbmV4cG9ydHMuc2lnbiA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICh2ID4gMCkgLSAodiA8IDApO1xufVxuXG4vL0NvbXB1dGVzIGFic29sdXRlIHZhbHVlIG9mIGludGVnZXJcbmV4cG9ydHMuYWJzID0gZnVuY3Rpb24odikge1xuICB2YXIgbWFzayA9IHYgPj4gKElOVF9CSVRTLTEpO1xuICByZXR1cm4gKHYgXiBtYXNrKSAtIG1hc2s7XG59XG5cbi8vQ29tcHV0ZXMgbWluaW11bSBvZiBpbnRlZ2VycyB4IGFuZCB5XG5leHBvcnRzLm1pbiA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIHkgXiAoKHggXiB5KSAmIC0oeCA8IHkpKTtcbn1cblxuLy9Db21wdXRlcyBtYXhpbXVtIG9mIGludGVnZXJzIHggYW5kIHlcbmV4cG9ydHMubWF4ID0gZnVuY3Rpb24oeCwgeSkge1xuICByZXR1cm4geCBeICgoeCBeIHkpICYgLSh4IDwgeSkpO1xufVxuXG4vL0NoZWNrcyBpZiBhIG51bWJlciBpcyBhIHBvd2VyIG9mIHR3b1xuZXhwb3J0cy5pc1BvdzIgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAhKHYgJiAodi0xKSkgJiYgKCEhdik7XG59XG5cbi8vQ29tcHV0ZXMgbG9nIGJhc2UgMiBvZiB2XG5leHBvcnRzLmxvZzIgPSBmdW5jdGlvbih2KSB7XG4gIHZhciByLCBzaGlmdDtcbiAgciA9ICAgICAodiA+IDB4RkZGRikgPDwgNDsgdiA+Pj49IHI7XG4gIHNoaWZ0ID0gKHYgPiAweEZGICApIDw8IDM7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcbiAgc2hpZnQgPSAodiA+IDB4RiAgICkgPDwgMjsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xuICBzaGlmdCA9ICh2ID4gMHgzICAgKSA8PCAxOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XG4gIHJldHVybiByIHwgKHYgPj4gMSk7XG59XG5cbi8vQ29tcHV0ZXMgbG9nIGJhc2UgMTAgb2YgdlxuZXhwb3J0cy5sb2cxMCA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICAodiA+PSAxMDAwMDAwMDAwKSA/IDkgOiAodiA+PSAxMDAwMDAwMDApID8gOCA6ICh2ID49IDEwMDAwMDAwKSA/IDcgOlxuICAgICAgICAgICh2ID49IDEwMDAwMDApID8gNiA6ICh2ID49IDEwMDAwMCkgPyA1IDogKHYgPj0gMTAwMDApID8gNCA6XG4gICAgICAgICAgKHYgPj0gMTAwMCkgPyAzIDogKHYgPj0gMTAwKSA/IDIgOiAodiA+PSAxMCkgPyAxIDogMDtcbn1cblxuLy9Db3VudHMgbnVtYmVyIG9mIGJpdHNcbmV4cG9ydHMucG9wQ291bnQgPSBmdW5jdGlvbih2KSB7XG4gIHYgPSB2IC0gKCh2ID4+PiAxKSAmIDB4NTU1NTU1NTUpO1xuICB2ID0gKHYgJiAweDMzMzMzMzMzKSArICgodiA+Pj4gMikgJiAweDMzMzMzMzMzKTtcbiAgcmV0dXJuICgodiArICh2ID4+PiA0KSAmIDB4RjBGMEYwRikgKiAweDEwMTAxMDEpID4+PiAyNDtcbn1cblxuLy9Db3VudHMgbnVtYmVyIG9mIHRyYWlsaW5nIHplcm9zXG5mdW5jdGlvbiBjb3VudFRyYWlsaW5nWmVyb3Modikge1xuICB2YXIgYyA9IDMyO1xuICB2ICY9IC12O1xuICBpZiAodikgYy0tO1xuICBpZiAodiAmIDB4MDAwMEZGRkYpIGMgLT0gMTY7XG4gIGlmICh2ICYgMHgwMEZGMDBGRikgYyAtPSA4O1xuICBpZiAodiAmIDB4MEYwRjBGMEYpIGMgLT0gNDtcbiAgaWYgKHYgJiAweDMzMzMzMzMzKSBjIC09IDI7XG4gIGlmICh2ICYgMHg1NTU1NTU1NSkgYyAtPSAxO1xuICByZXR1cm4gYztcbn1cbmV4cG9ydHMuY291bnRUcmFpbGluZ1plcm9zID0gY291bnRUcmFpbGluZ1plcm9zO1xuXG4vL1JvdW5kcyB0byBuZXh0IHBvd2VyIG9mIDJcbmV4cG9ydHMubmV4dFBvdzIgPSBmdW5jdGlvbih2KSB7XG4gIHYgKz0gdiA9PT0gMDtcbiAgLS12O1xuICB2IHw9IHYgPj4+IDE7XG4gIHYgfD0gdiA+Pj4gMjtcbiAgdiB8PSB2ID4+PiA0O1xuICB2IHw9IHYgPj4+IDg7XG4gIHYgfD0gdiA+Pj4gMTY7XG4gIHJldHVybiB2ICsgMTtcbn1cblxuLy9Sb3VuZHMgZG93biB0byBwcmV2aW91cyBwb3dlciBvZiAyXG5leHBvcnRzLnByZXZQb3cyID0gZnVuY3Rpb24odikge1xuICB2IHw9IHYgPj4+IDE7XG4gIHYgfD0gdiA+Pj4gMjtcbiAgdiB8PSB2ID4+PiA0O1xuICB2IHw9IHYgPj4+IDg7XG4gIHYgfD0gdiA+Pj4gMTY7XG4gIHJldHVybiB2IC0gKHY+Pj4xKTtcbn1cblxuLy9Db21wdXRlcyBwYXJpdHkgb2Ygd29yZFxuZXhwb3J0cy5wYXJpdHkgPSBmdW5jdGlvbih2KSB7XG4gIHYgXj0gdiA+Pj4gMTY7XG4gIHYgXj0gdiA+Pj4gODtcbiAgdiBePSB2ID4+PiA0O1xuICB2ICY9IDB4ZjtcbiAgcmV0dXJuICgweDY5OTYgPj4+IHYpICYgMTtcbn1cblxudmFyIFJFVkVSU0VfVEFCTEUgPSBuZXcgQXJyYXkoMjU2KTtcblxuKGZ1bmN0aW9uKHRhYikge1xuICBmb3IodmFyIGk9MDsgaTwyNTY7ICsraSkge1xuICAgIHZhciB2ID0gaSwgciA9IGksIHMgPSA3O1xuICAgIGZvciAodiA+Pj49IDE7IHY7IHYgPj4+PSAxKSB7XG4gICAgICByIDw8PSAxO1xuICAgICAgciB8PSB2ICYgMTtcbiAgICAgIC0tcztcbiAgICB9XG4gICAgdGFiW2ldID0gKHIgPDwgcykgJiAweGZmO1xuICB9XG59KShSRVZFUlNFX1RBQkxFKTtcblxuLy9SZXZlcnNlIGJpdHMgaW4gYSAzMiBiaXQgd29yZFxuZXhwb3J0cy5yZXZlcnNlID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gIChSRVZFUlNFX1RBQkxFWyB2ICAgICAgICAgJiAweGZmXSA8PCAyNCkgfFxuICAgICAgICAgIChSRVZFUlNFX1RBQkxFWyh2ID4+PiA4KSAgJiAweGZmXSA8PCAxNikgfFxuICAgICAgICAgIChSRVZFUlNFX1RBQkxFWyh2ID4+PiAxNikgJiAweGZmXSA8PCA4KSAgfFxuICAgICAgICAgICBSRVZFUlNFX1RBQkxFWyh2ID4+PiAyNCkgJiAweGZmXTtcbn1cblxuLy9JbnRlcmxlYXZlIGJpdHMgb2YgMiBjb29yZGluYXRlcyB3aXRoIDE2IGJpdHMuICBVc2VmdWwgZm9yIGZhc3QgcXVhZHRyZWUgY29kZXNcbmV4cG9ydHMuaW50ZXJsZWF2ZTIgPSBmdW5jdGlvbih4LCB5KSB7XG4gIHggJj0gMHhGRkZGO1xuICB4ID0gKHggfCAoeCA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICB4ID0gKHggfCAoeCA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICB4ID0gKHggfCAoeCA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICB4ID0gKHggfCAoeCA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gIHkgJj0gMHhGRkZGO1xuICB5ID0gKHkgfCAoeSA8PCA4KSkgJiAweDAwRkYwMEZGO1xuICB5ID0gKHkgfCAoeSA8PCA0KSkgJiAweDBGMEYwRjBGO1xuICB5ID0gKHkgfCAoeSA8PCAyKSkgJiAweDMzMzMzMzMzO1xuICB5ID0gKHkgfCAoeSA8PCAxKSkgJiAweDU1NTU1NTU1O1xuXG4gIHJldHVybiB4IHwgKHkgPDwgMSk7XG59XG5cbi8vRXh0cmFjdHMgdGhlIG50aCBpbnRlcmxlYXZlZCBjb21wb25lbnRcbmV4cG9ydHMuZGVpbnRlcmxlYXZlMiA9IGZ1bmN0aW9uKHYsIG4pIHtcbiAgdiA9ICh2ID4+PiBuKSAmIDB4NTU1NTU1NTU7XG4gIHYgPSAodiB8ICh2ID4+PiAxKSkgICYgMHgzMzMzMzMzMztcbiAgdiA9ICh2IHwgKHYgPj4+IDIpKSAgJiAweDBGMEYwRjBGO1xuICB2ID0gKHYgfCAodiA+Pj4gNCkpICAmIDB4MDBGRjAwRkY7XG4gIHYgPSAodiB8ICh2ID4+PiAxNikpICYgMHgwMDBGRkZGO1xuICByZXR1cm4gKHYgPDwgMTYpID4+IDE2O1xufVxuXG5cbi8vSW50ZXJsZWF2ZSBiaXRzIG9mIDMgY29vcmRpbmF0ZXMsIGVhY2ggd2l0aCAxMCBiaXRzLiAgVXNlZnVsIGZvciBmYXN0IG9jdHJlZSBjb2Rlc1xuZXhwb3J0cy5pbnRlcmxlYXZlMyA9IGZ1bmN0aW9uKHgsIHksIHopIHtcbiAgeCAmPSAweDNGRjtcbiAgeCAgPSAoeCB8ICh4PDwxNikpICYgNDI3ODE5MDMzNTtcbiAgeCAgPSAoeCB8ICh4PDw4KSkgICYgMjUxNzE5Njk1O1xuICB4ICA9ICh4IHwgKHg8PDQpKSAgJiAzMjcyMzU2MDM1O1xuICB4ICA9ICh4IHwgKHg8PDIpKSAgJiAxMjI3MTMzNTEzO1xuXG4gIHkgJj0gMHgzRkY7XG4gIHkgID0gKHkgfCAoeTw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHkgID0gKHkgfCAoeTw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeSAgPSAoeSB8ICh5PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeSAgPSAoeSB8ICh5PDwyKSkgICYgMTIyNzEzMzUxMztcbiAgeCB8PSAoeSA8PCAxKTtcbiAgXG4gIHogJj0gMHgzRkY7XG4gIHogID0gKHogfCAoejw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHogID0gKHogfCAoejw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeiAgPSAoeiB8ICh6PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeiAgPSAoeiB8ICh6PDwyKSkgICYgMTIyNzEzMzUxMztcbiAgXG4gIHJldHVybiB4IHwgKHogPDwgMik7XG59XG5cbi8vRXh0cmFjdHMgbnRoIGludGVybGVhdmVkIGNvbXBvbmVudCBvZiBhIDMtdHVwbGVcbmV4cG9ydHMuZGVpbnRlcmxlYXZlMyA9IGZ1bmN0aW9uKHYsIG4pIHtcbiAgdiA9ICh2ID4+PiBuKSAgICAgICAmIDEyMjcxMzM1MTM7XG4gIHYgPSAodiB8ICh2Pj4+MikpICAgJiAzMjcyMzU2MDM1O1xuICB2ID0gKHYgfCAodj4+PjQpKSAgICYgMjUxNzE5Njk1O1xuICB2ID0gKHYgfCAodj4+PjgpKSAgICYgNDI3ODE5MDMzNTtcbiAgdiA9ICh2IHwgKHY+Pj4xNikpICAmIDB4M0ZGO1xuICByZXR1cm4gKHY8PDIyKT4+MjI7XG59XG5cbi8vQ29tcHV0ZXMgbmV4dCBjb21iaW5hdGlvbiBpbiBjb2xleGljb2dyYXBoaWMgb3JkZXIgKHRoaXMgaXMgbWlzdGFrZW5seSBjYWxsZWQgbmV4dFBlcm11dGF0aW9uIG9uIHRoZSBiaXQgdHdpZGRsaW5nIGhhY2tzIHBhZ2UpXG5leHBvcnRzLm5leHRDb21iaW5hdGlvbiA9IGZ1bmN0aW9uKHYpIHtcbiAgdmFyIHQgPSB2IHwgKHYgLSAxKTtcbiAgcmV0dXJuICh0ICsgMSkgfCAoKCh+dCAmIC1+dCkgLSAxKSA+Pj4gKGNvdW50VHJhaWxpbmdaZXJvcyh2KSArIDEpKTtcbn1cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYml0LXR3aWRkbGUvdHdpZGRsZS5qc1xuLy8gbW9kdWxlIGlkID0gNDdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBkdXBlX2FycmF5KGNvdW50LCB2YWx1ZSwgaSkge1xuICB2YXIgYyA9IGNvdW50W2ldfDBcbiAgaWYoYyA8PSAwKSB7XG4gICAgcmV0dXJuIFtdXG4gIH1cbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShjKSwgalxuICBpZihpID09PSBjb3VudC5sZW5ndGgtMSkge1xuICAgIGZvcihqPTA7IGo8YzsgKytqKSB7XG4gICAgICByZXN1bHRbal0gPSB2YWx1ZVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3Ioaj0wOyBqPGM7ICsraikge1xuICAgICAgcmVzdWx0W2pdID0gZHVwZV9hcnJheShjb3VudCwgdmFsdWUsIGkrMSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBkdXBlX251bWJlcihjb3VudCwgdmFsdWUpIHtcbiAgdmFyIHJlc3VsdCwgaVxuICByZXN1bHQgPSBuZXcgQXJyYXkoY291bnQpXG4gIGZvcihpPTA7IGk8Y291bnQ7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IHZhbHVlXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBkdXBlKGNvdW50LCB2YWx1ZSkge1xuICBpZih0eXBlb2YgdmFsdWUgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YWx1ZSA9IDBcbiAgfVxuICBzd2l0Y2godHlwZW9mIGNvdW50KSB7XG4gICAgY2FzZSBcIm51bWJlclwiOlxuICAgICAgaWYoY291bnQgPiAwKSB7XG4gICAgICAgIHJldHVybiBkdXBlX251bWJlcihjb3VudHwwLCB2YWx1ZSlcbiAgICAgIH1cbiAgICBicmVha1xuICAgIGNhc2UgXCJvYmplY3RcIjpcbiAgICAgIGlmKHR5cGVvZiAoY291bnQubGVuZ3RoKSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICByZXR1cm4gZHVwZV9hcnJheShjb3VudCwgdmFsdWUsIDApXG4gICAgICB9XG4gICAgYnJlYWtcbiAgfVxuICByZXR1cm4gW11cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkdXBlXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZHVwL2R1cC5qc1xuLy8gbW9kdWxlIGlkID0gNDhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY29tcGlsZSA9IHJlcXVpcmUoXCJjd2lzZS1jb21waWxlclwiKVxuXG52YXIgRW1wdHlQcm9jID0ge1xuICBib2R5OiBcIlwiLFxuICBhcmdzOiBbXSxcbiAgdGhpc1ZhcnM6IFtdLFxuICBsb2NhbFZhcnM6IFtdXG59XG5cbmZ1bmN0aW9uIGZpeHVwKHgpIHtcbiAgaWYoIXgpIHtcbiAgICByZXR1cm4gRW1wdHlQcm9jXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8eC5hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGEgPSB4LmFyZ3NbaV1cbiAgICBpZihpID09PSAwKSB7XG4gICAgICB4LmFyZ3NbaV0gPSB7bmFtZTogYSwgbHZhbHVlOnRydWUsIHJ2YWx1ZTogISF4LnJ2YWx1ZSwgY291bnQ6eC5jb3VudHx8MSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHguYXJnc1tpXSA9IHtuYW1lOiBhLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDogMX1cbiAgICB9XG4gIH1cbiAgaWYoIXgudGhpc1ZhcnMpIHtcbiAgICB4LnRoaXNWYXJzID0gW11cbiAgfVxuICBpZigheC5sb2NhbFZhcnMpIHtcbiAgICB4LmxvY2FsVmFycyA9IFtdXG4gIH1cbiAgcmV0dXJuIHhcbn1cblxuZnVuY3Rpb24gcGNvbXBpbGUodXNlcl9hcmdzKSB7XG4gIHJldHVybiBjb21waWxlKHtcbiAgICBhcmdzOiAgICAgdXNlcl9hcmdzLmFyZ3MsXG4gICAgcHJlOiAgICAgIGZpeHVwKHVzZXJfYXJncy5wcmUpLFxuICAgIGJvZHk6ICAgICBmaXh1cCh1c2VyX2FyZ3MuYm9keSksXG4gICAgcG9zdDogICAgIGZpeHVwKHVzZXJfYXJncy5wcm9jKSxcbiAgICBmdW5jTmFtZTogdXNlcl9hcmdzLmZ1bmNOYW1lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG1ha2VPcCh1c2VyX2FyZ3MpIHtcbiAgdmFyIGFyZ3MgPSBbXVxuICBmb3IodmFyIGk9MDsgaTx1c2VyX2FyZ3MuYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGFyZ3MucHVzaChcImFcIitpKVxuICB9XG4gIHZhciB3cmFwcGVyID0gbmV3IEZ1bmN0aW9uKFwiUFwiLCBbXG4gICAgXCJyZXR1cm4gZnVuY3Rpb24gXCIsIHVzZXJfYXJncy5mdW5jTmFtZSwgXCJfbmRhcnJheW9wcyhcIiwgYXJncy5qb2luKFwiLFwiKSwgXCIpIHtQKFwiLCBhcmdzLmpvaW4oXCIsXCIpLCBcIik7cmV0dXJuIGEwfVwiXG4gIF0uam9pbihcIlwiKSlcbiAgcmV0dXJuIHdyYXBwZXIocGNvbXBpbGUodXNlcl9hcmdzKSlcbn1cblxudmFyIGFzc2lnbl9vcHMgPSB7XG4gIGFkZDogIFwiK1wiLFxuICBzdWI6ICBcIi1cIixcbiAgbXVsOiAgXCIqXCIsXG4gIGRpdjogIFwiL1wiLFxuICBtb2Q6ICBcIiVcIixcbiAgYmFuZDogXCImXCIsXG4gIGJvcjogIFwifFwiLFxuICBieG9yOiBcIl5cIixcbiAgbHNoaWZ0OiBcIjw8XCIsXG4gIHJzaGlmdDogXCI+PlwiLFxuICBycnNoaWZ0OiBcIj4+PlwiXG59XG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaWQgaW4gYXNzaWduX29wcykge1xuICAgIHZhciBvcCA9IGFzc2lnbl9vcHNbaWRdXG4gICAgZXhwb3J0c1tpZF0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCIsXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sXG4gICAgICAgICAgICAgYm9keTogXCJhPWJcIitvcCtcImNcIn0sXG4gICAgICBmdW5jTmFtZTogaWRcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhXCIrb3ArXCI9YlwifSxcbiAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgIGZ1bmNOYW1lOiBpZCtcImVxXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJzXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWJcIitvcCtcInNcIn0sXG4gICAgICBmdW5jTmFtZTogaWQrXCJzXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcInNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImFcIitvcCtcIj1zXCJ9LFxuICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgZnVuY05hbWU6IGlkK1wic2VxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgdW5hcnlfb3BzID0ge1xuICBub3Q6IFwiIVwiLFxuICBibm90OiBcIn5cIixcbiAgbmVnOiBcIi1cIixcbiAgcmVjaXA6IFwiMS4wL1wiXG59XG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaWQgaW4gdW5hcnlfb3BzKSB7XG4gICAgdmFyIG9wID0gdW5hcnlfb3BzW2lkXVxuICAgIGV4cG9ydHNbaWRdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPVwiK29wK1wiYlwifSxcbiAgICAgIGZ1bmNOYW1lOiBpZFxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1cIitvcCtcImFcIn0sXG4gICAgICBydmFsdWU6IHRydWUsXG4gICAgICBjb3VudDogMixcbiAgICAgIGZ1bmNOYW1lOiBpZCtcImVxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgYmluYXJ5X29wcyA9IHtcbiAgYW5kOiBcIiYmXCIsXG4gIG9yOiBcInx8XCIsXG4gIGVxOiBcIj09PVwiLFxuICBuZXE6IFwiIT09XCIsXG4gIGx0OiBcIjxcIixcbiAgZ3Q6IFwiPlwiLFxuICBsZXE6IFwiPD1cIixcbiAgZ2VxOiBcIj49XCJcbn1cbjsoZnVuY3Rpb24oKSB7XG4gIGZvcih2YXIgaWQgaW4gYmluYXJ5X29wcykge1xuICAgIHZhciBvcCA9IGJpbmFyeV9vcHNbaWRdXG4gICAgZXhwb3J0c1tpZF0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCIsXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCIsIFwiY1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1iXCIrb3ArXCJjXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic1wiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIixcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCIsIFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1iXCIrb3ArXCJzXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkK1wic1wiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wiZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWFcIitvcCtcImJcIn0sXG4gICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgIGNvdW50OjIsXG4gICAgICBmdW5jTmFtZTogaWQrXCJlcVwiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic2VxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1hXCIrb3ArXCJzXCJ9LFxuICAgICAgcnZhbHVlOnRydWUsXG4gICAgICBjb3VudDoyLFxuICAgICAgZnVuY05hbWU6IGlkK1wic2VxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF91bmFyeSA9IFtcbiAgXCJhYnNcIixcbiAgXCJhY29zXCIsXG4gIFwiYXNpblwiLFxuICBcImF0YW5cIixcbiAgXCJjZWlsXCIsXG4gIFwiY29zXCIsXG4gIFwiZXhwXCIsXG4gIFwiZmxvb3JcIixcbiAgXCJsb2dcIixcbiAgXCJyb3VuZFwiLFxuICBcInNpblwiLFxuICBcInNxcnRcIixcbiAgXCJ0YW5cIlxuXVxuOyhmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF91bmFyeS5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmID0gbWF0aF91bmFyeVtpXVxuICAgIGV4cG9ydHNbZl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczogW1wiYVwiXSwgYm9keTpcImE9dGhpc19mKGEpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wiZXFcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF9jb21tID0gW1xuICBcIm1heFwiLFxuICBcIm1pblwiLFxuICBcImF0YW4yXCIsXG4gIFwicG93XCJcbl1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF9jb21tLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGY9IG1hdGhfY29tbVtpXVxuICAgIGV4cG9ydHNbZl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGMpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZlxuICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wic1wiXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGMpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcInNcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGEsYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcInNlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihhLGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OjIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcInNlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF9ub25jb21tID0gW1xuICBcImF0YW4yXCIsXG4gIFwicG93XCJcbl1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF9ub25jb21tLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGY9IG1hdGhfbm9uY29tbVtpXVxuICAgIGV4cG9ydHNbZitcIm9wXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYyxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcHNcIl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYyxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcHNcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcGVxXCJdID0gbWFrZU9wKHsgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYixhKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wZXFcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcHNlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGEpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OjIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wc2VxXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gIH1cbn0pKCk7XG5cbmV4cG9ydHMuYW55ID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZTogRW1wdHlQcm9jLFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJpZihhKXtyZXR1cm4gdHJ1ZX1cIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W10sIGJvZHk6XCJyZXR1cm4gZmFsc2VcIn0sXG4gIGZ1bmNOYW1lOiBcImFueVwiXG59KVxuXG5leHBvcnRzLmFsbCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwieFwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIGJvZHk6IFwiaWYoIXgpe3JldHVybiBmYWxzZX1cIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W10sIGJvZHk6XCJyZXR1cm4gdHJ1ZVwifSxcbiAgZnVuY05hbWU6IFwiYWxsXCJcbn0pXG5cbmV4cG9ydHMuc3VtID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBib2R5OiBcInRoaXNfcys9YVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwic3VtXCJcbn0pXG5cbmV4cG9ydHMucHJvZCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0xXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJ0aGlzX3MqPWFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcInByb2RcIlxufSlcblxuZXhwb3J0cy5ub3JtMnNxdWFyZWQgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoyfV0sIGJvZHk6IFwidGhpc19zKz1hKmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm0yc3F1YXJlZFwiXG59KVxuICBcbmV4cG9ydHMubm9ybTIgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoyfV0sIGJvZHk6IFwidGhpc19zKz1hKmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiBNYXRoLnNxcnQodGhpc19zKVwifSxcbiAgZnVuY05hbWU6IFwibm9ybTJcIlxufSlcbiAgXG5cbmV4cG9ydHMubm9ybWluZiA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjR9XSwgYm9keTpcImlmKC1hPnRoaXNfcyl7dGhpc19zPS1hfWVsc2UgaWYoYT50aGlzX3Mpe3RoaXNfcz1hfVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwibm9ybWluZlwiXG59KVxuXG5leHBvcnRzLm5vcm0xID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6M31dLCBib2R5OiBcInRoaXNfcys9YTwwPy1hOmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm0xXCJcbn0pXG5cbmV4cG9ydHMuc3VwID0gY29tcGlsZSh7XG4gIGFyZ3M6IFsgXCJhcnJheVwiIF0sXG4gIHByZTpcbiAgIHsgYm9keTogXCJ0aGlzX2g9LUluZmluaXR5XCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgYm9keTpcbiAgIHsgYm9keTogXCJpZihfaW5saW5lXzFfYXJnMF8+dGhpc19oKXRoaXNfaD1faW5saW5lXzFfYXJnMF9cIixcbiAgICAgYXJnczogW3tcIm5hbWVcIjpcIl9pbmxpbmVfMV9hcmcwX1wiLFwibHZhbHVlXCI6ZmFsc2UsXCJydmFsdWVcIjp0cnVlLFwiY291bnRcIjoyfSBdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgcG9zdDpcbiAgIHsgYm9keTogXCJyZXR1cm4gdGhpc19oXCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfVxuIH0pXG5cbmV4cG9ydHMuaW5mID0gY29tcGlsZSh7XG4gIGFyZ3M6IFsgXCJhcnJheVwiIF0sXG4gIHByZTpcbiAgIHsgYm9keTogXCJ0aGlzX2g9SW5maW5pdHlcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBib2R5OlxuICAgeyBib2R5OiBcImlmKF9pbmxpbmVfMV9hcmcwXzx0aGlzX2gpdGhpc19oPV9pbmxpbmVfMV9hcmcwX1wiLFxuICAgICBhcmdzOiBbe1wibmFtZVwiOlwiX2lubGluZV8xX2FyZzBfXCIsXCJsdmFsdWVcIjpmYWxzZSxcInJ2YWx1ZVwiOnRydWUsXCJjb3VudFwiOjJ9IF0sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBwb3N0OlxuICAgeyBib2R5OiBcInJldHVybiB0aGlzX2hcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9XG4gfSlcblxuZXhwb3J0cy5hcmdtaW4gPSBjb21waWxlKHtcbiAgYXJnczpbXCJpbmRleFwiLFwiYXJyYXlcIixcInNoYXBlXCJdLFxuICBwcmU6e1xuICAgIGJvZHk6XCJ7dGhpc192PUluZmluaXR5O3RoaXNfaT1faW5saW5lXzBfYXJnMl8uc2xpY2UoMCl9XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcyX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoxfVxuICAgICAgXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W119LFxuICBib2R5OntcbiAgICBib2R5Olwie2lmKF9pbmxpbmVfMV9hcmcxXzx0aGlzX3Ype3RoaXNfdj1faW5saW5lXzFfYXJnMV87Zm9yKHZhciBfaW5saW5lXzFfaz0wO19pbmxpbmVfMV9rPF9pbmxpbmVfMV9hcmcwXy5sZW5ndGg7KytfaW5saW5lXzFfayl7dGhpc19pW19pbmxpbmVfMV9rXT1faW5saW5lXzFfYXJnMF9bX2lubGluZV8xX2tdfX19XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8xX2FyZzFfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjJ9XSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W1wiX2lubGluZV8xX2tcIl19LFxuICBwb3N0OntcbiAgICBib2R5Olwie3JldHVybiB0aGlzX2l9XCIsXG4gICAgYXJnczpbXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIl0sXG4gICAgbG9jYWxWYXJzOltdfVxufSlcblxuZXhwb3J0cy5hcmdtYXggPSBjb21waWxlKHtcbiAgYXJnczpbXCJpbmRleFwiLFwiYXJyYXlcIixcInNoYXBlXCJdLFxuICBwcmU6e1xuICAgIGJvZHk6XCJ7dGhpc192PS1JbmZpbml0eTt0aGlzX2k9X2lubGluZV8wX2FyZzJfLnNsaWNlKDApfVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMV9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMl9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6MX1cbiAgICAgIF0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltdfSxcbiAgYm9keTp7XG4gICAgYm9keTpcIntpZihfaW5saW5lXzFfYXJnMV8+dGhpc192KXt0aGlzX3Y9X2lubGluZV8xX2FyZzFfO2Zvcih2YXIgX2lubGluZV8xX2s9MDtfaW5saW5lXzFfazxfaW5saW5lXzFfYXJnMF8ubGVuZ3RoOysrX2lubGluZV8xX2spe3RoaXNfaVtfaW5saW5lXzFfa109X2lubGluZV8xX2FyZzBfW19pbmxpbmVfMV9rXX19fVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzFfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6Mn0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfV0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltcIl9pbmxpbmVfMV9rXCJdfSxcbiAgcG9zdDp7XG4gICAgYm9keTpcIntyZXR1cm4gdGhpc19pfVwiLFxuICAgIGFyZ3M6W10sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCJdLFxuICAgIGxvY2FsVmFyczpbXX1cbn0pICBcblxuZXhwb3J0cy5yYW5kb20gPSBtYWtlT3Aoe1xuICBhcmdzOiBbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLnJhbmRvbVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICBib2R5OiB7YXJnczogW1wiYVwiXSwgYm9keTpcImE9dGhpc19mKClcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgZnVuY05hbWU6IFwicmFuZG9tXCJcbn0pXG5cbmV4cG9ydHMuYXNzaWduID0gbWFrZU9wKHtcbiAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiXSwgYm9keTpcImE9YlwifSxcbiAgZnVuY05hbWU6IFwiYXNzaWduXCIgfSlcblxuZXhwb3J0cy5hc3NpZ25zID0gbWFrZU9wKHtcbiAgYXJnczpbXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIl0sIGJvZHk6XCJhPWJcIn0sXG4gIGZ1bmNOYW1lOiBcImFzc2lnbnNcIiB9KVxuXG5cbmV4cG9ydHMuZXF1YWxzID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgcHJlOiBFbXB0eVByb2MsXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcInhcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX0sXG4gICAgICAgICAgICAgICB7bmFtZTpcInlcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBcbiAgICAgICAgYm9keTogXCJpZih4IT09eSl7cmV0dXJuIGZhbHNlfVwiLCBcbiAgICAgICAgbG9jYWxWYXJzOiBbXSwgXG4gICAgICAgIHRoaXNWYXJzOiBbXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltdLCBib2R5OlwicmV0dXJuIHRydWVcIn0sXG4gIGZ1bmNOYW1lOiBcImVxdWFsc1wiXG59KVxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25kYXJyYXktb3BzL25kYXJyYXktb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBjcmVhdGVUaHVuayA9IHJlcXVpcmUoXCIuL2xpYi90aHVuay5qc1wiKVxuXG5mdW5jdGlvbiBQcm9jZWR1cmUoKSB7XG4gIHRoaXMuYXJnVHlwZXMgPSBbXVxuICB0aGlzLnNoaW1BcmdzID0gW11cbiAgdGhpcy5hcnJheUFyZ3MgPSBbXVxuICB0aGlzLmFycmF5QmxvY2tJbmRpY2VzID0gW11cbiAgdGhpcy5zY2FsYXJBcmdzID0gW11cbiAgdGhpcy5vZmZzZXRBcmdzID0gW11cbiAgdGhpcy5vZmZzZXRBcmdJbmRleCA9IFtdXG4gIHRoaXMuaW5kZXhBcmdzID0gW11cbiAgdGhpcy5zaGFwZUFyZ3MgPSBbXVxuICB0aGlzLmZ1bmNOYW1lID0gXCJcIlxuICB0aGlzLnByZSA9IG51bGxcbiAgdGhpcy5ib2R5ID0gbnVsbFxuICB0aGlzLnBvc3QgPSBudWxsXG4gIHRoaXMuZGVidWcgPSBmYWxzZVxufVxuXG5mdW5jdGlvbiBjb21waWxlQ3dpc2UodXNlcl9hcmdzKSB7XG4gIC8vQ3JlYXRlIHByb2NlZHVyZVxuICB2YXIgcHJvYyA9IG5ldyBQcm9jZWR1cmUoKVxuICBcbiAgLy9QYXJzZSBibG9ja3NcbiAgcHJvYy5wcmUgICAgPSB1c2VyX2FyZ3MucHJlXG4gIHByb2MuYm9keSAgID0gdXNlcl9hcmdzLmJvZHlcbiAgcHJvYy5wb3N0ICAgPSB1c2VyX2FyZ3MucG9zdFxuXG4gIC8vUGFyc2UgYXJndW1lbnRzXG4gIHZhciBwcm9jX2FyZ3MgPSB1c2VyX2FyZ3MuYXJncy5zbGljZSgwKVxuICBwcm9jLmFyZ1R5cGVzID0gcHJvY19hcmdzXG4gIGZvcih2YXIgaT0wOyBpPHByb2NfYXJncy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhcmdfdHlwZSA9IHByb2NfYXJnc1tpXVxuICAgIGlmKGFyZ190eXBlID09PSBcImFycmF5XCIgfHwgKHR5cGVvZiBhcmdfdHlwZSA9PT0gXCJvYmplY3RcIiAmJiBhcmdfdHlwZS5ibG9ja0luZGljZXMpKSB7XG4gICAgICBwcm9jLmFyZ1R5cGVzW2ldID0gXCJhcnJheVwiXG4gICAgICBwcm9jLmFycmF5QXJncy5wdXNoKGkpXG4gICAgICBwcm9jLmFycmF5QmxvY2tJbmRpY2VzLnB1c2goYXJnX3R5cGUuYmxvY2tJbmRpY2VzID8gYXJnX3R5cGUuYmxvY2tJbmRpY2VzIDogMClcbiAgICAgIHByb2Muc2hpbUFyZ3MucHVzaChcImFycmF5XCIgKyBpKVxuICAgICAgaWYoaSA8IHByb2MucHJlLmFyZ3MubGVuZ3RoICYmIHByb2MucHJlLmFyZ3NbaV0uY291bnQ+MCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcHJlKCkgYmxvY2sgbWF5IG5vdCByZWZlcmVuY2UgYXJyYXkgYXJnc1wiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MucG9zdC5hcmdzLmxlbmd0aCAmJiBwcm9jLnBvc3QuYXJnc1tpXS5jb3VudD4wKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwb3N0KCkgYmxvY2sgbWF5IG5vdCByZWZlcmVuY2UgYXJyYXkgYXJnc1wiKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZihhcmdfdHlwZSA9PT0gXCJzY2FsYXJcIikge1xuICAgICAgcHJvYy5zY2FsYXJBcmdzLnB1c2goaSlcbiAgICAgIHByb2Muc2hpbUFyZ3MucHVzaChcInNjYWxhclwiICsgaSlcbiAgICB9IGVsc2UgaWYoYXJnX3R5cGUgPT09IFwiaW5kZXhcIikge1xuICAgICAgcHJvYy5pbmRleEFyZ3MucHVzaChpKVxuICAgICAgaWYoaSA8IHByb2MucHJlLmFyZ3MubGVuZ3RoICYmIHByb2MucHJlLmFyZ3NbaV0uY291bnQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwcmUoKSBibG9jayBtYXkgbm90IHJlZmVyZW5jZSBhcnJheSBpbmRleFwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MuYm9keS5hcmdzLmxlbmd0aCAmJiBwcm9jLmJvZHkuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IGJvZHkoKSBibG9jayBtYXkgbm90IHdyaXRlIHRvIGFycmF5IGluZGV4XCIpXG4gICAgICB9XG4gICAgICBpZihpIDwgcHJvYy5wb3N0LmFyZ3MubGVuZ3RoICYmIHByb2MucG9zdC5hcmdzW2ldLmNvdW50ID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcG9zdCgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGluZGV4XCIpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGFyZ190eXBlID09PSBcInNoYXBlXCIpIHtcbiAgICAgIHByb2Muc2hhcGVBcmdzLnB1c2goaSlcbiAgICAgIGlmKGkgPCBwcm9jLnByZS5hcmdzLmxlbmd0aCAmJiBwcm9jLnByZS5hcmdzW2ldLmx2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcHJlKCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBzaGFwZVwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MuYm9keS5hcmdzLmxlbmd0aCAmJiBwcm9jLmJvZHkuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IGJvZHkoKSBibG9jayBtYXkgbm90IHdyaXRlIHRvIGFycmF5IHNoYXBlXCIpXG4gICAgICB9XG4gICAgICBpZihpIDwgcHJvYy5wb3N0LmFyZ3MubGVuZ3RoICYmIHByb2MucG9zdC5hcmdzW2ldLmx2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcG9zdCgpIGJsb2NrIG1heSBub3Qgd3JpdGUgdG8gYXJyYXkgc2hhcGVcIilcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYodHlwZW9mIGFyZ190eXBlID09PSBcIm9iamVjdFwiICYmIGFyZ190eXBlLm9mZnNldCkge1xuICAgICAgcHJvYy5hcmdUeXBlc1tpXSA9IFwib2Zmc2V0XCJcbiAgICAgIHByb2Mub2Zmc2V0QXJncy5wdXNoKHsgYXJyYXk6IGFyZ190eXBlLmFycmF5LCBvZmZzZXQ6YXJnX3R5cGUub2Zmc2V0IH0pXG4gICAgICBwcm9jLm9mZnNldEFyZ0luZGV4LnB1c2goaSlcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IFVua25vd24gYXJndW1lbnQgdHlwZSBcIiArIHByb2NfYXJnc1tpXSlcbiAgICB9XG4gIH1cbiAgXG4gIC8vTWFrZSBzdXJlIGF0IGxlYXN0IG9uZSBhcnJheSBhcmd1bWVudCB3YXMgc3BlY2lmaWVkXG4gIGlmKHByb2MuYXJyYXlBcmdzLmxlbmd0aCA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IE5vIGFycmF5IGFyZ3VtZW50cyBzcGVjaWZpZWRcIilcbiAgfVxuICBcbiAgLy9NYWtlIHN1cmUgYXJndW1lbnRzIGFyZSBjb3JyZWN0XG4gIGlmKHByb2MucHJlLmFyZ3MubGVuZ3RoID4gcHJvY19hcmdzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBUb28gbWFueSBhcmd1bWVudHMgaW4gcHJlKCkgYmxvY2tcIilcbiAgfVxuICBpZihwcm9jLmJvZHkuYXJncy5sZW5ndGggPiBwcm9jX2FyZ3MubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IFRvbyBtYW55IGFyZ3VtZW50cyBpbiBib2R5KCkgYmxvY2tcIilcbiAgfVxuICBpZihwcm9jLnBvc3QuYXJncy5sZW5ndGggPiBwcm9jX2FyZ3MubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IFRvbyBtYW55IGFyZ3VtZW50cyBpbiBwb3N0KCkgYmxvY2tcIilcbiAgfVxuXG4gIC8vQ2hlY2sgZGVidWcgZmxhZ1xuICBwcm9jLmRlYnVnID0gISF1c2VyX2FyZ3MucHJpbnRDb2RlIHx8ICEhdXNlcl9hcmdzLmRlYnVnXG4gIFxuICAvL1JldHJpZXZlIG5hbWVcbiAgcHJvYy5mdW5jTmFtZSA9IHVzZXJfYXJncy5mdW5jTmFtZSB8fCBcImN3aXNlXCJcbiAgXG4gIC8vUmVhZCBpbiBibG9jayBzaXplXG4gIHByb2MuYmxvY2tTaXplID0gdXNlcl9hcmdzLmJsb2NrU2l6ZSB8fCA2NFxuXG4gIHJldHVybiBjcmVhdGVUaHVuayhwcm9jKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbXBpbGVDd2lzZVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvY29tcGlsZXIuanNcbi8vIG1vZHVsZSBpZCA9IDUwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuLy8gVGhlIGZ1bmN0aW9uIGJlbG93IGlzIGNhbGxlZCB3aGVuIGNvbnN0cnVjdGluZyBhIGN3aXNlIGZ1bmN0aW9uIG9iamVjdCwgYW5kIGRvZXMgdGhlIGZvbGxvd2luZzpcbi8vIEEgZnVuY3Rpb24gb2JqZWN0IGlzIGNvbnN0cnVjdGVkIHdoaWNoIGFjY2VwdHMgYXMgYXJndW1lbnQgYSBjb21waWxhdGlvbiBmdW5jdGlvbiBhbmQgcmV0dXJucyBhbm90aGVyIGZ1bmN0aW9uLlxuLy8gSXQgaXMgdGhpcyBvdGhlciBmdW5jdGlvbiB0aGF0IGlzIGV2ZW50dWFsbHkgcmV0dXJuZWQgYnkgY3JlYXRlVGh1bmssIGFuZCB0aGlzIGZ1bmN0aW9uIGlzIHRoZSBvbmUgdGhhdCBhY3R1YWxseVxuLy8gY2hlY2tzIHdoZXRoZXIgYSBjZXJ0YWluIHBhdHRlcm4gb2YgYXJndW1lbnRzIGhhcyBhbHJlYWR5IGJlZW4gdXNlZCBiZWZvcmUgYW5kIGNvbXBpbGVzIG5ldyBsb29wcyBhcyBuZWVkZWQuXG4vLyBUaGUgY29tcGlsYXRpb24gcGFzc2VkIHRvIHRoZSBmaXJzdCBmdW5jdGlvbiBvYmplY3QgaXMgdXNlZCBmb3IgY29tcGlsaW5nIG5ldyBmdW5jdGlvbnMuXG4vLyBPbmNlIHRoaXMgZnVuY3Rpb24gb2JqZWN0IGlzIGNyZWF0ZWQsIGl0IGlzIGNhbGxlZCB3aXRoIGNvbXBpbGUgYXMgYXJndW1lbnQsIHdoZXJlIHRoZSBmaXJzdCBhcmd1bWVudCBvZiBjb21waWxlXG4vLyBpcyBib3VuZCB0byBcInByb2NcIiAoZXNzZW50aWFsbHkgY29udGFpbmluZyBhIHByZXByb2Nlc3NlZCB2ZXJzaW9uIG9mIHRoZSB1c2VyIGFyZ3VtZW50cyB0byBjd2lzZSkuXG4vLyBTbyBjcmVhdGVUaHVuayByb3VnaGx5IHdvcmtzIGxpa2UgdGhpczpcbi8vIGZ1bmN0aW9uIGNyZWF0ZVRodW5rKHByb2MpIHtcbi8vICAgdmFyIHRodW5rID0gZnVuY3Rpb24oY29tcGlsZUJvdW5kKSB7XG4vLyAgICAgdmFyIENBQ0hFRCA9IHt9XG4vLyAgICAgcmV0dXJuIGZ1bmN0aW9uKGFycmF5cyBhbmQgc2NhbGFycykge1xuLy8gICAgICAgaWYgKGR0eXBlIGFuZCBvcmRlciBvZiBhcnJheXMgaW4gQ0FDSEVEKSB7XG4vLyAgICAgICAgIHZhciBmdW5jID0gQ0FDSEVEW2R0eXBlIGFuZCBvcmRlciBvZiBhcnJheXNdXG4vLyAgICAgICB9IGVsc2Uge1xuLy8gICAgICAgICB2YXIgZnVuYyA9IENBQ0hFRFtkdHlwZSBhbmQgb3JkZXIgb2YgYXJyYXlzXSA9IGNvbXBpbGVCb3VuZChkdHlwZSBhbmQgb3JkZXIgb2YgYXJyYXlzKVxuLy8gICAgICAgfVxuLy8gICAgICAgcmV0dXJuIGZ1bmMoYXJyYXlzIGFuZCBzY2FsYXJzKVxuLy8gICAgIH1cbi8vICAgfVxuLy8gICByZXR1cm4gdGh1bmsoY29tcGlsZS5iaW5kMShwcm9jKSlcbi8vIH1cblxudmFyIGNvbXBpbGUgPSByZXF1aXJlKFwiLi9jb21waWxlLmpzXCIpXG5cbmZ1bmN0aW9uIGNyZWF0ZVRodW5rKHByb2MpIHtcbiAgdmFyIGNvZGUgPSBbXCIndXNlIHN0cmljdCdcIiwgXCJ2YXIgQ0FDSEVEPXt9XCJdXG4gIHZhciB2YXJzID0gW11cbiAgdmFyIHRodW5rTmFtZSA9IHByb2MuZnVuY05hbWUgKyBcIl9jd2lzZV90aHVua1wiXG4gIFxuICAvL0J1aWxkIHRodW5rXG4gIGNvZGUucHVzaChbXCJyZXR1cm4gZnVuY3Rpb24gXCIsIHRodW5rTmFtZSwgXCIoXCIsIHByb2Muc2hpbUFyZ3Muam9pbihcIixcIiksIFwiKXtcIl0uam9pbihcIlwiKSlcbiAgdmFyIHR5cGVzaWcgPSBbXVxuICB2YXIgc3RyaW5nX3R5cGVzaWcgPSBbXVxuICB2YXIgcHJvY19hcmdzID0gW1tcImFycmF5XCIscHJvYy5hcnJheUFyZ3NbMF0sXCIuc2hhcGUuc2xpY2UoXCIsIC8vIFNsaWNlIHNoYXBlIHNvIHRoYXQgd2Ugb25seSByZXRhaW4gdGhlIHNoYXBlIG92ZXIgd2hpY2ggd2UgaXRlcmF0ZSAod2hpY2ggZ2V0cyBwYXNzZWQgdG8gdGhlIGN3aXNlIG9wZXJhdG9yIGFzIFNTKS5cbiAgICAgICAgICAgICAgICAgICAgTWF0aC5tYXgoMCxwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKSxwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdPDA/KFwiLFwiK3Byb2MuYXJyYXlCbG9ja0luZGljZXNbMF0rXCIpXCIpOlwiKVwiXS5qb2luKFwiXCIpXVxuICB2YXIgc2hhcGVMZW5ndGhDb25kaXRpb25zID0gW10sIHNoYXBlQ29uZGl0aW9ucyA9IFtdXG4gIC8vIFByb2Nlc3MgYXJyYXkgYXJndW1lbnRzXG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGogPSBwcm9jLmFycmF5QXJnc1tpXVxuICAgIHZhcnMucHVzaChbXCJ0XCIsIGosIFwiPWFycmF5XCIsIGosIFwiLmR0eXBlLFwiLFxuICAgICAgICAgICAgICAgXCJyXCIsIGosIFwiPWFycmF5XCIsIGosIFwiLm9yZGVyXCJdLmpvaW4oXCJcIikpXG4gICAgdHlwZXNpZy5wdXNoKFwidFwiICsgailcbiAgICB0eXBlc2lnLnB1c2goXCJyXCIgKyBqKVxuICAgIHN0cmluZ190eXBlc2lnLnB1c2goXCJ0XCIrailcbiAgICBzdHJpbmdfdHlwZXNpZy5wdXNoKFwiclwiK2orXCIuam9pbigpXCIpXG4gICAgcHJvY19hcmdzLnB1c2goXCJhcnJheVwiICsgaiArIFwiLmRhdGFcIilcbiAgICBwcm9jX2FyZ3MucHVzaChcImFycmF5XCIgKyBqICsgXCIuc3RyaWRlXCIpXG4gICAgcHJvY19hcmdzLnB1c2goXCJhcnJheVwiICsgaiArIFwiLm9mZnNldHwwXCIpXG4gICAgaWYgKGk+MCkgeyAvLyBHYXRoZXIgY29uZGl0aW9ucyB0byBjaGVjayBmb3Igc2hhcGUgZXF1YWxpdHkgKGlnbm9yaW5nIGJsb2NrIGluZGljZXMpXG4gICAgICBzaGFwZUxlbmd0aENvbmRpdGlvbnMucHVzaChcImFycmF5XCIgKyBwcm9jLmFycmF5QXJnc1swXSArIFwiLnNoYXBlLmxlbmd0aD09PWFycmF5XCIgKyBqICsgXCIuc2hhcGUubGVuZ3RoK1wiICsgKE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pLU1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pKSlcbiAgICAgIHNoYXBlQ29uZGl0aW9ucy5wdXNoKFwiYXJyYXlcIiArIHByb2MuYXJyYXlBcmdzWzBdICsgXCIuc2hhcGVbc2hhcGVJbmRleCtcIiArIE1hdGgubWF4KDAscHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkgKyBcIl09PT1hcnJheVwiICsgaiArIFwiLnNoYXBlW3NoYXBlSW5kZXgrXCIgKyBNYXRoLm1heCgwLHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pICsgXCJdXCIpXG4gICAgfVxuICB9XG4gIC8vIENoZWNrIGZvciBzaGFwZSBlcXVhbGl0eVxuICBpZiAocHJvYy5hcnJheUFyZ3MubGVuZ3RoID4gMSkge1xuICAgIGNvZGUucHVzaChcImlmICghKFwiICsgc2hhcGVMZW5ndGhDb25kaXRpb25zLmpvaW4oXCIgJiYgXCIpICsgXCIpKSB0aHJvdyBuZXcgRXJyb3IoJ2N3aXNlOiBBcnJheXMgZG8gbm90IGFsbCBoYXZlIHRoZSBzYW1lIGRpbWVuc2lvbmFsaXR5IScpXCIpXG4gICAgY29kZS5wdXNoKFwiZm9yKHZhciBzaGFwZUluZGV4PWFycmF5XCIgKyBwcm9jLmFycmF5QXJnc1swXSArIFwiLnNoYXBlLmxlbmd0aC1cIiArIE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pICsgXCI7IHNoYXBlSW5kZXgtLT4wOykge1wiKVxuICAgIGNvZGUucHVzaChcImlmICghKFwiICsgc2hhcGVDb25kaXRpb25zLmpvaW4oXCIgJiYgXCIpICsgXCIpKSB0aHJvdyBuZXcgRXJyb3IoJ2N3aXNlOiBBcnJheXMgZG8gbm90IGFsbCBoYXZlIHRoZSBzYW1lIHNoYXBlIScpXCIpXG4gICAgY29kZS5wdXNoKFwifVwiKVxuICB9XG4gIC8vIFByb2Nlc3Mgc2NhbGFyIGFyZ3VtZW50c1xuICBmb3IodmFyIGk9MDsgaTxwcm9jLnNjYWxhckFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBwcm9jX2FyZ3MucHVzaChcInNjYWxhclwiICsgcHJvYy5zY2FsYXJBcmdzW2ldKVxuICB9XG4gIC8vIENoZWNrIGZvciBjYWNoZWQgZnVuY3Rpb24gKGFuZCBpZiBub3QgcHJlc2VudCwgZ2VuZXJhdGUgaXQpXG4gIHZhcnMucHVzaChbXCJ0eXBlPVtcIiwgc3RyaW5nX3R5cGVzaWcuam9pbihcIixcIiksIFwiXS5qb2luKClcIl0uam9pbihcIlwiKSlcbiAgdmFycy5wdXNoKFwicHJvYz1DQUNIRURbdHlwZV1cIilcbiAgY29kZS5wdXNoKFwidmFyIFwiICsgdmFycy5qb2luKFwiLFwiKSlcbiAgXG4gIGNvZGUucHVzaChbXCJpZighcHJvYyl7XCIsXG4gICAgICAgICAgICAgXCJDQUNIRURbdHlwZV09cHJvYz1jb21waWxlKFtcIiwgdHlwZXNpZy5qb2luKFwiLFwiKSwgXCJdKX1cIixcbiAgICAgICAgICAgICBcInJldHVybiBwcm9jKFwiLCBwcm9jX2FyZ3Muam9pbihcIixcIiksIFwiKX1cIl0uam9pbihcIlwiKSlcblxuICBpZihwcm9jLmRlYnVnKSB7XG4gICAgY29uc29sZS5sb2coXCItLS0tLUdlbmVyYXRlZCB0aHVuazpcXG5cIiArIGNvZGUuam9pbihcIlxcblwiKSArIFwiXFxuLS0tLS0tLS0tLVwiKVxuICB9XG4gIFxuICAvL0NvbXBpbGUgdGh1bmtcbiAgdmFyIHRodW5rID0gbmV3IEZ1bmN0aW9uKFwiY29tcGlsZVwiLCBjb2RlLmpvaW4oXCJcXG5cIikpXG4gIHJldHVybiB0aHVuayhjb21waWxlLmJpbmQodW5kZWZpbmVkLCBwcm9jKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVUaHVua1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL3RodW5rLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciB1bmlxID0gcmVxdWlyZShcInVuaXFcIilcblxuLy8gVGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgdmVyeSBzaW1wbGUgbG9vcHMgYW5hbG9nb3VzIHRvIGhvdyB5b3UgdHlwaWNhbGx5IHRyYXZlcnNlIGFycmF5cyAodGhlIG91dGVybW9zdCBsb29wIGNvcnJlc3BvbmRzIHRvIHRoZSBzbG93ZXN0IGNoYW5naW5nIGluZGV4LCB0aGUgaW5uZXJtb3N0IGxvb3AgdG8gdGhlIGZhc3Rlc3QgY2hhbmdpbmcgaW5kZXgpXG4vLyBUT0RPOiBJZiB0d28gYXJyYXlzIGhhdmUgdGhlIHNhbWUgc3RyaWRlcyAoYW5kIG9mZnNldHMpIHRoZXJlIGlzIHBvdGVudGlhbCBmb3IgZGVjcmVhc2luZyB0aGUgbnVtYmVyIG9mIFwicG9pbnRlcnNcIiBhbmQgcmVsYXRlZCB2YXJpYWJsZXMuIFRoZSBkcmF3YmFjayBpcyB0aGF0IHRoZSB0eXBlIHNpZ25hdHVyZSB3b3VsZCBiZWNvbWUgbW9yZSBzcGVjaWZpYyBhbmQgdGhhdCB0aGVyZSB3b3VsZCB0aHVzIGJlIGxlc3MgcG90ZW50aWFsIGZvciBjYWNoaW5nLCBidXQgaXQgbWlnaHQgc3RpbGwgYmUgd29ydGggaXQsIGVzcGVjaWFsbHkgd2hlbiBkZWFsaW5nIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBhcmd1bWVudHMuXG5mdW5jdGlvbiBpbm5lckZpbGwob3JkZXIsIHByb2MsIGJvZHkpIHtcbiAgdmFyIGRpbWVuc2lvbiA9IG9yZGVyLmxlbmd0aFxuICAgICwgbmFyZ3MgPSBwcm9jLmFycmF5QXJncy5sZW5ndGhcbiAgICAsIGhhc19pbmRleCA9IHByb2MuaW5kZXhBcmdzLmxlbmd0aD4wXG4gICAgLCBjb2RlID0gW11cbiAgICAsIHZhcnMgPSBbXVxuICAgICwgaWR4PTAsIHBpZHg9MCwgaSwgalxuICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7IC8vIEl0ZXJhdGlvbiB2YXJpYWJsZXNcbiAgICB2YXJzLnB1c2goW1wiaVwiLGksXCI9MFwiXS5qb2luKFwiXCIpKVxuICB9XG4gIC8vQ29tcHV0ZSBzY2FuIGRlbHRhc1xuICBmb3Ioaj0wOyBqPG5hcmdzOyArK2opIHtcbiAgICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICBwaWR4ID0gaWR4XG4gICAgICBpZHggPSBvcmRlcltpXVxuICAgICAgaWYoaSA9PT0gMCkgeyAvLyBUaGUgaW5uZXJtb3N0L2Zhc3Rlc3QgZGltZW5zaW9uJ3MgZGVsdGEgaXMgc2ltcGx5IGl0cyBzdHJpZGVcbiAgICAgICAgdmFycy5wdXNoKFtcImRcIixqLFwic1wiLGksXCI9dFwiLGosXCJwXCIsaWR4XS5qb2luKFwiXCIpKVxuICAgICAgfSBlbHNlIHsgLy8gRm9yIG90aGVyIGRpbWVuc2lvbnMgdGhlIGRlbHRhIGlzIGJhc2ljYWxseSB0aGUgc3RyaWRlIG1pbnVzIHNvbWV0aGluZyB3aGljaCBlc3NlbnRpYWxseSBcInJld2luZHNcIiB0aGUgcHJldmlvdXMgKG1vcmUgaW5uZXIpIGRpbWVuc2lvblxuICAgICAgICB2YXJzLnB1c2goW1wiZFwiLGosXCJzXCIsaSxcIj0odFwiLGosXCJwXCIsaWR4LFwiLXNcIixwaWR4LFwiKnRcIixqLFwicFwiLHBpZHgsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh2YXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICB9ICBcbiAgLy9TY2FuIGxvb3BcbiAgZm9yKGk9ZGltZW5zaW9uLTE7IGk+PTA7IC0taSkgeyAvLyBTdGFydCBhdCBsYXJnZXN0IHN0cmlkZSBhbmQgd29yayB5b3VyIHdheSBpbndhcmRzXG4gICAgaWR4ID0gb3JkZXJbaV1cbiAgICBjb2RlLnB1c2goW1wiZm9yKGlcIixpLFwiPTA7aVwiLGksXCI8c1wiLGlkeCxcIjsrK2lcIixpLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgfVxuICAvL1B1c2ggYm9keSBvZiBpbm5lciBsb29wXG4gIGNvZGUucHVzaChib2R5KVxuICAvL0FkdmFuY2Ugc2NhbiBwb2ludGVyc1xuICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgcGlkeCA9IGlkeFxuICAgIGlkeCA9IG9yZGVyW2ldXG4gICAgZm9yKGo9MDsgajxuYXJnczsgKytqKSB7XG4gICAgICBjb2RlLnB1c2goW1wicFwiLGosXCIrPWRcIixqLFwic1wiLGldLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIGlmKGhhc19pbmRleCkge1xuICAgICAgaWYoaSA+IDApIHtcbiAgICAgICAgY29kZS5wdXNoKFtcImluZGV4W1wiLHBpZHgsXCJdLT1zXCIscGlkeF0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCIrK2luZGV4W1wiLGlkeCxcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFwifVwiKVxuICB9XG4gIHJldHVybiBjb2RlLmpvaW4oXCJcXG5cIilcbn1cblxuLy8gR2VuZXJhdGUgXCJvdXRlclwiIGxvb3BzIHRoYXQgbG9vcCBvdmVyIGJsb2NrcyBvZiBkYXRhLCBhcHBseWluZyBcImlubmVyXCIgbG9vcHMgdG8gdGhlIGJsb2NrcyBieSBtYW5pcHVsYXRpbmcgdGhlIGxvY2FsIHZhcmlhYmxlcyBpbiBzdWNoIGEgd2F5IHRoYXQgdGhlIGlubmVyIGxvb3Agb25seSBcInNlZXNcIiB0aGUgY3VycmVudCBibG9jay5cbi8vIFRPRE86IElmIHRoaXMgaXMgdXNlZCwgdGhlbiB0aGUgcHJldmlvdXMgZGVjbGFyYXRpb24gKGRvbmUgYnkgZ2VuZXJhdGVDd2lzZU9wKSBvZiBzKiBpcyBlc3NlbnRpYWxseSB1bm5lY2Vzc2FyeS5cbi8vICAgICAgIEkgYmVsaWV2ZSB0aGUgcyogYXJlIG5vdCB1c2VkIGVsc2V3aGVyZSAoaW4gcGFydGljdWxhciwgSSBkb24ndCB0aGluayB0aGV5J3JlIHVzZWQgaW4gdGhlIHByZS9wb3N0IHBhcnRzIGFuZCBcInNoYXBlXCIgaXMgZGVmaW5lZCBpbmRlcGVuZGVudGx5KSwgc28gaXQgd291bGQgYmUgcG9zc2libGUgdG8gbWFrZSBkZWZpbmluZyB0aGUgcyogZGVwZW5kZW50IG9uIHdoYXQgbG9vcCBtZXRob2QgaXMgYmVpbmcgdXNlZC5cbmZ1bmN0aW9uIG91dGVyRmlsbChtYXRjaGVkLCBvcmRlciwgcHJvYywgYm9keSkge1xuICB2YXIgZGltZW5zaW9uID0gb3JkZXIubGVuZ3RoXG4gICAgLCBuYXJncyA9IHByb2MuYXJyYXlBcmdzLmxlbmd0aFxuICAgICwgYmxvY2tTaXplID0gcHJvYy5ibG9ja1NpemVcbiAgICAsIGhhc19pbmRleCA9IHByb2MuaW5kZXhBcmdzLmxlbmd0aCA+IDBcbiAgICAsIGNvZGUgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxuYXJnczsgKytpKSB7XG4gICAgY29kZS5wdXNoKFtcInZhciBvZmZzZXRcIixpLFwiPXBcIixpXS5qb2luKFwiXCIpKVxuICB9XG4gIC8vR2VuZXJhdGUgbG9vcHMgZm9yIHVubWF0Y2hlZCBkaW1lbnNpb25zXG4gIC8vIFRoZSBvcmRlciBpbiB3aGljaCB0aGVzZSBkaW1lbnNpb25zIGFyZSB0cmF2ZXJzZWQgaXMgZmFpcmx5IGFyYml0cmFyeSAoZnJvbSBzbWFsbCBzdHJpZGUgdG8gbGFyZ2Ugc3RyaWRlLCBmb3IgdGhlIGZpcnN0IGFyZ3VtZW50KVxuICAvLyBUT0RPOiBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoZSBvcmRlciBpbiB3aGljaCB0aGVzZSBsb29wcyBhcmUgcGxhY2VkIHdvdWxkIGFsc28gYmUgc29tZWhvdyBcIm9wdGltYWxcIiAoYXQgdGhlIHZlcnkgbGVhc3Qgd2Ugc2hvdWxkIGNoZWNrIHRoYXQgaXQgcmVhbGx5IGRvZXNuJ3QgaHVydCB1cyBpZiB0aGV5J3JlIG5vdCkuXG4gIGZvcih2YXIgaT1tYXRjaGVkOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFtcImZvcih2YXIgalwiK2krXCI9U1NbXCIsIG9yZGVyW2ldLCBcIl18MDtqXCIsIGksIFwiPjA7KXtcIl0uam9pbihcIlwiKSkgLy8gSXRlcmF0ZSBiYWNrIHRvIGZyb250XG4gICAgY29kZS5wdXNoKFtcImlmKGpcIixpLFwiPFwiLGJsb2NrU2l6ZSxcIil7XCJdLmpvaW4oXCJcIikpIC8vIEVpdGhlciBkZWNyZWFzZSBqIGJ5IGJsb2NrU2l6ZSAocyA9IGJsb2NrU2l6ZSksIG9yIHNldCBpdCB0byB6ZXJvIChhZnRlciBzZXR0aW5nIHMgPSBqKS5cbiAgICBjb2RlLnB1c2goW1wic1wiLG9yZGVyW2ldLFwiPWpcIixpXS5qb2luKFwiXCIpKVxuICAgIGNvZGUucHVzaChbXCJqXCIsaSxcIj0wXCJdLmpvaW4oXCJcIikpXG4gICAgY29kZS5wdXNoKFtcIn1lbHNle3NcIixvcmRlcltpXSxcIj1cIixibG9ja1NpemVdLmpvaW4oXCJcIikpXG4gICAgY29kZS5wdXNoKFtcImpcIixpLFwiLT1cIixibG9ja1NpemUsXCJ9XCJdLmpvaW4oXCJcIikpXG4gICAgaWYoaGFzX2luZGV4KSB7XG4gICAgICBjb2RlLnB1c2goW1wiaW5kZXhbXCIsb3JkZXJbaV0sXCJdPWpcIixpXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBmb3IodmFyIGk9MDsgaTxuYXJnczsgKytpKSB7XG4gICAgdmFyIGluZGV4U3RyID0gW1wib2Zmc2V0XCIraV1cbiAgICBmb3IodmFyIGo9bWF0Y2hlZDsgajxkaW1lbnNpb247ICsraikge1xuICAgICAgaW5kZXhTdHIucHVzaChbXCJqXCIsaixcIip0XCIsaSxcInBcIixvcmRlcltqXV0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFtcInBcIixpLFwiPShcIixpbmRleFN0ci5qb2luKFwiK1wiKSxcIilcIl0uam9pbihcIlwiKSlcbiAgfVxuICBjb2RlLnB1c2goaW5uZXJGaWxsKG9yZGVyLCBwcm9jLCBib2R5KSlcbiAgZm9yKHZhciBpPW1hdGNoZWQ7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIH1cbiAgcmV0dXJuIGNvZGUuam9pbihcIlxcblwiKVxufVxuXG4vL0NvdW50IHRoZSBudW1iZXIgb2YgY29tcGF0aWJsZSBpbm5lciBvcmRlcnNcbi8vIFRoaXMgaXMgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBjb21tb24gcHJlZml4IG9mIHRoZSBhcnJheXMgaW4gb3JkZXJzLlxuLy8gRWFjaCBhcnJheSBpbiBvcmRlcnMgbGlzdHMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNvcnJlc3BvbmQgbmRhcnJheSBpbiBvcmRlciBvZiBpbmNyZWFzaW5nIHN0cmlkZS5cbi8vIFRoaXMgaXMgdGh1cyB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGltZW5zaW9ucyB0aGF0IGNhbiBiZSBlZmZpY2llbnRseSB0cmF2ZXJzZWQgYnkgc2ltcGxlIG5lc3RlZCBsb29wcyBmb3IgYWxsIGFycmF5cy5cbmZ1bmN0aW9uIGNvdW50TWF0Y2hlcyhvcmRlcnMpIHtcbiAgdmFyIG1hdGNoZWQgPSAwLCBkaW1lbnNpb24gPSBvcmRlcnNbMF0ubGVuZ3RoXG4gIHdoaWxlKG1hdGNoZWQgPCBkaW1lbnNpb24pIHtcbiAgICBmb3IodmFyIGo9MTsgajxvcmRlcnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKG9yZGVyc1tqXVttYXRjaGVkXSAhPT0gb3JkZXJzWzBdW21hdGNoZWRdKSB7XG4gICAgICAgIHJldHVybiBtYXRjaGVkXG4gICAgICB9XG4gICAgfVxuICAgICsrbWF0Y2hlZFxuICB9XG4gIHJldHVybiBtYXRjaGVkXG59XG5cbi8vUHJvY2Vzc2VzIGEgYmxvY2sgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBkYXRhIHR5cGVzXG4vLyBSZXBsYWNlcyB2YXJpYWJsZSBuYW1lcyBieSBkaWZmZXJlbnQgb25lcywgZWl0aGVyIFwibG9jYWxcIiBvbmVzICh0aGF0IGFyZSB0aGVuIGZlcnJpZWQgaW4gYW5kIG91dCBvZiB0aGUgZ2l2ZW4gYXJyYXkpIG9yIG9uZXMgbWF0Y2hpbmcgdGhlIGFyZ3VtZW50cyB0aGF0IHRoZSBmdW5jdGlvbiBwZXJmb3JtaW5nIHRoZSB1bHRpbWF0ZSBsb29wIHdpbGwgYWNjZXB0LlxuZnVuY3Rpb24gcHJvY2Vzc0Jsb2NrKGJsb2NrLCBwcm9jLCBkdHlwZXMpIHtcbiAgdmFyIGNvZGUgPSBibG9jay5ib2R5XG4gIHZhciBwcmUgPSBbXVxuICB2YXIgcG9zdCA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPGJsb2NrLmFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY2FyZyA9IGJsb2NrLmFyZ3NbaV1cbiAgICBpZihjYXJnLmNvdW50IDw9IDApIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoY2FyZy5uYW1lLCBcImdcIilcbiAgICB2YXIgcHRyU3RyID0gXCJcIlxuICAgIHZhciBhcnJOdW0gPSBwcm9jLmFycmF5QXJncy5pbmRleE9mKGkpXG4gICAgc3dpdGNoKHByb2MuYXJnVHlwZXNbaV0pIHtcbiAgICAgIGNhc2UgXCJvZmZzZXRcIjpcbiAgICAgICAgdmFyIG9mZkFyZ0luZGV4ID0gcHJvYy5vZmZzZXRBcmdJbmRleC5pbmRleE9mKGkpXG4gICAgICAgIHZhciBvZmZBcmcgPSBwcm9jLm9mZnNldEFyZ3Nbb2ZmQXJnSW5kZXhdXG4gICAgICAgIGFyck51bSA9IG9mZkFyZy5hcnJheVxuICAgICAgICBwdHJTdHIgPSBcIitxXCIgKyBvZmZBcmdJbmRleCAvLyBBZGRzIG9mZnNldCB0byB0aGUgXCJwb2ludGVyXCIgaW4gdGhlIGFycmF5XG4gICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgcHRyU3RyID0gXCJwXCIgKyBhcnJOdW0gKyBwdHJTdHJcbiAgICAgICAgdmFyIGxvY2FsU3RyID0gXCJsXCIgKyBpXG4gICAgICAgIHZhciBhcnJTdHIgPSBcImFcIiArIGFyck51bVxuICAgICAgICBpZiAocHJvYy5hcnJheUJsb2NrSW5kaWNlc1thcnJOdW1dID09PSAwKSB7IC8vIEFyZ3VtZW50IHRvIGJvZHkgaXMganVzdCBhIHNpbmdsZSB2YWx1ZSBmcm9tIHRoaXMgYXJyYXlcbiAgICAgICAgICBpZihjYXJnLmNvdW50ID09PSAxKSB7IC8vIEFyZ3VtZW50L2FycmF5IHVzZWQgb25seSBvbmNlKD8pXG4gICAgICAgICAgICBpZihkdHlwZXNbYXJyTnVtXSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgICAgICAgICAgaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIElzIHRoaXMgbmVjZXNzYXJ5IGlmIHRoZSBhcmd1bWVudCBpcyBPTkxZIHVzZWQgYXMgYW4gbHZhbHVlPyAoa2VlcCBpbiBtaW5kIHRoYXQgd2UgY2FuIGhhdmUgYSArPSBzb21ldGhpbmcsIHNvIHdlIHdvdWxkIGFjdHVhbGx5IG5lZWQgdG8gY2hlY2sgY2FyZy5ydmFsdWUpXG4gICAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgbG9jYWxTdHIpXG4gICAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiLnNldChcIiwgcHRyU3RyLCBcIixcIiwgbG9jYWxTdHIsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgW2FyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBbYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl1cIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYoZHR5cGVzW2Fyck51bV0gPT09IFwiZ2VuZXJpY1wiKSB7XG4gICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIFRPRE86IENvdWxkIHdlIG9wdGltaXplIGJ5IGNoZWNraW5nIGZvciBjYXJnLnJ2YWx1ZT9cbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiLnNldChcIiwgcHRyU3RyLCBcIixcIiwgbG9jYWxTdHIsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZS5wdXNoKFtcInZhciBcIiwgbG9jYWxTdHIsIFwiPVwiLCBhcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXVwiXS5qb2luKFwiXCIpKSAvLyBUT0RPOiBDb3VsZCB3ZSBvcHRpbWl6ZSBieSBjaGVja2luZyBmb3IgY2FyZy5ydmFsdWU/XG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBsb2NhbFN0cilcbiAgICAgICAgICAgIGlmKGNhcmcubHZhbHVlKSB7XG4gICAgICAgICAgICAgIHBvc3QucHVzaChbYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl09XCIsIGxvY2FsU3RyXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gQXJndW1lbnQgdG8gYm9keSBpcyBhIFwiYmxvY2tcIlxuICAgICAgICAgIHZhciByZVN0ckFyciA9IFtjYXJnLm5hbWVdLCBwdHJTdHJBcnIgPSBbcHRyU3RyXVxuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbYXJyTnVtXSk7IGorKykge1xuICAgICAgICAgICAgcmVTdHJBcnIucHVzaChcIlxcXFxzKlxcXFxbKFteXFxcXF1dKylcXFxcXVwiKVxuICAgICAgICAgICAgcHRyU3RyQXJyLnB1c2goXCIkXCIgKyAoaisxKSArIFwiKnRcIiArIGFyck51bSArIFwiYlwiICsgaikgLy8gTWF0Y2hlZCBpbmRleCB0aW1lcyBzdHJpZGVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKHJlU3RyQXJyLmpvaW4oXCJcIiksIFwiZ1wiKVxuICAgICAgICAgIHB0clN0ciA9IHB0clN0ckFyci5qb2luKFwiK1wiKVxuICAgICAgICAgIGlmKGR0eXBlc1thcnJOdW1dID09PSBcImdlbmVyaWNcIikge1xuICAgICAgICAgICAgLyppZihjYXJnLmx2YWx1ZSkge1xuICAgICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIElzIHRoaXMgbmVjZXNzYXJ5IGlmIHRoZSBhcmd1bWVudCBpcyBPTkxZIHVzZWQgYXMgYW4gbHZhbHVlPyAoa2VlcCBpbiBtaW5kIHRoYXQgd2UgY2FuIGhhdmUgYSArPSBzb21ldGhpbmcsIHNvIHdlIHdvdWxkIGFjdHVhbGx5IG5lZWQgdG8gY2hlY2sgY2FyZy5ydmFsdWUpXG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgICBwb3N0LnB1c2goW2FyclN0ciwgXCIuc2V0KFwiLCBwdHJTdHIsIFwiLFwiLCBsb2NhbFN0cixcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IEdlbmVyaWMgYXJyYXlzIG5vdCBzdXBwb3J0ZWQgaW4gY29tYmluYXRpb24gd2l0aCBibG9ja3MhXCIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgZG9lcyBub3QgcHJvZHVjZSBhbnkgbG9jYWwgdmFyaWFibGVzLCBldmVuIGlmIHZhcmlhYmxlcyBhcmUgdXNlZCBtdWx0aXBsZSB0aW1lcy4gSXQgd291bGQgYmUgcG9zc2libGUgdG8gZG8gc28sIGJ1dCBpdCB3b3VsZCBjb21wbGljYXRlIHRoaW5ncyBxdWl0ZSBhIGJpdC5cbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJzY2FsYXJcIjpcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgXCJZXCIgKyBwcm9jLnNjYWxhckFyZ3MuaW5kZXhPZihpKSlcbiAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwiaW5kZXhcIjpcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgXCJpbmRleFwiKVxuICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJzaGFwZVwiOlxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBcInNoYXBlXCIpXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gW3ByZS5qb2luKFwiXFxuXCIpLCBjb2RlLCBwb3N0LmpvaW4oXCJcXG5cIildLmpvaW4oXCJcXG5cIikudHJpbSgpXG59XG5cbmZ1bmN0aW9uIHR5cGVTdW1tYXJ5KGR0eXBlcykge1xuICB2YXIgc3VtbWFyeSA9IG5ldyBBcnJheShkdHlwZXMubGVuZ3RoKVxuICB2YXIgYWxsRXF1YWwgPSB0cnVlXG4gIGZvcih2YXIgaT0wOyBpPGR0eXBlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciB0ID0gZHR5cGVzW2ldXG4gICAgdmFyIGRpZ2l0cyA9IHQubWF0Y2goL1xcZCsvKVxuICAgIGlmKCFkaWdpdHMpIHtcbiAgICAgIGRpZ2l0cyA9IFwiXCJcbiAgICB9IGVsc2Uge1xuICAgICAgZGlnaXRzID0gZGlnaXRzWzBdXG4gICAgfVxuICAgIGlmKHQuY2hhckF0KDApID09PSAwKSB7XG4gICAgICBzdW1tYXJ5W2ldID0gXCJ1XCIgKyB0LmNoYXJBdCgxKSArIGRpZ2l0c1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW1tYXJ5W2ldID0gdC5jaGFyQXQoMCkgKyBkaWdpdHNcbiAgICB9XG4gICAgaWYoaSA+IDApIHtcbiAgICAgIGFsbEVxdWFsID0gYWxsRXF1YWwgJiYgc3VtbWFyeVtpXSA9PT0gc3VtbWFyeVtpLTFdXG4gICAgfVxuICB9XG4gIGlmKGFsbEVxdWFsKSB7XG4gICAgcmV0dXJuIHN1bW1hcnlbMF1cbiAgfVxuICByZXR1cm4gc3VtbWFyeS5qb2luKFwiXCIpXG59XG5cbi8vR2VuZXJhdGVzIGEgY3dpc2Ugb3BlcmF0b3JcbmZ1bmN0aW9uIGdlbmVyYXRlQ1dpc2VPcChwcm9jLCB0eXBlc2lnKSB7XG5cbiAgLy9Db21wdXRlIGRpbWVuc2lvblxuICAvLyBBcnJheXMgZ2V0IHB1dCBmaXJzdCBpbiB0eXBlc2lnLCBhbmQgdGhlcmUgYXJlIHR3byBlbnRyaWVzIHBlciBhcnJheSAoZHR5cGUgYW5kIG9yZGVyKSwgc28gdGhpcyBnZXRzIHRoZSBudW1iZXIgb2YgZGltZW5zaW9ucyBpbiB0aGUgZmlyc3QgYXJyYXkgYXJnLlxuICB2YXIgZGltZW5zaW9uID0gKHR5cGVzaWdbMV0ubGVuZ3RoIC0gTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkpfDBcbiAgdmFyIG9yZGVycyA9IG5ldyBBcnJheShwcm9jLmFycmF5QXJncy5sZW5ndGgpXG4gIHZhciBkdHlwZXMgPSBuZXcgQXJyYXkocHJvYy5hcnJheUFyZ3MubGVuZ3RoKVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIGR0eXBlc1tpXSA9IHR5cGVzaWdbMippXVxuICAgIG9yZGVyc1tpXSA9IHR5cGVzaWdbMippKzFdXG4gIH1cbiAgXG4gIC8vRGV0ZXJtaW5lIHdoZXJlIGJsb2NrIGFuZCBsb29wIGluZGljZXMgc3RhcnQgYW5kIGVuZFxuICB2YXIgYmxvY2tCZWdpbiA9IFtdLCBibG9ja0VuZCA9IFtdIC8vIFRoZXNlIGluZGljZXMgYXJlIGV4cG9zZWQgYXMgYmxvY2tzXG4gIHZhciBsb29wQmVnaW4gPSBbXSwgbG9vcEVuZCA9IFtdIC8vIFRoZXNlIGluZGljZXMgYXJlIGl0ZXJhdGVkIG92ZXJcbiAgdmFyIGxvb3BPcmRlcnMgPSBbXSAvLyBvcmRlcnMgcmVzdHJpY3RlZCB0byB0aGUgbG9vcCBpbmRpY2VzXG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV08MCkge1xuICAgICAgbG9vcEJlZ2luLnB1c2goMClcbiAgICAgIGxvb3BFbmQucHVzaChkaW1lbnNpb24pXG4gICAgICBibG9ja0JlZ2luLnB1c2goZGltZW5zaW9uKVxuICAgICAgYmxvY2tFbmQucHVzaChkaW1lbnNpb24rcHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSlcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcEJlZ2luLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkgLy8gTm9uLW5lZ2F0aXZlXG4gICAgICBsb29wRW5kLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXStkaW1lbnNpb24pXG4gICAgICBibG9ja0JlZ2luLnB1c2goMClcbiAgICAgIGJsb2NrRW5kLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSlcbiAgICB9XG4gICAgdmFyIG5ld09yZGVyID0gW11cbiAgICBmb3IodmFyIGo9MDsgajxvcmRlcnNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChsb29wQmVnaW5baV08PW9yZGVyc1tpXVtqXSAmJiBvcmRlcnNbaV1bal08bG9vcEVuZFtpXSkge1xuICAgICAgICBuZXdPcmRlci5wdXNoKG9yZGVyc1tpXVtqXS1sb29wQmVnaW5baV0pIC8vIElmIHRoaXMgaXMgYSBsb29wIGluZGV4LCBwdXQgaXQgaW4gbmV3T3JkZXIsIHN1YnRyYWN0aW5nIGxvb3BCZWdpbiwgdG8gbWFrZSBzdXJlIHRoYXQgYWxsIGxvb3BPcmRlcnMgYXJlIHVzaW5nIGEgY29tbW9uIHNldCBvZiBpbmRpY2VzLlxuICAgICAgfVxuICAgIH1cbiAgICBsb29wT3JkZXJzLnB1c2gobmV3T3JkZXIpXG4gIH1cblxuICAvL0ZpcnN0IGNyZWF0ZSBhcmd1bWVudHMgZm9yIHByb2NlZHVyZVxuICB2YXIgYXJnbGlzdCA9IFtcIlNTXCJdIC8vIFNTIGlzIHRoZSBvdmVyYWxsIHNoYXBlIG92ZXIgd2hpY2ggd2UgaXRlcmF0ZVxuICB2YXIgY29kZSA9IFtcIid1c2Ugc3RyaWN0J1wiXVxuICB2YXIgdmFycyA9IFtdXG4gIFxuICBmb3IodmFyIGo9MDsgajxkaW1lbnNpb247ICsraikge1xuICAgIHZhcnMucHVzaChbXCJzXCIsIGosIFwiPVNTW1wiLCBqLCBcIl1cIl0uam9pbihcIlwiKSkgLy8gVGhlIGxpbWl0cyBmb3IgZWFjaCBkaW1lbnNpb24uXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBhcmdsaXN0LnB1c2goXCJhXCIraSkgLy8gQWN0dWFsIGRhdGEgYXJyYXlcbiAgICBhcmdsaXN0LnB1c2goXCJ0XCIraSkgLy8gU3RyaWRlc1xuICAgIGFyZ2xpc3QucHVzaChcInBcIitpKSAvLyBPZmZzZXQgaW4gdGhlIGFycmF5IGF0IHdoaWNoIHRoZSBkYXRhIHN0YXJ0cyAoYWxzbyB1c2VkIGZvciBpdGVyYXRpbmcgb3ZlciB0aGUgZGF0YSlcbiAgICBcbiAgICBmb3IodmFyIGo9MDsgajxkaW1lbnNpb247ICsraikgeyAvLyBVbnBhY2sgdGhlIHN0cmlkZXMgaW50byB2YXJzIGZvciBsb29waW5nXG4gICAgICB2YXJzLnB1c2goW1widFwiLGksXCJwXCIsaixcIj10XCIsaSxcIltcIixsb29wQmVnaW5baV0raixcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgXG4gICAgZm9yKHZhciBqPTA7IGo8TWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSk7ICsraikgeyAvLyBVbnBhY2sgdGhlIHN0cmlkZXMgaW50byB2YXJzIGZvciBibG9jayBpdGVyYXRpb25cbiAgICAgIHZhcnMucHVzaChbXCJ0XCIsaSxcImJcIixqLFwiPXRcIixpLFwiW1wiLGJsb2NrQmVnaW5baV0raixcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5zY2FsYXJBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgYXJnbGlzdC5wdXNoKFwiWVwiICsgaSlcbiAgfVxuICBpZihwcm9jLnNoYXBlQXJncy5sZW5ndGggPiAwKSB7XG4gICAgdmFycy5wdXNoKFwic2hhcGU9U1Muc2xpY2UoMClcIikgLy8gTWFrZXMgdGhlIHNoYXBlIG92ZXIgd2hpY2ggd2UgaXRlcmF0ZSBhdmFpbGFibGUgdG8gdGhlIHVzZXIgZGVmaW5lZCBmdW5jdGlvbnMgKHNvIHlvdSBjYW4gdXNlIHdpZHRoL2hlaWdodCBmb3IgZXhhbXBsZSlcbiAgfVxuICBpZihwcm9jLmluZGV4QXJncy5sZW5ndGggPiAwKSB7XG4gICAgLy8gUHJlcGFyZSBhbiBhcnJheSB0byBrZWVwIHRyYWNrIG9mIHRoZSAobG9naWNhbCkgaW5kaWNlcywgaW5pdGlhbGl6ZWQgdG8gZGltZW5zaW9uIHplcm9lcy5cbiAgICB2YXIgemVyb3MgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICB6ZXJvc1tpXSA9IFwiMFwiXG4gICAgfVxuICAgIHZhcnMucHVzaChbXCJpbmRleD1bXCIsIHplcm9zLmpvaW4oXCIsXCIpLCBcIl1cIl0uam9pbihcIlwiKSlcbiAgfVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLm9mZnNldEFyZ3MubGVuZ3RoOyArK2kpIHsgLy8gT2Zmc2V0IGFyZ3VtZW50cyB1c2VkIGZvciBzdGVuY2lsIG9wZXJhdGlvbnNcbiAgICB2YXIgb2ZmX2FyZyA9IHByb2Mub2Zmc2V0QXJnc1tpXVxuICAgIHZhciBpbml0X3N0cmluZyA9IFtdXG4gICAgZm9yKHZhciBqPTA7IGo8b2ZmX2FyZy5vZmZzZXQubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKG9mZl9hcmcub2Zmc2V0W2pdID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYob2ZmX2FyZy5vZmZzZXRbal0gPT09IDEpIHtcbiAgICAgICAgaW5pdF9zdHJpbmcucHVzaChbXCJ0XCIsIG9mZl9hcmcuYXJyYXksIFwicFwiLCBqXS5qb2luKFwiXCIpKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdF9zdHJpbmcucHVzaChbb2ZmX2FyZy5vZmZzZXRbal0sIFwiKnRcIiwgb2ZmX2FyZy5hcnJheSwgXCJwXCIsIGpdLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKGluaXRfc3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFycy5wdXNoKFwicVwiICsgaSArIFwiPTBcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFycy5wdXNoKFtcInFcIiwgaSwgXCI9XCIsIGluaXRfc3RyaW5nLmpvaW4oXCIrXCIpXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuXG4gIC8vUHJlcGFyZSB0aGlzIHZhcmlhYmxlc1xuICB2YXIgdGhpc1ZhcnMgPSB1bmlxKFtdLmNvbmNhdChwcm9jLnByZS50aGlzVmFycylcbiAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHByb2MuYm9keS50aGlzVmFycylcbiAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHByb2MucG9zdC50aGlzVmFycykpXG4gIHZhcnMgPSB2YXJzLmNvbmNhdCh0aGlzVmFycylcbiAgaWYgKHZhcnMubGVuZ3RoID4gMCkge1xuICAgIGNvZGUucHVzaChcInZhciBcIiArIHZhcnMuam9pbihcIixcIikpXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXCJwXCIraStcInw9MFwiKVxuICB9XG4gIFxuICAvL0lubGluZSBwcmVsdWRlXG4gIGlmKHByb2MucHJlLmJvZHkubGVuZ3RoID4gMykge1xuICAgIGNvZGUucHVzaChwcm9jZXNzQmxvY2socHJvYy5wcmUsIHByb2MsIGR0eXBlcykpXG4gIH1cblxuICAvL1Byb2Nlc3MgYm9keVxuICB2YXIgYm9keSA9IHByb2Nlc3NCbG9jayhwcm9jLmJvZHksIHByb2MsIGR0eXBlcylcbiAgdmFyIG1hdGNoZWQgPSBjb3VudE1hdGNoZXMobG9vcE9yZGVycylcbiAgaWYobWF0Y2hlZCA8IGRpbWVuc2lvbikge1xuICAgIGNvZGUucHVzaChvdXRlckZpbGwobWF0Y2hlZCwgbG9vcE9yZGVyc1swXSwgcHJvYywgYm9keSkpIC8vIFRPRE86IFJhdGhlciB0aGFuIHBhc3NpbmcgbG9vcE9yZGVyc1swXSwgaXQgbWlnaHQgYmUgaW50ZXJlc3RpbmcgdG8gbG9vayBhdCBwYXNzaW5nIGFuIG9yZGVyIHRoYXQgcmVwcmVzZW50cyB0aGUgbWFqb3JpdHkgb2YgdGhlIGFyZ3VtZW50cyBmb3IgZXhhbXBsZS5cbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goaW5uZXJGaWxsKGxvb3BPcmRlcnNbMF0sIHByb2MsIGJvZHkpKVxuICB9XG5cbiAgLy9JbmxpbmUgZXBpbG9nXG4gIGlmKHByb2MucG9zdC5ib2R5Lmxlbmd0aCA+IDMpIHtcbiAgICBjb2RlLnB1c2gocHJvY2Vzc0Jsb2NrKHByb2MucG9zdCwgcHJvYywgZHR5cGVzKSlcbiAgfVxuICBcbiAgaWYocHJvYy5kZWJ1Zykge1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLS1HZW5lcmF0ZWQgY3dpc2Ugcm91dGluZSBmb3IgXCIsIHR5cGVzaWcsIFwiOlxcblwiICsgY29kZS5qb2luKFwiXFxuXCIpICsgXCJcXG4tLS0tLS0tLS0tXCIpXG4gIH1cbiAgXG4gIHZhciBsb29wTmFtZSA9IFsocHJvYy5mdW5jTmFtZXx8XCJ1bm5hbWVkXCIpLCBcIl9jd2lzZV9sb29wX1wiLCBvcmRlcnNbMF0uam9pbihcInNcIiksXCJtXCIsbWF0Y2hlZCx0eXBlU3VtbWFyeShkdHlwZXMpXS5qb2luKFwiXCIpXG4gIHZhciBmID0gbmV3IEZ1bmN0aW9uKFtcImZ1bmN0aW9uIFwiLGxvb3BOYW1lLFwiKFwiLCBhcmdsaXN0LmpvaW4oXCIsXCIpLFwiKXtcIiwgY29kZS5qb2luKFwiXFxuXCIpLFwifSByZXR1cm4gXCIsIGxvb3BOYW1lXS5qb2luKFwiXCIpKVxuICByZXR1cm4gZigpXG59XG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQ1dpc2VPcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL2NvbXBpbGUuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gdW5pcXVlX3ByZWQobGlzdCwgY29tcGFyZSkge1xuICB2YXIgcHRyID0gMVxuICAgICwgbGVuID0gbGlzdC5sZW5ndGhcbiAgICAsIGE9bGlzdFswXSwgYj1saXN0WzBdXG4gIGZvcih2YXIgaT0xOyBpPGxlbjsgKytpKSB7XG4gICAgYiA9IGFcbiAgICBhID0gbGlzdFtpXVxuICAgIGlmKGNvbXBhcmUoYSwgYikpIHtcbiAgICAgIGlmKGkgPT09IHB0cikge1xuICAgICAgICBwdHIrK1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgbGlzdFtwdHIrK10gPSBhXG4gICAgfVxuICB9XG4gIGxpc3QubGVuZ3RoID0gcHRyXG4gIHJldHVybiBsaXN0XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZV9lcShsaXN0KSB7XG4gIHZhciBwdHIgPSAxXG4gICAgLCBsZW4gPSBsaXN0Lmxlbmd0aFxuICAgICwgYT1saXN0WzBdLCBiID0gbGlzdFswXVxuICBmb3IodmFyIGk9MTsgaTxsZW47ICsraSwgYj1hKSB7XG4gICAgYiA9IGFcbiAgICBhID0gbGlzdFtpXVxuICAgIGlmKGEgIT09IGIpIHtcbiAgICAgIGlmKGkgPT09IHB0cikge1xuICAgICAgICBwdHIrK1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuICAgICAgbGlzdFtwdHIrK10gPSBhXG4gICAgfVxuICB9XG4gIGxpc3QubGVuZ3RoID0gcHRyXG4gIHJldHVybiBsaXN0XG59XG5cbmZ1bmN0aW9uIHVuaXF1ZShsaXN0LCBjb21wYXJlLCBzb3J0ZWQpIHtcbiAgaWYobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gbGlzdFxuICB9XG4gIGlmKGNvbXBhcmUpIHtcbiAgICBpZighc29ydGVkKSB7XG4gICAgICBsaXN0LnNvcnQoY29tcGFyZSlcbiAgICB9XG4gICAgcmV0dXJuIHVuaXF1ZV9wcmVkKGxpc3QsIGNvbXBhcmUpXG4gIH1cbiAgaWYoIXNvcnRlZCkge1xuICAgIGxpc3Quc29ydCgpXG4gIH1cbiAgcmV0dXJuIHVuaXF1ZV9lcShsaXN0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVuaXF1ZVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvdW5pcS91bmlxLmpzXG4vLyBtb2R1bGUgaWQgPSA1M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBpb3RhID0gcmVxdWlyZShcImlvdGEtYXJyYXlcIilcbnZhciBpc0J1ZmZlciA9IHJlcXVpcmUoXCJpcy1idWZmZXJcIilcblxudmFyIGhhc1R5cGVkQXJyYXlzICA9ICgodHlwZW9mIEZsb2F0NjRBcnJheSkgIT09IFwidW5kZWZpbmVkXCIpXG5cbmZ1bmN0aW9uIGNvbXBhcmUxc3QoYSwgYikge1xuICByZXR1cm4gYVswXSAtIGJbMF1cbn1cblxuZnVuY3Rpb24gb3JkZXIoKSB7XG4gIHZhciBzdHJpZGUgPSB0aGlzLnN0cmlkZVxuICB2YXIgdGVybXMgPSBuZXcgQXJyYXkoc3RyaWRlLmxlbmd0aClcbiAgdmFyIGlcbiAgZm9yKGk9MDsgaTx0ZXJtcy5sZW5ndGg7ICsraSkge1xuICAgIHRlcm1zW2ldID0gW01hdGguYWJzKHN0cmlkZVtpXSksIGldXG4gIH1cbiAgdGVybXMuc29ydChjb21wYXJlMXN0KVxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KHRlcm1zLmxlbmd0aClcbiAgZm9yKGk9MDsgaTxyZXN1bHQubGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSB0ZXJtc1tpXVsxXVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gY29tcGlsZUNvbnN0cnVjdG9yKGR0eXBlLCBkaW1lbnNpb24pIHtcbiAgdmFyIGNsYXNzTmFtZSA9IFtcIlZpZXdcIiwgZGltZW5zaW9uLCBcImRcIiwgZHR5cGVdLmpvaW4oXCJcIilcbiAgaWYoZGltZW5zaW9uIDwgMCkge1xuICAgIGNsYXNzTmFtZSA9IFwiVmlld19OaWxcIiArIGR0eXBlXG4gIH1cbiAgdmFyIHVzZUdldHRlcnMgPSAoZHR5cGUgPT09IFwiZ2VuZXJpY1wiKVxuXG4gIGlmKGRpbWVuc2lvbiA9PT0gLTEpIHtcbiAgICAvL1NwZWNpYWwgY2FzZSBmb3IgdHJpdmlhbCBhcnJheXNcbiAgICB2YXIgY29kZSA9XG4gICAgICBcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIihhKXt0aGlzLmRhdGE9YTt9O1xcXG52YXIgcHJvdG89XCIrY2xhc3NOYW1lK1wiLnByb3RvdHlwZTtcXFxucHJvdG8uZHR5cGU9J1wiK2R0eXBlK1wiJztcXFxucHJvdG8uaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gLTF9O1xcXG5wcm90by5zaXplPTA7XFxcbnByb3RvLmRpbWVuc2lvbj0tMTtcXFxucHJvdG8uc2hhcGU9cHJvdG8uc3RyaWRlPXByb3RvLm9yZGVyPVtdO1xcXG5wcm90by5sbz1wcm90by5oaT1wcm90by50cmFuc3Bvc2U9cHJvdG8uc3RlcD1cXFxuZnVuY3Rpb24oKXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEpO307XFxcbnByb3RvLmdldD1wcm90by5zZXQ9ZnVuY3Rpb24oKXt9O1xcXG5wcm90by5waWNrPWZ1bmN0aW9uKCl7cmV0dXJuIG51bGx9O1xcXG5yZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0X1wiK2NsYXNzTmFtZStcIihhKXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIihhKTt9XCJcbiAgICB2YXIgcHJvY2VkdXJlID0gbmV3IEZ1bmN0aW9uKGNvZGUpXG4gICAgcmV0dXJuIHByb2NlZHVyZSgpXG4gIH0gZWxzZSBpZihkaW1lbnNpb24gPT09IDApIHtcbiAgICAvL1NwZWNpYWwgY2FzZSBmb3IgMGQgYXJyYXlzXG4gICAgdmFyIGNvZGUgPVxuICAgICAgXCJmdW5jdGlvbiBcIitjbGFzc05hbWUrXCIoYSxkKSB7XFxcbnRoaXMuZGF0YSA9IGE7XFxcbnRoaXMub2Zmc2V0ID0gZFxcXG59O1xcXG52YXIgcHJvdG89XCIrY2xhc3NOYW1lK1wiLnByb3RvdHlwZTtcXFxucHJvdG8uZHR5cGU9J1wiK2R0eXBlK1wiJztcXFxucHJvdG8uaW5kZXg9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5vZmZzZXR9O1xcXG5wcm90by5kaW1lbnNpb249MDtcXFxucHJvdG8uc2l6ZT0xO1xcXG5wcm90by5zaGFwZT1cXFxucHJvdG8uc3RyaWRlPVxcXG5wcm90by5vcmRlcj1bXTtcXFxucHJvdG8ubG89XFxcbnByb3RvLmhpPVxcXG5wcm90by50cmFuc3Bvc2U9XFxcbnByb3RvLnN0ZXA9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2NvcHkoKSB7XFxcbnJldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSx0aGlzLm9mZnNldClcXFxufTtcXFxucHJvdG8ucGljaz1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfcGljaygpe1xcXG5yZXR1cm4gVHJpdmlhbEFycmF5KHRoaXMuZGF0YSk7XFxcbn07XFxcbnByb3RvLnZhbHVlT2Y9cHJvdG8uZ2V0PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9nZXQoKXtcXFxucmV0dXJuIFwiKyh1c2VHZXR0ZXJzID8gXCJ0aGlzLmRhdGEuZ2V0KHRoaXMub2Zmc2V0KVwiIDogXCJ0aGlzLmRhdGFbdGhpcy5vZmZzZXRdXCIpK1xuXCJ9O1xcXG5wcm90by5zZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3NldCh2KXtcXFxucmV0dXJuIFwiKyh1c2VHZXR0ZXJzID8gXCJ0aGlzLmRhdGEuc2V0KHRoaXMub2Zmc2V0LHYpXCIgOiBcInRoaXMuZGF0YVt0aGlzLm9mZnNldF09dlwiKStcIlxcXG59O1xcXG5yZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0X1wiK2NsYXNzTmFtZStcIihhLGIsYyxkKXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIihhLGQpfVwiXG4gICAgdmFyIHByb2NlZHVyZSA9IG5ldyBGdW5jdGlvbihcIlRyaXZpYWxBcnJheVwiLCBjb2RlKVxuICAgIHJldHVybiBwcm9jZWR1cmUoQ0FDSEVEX0NPTlNUUlVDVE9SU1tkdHlwZV1bMF0pXG4gIH1cblxuICB2YXIgY29kZSA9IFtcIid1c2Ugc3RyaWN0J1wiXVxuXG4gIC8vQ3JlYXRlIGNvbnN0cnVjdG9yIGZvciB2aWV3XG4gIHZhciBpbmRpY2VzID0gaW90YShkaW1lbnNpb24pXG4gIHZhciBhcmdzID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkgeyByZXR1cm4gXCJpXCIraSB9KVxuICB2YXIgaW5kZXhfc3RyID0gXCJ0aGlzLm9mZnNldCtcIiArIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgICAgcmV0dXJuIFwidGhpcy5zdHJpZGVbXCIgKyBpICsgXCJdKmlcIiArIGlcbiAgICAgIH0pLmpvaW4oXCIrXCIpXG4gIHZhciBzaGFwZUFyZyA9IGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImJcIitpXG4gICAgfSkuam9pbihcIixcIilcbiAgdmFyIHN0cmlkZUFyZyA9IGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImNcIitpXG4gICAgfSkuam9pbihcIixcIilcbiAgY29kZS5wdXNoKFxuICAgIFwiZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiKGEsXCIgKyBzaGFwZUFyZyArIFwiLFwiICsgc3RyaWRlQXJnICsgXCIsZCl7dGhpcy5kYXRhPWFcIixcbiAgICAgIFwidGhpcy5zaGFwZT1bXCIgKyBzaGFwZUFyZyArIFwiXVwiLFxuICAgICAgXCJ0aGlzLnN0cmlkZT1bXCIgKyBzdHJpZGVBcmcgKyBcIl1cIixcbiAgICAgIFwidGhpcy5vZmZzZXQ9ZHwwfVwiLFxuICAgIFwidmFyIHByb3RvPVwiK2NsYXNzTmFtZStcIi5wcm90b3R5cGVcIixcbiAgICBcInByb3RvLmR0eXBlPSdcIitkdHlwZStcIidcIixcbiAgICBcInByb3RvLmRpbWVuc2lvbj1cIitkaW1lbnNpb24pXG5cbiAgLy92aWV3LnNpemU6XG4gIGNvZGUucHVzaChcIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywnc2l6ZScse2dldDpmdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfc2l6ZSgpe1xcXG5yZXR1cm4gXCIraW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkgeyByZXR1cm4gXCJ0aGlzLnNoYXBlW1wiK2krXCJdXCIgfSkuam9pbihcIipcIiksXG5cIn19KVwiKVxuXG4gIC8vdmlldy5vcmRlcjpcbiAgaWYoZGltZW5zaW9uID09PSAxKSB7XG4gICAgY29kZS5wdXNoKFwicHJvdG8ub3JkZXI9WzBdXCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdvcmRlcicse2dldDpcIilcbiAgICBpZihkaW1lbnNpb24gPCA0KSB7XG4gICAgICBjb2RlLnB1c2goXCJmdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfb3JkZXIoKXtcIilcbiAgICAgIGlmKGRpbWVuc2lvbiA9PT0gMikge1xuICAgICAgICBjb2RlLnB1c2goXCJyZXR1cm4gKE1hdGguYWJzKHRoaXMuc3RyaWRlWzBdKT5NYXRoLmFicyh0aGlzLnN0cmlkZVsxXSkpP1sxLDBdOlswLDFdfX0pXCIpXG4gICAgICB9IGVsc2UgaWYoZGltZW5zaW9uID09PSAzKSB7XG4gICAgICAgIGNvZGUucHVzaChcblwidmFyIHMwPU1hdGguYWJzKHRoaXMuc3RyaWRlWzBdKSxzMT1NYXRoLmFicyh0aGlzLnN0cmlkZVsxXSksczI9TWF0aC5hYnModGhpcy5zdHJpZGVbMl0pO1xcXG5pZihzMD5zMSl7XFxcbmlmKHMxPnMyKXtcXFxucmV0dXJuIFsyLDEsMF07XFxcbn1lbHNlIGlmKHMwPnMyKXtcXFxucmV0dXJuIFsxLDIsMF07XFxcbn1lbHNle1xcXG5yZXR1cm4gWzEsMCwyXTtcXFxufVxcXG59ZWxzZSBpZihzMD5zMil7XFxcbnJldHVybiBbMiwwLDFdO1xcXG59ZWxzZSBpZihzMj5zMSl7XFxcbnJldHVybiBbMCwxLDJdO1xcXG59ZWxzZXtcXFxucmV0dXJuIFswLDIsMV07XFxcbn19fSlcIilcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29kZS5wdXNoKFwiT1JERVJ9KVwiKVxuICAgIH1cbiAgfVxuXG4gIC8vdmlldy5zZXQoaTAsIC4uLiwgdik6XG4gIGNvZGUucHVzaChcblwicHJvdG8uc2V0PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zZXQoXCIrYXJncy5qb2luKFwiLFwiKStcIix2KXtcIilcbiAgaWYodXNlR2V0dGVycykge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGEuc2V0KFwiK2luZGV4X3N0citcIix2KX1cIilcbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gdGhpcy5kYXRhW1wiK2luZGV4X3N0citcIl09dn1cIilcbiAgfVxuXG4gIC8vdmlldy5nZXQoaTAsIC4uLik6XG4gIGNvZGUucHVzaChcInByb3RvLmdldD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfZ2V0KFwiK2FyZ3Muam9pbihcIixcIikrXCIpe1wiKVxuICBpZih1c2VHZXR0ZXJzKSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIHRoaXMuZGF0YS5nZXQoXCIraW5kZXhfc3RyK1wiKX1cIilcbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gdGhpcy5kYXRhW1wiK2luZGV4X3N0citcIl19XCIpXG4gIH1cblxuICAvL3ZpZXcuaW5kZXg6XG4gIGNvZGUucHVzaChcbiAgICBcInByb3RvLmluZGV4PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9pbmRleChcIiwgYXJncy5qb2luKCksIFwiKXtyZXR1cm4gXCIraW5kZXhfc3RyK1wifVwiKVxuXG4gIC8vdmlldy5oaSgpOlxuICBjb2RlLnB1c2goXCJwcm90by5oaT1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfaGkoXCIrYXJncy5qb2luKFwiLFwiKStcIil7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBbXCIodHlwZW9mIGlcIixpLFwiIT09J251bWJlcid8fGlcIixpLFwiPDApP3RoaXMuc2hhcGVbXCIsIGksIFwiXTppXCIsIGksXCJ8MFwiXS5qb2luKFwiXCIpXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwidGhpcy5zdHJpZGVbXCIraSArIFwiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsdGhpcy5vZmZzZXQpfVwiKVxuXG4gIC8vdmlldy5sbygpOlxuICB2YXIgYV92YXJzID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkgeyByZXR1cm4gXCJhXCIraStcIj10aGlzLnNoYXBlW1wiK2krXCJdXCIgfSlcbiAgdmFyIGNfdmFycyA9IGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHsgcmV0dXJuIFwiY1wiK2krXCI9dGhpcy5zdHJpZGVbXCIraStcIl1cIiB9KVxuICBjb2RlLnB1c2goXCJwcm90by5sbz1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfbG8oXCIrYXJncy5qb2luKFwiLFwiKStcIil7dmFyIGI9dGhpcy5vZmZzZXQsZD0wLFwiK2FfdmFycy5qb2luKFwiLFwiKStcIixcIitjX3ZhcnMuam9pbihcIixcIikpXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFxuXCJpZih0eXBlb2YgaVwiK2krXCI9PT0nbnVtYmVyJyYmaVwiK2krXCI+PTApe1xcXG5kPWlcIitpK1wifDA7XFxcbmIrPWNcIitpK1wiKmQ7XFxcbmFcIitpK1wiLT1kfVwiKVxuICB9XG4gIGNvZGUucHVzaChcInJldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSxcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJhXCIraVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImNcIitpXG4gICAgfSkuam9pbihcIixcIikrXCIsYil9XCIpXG5cbiAgLy92aWV3LnN0ZXAoKTpcbiAgY29kZS5wdXNoKFwicHJvdG8uc3RlcD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfc3RlcChcIithcmdzLmpvaW4oXCIsXCIpK1wiKXt2YXIgXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYVwiK2krXCI9dGhpcy5zaGFwZVtcIitpK1wiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYlwiK2krXCI9dGhpcy5zdHJpZGVbXCIraStcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLGM9dGhpcy5vZmZzZXQsZD0wLGNlaWw9TWF0aC5jZWlsXCIpXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFxuXCJpZih0eXBlb2YgaVwiK2krXCI9PT0nbnVtYmVyJyl7XFxcbmQ9aVwiK2krXCJ8MDtcXFxuaWYoZDwwKXtcXFxuYys9YlwiK2krXCIqKGFcIitpK1wiLTEpO1xcXG5hXCIraStcIj1jZWlsKC1hXCIraStcIi9kKVxcXG59ZWxzZXtcXFxuYVwiK2krXCI9Y2VpbChhXCIraStcIi9kKVxcXG59XFxcbmJcIitpK1wiKj1kXFxcbn1cIilcbiAgfVxuICBjb2RlLnB1c2goXCJyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYVwiICsgaVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImJcIiArIGlcbiAgICB9KS5qb2luKFwiLFwiKStcIixjKX1cIilcblxuICAvL3ZpZXcudHJhbnNwb3NlKCk6XG4gIHZhciB0U2hhcGUgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICB2YXIgdFN0cmlkZSA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgdFNoYXBlW2ldID0gXCJhW2lcIitpK1wiXVwiXG4gICAgdFN0cmlkZVtpXSA9IFwiYltpXCIraStcIl1cIlxuICB9XG4gIGNvZGUucHVzaChcInByb3RvLnRyYW5zcG9zZT1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfdHJhbnNwb3NlKFwiK2FyZ3MrXCIpe1wiK1xuICAgIGFyZ3MubWFwKGZ1bmN0aW9uKG4saWR4KSB7IHJldHVybiBuICsgXCI9KFwiICsgbiArIFwiPT09dW5kZWZpbmVkP1wiICsgaWR4ICsgXCI6XCIgKyBuICsgXCJ8MClcIn0pLmpvaW4oXCI7XCIpLFxuICAgIFwidmFyIGE9dGhpcy5zaGFwZSxiPXRoaXMuc3RyaWRlO3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSxcIit0U2hhcGUuam9pbihcIixcIikrXCIsXCIrdFN0cmlkZS5qb2luKFwiLFwiKStcIix0aGlzLm9mZnNldCl9XCIpXG5cbiAgLy92aWV3LnBpY2soKTpcbiAgY29kZS5wdXNoKFwicHJvdG8ucGljaz1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfcGljayhcIithcmdzK1wiKXt2YXIgYT1bXSxiPVtdLGM9dGhpcy5vZmZzZXRcIilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXCJpZih0eXBlb2YgaVwiK2krXCI9PT0nbnVtYmVyJyYmaVwiK2krXCI+PTApe2M9KGMrdGhpcy5zdHJpZGVbXCIraStcIl0qaVwiK2krXCIpfDB9ZWxzZXthLnB1c2godGhpcy5zaGFwZVtcIitpK1wiXSk7Yi5wdXNoKHRoaXMuc3RyaWRlW1wiK2krXCJdKX1cIilcbiAgfVxuICBjb2RlLnB1c2goXCJ2YXIgY3Rvcj1DVE9SX0xJU1RbYS5sZW5ndGgrMV07cmV0dXJuIGN0b3IodGhpcy5kYXRhLGEsYixjKX1cIilcblxuICAvL0FkZCByZXR1cm4gc3RhdGVtZW50XG4gIGNvZGUucHVzaChcInJldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfXCIrY2xhc3NOYW1lK1wiKGRhdGEsc2hhcGUsc3RyaWRlLG9mZnNldCl7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIoZGF0YSxcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJzaGFwZVtcIitpK1wiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwic3RyaWRlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixvZmZzZXQpfVwiKVxuXG4gIC8vQ29tcGlsZSBwcm9jZWR1cmVcbiAgdmFyIHByb2NlZHVyZSA9IG5ldyBGdW5jdGlvbihcIkNUT1JfTElTVFwiLCBcIk9SREVSXCIsIGNvZGUuam9pbihcIlxcblwiKSlcbiAgcmV0dXJuIHByb2NlZHVyZShDQUNIRURfQ09OU1RSVUNUT1JTW2R0eXBlXSwgb3JkZXIpXG59XG5cbmZ1bmN0aW9uIGFycmF5RFR5cGUoZGF0YSkge1xuICBpZihpc0J1ZmZlcihkYXRhKSkge1xuICAgIHJldHVybiBcImJ1ZmZlclwiXG4gIH1cbiAgaWYoaGFzVHlwZWRBcnJheXMpIHtcbiAgICBzd2l0Y2goT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGRhdGEpKSB7XG4gICAgICBjYXNlIFwiW29iamVjdCBGbG9hdDY0QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImZsb2F0NjRcIlxuICAgICAgY2FzZSBcIltvYmplY3QgRmxvYXQzMkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJmbG9hdDMyXCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEludDhBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiaW50OFwiXG4gICAgICBjYXNlIFwiW29iamVjdCBJbnQxNkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJpbnQxNlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBJbnQzMkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJpbnQzMlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBVaW50OEFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJ1aW50OFwiXG4gICAgICBjYXNlIFwiW29iamVjdCBVaW50MTZBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwidWludDE2XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQzMkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJ1aW50MzJcIlxuICAgICAgY2FzZSBcIltvYmplY3QgVWludDhDbGFtcGVkQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQ4X2NsYW1wZWRcIlxuICAgIH1cbiAgfVxuICBpZihBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgcmV0dXJuIFwiYXJyYXlcIlxuICB9XG4gIHJldHVybiBcImdlbmVyaWNcIlxufVxuXG52YXIgQ0FDSEVEX0NPTlNUUlVDVE9SUyA9IHtcbiAgXCJmbG9hdDMyXCI6W10sXG4gIFwiZmxvYXQ2NFwiOltdLFxuICBcImludDhcIjpbXSxcbiAgXCJpbnQxNlwiOltdLFxuICBcImludDMyXCI6W10sXG4gIFwidWludDhcIjpbXSxcbiAgXCJ1aW50MTZcIjpbXSxcbiAgXCJ1aW50MzJcIjpbXSxcbiAgXCJhcnJheVwiOltdLFxuICBcInVpbnQ4X2NsYW1wZWRcIjpbXSxcbiAgXCJidWZmZXJcIjpbXSxcbiAgXCJnZW5lcmljXCI6W11cbn1cblxuOyhmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBpZCBpbiBDQUNIRURfQ09OU1RSVUNUT1JTKSB7XG4gICAgQ0FDSEVEX0NPTlNUUlVDVE9SU1tpZF0ucHVzaChjb21waWxlQ29uc3RydWN0b3IoaWQsIC0xKSlcbiAgfVxufSk7XG5cbmZ1bmN0aW9uIHdyYXBwZWROREFycmF5Q3RvcihkYXRhLCBzaGFwZSwgc3RyaWRlLCBvZmZzZXQpIHtcbiAgaWYoZGF0YSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdmFyIGN0b3IgPSBDQUNIRURfQ09OU1RSVUNUT1JTLmFycmF5WzBdXG4gICAgcmV0dXJuIGN0b3IoW10pXG4gIH0gZWxzZSBpZih0eXBlb2YgZGF0YSA9PT0gXCJudW1iZXJcIikge1xuICAgIGRhdGEgPSBbZGF0YV1cbiAgfVxuICBpZihzaGFwZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc2hhcGUgPSBbIGRhdGEubGVuZ3RoIF1cbiAgfVxuICB2YXIgZCA9IHNoYXBlLmxlbmd0aFxuICBpZihzdHJpZGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0cmlkZSA9IG5ldyBBcnJheShkKVxuICAgIGZvcih2YXIgaT1kLTEsIHN6PTE7IGk+PTA7IC0taSkge1xuICAgICAgc3RyaWRlW2ldID0gc3pcbiAgICAgIHN6ICo9IHNoYXBlW2ldXG4gICAgfVxuICB9XG4gIGlmKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgb2Zmc2V0ID0gMFxuICAgIGZvcih2YXIgaT0wOyBpPGQ7ICsraSkge1xuICAgICAgaWYoc3RyaWRlW2ldIDwgMCkge1xuICAgICAgICBvZmZzZXQgLT0gKHNoYXBlW2ldLTEpKnN0cmlkZVtpXVxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgZHR5cGUgPSBhcnJheURUeXBlKGRhdGEpXG4gIHZhciBjdG9yX2xpc3QgPSBDQUNIRURfQ09OU1RSVUNUT1JTW2R0eXBlXVxuICB3aGlsZShjdG9yX2xpc3QubGVuZ3RoIDw9IGQrMSkge1xuICAgIGN0b3JfbGlzdC5wdXNoKGNvbXBpbGVDb25zdHJ1Y3RvcihkdHlwZSwgY3Rvcl9saXN0Lmxlbmd0aC0xKSlcbiAgfVxuICB2YXIgY3RvciA9IGN0b3JfbGlzdFtkKzFdXG4gIHJldHVybiBjdG9yKGRhdGEsIHNoYXBlLCBzdHJpZGUsIG9mZnNldClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB3cmFwcGVkTkRBcnJheUN0b3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25kYXJyYXkvbmRhcnJheS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBpb3RhKG4pIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShuKVxuICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlvdGFcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pb3RhLWFycmF5L2lvdGEuanNcbi8vIG1vZHVsZSBpZCA9IDU1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiBEZXRlcm1pbmUgaWYgYW4gb2JqZWN0IGlzIGEgQnVmZmVyXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA1NlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBjcmVhdGVWQU9OYXRpdmUgPSByZXF1aXJlKFwiLi9saWIvdmFvLW5hdGl2ZS5qc1wiKVxudmFyIGNyZWF0ZVZBT0VtdWxhdGVkID0gcmVxdWlyZShcIi4vbGliL3Zhby1lbXVsYXRlZC5qc1wiKVxuXG5mdW5jdGlvbiBFeHRlbnNpb25TaGltIChnbCkge1xuICB0aGlzLmJpbmRWZXJ0ZXhBcnJheU9FUyA9IGdsLmJpbmRWZXJ0ZXhBcnJheS5iaW5kKGdsKVxuICB0aGlzLmNyZWF0ZVZlcnRleEFycmF5T0VTID0gZ2wuY3JlYXRlVmVydGV4QXJyYXkuYmluZChnbClcbiAgdGhpcy5kZWxldGVWZXJ0ZXhBcnJheU9FUyA9IGdsLmRlbGV0ZVZlcnRleEFycmF5LmJpbmQoZ2wpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZBTyhnbCwgYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSkge1xuICB2YXIgZXh0ID0gZ2wuY3JlYXRlVmVydGV4QXJyYXlcbiAgICA/IG5ldyBFeHRlbnNpb25TaGltKGdsKVxuICAgIDogZ2wuZ2V0RXh0ZW5zaW9uKCdPRVNfdmVydGV4X2FycmF5X29iamVjdCcpXG4gIHZhciB2YW9cblxuICBpZihleHQpIHtcbiAgICB2YW8gPSBjcmVhdGVWQU9OYXRpdmUoZ2wsIGV4dClcbiAgfSBlbHNlIHtcbiAgICB2YW8gPSBjcmVhdGVWQU9FbXVsYXRlZChnbClcbiAgfVxuICB2YW8udXBkYXRlKGF0dHJpYnV0ZXMsIGVsZW1lbnRzLCBlbGVtZW50c1R5cGUpXG4gIHJldHVybiB2YW9cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWQU9cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby92YW8uanNcbi8vIG1vZHVsZSBpZCA9IDU3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJpbmRBdHRyaWJzID0gcmVxdWlyZShcIi4vZG8tYmluZC5qc1wiKVxuXG5mdW5jdGlvbiBWZXJ0ZXhBdHRyaWJ1dGUobG9jYXRpb24sIGRpbWVuc2lvbiwgYSwgYiwgYywgZCkge1xuICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25cbiAgdGhpcy5kaW1lbnNpb24gPSBkaW1lbnNpb25cbiAgdGhpcy5hID0gYVxuICB0aGlzLmIgPSBiXG4gIHRoaXMuYyA9IGNcbiAgdGhpcy5kID0gZFxufVxuXG5WZXJ0ZXhBdHRyaWJ1dGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihnbCkge1xuICBzd2l0Y2godGhpcy5kaW1lbnNpb24pIHtcbiAgICBjYXNlIDE6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWIxZih0aGlzLmxvY2F0aW9uLCB0aGlzLmEpXG4gICAgYnJlYWtcbiAgICBjYXNlIDI6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWIyZih0aGlzLmxvY2F0aW9uLCB0aGlzLmEsIHRoaXMuYilcbiAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjNmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMpXG4gICAgYnJlYWtcbiAgICBjYXNlIDQ6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWI0Zih0aGlzLmxvY2F0aW9uLCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQpXG4gICAgYnJlYWtcbiAgfVxufVxuXG5mdW5jdGlvbiBWQU9OYXRpdmUoZ2wsIGV4dCwgaGFuZGxlKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLl9leHQgPSBleHRcbiAgdGhpcy5oYW5kbGUgPSBoYW5kbGVcbiAgdGhpcy5fYXR0cmlicyA9IFtdXG4gIHRoaXMuX3VzZUVsZW1lbnRzID0gZmFsc2VcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5iaW5kVmVydGV4QXJyYXlPRVModGhpcy5oYW5kbGUpXG4gIGZvcih2YXIgaT0wOyBpPHRoaXMuX2F0dHJpYnMubGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzLl9hdHRyaWJzW2ldLmJpbmQodGhpcy5nbClcbiAgfVxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9leHQuYmluZFZlcnRleEFycmF5T0VTKG51bGwpXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9leHQuZGVsZXRlVmVydGV4QXJyYXlPRVModGhpcy5oYW5kbGUpXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSkge1xuICB0aGlzLmJpbmQoKVxuICBiaW5kQXR0cmlicyh0aGlzLmdsLCBlbGVtZW50cywgYXR0cmlidXRlcylcbiAgdGhpcy51bmJpbmQoKVxuICB0aGlzLl9hdHRyaWJzLmxlbmd0aCA9IDBcbiAgaWYoYXR0cmlidXRlcylcbiAgZm9yKHZhciBpPTA7IGk8YXR0cmlidXRlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhID0gYXR0cmlidXRlc1tpXVxuICAgIGlmKHR5cGVvZiBhID09PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLl9hdHRyaWJzLnB1c2gobmV3IFZlcnRleEF0dHJpYnV0ZShpLCAxLCBhKSlcbiAgICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5fYXR0cmlicy5wdXNoKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoaSwgYS5sZW5ndGgsIGFbMF0sIGFbMV0sIGFbMl0sIGFbM10pKVxuICAgIH1cbiAgfVxuICB0aGlzLl91c2VFbGVtZW50cyA9ICEhZWxlbWVudHNcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZWxlbWVudHNUeXBlIHx8IHRoaXMuZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24obW9kZSwgY291bnQsIG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIGlmKHRoaXMuX3VzZUVsZW1lbnRzKSB7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0aGlzLl9lbGVtZW50c1R5cGUsIG9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBnbC5kcmF3QXJyYXlzKG1vZGUsIG9mZnNldCwgY291bnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPTmF0aXZlKGdsLCBleHQpIHtcbiAgcmV0dXJuIG5ldyBWQU9OYXRpdmUoZ2wsIGV4dCwgZXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPTmF0aXZlXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi92YW8tbmF0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBiaW5kQXR0cmlicyA9IHJlcXVpcmUoXCIuL2RvLWJpbmQuanNcIilcblxuZnVuY3Rpb24gVkFPRW11bGF0ZWQoZ2wpIHtcbiAgdGhpcy5nbCA9IGdsXG4gIHRoaXMuX2VsZW1lbnRzID0gbnVsbFxuICB0aGlzLl9hdHRyaWJ1dGVzID0gbnVsbFxuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBnbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKCkge1xuICBiaW5kQXR0cmlicyh0aGlzLmdsLCB0aGlzLl9lbGVtZW50cywgdGhpcy5fYXR0cmlidXRlcylcbn1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIGVsZW1lbnRzLCBlbGVtZW50c1R5cGUpIHtcbiAgdGhpcy5fZWxlbWVudHMgPSBlbGVtZW50c1xuICB0aGlzLl9hdHRyaWJ1dGVzID0gYXR0cmlidXRlc1xuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBlbGVtZW50c1R5cGUgfHwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkgeyB9XG5WQU9FbXVsYXRlZC5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oKSB7IH1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihtb2RlLCBjb3VudCwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8fCAwXG4gIHZhciBnbCA9IHRoaXMuZ2xcbiAgaWYodGhpcy5fZWxlbWVudHMpIHtcbiAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHRoaXMuX2VsZW1lbnRzVHlwZSwgb2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBjb3VudClcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWQU9FbXVsYXRlZChnbCkge1xuICByZXR1cm4gbmV3IFZBT0VtdWxhdGVkKGdsKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZBT0VtdWxhdGVkXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi92YW8tZW11bGF0ZWQuanNcbi8vIG1vZHVsZSBpZCA9IDU5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZnVuY3Rpb24gZG93bmxvYWQodCxlLG4pe2Z1bmN0aW9uIGkodCl7dmFyIGU9dC5zcGxpdCgvWzo7LF0vKSxuPWVbMV0saT1cImJhc2U2NFwiPT1lWzJdP2F0b2I6ZGVjb2RlVVJJQ29tcG9uZW50LHI9aShlLnBvcCgpKSxvPXIubGVuZ3RoLGE9MCxzPW5ldyBVaW50OEFycmF5KG8pO2ZvcihhO2E8bzsrK2Epc1thXT1yLmNoYXJDb2RlQXQoYSk7cmV0dXJuIG5ldyBtKFtzXSx7dHlwZTpufSl9ZnVuY3Rpb24gcih0LGUpe2lmKFwiZG93bmxvYWRcImluIGwpcmV0dXJuIGwuaHJlZj10LGwuc2V0QXR0cmlidXRlKFwiZG93bmxvYWRcIix3KSxsLmlubmVySFRNTD1cImRvd25sb2FkaW5nLi4uXCIsbC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGYuYm9keS5hcHBlbmRDaGlsZChsKSxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7bC5jbGljaygpLGYuYm9keS5yZW1vdmVDaGlsZChsKSxlPT09ITAmJnNldFRpbWVvdXQoZnVuY3Rpb24oKXtoLlVSTC5yZXZva2VPYmplY3RVUkwobC5ocmVmKX0sMjUwKX0sNjYpLCEwO3ZhciBuPWYuY3JlYXRlRWxlbWVudChcImlmcmFtZVwiKTtmLmJvZHkuYXBwZW5kQ2hpbGQobiksZXx8KHQ9XCJkYXRhOlwiK3QucmVwbGFjZSgvXmRhdGE6KFtcXHdcXC9cXC1cXCtdKykvLGQpKSxuLnNyYz10LHNldFRpbWVvdXQoZnVuY3Rpb24oKXtmLmJvZHkucmVtb3ZlQ2hpbGQobil9LDMzMyl9dmFyIG8sYSxzLGg9d2luZG93LGQ9XCJhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW1cIix1PW58fGQsYz10LGY9ZG9jdW1lbnQsbD1mLmNyZWF0ZUVsZW1lbnQoXCJhXCIpLHA9ZnVuY3Rpb24odCl7cmV0dXJuIFN0cmluZyh0KX0sbT1oLkJsb2J8fGguTW96QmxvYnx8aC5XZWJLaXRCbG9ifHxwLGc9aC5NU0Jsb2JCdWlsZGVyfHxoLldlYktpdEJsb2JCdWlsZGVyfHxoLkJsb2JCdWlsZGVyLHc9ZXx8XCJkb3dubG9hZFwiO2lmKFwidHJ1ZVwiPT09U3RyaW5nKHRoaXMpJiYoYz1bYyx1XSx1PWNbMF0sYz1jWzFdKSxTdHJpbmcoYykubWF0Y2goL15kYXRhXFw6W1xcdytcXC1dK1xcL1tcXHcrXFwtXStbLDtdLykpcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVCbG9iP25hdmlnYXRvci5tc1NhdmVCbG9iKGkoYyksdyk6cihjKTt0cnl7bz1jIGluc3RhbmNlb2YgbT9jOm5ldyBtKFtjXSx7dHlwZTp1fSl9Y2F0Y2godCl7ZyYmKGE9bmV3IGcsYS5hcHBlbmQoW2NdKSxvPWEuZ2V0QmxvYih1KSl9aWYobmF2aWdhdG9yLm1zU2F2ZUJsb2IpcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVCbG9iKG8sdyk7aWYoaC5VUkwpcihoLlVSTC5jcmVhdGVPYmplY3RVUkwobyksITApO2Vsc2V7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG98fG8uY29uc3RydWN0b3I9PT1wKXRyeXtyZXR1cm4gcihcImRhdGE6XCIrdStcIjtiYXNlNjQsXCIraC5idG9hKG8pKX1jYXRjaCh0KXtyZXR1cm4gcihcImRhdGE6XCIrdStcIixcIitlbmNvZGVVUklDb21wb25lbnQobykpfXM9bmV3IEZpbGVSZWFkZXIscy5vbmxvYWQ9ZnVuY3Rpb24odCl7cih0aGlzLnJlc3VsdCl9LHMucmVhZEFzRGF0YVVSTChvKX1yZXR1cm4hMH13aW5kb3cuV2hhbW15PWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LG4pe2Zvcih2YXIgaT1lKHQpLHI9M2U0LG89W3tpZDo0NDA3ODY4NTEsZGF0YTpbe2RhdGE6MSxpZDoxNzAzMH0se2RhdGE6MSxpZDoxNzE0M30se2RhdGE6NCxpZDoxNzEzOH0se2RhdGE6OCxpZDoxNzEzOX0se2RhdGE6XCJ3ZWJtXCIsaWQ6MTcwMjZ9LHtkYXRhOjIsaWQ6MTcwMzF9LHtkYXRhOjIsaWQ6MTcwMjl9XX0se2lkOjQwODEyNTU0MyxkYXRhOlt7aWQ6MzU3MTQ5MDMwLGRhdGE6W3tkYXRhOjFlNixpZDoyODA3NzI5fSx7ZGF0YTpcIndoYW1teVwiLGlkOjE5ODQwfSx7ZGF0YTpcIndoYW1teVwiLGlkOjIyMzM3fSx7ZGF0YTpjKGkuZHVyYXRpb24pLGlkOjE3NTQ1fV19LHtpZDozNzQ2NDg0MjcsZGF0YTpbe2lkOjE3NCxkYXRhOlt7ZGF0YToxLGlkOjIxNX0se2RhdGE6MSxpZDoyOTYzN30se2RhdGE6MCxpZDoxNTZ9LHtkYXRhOlwidW5kXCIsaWQ6MjI3NDcxNn0se2RhdGE6XCJWX1ZQOFwiLGlkOjEzNH0se2RhdGE6XCJWUDhcIixpZDoyNDU5MjcyfSx7ZGF0YToxLGlkOjEzMX0se2lkOjIyNCxkYXRhOlt7ZGF0YTppLndpZHRoLGlkOjE3Nn0se2RhdGE6aS5oZWlnaHQsaWQ6MTg2fV19XX1dfSx7aWQ6NDc1MjQ5NTE1LGRhdGE6W119XX1dLHM9b1sxXSxkPXMuZGF0YVsyXSx1PTAsZj0wO3U8dC5sZW5ndGg7KXt2YXIgbD17aWQ6MTg3LGRhdGE6W3tkYXRhOk1hdGgucm91bmQoZiksaWQ6MTc5fSx7aWQ6MTgzLGRhdGE6W3tkYXRhOjEsaWQ6MjQ3fSx7ZGF0YTowLHNpemU6OCxpZDoyNDF9XX1dfTtkLmRhdGEucHVzaChsKTt2YXIgcD1bXSxtPTA7ZG8gcC5wdXNoKHRbdV0pLG0rPXRbdV0uZHVyYXRpb24sdSsrO3doaWxlKHU8dC5sZW5ndGgmJm08cik7dmFyIGc9MCx3PXtpZDo1MjQ1MzEzMTcsZGF0YTpbe2RhdGE6TWF0aC5yb3VuZChmKSxpZDoyMzF9XS5jb25jYXQocC5tYXAoZnVuY3Rpb24odCl7dmFyIGU9aCh7ZGlzY2FyZGFibGU6MCxmcmFtZTp0LmRhdGEuc2xpY2UoNCksaW52aXNpYmxlOjAsa2V5ZnJhbWU6MSxsYWNpbmc6MCx0cmFja051bToxLHRpbWVjb2RlOk1hdGgucm91bmQoZyl9KTtyZXR1cm4gZys9dC5kdXJhdGlvbix7ZGF0YTplLGlkOjE2M319KSl9O3MuZGF0YS5wdXNoKHcpLGYrPW19Zm9yKHZhciB2PTAseT0wO3k8cy5kYXRhLmxlbmd0aDt5Kyspe3k+PTMmJihkLmRhdGFbeS0zXS5kYXRhWzFdLmRhdGFbMV0uZGF0YT12KTt2YXIgYj1hKFtzLmRhdGFbeV1dLG4pO3YrPWIuc2l6ZXx8Yi5ieXRlTGVuZ3RofHxiLmxlbmd0aCwyIT15JiYocy5kYXRhW3ldPWIpfXJldHVybiBhKG8sbil9ZnVuY3Rpb24gZSh0KXtmb3IodmFyIGU9dFswXS53aWR0aCxuPXRbMF0uaGVpZ2h0LGk9dFswXS5kdXJhdGlvbixyPTE7cjx0Lmxlbmd0aDtyKyspe2lmKHRbcl0ud2lkdGghPWUpdGhyb3dcIkZyYW1lIFwiKyhyKzEpK1wiIGhhcyBhIGRpZmZlcmVudCB3aWR0aFwiO2lmKHRbcl0uaGVpZ2h0IT1uKXRocm93XCJGcmFtZSBcIisocisxKStcIiBoYXMgYSBkaWZmZXJlbnQgaGVpZ2h0XCI7aWYodFtyXS5kdXJhdGlvbjwwfHx0W3JdLmR1cmF0aW9uPjMyNzY3KXRocm93XCJGcmFtZSBcIisocisxKStcIiBoYXMgYSB3ZWlyZCBkdXJhdGlvbiAobXVzdCBiZSBiZXR3ZWVuIDAgYW5kIDMyNzY3KVwiO2krPXRbcl0uZHVyYXRpb259cmV0dXJue2R1cmF0aW9uOmksd2lkdGg6ZSxoZWlnaHQ6bn19ZnVuY3Rpb24gbih0KXtmb3IodmFyIGU9W107dD4wOyllLnB1c2goMjU1JnQpLHQ+Pj04O3JldHVybiBuZXcgVWludDhBcnJheShlLnJldmVyc2UoKSl9ZnVuY3Rpb24gaSh0LGUpe2Zvcih2YXIgbj1uZXcgVWludDhBcnJheShlKSxpPWUtMTtpPj0wO2ktLSluW2ldPTI1NSZ0LHQ+Pj04O3JldHVybiBufWZ1bmN0aW9uIHIodCl7Zm9yKHZhciBlPW5ldyBVaW50OEFycmF5KHQubGVuZ3RoKSxuPTA7bjx0Lmxlbmd0aDtuKyspZVtuXT10LmNoYXJDb2RlQXQobik7cmV0dXJuIGV9ZnVuY3Rpb24gbyh0KXt2YXIgZT1bXSxuPXQubGVuZ3RoJTg/bmV3IEFycmF5KDktdC5sZW5ndGglOCkuam9pbihcIjBcIik6XCJcIjt0PW4rdDtmb3IodmFyIGk9MDtpPHQubGVuZ3RoO2krPTgpZS5wdXNoKHBhcnNlSW50KHQuc3Vic3RyKGksOCksMikpO3JldHVybiBuZXcgVWludDhBcnJheShlKX1mdW5jdGlvbiBhKHQsZSl7Zm9yKHZhciBoPVtdLGQ9MDtkPHQubGVuZ3RoO2QrKylpZihcImlkXCJpbiB0W2RdKXt2YXIgdT10W2RdLmRhdGE7aWYoXCJvYmplY3RcIj09dHlwZW9mIHUmJih1PWEodSxlKSksXCJudW1iZXJcIj09dHlwZW9mIHUmJih1PVwic2l6ZVwiaW4gdFtkXT9pKHUsdFtkXS5zaXplKTpvKHUudG9TdHJpbmcoMikpKSxcInN0cmluZ1wiPT10eXBlb2YgdSYmKHU9cih1KSksdS5sZW5ndGgpO2Zvcih2YXIgYz11LnNpemV8fHUuYnl0ZUxlbmd0aHx8dS5sZW5ndGgsZj0wLGw9NTY7bD4wO2wtPTcpaWYoYz5NYXRoLnBvdygyLGwpLTIpe2Y9bC83O2JyZWFrfXZhciBwPWMudG9TdHJpbmcoMiksbT1uZXcgQXJyYXkoOCooZisxKSsxKS5qb2luKFwiMFwiKSxnPW5ldyBBcnJheShmKzEpLmpvaW4oXCIwXCIpKzEsdz1tLnN1YnN0cigwLG0ubGVuZ3RoLXAubGVuZ3RoLWcubGVuZ3RoKStwLHY9Zyt3O2gucHVzaChuKHRbZF0uaWQpKSxoLnB1c2gobyh2KSksaC5wdXNoKHUpfWVsc2UgaC5wdXNoKHRbZF0pO2lmKGUpe3ZhciB5PXMoaCk7cmV0dXJuIG5ldyBVaW50OEFycmF5KHkpfXJldHVybiBuZXcgQmxvYihoLHt0eXBlOlwidmlkZW8vd2VibVwifSl9ZnVuY3Rpb24gcyh0LGUpe251bGw9PWUmJihlPVtdKTtmb3IodmFyIG49MDtuPHQubGVuZ3RoO24rKylcIm9iamVjdFwiPT10eXBlb2YgdFtuXT9zKHRbbl0sZSk6ZS5wdXNoKHRbbl0pO3JldHVybiBlfWZ1bmN0aW9uIGgodCl7dmFyIGU9MDtpZih0LmtleWZyYW1lJiYoZXw9MTI4KSx0LmludmlzaWJsZSYmKGV8PTgpLHQubGFjaW5nJiYoZXw9dC5sYWNpbmc8PDEpLHQuZGlzY2FyZGFibGUmJihlfD0xKSx0LnRyYWNrTnVtPjEyNyl0aHJvd1wiVHJhY2tOdW1iZXIgPiAxMjcgbm90IHN1cHBvcnRlZFwiO3ZhciBuPVsxMjh8dC50cmFja051bSx0LnRpbWVjb2RlPj44LDI1NSZ0LnRpbWVjb2RlLGVdLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0KX0pLmpvaW4oXCJcIikrdC5mcmFtZTtyZXR1cm4gbn1mdW5jdGlvbiBkKHQpe2Zvcih2YXIgZT10LlJJRkZbMF0uV0VCUFswXSxuPWUuaW5kZXhPZihcIsKdXHUwMDAxKlwiKSxpPTAscj1bXTtpPDQ7aSsrKXJbaV09ZS5jaGFyQ29kZUF0KG4rMytpKTt2YXIgbyxhLHMsaCxkO3JldHVybiBkPXJbMV08PDh8clswXSxvPTE2MzgzJmQsYT1kPj4xNCxkPXJbM108PDh8clsyXSxzPTE2MzgzJmQsaD1kPj4xNCx7d2lkdGg6byxoZWlnaHQ6cyxkYXRhOmUscmlmZjp0fX1mdW5jdGlvbiB1KHQpe2Zvcih2YXIgZT0wLG49e307ZTx0Lmxlbmd0aDspe3ZhciBpPXQuc3Vic3RyKGUsNCk7aWYobltpXT1uW2ldfHxbXSxcIlJJRkZcIj09aXx8XCJMSVNUXCI9PWkpe3ZhciByPXBhcnNlSW50KHQuc3Vic3RyKGUrNCw0KS5zcGxpdChcIlwiKS5tYXAoZnVuY3Rpb24odCl7dmFyIGU9dC5jaGFyQ29kZUF0KDApLnRvU3RyaW5nKDIpO3JldHVybiBuZXcgQXJyYXkoOC1lLmxlbmd0aCsxKS5qb2luKFwiMFwiKStlfSkuam9pbihcIlwiKSwyKSxvPXQuc3Vic3RyKGUrNCs0LHIpO2UrPTgrcixuW2ldLnB1c2godShvKSl9ZWxzZVwiV0VCUFwiPT1pPyhuW2ldLnB1c2godC5zdWJzdHIoZSs4KSksZT10Lmxlbmd0aCk6KG5baV0ucHVzaCh0LnN1YnN0cihlKzQpKSxlPXQubGVuZ3RoKX1yZXR1cm4gbn1mdW5jdGlvbiBjKHQpe3JldHVybltdLnNsaWNlLmNhbGwobmV3IFVpbnQ4QXJyYXkobmV3IEZsb2F0NjRBcnJheShbdF0pLmJ1ZmZlciksMCkubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHQpfSkucmV2ZXJzZSgpLmpvaW4oXCJcIil9ZnVuY3Rpb24gZih0LGUpe3RoaXMuZnJhbWVzPVtdLHRoaXMuZHVyYXRpb249MWUzL3QsdGhpcy5xdWFsaXR5PWV8fC44fXJldHVybiBmLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCxlKXtpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgZSYmdGhpcy5kdXJhdGlvbil0aHJvd1wieW91IGNhbid0IHBhc3MgYSBkdXJhdGlvbiBpZiB0aGUgZnBzIGlzIHNldFwiO2lmKFwidW5kZWZpbmVkXCI9PXR5cGVvZiBlJiYhdGhpcy5kdXJhdGlvbil0aHJvd1wiaWYgeW91IGRvbid0IGhhdmUgdGhlIGZwcyBzZXQsIHlvdSBuZWVkIHRvIGhhdmUgZHVyYXRpb25zIGhlcmUuXCI7aWYodC5jYW52YXMmJih0PXQuY2FudmFzKSx0LnRvRGF0YVVSTCl0PXQuZ2V0Q29udGV4dChcIjJkXCIpLmdldEltYWdlRGF0YSgwLDAsdC53aWR0aCx0LmhlaWdodCk7ZWxzZSBpZihcInN0cmluZ1wiIT10eXBlb2YgdCl0aHJvd1wiZnJhbWUgbXVzdCBiZSBhIGEgSFRNTENhbnZhc0VsZW1lbnQsIGEgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIG9yIGEgRGF0YVVSSSBmb3JtYXR0ZWQgc3RyaW5nXCI7aWYoXCJzdHJpbmdcIj09dHlwZW9mIHQmJiEvXmRhdGE6aW1hZ2VcXC93ZWJwO2Jhc2U2NCwvZ2kudGVzdCh0KSl0aHJvd1wiSW5wdXQgbXVzdCBiZSBmb3JtYXR0ZWQgcHJvcGVybHkgYXMgYSBiYXNlNjQgZW5jb2RlZCBEYXRhVVJJIG9mIHR5cGUgaW1hZ2Uvd2VicFwiO3RoaXMuZnJhbWVzLnB1c2goe2ltYWdlOnQsZHVyYXRpb246ZXx8dGhpcy5kdXJhdGlvbn0pfSxmLnByb3RvdHlwZS5lbmNvZGVGcmFtZXM9ZnVuY3Rpb24odCl7aWYodGhpcy5mcmFtZXNbMF0uaW1hZ2UgaW5zdGFuY2VvZiBJbWFnZURhdGEpe3ZhciBlPXRoaXMuZnJhbWVzLG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxpPW4uZ2V0Q29udGV4dChcIjJkXCIpO24ud2lkdGg9dGhpcy5mcmFtZXNbMF0uaW1hZ2Uud2lkdGgsbi5oZWlnaHQ9dGhpcy5mcmFtZXNbMF0uaW1hZ2UuaGVpZ2h0O3ZhciByPWZ1bmN0aW9uKG8pe3ZhciBhPWVbb107aS5wdXRJbWFnZURhdGEoYS5pbWFnZSwwLDApLGEuaW1hZ2U9bi50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIsdGhpcy5xdWFsaXR5KSxvPGUubGVuZ3RoLTE/c2V0VGltZW91dChmdW5jdGlvbigpe3IobysxKX0sMSk6dCgpfS5iaW5kKHRoaXMpO3IoMCl9ZWxzZSB0KCl9LGYucHJvdG90eXBlLmNvbXBpbGU9ZnVuY3Rpb24oZSxuKXt0aGlzLmVuY29kZUZyYW1lcyhmdW5jdGlvbigpe3ZhciBpPW5ldyB0KHRoaXMuZnJhbWVzLm1hcChmdW5jdGlvbih0KXt2YXIgZT1kKHUoYXRvYih0LmltYWdlLnNsaWNlKDIzKSkpKTtyZXR1cm4gZS5kdXJhdGlvbj10LmR1cmF0aW9uLGV9KSxlKTtuKGkpfS5iaW5kKHRoaXMpKX0se1ZpZGVvOmYsZnJvbUltYWdlQXJyYXk6ZnVuY3Rpb24oZSxuLGkpe3JldHVybiB0KGUubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPWQodShhdG9iKHQuc2xpY2UoMjMpKSkpO3JldHVybiBlLmR1cmF0aW9uPTFlMy9uLGV9KSxpKX0sdG9XZWJNOnR9fSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt2YXIgZSxuPW5ldyBVaW50OEFycmF5KHQpO2ZvcihlPTA7ZTx0O2UrPTEpbltlXT0wO3JldHVybiBufWZ1bmN0aW9uIGUoZSxuLGkscil7dmFyIG89bitpLGE9dCgocGFyc2VJbnQoby9yKSsxKSpyKTtyZXR1cm4gYS5zZXQoZSksYX1mdW5jdGlvbiBuKHQsZSxuKXtyZXR1cm4gdD10LnRvU3RyaW5nKG58fDgpLFwiMDAwMDAwMDAwMDAwXCIuc3Vic3RyKHQubGVuZ3RoKzEyLWUpK3R9ZnVuY3Rpb24gaShlLG4saSl7dmFyIHIsbztmb3Iobj1ufHx0KGUubGVuZ3RoKSxpPWl8fDAscj0wLG89ZS5sZW5ndGg7cjxvO3IrPTEpbltpXT1lLmNoYXJDb2RlQXQociksaSs9MTtyZXR1cm4gbn1mdW5jdGlvbiByKHQpe2Z1bmN0aW9uIGUodCl7cmV0dXJuIG9bdD4+MTgmNjNdK29bdD4+MTImNjNdK29bdD4+NiY2M10rb1s2MyZ0XX12YXIgbixpLHIsYT10Lmxlbmd0aCUzLHM9XCJcIjtmb3Iobj0wLHI9dC5sZW5ndGgtYTtuPHI7bis9MylpPSh0W25dPDwxNikrKHRbbisxXTw8OCkrdFtuKzJdLHMrPWUoaSk7c3dpdGNoKHMubGVuZ3RoJTQpe2Nhc2UgMTpzKz1cIj1cIjticmVhaztjYXNlIDI6cys9XCI9PVwifXJldHVybiBzfXZhciBvPVtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIixcIklcIixcIkpcIixcIktcIixcIkxcIixcIk1cIixcIk5cIixcIk9cIixcIlBcIixcIlFcIixcIlJcIixcIlNcIixcIlRcIixcIlVcIixcIlZcIixcIldcIixcIlhcIixcIllcIixcIlpcIixcImFcIixcImJcIixcImNcIixcImRcIixcImVcIixcImZcIixcImdcIixcImhcIixcImlcIixcImpcIixcImtcIixcImxcIixcIm1cIixcIm5cIixcIm9cIixcInBcIixcInFcIixcInJcIixcInNcIixcInRcIixcInVcIixcInZcIixcIndcIixcInhcIixcInlcIixcInpcIixcIjBcIixcIjFcIixcIjJcIixcIjNcIixcIjRcIixcIjVcIixcIjZcIixcIjdcIixcIjhcIixcIjlcIixcIitcIixcIi9cIl07d2luZG93LnV0aWxzPXt9LHdpbmRvdy51dGlscy5jbGVhbj10LHdpbmRvdy51dGlscy5wYWQ9bix3aW5kb3cudXRpbHMuZXh0ZW5kPWUsd2luZG93LnV0aWxzLnN0cmluZ1RvVWludDg9aSx3aW5kb3cudXRpbHMudWludDhUb0Jhc2U2ND1yfSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0LGkpe3ZhciByPW4uY2xlYW4oNTEyKSxvPTA7cmV0dXJuIGUuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgbixpLGE9dFtlLmZpZWxkXXx8XCJcIjtmb3Iobj0wLGk9YS5sZW5ndGg7bjxpO24rPTEpcltvXT1hLmNoYXJDb2RlQXQobiksbys9MTtvKz1lLmxlbmd0aC1ufSksXCJmdW5jdGlvblwiPT10eXBlb2YgaT9pKHIsbyk6cn12YXIgZSxuPXdpbmRvdy51dGlscztlPVt7ZmllbGQ6XCJmaWxlTmFtZVwiLGxlbmd0aDoxMDB9LHtmaWVsZDpcImZpbGVNb2RlXCIsbGVuZ3RoOjh9LHtmaWVsZDpcInVpZFwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJnaWRcIixsZW5ndGg6OH0se2ZpZWxkOlwiZmlsZVNpemVcIixsZW5ndGg6MTJ9LHtmaWVsZDpcIm10aW1lXCIsbGVuZ3RoOjEyfSx7ZmllbGQ6XCJjaGVja3N1bVwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJ0eXBlXCIsbGVuZ3RoOjF9LHtmaWVsZDpcImxpbmtOYW1lXCIsbGVuZ3RoOjEwMH0se2ZpZWxkOlwidXN0YXJcIixsZW5ndGg6OH0se2ZpZWxkOlwib3duZXJcIixsZW5ndGg6MzJ9LHtmaWVsZDpcImdyb3VwXCIsbGVuZ3RoOjMyfSx7ZmllbGQ6XCJtYWpvck51bWJlclwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJtaW5vck51bWJlclwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJmaWxlbmFtZVByZWZpeFwiLGxlbmd0aDoxNTV9LHtmaWVsZDpcInBhZGRpbmdcIixsZW5ndGg6MTJ9XSx3aW5kb3cuaGVhZGVyPXt9LHdpbmRvdy5oZWFkZXIuc3RydWN0dXJlPWUsd2luZG93LmhlYWRlci5mb3JtYXQ9dH0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dGhpcy53cml0dGVuPTAsZT0odHx8MjApKnIsdGhpcy5vdXQ9aS5jbGVhbihlKSx0aGlzLmJsb2Nrcz1bXSx0aGlzLmxlbmd0aD0wfXZhciBlLG49d2luZG93LmhlYWRlcixpPXdpbmRvdy51dGlscyxyPTUxMjt0LnByb3RvdHlwZS5hcHBlbmQ9ZnVuY3Rpb24odCxlLG8sYSl7dmFyIHMsaCxkLHUsYyxmLGw7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpZT1pLnN0cmluZ1RvVWludDgoZSk7ZWxzZSBpZihlLmNvbnN0cnVjdG9yIT09VWludDhBcnJheS5wcm90b3R5cGUuY29uc3RydWN0b3IpdGhyb3dcIkludmFsaWQgaW5wdXQgdHlwZS4gWW91IGdhdmUgbWU6IFwiK2UuY29uc3RydWN0b3IudG9TdHJpbmcoKS5tYXRjaCgvZnVuY3Rpb25cXHMqKFskQS1aYS16X11bMC05QS1aYS16X10qKVxccypcXCgvKVsxXTtcImZ1bmN0aW9uXCI9PXR5cGVvZiBvJiYoYT1vLG89e30pLG89b3x8e30sZD1vLm1vZGV8fDQwOTUmcGFyc2VJbnQoXCI3NzdcIiw4KSx1PW8ubXRpbWV8fE1hdGguZmxvb3IoK25ldyBEYXRlLzFlMyksYz1vLnVpZHx8MCxmPW8uZ2lkfHwwLHM9e2ZpbGVOYW1lOnQsZmlsZU1vZGU6aS5wYWQoZCw3KSx1aWQ6aS5wYWQoYyw3KSxnaWQ6aS5wYWQoZiw3KSxmaWxlU2l6ZTppLnBhZChlLmxlbmd0aCwxMSksbXRpbWU6aS5wYWQodSwxMSksY2hlY2tzdW06XCIgICAgICAgIFwiLHR5cGU6XCIwXCIsdXN0YXI6XCJ1c3RhciAgXCIsb3duZXI6by5vd25lcnx8XCJcIixncm91cDpvLmdyb3VwfHxcIlwifSxoPTAsT2JqZWN0LmtleXMocykuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgZSxuLGk9c1t0XTtmb3IoZT0wLG49aS5sZW5ndGg7ZTxuO2UrPTEpaCs9aS5jaGFyQ29kZUF0KGUpfSkscy5jaGVja3N1bT1pLnBhZChoLDYpK1wiXFwwIFwiLGw9bi5mb3JtYXQocyk7dmFyIHA9TWF0aC5jZWlsKGwubGVuZ3RoL3IpKnIsbT1NYXRoLmNlaWwoZS5sZW5ndGgvcikqcjt0aGlzLmJsb2Nrcy5wdXNoKHtoZWFkZXI6bCxpbnB1dDplLGhlYWRlckxlbmd0aDpwLGlucHV0TGVuZ3RoOm19KX0sdC5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbigpe3ZhciB0PVtdLGU9W10sbj0wLGk9TWF0aC5wb3coMiwyMCksbz1bXTtyZXR1cm4gdGhpcy5ibG9ja3MuZm9yRWFjaChmdW5jdGlvbih0KXtuK3QuaGVhZGVyTGVuZ3RoK3QuaW5wdXRMZW5ndGg+aSYmKGUucHVzaCh7YmxvY2tzOm8sbGVuZ3RoOm59KSxvPVtdLG49MCksby5wdXNoKHQpLG4rPXQuaGVhZGVyTGVuZ3RoK3QuaW5wdXRMZW5ndGh9KSxlLnB1c2goe2Jsb2NrczpvLGxlbmd0aDpufSksZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBVaW50OEFycmF5KGUubGVuZ3RoKSxpPTA7ZS5ibG9ja3MuZm9yRWFjaChmdW5jdGlvbih0KXtuLnNldCh0LmhlYWRlcixpKSxpKz10LmhlYWRlckxlbmd0aCxuLnNldCh0LmlucHV0LGkpLGkrPXQuaW5wdXRMZW5ndGh9KSx0LnB1c2gobil9KSx0LnB1c2gobmV3IFVpbnQ4QXJyYXkoMipyKSksbmV3IEJsb2IodCx7dHlwZTpcIm9jdGV0L3N0cmVhbVwifSl9LHQucHJvdG90eXBlLmNsZWFyPWZ1bmN0aW9uKCl7dGhpcy53cml0dGVuPTAsdGhpcy5vdXQ9aS5jbGVhbihlKX0sd2luZG93LlRhcj10fSgpLGZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCxuKXtpZih7fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUuY2FjaGUsdCkpcmV0dXJuIGUuY2FjaGVbdF07dmFyIGk9ZS5yZXNvbHZlKHQpO2lmKCFpKXRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byByZXNvbHZlIG1vZHVsZSBcIit0KTt2YXIgcj17aWQ6dCxyZXF1aXJlOmUsZmlsZW5hbWU6dCxleHBvcnRzOnt9LGxvYWRlZDohMSxwYXJlbnQ6bixjaGlsZHJlbjpbXX07biYmbi5jaGlsZHJlbi5wdXNoKHIpO3ZhciBvPXQuc2xpY2UoMCx0Lmxhc3RJbmRleE9mKFwiL1wiKSsxKTtyZXR1cm4gZS5jYWNoZVt0XT1yLmV4cG9ydHMsaS5jYWxsKHIuZXhwb3J0cyxyLHIuZXhwb3J0cyxvLHQpLHIubG9hZGVkPSEwLGUuY2FjaGVbdF09ci5leHBvcnRzfWUubW9kdWxlcz17fSxlLmNhY2hlPXt9LGUucmVzb2x2ZT1mdW5jdGlvbih0KXtyZXR1cm57fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGUubW9kdWxlcyx0KT9lLm1vZHVsZXNbdF06dm9pZCAwfSxlLmRlZmluZT1mdW5jdGlvbih0LG4pe2UubW9kdWxlc1t0XT1ufTt2YXIgbj1mdW5jdGlvbihlKXtyZXR1cm4gZT1cIi9cIix7dGl0bGU6XCJicm93c2VyXCIsdmVyc2lvbjpcInYwLjEwLjI2XCIsYnJvd3NlcjohMCxlbnY6e30sYXJndjpbXSxuZXh0VGljazp0LnNldEltbWVkaWF0ZXx8ZnVuY3Rpb24odCl7c2V0VGltZW91dCh0LDApfSxjd2Q6ZnVuY3Rpb24oKXtyZXR1cm4gZX0sY2hkaXI6ZnVuY3Rpb24odCl7ZT10fX19KCk7ZS5kZWZpbmUoXCIvZ2lmLmNvZmZlZVwiLGZ1bmN0aW9uKHQsbixpLHIpe2Z1bmN0aW9uIG8odCxlKXtyZXR1cm57fS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHQsZSl9ZnVuY3Rpb24gYSh0LGUpe2Zvcih2YXIgbj0wLGk9ZS5sZW5ndGg7bjxpOysrbilpZihuIGluIGUmJmVbbl09PT10KXJldHVybiEwO3JldHVybiExfWZ1bmN0aW9uIHModCxlKXtmdW5jdGlvbiBuKCl7dGhpcy5jb25zdHJ1Y3Rvcj10fWZvcih2YXIgaSBpbiBlKW8oZSxpKSYmKHRbaV09ZVtpXSk7cmV0dXJuIG4ucHJvdG90eXBlPWUucHJvdG90eXBlLHQucHJvdG90eXBlPW5ldyBuLHQuX19zdXBlcl9fPWUucHJvdG90eXBlLHR9dmFyIGgsZCx1LGMsZjt1PWUoXCJldmVudHNcIix0KS5FdmVudEVtaXR0ZXIsaD1lKFwiL2Jyb3dzZXIuY29mZmVlXCIsdCksZj1mdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQpe3ZhciBlLG47dGhpcy5ydW5uaW5nPSExLHRoaXMub3B0aW9ucz17fSx0aGlzLmZyYW1lcz1bXSx0aGlzLmZyZWVXb3JrZXJzPVtdLHRoaXMuYWN0aXZlV29ya2Vycz1bXSx0aGlzLnNldE9wdGlvbnModCk7Zm9yKGUgaW4gZCluPWRbZV0sbnVsbCE9dGhpcy5vcHRpb25zW2VdP3RoaXMub3B0aW9uc1tlXTp0aGlzLm9wdGlvbnNbZV09bn1yZXR1cm4gcyhlLHQpLGQ9e3dvcmtlclNjcmlwdDpcImdpZi53b3JrZXIuanNcIix3b3JrZXJzOjIscmVwZWF0OjAsYmFja2dyb3VuZDpcIiNmZmZcIixxdWFsaXR5OjEwLHdpZHRoOm51bGwsaGVpZ2h0Om51bGwsdHJhbnNwYXJlbnQ6bnVsbH0sYz17ZGVsYXk6NTAwLGNvcHk6ITF9LGUucHJvdG90eXBlLnNldE9wdGlvbj1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLm9wdGlvbnNbdF09ZSxudWxsPT10aGlzLl9jYW52YXN8fFwid2lkdGhcIiE9PXQmJlwiaGVpZ2h0XCIhPT10P3ZvaWQgMDp0aGlzLl9jYW52YXNbdF09ZX0sZS5wcm90b3R5cGUuc2V0T3B0aW9ucz1mdW5jdGlvbih0KXt2YXIgZSxuO3JldHVybiBmdW5jdGlvbihpKXtmb3IoZSBpbiB0KW8odCxlKSYmKG49dFtlXSxpLnB1c2godGhpcy5zZXRPcHRpb24oZSxuKSkpO3JldHVybiBpfS5jYWxsKHRoaXMsW10pfSxlLnByb3RvdHlwZS5hZGRGcmFtZT1mdW5jdGlvbih0LGUpe3ZhciBuLGk7bnVsbD09ZSYmKGU9e30pLG49e30sbi50cmFuc3BhcmVudD10aGlzLm9wdGlvbnMudHJhbnNwYXJlbnQ7Zm9yKGkgaW4gYyluW2ldPWVbaV18fGNbaV07aWYobnVsbCE9dGhpcy5vcHRpb25zLndpZHRofHx0aGlzLnNldE9wdGlvbihcIndpZHRoXCIsdC53aWR0aCksbnVsbCE9dGhpcy5vcHRpb25zLmhlaWdodHx8dGhpcy5zZXRPcHRpb24oXCJoZWlnaHRcIix0LmhlaWdodCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIEltYWdlRGF0YSYmbnVsbCE9SW1hZ2VEYXRhJiZ0IGluc3RhbmNlb2YgSW1hZ2VEYXRhKW4uZGF0YT10LmRhdGE7ZWxzZSBpZihcInVuZGVmaW5lZFwiIT10eXBlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEJiZudWxsIT1DYW52YXNSZW5kZXJpbmdDb250ZXh0MkQmJnQgaW5zdGFuY2VvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkR8fFwidW5kZWZpbmVkXCIhPXR5cGVvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQmJm51bGwhPVdlYkdMUmVuZGVyaW5nQ29udGV4dCYmdCBpbnN0YW5jZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCllLmNvcHk/bi5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEodCk6bi5jb250ZXh0PXQ7ZWxzZXtpZihudWxsPT10LmNoaWxkTm9kZXMpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBpbWFnZVwiKTtlLmNvcHk/bi5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKHQpOm4uaW1hZ2U9dH1yZXR1cm4gdGhpcy5mcmFtZXMucHVzaChuKX0sZS5wcm90b3R5cGUucmVuZGVyPWZ1bmN0aW9uKCl7dmFyIHQsZTtpZih0aGlzLnJ1bm5pbmcpdGhyb3cgbmV3IEVycm9yKFwiQWxyZWFkeSBydW5uaW5nXCIpO2lmKG51bGw9PXRoaXMub3B0aW9ucy53aWR0aHx8bnVsbD09dGhpcy5vcHRpb25zLmhlaWdodCl0aHJvdyBuZXcgRXJyb3IoXCJXaWR0aCBhbmQgaGVpZ2h0IG11c3QgYmUgc2V0IHByaW9yIHRvIHJlbmRlcmluZ1wiKTt0aGlzLnJ1bm5pbmc9ITAsdGhpcy5uZXh0RnJhbWU9MCx0aGlzLmZpbmlzaGVkRnJhbWVzPTAsdGhpcy5pbWFnZVBhcnRzPWZ1bmN0aW9uKGUpe2Zvcih2YXIgbj1mdW5jdGlvbigpe3ZhciB0O3Q9W107Zm9yKHZhciBlPTA7MDw9dGhpcy5mcmFtZXMubGVuZ3RoP2U8dGhpcy5mcmFtZXMubGVuZ3RoOmU+dGhpcy5mcmFtZXMubGVuZ3RoOzA8PXRoaXMuZnJhbWVzLmxlbmd0aD8rK2U6LS1lKXQucHVzaChlKTtyZXR1cm4gdH0uYXBwbHkodGhpcyxhcmd1bWVudHMpLGk9MCxyPW4ubGVuZ3RoO2k8cjsrK2kpdD1uW2ldLGUucHVzaChudWxsKTtyZXR1cm4gZX0uY2FsbCh0aGlzLFtdKSxlPXRoaXMuc3Bhd25Xb3JrZXJzKCk7Zm9yKHZhciBuPWZ1bmN0aW9uKCl7dmFyIHQ7dD1bXTtmb3IodmFyIG49MDswPD1lP248ZTpuPmU7MDw9ZT8rK246LS1uKXQucHVzaChuKTtyZXR1cm4gdH0uYXBwbHkodGhpcyxhcmd1bWVudHMpLGk9MCxyPW4ubGVuZ3RoO2k8cjsrK2kpdD1uW2ldLHRoaXMucmVuZGVyTmV4dEZyYW1lKCk7cmV0dXJuIHRoaXMuZW1pdChcInN0YXJ0XCIpLHRoaXMuZW1pdChcInByb2dyZXNzXCIsMCl9LGUucHJvdG90eXBlLmFib3J0PWZ1bmN0aW9uKCl7Zm9yKHZhciB0Ozspe2lmKHQ9dGhpcy5hY3RpdmVXb3JrZXJzLnNoaWZ0KCksIShudWxsIT10KSlicmVhaztjb25zb2xlLmxvZyhcImtpbGxpbmcgYWN0aXZlIHdvcmtlclwiKSx0LnRlcm1pbmF0ZSgpfXJldHVybiB0aGlzLnJ1bm5pbmc9ITEsdGhpcy5lbWl0KFwiYWJvcnRcIil9LGUucHJvdG90eXBlLnNwYXduV29ya2Vycz1mdW5jdGlvbigpe3ZhciB0O3JldHVybiB0PU1hdGgubWluKHRoaXMub3B0aW9ucy53b3JrZXJzLHRoaXMuZnJhbWVzLmxlbmd0aCksZnVuY3Rpb24oKXt2YXIgZTtlPVtdO2Zvcih2YXIgbj10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDt0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDw9dD9uPHQ6bj50O3RoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPD10PysrbjotLW4pZS5wdXNoKG4pO3JldHVybiBlfS5hcHBseSh0aGlzLGFyZ3VtZW50cykuZm9yRWFjaChmdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSl7dmFyIG47cmV0dXJuIGNvbnNvbGUubG9nKFwic3Bhd25pbmcgd29ya2VyIFwiK2UpLG49bmV3IFdvcmtlcih0Lm9wdGlvbnMud29ya2VyU2NyaXB0KSxuLm9ubWVzc2FnZT1mdW5jdGlvbih0KXtyZXR1cm4gZnVuY3Rpb24oZSl7cmV0dXJuIHQuYWN0aXZlV29ya2Vycy5zcGxpY2UodC5hY3RpdmVXb3JrZXJzLmluZGV4T2YobiksMSksdC5mcmVlV29ya2Vycy5wdXNoKG4pLHQuZnJhbWVGaW5pc2hlZChlLmRhdGEpfX0odCksdC5mcmVlV29ya2Vycy5wdXNoKG4pfX0odGhpcykpLHR9LGUucHJvdG90eXBlLmZyYW1lRmluaXNoZWQ9ZnVuY3Rpb24odCl7cmV0dXJuIGNvbnNvbGUubG9nKFwiZnJhbWUgXCIrdC5pbmRleCtcIiBmaW5pc2hlZCAtIFwiK3RoaXMuYWN0aXZlV29ya2Vycy5sZW5ndGgrXCIgYWN0aXZlXCIpLHRoaXMuZmluaXNoZWRGcmFtZXMrKyx0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLHRoaXMuZmluaXNoZWRGcmFtZXMvdGhpcy5mcmFtZXMubGVuZ3RoKSx0aGlzLmltYWdlUGFydHNbdC5pbmRleF09dCxhKG51bGwsdGhpcy5pbWFnZVBhcnRzKT90aGlzLnJlbmRlck5leHRGcmFtZSgpOnRoaXMuZmluaXNoUmVuZGVyaW5nKCl9LGUucHJvdG90eXBlLmZpbmlzaFJlbmRlcmluZz1mdW5jdGlvbigpe3ZhciB0LGUsbixpLHIsbyxhO3I9MDtmb3IodmFyIHM9MCxoPXRoaXMuaW1hZ2VQYXJ0cy5sZW5ndGg7czxoOysrcyllPXRoaXMuaW1hZ2VQYXJ0c1tzXSxyKz0oZS5kYXRhLmxlbmd0aC0xKSplLnBhZ2VTaXplK2UuY3Vyc29yO3IrPWUucGFnZVNpemUtZS5jdXJzb3IsY29uc29sZS5sb2coXCJyZW5kZXJpbmcgZmluaXNoZWQgLSBmaWxlc2l6ZSBcIitNYXRoLnJvdW5kKHIvMWUzKStcImtiXCIpLHQ9bmV3IFVpbnQ4QXJyYXkociksbz0wO2Zvcih2YXIgZD0wLHU9dGhpcy5pbWFnZVBhcnRzLmxlbmd0aDtkPHU7KytkKXtlPXRoaXMuaW1hZ2VQYXJ0c1tkXTtmb3IodmFyIGM9MCxmPWUuZGF0YS5sZW5ndGg7YzxmOysrYylhPWUuZGF0YVtjXSxuPWMsdC5zZXQoYSxvKSxvKz1uPT09ZS5kYXRhLmxlbmd0aC0xP2UuY3Vyc29yOmUucGFnZVNpemV9cmV0dXJuIGk9bmV3IEJsb2IoW3RdLHt0eXBlOlwiaW1hZ2UvZ2lmXCJ9KSx0aGlzLmVtaXQoXCJmaW5pc2hlZFwiLGksdCl9LGUucHJvdG90eXBlLnJlbmRlck5leHRGcmFtZT1mdW5jdGlvbigpe3ZhciB0LGUsbjtpZigwPT09dGhpcy5mcmVlV29ya2Vycy5sZW5ndGgpdGhyb3cgbmV3IEVycm9yKFwiTm8gZnJlZSB3b3JrZXJzXCIpO3JldHVybiB0aGlzLm5leHRGcmFtZT49dGhpcy5mcmFtZXMubGVuZ3RoP3ZvaWQgMDoodD10aGlzLmZyYW1lc1t0aGlzLm5leHRGcmFtZSsrXSxuPXRoaXMuZnJlZVdvcmtlcnMuc2hpZnQoKSxlPXRoaXMuZ2V0VGFzayh0KSxjb25zb2xlLmxvZyhcInN0YXJ0aW5nIGZyYW1lIFwiKyhlLmluZGV4KzEpK1wiIG9mIFwiK3RoaXMuZnJhbWVzLmxlbmd0aCksdGhpcy5hY3RpdmVXb3JrZXJzLnB1c2gobiksbi5wb3N0TWVzc2FnZShlKSl9LGUucHJvdG90eXBlLmdldENvbnRleHREYXRhPWZ1bmN0aW9uKHQpe3JldHVybiB0LmdldEltYWdlRGF0YSgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpLmRhdGF9LGUucHJvdG90eXBlLmdldEltYWdlRGF0YT1mdW5jdGlvbih0KXt2YXIgZTtyZXR1cm4gbnVsbCE9dGhpcy5fY2FudmFzfHwodGhpcy5fY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdGhpcy5fY2FudmFzLndpZHRoPXRoaXMub3B0aW9ucy53aWR0aCx0aGlzLl9jYW52YXMuaGVpZ2h0PXRoaXMub3B0aW9ucy5oZWlnaHQpLGU9dGhpcy5fY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSxlLnNldEZpbGw9dGhpcy5vcHRpb25zLmJhY2tncm91bmQsZS5maWxsUmVjdCgwLDAsdGhpcy5vcHRpb25zLndpZHRoLHRoaXMub3B0aW9ucy5oZWlnaHQpLGUuZHJhd0ltYWdlKHQsMCwwKSx0aGlzLmdldENvbnRleHREYXRhKGUpfSxlLnByb3RvdHlwZS5nZXRUYXNrPWZ1bmN0aW9uKHQpe3ZhciBlLG47aWYoZT10aGlzLmZyYW1lcy5pbmRleE9mKHQpLG49e2luZGV4OmUsbGFzdDplPT09dGhpcy5mcmFtZXMubGVuZ3RoLTEsZGVsYXk6dC5kZWxheSx0cmFuc3BhcmVudDp0LnRyYW5zcGFyZW50LHdpZHRoOnRoaXMub3B0aW9ucy53aWR0aCxoZWlnaHQ6dGhpcy5vcHRpb25zLmhlaWdodCxxdWFsaXR5OnRoaXMub3B0aW9ucy5xdWFsaXR5LHJlcGVhdDp0aGlzLm9wdGlvbnMucmVwZWF0LGNhblRyYW5zZmVyOlwiY2hyb21lXCI9PT1oLm5hbWV9LG51bGwhPXQuZGF0YSluLmRhdGE9dC5kYXRhO2Vsc2UgaWYobnVsbCE9dC5jb250ZXh0KW4uZGF0YT10aGlzLmdldENvbnRleHREYXRhKHQuY29udGV4dCk7ZWxzZXtpZihudWxsPT10LmltYWdlKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgZnJhbWVcIik7bi5kYXRhPXRoaXMuZ2V0SW1hZ2VEYXRhKHQuaW1hZ2UpfXJldHVybiBufSxlfSh1KSx0LmV4cG9ydHM9Zn0pLGUuZGVmaW5lKFwiL2Jyb3dzZXIuY29mZmVlXCIsZnVuY3Rpb24odCxlLG4saSl7dmFyIHIsbyxhLHMsaDtzPW5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKSxhPW5hdmlnYXRvci5wbGF0Zm9ybS50b0xvd2VyQ2FzZSgpLGg9cy5tYXRjaCgvKG9wZXJhfGllfGZpcmVmb3h8Y2hyb21lfHZlcnNpb24pW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyk/Lio/KHNhZmFyaXx2ZXJzaW9uW1xcc1xcLzpdKFtcXHdcXGRcXC5dKyl8JCkvKXx8W251bGwsXCJ1bmtub3duXCIsMF0sbz1cImllXCI9PT1oWzFdJiZkb2N1bWVudC5kb2N1bWVudE1vZGUscj17bmFtZTpcInZlcnNpb25cIj09PWhbMV0/aFszXTpoWzFdLHZlcnNpb246b3x8cGFyc2VGbG9hdChcIm9wZXJhXCI9PT1oWzFdJiZoWzRdP2hbNF06aFsyXSkscGxhdGZvcm06e25hbWU6cy5tYXRjaCgvaXAoPzphZHxvZHxob25lKS8pP1wiaW9zXCI6KHMubWF0Y2goLyg/OndlYm9zfGFuZHJvaWQpLyl8fGEubWF0Y2goL21hY3x3aW58bGludXgvKXx8W1wib3RoZXJcIl0pWzBdfX0scltyLm5hbWVdPSEwLHJbci5uYW1lK3BhcnNlSW50KHIudmVyc2lvbiwxMCldPSEwLHIucGxhdGZvcm1bci5wbGF0Zm9ybS5uYW1lXT0hMCx0LmV4cG9ydHM9cn0pLGUuZGVmaW5lKFwiZXZlbnRzXCIsZnVuY3Rpb24odCxlLGkscil7bi5FdmVudEVtaXR0ZXJ8fChuLkV2ZW50RW1pdHRlcj1mdW5jdGlvbigpe30pO3ZhciBvPWUuRXZlbnRFbWl0dGVyPW4uRXZlbnRFbWl0dGVyLGE9XCJmdW5jdGlvblwiPT10eXBlb2YgQXJyYXkuaXNBcnJheT9BcnJheS5pc0FycmF5OmZ1bmN0aW9uKHQpe3JldHVyblwiW29iamVjdCBBcnJheV1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX0scz0xMDtvLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnM9ZnVuY3Rpb24odCl7dGhpcy5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPXt9KSx0aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzPXR9LG8ucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24odCl7aWYoXCJlcnJvclwiPT09dCYmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHMuZXJyb3J8fGEodGhpcy5fZXZlbnRzLmVycm9yKSYmIXRoaXMuX2V2ZW50cy5lcnJvci5sZW5ndGgpKXRocm93IGFyZ3VtZW50c1sxXWluc3RhbmNlb2YgRXJyb3I/YXJndW1lbnRzWzFdOm5ldyBFcnJvcihcIlVuY2F1Z2h0LCB1bnNwZWNpZmllZCAnZXJyb3InIGV2ZW50LlwiKTtpZighdGhpcy5fZXZlbnRzKXJldHVybiExO3ZhciBlPXRoaXMuX2V2ZW50c1t0XTtpZighZSlyZXR1cm4hMTtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXtpZihhKGUpKXtmb3IodmFyIG49QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpLGk9ZS5zbGljZSgpLHI9MCxvPWkubGVuZ3RoO3I8bztyKyspaVtyXS5hcHBseSh0aGlzLG4pO3JldHVybiEwfXJldHVybiExfXN3aXRjaChhcmd1bWVudHMubGVuZ3RoKXtjYXNlIDE6ZS5jYWxsKHRoaXMpO2JyZWFrO2Nhc2UgMjplLmNhbGwodGhpcyxhcmd1bWVudHNbMV0pO2JyZWFrO2Nhc2UgMzplLmNhbGwodGhpcyxhcmd1bWVudHNbMV0sYXJndW1lbnRzWzJdKTticmVhaztkZWZhdWx0OnZhciBuPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKTtlLmFwcGx5KHRoaXMsbil9cmV0dXJuITB9LG8ucHJvdG90eXBlLmFkZExpc3RlbmVyPWZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJhZGRMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvblwiKTtpZih0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pLHRoaXMuZW1pdChcIm5ld0xpc3RlbmVyXCIsdCxlKSx0aGlzLl9ldmVudHNbdF0paWYoYSh0aGlzLl9ldmVudHNbdF0pKXtpZighdGhpcy5fZXZlbnRzW3RdLndhcm5lZCl7dmFyIG47bj12b2lkIDAhPT10aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzP3RoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM6cyxuJiZuPjAmJnRoaXMuX2V2ZW50c1t0XS5sZW5ndGg+biYmKHRoaXMuX2V2ZW50c1t0XS53YXJuZWQ9ITAsY29uc29sZS5lcnJvcihcIihub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5IGxlYWsgZGV0ZWN0ZWQuICVkIGxpc3RlbmVycyBhZGRlZC4gVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuXCIsdGhpcy5fZXZlbnRzW3RdLmxlbmd0aCksY29uc29sZS50cmFjZSgpKX10aGlzLl9ldmVudHNbdF0ucHVzaChlKX1lbHNlIHRoaXMuX2V2ZW50c1t0XT1bdGhpcy5fZXZlbnRzW3RdLGVdO2Vsc2UgdGhpcy5fZXZlbnRzW3RdPWU7cmV0dXJuIHRoaXN9LG8ucHJvdG90eXBlLm9uPW8ucHJvdG90eXBlLmFkZExpc3RlbmVyLG8ucHJvdG90eXBlLm9uY2U9ZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzO3JldHVybiBuLm9uKHQsZnVuY3Rpb24gaSgpe24ucmVtb3ZlTGlzdGVuZXIodCxpKSxlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX0pLHRoaXN9LG8ucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyPWZ1bmN0aW9uKHQsZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBuZXcgRXJyb3IoXCJyZW1vdmVMaXN0ZW5lciBvbmx5IHRha2VzIGluc3RhbmNlcyBvZiBGdW5jdGlvblwiKTtpZighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzW3RdKXJldHVybiB0aGlzO3ZhciBuPXRoaXMuX2V2ZW50c1t0XTtpZihhKG4pKXt2YXIgaT1uLmluZGV4T2YoZSk7aWYoaTwwKXJldHVybiB0aGlzO24uc3BsaWNlKGksMSksMD09bi5sZW5ndGgmJmRlbGV0ZSB0aGlzLl9ldmVudHNbdF19ZWxzZSB0aGlzLl9ldmVudHNbdF09PT1lJiZkZWxldGUgdGhpcy5fZXZlbnRzW3RdO3JldHVybiB0aGlzfSxvLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnM9ZnVuY3Rpb24odCl7cmV0dXJuIHQmJnRoaXMuX2V2ZW50cyYmdGhpcy5fZXZlbnRzW3RdJiYodGhpcy5fZXZlbnRzW3RdPW51bGwpLHRoaXN9LG8ucHJvdG90eXBlLmxpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPXt9KSx0aGlzLl9ldmVudHNbdF18fCh0aGlzLl9ldmVudHNbdF09W10pLGEodGhpcy5fZXZlbnRzW3RdKXx8KHRoaXMuX2V2ZW50c1t0XT1bdGhpcy5fZXZlbnRzW3RdXSksdGhpcy5fZXZlbnRzW3RdfX0pLHQuR0lGPWUoXCIvZ2lmLmNvZmZlZVwiKX0uY2FsbCh0aGlzLHRoaXMpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXtyZXR1cm4gdCYmdC5PYmplY3Q9PT1PYmplY3Q/dDpudWxsfWZ1bmN0aW9uIGUodCl7cmV0dXJuIFN0cmluZyhcIjAwMDAwMDBcIit0KS5zbGljZSgtNyl9ZnVuY3Rpb24gbigpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gTWF0aC5mbG9vcig2NTUzNiooMStNYXRoLnJhbmRvbSgpKSkudG9TdHJpbmcoMTYpLnN1YnN0cmluZygxKX1yZXR1cm4gdCgpK3QoKStcIi1cIit0KCkrXCItXCIrdCgpK1wiLVwiK3QoKStcIi1cIit0KCkrdCgpK3QoKX1mdW5jdGlvbiBpKHQpe3ZhciBlPXt9O3RoaXMuc2V0dGluZ3M9dCx0aGlzLm9uPWZ1bmN0aW9uKHQsbil7ZVt0XT1ufSx0aGlzLmVtaXQ9ZnVuY3Rpb24odCl7dmFyIG49ZVt0XTtuJiZuLmFwcGx5KG51bGwsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKX0sdGhpcy5maWxlbmFtZT10Lm5hbWV8fG4oKSx0aGlzLmV4dGVuc2lvbj1cIlwiLHRoaXMubWltZVR5cGU9XCJcIn1mdW5jdGlvbiByKHQpe2kuY2FsbCh0aGlzLHQpLHRoaXMuZXh0ZW5zaW9uPVwiLnRhclwiLHRoaXMubWltZVR5cGU9XCJhcHBsaWNhdGlvbi94LXRhclwiLHRoaXMuZmlsZUV4dGVuc2lvbj1cIlwiLHRoaXMudGFwZT1udWxsLHRoaXMuY291bnQ9MH1mdW5jdGlvbiBvKHQpe3IuY2FsbCh0aGlzLHQpLHRoaXMudHlwZT1cImltYWdlL3BuZ1wiLHRoaXMuZmlsZUV4dGVuc2lvbj1cIi5wbmdcIn1mdW5jdGlvbiBhKHQpe3IuY2FsbCh0aGlzLHQpLHRoaXMudHlwZT1cImltYWdlL2pwZWdcIix0aGlzLmZpbGVFeHRlbnNpb249XCIuanBnXCIsdGhpcy5xdWFsaXR5PXQucXVhbGl0eS8xMDB8fC44fWZ1bmN0aW9uIHModCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKTtcImltYWdlL3dlYnBcIiE9PWUudG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiKS5zdWJzdHIoNSwxMCkmJmNvbnNvbGUubG9nKFwiV2ViUCBub3Qgc3VwcG9ydGVkIC0gdHJ5IGFub3RoZXIgZXhwb3J0IGZvcm1hdFwiKSxpLmNhbGwodGhpcyx0KSx0aGlzLnF1YWxpdHk9dC5xdWFsaXR5LzEwMHx8LjgsdGhpcy5leHRlbnNpb249XCIud2VibVwiLHRoaXMubWltZVR5cGU9XCJ2aWRlby93ZWJtXCIsdGhpcy5iYXNlRmlsZW5hbWU9dGhpcy5maWxlbmFtZSx0aGlzLmZyYW1lcz1bXSx0aGlzLnBhcnQ9MX1mdW5jdGlvbiBoKHQpe2kuY2FsbCh0aGlzLHQpLHQucXVhbGl0eT10LnF1YWxpdHkvMTAwfHwuOCx0aGlzLmVuY29kZXI9bmV3IEZGTXBlZ1NlcnZlci5WaWRlbyh0KSx0aGlzLmVuY29kZXIub24oXCJwcm9jZXNzXCIsZnVuY3Rpb24oKXt0aGlzLmVtaXQoXCJwcm9jZXNzXCIpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJmaW5pc2hlZFwiLGZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcy5jYWxsYmFjaztuJiYodGhpcy5jYWxsYmFjaz12b2lkIDAsbih0LGUpKX0uYmluZCh0aGlzKSksdGhpcy5lbmNvZGVyLm9uKFwicHJvZ3Jlc3NcIixmdW5jdGlvbih0KXt0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MmJnRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyh0KX0uYmluZCh0aGlzKSksdGhpcy5lbmNvZGVyLm9uKFwiZXJyb3JcIixmdW5jdGlvbih0KXthbGVydChKU09OLnN0cmluZ2lmeSh0LG51bGwsMikpfS5iaW5kKHRoaXMpKX1mdW5jdGlvbiBkKHQpe2kuY2FsbCh0aGlzLHQpLHRoaXMuZnJhbWVyYXRlPXRoaXMuc2V0dGluZ3MuZnJhbWVyYXRlLHRoaXMudHlwZT1cInZpZGVvL3dlYm1cIix0aGlzLmV4dGVuc2lvbj1cIi53ZWJtXCIsdGhpcy5zdHJlYW09bnVsbCx0aGlzLm1lZGlhUmVjb3JkZXI9bnVsbCx0aGlzLmNodW5rcz1bXX1mdW5jdGlvbiB1KHQpe2kuY2FsbCh0aGlzLHQpLHQucXVhbGl0eT0zMS0oMzAqdC5xdWFsaXR5LzEwMHx8MTApLHQud29ya2Vycz10LndvcmtlcnN8fDQsdGhpcy5leHRlbnNpb249XCIuZ2lmXCIsdGhpcy5taW1lVHlwZT1cImltYWdlL2dpZlwiLHRoaXMuY2FudmFzPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksdGhpcy5jdHg9dGhpcy5jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLHRoaXMuc2l6ZVNldD0hMSx0aGlzLmVuY29kZXI9bmV3IEdJRih7d29ya2Vyczp0LndvcmtlcnMscXVhbGl0eTp0LnF1YWxpdHksd29ya2VyU2NyaXB0OnQud29ya2Vyc1BhdGgrXCJnaWYud29ya2VyLmpzXCJ9KSx0aGlzLmVuY29kZXIub24oXCJwcm9ncmVzc1wiLGZ1bmN0aW9uKHQpe3RoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyYmdGhpcy5zZXR0aW5ncy5vblByb2dyZXNzKHQpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJmaW5pc2hlZFwiLGZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMuY2FsbGJhY2s7ZSYmKHRoaXMuY2FsbGJhY2s9dm9pZCAwLGUodCkpfS5iaW5kKHRoaXMpKX1mdW5jdGlvbiBjKHQpe2Z1bmN0aW9uIGUoKXtmdW5jdGlvbiB0KCl7cmV0dXJuIHRoaXMuX2hvb2tlZHx8KHRoaXMuX2hvb2tlZD0hMCx0aGlzLl9ob29rZWRUaW1lPXRoaXMuY3VycmVudFRpbWV8fDAsdGhpcy5wYXVzZSgpLG50LnB1c2godGhpcykpLHRoaXMuX2hvb2tlZFRpbWUrUy5zdGFydFRpbWV9YihcIkNhcHR1cmVyIHN0YXJ0XCIpLEE9d2luZG93LkRhdGUubm93KCksTD1BK1Muc3RhcnRUaW1lLEk9d2luZG93LnBlcmZvcm1hbmNlLm5vdygpLEU9SStTLnN0YXJ0VGltZSx3aW5kb3cuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZT1mdW5jdGlvbigpe3JldHVybiBMfSx3aW5kb3cuRGF0ZS5ub3c9ZnVuY3Rpb24oKXtyZXR1cm4gTH0sd2luZG93LnNldFRpbWVvdXQ9ZnVuY3Rpb24odCxlKXt2YXIgbj17Y2FsbGJhY2s6dCx0aW1lOmUsdHJpZ2dlclRpbWU6TCtlfTtyZXR1cm4gQi5wdXNoKG4pLGIoXCJUaW1lb3V0IHNldCB0byBcIituLnRpbWUpLG59LHdpbmRvdy5jbGVhclRpbWVvdXQ9ZnVuY3Rpb24odCl7Zm9yKHZhciBlPTA7ZTxCLmxlbmd0aDtlKyspQltlXSE9dHx8KEIuc3BsaWNlKGUsMSksYihcIlRpbWVvdXQgY2xlYXJlZFwiKSl9LHdpbmRvdy5zZXRJbnRlcnZhbD1mdW5jdGlvbih0LGUpe3ZhciBuPXtjYWxsYmFjazp0LHRpbWU6ZSx0cmlnZ2VyVGltZTpMK2V9O3JldHVybiBqLnB1c2gobiksYihcIkludGVydmFsIHNldCB0byBcIituLnRpbWUpLG59LHdpbmRvdy5jbGVhckludGVydmFsPWZ1bmN0aW9uKHQpe3JldHVybiBiKFwiY2xlYXIgSW50ZXJ2YWxcIiksbnVsbH0sd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT1mdW5jdGlvbih0KXtVLnB1c2godCl9LHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c9ZnVuY3Rpb24oKXtyZXR1cm4gRX07dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MVmlkZW9FbGVtZW50LnByb3RvdHlwZSxcImN1cnJlbnRUaW1lXCIse2dldDp0fSksT2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxBdWRpb0VsZW1lbnQucHJvdG90eXBlLFwiY3VycmVudFRpbWVcIix7Z2V0OnR9KX1jYXRjaCh0KXtiKHQpfX1mdW5jdGlvbiBuKCl7ZSgpLEQuc3RhcnQoKSxNPSEwfWZ1bmN0aW9uIGkoKXtNPSExLEQuc3RvcCgpLGYoKX1mdW5jdGlvbiByKHQsZSl7Wih0LDAsZSl9ZnVuY3Rpb24gYygpe3Iodil9ZnVuY3Rpb24gZigpe2IoXCJDYXB0dXJlciBzdG9wXCIpLHdpbmRvdy5zZXRUaW1lb3V0PVosd2luZG93LnNldEludGVydmFsPUosd2luZG93LmNsZWFySW50ZXJ2YWw9WSx3aW5kb3cuY2xlYXJUaW1lb3V0PSQsd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZT1RLHdpbmRvdy5EYXRlLnByb3RvdHlwZS5nZXRUaW1lPWV0LHdpbmRvdy5EYXRlLm5vdz1YLHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c9dHR9ZnVuY3Rpb24gbCgpe3ZhciB0PVIvUy5mcmFtZXJhdGU7KFMuZnJhbWVMaW1pdCYmUj49Uy5mcmFtZUxpbWl0fHxTLnRpbWVMaW1pdCYmdD49Uy50aW1lTGltaXQpJiYoaSgpLHkoKSk7dmFyIGU9bmV3IERhdGUobnVsbCk7ZS5zZXRTZWNvbmRzKHQpLFMubW90aW9uQmx1ckZyYW1lcz4yP1AudGV4dENvbnRlbnQ9XCJDQ2FwdHVyZSBcIitTLmZvcm1hdCtcIiB8IFwiK1IrXCIgZnJhbWVzIChcIitPK1wiIGludGVyKSB8IFwiK2UudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsOCk6UC50ZXh0Q29udGVudD1cIkNDYXB0dXJlIFwiK1MuZm9ybWF0K1wiIHwgXCIrUitcIiBmcmFtZXMgfCBcIitlLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLDgpfWZ1bmN0aW9uIHAodCl7Ti53aWR0aD09PXQud2lkdGgmJk4uaGVpZ2h0PT09dC5oZWlnaHR8fChOLndpZHRoPXQud2lkdGgsTi5oZWlnaHQ9dC5oZWlnaHQscT1uZXcgVWludDE2QXJyYXkoTi5oZWlnaHQqTi53aWR0aCo0KSxWLmZpbGxTdHlsZT1cIiMwXCIsVi5maWxsUmVjdCgwLDAsTi53aWR0aCxOLmhlaWdodCkpfWZ1bmN0aW9uIG0odCl7Vi5kcmF3SW1hZ2UodCwwLDApLHo9Vi5nZXRJbWFnZURhdGEoMCwwLE4ud2lkdGgsTi5oZWlnaHQpO2Zvcih2YXIgZT0wO2U8cS5sZW5ndGg7ZSs9NClxW2VdKz16LmRhdGFbZV0scVtlKzFdKz16LmRhdGFbZSsxXSxxW2UrMl0rPXouZGF0YVtlKzJdO08rK31mdW5jdGlvbiBnKCl7Zm9yKHZhciB0PXouZGF0YSxlPTA7ZTxxLmxlbmd0aDtlKz00KXRbZV09MipxW2VdL1MubW90aW9uQmx1ckZyYW1lcyx0W2UrMV09MipxW2UrMV0vUy5tb3Rpb25CbHVyRnJhbWVzLHRbZSsyXT0yKnFbZSsyXS9TLm1vdGlvbkJsdXJGcmFtZXM7Vi5wdXRJbWFnZURhdGEoeiwwLDApLEQuYWRkKE4pLFIrKyxPPTAsYihcIkZ1bGwgTUIgRnJhbWUhIFwiK1IrXCIgXCIrTCk7Zm9yKHZhciBlPTA7ZTxxLmxlbmd0aDtlKz00KXFbZV09MCxxW2UrMV09MCxxW2UrMl09MDtnYygpfWZ1bmN0aW9uIHcodCl7TSYmKFMubW90aW9uQmx1ckZyYW1lcz4yPyhwKHQpLG0odCksTz49LjUqUy5tb3Rpb25CbHVyRnJhbWVzP2coKTpjKCkpOihELmFkZCh0KSxSKyssYihcIkZ1bGwgRnJhbWUhIFwiK1IpKSl9ZnVuY3Rpb24gdigpe3ZhciB0PTFlMy9TLmZyYW1lcmF0ZSxlPShSK08vUy5tb3Rpb25CbHVyRnJhbWVzKSp0O0w9QStlLEU9SStlLG50LmZvckVhY2goZnVuY3Rpb24odCl7dC5faG9va2VkVGltZT1lLzFlM30pLGwoKSxiKFwiRnJhbWU6IFwiK1IrXCIgXCIrTyk7Zm9yKHZhciBuPTA7bjxCLmxlbmd0aDtuKyspTD49QltuXS50cmlnZ2VyVGltZSYmKHIoQltuXS5jYWxsYmFjayksQi5zcGxpY2UobiwxKSk7Zm9yKHZhciBuPTA7bjxqLmxlbmd0aDtuKyspTD49altuXS50cmlnZ2VyVGltZSYmKHIoaltuXS5jYWxsYmFjayksaltuXS50cmlnZ2VyVGltZSs9altuXS50aW1lKTtVLmZvckVhY2goZnVuY3Rpb24odCl7cih0LEwtayl9KSxVPVtdfWZ1bmN0aW9uIHkodCl7dHx8KHQ9ZnVuY3Rpb24odCl7cmV0dXJuIGRvd25sb2FkKHQsRC5maWxlbmFtZStELmV4dGVuc2lvbixELm1pbWVUeXBlKSwhMX0pLEQuc2F2ZSh0KX1mdW5jdGlvbiBiKHQpe18mJmNvbnNvbGUubG9nKHQpfWZ1bmN0aW9uIHgodCxlKXtXW3RdPWV9ZnVuY3Rpb24gVCh0KXt2YXIgZT1XW3RdO2UmJmUuYXBwbHkobnVsbCxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfWZ1bmN0aW9uIEModCl7VChcInByb2dyZXNzXCIsdCl9dmFyIF8sRixMLEEsRSxJLGMsRCxTPXR8fHt9LEI9KG5ldyBEYXRlLFtdKSxqPVtdLFI9MCxPPTAsVT1bXSxNPSExLFc9e307Uy5mcmFtZXJhdGU9Uy5mcmFtZXJhdGV8fDYwLFMubW90aW9uQmx1ckZyYW1lcz0yKihTLm1vdGlvbkJsdXJGcmFtZXN8fDEpLF89Uy52ZXJib3NlfHwhMSxGPVMuZGlzcGxheXx8ITEsUy5zdGVwPTFlMy9TLmZyYW1lcmF0ZSxTLnRpbWVMaW1pdD1TLnRpbWVMaW1pdHx8MCxTLmZyYW1lTGltaXQ9Uy5mcmFtZUxpbWl0fHwwLFMuc3RhcnRUaW1lPVMuc3RhcnRUaW1lfHwwO3ZhciBQPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7UC5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsUC5zdHlsZS5sZWZ0PVAuc3R5bGUudG9wPTAsUC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9XCJibGFja1wiLFAuc3R5bGUuZm9udEZhbWlseT1cIm1vbm9zcGFjZVwiLFAuc3R5bGUuZm9udFNpemU9XCIxMXB4XCIsUC5zdHlsZS5wYWRkaW5nPVwiNXB4XCIsUC5zdHlsZS5jb2xvcj1cInJlZFwiLFAuc3R5bGUuekluZGV4PTFlNSxTLmRpc3BsYXkmJmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoUCk7dmFyIHEseixOPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksVj1OLmdldENvbnRleHQoXCIyZFwiKTtiKFwiU3RlcCBpcyBzZXQgdG8gXCIrUy5zdGVwK1wibXNcIik7dmFyIEg9e2dpZjp1LHdlYm06cyxmZm1wZWdzZXJ2ZXI6aCxwbmc6byxqcGc6YSxcIndlYm0tbWVkaWFyZWNvcmRlclwiOmR9LEc9SFtTLmZvcm1hdF07aWYoIUcpdGhyb3dcIkVycm9yOiBJbmNvcnJlY3Qgb3IgbWlzc2luZyBmb3JtYXQ6IFZhbGlkIGZvcm1hdHMgYXJlIFwiK09iamVjdC5rZXlzKEgpLmpvaW4oXCIsIFwiKTtpZihEPW5ldyBHKFMpLEQuc3RlcD1jLEQub24oXCJwcm9jZXNzXCIsdiksRC5vbihcInByb2dyZXNzXCIsQyksXCJwZXJmb3JtYW5jZVwiaW4gd2luZG93PT0wJiYod2luZG93LnBlcmZvcm1hbmNlPXt9KSxEYXRlLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX0sXCJub3dcImluIHdpbmRvdy5wZXJmb3JtYW5jZT09MCl7dmFyIEs9RGF0ZS5ub3coKTtwZXJmb3JtYW5jZS50aW1pbmcmJnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQmJihLPXBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpLHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c9ZnVuY3Rpb24oKXtyZXR1cm4gRGF0ZS5ub3coKS1LfX12YXIgWj13aW5kb3cuc2V0VGltZW91dCxKPXdpbmRvdy5zZXRJbnRlcnZhbCxZPXdpbmRvdy5jbGVhckludGVydmFsLCQ9d2luZG93LmNsZWFyVGltZW91dCxRPXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUsWD13aW5kb3cuRGF0ZS5ub3csdHQ9d2luZG93LnBlcmZvcm1hbmNlLm5vdyxldD13aW5kb3cuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZSxudD1bXTtyZXR1cm57c3RhcnQ6bixjYXB0dXJlOncsc3RvcDppLHNhdmU6eSxvbjp4fX12YXIgZj17ZnVuY3Rpb246ITAsb2JqZWN0OiEwfSxsPShwYXJzZUZsb2F0LHBhcnNlSW50LGZbdHlwZW9mIGV4cG9ydHNdJiZleHBvcnRzJiYhZXhwb3J0cy5ub2RlVHlwZT9leHBvcnRzOnZvaWQgMCkscD1mW3R5cGVvZiBtb2R1bGVdJiZtb2R1bGUmJiFtb2R1bGUubm9kZVR5cGU/bW9kdWxlOnZvaWQgMCxtPXAmJnAuZXhwb3J0cz09PWw/bDp2b2lkIDAsZz10KGwmJnAmJlwib2JqZWN0XCI9PXR5cGVvZiBnbG9iYWwmJmdsb2JhbCksdz10KGZbdHlwZW9mIHNlbGZdJiZzZWxmKSx2PXQoZlt0eXBlb2Ygd2luZG93XSYmd2luZG93KSx5PXQoZlt0eXBlb2YgdGhpc10mJnRoaXMpLGI9Z3x8diE9PSh5JiZ5LndpbmRvdykmJnZ8fHd8fHl8fEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKTtcImdjXCJpbiB3aW5kb3d8fCh3aW5kb3cuZ2M9ZnVuY3Rpb24oKXt9KSxIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUudG9CbG9ifHxPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLFwidG9CbG9iXCIse3ZhbHVlOmZ1bmN0aW9uKHQsZSxuKXtmb3IodmFyIGk9YXRvYih0aGlzLnRvRGF0YVVSTChlLG4pLnNwbGl0KFwiLFwiKVsxXSkscj1pLmxlbmd0aCxvPW5ldyBVaW50OEFycmF5KHIpLGE9MDthPHI7YSsrKW9bYV09aS5jaGFyQ29kZUF0KGEpO3QobmV3IEJsb2IoW29dLHt0eXBlOmV8fFwiaW1hZ2UvcG5nXCJ9KSl9fSksZnVuY3Rpb24oKXtpZihcInBlcmZvcm1hbmNlXCJpbiB3aW5kb3c9PTAmJih3aW5kb3cucGVyZm9ybWFuY2U9e30pLERhdGUubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfSxcIm5vd1wiaW4gd2luZG93LnBlcmZvcm1hbmNlPT0wKXt2YXIgdD1EYXRlLm5vdygpO3BlcmZvcm1hbmNlLnRpbWluZyYmcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCYmKHQ9cGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCksd2luZG93LnBlcmZvcm1hbmNlLm5vdz1mdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpLXR9fX0oKTt2YXIgaz13aW5kb3cuRGF0ZS5ub3coKTtpLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe30saS5wcm90b3R5cGUuc3RvcD1mdW5jdGlvbigpe30saS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5zYWZlVG9Qcm9jZWVkPWZ1bmN0aW9uKCl7cmV0dXJuITB9LGkucHJvdG90eXBlLnN0ZXA9ZnVuY3Rpb24oKXtjb25zb2xlLmxvZyhcIlN0ZXAgbm90IHNldCFcIil9LHIucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHIucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5kaXNwb3NlKCl9LHIucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt2YXIgbj1uZXcgRmlsZVJlYWRlcjtuLm9ubG9hZD1mdW5jdGlvbigpe3RoaXMudGFwZS5hcHBlbmQoZSh0aGlzLmNvdW50KSt0aGlzLmZpbGVFeHRlbnNpb24sbmV3IFVpbnQ4QXJyYXkobi5yZXN1bHQpKSx0aGlzLmNvdW50KyssdGhpcy5zdGVwKCl9LmJpbmQodGhpcyksbi5yZWFkQXNBcnJheUJ1ZmZlcih0KX0sci5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXt0KHRoaXMudGFwZS5zYXZlKCkpfSxyLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKCl7dGhpcy50YXBlPW5ldyBUYXIsdGhpcy5jb3VudD0wfSxvLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHIucHJvdG90eXBlKSxvLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dC50b0Jsb2IoZnVuY3Rpb24odCl7ci5wcm90b3R5cGUuYWRkLmNhbGwodGhpcyx0KX0uYmluZCh0aGlzKSx0aGlzLnR5cGUpfSxhLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKHIucHJvdG90eXBlKSxhLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dC50b0Jsb2IoZnVuY3Rpb24odCl7ci5wcm90b3R5cGUuYWRkLmNhbGwodGhpcyx0KX0uYmluZCh0aGlzKSx0aGlzLnR5cGUsdGhpcy5xdWFsaXR5KX0scy5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSkscy5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24odCl7dGhpcy5kaXNwb3NlKCl9LHMucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLmZyYW1lcy5wdXNoKHQudG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiLHRoaXMucXVhbGl0eSkpLHRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lPjAmJnRoaXMuZnJhbWVzLmxlbmd0aC90aGlzLnNldHRpbmdzLmZyYW1lcmF0ZT49dGhpcy5zZXR0aW5ncy5hdXRvU2F2ZVRpbWU/dGhpcy5zYXZlKGZ1bmN0aW9uKHQpe3RoaXMuZmlsZW5hbWU9dGhpcy5iYXNlRmlsZW5hbWUrXCItcGFydC1cIitlKHRoaXMucGFydCksZG93bmxvYWQodCx0aGlzLmZpbGVuYW1lK3RoaXMuZXh0ZW5zaW9uLHRoaXMubWltZVR5cGUpLHRoaXMuZGlzcG9zZSgpLHRoaXMucGFydCsrLHRoaXMuZmlsZW5hbWU9dGhpcy5iYXNlRmlsZW5hbWUrXCItcGFydC1cIitlKHRoaXMucGFydCksdGhpcy5zdGVwKCl9LmJpbmQodGhpcykpOnRoaXMuc3RlcCgpfSxzLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe2lmKHRoaXMuZnJhbWVzLmxlbmd0aCl7dmFyIGU9V2hhbW15LmZyb21JbWFnZUFycmF5KHRoaXMuZnJhbWVzLHRoaXMuc2V0dGluZ3MuZnJhbWVyYXRlKSxuPW5ldyBCbG9iKFtlXSx7dHlwZTpcIm9jdGV0L3N0cmVhbVwifSk7dChuKX19LHMucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24odCl7dGhpcy5mcmFtZXM9W119LGgucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLGgucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7dGhpcy5lbmNvZGVyLnN0YXJ0KHRoaXMuc2V0dGluZ3MpfSxoLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy5lbmNvZGVyLmFkZCh0KX0saC5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXt0aGlzLmNhbGxiYWNrPXQsdGhpcy5lbmNvZGVyLmVuZCgpfSxoLnByb3RvdHlwZS5zYWZlVG9Qcm9jZWVkPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5jb2Rlci5zYWZlVG9Qcm9jZWVkKCl9LGQucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLGQucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLnN0cmVhbXx8KHRoaXMuc3RyZWFtPXQuY2FwdHVyZVN0cmVhbSh0aGlzLmZyYW1lcmF0ZSksdGhpcy5tZWRpYVJlY29yZGVyPW5ldyBNZWRpYVJlY29yZGVyKHRoaXMuc3RyZWFtKSx0aGlzLm1lZGlhUmVjb3JkZXIuc3RhcnQoKSx0aGlzLm1lZGlhUmVjb3JkZXIub25kYXRhYXZhaWxhYmxlPWZ1bmN0aW9uKHQpe3RoaXMuY2h1bmtzLnB1c2godC5kYXRhKX0uYmluZCh0aGlzKSksdGhpcy5zdGVwKCl9LGQucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7dGhpcy5tZWRpYVJlY29yZGVyLm9uc3RvcD1mdW5jdGlvbihlKXt2YXIgbj1uZXcgQmxvYih0aGlzLmNodW5rcyx7dHlwZTpcInZpZGVvL3dlYm1cIn0pO3RoaXMuY2h1bmtzPVtdLHQobil9LmJpbmQodGhpcyksdGhpcy5tZWRpYVJlY29yZGVyLnN0b3AoKX0sdS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksdS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuc2l6ZVNldHx8KHRoaXMuZW5jb2Rlci5zZXRPcHRpb24oXCJ3aWR0aFwiLHQud2lkdGgpLHRoaXMuZW5jb2Rlci5zZXRPcHRpb24oXCJoZWlnaHRcIix0LmhlaWdodCksdGhpcy5zaXplU2V0PSEwKSx0aGlzLmNhbnZhcy53aWR0aD10LndpZHRoLHRoaXMuY2FudmFzLmhlaWdodD10LmhlaWdodCx0aGlzLmN0eC5kcmF3SW1hZ2UodCwwLDApLHRoaXMuZW5jb2Rlci5hZGRGcmFtZSh0aGlzLmN0eCx7Y29weTohMCxkZWxheTp0aGlzLnNldHRpbmdzLnN0ZXB9KSx0aGlzLnN0ZXAoKX0sdS5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXt0aGlzLmNhbGxiYWNrPXQsdGhpcy5lbmNvZGVyLnJlbmRlcigpfSwodnx8d3x8e30pLkNDYXB0dXJlPWMsXCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZcIm9iamVjdFwiPT10eXBlb2YgZGVmaW5lLmFtZCYmZGVmaW5lLmFtZD9kZWZpbmUoZnVuY3Rpb24oKXtyZXR1cm4gY30pOmwmJnA/KG0mJigocC5leHBvcnRzPWMpLkNDYXB0dXJlPWMpLGwuQ0NhcHR1cmU9Yyk6Yi5DQ2FwdHVyZT1jfSgpO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NjYXB0dXJlLmpzL2J1aWxkL0NDYXB0dXJlLmFsbC5taW4uanNcbi8vIG1vZHVsZSBpZCA9IDYwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB2aXpwbGV4IGZyb20gJy4uL3NyYy9pbmRleCdcclxuaW1wb3J0IGZpdCBmcm9tICdjYW52YXMtZml0J1xyXG5cclxuY29uc3QgZGVmRm5zID0gW1xyXG4gIFtcclxuICAgICcxJyxcclxuICAgICdzaW4oMS9uKHgvMjU2LHkvMjU2LHQpKScsXHJcbiAgICAnc2luKDEvbih4LzI1Nix5LzI1Nix0LTEwMCkpJyxcclxuICAgICcxJ1xyXG4gIF0sXHJcbiAgW1xyXG4gICAgJ3NpbihzaW4oeC95KnQpKm4oeC8yNTYseS8yNTYsdCo1KSknLFxyXG4gICAgJ2FicyhuKHgvNTEyLHkvNTEyLHQpKScsXHJcbiAgICAnMScsXHJcbiAgICAnMC41J1xyXG4gIF0sXHJcbiAgW1xyXG4gICAgJzEnLFxyXG4gICAgJ24oeC8yNTYseS8yNTYsbih4LzI1Nix5LzI1Nix0KjAuMSkqMjApJyxcclxuICAgICdnJyxcclxuICAgICcwLjInXHJcbiAgXSxcclxuICBbXHJcbiAgICAnMScsXHJcbiAgICAnMC41JyxcclxuICAgICdzaW4obih4LzEyOCt0LHkvMTI4LHQpKnQpJyxcclxuICAgICdhYnMoc2luKHgvMTI4LXQreS8xMjgpKSdcclxuICBdLFxyXG5dXHJcbmNvbnN0IGNvbmZpZyA9IHtcclxuICB0aW1lRmFjdG9yOiAwLjVcclxufVxyXG5jb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKVxyXG5kb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGNhbnZhcylcclxuXHJcbnZpenBsZXgoY2FudmFzLCBkZWZGbnNbMF0sIGNvbmZpZylcclxuZm9yIChsZXQgaSA9IDA7IGkgPCBkZWZGbnMubGVuZ3RoOyBpKyspIHtcclxuICAkKGAjbm9pc2Uke2l9YCkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICB2aXpwbGV4KGNhbnZhcywgZGVmRm5zW2ldLCBjb25maWcpXHJcbiAgfSlcclxufVxyXG4kKCcjZ2VuLWJ1dHRvbicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gIHZhciBmbnMgPSBbJCgnI3InKS52YWx1ZSwgJCgnI2cnKS52YWx1ZSwgJCgnI2InKS52YWx1ZSwgJCgnI2EnKS52YWx1ZV1cclxuICBjb25zb2xlLmxvZyhmbnMpXHJcbiAgdml6cGxleChjYW52YXMsIGZucywgY29uZmlnKVxyXG59KVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgZml0KGNhbnZhcyksIGZhbHNlKVxyXG5cclxuXHJcbmNvbnN0IHRvZ2dsZUVsZW0gPSAkKCcjbWVudS10b2dnbGUnKVxyXG5jb25zdCBtZW51RWxlbSA9ICQoJyNtZW51JylcclxubGV0IG1lbnVEaXNwbGF5ZWQgPSB0cnVlXHJcbnRvZ2dsZUVsZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgbWVudUVsZW0uc3R5bGUudHJhbnNmb3JtID0gbWVudURpc3BsYXllZCA/ICd0cmFuc2xhdGUoMHB4LCAtMzY3cHgpJyA6ICd0cmFuc2xhdGUoMHB4LCAwcHgpJ1xyXG4gIHRvZ2dsZUVsZW0uc3R5bGUudHJhbnNmb3JtID0gbWVudURpc3BsYXllZCA/ICdyb3RhdGUoMGRlZyknIDogJ3JvdGF0ZSgxODBkZWcpJ1xyXG4gIG1lbnVEaXNwbGF5ZWQgPSAhbWVudURpc3BsYXllZFxyXG59KVxyXG5cclxuZnVuY3Rpb24gJCAoc2VsZWN0b3IpIHtcclxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3RvcilcclxufVxyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2RvY3MvZGVtby5qc1xuLy8gbW9kdWxlIGlkID0gNjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIHNpemUgPSByZXF1aXJlKCdlbGVtZW50LXNpemUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZpdFxuXG52YXIgc2NyYXRjaCA9IG5ldyBGbG9hdDMyQXJyYXkoMilcblxuZnVuY3Rpb24gZml0KGNhbnZhcywgcGFyZW50LCBzY2FsZSkge1xuICB2YXIgaXNTVkcgPSBjYW52YXMubm9kZU5hbWUudG9VcHBlckNhc2UoKSA9PT0gJ1NWRydcblxuICBjYW52YXMuc3R5bGUucG9zaXRpb24gPSBjYW52YXMuc3R5bGUucG9zaXRpb24gfHwgJ2Fic29sdXRlJ1xuICBjYW52YXMuc3R5bGUudG9wID0gMFxuICBjYW52YXMuc3R5bGUubGVmdCA9IDBcblxuICByZXNpemUuc2NhbGUgID0gcGFyc2VGbG9hdChzY2FsZSB8fCAxKVxuICByZXNpemUucGFyZW50ID0gcGFyZW50XG5cbiAgcmV0dXJuIHJlc2l6ZSgpXG5cbiAgZnVuY3Rpb24gcmVzaXplKCkge1xuICAgIHZhciBwID0gcmVzaXplLnBhcmVudCB8fCBjYW52YXMucGFyZW50Tm9kZVxuICAgIGlmICh0eXBlb2YgcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdmFyIGRpbXMgICA9IHAoc2NyYXRjaCkgfHwgc2NyYXRjaFxuICAgICAgdmFyIHdpZHRoICA9IGRpbXNbMF1cbiAgICAgIHZhciBoZWlnaHQgPSBkaW1zWzFdXG4gICAgfSBlbHNlXG4gICAgaWYgKHAgJiYgcCAhPT0gZG9jdW1lbnQuYm9keSkge1xuICAgICAgdmFyIHBzaXplICA9IHNpemUocClcbiAgICAgIHZhciB3aWR0aCAgPSBwc2l6ZVswXXwwXG4gICAgICB2YXIgaGVpZ2h0ID0gcHNpemVbMV18MFxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgd2lkdGggID0gd2luZG93LmlubmVyV2lkdGhcbiAgICAgIHZhciBoZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHRcbiAgICB9XG5cbiAgICBpZiAoaXNTVkcpIHtcbiAgICAgIGNhbnZhcy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgd2lkdGggKiByZXNpemUuc2NhbGUgKyAncHgnKVxuICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgaGVpZ2h0ICogcmVzaXplLnNjYWxlICsgJ3B4JylcbiAgICB9IGVsc2Uge1xuICAgICAgY2FudmFzLndpZHRoID0gd2lkdGggKiByZXNpemUuc2NhbGVcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSBoZWlnaHQgKiByZXNpemUuc2NhbGVcbiAgICB9XG5cbiAgICBjYW52YXMuc3R5bGUud2lkdGggPSB3aWR0aCArICdweCdcbiAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4J1xuXG4gICAgcmV0dXJuIHJlc2l6ZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jYW52YXMtZml0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGdldFNpemVcblxuZnVuY3Rpb24gZ2V0U2l6ZShlbGVtZW50KSB7XG4gIC8vIEhhbmRsZSBjYXNlcyB3aGVyZSB0aGUgZWxlbWVudCBpcyBub3QgYWxyZWFkeVxuICAvLyBhdHRhY2hlZCB0byB0aGUgRE9NIGJ5IGJyaWVmbHkgYXBwZW5kaW5nIGl0XG4gIC8vIHRvIGRvY3VtZW50LmJvZHksIGFuZCByZW1vdmluZyBpdCBhZ2FpbiBsYXRlci5cbiAgaWYgKGVsZW1lbnQgPT09IHdpbmRvdyB8fCBlbGVtZW50ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgcmV0dXJuIFt3aW5kb3cuaW5uZXJXaWR0aCwgd2luZG93LmlubmVySGVpZ2h0XVxuICB9XG5cbiAgaWYgKCFlbGVtZW50LnBhcmVudE5vZGUpIHtcbiAgICB2YXIgdGVtcG9yYXJ5ID0gdHJ1ZVxuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWxlbWVudClcbiAgfVxuXG4gIHZhciBib3VuZHMgPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpXG4gIHZhciBzdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQpXG4gIHZhciBoZWlnaHQgPSAoYm91bmRzLmhlaWdodHwwKVxuICAgICsgcGFyc2Uoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi10b3AnKSlcbiAgICArIHBhcnNlKHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tYm90dG9tJykpXG4gIHZhciB3aWR0aCAgPSAoYm91bmRzLndpZHRofDApXG4gICAgKyBwYXJzZShzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLWxlZnQnKSlcbiAgICArIHBhcnNlKHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tcmlnaHQnKSlcblxuICBpZiAodGVtcG9yYXJ5KSB7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChlbGVtZW50KVxuICB9XG5cbiAgcmV0dXJuIFt3aWR0aCwgaGVpZ2h0XVxufVxuXG5mdW5jdGlvbiBwYXJzZShwcm9wKSB7XG4gIHJldHVybiBwYXJzZUZsb2F0KHByb3ApIHx8IDBcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2VsZW1lbnQtc2l6ZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==