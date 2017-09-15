# vizplex

Wacky noise visualization library.

Demonstration [here](https://scottyfillups.github.io/vizplex)

### Installation

The package is on NPM:
`$ npm install --save vizplex`

Alternatively, you can embed everything in `<script>` tags:
```html
<script src="https://scottyfillups.github.io/vizplex/vizplex.js"></script>
```

### Usage
```js
var vizplex = require('vizplex')
var canvas = document.createElement('canvas')
var eqs = ['n(x/32,y/32,t)', 'r', 'r', '1']

canvas.height = 512
canvas.width = 512
document.body.appendChild(canvas)

vizplex(canvas, eqs)
```

The [demo](https//scottyfillups.github.io/vizplex) page should have links to more examples. All the examples are in the `docs/examples` folder.

### Documentation

##### vizplex(canvas, fns, options)
* **canvas**: The `canvas` node or DOM selector string
* **fns**: An array for the respective functions for RGBA. More detailed explanation below
* **options**:
  * timeFactor: Numeric value that multiplies the time variable. Used to controlling speed
  * ccapConfig: The config object used to instantiate [CCapture](https://github.com/spite/ccapture.js/). Used for recording the contents of the canvas.

### RGBA functions

Every RGBA function should have a range of `[0, 1]` (values outside the range will be treated as being on the boundary). Below are a few functions and values you can use in your RGBA function:
* abs(): Absolute value
* sin(): Sine trig. function
* cos(): Cosine trig. function
* n(): Simplex3 noise function (takes three arguments)
* t: The current time, in seconds, multipled by the time factor
* x: The X coordinate of the pixel being rendered
* y: The Y coordinate of the pixel being rendered

In general, you can use any built-in GLSL function.

You can also re-use the values of previous RGBA functions, as `r`, `g`, `b`, and `a`. For example, suppose you want:
```js
var rgbaFuncts = [
  'n(x/32,y/32,t)',
  'n(x/32,y/32,t)',
  'n(x/32,y/32,t)',
  '1'
]
```

This means the GPU needs to compute `n(x/32,y/32,t)` three times, and since `n` is a mathematical function, you'll get the same output for each one. Instead, you can do this:
```js
var rgbaFunctions = [
  'n(x/32,y/32,t)',
  'r',
  'r',
  '1'
]
```

Keep in mind order matters. `r` is defined before `b`, and `b` is defined before `g`, etc. This means that the following code **won't work**:
```js
var rgbaFunctions = [
  'b', // Error: This uses the 'b' variable before it's assigned.
  'n(x/32,y/32,t)',
  'b',
  '1'
]
```

### How it works

The RGBA function strings are parsed and mapped to proper GLSL syntax. For example, `sin(x/32, y/32)` would be mapped to `sin(gl_FragCoord.x/32, gl_FragCoord.y/32)`. The RGBA functions then replace placeholders in a GLSL fragment template, the GLSL gets loaded, then graphics are drawn on the canvas. I'm pretty nooby at regexs, so please don't flame me if you think my source is garbo. Criticism is welcome though.

### Acknowledgements

I would like to thank the all contributors of [stackgl](http://stack.gl/), which made my life a lot easier.
