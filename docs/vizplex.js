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
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
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
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var vizplex = __webpack_require__(7)


/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWViNjM3Y2Y4MzNmNDExYjIxMzMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9HTEVycm9yLmpzIiwid2VicGFjazovLy8uL3NyYy9lcVBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9yZWZsZWN0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi9kby1iaW5kLmpzIiwid2VicGFjazovLy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVydC5nbHNsIiwid2VicGFjazovLy8uL3NyYy9mcmFnLmdsc2wiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jbGVhci9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29udGV4dC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmFmLWNvbXBvbmVudC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS11bmlmb3Jtcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9jcmVhdGUtYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9zaGFkZXItY2FjaGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWZvcm1hdC1jb21waWxlci1lcnJvci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvc3ByaW50Zi1qcy9zcmMvc3ByaW50Zi5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzL2xvb2t1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzLzEuMC9udW1iZXJzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXNoYWRlci1uYW1lL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvb3BlcmF0b3JzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMtMzAwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9idWlsdGlucy0zMDBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXRvYi1saXRlL2F0b2ItYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYWRkLWxpbmUtbnVtYmVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2NyZWF0ZS1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2hpZGRlbi1zdG9yZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9ydW50aW1lLXJlZmxlY3QuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1yZXNldC9zdGF0ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmlnaHQtbm93L2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWFrLW1hcC93ZWFrLW1hcC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtYnVmZmVyL2J1ZmZlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdHlwZWRhcnJheS1wb29sL3Bvb2wuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9idWZmZXIvbm9kZV9tb2R1bGVzL2lzYXJyYXkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2JpdC10d2lkZGxlL3R3aWRkbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2R1cC9kdXAuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25kYXJyYXktb3BzL25kYXJyYXktb3BzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9jb21waWxlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL3RodW5rLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvY29tcGlsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvdW5pcS91bmlxLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9uZGFycmF5L25kYXJyYXkuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2lvdGEtYXJyYXkvaW90YS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaXMtYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vdmFvLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL3Zhby1uYXRpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jY2FwdHVyZS5qcy9idWlsZC9DQ2FwdHVyZS5hbGwubWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9tb2R1bGUuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZpenBsZXguanMiXSwibmFtZXMiOlsiY29uc3QiLCJsZXQiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNySkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFCQUFxQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVMsWUFBWTtBQUNyQjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsZ0JBQWdCLFlBQVk7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsdUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRDhCO0FBQ0c7QUFDQTs7QUFFSDtBQUNJO0FBQ0Y7QUFDRjtBQUNIO0FBQ007QUFDQzs7QUFFbENBLEdBQUssQ0FBQyxLQUFLLEdBQUcsZ0RBQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUM7QUFDOUNBLEdBQUssQ0FBQyxVQUFVLEdBQUc7RUFDakIsUUFBUSxFQUFFLENBQUM7RUFDWCxRQUFRLEVBQUUsQ0FBQztFQUNYLFFBQVEsRUFBRSxDQUFDO0VBQ1gsUUFBUSxFQUFFLENBQUM7Q0FDWjtBQUNEQyxHQUFHLENBQUMsRUFBRTtBQUNOQSxHQUFHLENBQUMsTUFBTTtBQUNWQSxHQUFHLENBQUMsT0FBTztBQUNYQSxHQUFHLENBQUMsTUFBTTtBQUNWQSxHQUFHLENBQUMsUUFBUTtBQUNa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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUxBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FB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QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUFBO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ3pORDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pTQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDWkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sTUFBTTtBQUNOLE1BQU07QUFDTjs7Ozs7OztBQzlDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3JFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM1QkE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ2xCQTs7QUFFQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7Ozs7Ozs7QUNmQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLG9CQUFvQjtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxlQUFlO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUM3RUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EscUJBQXFCLHlCQUF5QjtBQUM5QztBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOzs7Ozs7Ozs7QUNOQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBLDZCQUE2QixjQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUyxjQUFjO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5Qyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBLGtCQUFrQixXQUFXO0FBQzdCLGlCQUFpQixnQkFBZ0IsVUFBVTtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0NBQStDO0FBQy9DLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsY0FBYztBQUNsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxjQUFjO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNEJBQTRCO0FBQzVCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QztBQUM1QztBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYLEtBQUs7QUFDTDtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFCQUFxQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtB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MUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxrQkFBa0IsR0FBRztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFNQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksS0FBSztBQUNqQjtBQUNBO0FBQ0EsR0FBRztBQUNILFlBQVksS0FBSztBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsU0FBUztBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFD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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixNQUFNO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3RWQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxLQUFLO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCOzs7Ozs7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDcEJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7QUMxQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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eUJBQXlCLGdCQUFnQixvQkFBb0IsSUFBSSxhQUFhLG9EQUFvRCxnQ0FBZ0MsMkJBQTJCLGdDQUFnQyxpQkFBaUIsaUlBQWlJLHNCQUFzQixHQUFHLHdCQUF3Qiw4QkFBOEIsOEJBQThCLDZCQUE2Qiw4QkFBOEIsaUNBQWlDLHNDQUFzQyxTQUFTLDZCQUE2Qiw2QkFBNkIscUVBQXFFLGVBQWUsNkJBQTZCLHFCQUFxQixvQkFBb0IscUdBQXFHLG1DQUFtQyw4QkFBOEIsb0JBQW9CLGdDQUFnQywrQkFBK0Isb0VBQW9FLHFCQUFxQiw2QkFBNkIsdUJBQXVCLG9FQUFvRSxxQkFBcUIsNkJBQTZCLG9DQUFvQyxzRUFBc0UsZUFBZSw2QkFBNkIsb0xBQW9MLDBNQUEwTSx5QkFBeUIsOEJBQThCLHVCQUF1QixpRkFBaUYsb0JBQW9CLEVBQUUsTUFBTSxpQ0FBaUMsZUFBZSxxRUFBcUUsa0NBQWtDLDZCQUE2QixvQkFBb0IsOEJBQThCLG1DQUFtQyxzQ0FBc0Msb0NBQW9DLG9FQUFvRSxzTEFBc0wseUJBQXlCLHlCQUF5Qiw4QkFBOEIsc0NBQXNDLDRCQUE0QixrQkFBa0IsRUFBRSxvQkFBb0Isc0NBQXNDLG9FQUFvRSxrT0FBa08saUNBQWlDLGNBQWMsOEJBQThCLHNDQUFzQyxVQUFVLGdFQUFrRyxTQUFTO0FBQUEsb0tBQWlFLEc7Ozs7Ozs7QUNBdnk3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDckJBLElBQUksT0FBTyxHQUFHLG1CQUFPLENBQUMsQ0FBUyxDQUFDIiwiZmlsZSI6InZpenBsZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSA2Nik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgZWViNjM3Y2Y4MzNmNDExYjIxMzMiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEgMiIsImZ1bmN0aW9uIEdMRXJyb3IgKHJhd0Vycm9yLCBzaG9ydE1lc3NhZ2UsIGxvbmdNZXNzYWdlKSB7XG4gICAgdGhpcy5zaG9ydE1lc3NhZ2UgPSBzaG9ydE1lc3NhZ2UgfHwgJydcbiAgICB0aGlzLmxvbmdNZXNzYWdlID0gbG9uZ01lc3NhZ2UgfHwgJydcbiAgICB0aGlzLnJhd0Vycm9yID0gcmF3RXJyb3IgfHwgJydcbiAgICB0aGlzLm1lc3NhZ2UgPVxuICAgICAgJ2dsLXNoYWRlcjogJyArIChzaG9ydE1lc3NhZ2UgfHwgcmF3RXJyb3IgfHwgJycpICtcbiAgICAgIChsb25nTWVzc2FnZSA/ICdcXG4nK2xvbmdNZXNzYWdlIDogJycpXG4gICAgdGhpcy5zdGFjayA9IChuZXcgRXJyb3IoKSkuc3RhY2tcbn1cbkdMRXJyb3IucHJvdG90eXBlID0gbmV3IEVycm9yXG5HTEVycm9yLnByb3RvdHlwZS5uYW1lID0gJ0dMRXJyb3InXG5HTEVycm9yLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IEdMRXJyb3Jcbm1vZHVsZS5leHBvcnRzID0gR0xFcnJvclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9HTEVycm9yLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZXFQYXJzZXIgKGVxKSB7XHJcbiAgdmFyIG5vaXNlUmVnZXggPSAvKFteaV18XiluL2dcclxuICB2YXIgYXJnc1JlZ2V4ID0gLyh4fHkpL2dcclxuICB2YXIgZmxvYXRSZWdleCA9IC8oW15jXXxeKShbLV0/XFxkKyhcXC5cXGQrKT8pL2dcclxuICB2YXIgbWF0Y2hlcyA9IFtdXHJcbiAgdmFyIG1hdGNoXHJcblxyXG4gIHdoaWxlICgobWF0Y2ggPSBub2lzZVJlZ2V4LmV4ZWMoZXEpKSAhPT0gbnVsbCkge1xyXG4gICAgbWF0Y2hlcy5wdXNoKG1hdGNoLmluZGV4KVxyXG4gIH1cclxuICBtYXRjaGVzLmZvckVhY2goKGVsZW0pID0+IHtcclxuICAgIHZhciBwID0gLTFcclxuICAgIC8vIGluZGV4IGlzIHBvc2l0aW9uIHByaW9yIHRvIG4sIHNvIHdlIG5lZWQgdG8gc2tpcCAzIHRvIGdldCB0byBjb250ZW50XHJcbiAgICBmb3IgKHZhciBpID0gZWxlbSArIDM7IGkgPCBlcS5sZW5ndGg7IGkrKykge1xyXG4gICAgICBpZiAoZXFbaV0gPT09ICcpJykge1xyXG4gICAgICAgIHArK1xyXG4gICAgICAgIGlmIChwID09PSAwKSB7XHJcbiAgICAgICAgICBlcSA9IGVxLnNsaWNlKDAsIGkpICsgJyknICsgZXEuc2xpY2UoaSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgZWxzZSBpZiAoZXFbaV0gPT09ICcoJykge1xyXG4gICAgICAgIHAtLVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSlcclxuICByZXR1cm4gZXEucmVwbGFjZShub2lzZVJlZ2V4LCAnJDElTk9JU0UlKHZlYzMnKVxyXG4gICAgICAgICAgIC5yZXBsYWNlKGFyZ3NSZWdleCwgJ2dsX0ZyYWdDb29yZC4kMScpXHJcbiAgICAgICAgICAgLnJlcGxhY2UoZmxvYXRSZWdleCwgZnVuY3Rpb24gKG1hdGNoLCBwcmUsIG51bSkge1xyXG4gICAgICAgICAgICAgbnVtID0gTnVtYmVyKG51bSlcclxuICAgICAgICAgICAgIHJldHVybiAobnVtICUgMSA9PT0gMCkgPyBgJHtwcmV9JHtudW19LjBgIDogYCR7cHJlfSR7bnVtfWBcclxuICAgICAgICAgICB9KVxyXG59XHJcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9lcVBhcnNlci5qcyIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IG1ha2VSZWZsZWN0VHlwZXNcblxuLy9Db25zdHJ1Y3QgdHlwZSBpbmZvIGZvciByZWZsZWN0aW9uLlxuLy9cbi8vIFRoaXMgaXRlcmF0ZXMgb3ZlciB0aGUgZmxhdHRlbmVkIGxpc3Qgb2YgdW5pZm9ybSB0eXBlIHZhbHVlcyBhbmQgc21hc2hlcyB0aGVtIGludG8gYSBKU09OIG9iamVjdC5cbi8vXG4vLyBUaGUgbGVhdmVzIG9mIHRoZSByZXN1bHRpbmcgb2JqZWN0IGFyZSBlaXRoZXIgaW5kaWNlcyBvciB0eXBlIHN0cmluZ3MgcmVwcmVzZW50aW5nIHByaW1pdGl2ZSBnbHNsaWZ5IHR5cGVzXG5mdW5jdGlvbiBtYWtlUmVmbGVjdFR5cGVzKHVuaWZvcm1zLCB1c2VJbmRleCkge1xuICB2YXIgb2JqID0ge31cbiAgZm9yKHZhciBpPTA7IGk8dW5pZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgbiA9IHVuaWZvcm1zW2ldLm5hbWVcbiAgICB2YXIgcGFydHMgPSBuLnNwbGl0KFwiLlwiKVxuICAgIHZhciBvID0gb2JqXG4gICAgZm9yKHZhciBqPTA7IGo8cGFydHMubGVuZ3RoOyArK2opIHtcbiAgICAgIHZhciB4ID0gcGFydHNbal0uc3BsaXQoXCJbXCIpXG4gICAgICBpZih4Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaWYoISh4WzBdIGluIG8pKSB7XG4gICAgICAgICAgb1t4WzBdXSA9IFtdXG4gICAgICAgIH1cbiAgICAgICAgbyA9IG9beFswXV1cbiAgICAgICAgZm9yKHZhciBrPTE7IGs8eC5sZW5ndGg7ICsraykge1xuICAgICAgICAgIHZhciB5ID0gcGFyc2VJbnQoeFtrXSlcbiAgICAgICAgICBpZihrPHgubGVuZ3RoLTEgfHwgajxwYXJ0cy5sZW5ndGgtMSkge1xuICAgICAgICAgICAgaWYoISh5IGluIG8pKSB7XG4gICAgICAgICAgICAgIGlmKGsgPCB4Lmxlbmd0aC0xKSB7XG4gICAgICAgICAgICAgICAgb1t5XSA9IFtdXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb1t5XSA9IHt9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG8gPSBvW3ldXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHVzZUluZGV4KSB7XG4gICAgICAgICAgICAgIG9beV0gPSBpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBvW3ldID0gdW5pZm9ybXNbaV0udHlwZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmKGogPCBwYXJ0cy5sZW5ndGgtMSkge1xuICAgICAgICBpZighKHhbMF0gaW4gbykpIHtcbiAgICAgICAgICBvW3hbMF1dID0ge31cbiAgICAgICAgfVxuICAgICAgICBvID0gb1t4WzBdXVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYodXNlSW5kZXgpIHtcbiAgICAgICAgICBvW3hbMF1dID0gaVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG9beFswXV0gPSB1bmlmb3Jtc1tpXS50eXBlXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9ialxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvcmVmbGVjdC5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBjdXJyZW50XG4gICAgJ3ByZWNpc2lvbidcbiAgLCAnaGlnaHAnXG4gICwgJ21lZGl1bXAnXG4gICwgJ2xvd3AnXG4gICwgJ2F0dHJpYnV0ZSdcbiAgLCAnY29uc3QnXG4gICwgJ3VuaWZvcm0nXG4gICwgJ3ZhcnlpbmcnXG4gICwgJ2JyZWFrJ1xuICAsICdjb250aW51ZSdcbiAgLCAnZG8nXG4gICwgJ2ZvcidcbiAgLCAnd2hpbGUnXG4gICwgJ2lmJ1xuICAsICdlbHNlJ1xuICAsICdpbidcbiAgLCAnb3V0J1xuICAsICdpbm91dCdcbiAgLCAnZmxvYXQnXG4gICwgJ2ludCdcbiAgLCAndm9pZCdcbiAgLCAnYm9vbCdcbiAgLCAndHJ1ZSdcbiAgLCAnZmFsc2UnXG4gICwgJ2Rpc2NhcmQnXG4gICwgJ3JldHVybidcbiAgLCAnbWF0MidcbiAgLCAnbWF0MydcbiAgLCAnbWF0NCdcbiAgLCAndmVjMidcbiAgLCAndmVjMydcbiAgLCAndmVjNCdcbiAgLCAnaXZlYzInXG4gICwgJ2l2ZWMzJ1xuICAsICdpdmVjNCdcbiAgLCAnYnZlYzInXG4gICwgJ2J2ZWMzJ1xuICAsICdidmVjNCdcbiAgLCAnc2FtcGxlcjFEJ1xuICAsICdzYW1wbGVyMkQnXG4gICwgJ3NhbXBsZXIzRCdcbiAgLCAnc2FtcGxlckN1YmUnXG4gICwgJ3NhbXBsZXIxRFNoYWRvdydcbiAgLCAnc2FtcGxlcjJEU2hhZG93J1xuICAsICdzdHJ1Y3QnXG5cbiAgLy8gZnV0dXJlXG4gICwgJ2FzbSdcbiAgLCAnY2xhc3MnXG4gICwgJ3VuaW9uJ1xuICAsICdlbnVtJ1xuICAsICd0eXBlZGVmJ1xuICAsICd0ZW1wbGF0ZSdcbiAgLCAndGhpcydcbiAgLCAncGFja2VkJ1xuICAsICdnb3RvJ1xuICAsICdzd2l0Y2gnXG4gICwgJ2RlZmF1bHQnXG4gICwgJ2lubGluZSdcbiAgLCAnbm9pbmxpbmUnXG4gICwgJ3ZvbGF0aWxlJ1xuICAsICdwdWJsaWMnXG4gICwgJ3N0YXRpYydcbiAgLCAnZXh0ZXJuJ1xuICAsICdleHRlcm5hbCdcbiAgLCAnaW50ZXJmYWNlJ1xuICAsICdsb25nJ1xuICAsICdzaG9ydCdcbiAgLCAnZG91YmxlJ1xuICAsICdoYWxmJ1xuICAsICdmaXhlZCdcbiAgLCAndW5zaWduZWQnXG4gICwgJ2lucHV0J1xuICAsICdvdXRwdXQnXG4gICwgJ2h2ZWMyJ1xuICAsICdodmVjMydcbiAgLCAnaHZlYzQnXG4gICwgJ2R2ZWMyJ1xuICAsICdkdmVjMydcbiAgLCAnZHZlYzQnXG4gICwgJ2Z2ZWMyJ1xuICAsICdmdmVjMydcbiAgLCAnZnZlYzQnXG4gICwgJ3NhbXBsZXIyRFJlY3QnXG4gICwgJ3NhbXBsZXIzRFJlY3QnXG4gICwgJ3NhbXBsZXIyRFJlY3RTaGFkb3cnXG4gICwgJ3NpemVvZidcbiAgLCAnY2FzdCdcbiAgLCAnbmFtZXNwYWNlJ1xuICAsICd1c2luZydcbl1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9saXRlcmFscy5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBLZWVwIHRoaXMgbGlzdCBzb3J0ZWRcbiAgJ2FicydcbiAgLCAnYWNvcydcbiAgLCAnYWxsJ1xuICAsICdhbnknXG4gICwgJ2FzaW4nXG4gICwgJ2F0YW4nXG4gICwgJ2NlaWwnXG4gICwgJ2NsYW1wJ1xuICAsICdjb3MnXG4gICwgJ2Nyb3NzJ1xuICAsICdkRmR4J1xuICAsICdkRmR5J1xuICAsICdkZWdyZWVzJ1xuICAsICdkaXN0YW5jZSdcbiAgLCAnZG90J1xuICAsICdlcXVhbCdcbiAgLCAnZXhwJ1xuICAsICdleHAyJ1xuICAsICdmYWNlZm9yd2FyZCdcbiAgLCAnZmxvb3InXG4gICwgJ2ZyYWN0J1xuICAsICdnbF9CYWNrQ29sb3InXG4gICwgJ2dsX0JhY2tMaWdodE1vZGVsUHJvZHVjdCdcbiAgLCAnZ2xfQmFja0xpZ2h0UHJvZHVjdCdcbiAgLCAnZ2xfQmFja01hdGVyaWFsJ1xuICAsICdnbF9CYWNrU2Vjb25kYXJ5Q29sb3InXG4gICwgJ2dsX0NsaXBQbGFuZSdcbiAgLCAnZ2xfQ2xpcFZlcnRleCdcbiAgLCAnZ2xfQ29sb3InXG4gICwgJ2dsX0RlcHRoUmFuZ2UnXG4gICwgJ2dsX0RlcHRoUmFuZ2VQYXJhbWV0ZXJzJ1xuICAsICdnbF9FeWVQbGFuZVEnXG4gICwgJ2dsX0V5ZVBsYW5lUidcbiAgLCAnZ2xfRXllUGxhbmVTJ1xuICAsICdnbF9FeWVQbGFuZVQnXG4gICwgJ2dsX0ZvZydcbiAgLCAnZ2xfRm9nQ29vcmQnXG4gICwgJ2dsX0ZvZ0ZyYWdDb29yZCdcbiAgLCAnZ2xfRm9nUGFyYW1ldGVycydcbiAgLCAnZ2xfRnJhZ0NvbG9yJ1xuICAsICdnbF9GcmFnQ29vcmQnXG4gICwgJ2dsX0ZyYWdEYXRhJ1xuICAsICdnbF9GcmFnRGVwdGgnXG4gICwgJ2dsX0ZyYWdEZXB0aEVYVCdcbiAgLCAnZ2xfRnJvbnRDb2xvcidcbiAgLCAnZ2xfRnJvbnRGYWNpbmcnXG4gICwgJ2dsX0Zyb250TGlnaHRNb2RlbFByb2R1Y3QnXG4gICwgJ2dsX0Zyb250TGlnaHRQcm9kdWN0J1xuICAsICdnbF9Gcm9udE1hdGVyaWFsJ1xuICAsICdnbF9Gcm9udFNlY29uZGFyeUNvbG9yJ1xuICAsICdnbF9MaWdodE1vZGVsJ1xuICAsICdnbF9MaWdodE1vZGVsUGFyYW1ldGVycydcbiAgLCAnZ2xfTGlnaHRNb2RlbFByb2R1Y3RzJ1xuICAsICdnbF9MaWdodFByb2R1Y3RzJ1xuICAsICdnbF9MaWdodFNvdXJjZSdcbiAgLCAnZ2xfTGlnaHRTb3VyY2VQYXJhbWV0ZXJzJ1xuICAsICdnbF9NYXRlcmlhbFBhcmFtZXRlcnMnXG4gICwgJ2dsX01heENsaXBQbGFuZXMnXG4gICwgJ2dsX01heENvbWJpbmVkVGV4dHVyZUltYWdlVW5pdHMnXG4gICwgJ2dsX01heERyYXdCdWZmZXJzJ1xuICAsICdnbF9NYXhGcmFnbWVudFVuaWZvcm1Db21wb25lbnRzJ1xuICAsICdnbF9NYXhMaWdodHMnXG4gICwgJ2dsX01heFRleHR1cmVDb29yZHMnXG4gICwgJ2dsX01heFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhUZXh0dXJlVW5pdHMnXG4gICwgJ2dsX01heFZhcnlpbmdGbG9hdHMnXG4gICwgJ2dsX01heFZlcnRleEF0dHJpYnMnXG4gICwgJ2dsX01heFZlcnRleFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhWZXJ0ZXhVbmlmb3JtQ29tcG9uZW50cydcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4J1xuICAsICdnbF9Nb2RlbFZpZXdNYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9Nb2RlbFZpZXdNYXRyaXhJbnZlcnNlVHJhbnNwb3NlJ1xuICAsICdnbF9Nb2RlbFZpZXdNYXRyaXhUcmFuc3Bvc2UnXG4gICwgJ2dsX01vZGVsVmlld1Byb2plY3Rpb25NYXRyaXgnXG4gICwgJ2dsX01vZGVsVmlld1Byb2plY3Rpb25NYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfTW9kZWxWaWV3UHJvamVjdGlvbk1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDAnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQxJ1xuICAsICdnbF9NdWx0aVRleENvb3JkMidcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDMnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQ0J1xuICAsICdnbF9NdWx0aVRleENvb3JkNSdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDYnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQ3J1xuICAsICdnbF9Ob3JtYWwnXG4gICwgJ2dsX05vcm1hbE1hdHJpeCdcbiAgLCAnZ2xfTm9ybWFsU2NhbGUnXG4gICwgJ2dsX09iamVjdFBsYW5lUSdcbiAgLCAnZ2xfT2JqZWN0UGxhbmVSJ1xuICAsICdnbF9PYmplY3RQbGFuZVMnXG4gICwgJ2dsX09iamVjdFBsYW5lVCdcbiAgLCAnZ2xfUG9pbnQnXG4gICwgJ2dsX1BvaW50Q29vcmQnXG4gICwgJ2dsX1BvaW50UGFyYW1ldGVycydcbiAgLCAnZ2xfUG9pbnRTaXplJ1xuICAsICdnbF9Qb3NpdGlvbidcbiAgLCAnZ2xfUHJvamVjdGlvbk1hdHJpeCdcbiAgLCAnZ2xfUHJvamVjdGlvbk1hdHJpeEludmVyc2UnXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXhJbnZlcnNlVHJhbnNwb3NlJ1xuICAsICdnbF9Qcm9qZWN0aW9uTWF0cml4VHJhbnNwb3NlJ1xuICAsICdnbF9TZWNvbmRhcnlDb2xvcidcbiAgLCAnZ2xfVGV4Q29vcmQnXG4gICwgJ2dsX1RleHR1cmVFbnZDb2xvcidcbiAgLCAnZ2xfVGV4dHVyZU1hdHJpeCdcbiAgLCAnZ2xfVGV4dHVyZU1hdHJpeEludmVyc2UnXG4gICwgJ2dsX1RleHR1cmVNYXRyaXhJbnZlcnNlVHJhbnNwb3NlJ1xuICAsICdnbF9UZXh0dXJlTWF0cml4VHJhbnNwb3NlJ1xuICAsICdnbF9WZXJ0ZXgnXG4gICwgJ2dyZWF0ZXJUaGFuJ1xuICAsICdncmVhdGVyVGhhbkVxdWFsJ1xuICAsICdpbnZlcnNlc3FydCdcbiAgLCAnbGVuZ3RoJ1xuICAsICdsZXNzVGhhbidcbiAgLCAnbGVzc1RoYW5FcXVhbCdcbiAgLCAnbG9nJ1xuICAsICdsb2cyJ1xuICAsICdtYXRyaXhDb21wTXVsdCdcbiAgLCAnbWF4J1xuICAsICdtaW4nXG4gICwgJ21peCdcbiAgLCAnbW9kJ1xuICAsICdub3JtYWxpemUnXG4gICwgJ25vdCdcbiAgLCAnbm90RXF1YWwnXG4gICwgJ3BvdydcbiAgLCAncmFkaWFucydcbiAgLCAncmVmbGVjdCdcbiAgLCAncmVmcmFjdCdcbiAgLCAnc2lnbidcbiAgLCAnc2luJ1xuICAsICdzbW9vdGhzdGVwJ1xuICAsICdzcXJ0J1xuICAsICdzdGVwJ1xuICAsICd0YW4nXG4gICwgJ3RleHR1cmUyRCdcbiAgLCAndGV4dHVyZTJETG9kJ1xuICAsICd0ZXh0dXJlMkRQcm9qJ1xuICAsICd0ZXh0dXJlMkRQcm9qTG9kJ1xuICAsICd0ZXh0dXJlQ3ViZSdcbiAgLCAndGV4dHVyZUN1YmVMb2QnXG4gICwgJ3RleHR1cmUyRExvZEVYVCdcbiAgLCAndGV4dHVyZTJEUHJvakxvZEVYVCdcbiAgLCAndGV4dHVyZUN1YmVMb2RFWFQnXG4gICwgJ3RleHR1cmUyREdyYWRFWFQnXG4gICwgJ3RleHR1cmUyRFByb2pHcmFkRVhUJ1xuICAsICd0ZXh0dXJlQ3ViZUdyYWRFWFQnXG5dXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvYnVpbHRpbnMuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBkb0JpbmQoZ2wsIGVsZW1lbnRzLCBhdHRyaWJ1dGVzKSB7XG4gIGlmKGVsZW1lbnRzKSB7XG4gICAgZWxlbWVudHMuYmluZCgpXG4gIH0gZWxzZSB7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbClcbiAgfVxuICB2YXIgbmF0dHJpYnMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1ZFUlRFWF9BVFRSSUJTKXwwXG4gIGlmKGF0dHJpYnV0ZXMpIHtcbiAgICBpZihhdHRyaWJ1dGVzLmxlbmd0aCA+IG5hdHRyaWJzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC12YW86IFRvbyBtYW55IHZlcnRleCBhdHRyaWJ1dGVzXCIpXG4gICAgfVxuICAgIGZvcih2YXIgaT0wOyBpPGF0dHJpYnV0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHZhciBhdHRyaWIgPSBhdHRyaWJ1dGVzW2ldXG4gICAgICBpZihhdHRyaWIuYnVmZmVyKSB7XG4gICAgICAgIHZhciBidWZmZXIgPSBhdHRyaWIuYnVmZmVyXG4gICAgICAgIHZhciBzaXplID0gYXR0cmliLnNpemUgfHwgNFxuICAgICAgICB2YXIgdHlwZSA9IGF0dHJpYi50eXBlIHx8IGdsLkZMT0FUXG4gICAgICAgIHZhciBub3JtYWxpemVkID0gISFhdHRyaWIubm9ybWFsaXplZFxuICAgICAgICB2YXIgc3RyaWRlID0gYXR0cmliLnN0cmlkZSB8fCAwXG4gICAgICAgIHZhciBvZmZzZXQgPSBhdHRyaWIub2Zmc2V0IHx8IDBcbiAgICAgICAgYnVmZmVyLmJpbmQoKVxuICAgICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGksIHNpemUsIHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYodHlwZW9mIGF0dHJpYiA9PT0gXCJudW1iZXJcIikge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjFmKGksIGF0dHJpYilcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpLCBhdHRyaWJbMF0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliMmYoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0pXG4gICAgICAgIH0gZWxzZSBpZihhdHRyaWIubGVuZ3RoID09PSAzKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliM2YoaSwgYXR0cmliWzBdLCBhdHRyaWJbMV0sIGF0dHJpYlsyXSlcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWI0ZihpLCBhdHRyaWJbMF0sIGF0dHJpYlsxXSwgYXR0cmliWzJdLCBhdHRyaWJbM10pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtdmFvOiBJbnZhbGlkIHZlcnRleCBhdHRyaWJ1dGVcIilcbiAgICAgICAgfVxuICAgICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yKDsgaTxuYXR0cmliczsgKytpKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gICAgZm9yKHZhciBpPTA7IGk8bmF0dHJpYnM7ICsraSkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZG9CaW5kXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi9kby1iaW5kLmpzXG4vLyBtb2R1bGUgaWQgPSA2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiaW1wb3J0IHZlcnQgZnJvbSAnLi92ZXJ0Lmdsc2wnXHJcbmltcG9ydCByYXdGcmFnIGZyb20gJy4vZnJhZy5nbHNsJ1xyXG5pbXBvcnQgZXFQYXJzZXIgZnJvbSAnLi9lcVBhcnNlcidcclxuXHJcbmltcG9ydCBnbENsZWFyIGZyb20gJ2dsLWNsZWFyJ1xyXG5pbXBvcnQgZ2xDb250ZXh0IGZyb20gJ2dsLWNvbnRleHQnXHJcbmltcG9ydCBnbFNoYWRlciBmcm9tICdnbC1zaGFkZXInXHJcbmltcG9ydCBnbFJlc2V0IGZyb20gJ2dsLXJlc2V0J1xyXG5pbXBvcnQgbm93IGZyb20gJ3JpZ2h0LW5vdydcclxuaW1wb3J0IGRyYXcgZnJvbSAnYS1iaWctdHJpYW5nbGUnXHJcbmltcG9ydCBDQ2FwdHVyZSBmcm9tICdjY2FwdHVyZS5qcydcclxuXHJcbmNvbnN0IGNsZWFyID0gZ2xDbGVhcih7IGNvbG9yOiBbMCwgMSwgMCwgMV0gfSlcclxuY29uc3QgZnJhZ0xvb2t1cCA9IHtcclxuICBcIiVSX0ZOJVwiOiAwLFxyXG4gIFwiJUdfRk4lXCI6IDEsXHJcbiAgXCIlQl9GTiVcIjogMixcclxuICBcIiVBX0ZOJVwiOiAzXHJcbn1cclxubGV0IGdsXHJcbmxldCBzaGFkZXJcclxubGV0IHRGYWN0b3JcclxubGV0IGNhbnZhc1xyXG5sZXQgY2FwdHVyZXJcclxubGV0IHJlc2V0XHJcbmxldCB0aW1lID0gbm93KCkgLyAxMDAwXHJcblxyXG5mdW5jdGlvbiBhbmltYXRlICgpIHtcclxuICB0aW1lID0gbm93KCkgLyAxMDAwXHJcbn1cclxuZnVuY3Rpb24gcmVuZGVyICgpIHtcclxuICBjb25zdCB3aWR0aCA9IGdsLmRyYXdpbmdCdWZmZXJXaWR0aFxyXG4gIGNvbnN0IGhlaWdodCA9IGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcclxuXHJcbiAgYW5pbWF0ZSgpXHJcbiAgY2xlYXIoZ2wpXHJcbiAgZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodClcclxuXHJcbiAgc2hhZGVyLmJpbmQoKVxyXG4gIHNoYWRlci51bmlmb3Jtcy50ID0gdEZhY3RvciAqIHRpbWVcclxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5wb2ludGVyKClcclxuICBkcmF3KGdsKVxyXG4gIFxyXG4gIGlmIChjYXB0dXJlcikge1xyXG4gICAgY2FwdHVyZXIuY2FwdHVyZShjYW52YXMpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aXpwbGV4ICh0YXJnZXQsIHJnYmEsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gIGNhcHR1cmVyID0gb3B0aW9ucy5jY2FwQ29uZmlnID8gbmV3IENDYXB0dXJlKG9wdGlvbnMuY2NhcENvbmZpZykgOiBudWxsXHJcbiAgdEZhY3RvciA9IG9wdGlvbnMudGltZUZhY3RvciB8fCAxXHJcbiAgY2FudmFzID0gdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIlxyXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcclxuICAgIDogdGFyZ2V0XHJcbiAgbGV0IGZyYWdcclxuXHJcbiAgaWYgKGNhcHR1cmVyKSB7XHJcbiAgICBjYXB0dXJlci5zdGFydCgpXHJcbiAgfVxyXG4gIGlmIChnbCkge1xyXG4gICAgcmVzZXQoKVxyXG4gIH1cclxuXHJcbiAgZ2wgPSBnbENvbnRleHQoY2FudmFzLCByZW5kZXIpXHJcbiAgcmVzZXQgPSBnbFJlc2V0KGdsKVxyXG4gIHJnYmEgPSByZ2JhLm1hcChmblN0ciA9PiBlcVBhcnNlcihmblN0cikpXHJcbiAgZnJhZyA9IHJhd0ZyYWcucmVwbGFjZSgvKCVSX0ZOJXwlR19GTiV8JUJfRk4lfCVBX0ZOJSkvZywgc3Vic3RyID0+IHJnYmFbZnJhZ0xvb2t1cFtzdWJzdHJdXSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lTk9JU0UlL2csICdzbm9pc2VfMV8zJylcclxuICBzaGFkZXIgPSBnbFNoYWRlcihnbCwgdmVydCwgZnJhZylcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJtb2R1bGUuZXhwb3J0cyA9IFwiI2RlZmluZSBHTFNMSUZZIDFcXG5hdHRyaWJ1dGUgdmVjMyBwb3NpdGlvbjtcXG5cXG52b2lkIG1haW4oKSB7XFxuICBnbF9Qb3NpdGlvbiA9IHZlYzQocG9zaXRpb24sIDEuMCk7XFxufVxcblwiXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9zcmMvdmVydC5nbHNsXG4vLyBtb2R1bGUgaWQgPSA4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBcInByZWNpc2lvbiBtZWRpdW1wIGZsb2F0O1xcbiNkZWZpbmUgR0xTTElGWSAxXFxuXFxudW5pZm9ybSBmbG9hdCB0O1xcblxcbi8vXFxuLy8gRGVzY3JpcHRpb24gOiBBcnJheSBhbmQgdGV4dHVyZWxlc3MgR0xTTCAyRC8zRC80RCBzaW1wbGV4XFxuLy8gICAgICAgICAgICAgICBub2lzZSBmdW5jdGlvbnMuXFxuLy8gICAgICBBdXRob3IgOiBJYW4gTWNFd2FuLCBBc2hpbWEgQXJ0cy5cXG4vLyAgTWFpbnRhaW5lciA6IGlqbVxcbi8vICAgICBMYXN0bW9kIDogMjAxMTA4MjIgKGlqbSlcXG4vLyAgICAgTGljZW5zZSA6IENvcHlyaWdodCAoQykgMjAxMSBBc2hpbWEgQXJ0cy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cXG4vLyAgICAgICAgICAgICAgIERpc3RyaWJ1dGVkIHVuZGVyIHRoZSBNSVQgTGljZW5zZS4gU2VlIExJQ0VOU0UgZmlsZS5cXG4vLyAgICAgICAgICAgICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9hc2hpbWEvd2ViZ2wtbm9pc2VcXG4vL1xcblxcbnZlYzMgbW9kMjg5XzFfMCh2ZWMzIHgpIHtcXG4gIHJldHVybiB4IC0gZmxvb3IoeCAqICgxLjAgLyAyODkuMCkpICogMjg5LjA7XFxufVxcblxcbnZlYzQgbW9kMjg5XzFfMCh2ZWM0IHgpIHtcXG4gIHJldHVybiB4IC0gZmxvb3IoeCAqICgxLjAgLyAyODkuMCkpICogMjg5LjA7XFxufVxcblxcbnZlYzQgcGVybXV0ZV8xXzEodmVjNCB4KSB7XFxuICAgICByZXR1cm4gbW9kMjg5XzFfMCgoKHgqMzQuMCkrMS4wKSp4KTtcXG59XFxuXFxudmVjNCB0YXlsb3JJbnZTcXJ0XzFfMih2ZWM0IHIpXFxue1xcbiAgcmV0dXJuIDEuNzkyODQyOTE0MDAxNTkgLSAwLjg1MzczNDcyMDk1MzE0ICogcjtcXG59XFxuXFxuZmxvYXQgc25vaXNlXzFfMyh2ZWMzIHYpXFxuICB7XFxuICBjb25zdCB2ZWMyICBDID0gdmVjMigxLjAvNi4wLCAxLjAvMy4wKSA7XFxuICBjb25zdCB2ZWM0ICBEXzFfNCA9IHZlYzQoMC4wLCAwLjUsIDEuMCwgMi4wKTtcXG5cXG4vLyBGaXJzdCBjb3JuZXJcXG4gIHZlYzMgaSAgPSBmbG9vcih2ICsgZG90KHYsIEMueXl5KSApO1xcbiAgdmVjMyB4MCA9ICAgdiAtIGkgKyBkb3QoaSwgQy54eHgpIDtcXG5cXG4vLyBPdGhlciBjb3JuZXJzXFxuICB2ZWMzIGdfMV81ID0gc3RlcCh4MC55engsIHgwLnh5eik7XFxuICB2ZWMzIGwgPSAxLjAgLSBnXzFfNTtcXG4gIHZlYzMgaTEgPSBtaW4oIGdfMV81Lnh5eiwgbC56eHkgKTtcXG4gIHZlYzMgaTIgPSBtYXgoIGdfMV81Lnh5eiwgbC56eHkgKTtcXG5cXG4gIC8vICAgeDAgPSB4MCAtIDAuMCArIDAuMCAqIEMueHh4O1xcbiAgLy8gICB4MSA9IHgwIC0gaTEgICsgMS4wICogQy54eHg7XFxuICAvLyAgIHgyID0geDAgLSBpMiAgKyAyLjAgKiBDLnh4eDtcXG4gIC8vICAgeDMgPSB4MCAtIDEuMCArIDMuMCAqIEMueHh4O1xcbiAgdmVjMyB4MSA9IHgwIC0gaTEgKyBDLnh4eDtcXG4gIHZlYzMgeDIgPSB4MCAtIGkyICsgQy55eXk7IC8vIDIuMCpDLnggPSAxLzMgPSBDLnlcXG4gIHZlYzMgeDMgPSB4MCAtIERfMV80Lnl5eTsgICAgICAvLyAtMS4wKzMuMCpDLnggPSAtMC41ID0gLUQueVxcblxcbi8vIFBlcm11dGF0aW9uc1xcbiAgaSA9IG1vZDI4OV8xXzAoaSk7XFxuICB2ZWM0IHAgPSBwZXJtdXRlXzFfMSggcGVybXV0ZV8xXzEoIHBlcm11dGVfMV8xKFxcbiAgICAgICAgICAgICBpLnogKyB2ZWM0KDAuMCwgaTEueiwgaTIueiwgMS4wICkpXFxuICAgICAgICAgICArIGkueSArIHZlYzQoMC4wLCBpMS55LCBpMi55LCAxLjAgKSlcXG4gICAgICAgICAgICsgaS54ICsgdmVjNCgwLjAsIGkxLngsIGkyLngsIDEuMCApKTtcXG5cXG4vLyBHcmFkaWVudHM6IDd4NyBwb2ludHMgb3ZlciBhIHNxdWFyZSwgbWFwcGVkIG9udG8gYW4gb2N0YWhlZHJvbi5cXG4vLyBUaGUgcmluZyBzaXplIDE3KjE3ID0gMjg5IGlzIGNsb3NlIHRvIGEgbXVsdGlwbGUgb2YgNDkgKDQ5KjYgPSAyOTQpXFxuICBmbG9hdCBuXyA9IDAuMTQyODU3MTQyODU3OyAvLyAxLjAvNy4wXFxuICB2ZWMzICBucyA9IG5fICogRF8xXzQud3l6IC0gRF8xXzQueHp4O1xcblxcbiAgdmVjNCBqID0gcCAtIDQ5LjAgKiBmbG9vcihwICogbnMueiAqIG5zLnopOyAgLy8gIG1vZChwLDcqNylcXG5cXG4gIHZlYzQgeF8gPSBmbG9vcihqICogbnMueik7XFxuICB2ZWM0IHlfID0gZmxvb3IoaiAtIDcuMCAqIHhfICk7ICAgIC8vIG1vZChqLE4pXFxuXFxuICB2ZWM0IHggPSB4XyAqbnMueCArIG5zLnl5eXk7XFxuICB2ZWM0IHkgPSB5XyAqbnMueCArIG5zLnl5eXk7XFxuICB2ZWM0IGggPSAxLjAgLSBhYnMoeCkgLSBhYnMoeSk7XFxuXFxuICB2ZWM0IGIwID0gdmVjNCggeC54eSwgeS54eSApO1xcbiAgdmVjNCBiMSA9IHZlYzQoIHguencsIHkuencgKTtcXG5cXG4gIC8vdmVjNCBzMCA9IHZlYzQobGVzc1RoYW4oYjAsMC4wKSkqMi4wIC0gMS4wO1xcbiAgLy92ZWM0IHMxID0gdmVjNChsZXNzVGhhbihiMSwwLjApKSoyLjAgLSAxLjA7XFxuICB2ZWM0IHMwID0gZmxvb3IoYjApKjIuMCArIDEuMDtcXG4gIHZlYzQgczEgPSBmbG9vcihiMSkqMi4wICsgMS4wO1xcbiAgdmVjNCBzaCA9IC1zdGVwKGgsIHZlYzQoMC4wKSk7XFxuXFxuICB2ZWM0IGEwID0gYjAueHp5dyArIHMwLnh6eXcqc2gueHh5eSA7XFxuICB2ZWM0IGExXzFfNiA9IGIxLnh6eXcgKyBzMS54enl3KnNoLnp6d3cgO1xcblxcbiAgdmVjMyBwMF8xXzcgPSB2ZWMzKGEwLnh5LGgueCk7XFxuICB2ZWMzIHAxID0gdmVjMyhhMC56dyxoLnkpO1xcbiAgdmVjMyBwMiA9IHZlYzMoYTFfMV82Lnh5LGgueik7XFxuICB2ZWMzIHAzID0gdmVjMyhhMV8xXzYuencsaC53KTtcXG5cXG4vL05vcm1hbGlzZSBncmFkaWVudHNcXG4gIHZlYzQgbm9ybSA9IHRheWxvckludlNxcnRfMV8yKHZlYzQoZG90KHAwXzFfNyxwMF8xXzcpLCBkb3QocDEscDEpLCBkb3QocDIsIHAyKSwgZG90KHAzLHAzKSkpO1xcbiAgcDBfMV83ICo9IG5vcm0ueDtcXG4gIHAxICo9IG5vcm0ueTtcXG4gIHAyICo9IG5vcm0uejtcXG4gIHAzICo9IG5vcm0udztcXG5cXG4vLyBNaXggZmluYWwgbm9pc2UgdmFsdWVcXG4gIHZlYzQgbSA9IG1heCgwLjYgLSB2ZWM0KGRvdCh4MCx4MCksIGRvdCh4MSx4MSksIGRvdCh4Mix4MiksIGRvdCh4Myx4MykpLCAwLjApO1xcbiAgbSA9IG0gKiBtO1xcbiAgcmV0dXJuIDQyLjAgKiBkb3QoIG0qbSwgdmVjNCggZG90KHAwXzFfNyx4MCksIGRvdChwMSx4MSksXFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb3QocDIseDIpLCBkb3QocDMseDMpICkgKTtcXG4gIH1cXG5cXG5cXG5cXG5cXG52b2lkIG1haW4oKSB7XFxuICBmbG9hdCByID0gJVJfRk4lO1xcbiAgZmxvYXQgZyA9ICVHX0ZOJTtcXG4gIGZsb2F0IGIgPSAlQl9GTiU7XFxuICBmbG9hdCBhID0gJUFfRk4lO1xcbiAgZ2xfRnJhZ0NvbG9yID0gdmVjNChyLCBnLCBiLCBhKTtcXG59XFxuXCJcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL3NyYy9mcmFnLmdsc2xcbi8vIG1vZHVsZSBpZCA9IDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZGVmYXVsdHMgPSByZXF1aXJlKCcuL2RlZmF1bHRzJylcblxubW9kdWxlLmV4cG9ydHMgPSBjbGVhclxuXG5mdW5jdGlvbiBjbGVhcihvcHRzKSB7XG4gIG9wdHMgPSBvcHRzIHx8IHt9XG5cbiAgdmFyIGNvbG9yID0gZGVmYXVsdHMuY29sb3Iob3B0cy5jb2xvcilcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsZWFyLCAnY29sb3InLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbG9yIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGNvbG9yID0gZGVmYXVsdHMuY29sb3IodmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHZhciBkZXB0aCA9IGRlZmF1bHRzLmRlcHRoKG9wdHMuZGVwdGgpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGVhciwgJ2RlcHRoJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBkZXB0aCB9LFxuICAgIHNldDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiBkZXB0aCA9IGRlZmF1bHRzLmRlcHRoKHZhbHVlKVxuICAgIH1cbiAgfSlcblxuICB2YXIgc3RlbmNpbCA9IGRlZmF1bHRzLnN0ZW5jaWwob3B0cy5zdGVuY2lsKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xlYXIsICdzdGVuY2lsJywge1xuICAgIGdldDogZnVuY3Rpb24oKSB7IHJldHVybiBzdGVuY2lsIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIHN0ZW5jaWwgPSBkZWZhdWx0cy5zdGVuY2lsKHZhbHVlKVxuICAgIH1cbiAgfSlcblxuICByZXR1cm4gY2xlYXJcblxuICBmdW5jdGlvbiBjbGVhcihnbCkge1xuICAgIHZhciBmbGFncyA9IDBcblxuICAgIGlmIChjb2xvciAhPT0gZmFsc2UpIHtcbiAgICAgIGdsLmNsZWFyQ29sb3IoY29sb3JbMF0sIGNvbG9yWzFdLCBjb2xvclsyXSwgY29sb3JbM10pXG4gICAgICBmbGFncyB8PSBnbC5DT0xPUl9CVUZGRVJfQklUXG4gICAgfVxuICAgIGlmIChkZXB0aCAhPT0gZmFsc2UpIHtcbiAgICAgIGdsLmNsZWFyRGVwdGgoZGVwdGgpXG4gICAgICBmbGFncyB8PSBnbC5ERVBUSF9CVUZGRVJfQklUXG4gICAgfVxuICAgIGlmIChzdGVuY2lsICE9PSBmYWxzZSkge1xuICAgICAgZ2wuY2xlYXJTdGVuY2lsKHN0ZW5jaWwpXG4gICAgICBmbGFncyB8PSBnbC5TVEVOQ0lMX0JVRkZFUl9CSVRcbiAgICB9XG5cbiAgICBnbC5jbGVhcihmbGFncylcblxuICAgIHJldHVybiBnbFxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jbGVhci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJleHBvcnRzLmNvbG9yID0gZnVuY3Rpb24oY29sb3IpIHtcbiAgcmV0dXJuIGFycmF5KGNvbG9yLCBbMCwgMCwgMCwgMV0pXG59XG5cbmV4cG9ydHMuZGVwdGggPSBmdW5jdGlvbihkZXB0aCkge1xuICByZXR1cm4gbnVtYmVyKGRlcHRoLCAxKVxufVxuXG5leHBvcnRzLnN0ZW5jaWwgPSBmdW5jdGlvbihzdGVuY2lsKSB7XG4gIHJldHVybiBudW1iZXIoc3RlbmNpbCwgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIG51bWJlcihuLCBkZWYpIHtcbiAgaWYgKG4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcbiAgaWYgKHR5cGVvZiBuID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGRlZlxuICByZXR1cm4gbiArIDBcbn1cblxuZnVuY3Rpb24gYXJyYXkoYSwgZGVmKSB7XG4gIGlmIChhID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXG4gIGlmIChBcnJheS5pc0FycmF5KGEpKSByZXR1cm4gYSB8fCBkZWZcbiAgcmV0dXJuIGRlZlxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY2xlYXIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IDExXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHJhZiA9IHJlcXVpcmUoJ3JhZi1jb21wb25lbnQnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNvbnRleHRcblxuZnVuY3Rpb24gY3JlYXRlQ29udGV4dChjYW52YXMsIG9wdHMsIHJlbmRlcikge1xuICBpZiAodHlwZW9mIG9wdHMgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZW5kZXIgPSBvcHRzXG4gICAgb3B0cyA9IHt9XG4gIH0gZWxzZSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge31cbiAgfVxuXG4gIHZhciBnbCA9IChcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wnLCBvcHRzKSB8fFxuICAgIGNhbnZhcy5nZXRDb250ZXh0KCd3ZWJnbC1leHBlcmltZW50YWwnLCBvcHRzKSB8fFxuICAgIGNhbnZhcy5nZXRDb250ZXh0KCdleHBlcmltZW50YWwtd2ViZ2wnLCBvcHRzKVxuICApXG5cbiAgaWYgKCFnbCkge1xuICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGluaXRpYWxpemUgV2ViR0wnKVxuICB9XG5cbiAgaWYgKHJlbmRlcikgcmFmKHRpY2spXG5cbiAgcmV0dXJuIGdsXG5cbiAgZnVuY3Rpb24gdGljaygpIHtcbiAgICByZW5kZXIoZ2wpXG4gICAgcmFmKHRpY2spXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNvbnRleHQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLyoqXG4gKiBFeHBvc2UgYHJlcXVlc3RBbmltYXRpb25GcmFtZSgpYC5cbiAqL1xuXG5leHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy53ZWJraXRSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cub1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgZmFsbGJhY2s7XG5cbi8qKlxuICogRmFsbGJhY2sgaW1wbGVtZW50YXRpb24uXG4gKi9cblxudmFyIHByZXYgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbmZ1bmN0aW9uIGZhbGxiYWNrKGZuKSB7XG4gIHZhciBjdXJyID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIHZhciBtcyA9IE1hdGgubWF4KDAsIDE2IC0gKGN1cnIgLSBwcmV2KSk7XG4gIHZhciByZXEgPSBzZXRUaW1lb3V0KGZuLCBtcyk7XG4gIHByZXYgPSBjdXJyO1xuICByZXR1cm4gcmVxO1xufVxuXG4vKipcbiAqIENhbmNlbC5cbiAqL1xuXG52YXIgY2FuY2VsID0gd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy53ZWJraXRDYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubW96Q2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93Lm9DYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubXNDYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cuY2xlYXJUaW1lb3V0O1xuXG5leHBvcnRzLmNhbmNlbCA9IGZ1bmN0aW9uKGlkKXtcbiAgY2FuY2VsLmNhbGwod2luZG93LCBpZCk7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmFmLWNvbXBvbmVudC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxudmFyIGNyZWF0ZVVuaWZvcm1XcmFwcGVyICAgPSByZXF1aXJlKCcuL2xpYi9jcmVhdGUtdW5pZm9ybXMnKVxudmFyIGNyZWF0ZUF0dHJpYnV0ZVdyYXBwZXIgPSByZXF1aXJlKCcuL2xpYi9jcmVhdGUtYXR0cmlidXRlcycpXG52YXIgbWFrZVJlZmxlY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vbGliL3JlZmxlY3QnKVxudmFyIHNoYWRlckNhY2hlICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXItY2FjaGUnKVxudmFyIHJ1bnRpbWUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9ydW50aW1lLXJlZmxlY3QnKVxudmFyIEdMRXJyb3IgICAgICAgICAgICAgICAgPSByZXF1aXJlKFwiLi9saWIvR0xFcnJvclwiKVxuXG4vL1NoYWRlciBvYmplY3RcbmZ1bmN0aW9uIFNoYWRlcihnbCkge1xuICB0aGlzLmdsICAgICAgICAgPSBnbFxuICB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudCA9IDAgIC8vIGZpeG1lIHdoZXJlIGVsc2Ugc2hvdWxkIHdlIHN0b3JlIGluZm8sIHNhZmUgYnV0IG5vdCBuaWNlIG9uIHRoZSBnbCBvYmplY3RcblxuICAvL0RlZmF1bHQgaW5pdGlhbGl6ZSB0aGVzZSB0byBudWxsXG4gIHRoaXMuX3ZyZWYgICAgICA9XG4gIHRoaXMuX2ZyZWYgICAgICA9XG4gIHRoaXMuX3JlbGluayAgICA9XG4gIHRoaXMudmVydFNoYWRlciA9XG4gIHRoaXMuZnJhZ1NoYWRlciA9XG4gIHRoaXMucHJvZ3JhbSAgICA9XG4gIHRoaXMuYXR0cmlidXRlcyA9XG4gIHRoaXMudW5pZm9ybXMgICA9XG4gIHRoaXMudHlwZXMgICAgICA9IG51bGxcbn1cblxudmFyIHByb3RvID0gU2hhZGVyLnByb3RvdHlwZVxuXG5wcm90by5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIGlmKCF0aGlzLnByb2dyYW0pIHtcbiAgICB0aGlzLl9yZWxpbmsoKVxuICB9XG5cbiAgLy8gZW5zdXJpbmcgdGhhdCB3ZSBoYXZlIHRoZSByaWdodCBudW1iZXIgb2YgZW5hYmxlZCB2ZXJ0ZXggYXR0cmlidXRlc1xuICB2YXIgaVxuICB2YXIgbmV3QXR0cmliQ291bnQgPSB0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCB0aGlzLmdsLkFDVElWRV9BVFRSSUJVVEVTKSAvLyBtb3JlIHJvYnVzdCBhcHByb2FjaFxuICAvL3ZhciBuZXdBdHRyaWJDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuYXR0cmlidXRlcykubGVuZ3RoIC8vIGF2b2lkcyB0aGUgcHJvYmFibHkgaW1tYXRlcmlhbCBpbnRyb3NwZWN0aW9uIHNsb3dkb3duXG4gIHZhciBvbGRBdHRyaWJDb3VudCA9IHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50XG4gIGlmKG5ld0F0dHJpYkNvdW50ID4gb2xkQXR0cmliQ291bnQpIHtcbiAgICBmb3IoaSA9IG9sZEF0dHJpYkNvdW50OyBpIDwgbmV3QXR0cmliQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfSBlbHNlIGlmKG9sZEF0dHJpYkNvdW50ID4gbmV3QXR0cmliQ291bnQpIHtcbiAgICBmb3IoaSA9IG5ld0F0dHJpYkNvdW50OyBpIDwgb2xkQXR0cmliQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5nbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH1cblxuICB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudCA9IG5ld0F0dHJpYkNvdW50XG5cbiAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSlcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIGRpc2FibGluZyB2ZXJ0ZXggYXR0cmlidXRlcyBzbyBuZXcgc2hhZGVyIHN0YXJ0cyB3aXRoIHplcm9cbiAgLy8gYW5kIGl0J3MgYWxzbyB1c2VmdWwgaWYgYWxsIHNoYWRlcnMgYXJlIGRpc3Bvc2VkIGJ1dCB0aGVcbiAgLy8gZ2wgY29udGV4dCBpcyByZXVzZWQgZm9yIHN1YnNlcXVlbnQgcmVwbG90dGluZ1xuICB2YXIgb2xkQXR0cmliQ291bnQgPSB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudFxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYkNvdW50OyBpKyspIHtcbiAgICB0aGlzLmdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICB9XG4gIHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50ID0gMFxuXG4gIGlmKHRoaXMuX2ZyZWYpIHtcbiAgICB0aGlzLl9mcmVmLmRpc3Bvc2UoKVxuICB9XG4gIGlmKHRoaXMuX3ZyZWYpIHtcbiAgICB0aGlzLl92cmVmLmRpc3Bvc2UoKVxuICB9XG4gIHRoaXMuYXR0cmlidXRlcyA9XG4gIHRoaXMudHlwZXMgICAgICA9XG4gIHRoaXMudmVydFNoYWRlciA9XG4gIHRoaXMuZnJhZ1NoYWRlciA9XG4gIHRoaXMucHJvZ3JhbSAgICA9XG4gIHRoaXMuX3JlbGluayAgICA9XG4gIHRoaXMuX2ZyZWYgICAgICA9XG4gIHRoaXMuX3ZyZWYgICAgICA9IG51bGxcbn1cblxuZnVuY3Rpb24gY29tcGFyZUF0dHJpYnV0ZXMoYSwgYikge1xuICBpZihhLm5hbWUgPCBiLm5hbWUpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICByZXR1cm4gMVxufVxuXG4vL1VwZGF0ZSBleHBvcnQgaG9vayBmb3IgZ2xzbGlmeS1saXZlXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihcbiAgICB2ZXJ0U291cmNlXG4gICwgZnJhZ1NvdXJjZVxuICAsIHVuaWZvcm1zXG4gICwgYXR0cmlidXRlcykge1xuXG4gIC8vSWYgb25seSBvbmUgb2JqZWN0IHBhc3NlZCwgYXNzdW1lIGdsc2xpZnkgc3R5bGUgb3V0cHV0XG4gIGlmKCFmcmFnU291cmNlIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgb2JqID0gdmVydFNvdXJjZVxuICAgIHZlcnRTb3VyY2UgPSBvYmoudmVydGV4XG4gICAgZnJhZ1NvdXJjZSA9IG9iai5mcmFnbWVudFxuICAgIHVuaWZvcm1zICAgPSBvYmoudW5pZm9ybXNcbiAgICBhdHRyaWJ1dGVzID0gb2JqLmF0dHJpYnV0ZXNcbiAgfVxuXG4gIHZhciB3cmFwcGVyID0gdGhpc1xuICB2YXIgZ2wgICAgICA9IHdyYXBwZXIuZ2xcblxuICAvL0NvbXBpbGUgdmVydGV4IGFuZCBmcmFnbWVudCBzaGFkZXJzXG4gIHZhciBwdnJlZiA9IHdyYXBwZXIuX3ZyZWZcbiAgd3JhcHBlci5fdnJlZiA9IHNoYWRlckNhY2hlLnNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdmVydFNvdXJjZSlcbiAgaWYocHZyZWYpIHtcbiAgICBwdnJlZi5kaXNwb3NlKClcbiAgfVxuICB3cmFwcGVyLnZlcnRTaGFkZXIgPSB3cmFwcGVyLl92cmVmLnNoYWRlclxuICB2YXIgcGZyZWYgPSB0aGlzLl9mcmVmXG4gIHdyYXBwZXIuX2ZyZWYgPSBzaGFkZXJDYWNoZS5zaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZnJhZ1NvdXJjZSlcbiAgaWYocGZyZWYpIHtcbiAgICBwZnJlZi5kaXNwb3NlKClcbiAgfVxuICB3cmFwcGVyLmZyYWdTaGFkZXIgPSB3cmFwcGVyLl9mcmVmLnNoYWRlclxuXG4gIC8vSWYgdW5pZm9ybXMvYXR0cmlidXRlcyBpcyBub3Qgc3BlY2lmaWVkLCB1c2UgUlQgcmVmbGVjdGlvblxuICBpZighdW5pZm9ybXMgfHwgIWF0dHJpYnV0ZXMpIHtcblxuICAgIC8vQ3JlYXRlIGluaXRpYWwgdGVzdCBwcm9ncmFtXG4gICAgdmFyIHRlc3RQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRlc3RQcm9ncmFtLCB3cmFwcGVyLmZyYWdTaGFkZXIpXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRlc3RQcm9ncmFtLCB3cmFwcGVyLnZlcnRTaGFkZXIpXG4gICAgZ2wubGlua1Byb2dyYW0odGVzdFByb2dyYW0pXG4gICAgaWYoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGVzdFByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgdmFyIGVyckxvZyA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHRlc3RQcm9ncmFtKVxuICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCAnRXJyb3IgbGlua2luZyBwcm9ncmFtOicgKyBlcnJMb2cpXG4gICAgfVxuXG4gICAgLy9Mb2FkIGRhdGEgZnJvbSBydW50aW1lXG4gICAgdW5pZm9ybXMgICA9IHVuaWZvcm1zICAgfHwgcnVudGltZS51bmlmb3JtcyhnbCwgdGVzdFByb2dyYW0pXG4gICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgfHwgcnVudGltZS5hdHRyaWJ1dGVzKGdsLCB0ZXN0UHJvZ3JhbSlcblxuICAgIC8vUmVsZWFzZSB0ZXN0IHByb2dyYW1cbiAgICBnbC5kZWxldGVQcm9ncmFtKHRlc3RQcm9ncmFtKVxuICB9XG5cbiAgLy9Tb3J0IGF0dHJpYnV0ZXMgbGV4aWNvZ3JhcGhpY2FsbHlcbiAgLy8gb3ZlcnJpZGVzIHVuZGVmaW5lZCBXZWJHTCBiZWhhdmlvciBmb3IgYXR0cmlidXRlIGxvY2F0aW9uc1xuICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcy5zbGljZSgpXG4gIGF0dHJpYnV0ZXMuc29ydChjb21wYXJlQXR0cmlidXRlcylcblxuICAvL0NvbnZlcnQgYXR0cmlidXRlIHR5cGVzLCByZWFkIG91dCBsb2NhdGlvbnNcbiAgdmFyIGF0dHJpYnV0ZVVucGFja2VkICA9IFtdXG4gIHZhciBhdHRyaWJ1dGVOYW1lcyAgICAgPSBbXVxuICB2YXIgYXR0cmlidXRlTG9jYXRpb25zID0gW11cbiAgdmFyIGlcbiAgZm9yKGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGF0dHIgPSBhdHRyaWJ1dGVzW2ldXG4gICAgaWYoYXR0ci50eXBlLmluZGV4T2YoJ21hdCcpID49IDApIHtcbiAgICAgIHZhciBzaXplID0gYXR0ci50eXBlLmNoYXJBdChhdHRyLnR5cGUubGVuZ3RoLTEpfDBcbiAgICAgIHZhciBsb2NWZWN0b3IgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICAgIGZvcih2YXIgaj0wOyBqPHNpemU7ICsraikge1xuICAgICAgICBsb2NWZWN0b3Jbal0gPSBhdHRyaWJ1dGVMb2NhdGlvbnMubGVuZ3RoXG4gICAgICAgIGF0dHJpYnV0ZU5hbWVzLnB1c2goYXR0ci5uYW1lICsgJ1snICsgaiArICddJylcbiAgICAgICAgaWYodHlwZW9mIGF0dHIubG9jYXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goYXR0ci5sb2NhdGlvbiArIGopXG4gICAgICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KGF0dHIubG9jYXRpb24pICYmXG4gICAgICAgICAgICAgICAgICBhdHRyLmxvY2F0aW9uLmxlbmd0aCA9PT0gc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgdHlwZW9mIGF0dHIubG9jYXRpb25bal0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goYXR0ci5sb2NhdGlvbltqXXwwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKC0xKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVVbnBhY2tlZC5wdXNoKHtcbiAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICB0eXBlOiBhdHRyLnR5cGUsXG4gICAgICAgIGxvY2F0aW9uczogbG9jVmVjdG9yXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVVbnBhY2tlZC5wdXNoKHtcbiAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICB0eXBlOiBhdHRyLnR5cGUsXG4gICAgICAgIGxvY2F0aW9uczogWyBhdHRyaWJ1dGVMb2NhdGlvbnMubGVuZ3RoIF1cbiAgICAgIH0pXG4gICAgICBhdHRyaWJ1dGVOYW1lcy5wdXNoKGF0dHIubmFtZSlcbiAgICAgIGlmKHR5cGVvZiBhdHRyLmxvY2F0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaChhdHRyLmxvY2F0aW9ufDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaCgtMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0ZvciBhbGwgdW5zcGVjaWZpZWQgYXR0cmlidXRlcywgYXNzaWduIHRoZW0gbGV4aWNvZ3JhcGhpY2FsbHkgbWluIGF0dHJpYnV0ZVxuICB2YXIgY3VyTG9jYXRpb24gPSAwXG4gIGZvcihpPTA7IGk8YXR0cmlidXRlTG9jYXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYoYXR0cmlidXRlTG9jYXRpb25zW2ldIDwgMCkge1xuICAgICAgd2hpbGUoYXR0cmlidXRlTG9jYXRpb25zLmluZGV4T2YoY3VyTG9jYXRpb24pID49IDApIHtcbiAgICAgICAgY3VyTG9jYXRpb24gKz0gMVxuICAgICAgfVxuICAgICAgYXR0cmlidXRlTG9jYXRpb25zW2ldID0gY3VyTG9jYXRpb25cbiAgICB9XG4gIH1cblxuICAvL1JlYnVpbGQgcHJvZ3JhbSBhbmQgcmVjb21wdXRlIGFsbCB1bmlmb3JtIGxvY2F0aW9uc1xuICB2YXIgdW5pZm9ybUxvY2F0aW9ucyA9IG5ldyBBcnJheSh1bmlmb3Jtcy5sZW5ndGgpXG4gIGZ1bmN0aW9uIHJlbGluaygpIHtcbiAgICB3cmFwcGVyLnByb2dyYW0gPSBzaGFkZXJDYWNoZS5wcm9ncmFtKFxuICAgICAgICBnbFxuICAgICAgLCB3cmFwcGVyLl92cmVmXG4gICAgICAsIHdyYXBwZXIuX2ZyZWZcbiAgICAgICwgYXR0cmlidXRlTmFtZXNcbiAgICAgICwgYXR0cmlidXRlTG9jYXRpb25zKVxuXG4gICAgZm9yKHZhciBpPTA7IGk8dW5pZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHVuaWZvcm1Mb2NhdGlvbnNbaV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgICAgICAgd3JhcHBlci5wcm9ncmFtXG4gICAgICAgICwgdW5pZm9ybXNbaV0ubmFtZSlcbiAgICB9XG4gIH1cblxuICAvL1BlcmZvcm0gaW5pdGlhbCBsaW5raW5nLCByZXVzZSBwcm9ncmFtIHVzZWQgZm9yIHJlZmxlY3Rpb25cbiAgcmVsaW5rKClcblxuICAvL1NhdmUgcmVsaW5raW5nIHByb2NlZHVyZSwgZGVmZXIgdW50aWwgcnVudGltZVxuICB3cmFwcGVyLl9yZWxpbmsgPSByZWxpbmtcblxuICAvL0dlbmVyYXRlIHR5cGUgaW5mb1xuICB3cmFwcGVyLnR5cGVzID0ge1xuICAgIHVuaWZvcm1zOiAgIG1ha2VSZWZsZWN0KHVuaWZvcm1zKSxcbiAgICBhdHRyaWJ1dGVzOiBtYWtlUmVmbGVjdChhdHRyaWJ1dGVzKVxuICB9XG5cbiAgLy9HZW5lcmF0ZSBhdHRyaWJ1dGUgd3JhcHBlcnNcbiAgd3JhcHBlci5hdHRyaWJ1dGVzID0gY3JlYXRlQXR0cmlidXRlV3JhcHBlcihcbiAgICAgIGdsXG4gICAgLCB3cmFwcGVyXG4gICAgLCBhdHRyaWJ1dGVVbnBhY2tlZFxuICAgICwgYXR0cmlidXRlTG9jYXRpb25zKVxuXG4gIC8vR2VuZXJhdGUgdW5pZm9ybSB3cmFwcGVyc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod3JhcHBlciwgJ3VuaWZvcm1zJywgY3JlYXRlVW5pZm9ybVdyYXBwZXIoXG4gICAgICBnbFxuICAgICwgd3JhcHBlclxuICAgICwgdW5pZm9ybXNcbiAgICAsIHVuaWZvcm1Mb2NhdGlvbnMpKVxufVxuXG4vL0NvbXBpbGVzIGFuZCBsaW5rcyBhIHNoYWRlciBwcm9ncmFtIHdpdGggdGhlIGdpdmVuIGF0dHJpYnV0ZSBhbmQgdmVydGV4IGxpc3RcbmZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihcbiAgICBnbFxuICAsIHZlcnRTb3VyY2VcbiAgLCBmcmFnU291cmNlXG4gICwgdW5pZm9ybXNcbiAgLCBhdHRyaWJ1dGVzKSB7XG5cbiAgdmFyIHNoYWRlciA9IG5ldyBTaGFkZXIoZ2wpXG5cbiAgc2hhZGVyLnVwZGF0ZShcbiAgICAgIHZlcnRTb3VyY2VcbiAgICAsIGZyYWdTb3VyY2VcbiAgICAsIHVuaWZvcm1zXG4gICAgLCBhdHRyaWJ1dGVzKVxuXG4gIHJldHVybiBzaGFkZXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaGFkZXJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxudmFyIGNvYWxsZXNjZVVuaWZvcm1zID0gcmVxdWlyZSgnLi9yZWZsZWN0JylcbnZhciBHTEVycm9yID0gcmVxdWlyZShcIi4vR0xFcnJvclwiKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVVuaWZvcm1XcmFwcGVyXG5cbi8vQmluZHMgYSBmdW5jdGlvbiBhbmQgcmV0dXJucyBhIHZhbHVlXG5mdW5jdGlvbiBpZGVudGl0eSh4KSB7XG4gIHZhciBjID0gbmV3IEZ1bmN0aW9uKCd5JywgJ3JldHVybiBmdW5jdGlvbigpe3JldHVybiB5fScpXG4gIHJldHVybiBjKHgpXG59XG5cbmZ1bmN0aW9uIG1ha2VWZWN0b3IobGVuZ3RoLCBmaWxsKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobGVuZ3RoKVxuICBmb3IodmFyIGk9MDsgaTxsZW5ndGg7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IGZpbGxcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbi8vQ3JlYXRlIHNoaW1zIGZvciB1bmlmb3Jtc1xuZnVuY3Rpb24gY3JlYXRlVW5pZm9ybVdyYXBwZXIoZ2wsIHdyYXBwZXIsIHVuaWZvcm1zLCBsb2NhdGlvbnMpIHtcblxuICBmdW5jdGlvbiBtYWtlR2V0dGVyKGluZGV4KSB7XG4gICAgdmFyIHByb2MgPSBuZXcgRnVuY3Rpb24oXG4gICAgICAgICdnbCdcbiAgICAgICwgJ3dyYXBwZXInXG4gICAgICAsICdsb2NhdGlvbnMnXG4gICAgICAsICdyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4gZ2wuZ2V0VW5pZm9ybSh3cmFwcGVyLnByb2dyYW0sbG9jYXRpb25zWycgKyBpbmRleCArICddKX0nKVxuICAgIHJldHVybiBwcm9jKGdsLCB3cmFwcGVyLCBsb2NhdGlvbnMpXG4gIH1cblxuICBmdW5jdGlvbiBtYWtlUHJvcFNldHRlcihwYXRoLCBpbmRleCwgdHlwZSkge1xuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdib29sJzpcbiAgICAgIGNhc2UgJ2ludCc6XG4gICAgICBjYXNlICdzYW1wbGVyMkQnOlxuICAgICAgY2FzZSAnc2FtcGxlckN1YmUnOlxuICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0xaShsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtMWYobG9jYXRpb25zWycgKyBpbmRleCArICddLG9iaicgKyBwYXRoICsgJyknXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgdmlkeCA9IHR5cGUuaW5kZXhPZigndmVjJylcbiAgICAgICAgaWYoMCA8PSB2aWR4ICYmIHZpZHggPD0gMSAmJiB0eXBlLmxlbmd0aCA9PT0gNCArIHZpZHgpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCBkYXRhIHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBzd2l0Y2godHlwZS5jaGFyQXQoMCkpIHtcbiAgICAgICAgICAgIGNhc2UgJ2InOlxuICAgICAgICAgICAgY2FzZSAnaSc6XG4gICAgICAgICAgICAgIHJldHVybiAnZ2wudW5pZm9ybScgKyBkICsgJ2l2KGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgIHJldHVybiAnZ2wudW5pZm9ybScgKyBkICsgJ2Z2KGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdVbnJlY29nbml6ZWQgZGF0YSB0eXBlIGZvciB2ZWN0b3IgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZih0eXBlLmluZGV4T2YoJ21hdCcpID09PSAwICYmIHR5cGUubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgdW5pZm9ybSBkaW1lbnNpb24gdHlwZSBmb3IgbWF0cml4ICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnZ2wudW5pZm9ybU1hdHJpeCcgKyBkICsgJ2Z2KGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxmYWxzZSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5rbm93biB1bmlmb3JtIGRhdGEgdHlwZSBmb3IgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBlbnVtZXJhdGVJbmRpY2VzKHByZWZpeCwgdHlwZSkge1xuICAgIGlmKHR5cGVvZiB0eXBlICE9PSAnb2JqZWN0Jykge1xuICAgICAgcmV0dXJuIFsgW3ByZWZpeCwgdHlwZV0gXVxuICAgIH1cbiAgICB2YXIgaW5kaWNlcyA9IFtdXG4gICAgZm9yKHZhciBpZCBpbiB0eXBlKSB7XG4gICAgICB2YXIgcHJvcCA9IHR5cGVbaWRdXG4gICAgICB2YXIgdHByZWZpeCA9IHByZWZpeFxuICAgICAgaWYocGFyc2VJbnQoaWQpICsgJycgPT09IGlkKSB7XG4gICAgICAgIHRwcmVmaXggKz0gJ1snICsgaWQgKyAnXSdcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRwcmVmaXggKz0gJy4nICsgaWRcbiAgICAgIH1cbiAgICAgIGlmKHR5cGVvZiBwcm9wID09PSAnb2JqZWN0Jykge1xuICAgICAgICBpbmRpY2VzLnB1c2guYXBwbHkoaW5kaWNlcywgZW51bWVyYXRlSW5kaWNlcyh0cHJlZml4LCBwcm9wKSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGljZXMucHVzaChbdHByZWZpeCwgcHJvcF0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpbmRpY2VzXG4gIH1cblxuICBmdW5jdGlvbiBtYWtlU2V0dGVyKHR5cGUpIHtcbiAgICB2YXIgY29kZSA9IFsgJ3JldHVybiBmdW5jdGlvbiB1cGRhdGVQcm9wZXJ0eShvYmopeycgXVxuICAgIHZhciBpbmRpY2VzID0gZW51bWVyYXRlSW5kaWNlcygnJywgdHlwZSlcbiAgICBmb3IodmFyIGk9MDsgaTxpbmRpY2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICB2YXIgaXRlbSA9IGluZGljZXNbaV1cbiAgICAgIHZhciBwYXRoID0gaXRlbVswXVxuICAgICAgdmFyIGlkeCAgPSBpdGVtWzFdXG4gICAgICBpZihsb2NhdGlvbnNbaWR4XSkge1xuICAgICAgICBjb2RlLnB1c2gobWFrZVByb3BTZXR0ZXIocGF0aCwgaWR4LCB1bmlmb3Jtc1tpZHhdLnR5cGUpKVxuICAgICAgfVxuICAgIH1cbiAgICBjb2RlLnB1c2goJ3JldHVybiBvYmp9JylcbiAgICB2YXIgcHJvYyA9IG5ldyBGdW5jdGlvbignZ2wnLCAnbG9jYXRpb25zJywgY29kZS5qb2luKCdcXG4nKSlcbiAgICByZXR1cm4gcHJvYyhnbCwgbG9jYXRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gZGVmYXVsdFZhbHVlKHR5cGUpIHtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgICAgY2FzZSAnaW50JzpcbiAgICAgIGNhc2UgJ3NhbXBsZXIyRCc6XG4gICAgICBjYXNlICdzYW1wbGVyQ3ViZSc6XG4gICAgICAgIHJldHVybiAwXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAwLjBcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHZhciB2aWR4ID0gdHlwZS5pbmRleE9mKCd2ZWMnKVxuICAgICAgICBpZigwIDw9IHZpZHggJiYgdmlkeCA8PSAxICYmIHR5cGUubGVuZ3RoID09PSA0ICsgdmlkeCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIGRhdGEgdHlwZScpXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKHR5cGUuY2hhckF0KDApID09PSAnYicpIHtcbiAgICAgICAgICAgIHJldHVybiBtYWtlVmVjdG9yKGQsIGZhbHNlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWFrZVZlY3RvcihkLCAwKVxuICAgICAgICB9IGVsc2UgaWYodHlwZS5pbmRleE9mKCdtYXQnKSA9PT0gMCAmJiB0eXBlLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIHVuaWZvcm0gZGltZW5zaW9uIHR5cGUgZm9yIG1hdHJpeCAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gbWFrZVZlY3RvcihkKmQsIDApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdVbmtub3duIHVuaWZvcm0gZGF0YSB0eXBlIGZvciAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3JlUHJvcGVydHkob2JqLCBwcm9wLCB0eXBlKSB7XG4gICAgaWYodHlwZW9mIHR5cGUgPT09ICdvYmplY3QnKSB7XG4gICAgICB2YXIgY2hpbGQgPSBwcm9jZXNzT2JqZWN0KHR5cGUpXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB7XG4gICAgICAgIGdldDogaWRlbnRpdHkoY2hpbGQpLFxuICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodHlwZSksXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmKGxvY2F0aW9uc1t0eXBlXSkge1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCB7XG4gICAgICAgICAgZ2V0OiBtYWtlR2V0dGVyKHR5cGUpLFxuICAgICAgICAgIHNldDogbWFrZVNldHRlcih0eXBlKSxcbiAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9ialtwcm9wXSA9IGRlZmF1bHRWYWx1ZSh1bmlmb3Jtc1t0eXBlXS50eXBlKVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHByb2Nlc3NPYmplY3Qob2JqKSB7XG4gICAgdmFyIHJlc3VsdFxuICAgIGlmKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgICAgcmVzdWx0ID0gbmV3IEFycmF5KG9iai5sZW5ndGgpXG4gICAgICBmb3IodmFyIGk9MDsgaTxvYmoubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgc3RvcmVQcm9wZXJ0eShyZXN1bHQsIGksIG9ialtpXSlcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0ID0ge31cbiAgICAgIGZvcih2YXIgaWQgaW4gb2JqKSB7XG4gICAgICAgIHN0b3JlUHJvcGVydHkocmVzdWx0LCBpZCwgb2JqW2lkXSlcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdFxuICB9XG5cbiAgLy9SZXR1cm4gZGF0YVxuICB2YXIgY29hbGxlc2NlZCA9IGNvYWxsZXNjZVVuaWZvcm1zKHVuaWZvcm1zLCB0cnVlKVxuICByZXR1cm4ge1xuICAgIGdldDogaWRlbnRpdHkocHJvY2Vzc09iamVjdChjb2FsbGVzY2VkKSksXG4gICAgc2V0OiBtYWtlU2V0dGVyKGNvYWxsZXNjZWQpLFxuICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgY29uZmlndXJhYmxlOiB0cnVlXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvY3JlYXRlLXVuaWZvcm1zLmpzXG4vLyBtb2R1bGUgaWQgPSAxNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUF0dHJpYnV0ZVdyYXBwZXJcblxudmFyIEdMRXJyb3IgPSByZXF1aXJlKFwiLi9HTEVycm9yXCIpXG5cbmZ1bmN0aW9uIFNoYWRlckF0dHJpYnV0ZShcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBpbmRleFxuICAsIGxvY2F0aW9uc1xuICAsIGRpbWVuc2lvblxuICAsIGNvbnN0RnVuYykge1xuICB0aGlzLl9nbCAgICAgICAgPSBnbFxuICB0aGlzLl93cmFwcGVyICAgPSB3cmFwcGVyXG4gIHRoaXMuX2luZGV4ICAgICA9IGluZGV4XG4gIHRoaXMuX2xvY2F0aW9ucyA9IGxvY2F0aW9uc1xuICB0aGlzLl9kaW1lbnNpb24gPSBkaW1lbnNpb25cbiAgdGhpcy5fY29uc3RGdW5jID0gY29uc3RGdW5jXG59XG5cbnZhciBwcm90byA9IFNoYWRlckF0dHJpYnV0ZS5wcm90b3R5cGVcblxucHJvdG8ucG9pbnRlciA9IGZ1bmN0aW9uIHNldEF0dHJpYlBvaW50ZXIoXG4gICAgdHlwZVxuICAsIG5vcm1hbGl6ZWRcbiAgLCBzdHJpZGVcbiAgLCBvZmZzZXQpIHtcblxuICB2YXIgc2VsZiAgICAgID0gdGhpc1xuICB2YXIgZ2wgICAgICAgID0gc2VsZi5fZ2xcbiAgdmFyIGxvY2F0aW9uICA9IHNlbGYuX2xvY2F0aW9uc1tzZWxmLl9pbmRleF1cblxuICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgbG9jYXRpb25cbiAgICAsIHNlbGYuX2RpbWVuc2lvblxuICAgICwgdHlwZSB8fCBnbC5GTE9BVFxuICAgICwgISFub3JtYWxpemVkXG4gICAgLCBzdHJpZGUgfHwgMFxuICAgICwgb2Zmc2V0IHx8IDApXG4gIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uKVxufVxuXG5wcm90by5zZXQgPSBmdW5jdGlvbih4MCwgeDEsIHgyLCB4Mykge1xuICByZXR1cm4gdGhpcy5fY29uc3RGdW5jKHRoaXMuX2xvY2F0aW9uc1t0aGlzLl9pbmRleF0sIHgwLCB4MSwgeDIsIHgzKVxufVxuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sICdsb2NhdGlvbicsIHtcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbG9jYXRpb25zW3RoaXMuX2luZGV4XVxuICB9XG4gICwgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgaWYodiAhPT0gdGhpcy5fbG9jYXRpb25zW3RoaXMuX2luZGV4XSkge1xuICAgICAgdGhpcy5fbG9jYXRpb25zW3RoaXMuX2luZGV4XSA9IHZ8MFxuICAgICAgdGhpcy5fd3JhcHBlci5wcm9ncmFtID0gbnVsbFxuICAgIH1cbiAgICByZXR1cm4gdnwwXG4gIH1cbn0pXG5cbi8vQWRkcyBhIHZlY3RvciBhdHRyaWJ1dGUgdG8gb2JqXG5mdW5jdGlvbiBhZGRWZWN0b3JBdHRyaWJ1dGUoXG4gICAgZ2xcbiAgLCB3cmFwcGVyXG4gICwgaW5kZXhcbiAgLCBsb2NhdGlvbnNcbiAgLCBkaW1lbnNpb25cbiAgLCBvYmpcbiAgLCBuYW1lKSB7XG5cbiAgLy9Db25zdHJ1Y3QgY29uc3RhbnQgZnVuY3Rpb25cbiAgdmFyIGNvbnN0RnVuY0FyZ3MgPSBbICdnbCcsICd2JyBdXG4gIHZhciB2YXJOYW1lcyA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29uc3RGdW5jQXJncy5wdXNoKCd4JytpKVxuICAgIHZhck5hbWVzLnB1c2goJ3gnK2kpXG4gIH1cbiAgY29uc3RGdW5jQXJncy5wdXNoKFxuICAgICdpZih4MC5sZW5ndGg9PT12b2lkIDApe3JldHVybiBnbC52ZXJ0ZXhBdHRyaWInICtcbiAgICBkaW1lbnNpb24gKyAnZih2LCcgK1xuICAgIHZhck5hbWVzLmpvaW4oKSArXG4gICAgJyl9ZWxzZXtyZXR1cm4gZ2wudmVydGV4QXR0cmliJyArXG4gICAgZGltZW5zaW9uICtcbiAgICAnZnYodix4MCl9JylcbiAgdmFyIGNvbnN0RnVuYyA9IEZ1bmN0aW9uLmFwcGx5KG51bGwsIGNvbnN0RnVuY0FyZ3MpXG5cbiAgLy9DcmVhdGUgYXR0cmlidXRlIHdyYXBwZXJcbiAgdmFyIGF0dHIgPSBuZXcgU2hhZGVyQXR0cmlidXRlKFxuICAgICAgZ2xcbiAgICAsIHdyYXBwZXJcbiAgICAsIGluZGV4XG4gICAgLCBsb2NhdGlvbnNcbiAgICAsIGRpbWVuc2lvblxuICAgICwgY29uc3RGdW5jKVxuXG4gIC8vQ3JlYXRlIGFjY2Vzc29yXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbnNbaW5kZXhdKVxuICAgICAgY29uc3RGdW5jKGdsLCBsb2NhdGlvbnNbaW5kZXhdLCB4KVxuICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLCBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGF0dHJcbiAgICB9XG4gICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGFkZE1hdHJpeEF0dHJpYnV0ZShcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBpbmRleFxuICAsIGxvY2F0aW9uc1xuICAsIGRpbWVuc2lvblxuICAsIG9ialxuICAsIG5hbWUpIHtcblxuICB2YXIgcGFydHMgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICB2YXIgYXR0cnMgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICAgICAgZ2xcbiAgICAgICwgd3JhcHBlclxuICAgICAgLCBpbmRleFtpXVxuICAgICAgLCBsb2NhdGlvbnNcbiAgICAgICwgZGltZW5zaW9uXG4gICAgICAsIHBhcnRzXG4gICAgICAsIGkpXG4gICAgYXR0cnNbaV0gPSBwYXJ0c1tpXVxuICB9XG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBhcnRzLCAnbG9jYXRpb24nLCB7XG4gICAgc2V0OiBmdW5jdGlvbih2KSB7XG4gICAgICBpZihBcnJheS5pc0FycmF5KHYpKSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICAgICAgYXR0cnNbaV0ubG9jYXRpb24gPSB2W2ldXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICAgICAgYXR0cnNbaV0ubG9jYXRpb24gPSB2ICsgaVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdlxuICAgIH1cbiAgICAsIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICAgIHJlc3VsdFtpXSA9IGxvY2F0aW9uc1tpbmRleFtpXV1cbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRcbiAgICB9XG4gICAgLCBlbnVtZXJhYmxlOiB0cnVlXG4gIH0pXG5cbiAgcGFydHMucG9pbnRlciA9IGZ1bmN0aW9uKHR5cGUsIG5vcm1hbGl6ZWQsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gICAgdHlwZSAgICAgICA9IHR5cGUgfHwgZ2wuRkxPQVRcbiAgICBub3JtYWxpemVkID0gISFub3JtYWxpemVkXG4gICAgc3RyaWRlICAgICA9IHN0cmlkZSB8fCAoZGltZW5zaW9uICogZGltZW5zaW9uKVxuICAgIG9mZnNldCAgICAgPSBvZmZzZXQgfHwgMFxuICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICB2YXIgbG9jYXRpb24gPSBsb2NhdGlvbnNbaW5kZXhbaV1dXG4gICAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKFxuICAgICAgICAgICAgbG9jYXRpb25cbiAgICAgICAgICAsIGRpbWVuc2lvblxuICAgICAgICAgICwgdHlwZVxuICAgICAgICAgICwgbm9ybWFsaXplZFxuICAgICAgICAgICwgc3RyaWRlXG4gICAgICAgICAgLCBvZmZzZXQgKyBpICogZGltZW5zaW9uKVxuICAgICAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pXG4gICAgfVxuICB9XG5cbiAgdmFyIHNjcmF0Y2ggPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICB2YXIgdmVydGV4QXR0cmliID0gZ2xbJ3ZlcnRleEF0dHJpYicgKyBkaW1lbnNpb24gKyAnZnYnXVxuXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIG5hbWUsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKHgpIHtcbiAgICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICAgIHZhciBsb2MgPSBsb2NhdGlvbnNbaW5kZXhbaV1dXG4gICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2MpXG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoeFswXSkpIHtcbiAgICAgICAgICB2ZXJ0ZXhBdHRyaWIuY2FsbChnbCwgbG9jLCB4W2ldKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPGRpbWVuc2lvbjsgKytqKSB7XG4gICAgICAgICAgICBzY3JhdGNoW2pdID0geFtkaW1lbnNpb24qaSArIGpdXG4gICAgICAgICAgfVxuICAgICAgICAgIHZlcnRleEF0dHJpYi5jYWxsKGdsLCBsb2MsIHNjcmF0Y2gpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB4XG4gICAgfVxuICAgICwgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwYXJ0c1xuICAgIH1cbiAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgfSlcbn1cblxuLy9DcmVhdGUgc2hpbXMgZm9yIGF0dHJpYnV0ZXNcbmZ1bmN0aW9uIGNyZWF0ZUF0dHJpYnV0ZVdyYXBwZXIoXG4gICAgZ2xcbiAgLCB3cmFwcGVyXG4gICwgYXR0cmlidXRlc1xuICAsIGxvY2F0aW9ucykge1xuXG4gIHZhciBvYmogPSB7fVxuICBmb3IodmFyIGk9MCwgbj1hdHRyaWJ1dGVzLmxlbmd0aDsgaTxuOyArK2kpIHtcblxuICAgIHZhciBhID0gYXR0cmlidXRlc1tpXVxuICAgIHZhciBuYW1lID0gYS5uYW1lXG4gICAgdmFyIHR5cGUgPSBhLnR5cGVcbiAgICB2YXIgbG9jcyA9IGEubG9jYXRpb25zXG5cbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICBjYXNlICdpbnQnOlxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICBhZGRWZWN0b3JBdHRyaWJ1dGUoXG4gICAgICAgICAgICBnbFxuICAgICAgICAgICwgd3JhcHBlclxuICAgICAgICAgICwgbG9jc1swXVxuICAgICAgICAgICwgbG9jYXRpb25zXG4gICAgICAgICAgLCAxXG4gICAgICAgICAgLCBvYmpcbiAgICAgICAgICAsIG5hbWUpXG4gICAgICBicmVha1xuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZih0eXBlLmluZGV4T2YoJ3ZlYycpID49IDApIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCBkYXRhIHR5cGUgZm9yIGF0dHJpYnV0ZSAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhZGRWZWN0b3JBdHRyaWJ1dGUoXG4gICAgICAgICAgICAgIGdsXG4gICAgICAgICAgICAsIHdyYXBwZXJcbiAgICAgICAgICAgICwgbG9jc1swXVxuICAgICAgICAgICAgLCBsb2NhdGlvbnNcbiAgICAgICAgICAgICwgZFxuICAgICAgICAgICAgLCBvYmpcbiAgICAgICAgICAgICwgbmFtZSlcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUuaW5kZXhPZignbWF0JykgPj0gMCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIGRhdGEgdHlwZSBmb3IgYXR0cmlidXRlICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZE1hdHJpeEF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgZ2xcbiAgICAgICAgICAgICwgd3JhcHBlclxuICAgICAgICAgICAgLCBsb2NzXG4gICAgICAgICAgICAsIGxvY2F0aW9uc1xuICAgICAgICAgICAgLCBkXG4gICAgICAgICAgICAsIG9ialxuICAgICAgICAgICAgLCBuYW1lKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5rbm93biBkYXRhIHR5cGUgZm9yIGF0dHJpYnV0ZSAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICB9XG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS1hdHRyaWJ1dGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAxNlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLnNoYWRlciAgID0gZ2V0U2hhZGVyUmVmZXJlbmNlXG5leHBvcnRzLnByb2dyYW0gID0gY3JlYXRlUHJvZ3JhbVxuXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcbnZhciBmb3JtYXRDb21waWxlckVycm9yID0gcmVxdWlyZSgnZ2wtZm9ybWF0LWNvbXBpbGVyLWVycm9yJyk7XG5cbnZhciB3ZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnd2Vha21hcC1zaGltJykgOiBXZWFrTWFwXG52YXIgQ0FDSEUgPSBuZXcgd2Vha01hcCgpXG5cbnZhciBTSEFERVJfQ09VTlRFUiA9IDBcblxuZnVuY3Rpb24gU2hhZGVyUmVmZXJlbmNlKGlkLCBzcmMsIHR5cGUsIHNoYWRlciwgcHJvZ3JhbXMsIGNvdW50LCBjYWNoZSkge1xuICB0aGlzLmlkICAgICAgID0gaWRcbiAgdGhpcy5zcmMgICAgICA9IHNyY1xuICB0aGlzLnR5cGUgICAgID0gdHlwZVxuICB0aGlzLnNoYWRlciAgID0gc2hhZGVyXG4gIHRoaXMuY291bnQgICAgPSBjb3VudFxuICB0aGlzLnByb2dyYW1zID0gW11cbiAgdGhpcy5jYWNoZSAgICA9IGNhY2hlXG59XG5cblNoYWRlclJlZmVyZW5jZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZigtLXRoaXMuY291bnQgPT09IDApIHtcbiAgICB2YXIgY2FjaGUgICAgPSB0aGlzLmNhY2hlXG4gICAgdmFyIGdsICAgICAgID0gY2FjaGUuZ2xcblxuICAgIC8vUmVtb3ZlIHByb2dyYW0gcmVmZXJlbmNlc1xuICAgIHZhciBwcm9ncmFtcyA9IHRoaXMucHJvZ3JhbXNcbiAgICBmb3IodmFyIGk9MCwgbj1wcm9ncmFtcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICB2YXIgcCA9IGNhY2hlLnByb2dyYW1zW3Byb2dyYW1zW2ldXVxuICAgICAgaWYocCkge1xuICAgICAgICBkZWxldGUgY2FjaGUucHJvZ3JhbXNbaV1cbiAgICAgICAgZ2wuZGVsZXRlUHJvZ3JhbShwKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vUmVtb3ZlIHNoYWRlciByZWZlcmVuY2VcbiAgICBnbC5kZWxldGVTaGFkZXIodGhpcy5zaGFkZXIpXG4gICAgZGVsZXRlIGNhY2hlLnNoYWRlcnNbKHRoaXMudHlwZSA9PT0gZ2wuRlJBR01FTlRfU0hBREVSKXwwXVt0aGlzLnNyY11cbiAgfVxufVxuXG5mdW5jdGlvbiBDb250ZXh0Q2FjaGUoZ2wpIHtcbiAgdGhpcy5nbCAgICAgICA9IGdsXG4gIHRoaXMuc2hhZGVycyAgPSBbe30sIHt9XVxuICB0aGlzLnByb2dyYW1zID0ge31cbn1cblxudmFyIHByb3RvID0gQ29udGV4dENhY2hlLnByb3RvdHlwZVxuXG5mdW5jdGlvbiBjb21waWxlU2hhZGVyKGdsLCB0eXBlLCBzcmMpIHtcbiAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICBpZighZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgdmFyIGVyckxvZyA9IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBmbXQgPSBmb3JtYXRDb21waWxlckVycm9yKGVyckxvZywgc3JjLCB0eXBlKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgY29uc29sZS53YXJuKCdGYWlsZWQgdG8gZm9ybWF0IGNvbXBpbGVyIGVycm9yOiAnICsgZSk7XG4gICAgICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgJ0Vycm9yIGNvbXBpbGluZyBzaGFkZXI6XFxuJyArIGVyckxvZylcbiAgICB9XG4gICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCBmbXQuc2hvcnQsIGZtdC5sb25nKVxuICB9XG4gIHJldHVybiBzaGFkZXJcbn1cblxucHJvdG8uZ2V0U2hhZGVyUmVmZXJlbmNlID0gZnVuY3Rpb24odHlwZSwgc3JjKSB7XG4gIHZhciBnbCAgICAgID0gdGhpcy5nbFxuICB2YXIgc2hhZGVycyA9IHRoaXMuc2hhZGVyc1sodHlwZSA9PT0gZ2wuRlJBR01FTlRfU0hBREVSKXwwXVxuICB2YXIgc2hhZGVyICA9IHNoYWRlcnNbc3JjXVxuICBpZighc2hhZGVyIHx8ICFnbC5pc1NoYWRlcihzaGFkZXIuc2hhZGVyKSkge1xuICAgIHZhciBzaGFkZXJPYmogPSBjb21waWxlU2hhZGVyKGdsLCB0eXBlLCBzcmMpXG4gICAgc2hhZGVyID0gc2hhZGVyc1tzcmNdID0gbmV3IFNoYWRlclJlZmVyZW5jZShcbiAgICAgIFNIQURFUl9DT1VOVEVSKyssXG4gICAgICBzcmMsXG4gICAgICB0eXBlLFxuICAgICAgc2hhZGVyT2JqLFxuICAgICAgW10sXG4gICAgICAxLFxuICAgICAgdGhpcylcbiAgfSBlbHNlIHtcbiAgICBzaGFkZXIuY291bnQgKz0gMVxuICB9XG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gbGlua1Byb2dyYW0oZ2wsIHZzaGFkZXIsIGZzaGFkZXIsIGF0dHJpYnMsIGxvY2F0aW9ucykge1xuICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKVxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnNoYWRlcilcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZzaGFkZXIpXG4gIGZvcih2YXIgaT0wOyBpPGF0dHJpYnMubGVuZ3RoOyArK2kpIHtcbiAgICBnbC5iaW5kQXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbG9jYXRpb25zW2ldLCBhdHRyaWJzW2ldKVxuICB9XG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pXG4gIGlmKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgIHZhciBlcnJMb2cgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKVxuICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgJ0Vycm9yIGxpbmtpbmcgcHJvZ3JhbTogJyArIGVyckxvZylcbiAgfVxuICByZXR1cm4gcHJvZ3JhbVxufVxuXG5wcm90by5nZXRQcm9ncmFtID0gZnVuY3Rpb24odnJlZiwgZnJlZiwgYXR0cmlicywgbG9jYXRpb25zKSB7XG4gIHZhciB0b2tlbiA9IFt2cmVmLmlkLCBmcmVmLmlkLCBhdHRyaWJzLmpvaW4oJzonKSwgbG9jYXRpb25zLmpvaW4oJzonKV0uam9pbignQCcpXG4gIHZhciBwcm9nICA9IHRoaXMucHJvZ3JhbXNbdG9rZW5dXG4gIGlmKCFwcm9nIHx8ICF0aGlzLmdsLmlzUHJvZ3JhbShwcm9nKSkge1xuICAgIHRoaXMucHJvZ3JhbXNbdG9rZW5dID0gcHJvZyA9IGxpbmtQcm9ncmFtKFxuICAgICAgdGhpcy5nbCxcbiAgICAgIHZyZWYuc2hhZGVyLFxuICAgICAgZnJlZi5zaGFkZXIsXG4gICAgICBhdHRyaWJzLFxuICAgICAgbG9jYXRpb25zKVxuICAgIHZyZWYucHJvZ3JhbXMucHVzaCh0b2tlbilcbiAgICBmcmVmLnByb2dyYW1zLnB1c2godG9rZW4pXG4gIH1cbiAgcmV0dXJuIHByb2dcbn1cblxuZnVuY3Rpb24gZ2V0Q2FjaGUoZ2wpIHtcbiAgdmFyIGN0eENhY2hlID0gQ0FDSEUuZ2V0KGdsKVxuICBpZighY3R4Q2FjaGUpIHtcbiAgICBjdHhDYWNoZSA9IG5ldyBDb250ZXh0Q2FjaGUoZ2wpXG4gICAgQ0FDSEUuc2V0KGdsLCBjdHhDYWNoZSlcbiAgfVxuICByZXR1cm4gY3R4Q2FjaGVcbn1cblxuZnVuY3Rpb24gZ2V0U2hhZGVyUmVmZXJlbmNlKGdsLCB0eXBlLCBzcmMpIHtcbiAgcmV0dXJuIGdldENhY2hlKGdsKS5nZXRTaGFkZXJSZWZlcmVuY2UodHlwZSwgc3JjKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2cmVmLCBmcmVmLCBhdHRyaWJzLCBsb2NhdGlvbnMpIHtcbiAgcmV0dXJuIGdldENhY2hlKGdsKS5nZXRQcm9ncmFtKHZyZWYsIGZyZWYsIGF0dHJpYnMsIGxvY2F0aW9ucylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvc2hhZGVyLWNhY2hlLmpzXG4vLyBtb2R1bGUgaWQgPSAxN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlxudmFyIHNwcmludGYgPSByZXF1aXJlKCdzcHJpbnRmLWpzJykuc3ByaW50ZjtcbnZhciBnbENvbnN0YW50cyA9IHJlcXVpcmUoJ2dsLWNvbnN0YW50cy9sb29rdXAnKTtcbnZhciBzaGFkZXJOYW1lID0gcmVxdWlyZSgnZ2xzbC1zaGFkZXItbmFtZScpO1xudmFyIGFkZExpbmVOdW1iZXJzID0gcmVxdWlyZSgnYWRkLWxpbmUtbnVtYmVycycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZvcm1hdENvbXBpbGVyRXJyb3I7XG5cbmZ1bmN0aW9uIGZvcm1hdENvbXBpbGVyRXJyb3IoZXJyTG9nLCBzcmMsIHR5cGUpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBuYW1lID0gc2hhZGVyTmFtZShzcmMpIHx8ICdvZiB1bmtub3duIG5hbWUgKHNlZSBucG0gZ2xzbC1zaGFkZXItbmFtZSknO1xuXG4gICAgdmFyIHR5cGVOYW1lID0gJ3Vua25vd24gdHlwZSc7XG4gICAgaWYgKHR5cGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0eXBlTmFtZSA9IHR5cGUgPT09IGdsQ29uc3RhbnRzLkZSQUdNRU5UX1NIQURFUiA/ICdmcmFnbWVudCcgOiAndmVydGV4J1xuICAgIH1cblxuICAgIHZhciBsb25nRm9ybSA9IHNwcmludGYoJ0Vycm9yIGNvbXBpbGluZyAlcyBzaGFkZXIgJXM6XFxuJywgdHlwZU5hbWUsIG5hbWUpO1xuICAgIHZhciBzaG9ydEZvcm0gPSBzcHJpbnRmKFwiJXMlc1wiLCBsb25nRm9ybSwgZXJyTG9nKTtcblxuICAgIHZhciBlcnJvclN0cmluZ3MgPSBlcnJMb2cuc3BsaXQoJ1xcbicpO1xuICAgIHZhciBlcnJvcnMgPSB7fTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZXJyb3JTdHJpbmdzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBlcnJvclN0cmluZyA9IGVycm9yU3RyaW5nc1tpXTtcbiAgICAgICAgaWYgKGVycm9yU3RyaW5nID09PSAnJyB8fCBlcnJvclN0cmluZyA9PT0gXCJcXDBcIikgY29udGludWU7XG4gICAgICAgIHZhciBsaW5lTm8gPSBwYXJzZUludChlcnJvclN0cmluZy5zcGxpdCgnOicpWzJdKTtcbiAgICAgICAgaWYgKGlzTmFOKGxpbmVObykpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihzcHJpbnRmKCdDb3VsZCBub3QgcGFyc2UgZXJyb3I6ICVzJywgZXJyb3JTdHJpbmcpKTtcbiAgICAgICAgfVxuICAgICAgICBlcnJvcnNbbGluZU5vXSA9IGVycm9yU3RyaW5nO1xuICAgIH1cblxuICAgIHZhciBsaW5lcyA9IGFkZExpbmVOdW1iZXJzKHNyYykuc3BsaXQoJ1xcbicpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAoIWVycm9yc1tpKzNdICYmICFlcnJvcnNbaSsyXSAmJiAhZXJyb3JzW2krMV0pIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICBsb25nRm9ybSArPSBsaW5lICsgJ1xcbic7XG4gICAgICAgIGlmIChlcnJvcnNbaSsxXSkge1xuICAgICAgICAgICAgdmFyIGUgPSBlcnJvcnNbaSsxXTtcbiAgICAgICAgICAgIGUgPSBlLnN1YnN0cihlLnNwbGl0KCc6JywgMykuam9pbignOicpLmxlbmd0aCArIDEpLnRyaW0oKTtcbiAgICAgICAgICAgIGxvbmdGb3JtICs9IHNwcmludGYoJ15eXiAlc1xcblxcbicsIGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgbG9uZzogbG9uZ0Zvcm0udHJpbSgpLFxuICAgICAgICBzaG9ydDogc2hvcnRGb3JtLnRyaW0oKVxuICAgIH07XG59XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWZvcm1hdC1jb21waWxlci1lcnJvci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiBnbG9iYWwgd2luZG93LCBleHBvcnRzLCBkZWZpbmUgKi9cblxuIWZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHJlID0ge1xuICAgICAgICBub3Rfc3RyaW5nOiAvW15zXS8sXG4gICAgICAgIG5vdF9ib29sOiAvW150XS8sXG4gICAgICAgIG5vdF90eXBlOiAvW15UXS8sXG4gICAgICAgIG5vdF9wcmltaXRpdmU6IC9bXnZdLyxcbiAgICAgICAgbnVtYmVyOiAvW2RpZWZnXS8sXG4gICAgICAgIG51bWVyaWNfYXJnOiAvW2JjZGllZmd1eFhdLyxcbiAgICAgICAganNvbjogL1tqXS8sXG4gICAgICAgIG5vdF9qc29uOiAvW15qXS8sXG4gICAgICAgIHRleHQ6IC9eW15cXHgyNV0rLyxcbiAgICAgICAgbW9kdWxvOiAvXlxceDI1ezJ9LyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IC9eXFx4MjUoPzooWzEtOV1cXGQqKVxcJHxcXCgoW15cXCldKylcXCkpPyhcXCspPygwfCdbXiRdKT8oLSk/KFxcZCspPyg/OlxcLihcXGQrKSk/KFtiLWdpam9zdFR1dnhYXSkvLFxuICAgICAgICBrZXk6IC9eKFthLXpfXVthLXpfXFxkXSopL2ksXG4gICAgICAgIGtleV9hY2Nlc3M6IC9eXFwuKFthLXpfXVthLXpfXFxkXSopL2ksXG4gICAgICAgIGluZGV4X2FjY2VzczogL15cXFsoXFxkKylcXF0vLFxuICAgICAgICBzaWduOiAvXltcXCtcXC1dL1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwcmludGYoa2V5KSB7XG4gICAgICAgIC8vIGBhcmd1bWVudHNgIGlzIG5vdCBhbiBhcnJheSwgYnV0IHNob3VsZCBiZSBmaW5lIGZvciB0aGlzIGNhbGxcbiAgICAgICAgcmV0dXJuIHNwcmludGZfZm9ybWF0KHNwcmludGZfcGFyc2Uoa2V5KSwgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZzcHJpbnRmKGZtdCwgYXJndikge1xuICAgICAgICByZXR1cm4gc3ByaW50Zi5hcHBseShudWxsLCBbZm10XS5jb25jYXQoYXJndiB8fCBbXSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3ByaW50Zl9mb3JtYXQocGFyc2VfdHJlZSwgYXJndikge1xuICAgICAgICB2YXIgY3Vyc29yID0gMSwgdHJlZV9sZW5ndGggPSBwYXJzZV90cmVlLmxlbmd0aCwgYXJnLCBvdXRwdXQgPSAnJywgaSwgaywgbWF0Y2gsIHBhZCwgcGFkX2NoYXJhY3RlciwgcGFkX2xlbmd0aCwgaXNfcG9zaXRpdmUsIHNpZ25cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRyZWVfbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VfdHJlZVtpXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gcGFyc2VfdHJlZVtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXJzZV90cmVlW2ldKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcGFyc2VfdHJlZVtpXSAvLyBjb252ZW5pZW5jZSBwdXJwb3NlcyBvbmx5XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzJdKSB7IC8vIGtleXdvcmQgYXJndW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3JdXG4gICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBtYXRjaFsyXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhcmcuaGFzT3duUHJvcGVydHkobWF0Y2hbMl1ba10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNwcmludGYoJ1tzcHJpbnRmXSBwcm9wZXJ0eSBcIiVzXCIgZG9lcyBub3QgZXhpc3QnLCBtYXRjaFsyXVtrXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmdbbWF0Y2hbMl1ba11dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hbMV0pIHsgLy8gcG9zaXRpb25hbCBhcmd1bWVudCAoZXhwbGljaXQpXG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbbWF0Y2hbMV1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChpbXBsaWNpdClcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3IrK11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubm90X3R5cGUudGVzdChtYXRjaFs4XSkgJiYgcmUubm90X3ByaW1pdGl2ZS50ZXN0KG1hdGNoWzhdKSAmJiBhcmcgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5udW1lcmljX2FyZy50ZXN0KG1hdGNoWzhdKSAmJiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgJiYgaXNOYU4oYXJnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzcHJpbnRmKCdbc3ByaW50Zl0gZXhwZWN0aW5nIG51bWJlciBidXQgZm91bmQgJVQnLCBhcmcpKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5udW1iZXIudGVzdChtYXRjaFs4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNfcG9zaXRpdmUgPSBhcmcgPj0gMFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAobWF0Y2hbOF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKS50b1N0cmluZygyKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGFyZywgMTApKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2onOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gSlNPTi5zdHJpbmdpZnkoYXJnLCBudWxsLCBtYXRjaFs2XSA/IHBhcnNlSW50KG1hdGNoWzZdKSA6IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gcGFyc2VGbG9hdChhcmcpLnRvRXhwb25lbnRpYWwobWF0Y2hbN10pIDogcGFyc2VGbG9hdChhcmcpLnRvRXhwb25lbnRpYWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaFs3XSA/IHBhcnNlRmxvYXQoYXJnKS50b0ZpeGVkKG1hdGNoWzddKSA6IHBhcnNlRmxvYXQoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaFs3XSA/IFN0cmluZyhOdW1iZXIoYXJnLnRvUHJlY2lzaW9uKG1hdGNoWzddKSkpIDogcGFyc2VGbG9hdChhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChwYXJzZUludChhcmcsIDEwKSA+Pj4gMCkudG9TdHJpbmcoOClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gU3RyaW5nKGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcoISFhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKSA+Pj4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlLmpzb24udGVzdChtYXRjaFs4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGFyZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlLm51bWJlci50ZXN0KG1hdGNoWzhdKSAmJiAoIWlzX3Bvc2l0aXZlIHx8IG1hdGNoWzNdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IGlzX3Bvc2l0aXZlID8gJysnIDogJy0nXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcudG9TdHJpbmcoKS5yZXBsYWNlKHJlLnNpZ24sICcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFkX2NoYXJhY3RlciA9IG1hdGNoWzRdID8gbWF0Y2hbNF0gPT09ICcwJyA/ICcwJyA6IG1hdGNoWzRdLmNoYXJBdCgxKSA6ICcgJ1xuICAgICAgICAgICAgICAgICAgICBwYWRfbGVuZ3RoID0gbWF0Y2hbNl0gLSAoc2lnbiArIGFyZykubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHBhZCA9IG1hdGNoWzZdID8gKHBhZF9sZW5ndGggPiAwID8gcGFkX2NoYXJhY3Rlci5yZXBlYXQocGFkX2xlbmd0aCkgOiAnJykgOiAnJ1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbWF0Y2hbNV0gPyBzaWduICsgYXJnICsgcGFkIDogKHBhZF9jaGFyYWN0ZXIgPT09ICcwJyA/IHNpZ24gKyBwYWQgKyBhcmcgOiBwYWQgKyBzaWduICsgYXJnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgfVxuXG4gICAgdmFyIHNwcmludGZfY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmX3BhcnNlKGZtdCkge1xuICAgICAgICBpZiAoc3ByaW50Zl9jYWNoZVtmbXRdKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ByaW50Zl9jYWNoZVtmbXRdXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2ZtdCA9IGZtdCwgbWF0Y2gsIHBhcnNlX3RyZWUgPSBbXSwgYXJnX25hbWVzID0gMFxuICAgICAgICB3aGlsZSAoX2ZtdCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaCA9IHJlLnRleHQuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2hbMF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobWF0Y2ggPSByZS5tb2R1bG8uZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2goJyUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG1hdGNoID0gcmUucGxhY2Vob2xkZXIuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDFcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkX2xpc3QgPSBbXSwgcmVwbGFjZW1lbnRfZmllbGQgPSBtYXRjaFsyXSwgZmllbGRfbWF0Y2ggPSBbXVxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5LmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChyZXBsYWNlbWVudF9maWVsZCA9IHJlcGxhY2VtZW50X2ZpZWxkLnN1YnN0cmluZyhmaWVsZF9tYXRjaFswXS5sZW5ndGgpKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5X2FjY2Vzcy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoZmllbGRfbWF0Y2ggPSByZS5pbmRleF9hY2Nlc3MuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdID0gZmllbGRfbGlzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFyZ19uYW1lcyA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tzcHJpbnRmXSBtaXhpbmcgcG9zaXRpb25hbCBhbmQgbmFtZWQgcGxhY2Vob2xkZXJzIGlzIG5vdCAoeWV0KSBzdXBwb3J0ZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1tzcHJpbnRmXSB1bmV4cGVjdGVkIHBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mbXQgPSBfZm10LnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwcmludGZfY2FjaGVbZm10XSA9IHBhcnNlX3RyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleHBvcnQgdG8gZWl0aGVyIGJyb3dzZXIgb3Igbm9kZS5qc1xuICAgICAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIHF1b3RlLXByb3BzICovXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBleHBvcnRzWydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIGV4cG9ydHNbJ3ZzcHJpbnRmJ10gPSB2c3ByaW50ZlxuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93WydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIHdpbmRvd1sndnNwcmludGYnXSA9IHZzcHJpbnRmXG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICdzcHJpbnRmJzogc3ByaW50ZixcbiAgICAgICAgICAgICAgICAgICAgJ3ZzcHJpbnRmJzogdnNwcmludGZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgcXVvdGUtcHJvcHMgKi9cbn0oKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvc3ByaW50Zi1qcy9zcmMvc3ByaW50Zi5qc1xuLy8gbW9kdWxlIGlkID0gMTlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgZ2wxMCA9IHJlcXVpcmUoJy4vMS4wL251bWJlcnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvb2t1cENvbnN0YW50IChudW1iZXIpIHtcbiAgcmV0dXJuIGdsMTBbbnVtYmVyXVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzL2xvb2t1cC5qc1xuLy8gbW9kdWxlIGlkID0gMjBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgMDogJ05PTkUnLFxuICAxOiAnT05FJyxcbiAgMjogJ0xJTkVfTE9PUCcsXG4gIDM6ICdMSU5FX1NUUklQJyxcbiAgNDogJ1RSSUFOR0xFUycsXG4gIDU6ICdUUklBTkdMRV9TVFJJUCcsXG4gIDY6ICdUUklBTkdMRV9GQU4nLFxuICAyNTY6ICdERVBUSF9CVUZGRVJfQklUJyxcbiAgNTEyOiAnTkVWRVInLFxuICA1MTM6ICdMRVNTJyxcbiAgNTE0OiAnRVFVQUwnLFxuICA1MTU6ICdMRVFVQUwnLFxuICA1MTY6ICdHUkVBVEVSJyxcbiAgNTE3OiAnTk9URVFVQUwnLFxuICA1MTg6ICdHRVFVQUwnLFxuICA1MTk6ICdBTFdBWVMnLFxuICA3Njg6ICdTUkNfQ09MT1InLFxuICA3Njk6ICdPTkVfTUlOVVNfU1JDX0NPTE9SJyxcbiAgNzcwOiAnU1JDX0FMUEhBJyxcbiAgNzcxOiAnT05FX01JTlVTX1NSQ19BTFBIQScsXG4gIDc3MjogJ0RTVF9BTFBIQScsXG4gIDc3MzogJ09ORV9NSU5VU19EU1RfQUxQSEEnLFxuICA3NzQ6ICdEU1RfQ09MT1InLFxuICA3NzU6ICdPTkVfTUlOVVNfRFNUX0NPTE9SJyxcbiAgNzc2OiAnU1JDX0FMUEhBX1NBVFVSQVRFJyxcbiAgMTAyNDogJ1NURU5DSUxfQlVGRkVSX0JJVCcsXG4gIDEwMjg6ICdGUk9OVCcsXG4gIDEwMjk6ICdCQUNLJyxcbiAgMTAzMjogJ0ZST05UX0FORF9CQUNLJyxcbiAgMTI4MDogJ0lOVkFMSURfRU5VTScsXG4gIDEyODE6ICdJTlZBTElEX1ZBTFVFJyxcbiAgMTI4MjogJ0lOVkFMSURfT1BFUkFUSU9OJyxcbiAgMTI4NTogJ09VVF9PRl9NRU1PUlknLFxuICAxMjg2OiAnSU5WQUxJRF9GUkFNRUJVRkZFUl9PUEVSQVRJT04nLFxuICAyMzA0OiAnQ1cnLFxuICAyMzA1OiAnQ0NXJyxcbiAgMjg0OTogJ0xJTkVfV0lEVEgnLFxuICAyODg0OiAnQ1VMTF9GQUNFJyxcbiAgMjg4NTogJ0NVTExfRkFDRV9NT0RFJyxcbiAgMjg4NjogJ0ZST05UX0ZBQ0UnLFxuICAyOTI4OiAnREVQVEhfUkFOR0UnLFxuICAyOTI5OiAnREVQVEhfVEVTVCcsXG4gIDI5MzA6ICdERVBUSF9XUklURU1BU0snLFxuICAyOTMxOiAnREVQVEhfQ0xFQVJfVkFMVUUnLFxuICAyOTMyOiAnREVQVEhfRlVOQycsXG4gIDI5NjA6ICdTVEVOQ0lMX1RFU1QnLFxuICAyOTYxOiAnU1RFTkNJTF9DTEVBUl9WQUxVRScsXG4gIDI5NjI6ICdTVEVOQ0lMX0ZVTkMnLFxuICAyOTYzOiAnU1RFTkNJTF9WQUxVRV9NQVNLJyxcbiAgMjk2NDogJ1NURU5DSUxfRkFJTCcsXG4gIDI5NjU6ICdTVEVOQ0lMX1BBU1NfREVQVEhfRkFJTCcsXG4gIDI5NjY6ICdTVEVOQ0lMX1BBU1NfREVQVEhfUEFTUycsXG4gIDI5Njc6ICdTVEVOQ0lMX1JFRicsXG4gIDI5Njg6ICdTVEVOQ0lMX1dSSVRFTUFTSycsXG4gIDI5Nzg6ICdWSUVXUE9SVCcsXG4gIDMwMjQ6ICdESVRIRVInLFxuICAzMDQyOiAnQkxFTkQnLFxuICAzMDg4OiAnU0NJU1NPUl9CT1gnLFxuICAzMDg5OiAnU0NJU1NPUl9URVNUJyxcbiAgMzEwNjogJ0NPTE9SX0NMRUFSX1ZBTFVFJyxcbiAgMzEwNzogJ0NPTE9SX1dSSVRFTUFTSycsXG4gIDMzMTc6ICdVTlBBQ0tfQUxJR05NRU5UJyxcbiAgMzMzMzogJ1BBQ0tfQUxJR05NRU5UJyxcbiAgMzM3OTogJ01BWF9URVhUVVJFX1NJWkUnLFxuICAzMzg2OiAnTUFYX1ZJRVdQT1JUX0RJTVMnLFxuICAzNDA4OiAnU1VCUElYRUxfQklUUycsXG4gIDM0MTA6ICdSRURfQklUUycsXG4gIDM0MTE6ICdHUkVFTl9CSVRTJyxcbiAgMzQxMjogJ0JMVUVfQklUUycsXG4gIDM0MTM6ICdBTFBIQV9CSVRTJyxcbiAgMzQxNDogJ0RFUFRIX0JJVFMnLFxuICAzNDE1OiAnU1RFTkNJTF9CSVRTJyxcbiAgMzU1MzogJ1RFWFRVUkVfMkQnLFxuICA0MzUyOiAnRE9OVF9DQVJFJyxcbiAgNDM1MzogJ0ZBU1RFU1QnLFxuICA0MzU0OiAnTklDRVNUJyxcbiAgNTEyMDogJ0JZVEUnLFxuICA1MTIxOiAnVU5TSUdORURfQllURScsXG4gIDUxMjI6ICdTSE9SVCcsXG4gIDUxMjM6ICdVTlNJR05FRF9TSE9SVCcsXG4gIDUxMjQ6ICdJTlQnLFxuICA1MTI1OiAnVU5TSUdORURfSU5UJyxcbiAgNTEyNjogJ0ZMT0FUJyxcbiAgNTM4NjogJ0lOVkVSVCcsXG4gIDU4OTA6ICdURVhUVVJFJyxcbiAgNjQwMTogJ1NURU5DSUxfSU5ERVgnLFxuICA2NDAyOiAnREVQVEhfQ09NUE9ORU5UJyxcbiAgNjQwNjogJ0FMUEhBJyxcbiAgNjQwNzogJ1JHQicsXG4gIDY0MDg6ICdSR0JBJyxcbiAgNjQwOTogJ0xVTUlOQU5DRScsXG4gIDY0MTA6ICdMVU1JTkFOQ0VfQUxQSEEnLFxuICA3NjgwOiAnS0VFUCcsXG4gIDc2ODE6ICdSRVBMQUNFJyxcbiAgNzY4MjogJ0lOQ1InLFxuICA3NjgzOiAnREVDUicsXG4gIDc5MzY6ICdWRU5ET1InLFxuICA3OTM3OiAnUkVOREVSRVInLFxuICA3OTM4OiAnVkVSU0lPTicsXG4gIDk3Mjg6ICdORUFSRVNUJyxcbiAgOTcyOTogJ0xJTkVBUicsXG4gIDk5ODQ6ICdORUFSRVNUX01JUE1BUF9ORUFSRVNUJyxcbiAgOTk4NTogJ0xJTkVBUl9NSVBNQVBfTkVBUkVTVCcsXG4gIDk5ODY6ICdORUFSRVNUX01JUE1BUF9MSU5FQVInLFxuICA5OTg3OiAnTElORUFSX01JUE1BUF9MSU5FQVInLFxuICAxMDI0MDogJ1RFWFRVUkVfTUFHX0ZJTFRFUicsXG4gIDEwMjQxOiAnVEVYVFVSRV9NSU5fRklMVEVSJyxcbiAgMTAyNDI6ICdURVhUVVJFX1dSQVBfUycsXG4gIDEwMjQzOiAnVEVYVFVSRV9XUkFQX1QnLFxuICAxMDQ5NzogJ1JFUEVBVCcsXG4gIDEwNzUyOiAnUE9MWUdPTl9PRkZTRVRfVU5JVFMnLFxuICAxNjM4NDogJ0NPTE9SX0JVRkZFUl9CSVQnLFxuICAzMjc2OTogJ0NPTlNUQU5UX0NPTE9SJyxcbiAgMzI3NzA6ICdPTkVfTUlOVVNfQ09OU1RBTlRfQ09MT1InLFxuICAzMjc3MTogJ0NPTlNUQU5UX0FMUEhBJyxcbiAgMzI3NzI6ICdPTkVfTUlOVVNfQ09OU1RBTlRfQUxQSEEnLFxuICAzMjc3MzogJ0JMRU5EX0NPTE9SJyxcbiAgMzI3NzQ6ICdGVU5DX0FERCcsXG4gIDMyNzc3OiAnQkxFTkRfRVFVQVRJT05fUkdCJyxcbiAgMzI3Nzg6ICdGVU5DX1NVQlRSQUNUJyxcbiAgMzI3Nzk6ICdGVU5DX1JFVkVSU0VfU1VCVFJBQ1QnLFxuICAzMjgxOTogJ1VOU0lHTkVEX1NIT1JUXzRfNF80XzQnLFxuICAzMjgyMDogJ1VOU0lHTkVEX1NIT1JUXzVfNV81XzEnLFxuICAzMjgyMzogJ1BPTFlHT05fT0ZGU0VUX0ZJTEwnLFxuICAzMjgyNDogJ1BPTFlHT05fT0ZGU0VUX0ZBQ1RPUicsXG4gIDMyODU0OiAnUkdCQTQnLFxuICAzMjg1NTogJ1JHQjVfQTEnLFxuICAzMjg3MzogJ1RFWFRVUkVfQklORElOR18yRCcsXG4gIDMyOTI2OiAnU0FNUExFX0FMUEhBX1RPX0NPVkVSQUdFJyxcbiAgMzI5Mjg6ICdTQU1QTEVfQ09WRVJBR0UnLFxuICAzMjkzNjogJ1NBTVBMRV9CVUZGRVJTJyxcbiAgMzI5Mzc6ICdTQU1QTEVTJyxcbiAgMzI5Mzg6ICdTQU1QTEVfQ09WRVJBR0VfVkFMVUUnLFxuICAzMjkzOTogJ1NBTVBMRV9DT1ZFUkFHRV9JTlZFUlQnLFxuICAzMjk2ODogJ0JMRU5EX0RTVF9SR0InLFxuICAzMjk2OTogJ0JMRU5EX1NSQ19SR0InLFxuICAzMjk3MDogJ0JMRU5EX0RTVF9BTFBIQScsXG4gIDMyOTcxOiAnQkxFTkRfU1JDX0FMUEhBJyxcbiAgMzMwNzE6ICdDTEFNUF9UT19FREdFJyxcbiAgMzMxNzA6ICdHRU5FUkFURV9NSVBNQVBfSElOVCcsXG4gIDMzMTg5OiAnREVQVEhfQ09NUE9ORU5UMTYnLFxuICAzMzMwNjogJ0RFUFRIX1NURU5DSUxfQVRUQUNITUVOVCcsXG4gIDMzNjM1OiAnVU5TSUdORURfU0hPUlRfNV82XzUnLFxuICAzMzY0ODogJ01JUlJPUkVEX1JFUEVBVCcsXG4gIDMzOTAxOiAnQUxJQVNFRF9QT0lOVF9TSVpFX1JBTkdFJyxcbiAgMzM5MDI6ICdBTElBU0VEX0xJTkVfV0lEVEhfUkFOR0UnLFxuICAzMzk4NDogJ1RFWFRVUkUwJyxcbiAgMzM5ODU6ICdURVhUVVJFMScsXG4gIDMzOTg2OiAnVEVYVFVSRTInLFxuICAzMzk4NzogJ1RFWFRVUkUzJyxcbiAgMzM5ODg6ICdURVhUVVJFNCcsXG4gIDMzOTg5OiAnVEVYVFVSRTUnLFxuICAzMzk5MDogJ1RFWFRVUkU2JyxcbiAgMzM5OTE6ICdURVhUVVJFNycsXG4gIDMzOTkyOiAnVEVYVFVSRTgnLFxuICAzMzk5MzogJ1RFWFRVUkU5JyxcbiAgMzM5OTQ6ICdURVhUVVJFMTAnLFxuICAzMzk5NTogJ1RFWFRVUkUxMScsXG4gIDMzOTk2OiAnVEVYVFVSRTEyJyxcbiAgMzM5OTc6ICdURVhUVVJFMTMnLFxuICAzMzk5ODogJ1RFWFRVUkUxNCcsXG4gIDMzOTk5OiAnVEVYVFVSRTE1JyxcbiAgMzQwMDA6ICdURVhUVVJFMTYnLFxuICAzNDAwMTogJ1RFWFRVUkUxNycsXG4gIDM0MDAyOiAnVEVYVFVSRTE4JyxcbiAgMzQwMDM6ICdURVhUVVJFMTknLFxuICAzNDAwNDogJ1RFWFRVUkUyMCcsXG4gIDM0MDA1OiAnVEVYVFVSRTIxJyxcbiAgMzQwMDY6ICdURVhUVVJFMjInLFxuICAzNDAwNzogJ1RFWFRVUkUyMycsXG4gIDM0MDA4OiAnVEVYVFVSRTI0JyxcbiAgMzQwMDk6ICdURVhUVVJFMjUnLFxuICAzNDAxMDogJ1RFWFRVUkUyNicsXG4gIDM0MDExOiAnVEVYVFVSRTI3JyxcbiAgMzQwMTI6ICdURVhUVVJFMjgnLFxuICAzNDAxMzogJ1RFWFRVUkUyOScsXG4gIDM0MDE0OiAnVEVYVFVSRTMwJyxcbiAgMzQwMTU6ICdURVhUVVJFMzEnLFxuICAzNDAxNjogJ0FDVElWRV9URVhUVVJFJyxcbiAgMzQwMjQ6ICdNQVhfUkVOREVSQlVGRkVSX1NJWkUnLFxuICAzNDA0MTogJ0RFUFRIX1NURU5DSUwnLFxuICAzNDA1NTogJ0lOQ1JfV1JBUCcsXG4gIDM0MDU2OiAnREVDUl9XUkFQJyxcbiAgMzQwNjc6ICdURVhUVVJFX0NVQkVfTUFQJyxcbiAgMzQwNjg6ICdURVhUVVJFX0JJTkRJTkdfQ1VCRV9NQVAnLFxuICAzNDA2OTogJ1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWCcsXG4gIDM0MDcwOiAnVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9YJyxcbiAgMzQwNzE6ICdURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1knLFxuICAzNDA3MjogJ1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWScsXG4gIDM0MDczOiAnVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9aJyxcbiAgMzQwNzQ6ICdURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1onLFxuICAzNDA3NjogJ01BWF9DVUJFX01BUF9URVhUVVJFX1NJWkUnLFxuICAzNDMzODogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfRU5BQkxFRCcsXG4gIDM0MzM5OiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9TSVpFJyxcbiAgMzQzNDA6ICdWRVJURVhfQVRUUklCX0FSUkFZX1NUUklERScsXG4gIDM0MzQxOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9UWVBFJyxcbiAgMzQzNDI6ICdDVVJSRU5UX1ZFUlRFWF9BVFRSSUInLFxuICAzNDM3MzogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfUE9JTlRFUicsXG4gIDM0NDY2OiAnTlVNX0NPTVBSRVNTRURfVEVYVFVSRV9GT1JNQVRTJyxcbiAgMzQ0Njc6ICdDT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUycsXG4gIDM0NjYwOiAnQlVGRkVSX1NJWkUnLFxuICAzNDY2MTogJ0JVRkZFUl9VU0FHRScsXG4gIDM0ODE2OiAnU1RFTkNJTF9CQUNLX0ZVTkMnLFxuICAzNDgxNzogJ1NURU5DSUxfQkFDS19GQUlMJyxcbiAgMzQ4MTg6ICdTVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9GQUlMJyxcbiAgMzQ4MTk6ICdTVEVOQ0lMX0JBQ0tfUEFTU19ERVBUSF9QQVNTJyxcbiAgMzQ4Nzc6ICdCTEVORF9FUVVBVElPTl9BTFBIQScsXG4gIDM0OTIxOiAnTUFYX1ZFUlRFWF9BVFRSSUJTJyxcbiAgMzQ5MjI6ICdWRVJURVhfQVRUUklCX0FSUkFZX05PUk1BTElaRUQnLFxuICAzNDkzMDogJ01BWF9URVhUVVJFX0lNQUdFX1VOSVRTJyxcbiAgMzQ5NjI6ICdBUlJBWV9CVUZGRVInLFxuICAzNDk2MzogJ0VMRU1FTlRfQVJSQVlfQlVGRkVSJyxcbiAgMzQ5NjQ6ICdBUlJBWV9CVUZGRVJfQklORElORycsXG4gIDM0OTY1OiAnRUxFTUVOVF9BUlJBWV9CVUZGRVJfQklORElORycsXG4gIDM0OTc1OiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9CVUZGRVJfQklORElORycsXG4gIDM1MDQwOiAnU1RSRUFNX0RSQVcnLFxuICAzNTA0NDogJ1NUQVRJQ19EUkFXJyxcbiAgMzUwNDg6ICdEWU5BTUlDX0RSQVcnLFxuICAzNTYzMjogJ0ZSQUdNRU5UX1NIQURFUicsXG4gIDM1NjMzOiAnVkVSVEVYX1NIQURFUicsXG4gIDM1NjYwOiAnTUFYX1ZFUlRFWF9URVhUVVJFX0lNQUdFX1VOSVRTJyxcbiAgMzU2NjE6ICdNQVhfQ09NQklORURfVEVYVFVSRV9JTUFHRV9VTklUUycsXG4gIDM1NjYzOiAnU0hBREVSX1RZUEUnLFxuICAzNTY2NDogJ0ZMT0FUX1ZFQzInLFxuICAzNTY2NTogJ0ZMT0FUX1ZFQzMnLFxuICAzNTY2NjogJ0ZMT0FUX1ZFQzQnLFxuICAzNTY2NzogJ0lOVF9WRUMyJyxcbiAgMzU2Njg6ICdJTlRfVkVDMycsXG4gIDM1NjY5OiAnSU5UX1ZFQzQnLFxuICAzNTY3MDogJ0JPT0wnLFxuICAzNTY3MTogJ0JPT0xfVkVDMicsXG4gIDM1NjcyOiAnQk9PTF9WRUMzJyxcbiAgMzU2NzM6ICdCT09MX1ZFQzQnLFxuICAzNTY3NDogJ0ZMT0FUX01BVDInLFxuICAzNTY3NTogJ0ZMT0FUX01BVDMnLFxuICAzNTY3NjogJ0ZMT0FUX01BVDQnLFxuICAzNTY3ODogJ1NBTVBMRVJfMkQnLFxuICAzNTY4MDogJ1NBTVBMRVJfQ1VCRScsXG4gIDM1NzEyOiAnREVMRVRFX1NUQVRVUycsXG4gIDM1NzEzOiAnQ09NUElMRV9TVEFUVVMnLFxuICAzNTcxNDogJ0xJTktfU1RBVFVTJyxcbiAgMzU3MTU6ICdWQUxJREFURV9TVEFUVVMnLFxuICAzNTcxNjogJ0lORk9fTE9HX0xFTkdUSCcsXG4gIDM1NzE3OiAnQVRUQUNIRURfU0hBREVSUycsXG4gIDM1NzE4OiAnQUNUSVZFX1VOSUZPUk1TJyxcbiAgMzU3MTk6ICdBQ1RJVkVfVU5JRk9STV9NQVhfTEVOR1RIJyxcbiAgMzU3MjA6ICdTSEFERVJfU09VUkNFX0xFTkdUSCcsXG4gIDM1NzIxOiAnQUNUSVZFX0FUVFJJQlVURVMnLFxuICAzNTcyMjogJ0FDVElWRV9BVFRSSUJVVEVfTUFYX0xFTkdUSCcsXG4gIDM1NzI0OiAnU0hBRElOR19MQU5HVUFHRV9WRVJTSU9OJyxcbiAgMzU3MjU6ICdDVVJSRU5UX1BST0dSQU0nLFxuICAzNjAwMzogJ1NURU5DSUxfQkFDS19SRUYnLFxuICAzNjAwNDogJ1NURU5DSUxfQkFDS19WQUxVRV9NQVNLJyxcbiAgMzYwMDU6ICdTVEVOQ0lMX0JBQ0tfV1JJVEVNQVNLJyxcbiAgMzYwMDY6ICdGUkFNRUJVRkZFUl9CSU5ESU5HJyxcbiAgMzYwMDc6ICdSRU5ERVJCVUZGRVJfQklORElORycsXG4gIDM2MDQ4OiAnRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfVFlQRScsXG4gIDM2MDQ5OiAnRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9PQkpFQ1RfTkFNRScsXG4gIDM2MDUwOiAnRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0xFVkVMJyxcbiAgMzYwNTE6ICdGUkFNRUJVRkZFUl9BVFRBQ0hNRU5UX1RFWFRVUkVfQ1VCRV9NQVBfRkFDRScsXG4gIDM2MDUzOiAnRlJBTUVCVUZGRVJfQ09NUExFVEUnLFxuICAzNjA1NDogJ0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfQVRUQUNITUVOVCcsXG4gIDM2MDU1OiAnRlJBTUVCVUZGRVJfSU5DT01QTEVURV9NSVNTSU5HX0FUVEFDSE1FTlQnLFxuICAzNjA1NzogJ0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfRElNRU5TSU9OUycsXG4gIDM2MDYxOiAnRlJBTUVCVUZGRVJfVU5TVVBQT1JURUQnLFxuICAzNjA2NDogJ0NPTE9SX0FUVEFDSE1FTlQwJyxcbiAgMzYwOTY6ICdERVBUSF9BVFRBQ0hNRU5UJyxcbiAgMzYxMjg6ICdTVEVOQ0lMX0FUVEFDSE1FTlQnLFxuICAzNjE2MDogJ0ZSQU1FQlVGRkVSJyxcbiAgMzYxNjE6ICdSRU5ERVJCVUZGRVInLFxuICAzNjE2MjogJ1JFTkRFUkJVRkZFUl9XSURUSCcsXG4gIDM2MTYzOiAnUkVOREVSQlVGRkVSX0hFSUdIVCcsXG4gIDM2MTY0OiAnUkVOREVSQlVGRkVSX0lOVEVSTkFMX0ZPUk1BVCcsXG4gIDM2MTY4OiAnU1RFTkNJTF9JTkRFWDgnLFxuICAzNjE3NjogJ1JFTkRFUkJVRkZFUl9SRURfU0laRScsXG4gIDM2MTc3OiAnUkVOREVSQlVGRkVSX0dSRUVOX1NJWkUnLFxuICAzNjE3ODogJ1JFTkRFUkJVRkZFUl9CTFVFX1NJWkUnLFxuICAzNjE3OTogJ1JFTkRFUkJVRkZFUl9BTFBIQV9TSVpFJyxcbiAgMzYxODA6ICdSRU5ERVJCVUZGRVJfREVQVEhfU0laRScsXG4gIDM2MTgxOiAnUkVOREVSQlVGRkVSX1NURU5DSUxfU0laRScsXG4gIDM2MTk0OiAnUkdCNTY1JyxcbiAgMzYzMzY6ICdMT1dfRkxPQVQnLFxuICAzNjMzNzogJ01FRElVTV9GTE9BVCcsXG4gIDM2MzM4OiAnSElHSF9GTE9BVCcsXG4gIDM2MzM5OiAnTE9XX0lOVCcsXG4gIDM2MzQwOiAnTUVESVVNX0lOVCcsXG4gIDM2MzQxOiAnSElHSF9JTlQnLFxuICAzNjM0NjogJ1NIQURFUl9DT01QSUxFUicsXG4gIDM2MzQ3OiAnTUFYX1ZFUlRFWF9VTklGT1JNX1ZFQ1RPUlMnLFxuICAzNjM0ODogJ01BWF9WQVJZSU5HX1ZFQ1RPUlMnLFxuICAzNjM0OTogJ01BWF9GUkFHTUVOVF9VTklGT1JNX1ZFQ1RPUlMnLFxuICAzNzQ0MDogJ1VOUEFDS19GTElQX1lfV0VCR0wnLFxuICAzNzQ0MTogJ1VOUEFDS19QUkVNVUxUSVBMWV9BTFBIQV9XRUJHTCcsXG4gIDM3NDQyOiAnQ09OVEVYVF9MT1NUX1dFQkdMJyxcbiAgMzc0NDM6ICdVTlBBQ0tfQ09MT1JTUEFDRV9DT05WRVJTSU9OX1dFQkdMJyxcbiAgMzc0NDQ6ICdCUk9XU0VSX0RFRkFVTFRfV0VCR0wnXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jb25zdGFudHMvMS4wL251bWJlcnMuanNcbi8vIG1vZHVsZSBpZCA9IDIxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHRva2VuaXplID0gcmVxdWlyZSgnZ2xzbC10b2tlbml6ZXInKVxudmFyIGF0b2IgICAgID0gcmVxdWlyZSgnYXRvYi1saXRlJylcblxubW9kdWxlLmV4cG9ydHMgPSBnZXROYW1lXG5cbmZ1bmN0aW9uIGdldE5hbWUoc3JjKSB7XG4gIHZhciB0b2tlbnMgPSBBcnJheS5pc0FycmF5KHNyYylcbiAgICA/IHNyY1xuICAgIDogdG9rZW5pemUoc3JjKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIHRva2VuID0gdG9rZW5zW2ldXG4gICAgaWYgKHRva2VuLnR5cGUgIT09ICdwcmVwcm9jZXNzb3InKSBjb250aW51ZVxuICAgIHZhciBtYXRjaCA9IHRva2VuLmRhdGEubWF0Y2goL1xcI2RlZmluZVxccytTSEFERVJfTkFNRShfQjY0KT9cXHMrKC4rKSQvKVxuICAgIGlmICghbWF0Y2gpIGNvbnRpbnVlXG4gICAgaWYgKCFtYXRjaFsyXSkgY29udGludWVcblxuICAgIHZhciBiNjQgID0gbWF0Y2hbMV1cbiAgICB2YXIgbmFtZSA9IG1hdGNoWzJdXG5cbiAgICByZXR1cm4gKGI2NCA/IGF0b2IobmFtZSkgOiBuYW1lKS50cmltKClcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC1zaGFkZXItbmFtZS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9rZW5pemUgPSByZXF1aXJlKCcuL2luZGV4JylcblxubW9kdWxlLmV4cG9ydHMgPSB0b2tlbml6ZVN0cmluZ1xuXG5mdW5jdGlvbiB0b2tlbml6ZVN0cmluZyhzdHIsIG9wdCkge1xuICB2YXIgZ2VuZXJhdG9yID0gdG9rZW5pemUob3B0KVxuICB2YXIgdG9rZW5zID0gW11cblxuICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KGdlbmVyYXRvcihzdHIpKVxuICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KGdlbmVyYXRvcihudWxsKSlcblxuICByZXR1cm4gdG9rZW5zXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9zdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDIzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSB0b2tlbml6ZVxuXG52YXIgbGl0ZXJhbHMxMDAgPSByZXF1aXJlKCcuL2xpYi9saXRlcmFscycpXG4gICwgb3BlcmF0b3JzID0gcmVxdWlyZSgnLi9saWIvb3BlcmF0b3JzJylcbiAgLCBidWlsdGluczEwMCA9IHJlcXVpcmUoJy4vbGliL2J1aWx0aW5zJylcbiAgLCBsaXRlcmFsczMwMGVzID0gcmVxdWlyZSgnLi9saWIvbGl0ZXJhbHMtMzAwZXMnKVxuICAsIGJ1aWx0aW5zMzAwZXMgPSByZXF1aXJlKCcuL2xpYi9idWlsdGlucy0zMDBlcycpXG5cbnZhciBOT1JNQUwgPSA5OTkgICAgICAgICAgLy8gPC0tIG5ldmVyIGVtaXR0ZWRcbiAgLCBUT0tFTiA9IDk5OTkgICAgICAgICAgLy8gPC0tIG5ldmVyIGVtaXR0ZWRcbiAgLCBCTE9DS19DT01NRU5UID0gMFxuICAsIExJTkVfQ09NTUVOVCA9IDFcbiAgLCBQUkVQUk9DRVNTT1IgPSAyXG4gICwgT1BFUkFUT1IgPSAzXG4gICwgSU5URUdFUiA9IDRcbiAgLCBGTE9BVCA9IDVcbiAgLCBJREVOVCA9IDZcbiAgLCBCVUlMVElOID0gN1xuICAsIEtFWVdPUkQgPSA4XG4gICwgV0hJVEVTUEFDRSA9IDlcbiAgLCBFT0YgPSAxMFxuICAsIEhFWCA9IDExXG5cbnZhciBtYXAgPSBbXG4gICAgJ2Jsb2NrLWNvbW1lbnQnXG4gICwgJ2xpbmUtY29tbWVudCdcbiAgLCAncHJlcHJvY2Vzc29yJ1xuICAsICdvcGVyYXRvcidcbiAgLCAnaW50ZWdlcidcbiAgLCAnZmxvYXQnXG4gICwgJ2lkZW50J1xuICAsICdidWlsdGluJ1xuICAsICdrZXl3b3JkJ1xuICAsICd3aGl0ZXNwYWNlJ1xuICAsICdlb2YnXG4gICwgJ2ludGVnZXInXG5dXG5cbmZ1bmN0aW9uIHRva2VuaXplKG9wdCkge1xuICB2YXIgaSA9IDBcbiAgICAsIHRvdGFsID0gMFxuICAgICwgbW9kZSA9IE5PUk1BTFxuICAgICwgY1xuICAgICwgbGFzdFxuICAgICwgY29udGVudCA9IFtdXG4gICAgLCB0b2tlbnMgPSBbXVxuICAgICwgdG9rZW5faWR4ID0gMFxuICAgICwgdG9rZW5fb2ZmcyA9IDBcbiAgICAsIGxpbmUgPSAxXG4gICAgLCBjb2wgPSAwXG4gICAgLCBzdGFydCA9IDBcbiAgICAsIGlzbnVtID0gZmFsc2VcbiAgICAsIGlzb3BlcmF0b3IgPSBmYWxzZVxuICAgICwgaW5wdXQgPSAnJ1xuICAgICwgbGVuXG5cbiAgb3B0ID0gb3B0IHx8IHt9XG4gIHZhciBhbGxCdWlsdGlucyA9IGJ1aWx0aW5zMTAwXG4gIHZhciBhbGxMaXRlcmFscyA9IGxpdGVyYWxzMTAwXG4gIGlmIChvcHQudmVyc2lvbiA9PT0gJzMwMCBlcycpIHtcbiAgICBhbGxCdWlsdGlucyA9IGJ1aWx0aW5zMzAwZXNcbiAgICBhbGxMaXRlcmFscyA9IGxpdGVyYWxzMzAwZXNcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihkYXRhKSB7XG4gICAgdG9rZW5zID0gW11cbiAgICBpZiAoZGF0YSAhPT0gbnVsbCkgcmV0dXJuIHdyaXRlKGRhdGEucmVwbGFjZSA/IGRhdGEucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKSA6IGRhdGEpXG4gICAgcmV0dXJuIGVuZCgpXG4gIH1cblxuICBmdW5jdGlvbiB0b2tlbihkYXRhKSB7XG4gICAgaWYgKGRhdGEubGVuZ3RoKSB7XG4gICAgICB0b2tlbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IG1hcFttb2RlXVxuICAgICAgLCBkYXRhOiBkYXRhXG4gICAgICAsIHBvc2l0aW9uOiBzdGFydFxuICAgICAgLCBsaW5lOiBsaW5lXG4gICAgICAsIGNvbHVtbjogY29sXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlKGNodW5rKSB7XG4gICAgaSA9IDBcbiAgICBpbnB1dCArPSBjaHVua1xuICAgIGxlbiA9IGlucHV0Lmxlbmd0aFxuXG4gICAgdmFyIGxhc3RcblxuICAgIHdoaWxlKGMgPSBpbnB1dFtpXSwgaSA8IGxlbikge1xuICAgICAgbGFzdCA9IGlcblxuICAgICAgc3dpdGNoKG1vZGUpIHtcbiAgICAgICAgY2FzZSBCTE9DS19DT01NRU5UOiBpID0gYmxvY2tfY29tbWVudCgpOyBicmVha1xuICAgICAgICBjYXNlIExJTkVfQ09NTUVOVDogaSA9IGxpbmVfY29tbWVudCgpOyBicmVha1xuICAgICAgICBjYXNlIFBSRVBST0NFU1NPUjogaSA9IHByZXByb2Nlc3NvcigpOyBicmVha1xuICAgICAgICBjYXNlIE9QRVJBVE9SOiBpID0gb3BlcmF0b3IoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBJTlRFR0VSOiBpID0gaW50ZWdlcigpOyBicmVha1xuICAgICAgICBjYXNlIEhFWDogaSA9IGhleCgpOyBicmVha1xuICAgICAgICBjYXNlIEZMT0FUOiBpID0gZGVjaW1hbCgpOyBicmVha1xuICAgICAgICBjYXNlIFRPS0VOOiBpID0gcmVhZHRva2VuKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgV0hJVEVTUEFDRTogaSA9IHdoaXRlc3BhY2UoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBOT1JNQUw6IGkgPSBub3JtYWwoKTsgYnJlYWtcbiAgICAgIH1cblxuICAgICAgaWYobGFzdCAhPT0gaSkge1xuICAgICAgICBzd2l0Y2goaW5wdXRbbGFzdF0pIHtcbiAgICAgICAgICBjYXNlICdcXG4nOiBjb2wgPSAwOyArK2xpbmU7IGJyZWFrXG4gICAgICAgICAgZGVmYXVsdDogKytjb2w7IGJyZWFrXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0b3RhbCArPSBpXG4gICAgaW5wdXQgPSBpbnB1dC5zbGljZShpKVxuICAgIHJldHVybiB0b2tlbnNcbiAgfVxuXG4gIGZ1bmN0aW9uIGVuZChjaHVuaykge1xuICAgIGlmKGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgIH1cblxuICAgIG1vZGUgPSBFT0ZcbiAgICB0b2tlbignKGVvZiknKVxuICAgIHJldHVybiB0b2tlbnNcbiAgfVxuXG4gIGZ1bmN0aW9uIG5vcm1hbCgpIHtcbiAgICBjb250ZW50ID0gY29udGVudC5sZW5ndGggPyBbXSA6IGNvbnRlbnRcblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnKicpIHtcbiAgICAgIHN0YXJ0ID0gdG90YWwgKyBpIC0gMVxuICAgICAgbW9kZSA9IEJMT0NLX0NPTU1FTlRcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZihsYXN0ID09PSAnLycgJiYgYyA9PT0gJy8nKSB7XG4gICAgICBzdGFydCA9IHRvdGFsICsgaSAtIDFcbiAgICAgIG1vZGUgPSBMSU5FX0NPTU1FTlRcbiAgICAgIGxhc3QgPSBjXG4gICAgICByZXR1cm4gaSArIDFcbiAgICB9XG5cbiAgICBpZihjID09PSAnIycpIHtcbiAgICAgIG1vZGUgPSBQUkVQUk9DRVNTT1JcbiAgICAgIHN0YXJ0ID0gdG90YWwgKyBpXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKC9cXHMvLnRlc3QoYykpIHtcbiAgICAgIG1vZGUgPSBXSElURVNQQUNFXG4gICAgICBzdGFydCA9IHRvdGFsICsgaVxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpc251bSA9IC9cXGQvLnRlc3QoYylcbiAgICBpc29wZXJhdG9yID0gL1teXFx3X10vLnRlc3QoYylcblxuICAgIHN0YXJ0ID0gdG90YWwgKyBpXG4gICAgbW9kZSA9IGlzbnVtID8gSU5URUdFUiA6IGlzb3BlcmF0b3IgPyBPUEVSQVRPUiA6IFRPS0VOXG4gICAgcmV0dXJuIGlcbiAgfVxuXG4gIGZ1bmN0aW9uIHdoaXRlc3BhY2UoKSB7XG4gICAgaWYoL1teXFxzXS9nLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gcHJlcHJvY2Vzc29yKCkge1xuICAgIGlmKChjID09PSAnXFxyJyB8fCBjID09PSAnXFxuJykgJiYgbGFzdCAhPT0gJ1xcXFwnKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGxpbmVfY29tbWVudCgpIHtcbiAgICByZXR1cm4gcHJlcHJvY2Vzc29yKClcbiAgfVxuXG4gIGZ1bmN0aW9uIGJsb2NrX2NvbW1lbnQoKSB7XG4gICAgaWYoYyA9PT0gJy8nICYmIGxhc3QgPT09ICcqJykge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIG9wZXJhdG9yKCkge1xuICAgIGlmKGxhc3QgPT09ICcuJyAmJiAvXFxkLy50ZXN0KGMpKSB7XG4gICAgICBtb2RlID0gRkxPQVRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYobGFzdCA9PT0gJy8nICYmIGMgPT09ICcqJykge1xuICAgICAgbW9kZSA9IEJMT0NLX0NPTU1FTlRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYobGFzdCA9PT0gJy8nICYmIGMgPT09ICcvJykge1xuICAgICAgbW9kZSA9IExJTkVfQ09NTUVOVFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZihjID09PSAnLicgJiYgY29udGVudC5sZW5ndGgpIHtcbiAgICAgIHdoaWxlKGRldGVybWluZV9vcGVyYXRvcihjb250ZW50KSk7XG5cbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZihjID09PSAnOycgfHwgYyA9PT0gJyknIHx8IGMgPT09ICcoJykge1xuICAgICAgaWYoY29udGVudC5sZW5ndGgpIHdoaWxlKGRldGVybWluZV9vcGVyYXRvcihjb250ZW50KSk7XG4gICAgICB0b2tlbihjKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgdmFyIGlzX2NvbXBvc2l0ZV9vcGVyYXRvciA9IGNvbnRlbnQubGVuZ3RoID09PSAyICYmIGMgIT09ICc9J1xuICAgIGlmKC9bXFx3X1xcZFxcc10vLnRlc3QoYykgfHwgaXNfY29tcG9zaXRlX29wZXJhdG9yKSB7XG4gICAgICB3aGlsZShkZXRlcm1pbmVfb3BlcmF0b3IoY29udGVudCkpO1xuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gZGV0ZXJtaW5lX29wZXJhdG9yKGJ1Zikge1xuICAgIHZhciBqID0gMFxuICAgICAgLCBpZHhcbiAgICAgICwgcmVzXG5cbiAgICBkbyB7XG4gICAgICBpZHggPSBvcGVyYXRvcnMuaW5kZXhPZihidWYuc2xpY2UoMCwgYnVmLmxlbmd0aCArIGopLmpvaW4oJycpKVxuICAgICAgcmVzID0gb3BlcmF0b3JzW2lkeF1cblxuICAgICAgaWYoaWR4ID09PSAtMSkge1xuICAgICAgICBpZihqLS0gKyBidWYubGVuZ3RoID4gMCkgY29udGludWVcbiAgICAgICAgcmVzID0gYnVmLnNsaWNlKDAsIDEpLmpvaW4oJycpXG4gICAgICB9XG5cbiAgICAgIHRva2VuKHJlcylcblxuICAgICAgc3RhcnQgKz0gcmVzLmxlbmd0aFxuICAgICAgY29udGVudCA9IGNvbnRlbnQuc2xpY2UocmVzLmxlbmd0aClcbiAgICAgIHJldHVybiBjb250ZW50Lmxlbmd0aFxuICAgIH0gd2hpbGUoMSlcbiAgfVxuXG4gIGZ1bmN0aW9uIGhleCgpIHtcbiAgICBpZigvW15hLWZBLUYwLTldLy50ZXN0KGMpKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG5cbiAgZnVuY3Rpb24gaW50ZWdlcigpIHtcbiAgICBpZihjID09PSAnLicpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbW9kZSA9IEZMT0FUXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoL1tlRV0vLnRlc3QoYykpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbW9kZSA9IEZMT0FUXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJ3gnICYmIGNvbnRlbnQubGVuZ3RoID09PSAxICYmIGNvbnRlbnRbMF0gPT09ICcwJykge1xuICAgICAgbW9kZSA9IEhFWFxuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoL1teXFxkXS8udGVzdChjKSkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlY2ltYWwoKSB7XG4gICAgaWYoYyA9PT0gJ2YnKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIGxhc3QgPSBjXG4gICAgICBpICs9IDFcbiAgICB9XG5cbiAgICBpZigvW2VFXS8udGVzdChjKSkge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYgKGMgPT09ICctJyAmJiAvW2VFXS8udGVzdChsYXN0KSkge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoL1teXFxkXS8udGVzdChjKSkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlYWR0b2tlbigpIHtcbiAgICBpZigvW15cXGRcXHdfXS8udGVzdChjKSkge1xuICAgICAgdmFyIGNvbnRlbnRzdHIgPSBjb250ZW50LmpvaW4oJycpXG4gICAgICBpZihhbGxMaXRlcmFscy5pbmRleE9mKGNvbnRlbnRzdHIpID4gLTEpIHtcbiAgICAgICAgbW9kZSA9IEtFWVdPUkRcbiAgICAgIH0gZWxzZSBpZihhbGxCdWlsdGlucy5pbmRleE9mKGNvbnRlbnRzdHIpID4gLTEpIHtcbiAgICAgICAgbW9kZSA9IEJVSUxUSU5cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1vZGUgPSBJREVOVFxuICAgICAgfVxuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAgICc8PD0nXG4gICwgJz4+PSdcbiAgLCAnKysnXG4gICwgJy0tJ1xuICAsICc8PCdcbiAgLCAnPj4nXG4gICwgJzw9J1xuICAsICc+PSdcbiAgLCAnPT0nXG4gICwgJyE9J1xuICAsICcmJidcbiAgLCAnfHwnXG4gICwgJys9J1xuICAsICctPSdcbiAgLCAnKj0nXG4gICwgJy89J1xuICAsICclPSdcbiAgLCAnJj0nXG4gICwgJ15eJ1xuICAsICdePSdcbiAgLCAnfD0nXG4gICwgJygnXG4gICwgJyknXG4gICwgJ1snXG4gICwgJ10nXG4gICwgJy4nXG4gICwgJyEnXG4gICwgJ34nXG4gICwgJyonXG4gICwgJy8nXG4gICwgJyUnXG4gICwgJysnXG4gICwgJy0nXG4gICwgJzwnXG4gICwgJz4nXG4gICwgJyYnXG4gICwgJ14nXG4gICwgJ3wnXG4gICwgJz8nXG4gICwgJzonXG4gICwgJz0nXG4gICwgJywnXG4gICwgJzsnXG4gICwgJ3snXG4gICwgJ30nXG5dXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvb3BlcmF0b3JzLmpzXG4vLyBtb2R1bGUgaWQgPSAyNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciB2MTAwID0gcmVxdWlyZSgnLi9saXRlcmFscycpXG5cbm1vZHVsZS5leHBvcnRzID0gdjEwMC5zbGljZSgpLmNvbmNhdChbXG4gICAnbGF5b3V0J1xuICAsICdjZW50cm9pZCdcbiAgLCAnc21vb3RoJ1xuICAsICdjYXNlJ1xuICAsICdtYXQyeDInXG4gICwgJ21hdDJ4MydcbiAgLCAnbWF0Mng0J1xuICAsICdtYXQzeDInXG4gICwgJ21hdDN4MydcbiAgLCAnbWF0M3g0J1xuICAsICdtYXQ0eDInXG4gICwgJ21hdDR4MydcbiAgLCAnbWF0NHg0J1xuICAsICd1aW50J1xuICAsICd1dmVjMidcbiAgLCAndXZlYzMnXG4gICwgJ3V2ZWM0J1xuICAsICdzYW1wbGVyQ3ViZVNoYWRvdydcbiAgLCAnc2FtcGxlcjJEQXJyYXknXG4gICwgJ3NhbXBsZXIyREFycmF5U2hhZG93J1xuICAsICdpc2FtcGxlcjJEJ1xuICAsICdpc2FtcGxlcjNEJ1xuICAsICdpc2FtcGxlckN1YmUnXG4gICwgJ2lzYW1wbGVyMkRBcnJheSdcbiAgLCAndXNhbXBsZXIyRCdcbiAgLCAndXNhbXBsZXIzRCdcbiAgLCAndXNhbXBsZXJDdWJlJ1xuICAsICd1c2FtcGxlcjJEQXJyYXknXG4gICwgJ2NvaGVyZW50J1xuICAsICdyZXN0cmljdCdcbiAgLCAncmVhZG9ubHknXG4gICwgJ3dyaXRlb25seSdcbiAgLCAncmVzb3VyY2UnXG4gICwgJ2F0b21pY191aW50J1xuICAsICdub3BlcnNwZWN0aXZlJ1xuICAsICdwYXRjaCdcbiAgLCAnc2FtcGxlJ1xuICAsICdzdWJyb3V0aW5lJ1xuICAsICdjb21tb24nXG4gICwgJ3BhcnRpdGlvbidcbiAgLCAnYWN0aXZlJ1xuICAsICdmaWx0ZXInXG4gICwgJ2ltYWdlMUQnXG4gICwgJ2ltYWdlMkQnXG4gICwgJ2ltYWdlM0QnXG4gICwgJ2ltYWdlQ3ViZSdcbiAgLCAnaWltYWdlMUQnXG4gICwgJ2lpbWFnZTJEJ1xuICAsICdpaW1hZ2UzRCdcbiAgLCAnaWltYWdlQ3ViZSdcbiAgLCAndWltYWdlMUQnXG4gICwgJ3VpbWFnZTJEJ1xuICAsICd1aW1hZ2UzRCdcbiAgLCAndWltYWdlQ3ViZSdcbiAgLCAnaW1hZ2UxREFycmF5J1xuICAsICdpbWFnZTJEQXJyYXknXG4gICwgJ2lpbWFnZTFEQXJyYXknXG4gICwgJ2lpbWFnZTJEQXJyYXknXG4gICwgJ3VpbWFnZTFEQXJyYXknXG4gICwgJ3VpbWFnZTJEQXJyYXknXG4gICwgJ2ltYWdlMURTaGFkb3cnXG4gICwgJ2ltYWdlMkRTaGFkb3cnXG4gICwgJ2ltYWdlMURBcnJheVNoYWRvdydcbiAgLCAnaW1hZ2UyREFycmF5U2hhZG93J1xuICAsICdpbWFnZUJ1ZmZlcidcbiAgLCAnaWltYWdlQnVmZmVyJ1xuICAsICd1aW1hZ2VCdWZmZXInXG4gICwgJ3NhbXBsZXIxREFycmF5J1xuICAsICdzYW1wbGVyMURBcnJheVNoYWRvdydcbiAgLCAnaXNhbXBsZXIxRCdcbiAgLCAnaXNhbXBsZXIxREFycmF5J1xuICAsICd1c2FtcGxlcjFEJ1xuICAsICd1c2FtcGxlcjFEQXJyYXknXG4gICwgJ2lzYW1wbGVyMkRSZWN0J1xuICAsICd1c2FtcGxlcjJEUmVjdCdcbiAgLCAnc2FtcGxlckJ1ZmZlcidcbiAgLCAnaXNhbXBsZXJCdWZmZXInXG4gICwgJ3VzYW1wbGVyQnVmZmVyJ1xuICAsICdzYW1wbGVyMkRNUydcbiAgLCAnaXNhbXBsZXIyRE1TJ1xuICAsICd1c2FtcGxlcjJETVMnXG4gICwgJ3NhbXBsZXIyRE1TQXJyYXknXG4gICwgJ2lzYW1wbGVyMkRNU0FycmF5J1xuICAsICd1c2FtcGxlcjJETVNBcnJheSdcbl0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMtMzAwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gMzAwZXMgYnVpbHRpbnMvcmVzZXJ2ZWQgd29yZHMgdGhhdCB3ZXJlIHByZXZpb3VzbHkgdmFsaWQgaW4gdjEwMFxudmFyIHYxMDAgPSByZXF1aXJlKCcuL2J1aWx0aW5zJylcblxuLy8gVGhlIHRleHR1cmUyRHxDdWJlIGZ1bmN0aW9ucyBoYXZlIGJlZW4gcmVtb3ZlZFxuLy8gQW5kIHRoZSBnbF8gZmVhdHVyZXMgYXJlIHVwZGF0ZWRcbnYxMDAgPSB2MTAwLnNsaWNlKCkuZmlsdGVyKGZ1bmN0aW9uIChiKSB7XG4gIHJldHVybiAhL14oZ2xcXF98dGV4dHVyZSkvLnRlc3QoYilcbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gdjEwMC5jb25jYXQoW1xuICAvLyB0aGUgdXBkYXRlZCBnbF8gY29uc3RhbnRzXG4gICAgJ2dsX1ZlcnRleElEJ1xuICAsICdnbF9JbnN0YW5jZUlEJ1xuICAsICdnbF9Qb3NpdGlvbidcbiAgLCAnZ2xfUG9pbnRTaXplJ1xuICAsICdnbF9GcmFnQ29vcmQnXG4gICwgJ2dsX0Zyb250RmFjaW5nJ1xuICAsICdnbF9GcmFnRGVwdGgnXG4gICwgJ2dsX1BvaW50Q29vcmQnXG4gICwgJ2dsX01heFZlcnRleEF0dHJpYnMnXG4gICwgJ2dsX01heFZlcnRleFVuaWZvcm1WZWN0b3JzJ1xuICAsICdnbF9NYXhWZXJ0ZXhPdXRwdXRWZWN0b3JzJ1xuICAsICdnbF9NYXhGcmFnbWVudElucHV0VmVjdG9ycydcbiAgLCAnZ2xfTWF4VmVydGV4VGV4dHVyZUltYWdlVW5pdHMnXG4gICwgJ2dsX01heENvbWJpbmVkVGV4dHVyZUltYWdlVW5pdHMnXG4gICwgJ2dsX01heFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhGcmFnbWVudFVuaWZvcm1WZWN0b3JzJ1xuICAsICdnbF9NYXhEcmF3QnVmZmVycydcbiAgLCAnZ2xfTWluUHJvZ3JhbVRleGVsT2Zmc2V0J1xuICAsICdnbF9NYXhQcm9ncmFtVGV4ZWxPZmZzZXQnXG4gICwgJ2dsX0RlcHRoUmFuZ2VQYXJhbWV0ZXJzJ1xuICAsICdnbF9EZXB0aFJhbmdlJ1xuXG4gIC8vIG90aGVyIGJ1aWx0aW5zXG4gICwgJ3RydW5jJ1xuICAsICdyb3VuZCdcbiAgLCAncm91bmRFdmVuJ1xuICAsICdpc25hbidcbiAgLCAnaXNpbmYnXG4gICwgJ2Zsb2F0Qml0c1RvSW50J1xuICAsICdmbG9hdEJpdHNUb1VpbnQnXG4gICwgJ2ludEJpdHNUb0Zsb2F0J1xuICAsICd1aW50Qml0c1RvRmxvYXQnXG4gICwgJ3BhY2tTbm9ybTJ4MTYnXG4gICwgJ3VucGFja1Nub3JtMngxNidcbiAgLCAncGFja1Vub3JtMngxNidcbiAgLCAndW5wYWNrVW5vcm0yeDE2J1xuICAsICdwYWNrSGFsZjJ4MTYnXG4gICwgJ3VucGFja0hhbGYyeDE2J1xuICAsICdvdXRlclByb2R1Y3QnXG4gICwgJ3RyYW5zcG9zZSdcbiAgLCAnZGV0ZXJtaW5hbnQnXG4gICwgJ2ludmVyc2UnXG4gICwgJ3RleHR1cmUnXG4gICwgJ3RleHR1cmVTaXplJ1xuICAsICd0ZXh0dXJlUHJvaidcbiAgLCAndGV4dHVyZUxvZCdcbiAgLCAndGV4dHVyZU9mZnNldCdcbiAgLCAndGV4ZWxGZXRjaCdcbiAgLCAndGV4ZWxGZXRjaE9mZnNldCdcbiAgLCAndGV4dHVyZVByb2pPZmZzZXQnXG4gICwgJ3RleHR1cmVMb2RPZmZzZXQnXG4gICwgJ3RleHR1cmVQcm9qTG9kJ1xuICAsICd0ZXh0dXJlUHJvakxvZE9mZnNldCdcbiAgLCAndGV4dHVyZUdyYWQnXG4gICwgJ3RleHR1cmVHcmFkT2Zmc2V0J1xuICAsICd0ZXh0dXJlUHJvakdyYWQnXG4gICwgJ3RleHR1cmVQcm9qR3JhZE9mZnNldCdcbl0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvYnVpbHRpbnMtMzAwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBfYXRvYihzdHIpIHtcbiAgcmV0dXJuIGF0b2Ioc3RyKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYXRvYi1saXRlL2F0b2ItYnJvd3Nlci5qc1xuLy8gbW9kdWxlIGlkID0gMjhcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgcGFkTGVmdCA9IHJlcXVpcmUoJ3BhZC1sZWZ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRMaW5lTnVtYmVyc1xuZnVuY3Rpb24gYWRkTGluZU51bWJlcnMgKHN0cmluZywgc3RhcnQsIGRlbGltKSB7XG4gIHN0YXJ0ID0gdHlwZW9mIHN0YXJ0ID09PSAnbnVtYmVyJyA/IHN0YXJ0IDogMVxuICBkZWxpbSA9IGRlbGltIHx8ICc6ICdcblxuICB2YXIgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKVxuICB2YXIgdG90YWxEaWdpdHMgPSBTdHJpbmcobGluZXMubGVuZ3RoICsgc3RhcnQgLSAxKS5sZW5ndGhcbiAgcmV0dXJuIGxpbmVzLm1hcChmdW5jdGlvbiAobGluZSwgaSkge1xuICAgIHZhciBjID0gaSArIHN0YXJ0XG4gICAgdmFyIGRpZ2l0cyA9IFN0cmluZyhjKS5sZW5ndGhcbiAgICB2YXIgcHJlZml4ID0gcGFkTGVmdChjLCB0b3RhbERpZ2l0cyAtIGRpZ2l0cylcbiAgICByZXR1cm4gcHJlZml4ICsgZGVsaW0gKyBsaW5lXG4gIH0pLmpvaW4oJ1xcbicpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hZGQtbGluZS1udW1iZXJzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogcGFkLWxlZnQgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3BhZC1sZWZ0PlxuICpcbiAqIENvcHlyaWdodCAoYykgMjAxNC0yMDE1LCBKb24gU2NobGlua2VydC5cbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZS5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGFkTGVmdChzdHIsIG51bSwgY2gpIHtcbiAgY2ggPSB0eXBlb2YgY2ggIT09ICd1bmRlZmluZWQnID8gKGNoICsgJycpIDogJyAnO1xuICByZXR1cm4gcmVwZWF0KGNoLCBudW0pICsgc3RyO1xufTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9wYWQtbGVmdC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKiFcbiAqIHJlcGVhdC1zdHJpbmcgPGh0dHBzOi8vZ2l0aHViLmNvbS9qb25zY2hsaW5rZXJ0L3JlcGVhdC1zdHJpbmc+XG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0LTIwMTUsIEpvbiBTY2hsaW5rZXJ0LlxuICogTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBSZXN1bHRzIGNhY2hlXG4gKi9cblxudmFyIHJlcyA9ICcnO1xudmFyIGNhY2hlO1xuXG4vKipcbiAqIEV4cG9zZSBgcmVwZWF0YFxuICovXG5cbm1vZHVsZS5leHBvcnRzID0gcmVwZWF0O1xuXG4vKipcbiAqIFJlcGVhdCB0aGUgZ2l2ZW4gYHN0cmluZ2AgdGhlIHNwZWNpZmllZCBgbnVtYmVyYFxuICogb2YgdGltZXMuXG4gKlxuICogKipFeGFtcGxlOioqXG4gKlxuICogYGBganNcbiAqIHZhciByZXBlYXQgPSByZXF1aXJlKCdyZXBlYXQtc3RyaW5nJyk7XG4gKiByZXBlYXQoJ0EnLCA1KTtcbiAqIC8vPT4gQUFBQUFcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBgc3RyaW5nYCBUaGUgc3RyaW5nIHRvIHJlcGVhdFxuICogQHBhcmFtIHtOdW1iZXJ9IGBudW1iZXJgIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gcmVwZWF0IHRoZSBzdHJpbmdcbiAqIEByZXR1cm4ge1N0cmluZ30gUmVwZWF0ZWQgc3RyaW5nXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmZ1bmN0aW9uIHJlcGVhdChzdHIsIG51bSkge1xuICBpZiAodHlwZW9mIHN0ciAhPT0gJ3N0cmluZycpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleHBlY3RlZCBhIHN0cmluZycpO1xuICB9XG5cbiAgLy8gY292ZXIgY29tbW9uLCBxdWljayB1c2UgY2FzZXNcbiAgaWYgKG51bSA9PT0gMSkgcmV0dXJuIHN0cjtcbiAgaWYgKG51bSA9PT0gMikgcmV0dXJuIHN0ciArIHN0cjtcblxuICB2YXIgbWF4ID0gc3RyLmxlbmd0aCAqIG51bTtcbiAgaWYgKGNhY2hlICE9PSBzdHIgfHwgdHlwZW9mIGNhY2hlID09PSAndW5kZWZpbmVkJykge1xuICAgIGNhY2hlID0gc3RyO1xuICAgIHJlcyA9ICcnO1xuICB9IGVsc2UgaWYgKHJlcy5sZW5ndGggPj0gbWF4KSB7XG4gICAgcmV0dXJuIHJlcy5zdWJzdHIoMCwgbWF4KTtcbiAgfVxuXG4gIHdoaWxlIChtYXggPiByZXMubGVuZ3RoICYmIG51bSA+IDEpIHtcbiAgICBpZiAobnVtICYgMSkge1xuICAgICAgcmVzICs9IHN0cjtcbiAgICB9XG5cbiAgICBudW0gPj49IDE7XG4gICAgc3RyICs9IHN0cjtcbiAgfVxuXG4gIHJlcyArPSBzdHI7XG4gIHJlcyA9IHJlcy5zdWJzdHIoMCwgbWF4KTtcbiAgcmV0dXJuIHJlcztcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3JlcGVhdC1zdHJpbmcvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gT3JpZ2luYWwgLSBAR296b2xhLlxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vR296YWxhLzEyNjk5OTFcbi8vIFRoaXMgaXMgYSByZWltcGxlbWVudGVkIHZlcnNpb24gKHdpdGggYSBmZXcgYnVnIGZpeGVzKS5cblxudmFyIGNyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGUtc3RvcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3ZWFrTWFwO1xuXG5mdW5jdGlvbiB3ZWFrTWFwKCkge1xuICAgIHZhciBwcml2YXRlcyA9IGNyZWF0ZVN0b3JlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnZ2V0JzogZnVuY3Rpb24gKGtleSwgZmFsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzdG9yZSA9IHByaXZhdGVzKGtleSlcbiAgICAgICAgICAgIHJldHVybiBzdG9yZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/XG4gICAgICAgICAgICAgICAgc3RvcmUudmFsdWUgOiBmYWxsYmFja1xuICAgICAgICB9LFxuICAgICAgICAnc2V0JzogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHByaXZhdGVzKGtleSkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICAnaGFzJzogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZhbHVlJyBpbiBwcml2YXRlcyhrZXkpO1xuICAgICAgICB9LFxuICAgICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZSBwcml2YXRlcyhrZXkpLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsInZhciBoaWRkZW5TdG9yZSA9IHJlcXVpcmUoJy4vaGlkZGVuLXN0b3JlLmpzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU3RvcmU7XG5cbmZ1bmN0aW9uIGNyZWF0ZVN0b3JlKCkge1xuICAgIHZhciBrZXkgPSB7fTtcblxuICAgIHJldHVybiBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIGlmICgodHlwZW9mIG9iaiAhPT0gJ29iamVjdCcgfHwgb2JqID09PSBudWxsKSAmJlxuICAgICAgICAgICAgdHlwZW9mIG9iaiAhPT0gJ2Z1bmN0aW9uJ1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignV2Vha21hcC1zaGltOiBLZXkgbXVzdCBiZSBvYmplY3QnKVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0b3JlID0gb2JqLnZhbHVlT2Yoa2V5KTtcbiAgICAgICAgcmV0dXJuIHN0b3JlICYmIHN0b3JlLmlkZW50aXR5ID09PSBrZXkgP1xuICAgICAgICAgICAgc3RvcmUgOiBoaWRkZW5TdG9yZShvYmosIGtleSk7XG4gICAgfTtcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3dlYWttYXAtc2hpbS9jcmVhdGUtc3RvcmUuanNcbi8vIG1vZHVsZSBpZCA9IDMzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwibW9kdWxlLmV4cG9ydHMgPSBoaWRkZW5TdG9yZTtcblxuZnVuY3Rpb24gaGlkZGVuU3RvcmUob2JqLCBrZXkpIHtcbiAgICB2YXIgc3RvcmUgPSB7IGlkZW50aXR5OiBrZXkgfTtcbiAgICB2YXIgdmFsdWVPZiA9IG9iai52YWx1ZU9mO1xuXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgXCJ2YWx1ZU9mXCIsIHtcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlICE9PSBrZXkgP1xuICAgICAgICAgICAgICAgIHZhbHVlT2YuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IHN0b3JlO1xuICAgICAgICB9LFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHN0b3JlO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2hpZGRlbi1zdG9yZS5qc1xuLy8gbW9kdWxlIGlkID0gMzRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy51bmlmb3JtcyAgICA9IHJ1bnRpbWVVbmlmb3Jtc1xuZXhwb3J0cy5hdHRyaWJ1dGVzICA9IHJ1bnRpbWVBdHRyaWJ1dGVzXG5cbnZhciBHTF9UT19HTFNMX1RZUEVTID0ge1xuICAnRkxPQVQnOiAgICAgICAnZmxvYXQnLFxuICAnRkxPQVRfVkVDMic6ICAndmVjMicsXG4gICdGTE9BVF9WRUMzJzogICd2ZWMzJyxcbiAgJ0ZMT0FUX1ZFQzQnOiAgJ3ZlYzQnLFxuICAnSU5UJzogICAgICAgICAnaW50JyxcbiAgJ0lOVF9WRUMyJzogICAgJ2l2ZWMyJyxcbiAgJ0lOVF9WRUMzJzogICAgJ2l2ZWMzJyxcbiAgJ0lOVF9WRUM0JzogICAgJ2l2ZWM0JyxcbiAgJ0JPT0wnOiAgICAgICAgJ2Jvb2wnLFxuICAnQk9PTF9WRUMyJzogICAnYnZlYzInLFxuICAnQk9PTF9WRUMzJzogICAnYnZlYzMnLFxuICAnQk9PTF9WRUM0JzogICAnYnZlYzQnLFxuICAnRkxPQVRfTUFUMic6ICAnbWF0MicsXG4gICdGTE9BVF9NQVQzJzogICdtYXQzJyxcbiAgJ0ZMT0FUX01BVDQnOiAgJ21hdDQnLFxuICAnU0FNUExFUl8yRCc6ICAnc2FtcGxlcjJEJyxcbiAgJ1NBTVBMRVJfQ1VCRSc6J3NhbXBsZXJDdWJlJ1xufVxuXG52YXIgR0xfVEFCTEUgPSBudWxsXG5cbmZ1bmN0aW9uIGdldFR5cGUoZ2wsIHR5cGUpIHtcbiAgaWYoIUdMX1RBQkxFKSB7XG4gICAgdmFyIHR5cGVOYW1lcyA9IE9iamVjdC5rZXlzKEdMX1RPX0dMU0xfVFlQRVMpXG4gICAgR0xfVEFCTEUgPSB7fVxuICAgIGZvcih2YXIgaT0wOyBpPHR5cGVOYW1lcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHRuID0gdHlwZU5hbWVzW2ldXG4gICAgICBHTF9UQUJMRVtnbFt0bl1dID0gR0xfVE9fR0xTTF9UWVBFU1t0bl1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEdMX1RBQkxFW3R5cGVdXG59XG5cbmZ1bmN0aW9uIHJ1bnRpbWVVbmlmb3JtcyhnbCwgcHJvZ3JhbSkge1xuICB2YXIgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUylcbiAgdmFyIHJlc3VsdCA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPG51bVVuaWZvcm1zOyArK2kpIHtcbiAgICB2YXIgaW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaSlcbiAgICBpZihpbmZvKSB7XG4gICAgICB2YXIgdHlwZSA9IGdldFR5cGUoZ2wsIGluZm8udHlwZSlcbiAgICAgIGlmKGluZm8uc2l6ZSA+IDEpIHtcbiAgICAgICAgZm9yKHZhciBqPTA7IGo8aW5mby5zaXplOyArK2opIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUucmVwbGFjZSgnWzBdJywgJ1snICsgaiArICddJyksXG4gICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gcnVudGltZUF0dHJpYnV0ZXMoZ2wsIHByb2dyYW0pIHtcbiAgdmFyIG51bUF0dHJpYnV0ZXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKVxuICB2YXIgcmVzdWx0ID0gW11cbiAgZm9yKHZhciBpPTA7IGk8bnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgdmFyIGluZm8gPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSlcbiAgICBpZihpbmZvKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgdHlwZTogZ2V0VHlwZShnbCwgaW5mby50eXBlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9ydW50aW1lLXJlZmxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwidmFyIHN0YXRlUmVzZXQgPSByZXF1aXJlKCcuL3N0YXRlJylcblxubW9kdWxlLmV4cG9ydHMgPSBSZXNldFxubW9kdWxlLmV4cG9ydHMuc3RhdGUgPSBzdGF0ZVJlc2V0XG5cbmZ1bmN0aW9uIFJlc2V0KGdsKSB7XG4gIHZhciBjbGVhbnVwID0gW1xuICAgICdCdWZmZXInXG4gICwgJ0ZyYW1lYnVmZmVyJ1xuICAsICdSZW5kZXJidWZmZXInXG4gICwgJ1Byb2dyYW0nXG4gICwgJ1NoYWRlcidcbiAgLCAnVGV4dHVyZSdcbiAgXS5tYXAoZnVuY3Rpb24oc3VmZml4KSB7XG4gICAgdmFyIHJlbW92ZSAgID0gJ2RlbGV0ZScgKyBzdWZmaXhcbiAgICB2YXIgY3JlYXRlICAgPSAnY3JlYXRlJyArIHN1ZmZpeFxuICAgIHZhciBvcmlnaW5hbCA9IGdsW2NyZWF0ZV1cbiAgICB2YXIgaGFuZGxlcyAgPSBbXVxuXG4gICAgZ2xbY3JlYXRlXSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhhbmRsZSA9IG9yaWdpbmFsLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbiAgICAgIGhhbmRsZXMucHVzaChoYW5kbGUpXG4gICAgICByZXR1cm4gaGFuZGxlXG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVtb3ZlOiByZW1vdmVcbiAgICAgICwgaGFuZGxlczogaGFuZGxlc1xuICAgIH1cbiAgfSlcblxuICByZXR1cm4gZnVuY3Rpb24gcmVzZXQoKSB7XG4gICAgY2xlYW51cC5mb3JFYWNoKGZ1bmN0aW9uKGtpbmQpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2luZC5oYW5kbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdsW2tpbmQucmVtb3ZlXS5jYWxsKGdsLCBraW5kLmhhbmRsZXNbaV0pXG4gICAgICB9XG4gICAgfSlcblxuICAgIHN0YXRlUmVzZXQoZ2wpXG5cbiAgICByZXR1cm4gZ2xcbiAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtcmVzZXQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy9cbi8vIFRoZSBjb2RlIHRoYXQgZm9sbG93cyB3YXMgb3JpZ2luYWxseSBzb3VyY2VkIGZyb206XG4vLyBodHRwczovL3d3dy5raHJvbm9zLm9yZy9yZWdpc3RyeS93ZWJnbC9zZGsvZGVidWcvd2ViZ2wtZGVidWcuanNcbi8vXG5cbm1vZHVsZS5leHBvcnRzID0gc3RhdGVSZXNldFxuXG4vKlxuKiogQ29weXJpZ2h0IChjKSAyMDEyIFRoZSBLaHJvbm9zIEdyb3VwIEluYy5cbioqXG4qKiBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmcgYVxuKiogY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZC9vciBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuKiogXCJNYXRlcmlhbHNcIiksIHRvIGRlYWwgaW4gdGhlIE1hdGVyaWFscyB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbioqIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbioqIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgTWF0ZXJpYWxzLCBhbmQgdG9cbioqIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIE1hdGVyaWFscyBhcmUgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvXG4qKiB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4qKlxuKiogVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbioqIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIE1hdGVyaWFscy5cbioqXG4qKiBUSEUgTUFURVJJQUxTIEFSRSBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4qKiBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0ZcbioqIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC5cbioqIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZXG4qKiBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULFxuKiogVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEVcbioqIE1BVEVSSUFMUyBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRSBNQVRFUklBTFMuXG4qL1xuZnVuY3Rpb24gc3RhdGVSZXNldChnbCkge1xuICB2YXIgbnVtQXR0cmlicyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVkVSVEVYX0FUVFJJQlMpXG4gIHZhciB0bXAgPSBnbC5jcmVhdGVCdWZmZXIoKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgdG1wKVxuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbnVtQXR0cmliczsgKytpaSkge1xuICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpaSlcbiAgICBnbC52ZXJ0ZXhBdHRyaWJQb2ludGVyKGlpLCA0LCBnbC5GTE9BVCwgZmFsc2UsIDAsIDApXG4gICAgZ2wudmVydGV4QXR0cmliMWYoaWksIDApXG4gIH1cbiAgZ2wuZGVsZXRlQnVmZmVyKHRtcClcblxuICB2YXIgbnVtVGV4dHVyZVVuaXRzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9URVhUVVJFX0lNQUdFX1VOSVRTKVxuICBmb3IgKHZhciBpaSA9IDA7IGlpIDwgbnVtVGV4dHVyZVVuaXRzOyArK2lpKSB7XG4gICAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMCArIGlpKVxuICAgIGdsLmJpbmRUZXh0dXJlKGdsLlRFWFRVUkVfQ1VCRV9NQVAsIG51bGwpXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV8yRCwgbnVsbClcbiAgfVxuXG4gIGdsLmFjdGl2ZVRleHR1cmUoZ2wuVEVYVFVSRTApXG4gIGdsLnVzZVByb2dyYW0obnVsbClcbiAgZ2wuYmluZEJ1ZmZlcihnbC5BUlJBWV9CVUZGRVIsIG51bGwpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIsIG51bGwpXG4gIGdsLmJpbmRGcmFtZWJ1ZmZlcihnbC5GUkFNRUJVRkZFUiwgbnVsbClcbiAgZ2wuYmluZFJlbmRlcmJ1ZmZlcihnbC5SRU5ERVJCVUZGRVIsIG51bGwpXG4gIGdsLmRpc2FibGUoZ2wuQkxFTkQpXG4gIGdsLmRpc2FibGUoZ2wuQ1VMTF9GQUNFKVxuICBnbC5kaXNhYmxlKGdsLkRFUFRIX1RFU1QpXG4gIGdsLmRpc2FibGUoZ2wuRElUSEVSKVxuICBnbC5kaXNhYmxlKGdsLlNDSVNTT1JfVEVTVClcbiAgZ2wuYmxlbmRDb2xvcigwLCAwLCAwLCAwKVxuICBnbC5ibGVuZEVxdWF0aW9uKGdsLkZVTkNfQUREKVxuICBnbC5ibGVuZEZ1bmMoZ2wuT05FLCBnbC5aRVJPKVxuICBnbC5jbGVhckNvbG9yKDAsIDAsIDAsIDApXG4gIGdsLmNsZWFyRGVwdGgoMSlcbiAgZ2wuY2xlYXJTdGVuY2lsKC0xKVxuICBnbC5jb2xvck1hc2sodHJ1ZSwgdHJ1ZSwgdHJ1ZSwgdHJ1ZSlcbiAgZ2wuY3VsbEZhY2UoZ2wuQkFDSylcbiAgZ2wuZGVwdGhGdW5jKGdsLkxFU1MpXG4gIGdsLmRlcHRoTWFzayh0cnVlKVxuICBnbC5kZXB0aFJhbmdlKDAsIDEpXG4gIGdsLmZyb250RmFjZShnbC5DQ1cpXG4gIGdsLmhpbnQoZ2wuR0VORVJBVEVfTUlQTUFQX0hJTlQsIGdsLkRPTlRfQ0FSRSlcbiAgZ2wubGluZVdpZHRoKDEpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlBBQ0tfQUxJR05NRU5ULCA0KVxuICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfQUxJR05NRU5ULCA0KVxuICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfRkxJUF9ZX1dFQkdMLCBmYWxzZSlcbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuVU5QQUNLX1BSRU1VTFRJUExZX0FMUEhBX1dFQkdMLCBmYWxzZSlcbiAgZ2wucG9seWdvbk9mZnNldCgwLCAwKVxuICBnbC5zYW1wbGVDb3ZlcmFnZSgxLCBmYWxzZSlcbiAgZ2wuc2Npc3NvcigwLCAwLCBnbC5jYW52YXMud2lkdGgsIGdsLmNhbnZhcy5oZWlnaHQpXG4gIGdsLnN0ZW5jaWxGdW5jKGdsLkFMV0FZUywgMCwgMHhGRkZGRkZGRilcbiAgZ2wuc3RlbmNpbE1hc2soMHhGRkZGRkZGRilcbiAgZ2wuc3RlbmNpbE9wKGdsLktFRVAsIGdsLktFRVAsIGdsLktFRVApXG4gIGdsLnZpZXdwb3J0KDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodClcbiAgZ2wuY2xlYXIoZ2wuQ09MT1JfQlVGRkVSX0JJVCB8IGdsLkRFUFRIX0JVRkZFUl9CSVQgfCBnbC5TVEVOQ0lMX0JVRkZFUl9CSVQpXG5cbiAgcmV0dXJuIGdsXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1yZXNldC9zdGF0ZS5qc1xuLy8gbW9kdWxlIGlkID0gMzdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJtb2R1bGUuZXhwb3J0cyA9XG4gIGdsb2JhbC5wZXJmb3JtYW5jZSAmJlxuICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID8gZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKVxuICB9IDogRGF0ZS5ub3cgfHwgZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiArbmV3IERhdGVcbiAgfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmlnaHQtbm93L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciB3ZWFrTWFwICAgICAgPSB0eXBlb2YgV2Vha01hcCA9PT0gJ3VuZGVmaW5lZCcgPyByZXF1aXJlKCd3ZWFrLW1hcCcpIDogV2Vha01hcFxudmFyIGNyZWF0ZUJ1ZmZlciA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlVkFPICAgID0gcmVxdWlyZSgnZ2wtdmFvJylcblxudmFyIFRyaWFuZ2xlQ2FjaGUgPSBuZXcgd2Vha01hcCgpXG5cbmZ1bmN0aW9uIGNyZWF0ZUFCaWdUcmlhbmdsZShnbCkge1xuXG4gIHZhciB0cmlhbmdsZVZBTyA9IFRyaWFuZ2xlQ2FjaGUuZ2V0KGdsKVxuICB2YXIgaGFuZGxlID0gdHJpYW5nbGVWQU8gJiYgKHRyaWFuZ2xlVkFPLl90cmlhbmdsZUJ1ZmZlci5oYW5kbGUgfHwgdHJpYW5nbGVWQU8uX3RyaWFuZ2xlQnVmZmVyLmJ1ZmZlcilcbiAgaWYoIWhhbmRsZSB8fCAhZ2wuaXNCdWZmZXIoaGFuZGxlKSkge1xuICAgIHZhciBidWYgPSBjcmVhdGVCdWZmZXIoZ2wsIG5ldyBGbG9hdDMyQXJyYXkoWy0xLCAtMSwgLTEsIDQsIDQsIC0xXSkpXG4gICAgdHJpYW5nbGVWQU8gPSBjcmVhdGVWQU8oZ2wsIFtcbiAgICAgIHsgYnVmZmVyOiBidWYsXG4gICAgICAgIHR5cGU6IGdsLkZMT0FULFxuICAgICAgICBzaXplOiAyXG4gICAgICB9XG4gICAgXSlcbiAgICB0cmlhbmdsZVZBTy5fdHJpYW5nbGVCdWZmZXIgPSBidWZcbiAgICBUcmlhbmdsZUNhY2hlLnNldChnbCwgdHJpYW5nbGVWQU8pXG4gIH1cbiAgdHJpYW5nbGVWQU8uYmluZCgpXG4gIGdsLmRyYXdBcnJheXMoZ2wuVFJJQU5HTEVTLCAwLCAzKVxuICB0cmlhbmdsZVZBTy51bmJpbmQoKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFCaWdUcmlhbmdsZVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYS1iaWctdHJpYW5nbGUvdHJpYW5nbGUuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiLy8gQ29weXJpZ2h0IChDKSAyMDExIEdvb2dsZSBJbmMuXG4vL1xuLy8gTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcbi8vIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cbi8vIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuLy9cbi8vIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuLy9cbi8vIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcbi8vIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcbi8vIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxuLy8gU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxuLy8gbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBJbnN0YWxsIGEgbGVha3kgV2Vha01hcCBlbXVsYXRpb24gb24gcGxhdGZvcm1zIHRoYXRcbiAqIGRvbid0IHByb3ZpZGUgYSBidWlsdC1pbiBvbmUuXG4gKlxuICogPHA+QXNzdW1lcyB0aGF0IGFuIEVTNSBwbGF0Zm9ybSB3aGVyZSwgaWYge0Bjb2RlIFdlYWtNYXB9IGlzXG4gKiBhbHJlYWR5IHByZXNlbnQsIHRoZW4gaXQgY29uZm9ybXMgdG8gdGhlIGFudGljaXBhdGVkIEVTNlxuICogc3BlY2lmaWNhdGlvbi4gVG8gcnVuIHRoaXMgZmlsZSBvbiBhbiBFUzUgb3IgYWxtb3N0IEVTNVxuICogaW1wbGVtZW50YXRpb24gd2hlcmUgdGhlIHtAY29kZSBXZWFrTWFwfSBzcGVjaWZpY2F0aW9uIGRvZXMgbm90XG4gKiBxdWl0ZSBjb25mb3JtLCBydW4gPGNvZGU+cmVwYWlyRVM1LmpzPC9jb2RlPiBmaXJzdC5cbiAqXG4gKiA8cD5FdmVuIHRob3VnaCBXZWFrTWFwTW9kdWxlIGlzIG5vdCBnbG9iYWwsIHRoZSBsaW50ZXIgdGhpbmtzIGl0XG4gKiBpcywgd2hpY2ggaXMgd2h5IGl0IGlzIGluIHRoZSBvdmVycmlkZXMgbGlzdCBiZWxvdy5cbiAqXG4gKiA8cD5OT1RFOiBCZWZvcmUgdXNpbmcgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBpbiBhIG5vbi1TRVNcbiAqIGVudmlyb25tZW50LCBzZWUgdGhlIG5vdGUgYmVsb3cgYWJvdXQgaGlkZGVuUmVjb3JkLlxuICpcbiAqIEBhdXRob3IgTWFyayBTLiBNaWxsZXJcbiAqIEByZXF1aXJlcyBjcnlwdG8sIEFycmF5QnVmZmVyLCBVaW50OEFycmF5LCBuYXZpZ2F0b3IsIGNvbnNvbGVcbiAqIEBvdmVycmlkZXMgV2Vha01hcCwgc2VzLCBQcm94eVxuICogQG92ZXJyaWRlcyBXZWFrTWFwTW9kdWxlXG4gKi9cblxuLyoqXG4gKiBUaGlzIHtAY29kZSBXZWFrTWFwfSBlbXVsYXRpb24gaXMgb2JzZXJ2YWJseSBlcXVpdmFsZW50IHRvIHRoZVxuICogRVMtSGFybW9ueSBXZWFrTWFwLCBidXQgd2l0aCBsZWFraWVyIGdhcmJhZ2UgY29sbGVjdGlvbiBwcm9wZXJ0aWVzLlxuICpcbiAqIDxwPkFzIHdpdGggdHJ1ZSBXZWFrTWFwcywgaW4gdGhpcyBlbXVsYXRpb24sIGEga2V5IGRvZXMgbm90XG4gKiByZXRhaW4gbWFwcyBpbmRleGVkIGJ5IHRoYXQga2V5IGFuZCAoY3J1Y2lhbGx5KSBhIG1hcCBkb2VzIG5vdFxuICogcmV0YWluIHRoZSBrZXlzIGl0IGluZGV4ZXMuIEEgbWFwIGJ5IGl0c2VsZiBhbHNvIGRvZXMgbm90IHJldGFpblxuICogdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggdGhhdCBtYXAuXG4gKlxuICogPHA+SG93ZXZlciwgdGhlIHZhbHVlcyBhc3NvY2lhdGVkIHdpdGggYSBrZXkgaW4gc29tZSBtYXAgYXJlXG4gKiByZXRhaW5lZCBzbyBsb25nIGFzIHRoYXQga2V5IGlzIHJldGFpbmVkIGFuZCB0aG9zZSBhc3NvY2lhdGlvbnMgYXJlXG4gKiBub3Qgb3ZlcnJpZGRlbi4gRm9yIGV4YW1wbGUsIHdoZW4gdXNlZCB0byBzdXBwb3J0IG1lbWJyYW5lcywgYWxsXG4gKiB2YWx1ZXMgZXhwb3J0ZWQgZnJvbSBhIGdpdmVuIG1lbWJyYW5lIHdpbGwgbGl2ZSBmb3IgdGhlIGxpZmV0aW1lXG4gKiB0aGV5IHdvdWxkIGhhdmUgaGFkIGluIHRoZSBhYnNlbmNlIG9mIGFuIGludGVycG9zZWQgbWVtYnJhbmUuIEV2ZW5cbiAqIHdoZW4gdGhlIG1lbWJyYW5lIGlzIHJldm9rZWQsIGFsbCBvYmplY3RzIHRoYXQgd291bGQgaGF2ZSBiZWVuXG4gKiByZWFjaGFibGUgaW4gdGhlIGFic2VuY2Ugb2YgcmV2b2NhdGlvbiB3aWxsIHN0aWxsIGJlIHJlYWNoYWJsZSwgYXNcbiAqIGZhciBhcyB0aGUgR0MgY2FuIHRlbGwsIGV2ZW4gdGhvdWdoIHRoZXkgd2lsbCBubyBsb25nZXIgYmUgcmVsZXZhbnRcbiAqIHRvIG9uZ29pbmcgY29tcHV0YXRpb24uXG4gKlxuICogPHA+VGhlIEFQSSBpbXBsZW1lbnRlZCBoZXJlIGlzIGFwcHJveGltYXRlbHkgdGhlIEFQSSBhcyBpbXBsZW1lbnRlZFxuICogaW4gRkY2LjBhMSBhbmQgYWdyZWVkIHRvIGJ5IE1hcmtNLCBBbmRyZWFzIEdhbCwgYW5kIERhdmUgSGVybWFuLFxuICogcmF0aGVyIHRoYW4gdGhlIG9mZmlhbGx5IGFwcHJvdmVkIHByb3Bvc2FsIHBhZ2UuIFRPRE8oZXJpZ2h0cyk6XG4gKiB1cGdyYWRlIHRoZSBlY21hc2NyaXB0IFdlYWtNYXAgcHJvcG9zYWwgcGFnZSB0byBleHBsYWluIHRoaXMgQVBJXG4gKiBjaGFuZ2UgYW5kIHByZXNlbnQgdG8gRWNtYVNjcmlwdCBjb21taXR0ZWUgZm9yIHRoZWlyIGFwcHJvdmFsLlxuICpcbiAqIDxwPlRoZSBmaXJzdCBkaWZmZXJlbmNlIGJldHdlZW4gdGhlIGVtdWxhdGlvbiBoZXJlIGFuZCB0aGF0IGluXG4gKiBGRjYuMGExIGlzIHRoZSBwcmVzZW5jZSBvZiBub24gZW51bWVyYWJsZSB7QGNvZGUgZ2V0X19fLCBoYXNfX18sXG4gKiBzZXRfX18sIGFuZCBkZWxldGVfX199IG1ldGhvZHMgb24gV2Vha01hcCBpbnN0YW5jZXMgdG8gcmVwcmVzZW50XG4gKiB3aGF0IHdvdWxkIGJlIHRoZSBoaWRkZW4gaW50ZXJuYWwgcHJvcGVydGllcyBvZiBhIHByaW1pdGl2ZVxuICogaW1wbGVtZW50YXRpb24uIFdoZXJlYXMgdGhlIEZGNi4wYTEgV2Vha01hcC5wcm90b3R5cGUgbWV0aG9kc1xuICogcmVxdWlyZSB0aGVpciB7QGNvZGUgdGhpc30gdG8gYmUgYSBnZW51aW5lIFdlYWtNYXAgaW5zdGFuY2UgKGkuZS4sXG4gKiBhbiBvYmplY3Qgb2Yge0Bjb2RlIFtbQ2xhc3NdXX0gXCJXZWFrTWFwfSksIHNpbmNlIHRoZXJlIGlzIG5vdGhpbmdcbiAqIHVuZm9yZ2VhYmxlIGFib3V0IHRoZSBwc2V1ZG8taW50ZXJuYWwgbWV0aG9kIG5hbWVzIHVzZWQgaGVyZSxcbiAqIG5vdGhpbmcgcHJldmVudHMgdGhlc2UgZW11bGF0ZWQgcHJvdG90eXBlIG1ldGhvZHMgZnJvbSBiZWluZ1xuICogYXBwbGllZCB0byBub24tV2Vha01hcHMgd2l0aCBwc2V1ZG8taW50ZXJuYWwgbWV0aG9kcyBvZiB0aGUgc2FtZVxuICogbmFtZXMuXG4gKlxuICogPHA+QW5vdGhlciBkaWZmZXJlbmNlIGlzIHRoYXQgb3VyIGVtdWxhdGVkIHtAY29kZVxuICogV2Vha01hcC5wcm90b3R5cGV9IGlzIG5vdCBpdHNlbGYgYSBXZWFrTWFwLiBBIHByb2JsZW0gd2l0aCB0aGVcbiAqIGN1cnJlbnQgRkY2LjBhMSBBUEkgaXMgdGhhdCBXZWFrTWFwLnByb3RvdHlwZSBpcyBpdHNlbGYgYSBXZWFrTWFwXG4gKiBwcm92aWRpbmcgYW1iaWVudCBtdXRhYmlsaXR5IGFuZCBhbiBhbWJpZW50IGNvbW11bmljYXRpb25zXG4gKiBjaGFubmVsLiBUaHVzLCBpZiBhIFdlYWtNYXAgaXMgYWxyZWFkeSBwcmVzZW50IGFuZCBoYXMgdGhpc1xuICogcHJvYmxlbSwgcmVwYWlyRVM1LmpzIHdyYXBzIGl0IGluIGEgc2FmZSB3cmFwcHBlciBpbiBvcmRlciB0b1xuICogcHJldmVudCBhY2Nlc3MgdG8gdGhpcyBjaGFubmVsLiAoU2VlXG4gKiBQQVRDSF9NVVRBQkxFX0ZST1pFTl9XRUFLTUFQX1BST1RPIGluIHJlcGFpckVTNS5qcykuXG4gKi9cblxuLyoqXG4gKiBJZiB0aGlzIGlzIGEgZnVsbCA8YSBocmVmPVxuICogXCJodHRwOi8vY29kZS5nb29nbGUuY29tL3AvZXMtbGFiL3dpa2kvU2VjdXJlYWJsZUVTNVwiXG4gKiA+c2VjdXJlYWJsZSBFUzU8L2E+IHBsYXRmb3JtIGFuZCB0aGUgRVMtSGFybW9ueSB7QGNvZGUgV2Vha01hcH0gaXNcbiAqIGFic2VudCwgaW5zdGFsbCBhbiBhcHByb3hpbWF0ZSBlbXVsYXRpb24uXG4gKlxuICogPHA+SWYgV2Vha01hcCBpcyBwcmVzZW50IGJ1dCBjYW5ub3Qgc3RvcmUgc29tZSBvYmplY3RzLCB1c2Ugb3VyIGFwcHJveGltYXRlXG4gKiBlbXVsYXRpb24gYXMgYSB3cmFwcGVyLlxuICpcbiAqIDxwPklmIHRoaXMgaXMgYWxtb3N0IGEgc2VjdXJlYWJsZSBFUzUgcGxhdGZvcm0sIHRoZW4gV2Vha01hcC5qc1xuICogc2hvdWxkIGJlIHJ1biBhZnRlciByZXBhaXJFUzUuanMuXG4gKlxuICogPHA+U2VlIHtAY29kZSBXZWFrTWFwfSBmb3IgZG9jdW1lbnRhdGlvbiBvZiB0aGUgZ2FyYmFnZSBjb2xsZWN0aW9uXG4gKiBwcm9wZXJ0aWVzIG9mIHRoaXMgV2Vha01hcCBlbXVsYXRpb24uXG4gKi9cbihmdW5jdGlvbiBXZWFrTWFwTW9kdWxlKCkge1xuICBcInVzZSBzdHJpY3RcIjtcblxuICBpZiAodHlwZW9mIHNlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgc2VzLm9rICYmICFzZXMub2soKSkge1xuICAgIC8vIGFscmVhZHkgdG9vIGJyb2tlbiwgc28gZ2l2ZSB1cFxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8qKlxuICAgKiBJbiBzb21lIGNhc2VzIChjdXJyZW50IEZpcmVmb3gpLCB3ZSBtdXN0IG1ha2UgYSBjaG9pY2UgYmV0d2VlZW4gYVxuICAgKiBXZWFrTWFwIHdoaWNoIGlzIGNhcGFibGUgb2YgdXNpbmcgYWxsIHZhcmlldGllcyBvZiBob3N0IG9iamVjdHMgYXNcbiAgICoga2V5cyBhbmQgb25lIHdoaWNoIGlzIGNhcGFibGUgb2Ygc2FmZWx5IHVzaW5nIHByb3hpZXMgYXMga2V5cy4gU2VlXG4gICAqIGNvbW1lbnRzIGJlbG93IGFib3V0IEhvc3RXZWFrTWFwIGFuZCBEb3VibGVXZWFrTWFwIGZvciBkZXRhaWxzLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uICh3aGljaCBpcyBhIGdsb2JhbCwgbm90IGV4cG9zZWQgdG8gZ3Vlc3RzKSBtYXJrcyBhXG4gICAqIFdlYWtNYXAgYXMgcGVybWl0dGVkIHRvIGRvIHdoYXQgaXMgbmVjZXNzYXJ5IHRvIGluZGV4IGFsbCBob3N0XG4gICAqIG9iamVjdHMsIGF0IHRoZSBjb3N0IG9mIG1ha2luZyBpdCB1bnNhZmUgZm9yIHByb3hpZXMuXG4gICAqXG4gICAqIERvIG5vdCBhcHBseSB0aGlzIGZ1bmN0aW9uIHRvIGFueXRoaW5nIHdoaWNoIGlzIG5vdCBhIGdlbnVpbmVcbiAgICogZnJlc2ggV2Vha01hcC5cbiAgICovXG4gIGZ1bmN0aW9uIHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyhtYXApIHtcbiAgICAvLyBpZGVudGl0eSBvZiBmdW5jdGlvbiB1c2VkIGFzIGEgc2VjcmV0IC0tIGdvb2QgZW5vdWdoIGFuZCBjaGVhcFxuICAgIGlmIChtYXAucGVybWl0SG9zdE9iamVjdHNfX18pIHtcbiAgICAgIG1hcC5wZXJtaXRIb3N0T2JqZWN0c19fXyh3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMpO1xuICAgIH1cbiAgfVxuICBpZiAodHlwZW9mIHNlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBzZXMud2Vha01hcFBlcm1pdEhvc3RPYmplY3RzID0gd2Vha01hcFBlcm1pdEhvc3RPYmplY3RzO1xuICB9XG5cbiAgLy8gSUUgMTEgaGFzIG5vIFByb3h5IGJ1dCBoYXMgYSBicm9rZW4gV2Vha01hcCBzdWNoIHRoYXQgd2UgbmVlZCB0byBwYXRjaFxuICAvLyBpdCB1c2luZyBEb3VibGVXZWFrTWFwOyB0aGlzIGZsYWcgdGVsbHMgRG91YmxlV2Vha01hcCBzby5cbiAgdmFyIGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgPSBmYWxzZTtcblxuICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbHJlYWR5IGEgZ29vZC1lbm91Z2ggV2Vha01hcCBpbXBsZW1lbnRhdGlvbiwgYW5kIGlmIHNvXG4gIC8vIGV4aXQgd2l0aG91dCByZXBsYWNpbmcgaXQuXG4gIGlmICh0eXBlb2YgV2Vha01hcCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHZhciBIb3N0V2Vha01hcCA9IFdlYWtNYXA7XG4gICAgLy8gVGhlcmUgaXMgYSBXZWFrTWFwIC0tIGlzIGl0IGdvb2QgZW5vdWdoP1xuICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAvRmlyZWZveC8udGVzdChuYXZpZ2F0b3IudXNlckFnZW50KSkge1xuICAgICAgLy8gV2UncmUgbm93ICphc3N1bWluZyBub3QqLCBiZWNhdXNlIGFzIG9mIHRoaXMgd3JpdGluZyAoMjAxMy0wNS0wNilcbiAgICAgIC8vIEZpcmVmb3gncyBXZWFrTWFwcyBoYXZlIGEgbWlzY2VsbGFueSBvZiBvYmplY3RzIHRoZXkgd29uJ3QgYWNjZXB0LCBhbmRcbiAgICAgIC8vIHdlIGRvbid0IHdhbnQgdG8gbWFrZSBhbiBleGhhdXN0aXZlIGxpc3QsIGFuZCB0ZXN0aW5nIGZvciBqdXN0IG9uZVxuICAgICAgLy8gd2lsbCBiZSBhIHByb2JsZW0gaWYgdGhhdCBvbmUgaXMgZml4ZWQgYWxvbmUgKGFzIHRoZXkgZGlkIGZvciBFdmVudCkuXG5cbiAgICAgIC8vIElmIHRoZXJlIGlzIGEgcGxhdGZvcm0gdGhhdCB3ZSAqY2FuKiByZWxpYWJseSB0ZXN0IG9uLCBoZXJlJ3MgaG93IHRvXG4gICAgICAvLyBkbyBpdDpcbiAgICAgIC8vICB2YXIgcHJvYmxlbWF0aWMgPSAuLi4gO1xuICAgICAgLy8gIHZhciB0ZXN0SG9zdE1hcCA9IG5ldyBIb3N0V2Vha01hcCgpO1xuICAgICAgLy8gIHRyeSB7XG4gICAgICAvLyAgICB0ZXN0SG9zdE1hcC5zZXQocHJvYmxlbWF0aWMsIDEpOyAgLy8gRmlyZWZveCAyMCB3aWxsIHRocm93IGhlcmVcbiAgICAgIC8vICAgIGlmICh0ZXN0SG9zdE1hcC5nZXQocHJvYmxlbWF0aWMpID09PSAxKSB7XG4gICAgICAvLyAgICAgIHJldHVybjtcbiAgICAgIC8vICAgIH1cbiAgICAgIC8vICB9IGNhdGNoIChlKSB7fVxuXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIElFIDExIGJ1ZzogV2Vha01hcHMgc2lsZW50bHkgZmFpbCB0byBzdG9yZSBmcm96ZW4gb2JqZWN0cy5cbiAgICAgIHZhciB0ZXN0TWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG4gICAgICB2YXIgdGVzdE9iamVjdCA9IE9iamVjdC5mcmVlemUoe30pO1xuICAgICAgdGVzdE1hcC5zZXQodGVzdE9iamVjdCwgMSk7XG4gICAgICBpZiAodGVzdE1hcC5nZXQodGVzdE9iamVjdCkgIT09IDEpIHtcbiAgICAgICAgZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSA9IHRydWU7XG4gICAgICAgIC8vIEZhbGwgdGhyb3VnaCB0byBpbnN0YWxsaW5nIG91ciBXZWFrTWFwLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbW9kdWxlLmV4cG9ydHMgPSBXZWFrTWFwO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgdmFyIGhvcCA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG4gIHZhciBnb3BuID0gT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXM7XG4gIHZhciBkZWZQcm9wID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICB2YXIgaXNFeHRlbnNpYmxlID0gT2JqZWN0LmlzRXh0ZW5zaWJsZTtcblxuICAvKipcbiAgICogU2VjdXJpdHkgZGVwZW5kcyBvbiBISURERU5fTkFNRSBiZWluZyBib3RoIDxpPnVuZ3Vlc3NhYmxlPC9pPiBhbmRcbiAgICogPGk+dW5kaXNjb3ZlcmFibGU8L2k+IGJ5IHVudHJ1c3RlZCBjb2RlLlxuICAgKlxuICAgKiA8cD5HaXZlbiB0aGUga25vd24gd2Vha25lc3NlcyBvZiBNYXRoLnJhbmRvbSgpIG9uIGV4aXN0aW5nXG4gICAqIGJyb3dzZXJzLCBpdCBkb2VzIG5vdCBnZW5lcmF0ZSB1bmd1ZXNzYWJpbGl0eSB3ZSBjYW4gYmUgY29uZmlkZW50XG4gICAqIG9mLlxuICAgKlxuICAgKiA8cD5JdCBpcyB0aGUgbW9ua2V5IHBhdGNoaW5nIGxvZ2ljIGluIHRoaXMgZmlsZSB0aGF0IGlzIGludGVuZGVkXG4gICAqIHRvIGVuc3VyZSB1bmRpc2NvdmVyYWJpbGl0eS4gVGhlIGJhc2ljIGlkZWEgaXMgdGhhdCB0aGVyZSBhcmVcbiAgICogdGhyZWUgZnVuZGFtZW50YWwgbWVhbnMgb2YgZGlzY292ZXJpbmcgcHJvcGVydGllcyBvZiBhbiBvYmplY3Q6XG4gICAqIFRoZSBmb3IvaW4gbG9vcCwgT2JqZWN0LmtleXMoKSwgYW5kIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKCksXG4gICAqIGFzIHdlbGwgYXMgc29tZSBwcm9wb3NlZCBFUzYgZXh0ZW5zaW9ucyB0aGF0IGFwcGVhciBvbiBvdXJcbiAgICogd2hpdGVsaXN0LiBUaGUgZmlyc3QgdHdvIG9ubHkgZGlzY292ZXIgZW51bWVyYWJsZSBwcm9wZXJ0aWVzLCBhbmRcbiAgICogd2Ugb25seSB1c2UgSElEREVOX05BTUUgdG8gbmFtZSBhIG5vbi1lbnVtZXJhYmxlIHByb3BlcnR5LCBzbyB0aGVcbiAgICogb25seSByZW1haW5pbmcgdGhyZWF0IHNob3VsZCBiZSBnZXRPd25Qcm9wZXJ0eU5hbWVzIGFuZCBzb21lXG4gICAqIHByb3Bvc2VkIEVTNiBleHRlbnNpb25zIHRoYXQgYXBwZWFyIG9uIG91ciB3aGl0ZWxpc3QuIFdlIG1vbmtleVxuICAgKiBwYXRjaCB0aGVtIHRvIHJlbW92ZSBISURERU5fTkFNRSBmcm9tIHRoZSBsaXN0IG9mIHByb3BlcnRpZXMgdGhleVxuICAgKiByZXR1cm5zLlxuICAgKlxuICAgKiA8cD5UT0RPKGVyaWdodHMpOiBPbiBhIHBsYXRmb3JtIHdpdGggYnVpbHQtaW4gUHJveGllcywgcHJveGllc1xuICAgKiBjb3VsZCBiZSB1c2VkIHRvIHRyYXAgYW5kIHRoZXJlYnkgZGlzY292ZXIgdGhlIEhJRERFTl9OQU1FLCBzbyB3ZVxuICAgKiBuZWVkIHRvIG1vbmtleSBwYXRjaCBQcm94eS5jcmVhdGUsIFByb3h5LmNyZWF0ZUZ1bmN0aW9uLCBldGMsIGluXG4gICAqIG9yZGVyIHRvIHdyYXAgdGhlIHByb3ZpZGVkIGhhbmRsZXIgd2l0aCB0aGUgcmVhbCBoYW5kbGVyIHdoaWNoXG4gICAqIGZpbHRlcnMgb3V0IGFsbCB0cmFwcyB1c2luZyBISURERU5fTkFNRS5cbiAgICpcbiAgICogPHA+VE9ETyhlcmlnaHRzKTogUmV2aXNpdCBNaWtlIFN0YXkncyBzdWdnZXN0aW9uIHRoYXQgd2UgdXNlIGFuXG4gICAqIGVuY2Fwc3VsYXRlZCBmdW5jdGlvbiBhdCBhIG5vdC1uZWNlc3NhcmlseS1zZWNyZXQgbmFtZSwgd2hpY2hcbiAgICogdXNlcyB0aGUgU3RpZWdsZXIgc2hhcmVkLXN0YXRlIHJpZ2h0cyBhbXBsaWZpY2F0aW9uIHBhdHRlcm4gdG9cbiAgICogcmV2ZWFsIHRoZSBhc3NvY2lhdGVkIHZhbHVlIG9ubHkgdG8gdGhlIFdlYWtNYXAgaW4gd2hpY2ggdGhpcyBrZXlcbiAgICogaXMgYXNzb2NpYXRlZCB3aXRoIHRoYXQgdmFsdWUuIFNpbmNlIG9ubHkgdGhlIGtleSByZXRhaW5zIHRoZVxuICAgKiBmdW5jdGlvbiwgdGhlIGZ1bmN0aW9uIGNhbiBhbHNvIHJlbWVtYmVyIHRoZSBrZXkgd2l0aG91dCBjYXVzaW5nXG4gICAqIGxlYWthZ2Ugb2YgdGhlIGtleSwgc28gdGhpcyBkb2Vzbid0IHZpb2xhdGUgb3VyIGdlbmVyYWwgZ2NcbiAgICogZ29hbHMuIEluIGFkZGl0aW9uLCBiZWNhdXNlIHRoZSBuYW1lIG5lZWQgbm90IGJlIGEgZ3VhcmRlZFxuICAgKiBzZWNyZXQsIHdlIGNvdWxkIGVmZmljaWVudGx5IGhhbmRsZSBjcm9zcy1mcmFtZSBmcm96ZW4ga2V5cy5cbiAgICovXG4gIHZhciBISURERU5fTkFNRV9QUkVGSVggPSAnd2Vha21hcDonO1xuICB2YXIgSElEREVOX05BTUUgPSBISURERU5fTkFNRV9QUkVGSVggKyAnaWRlbnQ6JyArIE1hdGgucmFuZG9tKCkgKyAnX19fJztcblxuICBpZiAodHlwZW9mIGNyeXB0byAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgIHR5cGVvZiBjcnlwdG8uZ2V0UmFuZG9tVmFsdWVzID09PSAnZnVuY3Rpb24nICYmXG4gICAgICB0eXBlb2YgQXJyYXlCdWZmZXIgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBVaW50OEFycmF5ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIGFiID0gbmV3IEFycmF5QnVmZmVyKDI1KTtcbiAgICB2YXIgdThzID0gbmV3IFVpbnQ4QXJyYXkoYWIpO1xuICAgIGNyeXB0by5nZXRSYW5kb21WYWx1ZXModThzKTtcbiAgICBISURERU5fTkFNRSA9IEhJRERFTl9OQU1FX1BSRUZJWCArICdyYW5kOicgK1xuICAgICAgQXJyYXkucHJvdG90eXBlLm1hcC5jYWxsKHU4cywgZnVuY3Rpb24odTgpIHtcbiAgICAgICAgcmV0dXJuICh1OCAlIDM2KS50b1N0cmluZygzNik7XG4gICAgICB9KS5qb2luKCcnKSArICdfX18nO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNOb3RIaWRkZW5OYW1lKG5hbWUpIHtcbiAgICByZXR1cm4gIShcbiAgICAgICAgbmFtZS5zdWJzdHIoMCwgSElEREVOX05BTUVfUFJFRklYLmxlbmd0aCkgPT0gSElEREVOX05BTUVfUFJFRklYICYmXG4gICAgICAgIG5hbWUuc3Vic3RyKG5hbWUubGVuZ3RoIC0gMykgPT09ICdfX18nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBNb25rZXkgcGF0Y2ggZ2V0T3duUHJvcGVydHlOYW1lcyB0byBhdm9pZCByZXZlYWxpbmcgdGhlXG4gICAqIEhJRERFTl9OQU1FLlxuICAgKlxuICAgKiA8cD5UaGUgRVM1LjEgc3BlYyByZXF1aXJlcyBlYWNoIG5hbWUgdG8gYXBwZWFyIG9ubHkgb25jZSwgYnV0IGFzXG4gICAqIG9mIHRoaXMgd3JpdGluZywgdGhpcyByZXF1aXJlbWVudCBpcyBjb250cm92ZXJzaWFsIGZvciBFUzYsIHNvIHdlXG4gICAqIG1hZGUgdGhpcyBjb2RlIHJvYnVzdCBhZ2FpbnN0IHRoaXMgY2FzZS4gSWYgdGhlIHJlc3VsdGluZyBleHRyYVxuICAgKiBzZWFyY2ggdHVybnMgb3V0IHRvIGJlIGV4cGVuc2l2ZSwgd2UgY2FuIHByb2JhYmx5IHJlbGF4IHRoaXMgb25jZVxuICAgKiBFUzYgaXMgYWRlcXVhdGVseSBzdXBwb3J0ZWQgb24gYWxsIG1ham9yIGJyb3dzZXJzLCBpZmYgbm8gYnJvd3NlclxuICAgKiB2ZXJzaW9ucyB3ZSBzdXBwb3J0IGF0IHRoYXQgdGltZSBoYXZlIHJlbGF4ZWQgdGhpcyBjb25zdHJhaW50XG4gICAqIHdpdGhvdXQgcHJvdmlkaW5nIGJ1aWx0LWluIEVTNiBXZWFrTWFwcy5cbiAgICovXG4gIGRlZlByb3AoT2JqZWN0LCAnZ2V0T3duUHJvcGVydHlOYW1lcycsIHtcbiAgICB2YWx1ZTogZnVuY3Rpb24gZmFrZUdldE93blByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICByZXR1cm4gZ29wbihvYmopLmZpbHRlcihpc05vdEhpZGRlbk5hbWUpO1xuICAgIH1cbiAgfSk7XG5cbiAgLyoqXG4gICAqIGdldFByb3BlcnR5TmFtZXMgaXMgbm90IGluIEVTNSBidXQgaXQgaXMgcHJvcG9zZWQgZm9yIEVTNiBhbmRcbiAgICogZG9lcyBhcHBlYXIgaW4gb3VyIHdoaXRlbGlzdCwgc28gd2UgbmVlZCB0byBjbGVhbiBpdCB0b28uXG4gICAqL1xuICBpZiAoJ2dldFByb3BlcnR5TmFtZXMnIGluIE9iamVjdCkge1xuICAgIHZhciBvcmlnaW5hbEdldFByb3BlcnR5TmFtZXMgPSBPYmplY3QuZ2V0UHJvcGVydHlOYW1lcztcbiAgICBkZWZQcm9wKE9iamVjdCwgJ2dldFByb3BlcnR5TmFtZXMnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZmFrZUdldFByb3BlcnR5TmFtZXMob2JqKSB7XG4gICAgICAgIHJldHVybiBvcmlnaW5hbEdldFByb3BlcnR5TmFtZXMob2JqKS5maWx0ZXIoaXNOb3RIaWRkZW5OYW1lKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiA8cD5UbyB0cmVhdCBvYmplY3RzIGFzIGlkZW50aXR5LWtleXMgd2l0aCByZWFzb25hYmxlIGVmZmljaWVuY3lcbiAgICogb24gRVM1IGJ5IGl0c2VsZiAoaS5lLiwgd2l0aG91dCBhbnkgb2JqZWN0LWtleWVkIGNvbGxlY3Rpb25zKSwgd2VcbiAgICogbmVlZCB0byBhZGQgYSBoaWRkZW4gcHJvcGVydHkgdG8gc3VjaCBrZXkgb2JqZWN0cyB3aGVuIHdlXG4gICAqIGNhbi4gVGhpcyByYWlzZXMgc2V2ZXJhbCBpc3N1ZXM6XG4gICAqIDx1bD5cbiAgICogPGxpPkFycmFuZ2luZyB0byBhZGQgdGhpcyBwcm9wZXJ0eSB0byBvYmplY3RzIGJlZm9yZSB3ZSBsb3NlIHRoZVxuICAgKiAgICAgY2hhbmNlLCBhbmRcbiAgICogPGxpPkhpZGluZyB0aGUgZXhpc3RlbmNlIG9mIHRoaXMgbmV3IHByb3BlcnR5IGZyb20gbW9zdFxuICAgKiAgICAgSmF2YVNjcmlwdCBjb2RlLlxuICAgKiA8bGk+UHJldmVudGluZyA8aT5jZXJ0aWZpY2F0aW9uIHRoZWZ0PC9pPiwgd2hlcmUgb25lIG9iamVjdCBpc1xuICAgKiAgICAgY3JlYXRlZCBmYWxzZWx5IGNsYWltaW5nIHRvIGJlIHRoZSBrZXkgb2YgYW4gYXNzb2NpYXRpb25cbiAgICogICAgIGFjdHVhbGx5IGtleWVkIGJ5IGFub3RoZXIgb2JqZWN0LlxuICAgKiA8bGk+UHJldmVudGluZyA8aT52YWx1ZSB0aGVmdDwvaT4sIHdoZXJlIHVudHJ1c3RlZCBjb2RlIHdpdGhcbiAgICogICAgIGFjY2VzcyB0byBhIGtleSBvYmplY3QgYnV0IG5vdCBhIHdlYWsgbWFwIG5ldmVydGhlbGVzc1xuICAgKiAgICAgb2J0YWlucyBhY2Nlc3MgdG8gdGhlIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCB0aGF0IGtleSBpbiB0aGF0XG4gICAqICAgICB3ZWFrIG1hcC5cbiAgICogPC91bD5cbiAgICogV2UgZG8gc28gYnlcbiAgICogPHVsPlxuICAgKiA8bGk+TWFraW5nIHRoZSBuYW1lIG9mIHRoZSBoaWRkZW4gcHJvcGVydHkgdW5ndWVzc2FibGUsIHNvIFwiW11cIlxuICAgKiAgICAgaW5kZXhpbmcsIHdoaWNoIHdlIGNhbm5vdCBpbnRlcmNlcHQsIGNhbm5vdCBiZSB1c2VkIHRvIGFjY2Vzc1xuICAgKiAgICAgYSBwcm9wZXJ0eSB3aXRob3V0IGtub3dpbmcgdGhlIG5hbWUuXG4gICAqIDxsaT5NYWtpbmcgdGhlIGhpZGRlbiBwcm9wZXJ0eSBub24tZW51bWVyYWJsZSwgc28gd2UgbmVlZCBub3RcbiAgICogICAgIHdvcnJ5IGFib3V0IGZvci1pbiBsb29wcyBvciB7QGNvZGUgT2JqZWN0LmtleXN9LFxuICAgKiA8bGk+bW9ua2V5IHBhdGNoaW5nIHRob3NlIHJlZmxlY3RpdmUgbWV0aG9kcyB0aGF0IHdvdWxkXG4gICAqICAgICBwcmV2ZW50IGV4dGVuc2lvbnMsIHRvIGFkZCB0aGlzIGhpZGRlbiBwcm9wZXJ0eSBmaXJzdCxcbiAgICogPGxpPm1vbmtleSBwYXRjaGluZyB0aG9zZSBtZXRob2RzIHRoYXQgd291bGQgcmV2ZWFsIHRoaXNcbiAgICogICAgIGhpZGRlbiBwcm9wZXJ0eS5cbiAgICogPC91bD5cbiAgICogVW5mb3J0dW5hdGVseSwgYmVjYXVzZSBvZiBzYW1lLW9yaWdpbiBpZnJhbWVzLCB3ZSBjYW5ub3QgcmVsaWFibHlcbiAgICogYWRkIHRoaXMgaGlkZGVuIHByb3BlcnR5IGJlZm9yZSBhbiBvYmplY3QgYmVjb21lc1xuICAgKiBub24tZXh0ZW5zaWJsZS4gSW5zdGVhZCwgaWYgd2UgZW5jb3VudGVyIGEgbm9uLWV4dGVuc2libGUgb2JqZWN0XG4gICAqIHdpdGhvdXQgYSBoaWRkZW4gcmVjb3JkIHRoYXQgd2UgY2FuIGRldGVjdCAod2hldGhlciBvciBub3QgaXQgaGFzXG4gICAqIGEgaGlkZGVuIHJlY29yZCBzdG9yZWQgdW5kZXIgYSBuYW1lIHNlY3JldCB0byB1cyksIHRoZW4gd2UganVzdFxuICAgKiB1c2UgdGhlIGtleSBvYmplY3QgaXRzZWxmIHRvIHJlcHJlc2VudCBpdHMgaWRlbnRpdHkgaW4gYSBicnV0ZVxuICAgKiBmb3JjZSBsZWFreSBtYXAgc3RvcmVkIGluIHRoZSB3ZWFrIG1hcCwgbG9zaW5nIGFsbCB0aGUgYWR2YW50YWdlc1xuICAgKiBvZiB3ZWFrbmVzcyBmb3IgdGhlc2UuXG4gICAqL1xuICBmdW5jdGlvbiBnZXRIaWRkZW5SZWNvcmQoa2V5KSB7XG4gICAgaWYgKGtleSAhPT0gT2JqZWN0KGtleSkpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ05vdCBhbiBvYmplY3Q6ICcgKyBrZXkpO1xuICAgIH1cbiAgICB2YXIgaGlkZGVuUmVjb3JkID0ga2V5W0hJRERFTl9OQU1FXTtcbiAgICBpZiAoaGlkZGVuUmVjb3JkICYmIGhpZGRlblJlY29yZC5rZXkgPT09IGtleSkgeyByZXR1cm4gaGlkZGVuUmVjb3JkOyB9XG4gICAgaWYgKCFpc0V4dGVuc2libGUoa2V5KSkge1xuICAgICAgLy8gV2VhayBtYXAgbXVzdCBicnV0ZSBmb3JjZSwgYXMgZXhwbGFpbmVkIGluIGRvYy1jb21tZW50IGFib3ZlLlxuICAgICAgcmV0dXJuIHZvaWQgMDtcbiAgICB9XG5cbiAgICAvLyBUaGUgaGlkZGVuUmVjb3JkIGFuZCB0aGUga2V5IHBvaW50IGRpcmVjdGx5IGF0IGVhY2ggb3RoZXIsIHZpYVxuICAgIC8vIHRoZSBcImtleVwiIGFuZCBISURERU5fTkFNRSBwcm9wZXJ0aWVzIHJlc3BlY3RpdmVseS4gVGhlIGtleVxuICAgIC8vIGZpZWxkIGlzIGZvciBxdWlja2x5IHZlcmlmeWluZyB0aGF0IHRoaXMgaGlkZGVuIHJlY29yZCBpcyBhblxuICAgIC8vIG93biBwcm9wZXJ0eSwgbm90IGEgaGlkZGVuIHJlY29yZCBmcm9tIHVwIHRoZSBwcm90b3R5cGUgY2hhaW4uXG4gICAgLy9cbiAgICAvLyBOT1RFOiBCZWNhdXNlIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gaXMgbWVhbnQgb25seSBmb3Igc3lzdGVtcyBsaWtlXG4gICAgLy8gU0VTIHdoZXJlIE9iamVjdC5wcm90b3R5cGUgaXMgZnJvemVuIHdpdGhvdXQgYW55IG51bWVyaWNcbiAgICAvLyBwcm9wZXJ0aWVzLCBpdCBpcyBvayB0byB1c2UgYW4gb2JqZWN0IGxpdGVyYWwgZm9yIHRoZSBoaWRkZW5SZWNvcmQuXG4gICAgLy8gVGhpcyBoYXMgdHdvIGFkdmFudGFnZXM6XG4gICAgLy8gKiBJdCBpcyBtdWNoIGZhc3RlciBpbiBhIHBlcmZvcm1hbmNlIGNyaXRpY2FsIHBsYWNlXG4gICAgLy8gKiBJdCBhdm9pZHMgcmVseWluZyBvbiBPYmplY3QuY3JlYXRlKG51bGwpLCB3aGljaCBoYWQgYmVlblxuICAgIC8vICAgcHJvYmxlbWF0aWMgb24gQ2hyb21lIDI4LjAuMTQ4MC4wLiBTZWVcbiAgICAvLyAgIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvZ29vZ2xlLWNhamEvaXNzdWVzL2RldGFpbD9pZD0xNjg3XG4gICAgaGlkZGVuUmVjb3JkID0geyBrZXk6IGtleSB9O1xuXG4gICAgLy8gV2hlbiB1c2luZyB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIG9uIHBsYXRmb3JtcyB3aGVyZVxuICAgIC8vIE9iamVjdC5wcm90b3R5cGUgbWlnaHQgbm90IGJlIGZyb3plbiBhbmQgT2JqZWN0LmNyZWF0ZShudWxsKSBpc1xuICAgIC8vIHJlbGlhYmxlLCB1c2UgdGhlIGZvbGxvd2luZyB0d28gY29tbWVudGVkIG91dCBsaW5lcyBpbnN0ZWFkLlxuICAgIC8vIGhpZGRlblJlY29yZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgLy8gaGlkZGVuUmVjb3JkLmtleSA9IGtleTtcblxuICAgIC8vIFBsZWFzZSBjb250YWN0IHVzIGlmIHlvdSBuZWVkIHRoaXMgdG8gd29yayBvbiBwbGF0Zm9ybXMgd2hlcmVcbiAgICAvLyBPYmplY3QucHJvdG90eXBlIG1pZ2h0IG5vdCBiZSBmcm96ZW4gYW5kXG4gICAgLy8gT2JqZWN0LmNyZWF0ZShudWxsKSBtaWdodCBub3QgYmUgcmVsaWFibGUuXG5cbiAgICB0cnkge1xuICAgICAgZGVmUHJvcChrZXksIEhJRERFTl9OQU1FLCB7XG4gICAgICAgIHZhbHVlOiBoaWRkZW5SZWNvcmQsXG4gICAgICAgIHdyaXRhYmxlOiBmYWxzZSxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogZmFsc2VcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGhpZGRlblJlY29yZDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gVW5kZXIgc29tZSBjaXJjdW1zdGFuY2VzLCBpc0V4dGVuc2libGUgc2VlbXMgdG8gbWlzcmVwb3J0IHdoZXRoZXJcbiAgICAgIC8vIHRoZSBISURERU5fTkFNRSBjYW4gYmUgZGVmaW5lZC5cbiAgICAgIC8vIFRoZSBjaXJjdW1zdGFuY2VzIGhhdmUgbm90IGJlZW4gaXNvbGF0ZWQsIGJ1dCBhdCBsZWFzdCBhZmZlY3RcbiAgICAgIC8vIE5vZGUuanMgdjAuMTAuMjYgb24gVHJhdmlzQ0kgLyBMaW51eCwgYnV0IG5vdCB0aGUgc2FtZSB2ZXJzaW9uIG9mXG4gICAgICAvLyBOb2RlLmpzIG9uIE9TIFguXG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNb25rZXkgcGF0Y2ggb3BlcmF0aW9ucyB0aGF0IHdvdWxkIG1ha2UgdGhlaXIgYXJndW1lbnRcbiAgICogbm9uLWV4dGVuc2libGUuXG4gICAqXG4gICAqIDxwPlRoZSBtb25rZXkgcGF0Y2hlZCB2ZXJzaW9ucyB0aHJvdyBhIFR5cGVFcnJvciBpZiB0aGVpclxuICAgKiBhcmd1bWVudCBpcyBub3QgYW4gb2JqZWN0LCBzbyBpdCBzaG91bGQgb25seSBiZSBkb25lIHRvIGZ1bmN0aW9uc1xuICAgKiB0aGF0IHNob3VsZCB0aHJvdyBhIFR5cGVFcnJvciBhbnl3YXkgaWYgdGhlaXIgYXJndW1lbnQgaXMgbm90IGFuXG4gICAqIG9iamVjdC5cbiAgICovXG4gIChmdW5jdGlvbigpe1xuICAgIHZhciBvbGRGcmVlemUgPSBPYmplY3QuZnJlZXplO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnZnJlZXplJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aWZ5aW5nRnJlZXplKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZEZyZWV6ZShvYmopO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHZhciBvbGRTZWFsID0gT2JqZWN0LnNlYWw7XG4gICAgZGVmUHJvcChPYmplY3QsICdzZWFsJywge1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlkZW50aWZ5aW5nU2VhbChvYmopIHtcbiAgICAgICAgZ2V0SGlkZGVuUmVjb3JkKG9iaik7XG4gICAgICAgIHJldHVybiBvbGRTZWFsKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG9sZFByZXZlbnRFeHRlbnNpb25zID0gT2JqZWN0LnByZXZlbnRFeHRlbnNpb25zO1xuICAgIGRlZlByb3AoT2JqZWN0LCAncHJldmVudEV4dGVuc2lvbnMnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdQcmV2ZW50RXh0ZW5zaW9ucyhvYmopIHtcbiAgICAgICAgZ2V0SGlkZGVuUmVjb3JkKG9iaik7XG4gICAgICAgIHJldHVybiBvbGRQcmV2ZW50RXh0ZW5zaW9ucyhvYmopO1xuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xuXG4gIGZ1bmN0aW9uIGNvbnN0RnVuYyhmdW5jKSB7XG4gICAgZnVuYy5wcm90b3R5cGUgPSBudWxsO1xuICAgIHJldHVybiBPYmplY3QuZnJlZXplKGZ1bmMpO1xuICB9XG5cbiAgdmFyIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nRG9uZSA9IGZhbHNlO1xuICBmdW5jdGlvbiBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpIHtcbiAgICAvLyBGdXR1cmUgRVM2IFdlYWtNYXAgaXMgY3VycmVudGx5ICgyMDEzLTA5LTEwKSBleHBlY3RlZCB0byByZWplY3QgV2Vha01hcCgpXG4gICAgLy8gYnV0IHdlIHVzZWQgdG8gcGVybWl0IGl0IGFuZCBkbyBpdCBvdXJzZWx2ZXMsIHNvIHdhcm4gb25seS5cbiAgICBpZiAoIWNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nRG9uZSAmJiB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nRG9uZSA9IHRydWU7XG4gICAgICBjb25zb2xlLndhcm4oJ1dlYWtNYXAgc2hvdWxkIGJlIGludm9rZWQgYXMgbmV3IFdlYWtNYXAoKSwgbm90ICcgK1xuICAgICAgICAgICdXZWFrTWFwKCkuIFRoaXMgd2lsbCBiZSBhbiBlcnJvciBpbiB0aGUgZnV0dXJlLicpO1xuICAgIH1cbiAgfVxuXG4gIHZhciBuZXh0SWQgPSAwO1xuXG4gIHZhciBPdXJXZWFrTWFwID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE91cldlYWtNYXApKSB7ICAvLyBhcHByb3hpbWF0ZSB0ZXN0IGZvciBuZXcgLi4uKClcbiAgICAgIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCk7XG4gICAgfVxuXG4gICAgLy8gV2UgYXJlIGN1cnJlbnRseSAoMTIvMjUvMjAxMikgbmV2ZXIgZW5jb3VudGVyaW5nIGFueSBwcmVtYXR1cmVseVxuICAgIC8vIG5vbi1leHRlbnNpYmxlIGtleXMuXG4gICAgdmFyIGtleXMgPSBbXTsgLy8gYnJ1dGUgZm9yY2UgZm9yIHByZW1hdHVyZWx5IG5vbi1leHRlbnNpYmxlIGtleXMuXG4gICAgdmFyIHZhbHVlcyA9IFtdOyAvLyBicnV0ZSBmb3JjZSBmb3IgY29ycmVzcG9uZGluZyB2YWx1ZXMuXG4gICAgdmFyIGlkID0gbmV4dElkKys7XG5cbiAgICBmdW5jdGlvbiBnZXRfX18oa2V5LCBvcHRfZGVmYXVsdCkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICByZXR1cm4gaWQgaW4gaGlkZGVuUmVjb3JkID8gaGlkZGVuUmVjb3JkW2lkXSA6IG9wdF9kZWZhdWx0O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgPyB2YWx1ZXNbaW5kZXhdIDogb3B0X2RlZmF1bHQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFzX19fKGtleSkge1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICByZXR1cm4gaWQgaW4gaGlkZGVuUmVjb3JkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGtleXMuaW5kZXhPZihrZXkpID49IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0X19fKGtleSwgdmFsdWUpIHtcbiAgICAgIHZhciBpbmRleDtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgaGlkZGVuUmVjb3JkW2lkXSA9IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2luY2Ugc29tZSBicm93c2VycyBwcmVlbXB0aXZlbHkgdGVybWluYXRlIHNsb3cgdHVybnMgYnV0XG4gICAgICAgICAgLy8gdGhlbiBjb250aW51ZSBjb21wdXRpbmcgd2l0aCBwcmVzdW1hYmx5IGNvcnJ1cHRlZCBoZWFwXG4gICAgICAgICAgLy8gc3RhdGUsIHdlIGhlcmUgZGVmZW5zaXZlbHkgZ2V0IGtleXMubGVuZ3RoIGZpcnN0IGFuZCB0aGVuXG4gICAgICAgICAgLy8gdXNlIGl0IHRvIHVwZGF0ZSBib3RoIHRoZSB2YWx1ZXMgYW5kIGtleXMgYXJyYXlzLCBrZWVwaW5nXG4gICAgICAgICAgLy8gdGhlbSBpbiBzeW5jLlxuICAgICAgICAgIGluZGV4ID0ga2V5cy5sZW5ndGg7XG4gICAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlO1xuICAgICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIHZhbHVlcyB3aWxsIGJlIG9uZSBsb25nZXIgdGhhbiBrZXlzLlxuICAgICAgICAgIGtleXNbaW5kZXhdID0ga2V5O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVfX18oa2V5KSB7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICB2YXIgaW5kZXgsIGxhc3RJbmRleDtcbiAgICAgIGlmIChoaWRkZW5SZWNvcmQpIHtcbiAgICAgICAgcmV0dXJuIGlkIGluIGhpZGRlblJlY29yZCAmJiBkZWxldGUgaGlkZGVuUmVjb3JkW2lkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0ga2V5cy5pbmRleE9mKGtleSk7XG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2luY2Ugc29tZSBicm93c2VycyBwcmVlbXB0aXZlbHkgdGVybWluYXRlIHNsb3cgdHVybnMgYnV0XG4gICAgICAgIC8vIHRoZW4gY29udGludWUgY29tcHV0aW5nIHdpdGggcG90ZW50aWFsbHkgY29ycnVwdGVkIGhlYXBcbiAgICAgICAgLy8gc3RhdGUsIHdlIGhlcmUgZGVmZW5zaXZlbHkgZ2V0IGtleXMubGVuZ3RoIGZpcnN0IGFuZCB0aGVuIHVzZVxuICAgICAgICAvLyBpdCB0byB1cGRhdGUgYm90aCB0aGUga2V5cyBhbmQgdGhlIHZhbHVlcyBhcnJheSwga2VlcGluZ1xuICAgICAgICAvLyB0aGVtIGluIHN5bmMuIFdlIHVwZGF0ZSB0aGUgdHdvIHdpdGggYW4gb3JkZXIgb2YgYXNzaWdubWVudHMsXG4gICAgICAgIC8vIHN1Y2ggdGhhdCBhbnkgcHJlZml4IG9mIHRoZXNlIGFzc2lnbm1lbnRzIHdpbGwgcHJlc2VydmUgdGhlXG4gICAgICAgIC8vIGtleS92YWx1ZSBjb3JyZXNwb25kZW5jZSwgZWl0aGVyIGJlZm9yZSBvciBhZnRlciB0aGUgZGVsZXRlLlxuICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBuZWVkcyB0byB3b3JrIGNvcnJlY3RseSB3aGVuIGluZGV4ID09PSBsYXN0SW5kZXguXG4gICAgICAgIGxhc3RJbmRleCA9IGtleXMubGVuZ3RoIC0gMTtcbiAgICAgICAga2V5c1tpbmRleF0gPSB2b2lkIDA7XG4gICAgICAgIC8vIElmIHdlIGNyYXNoIGhlcmUsIHRoZXJlJ3MgYSB2b2lkIDAgaW4gdGhlIGtleXMgYXJyYXksIGJ1dFxuICAgICAgICAvLyBubyBvcGVyYXRpb24gd2lsbCBjYXVzZSBhIFwia2V5cy5pbmRleE9mKHZvaWQgMClcIiwgc2luY2VcbiAgICAgICAgLy8gZ2V0SGlkZGVuUmVjb3JkKHZvaWQgMCkgd2lsbCBhbHdheXMgdGhyb3cgYW4gZXJyb3IgZmlyc3QuXG4gICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZXNbbGFzdEluZGV4XTtcbiAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdmFsdWVzW2luZGV4XSBjYW5ub3QgYmUgZm91bmQgaGVyZSxcbiAgICAgICAgLy8gYmVjYXVzZSBrZXlzW2luZGV4XSBpcyB2b2lkIDAuXG4gICAgICAgIGtleXNbaW5kZXhdID0ga2V5c1tsYXN0SW5kZXhdO1xuICAgICAgICAvLyBJZiBpbmRleCA9PT0gbGFzdEluZGV4IGFuZCB3ZSBjcmFzaCBoZXJlLCB0aGVuIGtleXNbaW5kZXhdXG4gICAgICAgIC8vIGlzIHN0aWxsIHZvaWQgMCwgc2luY2UgdGhlIGFsaWFzaW5nIGtpbGxlZCB0aGUgcHJldmlvdXMga2V5LlxuICAgICAgICBrZXlzLmxlbmd0aCA9IGxhc3RJbmRleDtcbiAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwga2V5cyB3aWxsIGJlIG9uZSBzaG9ydGVyIHRoYW4gdmFsdWVzLlxuICAgICAgICB2YWx1ZXMubGVuZ3RoID0gbGFzdEluZGV4O1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShPdXJXZWFrTWFwLnByb3RvdHlwZSwge1xuICAgICAgZ2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZ2V0X19fKSB9LFxuICAgICAgaGFzX19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoaGFzX19fKSB9LFxuICAgICAgc2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoc2V0X19fKSB9LFxuICAgICAgZGVsZXRlX19fOiB7IHZhbHVlOiBjb25zdEZ1bmMoZGVsZXRlX19fKSB9XG4gICAgfSk7XG4gIH07XG5cbiAgT3VyV2Vha01hcC5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKE9iamVjdC5wcm90b3R5cGUsIHtcbiAgICBnZXQ6IHtcbiAgICAgIC8qKlxuICAgICAgICogUmV0dXJuIHRoZSB2YWx1ZSBtb3N0IHJlY2VudGx5IGFzc29jaWF0ZWQgd2l0aCBrZXksIG9yXG4gICAgICAgKiBvcHRfZGVmYXVsdCBpZiBub25lLlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0KGtleSwgb3B0X2RlZmF1bHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0X19fKGtleSwgb3B0X2RlZmF1bHQpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIGhhczoge1xuICAgICAgLyoqXG4gICAgICAgKiBJcyB0aGVyZSBhIHZhbHVlIGFzc29jaWF0ZWQgd2l0aCBrZXkgaW4gdGhpcyBXZWFrTWFwP1xuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaGFzKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5oYXNfX18oa2V5KTtcbiAgICAgIH0sXG4gICAgICB3cml0YWJsZTogdHJ1ZSxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0sXG5cbiAgICBzZXQ6IHtcbiAgICAgIC8qKlxuICAgICAgICogQXNzb2NpYXRlIHZhbHVlIHdpdGgga2V5IGluIHRoaXMgV2Vha01hcCwgb3ZlcndyaXRpbmcgYW55XG4gICAgICAgKiBwcmV2aW91cyBhc3NvY2lhdGlvbiBpZiBwcmVzZW50LlxuICAgICAgICovXG4gICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0KGtleSwgdmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2V0X19fKGtleSwgdmFsdWUpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgICdkZWxldGUnOiB7XG4gICAgICAvKipcbiAgICAgICAqIFJlbW92ZSBhbnkgYXNzb2NpYXRpb24gZm9yIGtleSBpbiB0aGlzIFdlYWtNYXAsIHJldHVybmluZ1xuICAgICAgICogd2hldGhlciB0aGVyZSB3YXMgb25lLlxuICAgICAgICpcbiAgICAgICAqIDxwPk5vdGUgdGhhdCB0aGUgYm9vbGVhbiByZXR1cm4gaGVyZSBkb2VzIG5vdCB3b3JrIGxpa2UgdGhlXG4gICAgICAgKiB7QGNvZGUgZGVsZXRlfSBvcGVyYXRvci4gVGhlIHtAY29kZSBkZWxldGV9IG9wZXJhdG9yIHJldHVybnNcbiAgICAgICAqIHdoZXRoZXIgdGhlIGRlbGV0aW9uIHN1Y2NlZWRzIGF0IGJyaW5naW5nIGFib3V0IGEgc3RhdGUgaW5cbiAgICAgICAqIHdoaWNoIHRoZSBkZWxldGVkIHByb3BlcnR5IGlzIGFic2VudC4gVGhlIHtAY29kZSBkZWxldGV9XG4gICAgICAgKiBvcGVyYXRvciB0aGVyZWZvcmUgcmV0dXJucyB0cnVlIGlmIHRoZSBwcm9wZXJ0eSB3YXMgYWxyZWFkeVxuICAgICAgICogYWJzZW50LCB3aGVyZWFzIHRoaXMge0Bjb2RlIGRlbGV0ZX0gbWV0aG9kIHJldHVybnMgZmFsc2UgaWZcbiAgICAgICAqIHRoZSBhc3NvY2lhdGlvbiB3YXMgYWxyZWFkeSBhYnNlbnQuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiByZW1vdmUoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlbGV0ZV9fXyhrZXkpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfVxuICB9KTtcblxuICBpZiAodHlwZW9mIEhvc3RXZWFrTWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gSWYgd2UgZ290IGhlcmUsIHRoZW4gdGhlIHBsYXRmb3JtIGhhcyBhIFdlYWtNYXAgYnV0IHdlIGFyZSBjb25jZXJuZWRcbiAgICAgIC8vIHRoYXQgaXQgbWF5IHJlZnVzZSB0byBzdG9yZSBzb21lIGtleSB0eXBlcy4gVGhlcmVmb3JlLCBtYWtlIGEgbWFwXG4gICAgICAvLyBpbXBsZW1lbnRhdGlvbiB3aGljaCBtYWtlcyB1c2Ugb2YgYm90aCBhcyBwb3NzaWJsZS5cblxuICAgICAgLy8gSW4gdGhpcyBtb2RlIHdlIGFyZSBhbHdheXMgdXNpbmcgZG91YmxlIG1hcHMsIHNvIHdlIGFyZSBub3QgcHJveHktc2FmZS5cbiAgICAgIC8vIFRoaXMgY29tYmluYXRpb24gZG9lcyBub3Qgb2NjdXIgaW4gYW55IGtub3duIGJyb3dzZXIsIGJ1dCB3ZSBoYWQgYmVzdFxuICAgICAgLy8gYmUgc2FmZS5cbiAgICAgIGlmIChkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlICYmIHR5cGVvZiBQcm94eSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgUHJveHkgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIERvdWJsZVdlYWtNYXAoKSB7XG4gICAgICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBPdXJXZWFrTWFwKSkgeyAgLy8gYXBwcm94aW1hdGUgdGVzdCBmb3IgbmV3IC4uLigpXG4gICAgICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZWZlcmFibGUsIHRydWx5IHdlYWsgbWFwLlxuICAgICAgICB2YXIgaG1hcCA9IG5ldyBIb3N0V2Vha01hcCgpO1xuXG4gICAgICAgIC8vIE91ciBoaWRkZW4tcHJvcGVydHktYmFzZWQgcHNldWRvLXdlYWstbWFwLiBMYXppbHkgaW5pdGlhbGl6ZWQgaW4gdGhlXG4gICAgICAgIC8vICdzZXQnIGltcGxlbWVudGF0aW9uOyB0aHVzIHdlIGNhbiBhdm9pZCBwZXJmb3JtaW5nIGV4dHJhIGxvb2t1cHMgaWZcbiAgICAgICAgLy8gd2Uga25vdyBhbGwgZW50cmllcyBhY3R1YWxseSBzdG9yZWQgYXJlIGVudGVyZWQgaW4gJ2htYXAnLlxuICAgICAgICB2YXIgb21hcCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBIaWRkZW4tcHJvcGVydHkgbWFwcyBhcmUgbm90IGNvbXBhdGlibGUgd2l0aCBwcm94aWVzIGJlY2F1c2UgcHJveGllc1xuICAgICAgICAvLyBjYW4gb2JzZXJ2ZSB0aGUgaGlkZGVuIG5hbWUgYW5kIGVpdGhlciBhY2NpZGVudGFsbHkgZXhwb3NlIGl0IG9yIGZhaWxcbiAgICAgICAgLy8gdG8gYWxsb3cgdGhlIGhpZGRlbiBwcm9wZXJ0eSB0byBiZSBzZXQuIFRoZXJlZm9yZSwgd2UgZG8gbm90IGFsbG93XG4gICAgICAgIC8vIGFyYml0cmFyeSBXZWFrTWFwcyB0byBzd2l0Y2ggdG8gdXNpbmcgaGlkZGVuIHByb3BlcnRpZXMsIGJ1dCBvbmx5XG4gICAgICAgIC8vIHRob3NlIHdoaWNoIG5lZWQgdGhlIGFiaWxpdHksIGFuZCB1bnByaXZpbGVnZWQgY29kZSBpcyBub3QgYWxsb3dlZFxuICAgICAgICAvLyB0byBzZXQgdGhlIGZsYWcuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIChFeGNlcHQgaW4gZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSBtb2RlIGluIHdoaWNoIGNhc2Ugd2VcbiAgICAgICAgLy8gZGlzYWJsZSBwcm94aWVzLilcbiAgICAgICAgdmFyIGVuYWJsZVN3aXRjaGluZyA9IGZhbHNlO1xuXG4gICAgICAgIGZ1bmN0aW9uIGRnZXQoa2V5LCBvcHRfZGVmYXVsdCkge1xuICAgICAgICAgIGlmIChvbWFwKSB7XG4gICAgICAgICAgICByZXR1cm4gaG1hcC5oYXMoa2V5KSA/IGhtYXAuZ2V0KGtleSlcbiAgICAgICAgICAgICAgICA6IG9tYXAuZ2V0X19fKGtleSwgb3B0X2RlZmF1bHQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaG1hcC5nZXQoa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGhhcyhrZXkpIHtcbiAgICAgICAgICByZXR1cm4gaG1hcC5oYXMoa2V5KSB8fCAob21hcCA/IG9tYXAuaGFzX19fKGtleSkgOiBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZHNldDtcbiAgICAgICAgaWYgKGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUpIHtcbiAgICAgICAgICBkc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICBpZiAoIWhtYXAuaGFzKGtleSkpIHtcbiAgICAgICAgICAgICAgaWYgKCFvbWFwKSB7IG9tYXAgPSBuZXcgT3VyV2Vha01hcCgpOyB9XG4gICAgICAgICAgICAgIG9tYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkc2V0ID0gZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgICAgICAgICAgaWYgKGVuYWJsZVN3aXRjaGluZykge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGhtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFvbWFwKSB7IG9tYXAgPSBuZXcgT3VyV2Vha01hcCgpOyB9XG4gICAgICAgICAgICAgICAgb21hcC5zZXRfX18oa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGhtYXAuc2V0KGtleSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGRkZWxldGUoa2V5KSB7XG4gICAgICAgICAgdmFyIHJlc3VsdCA9ICEhaG1hcFsnZGVsZXRlJ10oa2V5KTtcbiAgICAgICAgICBpZiAob21hcCkgeyByZXR1cm4gb21hcC5kZWxldGVfX18oa2V5KSB8fCByZXN1bHQ7IH1cbiAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIE9iamVjdC5jcmVhdGUoT3VyV2Vha01hcC5wcm90b3R5cGUsIHtcbiAgICAgICAgICBnZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkZ2V0KSB9LFxuICAgICAgICAgIGhhc19fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRoYXMpIH0sXG4gICAgICAgICAgc2V0X19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZHNldCkgfSxcbiAgICAgICAgICBkZWxldGVfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhkZGVsZXRlKSB9LFxuICAgICAgICAgIHBlcm1pdEhvc3RPYmplY3RzX19fOiB7IHZhbHVlOiBjb25zdEZ1bmMoZnVuY3Rpb24odG9rZW4pIHtcbiAgICAgICAgICAgIGlmICh0b2tlbiA9PT0gd2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKSB7XG4gICAgICAgICAgICAgIGVuYWJsZVN3aXRjaGluZyA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2JvZ3VzIGNhbGwgdG8gcGVybWl0SG9zdE9iamVjdHNfX18nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KX1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBEb3VibGVXZWFrTWFwLnByb3RvdHlwZSA9IE91cldlYWtNYXAucHJvdG90eXBlO1xuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBEb3VibGVXZWFrTWFwO1xuXG4gICAgICAvLyBkZWZpbmUgLmNvbnN0cnVjdG9yIHRvIGhpZGUgT3VyV2Vha01hcCBjdG9yXG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoV2Vha01hcC5wcm90b3R5cGUsICdjb25zdHJ1Y3RvcicsIHtcbiAgICAgICAgdmFsdWU6IFdlYWtNYXAsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLCAgLy8gYXMgZGVmYXVsdCAuY29uc3RydWN0b3IgaXNcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICB3cml0YWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfSkoKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBUaGVyZSBpcyBubyBob3N0IFdlYWtNYXAsIHNvIHdlIG11c3QgdXNlIHRoZSBlbXVsYXRpb24uXG5cbiAgICAvLyBFbXVsYXRlZCBXZWFrTWFwcyBhcmUgaW5jb21wYXRpYmxlIHdpdGggbmF0aXZlIHByb3hpZXMgKGJlY2F1c2UgcHJveGllc1xuICAgIC8vIGNhbiBvYnNlcnZlIHRoZSBoaWRkZW4gbmFtZSksIHNvIHdlIG11c3QgZGlzYWJsZSBQcm94eSB1c2FnZSAoaW5cbiAgICAvLyBBcnJheUxpa2UgYW5kIERvbWFkbywgY3VycmVudGx5KS5cbiAgICBpZiAodHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgUHJveHkgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgbW9kdWxlLmV4cG9ydHMgPSBPdXJXZWFrTWFwO1xuICB9XG59KSgpO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2Vhay1tYXAvd2Vhay1tYXAuanNcbi8vIG1vZHVsZSBpZCA9IDQwXG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBvb2wgPSByZXF1aXJlKFwidHlwZWRhcnJheS1wb29sXCIpXG52YXIgb3BzID0gcmVxdWlyZShcIm5kYXJyYXktb3BzXCIpXG52YXIgbmRhcnJheSA9IHJlcXVpcmUoXCJuZGFycmF5XCIpXG5cbnZhciBTVVBQT1JURURfVFlQRVMgPSBbXG4gIFwidWludDhcIixcbiAgXCJ1aW50OF9jbGFtcGVkXCIsXG4gIFwidWludDE2XCIsXG4gIFwidWludDMyXCIsXG4gIFwiaW50OFwiLFxuICBcImludDE2XCIsXG4gIFwiaW50MzJcIixcbiAgXCJmbG9hdDMyXCIgXVxuXG5mdW5jdGlvbiBHTEJ1ZmZlcihnbCwgdHlwZSwgaGFuZGxlLCBsZW5ndGgsIHVzYWdlKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLnR5cGUgPSB0eXBlXG4gIHRoaXMuaGFuZGxlID0gaGFuZGxlXG4gIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gIHRoaXMudXNhZ2UgPSB1c2FnZVxufVxuXG52YXIgcHJvdG8gPSBHTEJ1ZmZlci5wcm90b3R5cGVcblxucHJvdG8uYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmhhbmRsZSlcbn1cblxucHJvdG8udW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIG51bGwpXG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5oYW5kbGUpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVR5cGVBcnJheShnbCwgdHlwZSwgbGVuLCB1c2FnZSwgZGF0YSwgb2Zmc2V0KSB7XG4gIHZhciBkYXRhTGVuID0gZGF0YS5sZW5ndGggKiBkYXRhLkJZVEVTX1BFUl9FTEVNRU5UXG4gIGlmKG9mZnNldCA8IDApIHtcbiAgICBnbC5idWZmZXJEYXRhKHR5cGUsIGRhdGEsIHVzYWdlKVxuICAgIHJldHVybiBkYXRhTGVuXG4gIH1cbiAgaWYoZGF0YUxlbiArIG9mZnNldCA+IGxlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogSWYgcmVzaXppbmcgYnVmZmVyLCBtdXN0IG5vdCBzcGVjaWZ5IG9mZnNldFwiKVxuICB9XG4gIGdsLmJ1ZmZlclN1YkRhdGEodHlwZSwgb2Zmc2V0LCBkYXRhKVxuICByZXR1cm4gbGVuXG59XG5cbmZ1bmN0aW9uIG1ha2VTY3JhdGNoVHlwZUFycmF5KGFycmF5LCBkdHlwZSkge1xuICB2YXIgcmVzID0gcG9vbC5tYWxsb2MoYXJyYXkubGVuZ3RoLCBkdHlwZSlcbiAgdmFyIG4gPSBhcnJheS5sZW5ndGhcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgcmVzW2ldID0gYXJyYXlbaV1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGlzUGFja2VkKHNoYXBlLCBzdHJpZGUpIHtcbiAgdmFyIG4gPSAxXG4gIGZvcih2YXIgaT1zdHJpZGUubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgIGlmKHN0cmlkZVtpXSAhPT0gbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIG4gKj0gc2hhcGVbaV1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihhcnJheSwgb2Zmc2V0KSB7XG4gIGlmKHR5cGVvZiBvZmZzZXQgIT09IFwibnVtYmVyXCIpIHtcbiAgICBvZmZzZXQgPSAtMVxuICB9XG4gIHRoaXMuYmluZCgpXG4gIGlmKHR5cGVvZiBhcnJheSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYXJyYXkuc2hhcGUgIT09IFwidW5kZWZpbmVkXCIpIHsgLy9uZGFycmF5XG4gICAgdmFyIGR0eXBlID0gYXJyYXkuZHR5cGVcbiAgICBpZihTVVBQT1JURURfVFlQRVMuaW5kZXhPZihkdHlwZSkgPCAwKSB7XG4gICAgICBkdHlwZSA9IFwiZmxvYXQzMlwiXG4gICAgfVxuICAgIGlmKHRoaXMudHlwZSA9PT0gdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUikge1xuICAgICAgdmFyIGV4dCA9IGdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpXG4gICAgICBpZihleHQgJiYgZHR5cGUgIT09IFwidWludDE2XCIpIHtcbiAgICAgICAgZHR5cGUgPSBcInVpbnQzMlwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkdHlwZSA9IFwidWludDE2XCJcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoZHR5cGUgPT09IGFycmF5LmR0eXBlICYmIGlzUGFja2VkKGFycmF5LnNoYXBlLCBhcnJheS5zdHJpZGUpKSB7XG4gICAgICBpZihhcnJheS5vZmZzZXQgPT09IDAgJiYgYXJyYXkuZGF0YS5sZW5ndGggPT09IGFycmF5LnNoYXBlWzBdKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIGFycmF5LmRhdGEsIG9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIGFycmF5LmRhdGEuc3ViYXJyYXkoYXJyYXkub2Zmc2V0LCBhcnJheS5zaGFwZVswXSksIG9mZnNldClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRtcCA9IHBvb2wubWFsbG9jKGFycmF5LnNpemUsIGR0eXBlKVxuICAgICAgdmFyIG5kdCA9IG5kYXJyYXkodG1wLCBhcnJheS5zaGFwZSlcbiAgICAgIG9wcy5hc3NpZ24obmR0LCBhcnJheSlcbiAgICAgIGlmKG9mZnNldCA8IDApIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdG1wLCBvZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0bXAuc3ViYXJyYXkoMCwgYXJyYXkuc2l6ZSksIG9mZnNldClcbiAgICAgIH1cbiAgICAgIHBvb2wuZnJlZSh0bXApXG4gICAgfVxuICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShhcnJheSkpIHsgLy9WYW5pbGxhIGFycmF5XG4gICAgdmFyIHRcbiAgICBpZih0aGlzLnR5cGUgPT09IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIpIHtcbiAgICAgIHQgPSBtYWtlU2NyYXRjaFR5cGVBcnJheShhcnJheSwgXCJ1aW50MTZcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdCA9IG1ha2VTY3JhdGNoVHlwZUFycmF5KGFycmF5LCBcImZsb2F0MzJcIilcbiAgICB9XG4gICAgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdCwgb2Zmc2V0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0LnN1YmFycmF5KDAsIGFycmF5Lmxlbmd0aCksIG9mZnNldClcbiAgICB9XG4gICAgcG9vbC5mcmVlKHQpXG4gIH0gZWxzZSBpZih0eXBlb2YgYXJyYXkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGFycmF5Lmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyAvL1R5cGVkIGFycmF5XG4gICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgYXJyYXksIG9mZnNldClcbiAgfSBlbHNlIGlmKHR5cGVvZiBhcnJheSA9PT0gXCJudW1iZXJcIiB8fCBhcnJheSA9PT0gdW5kZWZpbmVkKSB7IC8vTnVtYmVyL2RlZmF1bHRcbiAgICBpZihvZmZzZXQgPj0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBDYW5ub3Qgc3BlY2lmeSBvZmZzZXQgd2hlbiByZXNpemluZyBidWZmZXJcIilcbiAgICB9XG4gICAgYXJyYXkgPSBhcnJheSB8IDBcbiAgICBpZihhcnJheSA8PSAwKSB7XG4gICAgICBhcnJheSA9IDFcbiAgICB9XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMudHlwZSwgYXJyYXl8MCwgdGhpcy51c2FnZSlcbiAgICB0aGlzLmxlbmd0aCA9IGFycmF5XG4gIH0gZWxzZSB7IC8vRXJyb3IsIGNhc2Ugc2hvdWxkIG5vdCBoYXBwZW5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IEludmFsaWQgZGF0YSB0eXBlXCIpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyKGdsLCBkYXRhLCB0eXBlLCB1c2FnZSkge1xuICB0eXBlID0gdHlwZSB8fCBnbC5BUlJBWV9CVUZGRVJcbiAgdXNhZ2UgPSB1c2FnZSB8fCBnbC5EWU5BTUlDX0RSQVdcbiAgaWYodHlwZSAhPT0gZ2wuQVJSQVlfQlVGRkVSICYmIHR5cGUgIT09IGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJbnZhbGlkIHR5cGUgZm9yIHdlYmdsIGJ1ZmZlciwgbXVzdCBiZSBlaXRoZXIgZ2wuQVJSQVlfQlVGRkVSIG9yIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSXCIpXG4gIH1cbiAgaWYodXNhZ2UgIT09IGdsLkRZTkFNSUNfRFJBVyAmJiB1c2FnZSAhPT0gZ2wuU1RBVElDX0RSQVcgJiYgdXNhZ2UgIT09IGdsLlNUUkVBTV9EUkFXKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJbnZhbGlkIHVzYWdlIGZvciBidWZmZXIsIG11c3QgYmUgZWl0aGVyIGdsLkRZTkFNSUNfRFJBVywgZ2wuU1RBVElDX0RSQVcgb3IgZ2wuU1RSRUFNX0RSQVdcIilcbiAgfVxuICB2YXIgaGFuZGxlID0gZ2wuY3JlYXRlQnVmZmVyKClcbiAgdmFyIHJlc3VsdCA9IG5ldyBHTEJ1ZmZlcihnbCwgdHlwZSwgaGFuZGxlLCAwLCB1c2FnZSlcbiAgcmVzdWx0LnVwZGF0ZShkYXRhKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQnVmZmVyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1idWZmZXIvYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgYml0cyA9IHJlcXVpcmUoJ2JpdC10d2lkZGxlJylcbnZhciBkdXAgPSByZXF1aXJlKCdkdXAnKVxuXG4vL0xlZ2FjeSBwb29sIHN1cHBvcnRcbmlmKCFnbG9iYWwuX19UWVBFREFSUkFZX1BPT0wpIHtcbiAgZ2xvYmFsLl9fVFlQRURBUlJBWV9QT09MID0ge1xuICAgICAgVUlOVDggICA6IGR1cChbMzIsIDBdKVxuICAgICwgVUlOVDE2ICA6IGR1cChbMzIsIDBdKVxuICAgICwgVUlOVDMyICA6IGR1cChbMzIsIDBdKVxuICAgICwgSU5UOCAgICA6IGR1cChbMzIsIDBdKVxuICAgICwgSU5UMTYgICA6IGR1cChbMzIsIDBdKVxuICAgICwgSU5UMzIgICA6IGR1cChbMzIsIDBdKVxuICAgICwgRkxPQVQgICA6IGR1cChbMzIsIDBdKVxuICAgICwgRE9VQkxFICA6IGR1cChbMzIsIDBdKVxuICAgICwgREFUQSAgICA6IGR1cChbMzIsIDBdKVxuICAgICwgVUlOVDhDICA6IGR1cChbMzIsIDBdKVxuICAgICwgQlVGRkVSICA6IGR1cChbMzIsIDBdKVxuICB9XG59XG5cbnZhciBoYXNVaW50OEMgPSAodHlwZW9mIFVpbnQ4Q2xhbXBlZEFycmF5KSAhPT0gJ3VuZGVmaW5lZCdcbnZhciBQT09MID0gZ2xvYmFsLl9fVFlQRURBUlJBWV9QT09MXG5cbi8vVXBncmFkZSBwb29sXG5pZighUE9PTC5VSU5UOEMpIHtcbiAgUE9PTC5VSU5UOEMgPSBkdXAoWzMyLCAwXSlcbn1cbmlmKCFQT09MLkJVRkZFUikge1xuICBQT09MLkJVRkZFUiA9IGR1cChbMzIsIDBdKVxufVxuXG4vL05ldyB0ZWNobmlxdWU6IE9ubHkgYWxsb2NhdGUgZnJvbSBBcnJheUJ1ZmZlclZpZXcgYW5kIEJ1ZmZlclxudmFyIERBVEEgICAgPSBQT09MLkRBVEFcbiAgLCBCVUZGRVIgID0gUE9PTC5CVUZGRVJcblxuZXhwb3J0cy5mcmVlID0gZnVuY3Rpb24gZnJlZShhcnJheSkge1xuICBpZihCdWZmZXIuaXNCdWZmZXIoYXJyYXkpKSB7XG4gICAgQlVGRkVSW2JpdHMubG9nMihhcnJheS5sZW5ndGgpXS5wdXNoKGFycmF5KVxuICB9IGVsc2Uge1xuICAgIGlmKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnJheSkgIT09ICdbb2JqZWN0IEFycmF5QnVmZmVyXScpIHtcbiAgICAgIGFycmF5ID0gYXJyYXkuYnVmZmVyXG4gICAgfVxuICAgIGlmKCFhcnJheSkge1xuICAgICAgcmV0dXJuXG4gICAgfVxuICAgIHZhciBuID0gYXJyYXkubGVuZ3RoIHx8IGFycmF5LmJ5dGVMZW5ndGhcbiAgICB2YXIgbG9nX24gPSBiaXRzLmxvZzIobil8MFxuICAgIERBVEFbbG9nX25dLnB1c2goYXJyYXkpXG4gIH1cbn1cblxuZnVuY3Rpb24gZnJlZUFycmF5QnVmZmVyKGJ1ZmZlcikge1xuICBpZighYnVmZmVyKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdmFyIG4gPSBidWZmZXIubGVuZ3RoIHx8IGJ1ZmZlci5ieXRlTGVuZ3RoXG4gIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKVxuICBEQVRBW2xvZ19uXS5wdXNoKGJ1ZmZlcilcbn1cblxuZnVuY3Rpb24gZnJlZVR5cGVkQXJyYXkoYXJyYXkpIHtcbiAgZnJlZUFycmF5QnVmZmVyKGFycmF5LmJ1ZmZlcilcbn1cblxuZXhwb3J0cy5mcmVlVWludDggPVxuZXhwb3J0cy5mcmVlVWludDE2ID1cbmV4cG9ydHMuZnJlZVVpbnQzMiA9XG5leHBvcnRzLmZyZWVJbnQ4ID1cbmV4cG9ydHMuZnJlZUludDE2ID1cbmV4cG9ydHMuZnJlZUludDMyID1cbmV4cG9ydHMuZnJlZUZsb2F0MzIgPSBcbmV4cG9ydHMuZnJlZUZsb2F0ID1cbmV4cG9ydHMuZnJlZUZsb2F0NjQgPSBcbmV4cG9ydHMuZnJlZURvdWJsZSA9IFxuZXhwb3J0cy5mcmVlVWludDhDbGFtcGVkID0gXG5leHBvcnRzLmZyZWVEYXRhVmlldyA9IGZyZWVUeXBlZEFycmF5XG5cbmV4cG9ydHMuZnJlZUFycmF5QnVmZmVyID0gZnJlZUFycmF5QnVmZmVyXG5cbmV4cG9ydHMuZnJlZUJ1ZmZlciA9IGZ1bmN0aW9uIGZyZWVCdWZmZXIoYXJyYXkpIHtcbiAgQlVGRkVSW2JpdHMubG9nMihhcnJheS5sZW5ndGgpXS5wdXNoKGFycmF5KVxufVxuXG5leHBvcnRzLm1hbGxvYyA9IGZ1bmN0aW9uIG1hbGxvYyhuLCBkdHlwZSkge1xuICBpZihkdHlwZSA9PT0gdW5kZWZpbmVkIHx8IGR0eXBlID09PSAnYXJyYXlidWZmZXInKSB7XG4gICAgcmV0dXJuIG1hbGxvY0FycmF5QnVmZmVyKG4pXG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoKGR0eXBlKSB7XG4gICAgICBjYXNlICd1aW50OCc6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50OChuKVxuICAgICAgY2FzZSAndWludDE2JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY1VpbnQxNihuKVxuICAgICAgY2FzZSAndWludDMyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY1VpbnQzMihuKVxuICAgICAgY2FzZSAnaW50OCc6XG4gICAgICAgIHJldHVybiBtYWxsb2NJbnQ4KG4pXG4gICAgICBjYXNlICdpbnQxNic6XG4gICAgICAgIHJldHVybiBtYWxsb2NJbnQxNihuKVxuICAgICAgY2FzZSAnaW50MzInOlxuICAgICAgICByZXR1cm4gbWFsbG9jSW50MzIobilcbiAgICAgIGNhc2UgJ2Zsb2F0JzpcbiAgICAgIGNhc2UgJ2Zsb2F0MzInOlxuICAgICAgICByZXR1cm4gbWFsbG9jRmxvYXQobilcbiAgICAgIGNhc2UgJ2RvdWJsZSc6XG4gICAgICBjYXNlICdmbG9hdDY0JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0RvdWJsZShuKVxuICAgICAgY2FzZSAndWludDhfY2xhbXBlZCc6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50OENsYW1wZWQobilcbiAgICAgIGNhc2UgJ2J1ZmZlcic6XG4gICAgICAgIHJldHVybiBtYWxsb2NCdWZmZXIobilcbiAgICAgIGNhc2UgJ2RhdGEnOlxuICAgICAgY2FzZSAnZGF0YXZpZXcnOlxuICAgICAgICByZXR1cm4gbWFsbG9jRGF0YVZpZXcobilcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgcmV0dXJuIG51bGxcbiAgICB9XG4gIH1cbiAgcmV0dXJuIG51bGxcbn1cblxuZnVuY3Rpb24gbWFsbG9jQXJyYXlCdWZmZXIobikge1xuICB2YXIgbiA9IGJpdHMubmV4dFBvdzIobilcbiAgdmFyIGxvZ19uID0gYml0cy5sb2cyKG4pXG4gIHZhciBkID0gREFUQVtsb2dfbl1cbiAgaWYoZC5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIGQucG9wKClcbiAgfVxuICByZXR1cm4gbmV3IEFycmF5QnVmZmVyKG4pXG59XG5leHBvcnRzLm1hbGxvY0FycmF5QnVmZmVyID0gbWFsbG9jQXJyYXlCdWZmZXJcblxuZnVuY3Rpb24gbWFsbG9jVWludDgobikge1xuICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIobiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY1VpbnQ4ID0gbWFsbG9jVWludDhcblxuZnVuY3Rpb24gbWFsbG9jVWludDE2KG4pIHtcbiAgcmV0dXJuIG5ldyBVaW50MTZBcnJheShtYWxsb2NBcnJheUJ1ZmZlcigyKm4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NVaW50MTYgPSBtYWxsb2NVaW50MTZcblxuZnVuY3Rpb24gbWFsbG9jVWludDMyKG4pIHtcbiAgcmV0dXJuIG5ldyBVaW50MzJBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig0Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NVaW50MzIgPSBtYWxsb2NVaW50MzJcblxuZnVuY3Rpb24gbWFsbG9jSW50OChuKSB7XG4gIHJldHVybiBuZXcgSW50OEFycmF5KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NJbnQ4ID0gbWFsbG9jSW50OFxuXG5mdW5jdGlvbiBtYWxsb2NJbnQxNihuKSB7XG4gIHJldHVybiBuZXcgSW50MTZBcnJheShtYWxsb2NBcnJheUJ1ZmZlcigyKm4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NJbnQxNiA9IG1hbGxvY0ludDE2XG5cbmZ1bmN0aW9uIG1hbGxvY0ludDMyKG4pIHtcbiAgcmV0dXJuIG5ldyBJbnQzMkFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDQqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0ludDMyID0gbWFsbG9jSW50MzJcblxuZnVuY3Rpb24gbWFsbG9jRmxvYXQobikge1xuICByZXR1cm4gbmV3IEZsb2F0MzJBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig0Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NGbG9hdDMyID0gZXhwb3J0cy5tYWxsb2NGbG9hdCA9IG1hbGxvY0Zsb2F0XG5cbmZ1bmN0aW9uIG1hbGxvY0RvdWJsZShuKSB7XG4gIHJldHVybiBuZXcgRmxvYXQ2NEFycmF5KG1hbGxvY0FycmF5QnVmZmVyKDgqbiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0Zsb2F0NjQgPSBleHBvcnRzLm1hbGxvY0RvdWJsZSA9IG1hbGxvY0RvdWJsZVxuXG5mdW5jdGlvbiBtYWxsb2NVaW50OENsYW1wZWQobikge1xuICBpZihoYXNVaW50OEMpIHtcbiAgICByZXR1cm4gbmV3IFVpbnQ4Q2xhbXBlZEFycmF5KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBtYWxsb2NVaW50OChuKVxuICB9XG59XG5leHBvcnRzLm1hbGxvY1VpbnQ4Q2xhbXBlZCA9IG1hbGxvY1VpbnQ4Q2xhbXBlZFxuXG5mdW5jdGlvbiBtYWxsb2NEYXRhVmlldyhuKSB7XG4gIHJldHVybiBuZXcgRGF0YVZpZXcobWFsbG9jQXJyYXlCdWZmZXIobiksIDAsIG4pXG59XG5leHBvcnRzLm1hbGxvY0RhdGFWaWV3ID0gbWFsbG9jRGF0YVZpZXdcblxuZnVuY3Rpb24gbWFsbG9jQnVmZmVyKG4pIHtcbiAgbiA9IGJpdHMubmV4dFBvdzIobilcbiAgdmFyIGxvZ19uID0gYml0cy5sb2cyKG4pXG4gIHZhciBjYWNoZSA9IEJVRkZFUltsb2dfbl1cbiAgaWYoY2FjaGUubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBjYWNoZS5wb3AoKVxuICB9XG4gIHJldHVybiBuZXcgQnVmZmVyKG4pXG59XG5leHBvcnRzLm1hbGxvY0J1ZmZlciA9IG1hbGxvY0J1ZmZlclxuXG5leHBvcnRzLmNsZWFyQ2FjaGUgPSBmdW5jdGlvbiBjbGVhckNhY2hlKCkge1xuICBmb3IodmFyIGk9MDsgaTwzMjsgKytpKSB7XG4gICAgUE9PTC5VSU5UOFtpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5VSU5UMTZbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuVUlOVDMyW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLklOVDhbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuSU5UMTZbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuSU5UMzJbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuRkxPQVRbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuRE9VQkxFW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLlVJTlQ4Q1tpXS5sZW5ndGggPSAwXG4gICAgREFUQVtpXS5sZW5ndGggPSAwXG4gICAgQlVGRkVSW2ldLmxlbmd0aCA9IDBcbiAgfVxufVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3R5cGVkYXJyYXktcG9vbC9wb29sLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImV4cG9ydHMucmVhZCA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCwgaXNMRSwgbUxlbiwgbkJ5dGVzKSB7XG4gIHZhciBlLCBtXG4gIHZhciBlTGVuID0gbkJ5dGVzICogOCAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IGUgKiAyNTYgKyBidWZmZXJbb2Zmc2V0ICsgaV0sIGkgKz0gZCwgbkJpdHMgLT0gOCkge31cblxuICBtID0gZSAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBlID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBtTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IG0gPSBtICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgaWYgKGUgPT09IDApIHtcbiAgICBlID0gMSAtIGVCaWFzXG4gIH0gZWxzZSBpZiAoZSA9PT0gZU1heCkge1xuICAgIHJldHVybiBtID8gTmFOIDogKChzID8gLTEgOiAxKSAqIEluZmluaXR5KVxuICB9IGVsc2Uge1xuICAgIG0gPSBtICsgTWF0aC5wb3coMiwgbUxlbilcbiAgICBlID0gZSAtIGVCaWFzXG4gIH1cbiAgcmV0dXJuIChzID8gLTEgOiAxKSAqIG0gKiBNYXRoLnBvdygyLCBlIC0gbUxlbilcbn1cblxuZXhwb3J0cy53cml0ZSA9IGZ1bmN0aW9uIChidWZmZXIsIHZhbHVlLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbSwgY1xuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKHZhbHVlICogYyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSBlICsgZUJpYXNcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IHZhbHVlICogTWF0aC5wb3coMiwgZUJpYXMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gMFxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBtTGVuID49IDg7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IG0gJiAweGZmLCBpICs9IGQsIG0gLz0gMjU2LCBtTGVuIC09IDgpIHt9XG5cbiAgZSA9IChlIDw8IG1MZW4pIHwgbVxuICBlTGVuICs9IG1MZW5cbiAgZm9yICg7IGVMZW4gPiAwOyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBlICYgMHhmZiwgaSArPSBkLCBlIC89IDI1NiwgZUxlbiAtPSA4KSB7fVxuXG4gIGJ1ZmZlcltvZmZzZXQgKyBpIC0gZF0gfD0gcyAqIDEyOFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaWVlZTc1NC9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNDZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCIvKipcbiAqIEJpdCB0d2lkZGxpbmcgaGFja3MgZm9yIEphdmFTY3JpcHQuXG4gKlxuICogQXV0aG9yOiBNaWtvbGEgTHlzZW5rb1xuICpcbiAqIFBvcnRlZCBmcm9tIFN0YW5mb3JkIGJpdCB0d2lkZGxpbmcgaGFjayBsaWJyYXJ5OlxuICogICAgaHR0cDovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+c2VhbmRlci9iaXRoYWNrcy5odG1sXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7IFwidXNlIHJlc3RyaWN0XCI7XG5cbi8vTnVtYmVyIG9mIGJpdHMgaW4gYW4gaW50ZWdlclxudmFyIElOVF9CSVRTID0gMzI7XG5cbi8vQ29uc3RhbnRzXG5leHBvcnRzLklOVF9CSVRTICA9IElOVF9CSVRTO1xuZXhwb3J0cy5JTlRfTUFYICAgPSAgMHg3ZmZmZmZmZjtcbmV4cG9ydHMuSU5UX01JTiAgID0gLTE8PChJTlRfQklUUy0xKTtcblxuLy9SZXR1cm5zIC0xLCAwLCArMSBkZXBlbmRpbmcgb24gc2lnbiBvZiB4XG5leHBvcnRzLnNpZ24gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAodiA+IDApIC0gKHYgPCAwKTtcbn1cblxuLy9Db21wdXRlcyBhYnNvbHV0ZSB2YWx1ZSBvZiBpbnRlZ2VyXG5leHBvcnRzLmFicyA9IGZ1bmN0aW9uKHYpIHtcbiAgdmFyIG1hc2sgPSB2ID4+IChJTlRfQklUUy0xKTtcbiAgcmV0dXJuICh2IF4gbWFzaykgLSBtYXNrO1xufVxuXG4vL0NvbXB1dGVzIG1pbmltdW0gb2YgaW50ZWdlcnMgeCBhbmQgeVxuZXhwb3J0cy5taW4gPSBmdW5jdGlvbih4LCB5KSB7XG4gIHJldHVybiB5IF4gKCh4IF4geSkgJiAtKHggPCB5KSk7XG59XG5cbi8vQ29tcHV0ZXMgbWF4aW11bSBvZiBpbnRlZ2VycyB4IGFuZCB5XG5leHBvcnRzLm1heCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIHggXiAoKHggXiB5KSAmIC0oeCA8IHkpKTtcbn1cblxuLy9DaGVja3MgaWYgYSBudW1iZXIgaXMgYSBwb3dlciBvZiB0d29cbmV4cG9ydHMuaXNQb3cyID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gISh2ICYgKHYtMSkpICYmICghIXYpO1xufVxuXG4vL0NvbXB1dGVzIGxvZyBiYXNlIDIgb2YgdlxuZXhwb3J0cy5sb2cyID0gZnVuY3Rpb24odikge1xuICB2YXIgciwgc2hpZnQ7XG4gIHIgPSAgICAgKHYgPiAweEZGRkYpIDw8IDQ7IHYgPj4+PSByO1xuICBzaGlmdCA9ICh2ID4gMHhGRiAgKSA8PCAzOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XG4gIHNoaWZ0ID0gKHYgPiAweEYgICApIDw8IDI7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcbiAgc2hpZnQgPSAodiA+IDB4MyAgICkgPDwgMTsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xuICByZXR1cm4gciB8ICh2ID4+IDEpO1xufVxuXG4vL0NvbXB1dGVzIGxvZyBiYXNlIDEwIG9mIHZcbmV4cG9ydHMubG9nMTAgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAgKHYgPj0gMTAwMDAwMDAwMCkgPyA5IDogKHYgPj0gMTAwMDAwMDAwKSA/IDggOiAodiA+PSAxMDAwMDAwMCkgPyA3IDpcbiAgICAgICAgICAodiA+PSAxMDAwMDAwKSA/IDYgOiAodiA+PSAxMDAwMDApID8gNSA6ICh2ID49IDEwMDAwKSA/IDQgOlxuICAgICAgICAgICh2ID49IDEwMDApID8gMyA6ICh2ID49IDEwMCkgPyAyIDogKHYgPj0gMTApID8gMSA6IDA7XG59XG5cbi8vQ291bnRzIG51bWJlciBvZiBiaXRzXG5leHBvcnRzLnBvcENvdW50ID0gZnVuY3Rpb24odikge1xuICB2ID0gdiAtICgodiA+Pj4gMSkgJiAweDU1NTU1NTU1KTtcbiAgdiA9ICh2ICYgMHgzMzMzMzMzMykgKyAoKHYgPj4+IDIpICYgMHgzMzMzMzMzMyk7XG4gIHJldHVybiAoKHYgKyAodiA+Pj4gNCkgJiAweEYwRjBGMEYpICogMHgxMDEwMTAxKSA+Pj4gMjQ7XG59XG5cbi8vQ291bnRzIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvc1xuZnVuY3Rpb24gY291bnRUcmFpbGluZ1plcm9zKHYpIHtcbiAgdmFyIGMgPSAzMjtcbiAgdiAmPSAtdjtcbiAgaWYgKHYpIGMtLTtcbiAgaWYgKHYgJiAweDAwMDBGRkZGKSBjIC09IDE2O1xuICBpZiAodiAmIDB4MDBGRjAwRkYpIGMgLT0gODtcbiAgaWYgKHYgJiAweDBGMEYwRjBGKSBjIC09IDQ7XG4gIGlmICh2ICYgMHgzMzMzMzMzMykgYyAtPSAyO1xuICBpZiAodiAmIDB4NTU1NTU1NTUpIGMgLT0gMTtcbiAgcmV0dXJuIGM7XG59XG5leHBvcnRzLmNvdW50VHJhaWxpbmdaZXJvcyA9IGNvdW50VHJhaWxpbmdaZXJvcztcblxuLy9Sb3VuZHMgdG8gbmV4dCBwb3dlciBvZiAyXG5leHBvcnRzLm5leHRQb3cyID0gZnVuY3Rpb24odikge1xuICB2ICs9IHYgPT09IDA7XG4gIC0tdjtcbiAgdiB8PSB2ID4+PiAxO1xuICB2IHw9IHYgPj4+IDI7XG4gIHYgfD0gdiA+Pj4gNDtcbiAgdiB8PSB2ID4+PiA4O1xuICB2IHw9IHYgPj4+IDE2O1xuICByZXR1cm4gdiArIDE7XG59XG5cbi8vUm91bmRzIGRvd24gdG8gcHJldmlvdXMgcG93ZXIgb2YgMlxuZXhwb3J0cy5wcmV2UG93MiA9IGZ1bmN0aW9uKHYpIHtcbiAgdiB8PSB2ID4+PiAxO1xuICB2IHw9IHYgPj4+IDI7XG4gIHYgfD0gdiA+Pj4gNDtcbiAgdiB8PSB2ID4+PiA4O1xuICB2IHw9IHYgPj4+IDE2O1xuICByZXR1cm4gdiAtICh2Pj4+MSk7XG59XG5cbi8vQ29tcHV0ZXMgcGFyaXR5IG9mIHdvcmRcbmV4cG9ydHMucGFyaXR5ID0gZnVuY3Rpb24odikge1xuICB2IF49IHYgPj4+IDE2O1xuICB2IF49IHYgPj4+IDg7XG4gIHYgXj0gdiA+Pj4gNDtcbiAgdiAmPSAweGY7XG4gIHJldHVybiAoMHg2OTk2ID4+PiB2KSAmIDE7XG59XG5cbnZhciBSRVZFUlNFX1RBQkxFID0gbmV3IEFycmF5KDI1Nik7XG5cbihmdW5jdGlvbih0YWIpIHtcbiAgZm9yKHZhciBpPTA7IGk8MjU2OyArK2kpIHtcbiAgICB2YXIgdiA9IGksIHIgPSBpLCBzID0gNztcbiAgICBmb3IgKHYgPj4+PSAxOyB2OyB2ID4+Pj0gMSkge1xuICAgICAgciA8PD0gMTtcbiAgICAgIHIgfD0gdiAmIDE7XG4gICAgICAtLXM7XG4gICAgfVxuICAgIHRhYltpXSA9IChyIDw8IHMpICYgMHhmZjtcbiAgfVxufSkoUkVWRVJTRV9UQUJMRSk7XG5cbi8vUmV2ZXJzZSBiaXRzIGluIGEgMzIgYml0IHdvcmRcbmV4cG9ydHMucmV2ZXJzZSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICAoUkVWRVJTRV9UQUJMRVsgdiAgICAgICAgICYgMHhmZl0gPDwgMjQpIHxcbiAgICAgICAgICAoUkVWRVJTRV9UQUJMRVsodiA+Pj4gOCkgICYgMHhmZl0gPDwgMTYpIHxcbiAgICAgICAgICAoUkVWRVJTRV9UQUJMRVsodiA+Pj4gMTYpICYgMHhmZl0gPDwgOCkgIHxcbiAgICAgICAgICAgUkVWRVJTRV9UQUJMRVsodiA+Pj4gMjQpICYgMHhmZl07XG59XG5cbi8vSW50ZXJsZWF2ZSBiaXRzIG9mIDIgY29vcmRpbmF0ZXMgd2l0aCAxNiBiaXRzLiAgVXNlZnVsIGZvciBmYXN0IHF1YWR0cmVlIGNvZGVzXG5leHBvcnRzLmludGVybGVhdmUyID0gZnVuY3Rpb24oeCwgeSkge1xuICB4ICY9IDB4RkZGRjtcbiAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgeCA9ICh4IHwgKHggPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgeCA9ICh4IHwgKHggPDwgMikpICYgMHgzMzMzMzMzMztcbiAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICB5ICY9IDB4RkZGRjtcbiAgeSA9ICh5IHwgKHkgPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgeSA9ICh5IHwgKHkgPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgeSA9ICh5IHwgKHkgPDwgMikpICYgMHgzMzMzMzMzMztcbiAgeSA9ICh5IHwgKHkgPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICByZXR1cm4geCB8ICh5IDw8IDEpO1xufVxuXG4vL0V4dHJhY3RzIHRoZSBudGggaW50ZXJsZWF2ZWQgY29tcG9uZW50XG5leHBvcnRzLmRlaW50ZXJsZWF2ZTIgPSBmdW5jdGlvbih2LCBuKSB7XG4gIHYgPSAodiA+Pj4gbikgJiAweDU1NTU1NTU1O1xuICB2ID0gKHYgfCAodiA+Pj4gMSkpICAmIDB4MzMzMzMzMzM7XG4gIHYgPSAodiB8ICh2ID4+PiAyKSkgICYgMHgwRjBGMEYwRjtcbiAgdiA9ICh2IHwgKHYgPj4+IDQpKSAgJiAweDAwRkYwMEZGO1xuICB2ID0gKHYgfCAodiA+Pj4gMTYpKSAmIDB4MDAwRkZGRjtcbiAgcmV0dXJuICh2IDw8IDE2KSA+PiAxNjtcbn1cblxuXG4vL0ludGVybGVhdmUgYml0cyBvZiAzIGNvb3JkaW5hdGVzLCBlYWNoIHdpdGggMTAgYml0cy4gIFVzZWZ1bCBmb3IgZmFzdCBvY3RyZWUgY29kZXNcbmV4cG9ydHMuaW50ZXJsZWF2ZTMgPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHggJj0gMHgzRkY7XG4gIHggID0gKHggfCAoeDw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHggID0gKHggfCAoeDw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeCAgPSAoeCB8ICh4PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeCAgPSAoeCB8ICh4PDwyKSkgICYgMTIyNzEzMzUxMztcblxuICB5ICY9IDB4M0ZGO1xuICB5ICA9ICh5IHwgKHk8PDE2KSkgJiA0Mjc4MTkwMzM1O1xuICB5ICA9ICh5IHwgKHk8PDgpKSAgJiAyNTE3MTk2OTU7XG4gIHkgID0gKHkgfCAoeTw8NCkpICAmIDMyNzIzNTYwMzU7XG4gIHkgID0gKHkgfCAoeTw8MikpICAmIDEyMjcxMzM1MTM7XG4gIHggfD0gKHkgPDwgMSk7XG4gIFxuICB6ICY9IDB4M0ZGO1xuICB6ICA9ICh6IHwgKHo8PDE2KSkgJiA0Mjc4MTkwMzM1O1xuICB6ICA9ICh6IHwgKHo8PDgpKSAgJiAyNTE3MTk2OTU7XG4gIHogID0gKHogfCAoejw8NCkpICAmIDMyNzIzNTYwMzU7XG4gIHogID0gKHogfCAoejw8MikpICAmIDEyMjcxMzM1MTM7XG4gIFxuICByZXR1cm4geCB8ICh6IDw8IDIpO1xufVxuXG4vL0V4dHJhY3RzIG50aCBpbnRlcmxlYXZlZCBjb21wb25lbnQgb2YgYSAzLXR1cGxlXG5leHBvcnRzLmRlaW50ZXJsZWF2ZTMgPSBmdW5jdGlvbih2LCBuKSB7XG4gIHYgPSAodiA+Pj4gbikgICAgICAgJiAxMjI3MTMzNTEzO1xuICB2ID0gKHYgfCAodj4+PjIpKSAgICYgMzI3MjM1NjAzNTtcbiAgdiA9ICh2IHwgKHY+Pj40KSkgICAmIDI1MTcxOTY5NTtcbiAgdiA9ICh2IHwgKHY+Pj44KSkgICAmIDQyNzgxOTAzMzU7XG4gIHYgPSAodiB8ICh2Pj4+MTYpKSAgJiAweDNGRjtcbiAgcmV0dXJuICh2PDwyMik+PjIyO1xufVxuXG4vL0NvbXB1dGVzIG5leHQgY29tYmluYXRpb24gaW4gY29sZXhpY29ncmFwaGljIG9yZGVyICh0aGlzIGlzIG1pc3Rha2VubHkgY2FsbGVkIG5leHRQZXJtdXRhdGlvbiBvbiB0aGUgYml0IHR3aWRkbGluZyBoYWNrcyBwYWdlKVxuZXhwb3J0cy5uZXh0Q29tYmluYXRpb24gPSBmdW5jdGlvbih2KSB7XG4gIHZhciB0ID0gdiB8ICh2IC0gMSk7XG4gIHJldHVybiAodCArIDEpIHwgKCgofnQgJiAtfnQpIC0gMSkgPj4+IChjb3VudFRyYWlsaW5nWmVyb3ModikgKyAxKSk7XG59XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JpdC10d2lkZGxlL3R3aWRkbGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gZHVwZV9hcnJheShjb3VudCwgdmFsdWUsIGkpIHtcbiAgdmFyIGMgPSBjb3VudFtpXXwwXG4gIGlmKGMgPD0gMCkge1xuICAgIHJldHVybiBbXVxuICB9XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoYyksIGpcbiAgaWYoaSA9PT0gY291bnQubGVuZ3RoLTEpIHtcbiAgICBmb3Ioaj0wOyBqPGM7ICsraikge1xuICAgICAgcmVzdWx0W2pdID0gdmFsdWVcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yKGo9MDsgajxjOyArK2opIHtcbiAgICAgIHJlc3VsdFtqXSA9IGR1cGVfYXJyYXkoY291bnQsIHZhbHVlLCBpKzEpXG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gZHVwZV9udW1iZXIoY291bnQsIHZhbHVlKSB7XG4gIHZhciByZXN1bHQsIGlcbiAgcmVzdWx0ID0gbmV3IEFycmF5KGNvdW50KVxuICBmb3IoaT0wOyBpPGNvdW50OyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSB2YWx1ZVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gZHVwZShjb3VudCwgdmFsdWUpIHtcbiAgaWYodHlwZW9mIHZhbHVlID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFsdWUgPSAwXG4gIH1cbiAgc3dpdGNoKHR5cGVvZiBjb3VudCkge1xuICAgIGNhc2UgXCJudW1iZXJcIjpcbiAgICAgIGlmKGNvdW50ID4gMCkge1xuICAgICAgICByZXR1cm4gZHVwZV9udW1iZXIoY291bnR8MCwgdmFsdWUpXG4gICAgICB9XG4gICAgYnJlYWtcbiAgICBjYXNlIFwib2JqZWN0XCI6XG4gICAgICBpZih0eXBlb2YgKGNvdW50Lmxlbmd0aCkgPT09IFwibnVtYmVyXCIpIHtcbiAgICAgICAgcmV0dXJuIGR1cGVfYXJyYXkoY291bnQsIHZhbHVlLCAwKVxuICAgICAgfVxuICAgIGJyZWFrXG4gIH1cbiAgcmV0dXJuIFtdXG59XG5cbm1vZHVsZS5leHBvcnRzID0gZHVwZVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2R1cC9kdXAuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNvbXBpbGUgPSByZXF1aXJlKFwiY3dpc2UtY29tcGlsZXJcIilcblxudmFyIEVtcHR5UHJvYyA9IHtcbiAgYm9keTogXCJcIixcbiAgYXJnczogW10sXG4gIHRoaXNWYXJzOiBbXSxcbiAgbG9jYWxWYXJzOiBbXVxufVxuXG5mdW5jdGlvbiBmaXh1cCh4KSB7XG4gIGlmKCF4KSB7XG4gICAgcmV0dXJuIEVtcHR5UHJvY1xuICB9XG4gIGZvcih2YXIgaT0wOyBpPHguYXJncy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhID0geC5hcmdzW2ldXG4gICAgaWYoaSA9PT0gMCkge1xuICAgICAgeC5hcmdzW2ldID0ge25hbWU6IGEsIGx2YWx1ZTp0cnVlLCBydmFsdWU6ICEheC5ydmFsdWUsIGNvdW50OnguY291bnR8fDEgfVxuICAgIH0gZWxzZSB7XG4gICAgICB4LmFyZ3NbaV0gPSB7bmFtZTogYSwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6IDF9XG4gICAgfVxuICB9XG4gIGlmKCF4LnRoaXNWYXJzKSB7XG4gICAgeC50aGlzVmFycyA9IFtdXG4gIH1cbiAgaWYoIXgubG9jYWxWYXJzKSB7XG4gICAgeC5sb2NhbFZhcnMgPSBbXVxuICB9XG4gIHJldHVybiB4XG59XG5cbmZ1bmN0aW9uIHBjb21waWxlKHVzZXJfYXJncykge1xuICByZXR1cm4gY29tcGlsZSh7XG4gICAgYXJnczogICAgIHVzZXJfYXJncy5hcmdzLFxuICAgIHByZTogICAgICBmaXh1cCh1c2VyX2FyZ3MucHJlKSxcbiAgICBib2R5OiAgICAgZml4dXAodXNlcl9hcmdzLmJvZHkpLFxuICAgIHBvc3Q6ICAgICBmaXh1cCh1c2VyX2FyZ3MucHJvYyksXG4gICAgZnVuY05hbWU6IHVzZXJfYXJncy5mdW5jTmFtZVxuICB9KVxufVxuXG5mdW5jdGlvbiBtYWtlT3AodXNlcl9hcmdzKSB7XG4gIHZhciBhcmdzID0gW11cbiAgZm9yKHZhciBpPTA7IGk8dXNlcl9hcmdzLmFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBhcmdzLnB1c2goXCJhXCIraSlcbiAgfVxuICB2YXIgd3JhcHBlciA9IG5ldyBGdW5jdGlvbihcIlBcIiwgW1xuICAgIFwicmV0dXJuIGZ1bmN0aW9uIFwiLCB1c2VyX2FyZ3MuZnVuY05hbWUsIFwiX25kYXJyYXlvcHMoXCIsIGFyZ3Muam9pbihcIixcIiksIFwiKSB7UChcIiwgYXJncy5qb2luKFwiLFwiKSwgXCIpO3JldHVybiBhMH1cIlxuICBdLmpvaW4oXCJcIikpXG4gIHJldHVybiB3cmFwcGVyKHBjb21waWxlKHVzZXJfYXJncykpXG59XG5cbnZhciBhc3NpZ25fb3BzID0ge1xuICBhZGQ6ICBcIitcIixcbiAgc3ViOiAgXCItXCIsXG4gIG11bDogIFwiKlwiLFxuICBkaXY6ICBcIi9cIixcbiAgbW9kOiAgXCIlXCIsXG4gIGJhbmQ6IFwiJlwiLFxuICBib3I6ICBcInxcIixcbiAgYnhvcjogXCJeXCIsXG4gIGxzaGlmdDogXCI8PFwiLFxuICByc2hpZnQ6IFwiPj5cIixcbiAgcnJzaGlmdDogXCI+Pj5cIlxufVxuOyhmdW5jdGlvbigpe1xuICBmb3IodmFyIGlkIGluIGFzc2lnbl9vcHMpIHtcbiAgICB2YXIgb3AgPSBhc3NpZ25fb3BzW2lkXVxuICAgIGV4cG9ydHNbaWRdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsXCJhcnJheVwiLFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLFxuICAgICAgICAgICAgIGJvZHk6IFwiYT1iXCIrb3ArXCJjXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wiZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSxcbiAgICAgICAgICAgICBib2R5OlwiYVwiK29wK1wiPWJcIn0sXG4gICAgICBydmFsdWU6IHRydWUsXG4gICAgICBmdW5jTmFtZTogaWQrXCJlcVwiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic1wiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLCBcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1iXCIrb3ArXCJzXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkK1wic1wiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic2VxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsXCJzY2FsYXJcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJzXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhXCIrb3ArXCI9c1wifSxcbiAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgIGZ1bmNOYW1lOiBpZCtcInNlcVwiXG4gICAgfSlcbiAgfVxufSkoKTtcblxudmFyIHVuYXJ5X29wcyA9IHtcbiAgbm90OiBcIiFcIixcbiAgYm5vdDogXCJ+XCIsXG4gIG5lZzogXCItXCIsXG4gIHJlY2lwOiBcIjEuMC9cIlxufVxuOyhmdW5jdGlvbigpe1xuICBmb3IodmFyIGlkIGluIHVuYXJ5X29wcykge1xuICAgIHZhciBvcCA9IHVuYXJ5X29wc1tpZF1cbiAgICBleHBvcnRzW2lkXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1cIitvcCtcImJcIn0sXG4gICAgICBmdW5jTmFtZTogaWRcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9XCIrb3ArXCJhXCJ9LFxuICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgY291bnQ6IDIsXG4gICAgICBmdW5jTmFtZTogaWQrXCJlcVwiXG4gICAgfSlcbiAgfVxufSkoKTtcblxudmFyIGJpbmFyeV9vcHMgPSB7XG4gIGFuZDogXCImJlwiLFxuICBvcjogXCJ8fFwiLFxuICBlcTogXCI9PT1cIixcbiAgbmVxOiBcIiE9PVwiLFxuICBsdDogXCI8XCIsXG4gIGd0OiBcIj5cIixcbiAgbGVxOiBcIjw9XCIsXG4gIGdlcTogXCI+PVwiXG59XG47KGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGlkIGluIGJpbmFyeV9vcHMpIHtcbiAgICB2YXIgb3AgPSBiaW5hcnlfb3BzW2lkXVxuICAgIGV4cG9ydHNbaWRdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsXCJhcnJheVwiLFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiLCBcImNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9YlwiK29wK1wiY1wifSxcbiAgICAgIGZ1bmNOYW1lOiBpZFxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcInNcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCIsXCJzY2FsYXJcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiLCBcInNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9YlwiK29wK1wic1wifSxcbiAgICAgIGZ1bmNOYW1lOiBpZCtcInNcIlxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1hXCIrb3ArXCJiXCJ9LFxuICAgICAgcnZhbHVlOnRydWUsXG4gICAgICBjb3VudDoyLFxuICAgICAgZnVuY05hbWU6IGlkK1wiZXFcIlxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcInNlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcInNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImE9YVwiK29wK1wic1wifSxcbiAgICAgIHJ2YWx1ZTp0cnVlLFxuICAgICAgY291bnQ6MixcbiAgICAgIGZ1bmNOYW1lOiBpZCtcInNlcVwiXG4gICAgfSlcbiAgfVxufSkoKTtcblxudmFyIG1hdGhfdW5hcnkgPSBbXG4gIFwiYWJzXCIsXG4gIFwiYWNvc1wiLFxuICBcImFzaW5cIixcbiAgXCJhdGFuXCIsXG4gIFwiY2VpbFwiLFxuICBcImNvc1wiLFxuICBcImV4cFwiLFxuICBcImZsb29yXCIsXG4gIFwibG9nXCIsXG4gIFwicm91bmRcIixcbiAgXCJzaW5cIixcbiAgXCJzcXJ0XCIsXG4gIFwidGFuXCJcbl1cbjsoZnVuY3Rpb24oKSB7XG4gIGZvcih2YXIgaT0wOyBpPG1hdGhfdW5hcnkubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgZiA9IG1hdGhfdW5hcnlbaV1cbiAgICBleHBvcnRzW2ZdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJlcVwiXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICAgICAgYXJnczogW1wiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6IFtcImFcIl0sIGJvZHk6XCJhPXRoaXNfZihhKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcImVxXCJcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgfVxufSkoKTtcblxudmFyIG1hdGhfY29tbSA9IFtcbiAgXCJtYXhcIixcbiAgXCJtaW5cIixcbiAgXCJhdGFuMlwiLFxuICBcInBvd1wiXG5dXG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaT0wOyBpPG1hdGhfY29tbS5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmPSBtYXRoX2NvbW1baV1cbiAgICBleHBvcnRzW2ZdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYixjKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGZcbiAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcInNcIl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYixjKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJzXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wiZXFcIl0gPSBtYWtlT3AoeyBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihhLGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBjb3VudDogMixcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wiZXFcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJzZXFcIl0gPSBtYWtlT3AoeyBhcmdzOltcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYSxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgcnZhbHVlOnRydWUsXG4gICAgICAgICAgICAgICAgICBjb3VudDoyLFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJzZXFcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgfVxufSkoKTtcblxudmFyIG1hdGhfbm9uY29tbSA9IFtcbiAgXCJhdGFuMlwiLFxuICBcInBvd1wiXG5dXG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaT0wOyBpPG1hdGhfbm9uY29tbS5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmPSBtYXRoX25vbmNvbW1baV1cbiAgICBleHBvcnRzW2YrXCJvcFwiXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwiY1wiXSwgYm9keTpcImE9dGhpc19mKGMsYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wib3BcIlxuICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wib3BzXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiLFwiY1wiXSwgYm9keTpcImE9dGhpc19mKGMsYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wib3BzXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wib3BlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGIsYSlcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcGVxXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wib3BzZXFcIl0gPSBtYWtlT3AoeyBhcmdzOltcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYixhKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgcnZhbHVlOnRydWUsXG4gICAgICAgICAgICAgICAgICBjb3VudDoyLFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcHNlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICB9XG59KSgpO1xuXG5leHBvcnRzLmFueSA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIGJvZHk6IFwiaWYoYSl7cmV0dXJuIHRydWV9XCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltdLCBib2R5OlwicmV0dXJuIGZhbHNlXCJ9LFxuICBmdW5jTmFtZTogXCJhbnlcIlxufSlcblxuZXhwb3J0cy5hbGwgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiBFbXB0eVByb2MsXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcInhcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBib2R5OiBcImlmKCF4KXtyZXR1cm4gZmFsc2V9XCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltdLCBib2R5OlwicmV0dXJuIHRydWVcIn0sXG4gIGZ1bmNOYW1lOiBcImFsbFwiXG59KVxuXG5leHBvcnRzLnN1bSA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJ0aGlzX3MrPWFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcInN1bVwiXG59KVxuXG5leHBvcnRzLnByb2QgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MVwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIGJvZHk6IFwidGhpc19zKj1hXCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gdGhpc19zXCJ9LFxuICBmdW5jTmFtZTogXCJwcm9kXCJcbn0pXG5cbmV4cG9ydHMubm9ybTJzcXVhcmVkID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6Mn1dLCBib2R5OiBcInRoaXNfcys9YSphXCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gdGhpc19zXCJ9LFxuICBmdW5jTmFtZTogXCJub3JtMnNxdWFyZWRcIlxufSlcbiAgXG5leHBvcnRzLm5vcm0yID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6Mn1dLCBib2R5OiBcInRoaXNfcys9YSphXCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gTWF0aC5zcXJ0KHRoaXNfcylcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm0yXCJcbn0pXG4gIFxuXG5leHBvcnRzLm5vcm1pbmYgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDo0fV0sIGJvZHk6XCJpZigtYT50aGlzX3Mpe3RoaXNfcz0tYX1lbHNlIGlmKGE+dGhpc19zKXt0aGlzX3M9YX1cIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm1pbmZcIlxufSlcblxuZXhwb3J0cy5ub3JtMSA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjN9XSwgYm9keTogXCJ0aGlzX3MrPWE8MD8tYTphXCIsIGxvY2FsVmFyczogW10sIHRoaXNWYXJzOiBbXCJ0aGlzX3NcIl19LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJyZXR1cm4gdGhpc19zXCJ9LFxuICBmdW5jTmFtZTogXCJub3JtMVwiXG59KVxuXG5leHBvcnRzLnN1cCA9IGNvbXBpbGUoe1xuICBhcmdzOiBbIFwiYXJyYXlcIiBdLFxuICBwcmU6XG4gICB7IGJvZHk6IFwidGhpc19oPS1JbmZpbml0eVwiLFxuICAgICBhcmdzOiBbXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH0sXG4gIGJvZHk6XG4gICB7IGJvZHk6IFwiaWYoX2lubGluZV8xX2FyZzBfPnRoaXNfaCl0aGlzX2g9X2lubGluZV8xX2FyZzBfXCIsXG4gICAgIGFyZ3M6IFt7XCJuYW1lXCI6XCJfaW5saW5lXzFfYXJnMF9cIixcImx2YWx1ZVwiOmZhbHNlLFwicnZhbHVlXCI6dHJ1ZSxcImNvdW50XCI6Mn0gXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH0sXG4gIHBvc3Q6XG4gICB7IGJvZHk6IFwicmV0dXJuIHRoaXNfaFwiLFxuICAgICBhcmdzOiBbXSxcbiAgICAgdGhpc1ZhcnM6IFsgXCJ0aGlzX2hcIiBdLFxuICAgICBsb2NhbFZhcnM6IFtdIH1cbiB9KVxuXG5leHBvcnRzLmluZiA9IGNvbXBpbGUoe1xuICBhcmdzOiBbIFwiYXJyYXlcIiBdLFxuICBwcmU6XG4gICB7IGJvZHk6IFwidGhpc19oPUluZmluaXR5XCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgYm9keTpcbiAgIHsgYm9keTogXCJpZihfaW5saW5lXzFfYXJnMF88dGhpc19oKXRoaXNfaD1faW5saW5lXzFfYXJnMF9cIixcbiAgICAgYXJnczogW3tcIm5hbWVcIjpcIl9pbmxpbmVfMV9hcmcwX1wiLFwibHZhbHVlXCI6ZmFsc2UsXCJydmFsdWVcIjp0cnVlLFwiY291bnRcIjoyfSBdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgcG9zdDpcbiAgIHsgYm9keTogXCJyZXR1cm4gdGhpc19oXCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfVxuIH0pXG5cbmV4cG9ydHMuYXJnbWluID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiaW5kZXhcIixcImFycmF5XCIsXCJzaGFwZVwiXSxcbiAgcHJlOntcbiAgICBib2R5Olwie3RoaXNfdj1JbmZpbml0eTt0aGlzX2k9X2lubGluZV8wX2FyZzJfLnNsaWNlKDApfVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMV9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMl9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6MX1cbiAgICAgIF0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltdfSxcbiAgYm9keTp7XG4gICAgYm9keTpcIntpZihfaW5saW5lXzFfYXJnMV88dGhpc192KXt0aGlzX3Y9X2lubGluZV8xX2FyZzFfO2Zvcih2YXIgX2lubGluZV8xX2s9MDtfaW5saW5lXzFfazxfaW5saW5lXzFfYXJnMF8ubGVuZ3RoOysrX2lubGluZV8xX2spe3RoaXNfaVtfaW5saW5lXzFfa109X2lubGluZV8xX2FyZzBfW19pbmxpbmVfMV9rXX19fVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzFfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6Mn0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfV0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltcIl9pbmxpbmVfMV9rXCJdfSxcbiAgcG9zdDp7XG4gICAgYm9keTpcIntyZXR1cm4gdGhpc19pfVwiLFxuICAgIGFyZ3M6W10sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCJdLFxuICAgIGxvY2FsVmFyczpbXX1cbn0pXG5cbmV4cG9ydHMuYXJnbWF4ID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiaW5kZXhcIixcImFycmF5XCIsXCJzaGFwZVwiXSxcbiAgcHJlOntcbiAgICBib2R5Olwie3RoaXNfdj0tSW5maW5pdHk7dGhpc19pPV9pbmxpbmVfMF9hcmcyXy5zbGljZSgwKX1cIixcbiAgICBhcmdzOltcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzBfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTpmYWxzZSxjb3VudDowfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzFfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTpmYWxzZSxjb3VudDowfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8wX2FyZzJfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjF9XG4gICAgICBdLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiLFwidGhpc192XCJdLFxuICAgIGxvY2FsVmFyczpbXX0sXG4gIGJvZHk6e1xuICAgIGJvZHk6XCJ7aWYoX2lubGluZV8xX2FyZzFfPnRoaXNfdil7dGhpc192PV9pbmxpbmVfMV9hcmcxXztmb3IodmFyIF9pbmxpbmVfMV9rPTA7X2lubGluZV8xX2s8X2lubGluZV8xX2FyZzBfLmxlbmd0aDsrK19pbmxpbmVfMV9rKXt0aGlzX2lbX2lubGluZV8xX2tdPV9pbmxpbmVfMV9hcmcwX1tfaW5saW5lXzFfa119fX1cIixcbiAgICBhcmdzOltcbiAgICAgIHtuYW1lOlwiX2lubGluZV8xX2FyZzBfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjJ9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzFfYXJnMV9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6Mn1dLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiLFwidGhpc192XCJdLFxuICAgIGxvY2FsVmFyczpbXCJfaW5saW5lXzFfa1wiXX0sXG4gIHBvc3Q6e1xuICAgIGJvZHk6XCJ7cmV0dXJuIHRoaXNfaX1cIixcbiAgICBhcmdzOltdLFxuICAgIHRoaXNWYXJzOltcInRoaXNfaVwiXSxcbiAgICBsb2NhbFZhcnM6W119XG59KSAgXG5cbmV4cG9ydHMucmFuZG9tID0gbWFrZU9wKHtcbiAgYXJnczogW1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5yYW5kb21cIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgYm9keToge2FyZ3M6IFtcImFcIl0sIGJvZHk6XCJhPXRoaXNfZigpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gIGZ1bmNOYW1lOiBcInJhbmRvbVwiXG59KVxuXG5leHBvcnRzLmFzc2lnbiA9IG1ha2VPcCh7XG4gIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIl0sIGJvZHk6XCJhPWJcIn0sXG4gIGZ1bmNOYW1lOiBcImFzc2lnblwiIH0pXG5cbmV4cG9ydHMuYXNzaWducyA9IG1ha2VPcCh7XG4gIGFyZ3M6W1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCJdLCBib2R5OlwiYT1iXCJ9LFxuICBmdW5jTmFtZTogXCJhc3NpZ25zXCIgfSlcblxuXG5leHBvcnRzLmVxdWFscyA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gIHByZTogRW1wdHlQcm9jLFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJ4XCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9LFxuICAgICAgICAgICAgICAge25hbWU6XCJ5XCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgXG4gICAgICAgIGJvZHk6IFwiaWYoeCE9PXkpe3JldHVybiBmYWxzZX1cIiwgXG4gICAgICAgIGxvY2FsVmFyczogW10sIFxuICAgICAgICB0aGlzVmFyczogW119LFxuICBwb3N0OiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXSwgYm9keTpcInJldHVybiB0cnVlXCJ9LFxuICBmdW5jTmFtZTogXCJlcXVhbHNcIlxufSlcblxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZGFycmF5LW9wcy9uZGFycmF5LW9wcy5qc1xuLy8gbW9kdWxlIGlkID0gNDlcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY3JlYXRlVGh1bmsgPSByZXF1aXJlKFwiLi9saWIvdGh1bmsuanNcIilcblxuZnVuY3Rpb24gUHJvY2VkdXJlKCkge1xuICB0aGlzLmFyZ1R5cGVzID0gW11cbiAgdGhpcy5zaGltQXJncyA9IFtdXG4gIHRoaXMuYXJyYXlBcmdzID0gW11cbiAgdGhpcy5hcnJheUJsb2NrSW5kaWNlcyA9IFtdXG4gIHRoaXMuc2NhbGFyQXJncyA9IFtdXG4gIHRoaXMub2Zmc2V0QXJncyA9IFtdXG4gIHRoaXMub2Zmc2V0QXJnSW5kZXggPSBbXVxuICB0aGlzLmluZGV4QXJncyA9IFtdXG4gIHRoaXMuc2hhcGVBcmdzID0gW11cbiAgdGhpcy5mdW5jTmFtZSA9IFwiXCJcbiAgdGhpcy5wcmUgPSBudWxsXG4gIHRoaXMuYm9keSA9IG51bGxcbiAgdGhpcy5wb3N0ID0gbnVsbFxuICB0aGlzLmRlYnVnID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gY29tcGlsZUN3aXNlKHVzZXJfYXJncykge1xuICAvL0NyZWF0ZSBwcm9jZWR1cmVcbiAgdmFyIHByb2MgPSBuZXcgUHJvY2VkdXJlKClcbiAgXG4gIC8vUGFyc2UgYmxvY2tzXG4gIHByb2MucHJlICAgID0gdXNlcl9hcmdzLnByZVxuICBwcm9jLmJvZHkgICA9IHVzZXJfYXJncy5ib2R5XG4gIHByb2MucG9zdCAgID0gdXNlcl9hcmdzLnBvc3RcblxuICAvL1BhcnNlIGFyZ3VtZW50c1xuICB2YXIgcHJvY19hcmdzID0gdXNlcl9hcmdzLmFyZ3Muc2xpY2UoMClcbiAgcHJvYy5hcmdUeXBlcyA9IHByb2NfYXJnc1xuICBmb3IodmFyIGk9MDsgaTxwcm9jX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYXJnX3R5cGUgPSBwcm9jX2FyZ3NbaV1cbiAgICBpZihhcmdfdHlwZSA9PT0gXCJhcnJheVwiIHx8ICh0eXBlb2YgYXJnX3R5cGUgPT09IFwib2JqZWN0XCIgJiYgYXJnX3R5cGUuYmxvY2tJbmRpY2VzKSkge1xuICAgICAgcHJvYy5hcmdUeXBlc1tpXSA9IFwiYXJyYXlcIlxuICAgICAgcHJvYy5hcnJheUFyZ3MucHVzaChpKVxuICAgICAgcHJvYy5hcnJheUJsb2NrSW5kaWNlcy5wdXNoKGFyZ190eXBlLmJsb2NrSW5kaWNlcyA/IGFyZ190eXBlLmJsb2NrSW5kaWNlcyA6IDApXG4gICAgICBwcm9jLnNoaW1BcmdzLnB1c2goXCJhcnJheVwiICsgaSlcbiAgICAgIGlmKGkgPCBwcm9jLnByZS5hcmdzLmxlbmd0aCAmJiBwcm9jLnByZS5hcmdzW2ldLmNvdW50PjApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHByZSgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGFyZ3NcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLnBvc3QuYXJncy5sZW5ndGggJiYgcHJvYy5wb3N0LmFyZ3NbaV0uY291bnQ+MCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcG9zdCgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGFyZ3NcIilcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoYXJnX3R5cGUgPT09IFwic2NhbGFyXCIpIHtcbiAgICAgIHByb2Muc2NhbGFyQXJncy5wdXNoKGkpXG4gICAgICBwcm9jLnNoaW1BcmdzLnB1c2goXCJzY2FsYXJcIiArIGkpXG4gICAgfSBlbHNlIGlmKGFyZ190eXBlID09PSBcImluZGV4XCIpIHtcbiAgICAgIHByb2MuaW5kZXhBcmdzLnB1c2goaSlcbiAgICAgIGlmKGkgPCBwcm9jLnByZS5hcmdzLmxlbmd0aCAmJiBwcm9jLnByZS5hcmdzW2ldLmNvdW50ID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcHJlKCkgYmxvY2sgbWF5IG5vdCByZWZlcmVuY2UgYXJyYXkgaW5kZXhcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLmJvZHkuYXJncy5sZW5ndGggJiYgcHJvYy5ib2R5LmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBib2R5KCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBpbmRleFwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MucG9zdC5hcmdzLmxlbmd0aCAmJiBwcm9jLnBvc3QuYXJnc1tpXS5jb3VudCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHBvc3QoKSBibG9jayBtYXkgbm90IHJlZmVyZW5jZSBhcnJheSBpbmRleFwiKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZihhcmdfdHlwZSA9PT0gXCJzaGFwZVwiKSB7XG4gICAgICBwcm9jLnNoYXBlQXJncy5wdXNoKGkpXG4gICAgICBpZihpIDwgcHJvYy5wcmUuYXJncy5sZW5ndGggJiYgcHJvYy5wcmUuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHByZSgpIGJsb2NrIG1heSBub3Qgd3JpdGUgdG8gYXJyYXkgc2hhcGVcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLmJvZHkuYXJncy5sZW5ndGggJiYgcHJvYy5ib2R5LmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBib2R5KCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBzaGFwZVwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MucG9zdC5hcmdzLmxlbmd0aCAmJiBwcm9jLnBvc3QuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHBvc3QoKSBibG9jayBtYXkgbm90IHdyaXRlIHRvIGFycmF5IHNoYXBlXCIpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKHR5cGVvZiBhcmdfdHlwZSA9PT0gXCJvYmplY3RcIiAmJiBhcmdfdHlwZS5vZmZzZXQpIHtcbiAgICAgIHByb2MuYXJnVHlwZXNbaV0gPSBcIm9mZnNldFwiXG4gICAgICBwcm9jLm9mZnNldEFyZ3MucHVzaCh7IGFycmF5OiBhcmdfdHlwZS5hcnJheSwgb2Zmc2V0OmFyZ190eXBlLm9mZnNldCB9KVxuICAgICAgcHJvYy5vZmZzZXRBcmdJbmRleC5wdXNoKGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBVbmtub3duIGFyZ3VtZW50IHR5cGUgXCIgKyBwcm9jX2FyZ3NbaV0pXG4gICAgfVxuICB9XG4gIFxuICAvL01ha2Ugc3VyZSBhdCBsZWFzdCBvbmUgYXJyYXkgYXJndW1lbnQgd2FzIHNwZWNpZmllZFxuICBpZihwcm9jLmFycmF5QXJncy5sZW5ndGggPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBObyBhcnJheSBhcmd1bWVudHMgc3BlY2lmaWVkXCIpXG4gIH1cbiAgXG4gIC8vTWFrZSBzdXJlIGFyZ3VtZW50cyBhcmUgY29ycmVjdFxuICBpZihwcm9jLnByZS5hcmdzLmxlbmd0aCA+IHByb2NfYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogVG9vIG1hbnkgYXJndW1lbnRzIGluIHByZSgpIGJsb2NrXCIpXG4gIH1cbiAgaWYocHJvYy5ib2R5LmFyZ3MubGVuZ3RoID4gcHJvY19hcmdzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBUb28gbWFueSBhcmd1bWVudHMgaW4gYm9keSgpIGJsb2NrXCIpXG4gIH1cbiAgaWYocHJvYy5wb3N0LmFyZ3MubGVuZ3RoID4gcHJvY19hcmdzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBUb28gbWFueSBhcmd1bWVudHMgaW4gcG9zdCgpIGJsb2NrXCIpXG4gIH1cblxuICAvL0NoZWNrIGRlYnVnIGZsYWdcbiAgcHJvYy5kZWJ1ZyA9ICEhdXNlcl9hcmdzLnByaW50Q29kZSB8fCAhIXVzZXJfYXJncy5kZWJ1Z1xuICBcbiAgLy9SZXRyaWV2ZSBuYW1lXG4gIHByb2MuZnVuY05hbWUgPSB1c2VyX2FyZ3MuZnVuY05hbWUgfHwgXCJjd2lzZVwiXG4gIFxuICAvL1JlYWQgaW4gYmxvY2sgc2l6ZVxuICBwcm9jLmJsb2NrU2l6ZSA9IHVzZXJfYXJncy5ibG9ja1NpemUgfHwgNjRcblxuICByZXR1cm4gY3JlYXRlVGh1bmsocHJvYylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlQ3dpc2VcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2NvbXBpbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbi8vIFRoZSBmdW5jdGlvbiBiZWxvdyBpcyBjYWxsZWQgd2hlbiBjb25zdHJ1Y3RpbmcgYSBjd2lzZSBmdW5jdGlvbiBvYmplY3QsIGFuZCBkb2VzIHRoZSBmb2xsb3dpbmc6XG4vLyBBIGZ1bmN0aW9uIG9iamVjdCBpcyBjb25zdHJ1Y3RlZCB3aGljaCBhY2NlcHRzIGFzIGFyZ3VtZW50IGEgY29tcGlsYXRpb24gZnVuY3Rpb24gYW5kIHJldHVybnMgYW5vdGhlciBmdW5jdGlvbi5cbi8vIEl0IGlzIHRoaXMgb3RoZXIgZnVuY3Rpb24gdGhhdCBpcyBldmVudHVhbGx5IHJldHVybmVkIGJ5IGNyZWF0ZVRodW5rLCBhbmQgdGhpcyBmdW5jdGlvbiBpcyB0aGUgb25lIHRoYXQgYWN0dWFsbHlcbi8vIGNoZWNrcyB3aGV0aGVyIGEgY2VydGFpbiBwYXR0ZXJuIG9mIGFyZ3VtZW50cyBoYXMgYWxyZWFkeSBiZWVuIHVzZWQgYmVmb3JlIGFuZCBjb21waWxlcyBuZXcgbG9vcHMgYXMgbmVlZGVkLlxuLy8gVGhlIGNvbXBpbGF0aW9uIHBhc3NlZCB0byB0aGUgZmlyc3QgZnVuY3Rpb24gb2JqZWN0IGlzIHVzZWQgZm9yIGNvbXBpbGluZyBuZXcgZnVuY3Rpb25zLlxuLy8gT25jZSB0aGlzIGZ1bmN0aW9uIG9iamVjdCBpcyBjcmVhdGVkLCBpdCBpcyBjYWxsZWQgd2l0aCBjb21waWxlIGFzIGFyZ3VtZW50LCB3aGVyZSB0aGUgZmlyc3QgYXJndW1lbnQgb2YgY29tcGlsZVxuLy8gaXMgYm91bmQgdG8gXCJwcm9jXCIgKGVzc2VudGlhbGx5IGNvbnRhaW5pbmcgYSBwcmVwcm9jZXNzZWQgdmVyc2lvbiBvZiB0aGUgdXNlciBhcmd1bWVudHMgdG8gY3dpc2UpLlxuLy8gU28gY3JlYXRlVGh1bmsgcm91Z2hseSB3b3JrcyBsaWtlIHRoaXM6XG4vLyBmdW5jdGlvbiBjcmVhdGVUaHVuayhwcm9jKSB7XG4vLyAgIHZhciB0aHVuayA9IGZ1bmN0aW9uKGNvbXBpbGVCb3VuZCkge1xuLy8gICAgIHZhciBDQUNIRUQgPSB7fVxuLy8gICAgIHJldHVybiBmdW5jdGlvbihhcnJheXMgYW5kIHNjYWxhcnMpIHtcbi8vICAgICAgIGlmIChkdHlwZSBhbmQgb3JkZXIgb2YgYXJyYXlzIGluIENBQ0hFRCkge1xuLy8gICAgICAgICB2YXIgZnVuYyA9IENBQ0hFRFtkdHlwZSBhbmQgb3JkZXIgb2YgYXJyYXlzXVxuLy8gICAgICAgfSBlbHNlIHtcbi8vICAgICAgICAgdmFyIGZ1bmMgPSBDQUNIRURbZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5c10gPSBjb21waWxlQm91bmQoZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5cylcbi8vICAgICAgIH1cbi8vICAgICAgIHJldHVybiBmdW5jKGFycmF5cyBhbmQgc2NhbGFycylcbi8vICAgICB9XG4vLyAgIH1cbi8vICAgcmV0dXJuIHRodW5rKGNvbXBpbGUuYmluZDEocHJvYykpXG4vLyB9XG5cbnZhciBjb21waWxlID0gcmVxdWlyZShcIi4vY29tcGlsZS5qc1wiKVxuXG5mdW5jdGlvbiBjcmVhdGVUaHVuayhwcm9jKSB7XG4gIHZhciBjb2RlID0gW1wiJ3VzZSBzdHJpY3QnXCIsIFwidmFyIENBQ0hFRD17fVwiXVxuICB2YXIgdmFycyA9IFtdXG4gIHZhciB0aHVua05hbWUgPSBwcm9jLmZ1bmNOYW1lICsgXCJfY3dpc2VfdGh1bmtcIlxuICBcbiAgLy9CdWlsZCB0aHVua1xuICBjb2RlLnB1c2goW1wicmV0dXJuIGZ1bmN0aW9uIFwiLCB0aHVua05hbWUsIFwiKFwiLCBwcm9jLnNoaW1BcmdzLmpvaW4oXCIsXCIpLCBcIil7XCJdLmpvaW4oXCJcIikpXG4gIHZhciB0eXBlc2lnID0gW11cbiAgdmFyIHN0cmluZ190eXBlc2lnID0gW11cbiAgdmFyIHByb2NfYXJncyA9IFtbXCJhcnJheVwiLHByb2MuYXJyYXlBcmdzWzBdLFwiLnNoYXBlLnNsaWNlKFwiLCAvLyBTbGljZSBzaGFwZSBzbyB0aGF0IHdlIG9ubHkgcmV0YWluIHRoZSBzaGFwZSBvdmVyIHdoaWNoIHdlIGl0ZXJhdGUgKHdoaWNoIGdldHMgcGFzc2VkIHRvIHRoZSBjd2lzZSBvcGVyYXRvciBhcyBTUykuXG4gICAgICAgICAgICAgICAgICAgIE1hdGgubWF4KDAscHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkscHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXTwwPyhcIixcIitwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdK1wiKVwiKTpcIilcIl0uam9pbihcIlwiKV1cbiAgdmFyIHNoYXBlTGVuZ3RoQ29uZGl0aW9ucyA9IFtdLCBzaGFwZUNvbmRpdGlvbnMgPSBbXVxuICAvLyBQcm9jZXNzIGFycmF5IGFyZ3VtZW50c1xuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBqID0gcHJvYy5hcnJheUFyZ3NbaV1cbiAgICB2YXJzLnB1c2goW1widFwiLCBqLCBcIj1hcnJheVwiLCBqLCBcIi5kdHlwZSxcIixcbiAgICAgICAgICAgICAgIFwiclwiLCBqLCBcIj1hcnJheVwiLCBqLCBcIi5vcmRlclwiXS5qb2luKFwiXCIpKVxuICAgIHR5cGVzaWcucHVzaChcInRcIiArIGopXG4gICAgdHlwZXNpZy5wdXNoKFwiclwiICsgailcbiAgICBzdHJpbmdfdHlwZXNpZy5wdXNoKFwidFwiK2opXG4gICAgc3RyaW5nX3R5cGVzaWcucHVzaChcInJcIitqK1wiLmpvaW4oKVwiKVxuICAgIHByb2NfYXJncy5wdXNoKFwiYXJyYXlcIiArIGogKyBcIi5kYXRhXCIpXG4gICAgcHJvY19hcmdzLnB1c2goXCJhcnJheVwiICsgaiArIFwiLnN0cmlkZVwiKVxuICAgIHByb2NfYXJncy5wdXNoKFwiYXJyYXlcIiArIGogKyBcIi5vZmZzZXR8MFwiKVxuICAgIGlmIChpPjApIHsgLy8gR2F0aGVyIGNvbmRpdGlvbnMgdG8gY2hlY2sgZm9yIHNoYXBlIGVxdWFsaXR5IChpZ25vcmluZyBibG9jayBpbmRpY2VzKVxuICAgICAgc2hhcGVMZW5ndGhDb25kaXRpb25zLnB1c2goXCJhcnJheVwiICsgcHJvYy5hcnJheUFyZ3NbMF0gKyBcIi5zaGFwZS5sZW5ndGg9PT1hcnJheVwiICsgaiArIFwiLnNoYXBlLmxlbmd0aCtcIiArIChNYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKS1NYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKSkpXG4gICAgICBzaGFwZUNvbmRpdGlvbnMucHVzaChcImFycmF5XCIgKyBwcm9jLmFycmF5QXJnc1swXSArIFwiLnNoYXBlW3NoYXBlSW5kZXgrXCIgKyBNYXRoLm1heCgwLHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pICsgXCJdPT09YXJyYXlcIiArIGogKyBcIi5zaGFwZVtzaGFwZUluZGV4K1wiICsgTWF0aC5tYXgoMCxwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldKSArIFwiXVwiKVxuICAgIH1cbiAgfVxuICAvLyBDaGVjayBmb3Igc2hhcGUgZXF1YWxpdHlcbiAgaWYgKHByb2MuYXJyYXlBcmdzLmxlbmd0aCA+IDEpIHtcbiAgICBjb2RlLnB1c2goXCJpZiAoIShcIiArIHNoYXBlTGVuZ3RoQ29uZGl0aW9ucy5qb2luKFwiICYmIFwiKSArIFwiKSkgdGhyb3cgbmV3IEVycm9yKCdjd2lzZTogQXJyYXlzIGRvIG5vdCBhbGwgaGF2ZSB0aGUgc2FtZSBkaW1lbnNpb25hbGl0eSEnKVwiKVxuICAgIGNvZGUucHVzaChcImZvcih2YXIgc2hhcGVJbmRleD1hcnJheVwiICsgcHJvYy5hcnJheUFyZ3NbMF0gKyBcIi5zaGFwZS5sZW5ndGgtXCIgKyBNYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKSArIFwiOyBzaGFwZUluZGV4LS0+MDspIHtcIilcbiAgICBjb2RlLnB1c2goXCJpZiAoIShcIiArIHNoYXBlQ29uZGl0aW9ucy5qb2luKFwiICYmIFwiKSArIFwiKSkgdGhyb3cgbmV3IEVycm9yKCdjd2lzZTogQXJyYXlzIGRvIG5vdCBhbGwgaGF2ZSB0aGUgc2FtZSBzaGFwZSEnKVwiKVxuICAgIGNvZGUucHVzaChcIn1cIilcbiAgfVxuICAvLyBQcm9jZXNzIHNjYWxhciBhcmd1bWVudHNcbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5zY2FsYXJBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgcHJvY19hcmdzLnB1c2goXCJzY2FsYXJcIiArIHByb2Muc2NhbGFyQXJnc1tpXSlcbiAgfVxuICAvLyBDaGVjayBmb3IgY2FjaGVkIGZ1bmN0aW9uIChhbmQgaWYgbm90IHByZXNlbnQsIGdlbmVyYXRlIGl0KVxuICB2YXJzLnB1c2goW1widHlwZT1bXCIsIHN0cmluZ190eXBlc2lnLmpvaW4oXCIsXCIpLCBcIl0uam9pbigpXCJdLmpvaW4oXCJcIikpXG4gIHZhcnMucHVzaChcInByb2M9Q0FDSEVEW3R5cGVdXCIpXG4gIGNvZGUucHVzaChcInZhciBcIiArIHZhcnMuam9pbihcIixcIikpXG4gIFxuICBjb2RlLnB1c2goW1wiaWYoIXByb2Mpe1wiLFxuICAgICAgICAgICAgIFwiQ0FDSEVEW3R5cGVdPXByb2M9Y29tcGlsZShbXCIsIHR5cGVzaWcuam9pbihcIixcIiksIFwiXSl9XCIsXG4gICAgICAgICAgICAgXCJyZXR1cm4gcHJvYyhcIiwgcHJvY19hcmdzLmpvaW4oXCIsXCIpLCBcIil9XCJdLmpvaW4oXCJcIikpXG5cbiAgaWYocHJvYy5kZWJ1Zykge1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLS1HZW5lcmF0ZWQgdGh1bms6XFxuXCIgKyBjb2RlLmpvaW4oXCJcXG5cIikgKyBcIlxcbi0tLS0tLS0tLS1cIilcbiAgfVxuICBcbiAgLy9Db21waWxlIHRodW5rXG4gIHZhciB0aHVuayA9IG5ldyBGdW5jdGlvbihcImNvbXBpbGVcIiwgY29kZS5qb2luKFwiXFxuXCIpKVxuICByZXR1cm4gdGh1bmsoY29tcGlsZS5iaW5kKHVuZGVmaW5lZCwgcHJvYykpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVGh1bmtcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2xpYi90aHVuay5qc1xuLy8gbW9kdWxlIGlkID0gNTFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgdW5pcSA9IHJlcXVpcmUoXCJ1bmlxXCIpXG5cbi8vIFRoaXMgZnVuY3Rpb24gZ2VuZXJhdGVzIHZlcnkgc2ltcGxlIGxvb3BzIGFuYWxvZ291cyB0byBob3cgeW91IHR5cGljYWxseSB0cmF2ZXJzZSBhcnJheXMgKHRoZSBvdXRlcm1vc3QgbG9vcCBjb3JyZXNwb25kcyB0byB0aGUgc2xvd2VzdCBjaGFuZ2luZyBpbmRleCwgdGhlIGlubmVybW9zdCBsb29wIHRvIHRoZSBmYXN0ZXN0IGNoYW5naW5nIGluZGV4KVxuLy8gVE9ETzogSWYgdHdvIGFycmF5cyBoYXZlIHRoZSBzYW1lIHN0cmlkZXMgKGFuZCBvZmZzZXRzKSB0aGVyZSBpcyBwb3RlbnRpYWwgZm9yIGRlY3JlYXNpbmcgdGhlIG51bWJlciBvZiBcInBvaW50ZXJzXCIgYW5kIHJlbGF0ZWQgdmFyaWFibGVzLiBUaGUgZHJhd2JhY2sgaXMgdGhhdCB0aGUgdHlwZSBzaWduYXR1cmUgd291bGQgYmVjb21lIG1vcmUgc3BlY2lmaWMgYW5kIHRoYXQgdGhlcmUgd291bGQgdGh1cyBiZSBsZXNzIHBvdGVudGlhbCBmb3IgY2FjaGluZywgYnV0IGl0IG1pZ2h0IHN0aWxsIGJlIHdvcnRoIGl0LCBlc3BlY2lhbGx5IHdoZW4gZGVhbGluZyB3aXRoIGxhcmdlIG51bWJlcnMgb2YgYXJndW1lbnRzLlxuZnVuY3Rpb24gaW5uZXJGaWxsKG9yZGVyLCBwcm9jLCBib2R5KSB7XG4gIHZhciBkaW1lbnNpb24gPSBvcmRlci5sZW5ndGhcbiAgICAsIG5hcmdzID0gcHJvYy5hcnJheUFyZ3MubGVuZ3RoXG4gICAgLCBoYXNfaW5kZXggPSBwcm9jLmluZGV4QXJncy5sZW5ndGg+MFxuICAgICwgY29kZSA9IFtdXG4gICAgLCB2YXJzID0gW11cbiAgICAsIGlkeD0wLCBwaWR4PTAsIGksIGpcbiAgZm9yKGk9MDsgaTxkaW1lbnNpb247ICsraSkgeyAvLyBJdGVyYXRpb24gdmFyaWFibGVzXG4gICAgdmFycy5wdXNoKFtcImlcIixpLFwiPTBcIl0uam9pbihcIlwiKSlcbiAgfVxuICAvL0NvbXB1dGUgc2NhbiBkZWx0YXNcbiAgZm9yKGo9MDsgajxuYXJnczsgKytqKSB7XG4gICAgZm9yKGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgcGlkeCA9IGlkeFxuICAgICAgaWR4ID0gb3JkZXJbaV1cbiAgICAgIGlmKGkgPT09IDApIHsgLy8gVGhlIGlubmVybW9zdC9mYXN0ZXN0IGRpbWVuc2lvbidzIGRlbHRhIGlzIHNpbXBseSBpdHMgc3RyaWRlXG4gICAgICAgIHZhcnMucHVzaChbXCJkXCIsaixcInNcIixpLFwiPXRcIixqLFwicFwiLGlkeF0uam9pbihcIlwiKSlcbiAgICAgIH0gZWxzZSB7IC8vIEZvciBvdGhlciBkaW1lbnNpb25zIHRoZSBkZWx0YSBpcyBiYXNpY2FsbHkgdGhlIHN0cmlkZSBtaW51cyBzb21ldGhpbmcgd2hpY2ggZXNzZW50aWFsbHkgXCJyZXdpbmRzXCIgdGhlIHByZXZpb3VzIChtb3JlIGlubmVyKSBkaW1lbnNpb25cbiAgICAgICAgdmFycy5wdXNoKFtcImRcIixqLFwic1wiLGksXCI9KHRcIixqLFwicFwiLGlkeCxcIi1zXCIscGlkeCxcIip0XCIsaixcInBcIixwaWR4LFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAodmFycy5sZW5ndGggPiAwKSB7XG4gICAgY29kZS5wdXNoKFwidmFyIFwiICsgdmFycy5qb2luKFwiLFwiKSlcbiAgfSAgXG4gIC8vU2NhbiBsb29wXG4gIGZvcihpPWRpbWVuc2lvbi0xOyBpPj0wOyAtLWkpIHsgLy8gU3RhcnQgYXQgbGFyZ2VzdCBzdHJpZGUgYW5kIHdvcmsgeW91ciB3YXkgaW53YXJkc1xuICAgIGlkeCA9IG9yZGVyW2ldXG4gICAgY29kZS5wdXNoKFtcImZvcihpXCIsaSxcIj0wO2lcIixpLFwiPHNcIixpZHgsXCI7KytpXCIsaSxcIil7XCJdLmpvaW4oXCJcIikpXG4gIH1cbiAgLy9QdXNoIGJvZHkgb2YgaW5uZXIgbG9vcFxuICBjb2RlLnB1c2goYm9keSlcbiAgLy9BZHZhbmNlIHNjYW4gcG9pbnRlcnNcbiAgZm9yKGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIHBpZHggPSBpZHhcbiAgICBpZHggPSBvcmRlcltpXVxuICAgIGZvcihqPTA7IGo8bmFyZ3M7ICsraikge1xuICAgICAgY29kZS5wdXNoKFtcInBcIixqLFwiKz1kXCIsaixcInNcIixpXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgICBpZihoYXNfaW5kZXgpIHtcbiAgICAgIGlmKGkgPiAwKSB7XG4gICAgICAgIGNvZGUucHVzaChbXCJpbmRleFtcIixwaWR4LFwiXS09c1wiLHBpZHhdLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgICBjb2RlLnB1c2goW1wiKytpbmRleFtcIixpZHgsXCJdXCJdLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIGNvZGUucHVzaChcIn1cIilcbiAgfVxuICByZXR1cm4gY29kZS5qb2luKFwiXFxuXCIpXG59XG5cbi8vIEdlbmVyYXRlIFwib3V0ZXJcIiBsb29wcyB0aGF0IGxvb3Agb3ZlciBibG9ja3Mgb2YgZGF0YSwgYXBwbHlpbmcgXCJpbm5lclwiIGxvb3BzIHRvIHRoZSBibG9ja3MgYnkgbWFuaXB1bGF0aW5nIHRoZSBsb2NhbCB2YXJpYWJsZXMgaW4gc3VjaCBhIHdheSB0aGF0IHRoZSBpbm5lciBsb29wIG9ubHkgXCJzZWVzXCIgdGhlIGN1cnJlbnQgYmxvY2suXG4vLyBUT0RPOiBJZiB0aGlzIGlzIHVzZWQsIHRoZW4gdGhlIHByZXZpb3VzIGRlY2xhcmF0aW9uIChkb25lIGJ5IGdlbmVyYXRlQ3dpc2VPcCkgb2YgcyogaXMgZXNzZW50aWFsbHkgdW5uZWNlc3NhcnkuXG4vLyAgICAgICBJIGJlbGlldmUgdGhlIHMqIGFyZSBub3QgdXNlZCBlbHNld2hlcmUgKGluIHBhcnRpY3VsYXIsIEkgZG9uJ3QgdGhpbmsgdGhleSdyZSB1c2VkIGluIHRoZSBwcmUvcG9zdCBwYXJ0cyBhbmQgXCJzaGFwZVwiIGlzIGRlZmluZWQgaW5kZXBlbmRlbnRseSksIHNvIGl0IHdvdWxkIGJlIHBvc3NpYmxlIHRvIG1ha2UgZGVmaW5pbmcgdGhlIHMqIGRlcGVuZGVudCBvbiB3aGF0IGxvb3AgbWV0aG9kIGlzIGJlaW5nIHVzZWQuXG5mdW5jdGlvbiBvdXRlckZpbGwobWF0Y2hlZCwgb3JkZXIsIHByb2MsIGJvZHkpIHtcbiAgdmFyIGRpbWVuc2lvbiA9IG9yZGVyLmxlbmd0aFxuICAgICwgbmFyZ3MgPSBwcm9jLmFycmF5QXJncy5sZW5ndGhcbiAgICAsIGJsb2NrU2l6ZSA9IHByb2MuYmxvY2tTaXplXG4gICAgLCBoYXNfaW5kZXggPSBwcm9jLmluZGV4QXJncy5sZW5ndGggPiAwXG4gICAgLCBjb2RlID0gW11cbiAgZm9yKHZhciBpPTA7IGk8bmFyZ3M7ICsraSkge1xuICAgIGNvZGUucHVzaChbXCJ2YXIgb2Zmc2V0XCIsaSxcIj1wXCIsaV0uam9pbihcIlwiKSlcbiAgfVxuICAvL0dlbmVyYXRlIGxvb3BzIGZvciB1bm1hdGNoZWQgZGltZW5zaW9uc1xuICAvLyBUaGUgb3JkZXIgaW4gd2hpY2ggdGhlc2UgZGltZW5zaW9ucyBhcmUgdHJhdmVyc2VkIGlzIGZhaXJseSBhcmJpdHJhcnkgKGZyb20gc21hbGwgc3RyaWRlIHRvIGxhcmdlIHN0cmlkZSwgZm9yIHRoZSBmaXJzdCBhcmd1bWVudClcbiAgLy8gVE9ETzogSXQgd291bGQgYmUgbmljZSBpZiB0aGUgb3JkZXIgaW4gd2hpY2ggdGhlc2UgbG9vcHMgYXJlIHBsYWNlZCB3b3VsZCBhbHNvIGJlIHNvbWVob3cgXCJvcHRpbWFsXCIgKGF0IHRoZSB2ZXJ5IGxlYXN0IHdlIHNob3VsZCBjaGVjayB0aGF0IGl0IHJlYWxseSBkb2Vzbid0IGh1cnQgdXMgaWYgdGhleSdyZSBub3QpLlxuICBmb3IodmFyIGk9bWF0Y2hlZDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChbXCJmb3IodmFyIGpcIitpK1wiPVNTW1wiLCBvcmRlcltpXSwgXCJdfDA7alwiLCBpLCBcIj4wOyl7XCJdLmpvaW4oXCJcIikpIC8vIEl0ZXJhdGUgYmFjayB0byBmcm9udFxuICAgIGNvZGUucHVzaChbXCJpZihqXCIsaSxcIjxcIixibG9ja1NpemUsXCIpe1wiXS5qb2luKFwiXCIpKSAvLyBFaXRoZXIgZGVjcmVhc2UgaiBieSBibG9ja1NpemUgKHMgPSBibG9ja1NpemUpLCBvciBzZXQgaXQgdG8gemVybyAoYWZ0ZXIgc2V0dGluZyBzID0gaikuXG4gICAgY29kZS5wdXNoKFtcInNcIixvcmRlcltpXSxcIj1qXCIsaV0uam9pbihcIlwiKSlcbiAgICBjb2RlLnB1c2goW1wialwiLGksXCI9MFwiXS5qb2luKFwiXCIpKVxuICAgIGNvZGUucHVzaChbXCJ9ZWxzZXtzXCIsb3JkZXJbaV0sXCI9XCIsYmxvY2tTaXplXS5qb2luKFwiXCIpKVxuICAgIGNvZGUucHVzaChbXCJqXCIsaSxcIi09XCIsYmxvY2tTaXplLFwifVwiXS5qb2luKFwiXCIpKVxuICAgIGlmKGhhc19pbmRleCkge1xuICAgICAgY29kZS5wdXNoKFtcImluZGV4W1wiLG9yZGVyW2ldLFwiXT1qXCIsaV0uam9pbihcIlwiKSlcbiAgICB9XG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8bmFyZ3M7ICsraSkge1xuICAgIHZhciBpbmRleFN0ciA9IFtcIm9mZnNldFwiK2ldXG4gICAgZm9yKHZhciBqPW1hdGNoZWQ7IGo8ZGltZW5zaW9uOyArK2opIHtcbiAgICAgIGluZGV4U3RyLnB1c2goW1wialwiLGosXCIqdFwiLGksXCJwXCIsb3JkZXJbal1dLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIGNvZGUucHVzaChbXCJwXCIsaSxcIj0oXCIsaW5kZXhTdHIuam9pbihcIitcIiksXCIpXCJdLmpvaW4oXCJcIikpXG4gIH1cbiAgY29kZS5wdXNoKGlubmVyRmlsbChvcmRlciwgcHJvYywgYm9keSkpXG4gIGZvcih2YXIgaT1tYXRjaGVkOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFwifVwiKVxuICB9XG4gIHJldHVybiBjb2RlLmpvaW4oXCJcXG5cIilcbn1cblxuLy9Db3VudCB0aGUgbnVtYmVyIG9mIGNvbXBhdGlibGUgaW5uZXIgb3JkZXJzXG4vLyBUaGlzIGlzIHRoZSBsZW5ndGggb2YgdGhlIGxvbmdlc3QgY29tbW9uIHByZWZpeCBvZiB0aGUgYXJyYXlzIGluIG9yZGVycy5cbi8vIEVhY2ggYXJyYXkgaW4gb3JkZXJzIGxpc3RzIHRoZSBkaW1lbnNpb25zIG9mIHRoZSBjb3JyZXNwb25kIG5kYXJyYXkgaW4gb3JkZXIgb2YgaW5jcmVhc2luZyBzdHJpZGUuXG4vLyBUaGlzIGlzIHRodXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRpbWVuc2lvbnMgdGhhdCBjYW4gYmUgZWZmaWNpZW50bHkgdHJhdmVyc2VkIGJ5IHNpbXBsZSBuZXN0ZWQgbG9vcHMgZm9yIGFsbCBhcnJheXMuXG5mdW5jdGlvbiBjb3VudE1hdGNoZXMob3JkZXJzKSB7XG4gIHZhciBtYXRjaGVkID0gMCwgZGltZW5zaW9uID0gb3JkZXJzWzBdLmxlbmd0aFxuICB3aGlsZShtYXRjaGVkIDwgZGltZW5zaW9uKSB7XG4gICAgZm9yKHZhciBqPTE7IGo8b3JkZXJzLmxlbmd0aDsgKytqKSB7XG4gICAgICBpZihvcmRlcnNbal1bbWF0Y2hlZF0gIT09IG9yZGVyc1swXVttYXRjaGVkXSkge1xuICAgICAgICByZXR1cm4gbWF0Y2hlZFxuICAgICAgfVxuICAgIH1cbiAgICArK21hdGNoZWRcbiAgfVxuICByZXR1cm4gbWF0Y2hlZFxufVxuXG4vL1Byb2Nlc3NlcyBhIGJsb2NrIGFjY29yZGluZyB0byB0aGUgZ2l2ZW4gZGF0YSB0eXBlc1xuLy8gUmVwbGFjZXMgdmFyaWFibGUgbmFtZXMgYnkgZGlmZmVyZW50IG9uZXMsIGVpdGhlciBcImxvY2FsXCIgb25lcyAodGhhdCBhcmUgdGhlbiBmZXJyaWVkIGluIGFuZCBvdXQgb2YgdGhlIGdpdmVuIGFycmF5KSBvciBvbmVzIG1hdGNoaW5nIHRoZSBhcmd1bWVudHMgdGhhdCB0aGUgZnVuY3Rpb24gcGVyZm9ybWluZyB0aGUgdWx0aW1hdGUgbG9vcCB3aWxsIGFjY2VwdC5cbmZ1bmN0aW9uIHByb2Nlc3NCbG9jayhibG9jaywgcHJvYywgZHR5cGVzKSB7XG4gIHZhciBjb2RlID0gYmxvY2suYm9keVxuICB2YXIgcHJlID0gW11cbiAgdmFyIHBvc3QgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxibG9jay5hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGNhcmcgPSBibG9jay5hcmdzW2ldXG4gICAgaWYoY2FyZy5jb3VudCA8PSAwKSB7XG4gICAgICBjb250aW51ZVxuICAgIH1cbiAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKGNhcmcubmFtZSwgXCJnXCIpXG4gICAgdmFyIHB0clN0ciA9IFwiXCJcbiAgICB2YXIgYXJyTnVtID0gcHJvYy5hcnJheUFyZ3MuaW5kZXhPZihpKVxuICAgIHN3aXRjaChwcm9jLmFyZ1R5cGVzW2ldKSB7XG4gICAgICBjYXNlIFwib2Zmc2V0XCI6XG4gICAgICAgIHZhciBvZmZBcmdJbmRleCA9IHByb2Mub2Zmc2V0QXJnSW5kZXguaW5kZXhPZihpKVxuICAgICAgICB2YXIgb2ZmQXJnID0gcHJvYy5vZmZzZXRBcmdzW29mZkFyZ0luZGV4XVxuICAgICAgICBhcnJOdW0gPSBvZmZBcmcuYXJyYXlcbiAgICAgICAgcHRyU3RyID0gXCIrcVwiICsgb2ZmQXJnSW5kZXggLy8gQWRkcyBvZmZzZXQgdG8gdGhlIFwicG9pbnRlclwiIGluIHRoZSBhcnJheVxuICAgICAgY2FzZSBcImFycmF5XCI6XG4gICAgICAgIHB0clN0ciA9IFwicFwiICsgYXJyTnVtICsgcHRyU3RyXG4gICAgICAgIHZhciBsb2NhbFN0ciA9IFwibFwiICsgaVxuICAgICAgICB2YXIgYXJyU3RyID0gXCJhXCIgKyBhcnJOdW1cbiAgICAgICAgaWYgKHByb2MuYXJyYXlCbG9ja0luZGljZXNbYXJyTnVtXSA9PT0gMCkgeyAvLyBBcmd1bWVudCB0byBib2R5IGlzIGp1c3QgYSBzaW5nbGUgdmFsdWUgZnJvbSB0aGlzIGFycmF5XG4gICAgICAgICAgaWYoY2FyZy5jb3VudCA9PT0gMSkgeyAvLyBBcmd1bWVudC9hcnJheSB1c2VkIG9ubHkgb25jZSg/KVxuICAgICAgICAgICAgaWYoZHR5cGVzW2Fyck51bV0gPT09IFwiZ2VuZXJpY1wiKSB7XG4gICAgICAgICAgICAgIGlmKGNhcmcubHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcHJlLnB1c2goW1widmFyIFwiLCBsb2NhbFN0ciwgXCI9XCIsIGFyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKSAvLyBJcyB0aGlzIG5lY2Vzc2FyeSBpZiB0aGUgYXJndW1lbnQgaXMgT05MWSB1c2VkIGFzIGFuIGx2YWx1ZT8gKGtlZXAgaW4gbWluZCB0aGF0IHdlIGNhbiBoYXZlIGEgKz0gc29tZXRoaW5nLCBzbyB3ZSB3b3VsZCBhY3R1YWxseSBuZWVkIHRvIGNoZWNrIGNhcmcucnZhbHVlKVxuICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgICAgIHBvc3QucHVzaChbYXJyU3RyLCBcIi5zZXQoXCIsIHB0clN0ciwgXCIsXCIsIGxvY2FsU3RyLFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgW2FyclN0ciwgXCJbXCIsIHB0clN0ciwgXCJdXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmKGR0eXBlc1thcnJOdW1dID09PSBcImdlbmVyaWNcIikge1xuICAgICAgICAgICAgcHJlLnB1c2goW1widmFyIFwiLCBsb2NhbFN0ciwgXCI9XCIsIGFyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKSAvLyBUT0RPOiBDb3VsZCB3ZSBvcHRpbWl6ZSBieSBjaGVja2luZyBmb3IgY2FyZy5ydmFsdWU/XG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBsb2NhbFN0cilcbiAgICAgICAgICAgIGlmKGNhcmcubHZhbHVlKSB7XG4gICAgICAgICAgICAgIHBvc3QucHVzaChbYXJyU3RyLCBcIi5zZXQoXCIsIHB0clN0ciwgXCIsXCIsIGxvY2FsU3RyLFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl1cIl0uam9pbihcIlwiKSkgLy8gVE9ETzogQ291bGQgd2Ugb3B0aW1pemUgYnkgY2hlY2tpbmcgZm9yIGNhcmcucnZhbHVlP1xuICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgbG9jYWxTdHIpXG4gICAgICAgICAgICBpZihjYXJnLmx2YWx1ZSkge1xuICAgICAgICAgICAgICBwb3N0LnB1c2goW2FyclN0ciwgXCJbXCIsIHB0clN0ciwgXCJdPVwiLCBsb2NhbFN0cl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7IC8vIEFyZ3VtZW50IHRvIGJvZHkgaXMgYSBcImJsb2NrXCJcbiAgICAgICAgICB2YXIgcmVTdHJBcnIgPSBbY2FyZy5uYW1lXSwgcHRyU3RyQXJyID0gW3B0clN0cl1cbiAgICAgICAgICBmb3IodmFyIGo9MDsgajxNYXRoLmFicyhwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2Fyck51bV0pOyBqKyspIHtcbiAgICAgICAgICAgIHJlU3RyQXJyLnB1c2goXCJcXFxccypcXFxcWyhbXlxcXFxdXSspXFxcXF1cIilcbiAgICAgICAgICAgIHB0clN0ckFyci5wdXNoKFwiJFwiICsgKGorMSkgKyBcIip0XCIgKyBhcnJOdW0gKyBcImJcIiArIGopIC8vIE1hdGNoZWQgaW5kZXggdGltZXMgc3RyaWRlXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlID0gbmV3IFJlZ0V4cChyZVN0ckFyci5qb2luKFwiXCIpLCBcImdcIilcbiAgICAgICAgICBwdHJTdHIgPSBwdHJTdHJBcnIuam9pbihcIitcIilcbiAgICAgICAgICBpZihkdHlwZXNbYXJyTnVtXSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgICAgICAgIC8qaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgcHJlLnB1c2goW1widmFyIFwiLCBsb2NhbFN0ciwgXCI9XCIsIGFyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKSAvLyBJcyB0aGlzIG5lY2Vzc2FyeSBpZiB0aGUgYXJndW1lbnQgaXMgT05MWSB1c2VkIGFzIGFuIGx2YWx1ZT8gKGtlZXAgaW4gbWluZCB0aGF0IHdlIGNhbiBoYXZlIGEgKz0gc29tZXRoaW5nLCBzbyB3ZSB3b3VsZCBhY3R1YWxseSBuZWVkIHRvIGNoZWNrIGNhcmcucnZhbHVlKVxuICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBsb2NhbFN0cilcbiAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiLnNldChcIiwgcHRyU3RyLCBcIixcIiwgbG9jYWxTdHIsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBbYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBHZW5lcmljIGFycmF5cyBub3Qgc3VwcG9ydGVkIGluIGNvbWJpbmF0aW9uIHdpdGggYmxvY2tzIVwiKVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBUaGlzIGRvZXMgbm90IHByb2R1Y2UgYW55IGxvY2FsIHZhcmlhYmxlcywgZXZlbiBpZiB2YXJpYWJsZXMgYXJlIHVzZWQgbXVsdGlwbGUgdGltZXMuIEl0IHdvdWxkIGJlIHBvc3NpYmxlIHRvIGRvIHNvLCBidXQgaXQgd291bGQgY29tcGxpY2F0ZSB0aGluZ3MgcXVpdGUgYSBiaXQuXG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBbYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl1cIl0uam9pbihcIlwiKSlcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwic2NhbGFyXCI6XG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFwiWVwiICsgcHJvYy5zY2FsYXJBcmdzLmluZGV4T2YoaSkpXG4gICAgICBicmVha1xuICAgICAgY2FzZSBcImluZGV4XCI6XG4gICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFwiaW5kZXhcIilcbiAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwic2hhcGVcIjpcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgXCJzaGFwZVwiKVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFtwcmUuam9pbihcIlxcblwiKSwgY29kZSwgcG9zdC5qb2luKFwiXFxuXCIpXS5qb2luKFwiXFxuXCIpLnRyaW0oKVxufVxuXG5mdW5jdGlvbiB0eXBlU3VtbWFyeShkdHlwZXMpIHtcbiAgdmFyIHN1bW1hcnkgPSBuZXcgQXJyYXkoZHR5cGVzLmxlbmd0aClcbiAgdmFyIGFsbEVxdWFsID0gdHJ1ZVxuICBmb3IodmFyIGk9MDsgaTxkdHlwZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgdCA9IGR0eXBlc1tpXVxuICAgIHZhciBkaWdpdHMgPSB0Lm1hdGNoKC9cXGQrLylcbiAgICBpZighZGlnaXRzKSB7XG4gICAgICBkaWdpdHMgPSBcIlwiXG4gICAgfSBlbHNlIHtcbiAgICAgIGRpZ2l0cyA9IGRpZ2l0c1swXVxuICAgIH1cbiAgICBpZih0LmNoYXJBdCgwKSA9PT0gMCkge1xuICAgICAgc3VtbWFyeVtpXSA9IFwidVwiICsgdC5jaGFyQXQoMSkgKyBkaWdpdHNcbiAgICB9IGVsc2Uge1xuICAgICAgc3VtbWFyeVtpXSA9IHQuY2hhckF0KDApICsgZGlnaXRzXG4gICAgfVxuICAgIGlmKGkgPiAwKSB7XG4gICAgICBhbGxFcXVhbCA9IGFsbEVxdWFsICYmIHN1bW1hcnlbaV0gPT09IHN1bW1hcnlbaS0xXVxuICAgIH1cbiAgfVxuICBpZihhbGxFcXVhbCkge1xuICAgIHJldHVybiBzdW1tYXJ5WzBdXG4gIH1cbiAgcmV0dXJuIHN1bW1hcnkuam9pbihcIlwiKVxufVxuXG4vL0dlbmVyYXRlcyBhIGN3aXNlIG9wZXJhdG9yXG5mdW5jdGlvbiBnZW5lcmF0ZUNXaXNlT3AocHJvYywgdHlwZXNpZykge1xuXG4gIC8vQ29tcHV0ZSBkaW1lbnNpb25cbiAgLy8gQXJyYXlzIGdldCBwdXQgZmlyc3QgaW4gdHlwZXNpZywgYW5kIHRoZXJlIGFyZSB0d28gZW50cmllcyBwZXIgYXJyYXkgKGR0eXBlIGFuZCBvcmRlciksIHNvIHRoaXMgZ2V0cyB0aGUgbnVtYmVyIG9mIGRpbWVuc2lvbnMgaW4gdGhlIGZpcnN0IGFycmF5IGFyZy5cbiAgdmFyIGRpbWVuc2lvbiA9ICh0eXBlc2lnWzFdLmxlbmd0aCAtIE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pKXwwXG4gIHZhciBvcmRlcnMgPSBuZXcgQXJyYXkocHJvYy5hcnJheUFyZ3MubGVuZ3RoKVxuICB2YXIgZHR5cGVzID0gbmV3IEFycmF5KHByb2MuYXJyYXlBcmdzLmxlbmd0aClcbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBkdHlwZXNbaV0gPSB0eXBlc2lnWzIqaV1cbiAgICBvcmRlcnNbaV0gPSB0eXBlc2lnWzIqaSsxXVxuICB9XG4gIFxuICAvL0RldGVybWluZSB3aGVyZSBibG9jayBhbmQgbG9vcCBpbmRpY2VzIHN0YXJ0IGFuZCBlbmRcbiAgdmFyIGJsb2NrQmVnaW4gPSBbXSwgYmxvY2tFbmQgPSBbXSAvLyBUaGVzZSBpbmRpY2VzIGFyZSBleHBvc2VkIGFzIGJsb2Nrc1xuICB2YXIgbG9vcEJlZ2luID0gW10sIGxvb3BFbmQgPSBbXSAvLyBUaGVzZSBpbmRpY2VzIGFyZSBpdGVyYXRlZCBvdmVyXG4gIHZhciBsb29wT3JkZXJzID0gW10gLy8gb3JkZXJzIHJlc3RyaWN0ZWQgdG8gdGhlIGxvb3AgaW5kaWNlc1xuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIGlmIChwcm9jLmFycmF5QmxvY2tJbmRpY2VzW2ldPDApIHtcbiAgICAgIGxvb3BCZWdpbi5wdXNoKDApXG4gICAgICBsb29wRW5kLnB1c2goZGltZW5zaW9uKVxuICAgICAgYmxvY2tCZWdpbi5wdXNoKGRpbWVuc2lvbilcbiAgICAgIGJsb2NrRW5kLnB1c2goZGltZW5zaW9uK3Byb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGxvb3BCZWdpbi5wdXNoKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pIC8vIE5vbi1uZWdhdGl2ZVxuICAgICAgbG9vcEVuZC5wdXNoKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0rZGltZW5zaW9uKVxuICAgICAgYmxvY2tCZWdpbi5wdXNoKDApXG4gICAgICBibG9ja0VuZC5wdXNoKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pXG4gICAgfVxuICAgIHZhciBuZXdPcmRlciA9IFtdXG4gICAgZm9yKHZhciBqPTA7IGo8b3JkZXJzW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICBpZiAobG9vcEJlZ2luW2ldPD1vcmRlcnNbaV1bal0gJiYgb3JkZXJzW2ldW2pdPGxvb3BFbmRbaV0pIHtcbiAgICAgICAgbmV3T3JkZXIucHVzaChvcmRlcnNbaV1bal0tbG9vcEJlZ2luW2ldKSAvLyBJZiB0aGlzIGlzIGEgbG9vcCBpbmRleCwgcHV0IGl0IGluIG5ld09yZGVyLCBzdWJ0cmFjdGluZyBsb29wQmVnaW4sIHRvIG1ha2Ugc3VyZSB0aGF0IGFsbCBsb29wT3JkZXJzIGFyZSB1c2luZyBhIGNvbW1vbiBzZXQgb2YgaW5kaWNlcy5cbiAgICAgIH1cbiAgICB9XG4gICAgbG9vcE9yZGVycy5wdXNoKG5ld09yZGVyKVxuICB9XG5cbiAgLy9GaXJzdCBjcmVhdGUgYXJndW1lbnRzIGZvciBwcm9jZWR1cmVcbiAgdmFyIGFyZ2xpc3QgPSBbXCJTU1wiXSAvLyBTUyBpcyB0aGUgb3ZlcmFsbCBzaGFwZSBvdmVyIHdoaWNoIHdlIGl0ZXJhdGVcbiAgdmFyIGNvZGUgPSBbXCIndXNlIHN0cmljdCdcIl1cbiAgdmFyIHZhcnMgPSBbXVxuICBcbiAgZm9yKHZhciBqPTA7IGo8ZGltZW5zaW9uOyArK2opIHtcbiAgICB2YXJzLnB1c2goW1wic1wiLCBqLCBcIj1TU1tcIiwgaiwgXCJdXCJdLmpvaW4oXCJcIikpIC8vIFRoZSBsaW1pdHMgZm9yIGVhY2ggZGltZW5zaW9uLlxuICB9XG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgYXJnbGlzdC5wdXNoKFwiYVwiK2kpIC8vIEFjdHVhbCBkYXRhIGFycmF5XG4gICAgYXJnbGlzdC5wdXNoKFwidFwiK2kpIC8vIFN0cmlkZXNcbiAgICBhcmdsaXN0LnB1c2goXCJwXCIraSkgLy8gT2Zmc2V0IGluIHRoZSBhcnJheSBhdCB3aGljaCB0aGUgZGF0YSBzdGFydHMgKGFsc28gdXNlZCBmb3IgaXRlcmF0aW5nIG92ZXIgdGhlIGRhdGEpXG4gICAgXG4gICAgZm9yKHZhciBqPTA7IGo8ZGltZW5zaW9uOyArK2opIHsgLy8gVW5wYWNrIHRoZSBzdHJpZGVzIGludG8gdmFycyBmb3IgbG9vcGluZ1xuICAgICAgdmFycy5wdXNoKFtcInRcIixpLFwicFwiLGosXCI9dFwiLGksXCJbXCIsbG9vcEJlZ2luW2ldK2osXCJdXCJdLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIFxuICAgIGZvcih2YXIgaj0wOyBqPE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV0pOyArK2opIHsgLy8gVW5wYWNrIHRoZSBzdHJpZGVzIGludG8gdmFycyBmb3IgYmxvY2sgaXRlcmF0aW9uXG4gICAgICB2YXJzLnB1c2goW1widFwiLGksXCJiXCIsaixcIj10XCIsaSxcIltcIixibG9ja0JlZ2luW2ldK2osXCJdXCJdLmpvaW4oXCJcIikpXG4gICAgfVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPHByb2Muc2NhbGFyQXJncy5sZW5ndGg7ICsraSkge1xuICAgIGFyZ2xpc3QucHVzaChcIllcIiArIGkpXG4gIH1cbiAgaWYocHJvYy5zaGFwZUFyZ3MubGVuZ3RoID4gMCkge1xuICAgIHZhcnMucHVzaChcInNoYXBlPVNTLnNsaWNlKDApXCIpIC8vIE1ha2VzIHRoZSBzaGFwZSBvdmVyIHdoaWNoIHdlIGl0ZXJhdGUgYXZhaWxhYmxlIHRvIHRoZSB1c2VyIGRlZmluZWQgZnVuY3Rpb25zIChzbyB5b3UgY2FuIHVzZSB3aWR0aC9oZWlnaHQgZm9yIGV4YW1wbGUpXG4gIH1cbiAgaWYocHJvYy5pbmRleEFyZ3MubGVuZ3RoID4gMCkge1xuICAgIC8vIFByZXBhcmUgYW4gYXJyYXkgdG8ga2VlcCB0cmFjayBvZiB0aGUgKGxvZ2ljYWwpIGluZGljZXMsIGluaXRpYWxpemVkIHRvIGRpbWVuc2lvbiB6ZXJvZXMuXG4gICAgdmFyIHplcm9zID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgICAgemVyb3NbaV0gPSBcIjBcIlxuICAgIH1cbiAgICB2YXJzLnB1c2goW1wiaW5kZXg9W1wiLCB6ZXJvcy5qb2luKFwiLFwiKSwgXCJdXCJdLmpvaW4oXCJcIikpXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5vZmZzZXRBcmdzLmxlbmd0aDsgKytpKSB7IC8vIE9mZnNldCBhcmd1bWVudHMgdXNlZCBmb3Igc3RlbmNpbCBvcGVyYXRpb25zXG4gICAgdmFyIG9mZl9hcmcgPSBwcm9jLm9mZnNldEFyZ3NbaV1cbiAgICB2YXIgaW5pdF9zdHJpbmcgPSBbXVxuICAgIGZvcih2YXIgaj0wOyBqPG9mZl9hcmcub2Zmc2V0Lmxlbmd0aDsgKytqKSB7XG4gICAgICBpZihvZmZfYXJnLm9mZnNldFtqXSA9PT0gMCkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfSBlbHNlIGlmKG9mZl9hcmcub2Zmc2V0W2pdID09PSAxKSB7XG4gICAgICAgIGluaXRfc3RyaW5nLnB1c2goW1widFwiLCBvZmZfYXJnLmFycmF5LCBcInBcIiwgal0uam9pbihcIlwiKSkgICAgICBcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluaXRfc3RyaW5nLnB1c2goW29mZl9hcmcub2Zmc2V0W2pdLCBcIip0XCIsIG9mZl9hcmcuYXJyYXksIFwicFwiLCBqXS5qb2luKFwiXCIpKVxuICAgICAgfVxuICAgIH1cbiAgICBpZihpbml0X3N0cmluZy5sZW5ndGggPT09IDApIHtcbiAgICAgIHZhcnMucHVzaChcInFcIiArIGkgKyBcIj0wXCIpXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhcnMucHVzaChbXCJxXCIsIGksIFwiPVwiLCBpbml0X3N0cmluZy5qb2luKFwiK1wiKV0uam9pbihcIlwiKSlcbiAgICB9XG4gIH1cblxuICAvL1ByZXBhcmUgdGhpcyB2YXJpYWJsZXNcbiAgdmFyIHRoaXNWYXJzID0gdW5pcShbXS5jb25jYXQocHJvYy5wcmUudGhpc1ZhcnMpXG4gICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChwcm9jLmJvZHkudGhpc1ZhcnMpXG4gICAgICAgICAgICAgICAgICAgICAgLmNvbmNhdChwcm9jLnBvc3QudGhpc1ZhcnMpKVxuICB2YXJzID0gdmFycy5jb25jYXQodGhpc1ZhcnMpXG4gIGlmICh2YXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICB9XG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgY29kZS5wdXNoKFwicFwiK2krXCJ8PTBcIilcbiAgfVxuICBcbiAgLy9JbmxpbmUgcHJlbHVkZVxuICBpZihwcm9jLnByZS5ib2R5Lmxlbmd0aCA+IDMpIHtcbiAgICBjb2RlLnB1c2gocHJvY2Vzc0Jsb2NrKHByb2MucHJlLCBwcm9jLCBkdHlwZXMpKVxuICB9XG5cbiAgLy9Qcm9jZXNzIGJvZHlcbiAgdmFyIGJvZHkgPSBwcm9jZXNzQmxvY2socHJvYy5ib2R5LCBwcm9jLCBkdHlwZXMpXG4gIHZhciBtYXRjaGVkID0gY291bnRNYXRjaGVzKGxvb3BPcmRlcnMpXG4gIGlmKG1hdGNoZWQgPCBkaW1lbnNpb24pIHtcbiAgICBjb2RlLnB1c2gob3V0ZXJGaWxsKG1hdGNoZWQsIGxvb3BPcmRlcnNbMF0sIHByb2MsIGJvZHkpKSAvLyBUT0RPOiBSYXRoZXIgdGhhbiBwYXNzaW5nIGxvb3BPcmRlcnNbMF0sIGl0IG1pZ2h0IGJlIGludGVyZXN0aW5nIHRvIGxvb2sgYXQgcGFzc2luZyBhbiBvcmRlciB0aGF0IHJlcHJlc2VudHMgdGhlIG1ham9yaXR5IG9mIHRoZSBhcmd1bWVudHMgZm9yIGV4YW1wbGUuXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKGlubmVyRmlsbChsb29wT3JkZXJzWzBdLCBwcm9jLCBib2R5KSlcbiAgfVxuXG4gIC8vSW5saW5lIGVwaWxvZ1xuICBpZihwcm9jLnBvc3QuYm9keS5sZW5ndGggPiAzKSB7XG4gICAgY29kZS5wdXNoKHByb2Nlc3NCbG9jayhwcm9jLnBvc3QsIHByb2MsIGR0eXBlcykpXG4gIH1cbiAgXG4gIGlmKHByb2MuZGVidWcpIHtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tR2VuZXJhdGVkIGN3aXNlIHJvdXRpbmUgZm9yIFwiLCB0eXBlc2lnLCBcIjpcXG5cIiArIGNvZGUuam9pbihcIlxcblwiKSArIFwiXFxuLS0tLS0tLS0tLVwiKVxuICB9XG4gIFxuICB2YXIgbG9vcE5hbWUgPSBbKHByb2MuZnVuY05hbWV8fFwidW5uYW1lZFwiKSwgXCJfY3dpc2VfbG9vcF9cIiwgb3JkZXJzWzBdLmpvaW4oXCJzXCIpLFwibVwiLG1hdGNoZWQsdHlwZVN1bW1hcnkoZHR5cGVzKV0uam9pbihcIlwiKVxuICB2YXIgZiA9IG5ldyBGdW5jdGlvbihbXCJmdW5jdGlvbiBcIixsb29wTmFtZSxcIihcIiwgYXJnbGlzdC5qb2luKFwiLFwiKSxcIil7XCIsIGNvZGUuam9pbihcIlxcblwiKSxcIn0gcmV0dXJuIFwiLCBsb29wTmFtZV0uam9pbihcIlwiKSlcbiAgcmV0dXJuIGYoKVxufVxubW9kdWxlLmV4cG9ydHMgPSBnZW5lcmF0ZUNXaXNlT3BcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2xpYi9jb21waWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA1MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIHVuaXF1ZV9wcmVkKGxpc3QsIGNvbXBhcmUpIHtcbiAgdmFyIHB0ciA9IDFcbiAgICAsIGxlbiA9IGxpc3QubGVuZ3RoXG4gICAgLCBhPWxpc3RbMF0sIGI9bGlzdFswXVxuICBmb3IodmFyIGk9MTsgaTxsZW47ICsraSkge1xuICAgIGIgPSBhXG4gICAgYSA9IGxpc3RbaV1cbiAgICBpZihjb21wYXJlKGEsIGIpKSB7XG4gICAgICBpZihpID09PSBwdHIpIHtcbiAgICAgICAgcHRyKytcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGxpc3RbcHRyKytdID0gYVxuICAgIH1cbiAgfVxuICBsaXN0Lmxlbmd0aCA9IHB0clxuICByZXR1cm4gbGlzdFxufVxuXG5mdW5jdGlvbiB1bmlxdWVfZXEobGlzdCkge1xuICB2YXIgcHRyID0gMVxuICAgICwgbGVuID0gbGlzdC5sZW5ndGhcbiAgICAsIGE9bGlzdFswXSwgYiA9IGxpc3RbMF1cbiAgZm9yKHZhciBpPTE7IGk8bGVuOyArK2ksIGI9YSkge1xuICAgIGIgPSBhXG4gICAgYSA9IGxpc3RbaV1cbiAgICBpZihhICE9PSBiKSB7XG4gICAgICBpZihpID09PSBwdHIpIHtcbiAgICAgICAgcHRyKytcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGxpc3RbcHRyKytdID0gYVxuICAgIH1cbiAgfVxuICBsaXN0Lmxlbmd0aCA9IHB0clxuICByZXR1cm4gbGlzdFxufVxuXG5mdW5jdGlvbiB1bmlxdWUobGlzdCwgY29tcGFyZSwgc29ydGVkKSB7XG4gIGlmKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGxpc3RcbiAgfVxuICBpZihjb21wYXJlKSB7XG4gICAgaWYoIXNvcnRlZCkge1xuICAgICAgbGlzdC5zb3J0KGNvbXBhcmUpXG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVfcHJlZChsaXN0LCBjb21wYXJlKVxuICB9XG4gIGlmKCFzb3J0ZWQpIHtcbiAgICBsaXN0LnNvcnQoKVxuICB9XG4gIHJldHVybiB1bmlxdWVfZXEobGlzdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxdWVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VuaXEvdW5pcS5qc1xuLy8gbW9kdWxlIGlkID0gNTNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgaW90YSA9IHJlcXVpcmUoXCJpb3RhLWFycmF5XCIpXG52YXIgaXNCdWZmZXIgPSByZXF1aXJlKFwiaXMtYnVmZmVyXCIpXG5cbnZhciBoYXNUeXBlZEFycmF5cyAgPSAoKHR5cGVvZiBGbG9hdDY0QXJyYXkpICE9PSBcInVuZGVmaW5lZFwiKVxuXG5mdW5jdGlvbiBjb21wYXJlMXN0KGEsIGIpIHtcbiAgcmV0dXJuIGFbMF0gLSBiWzBdXG59XG5cbmZ1bmN0aW9uIG9yZGVyKCkge1xuICB2YXIgc3RyaWRlID0gdGhpcy5zdHJpZGVcbiAgdmFyIHRlcm1zID0gbmV3IEFycmF5KHN0cmlkZS5sZW5ndGgpXG4gIHZhciBpXG4gIGZvcihpPTA7IGk8dGVybXMubGVuZ3RoOyArK2kpIHtcbiAgICB0ZXJtc1tpXSA9IFtNYXRoLmFicyhzdHJpZGVbaV0pLCBpXVxuICB9XG4gIHRlcm1zLnNvcnQoY29tcGFyZTFzdClcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheSh0ZXJtcy5sZW5ndGgpXG4gIGZvcihpPTA7IGk8cmVzdWx0Lmxlbmd0aDsgKytpKSB7XG4gICAgcmVzdWx0W2ldID0gdGVybXNbaV1bMV1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGNvbXBpbGVDb25zdHJ1Y3RvcihkdHlwZSwgZGltZW5zaW9uKSB7XG4gIHZhciBjbGFzc05hbWUgPSBbXCJWaWV3XCIsIGRpbWVuc2lvbiwgXCJkXCIsIGR0eXBlXS5qb2luKFwiXCIpXG4gIGlmKGRpbWVuc2lvbiA8IDApIHtcbiAgICBjbGFzc05hbWUgPSBcIlZpZXdfTmlsXCIgKyBkdHlwZVxuICB9XG4gIHZhciB1c2VHZXR0ZXJzID0gKGR0eXBlID09PSBcImdlbmVyaWNcIilcblxuICBpZihkaW1lbnNpb24gPT09IC0xKSB7XG4gICAgLy9TcGVjaWFsIGNhc2UgZm9yIHRyaXZpYWwgYXJyYXlzXG4gICAgdmFyIGNvZGUgPVxuICAgICAgXCJmdW5jdGlvbiBcIitjbGFzc05hbWUrXCIoYSl7dGhpcy5kYXRhPWE7fTtcXFxudmFyIHByb3RvPVwiK2NsYXNzTmFtZStcIi5wcm90b3R5cGU7XFxcbnByb3RvLmR0eXBlPSdcIitkdHlwZStcIic7XFxcbnByb3RvLmluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIC0xfTtcXFxucHJvdG8uc2l6ZT0wO1xcXG5wcm90by5kaW1lbnNpb249LTE7XFxcbnByb3RvLnNoYXBlPXByb3RvLnN0cmlkZT1wcm90by5vcmRlcj1bXTtcXFxucHJvdG8ubG89cHJvdG8uaGk9cHJvdG8udHJhbnNwb3NlPXByb3RvLnN0ZXA9XFxcbmZ1bmN0aW9uKCl7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhKTt9O1xcXG5wcm90by5nZXQ9cHJvdG8uc2V0PWZ1bmN0aW9uKCl7fTtcXFxucHJvdG8ucGljaz1mdW5jdGlvbigpe3JldHVybiBudWxsfTtcXFxucmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF9cIitjbGFzc05hbWUrXCIoYSl7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIoYSk7fVwiXG4gICAgdmFyIHByb2NlZHVyZSA9IG5ldyBGdW5jdGlvbihjb2RlKVxuICAgIHJldHVybiBwcm9jZWR1cmUoKVxuICB9IGVsc2UgaWYoZGltZW5zaW9uID09PSAwKSB7XG4gICAgLy9TcGVjaWFsIGNhc2UgZm9yIDBkIGFycmF5c1xuICAgIHZhciBjb2RlID1cbiAgICAgIFwiZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiKGEsZCkge1xcXG50aGlzLmRhdGEgPSBhO1xcXG50aGlzLm9mZnNldCA9IGRcXFxufTtcXFxudmFyIHByb3RvPVwiK2NsYXNzTmFtZStcIi5wcm90b3R5cGU7XFxcbnByb3RvLmR0eXBlPSdcIitkdHlwZStcIic7XFxcbnByb3RvLmluZGV4PWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMub2Zmc2V0fTtcXFxucHJvdG8uZGltZW5zaW9uPTA7XFxcbnByb3RvLnNpemU9MTtcXFxucHJvdG8uc2hhcGU9XFxcbnByb3RvLnN0cmlkZT1cXFxucHJvdG8ub3JkZXI9W107XFxcbnByb3RvLmxvPVxcXG5wcm90by5oaT1cXFxucHJvdG8udHJhbnNwb3NlPVxcXG5wcm90by5zdGVwPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9jb3B5KCkge1xcXG5yZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsdGhpcy5vZmZzZXQpXFxcbn07XFxcbnByb3RvLnBpY2s9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3BpY2soKXtcXFxucmV0dXJuIFRyaXZpYWxBcnJheSh0aGlzLmRhdGEpO1xcXG59O1xcXG5wcm90by52YWx1ZU9mPXByb3RvLmdldD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfZ2V0KCl7XFxcbnJldHVybiBcIisodXNlR2V0dGVycyA/IFwidGhpcy5kYXRhLmdldCh0aGlzLm9mZnNldClcIiA6IFwidGhpcy5kYXRhW3RoaXMub2Zmc2V0XVwiKStcblwifTtcXFxucHJvdG8uc2V0PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zZXQodil7XFxcbnJldHVybiBcIisodXNlR2V0dGVycyA/IFwidGhpcy5kYXRhLnNldCh0aGlzLm9mZnNldCx2KVwiIDogXCJ0aGlzLmRhdGFbdGhpcy5vZmZzZXRdPXZcIikrXCJcXFxufTtcXFxucmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF9cIitjbGFzc05hbWUrXCIoYSxiLGMsZCl7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIoYSxkKX1cIlxuICAgIHZhciBwcm9jZWR1cmUgPSBuZXcgRnVuY3Rpb24oXCJUcml2aWFsQXJyYXlcIiwgY29kZSlcbiAgICByZXR1cm4gcHJvY2VkdXJlKENBQ0hFRF9DT05TVFJVQ1RPUlNbZHR5cGVdWzBdKVxuICB9XG5cbiAgdmFyIGNvZGUgPSBbXCIndXNlIHN0cmljdCdcIl1cblxuICAvL0NyZWF0ZSBjb25zdHJ1Y3RvciBmb3Igdmlld1xuICB2YXIgaW5kaWNlcyA9IGlvdGEoZGltZW5zaW9uKVxuICB2YXIgYXJncyA9IGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHsgcmV0dXJuIFwiaVwiK2kgfSlcbiAgdmFyIGluZGV4X3N0ciA9IFwidGhpcy5vZmZzZXQrXCIgKyBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICAgIHJldHVybiBcInRoaXMuc3RyaWRlW1wiICsgaSArIFwiXSppXCIgKyBpXG4gICAgICB9KS5qb2luKFwiK1wiKVxuICB2YXIgc2hhcGVBcmcgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJiXCIraVxuICAgIH0pLmpvaW4oXCIsXCIpXG4gIHZhciBzdHJpZGVBcmcgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJjXCIraVxuICAgIH0pLmpvaW4oXCIsXCIpXG4gIGNvZGUucHVzaChcbiAgICBcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIihhLFwiICsgc2hhcGVBcmcgKyBcIixcIiArIHN0cmlkZUFyZyArIFwiLGQpe3RoaXMuZGF0YT1hXCIsXG4gICAgICBcInRoaXMuc2hhcGU9W1wiICsgc2hhcGVBcmcgKyBcIl1cIixcbiAgICAgIFwidGhpcy5zdHJpZGU9W1wiICsgc3RyaWRlQXJnICsgXCJdXCIsXG4gICAgICBcInRoaXMub2Zmc2V0PWR8MH1cIixcbiAgICBcInZhciBwcm90bz1cIitjbGFzc05hbWUrXCIucHJvdG90eXBlXCIsXG4gICAgXCJwcm90by5kdHlwZT0nXCIrZHR5cGUrXCInXCIsXG4gICAgXCJwcm90by5kaW1lbnNpb249XCIrZGltZW5zaW9uKVxuXG4gIC8vdmlldy5zaXplOlxuICBjb2RlLnB1c2goXCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ3NpemUnLHtnZXQ6ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3NpemUoKXtcXFxucmV0dXJuIFwiK2luZGljZXMubWFwKGZ1bmN0aW9uKGkpIHsgcmV0dXJuIFwidGhpcy5zaGFwZVtcIitpK1wiXVwiIH0pLmpvaW4oXCIqXCIpLFxuXCJ9fSlcIilcblxuICAvL3ZpZXcub3JkZXI6XG4gIGlmKGRpbWVuc2lvbiA9PT0gMSkge1xuICAgIGNvZGUucHVzaChcInByb3RvLm9yZGVyPVswXVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcIk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywnb3JkZXInLHtnZXQ6XCIpXG4gICAgaWYoZGltZW5zaW9uIDwgNCkge1xuICAgICAgY29kZS5wdXNoKFwiZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX29yZGVyKCl7XCIpXG4gICAgICBpZihkaW1lbnNpb24gPT09IDIpIHtcbiAgICAgICAgY29kZS5wdXNoKFwicmV0dXJuIChNYXRoLmFicyh0aGlzLnN0cmlkZVswXSk+TWF0aC5hYnModGhpcy5zdHJpZGVbMV0pKT9bMSwwXTpbMCwxXX19KVwiKVxuICAgICAgfSBlbHNlIGlmKGRpbWVuc2lvbiA9PT0gMykge1xuICAgICAgICBjb2RlLnB1c2goXG5cInZhciBzMD1NYXRoLmFicyh0aGlzLnN0cmlkZVswXSksczE9TWF0aC5hYnModGhpcy5zdHJpZGVbMV0pLHMyPU1hdGguYWJzKHRoaXMuc3RyaWRlWzJdKTtcXFxuaWYoczA+czEpe1xcXG5pZihzMT5zMil7XFxcbnJldHVybiBbMiwxLDBdO1xcXG59ZWxzZSBpZihzMD5zMil7XFxcbnJldHVybiBbMSwyLDBdO1xcXG59ZWxzZXtcXFxucmV0dXJuIFsxLDAsMl07XFxcbn1cXFxufWVsc2UgaWYoczA+czIpe1xcXG5yZXR1cm4gWzIsMCwxXTtcXFxufWVsc2UgaWYoczI+czEpe1xcXG5yZXR1cm4gWzAsMSwyXTtcXFxufWVsc2V7XFxcbnJldHVybiBbMCwyLDFdO1xcXG59fX0pXCIpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvZGUucHVzaChcIk9SREVSfSlcIilcbiAgICB9XG4gIH1cblxuICAvL3ZpZXcuc2V0KGkwLCAuLi4sIHYpOlxuICBjb2RlLnB1c2goXG5cInByb3RvLnNldD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfc2V0KFwiK2FyZ3Muam9pbihcIixcIikrXCIsdil7XCIpXG4gIGlmKHVzZUdldHRlcnMpIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gdGhpcy5kYXRhLnNldChcIitpbmRleF9zdHIrXCIsdil9XCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIHRoaXMuZGF0YVtcIitpbmRleF9zdHIrXCJdPXZ9XCIpXG4gIH1cblxuICAvL3ZpZXcuZ2V0KGkwLCAuLi4pOlxuICBjb2RlLnB1c2goXCJwcm90by5nZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2dldChcIithcmdzLmpvaW4oXCIsXCIpK1wiKXtcIilcbiAgaWYodXNlR2V0dGVycykge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGEuZ2V0KFwiK2luZGV4X3N0citcIil9XCIpXG4gIH0gZWxzZSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIHRoaXMuZGF0YVtcIitpbmRleF9zdHIrXCJdfVwiKVxuICB9XG5cbiAgLy92aWV3LmluZGV4OlxuICBjb2RlLnB1c2goXG4gICAgXCJwcm90by5pbmRleD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfaW5kZXgoXCIsIGFyZ3Muam9pbigpLCBcIil7cmV0dXJuIFwiK2luZGV4X3N0citcIn1cIilcblxuICAvL3ZpZXcuaGkoKTpcbiAgY29kZS5wdXNoKFwicHJvdG8uaGk9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2hpKFwiK2FyZ3Muam9pbihcIixcIikrXCIpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSxcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gW1wiKHR5cGVvZiBpXCIsaSxcIiE9PSdudW1iZXInfHxpXCIsaSxcIjwwKT90aGlzLnNoYXBlW1wiLCBpLCBcIl06aVwiLCBpLFwifDBcIl0uam9pbihcIlwiKVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcInRoaXMuc3RyaWRlW1wiK2kgKyBcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLHRoaXMub2Zmc2V0KX1cIilcblxuICAvL3ZpZXcubG8oKTpcbiAgdmFyIGFfdmFycyA9IGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHsgcmV0dXJuIFwiYVwiK2krXCI9dGhpcy5zaGFwZVtcIitpK1wiXVwiIH0pXG4gIHZhciBjX3ZhcnMgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcImNcIitpK1wiPXRoaXMuc3RyaWRlW1wiK2krXCJdXCIgfSlcbiAgY29kZS5wdXNoKFwicHJvdG8ubG89ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2xvKFwiK2FyZ3Muam9pbihcIixcIikrXCIpe3ZhciBiPXRoaXMub2Zmc2V0LGQ9MCxcIithX3ZhcnMuam9pbihcIixcIikrXCIsXCIrY192YXJzLmpvaW4oXCIsXCIpKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChcblwiaWYodHlwZW9mIGlcIitpK1wiPT09J251bWJlcicmJmlcIitpK1wiPj0wKXtcXFxuZD1pXCIraStcInwwO1xcXG5iKz1jXCIraStcIipkO1xcXG5hXCIraStcIi09ZH1cIilcbiAgfVxuICBjb2RlLnB1c2goXCJyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYVwiK2lcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJjXCIraVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLGIpfVwiKVxuXG4gIC8vdmlldy5zdGVwKCk6XG4gIGNvZGUucHVzaChcInByb3RvLnN0ZXA9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3N0ZXAoXCIrYXJncy5qb2luKFwiLFwiKStcIil7dmFyIFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImFcIitpK1wiPXRoaXMuc2hhcGVbXCIraStcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImJcIitpK1wiPXRoaXMuc3RyaWRlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixjPXRoaXMub2Zmc2V0LGQ9MCxjZWlsPU1hdGguY2VpbFwiKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChcblwiaWYodHlwZW9mIGlcIitpK1wiPT09J251bWJlcicpe1xcXG5kPWlcIitpK1wifDA7XFxcbmlmKGQ8MCl7XFxcbmMrPWJcIitpK1wiKihhXCIraStcIi0xKTtcXFxuYVwiK2krXCI9Y2VpbCgtYVwiK2krXCIvZClcXFxufWVsc2V7XFxcbmFcIitpK1wiPWNlaWwoYVwiK2krXCIvZClcXFxufVxcXG5iXCIraStcIio9ZFxcXG59XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwicmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImFcIiArIGlcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJiXCIgKyBpXG4gICAgfSkuam9pbihcIixcIikrXCIsYyl9XCIpXG5cbiAgLy92aWV3LnRyYW5zcG9zZSgpOlxuICB2YXIgdFNoYXBlID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgdmFyIHRTdHJpZGUgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIHRTaGFwZVtpXSA9IFwiYVtpXCIraStcIl1cIlxuICAgIHRTdHJpZGVbaV0gPSBcImJbaVwiK2krXCJdXCJcbiAgfVxuICBjb2RlLnB1c2goXCJwcm90by50cmFuc3Bvc2U9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3RyYW5zcG9zZShcIithcmdzK1wiKXtcIitcbiAgICBhcmdzLm1hcChmdW5jdGlvbihuLGlkeCkgeyByZXR1cm4gbiArIFwiPShcIiArIG4gKyBcIj09PXVuZGVmaW5lZD9cIiArIGlkeCArIFwiOlwiICsgbiArIFwifDApXCJ9KS5qb2luKFwiO1wiKSxcbiAgICBcInZhciBhPXRoaXMuc2hhcGUsYj10aGlzLnN0cmlkZTtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsXCIrdFNoYXBlLmpvaW4oXCIsXCIpK1wiLFwiK3RTdHJpZGUuam9pbihcIixcIikrXCIsdGhpcy5vZmZzZXQpfVwiKVxuXG4gIC8vdmlldy5waWNrKCk6XG4gIGNvZGUucHVzaChcInByb3RvLnBpY2s9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3BpY2soXCIrYXJncytcIil7dmFyIGE9W10sYj1bXSxjPXRoaXMub2Zmc2V0XCIpXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFwiaWYodHlwZW9mIGlcIitpK1wiPT09J251bWJlcicmJmlcIitpK1wiPj0wKXtjPShjK3RoaXMuc3RyaWRlW1wiK2krXCJdKmlcIitpK1wiKXwwfWVsc2V7YS5wdXNoKHRoaXMuc2hhcGVbXCIraStcIl0pO2IucHVzaCh0aGlzLnN0cmlkZVtcIitpK1wiXSl9XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwidmFyIGN0b3I9Q1RPUl9MSVNUW2EubGVuZ3RoKzFdO3JldHVybiBjdG9yKHRoaXMuZGF0YSxhLGIsYyl9XCIpXG5cbiAgLy9BZGQgcmV0dXJuIHN0YXRlbWVudFxuICBjb2RlLnB1c2goXCJyZXR1cm4gZnVuY3Rpb24gY29uc3RydWN0X1wiK2NsYXNzTmFtZStcIihkYXRhLHNoYXBlLHN0cmlkZSxvZmZzZXQpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKGRhdGEsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwic2hhcGVbXCIraStcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcInN0cmlkZVtcIitpK1wiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsb2Zmc2V0KX1cIilcblxuICAvL0NvbXBpbGUgcHJvY2VkdXJlXG4gIHZhciBwcm9jZWR1cmUgPSBuZXcgRnVuY3Rpb24oXCJDVE9SX0xJU1RcIiwgXCJPUkRFUlwiLCBjb2RlLmpvaW4oXCJcXG5cIikpXG4gIHJldHVybiBwcm9jZWR1cmUoQ0FDSEVEX0NPTlNUUlVDVE9SU1tkdHlwZV0sIG9yZGVyKVxufVxuXG5mdW5jdGlvbiBhcnJheURUeXBlKGRhdGEpIHtcbiAgaWYoaXNCdWZmZXIoZGF0YSkpIHtcbiAgICByZXR1cm4gXCJidWZmZXJcIlxuICB9XG4gIGlmKGhhc1R5cGVkQXJyYXlzKSB7XG4gICAgc3dpdGNoKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChkYXRhKSkge1xuICAgICAgY2FzZSBcIltvYmplY3QgRmxvYXQ2NEFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJmbG9hdDY0XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEZsb2F0MzJBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiZmxvYXQzMlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBJbnQ4QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImludDhcIlxuICAgICAgY2FzZSBcIltvYmplY3QgSW50MTZBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiaW50MTZcIlxuICAgICAgY2FzZSBcIltvYmplY3QgSW50MzJBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiaW50MzJcIlxuICAgICAgY2FzZSBcIltvYmplY3QgVWludDhBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwidWludDhcIlxuICAgICAgY2FzZSBcIltvYmplY3QgVWludDE2QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQxNlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBVaW50MzJBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwidWludDMyXCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJ1aW50OF9jbGFtcGVkXCJcbiAgICB9XG4gIH1cbiAgaWYoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgIHJldHVybiBcImFycmF5XCJcbiAgfVxuICByZXR1cm4gXCJnZW5lcmljXCJcbn1cblxudmFyIENBQ0hFRF9DT05TVFJVQ1RPUlMgPSB7XG4gIFwiZmxvYXQzMlwiOltdLFxuICBcImZsb2F0NjRcIjpbXSxcbiAgXCJpbnQ4XCI6W10sXG4gIFwiaW50MTZcIjpbXSxcbiAgXCJpbnQzMlwiOltdLFxuICBcInVpbnQ4XCI6W10sXG4gIFwidWludDE2XCI6W10sXG4gIFwidWludDMyXCI6W10sXG4gIFwiYXJyYXlcIjpbXSxcbiAgXCJ1aW50OF9jbGFtcGVkXCI6W10sXG4gIFwiYnVmZmVyXCI6W10sXG4gIFwiZ2VuZXJpY1wiOltdXG59XG5cbjsoZnVuY3Rpb24oKSB7XG4gIGZvcih2YXIgaWQgaW4gQ0FDSEVEX0NPTlNUUlVDVE9SUykge1xuICAgIENBQ0hFRF9DT05TVFJVQ1RPUlNbaWRdLnB1c2goY29tcGlsZUNvbnN0cnVjdG9yKGlkLCAtMSkpXG4gIH1cbn0pO1xuXG5mdW5jdGlvbiB3cmFwcGVkTkRBcnJheUN0b3IoZGF0YSwgc2hhcGUsIHN0cmlkZSwgb2Zmc2V0KSB7XG4gIGlmKGRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgIHZhciBjdG9yID0gQ0FDSEVEX0NPTlNUUlVDVE9SUy5hcnJheVswXVxuICAgIHJldHVybiBjdG9yKFtdKVxuICB9IGVsc2UgaWYodHlwZW9mIGRhdGEgPT09IFwibnVtYmVyXCIpIHtcbiAgICBkYXRhID0gW2RhdGFdXG4gIH1cbiAgaWYoc2hhcGUgPT09IHVuZGVmaW5lZCkge1xuICAgIHNoYXBlID0gWyBkYXRhLmxlbmd0aCBdXG4gIH1cbiAgdmFyIGQgPSBzaGFwZS5sZW5ndGhcbiAgaWYoc3RyaWRlID09PSB1bmRlZmluZWQpIHtcbiAgICBzdHJpZGUgPSBuZXcgQXJyYXkoZClcbiAgICBmb3IodmFyIGk9ZC0xLCBzej0xOyBpPj0wOyAtLWkpIHtcbiAgICAgIHN0cmlkZVtpXSA9IHN6XG4gICAgICBzeiAqPSBzaGFwZVtpXVxuICAgIH1cbiAgfVxuICBpZihvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIG9mZnNldCA9IDBcbiAgICBmb3IodmFyIGk9MDsgaTxkOyArK2kpIHtcbiAgICAgIGlmKHN0cmlkZVtpXSA8IDApIHtcbiAgICAgICAgb2Zmc2V0IC09IChzaGFwZVtpXS0xKSpzdHJpZGVbaV1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgdmFyIGR0eXBlID0gYXJyYXlEVHlwZShkYXRhKVxuICB2YXIgY3Rvcl9saXN0ID0gQ0FDSEVEX0NPTlNUUlVDVE9SU1tkdHlwZV1cbiAgd2hpbGUoY3Rvcl9saXN0Lmxlbmd0aCA8PSBkKzEpIHtcbiAgICBjdG9yX2xpc3QucHVzaChjb21waWxlQ29uc3RydWN0b3IoZHR5cGUsIGN0b3JfbGlzdC5sZW5ndGgtMSkpXG4gIH1cbiAgdmFyIGN0b3IgPSBjdG9yX2xpc3RbZCsxXVxuICByZXR1cm4gY3RvcihkYXRhLCBzaGFwZSwgc3RyaWRlLCBvZmZzZXQpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gd3JhcHBlZE5EQXJyYXlDdG9yXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9uZGFycmF5L25kYXJyYXkuanNcbi8vIG1vZHVsZSBpZCA9IDU0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCAxIiwiXCJ1c2Ugc3RyaWN0XCJcblxuZnVuY3Rpb24gaW90YShuKSB7XG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkobilcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgcmVzdWx0W2ldID0gaVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpb3RhXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvaW90YS1hcnJheS9pb3RhLmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY3JlYXRlVkFPTmF0aXZlID0gcmVxdWlyZShcIi4vbGliL3Zhby1uYXRpdmUuanNcIilcbnZhciBjcmVhdGVWQU9FbXVsYXRlZCA9IHJlcXVpcmUoXCIuL2xpYi92YW8tZW11bGF0ZWQuanNcIilcblxuZnVuY3Rpb24gRXh0ZW5zaW9uU2hpbSAoZ2wpIHtcbiAgdGhpcy5iaW5kVmVydGV4QXJyYXlPRVMgPSBnbC5iaW5kVmVydGV4QXJyYXkuYmluZChnbClcbiAgdGhpcy5jcmVhdGVWZXJ0ZXhBcnJheU9FUyA9IGdsLmNyZWF0ZVZlcnRleEFycmF5LmJpbmQoZ2wpXG4gIHRoaXMuZGVsZXRlVmVydGV4QXJyYXlPRVMgPSBnbC5kZWxldGVWZXJ0ZXhBcnJheS5iaW5kKGdsKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVWQU8oZ2wsIGF0dHJpYnV0ZXMsIGVsZW1lbnRzLCBlbGVtZW50c1R5cGUpIHtcbiAgdmFyIGV4dCA9IGdsLmNyZWF0ZVZlcnRleEFycmF5XG4gICAgPyBuZXcgRXh0ZW5zaW9uU2hpbShnbClcbiAgICA6IGdsLmdldEV4dGVuc2lvbignT0VTX3ZlcnRleF9hcnJheV9vYmplY3QnKVxuICB2YXIgdmFvXG5cbiAgaWYoZXh0KSB7XG4gICAgdmFvID0gY3JlYXRlVkFPTmF0aXZlKGdsLCBleHQpXG4gIH0gZWxzZSB7XG4gICAgdmFvID0gY3JlYXRlVkFPRW11bGF0ZWQoZ2wpXG4gIH1cbiAgdmFvLnVwZGF0ZShhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKVxuICByZXR1cm4gdmFvXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC12YW8vdmFvLmpzXG4vLyBtb2R1bGUgaWQgPSA1N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIlwidXNlIHN0cmljdFwiXG5cbnZhciBiaW5kQXR0cmlicyA9IHJlcXVpcmUoXCIuL2RvLWJpbmQuanNcIilcblxuZnVuY3Rpb24gVmVydGV4QXR0cmlidXRlKGxvY2F0aW9uLCBkaW1lbnNpb24sIGEsIGIsIGMsIGQpIHtcbiAgdGhpcy5sb2NhdGlvbiA9IGxvY2F0aW9uXG4gIHRoaXMuZGltZW5zaW9uID0gZGltZW5zaW9uXG4gIHRoaXMuYSA9IGFcbiAgdGhpcy5iID0gYlxuICB0aGlzLmMgPSBjXG4gIHRoaXMuZCA9IGRcbn1cblxuVmVydGV4QXR0cmlidXRlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oZ2wpIHtcbiAgc3dpdGNoKHRoaXMuZGltZW5zaW9uKSB7XG4gICAgY2FzZSAxOlxuICAgICAgZ2wudmVydGV4QXR0cmliMWYodGhpcy5sb2NhdGlvbiwgdGhpcy5hKVxuICAgIGJyZWFrXG4gICAgY2FzZSAyOlxuICAgICAgZ2wudmVydGV4QXR0cmliMmYodGhpcy5sb2NhdGlvbiwgdGhpcy5hLCB0aGlzLmIpXG4gICAgYnJlYWtcbiAgICBjYXNlIDM6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWIzZih0aGlzLmxvY2F0aW9uLCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5jKVxuICAgIGJyZWFrXG4gICAgY2FzZSA0OlxuICAgICAgZ2wudmVydGV4QXR0cmliNGYodGhpcy5sb2NhdGlvbiwgdGhpcy5hLCB0aGlzLmIsIHRoaXMuYywgdGhpcy5kKVxuICAgIGJyZWFrXG4gIH1cbn1cblxuZnVuY3Rpb24gVkFPTmF0aXZlKGdsLCBleHQsIGhhbmRsZSkge1xuICB0aGlzLmdsID0gZ2xcbiAgdGhpcy5fZXh0ID0gZXh0XG4gIHRoaXMuaGFuZGxlID0gaGFuZGxlXG4gIHRoaXMuX2F0dHJpYnMgPSBbXVxuICB0aGlzLl91c2VFbGVtZW50cyA9IGZhbHNlXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUuYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9leHQuYmluZFZlcnRleEFycmF5T0VTKHRoaXMuaGFuZGxlKVxuICBmb3IodmFyIGk9MDsgaTx0aGlzLl9hdHRyaWJzLmxlbmd0aDsgKytpKSB7XG4gICAgdGhpcy5fYXR0cmlic1tpXS5iaW5kKHRoaXMuZ2wpXG4gIH1cbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS51bmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZXh0LmJpbmRWZXJ0ZXhBcnJheU9FUyhudWxsKVxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fZXh0LmRlbGV0ZVZlcnRleEFycmF5T0VTKHRoaXMuaGFuZGxlKVxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uKGF0dHJpYnV0ZXMsIGVsZW1lbnRzLCBlbGVtZW50c1R5cGUpIHtcbiAgdGhpcy5iaW5kKClcbiAgYmluZEF0dHJpYnModGhpcy5nbCwgZWxlbWVudHMsIGF0dHJpYnV0ZXMpXG4gIHRoaXMudW5iaW5kKClcbiAgdGhpcy5fYXR0cmlicy5sZW5ndGggPSAwXG4gIGlmKGF0dHJpYnV0ZXMpXG4gIGZvcih2YXIgaT0wOyBpPGF0dHJpYnV0ZXMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYSA9IGF0dHJpYnV0ZXNbaV1cbiAgICBpZih0eXBlb2YgYSA9PT0gXCJudW1iZXJcIikge1xuICAgICAgdGhpcy5fYXR0cmlicy5wdXNoKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoaSwgMSwgYSkpXG4gICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkoYSkpIHtcbiAgICAgIHRoaXMuX2F0dHJpYnMucHVzaChuZXcgVmVydGV4QXR0cmlidXRlKGksIGEubGVuZ3RoLCBhWzBdLCBhWzFdLCBhWzJdLCBhWzNdKSlcbiAgICB9XG4gIH1cbiAgdGhpcy5fdXNlRWxlbWVudHMgPSAhIWVsZW1lbnRzXG4gIHRoaXMuX2VsZW1lbnRzVHlwZSA9IGVsZW1lbnRzVHlwZSB8fCB0aGlzLmdsLlVOU0lHTkVEX1NIT1JUXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUuZHJhdyA9IGZ1bmN0aW9uKG1vZGUsIGNvdW50LCBvZmZzZXQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHx8IDBcbiAgdmFyIGdsID0gdGhpcy5nbFxuICBpZih0aGlzLl91c2VFbGVtZW50cykge1xuICAgIGdsLmRyYXdFbGVtZW50cyhtb2RlLCBjb3VudCwgdGhpcy5fZWxlbWVudHNUeXBlLCBvZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgZ2wuZHJhd0FycmF5cyhtb2RlLCBvZmZzZXQsIGNvdW50KVxuICB9XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVZBT05hdGl2ZShnbCwgZXh0KSB7XG4gIHJldHVybiBuZXcgVkFPTmF0aXZlKGdsLCBleHQsIGV4dC5jcmVhdGVWZXJ0ZXhBcnJheU9FUygpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZBT05hdGl2ZVxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLW5hdGl2ZS5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYmluZEF0dHJpYnMgPSByZXF1aXJlKFwiLi9kby1iaW5kLmpzXCIpXG5cbmZ1bmN0aW9uIFZBT0VtdWxhdGVkKGdsKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLl9lbGVtZW50cyA9IG51bGxcbiAgdGhpcy5fYXR0cmlidXRlcyA9IG51bGxcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgYmluZEF0dHJpYnModGhpcy5nbCwgdGhpcy5fZWxlbWVudHMsIHRoaXMuX2F0dHJpYnV0ZXMpXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHRoaXMuX2VsZW1lbnRzID0gZWxlbWVudHNcbiAgdGhpcy5fYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZWxlbWVudHNUeXBlIHx8IHRoaXMuZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgfVxuVkFPRW11bGF0ZWQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKCkgeyB9XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24obW9kZSwgY291bnQsIG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIGlmKHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0aGlzLl9lbGVtZW50c1R5cGUsIG9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBnbC5kcmF3QXJyYXlzKG1vZGUsIG9mZnNldCwgY291bnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPRW11bGF0ZWQoZ2wpIHtcbiAgcmV0dXJuIG5ldyBWQU9FbXVsYXRlZChnbClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWQU9FbXVsYXRlZFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsImZ1bmN0aW9uIGRvd25sb2FkKHQsZSxuKXtmdW5jdGlvbiBpKHQpe3ZhciBlPXQuc3BsaXQoL1s6OyxdLyksbj1lWzFdLGk9XCJiYXNlNjRcIj09ZVsyXT9hdG9iOmRlY29kZVVSSUNvbXBvbmVudCxyPWkoZS5wb3AoKSksbz1yLmxlbmd0aCxhPTAscz1uZXcgVWludDhBcnJheShvKTtmb3IoYTthPG87KythKXNbYV09ci5jaGFyQ29kZUF0KGEpO3JldHVybiBuZXcgbShbc10se3R5cGU6bn0pfWZ1bmN0aW9uIHIodCxlKXtpZihcImRvd25sb2FkXCJpbiBsKXJldHVybiBsLmhyZWY9dCxsLnNldEF0dHJpYnV0ZShcImRvd25sb2FkXCIsdyksbC5pbm5lckhUTUw9XCJkb3dubG9hZGluZy4uLlwiLGwuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixmLmJvZHkuYXBwZW5kQ2hpbGQobCksc2V0VGltZW91dChmdW5jdGlvbigpe2wuY2xpY2soKSxmLmJvZHkucmVtb3ZlQ2hpbGQobCksZT09PSEwJiZzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7aC5VUkwucmV2b2tlT2JqZWN0VVJMKGwuaHJlZil9LDI1MCl9LDY2KSwhMDt2YXIgbj1mLmNyZWF0ZUVsZW1lbnQoXCJpZnJhbWVcIik7Zi5ib2R5LmFwcGVuZENoaWxkKG4pLGV8fCh0PVwiZGF0YTpcIit0LnJlcGxhY2UoL15kYXRhOihbXFx3XFwvXFwtXFwrXSspLyxkKSksbi5zcmM9dCxzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7Zi5ib2R5LnJlbW92ZUNoaWxkKG4pfSwzMzMpfXZhciBvLGEscyxoPXdpbmRvdyxkPVwiYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtXCIsdT1ufHxkLGM9dCxmPWRvY3VtZW50LGw9Zi5jcmVhdGVFbGVtZW50KFwiYVwiKSxwPWZ1bmN0aW9uKHQpe3JldHVybiBTdHJpbmcodCl9LG09aC5CbG9ifHxoLk1vekJsb2J8fGguV2ViS2l0QmxvYnx8cCxnPWguTVNCbG9iQnVpbGRlcnx8aC5XZWJLaXRCbG9iQnVpbGRlcnx8aC5CbG9iQnVpbGRlcix3PWV8fFwiZG93bmxvYWRcIjtpZihcInRydWVcIj09PVN0cmluZyh0aGlzKSYmKGM9W2MsdV0sdT1jWzBdLGM9Y1sxXSksU3RyaW5nKGMpLm1hdGNoKC9eZGF0YVxcOltcXHcrXFwtXStcXC9bXFx3K1xcLV0rWyw7XS8pKXJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYj9uYXZpZ2F0b3IubXNTYXZlQmxvYihpKGMpLHcpOnIoYyk7dHJ5e289YyBpbnN0YW5jZW9mIG0/YzpuZXcgbShbY10se3R5cGU6dX0pfWNhdGNoKHQpe2cmJihhPW5ldyBnLGEuYXBwZW5kKFtjXSksbz1hLmdldEJsb2IodSkpfWlmKG5hdmlnYXRvci5tc1NhdmVCbG9iKXJldHVybiBuYXZpZ2F0b3IubXNTYXZlQmxvYihvLHcpO2lmKGguVVJMKXIoaC5VUkwuY3JlYXRlT2JqZWN0VVJMKG8pLCEwKTtlbHNle2lmKFwic3RyaW5nXCI9PXR5cGVvZiBvfHxvLmNvbnN0cnVjdG9yPT09cCl0cnl7cmV0dXJuIHIoXCJkYXRhOlwiK3UrXCI7YmFzZTY0LFwiK2guYnRvYShvKSl9Y2F0Y2godCl7cmV0dXJuIHIoXCJkYXRhOlwiK3UrXCIsXCIrZW5jb2RlVVJJQ29tcG9uZW50KG8pKX1zPW5ldyBGaWxlUmVhZGVyLHMub25sb2FkPWZ1bmN0aW9uKHQpe3IodGhpcy5yZXN1bHQpfSxzLnJlYWRBc0RhdGFVUkwobyl9cmV0dXJuITB9d2luZG93LldoYW1teT1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXtmb3IodmFyIGk9ZSh0KSxyPTNlNCxvPVt7aWQ6NDQwNzg2ODUxLGRhdGE6W3tkYXRhOjEsaWQ6MTcwMzB9LHtkYXRhOjEsaWQ6MTcxNDN9LHtkYXRhOjQsaWQ6MTcxMzh9LHtkYXRhOjgsaWQ6MTcxMzl9LHtkYXRhOlwid2VibVwiLGlkOjE3MDI2fSx7ZGF0YToyLGlkOjE3MDMxfSx7ZGF0YToyLGlkOjE3MDI5fV19LHtpZDo0MDgxMjU1NDMsZGF0YTpbe2lkOjM1NzE0OTAzMCxkYXRhOlt7ZGF0YToxZTYsaWQ6MjgwNzcyOX0se2RhdGE6XCJ3aGFtbXlcIixpZDoxOTg0MH0se2RhdGE6XCJ3aGFtbXlcIixpZDoyMjMzN30se2RhdGE6YyhpLmR1cmF0aW9uKSxpZDoxNzU0NX1dfSx7aWQ6Mzc0NjQ4NDI3LGRhdGE6W3tpZDoxNzQsZGF0YTpbe2RhdGE6MSxpZDoyMTV9LHtkYXRhOjEsaWQ6Mjk2Mzd9LHtkYXRhOjAsaWQ6MTU2fSx7ZGF0YTpcInVuZFwiLGlkOjIyNzQ3MTZ9LHtkYXRhOlwiVl9WUDhcIixpZDoxMzR9LHtkYXRhOlwiVlA4XCIsaWQ6MjQ1OTI3Mn0se2RhdGE6MSxpZDoxMzF9LHtpZDoyMjQsZGF0YTpbe2RhdGE6aS53aWR0aCxpZDoxNzZ9LHtkYXRhOmkuaGVpZ2h0LGlkOjE4Nn1dfV19XX0se2lkOjQ3NTI0OTUxNSxkYXRhOltdfV19XSxzPW9bMV0sZD1zLmRhdGFbMl0sdT0wLGY9MDt1PHQubGVuZ3RoOyl7dmFyIGw9e2lkOjE4NyxkYXRhOlt7ZGF0YTpNYXRoLnJvdW5kKGYpLGlkOjE3OX0se2lkOjE4MyxkYXRhOlt7ZGF0YToxLGlkOjI0N30se2RhdGE6MCxzaXplOjgsaWQ6MjQxfV19XX07ZC5kYXRhLnB1c2gobCk7dmFyIHA9W10sbT0wO2RvIHAucHVzaCh0W3VdKSxtKz10W3VdLmR1cmF0aW9uLHUrKzt3aGlsZSh1PHQubGVuZ3RoJiZtPHIpO3ZhciBnPTAsdz17aWQ6NTI0NTMxMzE3LGRhdGE6W3tkYXRhOk1hdGgucm91bmQoZiksaWQ6MjMxfV0uY29uY2F0KHAubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPWgoe2Rpc2NhcmRhYmxlOjAsZnJhbWU6dC5kYXRhLnNsaWNlKDQpLGludmlzaWJsZTowLGtleWZyYW1lOjEsbGFjaW5nOjAsdHJhY2tOdW06MSx0aW1lY29kZTpNYXRoLnJvdW5kKGcpfSk7cmV0dXJuIGcrPXQuZHVyYXRpb24se2RhdGE6ZSxpZDoxNjN9fSkpfTtzLmRhdGEucHVzaCh3KSxmKz1tfWZvcih2YXIgdj0wLHk9MDt5PHMuZGF0YS5sZW5ndGg7eSsrKXt5Pj0zJiYoZC5kYXRhW3ktM10uZGF0YVsxXS5kYXRhWzFdLmRhdGE9dik7dmFyIGI9YShbcy5kYXRhW3ldXSxuKTt2Kz1iLnNpemV8fGIuYnl0ZUxlbmd0aHx8Yi5sZW5ndGgsMiE9eSYmKHMuZGF0YVt5XT1iKX1yZXR1cm4gYShvLG4pfWZ1bmN0aW9uIGUodCl7Zm9yKHZhciBlPXRbMF0ud2lkdGgsbj10WzBdLmhlaWdodCxpPXRbMF0uZHVyYXRpb24scj0xO3I8dC5sZW5ndGg7cisrKXtpZih0W3JdLndpZHRoIT1lKXRocm93XCJGcmFtZSBcIisocisxKStcIiBoYXMgYSBkaWZmZXJlbnQgd2lkdGhcIjtpZih0W3JdLmhlaWdodCE9bil0aHJvd1wiRnJhbWUgXCIrKHIrMSkrXCIgaGFzIGEgZGlmZmVyZW50IGhlaWdodFwiO2lmKHRbcl0uZHVyYXRpb248MHx8dFtyXS5kdXJhdGlvbj4zMjc2Nyl0aHJvd1wiRnJhbWUgXCIrKHIrMSkrXCIgaGFzIGEgd2VpcmQgZHVyYXRpb24gKG11c3QgYmUgYmV0d2VlbiAwIGFuZCAzMjc2NylcIjtpKz10W3JdLmR1cmF0aW9ufXJldHVybntkdXJhdGlvbjppLHdpZHRoOmUsaGVpZ2h0Om59fWZ1bmN0aW9uIG4odCl7Zm9yKHZhciBlPVtdO3Q+MDspZS5wdXNoKDI1NSZ0KSx0Pj49ODtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZS5yZXZlcnNlKCkpfWZ1bmN0aW9uIGkodCxlKXtmb3IodmFyIG49bmV3IFVpbnQ4QXJyYXkoZSksaT1lLTE7aT49MDtpLS0pbltpXT0yNTUmdCx0Pj49ODtyZXR1cm4gbn1mdW5jdGlvbiByKHQpe2Zvcih2YXIgZT1uZXcgVWludDhBcnJheSh0Lmxlbmd0aCksbj0wO248dC5sZW5ndGg7bisrKWVbbl09dC5jaGFyQ29kZUF0KG4pO3JldHVybiBlfWZ1bmN0aW9uIG8odCl7dmFyIGU9W10sbj10Lmxlbmd0aCU4P25ldyBBcnJheSg5LXQubGVuZ3RoJTgpLmpvaW4oXCIwXCIpOlwiXCI7dD1uK3Q7Zm9yKHZhciBpPTA7aTx0Lmxlbmd0aDtpKz04KWUucHVzaChwYXJzZUludCh0LnN1YnN0cihpLDgpLDIpKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoZSl9ZnVuY3Rpb24gYSh0LGUpe2Zvcih2YXIgaD1bXSxkPTA7ZDx0Lmxlbmd0aDtkKyspaWYoXCJpZFwiaW4gdFtkXSl7dmFyIHU9dFtkXS5kYXRhO2lmKFwib2JqZWN0XCI9PXR5cGVvZiB1JiYodT1hKHUsZSkpLFwibnVtYmVyXCI9PXR5cGVvZiB1JiYodT1cInNpemVcImluIHRbZF0/aSh1LHRbZF0uc2l6ZSk6byh1LnRvU3RyaW5nKDIpKSksXCJzdHJpbmdcIj09dHlwZW9mIHUmJih1PXIodSkpLHUubGVuZ3RoKTtmb3IodmFyIGM9dS5zaXplfHx1LmJ5dGVMZW5ndGh8fHUubGVuZ3RoLGY9MCxsPTU2O2w+MDtsLT03KWlmKGM+TWF0aC5wb3coMixsKS0yKXtmPWwvNzticmVha312YXIgcD1jLnRvU3RyaW5nKDIpLG09bmV3IEFycmF5KDgqKGYrMSkrMSkuam9pbihcIjBcIiksZz1uZXcgQXJyYXkoZisxKS5qb2luKFwiMFwiKSsxLHc9bS5zdWJzdHIoMCxtLmxlbmd0aC1wLmxlbmd0aC1nLmxlbmd0aCkrcCx2PWcrdztoLnB1c2gobih0W2RdLmlkKSksaC5wdXNoKG8odikpLGgucHVzaCh1KX1lbHNlIGgucHVzaCh0W2RdKTtpZihlKXt2YXIgeT1zKGgpO3JldHVybiBuZXcgVWludDhBcnJheSh5KX1yZXR1cm4gbmV3IEJsb2IoaCx7dHlwZTpcInZpZGVvL3dlYm1cIn0pfWZ1bmN0aW9uIHModCxlKXtudWxsPT1lJiYoZT1bXSk7Zm9yKHZhciBuPTA7bjx0Lmxlbmd0aDtuKyspXCJvYmplY3RcIj09dHlwZW9mIHRbbl0/cyh0W25dLGUpOmUucHVzaCh0W25dKTtyZXR1cm4gZX1mdW5jdGlvbiBoKHQpe3ZhciBlPTA7aWYodC5rZXlmcmFtZSYmKGV8PTEyOCksdC5pbnZpc2libGUmJihlfD04KSx0LmxhY2luZyYmKGV8PXQubGFjaW5nPDwxKSx0LmRpc2NhcmRhYmxlJiYoZXw9MSksdC50cmFja051bT4xMjcpdGhyb3dcIlRyYWNrTnVtYmVyID4gMTI3IG5vdCBzdXBwb3J0ZWRcIjt2YXIgbj1bMTI4fHQudHJhY2tOdW0sdC50aW1lY29kZT4+OCwyNTUmdC50aW1lY29kZSxlXS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodCl9KS5qb2luKFwiXCIpK3QuZnJhbWU7cmV0dXJuIG59ZnVuY3Rpb24gZCh0KXtmb3IodmFyIGU9dC5SSUZGWzBdLldFQlBbMF0sbj1lLmluZGV4T2YoXCLCnVx1MDAwMSpcIiksaT0wLHI9W107aTw0O2krKylyW2ldPWUuY2hhckNvZGVBdChuKzMraSk7dmFyIG8sYSxzLGgsZDtyZXR1cm4gZD1yWzFdPDw4fHJbMF0sbz0xNjM4MyZkLGE9ZD4+MTQsZD1yWzNdPDw4fHJbMl0scz0xNjM4MyZkLGg9ZD4+MTQse3dpZHRoOm8saGVpZ2h0OnMsZGF0YTplLHJpZmY6dH19ZnVuY3Rpb24gdSh0KXtmb3IodmFyIGU9MCxuPXt9O2U8dC5sZW5ndGg7KXt2YXIgaT10LnN1YnN0cihlLDQpO2lmKG5baV09bltpXXx8W10sXCJSSUZGXCI9PWl8fFwiTElTVFwiPT1pKXt2YXIgcj1wYXJzZUludCh0LnN1YnN0cihlKzQsNCkuc3BsaXQoXCJcIikubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPXQuY2hhckNvZGVBdCgwKS50b1N0cmluZygyKTtyZXR1cm4gbmV3IEFycmF5KDgtZS5sZW5ndGgrMSkuam9pbihcIjBcIikrZX0pLmpvaW4oXCJcIiksMiksbz10LnN1YnN0cihlKzQrNCxyKTtlKz04K3IsbltpXS5wdXNoKHUobykpfWVsc2VcIldFQlBcIj09aT8obltpXS5wdXNoKHQuc3Vic3RyKGUrOCkpLGU9dC5sZW5ndGgpOihuW2ldLnB1c2godC5zdWJzdHIoZSs0KSksZT10Lmxlbmd0aCl9cmV0dXJuIG59ZnVuY3Rpb24gYyh0KXtyZXR1cm5bXS5zbGljZS5jYWxsKG5ldyBVaW50OEFycmF5KG5ldyBGbG9hdDY0QXJyYXkoW3RdKS5idWZmZXIpLDApLm1hcChmdW5jdGlvbih0KXtyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZSh0KX0pLnJldmVyc2UoKS5qb2luKFwiXCIpfWZ1bmN0aW9uIGYodCxlKXt0aGlzLmZyYW1lcz1bXSx0aGlzLmR1cmF0aW9uPTFlMy90LHRoaXMucXVhbGl0eT1lfHwuOH1yZXR1cm4gZi5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQsZSl7aWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGUmJnRoaXMuZHVyYXRpb24pdGhyb3dcInlvdSBjYW4ndCBwYXNzIGEgZHVyYXRpb24gaWYgdGhlIGZwcyBpcyBzZXRcIjtpZihcInVuZGVmaW5lZFwiPT10eXBlb2YgZSYmIXRoaXMuZHVyYXRpb24pdGhyb3dcImlmIHlvdSBkb24ndCBoYXZlIHRoZSBmcHMgc2V0LCB5b3UgbmVlZCB0byBoYXZlIGR1cmF0aW9ucyBoZXJlLlwiO2lmKHQuY2FudmFzJiYodD10LmNhbnZhcyksdC50b0RhdGFVUkwpdD10LmdldENvbnRleHQoXCIyZFwiKS5nZXRJbWFnZURhdGEoMCwwLHQud2lkdGgsdC5oZWlnaHQpO2Vsc2UgaWYoXCJzdHJpbmdcIiE9dHlwZW9mIHQpdGhyb3dcImZyYW1lIG11c3QgYmUgYSBhIEhUTUxDYW52YXNFbGVtZW50LCBhIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBvciBhIERhdGFVUkkgZm9ybWF0dGVkIHN0cmluZ1wiO2lmKFwic3RyaW5nXCI9PXR5cGVvZiB0JiYhL15kYXRhOmltYWdlXFwvd2VicDtiYXNlNjQsL2dpLnRlc3QodCkpdGhyb3dcIklucHV0IG11c3QgYmUgZm9ybWF0dGVkIHByb3Blcmx5IGFzIGEgYmFzZTY0IGVuY29kZWQgRGF0YVVSSSBvZiB0eXBlIGltYWdlL3dlYnBcIjt0aGlzLmZyYW1lcy5wdXNoKHtpbWFnZTp0LGR1cmF0aW9uOmV8fHRoaXMuZHVyYXRpb259KX0sZi5wcm90b3R5cGUuZW5jb2RlRnJhbWVzPWZ1bmN0aW9uKHQpe2lmKHRoaXMuZnJhbWVzWzBdLmltYWdlIGluc3RhbmNlb2YgSW1hZ2VEYXRhKXt2YXIgZT10aGlzLmZyYW1lcyxuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIiksaT1uLmdldENvbnRleHQoXCIyZFwiKTtuLndpZHRoPXRoaXMuZnJhbWVzWzBdLmltYWdlLndpZHRoLG4uaGVpZ2h0PXRoaXMuZnJhbWVzWzBdLmltYWdlLmhlaWdodDt2YXIgcj1mdW5jdGlvbihvKXt2YXIgYT1lW29dO2kucHV0SW1hZ2VEYXRhKGEuaW1hZ2UsMCwwKSxhLmltYWdlPW4udG9EYXRhVVJMKFwiaW1hZ2Uvd2VicFwiLHRoaXMucXVhbGl0eSksbzxlLmxlbmd0aC0xP3NldFRpbWVvdXQoZnVuY3Rpb24oKXtyKG8rMSl9LDEpOnQoKX0uYmluZCh0aGlzKTtyKDApfWVsc2UgdCgpfSxmLnByb3RvdHlwZS5jb21waWxlPWZ1bmN0aW9uKGUsbil7dGhpcy5lbmNvZGVGcmFtZXMoZnVuY3Rpb24oKXt2YXIgaT1uZXcgdCh0aGlzLmZyYW1lcy5tYXAoZnVuY3Rpb24odCl7dmFyIGU9ZCh1KGF0b2IodC5pbWFnZS5zbGljZSgyMykpKSk7cmV0dXJuIGUuZHVyYXRpb249dC5kdXJhdGlvbixlfSksZSk7bihpKX0uYmluZCh0aGlzKSl9LHtWaWRlbzpmLGZyb21JbWFnZUFycmF5OmZ1bmN0aW9uKGUsbixpKXtyZXR1cm4gdChlLm1hcChmdW5jdGlvbih0KXt2YXIgZT1kKHUoYXRvYih0LnNsaWNlKDIzKSkpKTtyZXR1cm4gZS5kdXJhdGlvbj0xZTMvbixlfSksaSl9LHRvV2ViTTp0fX0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7dmFyIGUsbj1uZXcgVWludDhBcnJheSh0KTtmb3IoZT0wO2U8dDtlKz0xKW5bZV09MDtyZXR1cm4gbn1mdW5jdGlvbiBlKGUsbixpLHIpe3ZhciBvPW4raSxhPXQoKHBhcnNlSW50KG8vcikrMSkqcik7cmV0dXJuIGEuc2V0KGUpLGF9ZnVuY3Rpb24gbih0LGUsbil7cmV0dXJuIHQ9dC50b1N0cmluZyhufHw4KSxcIjAwMDAwMDAwMDAwMFwiLnN1YnN0cih0Lmxlbmd0aCsxMi1lKSt0fWZ1bmN0aW9uIGkoZSxuLGkpe3ZhciByLG87Zm9yKG49bnx8dChlLmxlbmd0aCksaT1pfHwwLHI9MCxvPWUubGVuZ3RoO3I8bztyKz0xKW5baV09ZS5jaGFyQ29kZUF0KHIpLGkrPTE7cmV0dXJuIG59ZnVuY3Rpb24gcih0KXtmdW5jdGlvbiBlKHQpe3JldHVybiBvW3Q+PjE4JjYzXStvW3Q+PjEyJjYzXStvW3Q+PjYmNjNdK29bNjMmdF19dmFyIG4saSxyLGE9dC5sZW5ndGglMyxzPVwiXCI7Zm9yKG49MCxyPXQubGVuZ3RoLWE7bjxyO24rPTMpaT0odFtuXTw8MTYpKyh0W24rMV08PDgpK3RbbisyXSxzKz1lKGkpO3N3aXRjaChzLmxlbmd0aCU0KXtjYXNlIDE6cys9XCI9XCI7YnJlYWs7Y2FzZSAyOnMrPVwiPT1cIn1yZXR1cm4gc312YXIgbz1bXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCIsXCJJXCIsXCJKXCIsXCJLXCIsXCJMXCIsXCJNXCIsXCJOXCIsXCJPXCIsXCJQXCIsXCJRXCIsXCJSXCIsXCJTXCIsXCJUXCIsXCJVXCIsXCJWXCIsXCJXXCIsXCJYXCIsXCJZXCIsXCJaXCIsXCJhXCIsXCJiXCIsXCJjXCIsXCJkXCIsXCJlXCIsXCJmXCIsXCJnXCIsXCJoXCIsXCJpXCIsXCJqXCIsXCJrXCIsXCJsXCIsXCJtXCIsXCJuXCIsXCJvXCIsXCJwXCIsXCJxXCIsXCJyXCIsXCJzXCIsXCJ0XCIsXCJ1XCIsXCJ2XCIsXCJ3XCIsXCJ4XCIsXCJ5XCIsXCJ6XCIsXCIwXCIsXCIxXCIsXCIyXCIsXCIzXCIsXCI0XCIsXCI1XCIsXCI2XCIsXCI3XCIsXCI4XCIsXCI5XCIsXCIrXCIsXCIvXCJdO3dpbmRvdy51dGlscz17fSx3aW5kb3cudXRpbHMuY2xlYW49dCx3aW5kb3cudXRpbHMucGFkPW4sd2luZG93LnV0aWxzLmV4dGVuZD1lLHdpbmRvdy51dGlscy5zdHJpbmdUb1VpbnQ4PWksd2luZG93LnV0aWxzLnVpbnQ4VG9CYXNlNjQ9cn0oKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxpKXt2YXIgcj1uLmNsZWFuKDUxMiksbz0wO3JldHVybiBlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIG4saSxhPXRbZS5maWVsZF18fFwiXCI7Zm9yKG49MCxpPWEubGVuZ3RoO248aTtuKz0xKXJbb109YS5jaGFyQ29kZUF0KG4pLG8rPTE7bys9ZS5sZW5ndGgtbn0pLFwiZnVuY3Rpb25cIj09dHlwZW9mIGk/aShyLG8pOnJ9dmFyIGUsbj13aW5kb3cudXRpbHM7ZT1be2ZpZWxkOlwiZmlsZU5hbWVcIixsZW5ndGg6MTAwfSx7ZmllbGQ6XCJmaWxlTW9kZVwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJ1aWRcIixsZW5ndGg6OH0se2ZpZWxkOlwiZ2lkXCIsbGVuZ3RoOjh9LHtmaWVsZDpcImZpbGVTaXplXCIsbGVuZ3RoOjEyfSx7ZmllbGQ6XCJtdGltZVwiLGxlbmd0aDoxMn0se2ZpZWxkOlwiY2hlY2tzdW1cIixsZW5ndGg6OH0se2ZpZWxkOlwidHlwZVwiLGxlbmd0aDoxfSx7ZmllbGQ6XCJsaW5rTmFtZVwiLGxlbmd0aDoxMDB9LHtmaWVsZDpcInVzdGFyXCIsbGVuZ3RoOjh9LHtmaWVsZDpcIm93bmVyXCIsbGVuZ3RoOjMyfSx7ZmllbGQ6XCJncm91cFwiLGxlbmd0aDozMn0se2ZpZWxkOlwibWFqb3JOdW1iZXJcIixsZW5ndGg6OH0se2ZpZWxkOlwibWlub3JOdW1iZXJcIixsZW5ndGg6OH0se2ZpZWxkOlwiZmlsZW5hbWVQcmVmaXhcIixsZW5ndGg6MTU1fSx7ZmllbGQ6XCJwYWRkaW5nXCIsbGVuZ3RoOjEyfV0sd2luZG93LmhlYWRlcj17fSx3aW5kb3cuaGVhZGVyLnN0cnVjdHVyZT1lLHdpbmRvdy5oZWFkZXIuZm9ybWF0PXR9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3RoaXMud3JpdHRlbj0wLGU9KHR8fDIwKSpyLHRoaXMub3V0PWkuY2xlYW4oZSksdGhpcy5ibG9ja3M9W10sdGhpcy5sZW5ndGg9MH12YXIgZSxuPXdpbmRvdy5oZWFkZXIsaT13aW5kb3cudXRpbHMscj01MTI7dC5wcm90b3R5cGUuYXBwZW5kPWZ1bmN0aW9uKHQsZSxvLGEpe3ZhciBzLGgsZCx1LGMsZixsO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlKWU9aS5zdHJpbmdUb1VpbnQ4KGUpO2Vsc2UgaWYoZS5jb25zdHJ1Y3RvciE9PVVpbnQ4QXJyYXkucHJvdG90eXBlLmNvbnN0cnVjdG9yKXRocm93XCJJbnZhbGlkIGlucHV0IHR5cGUuIFlvdSBnYXZlIG1lOiBcIitlLmNvbnN0cnVjdG9yLnRvU3RyaW5nKCkubWF0Y2goL2Z1bmN0aW9uXFxzKihbJEEtWmEtel9dWzAtOUEtWmEtel9dKilcXHMqXFwoLylbMV07XCJmdW5jdGlvblwiPT10eXBlb2YgbyYmKGE9byxvPXt9KSxvPW98fHt9LGQ9by5tb2RlfHw0MDk1JnBhcnNlSW50KFwiNzc3XCIsOCksdT1vLm10aW1lfHxNYXRoLmZsb29yKCtuZXcgRGF0ZS8xZTMpLGM9by51aWR8fDAsZj1vLmdpZHx8MCxzPXtmaWxlTmFtZTp0LGZpbGVNb2RlOmkucGFkKGQsNyksdWlkOmkucGFkKGMsNyksZ2lkOmkucGFkKGYsNyksZmlsZVNpemU6aS5wYWQoZS5sZW5ndGgsMTEpLG10aW1lOmkucGFkKHUsMTEpLGNoZWNrc3VtOlwiICAgICAgICBcIix0eXBlOlwiMFwiLHVzdGFyOlwidXN0YXIgIFwiLG93bmVyOm8ub3duZXJ8fFwiXCIsZ3JvdXA6by5ncm91cHx8XCJcIn0saD0wLE9iamVjdC5rZXlzKHMpLmZvckVhY2goZnVuY3Rpb24odCl7dmFyIGUsbixpPXNbdF07Zm9yKGU9MCxuPWkubGVuZ3RoO2U8bjtlKz0xKWgrPWkuY2hhckNvZGVBdChlKX0pLHMuY2hlY2tzdW09aS5wYWQoaCw2KStcIlxcMCBcIixsPW4uZm9ybWF0KHMpO3ZhciBwPU1hdGguY2VpbChsLmxlbmd0aC9yKSpyLG09TWF0aC5jZWlsKGUubGVuZ3RoL3IpKnI7dGhpcy5ibG9ja3MucHVzaCh7aGVhZGVyOmwsaW5wdXQ6ZSxoZWFkZXJMZW5ndGg6cCxpbnB1dExlbmd0aDptfSl9LHQucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24oKXt2YXIgdD1bXSxlPVtdLG49MCxpPU1hdGgucG93KDIsMjApLG89W107cmV0dXJuIHRoaXMuYmxvY2tzLmZvckVhY2goZnVuY3Rpb24odCl7bit0LmhlYWRlckxlbmd0aCt0LmlucHV0TGVuZ3RoPmkmJihlLnB1c2goe2Jsb2NrczpvLGxlbmd0aDpufSksbz1bXSxuPTApLG8ucHVzaCh0KSxuKz10LmhlYWRlckxlbmd0aCt0LmlucHV0TGVuZ3RofSksZS5wdXNoKHtibG9ja3M6byxsZW5ndGg6bn0pLGUuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgbj1uZXcgVWludDhBcnJheShlLmxlbmd0aCksaT0wO2UuYmxvY2tzLmZvckVhY2goZnVuY3Rpb24odCl7bi5zZXQodC5oZWFkZXIsaSksaSs9dC5oZWFkZXJMZW5ndGgsbi5zZXQodC5pbnB1dCxpKSxpKz10LmlucHV0TGVuZ3RofSksdC5wdXNoKG4pfSksdC5wdXNoKG5ldyBVaW50OEFycmF5KDIqcikpLG5ldyBCbG9iKHQse3R5cGU6XCJvY3RldC9zdHJlYW1cIn0pfSx0LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMud3JpdHRlbj0wLHRoaXMub3V0PWkuY2xlYW4oZSl9LHdpbmRvdy5UYXI9dH0oKSxmdW5jdGlvbih0KXtmdW5jdGlvbiBlKHQsbil7aWYoe30uaGFzT3duUHJvcGVydHkuY2FsbChlLmNhY2hlLHQpKXJldHVybiBlLmNhY2hlW3RdO3ZhciBpPWUucmVzb2x2ZSh0KTtpZighaSl0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gcmVzb2x2ZSBtb2R1bGUgXCIrdCk7dmFyIHI9e2lkOnQscmVxdWlyZTplLGZpbGVuYW1lOnQsZXhwb3J0czp7fSxsb2FkZWQ6ITEscGFyZW50Om4sY2hpbGRyZW46W119O24mJm4uY2hpbGRyZW4ucHVzaChyKTt2YXIgbz10LnNsaWNlKDAsdC5sYXN0SW5kZXhPZihcIi9cIikrMSk7cmV0dXJuIGUuY2FjaGVbdF09ci5leHBvcnRzLGkuY2FsbChyLmV4cG9ydHMscixyLmV4cG9ydHMsbyx0KSxyLmxvYWRlZD0hMCxlLmNhY2hlW3RdPXIuZXhwb3J0c31lLm1vZHVsZXM9e30sZS5jYWNoZT17fSxlLnJlc29sdmU9ZnVuY3Rpb24odCl7cmV0dXJue30uaGFzT3duUHJvcGVydHkuY2FsbChlLm1vZHVsZXMsdCk/ZS5tb2R1bGVzW3RdOnZvaWQgMH0sZS5kZWZpbmU9ZnVuY3Rpb24odCxuKXtlLm1vZHVsZXNbdF09bn07dmFyIG49ZnVuY3Rpb24oZSl7cmV0dXJuIGU9XCIvXCIse3RpdGxlOlwiYnJvd3NlclwiLHZlcnNpb246XCJ2MC4xMC4yNlwiLGJyb3dzZXI6ITAsZW52Ont9LGFyZ3Y6W10sbmV4dFRpY2s6dC5zZXRJbW1lZGlhdGV8fGZ1bmN0aW9uKHQpe3NldFRpbWVvdXQodCwwKX0sY3dkOmZ1bmN0aW9uKCl7cmV0dXJuIGV9LGNoZGlyOmZ1bmN0aW9uKHQpe2U9dH19fSgpO2UuZGVmaW5lKFwiL2dpZi5jb2ZmZWVcIixmdW5jdGlvbih0LG4saSxyKXtmdW5jdGlvbiBvKHQsZSl7cmV0dXJue30uaGFzT3duUHJvcGVydHkuY2FsbCh0LGUpfWZ1bmN0aW9uIGEodCxlKXtmb3IodmFyIG49MCxpPWUubGVuZ3RoO248aTsrK24paWYobiBpbiBlJiZlW25dPT09dClyZXR1cm4hMDtyZXR1cm4hMX1mdW5jdGlvbiBzKHQsZSl7ZnVuY3Rpb24gbigpe3RoaXMuY29uc3RydWN0b3I9dH1mb3IodmFyIGkgaW4gZSlvKGUsaSkmJih0W2ldPWVbaV0pO3JldHVybiBuLnByb3RvdHlwZT1lLnByb3RvdHlwZSx0LnByb3RvdHlwZT1uZXcgbix0Ll9fc3VwZXJfXz1lLnByb3RvdHlwZSx0fXZhciBoLGQsdSxjLGY7dT1lKFwiZXZlbnRzXCIsdCkuRXZlbnRFbWl0dGVyLGg9ZShcIi9icm93c2VyLmNvZmZlZVwiLHQpLGY9ZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0KXt2YXIgZSxuO3RoaXMucnVubmluZz0hMSx0aGlzLm9wdGlvbnM9e30sdGhpcy5mcmFtZXM9W10sdGhpcy5mcmVlV29ya2Vycz1bXSx0aGlzLmFjdGl2ZVdvcmtlcnM9W10sdGhpcy5zZXRPcHRpb25zKHQpO2ZvcihlIGluIGQpbj1kW2VdLG51bGwhPXRoaXMub3B0aW9uc1tlXT90aGlzLm9wdGlvbnNbZV06dGhpcy5vcHRpb25zW2VdPW59cmV0dXJuIHMoZSx0KSxkPXt3b3JrZXJTY3JpcHQ6XCJnaWYud29ya2VyLmpzXCIsd29ya2VyczoyLHJlcGVhdDowLGJhY2tncm91bmQ6XCIjZmZmXCIscXVhbGl0eToxMCx3aWR0aDpudWxsLGhlaWdodDpudWxsLHRyYW5zcGFyZW50Om51bGx9LGM9e2RlbGF5OjUwMCxjb3B5OiExfSxlLnByb3RvdHlwZS5zZXRPcHRpb249ZnVuY3Rpb24odCxlKXtyZXR1cm4gdGhpcy5vcHRpb25zW3RdPWUsbnVsbD09dGhpcy5fY2FudmFzfHxcIndpZHRoXCIhPT10JiZcImhlaWdodFwiIT09dD92b2lkIDA6dGhpcy5fY2FudmFzW3RdPWV9LGUucHJvdG90eXBlLnNldE9wdGlvbnM9ZnVuY3Rpb24odCl7dmFyIGUsbjtyZXR1cm4gZnVuY3Rpb24oaSl7Zm9yKGUgaW4gdClvKHQsZSkmJihuPXRbZV0saS5wdXNoKHRoaXMuc2V0T3B0aW9uKGUsbikpKTtyZXR1cm4gaX0uY2FsbCh0aGlzLFtdKX0sZS5wcm90b3R5cGUuYWRkRnJhbWU9ZnVuY3Rpb24odCxlKXt2YXIgbixpO251bGw9PWUmJihlPXt9KSxuPXt9LG4udHJhbnNwYXJlbnQ9dGhpcy5vcHRpb25zLnRyYW5zcGFyZW50O2ZvcihpIGluIGMpbltpXT1lW2ldfHxjW2ldO2lmKG51bGwhPXRoaXMub3B0aW9ucy53aWR0aHx8dGhpcy5zZXRPcHRpb24oXCJ3aWR0aFwiLHQud2lkdGgpLG51bGwhPXRoaXMub3B0aW9ucy5oZWlnaHR8fHRoaXMuc2V0T3B0aW9uKFwiaGVpZ2h0XCIsdC5oZWlnaHQpLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBJbWFnZURhdGEmJm51bGwhPUltYWdlRGF0YSYmdCBpbnN0YW5jZW9mIEltYWdlRGF0YSluLmRhdGE9dC5kYXRhO2Vsc2UgaWYoXCJ1bmRlZmluZWRcIiE9dHlwZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCYmbnVsbCE9Q2FudmFzUmVuZGVyaW5nQ29udGV4dDJEJiZ0IGluc3RhbmNlb2YgQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEfHxcInVuZGVmaW5lZFwiIT10eXBlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0JiZudWxsIT1XZWJHTFJlbmRlcmluZ0NvbnRleHQmJnQgaW5zdGFuY2VvZiBXZWJHTFJlbmRlcmluZ0NvbnRleHQpZS5jb3B5P24uZGF0YT10aGlzLmdldENvbnRleHREYXRhKHQpOm4uY29udGV4dD10O2Vsc2V7aWYobnVsbD09dC5jaGlsZE5vZGVzKXRocm93IG5ldyBFcnJvcihcIkludmFsaWQgaW1hZ2VcIik7ZS5jb3B5P24uZGF0YT10aGlzLmdldEltYWdlRGF0YSh0KTpuLmltYWdlPXR9cmV0dXJuIHRoaXMuZnJhbWVzLnB1c2gobil9LGUucHJvdG90eXBlLnJlbmRlcj1mdW5jdGlvbigpe3ZhciB0LGU7aWYodGhpcy5ydW5uaW5nKXRocm93IG5ldyBFcnJvcihcIkFscmVhZHkgcnVubmluZ1wiKTtpZihudWxsPT10aGlzLm9wdGlvbnMud2lkdGh8fG51bGw9PXRoaXMub3B0aW9ucy5oZWlnaHQpdGhyb3cgbmV3IEVycm9yKFwiV2lkdGggYW5kIGhlaWdodCBtdXN0IGJlIHNldCBwcmlvciB0byByZW5kZXJpbmdcIik7dGhpcy5ydW5uaW5nPSEwLHRoaXMubmV4dEZyYW1lPTAsdGhpcy5maW5pc2hlZEZyYW1lcz0wLHRoaXMuaW1hZ2VQYXJ0cz1mdW5jdGlvbihlKXtmb3IodmFyIG49ZnVuY3Rpb24oKXt2YXIgdDt0PVtdO2Zvcih2YXIgZT0wOzA8PXRoaXMuZnJhbWVzLmxlbmd0aD9lPHRoaXMuZnJhbWVzLmxlbmd0aDplPnRoaXMuZnJhbWVzLmxlbmd0aDswPD10aGlzLmZyYW1lcy5sZW5ndGg/KytlOi0tZSl0LnB1c2goZSk7cmV0dXJuIHR9LmFwcGx5KHRoaXMsYXJndW1lbnRzKSxpPTAscj1uLmxlbmd0aDtpPHI7KytpKXQ9bltpXSxlLnB1c2gobnVsbCk7cmV0dXJuIGV9LmNhbGwodGhpcyxbXSksZT10aGlzLnNwYXduV29ya2VycygpO2Zvcih2YXIgbj1mdW5jdGlvbigpe3ZhciB0O3Q9W107Zm9yKHZhciBuPTA7MDw9ZT9uPGU6bj5lOzA8PWU/KytuOi0tbil0LnB1c2gobik7cmV0dXJuIHR9LmFwcGx5KHRoaXMsYXJndW1lbnRzKSxpPTAscj1uLmxlbmd0aDtpPHI7KytpKXQ9bltpXSx0aGlzLnJlbmRlck5leHRGcmFtZSgpO3JldHVybiB0aGlzLmVtaXQoXCJzdGFydFwiKSx0aGlzLmVtaXQoXCJwcm9ncmVzc1wiLDApfSxlLnByb3RvdHlwZS5hYm9ydD1mdW5jdGlvbigpe2Zvcih2YXIgdDs7KXtpZih0PXRoaXMuYWN0aXZlV29ya2Vycy5zaGlmdCgpLCEobnVsbCE9dCkpYnJlYWs7Y29uc29sZS5sb2coXCJraWxsaW5nIGFjdGl2ZSB3b3JrZXJcIiksdC50ZXJtaW5hdGUoKX1yZXR1cm4gdGhpcy5ydW5uaW5nPSExLHRoaXMuZW1pdChcImFib3J0XCIpfSxlLnByb3RvdHlwZS5zcGF3bldvcmtlcnM9ZnVuY3Rpb24oKXt2YXIgdDtyZXR1cm4gdD1NYXRoLm1pbih0aGlzLm9wdGlvbnMud29ya2Vycyx0aGlzLmZyYW1lcy5sZW5ndGgpLGZ1bmN0aW9uKCl7dmFyIGU7ZT1bXTtmb3IodmFyIG49dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg7dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg8PXQ/bjx0Om4+dDt0aGlzLmZyZWVXb3JrZXJzLmxlbmd0aDw9dD8rK246LS1uKWUucHVzaChuKTtyZXR1cm4gZX0uYXBwbHkodGhpcyxhcmd1bWVudHMpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3ZhciBuO3JldHVybiBjb25zb2xlLmxvZyhcInNwYXduaW5nIHdvcmtlciBcIitlKSxuPW5ldyBXb3JrZXIodC5vcHRpb25zLndvcmtlclNjcmlwdCksbi5vbm1lc3NhZ2U9ZnVuY3Rpb24odCl7cmV0dXJuIGZ1bmN0aW9uKGUpe3JldHVybiB0LmFjdGl2ZVdvcmtlcnMuc3BsaWNlKHQuYWN0aXZlV29ya2Vycy5pbmRleE9mKG4pLDEpLHQuZnJlZVdvcmtlcnMucHVzaChuKSx0LmZyYW1lRmluaXNoZWQoZS5kYXRhKX19KHQpLHQuZnJlZVdvcmtlcnMucHVzaChuKX19KHRoaXMpKSx0fSxlLnByb3RvdHlwZS5mcmFtZUZpbmlzaGVkPWZ1bmN0aW9uKHQpe3JldHVybiBjb25zb2xlLmxvZyhcImZyYW1lIFwiK3QuaW5kZXgrXCIgZmluaXNoZWQgLSBcIit0aGlzLmFjdGl2ZVdvcmtlcnMubGVuZ3RoK1wiIGFjdGl2ZVwiKSx0aGlzLmZpbmlzaGVkRnJhbWVzKyssdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIix0aGlzLmZpbmlzaGVkRnJhbWVzL3RoaXMuZnJhbWVzLmxlbmd0aCksdGhpcy5pbWFnZVBhcnRzW3QuaW5kZXhdPXQsYShudWxsLHRoaXMuaW1hZ2VQYXJ0cyk/dGhpcy5yZW5kZXJOZXh0RnJhbWUoKTp0aGlzLmZpbmlzaFJlbmRlcmluZygpfSxlLnByb3RvdHlwZS5maW5pc2hSZW5kZXJpbmc9ZnVuY3Rpb24oKXt2YXIgdCxlLG4saSxyLG8sYTtyPTA7Zm9yKHZhciBzPTAsaD10aGlzLmltYWdlUGFydHMubGVuZ3RoO3M8aDsrK3MpZT10aGlzLmltYWdlUGFydHNbc10scis9KGUuZGF0YS5sZW5ndGgtMSkqZS5wYWdlU2l6ZStlLmN1cnNvcjtyKz1lLnBhZ2VTaXplLWUuY3Vyc29yLGNvbnNvbGUubG9nKFwicmVuZGVyaW5nIGZpbmlzaGVkIC0gZmlsZXNpemUgXCIrTWF0aC5yb3VuZChyLzFlMykrXCJrYlwiKSx0PW5ldyBVaW50OEFycmF5KHIpLG89MDtmb3IodmFyIGQ9MCx1PXRoaXMuaW1hZ2VQYXJ0cy5sZW5ndGg7ZDx1OysrZCl7ZT10aGlzLmltYWdlUGFydHNbZF07Zm9yKHZhciBjPTAsZj1lLmRhdGEubGVuZ3RoO2M8ZjsrK2MpYT1lLmRhdGFbY10sbj1jLHQuc2V0KGEsbyksbys9bj09PWUuZGF0YS5sZW5ndGgtMT9lLmN1cnNvcjplLnBhZ2VTaXplfXJldHVybiBpPW5ldyBCbG9iKFt0XSx7dHlwZTpcImltYWdlL2dpZlwifSksdGhpcy5lbWl0KFwiZmluaXNoZWRcIixpLHQpfSxlLnByb3RvdHlwZS5yZW5kZXJOZXh0RnJhbWU9ZnVuY3Rpb24oKXt2YXIgdCxlLG47aWYoMD09PXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoKXRocm93IG5ldyBFcnJvcihcIk5vIGZyZWUgd29ya2Vyc1wiKTtyZXR1cm4gdGhpcy5uZXh0RnJhbWU+PXRoaXMuZnJhbWVzLmxlbmd0aD92b2lkIDA6KHQ9dGhpcy5mcmFtZXNbdGhpcy5uZXh0RnJhbWUrK10sbj10aGlzLmZyZWVXb3JrZXJzLnNoaWZ0KCksZT10aGlzLmdldFRhc2sodCksY29uc29sZS5sb2coXCJzdGFydGluZyBmcmFtZSBcIisoZS5pbmRleCsxKStcIiBvZiBcIit0aGlzLmZyYW1lcy5sZW5ndGgpLHRoaXMuYWN0aXZlV29ya2Vycy5wdXNoKG4pLG4ucG9zdE1lc3NhZ2UoZSkpfSxlLnByb3RvdHlwZS5nZXRDb250ZXh0RGF0YT1mdW5jdGlvbih0KXtyZXR1cm4gdC5nZXRJbWFnZURhdGEoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KS5kYXRhfSxlLnByb3RvdHlwZS5nZXRJbWFnZURhdGE9ZnVuY3Rpb24odCl7dmFyIGU7cmV0dXJuIG51bGwhPXRoaXMuX2NhbnZhc3x8KHRoaXMuX2NhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHRoaXMuX2NhbnZhcy53aWR0aD10aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5fY2FudmFzLmhlaWdodD10aGlzLm9wdGlvbnMuaGVpZ2h0KSxlPXRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksZS5zZXRGaWxsPXRoaXMub3B0aW9ucy5iYWNrZ3JvdW5kLGUuZmlsbFJlY3QoMCwwLHRoaXMub3B0aW9ucy53aWR0aCx0aGlzLm9wdGlvbnMuaGVpZ2h0KSxlLmRyYXdJbWFnZSh0LDAsMCksdGhpcy5nZXRDb250ZXh0RGF0YShlKX0sZS5wcm90b3R5cGUuZ2V0VGFzaz1mdW5jdGlvbih0KXt2YXIgZSxuO2lmKGU9dGhpcy5mcmFtZXMuaW5kZXhPZih0KSxuPXtpbmRleDplLGxhc3Q6ZT09PXRoaXMuZnJhbWVzLmxlbmd0aC0xLGRlbGF5OnQuZGVsYXksdHJhbnNwYXJlbnQ6dC50cmFuc3BhcmVudCx3aWR0aDp0aGlzLm9wdGlvbnMud2lkdGgsaGVpZ2h0OnRoaXMub3B0aW9ucy5oZWlnaHQscXVhbGl0eTp0aGlzLm9wdGlvbnMucXVhbGl0eSxyZXBlYXQ6dGhpcy5vcHRpb25zLnJlcGVhdCxjYW5UcmFuc2ZlcjpcImNocm9tZVwiPT09aC5uYW1lfSxudWxsIT10LmRhdGEpbi5kYXRhPXQuZGF0YTtlbHNlIGlmKG51bGwhPXQuY29udGV4dCluLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YSh0LmNvbnRleHQpO2Vsc2V7aWYobnVsbD09dC5pbWFnZSl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGZyYW1lXCIpO24uZGF0YT10aGlzLmdldEltYWdlRGF0YSh0LmltYWdlKX1yZXR1cm4gbn0sZX0odSksdC5leHBvcnRzPWZ9KSxlLmRlZmluZShcIi9icm93c2VyLmNvZmZlZVwiLGZ1bmN0aW9uKHQsZSxuLGkpe3ZhciByLG8sYSxzLGg7cz1uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCksYT1uYXZpZ2F0b3IucGxhdGZvcm0udG9Mb3dlckNhc2UoKSxoPXMubWF0Y2goLyhvcGVyYXxpZXxmaXJlZm94fGNocm9tZXx2ZXJzaW9uKVtcXHNcXC86XShbXFx3XFxkXFwuXSspPy4qPyhzYWZhcml8dmVyc2lvbltcXHNcXC86XShbXFx3XFxkXFwuXSspfCQpLyl8fFtudWxsLFwidW5rbm93blwiLDBdLG89XCJpZVwiPT09aFsxXSYmZG9jdW1lbnQuZG9jdW1lbnRNb2RlLHI9e25hbWU6XCJ2ZXJzaW9uXCI9PT1oWzFdP2hbM106aFsxXSx2ZXJzaW9uOm98fHBhcnNlRmxvYXQoXCJvcGVyYVwiPT09aFsxXSYmaFs0XT9oWzRdOmhbMl0pLHBsYXRmb3JtOntuYW1lOnMubWF0Y2goL2lwKD86YWR8b2R8aG9uZSkvKT9cImlvc1wiOihzLm1hdGNoKC8oPzp3ZWJvc3xhbmRyb2lkKS8pfHxhLm1hdGNoKC9tYWN8d2lufGxpbnV4Lyl8fFtcIm90aGVyXCJdKVswXX19LHJbci5uYW1lXT0hMCxyW3IubmFtZStwYXJzZUludChyLnZlcnNpb24sMTApXT0hMCxyLnBsYXRmb3JtW3IucGxhdGZvcm0ubmFtZV09ITAsdC5leHBvcnRzPXJ9KSxlLmRlZmluZShcImV2ZW50c1wiLGZ1bmN0aW9uKHQsZSxpLHIpe24uRXZlbnRFbWl0dGVyfHwobi5FdmVudEVtaXR0ZXI9ZnVuY3Rpb24oKXt9KTt2YXIgbz1lLkV2ZW50RW1pdHRlcj1uLkV2ZW50RW1pdHRlcixhPVwiZnVuY3Rpb25cIj09dHlwZW9mIEFycmF5LmlzQXJyYXk/QXJyYXkuaXNBcnJheTpmdW5jdGlvbih0KXtyZXR1cm5cIltvYmplY3QgQXJyYXldXCI9PT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCl9LHM9MTA7by5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzPWZ1bmN0aW9uKHQpe3RoaXMuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz17fSksdGhpcy5fZXZlbnRzLm1heExpc3RlbmVycz10fSxvLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHQpe2lmKFwiZXJyb3JcIj09PXQmJighdGhpcy5fZXZlbnRzfHwhdGhpcy5fZXZlbnRzLmVycm9yfHxhKHRoaXMuX2V2ZW50cy5lcnJvcikmJiF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSl0aHJvdyBhcmd1bWVudHNbMV1pbnN0YW5jZW9mIEVycm9yP2FyZ3VtZW50c1sxXTpuZXcgRXJyb3IoXCJVbmNhdWdodCwgdW5zcGVjaWZpZWQgJ2Vycm9yJyBldmVudC5cIik7aWYoIXRoaXMuX2V2ZW50cylyZXR1cm4hMTt2YXIgZT10aGlzLl9ldmVudHNbdF07aWYoIWUpcmV0dXJuITE7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZSl7aWYoYShlKSl7Zm9yKHZhciBuPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSxpPWUuc2xpY2UoKSxyPTAsbz1pLmxlbmd0aDtyPG87cisrKWlbcl0uYXBwbHkodGhpcyxuKTtyZXR1cm4hMH1yZXR1cm4hMX1zd2l0Y2goYXJndW1lbnRzLmxlbmd0aCl7Y2FzZSAxOmUuY2FsbCh0aGlzKTticmVhaztjYXNlIDI6ZS5jYWxsKHRoaXMsYXJndW1lbnRzWzFdKTticmVhaztjYXNlIDM6ZS5jYWxsKHRoaXMsYXJndW1lbnRzWzFdLGFyZ3VtZW50c1syXSk7YnJlYWs7ZGVmYXVsdDp2YXIgbj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSk7ZS5hcHBseSh0aGlzLG4pfXJldHVybiEwfSxvLnByb3RvdHlwZS5hZGRMaXN0ZW5lcj1mdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwiYWRkTGlzdGVuZXIgb25seSB0YWtlcyBpbnN0YW5jZXMgb2YgRnVuY3Rpb25cIik7aWYodGhpcy5fZXZlbnRzfHwodGhpcy5fZXZlbnRzPXt9KSx0aGlzLmVtaXQoXCJuZXdMaXN0ZW5lclwiLHQsZSksdGhpcy5fZXZlbnRzW3RdKWlmKGEodGhpcy5fZXZlbnRzW3RdKSl7aWYoIXRoaXMuX2V2ZW50c1t0XS53YXJuZWQpe3ZhciBuO249dm9pZCAwIT09dGhpcy5fZXZlbnRzLm1heExpc3RlbmVycz90aGlzLl9ldmVudHMubWF4TGlzdGVuZXJzOnMsbiYmbj4wJiZ0aGlzLl9ldmVudHNbdF0ubGVuZ3RoPm4mJih0aGlzLl9ldmVudHNbdF0ud2FybmVkPSEwLGNvbnNvbGUuZXJyb3IoXCIobm9kZSkgd2FybmluZzogcG9zc2libGUgRXZlbnRFbWl0dGVyIG1lbW9yeSBsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuIFVzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LlwiLHRoaXMuX2V2ZW50c1t0XS5sZW5ndGgpLGNvbnNvbGUudHJhY2UoKSl9dGhpcy5fZXZlbnRzW3RdLnB1c2goZSl9ZWxzZSB0aGlzLl9ldmVudHNbdF09W3RoaXMuX2V2ZW50c1t0XSxlXTtlbHNlIHRoaXMuX2V2ZW50c1t0XT1lO3JldHVybiB0aGlzfSxvLnByb3RvdHlwZS5vbj1vLnByb3RvdHlwZS5hZGRMaXN0ZW5lcixvLnByb3RvdHlwZS5vbmNlPWZ1bmN0aW9uKHQsZSl7dmFyIG49dGhpcztyZXR1cm4gbi5vbih0LGZ1bmN0aW9uIGkoKXtuLnJlbW92ZUxpc3RlbmVyKHQsaSksZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9KSx0aGlzfSxvLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lcj1mdW5jdGlvbih0LGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgbmV3IEVycm9yKFwicmVtb3ZlTGlzdGVuZXIgb25seSB0YWtlcyBpbnN0YW5jZXMgb2YgRnVuY3Rpb25cIik7aWYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50c1t0XSlyZXR1cm4gdGhpczt2YXIgbj10aGlzLl9ldmVudHNbdF07aWYoYShuKSl7dmFyIGk9bi5pbmRleE9mKGUpO2lmKGk8MClyZXR1cm4gdGhpcztuLnNwbGljZShpLDEpLDA9PW4ubGVuZ3RoJiZkZWxldGUgdGhpcy5fZXZlbnRzW3RdfWVsc2UgdGhpcy5fZXZlbnRzW3RdPT09ZSYmZGVsZXRlIHRoaXMuX2V2ZW50c1t0XTtyZXR1cm4gdGhpc30sby5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzPWZ1bmN0aW9uKHQpe3JldHVybiB0JiZ0aGlzLl9ldmVudHMmJnRoaXMuX2V2ZW50c1t0XSYmKHRoaXMuX2V2ZW50c1t0XT1udWxsKSx0aGlzfSxvLnByb3RvdHlwZS5saXN0ZW5lcnM9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz17fSksdGhpcy5fZXZlbnRzW3RdfHwodGhpcy5fZXZlbnRzW3RdPVtdKSxhKHRoaXMuX2V2ZW50c1t0XSl8fCh0aGlzLl9ldmVudHNbdF09W3RoaXMuX2V2ZW50c1t0XV0pLHRoaXMuX2V2ZW50c1t0XX19KSx0LkdJRj1lKFwiL2dpZi5jb2ZmZWVcIil9LmNhbGwodGhpcyx0aGlzKSxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCl7cmV0dXJuIHQmJnQuT2JqZWN0PT09T2JqZWN0P3Q6bnVsbH1mdW5jdGlvbiBlKHQpe3JldHVybiBTdHJpbmcoXCIwMDAwMDAwXCIrdCkuc2xpY2UoLTcpfWZ1bmN0aW9uIG4oKXtmdW5jdGlvbiB0KCl7cmV0dXJuIE1hdGguZmxvb3IoNjU1MzYqKDErTWF0aC5yYW5kb20oKSkpLnRvU3RyaW5nKDE2KS5zdWJzdHJpbmcoMSl9cmV0dXJuIHQoKSt0KCkrXCItXCIrdCgpK1wiLVwiK3QoKStcIi1cIit0KCkrXCItXCIrdCgpK3QoKSt0KCl9ZnVuY3Rpb24gaSh0KXt2YXIgZT17fTt0aGlzLnNldHRpbmdzPXQsdGhpcy5vbj1mdW5jdGlvbih0LG4pe2VbdF09bn0sdGhpcy5lbWl0PWZ1bmN0aW9uKHQpe3ZhciBuPWVbdF07biYmbi5hcHBseShudWxsLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSl9LHRoaXMuZmlsZW5hbWU9dC5uYW1lfHxuKCksdGhpcy5leHRlbnNpb249XCJcIix0aGlzLm1pbWVUeXBlPVwiXCJ9ZnVuY3Rpb24gcih0KXtpLmNhbGwodGhpcyx0KSx0aGlzLmV4dGVuc2lvbj1cIi50YXJcIix0aGlzLm1pbWVUeXBlPVwiYXBwbGljYXRpb24veC10YXJcIix0aGlzLmZpbGVFeHRlbnNpb249XCJcIix0aGlzLnRhcGU9bnVsbCx0aGlzLmNvdW50PTB9ZnVuY3Rpb24gbyh0KXtyLmNhbGwodGhpcyx0KSx0aGlzLnR5cGU9XCJpbWFnZS9wbmdcIix0aGlzLmZpbGVFeHRlbnNpb249XCIucG5nXCJ9ZnVuY3Rpb24gYSh0KXtyLmNhbGwodGhpcyx0KSx0aGlzLnR5cGU9XCJpbWFnZS9qcGVnXCIsdGhpcy5maWxlRXh0ZW5zaW9uPVwiLmpwZ1wiLHRoaXMucXVhbGl0eT10LnF1YWxpdHkvMTAwfHwuOH1mdW5jdGlvbiBzKHQpe3ZhciBlPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJjYW52YXNcIik7XCJpbWFnZS93ZWJwXCIhPT1lLnRvRGF0YVVSTChcImltYWdlL3dlYnBcIikuc3Vic3RyKDUsMTApJiZjb25zb2xlLmxvZyhcIldlYlAgbm90IHN1cHBvcnRlZCAtIHRyeSBhbm90aGVyIGV4cG9ydCBmb3JtYXRcIiksaS5jYWxsKHRoaXMsdCksdGhpcy5xdWFsaXR5PXQucXVhbGl0eS8xMDB8fC44LHRoaXMuZXh0ZW5zaW9uPVwiLndlYm1cIix0aGlzLm1pbWVUeXBlPVwidmlkZW8vd2VibVwiLHRoaXMuYmFzZUZpbGVuYW1lPXRoaXMuZmlsZW5hbWUsdGhpcy5mcmFtZXM9W10sdGhpcy5wYXJ0PTF9ZnVuY3Rpb24gaCh0KXtpLmNhbGwodGhpcyx0KSx0LnF1YWxpdHk9dC5xdWFsaXR5LzEwMHx8LjgsdGhpcy5lbmNvZGVyPW5ldyBGRk1wZWdTZXJ2ZXIuVmlkZW8odCksdGhpcy5lbmNvZGVyLm9uKFwicHJvY2Vzc1wiLGZ1bmN0aW9uKCl7dGhpcy5lbWl0KFwicHJvY2Vzc1wiKX0uYmluZCh0aGlzKSksdGhpcy5lbmNvZGVyLm9uKFwiZmluaXNoZWRcIixmdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMuY2FsbGJhY2s7biYmKHRoaXMuY2FsbGJhY2s9dm9pZCAwLG4odCxlKSl9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcInByb2dyZXNzXCIsZnVuY3Rpb24odCl7dGhpcy5zZXR0aW5ncy5vblByb2dyZXNzJiZ0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3ModCl9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcImVycm9yXCIsZnVuY3Rpb24odCl7YWxlcnQoSlNPTi5zdHJpbmdpZnkodCxudWxsLDIpKX0uYmluZCh0aGlzKSl9ZnVuY3Rpb24gZCh0KXtpLmNhbGwodGhpcyx0KSx0aGlzLmZyYW1lcmF0ZT10aGlzLnNldHRpbmdzLmZyYW1lcmF0ZSx0aGlzLnR5cGU9XCJ2aWRlby93ZWJtXCIsdGhpcy5leHRlbnNpb249XCIud2VibVwiLHRoaXMuc3RyZWFtPW51bGwsdGhpcy5tZWRpYVJlY29yZGVyPW51bGwsdGhpcy5jaHVua3M9W119ZnVuY3Rpb24gdSh0KXtpLmNhbGwodGhpcyx0KSx0LnF1YWxpdHk9MzEtKDMwKnQucXVhbGl0eS8xMDB8fDEwKSx0LndvcmtlcnM9dC53b3JrZXJzfHw0LHRoaXMuZXh0ZW5zaW9uPVwiLmdpZlwiLHRoaXMubWltZVR5cGU9XCJpbWFnZS9naWZcIix0aGlzLmNhbnZhcz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLHRoaXMuY3R4PXRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKSx0aGlzLnNpemVTZXQ9ITEsdGhpcy5lbmNvZGVyPW5ldyBHSUYoe3dvcmtlcnM6dC53b3JrZXJzLHF1YWxpdHk6dC5xdWFsaXR5LHdvcmtlclNjcmlwdDp0LndvcmtlcnNQYXRoK1wiZ2lmLndvcmtlci5qc1wifSksdGhpcy5lbmNvZGVyLm9uKFwicHJvZ3Jlc3NcIixmdW5jdGlvbih0KXt0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3MmJnRoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyh0KX0uYmluZCh0aGlzKSksdGhpcy5lbmNvZGVyLm9uKFwiZmluaXNoZWRcIixmdW5jdGlvbih0KXt2YXIgZT10aGlzLmNhbGxiYWNrO2UmJih0aGlzLmNhbGxiYWNrPXZvaWQgMCxlKHQpKX0uYmluZCh0aGlzKSl9ZnVuY3Rpb24gYyh0KXtmdW5jdGlvbiBlKCl7ZnVuY3Rpb24gdCgpe3JldHVybiB0aGlzLl9ob29rZWR8fCh0aGlzLl9ob29rZWQ9ITAsdGhpcy5faG9va2VkVGltZT10aGlzLmN1cnJlbnRUaW1lfHwwLHRoaXMucGF1c2UoKSxudC5wdXNoKHRoaXMpKSx0aGlzLl9ob29rZWRUaW1lK1Muc3RhcnRUaW1lfWIoXCJDYXB0dXJlciBzdGFydFwiKSxBPXdpbmRvdy5EYXRlLm5vdygpLEw9QStTLnN0YXJ0VGltZSxJPXdpbmRvdy5wZXJmb3JtYW5jZS5ub3coKSxFPUkrUy5zdGFydFRpbWUsd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWU9ZnVuY3Rpb24oKXtyZXR1cm4gTH0sd2luZG93LkRhdGUubm93PWZ1bmN0aW9uKCl7cmV0dXJuIEx9LHdpbmRvdy5zZXRUaW1lb3V0PWZ1bmN0aW9uKHQsZSl7dmFyIG49e2NhbGxiYWNrOnQsdGltZTplLHRyaWdnZXJUaW1lOkwrZX07cmV0dXJuIEIucHVzaChuKSxiKFwiVGltZW91dCBzZXQgdG8gXCIrbi50aW1lKSxufSx3aW5kb3cuY2xlYXJUaW1lb3V0PWZ1bmN0aW9uKHQpe2Zvcih2YXIgZT0wO2U8Qi5sZW5ndGg7ZSsrKUJbZV0hPXR8fChCLnNwbGljZShlLDEpLGIoXCJUaW1lb3V0IGNsZWFyZWRcIikpfSx3aW5kb3cuc2V0SW50ZXJ2YWw9ZnVuY3Rpb24odCxlKXt2YXIgbj17Y2FsbGJhY2s6dCx0aW1lOmUsdHJpZ2dlclRpbWU6TCtlfTtyZXR1cm4gai5wdXNoKG4pLGIoXCJJbnRlcnZhbCBzZXQgdG8gXCIrbi50aW1lKSxufSx3aW5kb3cuY2xlYXJJbnRlcnZhbD1mdW5jdGlvbih0KXtyZXR1cm4gYihcImNsZWFyIEludGVydmFsXCIpLG51bGx9LHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9ZnVuY3Rpb24odCl7VS5wdXNoKHQpfSx3aW5kb3cucGVyZm9ybWFuY2Uubm93PWZ1bmN0aW9uKCl7cmV0dXJuIEV9O3RyeXtPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTFZpZGVvRWxlbWVudC5wcm90b3R5cGUsXCJjdXJyZW50VGltZVwiLHtnZXQ6dH0pLE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQXVkaW9FbGVtZW50LnByb3RvdHlwZSxcImN1cnJlbnRUaW1lXCIse2dldDp0fSl9Y2F0Y2godCl7Yih0KX19ZnVuY3Rpb24gbigpe2UoKSxELnN0YXJ0KCksTT0hMH1mdW5jdGlvbiBpKCl7TT0hMSxELnN0b3AoKSxmKCl9ZnVuY3Rpb24gcih0LGUpe1oodCwwLGUpfWZ1bmN0aW9uIGMoKXtyKHYpfWZ1bmN0aW9uIGYoKXtiKFwiQ2FwdHVyZXIgc3RvcFwiKSx3aW5kb3cuc2V0VGltZW91dD1aLHdpbmRvdy5zZXRJbnRlcnZhbD1KLHdpbmRvdy5jbGVhckludGVydmFsPVksd2luZG93LmNsZWFyVGltZW91dD0kLHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU9USx3aW5kb3cuRGF0ZS5wcm90b3R5cGUuZ2V0VGltZT1ldCx3aW5kb3cuRGF0ZS5ub3c9WCx3aW5kb3cucGVyZm9ybWFuY2Uubm93PXR0fWZ1bmN0aW9uIGwoKXt2YXIgdD1SL1MuZnJhbWVyYXRlOyhTLmZyYW1lTGltaXQmJlI+PVMuZnJhbWVMaW1pdHx8Uy50aW1lTGltaXQmJnQ+PVMudGltZUxpbWl0KSYmKGkoKSx5KCkpO3ZhciBlPW5ldyBEYXRlKG51bGwpO2Uuc2V0U2Vjb25kcyh0KSxTLm1vdGlvbkJsdXJGcmFtZXM+Mj9QLnRleHRDb250ZW50PVwiQ0NhcHR1cmUgXCIrUy5mb3JtYXQrXCIgfCBcIitSK1wiIGZyYW1lcyAoXCIrTytcIiBpbnRlcikgfCBcIitlLnRvSVNPU3RyaW5nKCkuc3Vic3RyKDExLDgpOlAudGV4dENvbnRlbnQ9XCJDQ2FwdHVyZSBcIitTLmZvcm1hdCtcIiB8IFwiK1IrXCIgZnJhbWVzIHwgXCIrZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSw4KX1mdW5jdGlvbiBwKHQpe04ud2lkdGg9PT10LndpZHRoJiZOLmhlaWdodD09PXQuaGVpZ2h0fHwoTi53aWR0aD10LndpZHRoLE4uaGVpZ2h0PXQuaGVpZ2h0LHE9bmV3IFVpbnQxNkFycmF5KE4uaGVpZ2h0Kk4ud2lkdGgqNCksVi5maWxsU3R5bGU9XCIjMFwiLFYuZmlsbFJlY3QoMCwwLE4ud2lkdGgsTi5oZWlnaHQpKX1mdW5jdGlvbiBtKHQpe1YuZHJhd0ltYWdlKHQsMCwwKSx6PVYuZ2V0SW1hZ2VEYXRhKDAsMCxOLndpZHRoLE4uaGVpZ2h0KTtmb3IodmFyIGU9MDtlPHEubGVuZ3RoO2UrPTQpcVtlXSs9ei5kYXRhW2VdLHFbZSsxXSs9ei5kYXRhW2UrMV0scVtlKzJdKz16LmRhdGFbZSsyXTtPKyt9ZnVuY3Rpb24gZygpe2Zvcih2YXIgdD16LmRhdGEsZT0wO2U8cS5sZW5ndGg7ZSs9NCl0W2VdPTIqcVtlXS9TLm1vdGlvbkJsdXJGcmFtZXMsdFtlKzFdPTIqcVtlKzFdL1MubW90aW9uQmx1ckZyYW1lcyx0W2UrMl09MipxW2UrMl0vUy5tb3Rpb25CbHVyRnJhbWVzO1YucHV0SW1hZ2VEYXRhKHosMCwwKSxELmFkZChOKSxSKyssTz0wLGIoXCJGdWxsIE1CIEZyYW1lISBcIitSK1wiIFwiK0wpO2Zvcih2YXIgZT0wO2U8cS5sZW5ndGg7ZSs9NClxW2VdPTAscVtlKzFdPTAscVtlKzJdPTA7Z2MoKX1mdW5jdGlvbiB3KHQpe00mJihTLm1vdGlvbkJsdXJGcmFtZXM+Mj8ocCh0KSxtKHQpLE8+PS41KlMubW90aW9uQmx1ckZyYW1lcz9nKCk6YygpKTooRC5hZGQodCksUisrLGIoXCJGdWxsIEZyYW1lISBcIitSKSkpfWZ1bmN0aW9uIHYoKXt2YXIgdD0xZTMvUy5mcmFtZXJhdGUsZT0oUitPL1MubW90aW9uQmx1ckZyYW1lcykqdDtMPUErZSxFPUkrZSxudC5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuX2hvb2tlZFRpbWU9ZS8xZTN9KSxsKCksYihcIkZyYW1lOiBcIitSK1wiIFwiK08pO2Zvcih2YXIgbj0wO248Qi5sZW5ndGg7bisrKUw+PUJbbl0udHJpZ2dlclRpbWUmJihyKEJbbl0uY2FsbGJhY2spLEIuc3BsaWNlKG4sMSkpO2Zvcih2YXIgbj0wO248ai5sZW5ndGg7bisrKUw+PWpbbl0udHJpZ2dlclRpbWUmJihyKGpbbl0uY2FsbGJhY2spLGpbbl0udHJpZ2dlclRpbWUrPWpbbl0udGltZSk7VS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3IodCxMLWspfSksVT1bXX1mdW5jdGlvbiB5KHQpe3R8fCh0PWZ1bmN0aW9uKHQpe3JldHVybiBkb3dubG9hZCh0LEQuZmlsZW5hbWUrRC5leHRlbnNpb24sRC5taW1lVHlwZSksITF9KSxELnNhdmUodCl9ZnVuY3Rpb24gYih0KXtfJiZjb25zb2xlLmxvZyh0KX1mdW5jdGlvbiB4KHQsZSl7V1t0XT1lfWZ1bmN0aW9uIFQodCl7dmFyIGU9V1t0XTtlJiZlLmFwcGx5KG51bGwsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKX1mdW5jdGlvbiBDKHQpe1QoXCJwcm9ncmVzc1wiLHQpfXZhciBfLEYsTCxBLEUsSSxjLEQsUz10fHx7fSxCPShuZXcgRGF0ZSxbXSksaj1bXSxSPTAsTz0wLFU9W10sTT0hMSxXPXt9O1MuZnJhbWVyYXRlPVMuZnJhbWVyYXRlfHw2MCxTLm1vdGlvbkJsdXJGcmFtZXM9MiooUy5tb3Rpb25CbHVyRnJhbWVzfHwxKSxfPVMudmVyYm9zZXx8ITEsRj1TLmRpc3BsYXl8fCExLFMuc3RlcD0xZTMvUy5mcmFtZXJhdGUsUy50aW1lTGltaXQ9Uy50aW1lTGltaXR8fDAsUy5mcmFtZUxpbWl0PVMuZnJhbWVMaW1pdHx8MCxTLnN0YXJ0VGltZT1TLnN0YXJ0VGltZXx8MDt2YXIgUD1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1Auc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLFAuc3R5bGUubGVmdD1QLnN0eWxlLnRvcD0wLFAuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwiYmxhY2tcIixQLnN0eWxlLmZvbnRGYW1pbHk9XCJtb25vc3BhY2VcIixQLnN0eWxlLmZvbnRTaXplPVwiMTFweFwiLFAuc3R5bGUucGFkZGluZz1cIjVweFwiLFAuc3R5bGUuY29sb3I9XCJyZWRcIixQLnN0eWxlLnpJbmRleD0xZTUsUy5kaXNwbGF5JiZkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKFApO3ZhciBxLHosTj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLFY9Ti5nZXRDb250ZXh0KFwiMmRcIik7YihcIlN0ZXAgaXMgc2V0IHRvIFwiK1Muc3RlcCtcIm1zXCIpO3ZhciBIPXtnaWY6dSx3ZWJtOnMsZmZtcGVnc2VydmVyOmgscG5nOm8sanBnOmEsXCJ3ZWJtLW1lZGlhcmVjb3JkZXJcIjpkfSxHPUhbUy5mb3JtYXRdO2lmKCFHKXRocm93XCJFcnJvcjogSW5jb3JyZWN0IG9yIG1pc3NpbmcgZm9ybWF0OiBWYWxpZCBmb3JtYXRzIGFyZSBcIitPYmplY3Qua2V5cyhIKS5qb2luKFwiLCBcIik7aWYoRD1uZXcgRyhTKSxELnN0ZXA9YyxELm9uKFwicHJvY2Vzc1wiLHYpLEQub24oXCJwcm9ncmVzc1wiLEMpLFwicGVyZm9ybWFuY2VcImluIHdpbmRvdz09MCYmKHdpbmRvdy5wZXJmb3JtYW5jZT17fSksRGF0ZS5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9LFwibm93XCJpbiB3aW5kb3cucGVyZm9ybWFuY2U9PTApe3ZhciBLPURhdGUubm93KCk7cGVyZm9ybWFuY2UudGltaW5nJiZwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0JiYoSz1wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0KSx3aW5kb3cucGVyZm9ybWFuY2Uubm93PWZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCktS319dmFyIFo9d2luZG93LnNldFRpbWVvdXQsSj13aW5kb3cuc2V0SW50ZXJ2YWwsWT13aW5kb3cuY2xlYXJJbnRlcnZhbCwkPXdpbmRvdy5jbGVhclRpbWVvdXQsUT13aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLFg9d2luZG93LkRhdGUubm93LHR0PXdpbmRvdy5wZXJmb3JtYW5jZS5ub3csZXQ9d2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWUsbnQ9W107cmV0dXJue3N0YXJ0Om4sY2FwdHVyZTp3LHN0b3A6aSxzYXZlOnksb246eH19dmFyIGY9e2Z1bmN0aW9uOiEwLG9iamVjdDohMH0sbD0ocGFyc2VGbG9hdCxwYXJzZUludCxmW3R5cGVvZiBleHBvcnRzXSYmZXhwb3J0cyYmIWV4cG9ydHMubm9kZVR5cGU/ZXhwb3J0czp2b2lkIDApLHA9Zlt0eXBlb2YgbW9kdWxlXSYmbW9kdWxlJiYhbW9kdWxlLm5vZGVUeXBlP21vZHVsZTp2b2lkIDAsbT1wJiZwLmV4cG9ydHM9PT1sP2w6dm9pZCAwLGc9dChsJiZwJiZcIm9iamVjdFwiPT10eXBlb2YgZ2xvYmFsJiZnbG9iYWwpLHc9dChmW3R5cGVvZiBzZWxmXSYmc2VsZiksdj10KGZbdHlwZW9mIHdpbmRvd10mJndpbmRvdykseT10KGZbdHlwZW9mIHRoaXNdJiZ0aGlzKSxiPWd8fHYhPT0oeSYmeS53aW5kb3cpJiZ2fHx3fHx5fHxGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XCJnY1wiaW4gd2luZG93fHwod2luZG93LmdjPWZ1bmN0aW9uKCl7fSksSFRNTENhbnZhc0VsZW1lbnQucHJvdG90eXBlLnRvQmxvYnx8T2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZSxcInRvQmxvYlwiLHt2YWx1ZTpmdW5jdGlvbih0LGUsbil7Zm9yKHZhciBpPWF0b2IodGhpcy50b0RhdGFVUkwoZSxuKS5zcGxpdChcIixcIilbMV0pLHI9aS5sZW5ndGgsbz1uZXcgVWludDhBcnJheShyKSxhPTA7YTxyO2ErKylvW2FdPWkuY2hhckNvZGVBdChhKTt0KG5ldyBCbG9iKFtvXSx7dHlwZTplfHxcImltYWdlL3BuZ1wifSkpfX0pLGZ1bmN0aW9uKCl7aWYoXCJwZXJmb3JtYW5jZVwiaW4gd2luZG93PT0wJiYod2luZG93LnBlcmZvcm1hbmNlPXt9KSxEYXRlLm5vdz1EYXRlLm5vd3x8ZnVuY3Rpb24oKXtyZXR1cm4obmV3IERhdGUpLmdldFRpbWUoKX0sXCJub3dcImluIHdpbmRvdy5wZXJmb3JtYW5jZT09MCl7dmFyIHQ9RGF0ZS5ub3coKTtwZXJmb3JtYW5jZS50aW1pbmcmJnBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQmJih0PXBlcmZvcm1hbmNlLnRpbWluZy5uYXZpZ2F0aW9uU3RhcnQpLHdpbmRvdy5wZXJmb3JtYW5jZS5ub3c9ZnVuY3Rpb24oKXtyZXR1cm4gRGF0ZS5ub3coKS10fX19KCk7dmFyIGs9d2luZG93LkRhdGUubm93KCk7aS5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLnN0b3A9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLmFkZD1mdW5jdGlvbigpe30saS5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbigpe30saS5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbigpe30saS5wcm90b3R5cGUuc2FmZVRvUHJvY2VlZD1mdW5jdGlvbigpe3JldHVybiEwfSxpLnByb3RvdHlwZS5zdGVwPWZ1bmN0aW9uKCl7Y29uc29sZS5sb2coXCJTdGVwIG5vdCBzZXQhXCIpfSxyLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxyLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3RoaXMuZGlzcG9zZSgpfSxyLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dmFyIG49bmV3IEZpbGVSZWFkZXI7bi5vbmxvYWQ9ZnVuY3Rpb24oKXt0aGlzLnRhcGUuYXBwZW5kKGUodGhpcy5jb3VudCkrdGhpcy5maWxlRXh0ZW5zaW9uLG5ldyBVaW50OEFycmF5KG4ucmVzdWx0KSksdGhpcy5jb3VudCsrLHRoaXMuc3RlcCgpfS5iaW5kKHRoaXMpLG4ucmVhZEFzQXJyYXlCdWZmZXIodCl9LHIucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7dCh0aGlzLnRhcGUuc2F2ZSgpKX0sci5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbigpe3RoaXMudGFwZT1uZXcgVGFyLHRoaXMuY291bnQ9MH0sby5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShyLnByb3RvdHlwZSksby5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3QudG9CbG9iKGZ1bmN0aW9uKHQpe3IucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsdCl9LmJpbmQodGhpcyksdGhpcy50eXBlKX0sYS5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShyLnByb3RvdHlwZSksYS5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3QudG9CbG9iKGZ1bmN0aW9uKHQpe3IucHJvdG90eXBlLmFkZC5jYWxsKHRoaXMsdCl9LmJpbmQodGhpcyksdGhpcy50eXBlLHRoaXMucXVhbGl0eSl9LHMucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHMucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKHQpe3RoaXMuZGlzcG9zZSgpfSxzLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy5mcmFtZXMucHVzaCh0LnRvRGF0YVVSTChcImltYWdlL3dlYnBcIix0aGlzLnF1YWxpdHkpKSx0aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZT4wJiZ0aGlzLmZyYW1lcy5sZW5ndGgvdGhpcy5zZXR0aW5ncy5mcmFtZXJhdGU+PXRoaXMuc2V0dGluZ3MuYXV0b1NhdmVUaW1lP3RoaXMuc2F2ZShmdW5jdGlvbih0KXt0aGlzLmZpbGVuYW1lPXRoaXMuYmFzZUZpbGVuYW1lK1wiLXBhcnQtXCIrZSh0aGlzLnBhcnQpLGRvd25sb2FkKHQsdGhpcy5maWxlbmFtZSt0aGlzLmV4dGVuc2lvbix0aGlzLm1pbWVUeXBlKSx0aGlzLmRpc3Bvc2UoKSx0aGlzLnBhcnQrKyx0aGlzLmZpbGVuYW1lPXRoaXMuYmFzZUZpbGVuYW1lK1wiLXBhcnQtXCIrZSh0aGlzLnBhcnQpLHRoaXMuc3RlcCgpfS5iaW5kKHRoaXMpKTp0aGlzLnN0ZXAoKX0scy5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXtpZih0aGlzLmZyYW1lcy5sZW5ndGgpe3ZhciBlPVdoYW1teS5mcm9tSW1hZ2VBcnJheSh0aGlzLmZyYW1lcyx0aGlzLnNldHRpbmdzLmZyYW1lcmF0ZSksbj1uZXcgQmxvYihbZV0se3R5cGU6XCJvY3RldC9zdHJlYW1cIn0pO3Qobil9fSxzLnByb3RvdHlwZS5kaXNwb3NlPWZ1bmN0aW9uKHQpe3RoaXMuZnJhbWVzPVtdfSxoLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxoLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbigpe3RoaXMuZW5jb2Rlci5zdGFydCh0aGlzLnNldHRpbmdzKX0saC5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuZW5jb2Rlci5hZGQodCl9LGgucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7dGhpcy5jYWxsYmFjaz10LHRoaXMuZW5jb2Rlci5lbmQoKX0saC5wcm90b3R5cGUuc2FmZVRvUHJvY2VlZD1mdW5jdGlvbigpe3JldHVybiB0aGlzLmVuY29kZXIuc2FmZVRvUHJvY2VlZCgpfSxkLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxkLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy5zdHJlYW18fCh0aGlzLnN0cmVhbT10LmNhcHR1cmVTdHJlYW0odGhpcy5mcmFtZXJhdGUpLHRoaXMubWVkaWFSZWNvcmRlcj1uZXcgTWVkaWFSZWNvcmRlcih0aGlzLnN0cmVhbSksdGhpcy5tZWRpYVJlY29yZGVyLnN0YXJ0KCksdGhpcy5tZWRpYVJlY29yZGVyLm9uZGF0YWF2YWlsYWJsZT1mdW5jdGlvbih0KXt0aGlzLmNodW5rcy5wdXNoKHQuZGF0YSl9LmJpbmQodGhpcykpLHRoaXMuc3RlcCgpfSxkLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3RoaXMubWVkaWFSZWNvcmRlci5vbnN0b3A9ZnVuY3Rpb24oZSl7dmFyIG49bmV3IEJsb2IodGhpcy5jaHVua3Mse3R5cGU6XCJ2aWRlby93ZWJtXCJ9KTt0aGlzLmNodW5rcz1bXSx0KG4pfS5iaW5kKHRoaXMpLHRoaXMubWVkaWFSZWNvcmRlci5zdG9wKCl9LHUucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoaS5wcm90b3R5cGUpLHUucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLnNpemVTZXR8fCh0aGlzLmVuY29kZXIuc2V0T3B0aW9uKFwid2lkdGhcIix0LndpZHRoKSx0aGlzLmVuY29kZXIuc2V0T3B0aW9uKFwiaGVpZ2h0XCIsdC5oZWlnaHQpLHRoaXMuc2l6ZVNldD0hMCksdGhpcy5jYW52YXMud2lkdGg9dC53aWR0aCx0aGlzLmNhbnZhcy5oZWlnaHQ9dC5oZWlnaHQsdGhpcy5jdHguZHJhd0ltYWdlKHQsMCwwKSx0aGlzLmVuY29kZXIuYWRkRnJhbWUodGhpcy5jdHgse2NvcHk6ITAsZGVsYXk6dGhpcy5zZXR0aW5ncy5zdGVwfSksdGhpcy5zdGVwKCl9LHUucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7dGhpcy5jYWxsYmFjaz10LHRoaXMuZW5jb2Rlci5yZW5kZXIoKX0sKHZ8fHd8fHt9KS5DQ2FwdHVyZT1jLFwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmXCJvYmplY3RcIj09dHlwZW9mIGRlZmluZS5hbWQmJmRlZmluZS5hbWQ/ZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIGN9KTpsJiZwPyhtJiYoKHAuZXhwb3J0cz1jKS5DQ2FwdHVyZT1jKSxsLkNDYXB0dXJlPWMpOmIuQ0NhcHR1cmU9Y30oKTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jY2FwdHVyZS5qcy9idWlsZC9DQ2FwdHVyZS5hbGwubWluLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAgMSIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obW9kdWxlKSB7XHJcblx0aWYoIW1vZHVsZS53ZWJwYWNrUG9seWZpbGwpIHtcclxuXHRcdG1vZHVsZS5kZXByZWNhdGUgPSBmdW5jdGlvbigpIHt9O1xyXG5cdFx0bW9kdWxlLnBhdGhzID0gW107XHJcblx0XHQvLyBtb2R1bGUucGFyZW50ID0gdW5kZWZpbmVkIGJ5IGRlZmF1bHRcclxuXHRcdGlmKCFtb2R1bGUuY2hpbGRyZW4pIG1vZHVsZS5jaGlsZHJlbiA9IFtdO1xyXG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG1vZHVsZSwgXCJsb2FkZWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUubDtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImlkXCIsIHtcclxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcclxuXHRcdFx0Z2V0OiBmdW5jdGlvbigpIHtcclxuXHRcdFx0XHRyZXR1cm4gbW9kdWxlLmk7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cdFx0bW9kdWxlLndlYnBhY2tQb2x5ZmlsbCA9IDE7XHJcblx0fVxyXG5cdHJldHVybiBtb2R1bGU7XHJcbn07XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIDEiLCJ2YXIgdml6cGxleCA9IHJlcXVpcmUoJy4vaW5kZXgnKVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL3ZpenBsZXguanMiXSwic291cmNlUm9vdCI6IiJ9