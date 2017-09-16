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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
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
/* 2 */
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
/* 3 */
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
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["default"] = vizplex;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vert_glsl__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__vert_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__vert_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frag_glsl__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__frag_glsl___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__frag_glsl__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eqParser__ = __webpack_require__(2);
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
/* 8 */
/***/ (function(module, exports) {

module.exports = "#define GLSLIFY 1\nattribute vec3 position;\n\nvoid main() {\n  gl_Position = vec4(position, 1.0);\n}\n"

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = "precision mediump float;\n#define GLSLIFY 1\n\nuniform float t;\n\n//\n// Description : Array and textureless GLSL 2D/3D/4D simplex\n//               noise functions.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_1_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 mod289_1_0(vec4 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_1(vec4 x) {\n     return mod289_1_0(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_2(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nfloat snoise_1_3(vec3 v)\n  {\n  const vec2  C = vec2(1.0/6.0, 1.0/3.0) ;\n  const vec4  D_1_4 = vec4(0.0, 0.5, 1.0, 2.0);\n\n// First corner\n  vec3 i  = floor(v + dot(v, C.yyy) );\n  vec3 x0 =   v - i + dot(i, C.xxx) ;\n\n// Other corners\n  vec3 g_1_5 = step(x0.yzx, x0.xyz);\n  vec3 l = 1.0 - g_1_5;\n  vec3 i1 = min( g_1_5.xyz, l.zxy );\n  vec3 i2 = max( g_1_5.xyz, l.zxy );\n\n  //   x0 = x0 - 0.0 + 0.0 * C.xxx;\n  //   x1 = x0 - i1  + 1.0 * C.xxx;\n  //   x2 = x0 - i2  + 2.0 * C.xxx;\n  //   x3 = x0 - 1.0 + 3.0 * C.xxx;\n  vec3 x1 = x0 - i1 + C.xxx;\n  vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n  vec3 x3 = x0 - D_1_4.yyy;      // -1.0+3.0*C.x = -0.5 = -D.y\n\n// Permutations\n  i = mod289_1_0(i);\n  vec4 p = permute_1_1( permute_1_1( permute_1_1(\n             i.z + vec4(0.0, i1.z, i2.z, 1.0 ))\n           + i.y + vec4(0.0, i1.y, i2.y, 1.0 ))\n           + i.x + vec4(0.0, i1.x, i2.x, 1.0 ));\n\n// Gradients: 7x7 points over a square, mapped onto an octahedron.\n// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)\n  float n_ = 0.142857142857; // 1.0/7.0\n  vec3  ns = n_ * D_1_4.wyz - D_1_4.xzx;\n\n  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);  //  mod(p,7*7)\n\n  vec4 x_ = floor(j * ns.z);\n  vec4 y_ = floor(j - 7.0 * x_ );    // mod(j,N)\n\n  vec4 x = x_ *ns.x + ns.yyyy;\n  vec4 y = y_ *ns.x + ns.yyyy;\n  vec4 h = 1.0 - abs(x) - abs(y);\n\n  vec4 b0 = vec4( x.xy, y.xy );\n  vec4 b1 = vec4( x.zw, y.zw );\n\n  //vec4 s0 = vec4(lessThan(b0,0.0))*2.0 - 1.0;\n  //vec4 s1 = vec4(lessThan(b1,0.0))*2.0 - 1.0;\n  vec4 s0 = floor(b0)*2.0 + 1.0;\n  vec4 s1 = floor(b1)*2.0 + 1.0;\n  vec4 sh = -step(h, vec4(0.0));\n\n  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy ;\n  vec4 a1_1_6 = b1.xzyw + s1.xzyw*sh.zzww ;\n\n  vec3 p0_1_7 = vec3(a0.xy,h.x);\n  vec3 p1 = vec3(a0.zw,h.y);\n  vec3 p2 = vec3(a1_1_6.xy,h.z);\n  vec3 p3 = vec3(a1_1_6.zw,h.w);\n\n//Normalise gradients\n  vec4 norm = taylorInvSqrt_1_2(vec4(dot(p0_1_7,p0_1_7), dot(p1,p1), dot(p2, p2), dot(p3,p3)));\n  p0_1_7 *= norm.x;\n  p1 *= norm.y;\n  p2 *= norm.z;\n  p3 *= norm.w;\n\n// Mix final noise value\n  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);\n  m = m * m;\n  return 42.0 * dot( m*m, vec4( dot(p0_1_7,x0), dot(p1,x1),\n                                dot(p2,x2), dot(p3,x3) ) );\n  }\n\n\n\n\nvoid main() {\n  float r = %R_FN%;\n  float g = %G_FN%;\n  float b = %B_FN%;\n  float a = %A_FN%;\n  gl_FragColor = vec4(r, g, b, a);\n}\n"

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
var makeReflect            = __webpack_require__(3)
var shaderCache            = __webpack_require__(17)
var runtime                = __webpack_require__(35)
var GLError                = __webpack_require__(1)

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


var coallesceUniforms = __webpack_require__(3)
var GLError = __webpack_require__(1)

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

var GLError = __webpack_require__(1)

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

var GLError = __webpack_require__(1)
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

var literals100 = __webpack_require__(4)
  , operators = __webpack_require__(25)
  , builtins100 = __webpack_require__(5)
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

var v100 = __webpack_require__(4)

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
var v100 = __webpack_require__(5)

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0), __webpack_require__(43).Buffer))

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

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

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


var bindAttribs = __webpack_require__(6)

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


var bindAttribs = __webpack_require__(6)

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(61)(module), __webpack_require__(0)))

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
/* 62 */,
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__src_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_canvas_fit__ = __webpack_require__(64);
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
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

var size = __webpack_require__(65)

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
/* 65 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWViNjM3Y2Y4MzNmNDExYjIxMzMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9HTEVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9lcVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9yZWZsZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi9kby1iaW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVydC5nbHNsIiwid2VicGFjazovLy8uL3NyYy9mcmFnLmdsc2wiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jbGVhci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29udGV4dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFmLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS11bmlmb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9jcmVhdGUtYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9zaGFkZXItY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWZvcm1hdC1jb21waWxlci1lcnJvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ByaW50Zi1qcy9zcmMvc3ByaW50Zi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzLzEuMC9udW1iZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXNoYWRlci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvb3BlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMtMzAwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy0zMDBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXRvYi1saXRlL2F0b2ItYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRkLWxpbmUtbnVtYmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2NyZWF0ZS1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2hpZGRlbi1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9ydW50aW1lLXJlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1yZXNldC9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlnaHQtbm93L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWFrLW1hcC93ZWFrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtYnVmZmVyL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHlwZWRhcnJheS1wb29sL3Bvb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdC10d2lkZGxlL3R3aWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2R1cC9kdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25kYXJyYXktb3BzL25kYXJyYXktb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL3RodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pcS91bmlxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZGFycmF5L25kYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lvdGEtYXJyYXkvaW90YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vdmFvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL3Zhby1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jY2FwdHVyZS5qcy9idWlsZC9DQ2FwdHVyZS5hbGwubWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vZG9jcy9kZW1vLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jYW52YXMtZml0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9lbGVtZW50LXNpemUvaW5kZXguanMiXSwibmFtZXMiOlsiY29uc3QiLCJsZXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNySkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsWUFBWTtBQUNyQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRDhCO0FBQ0c7QUFDQTs7QUFFSDtBQUNJO0FBQ0Y7QUFDRjtBQUNIO0FBQ007QUFDQzs7QUFFbENBLEdBQUssQ0FBQyxLQUFLLEdBQUcsZ0RBQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUNBLEdBQUssQ0FBQyxVQUFVLEdBQUc7RUFDakIsUUFBUSxFQUFFLENBQUM7RUFDWCxRQUFRLEVBQUUsQ0FBQztFQUNYLFFBQVEsRUFBRSxDQUFDO0VBQ1gsUUFBUSxFQUFFLENBQUM7Q0FDWjtBQUNEQyxHQUFHLENB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LGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUxBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQkFBc0IsYUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxLQUFLOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0UUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLElBQUk7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsRUFBRTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSwrQkFBK0IscUJBQXFCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUFBO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ3pORDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pTQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDWkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sTUFBTTtBQUNOLE1BQU07QUFDTjs7Ozs7OztBQzlDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFCQUFxQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsNEJBQTRCLGNBQWM7QUFDMUMsNEJBQTRCLGNBQWM7QUFDMUMsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxrQkFBa0IsR0FBRztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksS0FBSztBQUNqQjtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVksS0FBSztB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K0U7QUFDL0U7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSyxzQkFBc0I7O0FBRTNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixNQUFNO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3RWQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQW1CO0FBQ2xDLGFBQWEsRUFBRTtBQUNmO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7Ozs7Ozs7QUM1REE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMvQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNjMpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGVlYjYzN2NmODMzZjQxMWIyMTMzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSAwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIDIiLCJmdW5jdGlvbiBHTEVycm9yIChyYXdFcnJvciwgc2hvcnRNZXNzYWdlLCBsb25nTWVzc2FnZSkge1xuICAgIHRoaXMuc2hvcnRNZXNzYWdlID0gc2hvcnRNZXNzYWdlIHx8ICcnXG4gICAgdGhpcy5sb25nTWVzc2FnZSA9IGxvbmdNZXNzYWdlIHx8ICcnXG4gICAgdGhpcy5yYXdFcnJvciA9IHJhd0Vycm9yIHx8ICcnXG4gICAgdGhpcy5tZXNzYWdlID1cbiAgICAgICdnbC1zaGFkZXI6ICcgKyAoc2hvcnRNZXNzYWdlIHx8IHJhd0Vycm9yIHx8ICcnKSArXG4gICAgICAobG9uZ01lc3NhZ2UgPyAnXFxuJytsb25nTWVzc2FnZSA6ICcnKVxuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrXG59XG5HTEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvclxuR0xFcnJvci5wcm90b3R5cGUubmFtZSA9ICdHTEVycm9yJ1xuR0xFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBHTEVycm9yXG5tb2R1bGUuZXhwb3J0cyA9IEdMRXJyb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvR0xFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGVxUGFyc2VyIChlcSkge1xyXG4gIHZhciBub2lzZVJlZ2V4ID0gLyhbXmldfF4pbi9nXHJcbiAgdmFyIGFyZ3NSZWdleCA9IC8oeHx5KS9nXHJcbiAgdmFyIGZsb2F0UmVnZXggPSAvKFteY118XikoWy1dP1xcZCsoXFwuXFxkKyk/KS9nXHJcbiAgdmFyIG1hdGNoZXMgPSBbXVxyXG4gIHZhciBtYXRjaFxyXG5cclxuICB3aGlsZSAoKG1hdGNoID0gbm9pc2VSZWdleC5leGVjKGVxKSkgIT09IG51bGwpIHtcclxuICAgIG1hdGNoZXMucHVzaChtYXRjaC5pbmRleClcclxuICB9XHJcbiAgbWF0Y2hlcy5mb3JFYWNoKChlbGVtKSA9PiB7XHJcbiAgICB2YXIgcCA9IC0xXHJcbiAgICAvLyBpbmRleCBpcyBwb3NpdGlvbiBwcmlvciB0byBuLCBzbyB3ZSBuZWVkIHRvIHNraXAgMyB0byBnZXQgdG8gY29udGVudFxyXG4gICAgZm9yICh2YXIgaSA9IGVsZW0gKyAzOyBpIDwgZXEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGVxW2ldID09PSAnKScpIHtcclxuICAgICAgICBwKytcclxuICAgICAgICBpZiAocCA9PT0gMCkge1xyXG4gICAgICAgICAgZXEgPSBlcS5zbGljZSgwLCBpKSArICcpJyArIGVxLnNsaWNlKGkpXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGVsc2UgaWYgKGVxW2ldID09PSAnKCcpIHtcclxuICAgICAgICBwLS1cclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0pXHJcbiAgcmV0dXJuIGVxLnJlcGxhY2Uobm9pc2VSZWdleCwgJyQxJU5PSVNFJSh2ZWMzJylcclxuICAgICAgICAgICAucmVwbGFjZShhcmdzUmVnZXgsICdnbF9GcmFnQ29vcmQuJDEnKVxyXG4gICAgICAgICAgIC5yZXBsYWNlKGZsb2F0UmVnZXgsIGZ1bmN0aW9uIChtYXRjaCwgcHJlLCBudW0pIHtcclxuICAgICAgICAgICAgIG51bSA9IE51bWJlcihudW0pXHJcbiAgICAgICAgICAgICByZXR1cm4gKG51bSAlIDEgPT09IDApID8gYCR7cHJlfSR7bnVtfS4wYCA6IGAke3ByZX0ke251bX1gXHJcbiAgICAgICAgICAgfSlcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvZXFQYXJzZXIuanMiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBtYWtlUmVmbGVjdFR5cGVzXG5cbi8vQ29uc3RydWN0IHR5cGUgaW5mbyBmb3IgcmVmbGVjdGlvbi5cbi8vXG4vLyBUaGlzIGl0ZXJhdGVzIG92ZXIgdGhlIGZsYXR0ZW5lZCBsaXN0IG9mIHVuaWZvcm0gdHlwZSB2YWx1ZXMgYW5kIHNtYXNoZXMgdGhlbSBpbnRvIGEgSlNPTiBvYmplY3QuXG4vL1xuLy8gVGhlIGxlYXZlcyBvZiB0aGUgcmVzdWx0aW5nIG9iamVjdCBhcmUgZWl0aGVyIGluZGljZXMgb3IgdHlwZSBzdHJpbmdzIHJlcHJlc2VudGluZyBwcmltaXRpdmUgZ2xzbGlmeSB0eXBlc1xuZnVuY3Rpb24gbWFrZVJlZmxlY3RUeXBlcyh1bmlmb3JtcywgdXNlSW5kZXgpIHtcbiAgdmFyIG9iaiA9IHt9XG4gIGZvcih2YXIgaT0wOyBpPHVuaWZvcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIG4gPSB1bmlmb3Jtc1tpXS5uYW1lXG4gICAgdmFyIHBhcnRzID0gbi5zcGxpdChcIi5cIilcbiAgICB2YXIgbyA9IG9ialxuICAgIGZvcih2YXIgaj0wOyBqPHBhcnRzLmxlbmd0aDsgKytqKSB7XG4gICAgICB2YXIgeCA9IHBhcnRzW2pdLnNwbGl0KFwiW1wiKVxuICAgICAgaWYoeC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGlmKCEoeFswXSBpbiBvKSkge1xuICAgICAgICAgIG9beFswXV0gPSBbXVxuICAgICAgICB9XG4gICAgICAgIG8gPSBvW3hbMF1dXG4gICAgICAgIGZvcih2YXIgaz0xOyBrPHgubGVuZ3RoOyArK2spIHtcbiAgICAgICAgICB2YXIgeSA9IHBhcnNlSW50KHhba10pXG4gICAgICAgICAgaWYoazx4Lmxlbmd0aC0xIHx8IGo8cGFydHMubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgIGlmKCEoeSBpbiBvKSkge1xuICAgICAgICAgICAgICBpZihrIDwgeC5sZW5ndGgtMSkge1xuICAgICAgICAgICAgICAgIG9beV0gPSBbXVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9beV0gPSB7fVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvID0gb1t5XVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZih1c2VJbmRleCkge1xuICAgICAgICAgICAgICBvW3ldID0gaVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgb1t5XSA9IHVuaWZvcm1zW2ldLnR5cGVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZihqIDwgcGFydHMubGVuZ3RoLTEpIHtcbiAgICAgICAgaWYoISh4WzBdIGluIG8pKSB7XG4gICAgICAgICAgb1t4WzBdXSA9IHt9XG4gICAgICAgIH1cbiAgICAgICAgbyA9IG9beFswXV1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHVzZUluZGV4KSB7XG4gICAgICAgICAgb1t4WzBdXSA9IGlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBvW3hbMF1dID0gdW5pZm9ybXNbaV0udHlwZVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBvYmpcbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3JlZmxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gY3VycmVudFxuICAgICdwcmVjaXNpb24nXG4gICwgJ2hpZ2hwJ1xuICAsICdtZWRpdW1wJ1xuICAsICdsb3dwJ1xuICAsICdhdHRyaWJ1dGUnXG4gICwgJ2NvbnN0J1xuICAsICd1bmlmb3JtJ1xuICAsICd2YXJ5aW5nJ1xuICAsICdicmVhaydcbiAgLCAnY29udGludWUnXG4gICwgJ2RvJ1xuICAsICdmb3InXG4gICwgJ3doaWxlJ1xuICAsICdpZidcbiAgLCAnZWxzZSdcbiAgLCAnaW4nXG4gICwgJ291dCdcbiAgLCAnaW5vdXQnXG4gICwgJ2Zsb2F0J1xuICAsICdpbnQnXG4gICwgJ3ZvaWQnXG4gICwgJ2Jvb2wnXG4gICwgJ3RydWUnXG4gICwgJ2ZhbHNlJ1xuICAsICdkaXNjYXJkJ1xuICAsICdyZXR1cm4nXG4gICwgJ21hdDInXG4gICwgJ21hdDMnXG4gICwgJ21hdDQnXG4gICwgJ3ZlYzInXG4gICwgJ3ZlYzMnXG4gICwgJ3ZlYzQnXG4gICwgJ2l2ZWMyJ1xuICAsICdpdmVjMydcbiAgLCAnaXZlYzQnXG4gICwgJ2J2ZWMyJ1xuICAsICdidmVjMydcbiAgLCAnYnZlYzQnXG4gICwgJ3NhbXBsZXIxRCdcbiAgLCAnc2FtcGxlcjJEJ1xuICAsICdzYW1wbGVyM0QnXG4gICwgJ3NhbXBsZXJDdWJlJ1xuICAsICdzYW1wbGVyMURTaGFkb3cnXG4gICwgJ3NhbXBsZXIyRFNoYWRvdydcbiAgLCAnc3RydWN0J1xuXG4gIC8vIGZ1dHVyZVxuICAsICdhc20nXG4gICwgJ2NsYXNzJ1xuICAsICd1bmlvbidcbiAgLCAnZW51bSdcbiAgLCAndHlwZWRlZidcbiAgLCAndGVtcGxhdGUnXG4gICwgJ3RoaXMnXG4gICwgJ3BhY2tlZCdcbiAgLCAnZ290bydcbiAgLCAnc3dpdGNoJ1xuICAsICdkZWZhdWx0J1xuICAsICdpbmxpbmUnXG4gICwgJ25vaW5saW5lJ1xuICAsICd2b2xhdGlsZSdcbiAgLCAncHVibGljJ1xuICAsICdzdGF0aWMnXG4gICwgJ2V4dGVybidcbiAgLCAnZXh0ZXJuYWwnXG4gICwgJ2ludGVyZmFjZSdcbiAgLCAnbG9uZydcbiAgLCAnc2hvcnQnXG4gICwgJ2RvdWJsZSdcbiAgLCAnaGFsZidcbiAgLCAnZml4ZWQnXG4gICwgJ3Vuc2lnbmVkJ1xuICAsICdpbnB1dCdcbiAgLCAnb3V0cHV0J1xuICAsICdodmVjMidcbiAgLCAnaHZlYzMnXG4gICwgJ2h2ZWM0J1xuICAsICdkdmVjMidcbiAgLCAnZHZlYzMnXG4gICwgJ2R2ZWM0J1xuICAsICdmdmVjMidcbiAgLCAnZnZlYzMnXG4gICwgJ2Z2ZWM0J1xuICAsICdzYW1wbGVyMkRSZWN0J1xuICAsICdzYW1wbGVyM0RSZWN0J1xuICAsICdzYW1wbGVyMkRSZWN0U2hhZG93J1xuICAsICdzaXplb2YnXG4gICwgJ2Nhc3QnXG4gICwgJ25hbWVzcGFjZSdcbiAgLCAndXNpbmcnXG5dXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMuanNcbi8vIG1vZHVsZSBpZCA9IDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gS2VlcCB0aGlzIGxpc3Qgc29ydGVkXG4gICdhYnMnXG4gICwgJ2Fjb3MnXG4gICwgJ2FsbCdcbiAgLCAnYW55J1xuICAsICdhc2luJ1xuICAsICdhdGFuJ1xuICAsICdjZWlsJ1xuICAsICdjbGFtcCdcbiAgLCAnY29zJ1xuICAsICdjcm9zcydcbiAgLCAnZEZkeCdcbiAgLCAnZEZkeSdcbiAgLCAnZGVncmVlcydcbiAgLCAnZGlzdGFuY2UnXG4gICwgJ2RvdCdcbiAgLCAnZXF1YWwnXG4gICwgJ2V4cCdcbiAgLCAnZXhwMidcbiAgLCAnZmFjZWZvcndhcmQnXG4gICwgJ2Zsb29yJ1xuICAsICdmcmFjdCdcbiAgLCAnZ2xfQmFja0NvbG9yJ1xuICAsICdnbF9CYWNrTGlnaHRNb2RlbFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tMaWdodFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tNYXRlcmlhbCdcbiAgLCAnZ2xfQmFja1NlY29uZGFyeUNvbG9yJ1xuICAsICdnbF9DbGlwUGxhbmUnXG4gICwgJ2dsX0NsaXBWZXJ0ZXgnXG4gICwgJ2dsX0NvbG9yJ1xuICAsICdnbF9EZXB0aFJhbmdlJ1xuICAsICdnbF9EZXB0aFJhbmdlUGFyYW1ldGVycydcbiAgLCAnZ2xfRXllUGxhbmVRJ1xuICAsICdnbF9FeWVQbGFuZVInXG4gICwgJ2dsX0V5ZVBsYW5lUydcbiAgLCAnZ2xfRXllUGxhbmVUJ1xuICAsICdnbF9Gb2cnXG4gICwgJ2dsX0ZvZ0Nvb3JkJ1xuICAsICdnbF9Gb2dGcmFnQ29vcmQnXG4gICwgJ2dsX0ZvZ1BhcmFtZXRlcnMnXG4gICwgJ2dsX0ZyYWdDb2xvcidcbiAgLCAnZ2xfRnJhZ0Nvb3JkJ1xuICAsICdnbF9GcmFnRGF0YSdcbiAgLCAnZ2xfRnJhZ0RlcHRoJ1xuICAsICdnbF9GcmFnRGVwdGhFWFQnXG4gICwgJ2dsX0Zyb250Q29sb3InXG4gICwgJ2dsX0Zyb250RmFjaW5nJ1xuICAsICdnbF9Gcm9udExpZ2h0TW9kZWxQcm9kdWN0J1xuICAsICdnbF9Gcm9udExpZ2h0UHJvZHVjdCdcbiAgLCAnZ2xfRnJvbnRNYXRlcmlhbCdcbiAgLCAnZ2xfRnJvbnRTZWNvbmRhcnlDb2xvcidcbiAgLCAnZ2xfTGlnaHRNb2RlbCdcbiAgLCAnZ2xfTGlnaHRNb2RlbFBhcmFtZXRlcnMnXG4gICwgJ2dsX0xpZ2h0TW9kZWxQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRTb3VyY2UnXG4gICwgJ2dsX0xpZ2h0U291cmNlUGFyYW1ldGVycydcbiAgLCAnZ2xfTWF0ZXJpYWxQYXJhbWV0ZXJzJ1xuICAsICdnbF9NYXhDbGlwUGxhbmVzJ1xuICAsICdnbF9NYXhDb21iaW5lZFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhEcmF3QnVmZmVycydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRVbmlmb3JtQ29tcG9uZW50cydcbiAgLCAnZ2xfTWF4TGlnaHRzJ1xuICAsICdnbF9NYXhUZXh0dXJlQ29vcmRzJ1xuICAsICdnbF9NYXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VGV4dHVyZVVuaXRzJ1xuICAsICdnbF9NYXhWYXJ5aW5nRmxvYXRzJ1xuICAsICdnbF9NYXhWZXJ0ZXhBdHRyaWJzJ1xuICAsICdnbF9NYXhWZXJ0ZXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VmVydGV4VW5pZm9ybUNvbXBvbmVudHMnXG4gICwgJ2dsX01vZGVsVmlld01hdHJpeCdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4VHJhbnNwb3NlJ1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4J1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3UHJvamVjdGlvbk1hdHJpeEludmVyc2VUcmFuc3Bvc2UnXG4gICwgJ2dsX01vZGVsVmlld1Byb2plY3Rpb25NYXRyaXhUcmFuc3Bvc2UnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQwJ1xuICAsICdnbF9NdWx0aVRleENvb3JkMSdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDInXG4gICwgJ2dsX011bHRpVGV4Q29vcmQzJ1xuICAsICdnbF9NdWx0aVRleENvb3JkNCdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDUnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQ2J1xuICAsICdnbF9NdWx0aVRleENvb3JkNydcbiAgLCAnZ2xfTm9ybWFsJ1xuICAsICdnbF9Ob3JtYWxNYXRyaXgnXG4gICwgJ2dsX05vcm1hbFNjYWxlJ1xuICAsICdnbF9PYmplY3RQbGFuZVEnXG4gICwgJ2dsX09iamVjdFBsYW5lUidcbiAgLCAnZ2xfT2JqZWN0UGxhbmVTJ1xuICAsICdnbF9PYmplY3RQbGFuZVQnXG4gICwgJ2dsX1BvaW50J1xuICAsICdnbF9Qb2ludENvb3JkJ1xuICAsICdnbF9Qb2ludFBhcmFtZXRlcnMnXG4gICwgJ2dsX1BvaW50U2l6ZSdcbiAgLCAnZ2xfUG9zaXRpb24nXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXgnXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9Qcm9qZWN0aW9uTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfUHJvamVjdGlvbk1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfU2Vjb25kYXJ5Q29sb3InXG4gICwgJ2dsX1RleENvb3JkJ1xuICAsICdnbF9UZXh0dXJlRW52Q29sb3InXG4gICwgJ2dsX1RleHR1cmVNYXRyaXgnXG4gICwgJ2dsX1RleHR1cmVNYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9UZXh0dXJlTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfVGV4dHVyZU1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfVmVydGV4J1xuICAsICdncmVhdGVyVGhhbidcbiAgLCAnZ3JlYXRlclRoYW5FcXVhbCdcbiAgLCAnaW52ZXJzZXNxcnQnXG4gICwgJ2xlbmd0aCdcbiAgLCAnbGVzc1RoYW4nXG4gICwgJ2xlc3NUaGFuRXF1YWwnXG4gICwgJ2xvZydcbiAgLCAnbG9nMidcbiAgLCAnbWF0cml4Q29tcE11bHQnXG4gICwgJ21heCdcbiAgLCAnbWluJ1xuICAsICdtaXgnXG4gICwgJ21vZCdcbiAgLCAnbm9ybWFsaXplJ1xuICAsICdub3QnXG4gICwgJ25vdEVxdWFsJ1xuICAsICdwb3cnXG4gICwgJ3JhZGlhbnMnXG4gICwgJ3JlZmxlY3QnXG4gICwgJ3JlZnJhY3QnXG4gICwgJ3NpZ24nXG4gICwgJ3NpbidcbiAgLCAnc21vb3Roc3RlcCdcbiAgLCAnc3FydCdcbiAgLCAnc3RlcCdcbiAgLCAndGFuJ1xuICAsICd0ZXh0dXJlMkQnXG4gICwgJ3RleHR1cmUyRExvZCdcbiAgLCAndGV4dHVyZTJEUHJvaidcbiAgLCAndGV4dHVyZTJEUHJvakxvZCdcbiAgLCAndGV4dHVyZUN1YmUnXG4gICwgJ3RleHR1cmVDdWJlTG9kJ1xuICAsICd0ZXh0dXJlMkRMb2RFWFQnXG4gICwgJ3RleHR1cmUyRFByb2pMb2RFWFQnXG4gICwgJ3RleHR1cmVDdWJlTG9kRVhUJ1xuICAsICd0ZXh0dXJlMkRHcmFkRVhUJ1xuICAsICd0ZXh0dXJlMkRQcm9qR3JhZEVYVCdcbiAgLCAndGV4dHVyZUN1YmVHcmFkRVhUJ1xuXVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLmpzXG4vLyBtb2R1bGUgaWQgPSA1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gZG9CaW5kKGdsLCBlbGVtZW50cywgYXR0cmlidXRlcykge1xuICBpZihlbGVtZW50cykge1xuICAgIGVsZW1lbnRzLmJpbmQoKVxuICB9IGVsc2Uge1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpXG4gIH1cbiAgdmFyIG5hdHRyaWJzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfQVRUUklCUyl8MFxuICBpZihhdHRyaWJ1dGVzKSB7XG4gICAgaWYoYXR0cmlidXRlcy5sZW5ndGggPiBuYXR0cmlicykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtdmFvOiBUb28gbWFueSB2ZXJ0ZXggYXR0cmlidXRlc1wiKVxuICAgIH1cbiAgICBmb3IodmFyIGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgYXR0cmliID0gYXR0cmlidXRlc1tpXVxuICAgICAgaWYoYXR0cmliLmJ1ZmZlcikge1xuICAgICAgICB2YXIgYnVmZmVyID0gYXR0cmliLmJ1ZmZlclxuICAgICAgICB2YXIgc2l6ZSA9IGF0dHJpYi5zaXplIHx8IDRcbiAgICAgICAgdmFyIHR5cGUgPSBhdHRyaWIudHlwZSB8fCBnbC5GTE9BVFxuICAgICAgICB2YXIgbm9ybWFsaXplZCA9ICEhYXR0cmliLm5vcm1hbGl6ZWRcbiAgICAgICAgdmFyIHN0cmlkZSA9IGF0dHJpYi5zdHJpZGUgfHwgMFxuICAgICAgICB2YXIgb2Zmc2V0ID0gYXR0cmliLm9mZnNldCB8fCAwXG4gICAgICAgIGJ1ZmZlci5iaW5kKClcbiAgICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihpLCBzaXplLCB0eXBlLCBub3JtYWxpemVkLCBzdHJpZGUsIG9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKHR5cGVvZiBhdHRyaWIgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpLCBhdHRyaWIpXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliMWYoaSwgYXR0cmliWzBdKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gMikge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjJmKGksIGF0dHJpYlswXSwgYXR0cmliWzFdKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gMykge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjNmKGksIGF0dHJpYlswXSwgYXR0cmliWzFdLCBhdHRyaWJbMl0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliNGYoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0sIGF0dHJpYlsyXSwgYXR0cmliWzNdKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImdsLXZhbzogSW52YWxpZCB2ZXJ0ZXggYXR0cmlidXRlXCIpXG4gICAgICAgIH1cbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgICB9XG4gICAgfVxuICAgIGZvcig7IGk8bmF0dHJpYnM7ICsraSkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxuICAgIGZvcih2YXIgaT0wOyBpPG5hdHRyaWJzOyArK2kpIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvQmluZFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvZG8tYmluZC5qc1xuLy8gbW9kdWxlIGlkID0gNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImltcG9ydCB2ZXJ0IGZyb20gJy4vdmVydC5nbHNsJ1xyXG5pbXBvcnQgcmF3RnJhZyBmcm9tICcuL2ZyYWcuZ2xzbCdcclxuaW1wb3J0IGVxUGFyc2VyIGZyb20gJy4vZXFQYXJzZXInXHJcblxyXG5pbXBvcnQgZ2xDbGVhciBmcm9tICdnbC1jbGVhcidcclxuaW1wb3J0IGdsQ29udGV4dCBmcm9tICdnbC1jb250ZXh0J1xyXG5pbXBvcnQgZ2xTaGFkZXIgZnJvbSAnZ2wtc2hhZGVyJ1xyXG5pbXBvcnQgZ2xSZXNldCBmcm9tICdnbC1yZXNldCdcclxuaW1wb3J0IG5vdyBmcm9tICdyaWdodC1ub3cnXHJcbmltcG9ydCBkcmF3IGZyb20gJ2EtYmlnLXRyaWFuZ2xlJ1xyXG5pbXBvcnQgQ0NhcHR1cmUgZnJvbSAnY2NhcHR1cmUuanMnXHJcblxyXG5jb25zdCBjbGVhciA9IGdsQ2xlYXIoeyBjb2xvcjogWzAsIDEsIDAsIDFdIH0pXHJcbmNvbnN0IGZyYWdMb29rdXAgPSB7XHJcbiAgXCIlUl9GTiVcIjogMCxcclxuICBcIiVHX0ZOJVwiOiAxLFxyXG4gIFwiJUJfRk4lXCI6IDIsXHJcbiAgXCIlQV9GTiVcIjogM1xyXG59XHJcbmxldCBnbFxyXG5sZXQgc2hhZGVyXHJcbmxldCB0RmFjdG9yXHJcbmxldCBjYW52YXNcclxubGV0IGNhcHR1cmVyXHJcbmxldCByZXNldFxyXG5sZXQgdGltZSA9IG5vdygpIC8gMTAwMFxyXG5cclxuZnVuY3Rpb24gYW5pbWF0ZSAoKSB7XHJcbiAgdGltZSA9IG5vdygpIC8gMTAwMFxyXG59XHJcbmZ1bmN0aW9uIHJlbmRlciAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSBnbC5kcmF3aW5nQnVmZmVyV2lkdGhcclxuICBjb25zdCBoZWlnaHQgPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0XHJcblxyXG4gIGFuaW1hdGUoKVxyXG4gIGNsZWFyKGdsKVxyXG4gIGdsLnZpZXdwb3J0KDAsIDAsIHdpZHRoLCBoZWlnaHQpXHJcblxyXG4gIHNoYWRlci5iaW5kKClcclxuICBzaGFkZXIudW5pZm9ybXMudCA9IHRGYWN0b3IgKiB0aW1lXHJcbiAgc2hhZGVyLmF0dHJpYnV0ZXMucG9zaXRpb24ucG9pbnRlcigpXHJcbiAgZHJhdyhnbClcclxuICBcclxuICBpZiAoY2FwdHVyZXIpIHtcclxuICAgIGNhcHR1cmVyLmNhcHR1cmUoY2FudmFzKVxyXG4gIH1cclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdml6cGxleCAodGFyZ2V0LCByZ2JhLCBvcHRpb25zKSB7XHJcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge31cclxuICBjYXB0dXJlciA9IG9wdGlvbnMuY2NhcENvbmZpZyA/IG5ldyBDQ2FwdHVyZShvcHRpb25zLmNjYXBDb25maWcpIDogbnVsbFxyXG4gIHRGYWN0b3IgPSBvcHRpb25zLnRpbWVGYWN0b3IgfHwgMVxyXG4gIGNhbnZhcyA9IHR5cGVvZiB0YXJnZXQgPT09IFwic3RyaW5nXCJcclxuICAgID8gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpXHJcbiAgICA6IHRhcmdldFxyXG4gIGxldCBmcmFnXHJcblxyXG4gIGlmIChjYXB0dXJlcikge1xyXG4gICAgY2FwdHVyZXIuc3RhcnQoKVxyXG4gIH1cclxuICBpZiAoZ2wpIHtcclxuICAgIHJlc2V0KClcclxuICB9XHJcblxyXG4gIGdsID0gZ2xDb250ZXh0KGNhbnZhcywgcmVuZGVyKVxyXG4gIHJlc2V0ID0gZ2xSZXNldChnbClcclxuICByZ2JhID0gcmdiYS5tYXAoZm5TdHIgPT4gZXFQYXJzZXIoZm5TdHIpKVxyXG4gIGZyYWcgPSByYXdGcmFnLnJlcGxhY2UoLyglUl9GTiV8JUdfRk4lfCVCX0ZOJXwlQV9GTiUpL2csIHN1YnN0ciA9PiByZ2JhW2ZyYWdMb29rdXBbc3Vic3RyXV0pXHJcbiAgICAgICAgICAgICAgICAucmVwbGFjZSgvJU5PSVNFJS9nLCAnc25vaXNlXzFfMycpXHJcbiAgc2hhZGVyID0gZ2xTaGFkZXIoZ2wsIHZlcnQsIGZyYWcpXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2luZGV4LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuYXR0cmlidXRlIHZlYzMgcG9zaXRpb247XFxuXFxudm9pZCBtYWluKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZlcnQuZ2xzbFxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gXCJwcmVjaXNpb24gbWVkaXVtcCBmbG9hdDtcXG4jZGVmaW5lIEdMU0xJRlkgMVxcblxcbnVuaWZvcm0gZmxvYXQgdDtcXG5cXG4vL1xcbi8vIERlc2NyaXB0aW9uIDogQXJyYXkgYW5kIHRleHR1cmVsZXNzIEdMU0wgMkQvM0QvNEQgc2ltcGxleFxcbi8vICAgICAgICAgICAgICAgbm9pc2UgZnVuY3Rpb25zLlxcbi8vICAgICAgQXV0aG9yIDogSWFuIE1jRXdhbiwgQXNoaW1hIEFydHMuXFxuLy8gIE1haW50YWluZXIgOiBpam1cXG4vLyAgICAgTGFzdG1vZCA6IDIwMTEwODIyIChpam0pXFxuLy8gICAgIExpY2Vuc2UgOiBDb3B5cmlnaHQgKEMpIDIwMTEgQXNoaW1hIEFydHMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuLy8gICAgICAgICAgICAgICBEaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuIFNlZSBMSUNFTlNFIGZpbGUuXFxuLy8gICAgICAgICAgICAgICBodHRwczovL2dpdGh1Yi5jb20vYXNoaW1hL3dlYmdsLW5vaXNlXFxuLy9cXG5cXG52ZWMzIG1vZDI4OV8xXzAodmVjMyB4KSB7XFxuICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xcbn1cXG5cXG52ZWM0IG1vZDI4OV8xXzAodmVjNCB4KSB7XFxuICByZXR1cm4geCAtIGZsb29yKHggKiAoMS4wIC8gMjg5LjApKSAqIDI4OS4wO1xcbn1cXG5cXG52ZWM0IHBlcm11dGVfMV8xKHZlYzQgeCkge1xcbiAgICAgcmV0dXJuIG1vZDI4OV8xXzAoKCh4KjM0LjApKzEuMCkqeCk7XFxufVxcblxcbnZlYzQgdGF5bG9ySW52U3FydF8xXzIodmVjNCByKVxcbntcXG4gIHJldHVybiAxLjc5Mjg0MjkxNDAwMTU5IC0gMC44NTM3MzQ3MjA5NTMxNCAqIHI7XFxufVxcblxcbmZsb2F0IHNub2lzZV8xXzModmVjMyB2KVxcbiAge1xcbiAgY29uc3QgdmVjMiAgQyA9IHZlYzIoMS4wLzYuMCwgMS4wLzMuMCkgO1xcbiAgY29uc3QgdmVjNCAgRF8xXzQgPSB2ZWM0KDAuMCwgMC41LCAxLjAsIDIuMCk7XFxuXFxuLy8gRmlyc3QgY29ybmVyXFxuICB2ZWMzIGkgID0gZmxvb3IodiArIGRvdCh2LCBDLnl5eSkgKTtcXG4gIHZlYzMgeDAgPSAgIHYgLSBpICsgZG90KGksIEMueHh4KSA7XFxuXFxuLy8gT3RoZXIgY29ybmVyc1xcbiAgdmVjMyBnXzFfNSA9IHN0ZXAoeDAueXp4LCB4MC54eXopO1xcbiAgdmVjMyBsID0gMS4wIC0gZ18xXzU7XFxuICB2ZWMzIGkxID0gbWluKCBnXzFfNS54eXosIGwuenh5ICk7XFxuICB2ZWMzIGkyID0gbWF4KCBnXzFfNS54eXosIGwuenh5ICk7XFxuXFxuICAvLyAgIHgwID0geDAgLSAwLjAgKyAwLjAgKiBDLnh4eDtcXG4gIC8vICAgeDEgPSB4MCAtIGkxICArIDEuMCAqIEMueHh4O1xcbiAgLy8gICB4MiA9IHgwIC0gaTIgICsgMi4wICogQy54eHg7XFxuICAvLyAgIHgzID0geDAgLSAxLjAgKyAzLjAgKiBDLnh4eDtcXG4gIHZlYzMgeDEgPSB4MCAtIGkxICsgQy54eHg7XFxuICB2ZWMzIHgyID0geDAgLSBpMiArIEMueXl5OyAvLyAyLjAqQy54ID0gMS8zID0gQy55XFxuICB2ZWMzIHgzID0geDAgLSBEXzFfNC55eXk7ICAgICAgLy8gLTEuMCszLjAqQy54ID0gLTAuNSA9IC1ELnlcXG5cXG4vLyBQZXJtdXRhdGlvbnNcXG4gIGkgPSBtb2QyODlfMV8wKGkpO1xcbiAgdmVjNCBwID0gcGVybXV0ZV8xXzEoIHBlcm11dGVfMV8xKCBwZXJtdXRlXzFfMShcXG4gICAgICAgICAgICAgaS56ICsgdmVjNCgwLjAsIGkxLnosIGkyLnosIDEuMCApKVxcbiAgICAgICAgICAgKyBpLnkgKyB2ZWM0KDAuMCwgaTEueSwgaTIueSwgMS4wICkpXFxuICAgICAgICAgICArIGkueCArIHZlYzQoMC4wLCBpMS54LCBpMi54LCAxLjAgKSk7XFxuXFxuLy8gR3JhZGllbnRzOiA3eDcgcG9pbnRzIG92ZXIgYSBzcXVhcmUsIG1hcHBlZCBvbnRvIGFuIG9jdGFoZWRyb24uXFxuLy8gVGhlIHJpbmcgc2l6ZSAxNyoxNyA9IDI4OSBpcyBjbG9zZSB0byBhIG11bHRpcGxlIG9mIDQ5ICg0OSo2ID0gMjk0KVxcbiAgZmxvYXQgbl8gPSAwLjE0Mjg1NzE0Mjg1NzsgLy8gMS4wLzcuMFxcbiAgdmVjMyAgbnMgPSBuXyAqIERfMV80Lnd5eiAtIERfMV80Lnh6eDtcXG5cXG4gIHZlYzQgaiA9IHAgLSA0OS4wICogZmxvb3IocCAqIG5zLnogKiBucy56KTsgIC8vICBtb2QocCw3KjcpXFxuXFxuICB2ZWM0IHhfID0gZmxvb3IoaiAqIG5zLnopO1xcbiAgdmVjNCB5XyA9IGZsb29yKGogLSA3LjAgKiB4XyApOyAgICAvLyBtb2QoaixOKVxcblxcbiAgdmVjNCB4ID0geF8gKm5zLnggKyBucy55eXl5O1xcbiAgdmVjNCB5ID0geV8gKm5zLnggKyBucy55eXl5O1xcbiAgdmVjNCBoID0gMS4wIC0gYWJzKHgpIC0gYWJzKHkpO1xcblxcbiAgdmVjNCBiMCA9IHZlYzQoIHgueHksIHkueHkgKTtcXG4gIHZlYzQgYjEgPSB2ZWM0KCB4Lnp3LCB5Lnp3ICk7XFxuXFxuICAvL3ZlYzQgczAgPSB2ZWM0KGxlc3NUaGFuKGIwLDAuMCkpKjIuMCAtIDEuMDtcXG4gIC8vdmVjNCBzMSA9IHZlYzQobGVzc1RoYW4oYjEsMC4wKSkqMi4wIC0gMS4wO1xcbiAgdmVjNCBzMCA9IGZsb29yKGIwKSoyLjAgKyAxLjA7XFxuICB2ZWM0IHMxID0gZmxvb3IoYjEpKjIuMCArIDEuMDtcXG4gIHZlYzQgc2ggPSAtc3RlcChoLCB2ZWM0KDAuMCkpO1xcblxcbiAgdmVjNCBhMCA9IGIwLnh6eXcgKyBzMC54enl3KnNoLnh4eXkgO1xcbiAgdmVjNCBhMV8xXzYgPSBiMS54enl3ICsgczEueHp5dypzaC56end3IDtcXG5cXG4gIHZlYzMgcDBfMV83ID0gdmVjMyhhMC54eSxoLngpO1xcbiAgdmVjMyBwMSA9IHZlYzMoYTAuencsaC55KTtcXG4gIHZlYzMgcDIgPSB2ZWMzKGExXzFfNi54eSxoLnopO1xcbiAgdmVjMyBwMyA9IHZlYzMoYTFfMV82Lnp3LGgudyk7XFxuXFxuLy9Ob3JtYWxpc2UgZ3JhZGllbnRzXFxuICB2ZWM0IG5vcm0gPSB0YXlsb3JJbnZTcXJ0XzFfMih2ZWM0KGRvdChwMF8xXzcscDBfMV83KSwgZG90KHAxLHAxKSwgZG90KHAyLCBwMiksIGRvdChwMyxwMykpKTtcXG4gIHAwXzFfNyAqPSBub3JtLng7XFxuICBwMSAqPSBub3JtLnk7XFxuICBwMiAqPSBub3JtLno7XFxuICBwMyAqPSBub3JtLnc7XFxuXFxuLy8gTWl4IGZpbmFsIG5vaXNlIHZhbHVlXFxuICB2ZWM0IG0gPSBtYXgoMC42IC0gdmVjNChkb3QoeDAseDApLCBkb3QoeDEseDEpLCBkb3QoeDIseDIpLCBkb3QoeDMseDMpKSwgMC4wKTtcXG4gIG0gPSBtICogbTtcXG4gIHJldHVybiA0Mi4wICogZG90KCBtKm0sIHZlYzQoIGRvdChwMF8xXzcseDApLCBkb3QocDEseDEpLFxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG90KHAyLHgyKSwgZG90KHAzLHgzKSApICk7XFxuICB9XFxuXFxuXFxuXFxuXFxudm9pZCBtYWluKCkge1xcbiAgZmxvYXQgciA9ICVSX0ZOJTtcXG4gIGZsb2F0IGcgPSAlR19GTiU7XFxuICBmbG9hdCBiID0gJUJfRk4lO1xcbiAgZmxvYXQgYSA9ICVBX0ZOJTtcXG4gIGdsX0ZyYWdDb2xvciA9IHZlYzQociwgZywgYiwgYSk7XFxufVxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvZnJhZy5nbHNsXG4vLyBtb2R1bGUgaWQgPSA5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpXG5cbm1vZHVsZS5leHBvcnRzID0gY2xlYXJcblxuZnVuY3Rpb24gY2xlYXIob3B0cykge1xuICBvcHRzID0gb3B0cyB8fCB7fVxuXG4gIHZhciBjb2xvciA9IGRlZmF1bHRzLmNvbG9yKG9wdHMuY29sb3IpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGVhciwgJ2NvbG9yJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBjb2xvciB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBjb2xvciA9IGRlZmF1bHRzLmNvbG9yKHZhbHVlKVxuICAgIH1cbiAgfSlcblxuICB2YXIgZGVwdGggPSBkZWZhdWx0cy5kZXB0aChvcHRzLmRlcHRoKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xlYXIsICdkZXB0aCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gZGVwdGggfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZGVwdGggPSBkZWZhdWx0cy5kZXB0aCh2YWx1ZSlcbiAgICB9XG4gIH0pXG5cbiAgdmFyIHN0ZW5jaWwgPSBkZWZhdWx0cy5zdGVuY2lsKG9wdHMuc3RlbmNpbClcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsZWFyLCAnc3RlbmNpbCcsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gc3RlbmNpbCB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBzdGVuY2lsID0gZGVmYXVsdHMuc3RlbmNpbCh2YWx1ZSlcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGNsZWFyXG5cbiAgZnVuY3Rpb24gY2xlYXIoZ2wpIHtcbiAgICB2YXIgZmxhZ3MgPSAwXG5cbiAgICBpZiAoY29sb3IgIT09IGZhbHNlKSB7XG4gICAgICBnbC5jbGVhckNvbG9yKGNvbG9yWzBdLCBjb2xvclsxXSwgY29sb3JbMl0sIGNvbG9yWzNdKVxuICAgICAgZmxhZ3MgfD0gZ2wuQ09MT1JfQlVGRkVSX0JJVFxuICAgIH1cbiAgICBpZiAoZGVwdGggIT09IGZhbHNlKSB7XG4gICAgICBnbC5jbGVhckRlcHRoKGRlcHRoKVxuICAgICAgZmxhZ3MgfD0gZ2wuREVQVEhfQlVGRkVSX0JJVFxuICAgIH1cbiAgICBpZiAoc3RlbmNpbCAhPT0gZmFsc2UpIHtcbiAgICAgIGdsLmNsZWFyU3RlbmNpbChzdGVuY2lsKVxuICAgICAgZmxhZ3MgfD0gZ2wuU1RFTkNJTF9CVUZGRVJfQklUXG4gICAgfVxuXG4gICAgZ2wuY2xlYXIoZmxhZ3MpXG5cbiAgICByZXR1cm4gZ2xcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY2xlYXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0cy5jb2xvciA9IGZ1bmN0aW9uKGNvbG9yKSB7XG4gIHJldHVybiBhcnJheShjb2xvciwgWzAsIDAsIDAsIDFdKVxufVxuXG5leHBvcnRzLmRlcHRoID0gZnVuY3Rpb24oZGVwdGgpIHtcbiAgcmV0dXJuIG51bWJlcihkZXB0aCwgMSlcbn1cblxuZXhwb3J0cy5zdGVuY2lsID0gZnVuY3Rpb24oc3RlbmNpbCkge1xuICByZXR1cm4gbnVtYmVyKHN0ZW5jaWwsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBudW1iZXIobiwgZGVmKSB7XG4gIGlmIChuID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXG4gIGlmICh0eXBlb2YgbiA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybiBkZWZcbiAgcmV0dXJuIG4gKyAwXG59XG5cbmZ1bmN0aW9uIGFycmF5KGEsIGRlZikge1xuICBpZiAoYSA9PT0gZmFsc2UpIHJldHVybiBmYWxzZVxuICBpZiAoQXJyYXkuaXNBcnJheShhKSkgcmV0dXJuIGEgfHwgZGVmXG4gIHJldHVybiBkZWZcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2RlZmF1bHRzLmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciByYWYgPSByZXF1aXJlKCdyYWYtY29tcG9uZW50JylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb250ZXh0XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoY2FudmFzLCBvcHRzLCByZW5kZXIpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVuZGVyID0gb3B0c1xuICAgIG9wdHMgPSB7fVxuICB9IGVsc2Uge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gIH1cblxuICB2YXIgZ2wgPSAoXG4gICAgY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgb3B0cykgfHxcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wtZXhwZXJpbWVudGFsJywgb3B0cykgfHxcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0cylcbiAgKVxuXG4gIGlmICghZ2wpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMJylcbiAgfVxuXG4gIGlmIChyZW5kZXIpIHJhZih0aWNrKVxuXG4gIHJldHVybiBnbFxuXG4gIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgcmVuZGVyKGdsKVxuICAgIHJhZih0aWNrKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jb250ZXh0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qKlxuICogRXhwb3NlIGByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKWAuXG4gKi9cblxuZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tb3pSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm9SZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IGZhbGxiYWNrO1xuXG4vKipcbiAqIEZhbGxiYWNrIGltcGxlbWVudGF0aW9uLlxuICovXG5cbnZhciBwcmV2ID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5mdW5jdGlvbiBmYWxsYmFjayhmbikge1xuICB2YXIgY3VyciA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICB2YXIgbXMgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyIC0gcHJldikpO1xuICB2YXIgcmVxID0gc2V0VGltZW91dChmbiwgbXMpO1xuICBwcmV2ID0gY3VycjtcbiAgcmV0dXJuIHJlcTtcbn1cblxuLyoqXG4gKiBDYW5jZWwuXG4gKi9cblxudmFyIGNhbmNlbCA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1vekNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5vQ2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LmNsZWFyVGltZW91dDtcblxuZXhwb3J0cy5jYW5jZWwgPSBmdW5jdGlvbihpZCl7XG4gIGNhbmNlbC5jYWxsKHdpbmRvdywgaWQpO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JhZi1jb21wb25lbnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjcmVhdGVVbmlmb3JtV3JhcHBlciAgID0gcmVxdWlyZSgnLi9saWIvY3JlYXRlLXVuaWZvcm1zJylcbnZhciBjcmVhdGVBdHRyaWJ1dGVXcmFwcGVyID0gcmVxdWlyZSgnLi9saWIvY3JlYXRlLWF0dHJpYnV0ZXMnKVxudmFyIG1ha2VSZWZsZWN0ICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9yZWZsZWN0JylcbnZhciBzaGFkZXJDYWNoZSAgICAgICAgICAgID0gcmVxdWlyZSgnLi9saWIvc2hhZGVyLWNhY2hlJylcbnZhciBydW50aW1lICAgICAgICAgICAgICAgID0gcmVxdWlyZSgnLi9saWIvcnVudGltZS1yZWZsZWN0JylcbnZhciBHTEVycm9yICAgICAgICAgICAgICAgID0gcmVxdWlyZShcIi4vbGliL0dMRXJyb3JcIilcblxuLy9TaGFkZXIgb2JqZWN0XG5mdW5jdGlvbiBTaGFkZXIoZ2wpIHtcbiAgdGhpcy5nbCAgICAgICAgID0gZ2xcbiAgdGhpcy5nbC5sYXN0QXR0cmliQ291bnQgPSAwICAvLyBmaXhtZSB3aGVyZSBlbHNlIHNob3VsZCB3ZSBzdG9yZSBpbmZvLCBzYWZlIGJ1dCBub3QgbmljZSBvbiB0aGUgZ2wgb2JqZWN0XG5cbiAgLy9EZWZhdWx0IGluaXRpYWxpemUgdGhlc2UgdG8gbnVsbFxuICB0aGlzLl92cmVmICAgICAgPVxuICB0aGlzLl9mcmVmICAgICAgPVxuICB0aGlzLl9yZWxpbmsgICAgPVxuICB0aGlzLnZlcnRTaGFkZXIgPVxuICB0aGlzLmZyYWdTaGFkZXIgPVxuICB0aGlzLnByb2dyYW0gICAgPVxuICB0aGlzLmF0dHJpYnV0ZXMgPVxuICB0aGlzLnVuaWZvcm1zICAgPVxuICB0aGlzLnR5cGVzICAgICAgPSBudWxsXG59XG5cbnZhciBwcm90byA9IFNoYWRlci5wcm90b3R5cGVcblxucHJvdG8uYmluZCA9IGZ1bmN0aW9uKCkge1xuICBpZighdGhpcy5wcm9ncmFtKSB7XG4gICAgdGhpcy5fcmVsaW5rKClcbiAgfVxuXG4gIC8vIGVuc3VyaW5nIHRoYXQgd2UgaGF2ZSB0aGUgcmlnaHQgbnVtYmVyIG9mIGVuYWJsZWQgdmVydGV4IGF0dHJpYnV0ZXNcbiAgdmFyIGlcbiAgdmFyIG5ld0F0dHJpYkNvdW50ID0gdGhpcy5nbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRoaXMucHJvZ3JhbSwgdGhpcy5nbC5BQ1RJVkVfQVRUUklCVVRFUykgLy8gbW9yZSByb2J1c3QgYXBwcm9hY2hcbiAgLy92YXIgbmV3QXR0cmliQ291bnQgPSBPYmplY3Qua2V5cyh0aGlzLmF0dHJpYnV0ZXMpLmxlbmd0aCAvLyBhdm9pZHMgdGhlIHByb2JhYmx5IGltbWF0ZXJpYWwgaW50cm9zcGVjdGlvbiBzbG93ZG93blxuICB2YXIgb2xkQXR0cmliQ291bnQgPSB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudFxuICBpZihuZXdBdHRyaWJDb3VudCA+IG9sZEF0dHJpYkNvdW50KSB7XG4gICAgZm9yKGkgPSBvbGRBdHRyaWJDb3VudDsgaSA8IG5ld0F0dHJpYkNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH0gZWxzZSBpZihvbGRBdHRyaWJDb3VudCA+IG5ld0F0dHJpYkNvdW50KSB7XG4gICAgZm9yKGkgPSBuZXdBdHRyaWJDb3VudDsgaSA8IG9sZEF0dHJpYkNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5nbC5sYXN0QXR0cmliQ291bnQgPSBuZXdBdHRyaWJDb3VudFxuXG4gIHRoaXMuZ2wudXNlUHJvZ3JhbSh0aGlzLnByb2dyYW0pXG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcblxuICAvLyBkaXNhYmxpbmcgdmVydGV4IGF0dHJpYnV0ZXMgc28gbmV3IHNoYWRlciBzdGFydHMgd2l0aCB6ZXJvXG4gIC8vIGFuZCBpdCdzIGFsc28gdXNlZnVsIGlmIGFsbCBzaGFkZXJzIGFyZSBkaXNwb3NlZCBidXQgdGhlXG4gIC8vIGdsIGNvbnRleHQgaXMgcmV1c2VkIGZvciBzdWJzZXF1ZW50IHJlcGxvdHRpbmdcbiAgdmFyIG9sZEF0dHJpYkNvdW50ID0gdGhpcy5nbC5sYXN0QXR0cmliQ291bnRcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBvbGRBdHRyaWJDb3VudDsgaSsrKSB7XG4gICAgdGhpcy5nbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgfVxuICB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudCA9IDBcblxuICBpZih0aGlzLl9mcmVmKSB7XG4gICAgdGhpcy5fZnJlZi5kaXNwb3NlKClcbiAgfVxuICBpZih0aGlzLl92cmVmKSB7XG4gICAgdGhpcy5fdnJlZi5kaXNwb3NlKClcbiAgfVxuICB0aGlzLmF0dHJpYnV0ZXMgPVxuICB0aGlzLnR5cGVzICAgICAgPVxuICB0aGlzLnZlcnRTaGFkZXIgPVxuICB0aGlzLmZyYWdTaGFkZXIgPVxuICB0aGlzLnByb2dyYW0gICAgPVxuICB0aGlzLl9yZWxpbmsgICAgPVxuICB0aGlzLl9mcmVmICAgICAgPVxuICB0aGlzLl92cmVmICAgICAgPSBudWxsXG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVBdHRyaWJ1dGVzKGEsIGIpIHtcbiAgaWYoYS5uYW1lIDwgYi5uYW1lKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgcmV0dXJuIDFcbn1cblxuLy9VcGRhdGUgZXhwb3J0IGhvb2sgZm9yIGdsc2xpZnktbGl2ZVxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oXG4gICAgdmVydFNvdXJjZVxuICAsIGZyYWdTb3VyY2VcbiAgLCB1bmlmb3Jtc1xuICAsIGF0dHJpYnV0ZXMpIHtcblxuICAvL0lmIG9ubHkgb25lIG9iamVjdCBwYXNzZWQsIGFzc3VtZSBnbHNsaWZ5IHN0eWxlIG91dHB1dFxuICBpZighZnJhZ1NvdXJjZSB8fCBhcmd1bWVudHMubGVuZ3RoID09PSAxKSB7XG4gICAgdmFyIG9iaiA9IHZlcnRTb3VyY2VcbiAgICB2ZXJ0U291cmNlID0gb2JqLnZlcnRleFxuICAgIGZyYWdTb3VyY2UgPSBvYmouZnJhZ21lbnRcbiAgICB1bmlmb3JtcyAgID0gb2JqLnVuaWZvcm1zXG4gICAgYXR0cmlidXRlcyA9IG9iai5hdHRyaWJ1dGVzXG4gIH1cblxuICB2YXIgd3JhcHBlciA9IHRoaXNcbiAgdmFyIGdsICAgICAgPSB3cmFwcGVyLmdsXG5cbiAgLy9Db21waWxlIHZlcnRleCBhbmQgZnJhZ21lbnQgc2hhZGVyc1xuICB2YXIgcHZyZWYgPSB3cmFwcGVyLl92cmVmXG4gIHdyYXBwZXIuX3ZyZWYgPSBzaGFkZXJDYWNoZS5zaGFkZXIoZ2wsIGdsLlZFUlRFWF9TSEFERVIsIHZlcnRTb3VyY2UpXG4gIGlmKHB2cmVmKSB7XG4gICAgcHZyZWYuZGlzcG9zZSgpXG4gIH1cbiAgd3JhcHBlci52ZXJ0U2hhZGVyID0gd3JhcHBlci5fdnJlZi5zaGFkZXJcbiAgdmFyIHBmcmVmID0gdGhpcy5fZnJlZlxuICB3cmFwcGVyLl9mcmVmID0gc2hhZGVyQ2FjaGUuc2hhZGVyKGdsLCBnbC5GUkFHTUVOVF9TSEFERVIsIGZyYWdTb3VyY2UpXG4gIGlmKHBmcmVmKSB7XG4gICAgcGZyZWYuZGlzcG9zZSgpXG4gIH1cbiAgd3JhcHBlci5mcmFnU2hhZGVyID0gd3JhcHBlci5fZnJlZi5zaGFkZXJcblxuICAvL0lmIHVuaWZvcm1zL2F0dHJpYnV0ZXMgaXMgbm90IHNwZWNpZmllZCwgdXNlIFJUIHJlZmxlY3Rpb25cbiAgaWYoIXVuaWZvcm1zIHx8ICFhdHRyaWJ1dGVzKSB7XG5cbiAgICAvL0NyZWF0ZSBpbml0aWFsIHRlc3QgcHJvZ3JhbVxuICAgIHZhciB0ZXN0UHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKVxuICAgIGdsLmF0dGFjaFNoYWRlcih0ZXN0UHJvZ3JhbSwgd3JhcHBlci5mcmFnU2hhZGVyKVxuICAgIGdsLmF0dGFjaFNoYWRlcih0ZXN0UHJvZ3JhbSwgd3JhcHBlci52ZXJ0U2hhZGVyKVxuICAgIGdsLmxpbmtQcm9ncmFtKHRlc3RQcm9ncmFtKVxuICAgIGlmKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHRlc3RQcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICAgIHZhciBlcnJMb2cgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyh0ZXN0UHJvZ3JhbSlcbiAgICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgJ0Vycm9yIGxpbmtpbmcgcHJvZ3JhbTonICsgZXJyTG9nKVxuICAgIH1cblxuICAgIC8vTG9hZCBkYXRhIGZyb20gcnVudGltZVxuICAgIHVuaWZvcm1zICAgPSB1bmlmb3JtcyAgIHx8IHJ1bnRpbWUudW5pZm9ybXMoZ2wsIHRlc3RQcm9ncmFtKVxuICAgIGF0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzIHx8IHJ1bnRpbWUuYXR0cmlidXRlcyhnbCwgdGVzdFByb2dyYW0pXG5cbiAgICAvL1JlbGVhc2UgdGVzdCBwcm9ncmFtXG4gICAgZ2wuZGVsZXRlUHJvZ3JhbSh0ZXN0UHJvZ3JhbSlcbiAgfVxuXG4gIC8vU29ydCBhdHRyaWJ1dGVzIGxleGljb2dyYXBoaWNhbGx5XG4gIC8vIG92ZXJyaWRlcyB1bmRlZmluZWQgV2ViR0wgYmVoYXZpb3IgZm9yIGF0dHJpYnV0ZSBsb2NhdGlvbnNcbiAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMuc2xpY2UoKVxuICBhdHRyaWJ1dGVzLnNvcnQoY29tcGFyZUF0dHJpYnV0ZXMpXG5cbiAgLy9Db252ZXJ0IGF0dHJpYnV0ZSB0eXBlcywgcmVhZCBvdXQgbG9jYXRpb25zXG4gIHZhciBhdHRyaWJ1dGVVbnBhY2tlZCAgPSBbXVxuICB2YXIgYXR0cmlidXRlTmFtZXMgICAgID0gW11cbiAgdmFyIGF0dHJpYnV0ZUxvY2F0aW9ucyA9IFtdXG4gIHZhciBpXG4gIGZvcihpPTA7IGk8YXR0cmlidXRlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhdHRyID0gYXR0cmlidXRlc1tpXVxuICAgIGlmKGF0dHIudHlwZS5pbmRleE9mKCdtYXQnKSA+PSAwKSB7XG4gICAgICB2YXIgc2l6ZSA9IGF0dHIudHlwZS5jaGFyQXQoYXR0ci50eXBlLmxlbmd0aC0xKXwwXG4gICAgICB2YXIgbG9jVmVjdG9yID0gbmV3IEFycmF5KHNpemUpXG4gICAgICBmb3IodmFyIGo9MDsgajxzaXplOyArK2opIHtcbiAgICAgICAgbG9jVmVjdG9yW2pdID0gYXR0cmlidXRlTG9jYXRpb25zLmxlbmd0aFxuICAgICAgICBhdHRyaWJ1dGVOYW1lcy5wdXNoKGF0dHIubmFtZSArICdbJyArIGogKyAnXScpXG4gICAgICAgIGlmKHR5cGVvZiBhdHRyLmxvY2F0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKGF0dHIubG9jYXRpb24gKyBqKVxuICAgICAgICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShhdHRyLmxvY2F0aW9uKSAmJlxuICAgICAgICAgICAgICAgICAgYXR0ci5sb2NhdGlvbi5sZW5ndGggPT09IHNpemUgJiZcbiAgICAgICAgICAgICAgICAgIHR5cGVvZiBhdHRyLmxvY2F0aW9uW2pdID09PSAnbnVtYmVyJykge1xuICAgICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKGF0dHIubG9jYXRpb25bal18MClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaCgtMSlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYXR0cmlidXRlVW5wYWNrZWQucHVzaCh7XG4gICAgICAgIG5hbWU6IGF0dHIubmFtZSxcbiAgICAgICAgdHlwZTogYXR0ci50eXBlLFxuICAgICAgICBsb2NhdGlvbnM6IGxvY1ZlY3RvclxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgYXR0cmlidXRlVW5wYWNrZWQucHVzaCh7XG4gICAgICAgIG5hbWU6IGF0dHIubmFtZSxcbiAgICAgICAgdHlwZTogYXR0ci50eXBlLFxuICAgICAgICBsb2NhdGlvbnM6IFsgYXR0cmlidXRlTG9jYXRpb25zLmxlbmd0aCBdXG4gICAgICB9KVxuICAgICAgYXR0cmlidXRlTmFtZXMucHVzaChhdHRyLm5hbWUpXG4gICAgICBpZih0eXBlb2YgYXR0ci5sb2NhdGlvbiA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goYXR0ci5sb2NhdGlvbnwwKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goLTEpXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9Gb3IgYWxsIHVuc3BlY2lmaWVkIGF0dHJpYnV0ZXMsIGFzc2lnbiB0aGVtIGxleGljb2dyYXBoaWNhbGx5IG1pbiBhdHRyaWJ1dGVcbiAgdmFyIGN1ckxvY2F0aW9uID0gMFxuICBmb3IoaT0wOyBpPGF0dHJpYnV0ZUxvY2F0aW9ucy5sZW5ndGg7ICsraSkge1xuICAgIGlmKGF0dHJpYnV0ZUxvY2F0aW9uc1tpXSA8IDApIHtcbiAgICAgIHdoaWxlKGF0dHJpYnV0ZUxvY2F0aW9ucy5pbmRleE9mKGN1ckxvY2F0aW9uKSA+PSAwKSB7XG4gICAgICAgIGN1ckxvY2F0aW9uICs9IDFcbiAgICAgIH1cbiAgICAgIGF0dHJpYnV0ZUxvY2F0aW9uc1tpXSA9IGN1ckxvY2F0aW9uXG4gICAgfVxuICB9XG5cbiAgLy9SZWJ1aWxkIHByb2dyYW0gYW5kIHJlY29tcHV0ZSBhbGwgdW5pZm9ybSBsb2NhdGlvbnNcbiAgdmFyIHVuaWZvcm1Mb2NhdGlvbnMgPSBuZXcgQXJyYXkodW5pZm9ybXMubGVuZ3RoKVxuICBmdW5jdGlvbiByZWxpbmsoKSB7XG4gICAgd3JhcHBlci5wcm9ncmFtID0gc2hhZGVyQ2FjaGUucHJvZ3JhbShcbiAgICAgICAgZ2xcbiAgICAgICwgd3JhcHBlci5fdnJlZlxuICAgICAgLCB3cmFwcGVyLl9mcmVmXG4gICAgICAsIGF0dHJpYnV0ZU5hbWVzXG4gICAgICAsIGF0dHJpYnV0ZUxvY2F0aW9ucylcblxuICAgIGZvcih2YXIgaT0wOyBpPHVuaWZvcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgICB1bmlmb3JtTG9jYXRpb25zW2ldID0gZ2wuZ2V0VW5pZm9ybUxvY2F0aW9uKFxuICAgICAgICAgIHdyYXBwZXIucHJvZ3JhbVxuICAgICAgICAsIHVuaWZvcm1zW2ldLm5hbWUpXG4gICAgfVxuICB9XG5cbiAgLy9QZXJmb3JtIGluaXRpYWwgbGlua2luZywgcmV1c2UgcHJvZ3JhbSB1c2VkIGZvciByZWZsZWN0aW9uXG4gIHJlbGluaygpXG5cbiAgLy9TYXZlIHJlbGlua2luZyBwcm9jZWR1cmUsIGRlZmVyIHVudGlsIHJ1bnRpbWVcbiAgd3JhcHBlci5fcmVsaW5rID0gcmVsaW5rXG5cbiAgLy9HZW5lcmF0ZSB0eXBlIGluZm9cbiAgd3JhcHBlci50eXBlcyA9IHtcbiAgICB1bmlmb3JtczogICBtYWtlUmVmbGVjdCh1bmlmb3JtcyksXG4gICAgYXR0cmlidXRlczogbWFrZVJlZmxlY3QoYXR0cmlidXRlcylcbiAgfVxuXG4gIC8vR2VuZXJhdGUgYXR0cmlidXRlIHdyYXBwZXJzXG4gIHdyYXBwZXIuYXR0cmlidXRlcyA9IGNyZWF0ZUF0dHJpYnV0ZVdyYXBwZXIoXG4gICAgICBnbFxuICAgICwgd3JhcHBlclxuICAgICwgYXR0cmlidXRlVW5wYWNrZWRcbiAgICAsIGF0dHJpYnV0ZUxvY2F0aW9ucylcblxuICAvL0dlbmVyYXRlIHVuaWZvcm0gd3JhcHBlcnNcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHdyYXBwZXIsICd1bmlmb3JtcycsIGNyZWF0ZVVuaWZvcm1XcmFwcGVyKFxuICAgICAgZ2xcbiAgICAsIHdyYXBwZXJcbiAgICAsIHVuaWZvcm1zXG4gICAgLCB1bmlmb3JtTG9jYXRpb25zKSlcbn1cblxuLy9Db21waWxlcyBhbmQgbGlua3MgYSBzaGFkZXIgcHJvZ3JhbSB3aXRoIHRoZSBnaXZlbiBhdHRyaWJ1dGUgYW5kIHZlcnRleCBsaXN0XG5mdW5jdGlvbiBjcmVhdGVTaGFkZXIoXG4gICAgZ2xcbiAgLCB2ZXJ0U291cmNlXG4gICwgZnJhZ1NvdXJjZVxuICAsIHVuaWZvcm1zXG4gICwgYXR0cmlidXRlcykge1xuXG4gIHZhciBzaGFkZXIgPSBuZXcgU2hhZGVyKGdsKVxuXG4gIHNoYWRlci51cGRhdGUoXG4gICAgICB2ZXJ0U291cmNlXG4gICAgLCBmcmFnU291cmNlXG4gICAgLCB1bmlmb3Jtc1xuICAgICwgYXR0cmlidXRlcylcblxuICByZXR1cm4gc2hhZGVyXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU2hhZGVyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjb2FsbGVzY2VVbmlmb3JtcyA9IHJlcXVpcmUoJy4vcmVmbGVjdCcpXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVbmlmb3JtV3JhcHBlclxuXG4vL0JpbmRzIGEgZnVuY3Rpb24gYW5kIHJldHVybnMgYSB2YWx1ZVxuZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICB2YXIgYyA9IG5ldyBGdW5jdGlvbigneScsICdyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4geX0nKVxuICByZXR1cm4gYyh4KVxufVxuXG5mdW5jdGlvbiBtYWtlVmVjdG9yKGxlbmd0aCwgZmlsbCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yKHZhciBpPTA7IGk8bGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBmaWxsXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vL0NyZWF0ZSBzaGltcyBmb3IgdW5pZm9ybXNcbmZ1bmN0aW9uIGNyZWF0ZVVuaWZvcm1XcmFwcGVyKGdsLCB3cmFwcGVyLCB1bmlmb3JtcywgbG9jYXRpb25zKSB7XG5cbiAgZnVuY3Rpb24gbWFrZUdldHRlcihpbmRleCkge1xuICAgIHZhciBwcm9jID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgICAnZ2wnXG4gICAgICAsICd3cmFwcGVyJ1xuICAgICAgLCAnbG9jYXRpb25zJ1xuICAgICAgLCAncmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGdsLmdldFVuaWZvcm0od3JhcHBlci5wcm9ncmFtLGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSl9JylcbiAgICByZXR1cm4gcHJvYyhnbCwgd3JhcHBlciwgbG9jYXRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVByb3BTZXR0ZXIocGF0aCwgaW5kZXgsIHR5cGUpIHtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICBjYXNlICdpbnQnOlxuICAgICAgY2FzZSAnc2FtcGxlcjJEJzpcbiAgICAgIGNhc2UgJ3NhbXBsZXJDdWJlJzpcbiAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtMWkobG9jYXRpb25zWycgKyBpbmRleCArICddLG9iaicgKyBwYXRoICsgJyknXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAnZ2wudW5pZm9ybTFmKGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHZpZHggPSB0eXBlLmluZGV4T2YoJ3ZlYycpXG4gICAgICAgIGlmKDAgPD0gdmlkeCAmJiB2aWR4IDw9IDEgJiYgdHlwZS5sZW5ndGggPT09IDQgKyB2aWR4KSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoKHR5cGUuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0nICsgZCArICdpdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0nICsgZCArICdmdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5yZWNvZ25pemVkIGRhdGEgdHlwZSBmb3IgdmVjdG9yICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYodHlwZS5pbmRleE9mKCdtYXQnKSA9PT0gMCAmJiB0eXBlLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIHVuaWZvcm0gZGltZW5zaW9uIHR5cGUgZm9yIG1hdHJpeCAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm1NYXRyaXgnICsgZCArICdmdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sZmFsc2Usb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ1Vua25vd24gdW5pZm9ybSBkYXRhIHR5cGUgZm9yICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW51bWVyYXRlSW5kaWNlcyhwcmVmaXgsIHR5cGUpIHtcbiAgICBpZih0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBbIFtwcmVmaXgsIHR5cGVdIF1cbiAgICB9XG4gICAgdmFyIGluZGljZXMgPSBbXVxuICAgIGZvcih2YXIgaWQgaW4gdHlwZSkge1xuICAgICAgdmFyIHByb3AgPSB0eXBlW2lkXVxuICAgICAgdmFyIHRwcmVmaXggPSBwcmVmaXhcbiAgICAgIGlmKHBhcnNlSW50KGlkKSArICcnID09PSBpZCkge1xuICAgICAgICB0cHJlZml4ICs9ICdbJyArIGlkICsgJ10nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cHJlZml4ICs9ICcuJyArIGlkXG4gICAgICB9XG4gICAgICBpZih0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaW5kaWNlcy5wdXNoLmFwcGx5KGluZGljZXMsIGVudW1lcmF0ZUluZGljZXModHByZWZpeCwgcHJvcCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRpY2VzLnB1c2goW3RwcmVmaXgsIHByb3BdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5kaWNlc1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVNldHRlcih0eXBlKSB7XG4gICAgdmFyIGNvZGUgPSBbICdyZXR1cm4gZnVuY3Rpb24gdXBkYXRlUHJvcGVydHkob2JqKXsnIF1cbiAgICB2YXIgaW5kaWNlcyA9IGVudW1lcmF0ZUluZGljZXMoJycsIHR5cGUpXG4gICAgZm9yKHZhciBpPTA7IGk8aW5kaWNlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGl0ZW0gPSBpbmRpY2VzW2ldXG4gICAgICB2YXIgcGF0aCA9IGl0ZW1bMF1cbiAgICAgIHZhciBpZHggID0gaXRlbVsxXVxuICAgICAgaWYobG9jYXRpb25zW2lkeF0pIHtcbiAgICAgICAgY29kZS5wdXNoKG1ha2VQcm9wU2V0dGVyKHBhdGgsIGlkeCwgdW5pZm9ybXNbaWR4XS50eXBlKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29kZS5wdXNoKCdyZXR1cm4gb2JqfScpXG4gICAgdmFyIHByb2MgPSBuZXcgRnVuY3Rpb24oJ2dsJywgJ2xvY2F0aW9ucycsIGNvZGUuam9pbignXFxuJykpXG4gICAgcmV0dXJuIHByb2MoZ2wsIGxvY2F0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZSh0eXBlKSB7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIGNhc2UgJ2ludCc6XG4gICAgICBjYXNlICdzYW1wbGVyMkQnOlxuICAgICAgY2FzZSAnc2FtcGxlckN1YmUnOlxuICAgICAgICByZXR1cm4gMFxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gMC4wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgdmlkeCA9IHR5cGUuaW5kZXhPZigndmVjJylcbiAgICAgICAgaWYoMCA8PSB2aWR4ICYmIHZpZHggPD0gMSAmJiB0eXBlLmxlbmd0aCA9PT0gNCArIHZpZHgpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCBkYXRhIHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0eXBlLmNoYXJBdCgwKSA9PT0gJ2InKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZVZlY3RvcihkLCBmYWxzZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1ha2VWZWN0b3IoZCwgMClcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUuaW5kZXhPZignbWF0JykgPT09IDAgJiYgdHlwZS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCB1bmlmb3JtIGRpbWVuc2lvbiB0eXBlIGZvciBtYXRyaXggJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1ha2VWZWN0b3IoZCpkLCAwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5rbm93biB1bmlmb3JtIGRhdGEgdHlwZSBmb3IgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9yZVByb3BlcnR5KG9iaiwgcHJvcCwgdHlwZSkge1xuICAgIGlmKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGNoaWxkID0gcHJvY2Vzc09iamVjdCh0eXBlKVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwge1xuICAgICAgICBnZXQ6IGlkZW50aXR5KGNoaWxkKSxcbiAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHR5cGUpLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihsb2NhdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwge1xuICAgICAgICAgIGdldDogbWFrZUdldHRlcih0eXBlKSxcbiAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodHlwZSksXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpbcHJvcF0gPSBkZWZhdWx0VmFsdWUodW5pZm9ybXNbdHlwZV0udHlwZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzT2JqZWN0KG9iaikge1xuICAgIHZhciByZXN1bHRcbiAgICBpZihBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShvYmoubGVuZ3RoKVxuICAgICAgZm9yKHZhciBpPTA7IGk8b2JqLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHN0b3JlUHJvcGVydHkocmVzdWx0LCBpLCBvYmpbaV0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHt9XG4gICAgICBmb3IodmFyIGlkIGluIG9iaikge1xuICAgICAgICBzdG9yZVByb3BlcnR5KHJlc3VsdCwgaWQsIG9ialtpZF0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8vUmV0dXJuIGRhdGFcbiAgdmFyIGNvYWxsZXNjZWQgPSBjb2FsbGVzY2VVbmlmb3Jtcyh1bmlmb3JtcywgdHJ1ZSlcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGlkZW50aXR5KHByb2Nlc3NPYmplY3QoY29hbGxlc2NlZCkpLFxuICAgIHNldDogbWFrZVNldHRlcihjb2FsbGVzY2VkKSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS11bmlmb3Jtcy5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBdHRyaWJ1dGVXcmFwcGVyXG5cbnZhciBHTEVycm9yID0gcmVxdWlyZShcIi4vR0xFcnJvclwiKVxuXG5mdW5jdGlvbiBTaGFkZXJBdHRyaWJ1dGUoXG4gICAgZ2xcbiAgLCB3cmFwcGVyXG4gICwgaW5kZXhcbiAgLCBsb2NhdGlvbnNcbiAgLCBkaW1lbnNpb25cbiAgLCBjb25zdEZ1bmMpIHtcbiAgdGhpcy5fZ2wgICAgICAgID0gZ2xcbiAgdGhpcy5fd3JhcHBlciAgID0gd3JhcHBlclxuICB0aGlzLl9pbmRleCAgICAgPSBpbmRleFxuICB0aGlzLl9sb2NhdGlvbnMgPSBsb2NhdGlvbnNcbiAgdGhpcy5fZGltZW5zaW9uID0gZGltZW5zaW9uXG4gIHRoaXMuX2NvbnN0RnVuYyA9IGNvbnN0RnVuY1xufVxuXG52YXIgcHJvdG8gPSBTaGFkZXJBdHRyaWJ1dGUucHJvdG90eXBlXG5cbnByb3RvLnBvaW50ZXIgPSBmdW5jdGlvbiBzZXRBdHRyaWJQb2ludGVyKFxuICAgIHR5cGVcbiAgLCBub3JtYWxpemVkXG4gICwgc3RyaWRlXG4gICwgb2Zmc2V0KSB7XG5cbiAgdmFyIHNlbGYgICAgICA9IHRoaXNcbiAgdmFyIGdsICAgICAgICA9IHNlbGYuX2dsXG4gIHZhciBsb2NhdGlvbiAgPSBzZWxmLl9sb2NhdGlvbnNbc2VsZi5faW5kZXhdXG5cbiAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgIGxvY2F0aW9uXG4gICAgLCBzZWxmLl9kaW1lbnNpb25cbiAgICAsIHR5cGUgfHwgZ2wuRkxPQVRcbiAgICAsICEhbm9ybWFsaXplZFxuICAgICwgc3RyaWRlIHx8IDBcbiAgICAsIG9mZnNldCB8fCAwKVxuICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbilcbn1cblxucHJvdG8uc2V0ID0gZnVuY3Rpb24oeDAsIHgxLCB4MiwgeDMpIHtcbiAgcmV0dXJuIHRoaXMuX2NvbnN0RnVuYyh0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdLCB4MCwgeDEsIHgyLCB4Mylcbn1cblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCAnbG9jYXRpb24nLCB7XG4gIGdldDogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2xvY2F0aW9uc1t0aGlzLl9pbmRleF1cbiAgfVxuICAsIHNldDogZnVuY3Rpb24odikge1xuICAgIGlmKHYgIT09IHRoaXMuX2xvY2F0aW9uc1t0aGlzLl9pbmRleF0pIHtcbiAgICAgIHRoaXMuX2xvY2F0aW9uc1t0aGlzLl9pbmRleF0gPSB2fDBcbiAgICAgIHRoaXMuX3dyYXBwZXIucHJvZ3JhbSA9IG51bGxcbiAgICB9XG4gICAgcmV0dXJuIHZ8MFxuICB9XG59KVxuXG4vL0FkZHMgYSB2ZWN0b3IgYXR0cmlidXRlIHRvIG9ialxuZnVuY3Rpb24gYWRkVmVjdG9yQXR0cmlidXRlKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGluZGV4XG4gICwgbG9jYXRpb25zXG4gICwgZGltZW5zaW9uXG4gICwgb2JqXG4gICwgbmFtZSkge1xuXG4gIC8vQ29uc3RydWN0IGNvbnN0YW50IGZ1bmN0aW9uXG4gIHZhciBjb25zdEZ1bmNBcmdzID0gWyAnZ2wnLCAndicgXVxuICB2YXIgdmFyTmFtZXMgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvbnN0RnVuY0FyZ3MucHVzaCgneCcraSlcbiAgICB2YXJOYW1lcy5wdXNoKCd4JytpKVxuICB9XG4gIGNvbnN0RnVuY0FyZ3MucHVzaChcbiAgICAnaWYoeDAubGVuZ3RoPT09dm9pZCAwKXtyZXR1cm4gZ2wudmVydGV4QXR0cmliJyArXG4gICAgZGltZW5zaW9uICsgJ2YodiwnICtcbiAgICB2YXJOYW1lcy5qb2luKCkgK1xuICAgICcpfWVsc2V7cmV0dXJuIGdsLnZlcnRleEF0dHJpYicgK1xuICAgIGRpbWVuc2lvbiArXG4gICAgJ2Z2KHYseDApfScpXG4gIHZhciBjb25zdEZ1bmMgPSBGdW5jdGlvbi5hcHBseShudWxsLCBjb25zdEZ1bmNBcmdzKVxuXG4gIC8vQ3JlYXRlIGF0dHJpYnV0ZSB3cmFwcGVyXG4gIHZhciBhdHRyID0gbmV3IFNoYWRlckF0dHJpYnV0ZShcbiAgICAgIGdsXG4gICAgLCB3cmFwcGVyXG4gICAgLCBpbmRleFxuICAgICwgbG9jYXRpb25zXG4gICAgLCBkaW1lbnNpb25cbiAgICAsIGNvbnN0RnVuYylcblxuICAvL0NyZWF0ZSBhY2Nlc3NvclxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgc2V0OiBmdW5jdGlvbih4KSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb25zW2luZGV4XSlcbiAgICAgIGNvbnN0RnVuYyhnbCwgbG9jYXRpb25zW2luZGV4XSwgeClcbiAgICAgIHJldHVybiB4XG4gICAgfVxuICAgICwgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBhdHRyXG4gICAgfVxuICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG5mdW5jdGlvbiBhZGRNYXRyaXhBdHRyaWJ1dGUoXG4gICAgZ2xcbiAgLCB3cmFwcGVyXG4gICwgaW5kZXhcbiAgLCBsb2NhdGlvbnNcbiAgLCBkaW1lbnNpb25cbiAgLCBvYmpcbiAgLCBuYW1lKSB7XG5cbiAgdmFyIHBhcnRzID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgdmFyIGF0dHJzID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBhZGRWZWN0b3JBdHRyaWJ1dGUoXG4gICAgICAgIGdsXG4gICAgICAsIHdyYXBwZXJcbiAgICAgICwgaW5kZXhbaV1cbiAgICAgICwgbG9jYXRpb25zXG4gICAgICAsIGRpbWVuc2lvblxuICAgICAgLCBwYXJ0c1xuICAgICAgLCBpKVxuICAgIGF0dHJzW2ldID0gcGFydHNbaV1cbiAgfVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwYXJ0cywgJ2xvY2F0aW9uJywge1xuICAgIHNldDogZnVuY3Rpb24odikge1xuICAgICAgaWYoQXJyYXkuaXNBcnJheSh2KSkge1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgICAgIGF0dHJzW2ldLmxvY2F0aW9uID0gdltpXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgICAgIGF0dHJzW2ldLmxvY2F0aW9uID0gdiArIGlcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHZcbiAgICB9XG4gICAgLCBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gICAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgICByZXN1bHRbaV0gPSBsb2NhdGlvbnNbaW5kZXhbaV1dXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0XG4gICAgfVxuICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICB9KVxuXG4gIHBhcnRzLnBvaW50ZXIgPSBmdW5jdGlvbih0eXBlLCBub3JtYWxpemVkLCBzdHJpZGUsIG9mZnNldCkge1xuICAgIHR5cGUgICAgICAgPSB0eXBlIHx8IGdsLkZMT0FUXG4gICAgbm9ybWFsaXplZCA9ICEhbm9ybWFsaXplZFxuICAgIHN0cmlkZSAgICAgPSBzdHJpZGUgfHwgKGRpbWVuc2lvbiAqIGRpbWVuc2lvbilcbiAgICBvZmZzZXQgICAgID0gb2Zmc2V0IHx8IDBcbiAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgdmFyIGxvY2F0aW9uID0gbG9jYXRpb25zW2luZGV4W2ldXVxuICAgICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihcbiAgICAgICAgICAgIGxvY2F0aW9uXG4gICAgICAgICAgLCBkaW1lbnNpb25cbiAgICAgICAgICAsIHR5cGVcbiAgICAgICAgICAsIG5vcm1hbGl6ZWRcbiAgICAgICAgICAsIHN0cmlkZVxuICAgICAgICAgICwgb2Zmc2V0ICsgaSAqIGRpbWVuc2lvbilcbiAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKVxuICAgIH1cbiAgfVxuXG4gIHZhciBzY3JhdGNoID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgdmFyIHZlcnRleEF0dHJpYiA9IGdsWyd2ZXJ0ZXhBdHRyaWInICsgZGltZW5zaW9uICsgJ2Z2J11cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBuYW1lLCB7XG4gICAgc2V0OiBmdW5jdGlvbih4KSB7XG4gICAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgICB2YXIgbG9jID0gbG9jYXRpb25zW2luZGV4W2ldXVxuICAgICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkobG9jKVxuICAgICAgICBpZihBcnJheS5pc0FycmF5KHhbMF0pKSB7XG4gICAgICAgICAgdmVydGV4QXR0cmliLmNhbGwoZ2wsIGxvYywgeFtpXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxkaW1lbnNpb247ICsraikge1xuICAgICAgICAgICAgc2NyYXRjaFtqXSA9IHhbZGltZW5zaW9uKmkgKyBqXVxuICAgICAgICAgIH1cbiAgICAgICAgICB2ZXJ0ZXhBdHRyaWIuY2FsbChnbCwgbG9jLCBzY3JhdGNoKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4geFxuICAgIH1cbiAgICAsIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gcGFydHNcbiAgICB9XG4gICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gIH0pXG59XG5cbi8vQ3JlYXRlIHNoaW1zIGZvciBhdHRyaWJ1dGVzXG5mdW5jdGlvbiBjcmVhdGVBdHRyaWJ1dGVXcmFwcGVyKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGF0dHJpYnV0ZXNcbiAgLCBsb2NhdGlvbnMpIHtcblxuICB2YXIgb2JqID0ge31cbiAgZm9yKHZhciBpPTAsIG49YXR0cmlidXRlcy5sZW5ndGg7IGk8bjsgKytpKSB7XG5cbiAgICB2YXIgYSA9IGF0dHJpYnV0ZXNbaV1cbiAgICB2YXIgbmFtZSA9IGEubmFtZVxuICAgIHZhciB0eXBlID0gYS50eXBlXG4gICAgdmFyIGxvY3MgPSBhLmxvY2F0aW9uc1xuXG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgY2FzZSAnaW50JzpcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgYWRkVmVjdG9yQXR0cmlidXRlKFxuICAgICAgICAgICAgZ2xcbiAgICAgICAgICAsIHdyYXBwZXJcbiAgICAgICAgICAsIGxvY3NbMF1cbiAgICAgICAgICAsIGxvY2F0aW9uc1xuICAgICAgICAgICwgMVxuICAgICAgICAgICwgb2JqXG4gICAgICAgICAgLCBuYW1lKVxuICAgICAgYnJlYWtcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYodHlwZS5pbmRleE9mKCd2ZWMnKSA+PSAwKSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlIGZvciBhdHRyaWJ1dGUgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkVmVjdG9yQXR0cmlidXRlKFxuICAgICAgICAgICAgICBnbFxuICAgICAgICAgICAgLCB3cmFwcGVyXG4gICAgICAgICAgICAsIGxvY3NbMF1cbiAgICAgICAgICAgICwgbG9jYXRpb25zXG4gICAgICAgICAgICAsIGRcbiAgICAgICAgICAgICwgb2JqXG4gICAgICAgICAgICAsIG5hbWUpXG4gICAgICAgIH0gZWxzZSBpZih0eXBlLmluZGV4T2YoJ21hdCcpID49IDApIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCBkYXRhIHR5cGUgZm9yIGF0dHJpYnV0ZSAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRNYXRyaXhBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIGdsXG4gICAgICAgICAgICAsIHdyYXBwZXJcbiAgICAgICAgICAgICwgbG9jc1xuICAgICAgICAgICAgLCBsb2NhdGlvbnNcbiAgICAgICAgICAgICwgZFxuICAgICAgICAgICAgLCBvYmpcbiAgICAgICAgICAgICwgbmFtZSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ1Vua25vd24gZGF0YSB0eXBlIGZvciBhdHRyaWJ1dGUgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9ialxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9jcmVhdGUtYXR0cmlidXRlcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5zaGFkZXIgICA9IGdldFNoYWRlclJlZmVyZW5jZVxuZXhwb3J0cy5wcm9ncmFtICA9IGNyZWF0ZVByb2dyYW1cblxudmFyIEdMRXJyb3IgPSByZXF1aXJlKFwiLi9HTEVycm9yXCIpXG52YXIgZm9ybWF0Q29tcGlsZXJFcnJvciA9IHJlcXVpcmUoJ2dsLWZvcm1hdC1jb21waWxlci1lcnJvcicpO1xuXG52YXIgd2Vha01hcCA9IHR5cGVvZiBXZWFrTWFwID09PSAndW5kZWZpbmVkJyA/IHJlcXVpcmUoJ3dlYWttYXAtc2hpbScpIDogV2Vha01hcFxudmFyIENBQ0hFID0gbmV3IHdlYWtNYXAoKVxuXG52YXIgU0hBREVSX0NPVU5URVIgPSAwXG5cbmZ1bmN0aW9uIFNoYWRlclJlZmVyZW5jZShpZCwgc3JjLCB0eXBlLCBzaGFkZXIsIHByb2dyYW1zLCBjb3VudCwgY2FjaGUpIHtcbiAgdGhpcy5pZCAgICAgICA9IGlkXG4gIHRoaXMuc3JjICAgICAgPSBzcmNcbiAgdGhpcy50eXBlICAgICA9IHR5cGVcbiAgdGhpcy5zaGFkZXIgICA9IHNoYWRlclxuICB0aGlzLmNvdW50ICAgID0gY291bnRcbiAgdGhpcy5wcm9ncmFtcyA9IFtdXG4gIHRoaXMuY2FjaGUgICAgPSBjYWNoZVxufVxuXG5TaGFkZXJSZWZlcmVuY2UucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgaWYoLS10aGlzLmNvdW50ID09PSAwKSB7XG4gICAgdmFyIGNhY2hlICAgID0gdGhpcy5jYWNoZVxuICAgIHZhciBnbCAgICAgICA9IGNhY2hlLmdsXG5cbiAgICAvL1JlbW92ZSBwcm9ncmFtIHJlZmVyZW5jZXNcbiAgICB2YXIgcHJvZ3JhbXMgPSB0aGlzLnByb2dyYW1zXG4gICAgZm9yKHZhciBpPTAsIG49cHJvZ3JhbXMubGVuZ3RoOyBpPG47ICsraSkge1xuICAgICAgdmFyIHAgPSBjYWNoZS5wcm9ncmFtc1twcm9ncmFtc1tpXV1cbiAgICAgIGlmKHApIHtcbiAgICAgICAgZGVsZXRlIGNhY2hlLnByb2dyYW1zW2ldXG4gICAgICAgIGdsLmRlbGV0ZVByb2dyYW0ocClcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvL1JlbW92ZSBzaGFkZXIgcmVmZXJlbmNlXG4gICAgZ2wuZGVsZXRlU2hhZGVyKHRoaXMuc2hhZGVyKVxuICAgIGRlbGV0ZSBjYWNoZS5zaGFkZXJzWyh0aGlzLnR5cGUgPT09IGdsLkZSQUdNRU5UX1NIQURFUil8MF1bdGhpcy5zcmNdXG4gIH1cbn1cblxuZnVuY3Rpb24gQ29udGV4dENhY2hlKGdsKSB7XG4gIHRoaXMuZ2wgICAgICAgPSBnbFxuICB0aGlzLnNoYWRlcnMgID0gW3t9LCB7fV1cbiAgdGhpcy5wcm9ncmFtcyA9IHt9XG59XG5cbnZhciBwcm90byA9IENvbnRleHRDYWNoZS5wcm90b3R5cGVcblxuZnVuY3Rpb24gY29tcGlsZVNoYWRlcihnbCwgdHlwZSwgc3JjKSB7XG4gIHZhciBzaGFkZXIgPSBnbC5jcmVhdGVTaGFkZXIodHlwZSlcbiAgZ2wuc2hhZGVyU291cmNlKHNoYWRlciwgc3JjKVxuICBnbC5jb21waWxlU2hhZGVyKHNoYWRlcilcbiAgaWYoIWdsLmdldFNoYWRlclBhcmFtZXRlcihzaGFkZXIsIGdsLkNPTVBJTEVfU1RBVFVTKSkge1xuICAgIHZhciBlcnJMb2cgPSBnbC5nZXRTaGFkZXJJbmZvTG9nKHNoYWRlcilcbiAgICB0cnkge1xuICAgICAgICB2YXIgZm10ID0gZm9ybWF0Q29tcGlsZXJFcnJvcihlcnJMb2csIHNyYywgdHlwZSk7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIGNvbnNvbGUud2FybignRmFpbGVkIHRvIGZvcm1hdCBjb21waWxlciBlcnJvcjogJyArIGUpO1xuICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcihlcnJMb2csICdFcnJvciBjb21waWxpbmcgc2hhZGVyOlxcbicgKyBlcnJMb2cpXG4gICAgfVxuICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgZm10LnNob3J0LCBmbXQubG9uZylcbiAgfVxuICByZXR1cm4gc2hhZGVyXG59XG5cbnByb3RvLmdldFNoYWRlclJlZmVyZW5jZSA9IGZ1bmN0aW9uKHR5cGUsIHNyYykge1xuICB2YXIgZ2wgICAgICA9IHRoaXMuZ2xcbiAgdmFyIHNoYWRlcnMgPSB0aGlzLnNoYWRlcnNbKHR5cGUgPT09IGdsLkZSQUdNRU5UX1NIQURFUil8MF1cbiAgdmFyIHNoYWRlciAgPSBzaGFkZXJzW3NyY11cbiAgaWYoIXNoYWRlciB8fCAhZ2wuaXNTaGFkZXIoc2hhZGVyLnNoYWRlcikpIHtcbiAgICB2YXIgc2hhZGVyT2JqID0gY29tcGlsZVNoYWRlcihnbCwgdHlwZSwgc3JjKVxuICAgIHNoYWRlciA9IHNoYWRlcnNbc3JjXSA9IG5ldyBTaGFkZXJSZWZlcmVuY2UoXG4gICAgICBTSEFERVJfQ09VTlRFUisrLFxuICAgICAgc3JjLFxuICAgICAgdHlwZSxcbiAgICAgIHNoYWRlck9iaixcbiAgICAgIFtdLFxuICAgICAgMSxcbiAgICAgIHRoaXMpXG4gIH0gZWxzZSB7XG4gICAgc2hhZGVyLmNvdW50ICs9IDFcbiAgfVxuICByZXR1cm4gc2hhZGVyXG59XG5cbmZ1bmN0aW9uIGxpbmtQcm9ncmFtKGdsLCB2c2hhZGVyLCBmc2hhZGVyLCBhdHRyaWJzLCBsb2NhdGlvbnMpIHtcbiAgdmFyIHByb2dyYW0gPSBnbC5jcmVhdGVQcm9ncmFtKClcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIHZzaGFkZXIpXG4gIGdsLmF0dGFjaFNoYWRlcihwcm9ncmFtLCBmc2hhZGVyKVxuICBmb3IodmFyIGk9MDsgaTxhdHRyaWJzLmxlbmd0aDsgKytpKSB7XG4gICAgZ2wuYmluZEF0dHJpYkxvY2F0aW9uKHByb2dyYW0sIGxvY2F0aW9uc1tpXSwgYXR0cmlic1tpXSlcbiAgfVxuICBnbC5saW5rUHJvZ3JhbShwcm9ncmFtKVxuICBpZighZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5MSU5LX1NUQVRVUykpIHtcbiAgICB2YXIgZXJyTG9nID0gZ2wuZ2V0UHJvZ3JhbUluZm9Mb2cocHJvZ3JhbSlcbiAgICB0aHJvdyBuZXcgR0xFcnJvcihlcnJMb2csICdFcnJvciBsaW5raW5nIHByb2dyYW06ICcgKyBlcnJMb2cpXG4gIH1cbiAgcmV0dXJuIHByb2dyYW1cbn1cblxucHJvdG8uZ2V0UHJvZ3JhbSA9IGZ1bmN0aW9uKHZyZWYsIGZyZWYsIGF0dHJpYnMsIGxvY2F0aW9ucykge1xuICB2YXIgdG9rZW4gPSBbdnJlZi5pZCwgZnJlZi5pZCwgYXR0cmlicy5qb2luKCc6JyksIGxvY2F0aW9ucy5qb2luKCc6JyldLmpvaW4oJ0AnKVxuICB2YXIgcHJvZyAgPSB0aGlzLnByb2dyYW1zW3Rva2VuXVxuICBpZighcHJvZyB8fCAhdGhpcy5nbC5pc1Byb2dyYW0ocHJvZykpIHtcbiAgICB0aGlzLnByb2dyYW1zW3Rva2VuXSA9IHByb2cgPSBsaW5rUHJvZ3JhbShcbiAgICAgIHRoaXMuZ2wsXG4gICAgICB2cmVmLnNoYWRlcixcbiAgICAgIGZyZWYuc2hhZGVyLFxuICAgICAgYXR0cmlicyxcbiAgICAgIGxvY2F0aW9ucylcbiAgICB2cmVmLnByb2dyYW1zLnB1c2godG9rZW4pXG4gICAgZnJlZi5wcm9ncmFtcy5wdXNoKHRva2VuKVxuICB9XG4gIHJldHVybiBwcm9nXG59XG5cbmZ1bmN0aW9uIGdldENhY2hlKGdsKSB7XG4gIHZhciBjdHhDYWNoZSA9IENBQ0hFLmdldChnbClcbiAgaWYoIWN0eENhY2hlKSB7XG4gICAgY3R4Q2FjaGUgPSBuZXcgQ29udGV4dENhY2hlKGdsKVxuICAgIENBQ0hFLnNldChnbCwgY3R4Q2FjaGUpXG4gIH1cbiAgcmV0dXJuIGN0eENhY2hlXG59XG5cbmZ1bmN0aW9uIGdldFNoYWRlclJlZmVyZW5jZShnbCwgdHlwZSwgc3JjKSB7XG4gIHJldHVybiBnZXRDYWNoZShnbCkuZ2V0U2hhZGVyUmVmZXJlbmNlKHR5cGUsIHNyYylcbn1cblxuZnVuY3Rpb24gY3JlYXRlUHJvZ3JhbShnbCwgdnJlZiwgZnJlZiwgYXR0cmlicywgbG9jYXRpb25zKSB7XG4gIHJldHVybiBnZXRDYWNoZShnbCkuZ2V0UHJvZ3JhbSh2cmVmLCBmcmVmLCBhdHRyaWJzLCBsb2NhdGlvbnMpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3NoYWRlci1jYWNoZS5qc1xuLy8gbW9kdWxlIGlkID0gMTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcbnZhciBzcHJpbnRmID0gcmVxdWlyZSgnc3ByaW50Zi1qcycpLnNwcmludGY7XG52YXIgZ2xDb25zdGFudHMgPSByZXF1aXJlKCdnbC1jb25zdGFudHMvbG9va3VwJyk7XG52YXIgc2hhZGVyTmFtZSA9IHJlcXVpcmUoJ2dsc2wtc2hhZGVyLW5hbWUnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJ2FkZC1saW5lLW51bWJlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXRDb21waWxlckVycm9yO1xuXG5mdW5jdGlvbiBmb3JtYXRDb21waWxlckVycm9yKGVyckxvZywgc3JjLCB0eXBlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgbmFtZSA9IHNoYWRlck5hbWUoc3JjKSB8fCAnb2YgdW5rbm93biBuYW1lIChzZWUgbnBtIGdsc2wtc2hhZGVyLW5hbWUpJztcblxuICAgIHZhciB0eXBlTmFtZSA9ICd1bmtub3duIHR5cGUnO1xuICAgIGlmICh0eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHlwZU5hbWUgPSB0eXBlID09PSBnbENvbnN0YW50cy5GUkFHTUVOVF9TSEFERVIgPyAnZnJhZ21lbnQnIDogJ3ZlcnRleCdcbiAgICB9XG5cbiAgICB2YXIgbG9uZ0Zvcm0gPSBzcHJpbnRmKCdFcnJvciBjb21waWxpbmcgJXMgc2hhZGVyICVzOlxcbicsIHR5cGVOYW1lLCBuYW1lKTtcbiAgICB2YXIgc2hvcnRGb3JtID0gc3ByaW50ZihcIiVzJXNcIiwgbG9uZ0Zvcm0sIGVyckxvZyk7XG5cbiAgICB2YXIgZXJyb3JTdHJpbmdzID0gZXJyTG9nLnNwbGl0KCdcXG4nKTtcbiAgICB2YXIgZXJyb3JzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yU3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3JTdHJpbmcgPSBlcnJvclN0cmluZ3NbaV07XG4gICAgICAgIGlmIChlcnJvclN0cmluZyA9PT0gJycgfHwgZXJyb3JTdHJpbmcgPT09IFwiXFwwXCIpIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbGluZU5vID0gcGFyc2VJbnQoZXJyb3JTdHJpbmcuc3BsaXQoJzonKVsyXSk7XG4gICAgICAgIGlmIChpc05hTihsaW5lTm8pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignQ291bGQgbm90IHBhcnNlIGVycm9yOiAlcycsIGVycm9yU3RyaW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JzW2xpbmVOb10gPSBlcnJvclN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgbGluZXMgPSBhZGRMaW5lTnVtYmVycyhzcmMpLnNwbGl0KCdcXG4nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcnJvcnNbaSszXSAmJiAhZXJyb3JzW2krMl0gJiYgIWVycm9yc1tpKzFdKSBjb250aW51ZTtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgbG9uZ0Zvcm0gKz0gbGluZSArICdcXG4nO1xuICAgICAgICBpZiAoZXJyb3JzW2krMV0pIHtcbiAgICAgICAgICAgIHZhciBlID0gZXJyb3JzW2krMV07XG4gICAgICAgICAgICBlID0gZS5zdWJzdHIoZS5zcGxpdCgnOicsIDMpLmpvaW4oJzonKS5sZW5ndGggKyAxKS50cmltKCk7XG4gICAgICAgICAgICBsb25nRm9ybSArPSBzcHJpbnRmKCdeXl4gJXNcXG5cXG4nLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxvbmc6IGxvbmdGb3JtLnRyaW0oKSxcbiAgICAgICAgc2hvcnQ6IHNob3J0Rm9ybS50cmltKClcbiAgICB9O1xufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1mb3JtYXQtY29tcGlsZXItZXJyb3IvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyogZ2xvYmFsIHdpbmRvdywgZXhwb3J0cywgZGVmaW5lICovXG5cbiFmdW5jdGlvbigpIHtcbiAgICAndXNlIHN0cmljdCdcblxuICAgIHZhciByZSA9IHtcbiAgICAgICAgbm90X3N0cmluZzogL1tec10vLFxuICAgICAgICBub3RfYm9vbDogL1tedF0vLFxuICAgICAgICBub3RfdHlwZTogL1teVF0vLFxuICAgICAgICBub3RfcHJpbWl0aXZlOiAvW152XS8sXG4gICAgICAgIG51bWJlcjogL1tkaWVmZ10vLFxuICAgICAgICBudW1lcmljX2FyZzogL1tiY2RpZWZndXhYXS8sXG4gICAgICAgIGpzb246IC9bal0vLFxuICAgICAgICBub3RfanNvbjogL1teal0vLFxuICAgICAgICB0ZXh0OiAvXlteXFx4MjVdKy8sXG4gICAgICAgIG1vZHVsbzogL15cXHgyNXsyfS8sXG4gICAgICAgIHBsYWNlaG9sZGVyOiAvXlxceDI1KD86KFsxLTldXFxkKilcXCR8XFwoKFteXFwpXSspXFwpKT8oXFwrKT8oMHwnW14kXSk/KC0pPyhcXGQrKT8oPzpcXC4oXFxkKykpPyhbYi1naWpvc3RUdXZ4WF0pLyxcbiAgICAgICAga2V5OiAvXihbYS16X11bYS16X1xcZF0qKS9pLFxuICAgICAgICBrZXlfYWNjZXNzOiAvXlxcLihbYS16X11bYS16X1xcZF0qKS9pLFxuICAgICAgICBpbmRleF9hY2Nlc3M6IC9eXFxbKFxcZCspXFxdLyxcbiAgICAgICAgc2lnbjogL15bXFwrXFwtXS9cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmKGtleSkge1xuICAgICAgICAvLyBgYXJndW1lbnRzYCBpcyBub3QgYW4gYXJyYXksIGJ1dCBzaG91bGQgYmUgZmluZSBmb3IgdGhpcyBjYWxsXG4gICAgICAgIHJldHVybiBzcHJpbnRmX2Zvcm1hdChzcHJpbnRmX3BhcnNlKGtleSksIGFyZ3VtZW50cylcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB2c3ByaW50ZihmbXQsIGFyZ3YpIHtcbiAgICAgICAgcmV0dXJuIHNwcmludGYuYXBwbHkobnVsbCwgW2ZtdF0uY29uY2F0KGFyZ3YgfHwgW10pKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwcmludGZfZm9ybWF0KHBhcnNlX3RyZWUsIGFyZ3YpIHtcbiAgICAgICAgdmFyIGN1cnNvciA9IDEsIHRyZWVfbGVuZ3RoID0gcGFyc2VfdHJlZS5sZW5ndGgsIGFyZywgb3V0cHV0ID0gJycsIGksIGssIG1hdGNoLCBwYWQsIHBhZF9jaGFyYWN0ZXIsIHBhZF9sZW5ndGgsIGlzX3Bvc2l0aXZlLCBzaWduXG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0cmVlX2xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHBhcnNlX3RyZWVbaV0gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgb3V0cHV0ICs9IHBhcnNlX3RyZWVbaV1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkocGFyc2VfdHJlZVtpXSkpIHtcbiAgICAgICAgICAgICAgICBtYXRjaCA9IHBhcnNlX3RyZWVbaV0gLy8gY29udmVuaWVuY2UgcHVycG9zZXMgb25seVxuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsyXSkgeyAvLyBrZXl3b3JkIGFyZ3VtZW50XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbY3Vyc29yXVxuICAgICAgICAgICAgICAgICAgICBmb3IgKGsgPSAwOyBrIDwgbWF0Y2hbMl0ubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghYXJnLmhhc093blByb3BlcnR5KG1hdGNoWzJdW2tdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzcHJpbnRmKCdbc3ByaW50Zl0gcHJvcGVydHkgXCIlc1wiIGRvZXMgbm90IGV4aXN0JywgbWF0Y2hbMl1ba10pKVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnW21hdGNoWzJdW2tdXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKG1hdGNoWzFdKSB7IC8vIHBvc2l0aW9uYWwgYXJndW1lbnQgKGV4cGxpY2l0KVxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd2W21hdGNoWzFdXVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHsgLy8gcG9zaXRpb25hbCBhcmd1bWVudCAoaW1wbGljaXQpXG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbY3Vyc29yKytdXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlLm5vdF90eXBlLnRlc3QobWF0Y2hbOF0pICYmIHJlLm5vdF9wcmltaXRpdmUudGVzdChtYXRjaFs4XSkgJiYgYXJnIGluc3RhbmNlb2YgRnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnKClcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubnVtZXJpY19hcmcudGVzdChtYXRjaFs4XSkgJiYgKHR5cGVvZiBhcmcgIT09ICdudW1iZXInICYmIGlzTmFOKGFyZykpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3Ioc3ByaW50ZignW3NwcmludGZdIGV4cGVjdGluZyBudW1iZXIgYnV0IGZvdW5kICVUJywgYXJnKSlcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubnVtYmVyLnRlc3QobWF0Y2hbOF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzX3Bvc2l0aXZlID0gYXJnID49IDBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKG1hdGNoWzhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2InOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMCkudG9TdHJpbmcoMilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gU3RyaW5nLmZyb21DaGFyQ29kZShwYXJzZUludChhcmcsIDEwKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2QnOlxuICAgICAgICAgICAgICAgICAgICBjYXNlICdpJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdqJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IEpTT04uc3RyaW5naWZ5KGFyZywgbnVsbCwgbWF0Y2hbNl0gPyBwYXJzZUludChtYXRjaFs2XSkgOiAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaFs3XSA/IHBhcnNlRmxvYXQoYXJnKS50b0V4cG9uZW50aWFsKG1hdGNoWzddKSA6IHBhcnNlRmxvYXQoYXJnKS50b0V4cG9uZW50aWFsKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gbWF0Y2hbN10gPyBwYXJzZUZsb2F0KGFyZykudG9GaXhlZChtYXRjaFs3XSkgOiBwYXJzZUZsb2F0KGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2cnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gbWF0Y2hbN10gPyBTdHJpbmcoTnVtYmVyKGFyZy50b1ByZWNpc2lvbihtYXRjaFs3XSkpKSA6IHBhcnNlRmxvYXQoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnbyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdzJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZyhhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gU3RyaW5nKCEhYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdUJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmcpLnNsaWNlKDgsIC0xKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMCkgPj4+IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnZhbHVlT2YoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChwYXJzZUludChhcmcsIDEwKSA+Pj4gMCkudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdYJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChwYXJzZUludChhcmcsIDEwKSA+Pj4gMCkudG9TdHJpbmcoMTYpLnRvVXBwZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyZS5qc29uLnRlc3QobWF0Y2hbOF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBhcmdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyZS5udW1iZXIudGVzdChtYXRjaFs4XSkgJiYgKCFpc19wb3NpdGl2ZSB8fCBtYXRjaFszXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSBpc19wb3NpdGl2ZSA/ICcrJyA6ICctJ1xuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJnLnRvU3RyaW5nKCkucmVwbGFjZShyZS5zaWduLCAnJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZ24gPSAnJ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHBhZF9jaGFyYWN0ZXIgPSBtYXRjaFs0XSA/IG1hdGNoWzRdID09PSAnMCcgPyAnMCcgOiBtYXRjaFs0XS5jaGFyQXQoMSkgOiAnICdcbiAgICAgICAgICAgICAgICAgICAgcGFkX2xlbmd0aCA9IG1hdGNoWzZdIC0gKHNpZ24gKyBhcmcpLmxlbmd0aFxuICAgICAgICAgICAgICAgICAgICBwYWQgPSBtYXRjaFs2XSA/IChwYWRfbGVuZ3RoID4gMCA/IHBhZF9jaGFyYWN0ZXIucmVwZWF0KHBhZF9sZW5ndGgpIDogJycpIDogJydcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IG1hdGNoWzVdID8gc2lnbiArIGFyZyArIHBhZCA6IChwYWRfY2hhcmFjdGVyID09PSAnMCcgPyBzaWduICsgcGFkICsgYXJnIDogcGFkICsgc2lnbiArIGFyZylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dFxuICAgIH1cblxuICAgIHZhciBzcHJpbnRmX2NhY2hlID0gT2JqZWN0LmNyZWF0ZShudWxsKVxuXG4gICAgZnVuY3Rpb24gc3ByaW50Zl9wYXJzZShmbXQpIHtcbiAgICAgICAgaWYgKHNwcmludGZfY2FjaGVbZm10XSkge1xuICAgICAgICAgICAgcmV0dXJuIHNwcmludGZfY2FjaGVbZm10XVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9mbXQgPSBmbXQsIG1hdGNoLCBwYXJzZV90cmVlID0gW10sIGFyZ19uYW1lcyA9IDBcbiAgICAgICAgd2hpbGUgKF9mbXQpIHtcbiAgICAgICAgICAgIGlmICgobWF0Y2ggPSByZS50ZXh0LmV4ZWMoX2ZtdCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VfdHJlZS5wdXNoKG1hdGNoWzBdKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG1hdGNoID0gcmUubW9kdWxvLmV4ZWMoX2ZtdCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcGFyc2VfdHJlZS5wdXNoKCclJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChtYXRjaCA9IHJlLnBsYWNlaG9sZGVyLmV4ZWMoX2ZtdCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzJdKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ19uYW1lcyB8PSAxXG4gICAgICAgICAgICAgICAgICAgIHZhciBmaWVsZF9saXN0ID0gW10sIHJlcGxhY2VtZW50X2ZpZWxkID0gbWF0Y2hbMl0sIGZpZWxkX21hdGNoID0gW11cbiAgICAgICAgICAgICAgICAgICAgaWYgKChmaWVsZF9tYXRjaCA9IHJlLmtleS5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHdoaWxlICgocmVwbGFjZW1lbnRfZmllbGQgPSByZXBsYWNlbWVudF9maWVsZC5zdWJzdHJpbmcoZmllbGRfbWF0Y2hbMF0ubGVuZ3RoKSkgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChmaWVsZF9tYXRjaCA9IHJlLmtleV9hY2Nlc3MuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoKGZpZWxkX21hdGNoID0gcmUuaW5kZXhfYWNjZXNzLmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9saXN0LnB1c2goZmllbGRfbWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1tzcHJpbnRmXSBmYWlsZWQgdG8gcGFyc2UgbmFtZWQgYXJndW1lbnQga2V5JylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1tzcHJpbnRmXSBmYWlsZWQgdG8gcGFyc2UgbmFtZWQgYXJndW1lbnQga2V5JylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBtYXRjaFsyXSA9IGZpZWxkX2xpc3RcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZ19uYW1lcyB8PSAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChhcmdfbmFtZXMgPT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdbc3ByaW50Zl0gbWl4aW5nIHBvc2l0aW9uYWwgYW5kIG5hbWVkIHBsYWNlaG9sZGVycyBpcyBub3QgKHlldCkgc3VwcG9ydGVkJylcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcGFyc2VfdHJlZS5wdXNoKG1hdGNoKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdbc3ByaW50Zl0gdW5leHBlY3RlZCBwbGFjZWhvbGRlcicpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfZm10ID0gX2ZtdC5zdWJzdHJpbmcobWF0Y2hbMF0ubGVuZ3RoKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzcHJpbnRmX2NhY2hlW2ZtdF0gPSBwYXJzZV90cmVlXG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogZXhwb3J0IHRvIGVpdGhlciBicm93c2VyIG9yIG5vZGUuanNcbiAgICAgKi9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBxdW90ZS1wcm9wcyAqL1xuICAgIGlmICh0eXBlb2YgZXhwb3J0cyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXhwb3J0c1snc3ByaW50ZiddID0gc3ByaW50ZlxuICAgICAgICBleHBvcnRzWyd2c3ByaW50ZiddID0gdnNwcmludGZcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHdpbmRvd1snc3ByaW50ZiddID0gc3ByaW50ZlxuICAgICAgICB3aW5kb3dbJ3ZzcHJpbnRmJ10gPSB2c3ByaW50ZlxuXG4gICAgICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZVsnYW1kJ10pIHtcbiAgICAgICAgICAgIGRlZmluZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICAnc3ByaW50Zic6IHNwcmludGYsXG4gICAgICAgICAgICAgICAgICAgICd2c3ByaW50Zic6IHZzcHJpbnRmXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKiBlc2xpbnQtZW5hYmxlIHF1b3RlLXByb3BzICovXG59KClcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3NwcmludGYtanMvc3JjL3NwcmludGYuanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGdsMTAgPSByZXF1aXJlKCcuLzEuMC9udW1iZXJzJylcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBsb29rdXBDb25zdGFudCAobnVtYmVyKSB7XG4gIHJldHVybiBnbDEwW251bWJlcl1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNvbnN0YW50cy9sb29rdXAuanNcbi8vIG1vZHVsZSBpZCA9IDIwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIDA6ICdOT05FJyxcbiAgMTogJ09ORScsXG4gIDI6ICdMSU5FX0xPT1AnLFxuICAzOiAnTElORV9TVFJJUCcsXG4gIDQ6ICdUUklBTkdMRVMnLFxuICA1OiAnVFJJQU5HTEVfU1RSSVAnLFxuICA2OiAnVFJJQU5HTEVfRkFOJyxcbiAgMjU2OiAnREVQVEhfQlVGRkVSX0JJVCcsXG4gIDUxMjogJ05FVkVSJyxcbiAgNTEzOiAnTEVTUycsXG4gIDUxNDogJ0VRVUFMJyxcbiAgNTE1OiAnTEVRVUFMJyxcbiAgNTE2OiAnR1JFQVRFUicsXG4gIDUxNzogJ05PVEVRVUFMJyxcbiAgNTE4OiAnR0VRVUFMJyxcbiAgNTE5OiAnQUxXQVlTJyxcbiAgNzY4OiAnU1JDX0NPTE9SJyxcbiAgNzY5OiAnT05FX01JTlVTX1NSQ19DT0xPUicsXG4gIDc3MDogJ1NSQ19BTFBIQScsXG4gIDc3MTogJ09ORV9NSU5VU19TUkNfQUxQSEEnLFxuICA3NzI6ICdEU1RfQUxQSEEnLFxuICA3NzM6ICdPTkVfTUlOVVNfRFNUX0FMUEhBJyxcbiAgNzc0OiAnRFNUX0NPTE9SJyxcbiAgNzc1OiAnT05FX01JTlVTX0RTVF9DT0xPUicsXG4gIDc3NjogJ1NSQ19BTFBIQV9TQVRVUkFURScsXG4gIDEwMjQ6ICdTVEVOQ0lMX0JVRkZFUl9CSVQnLFxuICAxMDI4OiAnRlJPTlQnLFxuICAxMDI5OiAnQkFDSycsXG4gIDEwMzI6ICdGUk9OVF9BTkRfQkFDSycsXG4gIDEyODA6ICdJTlZBTElEX0VOVU0nLFxuICAxMjgxOiAnSU5WQUxJRF9WQUxVRScsXG4gIDEyODI6ICdJTlZBTElEX09QRVJBVElPTicsXG4gIDEyODU6ICdPVVRfT0ZfTUVNT1JZJyxcbiAgMTI4NjogJ0lOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OJyxcbiAgMjMwNDogJ0NXJyxcbiAgMjMwNTogJ0NDVycsXG4gIDI4NDk6ICdMSU5FX1dJRFRIJyxcbiAgMjg4NDogJ0NVTExfRkFDRScsXG4gIDI4ODU6ICdDVUxMX0ZBQ0VfTU9ERScsXG4gIDI4ODY6ICdGUk9OVF9GQUNFJyxcbiAgMjkyODogJ0RFUFRIX1JBTkdFJyxcbiAgMjkyOTogJ0RFUFRIX1RFU1QnLFxuICAyOTMwOiAnREVQVEhfV1JJVEVNQVNLJyxcbiAgMjkzMTogJ0RFUFRIX0NMRUFSX1ZBTFVFJyxcbiAgMjkzMjogJ0RFUFRIX0ZVTkMnLFxuICAyOTYwOiAnU1RFTkNJTF9URVNUJyxcbiAgMjk2MTogJ1NURU5DSUxfQ0xFQVJfVkFMVUUnLFxuICAyOTYyOiAnU1RFTkNJTF9GVU5DJyxcbiAgMjk2MzogJ1NURU5DSUxfVkFMVUVfTUFTSycsXG4gIDI5NjQ6ICdTVEVOQ0lMX0ZBSUwnLFxuICAyOTY1OiAnU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUwnLFxuICAyOTY2OiAnU1RFTkNJTF9QQVNTX0RFUFRIX1BBU1MnLFxuICAyOTY3OiAnU1RFTkNJTF9SRUYnLFxuICAyOTY4OiAnU1RFTkNJTF9XUklURU1BU0snLFxuICAyOTc4OiAnVklFV1BPUlQnLFxuICAzMDI0OiAnRElUSEVSJyxcbiAgMzA0MjogJ0JMRU5EJyxcbiAgMzA4ODogJ1NDSVNTT1JfQk9YJyxcbiAgMzA4OTogJ1NDSVNTT1JfVEVTVCcsXG4gIDMxMDY6ICdDT0xPUl9DTEVBUl9WQUxVRScsXG4gIDMxMDc6ICdDT0xPUl9XUklURU1BU0snLFxuICAzMzE3OiAnVU5QQUNLX0FMSUdOTUVOVCcsXG4gIDMzMzM6ICdQQUNLX0FMSUdOTUVOVCcsXG4gIDMzNzk6ICdNQVhfVEVYVFVSRV9TSVpFJyxcbiAgMzM4NjogJ01BWF9WSUVXUE9SVF9ESU1TJyxcbiAgMzQwODogJ1NVQlBJWEVMX0JJVFMnLFxuICAzNDEwOiAnUkVEX0JJVFMnLFxuICAzNDExOiAnR1JFRU5fQklUUycsXG4gIDM0MTI6ICdCTFVFX0JJVFMnLFxuICAzNDEzOiAnQUxQSEFfQklUUycsXG4gIDM0MTQ6ICdERVBUSF9CSVRTJyxcbiAgMzQxNTogJ1NURU5DSUxfQklUUycsXG4gIDM1NTM6ICdURVhUVVJFXzJEJyxcbiAgNDM1MjogJ0RPTlRfQ0FSRScsXG4gIDQzNTM6ICdGQVNURVNUJyxcbiAgNDM1NDogJ05JQ0VTVCcsXG4gIDUxMjA6ICdCWVRFJyxcbiAgNTEyMTogJ1VOU0lHTkVEX0JZVEUnLFxuICA1MTIyOiAnU0hPUlQnLFxuICA1MTIzOiAnVU5TSUdORURfU0hPUlQnLFxuICA1MTI0OiAnSU5UJyxcbiAgNTEyNTogJ1VOU0lHTkVEX0lOVCcsXG4gIDUxMjY6ICdGTE9BVCcsXG4gIDUzODY6ICdJTlZFUlQnLFxuICA1ODkwOiAnVEVYVFVSRScsXG4gIDY0MDE6ICdTVEVOQ0lMX0lOREVYJyxcbiAgNjQwMjogJ0RFUFRIX0NPTVBPTkVOVCcsXG4gIDY0MDY6ICdBTFBIQScsXG4gIDY0MDc6ICdSR0InLFxuICA2NDA4OiAnUkdCQScsXG4gIDY0MDk6ICdMVU1JTkFOQ0UnLFxuICA2NDEwOiAnTFVNSU5BTkNFX0FMUEhBJyxcbiAgNzY4MDogJ0tFRVAnLFxuICA3NjgxOiAnUkVQTEFDRScsXG4gIDc2ODI6ICdJTkNSJyxcbiAgNzY4MzogJ0RFQ1InLFxuICA3OTM2OiAnVkVORE9SJyxcbiAgNzkzNzogJ1JFTkRFUkVSJyxcbiAgNzkzODogJ1ZFUlNJT04nLFxuICA5NzI4OiAnTkVBUkVTVCcsXG4gIDk3Mjk6ICdMSU5FQVInLFxuICA5OTg0OiAnTkVBUkVTVF9NSVBNQVBfTkVBUkVTVCcsXG4gIDk5ODU6ICdMSU5FQVJfTUlQTUFQX05FQVJFU1QnLFxuICA5OTg2OiAnTkVBUkVTVF9NSVBNQVBfTElORUFSJyxcbiAgOTk4NzogJ0xJTkVBUl9NSVBNQVBfTElORUFSJyxcbiAgMTAyNDA6ICdURVhUVVJFX01BR19GSUxURVInLFxuICAxMDI0MTogJ1RFWFRVUkVfTUlOX0ZJTFRFUicsXG4gIDEwMjQyOiAnVEVYVFVSRV9XUkFQX1MnLFxuICAxMDI0MzogJ1RFWFRVUkVfV1JBUF9UJyxcbiAgMTA0OTc6ICdSRVBFQVQnLFxuICAxMDc1MjogJ1BPTFlHT05fT0ZGU0VUX1VOSVRTJyxcbiAgMTYzODQ6ICdDT0xPUl9CVUZGRVJfQklUJyxcbiAgMzI3Njk6ICdDT05TVEFOVF9DT0xPUicsXG4gIDMyNzcwOiAnT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SJyxcbiAgMzI3NzE6ICdDT05TVEFOVF9BTFBIQScsXG4gIDMyNzcyOiAnT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBJyxcbiAgMzI3NzM6ICdCTEVORF9DT0xPUicsXG4gIDMyNzc0OiAnRlVOQ19BREQnLFxuICAzMjc3NzogJ0JMRU5EX0VRVUFUSU9OX1JHQicsXG4gIDMyNzc4OiAnRlVOQ19TVUJUUkFDVCcsXG4gIDMyNzc5OiAnRlVOQ19SRVZFUlNFX1NVQlRSQUNUJyxcbiAgMzI4MTk6ICdVTlNJR05FRF9TSE9SVF80XzRfNF80JyxcbiAgMzI4MjA6ICdVTlNJR05FRF9TSE9SVF81XzVfNV8xJyxcbiAgMzI4MjM6ICdQT0xZR09OX09GRlNFVF9GSUxMJyxcbiAgMzI4MjQ6ICdQT0xZR09OX09GRlNFVF9GQUNUT1InLFxuICAzMjg1NDogJ1JHQkE0JyxcbiAgMzI4NTU6ICdSR0I1X0ExJyxcbiAgMzI4NzM6ICdURVhUVVJFX0JJTkRJTkdfMkQnLFxuICAzMjkyNjogJ1NBTVBMRV9BTFBIQV9UT19DT1ZFUkFHRScsXG4gIDMyOTI4OiAnU0FNUExFX0NPVkVSQUdFJyxcbiAgMzI5MzY6ICdTQU1QTEVfQlVGRkVSUycsXG4gIDMyOTM3OiAnU0FNUExFUycsXG4gIDMyOTM4OiAnU0FNUExFX0NPVkVSQUdFX1ZBTFVFJyxcbiAgMzI5Mzk6ICdTQU1QTEVfQ09WRVJBR0VfSU5WRVJUJyxcbiAgMzI5Njg6ICdCTEVORF9EU1RfUkdCJyxcbiAgMzI5Njk6ICdCTEVORF9TUkNfUkdCJyxcbiAgMzI5NzA6ICdCTEVORF9EU1RfQUxQSEEnLFxuICAzMjk3MTogJ0JMRU5EX1NSQ19BTFBIQScsXG4gIDMzMDcxOiAnQ0xBTVBfVE9fRURHRScsXG4gIDMzMTcwOiAnR0VORVJBVEVfTUlQTUFQX0hJTlQnLFxuICAzMzE4OTogJ0RFUFRIX0NPTVBPTkVOVDE2JyxcbiAgMzMzMDY6ICdERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQnLFxuICAzMzYzNTogJ1VOU0lHTkVEX1NIT1JUXzVfNl81JyxcbiAgMzM2NDg6ICdNSVJST1JFRF9SRVBFQVQnLFxuICAzMzkwMTogJ0FMSUFTRURfUE9JTlRfU0laRV9SQU5HRScsXG4gIDMzOTAyOiAnQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFJyxcbiAgMzM5ODQ6ICdURVhUVVJFMCcsXG4gIDMzOTg1OiAnVEVYVFVSRTEnLFxuICAzMzk4NjogJ1RFWFRVUkUyJyxcbiAgMzM5ODc6ICdURVhUVVJFMycsXG4gIDMzOTg4OiAnVEVYVFVSRTQnLFxuICAzMzk4OTogJ1RFWFRVUkU1JyxcbiAgMzM5OTA6ICdURVhUVVJFNicsXG4gIDMzOTkxOiAnVEVYVFVSRTcnLFxuICAzMzk5MjogJ1RFWFRVUkU4JyxcbiAgMzM5OTM6ICdURVhUVVJFOScsXG4gIDMzOTk0OiAnVEVYVFVSRTEwJyxcbiAgMzM5OTU6ICdURVhUVVJFMTEnLFxuICAzMzk5NjogJ1RFWFRVUkUxMicsXG4gIDMzOTk3OiAnVEVYVFVSRTEzJyxcbiAgMzM5OTg6ICdURVhUVVJFMTQnLFxuICAzMzk5OTogJ1RFWFRVUkUxNScsXG4gIDM0MDAwOiAnVEVYVFVSRTE2JyxcbiAgMzQwMDE6ICdURVhUVVJFMTcnLFxuICAzNDAwMjogJ1RFWFRVUkUxOCcsXG4gIDM0MDAzOiAnVEVYVFVSRTE5JyxcbiAgMzQwMDQ6ICdURVhUVVJFMjAnLFxuICAzNDAwNTogJ1RFWFRVUkUyMScsXG4gIDM0MDA2OiAnVEVYVFVSRTIyJyxcbiAgMzQwMDc6ICdURVhUVVJFMjMnLFxuICAzNDAwODogJ1RFWFRVUkUyNCcsXG4gIDM0MDA5OiAnVEVYVFVSRTI1JyxcbiAgMzQwMTA6ICdURVhUVVJFMjYnLFxuICAzNDAxMTogJ1RFWFRVUkUyNycsXG4gIDM0MDEyOiAnVEVYVFVSRTI4JyxcbiAgMzQwMTM6ICdURVhUVVJFMjknLFxuICAzNDAxNDogJ1RFWFRVUkUzMCcsXG4gIDM0MDE1OiAnVEVYVFVSRTMxJyxcbiAgMzQwMTY6ICdBQ1RJVkVfVEVYVFVSRScsXG4gIDM0MDI0OiAnTUFYX1JFTkRFUkJVRkZFUl9TSVpFJyxcbiAgMzQwNDE6ICdERVBUSF9TVEVOQ0lMJyxcbiAgMzQwNTU6ICdJTkNSX1dSQVAnLFxuICAzNDA1NjogJ0RFQ1JfV1JBUCcsXG4gIDM0MDY3OiAnVEVYVFVSRV9DVUJFX01BUCcsXG4gIDM0MDY4OiAnVEVYVFVSRV9CSU5ESU5HX0NVQkVfTUFQJyxcbiAgMzQwNjk6ICdURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1gnLFxuICAzNDA3MDogJ1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCcsXG4gIDM0MDcxOiAnVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9ZJyxcbiAgMzQwNzI6ICdURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1knLFxuICAzNDA3MzogJ1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWicsXG4gIDM0MDc0OiAnVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aJyxcbiAgMzQwNzY6ICdNQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFJyxcbiAgMzQzMzg6ICdWRVJURVhfQVRUUklCX0FSUkFZX0VOQUJMRUQnLFxuICAzNDMzOTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRScsXG4gIDM0MzQwOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUnLFxuICAzNDM0MTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfVFlQRScsXG4gIDM0MzQyOiAnQ1VSUkVOVF9WRVJURVhfQVRUUklCJyxcbiAgMzQzNzM6ICdWRVJURVhfQVRUUklCX0FSUkFZX1BPSU5URVInLFxuICAzNDQ2NjogJ05VTV9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUycsXG4gIDM0NDY3OiAnQ09NUFJFU1NFRF9URVhUVVJFX0ZPUk1BVFMnLFxuICAzNDY2MDogJ0JVRkZFUl9TSVpFJyxcbiAgMzQ2NjE6ICdCVUZGRVJfVVNBR0UnLFxuICAzNDgxNjogJ1NURU5DSUxfQkFDS19GVU5DJyxcbiAgMzQ4MTc6ICdTVEVOQ0lMX0JBQ0tfRkFJTCcsXG4gIDM0ODE4OiAnU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfRkFJTCcsXG4gIDM0ODE5OiAnU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfUEFTUycsXG4gIDM0ODc3OiAnQkxFTkRfRVFVQVRJT05fQUxQSEEnLFxuICAzNDkyMTogJ01BWF9WRVJURVhfQVRUUklCUycsXG4gIDM0OTIyOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEJyxcbiAgMzQ5MzA6ICdNQVhfVEVYVFVSRV9JTUFHRV9VTklUUycsXG4gIDM0OTYyOiAnQVJSQVlfQlVGRkVSJyxcbiAgMzQ5NjM6ICdFTEVNRU5UX0FSUkFZX0JVRkZFUicsXG4gIDM0OTY0OiAnQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNDk2NTogJ0VMRU1FTlRfQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNDk3NTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNTA0MDogJ1NUUkVBTV9EUkFXJyxcbiAgMzUwNDQ6ICdTVEFUSUNfRFJBVycsXG4gIDM1MDQ4OiAnRFlOQU1JQ19EUkFXJyxcbiAgMzU2MzI6ICdGUkFHTUVOVF9TSEFERVInLFxuICAzNTYzMzogJ1ZFUlRFWF9TSEFERVInLFxuICAzNTY2MDogJ01BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUycsXG4gIDM1NjYxOiAnTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMnLFxuICAzNTY2MzogJ1NIQURFUl9UWVBFJyxcbiAgMzU2NjQ6ICdGTE9BVF9WRUMyJyxcbiAgMzU2NjU6ICdGTE9BVF9WRUMzJyxcbiAgMzU2NjY6ICdGTE9BVF9WRUM0JyxcbiAgMzU2Njc6ICdJTlRfVkVDMicsXG4gIDM1NjY4OiAnSU5UX1ZFQzMnLFxuICAzNTY2OTogJ0lOVF9WRUM0JyxcbiAgMzU2NzA6ICdCT09MJyxcbiAgMzU2NzE6ICdCT09MX1ZFQzInLFxuICAzNTY3MjogJ0JPT0xfVkVDMycsXG4gIDM1NjczOiAnQk9PTF9WRUM0JyxcbiAgMzU2NzQ6ICdGTE9BVF9NQVQyJyxcbiAgMzU2NzU6ICdGTE9BVF9NQVQzJyxcbiAgMzU2NzY6ICdGTE9BVF9NQVQ0JyxcbiAgMzU2Nzg6ICdTQU1QTEVSXzJEJyxcbiAgMzU2ODA6ICdTQU1QTEVSX0NVQkUnLFxuICAzNTcxMjogJ0RFTEVURV9TVEFUVVMnLFxuICAzNTcxMzogJ0NPTVBJTEVfU1RBVFVTJyxcbiAgMzU3MTQ6ICdMSU5LX1NUQVRVUycsXG4gIDM1NzE1OiAnVkFMSURBVEVfU1RBVFVTJyxcbiAgMzU3MTY6ICdJTkZPX0xPR19MRU5HVEgnLFxuICAzNTcxNzogJ0FUVEFDSEVEX1NIQURFUlMnLFxuICAzNTcxODogJ0FDVElWRV9VTklGT1JNUycsXG4gIDM1NzE5OiAnQUNUSVZFX1VOSUZPUk1fTUFYX0xFTkdUSCcsXG4gIDM1NzIwOiAnU0hBREVSX1NPVVJDRV9MRU5HVEgnLFxuICAzNTcyMTogJ0FDVElWRV9BVFRSSUJVVEVTJyxcbiAgMzU3MjI6ICdBQ1RJVkVfQVRUUklCVVRFX01BWF9MRU5HVEgnLFxuICAzNTcyNDogJ1NIQURJTkdfTEFOR1VBR0VfVkVSU0lPTicsXG4gIDM1NzI1OiAnQ1VSUkVOVF9QUk9HUkFNJyxcbiAgMzYwMDM6ICdTVEVOQ0lMX0JBQ0tfUkVGJyxcbiAgMzYwMDQ6ICdTVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSycsXG4gIDM2MDA1OiAnU1RFTkNJTF9CQUNLX1dSSVRFTUFTSycsXG4gIDM2MDA2OiAnRlJBTUVCVUZGRVJfQklORElORycsXG4gIDM2MDA3OiAnUkVOREVSQlVGRkVSX0JJTkRJTkcnLFxuICAzNjA0ODogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX1RZUEUnLFxuICAzNjA0OTogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX05BTUUnLFxuICAzNjA1MDogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCcsXG4gIDM2MDUxOiAnRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UnLFxuICAzNjA1MzogJ0ZSQU1FQlVGRkVSX0NPTVBMRVRFJyxcbiAgMzYwNTQ6ICdGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQnLFxuICAzNjA1NTogJ0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UJyxcbiAgMzYwNTc6ICdGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0RJTUVOU0lPTlMnLFxuICAzNjA2MTogJ0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEJyxcbiAgMzYwNjQ6ICdDT0xPUl9BVFRBQ0hNRU5UMCcsXG4gIDM2MDk2OiAnREVQVEhfQVRUQUNITUVOVCcsXG4gIDM2MTI4OiAnU1RFTkNJTF9BVFRBQ0hNRU5UJyxcbiAgMzYxNjA6ICdGUkFNRUJVRkZFUicsXG4gIDM2MTYxOiAnUkVOREVSQlVGRkVSJyxcbiAgMzYxNjI6ICdSRU5ERVJCVUZGRVJfV0lEVEgnLFxuICAzNjE2MzogJ1JFTkRFUkJVRkZFUl9IRUlHSFQnLFxuICAzNjE2NDogJ1JFTkRFUkJVRkZFUl9JTlRFUk5BTF9GT1JNQVQnLFxuICAzNjE2ODogJ1NURU5DSUxfSU5ERVg4JyxcbiAgMzYxNzY6ICdSRU5ERVJCVUZGRVJfUkVEX1NJWkUnLFxuICAzNjE3NzogJ1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFJyxcbiAgMzYxNzg6ICdSRU5ERVJCVUZGRVJfQkxVRV9TSVpFJyxcbiAgMzYxNzk6ICdSRU5ERVJCVUZGRVJfQUxQSEFfU0laRScsXG4gIDM2MTgwOiAnUkVOREVSQlVGRkVSX0RFUFRIX1NJWkUnLFxuICAzNjE4MTogJ1JFTkRFUkJVRkZFUl9TVEVOQ0lMX1NJWkUnLFxuICAzNjE5NDogJ1JHQjU2NScsXG4gIDM2MzM2OiAnTE9XX0ZMT0FUJyxcbiAgMzYzMzc6ICdNRURJVU1fRkxPQVQnLFxuICAzNjMzODogJ0hJR0hfRkxPQVQnLFxuICAzNjMzOTogJ0xPV19JTlQnLFxuICAzNjM0MDogJ01FRElVTV9JTlQnLFxuICAzNjM0MTogJ0hJR0hfSU5UJyxcbiAgMzYzNDY6ICdTSEFERVJfQ09NUElMRVInLFxuICAzNjM0NzogJ01BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTJyxcbiAgMzYzNDg6ICdNQVhfVkFSWUlOR19WRUNUT1JTJyxcbiAgMzYzNDk6ICdNQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTJyxcbiAgMzc0NDA6ICdVTlBBQ0tfRkxJUF9ZX1dFQkdMJyxcbiAgMzc0NDE6ICdVTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wnLFxuICAzNzQ0MjogJ0NPTlRFWFRfTE9TVF9XRUJHTCcsXG4gIDM3NDQzOiAnVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCcsXG4gIDM3NDQ0OiAnQlJPV1NFUl9ERUZBVUxUX1dFQkdMJ1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzLzEuMC9udW1iZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB0b2tlbml6ZSA9IHJlcXVpcmUoJ2dsc2wtdG9rZW5pemVyJylcbnZhciBhdG9iICAgICA9IHJlcXVpcmUoJ2F0b2ItbGl0ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZ2V0TmFtZVxuXG5mdW5jdGlvbiBnZXROYW1lKHNyYykge1xuICB2YXIgdG9rZW5zID0gQXJyYXkuaXNBcnJheShzcmMpXG4gICAgPyBzcmNcbiAgICA6IHRva2VuaXplKHNyYylcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIHZhciB0b2tlbiA9IHRva2Vuc1tpXVxuICAgIGlmICh0b2tlbi50eXBlICE9PSAncHJlcHJvY2Vzc29yJykgY29udGludWVcbiAgICB2YXIgbWF0Y2ggPSB0b2tlbi5kYXRhLm1hdGNoKC9cXCNkZWZpbmVcXHMrU0hBREVSX05BTUUoX0I2NCk/XFxzKyguKykkLylcbiAgICBpZiAoIW1hdGNoKSBjb250aW51ZVxuICAgIGlmICghbWF0Y2hbMl0pIGNvbnRpbnVlXG5cbiAgICB2YXIgYjY0ICA9IG1hdGNoWzFdXG4gICAgdmFyIG5hbWUgPSBtYXRjaFsyXVxuXG4gICAgcmV0dXJuIChiNjQgPyBhdG9iKG5hbWUpIDogbmFtZSkudHJpbSgpXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtc2hhZGVyLW5hbWUvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDIyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRva2VuaXplID0gcmVxdWlyZSgnLi9pbmRleCcpXG5cbm1vZHVsZS5leHBvcnRzID0gdG9rZW5pemVTdHJpbmdcblxuZnVuY3Rpb24gdG9rZW5pemVTdHJpbmcoc3RyLCBvcHQpIHtcbiAgdmFyIGdlbmVyYXRvciA9IHRva2VuaXplKG9wdClcbiAgdmFyIHRva2VucyA9IFtdXG5cbiAgdG9rZW5zID0gdG9rZW5zLmNvbmNhdChnZW5lcmF0b3Ioc3RyKSlcbiAgdG9rZW5zID0gdG9rZW5zLmNvbmNhdChnZW5lcmF0b3IobnVsbCkpXG5cbiAgcmV0dXJuIHRva2Vuc1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvc3RyaW5nLmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gdG9rZW5pemVcblxudmFyIGxpdGVyYWxzMTAwID0gcmVxdWlyZSgnLi9saWIvbGl0ZXJhbHMnKVxuICAsIG9wZXJhdG9ycyA9IHJlcXVpcmUoJy4vbGliL29wZXJhdG9ycycpXG4gICwgYnVpbHRpbnMxMDAgPSByZXF1aXJlKCcuL2xpYi9idWlsdGlucycpXG4gICwgbGl0ZXJhbHMzMDBlcyA9IHJlcXVpcmUoJy4vbGliL2xpdGVyYWxzLTMwMGVzJylcbiAgLCBidWlsdGluczMwMGVzID0gcmVxdWlyZSgnLi9saWIvYnVpbHRpbnMtMzAwZXMnKVxuXG52YXIgTk9STUFMID0gOTk5ICAgICAgICAgIC8vIDwtLSBuZXZlciBlbWl0dGVkXG4gICwgVE9LRU4gPSA5OTk5ICAgICAgICAgIC8vIDwtLSBuZXZlciBlbWl0dGVkXG4gICwgQkxPQ0tfQ09NTUVOVCA9IDBcbiAgLCBMSU5FX0NPTU1FTlQgPSAxXG4gICwgUFJFUFJPQ0VTU09SID0gMlxuICAsIE9QRVJBVE9SID0gM1xuICAsIElOVEVHRVIgPSA0XG4gICwgRkxPQVQgPSA1XG4gICwgSURFTlQgPSA2XG4gICwgQlVJTFRJTiA9IDdcbiAgLCBLRVlXT1JEID0gOFxuICAsIFdISVRFU1BBQ0UgPSA5XG4gICwgRU9GID0gMTBcbiAgLCBIRVggPSAxMVxuXG52YXIgbWFwID0gW1xuICAgICdibG9jay1jb21tZW50J1xuICAsICdsaW5lLWNvbW1lbnQnXG4gICwgJ3ByZXByb2Nlc3NvcidcbiAgLCAnb3BlcmF0b3InXG4gICwgJ2ludGVnZXInXG4gICwgJ2Zsb2F0J1xuICAsICdpZGVudCdcbiAgLCAnYnVpbHRpbidcbiAgLCAna2V5d29yZCdcbiAgLCAnd2hpdGVzcGFjZSdcbiAgLCAnZW9mJ1xuICAsICdpbnRlZ2VyJ1xuXVxuXG5mdW5jdGlvbiB0b2tlbml6ZShvcHQpIHtcbiAgdmFyIGkgPSAwXG4gICAgLCB0b3RhbCA9IDBcbiAgICAsIG1vZGUgPSBOT1JNQUxcbiAgICAsIGNcbiAgICAsIGxhc3RcbiAgICAsIGNvbnRlbnQgPSBbXVxuICAgICwgdG9rZW5zID0gW11cbiAgICAsIHRva2VuX2lkeCA9IDBcbiAgICAsIHRva2VuX29mZnMgPSAwXG4gICAgLCBsaW5lID0gMVxuICAgICwgY29sID0gMFxuICAgICwgc3RhcnQgPSAwXG4gICAgLCBpc251bSA9IGZhbHNlXG4gICAgLCBpc29wZXJhdG9yID0gZmFsc2VcbiAgICAsIGlucHV0ID0gJydcbiAgICAsIGxlblxuXG4gIG9wdCA9IG9wdCB8fCB7fVxuICB2YXIgYWxsQnVpbHRpbnMgPSBidWlsdGluczEwMFxuICB2YXIgYWxsTGl0ZXJhbHMgPSBsaXRlcmFsczEwMFxuICBpZiAob3B0LnZlcnNpb24gPT09ICczMDAgZXMnKSB7XG4gICAgYWxsQnVpbHRpbnMgPSBidWlsdGluczMwMGVzXG4gICAgYWxsTGl0ZXJhbHMgPSBsaXRlcmFsczMwMGVzXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRva2VucyA9IFtdXG4gICAgaWYgKGRhdGEgIT09IG51bGwpIHJldHVybiB3cml0ZShkYXRhLnJlcGxhY2UgPyBkYXRhLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykgOiBkYXRhKVxuICAgIHJldHVybiBlbmQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9rZW4oZGF0YSkge1xuICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBtYXBbbW9kZV1cbiAgICAgICwgZGF0YTogZGF0YVxuICAgICAgLCBwb3NpdGlvbjogc3RhcnRcbiAgICAgICwgbGluZTogbGluZVxuICAgICAgLCBjb2x1bW46IGNvbFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZShjaHVuaykge1xuICAgIGkgPSAwXG4gICAgaW5wdXQgKz0gY2h1bmtcbiAgICBsZW4gPSBpbnB1dC5sZW5ndGhcblxuICAgIHZhciBsYXN0XG5cbiAgICB3aGlsZShjID0gaW5wdXRbaV0sIGkgPCBsZW4pIHtcbiAgICAgIGxhc3QgPSBpXG5cbiAgICAgIHN3aXRjaChtb2RlKSB7XG4gICAgICAgIGNhc2UgQkxPQ0tfQ09NTUVOVDogaSA9IGJsb2NrX2NvbW1lbnQoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBMSU5FX0NPTU1FTlQ6IGkgPSBsaW5lX2NvbW1lbnQoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBQUkVQUk9DRVNTT1I6IGkgPSBwcmVwcm9jZXNzb3IoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBPUEVSQVRPUjogaSA9IG9wZXJhdG9yKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgSU5URUdFUjogaSA9IGludGVnZXIoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBIRVg6IGkgPSBoZXgoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBGTE9BVDogaSA9IGRlY2ltYWwoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBUT0tFTjogaSA9IHJlYWR0b2tlbigpOyBicmVha1xuICAgICAgICBjYXNlIFdISVRFU1BBQ0U6IGkgPSB3aGl0ZXNwYWNlKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgTk9STUFMOiBpID0gbm9ybWFsKCk7IGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGlmKGxhc3QgIT09IGkpIHtcbiAgICAgICAgc3dpdGNoKGlucHV0W2xhc3RdKSB7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sID0gMDsgKytsaW5lOyBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6ICsrY29sOyBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdG90YWwgKz0gaVxuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoaSlcbiAgICByZXR1cm4gdG9rZW5zXG4gIH1cblxuICBmdW5jdGlvbiBlbmQoY2h1bmspIHtcbiAgICBpZihjb250ZW50Lmxlbmd0aCkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICB9XG5cbiAgICBtb2RlID0gRU9GXG4gICAgdG9rZW4oJyhlb2YpJylcbiAgICByZXR1cm4gdG9rZW5zXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWwoKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQubGVuZ3RoID8gW10gOiBjb250ZW50XG5cbiAgICBpZihsYXN0ID09PSAnLycgJiYgYyA9PT0gJyonKSB7XG4gICAgICBzdGFydCA9IHRvdGFsICsgaSAtIDFcbiAgICAgIG1vZGUgPSBCTE9DS19DT01NRU5UXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYobGFzdCA9PT0gJy8nICYmIGMgPT09ICcvJykge1xuICAgICAgc3RhcnQgPSB0b3RhbCArIGkgLSAxXG4gICAgICBtb2RlID0gTElORV9DT01NRU5UXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJyMnKSB7XG4gICAgICBtb2RlID0gUFJFUFJPQ0VTU09SXG4gICAgICBzdGFydCA9IHRvdGFsICsgaVxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZigvXFxzLy50ZXN0KGMpKSB7XG4gICAgICBtb2RlID0gV0hJVEVTUEFDRVxuICAgICAgc3RhcnQgPSB0b3RhbCArIGlcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaXNudW0gPSAvXFxkLy50ZXN0KGMpXG4gICAgaXNvcGVyYXRvciA9IC9bXlxcd19dLy50ZXN0KGMpXG5cbiAgICBzdGFydCA9IHRvdGFsICsgaVxuICAgIG1vZGUgPSBpc251bSA/IElOVEVHRVIgOiBpc29wZXJhdG9yID8gT1BFUkFUT1IgOiBUT0tFTlxuICAgIHJldHVybiBpXG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGlmKC9bXlxcc10vZy50ZXN0KGMpKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXByb2Nlc3NvcigpIHtcbiAgICBpZigoYyA9PT0gJ1xccicgfHwgYyA9PT0gJ1xcbicpICYmIGxhc3QgIT09ICdcXFxcJykge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBsaW5lX2NvbW1lbnQoKSB7XG4gICAgcmV0dXJuIHByZXByb2Nlc3NvcigpXG4gIH1cblxuICBmdW5jdGlvbiBibG9ja19jb21tZW50KCkge1xuICAgIGlmKGMgPT09ICcvJyAmJiBsYXN0ID09PSAnKicpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBvcGVyYXRvcigpIHtcbiAgICBpZihsYXN0ID09PSAnLicgJiYgL1xcZC8udGVzdChjKSkge1xuICAgICAgbW9kZSA9IEZMT0FUXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnKicpIHtcbiAgICAgIG1vZGUgPSBCTE9DS19DT01NRU5UXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnLycpIHtcbiAgICAgIG1vZGUgPSBMSU5FX0NPTU1FTlRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJy4nICYmIGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICB3aGlsZShkZXRlcm1pbmVfb3BlcmF0b3IoY29udGVudCkpO1xuXG4gICAgICBtb2RlID0gRkxPQVRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJzsnIHx8IGMgPT09ICcpJyB8fCBjID09PSAnKCcpIHtcbiAgICAgIGlmKGNvbnRlbnQubGVuZ3RoKSB3aGlsZShkZXRlcm1pbmVfb3BlcmF0b3IoY29udGVudCkpO1xuICAgICAgdG9rZW4oYylcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIHZhciBpc19jb21wb3NpdGVfb3BlcmF0b3IgPSBjb250ZW50Lmxlbmd0aCA9PT0gMiAmJiBjICE9PSAnPSdcbiAgICBpZigvW1xcd19cXGRcXHNdLy50ZXN0KGMpIHx8IGlzX2NvbXBvc2l0ZV9vcGVyYXRvcikge1xuICAgICAgd2hpbGUoZGV0ZXJtaW5lX29wZXJhdG9yKGNvbnRlbnQpKTtcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGRldGVybWluZV9vcGVyYXRvcihidWYpIHtcbiAgICB2YXIgaiA9IDBcbiAgICAgICwgaWR4XG4gICAgICAsIHJlc1xuXG4gICAgZG8ge1xuICAgICAgaWR4ID0gb3BlcmF0b3JzLmluZGV4T2YoYnVmLnNsaWNlKDAsIGJ1Zi5sZW5ndGggKyBqKS5qb2luKCcnKSlcbiAgICAgIHJlcyA9IG9wZXJhdG9yc1tpZHhdXG5cbiAgICAgIGlmKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgaWYoai0tICsgYnVmLmxlbmd0aCA+IDApIGNvbnRpbnVlXG4gICAgICAgIHJlcyA9IGJ1Zi5zbGljZSgwLCAxKS5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICB0b2tlbihyZXMpXG5cbiAgICAgIHN0YXJ0ICs9IHJlcy5sZW5ndGhcbiAgICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKHJlcy5sZW5ndGgpXG4gICAgICByZXR1cm4gY29udGVudC5sZW5ndGhcbiAgICB9IHdoaWxlKDEpXG4gIH1cblxuICBmdW5jdGlvbiBoZXgoKSB7XG4gICAgaWYoL1teYS1mQS1GMC05XS8udGVzdChjKSkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVnZXIoKSB7XG4gICAgaWYoYyA9PT0gJy4nKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bZUVdLy50ZXN0KGMpKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKGMgPT09ICd4JyAmJiBjb250ZW50Lmxlbmd0aCA9PT0gMSAmJiBjb250ZW50WzBdID09PSAnMCcpIHtcbiAgICAgIG1vZGUgPSBIRVhcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bXlxcZF0vLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBkZWNpbWFsKCkge1xuICAgIGlmKGMgPT09ICdmJykge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBsYXN0ID0gY1xuICAgICAgaSArPSAxXG4gICAgfVxuXG4gICAgaWYoL1tlRV0vLnRlc3QoYykpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmIChjID09PSAnLScgJiYgL1tlRV0vLnRlc3QobGFzdCkpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bXlxcZF0vLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiByZWFkdG9rZW4oKSB7XG4gICAgaWYoL1teXFxkXFx3X10vLnRlc3QoYykpIHtcbiAgICAgIHZhciBjb250ZW50c3RyID0gY29udGVudC5qb2luKCcnKVxuICAgICAgaWYoYWxsTGl0ZXJhbHMuaW5kZXhPZihjb250ZW50c3RyKSA+IC0xKSB7XG4gICAgICAgIG1vZGUgPSBLRVlXT1JEXG4gICAgICB9IGVsc2UgaWYoYWxsQnVpbHRpbnMuaW5kZXhPZihjb250ZW50c3RyKSA+IC0xKSB7XG4gICAgICAgIG1vZGUgPSBCVUlMVElOXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlID0gSURFTlRcbiAgICAgIH1cbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgICAnPDw9J1xuICAsICc+Pj0nXG4gICwgJysrJ1xuICAsICctLSdcbiAgLCAnPDwnXG4gICwgJz4+J1xuICAsICc8PSdcbiAgLCAnPj0nXG4gICwgJz09J1xuICAsICchPSdcbiAgLCAnJiYnXG4gICwgJ3x8J1xuICAsICcrPSdcbiAgLCAnLT0nXG4gICwgJyo9J1xuICAsICcvPSdcbiAgLCAnJT0nXG4gICwgJyY9J1xuICAsICdeXidcbiAgLCAnXj0nXG4gICwgJ3w9J1xuICAsICcoJ1xuICAsICcpJ1xuICAsICdbJ1xuICAsICddJ1xuICAsICcuJ1xuICAsICchJ1xuICAsICd+J1xuICAsICcqJ1xuICAsICcvJ1xuICAsICclJ1xuICAsICcrJ1xuICAsICctJ1xuICAsICc8J1xuICAsICc+J1xuICAsICcmJ1xuICAsICdeJ1xuICAsICd8J1xuICAsICc/J1xuICAsICc6J1xuICAsICc9J1xuICAsICcsJ1xuICAsICc7J1xuICAsICd7J1xuICAsICd9J1xuXVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL29wZXJhdG9ycy5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdjEwMCA9IHJlcXVpcmUoJy4vbGl0ZXJhbHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxMDAuc2xpY2UoKS5jb25jYXQoW1xuICAgJ2xheW91dCdcbiAgLCAnY2VudHJvaWQnXG4gICwgJ3Ntb290aCdcbiAgLCAnY2FzZSdcbiAgLCAnbWF0MngyJ1xuICAsICdtYXQyeDMnXG4gICwgJ21hdDJ4NCdcbiAgLCAnbWF0M3gyJ1xuICAsICdtYXQzeDMnXG4gICwgJ21hdDN4NCdcbiAgLCAnbWF0NHgyJ1xuICAsICdtYXQ0eDMnXG4gICwgJ21hdDR4NCdcbiAgLCAndWludCdcbiAgLCAndXZlYzInXG4gICwgJ3V2ZWMzJ1xuICAsICd1dmVjNCdcbiAgLCAnc2FtcGxlckN1YmVTaGFkb3cnXG4gICwgJ3NhbXBsZXIyREFycmF5J1xuICAsICdzYW1wbGVyMkRBcnJheVNoYWRvdydcbiAgLCAnaXNhbXBsZXIyRCdcbiAgLCAnaXNhbXBsZXIzRCdcbiAgLCAnaXNhbXBsZXJDdWJlJ1xuICAsICdpc2FtcGxlcjJEQXJyYXknXG4gICwgJ3VzYW1wbGVyMkQnXG4gICwgJ3VzYW1wbGVyM0QnXG4gICwgJ3VzYW1wbGVyQ3ViZSdcbiAgLCAndXNhbXBsZXIyREFycmF5J1xuICAsICdjb2hlcmVudCdcbiAgLCAncmVzdHJpY3QnXG4gICwgJ3JlYWRvbmx5J1xuICAsICd3cml0ZW9ubHknXG4gICwgJ3Jlc291cmNlJ1xuICAsICdhdG9taWNfdWludCdcbiAgLCAnbm9wZXJzcGVjdGl2ZSdcbiAgLCAncGF0Y2gnXG4gICwgJ3NhbXBsZSdcbiAgLCAnc3Vicm91dGluZSdcbiAgLCAnY29tbW9uJ1xuICAsICdwYXJ0aXRpb24nXG4gICwgJ2FjdGl2ZSdcbiAgLCAnZmlsdGVyJ1xuICAsICdpbWFnZTFEJ1xuICAsICdpbWFnZTJEJ1xuICAsICdpbWFnZTNEJ1xuICAsICdpbWFnZUN1YmUnXG4gICwgJ2lpbWFnZTFEJ1xuICAsICdpaW1hZ2UyRCdcbiAgLCAnaWltYWdlM0QnXG4gICwgJ2lpbWFnZUN1YmUnXG4gICwgJ3VpbWFnZTFEJ1xuICAsICd1aW1hZ2UyRCdcbiAgLCAndWltYWdlM0QnXG4gICwgJ3VpbWFnZUN1YmUnXG4gICwgJ2ltYWdlMURBcnJheSdcbiAgLCAnaW1hZ2UyREFycmF5J1xuICAsICdpaW1hZ2UxREFycmF5J1xuICAsICdpaW1hZ2UyREFycmF5J1xuICAsICd1aW1hZ2UxREFycmF5J1xuICAsICd1aW1hZ2UyREFycmF5J1xuICAsICdpbWFnZTFEU2hhZG93J1xuICAsICdpbWFnZTJEU2hhZG93J1xuICAsICdpbWFnZTFEQXJyYXlTaGFkb3cnXG4gICwgJ2ltYWdlMkRBcnJheVNoYWRvdydcbiAgLCAnaW1hZ2VCdWZmZXInXG4gICwgJ2lpbWFnZUJ1ZmZlcidcbiAgLCAndWltYWdlQnVmZmVyJ1xuICAsICdzYW1wbGVyMURBcnJheSdcbiAgLCAnc2FtcGxlcjFEQXJyYXlTaGFkb3cnXG4gICwgJ2lzYW1wbGVyMUQnXG4gICwgJ2lzYW1wbGVyMURBcnJheSdcbiAgLCAndXNhbXBsZXIxRCdcbiAgLCAndXNhbXBsZXIxREFycmF5J1xuICAsICdpc2FtcGxlcjJEUmVjdCdcbiAgLCAndXNhbXBsZXIyRFJlY3QnXG4gICwgJ3NhbXBsZXJCdWZmZXInXG4gICwgJ2lzYW1wbGVyQnVmZmVyJ1xuICAsICd1c2FtcGxlckJ1ZmZlcidcbiAgLCAnc2FtcGxlcjJETVMnXG4gICwgJ2lzYW1wbGVyMkRNUydcbiAgLCAndXNhbXBsZXIyRE1TJ1xuICAsICdzYW1wbGVyMkRNU0FycmF5J1xuICAsICdpc2FtcGxlcjJETVNBcnJheSdcbiAgLCAndXNhbXBsZXIyRE1TQXJyYXknXG5dKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2xpdGVyYWxzLTMwMGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIDMwMGVzIGJ1aWx0aW5zL3Jlc2VydmVkIHdvcmRzIHRoYXQgd2VyZSBwcmV2aW91c2x5IHZhbGlkIGluIHYxMDBcbnZhciB2MTAwID0gcmVxdWlyZSgnLi9idWlsdGlucycpXG5cbi8vIFRoZSB0ZXh0dXJlMkR8Q3ViZSBmdW5jdGlvbnMgaGF2ZSBiZWVuIHJlbW92ZWRcbi8vIEFuZCB0aGUgZ2xfIGZlYXR1cmVzIGFyZSB1cGRhdGVkXG52MTAwID0gdjEwMC5zbGljZSgpLmZpbHRlcihmdW5jdGlvbiAoYikge1xuICByZXR1cm4gIS9eKGdsXFxffHRleHR1cmUpLy50ZXN0KGIpXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxMDAuY29uY2F0KFtcbiAgLy8gdGhlIHVwZGF0ZWQgZ2xfIGNvbnN0YW50c1xuICAgICdnbF9WZXJ0ZXhJRCdcbiAgLCAnZ2xfSW5zdGFuY2VJRCdcbiAgLCAnZ2xfUG9zaXRpb24nXG4gICwgJ2dsX1BvaW50U2l6ZSdcbiAgLCAnZ2xfRnJhZ0Nvb3JkJ1xuICAsICdnbF9Gcm9udEZhY2luZydcbiAgLCAnZ2xfRnJhZ0RlcHRoJ1xuICAsICdnbF9Qb2ludENvb3JkJ1xuICAsICdnbF9NYXhWZXJ0ZXhBdHRyaWJzJ1xuICAsICdnbF9NYXhWZXJ0ZXhVbmlmb3JtVmVjdG9ycydcbiAgLCAnZ2xfTWF4VmVydGV4T3V0cHV0VmVjdG9ycydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRJbnB1dFZlY3RvcnMnXG4gICwgJ2dsX01heFZlcnRleFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhDb21iaW5lZFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRVbmlmb3JtVmVjdG9ycydcbiAgLCAnZ2xfTWF4RHJhd0J1ZmZlcnMnXG4gICwgJ2dsX01pblByb2dyYW1UZXhlbE9mZnNldCdcbiAgLCAnZ2xfTWF4UHJvZ3JhbVRleGVsT2Zmc2V0J1xuICAsICdnbF9EZXB0aFJhbmdlUGFyYW1ldGVycydcbiAgLCAnZ2xfRGVwdGhSYW5nZSdcblxuICAvLyBvdGhlciBidWlsdGluc1xuICAsICd0cnVuYydcbiAgLCAncm91bmQnXG4gICwgJ3JvdW5kRXZlbidcbiAgLCAnaXNuYW4nXG4gICwgJ2lzaW5mJ1xuICAsICdmbG9hdEJpdHNUb0ludCdcbiAgLCAnZmxvYXRCaXRzVG9VaW50J1xuICAsICdpbnRCaXRzVG9GbG9hdCdcbiAgLCAndWludEJpdHNUb0Zsb2F0J1xuICAsICdwYWNrU25vcm0yeDE2J1xuICAsICd1bnBhY2tTbm9ybTJ4MTYnXG4gICwgJ3BhY2tVbm9ybTJ4MTYnXG4gICwgJ3VucGFja1Vub3JtMngxNidcbiAgLCAncGFja0hhbGYyeDE2J1xuICAsICd1bnBhY2tIYWxmMngxNidcbiAgLCAnb3V0ZXJQcm9kdWN0J1xuICAsICd0cmFuc3Bvc2UnXG4gICwgJ2RldGVybWluYW50J1xuICAsICdpbnZlcnNlJ1xuICAsICd0ZXh0dXJlJ1xuICAsICd0ZXh0dXJlU2l6ZSdcbiAgLCAndGV4dHVyZVByb2onXG4gICwgJ3RleHR1cmVMb2QnXG4gICwgJ3RleHR1cmVPZmZzZXQnXG4gICwgJ3RleGVsRmV0Y2gnXG4gICwgJ3RleGVsRmV0Y2hPZmZzZXQnXG4gICwgJ3RleHR1cmVQcm9qT2Zmc2V0J1xuICAsICd0ZXh0dXJlTG9kT2Zmc2V0J1xuICAsICd0ZXh0dXJlUHJvakxvZCdcbiAgLCAndGV4dHVyZVByb2pMb2RPZmZzZXQnXG4gICwgJ3RleHR1cmVHcmFkJ1xuICAsICd0ZXh0dXJlR3JhZE9mZnNldCdcbiAgLCAndGV4dHVyZVByb2pHcmFkJ1xuICAsICd0ZXh0dXJlUHJvakdyYWRPZmZzZXQnXG5dKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLTMwMGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gX2F0b2Ioc3RyKSB7XG4gIHJldHVybiBhdG9iKHN0cilcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2F0b2ItbGl0ZS9hdG9iLWJyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDI4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHBhZExlZnQgPSByZXF1aXJlKCdwYWQtbGVmdCcpXG5cbm1vZHVsZS5leHBvcnRzID0gYWRkTGluZU51bWJlcnNcbmZ1bmN0aW9uIGFkZExpbmVOdW1iZXJzIChzdHJpbmcsIHN0YXJ0LCBkZWxpbSkge1xuICBzdGFydCA9IHR5cGVvZiBzdGFydCA9PT0gJ251bWJlcicgPyBzdGFydCA6IDFcbiAgZGVsaW0gPSBkZWxpbSB8fCAnOiAnXG5cbiAgdmFyIGxpbmVzID0gc3RyaW5nLnNwbGl0KC9cXHI/XFxuLylcbiAgdmFyIHRvdGFsRGlnaXRzID0gU3RyaW5nKGxpbmVzLmxlbmd0aCArIHN0YXJ0IC0gMSkubGVuZ3RoXG4gIHJldHVybiBsaW5lcy5tYXAoZnVuY3Rpb24gKGxpbmUsIGkpIHtcbiAgICB2YXIgYyA9IGkgKyBzdGFydFxuICAgIHZhciBkaWdpdHMgPSBTdHJpbmcoYykubGVuZ3RoXG4gICAgdmFyIHByZWZpeCA9IHBhZExlZnQoYywgdG90YWxEaWdpdHMgLSBkaWdpdHMpXG4gICAgcmV0dXJuIHByZWZpeCArIGRlbGltICsgbGluZVxuICB9KS5qb2luKCdcXG4nKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYWRkLWxpbmUtbnVtYmVycy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIHBhZC1sZWZ0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9wYWQtbGVmdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBudW0sIGNoKSB7XG4gIGNoID0gdHlwZW9mIGNoICE9PSAndW5kZWZpbmVkJyA/IChjaCArICcnKSA6ICcgJztcbiAgcmV0dXJuIHJlcGVhdChjaCwgbnVtKSArIHN0cjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyohXG4gKiByZXBlYXQtc3RyaW5nIDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9yZXBlYXQtc3RyaW5nPlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVzdWx0cyBjYWNoZVxuICovXG5cbnZhciByZXMgPSAnJztcbnZhciBjYWNoZTtcblxuLyoqXG4gKiBFeHBvc2UgYHJlcGVhdGBcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcGVhdDtcblxuLyoqXG4gKiBSZXBlYXQgdGhlIGdpdmVuIGBzdHJpbmdgIHRoZSBzcGVjaWZpZWQgYG51bWJlcmBcbiAqIG9mIHRpbWVzLlxuICpcbiAqICoqRXhhbXBsZToqKlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuICogcmVwZWF0KCdBJywgNSk7XG4gKiAvLz0+IEFBQUFBXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYHN0cmluZ2AgVGhlIHN0cmluZyB0byByZXBlYXRcbiAqIEBwYXJhbSB7TnVtYmVyfSBgbnVtYmVyYCBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIHJlcGVhdCB0aGUgc3RyaW5nXG4gKiBAcmV0dXJuIHtTdHJpbmd9IFJlcGVhdGVkIHN0cmluZ1xuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5mdW5jdGlvbiByZXBlYXQoc3RyLCBudW0pIHtcbiAgaWYgKHR5cGVvZiBzdHIgIT09ICdzdHJpbmcnKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZXhwZWN0ZWQgYSBzdHJpbmcnKTtcbiAgfVxuXG4gIC8vIGNvdmVyIGNvbW1vbiwgcXVpY2sgdXNlIGNhc2VzXG4gIGlmIChudW0gPT09IDEpIHJldHVybiBzdHI7XG4gIGlmIChudW0gPT09IDIpIHJldHVybiBzdHIgKyBzdHI7XG5cbiAgdmFyIG1heCA9IHN0ci5sZW5ndGggKiBudW07XG4gIGlmIChjYWNoZSAhPT0gc3RyIHx8IHR5cGVvZiBjYWNoZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjYWNoZSA9IHN0cjtcbiAgICByZXMgPSAnJztcbiAgfSBlbHNlIGlmIChyZXMubGVuZ3RoID49IG1heCkge1xuICAgIHJldHVybiByZXMuc3Vic3RyKDAsIG1heCk7XG4gIH1cblxuICB3aGlsZSAobWF4ID4gcmVzLmxlbmd0aCAmJiBudW0gPiAxKSB7XG4gICAgaWYgKG51bSAmIDEpIHtcbiAgICAgIHJlcyArPSBzdHI7XG4gICAgfVxuXG4gICAgbnVtID4+PSAxO1xuICAgIHN0ciArPSBzdHI7XG4gIH1cblxuICByZXMgKz0gc3RyO1xuICByZXMgPSByZXMuc3Vic3RyKDAsIG1heCk7XG4gIHJldHVybiByZXM7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yZXBlYXQtc3RyaW5nL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIE9yaWdpbmFsIC0gQEdvem9sYS5cbi8vIGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL0dvemFsYS8xMjY5OTkxXG4vLyBUaGlzIGlzIGEgcmVpbXBsZW1lbnRlZCB2ZXJzaW9uICh3aXRoIGEgZmV3IGJ1ZyBmaXhlcykuXG5cbnZhciBjcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlLXN0b3JlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gd2Vha01hcDtcblxuZnVuY3Rpb24gd2Vha01hcCgpIHtcbiAgICB2YXIgcHJpdmF0ZXMgPSBjcmVhdGVTdG9yZSgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgJ2dldCc6IGZ1bmN0aW9uIChrZXksIGZhbGxiYWNrKSB7XG4gICAgICAgICAgICB2YXIgc3RvcmUgPSBwcml2YXRlcyhrZXkpXG4gICAgICAgICAgICByZXR1cm4gc3RvcmUuaGFzT3duUHJvcGVydHkoJ3ZhbHVlJykgP1xuICAgICAgICAgICAgICAgIHN0b3JlLnZhbHVlIDogZmFsbGJhY2tcbiAgICAgICAgfSxcbiAgICAgICAgJ3NldCc6IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBwcml2YXRlcyhrZXkpLnZhbHVlID0gdmFsdWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgJ2hhcyc6IGZ1bmN0aW9uKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuICd2YWx1ZScgaW4gcHJpdmF0ZXMoa2V5KTtcbiAgICAgICAgfSxcbiAgICAgICAgJ2RlbGV0ZSc6IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWxldGUgcHJpdmF0ZXMoa2V5KS52YWx1ZTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaGlkZGVuU3RvcmUgPSByZXF1aXJlKCcuL2hpZGRlbi1zdG9yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVN0b3JlO1xuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcbiAgICB2YXIga2V5ID0ge307XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYWttYXAtc2hpbTogS2V5IG11c3QgYmUgb2JqZWN0JylcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdG9yZSA9IG9iai52YWx1ZU9mKGtleSk7XG4gICAgICAgIHJldHVybiBzdG9yZSAmJiBzdG9yZS5pZGVudGl0eSA9PT0ga2V5ID9cbiAgICAgICAgICAgIHN0b3JlIDogaGlkZGVuU3RvcmUob2JqLCBrZXkpO1xuICAgIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vY3JlYXRlLXN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gaGlkZGVuU3RvcmU7XG5cbmZ1bmN0aW9uIGhpZGRlblN0b3JlKG9iaiwga2V5KSB7XG4gICAgdmFyIHN0b3JlID0geyBpZGVudGl0eToga2V5IH07XG4gICAgdmFyIHZhbHVlT2YgPSBvYmoudmFsdWVPZjtcblxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIFwidmFsdWVPZlwiLCB7XG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZSAhPT0ga2V5ID9cbiAgICAgICAgICAgICAgICB2YWx1ZU9mLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgOiBzdG9yZTtcbiAgICAgICAgfSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICB9KTtcblxuICAgIHJldHVybiBzdG9yZTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9oaWRkZW4tc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDM0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMudW5pZm9ybXMgICAgPSBydW50aW1lVW5pZm9ybXNcbmV4cG9ydHMuYXR0cmlidXRlcyAgPSBydW50aW1lQXR0cmlidXRlc1xuXG52YXIgR0xfVE9fR0xTTF9UWVBFUyA9IHtcbiAgJ0ZMT0FUJzogICAgICAgJ2Zsb2F0JyxcbiAgJ0ZMT0FUX1ZFQzInOiAgJ3ZlYzInLFxuICAnRkxPQVRfVkVDMyc6ICAndmVjMycsXG4gICdGTE9BVF9WRUM0JzogICd2ZWM0JyxcbiAgJ0lOVCc6ICAgICAgICAgJ2ludCcsXG4gICdJTlRfVkVDMic6ICAgICdpdmVjMicsXG4gICdJTlRfVkVDMyc6ICAgICdpdmVjMycsXG4gICdJTlRfVkVDNCc6ICAgICdpdmVjNCcsXG4gICdCT09MJzogICAgICAgICdib29sJyxcbiAgJ0JPT0xfVkVDMic6ICAgJ2J2ZWMyJyxcbiAgJ0JPT0xfVkVDMyc6ICAgJ2J2ZWMzJyxcbiAgJ0JPT0xfVkVDNCc6ICAgJ2J2ZWM0JyxcbiAgJ0ZMT0FUX01BVDInOiAgJ21hdDInLFxuICAnRkxPQVRfTUFUMyc6ICAnbWF0MycsXG4gICdGTE9BVF9NQVQ0JzogICdtYXQ0JyxcbiAgJ1NBTVBMRVJfMkQnOiAgJ3NhbXBsZXIyRCcsXG4gICdTQU1QTEVSX0NVQkUnOidzYW1wbGVyQ3ViZSdcbn1cblxudmFyIEdMX1RBQkxFID0gbnVsbFxuXG5mdW5jdGlvbiBnZXRUeXBlKGdsLCB0eXBlKSB7XG4gIGlmKCFHTF9UQUJMRSkge1xuICAgIHZhciB0eXBlTmFtZXMgPSBPYmplY3Qua2V5cyhHTF9UT19HTFNMX1RZUEVTKVxuICAgIEdMX1RBQkxFID0ge31cbiAgICBmb3IodmFyIGk9MDsgaTx0eXBlTmFtZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciB0biA9IHR5cGVOYW1lc1tpXVxuICAgICAgR0xfVEFCTEVbZ2xbdG5dXSA9IEdMX1RPX0dMU0xfVFlQRVNbdG5dXG4gICAgfVxuICB9XG4gIHJldHVybiBHTF9UQUJMRVt0eXBlXVxufVxuXG5mdW5jdGlvbiBydW50aW1lVW5pZm9ybXMoZ2wsIHByb2dyYW0pIHtcbiAgdmFyIG51bVVuaWZvcm1zID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfVU5JRk9STVMpXG4gIHZhciByZXN1bHQgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxudW1Vbmlmb3JtczsgKytpKSB7XG4gICAgdmFyIGluZm8gPSBnbC5nZXRBY3RpdmVVbmlmb3JtKHByb2dyYW0sIGkpXG4gICAgaWYoaW5mbykge1xuICAgICAgdmFyIHR5cGUgPSBnZXRUeXBlKGdsLCBpbmZvLnR5cGUpXG4gICAgICBpZihpbmZvLnNpemUgPiAxKSB7XG4gICAgICAgIGZvcih2YXIgaj0wOyBqPGluZm8uc2l6ZTsgKytqKSB7XG4gICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgbmFtZTogaW5mby5uYW1lLnJlcGxhY2UoJ1swXScsICdbJyArIGogKyAnXScpLFxuICAgICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgICAgdHlwZTogdHlwZVxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIHJ1bnRpbWVBdHRyaWJ1dGVzKGdsLCBwcm9ncmFtKSB7XG4gIHZhciBudW1BdHRyaWJ1dGVzID0gZ2wuZ2V0UHJvZ3JhbVBhcmFtZXRlcihwcm9ncmFtLCBnbC5BQ1RJVkVfQVRUUklCVVRFUylcbiAgdmFyIHJlc3VsdCA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPG51bUF0dHJpYnV0ZXM7ICsraSkge1xuICAgIHZhciBpbmZvID0gZ2wuZ2V0QWN0aXZlQXR0cmliKHByb2dyYW0sIGkpXG4gICAgaWYoaW5mbykge1xuICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICBuYW1lOiBpbmZvLm5hbWUsXG4gICAgICAgIHR5cGU6IGdldFR5cGUoZ2wsIGluZm8udHlwZSlcbiAgICAgIH0pXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvcnVudGltZS1yZWZsZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBzdGF0ZVJlc2V0ID0gcmVxdWlyZSgnLi9zdGF0ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzZXRcbm1vZHVsZS5leHBvcnRzLnN0YXRlID0gc3RhdGVSZXNldFxuXG5mdW5jdGlvbiBSZXNldChnbCkge1xuICB2YXIgY2xlYW51cCA9IFtcbiAgICAnQnVmZmVyJ1xuICAsICdGcmFtZWJ1ZmZlcidcbiAgLCAnUmVuZGVyYnVmZmVyJ1xuICAsICdQcm9ncmFtJ1xuICAsICdTaGFkZXInXG4gICwgJ1RleHR1cmUnXG4gIF0ubWFwKGZ1bmN0aW9uKHN1ZmZpeCkge1xuICAgIHZhciByZW1vdmUgICA9ICdkZWxldGUnICsgc3VmZml4XG4gICAgdmFyIGNyZWF0ZSAgID0gJ2NyZWF0ZScgKyBzdWZmaXhcbiAgICB2YXIgb3JpZ2luYWwgPSBnbFtjcmVhdGVdXG4gICAgdmFyIGhhbmRsZXMgID0gW11cblxuICAgIGdsW2NyZWF0ZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoYW5kbGUgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBoYW5kbGVzLnB1c2goaGFuZGxlKVxuICAgICAgcmV0dXJuIGhhbmRsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogcmVtb3ZlXG4gICAgICAsIGhhbmRsZXM6IGhhbmRsZXNcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGNsZWFudXAuZm9yRWFjaChmdW5jdGlvbihraW5kKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtpbmQuaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBnbFtraW5kLnJlbW92ZV0uY2FsbChnbCwga2luZC5oYW5kbGVzW2ldKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBzdGF0ZVJlc2V0KGdsKVxuXG4gICAgcmV0dXJuIGdsXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vXG4vLyBUaGUgY29kZSB0aGF0IGZvbGxvd3Mgd2FzIG9yaWdpbmFsbHkgc291cmNlZCBmcm9tOlxuLy8gaHR0cHM6Ly93d3cua2hyb25vcy5vcmcvcmVnaXN0cnkvd2ViZ2wvc2RrL2RlYnVnL3dlYmdsLWRlYnVnLmpzXG4vL1xuXG5tb2R1bGUuZXhwb3J0cyA9IHN0YXRlUmVzZXRcblxuLypcbioqIENvcHlyaWdodCAoYykgMjAxMiBUaGUgS2hyb25vcyBHcm91cCBJbmMuXG4qKlxuKiogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbioqIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQvb3IgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbioqIFwiTWF0ZXJpYWxzXCIpLCB0byBkZWFsIGluIHRoZSBNYXRlcmlhbHMgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4qKiB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4qKiBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIE1hdGVyaWFscywgYW5kIHRvXG4qKiBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBNYXRlcmlhbHMgYXJlIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuKiogdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuKipcbioqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkXG4qKiBpbiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBNYXRlcmlhbHMuXG4qKlxuKiogVEhFIE1BVEVSSUFMUyBBUkUgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELFxuKiogRVhQUkVTUyBPUiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GXG4qKiBNRVJDSEFOVEFCSUxJVFksIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuXG4qKiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWVxuKiogQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVIgTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCxcbioqIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFXG4qKiBNQVRFUklBTFMgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgTUFURVJJQUxTLlxuKi9cbmZ1bmN0aW9uIHN0YXRlUmVzZXQoZ2wpIHtcbiAgdmFyIG51bUF0dHJpYnMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1ZFUlRFWF9BVFRSSUJTKVxuICB2YXIgdG1wID0gZ2wuY3JlYXRlQnVmZmVyKClcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIHRtcClcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG51bUF0dHJpYnM7ICsraWkpIHtcbiAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaWkpXG4gICAgZ2wudmVydGV4QXR0cmliUG9pbnRlcihpaSwgNCwgZ2wuRkxPQVQsIGZhbHNlLCAwLCAwKVxuICAgIGdsLnZlcnRleEF0dHJpYjFmKGlpLCAwKVxuICB9XG4gIGdsLmRlbGV0ZUJ1ZmZlcih0bXApXG5cbiAgdmFyIG51bVRleHR1cmVVbml0cyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVEVYVFVSRV9JTUFHRV9VTklUUylcbiAgZm9yICh2YXIgaWkgPSAwOyBpaSA8IG51bVRleHR1cmVVbml0czsgKytpaSkge1xuICAgIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTAgKyBpaSlcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFX0NVQkVfTUFQLCBudWxsKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfMkQsIG51bGwpXG4gIH1cblxuICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwKVxuICBnbC51c2VQcm9ncmFtKG51bGwpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCBudWxsKVxuICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKVxuICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpXG4gIGdsLmJpbmRSZW5kZXJidWZmZXIoZ2wuUkVOREVSQlVGRkVSLCBudWxsKVxuICBnbC5kaXNhYmxlKGdsLkJMRU5EKVxuICBnbC5kaXNhYmxlKGdsLkNVTExfRkFDRSlcbiAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxuICBnbC5kaXNhYmxlKGdsLkRJVEhFUilcbiAgZ2wuZGlzYWJsZShnbC5TQ0lTU09SX1RFU1QpXG4gIGdsLmJsZW5kQ29sb3IoMCwgMCwgMCwgMClcbiAgZ2wuYmxlbmRFcXVhdGlvbihnbC5GVU5DX0FERClcbiAgZ2wuYmxlbmRGdW5jKGdsLk9ORSwgZ2wuWkVSTylcbiAgZ2wuY2xlYXJDb2xvcigwLCAwLCAwLCAwKVxuICBnbC5jbGVhckRlcHRoKDEpXG4gIGdsLmNsZWFyU3RlbmNpbCgtMSlcbiAgZ2wuY29sb3JNYXNrKHRydWUsIHRydWUsIHRydWUsIHRydWUpXG4gIGdsLmN1bGxGYWNlKGdsLkJBQ0spXG4gIGdsLmRlcHRoRnVuYyhnbC5MRVNTKVxuICBnbC5kZXB0aE1hc2sodHJ1ZSlcbiAgZ2wuZGVwdGhSYW5nZSgwLCAxKVxuICBnbC5mcm9udEZhY2UoZ2wuQ0NXKVxuICBnbC5oaW50KGdsLkdFTkVSQVRFX01JUE1BUF9ISU5ULCBnbC5ET05UX0NBUkUpXG4gIGdsLmxpbmVXaWR0aCgxKVxuICBnbC5waXhlbFN0b3JlaShnbC5QQUNLX0FMSUdOTUVOVCwgNClcbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0FMSUdOTUVOVCwgNClcbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX0ZMSVBfWV9XRUJHTCwgZmFsc2UpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCwgZmFsc2UpXG4gIGdsLnBvbHlnb25PZmZzZXQoMCwgMClcbiAgZ2wuc2FtcGxlQ292ZXJhZ2UoMSwgZmFsc2UpXG4gIGdsLnNjaXNzb3IoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KVxuICBnbC5zdGVuY2lsRnVuYyhnbC5BTFdBWVMsIDAsIDB4RkZGRkZGRkYpXG4gIGdsLnN0ZW5jaWxNYXNrKDB4RkZGRkZGRkYpXG4gIGdsLnN0ZW5jaWxPcChnbC5LRUVQLCBnbC5LRUVQLCBnbC5LRUVQKVxuICBnbC52aWV3cG9ydCgwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpXG4gIGdsLmNsZWFyKGdsLkNPTE9SX0JVRkZFUl9CSVQgfCBnbC5ERVBUSF9CVUZGRVJfQklUIHwgZ2wuU1RFTkNJTF9CVUZGRVJfQklUKVxuXG4gIHJldHVybiBnbFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtcmVzZXQvc3RhdGUuanNcbi8vIG1vZHVsZSBpZCA9IDM3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPVxuICBnbG9iYWwucGVyZm9ybWFuY2UgJiZcbiAgZ2xvYmFsLnBlcmZvcm1hbmNlLm5vdyA/IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gcGVyZm9ybWFuY2Uubm93KClcbiAgfSA6IERhdGUubm93IHx8IGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4gK25ldyBEYXRlXG4gIH1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JpZ2h0LW5vdy9icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgd2Vha01hcCAgICAgID0gdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnd2Vhay1tYXAnKSA6IFdlYWtNYXBcbnZhciBjcmVhdGVCdWZmZXIgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVZBTyAgICA9IHJlcXVpcmUoJ2dsLXZhbycpXG5cbnZhciBUcmlhbmdsZUNhY2hlID0gbmV3IHdlYWtNYXAoKVxuXG5mdW5jdGlvbiBjcmVhdGVBQmlnVHJpYW5nbGUoZ2wpIHtcblxuICB2YXIgdHJpYW5nbGVWQU8gPSBUcmlhbmdsZUNhY2hlLmdldChnbClcbiAgdmFyIGhhbmRsZSA9IHRyaWFuZ2xlVkFPICYmICh0cmlhbmdsZVZBTy5fdHJpYW5nbGVCdWZmZXIuaGFuZGxlIHx8IHRyaWFuZ2xlVkFPLl90cmlhbmdsZUJ1ZmZlci5idWZmZXIpXG4gIGlmKCFoYW5kbGUgfHwgIWdsLmlzQnVmZmVyKGhhbmRsZSkpIHtcbiAgICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGdsLCBuZXcgRmxvYXQzMkFycmF5KFstMSwgLTEsIC0xLCA0LCA0LCAtMV0pKVxuICAgIHRyaWFuZ2xlVkFPID0gY3JlYXRlVkFPKGdsLCBbXG4gICAgICB7IGJ1ZmZlcjogYnVmLFxuICAgICAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICAgICAgc2l6ZTogMlxuICAgICAgfVxuICAgIF0pXG4gICAgdHJpYW5nbGVWQU8uX3RyaWFuZ2xlQnVmZmVyID0gYnVmXG4gICAgVHJpYW5nbGVDYWNoZS5zZXQoZ2wsIHRyaWFuZ2xlVkFPKVxuICB9XG4gIHRyaWFuZ2xlVkFPLmJpbmQoKVxuICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgMylcbiAgdHJpYW5nbGVWQU8udW5iaW5kKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBQmlnVHJpYW5nbGVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8vIENvcHlyaWdodCAoQykgMjAxMSBHb29nbGUgSW5jLlxuLy9cbi8vIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XG4vLyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG4vLyBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbi8vXG4vLyBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbi8vXG4vLyBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXG4vLyBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXG4vLyBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cbi8vIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcbi8vIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgSW5zdGFsbCBhIGxlYWt5IFdlYWtNYXAgZW11bGF0aW9uIG9uIHBsYXRmb3JtcyB0aGF0XG4gKiBkb24ndCBwcm92aWRlIGEgYnVpbHQtaW4gb25lLlxuICpcbiAqIDxwPkFzc3VtZXMgdGhhdCBhbiBFUzUgcGxhdGZvcm0gd2hlcmUsIGlmIHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWxyZWFkeSBwcmVzZW50LCB0aGVuIGl0IGNvbmZvcm1zIHRvIHRoZSBhbnRpY2lwYXRlZCBFUzZcbiAqIHNwZWNpZmljYXRpb24uIFRvIHJ1biB0aGlzIGZpbGUgb24gYW4gRVM1IG9yIGFsbW9zdCBFUzVcbiAqIGltcGxlbWVudGF0aW9uIHdoZXJlIHRoZSB7QGNvZGUgV2Vha01hcH0gc3BlY2lmaWNhdGlvbiBkb2VzIG5vdFxuICogcXVpdGUgY29uZm9ybSwgcnVuIDxjb2RlPnJlcGFpckVTNS5qczwvY29kZT4gZmlyc3QuXG4gKlxuICogPHA+RXZlbiB0aG91Z2ggV2Vha01hcE1vZHVsZSBpcyBub3QgZ2xvYmFsLCB0aGUgbGludGVyIHRoaW5rcyBpdFxuICogaXMsIHdoaWNoIGlzIHdoeSBpdCBpcyBpbiB0aGUgb3ZlcnJpZGVzIGxpc3QgYmVsb3cuXG4gKlxuICogPHA+Tk9URTogQmVmb3JlIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gaW4gYSBub24tU0VTXG4gKiBlbnZpcm9ubWVudCwgc2VlIHRoZSBub3RlIGJlbG93IGFib3V0IGhpZGRlblJlY29yZC5cbiAqXG4gKiBAYXV0aG9yIE1hcmsgUy4gTWlsbGVyXG4gKiBAcmVxdWlyZXMgY3J5cHRvLCBBcnJheUJ1ZmZlciwgVWludDhBcnJheSwgbmF2aWdhdG9yLCBjb25zb2xlXG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXAsIHNlcywgUHJveHlcbiAqIEBvdmVycmlkZXMgV2Vha01hcE1vZHVsZVxuICovXG5cbi8qKlxuICogVGhpcyB7QGNvZGUgV2Vha01hcH0gZW11bGF0aW9uIGlzIG9ic2VydmFibHkgZXF1aXZhbGVudCB0byB0aGVcbiAqIEVTLUhhcm1vbnkgV2Vha01hcCwgYnV0IHdpdGggbGVha2llciBnYXJiYWdlIGNvbGxlY3Rpb24gcHJvcGVydGllcy5cbiAqXG4gKiA8cD5BcyB3aXRoIHRydWUgV2Vha01hcHMsIGluIHRoaXMgZW11bGF0aW9uLCBhIGtleSBkb2VzIG5vdFxuICogcmV0YWluIG1hcHMgaW5kZXhlZCBieSB0aGF0IGtleSBhbmQgKGNydWNpYWxseSkgYSBtYXAgZG9lcyBub3RcbiAqIHJldGFpbiB0aGUga2V5cyBpdCBpbmRleGVzLiBBIG1hcCBieSBpdHNlbGYgYWxzbyBkb2VzIG5vdCByZXRhaW5cbiAqIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIHRoYXQgbWFwLlxuICpcbiAqIDxwPkhvd2V2ZXIsIHRoZSB2YWx1ZXMgYXNzb2NpYXRlZCB3aXRoIGEga2V5IGluIHNvbWUgbWFwIGFyZVxuICogcmV0YWluZWQgc28gbG9uZyBhcyB0aGF0IGtleSBpcyByZXRhaW5lZCBhbmQgdGhvc2UgYXNzb2NpYXRpb25zIGFyZVxuICogbm90IG92ZXJyaWRkZW4uIEZvciBleGFtcGxlLCB3aGVuIHVzZWQgdG8gc3VwcG9ydCBtZW1icmFuZXMsIGFsbFxuICogdmFsdWVzIGV4cG9ydGVkIGZyb20gYSBnaXZlbiBtZW1icmFuZSB3aWxsIGxpdmUgZm9yIHRoZSBsaWZldGltZVxuICogdGhleSB3b3VsZCBoYXZlIGhhZCBpbiB0aGUgYWJzZW5jZSBvZiBhbiBpbnRlcnBvc2VkIG1lbWJyYW5lLiBFdmVuXG4gKiB3aGVuIHRoZSBtZW1icmFuZSBpcyByZXZva2VkLCBhbGwgb2JqZWN0cyB0aGF0IHdvdWxkIGhhdmUgYmVlblxuICogcmVhY2hhYmxlIGluIHRoZSBhYnNlbmNlIG9mIHJldm9jYXRpb24gd2lsbCBzdGlsbCBiZSByZWFjaGFibGUsIGFzXG4gKiBmYXIgYXMgdGhlIEdDIGNhbiB0ZWxsLCBldmVuIHRob3VnaCB0aGV5IHdpbGwgbm8gbG9uZ2VyIGJlIHJlbGV2YW50XG4gKiB0byBvbmdvaW5nIGNvbXB1dGF0aW9uLlxuICpcbiAqIDxwPlRoZSBBUEkgaW1wbGVtZW50ZWQgaGVyZSBpcyBhcHByb3hpbWF0ZWx5IHRoZSBBUEkgYXMgaW1wbGVtZW50ZWRcbiAqIGluIEZGNi4wYTEgYW5kIGFncmVlZCB0byBieSBNYXJrTSwgQW5kcmVhcyBHYWwsIGFuZCBEYXZlIEhlcm1hbixcbiAqIHJhdGhlciB0aGFuIHRoZSBvZmZpYWxseSBhcHByb3ZlZCBwcm9wb3NhbCBwYWdlLiBUT0RPKGVyaWdodHMpOlxuICogdXBncmFkZSB0aGUgZWNtYXNjcmlwdCBXZWFrTWFwIHByb3Bvc2FsIHBhZ2UgdG8gZXhwbGFpbiB0aGlzIEFQSVxuICogY2hhbmdlIGFuZCBwcmVzZW50IHRvIEVjbWFTY3JpcHQgY29tbWl0dGVlIGZvciB0aGVpciBhcHByb3ZhbC5cbiAqXG4gKiA8cD5UaGUgZmlyc3QgZGlmZmVyZW5jZSBiZXR3ZWVuIHRoZSBlbXVsYXRpb24gaGVyZSBhbmQgdGhhdCBpblxuICogRkY2LjBhMSBpcyB0aGUgcHJlc2VuY2Ugb2Ygbm9uIGVudW1lcmFibGUge0Bjb2RlIGdldF9fXywgaGFzX19fLFxuICogc2V0X19fLCBhbmQgZGVsZXRlX19ffSBtZXRob2RzIG9uIFdlYWtNYXAgaW5zdGFuY2VzIHRvIHJlcHJlc2VudFxuICogd2hhdCB3b3VsZCBiZSB0aGUgaGlkZGVuIGludGVybmFsIHByb3BlcnRpZXMgb2YgYSBwcmltaXRpdmVcbiAqIGltcGxlbWVudGF0aW9uLiBXaGVyZWFzIHRoZSBGRjYuMGExIFdlYWtNYXAucHJvdG90eXBlIG1ldGhvZHNcbiAqIHJlcXVpcmUgdGhlaXIge0Bjb2RlIHRoaXN9IHRvIGJlIGEgZ2VudWluZSBXZWFrTWFwIGluc3RhbmNlIChpLmUuLFxuICogYW4gb2JqZWN0IG9mIHtAY29kZSBbW0NsYXNzXV19IFwiV2Vha01hcH0pLCBzaW5jZSB0aGVyZSBpcyBub3RoaW5nXG4gKiB1bmZvcmdlYWJsZSBhYm91dCB0aGUgcHNldWRvLWludGVybmFsIG1ldGhvZCBuYW1lcyB1c2VkIGhlcmUsXG4gKiBub3RoaW5nIHByZXZlbnRzIHRoZXNlIGVtdWxhdGVkIHByb3RvdHlwZSBtZXRob2RzIGZyb20gYmVpbmdcbiAqIGFwcGxpZWQgdG8gbm9uLVdlYWtNYXBzIHdpdGggcHNldWRvLWludGVybmFsIG1ldGhvZHMgb2YgdGhlIHNhbWVcbiAqIG5hbWVzLlxuICpcbiAqIDxwPkFub3RoZXIgZGlmZmVyZW5jZSBpcyB0aGF0IG91ciBlbXVsYXRlZCB7QGNvZGVcbiAqIFdlYWtNYXAucHJvdG90eXBlfSBpcyBub3QgaXRzZWxmIGEgV2Vha01hcC4gQSBwcm9ibGVtIHdpdGggdGhlXG4gKiBjdXJyZW50IEZGNi4wYTEgQVBJIGlzIHRoYXQgV2Vha01hcC5wcm90b3R5cGUgaXMgaXRzZWxmIGEgV2Vha01hcFxuICogcHJvdmlkaW5nIGFtYmllbnQgbXV0YWJpbGl0eSBhbmQgYW4gYW1iaWVudCBjb21tdW5pY2F0aW9uc1xuICogY2hhbm5lbC4gVGh1cywgaWYgYSBXZWFrTWFwIGlzIGFscmVhZHkgcHJlc2VudCBhbmQgaGFzIHRoaXNcbiAqIHByb2JsZW0sIHJlcGFpckVTNS5qcyB3cmFwcyBpdCBpbiBhIHNhZmUgd3JhcHBwZXIgaW4gb3JkZXIgdG9cbiAqIHByZXZlbnQgYWNjZXNzIHRvIHRoaXMgY2hhbm5lbC4gKFNlZVxuICogUEFUQ0hfTVVUQUJMRV9GUk9aRU5fV0VBS01BUF9QUk9UTyBpbiByZXBhaXJFUzUuanMpLlxuICovXG5cbi8qKlxuICogSWYgdGhpcyBpcyBhIGZ1bGwgPGEgaHJlZj1cbiAqIFwiaHR0cDovL2NvZGUuZ29vZ2xlLmNvbS9wL2VzLWxhYi93aWtpL1NlY3VyZWFibGVFUzVcIlxuICogPnNlY3VyZWFibGUgRVM1PC9hPiBwbGF0Zm9ybSBhbmQgdGhlIEVTLUhhcm1vbnkge0Bjb2RlIFdlYWtNYXB9IGlzXG4gKiBhYnNlbnQsIGluc3RhbGwgYW4gYXBwcm94aW1hdGUgZW11bGF0aW9uLlxuICpcbiAqIDxwPklmIFdlYWtNYXAgaXMgcHJlc2VudCBidXQgY2Fubm90IHN0b3JlIHNvbWUgb2JqZWN0cywgdXNlIG91ciBhcHByb3hpbWF0ZVxuICogZW11bGF0aW9uIGFzIGEgd3JhcHBlci5cbiAqXG4gKiA8cD5JZiB0aGlzIGlzIGFsbW9zdCBhIHNlY3VyZWFibGUgRVM1IHBsYXRmb3JtLCB0aGVuIFdlYWtNYXAuanNcbiAqIHNob3VsZCBiZSBydW4gYWZ0ZXIgcmVwYWlyRVM1LmpzLlxuICpcbiAqIDxwPlNlZSB7QGNvZGUgV2Vha01hcH0gZm9yIGRvY3VtZW50YXRpb24gb2YgdGhlIGdhcmJhZ2UgY29sbGVjdGlvblxuICogcHJvcGVydGllcyBvZiB0aGlzIFdlYWtNYXAgZW11bGF0aW9uLlxuICovXG4oZnVuY3Rpb24gV2Vha01hcE1vZHVsZSgpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnICYmIHNlcy5vayAmJiAhc2VzLm9rKCkpIHtcbiAgICAvLyBhbHJlYWR5IHRvbyBicm9rZW4sIHNvIGdpdmUgdXBcbiAgICByZXR1cm47XG4gIH1cblxuICAvKipcbiAgICogSW4gc29tZSBjYXNlcyAoY3VycmVudCBGaXJlZm94KSwgd2UgbXVzdCBtYWtlIGEgY2hvaWNlIGJldHdlZWVuIGFcbiAgICogV2Vha01hcCB3aGljaCBpcyBjYXBhYmxlIG9mIHVzaW5nIGFsbCB2YXJpZXRpZXMgb2YgaG9zdCBvYmplY3RzIGFzXG4gICAqIGtleXMgYW5kIG9uZSB3aGljaCBpcyBjYXBhYmxlIG9mIHNhZmVseSB1c2luZyBwcm94aWVzIGFzIGtleXMuIFNlZVxuICAgKiBjb21tZW50cyBiZWxvdyBhYm91dCBIb3N0V2Vha01hcCBhbmQgRG91YmxlV2Vha01hcCBmb3IgZGV0YWlscy5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiAod2hpY2ggaXMgYSBnbG9iYWwsIG5vdCBleHBvc2VkIHRvIGd1ZXN0cykgbWFya3MgYVxuICAgKiBXZWFrTWFwIGFzIHBlcm1pdHRlZCB0byBkbyB3aGF0IGlzIG5lY2Vzc2FyeSB0byBpbmRleCBhbGwgaG9zdFxuICAgKiBvYmplY3RzLCBhdCB0aGUgY29zdCBvZiBtYWtpbmcgaXQgdW5zYWZlIGZvciBwcm94aWVzLlxuICAgKlxuICAgKiBEbyBub3QgYXBwbHkgdGhpcyBmdW5jdGlvbiB0byBhbnl0aGluZyB3aGljaCBpcyBub3QgYSBnZW51aW5lXG4gICAqIGZyZXNoIFdlYWtNYXAuXG4gICAqL1xuICBmdW5jdGlvbiB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMobWFwKSB7XG4gICAgLy8gaWRlbnRpdHkgb2YgZnVuY3Rpb24gdXNlZCBhcyBhIHNlY3JldCAtLSBnb29kIGVub3VnaCBhbmQgY2hlYXBcbiAgICBpZiAobWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKSB7XG4gICAgICBtYXAucGVybWl0SG9zdE9iamVjdHNfX18od2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKTtcbiAgICB9XG4gIH1cbiAgaWYgKHR5cGVvZiBzZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgc2VzLndlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyA9IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cztcbiAgfVxuXG4gIC8vIElFIDExIGhhcyBubyBQcm94eSBidXQgaGFzIGEgYnJva2VuIFdlYWtNYXAgc3VjaCB0aGF0IHdlIG5lZWQgdG8gcGF0Y2hcbiAgLy8gaXQgdXNpbmcgRG91YmxlV2Vha01hcDsgdGhpcyBmbGFnIHRlbGxzIERvdWJsZVdlYWtNYXAgc28uXG4gIHZhciBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gZmFsc2U7XG5cbiAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYWxyZWFkeSBhIGdvb2QtZW5vdWdoIFdlYWtNYXAgaW1wbGVtZW50YXRpb24sIGFuZCBpZiBzb1xuICAvLyBleGl0IHdpdGhvdXQgcmVwbGFjaW5nIGl0LlxuICBpZiAodHlwZW9mIFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgSG9zdFdlYWtNYXAgPSBXZWFrTWFwO1xuICAgIC8vIFRoZXJlIGlzIGEgV2Vha01hcCAtLSBpcyBpdCBnb29kIGVub3VnaD9cbiAgICBpZiAodHlwZW9mIG5hdmlnYXRvciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgL0ZpcmVmb3gvLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCkpIHtcbiAgICAgIC8vIFdlJ3JlIG5vdyAqYXNzdW1pbmcgbm90KiwgYmVjYXVzZSBhcyBvZiB0aGlzIHdyaXRpbmcgKDIwMTMtMDUtMDYpXG4gICAgICAvLyBGaXJlZm94J3MgV2Vha01hcHMgaGF2ZSBhIG1pc2NlbGxhbnkgb2Ygb2JqZWN0cyB0aGV5IHdvbid0IGFjY2VwdCwgYW5kXG4gICAgICAvLyB3ZSBkb24ndCB3YW50IHRvIG1ha2UgYW4gZXhoYXVzdGl2ZSBsaXN0LCBhbmQgdGVzdGluZyBmb3IganVzdCBvbmVcbiAgICAgIC8vIHdpbGwgYmUgYSBwcm9ibGVtIGlmIHRoYXQgb25lIGlzIGZpeGVkIGFsb25lIChhcyB0aGV5IGRpZCBmb3IgRXZlbnQpLlxuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBhIHBsYXRmb3JtIHRoYXQgd2UgKmNhbiogcmVsaWFibHkgdGVzdCBvbiwgaGVyZSdzIGhvdyB0b1xuICAgICAgLy8gZG8gaXQ6XG4gICAgICAvLyAgdmFyIHByb2JsZW1hdGljID0gLi4uIDtcbiAgICAgIC8vICB2YXIgdGVzdEhvc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIC8vICB0cnkge1xuICAgICAgLy8gICAgdGVzdEhvc3RNYXAuc2V0KHByb2JsZW1hdGljLCAxKTsgIC8vIEZpcmVmb3ggMjAgd2lsbCB0aHJvdyBoZXJlXG4gICAgICAvLyAgICBpZiAodGVzdEhvc3RNYXAuZ2V0KHByb2JsZW1hdGljKSA9PT0gMSkge1xuICAgICAgLy8gICAgICByZXR1cm47XG4gICAgICAvLyAgICB9XG4gICAgICAvLyAgfSBjYXRjaCAoZSkge31cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBJRSAxMSBidWc6IFdlYWtNYXBzIHNpbGVudGx5IGZhaWwgdG8gc3RvcmUgZnJvemVuIG9iamVjdHMuXG4gICAgICB2YXIgdGVzdE1hcCA9IG5ldyBIb3N0V2Vha01hcCgpO1xuICAgICAgdmFyIHRlc3RPYmplY3QgPSBPYmplY3QuZnJlZXplKHt9KTtcbiAgICAgIHRlc3RNYXAuc2V0KHRlc3RPYmplY3QsIDEpO1xuICAgICAgaWYgKHRlc3RNYXAuZ2V0KHRlc3RPYmplY3QpICE9PSAxKSB7XG4gICAgICAgIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgPSB0cnVlO1xuICAgICAgICAvLyBGYWxsIHRocm91Z2ggdG8gaW5zdGFsbGluZyBvdXIgV2Vha01hcC5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZHVsZS5leHBvcnRzID0gV2Vha01hcDtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHZhciBob3AgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICB2YXIgZ29wbiA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzO1xuICB2YXIgZGVmUHJvcCA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgdmFyIGlzRXh0ZW5zaWJsZSA9IE9iamVjdC5pc0V4dGVuc2libGU7XG5cbiAgLyoqXG4gICAqIFNlY3VyaXR5IGRlcGVuZHMgb24gSElEREVOX05BTUUgYmVpbmcgYm90aCA8aT51bmd1ZXNzYWJsZTwvaT4gYW5kXG4gICAqIDxpPnVuZGlzY292ZXJhYmxlPC9pPiBieSB1bnRydXN0ZWQgY29kZS5cbiAgICpcbiAgICogPHA+R2l2ZW4gdGhlIGtub3duIHdlYWtuZXNzZXMgb2YgTWF0aC5yYW5kb20oKSBvbiBleGlzdGluZ1xuICAgKiBicm93c2VycywgaXQgZG9lcyBub3QgZ2VuZXJhdGUgdW5ndWVzc2FiaWxpdHkgd2UgY2FuIGJlIGNvbmZpZGVudFxuICAgKiBvZi5cbiAgICpcbiAgICogPHA+SXQgaXMgdGhlIG1vbmtleSBwYXRjaGluZyBsb2dpYyBpbiB0aGlzIGZpbGUgdGhhdCBpcyBpbnRlbmRlZFxuICAgKiB0byBlbnN1cmUgdW5kaXNjb3ZlcmFiaWxpdHkuIFRoZSBiYXNpYyBpZGVhIGlzIHRoYXQgdGhlcmUgYXJlXG4gICAqIHRocmVlIGZ1bmRhbWVudGFsIG1lYW5zIG9mIGRpc2NvdmVyaW5nIHByb3BlcnRpZXMgb2YgYW4gb2JqZWN0OlxuICAgKiBUaGUgZm9yL2luIGxvb3AsIE9iamVjdC5rZXlzKCksIGFuZCBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcygpLFxuICAgKiBhcyB3ZWxsIGFzIHNvbWUgcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyXG4gICAqIHdoaXRlbGlzdC4gVGhlIGZpcnN0IHR3byBvbmx5IGRpc2NvdmVyIGVudW1lcmFibGUgcHJvcGVydGllcywgYW5kXG4gICAqIHdlIG9ubHkgdXNlIEhJRERFTl9OQU1FIHRvIG5hbWUgYSBub24tZW51bWVyYWJsZSBwcm9wZXJ0eSwgc28gdGhlXG4gICAqIG9ubHkgcmVtYWluaW5nIHRocmVhdCBzaG91bGQgYmUgZ2V0T3duUHJvcGVydHlOYW1lcyBhbmQgc29tZVxuICAgKiBwcm9wb3NlZCBFUzYgZXh0ZW5zaW9ucyB0aGF0IGFwcGVhciBvbiBvdXIgd2hpdGVsaXN0LiBXZSBtb25rZXlcbiAgICogcGF0Y2ggdGhlbSB0byByZW1vdmUgSElEREVOX05BTUUgZnJvbSB0aGUgbGlzdCBvZiBwcm9wZXJ0aWVzIHRoZXlcbiAgICogcmV0dXJucy5cbiAgICpcbiAgICogPHA+VE9ETyhlcmlnaHRzKTogT24gYSBwbGF0Zm9ybSB3aXRoIGJ1aWx0LWluIFByb3hpZXMsIHByb3hpZXNcbiAgICogY291bGQgYmUgdXNlZCB0byB0cmFwIGFuZCB0aGVyZWJ5IGRpc2NvdmVyIHRoZSBISURERU5fTkFNRSwgc28gd2VcbiAgICogbmVlZCB0byBtb25rZXkgcGF0Y2ggUHJveHkuY3JlYXRlLCBQcm94eS5jcmVhdGVGdW5jdGlvbiwgZXRjLCBpblxuICAgKiBvcmRlciB0byB3cmFwIHRoZSBwcm92aWRlZCBoYW5kbGVyIHdpdGggdGhlIHJlYWwgaGFuZGxlciB3aGljaFxuICAgKiBmaWx0ZXJzIG91dCBhbGwgdHJhcHMgdXNpbmcgSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IFJldmlzaXQgTWlrZSBTdGF5J3Mgc3VnZ2VzdGlvbiB0aGF0IHdlIHVzZSBhblxuICAgKiBlbmNhcHN1bGF0ZWQgZnVuY3Rpb24gYXQgYSBub3QtbmVjZXNzYXJpbHktc2VjcmV0IG5hbWUsIHdoaWNoXG4gICAqIHVzZXMgdGhlIFN0aWVnbGVyIHNoYXJlZC1zdGF0ZSByaWdodHMgYW1wbGlmaWNhdGlvbiBwYXR0ZXJuIHRvXG4gICAqIHJldmVhbCB0aGUgYXNzb2NpYXRlZCB2YWx1ZSBvbmx5IHRvIHRoZSBXZWFrTWFwIGluIHdoaWNoIHRoaXMga2V5XG4gICAqIGlzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IHZhbHVlLiBTaW5jZSBvbmx5IHRoZSBrZXkgcmV0YWlucyB0aGVcbiAgICogZnVuY3Rpb24sIHRoZSBmdW5jdGlvbiBjYW4gYWxzbyByZW1lbWJlciB0aGUga2V5IHdpdGhvdXQgY2F1c2luZ1xuICAgKiBsZWFrYWdlIG9mIHRoZSBrZXksIHNvIHRoaXMgZG9lc24ndCB2aW9sYXRlIG91ciBnZW5lcmFsIGdjXG4gICAqIGdvYWxzLiBJbiBhZGRpdGlvbiwgYmVjYXVzZSB0aGUgbmFtZSBuZWVkIG5vdCBiZSBhIGd1YXJkZWRcbiAgICogc2VjcmV0LCB3ZSBjb3VsZCBlZmZpY2llbnRseSBoYW5kbGUgY3Jvc3MtZnJhbWUgZnJvemVuIGtleXMuXG4gICAqL1xuICB2YXIgSElEREVOX05BTUVfUFJFRklYID0gJ3dlYWttYXA6JztcbiAgdmFyIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ2lkZW50OicgKyBNYXRoLnJhbmRvbSgpICsgJ19fXyc7XG5cbiAgaWYgKHR5cGVvZiBjcnlwdG8gIT09ICd1bmRlZmluZWQnICYmXG4gICAgICB0eXBlb2YgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIEFycmF5QnVmZmVyID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgVWludDhBcnJheSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBhYiA9IG5ldyBBcnJheUJ1ZmZlcigyNSk7XG4gICAgdmFyIHU4cyA9IG5ldyBVaW50OEFycmF5KGFiKTtcbiAgICBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzKHU4cyk7XG4gICAgSElEREVOX05BTUUgPSBISURERU5fTkFNRV9QUkVGSVggKyAncmFuZDonICtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5tYXAuY2FsbCh1OHMsIGZ1bmN0aW9uKHU4KSB7XG4gICAgICAgIHJldHVybiAodTggJSAzNikudG9TdHJpbmcoMzYpO1xuICAgICAgfSkuam9pbignJykgKyAnX19fJztcbiAgfVxuXG4gIGZ1bmN0aW9uIGlzTm90SGlkZGVuTmFtZShuYW1lKSB7XG4gICAgcmV0dXJuICEoXG4gICAgICAgIG5hbWUuc3Vic3RyKDAsIEhJRERFTl9OQU1FX1BSRUZJWC5sZW5ndGgpID09IEhJRERFTl9OQU1FX1BSRUZJWCAmJlxuICAgICAgICBuYW1lLnN1YnN0cihuYW1lLmxlbmd0aCAtIDMpID09PSAnX19fJyk7XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIGdldE93blByb3BlcnR5TmFtZXMgdG8gYXZvaWQgcmV2ZWFsaW5nIHRoZVxuICAgKiBISURERU5fTkFNRS5cbiAgICpcbiAgICogPHA+VGhlIEVTNS4xIHNwZWMgcmVxdWlyZXMgZWFjaCBuYW1lIHRvIGFwcGVhciBvbmx5IG9uY2UsIGJ1dCBhc1xuICAgKiBvZiB0aGlzIHdyaXRpbmcsIHRoaXMgcmVxdWlyZW1lbnQgaXMgY29udHJvdmVyc2lhbCBmb3IgRVM2LCBzbyB3ZVxuICAgKiBtYWRlIHRoaXMgY29kZSByb2J1c3QgYWdhaW5zdCB0aGlzIGNhc2UuIElmIHRoZSByZXN1bHRpbmcgZXh0cmFcbiAgICogc2VhcmNoIHR1cm5zIG91dCB0byBiZSBleHBlbnNpdmUsIHdlIGNhbiBwcm9iYWJseSByZWxheCB0aGlzIG9uY2VcbiAgICogRVM2IGlzIGFkZXF1YXRlbHkgc3VwcG9ydGVkIG9uIGFsbCBtYWpvciBicm93c2VycywgaWZmIG5vIGJyb3dzZXJcbiAgICogdmVyc2lvbnMgd2Ugc3VwcG9ydCBhdCB0aGF0IHRpbWUgaGF2ZSByZWxheGVkIHRoaXMgY29uc3RyYWludFxuICAgKiB3aXRob3V0IHByb3ZpZGluZyBidWlsdC1pbiBFUzYgV2Vha01hcHMuXG4gICAqL1xuICBkZWZQcm9wKE9iamVjdCwgJ2dldE93blByb3BlcnR5TmFtZXMnLCB7XG4gICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgcmV0dXJuIGdvcG4ob2JqKS5maWx0ZXIoaXNOb3RIaWRkZW5OYW1lKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8qKlxuICAgKiBnZXRQcm9wZXJ0eU5hbWVzIGlzIG5vdCBpbiBFUzUgYnV0IGl0IGlzIHByb3Bvc2VkIGZvciBFUzYgYW5kXG4gICAqIGRvZXMgYXBwZWFyIGluIG91ciB3aGl0ZWxpc3QsIHNvIHdlIG5lZWQgdG8gY2xlYW4gaXQgdG9vLlxuICAgKi9cbiAgaWYgKCdnZXRQcm9wZXJ0eU5hbWVzJyBpbiBPYmplY3QpIHtcbiAgICB2YXIgb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzID0gT2JqZWN0LmdldFByb3BlcnR5TmFtZXM7XG4gICAgZGVmUHJvcChPYmplY3QsICdnZXRQcm9wZXJ0eU5hbWVzJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGZha2VHZXRQcm9wZXJ0eU5hbWVzKG9iaikge1xuICAgICAgICByZXR1cm4gb3JpZ2luYWxHZXRQcm9wZXJ0eU5hbWVzKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogPHA+VG8gdHJlYXQgb2JqZWN0cyBhcyBpZGVudGl0eS1rZXlzIHdpdGggcmVhc29uYWJsZSBlZmZpY2llbmN5XG4gICAqIG9uIEVTNSBieSBpdHNlbGYgKGkuZS4sIHdpdGhvdXQgYW55IG9iamVjdC1rZXllZCBjb2xsZWN0aW9ucyksIHdlXG4gICAqIG5lZWQgdG8gYWRkIGEgaGlkZGVuIHByb3BlcnR5IHRvIHN1Y2gga2V5IG9iamVjdHMgd2hlbiB3ZVxuICAgKiBjYW4uIFRoaXMgcmFpc2VzIHNldmVyYWwgaXNzdWVzOlxuICAgKiA8dWw+XG4gICAqIDxsaT5BcnJhbmdpbmcgdG8gYWRkIHRoaXMgcHJvcGVydHkgdG8gb2JqZWN0cyBiZWZvcmUgd2UgbG9zZSB0aGVcbiAgICogICAgIGNoYW5jZSwgYW5kXG4gICAqIDxsaT5IaWRpbmcgdGhlIGV4aXN0ZW5jZSBvZiB0aGlzIG5ldyBwcm9wZXJ0eSBmcm9tIG1vc3RcbiAgICogICAgIEphdmFTY3JpcHQgY29kZS5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+Y2VydGlmaWNhdGlvbiB0aGVmdDwvaT4sIHdoZXJlIG9uZSBvYmplY3QgaXNcbiAgICogICAgIGNyZWF0ZWQgZmFsc2VseSBjbGFpbWluZyB0byBiZSB0aGUga2V5IG9mIGFuIGFzc29jaWF0aW9uXG4gICAqICAgICBhY3R1YWxseSBrZXllZCBieSBhbm90aGVyIG9iamVjdC5cbiAgICogPGxpPlByZXZlbnRpbmcgPGk+dmFsdWUgdGhlZnQ8L2k+LCB3aGVyZSB1bnRydXN0ZWQgY29kZSB3aXRoXG4gICAqICAgICBhY2Nlc3MgdG8gYSBrZXkgb2JqZWN0IGJ1dCBub3QgYSB3ZWFrIG1hcCBuZXZlcnRoZWxlc3NcbiAgICogICAgIG9idGFpbnMgYWNjZXNzIHRvIHRoZSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGggdGhhdCBrZXkgaW4gdGhhdFxuICAgKiAgICAgd2VhayBtYXAuXG4gICAqIDwvdWw+XG4gICAqIFdlIGRvIHNvIGJ5XG4gICAqIDx1bD5cbiAgICogPGxpPk1ha2luZyB0aGUgbmFtZSBvZiB0aGUgaGlkZGVuIHByb3BlcnR5IHVuZ3Vlc3NhYmxlLCBzbyBcIltdXCJcbiAgICogICAgIGluZGV4aW5nLCB3aGljaCB3ZSBjYW5ub3QgaW50ZXJjZXB0LCBjYW5ub3QgYmUgdXNlZCB0byBhY2Nlc3NcbiAgICogICAgIGEgcHJvcGVydHkgd2l0aG91dCBrbm93aW5nIHRoZSBuYW1lLlxuICAgKiA8bGk+TWFraW5nIHRoZSBoaWRkZW4gcHJvcGVydHkgbm9uLWVudW1lcmFibGUsIHNvIHdlIG5lZWQgbm90XG4gICAqICAgICB3b3JyeSBhYm91dCBmb3ItaW4gbG9vcHMgb3Ige0Bjb2RlIE9iamVjdC5rZXlzfSxcbiAgICogPGxpPm1vbmtleSBwYXRjaGluZyB0aG9zZSByZWZsZWN0aXZlIG1ldGhvZHMgdGhhdCB3b3VsZFxuICAgKiAgICAgcHJldmVudCBleHRlbnNpb25zLCB0byBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgZmlyc3QsXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgbWV0aG9kcyB0aGF0IHdvdWxkIHJldmVhbCB0aGlzXG4gICAqICAgICBoaWRkZW4gcHJvcGVydHkuXG4gICAqIDwvdWw+XG4gICAqIFVuZm9ydHVuYXRlbHksIGJlY2F1c2Ugb2Ygc2FtZS1vcmlnaW4gaWZyYW1lcywgd2UgY2Fubm90IHJlbGlhYmx5XG4gICAqIGFkZCB0aGlzIGhpZGRlbiBwcm9wZXJ0eSBiZWZvcmUgYW4gb2JqZWN0IGJlY29tZXNcbiAgICogbm9uLWV4dGVuc2libGUuIEluc3RlYWQsIGlmIHdlIGVuY291bnRlciBhIG5vbi1leHRlbnNpYmxlIG9iamVjdFxuICAgKiB3aXRob3V0IGEgaGlkZGVuIHJlY29yZCB0aGF0IHdlIGNhbiBkZXRlY3QgKHdoZXRoZXIgb3Igbm90IGl0IGhhc1xuICAgKiBhIGhpZGRlbiByZWNvcmQgc3RvcmVkIHVuZGVyIGEgbmFtZSBzZWNyZXQgdG8gdXMpLCB0aGVuIHdlIGp1c3RcbiAgICogdXNlIHRoZSBrZXkgb2JqZWN0IGl0c2VsZiB0byByZXByZXNlbnQgaXRzIGlkZW50aXR5IGluIGEgYnJ1dGVcbiAgICogZm9yY2UgbGVha3kgbWFwIHN0b3JlZCBpbiB0aGUgd2VhayBtYXAsIGxvc2luZyBhbGwgdGhlIGFkdmFudGFnZXNcbiAgICogb2Ygd2Vha25lc3MgZm9yIHRoZXNlLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0SGlkZGVuUmVjb3JkKGtleSkge1xuICAgIGlmIChrZXkgIT09IE9iamVjdChrZXkpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdOb3QgYW4gb2JqZWN0OiAnICsga2V5KTtcbiAgICB9XG4gICAgdmFyIGhpZGRlblJlY29yZCA9IGtleVtISURERU5fTkFNRV07XG4gICAgaWYgKGhpZGRlblJlY29yZCAmJiBoaWRkZW5SZWNvcmQua2V5ID09PSBrZXkpIHsgcmV0dXJuIGhpZGRlblJlY29yZDsgfVxuICAgIGlmICghaXNFeHRlbnNpYmxlKGtleSkpIHtcbiAgICAgIC8vIFdlYWsgbWFwIG11c3QgYnJ1dGUgZm9yY2UsIGFzIGV4cGxhaW5lZCBpbiBkb2MtY29tbWVudCBhYm92ZS5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuXG4gICAgLy8gVGhlIGhpZGRlblJlY29yZCBhbmQgdGhlIGtleSBwb2ludCBkaXJlY3RseSBhdCBlYWNoIG90aGVyLCB2aWFcbiAgICAvLyB0aGUgXCJrZXlcIiBhbmQgSElEREVOX05BTUUgcHJvcGVydGllcyByZXNwZWN0aXZlbHkuIFRoZSBrZXlcbiAgICAvLyBmaWVsZCBpcyBmb3IgcXVpY2tseSB2ZXJpZnlpbmcgdGhhdCB0aGlzIGhpZGRlbiByZWNvcmQgaXMgYW5cbiAgICAvLyBvd24gcHJvcGVydHksIG5vdCBhIGhpZGRlbiByZWNvcmQgZnJvbSB1cCB0aGUgcHJvdG90eXBlIGNoYWluLlxuICAgIC8vXG4gICAgLy8gTk9URTogQmVjYXVzZSB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGlzIG1lYW50IG9ubHkgZm9yIHN5c3RlbXMgbGlrZVxuICAgIC8vIFNFUyB3aGVyZSBPYmplY3QucHJvdG90eXBlIGlzIGZyb3plbiB3aXRob3V0IGFueSBudW1lcmljXG4gICAgLy8gcHJvcGVydGllcywgaXQgaXMgb2sgdG8gdXNlIGFuIG9iamVjdCBsaXRlcmFsIGZvciB0aGUgaGlkZGVuUmVjb3JkLlxuICAgIC8vIFRoaXMgaGFzIHR3byBhZHZhbnRhZ2VzOlxuICAgIC8vICogSXQgaXMgbXVjaCBmYXN0ZXIgaW4gYSBwZXJmb3JtYW5jZSBjcml0aWNhbCBwbGFjZVxuICAgIC8vICogSXQgYXZvaWRzIHJlbHlpbmcgb24gT2JqZWN0LmNyZWF0ZShudWxsKSwgd2hpY2ggaGFkIGJlZW5cbiAgICAvLyAgIHByb2JsZW1hdGljIG9uIENocm9tZSAyOC4wLjE0ODAuMC4gU2VlXG4gICAgLy8gICBodHRwczovL2NvZGUuZ29vZ2xlLmNvbS9wL2dvb2dsZS1jYWphL2lzc3Vlcy9kZXRhaWw/aWQ9MTY4N1xuICAgIGhpZGRlblJlY29yZCA9IHsga2V5OiBrZXkgfTtcblxuICAgIC8vIFdoZW4gdXNpbmcgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgd2hlcmVcbiAgICAvLyBPYmplY3QucHJvdG90eXBlIG1pZ2h0IG5vdCBiZSBmcm96ZW4gYW5kIE9iamVjdC5jcmVhdGUobnVsbCkgaXNcbiAgICAvLyByZWxpYWJsZSwgdXNlIHRoZSBmb2xsb3dpbmcgdHdvIGNvbW1lbnRlZCBvdXQgbGluZXMgaW5zdGVhZC5cbiAgICAvLyBoaWRkZW5SZWNvcmQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIC8vIGhpZGRlblJlY29yZC5rZXkgPSBrZXk7XG5cbiAgICAvLyBQbGVhc2UgY29udGFjdCB1cyBpZiB5b3UgbmVlZCB0aGlzIHRvIHdvcmsgb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZFxuICAgIC8vIE9iamVjdC5jcmVhdGUobnVsbCkgbWlnaHQgbm90IGJlIHJlbGlhYmxlLlxuXG4gICAgdHJ5IHtcbiAgICAgIGRlZlByb3Aoa2V5LCBISURERU5fTkFNRSwge1xuICAgICAgICB2YWx1ZTogaGlkZGVuUmVjb3JkLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KTtcbiAgICAgIHJldHVybiBoaWRkZW5SZWNvcmQ7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIFVuZGVyIHNvbWUgY2lyY3Vtc3RhbmNlcywgaXNFeHRlbnNpYmxlIHNlZW1zIHRvIG1pc3JlcG9ydCB3aGV0aGVyXG4gICAgICAvLyB0aGUgSElEREVOX05BTUUgY2FuIGJlIGRlZmluZWQuXG4gICAgICAvLyBUaGUgY2lyY3Vtc3RhbmNlcyBoYXZlIG5vdCBiZWVuIGlzb2xhdGVkLCBidXQgYXQgbGVhc3QgYWZmZWN0XG4gICAgICAvLyBOb2RlLmpzIHYwLjEwLjI2IG9uIFRyYXZpc0NJIC8gTGludXgsIGJ1dCBub3QgdGhlIHNhbWUgdmVyc2lvbiBvZlxuICAgICAgLy8gTm9kZS5qcyBvbiBPUyBYLlxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogTW9ua2V5IHBhdGNoIG9wZXJhdGlvbnMgdGhhdCB3b3VsZCBtYWtlIHRoZWlyIGFyZ3VtZW50XG4gICAqIG5vbi1leHRlbnNpYmxlLlxuICAgKlxuICAgKiA8cD5UaGUgbW9ua2V5IHBhdGNoZWQgdmVyc2lvbnMgdGhyb3cgYSBUeXBlRXJyb3IgaWYgdGhlaXJcbiAgICogYXJndW1lbnQgaXMgbm90IGFuIG9iamVjdCwgc28gaXQgc2hvdWxkIG9ubHkgYmUgZG9uZSB0byBmdW5jdGlvbnNcbiAgICogdGhhdCBzaG91bGQgdGhyb3cgYSBUeXBlRXJyb3IgYW55d2F5IGlmIHRoZWlyIGFyZ3VtZW50IGlzIG5vdCBhblxuICAgKiBvYmplY3QuXG4gICAqL1xuICAoZnVuY3Rpb24oKXtcbiAgICB2YXIgb2xkRnJlZXplID0gT2JqZWN0LmZyZWV6ZTtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ2ZyZWV6ZScsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ0ZyZWV6ZShvYmopIHtcbiAgICAgICAgZ2V0SGlkZGVuUmVjb3JkKG9iaik7XG4gICAgICAgIHJldHVybiBvbGRGcmVlemUob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkU2VhbCA9IE9iamVjdC5zZWFsO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnc2VhbCcsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1NlYWwob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkU2VhbChvYmopO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBvbGRQcmV2ZW50RXh0ZW5zaW9ucyA9IE9iamVjdC5wcmV2ZW50RXh0ZW5zaW9ucztcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3ByZXZlbnRFeHRlbnNpb25zJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aWZ5aW5nUHJldmVudEV4dGVuc2lvbnMob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkUHJldmVudEV4dGVuc2lvbnMob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSkoKTtcblxuICBmdW5jdGlvbiBjb25zdEZ1bmMoZnVuYykge1xuICAgIGZ1bmMucHJvdG90eXBlID0gbnVsbDtcbiAgICByZXR1cm4gT2JqZWN0LmZyZWV6ZShmdW5jKTtcbiAgfVxuXG4gIHZhciBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSBmYWxzZTtcbiAgZnVuY3Rpb24gY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKSB7XG4gICAgLy8gRnV0dXJlIEVTNiBXZWFrTWFwIGlzIGN1cnJlbnRseSAoMjAxMy0wOS0xMCkgZXhwZWN0ZWQgdG8gcmVqZWN0IFdlYWtNYXAoKVxuICAgIC8vIGJ1dCB3ZSB1c2VkIHRvIHBlcm1pdCBpdCBhbmQgZG8gaXQgb3Vyc2VsdmVzLCBzbyB3YXJuIG9ubHkuXG4gICAgaWYgKCFjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgJiYgdHlwZW9mIGNvbnNvbGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZ0RvbmUgPSB0cnVlO1xuICAgICAgY29uc29sZS53YXJuKCdXZWFrTWFwIHNob3VsZCBiZSBpbnZva2VkIGFzIG5ldyBXZWFrTWFwKCksIG5vdCAnICtcbiAgICAgICAgICAnV2Vha01hcCgpLiBUaGlzIHdpbGwgYmUgYW4gZXJyb3IgaW4gdGhlIGZ1dHVyZS4nKTtcbiAgICB9XG4gIH1cblxuICB2YXIgbmV4dElkID0gMDtcblxuICB2YXIgT3VyV2Vha01hcCA9IGZ1bmN0aW9uKCkge1xuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPdXJXZWFrTWFwKSkgeyAgLy8gYXBwcm94aW1hdGUgdGVzdCBmb3IgbmV3IC4uLigpXG4gICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgIH1cblxuICAgIC8vIFdlIGFyZSBjdXJyZW50bHkgKDEyLzI1LzIwMTIpIG5ldmVyIGVuY291bnRlcmluZyBhbnkgcHJlbWF0dXJlbHlcbiAgICAvLyBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciBrZXlzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBwcmVtYXR1cmVseSBub24tZXh0ZW5zaWJsZSBrZXlzLlxuICAgIHZhciB2YWx1ZXMgPSBbXTsgLy8gYnJ1dGUgZm9yY2UgZm9yIGNvcnJlc3BvbmRpbmcgdmFsdWVzLlxuICAgIHZhciBpZCA9IG5leHRJZCsrO1xuXG4gICAgZnVuY3Rpb24gZ2V0X19fKGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZCA/IGhpZGRlblJlY29yZFtpZF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwID8gdmFsdWVzW2luZGV4XSA6IG9wdF9kZWZhdWx0O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhc19fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBrZXlzLmluZGV4T2Yoa2V5KSA+PSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldF9fXyhrZXksIHZhbHVlKSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIGhpZGRlblJlY29yZFtpZF0gPSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAgIC8vIHRoZW4gY29udGludWUgY29tcHV0aW5nIHdpdGggcHJlc3VtYWJseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlblxuICAgICAgICAgIC8vIHVzZSBpdCB0byB1cGRhdGUgYm90aCB0aGUgdmFsdWVzIGFuZCBrZXlzIGFycmF5cywga2VlcGluZ1xuICAgICAgICAgIC8vIHRoZW0gaW4gc3luYy5cbiAgICAgICAgICBpbmRleCA9IGtleXMubGVuZ3RoO1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXMgd2lsbCBiZSBvbmUgbG9uZ2VyIHRoYW4ga2V5cy5cbiAgICAgICAgICBrZXlzW2luZGV4XSA9IGtleTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlX19fKGtleSkge1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgdmFyIGluZGV4LCBsYXN0SW5kZXg7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgJiYgZGVsZXRlIGhpZGRlblJlY29yZFtpZF07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIC8vIFNpbmNlIHNvbWUgYnJvd3NlcnMgcHJlZW1wdGl2ZWx5IHRlcm1pbmF0ZSBzbG93IHR1cm5zIGJ1dFxuICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHBvdGVudGlhbGx5IGNvcnJ1cHRlZCBoZWFwXG4gICAgICAgIC8vIHN0YXRlLCB3ZSBoZXJlIGRlZmVuc2l2ZWx5IGdldCBrZXlzLmxlbmd0aCBmaXJzdCBhbmQgdGhlbiB1c2VcbiAgICAgICAgLy8gaXQgdG8gdXBkYXRlIGJvdGggdGhlIGtleXMgYW5kIHRoZSB2YWx1ZXMgYXJyYXksIGtlZXBpbmdcbiAgICAgICAgLy8gdGhlbSBpbiBzeW5jLiBXZSB1cGRhdGUgdGhlIHR3byB3aXRoIGFuIG9yZGVyIG9mIGFzc2lnbm1lbnRzLFxuICAgICAgICAvLyBzdWNoIHRoYXQgYW55IHByZWZpeCBvZiB0aGVzZSBhc3NpZ25tZW50cyB3aWxsIHByZXNlcnZlIHRoZVxuICAgICAgICAvLyBrZXkvdmFsdWUgY29ycmVzcG9uZGVuY2UsIGVpdGhlciBiZWZvcmUgb3IgYWZ0ZXIgdGhlIGRlbGV0ZS5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHRoaXMgbmVlZHMgdG8gd29yayBjb3JyZWN0bHkgd2hlbiBpbmRleCA9PT0gbGFzdEluZGV4LlxuICAgICAgICBsYXN0SW5kZXggPSBrZXlzLmxlbmd0aCAtIDE7XG4gICAgICAgIGtleXNbaW5kZXhdID0gdm9pZCAwO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB0aGVyZSdzIGEgdm9pZCAwIGluIHRoZSBrZXlzIGFycmF5LCBidXRcbiAgICAgICAgLy8gbm8gb3BlcmF0aW9uIHdpbGwgY2F1c2UgYSBcImtleXMuaW5kZXhPZih2b2lkIDApXCIsIHNpbmNlXG4gICAgICAgIC8vIGdldEhpZGRlblJlY29yZCh2b2lkIDApIHdpbGwgYWx3YXlzIHRocm93IGFuIGVycm9yIGZpcnN0LlxuICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWVzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIHZhbHVlc1tpbmRleF0gY2Fubm90IGJlIGZvdW5kIGhlcmUsXG4gICAgICAgIC8vIGJlY2F1c2Uga2V5c1tpbmRleF0gaXMgdm9pZCAwLlxuICAgICAgICBrZXlzW2luZGV4XSA9IGtleXNbbGFzdEluZGV4XTtcbiAgICAgICAgLy8gSWYgaW5kZXggPT09IGxhc3RJbmRleCBhbmQgd2UgY3Jhc2ggaGVyZSwgdGhlbiBrZXlzW2luZGV4XVxuICAgICAgICAvLyBpcyBzdGlsbCB2b2lkIDAsIHNpbmNlIHRoZSBhbGlhc2luZyBraWxsZWQgdGhlIHByZXZpb3VzIGtleS5cbiAgICAgICAga2V5cy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIGtleXMgd2lsbCBiZSBvbmUgc2hvcnRlciB0aGFuIHZhbHVlcy5cbiAgICAgICAgdmFsdWVzLmxlbmd0aCA9IGxhc3RJbmRleDtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoT3VyV2Vha01hcC5wcm90b3R5cGUsIHtcbiAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGdldF9fXykgfSxcbiAgICAgIGhhc19fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGhhc19fXykgfSxcbiAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKHNldF9fXykgfSxcbiAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRlbGV0ZV9fXykgfVxuICAgIH0pO1xuICB9O1xuXG4gIE91cldlYWtNYXAucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShPYmplY3QucHJvdG90eXBlLCB7XG4gICAgZ2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIFJldHVybiB0aGUgdmFsdWUgbW9zdCByZWNlbnRseSBhc3NvY2lhdGVkIHdpdGgga2V5LCBvclxuICAgICAgICogb3B0X2RlZmF1bHQgaWYgbm9uZS5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBoYXM6IHtcbiAgICAgIC8qKlxuICAgICAgICogSXMgdGhlcmUgYSB2YWx1ZSBhc3NvY2lhdGVkIHdpdGgga2V5IGluIHRoaXMgV2Vha01hcD9cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhhcyhrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGFzX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgc2V0OiB7XG4gICAgICAvKipcbiAgICAgICAqIEFzc29jaWF0ZSB2YWx1ZSB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXAsIG92ZXJ3cml0aW5nIGFueVxuICAgICAgICogcHJldmlvdXMgYXNzb2NpYXRpb24gaWYgcHJlc2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldChrZXksIHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICAnZGVsZXRlJzoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZW1vdmUgYW55IGFzc29jaWF0aW9uIGZvciBrZXkgaW4gdGhpcyBXZWFrTWFwLCByZXR1cm5pbmdcbiAgICAgICAqIHdoZXRoZXIgdGhlcmUgd2FzIG9uZS5cbiAgICAgICAqXG4gICAgICAgKiA8cD5Ob3RlIHRoYXQgdGhlIGJvb2xlYW4gcmV0dXJuIGhlcmUgZG9lcyBub3Qgd29yayBsaWtlIHRoZVxuICAgICAgICoge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IuIFRoZSB7QGNvZGUgZGVsZXRlfSBvcGVyYXRvciByZXR1cm5zXG4gICAgICAgKiB3aGV0aGVyIHRoZSBkZWxldGlvbiBzdWNjZWVkcyBhdCBicmluZ2luZyBhYm91dCBhIHN0YXRlIGluXG4gICAgICAgKiB3aGljaCB0aGUgZGVsZXRlZCBwcm9wZXJ0eSBpcyBhYnNlbnQuIFRoZSB7QGNvZGUgZGVsZXRlfVxuICAgICAgICogb3BlcmF0b3IgdGhlcmVmb3JlIHJldHVybnMgdHJ1ZSBpZiB0aGUgcHJvcGVydHkgd2FzIGFscmVhZHlcbiAgICAgICAqIGFic2VudCwgd2hlcmVhcyB0aGlzIHtAY29kZSBkZWxldGV9IG1ldGhvZCByZXR1cm5zIGZhbHNlIGlmXG4gICAgICAgKiB0aGUgYXNzb2NpYXRpb24gd2FzIGFscmVhZHkgYWJzZW50LlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gcmVtb3ZlKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kZWxldGVfX18oa2V5KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH1cbiAgfSk7XG5cbiAgaWYgKHR5cGVvZiBIb3N0V2Vha01hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgIC8vIElmIHdlIGdvdCBoZXJlLCB0aGVuIHRoZSBwbGF0Zm9ybSBoYXMgYSBXZWFrTWFwIGJ1dCB3ZSBhcmUgY29uY2VybmVkXG4gICAgICAvLyB0aGF0IGl0IG1heSByZWZ1c2UgdG8gc3RvcmUgc29tZSBrZXkgdHlwZXMuIFRoZXJlZm9yZSwgbWFrZSBhIG1hcFxuICAgICAgLy8gaW1wbGVtZW50YXRpb24gd2hpY2ggbWFrZXMgdXNlIG9mIGJvdGggYXMgcG9zc2libGUuXG5cbiAgICAgIC8vIEluIHRoaXMgbW9kZSB3ZSBhcmUgYWx3YXlzIHVzaW5nIGRvdWJsZSBtYXBzLCBzbyB3ZSBhcmUgbm90IHByb3h5LXNhZmUuXG4gICAgICAvLyBUaGlzIGNvbWJpbmF0aW9uIGRvZXMgbm90IG9jY3VyIGluIGFueSBrbm93biBicm93c2VyLCBidXQgd2UgaGFkIGJlc3RcbiAgICAgIC8vIGJlIHNhZmUuXG4gICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSAmJiB0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBEb3VibGVXZWFrTWFwKCkge1xuICAgICAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgICAgIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBQcmVmZXJhYmxlLCB0cnVseSB3ZWFrIG1hcC5cbiAgICAgICAgdmFyIGhtYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcblxuICAgICAgICAvLyBPdXIgaGlkZGVuLXByb3BlcnR5LWJhc2VkIHBzZXVkby13ZWFrLW1hcC4gTGF6aWx5IGluaXRpYWxpemVkIGluIHRoZVxuICAgICAgICAvLyAnc2V0JyBpbXBsZW1lbnRhdGlvbjsgdGh1cyB3ZSBjYW4gYXZvaWQgcGVyZm9ybWluZyBleHRyYSBsb29rdXBzIGlmXG4gICAgICAgIC8vIHdlIGtub3cgYWxsIGVudHJpZXMgYWN0dWFsbHkgc3RvcmVkIGFyZSBlbnRlcmVkIGluICdobWFwJy5cbiAgICAgICAgdmFyIG9tYXAgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgLy8gSGlkZGVuLXByb3BlcnR5IG1hcHMgYXJlIG5vdCBjb21wYXRpYmxlIHdpdGggcHJveGllcyBiZWNhdXNlIHByb3hpZXNcbiAgICAgICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lIGFuZCBlaXRoZXIgYWNjaWRlbnRhbGx5IGV4cG9zZSBpdCBvciBmYWlsXG4gICAgICAgIC8vIHRvIGFsbG93IHRoZSBoaWRkZW4gcHJvcGVydHkgdG8gYmUgc2V0LiBUaGVyZWZvcmUsIHdlIGRvIG5vdCBhbGxvd1xuICAgICAgICAvLyBhcmJpdHJhcnkgV2Vha01hcHMgdG8gc3dpdGNoIHRvIHVzaW5nIGhpZGRlbiBwcm9wZXJ0aWVzLCBidXQgb25seVxuICAgICAgICAvLyB0aG9zZSB3aGljaCBuZWVkIHRoZSBhYmlsaXR5LCBhbmQgdW5wcml2aWxlZ2VkIGNvZGUgaXMgbm90IGFsbG93ZWRcbiAgICAgICAgLy8gdG8gc2V0IHRoZSBmbGFnLlxuICAgICAgICAvL1xuICAgICAgICAvLyAoRXhjZXB0IGluIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgbW9kZSBpbiB3aGljaCBjYXNlIHdlXG4gICAgICAgIC8vIGRpc2FibGUgcHJveGllcy4pXG4gICAgICAgIHZhciBlbmFibGVTd2l0Y2hpbmcgPSBmYWxzZTtcblxuICAgICAgICBmdW5jdGlvbiBkZ2V0KGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgICAgICBpZiAob21hcCkge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgPyBobWFwLmdldChrZXkpXG4gICAgICAgICAgICAgICAgOiBvbWFwLmdldF9fXyhrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGhtYXAuZ2V0KGtleSwgb3B0X2RlZmF1bHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRoYXMoa2V5KSB7XG4gICAgICAgICAgcmV0dXJuIGhtYXAuaGFzKGtleSkgfHwgKG9tYXAgPyBvbWFwLmhhc19fXyhrZXkpIDogZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGRzZXQ7XG4gICAgICAgIGlmIChkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlKSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGhtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKCFobWFwLmhhcyhrZXkpKSB7XG4gICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICBvbWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZHNldCA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIGlmIChlbmFibGVTd2l0Y2hpbmcpIHtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgIGlmICghb21hcCkgeyBvbWFwID0gbmV3IE91cldlYWtNYXAoKTsgfVxuICAgICAgICAgICAgICAgIG9tYXAuc2V0X19fKGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkZGVsZXRlKGtleSkge1xuICAgICAgICAgIHZhciByZXN1bHQgPSAhIWhtYXBbJ2RlbGV0ZSddKGtleSk7XG4gICAgICAgICAgaWYgKG9tYXApIHsgcmV0dXJuIG9tYXAuZGVsZXRlX19fKGtleSkgfHwgcmVzdWx0OyB9XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICAgICAgZ2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGdldCkgfSxcbiAgICAgICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkaGFzKSB9LFxuICAgICAgICAgIHNldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRzZXQpIH0sXG4gICAgICAgICAgZGVsZXRlX19fOiB7IHZhbHVlOiBjb25zdEZ1bmMoZGRlbGV0ZSkgfSxcbiAgICAgICAgICBwZXJtaXRIb3N0T2JqZWN0c19fXzogeyB2YWx1ZTogY29uc3RGdW5jKGZ1bmN0aW9uKHRva2VuKSB7XG4gICAgICAgICAgICBpZiAodG9rZW4gPT09IHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cykge1xuICAgICAgICAgICAgICBlbmFibGVTd2l0Y2hpbmcgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdib2d1cyBjYWxsIHRvIHBlcm1pdEhvc3RPYmplY3RzX19fJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSl9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgRG91YmxlV2Vha01hcC5wcm90b3R5cGUgPSBPdXJXZWFrTWFwLnByb3RvdHlwZTtcbiAgICAgIG1vZHVsZS5leHBvcnRzID0gRG91YmxlV2Vha01hcDtcblxuICAgICAgLy8gZGVmaW5lIC5jb25zdHJ1Y3RvciB0byBoaWRlIE91cldlYWtNYXAgY3RvclxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFdlYWtNYXAucHJvdG90eXBlLCAnY29uc3RydWN0b3InLCB7XG4gICAgICAgIHZhbHVlOiBXZWFrTWFwLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSwgIC8vIGFzIGRlZmF1bHQgLmNvbnN0cnVjdG9yIGlzXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgIH0pKCk7XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlcmUgaXMgbm8gaG9zdCBXZWFrTWFwLCBzbyB3ZSBtdXN0IHVzZSB0aGUgZW11bGF0aW9uLlxuXG4gICAgLy8gRW11bGF0ZWQgV2Vha01hcHMgYXJlIGluY29tcGF0aWJsZSB3aXRoIG5hdGl2ZSBwcm94aWVzIChiZWNhdXNlIHByb3hpZXNcbiAgICAvLyBjYW4gb2JzZXJ2ZSB0aGUgaGlkZGVuIG5hbWUpLCBzbyB3ZSBtdXN0IGRpc2FibGUgUHJveHkgdXNhZ2UgKGluXG4gICAgLy8gQXJyYXlMaWtlIGFuZCBEb21hZG8sIGN1cnJlbnRseSkuXG4gICAgaWYgKHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIFByb3h5ID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIG1vZHVsZS5leHBvcnRzID0gT3VyV2Vha01hcDtcbiAgfVxufSkoKTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYWstbWFwL3dlYWstbWFwLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBwb29sID0gcmVxdWlyZShcInR5cGVkYXJyYXktcG9vbFwiKVxudmFyIG9wcyA9IHJlcXVpcmUoXCJuZGFycmF5LW9wc1wiKVxudmFyIG5kYXJyYXkgPSByZXF1aXJlKFwibmRhcnJheVwiKVxuXG52YXIgU1VQUE9SVEVEX1RZUEVTID0gW1xuICBcInVpbnQ4XCIsXG4gIFwidWludDhfY2xhbXBlZFwiLFxuICBcInVpbnQxNlwiLFxuICBcInVpbnQzMlwiLFxuICBcImludDhcIixcbiAgXCJpbnQxNlwiLFxuICBcImludDMyXCIsXG4gIFwiZmxvYXQzMlwiIF1cblxuZnVuY3Rpb24gR0xCdWZmZXIoZ2wsIHR5cGUsIGhhbmRsZSwgbGVuZ3RoLCB1c2FnZSkge1xuICB0aGlzLmdsID0gZ2xcbiAgdGhpcy50eXBlID0gdHlwZVxuICB0aGlzLmhhbmRsZSA9IGhhbmRsZVxuICB0aGlzLmxlbmd0aCA9IGxlbmd0aFxuICB0aGlzLnVzYWdlID0gdXNhZ2Vcbn1cblxudmFyIHByb3RvID0gR0xCdWZmZXIucHJvdG90eXBlXG5cbnByb3RvLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nbC5iaW5kQnVmZmVyKHRoaXMudHlwZSwgdGhpcy5oYW5kbGUpXG59XG5cbnByb3RvLnVuYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCBudWxsKVxufVxuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2wuZGVsZXRlQnVmZmVyKHRoaXMuaGFuZGxlKVxufVxuXG5mdW5jdGlvbiB1cGRhdGVUeXBlQXJyYXkoZ2wsIHR5cGUsIGxlbiwgdXNhZ2UsIGRhdGEsIG9mZnNldCkge1xuICB2YXIgZGF0YUxlbiA9IGRhdGEubGVuZ3RoICogZGF0YS5CWVRFU19QRVJfRUxFTUVOVFxuICBpZihvZmZzZXQgPCAwKSB7XG4gICAgZ2wuYnVmZmVyRGF0YSh0eXBlLCBkYXRhLCB1c2FnZSlcbiAgICByZXR1cm4gZGF0YUxlblxuICB9XG4gIGlmKGRhdGFMZW4gKyBvZmZzZXQgPiBsZW4pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IElmIHJlc2l6aW5nIGJ1ZmZlciwgbXVzdCBub3Qgc3BlY2lmeSBvZmZzZXRcIilcbiAgfVxuICBnbC5idWZmZXJTdWJEYXRhKHR5cGUsIG9mZnNldCwgZGF0YSlcbiAgcmV0dXJuIGxlblxufVxuXG5mdW5jdGlvbiBtYWtlU2NyYXRjaFR5cGVBcnJheShhcnJheSwgZHR5cGUpIHtcbiAgdmFyIHJlcyA9IHBvb2wubWFsbG9jKGFycmF5Lmxlbmd0aCwgZHR5cGUpXG4gIHZhciBuID0gYXJyYXkubGVuZ3RoXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIHJlc1tpXSA9IGFycmF5W2ldXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBpc1BhY2tlZChzaGFwZSwgc3RyaWRlKSB7XG4gIHZhciBuID0gMVxuICBmb3IodmFyIGk9c3RyaWRlLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICBpZihzdHJpZGVbaV0gIT09IG4pIHtcbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbiAgICBuICo9IHNoYXBlW2ldXG4gIH1cbiAgcmV0dXJuIHRydWVcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oYXJyYXksIG9mZnNldCkge1xuICBpZih0eXBlb2Ygb2Zmc2V0ICE9PSBcIm51bWJlclwiKSB7XG4gICAgb2Zmc2V0ID0gLTFcbiAgfVxuICB0aGlzLmJpbmQoKVxuICBpZih0eXBlb2YgYXJyYXkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGFycmF5LnNoYXBlICE9PSBcInVuZGVmaW5lZFwiKSB7IC8vbmRhcnJheVxuICAgIHZhciBkdHlwZSA9IGFycmF5LmR0eXBlXG4gICAgaWYoU1VQUE9SVEVEX1RZUEVTLmluZGV4T2YoZHR5cGUpIDwgMCkge1xuICAgICAgZHR5cGUgPSBcImZsb2F0MzJcIlxuICAgIH1cbiAgICBpZih0aGlzLnR5cGUgPT09IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIpIHtcbiAgICAgIHZhciBleHQgPSBnbC5nZXRFeHRlbnNpb24oJ09FU19lbGVtZW50X2luZGV4X3VpbnQnKVxuICAgICAgaWYoZXh0ICYmIGR0eXBlICE9PSBcInVpbnQxNlwiKSB7XG4gICAgICAgIGR0eXBlID0gXCJ1aW50MzJcIlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHR5cGUgPSBcInVpbnQxNlwiXG4gICAgICB9XG4gICAgfVxuICAgIGlmKGR0eXBlID09PSBhcnJheS5kdHlwZSAmJiBpc1BhY2tlZChhcnJheS5zaGFwZSwgYXJyYXkuc3RyaWRlKSkge1xuICAgICAgaWYoYXJyYXkub2Zmc2V0ID09PSAwICYmIGFycmF5LmRhdGEubGVuZ3RoID09PSBhcnJheS5zaGFwZVswXSkge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCBhcnJheS5kYXRhLCBvZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCBhcnJheS5kYXRhLnN1YmFycmF5KGFycmF5Lm9mZnNldCwgYXJyYXkuc2hhcGVbMF0pLCBvZmZzZXQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB0bXAgPSBwb29sLm1hbGxvYyhhcnJheS5zaXplLCBkdHlwZSlcbiAgICAgIHZhciBuZHQgPSBuZGFycmF5KHRtcCwgYXJyYXkuc2hhcGUpXG4gICAgICBvcHMuYXNzaWduKG5kdCwgYXJyYXkpXG4gICAgICBpZihvZmZzZXQgPCAwKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIHRtcCwgb2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdG1wLnN1YmFycmF5KDAsIGFycmF5LnNpemUpLCBvZmZzZXQpXG4gICAgICB9XG4gICAgICBwb29sLmZyZWUodG1wKVxuICAgIH1cbiAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoYXJyYXkpKSB7IC8vVmFuaWxsYSBhcnJheVxuICAgIHZhciB0XG4gICAgaWYodGhpcy50eXBlID09PSB0aGlzLmdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSKSB7XG4gICAgICB0ID0gbWFrZVNjcmF0Y2hUeXBlQXJyYXkoYXJyYXksIFwidWludDE2XCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHQgPSBtYWtlU2NyYXRjaFR5cGVBcnJheShhcnJheSwgXCJmbG9hdDMyXCIpXG4gICAgfVxuICAgIGlmKG9mZnNldCA8IDApIHtcbiAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIHQsIG9mZnNldClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdC5zdWJhcnJheSgwLCBhcnJheS5sZW5ndGgpLCBvZmZzZXQpXG4gICAgfVxuICAgIHBvb2wuZnJlZSh0KVxuICB9IGVsc2UgaWYodHlwZW9mIGFycmF5ID09PSBcIm9iamVjdFwiICYmIHR5cGVvZiBhcnJheS5sZW5ndGggPT09IFwibnVtYmVyXCIpIHsgLy9UeXBlZCBhcnJheVxuICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIGFycmF5LCBvZmZzZXQpXG4gIH0gZWxzZSBpZih0eXBlb2YgYXJyYXkgPT09IFwibnVtYmVyXCIgfHwgYXJyYXkgPT09IHVuZGVmaW5lZCkgeyAvL051bWJlci9kZWZhdWx0XG4gICAgaWYob2Zmc2V0ID49IDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogQ2Fubm90IHNwZWNpZnkgb2Zmc2V0IHdoZW4gcmVzaXppbmcgYnVmZmVyXCIpXG4gICAgfVxuICAgIGFycmF5ID0gYXJyYXkgfCAwXG4gICAgaWYoYXJyYXkgPD0gMCkge1xuICAgICAgYXJyYXkgPSAxXG4gICAgfVxuICAgIHRoaXMuZ2wuYnVmZmVyRGF0YSh0aGlzLnR5cGUsIGFycmF5fDAsIHRoaXMudXNhZ2UpXG4gICAgdGhpcy5sZW5ndGggPSBhcnJheVxuICB9IGVsc2UgeyAvL0Vycm9yLCBjYXNlIHNob3VsZCBub3QgaGFwcGVuXG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJbnZhbGlkIGRhdGEgdHlwZVwiKVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlcihnbCwgZGF0YSwgdHlwZSwgdXNhZ2UpIHtcbiAgdHlwZSA9IHR5cGUgfHwgZ2wuQVJSQVlfQlVGRkVSXG4gIHVzYWdlID0gdXNhZ2UgfHwgZ2wuRFlOQU1JQ19EUkFXXG4gIGlmKHR5cGUgIT09IGdsLkFSUkFZX0JVRkZFUiAmJiB0eXBlICE9PSBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogSW52YWxpZCB0eXBlIGZvciB3ZWJnbCBidWZmZXIsIG11c3QgYmUgZWl0aGVyIGdsLkFSUkFZX0JVRkZFUiBvciBnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUlwiKVxuICB9XG4gIGlmKHVzYWdlICE9PSBnbC5EWU5BTUlDX0RSQVcgJiYgdXNhZ2UgIT09IGdsLlNUQVRJQ19EUkFXICYmIHVzYWdlICE9PSBnbC5TVFJFQU1fRFJBVykge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogSW52YWxpZCB1c2FnZSBmb3IgYnVmZmVyLCBtdXN0IGJlIGVpdGhlciBnbC5EWU5BTUlDX0RSQVcsIGdsLlNUQVRJQ19EUkFXIG9yIGdsLlNUUkVBTV9EUkFXXCIpXG4gIH1cbiAgdmFyIGhhbmRsZSA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gIHZhciByZXN1bHQgPSBuZXcgR0xCdWZmZXIoZ2wsIHR5cGUsIGhhbmRsZSwgMCwgdXNhZ2UpXG4gIHJlc3VsdC51cGRhdGUoZGF0YSlcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUJ1ZmZlclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtYnVmZmVyL2J1ZmZlci5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxudmFyIGJpdHMgPSByZXF1aXJlKCdiaXQtdHdpZGRsZScpXG52YXIgZHVwID0gcmVxdWlyZSgnZHVwJylcblxuLy9MZWdhY3kgcG9vbCBzdXBwb3J0XG5pZighZ2xvYmFsLl9fVFlQRURBUlJBWV9QT09MKSB7XG4gIGdsb2JhbC5fX1RZUEVEQVJSQVlfUE9PTCA9IHtcbiAgICAgIFVJTlQ4ICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQxNiAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQzMiAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDggICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDE2ICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDMyICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIEZMT0FUICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIERPVUJMRSAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIERBVEEgICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQ4QyAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIEJVRkZFUiAgOiBkdXAoWzMyLCAwXSlcbiAgfVxufVxuXG52YXIgaGFzVWludDhDID0gKHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSkgIT09ICd1bmRlZmluZWQnXG52YXIgUE9PTCA9IGdsb2JhbC5fX1RZUEVEQVJSQVlfUE9PTFxuXG4vL1VwZ3JhZGUgcG9vbFxuaWYoIVBPT0wuVUlOVDhDKSB7XG4gIFBPT0wuVUlOVDhDID0gZHVwKFszMiwgMF0pXG59XG5pZighUE9PTC5CVUZGRVIpIHtcbiAgUE9PTC5CVUZGRVIgPSBkdXAoWzMyLCAwXSlcbn1cblxuLy9OZXcgdGVjaG5pcXVlOiBPbmx5IGFsbG9jYXRlIGZyb20gQXJyYXlCdWZmZXJWaWV3IGFuZCBCdWZmZXJcbnZhciBEQVRBICAgID0gUE9PTC5EQVRBXG4gICwgQlVGRkVSICA9IFBPT0wuQlVGRkVSXG5cbmV4cG9ydHMuZnJlZSA9IGZ1bmN0aW9uIGZyZWUoYXJyYXkpIHtcbiAgaWYoQnVmZmVyLmlzQnVmZmVyKGFycmF5KSkge1xuICAgIEJVRkZFUltiaXRzLmxvZzIoYXJyYXkubGVuZ3RoKV0ucHVzaChhcnJheSlcbiAgfSBlbHNlIHtcbiAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpICE9PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG4gICAgICBhcnJheSA9IGFycmF5LmJ1ZmZlclxuICAgIH1cbiAgICBpZighYXJyYXkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgbiA9IGFycmF5Lmxlbmd0aCB8fCBhcnJheS5ieXRlTGVuZ3RoXG4gICAgdmFyIGxvZ19uID0gYml0cy5sb2cyKG4pfDBcbiAgICBEQVRBW2xvZ19uXS5wdXNoKGFycmF5KVxuICB9XG59XG5cbmZ1bmN0aW9uIGZyZWVBcnJheUJ1ZmZlcihidWZmZXIpIHtcbiAgaWYoIWJ1ZmZlcikge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBuID0gYnVmZmVyLmxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aFxuICB2YXIgbG9nX24gPSBiaXRzLmxvZzIobilcbiAgREFUQVtsb2dfbl0ucHVzaChidWZmZXIpXG59XG5cbmZ1bmN0aW9uIGZyZWVUeXBlZEFycmF5KGFycmF5KSB7XG4gIGZyZWVBcnJheUJ1ZmZlcihhcnJheS5idWZmZXIpXG59XG5cbmV4cG9ydHMuZnJlZVVpbnQ4ID1cbmV4cG9ydHMuZnJlZVVpbnQxNiA9XG5leHBvcnRzLmZyZWVVaW50MzIgPVxuZXhwb3J0cy5mcmVlSW50OCA9XG5leHBvcnRzLmZyZWVJbnQxNiA9XG5leHBvcnRzLmZyZWVJbnQzMiA9XG5leHBvcnRzLmZyZWVGbG9hdDMyID0gXG5leHBvcnRzLmZyZWVGbG9hdCA9XG5leHBvcnRzLmZyZWVGbG9hdDY0ID0gXG5leHBvcnRzLmZyZWVEb3VibGUgPSBcbmV4cG9ydHMuZnJlZVVpbnQ4Q2xhbXBlZCA9IFxuZXhwb3J0cy5mcmVlRGF0YVZpZXcgPSBmcmVlVHlwZWRBcnJheVxuXG5leHBvcnRzLmZyZWVBcnJheUJ1ZmZlciA9IGZyZWVBcnJheUJ1ZmZlclxuXG5leHBvcnRzLmZyZWVCdWZmZXIgPSBmdW5jdGlvbiBmcmVlQnVmZmVyKGFycmF5KSB7XG4gIEJVRkZFUltiaXRzLmxvZzIoYXJyYXkubGVuZ3RoKV0ucHVzaChhcnJheSlcbn1cblxuZXhwb3J0cy5tYWxsb2MgPSBmdW5jdGlvbiBtYWxsb2MobiwgZHR5cGUpIHtcbiAgaWYoZHR5cGUgPT09IHVuZGVmaW5lZCB8fCBkdHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgIHJldHVybiBtYWxsb2NBcnJheUJ1ZmZlcihuKVxuICB9IGVsc2Uge1xuICAgIHN3aXRjaChkdHlwZSkge1xuICAgICAgY2FzZSAndWludDgnOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDgobilcbiAgICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50MTYobilcbiAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50MzIobilcbiAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICByZXR1cm4gbWFsbG9jSW50OChuKVxuICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICByZXR1cm4gbWFsbG9jSW50MTYobilcbiAgICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0ludDMyKG4pXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0Zsb2F0KG4pXG4gICAgICBjYXNlICdkb3VibGUnOlxuICAgICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICAgIHJldHVybiBtYWxsb2NEb3VibGUobilcbiAgICAgIGNhc2UgJ3VpbnQ4X2NsYW1wZWQnOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDhDbGFtcGVkKG4pXG4gICAgICBjYXNlICdidWZmZXInOlxuICAgICAgICByZXR1cm4gbWFsbG9jQnVmZmVyKG4pXG4gICAgICBjYXNlICdkYXRhJzpcbiAgICAgIGNhc2UgJ2RhdGF2aWV3JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0RhdGFWaWV3KG4pXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIG1hbGxvY0FycmF5QnVmZmVyKG4pIHtcbiAgdmFyIG4gPSBiaXRzLm5leHRQb3cyKG4pXG4gIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKVxuICB2YXIgZCA9IERBVEFbbG9nX25dXG4gIGlmKGQubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBkLnBvcCgpXG4gIH1cbiAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcihuKVxufVxuZXhwb3J0cy5tYWxsb2NBcnJheUJ1ZmZlciA9IG1hbGxvY0FycmF5QnVmZmVyXG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQ4KG4pIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NVaW50OCA9IG1hbGxvY1VpbnQ4XG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQxNihuKSB7XG4gIHJldHVybiBuZXcgVWludDE2QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoMipuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jVWludDE2ID0gbWFsbG9jVWludDE2XG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQzMihuKSB7XG4gIHJldHVybiBuZXcgVWludDMyQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoNCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jVWludDMyID0gbWFsbG9jVWludDMyXG5cbmZ1bmN0aW9uIG1hbGxvY0ludDgobikge1xuICByZXR1cm4gbmV3IEludDhBcnJheShtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jSW50OCA9IG1hbGxvY0ludDhcblxuZnVuY3Rpb24gbWFsbG9jSW50MTYobikge1xuICByZXR1cm4gbmV3IEludDE2QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoMipuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jSW50MTYgPSBtYWxsb2NJbnQxNlxuXG5mdW5jdGlvbiBtYWxsb2NJbnQzMihuKSB7XG4gIHJldHVybiBuZXcgSW50MzJBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig0Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NJbnQzMiA9IG1hbGxvY0ludDMyXG5cbmZ1bmN0aW9uIG1hbGxvY0Zsb2F0KG4pIHtcbiAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoNCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jRmxvYXQzMiA9IGV4cG9ydHMubWFsbG9jRmxvYXQgPSBtYWxsb2NGbG9hdFxuXG5mdW5jdGlvbiBtYWxsb2NEb3VibGUobikge1xuICByZXR1cm4gbmV3IEZsb2F0NjRBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig4Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NGbG9hdDY0ID0gZXhwb3J0cy5tYWxsb2NEb3VibGUgPSBtYWxsb2NEb3VibGVcblxuZnVuY3Rpb24gbWFsbG9jVWludDhDbGFtcGVkKG4pIHtcbiAgaWYoaGFzVWludDhDKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OENsYW1wZWRBcnJheShtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFsbG9jVWludDgobilcbiAgfVxufVxuZXhwb3J0cy5tYWxsb2NVaW50OENsYW1wZWQgPSBtYWxsb2NVaW50OENsYW1wZWRcblxuZnVuY3Rpb24gbWFsbG9jRGF0YVZpZXcobikge1xuICByZXR1cm4gbmV3IERhdGFWaWV3KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NEYXRhVmlldyA9IG1hbGxvY0RhdGFWaWV3XG5cbmZ1bmN0aW9uIG1hbGxvY0J1ZmZlcihuKSB7XG4gIG4gPSBiaXRzLm5leHRQb3cyKG4pXG4gIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKVxuICB2YXIgY2FjaGUgPSBCVUZGRVJbbG9nX25dXG4gIGlmKGNhY2hlLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2FjaGUucG9wKClcbiAgfVxuICByZXR1cm4gbmV3IEJ1ZmZlcihuKVxufVxuZXhwb3J0cy5tYWxsb2NCdWZmZXIgPSBtYWxsb2NCdWZmZXJcblxuZXhwb3J0cy5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgZm9yKHZhciBpPTA7IGk8MzI7ICsraSkge1xuICAgIFBPT0wuVUlOVDhbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuVUlOVDE2W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLlVJTlQzMltpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5JTlQ4W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLklOVDE2W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLklOVDMyW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLkZMT0FUW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLkRPVUJMRVtpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5VSU5UOENbaV0ubGVuZ3RoID0gMFxuICAgIERBVEFbaV0ubGVuZ3RoID0gMFxuICAgIEJVRkZFUltpXS5sZW5ndGggPSAwXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlZGFycmF5LXBvb2wvcG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gNDJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIFRoZSBidWZmZXIgbW9kdWxlIGZyb20gbm9kZS5qcywgZm9yIHRoZSBicm93c2VyLlxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wcm90byAqL1xuXG4ndXNlIHN0cmljdCdcblxudmFyIGJhc2U2NCA9IHJlcXVpcmUoJ2Jhc2U2NC1qcycpXG52YXIgaWVlZTc1NCA9IHJlcXVpcmUoJ2llZWU3NTQnKVxudmFyIGlzQXJyYXkgPSByZXF1aXJlKCdpc2FycmF5JylcblxuZXhwb3J0cy5CdWZmZXIgPSBCdWZmZXJcbmV4cG9ydHMuU2xvd0J1ZmZlciA9IFNsb3dCdWZmZXJcbmV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVMgPSA1MFxuXG4vKipcbiAqIElmIGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGA6XG4gKiAgID09PSB0cnVlICAgIFVzZSBVaW50OEFycmF5IGltcGxlbWVudGF0aW9uIChmYXN0ZXN0KVxuICogICA9PT0gZmFsc2UgICBVc2UgT2JqZWN0IGltcGxlbWVudGF0aW9uIChtb3N0IGNvbXBhdGlibGUsIGV2ZW4gSUU2KVxuICpcbiAqIEJyb3dzZXJzIHRoYXQgc3VwcG9ydCB0eXBlZCBhcnJheXMgYXJlIElFIDEwKywgRmlyZWZveCA0KywgQ2hyb21lIDcrLCBTYWZhcmkgNS4xKyxcbiAqIE9wZXJhIDExLjYrLCBpT1MgNC4yKy5cbiAqXG4gKiBEdWUgdG8gdmFyaW91cyBicm93c2VyIGJ1Z3MsIHNvbWV0aW1lcyB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uIHdpbGwgYmUgdXNlZCBldmVuXG4gKiB3aGVuIHRoZSBicm93c2VyIHN1cHBvcnRzIHR5cGVkIGFycmF5cy5cbiAqXG4gKiBOb3RlOlxuICpcbiAqICAgLSBGaXJlZm94IDQtMjkgbGFja3Mgc3VwcG9ydCBmb3IgYWRkaW5nIG5ldyBwcm9wZXJ0aWVzIHRvIGBVaW50OEFycmF5YCBpbnN0YW5jZXMsXG4gKiAgICAgU2VlOiBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD02OTU0MzguXG4gKlxuICogICAtIENocm9tZSA5LTEwIGlzIG1pc3NpbmcgdGhlIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24uXG4gKlxuICogICAtIElFMTAgaGFzIGEgYnJva2VuIGBUeXBlZEFycmF5LnByb3RvdHlwZS5zdWJhcnJheWAgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhcnJheXMgb2ZcbiAqICAgICBpbmNvcnJlY3QgbGVuZ3RoIGluIHNvbWUgc2l0dWF0aW9ucy5cblxuICogV2UgZGV0ZWN0IHRoZXNlIGJ1Z2d5IGJyb3dzZXJzIGFuZCBzZXQgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYCB0byBgZmFsc2VgIHNvIHRoZXlcbiAqIGdldCB0aGUgT2JqZWN0IGltcGxlbWVudGF0aW9uLCB3aGljaCBpcyBzbG93ZXIgYnV0IGJlaGF2ZXMgY29ycmVjdGx5LlxuICovXG5CdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCA9IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUICE9PSB1bmRlZmluZWRcbiAgPyBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVFxuICA6IHR5cGVkQXJyYXlTdXBwb3J0KClcblxuLypcbiAqIEV4cG9ydCBrTWF4TGVuZ3RoIGFmdGVyIHR5cGVkIGFycmF5IHN1cHBvcnQgaXMgZGV0ZXJtaW5lZC5cbiAqL1xuZXhwb3J0cy5rTWF4TGVuZ3RoID0ga01heExlbmd0aCgpXG5cbmZ1bmN0aW9uIHR5cGVkQXJyYXlTdXBwb3J0ICgpIHtcbiAgdHJ5IHtcbiAgICB2YXIgYXJyID0gbmV3IFVpbnQ4QXJyYXkoMSlcbiAgICBhcnIuX19wcm90b19fID0ge19fcHJvdG9fXzogVWludDhBcnJheS5wcm90b3R5cGUsIGZvbzogZnVuY3Rpb24gKCkgeyByZXR1cm4gNDIgfX1cbiAgICByZXR1cm4gYXJyLmZvbygpID09PSA0MiAmJiAvLyB0eXBlZCBhcnJheSBpbnN0YW5jZXMgY2FuIGJlIGF1Z21lbnRlZFxuICAgICAgICB0eXBlb2YgYXJyLnN1YmFycmF5ID09PSAnZnVuY3Rpb24nICYmIC8vIGNocm9tZSA5LTEwIGxhY2sgYHN1YmFycmF5YFxuICAgICAgICBhcnIuc3ViYXJyYXkoMSwgMSkuYnl0ZUxlbmd0aCA9PT0gMCAvLyBpZTEwIGhhcyBicm9rZW4gYHN1YmFycmF5YFxuICB9IGNhdGNoIChlKSB7XG4gICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuZnVuY3Rpb24ga01heExlbmd0aCAoKSB7XG4gIHJldHVybiBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVFxuICAgID8gMHg3ZmZmZmZmZlxuICAgIDogMHgzZmZmZmZmZlxufVxuXG5mdW5jdGlvbiBjcmVhdGVCdWZmZXIgKHRoYXQsIGxlbmd0aCkge1xuICBpZiAoa01heExlbmd0aCgpIDwgbGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0ludmFsaWQgdHlwZWQgYXJyYXkgbGVuZ3RoJylcbiAgfVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICBpZiAodGhhdCA9PT0gbnVsbCkge1xuICAgICAgdGhhdCA9IG5ldyBCdWZmZXIobGVuZ3RoKVxuICAgIH1cbiAgICB0aGF0Lmxlbmd0aCA9IGxlbmd0aFxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBUaGUgQnVmZmVyIGNvbnN0cnVjdG9yIHJldHVybnMgaW5zdGFuY2VzIG9mIGBVaW50OEFycmF5YCB0aGF0IGhhdmUgdGhlaXJcbiAqIHByb3RvdHlwZSBjaGFuZ2VkIHRvIGBCdWZmZXIucHJvdG90eXBlYC4gRnVydGhlcm1vcmUsIGBCdWZmZXJgIGlzIGEgc3ViY2xhc3Mgb2ZcbiAqIGBVaW50OEFycmF5YCwgc28gdGhlIHJldHVybmVkIGluc3RhbmNlcyB3aWxsIGhhdmUgYWxsIHRoZSBub2RlIGBCdWZmZXJgIG1ldGhvZHNcbiAqIGFuZCB0aGUgYFVpbnQ4QXJyYXlgIG1ldGhvZHMuIFNxdWFyZSBicmFja2V0IG5vdGF0aW9uIHdvcmtzIGFzIGV4cGVjdGVkIC0tIGl0XG4gKiByZXR1cm5zIGEgc2luZ2xlIG9jdGV0LlxuICpcbiAqIFRoZSBgVWludDhBcnJheWAgcHJvdG90eXBlIHJlbWFpbnMgdW5tb2RpZmllZC5cbiAqL1xuXG5mdW5jdGlvbiBCdWZmZXIgKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiYgISh0aGlzIGluc3RhbmNlb2YgQnVmZmVyKSkge1xuICAgIHJldHVybiBuZXcgQnVmZmVyKGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgLy8gQ29tbW9uIGNhc2UuXG4gIGlmICh0eXBlb2YgYXJnID09PSAnbnVtYmVyJykge1xuICAgIGlmICh0eXBlb2YgZW5jb2RpbmdPck9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0lmIGVuY29kaW5nIGlzIHNwZWNpZmllZCB0aGVuIHRoZSBmaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nJ1xuICAgICAgKVxuICAgIH1cbiAgICByZXR1cm4gYWxsb2NVbnNhZmUodGhpcywgYXJnKVxuICB9XG4gIHJldHVybiBmcm9tKHRoaXMsIGFyZywgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucG9vbFNpemUgPSA4MTkyIC8vIG5vdCB1c2VkIGJ5IHRoaXMgaW1wbGVtZW50YXRpb25cblxuLy8gVE9ETzogTGVnYWN5LCBub3QgbmVlZGVkIGFueW1vcmUuIFJlbW92ZSBpbiBuZXh0IG1ham9yIHZlcnNpb24uXG5CdWZmZXIuX2F1Z21lbnQgPSBmdW5jdGlvbiAoYXJyKSB7XG4gIGFyci5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gZnJvbSAodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBhIG51bWJlcicpXG4gIH1cblxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgcmV0dXJuIGZyb21BcnJheUJ1ZmZlcih0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gZnJvbVN0cmluZyh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldClcbiAgfVxuXG4gIHJldHVybiBmcm9tT2JqZWN0KHRoYXQsIHZhbHVlKVxufVxuXG4vKipcbiAqIEZ1bmN0aW9uYWxseSBlcXVpdmFsZW50IHRvIEJ1ZmZlcihhcmcsIGVuY29kaW5nKSBidXQgdGhyb3dzIGEgVHlwZUVycm9yXG4gKiBpZiB2YWx1ZSBpcyBhIG51bWJlci5cbiAqIEJ1ZmZlci5mcm9tKHN0clssIGVuY29kaW5nXSlcbiAqIEJ1ZmZlci5mcm9tKGFycmF5KVxuICogQnVmZmVyLmZyb20oYnVmZmVyKVxuICogQnVmZmVyLmZyb20oYXJyYXlCdWZmZXJbLCBieXRlT2Zmc2V0WywgbGVuZ3RoXV0pXG4gKiovXG5CdWZmZXIuZnJvbSA9IGZ1bmN0aW9uICh2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBmcm9tKG51bGwsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbmlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICBCdWZmZXIucHJvdG90eXBlLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXkucHJvdG90eXBlXG4gIEJ1ZmZlci5fX3Byb3RvX18gPSBVaW50OEFycmF5XG4gIGlmICh0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wuc3BlY2llcyAmJlxuICAgICAgQnVmZmVyW1N5bWJvbC5zcGVjaWVzXSA9PT0gQnVmZmVyKSB7XG4gICAgLy8gRml4IHN1YmFycmF5KCkgaW4gRVMyMDE2LiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9mZXJvc3MvYnVmZmVyL3B1bGwvOTdcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQnVmZmVyLCBTeW1ib2wuc3BlY2llcywge1xuICAgICAgdmFsdWU6IG51bGwsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KVxuICB9XG59XG5cbmZ1bmN0aW9uIGFzc2VydFNpemUgKHNpemUpIHtcbiAgaWYgKHR5cGVvZiBzaXplICE9PSAnbnVtYmVyJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3QgYmUgYSBudW1iZXInKVxuICB9IGVsc2UgaWYgKHNpemUgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1wic2l6ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIG5lZ2F0aXZlJylcbiAgfVxufVxuXG5mdW5jdGlvbiBhbGxvYyAodGhhdCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICBpZiAoc2l6ZSA8PSAwKSB7XG4gICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxuICB9XG4gIGlmIChmaWxsICE9PSB1bmRlZmluZWQpIHtcbiAgICAvLyBPbmx5IHBheSBhdHRlbnRpb24gdG8gZW5jb2RpbmcgaWYgaXQncyBhIHN0cmluZy4gVGhpc1xuICAgIC8vIHByZXZlbnRzIGFjY2lkZW50YWxseSBzZW5kaW5nIGluIGEgbnVtYmVyIHRoYXQgd291bGRcbiAgICAvLyBiZSBpbnRlcnByZXR0ZWQgYXMgYSBzdGFydCBvZmZzZXQuXG4gICAgcmV0dXJuIHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZydcbiAgICAgID8gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbCwgZW5jb2RpbmcpXG4gICAgICA6IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwpXG4gIH1cbiAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKVxufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcgZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqIGFsbG9jKHNpemVbLCBmaWxsWywgZW5jb2RpbmddXSlcbiAqKi9cbkJ1ZmZlci5hbGxvYyA9IGZ1bmN0aW9uIChzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICByZXR1cm4gYWxsb2MobnVsbCwgc2l6ZSwgZmlsbCwgZW5jb2RpbmcpXG59XG5cbmZ1bmN0aW9uIGFsbG9jVW5zYWZlICh0aGF0LCBzaXplKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplIDwgMCA/IDAgOiBjaGVja2VkKHNpemUpIHwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2l6ZTsgKytpKSB7XG4gICAgICB0aGF0W2ldID0gMFxuICAgIH1cbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gQnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG4vKipcbiAqIEVxdWl2YWxlbnQgdG8gU2xvd0J1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICovXG5CdWZmZXIuYWxsb2NVbnNhZmVTbG93ID0gZnVuY3Rpb24gKHNpemUpIHtcbiAgcmV0dXJuIGFsbG9jVW5zYWZlKG51bGwsIHNpemUpXG59XG5cbmZ1bmN0aW9uIGZyb21TdHJpbmcgKHRoYXQsIHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycgfHwgZW5jb2RpbmcgPT09ICcnKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgfVxuXG4gIGlmICghQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJlbmNvZGluZ1wiIG11c3QgYmUgYSB2YWxpZCBzdHJpbmcgZW5jb2RpbmcnKVxuICB9XG5cbiAgdmFyIGxlbmd0aCA9IGJ5dGVMZW5ndGgoc3RyaW5nLCBlbmNvZGluZykgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuXG4gIHZhciBhY3R1YWwgPSB0aGF0LndyaXRlKHN0cmluZywgZW5jb2RpbmcpXG5cbiAgaWYgKGFjdHVhbCAhPT0gbGVuZ3RoKSB7XG4gICAgLy8gV3JpdGluZyBhIGhleCBzdHJpbmcsIGZvciBleGFtcGxlLCB0aGF0IGNvbnRhaW5zIGludmFsaWQgY2hhcmFjdGVycyB3aWxsXG4gICAgLy8gY2F1c2UgZXZlcnl0aGluZyBhZnRlciB0aGUgZmlyc3QgaW52YWxpZCBjaGFyYWN0ZXIgdG8gYmUgaWdub3JlZC4gKGUuZy5cbiAgICAvLyAnYWJ4eGNkJyB3aWxsIGJlIHRyZWF0ZWQgYXMgJ2FiJylcbiAgICB0aGF0ID0gdGhhdC5zbGljZSgwLCBhY3R1YWwpXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlMaWtlICh0aGF0LCBhcnJheSkge1xuICB2YXIgbGVuZ3RoID0gYXJyYXkubGVuZ3RoIDwgMCA/IDAgOiBjaGVja2VkKGFycmF5Lmxlbmd0aCkgfCAwXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuZ3RoKVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxKSB7XG4gICAgdGhhdFtpXSA9IGFycmF5W2ldICYgMjU1XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5QnVmZmVyICh0aGF0LCBhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKSB7XG4gIGFycmF5LmJ5dGVMZW5ndGggLy8gdGhpcyB0aHJvd3MgaWYgYGFycmF5YCBpcyBub3QgYSB2YWxpZCBBcnJheUJ1ZmZlclxuXG4gIGlmIChieXRlT2Zmc2V0IDwgMCB8fCBhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdvZmZzZXRcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQgKyAobGVuZ3RoIHx8IDApKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ2xlbmd0aFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChieXRlT2Zmc2V0ID09PSB1bmRlZmluZWQgJiYgbGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5KVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBSZXR1cm4gYW4gYXVnbWVudGVkIGBVaW50OEFycmF5YCBpbnN0YW5jZSwgZm9yIGJlc3QgcGVyZm9ybWFuY2VcbiAgICB0aGF0ID0gYXJyYXlcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgdGhhdCA9IGZyb21BcnJheUxpa2UodGhhdCwgYXJyYXkpXG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbU9iamVjdCAodGhhdCwgb2JqKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIob2JqKSkge1xuICAgIHZhciBsZW4gPSBjaGVja2VkKG9iai5sZW5ndGgpIHwgMFxuICAgIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgbGVuKVxuXG4gICAgaWYgKHRoYXQubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhhdFxuICAgIH1cblxuICAgIG9iai5jb3B5KHRoYXQsIDAsIDAsIGxlbilcbiAgICByZXR1cm4gdGhhdFxuICB9XG5cbiAgaWYgKG9iaikge1xuICAgIGlmICgodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICBvYmouYnVmZmVyIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHx8ICdsZW5ndGgnIGluIG9iaikge1xuICAgICAgaWYgKHR5cGVvZiBvYmoubGVuZ3RoICE9PSAnbnVtYmVyJyB8fCBpc25hbihvYmoubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIDApXG4gICAgICB9XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmopXG4gICAgfVxuXG4gICAgaWYgKG9iai50eXBlID09PSAnQnVmZmVyJyAmJiBpc0FycmF5KG9iai5kYXRhKSkge1xuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqLmRhdGEpXG4gICAgfVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcignRmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZywgQnVmZmVyLCBBcnJheUJ1ZmZlciwgQXJyYXksIG9yIGFycmF5LWxpa2Ugb2JqZWN0LicpXG59XG5cbmZ1bmN0aW9uIGNoZWNrZWQgKGxlbmd0aCkge1xuICAvLyBOb3RlOiBjYW5ub3QgdXNlIGBsZW5ndGggPCBrTWF4TGVuZ3RoKClgIGhlcmUgYmVjYXVzZSB0aGF0IGZhaWxzIHdoZW5cbiAgLy8gbGVuZ3RoIGlzIE5hTiAod2hpY2ggaXMgb3RoZXJ3aXNlIGNvZXJjZWQgdG8gemVyby4pXG4gIGlmIChsZW5ndGggPj0ga01heExlbmd0aCgpKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gYWxsb2NhdGUgQnVmZmVyIGxhcmdlciB0aGFuIG1heGltdW0gJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgJ3NpemU6IDB4JyArIGtNYXhMZW5ndGgoKS50b1N0cmluZygxNikgKyAnIGJ5dGVzJylcbiAgfVxuICByZXR1cm4gbGVuZ3RoIHwgMFxufVxuXG5mdW5jdGlvbiBTbG93QnVmZmVyIChsZW5ndGgpIHtcbiAgaWYgKCtsZW5ndGggIT0gbGVuZ3RoKSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZXFlcWVxXG4gICAgbGVuZ3RoID0gMFxuICB9XG4gIHJldHVybiBCdWZmZXIuYWxsb2MoK2xlbmd0aClcbn1cblxuQnVmZmVyLmlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIgKGIpIHtcbiAgcmV0dXJuICEhKGIgIT0gbnVsbCAmJiBiLl9pc0J1ZmZlcilcbn1cblxuQnVmZmVyLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlIChhLCBiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGEpIHx8ICFCdWZmZXIuaXNCdWZmZXIoYikpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudHMgbXVzdCBiZSBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChhID09PSBiKSByZXR1cm4gMFxuXG4gIHZhciB4ID0gYS5sZW5ndGhcbiAgdmFyIHkgPSBiLmxlbmd0aFxuXG4gIGZvciAodmFyIGkgPSAwLCBsZW4gPSBNYXRoLm1pbih4LCB5KTsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKGFbaV0gIT09IGJbaV0pIHtcbiAgICAgIHggPSBhW2ldXG4gICAgICB5ID0gYltpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbkJ1ZmZlci5pc0VuY29kaW5nID0gZnVuY3Rpb24gaXNFbmNvZGluZyAoZW5jb2RpbmcpIHtcbiAgc3dpdGNoIChTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKCkpIHtcbiAgICBjYXNlICdoZXgnOlxuICAgIGNhc2UgJ3V0ZjgnOlxuICAgIGNhc2UgJ3V0Zi04JzpcbiAgICBjYXNlICdhc2NpaSc6XG4gICAgY2FzZSAnbGF0aW4xJzpcbiAgICBjYXNlICdiaW5hcnknOlxuICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgY2FzZSAndWNzMic6XG4gICAgY2FzZSAndWNzLTInOlxuICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgIHJldHVybiB0cnVlXG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbkJ1ZmZlci5jb25jYXQgPSBmdW5jdGlvbiBjb25jYXQgKGxpc3QsIGxlbmd0aCkge1xuICBpZiAoIWlzQXJyYXkobGlzdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIEJ1ZmZlci5hbGxvYygwKVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgbGVuZ3RoID0gMFxuICAgIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgICBsZW5ndGggKz0gbGlzdFtpXS5sZW5ndGhcbiAgICB9XG4gIH1cblxuICB2YXIgYnVmZmVyID0gQnVmZmVyLmFsbG9jVW5zYWZlKGxlbmd0aClcbiAgdmFyIHBvcyA9IDBcbiAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYnVmID0gbGlzdFtpXVxuICAgIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gICAgfVxuICAgIGJ1Zi5jb3B5KGJ1ZmZlciwgcG9zKVxuICAgIHBvcyArPSBidWYubGVuZ3RoXG4gIH1cbiAgcmV0dXJuIGJ1ZmZlclxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmIChCdWZmZXIuaXNCdWZmZXIoc3RyaW5nKSkge1xuICAgIHJldHVybiBzdHJpbmcubGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIEFycmF5QnVmZmVyLmlzVmlldyA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgKEFycmF5QnVmZmVyLmlzVmlldyhzdHJpbmcpIHx8IHN0cmluZyBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSkge1xuICAgIHJldHVybiBzdHJpbmcuYnl0ZUxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2Ygc3RyaW5nICE9PSAnc3RyaW5nJykge1xuICAgIHN0cmluZyA9ICcnICsgc3RyaW5nXG4gIH1cblxuICB2YXIgbGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAobGVuID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIFVzZSBhIGZvciBsb29wIHRvIGF2b2lkIHJlY3Vyc2lvblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsZW5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIGxlbiAqIDJcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBsZW4gPj4+IDFcbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHJldHVybiB1dGY4VG9CeXRlcyhzdHJpbmcpLmxlbmd0aCAvLyBhc3N1bWUgdXRmOFxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuQnVmZmVyLmJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoXG5cbmZ1bmN0aW9uIHNsb3dUb1N0cmluZyAoZW5jb2RpbmcsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcblxuICAvLyBObyBuZWVkIHRvIHZlcmlmeSB0aGF0IFwidGhpcy5sZW5ndGggPD0gTUFYX1VJTlQzMlwiIHNpbmNlIGl0J3MgYSByZWFkLW9ubHlcbiAgLy8gcHJvcGVydHkgb2YgYSB0eXBlZCBhcnJheS5cblxuICAvLyBUaGlzIGJlaGF2ZXMgbmVpdGhlciBsaWtlIFN0cmluZyBub3IgVWludDhBcnJheSBpbiB0aGF0IHdlIHNldCBzdGFydC9lbmRcbiAgLy8gdG8gdGhlaXIgdXBwZXIvbG93ZXIgYm91bmRzIGlmIHRoZSB2YWx1ZSBwYXNzZWQgaXMgb3V0IG9mIHJhbmdlLlxuICAvLyB1bmRlZmluZWQgaXMgaGFuZGxlZCBzcGVjaWFsbHkgYXMgcGVyIEVDTUEtMjYyIDZ0aCBFZGl0aW9uLFxuICAvLyBTZWN0aW9uIDEzLjMuMy43IFJ1bnRpbWUgU2VtYW50aWNzOiBLZXllZEJpbmRpbmdJbml0aWFsaXphdGlvbi5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQgfHwgc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgLy8gUmV0dXJuIGVhcmx5IGlmIHN0YXJ0ID4gdGhpcy5sZW5ndGguIERvbmUgaGVyZSB0byBwcmV2ZW50IHBvdGVudGlhbCB1aW50MzJcbiAgLy8gY29lcmNpb24gZmFpbCBiZWxvdy5cbiAgaWYgKHN0YXJ0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCB8fCBlbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoZW5kIDw9IDApIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIC8vIEZvcmNlIGNvZXJzaW9uIHRvIHVpbnQzMi4gVGhpcyB3aWxsIGFsc28gY29lcmNlIGZhbHNleS9OYU4gdmFsdWVzIHRvIDAuXG4gIGVuZCA+Pj49IDBcbiAgc3RhcnQgPj4+PSAwXG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1dGYxNmxlU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKGVuY29kaW5nICsgJycpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbi8vIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGJ5IGBCdWZmZXIuaXNCdWZmZXJgIGFuZCBgaXMtYnVmZmVyYCAoaW4gU2FmYXJpIDUtNykgdG8gZGV0ZWN0XG4vLyBCdWZmZXIgaW5zdGFuY2VzLlxuQnVmZmVyLnByb3RvdHlwZS5faXNCdWZmZXIgPSB0cnVlXG5cbmZ1bmN0aW9uIHN3YXAgKGIsIG4sIG0pIHtcbiAgdmFyIGkgPSBiW25dXG4gIGJbbl0gPSBiW21dXG4gIGJbbV0gPSBpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDE2ID0gZnVuY3Rpb24gc3dhcDE2ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSAyICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAxNi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSAyKSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMSlcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAzMiA9IGZ1bmN0aW9uIHN3YXAzMiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgNCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMzItYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gNCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDMpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDIpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwNjQgPSBmdW5jdGlvbiBzd2FwNjQgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDggIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDY0LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDgpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyA3KVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyA2KVxuICAgIHN3YXAodGhpcywgaSArIDIsIGkgKyA1KVxuICAgIHN3YXAodGhpcywgaSArIDMsIGkgKyA0KVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZyAoKSB7XG4gIHZhciBsZW5ndGggPSB0aGlzLmxlbmd0aCB8IDBcbiAgaWYgKGxlbmd0aCA9PT0gMCkgcmV0dXJuICcnXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIDAsIGxlbmd0aClcbiAgcmV0dXJuIHNsb3dUb1N0cmluZy5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuZXF1YWxzID0gZnVuY3Rpb24gZXF1YWxzIChiKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGIpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgaWYgKHRoaXMgPT09IGIpIHJldHVybiB0cnVlXG4gIHJldHVybiBCdWZmZXIuY29tcGFyZSh0aGlzLCBiKSA9PT0gMFxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluc3BlY3QgPSBmdW5jdGlvbiBpbnNwZWN0ICgpIHtcbiAgdmFyIHN0ciA9ICcnXG4gIHZhciBtYXggPSBleHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTXG4gIGlmICh0aGlzLmxlbmd0aCA+IDApIHtcbiAgICBzdHIgPSB0aGlzLnRvU3RyaW5nKCdoZXgnLCAwLCBtYXgpLm1hdGNoKC8uezJ9L2cpLmpvaW4oJyAnKVxuICAgIGlmICh0aGlzLmxlbmd0aCA+IG1heCkgc3RyICs9ICcgLi4uICdcbiAgfVxuICByZXR1cm4gJzxCdWZmZXIgJyArIHN0ciArICc+J1xufVxuXG5CdWZmZXIucHJvdG90eXBlLmNvbXBhcmUgPSBmdW5jdGlvbiBjb21wYXJlICh0YXJnZXQsIHN0YXJ0LCBlbmQsIHRoaXNTdGFydCwgdGhpc0VuZCkge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcih0YXJnZXQpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIH1cblxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIGlmIChlbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuZCA9IHRhcmdldCA/IHRhcmdldC5sZW5ndGggOiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc1N0YXJ0ID0gMFxuICB9XG4gIGlmICh0aGlzRW5kID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzRW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChzdGFydCA8IDAgfHwgZW5kID4gdGFyZ2V0Lmxlbmd0aCB8fCB0aGlzU3RhcnQgPCAwIHx8IHRoaXNFbmQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdvdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kICYmIHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAwXG4gIH1cbiAgaWYgKHRoaXNTdGFydCA+PSB0aGlzRW5kKSB7XG4gICAgcmV0dXJuIC0xXG4gIH1cbiAgaWYgKHN0YXJ0ID49IGVuZCkge1xuICAgIHJldHVybiAxXG4gIH1cblxuICBzdGFydCA+Pj49IDBcbiAgZW5kID4+Pj0gMFxuICB0aGlzU3RhcnQgPj4+PSAwXG4gIHRoaXNFbmQgPj4+PSAwXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCkgcmV0dXJuIDBcblxuICB2YXIgeCA9IHRoaXNFbmQgLSB0aGlzU3RhcnRcbiAgdmFyIHkgPSBlbmQgLSBzdGFydFxuICB2YXIgbGVuID0gTWF0aC5taW4oeCwgeSlcblxuICB2YXIgdGhpc0NvcHkgPSB0aGlzLnNsaWNlKHRoaXNTdGFydCwgdGhpc0VuZClcbiAgdmFyIHRhcmdldENvcHkgPSB0YXJnZXQuc2xpY2Uoc3RhcnQsIGVuZClcblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgaWYgKHRoaXNDb3B5W2ldICE9PSB0YXJnZXRDb3B5W2ldKSB7XG4gICAgICB4ID0gdGhpc0NvcHlbaV1cbiAgICAgIHkgPSB0YXJnZXRDb3B5W2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuLy8gRmluZHMgZWl0aGVyIHRoZSBmaXJzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPj0gYGJ5dGVPZmZzZXRgLFxuLy8gT1IgdGhlIGxhc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0IDw9IGBieXRlT2Zmc2V0YC5cbi8vXG4vLyBBcmd1bWVudHM6XG4vLyAtIGJ1ZmZlciAtIGEgQnVmZmVyIHRvIHNlYXJjaFxuLy8gLSB2YWwgLSBhIHN0cmluZywgQnVmZmVyLCBvciBudW1iZXJcbi8vIC0gYnl0ZU9mZnNldCAtIGFuIGluZGV4IGludG8gYGJ1ZmZlcmA7IHdpbGwgYmUgY2xhbXBlZCB0byBhbiBpbnQzMlxuLy8gLSBlbmNvZGluZyAtIGFuIG9wdGlvbmFsIGVuY29kaW5nLCByZWxldmFudCBpcyB2YWwgaXMgYSBzdHJpbmdcbi8vIC0gZGlyIC0gdHJ1ZSBmb3IgaW5kZXhPZiwgZmFsc2UgZm9yIGxhc3RJbmRleE9mXG5mdW5jdGlvbiBiaWRpcmVjdGlvbmFsSW5kZXhPZiAoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgLy8gRW1wdHkgYnVmZmVyIG1lYW5zIG5vIG1hdGNoXG4gIGlmIChidWZmZXIubGVuZ3RoID09PSAwKSByZXR1cm4gLTFcblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldFxuICBpZiAodHlwZW9mIGJ5dGVPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBieXRlT2Zmc2V0XG4gICAgYnl0ZU9mZnNldCA9IDBcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0ID4gMHg3ZmZmZmZmZikge1xuICAgIGJ5dGVPZmZzZXQgPSAweDdmZmZmZmZmXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IC0weDgwMDAwMDAwKSB7XG4gICAgYnl0ZU9mZnNldCA9IC0weDgwMDAwMDAwXG4gIH1cbiAgYnl0ZU9mZnNldCA9ICtieXRlT2Zmc2V0ICAvLyBDb2VyY2UgdG8gTnVtYmVyLlxuICBpZiAoaXNOYU4oYnl0ZU9mZnNldCkpIHtcbiAgICAvLyBieXRlT2Zmc2V0OiBpdCBpdCdzIHVuZGVmaW5lZCwgbnVsbCwgTmFOLCBcImZvb1wiLCBldGMsIHNlYXJjaCB3aG9sZSBidWZmZXJcbiAgICBieXRlT2Zmc2V0ID0gZGlyID8gMCA6IChidWZmZXIubGVuZ3RoIC0gMSlcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0OiBuZWdhdGl2ZSBvZmZzZXRzIHN0YXJ0IGZyb20gdGhlIGVuZCBvZiB0aGUgYnVmZmVyXG4gIGlmIChieXRlT2Zmc2V0IDwgMCkgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggKyBieXRlT2Zmc2V0XG4gIGlmIChieXRlT2Zmc2V0ID49IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICBpZiAoZGlyKSByZXR1cm4gLTFcbiAgICBlbHNlIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoIC0gMVxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAwKSB7XG4gICAgaWYgKGRpcikgYnl0ZU9mZnNldCA9IDBcbiAgICBlbHNlIHJldHVybiAtMVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIHZhbFxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICB2YWwgPSBCdWZmZXIuZnJvbSh2YWwsIGVuY29kaW5nKVxuICB9XG5cbiAgLy8gRmluYWxseSwgc2VhcmNoIGVpdGhlciBpbmRleE9mIChpZiBkaXIgaXMgdHJ1ZSkgb3IgbGFzdEluZGV4T2ZcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcih2YWwpKSB7XG4gICAgLy8gU3BlY2lhbCBjYXNlOiBsb29raW5nIGZvciBlbXB0eSBzdHJpbmcvYnVmZmVyIGFsd2F5cyBmYWlsc1xuICAgIGlmICh2YWwubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm4gLTFcbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDB4RkYgLy8gU2VhcmNoIGZvciBhIGJ5dGUgdmFsdWUgWzAtMjU1XVxuICAgIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJlxuICAgICAgICB0eXBlb2YgVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgaWYgKGRpcikge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUuaW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmxhc3RJbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCBbIHZhbCBdLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9XG5cbiAgdGhyb3cgbmV3IFR5cGVFcnJvcigndmFsIG11c3QgYmUgc3RyaW5nLCBudW1iZXIgb3IgQnVmZmVyJylcbn1cblxuZnVuY3Rpb24gYXJyYXlJbmRleE9mIChhcnIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICB2YXIgaW5kZXhTaXplID0gMVxuICB2YXIgYXJyTGVuZ3RoID0gYXJyLmxlbmd0aFxuICB2YXIgdmFsTGVuZ3RoID0gdmFsLmxlbmd0aFxuXG4gIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSBTdHJpbmcoZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICBpZiAoZW5jb2RpbmcgPT09ICd1Y3MyJyB8fCBlbmNvZGluZyA9PT0gJ3Vjcy0yJyB8fFxuICAgICAgICBlbmNvZGluZyA9PT0gJ3V0ZjE2bGUnIHx8IGVuY29kaW5nID09PSAndXRmLTE2bGUnKSB7XG4gICAgICBpZiAoYXJyLmxlbmd0aCA8IDIgfHwgdmFsLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgcmV0dXJuIC0xXG4gICAgICB9XG4gICAgICBpbmRleFNpemUgPSAyXG4gICAgICBhcnJMZW5ndGggLz0gMlxuICAgICAgdmFsTGVuZ3RoIC89IDJcbiAgICAgIGJ5dGVPZmZzZXQgLz0gMlxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWQgKGJ1ZiwgaSkge1xuICAgIGlmIChpbmRleFNpemUgPT09IDEpIHtcbiAgICAgIHJldHVybiBidWZbaV1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGJ1Zi5yZWFkVUludDE2QkUoaSAqIGluZGV4U2l6ZSlcbiAgICB9XG4gIH1cblxuICB2YXIgaVxuICBpZiAoZGlyKSB7XG4gICAgdmFyIGZvdW5kSW5kZXggPSAtMVxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPCBhcnJMZW5ndGg7IGkrKykge1xuICAgICAgaWYgKHJlYWQoYXJyLCBpKSA9PT0gcmVhZCh2YWwsIGZvdW5kSW5kZXggPT09IC0xID8gMCA6IGkgLSBmb3VuZEluZGV4KSkge1xuICAgICAgICBpZiAoZm91bmRJbmRleCA9PT0gLTEpIGZvdW5kSW5kZXggPSBpXG4gICAgICAgIGlmIChpIC0gZm91bmRJbmRleCArIDEgPT09IHZhbExlbmd0aCkgcmV0dXJuIGZvdW5kSW5kZXggKiBpbmRleFNpemVcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ICE9PSAtMSkgaSAtPSBpIC0gZm91bmRJbmRleFxuICAgICAgICBmb3VuZEluZGV4ID0gLTFcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGJ5dGVPZmZzZXQgKyB2YWxMZW5ndGggPiBhcnJMZW5ndGgpIGJ5dGVPZmZzZXQgPSBhcnJMZW5ndGggLSB2YWxMZW5ndGhcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpID49IDA7IGktLSkge1xuICAgICAgdmFyIGZvdW5kID0gdHJ1ZVxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB2YWxMZW5ndGg7IGorKykge1xuICAgICAgICBpZiAocmVhZChhcnIsIGkgKyBqKSAhPT0gcmVhZCh2YWwsIGopKSB7XG4gICAgICAgICAgZm91bmQgPSBmYWxzZVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChmb3VuZCkgcmV0dXJuIGlcbiAgICB9XG4gIH1cblxuICByZXR1cm4gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmNsdWRlcyA9IGZ1bmN0aW9uIGluY2x1ZGVzICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiB0aGlzLmluZGV4T2YodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykgIT09IC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5kZXhPZiA9IGZ1bmN0aW9uIGluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIHRydWUpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUubGFzdEluZGV4T2YgPSBmdW5jdGlvbiBsYXN0SW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIGhleFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgb2Zmc2V0ID0gTnVtYmVyKG9mZnNldCkgfHwgMFxuICB2YXIgcmVtYWluaW5nID0gYnVmLmxlbmd0aCAtIG9mZnNldFxuICBpZiAoIWxlbmd0aCkge1xuICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICB9IGVsc2Uge1xuICAgIGxlbmd0aCA9IE51bWJlcihsZW5ndGgpXG4gICAgaWYgKGxlbmd0aCA+IHJlbWFpbmluZykge1xuICAgICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gICAgfVxuICB9XG5cbiAgLy8gbXVzdCBiZSBhbiBldmVuIG51bWJlciBvZiBkaWdpdHNcbiAgdmFyIHN0ckxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKHN0ckxlbiAlIDIgIT09IDApIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ludmFsaWQgaGV4IHN0cmluZycpXG5cbiAgaWYgKGxlbmd0aCA+IHN0ckxlbiAvIDIpIHtcbiAgICBsZW5ndGggPSBzdHJMZW4gLyAyXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIHZhciBwYXJzZWQgPSBwYXJzZUludChzdHJpbmcuc3Vic3RyKGkgKiAyLCAyKSwgMTYpXG4gICAgaWYgKGlzTmFOKHBhcnNlZCkpIHJldHVybiBpXG4gICAgYnVmW29mZnNldCArIGldID0gcGFyc2VkXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gdXRmOFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmOFRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYXNjaWlXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGFzY2lpVG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBsYXRpbjFXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBhc2NpaVdyaXRlKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gYmFzZTY0V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihiYXNlNjRUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIHVjczJXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjE2bGVUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGUgPSBmdW5jdGlvbiB3cml0ZSAoc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCwgZW5jb2RpbmcpIHtcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZylcbiAgaWYgKG9mZnNldCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5jb2RpbmcgPSAndXRmOCdcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgZW5jb2RpbmcpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IG9mZnNldFxuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBvZmZzZXRbLCBsZW5ndGhdWywgZW5jb2RpbmddKVxuICB9IGVsc2UgaWYgKGlzRmluaXRlKG9mZnNldCkpIHtcbiAgICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gICAgaWYgKGlzRmluaXRlKGxlbmd0aCkpIHtcbiAgICAgIGxlbmd0aCA9IGxlbmd0aCB8IDBcbiAgICAgIGlmIChlbmNvZGluZyA9PT0gdW5kZWZpbmVkKSBlbmNvZGluZyA9ICd1dGY4J1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmNvZGluZyA9IGxlbmd0aFxuICAgICAgbGVuZ3RoID0gdW5kZWZpbmVkXG4gICAgfVxuICAvLyBsZWdhY3kgd3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0LCBsZW5ndGgpIC0gcmVtb3ZlIGluIHYwLjEzXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0J1ZmZlci53cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXRbLCBsZW5ndGhdKSBpcyBubyBsb25nZXIgc3VwcG9ydGVkJ1xuICAgIClcbiAgfVxuXG4gIHZhciByZW1haW5pbmcgPSB0aGlzLmxlbmd0aCAtIG9mZnNldFxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQgfHwgbGVuZ3RoID4gcmVtYWluaW5nKSBsZW5ndGggPSByZW1haW5pbmdcblxuICBpZiAoKHN0cmluZy5sZW5ndGggPiAwICYmIChsZW5ndGggPCAwIHx8IG9mZnNldCA8IDApKSB8fCBvZmZzZXQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIHdyaXRlIG91dHNpZGUgYnVmZmVyIGJvdW5kcycpXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIC8vIFdhcm5pbmc6IG1heExlbmd0aCBub3QgdGFrZW4gaW50byBhY2NvdW50IGluIGJhc2U2NFdyaXRlXG4gICAgICAgIHJldHVybiBiYXNlNjRXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdWNzMldyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9ICgnJyArIGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uIHRvSlNPTiAoKSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0J1ZmZlcicsXG4gICAgZGF0YTogQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwodGhpcy5fYXJyIHx8IHRoaXMsIDApXG4gIH1cbn1cblxuZnVuY3Rpb24gYmFzZTY0U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBpZiAoc3RhcnQgPT09IDAgJiYgZW5kID09PSBidWYubGVuZ3RoKSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1ZilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmLnNsaWNlKHN0YXJ0LCBlbmQpKVxuICB9XG59XG5cbmZ1bmN0aW9uIHV0ZjhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcbiAgdmFyIHJlcyA9IFtdXG5cbiAgdmFyIGkgPSBzdGFydFxuICB3aGlsZSAoaSA8IGVuZCkge1xuICAgIHZhciBmaXJzdEJ5dGUgPSBidWZbaV1cbiAgICB2YXIgY29kZVBvaW50ID0gbnVsbFxuICAgIHZhciBieXRlc1BlclNlcXVlbmNlID0gKGZpcnN0Qnl0ZSA+IDB4RUYpID8gNFxuICAgICAgOiAoZmlyc3RCeXRlID4gMHhERikgPyAzXG4gICAgICA6IChmaXJzdEJ5dGUgPiAweEJGKSA/IDJcbiAgICAgIDogMVxuXG4gICAgaWYgKGkgKyBieXRlc1BlclNlcXVlbmNlIDw9IGVuZCkge1xuICAgICAgdmFyIHNlY29uZEJ5dGUsIHRoaXJkQnl0ZSwgZm91cnRoQnl0ZSwgdGVtcENvZGVQb2ludFxuXG4gICAgICBzd2l0Y2ggKGJ5dGVzUGVyU2VxdWVuY2UpIHtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgIGlmIChmaXJzdEJ5dGUgPCAweDgwKSB7XG4gICAgICAgICAgICBjb2RlUG9pbnQgPSBmaXJzdEJ5dGVcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHgxRikgPDwgMHg2IHwgKHNlY29uZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4QyB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKHRoaXJkQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0ZGICYmICh0ZW1wQ29kZVBvaW50IDwgMHhEODAwIHx8IHRlbXBDb2RlUG9pbnQgPiAweERGRkYpKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgIHNlY29uZEJ5dGUgPSBidWZbaSArIDFdXG4gICAgICAgICAgdGhpcmRCeXRlID0gYnVmW2kgKyAyXVxuICAgICAgICAgIGZvdXJ0aEJ5dGUgPSBidWZbaSArIDNdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwICYmIChmb3VydGhCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweDEyIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweEMgfCAodGhpcmRCeXRlICYgMHgzRikgPDwgMHg2IHwgKGZvdXJ0aEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweEZGRkYgJiYgdGVtcENvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICAgICAgICAgIGNvZGVQb2ludCA9IHRlbXBDb2RlUG9pbnRcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGNvZGVQb2ludCA9PT0gbnVsbCkge1xuICAgICAgLy8gd2UgZGlkIG5vdCBnZW5lcmF0ZSBhIHZhbGlkIGNvZGVQb2ludCBzbyBpbnNlcnQgYVxuICAgICAgLy8gcmVwbGFjZW1lbnQgY2hhciAoVStGRkZEKSBhbmQgYWR2YW5jZSBvbmx5IDEgYnl0ZVxuICAgICAgY29kZVBvaW50ID0gMHhGRkZEXG4gICAgICBieXRlc1BlclNlcXVlbmNlID0gMVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50ID4gMHhGRkZGKSB7XG4gICAgICAvLyBlbmNvZGUgdG8gdXRmMTYgKHN1cnJvZ2F0ZSBwYWlyIGRhbmNlKVxuICAgICAgY29kZVBvaW50IC09IDB4MTAwMDBcbiAgICAgIHJlcy5wdXNoKGNvZGVQb2ludCA+Pj4gMTAgJiAweDNGRiB8IDB4RDgwMClcbiAgICAgIGNvZGVQb2ludCA9IDB4REMwMCB8IGNvZGVQb2ludCAmIDB4M0ZGXG4gICAgfVxuXG4gICAgcmVzLnB1c2goY29kZVBvaW50KVxuICAgIGkgKz0gYnl0ZXNQZXJTZXF1ZW5jZVxuICB9XG5cbiAgcmV0dXJuIGRlY29kZUNvZGVQb2ludHNBcnJheShyZXMpXG59XG5cbi8vIEJhc2VkIG9uIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIyNzQ3MjcyLzY4MDc0MiwgdGhlIGJyb3dzZXIgd2l0aFxuLy8gdGhlIGxvd2VzdCBsaW1pdCBpcyBDaHJvbWUsIHdpdGggMHgxMDAwMCBhcmdzLlxuLy8gV2UgZ28gMSBtYWduaXR1ZGUgbGVzcywgZm9yIHNhZmV0eVxudmFyIE1BWF9BUkdVTUVOVFNfTEVOR1RIID0gMHgxMDAwXG5cbmZ1bmN0aW9uIGRlY29kZUNvZGVQb2ludHNBcnJheSAoY29kZVBvaW50cykge1xuICB2YXIgbGVuID0gY29kZVBvaW50cy5sZW5ndGhcbiAgaWYgKGxlbiA8PSBNQVhfQVJHVU1FTlRTX0xFTkdUSCkge1xuICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFN0cmluZywgY29kZVBvaW50cykgLy8gYXZvaWQgZXh0cmEgc2xpY2UoKVxuICB9XG5cbiAgLy8gRGVjb2RlIGluIGNodW5rcyB0byBhdm9pZCBcImNhbGwgc3RhY2sgc2l6ZSBleGNlZWRlZFwiLlxuICB2YXIgcmVzID0gJydcbiAgdmFyIGkgPSAwXG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoXG4gICAgICBTdHJpbmcsXG4gICAgICBjb2RlUG9pbnRzLnNsaWNlKGksIGkgKz0gTUFYX0FSR1VNRU5UU19MRU5HVEgpXG4gICAgKVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0gJiAweDdGKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gbGF0aW4xU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldKVxuICB9XG4gIHJldHVybiByZXRcbn1cblxuZnVuY3Rpb24gaGV4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gYnVmLmxlbmd0aFxuXG4gIGlmICghc3RhcnQgfHwgc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgfHwgZW5kIDwgMCB8fCBlbmQgPiBsZW4pIGVuZCA9IGxlblxuXG4gIHZhciBvdXQgPSAnJ1xuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIG91dCArPSB0b0hleChidWZbaV0pXG4gIH1cbiAgcmV0dXJuIG91dFxufVxuXG5mdW5jdGlvbiB1dGYxNmxlU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgYnl0ZXMgPSBidWYuc2xpY2Uoc3RhcnQsIGVuZClcbiAgdmFyIHJlcyA9ICcnXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYnl0ZXMubGVuZ3RoOyBpICs9IDIpIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShieXRlc1tpXSArIGJ5dGVzW2kgKyAxXSAqIDI1NilcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc2xpY2UgPSBmdW5jdGlvbiBzbGljZSAoc3RhcnQsIGVuZCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgc3RhcnQgPSB+fnN0YXJ0XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuIDogfn5lbmRcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgKz0gbGVuXG4gICAgaWYgKHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIH0gZWxzZSBpZiAoc3RhcnQgPiBsZW4pIHtcbiAgICBzdGFydCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuXG4gICAgaWYgKGVuZCA8IDApIGVuZCA9IDBcbiAgfSBlbHNlIGlmIChlbmQgPiBsZW4pIHtcbiAgICBlbmQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICB2YXIgbmV3QnVmXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIG5ld0J1ZiA9IHRoaXMuc3ViYXJyYXkoc3RhcnQsIGVuZClcbiAgICBuZXdCdWYuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIHZhciBzbGljZUxlbiA9IGVuZCAtIHN0YXJ0XG4gICAgbmV3QnVmID0gbmV3IEJ1ZmZlcihzbGljZUxlbiwgdW5kZWZpbmVkKVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc2xpY2VMZW47ICsraSkge1xuICAgICAgbmV3QnVmW2ldID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ld0J1ZlxufVxuXG4vKlxuICogTmVlZCB0byBtYWtlIHN1cmUgdGhhdCBidWZmZXIgaXNuJ3QgdHJ5aW5nIHRvIHdyaXRlIG91dCBvZiBib3VuZHMuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrT2Zmc2V0IChvZmZzZXQsIGV4dCwgbGVuZ3RoKSB7XG4gIGlmICgob2Zmc2V0ICUgMSkgIT09IDAgfHwgb2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ29mZnNldCBpcyBub3QgdWludCcpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBsZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdUcnlpbmcgdG8gYWNjZXNzIGJleW9uZCBidWZmZXIgbGVuZ3RoJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludExFID0gZnVuY3Rpb24gcmVhZFVJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludEJFID0gZnVuY3Rpb24gcmVhZFVJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcbiAgfVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF1cbiAgdmFyIG11bCA9IDFcbiAgd2hpbGUgKGJ5dGVMZW5ndGggPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50OCA9IGZ1bmN0aW9uIHJlYWRVSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkxFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCA4KSB8IHRoaXNbb2Zmc2V0ICsgMV1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyTEUgPSBmdW5jdGlvbiByZWFkVUludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKCh0aGlzW29mZnNldF0pIHxcbiAgICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSkgK1xuICAgICAgKHRoaXNbb2Zmc2V0ICsgM10gKiAweDEwMDAwMDApXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkJFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gKiAweDEwMDAwMDApICtcbiAgICAoKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgdGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50TEUgPSBmdW5jdGlvbiByZWFkSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50QkUgPSBmdW5jdGlvbiByZWFkSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgaSA9IGJ5dGVMZW5ndGhcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1pXVxuICB3aGlsZSAoaSA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWldICogbXVsXG4gIH1cbiAgbXVsICo9IDB4ODBcblxuICBpZiAodmFsID49IG11bCkgdmFsIC09IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50OCA9IGZ1bmN0aW9uIHJlYWRJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIGlmICghKHRoaXNbb2Zmc2V0XSAmIDB4ODApKSByZXR1cm4gKHRoaXNbb2Zmc2V0XSlcbiAgcmV0dXJuICgoMHhmZiAtIHRoaXNbb2Zmc2V0XSArIDEpICogLTEpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2TEUgPSBmdW5jdGlvbiByZWFkSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkJFID0gZnVuY3Rpb24gcmVhZEludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgMV0gfCAodGhpc1tvZmZzZXRdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0pIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSA8PCAyNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRJbnQzMkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgMjQpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAzXSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRMRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdExFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRmxvYXRCRSA9IGZ1bmN0aW9uIHJlYWRGbG9hdEJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUxFID0gZnVuY3Rpb24gcmVhZERvdWJsZUxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCB0cnVlLCA1MiwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlQkUgPSBmdW5jdGlvbiByZWFkRG91YmxlQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCA1MiwgOClcbn1cblxuZnVuY3Rpb24gY2hlY2tJbnQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImJ1ZmZlclwiIGFyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXIgaW5zdGFuY2UnKVxuICBpZiAodmFsdWUgPiBtYXggfHwgdmFsdWUgPCBtaW4pIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgaXMgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlVUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlVUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIG1heEJ5dGVzID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpIC0gMVxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG1heEJ5dGVzLCAwKVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAodmFsdWUgLyBtdWwpICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVVSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweGZmLCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDE2IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDIpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlICYgKDB4ZmYgPDwgKDggKiAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSkpKSA+Pj5cbiAgICAgIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpICogOFxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbmZ1bmN0aW9uIG9iamVjdFdyaXRlVUludDMyIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbikge1xuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCA0KTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSA+Pj4gKGxpdHRsZUVuZGlhbiA/IGkgOiAzIC0gaSkgKiA4KSAmIDB4ZmZcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRMRSA9IGZ1bmN0aW9uIHdyaXRlSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSAwXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0XSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSAtIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnRCRSA9IGZ1bmN0aW9uIHdyaXRlSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBsaW1pdCA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoIC0gMSlcblxuICAgIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIGxpbWl0IC0gMSwgLWxpbWl0KVxuICB9XG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoIC0gMVxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldCArIGldID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgtLWkgPj0gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIGlmICh2YWx1ZSA8IDAgJiYgc3ViID09PSAwICYmIHRoaXNbb2Zmc2V0ICsgaSArIDFdICE9PSAwKSB7XG4gICAgICBzdWIgPSAxXG4gICAgfVxuICAgIHRoaXNbb2Zmc2V0ICsgaV0gPSAoKHZhbHVlIC8gbXVsKSA+PiAwKSAtIHN1YiAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQ4ID0gZnVuY3Rpb24gd3JpdGVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4N2YsIC0weDgwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB2YWx1ZSA9IE1hdGguZmxvb3IodmFsdWUpXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZiArIHZhbHVlICsgMVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5mdW5jdGlvbiBjaGVja0lFRUU3NTQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgZXh0LCBtYXgsIG1pbikge1xuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG4gIGlmIChvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbn1cblxuZnVuY3Rpb24gd3JpdGVGbG9hdCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA0LCAzLjQwMjgyMzQ2NjM4NTI4ODZlKzM4LCAtMy40MDI4MjM0NjYzODUyODg2ZSszOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCAyMywgNClcbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0TEUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRCRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG5mdW5jdGlvbiB3cml0ZURvdWJsZSAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja0lFRUU3NTQoYnVmLCB2YWx1ZSwgb2Zmc2V0LCA4LCAxLjc5NzY5MzEzNDg2MjMxNTdFKzMwOCwgLTEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDUyLCA4KVxuICByZXR1cm4gb2Zmc2V0ICsgOFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlTEUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVCRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbi8vIGNvcHkodGFyZ2V0QnVmZmVyLCB0YXJnZXRTdGFydD0wLCBzb3VyY2VTdGFydD0wLCBzb3VyY2VFbmQ9YnVmZmVyLmxlbmd0aClcbkJ1ZmZlci5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIGNvcHkgKHRhcmdldCwgdGFyZ2V0U3RhcnQsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKCFzdGFydCkgc3RhcnQgPSAwXG4gIGlmICghZW5kICYmIGVuZCAhPT0gMCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldFN0YXJ0ID49IHRhcmdldC5sZW5ndGgpIHRhcmdldFN0YXJ0ID0gdGFyZ2V0Lmxlbmd0aFxuICBpZiAoIXRhcmdldFN0YXJ0KSB0YXJnZXRTdGFydCA9IDBcbiAgaWYgKGVuZCA+IDAgJiYgZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgLy8gQ29weSAwIGJ5dGVzOyB3ZSdyZSBkb25lXG4gIGlmIChlbmQgPT09IHN0YXJ0KSByZXR1cm4gMFxuICBpZiAodGFyZ2V0Lmxlbmd0aCA9PT0gMCB8fCB0aGlzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBGYXRhbCBlcnJvciBjb25kaXRpb25zXG4gIGlmICh0YXJnZXRTdGFydCA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcigndGFyZ2V0U3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIH1cbiAgaWYgKHN0YXJ0IDwgMCB8fCBzdGFydCA+PSB0aGlzLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZVN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICBpZiAoZW5kIDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3NvdXJjZUVuZCBvdXQgb2YgYm91bmRzJylcblxuICAvLyBBcmUgd2Ugb29iP1xuICBpZiAoZW5kID4gdGhpcy5sZW5ndGgpIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgPCBlbmQgLSBzdGFydCkge1xuICAgIGVuZCA9IHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCArIHN0YXJ0XG4gIH1cblxuICB2YXIgbGVuID0gZW5kIC0gc3RhcnRcbiAgdmFyIGlcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0ICYmIHN0YXJ0IDwgdGFyZ2V0U3RhcnQgJiYgdGFyZ2V0U3RhcnQgPCBlbmQpIHtcbiAgICAvLyBkZXNjZW5kaW5nIGNvcHkgZnJvbSBlbmRcbiAgICBmb3IgKGkgPSBsZW4gLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSBpZiAobGVuIDwgMTAwMCB8fCAhQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICAvLyBhc2NlbmRpbmcgY29weSBmcm9tIHN0YXJ0XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgKytpKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBVaW50OEFycmF5LnByb3RvdHlwZS5zZXQuY2FsbChcbiAgICAgIHRhcmdldCxcbiAgICAgIHRoaXMuc3ViYXJyYXkoc3RhcnQsIHN0YXJ0ICsgbGVuKSxcbiAgICAgIHRhcmdldFN0YXJ0XG4gICAgKVxuICB9XG5cbiAgcmV0dXJuIGxlblxufVxuXG4vLyBVc2FnZTpcbi8vICAgIGJ1ZmZlci5maWxsKG51bWJlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoYnVmZmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChzdHJpbmdbLCBvZmZzZXRbLCBlbmRdXVssIGVuY29kaW5nXSlcbkJ1ZmZlci5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIGZpbGwgKHZhbCwgc3RhcnQsIGVuZCwgZW5jb2RpbmcpIHtcbiAgLy8gSGFuZGxlIHN0cmluZyBjYXNlczpcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgaWYgKHR5cGVvZiBzdGFydCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gc3RhcnRcbiAgICAgIHN0YXJ0ID0gMFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBlbmQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IGVuZFxuICAgICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgICB9XG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDEpIHtcbiAgICAgIHZhciBjb2RlID0gdmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIGlmIChjb2RlIDwgMjU2KSB7XG4gICAgICAgIHZhbCA9IGNvZGVcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignZW5jb2RpbmcgbXVzdCBiZSBhIHN0cmluZycpXG4gICAgfVxuICAgIGlmICh0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnICYmICFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICB9XG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAyNTVcbiAgfVxuXG4gIC8vIEludmFsaWQgcmFuZ2VzIGFyZSBub3Qgc2V0IHRvIGEgZGVmYXVsdCwgc28gY2FuIHJhbmdlIGNoZWNrIGVhcmx5LlxuICBpZiAoc3RhcnQgPCAwIHx8IHRoaXMubGVuZ3RoIDwgc3RhcnQgfHwgdGhpcy5sZW5ndGggPCBlbmQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignT3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gdGhpc1xuICB9XG5cbiAgc3RhcnQgPSBzdGFydCA+Pj4gMFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IHRoaXMubGVuZ3RoIDogZW5kID4+PiAwXG5cbiAgaWYgKCF2YWwpIHZhbCA9IDBcblxuICB2YXIgaVxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICBmb3IgKGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgICB0aGlzW2ldID0gdmFsXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHZhciBieXRlcyA9IEJ1ZmZlci5pc0J1ZmZlcih2YWwpXG4gICAgICA/IHZhbFxuICAgICAgOiB1dGY4VG9CeXRlcyhuZXcgQnVmZmVyKHZhbCwgZW5jb2RpbmcpLnRvU3RyaW5nKCkpXG4gICAgdmFyIGxlbiA9IGJ5dGVzLmxlbmd0aFxuICAgIGZvciAoaSA9IDA7IGkgPCBlbmQgLSBzdGFydDsgKytpKSB7XG4gICAgICB0aGlzW2kgKyBzdGFydF0gPSBieXRlc1tpICUgbGVuXVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzXG59XG5cbi8vIEhFTFBFUiBGVU5DVElPTlNcbi8vID09PT09PT09PT09PT09PT1cblxudmFyIElOVkFMSURfQkFTRTY0X1JFID0gL1teK1xcLzAtOUEtWmEtei1fXS9nXG5cbmZ1bmN0aW9uIGJhc2U2NGNsZWFuIChzdHIpIHtcbiAgLy8gTm9kZSBzdHJpcHMgb3V0IGludmFsaWQgY2hhcmFjdGVycyBsaWtlIFxcbiBhbmQgXFx0IGZyb20gdGhlIHN0cmluZywgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHN0ciA9IHN0cmluZ3RyaW0oc3RyKS5yZXBsYWNlKElOVkFMSURfQkFTRTY0X1JFLCAnJylcbiAgLy8gTm9kZSBjb252ZXJ0cyBzdHJpbmdzIHdpdGggbGVuZ3RoIDwgMiB0byAnJ1xuICBpZiAoc3RyLmxlbmd0aCA8IDIpIHJldHVybiAnJ1xuICAvLyBOb2RlIGFsbG93cyBmb3Igbm9uLXBhZGRlZCBiYXNlNjQgc3RyaW5ncyAobWlzc2luZyB0cmFpbGluZyA9PT0pLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgd2hpbGUgKHN0ci5sZW5ndGggJSA0ICE9PSAwKSB7XG4gICAgc3RyID0gc3RyICsgJz0nXG4gIH1cbiAgcmV0dXJuIHN0clxufVxuXG5mdW5jdGlvbiBzdHJpbmd0cmltIChzdHIpIHtcbiAgaWYgKHN0ci50cmltKSByZXR1cm4gc3RyLnRyaW0oKVxuICByZXR1cm4gc3RyLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKVxufVxuXG5mdW5jdGlvbiB0b0hleCAobikge1xuICBpZiAobiA8IDE2KSByZXR1cm4gJzAnICsgbi50b1N0cmluZygxNilcbiAgcmV0dXJuIG4udG9TdHJpbmcoMTYpXG59XG5cbmZ1bmN0aW9uIHV0ZjhUb0J5dGVzIChzdHJpbmcsIHVuaXRzKSB7XG4gIHVuaXRzID0gdW5pdHMgfHwgSW5maW5pdHlcbiAgdmFyIGNvZGVQb2ludFxuICB2YXIgbGVuZ3RoID0gc3RyaW5nLmxlbmd0aFxuICB2YXIgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcbiAgdmFyIGJ5dGVzID0gW11cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgY29kZVBvaW50ID0gc3RyaW5nLmNoYXJDb2RlQXQoaSlcblxuICAgIC8vIGlzIHN1cnJvZ2F0ZSBjb21wb25lbnRcbiAgICBpZiAoY29kZVBvaW50ID4gMHhEN0ZGICYmIGNvZGVQb2ludCA8IDB4RTAwMCkge1xuICAgICAgLy8gbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICghbGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgICAvLyBubyBsZWFkIHlldFxuICAgICAgICBpZiAoY29kZVBvaW50ID4gMHhEQkZGKSB7XG4gICAgICAgICAgLy8gdW5leHBlY3RlZCB0cmFpbFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH0gZWxzZSBpZiAoaSArIDEgPT09IGxlbmd0aCkge1xuICAgICAgICAgIC8vIHVucGFpcmVkIGxlYWRcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWQgbGVhZFxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG5cbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gMiBsZWFkcyBpbiBhIHJvd1xuICAgICAgaWYgKGNvZGVQb2ludCA8IDB4REMwMCkge1xuICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyB2YWxpZCBzdXJyb2dhdGUgcGFpclxuICAgICAgY29kZVBvaW50ID0gKGxlYWRTdXJyb2dhdGUgLSAweEQ4MDAgPDwgMTAgfCBjb2RlUG9pbnQgLSAweERDMDApICsgMHgxMDAwMFxuICAgIH0gZWxzZSBpZiAobGVhZFN1cnJvZ2F0ZSkge1xuICAgICAgLy8gdmFsaWQgYm1wIGNoYXIsIGJ1dCBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgfVxuXG4gICAgbGVhZFN1cnJvZ2F0ZSA9IG51bGxcblxuICAgIC8vIGVuY29kZSB1dGY4XG4gICAgaWYgKGNvZGVQb2ludCA8IDB4ODApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMSkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChjb2RlUG9pbnQpXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDgwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2IHwgMHhDMCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyB8IDB4RTAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4MTEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDQpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDEyIHwgMHhGMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4QyAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjb2RlIHBvaW50JylcbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnl0ZXNcbn1cblxuZnVuY3Rpb24gYXNjaWlUb0J5dGVzIChzdHIpIHtcbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgLy8gTm9kZSdzIGNvZGUgc2VlbXMgdG8gYmUgZG9pbmcgdGhpcyBhbmQgbm90ICYgMHg3Ri4uXG4gICAgYnl0ZUFycmF5LnB1c2goc3RyLmNoYXJDb2RlQXQoaSkgJiAweEZGKVxuICB9XG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVRvQnl0ZXMgKHN0ciwgdW5pdHMpIHtcbiAgdmFyIGMsIGhpLCBsb1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcblxuICAgIGMgPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGhpID0gYyA+PiA4XG4gICAgbG8gPSBjICUgMjU2XG4gICAgYnl0ZUFycmF5LnB1c2gobG8pXG4gICAgYnl0ZUFycmF5LnB1c2goaGkpXG4gIH1cblxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFRvQnl0ZXMgKHN0cikge1xuICByZXR1cm4gYmFzZTY0LnRvQnl0ZUFycmF5KGJhc2U2NGNsZWFuKHN0cikpXG59XG5cbmZ1bmN0aW9uIGJsaXRCdWZmZXIgKHNyYywgZHN0LCBvZmZzZXQsIGxlbmd0aCkge1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgaWYgKChpICsgb2Zmc2V0ID49IGRzdC5sZW5ndGgpIHx8IChpID49IHNyYy5sZW5ndGgpKSBicmVha1xuICAgIGRzdFtpICsgb2Zmc2V0XSA9IHNyY1tpXVxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIGlzbmFuICh2YWwpIHtcbiAgcmV0dXJuIHZhbCAhPT0gdmFsIC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tc2VsZi1jb21wYXJlXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbmV4cG9ydHMuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcbmV4cG9ydHMudG9CeXRlQXJyYXkgPSB0b0J5dGVBcnJheVxuZXhwb3J0cy5mcm9tQnl0ZUFycmF5ID0gZnJvbUJ5dGVBcnJheVxuXG52YXIgbG9va3VwID0gW11cbnZhciByZXZMb29rdXAgPSBbXVxudmFyIEFyciA9IHR5cGVvZiBVaW50OEFycmF5ICE9PSAndW5kZWZpbmVkJyA/IFVpbnQ4QXJyYXkgOiBBcnJheVxuXG52YXIgY29kZSA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvJ1xuZm9yICh2YXIgaSA9IDAsIGxlbiA9IGNvZGUubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgbG9va3VwW2ldID0gY29kZVtpXVxuICByZXZMb29rdXBbY29kZS5jaGFyQ29kZUF0KGkpXSA9IGlcbn1cblxucmV2TG9va3VwWyctJy5jaGFyQ29kZUF0KDApXSA9IDYyXG5yZXZMb29rdXBbJ18nLmNoYXJDb2RlQXQoMCldID0gNjNcblxuZnVuY3Rpb24gcGxhY2VIb2xkZXJzQ291bnQgKGI2NCkge1xuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gdGhlIG51bWJlciBvZiBlcXVhbCBzaWducyAocGxhY2UgaG9sZGVycylcbiAgLy8gaWYgdGhlcmUgYXJlIHR3byBwbGFjZWhvbGRlcnMsIHRoYW4gdGhlIHR3byBjaGFyYWN0ZXJzIGJlZm9yZSBpdFxuICAvLyByZXByZXNlbnQgb25lIGJ5dGVcbiAgLy8gaWYgdGhlcmUgaXMgb25seSBvbmUsIHRoZW4gdGhlIHRocmVlIGNoYXJhY3RlcnMgYmVmb3JlIGl0IHJlcHJlc2VudCAyIGJ5dGVzXG4gIC8vIHRoaXMgaXMganVzdCBhIGNoZWFwIGhhY2sgdG8gbm90IGRvIGluZGV4T2YgdHdpY2VcbiAgcmV0dXJuIGI2NFtsZW4gLSAyXSA9PT0gJz0nID8gMiA6IGI2NFtsZW4gLSAxXSA9PT0gJz0nID8gMSA6IDBcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoYjY0KSB7XG4gIC8vIGJhc2U2NCBpcyA0LzMgKyB1cCB0byB0d28gY2hhcmFjdGVycyBvZiB0aGUgb3JpZ2luYWwgZGF0YVxuICByZXR1cm4gKGI2NC5sZW5ndGggKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG59XG5cbmZ1bmN0aW9uIHRvQnl0ZUFycmF5IChiNjQpIHtcbiAgdmFyIGksIGwsIHRtcCwgcGxhY2VIb2xkZXJzLCBhcnJcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcbiAgcGxhY2VIb2xkZXJzID0gcGxhY2VIb2xkZXJzQ291bnQoYjY0KVxuXG4gIGFyciA9IG5ldyBBcnIoKGxlbiAqIDMgLyA0KSAtIHBsYWNlSG9sZGVycylcblxuICAvLyBpZiB0aGVyZSBhcmUgcGxhY2Vob2xkZXJzLCBvbmx5IGdldCB1cCB0byB0aGUgbGFzdCBjb21wbGV0ZSA0IGNoYXJzXG4gIGwgPSBwbGFjZUhvbGRlcnMgPiAwID8gbGVuIC0gNCA6IGxlblxuXG4gIHZhciBMID0gMFxuXG4gIGZvciAoaSA9IDA7IGkgPCBsOyBpICs9IDQpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAxOCkgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildIDw8IDYpIHwgcmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAzKV1cbiAgICBhcnJbTCsrXSA9ICh0bXAgPj4gMTYpICYgMHhGRlxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnMgPT09IDIpIHtcbiAgICB0bXAgPSAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA+PiA0KVxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9IGVsc2UgaWYgKHBsYWNlSG9sZGVycyA9PT0gMSkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDEwKSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA+PiAyKVxuICAgIGFycltMKytdID0gKHRtcCA+PiA4KSAmIDB4RkZcbiAgICBhcnJbTCsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBhcnJcbn1cblxuZnVuY3Rpb24gdHJpcGxldFRvQmFzZTY0IChudW0pIHtcbiAgcmV0dXJuIGxvb2t1cFtudW0gPj4gMTggJiAweDNGXSArIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArIGxvb2t1cFtudW0gPj4gNiAmIDB4M0ZdICsgbG9va3VwW251bSAmIDB4M0ZdXG59XG5cbmZ1bmN0aW9uIGVuY29kZUNodW5rICh1aW50OCwgc3RhcnQsIGVuZCkge1xuICB2YXIgdG1wXG4gIHZhciBvdXRwdXQgPSBbXVxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7IGkgKz0gMykge1xuICAgIHRtcCA9ICh1aW50OFtpXSA8PCAxNikgKyAodWludDhbaSArIDFdIDw8IDgpICsgKHVpbnQ4W2kgKyAyXSlcbiAgICBvdXRwdXQucHVzaCh0cmlwbGV0VG9CYXNlNjQodG1wKSlcbiAgfVxuICByZXR1cm4gb3V0cHV0LmpvaW4oJycpXG59XG5cbmZ1bmN0aW9uIGZyb21CeXRlQXJyYXkgKHVpbnQ4KSB7XG4gIHZhciB0bXBcbiAgdmFyIGxlbiA9IHVpbnQ4Lmxlbmd0aFxuICB2YXIgZXh0cmFCeXRlcyA9IGxlbiAlIDMgLy8gaWYgd2UgaGF2ZSAxIGJ5dGUgbGVmdCwgcGFkIDIgYnl0ZXNcbiAgdmFyIG91dHB1dCA9ICcnXG4gIHZhciBwYXJ0cyA9IFtdXG4gIHZhciBtYXhDaHVua0xlbmd0aCA9IDE2MzgzIC8vIG11c3QgYmUgbXVsdGlwbGUgb2YgM1xuXG4gIC8vIGdvIHRocm91Z2ggdGhlIGFycmF5IGV2ZXJ5IHRocmVlIGJ5dGVzLCB3ZSdsbCBkZWFsIHdpdGggdHJhaWxpbmcgc3R1ZmYgbGF0ZXJcbiAgZm9yICh2YXIgaSA9IDAsIGxlbjIgPSBsZW4gLSBleHRyYUJ5dGVzOyBpIDwgbGVuMjsgaSArPSBtYXhDaHVua0xlbmd0aCkge1xuICAgIHBhcnRzLnB1c2goZW5jb2RlQ2h1bmsodWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKSkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBvdXRwdXQgKz0gbG9va3VwW3RtcCA+PiAyXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9ICc9PSdcbiAgfSBlbHNlIGlmIChleHRyYUJ5dGVzID09PSAyKSB7XG4gICAgdG1wID0gKHVpbnQ4W2xlbiAtIDJdIDw8IDgpICsgKHVpbnQ4W2xlbiAtIDFdKVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDEwXVxuICAgIG91dHB1dCArPSBsb29rdXBbKHRtcCA+PiA0KSAmIDB4M0ZdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDIpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz0nXG4gIH1cblxuICBwYXJ0cy5wdXNoKG91dHB1dClcblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2Jhc2U2NC1qcy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRvU3RyaW5nID0ge30udG9TdHJpbmc7XG5cbm1vZHVsZS5leHBvcnRzID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiAoYXJyKSB7XG4gIHJldHVybiB0b1N0cmluZy5jYWxsKGFycikgPT0gJ1tvYmplY3QgQXJyYXldJztcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyoqXG4gKiBCaXQgdHdpZGRsaW5nIGhhY2tzIGZvciBKYXZhU2NyaXB0LlxuICpcbiAqIEF1dGhvcjogTWlrb2xhIEx5c2Vua29cbiAqXG4gKiBQb3J0ZWQgZnJvbSBTdGFuZm9yZCBiaXQgdHdpZGRsaW5nIGhhY2sgbGlicmFyeTpcbiAqICAgIGh0dHA6Ly9ncmFwaGljcy5zdGFuZm9yZC5lZHUvfnNlYW5kZXIvYml0aGFja3MuaHRtbFxuICovXG5cblwidXNlIHN0cmljdFwiOyBcInVzZSByZXN0cmljdFwiO1xuXG4vL051bWJlciBvZiBiaXRzIGluIGFuIGludGVnZXJcbnZhciBJTlRfQklUUyA9IDMyO1xuXG4vL0NvbnN0YW50c1xuZXhwb3J0cy5JTlRfQklUUyAgPSBJTlRfQklUUztcbmV4cG9ydHMuSU5UX01BWCAgID0gIDB4N2ZmZmZmZmY7XG5leHBvcnRzLklOVF9NSU4gICA9IC0xPDwoSU5UX0JJVFMtMSk7XG5cbi8vUmV0dXJucyAtMSwgMCwgKzEgZGVwZW5kaW5nIG9uIHNpZ24gb2YgeFxuZXhwb3J0cy5zaWduID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gKHYgPiAwKSAtICh2IDwgMCk7XG59XG5cbi8vQ29tcHV0ZXMgYWJzb2x1dGUgdmFsdWUgb2YgaW50ZWdlclxuZXhwb3J0cy5hYnMgPSBmdW5jdGlvbih2KSB7XG4gIHZhciBtYXNrID0gdiA+PiAoSU5UX0JJVFMtMSk7XG4gIHJldHVybiAodiBeIG1hc2spIC0gbWFzaztcbn1cblxuLy9Db21wdXRlcyBtaW5pbXVtIG9mIGludGVnZXJzIHggYW5kIHlcbmV4cG9ydHMubWluID0gZnVuY3Rpb24oeCwgeSkge1xuICByZXR1cm4geSBeICgoeCBeIHkpICYgLSh4IDwgeSkpO1xufVxuXG4vL0NvbXB1dGVzIG1heGltdW0gb2YgaW50ZWdlcnMgeCBhbmQgeVxuZXhwb3J0cy5tYXggPSBmdW5jdGlvbih4LCB5KSB7XG4gIHJldHVybiB4IF4gKCh4IF4geSkgJiAtKHggPCB5KSk7XG59XG5cbi8vQ2hlY2tzIGlmIGEgbnVtYmVyIGlzIGEgcG93ZXIgb2YgdHdvXG5leHBvcnRzLmlzUG93MiA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICEodiAmICh2LTEpKSAmJiAoISF2KTtcbn1cblxuLy9Db21wdXRlcyBsb2cgYmFzZSAyIG9mIHZcbmV4cG9ydHMubG9nMiA9IGZ1bmN0aW9uKHYpIHtcbiAgdmFyIHIsIHNoaWZ0O1xuICByID0gICAgICh2ID4gMHhGRkZGKSA8PCA0OyB2ID4+Pj0gcjtcbiAgc2hpZnQgPSAodiA+IDB4RkYgICkgPDwgMzsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xuICBzaGlmdCA9ICh2ID4gMHhGICAgKSA8PCAyOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XG4gIHNoaWZ0ID0gKHYgPiAweDMgICApIDw8IDE7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcbiAgcmV0dXJuIHIgfCAodiA+PiAxKTtcbn1cblxuLy9Db21wdXRlcyBsb2cgYmFzZSAxMCBvZiB2XG5leHBvcnRzLmxvZzEwID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gICh2ID49IDEwMDAwMDAwMDApID8gOSA6ICh2ID49IDEwMDAwMDAwMCkgPyA4IDogKHYgPj0gMTAwMDAwMDApID8gNyA6XG4gICAgICAgICAgKHYgPj0gMTAwMDAwMCkgPyA2IDogKHYgPj0gMTAwMDAwKSA/IDUgOiAodiA+PSAxMDAwMCkgPyA0IDpcbiAgICAgICAgICAodiA+PSAxMDAwKSA/IDMgOiAodiA+PSAxMDApID8gMiA6ICh2ID49IDEwKSA/IDEgOiAwO1xufVxuXG4vL0NvdW50cyBudW1iZXIgb2YgYml0c1xuZXhwb3J0cy5wb3BDb3VudCA9IGZ1bmN0aW9uKHYpIHtcbiAgdiA9IHYgLSAoKHYgPj4+IDEpICYgMHg1NTU1NTU1NSk7XG4gIHYgPSAodiAmIDB4MzMzMzMzMzMpICsgKCh2ID4+PiAyKSAmIDB4MzMzMzMzMzMpO1xuICByZXR1cm4gKCh2ICsgKHYgPj4+IDQpICYgMHhGMEYwRjBGKSAqIDB4MTAxMDEwMSkgPj4+IDI0O1xufVxuXG4vL0NvdW50cyBudW1iZXIgb2YgdHJhaWxpbmcgemVyb3NcbmZ1bmN0aW9uIGNvdW50VHJhaWxpbmdaZXJvcyh2KSB7XG4gIHZhciBjID0gMzI7XG4gIHYgJj0gLXY7XG4gIGlmICh2KSBjLS07XG4gIGlmICh2ICYgMHgwMDAwRkZGRikgYyAtPSAxNjtcbiAgaWYgKHYgJiAweDAwRkYwMEZGKSBjIC09IDg7XG4gIGlmICh2ICYgMHgwRjBGMEYwRikgYyAtPSA0O1xuICBpZiAodiAmIDB4MzMzMzMzMzMpIGMgLT0gMjtcbiAgaWYgKHYgJiAweDU1NTU1NTU1KSBjIC09IDE7XG4gIHJldHVybiBjO1xufVxuZXhwb3J0cy5jb3VudFRyYWlsaW5nWmVyb3MgPSBjb3VudFRyYWlsaW5nWmVyb3M7XG5cbi8vUm91bmRzIHRvIG5leHQgcG93ZXIgb2YgMlxuZXhwb3J0cy5uZXh0UG93MiA9IGZ1bmN0aW9uKHYpIHtcbiAgdiArPSB2ID09PSAwO1xuICAtLXY7XG4gIHYgfD0gdiA+Pj4gMTtcbiAgdiB8PSB2ID4+PiAyO1xuICB2IHw9IHYgPj4+IDQ7XG4gIHYgfD0gdiA+Pj4gODtcbiAgdiB8PSB2ID4+PiAxNjtcbiAgcmV0dXJuIHYgKyAxO1xufVxuXG4vL1JvdW5kcyBkb3duIHRvIHByZXZpb3VzIHBvd2VyIG9mIDJcbmV4cG9ydHMucHJldlBvdzIgPSBmdW5jdGlvbih2KSB7XG4gIHYgfD0gdiA+Pj4gMTtcbiAgdiB8PSB2ID4+PiAyO1xuICB2IHw9IHYgPj4+IDQ7XG4gIHYgfD0gdiA+Pj4gODtcbiAgdiB8PSB2ID4+PiAxNjtcbiAgcmV0dXJuIHYgLSAodj4+PjEpO1xufVxuXG4vL0NvbXB1dGVzIHBhcml0eSBvZiB3b3JkXG5leHBvcnRzLnBhcml0eSA9IGZ1bmN0aW9uKHYpIHtcbiAgdiBePSB2ID4+PiAxNjtcbiAgdiBePSB2ID4+PiA4O1xuICB2IF49IHYgPj4+IDQ7XG4gIHYgJj0gMHhmO1xuICByZXR1cm4gKDB4Njk5NiA+Pj4gdikgJiAxO1xufVxuXG52YXIgUkVWRVJTRV9UQUJMRSA9IG5ldyBBcnJheSgyNTYpO1xuXG4oZnVuY3Rpb24odGFiKSB7XG4gIGZvcih2YXIgaT0wOyBpPDI1NjsgKytpKSB7XG4gICAgdmFyIHYgPSBpLCByID0gaSwgcyA9IDc7XG4gICAgZm9yICh2ID4+Pj0gMTsgdjsgdiA+Pj49IDEpIHtcbiAgICAgIHIgPDw9IDE7XG4gICAgICByIHw9IHYgJiAxO1xuICAgICAgLS1zO1xuICAgIH1cbiAgICB0YWJbaV0gPSAociA8PCBzKSAmIDB4ZmY7XG4gIH1cbn0pKFJFVkVSU0VfVEFCTEUpO1xuXG4vL1JldmVyc2UgYml0cyBpbiBhIDMyIGJpdCB3b3JkXG5leHBvcnRzLnJldmVyc2UgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAgKFJFVkVSU0VfVEFCTEVbIHYgICAgICAgICAmIDB4ZmZdIDw8IDI0KSB8XG4gICAgICAgICAgKFJFVkVSU0VfVEFCTEVbKHYgPj4+IDgpICAmIDB4ZmZdIDw8IDE2KSB8XG4gICAgICAgICAgKFJFVkVSU0VfVEFCTEVbKHYgPj4+IDE2KSAmIDB4ZmZdIDw8IDgpICB8XG4gICAgICAgICAgIFJFVkVSU0VfVEFCTEVbKHYgPj4+IDI0KSAmIDB4ZmZdO1xufVxuXG4vL0ludGVybGVhdmUgYml0cyBvZiAyIGNvb3JkaW5hdGVzIHdpdGggMTYgYml0cy4gIFVzZWZ1bCBmb3IgZmFzdCBxdWFkdHJlZSBjb2Rlc1xuZXhwb3J0cy5pbnRlcmxlYXZlMiA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgeCAmPSAweEZGRkY7XG4gIHggPSAoeCB8ICh4IDw8IDgpKSAmIDB4MDBGRjAwRkY7XG4gIHggPSAoeCB8ICh4IDw8IDQpKSAmIDB4MEYwRjBGMEY7XG4gIHggPSAoeCB8ICh4IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gIHggPSAoeCB8ICh4IDw8IDEpKSAmIDB4NTU1NTU1NTU7XG5cbiAgeSAmPSAweEZGRkY7XG4gIHkgPSAoeSB8ICh5IDw8IDgpKSAmIDB4MDBGRjAwRkY7XG4gIHkgPSAoeSB8ICh5IDw8IDQpKSAmIDB4MEYwRjBGMEY7XG4gIHkgPSAoeSB8ICh5IDw8IDIpKSAmIDB4MzMzMzMzMzM7XG4gIHkgPSAoeSB8ICh5IDw8IDEpKSAmIDB4NTU1NTU1NTU7XG5cbiAgcmV0dXJuIHggfCAoeSA8PCAxKTtcbn1cblxuLy9FeHRyYWN0cyB0aGUgbnRoIGludGVybGVhdmVkIGNvbXBvbmVudFxuZXhwb3J0cy5kZWludGVybGVhdmUyID0gZnVuY3Rpb24odiwgbikge1xuICB2ID0gKHYgPj4+IG4pICYgMHg1NTU1NTU1NTtcbiAgdiA9ICh2IHwgKHYgPj4+IDEpKSAgJiAweDMzMzMzMzMzO1xuICB2ID0gKHYgfCAodiA+Pj4gMikpICAmIDB4MEYwRjBGMEY7XG4gIHYgPSAodiB8ICh2ID4+PiA0KSkgICYgMHgwMEZGMDBGRjtcbiAgdiA9ICh2IHwgKHYgPj4+IDE2KSkgJiAweDAwMEZGRkY7XG4gIHJldHVybiAodiA8PCAxNikgPj4gMTY7XG59XG5cblxuLy9JbnRlcmxlYXZlIGJpdHMgb2YgMyBjb29yZGluYXRlcywgZWFjaCB3aXRoIDEwIGJpdHMuICBVc2VmdWwgZm9yIGZhc3Qgb2N0cmVlIGNvZGVzXG5leHBvcnRzLmludGVybGVhdmUzID0gZnVuY3Rpb24oeCwgeSwgeikge1xuICB4ICY9IDB4M0ZGO1xuICB4ICA9ICh4IHwgKHg8PDE2KSkgJiA0Mjc4MTkwMzM1O1xuICB4ICA9ICh4IHwgKHg8PDgpKSAgJiAyNTE3MTk2OTU7XG4gIHggID0gKHggfCAoeDw8NCkpICAmIDMyNzIzNTYwMzU7XG4gIHggID0gKHggfCAoeDw8MikpICAmIDEyMjcxMzM1MTM7XG5cbiAgeSAmPSAweDNGRjtcbiAgeSAgPSAoeSB8ICh5PDwxNikpICYgNDI3ODE5MDMzNTtcbiAgeSAgPSAoeSB8ICh5PDw4KSkgICYgMjUxNzE5Njk1O1xuICB5ICA9ICh5IHwgKHk8PDQpKSAgJiAzMjcyMzU2MDM1O1xuICB5ICA9ICh5IHwgKHk8PDIpKSAgJiAxMjI3MTMzNTEzO1xuICB4IHw9ICh5IDw8IDEpO1xuICBcbiAgeiAmPSAweDNGRjtcbiAgeiAgPSAoeiB8ICh6PDwxNikpICYgNDI3ODE5MDMzNTtcbiAgeiAgPSAoeiB8ICh6PDw4KSkgICYgMjUxNzE5Njk1O1xuICB6ICA9ICh6IHwgKHo8PDQpKSAgJiAzMjcyMzU2MDM1O1xuICB6ICA9ICh6IHwgKHo8PDIpKSAgJiAxMjI3MTMzNTEzO1xuICBcbiAgcmV0dXJuIHggfCAoeiA8PCAyKTtcbn1cblxuLy9FeHRyYWN0cyBudGggaW50ZXJsZWF2ZWQgY29tcG9uZW50IG9mIGEgMy10dXBsZVxuZXhwb3J0cy5kZWludGVybGVhdmUzID0gZnVuY3Rpb24odiwgbikge1xuICB2ID0gKHYgPj4+IG4pICAgICAgICYgMTIyNzEzMzUxMztcbiAgdiA9ICh2IHwgKHY+Pj4yKSkgICAmIDMyNzIzNTYwMzU7XG4gIHYgPSAodiB8ICh2Pj4+NCkpICAgJiAyNTE3MTk2OTU7XG4gIHYgPSAodiB8ICh2Pj4+OCkpICAgJiA0Mjc4MTkwMzM1O1xuICB2ID0gKHYgfCAodj4+PjE2KSkgICYgMHgzRkY7XG4gIHJldHVybiAodjw8MjIpPj4yMjtcbn1cblxuLy9Db21wdXRlcyBuZXh0IGNvbWJpbmF0aW9uIGluIGNvbGV4aWNvZ3JhcGhpYyBvcmRlciAodGhpcyBpcyBtaXN0YWtlbmx5IGNhbGxlZCBuZXh0UGVybXV0YXRpb24gb24gdGhlIGJpdCB0d2lkZGxpbmcgaGFja3MgcGFnZSlcbmV4cG9ydHMubmV4dENvbWJpbmF0aW9uID0gZnVuY3Rpb24odikge1xuICB2YXIgdCA9IHYgfCAodiAtIDEpO1xuICByZXR1cm4gKHQgKyAxKSB8ICgoKH50ICYgLX50KSAtIDEpID4+PiAoY291bnRUcmFpbGluZ1plcm9zKHYpICsgMSkpO1xufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9iaXQtdHdpZGRsZS90d2lkZGxlLmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGR1cGVfYXJyYXkoY291bnQsIHZhbHVlLCBpKSB7XG4gIHZhciBjID0gY291bnRbaV18MFxuICBpZihjIDw9IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGMpLCBqXG4gIGlmKGkgPT09IGNvdW50Lmxlbmd0aC0xKSB7XG4gICAgZm9yKGo9MDsgajxjOyArK2opIHtcbiAgICAgIHJlc3VsdFtqXSA9IHZhbHVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcihqPTA7IGo8YzsgKytqKSB7XG4gICAgICByZXN1bHRbal0gPSBkdXBlX2FycmF5KGNvdW50LCB2YWx1ZSwgaSsxKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGR1cGVfbnVtYmVyKGNvdW50LCB2YWx1ZSkge1xuICB2YXIgcmVzdWx0LCBpXG4gIHJlc3VsdCA9IG5ldyBBcnJheShjb3VudClcbiAgZm9yKGk9MDsgaTxjb3VudDsgKytpKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGR1cGUoY291bnQsIHZhbHVlKSB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhbHVlID0gMFxuICB9XG4gIHN3aXRjaCh0eXBlb2YgY291bnQpIHtcbiAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICBpZihjb3VudCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGR1cGVfbnVtYmVyKGNvdW50fDAsIHZhbHVlKVxuICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgaWYodHlwZW9mIChjb3VudC5sZW5ndGgpID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBkdXBlX2FycmF5KGNvdW50LCB2YWx1ZSwgMClcbiAgICAgIH1cbiAgICBicmVha1xuICB9XG4gIHJldHVybiBbXVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGR1cGVcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kdXAvZHVwLmpzXG4vLyBtb2R1bGUgaWQgPSA0OFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBjb21waWxlID0gcmVxdWlyZShcImN3aXNlLWNvbXBpbGVyXCIpXG5cbnZhciBFbXB0eVByb2MgPSB7XG4gIGJvZHk6IFwiXCIsXG4gIGFyZ3M6IFtdLFxuICB0aGlzVmFyczogW10sXG4gIGxvY2FsVmFyczogW11cbn1cblxuZnVuY3Rpb24gZml4dXAoeCkge1xuICBpZigheCkge1xuICAgIHJldHVybiBFbXB0eVByb2NcbiAgfVxuICBmb3IodmFyIGk9MDsgaTx4LmFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYSA9IHguYXJnc1tpXVxuICAgIGlmKGkgPT09IDApIHtcbiAgICAgIHguYXJnc1tpXSA9IHtuYW1lOiBhLCBsdmFsdWU6dHJ1ZSwgcnZhbHVlOiAhIXgucnZhbHVlLCBjb3VudDp4LmNvdW50fHwxIH1cbiAgICB9IGVsc2Uge1xuICAgICAgeC5hcmdzW2ldID0ge25hbWU6IGEsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OiAxfVxuICAgIH1cbiAgfVxuICBpZigheC50aGlzVmFycykge1xuICAgIHgudGhpc1ZhcnMgPSBbXVxuICB9XG4gIGlmKCF4LmxvY2FsVmFycykge1xuICAgIHgubG9jYWxWYXJzID0gW11cbiAgfVxuICByZXR1cm4geFxufVxuXG5mdW5jdGlvbiBwY29tcGlsZSh1c2VyX2FyZ3MpIHtcbiAgcmV0dXJuIGNvbXBpbGUoe1xuICAgIGFyZ3M6ICAgICB1c2VyX2FyZ3MuYXJncyxcbiAgICBwcmU6ICAgICAgZml4dXAodXNlcl9hcmdzLnByZSksXG4gICAgYm9keTogICAgIGZpeHVwKHVzZXJfYXJncy5ib2R5KSxcbiAgICBwb3N0OiAgICAgZml4dXAodXNlcl9hcmdzLnByb2MpLFxuICAgIGZ1bmNOYW1lOiB1c2VyX2FyZ3MuZnVuY05hbWVcbiAgfSlcbn1cblxuZnVuY3Rpb24gbWFrZU9wKHVzZXJfYXJncykge1xuICB2YXIgYXJncyA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPHVzZXJfYXJncy5hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgYXJncy5wdXNoKFwiYVwiK2kpXG4gIH1cbiAgdmFyIHdyYXBwZXIgPSBuZXcgRnVuY3Rpb24oXCJQXCIsIFtcbiAgICBcInJldHVybiBmdW5jdGlvbiBcIiwgdXNlcl9hcmdzLmZ1bmNOYW1lLCBcIl9uZGFycmF5b3BzKFwiLCBhcmdzLmpvaW4oXCIsXCIpLCBcIikge1AoXCIsIGFyZ3Muam9pbihcIixcIiksIFwiKTtyZXR1cm4gYTB9XCJcbiAgXS5qb2luKFwiXCIpKVxuICByZXR1cm4gd3JhcHBlcihwY29tcGlsZSh1c2VyX2FyZ3MpKVxufVxuXG52YXIgYXNzaWduX29wcyA9IHtcbiAgYWRkOiAgXCIrXCIsXG4gIHN1YjogIFwiLVwiLFxuICBtdWw6ICBcIipcIixcbiAgZGl2OiAgXCIvXCIsXG4gIG1vZDogIFwiJVwiLFxuICBiYW5kOiBcIiZcIixcbiAgYm9yOiAgXCJ8XCIsXG4gIGJ4b3I6IFwiXlwiLFxuICBsc2hpZnQ6IFwiPDxcIixcbiAgcnNoaWZ0OiBcIj4+XCIsXG4gIHJyc2hpZnQ6IFwiPj4+XCJcbn1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpZCBpbiBhc3NpZ25fb3BzKSB7XG4gICAgdmFyIG9wID0gYXNzaWduX29wc1tpZF1cbiAgICBleHBvcnRzW2lkXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIixcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwiY1wiXSxcbiAgICAgICAgICAgICBib2R5OiBcImE9YlwiK29wK1wiY1wifSxcbiAgICAgIGZ1bmNOYW1lOiBpZFxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sXG4gICAgICAgICAgICAgYm9keTpcImFcIitvcCtcIj1iXCJ9LFxuICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgZnVuY05hbWU6IGlkK1wiZXFcIlxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcInNcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcInNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9YlwiK29wK1wic1wifSxcbiAgICAgIGZ1bmNOYW1lOiBpZCtcInNcIlxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcInNlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwic2NhbGFyXCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYVwiK29wK1wiPXNcIn0sXG4gICAgICBydmFsdWU6IHRydWUsXG4gICAgICBmdW5jTmFtZTogaWQrXCJzZXFcIlxuICAgIH0pXG4gIH1cbn0pKCk7XG5cbnZhciB1bmFyeV9vcHMgPSB7XG4gIG5vdDogXCIhXCIsXG4gIGJub3Q6IFwiflwiLFxuICBuZWc6IFwiLVwiLFxuICByZWNpcDogXCIxLjAvXCJcbn1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpZCBpbiB1bmFyeV9vcHMpIHtcbiAgICB2YXIgb3AgPSB1bmFyeV9vcHNbaWRdXG4gICAgZXhwb3J0c1tpZF0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9XCIrb3ArXCJiXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wiZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPVwiK29wK1wiYVwifSxcbiAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgIGNvdW50OiAyLFxuICAgICAgZnVuY05hbWU6IGlkK1wiZXFcIlxuICAgIH0pXG4gIH1cbn0pKCk7XG5cbnZhciBiaW5hcnlfb3BzID0ge1xuICBhbmQ6IFwiJiZcIixcbiAgb3I6IFwifHxcIixcbiAgZXE6IFwiPT09XCIsXG4gIG5lcTogXCIhPT1cIixcbiAgbHQ6IFwiPFwiLFxuICBndDogXCI+XCIsXG4gIGxlcTogXCI8PVwiLFxuICBnZXE6IFwiPj1cIlxufVxuOyhmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBpZCBpbiBiaW5hcnlfb3BzKSB7XG4gICAgdmFyIG9wID0gYmluYXJ5X29wc1tpZF1cbiAgICBleHBvcnRzW2lkXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIixcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIiwgXCJjXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWJcIitvcCtcImNcIn0sXG4gICAgICBmdW5jTmFtZTogaWRcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsXCJhcnJheVwiLFwic2NhbGFyXCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIiwgXCJzXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWJcIitvcCtcInNcIn0sXG4gICAgICBmdW5jTmFtZTogaWQrXCJzXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9YVwiK29wK1wiYlwifSxcbiAgICAgIHJ2YWx1ZTp0cnVlLFxuICAgICAgY291bnQ6MixcbiAgICAgIGZ1bmNOYW1lOiBpZCtcImVxXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJzXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWFcIitvcCtcInNcIn0sXG4gICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgIGNvdW50OjIsXG4gICAgICBmdW5jTmFtZTogaWQrXCJzZXFcIlxuICAgIH0pXG4gIH1cbn0pKCk7XG5cbnZhciBtYXRoX3VuYXJ5ID0gW1xuICBcImFic1wiLFxuICBcImFjb3NcIixcbiAgXCJhc2luXCIsXG4gIFwiYXRhblwiLFxuICBcImNlaWxcIixcbiAgXCJjb3NcIixcbiAgXCJleHBcIixcbiAgXCJmbG9vclwiLFxuICBcImxvZ1wiLFxuICBcInJvdW5kXCIsXG4gIFwic2luXCIsXG4gIFwic3FydFwiLFxuICBcInRhblwiXG5dXG47KGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGk9MDsgaTxtYXRoX3VuYXJ5Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGYgPSBtYXRoX3VuYXJ5W2ldXG4gICAgZXhwb3J0c1tmXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGZcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wiZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgICAgIGFyZ3M6IFtcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOiBbXCJhXCJdLCBib2R5OlwiYT10aGlzX2YoYSlcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgICBydmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJlcVwiXG4gICAgICAgICAgICAgICAgICAgIH0pXG4gIH1cbn0pKCk7XG5cbnZhciBtYXRoX2NvbW0gPSBbXG4gIFwibWF4XCIsXG4gIFwibWluXCIsXG4gIFwiYXRhbjJcIixcbiAgXCJwb3dcIlxuXVxuOyhmdW5jdGlvbigpe1xuICBmb3IodmFyIGk9MDsgaTxtYXRoX2NvbW0ubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZj0gbWF0aF9jb21tW2ldXG4gICAgZXhwb3J0c1tmXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwiY1wiXSwgYm9keTpcImE9dGhpc19mKGIsYylcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmXG4gICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJzXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwiY1wiXSwgYm9keTpcImE9dGhpc19mKGIsYylcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wic1wiXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcImVxXCJdID0gbWFrZU9wKHsgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYSxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcImVxXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wic2VxXCJdID0gbWFrZU9wKHsgYXJnczpbXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGEsYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIHJ2YWx1ZTp0cnVlLFxuICAgICAgICAgICAgICAgICAgY291bnQ6MixcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wic2VxXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gIH1cbn0pKCk7XG5cbnZhciBtYXRoX25vbmNvbW0gPSBbXG4gIFwiYXRhbjJcIixcbiAgXCJwb3dcIlxuXVxuOyhmdW5jdGlvbigpe1xuICBmb3IodmFyIGk9MDsgaTxtYXRoX25vbmNvbW0ubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZj0gbWF0aF9ub25jb21tW2ldXG4gICAgZXhwb3J0c1tmK1wib3BcIl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihjLGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wXCJcbiAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcIm9wc1wiXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihjLGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wc1wiXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcIm9wZXFcIl0gPSBtYWtlT3AoeyBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGEpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wib3BlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcIm9wc2VxXCJdID0gbWFrZU9wKHsgYXJnczpbXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGIsYSlcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIHJ2YWx1ZTp0cnVlLFxuICAgICAgICAgICAgICAgICAgY291bnQ6MixcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wib3BzZXFcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgfVxufSkoKTtcblxuZXhwb3J0cy5hbnkgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiBFbXB0eVByb2MsXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBib2R5OiBcImlmKGEpe3JldHVybiB0cnVlfVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW119LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXSwgYm9keTpcInJldHVybiBmYWxzZVwifSxcbiAgZnVuY05hbWU6IFwiYW55XCJcbn0pXG5cbmV4cG9ydHMuYWxsID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZTogRW1wdHlQcm9jLFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJ4XCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJpZigheCl7cmV0dXJuIGZhbHNlfVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW119LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXSwgYm9keTpcInJldHVybiB0cnVlXCJ9LFxuICBmdW5jTmFtZTogXCJhbGxcIlxufSlcblxuZXhwb3J0cy5zdW0gPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIGJvZHk6IFwidGhpc19zKz1hXCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gdGhpc19zXCJ9LFxuICBmdW5jTmFtZTogXCJzdW1cIlxufSlcblxuZXhwb3J0cy5wcm9kID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTFcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBib2R5OiBcInRoaXNfcyo9YVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwicHJvZFwiXG59KVxuXG5leHBvcnRzLm5vcm0yc3F1YXJlZCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjJ9XSwgYm9keTogXCJ0aGlzX3MrPWEqYVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwibm9ybTJzcXVhcmVkXCJcbn0pXG4gIFxuZXhwb3J0cy5ub3JtMiA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjJ9XSwgYm9keTogXCJ0aGlzX3MrPWEqYVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIE1hdGguc3FydCh0aGlzX3MpXCJ9LFxuICBmdW5jTmFtZTogXCJub3JtMlwiXG59KVxuICBcblxuZXhwb3J0cy5ub3JtaW5mID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6NH1dLCBib2R5OlwiaWYoLWE+dGhpc19zKXt0aGlzX3M9LWF9ZWxzZSBpZihhPnRoaXNfcyl7dGhpc19zPWF9XCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gdGhpc19zXCJ9LFxuICBmdW5jTmFtZTogXCJub3JtaW5mXCJcbn0pXG5cbmV4cG9ydHMubm9ybTEgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDozfV0sIGJvZHk6IFwidGhpc19zKz1hPDA/LWE6YVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwibm9ybTFcIlxufSlcblxuZXhwb3J0cy5zdXAgPSBjb21waWxlKHtcbiAgYXJnczogWyBcImFycmF5XCIgXSxcbiAgcHJlOlxuICAgeyBib2R5OiBcInRoaXNfaD0tSW5maW5pdHlcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBib2R5OlxuICAgeyBib2R5OiBcImlmKF9pbmxpbmVfMV9hcmcwXz50aGlzX2gpdGhpc19oPV9pbmxpbmVfMV9hcmcwX1wiLFxuICAgICBhcmdzOiBbe1wibmFtZVwiOlwiX2lubGluZV8xX2FyZzBfXCIsXCJsdmFsdWVcIjpmYWxzZSxcInJ2YWx1ZVwiOnRydWUsXCJjb3VudFwiOjJ9IF0sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBwb3N0OlxuICAgeyBib2R5OiBcInJldHVybiB0aGlzX2hcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9XG4gfSlcblxuZXhwb3J0cy5pbmYgPSBjb21waWxlKHtcbiAgYXJnczogWyBcImFycmF5XCIgXSxcbiAgcHJlOlxuICAgeyBib2R5OiBcInRoaXNfaD1JbmZpbml0eVwiLFxuICAgICBhcmdzOiBbXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH0sXG4gIGJvZHk6XG4gICB7IGJvZHk6IFwiaWYoX2lubGluZV8xX2FyZzBfPHRoaXNfaCl0aGlzX2g9X2lubGluZV8xX2FyZzBfXCIsXG4gICAgIGFyZ3M6IFt7XCJuYW1lXCI6XCJfaW5saW5lXzFfYXJnMF9cIixcImx2YWx1ZVwiOmZhbHNlLFwicnZhbHVlXCI6dHJ1ZSxcImNvdW50XCI6Mn0gXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH0sXG4gIHBvc3Q6XG4gICB7IGJvZHk6IFwicmV0dXJuIHRoaXNfaFwiLFxuICAgICBhcmdzOiBbXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH1cbiB9KVxuXG5leHBvcnRzLmFyZ21pbiA9IGNvbXBpbGUoe1xuICBhcmdzOltcImluZGV4XCIsXCJhcnJheVwiLFwic2hhcGVcIl0sXG4gIHByZTp7XG4gICAgYm9keTpcInt0aGlzX3Y9SW5maW5pdHk7dGhpc19pPV9pbmxpbmVfMF9hcmcyXy5zbGljZSgwKX1cIixcbiAgICBhcmdzOltcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzBfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTpmYWxzZSxjb3VudDowfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzFfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTpmYWxzZSxjb3VudDowfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzJfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjF9XG4gICAgICBdLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiLFwidGhpc192XCJdLFxuICAgIGxvY2FsVmFyczpbXX0sXG4gIGJvZHk6e1xuICAgIGJvZHk6XCJ7aWYoX2lubGluZV8xX2FyZzFfPHRoaXNfdil7dGhpc192PV9pbmxpbmVfMV9hcmcxXztmb3IodmFyIF9pbmxpbmVfMV9rPTA7X2lubGluZV8xX2s8X2lubGluZV8xX2FyZzBfLmxlbmd0aDsrK19pbmxpbmVfMV9rKXt0aGlzX2lbX2lubGluZV8xX2tdPV9pbmxpbmVfMV9hcmcwX1tfaW5saW5lXzFfa119fX1cIixcbiAgICBhcmdzOltcbiAgICAgIHtuYW1lOlwiX2lubGluZV8xX2FyZzBfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjJ9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzFfYXJnMV9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6Mn1dLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiLFwidGhpc192XCJdLFxuICAgIGxvY2FsVmFyczpbXCJfaW5saW5lXzFfa1wiXX0sXG4gIHBvc3Q6e1xuICAgIGJvZHk6XCJ7cmV0dXJuIHRoaXNfaX1cIixcbiAgICBhcmdzOltdLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiXSxcbiAgICBsb2NhbFZhcnM6W119XG59KVxuXG5leHBvcnRzLmFyZ21heCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImluZGV4XCIsXCJhcnJheVwiLFwic2hhcGVcIl0sXG4gIHByZTp7XG4gICAgYm9keTpcInt0aGlzX3Y9LUluZmluaXR5O3RoaXNfaT1faW5saW5lXzBfYXJnMl8uc2xpY2UoMCl9XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcyX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoxfVxuICAgICAgXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W119LFxuICBib2R5OntcbiAgICBib2R5Olwie2lmKF9pbmxpbmVfMV9hcmcxXz50aGlzX3Ype3RoaXNfdj1faW5saW5lXzFfYXJnMV87Zm9yKHZhciBfaW5saW5lXzFfaz0wO19pbmxpbmVfMV9rPF9pbmxpbmVfMV9hcmcwXy5sZW5ndGg7KytfaW5saW5lXzFfayl7dGhpc19pW19pbmxpbmVfMV9rXT1faW5saW5lXzFfYXJnMF9bX2lubGluZV8xX2tdfX19XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8xX2FyZzFfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjJ9XSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W1wiX2lubGluZV8xX2tcIl19LFxuICBwb3N0OntcbiAgICBib2R5Olwie3JldHVybiB0aGlzX2l9XCIsXG4gICAgYXJnczpbXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIl0sXG4gICAgbG9jYWxWYXJzOltdfVxufSkgIFxuXG5leHBvcnRzLnJhbmRvbSA9IG1ha2VPcCh7XG4gIGFyZ3M6IFtcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGgucmFuZG9tXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gIGJvZHk6IHthcmdzOiBbXCJhXCJdLCBib2R5OlwiYT10aGlzX2YoKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICBmdW5jTmFtZTogXCJyYW5kb21cIlxufSlcblxuZXhwb3J0cy5hc3NpZ24gPSBtYWtlT3Aoe1xuICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCJdLCBib2R5OlwiYT1iXCJ9LFxuICBmdW5jTmFtZTogXCJhc3NpZ25cIiB9KVxuXG5leHBvcnRzLmFzc2lnbnMgPSBtYWtlT3Aoe1xuICBhcmdzOltcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiXSwgYm9keTpcImE9YlwifSxcbiAgZnVuY05hbWU6IFwiYXNzaWduc1wiIH0pXG5cblxuZXhwb3J0cy5lcXVhbHMgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwieFwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfSxcbiAgICAgICAgICAgICAgIHtuYW1lOlwieVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIFxuICAgICAgICBib2R5OiBcImlmKHghPT15KXtyZXR1cm4gZmFsc2V9XCIsIFxuICAgICAgICBsb2NhbFZhcnM6IFtdLCBcbiAgICAgICAgdGhpc1ZhcnM6IFtdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W10sIGJvZHk6XCJyZXR1cm4gdHJ1ZVwifSxcbiAgZnVuY05hbWU6IFwiZXF1YWxzXCJcbn0pXG5cblxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmRhcnJheS1vcHMvbmRhcnJheS1vcHMuanNcbi8vIG1vZHVsZSBpZCA9IDQ5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNyZWF0ZVRodW5rID0gcmVxdWlyZShcIi4vbGliL3RodW5rLmpzXCIpXG5cbmZ1bmN0aW9uIFByb2NlZHVyZSgpIHtcbiAgdGhpcy5hcmdUeXBlcyA9IFtdXG4gIHRoaXMuc2hpbUFyZ3MgPSBbXVxuICB0aGlzLmFycmF5QXJncyA9IFtdXG4gIHRoaXMuYXJyYXlCbG9ja0luZGljZXMgPSBbXVxuICB0aGlzLnNjYWxhckFyZ3MgPSBbXVxuICB0aGlzLm9mZnNldEFyZ3MgPSBbXVxuICB0aGlzLm9mZnNldEFyZ0luZGV4ID0gW11cbiAgdGhpcy5pbmRleEFyZ3MgPSBbXVxuICB0aGlzLnNoYXBlQXJncyA9IFtdXG4gIHRoaXMuZnVuY05hbWUgPSBcIlwiXG4gIHRoaXMucHJlID0gbnVsbFxuICB0aGlzLmJvZHkgPSBudWxsXG4gIHRoaXMucG9zdCA9IG51bGxcbiAgdGhpcy5kZWJ1ZyA9IGZhbHNlXG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVDd2lzZSh1c2VyX2FyZ3MpIHtcbiAgLy9DcmVhdGUgcHJvY2VkdXJlXG4gIHZhciBwcm9jID0gbmV3IFByb2NlZHVyZSgpXG4gIFxuICAvL1BhcnNlIGJsb2Nrc1xuICBwcm9jLnByZSAgICA9IHVzZXJfYXJncy5wcmVcbiAgcHJvYy5ib2R5ICAgPSB1c2VyX2FyZ3MuYm9keVxuICBwcm9jLnBvc3QgICA9IHVzZXJfYXJncy5wb3N0XG5cbiAgLy9QYXJzZSBhcmd1bWVudHNcbiAgdmFyIHByb2NfYXJncyA9IHVzZXJfYXJncy5hcmdzLnNsaWNlKDApXG4gIHByb2MuYXJnVHlwZXMgPSBwcm9jX2FyZ3NcbiAgZm9yKHZhciBpPTA7IGk8cHJvY19hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGFyZ190eXBlID0gcHJvY19hcmdzW2ldXG4gICAgaWYoYXJnX3R5cGUgPT09IFwiYXJyYXlcIiB8fCAodHlwZW9mIGFyZ190eXBlID09PSBcIm9iamVjdFwiICYmIGFyZ190eXBlLmJsb2NrSW5kaWNlcykpIHtcbiAgICAgIHByb2MuYXJnVHlwZXNbaV0gPSBcImFycmF5XCJcbiAgICAgIHByb2MuYXJyYXlBcmdzLnB1c2goaSlcbiAgICAgIHByb2MuYXJyYXlCbG9ja0luZGljZXMucHVzaChhcmdfdHlwZS5ibG9ja0luZGljZXMgPyBhcmdfdHlwZS5ibG9ja0luZGljZXMgOiAwKVxuICAgICAgcHJvYy5zaGltQXJncy5wdXNoKFwiYXJyYXlcIiArIGkpXG4gICAgICBpZihpIDwgcHJvYy5wcmUuYXJncy5sZW5ndGggJiYgcHJvYy5wcmUuYXJnc1tpXS5jb3VudD4wKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwcmUoKSBibG9jayBtYXkgbm90IHJlZmVyZW5jZSBhcnJheSBhcmdzXCIpXG4gICAgICB9XG4gICAgICBpZihpIDwgcHJvYy5wb3N0LmFyZ3MubGVuZ3RoICYmIHByb2MucG9zdC5hcmdzW2ldLmNvdW50PjApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHBvc3QoKSBibG9jayBtYXkgbm90IHJlZmVyZW5jZSBhcnJheSBhcmdzXCIpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKGFyZ190eXBlID09PSBcInNjYWxhclwiKSB7XG4gICAgICBwcm9jLnNjYWxhckFyZ3MucHVzaChpKVxuICAgICAgcHJvYy5zaGltQXJncy5wdXNoKFwic2NhbGFyXCIgKyBpKVxuICAgIH0gZWxzZSBpZihhcmdfdHlwZSA9PT0gXCJpbmRleFwiKSB7XG4gICAgICBwcm9jLmluZGV4QXJncy5wdXNoKGkpXG4gICAgICBpZihpIDwgcHJvYy5wcmUuYXJncy5sZW5ndGggJiYgcHJvYy5wcmUuYXJnc1tpXS5jb3VudCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHByZSgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGluZGV4XCIpXG4gICAgICB9XG4gICAgICBpZihpIDwgcHJvYy5ib2R5LmFyZ3MubGVuZ3RoICYmIHByb2MuYm9keS5hcmdzW2ldLmx2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogYm9keSgpIGJsb2NrIG1heSBub3Qgd3JpdGUgdG8gYXJyYXkgaW5kZXhcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLnBvc3QuYXJncy5sZW5ndGggJiYgcHJvYy5wb3N0LmFyZ3NbaV0uY291bnQgPiAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwb3N0KCkgYmxvY2sgbWF5IG5vdCByZWZlcmVuY2UgYXJyYXkgaW5kZXhcIilcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoYXJnX3R5cGUgPT09IFwic2hhcGVcIikge1xuICAgICAgcHJvYy5zaGFwZUFyZ3MucHVzaChpKVxuICAgICAgaWYoaSA8IHByb2MucHJlLmFyZ3MubGVuZ3RoICYmIHByb2MucHJlLmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwcmUoKSBibG9jayBtYXkgbm90IHdyaXRlIHRvIGFycmF5IHNoYXBlXCIpXG4gICAgICB9XG4gICAgICBpZihpIDwgcHJvYy5ib2R5LmFyZ3MubGVuZ3RoICYmIHByb2MuYm9keS5hcmdzW2ldLmx2YWx1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogYm9keSgpIGJsb2NrIG1heSBub3Qgd3JpdGUgdG8gYXJyYXkgc2hhcGVcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLnBvc3QuYXJncy5sZW5ndGggJiYgcHJvYy5wb3N0LmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBwb3N0KCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBzaGFwZVwiKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZih0eXBlb2YgYXJnX3R5cGUgPT09IFwib2JqZWN0XCIgJiYgYXJnX3R5cGUub2Zmc2V0KSB7XG4gICAgICBwcm9jLmFyZ1R5cGVzW2ldID0gXCJvZmZzZXRcIlxuICAgICAgcHJvYy5vZmZzZXRBcmdzLnB1c2goeyBhcnJheTogYXJnX3R5cGUuYXJyYXksIG9mZnNldDphcmdfdHlwZS5vZmZzZXQgfSlcbiAgICAgIHByb2Mub2Zmc2V0QXJnSW5kZXgucHVzaChpKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogVW5rbm93biBhcmd1bWVudCB0eXBlIFwiICsgcHJvY19hcmdzW2ldKVxuICAgIH1cbiAgfVxuICBcbiAgLy9NYWtlIHN1cmUgYXQgbGVhc3Qgb25lIGFycmF5IGFyZ3VtZW50IHdhcyBzcGVjaWZpZWRcbiAgaWYocHJvYy5hcnJheUFyZ3MubGVuZ3RoIDw9IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogTm8gYXJyYXkgYXJndW1lbnRzIHNwZWNpZmllZFwiKVxuICB9XG4gIFxuICAvL01ha2Ugc3VyZSBhcmd1bWVudHMgYXJlIGNvcnJlY3RcbiAgaWYocHJvYy5wcmUuYXJncy5sZW5ndGggPiBwcm9jX2FyZ3MubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IFRvbyBtYW55IGFyZ3VtZW50cyBpbiBwcmUoKSBibG9ja1wiKVxuICB9XG4gIGlmKHByb2MuYm9keS5hcmdzLmxlbmd0aCA+IHByb2NfYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogVG9vIG1hbnkgYXJndW1lbnRzIGluIGJvZHkoKSBibG9ja1wiKVxuICB9XG4gIGlmKHByb2MucG9zdC5hcmdzLmxlbmd0aCA+IHByb2NfYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogVG9vIG1hbnkgYXJndW1lbnRzIGluIHBvc3QoKSBibG9ja1wiKVxuICB9XG5cbiAgLy9DaGVjayBkZWJ1ZyBmbGFnXG4gIHByb2MuZGVidWcgPSAhIXVzZXJfYXJncy5wcmludENvZGUgfHwgISF1c2VyX2FyZ3MuZGVidWdcbiAgXG4gIC8vUmV0cmlldmUgbmFtZVxuICBwcm9jLmZ1bmNOYW1lID0gdXNlcl9hcmdzLmZ1bmNOYW1lIHx8IFwiY3dpc2VcIlxuICBcbiAgLy9SZWFkIGluIGJsb2NrIHNpemVcbiAgcHJvYy5ibG9ja1NpemUgPSB1c2VyX2FyZ3MuYmxvY2tTaXplIHx8IDY0XG5cbiAgcmV0dXJuIGNyZWF0ZVRodW5rKHByb2MpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY29tcGlsZUN3aXNlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9jb21waWxlci5qc1xuLy8gbW9kdWxlIGlkID0gNTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG4vLyBUaGUgZnVuY3Rpb24gYmVsb3cgaXMgY2FsbGVkIHdoZW4gY29uc3RydWN0aW5nIGEgY3dpc2UgZnVuY3Rpb24gb2JqZWN0LCBhbmQgZG9lcyB0aGUgZm9sbG93aW5nOlxuLy8gQSBmdW5jdGlvbiBvYmplY3QgaXMgY29uc3RydWN0ZWQgd2hpY2ggYWNjZXB0cyBhcyBhcmd1bWVudCBhIGNvbXBpbGF0aW9uIGZ1bmN0aW9uIGFuZCByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24uXG4vLyBJdCBpcyB0aGlzIG90aGVyIGZ1bmN0aW9uIHRoYXQgaXMgZXZlbnR1YWxseSByZXR1cm5lZCBieSBjcmVhdGVUaHVuaywgYW5kIHRoaXMgZnVuY3Rpb24gaXMgdGhlIG9uZSB0aGF0IGFjdHVhbGx5XG4vLyBjaGVja3Mgd2hldGhlciBhIGNlcnRhaW4gcGF0dGVybiBvZiBhcmd1bWVudHMgaGFzIGFscmVhZHkgYmVlbiB1c2VkIGJlZm9yZSBhbmQgY29tcGlsZXMgbmV3IGxvb3BzIGFzIG5lZWRlZC5cbi8vIFRoZSBjb21waWxhdGlvbiBwYXNzZWQgdG8gdGhlIGZpcnN0IGZ1bmN0aW9uIG9iamVjdCBpcyB1c2VkIGZvciBjb21waWxpbmcgbmV3IGZ1bmN0aW9ucy5cbi8vIE9uY2UgdGhpcyBmdW5jdGlvbiBvYmplY3QgaXMgY3JlYXRlZCwgaXQgaXMgY2FsbGVkIHdpdGggY29tcGlsZSBhcyBhcmd1bWVudCwgd2hlcmUgdGhlIGZpcnN0IGFyZ3VtZW50IG9mIGNvbXBpbGVcbi8vIGlzIGJvdW5kIHRvIFwicHJvY1wiIChlc3NlbnRpYWxseSBjb250YWluaW5nIGEgcHJlcHJvY2Vzc2VkIHZlcnNpb24gb2YgdGhlIHVzZXIgYXJndW1lbnRzIHRvIGN3aXNlKS5cbi8vIFNvIGNyZWF0ZVRodW5rIHJvdWdobHkgd29ya3MgbGlrZSB0aGlzOlxuLy8gZnVuY3Rpb24gY3JlYXRlVGh1bmsocHJvYykge1xuLy8gICB2YXIgdGh1bmsgPSBmdW5jdGlvbihjb21waWxlQm91bmQpIHtcbi8vICAgICB2YXIgQ0FDSEVEID0ge31cbi8vICAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXlzIGFuZCBzY2FsYXJzKSB7XG4vLyAgICAgICBpZiAoZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5cyBpbiBDQUNIRUQpIHtcbi8vICAgICAgICAgdmFyIGZ1bmMgPSBDQUNIRURbZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5c11cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHZhciBmdW5jID0gQ0FDSEVEW2R0eXBlIGFuZCBvcmRlciBvZiBhcnJheXNdID0gY29tcGlsZUJvdW5kKGR0eXBlIGFuZCBvcmRlciBvZiBhcnJheXMpXG4vLyAgICAgICB9XG4vLyAgICAgICByZXR1cm4gZnVuYyhhcnJheXMgYW5kIHNjYWxhcnMpXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiB0aHVuayhjb21waWxlLmJpbmQxKHByb2MpKVxuLy8gfVxuXG52YXIgY29tcGlsZSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUuanNcIilcblxuZnVuY3Rpb24gY3JlYXRlVGh1bmsocHJvYykge1xuICB2YXIgY29kZSA9IFtcIid1c2Ugc3RyaWN0J1wiLCBcInZhciBDQUNIRUQ9e31cIl1cbiAgdmFyIHZhcnMgPSBbXVxuICB2YXIgdGh1bmtOYW1lID0gcHJvYy5mdW5jTmFtZSArIFwiX2N3aXNlX3RodW5rXCJcbiAgXG4gIC8vQnVpbGQgdGh1bmtcbiAgY29kZS5wdXNoKFtcInJldHVybiBmdW5jdGlvbiBcIiwgdGh1bmtOYW1lLCBcIihcIiwgcHJvYy5zaGltQXJncy5qb2luKFwiLFwiKSwgXCIpe1wiXS5qb2luKFwiXCIpKVxuICB2YXIgdHlwZXNpZyA9IFtdXG4gIHZhciBzdHJpbmdfdHlwZXNpZyA9IFtdXG4gIHZhciBwcm9jX2FyZ3MgPSBbW1wiYXJyYXlcIixwcm9jLmFycmF5QXJnc1swXSxcIi5zaGFwZS5zbGljZShcIiwgLy8gU2xpY2Ugc2hhcGUgc28gdGhhdCB3ZSBvbmx5IHJldGFpbiB0aGUgc2hhcGUgb3ZlciB3aGljaCB3ZSBpdGVyYXRlICh3aGljaCBnZXRzIHBhc3NlZCB0byB0aGUgY3dpc2Ugb3BlcmF0b3IgYXMgU1MpLlxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCgwLHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pLHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF08MD8oXCIsXCIrcHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXStcIilcIik6XCIpXCJdLmpvaW4oXCJcIildXG4gIHZhciBzaGFwZUxlbmd0aENvbmRpdGlvbnMgPSBbXSwgc2hhcGVDb25kaXRpb25zID0gW11cbiAgLy8gUHJvY2VzcyBhcnJheSBhcmd1bWVudHNcbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgaiA9IHByb2MuYXJyYXlBcmdzW2ldXG4gICAgdmFycy5wdXNoKFtcInRcIiwgaiwgXCI9YXJyYXlcIiwgaiwgXCIuZHR5cGUsXCIsXG4gICAgICAgICAgICAgICBcInJcIiwgaiwgXCI9YXJyYXlcIiwgaiwgXCIub3JkZXJcIl0uam9pbihcIlwiKSlcbiAgICB0eXBlc2lnLnB1c2goXCJ0XCIgKyBqKVxuICAgIHR5cGVzaWcucHVzaChcInJcIiArIGopXG4gICAgc3RyaW5nX3R5cGVzaWcucHVzaChcInRcIitqKVxuICAgIHN0cmluZ190eXBlc2lnLnB1c2goXCJyXCIraitcIi5qb2luKClcIilcbiAgICBwcm9jX2FyZ3MucHVzaChcImFycmF5XCIgKyBqICsgXCIuZGF0YVwiKVxuICAgIHByb2NfYXJncy5wdXNoKFwiYXJyYXlcIiArIGogKyBcIi5zdHJpZGVcIilcbiAgICBwcm9jX2FyZ3MucHVzaChcImFycmF5XCIgKyBqICsgXCIub2Zmc2V0fDBcIilcbiAgICBpZiAoaT4wKSB7IC8vIEdhdGhlciBjb25kaXRpb25zIHRvIGNoZWNrIGZvciBzaGFwZSBlcXVhbGl0eSAoaWdub3JpbmcgYmxvY2sgaW5kaWNlcylcbiAgICAgIHNoYXBlTGVuZ3RoQ29uZGl0aW9ucy5wdXNoKFwiYXJyYXlcIiArIHByb2MuYXJyYXlBcmdzWzBdICsgXCIuc2hhcGUubGVuZ3RoPT09YXJyYXlcIiArIGogKyBcIi5zaGFwZS5sZW5ndGgrXCIgKyAoTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSktTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkpKVxuICAgICAgc2hhcGVDb25kaXRpb25zLnB1c2goXCJhcnJheVwiICsgcHJvYy5hcnJheUFyZ3NbMF0gKyBcIi5zaGFwZVtzaGFwZUluZGV4K1wiICsgTWF0aC5tYXgoMCxwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKSArIFwiXT09PWFycmF5XCIgKyBqICsgXCIuc2hhcGVbc2hhcGVJbmRleCtcIiArIE1hdGgubWF4KDAscHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkgKyBcIl1cIilcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIHNoYXBlIGVxdWFsaXR5XG4gIGlmIChwcm9jLmFycmF5QXJncy5sZW5ndGggPiAxKSB7XG4gICAgY29kZS5wdXNoKFwiaWYgKCEoXCIgKyBzaGFwZUxlbmd0aENvbmRpdGlvbnMuam9pbihcIiAmJiBcIikgKyBcIikpIHRocm93IG5ldyBFcnJvcignY3dpc2U6IEFycmF5cyBkbyBub3QgYWxsIGhhdmUgdGhlIHNhbWUgZGltZW5zaW9uYWxpdHkhJylcIilcbiAgICBjb2RlLnB1c2goXCJmb3IodmFyIHNoYXBlSW5kZXg9YXJyYXlcIiArIHByb2MuYXJyYXlBcmdzWzBdICsgXCIuc2hhcGUubGVuZ3RoLVwiICsgTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkgKyBcIjsgc2hhcGVJbmRleC0tPjA7KSB7XCIpXG4gICAgY29kZS5wdXNoKFwiaWYgKCEoXCIgKyBzaGFwZUNvbmRpdGlvbnMuam9pbihcIiAmJiBcIikgKyBcIikpIHRocm93IG5ldyBFcnJvcignY3dpc2U6IEFycmF5cyBkbyBub3QgYWxsIGhhdmUgdGhlIHNhbWUgc2hhcGUhJylcIilcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIH1cbiAgLy8gUHJvY2VzcyBzY2FsYXIgYXJndW1lbnRzXG4gIGZvcih2YXIgaT0wOyBpPHByb2Muc2NhbGFyQXJncy5sZW5ndGg7ICsraSkge1xuICAgIHByb2NfYXJncy5wdXNoKFwic2NhbGFyXCIgKyBwcm9jLnNjYWxhckFyZ3NbaV0pXG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNhY2hlZCBmdW5jdGlvbiAoYW5kIGlmIG5vdCBwcmVzZW50LCBnZW5lcmF0ZSBpdClcbiAgdmFycy5wdXNoKFtcInR5cGU9W1wiLCBzdHJpbmdfdHlwZXNpZy5qb2luKFwiLFwiKSwgXCJdLmpvaW4oKVwiXS5qb2luKFwiXCIpKVxuICB2YXJzLnB1c2goXCJwcm9jPUNBQ0hFRFt0eXBlXVwiKVxuICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICBcbiAgY29kZS5wdXNoKFtcImlmKCFwcm9jKXtcIixcbiAgICAgICAgICAgICBcIkNBQ0hFRFt0eXBlXT1wcm9jPWNvbXBpbGUoW1wiLCB0eXBlc2lnLmpvaW4oXCIsXCIpLCBcIl0pfVwiLFxuICAgICAgICAgICAgIFwicmV0dXJuIHByb2MoXCIsIHByb2NfYXJncy5qb2luKFwiLFwiKSwgXCIpfVwiXS5qb2luKFwiXCIpKVxuXG4gIGlmKHByb2MuZGVidWcpIHtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tR2VuZXJhdGVkIHRodW5rOlxcblwiICsgY29kZS5qb2luKFwiXFxuXCIpICsgXCJcXG4tLS0tLS0tLS0tXCIpXG4gIH1cbiAgXG4gIC8vQ29tcGlsZSB0aHVua1xuICB2YXIgdGh1bmsgPSBuZXcgRnVuY3Rpb24oXCJjb21waWxlXCIsIGNvZGUuam9pbihcIlxcblwiKSlcbiAgcmV0dXJuIHRodW5rKGNvbXBpbGUuYmluZCh1bmRlZmluZWQsIHByb2MpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRodW5rXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDUxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHVuaXEgPSByZXF1aXJlKFwidW5pcVwiKVxuXG4vLyBUaGlzIGZ1bmN0aW9uIGdlbmVyYXRlcyB2ZXJ5IHNpbXBsZSBsb29wcyBhbmFsb2dvdXMgdG8gaG93IHlvdSB0eXBpY2FsbHkgdHJhdmVyc2UgYXJyYXlzICh0aGUgb3V0ZXJtb3N0IGxvb3AgY29ycmVzcG9uZHMgdG8gdGhlIHNsb3dlc3QgY2hhbmdpbmcgaW5kZXgsIHRoZSBpbm5lcm1vc3QgbG9vcCB0byB0aGUgZmFzdGVzdCBjaGFuZ2luZyBpbmRleClcbi8vIFRPRE86IElmIHR3byBhcnJheXMgaGF2ZSB0aGUgc2FtZSBzdHJpZGVzIChhbmQgb2Zmc2V0cykgdGhlcmUgaXMgcG90ZW50aWFsIGZvciBkZWNyZWFzaW5nIHRoZSBudW1iZXIgb2YgXCJwb2ludGVyc1wiIGFuZCByZWxhdGVkIHZhcmlhYmxlcy4gVGhlIGRyYXdiYWNrIGlzIHRoYXQgdGhlIHR5cGUgc2lnbmF0dXJlIHdvdWxkIGJlY29tZSBtb3JlIHNwZWNpZmljIGFuZCB0aGF0IHRoZXJlIHdvdWxkIHRodXMgYmUgbGVzcyBwb3RlbnRpYWwgZm9yIGNhY2hpbmcsIGJ1dCBpdCBtaWdodCBzdGlsbCBiZSB3b3J0aCBpdCwgZXNwZWNpYWxseSB3aGVuIGRlYWxpbmcgd2l0aCBsYXJnZSBudW1iZXJzIG9mIGFyZ3VtZW50cy5cbmZ1bmN0aW9uIGlubmVyRmlsbChvcmRlciwgcHJvYywgYm9keSkge1xuICB2YXIgZGltZW5zaW9uID0gb3JkZXIubGVuZ3RoXG4gICAgLCBuYXJncyA9IHByb2MuYXJyYXlBcmdzLmxlbmd0aFxuICAgICwgaGFzX2luZGV4ID0gcHJvYy5pbmRleEFyZ3MubGVuZ3RoPjBcbiAgICAsIGNvZGUgPSBbXVxuICAgICwgdmFycyA9IFtdXG4gICAgLCBpZHg9MCwgcGlkeD0wLCBpLCBqXG4gIGZvcihpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHsgLy8gSXRlcmF0aW9uIHZhcmlhYmxlc1xuICAgIHZhcnMucHVzaChbXCJpXCIsaSxcIj0wXCJdLmpvaW4oXCJcIikpXG4gIH1cbiAgLy9Db21wdXRlIHNjYW4gZGVsdGFzXG4gIGZvcihqPTA7IGo8bmFyZ3M7ICsraikge1xuICAgIGZvcihpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgIHBpZHggPSBpZHhcbiAgICAgIGlkeCA9IG9yZGVyW2ldXG4gICAgICBpZihpID09PSAwKSB7IC8vIFRoZSBpbm5lcm1vc3QvZmFzdGVzdCBkaW1lbnNpb24ncyBkZWx0YSBpcyBzaW1wbHkgaXRzIHN0cmlkZVxuICAgICAgICB2YXJzLnB1c2goW1wiZFwiLGosXCJzXCIsaSxcIj10XCIsaixcInBcIixpZHhdLmpvaW4oXCJcIikpXG4gICAgICB9IGVsc2UgeyAvLyBGb3Igb3RoZXIgZGltZW5zaW9ucyB0aGUgZGVsdGEgaXMgYmFzaWNhbGx5IHRoZSBzdHJpZGUgbWludXMgc29tZXRoaW5nIHdoaWNoIGVzc2VudGlhbGx5IFwicmV3aW5kc1wiIHRoZSBwcmV2aW91cyAobW9yZSBpbm5lcikgZGltZW5zaW9uXG4gICAgICAgIHZhcnMucHVzaChbXCJkXCIsaixcInNcIixpLFwiPSh0XCIsaixcInBcIixpZHgsXCItc1wiLHBpZHgsXCIqdFwiLGosXCJwXCIscGlkeCxcIilcIl0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHZhcnMubGVuZ3RoID4gMCkge1xuICAgIGNvZGUucHVzaChcInZhciBcIiArIHZhcnMuam9pbihcIixcIikpXG4gIH0gIFxuICAvL1NjYW4gbG9vcFxuICBmb3IoaT1kaW1lbnNpb24tMTsgaT49MDsgLS1pKSB7IC8vIFN0YXJ0IGF0IGxhcmdlc3Qgc3RyaWRlIGFuZCB3b3JrIHlvdXIgd2F5IGlud2FyZHNcbiAgICBpZHggPSBvcmRlcltpXVxuICAgIGNvZGUucHVzaChbXCJmb3IoaVwiLGksXCI9MDtpXCIsaSxcIjxzXCIsaWR4LFwiOysraVwiLGksXCIpe1wiXS5qb2luKFwiXCIpKVxuICB9XG4gIC8vUHVzaCBib2R5IG9mIGlubmVyIGxvb3BcbiAgY29kZS5wdXNoKGJvZHkpXG4gIC8vQWR2YW5jZSBzY2FuIHBvaW50ZXJzXG4gIGZvcihpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBwaWR4ID0gaWR4XG4gICAgaWR4ID0gb3JkZXJbaV1cbiAgICBmb3Ioaj0wOyBqPG5hcmdzOyArK2opIHtcbiAgICAgIGNvZGUucHVzaChbXCJwXCIsaixcIis9ZFwiLGosXCJzXCIsaV0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgaWYoaGFzX2luZGV4KSB7XG4gICAgICBpZihpID4gMCkge1xuICAgICAgICBjb2RlLnB1c2goW1wiaW5kZXhbXCIscGlkeCxcIl0tPXNcIixwaWR4XS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgICAgY29kZS5wdXNoKFtcIisraW5kZXhbXCIsaWR4LFwiXVwiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIH1cbiAgcmV0dXJuIGNvZGUuam9pbihcIlxcblwiKVxufVxuXG4vLyBHZW5lcmF0ZSBcIm91dGVyXCIgbG9vcHMgdGhhdCBsb29wIG92ZXIgYmxvY2tzIG9mIGRhdGEsIGFwcGx5aW5nIFwiaW5uZXJcIiBsb29wcyB0byB0aGUgYmxvY2tzIGJ5IG1hbmlwdWxhdGluZyB0aGUgbG9jYWwgdmFyaWFibGVzIGluIHN1Y2ggYSB3YXkgdGhhdCB0aGUgaW5uZXIgbG9vcCBvbmx5IFwic2Vlc1wiIHRoZSBjdXJyZW50IGJsb2NrLlxuLy8gVE9ETzogSWYgdGhpcyBpcyB1c2VkLCB0aGVuIHRoZSBwcmV2aW91cyBkZWNsYXJhdGlvbiAoZG9uZSBieSBnZW5lcmF0ZUN3aXNlT3ApIG9mIHMqIGlzIGVzc2VudGlhbGx5IHVubmVjZXNzYXJ5LlxuLy8gICAgICAgSSBiZWxpZXZlIHRoZSBzKiBhcmUgbm90IHVzZWQgZWxzZXdoZXJlIChpbiBwYXJ0aWN1bGFyLCBJIGRvbid0IHRoaW5rIHRoZXkncmUgdXNlZCBpbiB0aGUgcHJlL3Bvc3QgcGFydHMgYW5kIFwic2hhcGVcIiBpcyBkZWZpbmVkIGluZGVwZW5kZW50bHkpLCBzbyBpdCB3b3VsZCBiZSBwb3NzaWJsZSB0byBtYWtlIGRlZmluaW5nIHRoZSBzKiBkZXBlbmRlbnQgb24gd2hhdCBsb29wIG1ldGhvZCBpcyBiZWluZyB1c2VkLlxuZnVuY3Rpb24gb3V0ZXJGaWxsKG1hdGNoZWQsIG9yZGVyLCBwcm9jLCBib2R5KSB7XG4gIHZhciBkaW1lbnNpb24gPSBvcmRlci5sZW5ndGhcbiAgICAsIG5hcmdzID0gcHJvYy5hcnJheUFyZ3MubGVuZ3RoXG4gICAgLCBibG9ja1NpemUgPSBwcm9jLmJsb2NrU2l6ZVxuICAgICwgaGFzX2luZGV4ID0gcHJvYy5pbmRleEFyZ3MubGVuZ3RoID4gMFxuICAgICwgY29kZSA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPG5hcmdzOyArK2kpIHtcbiAgICBjb2RlLnB1c2goW1widmFyIG9mZnNldFwiLGksXCI9cFwiLGldLmpvaW4oXCJcIikpXG4gIH1cbiAgLy9HZW5lcmF0ZSBsb29wcyBmb3IgdW5tYXRjaGVkIGRpbWVuc2lvbnNcbiAgLy8gVGhlIG9yZGVyIGluIHdoaWNoIHRoZXNlIGRpbWVuc2lvbnMgYXJlIHRyYXZlcnNlZCBpcyBmYWlybHkgYXJiaXRyYXJ5IChmcm9tIHNtYWxsIHN0cmlkZSB0byBsYXJnZSBzdHJpZGUsIGZvciB0aGUgZmlyc3QgYXJndW1lbnQpXG4gIC8vIFRPRE86IEl0IHdvdWxkIGJlIG5pY2UgaWYgdGhlIG9yZGVyIGluIHdoaWNoIHRoZXNlIGxvb3BzIGFyZSBwbGFjZWQgd291bGQgYWxzbyBiZSBzb21laG93IFwib3B0aW1hbFwiIChhdCB0aGUgdmVyeSBsZWFzdCB3ZSBzaG91bGQgY2hlY2sgdGhhdCBpdCByZWFsbHkgZG9lc24ndCBodXJ0IHVzIGlmIHRoZXkncmUgbm90KS5cbiAgZm9yKHZhciBpPW1hdGNoZWQ7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goW1wiZm9yKHZhciBqXCIraStcIj1TU1tcIiwgb3JkZXJbaV0sIFwiXXwwO2pcIiwgaSwgXCI+MDspe1wiXS5qb2luKFwiXCIpKSAvLyBJdGVyYXRlIGJhY2sgdG8gZnJvbnRcbiAgICBjb2RlLnB1c2goW1wiaWYoalwiLGksXCI8XCIsYmxvY2tTaXplLFwiKXtcIl0uam9pbihcIlwiKSkgLy8gRWl0aGVyIGRlY3JlYXNlIGogYnkgYmxvY2tTaXplIChzID0gYmxvY2tTaXplKSwgb3Igc2V0IGl0IHRvIHplcm8gKGFmdGVyIHNldHRpbmcgcyA9IGopLlxuICAgIGNvZGUucHVzaChbXCJzXCIsb3JkZXJbaV0sXCI9alwiLGldLmpvaW4oXCJcIikpXG4gICAgY29kZS5wdXNoKFtcImpcIixpLFwiPTBcIl0uam9pbihcIlwiKSlcbiAgICBjb2RlLnB1c2goW1wifWVsc2V7c1wiLG9yZGVyW2ldLFwiPVwiLGJsb2NrU2l6ZV0uam9pbihcIlwiKSlcbiAgICBjb2RlLnB1c2goW1wialwiLGksXCItPVwiLGJsb2NrU2l6ZSxcIn1cIl0uam9pbihcIlwiKSlcbiAgICBpZihoYXNfaW5kZXgpIHtcbiAgICAgIGNvZGUucHVzaChbXCJpbmRleFtcIixvcmRlcltpXSxcIl09alwiLGldLmpvaW4oXCJcIikpXG4gICAgfVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPG5hcmdzOyArK2kpIHtcbiAgICB2YXIgaW5kZXhTdHIgPSBbXCJvZmZzZXRcIitpXVxuICAgIGZvcih2YXIgaj1tYXRjaGVkOyBqPGRpbWVuc2lvbjsgKytqKSB7XG4gICAgICBpbmRleFN0ci5wdXNoKFtcImpcIixqLFwiKnRcIixpLFwicFwiLG9yZGVyW2pdXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgICBjb2RlLnB1c2goW1wicFwiLGksXCI9KFwiLGluZGV4U3RyLmpvaW4oXCIrXCIpLFwiKVwiXS5qb2luKFwiXCIpKVxuICB9XG4gIGNvZGUucHVzaChpbm5lckZpbGwob3JkZXIsIHByb2MsIGJvZHkpKVxuICBmb3IodmFyIGk9bWF0Y2hlZDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChcIn1cIilcbiAgfVxuICByZXR1cm4gY29kZS5qb2luKFwiXFxuXCIpXG59XG5cbi8vQ291bnQgdGhlIG51bWJlciBvZiBjb21wYXRpYmxlIGlubmVyIG9yZGVyc1xuLy8gVGhpcyBpcyB0aGUgbGVuZ3RoIG9mIHRoZSBsb25nZXN0IGNvbW1vbiBwcmVmaXggb2YgdGhlIGFycmF5cyBpbiBvcmRlcnMuXG4vLyBFYWNoIGFycmF5IGluIG9yZGVycyBsaXN0cyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgY29ycmVzcG9uZCBuZGFycmF5IGluIG9yZGVyIG9mIGluY3JlYXNpbmcgc3RyaWRlLlxuLy8gVGhpcyBpcyB0aHVzIHRoZSBtYXhpbXVtIG51bWJlciBvZiBkaW1lbnNpb25zIHRoYXQgY2FuIGJlIGVmZmljaWVudGx5IHRyYXZlcnNlZCBieSBzaW1wbGUgbmVzdGVkIGxvb3BzIGZvciBhbGwgYXJyYXlzLlxuZnVuY3Rpb24gY291bnRNYXRjaGVzKG9yZGVycykge1xuICB2YXIgbWF0Y2hlZCA9IDAsIGRpbWVuc2lvbiA9IG9yZGVyc1swXS5sZW5ndGhcbiAgd2hpbGUobWF0Y2hlZCA8IGRpbWVuc2lvbikge1xuICAgIGZvcih2YXIgaj0xOyBqPG9yZGVycy5sZW5ndGg7ICsraikge1xuICAgICAgaWYob3JkZXJzW2pdW21hdGNoZWRdICE9PSBvcmRlcnNbMF1bbWF0Y2hlZF0pIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoZWRcbiAgICAgIH1cbiAgICB9XG4gICAgKyttYXRjaGVkXG4gIH1cbiAgcmV0dXJuIG1hdGNoZWRcbn1cblxuLy9Qcm9jZXNzZXMgYSBibG9jayBhY2NvcmRpbmcgdG8gdGhlIGdpdmVuIGRhdGEgdHlwZXNcbi8vIFJlcGxhY2VzIHZhcmlhYmxlIG5hbWVzIGJ5IGRpZmZlcmVudCBvbmVzLCBlaXRoZXIgXCJsb2NhbFwiIG9uZXMgKHRoYXQgYXJlIHRoZW4gZmVycmllZCBpbiBhbmQgb3V0IG9mIHRoZSBnaXZlbiBhcnJheSkgb3Igb25lcyBtYXRjaGluZyB0aGUgYXJndW1lbnRzIHRoYXQgdGhlIGZ1bmN0aW9uIHBlcmZvcm1pbmcgdGhlIHVsdGltYXRlIGxvb3Agd2lsbCBhY2NlcHQuXG5mdW5jdGlvbiBwcm9jZXNzQmxvY2soYmxvY2ssIHByb2MsIGR0eXBlcykge1xuICB2YXIgY29kZSA9IGJsb2NrLmJvZHlcbiAgdmFyIHByZSA9IFtdXG4gIHZhciBwb3N0ID0gW11cbiAgZm9yKHZhciBpPTA7IGk8YmxvY2suYXJncy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBjYXJnID0gYmxvY2suYXJnc1tpXVxuICAgIGlmKGNhcmcuY291bnQgPD0gMCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgdmFyIHJlID0gbmV3IFJlZ0V4cChjYXJnLm5hbWUsIFwiZ1wiKVxuICAgIHZhciBwdHJTdHIgPSBcIlwiXG4gICAgdmFyIGFyck51bSA9IHByb2MuYXJyYXlBcmdzLmluZGV4T2YoaSlcbiAgICBzd2l0Y2gocHJvYy5hcmdUeXBlc1tpXSkge1xuICAgICAgY2FzZSBcIm9mZnNldFwiOlxuICAgICAgICB2YXIgb2ZmQXJnSW5kZXggPSBwcm9jLm9mZnNldEFyZ0luZGV4LmluZGV4T2YoaSlcbiAgICAgICAgdmFyIG9mZkFyZyA9IHByb2Mub2Zmc2V0QXJnc1tvZmZBcmdJbmRleF1cbiAgICAgICAgYXJyTnVtID0gb2ZmQXJnLmFycmF5XG4gICAgICAgIHB0clN0ciA9IFwiK3FcIiArIG9mZkFyZ0luZGV4IC8vIEFkZHMgb2Zmc2V0IHRvIHRoZSBcInBvaW50ZXJcIiBpbiB0aGUgYXJyYXlcbiAgICAgIGNhc2UgXCJhcnJheVwiOlxuICAgICAgICBwdHJTdHIgPSBcInBcIiArIGFyck51bSArIHB0clN0clxuICAgICAgICB2YXIgbG9jYWxTdHIgPSBcImxcIiArIGlcbiAgICAgICAgdmFyIGFyclN0ciA9IFwiYVwiICsgYXJyTnVtXG4gICAgICAgIGlmIChwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2Fyck51bV0gPT09IDApIHsgLy8gQXJndW1lbnQgdG8gYm9keSBpcyBqdXN0IGEgc2luZ2xlIHZhbHVlIGZyb20gdGhpcyBhcnJheVxuICAgICAgICAgIGlmKGNhcmcuY291bnQgPT09IDEpIHsgLy8gQXJndW1lbnQvYXJyYXkgdXNlZCBvbmx5IG9uY2UoPylcbiAgICAgICAgICAgIGlmKGR0eXBlc1thcnJOdW1dID09PSBcImdlbmVyaWNcIikge1xuICAgICAgICAgICAgICBpZihjYXJnLmx2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHByZS5wdXNoKFtcInZhciBcIiwgbG9jYWxTdHIsIFwiPVwiLCBhcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSkgLy8gSXMgdGhpcyBuZWNlc3NhcnkgaWYgdGhlIGFyZ3VtZW50IGlzIE9OTFkgdXNlZCBhcyBhbiBsdmFsdWU/IChrZWVwIGluIG1pbmQgdGhhdCB3ZSBjYW4gaGF2ZSBhICs9IHNvbWV0aGluZywgc28gd2Ugd291bGQgYWN0dWFsbHkgbmVlZCB0byBjaGVjayBjYXJnLnJ2YWx1ZSlcbiAgICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBsb2NhbFN0cilcbiAgICAgICAgICAgICAgICBwb3N0LnB1c2goW2FyclN0ciwgXCIuc2V0KFwiLCBwdHJTdHIsIFwiLFwiLCBsb2NhbFN0cixcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBbYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZihkdHlwZXNbYXJyTnVtXSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgICAgICAgIHByZS5wdXNoKFtcInZhciBcIiwgbG9jYWxTdHIsIFwiPVwiLCBhcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSkgLy8gVE9ETzogQ291bGQgd2Ugb3B0aW1pemUgYnkgY2hlY2tpbmcgZm9yIGNhcmcucnZhbHVlP1xuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgbG9jYWxTdHIpXG4gICAgICAgICAgICBpZihjYXJnLmx2YWx1ZSkge1xuICAgICAgICAgICAgICBwb3N0LnB1c2goW2FyclN0ciwgXCIuc2V0KFwiLCBwdHJTdHIsIFwiLFwiLCBsb2NhbFN0cixcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJlLnB1c2goW1widmFyIFwiLCBsb2NhbFN0ciwgXCI9XCIsIGFyclN0ciwgXCJbXCIsIHB0clN0ciwgXCJdXCJdLmpvaW4oXCJcIikpIC8vIFRPRE86IENvdWxkIHdlIG9wdGltaXplIGJ5IGNoZWNraW5nIGZvciBjYXJnLnJ2YWx1ZT9cbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXT1cIiwgbG9jYWxTdHJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgeyAvLyBBcmd1bWVudCB0byBib2R5IGlzIGEgXCJibG9ja1wiXG4gICAgICAgICAgdmFyIHJlU3RyQXJyID0gW2NhcmcubmFtZV0sIHB0clN0ckFyciA9IFtwdHJTdHJdXG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8TWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1thcnJOdW1dKTsgaisrKSB7XG4gICAgICAgICAgICByZVN0ckFyci5wdXNoKFwiXFxcXHMqXFxcXFsoW15cXFxcXV0rKVxcXFxdXCIpXG4gICAgICAgICAgICBwdHJTdHJBcnIucHVzaChcIiRcIiArIChqKzEpICsgXCIqdFwiICsgYXJyTnVtICsgXCJiXCIgKyBqKSAvLyBNYXRjaGVkIGluZGV4IHRpbWVzIHN0cmlkZVxuICAgICAgICAgIH1cbiAgICAgICAgICByZSA9IG5ldyBSZWdFeHAocmVTdHJBcnIuam9pbihcIlwiKSwgXCJnXCIpXG4gICAgICAgICAgcHRyU3RyID0gcHRyU3RyQXJyLmpvaW4oXCIrXCIpXG4gICAgICAgICAgaWYoZHR5cGVzW2Fyck51bV0gPT09IFwiZ2VuZXJpY1wiKSB7XG4gICAgICAgICAgICAvKmlmKGNhcmcubHZhbHVlKSB7XG4gICAgICAgICAgICAgIHByZS5wdXNoKFtcInZhciBcIiwgbG9jYWxTdHIsIFwiPVwiLCBhcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSkgLy8gSXMgdGhpcyBuZWNlc3NhcnkgaWYgdGhlIGFyZ3VtZW50IGlzIE9OTFkgdXNlZCBhcyBhbiBsdmFsdWU/IChrZWVwIGluIG1pbmQgdGhhdCB3ZSBjYW4gaGF2ZSBhICs9IHNvbWV0aGluZywgc28gd2Ugd291bGQgYWN0dWFsbHkgbmVlZCB0byBjaGVjayBjYXJnLnJ2YWx1ZSlcbiAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgbG9jYWxTdHIpXG4gICAgICAgICAgICAgIHBvc3QucHVzaChbYXJyU3RyLCBcIi5zZXQoXCIsIHB0clN0ciwgXCIsXCIsIGxvY2FsU3RyLFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgW2FyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfSovXG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogR2VuZXJpYyBhcnJheXMgbm90IHN1cHBvcnRlZCBpbiBjb21iaW5hdGlvbiB3aXRoIGJsb2NrcyFcIilcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gVGhpcyBkb2VzIG5vdCBwcm9kdWNlIGFueSBsb2NhbCB2YXJpYWJsZXMsIGV2ZW4gaWYgdmFyaWFibGVzIGFyZSB1c2VkIG11bHRpcGxlIHRpbWVzLiBJdCB3b3VsZCBiZSBwb3NzaWJsZSB0byBkbyBzbywgYnV0IGl0IHdvdWxkIGNvbXBsaWNhdGUgdGhpbmdzIHF1aXRlIGEgYml0LlxuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgW2FyclN0ciwgXCJbXCIsIHB0clN0ciwgXCJdXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICBicmVha1xuICAgICAgY2FzZSBcInNjYWxhclwiOlxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBcIllcIiArIHByb2Muc2NhbGFyQXJncy5pbmRleE9mKGkpKVxuICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJpbmRleFwiOlxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBcImluZGV4XCIpXG4gICAgICBicmVha1xuICAgICAgY2FzZSBcInNoYXBlXCI6XG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFwic2hhcGVcIilcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiBbcHJlLmpvaW4oXCJcXG5cIiksIGNvZGUsIHBvc3Quam9pbihcIlxcblwiKV0uam9pbihcIlxcblwiKS50cmltKClcbn1cblxuZnVuY3Rpb24gdHlwZVN1bW1hcnkoZHR5cGVzKSB7XG4gIHZhciBzdW1tYXJ5ID0gbmV3IEFycmF5KGR0eXBlcy5sZW5ndGgpXG4gIHZhciBhbGxFcXVhbCA9IHRydWVcbiAgZm9yKHZhciBpPTA7IGk8ZHR5cGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHQgPSBkdHlwZXNbaV1cbiAgICB2YXIgZGlnaXRzID0gdC5tYXRjaCgvXFxkKy8pXG4gICAgaWYoIWRpZ2l0cykge1xuICAgICAgZGlnaXRzID0gXCJcIlxuICAgIH0gZWxzZSB7XG4gICAgICBkaWdpdHMgPSBkaWdpdHNbMF1cbiAgICB9XG4gICAgaWYodC5jaGFyQXQoMCkgPT09IDApIHtcbiAgICAgIHN1bW1hcnlbaV0gPSBcInVcIiArIHQuY2hhckF0KDEpICsgZGlnaXRzXG4gICAgfSBlbHNlIHtcbiAgICAgIHN1bW1hcnlbaV0gPSB0LmNoYXJBdCgwKSArIGRpZ2l0c1xuICAgIH1cbiAgICBpZihpID4gMCkge1xuICAgICAgYWxsRXF1YWwgPSBhbGxFcXVhbCAmJiBzdW1tYXJ5W2ldID09PSBzdW1tYXJ5W2ktMV1cbiAgICB9XG4gIH1cbiAgaWYoYWxsRXF1YWwpIHtcbiAgICByZXR1cm4gc3VtbWFyeVswXVxuICB9XG4gIHJldHVybiBzdW1tYXJ5LmpvaW4oXCJcIilcbn1cblxuLy9HZW5lcmF0ZXMgYSBjd2lzZSBvcGVyYXRvclxuZnVuY3Rpb24gZ2VuZXJhdGVDV2lzZU9wKHByb2MsIHR5cGVzaWcpIHtcblxuICAvL0NvbXB1dGUgZGltZW5zaW9uXG4gIC8vIEFycmF5cyBnZXQgcHV0IGZpcnN0IGluIHR5cGVzaWcsIGFuZCB0aGVyZSBhcmUgdHdvIGVudHJpZXMgcGVyIGFycmF5IChkdHlwZSBhbmQgb3JkZXIpLCBzbyB0aGlzIGdldHMgdGhlIG51bWJlciBvZiBkaW1lbnNpb25zIGluIHRoZSBmaXJzdCBhcnJheSBhcmcuXG4gIHZhciBkaW1lbnNpb24gPSAodHlwZXNpZ1sxXS5sZW5ndGggLSBNYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKSl8MFxuICB2YXIgb3JkZXJzID0gbmV3IEFycmF5KHByb2MuYXJyYXlBcmdzLmxlbmd0aClcbiAgdmFyIGR0eXBlcyA9IG5ldyBBcnJheShwcm9jLmFycmF5QXJncy5sZW5ndGgpXG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgZHR5cGVzW2ldID0gdHlwZXNpZ1syKmldXG4gICAgb3JkZXJzW2ldID0gdHlwZXNpZ1syKmkrMV1cbiAgfVxuICBcbiAgLy9EZXRlcm1pbmUgd2hlcmUgYmxvY2sgYW5kIGxvb3AgaW5kaWNlcyBzdGFydCBhbmQgZW5kXG4gIHZhciBibG9ja0JlZ2luID0gW10sIGJsb2NrRW5kID0gW10gLy8gVGhlc2UgaW5kaWNlcyBhcmUgZXhwb3NlZCBhcyBibG9ja3NcbiAgdmFyIGxvb3BCZWdpbiA9IFtdLCBsb29wRW5kID0gW10gLy8gVGhlc2UgaW5kaWNlcyBhcmUgaXRlcmF0ZWQgb3ZlclxuICB2YXIgbG9vcE9yZGVycyA9IFtdIC8vIG9yZGVycyByZXN0cmljdGVkIHRvIHRoZSBsb29wIGluZGljZXNcbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBpZiAocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXTwwKSB7XG4gICAgICBsb29wQmVnaW4ucHVzaCgwKVxuICAgICAgbG9vcEVuZC5wdXNoKGRpbWVuc2lvbilcbiAgICAgIGJsb2NrQmVnaW4ucHVzaChkaW1lbnNpb24pXG4gICAgICBibG9ja0VuZC5wdXNoKGRpbWVuc2lvbitwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKVxuICAgIH0gZWxzZSB7XG4gICAgICBsb29wQmVnaW4ucHVzaChwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKSAvLyBOb24tbmVnYXRpdmVcbiAgICAgIGxvb3BFbmQucHVzaChwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldK2RpbWVuc2lvbilcbiAgICAgIGJsb2NrQmVnaW4ucHVzaCgwKVxuICAgICAgYmxvY2tFbmQucHVzaChwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKVxuICAgIH1cbiAgICB2YXIgbmV3T3JkZXIgPSBbXVxuICAgIGZvcih2YXIgaj0wOyBqPG9yZGVyc1tpXS5sZW5ndGg7IGorKykge1xuICAgICAgaWYgKGxvb3BCZWdpbltpXTw9b3JkZXJzW2ldW2pdICYmIG9yZGVyc1tpXVtqXTxsb29wRW5kW2ldKSB7XG4gICAgICAgIG5ld09yZGVyLnB1c2gob3JkZXJzW2ldW2pdLWxvb3BCZWdpbltpXSkgLy8gSWYgdGhpcyBpcyBhIGxvb3AgaW5kZXgsIHB1dCBpdCBpbiBuZXdPcmRlciwgc3VidHJhY3RpbmcgbG9vcEJlZ2luLCB0byBtYWtlIHN1cmUgdGhhdCBhbGwgbG9vcE9yZGVycyBhcmUgdXNpbmcgYSBjb21tb24gc2V0IG9mIGluZGljZXMuXG4gICAgICB9XG4gICAgfVxuICAgIGxvb3BPcmRlcnMucHVzaChuZXdPcmRlcilcbiAgfVxuXG4gIC8vRmlyc3QgY3JlYXRlIGFyZ3VtZW50cyBmb3IgcHJvY2VkdXJlXG4gIHZhciBhcmdsaXN0ID0gW1wiU1NcIl0gLy8gU1MgaXMgdGhlIG92ZXJhbGwgc2hhcGUgb3ZlciB3aGljaCB3ZSBpdGVyYXRlXG4gIHZhciBjb2RlID0gW1wiJ3VzZSBzdHJpY3QnXCJdXG4gIHZhciB2YXJzID0gW11cbiAgXG4gIGZvcih2YXIgaj0wOyBqPGRpbWVuc2lvbjsgKytqKSB7XG4gICAgdmFycy5wdXNoKFtcInNcIiwgaiwgXCI9U1NbXCIsIGosIFwiXVwiXS5qb2luKFwiXCIpKSAvLyBUaGUgbGltaXRzIGZvciBlYWNoIGRpbWVuc2lvbi5cbiAgfVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIGFyZ2xpc3QucHVzaChcImFcIitpKSAvLyBBY3R1YWwgZGF0YSBhcnJheVxuICAgIGFyZ2xpc3QucHVzaChcInRcIitpKSAvLyBTdHJpZGVzXG4gICAgYXJnbGlzdC5wdXNoKFwicFwiK2kpIC8vIE9mZnNldCBpbiB0aGUgYXJyYXkgYXQgd2hpY2ggdGhlIGRhdGEgc3RhcnRzIChhbHNvIHVzZWQgZm9yIGl0ZXJhdGluZyBvdmVyIHRoZSBkYXRhKVxuICAgIFxuICAgIGZvcih2YXIgaj0wOyBqPGRpbWVuc2lvbjsgKytqKSB7IC8vIFVucGFjayB0aGUgc3RyaWRlcyBpbnRvIHZhcnMgZm9yIGxvb3BpbmdcbiAgICAgIHZhcnMucHVzaChbXCJ0XCIsaSxcInBcIixqLFwiPXRcIixpLFwiW1wiLGxvb3BCZWdpbltpXStqLFwiXVwiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgICBcbiAgICBmb3IodmFyIGo9MDsgajxNYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKTsgKytqKSB7IC8vIFVucGFjayB0aGUgc3RyaWRlcyBpbnRvIHZhcnMgZm9yIGJsb2NrIGl0ZXJhdGlvblxuICAgICAgdmFycy5wdXNoKFtcInRcIixpLFwiYlwiLGosXCI9dFwiLGksXCJbXCIsYmxvY2tCZWdpbltpXStqLFwiXVwiXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLnNjYWxhckFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBhcmdsaXN0LnB1c2goXCJZXCIgKyBpKVxuICB9XG4gIGlmKHByb2Muc2hhcGVBcmdzLmxlbmd0aCA+IDApIHtcbiAgICB2YXJzLnB1c2goXCJzaGFwZT1TUy5zbGljZSgwKVwiKSAvLyBNYWtlcyB0aGUgc2hhcGUgb3ZlciB3aGljaCB3ZSBpdGVyYXRlIGF2YWlsYWJsZSB0byB0aGUgdXNlciBkZWZpbmVkIGZ1bmN0aW9ucyAoc28geW91IGNhbiB1c2Ugd2lkdGgvaGVpZ2h0IGZvciBleGFtcGxlKVxuICB9XG4gIGlmKHByb2MuaW5kZXhBcmdzLmxlbmd0aCA+IDApIHtcbiAgICAvLyBQcmVwYXJlIGFuIGFycmF5IHRvIGtlZXAgdHJhY2sgb2YgdGhlIChsb2dpY2FsKSBpbmRpY2VzLCBpbml0aWFsaXplZCB0byBkaW1lbnNpb24gemVyb2VzLlxuICAgIHZhciB6ZXJvcyA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgIHplcm9zW2ldID0gXCIwXCJcbiAgICB9XG4gICAgdmFycy5wdXNoKFtcImluZGV4PVtcIiwgemVyb3Muam9pbihcIixcIiksIFwiXVwiXS5qb2luKFwiXCIpKVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPHByb2Mub2Zmc2V0QXJncy5sZW5ndGg7ICsraSkgeyAvLyBPZmZzZXQgYXJndW1lbnRzIHVzZWQgZm9yIHN0ZW5jaWwgb3BlcmF0aW9uc1xuICAgIHZhciBvZmZfYXJnID0gcHJvYy5vZmZzZXRBcmdzW2ldXG4gICAgdmFyIGluaXRfc3RyaW5nID0gW11cbiAgICBmb3IodmFyIGo9MDsgajxvZmZfYXJnLm9mZnNldC5sZW5ndGg7ICsraikge1xuICAgICAgaWYob2ZmX2FyZy5vZmZzZXRbal0gPT09IDApIHtcbiAgICAgICAgY29udGludWVcbiAgICAgIH0gZWxzZSBpZihvZmZfYXJnLm9mZnNldFtqXSA9PT0gMSkge1xuICAgICAgICBpbml0X3N0cmluZy5wdXNoKFtcInRcIiwgb2ZmX2FyZy5hcnJheSwgXCJwXCIsIGpdLmpvaW4oXCJcIikpICAgICAgXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbml0X3N0cmluZy5wdXNoKFtvZmZfYXJnLm9mZnNldFtqXSwgXCIqdFwiLCBvZmZfYXJnLmFycmF5LCBcInBcIiwgal0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoaW5pdF9zdHJpbmcubGVuZ3RoID09PSAwKSB7XG4gICAgICB2YXJzLnB1c2goXCJxXCIgKyBpICsgXCI9MFwiKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXJzLnB1c2goW1wicVwiLCBpLCBcIj1cIiwgaW5pdF9zdHJpbmcuam9pbihcIitcIildLmpvaW4oXCJcIikpXG4gICAgfVxuICB9XG5cbiAgLy9QcmVwYXJlIHRoaXMgdmFyaWFibGVzXG4gIHZhciB0aGlzVmFycyA9IHVuaXEoW10uY29uY2F0KHByb2MucHJlLnRoaXNWYXJzKVxuICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQocHJvYy5ib2R5LnRoaXNWYXJzKVxuICAgICAgICAgICAgICAgICAgICAgIC5jb25jYXQocHJvYy5wb3N0LnRoaXNWYXJzKSlcbiAgdmFycyA9IHZhcnMuY29uY2F0KHRoaXNWYXJzKVxuICBpZiAodmFycy5sZW5ndGggPiAwKSB7XG4gICAgY29kZS5wdXNoKFwidmFyIFwiICsgdmFycy5qb2luKFwiLFwiKSlcbiAgfVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIGNvZGUucHVzaChcInBcIitpK1wifD0wXCIpXG4gIH1cbiAgXG4gIC8vSW5saW5lIHByZWx1ZGVcbiAgaWYocHJvYy5wcmUuYm9keS5sZW5ndGggPiAzKSB7XG4gICAgY29kZS5wdXNoKHByb2Nlc3NCbG9jayhwcm9jLnByZSwgcHJvYywgZHR5cGVzKSlcbiAgfVxuXG4gIC8vUHJvY2VzcyBib2R5XG4gIHZhciBib2R5ID0gcHJvY2Vzc0Jsb2NrKHByb2MuYm9keSwgcHJvYywgZHR5cGVzKVxuICB2YXIgbWF0Y2hlZCA9IGNvdW50TWF0Y2hlcyhsb29wT3JkZXJzKVxuICBpZihtYXRjaGVkIDwgZGltZW5zaW9uKSB7XG4gICAgY29kZS5wdXNoKG91dGVyRmlsbChtYXRjaGVkLCBsb29wT3JkZXJzWzBdLCBwcm9jLCBib2R5KSkgLy8gVE9ETzogUmF0aGVyIHRoYW4gcGFzc2luZyBsb29wT3JkZXJzWzBdLCBpdCBtaWdodCBiZSBpbnRlcmVzdGluZyB0byBsb29rIGF0IHBhc3NpbmcgYW4gb3JkZXIgdGhhdCByZXByZXNlbnRzIHRoZSBtYWpvcml0eSBvZiB0aGUgYXJndW1lbnRzIGZvciBleGFtcGxlLlxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChpbm5lckZpbGwobG9vcE9yZGVyc1swXSwgcHJvYywgYm9keSkpXG4gIH1cblxuICAvL0lubGluZSBlcGlsb2dcbiAgaWYocHJvYy5wb3N0LmJvZHkubGVuZ3RoID4gMykge1xuICAgIGNvZGUucHVzaChwcm9jZXNzQmxvY2socHJvYy5wb3N0LCBwcm9jLCBkdHlwZXMpKVxuICB9XG4gIFxuICBpZihwcm9jLmRlYnVnKSB7XG4gICAgY29uc29sZS5sb2coXCItLS0tLUdlbmVyYXRlZCBjd2lzZSByb3V0aW5lIGZvciBcIiwgdHlwZXNpZywgXCI6XFxuXCIgKyBjb2RlLmpvaW4oXCJcXG5cIikgKyBcIlxcbi0tLS0tLS0tLS1cIilcbiAgfVxuICBcbiAgdmFyIGxvb3BOYW1lID0gWyhwcm9jLmZ1bmNOYW1lfHxcInVubmFtZWRcIiksIFwiX2N3aXNlX2xvb3BfXCIsIG9yZGVyc1swXS5qb2luKFwic1wiKSxcIm1cIixtYXRjaGVkLHR5cGVTdW1tYXJ5KGR0eXBlcyldLmpvaW4oXCJcIilcbiAgdmFyIGYgPSBuZXcgRnVuY3Rpb24oW1wiZnVuY3Rpb24gXCIsbG9vcE5hbWUsXCIoXCIsIGFyZ2xpc3Quam9pbihcIixcIiksXCIpe1wiLCBjb2RlLmpvaW4oXCJcXG5cIiksXCJ9IHJldHVybiBcIiwgbG9vcE5hbWVdLmpvaW4oXCJcIikpXG4gIHJldHVybiBmKClcbn1cbm1vZHVsZS5leHBvcnRzID0gZ2VuZXJhdGVDV2lzZU9wXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvY29tcGlsZS5qc1xuLy8gbW9kdWxlIGlkID0gNTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiB1bmlxdWVfcHJlZChsaXN0LCBjb21wYXJlKSB7XG4gIHZhciBwdHIgPSAxXG4gICAgLCBsZW4gPSBsaXN0Lmxlbmd0aFxuICAgICwgYT1saXN0WzBdLCBiPWxpc3RbMF1cbiAgZm9yKHZhciBpPTE7IGk8bGVuOyArK2kpIHtcbiAgICBiID0gYVxuICAgIGEgPSBsaXN0W2ldXG4gICAgaWYoY29tcGFyZShhLCBiKSkge1xuICAgICAgaWYoaSA9PT0gcHRyKSB7XG4gICAgICAgIHB0cisrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBsaXN0W3B0cisrXSA9IGFcbiAgICB9XG4gIH1cbiAgbGlzdC5sZW5ndGggPSBwdHJcbiAgcmV0dXJuIGxpc3Rcbn1cblxuZnVuY3Rpb24gdW5pcXVlX2VxKGxpc3QpIHtcbiAgdmFyIHB0ciA9IDFcbiAgICAsIGxlbiA9IGxpc3QubGVuZ3RoXG4gICAgLCBhPWxpc3RbMF0sIGIgPSBsaXN0WzBdXG4gIGZvcih2YXIgaT0xOyBpPGxlbjsgKytpLCBiPWEpIHtcbiAgICBiID0gYVxuICAgIGEgPSBsaXN0W2ldXG4gICAgaWYoYSAhPT0gYikge1xuICAgICAgaWYoaSA9PT0gcHRyKSB7XG4gICAgICAgIHB0cisrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG4gICAgICBsaXN0W3B0cisrXSA9IGFcbiAgICB9XG4gIH1cbiAgbGlzdC5sZW5ndGggPSBwdHJcbiAgcmV0dXJuIGxpc3Rcbn1cblxuZnVuY3Rpb24gdW5pcXVlKGxpc3QsIGNvbXBhcmUsIHNvcnRlZCkge1xuICBpZihsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBsaXN0XG4gIH1cbiAgaWYoY29tcGFyZSkge1xuICAgIGlmKCFzb3J0ZWQpIHtcbiAgICAgIGxpc3Quc29ydChjb21wYXJlKVxuICAgIH1cbiAgICByZXR1cm4gdW5pcXVlX3ByZWQobGlzdCwgY29tcGFyZSlcbiAgfVxuICBpZighc29ydGVkKSB7XG4gICAgbGlzdC5zb3J0KClcbiAgfVxuICByZXR1cm4gdW5pcXVlX2VxKGxpc3QpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdW5pcXVlXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy91bmlxL3VuaXEuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIGlvdGEgPSByZXF1aXJlKFwiaW90YS1hcnJheVwiKVxudmFyIGlzQnVmZmVyID0gcmVxdWlyZShcImlzLWJ1ZmZlclwiKVxuXG52YXIgaGFzVHlwZWRBcnJheXMgID0gKCh0eXBlb2YgRmxvYXQ2NEFycmF5KSAhPT0gXCJ1bmRlZmluZWRcIilcblxuZnVuY3Rpb24gY29tcGFyZTFzdChhLCBiKSB7XG4gIHJldHVybiBhWzBdIC0gYlswXVxufVxuXG5mdW5jdGlvbiBvcmRlcigpIHtcbiAgdmFyIHN0cmlkZSA9IHRoaXMuc3RyaWRlXG4gIHZhciB0ZXJtcyA9IG5ldyBBcnJheShzdHJpZGUubGVuZ3RoKVxuICB2YXIgaVxuICBmb3IoaT0wOyBpPHRlcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgdGVybXNbaV0gPSBbTWF0aC5hYnMoc3RyaWRlW2ldKSwgaV1cbiAgfVxuICB0ZXJtcy5zb3J0KGNvbXBhcmUxc3QpXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkodGVybXMubGVuZ3RoKVxuICBmb3IoaT0wOyBpPHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IHRlcm1zW2ldWzFdXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBjb21waWxlQ29uc3RydWN0b3IoZHR5cGUsIGRpbWVuc2lvbikge1xuICB2YXIgY2xhc3NOYW1lID0gW1wiVmlld1wiLCBkaW1lbnNpb24sIFwiZFwiLCBkdHlwZV0uam9pbihcIlwiKVxuICBpZihkaW1lbnNpb24gPCAwKSB7XG4gICAgY2xhc3NOYW1lID0gXCJWaWV3X05pbFwiICsgZHR5cGVcbiAgfVxuICB2YXIgdXNlR2V0dGVycyA9IChkdHlwZSA9PT0gXCJnZW5lcmljXCIpXG5cbiAgaWYoZGltZW5zaW9uID09PSAtMSkge1xuICAgIC8vU3BlY2lhbCBjYXNlIGZvciB0cml2aWFsIGFycmF5c1xuICAgIHZhciBjb2RlID1cbiAgICAgIFwiZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiKGEpe3RoaXMuZGF0YT1hO307XFxcbnZhciBwcm90bz1cIitjbGFzc05hbWUrXCIucHJvdG90eXBlO1xcXG5wcm90by5kdHlwZT0nXCIrZHR5cGUrXCInO1xcXG5wcm90by5pbmRleD1mdW5jdGlvbigpe3JldHVybiAtMX07XFxcbnByb3RvLnNpemU9MDtcXFxucHJvdG8uZGltZW5zaW9uPS0xO1xcXG5wcm90by5zaGFwZT1wcm90by5zdHJpZGU9cHJvdG8ub3JkZXI9W107XFxcbnByb3RvLmxvPXByb3RvLmhpPXByb3RvLnRyYW5zcG9zZT1wcm90by5zdGVwPVxcXG5mdW5jdGlvbigpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSk7fTtcXFxucHJvdG8uZ2V0PXByb3RvLnNldD1mdW5jdGlvbigpe307XFxcbnByb3RvLnBpY2s9ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH07XFxcbnJldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfXCIrY2xhc3NOYW1lK1wiKGEpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKGEpO31cIlxuICAgIHZhciBwcm9jZWR1cmUgPSBuZXcgRnVuY3Rpb24oY29kZSlcbiAgICByZXR1cm4gcHJvY2VkdXJlKClcbiAgfSBlbHNlIGlmKGRpbWVuc2lvbiA9PT0gMCkge1xuICAgIC8vU3BlY2lhbCBjYXNlIGZvciAwZCBhcnJheXNcbiAgICB2YXIgY29kZSA9XG4gICAgICBcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIihhLGQpIHtcXFxudGhpcy5kYXRhID0gYTtcXFxudGhpcy5vZmZzZXQgPSBkXFxcbn07XFxcbnZhciBwcm90bz1cIitjbGFzc05hbWUrXCIucHJvdG90eXBlO1xcXG5wcm90by5kdHlwZT0nXCIrZHR5cGUrXCInO1xcXG5wcm90by5pbmRleD1mdW5jdGlvbigpe3JldHVybiB0aGlzLm9mZnNldH07XFxcbnByb3RvLmRpbWVuc2lvbj0wO1xcXG5wcm90by5zaXplPTE7XFxcbnByb3RvLnNoYXBlPVxcXG5wcm90by5zdHJpZGU9XFxcbnByb3RvLm9yZGVyPVtdO1xcXG5wcm90by5sbz1cXFxucHJvdG8uaGk9XFxcbnByb3RvLnRyYW5zcG9zZT1cXFxucHJvdG8uc3RlcD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfY29weSgpIHtcXFxucmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLHRoaXMub2Zmc2V0KVxcXG59O1xcXG5wcm90by5waWNrPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9waWNrKCl7XFxcbnJldHVybiBUcml2aWFsQXJyYXkodGhpcy5kYXRhKTtcXFxufTtcXFxucHJvdG8udmFsdWVPZj1wcm90by5nZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2dldCgpe1xcXG5yZXR1cm4gXCIrKHVzZUdldHRlcnMgPyBcInRoaXMuZGF0YS5nZXQodGhpcy5vZmZzZXQpXCIgOiBcInRoaXMuZGF0YVt0aGlzLm9mZnNldF1cIikrXG5cIn07XFxcbnByb3RvLnNldD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfc2V0KHYpe1xcXG5yZXR1cm4gXCIrKHVzZUdldHRlcnMgPyBcInRoaXMuZGF0YS5zZXQodGhpcy5vZmZzZXQsdilcIiA6IFwidGhpcy5kYXRhW3RoaXMub2Zmc2V0XT12XCIpK1wiXFxcbn07XFxcbnJldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfXCIrY2xhc3NOYW1lK1wiKGEsYixjLGQpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKGEsZCl9XCJcbiAgICB2YXIgcHJvY2VkdXJlID0gbmV3IEZ1bmN0aW9uKFwiVHJpdmlhbEFycmF5XCIsIGNvZGUpXG4gICAgcmV0dXJuIHByb2NlZHVyZShDQUNIRURfQ09OU1RSVUNUT1JTW2R0eXBlXVswXSlcbiAgfVxuXG4gIHZhciBjb2RlID0gW1wiJ3VzZSBzdHJpY3QnXCJdXG5cbiAgLy9DcmVhdGUgY29uc3RydWN0b3IgZm9yIHZpZXdcbiAgdmFyIGluZGljZXMgPSBpb3RhKGRpbWVuc2lvbilcbiAgdmFyIGFyZ3MgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcImlcIitpIH0pXG4gIHZhciBpbmRleF9zdHIgPSBcInRoaXMub2Zmc2V0K1wiICsgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gXCJ0aGlzLnN0cmlkZVtcIiArIGkgKyBcIl0qaVwiICsgaVxuICAgICAgfSkuam9pbihcIitcIilcbiAgdmFyIHNoYXBlQXJnID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYlwiK2lcbiAgICB9KS5qb2luKFwiLFwiKVxuICB2YXIgc3RyaWRlQXJnID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiY1wiK2lcbiAgICB9KS5qb2luKFwiLFwiKVxuICBjb2RlLnB1c2goXG4gICAgXCJmdW5jdGlvbiBcIitjbGFzc05hbWUrXCIoYSxcIiArIHNoYXBlQXJnICsgXCIsXCIgKyBzdHJpZGVBcmcgKyBcIixkKXt0aGlzLmRhdGE9YVwiLFxuICAgICAgXCJ0aGlzLnNoYXBlPVtcIiArIHNoYXBlQXJnICsgXCJdXCIsXG4gICAgICBcInRoaXMuc3RyaWRlPVtcIiArIHN0cmlkZUFyZyArIFwiXVwiLFxuICAgICAgXCJ0aGlzLm9mZnNldD1kfDB9XCIsXG4gICAgXCJ2YXIgcHJvdG89XCIrY2xhc3NOYW1lK1wiLnByb3RvdHlwZVwiLFxuICAgIFwicHJvdG8uZHR5cGU9J1wiK2R0eXBlK1wiJ1wiLFxuICAgIFwicHJvdG8uZGltZW5zaW9uPVwiK2RpbWVuc2lvbilcblxuICAvL3ZpZXcuc2l6ZTpcbiAgY29kZS5wdXNoKFwiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdzaXplJyx7Z2V0OmZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zaXplKCl7XFxcbnJldHVybiBcIitpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcInRoaXMuc2hhcGVbXCIraStcIl1cIiB9KS5qb2luKFwiKlwiKSxcblwifX0pXCIpXG5cbiAgLy92aWV3Lm9yZGVyOlxuICBpZihkaW1lbnNpb24gPT09IDEpIHtcbiAgICBjb2RlLnB1c2goXCJwcm90by5vcmRlcj1bMF1cIilcbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ29yZGVyJyx7Z2V0OlwiKVxuICAgIGlmKGRpbWVuc2lvbiA8IDQpIHtcbiAgICAgIGNvZGUucHVzaChcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9vcmRlcigpe1wiKVxuICAgICAgaWYoZGltZW5zaW9uID09PSAyKSB7XG4gICAgICAgIGNvZGUucHVzaChcInJldHVybiAoTWF0aC5hYnModGhpcy5zdHJpZGVbMF0pPk1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSk/WzEsMF06WzAsMV19fSlcIilcbiAgICAgIH0gZWxzZSBpZihkaW1lbnNpb24gPT09IDMpIHtcbiAgICAgICAgY29kZS5wdXNoKFxuXCJ2YXIgczA9TWF0aC5hYnModGhpcy5zdHJpZGVbMF0pLHMxPU1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSxzMj1NYXRoLmFicyh0aGlzLnN0cmlkZVsyXSk7XFxcbmlmKHMwPnMxKXtcXFxuaWYoczE+czIpe1xcXG5yZXR1cm4gWzIsMSwwXTtcXFxufWVsc2UgaWYoczA+czIpe1xcXG5yZXR1cm4gWzEsMiwwXTtcXFxufWVsc2V7XFxcbnJldHVybiBbMSwwLDJdO1xcXG59XFxcbn1lbHNlIGlmKHMwPnMyKXtcXFxucmV0dXJuIFsyLDAsMV07XFxcbn1lbHNlIGlmKHMyPnMxKXtcXFxucmV0dXJuIFswLDEsMl07XFxcbn1lbHNle1xcXG5yZXR1cm4gWzAsMiwxXTtcXFxufX19KVwiKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2RlLnB1c2goXCJPUkRFUn0pXCIpXG4gICAgfVxuICB9XG5cbiAgLy92aWV3LnNldChpMCwgLi4uLCB2KTpcbiAgY29kZS5wdXNoKFxuXCJwcm90by5zZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3NldChcIithcmdzLmpvaW4oXCIsXCIpK1wiLHYpe1wiKVxuICBpZih1c2VHZXR0ZXJzKSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIHRoaXMuZGF0YS5zZXQoXCIraW5kZXhfc3RyK1wiLHYpfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGFbXCIraW5kZXhfc3RyK1wiXT12fVwiKVxuICB9XG5cbiAgLy92aWV3LmdldChpMCwgLi4uKTpcbiAgY29kZS5wdXNoKFwicHJvdG8uZ2V0PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9nZXQoXCIrYXJncy5qb2luKFwiLFwiKStcIil7XCIpXG4gIGlmKHVzZUdldHRlcnMpIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gdGhpcy5kYXRhLmdldChcIitpbmRleF9zdHIrXCIpfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGFbXCIraW5kZXhfc3RyK1wiXX1cIilcbiAgfVxuXG4gIC8vdmlldy5pbmRleDpcbiAgY29kZS5wdXNoKFxuICAgIFwicHJvdG8uaW5kZXg9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2luZGV4KFwiLCBhcmdzLmpvaW4oKSwgXCIpe3JldHVybiBcIitpbmRleF9zdHIrXCJ9XCIpXG5cbiAgLy92aWV3LmhpKCk6XG4gIGNvZGUucHVzaChcInByb3RvLmhpPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9oaShcIithcmdzLmpvaW4oXCIsXCIpK1wiKXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFtcIih0eXBlb2YgaVwiLGksXCIhPT0nbnVtYmVyJ3x8aVwiLGksXCI8MCk/dGhpcy5zaGFwZVtcIiwgaSwgXCJdOmlcIiwgaSxcInwwXCJdLmpvaW4oXCJcIilcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJ0aGlzLnN0cmlkZVtcIitpICsgXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIix0aGlzLm9mZnNldCl9XCIpXG5cbiAgLy92aWV3LmxvKCk6XG4gIHZhciBhX3ZhcnMgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcImFcIitpK1wiPXRoaXMuc2hhcGVbXCIraStcIl1cIiB9KVxuICB2YXIgY192YXJzID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkgeyByZXR1cm4gXCJjXCIraStcIj10aGlzLnN0cmlkZVtcIitpK1wiXVwiIH0pXG4gIGNvZGUucHVzaChcInByb3RvLmxvPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9sbyhcIithcmdzLmpvaW4oXCIsXCIpK1wiKXt2YXIgYj10aGlzLm9mZnNldCxkPTAsXCIrYV92YXJzLmpvaW4oXCIsXCIpK1wiLFwiK2NfdmFycy5qb2luKFwiLFwiKSlcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXG5cImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInJiZpXCIraStcIj49MCl7XFxcbmQ9aVwiK2krXCJ8MDtcXFxuYis9Y1wiK2krXCIqZDtcXFxuYVwiK2krXCItPWR9XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwicmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImFcIitpXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiY1wiK2lcbiAgICB9KS5qb2luKFwiLFwiKStcIixiKX1cIilcblxuICAvL3ZpZXcuc3RlcCgpOlxuICBjb2RlLnB1c2goXCJwcm90by5zdGVwPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zdGVwKFwiK2FyZ3Muam9pbihcIixcIikrXCIpe3ZhciBcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJhXCIraStcIj10aGlzLnNoYXBlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJiXCIraStcIj10aGlzLnN0cmlkZVtcIitpK1wiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsYz10aGlzLm9mZnNldCxkPTAsY2VpbD1NYXRoLmNlaWxcIilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXG5cImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInKXtcXFxuZD1pXCIraStcInwwO1xcXG5pZihkPDApe1xcXG5jKz1iXCIraStcIiooYVwiK2krXCItMSk7XFxcbmFcIitpK1wiPWNlaWwoLWFcIitpK1wiL2QpXFxcbn1lbHNle1xcXG5hXCIraStcIj1jZWlsKGFcIitpK1wiL2QpXFxcbn1cXFxuYlwiK2krXCIqPWRcXFxufVwiKVxuICB9XG4gIGNvZGUucHVzaChcInJldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSxcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJhXCIgKyBpXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYlwiICsgaVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLGMpfVwiKVxuXG4gIC8vdmlldy50cmFuc3Bvc2UoKTpcbiAgdmFyIHRTaGFwZSA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciB0U3RyaWRlID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICB0U2hhcGVbaV0gPSBcImFbaVwiK2krXCJdXCJcbiAgICB0U3RyaWRlW2ldID0gXCJiW2lcIitpK1wiXVwiXG4gIH1cbiAgY29kZS5wdXNoKFwicHJvdG8udHJhbnNwb3NlPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl90cmFuc3Bvc2UoXCIrYXJncytcIil7XCIrXG4gICAgYXJncy5tYXAoZnVuY3Rpb24obixpZHgpIHsgcmV0dXJuIG4gKyBcIj0oXCIgKyBuICsgXCI9PT11bmRlZmluZWQ/XCIgKyBpZHggKyBcIjpcIiArIG4gKyBcInwwKVwifSkuam9pbihcIjtcIiksXG4gICAgXCJ2YXIgYT10aGlzLnNoYXBlLGI9dGhpcy5zdHJpZGU7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK3RTaGFwZS5qb2luKFwiLFwiKStcIixcIit0U3RyaWRlLmpvaW4oXCIsXCIpK1wiLHRoaXMub2Zmc2V0KX1cIilcblxuICAvL3ZpZXcucGljaygpOlxuICBjb2RlLnB1c2goXCJwcm90by5waWNrPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9waWNrKFwiK2FyZ3MrXCIpe3ZhciBhPVtdLGI9W10sYz10aGlzLm9mZnNldFwiKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChcImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInJiZpXCIraStcIj49MCl7Yz0oYyt0aGlzLnN0cmlkZVtcIitpK1wiXSppXCIraStcIil8MH1lbHNle2EucHVzaCh0aGlzLnNoYXBlW1wiK2krXCJdKTtiLnB1c2godGhpcy5zdHJpZGVbXCIraStcIl0pfVwiKVxuICB9XG4gIGNvZGUucHVzaChcInZhciBjdG9yPUNUT1JfTElTVFthLmxlbmd0aCsxXTtyZXR1cm4gY3Rvcih0aGlzLmRhdGEsYSxiLGMpfVwiKVxuXG4gIC8vQWRkIHJldHVybiBzdGF0ZW1lbnRcbiAgY29kZS5wdXNoKFwicmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF9cIitjbGFzc05hbWUrXCIoZGF0YSxzaGFwZSxzdHJpZGUsb2Zmc2V0KXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIihkYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcInNoYXBlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJzdHJpZGVbXCIraStcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLG9mZnNldCl9XCIpXG5cbiAgLy9Db21waWxlIHByb2NlZHVyZVxuICB2YXIgcHJvY2VkdXJlID0gbmV3IEZ1bmN0aW9uKFwiQ1RPUl9MSVNUXCIsIFwiT1JERVJcIiwgY29kZS5qb2luKFwiXFxuXCIpKVxuICByZXR1cm4gcHJvY2VkdXJlKENBQ0hFRF9DT05TVFJVQ1RPUlNbZHR5cGVdLCBvcmRlcilcbn1cblxuZnVuY3Rpb24gYXJyYXlEVHlwZShkYXRhKSB7XG4gIGlmKGlzQnVmZmVyKGRhdGEpKSB7XG4gICAgcmV0dXJuIFwiYnVmZmVyXCJcbiAgfVxuICBpZihoYXNUeXBlZEFycmF5cykge1xuICAgIHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkpIHtcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiZmxvYXQ2NFwiXG4gICAgICBjYXNlIFwiW29iamVjdCBGbG9hdDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImZsb2F0MzJcIlxuICAgICAgY2FzZSBcIltvYmplY3QgSW50OEFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJpbnQ4XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEludDE2QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImludDE2XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEludDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImludDMyXCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQ4XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQxNkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJ1aW50MTZcIlxuICAgICAgY2FzZSBcIltvYmplY3QgVWludDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQzMlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBVaW50OENsYW1wZWRBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwidWludDhfY2xhbXBlZFwiXG4gICAgfVxuICB9XG4gIGlmKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICByZXR1cm4gXCJhcnJheVwiXG4gIH1cbiAgcmV0dXJuIFwiZ2VuZXJpY1wiXG59XG5cbnZhciBDQUNIRURfQ09OU1RSVUNUT1JTID0ge1xuICBcImZsb2F0MzJcIjpbXSxcbiAgXCJmbG9hdDY0XCI6W10sXG4gIFwiaW50OFwiOltdLFxuICBcImludDE2XCI6W10sXG4gIFwiaW50MzJcIjpbXSxcbiAgXCJ1aW50OFwiOltdLFxuICBcInVpbnQxNlwiOltdLFxuICBcInVpbnQzMlwiOltdLFxuICBcImFycmF5XCI6W10sXG4gIFwidWludDhfY2xhbXBlZFwiOltdLFxuICBcImJ1ZmZlclwiOltdLFxuICBcImdlbmVyaWNcIjpbXVxufVxuXG47KGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGlkIGluIENBQ0hFRF9DT05TVFJVQ1RPUlMpIHtcbiAgICBDQUNIRURfQ09OU1RSVUNUT1JTW2lkXS5wdXNoKGNvbXBpbGVDb25zdHJ1Y3RvcihpZCwgLTEpKVxuICB9XG59KTtcblxuZnVuY3Rpb24gd3JhcHBlZE5EQXJyYXlDdG9yKGRhdGEsIHNoYXBlLCBzdHJpZGUsIG9mZnNldCkge1xuICBpZihkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY3RvciA9IENBQ0hFRF9DT05TVFJVQ1RPUlMuYXJyYXlbMF1cbiAgICByZXR1cm4gY3RvcihbXSlcbiAgfSBlbHNlIGlmKHR5cGVvZiBkYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgZGF0YSA9IFtkYXRhXVxuICB9XG4gIGlmKHNoYXBlID09PSB1bmRlZmluZWQpIHtcbiAgICBzaGFwZSA9IFsgZGF0YS5sZW5ndGggXVxuICB9XG4gIHZhciBkID0gc2hhcGUubGVuZ3RoXG4gIGlmKHN0cmlkZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RyaWRlID0gbmV3IEFycmF5KGQpXG4gICAgZm9yKHZhciBpPWQtMSwgc3o9MTsgaT49MDsgLS1pKSB7XG4gICAgICBzdHJpZGVbaV0gPSBzelxuICAgICAgc3ogKj0gc2hhcGVbaV1cbiAgICB9XG4gIH1cbiAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBvZmZzZXQgPSAwXG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgICBpZihzdHJpZGVbaV0gPCAwKSB7XG4gICAgICAgIG9mZnNldCAtPSAoc2hhcGVbaV0tMSkqc3RyaWRlW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHZhciBkdHlwZSA9IGFycmF5RFR5cGUoZGF0YSlcbiAgdmFyIGN0b3JfbGlzdCA9IENBQ0hFRF9DT05TVFJVQ1RPUlNbZHR5cGVdXG4gIHdoaWxlKGN0b3JfbGlzdC5sZW5ndGggPD0gZCsxKSB7XG4gICAgY3Rvcl9saXN0LnB1c2goY29tcGlsZUNvbnN0cnVjdG9yKGR0eXBlLCBjdG9yX2xpc3QubGVuZ3RoLTEpKVxuICB9XG4gIHZhciBjdG9yID0gY3Rvcl9saXN0W2QrMV1cbiAgcmV0dXJuIGN0b3IoZGF0YSwgc2hhcGUsIHN0cmlkZSwgb2Zmc2V0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZWROREFycmF5Q3RvclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmRhcnJheS9uZGFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGlvdGEobikge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KG4pXG4gIGZvcih2YXIgaT0wOyBpPG47ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IGlcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW90YVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lvdGEtYXJyYXkvaW90YS5qc1xuLy8gbW9kdWxlIGlkID0gNTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIERldGVybWluZSBpZiBhbiBvYmplY3QgaXMgYSBCdWZmZXJcbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuXG4vLyBUaGUgX2lzQnVmZmVyIGNoZWNrIGlzIGZvciBTYWZhcmkgNS03IHN1cHBvcnQsIGJlY2F1c2UgaXQncyBtaXNzaW5nXG4vLyBPYmplY3QucHJvdG90eXBlLmNvbnN0cnVjdG9yLiBSZW1vdmUgdGhpcyBldmVudHVhbGx5XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPSBudWxsICYmIChpc0J1ZmZlcihvYmopIHx8IGlzU2xvd0J1ZmZlcihvYmopIHx8ICEhb2JqLl9pc0J1ZmZlcilcbn1cblxuZnVuY3Rpb24gaXNCdWZmZXIgKG9iaikge1xuICByZXR1cm4gISFvYmouY29uc3RydWN0b3IgJiYgdHlwZW9mIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIob2JqKVxufVxuXG4vLyBGb3IgTm9kZSB2MC4xMCBzdXBwb3J0LiBSZW1vdmUgdGhpcyBldmVudHVhbGx5LlxuZnVuY3Rpb24gaXNTbG93QnVmZmVyIChvYmopIHtcbiAgcmV0dXJuIHR5cGVvZiBvYmoucmVhZEZsb2F0TEUgPT09ICdmdW5jdGlvbicgJiYgdHlwZW9mIG9iai5zbGljZSA9PT0gJ2Z1bmN0aW9uJyAmJiBpc0J1ZmZlcihvYmouc2xpY2UoMCwgMCkpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNyZWF0ZVZBT05hdGl2ZSA9IHJlcXVpcmUoXCIuL2xpYi92YW8tbmF0aXZlLmpzXCIpXG52YXIgY3JlYXRlVkFPRW11bGF0ZWQgPSByZXF1aXJlKFwiLi9saWIvdmFvLWVtdWxhdGVkLmpzXCIpXG5cbmZ1bmN0aW9uIEV4dGVuc2lvblNoaW0gKGdsKSB7XG4gIHRoaXMuYmluZFZlcnRleEFycmF5T0VTID0gZ2wuYmluZFZlcnRleEFycmF5LmJpbmQoZ2wpXG4gIHRoaXMuY3JlYXRlVmVydGV4QXJyYXlPRVMgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheS5iaW5kKGdsKVxuICB0aGlzLmRlbGV0ZVZlcnRleEFycmF5T0VTID0gZ2wuZGVsZXRlVmVydGV4QXJyYXkuYmluZChnbClcbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPKGdsLCBhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHZhciBleHQgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheVxuICAgID8gbmV3IEV4dGVuc2lvblNoaW0oZ2wpXG4gICAgOiBnbC5nZXRFeHRlbnNpb24oJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JylcbiAgdmFyIHZhb1xuXG4gIGlmKGV4dCkge1xuICAgIHZhbyA9IGNyZWF0ZVZBT05hdGl2ZShnbCwgZXh0KVxuICB9IGVsc2Uge1xuICAgIHZhbyA9IGNyZWF0ZVZBT0VtdWxhdGVkKGdsKVxuICB9XG4gIHZhby51cGRhdGUoYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSlcbiAgcmV0dXJuIHZhb1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZBT1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL3Zhby5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYmluZEF0dHJpYnMgPSByZXF1aXJlKFwiLi9kby1iaW5kLmpzXCIpXG5cbmZ1bmN0aW9uIFZlcnRleEF0dHJpYnV0ZShsb2NhdGlvbiwgZGltZW5zaW9uLCBhLCBiLCBjLCBkKSB7XG4gIHRoaXMubG9jYXRpb24gPSBsb2NhdGlvblxuICB0aGlzLmRpbWVuc2lvbiA9IGRpbWVuc2lvblxuICB0aGlzLmEgPSBhXG4gIHRoaXMuYiA9IGJcbiAgdGhpcy5jID0gY1xuICB0aGlzLmQgPSBkXG59XG5cblZlcnRleEF0dHJpYnV0ZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKGdsKSB7XG4gIHN3aXRjaCh0aGlzLmRpbWVuc2lvbikge1xuICAgIGNhc2UgMTpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjFmKHRoaXMubG9jYXRpb24sIHRoaXMuYSlcbiAgICBicmVha1xuICAgIGNhc2UgMjpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjJmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iKVxuICAgIGJyZWFrXG4gICAgY2FzZSAzOlxuICAgICAgZ2wudmVydGV4QXR0cmliM2YodGhpcy5sb2NhdGlvbiwgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYylcbiAgICBicmVha1xuICAgIGNhc2UgNDpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjRmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMsIHRoaXMuZClcbiAgICBicmVha1xuICB9XG59XG5cbmZ1bmN0aW9uIFZBT05hdGl2ZShnbCwgZXh0LCBoYW5kbGUpIHtcbiAgdGhpcy5nbCA9IGdsXG4gIHRoaXMuX2V4dCA9IGV4dFxuICB0aGlzLmhhbmRsZSA9IGhhbmRsZVxuICB0aGlzLl9hdHRyaWJzID0gW11cbiAgdGhpcy5fdXNlRWxlbWVudHMgPSBmYWxzZVxuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBnbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyh0aGlzLmhhbmRsZSlcbiAgZm9yKHZhciBpPTA7IGk8dGhpcy5fYXR0cmlicy5sZW5ndGg7ICsraSkge1xuICAgIHRoaXMuX2F0dHJpYnNbaV0uYmluZCh0aGlzLmdsKVxuICB9XG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUudW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5iaW5kVmVydGV4QXJyYXlPRVMobnVsbClcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5kZWxldGVWZXJ0ZXhBcnJheU9FUyh0aGlzLmhhbmRsZSlcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHRoaXMuYmluZCgpXG4gIGJpbmRBdHRyaWJzKHRoaXMuZ2wsIGVsZW1lbnRzLCBhdHRyaWJ1dGVzKVxuICB0aGlzLnVuYmluZCgpXG4gIHRoaXMuX2F0dHJpYnMubGVuZ3RoID0gMFxuICBpZihhdHRyaWJ1dGVzKVxuICBmb3IodmFyIGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGEgPSBhdHRyaWJ1dGVzW2ldXG4gICAgaWYodHlwZW9mIGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgIHRoaXMuX2F0dHJpYnMucHVzaChuZXcgVmVydGV4QXR0cmlidXRlKGksIDEsIGEpKVxuICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KGEpKSB7XG4gICAgICB0aGlzLl9hdHRyaWJzLnB1c2gobmV3IFZlcnRleEF0dHJpYnV0ZShpLCBhLmxlbmd0aCwgYVswXSwgYVsxXSwgYVsyXSwgYVszXSkpXG4gICAgfVxuICB9XG4gIHRoaXMuX3VzZUVsZW1lbnRzID0gISFlbGVtZW50c1xuICB0aGlzLl9lbGVtZW50c1R5cGUgPSBlbGVtZW50c1R5cGUgfHwgdGhpcy5nbC5VTlNJR05FRF9TSE9SVFxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLmRyYXcgPSBmdW5jdGlvbihtb2RlLCBjb3VudCwgb2Zmc2V0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8fCAwXG4gIHZhciBnbCA9IHRoaXMuZ2xcbiAgaWYodGhpcy5fdXNlRWxlbWVudHMpIHtcbiAgICBnbC5kcmF3RWxlbWVudHMobW9kZSwgY291bnQsIHRoaXMuX2VsZW1lbnRzVHlwZSwgb2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGdsLmRyYXdBcnJheXMobW9kZSwgb2Zmc2V0LCBjb3VudClcbiAgfVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWQU9OYXRpdmUoZ2wsIGV4dCkge1xuICByZXR1cm4gbmV3IFZBT05hdGl2ZShnbCwgZXh0LCBleHQuY3JlYXRlVmVydGV4QXJyYXlPRVMoKSlcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWQU9OYXRpdmVcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL3Zhby1uYXRpdmUuanNcbi8vIG1vZHVsZSBpZCA9IDU4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJpbmRBdHRyaWJzID0gcmVxdWlyZShcIi4vZG8tYmluZC5qc1wiKVxuXG5mdW5jdGlvbiBWQU9FbXVsYXRlZChnbCkge1xuICB0aGlzLmdsID0gZ2xcbiAgdGhpcy5fZWxlbWVudHMgPSBudWxsXG4gIHRoaXMuX2F0dHJpYnV0ZXMgPSBudWxsXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIGJpbmRBdHRyaWJzKHRoaXMuZ2wsIHRoaXMuX2VsZW1lbnRzLCB0aGlzLl9hdHRyaWJ1dGVzKVxufVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSkge1xuICB0aGlzLl9lbGVtZW50cyA9IGVsZW1lbnRzXG4gIHRoaXMuX2F0dHJpYnV0ZXMgPSBhdHRyaWJ1dGVzXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGVsZW1lbnRzVHlwZSB8fCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24oKSB7IH1cblZBT0VtdWxhdGVkLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbigpIHsgfVxuXG5WQU9FbXVsYXRlZC5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKG1vZGUsIGNvdW50LCBvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgdmFyIGdsID0gdGhpcy5nbFxuICBpZih0aGlzLl9lbGVtZW50cykge1xuICAgIGdsLmRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdGhpcy5fZWxlbWVudHNUeXBlLCBvZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgZ2wuZHJhd0FycmF5cyhtb2RlLCBvZmZzZXQsIGNvdW50KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZBT0VtdWxhdGVkKGdsKSB7XG4gIHJldHVybiBuZXcgVkFPRW11bGF0ZWQoZ2wpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPRW11bGF0ZWRcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL3Zhby1lbXVsYXRlZC5qc1xuLy8gbW9kdWxlIGlkID0gNTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJmdW5jdGlvbiBkb3dubG9hZCh0LGUsbil7ZnVuY3Rpb24gaSh0KXt2YXIgZT10LnNwbGl0KC9bOjssXS8pLG49ZVsxXSxpPVwiYmFzZTY0XCI9PWVbMl0/YXRvYjpkZWNvZGVVUklDb21wb25lbnQscj1pKGUucG9wKCkpLG89ci5sZW5ndGgsYT0wLHM9bmV3IFVpbnQ4QXJyYXkobyk7Zm9yKGE7YTxvOysrYSlzW2FdPXIuY2hhckNvZGVBdChhKTtyZXR1cm4gbmV3IG0oW3NdLHt0eXBlOm59KX1mdW5jdGlvbiByKHQsZSl7aWYoXCJkb3dubG9hZFwiaW4gbClyZXR1cm4gbC5ocmVmPXQsbC5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLHcpLGwuaW5uZXJIVE1MPVwiZG93bmxvYWRpbmcuLi5cIixsLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZi5ib2R5LmFwcGVuZENoaWxkKGwpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtsLmNsaWNrKCksZi5ib2R5LnJlbW92ZUNoaWxkKGwpLGU9PT0hMCYmc2V0VGltZW91dChmdW5jdGlvbigpe2guVVJMLnJldm9rZU9iamVjdFVSTChsLmhyZWYpfSwyNTApfSw2NiksITA7dmFyIG49Zi5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO2YuYm9keS5hcHBlbmRDaGlsZChuKSxlfHwodD1cImRhdGE6XCIrdC5yZXBsYWNlKC9eZGF0YTooW1xcd1xcL1xcLVxcK10rKS8sZCkpLG4uc3JjPXQsc2V0VGltZW91dChmdW5jdGlvbigpe2YuYm9keS5yZW1vdmVDaGlsZChuKX0sMzMzKX12YXIgbyxhLHMsaD13aW5kb3csZD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLHU9bnx8ZCxjPXQsZj1kb2N1bWVudCxsPWYuY3JlYXRlRWxlbWVudChcImFcIikscD1mdW5jdGlvbih0KXtyZXR1cm4gU3RyaW5nKHQpfSxtPWguQmxvYnx8aC5Nb3pCbG9ifHxoLldlYktpdEJsb2J8fHAsZz1oLk1TQmxvYkJ1aWxkZXJ8fGguV2ViS2l0QmxvYkJ1aWxkZXJ8fGguQmxvYkJ1aWxkZXIsdz1lfHxcImRvd25sb2FkXCI7aWYoXCJ0cnVlXCI9PT1TdHJpbmcodGhpcykmJihjPVtjLHVdLHU9Y1swXSxjPWNbMV0pLFN0cmluZyhjKS5tYXRjaCgvXmRhdGFcXDpbXFx3K1xcLV0rXFwvW1xcdytcXC1dK1ssO10vKSlyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2I/bmF2aWdhdG9yLm1zU2F2ZUJsb2IoaShjKSx3KTpyKGMpO3RyeXtvPWMgaW5zdGFuY2VvZiBtP2M6bmV3IG0oW2NdLHt0eXBlOnV9KX1jYXRjaCh0KXtnJiYoYT1uZXcgZyxhLmFwcGVuZChbY10pLG89YS5nZXRCbG9iKHUpKX1pZihuYXZpZ2F0b3IubXNTYXZlQmxvYilyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2Iobyx3KTtpZihoLlVSTClyKGguVVJMLmNyZWF0ZU9iamVjdFVSTChvKSwhMCk7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09PXApdHJ5e3JldHVybiByKFwiZGF0YTpcIit1K1wiO2Jhc2U2NCxcIitoLmJ0b2EobykpfWNhdGNoKHQpe3JldHVybiByKFwiZGF0YTpcIit1K1wiLFwiK2VuY29kZVVSSUNvbXBvbmVudChvKSl9cz1uZXcgRmlsZVJlYWRlcixzLm9ubG9hZD1mdW5jdGlvbih0KXtyKHRoaXMucmVzdWx0KX0scy5yZWFkQXNEYXRhVVJMKG8pfXJldHVybiEwfXdpbmRvdy5XaGFtbXk9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsbil7Zm9yKHZhciBpPWUodCkscj0zZTQsbz1be2lkOjQ0MDc4Njg1MSxkYXRhOlt7ZGF0YToxLGlkOjE3MDMwfSx7ZGF0YToxLGlkOjE3MTQzfSx7ZGF0YTo0LGlkOjE3MTM4fSx7ZGF0YTo4LGlkOjE3MTM5fSx7ZGF0YTpcIndlYm1cIixpZDoxNzAyNn0se2RhdGE6MixpZDoxNzAzMX0se2RhdGE6MixpZDoxNzAyOX1dfSx7aWQ6NDA4MTI1NTQzLGRhdGE6W3tpZDozNTcxNDkwMzAsZGF0YTpbe2RhdGE6MWU2LGlkOjI4MDc3Mjl9LHtkYXRhOlwid2hhbW15XCIsaWQ6MTk4NDB9LHtkYXRhOlwid2hhbW15XCIsaWQ6MjIzMzd9LHtkYXRhOmMoaS5kdXJhdGlvbiksaWQ6MTc1NDV9XX0se2lkOjM3NDY0ODQyNyxkYXRhOlt7aWQ6MTc0LGRhdGE6W3tkYXRhOjEsaWQ6MjE1fSx7ZGF0YToxLGlkOjI5NjM3fSx7ZGF0YTowLGlkOjE1Nn0se2RhdGE6XCJ1bmRcIixpZDoyMjc0NzE2fSx7ZGF0YTpcIlZfVlA4XCIsaWQ6MTM0fSx7ZGF0YTpcIlZQOFwiLGlkOjI0NTkyNzJ9LHtkYXRhOjEsaWQ6MTMxfSx7aWQ6MjI0LGRhdGE6W3tkYXRhOmkud2lkdGgsaWQ6MTc2fSx7ZGF0YTppLmhlaWdodCxpZDoxODZ9XX1dfV19LHtpZDo0NzUyNDk1MTUsZGF0YTpbXX1dfV0scz1vWzFdLGQ9cy5kYXRhWzJdLHU9MCxmPTA7dTx0Lmxlbmd0aDspe3ZhciBsPXtpZDoxODcsZGF0YTpbe2RhdGE6TWF0aC5yb3VuZChmKSxpZDoxNzl9LHtpZDoxODMsZGF0YTpbe2RhdGE6MSxpZDoyNDd9LHtkYXRhOjAsc2l6ZTo4LGlkOjI0MX1dfV19O2QuZGF0YS5wdXNoKGwpO3ZhciBwPVtdLG09MDtkbyBwLnB1c2godFt1XSksbSs9dFt1XS5kdXJhdGlvbix1Kys7d2hpbGUodTx0Lmxlbmd0aCYmbTxyKTt2YXIgZz0wLHc9e2lkOjUyNDUzMTMxNyxkYXRhOlt7ZGF0YTpNYXRoLnJvdW5kKGYpLGlkOjIzMX1dLmNvbmNhdChwLm1hcChmdW5jdGlvbih0KXt2YXIgZT1oKHtkaXNjYXJkYWJsZTowLGZyYW1lOnQuZGF0YS5zbGljZSg0KSxpbnZpc2libGU6MCxrZXlmcmFtZToxLGxhY2luZzowLHRyYWNrTnVtOjEsdGltZWNvZGU6TWF0aC5yb3VuZChnKX0pO3JldHVybiBnKz10LmR1cmF0aW9uLHtkYXRhOmUsaWQ6MTYzfX0pKX07cy5kYXRhLnB1c2godyksZis9bX1mb3IodmFyIHY9MCx5PTA7eTxzLmRhdGEubGVuZ3RoO3krKyl7eT49MyYmKGQuZGF0YVt5LTNdLmRhdGFbMV0uZGF0YVsxXS5kYXRhPXYpO3ZhciBiPWEoW3MuZGF0YVt5XV0sbik7dis9Yi5zaXplfHxiLmJ5dGVMZW5ndGh8fGIubGVuZ3RoLDIhPXkmJihzLmRhdGFbeV09Yil9cmV0dXJuIGEobyxuKX1mdW5jdGlvbiBlKHQpe2Zvcih2YXIgZT10WzBdLndpZHRoLG49dFswXS5oZWlnaHQsaT10WzBdLmR1cmF0aW9uLHI9MTtyPHQubGVuZ3RoO3IrKyl7aWYodFtyXS53aWR0aCE9ZSl0aHJvd1wiRnJhbWUgXCIrKHIrMSkrXCIgaGFzIGEgZGlmZmVyZW50IHdpZHRoXCI7aWYodFtyXS5oZWlnaHQhPW4pdGhyb3dcIkZyYW1lIFwiKyhyKzEpK1wiIGhhcyBhIGRpZmZlcmVudCBoZWlnaHRcIjtpZih0W3JdLmR1cmF0aW9uPDB8fHRbcl0uZHVyYXRpb24+MzI3NjcpdGhyb3dcIkZyYW1lIFwiKyhyKzEpK1wiIGhhcyBhIHdlaXJkIGR1cmF0aW9uIChtdXN0IGJlIGJldHdlZW4gMCBhbmQgMzI3NjcpXCI7aSs9dFtyXS5kdXJhdGlvbn1yZXR1cm57ZHVyYXRpb246aSx3aWR0aDplLGhlaWdodDpufX1mdW5jdGlvbiBuKHQpe2Zvcih2YXIgZT1bXTt0PjA7KWUucHVzaCgyNTUmdCksdD4+PTg7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUucmV2ZXJzZSgpKX1mdW5jdGlvbiBpKHQsZSl7Zm9yKHZhciBuPW5ldyBVaW50OEFycmF5KGUpLGk9ZS0xO2k+PTA7aS0tKW5baV09MjU1JnQsdD4+PTg7cmV0dXJuIG59ZnVuY3Rpb24gcih0KXtmb3IodmFyIGU9bmV3IFVpbnQ4QXJyYXkodC5sZW5ndGgpLG49MDtuPHQubGVuZ3RoO24rKyllW25dPXQuY2hhckNvZGVBdChuKTtyZXR1cm4gZX1mdW5jdGlvbiBvKHQpe3ZhciBlPVtdLG49dC5sZW5ndGglOD9uZXcgQXJyYXkoOS10Lmxlbmd0aCU4KS5qb2luKFwiMFwiKTpcIlwiO3Q9bit0O2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSs9OCllLnB1c2gocGFyc2VJbnQodC5zdWJzdHIoaSw4KSwyKSk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfWZ1bmN0aW9uIGEodCxlKXtmb3IodmFyIGg9W10sZD0wO2Q8dC5sZW5ndGg7ZCsrKWlmKFwiaWRcImluIHRbZF0pe3ZhciB1PXRbZF0uZGF0YTtpZihcIm9iamVjdFwiPT10eXBlb2YgdSYmKHU9YSh1LGUpKSxcIm51bWJlclwiPT10eXBlb2YgdSYmKHU9XCJzaXplXCJpbiB0W2RdP2kodSx0W2RdLnNpemUpOm8odS50b1N0cmluZygyKSkpLFwic3RyaW5nXCI9PXR5cGVvZiB1JiYodT1yKHUpKSx1Lmxlbmd0aCk7Zm9yKHZhciBjPXUuc2l6ZXx8dS5ieXRlTGVuZ3RofHx1Lmxlbmd0aCxmPTAsbD01NjtsPjA7bC09NylpZihjPk1hdGgucG93KDIsbCktMil7Zj1sLzc7YnJlYWt9dmFyIHA9Yy50b1N0cmluZygyKSxtPW5ldyBBcnJheSg4KihmKzEpKzEpLmpvaW4oXCIwXCIpLGc9bmV3IEFycmF5KGYrMSkuam9pbihcIjBcIikrMSx3PW0uc3Vic3RyKDAsbS5sZW5ndGgtcC5sZW5ndGgtZy5sZW5ndGgpK3Asdj1nK3c7aC5wdXNoKG4odFtkXS5pZCkpLGgucHVzaChvKHYpKSxoLnB1c2godSl9ZWxzZSBoLnB1c2godFtkXSk7aWYoZSl7dmFyIHk9cyhoKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeSl9cmV0dXJuIG5ldyBCbG9iKGgse3R5cGU6XCJ2aWRlby93ZWJtXCJ9KX1mdW5jdGlvbiBzKHQsZSl7bnVsbD09ZSYmKGU9W10pO2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKVwib2JqZWN0XCI9PXR5cGVvZiB0W25dP3ModFtuXSxlKTplLnB1c2godFtuXSk7cmV0dXJuIGV9ZnVuY3Rpb24gaCh0KXt2YXIgZT0wO2lmKHQua2V5ZnJhbWUmJihlfD0xMjgpLHQuaW52aXNpYmxlJiYoZXw9OCksdC5sYWNpbmcmJihlfD10LmxhY2luZzw8MSksdC5kaXNjYXJkYWJsZSYmKGV8PTEpLHQudHJhY2tOdW0+MTI3KXRocm93XCJUcmFja051bWJlciA+IDEyNyBub3Qgc3VwcG9ydGVkXCI7dmFyIG49WzEyOHx0LnRyYWNrTnVtLHQudGltZWNvZGU+PjgsMjU1JnQudGltZWNvZGUsZV0ubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHQpfSkuam9pbihcIlwiKSt0LmZyYW1lO3JldHVybiBufWZ1bmN0aW9uIGQodCl7Zm9yKHZhciBlPXQuUklGRlswXS5XRUJQWzBdLG49ZS5pbmRleE9mKFwiwp1cdTAwMDEqXCIpLGk9MCxyPVtdO2k8NDtpKyspcltpXT1lLmNoYXJDb2RlQXQobiszK2kpO3ZhciBvLGEscyxoLGQ7cmV0dXJuIGQ9clsxXTw8OHxyWzBdLG89MTYzODMmZCxhPWQ+PjE0LGQ9clszXTw8OHxyWzJdLHM9MTYzODMmZCxoPWQ+PjE0LHt3aWR0aDpvLGhlaWdodDpzLGRhdGE6ZSxyaWZmOnR9fWZ1bmN0aW9uIHUodCl7Zm9yKHZhciBlPTAsbj17fTtlPHQubGVuZ3RoOyl7dmFyIGk9dC5zdWJzdHIoZSw0KTtpZihuW2ldPW5baV18fFtdLFwiUklGRlwiPT1pfHxcIkxJU1RcIj09aSl7dmFyIHI9cGFyc2VJbnQodC5zdWJzdHIoZSs0LDQpLnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbih0KXt2YXIgZT10LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMik7cmV0dXJuIG5ldyBBcnJheSg4LWUubGVuZ3RoKzEpLmpvaW4oXCIwXCIpK2V9KS5qb2luKFwiXCIpLDIpLG89dC5zdWJzdHIoZSs0KzQscik7ZSs9OCtyLG5baV0ucHVzaCh1KG8pKX1lbHNlXCJXRUJQXCI9PWk/KG5baV0ucHVzaCh0LnN1YnN0cihlKzgpKSxlPXQubGVuZ3RoKToobltpXS5wdXNoKHQuc3Vic3RyKGUrNCkpLGU9dC5sZW5ndGgpfXJldHVybiBufWZ1bmN0aW9uIGModCl7cmV0dXJuW10uc2xpY2UuY2FsbChuZXcgVWludDhBcnJheShuZXcgRmxvYXQ2NEFycmF5KFt0XSkuYnVmZmVyKSwwKS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodCl9KS5yZXZlcnNlKCkuam9pbihcIlwiKX1mdW5jdGlvbiBmKHQsZSl7dGhpcy5mcmFtZXM9W10sdGhpcy5kdXJhdGlvbj0xZTMvdCx0aGlzLnF1YWxpdHk9ZXx8Ljh9cmV0dXJuIGYucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0LGUpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlJiZ0aGlzLmR1cmF0aW9uKXRocm93XCJ5b3UgY2FuJ3QgcGFzcyBhIGR1cmF0aW9uIGlmIHRoZSBmcHMgaXMgc2V0XCI7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUmJiF0aGlzLmR1cmF0aW9uKXRocm93XCJpZiB5b3UgZG9uJ3QgaGF2ZSB0aGUgZnBzIHNldCwgeW91IG5lZWQgdG8gaGF2ZSBkdXJhdGlvbnMgaGVyZS5cIjtpZih0LmNhbnZhcyYmKHQ9dC5jYW52YXMpLHQudG9EYXRhVVJMKXQ9dC5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKDAsMCx0LndpZHRoLHQuaGVpZ2h0KTtlbHNlIGlmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXRocm93XCJmcmFtZSBtdXN0IGJlIGEgYSBIVE1MQ2FudmFzRWxlbWVudCwgYSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgb3IgYSBEYXRhVVJJIGZvcm1hdHRlZCBzdHJpbmdcIjtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmIS9eZGF0YTppbWFnZVxcL3dlYnA7YmFzZTY0LC9naS50ZXN0KHQpKXRocm93XCJJbnB1dCBtdXN0IGJlIGZvcm1hdHRlZCBwcm9wZXJseSBhcyBhIGJhc2U2NCBlbmNvZGVkIERhdGFVUkkgb2YgdHlwZSBpbWFnZS93ZWJwXCI7dGhpcy5mcmFtZXMucHVzaCh7aW1hZ2U6dCxkdXJhdGlvbjplfHx0aGlzLmR1cmF0aW9ufSl9LGYucHJvdG90eXBlLmVuY29kZUZyYW1lcz1mdW5jdGlvbih0KXtpZih0aGlzLmZyYW1lc1swXS5pbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSl7dmFyIGU9dGhpcy5mcmFtZXMsbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLGk9bi5nZXRDb250ZXh0KFwiMmRcIik7bi53aWR0aD10aGlzLmZyYW1lc1swXS5pbWFnZS53aWR0aCxuLmhlaWdodD10aGlzLmZyYW1lc1swXS5pbWFnZS5oZWlnaHQ7dmFyIHI9ZnVuY3Rpb24obyl7dmFyIGE9ZVtvXTtpLnB1dEltYWdlRGF0YShhLmltYWdlLDAsMCksYS5pbWFnZT1uLnRvRGF0YVVSTChcImltYWdlL3dlYnBcIix0aGlzLnF1YWxpdHkpLG88ZS5sZW5ndGgtMT9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cihvKzEpfSwxKTp0KCl9LmJpbmQodGhpcyk7cigwKX1lbHNlIHQoKX0sZi5wcm90b3R5cGUuY29tcGlsZT1mdW5jdGlvbihlLG4pe3RoaXMuZW5jb2RlRnJhbWVzKGZ1bmN0aW9uKCl7dmFyIGk9bmV3IHQodGhpcy5mcmFtZXMubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPWQodShhdG9iKHQuaW1hZ2Uuc2xpY2UoMjMpKSkpO3JldHVybiBlLmR1cmF0aW9uPXQuZHVyYXRpb24sZX0pLGUpO24oaSl9LmJpbmQodGhpcykpfSx7VmlkZW86Zixmcm9tSW1hZ2VBcnJheTpmdW5jdGlvbihlLG4saSl7cmV0dXJuIHQoZS5tYXAoZnVuY3Rpb24odCl7dmFyIGU9ZCh1KGF0b2IodC5zbGljZSgyMykpKSk7cmV0dXJuIGUuZHVyYXRpb249MWUzL24sZX0pLGkpfSx0b1dlYk06dH19KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3ZhciBlLG49bmV3IFVpbnQ4QXJyYXkodCk7Zm9yKGU9MDtlPHQ7ZSs9MSluW2VdPTA7cmV0dXJuIG59ZnVuY3Rpb24gZShlLG4saSxyKXt2YXIgbz1uK2ksYT10KChwYXJzZUludChvL3IpKzEpKnIpO3JldHVybiBhLnNldChlKSxhfWZ1bmN0aW9uIG4odCxlLG4pe3JldHVybiB0PXQudG9TdHJpbmcobnx8OCksXCIwMDAwMDAwMDAwMDBcIi5zdWJzdHIodC5sZW5ndGgrMTItZSkrdH1mdW5jdGlvbiBpKGUsbixpKXt2YXIgcixvO2ZvcihuPW58fHQoZS5sZW5ndGgpLGk9aXx8MCxyPTAsbz1lLmxlbmd0aDtyPG87cis9MSluW2ldPWUuY2hhckNvZGVBdChyKSxpKz0xO3JldHVybiBufWZ1bmN0aW9uIHIodCl7ZnVuY3Rpb24gZSh0KXtyZXR1cm4gb1t0Pj4xOCY2M10rb1t0Pj4xMiY2M10rb1t0Pj42JjYzXStvWzYzJnRdfXZhciBuLGkscixhPXQubGVuZ3RoJTMscz1cIlwiO2ZvcihuPTAscj10Lmxlbmd0aC1hO248cjtuKz0zKWk9KHRbbl08PDE2KSsodFtuKzFdPDw4KSt0W24rMl0scys9ZShpKTtzd2l0Y2gocy5sZW5ndGglNCl7Y2FzZSAxOnMrPVwiPVwiO2JyZWFrO2Nhc2UgMjpzKz1cIj09XCJ9cmV0dXJuIHN9dmFyIG89W1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiLFwiUVwiLFwiUlwiLFwiU1wiLFwiVFwiLFwiVVwiLFwiVlwiLFwiV1wiLFwiWFwiLFwiWVwiLFwiWlwiLFwiYVwiLFwiYlwiLFwiY1wiLFwiZFwiLFwiZVwiLFwiZlwiLFwiZ1wiLFwiaFwiLFwiaVwiLFwialwiLFwia1wiLFwibFwiLFwibVwiLFwiblwiLFwib1wiLFwicFwiLFwicVwiLFwiclwiLFwic1wiLFwidFwiLFwidVwiLFwidlwiLFwid1wiLFwieFwiLFwieVwiLFwielwiLFwiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiLFwiK1wiLFwiL1wiXTt3aW5kb3cudXRpbHM9e30sd2luZG93LnV0aWxzLmNsZWFuPXQsd2luZG93LnV0aWxzLnBhZD1uLHdpbmRvdy51dGlscy5leHRlbmQ9ZSx3aW5kb3cudXRpbHMuc3RyaW5nVG9VaW50OD1pLHdpbmRvdy51dGlscy51aW50OFRvQmFzZTY0PXJ9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsaSl7dmFyIHI9bi5jbGVhbig1MTIpLG89MDtyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBuLGksYT10W2UuZmllbGRdfHxcIlwiO2ZvcihuPTAsaT1hLmxlbmd0aDtuPGk7bis9MSlyW29dPWEuY2hhckNvZGVBdChuKSxvKz0xO28rPWUubGVuZ3RoLW59KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBpP2kocixvKTpyfXZhciBlLG49d2luZG93LnV0aWxzO2U9W3tmaWVsZDpcImZpbGVOYW1lXCIsbGVuZ3RoOjEwMH0se2ZpZWxkOlwiZmlsZU1vZGVcIixsZW5ndGg6OH0se2ZpZWxkOlwidWlkXCIsbGVuZ3RoOjh9LHtmaWVsZDpcImdpZFwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJmaWxlU2l6ZVwiLGxlbmd0aDoxMn0se2ZpZWxkOlwibXRpbWVcIixsZW5ndGg6MTJ9LHtmaWVsZDpcImNoZWNrc3VtXCIsbGVuZ3RoOjh9LHtmaWVsZDpcInR5cGVcIixsZW5ndGg6MX0se2ZpZWxkOlwibGlua05hbWVcIixsZW5ndGg6MTAwfSx7ZmllbGQ6XCJ1c3RhclwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJvd25lclwiLGxlbmd0aDozMn0se2ZpZWxkOlwiZ3JvdXBcIixsZW5ndGg6MzJ9LHtmaWVsZDpcIm1ham9yTnVtYmVyXCIsbGVuZ3RoOjh9LHtmaWVsZDpcIm1pbm9yTnVtYmVyXCIsbGVuZ3RoOjh9LHtmaWVsZDpcImZpbGVuYW1lUHJlZml4XCIsbGVuZ3RoOjE1NX0se2ZpZWxkOlwicGFkZGluZ1wiLGxlbmd0aDoxMn1dLHdpbmRvdy5oZWFkZXI9e30sd2luZG93LmhlYWRlci5zdHJ1Y3R1cmU9ZSx3aW5kb3cuaGVhZGVyLmZvcm1hdD10fSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt0aGlzLndyaXR0ZW49MCxlPSh0fHwyMCkqcix0aGlzLm91dD1pLmNsZWFuKGUpLHRoaXMuYmxvY2tzPVtdLHRoaXMubGVuZ3RoPTB9dmFyIGUsbj13aW5kb3cuaGVhZGVyLGk9d2luZG93LnV0aWxzLHI9NTEyO3QucHJvdG90eXBlLmFwcGVuZD1mdW5jdGlvbih0LGUsbyxhKXt2YXIgcyxoLGQsdSxjLGYsbDtpZihcInN0cmluZ1wiPT10eXBlb2YgZSllPWkuc3RyaW5nVG9VaW50OChlKTtlbHNlIGlmKGUuY29uc3RydWN0b3IhPT1VaW50OEFycmF5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcil0aHJvd1wiSW52YWxpZCBpbnB1dCB0eXBlLiBZb3UgZ2F2ZSBtZTogXCIrZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvblxccyooWyRBLVphLXpfXVswLTlBLVphLXpfXSopXFxzKlxcKC8pWzFdO1wiZnVuY3Rpb25cIj09dHlwZW9mIG8mJihhPW8sbz17fSksbz1vfHx7fSxkPW8ubW9kZXx8NDA5NSZwYXJzZUludChcIjc3N1wiLDgpLHU9by5tdGltZXx8TWF0aC5mbG9vcigrbmV3IERhdGUvMWUzKSxjPW8udWlkfHwwLGY9by5naWR8fDAscz17ZmlsZU5hbWU6dCxmaWxlTW9kZTppLnBhZChkLDcpLHVpZDppLnBhZChjLDcpLGdpZDppLnBhZChmLDcpLGZpbGVTaXplOmkucGFkKGUubGVuZ3RoLDExKSxtdGltZTppLnBhZCh1LDExKSxjaGVja3N1bTpcIiAgICAgICAgXCIsdHlwZTpcIjBcIix1c3RhcjpcInVzdGFyICBcIixvd25lcjpvLm93bmVyfHxcIlwiLGdyb3VwOm8uZ3JvdXB8fFwiXCJ9LGg9MCxPYmplY3Qua2V5cyhzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlLG4saT1zW3RdO2ZvcihlPTAsbj1pLmxlbmd0aDtlPG47ZSs9MSloKz1pLmNoYXJDb2RlQXQoZSl9KSxzLmNoZWNrc3VtPWkucGFkKGgsNikrXCJcXDAgXCIsbD1uLmZvcm1hdChzKTt2YXIgcD1NYXRoLmNlaWwobC5sZW5ndGgvcikqcixtPU1hdGguY2VpbChlLmxlbmd0aC9yKSpyO3RoaXMuYmxvY2tzLnB1c2goe2hlYWRlcjpsLGlucHV0OmUsaGVhZGVyTGVuZ3RoOnAsaW5wdXRMZW5ndGg6bX0pfSx0LnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKCl7dmFyIHQ9W10sZT1bXSxuPTAsaT1NYXRoLnBvdygyLDIwKSxvPVtdO3JldHVybiB0aGlzLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe24rdC5oZWFkZXJMZW5ndGgrdC5pbnB1dExlbmd0aD5pJiYoZS5wdXNoKHtibG9ja3M6byxsZW5ndGg6bn0pLG89W10sbj0wKSxvLnB1c2godCksbis9dC5oZWFkZXJMZW5ndGgrdC5pbnB1dExlbmd0aH0pLGUucHVzaCh7YmxvY2tzOm8sbGVuZ3RoOm59KSxlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIG49bmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpLGk9MDtlLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe24uc2V0KHQuaGVhZGVyLGkpLGkrPXQuaGVhZGVyTGVuZ3RoLG4uc2V0KHQuaW5wdXQsaSksaSs9dC5pbnB1dExlbmd0aH0pLHQucHVzaChuKX0pLHQucHVzaChuZXcgVWludDhBcnJheSgyKnIpKSxuZXcgQmxvYih0LHt0eXBlOlwib2N0ZXQvc3RyZWFtXCJ9KX0sdC5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLndyaXR0ZW49MCx0aGlzLm91dD1pLmNsZWFuKGUpfSx3aW5kb3cuVGFyPXR9KCksZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LG4pe2lmKHt9Lmhhc093blByb3BlcnR5LmNhbGwoZS5jYWNoZSx0KSlyZXR1cm4gZS5jYWNoZVt0XTt2YXIgaT1lLnJlc29sdmUodCk7aWYoIWkpdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgbW9kdWxlIFwiK3QpO3ZhciByPXtpZDp0LHJlcXVpcmU6ZSxmaWxlbmFtZTp0LGV4cG9ydHM6e30sbG9hZGVkOiExLHBhcmVudDpuLGNoaWxkcmVuOltdfTtuJiZuLmNoaWxkcmVuLnB1c2gocik7dmFyIG89dC5zbGljZSgwLHQubGFzdEluZGV4T2YoXCIvXCIpKzEpO3JldHVybiBlLmNhY2hlW3RdPXIuZXhwb3J0cyxpLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLG8sdCksci5sb2FkZWQ9ITAsZS5jYWNoZVt0XT1yLmV4cG9ydHN9ZS5tb2R1bGVzPXt9LGUuY2FjaGU9e30sZS5yZXNvbHZlPWZ1bmN0aW9uKHQpe3JldHVybnt9Lmhhc093blByb3BlcnR5LmNhbGwoZS5tb2R1bGVzLHQpP2UubW9kdWxlc1t0XTp2b2lkIDB9LGUuZGVmaW5lPWZ1bmN0aW9uKHQsbil7ZS5tb2R1bGVzW3RdPW59O3ZhciBuPWZ1bmN0aW9uKGUpe3JldHVybiBlPVwiL1wiLHt0aXRsZTpcImJyb3dzZXJcIix2ZXJzaW9uOlwidjAuMTAuMjZcIixicm93c2VyOiEwLGVudjp7fSxhcmd2OltdLG5leHRUaWNrOnQuc2V0SW1tZWRpYXRlfHxmdW5jdGlvbih0KXtzZXRUaW1lb3V0KHQsMCl9LGN3ZDpmdW5jdGlvbigpe3JldHVybiBlfSxjaGRpcjpmdW5jdGlvbih0KXtlPXR9fX0oKTtlLmRlZmluZShcIi9naWYuY29mZmVlXCIsZnVuY3Rpb24odCxuLGkscil7ZnVuY3Rpb24gbyh0LGUpe3JldHVybnt9Lmhhc093blByb3BlcnR5LmNhbGwodCxlKX1mdW5jdGlvbiBhKHQsZSl7Zm9yKHZhciBuPTAsaT1lLmxlbmd0aDtuPGk7KytuKWlmKG4gaW4gZSYmZVtuXT09PXQpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gcyh0LGUpe2Z1bmN0aW9uIG4oKXt0aGlzLmNvbnN0cnVjdG9yPXR9Zm9yKHZhciBpIGluIGUpbyhlLGkpJiYodFtpXT1lW2ldKTtyZXR1cm4gbi5wcm90b3R5cGU9ZS5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IG4sdC5fX3N1cGVyX189ZS5wcm90b3R5cGUsdH12YXIgaCxkLHUsYyxmO3U9ZShcImV2ZW50c1wiLHQpLkV2ZW50RW1pdHRlcixoPWUoXCIvYnJvd3Nlci5jb2ZmZWVcIix0KSxmPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCl7dmFyIGUsbjt0aGlzLnJ1bm5pbmc9ITEsdGhpcy5vcHRpb25zPXt9LHRoaXMuZnJhbWVzPVtdLHRoaXMuZnJlZVdvcmtlcnM9W10sdGhpcy5hY3RpdmVXb3JrZXJzPVtdLHRoaXMuc2V0T3B0aW9ucyh0KTtmb3IoZSBpbiBkKW49ZFtlXSxudWxsIT10aGlzLm9wdGlvbnNbZV0/dGhpcy5vcHRpb25zW2VdOnRoaXMub3B0aW9uc1tlXT1ufXJldHVybiBzKGUsdCksZD17d29ya2VyU2NyaXB0OlwiZ2lmLndvcmtlci5qc1wiLHdvcmtlcnM6MixyZXBlYXQ6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHF1YWxpdHk6MTAsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCx0cmFuc3BhcmVudDpudWxsfSxjPXtkZWxheTo1MDAsY29weTohMX0sZS5wcm90b3R5cGUuc2V0T3B0aW9uPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMub3B0aW9uc1t0XT1lLG51bGw9PXRoaXMuX2NhbnZhc3x8XCJ3aWR0aFwiIT09dCYmXCJoZWlnaHRcIiE9PXQ/dm9pZCAwOnRoaXMuX2NhbnZhc1t0XT1lfSxlLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKHQpe3ZhciBlLG47cmV0dXJuIGZ1bmN0aW9uKGkpe2ZvcihlIGluIHQpbyh0LGUpJiYobj10W2VdLGkucHVzaCh0aGlzLnNldE9wdGlvbihlLG4pKSk7cmV0dXJuIGl9LmNhbGwodGhpcyxbXSl9LGUucHJvdG90eXBlLmFkZEZyYW1lPWZ1bmN0aW9uKHQsZSl7dmFyIG4saTtudWxsPT1lJiYoZT17fSksbj17fSxuLnRyYW5zcGFyZW50PXRoaXMub3B0aW9ucy50cmFuc3BhcmVudDtmb3IoaSBpbiBjKW5baV09ZVtpXXx8Y1tpXTtpZihudWxsIT10aGlzLm9wdGlvbnMud2lkdGh8fHRoaXMuc2V0T3B0aW9uKFwid2lkdGhcIix0LndpZHRoKSxudWxsIT10aGlzLm9wdGlvbnMuaGVpZ2h0fHx0aGlzLnNldE9wdGlvbihcImhlaWdodFwiLHQuaGVpZ2h0KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgSW1hZ2VEYXRhJiZudWxsIT1JbWFnZURhdGEmJnQgaW5zdGFuY2VvZiBJbWFnZURhdGEpbi5kYXRhPXQuZGF0YTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQmJm51bGwhPUNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCYmdCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCYmbnVsbCE9V2ViR0xSZW5kZXJpbmdDb250ZXh0JiZ0IGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KWUuY29weT9uLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YSh0KTpuLmNvbnRleHQ9dDtlbHNle2lmKG51bGw9PXQuY2hpbGROb2Rlcyl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGltYWdlXCIpO2UuY29weT9uLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEodCk6bi5pbWFnZT10fXJldHVybiB0aGlzLmZyYW1lcy5wdXNoKG4pfSxlLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgdCxlO2lmKHRoaXMucnVubmluZyl0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IHJ1bm5pbmdcIik7aWYobnVsbD09dGhpcy5vcHRpb25zLndpZHRofHxudWxsPT10aGlzLm9wdGlvbnMuaGVpZ2h0KXRocm93IG5ldyBFcnJvcihcIldpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nXCIpO3RoaXMucnVubmluZz0hMCx0aGlzLm5leHRGcmFtZT0wLHRoaXMuZmluaXNoZWRGcmFtZXM9MCx0aGlzLmltYWdlUGFydHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciBuPWZ1bmN0aW9uKCl7dmFyIHQ7dD1bXTtmb3IodmFyIGU9MDswPD10aGlzLmZyYW1lcy5sZW5ndGg/ZTx0aGlzLmZyYW1lcy5sZW5ndGg6ZT50aGlzLmZyYW1lcy5sZW5ndGg7MDw9dGhpcy5mcmFtZXMubGVuZ3RoPysrZTotLWUpdC5wdXNoKGUpO3JldHVybiB0fS5hcHBseSh0aGlzLGFyZ3VtZW50cyksaT0wLHI9bi5sZW5ndGg7aTxyOysraSl0PW5baV0sZS5wdXNoKG51bGwpO3JldHVybiBlfS5jYWxsKHRoaXMsW10pLGU9dGhpcy5zcGF3bldvcmtlcnMoKTtmb3IodmFyIG49ZnVuY3Rpb24oKXt2YXIgdDt0PVtdO2Zvcih2YXIgbj0wOzA8PWU/bjxlOm4+ZTswPD1lPysrbjotLW4pdC5wdXNoKG4pO3JldHVybiB0fS5hcHBseSh0aGlzLGFyZ3VtZW50cyksaT0wLHI9bi5sZW5ndGg7aTxyOysraSl0PW5baV0sdGhpcy5yZW5kZXJOZXh0RnJhbWUoKTtyZXR1cm4gdGhpcy5lbWl0KFwic3RhcnRcIiksdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIiwwKX0sZS5wcm90b3R5cGUuYWJvcnQ9ZnVuY3Rpb24oKXtmb3IodmFyIHQ7Oyl7aWYodD10aGlzLmFjdGl2ZVdvcmtlcnMuc2hpZnQoKSwhKG51bGwhPXQpKWJyZWFrO2NvbnNvbGUubG9nKFwia2lsbGluZyBhY3RpdmUgd29ya2VyXCIpLHQudGVybWluYXRlKCl9cmV0dXJuIHRoaXMucnVubmluZz0hMSx0aGlzLmVtaXQoXCJhYm9ydFwiKX0sZS5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzPWZ1bmN0aW9uKCl7dmFyIHQ7cmV0dXJuIHQ9TWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsdGhpcy5mcmFtZXMubGVuZ3RoKSxmdW5jdGlvbigpe3ZhciBlO2U9W107Zm9yKHZhciBuPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoO3RoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPD10P248dDpuPnQ7dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg8PXQ/KytuOi0tbillLnB1c2gobik7cmV0dXJuIGV9LmFwcGx5KHRoaXMsYXJndW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgbjtyZXR1cm4gY29uc29sZS5sb2coXCJzcGF3bmluZyB3b3JrZXIgXCIrZSksbj1uZXcgV29ya2VyKHQub3B0aW9ucy53b3JrZXJTY3JpcHQpLG4ub25tZXNzYWdlPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdC5hY3RpdmVXb3JrZXJzLnNwbGljZSh0LmFjdGl2ZVdvcmtlcnMuaW5kZXhPZihuKSwxKSx0LmZyZWVXb3JrZXJzLnB1c2gobiksdC5mcmFtZUZpbmlzaGVkKGUuZGF0YSl9fSh0KSx0LmZyZWVXb3JrZXJzLnB1c2gobil9fSh0aGlzKSksdH0sZS5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZD1mdW5jdGlvbih0KXtyZXR1cm4gY29uc29sZS5sb2coXCJmcmFtZSBcIit0LmluZGV4K1wiIGZpbmlzaGVkIC0gXCIrdGhpcy5hY3RpdmVXb3JrZXJzLmxlbmd0aCtcIiBhY3RpdmVcIiksdGhpcy5maW5pc2hlZEZyYW1lcysrLHRoaXMuZW1pdChcInByb2dyZXNzXCIsdGhpcy5maW5pc2hlZEZyYW1lcy90aGlzLmZyYW1lcy5sZW5ndGgpLHRoaXMuaW1hZ2VQYXJ0c1t0LmluZGV4XT10LGEobnVsbCx0aGlzLmltYWdlUGFydHMpP3RoaXMucmVuZGVyTmV4dEZyYW1lKCk6dGhpcy5maW5pc2hSZW5kZXJpbmcoKX0sZS5wcm90b3R5cGUuZmluaXNoUmVuZGVyaW5nPWZ1bmN0aW9uKCl7dmFyIHQsZSxuLGkscixvLGE7cj0wO2Zvcih2YXIgcz0wLGg9dGhpcy5pbWFnZVBhcnRzLmxlbmd0aDtzPGg7KytzKWU9dGhpcy5pbWFnZVBhcnRzW3NdLHIrPShlLmRhdGEubGVuZ3RoLTEpKmUucGFnZVNpemUrZS5jdXJzb3I7cis9ZS5wYWdlU2l6ZS1lLmN1cnNvcixjb25zb2xlLmxvZyhcInJlbmRlcmluZyBmaW5pc2hlZCAtIGZpbGVzaXplIFwiK01hdGgucm91bmQoci8xZTMpK1wia2JcIiksdD1uZXcgVWludDhBcnJheShyKSxvPTA7Zm9yKHZhciBkPTAsdT10aGlzLmltYWdlUGFydHMubGVuZ3RoO2Q8dTsrK2Qpe2U9dGhpcy5pbWFnZVBhcnRzW2RdO2Zvcih2YXIgYz0wLGY9ZS5kYXRhLmxlbmd0aDtjPGY7KytjKWE9ZS5kYXRhW2NdLG49Yyx0LnNldChhLG8pLG8rPW49PT1lLmRhdGEubGVuZ3RoLTE/ZS5jdXJzb3I6ZS5wYWdlU2l6ZX1yZXR1cm4gaT1uZXcgQmxvYihbdF0se3R5cGU6XCJpbWFnZS9naWZcIn0pLHRoaXMuZW1pdChcImZpbmlzaGVkXCIsaSx0KX0sZS5wcm90b3R5cGUucmVuZGVyTmV4dEZyYW1lPWZ1bmN0aW9uKCl7dmFyIHQsZSxuO2lmKDA9PT10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIHdvcmtlcnNcIik7cmV0dXJuIHRoaXMubmV4dEZyYW1lPj10aGlzLmZyYW1lcy5sZW5ndGg/dm9pZCAwOih0PXRoaXMuZnJhbWVzW3RoaXMubmV4dEZyYW1lKytdLG49dGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpLGU9dGhpcy5nZXRUYXNrKHQpLGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZnJhbWUgXCIrKGUuaW5kZXgrMSkrXCIgb2YgXCIrdGhpcy5mcmFtZXMubGVuZ3RoKSx0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaChuKSxuLnBvc3RNZXNzYWdlKGUpKX0sZS5wcm90b3R5cGUuZ2V0Q29udGV4dERhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZ2V0SW1hZ2VEYXRhKDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCkuZGF0YX0sZS5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBudWxsIT10aGlzLl9jYW52YXN8fCh0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLl9jYW52YXMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoLHRoaXMuX2NhbnZhcy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodCksZT10aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLGUuc2V0RmlsbD10aGlzLm9wdGlvbnMuYmFja2dyb3VuZCxlLmZpbGxSZWN0KDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCksZS5kcmF3SW1hZ2UodCwwLDApLHRoaXMuZ2V0Q29udGV4dERhdGEoZSl9LGUucHJvdG90eXBlLmdldFRhc2s9ZnVuY3Rpb24odCl7dmFyIGUsbjtpZihlPXRoaXMuZnJhbWVzLmluZGV4T2YodCksbj17aW5kZXg6ZSxsYXN0OmU9PT10aGlzLmZyYW1lcy5sZW5ndGgtMSxkZWxheTp0LmRlbGF5LHRyYW5zcGFyZW50OnQudHJhbnNwYXJlbnQsd2lkdGg6dGhpcy5vcHRpb25zLndpZHRoLGhlaWdodDp0aGlzLm9wdGlvbnMuaGVpZ2h0LHF1YWxpdHk6dGhpcy5vcHRpb25zLnF1YWxpdHkscmVwZWF0OnRoaXMub3B0aW9ucy5yZXBlYXQsY2FuVHJhbnNmZXI6XCJjaHJvbWVcIj09PWgubmFtZX0sbnVsbCE9dC5kYXRhKW4uZGF0YT10LmRhdGE7ZWxzZSBpZihudWxsIT10LmNvbnRleHQpbi5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEodC5jb250ZXh0KTtlbHNle2lmKG51bGw9PXQuaW1hZ2UpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmcmFtZVwiKTtuLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEodC5pbWFnZSl9cmV0dXJuIG59LGV9KHUpLHQuZXhwb3J0cz1mfSksZS5kZWZpbmUoXCIvYnJvd3Nlci5jb2ZmZWVcIixmdW5jdGlvbih0LGUsbixpKXt2YXIgcixvLGEscyxoO3M9bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLGE9bmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksaD1zLm1hdGNoKC8ob3BlcmF8aWV8ZmlyZWZveHxjaHJvbWV8dmVyc2lvbilbXFxzXFwvOl0oW1xcd1xcZFxcLl0rKT8uKj8oc2FmYXJpfHZlcnNpb25bXFxzXFwvOl0oW1xcd1xcZFxcLl0rKXwkKS8pfHxbbnVsbCxcInVua25vd25cIiwwXSxvPVwiaWVcIj09PWhbMV0mJmRvY3VtZW50LmRvY3VtZW50TW9kZSxyPXtuYW1lOlwidmVyc2lvblwiPT09aFsxXT9oWzNdOmhbMV0sdmVyc2lvbjpvfHxwYXJzZUZsb2F0KFwib3BlcmFcIj09PWhbMV0mJmhbNF0/aFs0XTpoWzJdKSxwbGF0Zm9ybTp7bmFtZTpzLm1hdGNoKC9pcCg/OmFkfG9kfGhvbmUpLyk/XCJpb3NcIjoocy5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKXx8YS5tYXRjaCgvbWFjfHdpbnxsaW51eC8pfHxbXCJvdGhlclwiXSlbMF19fSxyW3IubmFtZV09ITAscltyLm5hbWUrcGFyc2VJbnQoci52ZXJzaW9uLDEwKV09ITAsci5wbGF0Zm9ybVtyLnBsYXRmb3JtLm5hbWVdPSEwLHQuZXhwb3J0cz1yfSksZS5kZWZpbmUoXCJldmVudHNcIixmdW5jdGlvbih0LGUsaSxyKXtuLkV2ZW50RW1pdHRlcnx8KG4uRXZlbnRFbWl0dGVyPWZ1bmN0aW9uKCl7fSk7dmFyIG89ZS5FdmVudEVtaXR0ZXI9bi5FdmVudEVtaXR0ZXIsYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5pc0FycmF5P0FycmF5LmlzQXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpfSxzPTEwO28ucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbih0KXt0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pLHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM9dH0sby5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0KXtpZihcImVycm9yXCI9PT10JiYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50cy5lcnJvcnx8YSh0aGlzLl9ldmVudHMuZXJyb3IpJiYhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpdGhyb3cgYXJndW1lbnRzWzFdaW5zdGFuY2VvZiBFcnJvcj9hcmd1bWVudHNbMV06bmV3IEVycm9yKFwiVW5jYXVnaHQsIHVuc3BlY2lmaWVkICdlcnJvcicgZXZlbnQuXCIpO2lmKCF0aGlzLl9ldmVudHMpcmV0dXJuITE7dmFyIGU9dGhpcy5fZXZlbnRzW3RdO2lmKCFlKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpe2lmKGEoZSkpe2Zvcih2YXIgbj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSksaT1lLnNsaWNlKCkscj0wLG89aS5sZW5ndGg7cjxvO3IrKylpW3JdLmFwcGx5KHRoaXMsbik7cmV0dXJuITB9cmV0dXJuITF9c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTplLmNhbGwodGhpcyk7YnJlYWs7Y2FzZSAyOmUuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmUuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2RlZmF1bHQ6dmFyIG49QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2UuYXBwbHkodGhpcyxuKX1yZXR1cm4hMH0sby5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImFkZExpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uXCIpO2lmKHRoaXMuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz17fSksdGhpcy5lbWl0KFwibmV3TGlzdGVuZXJcIix0LGUpLHRoaXMuX2V2ZW50c1t0XSlpZihhKHRoaXMuX2V2ZW50c1t0XSkpe2lmKCF0aGlzLl9ldmVudHNbdF0ud2FybmVkKXt2YXIgbjtuPXZvaWQgMCE9PXRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM/dGhpcy5fZXZlbnRzLm1heExpc3RlbmVyczpzLG4mJm4+MCYmdGhpcy5fZXZlbnRzW3RdLmxlbmd0aD5uJiYodGhpcy5fZXZlbnRzW3RdLndhcm5lZD0hMCxjb25zb2xlLmVycm9yKFwiKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC5cIix0aGlzLl9ldmVudHNbdF0ubGVuZ3RoKSxjb25zb2xlLnRyYWNlKCkpfXRoaXMuX2V2ZW50c1t0XS5wdXNoKGUpfWVsc2UgdGhpcy5fZXZlbnRzW3RdPVt0aGlzLl9ldmVudHNbdF0sZV07ZWxzZSB0aGlzLl9ldmVudHNbdF09ZTtyZXR1cm4gdGhpc30sby5wcm90b3R5cGUub249by5wcm90b3R5cGUuYWRkTGlzdGVuZXIsby5wcm90b3R5cGUub25jZT1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXM7cmV0dXJuIG4ub24odCxmdW5jdGlvbiBpKCl7bi5yZW1vdmVMaXN0ZW5lcih0LGkpLGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSksdGhpc30sby5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcInJlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdF0pcmV0dXJuIHRoaXM7dmFyIG49dGhpcy5fZXZlbnRzW3RdO2lmKGEobikpe3ZhciBpPW4uaW5kZXhPZihlKTtpZihpPDApcmV0dXJuIHRoaXM7bi5zcGxpY2UoaSwxKSwwPT1uLmxlbmd0aCYmZGVsZXRlIHRoaXMuX2V2ZW50c1t0XX1lbHNlIHRoaXMuX2V2ZW50c1t0XT09PWUmJmRlbGV0ZSB0aGlzLl9ldmVudHNbdF07cmV0dXJuIHRoaXN9LG8ucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHNbdF0mJih0aGlzLl9ldmVudHNbdF09bnVsbCksdGhpc30sby5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pLHRoaXMuX2V2ZW50c1t0XXx8KHRoaXMuX2V2ZW50c1t0XT1bXSksYSh0aGlzLl9ldmVudHNbdF0pfHwodGhpcy5fZXZlbnRzW3RdPVt0aGlzLl9ldmVudHNbdF1dKSx0aGlzLl9ldmVudHNbdF19fSksdC5HSUY9ZShcIi9naWYuY29mZmVlXCIpfS5jYWxsKHRoaXMsdGhpcyksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3JldHVybiB0JiZ0Lk9iamVjdD09PU9iamVjdD90Om51bGx9ZnVuY3Rpb24gZSh0KXtyZXR1cm4gU3RyaW5nKFwiMDAwMDAwMFwiK3QpLnNsaWNlKC03KX1mdW5jdGlvbiBuKCl7ZnVuY3Rpb24gdCgpe3JldHVybiBNYXRoLmZsb29yKDY1NTM2KigxK01hdGgucmFuZG9tKCkpKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfXJldHVybiB0KCkrdCgpK1wiLVwiK3QoKStcIi1cIit0KCkrXCItXCIrdCgpK1wiLVwiK3QoKSt0KCkrdCgpfWZ1bmN0aW9uIGkodCl7dmFyIGU9e307dGhpcy5zZXR0aW5ncz10LHRoaXMub249ZnVuY3Rpb24odCxuKXtlW3RdPW59LHRoaXMuZW1pdD1mdW5jdGlvbih0KXt2YXIgbj1lW3RdO24mJm4uYXBwbHkobnVsbCxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfSx0aGlzLmZpbGVuYW1lPXQubmFtZXx8bigpLHRoaXMuZXh0ZW5zaW9uPVwiXCIsdGhpcy5taW1lVHlwZT1cIlwifWZ1bmN0aW9uIHIodCl7aS5jYWxsKHRoaXMsdCksdGhpcy5leHRlbnNpb249XCIudGFyXCIsdGhpcy5taW1lVHlwZT1cImFwcGxpY2F0aW9uL3gtdGFyXCIsdGhpcy5maWxlRXh0ZW5zaW9uPVwiXCIsdGhpcy50YXBlPW51bGwsdGhpcy5jb3VudD0wfWZ1bmN0aW9uIG8odCl7ci5jYWxsKHRoaXMsdCksdGhpcy50eXBlPVwiaW1hZ2UvcG5nXCIsdGhpcy5maWxlRXh0ZW5zaW9uPVwiLnBuZ1wifWZ1bmN0aW9uIGEodCl7ci5jYWxsKHRoaXMsdCksdGhpcy50eXBlPVwiaW1hZ2UvanBlZ1wiLHRoaXMuZmlsZUV4dGVuc2lvbj1cIi5qcGdcIix0aGlzLnF1YWxpdHk9dC5xdWFsaXR5LzEwMHx8Ljh9ZnVuY3Rpb24gcyh0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1wiaW1hZ2Uvd2VicFwiIT09ZS50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLnN1YnN0cig1LDEwKSYmY29uc29sZS5sb2coXCJXZWJQIG5vdCBzdXBwb3J0ZWQgLSB0cnkgYW5vdGhlciBleHBvcnQgZm9ybWF0XCIpLGkuY2FsbCh0aGlzLHQpLHRoaXMucXVhbGl0eT10LnF1YWxpdHkvMTAwfHwuOCx0aGlzLmV4dGVuc2lvbj1cIi53ZWJtXCIsdGhpcy5taW1lVHlwZT1cInZpZGVvL3dlYm1cIix0aGlzLmJhc2VGaWxlbmFtZT10aGlzLmZpbGVuYW1lLHRoaXMuZnJhbWVzPVtdLHRoaXMucGFydD0xfWZ1bmN0aW9uIGgodCl7aS5jYWxsKHRoaXMsdCksdC5xdWFsaXR5PXQucXVhbGl0eS8xMDB8fC44LHRoaXMuZW5jb2Rlcj1uZXcgRkZNcGVnU2VydmVyLlZpZGVvKHQpLHRoaXMuZW5jb2Rlci5vbihcInByb2Nlc3NcIixmdW5jdGlvbigpe3RoaXMuZW1pdChcInByb2Nlc3NcIil9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcImZpbmlzaGVkXCIsZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLmNhbGxiYWNrO24mJih0aGlzLmNhbGxiYWNrPXZvaWQgMCxuKHQsZSkpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJwcm9ncmVzc1wiLGZ1bmN0aW9uKHQpe3RoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyYmdGhpcy5zZXR0aW5ncy5vblByb2dyZXNzKHQpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2FsZXJ0KEpTT04uc3RyaW5naWZ5KHQsbnVsbCwyKSl9LmJpbmQodGhpcykpfWZ1bmN0aW9uIGQodCl7aS5jYWxsKHRoaXMsdCksdGhpcy5mcmFtZXJhdGU9dGhpcy5zZXR0aW5ncy5mcmFtZXJhdGUsdGhpcy50eXBlPVwidmlkZW8vd2VibVwiLHRoaXMuZXh0ZW5zaW9uPVwiLndlYm1cIix0aGlzLnN0cmVhbT1udWxsLHRoaXMubWVkaWFSZWNvcmRlcj1udWxsLHRoaXMuY2h1bmtzPVtdfWZ1bmN0aW9uIHUodCl7aS5jYWxsKHRoaXMsdCksdC5xdWFsaXR5PTMxLSgzMCp0LnF1YWxpdHkvMTAwfHwxMCksdC53b3JrZXJzPXQud29ya2Vyc3x8NCx0aGlzLmV4dGVuc2lvbj1cIi5naWZcIix0aGlzLm1pbWVUeXBlPVwiaW1hZ2UvZ2lmXCIsdGhpcy5jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLmN0eD10aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksdGhpcy5zaXplU2V0PSExLHRoaXMuZW5jb2Rlcj1uZXcgR0lGKHt3b3JrZXJzOnQud29ya2VycyxxdWFsaXR5OnQucXVhbGl0eSx3b3JrZXJTY3JpcHQ6dC53b3JrZXJzUGF0aCtcImdpZi53b3JrZXIuanNcIn0pLHRoaXMuZW5jb2Rlci5vbihcInByb2dyZXNzXCIsZnVuY3Rpb24odCl7dGhpcy5zZXR0aW5ncy5vblByb2dyZXNzJiZ0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3ModCl9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcImZpbmlzaGVkXCIsZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5jYWxsYmFjaztlJiYodGhpcy5jYWxsYmFjaz12b2lkIDAsZSh0KSl9LmJpbmQodGhpcykpfWZ1bmN0aW9uIGModCl7ZnVuY3Rpb24gZSgpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gdGhpcy5faG9va2VkfHwodGhpcy5faG9va2VkPSEwLHRoaXMuX2hvb2tlZFRpbWU9dGhpcy5jdXJyZW50VGltZXx8MCx0aGlzLnBhdXNlKCksbnQucHVzaCh0aGlzKSksdGhpcy5faG9va2VkVGltZStTLnN0YXJ0VGltZX1iKFwiQ2FwdHVyZXIgc3RhcnRcIiksQT13aW5kb3cuRGF0ZS5ub3coKSxMPUErUy5zdGFydFRpbWUsST13aW5kb3cucGVyZm9ybWFuY2Uubm93KCksRT1JK1Muc3RhcnRUaW1lLHdpbmRvdy5EYXRlLnByb3RvdHlwZS5nZXRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIEx9LHdpbmRvdy5EYXRlLm5vdz1mdW5jdGlvbigpe3JldHVybiBMfSx3aW5kb3cuc2V0VGltZW91dD1mdW5jdGlvbih0LGUpe3ZhciBuPXtjYWxsYmFjazp0LHRpbWU6ZSx0cmlnZ2VyVGltZTpMK2V9O3JldHVybiBCLnB1c2gobiksYihcIlRpbWVvdXQgc2V0IHRvIFwiK24udGltZSksbn0sd2luZG93LmNsZWFyVGltZW91dD1mdW5jdGlvbih0KXtmb3IodmFyIGU9MDtlPEIubGVuZ3RoO2UrKylCW2VdIT10fHwoQi5zcGxpY2UoZSwxKSxiKFwiVGltZW91dCBjbGVhcmVkXCIpKX0sd2luZG93LnNldEludGVydmFsPWZ1bmN0aW9uKHQsZSl7dmFyIG49e2NhbGxiYWNrOnQsdGltZTplLHRyaWdnZXJUaW1lOkwrZX07cmV0dXJuIGoucHVzaChuKSxiKFwiSW50ZXJ2YWwgc2V0IHRvIFwiK24udGltZSksbn0sd2luZG93LmNsZWFySW50ZXJ2YWw9ZnVuY3Rpb24odCl7cmV0dXJuIGIoXCJjbGVhciBJbnRlcnZhbFwiKSxudWxsfSx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKHQpe1UucHVzaCh0KX0sd2luZG93LnBlcmZvcm1hbmNlLm5vdz1mdW5jdGlvbigpe3JldHVybiBFfTt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxWaWRlb0VsZW1lbnQucHJvdG90eXBlLFwiY3VycmVudFRpbWVcIix7Z2V0OnR9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEF1ZGlvRWxlbWVudC5wcm90b3R5cGUsXCJjdXJyZW50VGltZVwiLHtnZXQ6dH0pfWNhdGNoKHQpe2IodCl9fWZ1bmN0aW9uIG4oKXtlKCksRC5zdGFydCgpLE09ITB9ZnVuY3Rpb24gaSgpe009ITEsRC5zdG9wKCksZigpfWZ1bmN0aW9uIHIodCxlKXtaKHQsMCxlKX1mdW5jdGlvbiBjKCl7cih2KX1mdW5jdGlvbiBmKCl7YihcIkNhcHR1cmVyIHN0b3BcIiksd2luZG93LnNldFRpbWVvdXQ9Wix3aW5kb3cuc2V0SW50ZXJ2YWw9Six3aW5kb3cuY2xlYXJJbnRlcnZhbD1ZLHdpbmRvdy5jbGVhclRpbWVvdXQ9JCx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPVEsd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWU9ZXQsd2luZG93LkRhdGUubm93PVgsd2luZG93LnBlcmZvcm1hbmNlLm5vdz10dH1mdW5jdGlvbiBsKCl7dmFyIHQ9Ui9TLmZyYW1lcmF0ZTsoUy5mcmFtZUxpbWl0JiZSPj1TLmZyYW1lTGltaXR8fFMudGltZUxpbWl0JiZ0Pj1TLnRpbWVMaW1pdCkmJihpKCkseSgpKTt2YXIgZT1uZXcgRGF0ZShudWxsKTtlLnNldFNlY29uZHModCksUy5tb3Rpb25CbHVyRnJhbWVzPjI/UC50ZXh0Q29udGVudD1cIkNDYXB0dXJlIFwiK1MuZm9ybWF0K1wiIHwgXCIrUitcIiBmcmFtZXMgKFwiK08rXCIgaW50ZXIpIHwgXCIrZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSw4KTpQLnRleHRDb250ZW50PVwiQ0NhcHR1cmUgXCIrUy5mb3JtYXQrXCIgfCBcIitSK1wiIGZyYW1lcyB8IFwiK2UudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsOCl9ZnVuY3Rpb24gcCh0KXtOLndpZHRoPT09dC53aWR0aCYmTi5oZWlnaHQ9PT10LmhlaWdodHx8KE4ud2lkdGg9dC53aWR0aCxOLmhlaWdodD10LmhlaWdodCxxPW5ldyBVaW50MTZBcnJheShOLmhlaWdodCpOLndpZHRoKjQpLFYuZmlsbFN0eWxlPVwiIzBcIixWLmZpbGxSZWN0KDAsMCxOLndpZHRoLE4uaGVpZ2h0KSl9ZnVuY3Rpb24gbSh0KXtWLmRyYXdJbWFnZSh0LDAsMCksej1WLmdldEltYWdlRGF0YSgwLDAsTi53aWR0aCxOLmhlaWdodCk7Zm9yKHZhciBlPTA7ZTxxLmxlbmd0aDtlKz00KXFbZV0rPXouZGF0YVtlXSxxW2UrMV0rPXouZGF0YVtlKzFdLHFbZSsyXSs9ei5kYXRhW2UrMl07TysrfWZ1bmN0aW9uIGcoKXtmb3IodmFyIHQ9ei5kYXRhLGU9MDtlPHEubGVuZ3RoO2UrPTQpdFtlXT0yKnFbZV0vUy5tb3Rpb25CbHVyRnJhbWVzLHRbZSsxXT0yKnFbZSsxXS9TLm1vdGlvbkJsdXJGcmFtZXMsdFtlKzJdPTIqcVtlKzJdL1MubW90aW9uQmx1ckZyYW1lcztWLnB1dEltYWdlRGF0YSh6LDAsMCksRC5hZGQoTiksUisrLE89MCxiKFwiRnVsbCBNQiBGcmFtZSEgXCIrUitcIiBcIitMKTtmb3IodmFyIGU9MDtlPHEubGVuZ3RoO2UrPTQpcVtlXT0wLHFbZSsxXT0wLHFbZSsyXT0wO2djKCl9ZnVuY3Rpb24gdyh0KXtNJiYoUy5tb3Rpb25CbHVyRnJhbWVzPjI/KHAodCksbSh0KSxPPj0uNSpTLm1vdGlvbkJsdXJGcmFtZXM/ZygpOmMoKSk6KEQuYWRkKHQpLFIrKyxiKFwiRnVsbCBGcmFtZSEgXCIrUikpKX1mdW5jdGlvbiB2KCl7dmFyIHQ9MWUzL1MuZnJhbWVyYXRlLGU9KFIrTy9TLm1vdGlvbkJsdXJGcmFtZXMpKnQ7TD1BK2UsRT1JK2UsbnQuZm9yRWFjaChmdW5jdGlvbih0KXt0Ll9ob29rZWRUaW1lPWUvMWUzfSksbCgpLGIoXCJGcmFtZTogXCIrUitcIiBcIitPKTtmb3IodmFyIG49MDtuPEIubGVuZ3RoO24rKylMPj1CW25dLnRyaWdnZXJUaW1lJiYocihCW25dLmNhbGxiYWNrKSxCLnNwbGljZShuLDEpKTtmb3IodmFyIG49MDtuPGoubGVuZ3RoO24rKylMPj1qW25dLnRyaWdnZXJUaW1lJiYocihqW25dLmNhbGxiYWNrKSxqW25dLnRyaWdnZXJUaW1lKz1qW25dLnRpbWUpO1UuZm9yRWFjaChmdW5jdGlvbih0KXtyKHQsTC1rKX0pLFU9W119ZnVuY3Rpb24geSh0KXt0fHwodD1mdW5jdGlvbih0KXtyZXR1cm4gZG93bmxvYWQodCxELmZpbGVuYW1lK0QuZXh0ZW5zaW9uLEQubWltZVR5cGUpLCExfSksRC5zYXZlKHQpfWZ1bmN0aW9uIGIodCl7XyYmY29uc29sZS5sb2codCl9ZnVuY3Rpb24geCh0LGUpe1dbdF09ZX1mdW5jdGlvbiBUKHQpe3ZhciBlPVdbdF07ZSYmZS5hcHBseShudWxsLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSl9ZnVuY3Rpb24gQyh0KXtUKFwicHJvZ3Jlc3NcIix0KX12YXIgXyxGLEwsQSxFLEksYyxELFM9dHx8e30sQj0obmV3IERhdGUsW10pLGo9W10sUj0wLE89MCxVPVtdLE09ITEsVz17fTtTLmZyYW1lcmF0ZT1TLmZyYW1lcmF0ZXx8NjAsUy5tb3Rpb25CbHVyRnJhbWVzPTIqKFMubW90aW9uQmx1ckZyYW1lc3x8MSksXz1TLnZlcmJvc2V8fCExLEY9Uy5kaXNwbGF5fHwhMSxTLnN0ZXA9MWUzL1MuZnJhbWVyYXRlLFMudGltZUxpbWl0PVMudGltZUxpbWl0fHwwLFMuZnJhbWVMaW1pdD1TLmZyYW1lTGltaXR8fDAsUy5zdGFydFRpbWU9Uy5zdGFydFRpbWV8fDA7dmFyIFA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtQLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixQLnN0eWxlLmxlZnQ9UC5zdHlsZS50b3A9MCxQLnN0eWxlLmJhY2tncm91bmRDb2xvcj1cImJsYWNrXCIsUC5zdHlsZS5mb250RmFtaWx5PVwibW9ub3NwYWNlXCIsUC5zdHlsZS5mb250U2l6ZT1cIjExcHhcIixQLnN0eWxlLnBhZGRpbmc9XCI1cHhcIixQLnN0eWxlLmNvbG9yPVwicmVkXCIsUC5zdHlsZS56SW5kZXg9MWU1LFMuZGlzcGxheSYmZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChQKTt2YXIgcSx6LE49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxWPU4uZ2V0Q29udGV4dChcIjJkXCIpO2IoXCJTdGVwIGlzIHNldCB0byBcIitTLnN0ZXArXCJtc1wiKTt2YXIgSD17Z2lmOnUsd2VibTpzLGZmbXBlZ3NlcnZlcjpoLHBuZzpvLGpwZzphLFwid2VibS1tZWRpYXJlY29yZGVyXCI6ZH0sRz1IW1MuZm9ybWF0XTtpZighRyl0aHJvd1wiRXJyb3I6IEluY29ycmVjdCBvciBtaXNzaW5nIGZvcm1hdDogVmFsaWQgZm9ybWF0cyBhcmUgXCIrT2JqZWN0LmtleXMoSCkuam9pbihcIiwgXCIpO2lmKEQ9bmV3IEcoUyksRC5zdGVwPWMsRC5vbihcInByb2Nlc3NcIix2KSxELm9uKFwicHJvZ3Jlc3NcIixDKSxcInBlcmZvcm1hbmNlXCJpbiB3aW5kb3c9PTAmJih3aW5kb3cucGVyZm9ybWFuY2U9e30pLERhdGUubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfSxcIm5vd1wiaW4gd2luZG93LnBlcmZvcm1hbmNlPT0wKXt2YXIgSz1EYXRlLm5vdygpO3BlcmZvcm1hbmNlLnRpbWluZyYmcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCYmKEs9cGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCksd2luZG93LnBlcmZvcm1hbmNlLm5vdz1mdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpLUt9fXZhciBaPXdpbmRvdy5zZXRUaW1lb3V0LEo9d2luZG93LnNldEludGVydmFsLFk9d2luZG93LmNsZWFySW50ZXJ2YWwsJD13aW5kb3cuY2xlYXJUaW1lb3V0LFE9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxYPXdpbmRvdy5EYXRlLm5vdyx0dD13aW5kb3cucGVyZm9ybWFuY2Uubm93LGV0PXdpbmRvdy5EYXRlLnByb3RvdHlwZS5nZXRUaW1lLG50PVtdO3JldHVybntzdGFydDpuLGNhcHR1cmU6dyxzdG9wOmksc2F2ZTp5LG9uOnh9fXZhciBmPXtmdW5jdGlvbjohMCxvYmplY3Q6ITB9LGw9KHBhcnNlRmxvYXQscGFyc2VJbnQsZlt0eXBlb2YgZXhwb3J0c10mJmV4cG9ydHMmJiFleHBvcnRzLm5vZGVUeXBlP2V4cG9ydHM6dm9pZCAwKSxwPWZbdHlwZW9mIG1vZHVsZV0mJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZT9tb2R1bGU6dm9pZCAwLG09cCYmcC5leHBvcnRzPT09bD9sOnZvaWQgMCxnPXQobCYmcCYmXCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsKSx3PXQoZlt0eXBlb2Ygc2VsZl0mJnNlbGYpLHY9dChmW3R5cGVvZiB3aW5kb3ddJiZ3aW5kb3cpLHk9dChmW3R5cGVvZiB0aGlzXSYmdGhpcyksYj1nfHx2IT09KHkmJnkud2luZG93KSYmdnx8d3x8eXx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wiZ2NcImluIHdpbmRvd3x8KHdpbmRvdy5nYz1mdW5jdGlvbigpe30pLEhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS50b0Jsb2J8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUsXCJ0b0Jsb2JcIix7dmFsdWU6ZnVuY3Rpb24odCxlLG4pe2Zvcih2YXIgaT1hdG9iKHRoaXMudG9EYXRhVVJMKGUsbikuc3BsaXQoXCIsXCIpWzFdKSxyPWkubGVuZ3RoLG89bmV3IFVpbnQ4QXJyYXkociksYT0wO2E8cjthKyspb1thXT1pLmNoYXJDb2RlQXQoYSk7dChuZXcgQmxvYihbb10se3R5cGU6ZXx8XCJpbWFnZS9wbmdcIn0pKX19KSxmdW5jdGlvbigpe2lmKFwicGVyZm9ybWFuY2VcImluIHdpbmRvdz09MCYmKHdpbmRvdy5wZXJmb3JtYW5jZT17fSksRGF0ZS5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9LFwibm93XCJpbiB3aW5kb3cucGVyZm9ybWFuY2U9PTApe3ZhciB0PURhdGUubm93KCk7cGVyZm9ybWFuY2UudGltaW5nJiZwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0JiYodD1wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0KSx3aW5kb3cucGVyZm9ybWFuY2Uubm93PWZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCktdH19fSgpO3ZhciBrPXdpbmRvdy5EYXRlLm5vdygpO2kucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQ9ZnVuY3Rpb24oKXtyZXR1cm4hMH0saS5wcm90b3R5cGUuc3RlcD1mdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiU3RlcCBub3Qgc2V0IVwiKX0sci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksci5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmRpc3Bvc2UoKX0sci5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkPWZ1bmN0aW9uKCl7dGhpcy50YXBlLmFwcGVuZChlKHRoaXMuY291bnQpK3RoaXMuZmlsZUV4dGVuc2lvbixuZXcgVWludDhBcnJheShuLnJlc3VsdCkpLHRoaXMuY291bnQrKyx0aGlzLnN0ZXAoKX0uYmluZCh0aGlzKSxuLnJlYWRBc0FycmF5QnVmZmVyKHQpfSxyLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3QodGhpcy50YXBlLnNhdmUoKSl9LHIucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLnRhcGU9bmV3IFRhcix0aGlzLmNvdW50PTB9LG8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0LnRvQmxvYihmdW5jdGlvbih0KXtyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLHQpfS5iaW5kKHRoaXMpLHRoaXMudHlwZSl9LGEucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpLGEucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0LnRvQmxvYihmdW5jdGlvbih0KXtyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLHQpfS5iaW5kKHRoaXMpLHRoaXMudHlwZSx0aGlzLnF1YWxpdHkpfSxzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxzLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbih0KXt0aGlzLmRpc3Bvc2UoKX0scy5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuZnJhbWVzLnB1c2godC50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIsdGhpcy5xdWFsaXR5KSksdGhpcy5zZXR0aW5ncy5hdXRvU2F2ZVRpbWU+MCYmdGhpcy5mcmFtZXMubGVuZ3RoL3RoaXMuc2V0dGluZ3MuZnJhbWVyYXRlPj10aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZT90aGlzLnNhdmUoZnVuY3Rpb24odCl7dGhpcy5maWxlbmFtZT10aGlzLmJhc2VGaWxlbmFtZStcIi1wYXJ0LVwiK2UodGhpcy5wYXJ0KSxkb3dubG9hZCh0LHRoaXMuZmlsZW5hbWUrdGhpcy5leHRlbnNpb24sdGhpcy5taW1lVHlwZSksdGhpcy5kaXNwb3NlKCksdGhpcy5wYXJ0KyssdGhpcy5maWxlbmFtZT10aGlzLmJhc2VGaWxlbmFtZStcIi1wYXJ0LVwiK2UodGhpcy5wYXJ0KSx0aGlzLnN0ZXAoKX0uYmluZCh0aGlzKSk6dGhpcy5zdGVwKCl9LHMucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7aWYodGhpcy5mcmFtZXMubGVuZ3RoKXt2YXIgZT1XaGFtbXkuZnJvbUltYWdlQXJyYXkodGhpcy5mcmFtZXMsdGhpcy5zZXR0aW5ncy5mcmFtZXJhdGUpLG49bmV3IEJsb2IoW2VdLHt0eXBlOlwib2N0ZXQvc3RyZWFtXCJ9KTt0KG4pfX0scy5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbih0KXt0aGlzLmZyYW1lcz1bXX0saC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksaC5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmVuY29kZXIuc3RhcnQodGhpcy5zZXR0aW5ncyl9LGgucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLmVuY29kZXIuYWRkKHQpfSxoLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3RoaXMuY2FsbGJhY2s9dCx0aGlzLmVuY29kZXIuZW5kKCl9LGgucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmNvZGVyLnNhZmVUb1Byb2NlZWQoKX0sZC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksZC5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuc3RyZWFtfHwodGhpcy5zdHJlYW09dC5jYXB0dXJlU3RyZWFtKHRoaXMuZnJhbWVyYXRlKSx0aGlzLm1lZGlhUmVjb3JkZXI9bmV3IE1lZGlhUmVjb3JkZXIodGhpcy5zdHJlYW0pLHRoaXMubWVkaWFSZWNvcmRlci5zdGFydCgpLHRoaXMubWVkaWFSZWNvcmRlci5vbmRhdGFhdmFpbGFibGU9ZnVuY3Rpb24odCl7dGhpcy5jaHVua3MucHVzaCh0LmRhdGEpfS5iaW5kKHRoaXMpKSx0aGlzLnN0ZXAoKX0sZC5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXt0aGlzLm1lZGlhUmVjb3JkZXIub25zdG9wPWZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBCbG9iKHRoaXMuY2h1bmtzLHt0eXBlOlwidmlkZW8vd2VibVwifSk7dGhpcy5jaHVua3M9W10sdChuKX0uYmluZCh0aGlzKSx0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpfSx1LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSx1LnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy5zaXplU2V0fHwodGhpcy5lbmNvZGVyLnNldE9wdGlvbihcIndpZHRoXCIsdC53aWR0aCksdGhpcy5lbmNvZGVyLnNldE9wdGlvbihcImhlaWdodFwiLHQuaGVpZ2h0KSx0aGlzLnNpemVTZXQ9ITApLHRoaXMuY2FudmFzLndpZHRoPXQud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0PXQuaGVpZ2h0LHRoaXMuY3R4LmRyYXdJbWFnZSh0LDAsMCksdGhpcy5lbmNvZGVyLmFkZEZyYW1lKHRoaXMuY3R4LHtjb3B5OiEwLGRlbGF5OnRoaXMuc2V0dGluZ3Muc3RlcH0pLHRoaXMuc3RlcCgpfSx1LnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3RoaXMuY2FsbGJhY2s9dCx0aGlzLmVuY29kZXIucmVuZGVyKCl9LCh2fHx3fHx7fSkuQ0NhcHR1cmU9YyxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJlwib2JqZWN0XCI9PXR5cGVvZiBkZWZpbmUuYW1kJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBjfSk6bCYmcD8obSYmKChwLmV4cG9ydHM9YykuQ0NhcHR1cmU9YyksbC5DQ2FwdHVyZT1jKTpiLkNDYXB0dXJlPWN9KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2NhcHR1cmUuanMvYnVpbGQvQ0NhcHR1cmUuYWxsLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKG1vZHVsZSkge1xyXG5cdGlmKCFtb2R1bGUud2VicGFja1BvbHlmaWxsKSB7XHJcblx0XHRtb2R1bGUuZGVwcmVjYXRlID0gZnVuY3Rpb24oKSB7fTtcclxuXHRcdG1vZHVsZS5wYXRocyA9IFtdO1xyXG5cdFx0Ly8gbW9kdWxlLnBhcmVudCA9IHVuZGVmaW5lZCBieSBkZWZhdWx0XHJcblx0XHRpZighbW9kdWxlLmNoaWxkcmVuKSBtb2R1bGUuY2hpbGRyZW4gPSBbXTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwibG9hZGVkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmw7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJpZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5pO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdG1vZHVsZS53ZWJwYWNrUG9seWZpbGwgPSAxO1xyXG5cdH1cclxuXHRyZXR1cm4gbW9kdWxlO1xyXG59O1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanNcbi8vIG1vZHVsZSBpZCA9IDYxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHZpenBsZXggZnJvbSAnLi4vc3JjL2luZGV4J1xyXG5pbXBvcnQgZml0IGZyb20gJ2NhbnZhcy1maXQnXHJcblxyXG5jb25zdCBkZWZGbnMgPSBbXHJcbiAgW1xyXG4gICAgJzEnLFxyXG4gICAgJ3NpbigxL24oeC8yNTYseS8yNTYsdCkpJyxcclxuICAgICdzaW4oMS9uKHgvMjU2LHkvMjU2LHQtMTAwKSknLFxyXG4gICAgJzEnXHJcbiAgXSxcclxuICBbXHJcbiAgICAnc2luKHNpbih4L3kqdCkqbih4LzI1Nix5LzI1Nix0KjUpKScsXHJcbiAgICAnYWJzKG4oeC81MTIseS81MTIsdCkpJyxcclxuICAgICcxJyxcclxuICAgICcwLjUnXHJcbiAgXSxcclxuICBbXHJcbiAgICAnMScsXHJcbiAgICAnbih4LzI1Nix5LzI1NixuKHgvMjU2LHkvMjU2LHQqMC4xKSoyMCknLFxyXG4gICAgJ2cnLFxyXG4gICAgJzAuMidcclxuICBdLFxyXG4gIFtcclxuICAgICcxJyxcclxuICAgICcwLjUnLFxyXG4gICAgJ3NpbihuKHgvMTI4K3QseS8xMjgsdCkqdCknLFxyXG4gICAgJ2FicyhzaW4oeC8xMjgtdCt5LzEyOCkpJ1xyXG4gIF0sXHJcbl1cclxuY29uc3QgY29uZmlnID0ge1xyXG4gIHRpbWVGYWN0b3I6IDAuNVxyXG59XHJcbmNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpXHJcbmRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoY2FudmFzKVxyXG5cclxudml6cGxleChjYW52YXMsIGRlZkZuc1swXSwgY29uZmlnKVxyXG5mb3IgKGxldCBpID0gMDsgaSA8IGRlZkZucy5sZW5ndGg7IGkrKykge1xyXG4gICQoYCNub2lzZSR7aX1gKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHZpenBsZXgoY2FudmFzLCBkZWZGbnNbaV0sIGNvbmZpZylcclxuICB9KVxyXG59XHJcbiQoJyNnZW4tYnV0dG9uJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgdmFyIGZucyA9IFskKCcjcicpLnZhbHVlLCAkKCcjZycpLnZhbHVlLCAkKCcjYicpLnZhbHVlLCAkKCcjYScpLnZhbHVlXVxyXG4gIGNvbnNvbGUubG9nKGZucylcclxuICB2aXpwbGV4KGNhbnZhcywgZm5zLCBjb25maWcpXHJcbn0pXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBmaXQoY2FudmFzKSwgZmFsc2UpXHJcblxyXG5cclxuY29uc3QgdG9nZ2xlRWxlbSA9ICQoJyNtZW51LXRvZ2dsZScpXHJcbmNvbnN0IG1lbnVFbGVtID0gJCgnI21lbnUnKVxyXG5sZXQgbWVudURpc3BsYXllZCA9IHRydWVcclxudG9nZ2xlRWxlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICBtZW51RWxlbS5zdHlsZS50cmFuc2Zvcm0gPSBtZW51RGlzcGxheWVkID8gJ3RyYW5zbGF0ZSgwcHgsIC0zNjdweCknIDogJ3RyYW5zbGF0ZSgwcHgsIDBweCknXHJcbiAgdG9nZ2xlRWxlbS5zdHlsZS50cmFuc2Zvcm0gPSBtZW51RGlzcGxheWVkID8gJ3JvdGF0ZSgwZGVnKScgOiAncm90YXRlKDE4MGRlZyknXHJcbiAgbWVudURpc3BsYXllZCA9ICFtZW51RGlzcGxheWVkXHJcbn0pXHJcblxyXG5mdW5jdGlvbiAkIChzZWxlY3Rvcikge1xyXG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxyXG59XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vZG9jcy9kZW1vLmpzXG4vLyBtb2R1bGUgaWQgPSA2M1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgc2l6ZSA9IHJlcXVpcmUoJ2VsZW1lbnQtc2l6ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gZml0XG5cbnZhciBzY3JhdGNoID0gbmV3IEZsb2F0MzJBcnJheSgyKVxuXG5mdW5jdGlvbiBmaXQoY2FudmFzLCBwYXJlbnQsIHNjYWxlKSB7XG4gIHZhciBpc1NWRyA9IGNhbnZhcy5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU1ZHJ1xuXG4gIGNhbnZhcy5zdHlsZS5wb3NpdGlvbiA9IGNhbnZhcy5zdHlsZS5wb3NpdGlvbiB8fCAnYWJzb2x1dGUnXG4gIGNhbnZhcy5zdHlsZS50b3AgPSAwXG4gIGNhbnZhcy5zdHlsZS5sZWZ0ID0gMFxuXG4gIHJlc2l6ZS5zY2FsZSAgPSBwYXJzZUZsb2F0KHNjYWxlIHx8IDEpXG4gIHJlc2l6ZS5wYXJlbnQgPSBwYXJlbnRcblxuICByZXR1cm4gcmVzaXplKClcblxuICBmdW5jdGlvbiByZXNpemUoKSB7XG4gICAgdmFyIHAgPSByZXNpemUucGFyZW50IHx8IGNhbnZhcy5wYXJlbnROb2RlXG4gICAgaWYgKHR5cGVvZiBwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICB2YXIgZGltcyAgID0gcChzY3JhdGNoKSB8fCBzY3JhdGNoXG4gICAgICB2YXIgd2lkdGggID0gZGltc1swXVxuICAgICAgdmFyIGhlaWdodCA9IGRpbXNbMV1cbiAgICB9IGVsc2VcbiAgICBpZiAocCAmJiBwICE9PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICB2YXIgcHNpemUgID0gc2l6ZShwKVxuICAgICAgdmFyIHdpZHRoICA9IHBzaXplWzBdfDBcbiAgICAgIHZhciBoZWlnaHQgPSBwc2l6ZVsxXXwwXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB3aWR0aCAgPSB3aW5kb3cuaW5uZXJXaWR0aFxuICAgICAgdmFyIGhlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodFxuICAgIH1cblxuICAgIGlmIChpc1NWRykge1xuICAgICAgY2FudmFzLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCAqIHJlc2l6ZS5zY2FsZSArICdweCcpXG4gICAgICBjYW52YXMuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBoZWlnaHQgKiByZXNpemUuc2NhbGUgKyAncHgnKVxuICAgIH0gZWxzZSB7XG4gICAgICBjYW52YXMud2lkdGggPSB3aWR0aCAqIHJlc2l6ZS5zY2FsZVxuICAgICAgY2FudmFzLmhlaWdodCA9IGhlaWdodCAqIHJlc2l6ZS5zY2FsZVxuICAgIH1cblxuICAgIGNhbnZhcy5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4J1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSBoZWlnaHQgKyAncHgnXG5cbiAgICByZXR1cm4gcmVzaXplXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2NhbnZhcy1maXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDY0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gZ2V0U2l6ZVxuXG5mdW5jdGlvbiBnZXRTaXplKGVsZW1lbnQpIHtcbiAgLy8gSGFuZGxlIGNhc2VzIHdoZXJlIHRoZSBlbGVtZW50IGlzIG5vdCBhbHJlYWR5XG4gIC8vIGF0dGFjaGVkIHRvIHRoZSBET00gYnkgYnJpZWZseSBhcHBlbmRpbmcgaXRcbiAgLy8gdG8gZG9jdW1lbnQuYm9keSwgYW5kIHJlbW92aW5nIGl0IGFnYWluIGxhdGVyLlxuICBpZiAoZWxlbWVudCA9PT0gd2luZG93IHx8IGVsZW1lbnQgPT09IGRvY3VtZW50LmJvZHkpIHtcbiAgICByZXR1cm4gW3dpbmRvdy5pbm5lcldpZHRoLCB3aW5kb3cuaW5uZXJIZWlnaHRdXG4gIH1cblxuICBpZiAoIWVsZW1lbnQucGFyZW50Tm9kZSkge1xuICAgIHZhciB0ZW1wb3JhcnkgPSB0cnVlXG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbGVtZW50KVxuICB9XG5cbiAgdmFyIGJvdW5kcyA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClcbiAgdmFyIHN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudClcbiAgdmFyIGhlaWdodCA9IChib3VuZHMuaGVpZ2h0fDApXG4gICAgKyBwYXJzZShzdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnbWFyZ2luLXRvcCcpKVxuICAgICsgcGFyc2Uoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1ib3R0b20nKSlcbiAgdmFyIHdpZHRoICA9IChib3VuZHMud2lkdGh8MClcbiAgICArIHBhcnNlKHN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdtYXJnaW4tbGVmdCcpKVxuICAgICsgcGFyc2Uoc3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ21hcmdpbi1yaWdodCcpKVxuXG4gIGlmICh0ZW1wb3JhcnkpIHtcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGVsZW1lbnQpXG4gIH1cblxuICByZXR1cm4gW3dpZHRoLCBoZWlnaHRdXG59XG5cbmZ1bmN0aW9uIHBhcnNlKHByb3ApIHtcbiAgcmV0dXJuIHBhcnNlRmxvYXQocHJvcCkgfHwgMFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZWxlbWVudC1zaXplL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA2NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9