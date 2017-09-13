import assert from 'assert'
import eqParser from '../src/eqParser'

describe('eqParser', function () {
  it('should convert n(1,2,3) to %NOISE%(vec3(1,2,3))', function () {
    assert.equal('Array', eqParser('n(1,2,3)'))
  })
})
