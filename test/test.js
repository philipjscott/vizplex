import assert from 'assert'
import eqParser from '../src/eq-parser'

describe('eqParser', function () {
  var eqIn
  var eqOut
  it('should convert n(1,2,3) to %NOISE%(vec3(1,2,3))', function () {
    eqIn = 'n(1,2,3)'
    eqOut = '%NOISE%(vec3(1.0,2.0,3.0))'
    assert.equal(eqParser(eqIn), eqOut)
  })
  it('should handle sin() and nested n()s', function () {
    eqIn = 'sin(1/n(1,n(1,2,3),3))'
    eqOut = 'sin(1.0/%NOISE%(vec3(1.0,%NOISE%(vec3(1.0,2.0,3.0)),3.0)))'
    assert.equal(eqParser(eqIn), eqOut)
  })
  it('should convert branching nested n()s', function () {
    eqIn = 'n(n(1,2),n(3,4))'
    eqOut = '%NOISE%(vec3(%NOISE%(vec3(1.0,2.0)),%NOISE%(vec3(3.0,4.0))))'
    assert.equal(eqParser(eqIn), eqOut) 
  })
  it('should be able to handle both floating and integer arguments', function () {
    eqIn = 'n(1.1,2,n(3.14,52.1432,0))'
    eqOut = '%NOISE%(vec3(1.1,2.0,%NOISE%(vec3(3.14,52.1432,0.0))))'
    assert.equal(eqParser(eqIn), eqOut)
  })
  it('should map x and y to FragCoord.x and FragCoord.y', function () {
    eqIn = 'n(1.43,x,n(x,y,y))'
    eqOut = '%NOISE%(vec3(1.43,gl_FragCoord.x,%NOISE%(vec3(gl_FragCoord.x,gl_FragCoord.y,gl_FragCoord.y))))'
    assert.equal(eqParser(eqIn), eqOut)
  })
  it('should be able to handle inputs with .0 appended already', function () {
    eqIn = 'n(x/32.0,y/32.0,t)'
    eqOut = '%NOISE%(vec3(gl_FragCoord.x/32.0,gl_FragCoord.y/32.0,t))'
    assert.equal(eqParser(eqIn), eqOut)
  })
  it('should be able to handle raw numbers and trig', function () {
    assert.equal(eqParser('1'), '1.0')
    assert.equal(eqParser('0.0'), '0.0')
    assert.equal(eqParser('0'), '0.0')
    assert.equal(eqParser('sin(3)'), 'sin(3.0)')
  })
})
