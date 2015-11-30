/*global describe, it*/

'use strict';

// unit test
require('should');

function add(x, y) {
  return x + y;
}

describe('add', function() {
  it('should add two numbers', function() {
    var actual = add(1, 1),
        expected = 2;
    actual.should.equal(expected);
  });
});

