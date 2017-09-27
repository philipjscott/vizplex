(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("vizplex", [], factory);
	else if(typeof exports === 'object')
		exports["vizplex"] = factory();
	else
		root["vizplex"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
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
/***/ (function(module, exports, __webpack_require__) {

// CommonJS hack to make webpack just export the function instead of an object
// https://github.com/webpack/webpack/issues/3929

module.exports = __webpack_require__(7).default


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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__eq_parser__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_clear__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_gl_clear___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_gl_clear__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_context__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_gl_context___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_gl_context__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_shader__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_gl_shader___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_gl_shader__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_reset__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_gl_reset___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_gl_reset__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_right_now__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_right_now___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_right_now__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_a_big_triangle__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_a_big_triangle___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_a_big_triangle__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_ccapture_js__ = __webpack_require__(61);
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
  rgba = rgba.map(function (fnStr) { return Object(__WEBPACK_IMPORTED_MODULE_2__eq_parser__["a" /* default */])(fnStr); })
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
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var defaults = __webpack_require__(12)

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
/* 12 */
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
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var raf = __webpack_require__(14)

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
/* 14 */
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
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createUniformWrapper   = __webpack_require__(16)
var createAttributeWrapper = __webpack_require__(17)
var makeReflect            = __webpack_require__(2)
var shaderCache            = __webpack_require__(18)
var runtime                = __webpack_require__(36)
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
/* 16 */
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
/* 17 */
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
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.shader   = getShaderReference
exports.program  = createProgram

var GLError = __webpack_require__(0)
var formatCompilerError = __webpack_require__(19);

var weakMap = typeof WeakMap === 'undefined' ? __webpack_require__(33) : WeakMap
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
/* 19 */
/***/ (function(module, exports, __webpack_require__) {


var sprintf = __webpack_require__(20).sprintf;
var glConstants = __webpack_require__(21);
var shaderName = __webpack_require__(23);
var addLineNumbers = __webpack_require__(30);

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
/* 20 */
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
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var gl10 = __webpack_require__(22)

module.exports = function lookupConstant (number) {
  return gl10[number]
}


/***/ }),
/* 22 */
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
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(24)
var atob     = __webpack_require__(29)

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
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var tokenize = __webpack_require__(25)

module.exports = tokenizeString

function tokenizeString(str, opt) {
  var generator = tokenize(opt)
  var tokens = []

  tokens = tokens.concat(generator(str))
  tokens = tokens.concat(generator(null))

  return tokens
}


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = tokenize

var literals100 = __webpack_require__(3)
  , operators = __webpack_require__(26)
  , builtins100 = __webpack_require__(4)
  , literals300es = __webpack_require__(27)
  , builtins300es = __webpack_require__(28)

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
/* 26 */
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
/* 27 */
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
/* 28 */
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
/* 29 */
/***/ (function(module, exports) {

module.exports = function _atob(str) {
  return atob(str)
}


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var padLeft = __webpack_require__(31)

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
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * pad-left <https://github.com/jonschlinkert/pad-left>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT license.
 */



var repeat = __webpack_require__(32);

module.exports = function padLeft(str, num, ch) {
  ch = typeof ch !== 'undefined' ? (ch + '') : ' ';
  return repeat(ch, num) + str;
};

/***/ }),
/* 32 */
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
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

// Original - @Gozola.
// https://gist.github.com/Gozala/1269991
// This is a reimplemented version (with a few bug fixes).

var createStore = __webpack_require__(34);

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
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

var hiddenStore = __webpack_require__(35);

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
/* 35 */
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
/* 36 */
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
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

var stateReset = __webpack_require__(38)

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
/* 38 */
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
/* 39 */
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
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var weakMap      = typeof WeakMap === 'undefined' ? __webpack_require__(41) : WeakMap
var createBuffer = __webpack_require__(42)
var createVAO    = __webpack_require__(58)

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
/* 41 */
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
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var pool = __webpack_require__(43)
var ops = __webpack_require__(50)
var ndarray = __webpack_require__(55)

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
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, Buffer) {

var bits = __webpack_require__(48)
var dup = __webpack_require__(49)

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
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(1), __webpack_require__(44).Buffer))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(45)
var ieee754 = __webpack_require__(46)
var isArray = __webpack_require__(47)

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
/* 45 */
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
/* 46 */
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
/* 47 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 48 */
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
/* 49 */
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
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compile = __webpack_require__(51)

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
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createThunk = __webpack_require__(52)

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
/* 52 */
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

var compile = __webpack_require__(53)

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
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var uniq = __webpack_require__(54)

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
/* 54 */
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
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var iota = __webpack_require__(56)
var isBuffer = __webpack_require__(57)

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
/* 56 */
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
/* 57 */
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
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createVAONative = __webpack_require__(59)
var createVAOEmulated = __webpack_require__(60)

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
/* 59 */
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
/* 60 */
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
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module, global) {var __WEBPACK_AMD_DEFINE_RESULT__;function download(t,e,n){function i(t){var e=t.split(/[:;,]/),n=e[1],i="base64"==e[2]?atob:decodeURIComponent,r=i(e.pop()),o=r.length,a=0,s=new Uint8Array(o);for(a;a<o;++a)s[a]=r.charCodeAt(a);return new m([s],{type:n})}function r(t,e){if("download"in l)return l.href=t,l.setAttribute("download",w),l.innerHTML="downloading...",l.style.display="none",f.body.appendChild(l),setTimeout(function(){l.click(),f.body.removeChild(l),e===!0&&setTimeout(function(){h.URL.revokeObjectURL(l.href)},250)},66),!0;var n=f.createElement("iframe");f.body.appendChild(n),e||(t="data:"+t.replace(/^data:([\w\/\-\+]+)/,d)),n.src=t,setTimeout(function(){f.body.removeChild(n)},333)}var o,a,s,h=window,d="application/octet-stream",u=n||d,c=t,f=document,l=f.createElement("a"),p=function(t){return String(t)},m=h.Blob||h.MozBlob||h.WebKitBlob||p,g=h.MSBlobBuilder||h.WebKitBlobBuilder||h.BlobBuilder,w=e||"download";if("true"===String(this)&&(c=[c,u],u=c[0],c=c[1]),String(c).match(/^data\:[\w+\-]+\/[\w+\-]+[,;]/))return navigator.msSaveBlob?navigator.msSaveBlob(i(c),w):r(c);try{o=c instanceof m?c:new m([c],{type:u})}catch(t){g&&(a=new g,a.append([c]),o=a.getBlob(u))}if(navigator.msSaveBlob)return navigator.msSaveBlob(o,w);if(h.URL)r(h.URL.createObjectURL(o),!0);else{if("string"==typeof o||o.constructor===p)try{return r("data:"+u+";base64,"+h.btoa(o))}catch(t){return r("data:"+u+","+encodeURIComponent(o))}s=new FileReader,s.onload=function(t){r(this.result)},s.readAsDataURL(o)}return!0}window.Whammy=function(){function t(t,n){for(var i=e(t),r=3e4,o=[{id:440786851,data:[{data:1,id:17030},{data:1,id:17143},{data:4,id:17138},{data:8,id:17139},{data:"webm",id:17026},{data:2,id:17031},{data:2,id:17029}]},{id:408125543,data:[{id:357149030,data:[{data:1e6,id:2807729},{data:"whammy",id:19840},{data:"whammy",id:22337},{data:c(i.duration),id:17545}]},{id:374648427,data:[{id:174,data:[{data:1,id:215},{data:1,id:29637},{data:0,id:156},{data:"und",id:2274716},{data:"V_VP8",id:134},{data:"VP8",id:2459272},{data:1,id:131},{id:224,data:[{data:i.width,id:176},{data:i.height,id:186}]}]}]},{id:475249515,data:[]}]}],s=o[1],d=s.data[2],u=0,f=0;u<t.length;){var l={id:187,data:[{data:Math.round(f),id:179},{id:183,data:[{data:1,id:247},{data:0,size:8,id:241}]}]};d.data.push(l);var p=[],m=0;do p.push(t[u]),m+=t[u].duration,u++;while(u<t.length&&m<r);var g=0,w={id:524531317,data:[{data:Math.round(f),id:231}].concat(p.map(function(t){var e=h({discardable:0,frame:t.data.slice(4),invisible:0,keyframe:1,lacing:0,trackNum:1,timecode:Math.round(g)});return g+=t.duration,{data:e,id:163}}))};s.data.push(w),f+=m}for(var v=0,y=0;y<s.data.length;y++){y>=3&&(d.data[y-3].data[1].data[1].data=v);var b=a([s.data[y]],n);v+=b.size||b.byteLength||b.length,2!=y&&(s.data[y]=b)}return a(o,n)}function e(t){for(var e=t[0].width,n=t[0].height,i=t[0].duration,r=1;r<t.length;r++){if(t[r].width!=e)throw"Frame "+(r+1)+" has a different width";if(t[r].height!=n)throw"Frame "+(r+1)+" has a different height";if(t[r].duration<0||t[r].duration>32767)throw"Frame "+(r+1)+" has a weird duration (must be between 0 and 32767)";i+=t[r].duration}return{duration:i,width:e,height:n}}function n(t){for(var e=[];t>0;)e.push(255&t),t>>=8;return new Uint8Array(e.reverse())}function i(t,e){for(var n=new Uint8Array(e),i=e-1;i>=0;i--)n[i]=255&t,t>>=8;return n}function r(t){for(var e=new Uint8Array(t.length),n=0;n<t.length;n++)e[n]=t.charCodeAt(n);return e}function o(t){var e=[],n=t.length%8?new Array(9-t.length%8).join("0"):"";t=n+t;for(var i=0;i<t.length;i+=8)e.push(parseInt(t.substr(i,8),2));return new Uint8Array(e)}function a(t,e){for(var h=[],d=0;d<t.length;d++)if("id"in t[d]){var u=t[d].data;if("object"==typeof u&&(u=a(u,e)),"number"==typeof u&&(u="size"in t[d]?i(u,t[d].size):o(u.toString(2))),"string"==typeof u&&(u=r(u)),u.length);for(var c=u.size||u.byteLength||u.length,f=0,l=56;l>0;l-=7)if(c>Math.pow(2,l)-2){f=l/7;break}var p=c.toString(2),m=new Array(8*(f+1)+1).join("0"),g=new Array(f+1).join("0")+1,w=m.substr(0,m.length-p.length-g.length)+p,v=g+w;h.push(n(t[d].id)),h.push(o(v)),h.push(u)}else h.push(t[d]);if(e){var y=s(h);return new Uint8Array(y)}return new Blob(h,{type:"video/webm"})}function s(t,e){null==e&&(e=[]);for(var n=0;n<t.length;n++)"object"==typeof t[n]?s(t[n],e):e.push(t[n]);return e}function h(t){var e=0;if(t.keyframe&&(e|=128),t.invisible&&(e|=8),t.lacing&&(e|=t.lacing<<1),t.discardable&&(e|=1),t.trackNum>127)throw"TrackNumber > 127 not supported";var n=[128|t.trackNum,t.timecode>>8,255&t.timecode,e].map(function(t){return String.fromCharCode(t)}).join("")+t.frame;return n}function d(t){for(var e=t.RIFF[0].WEBP[0],n=e.indexOf("*"),i=0,r=[];i<4;i++)r[i]=e.charCodeAt(n+3+i);var o,a,s,h,d;return d=r[1]<<8|r[0],o=16383&d,a=d>>14,d=r[3]<<8|r[2],s=16383&d,h=d>>14,{width:o,height:s,data:e,riff:t}}function u(t){for(var e=0,n={};e<t.length;){var i=t.substr(e,4);if(n[i]=n[i]||[],"RIFF"==i||"LIST"==i){var r=parseInt(t.substr(e+4,4).split("").map(function(t){var e=t.charCodeAt(0).toString(2);return new Array(8-e.length+1).join("0")+e}).join(""),2),o=t.substr(e+4+4,r);e+=8+r,n[i].push(u(o))}else"WEBP"==i?(n[i].push(t.substr(e+8)),e=t.length):(n[i].push(t.substr(e+4)),e=t.length)}return n}function c(t){return[].slice.call(new Uint8Array(new Float64Array([t]).buffer),0).map(function(t){return String.fromCharCode(t)}).reverse().join("")}function f(t,e){this.frames=[],this.duration=1e3/t,this.quality=e||.8}return f.prototype.add=function(t,e){if("undefined"!=typeof e&&this.duration)throw"you can't pass a duration if the fps is set";if("undefined"==typeof e&&!this.duration)throw"if you don't have the fps set, you need to have durations here.";if(t.canvas&&(t=t.canvas),t.toDataURL)t=t.getContext("2d").getImageData(0,0,t.width,t.height);else if("string"!=typeof t)throw"frame must be a a HTMLCanvasElement, a CanvasRenderingContext2D or a DataURI formatted string";if("string"==typeof t&&!/^data:image\/webp;base64,/gi.test(t))throw"Input must be formatted properly as a base64 encoded DataURI of type image/webp";this.frames.push({image:t,duration:e||this.duration})},f.prototype.encodeFrames=function(t){if(this.frames[0].image instanceof ImageData){var e=this.frames,n=document.createElement("canvas"),i=n.getContext("2d");n.width=this.frames[0].image.width,n.height=this.frames[0].image.height;var r=function(o){var a=e[o];i.putImageData(a.image,0,0),a.image=n.toDataURL("image/webp",this.quality),o<e.length-1?setTimeout(function(){r(o+1)},1):t()}.bind(this);r(0)}else t()},f.prototype.compile=function(e,n){this.encodeFrames(function(){var i=new t(this.frames.map(function(t){var e=d(u(atob(t.image.slice(23))));return e.duration=t.duration,e}),e);n(i)}.bind(this))},{Video:f,fromImageArray:function(e,n,i){return t(e.map(function(t){var e=d(u(atob(t.slice(23))));return e.duration=1e3/n,e}),i)},toWebM:t}}(),function(){"use strict";function t(t){var e,n=new Uint8Array(t);for(e=0;e<t;e+=1)n[e]=0;return n}function e(e,n,i,r){var o=n+i,a=t((parseInt(o/r)+1)*r);return a.set(e),a}function n(t,e,n){return t=t.toString(n||8),"000000000000".substr(t.length+12-e)+t}function i(e,n,i){var r,o;for(n=n||t(e.length),i=i||0,r=0,o=e.length;r<o;r+=1)n[i]=e.charCodeAt(r),i+=1;return n}function r(t){function e(t){return o[t>>18&63]+o[t>>12&63]+o[t>>6&63]+o[63&t]}var n,i,r,a=t.length%3,s="";for(n=0,r=t.length-a;n<r;n+=3)i=(t[n]<<16)+(t[n+1]<<8)+t[n+2],s+=e(i);switch(s.length%4){case 1:s+="=";break;case 2:s+="=="}return s}var o=["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","0","1","2","3","4","5","6","7","8","9","+","/"];window.utils={},window.utils.clean=t,window.utils.pad=n,window.utils.extend=e,window.utils.stringToUint8=i,window.utils.uint8ToBase64=r}(),function(){"use strict";function t(t,i){var r=n.clean(512),o=0;return e.forEach(function(e){var n,i,a=t[e.field]||"";for(n=0,i=a.length;n<i;n+=1)r[o]=a.charCodeAt(n),o+=1;o+=e.length-n}),"function"==typeof i?i(r,o):r}var e,n=window.utils;e=[{field:"fileName",length:100},{field:"fileMode",length:8},{field:"uid",length:8},{field:"gid",length:8},{field:"fileSize",length:12},{field:"mtime",length:12},{field:"checksum",length:8},{field:"type",length:1},{field:"linkName",length:100},{field:"ustar",length:8},{field:"owner",length:32},{field:"group",length:32},{field:"majorNumber",length:8},{field:"minorNumber",length:8},{field:"filenamePrefix",length:155},{field:"padding",length:12}],window.header={},window.header.structure=e,window.header.format=t}(),function(){"use strict";function t(t){this.written=0,e=(t||20)*r,this.out=i.clean(e),this.blocks=[],this.length=0}var e,n=window.header,i=window.utils,r=512;t.prototype.append=function(t,e,o,a){var s,h,d,u,c,f,l;if("string"==typeof e)e=i.stringToUint8(e);else if(e.constructor!==Uint8Array.prototype.constructor)throw"Invalid input type. You gave me: "+e.constructor.toString().match(/function\s*([$A-Za-z_][0-9A-Za-z_]*)\s*\(/)[1];"function"==typeof o&&(a=o,o={}),o=o||{},d=o.mode||4095&parseInt("777",8),u=o.mtime||Math.floor(+new Date/1e3),c=o.uid||0,f=o.gid||0,s={fileName:t,fileMode:i.pad(d,7),uid:i.pad(c,7),gid:i.pad(f,7),fileSize:i.pad(e.length,11),mtime:i.pad(u,11),checksum:"        ",type:"0",ustar:"ustar  ",owner:o.owner||"",group:o.group||""},h=0,Object.keys(s).forEach(function(t){var e,n,i=s[t];for(e=0,n=i.length;e<n;e+=1)h+=i.charCodeAt(e)}),s.checksum=i.pad(h,6)+"\0 ",l=n.format(s);var p=Math.ceil(l.length/r)*r,m=Math.ceil(e.length/r)*r;this.blocks.push({header:l,input:e,headerLength:p,inputLength:m})},t.prototype.save=function(){var t=[],e=[],n=0,i=Math.pow(2,20),o=[];return this.blocks.forEach(function(t){n+t.headerLength+t.inputLength>i&&(e.push({blocks:o,length:n}),o=[],n=0),o.push(t),n+=t.headerLength+t.inputLength}),e.push({blocks:o,length:n}),e.forEach(function(e){var n=new Uint8Array(e.length),i=0;e.blocks.forEach(function(t){n.set(t.header,i),i+=t.headerLength,n.set(t.input,i),i+=t.inputLength}),t.push(n)}),t.push(new Uint8Array(2*r)),new Blob(t,{type:"octet/stream"})},t.prototype.clear=function(){this.written=0,this.out=i.clean(e)},window.Tar=t}(),function(t){function e(t,n){if({}.hasOwnProperty.call(e.cache,t))return e.cache[t];var i=e.resolve(t);if(!i)throw new Error("Failed to resolve module "+t);var r={id:t,require:e,filename:t,exports:{},loaded:!1,parent:n,children:[]};n&&n.children.push(r);var o=t.slice(0,t.lastIndexOf("/")+1);return e.cache[t]=r.exports,i.call(r.exports,r,r.exports,o,t),r.loaded=!0,e.cache[t]=r.exports}e.modules={},e.cache={},e.resolve=function(t){return{}.hasOwnProperty.call(e.modules,t)?e.modules[t]:void 0},e.define=function(t,n){e.modules[t]=n};var n=function(e){return e="/",{title:"browser",version:"v0.10.26",browser:!0,env:{},argv:[],nextTick:t.setImmediate||function(t){setTimeout(t,0)},cwd:function(){return e},chdir:function(t){e=t}}}();e.define("/gif.coffee",function(t,n,i,r){function o(t,e){return{}.hasOwnProperty.call(t,e)}function a(t,e){for(var n=0,i=e.length;n<i;++n)if(n in e&&e[n]===t)return!0;return!1}function s(t,e){function n(){this.constructor=t}for(var i in e)o(e,i)&&(t[i]=e[i]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t}var h,d,u,c,f;u=e("events",t).EventEmitter,h=e("/browser.coffee",t),f=function(t){function e(t){var e,n;this.running=!1,this.options={},this.frames=[],this.freeWorkers=[],this.activeWorkers=[],this.setOptions(t);for(e in d)n=d[e],null!=this.options[e]?this.options[e]:this.options[e]=n}return s(e,t),d={workerScript:"gif.worker.js",workers:2,repeat:0,background:"#fff",quality:10,width:null,height:null,transparent:null},c={delay:500,copy:!1},e.prototype.setOption=function(t,e){return this.options[t]=e,null==this._canvas||"width"!==t&&"height"!==t?void 0:this._canvas[t]=e},e.prototype.setOptions=function(t){var e,n;return function(i){for(e in t)o(t,e)&&(n=t[e],i.push(this.setOption(e,n)));return i}.call(this,[])},e.prototype.addFrame=function(t,e){var n,i;null==e&&(e={}),n={},n.transparent=this.options.transparent;for(i in c)n[i]=e[i]||c[i];if(null!=this.options.width||this.setOption("width",t.width),null!=this.options.height||this.setOption("height",t.height),"undefined"!=typeof ImageData&&null!=ImageData&&t instanceof ImageData)n.data=t.data;else if("undefined"!=typeof CanvasRenderingContext2D&&null!=CanvasRenderingContext2D&&t instanceof CanvasRenderingContext2D||"undefined"!=typeof WebGLRenderingContext&&null!=WebGLRenderingContext&&t instanceof WebGLRenderingContext)e.copy?n.data=this.getContextData(t):n.context=t;else{if(null==t.childNodes)throw new Error("Invalid image");e.copy?n.data=this.getImageData(t):n.image=t}return this.frames.push(n)},e.prototype.render=function(){var t,e;if(this.running)throw new Error("Already running");if(null==this.options.width||null==this.options.height)throw new Error("Width and height must be set prior to rendering");this.running=!0,this.nextFrame=0,this.finishedFrames=0,this.imageParts=function(e){for(var n=function(){var t;t=[];for(var e=0;0<=this.frames.length?e<this.frames.length:e>this.frames.length;0<=this.frames.length?++e:--e)t.push(e);return t}.apply(this,arguments),i=0,r=n.length;i<r;++i)t=n[i],e.push(null);return e}.call(this,[]),e=this.spawnWorkers();for(var n=function(){var t;t=[];for(var n=0;0<=e?n<e:n>e;0<=e?++n:--n)t.push(n);return t}.apply(this,arguments),i=0,r=n.length;i<r;++i)t=n[i],this.renderNextFrame();return this.emit("start"),this.emit("progress",0)},e.prototype.abort=function(){for(var t;;){if(t=this.activeWorkers.shift(),!(null!=t))break;console.log("killing active worker"),t.terminate()}return this.running=!1,this.emit("abort")},e.prototype.spawnWorkers=function(){var t;return t=Math.min(this.options.workers,this.frames.length),function(){var e;e=[];for(var n=this.freeWorkers.length;this.freeWorkers.length<=t?n<t:n>t;this.freeWorkers.length<=t?++n:--n)e.push(n);return e}.apply(this,arguments).forEach(function(t){return function(e){var n;return console.log("spawning worker "+e),n=new Worker(t.options.workerScript),n.onmessage=function(t){return function(e){return t.activeWorkers.splice(t.activeWorkers.indexOf(n),1),t.freeWorkers.push(n),t.frameFinished(e.data)}}(t),t.freeWorkers.push(n)}}(this)),t},e.prototype.frameFinished=function(t){return console.log("frame "+t.index+" finished - "+this.activeWorkers.length+" active"),this.finishedFrames++,this.emit("progress",this.finishedFrames/this.frames.length),this.imageParts[t.index]=t,a(null,this.imageParts)?this.renderNextFrame():this.finishRendering()},e.prototype.finishRendering=function(){var t,e,n,i,r,o,a;r=0;for(var s=0,h=this.imageParts.length;s<h;++s)e=this.imageParts[s],r+=(e.data.length-1)*e.pageSize+e.cursor;r+=e.pageSize-e.cursor,console.log("rendering finished - filesize "+Math.round(r/1e3)+"kb"),t=new Uint8Array(r),o=0;for(var d=0,u=this.imageParts.length;d<u;++d){e=this.imageParts[d];for(var c=0,f=e.data.length;c<f;++c)a=e.data[c],n=c,t.set(a,o),o+=n===e.data.length-1?e.cursor:e.pageSize}return i=new Blob([t],{type:"image/gif"}),this.emit("finished",i,t)},e.prototype.renderNextFrame=function(){var t,e,n;if(0===this.freeWorkers.length)throw new Error("No free workers");return this.nextFrame>=this.frames.length?void 0:(t=this.frames[this.nextFrame++],n=this.freeWorkers.shift(),e=this.getTask(t),console.log("starting frame "+(e.index+1)+" of "+this.frames.length),this.activeWorkers.push(n),n.postMessage(e))},e.prototype.getContextData=function(t){return t.getImageData(0,0,this.options.width,this.options.height).data},e.prototype.getImageData=function(t){var e;return null!=this._canvas||(this._canvas=document.createElement("canvas"),this._canvas.width=this.options.width,this._canvas.height=this.options.height),e=this._canvas.getContext("2d"),e.setFill=this.options.background,e.fillRect(0,0,this.options.width,this.options.height),e.drawImage(t,0,0),this.getContextData(e)},e.prototype.getTask=function(t){var e,n;if(e=this.frames.indexOf(t),n={index:e,last:e===this.frames.length-1,delay:t.delay,transparent:t.transparent,width:this.options.width,height:this.options.height,quality:this.options.quality,repeat:this.options.repeat,canTransfer:"chrome"===h.name},null!=t.data)n.data=t.data;else if(null!=t.context)n.data=this.getContextData(t.context);else{if(null==t.image)throw new Error("Invalid frame");n.data=this.getImageData(t.image)}return n},e}(u),t.exports=f}),e.define("/browser.coffee",function(t,e,n,i){var r,o,a,s,h;s=navigator.userAgent.toLowerCase(),a=navigator.platform.toLowerCase(),h=s.match(/(opera|ie|firefox|chrome|version)[\s\/:]([\w\d\.]+)?.*?(safari|version[\s\/:]([\w\d\.]+)|$)/)||[null,"unknown",0],o="ie"===h[1]&&document.documentMode,r={name:"version"===h[1]?h[3]:h[1],version:o||parseFloat("opera"===h[1]&&h[4]?h[4]:h[2]),platform:{name:s.match(/ip(?:ad|od|hone)/)?"ios":(s.match(/(?:webos|android)/)||a.match(/mac|win|linux/)||["other"])[0]}},r[r.name]=!0,r[r.name+parseInt(r.version,10)]=!0,r.platform[r.platform.name]=!0,t.exports=r}),e.define("events",function(t,e,i,r){n.EventEmitter||(n.EventEmitter=function(){});var o=e.EventEmitter=n.EventEmitter,a="function"==typeof Array.isArray?Array.isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},s=10;o.prototype.setMaxListeners=function(t){this._events||(this._events={}),this._events.maxListeners=t},o.prototype.emit=function(t){if("error"===t&&(!this._events||!this._events.error||a(this._events.error)&&!this._events.error.length))throw arguments[1]instanceof Error?arguments[1]:new Error("Uncaught, unspecified 'error' event.");if(!this._events)return!1;var e=this._events[t];if(!e)return!1;if("function"!=typeof e){if(a(e)){for(var n=Array.prototype.slice.call(arguments,1),i=e.slice(),r=0,o=i.length;r<o;r++)i[r].apply(this,n);return!0}return!1}switch(arguments.length){case 1:e.call(this);break;case 2:e.call(this,arguments[1]);break;case 3:e.call(this,arguments[1],arguments[2]);break;default:var n=Array.prototype.slice.call(arguments,1);e.apply(this,n)}return!0},o.prototype.addListener=function(t,e){if("function"!=typeof e)throw new Error("addListener only takes instances of Function");if(this._events||(this._events={}),this.emit("newListener",t,e),this._events[t])if(a(this._events[t])){if(!this._events[t].warned){var n;n=void 0!==this._events.maxListeners?this._events.maxListeners:s,n&&n>0&&this._events[t].length>n&&(this._events[t].warned=!0,console.error("(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",this._events[t].length),console.trace())}this._events[t].push(e)}else this._events[t]=[this._events[t],e];else this._events[t]=e;return this},o.prototype.on=o.prototype.addListener,o.prototype.once=function(t,e){var n=this;return n.on(t,function i(){n.removeListener(t,i),e.apply(this,arguments)}),this},o.prototype.removeListener=function(t,e){if("function"!=typeof e)throw new Error("removeListener only takes instances of Function");if(!this._events||!this._events[t])return this;var n=this._events[t];if(a(n)){var i=n.indexOf(e);if(i<0)return this;n.splice(i,1),0==n.length&&delete this._events[t]}else this._events[t]===e&&delete this._events[t];return this},o.prototype.removeAllListeners=function(t){return t&&this._events&&this._events[t]&&(this._events[t]=null),this},o.prototype.listeners=function(t){return this._events||(this._events={}),this._events[t]||(this._events[t]=[]),a(this._events[t])||(this._events[t]=[this._events[t]]),this._events[t]}}),t.GIF=e("/gif.coffee")}.call(this,this),function(){"use strict";function t(t){return t&&t.Object===Object?t:null}function e(t){return String("0000000"+t).slice(-7)}function n(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()}function i(t){var e={};this.settings=t,this.on=function(t,n){e[t]=n},this.emit=function(t){var n=e[t];n&&n.apply(null,Array.prototype.slice.call(arguments,1))},this.filename=t.name||n(),this.extension="",this.mimeType=""}function r(t){i.call(this,t),this.extension=".tar",this.mimeType="application/x-tar",this.fileExtension="",this.tape=null,this.count=0}function o(t){r.call(this,t),this.type="image/png",this.fileExtension=".png"}function a(t){r.call(this,t),this.type="image/jpeg",this.fileExtension=".jpg",this.quality=t.quality/100||.8}function s(t){var e=document.createElement("canvas");"image/webp"!==e.toDataURL("image/webp").substr(5,10)&&console.log("WebP not supported - try another export format"),i.call(this,t),this.quality=t.quality/100||.8,this.extension=".webm",this.mimeType="video/webm",this.baseFilename=this.filename,this.frames=[],this.part=1}function h(t){i.call(this,t),t.quality=t.quality/100||.8,this.encoder=new FFMpegServer.Video(t),this.encoder.on("process",function(){this.emit("process")}.bind(this)),this.encoder.on("finished",function(t,e){var n=this.callback;n&&(this.callback=void 0,n(t,e))}.bind(this)),this.encoder.on("progress",function(t){this.settings.onProgress&&this.settings.onProgress(t)}.bind(this)),this.encoder.on("error",function(t){alert(JSON.stringify(t,null,2))}.bind(this))}function d(t){i.call(this,t),this.framerate=this.settings.framerate,this.type="video/webm",this.extension=".webm",this.stream=null,this.mediaRecorder=null,this.chunks=[]}function u(t){i.call(this,t),t.quality=31-(30*t.quality/100||10),t.workers=t.workers||4,this.extension=".gif",this.mimeType="image/gif",this.canvas=document.createElement("canvas"),this.ctx=this.canvas.getContext("2d"),this.sizeSet=!1,this.encoder=new GIF({workers:t.workers,quality:t.quality,workerScript:t.workersPath+"gif.worker.js"}),this.encoder.on("progress",function(t){this.settings.onProgress&&this.settings.onProgress(t)}.bind(this)),this.encoder.on("finished",function(t){var e=this.callback;e&&(this.callback=void 0,e(t))}.bind(this))}function c(t){function e(){function t(){return this._hooked||(this._hooked=!0,this._hookedTime=this.currentTime||0,this.pause(),nt.push(this)),this._hookedTime+S.startTime}b("Capturer start"),A=window.Date.now(),L=A+S.startTime,I=window.performance.now(),E=I+S.startTime,window.Date.prototype.getTime=function(){return L},window.Date.now=function(){return L},window.setTimeout=function(t,e){var n={callback:t,time:e,triggerTime:L+e};return B.push(n),b("Timeout set to "+n.time),n},window.clearTimeout=function(t){for(var e=0;e<B.length;e++)B[e]!=t||(B.splice(e,1),b("Timeout cleared"))},window.setInterval=function(t,e){var n={callback:t,time:e,triggerTime:L+e};return j.push(n),b("Interval set to "+n.time),n},window.clearInterval=function(t){return b("clear Interval"),null},window.requestAnimationFrame=function(t){U.push(t)},window.performance.now=function(){return E};try{Object.defineProperty(HTMLVideoElement.prototype,"currentTime",{get:t}),Object.defineProperty(HTMLAudioElement.prototype,"currentTime",{get:t})}catch(t){b(t)}}function n(){e(),D.start(),M=!0}function i(){M=!1,D.stop(),f()}function r(t,e){Z(t,0,e)}function c(){r(v)}function f(){b("Capturer stop"),window.setTimeout=Z,window.setInterval=J,window.clearInterval=Y,window.clearTimeout=$,window.requestAnimationFrame=Q,window.Date.prototype.getTime=et,window.Date.now=X,window.performance.now=tt}function l(){var t=R/S.framerate;(S.frameLimit&&R>=S.frameLimit||S.timeLimit&&t>=S.timeLimit)&&(i(),y());var e=new Date(null);e.setSeconds(t),S.motionBlurFrames>2?P.textContent="CCapture "+S.format+" | "+R+" frames ("+O+" inter) | "+e.toISOString().substr(11,8):P.textContent="CCapture "+S.format+" | "+R+" frames | "+e.toISOString().substr(11,8)}function p(t){N.width===t.width&&N.height===t.height||(N.width=t.width,N.height=t.height,q=new Uint16Array(N.height*N.width*4),V.fillStyle="#0",V.fillRect(0,0,N.width,N.height))}function m(t){V.drawImage(t,0,0),z=V.getImageData(0,0,N.width,N.height);for(var e=0;e<q.length;e+=4)q[e]+=z.data[e],q[e+1]+=z.data[e+1],q[e+2]+=z.data[e+2];O++}function g(){for(var t=z.data,e=0;e<q.length;e+=4)t[e]=2*q[e]/S.motionBlurFrames,t[e+1]=2*q[e+1]/S.motionBlurFrames,t[e+2]=2*q[e+2]/S.motionBlurFrames;V.putImageData(z,0,0),D.add(N),R++,O=0,b("Full MB Frame! "+R+" "+L);for(var e=0;e<q.length;e+=4)q[e]=0,q[e+1]=0,q[e+2]=0;gc()}function w(t){M&&(S.motionBlurFrames>2?(p(t),m(t),O>=.5*S.motionBlurFrames?g():c()):(D.add(t),R++,b("Full Frame! "+R)))}function v(){var t=1e3/S.framerate,e=(R+O/S.motionBlurFrames)*t;L=A+e,E=I+e,nt.forEach(function(t){t._hookedTime=e/1e3}),l(),b("Frame: "+R+" "+O);for(var n=0;n<B.length;n++)L>=B[n].triggerTime&&(r(B[n].callback),B.splice(n,1));for(var n=0;n<j.length;n++)L>=j[n].triggerTime&&(r(j[n].callback),j[n].triggerTime+=j[n].time);U.forEach(function(t){r(t,L-k)}),U=[]}function y(t){t||(t=function(t){return download(t,D.filename+D.extension,D.mimeType),!1}),D.save(t)}function b(t){_&&console.log(t)}function x(t,e){W[t]=e}function T(t){var e=W[t];e&&e.apply(null,Array.prototype.slice.call(arguments,1))}function C(t){T("progress",t)}var _,F,L,A,E,I,c,D,S=t||{},B=(new Date,[]),j=[],R=0,O=0,U=[],M=!1,W={};S.framerate=S.framerate||60,S.motionBlurFrames=2*(S.motionBlurFrames||1),_=S.verbose||!1,F=S.display||!1,S.step=1e3/S.framerate,S.timeLimit=S.timeLimit||0,S.frameLimit=S.frameLimit||0,S.startTime=S.startTime||0;var P=document.createElement("div");P.style.position="absolute",P.style.left=P.style.top=0,P.style.backgroundColor="black",P.style.fontFamily="monospace",P.style.fontSize="11px",P.style.padding="5px",P.style.color="red",P.style.zIndex=1e5,S.display&&document.body.appendChild(P);var q,z,N=document.createElement("canvas"),V=N.getContext("2d");b("Step is set to "+S.step+"ms");var H={gif:u,webm:s,ffmpegserver:h,png:o,jpg:a,"webm-mediarecorder":d},G=H[S.format];if(!G)throw"Error: Incorrect or missing format: Valid formats are "+Object.keys(H).join(", ");if(D=new G(S),D.step=c,D.on("process",v),D.on("progress",C),"performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var K=Date.now();performance.timing&&performance.timing.navigationStart&&(K=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-K}}var Z=window.setTimeout,J=window.setInterval,Y=window.clearInterval,$=window.clearTimeout,Q=window.requestAnimationFrame,X=window.Date.now,tt=window.performance.now,et=window.Date.prototype.getTime,nt=[];return{start:n,capture:w,stop:i,save:y,on:x}}var f={function:!0,object:!0},l=(parseFloat,parseInt,f[typeof exports]&&exports&&!exports.nodeType?exports:void 0),p=f[typeof module]&&module&&!module.nodeType?module:void 0,m=p&&p.exports===l?l:void 0,g=t(l&&p&&"object"==typeof global&&global),w=t(f[typeof self]&&self),v=t(f[typeof window]&&window),y=t(f[typeof this]&&this),b=g||v!==(y&&y.window)&&v||w||y||Function("return this")();"gc"in window||(window.gc=function(){}),HTMLCanvasElement.prototype.toBlob||Object.defineProperty(HTMLCanvasElement.prototype,"toBlob",{value:function(t,e,n){for(var i=atob(this.toDataURL(e,n).split(",")[1]),r=i.length,o=new Uint8Array(r),a=0;a<r;a++)o[a]=i.charCodeAt(a);t(new Blob([o],{type:e||"image/png"}))}}),function(){if("performance"in window==0&&(window.performance={}),Date.now=Date.now||function(){return(new Date).getTime()},"now"in window.performance==0){var t=Date.now();performance.timing&&performance.timing.navigationStart&&(t=performance.timing.navigationStart),window.performance.now=function(){return Date.now()-t}}}();var k=window.Date.now();i.prototype.start=function(){},i.prototype.stop=function(){},i.prototype.add=function(){},i.prototype.save=function(){},i.prototype.dispose=function(){},i.prototype.safeToProceed=function(){return!0},i.prototype.step=function(){console.log("Step not set!")},r.prototype=Object.create(i.prototype),r.prototype.start=function(){this.dispose()},r.prototype.add=function(t){var n=new FileReader;n.onload=function(){this.tape.append(e(this.count)+this.fileExtension,new Uint8Array(n.result)),this.count++,this.step()}.bind(this),n.readAsArrayBuffer(t)},r.prototype.save=function(t){t(this.tape.save())},r.prototype.dispose=function(){this.tape=new Tar,this.count=0},o.prototype=Object.create(r.prototype),o.prototype.add=function(t){t.toBlob(function(t){r.prototype.add.call(this,t)}.bind(this),this.type)},a.prototype=Object.create(r.prototype),a.prototype.add=function(t){t.toBlob(function(t){r.prototype.add.call(this,t)}.bind(this),this.type,this.quality)},s.prototype=Object.create(i.prototype),s.prototype.start=function(t){this.dispose()},s.prototype.add=function(t){this.frames.push(t.toDataURL("image/webp",this.quality)),this.settings.autoSaveTime>0&&this.frames.length/this.settings.framerate>=this.settings.autoSaveTime?this.save(function(t){this.filename=this.baseFilename+"-part-"+e(this.part),download(t,this.filename+this.extension,this.mimeType),this.dispose(),this.part++,this.filename=this.baseFilename+"-part-"+e(this.part),this.step()}.bind(this)):this.step()},s.prototype.save=function(t){if(this.frames.length){var e=Whammy.fromImageArray(this.frames,this.settings.framerate),n=new Blob([e],{type:"octet/stream"});t(n)}},s.prototype.dispose=function(t){this.frames=[]},h.prototype=Object.create(i.prototype),h.prototype.start=function(){this.encoder.start(this.settings)},h.prototype.add=function(t){this.encoder.add(t)},h.prototype.save=function(t){this.callback=t,this.encoder.end()},h.prototype.safeToProceed=function(){return this.encoder.safeToProceed()},d.prototype=Object.create(i.prototype),d.prototype.add=function(t){this.stream||(this.stream=t.captureStream(this.framerate),this.mediaRecorder=new MediaRecorder(this.stream),this.mediaRecorder.start(),this.mediaRecorder.ondataavailable=function(t){this.chunks.push(t.data)}.bind(this)),this.step()},d.prototype.save=function(t){this.mediaRecorder.onstop=function(e){var n=new Blob(this.chunks,{type:"video/webm"});this.chunks=[],t(n)}.bind(this),this.mediaRecorder.stop()},u.prototype=Object.create(i.prototype),u.prototype.add=function(t){this.sizeSet||(this.encoder.setOption("width",t.width),this.encoder.setOption("height",t.height),this.sizeSet=!0),this.canvas.width=t.width,this.canvas.height=t.height,this.ctx.drawImage(t,0,0),this.encoder.addFrame(this.ctx,{copy:!0,delay:this.settings.step}),this.step()},u.prototype.save=function(t){this.callback=t,this.encoder.render()},(v||w||{}).CCapture=c, true?!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return c}.call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):l&&p?(m&&((p.exports=c).CCapture=c),l.CCapture=c):b.CCapture=c}();
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(62)(module), __webpack_require__(1)))

/***/ }),
/* 62 */
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


/***/ })
/******/ ]);
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiMjU5NzQ0ODcyYzkzZjlmMjkwMyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9HTEVycm9yLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvcmVmbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2xpdGVyYWxzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvYnVpbHRpbnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvZG8tYmluZC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmVzNi5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdmVydC5nbHNsIiwid2VicGFjazovLy8uL3NyYy9mcmFnLmdsc2wiLCJ3ZWJwYWNrOi8vLy4vc3JjL2VxLXBhcnNlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtY2xlYXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2RlZmF1bHRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jb250ZXh0L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yYWYtY29tcG9uZW50L2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvY3JlYXRlLXVuaWZvcm1zLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS1hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3NoYWRlci1jYWNoZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtZm9ybWF0LWNvbXBpbGVyLWVycm9yL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9zcHJpbnRmLWpzL3NyYy9zcHJpbnRmLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jb25zdGFudHMvbG9va3VwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1jb25zdGFudHMvMS4wL251bWJlcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtc2hhZGVyLW5hbWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL3N0cmluZy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9vcGVyYXRvcnMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9saXRlcmFscy0zMDBlcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLTMwMGVzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hdG9iLWxpdGUvYXRvYi1icm93c2VyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9hZGQtbGluZS1udW1iZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9wYWQtbGVmdC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvcmVwZWF0LXN0cmluZy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vY3JlYXRlLXN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vaGlkZGVuLXN0b3JlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL3J1bnRpbWUtcmVmbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtcmVzZXQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L3N0YXRlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9yaWdodC1ub3cvYnJvd3Nlci5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYS1iaWctdHJpYW5nbGUvdHJpYW5nbGUuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL3dlYWstbWFwL3dlYWstbWFwLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9nbC1idWZmZXIvYnVmZmVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy90eXBlZGFycmF5LXBvb2wvcG9vbC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9iYXNlNjQtanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2J1ZmZlci9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYml0LXR3aWRkbGUvdHdpZGRsZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZHVwL2R1cC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvbmRhcnJheS1vcHMvbmRhcnJheS1vcHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2NvbXBpbGVyLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvdGh1bmsuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2xpYi9jb21waWxlLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy91bmlxL3VuaXEuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL25kYXJyYXkvbmRhcnJheS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvaW90YS1hcnJheS9pb3RhLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9pcy1idWZmZXIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby92YW8uanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLW5hdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi92YW8tZW11bGF0ZWQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL2NjYXB0dXJlLmpzL2J1aWxkL0NDYXB0dXJlLmFsbC5taW4uanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL21vZHVsZS5qcyJdLCJuYW1lcyI6WyJjb25zdCIsImxldCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7OztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ1pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0Q0FBNEM7O0FBRTVDOzs7Ozs7OztBQ3BCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsbUJBQW1CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixnQkFBZ0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLFlBQVk7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQzs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNyQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLG9CQUFvQjtBQUMvQztBQUNBO0FBQ0EsR0FBRztBQUNILDJCQUEyQixvQkFBb0I7QUFDL0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsb0JBQW9CO0FBQ3JDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxxQkFBcUI7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBVSw2QkFBNkI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7OztBQ3ZRQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSwrQ0FBK0MsU0FBUztBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLCtEQUErRDtBQUMxRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0EsZ0JBQWdCLGtCQUFrQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGNBQWM7QUFDaEM7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDOUxBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxPQUFPLEtBQUs7QUFDWjtBQUNBLGNBQWM7QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxhQUFhO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixhQUFhO0FBQ2pDO0FBQ0E7QUFDQSxPQUFPO0FBQ1Asb0JBQW9CLGFBQWE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLGFBQWE7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxzQkFBc0IsYUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG1DQUFtQyxLQUFLOztBQUV4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0UUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQ0FBbUMsS0FBSztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLElBQUk7QUFDekI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUN0SUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsbUJBQW1CLHlCQUF5QjtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLG1CQUFtQixrQkFBa0I7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDbkRBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsRUFBRTtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQSwrQkFBK0IscUJBQXFCO0FBQ3BEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0Esc0JBQXNCO0FBQ3RCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUFBO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7OztBQ3pORDs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3pTQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDWkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsZ0RBQWdEO0FBQ2hELDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsc0NBQXNDO0FBQ3RDLG9DQUFvQztBQUNwQyw0QkFBNEI7QUFDNUIsa0NBQWtDO0FBQ2xDLG9DQUFvQztBQUNwQywwQ0FBMEM7QUFDMUMsa0NBQWtDO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQSw2QkFBNkIsUUFBUTtBQUNyQyx5QkFBeUI7QUFDekI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUN6V0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ04sTUFBTTtBQUNOLE1BQU07QUFDTjs7Ozs7OztBQzlDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkZBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDcEVBO0FBQ0E7QUFDQTs7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOzs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFlBQVksT0FBTztBQUNuQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0Msa0JBQWtCO0FBQ3hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELHFCQUFxQjtBQUN4RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FB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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7c0RDdkpBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsY0FBYyxNQUFNO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEM7Ozs7Ozs7O0FDck5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLG1EQUFtRDtBQUN4RTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLFVBQVU7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSx1Q0FBdUMsU0FBUztBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsaUJBQWlCO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxFQUFFO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixlQUFlO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLHdCQUF3QixRQUFRO0FBQ2hDO0FBQ0EscUJBQXFCLGVBQWU7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFlBQVk7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUIsU0FBUztBQUM5QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQjtBQUNsQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFCQUFxQixRQUFRO0FBQzdCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSxlQUFlLFNBQVM7QUFDeEI7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsU0FBUztBQUM1QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsNEJBQTRCLGNBQWM7QUFDMUMsNEJBQTRCLGNBQWM7QUFDMUMsNEJBQTRCLGNBQWM7QUFDMUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxrQkFBa0IsR0FBRztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQzFNQTs7QUFF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eC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFwidml6cGxleFwiLCBbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJ2aXpwbGV4XCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInZpenBsZXhcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiBcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNik7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgYjI1OTc0NDg3MmM5M2Y5ZjI5MDMiLCJmdW5jdGlvbiBHTEVycm9yIChyYXdFcnJvciwgc2hvcnRNZXNzYWdlLCBsb25nTWVzc2FnZSkge1xuICAgIHRoaXMuc2hvcnRNZXNzYWdlID0gc2hvcnRNZXNzYWdlIHx8ICcnXG4gICAgdGhpcy5sb25nTWVzc2FnZSA9IGxvbmdNZXNzYWdlIHx8ICcnXG4gICAgdGhpcy5yYXdFcnJvciA9IHJhd0Vycm9yIHx8ICcnXG4gICAgdGhpcy5tZXNzYWdlID1cbiAgICAgICdnbC1zaGFkZXI6ICcgKyAoc2hvcnRNZXNzYWdlIHx8IHJhd0Vycm9yIHx8ICcnKSArXG4gICAgICAobG9uZ01lc3NhZ2UgPyAnXFxuJytsb25nTWVzc2FnZSA6ICcnKVxuICAgIHRoaXMuc3RhY2sgPSAobmV3IEVycm9yKCkpLnN0YWNrXG59XG5HTEVycm9yLnByb3RvdHlwZSA9IG5ldyBFcnJvclxuR0xFcnJvci5wcm90b3R5cGUubmFtZSA9ICdHTEVycm9yJ1xuR0xFcnJvci5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBHTEVycm9yXG5tb2R1bGUuZXhwb3J0cyA9IEdMRXJyb3JcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvR0xFcnJvci5qc1xuLy8gbW9kdWxlIGlkID0gMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZztcclxuXHJcbi8vIFRoaXMgd29ya3MgaW4gbm9uLXN0cmljdCBtb2RlXHJcbmcgPSAoZnVuY3Rpb24oKSB7XHJcblx0cmV0dXJuIHRoaXM7XHJcbn0pKCk7XHJcblxyXG50cnkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgZXZhbCBpcyBhbGxvd2VkIChzZWUgQ1NQKVxyXG5cdGcgPSBnIHx8IEZ1bmN0aW9uKFwicmV0dXJuIHRoaXNcIikoKSB8fCAoMSxldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2goZSkge1xyXG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXHJcblx0aWYodHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIilcclxuXHRcdGcgPSB3aW5kb3c7XHJcbn1cclxuXHJcbi8vIGcgY2FuIHN0aWxsIGJlIHVuZGVmaW5lZCwgYnV0IG5vdGhpbmcgdG8gZG8gYWJvdXQgaXQuLi5cclxuLy8gV2UgcmV0dXJuIHVuZGVmaW5lZCwgaW5zdGVhZCBvZiBub3RoaW5nIGhlcmUsIHNvIGl0J3NcclxuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBnO1xyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAod2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanNcbi8vIG1vZHVsZSBpZCA9IDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gbWFrZVJlZmxlY3RUeXBlc1xuXG4vL0NvbnN0cnVjdCB0eXBlIGluZm8gZm9yIHJlZmxlY3Rpb24uXG4vL1xuLy8gVGhpcyBpdGVyYXRlcyBvdmVyIHRoZSBmbGF0dGVuZWQgbGlzdCBvZiB1bmlmb3JtIHR5cGUgdmFsdWVzIGFuZCBzbWFzaGVzIHRoZW0gaW50byBhIEpTT04gb2JqZWN0LlxuLy9cbi8vIFRoZSBsZWF2ZXMgb2YgdGhlIHJlc3VsdGluZyBvYmplY3QgYXJlIGVpdGhlciBpbmRpY2VzIG9yIHR5cGUgc3RyaW5ncyByZXByZXNlbnRpbmcgcHJpbWl0aXZlIGdsc2xpZnkgdHlwZXNcbmZ1bmN0aW9uIG1ha2VSZWZsZWN0VHlwZXModW5pZm9ybXMsIHVzZUluZGV4KSB7XG4gIHZhciBvYmogPSB7fVxuICBmb3IodmFyIGk9MDsgaTx1bmlmb3Jtcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBuID0gdW5pZm9ybXNbaV0ubmFtZVxuICAgIHZhciBwYXJ0cyA9IG4uc3BsaXQoXCIuXCIpXG4gICAgdmFyIG8gPSBvYmpcbiAgICBmb3IodmFyIGo9MDsgajxwYXJ0cy5sZW5ndGg7ICsraikge1xuICAgICAgdmFyIHggPSBwYXJ0c1tqXS5zcGxpdChcIltcIilcbiAgICAgIGlmKHgubGVuZ3RoID4gMSkge1xuICAgICAgICBpZighKHhbMF0gaW4gbykpIHtcbiAgICAgICAgICBvW3hbMF1dID0gW11cbiAgICAgICAgfVxuICAgICAgICBvID0gb1t4WzBdXVxuICAgICAgICBmb3IodmFyIGs9MTsgazx4Lmxlbmd0aDsgKytrKSB7XG4gICAgICAgICAgdmFyIHkgPSBwYXJzZUludCh4W2tdKVxuICAgICAgICAgIGlmKGs8eC5sZW5ndGgtMSB8fCBqPHBhcnRzLmxlbmd0aC0xKSB7XG4gICAgICAgICAgICBpZighKHkgaW4gbykpIHtcbiAgICAgICAgICAgICAgaWYoayA8IHgubGVuZ3RoLTEpIHtcbiAgICAgICAgICAgICAgICBvW3ldID0gW11cbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvW3ldID0ge31cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbyA9IG9beV1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYodXNlSW5kZXgpIHtcbiAgICAgICAgICAgICAgb1t5XSA9IGlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG9beV0gPSB1bmlmb3Jtc1tpXS50eXBlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYoaiA8IHBhcnRzLmxlbmd0aC0xKSB7XG4gICAgICAgIGlmKCEoeFswXSBpbiBvKSkge1xuICAgICAgICAgIG9beFswXV0gPSB7fVxuICAgICAgICB9XG4gICAgICAgIG8gPSBvW3hbMF1dXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZih1c2VJbmRleCkge1xuICAgICAgICAgIG9beFswXV0gPSBpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgb1t4WzBdXSA9IHVuaWZvcm1zW2ldLnR5cGVcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gb2JqXG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9yZWZsZWN0LmpzXG4vLyBtb2R1bGUgaWQgPSAyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gW1xuICAvLyBjdXJyZW50XG4gICAgJ3ByZWNpc2lvbidcbiAgLCAnaGlnaHAnXG4gICwgJ21lZGl1bXAnXG4gICwgJ2xvd3AnXG4gICwgJ2F0dHJpYnV0ZSdcbiAgLCAnY29uc3QnXG4gICwgJ3VuaWZvcm0nXG4gICwgJ3ZhcnlpbmcnXG4gICwgJ2JyZWFrJ1xuICAsICdjb250aW51ZSdcbiAgLCAnZG8nXG4gICwgJ2ZvcidcbiAgLCAnd2hpbGUnXG4gICwgJ2lmJ1xuICAsICdlbHNlJ1xuICAsICdpbidcbiAgLCAnb3V0J1xuICAsICdpbm91dCdcbiAgLCAnZmxvYXQnXG4gICwgJ2ludCdcbiAgLCAndm9pZCdcbiAgLCAnYm9vbCdcbiAgLCAndHJ1ZSdcbiAgLCAnZmFsc2UnXG4gICwgJ2Rpc2NhcmQnXG4gICwgJ3JldHVybidcbiAgLCAnbWF0MidcbiAgLCAnbWF0MydcbiAgLCAnbWF0NCdcbiAgLCAndmVjMidcbiAgLCAndmVjMydcbiAgLCAndmVjNCdcbiAgLCAnaXZlYzInXG4gICwgJ2l2ZWMzJ1xuICAsICdpdmVjNCdcbiAgLCAnYnZlYzInXG4gICwgJ2J2ZWMzJ1xuICAsICdidmVjNCdcbiAgLCAnc2FtcGxlcjFEJ1xuICAsICdzYW1wbGVyMkQnXG4gICwgJ3NhbXBsZXIzRCdcbiAgLCAnc2FtcGxlckN1YmUnXG4gICwgJ3NhbXBsZXIxRFNoYWRvdydcbiAgLCAnc2FtcGxlcjJEU2hhZG93J1xuICAsICdzdHJ1Y3QnXG5cbiAgLy8gZnV0dXJlXG4gICwgJ2FzbSdcbiAgLCAnY2xhc3MnXG4gICwgJ3VuaW9uJ1xuICAsICdlbnVtJ1xuICAsICd0eXBlZGVmJ1xuICAsICd0ZW1wbGF0ZSdcbiAgLCAndGhpcydcbiAgLCAncGFja2VkJ1xuICAsICdnb3RvJ1xuICAsICdzd2l0Y2gnXG4gICwgJ2RlZmF1bHQnXG4gICwgJ2lubGluZSdcbiAgLCAnbm9pbmxpbmUnXG4gICwgJ3ZvbGF0aWxlJ1xuICAsICdwdWJsaWMnXG4gICwgJ3N0YXRpYydcbiAgLCAnZXh0ZXJuJ1xuICAsICdleHRlcm5hbCdcbiAgLCAnaW50ZXJmYWNlJ1xuICAsICdsb25nJ1xuICAsICdzaG9ydCdcbiAgLCAnZG91YmxlJ1xuICAsICdoYWxmJ1xuICAsICdmaXhlZCdcbiAgLCAndW5zaWduZWQnXG4gICwgJ2lucHV0J1xuICAsICdvdXRwdXQnXG4gICwgJ2h2ZWMyJ1xuICAsICdodmVjMydcbiAgLCAnaHZlYzQnXG4gICwgJ2R2ZWMyJ1xuICAsICdkdmVjMydcbiAgLCAnZHZlYzQnXG4gICwgJ2Z2ZWMyJ1xuICAsICdmdmVjMydcbiAgLCAnZnZlYzQnXG4gICwgJ3NhbXBsZXIyRFJlY3QnXG4gICwgJ3NhbXBsZXIzRFJlY3QnXG4gICwgJ3NhbXBsZXIyRFJlY3RTaGFkb3cnXG4gICwgJ3NpemVvZidcbiAgLCAnY2FzdCdcbiAgLCAnbmFtZXNwYWNlJ1xuICAsICd1c2luZydcbl1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9saXRlcmFscy5qc1xuLy8gbW9kdWxlIGlkID0gM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFtcbiAgLy8gS2VlcCB0aGlzIGxpc3Qgc29ydGVkXG4gICdhYnMnXG4gICwgJ2Fjb3MnXG4gICwgJ2FsbCdcbiAgLCAnYW55J1xuICAsICdhc2luJ1xuICAsICdhdGFuJ1xuICAsICdjZWlsJ1xuICAsICdjbGFtcCdcbiAgLCAnY29zJ1xuICAsICdjcm9zcydcbiAgLCAnZEZkeCdcbiAgLCAnZEZkeSdcbiAgLCAnZGVncmVlcydcbiAgLCAnZGlzdGFuY2UnXG4gICwgJ2RvdCdcbiAgLCAnZXF1YWwnXG4gICwgJ2V4cCdcbiAgLCAnZXhwMidcbiAgLCAnZmFjZWZvcndhcmQnXG4gICwgJ2Zsb29yJ1xuICAsICdmcmFjdCdcbiAgLCAnZ2xfQmFja0NvbG9yJ1xuICAsICdnbF9CYWNrTGlnaHRNb2RlbFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tMaWdodFByb2R1Y3QnXG4gICwgJ2dsX0JhY2tNYXRlcmlhbCdcbiAgLCAnZ2xfQmFja1NlY29uZGFyeUNvbG9yJ1xuICAsICdnbF9DbGlwUGxhbmUnXG4gICwgJ2dsX0NsaXBWZXJ0ZXgnXG4gICwgJ2dsX0NvbG9yJ1xuICAsICdnbF9EZXB0aFJhbmdlJ1xuICAsICdnbF9EZXB0aFJhbmdlUGFyYW1ldGVycydcbiAgLCAnZ2xfRXllUGxhbmVRJ1xuICAsICdnbF9FeWVQbGFuZVInXG4gICwgJ2dsX0V5ZVBsYW5lUydcbiAgLCAnZ2xfRXllUGxhbmVUJ1xuICAsICdnbF9Gb2cnXG4gICwgJ2dsX0ZvZ0Nvb3JkJ1xuICAsICdnbF9Gb2dGcmFnQ29vcmQnXG4gICwgJ2dsX0ZvZ1BhcmFtZXRlcnMnXG4gICwgJ2dsX0ZyYWdDb2xvcidcbiAgLCAnZ2xfRnJhZ0Nvb3JkJ1xuICAsICdnbF9GcmFnRGF0YSdcbiAgLCAnZ2xfRnJhZ0RlcHRoJ1xuICAsICdnbF9GcmFnRGVwdGhFWFQnXG4gICwgJ2dsX0Zyb250Q29sb3InXG4gICwgJ2dsX0Zyb250RmFjaW5nJ1xuICAsICdnbF9Gcm9udExpZ2h0TW9kZWxQcm9kdWN0J1xuICAsICdnbF9Gcm9udExpZ2h0UHJvZHVjdCdcbiAgLCAnZ2xfRnJvbnRNYXRlcmlhbCdcbiAgLCAnZ2xfRnJvbnRTZWNvbmRhcnlDb2xvcidcbiAgLCAnZ2xfTGlnaHRNb2RlbCdcbiAgLCAnZ2xfTGlnaHRNb2RlbFBhcmFtZXRlcnMnXG4gICwgJ2dsX0xpZ2h0TW9kZWxQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRQcm9kdWN0cydcbiAgLCAnZ2xfTGlnaHRTb3VyY2UnXG4gICwgJ2dsX0xpZ2h0U291cmNlUGFyYW1ldGVycydcbiAgLCAnZ2xfTWF0ZXJpYWxQYXJhbWV0ZXJzJ1xuICAsICdnbF9NYXhDbGlwUGxhbmVzJ1xuICAsICdnbF9NYXhDb21iaW5lZFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhEcmF3QnVmZmVycydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRVbmlmb3JtQ29tcG9uZW50cydcbiAgLCAnZ2xfTWF4TGlnaHRzJ1xuICAsICdnbF9NYXhUZXh0dXJlQ29vcmRzJ1xuICAsICdnbF9NYXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VGV4dHVyZVVuaXRzJ1xuICAsICdnbF9NYXhWYXJ5aW5nRmxvYXRzJ1xuICAsICdnbF9NYXhWZXJ0ZXhBdHRyaWJzJ1xuICAsICdnbF9NYXhWZXJ0ZXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4VmVydGV4VW5pZm9ybUNvbXBvbmVudHMnXG4gICwgJ2dsX01vZGVsVmlld01hdHJpeCdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfTW9kZWxWaWV3TWF0cml4VHJhbnNwb3NlJ1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4J1xuICAsICdnbF9Nb2RlbFZpZXdQcm9qZWN0aW9uTWF0cml4SW52ZXJzZSdcbiAgLCAnZ2xfTW9kZWxWaWV3UHJvamVjdGlvbk1hdHJpeEludmVyc2VUcmFuc3Bvc2UnXG4gICwgJ2dsX01vZGVsVmlld1Byb2plY3Rpb25NYXRyaXhUcmFuc3Bvc2UnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQwJ1xuICAsICdnbF9NdWx0aVRleENvb3JkMSdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDInXG4gICwgJ2dsX011bHRpVGV4Q29vcmQzJ1xuICAsICdnbF9NdWx0aVRleENvb3JkNCdcbiAgLCAnZ2xfTXVsdGlUZXhDb29yZDUnXG4gICwgJ2dsX011bHRpVGV4Q29vcmQ2J1xuICAsICdnbF9NdWx0aVRleENvb3JkNydcbiAgLCAnZ2xfTm9ybWFsJ1xuICAsICdnbF9Ob3JtYWxNYXRyaXgnXG4gICwgJ2dsX05vcm1hbFNjYWxlJ1xuICAsICdnbF9PYmplY3RQbGFuZVEnXG4gICwgJ2dsX09iamVjdFBsYW5lUidcbiAgLCAnZ2xfT2JqZWN0UGxhbmVTJ1xuICAsICdnbF9PYmplY3RQbGFuZVQnXG4gICwgJ2dsX1BvaW50J1xuICAsICdnbF9Qb2ludENvb3JkJ1xuICAsICdnbF9Qb2ludFBhcmFtZXRlcnMnXG4gICwgJ2dsX1BvaW50U2l6ZSdcbiAgLCAnZ2xfUG9zaXRpb24nXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXgnXG4gICwgJ2dsX1Byb2plY3Rpb25NYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9Qcm9qZWN0aW9uTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfUHJvamVjdGlvbk1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfU2Vjb25kYXJ5Q29sb3InXG4gICwgJ2dsX1RleENvb3JkJ1xuICAsICdnbF9UZXh0dXJlRW52Q29sb3InXG4gICwgJ2dsX1RleHR1cmVNYXRyaXgnXG4gICwgJ2dsX1RleHR1cmVNYXRyaXhJbnZlcnNlJ1xuICAsICdnbF9UZXh0dXJlTWF0cml4SW52ZXJzZVRyYW5zcG9zZSdcbiAgLCAnZ2xfVGV4dHVyZU1hdHJpeFRyYW5zcG9zZSdcbiAgLCAnZ2xfVmVydGV4J1xuICAsICdncmVhdGVyVGhhbidcbiAgLCAnZ3JlYXRlclRoYW5FcXVhbCdcbiAgLCAnaW52ZXJzZXNxcnQnXG4gICwgJ2xlbmd0aCdcbiAgLCAnbGVzc1RoYW4nXG4gICwgJ2xlc3NUaGFuRXF1YWwnXG4gICwgJ2xvZydcbiAgLCAnbG9nMidcbiAgLCAnbWF0cml4Q29tcE11bHQnXG4gICwgJ21heCdcbiAgLCAnbWluJ1xuICAsICdtaXgnXG4gICwgJ21vZCdcbiAgLCAnbm9ybWFsaXplJ1xuICAsICdub3QnXG4gICwgJ25vdEVxdWFsJ1xuICAsICdwb3cnXG4gICwgJ3JhZGlhbnMnXG4gICwgJ3JlZmxlY3QnXG4gICwgJ3JlZnJhY3QnXG4gICwgJ3NpZ24nXG4gICwgJ3NpbidcbiAgLCAnc21vb3Roc3RlcCdcbiAgLCAnc3FydCdcbiAgLCAnc3RlcCdcbiAgLCAndGFuJ1xuICAsICd0ZXh0dXJlMkQnXG4gICwgJ3RleHR1cmUyRExvZCdcbiAgLCAndGV4dHVyZTJEUHJvaidcbiAgLCAndGV4dHVyZTJEUHJvakxvZCdcbiAgLCAndGV4dHVyZUN1YmUnXG4gICwgJ3RleHR1cmVDdWJlTG9kJ1xuICAsICd0ZXh0dXJlMkRMb2RFWFQnXG4gICwgJ3RleHR1cmUyRFByb2pMb2RFWFQnXG4gICwgJ3RleHR1cmVDdWJlTG9kRVhUJ1xuICAsICd0ZXh0dXJlMkRHcmFkRVhUJ1xuICAsICd0ZXh0dXJlMkRQcm9qR3JhZEVYVCdcbiAgLCAndGV4dHVyZUN1YmVHcmFkRVhUJ1xuXVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGRvQmluZChnbCwgZWxlbWVudHMsIGF0dHJpYnV0ZXMpIHtcbiAgaWYoZWxlbWVudHMpIHtcbiAgICBlbGVtZW50cy5iaW5kKClcbiAgfSBlbHNlIHtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSLCBudWxsKVxuICB9XG4gIHZhciBuYXR0cmlicyA9IGdsLmdldFBhcmFtZXRlcihnbC5NQVhfVkVSVEVYX0FUVFJJQlMpfDBcbiAgaWYoYXR0cmlidXRlcykge1xuICAgIGlmKGF0dHJpYnV0ZXMubGVuZ3RoID4gbmF0dHJpYnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImdsLXZhbzogVG9vIG1hbnkgdmVydGV4IGF0dHJpYnV0ZXNcIilcbiAgICB9XG4gICAgZm9yKHZhciBpPTA7IGk8YXR0cmlidXRlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGF0dHJpYiA9IGF0dHJpYnV0ZXNbaV1cbiAgICAgIGlmKGF0dHJpYi5idWZmZXIpIHtcbiAgICAgICAgdmFyIGJ1ZmZlciA9IGF0dHJpYi5idWZmZXJcbiAgICAgICAgdmFyIHNpemUgPSBhdHRyaWIuc2l6ZSB8fCA0XG4gICAgICAgIHZhciB0eXBlID0gYXR0cmliLnR5cGUgfHwgZ2wuRkxPQVRcbiAgICAgICAgdmFyIG5vcm1hbGl6ZWQgPSAhIWF0dHJpYi5ub3JtYWxpemVkXG4gICAgICAgIHZhciBzdHJpZGUgPSBhdHRyaWIuc3RyaWRlIHx8IDBcbiAgICAgICAgdmFyIG9mZnNldCA9IGF0dHJpYi5vZmZzZXQgfHwgMFxuICAgICAgICBidWZmZXIuYmluZCgpXG4gICAgICAgIGdsLmVuYWJsZVZlcnRleEF0dHJpYkFycmF5KGkpXG4gICAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoaSwgc2l6ZSwgdHlwZSwgbm9ybWFsaXplZCwgc3RyaWRlLCBvZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZih0eXBlb2YgYXR0cmliID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgICAgZ2wudmVydGV4QXR0cmliMWYoaSwgYXR0cmliKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjFmKGksIGF0dHJpYlswXSlcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIyZihpLCBhdHRyaWJbMF0sIGF0dHJpYlsxXSlcbiAgICAgICAgfSBlbHNlIGlmKGF0dHJpYi5sZW5ndGggPT09IDMpIHtcbiAgICAgICAgICBnbC52ZXJ0ZXhBdHRyaWIzZihpLCBhdHRyaWJbMF0sIGF0dHJpYlsxXSwgYXR0cmliWzJdKVxuICAgICAgICB9IGVsc2UgaWYoYXR0cmliLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgIGdsLnZlcnRleEF0dHJpYjRmKGksIGF0dHJpYlswXSwgYXR0cmliWzFdLCBhdHRyaWJbMl0sIGF0dHJpYlszXSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC12YW86IEludmFsaWQgdmVydGV4IGF0dHJpYnV0ZVwiKVxuICAgICAgICB9XG4gICAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IoOyBpPG5hdHRyaWJzOyArK2kpIHtcbiAgICAgIGdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbClcbiAgICBmb3IodmFyIGk9MDsgaTxuYXR0cmliczsgKytpKSB7XG4gICAgICBnbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb0JpbmRcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC12YW8vbGliL2RvLWJpbmQuanNcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gQ29tbW9uSlMgaGFjayB0byBtYWtlIHdlYnBhY2sganVzdCBleHBvcnQgdGhlIGZ1bmN0aW9uIGluc3RlYWQgb2YgYW4gb2JqZWN0XG4vLyBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay93ZWJwYWNrL2lzc3Vlcy8zOTI5XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9pbmRleC5lczYnKS5kZWZhdWx0XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguanMiLCJpbXBvcnQgdmVydCBmcm9tICcuL3ZlcnQuZ2xzbCdcclxuaW1wb3J0IHJhd0ZyYWcgZnJvbSAnLi9mcmFnLmdsc2wnXHJcbmltcG9ydCBlcVBhcnNlciBmcm9tICcuL2VxLXBhcnNlcidcclxuXHJcbmltcG9ydCBnbENsZWFyIGZyb20gJ2dsLWNsZWFyJ1xyXG5pbXBvcnQgZ2xDb250ZXh0IGZyb20gJ2dsLWNvbnRleHQnXHJcbmltcG9ydCBnbFNoYWRlciBmcm9tICdnbC1zaGFkZXInXHJcbmltcG9ydCBnbFJlc2V0IGZyb20gJ2dsLXJlc2V0J1xyXG5pbXBvcnQgbm93IGZyb20gJ3JpZ2h0LW5vdydcclxuaW1wb3J0IGRyYXcgZnJvbSAnYS1iaWctdHJpYW5nbGUnXHJcbmltcG9ydCBDQ2FwdHVyZSBmcm9tICdjY2FwdHVyZS5qcydcclxuXHJcbmNvbnN0IGNsZWFyID0gZ2xDbGVhcih7IGNvbG9yOiBbMCwgMSwgMCwgMV0gfSlcclxuY29uc3QgZnJhZ0xvb2t1cCA9IHtcclxuICBcIiVSX0ZOJVwiOiAwLFxyXG4gIFwiJUdfRk4lXCI6IDEsXHJcbiAgXCIlQl9GTiVcIjogMixcclxuICBcIiVBX0ZOJVwiOiAzXHJcbn1cclxubGV0IGdsXHJcbmxldCBzaGFkZXJcclxubGV0IHRGYWN0b3JcclxubGV0IGNhbnZhc1xyXG5sZXQgY2FwdHVyZXJcclxubGV0IHJlc2V0XHJcbmxldCB0aW1lID0gbm93KCkgLyAxMDAwXHJcblxyXG5mdW5jdGlvbiBhbmltYXRlICgpIHtcclxuICB0aW1lID0gbm93KCkgLyAxMDAwXHJcbn1cclxuZnVuY3Rpb24gcmVuZGVyICgpIHtcclxuICBjb25zdCB3aWR0aCA9IGdsLmRyYXdpbmdCdWZmZXJXaWR0aFxyXG4gIGNvbnN0IGhlaWdodCA9IGdsLmRyYXdpbmdCdWZmZXJIZWlnaHRcclxuXHJcbiAgYW5pbWF0ZSgpXHJcbiAgY2xlYXIoZ2wpXHJcbiAgZ2wudmlld3BvcnQoMCwgMCwgd2lkdGgsIGhlaWdodClcclxuXHJcbiAgc2hhZGVyLmJpbmQoKVxyXG4gIHNoYWRlci51bmlmb3Jtcy50ID0gdEZhY3RvciAqIHRpbWVcclxuICBzaGFkZXIuYXR0cmlidXRlcy5wb3NpdGlvbi5wb2ludGVyKClcclxuICBkcmF3KGdsKVxyXG4gIFxyXG4gIGlmIChjYXB0dXJlcikge1xyXG4gICAgY2FwdHVyZXIuY2FwdHVyZShjYW52YXMpXHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB2aXpwbGV4ICh0YXJnZXQsIHJnYmEsIG9wdGlvbnMpIHtcclxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxyXG4gIGNhcHR1cmVyID0gb3B0aW9ucy5jY2FwQ29uZmlnID8gbmV3IENDYXB0dXJlKG9wdGlvbnMuY2NhcENvbmZpZykgOiBudWxsXHJcbiAgdEZhY3RvciA9IG9wdGlvbnMudGltZUZhY3RvciB8fCAxXHJcbiAgY2FudmFzID0gdHlwZW9mIHRhcmdldCA9PT0gXCJzdHJpbmdcIlxyXG4gICAgPyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldClcclxuICAgIDogdGFyZ2V0XHJcbiAgbGV0IGZyYWdcclxuXHJcbiAgaWYgKGNhcHR1cmVyKSB7XHJcbiAgICBjYXB0dXJlci5zdGFydCgpXHJcbiAgfVxyXG4gIGlmIChnbCkge1xyXG4gICAgcmVzZXQoKVxyXG4gIH1cclxuXHJcbiAgZ2wgPSBnbENvbnRleHQoY2FudmFzLCByZW5kZXIpXHJcbiAgcmVzZXQgPSBnbFJlc2V0KGdsKVxyXG4gIHJnYmEgPSByZ2JhLm1hcChmblN0ciA9PiBlcVBhcnNlcihmblN0cikpXHJcbiAgZnJhZyA9IHJhd0ZyYWcucmVwbGFjZSgvKCVSX0ZOJXwlR19GTiV8JUJfRk4lfCVBX0ZOJSkvZywgc3Vic3RyID0+IHJnYmFbZnJhZ0xvb2t1cFtzdWJzdHJdXSlcclxuICAgICAgICAgICAgICAgIC5yZXBsYWNlKC8lTk9JU0UlL2csICdzbm9pc2VfMV8zJylcclxuICBzaGFkZXIgPSBnbFNoYWRlcihnbCwgdmVydCwgZnJhZylcclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvaW5kZXguZXM2LmpzIiwibW9kdWxlLmV4cG9ydHMgPSBcIiNkZWZpbmUgR0xTTElGWSAxXFxuYXR0cmlidXRlIHZlYzMgcG9zaXRpb247XFxuXFxudm9pZCBtYWluKCkge1xcbiAgZ2xfUG9zaXRpb24gPSB2ZWM0KHBvc2l0aW9uLCAxLjApO1xcbn1cXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL3ZlcnQuZ2xzbFxuLy8gbW9kdWxlIGlkID0gOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IFwicHJlY2lzaW9uIG1lZGl1bXAgZmxvYXQ7XFxuI2RlZmluZSBHTFNMSUZZIDFcXG5cXG51bmlmb3JtIGZsb2F0IHQ7XFxuXFxuLy9cXG4vLyBEZXNjcmlwdGlvbiA6IEFycmF5IGFuZCB0ZXh0dXJlbGVzcyBHTFNMIDJELzNELzREIHNpbXBsZXhcXG4vLyAgICAgICAgICAgICAgIG5vaXNlIGZ1bmN0aW9ucy5cXG4vLyAgICAgIEF1dGhvciA6IElhbiBNY0V3YW4sIEFzaGltYSBBcnRzLlxcbi8vICBNYWludGFpbmVyIDogaWptXFxuLy8gICAgIExhc3Rtb2QgOiAyMDExMDgyMiAoaWptKVxcbi8vICAgICBMaWNlbnNlIDogQ29weXJpZ2h0IChDKSAyMDExIEFzaGltYSBBcnRzLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbi8vICAgICAgICAgICAgICAgRGlzdHJpYnV0ZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlLiBTZWUgTElDRU5TRSBmaWxlLlxcbi8vICAgICAgICAgICAgICAgaHR0cHM6Ly9naXRodWIuY29tL2FzaGltYS93ZWJnbC1ub2lzZVxcbi8vXFxuXFxudmVjMyBtb2QyODlfMV8wKHZlYzMgeCkge1xcbiAgcmV0dXJuIHggLSBmbG9vcih4ICogKDEuMCAvIDI4OS4wKSkgKiAyODkuMDtcXG59XFxuXFxudmVjNCBtb2QyODlfMV8wKHZlYzQgeCkge1xcbiAgcmV0dXJuIHggLSBmbG9vcih4ICogKDEuMCAvIDI4OS4wKSkgKiAyODkuMDtcXG59XFxuXFxudmVjNCBwZXJtdXRlXzFfMSh2ZWM0IHgpIHtcXG4gICAgIHJldHVybiBtb2QyODlfMV8wKCgoeCozNC4wKSsxLjApKngpO1xcbn1cXG5cXG52ZWM0IHRheWxvckludlNxcnRfMV8yKHZlYzQgcilcXG57XFxuICByZXR1cm4gMS43OTI4NDI5MTQwMDE1OSAtIDAuODUzNzM0NzIwOTUzMTQgKiByO1xcbn1cXG5cXG5mbG9hdCBzbm9pc2VfMV8zKHZlYzMgdilcXG4gIHtcXG4gIGNvbnN0IHZlYzIgIEMgPSB2ZWMyKDEuMC82LjAsIDEuMC8zLjApIDtcXG4gIGNvbnN0IHZlYzQgIERfMV80ID0gdmVjNCgwLjAsIDAuNSwgMS4wLCAyLjApO1xcblxcbi8vIEZpcnN0IGNvcm5lclxcbiAgdmVjMyBpICA9IGZsb29yKHYgKyBkb3QodiwgQy55eXkpICk7XFxuICB2ZWMzIHgwID0gICB2IC0gaSArIGRvdChpLCBDLnh4eCkgO1xcblxcbi8vIE90aGVyIGNvcm5lcnNcXG4gIHZlYzMgZ18xXzUgPSBzdGVwKHgwLnl6eCwgeDAueHl6KTtcXG4gIHZlYzMgbCA9IDEuMCAtIGdfMV81O1xcbiAgdmVjMyBpMSA9IG1pbiggZ18xXzUueHl6LCBsLnp4eSApO1xcbiAgdmVjMyBpMiA9IG1heCggZ18xXzUueHl6LCBsLnp4eSApO1xcblxcbiAgLy8gICB4MCA9IHgwIC0gMC4wICsgMC4wICogQy54eHg7XFxuICAvLyAgIHgxID0geDAgLSBpMSAgKyAxLjAgKiBDLnh4eDtcXG4gIC8vICAgeDIgPSB4MCAtIGkyICArIDIuMCAqIEMueHh4O1xcbiAgLy8gICB4MyA9IHgwIC0gMS4wICsgMy4wICogQy54eHg7XFxuICB2ZWMzIHgxID0geDAgLSBpMSArIEMueHh4O1xcbiAgdmVjMyB4MiA9IHgwIC0gaTIgKyBDLnl5eTsgLy8gMi4wKkMueCA9IDEvMyA9IEMueVxcbiAgdmVjMyB4MyA9IHgwIC0gRF8xXzQueXl5OyAgICAgIC8vIC0xLjArMy4wKkMueCA9IC0wLjUgPSAtRC55XFxuXFxuLy8gUGVybXV0YXRpb25zXFxuICBpID0gbW9kMjg5XzFfMChpKTtcXG4gIHZlYzQgcCA9IHBlcm11dGVfMV8xKCBwZXJtdXRlXzFfMSggcGVybXV0ZV8xXzEoXFxuICAgICAgICAgICAgIGkueiArIHZlYzQoMC4wLCBpMS56LCBpMi56LCAxLjAgKSlcXG4gICAgICAgICAgICsgaS55ICsgdmVjNCgwLjAsIGkxLnksIGkyLnksIDEuMCApKVxcbiAgICAgICAgICAgKyBpLnggKyB2ZWM0KDAuMCwgaTEueCwgaTIueCwgMS4wICkpO1xcblxcbi8vIEdyYWRpZW50czogN3g3IHBvaW50cyBvdmVyIGEgc3F1YXJlLCBtYXBwZWQgb250byBhbiBvY3RhaGVkcm9uLlxcbi8vIFRoZSByaW5nIHNpemUgMTcqMTcgPSAyODkgaXMgY2xvc2UgdG8gYSBtdWx0aXBsZSBvZiA0OSAoNDkqNiA9IDI5NClcXG4gIGZsb2F0IG5fID0gMC4xNDI4NTcxNDI4NTc7IC8vIDEuMC83LjBcXG4gIHZlYzMgIG5zID0gbl8gKiBEXzFfNC53eXogLSBEXzFfNC54eng7XFxuXFxuICB2ZWM0IGogPSBwIC0gNDkuMCAqIGZsb29yKHAgKiBucy56ICogbnMueik7ICAvLyAgbW9kKHAsNyo3KVxcblxcbiAgdmVjNCB4XyA9IGZsb29yKGogKiBucy56KTtcXG4gIHZlYzQgeV8gPSBmbG9vcihqIC0gNy4wICogeF8gKTsgICAgLy8gbW9kKGosTilcXG5cXG4gIHZlYzQgeCA9IHhfICpucy54ICsgbnMueXl5eTtcXG4gIHZlYzQgeSA9IHlfICpucy54ICsgbnMueXl5eTtcXG4gIHZlYzQgaCA9IDEuMCAtIGFicyh4KSAtIGFicyh5KTtcXG5cXG4gIHZlYzQgYjAgPSB2ZWM0KCB4Lnh5LCB5Lnh5ICk7XFxuICB2ZWM0IGIxID0gdmVjNCggeC56dywgeS56dyApO1xcblxcbiAgLy92ZWM0IHMwID0gdmVjNChsZXNzVGhhbihiMCwwLjApKSoyLjAgLSAxLjA7XFxuICAvL3ZlYzQgczEgPSB2ZWM0KGxlc3NUaGFuKGIxLDAuMCkpKjIuMCAtIDEuMDtcXG4gIHZlYzQgczAgPSBmbG9vcihiMCkqMi4wICsgMS4wO1xcbiAgdmVjNCBzMSA9IGZsb29yKGIxKSoyLjAgKyAxLjA7XFxuICB2ZWM0IHNoID0gLXN0ZXAoaCwgdmVjNCgwLjApKTtcXG5cXG4gIHZlYzQgYTAgPSBiMC54enl3ICsgczAueHp5dypzaC54eHl5IDtcXG4gIHZlYzQgYTFfMV82ID0gYjEueHp5dyArIHMxLnh6eXcqc2guenp3dyA7XFxuXFxuICB2ZWMzIHAwXzFfNyA9IHZlYzMoYTAueHksaC54KTtcXG4gIHZlYzMgcDEgPSB2ZWMzKGEwLnp3LGgueSk7XFxuICB2ZWMzIHAyID0gdmVjMyhhMV8xXzYueHksaC56KTtcXG4gIHZlYzMgcDMgPSB2ZWMzKGExXzFfNi56dyxoLncpO1xcblxcbi8vTm9ybWFsaXNlIGdyYWRpZW50c1xcbiAgdmVjNCBub3JtID0gdGF5bG9ySW52U3FydF8xXzIodmVjNChkb3QocDBfMV83LHAwXzFfNyksIGRvdChwMSxwMSksIGRvdChwMiwgcDIpLCBkb3QocDMscDMpKSk7XFxuICBwMF8xXzcgKj0gbm9ybS54O1xcbiAgcDEgKj0gbm9ybS55O1xcbiAgcDIgKj0gbm9ybS56O1xcbiAgcDMgKj0gbm9ybS53O1xcblxcbi8vIE1peCBmaW5hbCBub2lzZSB2YWx1ZVxcbiAgdmVjNCBtID0gbWF4KDAuNiAtIHZlYzQoZG90KHgwLHgwKSwgZG90KHgxLHgxKSwgZG90KHgyLHgyKSwgZG90KHgzLHgzKSksIDAuMCk7XFxuICBtID0gbSAqIG07XFxuICByZXR1cm4gNDIuMCAqIGRvdCggbSptLCB2ZWM0KCBkb3QocDBfMV83LHgwKSwgZG90KHAxLHgxKSxcXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvdChwMix4MiksIGRvdChwMyx4MykgKSApO1xcbiAgfVxcblxcblxcblxcblxcbnZvaWQgbWFpbigpIHtcXG4gIGZsb2F0IHIgPSAlUl9GTiU7XFxuICBmbG9hdCBnID0gJUdfRk4lO1xcbiAgZmxvYXQgYiA9ICVCX0ZOJTtcXG4gIGZsb2F0IGEgPSAlQV9GTiU7XFxuICBnbF9GcmFnQ29sb3IgPSB2ZWM0KHIsIGcsIGIsIGEpO1xcbn1cXG5cIlxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vc3JjL2ZyYWcuZ2xzbFxuLy8gbW9kdWxlIGlkID0gOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBlcVBhcnNlciAoZXEpIHtcclxuICB2YXIgbm9pc2VSZWdleCA9IC8oW15pXXxeKW4vZ1xyXG4gIHZhciBhcmdzUmVnZXggPSAvKHh8eSkvZ1xyXG4gIHZhciBmbG9hdFJlZ2V4ID0gLyhbXmNdfF4pKFstXT9cXGQrKFxcLlxcZCspPykvZ1xyXG4gIHZhciBtYXRjaGVzID0gW11cclxuICB2YXIgbWF0Y2hcclxuXHJcbiAgd2hpbGUgKChtYXRjaCA9IG5vaXNlUmVnZXguZXhlYyhlcSkpICE9PSBudWxsKSB7XHJcbiAgICBtYXRjaGVzLnB1c2gobWF0Y2guaW5kZXgpXHJcbiAgfVxyXG4gIG1hdGNoZXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xyXG4gICAgdmFyIHAgPSAtMVxyXG4gICAgLy8gaW5kZXggaXMgcG9zaXRpb24gcHJpb3IgdG8gbiwgc28gd2UgbmVlZCB0byBza2lwIDMgdG8gZ2V0IHRvIGNvbnRlbnRcclxuICAgIGZvciAodmFyIGkgPSBlbGVtICsgMzsgaSA8IGVxLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChlcVtpXSA9PT0gJyknKSB7XHJcbiAgICAgICAgcCsrXHJcbiAgICAgICAgaWYgKHAgPT09IDApIHtcclxuICAgICAgICAgIGVxID0gZXEuc2xpY2UoMCwgaSkgKyAnKScgKyBlcS5zbGljZShpKVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlbHNlIGlmIChlcVtpXSA9PT0gJygnKSB7XHJcbiAgICAgICAgcC0tXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9KVxyXG4gIHJldHVybiBlcS5yZXBsYWNlKG5vaXNlUmVnZXgsICckMSVOT0lTRSUodmVjMycpXHJcbiAgICAgICAgICAgLnJlcGxhY2UoYXJnc1JlZ2V4LCAnZ2xfRnJhZ0Nvb3JkLiQxJylcclxuICAgICAgICAgICAucmVwbGFjZShmbG9hdFJlZ2V4LCBmdW5jdGlvbiAobWF0Y2gsIHByZSwgbnVtKSB7XHJcbiAgICAgICAgICAgICBudW0gPSBOdW1iZXIobnVtKVxyXG4gICAgICAgICAgICAgcmV0dXJuIChudW0gJSAxID09PSAwKSA/IGAke3ByZX0ke251bX0uMGAgOiBgJHtwcmV9JHtudW19YFxyXG4gICAgICAgICAgIH0pXHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2VxLXBhcnNlci5qcyIsInZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vZGVmYXVsdHMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNsZWFyXG5cbmZ1bmN0aW9uIGNsZWFyKG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge31cblxuICB2YXIgY29sb3IgPSBkZWZhdWx0cy5jb2xvcihvcHRzLmNvbG9yKVxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkoY2xlYXIsICdjb2xvcicsIHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29sb3IgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gY29sb3IgPSBkZWZhdWx0cy5jb2xvcih2YWx1ZSlcbiAgICB9XG4gIH0pXG5cbiAgdmFyIGRlcHRoID0gZGVmYXVsdHMuZGVwdGgob3B0cy5kZXB0aClcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNsZWFyLCAnZGVwdGgnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIGRlcHRoIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgcmV0dXJuIGRlcHRoID0gZGVmYXVsdHMuZGVwdGgodmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHZhciBzdGVuY2lsID0gZGVmYXVsdHMuc3RlbmNpbChvcHRzLnN0ZW5jaWwpXG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjbGVhciwgJ3N0ZW5jaWwnLCB7XG4gICAgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHN0ZW5jaWwgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gc3RlbmNpbCA9IGRlZmF1bHRzLnN0ZW5jaWwodmFsdWUpXG4gICAgfVxuICB9KVxuXG4gIHJldHVybiBjbGVhclxuXG4gIGZ1bmN0aW9uIGNsZWFyKGdsKSB7XG4gICAgdmFyIGZsYWdzID0gMFxuXG4gICAgaWYgKGNvbG9yICE9PSBmYWxzZSkge1xuICAgICAgZ2wuY2xlYXJDb2xvcihjb2xvclswXSwgY29sb3JbMV0sIGNvbG9yWzJdLCBjb2xvclszXSlcbiAgICAgIGZsYWdzIHw9IGdsLkNPTE9SX0JVRkZFUl9CSVRcbiAgICB9XG4gICAgaWYgKGRlcHRoICE9PSBmYWxzZSkge1xuICAgICAgZ2wuY2xlYXJEZXB0aChkZXB0aClcbiAgICAgIGZsYWdzIHw9IGdsLkRFUFRIX0JVRkZFUl9CSVRcbiAgICB9XG4gICAgaWYgKHN0ZW5jaWwgIT09IGZhbHNlKSB7XG4gICAgICBnbC5jbGVhclN0ZW5jaWwoc3RlbmNpbClcbiAgICAgIGZsYWdzIHw9IGdsLlNURU5DSUxfQlVGRkVSX0JJVFxuICAgIH1cblxuICAgIGdsLmNsZWFyKGZsYWdzKVxuXG4gICAgcmV0dXJuIGdsXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLWNsZWFyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxMVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLmNvbG9yID0gZnVuY3Rpb24oY29sb3IpIHtcbiAgcmV0dXJuIGFycmF5KGNvbG9yLCBbMCwgMCwgMCwgMV0pXG59XG5cbmV4cG9ydHMuZGVwdGggPSBmdW5jdGlvbihkZXB0aCkge1xuICByZXR1cm4gbnVtYmVyKGRlcHRoLCAxKVxufVxuXG5leHBvcnRzLnN0ZW5jaWwgPSBmdW5jdGlvbihzdGVuY2lsKSB7XG4gIHJldHVybiBudW1iZXIoc3RlbmNpbCwgZmFsc2UpXG59XG5cbmZ1bmN0aW9uIG51bWJlcihuLCBkZWYpIHtcbiAgaWYgKG4gPT09IGZhbHNlKSByZXR1cm4gZmFsc2VcbiAgaWYgKHR5cGVvZiBuID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGRlZlxuICByZXR1cm4gbiArIDBcbn1cblxuZnVuY3Rpb24gYXJyYXkoYSwgZGVmKSB7XG4gIGlmIChhID09PSBmYWxzZSkgcmV0dXJuIGZhbHNlXG4gIGlmIChBcnJheS5pc0FycmF5KGEpKSByZXR1cm4gYSB8fCBkZWZcbiAgcmV0dXJuIGRlZlxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY2xlYXIvZGVmYXVsdHMuanNcbi8vIG1vZHVsZSBpZCA9IDEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByYWYgPSByZXF1aXJlKCdyYWYtY29tcG9uZW50JylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVDb250ZXh0XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbnRleHQoY2FudmFzLCBvcHRzLCByZW5kZXIpIHtcbiAgaWYgKHR5cGVvZiBvcHRzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmVuZGVyID0gb3B0c1xuICAgIG9wdHMgPSB7fVxuICB9IGVsc2Uge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9XG4gIH1cblxuICB2YXIgZ2wgPSAoXG4gICAgY2FudmFzLmdldENvbnRleHQoJ3dlYmdsJywgb3B0cykgfHxcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnd2ViZ2wtZXhwZXJpbWVudGFsJywgb3B0cykgfHxcbiAgICBjYW52YXMuZ2V0Q29udGV4dCgnZXhwZXJpbWVudGFsLXdlYmdsJywgb3B0cylcbiAgKVxuXG4gIGlmICghZ2wpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuYWJsZSB0byBpbml0aWFsaXplIFdlYkdMJylcbiAgfVxuXG4gIGlmIChyZW5kZXIpIHJhZih0aWNrKVxuXG4gIHJldHVybiBnbFxuXG4gIGZ1bmN0aW9uIHRpY2soKSB7XG4gICAgcmVuZGVyKGdsKVxuICAgIHJhZih0aWNrKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1jb250ZXh0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEV4cG9zZSBgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKClgLlxuICovXG5cbmV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tc1JlcXVlc3RBbmltYXRpb25GcmFtZVxuICB8fCBmYWxsYmFjaztcblxuLyoqXG4gKiBGYWxsYmFjayBpbXBsZW1lbnRhdGlvbi5cbiAqL1xuXG52YXIgcHJldiA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuZnVuY3Rpb24gZmFsbGJhY2soZm4pIHtcbiAgdmFyIGN1cnIgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgdmFyIG1zID0gTWF0aC5tYXgoMCwgMTYgLSAoY3VyciAtIHByZXYpKTtcbiAgdmFyIHJlcSA9IHNldFRpbWVvdXQoZm4sIG1zKTtcbiAgcHJldiA9IGN1cnI7XG4gIHJldHVybiByZXE7XG59XG5cbi8qKlxuICogQ2FuY2VsLlxuICovXG5cbnZhciBjYW5jZWwgPSB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWVcbiAgfHwgd2luZG93LndlYmtpdENhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tb3pDYW5jZWxBbmltYXRpb25GcmFtZVxuICB8fCB3aW5kb3cub0NhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5tc0NhbmNlbEFuaW1hdGlvbkZyYW1lXG4gIHx8IHdpbmRvdy5jbGVhclRpbWVvdXQ7XG5cbmV4cG9ydHMuY2FuY2VsID0gZnVuY3Rpb24oaWQpe1xuICBjYW5jZWwuY2FsbCh3aW5kb3csIGlkKTtcbn07XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9yYWYtY29tcG9uZW50L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAxNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxudmFyIGNyZWF0ZVVuaWZvcm1XcmFwcGVyICAgPSByZXF1aXJlKCcuL2xpYi9jcmVhdGUtdW5pZm9ybXMnKVxudmFyIGNyZWF0ZUF0dHJpYnV0ZVdyYXBwZXIgPSByZXF1aXJlKCcuL2xpYi9jcmVhdGUtYXR0cmlidXRlcycpXG52YXIgbWFrZVJlZmxlY3QgICAgICAgICAgICA9IHJlcXVpcmUoJy4vbGliL3JlZmxlY3QnKVxudmFyIHNoYWRlckNhY2hlICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXItY2FjaGUnKVxudmFyIHJ1bnRpbWUgICAgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9ydW50aW1lLXJlZmxlY3QnKVxudmFyIEdMRXJyb3IgICAgICAgICAgICAgICAgPSByZXF1aXJlKFwiLi9saWIvR0xFcnJvclwiKVxuXG4vL1NoYWRlciBvYmplY3RcbmZ1bmN0aW9uIFNoYWRlcihnbCkge1xuICB0aGlzLmdsICAgICAgICAgPSBnbFxuICB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudCA9IDAgIC8vIGZpeG1lIHdoZXJlIGVsc2Ugc2hvdWxkIHdlIHN0b3JlIGluZm8sIHNhZmUgYnV0IG5vdCBuaWNlIG9uIHRoZSBnbCBvYmplY3RcblxuICAvL0RlZmF1bHQgaW5pdGlhbGl6ZSB0aGVzZSB0byBudWxsXG4gIHRoaXMuX3ZyZWYgICAgICA9XG4gIHRoaXMuX2ZyZWYgICAgICA9XG4gIHRoaXMuX3JlbGluayAgICA9XG4gIHRoaXMudmVydFNoYWRlciA9XG4gIHRoaXMuZnJhZ1NoYWRlciA9XG4gIHRoaXMucHJvZ3JhbSAgICA9XG4gIHRoaXMuYXR0cmlidXRlcyA9XG4gIHRoaXMudW5pZm9ybXMgICA9XG4gIHRoaXMudHlwZXMgICAgICA9IG51bGxcbn1cblxudmFyIHByb3RvID0gU2hhZGVyLnByb3RvdHlwZVxuXG5wcm90by5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIGlmKCF0aGlzLnByb2dyYW0pIHtcbiAgICB0aGlzLl9yZWxpbmsoKVxuICB9XG5cbiAgLy8gZW5zdXJpbmcgdGhhdCB3ZSBoYXZlIHRoZSByaWdodCBudW1iZXIgb2YgZW5hYmxlZCB2ZXJ0ZXggYXR0cmlidXRlc1xuICB2YXIgaVxuICB2YXIgbmV3QXR0cmliQ291bnQgPSB0aGlzLmdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGhpcy5wcm9ncmFtLCB0aGlzLmdsLkFDVElWRV9BVFRSSUJVVEVTKSAvLyBtb3JlIHJvYnVzdCBhcHByb2FjaFxuICAvL3ZhciBuZXdBdHRyaWJDb3VudCA9IE9iamVjdC5rZXlzKHRoaXMuYXR0cmlidXRlcykubGVuZ3RoIC8vIGF2b2lkcyB0aGUgcHJvYmFibHkgaW1tYXRlcmlhbCBpbnRyb3NwZWN0aW9uIHNsb3dkb3duXG4gIHZhciBvbGRBdHRyaWJDb3VudCA9IHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50XG4gIGlmKG5ld0F0dHJpYkNvdW50ID4gb2xkQXR0cmliQ291bnQpIHtcbiAgICBmb3IoaSA9IG9sZEF0dHJpYkNvdW50OyBpIDwgbmV3QXR0cmliQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5nbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICAgIH1cbiAgfSBlbHNlIGlmKG9sZEF0dHJpYkNvdW50ID4gbmV3QXR0cmliQ291bnQpIHtcbiAgICBmb3IoaSA9IG5ld0F0dHJpYkNvdW50OyBpIDwgb2xkQXR0cmliQ291bnQ7IGkrKykge1xuICAgICAgdGhpcy5nbC5kaXNhYmxlVmVydGV4QXR0cmliQXJyYXkoaSlcbiAgICB9XG4gIH1cblxuICB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudCA9IG5ld0F0dHJpYkNvdW50XG5cbiAgdGhpcy5nbC51c2VQcm9ncmFtKHRoaXMucHJvZ3JhbSlcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuXG4gIC8vIGRpc2FibGluZyB2ZXJ0ZXggYXR0cmlidXRlcyBzbyBuZXcgc2hhZGVyIHN0YXJ0cyB3aXRoIHplcm9cbiAgLy8gYW5kIGl0J3MgYWxzbyB1c2VmdWwgaWYgYWxsIHNoYWRlcnMgYXJlIGRpc3Bvc2VkIGJ1dCB0aGVcbiAgLy8gZ2wgY29udGV4dCBpcyByZXVzZWQgZm9yIHN1YnNlcXVlbnQgcmVwbG90dGluZ1xuICB2YXIgb2xkQXR0cmliQ291bnQgPSB0aGlzLmdsLmxhc3RBdHRyaWJDb3VudFxuICBmb3IgKHZhciBpID0gMDsgaSA8IG9sZEF0dHJpYkNvdW50OyBpKyspIHtcbiAgICB0aGlzLmdsLmRpc2FibGVWZXJ0ZXhBdHRyaWJBcnJheShpKVxuICB9XG4gIHRoaXMuZ2wubGFzdEF0dHJpYkNvdW50ID0gMFxuXG4gIGlmKHRoaXMuX2ZyZWYpIHtcbiAgICB0aGlzLl9mcmVmLmRpc3Bvc2UoKVxuICB9XG4gIGlmKHRoaXMuX3ZyZWYpIHtcbiAgICB0aGlzLl92cmVmLmRpc3Bvc2UoKVxuICB9XG4gIHRoaXMuYXR0cmlidXRlcyA9XG4gIHRoaXMudHlwZXMgICAgICA9XG4gIHRoaXMudmVydFNoYWRlciA9XG4gIHRoaXMuZnJhZ1NoYWRlciA9XG4gIHRoaXMucHJvZ3JhbSAgICA9XG4gIHRoaXMuX3JlbGluayAgICA9XG4gIHRoaXMuX2ZyZWYgICAgICA9XG4gIHRoaXMuX3ZyZWYgICAgICA9IG51bGxcbn1cblxuZnVuY3Rpb24gY29tcGFyZUF0dHJpYnV0ZXMoYSwgYikge1xuICBpZihhLm5hbWUgPCBiLm5hbWUpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICByZXR1cm4gMVxufVxuXG4vL1VwZGF0ZSBleHBvcnQgaG9vayBmb3IgZ2xzbGlmeS1saXZlXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihcbiAgICB2ZXJ0U291cmNlXG4gICwgZnJhZ1NvdXJjZVxuICAsIHVuaWZvcm1zXG4gICwgYXR0cmlidXRlcykge1xuXG4gIC8vSWYgb25seSBvbmUgb2JqZWN0IHBhc3NlZCwgYXNzdW1lIGdsc2xpZnkgc3R5bGUgb3V0cHV0XG4gIGlmKCFmcmFnU291cmNlIHx8IGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICB2YXIgb2JqID0gdmVydFNvdXJjZVxuICAgIHZlcnRTb3VyY2UgPSBvYmoudmVydGV4XG4gICAgZnJhZ1NvdXJjZSA9IG9iai5mcmFnbWVudFxuICAgIHVuaWZvcm1zICAgPSBvYmoudW5pZm9ybXNcbiAgICBhdHRyaWJ1dGVzID0gb2JqLmF0dHJpYnV0ZXNcbiAgfVxuXG4gIHZhciB3cmFwcGVyID0gdGhpc1xuICB2YXIgZ2wgICAgICA9IHdyYXBwZXIuZ2xcblxuICAvL0NvbXBpbGUgdmVydGV4IGFuZCBmcmFnbWVudCBzaGFkZXJzXG4gIHZhciBwdnJlZiA9IHdyYXBwZXIuX3ZyZWZcbiAgd3JhcHBlci5fdnJlZiA9IHNoYWRlckNhY2hlLnNoYWRlcihnbCwgZ2wuVkVSVEVYX1NIQURFUiwgdmVydFNvdXJjZSlcbiAgaWYocHZyZWYpIHtcbiAgICBwdnJlZi5kaXNwb3NlKClcbiAgfVxuICB3cmFwcGVyLnZlcnRTaGFkZXIgPSB3cmFwcGVyLl92cmVmLnNoYWRlclxuICB2YXIgcGZyZWYgPSB0aGlzLl9mcmVmXG4gIHdyYXBwZXIuX2ZyZWYgPSBzaGFkZXJDYWNoZS5zaGFkZXIoZ2wsIGdsLkZSQUdNRU5UX1NIQURFUiwgZnJhZ1NvdXJjZSlcbiAgaWYocGZyZWYpIHtcbiAgICBwZnJlZi5kaXNwb3NlKClcbiAgfVxuICB3cmFwcGVyLmZyYWdTaGFkZXIgPSB3cmFwcGVyLl9mcmVmLnNoYWRlclxuXG4gIC8vSWYgdW5pZm9ybXMvYXR0cmlidXRlcyBpcyBub3Qgc3BlY2lmaWVkLCB1c2UgUlQgcmVmbGVjdGlvblxuICBpZighdW5pZm9ybXMgfHwgIWF0dHJpYnV0ZXMpIHtcblxuICAgIC8vQ3JlYXRlIGluaXRpYWwgdGVzdCBwcm9ncmFtXG4gICAgdmFyIHRlc3RQcm9ncmFtID0gZ2wuY3JlYXRlUHJvZ3JhbSgpXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRlc3RQcm9ncmFtLCB3cmFwcGVyLmZyYWdTaGFkZXIpXG4gICAgZ2wuYXR0YWNoU2hhZGVyKHRlc3RQcm9ncmFtLCB3cmFwcGVyLnZlcnRTaGFkZXIpXG4gICAgZ2wubGlua1Byb2dyYW0odGVzdFByb2dyYW0pXG4gICAgaWYoIWdsLmdldFByb2dyYW1QYXJhbWV0ZXIodGVzdFByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgICAgdmFyIGVyckxvZyA9IGdsLmdldFByb2dyYW1JbmZvTG9nKHRlc3RQcm9ncmFtKVxuICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCAnRXJyb3IgbGlua2luZyBwcm9ncmFtOicgKyBlcnJMb2cpXG4gICAgfVxuXG4gICAgLy9Mb2FkIGRhdGEgZnJvbSBydW50aW1lXG4gICAgdW5pZm9ybXMgICA9IHVuaWZvcm1zICAgfHwgcnVudGltZS51bmlmb3JtcyhnbCwgdGVzdFByb2dyYW0pXG4gICAgYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXMgfHwgcnVudGltZS5hdHRyaWJ1dGVzKGdsLCB0ZXN0UHJvZ3JhbSlcblxuICAgIC8vUmVsZWFzZSB0ZXN0IHByb2dyYW1cbiAgICBnbC5kZWxldGVQcm9ncmFtKHRlc3RQcm9ncmFtKVxuICB9XG5cbiAgLy9Tb3J0IGF0dHJpYnV0ZXMgbGV4aWNvZ3JhcGhpY2FsbHlcbiAgLy8gb3ZlcnJpZGVzIHVuZGVmaW5lZCBXZWJHTCBiZWhhdmlvciBmb3IgYXR0cmlidXRlIGxvY2F0aW9uc1xuICBhdHRyaWJ1dGVzID0gYXR0cmlidXRlcy5zbGljZSgpXG4gIGF0dHJpYnV0ZXMuc29ydChjb21wYXJlQXR0cmlidXRlcylcblxuICAvL0NvbnZlcnQgYXR0cmlidXRlIHR5cGVzLCByZWFkIG91dCBsb2NhdGlvbnNcbiAgdmFyIGF0dHJpYnV0ZVVucGFja2VkICA9IFtdXG4gIHZhciBhdHRyaWJ1dGVOYW1lcyAgICAgPSBbXVxuICB2YXIgYXR0cmlidXRlTG9jYXRpb25zID0gW11cbiAgdmFyIGlcbiAgZm9yKGk9MDsgaTxhdHRyaWJ1dGVzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGF0dHIgPSBhdHRyaWJ1dGVzW2ldXG4gICAgaWYoYXR0ci50eXBlLmluZGV4T2YoJ21hdCcpID49IDApIHtcbiAgICAgIHZhciBzaXplID0gYXR0ci50eXBlLmNoYXJBdChhdHRyLnR5cGUubGVuZ3RoLTEpfDBcbiAgICAgIHZhciBsb2NWZWN0b3IgPSBuZXcgQXJyYXkoc2l6ZSlcbiAgICAgIGZvcih2YXIgaj0wOyBqPHNpemU7ICsraikge1xuICAgICAgICBsb2NWZWN0b3Jbal0gPSBhdHRyaWJ1dGVMb2NhdGlvbnMubGVuZ3RoXG4gICAgICAgIGF0dHJpYnV0ZU5hbWVzLnB1c2goYXR0ci5uYW1lICsgJ1snICsgaiArICddJylcbiAgICAgICAgaWYodHlwZW9mIGF0dHIubG9jYXRpb24gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goYXR0ci5sb2NhdGlvbiArIGopXG4gICAgICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KGF0dHIubG9jYXRpb24pICYmXG4gICAgICAgICAgICAgICAgICBhdHRyLmxvY2F0aW9uLmxlbmd0aCA9PT0gc2l6ZSAmJlxuICAgICAgICAgICAgICAgICAgdHlwZW9mIGF0dHIubG9jYXRpb25bal0gPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgYXR0cmlidXRlTG9jYXRpb25zLnB1c2goYXR0ci5sb2NhdGlvbltqXXwwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF0dHJpYnV0ZUxvY2F0aW9ucy5wdXNoKC0xKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhdHRyaWJ1dGVVbnBhY2tlZC5wdXNoKHtcbiAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICB0eXBlOiBhdHRyLnR5cGUsXG4gICAgICAgIGxvY2F0aW9uczogbG9jVmVjdG9yXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBhdHRyaWJ1dGVVbnBhY2tlZC5wdXNoKHtcbiAgICAgICAgbmFtZTogYXR0ci5uYW1lLFxuICAgICAgICB0eXBlOiBhdHRyLnR5cGUsXG4gICAgICAgIGxvY2F0aW9uczogWyBhdHRyaWJ1dGVMb2NhdGlvbnMubGVuZ3RoIF1cbiAgICAgIH0pXG4gICAgICBhdHRyaWJ1dGVOYW1lcy5wdXNoKGF0dHIubmFtZSlcbiAgICAgIGlmKHR5cGVvZiBhdHRyLmxvY2F0aW9uID09PSAnbnVtYmVyJykge1xuICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaChhdHRyLmxvY2F0aW9ufDApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhdHRyaWJ1dGVMb2NhdGlvbnMucHVzaCgtMSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0ZvciBhbGwgdW5zcGVjaWZpZWQgYXR0cmlidXRlcywgYXNzaWduIHRoZW0gbGV4aWNvZ3JhcGhpY2FsbHkgbWluIGF0dHJpYnV0ZVxuICB2YXIgY3VyTG9jYXRpb24gPSAwXG4gIGZvcihpPTA7IGk8YXR0cmlidXRlTG9jYXRpb25zLmxlbmd0aDsgKytpKSB7XG4gICAgaWYoYXR0cmlidXRlTG9jYXRpb25zW2ldIDwgMCkge1xuICAgICAgd2hpbGUoYXR0cmlidXRlTG9jYXRpb25zLmluZGV4T2YoY3VyTG9jYXRpb24pID49IDApIHtcbiAgICAgICAgY3VyTG9jYXRpb24gKz0gMVxuICAgICAgfVxuICAgICAgYXR0cmlidXRlTG9jYXRpb25zW2ldID0gY3VyTG9jYXRpb25cbiAgICB9XG4gIH1cblxuICAvL1JlYnVpbGQgcHJvZ3JhbSBhbmQgcmVjb21wdXRlIGFsbCB1bmlmb3JtIGxvY2F0aW9uc1xuICB2YXIgdW5pZm9ybUxvY2F0aW9ucyA9IG5ldyBBcnJheSh1bmlmb3Jtcy5sZW5ndGgpXG4gIGZ1bmN0aW9uIHJlbGluaygpIHtcbiAgICB3cmFwcGVyLnByb2dyYW0gPSBzaGFkZXJDYWNoZS5wcm9ncmFtKFxuICAgICAgICBnbFxuICAgICAgLCB3cmFwcGVyLl92cmVmXG4gICAgICAsIHdyYXBwZXIuX2ZyZWZcbiAgICAgICwgYXR0cmlidXRlTmFtZXNcbiAgICAgICwgYXR0cmlidXRlTG9jYXRpb25zKVxuXG4gICAgZm9yKHZhciBpPTA7IGk8dW5pZm9ybXMubGVuZ3RoOyArK2kpIHtcbiAgICAgIHVuaWZvcm1Mb2NhdGlvbnNbaV0gPSBnbC5nZXRVbmlmb3JtTG9jYXRpb24oXG4gICAgICAgICAgd3JhcHBlci5wcm9ncmFtXG4gICAgICAgICwgdW5pZm9ybXNbaV0ubmFtZSlcbiAgICB9XG4gIH1cblxuICAvL1BlcmZvcm0gaW5pdGlhbCBsaW5raW5nLCByZXVzZSBwcm9ncmFtIHVzZWQgZm9yIHJlZmxlY3Rpb25cbiAgcmVsaW5rKClcblxuICAvL1NhdmUgcmVsaW5raW5nIHByb2NlZHVyZSwgZGVmZXIgdW50aWwgcnVudGltZVxuICB3cmFwcGVyLl9yZWxpbmsgPSByZWxpbmtcblxuICAvL0dlbmVyYXRlIHR5cGUgaW5mb1xuICB3cmFwcGVyLnR5cGVzID0ge1xuICAgIHVuaWZvcm1zOiAgIG1ha2VSZWZsZWN0KHVuaWZvcm1zKSxcbiAgICBhdHRyaWJ1dGVzOiBtYWtlUmVmbGVjdChhdHRyaWJ1dGVzKVxuICB9XG5cbiAgLy9HZW5lcmF0ZSBhdHRyaWJ1dGUgd3JhcHBlcnNcbiAgd3JhcHBlci5hdHRyaWJ1dGVzID0gY3JlYXRlQXR0cmlidXRlV3JhcHBlcihcbiAgICAgIGdsXG4gICAgLCB3cmFwcGVyXG4gICAgLCBhdHRyaWJ1dGVVbnBhY2tlZFxuICAgICwgYXR0cmlidXRlTG9jYXRpb25zKVxuXG4gIC8vR2VuZXJhdGUgdW5pZm9ybSB3cmFwcGVyc1xuICBPYmplY3QuZGVmaW5lUHJvcGVydHkod3JhcHBlciwgJ3VuaWZvcm1zJywgY3JlYXRlVW5pZm9ybVdyYXBwZXIoXG4gICAgICBnbFxuICAgICwgd3JhcHBlclxuICAgICwgdW5pZm9ybXNcbiAgICAsIHVuaWZvcm1Mb2NhdGlvbnMpKVxufVxuXG4vL0NvbXBpbGVzIGFuZCBsaW5rcyBhIHNoYWRlciBwcm9ncmFtIHdpdGggdGhlIGdpdmVuIGF0dHJpYnV0ZSBhbmQgdmVydGV4IGxpc3RcbmZ1bmN0aW9uIGNyZWF0ZVNoYWRlcihcbiAgICBnbFxuICAsIHZlcnRTb3VyY2VcbiAgLCBmcmFnU291cmNlXG4gICwgdW5pZm9ybXNcbiAgLCBhdHRyaWJ1dGVzKSB7XG5cbiAgdmFyIHNoYWRlciA9IG5ldyBTaGFkZXIoZ2wpXG5cbiAgc2hhZGVyLnVwZGF0ZShcbiAgICAgIHZlcnRTb3VyY2VcbiAgICAsIGZyYWdTb3VyY2VcbiAgICAsIHVuaWZvcm1zXG4gICAgLCBhdHRyaWJ1dGVzKVxuXG4gIHJldHVybiBzaGFkZXJcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTaGFkZXJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMTVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjb2FsbGVzY2VVbmlmb3JtcyA9IHJlcXVpcmUoJy4vcmVmbGVjdCcpXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVVbmlmb3JtV3JhcHBlclxuXG4vL0JpbmRzIGEgZnVuY3Rpb24gYW5kIHJldHVybnMgYSB2YWx1ZVxuZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICB2YXIgYyA9IG5ldyBGdW5jdGlvbigneScsICdyZXR1cm4gZnVuY3Rpb24oKXtyZXR1cm4geX0nKVxuICByZXR1cm4gYyh4KVxufVxuXG5mdW5jdGlvbiBtYWtlVmVjdG9yKGxlbmd0aCwgZmlsbCkge1xuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGxlbmd0aClcbiAgZm9yKHZhciBpPTA7IGk8bGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBmaWxsXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG4vL0NyZWF0ZSBzaGltcyBmb3IgdW5pZm9ybXNcbmZ1bmN0aW9uIGNyZWF0ZVVuaWZvcm1XcmFwcGVyKGdsLCB3cmFwcGVyLCB1bmlmb3JtcywgbG9jYXRpb25zKSB7XG5cbiAgZnVuY3Rpb24gbWFrZUdldHRlcihpbmRleCkge1xuICAgIHZhciBwcm9jID0gbmV3IEZ1bmN0aW9uKFxuICAgICAgICAnZ2wnXG4gICAgICAsICd3cmFwcGVyJ1xuICAgICAgLCAnbG9jYXRpb25zJ1xuICAgICAgLCAncmV0dXJuIGZ1bmN0aW9uKCl7cmV0dXJuIGdsLmdldFVuaWZvcm0od3JhcHBlci5wcm9ncmFtLGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSl9JylcbiAgICByZXR1cm4gcHJvYyhnbCwgd3JhcHBlciwgbG9jYXRpb25zKVxuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVByb3BTZXR0ZXIocGF0aCwgaW5kZXgsIHR5cGUpIHtcbiAgICBzd2l0Y2godHlwZSkge1xuICAgICAgY2FzZSAnYm9vbCc6XG4gICAgICBjYXNlICdpbnQnOlxuICAgICAgY2FzZSAnc2FtcGxlcjJEJzpcbiAgICAgIGNhc2UgJ3NhbXBsZXJDdWJlJzpcbiAgICAgICAgcmV0dXJuICdnbC51bmlmb3JtMWkobG9jYXRpb25zWycgKyBpbmRleCArICddLG9iaicgKyBwYXRoICsgJyknXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIHJldHVybiAnZ2wudW5pZm9ybTFmKGxvY2F0aW9uc1snICsgaW5kZXggKyAnXSxvYmonICsgcGF0aCArICcpJ1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdmFyIHZpZHggPSB0eXBlLmluZGV4T2YoJ3ZlYycpXG4gICAgICAgIGlmKDAgPD0gdmlkeCAmJiB2aWR4IDw9IDEgJiYgdHlwZS5sZW5ndGggPT09IDQgKyB2aWR4KSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlJylcbiAgICAgICAgICB9XG4gICAgICAgICAgc3dpdGNoKHR5cGUuY2hhckF0KDApKSB7XG4gICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0nICsgZCArICdpdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm0nICsgZCArICdmdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5yZWNvZ25pemVkIGRhdGEgdHlwZSBmb3IgdmVjdG9yICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYodHlwZS5pbmRleE9mKCdtYXQnKSA9PT0gMCAmJiB0eXBlLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIHVuaWZvcm0gZGltZW5zaW9uIHR5cGUgZm9yIG1hdHJpeCAnICsgbmFtZSArICc6ICcgKyB0eXBlKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJ2dsLnVuaWZvcm1NYXRyaXgnICsgZCArICdmdihsb2NhdGlvbnNbJyArIGluZGV4ICsgJ10sZmFsc2Usb2JqJyArIHBhdGggKyAnKSdcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ1Vua25vd24gdW5pZm9ybSBkYXRhIHR5cGUgZm9yICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZW51bWVyYXRlSW5kaWNlcyhwcmVmaXgsIHR5cGUpIHtcbiAgICBpZih0eXBlb2YgdHlwZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBbIFtwcmVmaXgsIHR5cGVdIF1cbiAgICB9XG4gICAgdmFyIGluZGljZXMgPSBbXVxuICAgIGZvcih2YXIgaWQgaW4gdHlwZSkge1xuICAgICAgdmFyIHByb3AgPSB0eXBlW2lkXVxuICAgICAgdmFyIHRwcmVmaXggPSBwcmVmaXhcbiAgICAgIGlmKHBhcnNlSW50KGlkKSArICcnID09PSBpZCkge1xuICAgICAgICB0cHJlZml4ICs9ICdbJyArIGlkICsgJ10nXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cHJlZml4ICs9ICcuJyArIGlkXG4gICAgICB9XG4gICAgICBpZih0eXBlb2YgcHJvcCA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgaW5kaWNlcy5wdXNoLmFwcGx5KGluZGljZXMsIGVudW1lcmF0ZUluZGljZXModHByZWZpeCwgcHJvcCkpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRpY2VzLnB1c2goW3RwcmVmaXgsIHByb3BdKVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gaW5kaWNlc1xuICB9XG5cbiAgZnVuY3Rpb24gbWFrZVNldHRlcih0eXBlKSB7XG4gICAgdmFyIGNvZGUgPSBbICdyZXR1cm4gZnVuY3Rpb24gdXBkYXRlUHJvcGVydHkob2JqKXsnIF1cbiAgICB2YXIgaW5kaWNlcyA9IGVudW1lcmF0ZUluZGljZXMoJycsIHR5cGUpXG4gICAgZm9yKHZhciBpPTA7IGk8aW5kaWNlcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIGl0ZW0gPSBpbmRpY2VzW2ldXG4gICAgICB2YXIgcGF0aCA9IGl0ZW1bMF1cbiAgICAgIHZhciBpZHggID0gaXRlbVsxXVxuICAgICAgaWYobG9jYXRpb25zW2lkeF0pIHtcbiAgICAgICAgY29kZS5wdXNoKG1ha2VQcm9wU2V0dGVyKHBhdGgsIGlkeCwgdW5pZm9ybXNbaWR4XS50eXBlKSlcbiAgICAgIH1cbiAgICB9XG4gICAgY29kZS5wdXNoKCdyZXR1cm4gb2JqfScpXG4gICAgdmFyIHByb2MgPSBuZXcgRnVuY3Rpb24oJ2dsJywgJ2xvY2F0aW9ucycsIGNvZGUuam9pbignXFxuJykpXG4gICAgcmV0dXJuIHByb2MoZ2wsIGxvY2F0aW9ucylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRlZmF1bHRWYWx1ZSh0eXBlKSB7XG4gICAgc3dpdGNoKHR5cGUpIHtcbiAgICAgIGNhc2UgJ2Jvb2wnOlxuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICAgIGNhc2UgJ2ludCc6XG4gICAgICBjYXNlICdzYW1wbGVyMkQnOlxuICAgICAgY2FzZSAnc2FtcGxlckN1YmUnOlxuICAgICAgICByZXR1cm4gMFxuICAgICAgY2FzZSAnZmxvYXQnOlxuICAgICAgICByZXR1cm4gMC4wXG4gICAgICBkZWZhdWx0OlxuICAgICAgICB2YXIgdmlkeCA9IHR5cGUuaW5kZXhPZigndmVjJylcbiAgICAgICAgaWYoMCA8PSB2aWR4ICYmIHZpZHggPD0gMSAmJiB0eXBlLmxlbmd0aCA9PT0gNCArIHZpZHgpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCBkYXRhIHR5cGUnKVxuICAgICAgICAgIH1cbiAgICAgICAgICBpZih0eXBlLmNoYXJBdCgwKSA9PT0gJ2InKSB7XG4gICAgICAgICAgICByZXR1cm4gbWFrZVZlY3RvcihkLCBmYWxzZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1ha2VWZWN0b3IoZCwgMClcbiAgICAgICAgfSBlbHNlIGlmKHR5cGUuaW5kZXhPZignbWF0JykgPT09IDAgJiYgdHlwZS5sZW5ndGggPT09IDQpIHtcbiAgICAgICAgICB2YXIgZCA9IHR5cGUuY2hhckNvZGVBdCh0eXBlLmxlbmd0aC0xKSAtIDQ4XG4gICAgICAgICAgaWYoZCA8IDIgfHwgZCA+IDQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnSW52YWxpZCB1bmlmb3JtIGRpbWVuc2lvbiB0eXBlIGZvciBtYXRyaXggJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIG1ha2VWZWN0b3IoZCpkLCAwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBHTEVycm9yKCcnLCAnVW5rbm93biB1bmlmb3JtIGRhdGEgdHlwZSBmb3IgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzdG9yZVByb3BlcnR5KG9iaiwgcHJvcCwgdHlwZSkge1xuICAgIGlmKHR5cGVvZiB0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdmFyIGNoaWxkID0gcHJvY2Vzc09iamVjdCh0eXBlKVxuICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwge1xuICAgICAgICBnZXQ6IGlkZW50aXR5KGNoaWxkKSxcbiAgICAgICAgc2V0OiBtYWtlU2V0dGVyKHR5cGUpLFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICBpZihsb2NhdGlvbnNbdHlwZV0pIHtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgcHJvcCwge1xuICAgICAgICAgIGdldDogbWFrZUdldHRlcih0eXBlKSxcbiAgICAgICAgICBzZXQ6IG1ha2VTZXR0ZXIodHlwZSksXG4gICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICBjb25maWd1cmFibGU6IGZhbHNlXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvYmpbcHJvcF0gPSBkZWZhdWx0VmFsdWUodW5pZm9ybXNbdHlwZV0udHlwZSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBwcm9jZXNzT2JqZWN0KG9iaikge1xuICAgIHZhciByZXN1bHRcbiAgICBpZihBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgIHJlc3VsdCA9IG5ldyBBcnJheShvYmoubGVuZ3RoKVxuICAgICAgZm9yKHZhciBpPTA7IGk8b2JqLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHN0b3JlUHJvcGVydHkocmVzdWx0LCBpLCBvYmpbaV0pXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IHt9XG4gICAgICBmb3IodmFyIGlkIGluIG9iaikge1xuICAgICAgICBzdG9yZVByb3BlcnR5KHJlc3VsdCwgaWQsIG9ialtpZF0pXG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRcbiAgfVxuXG4gIC8vUmV0dXJuIGRhdGFcbiAgdmFyIGNvYWxsZXNjZWQgPSBjb2FsbGVzY2VVbmlmb3Jtcyh1bmlmb3JtcywgdHJ1ZSlcbiAgcmV0dXJuIHtcbiAgICBnZXQ6IGlkZW50aXR5KHByb2Nlc3NPYmplY3QoY29hbGxlc2NlZCkpLFxuICAgIHNldDogbWFrZVNldHRlcihjb2FsbGVzY2VkKSxcbiAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1zaGFkZXIvbGliL2NyZWF0ZS11bmlmb3Jtcy5qc1xuLy8gbW9kdWxlIGlkID0gMTZcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQXR0cmlidXRlV3JhcHBlclxuXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcblxuZnVuY3Rpb24gU2hhZGVyQXR0cmlidXRlKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGluZGV4XG4gICwgbG9jYXRpb25zXG4gICwgZGltZW5zaW9uXG4gICwgY29uc3RGdW5jKSB7XG4gIHRoaXMuX2dsICAgICAgICA9IGdsXG4gIHRoaXMuX3dyYXBwZXIgICA9IHdyYXBwZXJcbiAgdGhpcy5faW5kZXggICAgID0gaW5kZXhcbiAgdGhpcy5fbG9jYXRpb25zID0gbG9jYXRpb25zXG4gIHRoaXMuX2RpbWVuc2lvbiA9IGRpbWVuc2lvblxuICB0aGlzLl9jb25zdEZ1bmMgPSBjb25zdEZ1bmNcbn1cblxudmFyIHByb3RvID0gU2hhZGVyQXR0cmlidXRlLnByb3RvdHlwZVxuXG5wcm90by5wb2ludGVyID0gZnVuY3Rpb24gc2V0QXR0cmliUG9pbnRlcihcbiAgICB0eXBlXG4gICwgbm9ybWFsaXplZFxuICAsIHN0cmlkZVxuICAsIG9mZnNldCkge1xuXG4gIHZhciBzZWxmICAgICAgPSB0aGlzXG4gIHZhciBnbCAgICAgICAgPSBzZWxmLl9nbFxuICB2YXIgbG9jYXRpb24gID0gc2VsZi5fbG9jYXRpb25zW3NlbGYuX2luZGV4XVxuXG4gIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICBsb2NhdGlvblxuICAgICwgc2VsZi5fZGltZW5zaW9uXG4gICAgLCB0eXBlIHx8IGdsLkZMT0FUXG4gICAgLCAhIW5vcm1hbGl6ZWRcbiAgICAsIHN0cmlkZSB8fCAwXG4gICAgLCBvZmZzZXQgfHwgMClcbiAgZ2wuZW5hYmxlVmVydGV4QXR0cmliQXJyYXkobG9jYXRpb24pXG59XG5cbnByb3RvLnNldCA9IGZ1bmN0aW9uKHgwLCB4MSwgeDIsIHgzKSB7XG4gIHJldHVybiB0aGlzLl9jb25zdEZ1bmModGhpcy5fbG9jYXRpb25zW3RoaXMuX2luZGV4XSwgeDAsIHgxLCB4MiwgeDMpXG59XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShwcm90bywgJ2xvY2F0aW9uJywge1xuICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdXG4gIH1cbiAgLCBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICBpZih2ICE9PSB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdKSB7XG4gICAgICB0aGlzLl9sb2NhdGlvbnNbdGhpcy5faW5kZXhdID0gdnwwXG4gICAgICB0aGlzLl93cmFwcGVyLnByb2dyYW0gPSBudWxsXG4gICAgfVxuICAgIHJldHVybiB2fDBcbiAgfVxufSlcblxuLy9BZGRzIGEgdmVjdG9yIGF0dHJpYnV0ZSB0byBvYmpcbmZ1bmN0aW9uIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBpbmRleFxuICAsIGxvY2F0aW9uc1xuICAsIGRpbWVuc2lvblxuICAsIG9ialxuICAsIG5hbWUpIHtcblxuICAvL0NvbnN0cnVjdCBjb25zdGFudCBmdW5jdGlvblxuICB2YXIgY29uc3RGdW5jQXJncyA9IFsgJ2dsJywgJ3YnIF1cbiAgdmFyIHZhck5hbWVzID0gW11cbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb25zdEZ1bmNBcmdzLnB1c2goJ3gnK2kpXG4gICAgdmFyTmFtZXMucHVzaCgneCcraSlcbiAgfVxuICBjb25zdEZ1bmNBcmdzLnB1c2goXG4gICAgJ2lmKHgwLmxlbmd0aD09PXZvaWQgMCl7cmV0dXJuIGdsLnZlcnRleEF0dHJpYicgK1xuICAgIGRpbWVuc2lvbiArICdmKHYsJyArXG4gICAgdmFyTmFtZXMuam9pbigpICtcbiAgICAnKX1lbHNle3JldHVybiBnbC52ZXJ0ZXhBdHRyaWInICtcbiAgICBkaW1lbnNpb24gK1xuICAgICdmdih2LHgwKX0nKVxuICB2YXIgY29uc3RGdW5jID0gRnVuY3Rpb24uYXBwbHkobnVsbCwgY29uc3RGdW5jQXJncylcblxuICAvL0NyZWF0ZSBhdHRyaWJ1dGUgd3JhcHBlclxuICB2YXIgYXR0ciA9IG5ldyBTaGFkZXJBdHRyaWJ1dGUoXG4gICAgICBnbFxuICAgICwgd3JhcHBlclxuICAgICwgaW5kZXhcbiAgICAsIGxvY2F0aW9uc1xuICAgICwgZGltZW5zaW9uXG4gICAgLCBjb25zdEZ1bmMpXG5cbiAgLy9DcmVhdGUgYWNjZXNzb3JcbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIHNldDogZnVuY3Rpb24oeCkge1xuICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvY2F0aW9uc1tpbmRleF0pXG4gICAgICBjb25zdEZ1bmMoZ2wsIGxvY2F0aW9uc1tpbmRleF0sIHgpXG4gICAgICByZXR1cm4geFxuICAgIH1cbiAgICAsIGdldDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gYXR0clxuICAgIH1cbiAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgfSlcbn1cblxuZnVuY3Rpb24gYWRkTWF0cml4QXR0cmlidXRlKFxuICAgIGdsXG4gICwgd3JhcHBlclxuICAsIGluZGV4XG4gICwgbG9jYXRpb25zXG4gICwgZGltZW5zaW9uXG4gICwgb2JqXG4gICwgbmFtZSkge1xuXG4gIHZhciBwYXJ0cyA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciBhdHRycyA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgYWRkVmVjdG9yQXR0cmlidXRlKFxuICAgICAgICBnbFxuICAgICAgLCB3cmFwcGVyXG4gICAgICAsIGluZGV4W2ldXG4gICAgICAsIGxvY2F0aW9uc1xuICAgICAgLCBkaW1lbnNpb25cbiAgICAgICwgcGFydHNcbiAgICAgICwgaSlcbiAgICBhdHRyc1tpXSA9IHBhcnRzW2ldXG4gIH1cblxuICBPYmplY3QuZGVmaW5lUHJvcGVydHkocGFydHMsICdsb2NhdGlvbicsIHtcbiAgICBzZXQ6IGZ1bmN0aW9uKHYpIHtcbiAgICAgIGlmKEFycmF5LmlzQXJyYXkodikpIHtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgICBhdHRyc1tpXS5sb2NhdGlvbiA9IHZbaV1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgICBhdHRyc1tpXS5sb2NhdGlvbiA9IHYgKyBpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB2XG4gICAgfVxuICAgICwgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgcmVzdWx0W2ldID0gbG9jYXRpb25zW2luZGV4W2ldXVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgICAsIGVudW1lcmFibGU6IHRydWVcbiAgfSlcblxuICBwYXJ0cy5wb2ludGVyID0gZnVuY3Rpb24odHlwZSwgbm9ybWFsaXplZCwgc3RyaWRlLCBvZmZzZXQpIHtcbiAgICB0eXBlICAgICAgID0gdHlwZSB8fCBnbC5GTE9BVFxuICAgIG5vcm1hbGl6ZWQgPSAhIW5vcm1hbGl6ZWRcbiAgICBzdHJpZGUgICAgID0gc3RyaWRlIHx8IChkaW1lbnNpb24gKiBkaW1lbnNpb24pXG4gICAgb2Zmc2V0ICAgICA9IG9mZnNldCB8fCAwXG4gICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgIHZhciBsb2NhdGlvbiA9IGxvY2F0aW9uc1tpbmRleFtpXV1cbiAgICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoXG4gICAgICAgICAgICBsb2NhdGlvblxuICAgICAgICAgICwgZGltZW5zaW9uXG4gICAgICAgICAgLCB0eXBlXG4gICAgICAgICAgLCBub3JtYWxpemVkXG4gICAgICAgICAgLCBzdHJpZGVcbiAgICAgICAgICAsIG9mZnNldCArIGkgKiBkaW1lbnNpb24pXG4gICAgICBnbC5lbmFibGVWZXJ0ZXhBdHRyaWJBcnJheShsb2NhdGlvbilcbiAgICB9XG4gIH1cblxuICB2YXIgc2NyYXRjaCA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciB2ZXJ0ZXhBdHRyaWIgPSBnbFsndmVydGV4QXR0cmliJyArIGRpbWVuc2lvbiArICdmdiddXG5cbiAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG9iaiwgbmFtZSwge1xuICAgIHNldDogZnVuY3Rpb24oeCkge1xuICAgICAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICAgICAgdmFyIGxvYyA9IGxvY2F0aW9uc1tpbmRleFtpXV1cbiAgICAgICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGxvYylcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh4WzBdKSkge1xuICAgICAgICAgIHZlcnRleEF0dHJpYi5jYWxsKGdsLCBsb2MsIHhbaV0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZm9yKHZhciBqPTA7IGo8ZGltZW5zaW9uOyArK2opIHtcbiAgICAgICAgICAgIHNjcmF0Y2hbal0gPSB4W2RpbWVuc2lvbippICsgal1cbiAgICAgICAgICB9XG4gICAgICAgICAgdmVydGV4QXR0cmliLmNhbGwoZ2wsIGxvYywgc2NyYXRjaClcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHhcbiAgICB9XG4gICAgLCBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHBhcnRzXG4gICAgfVxuICAgICwgZW51bWVyYWJsZTogdHJ1ZVxuICB9KVxufVxuXG4vL0NyZWF0ZSBzaGltcyBmb3IgYXR0cmlidXRlc1xuZnVuY3Rpb24gY3JlYXRlQXR0cmlidXRlV3JhcHBlcihcbiAgICBnbFxuICAsIHdyYXBwZXJcbiAgLCBhdHRyaWJ1dGVzXG4gICwgbG9jYXRpb25zKSB7XG5cbiAgdmFyIG9iaiA9IHt9XG4gIGZvcih2YXIgaT0wLCBuPWF0dHJpYnV0ZXMubGVuZ3RoOyBpPG47ICsraSkge1xuXG4gICAgdmFyIGEgPSBhdHRyaWJ1dGVzW2ldXG4gICAgdmFyIG5hbWUgPSBhLm5hbWVcbiAgICB2YXIgdHlwZSA9IGEudHlwZVxuICAgIHZhciBsb2NzID0gYS5sb2NhdGlvbnNcblxuICAgIHN3aXRjaCh0eXBlKSB7XG4gICAgICBjYXNlICdib29sJzpcbiAgICAgIGNhc2UgJ2ludCc6XG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICAgIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICAgICAgICAgIGdsXG4gICAgICAgICAgLCB3cmFwcGVyXG4gICAgICAgICAgLCBsb2NzWzBdXG4gICAgICAgICAgLCBsb2NhdGlvbnNcbiAgICAgICAgICAsIDFcbiAgICAgICAgICAsIG9ialxuICAgICAgICAgICwgbmFtZSlcbiAgICAgIGJyZWFrXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmKHR5cGUuaW5kZXhPZigndmVjJykgPj0gMCkge1xuICAgICAgICAgIHZhciBkID0gdHlwZS5jaGFyQ29kZUF0KHR5cGUubGVuZ3RoLTEpIC0gNDhcbiAgICAgICAgICBpZihkIDwgMiB8fCBkID4gNCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdJbnZhbGlkIGRhdGEgdHlwZSBmb3IgYXR0cmlidXRlICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgICAgfVxuICAgICAgICAgIGFkZFZlY3RvckF0dHJpYnV0ZShcbiAgICAgICAgICAgICAgZ2xcbiAgICAgICAgICAgICwgd3JhcHBlclxuICAgICAgICAgICAgLCBsb2NzWzBdXG4gICAgICAgICAgICAsIGxvY2F0aW9uc1xuICAgICAgICAgICAgLCBkXG4gICAgICAgICAgICAsIG9ialxuICAgICAgICAgICAgLCBuYW1lKVxuICAgICAgICB9IGVsc2UgaWYodHlwZS5pbmRleE9mKCdtYXQnKSA+PSAwKSB7XG4gICAgICAgICAgdmFyIGQgPSB0eXBlLmNoYXJDb2RlQXQodHlwZS5sZW5ndGgtMSkgLSA0OFxuICAgICAgICAgIGlmKGQgPCAyIHx8IGQgPiA0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgR0xFcnJvcignJywgJ0ludmFsaWQgZGF0YSB0eXBlIGZvciBhdHRyaWJ1dGUgJyArIG5hbWUgKyAnOiAnICsgdHlwZSlcbiAgICAgICAgICB9XG4gICAgICAgICAgYWRkTWF0cml4QXR0cmlidXRlKFxuICAgICAgICAgICAgICBnbFxuICAgICAgICAgICAgLCB3cmFwcGVyXG4gICAgICAgICAgICAsIGxvY3NcbiAgICAgICAgICAgICwgbG9jYXRpb25zXG4gICAgICAgICAgICAsIGRcbiAgICAgICAgICAgICwgb2JqXG4gICAgICAgICAgICAsIG5hbWUpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEdMRXJyb3IoJycsICdVbmtub3duIGRhdGEgdHlwZSBmb3IgYXR0cmlidXRlICcgKyBuYW1lICsgJzogJyArIHR5cGUpXG4gICAgICAgIH1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG4gIHJldHVybiBvYmpcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvY3JlYXRlLWF0dHJpYnV0ZXMuanNcbi8vIG1vZHVsZSBpZCA9IDE3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG5leHBvcnRzLnNoYWRlciAgID0gZ2V0U2hhZGVyUmVmZXJlbmNlXG5leHBvcnRzLnByb2dyYW0gID0gY3JlYXRlUHJvZ3JhbVxuXG52YXIgR0xFcnJvciA9IHJlcXVpcmUoXCIuL0dMRXJyb3JcIilcbnZhciBmb3JtYXRDb21waWxlckVycm9yID0gcmVxdWlyZSgnZ2wtZm9ybWF0LWNvbXBpbGVyLWVycm9yJyk7XG5cbnZhciB3ZWFrTWFwID0gdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnd2Vha21hcC1zaGltJykgOiBXZWFrTWFwXG52YXIgQ0FDSEUgPSBuZXcgd2Vha01hcCgpXG5cbnZhciBTSEFERVJfQ09VTlRFUiA9IDBcblxuZnVuY3Rpb24gU2hhZGVyUmVmZXJlbmNlKGlkLCBzcmMsIHR5cGUsIHNoYWRlciwgcHJvZ3JhbXMsIGNvdW50LCBjYWNoZSkge1xuICB0aGlzLmlkICAgICAgID0gaWRcbiAgdGhpcy5zcmMgICAgICA9IHNyY1xuICB0aGlzLnR5cGUgICAgID0gdHlwZVxuICB0aGlzLnNoYWRlciAgID0gc2hhZGVyXG4gIHRoaXMuY291bnQgICAgPSBjb3VudFxuICB0aGlzLnByb2dyYW1zID0gW11cbiAgdGhpcy5jYWNoZSAgICA9IGNhY2hlXG59XG5cblNoYWRlclJlZmVyZW5jZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICBpZigtLXRoaXMuY291bnQgPT09IDApIHtcbiAgICB2YXIgY2FjaGUgICAgPSB0aGlzLmNhY2hlXG4gICAgdmFyIGdsICAgICAgID0gY2FjaGUuZ2xcblxuICAgIC8vUmVtb3ZlIHByb2dyYW0gcmVmZXJlbmNlc1xuICAgIHZhciBwcm9ncmFtcyA9IHRoaXMucHJvZ3JhbXNcbiAgICBmb3IodmFyIGk9MCwgbj1wcm9ncmFtcy5sZW5ndGg7IGk8bjsgKytpKSB7XG4gICAgICB2YXIgcCA9IGNhY2hlLnByb2dyYW1zW3Byb2dyYW1zW2ldXVxuICAgICAgaWYocCkge1xuICAgICAgICBkZWxldGUgY2FjaGUucHJvZ3JhbXNbaV1cbiAgICAgICAgZ2wuZGVsZXRlUHJvZ3JhbShwKVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vUmVtb3ZlIHNoYWRlciByZWZlcmVuY2VcbiAgICBnbC5kZWxldGVTaGFkZXIodGhpcy5zaGFkZXIpXG4gICAgZGVsZXRlIGNhY2hlLnNoYWRlcnNbKHRoaXMudHlwZSA9PT0gZ2wuRlJBR01FTlRfU0hBREVSKXwwXVt0aGlzLnNyY11cbiAgfVxufVxuXG5mdW5jdGlvbiBDb250ZXh0Q2FjaGUoZ2wpIHtcbiAgdGhpcy5nbCAgICAgICA9IGdsXG4gIHRoaXMuc2hhZGVycyAgPSBbe30sIHt9XVxuICB0aGlzLnByb2dyYW1zID0ge31cbn1cblxudmFyIHByb3RvID0gQ29udGV4dENhY2hlLnByb3RvdHlwZVxuXG5mdW5jdGlvbiBjb21waWxlU2hhZGVyKGdsLCB0eXBlLCBzcmMpIHtcbiAgdmFyIHNoYWRlciA9IGdsLmNyZWF0ZVNoYWRlcih0eXBlKVxuICBnbC5zaGFkZXJTb3VyY2Uoc2hhZGVyLCBzcmMpXG4gIGdsLmNvbXBpbGVTaGFkZXIoc2hhZGVyKVxuICBpZighZ2wuZ2V0U2hhZGVyUGFyYW1ldGVyKHNoYWRlciwgZ2wuQ09NUElMRV9TVEFUVVMpKSB7XG4gICAgdmFyIGVyckxvZyA9IGdsLmdldFNoYWRlckluZm9Mb2coc2hhZGVyKVxuICAgIHRyeSB7XG4gICAgICAgIHZhciBmbXQgPSBmb3JtYXRDb21waWxlckVycm9yKGVyckxvZywgc3JjLCB0eXBlKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgY29uc29sZS53YXJuKCdGYWlsZWQgdG8gZm9ybWF0IGNvbXBpbGVyIGVycm9yOiAnICsgZSk7XG4gICAgICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgJ0Vycm9yIGNvbXBpbGluZyBzaGFkZXI6XFxuJyArIGVyckxvZylcbiAgICB9XG4gICAgdGhyb3cgbmV3IEdMRXJyb3IoZXJyTG9nLCBmbXQuc2hvcnQsIGZtdC5sb25nKVxuICB9XG4gIHJldHVybiBzaGFkZXJcbn1cblxucHJvdG8uZ2V0U2hhZGVyUmVmZXJlbmNlID0gZnVuY3Rpb24odHlwZSwgc3JjKSB7XG4gIHZhciBnbCAgICAgID0gdGhpcy5nbFxuICB2YXIgc2hhZGVycyA9IHRoaXMuc2hhZGVyc1sodHlwZSA9PT0gZ2wuRlJBR01FTlRfU0hBREVSKXwwXVxuICB2YXIgc2hhZGVyICA9IHNoYWRlcnNbc3JjXVxuICBpZighc2hhZGVyIHx8ICFnbC5pc1NoYWRlcihzaGFkZXIuc2hhZGVyKSkge1xuICAgIHZhciBzaGFkZXJPYmogPSBjb21waWxlU2hhZGVyKGdsLCB0eXBlLCBzcmMpXG4gICAgc2hhZGVyID0gc2hhZGVyc1tzcmNdID0gbmV3IFNoYWRlclJlZmVyZW5jZShcbiAgICAgIFNIQURFUl9DT1VOVEVSKyssXG4gICAgICBzcmMsXG4gICAgICB0eXBlLFxuICAgICAgc2hhZGVyT2JqLFxuICAgICAgW10sXG4gICAgICAxLFxuICAgICAgdGhpcylcbiAgfSBlbHNlIHtcbiAgICBzaGFkZXIuY291bnQgKz0gMVxuICB9XG4gIHJldHVybiBzaGFkZXJcbn1cblxuZnVuY3Rpb24gbGlua1Byb2dyYW0oZ2wsIHZzaGFkZXIsIGZzaGFkZXIsIGF0dHJpYnMsIGxvY2F0aW9ucykge1xuICB2YXIgcHJvZ3JhbSA9IGdsLmNyZWF0ZVByb2dyYW0oKVxuICBnbC5hdHRhY2hTaGFkZXIocHJvZ3JhbSwgdnNoYWRlcilcbiAgZ2wuYXR0YWNoU2hhZGVyKHByb2dyYW0sIGZzaGFkZXIpXG4gIGZvcih2YXIgaT0wOyBpPGF0dHJpYnMubGVuZ3RoOyArK2kpIHtcbiAgICBnbC5iaW5kQXR0cmliTG9jYXRpb24ocHJvZ3JhbSwgbG9jYXRpb25zW2ldLCBhdHRyaWJzW2ldKVxuICB9XG4gIGdsLmxpbmtQcm9ncmFtKHByb2dyYW0pXG4gIGlmKCFnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkxJTktfU1RBVFVTKSkge1xuICAgIHZhciBlcnJMb2cgPSBnbC5nZXRQcm9ncmFtSW5mb0xvZyhwcm9ncmFtKVxuICAgIHRocm93IG5ldyBHTEVycm9yKGVyckxvZywgJ0Vycm9yIGxpbmtpbmcgcHJvZ3JhbTogJyArIGVyckxvZylcbiAgfVxuICByZXR1cm4gcHJvZ3JhbVxufVxuXG5wcm90by5nZXRQcm9ncmFtID0gZnVuY3Rpb24odnJlZiwgZnJlZiwgYXR0cmlicywgbG9jYXRpb25zKSB7XG4gIHZhciB0b2tlbiA9IFt2cmVmLmlkLCBmcmVmLmlkLCBhdHRyaWJzLmpvaW4oJzonKSwgbG9jYXRpb25zLmpvaW4oJzonKV0uam9pbignQCcpXG4gIHZhciBwcm9nICA9IHRoaXMucHJvZ3JhbXNbdG9rZW5dXG4gIGlmKCFwcm9nIHx8ICF0aGlzLmdsLmlzUHJvZ3JhbShwcm9nKSkge1xuICAgIHRoaXMucHJvZ3JhbXNbdG9rZW5dID0gcHJvZyA9IGxpbmtQcm9ncmFtKFxuICAgICAgdGhpcy5nbCxcbiAgICAgIHZyZWYuc2hhZGVyLFxuICAgICAgZnJlZi5zaGFkZXIsXG4gICAgICBhdHRyaWJzLFxuICAgICAgbG9jYXRpb25zKVxuICAgIHZyZWYucHJvZ3JhbXMucHVzaCh0b2tlbilcbiAgICBmcmVmLnByb2dyYW1zLnB1c2godG9rZW4pXG4gIH1cbiAgcmV0dXJuIHByb2dcbn1cblxuZnVuY3Rpb24gZ2V0Q2FjaGUoZ2wpIHtcbiAgdmFyIGN0eENhY2hlID0gQ0FDSEUuZ2V0KGdsKVxuICBpZighY3R4Q2FjaGUpIHtcbiAgICBjdHhDYWNoZSA9IG5ldyBDb250ZXh0Q2FjaGUoZ2wpXG4gICAgQ0FDSEUuc2V0KGdsLCBjdHhDYWNoZSlcbiAgfVxuICByZXR1cm4gY3R4Q2FjaGVcbn1cblxuZnVuY3Rpb24gZ2V0U2hhZGVyUmVmZXJlbmNlKGdsLCB0eXBlLCBzcmMpIHtcbiAgcmV0dXJuIGdldENhY2hlKGdsKS5nZXRTaGFkZXJSZWZlcmVuY2UodHlwZSwgc3JjKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVQcm9ncmFtKGdsLCB2cmVmLCBmcmVmLCBhdHRyaWJzLCBsb2NhdGlvbnMpIHtcbiAgcmV0dXJuIGdldENhY2hlKGdsKS5nZXRQcm9ncmFtKHZyZWYsIGZyZWYsIGF0dHJpYnMsIGxvY2F0aW9ucylcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXNoYWRlci9saWIvc2hhZGVyLWNhY2hlLmpzXG4vLyBtb2R1bGUgaWQgPSAxOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcbnZhciBzcHJpbnRmID0gcmVxdWlyZSgnc3ByaW50Zi1qcycpLnNwcmludGY7XG52YXIgZ2xDb25zdGFudHMgPSByZXF1aXJlKCdnbC1jb25zdGFudHMvbG9va3VwJyk7XG52YXIgc2hhZGVyTmFtZSA9IHJlcXVpcmUoJ2dsc2wtc2hhZGVyLW5hbWUnKTtcbnZhciBhZGRMaW5lTnVtYmVycyA9IHJlcXVpcmUoJ2FkZC1saW5lLW51bWJlcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmb3JtYXRDb21waWxlckVycm9yO1xuXG5mdW5jdGlvbiBmb3JtYXRDb21waWxlckVycm9yKGVyckxvZywgc3JjLCB0eXBlKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgbmFtZSA9IHNoYWRlck5hbWUoc3JjKSB8fCAnb2YgdW5rbm93biBuYW1lIChzZWUgbnBtIGdsc2wtc2hhZGVyLW5hbWUpJztcblxuICAgIHZhciB0eXBlTmFtZSA9ICd1bmtub3duIHR5cGUnO1xuICAgIGlmICh0eXBlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHlwZU5hbWUgPSB0eXBlID09PSBnbENvbnN0YW50cy5GUkFHTUVOVF9TSEFERVIgPyAnZnJhZ21lbnQnIDogJ3ZlcnRleCdcbiAgICB9XG5cbiAgICB2YXIgbG9uZ0Zvcm0gPSBzcHJpbnRmKCdFcnJvciBjb21waWxpbmcgJXMgc2hhZGVyICVzOlxcbicsIHR5cGVOYW1lLCBuYW1lKTtcbiAgICB2YXIgc2hvcnRGb3JtID0gc3ByaW50ZihcIiVzJXNcIiwgbG9uZ0Zvcm0sIGVyckxvZyk7XG5cbiAgICB2YXIgZXJyb3JTdHJpbmdzID0gZXJyTG9nLnNwbGl0KCdcXG4nKTtcbiAgICB2YXIgZXJyb3JzID0ge307XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVycm9yU3RyaW5ncy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZXJyb3JTdHJpbmcgPSBlcnJvclN0cmluZ3NbaV07XG4gICAgICAgIGlmIChlcnJvclN0cmluZyA9PT0gJycgfHwgZXJyb3JTdHJpbmcgPT09IFwiXFwwXCIpIGNvbnRpbnVlO1xuICAgICAgICB2YXIgbGluZU5vID0gcGFyc2VJbnQoZXJyb3JTdHJpbmcuc3BsaXQoJzonKVsyXSk7XG4gICAgICAgIGlmIChpc05hTihsaW5lTm8pKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignQ291bGQgbm90IHBhcnNlIGVycm9yOiAlcycsIGVycm9yU3RyaW5nKSk7XG4gICAgICAgIH1cbiAgICAgICAgZXJyb3JzW2xpbmVOb10gPSBlcnJvclN0cmluZztcbiAgICB9XG5cbiAgICB2YXIgbGluZXMgPSBhZGRMaW5lTnVtYmVycyhzcmMpLnNwbGl0KCdcXG4nKTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKCFlcnJvcnNbaSszXSAmJiAhZXJyb3JzW2krMl0gJiYgIWVycm9yc1tpKzFdKSBjb250aW51ZTtcbiAgICAgICAgdmFyIGxpbmUgPSBsaW5lc1tpXTtcbiAgICAgICAgbG9uZ0Zvcm0gKz0gbGluZSArICdcXG4nO1xuICAgICAgICBpZiAoZXJyb3JzW2krMV0pIHtcbiAgICAgICAgICAgIHZhciBlID0gZXJyb3JzW2krMV07XG4gICAgICAgICAgICBlID0gZS5zdWJzdHIoZS5zcGxpdCgnOicsIDMpLmpvaW4oJzonKS5sZW5ndGggKyAxKS50cmltKCk7XG4gICAgICAgICAgICBsb25nRm9ybSArPSBzcHJpbnRmKCdeXl4gJXNcXG5cXG4nLCBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGxvbmc6IGxvbmdGb3JtLnRyaW0oKSxcbiAgICAgICAgc2hvcnQ6IHNob3J0Rm9ybS50cmltKClcbiAgICB9O1xufVxuXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1mb3JtYXQtY29tcGlsZXItZXJyb3IvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDE5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIGdsb2JhbCB3aW5kb3csIGV4cG9ydHMsIGRlZmluZSAqL1xuXG4hZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnXG5cbiAgICB2YXIgcmUgPSB7XG4gICAgICAgIG5vdF9zdHJpbmc6IC9bXnNdLyxcbiAgICAgICAgbm90X2Jvb2w6IC9bXnRdLyxcbiAgICAgICAgbm90X3R5cGU6IC9bXlRdLyxcbiAgICAgICAgbm90X3ByaW1pdGl2ZTogL1tedl0vLFxuICAgICAgICBudW1iZXI6IC9bZGllZmddLyxcbiAgICAgICAgbnVtZXJpY19hcmc6IC9bYmNkaWVmZ3V4WF0vLFxuICAgICAgICBqc29uOiAvW2pdLyxcbiAgICAgICAgbm90X2pzb246IC9bXmpdLyxcbiAgICAgICAgdGV4dDogL15bXlxceDI1XSsvLFxuICAgICAgICBtb2R1bG86IC9eXFx4MjV7Mn0vLFxuICAgICAgICBwbGFjZWhvbGRlcjogL15cXHgyNSg/OihbMS05XVxcZCopXFwkfFxcKChbXlxcKV0rKVxcKSk/KFxcKyk/KDB8J1teJF0pPygtKT8oXFxkKyk/KD86XFwuKFxcZCspKT8oW2ItZ2lqb3N0VHV2eFhdKS8sXG4gICAgICAgIGtleTogL14oW2Etel9dW2Etel9cXGRdKikvaSxcbiAgICAgICAga2V5X2FjY2VzczogL15cXC4oW2Etel9dW2Etel9cXGRdKikvaSxcbiAgICAgICAgaW5kZXhfYWNjZXNzOiAvXlxcWyhcXGQrKVxcXS8sXG4gICAgICAgIHNpZ246IC9eW1xcK1xcLV0vXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3ByaW50ZihrZXkpIHtcbiAgICAgICAgLy8gYGFyZ3VtZW50c2AgaXMgbm90IGFuIGFycmF5LCBidXQgc2hvdWxkIGJlIGZpbmUgZm9yIHRoaXMgY2FsbFxuICAgICAgICByZXR1cm4gc3ByaW50Zl9mb3JtYXQoc3ByaW50Zl9wYXJzZShrZXkpLCBhcmd1bWVudHMpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdnNwcmludGYoZm10LCBhcmd2KSB7XG4gICAgICAgIHJldHVybiBzcHJpbnRmLmFwcGx5KG51bGwsIFtmbXRdLmNvbmNhdChhcmd2IHx8IFtdKSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmX2Zvcm1hdChwYXJzZV90cmVlLCBhcmd2KSB7XG4gICAgICAgIHZhciBjdXJzb3IgPSAxLCB0cmVlX2xlbmd0aCA9IHBhcnNlX3RyZWUubGVuZ3RoLCBhcmcsIG91dHB1dCA9ICcnLCBpLCBrLCBtYXRjaCwgcGFkLCBwYWRfY2hhcmFjdGVyLCBwYWRfbGVuZ3RoLCBpc19wb3NpdGl2ZSwgc2lnblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgdHJlZV9sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXJzZV90cmVlW2ldID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIG91dHB1dCArPSBwYXJzZV90cmVlW2ldXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChBcnJheS5pc0FycmF5KHBhcnNlX3RyZWVbaV0pKSB7XG4gICAgICAgICAgICAgICAgbWF0Y2ggPSBwYXJzZV90cmVlW2ldIC8vIGNvbnZlbmllbmNlIHB1cnBvc2VzIG9ubHlcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHsgLy8ga2V5d29yZCBhcmd1bWVudFxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd2W2N1cnNvcl1cbiAgICAgICAgICAgICAgICAgICAgZm9yIChrID0gMDsgayA8IG1hdGNoWzJdLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIWFyZy5oYXNPd25Qcm9wZXJ0eShtYXRjaFsyXVtrXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3Ioc3ByaW50ZignW3NwcmludGZdIHByb3BlcnR5IFwiJXNcIiBkb2VzIG5vdCBleGlzdCcsIG1hdGNoWzJdW2tdKSlcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ1ttYXRjaFsyXVtrXV1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChtYXRjaFsxXSkgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChleHBsaWNpdClcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndlttYXRjaFsxXV1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7IC8vIHBvc2l0aW9uYWwgYXJndW1lbnQgKGltcGxpY2l0KVxuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmd2W2N1cnNvcisrXVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5ub3RfdHlwZS50ZXN0KG1hdGNoWzhdKSAmJiByZS5ub3RfcHJpbWl0aXZlLnRlc3QobWF0Y2hbOF0pICYmIGFyZyBpbnN0YW5jZW9mIEZ1bmN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZygpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlLm51bWVyaWNfYXJnLnRlc3QobWF0Y2hbOF0pICYmICh0eXBlb2YgYXJnICE9PSAnbnVtYmVyJyAmJiBpc05hTihhcmcpKSkge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHNwcmludGYoJ1tzcHJpbnRmXSBleHBlY3RpbmcgbnVtYmVyIGJ1dCBmb3VuZCAlVCcsIGFyZykpXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlLm51bWJlci50ZXN0KG1hdGNoWzhdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc19wb3NpdGl2ZSA9IGFyZyA+PSAwXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChtYXRjaFs4XSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdiJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApLnRvU3RyaW5nKDIpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZy5mcm9tQ2hhckNvZGUocGFyc2VJbnQoYXJnLCAxMCkpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdkJzpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnaic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBKU09OLnN0cmluZ2lmeShhcmcsIG51bGwsIG1hdGNoWzZdID8gcGFyc2VJbnQobWF0Y2hbNl0pIDogMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2UnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gbWF0Y2hbN10gPyBwYXJzZUZsb2F0KGFyZykudG9FeHBvbmVudGlhbChtYXRjaFs3XSkgOiBwYXJzZUZsb2F0KGFyZykudG9FeHBvbmVudGlhbCgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gcGFyc2VGbG9hdChhcmcpLnRvRml4ZWQobWF0Y2hbN10pIDogcGFyc2VGbG9hdChhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdnJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gU3RyaW5nKE51bWJlcihhcmcudG9QcmVjaXNpb24obWF0Y2hbN10pKSkgOiBwYXJzZUZsb2F0KGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ28nOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZyg4KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAncyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd0JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IFN0cmluZyghIWFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnVCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnKS5zbGljZSg4LCAtMSkudG9Mb3dlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKG1hdGNoWzddID8gYXJnLnN1YnN0cmluZygwLCBtYXRjaFs3XSkgOiBhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd1JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IHBhcnNlSW50KGFyZywgMTApID4+PiAwXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICd2JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy52YWx1ZU9mKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAneCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnWCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAocGFyc2VJbnQoYXJnLCAxMCkgPj4+IDApLnRvU3RyaW5nKDE2KS50b1VwcGVyQ2FzZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAocmUuanNvbi50ZXN0KG1hdGNoWzhdKSkge1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gYXJnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAocmUubnVtYmVyLnRlc3QobWF0Y2hbOF0pICYmICghaXNfcG9zaXRpdmUgfHwgbWF0Y2hbM10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gaXNfcG9zaXRpdmUgPyAnKycgOiAnLSdcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZy50b1N0cmluZygpLnJlcGxhY2UocmUuc2lnbiwgJycpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWduID0gJydcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYWRfY2hhcmFjdGVyID0gbWF0Y2hbNF0gPyBtYXRjaFs0XSA9PT0gJzAnID8gJzAnIDogbWF0Y2hbNF0uY2hhckF0KDEpIDogJyAnXG4gICAgICAgICAgICAgICAgICAgIHBhZF9sZW5ndGggPSBtYXRjaFs2XSAtIChzaWduICsgYXJnKS5sZW5ndGhcbiAgICAgICAgICAgICAgICAgICAgcGFkID0gbWF0Y2hbNl0gPyAocGFkX2xlbmd0aCA+IDAgPyBwYWRfY2hhcmFjdGVyLnJlcGVhdChwYWRfbGVuZ3RoKSA6ICcnKSA6ICcnXG4gICAgICAgICAgICAgICAgICAgIG91dHB1dCArPSBtYXRjaFs1XSA/IHNpZ24gKyBhcmcgKyBwYWQgOiAocGFkX2NoYXJhY3RlciA9PT0gJzAnID8gc2lnbiArIHBhZCArIGFyZyA6IHBhZCArIHNpZ24gKyBhcmcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXRwdXRcbiAgICB9XG5cbiAgICB2YXIgc3ByaW50Zl9jYWNoZSA9IE9iamVjdC5jcmVhdGUobnVsbClcblxuICAgIGZ1bmN0aW9uIHNwcmludGZfcGFyc2UoZm10KSB7XG4gICAgICAgIGlmIChzcHJpbnRmX2NhY2hlW2ZtdF0pIHtcbiAgICAgICAgICAgIHJldHVybiBzcHJpbnRmX2NhY2hlW2ZtdF1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBfZm10ID0gZm10LCBtYXRjaCwgcGFyc2VfdHJlZSA9IFtdLCBhcmdfbmFtZXMgPSAwXG4gICAgICAgIHdoaWxlIChfZm10KSB7XG4gICAgICAgICAgICBpZiAoKG1hdGNoID0gcmUudGV4dC5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChtYXRjaFswXSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKChtYXRjaCA9IHJlLm1vZHVsby5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaCgnJScpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobWF0Y2ggPSByZS5wbGFjZWhvbGRlci5leGVjKF9mbXQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChtYXRjaFsyXSkge1xuICAgICAgICAgICAgICAgICAgICBhcmdfbmFtZXMgfD0gMVxuICAgICAgICAgICAgICAgICAgICB2YXIgZmllbGRfbGlzdCA9IFtdLCByZXBsYWNlbWVudF9maWVsZCA9IG1hdGNoWzJdLCBmaWVsZF9tYXRjaCA9IFtdXG4gICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRfbWF0Y2ggPSByZS5rZXkuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9saXN0LnB1c2goZmllbGRfbWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICB3aGlsZSAoKHJlcGxhY2VtZW50X2ZpZWxkID0gcmVwbGFjZW1lbnRfZmllbGQuc3Vic3RyaW5nKGZpZWxkX21hdGNoWzBdLmxlbmd0aCkpICE9PSAnJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoZmllbGRfbWF0Y2ggPSByZS5rZXlfYWNjZXNzLmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWVsZF9saXN0LnB1c2goZmllbGRfbWF0Y2hbMV0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKChmaWVsZF9tYXRjaCA9IHJlLmluZGV4X2FjY2Vzcy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdbc3ByaW50Zl0gZmFpbGVkIHRvIHBhcnNlIG5hbWVkIGFyZ3VtZW50IGtleScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFN5bnRheEVycm9yKCdbc3ByaW50Zl0gZmFpbGVkIHRvIHBhcnNlIG5hbWVkIGFyZ3VtZW50IGtleScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbWF0Y2hbMl0gPSBmaWVsZF9saXN0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBhcmdfbmFtZXMgfD0gMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJnX25hbWVzID09PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignW3NwcmludGZdIG1peGluZyBwb3NpdGlvbmFsIGFuZCBuYW1lZCBwbGFjZWhvbGRlcnMgaXMgbm90ICh5ZXQpIHN1cHBvcnRlZCcpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcnNlX3RyZWUucHVzaChtYXRjaClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIHVuZXhwZWN0ZWQgcGxhY2Vob2xkZXInKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgX2ZtdCA9IF9mbXQuc3Vic3RyaW5nKG1hdGNoWzBdLmxlbmd0aClcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3ByaW50Zl9jYWNoZVtmbXRdID0gcGFyc2VfdHJlZVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIGV4cG9ydCB0byBlaXRoZXIgYnJvd3NlciBvciBub2RlLmpzXG4gICAgICovXG4gICAgLyogZXNsaW50LWRpc2FibGUgcXVvdGUtcHJvcHMgKi9cbiAgICBpZiAodHlwZW9mIGV4cG9ydHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGV4cG9ydHNbJ3NwcmludGYnXSA9IHNwcmludGZcbiAgICAgICAgZXhwb3J0c1sndnNwcmludGYnXSA9IHZzcHJpbnRmXG4gICAgfVxuICAgIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB3aW5kb3dbJ3NwcmludGYnXSA9IHNwcmludGZcbiAgICAgICAgd2luZG93Wyd2c3ByaW50ZiddID0gdnNwcmludGZcblxuICAgICAgICBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmVbJ2FtZCddKSB7XG4gICAgICAgICAgICBkZWZpbmUoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgJ3NwcmludGYnOiBzcHJpbnRmLFxuICAgICAgICAgICAgICAgICAgICAndnNwcmludGYnOiB2c3ByaW50ZlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBxdW90ZS1wcm9wcyAqL1xufSgpXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9zcHJpbnRmLWpzL3NyYy9zcHJpbnRmLmpzXG4vLyBtb2R1bGUgaWQgPSAyMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgZ2wxMCA9IHJlcXVpcmUoJy4vMS4wL251bWJlcnMnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGxvb2t1cENvbnN0YW50IChudW1iZXIpIHtcbiAgcmV0dXJuIGdsMTBbbnVtYmVyXVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzL2xvb2t1cC5qc1xuLy8gbW9kdWxlIGlkID0gMjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIDA6ICdOT05FJyxcbiAgMTogJ09ORScsXG4gIDI6ICdMSU5FX0xPT1AnLFxuICAzOiAnTElORV9TVFJJUCcsXG4gIDQ6ICdUUklBTkdMRVMnLFxuICA1OiAnVFJJQU5HTEVfU1RSSVAnLFxuICA2OiAnVFJJQU5HTEVfRkFOJyxcbiAgMjU2OiAnREVQVEhfQlVGRkVSX0JJVCcsXG4gIDUxMjogJ05FVkVSJyxcbiAgNTEzOiAnTEVTUycsXG4gIDUxNDogJ0VRVUFMJyxcbiAgNTE1OiAnTEVRVUFMJyxcbiAgNTE2OiAnR1JFQVRFUicsXG4gIDUxNzogJ05PVEVRVUFMJyxcbiAgNTE4OiAnR0VRVUFMJyxcbiAgNTE5OiAnQUxXQVlTJyxcbiAgNzY4OiAnU1JDX0NPTE9SJyxcbiAgNzY5OiAnT05FX01JTlVTX1NSQ19DT0xPUicsXG4gIDc3MDogJ1NSQ19BTFBIQScsXG4gIDc3MTogJ09ORV9NSU5VU19TUkNfQUxQSEEnLFxuICA3NzI6ICdEU1RfQUxQSEEnLFxuICA3NzM6ICdPTkVfTUlOVVNfRFNUX0FMUEhBJyxcbiAgNzc0OiAnRFNUX0NPTE9SJyxcbiAgNzc1OiAnT05FX01JTlVTX0RTVF9DT0xPUicsXG4gIDc3NjogJ1NSQ19BTFBIQV9TQVRVUkFURScsXG4gIDEwMjQ6ICdTVEVOQ0lMX0JVRkZFUl9CSVQnLFxuICAxMDI4OiAnRlJPTlQnLFxuICAxMDI5OiAnQkFDSycsXG4gIDEwMzI6ICdGUk9OVF9BTkRfQkFDSycsXG4gIDEyODA6ICdJTlZBTElEX0VOVU0nLFxuICAxMjgxOiAnSU5WQUxJRF9WQUxVRScsXG4gIDEyODI6ICdJTlZBTElEX09QRVJBVElPTicsXG4gIDEyODU6ICdPVVRfT0ZfTUVNT1JZJyxcbiAgMTI4NjogJ0lOVkFMSURfRlJBTUVCVUZGRVJfT1BFUkFUSU9OJyxcbiAgMjMwNDogJ0NXJyxcbiAgMjMwNTogJ0NDVycsXG4gIDI4NDk6ICdMSU5FX1dJRFRIJyxcbiAgMjg4NDogJ0NVTExfRkFDRScsXG4gIDI4ODU6ICdDVUxMX0ZBQ0VfTU9ERScsXG4gIDI4ODY6ICdGUk9OVF9GQUNFJyxcbiAgMjkyODogJ0RFUFRIX1JBTkdFJyxcbiAgMjkyOTogJ0RFUFRIX1RFU1QnLFxuICAyOTMwOiAnREVQVEhfV1JJVEVNQVNLJyxcbiAgMjkzMTogJ0RFUFRIX0NMRUFSX1ZBTFVFJyxcbiAgMjkzMjogJ0RFUFRIX0ZVTkMnLFxuICAyOTYwOiAnU1RFTkNJTF9URVNUJyxcbiAgMjk2MTogJ1NURU5DSUxfQ0xFQVJfVkFMVUUnLFxuICAyOTYyOiAnU1RFTkNJTF9GVU5DJyxcbiAgMjk2MzogJ1NURU5DSUxfVkFMVUVfTUFTSycsXG4gIDI5NjQ6ICdTVEVOQ0lMX0ZBSUwnLFxuICAyOTY1OiAnU1RFTkNJTF9QQVNTX0RFUFRIX0ZBSUwnLFxuICAyOTY2OiAnU1RFTkNJTF9QQVNTX0RFUFRIX1BBU1MnLFxuICAyOTY3OiAnU1RFTkNJTF9SRUYnLFxuICAyOTY4OiAnU1RFTkNJTF9XUklURU1BU0snLFxuICAyOTc4OiAnVklFV1BPUlQnLFxuICAzMDI0OiAnRElUSEVSJyxcbiAgMzA0MjogJ0JMRU5EJyxcbiAgMzA4ODogJ1NDSVNTT1JfQk9YJyxcbiAgMzA4OTogJ1NDSVNTT1JfVEVTVCcsXG4gIDMxMDY6ICdDT0xPUl9DTEVBUl9WQUxVRScsXG4gIDMxMDc6ICdDT0xPUl9XUklURU1BU0snLFxuICAzMzE3OiAnVU5QQUNLX0FMSUdOTUVOVCcsXG4gIDMzMzM6ICdQQUNLX0FMSUdOTUVOVCcsXG4gIDMzNzk6ICdNQVhfVEVYVFVSRV9TSVpFJyxcbiAgMzM4NjogJ01BWF9WSUVXUE9SVF9ESU1TJyxcbiAgMzQwODogJ1NVQlBJWEVMX0JJVFMnLFxuICAzNDEwOiAnUkVEX0JJVFMnLFxuICAzNDExOiAnR1JFRU5fQklUUycsXG4gIDM0MTI6ICdCTFVFX0JJVFMnLFxuICAzNDEzOiAnQUxQSEFfQklUUycsXG4gIDM0MTQ6ICdERVBUSF9CSVRTJyxcbiAgMzQxNTogJ1NURU5DSUxfQklUUycsXG4gIDM1NTM6ICdURVhUVVJFXzJEJyxcbiAgNDM1MjogJ0RPTlRfQ0FSRScsXG4gIDQzNTM6ICdGQVNURVNUJyxcbiAgNDM1NDogJ05JQ0VTVCcsXG4gIDUxMjA6ICdCWVRFJyxcbiAgNTEyMTogJ1VOU0lHTkVEX0JZVEUnLFxuICA1MTIyOiAnU0hPUlQnLFxuICA1MTIzOiAnVU5TSUdORURfU0hPUlQnLFxuICA1MTI0OiAnSU5UJyxcbiAgNTEyNTogJ1VOU0lHTkVEX0lOVCcsXG4gIDUxMjY6ICdGTE9BVCcsXG4gIDUzODY6ICdJTlZFUlQnLFxuICA1ODkwOiAnVEVYVFVSRScsXG4gIDY0MDE6ICdTVEVOQ0lMX0lOREVYJyxcbiAgNjQwMjogJ0RFUFRIX0NPTVBPTkVOVCcsXG4gIDY0MDY6ICdBTFBIQScsXG4gIDY0MDc6ICdSR0InLFxuICA2NDA4OiAnUkdCQScsXG4gIDY0MDk6ICdMVU1JTkFOQ0UnLFxuICA2NDEwOiAnTFVNSU5BTkNFX0FMUEhBJyxcbiAgNzY4MDogJ0tFRVAnLFxuICA3NjgxOiAnUkVQTEFDRScsXG4gIDc2ODI6ICdJTkNSJyxcbiAgNzY4MzogJ0RFQ1InLFxuICA3OTM2OiAnVkVORE9SJyxcbiAgNzkzNzogJ1JFTkRFUkVSJyxcbiAgNzkzODogJ1ZFUlNJT04nLFxuICA5NzI4OiAnTkVBUkVTVCcsXG4gIDk3Mjk6ICdMSU5FQVInLFxuICA5OTg0OiAnTkVBUkVTVF9NSVBNQVBfTkVBUkVTVCcsXG4gIDk5ODU6ICdMSU5FQVJfTUlQTUFQX05FQVJFU1QnLFxuICA5OTg2OiAnTkVBUkVTVF9NSVBNQVBfTElORUFSJyxcbiAgOTk4NzogJ0xJTkVBUl9NSVBNQVBfTElORUFSJyxcbiAgMTAyNDA6ICdURVhUVVJFX01BR19GSUxURVInLFxuICAxMDI0MTogJ1RFWFRVUkVfTUlOX0ZJTFRFUicsXG4gIDEwMjQyOiAnVEVYVFVSRV9XUkFQX1MnLFxuICAxMDI0MzogJ1RFWFRVUkVfV1JBUF9UJyxcbiAgMTA0OTc6ICdSRVBFQVQnLFxuICAxMDc1MjogJ1BPTFlHT05fT0ZGU0VUX1VOSVRTJyxcbiAgMTYzODQ6ICdDT0xPUl9CVUZGRVJfQklUJyxcbiAgMzI3Njk6ICdDT05TVEFOVF9DT0xPUicsXG4gIDMyNzcwOiAnT05FX01JTlVTX0NPTlNUQU5UX0NPTE9SJyxcbiAgMzI3NzE6ICdDT05TVEFOVF9BTFBIQScsXG4gIDMyNzcyOiAnT05FX01JTlVTX0NPTlNUQU5UX0FMUEhBJyxcbiAgMzI3NzM6ICdCTEVORF9DT0xPUicsXG4gIDMyNzc0OiAnRlVOQ19BREQnLFxuICAzMjc3NzogJ0JMRU5EX0VRVUFUSU9OX1JHQicsXG4gIDMyNzc4OiAnRlVOQ19TVUJUUkFDVCcsXG4gIDMyNzc5OiAnRlVOQ19SRVZFUlNFX1NVQlRSQUNUJyxcbiAgMzI4MTk6ICdVTlNJR05FRF9TSE9SVF80XzRfNF80JyxcbiAgMzI4MjA6ICdVTlNJR05FRF9TSE9SVF81XzVfNV8xJyxcbiAgMzI4MjM6ICdQT0xZR09OX09GRlNFVF9GSUxMJyxcbiAgMzI4MjQ6ICdQT0xZR09OX09GRlNFVF9GQUNUT1InLFxuICAzMjg1NDogJ1JHQkE0JyxcbiAgMzI4NTU6ICdSR0I1X0ExJyxcbiAgMzI4NzM6ICdURVhUVVJFX0JJTkRJTkdfMkQnLFxuICAzMjkyNjogJ1NBTVBMRV9BTFBIQV9UT19DT1ZFUkFHRScsXG4gIDMyOTI4OiAnU0FNUExFX0NPVkVSQUdFJyxcbiAgMzI5MzY6ICdTQU1QTEVfQlVGRkVSUycsXG4gIDMyOTM3OiAnU0FNUExFUycsXG4gIDMyOTM4OiAnU0FNUExFX0NPVkVSQUdFX1ZBTFVFJyxcbiAgMzI5Mzk6ICdTQU1QTEVfQ09WRVJBR0VfSU5WRVJUJyxcbiAgMzI5Njg6ICdCTEVORF9EU1RfUkdCJyxcbiAgMzI5Njk6ICdCTEVORF9TUkNfUkdCJyxcbiAgMzI5NzA6ICdCTEVORF9EU1RfQUxQSEEnLFxuICAzMjk3MTogJ0JMRU5EX1NSQ19BTFBIQScsXG4gIDMzMDcxOiAnQ0xBTVBfVE9fRURHRScsXG4gIDMzMTcwOiAnR0VORVJBVEVfTUlQTUFQX0hJTlQnLFxuICAzMzE4OTogJ0RFUFRIX0NPTVBPTkVOVDE2JyxcbiAgMzMzMDY6ICdERVBUSF9TVEVOQ0lMX0FUVEFDSE1FTlQnLFxuICAzMzYzNTogJ1VOU0lHTkVEX1NIT1JUXzVfNl81JyxcbiAgMzM2NDg6ICdNSVJST1JFRF9SRVBFQVQnLFxuICAzMzkwMTogJ0FMSUFTRURfUE9JTlRfU0laRV9SQU5HRScsXG4gIDMzOTAyOiAnQUxJQVNFRF9MSU5FX1dJRFRIX1JBTkdFJyxcbiAgMzM5ODQ6ICdURVhUVVJFMCcsXG4gIDMzOTg1OiAnVEVYVFVSRTEnLFxuICAzMzk4NjogJ1RFWFRVUkUyJyxcbiAgMzM5ODc6ICdURVhUVVJFMycsXG4gIDMzOTg4OiAnVEVYVFVSRTQnLFxuICAzMzk4OTogJ1RFWFRVUkU1JyxcbiAgMzM5OTA6ICdURVhUVVJFNicsXG4gIDMzOTkxOiAnVEVYVFVSRTcnLFxuICAzMzk5MjogJ1RFWFRVUkU4JyxcbiAgMzM5OTM6ICdURVhUVVJFOScsXG4gIDMzOTk0OiAnVEVYVFVSRTEwJyxcbiAgMzM5OTU6ICdURVhUVVJFMTEnLFxuICAzMzk5NjogJ1RFWFRVUkUxMicsXG4gIDMzOTk3OiAnVEVYVFVSRTEzJyxcbiAgMzM5OTg6ICdURVhUVVJFMTQnLFxuICAzMzk5OTogJ1RFWFRVUkUxNScsXG4gIDM0MDAwOiAnVEVYVFVSRTE2JyxcbiAgMzQwMDE6ICdURVhUVVJFMTcnLFxuICAzNDAwMjogJ1RFWFRVUkUxOCcsXG4gIDM0MDAzOiAnVEVYVFVSRTE5JyxcbiAgMzQwMDQ6ICdURVhUVVJFMjAnLFxuICAzNDAwNTogJ1RFWFRVUkUyMScsXG4gIDM0MDA2OiAnVEVYVFVSRTIyJyxcbiAgMzQwMDc6ICdURVhUVVJFMjMnLFxuICAzNDAwODogJ1RFWFRVUkUyNCcsXG4gIDM0MDA5OiAnVEVYVFVSRTI1JyxcbiAgMzQwMTA6ICdURVhUVVJFMjYnLFxuICAzNDAxMTogJ1RFWFRVUkUyNycsXG4gIDM0MDEyOiAnVEVYVFVSRTI4JyxcbiAgMzQwMTM6ICdURVhUVVJFMjknLFxuICAzNDAxNDogJ1RFWFRVUkUzMCcsXG4gIDM0MDE1OiAnVEVYVFVSRTMxJyxcbiAgMzQwMTY6ICdBQ1RJVkVfVEVYVFVSRScsXG4gIDM0MDI0OiAnTUFYX1JFTkRFUkJVRkZFUl9TSVpFJyxcbiAgMzQwNDE6ICdERVBUSF9TVEVOQ0lMJyxcbiAgMzQwNTU6ICdJTkNSX1dSQVAnLFxuICAzNDA1NjogJ0RFQ1JfV1JBUCcsXG4gIDM0MDY3OiAnVEVYVFVSRV9DVUJFX01BUCcsXG4gIDM0MDY4OiAnVEVYVFVSRV9CSU5ESU5HX0NVQkVfTUFQJyxcbiAgMzQwNjk6ICdURVhUVVJFX0NVQkVfTUFQX1BPU0lUSVZFX1gnLFxuICAzNDA3MDogJ1RFWFRVUkVfQ1VCRV9NQVBfTkVHQVRJVkVfWCcsXG4gIDM0MDcxOiAnVEVYVFVSRV9DVUJFX01BUF9QT1NJVElWRV9ZJyxcbiAgMzQwNzI6ICdURVhUVVJFX0NVQkVfTUFQX05FR0FUSVZFX1knLFxuICAzNDA3MzogJ1RFWFRVUkVfQ1VCRV9NQVBfUE9TSVRJVkVfWicsXG4gIDM0MDc0OiAnVEVYVFVSRV9DVUJFX01BUF9ORUdBVElWRV9aJyxcbiAgMzQwNzY6ICdNQVhfQ1VCRV9NQVBfVEVYVFVSRV9TSVpFJyxcbiAgMzQzMzg6ICdWRVJURVhfQVRUUklCX0FSUkFZX0VOQUJMRUQnLFxuICAzNDMzOTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfU0laRScsXG4gIDM0MzQwOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9TVFJJREUnLFxuICAzNDM0MTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfVFlQRScsXG4gIDM0MzQyOiAnQ1VSUkVOVF9WRVJURVhfQVRUUklCJyxcbiAgMzQzNzM6ICdWRVJURVhfQVRUUklCX0FSUkFZX1BPSU5URVInLFxuICAzNDQ2NjogJ05VTV9DT01QUkVTU0VEX1RFWFRVUkVfRk9STUFUUycsXG4gIDM0NDY3OiAnQ09NUFJFU1NFRF9URVhUVVJFX0ZPUk1BVFMnLFxuICAzNDY2MDogJ0JVRkZFUl9TSVpFJyxcbiAgMzQ2NjE6ICdCVUZGRVJfVVNBR0UnLFxuICAzNDgxNjogJ1NURU5DSUxfQkFDS19GVU5DJyxcbiAgMzQ4MTc6ICdTVEVOQ0lMX0JBQ0tfRkFJTCcsXG4gIDM0ODE4OiAnU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfRkFJTCcsXG4gIDM0ODE5OiAnU1RFTkNJTF9CQUNLX1BBU1NfREVQVEhfUEFTUycsXG4gIDM0ODc3OiAnQkxFTkRfRVFVQVRJT05fQUxQSEEnLFxuICAzNDkyMTogJ01BWF9WRVJURVhfQVRUUklCUycsXG4gIDM0OTIyOiAnVkVSVEVYX0FUVFJJQl9BUlJBWV9OT1JNQUxJWkVEJyxcbiAgMzQ5MzA6ICdNQVhfVEVYVFVSRV9JTUFHRV9VTklUUycsXG4gIDM0OTYyOiAnQVJSQVlfQlVGRkVSJyxcbiAgMzQ5NjM6ICdFTEVNRU5UX0FSUkFZX0JVRkZFUicsXG4gIDM0OTY0OiAnQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNDk2NTogJ0VMRU1FTlRfQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNDk3NTogJ1ZFUlRFWF9BVFRSSUJfQVJSQVlfQlVGRkVSX0JJTkRJTkcnLFxuICAzNTA0MDogJ1NUUkVBTV9EUkFXJyxcbiAgMzUwNDQ6ICdTVEFUSUNfRFJBVycsXG4gIDM1MDQ4OiAnRFlOQU1JQ19EUkFXJyxcbiAgMzU2MzI6ICdGUkFHTUVOVF9TSEFERVInLFxuICAzNTYzMzogJ1ZFUlRFWF9TSEFERVInLFxuICAzNTY2MDogJ01BWF9WRVJURVhfVEVYVFVSRV9JTUFHRV9VTklUUycsXG4gIDM1NjYxOiAnTUFYX0NPTUJJTkVEX1RFWFRVUkVfSU1BR0VfVU5JVFMnLFxuICAzNTY2MzogJ1NIQURFUl9UWVBFJyxcbiAgMzU2NjQ6ICdGTE9BVF9WRUMyJyxcbiAgMzU2NjU6ICdGTE9BVF9WRUMzJyxcbiAgMzU2NjY6ICdGTE9BVF9WRUM0JyxcbiAgMzU2Njc6ICdJTlRfVkVDMicsXG4gIDM1NjY4OiAnSU5UX1ZFQzMnLFxuICAzNTY2OTogJ0lOVF9WRUM0JyxcbiAgMzU2NzA6ICdCT09MJyxcbiAgMzU2NzE6ICdCT09MX1ZFQzInLFxuICAzNTY3MjogJ0JPT0xfVkVDMycsXG4gIDM1NjczOiAnQk9PTF9WRUM0JyxcbiAgMzU2NzQ6ICdGTE9BVF9NQVQyJyxcbiAgMzU2NzU6ICdGTE9BVF9NQVQzJyxcbiAgMzU2NzY6ICdGTE9BVF9NQVQ0JyxcbiAgMzU2Nzg6ICdTQU1QTEVSXzJEJyxcbiAgMzU2ODA6ICdTQU1QTEVSX0NVQkUnLFxuICAzNTcxMjogJ0RFTEVURV9TVEFUVVMnLFxuICAzNTcxMzogJ0NPTVBJTEVfU1RBVFVTJyxcbiAgMzU3MTQ6ICdMSU5LX1NUQVRVUycsXG4gIDM1NzE1OiAnVkFMSURBVEVfU1RBVFVTJyxcbiAgMzU3MTY6ICdJTkZPX0xPR19MRU5HVEgnLFxuICAzNTcxNzogJ0FUVEFDSEVEX1NIQURFUlMnLFxuICAzNTcxODogJ0FDVElWRV9VTklGT1JNUycsXG4gIDM1NzE5OiAnQUNUSVZFX1VOSUZPUk1fTUFYX0xFTkdUSCcsXG4gIDM1NzIwOiAnU0hBREVSX1NPVVJDRV9MRU5HVEgnLFxuICAzNTcyMTogJ0FDVElWRV9BVFRSSUJVVEVTJyxcbiAgMzU3MjI6ICdBQ1RJVkVfQVRUUklCVVRFX01BWF9MRU5HVEgnLFxuICAzNTcyNDogJ1NIQURJTkdfTEFOR1VBR0VfVkVSU0lPTicsXG4gIDM1NzI1OiAnQ1VSUkVOVF9QUk9HUkFNJyxcbiAgMzYwMDM6ICdTVEVOQ0lMX0JBQ0tfUkVGJyxcbiAgMzYwMDQ6ICdTVEVOQ0lMX0JBQ0tfVkFMVUVfTUFTSycsXG4gIDM2MDA1OiAnU1RFTkNJTF9CQUNLX1dSSVRFTUFTSycsXG4gIDM2MDA2OiAnRlJBTUVCVUZGRVJfQklORElORycsXG4gIDM2MDA3OiAnUkVOREVSQlVGRkVSX0JJTkRJTkcnLFxuICAzNjA0ODogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX1RZUEUnLFxuICAzNjA0OTogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfT0JKRUNUX05BTUUnLFxuICAzNjA1MDogJ0ZSQU1FQlVGRkVSX0FUVEFDSE1FTlRfVEVYVFVSRV9MRVZFTCcsXG4gIDM2MDUxOiAnRlJBTUVCVUZGRVJfQVRUQUNITUVOVF9URVhUVVJFX0NVQkVfTUFQX0ZBQ0UnLFxuICAzNjA1MzogJ0ZSQU1FQlVGRkVSX0NPTVBMRVRFJyxcbiAgMzYwNTQ6ICdGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0FUVEFDSE1FTlQnLFxuICAzNjA1NTogJ0ZSQU1FQlVGRkVSX0lOQ09NUExFVEVfTUlTU0lOR19BVFRBQ0hNRU5UJyxcbiAgMzYwNTc6ICdGUkFNRUJVRkZFUl9JTkNPTVBMRVRFX0RJTUVOU0lPTlMnLFxuICAzNjA2MTogJ0ZSQU1FQlVGRkVSX1VOU1VQUE9SVEVEJyxcbiAgMzYwNjQ6ICdDT0xPUl9BVFRBQ0hNRU5UMCcsXG4gIDM2MDk2OiAnREVQVEhfQVRUQUNITUVOVCcsXG4gIDM2MTI4OiAnU1RFTkNJTF9BVFRBQ0hNRU5UJyxcbiAgMzYxNjA6ICdGUkFNRUJVRkZFUicsXG4gIDM2MTYxOiAnUkVOREVSQlVGRkVSJyxcbiAgMzYxNjI6ICdSRU5ERVJCVUZGRVJfV0lEVEgnLFxuICAzNjE2MzogJ1JFTkRFUkJVRkZFUl9IRUlHSFQnLFxuICAzNjE2NDogJ1JFTkRFUkJVRkZFUl9JTlRFUk5BTF9GT1JNQVQnLFxuICAzNjE2ODogJ1NURU5DSUxfSU5ERVg4JyxcbiAgMzYxNzY6ICdSRU5ERVJCVUZGRVJfUkVEX1NJWkUnLFxuICAzNjE3NzogJ1JFTkRFUkJVRkZFUl9HUkVFTl9TSVpFJyxcbiAgMzYxNzg6ICdSRU5ERVJCVUZGRVJfQkxVRV9TSVpFJyxcbiAgMzYxNzk6ICdSRU5ERVJCVUZGRVJfQUxQSEFfU0laRScsXG4gIDM2MTgwOiAnUkVOREVSQlVGRkVSX0RFUFRIX1NJWkUnLFxuICAzNjE4MTogJ1JFTkRFUkJVRkZFUl9TVEVOQ0lMX1NJWkUnLFxuICAzNjE5NDogJ1JHQjU2NScsXG4gIDM2MzM2OiAnTE9XX0ZMT0FUJyxcbiAgMzYzMzc6ICdNRURJVU1fRkxPQVQnLFxuICAzNjMzODogJ0hJR0hfRkxPQVQnLFxuICAzNjMzOTogJ0xPV19JTlQnLFxuICAzNjM0MDogJ01FRElVTV9JTlQnLFxuICAzNjM0MTogJ0hJR0hfSU5UJyxcbiAgMzYzNDY6ICdTSEFERVJfQ09NUElMRVInLFxuICAzNjM0NzogJ01BWF9WRVJURVhfVU5JRk9STV9WRUNUT1JTJyxcbiAgMzYzNDg6ICdNQVhfVkFSWUlOR19WRUNUT1JTJyxcbiAgMzYzNDk6ICdNQVhfRlJBR01FTlRfVU5JRk9STV9WRUNUT1JTJyxcbiAgMzc0NDA6ICdVTlBBQ0tfRkxJUF9ZX1dFQkdMJyxcbiAgMzc0NDE6ICdVTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wnLFxuICAzNzQ0MjogJ0NPTlRFWFRfTE9TVF9XRUJHTCcsXG4gIDM3NDQzOiAnVU5QQUNLX0NPTE9SU1BBQ0VfQ09OVkVSU0lPTl9XRUJHTCcsXG4gIDM3NDQ0OiAnQlJPV1NFUl9ERUZBVUxUX1dFQkdMJ1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtY29uc3RhbnRzLzEuMC9udW1iZXJzLmpzXG4vLyBtb2R1bGUgaWQgPSAyMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9rZW5pemUgPSByZXF1aXJlKCdnbHNsLXRva2VuaXplcicpXG52YXIgYXRvYiAgICAgPSByZXF1aXJlKCdhdG9iLWxpdGUnKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGdldE5hbWVcblxuZnVuY3Rpb24gZ2V0TmFtZShzcmMpIHtcbiAgdmFyIHRva2VucyA9IEFycmF5LmlzQXJyYXkoc3JjKVxuICAgID8gc3JjXG4gICAgOiB0b2tlbml6ZShzcmMpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgdG9rZW4gPSB0b2tlbnNbaV1cbiAgICBpZiAodG9rZW4udHlwZSAhPT0gJ3ByZXByb2Nlc3NvcicpIGNvbnRpbnVlXG4gICAgdmFyIG1hdGNoID0gdG9rZW4uZGF0YS5tYXRjaCgvXFwjZGVmaW5lXFxzK1NIQURFUl9OQU1FKF9CNjQpP1xccysoLispJC8pXG4gICAgaWYgKCFtYXRjaCkgY29udGludWVcbiAgICBpZiAoIW1hdGNoWzJdKSBjb250aW51ZVxuXG4gICAgdmFyIGI2NCAgPSBtYXRjaFsxXVxuICAgIHZhciBuYW1lID0gbWF0Y2hbMl1cblxuICAgIHJldHVybiAoYjY0ID8gYXRvYihuYW1lKSA6IG5hbWUpLnRyaW0oKVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXNoYWRlci1uYW1lL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAyM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgdG9rZW5pemUgPSByZXF1aXJlKCcuL2luZGV4JylcblxubW9kdWxlLmV4cG9ydHMgPSB0b2tlbml6ZVN0cmluZ1xuXG5mdW5jdGlvbiB0b2tlbml6ZVN0cmluZyhzdHIsIG9wdCkge1xuICB2YXIgZ2VuZXJhdG9yID0gdG9rZW5pemUob3B0KVxuICB2YXIgdG9rZW5zID0gW11cblxuICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KGdlbmVyYXRvcihzdHIpKVxuICB0b2tlbnMgPSB0b2tlbnMuY29uY2F0KGdlbmVyYXRvcihudWxsKSlcblxuICByZXR1cm4gdG9rZW5zXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9zdHJpbmcuanNcbi8vIG1vZHVsZSBpZCA9IDI0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdG9rZW5pemVcblxudmFyIGxpdGVyYWxzMTAwID0gcmVxdWlyZSgnLi9saWIvbGl0ZXJhbHMnKVxuICAsIG9wZXJhdG9ycyA9IHJlcXVpcmUoJy4vbGliL29wZXJhdG9ycycpXG4gICwgYnVpbHRpbnMxMDAgPSByZXF1aXJlKCcuL2xpYi9idWlsdGlucycpXG4gICwgbGl0ZXJhbHMzMDBlcyA9IHJlcXVpcmUoJy4vbGliL2xpdGVyYWxzLTMwMGVzJylcbiAgLCBidWlsdGluczMwMGVzID0gcmVxdWlyZSgnLi9saWIvYnVpbHRpbnMtMzAwZXMnKVxuXG52YXIgTk9STUFMID0gOTk5ICAgICAgICAgIC8vIDwtLSBuZXZlciBlbWl0dGVkXG4gICwgVE9LRU4gPSA5OTk5ICAgICAgICAgIC8vIDwtLSBuZXZlciBlbWl0dGVkXG4gICwgQkxPQ0tfQ09NTUVOVCA9IDBcbiAgLCBMSU5FX0NPTU1FTlQgPSAxXG4gICwgUFJFUFJPQ0VTU09SID0gMlxuICAsIE9QRVJBVE9SID0gM1xuICAsIElOVEVHRVIgPSA0XG4gICwgRkxPQVQgPSA1XG4gICwgSURFTlQgPSA2XG4gICwgQlVJTFRJTiA9IDdcbiAgLCBLRVlXT1JEID0gOFxuICAsIFdISVRFU1BBQ0UgPSA5XG4gICwgRU9GID0gMTBcbiAgLCBIRVggPSAxMVxuXG52YXIgbWFwID0gW1xuICAgICdibG9jay1jb21tZW50J1xuICAsICdsaW5lLWNvbW1lbnQnXG4gICwgJ3ByZXByb2Nlc3NvcidcbiAgLCAnb3BlcmF0b3InXG4gICwgJ2ludGVnZXInXG4gICwgJ2Zsb2F0J1xuICAsICdpZGVudCdcbiAgLCAnYnVpbHRpbidcbiAgLCAna2V5d29yZCdcbiAgLCAnd2hpdGVzcGFjZSdcbiAgLCAnZW9mJ1xuICAsICdpbnRlZ2VyJ1xuXVxuXG5mdW5jdGlvbiB0b2tlbml6ZShvcHQpIHtcbiAgdmFyIGkgPSAwXG4gICAgLCB0b3RhbCA9IDBcbiAgICAsIG1vZGUgPSBOT1JNQUxcbiAgICAsIGNcbiAgICAsIGxhc3RcbiAgICAsIGNvbnRlbnQgPSBbXVxuICAgICwgdG9rZW5zID0gW11cbiAgICAsIHRva2VuX2lkeCA9IDBcbiAgICAsIHRva2VuX29mZnMgPSAwXG4gICAgLCBsaW5lID0gMVxuICAgICwgY29sID0gMFxuICAgICwgc3RhcnQgPSAwXG4gICAgLCBpc251bSA9IGZhbHNlXG4gICAgLCBpc29wZXJhdG9yID0gZmFsc2VcbiAgICAsIGlucHV0ID0gJydcbiAgICAsIGxlblxuXG4gIG9wdCA9IG9wdCB8fCB7fVxuICB2YXIgYWxsQnVpbHRpbnMgPSBidWlsdGluczEwMFxuICB2YXIgYWxsTGl0ZXJhbHMgPSBsaXRlcmFsczEwMFxuICBpZiAob3B0LnZlcnNpb24gPT09ICczMDAgZXMnKSB7XG4gICAgYWxsQnVpbHRpbnMgPSBidWlsdGluczMwMGVzXG4gICAgYWxsTGl0ZXJhbHMgPSBsaXRlcmFsczMwMGVzXG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgIHRva2VucyA9IFtdXG4gICAgaWYgKGRhdGEgIT09IG51bGwpIHJldHVybiB3cml0ZShkYXRhLnJlcGxhY2UgPyBkYXRhLnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJykgOiBkYXRhKVxuICAgIHJldHVybiBlbmQoKVxuICB9XG5cbiAgZnVuY3Rpb24gdG9rZW4oZGF0YSkge1xuICAgIGlmIChkYXRhLmxlbmd0aCkge1xuICAgICAgdG9rZW5zLnB1c2goe1xuICAgICAgICB0eXBlOiBtYXBbbW9kZV1cbiAgICAgICwgZGF0YTogZGF0YVxuICAgICAgLCBwb3NpdGlvbjogc3RhcnRcbiAgICAgICwgbGluZTogbGluZVxuICAgICAgLCBjb2x1bW46IGNvbFxuICAgICAgfSlcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZShjaHVuaykge1xuICAgIGkgPSAwXG4gICAgaW5wdXQgKz0gY2h1bmtcbiAgICBsZW4gPSBpbnB1dC5sZW5ndGhcblxuICAgIHZhciBsYXN0XG5cbiAgICB3aGlsZShjID0gaW5wdXRbaV0sIGkgPCBsZW4pIHtcbiAgICAgIGxhc3QgPSBpXG5cbiAgICAgIHN3aXRjaChtb2RlKSB7XG4gICAgICAgIGNhc2UgQkxPQ0tfQ09NTUVOVDogaSA9IGJsb2NrX2NvbW1lbnQoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBMSU5FX0NPTU1FTlQ6IGkgPSBsaW5lX2NvbW1lbnQoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBQUkVQUk9DRVNTT1I6IGkgPSBwcmVwcm9jZXNzb3IoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBPUEVSQVRPUjogaSA9IG9wZXJhdG9yKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgSU5URUdFUjogaSA9IGludGVnZXIoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBIRVg6IGkgPSBoZXgoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBGTE9BVDogaSA9IGRlY2ltYWwoKTsgYnJlYWtcbiAgICAgICAgY2FzZSBUT0tFTjogaSA9IHJlYWR0b2tlbigpOyBicmVha1xuICAgICAgICBjYXNlIFdISVRFU1BBQ0U6IGkgPSB3aGl0ZXNwYWNlKCk7IGJyZWFrXG4gICAgICAgIGNhc2UgTk9STUFMOiBpID0gbm9ybWFsKCk7IGJyZWFrXG4gICAgICB9XG5cbiAgICAgIGlmKGxhc3QgIT09IGkpIHtcbiAgICAgICAgc3dpdGNoKGlucHV0W2xhc3RdKSB7XG4gICAgICAgICAgY2FzZSAnXFxuJzogY29sID0gMDsgKytsaW5lOyBicmVha1xuICAgICAgICAgIGRlZmF1bHQ6ICsrY29sOyBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdG90YWwgKz0gaVxuICAgIGlucHV0ID0gaW5wdXQuc2xpY2UoaSlcbiAgICByZXR1cm4gdG9rZW5zXG4gIH1cblxuICBmdW5jdGlvbiBlbmQoY2h1bmspIHtcbiAgICBpZihjb250ZW50Lmxlbmd0aCkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICB9XG5cbiAgICBtb2RlID0gRU9GXG4gICAgdG9rZW4oJyhlb2YpJylcbiAgICByZXR1cm4gdG9rZW5zXG4gIH1cblxuICBmdW5jdGlvbiBub3JtYWwoKSB7XG4gICAgY29udGVudCA9IGNvbnRlbnQubGVuZ3RoID8gW10gOiBjb250ZW50XG5cbiAgICBpZihsYXN0ID09PSAnLycgJiYgYyA9PT0gJyonKSB7XG4gICAgICBzdGFydCA9IHRvdGFsICsgaSAtIDFcbiAgICAgIG1vZGUgPSBCTE9DS19DT01NRU5UXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYobGFzdCA9PT0gJy8nICYmIGMgPT09ICcvJykge1xuICAgICAgc3RhcnQgPSB0b3RhbCArIGkgLSAxXG4gICAgICBtb2RlID0gTElORV9DT01NRU5UXG4gICAgICBsYXN0ID0gY1xuICAgICAgcmV0dXJuIGkgKyAxXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJyMnKSB7XG4gICAgICBtb2RlID0gUFJFUFJPQ0VTU09SXG4gICAgICBzdGFydCA9IHRvdGFsICsgaVxuICAgICAgcmV0dXJuIGlcbiAgICB9XG5cbiAgICBpZigvXFxzLy50ZXN0KGMpKSB7XG4gICAgICBtb2RlID0gV0hJVEVTUEFDRVxuICAgICAgc3RhcnQgPSB0b3RhbCArIGlcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaXNudW0gPSAvXFxkLy50ZXN0KGMpXG4gICAgaXNvcGVyYXRvciA9IC9bXlxcd19dLy50ZXN0KGMpXG5cbiAgICBzdGFydCA9IHRvdGFsICsgaVxuICAgIG1vZGUgPSBpc251bSA/IElOVEVHRVIgOiBpc29wZXJhdG9yID8gT1BFUkFUT1IgOiBUT0tFTlxuICAgIHJldHVybiBpXG4gIH1cblxuICBmdW5jdGlvbiB3aGl0ZXNwYWNlKCkge1xuICAgIGlmKC9bXlxcc10vZy50ZXN0KGMpKSB7XG4gICAgICB0b2tlbihjb250ZW50LmpvaW4oJycpKVxuICAgICAgbW9kZSA9IE5PUk1BTFxuICAgICAgcmV0dXJuIGlcbiAgICB9XG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIHByZXByb2Nlc3NvcigpIHtcbiAgICBpZigoYyA9PT0gJ1xccicgfHwgYyA9PT0gJ1xcbicpICYmIGxhc3QgIT09ICdcXFxcJykge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBsaW5lX2NvbW1lbnQoKSB7XG4gICAgcmV0dXJuIHByZXByb2Nlc3NvcigpXG4gIH1cblxuICBmdW5jdGlvbiBibG9ja19jb21tZW50KCkge1xuICAgIGlmKGMgPT09ICcvJyAmJiBsYXN0ID09PSAnKicpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBvcGVyYXRvcigpIHtcbiAgICBpZihsYXN0ID09PSAnLicgJiYgL1xcZC8udGVzdChjKSkge1xuICAgICAgbW9kZSA9IEZMT0FUXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnKicpIHtcbiAgICAgIG1vZGUgPSBCTE9DS19DT01NRU5UXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGlmKGxhc3QgPT09ICcvJyAmJiBjID09PSAnLycpIHtcbiAgICAgIG1vZGUgPSBMSU5FX0NPTU1FTlRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJy4nICYmIGNvbnRlbnQubGVuZ3RoKSB7XG4gICAgICB3aGlsZShkZXRlcm1pbmVfb3BlcmF0b3IoY29udGVudCkpO1xuXG4gICAgICBtb2RlID0gRkxPQVRcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgaWYoYyA9PT0gJzsnIHx8IGMgPT09ICcpJyB8fCBjID09PSAnKCcpIHtcbiAgICAgIGlmKGNvbnRlbnQubGVuZ3RoKSB3aGlsZShkZXRlcm1pbmVfb3BlcmF0b3IoY29udGVudCkpO1xuICAgICAgdG9rZW4oYylcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIHZhciBpc19jb21wb3NpdGVfb3BlcmF0b3IgPSBjb250ZW50Lmxlbmd0aCA9PT0gMiAmJiBjICE9PSAnPSdcbiAgICBpZigvW1xcd19cXGRcXHNdLy50ZXN0KGMpIHx8IGlzX2NvbXBvc2l0ZV9vcGVyYXRvcikge1xuICAgICAgd2hpbGUoZGV0ZXJtaW5lX29wZXJhdG9yKGNvbnRlbnQpKTtcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGRldGVybWluZV9vcGVyYXRvcihidWYpIHtcbiAgICB2YXIgaiA9IDBcbiAgICAgICwgaWR4XG4gICAgICAsIHJlc1xuXG4gICAgZG8ge1xuICAgICAgaWR4ID0gb3BlcmF0b3JzLmluZGV4T2YoYnVmLnNsaWNlKDAsIGJ1Zi5sZW5ndGggKyBqKS5qb2luKCcnKSlcbiAgICAgIHJlcyA9IG9wZXJhdG9yc1tpZHhdXG5cbiAgICAgIGlmKGlkeCA9PT0gLTEpIHtcbiAgICAgICAgaWYoai0tICsgYnVmLmxlbmd0aCA+IDApIGNvbnRpbnVlXG4gICAgICAgIHJlcyA9IGJ1Zi5zbGljZSgwLCAxKS5qb2luKCcnKVxuICAgICAgfVxuXG4gICAgICB0b2tlbihyZXMpXG5cbiAgICAgIHN0YXJ0ICs9IHJlcy5sZW5ndGhcbiAgICAgIGNvbnRlbnQgPSBjb250ZW50LnNsaWNlKHJlcy5sZW5ndGgpXG4gICAgICByZXR1cm4gY29udGVudC5sZW5ndGhcbiAgICB9IHdoaWxlKDEpXG4gIH1cblxuICBmdW5jdGlvbiBoZXgoKSB7XG4gICAgaWYoL1teYS1mQS1GMC05XS8udGVzdChjKSkge1xuICAgICAgdG9rZW4oY29udGVudC5qb2luKCcnKSlcbiAgICAgIG1vZGUgPSBOT1JNQUxcbiAgICAgIHJldHVybiBpXG4gICAgfVxuXG4gICAgY29udGVudC5wdXNoKGMpXG4gICAgbGFzdCA9IGNcbiAgICByZXR1cm4gaSArIDFcbiAgfVxuXG4gIGZ1bmN0aW9uIGludGVnZXIoKSB7XG4gICAgaWYoYyA9PT0gJy4nKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bZUVdLy50ZXN0KGMpKSB7XG4gICAgICBjb250ZW50LnB1c2goYylcbiAgICAgIG1vZGUgPSBGTE9BVFxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKGMgPT09ICd4JyAmJiBjb250ZW50Lmxlbmd0aCA9PT0gMSAmJiBjb250ZW50WzBdID09PSAnMCcpIHtcbiAgICAgIG1vZGUgPSBIRVhcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bXlxcZF0vLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiBkZWNpbWFsKCkge1xuICAgIGlmKGMgPT09ICdmJykge1xuICAgICAgY29udGVudC5wdXNoKGMpXG4gICAgICBsYXN0ID0gY1xuICAgICAgaSArPSAxXG4gICAgfVxuXG4gICAgaWYoL1tlRV0vLnRlc3QoYykpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmIChjID09PSAnLScgJiYgL1tlRV0vLnRlc3QobGFzdCkpIHtcbiAgICAgIGNvbnRlbnQucHVzaChjKVxuICAgICAgbGFzdCA9IGNcbiAgICAgIHJldHVybiBpICsgMVxuICAgIH1cblxuICAgIGlmKC9bXlxcZF0vLnRlc3QoYykpIHtcbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cblxuICAgIGNvbnRlbnQucHVzaChjKVxuICAgIGxhc3QgPSBjXG4gICAgcmV0dXJuIGkgKyAxXG4gIH1cblxuICBmdW5jdGlvbiByZWFkdG9rZW4oKSB7XG4gICAgaWYoL1teXFxkXFx3X10vLnRlc3QoYykpIHtcbiAgICAgIHZhciBjb250ZW50c3RyID0gY29udGVudC5qb2luKCcnKVxuICAgICAgaWYoYWxsTGl0ZXJhbHMuaW5kZXhPZihjb250ZW50c3RyKSA+IC0xKSB7XG4gICAgICAgIG1vZGUgPSBLRVlXT1JEXG4gICAgICB9IGVsc2UgaWYoYWxsQnVpbHRpbnMuaW5kZXhPZihjb250ZW50c3RyKSA+IC0xKSB7XG4gICAgICAgIG1vZGUgPSBCVUlMVElOXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2RlID0gSURFTlRcbiAgICAgIH1cbiAgICAgIHRva2VuKGNvbnRlbnQuam9pbignJykpXG4gICAgICBtb2RlID0gTk9STUFMXG4gICAgICByZXR1cm4gaVxuICAgIH1cbiAgICBjb250ZW50LnB1c2goYylcbiAgICBsYXN0ID0gY1xuICAgIHJldHVybiBpICsgMVxuICB9XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMjVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgJzw8PSdcbiAgLCAnPj49J1xuICAsICcrKydcbiAgLCAnLS0nXG4gICwgJzw8J1xuICAsICc+PidcbiAgLCAnPD0nXG4gICwgJz49J1xuICAsICc9PSdcbiAgLCAnIT0nXG4gICwgJyYmJ1xuICAsICd8fCdcbiAgLCAnKz0nXG4gICwgJy09J1xuICAsICcqPSdcbiAgLCAnLz0nXG4gICwgJyU9J1xuICAsICcmPSdcbiAgLCAnXl4nXG4gICwgJ149J1xuICAsICd8PSdcbiAgLCAnKCdcbiAgLCAnKSdcbiAgLCAnWydcbiAgLCAnXSdcbiAgLCAnLidcbiAgLCAnISdcbiAgLCAnfidcbiAgLCAnKidcbiAgLCAnLydcbiAgLCAnJSdcbiAgLCAnKydcbiAgLCAnLSdcbiAgLCAnPCdcbiAgLCAnPidcbiAgLCAnJidcbiAgLCAnXidcbiAgLCAnfCdcbiAgLCAnPydcbiAgLCAnOidcbiAgLCAnPSdcbiAgLCAnLCdcbiAgLCAnOydcbiAgLCAneydcbiAgLCAnfSdcbl1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsc2wtdG9rZW5pemVyL2xpYi9vcGVyYXRvcnMuanNcbi8vIG1vZHVsZSBpZCA9IDI2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB2MTAwID0gcmVxdWlyZSgnLi9saXRlcmFscycpXG5cbm1vZHVsZS5leHBvcnRzID0gdjEwMC5zbGljZSgpLmNvbmNhdChbXG4gICAnbGF5b3V0J1xuICAsICdjZW50cm9pZCdcbiAgLCAnc21vb3RoJ1xuICAsICdjYXNlJ1xuICAsICdtYXQyeDInXG4gICwgJ21hdDJ4MydcbiAgLCAnbWF0Mng0J1xuICAsICdtYXQzeDInXG4gICwgJ21hdDN4MydcbiAgLCAnbWF0M3g0J1xuICAsICdtYXQ0eDInXG4gICwgJ21hdDR4MydcbiAgLCAnbWF0NHg0J1xuICAsICd1aW50J1xuICAsICd1dmVjMidcbiAgLCAndXZlYzMnXG4gICwgJ3V2ZWM0J1xuICAsICdzYW1wbGVyQ3ViZVNoYWRvdydcbiAgLCAnc2FtcGxlcjJEQXJyYXknXG4gICwgJ3NhbXBsZXIyREFycmF5U2hhZG93J1xuICAsICdpc2FtcGxlcjJEJ1xuICAsICdpc2FtcGxlcjNEJ1xuICAsICdpc2FtcGxlckN1YmUnXG4gICwgJ2lzYW1wbGVyMkRBcnJheSdcbiAgLCAndXNhbXBsZXIyRCdcbiAgLCAndXNhbXBsZXIzRCdcbiAgLCAndXNhbXBsZXJDdWJlJ1xuICAsICd1c2FtcGxlcjJEQXJyYXknXG4gICwgJ2NvaGVyZW50J1xuICAsICdyZXN0cmljdCdcbiAgLCAncmVhZG9ubHknXG4gICwgJ3dyaXRlb25seSdcbiAgLCAncmVzb3VyY2UnXG4gICwgJ2F0b21pY191aW50J1xuICAsICdub3BlcnNwZWN0aXZlJ1xuICAsICdwYXRjaCdcbiAgLCAnc2FtcGxlJ1xuICAsICdzdWJyb3V0aW5lJ1xuICAsICdjb21tb24nXG4gICwgJ3BhcnRpdGlvbidcbiAgLCAnYWN0aXZlJ1xuICAsICdmaWx0ZXInXG4gICwgJ2ltYWdlMUQnXG4gICwgJ2ltYWdlMkQnXG4gICwgJ2ltYWdlM0QnXG4gICwgJ2ltYWdlQ3ViZSdcbiAgLCAnaWltYWdlMUQnXG4gICwgJ2lpbWFnZTJEJ1xuICAsICdpaW1hZ2UzRCdcbiAgLCAnaWltYWdlQ3ViZSdcbiAgLCAndWltYWdlMUQnXG4gICwgJ3VpbWFnZTJEJ1xuICAsICd1aW1hZ2UzRCdcbiAgLCAndWltYWdlQ3ViZSdcbiAgLCAnaW1hZ2UxREFycmF5J1xuICAsICdpbWFnZTJEQXJyYXknXG4gICwgJ2lpbWFnZTFEQXJyYXknXG4gICwgJ2lpbWFnZTJEQXJyYXknXG4gICwgJ3VpbWFnZTFEQXJyYXknXG4gICwgJ3VpbWFnZTJEQXJyYXknXG4gICwgJ2ltYWdlMURTaGFkb3cnXG4gICwgJ2ltYWdlMkRTaGFkb3cnXG4gICwgJ2ltYWdlMURBcnJheVNoYWRvdydcbiAgLCAnaW1hZ2UyREFycmF5U2hhZG93J1xuICAsICdpbWFnZUJ1ZmZlcidcbiAgLCAnaWltYWdlQnVmZmVyJ1xuICAsICd1aW1hZ2VCdWZmZXInXG4gICwgJ3NhbXBsZXIxREFycmF5J1xuICAsICdzYW1wbGVyMURBcnJheVNoYWRvdydcbiAgLCAnaXNhbXBsZXIxRCdcbiAgLCAnaXNhbXBsZXIxREFycmF5J1xuICAsICd1c2FtcGxlcjFEJ1xuICAsICd1c2FtcGxlcjFEQXJyYXknXG4gICwgJ2lzYW1wbGVyMkRSZWN0J1xuICAsICd1c2FtcGxlcjJEUmVjdCdcbiAgLCAnc2FtcGxlckJ1ZmZlcidcbiAgLCAnaXNhbXBsZXJCdWZmZXInXG4gICwgJ3VzYW1wbGVyQnVmZmVyJ1xuICAsICdzYW1wbGVyMkRNUydcbiAgLCAnaXNhbXBsZXIyRE1TJ1xuICAsICd1c2FtcGxlcjJETVMnXG4gICwgJ3NhbXBsZXIyRE1TQXJyYXknXG4gICwgJ2lzYW1wbGVyMkRNU0FycmF5J1xuICAsICd1c2FtcGxlcjJETVNBcnJheSdcbl0pXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbHNsLXRva2VuaXplci9saWIvbGl0ZXJhbHMtMzAwZXMuanNcbi8vIG1vZHVsZSBpZCA9IDI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8vIDMwMGVzIGJ1aWx0aW5zL3Jlc2VydmVkIHdvcmRzIHRoYXQgd2VyZSBwcmV2aW91c2x5IHZhbGlkIGluIHYxMDBcbnZhciB2MTAwID0gcmVxdWlyZSgnLi9idWlsdGlucycpXG5cbi8vIFRoZSB0ZXh0dXJlMkR8Q3ViZSBmdW5jdGlvbnMgaGF2ZSBiZWVuIHJlbW92ZWRcbi8vIEFuZCB0aGUgZ2xfIGZlYXR1cmVzIGFyZSB1cGRhdGVkXG52MTAwID0gdjEwMC5zbGljZSgpLmZpbHRlcihmdW5jdGlvbiAoYikge1xuICByZXR1cm4gIS9eKGdsXFxffHRleHR1cmUpLy50ZXN0KGIpXG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHYxMDAuY29uY2F0KFtcbiAgLy8gdGhlIHVwZGF0ZWQgZ2xfIGNvbnN0YW50c1xuICAgICdnbF9WZXJ0ZXhJRCdcbiAgLCAnZ2xfSW5zdGFuY2VJRCdcbiAgLCAnZ2xfUG9zaXRpb24nXG4gICwgJ2dsX1BvaW50U2l6ZSdcbiAgLCAnZ2xfRnJhZ0Nvb3JkJ1xuICAsICdnbF9Gcm9udEZhY2luZydcbiAgLCAnZ2xfRnJhZ0RlcHRoJ1xuICAsICdnbF9Qb2ludENvb3JkJ1xuICAsICdnbF9NYXhWZXJ0ZXhBdHRyaWJzJ1xuICAsICdnbF9NYXhWZXJ0ZXhVbmlmb3JtVmVjdG9ycydcbiAgLCAnZ2xfTWF4VmVydGV4T3V0cHV0VmVjdG9ycydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRJbnB1dFZlY3RvcnMnXG4gICwgJ2dsX01heFZlcnRleFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhDb21iaW5lZFRleHR1cmVJbWFnZVVuaXRzJ1xuICAsICdnbF9NYXhUZXh0dXJlSW1hZ2VVbml0cydcbiAgLCAnZ2xfTWF4RnJhZ21lbnRVbmlmb3JtVmVjdG9ycydcbiAgLCAnZ2xfTWF4RHJhd0J1ZmZlcnMnXG4gICwgJ2dsX01pblByb2dyYW1UZXhlbE9mZnNldCdcbiAgLCAnZ2xfTWF4UHJvZ3JhbVRleGVsT2Zmc2V0J1xuICAsICdnbF9EZXB0aFJhbmdlUGFyYW1ldGVycydcbiAgLCAnZ2xfRGVwdGhSYW5nZSdcblxuICAvLyBvdGhlciBidWlsdGluc1xuICAsICd0cnVuYydcbiAgLCAncm91bmQnXG4gICwgJ3JvdW5kRXZlbidcbiAgLCAnaXNuYW4nXG4gICwgJ2lzaW5mJ1xuICAsICdmbG9hdEJpdHNUb0ludCdcbiAgLCAnZmxvYXRCaXRzVG9VaW50J1xuICAsICdpbnRCaXRzVG9GbG9hdCdcbiAgLCAndWludEJpdHNUb0Zsb2F0J1xuICAsICdwYWNrU25vcm0yeDE2J1xuICAsICd1bnBhY2tTbm9ybTJ4MTYnXG4gICwgJ3BhY2tVbm9ybTJ4MTYnXG4gICwgJ3VucGFja1Vub3JtMngxNidcbiAgLCAncGFja0hhbGYyeDE2J1xuICAsICd1bnBhY2tIYWxmMngxNidcbiAgLCAnb3V0ZXJQcm9kdWN0J1xuICAsICd0cmFuc3Bvc2UnXG4gICwgJ2RldGVybWluYW50J1xuICAsICdpbnZlcnNlJ1xuICAsICd0ZXh0dXJlJ1xuICAsICd0ZXh0dXJlU2l6ZSdcbiAgLCAndGV4dHVyZVByb2onXG4gICwgJ3RleHR1cmVMb2QnXG4gICwgJ3RleHR1cmVPZmZzZXQnXG4gICwgJ3RleGVsRmV0Y2gnXG4gICwgJ3RleGVsRmV0Y2hPZmZzZXQnXG4gICwgJ3RleHR1cmVQcm9qT2Zmc2V0J1xuICAsICd0ZXh0dXJlTG9kT2Zmc2V0J1xuICAsICd0ZXh0dXJlUHJvakxvZCdcbiAgLCAndGV4dHVyZVByb2pMb2RPZmZzZXQnXG4gICwgJ3RleHR1cmVHcmFkJ1xuICAsICd0ZXh0dXJlR3JhZE9mZnNldCdcbiAgLCAndGV4dHVyZVByb2pHcmFkJ1xuICAsICd0ZXh0dXJlUHJvakdyYWRPZmZzZXQnXG5dKVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2xzbC10b2tlbml6ZXIvbGliL2J1aWx0aW5zLTMwMGVzLmpzXG4vLyBtb2R1bGUgaWQgPSAyOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIF9hdG9iKHN0cikge1xuICByZXR1cm4gYXRvYihzdHIpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hdG9iLWxpdGUvYXRvYi1icm93c2VyLmpzXG4vLyBtb2R1bGUgaWQgPSAyOVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcGFkTGVmdCA9IHJlcXVpcmUoJ3BhZC1sZWZ0JylcblxubW9kdWxlLmV4cG9ydHMgPSBhZGRMaW5lTnVtYmVyc1xuZnVuY3Rpb24gYWRkTGluZU51bWJlcnMgKHN0cmluZywgc3RhcnQsIGRlbGltKSB7XG4gIHN0YXJ0ID0gdHlwZW9mIHN0YXJ0ID09PSAnbnVtYmVyJyA/IHN0YXJ0IDogMVxuICBkZWxpbSA9IGRlbGltIHx8ICc6ICdcblxuICB2YXIgbGluZXMgPSBzdHJpbmcuc3BsaXQoL1xccj9cXG4vKVxuICB2YXIgdG90YWxEaWdpdHMgPSBTdHJpbmcobGluZXMubGVuZ3RoICsgc3RhcnQgLSAxKS5sZW5ndGhcbiAgcmV0dXJuIGxpbmVzLm1hcChmdW5jdGlvbiAobGluZSwgaSkge1xuICAgIHZhciBjID0gaSArIHN0YXJ0XG4gICAgdmFyIGRpZ2l0cyA9IFN0cmluZyhjKS5sZW5ndGhcbiAgICB2YXIgcHJlZml4ID0gcGFkTGVmdChjLCB0b3RhbERpZ2l0cyAtIGRpZ2l0cylcbiAgICByZXR1cm4gcHJlZml4ICsgZGVsaW0gKyBsaW5lXG4gIH0pLmpvaW4oJ1xcbicpXG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9hZGQtbGluZS1udW1iZXJzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzMFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKiFcbiAqIHBhZC1sZWZ0IDxodHRwczovL2dpdGh1Yi5jb20vam9uc2NobGlua2VydC9wYWQtbGVmdD5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcmVwZWF0ID0gcmVxdWlyZSgncmVwZWF0LXN0cmluZycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBhZExlZnQoc3RyLCBudW0sIGNoKSB7XG4gIGNoID0gdHlwZW9mIGNoICE9PSAndW5kZWZpbmVkJyA/IChjaCArICcnKSA6ICcgJztcbiAgcmV0dXJuIHJlcGVhdChjaCwgbnVtKSArIHN0cjtcbn07XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcGFkLWxlZnQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDMxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogcmVwZWF0LXN0cmluZyA8aHR0cHM6Ly9naXRodWIuY29tL2pvbnNjaGxpbmtlcnQvcmVwZWF0LXN0cmluZz5cbiAqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQtMjAxNSwgSm9uIFNjaGxpbmtlcnQuXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2UuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlc3VsdHMgY2FjaGVcbiAqL1xuXG52YXIgcmVzID0gJyc7XG52YXIgY2FjaGU7XG5cbi8qKlxuICogRXhwb3NlIGByZXBlYXRgXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSByZXBlYXQ7XG5cbi8qKlxuICogUmVwZWF0IHRoZSBnaXZlbiBgc3RyaW5nYCB0aGUgc3BlY2lmaWVkIGBudW1iZXJgXG4gKiBvZiB0aW1lcy5cbiAqXG4gKiAqKkV4YW1wbGU6KipcbiAqXG4gKiBgYGBqc1xuICogdmFyIHJlcGVhdCA9IHJlcXVpcmUoJ3JlcGVhdC1zdHJpbmcnKTtcbiAqIHJlcGVhdCgnQScsIDUpO1xuICogLy89PiBBQUFBQVxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGBzdHJpbmdgIFRoZSBzdHJpbmcgdG8gcmVwZWF0XG4gKiBAcGFyYW0ge051bWJlcn0gYG51bWJlcmAgVGhlIG51bWJlciBvZiB0aW1lcyB0byByZXBlYXQgdGhlIHN0cmluZ1xuICogQHJldHVybiB7U3RyaW5nfSBSZXBlYXRlZCBzdHJpbmdcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZnVuY3Rpb24gcmVwZWF0KHN0ciwgbnVtKSB7XG4gIGlmICh0eXBlb2Ygc3RyICE9PSAnc3RyaW5nJykge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2V4cGVjdGVkIGEgc3RyaW5nJyk7XG4gIH1cblxuICAvLyBjb3ZlciBjb21tb24sIHF1aWNrIHVzZSBjYXNlc1xuICBpZiAobnVtID09PSAxKSByZXR1cm4gc3RyO1xuICBpZiAobnVtID09PSAyKSByZXR1cm4gc3RyICsgc3RyO1xuXG4gIHZhciBtYXggPSBzdHIubGVuZ3RoICogbnVtO1xuICBpZiAoY2FjaGUgIT09IHN0ciB8fCB0eXBlb2YgY2FjaGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY2FjaGUgPSBzdHI7XG4gICAgcmVzID0gJyc7XG4gIH0gZWxzZSBpZiAocmVzLmxlbmd0aCA+PSBtYXgpIHtcbiAgICByZXR1cm4gcmVzLnN1YnN0cigwLCBtYXgpO1xuICB9XG5cbiAgd2hpbGUgKG1heCA+IHJlcy5sZW5ndGggJiYgbnVtID4gMSkge1xuICAgIGlmIChudW0gJiAxKSB7XG4gICAgICByZXMgKz0gc3RyO1xuICAgIH1cblxuICAgIG51bSA+Pj0gMTtcbiAgICBzdHIgKz0gc3RyO1xuICB9XG5cbiAgcmVzICs9IHN0cjtcbiAgcmVzID0gcmVzLnN1YnN0cigwLCBtYXgpO1xuICByZXR1cm4gcmVzO1xufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmVwZWF0LXN0cmluZy9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gMzJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLy8gT3JpZ2luYWwgLSBAR296b2xhLlxuLy8gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vR296YWxhLzEyNjk5OTFcbi8vIFRoaXMgaXMgYSByZWltcGxlbWVudGVkIHZlcnNpb24gKHdpdGggYSBmZXcgYnVnIGZpeGVzKS5cblxudmFyIGNyZWF0ZVN0b3JlID0gcmVxdWlyZSgnLi9jcmVhdGUtc3RvcmUuanMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSB3ZWFrTWFwO1xuXG5mdW5jdGlvbiB3ZWFrTWFwKCkge1xuICAgIHZhciBwcml2YXRlcyA9IGNyZWF0ZVN0b3JlKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICAnZ2V0JzogZnVuY3Rpb24gKGtleSwgZmFsbGJhY2spIHtcbiAgICAgICAgICAgIHZhciBzdG9yZSA9IHByaXZhdGVzKGtleSlcbiAgICAgICAgICAgIHJldHVybiBzdG9yZS5oYXNPd25Qcm9wZXJ0eSgndmFsdWUnKSA/XG4gICAgICAgICAgICAgICAgc3RvcmUudmFsdWUgOiBmYWxsYmFja1xuICAgICAgICB9LFxuICAgICAgICAnc2V0JzogZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHByaXZhdGVzKGtleSkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9LFxuICAgICAgICAnaGFzJzogZnVuY3Rpb24oa2V5KSB7XG4gICAgICAgICAgICByZXR1cm4gJ3ZhbHVlJyBpbiBwcml2YXRlcyhrZXkpO1xuICAgICAgICB9LFxuICAgICAgICAnZGVsZXRlJzogZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlbGV0ZSBwcml2YXRlcyhrZXkpLnZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvd2Vha21hcC1zaGltL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzM1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgaGlkZGVuU3RvcmUgPSByZXF1aXJlKCcuL2hpZGRlbi1zdG9yZS5qcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVN0b3JlO1xuXG5mdW5jdGlvbiBjcmVhdGVTdG9yZSgpIHtcbiAgICB2YXIga2V5ID0ge307XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICBpZiAoKHR5cGVvZiBvYmogIT09ICdvYmplY3QnIHx8IG9iaiA9PT0gbnVsbCkgJiZcbiAgICAgICAgICAgIHR5cGVvZiBvYmogIT09ICdmdW5jdGlvbidcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYWttYXAtc2hpbTogS2V5IG11c3QgYmUgb2JqZWN0JylcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBzdG9yZSA9IG9iai52YWx1ZU9mKGtleSk7XG4gICAgICAgIHJldHVybiBzdG9yZSAmJiBzdG9yZS5pZGVudGl0eSA9PT0ga2V5ID9cbiAgICAgICAgICAgIHN0b3JlIDogaGlkZGVuU3RvcmUob2JqLCBrZXkpO1xuICAgIH07XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vY3JlYXRlLXN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IGhpZGRlblN0b3JlO1xuXG5mdW5jdGlvbiBoaWRkZW5TdG9yZShvYmosIGtleSkge1xuICAgIHZhciBzdG9yZSA9IHsgaWRlbnRpdHk6IGtleSB9O1xuICAgIHZhciB2YWx1ZU9mID0gb2JqLnZhbHVlT2Y7XG5cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBcInZhbHVlT2ZcIiwge1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsdWUgIT09IGtleSA/XG4gICAgICAgICAgICAgICAgdmFsdWVPZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogc3RvcmU7XG4gICAgICAgIH0sXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgfSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG59XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrbWFwLXNoaW0vaGlkZGVuLXN0b3JlLmpzXG4vLyBtb2R1bGUgaWQgPSAzNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy51bmlmb3JtcyAgICA9IHJ1bnRpbWVVbmlmb3Jtc1xuZXhwb3J0cy5hdHRyaWJ1dGVzICA9IHJ1bnRpbWVBdHRyaWJ1dGVzXG5cbnZhciBHTF9UT19HTFNMX1RZUEVTID0ge1xuICAnRkxPQVQnOiAgICAgICAnZmxvYXQnLFxuICAnRkxPQVRfVkVDMic6ICAndmVjMicsXG4gICdGTE9BVF9WRUMzJzogICd2ZWMzJyxcbiAgJ0ZMT0FUX1ZFQzQnOiAgJ3ZlYzQnLFxuICAnSU5UJzogICAgICAgICAnaW50JyxcbiAgJ0lOVF9WRUMyJzogICAgJ2l2ZWMyJyxcbiAgJ0lOVF9WRUMzJzogICAgJ2l2ZWMzJyxcbiAgJ0lOVF9WRUM0JzogICAgJ2l2ZWM0JyxcbiAgJ0JPT0wnOiAgICAgICAgJ2Jvb2wnLFxuICAnQk9PTF9WRUMyJzogICAnYnZlYzInLFxuICAnQk9PTF9WRUMzJzogICAnYnZlYzMnLFxuICAnQk9PTF9WRUM0JzogICAnYnZlYzQnLFxuICAnRkxPQVRfTUFUMic6ICAnbWF0MicsXG4gICdGTE9BVF9NQVQzJzogICdtYXQzJyxcbiAgJ0ZMT0FUX01BVDQnOiAgJ21hdDQnLFxuICAnU0FNUExFUl8yRCc6ICAnc2FtcGxlcjJEJyxcbiAgJ1NBTVBMRVJfQ1VCRSc6J3NhbXBsZXJDdWJlJ1xufVxuXG52YXIgR0xfVEFCTEUgPSBudWxsXG5cbmZ1bmN0aW9uIGdldFR5cGUoZ2wsIHR5cGUpIHtcbiAgaWYoIUdMX1RBQkxFKSB7XG4gICAgdmFyIHR5cGVOYW1lcyA9IE9iamVjdC5rZXlzKEdMX1RPX0dMU0xfVFlQRVMpXG4gICAgR0xfVEFCTEUgPSB7fVxuICAgIGZvcih2YXIgaT0wOyBpPHR5cGVOYW1lcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHRuID0gdHlwZU5hbWVzW2ldXG4gICAgICBHTF9UQUJMRVtnbFt0bl1dID0gR0xfVE9fR0xTTF9UWVBFU1t0bl1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIEdMX1RBQkxFW3R5cGVdXG59XG5cbmZ1bmN0aW9uIHJ1bnRpbWVVbmlmb3JtcyhnbCwgcHJvZ3JhbSkge1xuICB2YXIgbnVtVW5pZm9ybXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9VTklGT1JNUylcbiAgdmFyIHJlc3VsdCA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPG51bVVuaWZvcm1zOyArK2kpIHtcbiAgICB2YXIgaW5mbyA9IGdsLmdldEFjdGl2ZVVuaWZvcm0ocHJvZ3JhbSwgaSlcbiAgICBpZihpbmZvKSB7XG4gICAgICB2YXIgdHlwZSA9IGdldFR5cGUoZ2wsIGluZm8udHlwZSlcbiAgICAgIGlmKGluZm8uc2l6ZSA+IDEpIHtcbiAgICAgICAgZm9yKHZhciBqPTA7IGo8aW5mby5zaXplOyArK2opIHtcbiAgICAgICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgICAgICBuYW1lOiBpbmZvLm5hbWUucmVwbGFjZSgnWzBdJywgJ1snICsgaiArICddJyksXG4gICAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgICB0eXBlOiB0eXBlXG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gcnVudGltZUF0dHJpYnV0ZXMoZ2wsIHByb2dyYW0pIHtcbiAgdmFyIG51bUF0dHJpYnV0ZXMgPSBnbC5nZXRQcm9ncmFtUGFyYW1ldGVyKHByb2dyYW0sIGdsLkFDVElWRV9BVFRSSUJVVEVTKVxuICB2YXIgcmVzdWx0ID0gW11cbiAgZm9yKHZhciBpPTA7IGk8bnVtQXR0cmlidXRlczsgKytpKSB7XG4gICAgdmFyIGluZm8gPSBnbC5nZXRBY3RpdmVBdHRyaWIocHJvZ3JhbSwgaSlcbiAgICBpZihpbmZvKSB7XG4gICAgICByZXN1bHQucHVzaCh7XG4gICAgICAgIG5hbWU6IGluZm8ubmFtZSxcbiAgICAgICAgdHlwZTogZ2V0VHlwZShnbCwgaW5mby50eXBlKVxuICAgICAgfSlcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtc2hhZGVyL2xpYi9ydW50aW1lLXJlZmxlY3QuanNcbi8vIG1vZHVsZSBpZCA9IDM2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBzdGF0ZVJlc2V0ID0gcmVxdWlyZSgnLi9zdGF0ZScpXG5cbm1vZHVsZS5leHBvcnRzID0gUmVzZXRcbm1vZHVsZS5leHBvcnRzLnN0YXRlID0gc3RhdGVSZXNldFxuXG5mdW5jdGlvbiBSZXNldChnbCkge1xuICB2YXIgY2xlYW51cCA9IFtcbiAgICAnQnVmZmVyJ1xuICAsICdGcmFtZWJ1ZmZlcidcbiAgLCAnUmVuZGVyYnVmZmVyJ1xuICAsICdQcm9ncmFtJ1xuICAsICdTaGFkZXInXG4gICwgJ1RleHR1cmUnXG4gIF0ubWFwKGZ1bmN0aW9uKHN1ZmZpeCkge1xuICAgIHZhciByZW1vdmUgICA9ICdkZWxldGUnICsgc3VmZml4XG4gICAgdmFyIGNyZWF0ZSAgID0gJ2NyZWF0ZScgKyBzdWZmaXhcbiAgICB2YXIgb3JpZ2luYWwgPSBnbFtjcmVhdGVdXG4gICAgdmFyIGhhbmRsZXMgID0gW11cblxuICAgIGdsW2NyZWF0ZV0gPSBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBoYW5kbGUgPSBvcmlnaW5hbC5hcHBseSh0aGlzLCBhcmd1bWVudHMpXG4gICAgICBoYW5kbGVzLnB1c2goaGFuZGxlKVxuICAgICAgcmV0dXJuIGhhbmRsZVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHJlbW92ZTogcmVtb3ZlXG4gICAgICAsIGhhbmRsZXM6IGhhbmRsZXNcbiAgICB9XG4gIH0pXG5cbiAgcmV0dXJuIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgIGNsZWFudXAuZm9yRWFjaChmdW5jdGlvbihraW5kKSB7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtpbmQuaGFuZGxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBnbFtraW5kLnJlbW92ZV0uY2FsbChnbCwga2luZC5oYW5kbGVzW2ldKVxuICAgICAgfVxuICAgIH0pXG5cbiAgICBzdGF0ZVJlc2V0KGdsKVxuXG4gICAgcmV0dXJuIGdsXG4gIH1cbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSAzN1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvL1xuLy8gVGhlIGNvZGUgdGhhdCBmb2xsb3dzIHdhcyBvcmlnaW5hbGx5IHNvdXJjZWQgZnJvbTpcbi8vIGh0dHBzOi8vd3d3Lmtocm9ub3Mub3JnL3JlZ2lzdHJ5L3dlYmdsL3Nkay9kZWJ1Zy93ZWJnbC1kZWJ1Zy5qc1xuLy9cblxubW9kdWxlLmV4cG9ydHMgPSBzdGF0ZVJlc2V0XG5cbi8qXG4qKiBDb3B5cmlnaHQgKGMpIDIwMTIgVGhlIEtocm9ub3MgR3JvdXAgSW5jLlxuKipcbioqIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4qKiBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kL29yIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4qKiBcIk1hdGVyaWFsc1wiKSwgdG8gZGVhbCBpbiB0aGUgTWF0ZXJpYWxzIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuKiogd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuKiogZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBNYXRlcmlhbHMsIGFuZCB0b1xuKiogcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgTWF0ZXJpYWxzIGFyZSBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG9cbioqIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcbioqXG4qKiBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuKiogaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgTWF0ZXJpYWxzLlxuKipcbioqIFRIRSBNQVRFUklBTFMgQVJFIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCxcbioqIEVYUFJFU1MgT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuKiogTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULlxuKiogSU4gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTllcbioqIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsXG4qKiBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRVxuKiogTUFURVJJQUxTIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIE1BVEVSSUFMUy5cbiovXG5mdW5jdGlvbiBzdGF0ZVJlc2V0KGdsKSB7XG4gIHZhciBudW1BdHRyaWJzID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLk1BWF9WRVJURVhfQVRUUklCUylcbiAgdmFyIHRtcCA9IGdsLmNyZWF0ZUJ1ZmZlcigpXG4gIGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB0bXApXG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBudW1BdHRyaWJzOyArK2lpKSB7XG4gICAgZ2wuZGlzYWJsZVZlcnRleEF0dHJpYkFycmF5KGlpKVxuICAgIGdsLnZlcnRleEF0dHJpYlBvaW50ZXIoaWksIDQsIGdsLkZMT0FULCBmYWxzZSwgMCwgMClcbiAgICBnbC52ZXJ0ZXhBdHRyaWIxZihpaSwgMClcbiAgfVxuICBnbC5kZWxldGVCdWZmZXIodG1wKVxuXG4gIHZhciBudW1UZXh0dXJlVW5pdHMgPSBnbC5nZXRQYXJhbWV0ZXIoZ2wuTUFYX1RFWFRVUkVfSU1BR0VfVU5JVFMpXG4gIGZvciAodmFyIGlpID0gMDsgaWkgPCBudW1UZXh0dXJlVW5pdHM7ICsraWkpIHtcbiAgICBnbC5hY3RpdmVUZXh0dXJlKGdsLlRFWFRVUkUwICsgaWkpXG4gICAgZ2wuYmluZFRleHR1cmUoZ2wuVEVYVFVSRV9DVUJFX01BUCwgbnVsbClcbiAgICBnbC5iaW5kVGV4dHVyZShnbC5URVhUVVJFXzJELCBudWxsKVxuICB9XG5cbiAgZ2wuYWN0aXZlVGV4dHVyZShnbC5URVhUVVJFMClcbiAgZ2wudXNlUHJvZ3JhbShudWxsKVxuICBnbC5iaW5kQnVmZmVyKGdsLkFSUkFZX0JVRkZFUiwgbnVsbClcbiAgZ2wuYmluZEJ1ZmZlcihnbC5FTEVNRU5UX0FSUkFZX0JVRkZFUiwgbnVsbClcbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuICBnbC5iaW5kUmVuZGVyYnVmZmVyKGdsLlJFTkRFUkJVRkZFUiwgbnVsbClcbiAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgZ2wuZGlzYWJsZShnbC5DVUxMX0ZBQ0UpXG4gIGdsLmRpc2FibGUoZ2wuREVQVEhfVEVTVClcbiAgZ2wuZGlzYWJsZShnbC5ESVRIRVIpXG4gIGdsLmRpc2FibGUoZ2wuU0NJU1NPUl9URVNUKVxuICBnbC5ibGVuZENvbG9yKDAsIDAsIDAsIDApXG4gIGdsLmJsZW5kRXF1YXRpb24oZ2wuRlVOQ19BREQpXG4gIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLlpFUk8pXG4gIGdsLmNsZWFyQ29sb3IoMCwgMCwgMCwgMClcbiAgZ2wuY2xlYXJEZXB0aCgxKVxuICBnbC5jbGVhclN0ZW5jaWwoLTEpXG4gIGdsLmNvbG9yTWFzayh0cnVlLCB0cnVlLCB0cnVlLCB0cnVlKVxuICBnbC5jdWxsRmFjZShnbC5CQUNLKVxuICBnbC5kZXB0aEZ1bmMoZ2wuTEVTUylcbiAgZ2wuZGVwdGhNYXNrKHRydWUpXG4gIGdsLmRlcHRoUmFuZ2UoMCwgMSlcbiAgZ2wuZnJvbnRGYWNlKGdsLkNDVylcbiAgZ2wuaGludChnbC5HRU5FUkFURV9NSVBNQVBfSElOVCwgZ2wuRE9OVF9DQVJFKVxuICBnbC5saW5lV2lkdGgoMSlcbiAgZ2wucGl4ZWxTdG9yZWkoZ2wuUEFDS19BTElHTk1FTlQsIDQpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19BTElHTk1FTlQsIDQpXG4gIGdsLnBpeGVsU3RvcmVpKGdsLlVOUEFDS19GTElQX1lfV0VCR0wsIGZhbHNlKVxuICBnbC5waXhlbFN0b3JlaShnbC5VTlBBQ0tfUFJFTVVMVElQTFlfQUxQSEFfV0VCR0wsIGZhbHNlKVxuICBnbC5wb2x5Z29uT2Zmc2V0KDAsIDApXG4gIGdsLnNhbXBsZUNvdmVyYWdlKDEsIGZhbHNlKVxuICBnbC5zY2lzc29yKDAsIDAsIGdsLmNhbnZhcy53aWR0aCwgZ2wuY2FudmFzLmhlaWdodClcbiAgZ2wuc3RlbmNpbEZ1bmMoZ2wuQUxXQVlTLCAwLCAweEZGRkZGRkZGKVxuICBnbC5zdGVuY2lsTWFzaygweEZGRkZGRkZGKVxuICBnbC5zdGVuY2lsT3AoZ2wuS0VFUCwgZ2wuS0VFUCwgZ2wuS0VFUClcbiAgZ2wudmlld3BvcnQoMCwgMCwgZ2wuY2FudmFzLndpZHRoLCBnbC5jYW52YXMuaGVpZ2h0KVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCB8IGdsLlNURU5DSUxfQlVGRkVSX0JJVClcblxuICByZXR1cm4gZ2xcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXJlc2V0L3N0YXRlLmpzXG4vLyBtb2R1bGUgaWQgPSAzOFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9XG4gIGdsb2JhbC5wZXJmb3JtYW5jZSAmJlxuICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID8gZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiBwZXJmb3JtYW5jZS5ub3coKVxuICB9IDogRGF0ZS5ub3cgfHwgZnVuY3Rpb24gbm93KCkge1xuICAgIHJldHVybiArbmV3IERhdGVcbiAgfVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvcmlnaHQtbm93L2Jyb3dzZXIuanNcbi8vIG1vZHVsZSBpZCA9IDM5XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIid1c2Ugc3RyaWN0J1xuXG52YXIgd2Vha01hcCAgICAgID0gdHlwZW9mIFdlYWtNYXAgPT09ICd1bmRlZmluZWQnID8gcmVxdWlyZSgnd2Vhay1tYXAnKSA6IFdlYWtNYXBcbnZhciBjcmVhdGVCdWZmZXIgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVZBTyAgICA9IHJlcXVpcmUoJ2dsLXZhbycpXG5cbnZhciBUcmlhbmdsZUNhY2hlID0gbmV3IHdlYWtNYXAoKVxuXG5mdW5jdGlvbiBjcmVhdGVBQmlnVHJpYW5nbGUoZ2wpIHtcblxuICB2YXIgdHJpYW5nbGVWQU8gPSBUcmlhbmdsZUNhY2hlLmdldChnbClcbiAgdmFyIGhhbmRsZSA9IHRyaWFuZ2xlVkFPICYmICh0cmlhbmdsZVZBTy5fdHJpYW5nbGVCdWZmZXIuaGFuZGxlIHx8IHRyaWFuZ2xlVkFPLl90cmlhbmdsZUJ1ZmZlci5idWZmZXIpXG4gIGlmKCFoYW5kbGUgfHwgIWdsLmlzQnVmZmVyKGhhbmRsZSkpIHtcbiAgICB2YXIgYnVmID0gY3JlYXRlQnVmZmVyKGdsLCBuZXcgRmxvYXQzMkFycmF5KFstMSwgLTEsIC0xLCA0LCA0LCAtMV0pKVxuICAgIHRyaWFuZ2xlVkFPID0gY3JlYXRlVkFPKGdsLCBbXG4gICAgICB7IGJ1ZmZlcjogYnVmLFxuICAgICAgICB0eXBlOiBnbC5GTE9BVCxcbiAgICAgICAgc2l6ZTogMlxuICAgICAgfVxuICAgIF0pXG4gICAgdHJpYW5nbGVWQU8uX3RyaWFuZ2xlQnVmZmVyID0gYnVmXG4gICAgVHJpYW5nbGVDYWNoZS5zZXQoZ2wsIHRyaWFuZ2xlVkFPKVxuICB9XG4gIHRyaWFuZ2xlVkFPLmJpbmQoKVxuICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgMCwgMylcbiAgdHJpYW5nbGVWQU8udW5iaW5kKClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBQmlnVHJpYW5nbGVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2EtYmlnLXRyaWFuZ2xlL3RyaWFuZ2xlLmpzXG4vLyBtb2R1bGUgaWQgPSA0MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvLyBDb3B5cmlnaHQgKEMpIDIwMTEgR29vZ2xlIEluYy5cbi8vXG4vLyBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xuLy8geW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuLy8gWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4vL1xuLy8gaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4vL1xuLy8gVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxuLy8gZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxuLy8gV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXG4vLyBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXG4vLyBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IEluc3RhbGwgYSBsZWFreSBXZWFrTWFwIGVtdWxhdGlvbiBvbiBwbGF0Zm9ybXMgdGhhdFxuICogZG9uJ3QgcHJvdmlkZSBhIGJ1aWx0LWluIG9uZS5cbiAqXG4gKiA8cD5Bc3N1bWVzIHRoYXQgYW4gRVM1IHBsYXRmb3JtIHdoZXJlLCBpZiB7QGNvZGUgV2Vha01hcH0gaXNcbiAqIGFscmVhZHkgcHJlc2VudCwgdGhlbiBpdCBjb25mb3JtcyB0byB0aGUgYW50aWNpcGF0ZWQgRVM2XG4gKiBzcGVjaWZpY2F0aW9uLiBUbyBydW4gdGhpcyBmaWxlIG9uIGFuIEVTNSBvciBhbG1vc3QgRVM1XG4gKiBpbXBsZW1lbnRhdGlvbiB3aGVyZSB0aGUge0Bjb2RlIFdlYWtNYXB9IHNwZWNpZmljYXRpb24gZG9lcyBub3RcbiAqIHF1aXRlIGNvbmZvcm0sIHJ1biA8Y29kZT5yZXBhaXJFUzUuanM8L2NvZGU+IGZpcnN0LlxuICpcbiAqIDxwPkV2ZW4gdGhvdWdoIFdlYWtNYXBNb2R1bGUgaXMgbm90IGdsb2JhbCwgdGhlIGxpbnRlciB0aGlua3MgaXRcbiAqIGlzLCB3aGljaCBpcyB3aHkgaXQgaXMgaW4gdGhlIG92ZXJyaWRlcyBsaXN0IGJlbG93LlxuICpcbiAqIDxwPk5PVEU6IEJlZm9yZSB1c2luZyB0aGlzIFdlYWtNYXAgZW11bGF0aW9uIGluIGEgbm9uLVNFU1xuICogZW52aXJvbm1lbnQsIHNlZSB0aGUgbm90ZSBiZWxvdyBhYm91dCBoaWRkZW5SZWNvcmQuXG4gKlxuICogQGF1dGhvciBNYXJrIFMuIE1pbGxlclxuICogQHJlcXVpcmVzIGNyeXB0bywgQXJyYXlCdWZmZXIsIFVpbnQ4QXJyYXksIG5hdmlnYXRvciwgY29uc29sZVxuICogQG92ZXJyaWRlcyBXZWFrTWFwLCBzZXMsIFByb3h5XG4gKiBAb3ZlcnJpZGVzIFdlYWtNYXBNb2R1bGVcbiAqL1xuXG4vKipcbiAqIFRoaXMge0Bjb2RlIFdlYWtNYXB9IGVtdWxhdGlvbiBpcyBvYnNlcnZhYmx5IGVxdWl2YWxlbnQgdG8gdGhlXG4gKiBFUy1IYXJtb255IFdlYWtNYXAsIGJ1dCB3aXRoIGxlYWtpZXIgZ2FyYmFnZSBjb2xsZWN0aW9uIHByb3BlcnRpZXMuXG4gKlxuICogPHA+QXMgd2l0aCB0cnVlIFdlYWtNYXBzLCBpbiB0aGlzIGVtdWxhdGlvbiwgYSBrZXkgZG9lcyBub3RcbiAqIHJldGFpbiBtYXBzIGluZGV4ZWQgYnkgdGhhdCBrZXkgYW5kIChjcnVjaWFsbHkpIGEgbWFwIGRvZXMgbm90XG4gKiByZXRhaW4gdGhlIGtleXMgaXQgaW5kZXhlcy4gQSBtYXAgYnkgaXRzZWxmIGFsc28gZG9lcyBub3QgcmV0YWluXG4gKiB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCB0aGF0IG1hcC5cbiAqXG4gKiA8cD5Ib3dldmVyLCB0aGUgdmFsdWVzIGFzc29jaWF0ZWQgd2l0aCBhIGtleSBpbiBzb21lIG1hcCBhcmVcbiAqIHJldGFpbmVkIHNvIGxvbmcgYXMgdGhhdCBrZXkgaXMgcmV0YWluZWQgYW5kIHRob3NlIGFzc29jaWF0aW9ucyBhcmVcbiAqIG5vdCBvdmVycmlkZGVuLiBGb3IgZXhhbXBsZSwgd2hlbiB1c2VkIHRvIHN1cHBvcnQgbWVtYnJhbmVzLCBhbGxcbiAqIHZhbHVlcyBleHBvcnRlZCBmcm9tIGEgZ2l2ZW4gbWVtYnJhbmUgd2lsbCBsaXZlIGZvciB0aGUgbGlmZXRpbWVcbiAqIHRoZXkgd291bGQgaGF2ZSBoYWQgaW4gdGhlIGFic2VuY2Ugb2YgYW4gaW50ZXJwb3NlZCBtZW1icmFuZS4gRXZlblxuICogd2hlbiB0aGUgbWVtYnJhbmUgaXMgcmV2b2tlZCwgYWxsIG9iamVjdHMgdGhhdCB3b3VsZCBoYXZlIGJlZW5cbiAqIHJlYWNoYWJsZSBpbiB0aGUgYWJzZW5jZSBvZiByZXZvY2F0aW9uIHdpbGwgc3RpbGwgYmUgcmVhY2hhYmxlLCBhc1xuICogZmFyIGFzIHRoZSBHQyBjYW4gdGVsbCwgZXZlbiB0aG91Z2ggdGhleSB3aWxsIG5vIGxvbmdlciBiZSByZWxldmFudFxuICogdG8gb25nb2luZyBjb21wdXRhdGlvbi5cbiAqXG4gKiA8cD5UaGUgQVBJIGltcGxlbWVudGVkIGhlcmUgaXMgYXBwcm94aW1hdGVseSB0aGUgQVBJIGFzIGltcGxlbWVudGVkXG4gKiBpbiBGRjYuMGExIGFuZCBhZ3JlZWQgdG8gYnkgTWFya00sIEFuZHJlYXMgR2FsLCBhbmQgRGF2ZSBIZXJtYW4sXG4gKiByYXRoZXIgdGhhbiB0aGUgb2ZmaWFsbHkgYXBwcm92ZWQgcHJvcG9zYWwgcGFnZS4gVE9ETyhlcmlnaHRzKTpcbiAqIHVwZ3JhZGUgdGhlIGVjbWFzY3JpcHQgV2Vha01hcCBwcm9wb3NhbCBwYWdlIHRvIGV4cGxhaW4gdGhpcyBBUElcbiAqIGNoYW5nZSBhbmQgcHJlc2VudCB0byBFY21hU2NyaXB0IGNvbW1pdHRlZSBmb3IgdGhlaXIgYXBwcm92YWwuXG4gKlxuICogPHA+VGhlIGZpcnN0IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGUgZW11bGF0aW9uIGhlcmUgYW5kIHRoYXQgaW5cbiAqIEZGNi4wYTEgaXMgdGhlIHByZXNlbmNlIG9mIG5vbiBlbnVtZXJhYmxlIHtAY29kZSBnZXRfX18sIGhhc19fXyxcbiAqIHNldF9fXywgYW5kIGRlbGV0ZV9fX30gbWV0aG9kcyBvbiBXZWFrTWFwIGluc3RhbmNlcyB0byByZXByZXNlbnRcbiAqIHdoYXQgd291bGQgYmUgdGhlIGhpZGRlbiBpbnRlcm5hbCBwcm9wZXJ0aWVzIG9mIGEgcHJpbWl0aXZlXG4gKiBpbXBsZW1lbnRhdGlvbi4gV2hlcmVhcyB0aGUgRkY2LjBhMSBXZWFrTWFwLnByb3RvdHlwZSBtZXRob2RzXG4gKiByZXF1aXJlIHRoZWlyIHtAY29kZSB0aGlzfSB0byBiZSBhIGdlbnVpbmUgV2Vha01hcCBpbnN0YW5jZSAoaS5lLixcbiAqIGFuIG9iamVjdCBvZiB7QGNvZGUgW1tDbGFzc11dfSBcIldlYWtNYXB9KSwgc2luY2UgdGhlcmUgaXMgbm90aGluZ1xuICogdW5mb3JnZWFibGUgYWJvdXQgdGhlIHBzZXVkby1pbnRlcm5hbCBtZXRob2QgbmFtZXMgdXNlZCBoZXJlLFxuICogbm90aGluZyBwcmV2ZW50cyB0aGVzZSBlbXVsYXRlZCBwcm90b3R5cGUgbWV0aG9kcyBmcm9tIGJlaW5nXG4gKiBhcHBsaWVkIHRvIG5vbi1XZWFrTWFwcyB3aXRoIHBzZXVkby1pbnRlcm5hbCBtZXRob2RzIG9mIHRoZSBzYW1lXG4gKiBuYW1lcy5cbiAqXG4gKiA8cD5Bbm90aGVyIGRpZmZlcmVuY2UgaXMgdGhhdCBvdXIgZW11bGF0ZWQge0Bjb2RlXG4gKiBXZWFrTWFwLnByb3RvdHlwZX0gaXMgbm90IGl0c2VsZiBhIFdlYWtNYXAuIEEgcHJvYmxlbSB3aXRoIHRoZVxuICogY3VycmVudCBGRjYuMGExIEFQSSBpcyB0aGF0IFdlYWtNYXAucHJvdG90eXBlIGlzIGl0c2VsZiBhIFdlYWtNYXBcbiAqIHByb3ZpZGluZyBhbWJpZW50IG11dGFiaWxpdHkgYW5kIGFuIGFtYmllbnQgY29tbXVuaWNhdGlvbnNcbiAqIGNoYW5uZWwuIFRodXMsIGlmIGEgV2Vha01hcCBpcyBhbHJlYWR5IHByZXNlbnQgYW5kIGhhcyB0aGlzXG4gKiBwcm9ibGVtLCByZXBhaXJFUzUuanMgd3JhcHMgaXQgaW4gYSBzYWZlIHdyYXBwcGVyIGluIG9yZGVyIHRvXG4gKiBwcmV2ZW50IGFjY2VzcyB0byB0aGlzIGNoYW5uZWwuIChTZWVcbiAqIFBBVENIX01VVEFCTEVfRlJPWkVOX1dFQUtNQVBfUFJPVE8gaW4gcmVwYWlyRVM1LmpzKS5cbiAqL1xuXG4vKipcbiAqIElmIHRoaXMgaXMgYSBmdWxsIDxhIGhyZWY9XG4gKiBcImh0dHA6Ly9jb2RlLmdvb2dsZS5jb20vcC9lcy1sYWIvd2lraS9TZWN1cmVhYmxlRVM1XCJcbiAqID5zZWN1cmVhYmxlIEVTNTwvYT4gcGxhdGZvcm0gYW5kIHRoZSBFUy1IYXJtb255IHtAY29kZSBXZWFrTWFwfSBpc1xuICogYWJzZW50LCBpbnN0YWxsIGFuIGFwcHJveGltYXRlIGVtdWxhdGlvbi5cbiAqXG4gKiA8cD5JZiBXZWFrTWFwIGlzIHByZXNlbnQgYnV0IGNhbm5vdCBzdG9yZSBzb21lIG9iamVjdHMsIHVzZSBvdXIgYXBwcm94aW1hdGVcbiAqIGVtdWxhdGlvbiBhcyBhIHdyYXBwZXIuXG4gKlxuICogPHA+SWYgdGhpcyBpcyBhbG1vc3QgYSBzZWN1cmVhYmxlIEVTNSBwbGF0Zm9ybSwgdGhlbiBXZWFrTWFwLmpzXG4gKiBzaG91bGQgYmUgcnVuIGFmdGVyIHJlcGFpckVTNS5qcy5cbiAqXG4gKiA8cD5TZWUge0Bjb2RlIFdlYWtNYXB9IGZvciBkb2N1bWVudGF0aW9uIG9mIHRoZSBnYXJiYWdlIGNvbGxlY3Rpb25cbiAqIHByb3BlcnRpZXMgb2YgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbi5cbiAqL1xuKGZ1bmN0aW9uIFdlYWtNYXBNb2R1bGUoKSB7XG4gIFwidXNlIHN0cmljdFwiO1xuXG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJyAmJiBzZXMub2sgJiYgIXNlcy5vaygpKSB7XG4gICAgLy8gYWxyZWFkeSB0b28gYnJva2VuLCBzbyBnaXZlIHVwXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLyoqXG4gICAqIEluIHNvbWUgY2FzZXMgKGN1cnJlbnQgRmlyZWZveCksIHdlIG11c3QgbWFrZSBhIGNob2ljZSBiZXR3ZWVlbiBhXG4gICAqIFdlYWtNYXAgd2hpY2ggaXMgY2FwYWJsZSBvZiB1c2luZyBhbGwgdmFyaWV0aWVzIG9mIGhvc3Qgb2JqZWN0cyBhc1xuICAgKiBrZXlzIGFuZCBvbmUgd2hpY2ggaXMgY2FwYWJsZSBvZiBzYWZlbHkgdXNpbmcgcHJveGllcyBhcyBrZXlzLiBTZWVcbiAgICogY29tbWVudHMgYmVsb3cgYWJvdXQgSG9zdFdlYWtNYXAgYW5kIERvdWJsZVdlYWtNYXAgZm9yIGRldGFpbHMuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gKHdoaWNoIGlzIGEgZ2xvYmFsLCBub3QgZXhwb3NlZCB0byBndWVzdHMpIG1hcmtzIGFcbiAgICogV2Vha01hcCBhcyBwZXJtaXR0ZWQgdG8gZG8gd2hhdCBpcyBuZWNlc3NhcnkgdG8gaW5kZXggYWxsIGhvc3RcbiAgICogb2JqZWN0cywgYXQgdGhlIGNvc3Qgb2YgbWFraW5nIGl0IHVuc2FmZSBmb3IgcHJveGllcy5cbiAgICpcbiAgICogRG8gbm90IGFwcGx5IHRoaXMgZnVuY3Rpb24gdG8gYW55dGhpbmcgd2hpY2ggaXMgbm90IGEgZ2VudWluZVxuICAgKiBmcmVzaCBXZWFrTWFwLlxuICAgKi9cbiAgZnVuY3Rpb24gd2Vha01hcFBlcm1pdEhvc3RPYmplY3RzKG1hcCkge1xuICAgIC8vIGlkZW50aXR5IG9mIGZ1bmN0aW9uIHVzZWQgYXMgYSBzZWNyZXQgLS0gZ29vZCBlbm91Z2ggYW5kIGNoZWFwXG4gICAgaWYgKG1hcC5wZXJtaXRIb3N0T2JqZWN0c19fXykge1xuICAgICAgbWFwLnBlcm1pdEhvc3RPYmplY3RzX19fKHdlYWtNYXBQZXJtaXRIb3N0T2JqZWN0cyk7XG4gICAgfVxuICB9XG4gIGlmICh0eXBlb2Ygc2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgIHNlcy53ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMgPSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHM7XG4gIH1cblxuICAvLyBJRSAxMSBoYXMgbm8gUHJveHkgYnV0IGhhcyBhIGJyb2tlbiBXZWFrTWFwIHN1Y2ggdGhhdCB3ZSBuZWVkIHRvIHBhdGNoXG4gIC8vIGl0IHVzaW5nIERvdWJsZVdlYWtNYXA7IHRoaXMgZmxhZyB0ZWxscyBEb3VibGVXZWFrTWFwIHNvLlxuICB2YXIgZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSA9IGZhbHNlO1xuXG4gIC8vIENoZWNrIGlmIHRoZXJlIGlzIGFscmVhZHkgYSBnb29kLWVub3VnaCBXZWFrTWFwIGltcGxlbWVudGF0aW9uLCBhbmQgaWYgc29cbiAgLy8gZXhpdCB3aXRob3V0IHJlcGxhY2luZyBpdC5cbiAgaWYgKHR5cGVvZiBXZWFrTWFwID09PSAnZnVuY3Rpb24nKSB7XG4gICAgdmFyIEhvc3RXZWFrTWFwID0gV2Vha01hcDtcbiAgICAvLyBUaGVyZSBpcyBhIFdlYWtNYXAgLS0gaXMgaXQgZ29vZCBlbm91Z2g/XG4gICAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIC9GaXJlZm94Ly50ZXN0KG5hdmlnYXRvci51c2VyQWdlbnQpKSB7XG4gICAgICAvLyBXZSdyZSBub3cgKmFzc3VtaW5nIG5vdCosIGJlY2F1c2UgYXMgb2YgdGhpcyB3cml0aW5nICgyMDEzLTA1LTA2KVxuICAgICAgLy8gRmlyZWZveCdzIFdlYWtNYXBzIGhhdmUgYSBtaXNjZWxsYW55IG9mIG9iamVjdHMgdGhleSB3b24ndCBhY2NlcHQsIGFuZFxuICAgICAgLy8gd2UgZG9uJ3Qgd2FudCB0byBtYWtlIGFuIGV4aGF1c3RpdmUgbGlzdCwgYW5kIHRlc3RpbmcgZm9yIGp1c3Qgb25lXG4gICAgICAvLyB3aWxsIGJlIGEgcHJvYmxlbSBpZiB0aGF0IG9uZSBpcyBmaXhlZCBhbG9uZSAoYXMgdGhleSBkaWQgZm9yIEV2ZW50KS5cblxuICAgICAgLy8gSWYgdGhlcmUgaXMgYSBwbGF0Zm9ybSB0aGF0IHdlICpjYW4qIHJlbGlhYmx5IHRlc3Qgb24sIGhlcmUncyBob3cgdG9cbiAgICAgIC8vIGRvIGl0OlxuICAgICAgLy8gIHZhciBwcm9ibGVtYXRpYyA9IC4uLiA7XG4gICAgICAvLyAgdmFyIHRlc3RIb3N0TWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG4gICAgICAvLyAgdHJ5IHtcbiAgICAgIC8vICAgIHRlc3RIb3N0TWFwLnNldChwcm9ibGVtYXRpYywgMSk7ICAvLyBGaXJlZm94IDIwIHdpbGwgdGhyb3cgaGVyZVxuICAgICAgLy8gICAgaWYgKHRlc3RIb3N0TWFwLmdldChwcm9ibGVtYXRpYykgPT09IDEpIHtcbiAgICAgIC8vICAgICAgcmV0dXJuO1xuICAgICAgLy8gICAgfVxuICAgICAgLy8gIH0gY2F0Y2ggKGUpIHt9XG5cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSUUgMTEgYnVnOiBXZWFrTWFwcyBzaWxlbnRseSBmYWlsIHRvIHN0b3JlIGZyb3plbiBvYmplY3RzLlxuICAgICAgdmFyIHRlc3RNYXAgPSBuZXcgSG9zdFdlYWtNYXAoKTtcbiAgICAgIHZhciB0ZXN0T2JqZWN0ID0gT2JqZWN0LmZyZWV6ZSh7fSk7XG4gICAgICB0ZXN0TWFwLnNldCh0ZXN0T2JqZWN0LCAxKTtcbiAgICAgIGlmICh0ZXN0TWFwLmdldCh0ZXN0T2JqZWN0KSAhPT0gMSkge1xuICAgICAgICBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlID0gdHJ1ZTtcbiAgICAgICAgLy8gRmFsbCB0aHJvdWdoIHRvIGluc3RhbGxpbmcgb3VyIFdlYWtNYXAuXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtb2R1bGUuZXhwb3J0cyA9IFdlYWtNYXA7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB2YXIgaG9wID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcbiAgdmFyIGdvcG4gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcztcbiAgdmFyIGRlZlByb3AgPSBPYmplY3QuZGVmaW5lUHJvcGVydHk7XG4gIHZhciBpc0V4dGVuc2libGUgPSBPYmplY3QuaXNFeHRlbnNpYmxlO1xuXG4gIC8qKlxuICAgKiBTZWN1cml0eSBkZXBlbmRzIG9uIEhJRERFTl9OQU1FIGJlaW5nIGJvdGggPGk+dW5ndWVzc2FibGU8L2k+IGFuZFxuICAgKiA8aT51bmRpc2NvdmVyYWJsZTwvaT4gYnkgdW50cnVzdGVkIGNvZGUuXG4gICAqXG4gICAqIDxwPkdpdmVuIHRoZSBrbm93biB3ZWFrbmVzc2VzIG9mIE1hdGgucmFuZG9tKCkgb24gZXhpc3RpbmdcbiAgICogYnJvd3NlcnMsIGl0IGRvZXMgbm90IGdlbmVyYXRlIHVuZ3Vlc3NhYmlsaXR5IHdlIGNhbiBiZSBjb25maWRlbnRcbiAgICogb2YuXG4gICAqXG4gICAqIDxwPkl0IGlzIHRoZSBtb25rZXkgcGF0Y2hpbmcgbG9naWMgaW4gdGhpcyBmaWxlIHRoYXQgaXMgaW50ZW5kZWRcbiAgICogdG8gZW5zdXJlIHVuZGlzY292ZXJhYmlsaXR5LiBUaGUgYmFzaWMgaWRlYSBpcyB0aGF0IHRoZXJlIGFyZVxuICAgKiB0aHJlZSBmdW5kYW1lbnRhbCBtZWFucyBvZiBkaXNjb3ZlcmluZyBwcm9wZXJ0aWVzIG9mIGFuIG9iamVjdDpcbiAgICogVGhlIGZvci9pbiBsb29wLCBPYmplY3Qua2V5cygpLCBhbmQgT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXMoKSxcbiAgICogYXMgd2VsbCBhcyBzb21lIHByb3Bvc2VkIEVTNiBleHRlbnNpb25zIHRoYXQgYXBwZWFyIG9uIG91clxuICAgKiB3aGl0ZWxpc3QuIFRoZSBmaXJzdCB0d28gb25seSBkaXNjb3ZlciBlbnVtZXJhYmxlIHByb3BlcnRpZXMsIGFuZFxuICAgKiB3ZSBvbmx5IHVzZSBISURERU5fTkFNRSB0byBuYW1lIGEgbm9uLWVudW1lcmFibGUgcHJvcGVydHksIHNvIHRoZVxuICAgKiBvbmx5IHJlbWFpbmluZyB0aHJlYXQgc2hvdWxkIGJlIGdldE93blByb3BlcnR5TmFtZXMgYW5kIHNvbWVcbiAgICogcHJvcG9zZWQgRVM2IGV4dGVuc2lvbnMgdGhhdCBhcHBlYXIgb24gb3VyIHdoaXRlbGlzdC4gV2UgbW9ua2V5XG4gICAqIHBhdGNoIHRoZW0gdG8gcmVtb3ZlIEhJRERFTl9OQU1FIGZyb20gdGhlIGxpc3Qgb2YgcHJvcGVydGllcyB0aGV5XG4gICAqIHJldHVybnMuXG4gICAqXG4gICAqIDxwPlRPRE8oZXJpZ2h0cyk6IE9uIGEgcGxhdGZvcm0gd2l0aCBidWlsdC1pbiBQcm94aWVzLCBwcm94aWVzXG4gICAqIGNvdWxkIGJlIHVzZWQgdG8gdHJhcCBhbmQgdGhlcmVieSBkaXNjb3ZlciB0aGUgSElEREVOX05BTUUsIHNvIHdlXG4gICAqIG5lZWQgdG8gbW9ua2V5IHBhdGNoIFByb3h5LmNyZWF0ZSwgUHJveHkuY3JlYXRlRnVuY3Rpb24sIGV0YywgaW5cbiAgICogb3JkZXIgdG8gd3JhcCB0aGUgcHJvdmlkZWQgaGFuZGxlciB3aXRoIHRoZSByZWFsIGhhbmRsZXIgd2hpY2hcbiAgICogZmlsdGVycyBvdXQgYWxsIHRyYXBzIHVzaW5nIEhJRERFTl9OQU1FLlxuICAgKlxuICAgKiA8cD5UT0RPKGVyaWdodHMpOiBSZXZpc2l0IE1pa2UgU3RheSdzIHN1Z2dlc3Rpb24gdGhhdCB3ZSB1c2UgYW5cbiAgICogZW5jYXBzdWxhdGVkIGZ1bmN0aW9uIGF0IGEgbm90LW5lY2Vzc2FyaWx5LXNlY3JldCBuYW1lLCB3aGljaFxuICAgKiB1c2VzIHRoZSBTdGllZ2xlciBzaGFyZWQtc3RhdGUgcmlnaHRzIGFtcGxpZmljYXRpb24gcGF0dGVybiB0b1xuICAgKiByZXZlYWwgdGhlIGFzc29jaWF0ZWQgdmFsdWUgb25seSB0byB0aGUgV2Vha01hcCBpbiB3aGljaCB0aGlzIGtleVxuICAgKiBpcyBhc3NvY2lhdGVkIHdpdGggdGhhdCB2YWx1ZS4gU2luY2Ugb25seSB0aGUga2V5IHJldGFpbnMgdGhlXG4gICAqIGZ1bmN0aW9uLCB0aGUgZnVuY3Rpb24gY2FuIGFsc28gcmVtZW1iZXIgdGhlIGtleSB3aXRob3V0IGNhdXNpbmdcbiAgICogbGVha2FnZSBvZiB0aGUga2V5LCBzbyB0aGlzIGRvZXNuJ3QgdmlvbGF0ZSBvdXIgZ2VuZXJhbCBnY1xuICAgKiBnb2Fscy4gSW4gYWRkaXRpb24sIGJlY2F1c2UgdGhlIG5hbWUgbmVlZCBub3QgYmUgYSBndWFyZGVkXG4gICAqIHNlY3JldCwgd2UgY291bGQgZWZmaWNpZW50bHkgaGFuZGxlIGNyb3NzLWZyYW1lIGZyb3plbiBrZXlzLlxuICAgKi9cbiAgdmFyIEhJRERFTl9OQU1FX1BSRUZJWCA9ICd3ZWFrbWFwOic7XG4gIHZhciBISURERU5fTkFNRSA9IEhJRERFTl9OQU1FX1BSRUZJWCArICdpZGVudDonICsgTWF0aC5yYW5kb20oKSArICdfX18nO1xuXG4gIGlmICh0eXBlb2YgY3J5cHRvICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgdHlwZW9mIGNyeXB0by5nZXRSYW5kb21WYWx1ZXMgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gJ2Z1bmN0aW9uJyAmJlxuICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkgPT09ICdmdW5jdGlvbicpIHtcbiAgICB2YXIgYWIgPSBuZXcgQXJyYXlCdWZmZXIoMjUpO1xuICAgIHZhciB1OHMgPSBuZXcgVWludDhBcnJheShhYik7XG4gICAgY3J5cHRvLmdldFJhbmRvbVZhbHVlcyh1OHMpO1xuICAgIEhJRERFTl9OQU1FID0gSElEREVOX05BTUVfUFJFRklYICsgJ3JhbmQ6JyArXG4gICAgICBBcnJheS5wcm90b3R5cGUubWFwLmNhbGwodThzLCBmdW5jdGlvbih1OCkge1xuICAgICAgICByZXR1cm4gKHU4ICUgMzYpLnRvU3RyaW5nKDM2KTtcbiAgICAgIH0pLmpvaW4oJycpICsgJ19fXyc7XG4gIH1cblxuICBmdW5jdGlvbiBpc05vdEhpZGRlbk5hbWUobmFtZSkge1xuICAgIHJldHVybiAhKFxuICAgICAgICBuYW1lLnN1YnN0cigwLCBISURERU5fTkFNRV9QUkVGSVgubGVuZ3RoKSA9PSBISURERU5fTkFNRV9QUkVGSVggJiZcbiAgICAgICAgbmFtZS5zdWJzdHIobmFtZS5sZW5ndGggLSAzKSA9PT0gJ19fXycpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBnZXRPd25Qcm9wZXJ0eU5hbWVzIHRvIGF2b2lkIHJldmVhbGluZyB0aGVcbiAgICogSElEREVOX05BTUUuXG4gICAqXG4gICAqIDxwPlRoZSBFUzUuMSBzcGVjIHJlcXVpcmVzIGVhY2ggbmFtZSB0byBhcHBlYXIgb25seSBvbmNlLCBidXQgYXNcbiAgICogb2YgdGhpcyB3cml0aW5nLCB0aGlzIHJlcXVpcmVtZW50IGlzIGNvbnRyb3ZlcnNpYWwgZm9yIEVTNiwgc28gd2VcbiAgICogbWFkZSB0aGlzIGNvZGUgcm9idXN0IGFnYWluc3QgdGhpcyBjYXNlLiBJZiB0aGUgcmVzdWx0aW5nIGV4dHJhXG4gICAqIHNlYXJjaCB0dXJucyBvdXQgdG8gYmUgZXhwZW5zaXZlLCB3ZSBjYW4gcHJvYmFibHkgcmVsYXggdGhpcyBvbmNlXG4gICAqIEVTNiBpcyBhZGVxdWF0ZWx5IHN1cHBvcnRlZCBvbiBhbGwgbWFqb3IgYnJvd3NlcnMsIGlmZiBubyBicm93c2VyXG4gICAqIHZlcnNpb25zIHdlIHN1cHBvcnQgYXQgdGhhdCB0aW1lIGhhdmUgcmVsYXhlZCB0aGlzIGNvbnN0cmFpbnRcbiAgICogd2l0aG91dCBwcm92aWRpbmcgYnVpbHQtaW4gRVM2IFdlYWtNYXBzLlxuICAgKi9cbiAgZGVmUHJvcChPYmplY3QsICdnZXRPd25Qcm9wZXJ0eU5hbWVzJywge1xuICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0T3duUHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgIHJldHVybiBnb3BuKG9iaikuZmlsdGVyKGlzTm90SGlkZGVuTmFtZSk7XG4gICAgfVxuICB9KTtcblxuICAvKipcbiAgICogZ2V0UHJvcGVydHlOYW1lcyBpcyBub3QgaW4gRVM1IGJ1dCBpdCBpcyBwcm9wb3NlZCBmb3IgRVM2IGFuZFxuICAgKiBkb2VzIGFwcGVhciBpbiBvdXIgd2hpdGVsaXN0LCBzbyB3ZSBuZWVkIHRvIGNsZWFuIGl0IHRvby5cbiAgICovXG4gIGlmICgnZ2V0UHJvcGVydHlOYW1lcycgaW4gT2JqZWN0KSB7XG4gICAgdmFyIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyA9IE9iamVjdC5nZXRQcm9wZXJ0eU5hbWVzO1xuICAgIGRlZlByb3AoT2JqZWN0LCAnZ2V0UHJvcGVydHlOYW1lcycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBmYWtlR2V0UHJvcGVydHlOYW1lcyhvYmopIHtcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsR2V0UHJvcGVydHlOYW1lcyhvYmopLmZpbHRlcihpc05vdEhpZGRlbk5hbWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIDxwPlRvIHRyZWF0IG9iamVjdHMgYXMgaWRlbnRpdHkta2V5cyB3aXRoIHJlYXNvbmFibGUgZWZmaWNpZW5jeVxuICAgKiBvbiBFUzUgYnkgaXRzZWxmIChpLmUuLCB3aXRob3V0IGFueSBvYmplY3Qta2V5ZWQgY29sbGVjdGlvbnMpLCB3ZVxuICAgKiBuZWVkIHRvIGFkZCBhIGhpZGRlbiBwcm9wZXJ0eSB0byBzdWNoIGtleSBvYmplY3RzIHdoZW4gd2VcbiAgICogY2FuLiBUaGlzIHJhaXNlcyBzZXZlcmFsIGlzc3VlczpcbiAgICogPHVsPlxuICAgKiA8bGk+QXJyYW5naW5nIHRvIGFkZCB0aGlzIHByb3BlcnR5IHRvIG9iamVjdHMgYmVmb3JlIHdlIGxvc2UgdGhlXG4gICAqICAgICBjaGFuY2UsIGFuZFxuICAgKiA8bGk+SGlkaW5nIHRoZSBleGlzdGVuY2Ugb2YgdGhpcyBuZXcgcHJvcGVydHkgZnJvbSBtb3N0XG4gICAqICAgICBKYXZhU2NyaXB0IGNvZGUuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPmNlcnRpZmljYXRpb24gdGhlZnQ8L2k+LCB3aGVyZSBvbmUgb2JqZWN0IGlzXG4gICAqICAgICBjcmVhdGVkIGZhbHNlbHkgY2xhaW1pbmcgdG8gYmUgdGhlIGtleSBvZiBhbiBhc3NvY2lhdGlvblxuICAgKiAgICAgYWN0dWFsbHkga2V5ZWQgYnkgYW5vdGhlciBvYmplY3QuXG4gICAqIDxsaT5QcmV2ZW50aW5nIDxpPnZhbHVlIHRoZWZ0PC9pPiwgd2hlcmUgdW50cnVzdGVkIGNvZGUgd2l0aFxuICAgKiAgICAgYWNjZXNzIHRvIGEga2V5IG9iamVjdCBidXQgbm90IGEgd2VhayBtYXAgbmV2ZXJ0aGVsZXNzXG4gICAqICAgICBvYnRhaW5zIGFjY2VzcyB0byB0aGUgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIHRoYXQga2V5IGluIHRoYXRcbiAgICogICAgIHdlYWsgbWFwLlxuICAgKiA8L3VsPlxuICAgKiBXZSBkbyBzbyBieVxuICAgKiA8dWw+XG4gICAqIDxsaT5NYWtpbmcgdGhlIG5hbWUgb2YgdGhlIGhpZGRlbiBwcm9wZXJ0eSB1bmd1ZXNzYWJsZSwgc28gXCJbXVwiXG4gICAqICAgICBpbmRleGluZywgd2hpY2ggd2UgY2Fubm90IGludGVyY2VwdCwgY2Fubm90IGJlIHVzZWQgdG8gYWNjZXNzXG4gICAqICAgICBhIHByb3BlcnR5IHdpdGhvdXQga25vd2luZyB0aGUgbmFtZS5cbiAgICogPGxpPk1ha2luZyB0aGUgaGlkZGVuIHByb3BlcnR5IG5vbi1lbnVtZXJhYmxlLCBzbyB3ZSBuZWVkIG5vdFxuICAgKiAgICAgd29ycnkgYWJvdXQgZm9yLWluIGxvb3BzIG9yIHtAY29kZSBPYmplY3Qua2V5c30sXG4gICAqIDxsaT5tb25rZXkgcGF0Y2hpbmcgdGhvc2UgcmVmbGVjdGl2ZSBtZXRob2RzIHRoYXQgd291bGRcbiAgICogICAgIHByZXZlbnQgZXh0ZW5zaW9ucywgdG8gYWRkIHRoaXMgaGlkZGVuIHByb3BlcnR5IGZpcnN0LFxuICAgKiA8bGk+bW9ua2V5IHBhdGNoaW5nIHRob3NlIG1ldGhvZHMgdGhhdCB3b3VsZCByZXZlYWwgdGhpc1xuICAgKiAgICAgaGlkZGVuIHByb3BlcnR5LlxuICAgKiA8L3VsPlxuICAgKiBVbmZvcnR1bmF0ZWx5LCBiZWNhdXNlIG9mIHNhbWUtb3JpZ2luIGlmcmFtZXMsIHdlIGNhbm5vdCByZWxpYWJseVxuICAgKiBhZGQgdGhpcyBoaWRkZW4gcHJvcGVydHkgYmVmb3JlIGFuIG9iamVjdCBiZWNvbWVzXG4gICAqIG5vbi1leHRlbnNpYmxlLiBJbnN0ZWFkLCBpZiB3ZSBlbmNvdW50ZXIgYSBub24tZXh0ZW5zaWJsZSBvYmplY3RcbiAgICogd2l0aG91dCBhIGhpZGRlbiByZWNvcmQgdGhhdCB3ZSBjYW4gZGV0ZWN0ICh3aGV0aGVyIG9yIG5vdCBpdCBoYXNcbiAgICogYSBoaWRkZW4gcmVjb3JkIHN0b3JlZCB1bmRlciBhIG5hbWUgc2VjcmV0IHRvIHVzKSwgdGhlbiB3ZSBqdXN0XG4gICAqIHVzZSB0aGUga2V5IG9iamVjdCBpdHNlbGYgdG8gcmVwcmVzZW50IGl0cyBpZGVudGl0eSBpbiBhIGJydXRlXG4gICAqIGZvcmNlIGxlYWt5IG1hcCBzdG9yZWQgaW4gdGhlIHdlYWsgbWFwLCBsb3NpbmcgYWxsIHRoZSBhZHZhbnRhZ2VzXG4gICAqIG9mIHdlYWtuZXNzIGZvciB0aGVzZS5cbiAgICovXG4gIGZ1bmN0aW9uIGdldEhpZGRlblJlY29yZChrZXkpIHtcbiAgICBpZiAoa2V5ICE9PSBPYmplY3Qoa2V5KSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignTm90IGFuIG9iamVjdDogJyArIGtleSk7XG4gICAgfVxuICAgIHZhciBoaWRkZW5SZWNvcmQgPSBrZXlbSElEREVOX05BTUVdO1xuICAgIGlmIChoaWRkZW5SZWNvcmQgJiYgaGlkZGVuUmVjb3JkLmtleSA9PT0ga2V5KSB7IHJldHVybiBoaWRkZW5SZWNvcmQ7IH1cbiAgICBpZiAoIWlzRXh0ZW5zaWJsZShrZXkpKSB7XG4gICAgICAvLyBXZWFrIG1hcCBtdXN0IGJydXRlIGZvcmNlLCBhcyBleHBsYWluZWQgaW4gZG9jLWNvbW1lbnQgYWJvdmUuXG4gICAgICByZXR1cm4gdm9pZCAwO1xuICAgIH1cblxuICAgIC8vIFRoZSBoaWRkZW5SZWNvcmQgYW5kIHRoZSBrZXkgcG9pbnQgZGlyZWN0bHkgYXQgZWFjaCBvdGhlciwgdmlhXG4gICAgLy8gdGhlIFwia2V5XCIgYW5kIEhJRERFTl9OQU1FIHByb3BlcnRpZXMgcmVzcGVjdGl2ZWx5LiBUaGUga2V5XG4gICAgLy8gZmllbGQgaXMgZm9yIHF1aWNrbHkgdmVyaWZ5aW5nIHRoYXQgdGhpcyBoaWRkZW4gcmVjb3JkIGlzIGFuXG4gICAgLy8gb3duIHByb3BlcnR5LCBub3QgYSBoaWRkZW4gcmVjb3JkIGZyb20gdXAgdGhlIHByb3RvdHlwZSBjaGFpbi5cbiAgICAvL1xuICAgIC8vIE5PVEU6IEJlY2F1c2UgdGhpcyBXZWFrTWFwIGVtdWxhdGlvbiBpcyBtZWFudCBvbmx5IGZvciBzeXN0ZW1zIGxpa2VcbiAgICAvLyBTRVMgd2hlcmUgT2JqZWN0LnByb3RvdHlwZSBpcyBmcm96ZW4gd2l0aG91dCBhbnkgbnVtZXJpY1xuICAgIC8vIHByb3BlcnRpZXMsIGl0IGlzIG9rIHRvIHVzZSBhbiBvYmplY3QgbGl0ZXJhbCBmb3IgdGhlIGhpZGRlblJlY29yZC5cbiAgICAvLyBUaGlzIGhhcyB0d28gYWR2YW50YWdlczpcbiAgICAvLyAqIEl0IGlzIG11Y2ggZmFzdGVyIGluIGEgcGVyZm9ybWFuY2UgY3JpdGljYWwgcGxhY2VcbiAgICAvLyAqIEl0IGF2b2lkcyByZWx5aW5nIG9uIE9iamVjdC5jcmVhdGUobnVsbCksIHdoaWNoIGhhZCBiZWVuXG4gICAgLy8gICBwcm9ibGVtYXRpYyBvbiBDaHJvbWUgMjguMC4xNDgwLjAuIFNlZVxuICAgIC8vICAgaHR0cHM6Ly9jb2RlLmdvb2dsZS5jb20vcC9nb29nbGUtY2FqYS9pc3N1ZXMvZGV0YWlsP2lkPTE2ODdcbiAgICBoaWRkZW5SZWNvcmQgPSB7IGtleToga2V5IH07XG5cbiAgICAvLyBXaGVuIHVzaW5nIHRoaXMgV2Vha01hcCBlbXVsYXRpb24gb24gcGxhdGZvcm1zIHdoZXJlXG4gICAgLy8gT2JqZWN0LnByb3RvdHlwZSBtaWdodCBub3QgYmUgZnJvemVuIGFuZCBPYmplY3QuY3JlYXRlKG51bGwpIGlzXG4gICAgLy8gcmVsaWFibGUsIHVzZSB0aGUgZm9sbG93aW5nIHR3byBjb21tZW50ZWQgb3V0IGxpbmVzIGluc3RlYWQuXG4gICAgLy8gaGlkZGVuUmVjb3JkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgICAvLyBoaWRkZW5SZWNvcmQua2V5ID0ga2V5O1xuXG4gICAgLy8gUGxlYXNlIGNvbnRhY3QgdXMgaWYgeW91IG5lZWQgdGhpcyB0byB3b3JrIG9uIHBsYXRmb3JtcyB3aGVyZVxuICAgIC8vIE9iamVjdC5wcm90b3R5cGUgbWlnaHQgbm90IGJlIGZyb3plbiBhbmRcbiAgICAvLyBPYmplY3QuY3JlYXRlKG51bGwpIG1pZ2h0IG5vdCBiZSByZWxpYWJsZS5cblxuICAgIHRyeSB7XG4gICAgICBkZWZQcm9wKGtleSwgSElEREVOX05BTUUsIHtcbiAgICAgICAgdmFsdWU6IGhpZGRlblJlY29yZCxcbiAgICAgICAgd3JpdGFibGU6IGZhbHNlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiBmYWxzZVxuICAgICAgfSk7XG4gICAgICByZXR1cm4gaGlkZGVuUmVjb3JkO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBVbmRlciBzb21lIGNpcmN1bXN0YW5jZXMsIGlzRXh0ZW5zaWJsZSBzZWVtcyB0byBtaXNyZXBvcnQgd2hldGhlclxuICAgICAgLy8gdGhlIEhJRERFTl9OQU1FIGNhbiBiZSBkZWZpbmVkLlxuICAgICAgLy8gVGhlIGNpcmN1bXN0YW5jZXMgaGF2ZSBub3QgYmVlbiBpc29sYXRlZCwgYnV0IGF0IGxlYXN0IGFmZmVjdFxuICAgICAgLy8gTm9kZS5qcyB2MC4xMC4yNiBvbiBUcmF2aXNDSSAvIExpbnV4LCBidXQgbm90IHRoZSBzYW1lIHZlcnNpb24gb2ZcbiAgICAgIC8vIE5vZGUuanMgb24gT1MgWC5cbiAgICAgIHJldHVybiB2b2lkIDA7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1vbmtleSBwYXRjaCBvcGVyYXRpb25zIHRoYXQgd291bGQgbWFrZSB0aGVpciBhcmd1bWVudFxuICAgKiBub24tZXh0ZW5zaWJsZS5cbiAgICpcbiAgICogPHA+VGhlIG1vbmtleSBwYXRjaGVkIHZlcnNpb25zIHRocm93IGEgVHlwZUVycm9yIGlmIHRoZWlyXG4gICAqIGFyZ3VtZW50IGlzIG5vdCBhbiBvYmplY3QsIHNvIGl0IHNob3VsZCBvbmx5IGJlIGRvbmUgdG8gZnVuY3Rpb25zXG4gICAqIHRoYXQgc2hvdWxkIHRocm93IGEgVHlwZUVycm9yIGFueXdheSBpZiB0aGVpciBhcmd1bWVudCBpcyBub3QgYW5cbiAgICogb2JqZWN0LlxuICAgKi9cbiAgKGZ1bmN0aW9uKCl7XG4gICAgdmFyIG9sZEZyZWV6ZSA9IE9iamVjdC5mcmVlemU7XG4gICAgZGVmUHJvcChPYmplY3QsICdmcmVlemUnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdGcmVlemUob2JqKSB7XG4gICAgICAgIGdldEhpZGRlblJlY29yZChvYmopO1xuICAgICAgICByZXR1cm4gb2xkRnJlZXplKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdmFyIG9sZFNlYWwgPSBPYmplY3Quc2VhbDtcbiAgICBkZWZQcm9wKE9iamVjdCwgJ3NlYWwnLCB7XG4gICAgICB2YWx1ZTogZnVuY3Rpb24gaWRlbnRpZnlpbmdTZWFsKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFNlYWwob2JqKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB2YXIgb2xkUHJldmVudEV4dGVuc2lvbnMgPSBPYmplY3QucHJldmVudEV4dGVuc2lvbnM7XG4gICAgZGVmUHJvcChPYmplY3QsICdwcmV2ZW50RXh0ZW5zaW9ucycsIHtcbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBpZGVudGlmeWluZ1ByZXZlbnRFeHRlbnNpb25zKG9iaikge1xuICAgICAgICBnZXRIaWRkZW5SZWNvcmQob2JqKTtcbiAgICAgICAgcmV0dXJuIG9sZFByZXZlbnRFeHRlbnNpb25zKG9iaik7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pKCk7XG5cbiAgZnVuY3Rpb24gY29uc3RGdW5jKGZ1bmMpIHtcbiAgICBmdW5jLnByb3RvdHlwZSA9IG51bGw7XG4gICAgcmV0dXJuIE9iamVjdC5mcmVlemUoZnVuYyk7XG4gIH1cblxuICB2YXIgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGNhbGxlZEFzRnVuY3Rpb25XYXJuaW5nKCkge1xuICAgIC8vIEZ1dHVyZSBFUzYgV2Vha01hcCBpcyBjdXJyZW50bHkgKDIwMTMtMDktMTApIGV4cGVjdGVkIHRvIHJlamVjdCBXZWFrTWFwKClcbiAgICAvLyBidXQgd2UgdXNlZCB0byBwZXJtaXQgaXQgYW5kIGRvIGl0IG91cnNlbHZlcywgc28gd2FybiBvbmx5LlxuICAgIGlmICghY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lICYmIHR5cGVvZiBjb25zb2xlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmdEb25lID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUud2FybignV2Vha01hcCBzaG91bGQgYmUgaW52b2tlZCBhcyBuZXcgV2Vha01hcCgpLCBub3QgJyArXG4gICAgICAgICAgJ1dlYWtNYXAoKS4gVGhpcyB3aWxsIGJlIGFuIGVycm9yIGluIHRoZSBmdXR1cmUuJyk7XG4gICAgfVxuICB9XG5cbiAgdmFyIG5leHRJZCA9IDA7XG5cbiAgdmFyIE91cldlYWtNYXAgPSBmdW5jdGlvbigpIHtcbiAgICBpZiAoISh0aGlzIGluc3RhbmNlb2YgT3VyV2Vha01hcCkpIHsgIC8vIGFwcHJveGltYXRlIHRlc3QgZm9yIG5ldyAuLi4oKVxuICAgICAgY2FsbGVkQXNGdW5jdGlvbldhcm5pbmcoKTtcbiAgICB9XG5cbiAgICAvLyBXZSBhcmUgY3VycmVudGx5ICgxMi8yNS8yMDEyKSBuZXZlciBlbmNvdW50ZXJpbmcgYW55IHByZW1hdHVyZWx5XG4gICAgLy8gbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIga2V5cyA9IFtdOyAvLyBicnV0ZSBmb3JjZSBmb3IgcHJlbWF0dXJlbHkgbm9uLWV4dGVuc2libGUga2V5cy5cbiAgICB2YXIgdmFsdWVzID0gW107IC8vIGJydXRlIGZvcmNlIGZvciBjb3JyZXNwb25kaW5nIHZhbHVlcy5cbiAgICB2YXIgaWQgPSBuZXh0SWQrKztcblxuICAgIGZ1bmN0aW9uIGdldF9fXyhrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICB2YXIgaW5kZXg7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQgPyBoaWRkZW5SZWNvcmRbaWRdIDogb3B0X2RlZmF1bHQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCA/IHZhbHVlc1tpbmRleF0gOiBvcHRfZGVmYXVsdDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYXNfX18oa2V5KSB7XG4gICAgICB2YXIgaGlkZGVuUmVjb3JkID0gZ2V0SGlkZGVuUmVjb3JkKGtleSk7XG4gICAgICBpZiAoaGlkZGVuUmVjb3JkKSB7XG4gICAgICAgIHJldHVybiBpZCBpbiBoaWRkZW5SZWNvcmQ7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4ga2V5cy5pbmRleE9mKGtleSkgPj0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRfX18oa2V5LCB2YWx1ZSkge1xuICAgICAgdmFyIGluZGV4O1xuICAgICAgdmFyIGhpZGRlblJlY29yZCA9IGdldEhpZGRlblJlY29yZChrZXkpO1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICBoaWRkZW5SZWNvcmRbaWRdID0gdmFsdWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IGtleXMuaW5kZXhPZihrZXkpO1xuICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgIHZhbHVlc1tpbmRleF0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgICAvLyB0aGVuIGNvbnRpbnVlIGNvbXB1dGluZyB3aXRoIHByZXN1bWFibHkgY29ycnVwdGVkIGhlYXBcbiAgICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW5cbiAgICAgICAgICAvLyB1c2UgaXQgdG8gdXBkYXRlIGJvdGggdGhlIHZhbHVlcyBhbmQga2V5cyBhcnJheXMsIGtlZXBpbmdcbiAgICAgICAgICAvLyB0aGVtIGluIHN5bmMuXG4gICAgICAgICAgaW5kZXggPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgICB2YWx1ZXNbaW5kZXhdID0gdmFsdWU7XG4gICAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdmFsdWVzIHdpbGwgYmUgb25lIGxvbmdlciB0aGFuIGtleXMuXG4gICAgICAgICAga2V5c1tpbmRleF0gPSBrZXk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZV9fXyhrZXkpIHtcbiAgICAgIHZhciBoaWRkZW5SZWNvcmQgPSBnZXRIaWRkZW5SZWNvcmQoa2V5KTtcbiAgICAgIHZhciBpbmRleCwgbGFzdEluZGV4O1xuICAgICAgaWYgKGhpZGRlblJlY29yZCkge1xuICAgICAgICByZXR1cm4gaWQgaW4gaGlkZGVuUmVjb3JkICYmIGRlbGV0ZSBoaWRkZW5SZWNvcmRbaWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSBrZXlzLmluZGV4T2Yoa2V5KTtcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICAvLyBTaW5jZSBzb21lIGJyb3dzZXJzIHByZWVtcHRpdmVseSB0ZXJtaW5hdGUgc2xvdyB0dXJucyBidXRcbiAgICAgICAgLy8gdGhlbiBjb250aW51ZSBjb21wdXRpbmcgd2l0aCBwb3RlbnRpYWxseSBjb3JydXB0ZWQgaGVhcFxuICAgICAgICAvLyBzdGF0ZSwgd2UgaGVyZSBkZWZlbnNpdmVseSBnZXQga2V5cy5sZW5ndGggZmlyc3QgYW5kIHRoZW4gdXNlXG4gICAgICAgIC8vIGl0IHRvIHVwZGF0ZSBib3RoIHRoZSBrZXlzIGFuZCB0aGUgdmFsdWVzIGFycmF5LCBrZWVwaW5nXG4gICAgICAgIC8vIHRoZW0gaW4gc3luYy4gV2UgdXBkYXRlIHRoZSB0d28gd2l0aCBhbiBvcmRlciBvZiBhc3NpZ25tZW50cyxcbiAgICAgICAgLy8gc3VjaCB0aGF0IGFueSBwcmVmaXggb2YgdGhlc2UgYXNzaWdubWVudHMgd2lsbCBwcmVzZXJ2ZSB0aGVcbiAgICAgICAgLy8ga2V5L3ZhbHVlIGNvcnJlc3BvbmRlbmNlLCBlaXRoZXIgYmVmb3JlIG9yIGFmdGVyIHRoZSBkZWxldGUuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB0aGlzIG5lZWRzIHRvIHdvcmsgY29ycmVjdGx5IHdoZW4gaW5kZXggPT09IGxhc3RJbmRleC5cbiAgICAgICAgbGFzdEluZGV4ID0ga2V5cy5sZW5ndGggLSAxO1xuICAgICAgICBrZXlzW2luZGV4XSA9IHZvaWQgMDtcbiAgICAgICAgLy8gSWYgd2UgY3Jhc2ggaGVyZSwgdGhlcmUncyBhIHZvaWQgMCBpbiB0aGUga2V5cyBhcnJheSwgYnV0XG4gICAgICAgIC8vIG5vIG9wZXJhdGlvbiB3aWxsIGNhdXNlIGEgXCJrZXlzLmluZGV4T2Yodm9pZCAwKVwiLCBzaW5jZVxuICAgICAgICAvLyBnZXRIaWRkZW5SZWNvcmQodm9pZCAwKSB3aWxsIGFsd2F5cyB0aHJvdyBhbiBlcnJvciBmaXJzdC5cbiAgICAgICAgdmFsdWVzW2luZGV4XSA9IHZhbHVlc1tsYXN0SW5kZXhdO1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCB2YWx1ZXNbaW5kZXhdIGNhbm5vdCBiZSBmb3VuZCBoZXJlLFxuICAgICAgICAvLyBiZWNhdXNlIGtleXNbaW5kZXhdIGlzIHZvaWQgMC5cbiAgICAgICAga2V5c1tpbmRleF0gPSBrZXlzW2xhc3RJbmRleF07XG4gICAgICAgIC8vIElmIGluZGV4ID09PSBsYXN0SW5kZXggYW5kIHdlIGNyYXNoIGhlcmUsIHRoZW4ga2V5c1tpbmRleF1cbiAgICAgICAgLy8gaXMgc3RpbGwgdm9pZCAwLCBzaW5jZSB0aGUgYWxpYXNpbmcga2lsbGVkIHRoZSBwcmV2aW91cyBrZXkuXG4gICAgICAgIGtleXMubGVuZ3RoID0gbGFzdEluZGV4O1xuICAgICAgICAvLyBJZiB3ZSBjcmFzaCBoZXJlLCBrZXlzIHdpbGwgYmUgb25lIHNob3J0ZXIgdGhhbiB2YWx1ZXMuXG4gICAgICAgIHZhbHVlcy5sZW5ndGggPSBsYXN0SW5kZXg7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBPYmplY3QuY3JlYXRlKE91cldlYWtNYXAucHJvdG90eXBlLCB7XG4gICAgICBnZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhnZXRfX18pIH0sXG4gICAgICBoYXNfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhoYXNfX18pIH0sXG4gICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhzZXRfX18pIH0sXG4gICAgICBkZWxldGVfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhkZWxldGVfX18pIH1cbiAgICB9KTtcbiAgfTtcblxuICBPdXJXZWFrTWFwLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoT2JqZWN0LnByb3RvdHlwZSwge1xuICAgIGdldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBSZXR1cm4gdGhlIHZhbHVlIG1vc3QgcmVjZW50bHkgYXNzb2NpYXRlZCB3aXRoIGtleSwgb3JcbiAgICAgICAqIG9wdF9kZWZhdWx0IGlmIG5vbmUuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXQoa2V5LCBvcHRfZGVmYXVsdCkge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgaGFzOiB7XG4gICAgICAvKipcbiAgICAgICAqIElzIHRoZXJlIGEgdmFsdWUgYXNzb2NpYXRlZCB3aXRoIGtleSBpbiB0aGlzIFdlYWtNYXA/XG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBoYXMoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc19fXyhrZXkpO1xuICAgICAgfSxcbiAgICAgIHdyaXRhYmxlOiB0cnVlLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSxcblxuICAgIHNldDoge1xuICAgICAgLyoqXG4gICAgICAgKiBBc3NvY2lhdGUgdmFsdWUgd2l0aCBrZXkgaW4gdGhpcyBXZWFrTWFwLCBvdmVyd3JpdGluZyBhbnlcbiAgICAgICAqIHByZXZpb3VzIGFzc29jaWF0aW9uIGlmIHByZXNlbnQuXG4gICAgICAgKi9cbiAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXQoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zZXRfX18oa2V5LCB2YWx1ZSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9LFxuXG4gICAgJ2RlbGV0ZSc6IHtcbiAgICAgIC8qKlxuICAgICAgICogUmVtb3ZlIGFueSBhc3NvY2lhdGlvbiBmb3Iga2V5IGluIHRoaXMgV2Vha01hcCwgcmV0dXJuaW5nXG4gICAgICAgKiB3aGV0aGVyIHRoZXJlIHdhcyBvbmUuXG4gICAgICAgKlxuICAgICAgICogPHA+Tm90ZSB0aGF0IHRoZSBib29sZWFuIHJldHVybiBoZXJlIGRvZXMgbm90IHdvcmsgbGlrZSB0aGVcbiAgICAgICAqIHtAY29kZSBkZWxldGV9IG9wZXJhdG9yLiBUaGUge0Bjb2RlIGRlbGV0ZX0gb3BlcmF0b3IgcmV0dXJuc1xuICAgICAgICogd2hldGhlciB0aGUgZGVsZXRpb24gc3VjY2VlZHMgYXQgYnJpbmdpbmcgYWJvdXQgYSBzdGF0ZSBpblxuICAgICAgICogd2hpY2ggdGhlIGRlbGV0ZWQgcHJvcGVydHkgaXMgYWJzZW50LiBUaGUge0Bjb2RlIGRlbGV0ZX1cbiAgICAgICAqIG9wZXJhdG9yIHRoZXJlZm9yZSByZXR1cm5zIHRydWUgaWYgdGhlIHByb3BlcnR5IHdhcyBhbHJlYWR5XG4gICAgICAgKiBhYnNlbnQsIHdoZXJlYXMgdGhpcyB7QGNvZGUgZGVsZXRlfSBtZXRob2QgcmV0dXJucyBmYWxzZSBpZlxuICAgICAgICogdGhlIGFzc29jaWF0aW9uIHdhcyBhbHJlYWR5IGFic2VudC5cbiAgICAgICAqL1xuICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlbW92ZShrZXkpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVsZXRlX19fKGtleSk7XG4gICAgICB9LFxuICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9XG4gIH0pO1xuXG4gIGlmICh0eXBlb2YgSG9zdFdlYWtNYXAgPT09ICdmdW5jdGlvbicpIHtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBJZiB3ZSBnb3QgaGVyZSwgdGhlbiB0aGUgcGxhdGZvcm0gaGFzIGEgV2Vha01hcCBidXQgd2UgYXJlIGNvbmNlcm5lZFxuICAgICAgLy8gdGhhdCBpdCBtYXkgcmVmdXNlIHRvIHN0b3JlIHNvbWUga2V5IHR5cGVzLiBUaGVyZWZvcmUsIG1ha2UgYSBtYXBcbiAgICAgIC8vIGltcGxlbWVudGF0aW9uIHdoaWNoIG1ha2VzIHVzZSBvZiBib3RoIGFzIHBvc3NpYmxlLlxuXG4gICAgICAvLyBJbiB0aGlzIG1vZGUgd2UgYXJlIGFsd2F5cyB1c2luZyBkb3VibGUgbWFwcywgc28gd2UgYXJlIG5vdCBwcm94eS1zYWZlLlxuICAgICAgLy8gVGhpcyBjb21iaW5hdGlvbiBkb2VzIG5vdCBvY2N1ciBpbiBhbnkga25vd24gYnJvd3NlciwgYnV0IHdlIGhhZCBiZXN0XG4gICAgICAvLyBiZSBzYWZlLlxuICAgICAgaWYgKGRvdWJsZVdlYWtNYXBDaGVja1NpbGVudEZhaWx1cmUgJiYgdHlwZW9mIFByb3h5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gRG91YmxlV2Vha01hcCgpIHtcbiAgICAgICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIE91cldlYWtNYXApKSB7ICAvLyBhcHByb3hpbWF0ZSB0ZXN0IGZvciBuZXcgLi4uKClcbiAgICAgICAgICBjYWxsZWRBc0Z1bmN0aW9uV2FybmluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gUHJlZmVyYWJsZSwgdHJ1bHkgd2VhayBtYXAuXG4gICAgICAgIHZhciBobWFwID0gbmV3IEhvc3RXZWFrTWFwKCk7XG5cbiAgICAgICAgLy8gT3VyIGhpZGRlbi1wcm9wZXJ0eS1iYXNlZCBwc2V1ZG8td2Vhay1tYXAuIExhemlseSBpbml0aWFsaXplZCBpbiB0aGVcbiAgICAgICAgLy8gJ3NldCcgaW1wbGVtZW50YXRpb247IHRodXMgd2UgY2FuIGF2b2lkIHBlcmZvcm1pbmcgZXh0cmEgbG9va3VwcyBpZlxuICAgICAgICAvLyB3ZSBrbm93IGFsbCBlbnRyaWVzIGFjdHVhbGx5IHN0b3JlZCBhcmUgZW50ZXJlZCBpbiAnaG1hcCcuXG4gICAgICAgIHZhciBvbWFwID0gdW5kZWZpbmVkO1xuXG4gICAgICAgIC8vIEhpZGRlbi1wcm9wZXJ0eSBtYXBzIGFyZSBub3QgY29tcGF0aWJsZSB3aXRoIHByb3hpZXMgYmVjYXVzZSBwcm94aWVzXG4gICAgICAgIC8vIGNhbiBvYnNlcnZlIHRoZSBoaWRkZW4gbmFtZSBhbmQgZWl0aGVyIGFjY2lkZW50YWxseSBleHBvc2UgaXQgb3IgZmFpbFxuICAgICAgICAvLyB0byBhbGxvdyB0aGUgaGlkZGVuIHByb3BlcnR5IHRvIGJlIHNldC4gVGhlcmVmb3JlLCB3ZSBkbyBub3QgYWxsb3dcbiAgICAgICAgLy8gYXJiaXRyYXJ5IFdlYWtNYXBzIHRvIHN3aXRjaCB0byB1c2luZyBoaWRkZW4gcHJvcGVydGllcywgYnV0IG9ubHlcbiAgICAgICAgLy8gdGhvc2Ugd2hpY2ggbmVlZCB0aGUgYWJpbGl0eSwgYW5kIHVucHJpdmlsZWdlZCBjb2RlIGlzIG5vdCBhbGxvd2VkXG4gICAgICAgIC8vIHRvIHNldCB0aGUgZmxhZy5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gKEV4Y2VwdCBpbiBkb3VibGVXZWFrTWFwQ2hlY2tTaWxlbnRGYWlsdXJlIG1vZGUgaW4gd2hpY2ggY2FzZSB3ZVxuICAgICAgICAvLyBkaXNhYmxlIHByb3hpZXMuKVxuICAgICAgICB2YXIgZW5hYmxlU3dpdGNoaW5nID0gZmFsc2U7XG5cbiAgICAgICAgZnVuY3Rpb24gZGdldChrZXksIG9wdF9kZWZhdWx0KSB7XG4gICAgICAgICAgaWYgKG9tYXApIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpID8gaG1hcC5nZXQoa2V5KVxuICAgICAgICAgICAgICAgIDogb21hcC5nZXRfX18oa2V5LCBvcHRfZGVmYXVsdCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBobWFwLmdldChrZXksIG9wdF9kZWZhdWx0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBkaGFzKGtleSkge1xuICAgICAgICAgIHJldHVybiBobWFwLmhhcyhrZXkpIHx8IChvbWFwID8gb21hcC5oYXNfX18oa2V5KSA6IGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkc2V0O1xuICAgICAgICBpZiAoZG91YmxlV2Vha01hcENoZWNrU2lsZW50RmFpbHVyZSkge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBobWFwLnNldChrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICghaG1hcC5oYXMoa2V5KSkge1xuICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgb21hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRzZXQgPSBmdW5jdGlvbihrZXksIHZhbHVlKSB7XG4gICAgICAgICAgICBpZiAoZW5hYmxlU3dpdGNoaW5nKSB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW9tYXApIHsgb21hcCA9IG5ldyBPdXJXZWFrTWFwKCk7IH1cbiAgICAgICAgICAgICAgICBvbWFwLnNldF9fXyhrZXksIHZhbHVlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZGRlbGV0ZShrZXkpIHtcbiAgICAgICAgICB2YXIgcmVzdWx0ID0gISFobWFwWydkZWxldGUnXShrZXkpO1xuICAgICAgICAgIGlmIChvbWFwKSB7IHJldHVybiBvbWFwLmRlbGV0ZV9fXyhrZXkpIHx8IHJlc3VsdDsgfVxuICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gT2JqZWN0LmNyZWF0ZShPdXJXZWFrTWFwLnByb3RvdHlwZSwge1xuICAgICAgICAgIGdldF9fXzogICAgeyB2YWx1ZTogY29uc3RGdW5jKGRnZXQpIH0sXG4gICAgICAgICAgaGFzX19fOiAgICB7IHZhbHVlOiBjb25zdEZ1bmMoZGhhcykgfSxcbiAgICAgICAgICBzZXRfX186ICAgIHsgdmFsdWU6IGNvbnN0RnVuYyhkc2V0KSB9LFxuICAgICAgICAgIGRlbGV0ZV9fXzogeyB2YWx1ZTogY29uc3RGdW5jKGRkZWxldGUpIH0sXG4gICAgICAgICAgcGVybWl0SG9zdE9iamVjdHNfX186IHsgdmFsdWU6IGNvbnN0RnVuYyhmdW5jdGlvbih0b2tlbikge1xuICAgICAgICAgICAgaWYgKHRva2VuID09PSB3ZWFrTWFwUGVybWl0SG9zdE9iamVjdHMpIHtcbiAgICAgICAgICAgICAgZW5hYmxlU3dpdGNoaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYm9ndXMgY2FsbCB0byBwZXJtaXRIb3N0T2JqZWN0c19fXycpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIERvdWJsZVdlYWtNYXAucHJvdG90eXBlID0gT3VyV2Vha01hcC5wcm90b3R5cGU7XG4gICAgICBtb2R1bGUuZXhwb3J0cyA9IERvdWJsZVdlYWtNYXA7XG5cbiAgICAgIC8vIGRlZmluZSAuY29uc3RydWN0b3IgdG8gaGlkZSBPdXJXZWFrTWFwIGN0b3JcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShXZWFrTWFwLnByb3RvdHlwZSwgJ2NvbnN0cnVjdG9yJywge1xuICAgICAgICB2YWx1ZTogV2Vha01hcCxcbiAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsICAvLyBhcyBkZWZhdWx0IC5jb25zdHJ1Y3RvciBpc1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICB9KSgpO1xuICB9IGVsc2Uge1xuICAgIC8vIFRoZXJlIGlzIG5vIGhvc3QgV2Vha01hcCwgc28gd2UgbXVzdCB1c2UgdGhlIGVtdWxhdGlvbi5cblxuICAgIC8vIEVtdWxhdGVkIFdlYWtNYXBzIGFyZSBpbmNvbXBhdGlibGUgd2l0aCBuYXRpdmUgcHJveGllcyAoYmVjYXVzZSBwcm94aWVzXG4gICAgLy8gY2FuIG9ic2VydmUgdGhlIGhpZGRlbiBuYW1lKSwgc28gd2UgbXVzdCBkaXNhYmxlIFByb3h5IHVzYWdlIChpblxuICAgIC8vIEFycmF5TGlrZSBhbmQgRG9tYWRvLCBjdXJyZW50bHkpLlxuICAgIGlmICh0eXBlb2YgUHJveHkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBQcm94eSA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IE91cldlYWtNYXA7XG4gIH1cbn0pKCk7XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy93ZWFrLW1hcC93ZWFrLW1hcC5qc1xuLy8gbW9kdWxlIGlkID0gNDFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIHBvb2wgPSByZXF1aXJlKFwidHlwZWRhcnJheS1wb29sXCIpXG52YXIgb3BzID0gcmVxdWlyZShcIm5kYXJyYXktb3BzXCIpXG52YXIgbmRhcnJheSA9IHJlcXVpcmUoXCJuZGFycmF5XCIpXG5cbnZhciBTVVBQT1JURURfVFlQRVMgPSBbXG4gIFwidWludDhcIixcbiAgXCJ1aW50OF9jbGFtcGVkXCIsXG4gIFwidWludDE2XCIsXG4gIFwidWludDMyXCIsXG4gIFwiaW50OFwiLFxuICBcImludDE2XCIsXG4gIFwiaW50MzJcIixcbiAgXCJmbG9hdDMyXCIgXVxuXG5mdW5jdGlvbiBHTEJ1ZmZlcihnbCwgdHlwZSwgaGFuZGxlLCBsZW5ndGgsIHVzYWdlKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLnR5cGUgPSB0eXBlXG4gIHRoaXMuaGFuZGxlID0gaGFuZGxlXG4gIHRoaXMubGVuZ3RoID0gbGVuZ3RoXG4gIHRoaXMudXNhZ2UgPSB1c2FnZVxufVxuXG52YXIgcHJvdG8gPSBHTEJ1ZmZlci5wcm90b3R5cGVcblxucHJvdG8uYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmdsLmJpbmRCdWZmZXIodGhpcy50eXBlLCB0aGlzLmhhbmRsZSlcbn1cblxucHJvdG8udW5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuZ2wuYmluZEJ1ZmZlcih0aGlzLnR5cGUsIG51bGwpXG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5nbC5kZWxldGVCdWZmZXIodGhpcy5oYW5kbGUpXG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVR5cGVBcnJheShnbCwgdHlwZSwgbGVuLCB1c2FnZSwgZGF0YSwgb2Zmc2V0KSB7XG4gIHZhciBkYXRhTGVuID0gZGF0YS5sZW5ndGggKiBkYXRhLkJZVEVTX1BFUl9FTEVNRU5UXG4gIGlmKG9mZnNldCA8IDApIHtcbiAgICBnbC5idWZmZXJEYXRhKHR5cGUsIGRhdGEsIHVzYWdlKVxuICAgIHJldHVybiBkYXRhTGVuXG4gIH1cbiAgaWYoZGF0YUxlbiArIG9mZnNldCA+IGxlbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImdsLWJ1ZmZlcjogSWYgcmVzaXppbmcgYnVmZmVyLCBtdXN0IG5vdCBzcGVjaWZ5IG9mZnNldFwiKVxuICB9XG4gIGdsLmJ1ZmZlclN1YkRhdGEodHlwZSwgb2Zmc2V0LCBkYXRhKVxuICByZXR1cm4gbGVuXG59XG5cbmZ1bmN0aW9uIG1ha2VTY3JhdGNoVHlwZUFycmF5KGFycmF5LCBkdHlwZSkge1xuICB2YXIgcmVzID0gcG9vbC5tYWxsb2MoYXJyYXkubGVuZ3RoLCBkdHlwZSlcbiAgdmFyIG4gPSBhcnJheS5sZW5ndGhcbiAgZm9yKHZhciBpPTA7IGk8bjsgKytpKSB7XG4gICAgcmVzW2ldID0gYXJyYXlbaV1cbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGlzUGFja2VkKHNoYXBlLCBzdHJpZGUpIHtcbiAgdmFyIG4gPSAxXG4gIGZvcih2YXIgaT1zdHJpZGUubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgIGlmKHN0cmlkZVtpXSAhPT0gbikge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIG4gKj0gc2hhcGVbaV1cbiAgfVxuICByZXR1cm4gdHJ1ZVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihhcnJheSwgb2Zmc2V0KSB7XG4gIGlmKHR5cGVvZiBvZmZzZXQgIT09IFwibnVtYmVyXCIpIHtcbiAgICBvZmZzZXQgPSAtMVxuICB9XG4gIHRoaXMuYmluZCgpXG4gIGlmKHR5cGVvZiBhcnJheSA9PT0gXCJvYmplY3RcIiAmJiB0eXBlb2YgYXJyYXkuc2hhcGUgIT09IFwidW5kZWZpbmVkXCIpIHsgLy9uZGFycmF5XG4gICAgdmFyIGR0eXBlID0gYXJyYXkuZHR5cGVcbiAgICBpZihTVVBQT1JURURfVFlQRVMuaW5kZXhPZihkdHlwZSkgPCAwKSB7XG4gICAgICBkdHlwZSA9IFwiZmxvYXQzMlwiXG4gICAgfVxuICAgIGlmKHRoaXMudHlwZSA9PT0gdGhpcy5nbC5FTEVNRU5UX0FSUkFZX0JVRkZFUikge1xuICAgICAgdmFyIGV4dCA9IGdsLmdldEV4dGVuc2lvbignT0VTX2VsZW1lbnRfaW5kZXhfdWludCcpXG4gICAgICBpZihleHQgJiYgZHR5cGUgIT09IFwidWludDE2XCIpIHtcbiAgICAgICAgZHR5cGUgPSBcInVpbnQzMlwiXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkdHlwZSA9IFwidWludDE2XCJcbiAgICAgIH1cbiAgICB9XG4gICAgaWYoZHR5cGUgPT09IGFycmF5LmR0eXBlICYmIGlzUGFja2VkKGFycmF5LnNoYXBlLCBhcnJheS5zdHJpZGUpKSB7XG4gICAgICBpZihhcnJheS5vZmZzZXQgPT09IDAgJiYgYXJyYXkuZGF0YS5sZW5ndGggPT09IGFycmF5LnNoYXBlWzBdKSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIGFycmF5LmRhdGEsIG9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMubGVuZ3RoID0gdXBkYXRlVHlwZUFycmF5KHRoaXMuZ2wsIHRoaXMudHlwZSwgdGhpcy5sZW5ndGgsIHRoaXMudXNhZ2UsIGFycmF5LmRhdGEuc3ViYXJyYXkoYXJyYXkub2Zmc2V0LCBhcnJheS5zaGFwZVswXSksIG9mZnNldClcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHRtcCA9IHBvb2wubWFsbG9jKGFycmF5LnNpemUsIGR0eXBlKVxuICAgICAgdmFyIG5kdCA9IG5kYXJyYXkodG1wLCBhcnJheS5zaGFwZSlcbiAgICAgIG9wcy5hc3NpZ24obmR0LCBhcnJheSlcbiAgICAgIGlmKG9mZnNldCA8IDApIHtcbiAgICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdG1wLCBvZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0bXAuc3ViYXJyYXkoMCwgYXJyYXkuc2l6ZSksIG9mZnNldClcbiAgICAgIH1cbiAgICAgIHBvb2wuZnJlZSh0bXApXG4gICAgfVxuICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShhcnJheSkpIHsgLy9WYW5pbGxhIGFycmF5XG4gICAgdmFyIHRcbiAgICBpZih0aGlzLnR5cGUgPT09IHRoaXMuZ2wuRUxFTUVOVF9BUlJBWV9CVUZGRVIpIHtcbiAgICAgIHQgPSBtYWtlU2NyYXRjaFR5cGVBcnJheShhcnJheSwgXCJ1aW50MTZcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdCA9IG1ha2VTY3JhdGNoVHlwZUFycmF5KGFycmF5LCBcImZsb2F0MzJcIilcbiAgICB9XG4gICAgaWYob2Zmc2V0IDwgMCkge1xuICAgICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgdCwgb2Zmc2V0KVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmxlbmd0aCA9IHVwZGF0ZVR5cGVBcnJheSh0aGlzLmdsLCB0aGlzLnR5cGUsIHRoaXMubGVuZ3RoLCB0aGlzLnVzYWdlLCB0LnN1YmFycmF5KDAsIGFycmF5Lmxlbmd0aCksIG9mZnNldClcbiAgICB9XG4gICAgcG9vbC5mcmVlKHQpXG4gIH0gZWxzZSBpZih0eXBlb2YgYXJyYXkgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIGFycmF5Lmxlbmd0aCA9PT0gXCJudW1iZXJcIikgeyAvL1R5cGVkIGFycmF5XG4gICAgdGhpcy5sZW5ndGggPSB1cGRhdGVUeXBlQXJyYXkodGhpcy5nbCwgdGhpcy50eXBlLCB0aGlzLmxlbmd0aCwgdGhpcy51c2FnZSwgYXJyYXksIG9mZnNldClcbiAgfSBlbHNlIGlmKHR5cGVvZiBhcnJheSA9PT0gXCJudW1iZXJcIiB8fCBhcnJheSA9PT0gdW5kZWZpbmVkKSB7IC8vTnVtYmVyL2RlZmF1bHRcbiAgICBpZihvZmZzZXQgPj0gMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBDYW5ub3Qgc3BlY2lmeSBvZmZzZXQgd2hlbiByZXNpemluZyBidWZmZXJcIilcbiAgICB9XG4gICAgYXJyYXkgPSBhcnJheSB8IDBcbiAgICBpZihhcnJheSA8PSAwKSB7XG4gICAgICBhcnJheSA9IDFcbiAgICB9XG4gICAgdGhpcy5nbC5idWZmZXJEYXRhKHRoaXMudHlwZSwgYXJyYXl8MCwgdGhpcy51c2FnZSlcbiAgICB0aGlzLmxlbmd0aCA9IGFycmF5XG4gIH0gZWxzZSB7IC8vRXJyb3IsIGNhc2Ugc2hvdWxkIG5vdCBoYXBwZW5cbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJnbC1idWZmZXI6IEludmFsaWQgZGF0YSB0eXBlXCIpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyKGdsLCBkYXRhLCB0eXBlLCB1c2FnZSkge1xuICB0eXBlID0gdHlwZSB8fCBnbC5BUlJBWV9CVUZGRVJcbiAgdXNhZ2UgPSB1c2FnZSB8fCBnbC5EWU5BTUlDX0RSQVdcbiAgaWYodHlwZSAhPT0gZ2wuQVJSQVlfQlVGRkVSICYmIHR5cGUgIT09IGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJbnZhbGlkIHR5cGUgZm9yIHdlYmdsIGJ1ZmZlciwgbXVzdCBiZSBlaXRoZXIgZ2wuQVJSQVlfQlVGRkVSIG9yIGdsLkVMRU1FTlRfQVJSQVlfQlVGRkVSXCIpXG4gIH1cbiAgaWYodXNhZ2UgIT09IGdsLkRZTkFNSUNfRFJBVyAmJiB1c2FnZSAhPT0gZ2wuU1RBVElDX0RSQVcgJiYgdXNhZ2UgIT09IGdsLlNUUkVBTV9EUkFXKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiZ2wtYnVmZmVyOiBJbnZhbGlkIHVzYWdlIGZvciBidWZmZXIsIG11c3QgYmUgZWl0aGVyIGdsLkRZTkFNSUNfRFJBVywgZ2wuU1RBVElDX0RSQVcgb3IgZ2wuU1RSRUFNX0RSQVdcIilcbiAgfVxuICB2YXIgaGFuZGxlID0gZ2wuY3JlYXRlQnVmZmVyKClcbiAgdmFyIHJlc3VsdCA9IG5ldyBHTEJ1ZmZlcihnbCwgdHlwZSwgaGFuZGxlLCAwLCB1c2FnZSlcbiAgcmVzdWx0LnVwZGF0ZShkYXRhKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQnVmZmVyXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9nbC1idWZmZXIvYnVmZmVyLmpzXG4vLyBtb2R1bGUgaWQgPSA0MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxudmFyIGJpdHMgPSByZXF1aXJlKCdiaXQtdHdpZGRsZScpXG52YXIgZHVwID0gcmVxdWlyZSgnZHVwJylcblxuLy9MZWdhY3kgcG9vbCBzdXBwb3J0XG5pZighZ2xvYmFsLl9fVFlQRURBUlJBWV9QT09MKSB7XG4gIGdsb2JhbC5fX1RZUEVEQVJSQVlfUE9PTCA9IHtcbiAgICAgIFVJTlQ4ICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQxNiAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQzMiAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDggICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDE2ICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIElOVDMyICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIEZMT0FUICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIERPVUJMRSAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIERBVEEgICAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIFVJTlQ4QyAgOiBkdXAoWzMyLCAwXSlcbiAgICAsIEJVRkZFUiAgOiBkdXAoWzMyLCAwXSlcbiAgfVxufVxuXG52YXIgaGFzVWludDhDID0gKHR5cGVvZiBVaW50OENsYW1wZWRBcnJheSkgIT09ICd1bmRlZmluZWQnXG52YXIgUE9PTCA9IGdsb2JhbC5fX1RZUEVEQVJSQVlfUE9PTFxuXG4vL1VwZ3JhZGUgcG9vbFxuaWYoIVBPT0wuVUlOVDhDKSB7XG4gIFBPT0wuVUlOVDhDID0gZHVwKFszMiwgMF0pXG59XG5pZighUE9PTC5CVUZGRVIpIHtcbiAgUE9PTC5CVUZGRVIgPSBkdXAoWzMyLCAwXSlcbn1cblxuLy9OZXcgdGVjaG5pcXVlOiBPbmx5IGFsbG9jYXRlIGZyb20gQXJyYXlCdWZmZXJWaWV3IGFuZCBCdWZmZXJcbnZhciBEQVRBICAgID0gUE9PTC5EQVRBXG4gICwgQlVGRkVSICA9IFBPT0wuQlVGRkVSXG5cbmV4cG9ydHMuZnJlZSA9IGZ1bmN0aW9uIGZyZWUoYXJyYXkpIHtcbiAgaWYoQnVmZmVyLmlzQnVmZmVyKGFycmF5KSkge1xuICAgIEJVRkZFUltiaXRzLmxvZzIoYXJyYXkubGVuZ3RoKV0ucHVzaChhcnJheSlcbiAgfSBlbHNlIHtcbiAgICBpZihPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJyYXkpICE9PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nKSB7XG4gICAgICBhcnJheSA9IGFycmF5LmJ1ZmZlclxuICAgIH1cbiAgICBpZighYXJyYXkpIHtcbiAgICAgIHJldHVyblxuICAgIH1cbiAgICB2YXIgbiA9IGFycmF5Lmxlbmd0aCB8fCBhcnJheS5ieXRlTGVuZ3RoXG4gICAgdmFyIGxvZ19uID0gYml0cy5sb2cyKG4pfDBcbiAgICBEQVRBW2xvZ19uXS5wdXNoKGFycmF5KVxuICB9XG59XG5cbmZ1bmN0aW9uIGZyZWVBcnJheUJ1ZmZlcihidWZmZXIpIHtcbiAgaWYoIWJ1ZmZlcikge1xuICAgIHJldHVyblxuICB9XG4gIHZhciBuID0gYnVmZmVyLmxlbmd0aCB8fCBidWZmZXIuYnl0ZUxlbmd0aFxuICB2YXIgbG9nX24gPSBiaXRzLmxvZzIobilcbiAgREFUQVtsb2dfbl0ucHVzaChidWZmZXIpXG59XG5cbmZ1bmN0aW9uIGZyZWVUeXBlZEFycmF5KGFycmF5KSB7XG4gIGZyZWVBcnJheUJ1ZmZlcihhcnJheS5idWZmZXIpXG59XG5cbmV4cG9ydHMuZnJlZVVpbnQ4ID1cbmV4cG9ydHMuZnJlZVVpbnQxNiA9XG5leHBvcnRzLmZyZWVVaW50MzIgPVxuZXhwb3J0cy5mcmVlSW50OCA9XG5leHBvcnRzLmZyZWVJbnQxNiA9XG5leHBvcnRzLmZyZWVJbnQzMiA9XG5leHBvcnRzLmZyZWVGbG9hdDMyID0gXG5leHBvcnRzLmZyZWVGbG9hdCA9XG5leHBvcnRzLmZyZWVGbG9hdDY0ID0gXG5leHBvcnRzLmZyZWVEb3VibGUgPSBcbmV4cG9ydHMuZnJlZVVpbnQ4Q2xhbXBlZCA9IFxuZXhwb3J0cy5mcmVlRGF0YVZpZXcgPSBmcmVlVHlwZWRBcnJheVxuXG5leHBvcnRzLmZyZWVBcnJheUJ1ZmZlciA9IGZyZWVBcnJheUJ1ZmZlclxuXG5leHBvcnRzLmZyZWVCdWZmZXIgPSBmdW5jdGlvbiBmcmVlQnVmZmVyKGFycmF5KSB7XG4gIEJVRkZFUltiaXRzLmxvZzIoYXJyYXkubGVuZ3RoKV0ucHVzaChhcnJheSlcbn1cblxuZXhwb3J0cy5tYWxsb2MgPSBmdW5jdGlvbiBtYWxsb2MobiwgZHR5cGUpIHtcbiAgaWYoZHR5cGUgPT09IHVuZGVmaW5lZCB8fCBkdHlwZSA9PT0gJ2FycmF5YnVmZmVyJykge1xuICAgIHJldHVybiBtYWxsb2NBcnJheUJ1ZmZlcihuKVxuICB9IGVsc2Uge1xuICAgIHN3aXRjaChkdHlwZSkge1xuICAgICAgY2FzZSAndWludDgnOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDgobilcbiAgICAgIGNhc2UgJ3VpbnQxNic6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50MTYobilcbiAgICAgIGNhc2UgJ3VpbnQzMic6XG4gICAgICAgIHJldHVybiBtYWxsb2NVaW50MzIobilcbiAgICAgIGNhc2UgJ2ludDgnOlxuICAgICAgICByZXR1cm4gbWFsbG9jSW50OChuKVxuICAgICAgY2FzZSAnaW50MTYnOlxuICAgICAgICByZXR1cm4gbWFsbG9jSW50MTYobilcbiAgICAgIGNhc2UgJ2ludDMyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0ludDMyKG4pXG4gICAgICBjYXNlICdmbG9hdCc6XG4gICAgICBjYXNlICdmbG9hdDMyJzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0Zsb2F0KG4pXG4gICAgICBjYXNlICdkb3VibGUnOlxuICAgICAgY2FzZSAnZmxvYXQ2NCc6XG4gICAgICAgIHJldHVybiBtYWxsb2NEb3VibGUobilcbiAgICAgIGNhc2UgJ3VpbnQ4X2NsYW1wZWQnOlxuICAgICAgICByZXR1cm4gbWFsbG9jVWludDhDbGFtcGVkKG4pXG4gICAgICBjYXNlICdidWZmZXInOlxuICAgICAgICByZXR1cm4gbWFsbG9jQnVmZmVyKG4pXG4gICAgICBjYXNlICdkYXRhJzpcbiAgICAgIGNhc2UgJ2RhdGF2aWV3JzpcbiAgICAgICAgcmV0dXJuIG1hbGxvY0RhdGFWaWV3KG4pXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHJldHVybiBudWxsXG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsXG59XG5cbmZ1bmN0aW9uIG1hbGxvY0FycmF5QnVmZmVyKG4pIHtcbiAgdmFyIG4gPSBiaXRzLm5leHRQb3cyKG4pXG4gIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKVxuICB2YXIgZCA9IERBVEFbbG9nX25dXG4gIGlmKGQubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiBkLnBvcCgpXG4gIH1cbiAgcmV0dXJuIG5ldyBBcnJheUJ1ZmZlcihuKVxufVxuZXhwb3J0cy5tYWxsb2NBcnJheUJ1ZmZlciA9IG1hbGxvY0FycmF5QnVmZmVyXG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQ4KG4pIHtcbiAgcmV0dXJuIG5ldyBVaW50OEFycmF5KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NVaW50OCA9IG1hbGxvY1VpbnQ4XG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQxNihuKSB7XG4gIHJldHVybiBuZXcgVWludDE2QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoMipuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jVWludDE2ID0gbWFsbG9jVWludDE2XG5cbmZ1bmN0aW9uIG1hbGxvY1VpbnQzMihuKSB7XG4gIHJldHVybiBuZXcgVWludDMyQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoNCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jVWludDMyID0gbWFsbG9jVWludDMyXG5cbmZ1bmN0aW9uIG1hbGxvY0ludDgobikge1xuICByZXR1cm4gbmV3IEludDhBcnJheShtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jSW50OCA9IG1hbGxvY0ludDhcblxuZnVuY3Rpb24gbWFsbG9jSW50MTYobikge1xuICByZXR1cm4gbmV3IEludDE2QXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoMipuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jSW50MTYgPSBtYWxsb2NJbnQxNlxuXG5mdW5jdGlvbiBtYWxsb2NJbnQzMihuKSB7XG4gIHJldHVybiBuZXcgSW50MzJBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig0Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NJbnQzMiA9IG1hbGxvY0ludDMyXG5cbmZ1bmN0aW9uIG1hbGxvY0Zsb2F0KG4pIHtcbiAgcmV0dXJuIG5ldyBGbG9hdDMyQXJyYXkobWFsbG9jQXJyYXlCdWZmZXIoNCpuKSwgMCwgbilcbn1cbmV4cG9ydHMubWFsbG9jRmxvYXQzMiA9IGV4cG9ydHMubWFsbG9jRmxvYXQgPSBtYWxsb2NGbG9hdFxuXG5mdW5jdGlvbiBtYWxsb2NEb3VibGUobikge1xuICByZXR1cm4gbmV3IEZsb2F0NjRBcnJheShtYWxsb2NBcnJheUJ1ZmZlcig4Km4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NGbG9hdDY0ID0gZXhwb3J0cy5tYWxsb2NEb3VibGUgPSBtYWxsb2NEb3VibGVcblxuZnVuY3Rpb24gbWFsbG9jVWludDhDbGFtcGVkKG4pIHtcbiAgaWYoaGFzVWludDhDKSB7XG4gICAgcmV0dXJuIG5ldyBVaW50OENsYW1wZWRBcnJheShtYWxsb2NBcnJheUJ1ZmZlcihuKSwgMCwgbilcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbWFsbG9jVWludDgobilcbiAgfVxufVxuZXhwb3J0cy5tYWxsb2NVaW50OENsYW1wZWQgPSBtYWxsb2NVaW50OENsYW1wZWRcblxuZnVuY3Rpb24gbWFsbG9jRGF0YVZpZXcobikge1xuICByZXR1cm4gbmV3IERhdGFWaWV3KG1hbGxvY0FycmF5QnVmZmVyKG4pLCAwLCBuKVxufVxuZXhwb3J0cy5tYWxsb2NEYXRhVmlldyA9IG1hbGxvY0RhdGFWaWV3XG5cbmZ1bmN0aW9uIG1hbGxvY0J1ZmZlcihuKSB7XG4gIG4gPSBiaXRzLm5leHRQb3cyKG4pXG4gIHZhciBsb2dfbiA9IGJpdHMubG9nMihuKVxuICB2YXIgY2FjaGUgPSBCVUZGRVJbbG9nX25dXG4gIGlmKGNhY2hlLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4gY2FjaGUucG9wKClcbiAgfVxuICByZXR1cm4gbmV3IEJ1ZmZlcihuKVxufVxuZXhwb3J0cy5tYWxsb2NCdWZmZXIgPSBtYWxsb2NCdWZmZXJcblxuZXhwb3J0cy5jbGVhckNhY2hlID0gZnVuY3Rpb24gY2xlYXJDYWNoZSgpIHtcbiAgZm9yKHZhciBpPTA7IGk8MzI7ICsraSkge1xuICAgIFBPT0wuVUlOVDhbaV0ubGVuZ3RoID0gMFxuICAgIFBPT0wuVUlOVDE2W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLlVJTlQzMltpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5JTlQ4W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLklOVDE2W2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLklOVDMyW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLkZMT0FUW2ldLmxlbmd0aCA9IDBcbiAgICBQT09MLkRPVUJMRVtpXS5sZW5ndGggPSAwXG4gICAgUE9PTC5VSU5UOENbaV0ubGVuZ3RoID0gMFxuICAgIERBVEFbaV0ubGVuZ3RoID0gMFxuICAgIEJVRkZFUltpXS5sZW5ndGggPSAwXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy90eXBlZGFycmF5LXBvb2wvcG9vbC5qc1xuLy8gbW9kdWxlIGlkID0gNDNcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiLyohXG4gKiBUaGUgYnVmZmVyIG1vZHVsZSBmcm9tIG5vZGUuanMsIGZvciB0aGUgYnJvd3Nlci5cbiAqXG4gKiBAYXV0aG9yICAgRmVyb3NzIEFib3VraGFkaWplaCA8ZmVyb3NzQGZlcm9zcy5vcmc+IDxodHRwOi8vZmVyb3NzLm9yZz5cbiAqIEBsaWNlbnNlICBNSVRcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcHJvdG8gKi9cblxuJ3VzZSBzdHJpY3QnXG5cbnZhciBiYXNlNjQgPSByZXF1aXJlKCdiYXNlNjQtanMnKVxudmFyIGllZWU3NTQgPSByZXF1aXJlKCdpZWVlNzU0JylcbnZhciBpc0FycmF5ID0gcmVxdWlyZSgnaXNhcnJheScpXG5cbmV4cG9ydHMuQnVmZmVyID0gQnVmZmVyXG5leHBvcnRzLlNsb3dCdWZmZXIgPSBTbG93QnVmZmVyXG5leHBvcnRzLklOU1BFQ1RfTUFYX0JZVEVTID0gNTBcblxuLyoqXG4gKiBJZiBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgOlxuICogICA9PT0gdHJ1ZSAgICBVc2UgVWludDhBcnJheSBpbXBsZW1lbnRhdGlvbiAoZmFzdGVzdClcbiAqICAgPT09IGZhbHNlICAgVXNlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiAobW9zdCBjb21wYXRpYmxlLCBldmVuIElFNilcbiAqXG4gKiBCcm93c2VycyB0aGF0IHN1cHBvcnQgdHlwZWQgYXJyYXlzIGFyZSBJRSAxMCssIEZpcmVmb3ggNCssIENocm9tZSA3KywgU2FmYXJpIDUuMSssXG4gKiBPcGVyYSAxMS42KywgaU9TIDQuMisuXG4gKlxuICogRHVlIHRvIHZhcmlvdXMgYnJvd3NlciBidWdzLCBzb21ldGltZXMgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiB3aWxsIGJlIHVzZWQgZXZlblxuICogd2hlbiB0aGUgYnJvd3NlciBzdXBwb3J0cyB0eXBlZCBhcnJheXMuXG4gKlxuICogTm90ZTpcbiAqXG4gKiAgIC0gRmlyZWZveCA0LTI5IGxhY2tzIHN1cHBvcnQgZm9yIGFkZGluZyBuZXcgcHJvcGVydGllcyB0byBgVWludDhBcnJheWAgaW5zdGFuY2VzLFxuICogICAgIFNlZTogaHR0cHM6Ly9idWd6aWxsYS5tb3ppbGxhLm9yZy9zaG93X2J1Zy5jZ2k/aWQ9Njk1NDM4LlxuICpcbiAqICAgLSBDaHJvbWUgOS0xMCBpcyBtaXNzaW5nIHRoZSBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uLlxuICpcbiAqICAgLSBJRTEwIGhhcyBhIGJyb2tlbiBgVHlwZWRBcnJheS5wcm90b3R5cGUuc3ViYXJyYXlgIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYXJyYXlzIG9mXG4gKiAgICAgaW5jb3JyZWN0IGxlbmd0aCBpbiBzb21lIHNpdHVhdGlvbnMuXG5cbiAqIFdlIGRldGVjdCB0aGVzZSBidWdneSBicm93c2VycyBhbmQgc2V0IGBCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVGAgdG8gYGZhbHNlYCBzbyB0aGV5XG4gKiBnZXQgdGhlIE9iamVjdCBpbXBsZW1lbnRhdGlvbiwgd2hpY2ggaXMgc2xvd2VyIGJ1dCBiZWhhdmVzIGNvcnJlY3RseS5cbiAqL1xuQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgPSBnbG9iYWwuVFlQRURfQVJSQVlfU1VQUE9SVCAhPT0gdW5kZWZpbmVkXG4gID8gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgOiB0eXBlZEFycmF5U3VwcG9ydCgpXG5cbi8qXG4gKiBFeHBvcnQga01heExlbmd0aCBhZnRlciB0eXBlZCBhcnJheSBzdXBwb3J0IGlzIGRldGVybWluZWQuXG4gKi9cbmV4cG9ydHMua01heExlbmd0aCA9IGtNYXhMZW5ndGgoKVxuXG5mdW5jdGlvbiB0eXBlZEFycmF5U3VwcG9ydCAoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGFyciA9IG5ldyBVaW50OEFycmF5KDEpXG4gICAgYXJyLl9fcHJvdG9fXyA9IHtfX3Byb3RvX186IFVpbnQ4QXJyYXkucHJvdG90eXBlLCBmb286IGZ1bmN0aW9uICgpIHsgcmV0dXJuIDQyIH19XG4gICAgcmV0dXJuIGFyci5mb28oKSA9PT0gNDIgJiYgLy8gdHlwZWQgYXJyYXkgaW5zdGFuY2VzIGNhbiBiZSBhdWdtZW50ZWRcbiAgICAgICAgdHlwZW9mIGFyci5zdWJhcnJheSA9PT0gJ2Z1bmN0aW9uJyAmJiAvLyBjaHJvbWUgOS0xMCBsYWNrIGBzdWJhcnJheWBcbiAgICAgICAgYXJyLnN1YmFycmF5KDEsIDEpLmJ5dGVMZW5ndGggPT09IDAgLy8gaWUxMCBoYXMgYnJva2VuIGBzdWJhcnJheWBcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZVxuICB9XG59XG5cbmZ1bmN0aW9uIGtNYXhMZW5ndGggKCkge1xuICByZXR1cm4gQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRcbiAgICA/IDB4N2ZmZmZmZmZcbiAgICA6IDB4M2ZmZmZmZmZcbn1cblxuZnVuY3Rpb24gY3JlYXRlQnVmZmVyICh0aGF0LCBsZW5ndGgpIHtcbiAgaWYgKGtNYXhMZW5ndGgoKSA8IGxlbmd0aCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbnZhbGlkIHR5cGVkIGFycmF5IGxlbmd0aCcpXG4gIH1cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IG5ldyBVaW50OEFycmF5KGxlbmd0aClcbiAgICB0aGF0Ll9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICAvLyBGYWxsYmFjazogUmV0dXJuIGFuIG9iamVjdCBpbnN0YW5jZSBvZiB0aGUgQnVmZmVyIGNsYXNzXG4gICAgaWYgKHRoYXQgPT09IG51bGwpIHtcbiAgICAgIHRoYXQgPSBuZXcgQnVmZmVyKGxlbmd0aClcbiAgICB9XG4gICAgdGhhdC5sZW5ndGggPSBsZW5ndGhcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogVGhlIEJ1ZmZlciBjb25zdHJ1Y3RvciByZXR1cm5zIGluc3RhbmNlcyBvZiBgVWludDhBcnJheWAgdGhhdCBoYXZlIHRoZWlyXG4gKiBwcm90b3R5cGUgY2hhbmdlZCB0byBgQnVmZmVyLnByb3RvdHlwZWAuIEZ1cnRoZXJtb3JlLCBgQnVmZmVyYCBpcyBhIHN1YmNsYXNzIG9mXG4gKiBgVWludDhBcnJheWAsIHNvIHRoZSByZXR1cm5lZCBpbnN0YW5jZXMgd2lsbCBoYXZlIGFsbCB0aGUgbm9kZSBgQnVmZmVyYCBtZXRob2RzXG4gKiBhbmQgdGhlIGBVaW50OEFycmF5YCBtZXRob2RzLiBTcXVhcmUgYnJhY2tldCBub3RhdGlvbiB3b3JrcyBhcyBleHBlY3RlZCAtLSBpdFxuICogcmV0dXJucyBhIHNpbmdsZSBvY3RldC5cbiAqXG4gKiBUaGUgYFVpbnQ4QXJyYXlgIHByb3RvdHlwZSByZW1haW5zIHVubW9kaWZpZWQuXG4gKi9cblxuZnVuY3Rpb24gQnVmZmVyIChhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmICEodGhpcyBpbnN0YW5jZW9mIEJ1ZmZlcikpIHtcbiAgICByZXR1cm4gbmV3IEJ1ZmZlcihhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIC8vIENvbW1vbiBjYXNlLlxuICBpZiAodHlwZW9mIGFyZyA9PT0gJ251bWJlcicpIHtcbiAgICBpZiAodHlwZW9mIGVuY29kaW5nT3JPZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdJZiBlbmNvZGluZyBpcyBzcGVjaWZpZWQgdGhlbiB0aGUgZmlyc3QgYXJndW1lbnQgbXVzdCBiZSBhIHN0cmluZydcbiAgICAgIClcbiAgICB9XG4gICAgcmV0dXJuIGFsbG9jVW5zYWZlKHRoaXMsIGFyZylcbiAgfVxuICByZXR1cm4gZnJvbSh0aGlzLCBhcmcsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnBvb2xTaXplID0gODE5MiAvLyBub3QgdXNlZCBieSB0aGlzIGltcGxlbWVudGF0aW9uXG5cbi8vIFRPRE86IExlZ2FjeSwgbm90IG5lZWRlZCBhbnltb3JlLiBSZW1vdmUgaW4gbmV4dCBtYWpvciB2ZXJzaW9uLlxuQnVmZmVyLl9hdWdtZW50ID0gZnVuY3Rpb24gKGFycikge1xuICBhcnIuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIGZyb20gKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInZhbHVlXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgYSBudW1iZXInKVxuICB9XG5cbiAgaWYgKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsdWUgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikge1xuICAgIHJldHVybiBmcm9tQXJyYXlCdWZmZXIodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIGZyb21TdHJpbmcodGhhdCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQpXG4gIH1cblxuICByZXR1cm4gZnJvbU9iamVjdCh0aGF0LCB2YWx1ZSlcbn1cblxuLyoqXG4gKiBGdW5jdGlvbmFsbHkgZXF1aXZhbGVudCB0byBCdWZmZXIoYXJnLCBlbmNvZGluZykgYnV0IHRocm93cyBhIFR5cGVFcnJvclxuICogaWYgdmFsdWUgaXMgYSBudW1iZXIuXG4gKiBCdWZmZXIuZnJvbShzdHJbLCBlbmNvZGluZ10pXG4gKiBCdWZmZXIuZnJvbShhcnJheSlcbiAqIEJ1ZmZlci5mcm9tKGJ1ZmZlcilcbiAqIEJ1ZmZlci5mcm9tKGFycmF5QnVmZmVyWywgYnl0ZU9mZnNldFssIGxlbmd0aF1dKVxuICoqL1xuQnVmZmVyLmZyb20gPSBmdW5jdGlvbiAodmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gZnJvbShudWxsLCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKVxufVxuXG5pZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgQnVmZmVyLnByb3RvdHlwZS5fX3Byb3RvX18gPSBVaW50OEFycmF5LnByb3RvdHlwZVxuICBCdWZmZXIuX19wcm90b19fID0gVWludDhBcnJheVxuICBpZiAodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnNwZWNpZXMgJiZcbiAgICAgIEJ1ZmZlcltTeW1ib2wuc3BlY2llc10gPT09IEJ1ZmZlcikge1xuICAgIC8vIEZpeCBzdWJhcnJheSgpIGluIEVTMjAxNi4gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vZmVyb3NzL2J1ZmZlci9wdWxsLzk3XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJ1ZmZlciwgU3ltYm9sLnNwZWNpZXMsIHtcbiAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSlcbiAgfVxufVxuXG5mdW5jdGlvbiBhc3NlcnRTaXplIChzaXplKSB7XG4gIGlmICh0eXBlb2Ygc2l6ZSAhPT0gJ251bWJlcicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IGJlIGEgbnVtYmVyJylcbiAgfSBlbHNlIGlmIChzaXplIDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcInNpemVcIiBhcmd1bWVudCBtdXN0IG5vdCBiZSBuZWdhdGl2ZScpXG4gIH1cbn1cblxuZnVuY3Rpb24gYWxsb2MgKHRoYXQsIHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIGFzc2VydFNpemUoc2l6ZSlcbiAgaWYgKHNpemUgPD0gMCkge1xuICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbiAgfVxuICBpZiAoZmlsbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgLy8gT25seSBwYXkgYXR0ZW50aW9uIHRvIGVuY29kaW5nIGlmIGl0J3MgYSBzdHJpbmcuIFRoaXNcbiAgICAvLyBwcmV2ZW50cyBhY2NpZGVudGFsbHkgc2VuZGluZyBpbiBhIG51bWJlciB0aGF0IHdvdWxkXG4gICAgLy8gYmUgaW50ZXJwcmV0dGVkIGFzIGEgc3RhcnQgb2Zmc2V0LlxuICAgIHJldHVybiB0eXBlb2YgZW5jb2RpbmcgPT09ICdzdHJpbmcnXG4gICAgICA/IGNyZWF0ZUJ1ZmZlcih0aGF0LCBzaXplKS5maWxsKGZpbGwsIGVuY29kaW5nKVxuICAgICAgOiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsKVxuICB9XG4gIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSlcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IGZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKiBhbGxvYyhzaXplWywgZmlsbFssIGVuY29kaW5nXV0pXG4gKiovXG5CdWZmZXIuYWxsb2MgPSBmdW5jdGlvbiAoc2l6ZSwgZmlsbCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGFsbG9jKG51bGwsIHNpemUsIGZpbGwsIGVuY29kaW5nKVxufVxuXG5mdW5jdGlvbiBhbGxvY1Vuc2FmZSAodGhhdCwgc2l6ZSkge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIHRoYXQgPSBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSA8IDAgPyAwIDogY2hlY2tlZChzaXplKSB8IDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNpemU7ICsraSkge1xuICAgICAgdGhhdFtpXSA9IDBcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoYXRcbn1cblxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIEJ1ZmZlcihudW0pLCBieSBkZWZhdWx0IGNyZWF0ZXMgYSBub24temVyby1maWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZSA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuLyoqXG4gKiBFcXVpdmFsZW50IHRvIFNsb3dCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqL1xuQnVmZmVyLmFsbG9jVW5zYWZlU2xvdyA9IGZ1bmN0aW9uIChzaXplKSB7XG4gIHJldHVybiBhbGxvY1Vuc2FmZShudWxsLCBzaXplKVxufVxuXG5mdW5jdGlvbiBmcm9tU3RyaW5nICh0aGF0LCBzdHJpbmcsIGVuY29kaW5nKSB7XG4gIGlmICh0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnIHx8IGVuY29kaW5nID09PSAnJykge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gIH1cblxuICBpZiAoIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiZW5jb2RpbmdcIiBtdXN0IGJlIGEgdmFsaWQgc3RyaW5nIGVuY29kaW5nJylcbiAgfVxuXG4gIHZhciBsZW5ndGggPSBieXRlTGVuZ3RoKHN0cmluZywgZW5jb2RpbmcpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcblxuICB2YXIgYWN0dWFsID0gdGhhdC53cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuXG4gIGlmIChhY3R1YWwgIT09IGxlbmd0aCkge1xuICAgIC8vIFdyaXRpbmcgYSBoZXggc3RyaW5nLCBmb3IgZXhhbXBsZSwgdGhhdCBjb250YWlucyBpbnZhbGlkIGNoYXJhY3RlcnMgd2lsbFxuICAgIC8vIGNhdXNlIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0IGludmFsaWQgY2hhcmFjdGVyIHRvIGJlIGlnbm9yZWQuIChlLmcuXG4gICAgLy8gJ2FieHhjZCcgd2lsbCBiZSB0cmVhdGVkIGFzICdhYicpXG4gICAgdGhhdCA9IHRoYXQuc2xpY2UoMCwgYWN0dWFsKVxuICB9XG5cbiAgcmV0dXJuIHRoYXRcbn1cblxuZnVuY3Rpb24gZnJvbUFycmF5TGlrZSAodGhhdCwgYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aCA8IDAgPyAwIDogY2hlY2tlZChhcnJheS5sZW5ndGgpIHwgMFxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbmd0aClcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkgKz0gMSkge1xuICAgIHRoYXRbaV0gPSBhcnJheVtpXSAmIDI1NVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUJ1ZmZlciAodGhhdCwgYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aCkge1xuICBhcnJheS5ieXRlTGVuZ3RoIC8vIHRoaXMgdGhyb3dzIGlmIGBhcnJheWAgaXMgbm90IGEgdmFsaWQgQXJyYXlCdWZmZXJcblxuICBpZiAoYnl0ZU9mZnNldCA8IDAgfHwgYXJyYXkuYnl0ZUxlbmd0aCA8IGJ5dGVPZmZzZXQpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnb2Zmc2V0XFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0ICsgKGxlbmd0aCB8fCAwKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdcXCdsZW5ndGhcXCcgaXMgb3V0IG9mIGJvdW5kcycpXG4gIH1cblxuICBpZiAoYnl0ZU9mZnNldCA9PT0gdW5kZWZpbmVkICYmIGxlbmd0aCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSlcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQpXG4gIH0gZWxzZSB7XG4gICAgYXJyYXkgPSBuZXcgVWludDhBcnJheShhcnJheSwgYnl0ZU9mZnNldCwgbGVuZ3RoKVxuICB9XG5cbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gUmV0dXJuIGFuIGF1Z21lbnRlZCBgVWludDhBcnJheWAgaW5zdGFuY2UsIGZvciBiZXN0IHBlcmZvcm1hbmNlXG4gICAgdGhhdCA9IGFycmF5XG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIHRoYXQgPSBmcm9tQXJyYXlMaWtlKHRoYXQsIGFycmF5KVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21PYmplY3QgKHRoYXQsIG9iaikge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKG9iaikpIHtcbiAgICB2YXIgbGVuID0gY2hlY2tlZChvYmoubGVuZ3RoKSB8IDBcbiAgICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIGxlbilcblxuICAgIGlmICh0aGF0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIHRoYXRcbiAgICB9XG5cbiAgICBvYmouY29weSh0aGF0LCAwLCAwLCBsZW4pXG4gICAgcmV0dXJuIHRoYXRcbiAgfVxuXG4gIGlmIChvYmopIHtcbiAgICBpZiAoKHR5cGVvZiBBcnJheUJ1ZmZlciAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICAgICAgb2JqLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB8fCAnbGVuZ3RoJyBpbiBvYmopIHtcbiAgICAgIGlmICh0eXBlb2Ygb2JqLmxlbmd0aCAhPT0gJ251bWJlcicgfHwgaXNuYW4ob2JqLmxlbmd0aCkpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUJ1ZmZlcih0aGF0LCAwKVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21BcnJheUxpa2UodGhhdCwgb2JqKVxuICAgIH1cblxuICAgIGlmIChvYmoudHlwZSA9PT0gJ0J1ZmZlcicgJiYgaXNBcnJheShvYmouZGF0YSkpIHtcbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iai5kYXRhKVxuICAgIH1cbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcsIEJ1ZmZlciwgQXJyYXlCdWZmZXIsIEFycmF5LCBvciBhcnJheS1saWtlIG9iamVjdC4nKVxufVxuXG5mdW5jdGlvbiBjaGVja2VkIChsZW5ndGgpIHtcbiAgLy8gTm90ZTogY2Fubm90IHVzZSBgbGVuZ3RoIDwga01heExlbmd0aCgpYCBoZXJlIGJlY2F1c2UgdGhhdCBmYWlscyB3aGVuXG4gIC8vIGxlbmd0aCBpcyBOYU4gKHdoaWNoIGlzIG90aGVyd2lzZSBjb2VyY2VkIHRvIHplcm8uKVxuICBpZiAobGVuZ3RoID49IGtNYXhMZW5ndGgoKSkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdBdHRlbXB0IHRvIGFsbG9jYXRlIEJ1ZmZlciBsYXJnZXIgdGhhbiBtYXhpbXVtICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICdzaXplOiAweCcgKyBrTWF4TGVuZ3RoKCkudG9TdHJpbmcoMTYpICsgJyBieXRlcycpXG4gIH1cbiAgcmV0dXJuIGxlbmd0aCB8IDBcbn1cblxuZnVuY3Rpb24gU2xvd0J1ZmZlciAobGVuZ3RoKSB7XG4gIGlmICgrbGVuZ3RoICE9IGxlbmd0aCkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVxZXFlcVxuICAgIGxlbmd0aCA9IDBcbiAgfVxuICByZXR1cm4gQnVmZmVyLmFsbG9jKCtsZW5ndGgpXG59XG5cbkJ1ZmZlci5pc0J1ZmZlciA9IGZ1bmN0aW9uIGlzQnVmZmVyIChiKSB7XG4gIHJldHVybiAhIShiICE9IG51bGwgJiYgYi5faXNCdWZmZXIpXG59XG5cbkJ1ZmZlci5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAoYSwgYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihhKSB8fCAhQnVmZmVyLmlzQnVmZmVyKGIpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnRzIG11c3QgYmUgQnVmZmVycycpXG4gIH1cblxuICBpZiAoYSA9PT0gYikgcmV0dXJuIDBcblxuICB2YXIgeCA9IGEubGVuZ3RoXG4gIHZhciB5ID0gYi5sZW5ndGhcblxuICBmb3IgKHZhciBpID0gMCwgbGVuID0gTWF0aC5taW4oeCwgeSk7IGkgPCBsZW47ICsraSkge1xuICAgIGlmIChhW2ldICE9PSBiW2ldKSB7XG4gICAgICB4ID0gYVtpXVxuICAgICAgeSA9IGJbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG5CdWZmZXIuaXNFbmNvZGluZyA9IGZ1bmN0aW9uIGlzRW5jb2RpbmcgKGVuY29kaW5nKSB7XG4gIHN3aXRjaCAoU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpKSB7XG4gICAgY2FzZSAnaGV4JzpcbiAgICBjYXNlICd1dGY4JzpcbiAgICBjYXNlICd1dGYtOCc6XG4gICAgY2FzZSAnYXNjaWknOlxuICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgY2FzZSAnYmluYXJ5JzpcbiAgICBjYXNlICdiYXNlNjQnOlxuICAgIGNhc2UgJ3VjczInOlxuICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICBjYXNlICd1dGYxNmxlJzpcbiAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICByZXR1cm4gdHJ1ZVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5CdWZmZXIuY29uY2F0ID0gZnVuY3Rpb24gY29uY2F0IChsaXN0LCBsZW5ndGgpIHtcbiAgaWYgKCFpc0FycmF5KGxpc3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgfVxuXG4gIGlmIChsaXN0Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiBCdWZmZXIuYWxsb2MoMClcbiAgfVxuXG4gIHZhciBpXG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGxlbmd0aCA9IDBcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgICAgbGVuZ3RoICs9IGxpc3RbaV0ubGVuZ3RoXG4gICAgfVxuICB9XG5cbiAgdmFyIGJ1ZmZlciA9IEJ1ZmZlci5hbGxvY1Vuc2FmZShsZW5ndGgpXG4gIHZhciBwb3MgPSAwXG4gIGZvciAoaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGJ1ZiA9IGxpc3RbaV1cbiAgICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihidWYpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImxpc3RcIiBhcmd1bWVudCBtdXN0IGJlIGFuIEFycmF5IG9mIEJ1ZmZlcnMnKVxuICAgIH1cbiAgICBidWYuY29weShidWZmZXIsIHBvcylcbiAgICBwb3MgKz0gYnVmLmxlbmd0aFxuICB9XG4gIHJldHVybiBidWZmZXJcbn1cblxuZnVuY3Rpb24gYnl0ZUxlbmd0aCAoc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHN0cmluZykpIHtcbiAgICByZXR1cm4gc3RyaW5nLmxlbmd0aFxuICB9XG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBBcnJheUJ1ZmZlci5pc1ZpZXcgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgIChBcnJheUJ1ZmZlci5pc1ZpZXcoc3RyaW5nKSB8fCBzdHJpbmcgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikpIHtcbiAgICByZXR1cm4gc3RyaW5nLmJ5dGVMZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIHN0cmluZyAhPT0gJ3N0cmluZycpIHtcbiAgICBzdHJpbmcgPSAnJyArIHN0cmluZ1xuICB9XG5cbiAgdmFyIGxlbiA9IHN0cmluZy5sZW5ndGhcbiAgaWYgKGxlbiA9PT0gMCkgcmV0dXJuIDBcblxuICAvLyBVc2UgYSBmb3IgbG9vcCB0byBhdm9pZCByZWN1cnNpb25cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGVuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgICByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiBsZW4gKiAyXG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gbGVuID4+PiAxXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0VG9CeXRlcyhzdHJpbmcpLmxlbmd0aFxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSByZXR1cm4gdXRmOFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGggLy8gYXNzdW1lIHV0ZjhcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cbkJ1ZmZlci5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuXG5mdW5jdGlvbiBzbG93VG9TdHJpbmcgKGVuY29kaW5nLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG5cbiAgLy8gTm8gbmVlZCB0byB2ZXJpZnkgdGhhdCBcInRoaXMubGVuZ3RoIDw9IE1BWF9VSU5UMzJcIiBzaW5jZSBpdCdzIGEgcmVhZC1vbmx5XG4gIC8vIHByb3BlcnR5IG9mIGEgdHlwZWQgYXJyYXkuXG5cbiAgLy8gVGhpcyBiZWhhdmVzIG5laXRoZXIgbGlrZSBTdHJpbmcgbm9yIFVpbnQ4QXJyYXkgaW4gdGhhdCB3ZSBzZXQgc3RhcnQvZW5kXG4gIC8vIHRvIHRoZWlyIHVwcGVyL2xvd2VyIGJvdW5kcyBpZiB0aGUgdmFsdWUgcGFzc2VkIGlzIG91dCBvZiByYW5nZS5cbiAgLy8gdW5kZWZpbmVkIGlzIGhhbmRsZWQgc3BlY2lhbGx5IGFzIHBlciBFQ01BLTI2MiA2dGggRWRpdGlvbixcbiAgLy8gU2VjdGlvbiAxMy4zLjMuNyBSdW50aW1lIFNlbWFudGljczogS2V5ZWRCaW5kaW5nSW5pdGlhbGl6YXRpb24uXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkIHx8IHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gMFxuICB9XG4gIC8vIFJldHVybiBlYXJseSBpZiBzdGFydCA+IHRoaXMubGVuZ3RoLiBEb25lIGhlcmUgdG8gcHJldmVudCBwb3RlbnRpYWwgdWludDMyXG4gIC8vIGNvZXJjaW9uIGZhaWwgYmVsb3cuXG4gIGlmIChzdGFydCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoZW5kID09PSB1bmRlZmluZWQgfHwgZW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKGVuZCA8PSAwKSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICAvLyBGb3JjZSBjb2Vyc2lvbiB0byB1aW50MzIuIFRoaXMgd2lsbCBhbHNvIGNvZXJjZSBmYWxzZXkvTmFOIHZhbHVlcyB0byAwLlxuICBlbmQgPj4+PSAwXG4gIHN0YXJ0ID4+Pj0gMFxuXG4gIGlmIChlbmQgPD0gc3RhcnQpIHtcbiAgICByZXR1cm4gJydcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgd2hpbGUgKHRydWUpIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdoZXgnOlxuICAgICAgICByZXR1cm4gaGV4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICAgIHJldHVybiB1dGY4U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnYXNjaWknOlxuICAgICAgICByZXR1cm4gYXNjaWlTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxhdGluMVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2Jhc2U2NCc6XG4gICAgICAgIHJldHVybiBiYXNlNjRTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gdXRmMTZsZVNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgICAgICBlbmNvZGluZyA9IChlbmNvZGluZyArICcnKS50b0xvd2VyQ2FzZSgpXG4gICAgICAgIGxvd2VyZWRDYXNlID0gdHJ1ZVxuICAgIH1cbiAgfVxufVxuXG4vLyBUaGUgcHJvcGVydHkgaXMgdXNlZCBieSBgQnVmZmVyLmlzQnVmZmVyYCBhbmQgYGlzLWJ1ZmZlcmAgKGluIFNhZmFyaSA1LTcpIHRvIGRldGVjdFxuLy8gQnVmZmVyIGluc3RhbmNlcy5cbkJ1ZmZlci5wcm90b3R5cGUuX2lzQnVmZmVyID0gdHJ1ZVxuXG5mdW5jdGlvbiBzd2FwIChiLCBuLCBtKSB7XG4gIHZhciBpID0gYltuXVxuICBiW25dID0gYlttXVxuICBiW21dID0gaVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXAxNiA9IGZ1bmN0aW9uIHN3YXAxNiAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgMiAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgMTYtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gMikge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDEpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMzIgPSBmdW5jdGlvbiBzd2FwMzIgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDQgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDMyLWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDQpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAzKVxuICAgIHN3YXAodGhpcywgaSArIDEsIGkgKyAyKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDY0ID0gZnVuY3Rpb24gc3dhcDY0ICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA4ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiA2NC1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA4KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgNylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgNilcbiAgICBzd2FwKHRoaXMsIGkgKyAyLCBpICsgNSlcbiAgICBzd2FwKHRoaXMsIGkgKyAzLCBpICsgNClcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcgKCkge1xuICB2YXIgbGVuZ3RoID0gdGhpcy5sZW5ndGggfCAwXG4gIGlmIChsZW5ndGggPT09IDApIHJldHVybiAnJ1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHV0ZjhTbGljZSh0aGlzLCAwLCBsZW5ndGgpXG4gIHJldHVybiBzbG93VG9TdHJpbmcuYXBwbHkodGhpcywgYXJndW1lbnRzKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmVxdWFscyA9IGZ1bmN0aW9uIGVxdWFscyAoYikge1xuICBpZiAoIUJ1ZmZlci5pc0J1ZmZlcihiKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignQXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlcicpXG4gIGlmICh0aGlzID09PSBiKSByZXR1cm4gdHJ1ZVxuICByZXR1cm4gQnVmZmVyLmNvbXBhcmUodGhpcywgYikgPT09IDBcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbnNwZWN0ID0gZnVuY3Rpb24gaW5zcGVjdCAoKSB7XG4gIHZhciBzdHIgPSAnJ1xuICB2YXIgbWF4ID0gZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFU1xuICBpZiAodGhpcy5sZW5ndGggPiAwKSB7XG4gICAgc3RyID0gdGhpcy50b1N0cmluZygnaGV4JywgMCwgbWF4KS5tYXRjaCgvLnsyfS9nKS5qb2luKCcgJylcbiAgICBpZiAodGhpcy5sZW5ndGggPiBtYXgpIHN0ciArPSAnIC4uLiAnXG4gIH1cbiAgcmV0dXJuICc8QnVmZmVyICcgKyBzdHIgKyAnPidcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5jb21wYXJlID0gZnVuY3Rpb24gY29tcGFyZSAodGFyZ2V0LCBzdGFydCwgZW5kLCB0aGlzU3RhcnQsIHRoaXNFbmQpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIodGFyZ2V0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICB9XG5cbiAgaWYgKHN0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmQgPSB0YXJnZXQgPyB0YXJnZXQubGVuZ3RoIDogMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNTdGFydCA9IDBcbiAgfVxuICBpZiAodGhpc0VuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhpc0VuZCA9IHRoaXMubGVuZ3RoXG4gIH1cblxuICBpZiAoc3RhcnQgPCAwIHx8IGVuZCA+IHRhcmdldC5sZW5ndGggfHwgdGhpc1N0YXJ0IDwgMCB8fCB0aGlzRW5kID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb3V0IG9mIHJhbmdlIGluZGV4JylcbiAgfVxuXG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCAmJiBzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMFxuICB9XG4gIGlmICh0aGlzU3RhcnQgPj0gdGhpc0VuZCkge1xuICAgIHJldHVybiAtMVxuICB9XG4gIGlmIChzdGFydCA+PSBlbmQpIHtcbiAgICByZXR1cm4gMVxuICB9XG5cbiAgc3RhcnQgPj4+PSAwXG4gIGVuZCA+Pj49IDBcbiAgdGhpc1N0YXJ0ID4+Pj0gMFxuICB0aGlzRW5kID4+Pj0gMFxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQpIHJldHVybiAwXG5cbiAgdmFyIHggPSB0aGlzRW5kIC0gdGhpc1N0YXJ0XG4gIHZhciB5ID0gZW5kIC0gc3RhcnRcbiAgdmFyIGxlbiA9IE1hdGgubWluKHgsIHkpXG5cbiAgdmFyIHRoaXNDb3B5ID0gdGhpcy5zbGljZSh0aGlzU3RhcnQsIHRoaXNFbmQpXG4gIHZhciB0YXJnZXRDb3B5ID0gdGFyZ2V0LnNsaWNlKHN0YXJ0LCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgIGlmICh0aGlzQ29weVtpXSAhPT0gdGFyZ2V0Q29weVtpXSkge1xuICAgICAgeCA9IHRoaXNDb3B5W2ldXG4gICAgICB5ID0gdGFyZ2V0Q29weVtpXVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cblxuICBpZiAoeCA8IHkpIHJldHVybiAtMVxuICBpZiAoeSA8IHgpIHJldHVybiAxXG4gIHJldHVybiAwXG59XG5cbi8vIEZpbmRzIGVpdGhlciB0aGUgZmlyc3QgaW5kZXggb2YgYHZhbGAgaW4gYGJ1ZmZlcmAgYXQgb2Zmc2V0ID49IGBieXRlT2Zmc2V0YCxcbi8vIE9SIHRoZSBsYXN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA8PSBgYnl0ZU9mZnNldGAuXG4vL1xuLy8gQXJndW1lbnRzOlxuLy8gLSBidWZmZXIgLSBhIEJ1ZmZlciB0byBzZWFyY2hcbi8vIC0gdmFsIC0gYSBzdHJpbmcsIEJ1ZmZlciwgb3IgbnVtYmVyXG4vLyAtIGJ5dGVPZmZzZXQgLSBhbiBpbmRleCBpbnRvIGBidWZmZXJgOyB3aWxsIGJlIGNsYW1wZWQgdG8gYW4gaW50MzJcbi8vIC0gZW5jb2RpbmcgLSBhbiBvcHRpb25hbCBlbmNvZGluZywgcmVsZXZhbnQgaXMgdmFsIGlzIGEgc3RyaW5nXG4vLyAtIGRpciAtIHRydWUgZm9yIGluZGV4T2YsIGZhbHNlIGZvciBsYXN0SW5kZXhPZlxuZnVuY3Rpb24gYmlkaXJlY3Rpb25hbEluZGV4T2YgKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIC8vIEVtcHR5IGJ1ZmZlciBtZWFucyBubyBtYXRjaFxuICBpZiAoYnVmZmVyLmxlbmd0aCA9PT0gMCkgcmV0dXJuIC0xXG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXRcbiAgaWYgKHR5cGVvZiBieXRlT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gYnl0ZU9mZnNldFxuICAgIGJ5dGVPZmZzZXQgPSAwXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA+IDB4N2ZmZmZmZmYpIHtcbiAgICBieXRlT2Zmc2V0ID0gMHg3ZmZmZmZmZlxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPCAtMHg4MDAwMDAwMCkge1xuICAgIGJ5dGVPZmZzZXQgPSAtMHg4MDAwMDAwMFxuICB9XG4gIGJ5dGVPZmZzZXQgPSArYnl0ZU9mZnNldCAgLy8gQ29lcmNlIHRvIE51bWJlci5cbiAgaWYgKGlzTmFOKGJ5dGVPZmZzZXQpKSB7XG4gICAgLy8gYnl0ZU9mZnNldDogaXQgaXQncyB1bmRlZmluZWQsIG51bGwsIE5hTiwgXCJmb29cIiwgZXRjLCBzZWFyY2ggd2hvbGUgYnVmZmVyXG4gICAgYnl0ZU9mZnNldCA9IGRpciA/IDAgOiAoYnVmZmVyLmxlbmd0aCAtIDEpXG4gIH1cblxuICAvLyBOb3JtYWxpemUgYnl0ZU9mZnNldDogbmVnYXRpdmUgb2Zmc2V0cyBzdGFydCBmcm9tIHRoZSBlbmQgb2YgdGhlIGJ1ZmZlclxuICBpZiAoYnl0ZU9mZnNldCA8IDApIGJ5dGVPZmZzZXQgPSBidWZmZXIubGVuZ3RoICsgYnl0ZU9mZnNldFxuICBpZiAoYnl0ZU9mZnNldCA+PSBidWZmZXIubGVuZ3RoKSB7XG4gICAgaWYgKGRpcikgcmV0dXJuIC0xXG4gICAgZWxzZSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCAtIDFcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgMCkge1xuICAgIGlmIChkaXIpIGJ5dGVPZmZzZXQgPSAwXG4gICAgZWxzZSByZXR1cm4gLTFcbiAgfVxuXG4gIC8vIE5vcm1hbGl6ZSB2YWxcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnKSB7XG4gICAgdmFsID0gQnVmZmVyLmZyb20odmFsLCBlbmNvZGluZylcbiAgfVxuXG4gIC8vIEZpbmFsbHksIHNlYXJjaCBlaXRoZXIgaW5kZXhPZiAoaWYgZGlyIGlzIHRydWUpIG9yIGxhc3RJbmRleE9mXG4gIGlmIChCdWZmZXIuaXNCdWZmZXIodmFsKSkge1xuICAgIC8vIFNwZWNpYWwgY2FzZTogbG9va2luZyBmb3IgZW1wdHkgc3RyaW5nL2J1ZmZlciBhbHdheXMgZmFpbHNcbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIC0xXG4gICAgfVxuICAgIHJldHVybiBhcnJheUluZGV4T2YoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH0gZWxzZSBpZiAodHlwZW9mIHZhbCA9PT0gJ251bWJlcicpIHtcbiAgICB2YWwgPSB2YWwgJiAweEZGIC8vIFNlYXJjaCBmb3IgYSBieXRlIHZhbHVlIFswLTI1NV1cbiAgICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQgJiZcbiAgICAgICAgdHlwZW9mIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGlmIChkaXIpIHtcbiAgICAgICAgcmV0dXJuIFVpbnQ4QXJyYXkucHJvdG90eXBlLmluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5sYXN0SW5kZXhPZi5jYWxsKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0KVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgWyB2YWwgXSwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcilcbiAgfVxuXG4gIHRocm93IG5ldyBUeXBlRXJyb3IoJ3ZhbCBtdXN0IGJlIHN0cmluZywgbnVtYmVyIG9yIEJ1ZmZlcicpXG59XG5cbmZ1bmN0aW9uIGFycmF5SW5kZXhPZiAoYXJyLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpIHtcbiAgdmFyIGluZGV4U2l6ZSA9IDFcbiAgdmFyIGFyckxlbmd0aCA9IGFyci5sZW5ndGhcbiAgdmFyIHZhbExlbmd0aCA9IHZhbC5sZW5ndGhcblxuICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gU3RyaW5nKGVuY29kaW5nKS50b0xvd2VyQ2FzZSgpXG4gICAgaWYgKGVuY29kaW5nID09PSAndWNzMicgfHwgZW5jb2RpbmcgPT09ICd1Y3MtMicgfHxcbiAgICAgICAgZW5jb2RpbmcgPT09ICd1dGYxNmxlJyB8fCBlbmNvZGluZyA9PT0gJ3V0Zi0xNmxlJykge1xuICAgICAgaWYgKGFyci5sZW5ndGggPCAyIHx8IHZhbC5sZW5ndGggPCAyKSB7XG4gICAgICAgIHJldHVybiAtMVxuICAgICAgfVxuICAgICAgaW5kZXhTaXplID0gMlxuICAgICAgYXJyTGVuZ3RoIC89IDJcbiAgICAgIHZhbExlbmd0aCAvPSAyXG4gICAgICBieXRlT2Zmc2V0IC89IDJcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiByZWFkIChidWYsIGkpIHtcbiAgICBpZiAoaW5kZXhTaXplID09PSAxKSB7XG4gICAgICByZXR1cm4gYnVmW2ldXG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBidWYucmVhZFVJbnQxNkJFKGkgKiBpbmRleFNpemUpXG4gICAgfVxuICB9XG5cbiAgdmFyIGlcbiAgaWYgKGRpcikge1xuICAgIHZhciBmb3VuZEluZGV4ID0gLTFcbiAgICBmb3IgKGkgPSBieXRlT2Zmc2V0OyBpIDwgYXJyTGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChyZWFkKGFyciwgaSkgPT09IHJlYWQodmFsLCBmb3VuZEluZGV4ID09PSAtMSA/IDAgOiBpIC0gZm91bmRJbmRleCkpIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggPT09IC0xKSBmb3VuZEluZGV4ID0gaVxuICAgICAgICBpZiAoaSAtIGZvdW5kSW5kZXggKyAxID09PSB2YWxMZW5ndGgpIHJldHVybiBmb3VuZEluZGV4ICogaW5kZXhTaXplXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoZm91bmRJbmRleCAhPT0gLTEpIGkgLT0gaSAtIGZvdW5kSW5kZXhcbiAgICAgICAgZm91bmRJbmRleCA9IC0xXG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChieXRlT2Zmc2V0ICsgdmFsTGVuZ3RoID4gYXJyTGVuZ3RoKSBieXRlT2Zmc2V0ID0gYXJyTGVuZ3RoIC0gdmFsTGVuZ3RoXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHZhciBmb3VuZCA9IHRydWVcbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdmFsTGVuZ3RoOyBqKyspIHtcbiAgICAgICAgaWYgKHJlYWQoYXJyLCBpICsgaikgIT09IHJlYWQodmFsLCBqKSkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2VcbiAgICAgICAgICBicmVha1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoZm91bmQpIHJldHVybiBpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIC0xXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5jbHVkZXMgPSBmdW5jdGlvbiBpbmNsdWRlcyAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gdGhpcy5pbmRleE9mKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpICE9PSAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluZGV4T2YgPSBmdW5jdGlvbiBpbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCB0cnVlKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmxhc3RJbmRleE9mID0gZnVuY3Rpb24gbGFzdEluZGV4T2YgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIGJpZGlyZWN0aW9uYWxJbmRleE9mKHRoaXMsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGZhbHNlKVxufVxuXG5mdW5jdGlvbiBoZXhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIG9mZnNldCA9IE51bWJlcihvZmZzZXQpIHx8IDBcbiAgdmFyIHJlbWFpbmluZyA9IGJ1Zi5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKCFsZW5ndGgpIHtcbiAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgfSBlbHNlIHtcbiAgICBsZW5ndGggPSBOdW1iZXIobGVuZ3RoKVxuICAgIGlmIChsZW5ndGggPiByZW1haW5pbmcpIHtcbiAgICAgIGxlbmd0aCA9IHJlbWFpbmluZ1xuICAgIH1cbiAgfVxuXG4gIC8vIG11c3QgYmUgYW4gZXZlbiBudW1iZXIgb2YgZGlnaXRzXG4gIHZhciBzdHJMZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChzdHJMZW4gJSAyICE9PSAwKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdJbnZhbGlkIGhleCBzdHJpbmcnKVxuXG4gIGlmIChsZW5ndGggPiBzdHJMZW4gLyAyKSB7XG4gICAgbGVuZ3RoID0gc3RyTGVuIC8gMlxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgcGFyc2VkID0gcGFyc2VJbnQoc3RyaW5nLnN1YnN0cihpICogMiwgMiksIDE2KVxuICAgIGlmIChpc05hTihwYXJzZWQpKSByZXR1cm4gaVxuICAgIGJ1ZltvZmZzZXQgKyBpXSA9IHBhcnNlZFxuICB9XG4gIHJldHVybiBpXG59XG5cbmZ1bmN0aW9uIHV0ZjhXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKHV0ZjhUb0J5dGVzKHN0cmluZywgYnVmLmxlbmd0aCAtIG9mZnNldCksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGFzY2lpV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcihhc2NpaVRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gbGF0aW4xV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYXNjaWlXcml0ZShidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGJhc2U2NFdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYmFzZTY0VG9CeXRlcyhzdHJpbmcpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiB1Y3MyV3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGYxNmxlVG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlID0gZnVuY3Rpb24gd3JpdGUgKHN0cmluZywgb2Zmc2V0LCBsZW5ndGgsIGVuY29kaW5nKSB7XG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcpXG4gIGlmIChvZmZzZXQgPT09IHVuZGVmaW5lZCkge1xuICAgIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIGVuY29kaW5nKVxuICB9IGVsc2UgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvZmZzZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgZW5jb2RpbmcgPSBvZmZzZXRcbiAgICBsZW5ndGggPSB0aGlzLmxlbmd0aFxuICAgIG9mZnNldCA9IDBcbiAgLy8gQnVmZmVyI3dyaXRlKHN0cmluZywgb2Zmc2V0WywgbGVuZ3RoXVssIGVuY29kaW5nXSlcbiAgfSBlbHNlIGlmIChpc0Zpbml0ZShvZmZzZXQpKSB7XG4gICAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICAgIGlmIChpc0Zpbml0ZShsZW5ndGgpKSB7XG4gICAgICBsZW5ndGggPSBsZW5ndGggfCAwXG4gICAgICBpZiAoZW5jb2RpbmcgPT09IHVuZGVmaW5lZCkgZW5jb2RpbmcgPSAndXRmOCdcbiAgICB9IGVsc2Uge1xuICAgICAgZW5jb2RpbmcgPSBsZW5ndGhcbiAgICAgIGxlbmd0aCA9IHVuZGVmaW5lZFxuICAgIH1cbiAgLy8gbGVnYWN5IHdyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldCwgbGVuZ3RoKSAtIHJlbW92ZSBpbiB2MC4xM1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdCdWZmZXIud3JpdGUoc3RyaW5nLCBlbmNvZGluZywgb2Zmc2V0WywgbGVuZ3RoXSkgaXMgbm8gbG9uZ2VyIHN1cHBvcnRlZCdcbiAgICApXG4gIH1cblxuICB2YXIgcmVtYWluaW5nID0gdGhpcy5sZW5ndGggLSBvZmZzZXRcbiAgaWYgKGxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGxlbmd0aCA+IHJlbWFpbmluZykgbGVuZ3RoID0gcmVtYWluaW5nXG5cbiAgaWYgKChzdHJpbmcubGVuZ3RoID4gMCAmJiAobGVuZ3RoIDwgMCB8fCBvZmZzZXQgPCAwKSkgfHwgb2Zmc2V0ID4gdGhpcy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byB3cml0ZSBvdXRzaWRlIGJ1ZmZlciBib3VuZHMnKVxuICB9XG5cbiAgaWYgKCFlbmNvZGluZykgZW5jb2RpbmcgPSAndXRmOCdcblxuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuICBmb3IgKDs7KSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICAvLyBXYXJuaW5nOiBtYXhMZW5ndGggbm90IHRha2VuIGludG8gYWNjb3VudCBpbiBiYXNlNjRXcml0ZVxuICAgICAgICByZXR1cm4gYmFzZTY0V3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHVjczJXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoJycgKyBlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiB0b0pTT04gKCkge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdCdWZmZXInLFxuICAgIGRhdGE6IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHRoaXMuX2FyciB8fCB0aGlzLCAwKVxuICB9XG59XG5cbmZ1bmN0aW9uIGJhc2U2NFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgaWYgKHN0YXJ0ID09PSAwICYmIGVuZCA9PT0gYnVmLmxlbmd0aCkge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYpXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGJhc2U2NC5mcm9tQnl0ZUFycmF5KGJ1Zi5zbGljZShzdGFydCwgZW5kKSlcbiAgfVxufVxuXG5mdW5jdGlvbiB1dGY4U2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG4gIHZhciByZXMgPSBbXVxuXG4gIHZhciBpID0gc3RhcnRcbiAgd2hpbGUgKGkgPCBlbmQpIHtcbiAgICB2YXIgZmlyc3RCeXRlID0gYnVmW2ldXG4gICAgdmFyIGNvZGVQb2ludCA9IG51bGxcbiAgICB2YXIgYnl0ZXNQZXJTZXF1ZW5jZSA9IChmaXJzdEJ5dGUgPiAweEVGKSA/IDRcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4REYpID8gM1xuICAgICAgOiAoZmlyc3RCeXRlID4gMHhCRikgPyAyXG4gICAgICA6IDFcblxuICAgIGlmIChpICsgYnl0ZXNQZXJTZXF1ZW5jZSA8PSBlbmQpIHtcbiAgICAgIHZhciBzZWNvbmRCeXRlLCB0aGlyZEJ5dGUsIGZvdXJ0aEJ5dGUsIHRlbXBDb2RlUG9pbnRcblxuICAgICAgc3dpdGNoIChieXRlc1BlclNlcXVlbmNlKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICBpZiAoZmlyc3RCeXRlIDwgMHg4MCkge1xuICAgICAgICAgICAgY29kZVBvaW50ID0gZmlyc3RCeXRlXG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4MUYpIDw8IDB4NiB8IChzZWNvbmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3Rikge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODApIHtcbiAgICAgICAgICAgIHRlbXBDb2RlUG9pbnQgPSAoZmlyc3RCeXRlICYgMHhGKSA8PCAweEMgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4NiB8ICh0aGlyZEJ5dGUgJiAweDNGKVxuICAgICAgICAgICAgaWYgKHRlbXBDb2RlUG9pbnQgPiAweDdGRiAmJiAodGVtcENvZGVQb2ludCA8IDB4RDgwMCB8fCB0ZW1wQ29kZVBvaW50ID4gMHhERkZGKSkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrXG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICBzZWNvbmRCeXRlID0gYnVmW2kgKyAxXVxuICAgICAgICAgIHRoaXJkQnl0ZSA9IGJ1ZltpICsgMl1cbiAgICAgICAgICBmb3VydGhCeXRlID0gYnVmW2kgKyAzXVxuICAgICAgICAgIGlmICgoc2Vjb25kQnl0ZSAmIDB4QzApID09PSAweDgwICYmICh0aGlyZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAoZm91cnRoQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHgxMiB8IChzZWNvbmRCeXRlICYgMHgzRikgPDwgMHhDIHwgKHRoaXJkQnl0ZSAmIDB4M0YpIDw8IDB4NiB8IChmb3VydGhCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHhGRkZGICYmIHRlbXBDb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgICAgICAgICBjb2RlUG9pbnQgPSB0ZW1wQ29kZVBvaW50XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChjb2RlUG9pbnQgPT09IG51bGwpIHtcbiAgICAgIC8vIHdlIGRpZCBub3QgZ2VuZXJhdGUgYSB2YWxpZCBjb2RlUG9pbnQgc28gaW5zZXJ0IGFcbiAgICAgIC8vIHJlcGxhY2VtZW50IGNoYXIgKFUrRkZGRCkgYW5kIGFkdmFuY2Ugb25seSAxIGJ5dGVcbiAgICAgIGNvZGVQb2ludCA9IDB4RkZGRFxuICAgICAgYnl0ZXNQZXJTZXF1ZW5jZSA9IDFcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA+IDB4RkZGRikge1xuICAgICAgLy8gZW5jb2RlIHRvIHV0ZjE2IChzdXJyb2dhdGUgcGFpciBkYW5jZSlcbiAgICAgIGNvZGVQb2ludCAtPSAweDEwMDAwXG4gICAgICByZXMucHVzaChjb2RlUG9pbnQgPj4+IDEwICYgMHgzRkYgfCAweEQ4MDApXG4gICAgICBjb2RlUG9pbnQgPSAweERDMDAgfCBjb2RlUG9pbnQgJiAweDNGRlxuICAgIH1cblxuICAgIHJlcy5wdXNoKGNvZGVQb2ludClcbiAgICBpICs9IGJ5dGVzUGVyU2VxdWVuY2VcbiAgfVxuXG4gIHJldHVybiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkocmVzKVxufVxuXG4vLyBCYXNlZCBvbiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yMjc0NzI3Mi82ODA3NDIsIHRoZSBicm93c2VyIHdpdGhcbi8vIHRoZSBsb3dlc3QgbGltaXQgaXMgQ2hyb21lLCB3aXRoIDB4MTAwMDAgYXJncy5cbi8vIFdlIGdvIDEgbWFnbml0dWRlIGxlc3MsIGZvciBzYWZldHlcbnZhciBNQVhfQVJHVU1FTlRTX0xFTkdUSCA9IDB4MTAwMFxuXG5mdW5jdGlvbiBkZWNvZGVDb2RlUG9pbnRzQXJyYXkgKGNvZGVQb2ludHMpIHtcbiAgdmFyIGxlbiA9IGNvZGVQb2ludHMubGVuZ3RoXG4gIGlmIChsZW4gPD0gTUFYX0FSR1VNRU5UU19MRU5HVEgpIHtcbiAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShTdHJpbmcsIGNvZGVQb2ludHMpIC8vIGF2b2lkIGV4dHJhIHNsaWNlKClcbiAgfVxuXG4gIC8vIERlY29kZSBpbiBjaHVua3MgdG8gYXZvaWQgXCJjYWxsIHN0YWNrIHNpemUgZXhjZWVkZWRcIi5cbiAgdmFyIHJlcyA9ICcnXG4gIHZhciBpID0gMFxuICB3aGlsZSAoaSA8IGxlbikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KFxuICAgICAgU3RyaW5nLFxuICAgICAgY29kZVBvaW50cy5zbGljZShpLCBpICs9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKVxuICAgIClcbiAgfVxuICByZXR1cm4gcmVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpU2xpY2UgKGJ1Ziwgc3RhcnQsIGVuZCkge1xuICB2YXIgcmV0ID0gJydcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgcmV0ICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnVmW2ldICYgMHg3RilcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGxhdGluMVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gcmV0XG59XG5cbmZ1bmN0aW9uIGhleFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IGJ1Zi5sZW5ndGhcblxuICBpZiAoIXN0YXJ0IHx8IHN0YXJ0IDwgMCkgc3RhcnQgPSAwXG4gIGlmICghZW5kIHx8IGVuZCA8IDAgfHwgZW5kID4gbGVuKSBlbmQgPSBsZW5cblxuICB2YXIgb3V0ID0gJydcbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICBvdXQgKz0gdG9IZXgoYnVmW2ldKVxuICB9XG4gIHJldHVybiBvdXRcbn1cblxuZnVuY3Rpb24gdXRmMTZsZVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGJ5dGVzID0gYnVmLnNsaWNlKHN0YXJ0LCBlbmQpXG4gIHZhciByZXMgPSAnJ1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGJ5dGVzLmxlbmd0aDsgaSArPSAyKSB7XG4gICAgcmVzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoYnl0ZXNbaV0gKyBieXRlc1tpICsgMV0gKiAyNTYpXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnNsaWNlID0gZnVuY3Rpb24gc2xpY2UgKHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIHN0YXJ0ID0gfn5zdGFydFxuICBlbmQgPSBlbmQgPT09IHVuZGVmaW5lZCA/IGxlbiA6IH5+ZW5kXG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ICs9IGxlblxuICAgIGlmIChzdGFydCA8IDApIHN0YXJ0ID0gMFxuICB9IGVsc2UgaWYgKHN0YXJ0ID4gbGVuKSB7XG4gICAgc3RhcnQgPSBsZW5cbiAgfVxuXG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlblxuICAgIGlmIChlbmQgPCAwKSBlbmQgPSAwXG4gIH0gZWxzZSBpZiAoZW5kID4gbGVuKSB7XG4gICAgZW5kID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgc3RhcnQpIGVuZCA9IHN0YXJ0XG5cbiAgdmFyIG5ld0J1ZlxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICBuZXdCdWYgPSB0aGlzLnN1YmFycmF5KHN0YXJ0LCBlbmQpXG4gICAgbmV3QnVmLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgfSBlbHNlIHtcbiAgICB2YXIgc2xpY2VMZW4gPSBlbmQgLSBzdGFydFxuICAgIG5ld0J1ZiA9IG5ldyBCdWZmZXIoc2xpY2VMZW4sIHVuZGVmaW5lZClcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNsaWNlTGVuOyArK2kpIHtcbiAgICAgIG5ld0J1ZltpXSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXdCdWZcbn1cblxuLypcbiAqIE5lZWQgdG8gbWFrZSBzdXJlIHRoYXQgYnVmZmVyIGlzbid0IHRyeWluZyB0byB3cml0ZSBvdXQgb2YgYm91bmRzLlxuICovXG5mdW5jdGlvbiBjaGVja09mZnNldCAob2Zmc2V0LCBleHQsIGxlbmd0aCkge1xuICBpZiAoKG9mZnNldCAlIDEpICE9PSAwIHx8IG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdvZmZzZXQgaXMgbm90IHVpbnQnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gbGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignVHJ5aW5nIHRvIGFjY2VzcyBiZXlvbmQgYnVmZmVyIGxlbmd0aCcpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRMRSA9IGZ1bmN0aW9uIHJlYWRVSW50TEUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCBieXRlTGVuZ3RoLCB0aGlzLmxlbmd0aClcblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXRdXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB3aGlsZSAoKytpIDwgYnl0ZUxlbmd0aCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIGldICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnRCRSA9IGZ1bmN0aW9uIHJlYWRVSW50QkUgKG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG4gIH1cblxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdXG4gIHZhciBtdWwgPSAxXG4gIHdoaWxlIChieXRlTGVuZ3RoID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0tYnl0ZUxlbmd0aF0gKiBtdWxcbiAgfVxuXG4gIHJldHVybiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDggPSBmdW5jdGlvbiByZWFkVUludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MTZMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gdGhpc1tvZmZzZXRdIHwgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2QkUgPSBmdW5jdGlvbiByZWFkVUludDE2QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuICh0aGlzW29mZnNldF0gPDwgOCkgfCB0aGlzW29mZnNldCArIDFdXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQzMkxFID0gZnVuY3Rpb24gcmVhZFVJbnQzMkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgNCwgdGhpcy5sZW5ndGgpXG5cbiAgcmV0dXJuICgodGhpc1tvZmZzZXRdKSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KSB8XG4gICAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikpICtcbiAgICAgICh0aGlzW29mZnNldCArIDNdICogMHgxMDAwMDAwKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJCRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdICogMHgxMDAwMDAwKSArXG4gICAgKCh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgIHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludExFID0gZnVuY3Rpb24gcmVhZEludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludEJFID0gZnVuY3Rpb24gcmVhZEludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIGkgPSBieXRlTGVuZ3RoXG4gIHZhciBtdWwgPSAxXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIC0taV1cbiAgd2hpbGUgKGkgPiAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgLS1pXSAqIG11bFxuICB9XG4gIG11bCAqPSAweDgwXG5cbiAgaWYgKHZhbCA+PSBtdWwpIHZhbCAtPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aClcblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDggPSBmdW5jdGlvbiByZWFkSW50OCAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDEsIHRoaXMubGVuZ3RoKVxuICBpZiAoISh0aGlzW29mZnNldF0gJiAweDgwKSkgcmV0dXJuICh0aGlzW29mZnNldF0pXG4gIHJldHVybiAoKDB4ZmYgLSB0aGlzW29mZnNldF0gKyAxKSAqIC0xKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQxNkxFID0gZnVuY3Rpb24gcmVhZEludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG4gIHJldHVybiAodmFsICYgMHg4MDAwKSA/IHZhbCB8IDB4RkZGRjAwMDAgOiB2YWxcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZCRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldCArIDFdIHwgKHRoaXNbb2Zmc2V0XSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyTEUgPSBmdW5jdGlvbiByZWFkSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdKSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10gPDwgMjQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDMyQkUgPSBmdW5jdGlvbiByZWFkSW50MzJCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDI0KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgMTYpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCA4KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgM10pXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0TEUgPSBmdW5jdGlvbiByZWFkRmxvYXRMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgMjMsIDQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEZsb2F0QkUgPSBmdW5jdGlvbiByZWFkRmxvYXRCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVMRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgdHJ1ZSwgNTIsIDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZERvdWJsZUJFID0gZnVuY3Rpb24gcmVhZERvdWJsZUJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgOCwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiBpZWVlNzU0LnJlYWQodGhpcywgb2Zmc2V0LCBmYWxzZSwgNTIsIDgpXG59XG5cbmZ1bmN0aW9uIGNoZWNrSW50IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJidWZmZXJcIiBhcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyIGluc3RhbmNlJylcbiAgaWYgKHZhbHVlID4gbWF4IHx8IHZhbHVlIDwgbWluKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IGlzIG91dCBvZiBib3VuZHMnKVxuICBpZiAob2Zmc2V0ICsgZXh0ID4gYnVmLmxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBtdWwgPSAxXG4gIHZhciBpID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50QkUgPSBmdW5jdGlvbiB3cml0ZVVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aCB8IDBcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIHZhciBtYXhCeXRlcyA9IE1hdGgucG93KDIsIDggKiBieXRlTGVuZ3RoKSAtIDFcbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBtYXhCeXRlcywgMClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB0aGlzW29mZnNldCArIGldID0gKHZhbHVlIC8gbXVsKSAmIDB4RkZcbiAgfVxuXG4gIHJldHVybiBvZmZzZXQgKyBieXRlTGVuZ3RoXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50OCA9IGZ1bmN0aW9uIHdyaXRlVUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHhmZiwgMClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICByZXR1cm4gb2Zmc2V0ICsgMVxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQxNiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmYgKyB2YWx1ZSArIDFcbiAgZm9yICh2YXIgaSA9IDAsIGogPSBNYXRoLm1pbihidWYubGVuZ3RoIC0gb2Zmc2V0LCAyKTsgaSA8IGo7ICsraSkge1xuICAgIGJ1ZltvZmZzZXQgKyBpXSA9ICh2YWx1ZSAmICgweGZmIDw8ICg4ICogKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkpKSkgPj4+XG4gICAgICAobGl0dGxlRW5kaWFuID8gaSA6IDEgLSBpKSAqIDhcbiAgfVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZVVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4ZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5mdW5jdGlvbiBvYmplY3RXcml0ZVVJbnQzMiAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4pIHtcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmZmZmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgNCk7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgPj4+IChsaXR0bGVFbmRpYW4gPyBpIDogMyAtIGkpICogOCkgJiAweGZmXG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZVVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4ZmZmZmZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50TEUgPSBmdW5jdGlvbiB3cml0ZUludExFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gMFxuICB2YXIgbXVsID0gMVxuICB2YXIgc3ViID0gMFxuICB0aGlzW29mZnNldF0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgLSAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50QkUgPSBmdW5jdGlvbiB3cml0ZUludEJFICh2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbGltaXQgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCAtIDEpXG5cbiAgICBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBieXRlTGVuZ3RoLCBsaW1pdCAtIDEsIC1saW1pdClcbiAgfVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aCAtIDFcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXQgKyBpXSA9IHZhbHVlICYgMHhGRlxuICB3aGlsZSAoLS1pID49IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICBpZiAodmFsdWUgPCAwICYmIHN1YiA9PT0gMCAmJiB0aGlzW29mZnNldCArIGkgKyAxXSAhPT0gMCkge1xuICAgICAgc3ViID0gMVxuICAgIH1cbiAgICB0aGlzW29mZnNldCArIGldID0gKCh2YWx1ZSAvIG11bCkgPj4gMCkgLSBzdWIgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50OCA9IGZ1bmN0aW9uIHdyaXRlSW50OCAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAxLCAweDdmLCAtMHg4MClcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkgdmFsdWUgPSBNYXRoLmZsb29yKHZhbHVlKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmYgKyB2YWx1ZSArIDFcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2TEUgPSBmdW5jdGlvbiB3cml0ZUludDE2TEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDgpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlSW50MTZCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweDdmZmYsIC0weDgwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlICYgMHhmZilcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSlcbiAgfVxuICByZXR1cm4gb2Zmc2V0ICsgMlxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlSW50MzJMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweDdmZmZmZmZmLCAtMHg4MDAwMDAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgPj4+IDI0KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyQkUgPSBmdW5jdGlvbiB3cml0ZUludDMyQkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuZnVuY3Rpb24gY2hlY2tJRUVFNzU0IChidWYsIHZhbHVlLCBvZmZzZXQsIGV4dCwgbWF4LCBtaW4pIHtcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxuICBpZiAob2Zmc2V0IDwgMCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0luZGV4IG91dCBvZiByYW5nZScpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRmxvYXQgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgNCwgMy40MDI4MjM0NjYzODUyODg2ZSszOCwgLTMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgMjMsIDQpXG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdExFID0gZnVuY3Rpb24gd3JpdGVGbG9hdExFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUZsb2F0QkUgPSBmdW5jdGlvbiB3cml0ZUZsb2F0QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZUZsb2F0KHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuZnVuY3Rpb24gd3JpdGVEb3VibGUgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgY2hlY2tJRUVFNzU0KGJ1ZiwgdmFsdWUsIG9mZnNldCwgOCwgMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgsIC0xLjc5NzY5MzEzNDg2MjMxNTdFKzMwOClcbiAgfVxuICBpZWVlNzU0LndyaXRlKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuLCA1MiwgOClcbiAgcmV0dXJuIG9mZnNldCArIDhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUxFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUsIG5vQXNzZXJ0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRG91YmxlQkUgPSBmdW5jdGlvbiB3cml0ZURvdWJsZUJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVEb3VibGUodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UsIG5vQXNzZXJ0KVxufVxuXG4vLyBjb3B5KHRhcmdldEJ1ZmZlciwgdGFyZ2V0U3RhcnQ9MCwgc291cmNlU3RhcnQ9MCwgc291cmNlRW5kPWJ1ZmZlci5sZW5ndGgpXG5CdWZmZXIucHJvdG90eXBlLmNvcHkgPSBmdW5jdGlvbiBjb3B5ICh0YXJnZXQsIHRhcmdldFN0YXJ0LCBzdGFydCwgZW5kKSB7XG4gIGlmICghc3RhcnQpIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCAmJiBlbmQgIT09IDApIGVuZCA9IHRoaXMubGVuZ3RoXG4gIGlmICh0YXJnZXRTdGFydCA+PSB0YXJnZXQubGVuZ3RoKSB0YXJnZXRTdGFydCA9IHRhcmdldC5sZW5ndGhcbiAgaWYgKCF0YXJnZXRTdGFydCkgdGFyZ2V0U3RhcnQgPSAwXG4gIGlmIChlbmQgPiAwICYmIGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIC8vIENvcHkgMCBieXRlczsgd2UncmUgZG9uZVxuICBpZiAoZW5kID09PSBzdGFydCkgcmV0dXJuIDBcbiAgaWYgKHRhcmdldC5sZW5ndGggPT09IDAgfHwgdGhpcy5sZW5ndGggPT09IDApIHJldHVybiAwXG5cbiAgLy8gRmF0YWwgZXJyb3IgY29uZGl0aW9uc1xuICBpZiAodGFyZ2V0U3RhcnQgPCAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ3RhcmdldFN0YXJ0IG91dCBvZiBib3VuZHMnKVxuICB9XG4gIGlmIChzdGFydCA8IDAgfHwgc3RhcnQgPj0gdGhpcy5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgaWYgKGVuZCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdzb3VyY2VFbmQgb3V0IG9mIGJvdW5kcycpXG5cbiAgLy8gQXJlIHdlIG9vYj9cbiAgaWYgKGVuZCA+IHRoaXMubGVuZ3RoKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0IDwgZW5kIC0gc3RhcnQpIHtcbiAgICBlbmQgPSB0YXJnZXQubGVuZ3RoIC0gdGFyZ2V0U3RhcnQgKyBzdGFydFxuICB9XG5cbiAgdmFyIGxlbiA9IGVuZCAtIHN0YXJ0XG4gIHZhciBpXG5cbiAgaWYgKHRoaXMgPT09IHRhcmdldCAmJiBzdGFydCA8IHRhcmdldFN0YXJ0ICYmIHRhcmdldFN0YXJ0IDwgZW5kKSB7XG4gICAgLy8gZGVzY2VuZGluZyBjb3B5IGZyb20gZW5kXG4gICAgZm9yIChpID0gbGVuIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2UgaWYgKGxlbiA8IDEwMDAgfHwgIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgLy8gYXNjZW5kaW5nIGNvcHkgZnJvbSBzdGFydFxuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47ICsraSkge1xuICAgICAgdGFyZ2V0W2kgKyB0YXJnZXRTdGFydF0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgVWludDhBcnJheS5wcm90b3R5cGUuc2V0LmNhbGwoXG4gICAgICB0YXJnZXQsXG4gICAgICB0aGlzLnN1YmFycmF5KHN0YXJ0LCBzdGFydCArIGxlbiksXG4gICAgICB0YXJnZXRTdGFydFxuICAgIClcbiAgfVxuXG4gIHJldHVybiBsZW5cbn1cblxuLy8gVXNhZ2U6XG4vLyAgICBidWZmZXIuZmlsbChudW1iZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKGJ1ZmZlclssIG9mZnNldFssIGVuZF1dKVxuLy8gICAgYnVmZmVyLmZpbGwoc3RyaW5nWywgb2Zmc2V0WywgZW5kXV1bLCBlbmNvZGluZ10pXG5CdWZmZXIucHJvdG90eXBlLmZpbGwgPSBmdW5jdGlvbiBmaWxsICh2YWwsIHN0YXJ0LCBlbmQsIGVuY29kaW5nKSB7XG4gIC8vIEhhbmRsZSBzdHJpbmcgY2FzZXM6XG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIGlmICh0eXBlb2Ygc3RhcnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbmNvZGluZyA9IHN0YXJ0XG4gICAgICBzdGFydCA9IDBcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfSBlbHNlIGlmICh0eXBlb2YgZW5kID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBlbmRcbiAgICAgIGVuZCA9IHRoaXMubGVuZ3RoXG4gICAgfVxuICAgIGlmICh2YWwubGVuZ3RoID09PSAxKSB7XG4gICAgICB2YXIgY29kZSA9IHZhbC5jaGFyQ29kZUF0KDApXG4gICAgICBpZiAoY29kZSA8IDI1Nikge1xuICAgICAgICB2YWwgPSBjb2RlXG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbmNvZGluZyAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBlbmNvZGluZyAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ2VuY29kaW5nIG11c3QgYmUgYSBzdHJpbmcnKVxuICAgIH1cbiAgICBpZiAodHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJyAmJiAhQnVmZmVyLmlzRW5jb2RpbmcoZW5jb2RpbmcpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgfVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMjU1XG4gIH1cblxuICAvLyBJbnZhbGlkIHJhbmdlcyBhcmUgbm90IHNldCB0byBhIGRlZmF1bHQsIHNvIGNhbiByYW5nZSBjaGVjayBlYXJseS5cbiAgaWYgKHN0YXJ0IDwgMCB8fCB0aGlzLmxlbmd0aCA8IHN0YXJ0IHx8IHRoaXMubGVuZ3RoIDwgZW5kKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ091dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuIHRoaXNcbiAgfVxuXG4gIHN0YXJ0ID0gc3RhcnQgPj4+IDBcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyB0aGlzLmxlbmd0aCA6IGVuZCA+Pj4gMFxuXG4gIGlmICghdmFsKSB2YWwgPSAwXG5cbiAgdmFyIGlcbiAgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgZm9yIChpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgICAgdGhpc1tpXSA9IHZhbFxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICB2YXIgYnl0ZXMgPSBCdWZmZXIuaXNCdWZmZXIodmFsKVxuICAgICAgPyB2YWxcbiAgICAgIDogdXRmOFRvQnl0ZXMobmV3IEJ1ZmZlcih2YWwsIGVuY29kaW5nKS50b1N0cmluZygpKVxuICAgIHZhciBsZW4gPSBieXRlcy5sZW5ndGhcbiAgICBmb3IgKGkgPSAwOyBpIDwgZW5kIC0gc3RhcnQ7ICsraSkge1xuICAgICAgdGhpc1tpICsgc3RhcnRdID0gYnl0ZXNbaSAlIGxlbl1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpc1xufVxuXG4vLyBIRUxQRVIgRlVOQ1RJT05TXG4vLyA9PT09PT09PT09PT09PT09XG5cbnZhciBJTlZBTElEX0JBU0U2NF9SRSA9IC9bXitcXC8wLTlBLVphLXotX10vZ1xuXG5mdW5jdGlvbiBiYXNlNjRjbGVhbiAoc3RyKSB7XG4gIC8vIE5vZGUgc3RyaXBzIG91dCBpbnZhbGlkIGNoYXJhY3RlcnMgbGlrZSBcXG4gYW5kIFxcdCBmcm9tIHRoZSBzdHJpbmcsIGJhc2U2NC1qcyBkb2VzIG5vdFxuICBzdHIgPSBzdHJpbmd0cmltKHN0cikucmVwbGFjZShJTlZBTElEX0JBU0U2NF9SRSwgJycpXG4gIC8vIE5vZGUgY29udmVydHMgc3RyaW5ncyB3aXRoIGxlbmd0aCA8IDIgdG8gJydcbiAgaWYgKHN0ci5sZW5ndGggPCAyKSByZXR1cm4gJydcbiAgLy8gTm9kZSBhbGxvd3MgZm9yIG5vbi1wYWRkZWQgYmFzZTY0IHN0cmluZ3MgKG1pc3NpbmcgdHJhaWxpbmcgPT09KSwgYmFzZTY0LWpzIGRvZXMgbm90XG4gIHdoaWxlIChzdHIubGVuZ3RoICUgNCAhPT0gMCkge1xuICAgIHN0ciA9IHN0ciArICc9J1xuICB9XG4gIHJldHVybiBzdHJcbn1cblxuZnVuY3Rpb24gc3RyaW5ndHJpbSAoc3RyKSB7XG4gIGlmIChzdHIudHJpbSkgcmV0dXJuIHN0ci50cmltKClcbiAgcmV0dXJuIHN0ci5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJylcbn1cblxuZnVuY3Rpb24gdG9IZXggKG4pIHtcbiAgaWYgKG4gPCAxNikgcmV0dXJuICcwJyArIG4udG9TdHJpbmcoMTYpXG4gIHJldHVybiBuLnRvU3RyaW5nKDE2KVxufVxuXG5mdW5jdGlvbiB1dGY4VG9CeXRlcyAoc3RyaW5nLCB1bml0cykge1xuICB1bml0cyA9IHVuaXRzIHx8IEluZmluaXR5XG4gIHZhciBjb2RlUG9pbnRcbiAgdmFyIGxlbmd0aCA9IHN0cmluZy5sZW5ndGhcbiAgdmFyIGxlYWRTdXJyb2dhdGUgPSBudWxsXG4gIHZhciBieXRlcyA9IFtdXG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGNvZGVQb2ludCA9IHN0cmluZy5jaGFyQ29kZUF0KGkpXG5cbiAgICAvLyBpcyBzdXJyb2dhdGUgY29tcG9uZW50XG4gICAgaWYgKGNvZGVQb2ludCA+IDB4RDdGRiAmJiBjb2RlUG9pbnQgPCAweEUwMDApIHtcbiAgICAgIC8vIGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoIWxlYWRTdXJyb2dhdGUpIHtcbiAgICAgICAgLy8gbm8gbGVhZCB5ZXRcbiAgICAgICAgaWYgKGNvZGVQb2ludCA+IDB4REJGRikge1xuICAgICAgICAgIC8vIHVuZXhwZWN0ZWQgdHJhaWxcbiAgICAgICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICAgICAgICBjb250aW51ZVxuICAgICAgICB9IGVsc2UgaWYgKGkgKyAxID09PSBsZW5ndGgpIHtcbiAgICAgICAgICAvLyB1bnBhaXJlZCBsZWFkXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkIGxlYWRcbiAgICAgICAgbGVhZFN1cnJvZ2F0ZSA9IGNvZGVQb2ludFxuXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIDIgbGVhZHMgaW4gYSByb3dcbiAgICAgIGlmIChjb2RlUG9pbnQgPCAweERDMDApIHtcbiAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cblxuICAgICAgLy8gdmFsaWQgc3Vycm9nYXRlIHBhaXJcbiAgICAgIGNvZGVQb2ludCA9IChsZWFkU3Vycm9nYXRlIC0gMHhEODAwIDw8IDEwIHwgY29kZVBvaW50IC0gMHhEQzAwKSArIDB4MTAwMDBcbiAgICB9IGVsc2UgaWYgKGxlYWRTdXJyb2dhdGUpIHtcbiAgICAgIC8vIHZhbGlkIGJtcCBjaGFyLCBidXQgbGFzdCBjaGFyIHdhcyBhIGxlYWRcbiAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgIH1cblxuICAgIGxlYWRTdXJyb2dhdGUgPSBudWxsXG5cbiAgICAvLyBlbmNvZGUgdXRmOFxuICAgIGlmIChjb2RlUG9pbnQgPCAweDgwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDEpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goY29kZVBvaW50KVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHg4MDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiB8IDB4QzAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDEwMDAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDMpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgfCAweEUwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHg2ICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCAmIDB4M0YgfCAweDgwXG4gICAgICApXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPCAweDExMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSA0KSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHgxMiB8IDB4RjAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweEMgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29kZSBwb2ludCcpXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVzXG59XG5cbmZ1bmN0aW9uIGFzY2lpVG9CeXRlcyAoc3RyKSB7XG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIC8vIE5vZGUncyBjb2RlIHNlZW1zIHRvIGJlIGRvaW5nIHRoaXMgYW5kIG5vdCAmIDB4N0YuLlxuICAgIGJ5dGVBcnJheS5wdXNoKHN0ci5jaGFyQ29kZUF0KGkpICYgMHhGRilcbiAgfVxuICByZXR1cm4gYnl0ZUFycmF5XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVUb0J5dGVzIChzdHIsIHVuaXRzKSB7XG4gIHZhciBjLCBoaSwgbG9cbiAgdmFyIGJ5dGVBcnJheSA9IFtdXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3RyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKCh1bml0cyAtPSAyKSA8IDApIGJyZWFrXG5cbiAgICBjID0gc3RyLmNoYXJDb2RlQXQoaSlcbiAgICBoaSA9IGMgPj4gOFxuICAgIGxvID0gYyAlIDI1NlxuICAgIGJ5dGVBcnJheS5wdXNoKGxvKVxuICAgIGJ5dGVBcnJheS5wdXNoKGhpKVxuICB9XG5cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiBiYXNlNjRUb0J5dGVzIChzdHIpIHtcbiAgcmV0dXJuIGJhc2U2NC50b0J5dGVBcnJheShiYXNlNjRjbGVhbihzdHIpKVxufVxuXG5mdW5jdGlvbiBibGl0QnVmZmVyIChzcmMsIGRzdCwgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7ICsraSkge1xuICAgIGlmICgoaSArIG9mZnNldCA+PSBkc3QubGVuZ3RoKSB8fCAoaSA+PSBzcmMubGVuZ3RoKSkgYnJlYWtcbiAgICBkc3RbaSArIG9mZnNldF0gPSBzcmNbaV1cbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiBpc25hbiAodmFsKSB7XG4gIHJldHVybiB2YWwgIT09IHZhbCAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXNlbGYtY29tcGFyZVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYnVmZmVyL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBwbGFjZUhvbGRlcnNDb3VudCAoYjY0KSB7XG4gIHZhciBsZW4gPSBiNjQubGVuZ3RoXG4gIGlmIChsZW4gJSA0ID4gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzdHJpbmcuIExlbmd0aCBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNCcpXG4gIH1cblxuICAvLyB0aGUgbnVtYmVyIG9mIGVxdWFsIHNpZ25zIChwbGFjZSBob2xkZXJzKVxuICAvLyBpZiB0aGVyZSBhcmUgdHdvIHBsYWNlaG9sZGVycywgdGhhbiB0aGUgdHdvIGNoYXJhY3RlcnMgYmVmb3JlIGl0XG4gIC8vIHJlcHJlc2VudCBvbmUgYnl0ZVxuICAvLyBpZiB0aGVyZSBpcyBvbmx5IG9uZSwgdGhlbiB0aGUgdGhyZWUgY2hhcmFjdGVycyBiZWZvcmUgaXQgcmVwcmVzZW50IDIgYnl0ZXNcbiAgLy8gdGhpcyBpcyBqdXN0IGEgY2hlYXAgaGFjayB0byBub3QgZG8gaW5kZXhPZiB0d2ljZVxuICByZXR1cm4gYjY0W2xlbiAtIDJdID09PSAnPScgPyAyIDogYjY0W2xlbiAtIDFdID09PSAnPScgPyAxIDogMFxufVxuXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG4gIHJldHVybiAoYjY0Lmxlbmd0aCAqIDMgLyA0KSAtIHBsYWNlSG9sZGVyc0NvdW50KGI2NClcbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgaSwgbCwgdG1wLCBwbGFjZUhvbGRlcnMsIGFyclxuICB2YXIgbGVuID0gYjY0Lmxlbmd0aFxuICBwbGFjZUhvbGRlcnMgPSBwbGFjZUhvbGRlcnNDb3VudChiNjQpXG5cbiAgYXJyID0gbmV3IEFycigobGVuICogMyAvIDQpIC0gcGxhY2VIb2xkZXJzKVxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgbCA9IHBsYWNlSG9sZGVycyA+IDAgPyBsZW4gLSA0IDogbGVuXG5cbiAgdmFyIEwgPSAwXG5cbiAgZm9yIChpID0gMDsgaSA8IGw7IGkgKz0gNCkge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCAxMikgfCAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPDwgNikgfCByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltMKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVycyA9PT0gMikge1xuICAgIHRtcCA9IChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDIpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldID4+IDQpXG4gICAgYXJyW0wrK10gPSB0bXAgJiAweEZGXG4gIH0gZWxzZSBpZiAocGxhY2VIb2xkZXJzID09PSAxKSB7XG4gICAgdG1wID0gKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMSldIDw8IDQpIHwgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpICsgMildID4+IDIpXG4gICAgYXJyW0wrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltMKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiB0cmlwbGV0VG9CYXNlNjQgKG51bSkge1xuICByZXR1cm4gbG9va3VwW251bSA+PiAxOCAmIDB4M0ZdICsgbG9va3VwW251bSA+PiAxMiAmIDB4M0ZdICsgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gKyBsb29rdXBbbnVtICYgMHgzRl1cbn1cblxuZnVuY3Rpb24gZW5jb2RlQ2h1bmsgKHVpbnQ4LCBzdGFydCwgZW5kKSB7XG4gIHZhciB0bXBcbiAgdmFyIG91dHB1dCA9IFtdXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgaSArPSAzKSB7XG4gICAgdG1wID0gKHVpbnQ4W2ldIDw8IDE2KSArICh1aW50OFtpICsgMV0gPDwgOCkgKyAodWludDhbaSArIDJdKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgb3V0cHV0ID0gJydcbiAgdmFyIHBhcnRzID0gW11cbiAgdmFyIG1heENodW5rTGVuZ3RoID0gMTYzODMgLy8gbXVzdCBiZSBtdWx0aXBsZSBvZiAzXG5cbiAgLy8gZ28gdGhyb3VnaCB0aGUgYXJyYXkgZXZlcnkgdGhyZWUgYnl0ZXMsIHdlJ2xsIGRlYWwgd2l0aCB0cmFpbGluZyBzdHVmZiBsYXRlclxuICBmb3IgKHZhciBpID0gMCwgbGVuMiA9IGxlbiAtIGV4dHJhQnl0ZXM7IGkgPCBsZW4yOyBpICs9IG1heENodW5rTGVuZ3RoKSB7XG4gICAgcGFydHMucHVzaChlbmNvZGVDaHVuayh1aW50OCwgaSwgKGkgKyBtYXhDaHVua0xlbmd0aCkgPiBsZW4yID8gbGVuMiA6IChpICsgbWF4Q2h1bmtMZW5ndGgpKSlcbiAgfVxuXG4gIC8vIHBhZCB0aGUgZW5kIHdpdGggemVyb3MsIGJ1dCBtYWtlIHN1cmUgdG8gbm90IGZvcmdldCB0aGUgZXh0cmEgYnl0ZXNcbiAgaWYgKGV4dHJhQnl0ZXMgPT09IDEpIHtcbiAgICB0bXAgPSB1aW50OFtsZW4gLSAxXVxuICAgIG91dHB1dCArPSBsb29rdXBbdG1wID4+IDJdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wIDw8IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gJz09J1xuICB9IGVsc2UgaWYgKGV4dHJhQnl0ZXMgPT09IDIpIHtcbiAgICB0bXAgPSAodWludDhbbGVuIC0gMl0gPDwgOCkgKyAodWludDhbbGVuIC0gMV0pXG4gICAgb3V0cHV0ICs9IGxvb2t1cFt0bXAgPj4gMTBdXG4gICAgb3V0cHV0ICs9IGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl1cbiAgICBvdXRwdXQgKz0gbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXVxuICAgIG91dHB1dCArPSAnPSdcbiAgfVxuXG4gIHBhcnRzLnB1c2gob3V0cHV0KVxuXG4gIHJldHVybiBwYXJ0cy5qb2luKCcnKVxufVxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IG5CeXRlcyAqIDggLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIG5CaXRzID0gLTdcbiAgdmFyIGkgPSBpc0xFID8gKG5CeXRlcyAtIDEpIDogMFxuICB2YXIgZCA9IGlzTEUgPyAtMSA6IDFcbiAgdmFyIHMgPSBidWZmZXJbb2Zmc2V0ICsgaV1cblxuICBpICs9IGRcblxuICBlID0gcyAmICgoMSA8PCAoLW5CaXRzKSkgLSAxKVxuICBzID4+PSAoLW5CaXRzKVxuICBuQml0cyArPSBlTGVuXG4gIGZvciAoOyBuQml0cyA+IDA7IGUgPSBlICogMjU2ICsgYnVmZmVyW29mZnNldCArIGldLCBpICs9IGQsIG5CaXRzIC09IDgpIHt9XG5cbiAgbSA9IGUgJiAoKDEgPDwgKC1uQml0cykpIC0gMSlcbiAgZSA+Pj0gKC1uQml0cylcbiAgbkJpdHMgKz0gbUxlblxuICBmb3IgKDsgbkJpdHMgPiAwOyBtID0gbSAqIDI1NiArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSBuQnl0ZXMgKiA4IC0gbUxlbiAtIDFcbiAgdmFyIGVNYXggPSAoMSA8PCBlTGVuKSAtIDFcbiAgdmFyIGVCaWFzID0gZU1heCA+PiAxXG4gIHZhciBydCA9IChtTGVuID09PSAyMyA/IE1hdGgucG93KDIsIC0yNCkgLSBNYXRoLnBvdygyLCAtNzcpIDogMClcbiAgdmFyIGkgPSBpc0xFID8gMCA6IChuQnl0ZXMgLSAxKVxuICB2YXIgZCA9IGlzTEUgPyAxIDogLTFcbiAgdmFyIHMgPSB2YWx1ZSA8IDAgfHwgKHZhbHVlID09PSAwICYmIDEgLyB2YWx1ZSA8IDApID8gMSA6IDBcblxuICB2YWx1ZSA9IE1hdGguYWJzKHZhbHVlKVxuXG4gIGlmIChpc05hTih2YWx1ZSkgfHwgdmFsdWUgPT09IEluZmluaXR5KSB7XG4gICAgbSA9IGlzTmFOKHZhbHVlKSA/IDEgOiAwXG4gICAgZSA9IGVNYXhcbiAgfSBlbHNlIHtcbiAgICBlID0gTWF0aC5mbG9vcihNYXRoLmxvZyh2YWx1ZSkgLyBNYXRoLkxOMilcbiAgICBpZiAodmFsdWUgKiAoYyA9IE1hdGgucG93KDIsIC1lKSkgPCAxKSB7XG4gICAgICBlLS1cbiAgICAgIGMgKj0gMlxuICAgIH1cbiAgICBpZiAoZSArIGVCaWFzID49IDEpIHtcbiAgICAgIHZhbHVlICs9IHJ0IC8gY1xuICAgIH0gZWxzZSB7XG4gICAgICB2YWx1ZSArPSBydCAqIE1hdGgucG93KDIsIDEgLSBlQmlhcylcbiAgICB9XG4gICAgaWYgKHZhbHVlICogYyA+PSAyKSB7XG4gICAgICBlKytcbiAgICAgIGMgLz0gMlxuICAgIH1cblxuICAgIGlmIChlICsgZUJpYXMgPj0gZU1heCkge1xuICAgICAgbSA9IDBcbiAgICAgIGUgPSBlTWF4XG4gICAgfSBlbHNlIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgbSA9ICh2YWx1ZSAqIGMgLSAxKSAqIE1hdGgucG93KDIsIG1MZW4pXG4gICAgICBlID0gZSArIGVCaWFzXG4gICAgfSBlbHNlIHtcbiAgICAgIG0gPSB2YWx1ZSAqIE1hdGgucG93KDIsIGVCaWFzIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IDBcbiAgICB9XG4gIH1cblxuICBmb3IgKDsgbUxlbiA+PSA4OyBidWZmZXJbb2Zmc2V0ICsgaV0gPSBtICYgMHhmZiwgaSArPSBkLCBtIC89IDI1NiwgbUxlbiAtPSA4KSB7fVxuXG4gIGUgPSAoZSA8PCBtTGVuKSB8IG1cbiAgZUxlbiArPSBtTGVuXG4gIGZvciAoOyBlTGVuID4gMDsgYnVmZmVyW29mZnNldCArIGldID0gZSAmIDB4ZmYsIGkgKz0gZCwgZSAvPSAyNTYsIGVMZW4gLT0gOCkge31cblxuICBidWZmZXJbb2Zmc2V0ICsgaSAtIGRdIHw9IHMgKiAxMjhcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2llZWU3NTQvaW5kZXguanNcbi8vIG1vZHVsZSBpZCA9IDQ2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEFycmF5LmlzQXJyYXkgfHwgZnVuY3Rpb24gKGFycikge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbChhcnIpID09ICdbb2JqZWN0IEFycmF5XSc7XG59O1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvYnVmZmVyL25vZGVfbW9kdWxlcy9pc2FycmF5L2luZGV4LmpzXG4vLyBtb2R1bGUgaWQgPSA0N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCIvKipcbiAqIEJpdCB0d2lkZGxpbmcgaGFja3MgZm9yIEphdmFTY3JpcHQuXG4gKlxuICogQXV0aG9yOiBNaWtvbGEgTHlzZW5rb1xuICpcbiAqIFBvcnRlZCBmcm9tIFN0YW5mb3JkIGJpdCB0d2lkZGxpbmcgaGFjayBsaWJyYXJ5OlxuICogICAgaHR0cDovL2dyYXBoaWNzLnN0YW5mb3JkLmVkdS9+c2VhbmRlci9iaXRoYWNrcy5odG1sXG4gKi9cblxuXCJ1c2Ugc3RyaWN0XCI7IFwidXNlIHJlc3RyaWN0XCI7XG5cbi8vTnVtYmVyIG9mIGJpdHMgaW4gYW4gaW50ZWdlclxudmFyIElOVF9CSVRTID0gMzI7XG5cbi8vQ29uc3RhbnRzXG5leHBvcnRzLklOVF9CSVRTICA9IElOVF9CSVRTO1xuZXhwb3J0cy5JTlRfTUFYICAgPSAgMHg3ZmZmZmZmZjtcbmV4cG9ydHMuSU5UX01JTiAgID0gLTE8PChJTlRfQklUUy0xKTtcblxuLy9SZXR1cm5zIC0xLCAwLCArMSBkZXBlbmRpbmcgb24gc2lnbiBvZiB4XG5leHBvcnRzLnNpZ24gPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAodiA+IDApIC0gKHYgPCAwKTtcbn1cblxuLy9Db21wdXRlcyBhYnNvbHV0ZSB2YWx1ZSBvZiBpbnRlZ2VyXG5leHBvcnRzLmFicyA9IGZ1bmN0aW9uKHYpIHtcbiAgdmFyIG1hc2sgPSB2ID4+IChJTlRfQklUUy0xKTtcbiAgcmV0dXJuICh2IF4gbWFzaykgLSBtYXNrO1xufVxuXG4vL0NvbXB1dGVzIG1pbmltdW0gb2YgaW50ZWdlcnMgeCBhbmQgeVxuZXhwb3J0cy5taW4gPSBmdW5jdGlvbih4LCB5KSB7XG4gIHJldHVybiB5IF4gKCh4IF4geSkgJiAtKHggPCB5KSk7XG59XG5cbi8vQ29tcHV0ZXMgbWF4aW11bSBvZiBpbnRlZ2VycyB4IGFuZCB5XG5leHBvcnRzLm1heCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgcmV0dXJuIHggXiAoKHggXiB5KSAmIC0oeCA8IHkpKTtcbn1cblxuLy9DaGVja3MgaWYgYSBudW1iZXIgaXMgYSBwb3dlciBvZiB0d29cbmV4cG9ydHMuaXNQb3cyID0gZnVuY3Rpb24odikge1xuICByZXR1cm4gISh2ICYgKHYtMSkpICYmICghIXYpO1xufVxuXG4vL0NvbXB1dGVzIGxvZyBiYXNlIDIgb2YgdlxuZXhwb3J0cy5sb2cyID0gZnVuY3Rpb24odikge1xuICB2YXIgciwgc2hpZnQ7XG4gIHIgPSAgICAgKHYgPiAweEZGRkYpIDw8IDQ7IHYgPj4+PSByO1xuICBzaGlmdCA9ICh2ID4gMHhGRiAgKSA8PCAzOyB2ID4+Pj0gc2hpZnQ7IHIgfD0gc2hpZnQ7XG4gIHNoaWZ0ID0gKHYgPiAweEYgICApIDw8IDI7IHYgPj4+PSBzaGlmdDsgciB8PSBzaGlmdDtcbiAgc2hpZnQgPSAodiA+IDB4MyAgICkgPDwgMTsgdiA+Pj49IHNoaWZ0OyByIHw9IHNoaWZ0O1xuICByZXR1cm4gciB8ICh2ID4+IDEpO1xufVxuXG4vL0NvbXB1dGVzIGxvZyBiYXNlIDEwIG9mIHZcbmV4cG9ydHMubG9nMTAgPSBmdW5jdGlvbih2KSB7XG4gIHJldHVybiAgKHYgPj0gMTAwMDAwMDAwMCkgPyA5IDogKHYgPj0gMTAwMDAwMDAwKSA/IDggOiAodiA+PSAxMDAwMDAwMCkgPyA3IDpcbiAgICAgICAgICAodiA+PSAxMDAwMDAwKSA/IDYgOiAodiA+PSAxMDAwMDApID8gNSA6ICh2ID49IDEwMDAwKSA/IDQgOlxuICAgICAgICAgICh2ID49IDEwMDApID8gMyA6ICh2ID49IDEwMCkgPyAyIDogKHYgPj0gMTApID8gMSA6IDA7XG59XG5cbi8vQ291bnRzIG51bWJlciBvZiBiaXRzXG5leHBvcnRzLnBvcENvdW50ID0gZnVuY3Rpb24odikge1xuICB2ID0gdiAtICgodiA+Pj4gMSkgJiAweDU1NTU1NTU1KTtcbiAgdiA9ICh2ICYgMHgzMzMzMzMzMykgKyAoKHYgPj4+IDIpICYgMHgzMzMzMzMzMyk7XG4gIHJldHVybiAoKHYgKyAodiA+Pj4gNCkgJiAweEYwRjBGMEYpICogMHgxMDEwMTAxKSA+Pj4gMjQ7XG59XG5cbi8vQ291bnRzIG51bWJlciBvZiB0cmFpbGluZyB6ZXJvc1xuZnVuY3Rpb24gY291bnRUcmFpbGluZ1plcm9zKHYpIHtcbiAgdmFyIGMgPSAzMjtcbiAgdiAmPSAtdjtcbiAgaWYgKHYpIGMtLTtcbiAgaWYgKHYgJiAweDAwMDBGRkZGKSBjIC09IDE2O1xuICBpZiAodiAmIDB4MDBGRjAwRkYpIGMgLT0gODtcbiAgaWYgKHYgJiAweDBGMEYwRjBGKSBjIC09IDQ7XG4gIGlmICh2ICYgMHgzMzMzMzMzMykgYyAtPSAyO1xuICBpZiAodiAmIDB4NTU1NTU1NTUpIGMgLT0gMTtcbiAgcmV0dXJuIGM7XG59XG5leHBvcnRzLmNvdW50VHJhaWxpbmdaZXJvcyA9IGNvdW50VHJhaWxpbmdaZXJvcztcblxuLy9Sb3VuZHMgdG8gbmV4dCBwb3dlciBvZiAyXG5leHBvcnRzLm5leHRQb3cyID0gZnVuY3Rpb24odikge1xuICB2ICs9IHYgPT09IDA7XG4gIC0tdjtcbiAgdiB8PSB2ID4+PiAxO1xuICB2IHw9IHYgPj4+IDI7XG4gIHYgfD0gdiA+Pj4gNDtcbiAgdiB8PSB2ID4+PiA4O1xuICB2IHw9IHYgPj4+IDE2O1xuICByZXR1cm4gdiArIDE7XG59XG5cbi8vUm91bmRzIGRvd24gdG8gcHJldmlvdXMgcG93ZXIgb2YgMlxuZXhwb3J0cy5wcmV2UG93MiA9IGZ1bmN0aW9uKHYpIHtcbiAgdiB8PSB2ID4+PiAxO1xuICB2IHw9IHYgPj4+IDI7XG4gIHYgfD0gdiA+Pj4gNDtcbiAgdiB8PSB2ID4+PiA4O1xuICB2IHw9IHYgPj4+IDE2O1xuICByZXR1cm4gdiAtICh2Pj4+MSk7XG59XG5cbi8vQ29tcHV0ZXMgcGFyaXR5IG9mIHdvcmRcbmV4cG9ydHMucGFyaXR5ID0gZnVuY3Rpb24odikge1xuICB2IF49IHYgPj4+IDE2O1xuICB2IF49IHYgPj4+IDg7XG4gIHYgXj0gdiA+Pj4gNDtcbiAgdiAmPSAweGY7XG4gIHJldHVybiAoMHg2OTk2ID4+PiB2KSAmIDE7XG59XG5cbnZhciBSRVZFUlNFX1RBQkxFID0gbmV3IEFycmF5KDI1Nik7XG5cbihmdW5jdGlvbih0YWIpIHtcbiAgZm9yKHZhciBpPTA7IGk8MjU2OyArK2kpIHtcbiAgICB2YXIgdiA9IGksIHIgPSBpLCBzID0gNztcbiAgICBmb3IgKHYgPj4+PSAxOyB2OyB2ID4+Pj0gMSkge1xuICAgICAgciA8PD0gMTtcbiAgICAgIHIgfD0gdiAmIDE7XG4gICAgICAtLXM7XG4gICAgfVxuICAgIHRhYltpXSA9IChyIDw8IHMpICYgMHhmZjtcbiAgfVxufSkoUkVWRVJTRV9UQUJMRSk7XG5cbi8vUmV2ZXJzZSBiaXRzIGluIGEgMzIgYml0IHdvcmRcbmV4cG9ydHMucmV2ZXJzZSA9IGZ1bmN0aW9uKHYpIHtcbiAgcmV0dXJuICAoUkVWRVJTRV9UQUJMRVsgdiAgICAgICAgICYgMHhmZl0gPDwgMjQpIHxcbiAgICAgICAgICAoUkVWRVJTRV9UQUJMRVsodiA+Pj4gOCkgICYgMHhmZl0gPDwgMTYpIHxcbiAgICAgICAgICAoUkVWRVJTRV9UQUJMRVsodiA+Pj4gMTYpICYgMHhmZl0gPDwgOCkgIHxcbiAgICAgICAgICAgUkVWRVJTRV9UQUJMRVsodiA+Pj4gMjQpICYgMHhmZl07XG59XG5cbi8vSW50ZXJsZWF2ZSBiaXRzIG9mIDIgY29vcmRpbmF0ZXMgd2l0aCAxNiBiaXRzLiAgVXNlZnVsIGZvciBmYXN0IHF1YWR0cmVlIGNvZGVzXG5leHBvcnRzLmludGVybGVhdmUyID0gZnVuY3Rpb24oeCwgeSkge1xuICB4ICY9IDB4RkZGRjtcbiAgeCA9ICh4IHwgKHggPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgeCA9ICh4IHwgKHggPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgeCA9ICh4IHwgKHggPDwgMikpICYgMHgzMzMzMzMzMztcbiAgeCA9ICh4IHwgKHggPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICB5ICY9IDB4RkZGRjtcbiAgeSA9ICh5IHwgKHkgPDwgOCkpICYgMHgwMEZGMDBGRjtcbiAgeSA9ICh5IHwgKHkgPDwgNCkpICYgMHgwRjBGMEYwRjtcbiAgeSA9ICh5IHwgKHkgPDwgMikpICYgMHgzMzMzMzMzMztcbiAgeSA9ICh5IHwgKHkgPDwgMSkpICYgMHg1NTU1NTU1NTtcblxuICByZXR1cm4geCB8ICh5IDw8IDEpO1xufVxuXG4vL0V4dHJhY3RzIHRoZSBudGggaW50ZXJsZWF2ZWQgY29tcG9uZW50XG5leHBvcnRzLmRlaW50ZXJsZWF2ZTIgPSBmdW5jdGlvbih2LCBuKSB7XG4gIHYgPSAodiA+Pj4gbikgJiAweDU1NTU1NTU1O1xuICB2ID0gKHYgfCAodiA+Pj4gMSkpICAmIDB4MzMzMzMzMzM7XG4gIHYgPSAodiB8ICh2ID4+PiAyKSkgICYgMHgwRjBGMEYwRjtcbiAgdiA9ICh2IHwgKHYgPj4+IDQpKSAgJiAweDAwRkYwMEZGO1xuICB2ID0gKHYgfCAodiA+Pj4gMTYpKSAmIDB4MDAwRkZGRjtcbiAgcmV0dXJuICh2IDw8IDE2KSA+PiAxNjtcbn1cblxuXG4vL0ludGVybGVhdmUgYml0cyBvZiAzIGNvb3JkaW5hdGVzLCBlYWNoIHdpdGggMTAgYml0cy4gIFVzZWZ1bCBmb3IgZmFzdCBvY3RyZWUgY29kZXNcbmV4cG9ydHMuaW50ZXJsZWF2ZTMgPSBmdW5jdGlvbih4LCB5LCB6KSB7XG4gIHggJj0gMHgzRkY7XG4gIHggID0gKHggfCAoeDw8MTYpKSAmIDQyNzgxOTAzMzU7XG4gIHggID0gKHggfCAoeDw8OCkpICAmIDI1MTcxOTY5NTtcbiAgeCAgPSAoeCB8ICh4PDw0KSkgICYgMzI3MjM1NjAzNTtcbiAgeCAgPSAoeCB8ICh4PDwyKSkgICYgMTIyNzEzMzUxMztcblxuICB5ICY9IDB4M0ZGO1xuICB5ICA9ICh5IHwgKHk8PDE2KSkgJiA0Mjc4MTkwMzM1O1xuICB5ICA9ICh5IHwgKHk8PDgpKSAgJiAyNTE3MTk2OTU7XG4gIHkgID0gKHkgfCAoeTw8NCkpICAmIDMyNzIzNTYwMzU7XG4gIHkgID0gKHkgfCAoeTw8MikpICAmIDEyMjcxMzM1MTM7XG4gIHggfD0gKHkgPDwgMSk7XG4gIFxuICB6ICY9IDB4M0ZGO1xuICB6ICA9ICh6IHwgKHo8PDE2KSkgJiA0Mjc4MTkwMzM1O1xuICB6ICA9ICh6IHwgKHo8PDgpKSAgJiAyNTE3MTk2OTU7XG4gIHogID0gKHogfCAoejw8NCkpICAmIDMyNzIzNTYwMzU7XG4gIHogID0gKHogfCAoejw8MikpICAmIDEyMjcxMzM1MTM7XG4gIFxuICByZXR1cm4geCB8ICh6IDw8IDIpO1xufVxuXG4vL0V4dHJhY3RzIG50aCBpbnRlcmxlYXZlZCBjb21wb25lbnQgb2YgYSAzLXR1cGxlXG5leHBvcnRzLmRlaW50ZXJsZWF2ZTMgPSBmdW5jdGlvbih2LCBuKSB7XG4gIHYgPSAodiA+Pj4gbikgICAgICAgJiAxMjI3MTMzNTEzO1xuICB2ID0gKHYgfCAodj4+PjIpKSAgICYgMzI3MjM1NjAzNTtcbiAgdiA9ICh2IHwgKHY+Pj40KSkgICAmIDI1MTcxOTY5NTtcbiAgdiA9ICh2IHwgKHY+Pj44KSkgICAmIDQyNzgxOTAzMzU7XG4gIHYgPSAodiB8ICh2Pj4+MTYpKSAgJiAweDNGRjtcbiAgcmV0dXJuICh2PDwyMik+PjIyO1xufVxuXG4vL0NvbXB1dGVzIG5leHQgY29tYmluYXRpb24gaW4gY29sZXhpY29ncmFwaGljIG9yZGVyICh0aGlzIGlzIG1pc3Rha2VubHkgY2FsbGVkIG5leHRQZXJtdXRhdGlvbiBvbiB0aGUgYml0IHR3aWRkbGluZyBoYWNrcyBwYWdlKVxuZXhwb3J0cy5uZXh0Q29tYmluYXRpb24gPSBmdW5jdGlvbih2KSB7XG4gIHZhciB0ID0gdiB8ICh2IC0gMSk7XG4gIHJldHVybiAodCArIDEpIHwgKCgofnQgJiAtfnQpIC0gMSkgPj4+IChjb3VudFRyYWlsaW5nWmVyb3ModikgKyAxKSk7XG59XG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2JpdC10d2lkZGxlL3R3aWRkbGUuanNcbi8vIG1vZHVsZSBpZCA9IDQ4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIGR1cGVfYXJyYXkoY291bnQsIHZhbHVlLCBpKSB7XG4gIHZhciBjID0gY291bnRbaV18MFxuICBpZihjIDw9IDApIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5KGMpLCBqXG4gIGlmKGkgPT09IGNvdW50Lmxlbmd0aC0xKSB7XG4gICAgZm9yKGo9MDsgajxjOyArK2opIHtcbiAgICAgIHJlc3VsdFtqXSA9IHZhbHVlXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvcihqPTA7IGo8YzsgKytqKSB7XG4gICAgICByZXN1bHRbal0gPSBkdXBlX2FycmF5KGNvdW50LCB2YWx1ZSwgaSsxKVxuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGR1cGVfbnVtYmVyKGNvdW50LCB2YWx1ZSkge1xuICB2YXIgcmVzdWx0LCBpXG4gIHJlc3VsdCA9IG5ldyBBcnJheShjb3VudClcbiAgZm9yKGk9MDsgaTxjb3VudDsgKytpKSB7XG4gICAgcmVzdWx0W2ldID0gdmFsdWVcbiAgfVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmZ1bmN0aW9uIGR1cGUoY291bnQsIHZhbHVlKSB7XG4gIGlmKHR5cGVvZiB2YWx1ZSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhbHVlID0gMFxuICB9XG4gIHN3aXRjaCh0eXBlb2YgY291bnQpIHtcbiAgICBjYXNlIFwibnVtYmVyXCI6XG4gICAgICBpZihjb3VudCA+IDApIHtcbiAgICAgICAgcmV0dXJuIGR1cGVfbnVtYmVyKGNvdW50fDAsIHZhbHVlKVxuICAgICAgfVxuICAgIGJyZWFrXG4gICAgY2FzZSBcIm9iamVjdFwiOlxuICAgICAgaWYodHlwZW9mIChjb3VudC5sZW5ndGgpID09PSBcIm51bWJlclwiKSB7XG4gICAgICAgIHJldHVybiBkdXBlX2FycmF5KGNvdW50LCB2YWx1ZSwgMClcbiAgICAgIH1cbiAgICBicmVha1xuICB9XG4gIHJldHVybiBbXVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGR1cGVcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9kdXAvZHVwLmpzXG4vLyBtb2R1bGUgaWQgPSA0OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY29tcGlsZSA9IHJlcXVpcmUoXCJjd2lzZS1jb21waWxlclwiKVxuXG52YXIgRW1wdHlQcm9jID0ge1xuICBib2R5OiBcIlwiLFxuICBhcmdzOiBbXSxcbiAgdGhpc1ZhcnM6IFtdLFxuICBsb2NhbFZhcnM6IFtdXG59XG5cbmZ1bmN0aW9uIGZpeHVwKHgpIHtcbiAgaWYoIXgpIHtcbiAgICByZXR1cm4gRW1wdHlQcm9jXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8eC5hcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGEgPSB4LmFyZ3NbaV1cbiAgICBpZihpID09PSAwKSB7XG4gICAgICB4LmFyZ3NbaV0gPSB7bmFtZTogYSwgbHZhbHVlOnRydWUsIHJ2YWx1ZTogISF4LnJ2YWx1ZSwgY291bnQ6eC5jb3VudHx8MSB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHguYXJnc1tpXSA9IHtuYW1lOiBhLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDogMX1cbiAgICB9XG4gIH1cbiAgaWYoIXgudGhpc1ZhcnMpIHtcbiAgICB4LnRoaXNWYXJzID0gW11cbiAgfVxuICBpZigheC5sb2NhbFZhcnMpIHtcbiAgICB4LmxvY2FsVmFycyA9IFtdXG4gIH1cbiAgcmV0dXJuIHhcbn1cblxuZnVuY3Rpb24gcGNvbXBpbGUodXNlcl9hcmdzKSB7XG4gIHJldHVybiBjb21waWxlKHtcbiAgICBhcmdzOiAgICAgdXNlcl9hcmdzLmFyZ3MsXG4gICAgcHJlOiAgICAgIGZpeHVwKHVzZXJfYXJncy5wcmUpLFxuICAgIGJvZHk6ICAgICBmaXh1cCh1c2VyX2FyZ3MuYm9keSksXG4gICAgcG9zdDogICAgIGZpeHVwKHVzZXJfYXJncy5wcm9jKSxcbiAgICBmdW5jTmFtZTogdXNlcl9hcmdzLmZ1bmNOYW1lXG4gIH0pXG59XG5cbmZ1bmN0aW9uIG1ha2VPcCh1c2VyX2FyZ3MpIHtcbiAgdmFyIGFyZ3MgPSBbXVxuICBmb3IodmFyIGk9MDsgaTx1c2VyX2FyZ3MuYXJncy5sZW5ndGg7ICsraSkge1xuICAgIGFyZ3MucHVzaChcImFcIitpKVxuICB9XG4gIHZhciB3cmFwcGVyID0gbmV3IEZ1bmN0aW9uKFwiUFwiLCBbXG4gICAgXCJyZXR1cm4gZnVuY3Rpb24gXCIsIHVzZXJfYXJncy5mdW5jTmFtZSwgXCJfbmRhcnJheW9wcyhcIiwgYXJncy5qb2luKFwiLFwiKSwgXCIpIHtQKFwiLCBhcmdzLmpvaW4oXCIsXCIpLCBcIik7cmV0dXJuIGEwfVwiXG4gIF0uam9pbihcIlwiKSlcbiAgcmV0dXJuIHdyYXBwZXIocGNvbXBpbGUodXNlcl9hcmdzKSlcbn1cblxudmFyIGFzc2lnbl9vcHMgPSB7XG4gIGFkZDogIFwiK1wiLFxuICBzdWI6ICBcIi1cIixcbiAgbXVsOiAgXCIqXCIsXG4gIGRpdjogIFwiL1wiLFxuICBtb2Q6ICBcIiVcIixcbiAgYmFuZDogXCImXCIsXG4gIGJvcjogIFwifFwiLFxuICBieG9yOiBcIl5cIixcbiAgbHNoaWZ0OiBcIjw8XCIsXG4gIHJzaGlmdDogXCI+PlwiLFxuICBycnNoaWZ0OiBcIj4+PlwiXG59XG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaWQgaW4gYXNzaWduX29wcykge1xuICAgIHZhciBvcCA9IGFzc2lnbl9vcHNbaWRdXG4gICAgZXhwb3J0c1tpZF0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCIsXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sXG4gICAgICAgICAgICAgYm9keTogXCJhPWJcIitvcCtcImNcIn0sXG4gICAgICBmdW5jTmFtZTogaWRcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJlcVwiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhXCIrb3ArXCI9YlwifSxcbiAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgIGZ1bmNOYW1lOiBpZCtcImVxXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJzXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWJcIitvcCtcInNcIn0sXG4gICAgICBmdW5jTmFtZTogaWQrXCJzXCJcbiAgICB9KVxuICAgIGV4cG9ydHNbaWQrXCJzZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIixcInNcIl0sXG4gICAgICAgICAgICAgYm9keTpcImFcIitvcCtcIj1zXCJ9LFxuICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgZnVuY05hbWU6IGlkK1wic2VxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgdW5hcnlfb3BzID0ge1xuICBub3Q6IFwiIVwiLFxuICBibm90OiBcIn5cIixcbiAgbmVnOiBcIi1cIixcbiAgcmVjaXA6IFwiMS4wL1wiXG59XG47KGZ1bmN0aW9uKCl7XG4gIGZvcih2YXIgaWQgaW4gdW5hcnlfb3BzKSB7XG4gICAgdmFyIG9wID0gdW5hcnlfb3BzW2lkXVxuICAgIGV4cG9ydHNbaWRdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPVwiK29wK1wiYlwifSxcbiAgICAgIGZ1bmNOYW1lOiBpZFxuICAgIH0pXG4gICAgZXhwb3J0c1tpZCtcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1cIitvcCtcImFcIn0sXG4gICAgICBydmFsdWU6IHRydWUsXG4gICAgICBjb3VudDogMixcbiAgICAgIGZ1bmNOYW1lOiBpZCtcImVxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgYmluYXJ5X29wcyA9IHtcbiAgYW5kOiBcIiYmXCIsXG4gIG9yOiBcInx8XCIsXG4gIGVxOiBcIj09PVwiLFxuICBuZXE6IFwiIT09XCIsXG4gIGx0OiBcIjxcIixcbiAgZ3Q6IFwiPlwiLFxuICBsZXE6IFwiPD1cIixcbiAgZ2VxOiBcIj49XCJcbn1cbjsoZnVuY3Rpb24oKSB7XG4gIGZvcih2YXIgaWQgaW4gYmluYXJ5X29wcykge1xuICAgIHZhciBvcCA9IGJpbmFyeV9vcHNbaWRdXG4gICAgZXhwb3J0c1tpZF0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIixcImFycmF5XCIsXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCIsIFwiY1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1iXCIrb3ArXCJjXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic1wiXSA9IG1ha2VPcCh7XG4gICAgICBhcmdzOiBbXCJhcnJheVwiLFwiYXJyYXlcIixcInNjYWxhclwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCIsIFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1iXCIrb3ArXCJzXCJ9LFxuICAgICAgZnVuY05hbWU6IGlkK1wic1wiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wiZXFcIl0gPSBtYWtlT3Aoe1xuICAgICAgYXJnczogW1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgIGJvZHk6IHthcmdzOltcImFcIiwgXCJiXCJdLFxuICAgICAgICAgICAgIGJvZHk6XCJhPWFcIitvcCtcImJcIn0sXG4gICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgIGNvdW50OjIsXG4gICAgICBmdW5jTmFtZTogaWQrXCJlcVwiXG4gICAgfSlcbiAgICBleHBvcnRzW2lkK1wic2VxXCJdID0gbWFrZU9wKHtcbiAgICAgIGFyZ3M6IFtcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwic1wiXSxcbiAgICAgICAgICAgICBib2R5OlwiYT1hXCIrb3ArXCJzXCJ9LFxuICAgICAgcnZhbHVlOnRydWUsXG4gICAgICBjb3VudDoyLFxuICAgICAgZnVuY05hbWU6IGlkK1wic2VxXCJcbiAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF91bmFyeSA9IFtcbiAgXCJhYnNcIixcbiAgXCJhY29zXCIsXG4gIFwiYXNpblwiLFxuICBcImF0YW5cIixcbiAgXCJjZWlsXCIsXG4gIFwiY29zXCIsXG4gIFwiZXhwXCIsXG4gIFwiZmxvb3JcIixcbiAgXCJsb2dcIixcbiAgXCJyb3VuZFwiLFxuICBcInNpblwiLFxuICBcInNxcnRcIixcbiAgXCJ0YW5cIlxuXVxuOyhmdW5jdGlvbigpIHtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF91bmFyeS5sZW5ndGg7ICsraSkge1xuICAgIHZhciBmID0gbWF0aF91bmFyeVtpXVxuICAgIGV4cG9ydHNbZl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgICBhcmdzOiBbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcImVxXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgICAgICBhcmdzOiBbXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczogW1wiYVwiXSwgYm9keTpcImE9dGhpc19mKGEpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmNOYW1lOiBmK1wiZXFcIlxuICAgICAgICAgICAgICAgICAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF9jb21tID0gW1xuICBcIm1heFwiLFxuICBcIm1pblwiLFxuICBcImF0YW4yXCIsXG4gIFwicG93XCJcbl1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF9jb21tLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGY9IG1hdGhfY29tbVtpXVxuICAgIGV4cG9ydHNbZl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwiYXJyYXlcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGMpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZlxuICAgICAgICAgICAgICAgIH0pXG4gICAgZXhwb3J0c1tmK1wic1wiXSA9IG1ha2VPcCh7XG4gICAgICAgICAgICAgICAgICBhcmdzOltcImFycmF5XCIsIFwiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIixcImNcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGMpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcInNcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgICAgICAgICAgICAgICAgIHByZToge2FyZ3M6W10sIGJvZHk6XCJ0aGlzX2Y9TWF0aC5cIitmLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgYm9keToge2FyZ3M6W1wiYVwiLFwiYlwiXSwgYm9keTpcImE9dGhpc19mKGEsYilcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIHJ2YWx1ZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OiAyLFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICAgIGV4cG9ydHNbZitcInNlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihhLGIpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OjIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcInNlcVwiXG4gICAgICAgICAgICAgICAgICB9KVxuICB9XG59KSgpO1xuXG52YXIgbWF0aF9ub25jb21tID0gW1xuICBcImF0YW4yXCIsXG4gIFwicG93XCJcbl1cbjsoZnVuY3Rpb24oKXtcbiAgZm9yKHZhciBpPTA7IGk8bWF0aF9ub25jb21tLmxlbmd0aDsgKytpKSB7XG4gICAgdmFyIGY9IG1hdGhfbm9uY29tbVtpXVxuICAgIGV4cG9ydHNbZitcIm9wXCJdID0gbWFrZU9wKHtcbiAgICAgICAgICAgICAgICAgIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYyxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcFwiXG4gICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcHNcIl0gPSBtYWtlT3Aoe1xuICAgICAgICAgICAgICAgICAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCIsIFwic2NhbGFyXCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCIsXCJjXCJdLCBib2R5OlwiYT10aGlzX2YoYyxiKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgZnVuY05hbWU6IGYrXCJvcHNcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcGVxXCJdID0gbWFrZU9wKHsgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICAgICAgICAgICAgICAgICAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLlwiK2YsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBib2R5OiB7YXJnczpbXCJhXCIsXCJiXCJdLCBib2R5OlwiYT10aGlzX2YoYixhKVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICAgICAgICAgICAgICAgICAgcnZhbHVlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgY291bnQ6IDIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wZXFcIlxuICAgICAgICAgICAgICAgICAgfSlcbiAgICBleHBvcnRzW2YrXCJvcHNlcVwiXSA9IG1ha2VPcCh7IGFyZ3M6W1wiYXJyYXlcIiwgXCJzY2FsYXJcIl0sXG4gICAgICAgICAgICAgICAgICBwcmU6IHthcmdzOltdLCBib2R5OlwidGhpc19mPU1hdGguXCIrZiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgICAgICAgICAgICAgICAgIGJvZHk6IHthcmdzOltcImFcIixcImJcIl0sIGJvZHk6XCJhPXRoaXNfZihiLGEpXCIsIHRoaXNWYXJzOltcInRoaXNfZlwiXX0sXG4gICAgICAgICAgICAgICAgICBydmFsdWU6dHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGNvdW50OjIsXG4gICAgICAgICAgICAgICAgICBmdW5jTmFtZTogZitcIm9wc2VxXCJcbiAgICAgICAgICAgICAgICAgIH0pXG4gIH1cbn0pKCk7XG5cbmV4cG9ydHMuYW55ID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZTogRW1wdHlQcm9jLFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJpZihhKXtyZXR1cm4gdHJ1ZX1cIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W10sIGJvZHk6XCJyZXR1cm4gZmFsc2VcIn0sXG4gIGZ1bmNOYW1lOiBcImFueVwiXG59KVxuXG5leHBvcnRzLmFsbCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IEVtcHR5UHJvYyxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwieFwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoxfV0sIGJvZHk6IFwiaWYoIXgpe3JldHVybiBmYWxzZX1cIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W10sIGJvZHk6XCJyZXR1cm4gdHJ1ZVwifSxcbiAgZnVuY05hbWU6IFwiYWxsXCJcbn0pXG5cbmV4cG9ydHMuc3VtID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBib2R5OiBcInRoaXNfcys9YVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwic3VtXCJcbn0pXG5cbmV4cG9ydHMucHJvZCA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0xXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjF9XSwgYm9keTogXCJ0aGlzX3MqPWFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcInByb2RcIlxufSlcblxuZXhwb3J0cy5ub3JtMnNxdWFyZWQgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoyfV0sIGJvZHk6IFwidGhpc19zKz1hKmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm0yc3F1YXJlZFwiXG59KVxuICBcbmV4cG9ydHMubm9ybTIgPSBjb21waWxlKHtcbiAgYXJnczpbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgbG9jYWxWYXJzOltdLCB0aGlzVmFyczpbXCJ0aGlzX3NcIl0sIGJvZHk6XCJ0aGlzX3M9MFwifSxcbiAgYm9keToge2FyZ3M6W3tuYW1lOlwiYVwiLCBsdmFsdWU6ZmFsc2UsIHJ2YWx1ZTp0cnVlLCBjb3VudDoyfV0sIGJvZHk6IFwidGhpc19zKz1hKmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiBNYXRoLnNxcnQodGhpc19zKVwifSxcbiAgZnVuY05hbWU6IFwibm9ybTJcIlxufSlcbiAgXG5cbmV4cG9ydHMubm9ybWluZiA9IGNvbXBpbGUoe1xuICBhcmdzOltcImFycmF5XCJdLFxuICBwcmU6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInRoaXNfcz0wXCJ9LFxuICBib2R5OiB7YXJnczpbe25hbWU6XCJhXCIsIGx2YWx1ZTpmYWxzZSwgcnZhbHVlOnRydWUsIGNvdW50OjR9XSwgYm9keTpcImlmKC1hPnRoaXNfcyl7dGhpc19zPS1hfWVsc2UgaWYoYT50aGlzX3Mpe3RoaXNfcz1hfVwiLCBsb2NhbFZhcnM6IFtdLCB0aGlzVmFyczogW1widGhpc19zXCJdfSxcbiAgcG9zdDoge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwicmV0dXJuIHRoaXNfc1wifSxcbiAgZnVuY05hbWU6IFwibm9ybWluZlwiXG59KVxuXG5leHBvcnRzLm5vcm0xID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIl0sXG4gIHByZToge2FyZ3M6W10sIGxvY2FsVmFyczpbXSwgdGhpc1ZhcnM6W1widGhpc19zXCJdLCBib2R5OlwidGhpc19zPTBcIn0sXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcImFcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6M31dLCBib2R5OiBcInRoaXNfcys9YTwwPy1hOmFcIiwgbG9jYWxWYXJzOiBbXSwgdGhpc1ZhcnM6IFtcInRoaXNfc1wiXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltcInRoaXNfc1wiXSwgYm9keTpcInJldHVybiB0aGlzX3NcIn0sXG4gIGZ1bmNOYW1lOiBcIm5vcm0xXCJcbn0pXG5cbmV4cG9ydHMuc3VwID0gY29tcGlsZSh7XG4gIGFyZ3M6IFsgXCJhcnJheVwiIF0sXG4gIHByZTpcbiAgIHsgYm9keTogXCJ0aGlzX2g9LUluZmluaXR5XCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgYm9keTpcbiAgIHsgYm9keTogXCJpZihfaW5saW5lXzFfYXJnMF8+dGhpc19oKXRoaXNfaD1faW5saW5lXzFfYXJnMF9cIixcbiAgICAgYXJnczogW3tcIm5hbWVcIjpcIl9pbmxpbmVfMV9hcmcwX1wiLFwibHZhbHVlXCI6ZmFsc2UsXCJydmFsdWVcIjp0cnVlLFwiY291bnRcIjoyfSBdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfSxcbiAgcG9zdDpcbiAgIHsgYm9keTogXCJyZXR1cm4gdGhpc19oXCIsXG4gICAgIGFyZ3M6IFtdLFxuICAgICB0aGlzVmFyczogWyBcInRoaXNfaFwiIF0sXG4gICAgIGxvY2FsVmFyczogW10gfVxuIH0pXG5cbmV4cG9ydHMuaW5mID0gY29tcGlsZSh7XG4gIGFyZ3M6IFsgXCJhcnJheVwiIF0sXG4gIHByZTpcbiAgIHsgYm9keTogXCJ0aGlzX2g9SW5maW5pdHlcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBib2R5OlxuICAgeyBib2R5OiBcImlmKF9pbmxpbmVfMV9hcmcwXzx0aGlzX2gpdGhpc19oPV9pbmxpbmVfMV9hcmcwX1wiLFxuICAgICBhcmdzOiBbe1wibmFtZVwiOlwiX2lubGluZV8xX2FyZzBfXCIsXCJsdmFsdWVcIjpmYWxzZSxcInJ2YWx1ZVwiOnRydWUsXCJjb3VudFwiOjJ9IF0sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9LFxuICBwb3N0OlxuICAgeyBib2R5OiBcInJldHVybiB0aGlzX2hcIixcbiAgICAgYXJnczogW10sXG4gICAgIHRoaXNWYXJzOiBbIFwidGhpc19oXCIgXSxcbiAgICAgbG9jYWxWYXJzOiBbXSB9XG4gfSlcblxuZXhwb3J0cy5hcmdtaW4gPSBjb21waWxlKHtcbiAgYXJnczpbXCJpbmRleFwiLFwiYXJyYXlcIixcInNoYXBlXCJdLFxuICBwcmU6e1xuICAgIGJvZHk6XCJ7dGhpc192PUluZmluaXR5O3RoaXNfaT1faW5saW5lXzBfYXJnMl8uc2xpY2UoMCl9XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6ZmFsc2UsY291bnQ6MH0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMF9hcmcyX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoxfVxuICAgICAgXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W119LFxuICBib2R5OntcbiAgICBib2R5Olwie2lmKF9pbmxpbmVfMV9hcmcxXzx0aGlzX3Ype3RoaXNfdj1faW5saW5lXzFfYXJnMV87Zm9yKHZhciBfaW5saW5lXzFfaz0wO19pbmxpbmVfMV9rPF9pbmxpbmVfMV9hcmcwXy5sZW5ndGg7KytfaW5saW5lXzFfayl7dGhpc19pW19pbmxpbmVfMV9rXT1faW5saW5lXzFfYXJnMF9bX2lubGluZV8xX2tdfX19XCIsXG4gICAgYXJnczpbXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcwX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfSxcbiAgICAgIHtuYW1lOlwiX2lubGluZV8xX2FyZzFfXCIsbHZhbHVlOmZhbHNlLHJ2YWx1ZTp0cnVlLGNvdW50OjJ9XSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIixcInRoaXNfdlwiXSxcbiAgICBsb2NhbFZhcnM6W1wiX2lubGluZV8xX2tcIl19LFxuICBwb3N0OntcbiAgICBib2R5Olwie3JldHVybiB0aGlzX2l9XCIsXG4gICAgYXJnczpbXSxcbiAgICB0aGlzVmFyczpbXCJ0aGlzX2lcIl0sXG4gICAgbG9jYWxWYXJzOltdfVxufSlcblxuZXhwb3J0cy5hcmdtYXggPSBjb21waWxlKHtcbiAgYXJnczpbXCJpbmRleFwiLFwiYXJyYXlcIixcInNoYXBlXCJdLFxuICBwcmU6e1xuICAgIGJvZHk6XCJ7dGhpc192PS1JbmZpbml0eTt0aGlzX2k9X2lubGluZV8wX2FyZzJfLnNsaWNlKDApfVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMV9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOmZhbHNlLGNvdW50OjB9LFxuICAgICAge25hbWU6XCJfaW5saW5lXzBfYXJnMl9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6MX1cbiAgICAgIF0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltdfSxcbiAgYm9keTp7XG4gICAgYm9keTpcIntpZihfaW5saW5lXzFfYXJnMV8+dGhpc192KXt0aGlzX3Y9X2lubGluZV8xX2FyZzFfO2Zvcih2YXIgX2lubGluZV8xX2s9MDtfaW5saW5lXzFfazxfaW5saW5lXzFfYXJnMF8ubGVuZ3RoOysrX2lubGluZV8xX2spe3RoaXNfaVtfaW5saW5lXzFfa109X2lubGluZV8xX2FyZzBfW19pbmxpbmVfMV9rXX19fVwiLFxuICAgIGFyZ3M6W1xuICAgICAge25hbWU6XCJfaW5saW5lXzFfYXJnMF9cIixsdmFsdWU6ZmFsc2UscnZhbHVlOnRydWUsY291bnQ6Mn0sXG4gICAgICB7bmFtZTpcIl9pbmxpbmVfMV9hcmcxX1wiLGx2YWx1ZTpmYWxzZSxydmFsdWU6dHJ1ZSxjb3VudDoyfV0sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCIsXCJ0aGlzX3ZcIl0sXG4gICAgbG9jYWxWYXJzOltcIl9pbmxpbmVfMV9rXCJdfSxcbiAgcG9zdDp7XG4gICAgYm9keTpcIntyZXR1cm4gdGhpc19pfVwiLFxuICAgIGFyZ3M6W10sXG4gICAgdGhpc1ZhcnM6W1widGhpc19pXCJdLFxuICAgIGxvY2FsVmFyczpbXX1cbn0pICBcblxuZXhwb3J0cy5yYW5kb20gPSBtYWtlT3Aoe1xuICBhcmdzOiBbXCJhcnJheVwiXSxcbiAgcHJlOiB7YXJnczpbXSwgYm9keTpcInRoaXNfZj1NYXRoLnJhbmRvbVwiLCB0aGlzVmFyczpbXCJ0aGlzX2ZcIl19LFxuICBib2R5OiB7YXJnczogW1wiYVwiXSwgYm9keTpcImE9dGhpc19mKClcIiwgdGhpc1ZhcnM6W1widGhpc19mXCJdfSxcbiAgZnVuY05hbWU6IFwicmFuZG9tXCJcbn0pXG5cbmV4cG9ydHMuYXNzaWduID0gbWFrZU9wKHtcbiAgYXJnczpbXCJhcnJheVwiLCBcImFycmF5XCJdLFxuICBib2R5OiB7YXJnczpbXCJhXCIsIFwiYlwiXSwgYm9keTpcImE9YlwifSxcbiAgZnVuY05hbWU6IFwiYXNzaWduXCIgfSlcblxuZXhwb3J0cy5hc3NpZ25zID0gbWFrZU9wKHtcbiAgYXJnczpbXCJhcnJheVwiLCBcInNjYWxhclwiXSxcbiAgYm9keToge2FyZ3M6W1wiYVwiLCBcImJcIl0sIGJvZHk6XCJhPWJcIn0sXG4gIGZ1bmNOYW1lOiBcImFzc2lnbnNcIiB9KVxuXG5cbmV4cG9ydHMuZXF1YWxzID0gY29tcGlsZSh7XG4gIGFyZ3M6W1wiYXJyYXlcIiwgXCJhcnJheVwiXSxcbiAgcHJlOiBFbXB0eVByb2MsXG4gIGJvZHk6IHthcmdzOlt7bmFtZTpcInhcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX0sXG4gICAgICAgICAgICAgICB7bmFtZTpcInlcIiwgbHZhbHVlOmZhbHNlLCBydmFsdWU6dHJ1ZSwgY291bnQ6MX1dLCBcbiAgICAgICAgYm9keTogXCJpZih4IT09eSl7cmV0dXJuIGZhbHNlfVwiLCBcbiAgICAgICAgbG9jYWxWYXJzOiBbXSwgXG4gICAgICAgIHRoaXNWYXJzOiBbXX0sXG4gIHBvc3Q6IHthcmdzOltdLCBsb2NhbFZhcnM6W10sIHRoaXNWYXJzOltdLCBib2R5OlwicmV0dXJuIHRydWVcIn0sXG4gIGZ1bmNOYW1lOiBcImVxdWFsc1wiXG59KVxuXG5cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL25kYXJyYXktb3BzL25kYXJyYXktb3BzLmpzXG4vLyBtb2R1bGUgaWQgPSA1MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgY3JlYXRlVGh1bmsgPSByZXF1aXJlKFwiLi9saWIvdGh1bmsuanNcIilcblxuZnVuY3Rpb24gUHJvY2VkdXJlKCkge1xuICB0aGlzLmFyZ1R5cGVzID0gW11cbiAgdGhpcy5zaGltQXJncyA9IFtdXG4gIHRoaXMuYXJyYXlBcmdzID0gW11cbiAgdGhpcy5hcnJheUJsb2NrSW5kaWNlcyA9IFtdXG4gIHRoaXMuc2NhbGFyQXJncyA9IFtdXG4gIHRoaXMub2Zmc2V0QXJncyA9IFtdXG4gIHRoaXMub2Zmc2V0QXJnSW5kZXggPSBbXVxuICB0aGlzLmluZGV4QXJncyA9IFtdXG4gIHRoaXMuc2hhcGVBcmdzID0gW11cbiAgdGhpcy5mdW5jTmFtZSA9IFwiXCJcbiAgdGhpcy5wcmUgPSBudWxsXG4gIHRoaXMuYm9keSA9IG51bGxcbiAgdGhpcy5wb3N0ID0gbnVsbFxuICB0aGlzLmRlYnVnID0gZmFsc2Vcbn1cblxuZnVuY3Rpb24gY29tcGlsZUN3aXNlKHVzZXJfYXJncykge1xuICAvL0NyZWF0ZSBwcm9jZWR1cmVcbiAgdmFyIHByb2MgPSBuZXcgUHJvY2VkdXJlKClcbiAgXG4gIC8vUGFyc2UgYmxvY2tzXG4gIHByb2MucHJlICAgID0gdXNlcl9hcmdzLnByZVxuICBwcm9jLmJvZHkgICA9IHVzZXJfYXJncy5ib2R5XG4gIHByb2MucG9zdCAgID0gdXNlcl9hcmdzLnBvc3RcblxuICAvL1BhcnNlIGFyZ3VtZW50c1xuICB2YXIgcHJvY19hcmdzID0gdXNlcl9hcmdzLmFyZ3Muc2xpY2UoMClcbiAgcHJvYy5hcmdUeXBlcyA9IHByb2NfYXJnc1xuICBmb3IodmFyIGk9MDsgaTxwcm9jX2FyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgYXJnX3R5cGUgPSBwcm9jX2FyZ3NbaV1cbiAgICBpZihhcmdfdHlwZSA9PT0gXCJhcnJheVwiIHx8ICh0eXBlb2YgYXJnX3R5cGUgPT09IFwib2JqZWN0XCIgJiYgYXJnX3R5cGUuYmxvY2tJbmRpY2VzKSkge1xuICAgICAgcHJvYy5hcmdUeXBlc1tpXSA9IFwiYXJyYXlcIlxuICAgICAgcHJvYy5hcnJheUFyZ3MucHVzaChpKVxuICAgICAgcHJvYy5hcnJheUJsb2NrSW5kaWNlcy5wdXNoKGFyZ190eXBlLmJsb2NrSW5kaWNlcyA/IGFyZ190eXBlLmJsb2NrSW5kaWNlcyA6IDApXG4gICAgICBwcm9jLnNoaW1BcmdzLnB1c2goXCJhcnJheVwiICsgaSlcbiAgICAgIGlmKGkgPCBwcm9jLnByZS5hcmdzLmxlbmd0aCAmJiBwcm9jLnByZS5hcmdzW2ldLmNvdW50PjApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHByZSgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGFyZ3NcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLnBvc3QuYXJncy5sZW5ndGggJiYgcHJvYy5wb3N0LmFyZ3NbaV0uY291bnQ+MCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcG9zdCgpIGJsb2NrIG1heSBub3QgcmVmZXJlbmNlIGFycmF5IGFyZ3NcIilcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYoYXJnX3R5cGUgPT09IFwic2NhbGFyXCIpIHtcbiAgICAgIHByb2Muc2NhbGFyQXJncy5wdXNoKGkpXG4gICAgICBwcm9jLnNoaW1BcmdzLnB1c2goXCJzY2FsYXJcIiArIGkpXG4gICAgfSBlbHNlIGlmKGFyZ190eXBlID09PSBcImluZGV4XCIpIHtcbiAgICAgIHByb2MuaW5kZXhBcmdzLnB1c2goaSlcbiAgICAgIGlmKGkgPCBwcm9jLnByZS5hcmdzLmxlbmd0aCAmJiBwcm9jLnByZS5hcmdzW2ldLmNvdW50ID4gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogcHJlKCkgYmxvY2sgbWF5IG5vdCByZWZlcmVuY2UgYXJyYXkgaW5kZXhcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLmJvZHkuYXJncy5sZW5ndGggJiYgcHJvYy5ib2R5LmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBib2R5KCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBpbmRleFwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MucG9zdC5hcmdzLmxlbmd0aCAmJiBwcm9jLnBvc3QuYXJnc1tpXS5jb3VudCA+IDApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHBvc3QoKSBibG9jayBtYXkgbm90IHJlZmVyZW5jZSBhcnJheSBpbmRleFwiKVxuICAgICAgfVxuICAgIH0gZWxzZSBpZihhcmdfdHlwZSA9PT0gXCJzaGFwZVwiKSB7XG4gICAgICBwcm9jLnNoYXBlQXJncy5wdXNoKGkpXG4gICAgICBpZihpIDwgcHJvYy5wcmUuYXJncy5sZW5ndGggJiYgcHJvYy5wcmUuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHByZSgpIGJsb2NrIG1heSBub3Qgd3JpdGUgdG8gYXJyYXkgc2hhcGVcIilcbiAgICAgIH1cbiAgICAgIGlmKGkgPCBwcm9jLmJvZHkuYXJncy5sZW5ndGggJiYgcHJvYy5ib2R5LmFyZ3NbaV0ubHZhbHVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBib2R5KCkgYmxvY2sgbWF5IG5vdCB3cml0ZSB0byBhcnJheSBzaGFwZVwiKVxuICAgICAgfVxuICAgICAgaWYoaSA8IHByb2MucG9zdC5hcmdzLmxlbmd0aCAmJiBwcm9jLnBvc3QuYXJnc1tpXS5sdmFsdWUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IHBvc3QoKSBibG9jayBtYXkgbm90IHdyaXRlIHRvIGFycmF5IHNoYXBlXCIpXG4gICAgICB9XG4gICAgfSBlbHNlIGlmKHR5cGVvZiBhcmdfdHlwZSA9PT0gXCJvYmplY3RcIiAmJiBhcmdfdHlwZS5vZmZzZXQpIHtcbiAgICAgIHByb2MuYXJnVHlwZXNbaV0gPSBcIm9mZnNldFwiXG4gICAgICBwcm9jLm9mZnNldEFyZ3MucHVzaCh7IGFycmF5OiBhcmdfdHlwZS5hcnJheSwgb2Zmc2V0OmFyZ190eXBlLm9mZnNldCB9KVxuICAgICAgcHJvYy5vZmZzZXRBcmdJbmRleC5wdXNoKGkpXG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBVbmtub3duIGFyZ3VtZW50IHR5cGUgXCIgKyBwcm9jX2FyZ3NbaV0pXG4gICAgfVxuICB9XG4gIFxuICAvL01ha2Ugc3VyZSBhdCBsZWFzdCBvbmUgYXJyYXkgYXJndW1lbnQgd2FzIHNwZWNpZmllZFxuICBpZihwcm9jLmFycmF5QXJncy5sZW5ndGggPD0gMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBObyBhcnJheSBhcmd1bWVudHMgc3BlY2lmaWVkXCIpXG4gIH1cbiAgXG4gIC8vTWFrZSBzdXJlIGFyZ3VtZW50cyBhcmUgY29ycmVjdFxuICBpZihwcm9jLnByZS5hcmdzLmxlbmd0aCA+IHByb2NfYXJncy5sZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJjd2lzZTogVG9vIG1hbnkgYXJndW1lbnRzIGluIHByZSgpIGJsb2NrXCIpXG4gIH1cbiAgaWYocHJvYy5ib2R5LmFyZ3MubGVuZ3RoID4gcHJvY19hcmdzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBUb28gbWFueSBhcmd1bWVudHMgaW4gYm9keSgpIGJsb2NrXCIpXG4gIH1cbiAgaWYocHJvYy5wb3N0LmFyZ3MubGVuZ3RoID4gcHJvY19hcmdzLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcImN3aXNlOiBUb28gbWFueSBhcmd1bWVudHMgaW4gcG9zdCgpIGJsb2NrXCIpXG4gIH1cblxuICAvL0NoZWNrIGRlYnVnIGZsYWdcbiAgcHJvYy5kZWJ1ZyA9ICEhdXNlcl9hcmdzLnByaW50Q29kZSB8fCAhIXVzZXJfYXJncy5kZWJ1Z1xuICBcbiAgLy9SZXRyaWV2ZSBuYW1lXG4gIHByb2MuZnVuY05hbWUgPSB1c2VyX2FyZ3MuZnVuY05hbWUgfHwgXCJjd2lzZVwiXG4gIFxuICAvL1JlYWQgaW4gYmxvY2sgc2l6ZVxuICBwcm9jLmJsb2NrU2l6ZSA9IHVzZXJfYXJncy5ibG9ja1NpemUgfHwgNjRcblxuICByZXR1cm4gY3JlYXRlVGh1bmsocHJvYylcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjb21waWxlQ3dpc2VcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2N3aXNlLWNvbXBpbGVyL2NvbXBpbGVyLmpzXG4vLyBtb2R1bGUgaWQgPSA1MVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIlxuXG4vLyBUaGUgZnVuY3Rpb24gYmVsb3cgaXMgY2FsbGVkIHdoZW4gY29uc3RydWN0aW5nIGEgY3dpc2UgZnVuY3Rpb24gb2JqZWN0LCBhbmQgZG9lcyB0aGUgZm9sbG93aW5nOlxuLy8gQSBmdW5jdGlvbiBvYmplY3QgaXMgY29uc3RydWN0ZWQgd2hpY2ggYWNjZXB0cyBhcyBhcmd1bWVudCBhIGNvbXBpbGF0aW9uIGZ1bmN0aW9uIGFuZCByZXR1cm5zIGFub3RoZXIgZnVuY3Rpb24uXG4vLyBJdCBpcyB0aGlzIG90aGVyIGZ1bmN0aW9uIHRoYXQgaXMgZXZlbnR1YWxseSByZXR1cm5lZCBieSBjcmVhdGVUaHVuaywgYW5kIHRoaXMgZnVuY3Rpb24gaXMgdGhlIG9uZSB0aGF0IGFjdHVhbGx5XG4vLyBjaGVja3Mgd2hldGhlciBhIGNlcnRhaW4gcGF0dGVybiBvZiBhcmd1bWVudHMgaGFzIGFscmVhZHkgYmVlbiB1c2VkIGJlZm9yZSBhbmQgY29tcGlsZXMgbmV3IGxvb3BzIGFzIG5lZWRlZC5cbi8vIFRoZSBjb21waWxhdGlvbiBwYXNzZWQgdG8gdGhlIGZpcnN0IGZ1bmN0aW9uIG9iamVjdCBpcyB1c2VkIGZvciBjb21waWxpbmcgbmV3IGZ1bmN0aW9ucy5cbi8vIE9uY2UgdGhpcyBmdW5jdGlvbiBvYmplY3QgaXMgY3JlYXRlZCwgaXQgaXMgY2FsbGVkIHdpdGggY29tcGlsZSBhcyBhcmd1bWVudCwgd2hlcmUgdGhlIGZpcnN0IGFyZ3VtZW50IG9mIGNvbXBpbGVcbi8vIGlzIGJvdW5kIHRvIFwicHJvY1wiIChlc3NlbnRpYWxseSBjb250YWluaW5nIGEgcHJlcHJvY2Vzc2VkIHZlcnNpb24gb2YgdGhlIHVzZXIgYXJndW1lbnRzIHRvIGN3aXNlKS5cbi8vIFNvIGNyZWF0ZVRodW5rIHJvdWdobHkgd29ya3MgbGlrZSB0aGlzOlxuLy8gZnVuY3Rpb24gY3JlYXRlVGh1bmsocHJvYykge1xuLy8gICB2YXIgdGh1bmsgPSBmdW5jdGlvbihjb21waWxlQm91bmQpIHtcbi8vICAgICB2YXIgQ0FDSEVEID0ge31cbi8vICAgICByZXR1cm4gZnVuY3Rpb24oYXJyYXlzIGFuZCBzY2FsYXJzKSB7XG4vLyAgICAgICBpZiAoZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5cyBpbiBDQUNIRUQpIHtcbi8vICAgICAgICAgdmFyIGZ1bmMgPSBDQUNIRURbZHR5cGUgYW5kIG9yZGVyIG9mIGFycmF5c11cbi8vICAgICAgIH0gZWxzZSB7XG4vLyAgICAgICAgIHZhciBmdW5jID0gQ0FDSEVEW2R0eXBlIGFuZCBvcmRlciBvZiBhcnJheXNdID0gY29tcGlsZUJvdW5kKGR0eXBlIGFuZCBvcmRlciBvZiBhcnJheXMpXG4vLyAgICAgICB9XG4vLyAgICAgICByZXR1cm4gZnVuYyhhcnJheXMgYW5kIHNjYWxhcnMpXG4vLyAgICAgfVxuLy8gICB9XG4vLyAgIHJldHVybiB0aHVuayhjb21waWxlLmJpbmQxKHByb2MpKVxuLy8gfVxuXG52YXIgY29tcGlsZSA9IHJlcXVpcmUoXCIuL2NvbXBpbGUuanNcIilcblxuZnVuY3Rpb24gY3JlYXRlVGh1bmsocHJvYykge1xuICB2YXIgY29kZSA9IFtcIid1c2Ugc3RyaWN0J1wiLCBcInZhciBDQUNIRUQ9e31cIl1cbiAgdmFyIHZhcnMgPSBbXVxuICB2YXIgdGh1bmtOYW1lID0gcHJvYy5mdW5jTmFtZSArIFwiX2N3aXNlX3RodW5rXCJcbiAgXG4gIC8vQnVpbGQgdGh1bmtcbiAgY29kZS5wdXNoKFtcInJldHVybiBmdW5jdGlvbiBcIiwgdGh1bmtOYW1lLCBcIihcIiwgcHJvYy5zaGltQXJncy5qb2luKFwiLFwiKSwgXCIpe1wiXS5qb2luKFwiXCIpKVxuICB2YXIgdHlwZXNpZyA9IFtdXG4gIHZhciBzdHJpbmdfdHlwZXNpZyA9IFtdXG4gIHZhciBwcm9jX2FyZ3MgPSBbW1wiYXJyYXlcIixwcm9jLmFycmF5QXJnc1swXSxcIi5zaGFwZS5zbGljZShcIiwgLy8gU2xpY2Ugc2hhcGUgc28gdGhhdCB3ZSBvbmx5IHJldGFpbiB0aGUgc2hhcGUgb3ZlciB3aGljaCB3ZSBpdGVyYXRlICh3aGljaCBnZXRzIHBhc3NlZCB0byB0aGUgY3dpc2Ugb3BlcmF0b3IgYXMgU1MpLlxuICAgICAgICAgICAgICAgICAgICBNYXRoLm1heCgwLHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF0pLHByb2MuYXJyYXlCbG9ja0luZGljZXNbMF08MD8oXCIsXCIrcHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXStcIilcIik6XCIpXCJdLmpvaW4oXCJcIildXG4gIHZhciBzaGFwZUxlbmd0aENvbmRpdGlvbnMgPSBbXSwgc2hhcGVDb25kaXRpb25zID0gW11cbiAgLy8gUHJvY2VzcyBhcnJheSBhcmd1bWVudHNcbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgaiA9IHByb2MuYXJyYXlBcmdzW2ldXG4gICAgdmFycy5wdXNoKFtcInRcIiwgaiwgXCI9YXJyYXlcIiwgaiwgXCIuZHR5cGUsXCIsXG4gICAgICAgICAgICAgICBcInJcIiwgaiwgXCI9YXJyYXlcIiwgaiwgXCIub3JkZXJcIl0uam9pbihcIlwiKSlcbiAgICB0eXBlc2lnLnB1c2goXCJ0XCIgKyBqKVxuICAgIHR5cGVzaWcucHVzaChcInJcIiArIGopXG4gICAgc3RyaW5nX3R5cGVzaWcucHVzaChcInRcIitqKVxuICAgIHN0cmluZ190eXBlc2lnLnB1c2goXCJyXCIraitcIi5qb2luKClcIilcbiAgICBwcm9jX2FyZ3MucHVzaChcImFycmF5XCIgKyBqICsgXCIuZGF0YVwiKVxuICAgIHByb2NfYXJncy5wdXNoKFwiYXJyYXlcIiArIGogKyBcIi5zdHJpZGVcIilcbiAgICBwcm9jX2FyZ3MucHVzaChcImFycmF5XCIgKyBqICsgXCIub2Zmc2V0fDBcIilcbiAgICBpZiAoaT4wKSB7IC8vIEdhdGhlciBjb25kaXRpb25zIHRvIGNoZWNrIGZvciBzaGFwZSBlcXVhbGl0eSAoaWdub3JpbmcgYmxvY2sgaW5kaWNlcylcbiAgICAgIHNoYXBlTGVuZ3RoQ29uZGl0aW9ucy5wdXNoKFwiYXJyYXlcIiArIHByb2MuYXJyYXlBcmdzWzBdICsgXCIuc2hhcGUubGVuZ3RoPT09YXJyYXlcIiArIGogKyBcIi5zaGFwZS5sZW5ndGgrXCIgKyAoTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSktTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkpKVxuICAgICAgc2hhcGVDb25kaXRpb25zLnB1c2goXCJhcnJheVwiICsgcHJvYy5hcnJheUFyZ3NbMF0gKyBcIi5zaGFwZVtzaGFwZUluZGV4K1wiICsgTWF0aC5tYXgoMCxwcm9jLmFycmF5QmxvY2tJbmRpY2VzWzBdKSArIFwiXT09PWFycmF5XCIgKyBqICsgXCIuc2hhcGVbc2hhcGVJbmRleCtcIiArIE1hdGgubWF4KDAscHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkgKyBcIl1cIilcbiAgICB9XG4gIH1cbiAgLy8gQ2hlY2sgZm9yIHNoYXBlIGVxdWFsaXR5XG4gIGlmIChwcm9jLmFycmF5QXJncy5sZW5ndGggPiAxKSB7XG4gICAgY29kZS5wdXNoKFwiaWYgKCEoXCIgKyBzaGFwZUxlbmd0aENvbmRpdGlvbnMuam9pbihcIiAmJiBcIikgKyBcIikpIHRocm93IG5ldyBFcnJvcignY3dpc2U6IEFycmF5cyBkbyBub3QgYWxsIGhhdmUgdGhlIHNhbWUgZGltZW5zaW9uYWxpdHkhJylcIilcbiAgICBjb2RlLnB1c2goXCJmb3IodmFyIHNoYXBlSW5kZXg9YXJyYXlcIiArIHByb2MuYXJyYXlBcmdzWzBdICsgXCIuc2hhcGUubGVuZ3RoLVwiICsgTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkgKyBcIjsgc2hhcGVJbmRleC0tPjA7KSB7XCIpXG4gICAgY29kZS5wdXNoKFwiaWYgKCEoXCIgKyBzaGFwZUNvbmRpdGlvbnMuam9pbihcIiAmJiBcIikgKyBcIikpIHRocm93IG5ldyBFcnJvcignY3dpc2U6IEFycmF5cyBkbyBub3QgYWxsIGhhdmUgdGhlIHNhbWUgc2hhcGUhJylcIilcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIH1cbiAgLy8gUHJvY2VzcyBzY2FsYXIgYXJndW1lbnRzXG4gIGZvcih2YXIgaT0wOyBpPHByb2Muc2NhbGFyQXJncy5sZW5ndGg7ICsraSkge1xuICAgIHByb2NfYXJncy5wdXNoKFwic2NhbGFyXCIgKyBwcm9jLnNjYWxhckFyZ3NbaV0pXG4gIH1cbiAgLy8gQ2hlY2sgZm9yIGNhY2hlZCBmdW5jdGlvbiAoYW5kIGlmIG5vdCBwcmVzZW50LCBnZW5lcmF0ZSBpdClcbiAgdmFycy5wdXNoKFtcInR5cGU9W1wiLCBzdHJpbmdfdHlwZXNpZy5qb2luKFwiLFwiKSwgXCJdLmpvaW4oKVwiXS5qb2luKFwiXCIpKVxuICB2YXJzLnB1c2goXCJwcm9jPUNBQ0hFRFt0eXBlXVwiKVxuICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICBcbiAgY29kZS5wdXNoKFtcImlmKCFwcm9jKXtcIixcbiAgICAgICAgICAgICBcIkNBQ0hFRFt0eXBlXT1wcm9jPWNvbXBpbGUoW1wiLCB0eXBlc2lnLmpvaW4oXCIsXCIpLCBcIl0pfVwiLFxuICAgICAgICAgICAgIFwicmV0dXJuIHByb2MoXCIsIHByb2NfYXJncy5qb2luKFwiLFwiKSwgXCIpfVwiXS5qb2luKFwiXCIpKVxuXG4gIGlmKHByb2MuZGVidWcpIHtcbiAgICBjb25zb2xlLmxvZyhcIi0tLS0tR2VuZXJhdGVkIHRodW5rOlxcblwiICsgY29kZS5qb2luKFwiXFxuXCIpICsgXCJcXG4tLS0tLS0tLS0tXCIpXG4gIH1cbiAgXG4gIC8vQ29tcGlsZSB0aHVua1xuICB2YXIgdGh1bmsgPSBuZXcgRnVuY3Rpb24oXCJjb21waWxlXCIsIGNvZGUuam9pbihcIlxcblwiKSlcbiAgcmV0dXJuIHRodW5rKGNvbXBpbGUuYmluZCh1bmRlZmluZWQsIHByb2MpKVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVRodW5rXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9jd2lzZS1jb21waWxlci9saWIvdGh1bmsuanNcbi8vIG1vZHVsZSBpZCA9IDUyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiXG5cbnZhciB1bmlxID0gcmVxdWlyZShcInVuaXFcIilcblxuLy8gVGhpcyBmdW5jdGlvbiBnZW5lcmF0ZXMgdmVyeSBzaW1wbGUgbG9vcHMgYW5hbG9nb3VzIHRvIGhvdyB5b3UgdHlwaWNhbGx5IHRyYXZlcnNlIGFycmF5cyAodGhlIG91dGVybW9zdCBsb29wIGNvcnJlc3BvbmRzIHRvIHRoZSBzbG93ZXN0IGNoYW5naW5nIGluZGV4LCB0aGUgaW5uZXJtb3N0IGxvb3AgdG8gdGhlIGZhc3Rlc3QgY2hhbmdpbmcgaW5kZXgpXG4vLyBUT0RPOiBJZiB0d28gYXJyYXlzIGhhdmUgdGhlIHNhbWUgc3RyaWRlcyAoYW5kIG9mZnNldHMpIHRoZXJlIGlzIHBvdGVudGlhbCBmb3IgZGVjcmVhc2luZyB0aGUgbnVtYmVyIG9mIFwicG9pbnRlcnNcIiBhbmQgcmVsYXRlZCB2YXJpYWJsZXMuIFRoZSBkcmF3YmFjayBpcyB0aGF0IHRoZSB0eXBlIHNpZ25hdHVyZSB3b3VsZCBiZWNvbWUgbW9yZSBzcGVjaWZpYyBhbmQgdGhhdCB0aGVyZSB3b3VsZCB0aHVzIGJlIGxlc3MgcG90ZW50aWFsIGZvciBjYWNoaW5nLCBidXQgaXQgbWlnaHQgc3RpbGwgYmUgd29ydGggaXQsIGVzcGVjaWFsbHkgd2hlbiBkZWFsaW5nIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBhcmd1bWVudHMuXG5mdW5jdGlvbiBpbm5lckZpbGwob3JkZXIsIHByb2MsIGJvZHkpIHtcbiAgdmFyIGRpbWVuc2lvbiA9IG9yZGVyLmxlbmd0aFxuICAgICwgbmFyZ3MgPSBwcm9jLmFycmF5QXJncy5sZW5ndGhcbiAgICAsIGhhc19pbmRleCA9IHByb2MuaW5kZXhBcmdzLmxlbmd0aD4wXG4gICAgLCBjb2RlID0gW11cbiAgICAsIHZhcnMgPSBbXVxuICAgICwgaWR4PTAsIHBpZHg9MCwgaSwgalxuICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7IC8vIEl0ZXJhdGlvbiB2YXJpYWJsZXNcbiAgICB2YXJzLnB1c2goW1wiaVwiLGksXCI9MFwiXS5qb2luKFwiXCIpKVxuICB9XG4gIC8vQ29tcHV0ZSBzY2FuIGRlbHRhc1xuICBmb3Ioaj0wOyBqPG5hcmdzOyArK2opIHtcbiAgICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICBwaWR4ID0gaWR4XG4gICAgICBpZHggPSBvcmRlcltpXVxuICAgICAgaWYoaSA9PT0gMCkgeyAvLyBUaGUgaW5uZXJtb3N0L2Zhc3Rlc3QgZGltZW5zaW9uJ3MgZGVsdGEgaXMgc2ltcGx5IGl0cyBzdHJpZGVcbiAgICAgICAgdmFycy5wdXNoKFtcImRcIixqLFwic1wiLGksXCI9dFwiLGosXCJwXCIsaWR4XS5qb2luKFwiXCIpKVxuICAgICAgfSBlbHNlIHsgLy8gRm9yIG90aGVyIGRpbWVuc2lvbnMgdGhlIGRlbHRhIGlzIGJhc2ljYWxseSB0aGUgc3RyaWRlIG1pbnVzIHNvbWV0aGluZyB3aGljaCBlc3NlbnRpYWxseSBcInJld2luZHNcIiB0aGUgcHJldmlvdXMgKG1vcmUgaW5uZXIpIGRpbWVuc2lvblxuICAgICAgICB2YXJzLnB1c2goW1wiZFwiLGosXCJzXCIsaSxcIj0odFwiLGosXCJwXCIsaWR4LFwiLXNcIixwaWR4LFwiKnRcIixqLFwicFwiLHBpZHgsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh2YXJzLmxlbmd0aCA+IDApIHtcbiAgICBjb2RlLnB1c2goXCJ2YXIgXCIgKyB2YXJzLmpvaW4oXCIsXCIpKVxuICB9ICBcbiAgLy9TY2FuIGxvb3BcbiAgZm9yKGk9ZGltZW5zaW9uLTE7IGk+PTA7IC0taSkgeyAvLyBTdGFydCBhdCBsYXJnZXN0IHN0cmlkZSBhbmQgd29yayB5b3VyIHdheSBpbndhcmRzXG4gICAgaWR4ID0gb3JkZXJbaV1cbiAgICBjb2RlLnB1c2goW1wiZm9yKGlcIixpLFwiPTA7aVwiLGksXCI8c1wiLGlkeCxcIjsrK2lcIixpLFwiKXtcIl0uam9pbihcIlwiKSlcbiAgfVxuICAvL1B1c2ggYm9keSBvZiBpbm5lciBsb29wXG4gIGNvZGUucHVzaChib2R5KVxuICAvL0FkdmFuY2Ugc2NhbiBwb2ludGVyc1xuICBmb3IoaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgcGlkeCA9IGlkeFxuICAgIGlkeCA9IG9yZGVyW2ldXG4gICAgZm9yKGo9MDsgajxuYXJnczsgKytqKSB7XG4gICAgICBjb2RlLnB1c2goW1wicFwiLGosXCIrPWRcIixqLFwic1wiLGldLmpvaW4oXCJcIikpXG4gICAgfVxuICAgIGlmKGhhc19pbmRleCkge1xuICAgICAgaWYoaSA+IDApIHtcbiAgICAgICAgY29kZS5wdXNoKFtcImluZGV4W1wiLHBpZHgsXCJdLT1zXCIscGlkeF0uam9pbihcIlwiKSlcbiAgICAgIH1cbiAgICAgIGNvZGUucHVzaChbXCIrK2luZGV4W1wiLGlkeCxcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFwifVwiKVxuICB9XG4gIHJldHVybiBjb2RlLmpvaW4oXCJcXG5cIilcbn1cblxuLy8gR2VuZXJhdGUgXCJvdXRlclwiIGxvb3BzIHRoYXQgbG9vcCBvdmVyIGJsb2NrcyBvZiBkYXRhLCBhcHBseWluZyBcImlubmVyXCIgbG9vcHMgdG8gdGhlIGJsb2NrcyBieSBtYW5pcHVsYXRpbmcgdGhlIGxvY2FsIHZhcmlhYmxlcyBpbiBzdWNoIGEgd2F5IHRoYXQgdGhlIGlubmVyIGxvb3Agb25seSBcInNlZXNcIiB0aGUgY3VycmVudCBibG9jay5cbi8vIFRPRE86IElmIHRoaXMgaXMgdXNlZCwgdGhlbiB0aGUgcHJldmlvdXMgZGVjbGFyYXRpb24gKGRvbmUgYnkgZ2VuZXJhdGVDd2lzZU9wKSBvZiBzKiBpcyBlc3NlbnRpYWxseSB1bm5lY2Vzc2FyeS5cbi8vICAgICAgIEkgYmVsaWV2ZSB0aGUgcyogYXJlIG5vdCB1c2VkIGVsc2V3aGVyZSAoaW4gcGFydGljdWxhciwgSSBkb24ndCB0aGluayB0aGV5J3JlIHVzZWQgaW4gdGhlIHByZS9wb3N0IHBhcnRzIGFuZCBcInNoYXBlXCIgaXMgZGVmaW5lZCBpbmRlcGVuZGVudGx5KSwgc28gaXQgd291bGQgYmUgcG9zc2libGUgdG8gbWFrZSBkZWZpbmluZyB0aGUgcyogZGVwZW5kZW50IG9uIHdoYXQgbG9vcCBtZXRob2QgaXMgYmVpbmcgdXNlZC5cbmZ1bmN0aW9uIG91dGVyRmlsbChtYXRjaGVkLCBvcmRlciwgcHJvYywgYm9keSkge1xuICB2YXIgZGltZW5zaW9uID0gb3JkZXIubGVuZ3RoXG4gICAgLCBuYXJncyA9IHByb2MuYXJyYXlBcmdzLmxlbmd0aFxuICAgICwgYmxvY2tTaXplID0gcHJvYy5ibG9ja1NpemVcbiAgICAsIGhhc19pbmRleCA9IHByb2MuaW5kZXhBcmdzLmxlbmd0aCA+IDBcbiAgICAsIGNvZGUgPSBbXVxuICBmb3IodmFyIGk9MDsgaTxuYXJnczsgKytpKSB7XG4gICAgY29kZS5wdXNoKFtcInZhciBvZmZzZXRcIixpLFwiPXBcIixpXS5qb2luKFwiXCIpKVxuICB9XG4gIC8vR2VuZXJhdGUgbG9vcHMgZm9yIHVubWF0Y2hlZCBkaW1lbnNpb25zXG4gIC8vIFRoZSBvcmRlciBpbiB3aGljaCB0aGVzZSBkaW1lbnNpb25zIGFyZSB0cmF2ZXJzZWQgaXMgZmFpcmx5IGFyYml0cmFyeSAoZnJvbSBzbWFsbCBzdHJpZGUgdG8gbGFyZ2Ugc3RyaWRlLCBmb3IgdGhlIGZpcnN0IGFyZ3VtZW50KVxuICAvLyBUT0RPOiBJdCB3b3VsZCBiZSBuaWNlIGlmIHRoZSBvcmRlciBpbiB3aGljaCB0aGVzZSBsb29wcyBhcmUgcGxhY2VkIHdvdWxkIGFsc28gYmUgc29tZWhvdyBcIm9wdGltYWxcIiAoYXQgdGhlIHZlcnkgbGVhc3Qgd2Ugc2hvdWxkIGNoZWNrIHRoYXQgaXQgcmVhbGx5IGRvZXNuJ3QgaHVydCB1cyBpZiB0aGV5J3JlIG5vdCkuXG4gIGZvcih2YXIgaT1tYXRjaGVkOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgY29kZS5wdXNoKFtcImZvcih2YXIgalwiK2krXCI9U1NbXCIsIG9yZGVyW2ldLCBcIl18MDtqXCIsIGksIFwiPjA7KXtcIl0uam9pbihcIlwiKSkgLy8gSXRlcmF0ZSBiYWNrIHRvIGZyb250XG4gICAgY29kZS5wdXNoKFtcImlmKGpcIixpLFwiPFwiLGJsb2NrU2l6ZSxcIil7XCJdLmpvaW4oXCJcIikpIC8vIEVpdGhlciBkZWNyZWFzZSBqIGJ5IGJsb2NrU2l6ZSAocyA9IGJsb2NrU2l6ZSksIG9yIHNldCBpdCB0byB6ZXJvIChhZnRlciBzZXR0aW5nIHMgPSBqKS5cbiAgICBjb2RlLnB1c2goW1wic1wiLG9yZGVyW2ldLFwiPWpcIixpXS5qb2luKFwiXCIpKVxuICAgIGNvZGUucHVzaChbXCJqXCIsaSxcIj0wXCJdLmpvaW4oXCJcIikpXG4gICAgY29kZS5wdXNoKFtcIn1lbHNle3NcIixvcmRlcltpXSxcIj1cIixibG9ja1NpemVdLmpvaW4oXCJcIikpXG4gICAgY29kZS5wdXNoKFtcImpcIixpLFwiLT1cIixibG9ja1NpemUsXCJ9XCJdLmpvaW4oXCJcIikpXG4gICAgaWYoaGFzX2luZGV4KSB7XG4gICAgICBjb2RlLnB1c2goW1wiaW5kZXhbXCIsb3JkZXJbaV0sXCJdPWpcIixpXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuICBmb3IodmFyIGk9MDsgaTxuYXJnczsgKytpKSB7XG4gICAgdmFyIGluZGV4U3RyID0gW1wib2Zmc2V0XCIraV1cbiAgICBmb3IodmFyIGo9bWF0Y2hlZDsgajxkaW1lbnNpb247ICsraikge1xuICAgICAgaW5kZXhTdHIucHVzaChbXCJqXCIsaixcIip0XCIsaSxcInBcIixvcmRlcltqXV0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgY29kZS5wdXNoKFtcInBcIixpLFwiPShcIixpbmRleFN0ci5qb2luKFwiK1wiKSxcIilcIl0uam9pbihcIlwiKSlcbiAgfVxuICBjb2RlLnB1c2goaW5uZXJGaWxsKG9yZGVyLCBwcm9jLCBib2R5KSlcbiAgZm9yKHZhciBpPW1hdGNoZWQ7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXCJ9XCIpXG4gIH1cbiAgcmV0dXJuIGNvZGUuam9pbihcIlxcblwiKVxufVxuXG4vL0NvdW50IHRoZSBudW1iZXIgb2YgY29tcGF0aWJsZSBpbm5lciBvcmRlcnNcbi8vIFRoaXMgaXMgdGhlIGxlbmd0aCBvZiB0aGUgbG9uZ2VzdCBjb21tb24gcHJlZml4IG9mIHRoZSBhcnJheXMgaW4gb3JkZXJzLlxuLy8gRWFjaCBhcnJheSBpbiBvcmRlcnMgbGlzdHMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNvcnJlc3BvbmQgbmRhcnJheSBpbiBvcmRlciBvZiBpbmNyZWFzaW5nIHN0cmlkZS5cbi8vIFRoaXMgaXMgdGh1cyB0aGUgbWF4aW11bSBudW1iZXIgb2YgZGltZW5zaW9ucyB0aGF0IGNhbiBiZSBlZmZpY2llbnRseSB0cmF2ZXJzZWQgYnkgc2ltcGxlIG5lc3RlZCBsb29wcyBmb3IgYWxsIGFycmF5cy5cbmZ1bmN0aW9uIGNvdW50TWF0Y2hlcyhvcmRlcnMpIHtcbiAgdmFyIG1hdGNoZWQgPSAwLCBkaW1lbnNpb24gPSBvcmRlcnNbMF0ubGVuZ3RoXG4gIHdoaWxlKG1hdGNoZWQgPCBkaW1lbnNpb24pIHtcbiAgICBmb3IodmFyIGo9MTsgajxvcmRlcnMubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKG9yZGVyc1tqXVttYXRjaGVkXSAhPT0gb3JkZXJzWzBdW21hdGNoZWRdKSB7XG4gICAgICAgIHJldHVybiBtYXRjaGVkXG4gICAgICB9XG4gICAgfVxuICAgICsrbWF0Y2hlZFxuICB9XG4gIHJldHVybiBtYXRjaGVkXG59XG5cbi8vUHJvY2Vzc2VzIGEgYmxvY2sgYWNjb3JkaW5nIHRvIHRoZSBnaXZlbiBkYXRhIHR5cGVzXG4vLyBSZXBsYWNlcyB2YXJpYWJsZSBuYW1lcyBieSBkaWZmZXJlbnQgb25lcywgZWl0aGVyIFwibG9jYWxcIiBvbmVzICh0aGF0IGFyZSB0aGVuIGZlcnJpZWQgaW4gYW5kIG91dCBvZiB0aGUgZ2l2ZW4gYXJyYXkpIG9yIG9uZXMgbWF0Y2hpbmcgdGhlIGFyZ3VtZW50cyB0aGF0IHRoZSBmdW5jdGlvbiBwZXJmb3JtaW5nIHRoZSB1bHRpbWF0ZSBsb29wIHdpbGwgYWNjZXB0LlxuZnVuY3Rpb24gcHJvY2Vzc0Jsb2NrKGJsb2NrLCBwcm9jLCBkdHlwZXMpIHtcbiAgdmFyIGNvZGUgPSBibG9jay5ib2R5XG4gIHZhciBwcmUgPSBbXVxuICB2YXIgcG9zdCA9IFtdXG4gIGZvcih2YXIgaT0wOyBpPGJsb2NrLmFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgY2FyZyA9IGJsb2NrLmFyZ3NbaV1cbiAgICBpZihjYXJnLmNvdW50IDw9IDApIHtcbiAgICAgIGNvbnRpbnVlXG4gICAgfVxuICAgIHZhciByZSA9IG5ldyBSZWdFeHAoY2FyZy5uYW1lLCBcImdcIilcbiAgICB2YXIgcHRyU3RyID0gXCJcIlxuICAgIHZhciBhcnJOdW0gPSBwcm9jLmFycmF5QXJncy5pbmRleE9mKGkpXG4gICAgc3dpdGNoKHByb2MuYXJnVHlwZXNbaV0pIHtcbiAgICAgIGNhc2UgXCJvZmZzZXRcIjpcbiAgICAgICAgdmFyIG9mZkFyZ0luZGV4ID0gcHJvYy5vZmZzZXRBcmdJbmRleC5pbmRleE9mKGkpXG4gICAgICAgIHZhciBvZmZBcmcgPSBwcm9jLm9mZnNldEFyZ3Nbb2ZmQXJnSW5kZXhdXG4gICAgICAgIGFyck51bSA9IG9mZkFyZy5hcnJheVxuICAgICAgICBwdHJTdHIgPSBcIitxXCIgKyBvZmZBcmdJbmRleCAvLyBBZGRzIG9mZnNldCB0byB0aGUgXCJwb2ludGVyXCIgaW4gdGhlIGFycmF5XG4gICAgICBjYXNlIFwiYXJyYXlcIjpcbiAgICAgICAgcHRyU3RyID0gXCJwXCIgKyBhcnJOdW0gKyBwdHJTdHJcbiAgICAgICAgdmFyIGxvY2FsU3RyID0gXCJsXCIgKyBpXG4gICAgICAgIHZhciBhcnJTdHIgPSBcImFcIiArIGFyck51bVxuICAgICAgICBpZiAocHJvYy5hcnJheUJsb2NrSW5kaWNlc1thcnJOdW1dID09PSAwKSB7IC8vIEFyZ3VtZW50IHRvIGJvZHkgaXMganVzdCBhIHNpbmdsZSB2YWx1ZSBmcm9tIHRoaXMgYXJyYXlcbiAgICAgICAgICBpZihjYXJnLmNvdW50ID09PSAxKSB7IC8vIEFyZ3VtZW50L2FycmF5IHVzZWQgb25seSBvbmNlKD8pXG4gICAgICAgICAgICBpZihkdHlwZXNbYXJyTnVtXSA9PT0gXCJnZW5lcmljXCIpIHtcbiAgICAgICAgICAgICAgaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIElzIHRoaXMgbmVjZXNzYXJ5IGlmIHRoZSBhcmd1bWVudCBpcyBPTkxZIHVzZWQgYXMgYW4gbHZhbHVlPyAoa2VlcCBpbiBtaW5kIHRoYXQgd2UgY2FuIGhhdmUgYSArPSBzb21ldGhpbmcsIHNvIHdlIHdvdWxkIGFjdHVhbGx5IG5lZWQgdG8gY2hlY2sgY2FyZy5ydmFsdWUpXG4gICAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgbG9jYWxTdHIpXG4gICAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiLnNldChcIiwgcHRyU3RyLCBcIixcIiwgbG9jYWxTdHIsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgW2FyclN0ciwgXCIuZ2V0KFwiLCBwdHJTdHIsIFwiKVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBbYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl1cIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYoZHR5cGVzW2Fyck51bV0gPT09IFwiZ2VuZXJpY1wiKSB7XG4gICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIFRPRE86IENvdWxkIHdlIG9wdGltaXplIGJ5IGNoZWNraW5nIGZvciBjYXJnLnJ2YWx1ZT9cbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgaWYoY2FyZy5sdmFsdWUpIHtcbiAgICAgICAgICAgICAgcG9zdC5wdXNoKFthcnJTdHIsIFwiLnNldChcIiwgcHRyU3RyLCBcIixcIiwgbG9jYWxTdHIsXCIpXCJdLmpvaW4oXCJcIikpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByZS5wdXNoKFtcInZhciBcIiwgbG9jYWxTdHIsIFwiPVwiLCBhcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXVwiXS5qb2luKFwiXCIpKSAvLyBUT0RPOiBDb3VsZCB3ZSBvcHRpbWl6ZSBieSBjaGVja2luZyBmb3IgY2FyZy5ydmFsdWU/XG4gICAgICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBsb2NhbFN0cilcbiAgICAgICAgICAgIGlmKGNhcmcubHZhbHVlKSB7XG4gICAgICAgICAgICAgIHBvc3QucHVzaChbYXJyU3RyLCBcIltcIiwgcHRyU3RyLCBcIl09XCIsIGxvY2FsU3RyXS5qb2luKFwiXCIpKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHsgLy8gQXJndW1lbnQgdG8gYm9keSBpcyBhIFwiYmxvY2tcIlxuICAgICAgICAgIHZhciByZVN0ckFyciA9IFtjYXJnLm5hbWVdLCBwdHJTdHJBcnIgPSBbcHRyU3RyXVxuICAgICAgICAgIGZvcih2YXIgaj0wOyBqPE1hdGguYWJzKHByb2MuYXJyYXlCbG9ja0luZGljZXNbYXJyTnVtXSk7IGorKykge1xuICAgICAgICAgICAgcmVTdHJBcnIucHVzaChcIlxcXFxzKlxcXFxbKFteXFxcXF1dKylcXFxcXVwiKVxuICAgICAgICAgICAgcHRyU3RyQXJyLnB1c2goXCIkXCIgKyAoaisxKSArIFwiKnRcIiArIGFyck51bSArIFwiYlwiICsgaikgLy8gTWF0Y2hlZCBpbmRleCB0aW1lcyBzdHJpZGVcbiAgICAgICAgICB9XG4gICAgICAgICAgcmUgPSBuZXcgUmVnRXhwKHJlU3RyQXJyLmpvaW4oXCJcIiksIFwiZ1wiKVxuICAgICAgICAgIHB0clN0ciA9IHB0clN0ckFyci5qb2luKFwiK1wiKVxuICAgICAgICAgIGlmKGR0eXBlc1thcnJOdW1dID09PSBcImdlbmVyaWNcIikge1xuICAgICAgICAgICAgLyppZihjYXJnLmx2YWx1ZSkge1xuICAgICAgICAgICAgICBwcmUucHVzaChbXCJ2YXIgXCIsIGxvY2FsU3RyLCBcIj1cIiwgYXJyU3RyLCBcIi5nZXQoXCIsIHB0clN0ciwgXCIpXCJdLmpvaW4oXCJcIikpIC8vIElzIHRoaXMgbmVjZXNzYXJ5IGlmIHRoZSBhcmd1bWVudCBpcyBPTkxZIHVzZWQgYXMgYW4gbHZhbHVlPyAoa2VlcCBpbiBtaW5kIHRoYXQgd2UgY2FuIGhhdmUgYSArPSBzb21ldGhpbmcsIHNvIHdlIHdvdWxkIGFjdHVhbGx5IG5lZWQgdG8gY2hlY2sgY2FyZy5ydmFsdWUpXG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIGxvY2FsU3RyKVxuICAgICAgICAgICAgICBwb3N0LnB1c2goW2FyclN0ciwgXCIuc2V0KFwiLCBwdHJTdHIsIFwiLFwiLCBsb2NhbFN0cixcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiLmdldChcIiwgcHRyU3RyLCBcIilcIl0uam9pbihcIlwiKSlcbiAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiY3dpc2U6IEdlbmVyaWMgYXJyYXlzIG5vdCBzdXBwb3J0ZWQgaW4gY29tYmluYXRpb24gd2l0aCBibG9ja3MhXCIpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgZG9lcyBub3QgcHJvZHVjZSBhbnkgbG9jYWwgdmFyaWFibGVzLCBldmVuIGlmIHZhcmlhYmxlcyBhcmUgdXNlZCBtdWx0aXBsZSB0aW1lcy4gSXQgd291bGQgYmUgcG9zc2libGUgdG8gZG8gc28sIGJ1dCBpdCB3b3VsZCBjb21wbGljYXRlIHRoaW5ncyBxdWl0ZSBhIGJpdC5cbiAgICAgICAgICAgIGNvZGUgPSBjb2RlLnJlcGxhY2UocmUsIFthcnJTdHIsIFwiW1wiLCBwdHJTdHIsIFwiXVwiXS5qb2luKFwiXCIpKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJzY2FsYXJcIjpcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgXCJZXCIgKyBwcm9jLnNjYWxhckFyZ3MuaW5kZXhPZihpKSlcbiAgICAgIGJyZWFrXG4gICAgICBjYXNlIFwiaW5kZXhcIjpcbiAgICAgICAgY29kZSA9IGNvZGUucmVwbGFjZShyZSwgXCJpbmRleFwiKVxuICAgICAgYnJlYWtcbiAgICAgIGNhc2UgXCJzaGFwZVwiOlxuICAgICAgICBjb2RlID0gY29kZS5yZXBsYWNlKHJlLCBcInNoYXBlXCIpXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuICByZXR1cm4gW3ByZS5qb2luKFwiXFxuXCIpLCBjb2RlLCBwb3N0LmpvaW4oXCJcXG5cIildLmpvaW4oXCJcXG5cIikudHJpbSgpXG59XG5cbmZ1bmN0aW9uIHR5cGVTdW1tYXJ5KGR0eXBlcykge1xuICB2YXIgc3VtbWFyeSA9IG5ldyBBcnJheShkdHlwZXMubGVuZ3RoKVxuICB2YXIgYWxsRXF1YWwgPSB0cnVlXG4gIGZvcih2YXIgaT0wOyBpPGR0eXBlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciB0ID0gZHR5cGVzW2ldXG4gICAgdmFyIGRpZ2l0cyA9IHQubWF0Y2goL1xcZCsvKVxuICAgIGlmKCFkaWdpdHMpIHtcbiAgICAgIGRpZ2l0cyA9IFwiXCJcbiAgICB9IGVsc2Uge1xuICAgICAgZGlnaXRzID0gZGlnaXRzWzBdXG4gICAgfVxuICAgIGlmKHQuY2hhckF0KDApID09PSAwKSB7XG4gICAgICBzdW1tYXJ5W2ldID0gXCJ1XCIgKyB0LmNoYXJBdCgxKSArIGRpZ2l0c1xuICAgIH0gZWxzZSB7XG4gICAgICBzdW1tYXJ5W2ldID0gdC5jaGFyQXQoMCkgKyBkaWdpdHNcbiAgICB9XG4gICAgaWYoaSA+IDApIHtcbiAgICAgIGFsbEVxdWFsID0gYWxsRXF1YWwgJiYgc3VtbWFyeVtpXSA9PT0gc3VtbWFyeVtpLTFdXG4gICAgfVxuICB9XG4gIGlmKGFsbEVxdWFsKSB7XG4gICAgcmV0dXJuIHN1bW1hcnlbMF1cbiAgfVxuICByZXR1cm4gc3VtbWFyeS5qb2luKFwiXCIpXG59XG5cbi8vR2VuZXJhdGVzIGEgY3dpc2Ugb3BlcmF0b3JcbmZ1bmN0aW9uIGdlbmVyYXRlQ1dpc2VPcChwcm9jLCB0eXBlc2lnKSB7XG5cbiAgLy9Db21wdXRlIGRpbWVuc2lvblxuICAvLyBBcnJheXMgZ2V0IHB1dCBmaXJzdCBpbiB0eXBlc2lnLCBhbmQgdGhlcmUgYXJlIHR3byBlbnRyaWVzIHBlciBhcnJheSAoZHR5cGUgYW5kIG9yZGVyKSwgc28gdGhpcyBnZXRzIHRoZSBudW1iZXIgb2YgZGltZW5zaW9ucyBpbiB0aGUgZmlyc3QgYXJyYXkgYXJnLlxuICB2YXIgZGltZW5zaW9uID0gKHR5cGVzaWdbMV0ubGVuZ3RoIC0gTWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1swXSkpfDBcbiAgdmFyIG9yZGVycyA9IG5ldyBBcnJheShwcm9jLmFycmF5QXJncy5sZW5ndGgpXG4gIHZhciBkdHlwZXMgPSBuZXcgQXJyYXkocHJvYy5hcnJheUFyZ3MubGVuZ3RoKVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLmFycmF5QXJncy5sZW5ndGg7ICsraSkge1xuICAgIGR0eXBlc1tpXSA9IHR5cGVzaWdbMippXVxuICAgIG9yZGVyc1tpXSA9IHR5cGVzaWdbMippKzFdXG4gIH1cbiAgXG4gIC8vRGV0ZXJtaW5lIHdoZXJlIGJsb2NrIGFuZCBsb29wIGluZGljZXMgc3RhcnQgYW5kIGVuZFxuICB2YXIgYmxvY2tCZWdpbiA9IFtdLCBibG9ja0VuZCA9IFtdIC8vIFRoZXNlIGluZGljZXMgYXJlIGV4cG9zZWQgYXMgYmxvY2tzXG4gIHZhciBsb29wQmVnaW4gPSBbXSwgbG9vcEVuZCA9IFtdIC8vIFRoZXNlIGluZGljZXMgYXJlIGl0ZXJhdGVkIG92ZXJcbiAgdmFyIGxvb3BPcmRlcnMgPSBbXSAvLyBvcmRlcnMgcmVzdHJpY3RlZCB0byB0aGUgbG9vcCBpbmRpY2VzXG4gIGZvcih2YXIgaT0wOyBpPHByb2MuYXJyYXlBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKHByb2MuYXJyYXlCbG9ja0luZGljZXNbaV08MCkge1xuICAgICAgbG9vcEJlZ2luLnB1c2goMClcbiAgICAgIGxvb3BFbmQucHVzaChkaW1lbnNpb24pXG4gICAgICBibG9ja0JlZ2luLnB1c2goZGltZW5zaW9uKVxuICAgICAgYmxvY2tFbmQucHVzaChkaW1lbnNpb24rcHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSlcbiAgICB9IGVsc2Uge1xuICAgICAgbG9vcEJlZ2luLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSkgLy8gTm9uLW5lZ2F0aXZlXG4gICAgICBsb29wRW5kLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXStkaW1lbnNpb24pXG4gICAgICBibG9ja0JlZ2luLnB1c2goMClcbiAgICAgIGJsb2NrRW5kLnB1c2gocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSlcbiAgICB9XG4gICAgdmFyIG5ld09yZGVyID0gW11cbiAgICBmb3IodmFyIGo9MDsgajxvcmRlcnNbaV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgIGlmIChsb29wQmVnaW5baV08PW9yZGVyc1tpXVtqXSAmJiBvcmRlcnNbaV1bal08bG9vcEVuZFtpXSkge1xuICAgICAgICBuZXdPcmRlci5wdXNoKG9yZGVyc1tpXVtqXS1sb29wQmVnaW5baV0pIC8vIElmIHRoaXMgaXMgYSBsb29wIGluZGV4LCBwdXQgaXQgaW4gbmV3T3JkZXIsIHN1YnRyYWN0aW5nIGxvb3BCZWdpbiwgdG8gbWFrZSBzdXJlIHRoYXQgYWxsIGxvb3BPcmRlcnMgYXJlIHVzaW5nIGEgY29tbW9uIHNldCBvZiBpbmRpY2VzLlxuICAgICAgfVxuICAgIH1cbiAgICBsb29wT3JkZXJzLnB1c2gobmV3T3JkZXIpXG4gIH1cblxuICAvL0ZpcnN0IGNyZWF0ZSBhcmd1bWVudHMgZm9yIHByb2NlZHVyZVxuICB2YXIgYXJnbGlzdCA9IFtcIlNTXCJdIC8vIFNTIGlzIHRoZSBvdmVyYWxsIHNoYXBlIG92ZXIgd2hpY2ggd2UgaXRlcmF0ZVxuICB2YXIgY29kZSA9IFtcIid1c2Ugc3RyaWN0J1wiXVxuICB2YXIgdmFycyA9IFtdXG4gIFxuICBmb3IodmFyIGo9MDsgajxkaW1lbnNpb247ICsraikge1xuICAgIHZhcnMucHVzaChbXCJzXCIsIGosIFwiPVNTW1wiLCBqLCBcIl1cIl0uam9pbihcIlwiKSkgLy8gVGhlIGxpbWl0cyBmb3IgZWFjaCBkaW1lbnNpb24uXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBhcmdsaXN0LnB1c2goXCJhXCIraSkgLy8gQWN0dWFsIGRhdGEgYXJyYXlcbiAgICBhcmdsaXN0LnB1c2goXCJ0XCIraSkgLy8gU3RyaWRlc1xuICAgIGFyZ2xpc3QucHVzaChcInBcIitpKSAvLyBPZmZzZXQgaW4gdGhlIGFycmF5IGF0IHdoaWNoIHRoZSBkYXRhIHN0YXJ0cyAoYWxzbyB1c2VkIGZvciBpdGVyYXRpbmcgb3ZlciB0aGUgZGF0YSlcbiAgICBcbiAgICBmb3IodmFyIGo9MDsgajxkaW1lbnNpb247ICsraikgeyAvLyBVbnBhY2sgdGhlIHN0cmlkZXMgaW50byB2YXJzIGZvciBsb29waW5nXG4gICAgICB2YXJzLnB1c2goW1widFwiLGksXCJwXCIsaixcIj10XCIsaSxcIltcIixsb29wQmVnaW5baV0raixcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gICAgXG4gICAgZm9yKHZhciBqPTA7IGo8TWF0aC5hYnMocHJvYy5hcnJheUJsb2NrSW5kaWNlc1tpXSk7ICsraikgeyAvLyBVbnBhY2sgdGhlIHN0cmlkZXMgaW50byB2YXJzIGZvciBibG9jayBpdGVyYXRpb25cbiAgICAgIHZhcnMucHVzaChbXCJ0XCIsaSxcImJcIixqLFwiPXRcIixpLFwiW1wiLGJsb2NrQmVnaW5baV0raixcIl1cIl0uam9pbihcIlwiKSlcbiAgICB9XG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5zY2FsYXJBcmdzLmxlbmd0aDsgKytpKSB7XG4gICAgYXJnbGlzdC5wdXNoKFwiWVwiICsgaSlcbiAgfVxuICBpZihwcm9jLnNoYXBlQXJncy5sZW5ndGggPiAwKSB7XG4gICAgdmFycy5wdXNoKFwic2hhcGU9U1Muc2xpY2UoMClcIikgLy8gTWFrZXMgdGhlIHNoYXBlIG92ZXIgd2hpY2ggd2UgaXRlcmF0ZSBhdmFpbGFibGUgdG8gdGhlIHVzZXIgZGVmaW5lZCBmdW5jdGlvbnMgKHNvIHlvdSBjYW4gdXNlIHdpZHRoL2hlaWdodCBmb3IgZXhhbXBsZSlcbiAgfVxuICBpZihwcm9jLmluZGV4QXJncy5sZW5ndGggPiAwKSB7XG4gICAgLy8gUHJlcGFyZSBhbiBhcnJheSB0byBrZWVwIHRyYWNrIG9mIHRoZSAobG9naWNhbCkgaW5kaWNlcywgaW5pdGlhbGl6ZWQgdG8gZGltZW5zaW9uIHplcm9lcy5cbiAgICB2YXIgemVyb3MgPSBuZXcgQXJyYXkoZGltZW5zaW9uKVxuICAgIGZvcih2YXIgaT0wOyBpPGRpbWVuc2lvbjsgKytpKSB7XG4gICAgICB6ZXJvc1tpXSA9IFwiMFwiXG4gICAgfVxuICAgIHZhcnMucHVzaChbXCJpbmRleD1bXCIsIHplcm9zLmpvaW4oXCIsXCIpLCBcIl1cIl0uam9pbihcIlwiKSlcbiAgfVxuICBmb3IodmFyIGk9MDsgaTxwcm9jLm9mZnNldEFyZ3MubGVuZ3RoOyArK2kpIHsgLy8gT2Zmc2V0IGFyZ3VtZW50cyB1c2VkIGZvciBzdGVuY2lsIG9wZXJhdGlvbnNcbiAgICB2YXIgb2ZmX2FyZyA9IHByb2Mub2Zmc2V0QXJnc1tpXVxuICAgIHZhciBpbml0X3N0cmluZyA9IFtdXG4gICAgZm9yKHZhciBqPTA7IGo8b2ZmX2FyZy5vZmZzZXQubGVuZ3RoOyArK2opIHtcbiAgICAgIGlmKG9mZl9hcmcub2Zmc2V0W2pdID09PSAwKSB7XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9IGVsc2UgaWYob2ZmX2FyZy5vZmZzZXRbal0gPT09IDEpIHtcbiAgICAgICAgaW5pdF9zdHJpbmcucHVzaChbXCJ0XCIsIG9mZl9hcmcuYXJyYXksIFwicFwiLCBqXS5qb2luKFwiXCIpKSAgICAgIFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5pdF9zdHJpbmcucHVzaChbb2ZmX2FyZy5vZmZzZXRbal0sIFwiKnRcIiwgb2ZmX2FyZy5hcnJheSwgXCJwXCIsIGpdLmpvaW4oXCJcIikpXG4gICAgICB9XG4gICAgfVxuICAgIGlmKGluaXRfc3RyaW5nLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdmFycy5wdXNoKFwicVwiICsgaSArIFwiPTBcIilcbiAgICB9IGVsc2Uge1xuICAgICAgdmFycy5wdXNoKFtcInFcIiwgaSwgXCI9XCIsIGluaXRfc3RyaW5nLmpvaW4oXCIrXCIpXS5qb2luKFwiXCIpKVxuICAgIH1cbiAgfVxuXG4gIC8vUHJlcGFyZSB0aGlzIHZhcmlhYmxlc1xuICB2YXIgdGhpc1ZhcnMgPSB1bmlxKFtdLmNvbmNhdChwcm9jLnByZS50aGlzVmFycylcbiAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHByb2MuYm9keS50aGlzVmFycylcbiAgICAgICAgICAgICAgICAgICAgICAuY29uY2F0KHByb2MucG9zdC50aGlzVmFycykpXG4gIHZhcnMgPSB2YXJzLmNvbmNhdCh0aGlzVmFycylcbiAgaWYgKHZhcnMubGVuZ3RoID4gMCkge1xuICAgIGNvZGUucHVzaChcInZhciBcIiArIHZhcnMuam9pbihcIixcIikpXG4gIH1cbiAgZm9yKHZhciBpPTA7IGk8cHJvYy5hcnJheUFyZ3MubGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXCJwXCIraStcInw9MFwiKVxuICB9XG4gIFxuICAvL0lubGluZSBwcmVsdWRlXG4gIGlmKHByb2MucHJlLmJvZHkubGVuZ3RoID4gMykge1xuICAgIGNvZGUucHVzaChwcm9jZXNzQmxvY2socHJvYy5wcmUsIHByb2MsIGR0eXBlcykpXG4gIH1cblxuICAvL1Byb2Nlc3MgYm9keVxuICB2YXIgYm9keSA9IHByb2Nlc3NCbG9jayhwcm9jLmJvZHksIHByb2MsIGR0eXBlcylcbiAgdmFyIG1hdGNoZWQgPSBjb3VudE1hdGNoZXMobG9vcE9yZGVycylcbiAgaWYobWF0Y2hlZCA8IGRpbWVuc2lvbikge1xuICAgIGNvZGUucHVzaChvdXRlckZpbGwobWF0Y2hlZCwgbG9vcE9yZGVyc1swXSwgcHJvYywgYm9keSkpIC8vIFRPRE86IFJhdGhlciB0aGFuIHBhc3NpbmcgbG9vcE9yZGVyc1swXSwgaXQgbWlnaHQgYmUgaW50ZXJlc3RpbmcgdG8gbG9vayBhdCBwYXNzaW5nIGFuIG9yZGVyIHRoYXQgcmVwcmVzZW50cyB0aGUgbWFqb3JpdHkgb2YgdGhlIGFyZ3VtZW50cyBmb3IgZXhhbXBsZS5cbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goaW5uZXJGaWxsKGxvb3BPcmRlcnNbMF0sIHByb2MsIGJvZHkpKVxuICB9XG5cbiAgLy9JbmxpbmUgZXBpbG9nXG4gIGlmKHByb2MucG9zdC5ib2R5Lmxlbmd0aCA+IDMpIHtcbiAgICBjb2RlLnB1c2gocHJvY2Vzc0Jsb2NrKHByb2MucG9zdCwgcHJvYywgZHR5cGVzKSlcbiAgfVxuICBcbiAgaWYocHJvYy5kZWJ1Zykge1xuICAgIGNvbnNvbGUubG9nKFwiLS0tLS1HZW5lcmF0ZWQgY3dpc2Ugcm91dGluZSBmb3IgXCIsIHR5cGVzaWcsIFwiOlxcblwiICsgY29kZS5qb2luKFwiXFxuXCIpICsgXCJcXG4tLS0tLS0tLS0tXCIpXG4gIH1cbiAgXG4gIHZhciBsb29wTmFtZSA9IFsocHJvYy5mdW5jTmFtZXx8XCJ1bm5hbWVkXCIpLCBcIl9jd2lzZV9sb29wX1wiLCBvcmRlcnNbMF0uam9pbihcInNcIiksXCJtXCIsbWF0Y2hlZCx0eXBlU3VtbWFyeShkdHlwZXMpXS5qb2luKFwiXCIpXG4gIHZhciBmID0gbmV3IEZ1bmN0aW9uKFtcImZ1bmN0aW9uIFwiLGxvb3BOYW1lLFwiKFwiLCBhcmdsaXN0LmpvaW4oXCIsXCIpLFwiKXtcIiwgY29kZS5qb2luKFwiXFxuXCIpLFwifSByZXR1cm4gXCIsIGxvb3BOYW1lXS5qb2luKFwiXCIpKVxuICByZXR1cm4gZigpXG59XG5tb2R1bGUuZXhwb3J0cyA9IGdlbmVyYXRlQ1dpc2VPcFxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY3dpc2UtY29tcGlsZXIvbGliL2NvbXBpbGUuanNcbi8vIG1vZHVsZSBpZCA9IDUzXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIlwidXNlIHN0cmljdFwiXG5cbmZ1bmN0aW9uIHVuaXF1ZV9wcmVkKGxpc3QsIGNvbXBhcmUpIHtcbiAgdmFyIHB0ciA9IDFcbiAgICAsIGxlbiA9IGxpc3QubGVuZ3RoXG4gICAgLCBhPWxpc3RbMF0sIGI9bGlzdFswXVxuICBmb3IodmFyIGk9MTsgaTxsZW47ICsraSkge1xuICAgIGIgPSBhXG4gICAgYSA9IGxpc3RbaV1cbiAgICBpZihjb21wYXJlKGEsIGIpKSB7XG4gICAgICBpZihpID09PSBwdHIpIHtcbiAgICAgICAgcHRyKytcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGxpc3RbcHRyKytdID0gYVxuICAgIH1cbiAgfVxuICBsaXN0Lmxlbmd0aCA9IHB0clxuICByZXR1cm4gbGlzdFxufVxuXG5mdW5jdGlvbiB1bmlxdWVfZXEobGlzdCkge1xuICB2YXIgcHRyID0gMVxuICAgICwgbGVuID0gbGlzdC5sZW5ndGhcbiAgICAsIGE9bGlzdFswXSwgYiA9IGxpc3RbMF1cbiAgZm9yKHZhciBpPTE7IGk8bGVuOyArK2ksIGI9YSkge1xuICAgIGIgPSBhXG4gICAgYSA9IGxpc3RbaV1cbiAgICBpZihhICE9PSBiKSB7XG4gICAgICBpZihpID09PSBwdHIpIHtcbiAgICAgICAgcHRyKytcbiAgICAgICAgY29udGludWVcbiAgICAgIH1cbiAgICAgIGxpc3RbcHRyKytdID0gYVxuICAgIH1cbiAgfVxuICBsaXN0Lmxlbmd0aCA9IHB0clxuICByZXR1cm4gbGlzdFxufVxuXG5mdW5jdGlvbiB1bmlxdWUobGlzdCwgY29tcGFyZSwgc29ydGVkKSB7XG4gIGlmKGxpc3QubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIGxpc3RcbiAgfVxuICBpZihjb21wYXJlKSB7XG4gICAgaWYoIXNvcnRlZCkge1xuICAgICAgbGlzdC5zb3J0KGNvbXBhcmUpXG4gICAgfVxuICAgIHJldHVybiB1bmlxdWVfcHJlZChsaXN0LCBjb21wYXJlKVxuICB9XG4gIGlmKCFzb3J0ZWQpIHtcbiAgICBsaXN0LnNvcnQoKVxuICB9XG4gIHJldHVybiB1bmlxdWVfZXEobGlzdClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1bmlxdWVcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL3VuaXEvdW5pcS5qc1xuLy8gbW9kdWxlIGlkID0gNTRcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGlvdGEgPSByZXF1aXJlKFwiaW90YS1hcnJheVwiKVxudmFyIGlzQnVmZmVyID0gcmVxdWlyZShcImlzLWJ1ZmZlclwiKVxuXG52YXIgaGFzVHlwZWRBcnJheXMgID0gKCh0eXBlb2YgRmxvYXQ2NEFycmF5KSAhPT0gXCJ1bmRlZmluZWRcIilcblxuZnVuY3Rpb24gY29tcGFyZTFzdChhLCBiKSB7XG4gIHJldHVybiBhWzBdIC0gYlswXVxufVxuXG5mdW5jdGlvbiBvcmRlcigpIHtcbiAgdmFyIHN0cmlkZSA9IHRoaXMuc3RyaWRlXG4gIHZhciB0ZXJtcyA9IG5ldyBBcnJheShzdHJpZGUubGVuZ3RoKVxuICB2YXIgaVxuICBmb3IoaT0wOyBpPHRlcm1zLmxlbmd0aDsgKytpKSB7XG4gICAgdGVybXNbaV0gPSBbTWF0aC5hYnMoc3RyaWRlW2ldKSwgaV1cbiAgfVxuICB0ZXJtcy5zb3J0KGNvbXBhcmUxc3QpXG4gIHZhciByZXN1bHQgPSBuZXcgQXJyYXkodGVybXMubGVuZ3RoKVxuICBmb3IoaT0wOyBpPHJlc3VsdC5sZW5ndGg7ICsraSkge1xuICAgIHJlc3VsdFtpXSA9IHRlcm1zW2ldWzFdXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5mdW5jdGlvbiBjb21waWxlQ29uc3RydWN0b3IoZHR5cGUsIGRpbWVuc2lvbikge1xuICB2YXIgY2xhc3NOYW1lID0gW1wiVmlld1wiLCBkaW1lbnNpb24sIFwiZFwiLCBkdHlwZV0uam9pbihcIlwiKVxuICBpZihkaW1lbnNpb24gPCAwKSB7XG4gICAgY2xhc3NOYW1lID0gXCJWaWV3X05pbFwiICsgZHR5cGVcbiAgfVxuICB2YXIgdXNlR2V0dGVycyA9IChkdHlwZSA9PT0gXCJnZW5lcmljXCIpXG5cbiAgaWYoZGltZW5zaW9uID09PSAtMSkge1xuICAgIC8vU3BlY2lhbCBjYXNlIGZvciB0cml2aWFsIGFycmF5c1xuICAgIHZhciBjb2RlID1cbiAgICAgIFwiZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiKGEpe3RoaXMuZGF0YT1hO307XFxcbnZhciBwcm90bz1cIitjbGFzc05hbWUrXCIucHJvdG90eXBlO1xcXG5wcm90by5kdHlwZT0nXCIrZHR5cGUrXCInO1xcXG5wcm90by5pbmRleD1mdW5jdGlvbigpe3JldHVybiAtMX07XFxcbnByb3RvLnNpemU9MDtcXFxucHJvdG8uZGltZW5zaW9uPS0xO1xcXG5wcm90by5zaGFwZT1wcm90by5zdHJpZGU9cHJvdG8ub3JkZXI9W107XFxcbnByb3RvLmxvPXByb3RvLmhpPXByb3RvLnRyYW5zcG9zZT1wcm90by5zdGVwPVxcXG5mdW5jdGlvbigpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSk7fTtcXFxucHJvdG8uZ2V0PXByb3RvLnNldD1mdW5jdGlvbigpe307XFxcbnByb3RvLnBpY2s9ZnVuY3Rpb24oKXtyZXR1cm4gbnVsbH07XFxcbnJldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfXCIrY2xhc3NOYW1lK1wiKGEpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKGEpO31cIlxuICAgIHZhciBwcm9jZWR1cmUgPSBuZXcgRnVuY3Rpb24oY29kZSlcbiAgICByZXR1cm4gcHJvY2VkdXJlKClcbiAgfSBlbHNlIGlmKGRpbWVuc2lvbiA9PT0gMCkge1xuICAgIC8vU3BlY2lhbCBjYXNlIGZvciAwZCBhcnJheXNcbiAgICB2YXIgY29kZSA9XG4gICAgICBcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIihhLGQpIHtcXFxudGhpcy5kYXRhID0gYTtcXFxudGhpcy5vZmZzZXQgPSBkXFxcbn07XFxcbnZhciBwcm90bz1cIitjbGFzc05hbWUrXCIucHJvdG90eXBlO1xcXG5wcm90by5kdHlwZT0nXCIrZHR5cGUrXCInO1xcXG5wcm90by5pbmRleD1mdW5jdGlvbigpe3JldHVybiB0aGlzLm9mZnNldH07XFxcbnByb3RvLmRpbWVuc2lvbj0wO1xcXG5wcm90by5zaXplPTE7XFxcbnByb3RvLnNoYXBlPVxcXG5wcm90by5zdHJpZGU9XFxcbnByb3RvLm9yZGVyPVtdO1xcXG5wcm90by5sbz1cXFxucHJvdG8uaGk9XFxcbnByb3RvLnRyYW5zcG9zZT1cXFxucHJvdG8uc3RlcD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfY29weSgpIHtcXFxucmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLHRoaXMub2Zmc2V0KVxcXG59O1xcXG5wcm90by5waWNrPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9waWNrKCl7XFxcbnJldHVybiBUcml2aWFsQXJyYXkodGhpcy5kYXRhKTtcXFxufTtcXFxucHJvdG8udmFsdWVPZj1wcm90by5nZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2dldCgpe1xcXG5yZXR1cm4gXCIrKHVzZUdldHRlcnMgPyBcInRoaXMuZGF0YS5nZXQodGhpcy5vZmZzZXQpXCIgOiBcInRoaXMuZGF0YVt0aGlzLm9mZnNldF1cIikrXG5cIn07XFxcbnByb3RvLnNldD1mdW5jdGlvbiBcIitjbGFzc05hbWUrXCJfc2V0KHYpe1xcXG5yZXR1cm4gXCIrKHVzZUdldHRlcnMgPyBcInRoaXMuZGF0YS5zZXQodGhpcy5vZmZzZXQsdilcIiA6IFwidGhpcy5kYXRhW3RoaXMub2Zmc2V0XT12XCIpK1wiXFxcbn07XFxcbnJldHVybiBmdW5jdGlvbiBjb25zdHJ1Y3RfXCIrY2xhc3NOYW1lK1wiKGEsYixjLGQpe3JldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKGEsZCl9XCJcbiAgICB2YXIgcHJvY2VkdXJlID0gbmV3IEZ1bmN0aW9uKFwiVHJpdmlhbEFycmF5XCIsIGNvZGUpXG4gICAgcmV0dXJuIHByb2NlZHVyZShDQUNIRURfQ09OU1RSVUNUT1JTW2R0eXBlXVswXSlcbiAgfVxuXG4gIHZhciBjb2RlID0gW1wiJ3VzZSBzdHJpY3QnXCJdXG5cbiAgLy9DcmVhdGUgY29uc3RydWN0b3IgZm9yIHZpZXdcbiAgdmFyIGluZGljZXMgPSBpb3RhKGRpbWVuc2lvbilcbiAgdmFyIGFyZ3MgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcImlcIitpIH0pXG4gIHZhciBpbmRleF9zdHIgPSBcInRoaXMub2Zmc2V0K1wiICsgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgICByZXR1cm4gXCJ0aGlzLnN0cmlkZVtcIiArIGkgKyBcIl0qaVwiICsgaVxuICAgICAgfSkuam9pbihcIitcIilcbiAgdmFyIHNoYXBlQXJnID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYlwiK2lcbiAgICB9KS5qb2luKFwiLFwiKVxuICB2YXIgc3RyaWRlQXJnID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiY1wiK2lcbiAgICB9KS5qb2luKFwiLFwiKVxuICBjb2RlLnB1c2goXG4gICAgXCJmdW5jdGlvbiBcIitjbGFzc05hbWUrXCIoYSxcIiArIHNoYXBlQXJnICsgXCIsXCIgKyBzdHJpZGVBcmcgKyBcIixkKXt0aGlzLmRhdGE9YVwiLFxuICAgICAgXCJ0aGlzLnNoYXBlPVtcIiArIHNoYXBlQXJnICsgXCJdXCIsXG4gICAgICBcInRoaXMuc3RyaWRlPVtcIiArIHN0cmlkZUFyZyArIFwiXVwiLFxuICAgICAgXCJ0aGlzLm9mZnNldD1kfDB9XCIsXG4gICAgXCJ2YXIgcHJvdG89XCIrY2xhc3NOYW1lK1wiLnByb3RvdHlwZVwiLFxuICAgIFwicHJvdG8uZHR5cGU9J1wiK2R0eXBlK1wiJ1wiLFxuICAgIFwicHJvdG8uZGltZW5zaW9uPVwiK2RpbWVuc2lvbilcblxuICAvL3ZpZXcuc2l6ZTpcbiAgY29kZS5wdXNoKFwiT2JqZWN0LmRlZmluZVByb3BlcnR5KHByb3RvLCdzaXplJyx7Z2V0OmZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zaXplKCl7XFxcbnJldHVybiBcIitpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcInRoaXMuc2hhcGVbXCIraStcIl1cIiB9KS5qb2luKFwiKlwiKSxcblwifX0pXCIpXG5cbiAgLy92aWV3Lm9yZGVyOlxuICBpZihkaW1lbnNpb24gPT09IDEpIHtcbiAgICBjb2RlLnB1c2goXCJwcm90by5vcmRlcj1bMF1cIilcbiAgfSBlbHNlIHtcbiAgICBjb2RlLnB1c2goXCJPYmplY3QuZGVmaW5lUHJvcGVydHkocHJvdG8sJ29yZGVyJyx7Z2V0OlwiKVxuICAgIGlmKGRpbWVuc2lvbiA8IDQpIHtcbiAgICAgIGNvZGUucHVzaChcImZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9vcmRlcigpe1wiKVxuICAgICAgaWYoZGltZW5zaW9uID09PSAyKSB7XG4gICAgICAgIGNvZGUucHVzaChcInJldHVybiAoTWF0aC5hYnModGhpcy5zdHJpZGVbMF0pPk1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSk/WzEsMF06WzAsMV19fSlcIilcbiAgICAgIH0gZWxzZSBpZihkaW1lbnNpb24gPT09IDMpIHtcbiAgICAgICAgY29kZS5wdXNoKFxuXCJ2YXIgczA9TWF0aC5hYnModGhpcy5zdHJpZGVbMF0pLHMxPU1hdGguYWJzKHRoaXMuc3RyaWRlWzFdKSxzMj1NYXRoLmFicyh0aGlzLnN0cmlkZVsyXSk7XFxcbmlmKHMwPnMxKXtcXFxuaWYoczE+czIpe1xcXG5yZXR1cm4gWzIsMSwwXTtcXFxufWVsc2UgaWYoczA+czIpe1xcXG5yZXR1cm4gWzEsMiwwXTtcXFxufWVsc2V7XFxcbnJldHVybiBbMSwwLDJdO1xcXG59XFxcbn1lbHNlIGlmKHMwPnMyKXtcXFxucmV0dXJuIFsyLDAsMV07XFxcbn1lbHNlIGlmKHMyPnMxKXtcXFxucmV0dXJuIFswLDEsMl07XFxcbn1lbHNle1xcXG5yZXR1cm4gWzAsMiwxXTtcXFxufX19KVwiKVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2RlLnB1c2goXCJPUkRFUn0pXCIpXG4gICAgfVxuICB9XG5cbiAgLy92aWV3LnNldChpMCwgLi4uLCB2KTpcbiAgY29kZS5wdXNoKFxuXCJwcm90by5zZXQ9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX3NldChcIithcmdzLmpvaW4oXCIsXCIpK1wiLHYpe1wiKVxuICBpZih1c2VHZXR0ZXJzKSB7XG4gICAgY29kZS5wdXNoKFwicmV0dXJuIHRoaXMuZGF0YS5zZXQoXCIraW5kZXhfc3RyK1wiLHYpfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGFbXCIraW5kZXhfc3RyK1wiXT12fVwiKVxuICB9XG5cbiAgLy92aWV3LmdldChpMCwgLi4uKTpcbiAgY29kZS5wdXNoKFwicHJvdG8uZ2V0PWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9nZXQoXCIrYXJncy5qb2luKFwiLFwiKStcIil7XCIpXG4gIGlmKHVzZUdldHRlcnMpIHtcbiAgICBjb2RlLnB1c2goXCJyZXR1cm4gdGhpcy5kYXRhLmdldChcIitpbmRleF9zdHIrXCIpfVwiKVxuICB9IGVsc2Uge1xuICAgIGNvZGUucHVzaChcInJldHVybiB0aGlzLmRhdGFbXCIraW5kZXhfc3RyK1wiXX1cIilcbiAgfVxuXG4gIC8vdmlldy5pbmRleDpcbiAgY29kZS5wdXNoKFxuICAgIFwicHJvdG8uaW5kZXg9ZnVuY3Rpb24gXCIrY2xhc3NOYW1lK1wiX2luZGV4KFwiLCBhcmdzLmpvaW4oKSwgXCIpe3JldHVybiBcIitpbmRleF9zdHIrXCJ9XCIpXG5cbiAgLy92aWV3LmhpKCk6XG4gIGNvZGUucHVzaChcInByb3RvLmhpPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9oaShcIithcmdzLmpvaW4oXCIsXCIpK1wiKXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIih0aGlzLmRhdGEsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFtcIih0eXBlb2YgaVwiLGksXCIhPT0nbnVtYmVyJ3x8aVwiLGksXCI8MCk/dGhpcy5zaGFwZVtcIiwgaSwgXCJdOmlcIiwgaSxcInwwXCJdLmpvaW4oXCJcIilcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJ0aGlzLnN0cmlkZVtcIitpICsgXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIix0aGlzLm9mZnNldCl9XCIpXG5cbiAgLy92aWV3LmxvKCk6XG4gIHZhciBhX3ZhcnMgPSBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBcImFcIitpK1wiPXRoaXMuc2hhcGVbXCIraStcIl1cIiB9KVxuICB2YXIgY192YXJzID0gaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkgeyByZXR1cm4gXCJjXCIraStcIj10aGlzLnN0cmlkZVtcIitpK1wiXVwiIH0pXG4gIGNvZGUucHVzaChcInByb3RvLmxvPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9sbyhcIithcmdzLmpvaW4oXCIsXCIpK1wiKXt2YXIgYj10aGlzLm9mZnNldCxkPTAsXCIrYV92YXJzLmpvaW4oXCIsXCIpK1wiLFwiK2NfdmFycy5qb2luKFwiLFwiKSlcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXG5cImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInJiZpXCIraStcIj49MCl7XFxcbmQ9aVwiK2krXCJ8MDtcXFxuYis9Y1wiK2krXCIqZDtcXFxuYVwiK2krXCItPWR9XCIpXG4gIH1cbiAgY29kZS5wdXNoKFwicmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcImFcIitpXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiY1wiK2lcbiAgICB9KS5qb2luKFwiLFwiKStcIixiKX1cIilcblxuICAvL3ZpZXcuc3RlcCgpOlxuICBjb2RlLnB1c2goXCJwcm90by5zdGVwPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9zdGVwKFwiK2FyZ3Muam9pbihcIixcIikrXCIpe3ZhciBcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJhXCIraStcIj10aGlzLnNoYXBlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJiXCIraStcIj10aGlzLnN0cmlkZVtcIitpK1wiXVwiXG4gICAgfSkuam9pbihcIixcIikrXCIsYz10aGlzLm9mZnNldCxkPTAsY2VpbD1NYXRoLmNlaWxcIilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICBjb2RlLnB1c2goXG5cImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInKXtcXFxuZD1pXCIraStcInwwO1xcXG5pZihkPDApe1xcXG5jKz1iXCIraStcIiooYVwiK2krXCItMSk7XFxcbmFcIitpK1wiPWNlaWwoLWFcIitpK1wiL2QpXFxcbn1lbHNle1xcXG5hXCIraStcIj1jZWlsKGFcIitpK1wiL2QpXFxcbn1cXFxuYlwiK2krXCIqPWRcXFxufVwiKVxuICB9XG4gIGNvZGUucHVzaChcInJldHVybiBuZXcgXCIrY2xhc3NOYW1lK1wiKHRoaXMuZGF0YSxcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJhXCIgKyBpXG4gICAgfSkuam9pbihcIixcIikrXCIsXCIrXG4gICAgaW5kaWNlcy5tYXAoZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIFwiYlwiICsgaVxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLGMpfVwiKVxuXG4gIC8vdmlldy50cmFuc3Bvc2UoKTpcbiAgdmFyIHRTaGFwZSA9IG5ldyBBcnJheShkaW1lbnNpb24pXG4gIHZhciB0U3RyaWRlID0gbmV3IEFycmF5KGRpbWVuc2lvbilcbiAgZm9yKHZhciBpPTA7IGk8ZGltZW5zaW9uOyArK2kpIHtcbiAgICB0U2hhcGVbaV0gPSBcImFbaVwiK2krXCJdXCJcbiAgICB0U3RyaWRlW2ldID0gXCJiW2lcIitpK1wiXVwiXG4gIH1cbiAgY29kZS5wdXNoKFwicHJvdG8udHJhbnNwb3NlPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl90cmFuc3Bvc2UoXCIrYXJncytcIil7XCIrXG4gICAgYXJncy5tYXAoZnVuY3Rpb24obixpZHgpIHsgcmV0dXJuIG4gKyBcIj0oXCIgKyBuICsgXCI9PT11bmRlZmluZWQ/XCIgKyBpZHggKyBcIjpcIiArIG4gKyBcInwwKVwifSkuam9pbihcIjtcIiksXG4gICAgXCJ2YXIgYT10aGlzLnNoYXBlLGI9dGhpcy5zdHJpZGU7cmV0dXJuIG5ldyBcIitjbGFzc05hbWUrXCIodGhpcy5kYXRhLFwiK3RTaGFwZS5qb2luKFwiLFwiKStcIixcIit0U3RyaWRlLmpvaW4oXCIsXCIpK1wiLHRoaXMub2Zmc2V0KX1cIilcblxuICAvL3ZpZXcucGljaygpOlxuICBjb2RlLnB1c2goXCJwcm90by5waWNrPWZ1bmN0aW9uIFwiK2NsYXNzTmFtZStcIl9waWNrKFwiK2FyZ3MrXCIpe3ZhciBhPVtdLGI9W10sYz10aGlzLm9mZnNldFwiKVxuICBmb3IodmFyIGk9MDsgaTxkaW1lbnNpb247ICsraSkge1xuICAgIGNvZGUucHVzaChcImlmKHR5cGVvZiBpXCIraStcIj09PSdudW1iZXInJiZpXCIraStcIj49MCl7Yz0oYyt0aGlzLnN0cmlkZVtcIitpK1wiXSppXCIraStcIil8MH1lbHNle2EucHVzaCh0aGlzLnNoYXBlW1wiK2krXCJdKTtiLnB1c2godGhpcy5zdHJpZGVbXCIraStcIl0pfVwiKVxuICB9XG4gIGNvZGUucHVzaChcInZhciBjdG9yPUNUT1JfTElTVFthLmxlbmd0aCsxXTtyZXR1cm4gY3Rvcih0aGlzLmRhdGEsYSxiLGMpfVwiKVxuXG4gIC8vQWRkIHJldHVybiBzdGF0ZW1lbnRcbiAgY29kZS5wdXNoKFwicmV0dXJuIGZ1bmN0aW9uIGNvbnN0cnVjdF9cIitjbGFzc05hbWUrXCIoZGF0YSxzaGFwZSxzdHJpZGUsb2Zmc2V0KXtyZXR1cm4gbmV3IFwiK2NsYXNzTmFtZStcIihkYXRhLFwiK1xuICAgIGluZGljZXMubWFwKGZ1bmN0aW9uKGkpIHtcbiAgICAgIHJldHVybiBcInNoYXBlW1wiK2krXCJdXCJcbiAgICB9KS5qb2luKFwiLFwiKStcIixcIitcbiAgICBpbmRpY2VzLm1hcChmdW5jdGlvbihpKSB7XG4gICAgICByZXR1cm4gXCJzdHJpZGVbXCIraStcIl1cIlxuICAgIH0pLmpvaW4oXCIsXCIpK1wiLG9mZnNldCl9XCIpXG5cbiAgLy9Db21waWxlIHByb2NlZHVyZVxuICB2YXIgcHJvY2VkdXJlID0gbmV3IEZ1bmN0aW9uKFwiQ1RPUl9MSVNUXCIsIFwiT1JERVJcIiwgY29kZS5qb2luKFwiXFxuXCIpKVxuICByZXR1cm4gcHJvY2VkdXJlKENBQ0hFRF9DT05TVFJVQ1RPUlNbZHR5cGVdLCBvcmRlcilcbn1cblxuZnVuY3Rpb24gYXJyYXlEVHlwZShkYXRhKSB7XG4gIGlmKGlzQnVmZmVyKGRhdGEpKSB7XG4gICAgcmV0dXJuIFwiYnVmZmVyXCJcbiAgfVxuICBpZihoYXNUeXBlZEFycmF5cykge1xuICAgIHN3aXRjaChPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoZGF0YSkpIHtcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEZsb2F0NjRBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwiZmxvYXQ2NFwiXG4gICAgICBjYXNlIFwiW29iamVjdCBGbG9hdDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImZsb2F0MzJcIlxuICAgICAgY2FzZSBcIltvYmplY3QgSW50OEFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJpbnQ4XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEludDE2QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImludDE2XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IEludDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcImludDMyXCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQ4QXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQ4XCJcbiAgICAgIGNhc2UgXCJbb2JqZWN0IFVpbnQxNkFycmF5XVwiOlxuICAgICAgICByZXR1cm4gXCJ1aW50MTZcIlxuICAgICAgY2FzZSBcIltvYmplY3QgVWludDMyQXJyYXldXCI6XG4gICAgICAgIHJldHVybiBcInVpbnQzMlwiXG4gICAgICBjYXNlIFwiW29iamVjdCBVaW50OENsYW1wZWRBcnJheV1cIjpcbiAgICAgICAgcmV0dXJuIFwidWludDhfY2xhbXBlZFwiXG4gICAgfVxuICB9XG4gIGlmKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICByZXR1cm4gXCJhcnJheVwiXG4gIH1cbiAgcmV0dXJuIFwiZ2VuZXJpY1wiXG59XG5cbnZhciBDQUNIRURfQ09OU1RSVUNUT1JTID0ge1xuICBcImZsb2F0MzJcIjpbXSxcbiAgXCJmbG9hdDY0XCI6W10sXG4gIFwiaW50OFwiOltdLFxuICBcImludDE2XCI6W10sXG4gIFwiaW50MzJcIjpbXSxcbiAgXCJ1aW50OFwiOltdLFxuICBcInVpbnQxNlwiOltdLFxuICBcInVpbnQzMlwiOltdLFxuICBcImFycmF5XCI6W10sXG4gIFwidWludDhfY2xhbXBlZFwiOltdLFxuICBcImJ1ZmZlclwiOltdLFxuICBcImdlbmVyaWNcIjpbXVxufVxuXG47KGZ1bmN0aW9uKCkge1xuICBmb3IodmFyIGlkIGluIENBQ0hFRF9DT05TVFJVQ1RPUlMpIHtcbiAgICBDQUNIRURfQ09OU1RSVUNUT1JTW2lkXS5wdXNoKGNvbXBpbGVDb25zdHJ1Y3RvcihpZCwgLTEpKVxuICB9XG59KTtcblxuZnVuY3Rpb24gd3JhcHBlZE5EQXJyYXlDdG9yKGRhdGEsIHNoYXBlLCBzdHJpZGUsIG9mZnNldCkge1xuICBpZihkYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICB2YXIgY3RvciA9IENBQ0hFRF9DT05TVFJVQ1RPUlMuYXJyYXlbMF1cbiAgICByZXR1cm4gY3RvcihbXSlcbiAgfSBlbHNlIGlmKHR5cGVvZiBkYXRhID09PSBcIm51bWJlclwiKSB7XG4gICAgZGF0YSA9IFtkYXRhXVxuICB9XG4gIGlmKHNoYXBlID09PSB1bmRlZmluZWQpIHtcbiAgICBzaGFwZSA9IFsgZGF0YS5sZW5ndGggXVxuICB9XG4gIHZhciBkID0gc2hhcGUubGVuZ3RoXG4gIGlmKHN0cmlkZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RyaWRlID0gbmV3IEFycmF5KGQpXG4gICAgZm9yKHZhciBpPWQtMSwgc3o9MTsgaT49MDsgLS1pKSB7XG4gICAgICBzdHJpZGVbaV0gPSBzelxuICAgICAgc3ogKj0gc2hhcGVbaV1cbiAgICB9XG4gIH1cbiAgaWYob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBvZmZzZXQgPSAwXG4gICAgZm9yKHZhciBpPTA7IGk8ZDsgKytpKSB7XG4gICAgICBpZihzdHJpZGVbaV0gPCAwKSB7XG4gICAgICAgIG9mZnNldCAtPSAoc2hhcGVbaV0tMSkqc3RyaWRlW2ldXG4gICAgICB9XG4gICAgfVxuICB9XG4gIHZhciBkdHlwZSA9IGFycmF5RFR5cGUoZGF0YSlcbiAgdmFyIGN0b3JfbGlzdCA9IENBQ0hFRF9DT05TVFJVQ1RPUlNbZHR5cGVdXG4gIHdoaWxlKGN0b3JfbGlzdC5sZW5ndGggPD0gZCsxKSB7XG4gICAgY3Rvcl9saXN0LnB1c2goY29tcGlsZUNvbnN0cnVjdG9yKGR0eXBlLCBjdG9yX2xpc3QubGVuZ3RoLTEpKVxuICB9XG4gIHZhciBjdG9yID0gY3Rvcl9saXN0W2QrMV1cbiAgcmV0dXJuIGN0b3IoZGF0YSwgc2hhcGUsIHN0cmlkZSwgb2Zmc2V0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdyYXBwZWROREFycmF5Q3RvclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvbmRhcnJheS9uZGFycmF5LmpzXG4vLyBtb2R1bGUgaWQgPSA1NVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIlxuXG5mdW5jdGlvbiBpb3RhKG4pIHtcbiAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheShuKVxuICBmb3IodmFyIGk9MDsgaTxuOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSBpXG4gIH1cbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGlvdGFcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL25vZGVfbW9kdWxlcy9pb3RhLWFycmF5L2lvdGEuanNcbi8vIG1vZHVsZSBpZCA9IDU2XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxmZXJvc3NAZmVyb3NzLm9yZz4gPGh0dHA6Ly9mZXJvc3Mub3JnPlxuICogQGxpY2Vuc2UgIE1JVFxuICovXG5cbi8vIFRoZSBfaXNCdWZmZXIgY2hlY2sgaXMgZm9yIFNhZmFyaSA1LTcgc3VwcG9ydCwgYmVjYXVzZSBpdCdzIG1pc3Npbmdcbi8vIE9iamVjdC5wcm90b3R5cGUuY29uc3RydWN0b3IuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHlcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG9iaikge1xuICByZXR1cm4gb2JqICE9IG51bGwgJiYgKGlzQnVmZmVyKG9iaikgfHwgaXNTbG93QnVmZmVyKG9iaikgfHwgISFvYmouX2lzQnVmZmVyKVxufVxuXG5mdW5jdGlvbiBpc0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiAhIW9iai5jb25zdHJ1Y3RvciAmJiB0eXBlb2Ygb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyID09PSAnZnVuY3Rpb24nICYmIG9iai5jb25zdHJ1Y3Rvci5pc0J1ZmZlcihvYmopXG59XG5cbi8vIEZvciBOb2RlIHYwLjEwIHN1cHBvcnQuIFJlbW92ZSB0aGlzIGV2ZW50dWFsbHkuXG5mdW5jdGlvbiBpc1Nsb3dCdWZmZXIgKG9iaikge1xuICByZXR1cm4gdHlwZW9mIG9iai5yZWFkRmxvYXRMRSA9PT0gJ2Z1bmN0aW9uJyAmJiB0eXBlb2Ygb2JqLnNsaWNlID09PSAnZnVuY3Rpb24nICYmIGlzQnVmZmVyKG9iai5zbGljZSgwLCAwKSlcbn1cblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qc1xuLy8gbW9kdWxlIGlkID0gNTdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGNyZWF0ZVZBT05hdGl2ZSA9IHJlcXVpcmUoXCIuL2xpYi92YW8tbmF0aXZlLmpzXCIpXG52YXIgY3JlYXRlVkFPRW11bGF0ZWQgPSByZXF1aXJlKFwiLi9saWIvdmFvLWVtdWxhdGVkLmpzXCIpXG5cbmZ1bmN0aW9uIEV4dGVuc2lvblNoaW0gKGdsKSB7XG4gIHRoaXMuYmluZFZlcnRleEFycmF5T0VTID0gZ2wuYmluZFZlcnRleEFycmF5LmJpbmQoZ2wpXG4gIHRoaXMuY3JlYXRlVmVydGV4QXJyYXlPRVMgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheS5iaW5kKGdsKVxuICB0aGlzLmRlbGV0ZVZlcnRleEFycmF5T0VTID0gZ2wuZGVsZXRlVmVydGV4QXJyYXkuYmluZChnbClcbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPKGdsLCBhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHZhciBleHQgPSBnbC5jcmVhdGVWZXJ0ZXhBcnJheVxuICAgID8gbmV3IEV4dGVuc2lvblNoaW0oZ2wpXG4gICAgOiBnbC5nZXRFeHRlbnNpb24oJ09FU192ZXJ0ZXhfYXJyYXlfb2JqZWN0JylcbiAgdmFyIHZhb1xuXG4gIGlmKGV4dCkge1xuICAgIHZhbyA9IGNyZWF0ZVZBT05hdGl2ZShnbCwgZXh0KVxuICB9IGVsc2Uge1xuICAgIHZhbyA9IGNyZWF0ZVZBT0VtdWxhdGVkKGdsKVxuICB9XG4gIHZhby51cGRhdGUoYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSlcbiAgcmV0dXJuIHZhb1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZBT1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL3Zhby5qc1xuLy8gbW9kdWxlIGlkID0gNThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiXCJ1c2Ugc3RyaWN0XCJcblxudmFyIGJpbmRBdHRyaWJzID0gcmVxdWlyZShcIi4vZG8tYmluZC5qc1wiKVxuXG5mdW5jdGlvbiBWZXJ0ZXhBdHRyaWJ1dGUobG9jYXRpb24sIGRpbWVuc2lvbiwgYSwgYiwgYywgZCkge1xuICB0aGlzLmxvY2F0aW9uID0gbG9jYXRpb25cbiAgdGhpcy5kaW1lbnNpb24gPSBkaW1lbnNpb25cbiAgdGhpcy5hID0gYVxuICB0aGlzLmIgPSBiXG4gIHRoaXMuYyA9IGNcbiAgdGhpcy5kID0gZFxufVxuXG5WZXJ0ZXhBdHRyaWJ1dGUucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbihnbCkge1xuICBzd2l0Y2godGhpcy5kaW1lbnNpb24pIHtcbiAgICBjYXNlIDE6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWIxZih0aGlzLmxvY2F0aW9uLCB0aGlzLmEpXG4gICAgYnJlYWtcbiAgICBjYXNlIDI6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWIyZih0aGlzLmxvY2F0aW9uLCB0aGlzLmEsIHRoaXMuYilcbiAgICBicmVha1xuICAgIGNhc2UgMzpcbiAgICAgIGdsLnZlcnRleEF0dHJpYjNmKHRoaXMubG9jYXRpb24sIHRoaXMuYSwgdGhpcy5iLCB0aGlzLmMpXG4gICAgYnJlYWtcbiAgICBjYXNlIDQ6XG4gICAgICBnbC52ZXJ0ZXhBdHRyaWI0Zih0aGlzLmxvY2F0aW9uLCB0aGlzLmEsIHRoaXMuYiwgdGhpcy5jLCB0aGlzLmQpXG4gICAgYnJlYWtcbiAgfVxufVxuXG5mdW5jdGlvbiBWQU9OYXRpdmUoZ2wsIGV4dCwgaGFuZGxlKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLl9leHQgPSBleHRcbiAgdGhpcy5oYW5kbGUgPSBoYW5kbGVcbiAgdGhpcy5fYXR0cmlicyA9IFtdXG4gIHRoaXMuX3VzZUVsZW1lbnRzID0gZmFsc2VcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5iaW5kID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX2V4dC5iaW5kVmVydGV4QXJyYXlPRVModGhpcy5oYW5kbGUpXG4gIGZvcih2YXIgaT0wOyBpPHRoaXMuX2F0dHJpYnMubGVuZ3RoOyArK2kpIHtcbiAgICB0aGlzLl9hdHRyaWJzW2ldLmJpbmQodGhpcy5nbClcbiAgfVxufVxuXG5WQU9OYXRpdmUucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9leHQuYmluZFZlcnRleEFycmF5T0VTKG51bGwpXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9leHQuZGVsZXRlVmVydGV4QXJyYXlPRVModGhpcy5oYW5kbGUpXG59XG5cblZBT05hdGl2ZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24oYXR0cmlidXRlcywgZWxlbWVudHMsIGVsZW1lbnRzVHlwZSkge1xuICB0aGlzLmJpbmQoKVxuICBiaW5kQXR0cmlicyh0aGlzLmdsLCBlbGVtZW50cywgYXR0cmlidXRlcylcbiAgdGhpcy51bmJpbmQoKVxuICB0aGlzLl9hdHRyaWJzLmxlbmd0aCA9IDBcbiAgaWYoYXR0cmlidXRlcylcbiAgZm9yKHZhciBpPTA7IGk8YXR0cmlidXRlcy5sZW5ndGg7ICsraSkge1xuICAgIHZhciBhID0gYXR0cmlidXRlc1tpXVxuICAgIGlmKHR5cGVvZiBhID09PSBcIm51bWJlclwiKSB7XG4gICAgICB0aGlzLl9hdHRyaWJzLnB1c2gobmV3IFZlcnRleEF0dHJpYnV0ZShpLCAxLCBhKSlcbiAgICB9IGVsc2UgaWYoQXJyYXkuaXNBcnJheShhKSkge1xuICAgICAgdGhpcy5fYXR0cmlicy5wdXNoKG5ldyBWZXJ0ZXhBdHRyaWJ1dGUoaSwgYS5sZW5ndGgsIGFbMF0sIGFbMV0sIGFbMl0sIGFbM10pKVxuICAgIH1cbiAgfVxuICB0aGlzLl91c2VFbGVtZW50cyA9ICEhZWxlbWVudHNcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZWxlbWVudHNUeXBlIHx8IHRoaXMuZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPTmF0aXZlLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24obW9kZSwgY291bnQsIG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIGlmKHRoaXMuX3VzZUVsZW1lbnRzKSB7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0aGlzLl9lbGVtZW50c1R5cGUsIG9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBnbC5kcmF3QXJyYXlzKG1vZGUsIG9mZnNldCwgY291bnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPTmF0aXZlKGdsLCBleHQpIHtcbiAgcmV0dXJuIG5ldyBWQU9OYXRpdmUoZ2wsIGV4dCwgZXh0LmNyZWF0ZVZlcnRleEFycmF5T0VTKCkpXG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVkFPTmF0aXZlXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvZ2wtdmFvL2xpYi92YW8tbmF0aXZlLmpzXG4vLyBtb2R1bGUgaWQgPSA1OVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJcInVzZSBzdHJpY3RcIlxuXG52YXIgYmluZEF0dHJpYnMgPSByZXF1aXJlKFwiLi9kby1iaW5kLmpzXCIpXG5cbmZ1bmN0aW9uIFZBT0VtdWxhdGVkKGdsKSB7XG4gIHRoaXMuZ2wgPSBnbFxuICB0aGlzLl9lbGVtZW50cyA9IG51bGxcbiAgdGhpcy5fYXR0cmlidXRlcyA9IG51bGxcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgYmluZEF0dHJpYnModGhpcy5nbCwgdGhpcy5fZWxlbWVudHMsIHRoaXMuX2F0dHJpYnV0ZXMpXG59XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbihhdHRyaWJ1dGVzLCBlbGVtZW50cywgZWxlbWVudHNUeXBlKSB7XG4gIHRoaXMuX2VsZW1lbnRzID0gZWxlbWVudHNcbiAgdGhpcy5fYXR0cmlidXRlcyA9IGF0dHJpYnV0ZXNcbiAgdGhpcy5fZWxlbWVudHNUeXBlID0gZWxlbWVudHNUeXBlIHx8IHRoaXMuZ2wuVU5TSUdORURfU0hPUlRcbn1cblxuVkFPRW11bGF0ZWQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHsgfVxuVkFPRW11bGF0ZWQucHJvdG90eXBlLnVuYmluZCA9IGZ1bmN0aW9uKCkgeyB9XG5cblZBT0VtdWxhdGVkLnByb3RvdHlwZS5kcmF3ID0gZnVuY3Rpb24obW9kZSwgY291bnQsIG9mZnNldCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfHwgMFxuICB2YXIgZ2wgPSB0aGlzLmdsXG4gIGlmKHRoaXMuX2VsZW1lbnRzKSB7XG4gICAgZ2wuZHJhd0VsZW1lbnRzKG1vZGUsIGNvdW50LCB0aGlzLl9lbGVtZW50c1R5cGUsIG9mZnNldClcbiAgfSBlbHNlIHtcbiAgICBnbC5kcmF3QXJyYXlzKG1vZGUsIG9mZnNldCwgY291bnQpXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlVkFPRW11bGF0ZWQoZ2wpIHtcbiAgcmV0dXJuIG5ldyBWQU9FbXVsYXRlZChnbClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVWQU9FbXVsYXRlZFxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4vbm9kZV9tb2R1bGVzL2dsLXZhby9saWIvdmFvLWVtdWxhdGVkLmpzXG4vLyBtb2R1bGUgaWQgPSA2MFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJmdW5jdGlvbiBkb3dubG9hZCh0LGUsbil7ZnVuY3Rpb24gaSh0KXt2YXIgZT10LnNwbGl0KC9bOjssXS8pLG49ZVsxXSxpPVwiYmFzZTY0XCI9PWVbMl0/YXRvYjpkZWNvZGVVUklDb21wb25lbnQscj1pKGUucG9wKCkpLG89ci5sZW5ndGgsYT0wLHM9bmV3IFVpbnQ4QXJyYXkobyk7Zm9yKGE7YTxvOysrYSlzW2FdPXIuY2hhckNvZGVBdChhKTtyZXR1cm4gbmV3IG0oW3NdLHt0eXBlOm59KX1mdW5jdGlvbiByKHQsZSl7aWYoXCJkb3dubG9hZFwiaW4gbClyZXR1cm4gbC5ocmVmPXQsbC5zZXRBdHRyaWJ1dGUoXCJkb3dubG9hZFwiLHcpLGwuaW5uZXJIVE1MPVwiZG93bmxvYWRpbmcuLi5cIixsLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZi5ib2R5LmFwcGVuZENoaWxkKGwpLHNldFRpbWVvdXQoZnVuY3Rpb24oKXtsLmNsaWNrKCksZi5ib2R5LnJlbW92ZUNoaWxkKGwpLGU9PT0hMCYmc2V0VGltZW91dChmdW5jdGlvbigpe2guVVJMLnJldm9rZU9iamVjdFVSTChsLmhyZWYpfSwyNTApfSw2NiksITA7dmFyIG49Zi5jcmVhdGVFbGVtZW50KFwiaWZyYW1lXCIpO2YuYm9keS5hcHBlbmRDaGlsZChuKSxlfHwodD1cImRhdGE6XCIrdC5yZXBsYWNlKC9eZGF0YTooW1xcd1xcL1xcLVxcK10rKS8sZCkpLG4uc3JjPXQsc2V0VGltZW91dChmdW5jdGlvbigpe2YuYm9keS5yZW1vdmVDaGlsZChuKX0sMzMzKX12YXIgbyxhLHMsaD13aW5kb3csZD1cImFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbVwiLHU9bnx8ZCxjPXQsZj1kb2N1bWVudCxsPWYuY3JlYXRlRWxlbWVudChcImFcIikscD1mdW5jdGlvbih0KXtyZXR1cm4gU3RyaW5nKHQpfSxtPWguQmxvYnx8aC5Nb3pCbG9ifHxoLldlYktpdEJsb2J8fHAsZz1oLk1TQmxvYkJ1aWxkZXJ8fGguV2ViS2l0QmxvYkJ1aWxkZXJ8fGguQmxvYkJ1aWxkZXIsdz1lfHxcImRvd25sb2FkXCI7aWYoXCJ0cnVlXCI9PT1TdHJpbmcodGhpcykmJihjPVtjLHVdLHU9Y1swXSxjPWNbMV0pLFN0cmluZyhjKS5tYXRjaCgvXmRhdGFcXDpbXFx3K1xcLV0rXFwvW1xcdytcXC1dK1ssO10vKSlyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2I/bmF2aWdhdG9yLm1zU2F2ZUJsb2IoaShjKSx3KTpyKGMpO3RyeXtvPWMgaW5zdGFuY2VvZiBtP2M6bmV3IG0oW2NdLHt0eXBlOnV9KX1jYXRjaCh0KXtnJiYoYT1uZXcgZyxhLmFwcGVuZChbY10pLG89YS5nZXRCbG9iKHUpKX1pZihuYXZpZ2F0b3IubXNTYXZlQmxvYilyZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2Iobyx3KTtpZihoLlVSTClyKGguVVJMLmNyZWF0ZU9iamVjdFVSTChvKSwhMCk7ZWxzZXtpZihcInN0cmluZ1wiPT10eXBlb2Ygb3x8by5jb25zdHJ1Y3Rvcj09PXApdHJ5e3JldHVybiByKFwiZGF0YTpcIit1K1wiO2Jhc2U2NCxcIitoLmJ0b2EobykpfWNhdGNoKHQpe3JldHVybiByKFwiZGF0YTpcIit1K1wiLFwiK2VuY29kZVVSSUNvbXBvbmVudChvKSl9cz1uZXcgRmlsZVJlYWRlcixzLm9ubG9hZD1mdW5jdGlvbih0KXtyKHRoaXMucmVzdWx0KX0scy5yZWFkQXNEYXRhVVJMKG8pfXJldHVybiEwfXdpbmRvdy5XaGFtbXk9ZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQsbil7Zm9yKHZhciBpPWUodCkscj0zZTQsbz1be2lkOjQ0MDc4Njg1MSxkYXRhOlt7ZGF0YToxLGlkOjE3MDMwfSx7ZGF0YToxLGlkOjE3MTQzfSx7ZGF0YTo0LGlkOjE3MTM4fSx7ZGF0YTo4LGlkOjE3MTM5fSx7ZGF0YTpcIndlYm1cIixpZDoxNzAyNn0se2RhdGE6MixpZDoxNzAzMX0se2RhdGE6MixpZDoxNzAyOX1dfSx7aWQ6NDA4MTI1NTQzLGRhdGE6W3tpZDozNTcxNDkwMzAsZGF0YTpbe2RhdGE6MWU2LGlkOjI4MDc3Mjl9LHtkYXRhOlwid2hhbW15XCIsaWQ6MTk4NDB9LHtkYXRhOlwid2hhbW15XCIsaWQ6MjIzMzd9LHtkYXRhOmMoaS5kdXJhdGlvbiksaWQ6MTc1NDV9XX0se2lkOjM3NDY0ODQyNyxkYXRhOlt7aWQ6MTc0LGRhdGE6W3tkYXRhOjEsaWQ6MjE1fSx7ZGF0YToxLGlkOjI5NjM3fSx7ZGF0YTowLGlkOjE1Nn0se2RhdGE6XCJ1bmRcIixpZDoyMjc0NzE2fSx7ZGF0YTpcIlZfVlA4XCIsaWQ6MTM0fSx7ZGF0YTpcIlZQOFwiLGlkOjI0NTkyNzJ9LHtkYXRhOjEsaWQ6MTMxfSx7aWQ6MjI0LGRhdGE6W3tkYXRhOmkud2lkdGgsaWQ6MTc2fSx7ZGF0YTppLmhlaWdodCxpZDoxODZ9XX1dfV19LHtpZDo0NzUyNDk1MTUsZGF0YTpbXX1dfV0scz1vWzFdLGQ9cy5kYXRhWzJdLHU9MCxmPTA7dTx0Lmxlbmd0aDspe3ZhciBsPXtpZDoxODcsZGF0YTpbe2RhdGE6TWF0aC5yb3VuZChmKSxpZDoxNzl9LHtpZDoxODMsZGF0YTpbe2RhdGE6MSxpZDoyNDd9LHtkYXRhOjAsc2l6ZTo4LGlkOjI0MX1dfV19O2QuZGF0YS5wdXNoKGwpO3ZhciBwPVtdLG09MDtkbyBwLnB1c2godFt1XSksbSs9dFt1XS5kdXJhdGlvbix1Kys7d2hpbGUodTx0Lmxlbmd0aCYmbTxyKTt2YXIgZz0wLHc9e2lkOjUyNDUzMTMxNyxkYXRhOlt7ZGF0YTpNYXRoLnJvdW5kKGYpLGlkOjIzMX1dLmNvbmNhdChwLm1hcChmdW5jdGlvbih0KXt2YXIgZT1oKHtkaXNjYXJkYWJsZTowLGZyYW1lOnQuZGF0YS5zbGljZSg0KSxpbnZpc2libGU6MCxrZXlmcmFtZToxLGxhY2luZzowLHRyYWNrTnVtOjEsdGltZWNvZGU6TWF0aC5yb3VuZChnKX0pO3JldHVybiBnKz10LmR1cmF0aW9uLHtkYXRhOmUsaWQ6MTYzfX0pKX07cy5kYXRhLnB1c2godyksZis9bX1mb3IodmFyIHY9MCx5PTA7eTxzLmRhdGEubGVuZ3RoO3krKyl7eT49MyYmKGQuZGF0YVt5LTNdLmRhdGFbMV0uZGF0YVsxXS5kYXRhPXYpO3ZhciBiPWEoW3MuZGF0YVt5XV0sbik7dis9Yi5zaXplfHxiLmJ5dGVMZW5ndGh8fGIubGVuZ3RoLDIhPXkmJihzLmRhdGFbeV09Yil9cmV0dXJuIGEobyxuKX1mdW5jdGlvbiBlKHQpe2Zvcih2YXIgZT10WzBdLndpZHRoLG49dFswXS5oZWlnaHQsaT10WzBdLmR1cmF0aW9uLHI9MTtyPHQubGVuZ3RoO3IrKyl7aWYodFtyXS53aWR0aCE9ZSl0aHJvd1wiRnJhbWUgXCIrKHIrMSkrXCIgaGFzIGEgZGlmZmVyZW50IHdpZHRoXCI7aWYodFtyXS5oZWlnaHQhPW4pdGhyb3dcIkZyYW1lIFwiKyhyKzEpK1wiIGhhcyBhIGRpZmZlcmVudCBoZWlnaHRcIjtpZih0W3JdLmR1cmF0aW9uPDB8fHRbcl0uZHVyYXRpb24+MzI3NjcpdGhyb3dcIkZyYW1lIFwiKyhyKzEpK1wiIGhhcyBhIHdlaXJkIGR1cmF0aW9uIChtdXN0IGJlIGJldHdlZW4gMCBhbmQgMzI3NjcpXCI7aSs9dFtyXS5kdXJhdGlvbn1yZXR1cm57ZHVyYXRpb246aSx3aWR0aDplLGhlaWdodDpufX1mdW5jdGlvbiBuKHQpe2Zvcih2YXIgZT1bXTt0PjA7KWUucHVzaCgyNTUmdCksdD4+PTg7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUucmV2ZXJzZSgpKX1mdW5jdGlvbiBpKHQsZSl7Zm9yKHZhciBuPW5ldyBVaW50OEFycmF5KGUpLGk9ZS0xO2k+PTA7aS0tKW5baV09MjU1JnQsdD4+PTg7cmV0dXJuIG59ZnVuY3Rpb24gcih0KXtmb3IodmFyIGU9bmV3IFVpbnQ4QXJyYXkodC5sZW5ndGgpLG49MDtuPHQubGVuZ3RoO24rKyllW25dPXQuY2hhckNvZGVBdChuKTtyZXR1cm4gZX1mdW5jdGlvbiBvKHQpe3ZhciBlPVtdLG49dC5sZW5ndGglOD9uZXcgQXJyYXkoOS10Lmxlbmd0aCU4KS5qb2luKFwiMFwiKTpcIlwiO3Q9bit0O2Zvcih2YXIgaT0wO2k8dC5sZW5ndGg7aSs9OCllLnB1c2gocGFyc2VJbnQodC5zdWJzdHIoaSw4KSwyKSk7cmV0dXJuIG5ldyBVaW50OEFycmF5KGUpfWZ1bmN0aW9uIGEodCxlKXtmb3IodmFyIGg9W10sZD0wO2Q8dC5sZW5ndGg7ZCsrKWlmKFwiaWRcImluIHRbZF0pe3ZhciB1PXRbZF0uZGF0YTtpZihcIm9iamVjdFwiPT10eXBlb2YgdSYmKHU9YSh1LGUpKSxcIm51bWJlclwiPT10eXBlb2YgdSYmKHU9XCJzaXplXCJpbiB0W2RdP2kodSx0W2RdLnNpemUpOm8odS50b1N0cmluZygyKSkpLFwic3RyaW5nXCI9PXR5cGVvZiB1JiYodT1yKHUpKSx1Lmxlbmd0aCk7Zm9yKHZhciBjPXUuc2l6ZXx8dS5ieXRlTGVuZ3RofHx1Lmxlbmd0aCxmPTAsbD01NjtsPjA7bC09NylpZihjPk1hdGgucG93KDIsbCktMil7Zj1sLzc7YnJlYWt9dmFyIHA9Yy50b1N0cmluZygyKSxtPW5ldyBBcnJheSg4KihmKzEpKzEpLmpvaW4oXCIwXCIpLGc9bmV3IEFycmF5KGYrMSkuam9pbihcIjBcIikrMSx3PW0uc3Vic3RyKDAsbS5sZW5ndGgtcC5sZW5ndGgtZy5sZW5ndGgpK3Asdj1nK3c7aC5wdXNoKG4odFtkXS5pZCkpLGgucHVzaChvKHYpKSxoLnB1c2godSl9ZWxzZSBoLnB1c2godFtkXSk7aWYoZSl7dmFyIHk9cyhoKTtyZXR1cm4gbmV3IFVpbnQ4QXJyYXkoeSl9cmV0dXJuIG5ldyBCbG9iKGgse3R5cGU6XCJ2aWRlby93ZWJtXCJ9KX1mdW5jdGlvbiBzKHQsZSl7bnVsbD09ZSYmKGU9W10pO2Zvcih2YXIgbj0wO248dC5sZW5ndGg7bisrKVwib2JqZWN0XCI9PXR5cGVvZiB0W25dP3ModFtuXSxlKTplLnB1c2godFtuXSk7cmV0dXJuIGV9ZnVuY3Rpb24gaCh0KXt2YXIgZT0wO2lmKHQua2V5ZnJhbWUmJihlfD0xMjgpLHQuaW52aXNpYmxlJiYoZXw9OCksdC5sYWNpbmcmJihlfD10LmxhY2luZzw8MSksdC5kaXNjYXJkYWJsZSYmKGV8PTEpLHQudHJhY2tOdW0+MTI3KXRocm93XCJUcmFja051bWJlciA+IDEyNyBub3Qgc3VwcG9ydGVkXCI7dmFyIG49WzEyOHx0LnRyYWNrTnVtLHQudGltZWNvZGU+PjgsMjU1JnQudGltZWNvZGUsZV0ubWFwKGZ1bmN0aW9uKHQpe3JldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlKHQpfSkuam9pbihcIlwiKSt0LmZyYW1lO3JldHVybiBufWZ1bmN0aW9uIGQodCl7Zm9yKHZhciBlPXQuUklGRlswXS5XRUJQWzBdLG49ZS5pbmRleE9mKFwiwp1cdTAwMDEqXCIpLGk9MCxyPVtdO2k8NDtpKyspcltpXT1lLmNoYXJDb2RlQXQobiszK2kpO3ZhciBvLGEscyxoLGQ7cmV0dXJuIGQ9clsxXTw8OHxyWzBdLG89MTYzODMmZCxhPWQ+PjE0LGQ9clszXTw8OHxyWzJdLHM9MTYzODMmZCxoPWQ+PjE0LHt3aWR0aDpvLGhlaWdodDpzLGRhdGE6ZSxyaWZmOnR9fWZ1bmN0aW9uIHUodCl7Zm9yKHZhciBlPTAsbj17fTtlPHQubGVuZ3RoOyl7dmFyIGk9dC5zdWJzdHIoZSw0KTtpZihuW2ldPW5baV18fFtdLFwiUklGRlwiPT1pfHxcIkxJU1RcIj09aSl7dmFyIHI9cGFyc2VJbnQodC5zdWJzdHIoZSs0LDQpLnNwbGl0KFwiXCIpLm1hcChmdW5jdGlvbih0KXt2YXIgZT10LmNoYXJDb2RlQXQoMCkudG9TdHJpbmcoMik7cmV0dXJuIG5ldyBBcnJheSg4LWUubGVuZ3RoKzEpLmpvaW4oXCIwXCIpK2V9KS5qb2luKFwiXCIpLDIpLG89dC5zdWJzdHIoZSs0KzQscik7ZSs9OCtyLG5baV0ucHVzaCh1KG8pKX1lbHNlXCJXRUJQXCI9PWk/KG5baV0ucHVzaCh0LnN1YnN0cihlKzgpKSxlPXQubGVuZ3RoKToobltpXS5wdXNoKHQuc3Vic3RyKGUrNCkpLGU9dC5sZW5ndGgpfXJldHVybiBufWZ1bmN0aW9uIGModCl7cmV0dXJuW10uc2xpY2UuY2FsbChuZXcgVWludDhBcnJheShuZXcgRmxvYXQ2NEFycmF5KFt0XSkuYnVmZmVyKSwwKS5tYXAoZnVuY3Rpb24odCl7cmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUodCl9KS5yZXZlcnNlKCkuam9pbihcIlwiKX1mdW5jdGlvbiBmKHQsZSl7dGhpcy5mcmFtZXM9W10sdGhpcy5kdXJhdGlvbj0xZTMvdCx0aGlzLnF1YWxpdHk9ZXx8Ljh9cmV0dXJuIGYucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0LGUpe2lmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBlJiZ0aGlzLmR1cmF0aW9uKXRocm93XCJ5b3UgY2FuJ3QgcGFzcyBhIGR1cmF0aW9uIGlmIHRoZSBmcHMgaXMgc2V0XCI7aWYoXCJ1bmRlZmluZWRcIj09dHlwZW9mIGUmJiF0aGlzLmR1cmF0aW9uKXRocm93XCJpZiB5b3UgZG9uJ3QgaGF2ZSB0aGUgZnBzIHNldCwgeW91IG5lZWQgdG8gaGF2ZSBkdXJhdGlvbnMgaGVyZS5cIjtpZih0LmNhbnZhcyYmKHQ9dC5jYW52YXMpLHQudG9EYXRhVVJMKXQ9dC5nZXRDb250ZXh0KFwiMmRcIikuZ2V0SW1hZ2VEYXRhKDAsMCx0LndpZHRoLHQuaGVpZ2h0KTtlbHNlIGlmKFwic3RyaW5nXCIhPXR5cGVvZiB0KXRocm93XCJmcmFtZSBtdXN0IGJlIGEgYSBIVE1MQ2FudmFzRWxlbWVudCwgYSBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQgb3IgYSBEYXRhVVJJIGZvcm1hdHRlZCBzdHJpbmdcIjtpZihcInN0cmluZ1wiPT10eXBlb2YgdCYmIS9eZGF0YTppbWFnZVxcL3dlYnA7YmFzZTY0LC9naS50ZXN0KHQpKXRocm93XCJJbnB1dCBtdXN0IGJlIGZvcm1hdHRlZCBwcm9wZXJseSBhcyBhIGJhc2U2NCBlbmNvZGVkIERhdGFVUkkgb2YgdHlwZSBpbWFnZS93ZWJwXCI7dGhpcy5mcmFtZXMucHVzaCh7aW1hZ2U6dCxkdXJhdGlvbjplfHx0aGlzLmR1cmF0aW9ufSl9LGYucHJvdG90eXBlLmVuY29kZUZyYW1lcz1mdW5jdGlvbih0KXtpZih0aGlzLmZyYW1lc1swXS5pbWFnZSBpbnN0YW5jZW9mIEltYWdlRGF0YSl7dmFyIGU9dGhpcy5mcmFtZXMsbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpLGk9bi5nZXRDb250ZXh0KFwiMmRcIik7bi53aWR0aD10aGlzLmZyYW1lc1swXS5pbWFnZS53aWR0aCxuLmhlaWdodD10aGlzLmZyYW1lc1swXS5pbWFnZS5oZWlnaHQ7dmFyIHI9ZnVuY3Rpb24obyl7dmFyIGE9ZVtvXTtpLnB1dEltYWdlRGF0YShhLmltYWdlLDAsMCksYS5pbWFnZT1uLnRvRGF0YVVSTChcImltYWdlL3dlYnBcIix0aGlzLnF1YWxpdHkpLG88ZS5sZW5ndGgtMT9zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7cihvKzEpfSwxKTp0KCl9LmJpbmQodGhpcyk7cigwKX1lbHNlIHQoKX0sZi5wcm90b3R5cGUuY29tcGlsZT1mdW5jdGlvbihlLG4pe3RoaXMuZW5jb2RlRnJhbWVzKGZ1bmN0aW9uKCl7dmFyIGk9bmV3IHQodGhpcy5mcmFtZXMubWFwKGZ1bmN0aW9uKHQpe3ZhciBlPWQodShhdG9iKHQuaW1hZ2Uuc2xpY2UoMjMpKSkpO3JldHVybiBlLmR1cmF0aW9uPXQuZHVyYXRpb24sZX0pLGUpO24oaSl9LmJpbmQodGhpcykpfSx7VmlkZW86Zixmcm9tSW1hZ2VBcnJheTpmdW5jdGlvbihlLG4saSl7cmV0dXJuIHQoZS5tYXAoZnVuY3Rpb24odCl7dmFyIGU9ZCh1KGF0b2IodC5zbGljZSgyMykpKSk7cmV0dXJuIGUuZHVyYXRpb249MWUzL24sZX0pLGkpfSx0b1dlYk06dH19KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3ZhciBlLG49bmV3IFVpbnQ4QXJyYXkodCk7Zm9yKGU9MDtlPHQ7ZSs9MSluW2VdPTA7cmV0dXJuIG59ZnVuY3Rpb24gZShlLG4saSxyKXt2YXIgbz1uK2ksYT10KChwYXJzZUludChvL3IpKzEpKnIpO3JldHVybiBhLnNldChlKSxhfWZ1bmN0aW9uIG4odCxlLG4pe3JldHVybiB0PXQudG9TdHJpbmcobnx8OCksXCIwMDAwMDAwMDAwMDBcIi5zdWJzdHIodC5sZW5ndGgrMTItZSkrdH1mdW5jdGlvbiBpKGUsbixpKXt2YXIgcixvO2ZvcihuPW58fHQoZS5sZW5ndGgpLGk9aXx8MCxyPTAsbz1lLmxlbmd0aDtyPG87cis9MSluW2ldPWUuY2hhckNvZGVBdChyKSxpKz0xO3JldHVybiBufWZ1bmN0aW9uIHIodCl7ZnVuY3Rpb24gZSh0KXtyZXR1cm4gb1t0Pj4xOCY2M10rb1t0Pj4xMiY2M10rb1t0Pj42JjYzXStvWzYzJnRdfXZhciBuLGkscixhPXQubGVuZ3RoJTMscz1cIlwiO2ZvcihuPTAscj10Lmxlbmd0aC1hO248cjtuKz0zKWk9KHRbbl08PDE2KSsodFtuKzFdPDw4KSt0W24rMl0scys9ZShpKTtzd2l0Y2gocy5sZW5ndGglNCl7Y2FzZSAxOnMrPVwiPVwiO2JyZWFrO2Nhc2UgMjpzKz1cIj09XCJ9cmV0dXJuIHN9dmFyIG89W1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiLFwiUVwiLFwiUlwiLFwiU1wiLFwiVFwiLFwiVVwiLFwiVlwiLFwiV1wiLFwiWFwiLFwiWVwiLFwiWlwiLFwiYVwiLFwiYlwiLFwiY1wiLFwiZFwiLFwiZVwiLFwiZlwiLFwiZ1wiLFwiaFwiLFwiaVwiLFwialwiLFwia1wiLFwibFwiLFwibVwiLFwiblwiLFwib1wiLFwicFwiLFwicVwiLFwiclwiLFwic1wiLFwidFwiLFwidVwiLFwidlwiLFwid1wiLFwieFwiLFwieVwiLFwielwiLFwiMFwiLFwiMVwiLFwiMlwiLFwiM1wiLFwiNFwiLFwiNVwiLFwiNlwiLFwiN1wiLFwiOFwiLFwiOVwiLFwiK1wiLFwiL1wiXTt3aW5kb3cudXRpbHM9e30sd2luZG93LnV0aWxzLmNsZWFuPXQsd2luZG93LnV0aWxzLnBhZD1uLHdpbmRvdy51dGlscy5leHRlbmQ9ZSx3aW5kb3cudXRpbHMuc3RyaW5nVG9VaW50OD1pLHdpbmRvdy51dGlscy51aW50OFRvQmFzZTY0PXJ9KCksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsaSl7dmFyIHI9bi5jbGVhbig1MTIpLG89MDtyZXR1cm4gZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciBuLGksYT10W2UuZmllbGRdfHxcIlwiO2ZvcihuPTAsaT1hLmxlbmd0aDtuPGk7bis9MSlyW29dPWEuY2hhckNvZGVBdChuKSxvKz0xO28rPWUubGVuZ3RoLW59KSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBpP2kocixvKTpyfXZhciBlLG49d2luZG93LnV0aWxzO2U9W3tmaWVsZDpcImZpbGVOYW1lXCIsbGVuZ3RoOjEwMH0se2ZpZWxkOlwiZmlsZU1vZGVcIixsZW5ndGg6OH0se2ZpZWxkOlwidWlkXCIsbGVuZ3RoOjh9LHtmaWVsZDpcImdpZFwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJmaWxlU2l6ZVwiLGxlbmd0aDoxMn0se2ZpZWxkOlwibXRpbWVcIixsZW5ndGg6MTJ9LHtmaWVsZDpcImNoZWNrc3VtXCIsbGVuZ3RoOjh9LHtmaWVsZDpcInR5cGVcIixsZW5ndGg6MX0se2ZpZWxkOlwibGlua05hbWVcIixsZW5ndGg6MTAwfSx7ZmllbGQ6XCJ1c3RhclwiLGxlbmd0aDo4fSx7ZmllbGQ6XCJvd25lclwiLGxlbmd0aDozMn0se2ZpZWxkOlwiZ3JvdXBcIixsZW5ndGg6MzJ9LHtmaWVsZDpcIm1ham9yTnVtYmVyXCIsbGVuZ3RoOjh9LHtmaWVsZDpcIm1pbm9yTnVtYmVyXCIsbGVuZ3RoOjh9LHtmaWVsZDpcImZpbGVuYW1lUHJlZml4XCIsbGVuZ3RoOjE1NX0se2ZpZWxkOlwicGFkZGluZ1wiLGxlbmd0aDoxMn1dLHdpbmRvdy5oZWFkZXI9e30sd2luZG93LmhlYWRlci5zdHJ1Y3R1cmU9ZSx3aW5kb3cuaGVhZGVyLmZvcm1hdD10fSgpLGZ1bmN0aW9uKCl7XCJ1c2Ugc3RyaWN0XCI7ZnVuY3Rpb24gdCh0KXt0aGlzLndyaXR0ZW49MCxlPSh0fHwyMCkqcix0aGlzLm91dD1pLmNsZWFuKGUpLHRoaXMuYmxvY2tzPVtdLHRoaXMubGVuZ3RoPTB9dmFyIGUsbj13aW5kb3cuaGVhZGVyLGk9d2luZG93LnV0aWxzLHI9NTEyO3QucHJvdG90eXBlLmFwcGVuZD1mdW5jdGlvbih0LGUsbyxhKXt2YXIgcyxoLGQsdSxjLGYsbDtpZihcInN0cmluZ1wiPT10eXBlb2YgZSllPWkuc3RyaW5nVG9VaW50OChlKTtlbHNlIGlmKGUuY29uc3RydWN0b3IhPT1VaW50OEFycmF5LnByb3RvdHlwZS5jb25zdHJ1Y3Rvcil0aHJvd1wiSW52YWxpZCBpbnB1dCB0eXBlLiBZb3UgZ2F2ZSBtZTogXCIrZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLm1hdGNoKC9mdW5jdGlvblxccyooWyRBLVphLXpfXVswLTlBLVphLXpfXSopXFxzKlxcKC8pWzFdO1wiZnVuY3Rpb25cIj09dHlwZW9mIG8mJihhPW8sbz17fSksbz1vfHx7fSxkPW8ubW9kZXx8NDA5NSZwYXJzZUludChcIjc3N1wiLDgpLHU9by5tdGltZXx8TWF0aC5mbG9vcigrbmV3IERhdGUvMWUzKSxjPW8udWlkfHwwLGY9by5naWR8fDAscz17ZmlsZU5hbWU6dCxmaWxlTW9kZTppLnBhZChkLDcpLHVpZDppLnBhZChjLDcpLGdpZDppLnBhZChmLDcpLGZpbGVTaXplOmkucGFkKGUubGVuZ3RoLDExKSxtdGltZTppLnBhZCh1LDExKSxjaGVja3N1bTpcIiAgICAgICAgXCIsdHlwZTpcIjBcIix1c3RhcjpcInVzdGFyICBcIixvd25lcjpvLm93bmVyfHxcIlwiLGdyb3VwOm8uZ3JvdXB8fFwiXCJ9LGg9MCxPYmplY3Qua2V5cyhzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBlLG4saT1zW3RdO2ZvcihlPTAsbj1pLmxlbmd0aDtlPG47ZSs9MSloKz1pLmNoYXJDb2RlQXQoZSl9KSxzLmNoZWNrc3VtPWkucGFkKGgsNikrXCJcXDAgXCIsbD1uLmZvcm1hdChzKTt2YXIgcD1NYXRoLmNlaWwobC5sZW5ndGgvcikqcixtPU1hdGguY2VpbChlLmxlbmd0aC9yKSpyO3RoaXMuYmxvY2tzLnB1c2goe2hlYWRlcjpsLGlucHV0OmUsaGVhZGVyTGVuZ3RoOnAsaW5wdXRMZW5ndGg6bX0pfSx0LnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKCl7dmFyIHQ9W10sZT1bXSxuPTAsaT1NYXRoLnBvdygyLDIwKSxvPVtdO3JldHVybiB0aGlzLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe24rdC5oZWFkZXJMZW5ndGgrdC5pbnB1dExlbmd0aD5pJiYoZS5wdXNoKHtibG9ja3M6byxsZW5ndGg6bn0pLG89W10sbj0wKSxvLnB1c2godCksbis9dC5oZWFkZXJMZW5ndGgrdC5pbnB1dExlbmd0aH0pLGUucHVzaCh7YmxvY2tzOm8sbGVuZ3RoOm59KSxlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIG49bmV3IFVpbnQ4QXJyYXkoZS5sZW5ndGgpLGk9MDtlLmJsb2Nrcy5mb3JFYWNoKGZ1bmN0aW9uKHQpe24uc2V0KHQuaGVhZGVyLGkpLGkrPXQuaGVhZGVyTGVuZ3RoLG4uc2V0KHQuaW5wdXQsaSksaSs9dC5pbnB1dExlbmd0aH0pLHQucHVzaChuKX0pLHQucHVzaChuZXcgVWludDhBcnJheSgyKnIpKSxuZXcgQmxvYih0LHt0eXBlOlwib2N0ZXQvc3RyZWFtXCJ9KX0sdC5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLndyaXR0ZW49MCx0aGlzLm91dD1pLmNsZWFuKGUpfSx3aW5kb3cuVGFyPXR9KCksZnVuY3Rpb24odCl7ZnVuY3Rpb24gZSh0LG4pe2lmKHt9Lmhhc093blByb3BlcnR5LmNhbGwoZS5jYWNoZSx0KSlyZXR1cm4gZS5jYWNoZVt0XTt2YXIgaT1lLnJlc29sdmUodCk7aWYoIWkpdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIHJlc29sdmUgbW9kdWxlIFwiK3QpO3ZhciByPXtpZDp0LHJlcXVpcmU6ZSxmaWxlbmFtZTp0LGV4cG9ydHM6e30sbG9hZGVkOiExLHBhcmVudDpuLGNoaWxkcmVuOltdfTtuJiZuLmNoaWxkcmVuLnB1c2gocik7dmFyIG89dC5zbGljZSgwLHQubGFzdEluZGV4T2YoXCIvXCIpKzEpO3JldHVybiBlLmNhY2hlW3RdPXIuZXhwb3J0cyxpLmNhbGwoci5leHBvcnRzLHIsci5leHBvcnRzLG8sdCksci5sb2FkZWQ9ITAsZS5jYWNoZVt0XT1yLmV4cG9ydHN9ZS5tb2R1bGVzPXt9LGUuY2FjaGU9e30sZS5yZXNvbHZlPWZ1bmN0aW9uKHQpe3JldHVybnt9Lmhhc093blByb3BlcnR5LmNhbGwoZS5tb2R1bGVzLHQpP2UubW9kdWxlc1t0XTp2b2lkIDB9LGUuZGVmaW5lPWZ1bmN0aW9uKHQsbil7ZS5tb2R1bGVzW3RdPW59O3ZhciBuPWZ1bmN0aW9uKGUpe3JldHVybiBlPVwiL1wiLHt0aXRsZTpcImJyb3dzZXJcIix2ZXJzaW9uOlwidjAuMTAuMjZcIixicm93c2VyOiEwLGVudjp7fSxhcmd2OltdLG5leHRUaWNrOnQuc2V0SW1tZWRpYXRlfHxmdW5jdGlvbih0KXtzZXRUaW1lb3V0KHQsMCl9LGN3ZDpmdW5jdGlvbigpe3JldHVybiBlfSxjaGRpcjpmdW5jdGlvbih0KXtlPXR9fX0oKTtlLmRlZmluZShcIi9naWYuY29mZmVlXCIsZnVuY3Rpb24odCxuLGkscil7ZnVuY3Rpb24gbyh0LGUpe3JldHVybnt9Lmhhc093blByb3BlcnR5LmNhbGwodCxlKX1mdW5jdGlvbiBhKHQsZSl7Zm9yKHZhciBuPTAsaT1lLmxlbmd0aDtuPGk7KytuKWlmKG4gaW4gZSYmZVtuXT09PXQpcmV0dXJuITA7cmV0dXJuITF9ZnVuY3Rpb24gcyh0LGUpe2Z1bmN0aW9uIG4oKXt0aGlzLmNvbnN0cnVjdG9yPXR9Zm9yKHZhciBpIGluIGUpbyhlLGkpJiYodFtpXT1lW2ldKTtyZXR1cm4gbi5wcm90b3R5cGU9ZS5wcm90b3R5cGUsdC5wcm90b3R5cGU9bmV3IG4sdC5fX3N1cGVyX189ZS5wcm90b3R5cGUsdH12YXIgaCxkLHUsYyxmO3U9ZShcImV2ZW50c1wiLHQpLkV2ZW50RW1pdHRlcixoPWUoXCIvYnJvd3Nlci5jb2ZmZWVcIix0KSxmPWZ1bmN0aW9uKHQpe2Z1bmN0aW9uIGUodCl7dmFyIGUsbjt0aGlzLnJ1bm5pbmc9ITEsdGhpcy5vcHRpb25zPXt9LHRoaXMuZnJhbWVzPVtdLHRoaXMuZnJlZVdvcmtlcnM9W10sdGhpcy5hY3RpdmVXb3JrZXJzPVtdLHRoaXMuc2V0T3B0aW9ucyh0KTtmb3IoZSBpbiBkKW49ZFtlXSxudWxsIT10aGlzLm9wdGlvbnNbZV0/dGhpcy5vcHRpb25zW2VdOnRoaXMub3B0aW9uc1tlXT1ufXJldHVybiBzKGUsdCksZD17d29ya2VyU2NyaXB0OlwiZ2lmLndvcmtlci5qc1wiLHdvcmtlcnM6MixyZXBlYXQ6MCxiYWNrZ3JvdW5kOlwiI2ZmZlwiLHF1YWxpdHk6MTAsd2lkdGg6bnVsbCxoZWlnaHQ6bnVsbCx0cmFuc3BhcmVudDpudWxsfSxjPXtkZWxheTo1MDAsY29weTohMX0sZS5wcm90b3R5cGUuc2V0T3B0aW9uPWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMub3B0aW9uc1t0XT1lLG51bGw9PXRoaXMuX2NhbnZhc3x8XCJ3aWR0aFwiIT09dCYmXCJoZWlnaHRcIiE9PXQ/dm9pZCAwOnRoaXMuX2NhbnZhc1t0XT1lfSxlLnByb3RvdHlwZS5zZXRPcHRpb25zPWZ1bmN0aW9uKHQpe3ZhciBlLG47cmV0dXJuIGZ1bmN0aW9uKGkpe2ZvcihlIGluIHQpbyh0LGUpJiYobj10W2VdLGkucHVzaCh0aGlzLnNldE9wdGlvbihlLG4pKSk7cmV0dXJuIGl9LmNhbGwodGhpcyxbXSl9LGUucHJvdG90eXBlLmFkZEZyYW1lPWZ1bmN0aW9uKHQsZSl7dmFyIG4saTtudWxsPT1lJiYoZT17fSksbj17fSxuLnRyYW5zcGFyZW50PXRoaXMub3B0aW9ucy50cmFuc3BhcmVudDtmb3IoaSBpbiBjKW5baV09ZVtpXXx8Y1tpXTtpZihudWxsIT10aGlzLm9wdGlvbnMud2lkdGh8fHRoaXMuc2V0T3B0aW9uKFwid2lkdGhcIix0LndpZHRoKSxudWxsIT10aGlzLm9wdGlvbnMuaGVpZ2h0fHx0aGlzLnNldE9wdGlvbihcImhlaWdodFwiLHQuaGVpZ2h0KSxcInVuZGVmaW5lZFwiIT10eXBlb2YgSW1hZ2VEYXRhJiZudWxsIT1JbWFnZURhdGEmJnQgaW5zdGFuY2VvZiBJbWFnZURhdGEpbi5kYXRhPXQuZGF0YTtlbHNlIGlmKFwidW5kZWZpbmVkXCIhPXR5cGVvZiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQmJm51bGwhPUNhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCYmdCBpbnN0YW5jZW9mIENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRHx8XCJ1bmRlZmluZWRcIiE9dHlwZW9mIFdlYkdMUmVuZGVyaW5nQ29udGV4dCYmbnVsbCE9V2ViR0xSZW5kZXJpbmdDb250ZXh0JiZ0IGluc3RhbmNlb2YgV2ViR0xSZW5kZXJpbmdDb250ZXh0KWUuY29weT9uLmRhdGE9dGhpcy5nZXRDb250ZXh0RGF0YSh0KTpuLmNvbnRleHQ9dDtlbHNle2lmKG51bGw9PXQuY2hpbGROb2Rlcyl0aHJvdyBuZXcgRXJyb3IoXCJJbnZhbGlkIGltYWdlXCIpO2UuY29weT9uLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEodCk6bi5pbWFnZT10fXJldHVybiB0aGlzLmZyYW1lcy5wdXNoKG4pfSxlLnByb3RvdHlwZS5yZW5kZXI9ZnVuY3Rpb24oKXt2YXIgdCxlO2lmKHRoaXMucnVubmluZyl0aHJvdyBuZXcgRXJyb3IoXCJBbHJlYWR5IHJ1bm5pbmdcIik7aWYobnVsbD09dGhpcy5vcHRpb25zLndpZHRofHxudWxsPT10aGlzLm9wdGlvbnMuaGVpZ2h0KXRocm93IG5ldyBFcnJvcihcIldpZHRoIGFuZCBoZWlnaHQgbXVzdCBiZSBzZXQgcHJpb3IgdG8gcmVuZGVyaW5nXCIpO3RoaXMucnVubmluZz0hMCx0aGlzLm5leHRGcmFtZT0wLHRoaXMuZmluaXNoZWRGcmFtZXM9MCx0aGlzLmltYWdlUGFydHM9ZnVuY3Rpb24oZSl7Zm9yKHZhciBuPWZ1bmN0aW9uKCl7dmFyIHQ7dD1bXTtmb3IodmFyIGU9MDswPD10aGlzLmZyYW1lcy5sZW5ndGg/ZTx0aGlzLmZyYW1lcy5sZW5ndGg6ZT50aGlzLmZyYW1lcy5sZW5ndGg7MDw9dGhpcy5mcmFtZXMubGVuZ3RoPysrZTotLWUpdC5wdXNoKGUpO3JldHVybiB0fS5hcHBseSh0aGlzLGFyZ3VtZW50cyksaT0wLHI9bi5sZW5ndGg7aTxyOysraSl0PW5baV0sZS5wdXNoKG51bGwpO3JldHVybiBlfS5jYWxsKHRoaXMsW10pLGU9dGhpcy5zcGF3bldvcmtlcnMoKTtmb3IodmFyIG49ZnVuY3Rpb24oKXt2YXIgdDt0PVtdO2Zvcih2YXIgbj0wOzA8PWU/bjxlOm4+ZTswPD1lPysrbjotLW4pdC5wdXNoKG4pO3JldHVybiB0fS5hcHBseSh0aGlzLGFyZ3VtZW50cyksaT0wLHI9bi5sZW5ndGg7aTxyOysraSl0PW5baV0sdGhpcy5yZW5kZXJOZXh0RnJhbWUoKTtyZXR1cm4gdGhpcy5lbWl0KFwic3RhcnRcIiksdGhpcy5lbWl0KFwicHJvZ3Jlc3NcIiwwKX0sZS5wcm90b3R5cGUuYWJvcnQ9ZnVuY3Rpb24oKXtmb3IodmFyIHQ7Oyl7aWYodD10aGlzLmFjdGl2ZVdvcmtlcnMuc2hpZnQoKSwhKG51bGwhPXQpKWJyZWFrO2NvbnNvbGUubG9nKFwia2lsbGluZyBhY3RpdmUgd29ya2VyXCIpLHQudGVybWluYXRlKCl9cmV0dXJuIHRoaXMucnVubmluZz0hMSx0aGlzLmVtaXQoXCJhYm9ydFwiKX0sZS5wcm90b3R5cGUuc3Bhd25Xb3JrZXJzPWZ1bmN0aW9uKCl7dmFyIHQ7cmV0dXJuIHQ9TWF0aC5taW4odGhpcy5vcHRpb25zLndvcmtlcnMsdGhpcy5mcmFtZXMubGVuZ3RoKSxmdW5jdGlvbigpe3ZhciBlO2U9W107Zm9yKHZhciBuPXRoaXMuZnJlZVdvcmtlcnMubGVuZ3RoO3RoaXMuZnJlZVdvcmtlcnMubGVuZ3RoPD10P248dDpuPnQ7dGhpcy5mcmVlV29ya2Vycy5sZW5ndGg8PXQ/KytuOi0tbillLnB1c2gobik7cmV0dXJuIGV9LmFwcGx5KHRoaXMsYXJndW1lbnRzKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXt2YXIgbjtyZXR1cm4gY29uc29sZS5sb2coXCJzcGF3bmluZyB3b3JrZXIgXCIrZSksbj1uZXcgV29ya2VyKHQub3B0aW9ucy53b3JrZXJTY3JpcHQpLG4ub25tZXNzYWdlPWZ1bmN0aW9uKHQpe3JldHVybiBmdW5jdGlvbihlKXtyZXR1cm4gdC5hY3RpdmVXb3JrZXJzLnNwbGljZSh0LmFjdGl2ZVdvcmtlcnMuaW5kZXhPZihuKSwxKSx0LmZyZWVXb3JrZXJzLnB1c2gobiksdC5mcmFtZUZpbmlzaGVkKGUuZGF0YSl9fSh0KSx0LmZyZWVXb3JrZXJzLnB1c2gobil9fSh0aGlzKSksdH0sZS5wcm90b3R5cGUuZnJhbWVGaW5pc2hlZD1mdW5jdGlvbih0KXtyZXR1cm4gY29uc29sZS5sb2coXCJmcmFtZSBcIit0LmluZGV4K1wiIGZpbmlzaGVkIC0gXCIrdGhpcy5hY3RpdmVXb3JrZXJzLmxlbmd0aCtcIiBhY3RpdmVcIiksdGhpcy5maW5pc2hlZEZyYW1lcysrLHRoaXMuZW1pdChcInByb2dyZXNzXCIsdGhpcy5maW5pc2hlZEZyYW1lcy90aGlzLmZyYW1lcy5sZW5ndGgpLHRoaXMuaW1hZ2VQYXJ0c1t0LmluZGV4XT10LGEobnVsbCx0aGlzLmltYWdlUGFydHMpP3RoaXMucmVuZGVyTmV4dEZyYW1lKCk6dGhpcy5maW5pc2hSZW5kZXJpbmcoKX0sZS5wcm90b3R5cGUuZmluaXNoUmVuZGVyaW5nPWZ1bmN0aW9uKCl7dmFyIHQsZSxuLGkscixvLGE7cj0wO2Zvcih2YXIgcz0wLGg9dGhpcy5pbWFnZVBhcnRzLmxlbmd0aDtzPGg7KytzKWU9dGhpcy5pbWFnZVBhcnRzW3NdLHIrPShlLmRhdGEubGVuZ3RoLTEpKmUucGFnZVNpemUrZS5jdXJzb3I7cis9ZS5wYWdlU2l6ZS1lLmN1cnNvcixjb25zb2xlLmxvZyhcInJlbmRlcmluZyBmaW5pc2hlZCAtIGZpbGVzaXplIFwiK01hdGgucm91bmQoci8xZTMpK1wia2JcIiksdD1uZXcgVWludDhBcnJheShyKSxvPTA7Zm9yKHZhciBkPTAsdT10aGlzLmltYWdlUGFydHMubGVuZ3RoO2Q8dTsrK2Qpe2U9dGhpcy5pbWFnZVBhcnRzW2RdO2Zvcih2YXIgYz0wLGY9ZS5kYXRhLmxlbmd0aDtjPGY7KytjKWE9ZS5kYXRhW2NdLG49Yyx0LnNldChhLG8pLG8rPW49PT1lLmRhdGEubGVuZ3RoLTE/ZS5jdXJzb3I6ZS5wYWdlU2l6ZX1yZXR1cm4gaT1uZXcgQmxvYihbdF0se3R5cGU6XCJpbWFnZS9naWZcIn0pLHRoaXMuZW1pdChcImZpbmlzaGVkXCIsaSx0KX0sZS5wcm90b3R5cGUucmVuZGVyTmV4dEZyYW1lPWZ1bmN0aW9uKCl7dmFyIHQsZSxuO2lmKDA9PT10aGlzLmZyZWVXb3JrZXJzLmxlbmd0aCl0aHJvdyBuZXcgRXJyb3IoXCJObyBmcmVlIHdvcmtlcnNcIik7cmV0dXJuIHRoaXMubmV4dEZyYW1lPj10aGlzLmZyYW1lcy5sZW5ndGg/dm9pZCAwOih0PXRoaXMuZnJhbWVzW3RoaXMubmV4dEZyYW1lKytdLG49dGhpcy5mcmVlV29ya2Vycy5zaGlmdCgpLGU9dGhpcy5nZXRUYXNrKHQpLGNvbnNvbGUubG9nKFwic3RhcnRpbmcgZnJhbWUgXCIrKGUuaW5kZXgrMSkrXCIgb2YgXCIrdGhpcy5mcmFtZXMubGVuZ3RoKSx0aGlzLmFjdGl2ZVdvcmtlcnMucHVzaChuKSxuLnBvc3RNZXNzYWdlKGUpKX0sZS5wcm90b3R5cGUuZ2V0Q29udGV4dERhdGE9ZnVuY3Rpb24odCl7cmV0dXJuIHQuZ2V0SW1hZ2VEYXRhKDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCkuZGF0YX0sZS5wcm90b3R5cGUuZ2V0SW1hZ2VEYXRhPWZ1bmN0aW9uKHQpe3ZhciBlO3JldHVybiBudWxsIT10aGlzLl9jYW52YXN8fCh0aGlzLl9jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLl9jYW52YXMud2lkdGg9dGhpcy5vcHRpb25zLndpZHRoLHRoaXMuX2NhbnZhcy5oZWlnaHQ9dGhpcy5vcHRpb25zLmhlaWdodCksZT10aGlzLl9jYW52YXMuZ2V0Q29udGV4dChcIjJkXCIpLGUuc2V0RmlsbD10aGlzLm9wdGlvbnMuYmFja2dyb3VuZCxlLmZpbGxSZWN0KDAsMCx0aGlzLm9wdGlvbnMud2lkdGgsdGhpcy5vcHRpb25zLmhlaWdodCksZS5kcmF3SW1hZ2UodCwwLDApLHRoaXMuZ2V0Q29udGV4dERhdGEoZSl9LGUucHJvdG90eXBlLmdldFRhc2s9ZnVuY3Rpb24odCl7dmFyIGUsbjtpZihlPXRoaXMuZnJhbWVzLmluZGV4T2YodCksbj17aW5kZXg6ZSxsYXN0OmU9PT10aGlzLmZyYW1lcy5sZW5ndGgtMSxkZWxheTp0LmRlbGF5LHRyYW5zcGFyZW50OnQudHJhbnNwYXJlbnQsd2lkdGg6dGhpcy5vcHRpb25zLndpZHRoLGhlaWdodDp0aGlzLm9wdGlvbnMuaGVpZ2h0LHF1YWxpdHk6dGhpcy5vcHRpb25zLnF1YWxpdHkscmVwZWF0OnRoaXMub3B0aW9ucy5yZXBlYXQsY2FuVHJhbnNmZXI6XCJjaHJvbWVcIj09PWgubmFtZX0sbnVsbCE9dC5kYXRhKW4uZGF0YT10LmRhdGE7ZWxzZSBpZihudWxsIT10LmNvbnRleHQpbi5kYXRhPXRoaXMuZ2V0Q29udGV4dERhdGEodC5jb250ZXh0KTtlbHNle2lmKG51bGw9PXQuaW1hZ2UpdGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBmcmFtZVwiKTtuLmRhdGE9dGhpcy5nZXRJbWFnZURhdGEodC5pbWFnZSl9cmV0dXJuIG59LGV9KHUpLHQuZXhwb3J0cz1mfSksZS5kZWZpbmUoXCIvYnJvd3Nlci5jb2ZmZWVcIixmdW5jdGlvbih0LGUsbixpKXt2YXIgcixvLGEscyxoO3M9bmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLGE9bmF2aWdhdG9yLnBsYXRmb3JtLnRvTG93ZXJDYXNlKCksaD1zLm1hdGNoKC8ob3BlcmF8aWV8ZmlyZWZveHxjaHJvbWV8dmVyc2lvbilbXFxzXFwvOl0oW1xcd1xcZFxcLl0rKT8uKj8oc2FmYXJpfHZlcnNpb25bXFxzXFwvOl0oW1xcd1xcZFxcLl0rKXwkKS8pfHxbbnVsbCxcInVua25vd25cIiwwXSxvPVwiaWVcIj09PWhbMV0mJmRvY3VtZW50LmRvY3VtZW50TW9kZSxyPXtuYW1lOlwidmVyc2lvblwiPT09aFsxXT9oWzNdOmhbMV0sdmVyc2lvbjpvfHxwYXJzZUZsb2F0KFwib3BlcmFcIj09PWhbMV0mJmhbNF0/aFs0XTpoWzJdKSxwbGF0Zm9ybTp7bmFtZTpzLm1hdGNoKC9pcCg/OmFkfG9kfGhvbmUpLyk/XCJpb3NcIjoocy5tYXRjaCgvKD86d2Vib3N8YW5kcm9pZCkvKXx8YS5tYXRjaCgvbWFjfHdpbnxsaW51eC8pfHxbXCJvdGhlclwiXSlbMF19fSxyW3IubmFtZV09ITAscltyLm5hbWUrcGFyc2VJbnQoci52ZXJzaW9uLDEwKV09ITAsci5wbGF0Zm9ybVtyLnBsYXRmb3JtLm5hbWVdPSEwLHQuZXhwb3J0cz1yfSksZS5kZWZpbmUoXCJldmVudHNcIixmdW5jdGlvbih0LGUsaSxyKXtuLkV2ZW50RW1pdHRlcnx8KG4uRXZlbnRFbWl0dGVyPWZ1bmN0aW9uKCl7fSk7dmFyIG89ZS5FdmVudEVtaXR0ZXI9bi5FdmVudEVtaXR0ZXIsYT1cImZ1bmN0aW9uXCI9PXR5cGVvZiBBcnJheS5pc0FycmF5P0FycmF5LmlzQXJyYXk6ZnVuY3Rpb24odCl7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHQpfSxzPTEwO28ucHJvdG90eXBlLnNldE1heExpc3RlbmVycz1mdW5jdGlvbih0KXt0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pLHRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM9dH0sby5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0KXtpZihcImVycm9yXCI9PT10JiYoIXRoaXMuX2V2ZW50c3x8IXRoaXMuX2V2ZW50cy5lcnJvcnx8YSh0aGlzLl9ldmVudHMuZXJyb3IpJiYhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpdGhyb3cgYXJndW1lbnRzWzFdaW5zdGFuY2VvZiBFcnJvcj9hcmd1bWVudHNbMV06bmV3IEVycm9yKFwiVW5jYXVnaHQsIHVuc3BlY2lmaWVkICdlcnJvcicgZXZlbnQuXCIpO2lmKCF0aGlzLl9ldmVudHMpcmV0dXJuITE7dmFyIGU9dGhpcy5fZXZlbnRzW3RdO2lmKCFlKXJldHVybiExO2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpe2lmKGEoZSkpe2Zvcih2YXIgbj1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSksaT1lLnNsaWNlKCkscj0wLG89aS5sZW5ndGg7cjxvO3IrKylpW3JdLmFwcGx5KHRoaXMsbik7cmV0dXJuITB9cmV0dXJuITF9c3dpdGNoKGFyZ3VtZW50cy5sZW5ndGgpe2Nhc2UgMTplLmNhbGwodGhpcyk7YnJlYWs7Y2FzZSAyOmUuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSk7YnJlYWs7Y2FzZSAzOmUuY2FsbCh0aGlzLGFyZ3VtZW50c1sxXSxhcmd1bWVudHNbMl0pO2JyZWFrO2RlZmF1bHQ6dmFyIG49QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpO2UuYXBwbHkodGhpcyxuKX1yZXR1cm4hMH0sby5wcm90b3R5cGUuYWRkTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcImFkZExpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uXCIpO2lmKHRoaXMuX2V2ZW50c3x8KHRoaXMuX2V2ZW50cz17fSksdGhpcy5lbWl0KFwibmV3TGlzdGVuZXJcIix0LGUpLHRoaXMuX2V2ZW50c1t0XSlpZihhKHRoaXMuX2V2ZW50c1t0XSkpe2lmKCF0aGlzLl9ldmVudHNbdF0ud2FybmVkKXt2YXIgbjtuPXZvaWQgMCE9PXRoaXMuX2V2ZW50cy5tYXhMaXN0ZW5lcnM/dGhpcy5fZXZlbnRzLm1heExpc3RlbmVyczpzLG4mJm4+MCYmdGhpcy5fZXZlbnRzW3RdLmxlbmd0aD5uJiYodGhpcy5fZXZlbnRzW3RdLndhcm5lZD0hMCxjb25zb2xlLmVycm9yKFwiKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiBVc2UgZW1pdHRlci5zZXRNYXhMaXN0ZW5lcnMoKSB0byBpbmNyZWFzZSBsaW1pdC5cIix0aGlzLl9ldmVudHNbdF0ubGVuZ3RoKSxjb25zb2xlLnRyYWNlKCkpfXRoaXMuX2V2ZW50c1t0XS5wdXNoKGUpfWVsc2UgdGhpcy5fZXZlbnRzW3RdPVt0aGlzLl9ldmVudHNbdF0sZV07ZWxzZSB0aGlzLl9ldmVudHNbdF09ZTtyZXR1cm4gdGhpc30sby5wcm90b3R5cGUub249by5wcm90b3R5cGUuYWRkTGlzdGVuZXIsby5wcm90b3R5cGUub25jZT1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXM7cmV0dXJuIG4ub24odCxmdW5jdGlvbiBpKCl7bi5yZW1vdmVMaXN0ZW5lcih0LGkpLGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfSksdGhpc30sby5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI9ZnVuY3Rpb24odCxlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IG5ldyBFcnJvcihcInJlbW92ZUxpc3RlbmVyIG9ubHkgdGFrZXMgaW5zdGFuY2VzIG9mIEZ1bmN0aW9uXCIpO2lmKCF0aGlzLl9ldmVudHN8fCF0aGlzLl9ldmVudHNbdF0pcmV0dXJuIHRoaXM7dmFyIG49dGhpcy5fZXZlbnRzW3RdO2lmKGEobikpe3ZhciBpPW4uaW5kZXhPZihlKTtpZihpPDApcmV0dXJuIHRoaXM7bi5zcGxpY2UoaSwxKSwwPT1uLmxlbmd0aCYmZGVsZXRlIHRoaXMuX2V2ZW50c1t0XX1lbHNlIHRoaXMuX2V2ZW50c1t0XT09PWUmJmRlbGV0ZSB0aGlzLl9ldmVudHNbdF07cmV0dXJuIHRoaXN9LG8ucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycz1mdW5jdGlvbih0KXtyZXR1cm4gdCYmdGhpcy5fZXZlbnRzJiZ0aGlzLl9ldmVudHNbdF0mJih0aGlzLl9ldmVudHNbdF09bnVsbCksdGhpc30sby5wcm90b3R5cGUubGlzdGVuZXJzPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLl9ldmVudHN8fCh0aGlzLl9ldmVudHM9e30pLHRoaXMuX2V2ZW50c1t0XXx8KHRoaXMuX2V2ZW50c1t0XT1bXSksYSh0aGlzLl9ldmVudHNbdF0pfHwodGhpcy5fZXZlbnRzW3RdPVt0aGlzLl9ldmVudHNbdF1dKSx0aGlzLl9ldmVudHNbdF19fSksdC5HSUY9ZShcIi9naWYuY29mZmVlXCIpfS5jYWxsKHRoaXMsdGhpcyksZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQpe3JldHVybiB0JiZ0Lk9iamVjdD09PU9iamVjdD90Om51bGx9ZnVuY3Rpb24gZSh0KXtyZXR1cm4gU3RyaW5nKFwiMDAwMDAwMFwiK3QpLnNsaWNlKC03KX1mdW5jdGlvbiBuKCl7ZnVuY3Rpb24gdCgpe3JldHVybiBNYXRoLmZsb29yKDY1NTM2KigxK01hdGgucmFuZG9tKCkpKS50b1N0cmluZygxNikuc3Vic3RyaW5nKDEpfXJldHVybiB0KCkrdCgpK1wiLVwiK3QoKStcIi1cIit0KCkrXCItXCIrdCgpK1wiLVwiK3QoKSt0KCkrdCgpfWZ1bmN0aW9uIGkodCl7dmFyIGU9e307dGhpcy5zZXR0aW5ncz10LHRoaXMub249ZnVuY3Rpb24odCxuKXtlW3RdPW59LHRoaXMuZW1pdD1mdW5jdGlvbih0KXt2YXIgbj1lW3RdO24mJm4uYXBwbHkobnVsbCxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfSx0aGlzLmZpbGVuYW1lPXQubmFtZXx8bigpLHRoaXMuZXh0ZW5zaW9uPVwiXCIsdGhpcy5taW1lVHlwZT1cIlwifWZ1bmN0aW9uIHIodCl7aS5jYWxsKHRoaXMsdCksdGhpcy5leHRlbnNpb249XCIudGFyXCIsdGhpcy5taW1lVHlwZT1cImFwcGxpY2F0aW9uL3gtdGFyXCIsdGhpcy5maWxlRXh0ZW5zaW9uPVwiXCIsdGhpcy50YXBlPW51bGwsdGhpcy5jb3VudD0wfWZ1bmN0aW9uIG8odCl7ci5jYWxsKHRoaXMsdCksdGhpcy50eXBlPVwiaW1hZ2UvcG5nXCIsdGhpcy5maWxlRXh0ZW5zaW9uPVwiLnBuZ1wifWZ1bmN0aW9uIGEodCl7ci5jYWxsKHRoaXMsdCksdGhpcy50eXBlPVwiaW1hZ2UvanBlZ1wiLHRoaXMuZmlsZUV4dGVuc2lvbj1cIi5qcGdcIix0aGlzLnF1YWxpdHk9dC5xdWFsaXR5LzEwMHx8Ljh9ZnVuY3Rpb24gcyh0KXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiY2FudmFzXCIpO1wiaW1hZ2Uvd2VicFwiIT09ZS50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIpLnN1YnN0cig1LDEwKSYmY29uc29sZS5sb2coXCJXZWJQIG5vdCBzdXBwb3J0ZWQgLSB0cnkgYW5vdGhlciBleHBvcnQgZm9ybWF0XCIpLGkuY2FsbCh0aGlzLHQpLHRoaXMucXVhbGl0eT10LnF1YWxpdHkvMTAwfHwuOCx0aGlzLmV4dGVuc2lvbj1cIi53ZWJtXCIsdGhpcy5taW1lVHlwZT1cInZpZGVvL3dlYm1cIix0aGlzLmJhc2VGaWxlbmFtZT10aGlzLmZpbGVuYW1lLHRoaXMuZnJhbWVzPVtdLHRoaXMucGFydD0xfWZ1bmN0aW9uIGgodCl7aS5jYWxsKHRoaXMsdCksdC5xdWFsaXR5PXQucXVhbGl0eS8xMDB8fC44LHRoaXMuZW5jb2Rlcj1uZXcgRkZNcGVnU2VydmVyLlZpZGVvKHQpLHRoaXMuZW5jb2Rlci5vbihcInByb2Nlc3NcIixmdW5jdGlvbigpe3RoaXMuZW1pdChcInByb2Nlc3NcIil9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcImZpbmlzaGVkXCIsZnVuY3Rpb24odCxlKXt2YXIgbj10aGlzLmNhbGxiYWNrO24mJih0aGlzLmNhbGxiYWNrPXZvaWQgMCxuKHQsZSkpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJwcm9ncmVzc1wiLGZ1bmN0aW9uKHQpe3RoaXMuc2V0dGluZ3Mub25Qcm9ncmVzcyYmdGhpcy5zZXR0aW5ncy5vblByb2dyZXNzKHQpfS5iaW5kKHRoaXMpKSx0aGlzLmVuY29kZXIub24oXCJlcnJvclwiLGZ1bmN0aW9uKHQpe2FsZXJ0KEpTT04uc3RyaW5naWZ5KHQsbnVsbCwyKSl9LmJpbmQodGhpcykpfWZ1bmN0aW9uIGQodCl7aS5jYWxsKHRoaXMsdCksdGhpcy5mcmFtZXJhdGU9dGhpcy5zZXR0aW5ncy5mcmFtZXJhdGUsdGhpcy50eXBlPVwidmlkZW8vd2VibVwiLHRoaXMuZXh0ZW5zaW9uPVwiLndlYm1cIix0aGlzLnN0cmVhbT1udWxsLHRoaXMubWVkaWFSZWNvcmRlcj1udWxsLHRoaXMuY2h1bmtzPVtdfWZ1bmN0aW9uIHUodCl7aS5jYWxsKHRoaXMsdCksdC5xdWFsaXR5PTMxLSgzMCp0LnF1YWxpdHkvMTAwfHwxMCksdC53b3JrZXJzPXQud29ya2Vyc3x8NCx0aGlzLmV4dGVuc2lvbj1cIi5naWZcIix0aGlzLm1pbWVUeXBlPVwiaW1hZ2UvZ2lmXCIsdGhpcy5jYW52YXM9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSx0aGlzLmN0eD10aGlzLmNhbnZhcy5nZXRDb250ZXh0KFwiMmRcIiksdGhpcy5zaXplU2V0PSExLHRoaXMuZW5jb2Rlcj1uZXcgR0lGKHt3b3JrZXJzOnQud29ya2VycyxxdWFsaXR5OnQucXVhbGl0eSx3b3JrZXJTY3JpcHQ6dC53b3JrZXJzUGF0aCtcImdpZi53b3JrZXIuanNcIn0pLHRoaXMuZW5jb2Rlci5vbihcInByb2dyZXNzXCIsZnVuY3Rpb24odCl7dGhpcy5zZXR0aW5ncy5vblByb2dyZXNzJiZ0aGlzLnNldHRpbmdzLm9uUHJvZ3Jlc3ModCl9LmJpbmQodGhpcykpLHRoaXMuZW5jb2Rlci5vbihcImZpbmlzaGVkXCIsZnVuY3Rpb24odCl7dmFyIGU9dGhpcy5jYWxsYmFjaztlJiYodGhpcy5jYWxsYmFjaz12b2lkIDAsZSh0KSl9LmJpbmQodGhpcykpfWZ1bmN0aW9uIGModCl7ZnVuY3Rpb24gZSgpe2Z1bmN0aW9uIHQoKXtyZXR1cm4gdGhpcy5faG9va2VkfHwodGhpcy5faG9va2VkPSEwLHRoaXMuX2hvb2tlZFRpbWU9dGhpcy5jdXJyZW50VGltZXx8MCx0aGlzLnBhdXNlKCksbnQucHVzaCh0aGlzKSksdGhpcy5faG9va2VkVGltZStTLnN0YXJ0VGltZX1iKFwiQ2FwdHVyZXIgc3RhcnRcIiksQT13aW5kb3cuRGF0ZS5ub3coKSxMPUErUy5zdGFydFRpbWUsST13aW5kb3cucGVyZm9ybWFuY2Uubm93KCksRT1JK1Muc3RhcnRUaW1lLHdpbmRvdy5EYXRlLnByb3RvdHlwZS5nZXRUaW1lPWZ1bmN0aW9uKCl7cmV0dXJuIEx9LHdpbmRvdy5EYXRlLm5vdz1mdW5jdGlvbigpe3JldHVybiBMfSx3aW5kb3cuc2V0VGltZW91dD1mdW5jdGlvbih0LGUpe3ZhciBuPXtjYWxsYmFjazp0LHRpbWU6ZSx0cmlnZ2VyVGltZTpMK2V9O3JldHVybiBCLnB1c2gobiksYihcIlRpbWVvdXQgc2V0IHRvIFwiK24udGltZSksbn0sd2luZG93LmNsZWFyVGltZW91dD1mdW5jdGlvbih0KXtmb3IodmFyIGU9MDtlPEIubGVuZ3RoO2UrKylCW2VdIT10fHwoQi5zcGxpY2UoZSwxKSxiKFwiVGltZW91dCBjbGVhcmVkXCIpKX0sd2luZG93LnNldEludGVydmFsPWZ1bmN0aW9uKHQsZSl7dmFyIG49e2NhbGxiYWNrOnQsdGltZTplLHRyaWdnZXJUaW1lOkwrZX07cmV0dXJuIGoucHVzaChuKSxiKFwiSW50ZXJ2YWwgc2V0IHRvIFwiK24udGltZSksbn0sd2luZG93LmNsZWFySW50ZXJ2YWw9ZnVuY3Rpb24odCl7cmV0dXJuIGIoXCJjbGVhciBJbnRlcnZhbFwiKSxudWxsfSx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPWZ1bmN0aW9uKHQpe1UucHVzaCh0KX0sd2luZG93LnBlcmZvcm1hbmNlLm5vdz1mdW5jdGlvbigpe3JldHVybiBFfTt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KEhUTUxWaWRlb0VsZW1lbnQucHJvdG90eXBlLFwiY3VycmVudFRpbWVcIix7Z2V0OnR9KSxPYmplY3QuZGVmaW5lUHJvcGVydHkoSFRNTEF1ZGlvRWxlbWVudC5wcm90b3R5cGUsXCJjdXJyZW50VGltZVwiLHtnZXQ6dH0pfWNhdGNoKHQpe2IodCl9fWZ1bmN0aW9uIG4oKXtlKCksRC5zdGFydCgpLE09ITB9ZnVuY3Rpb24gaSgpe009ITEsRC5zdG9wKCksZigpfWZ1bmN0aW9uIHIodCxlKXtaKHQsMCxlKX1mdW5jdGlvbiBjKCl7cih2KX1mdW5jdGlvbiBmKCl7YihcIkNhcHR1cmVyIHN0b3BcIiksd2luZG93LnNldFRpbWVvdXQ9Wix3aW5kb3cuc2V0SW50ZXJ2YWw9Six3aW5kb3cuY2xlYXJJbnRlcnZhbD1ZLHdpbmRvdy5jbGVhclRpbWVvdXQ9JCx3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lPVEsd2luZG93LkRhdGUucHJvdG90eXBlLmdldFRpbWU9ZXQsd2luZG93LkRhdGUubm93PVgsd2luZG93LnBlcmZvcm1hbmNlLm5vdz10dH1mdW5jdGlvbiBsKCl7dmFyIHQ9Ui9TLmZyYW1lcmF0ZTsoUy5mcmFtZUxpbWl0JiZSPj1TLmZyYW1lTGltaXR8fFMudGltZUxpbWl0JiZ0Pj1TLnRpbWVMaW1pdCkmJihpKCkseSgpKTt2YXIgZT1uZXcgRGF0ZShudWxsKTtlLnNldFNlY29uZHModCksUy5tb3Rpb25CbHVyRnJhbWVzPjI/UC50ZXh0Q29udGVudD1cIkNDYXB0dXJlIFwiK1MuZm9ybWF0K1wiIHwgXCIrUitcIiBmcmFtZXMgKFwiK08rXCIgaW50ZXIpIHwgXCIrZS50b0lTT1N0cmluZygpLnN1YnN0cigxMSw4KTpQLnRleHRDb250ZW50PVwiQ0NhcHR1cmUgXCIrUy5mb3JtYXQrXCIgfCBcIitSK1wiIGZyYW1lcyB8IFwiK2UudG9JU09TdHJpbmcoKS5zdWJzdHIoMTEsOCl9ZnVuY3Rpb24gcCh0KXtOLndpZHRoPT09dC53aWR0aCYmTi5oZWlnaHQ9PT10LmhlaWdodHx8KE4ud2lkdGg9dC53aWR0aCxOLmhlaWdodD10LmhlaWdodCxxPW5ldyBVaW50MTZBcnJheShOLmhlaWdodCpOLndpZHRoKjQpLFYuZmlsbFN0eWxlPVwiIzBcIixWLmZpbGxSZWN0KDAsMCxOLndpZHRoLE4uaGVpZ2h0KSl9ZnVuY3Rpb24gbSh0KXtWLmRyYXdJbWFnZSh0LDAsMCksej1WLmdldEltYWdlRGF0YSgwLDAsTi53aWR0aCxOLmhlaWdodCk7Zm9yKHZhciBlPTA7ZTxxLmxlbmd0aDtlKz00KXFbZV0rPXouZGF0YVtlXSxxW2UrMV0rPXouZGF0YVtlKzFdLHFbZSsyXSs9ei5kYXRhW2UrMl07TysrfWZ1bmN0aW9uIGcoKXtmb3IodmFyIHQ9ei5kYXRhLGU9MDtlPHEubGVuZ3RoO2UrPTQpdFtlXT0yKnFbZV0vUy5tb3Rpb25CbHVyRnJhbWVzLHRbZSsxXT0yKnFbZSsxXS9TLm1vdGlvbkJsdXJGcmFtZXMsdFtlKzJdPTIqcVtlKzJdL1MubW90aW9uQmx1ckZyYW1lcztWLnB1dEltYWdlRGF0YSh6LDAsMCksRC5hZGQoTiksUisrLE89MCxiKFwiRnVsbCBNQiBGcmFtZSEgXCIrUitcIiBcIitMKTtmb3IodmFyIGU9MDtlPHEubGVuZ3RoO2UrPTQpcVtlXT0wLHFbZSsxXT0wLHFbZSsyXT0wO2djKCl9ZnVuY3Rpb24gdyh0KXtNJiYoUy5tb3Rpb25CbHVyRnJhbWVzPjI/KHAodCksbSh0KSxPPj0uNSpTLm1vdGlvbkJsdXJGcmFtZXM/ZygpOmMoKSk6KEQuYWRkKHQpLFIrKyxiKFwiRnVsbCBGcmFtZSEgXCIrUikpKX1mdW5jdGlvbiB2KCl7dmFyIHQ9MWUzL1MuZnJhbWVyYXRlLGU9KFIrTy9TLm1vdGlvbkJsdXJGcmFtZXMpKnQ7TD1BK2UsRT1JK2UsbnQuZm9yRWFjaChmdW5jdGlvbih0KXt0Ll9ob29rZWRUaW1lPWUvMWUzfSksbCgpLGIoXCJGcmFtZTogXCIrUitcIiBcIitPKTtmb3IodmFyIG49MDtuPEIubGVuZ3RoO24rKylMPj1CW25dLnRyaWdnZXJUaW1lJiYocihCW25dLmNhbGxiYWNrKSxCLnNwbGljZShuLDEpKTtmb3IodmFyIG49MDtuPGoubGVuZ3RoO24rKylMPj1qW25dLnRyaWdnZXJUaW1lJiYocihqW25dLmNhbGxiYWNrKSxqW25dLnRyaWdnZXJUaW1lKz1qW25dLnRpbWUpO1UuZm9yRWFjaChmdW5jdGlvbih0KXtyKHQsTC1rKX0pLFU9W119ZnVuY3Rpb24geSh0KXt0fHwodD1mdW5jdGlvbih0KXtyZXR1cm4gZG93bmxvYWQodCxELmZpbGVuYW1lK0QuZXh0ZW5zaW9uLEQubWltZVR5cGUpLCExfSksRC5zYXZlKHQpfWZ1bmN0aW9uIGIodCl7XyYmY29uc29sZS5sb2codCl9ZnVuY3Rpb24geCh0LGUpe1dbdF09ZX1mdW5jdGlvbiBUKHQpe3ZhciBlPVdbdF07ZSYmZS5hcHBseShudWxsLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywxKSl9ZnVuY3Rpb24gQyh0KXtUKFwicHJvZ3Jlc3NcIix0KX12YXIgXyxGLEwsQSxFLEksYyxELFM9dHx8e30sQj0obmV3IERhdGUsW10pLGo9W10sUj0wLE89MCxVPVtdLE09ITEsVz17fTtTLmZyYW1lcmF0ZT1TLmZyYW1lcmF0ZXx8NjAsUy5tb3Rpb25CbHVyRnJhbWVzPTIqKFMubW90aW9uQmx1ckZyYW1lc3x8MSksXz1TLnZlcmJvc2V8fCExLEY9Uy5kaXNwbGF5fHwhMSxTLnN0ZXA9MWUzL1MuZnJhbWVyYXRlLFMudGltZUxpbWl0PVMudGltZUxpbWl0fHwwLFMuZnJhbWVMaW1pdD1TLmZyYW1lTGltaXR8fDAsUy5zdGFydFRpbWU9Uy5zdGFydFRpbWV8fDA7dmFyIFA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtQLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIixQLnN0eWxlLmxlZnQ9UC5zdHlsZS50b3A9MCxQLnN0eWxlLmJhY2tncm91bmRDb2xvcj1cImJsYWNrXCIsUC5zdHlsZS5mb250RmFtaWx5PVwibW9ub3NwYWNlXCIsUC5zdHlsZS5mb250U2l6ZT1cIjExcHhcIixQLnN0eWxlLnBhZGRpbmc9XCI1cHhcIixQLnN0eWxlLmNvbG9yPVwicmVkXCIsUC5zdHlsZS56SW5kZXg9MWU1LFMuZGlzcGxheSYmZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChQKTt2YXIgcSx6LE49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImNhbnZhc1wiKSxWPU4uZ2V0Q29udGV4dChcIjJkXCIpO2IoXCJTdGVwIGlzIHNldCB0byBcIitTLnN0ZXArXCJtc1wiKTt2YXIgSD17Z2lmOnUsd2VibTpzLGZmbXBlZ3NlcnZlcjpoLHBuZzpvLGpwZzphLFwid2VibS1tZWRpYXJlY29yZGVyXCI6ZH0sRz1IW1MuZm9ybWF0XTtpZighRyl0aHJvd1wiRXJyb3I6IEluY29ycmVjdCBvciBtaXNzaW5nIGZvcm1hdDogVmFsaWQgZm9ybWF0cyBhcmUgXCIrT2JqZWN0LmtleXMoSCkuam9pbihcIiwgXCIpO2lmKEQ9bmV3IEcoUyksRC5zdGVwPWMsRC5vbihcInByb2Nlc3NcIix2KSxELm9uKFwicHJvZ3Jlc3NcIixDKSxcInBlcmZvcm1hbmNlXCJpbiB3aW5kb3c9PTAmJih3aW5kb3cucGVyZm9ybWFuY2U9e30pLERhdGUubm93PURhdGUubm93fHxmdW5jdGlvbigpe3JldHVybihuZXcgRGF0ZSkuZ2V0VGltZSgpfSxcIm5vd1wiaW4gd2luZG93LnBlcmZvcm1hbmNlPT0wKXt2YXIgSz1EYXRlLm5vdygpO3BlcmZvcm1hbmNlLnRpbWluZyYmcGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCYmKEs9cGVyZm9ybWFuY2UudGltaW5nLm5hdmlnYXRpb25TdGFydCksd2luZG93LnBlcmZvcm1hbmNlLm5vdz1mdW5jdGlvbigpe3JldHVybiBEYXRlLm5vdygpLUt9fXZhciBaPXdpbmRvdy5zZXRUaW1lb3V0LEo9d2luZG93LnNldEludGVydmFsLFk9d2luZG93LmNsZWFySW50ZXJ2YWwsJD13aW5kb3cuY2xlYXJUaW1lb3V0LFE9d2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSxYPXdpbmRvdy5EYXRlLm5vdyx0dD13aW5kb3cucGVyZm9ybWFuY2Uubm93LGV0PXdpbmRvdy5EYXRlLnByb3RvdHlwZS5nZXRUaW1lLG50PVtdO3JldHVybntzdGFydDpuLGNhcHR1cmU6dyxzdG9wOmksc2F2ZTp5LG9uOnh9fXZhciBmPXtmdW5jdGlvbjohMCxvYmplY3Q6ITB9LGw9KHBhcnNlRmxvYXQscGFyc2VJbnQsZlt0eXBlb2YgZXhwb3J0c10mJmV4cG9ydHMmJiFleHBvcnRzLm5vZGVUeXBlP2V4cG9ydHM6dm9pZCAwKSxwPWZbdHlwZW9mIG1vZHVsZV0mJm1vZHVsZSYmIW1vZHVsZS5ub2RlVHlwZT9tb2R1bGU6dm9pZCAwLG09cCYmcC5leHBvcnRzPT09bD9sOnZvaWQgMCxnPXQobCYmcCYmXCJvYmplY3RcIj09dHlwZW9mIGdsb2JhbCYmZ2xvYmFsKSx3PXQoZlt0eXBlb2Ygc2VsZl0mJnNlbGYpLHY9dChmW3R5cGVvZiB3aW5kb3ddJiZ3aW5kb3cpLHk9dChmW3R5cGVvZiB0aGlzXSYmdGhpcyksYj1nfHx2IT09KHkmJnkud2luZG93KSYmdnx8d3x8eXx8RnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpO1wiZ2NcImluIHdpbmRvd3x8KHdpbmRvdy5nYz1mdW5jdGlvbigpe30pLEhUTUxDYW52YXNFbGVtZW50LnByb3RvdHlwZS50b0Jsb2J8fE9iamVjdC5kZWZpbmVQcm9wZXJ0eShIVE1MQ2FudmFzRWxlbWVudC5wcm90b3R5cGUsXCJ0b0Jsb2JcIix7dmFsdWU6ZnVuY3Rpb24odCxlLG4pe2Zvcih2YXIgaT1hdG9iKHRoaXMudG9EYXRhVVJMKGUsbikuc3BsaXQoXCIsXCIpWzFdKSxyPWkubGVuZ3RoLG89bmV3IFVpbnQ4QXJyYXkociksYT0wO2E8cjthKyspb1thXT1pLmNoYXJDb2RlQXQoYSk7dChuZXcgQmxvYihbb10se3R5cGU6ZXx8XCJpbWFnZS9wbmdcIn0pKX19KSxmdW5jdGlvbigpe2lmKFwicGVyZm9ybWFuY2VcImluIHdpbmRvdz09MCYmKHdpbmRvdy5wZXJmb3JtYW5jZT17fSksRGF0ZS5ub3c9RGF0ZS5ub3d8fGZ1bmN0aW9uKCl7cmV0dXJuKG5ldyBEYXRlKS5nZXRUaW1lKCl9LFwibm93XCJpbiB3aW5kb3cucGVyZm9ybWFuY2U9PTApe3ZhciB0PURhdGUubm93KCk7cGVyZm9ybWFuY2UudGltaW5nJiZwZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0JiYodD1wZXJmb3JtYW5jZS50aW1pbmcubmF2aWdhdGlvblN0YXJ0KSx3aW5kb3cucGVyZm9ybWFuY2Uubm93PWZ1bmN0aW9uKCl7cmV0dXJuIERhdGUubm93KCktdH19fSgpO3ZhciBrPXdpbmRvdy5EYXRlLm5vdygpO2kucHJvdG90eXBlLnN0YXJ0PWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5zdG9wPWZ1bmN0aW9uKCl7fSxpLnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt9LGkucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQ9ZnVuY3Rpb24oKXtyZXR1cm4hMH0saS5wcm90b3R5cGUuc3RlcD1mdW5jdGlvbigpe2NvbnNvbGUubG9nKFwiU3RlcCBub3Qgc2V0IVwiKX0sci5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksci5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmRpc3Bvc2UoKX0sci5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3ZhciBuPW5ldyBGaWxlUmVhZGVyO24ub25sb2FkPWZ1bmN0aW9uKCl7dGhpcy50YXBlLmFwcGVuZChlKHRoaXMuY291bnQpK3RoaXMuZmlsZUV4dGVuc2lvbixuZXcgVWludDhBcnJheShuLnJlc3VsdCkpLHRoaXMuY291bnQrKyx0aGlzLnN0ZXAoKX0uYmluZCh0aGlzKSxuLnJlYWRBc0FycmF5QnVmZmVyKHQpfSxyLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3QodGhpcy50YXBlLnNhdmUoKSl9LHIucHJvdG90eXBlLmRpc3Bvc2U9ZnVuY3Rpb24oKXt0aGlzLnRhcGU9bmV3IFRhcix0aGlzLmNvdW50PTB9LG8ucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpLG8ucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0LnRvQmxvYihmdW5jdGlvbih0KXtyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLHQpfS5iaW5kKHRoaXMpLHRoaXMudHlwZSl9LGEucHJvdG90eXBlPU9iamVjdC5jcmVhdGUoci5wcm90b3R5cGUpLGEucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0LnRvQmxvYihmdW5jdGlvbih0KXtyLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLHQpfS5iaW5kKHRoaXMpLHRoaXMudHlwZSx0aGlzLnF1YWxpdHkpfSxzLnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSxzLnByb3RvdHlwZS5zdGFydD1mdW5jdGlvbih0KXt0aGlzLmRpc3Bvc2UoKX0scy5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuZnJhbWVzLnB1c2godC50b0RhdGFVUkwoXCJpbWFnZS93ZWJwXCIsdGhpcy5xdWFsaXR5KSksdGhpcy5zZXR0aW5ncy5hdXRvU2F2ZVRpbWU+MCYmdGhpcy5mcmFtZXMubGVuZ3RoL3RoaXMuc2V0dGluZ3MuZnJhbWVyYXRlPj10aGlzLnNldHRpbmdzLmF1dG9TYXZlVGltZT90aGlzLnNhdmUoZnVuY3Rpb24odCl7dGhpcy5maWxlbmFtZT10aGlzLmJhc2VGaWxlbmFtZStcIi1wYXJ0LVwiK2UodGhpcy5wYXJ0KSxkb3dubG9hZCh0LHRoaXMuZmlsZW5hbWUrdGhpcy5leHRlbnNpb24sdGhpcy5taW1lVHlwZSksdGhpcy5kaXNwb3NlKCksdGhpcy5wYXJ0KyssdGhpcy5maWxlbmFtZT10aGlzLmJhc2VGaWxlbmFtZStcIi1wYXJ0LVwiK2UodGhpcy5wYXJ0KSx0aGlzLnN0ZXAoKX0uYmluZCh0aGlzKSk6dGhpcy5zdGVwKCl9LHMucHJvdG90eXBlLnNhdmU9ZnVuY3Rpb24odCl7aWYodGhpcy5mcmFtZXMubGVuZ3RoKXt2YXIgZT1XaGFtbXkuZnJvbUltYWdlQXJyYXkodGhpcy5mcmFtZXMsdGhpcy5zZXR0aW5ncy5mcmFtZXJhdGUpLG49bmV3IEJsb2IoW2VdLHt0eXBlOlwib2N0ZXQvc3RyZWFtXCJ9KTt0KG4pfX0scy5wcm90b3R5cGUuZGlzcG9zZT1mdW5jdGlvbih0KXt0aGlzLmZyYW1lcz1bXX0saC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksaC5wcm90b3R5cGUuc3RhcnQ9ZnVuY3Rpb24oKXt0aGlzLmVuY29kZXIuc3RhcnQodGhpcy5zZXR0aW5ncyl9LGgucHJvdG90eXBlLmFkZD1mdW5jdGlvbih0KXt0aGlzLmVuY29kZXIuYWRkKHQpfSxoLnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3RoaXMuY2FsbGJhY2s9dCx0aGlzLmVuY29kZXIuZW5kKCl9LGgucHJvdG90eXBlLnNhZmVUb1Byb2NlZWQ9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5lbmNvZGVyLnNhZmVUb1Byb2NlZWQoKX0sZC5wcm90b3R5cGU9T2JqZWN0LmNyZWF0ZShpLnByb3RvdHlwZSksZC5wcm90b3R5cGUuYWRkPWZ1bmN0aW9uKHQpe3RoaXMuc3RyZWFtfHwodGhpcy5zdHJlYW09dC5jYXB0dXJlU3RyZWFtKHRoaXMuZnJhbWVyYXRlKSx0aGlzLm1lZGlhUmVjb3JkZXI9bmV3IE1lZGlhUmVjb3JkZXIodGhpcy5zdHJlYW0pLHRoaXMubWVkaWFSZWNvcmRlci5zdGFydCgpLHRoaXMubWVkaWFSZWNvcmRlci5vbmRhdGFhdmFpbGFibGU9ZnVuY3Rpb24odCl7dGhpcy5jaHVua3MucHVzaCh0LmRhdGEpfS5iaW5kKHRoaXMpKSx0aGlzLnN0ZXAoKX0sZC5wcm90b3R5cGUuc2F2ZT1mdW5jdGlvbih0KXt0aGlzLm1lZGlhUmVjb3JkZXIub25zdG9wPWZ1bmN0aW9uKGUpe3ZhciBuPW5ldyBCbG9iKHRoaXMuY2h1bmtzLHt0eXBlOlwidmlkZW8vd2VibVwifSk7dGhpcy5jaHVua3M9W10sdChuKX0uYmluZCh0aGlzKSx0aGlzLm1lZGlhUmVjb3JkZXIuc3RvcCgpfSx1LnByb3RvdHlwZT1PYmplY3QuY3JlYXRlKGkucHJvdG90eXBlKSx1LnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24odCl7dGhpcy5zaXplU2V0fHwodGhpcy5lbmNvZGVyLnNldE9wdGlvbihcIndpZHRoXCIsdC53aWR0aCksdGhpcy5lbmNvZGVyLnNldE9wdGlvbihcImhlaWdodFwiLHQuaGVpZ2h0KSx0aGlzLnNpemVTZXQ9ITApLHRoaXMuY2FudmFzLndpZHRoPXQud2lkdGgsdGhpcy5jYW52YXMuaGVpZ2h0PXQuaGVpZ2h0LHRoaXMuY3R4LmRyYXdJbWFnZSh0LDAsMCksdGhpcy5lbmNvZGVyLmFkZEZyYW1lKHRoaXMuY3R4LHtjb3B5OiEwLGRlbGF5OnRoaXMuc2V0dGluZ3Muc3RlcH0pLHRoaXMuc3RlcCgpfSx1LnByb3RvdHlwZS5zYXZlPWZ1bmN0aW9uKHQpe3RoaXMuY2FsbGJhY2s9dCx0aGlzLmVuY29kZXIucmVuZGVyKCl9LCh2fHx3fHx7fSkuQ0NhcHR1cmU9YyxcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJlwib2JqZWN0XCI9PXR5cGVvZiBkZWZpbmUuYW1kJiZkZWZpbmUuYW1kP2RlZmluZShmdW5jdGlvbigpe3JldHVybiBjfSk6bCYmcD8obSYmKChwLmV4cG9ydHM9YykuQ0NhcHR1cmU9YyksbC5DQ2FwdHVyZT1jKTpiLkNDYXB0dXJlPWN9KCk7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9ub2RlX21vZHVsZXMvY2NhcHR1cmUuanMvYnVpbGQvQ0NhcHR1cmUuYWxsLm1pbi5qc1xuLy8gbW9kdWxlIGlkID0gNjFcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwibW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihtb2R1bGUpIHtcclxuXHRpZighbW9kdWxlLndlYnBhY2tQb2x5ZmlsbCkge1xyXG5cdFx0bW9kdWxlLmRlcHJlY2F0ZSA9IGZ1bmN0aW9uKCkge307XHJcblx0XHRtb2R1bGUucGF0aHMgPSBbXTtcclxuXHRcdC8vIG1vZHVsZS5wYXJlbnQgPSB1bmRlZmluZWQgYnkgZGVmYXVsdFxyXG5cdFx0aWYoIW1vZHVsZS5jaGlsZHJlbikgbW9kdWxlLmNoaWxkcmVuID0gW107XHJcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kdWxlLCBcImxvYWRlZFwiLCB7XHJcblx0XHRcdGVudW1lcmFibGU6IHRydWUsXHJcblx0XHRcdGdldDogZnVuY3Rpb24oKSB7XHJcblx0XHRcdFx0cmV0dXJuIG1vZHVsZS5sO1xyXG5cdFx0XHR9XHJcblx0XHR9KTtcclxuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2R1bGUsIFwiaWRcIiwge1xyXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxyXG5cdFx0XHRnZXQ6IGZ1bmN0aW9uKCkge1xyXG5cdFx0XHRcdHJldHVybiBtb2R1bGUuaTtcclxuXHRcdFx0fVxyXG5cdFx0fSk7XHJcblx0XHRtb2R1bGUud2VicGFja1BvbHlmaWxsID0gMTtcclxuXHR9XHJcblx0cmV0dXJuIG1vZHVsZTtcclxufTtcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vbW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSA2MlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9