import assert from 'assert'
import eqParser from '../src/eqParser'

describe('eqParser', function () {
  it('should convert n(1,2,3) to %NOISE%(vec3(1,2,3))', function () {
    assert.equal(eqParser('n(1,2,3)'), '%NOISE%(vec3(1,2,3))')
  })
  it('should handle sin() and nested n()s', function () {
    assert.equal(eqParser('sin(1/n(1,n(1,2,3),3))'), 'sin(1/%NOISE%(vec3(1,%NOISE%(vec3(1,2,3)),3)))')
  })
})
