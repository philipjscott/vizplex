export default function eqParser (eq) {
  var regex = /([^i]?)n\(/g
  var matches = []
  var match
  
  while ((match = regex.exec(eq)) !== null) {
    matches.push(match.index)
  }
  console.log(matches)
  matches.forEach((elem) => {
    var p = -1
    for (var i = elem + 2; i < eq.length; i++) {
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
  console.log(eq) 
  return eq.replace(regex, '$1%NOISE%(vec3(')
}
