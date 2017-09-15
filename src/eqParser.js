export default function eqParser (eq) {
  var regex = /([^i]|^)n/g
  var matches = []
  var match
  
  while ((match = regex.exec(eq)) !== null) {
    matches.push(match.index)
  }
  console.log('test: ' + eq)
  console.log(matches)
  matches.forEach((elem) => {
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
  return eq.replace(regex, '$1%NOISE%(vec3')
}
